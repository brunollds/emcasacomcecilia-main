import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const MANIFEST_VERSION = 1;
export const DEFAULT_ORIGIN = 'https://cdn.emcasacomcecilia.com';
export const MEDIA_EXTENSIONS = new Map([
  ['.png', 'image'],
  ['.jpg', 'image'],
  ['.jpeg', 'image'],
  ['.webp', 'image'],
  ['.gif', 'image'],
  ['.avif', 'image'],
  ['.svg', 'image'],
  ['.bmp', 'image'],
  ['.tif', 'image'],
  ['.tiff', 'image'],
  ['.ico', 'image'],
  ['.mp4', 'video'],
  ['.webm', 'video'],
  ['.mov', 'video'],
  ['.m4v', 'video'],
  ['.mp3', 'audio'],
  ['.wav', 'audio'],
  ['.ogg', 'audio'],
  ['.oga', 'audio'],
  ['.m4a', 'audio'],
  ['.aac', 'audio'],
  ['.flac', 'audio'],
  ['.opus', 'audio'],
]);

const EXPECTED_MIMES = new Map([
  ['.png', new Set(['image/png'])],
  ['.jpg', new Set(['image/jpeg'])],
  ['.jpeg', new Set(['image/jpeg'])],
  ['.webp', new Set(['image/webp'])],
  ['.gif', new Set(['image/gif'])],
  ['.avif', new Set(['image/avif'])],
  ['.svg', new Set(['image/svg+xml'])],
  ['.bmp', new Set(['image/bmp', 'image/x-ms-bmp'])],
  ['.tif', new Set(['image/tiff'])],
  ['.tiff', new Set(['image/tiff'])],
  ['.ico', new Set(['image/x-icon', 'image/vnd.microsoft.icon'])],
  ['.mp4', new Set(['video/mp4'])],
  ['.webm', new Set(['video/webm'])],
  ['.mov', new Set(['video/quicktime', 'video/mp4'])],
  ['.m4v', new Set(['video/x-m4v', 'video/mp4'])],
  ['.mp3', new Set(['audio/mpeg'])],
  ['.wav', new Set(['audio/wav', 'audio/x-wav', 'audio/wave'])],
  ['.ogg', new Set(['audio/ogg', 'application/ogg'])],
  ['.oga', new Set(['audio/ogg', 'application/ogg'])],
  ['.m4a', new Set(['audio/mp4', 'audio/x-m4a'])],
  ['.aac', new Set(['audio/aac', 'audio/x-hx-aac-adts'])],
  ['.flac', new Set(['audio/flac', 'audio/x-flac'])],
  ['.opus', new Set(['audio/opus', 'audio/ogg'])],
]);

const IGNORED_REFERENCE_DIRS = new Set(['.git', '.next', 'node_modules', 'tmp']);
const TEXT_REFERENCE_EXTENSIONS = new Set(['.css', '.html', '.htm', '.js', '.jsx', '.json', '.md', '.mdx', '.mjs', '.scss', '.ts', '.tsx', '.txt', '.xml', '.yaml', '.yml']);

export function toPosix(value) {
  return value.replaceAll(path.sep, '/').replaceAll('\\', '/');
}

export function assertSafeRelativePath(relativePath) {
  if (typeof relativePath !== 'string' || relativePath.length === 0) {
    throw new Error('A relative path is required');
  }
  if (path.posix.isAbsolute(relativePath) || path.win32.isAbsolute(relativePath)) {
    throw new Error(`Absolute path is not allowed: ${relativePath}`);
  }
  const normalized = toPosix(relativePath);
  const parts = normalized.split('/');
  if (parts.some((part) => part === '..')) {
    throw new Error(`Path traversal is not allowed: ${relativePath}`);
  }
  if (parts.some((part) => part.length === 0 || part === '.')) {
    throw new Error(`Non-canonical relative path is not allowed: ${relativePath}`);
  }
  return normalized;
}

export function resolveInside(root, relativePath) {
  const safeRelativePath = assertSafeRelativePath(relativePath);
  const rootPath = path.resolve(root);
  const candidate = path.resolve(rootPath, ...safeRelativePath.split('/'));
  if (candidate !== rootPath && !candidate.startsWith(`${rootPath}${path.sep}`)) {
    throw new Error(`Resolved path escapes root: ${relativePath}`);
  }
  return candidate;
}

export function normalizeOrigin(value = DEFAULT_ORIGIN) {
  const url = new URL(value);
  if (url.protocol !== 'https:') {
    throw new Error(`Remote origin must use HTTPS: ${value}`);
  }
  if (url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error(`Remote origin must not contain a path or credentials: ${value}`);
  }
  return url.origin;
}

export function normalizeRemoteBasename(filename) {
  if (typeof filename !== 'string' || filename.length === 0) {
    throw new Error('A filename is required');
  }
  if (filename.includes('/') || filename.includes('\\')) {
    throw new Error(`Remote basename cannot contain a path: ${filename}`);
  }
  const extension = path.posix.extname(filename).toLowerCase();
  const stem = path.posix.basename(filename, path.posix.extname(filename));
  const normalizedStem = stem
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'asset';
  const normalizedExtension = extension.replace(/[^a-z0-9.]/g, '');
  return `${normalizedStem}${normalizedExtension}`;
}

export function buildRemoteKey({ mediaKind, sha256, originalFilename }) {
  if (!['image', 'video', 'audio'].includes(mediaKind)) {
    throw new Error(`Unsupported media kind: ${mediaKind}`);
  }
  if (!/^[a-f0-9]{64}$/.test(sha256)) {
    throw new Error(`Invalid SHA-256: ${sha256}`);
  }
  const basename = normalizeRemoteBasename(originalFilename);
  return `v1/${mediaKind}/${sha256}/${basename}`;
}

export function storageFilenameFor(originalFilename, mime) {
  const normalized = normalizeRemoteBasename(originalFilename);
  const extension = path.posix.extname(normalized);
  if (EXPECTED_MIMES.get(extension)?.has(mime)) return normalized;
  // Preserve original bytes and path; only the remote suffix corrects legacy mislabeling.
  if (mime === 'image/jpeg') return `${normalized.slice(0, -extension.length)}.jpg`;
  throw new Error(`Unsupported MIME/extension correction: ${originalFilename}: ${mime}`);
}

export function buildRemoteUrl(origin, remoteKey) {
  const normalizedOrigin = normalizeOrigin(origin);
  const safeKey = assertSafeRelativePath(remoteKey);
  return `${normalizedOrigin}/${safeKey.split('/').map(encodeURIComponent).join('/')}`;
}

export function detectMimeFromBuffer(buffer) {
  if (!Buffer.isBuffer(buffer)) {
    throw new Error('MIME detection requires a Buffer');
  }
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return 'image/png';
  }
  if (buffer.length >= 6 && (buffer.subarray(0, 6).toString('ascii') === 'GIF87a' || buffer.subarray(0, 6).toString('ascii') === 'GIF89a')) {
    return 'image/gif';
  }
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg';
  }
  if (buffer.length >= 12 && buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP') {
    return 'image/webp';
  }
  if (buffer.length >= 12 && buffer.subarray(4, 8).toString('ascii') === 'ftyp') {
    const brand = buffer.subarray(8, 12).toString('ascii');
    if (['avif', 'avis'].includes(brand)) return 'image/avif';
    if (['M4A ', 'M4B '].includes(brand)) return 'audio/mp4';
    return 'video/mp4';
  }
  if (buffer.length >= 4 && buffer.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]))) {
    return 'video/webm';
  }
  if (buffer.length >= 12 && buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WAVE') {
    return 'audio/wav';
  }
  if (buffer.length >= 4 && buffer.subarray(0, 4).toString('ascii') === 'OggS') {
    return 'audio/ogg';
  }
  if (buffer.length >= 4 && buffer.subarray(0, 4).toString('ascii') === 'fLaC') {
    return 'audio/flac';
  }
  if (buffer.length >= 3 && buffer.subarray(0, 3).toString('ascii') === 'ID3') {
    return 'audio/mpeg';
  }
  if (buffer.length >= 2 && buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0) {
    return 'audio/mpeg';
  }
  const text = buffer.subarray(0, Math.min(buffer.length, 65536)).toString('utf8').replace(/^\uFEFF/, '').trimStart();
  if (/<svg(?:\s|>)/i.test(text)) {
    return 'image/svg+xml';
  }
  throw new Error('Could not identify media MIME from content');
}

function mimeMatchesExtension(extension, mime) {
  return EXPECTED_MIMES.get(extension)?.has(mime) ?? false;
}

function readUInt24LE(buffer, offset) {
  return buffer.readUIntLE(offset, 3);
}

export function parseRasterDimensions(buffer, mime) {
  if (mime === 'image/png' && buffer.length >= 24) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if (mime === 'image/gif' && buffer.length >= 10) {
    return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }
  if (mime === 'image/webp' && buffer.length >= 30) {
    const chunk = buffer.subarray(12, 16).toString('ascii');
    if (chunk === 'VP8X' && buffer.length >= 30) {
      return { width: 1 + readUInt24LE(buffer, 24), height: 1 + readUInt24LE(buffer, 27) };
    }
    if (chunk === 'VP8L' && buffer.length >= 25) {
      const bits = buffer.readUInt32LE(21);
      return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
    }
  }
  if (mime === 'image/jpeg') {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buffer[offset + 1];
      offset += 2;
      if (marker === 0xd8 || marker === 0xd9) continue;
      if (offset + 2 > buffer.length) break;
      const segmentLength = buffer.readUInt16BE(offset);
      if (segmentLength < 2 || offset + segmentLength > buffer.length) break;
      const isStartOfFrame = (marker >= 0xc0 && marker <= 0xc3) || (marker >= 0xc5 && marker <= 0xc7) || (marker >= 0xc9 && marker <= 0xcb) || (marker >= 0xcd && marker <= 0xcf);
      if (isStartOfFrame && segmentLength >= 7) {
        return { width: buffer.readUInt16BE(offset + 5), height: buffer.readUInt16BE(offset + 3) };
      }
      offset += segmentLength;
    }
  }
  if (mime === 'image/svg+xml') {
    const text = buffer.toString('utf8');
    const viewBox = text.match(/\bviewBox\s*=\s*["']\s*[-+\d.e]+\s+[-+\d.e]+\s+([-+\d.e]+)\s+([-+\d.e]+)\s*["']/i);
    const width = text.match(/\bwidth\s*=\s*["']\s*([\d.]+)(?:px)?\s*["']/i);
    const height = text.match(/\bheight\s*=\s*["']\s*([\d.]+)(?:px)?\s*["']/i);
    if (width && height) return { width: Number(width[1]), height: Number(height[1]) };
    if (viewBox) return { width: Number(viewBox[1]), height: Number(viewBox[2]) };
  }
  return null;
}

async function probeWithFfprobe(filePath) {
  return new Promise((resolve, reject) => {
    const child = spawn('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_streams', '-show_format', filePath], { windowsHide: true });
    let stdout = '';
    let stderr = '';
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('error', (error) => {
      if (error.code === 'ENOENT') resolve(null);
      else reject(error);
    });
    child.on('close', (code) => {
      if (code === 0) {
        try {
          resolve(JSON.parse(stdout));
        } catch (error) {
          reject(new Error(`ffprobe returned invalid JSON: ${error.message}`));
        }
      } else if (code !== null) {
        reject(new Error(`ffprobe failed for ${filePath}: ${stderr.trim() || `exit ${code}`}`));
      }
    });
  });
}

async function readMetadata(filePath, buffer, mediaKind, mime) {
  let dimensions = parseRasterDimensions(buffer, mime);
  let dimensionsTool = dimensions ? 'built-in' : null;
  if (mediaKind === 'image') {
    if (!dimensions) {
      try {
        const { default: sharp } = await import('sharp');
        const info = await sharp(buffer).metadata();
        if (info.width > 0 && info.height > 0) {
          dimensions = { width: info.width, height: info.height };
          dimensionsTool = 'sharp';
        }
      } catch {
        // Keep unsupported or invalid assets explicit in metadata_pending.
      }
    }
    return {
      width: dimensions?.width ?? null,
      height: dimensions?.height ?? null,
      durationSeconds: null,
      codec: null,
      metadataTool: dimensionsTool,
      ...(dimensions ? {} : { metadataWarning: 'image-dimensions-parser-unavailable' }),
      metadataPending: dimensions ? [] : ['dimensions'],
    };
  }
  let probe;
  let probeWarning = null;
  try {
    probe = await probeWithFfprobe(filePath);
  } catch (error) {
    probeWarning = error.code === 'ENOENT' ? 'ffprobe-not-available' : 'ffprobe-failed';
  }
  if (!probe) {
    return {
      width: null,
      height: null,
      durationSeconds: null,
      codec: null,
      metadataTool: null,
      metadataWarning: probeWarning || 'ffprobe-not-available',
      metadataPending: mediaKind === 'image' ? ['dimensions'] : ['width', 'height', 'duration_seconds', 'codec'],
    };
  }
  const stream = probe.streams?.find((candidate) => candidate.codec_type === mediaKind || (mediaKind === 'image' && candidate.codec_type === 'video')) ?? probe.streams?.[0];
  const durationRaw = stream?.duration ?? probe.format?.duration;
  const durationSeconds = durationRaw == null ? null : Number(durationRaw);
  if (durationRaw != null && !Number.isFinite(durationSeconds)) {
    return {
      width: null,
      height: null,
      durationSeconds: null,
      codec: null,
      metadataTool: 'ffprobe',
      metadataWarning: 'ffprobe-invalid-duration',
      metadataPending: ['duration_seconds', 'codec'],
    };
  }
  const pending = [];
  if (!Number.isFinite(Number(stream?.width))) pending.push('width');
  if (!Number.isFinite(Number(stream?.height))) pending.push('height');
  if (durationRaw == null && (mediaKind === 'video' || mediaKind === 'audio')) pending.push('duration_seconds');
  if (!stream?.codec_name && (mediaKind === 'video' || mediaKind === 'audio')) pending.push('codec');
  return {
    width: Number.isFinite(Number(stream?.width)) ? Number(stream.width) : null,
    height: Number.isFinite(Number(stream?.height)) ? Number(stream.height) : null,
    durationSeconds,
    codec: stream?.codec_name ?? null,
    metadataTool: 'ffprobe',
    metadataPending: pending,
  };
}

async function walkFiles(root, { skipDirectories = new Set() } = {}) {
  const result = [];
  async function visit(directory) {
    const entries = (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, 'en'));
    for (const entry of entries) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        if (skipDirectories.has(entry.name)) continue;
        await visit(absolute);
      }
      else if (entry.isFile()) result.push(absolute);
    }
  }
  await visit(root);
  return result;
}

async function buildReferenceIndex({ repoRoot, excludedPaths = [] }) {
  const excluded = new Set(excludedPaths.map((entry) => toPosix(path.resolve(repoRoot, entry))));
  const index = [];
  for (const filePath of await walkFiles(repoRoot, { skipDirectories: IGNORED_REFERENCE_DIRS })) {
    const relative = toPosix(path.relative(repoRoot, filePath));
    if (relative.split('/').some((part) => IGNORED_REFERENCE_DIRS.has(part))) continue;
    if (!TEXT_REFERENCE_EXTENSIONS.has(path.extname(filePath).toLowerCase())) continue;
    if (excluded.has(toPosix(path.resolve(filePath)))) continue;
    const contents = await readFile(filePath);
    if (contents.includes(0)) continue;
    const text = contents.toString('utf8');
    let draftOwner = false;
    if (path.extname(filePath).toLowerCase() === '.json') {
      try { draftOwner = JSON.parse(text).draft === true; } catch { /* non-authoritative JSON fragment */ }
    }
    index.push({ file: relative, lines: text.split(/\r?\n/), draftOwner, authority: relative.startsWith('src/lib/generated/') ? 'generated' : 'source' });
  }
  return index.sort((a, b) => a.file.localeCompare(b.file, 'en'));
}

function findReferences({ repoRoot, publicRoot, sourcePath, referenceIndex }) {
  const publicRelative = toPosix(path.relative(repoRoot, publicRoot));
  const localUrl = `/${toPosix(path.relative(publicRoot, path.join(repoRoot, sourcePath)))}`;
  const sourceVariants = new Set([
    localUrl,
    sourcePath,
    sourcePath.replaceAll('/', '\\'),
    `${publicRelative}/${localUrl.slice(1)}`,
    `${publicRelative.replaceAll('/', '\\')}\\${localUrl.slice(1).replaceAll('/', '\\')}`,
  ]);
  const references = [];
  for (const entry of referenceIndex) {
    if (entry.file === sourcePath) continue;
    const lines = entry.lines;
    lines.forEach((line, lineIndex) => {
      for (const literal of sourceVariants) {
        let start = 0;
        while (true) {
          const column = line.indexOf(literal, start);
          if (column < 0) break;
          references.push({ file: entry.file, line: lineIndex + 1, column: column + 1, literal, authority: entry.authority });
          start = column + literal.length;
        }
      }
    });
  }
  return references.sort((a, b) => a.file.localeCompare(b.file, 'en') || a.line - b.line || a.column - b.column || a.literal.localeCompare(b.literal, 'en'));
}

export async function collectInventory({ publicRoot, repoRoot, origin = DEFAULT_ORIGIN, manifestPath } = {}) {
  const resolvedPublicRoot = path.resolve(publicRoot ?? path.join(process.cwd(), 'public'));
  const resolvedRepoRoot = path.resolve(repoRoot ?? process.cwd());
  const relativePublicRoot = toPosix(path.relative(resolvedRepoRoot, resolvedPublicRoot));
  assertSafeRelativePath(relativePublicRoot);
  const normalizedOrigin = normalizeOrigin(origin);
  const excludedPaths = manifestPath ? [manifestPath] : [];
  const referenceIndex = await buildReferenceIndex({ repoRoot: resolvedRepoRoot, excludedPaths });
  const assets = [];
  for (const filePath of await walkFiles(resolvedPublicRoot)) {
    const extension = path.extname(filePath).toLowerCase();
    if (!MEDIA_EXTENSIONS.has(extension)) continue;
    const buffer = await readFile(filePath);
    const mime = detectMimeFromBuffer(buffer);
    const mimeExtensionMatch = mimeMatchesExtension(extension, mime);
    const mediaKind = mime.startsWith('image/') ? 'image' : mime.startsWith('video/') ? 'video' : mime.startsWith('audio/') ? 'audio' : null;
    if (!mediaKind) throw new Error(`Unsupported media MIME ${mime}: ${filePath}`);
    const sourcePath = toPosix(path.relative(resolvedRepoRoot, filePath));
    const references = findReferences({ repoRoot: resolvedRepoRoot, publicRoot: resolvedPublicRoot, sourcePath, referenceIndex });
    const hash = createHash('sha256').update(buffer).digest('hex');
    const metadata = await readMetadata(filePath, buffer, mediaKind, mime);
    const originalFilename = path.basename(filePath);
    const storageFilename = storageFilenameFor(originalFilename, mime);
    const remoteKey = buildRemoteKey({ mediaKind, sha256: hash, originalFilename: storageFilename });
    assets.push({
      source_path: sourcePath,
      local_url: `/${toPosix(path.relative(resolvedPublicRoot, filePath))}`,
      media_kind: mediaKind,
      mime,
      mime_extension_match: mimeExtensionMatch,
      ...(mimeExtensionMatch ? {} : { validation_issues: [`mime-extension-mismatch:${extension}:${mime}`] }),
      bytes: buffer.length,
      sha256: hash,
      width: metadata.width,
      height: metadata.height,
      duration_seconds: metadata.durationSeconds,
      codec: metadata.codec,
      metadata_tool: metadata.metadataTool,
      ...(metadata.metadataWarning ? { metadata_warning: metadata.metadataWarning } : {}),
      metadata_pending: metadata.metadataPending,
      original_filename: originalFilename,
      storage_filename: storageFilename,
      status: 'candidate',
      reference_status: references.length > 0 ? 'referenced' : 'unknown',
      draft_owners: [...new Set(references.filter((reference) => reference.file.endsWith('.json') && reference.authority === 'source' && referenceIndex.find((entry) => entry.file === reference.file)?.draftOwner).map((reference) => reference.file))].sort((a, b) => a.localeCompare(b, 'en')),
      owners: [...new Set(references.map((reference) => reference.file))].sort((a, b) => a.localeCompare(b, 'en')),
      references,
      remote_key: remoteKey,
      remote_url: buildRemoteUrl(normalizedOrigin, remoteKey),
      uploaded_at: null,
      verified_at: null,
      verification_etag_or_digest: null,
      verification_status: 'unverified',
    });
  }
  assets.sort((a, b) => a.source_path.localeCompare(b.source_path, 'en'));
  assertManifestNoCollisions(assets);
  return {
    manifest_version: MANIFEST_VERSION,
    origin: normalizedOrigin,
    key_format: 'v1/<media_kind>/<sha256>/<normalized_basename>',
    publication_rule: 'Only a successful independent GET plus MIME and media Range verification may set verification_status to verified; editorial status remains candidate.',
    assets,
  };
}

export function assertManifestNoCollisions(assets) {
  const byKey = new Map();
  for (const asset of assets) {
    const previous = byKey.get(asset.remote_key);
    if (previous && (previous.sha256 !== asset.sha256 || previous.media_kind !== asset.media_kind)) {
      throw new Error(`Immutable remote key collision: ${asset.remote_key}`);
    }
    byKey.set(asset.remote_key, asset);
  }
  return true;
}

const INVENTORY_IDENTITY_FIELDS = [
  'source_path',
  'local_url',
  'bytes',
  'sha256',
  'mime',
  'remote_key',
  'remote_url',
];
const INVENTORY_EVIDENCE_FIELDS = [
  'uploaded_at',
  'verified_at',
  'verification_etag_or_digest',
  'verification_status',
];

export function mergeInventory(previous, current) {
  if (!previous || previous.manifest_version !== MANIFEST_VERSION || !Array.isArray(previous.assets)) {
    throw new Error('Cannot merge: existing manifest is invalid');
  }
  if (!current || current.manifest_version !== MANIFEST_VERSION || !Array.isArray(current.assets)) {
    throw new Error('Cannot merge: generated manifest is invalid');
  }
  if (previous.origin !== current.origin) throw new Error('Cannot merge: manifest origin changed');

  const previousBySource = new Map();
  for (const asset of previous.assets) {
    if (typeof asset?.source_path !== 'string' || previousBySource.has(asset.source_path)) {
      throw new Error('Cannot merge: existing manifest has duplicate or invalid source_path');
    }
    previousBySource.set(asset.source_path, asset);
  }

  return {
    ...current,
    assets: current.assets.map((asset) => {
      const old = previousBySource.get(asset.source_path);
      if (!old || !INVENTORY_IDENTITY_FIELDS.every((field) => old[field] === asset[field])) return asset;
      return {
        ...asset,
        ...Object.fromEntries(INVENTORY_EVIDENCE_FIELDS
          .filter((field) => Object.prototype.hasOwnProperty.call(old, field))
          .map((field) => [field, old[field]])),
      };
    }),
  };
}

export async function writeJsonAtomically(filePath, value) {
  const target = path.resolve(filePath);
  const temporary = `${target}.tmp-${process.pid}`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  const { rename } = await import('node:fs/promises');
  await rename(temporary, target);
}

export function parseCliArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--help' || argument === '-h') options.help = true;
    else if (argument === '--stdout' || argument === '--write' || argument === '--json'
      || argument === '--merge' || argument === '--append') {
      options[argument.slice(2).replace('-', '_')] = true;
    }
    else if (argument.startsWith('--')) {
      const [key, inlineValue] = argument.slice(2).split('=', 2);
      const value = inlineValue ?? argv[++index];
      if (value == null || value.startsWith('--')) throw new Error(`Missing value for ${argument}`);
      if (key === 'asset') (options.asset ??= []).push(value);
      else options[key.replaceAll('-', '_')] = value;
    } else throw new Error(`Unknown argument: ${argument}`);
  }
  return options;
}

export function readLocalAssetPath(repoRoot, sourcePath) {
  const safeSourcePath = assertSafeRelativePath(sourcePath);
  return resolveInside(repoRoot, safeSourcePath);
}

export const libraryModulePath = fileURLToPath(import.meta.url);
