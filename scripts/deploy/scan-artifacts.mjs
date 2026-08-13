import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const FORM_RULES = [
  {
    id: 'private-key-pem',
    pattern: /-----BEGIN (?:OPENSSH|RSA|EC|DSA) PRIVATE KEY-----/g,
  },
  {
    id: 'authorization-header',
    pattern: /\bauthorization\s*[:=]\s*bearer\s+[^\s"']+/gi,
  },
  {
    id: 'upload-auth-header',
    pattern: /\bx-auth(?:-rest)?\s*[:=]\s*[^\s"']+/gi,
  },
  {
    id: 'signed-url-query',
    pattern: /[?&](?:x-amz-signature|signature|auth_key|rest_auth_key|access_token)=[^\s&#"']+/gi,
  },
];

export class ArtifactSecretError extends Error {
  constructor(relativePath, offset, ruleId) {
    super(`artifact scan blocked: file=${relativePath} offset=${offset} rule=${ruleId}`);
    this.name = 'ArtifactSecretError';
    this.relativePath = relativePath;
    this.offset = offset;
    this.ruleId = ruleId;
  }
}

export function collectArtifactFiles(root, { readdirImpl = readdirSync } = {}) {
  const files = [];
  const visit = (dir) => {
    for (const entry of readdirImpl(dir, { withFileTypes: true })) {
      const absolute = path.join(dir, entry.name);
      if (entry.isSymbolicLink()) {
        const relativePath = path.relative(root, absolute).split(path.sep).join('/');
        throw new ArtifactSecretError(relativePath, 0, 'symlink-not-allowed');
      }
      if (entry.isDirectory()) visit(absolute);
      else if (entry.isFile()) files.push(absolute);
    }
  };
  visit(root);
  return files.sort();
}

function derivedSecretForms(name, value) {
  const normalized = value.replace(/\r\n/g, '\n');
  const baseForms = [
    ['literal', normalized],
    ['base64', Buffer.from(normalized, 'utf8').toString('base64')],
    ['url-encoded', encodeURIComponent(normalized)],
    ['hex', Buffer.from(normalized, 'utf8').toString('hex')],
    ['json-escaped', JSON.stringify(normalized).slice(1, -1)],
  ];
  const forms = [];
  const seen = new Set();
  for (const [kind, candidate] of baseForms) {
    if (candidate.length >= 8 && !seen.has(`raw:${candidate}`)) {
      forms.push({ id: `secret-${name}-${kind}`, candidate, compactHaystack: false });
      seen.add(`raw:${candidate}`);
    }
    const compact = candidate.replace(/\s/g, '');
    if (compact.length >= 8 && !seen.has(`compact:${compact}`)) {
      forms.push({ id: `secret-${name}-${kind}-compact`, candidate: compact, compactHaystack: true });
      seen.add(`compact:${compact}`);
    }
  }
  return forms;
}

function secretInputs(env) {
  return Object.entries(env)
    .filter(([name, value]) => name.startsWith('SCAN_SECRET_') && typeof value === 'string' && value)
    .map(([name, value]) => ({ name: name.slice('SCAN_SECRET_'.length).toLowerCase(), value }));
}

function compactTextWithOffsets(text) {
  let compact = '';
  const offsets = [];
  for (let offset = 0; offset < text.length; offset++) {
    if (/\s/.test(text[offset])) continue;
    compact += text[offset];
    offsets.push(offset);
  }
  return { compact, offsets };
}

function assertTextSafe(relativePath, text, secrets) {
  for (const rule of FORM_RULES) {
    rule.pattern.lastIndex = 0;
    const match = rule.pattern.exec(text);
    if (match) throw new ArtifactSecretError(relativePath, match.index, rule.id);
  }

  const compactText = compactTextWithOffsets(text);
  for (const secret of secrets) {
    for (const form of derivedSecretForms(secret.name, secret.value)) {
      const haystack = form.compactHaystack ? compactText.compact : text;
      const matchOffset = haystack.indexOf(form.candidate);
      if (matchOffset !== -1) {
        const sourceOffset = form.compactHaystack ? compactText.offsets[matchOffset] : matchOffset;
        throw new ArtifactSecretError(relativePath, sourceOffset, form.id);
      }
    }
  }
}

export function scanArtifactDirectory(root, { env = process.env } = {}) {
  const absoluteRoot = path.resolve(root);
  const rootStats = statSync(absoluteRoot);
  const secrets = secretInputs(env);
  const files = rootStats.isDirectory() ? collectArtifactFiles(absoluteRoot) : [absoluteRoot];
  if (!rootStats.isDirectory() && !rootStats.isFile()) {
    throw new Error('artifact path deve ser arquivo ou diretório');
  }
  for (const file of files) {
    const relativePath = rootStats.isDirectory()
      ? path.relative(absoluteRoot, file).split(path.sep).join('/')
      : path.basename(file);
    assertTextSafe(relativePath, readFileSync(file, 'utf8'), secrets);
  }
  return { filesScanned: files.length, secretInputs: secrets.length };
}

function main() {
  const root = process.argv[2];
  if (!root) throw new Error('uso: node scan-artifacts.mjs <diretório>');
  const result = scanArtifactDirectory(root);
  console.log(`artifact scan ok: ${result.filesScanned} file(s)`);
}

const isMain = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'artifact scan failed');
    process.exitCode = 1;
  }
}
