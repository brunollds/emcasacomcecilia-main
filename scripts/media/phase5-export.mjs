import { createHash } from 'node:crypto';
import { mkdtemp, readFile, rmdir } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateMediaAssetAvailability } from './video-asset-proof.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_REPO_ROOT = path.resolve(SCRIPT_DIR, '../..');
const EXPECTED_ASSETS = 304;
const EXPECTED_IMAGES = 294;
const EXPECTED_VIDEOS = 10;
const EXPECTED_BYTES = 44729059;
const START_MARKER = '# BEGIN MANAGED PHASE5 CDN EXPORT ALLOWLIST';
const END_MARKER = '# END MANAGED PHASE5 CDN EXPORT ALLOWLIST';

function parseArgs(argv) {
  const options = { check: false, write: false, json: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--check') options.check = true;
    else if (argument === '--write') options.write = true;
    else if (argument === '--json') options.json = true;
    else if (argument === '--repo-root') options.repoRoot = argv[++index];
    else if (argument === '--help' || argument === '-h') options.help = true;
    else throw new Error(`Unknown argument: ${argument}`);
  }
  if (options.check && options.write) throw new Error('--check and --write are mutually exclusive');
  return options;
}

function fail(message) {
  throw new Error(message);
}

function escapeGitAttributesPath(value) {
  if (/[\s\\#*?\[\]!]/.test(value)) {
    const escapedPattern = value.replace(/[\\#*?\[\]!]/g, '\\$&');
    return JSON.stringify(escapedPattern);
  }
  return value
    .replaceAll('\\', '\\\\')
    .replace(/^!/, '\\!');
}

export function gitAttributesPattern(value) {
  return escapeGitAttributesPath(value);
}

function managedBlock(localUrls) {
  const lines = [
    START_MARKER,
    '# Exact CDN-verified paths only. Originals stay in the repository and on disk.',
    '# Buildproof files (data/media-manifest.json and scripts/media/*) remain included.',
    ...localUrls.map((localUrl) => `${escapeGitAttributesPath(`public${localUrl}`)} export-ignore`),
    END_MARKER,
  ];
  return lines.join('\n');
}

function replaceManagedBlock(existing, block) {
  const start = existing.indexOf(START_MARKER);
  const end = existing.indexOf(END_MARKER);
  if (start < 0 && end < 0) return `${existing.trimEnd()}\n\n${block}\n`;
  if (start < 0 || end < start) fail('Malformed Phase 5 managed block in .gitattributes');
  const afterEnd = end + END_MARKER.length;
  return `${existing.slice(0, start).trimEnd()}\n\n${block}\n${existing.slice(afterEnd).replace(/^\s*/, '')}`;
}

async function readJson(repoRoot, relativePath) {
  return JSON.parse(await readFile(path.join(repoRoot, relativePath), 'utf8'));
}

async function hashFile(filePath) {
  const contents = await readFile(filePath);
  return { bytes: contents.length, sha256: createHash('sha256').update(contents).digest('hex') };
}

function assertAssetIdentity(asset, localUrl, remoteUrl) {
  if (!asset) fail(`map asset missing from manifest: ${localUrl}`);
  if (asset.local_url !== localUrl) fail(`manifest local_url mismatch: ${localUrl}`);
  if (asset.source_path !== `public${localUrl}`) fail(`manifest source_path mismatch: ${localUrl}`);
  if (!['image', 'video'].includes(asset.media_kind)) fail(`unsupported Phase 5 media kind: ${localUrl}`);
  if (asset.verification_status !== 'verified') fail(`asset is not independently verified: ${localUrl}`);
  if (asset.verification_etag_or_digest !== asset.sha256) fail(`verification digest mismatch: ${localUrl}`);
  if (asset.remote_url !== remoteUrl) fail(`map remote_url mismatch: ${localUrl}`);
  if (!Number.isSafeInteger(asset.bytes) || asset.bytes <= 0) fail(`invalid manifest byte count: ${localUrl}`);
  if (!/^[a-f0-9]{64}$/.test(asset.sha256)) fail(`invalid manifest SHA-256: ${localUrl}`);
}

export async function validatePhase5({ repoRoot = DEFAULT_REPO_ROOT, manifestPath = 'data/media-manifest.json', mapPath = 'src/lib/generated/media-delivery-map.json', attributesPath = '.gitattributes', manifestValue, mapValue } = {}) {
  const resolvedRoot = path.resolve(repoRoot);
  const manifest = manifestValue ?? await readJson(resolvedRoot, manifestPath);
  const map = mapValue ?? await readJson(resolvedRoot, mapPath);
  const mapEntries = Object.entries(map);
  if (mapEntries.length !== EXPECTED_ASSETS) fail(`expected ${EXPECTED_ASSETS} mapped assets, got ${mapEntries.length}`);
  if (new Set(mapEntries.map(([localUrl]) => localUrl)).size !== mapEntries.length) fail('delivery map contains duplicate local URLs');

  const manifestByLocal = new Map();
  for (const asset of manifest.assets ?? []) {
    if (manifestByLocal.has(asset.local_url)) fail(`manifest contains duplicate local_url: ${asset.local_url}`);
    manifestByLocal.set(asset.local_url, asset);
  }

  const missingRoot = await createMissingRoot();
  const checked = [];
  try {
    for (const [localUrl, remoteUrl] of mapEntries.sort(([a], [b]) => a.localeCompare(b, 'en'))) {
      if (!/^\/(images|videos)\//.test(localUrl)) fail(`mapped asset outside public media scope: ${localUrl}`);
      const asset = manifestByLocal.get(localUrl);
      assertAssetIdentity(asset, localUrl, remoteUrl);
      const proof = validateMediaAssetAvailability({ assetUrl: localUrl, repoRoot: missingRoot, manifest, map });
      if (!proof.ok || proof.mode !== 'cdn') fail(`CDN proof failed: ${localUrl}${proof.reason ? ` (${proof.reason})` : ''}`);
      const localPath = path.join(resolvedRoot, asset.source_path);
      const local = await hashFile(localPath).catch((error) => fail(`local asset unreadable: ${localUrl} (${error.message})`));
      if (local.bytes !== asset.bytes) fail(`local byte count mismatch: ${localUrl}`);
      if (local.sha256 !== asset.sha256) fail(`local SHA-256 mismatch: ${localUrl}`);
      checked.push({ localUrl, sourcePath: asset.source_path, mediaKind: asset.media_kind, bytes: local.bytes, sha256: local.sha256, remoteUrl });
    }
  } finally {
    await removeMissingRoot(missingRoot);
  }

  const counts = {
    assets: checked.length,
    images: checked.filter((entry) => entry.mediaKind === 'image').length,
    videos: checked.filter((entry) => entry.mediaKind === 'video').length,
    rawBytes: checked.reduce((total, entry) => total + entry.bytes, 0),
  };
  if (counts.images !== EXPECTED_IMAGES || counts.videos !== EXPECTED_VIDEOS || counts.rawBytes !== EXPECTED_BYTES) {
    fail(`allowlist totals changed: ${JSON.stringify(counts)}`);
  }

  const existing = await readFile(path.join(resolvedRoot, attributesPath), 'utf8');
  assertNoBroadPublicRules(existing);
  const block = managedBlock(checked.map((entry) => entry.localUrl));
  const expectedAttributes = replaceManagedBlock(existing, block);
  if (attributesPath === '.gitattributes' && expectedAttributes.includes('public/** export-ignore')) fail('wildcard public export is forbidden');
  return { manifest, map, checked, counts, block, existingAttributes: existing, expectedAttributes, attributesChanged: existing !== expectedAttributes };
}

async function createMissingRoot() {
  return mkdtemp(path.join(os.tmpdir(), 'phase5-cdn-proof-'));
}

async function removeMissingRoot(root) {
  await rmdir(root);
}

function assertNoBroadPublicRules(attributes) {
  const outsideManaged = attributes.replace(/# BEGIN MANAGED PHASE5 CDN EXPORT ALLOWLIST[\s\S]*?# END MANAGED PHASE5 CDN EXPORT ALLOWLIST\s*/g, '');
  for (const line of outsideManaged.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (/^public(?:\/|\s)/.test(trimmed) && /export-ignore/.test(trimmed) && /[*?\[\]]/.test(trimmed)) {
      fail(`broad public export rule is forbidden: ${trimmed}`);
    }
  }
}

export function formatReport(result) {
  return {
    ok: true,
    mode: 'local-cdn-export',
    allowlist: result.counts,
    attributesChanged: result.attributesChanged,
    managedBlockLines: result.checked.length,
    checked: result.checked,
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write('Usage: node scripts/media/phase5-export.mjs [--check|--write] [--json] [--repo-root PATH]\n');
    return;
  }
  const result = await validatePhase5({ repoRoot: options.repoRoot });
  if (options.write) {
    const { writeFile } = await import('node:fs/promises');
    await writeFile(path.join(path.resolve(options.repoRoot ?? DEFAULT_REPO_ROOT), '.gitattributes'), result.expectedAttributes, 'utf8');
  }
  if (options.check && result.attributesChanged) fail('.gitattributes does not match the exact Phase 5 managed block');
  const report = formatReport(result);
  if (options.json) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  else process.stdout.write(`Phase 5 ${options.write ? 'block generated' : 'check passed'}: ${report.allowlist.assets} assets (${report.allowlist.images} images, ${report.allowlist.videos} videos), ${report.allowlist.rawBytes} raw bytes.\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  main().catch((error) => {
    process.stderr.write(`Phase 5 export failed: ${error.message}\n`);
    process.exitCode = 1;
  });
}
