import { existsSync } from 'node:fs';
import { buildRemoteKey, buildRemoteUrl, DEFAULT_ORIGIN, readLocalAssetPath, assertSafeRelativePath, storageFilenameFor } from './library.mjs';
import { createMediaResolver } from '../../src/lib/media-delivery.mjs';

function fail(message) {
  return { ok: false, reason: message };
}

export function validateMediaAssetAvailability({ assetUrl, repoRoot, manifest, map }) {
  if (typeof assetUrl !== 'string' || !assetUrl.startsWith('/')) return fail(`asset local inválido: ${assetUrl || '(ausente)'}`);
  const relativeUrl = assetUrl.slice(1);
  if (/[\\?#]/.test(assetUrl) || /%2f|%5c/i.test(assetUrl)) return fail(`asset local não canônico: ${assetUrl}`);
  if (!/^(?:images|videos)\//.test(relativeUrl)) return fail(`asset fora do escopo de mídia: ${assetUrl}`);
  try {
    assertSafeRelativePath(relativeUrl);
  } catch (error) {
    return fail(`asset local não canônico: ${assetUrl} (${error.message})`);
  }

  const localPath = readLocalAssetPath(repoRoot, `public/${relativeUrl}`);
  if (existsSync(localPath)) return { ok: true, mode: 'local', path: localPath };

  const remoteUrl = map?.[assetUrl];
  const matchingAssets = Array.isArray(manifest?.assets)
    ? manifest.assets.filter((candidate) => candidate.local_url === assetUrl)
    : [];
  if (matchingAssets.length > 1) return fail(`manifesto possui local_url duplicada: ${assetUrl}`);
  const asset = matchingAssets[0];
  if (!remoteUrl || !asset) return fail(`asset local ausente sem prova CDN: ${assetUrl}`);
  if (asset.source_path !== `public/${relativeUrl}`) return fail(`source_path divergente: ${assetUrl}`);
  if (!Number.isSafeInteger(asset.bytes) || asset.bytes <= 0) return fail(`bytes inválidos: ${assetUrl}`);
  if (typeof asset.original_filename !== 'string'
    || asset.original_filename !== asset.source_path.split('/').at(-1)) {
    return fail(`original_filename divergente: ${assetUrl}`);
  }
  let expectedStorageFilename;
  try {
    expectedStorageFilename = storageFilenameFor(asset.original_filename, asset.mime);
  } catch (error) {
    return fail(`storage_filename inválido: ${assetUrl} (${error.message})`);
  }
  if (asset.storage_filename !== expectedStorageFilename) return fail(`storage_filename divergente: ${assetUrl}`);
  if (asset.verification_status !== 'verified'
    || asset.verification_etag_or_digest !== asset.sha256
    || typeof asset.verified_at !== 'string'
    || asset.verified_at.length === 0
    || Number.isNaN(Date.parse(asset.verified_at))) {
    return fail(`prova de verificação incompleta: ${assetUrl}`);
  }

  let expectedKey;
  let expectedUrl;
  try {
    expectedKey = buildRemoteKey({
      mediaKind: asset.media_kind,
      sha256: asset.sha256,
      originalFilename: expectedStorageFilename,
    });
    expectedUrl = buildRemoteUrl(DEFAULT_ORIGIN, expectedKey);
    createMediaResolver({ [assetUrl]: remoteUrl });
  } catch (error) {
    return fail(`identidade CDN inválida: ${assetUrl} (${error.message})`);
  }
  if (asset.remote_key !== expectedKey || asset.remote_url !== expectedUrl || remoteUrl !== expectedUrl) {
    return fail(`identidade CDN divergente: ${assetUrl}`);
  }
  return { ok: true, mode: 'cdn', remoteUrl };
}
