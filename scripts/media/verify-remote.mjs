#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  assertManifestNoCollisions,
  buildRemoteKey,
  DEFAULT_ORIGIN,
  detectMimeFromBuffer,
  parseCliArgs,
  readLocalAssetPath,
  storageFilenameFor,
  writeJsonAtomically,
} from './library.mjs';

function headerMime(response) {
  return response.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase() ?? null;
}

async function digestResponse(response, maxBytes) {
  if (!response.body) throw new Error('Remote response has no body');
  const declaredLength = Number(response.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) throw new Error(`Remote response exceeds max bytes (${declaredLength} > ${maxBytes})`);
  const reader = response.body.getReader();
  const hash = createHash('sha256');
  let bytes = 0;
  const prefixChunks = [];
  let prefixBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = Buffer.from(value);
      hash.update(chunk);
      bytes += chunk.length;
      if (bytes > maxBytes) {
        await reader.cancel();
        throw new Error(`Remote response exceeds max bytes (${bytes} > ${maxBytes})`);
      }
      if (prefixBytes < 65536) {
        const prefix = chunk.subarray(0, 65536 - prefixBytes);
        prefixChunks.push(prefix);
        prefixBytes += prefix.length;
      }
    }
    return { bytes, sha256: hash.digest('hex'), sniffedMime: detectMimeFromBuffer(Buffer.concat(prefixChunks)) };
  } catch (error) {
    try { await reader.cancel(); } catch { /* response is already aborted */ }
    throw error;
  } finally {
    reader.releaseLock();
  }
}

async function readRange(url, start, end, fetchImpl, signal) {
  const response = await fetchImpl(url, { method: 'GET', redirect: 'error', signal, headers: { Range: `bytes=${start}-${end}` } });
  const expectedBytes = end - start + 1;
  if (response.status === 416) {
    await response.body?.cancel();
    return { response, bytes: Buffer.alloc(0) };
  }
  if (response.status !== 206) {
    await response.body?.cancel();
    throw new Error(`Range request returned ${response.status}`);
  }
  const declaredLength = Number(response.headers.get('content-length'));
  if (response.status === 206 && Number.isFinite(declaredLength) && declaredLength > expectedBytes) {
    await response.body?.cancel();
    throw new Error(`Range response exceeds bound (${declaredLength} > ${expectedBytes})`);
  }
  if (!response.body) throw new Error('Range response has no body');
  const reader = response.body.getReader();
  const chunks = [];
  let bytesRead = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = Buffer.from(value);
      bytesRead += chunk.length;
      if (bytesRead > expectedBytes) {
        await reader.cancel();
        throw new Error(`Range response exceeds bound (${bytesRead} > ${expectedBytes})`);
      }
      chunks.push(chunk);
    }
    return { response, bytes: Buffer.concat(chunks) };
  } catch (error) {
    try { await reader.cancel(); } catch { /* response is already aborted */ }
    throw error;
  } finally {
    reader.releaseLock();
  }
}

async function verifyRanges(asset, localBytes, fetchImpl, timeoutMs) {
  const length = localBytes.length;
  const ranges = [
    [0, 0],
    [Math.floor(length / 2), Math.min(length - 1, Math.floor(length / 2) + 1)],
    [length - 1, length - 1],
  ];
  const checks = [];
  for (const [start, end] of ranges) {
    const { response, bytes } = await readRange(asset.remote_url, start, end, fetchImpl, AbortSignal.timeout(timeoutMs));
    const expected = localBytes.subarray(start, end + 1);
    const contentRange = response.headers.get('content-range');
    const acceptsRanges = response.headers.get('accept-ranges')?.toLowerCase() === 'bytes';
    // Accept-Ranges advertises capability on the full GET; a 206 proves actual support.
    const ok = response.status === 206
      && contentRange === `bytes ${start}-${end}/${length}`
      && bytes.equals(expected);
    checks.push({ start, end, status: response.status, content_range: contentRange, accept_ranges: acceptsRanges, bytes: bytes.length, ok });
  }
  const invalid = await readRange(asset.remote_url, length, length, fetchImpl, AbortSignal.timeout(timeoutMs));
  checks.push({ invalid_range: `bytes=${length}-${length}`, status: invalid.response.status,
    content_range: invalid.response.headers.get('content-range'),
    cache_control: invalid.response.headers.get('cache-control'),
    ok: invalid.response.status === 416 && invalid.response.headers.get('content-range') === `bytes */${length}`
      && /(?:^|,)\s*no-store\b/i.test(invalid.response.headers.get('cache-control') ?? '')
      && !/\bimmutable\b/i.test(invalid.response.headers.get('cache-control') ?? '') });
  return checks;
}

export async function verifyAsset(asset, { repoRoot = process.cwd(), fetchImpl = fetch, allowedOrigins = [DEFAULT_ORIGIN], timeoutMs = 15000, maxBytes = asset.bytes } = {}) {
  const errors = [];
  const checks = {};
  if (!/^[a-f0-9]{64}$/.test(asset.sha256) || !Number.isSafeInteger(asset.bytes) || asset.bytes < 1) {
    return { source_path: asset.source_path, remote_url: asset.remote_url, ok: false, checks, errors: ['invalid-asset-integrity-fields'] };
  }
  const storageFilename = storageFilenameFor(asset.original_filename, asset.mime);
  if ((asset.mime_extension_match === false || asset.storage_filename) && asset.storage_filename !== storageFilename) {
    return { source_path: asset.source_path, remote_url: asset.remote_url, ok: false, checks, errors: ['mime-extension-mismatch'] };
  }
  if (asset.remote_key !== buildRemoteKey({ mediaKind: asset.media_kind, sha256: asset.sha256, originalFilename: storageFilename })) {
    return { source_path: asset.source_path, remote_url: asset.remote_url, ok: false, checks, errors: ['remote-key-does-not-match-content'] };
  }
  let localBytes;
  try {
    localBytes = await readFile(readLocalAssetPath(repoRoot, asset.source_path));
    const localHash = createHash('sha256').update(localBytes).digest('hex');
    checks.local = { bytes: localBytes.length, sha256: localHash, ok: localBytes.length === asset.bytes && localHash === asset.sha256 };
    if (!checks.local.ok) errors.push('local-manifest-mismatch');
  } catch (error) {
    errors.push(`local-read:${error.message}`);
    return { source_path: asset.source_path, remote_url: asset.remote_url, ok: false, checks, errors };
  }
  let remoteUrl;
  try {
    remoteUrl = new URL(asset.remote_url);
    if (!allowedOrigins.includes(remoteUrl.origin)) errors.push(`origin-not-allowlisted:${remoteUrl.origin}`);
    if (remoteUrl.protocol !== 'https:') errors.push('remote-url-not-https');
    if (remoteUrl.search || remoteUrl.hash || remoteUrl.username || remoteUrl.password) errors.push('remote-url-not-canonical');
    const expectedPath = `/${asset.remote_key.split('/').map(encodeURIComponent).join('/')}`;
    if (remoteUrl.pathname !== expectedPath) errors.push('remote-path-does-not-match-key');
  } catch (error) {
    errors.push(`invalid-remote-url:${error.message}`);
    return { source_path: asset.source_path, remote_url: asset.remote_url, ok: false, checks, errors };
  }
  if (errors.length > 0) return { source_path: asset.source_path, remote_url: asset.remote_url, ok: false, checks, errors };
  try {
    const response = await fetchImpl(remoteUrl, { method: 'GET', redirect: 'error', signal: AbortSignal.timeout(timeoutMs) });
    checks.get = { status: response.status, mime: headerMime(response), content_length: response.headers.get('content-length'), cache_control: response.headers.get('cache-control') };
    if (asset.media_kind === 'video' || asset.media_kind === 'audio') {
      checks.get.accept_ranges = response.headers.get('accept-ranges');
      if (checks.get.accept_ranges?.toLowerCase() !== 'bytes') errors.push('get-range-capability-not-advertised');
    }
    if (response.status !== 200) {
      await response.body?.cancel();
      errors.push(`get-status:${response.status}`);
    }
    const body = response.status === 200 ? await digestResponse(response, maxBytes) : null;
    if (body) {
      checks.get.bytes = body.bytes;
      checks.get.sha256 = body.sha256;
      checks.get.sniffed_mime = body.sniffedMime;
      checks.get.ok = body.bytes === asset.bytes && body.sha256 === asset.sha256 && checks.get.mime === asset.mime && body.sniffedMime === asset.mime;
      if (!checks.get.ok) errors.push('get-integrity-or-mime-mismatch');
    }
  } catch (error) {
    errors.push(`get-error:${error.message}`);
  }
  if (asset.media_kind === 'video' || asset.media_kind === 'audio') {
    try {
      checks.ranges = await verifyRanges(asset, localBytes, fetchImpl, timeoutMs);
      if (!checks.ranges.every((check) => check.ok)) errors.push('range-verification-failed');
    } catch (error) {
      errors.push(`range-error:${error.message}`);
    }
  }
  return { source_path: asset.source_path, remote_url: asset.remote_url, ok: errors.length === 0, checks, errors };
}

export async function verifyManifest(manifest, { repoRoot = process.cwd(), fetchImpl = fetch, allowedOrigins = [DEFAULT_ORIGIN], assetPaths, onResult } = {}) {
  if (manifest.manifest_version !== 1 || manifest.origin !== DEFAULT_ORIGIN || !Array.isArray(manifest.assets)) {
    throw new Error(`Manifest must be version 1 and use the fixed HTTPS origin ${DEFAULT_ORIGIN}`);
  }
  assertManifestNoCollisions(manifest.assets);
  const selected = assetPaths?.length ? manifest.assets.filter((asset) => assetPaths.includes(asset.source_path)) : manifest.assets;
  if (assetPaths?.length && selected.length !== new Set(assetPaths).size) throw new Error('One or more --asset paths were not found in the manifest');
  const results = [];
  for (const asset of selected) {
    results.push(await verifyAsset(asset, { repoRoot, fetchImpl, allowedOrigins }));
    await onResult?.(results);
  }
  return results;
}

async function main() {
  const options = parseCliArgs(process.argv.slice(2));
  if (options.help) {
  process.stdout.write(`Usage: node scripts/media/verify-remote.mjs [options]\n\nOptions:\n  --manifest PATH  Manifest path (default: data/media-manifest.json)\n  --repo-root PATH Repository root (default: current directory)\n  --asset PATH     Verify only this source_path; repeatable\n  --write          Record verification_status=verified only after all checks pass\n  --help           Show this help\n\nThe verifier uses bounded HTTPS GETs, rejects redirects, requires the exact allowlisted origin and verifies media Range responses.\n`);
    return;
  }
  const repoRoot = path.resolve(options.repo_root ?? process.cwd());
  const manifestPath = path.resolve(repoRoot, options.manifest ?? 'data/media-manifest.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  if (options.scope && options.scope !== 'media') throw new Error('Unsupported scope');
  const assetPaths = options.scope === 'media'
    ? manifest.assets.filter((asset) => /^public\/(images|videos)\//.test(asset.source_path)).map((asset) => asset.source_path)
    : options.asset;
  const reportPath = options.report ? path.resolve(repoRoot, options.report) : null;
  const results = await verifyManifest(manifest, { repoRoot, assetPaths, onResult: async (partial) => {
    if (reportPath) await writeJsonAtomically(reportPath, { checked_at: new Date().toISOString(), complete: false, results: partial });
    process.stderr.write(`Verified ${partial.length}: ${partial.at(-1).ok ? 'OK' : 'FAIL'} ${partial.at(-1).source_path}\n`);
  } });
  const failed = results.filter((result) => !result.ok);
  if (reportPath) await writeJsonAtomically(reportPath, { checked_at: new Date().toISOString(), complete: true, verified: results.length - failed.length, failed: failed.length, results });
  if (options.write) {
    if (failed.length > 0) throw new Error(`Refusing to write: ${failed.length} remote verification(s) failed`);
    const resultBySource = new Map(results.map((result) => [result.source_path, result]));
    for (const asset of manifest.assets) {
      const result = resultBySource.get(asset.source_path);
      if (!result) continue;
      asset.verification_status = 'verified';
      asset.verified_at = new Date().toISOString();
      asset.verification_etag_or_digest = result.checks.get.sha256;
    }
    await writeJsonAtomically(manifestPath, manifest);
  }
  process.stdout.write(`${JSON.stringify({ manifest: manifestPath, verified: results.length - failed.length, failed: failed.length, results }, null, 2)}\n`);
  if (failed.length > 0) process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`Remote media verification failed closed: ${error.stack || error.message}\n`);
    process.exitCode = 1;
  });
}
