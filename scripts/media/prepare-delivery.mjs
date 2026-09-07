#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildRemoteKey,
  buildRemoteUrl,
  DEFAULT_ORIGIN,
  detectMimeFromBuffer,
  parseCliArgs,
  readLocalAssetPath,
  storageFilenameFor,
  writeJsonAtomically,
} from './library.mjs';
import { createMediaResolver } from '../../src/lib/media-delivery.mjs';

const DEFAULT_MANIFEST = 'data/media-manifest.json';
const DEFAULT_OUTPUT = 'src/lib/generated/media-delivery-map.json';
const SCOPES = ['public/images/', 'public/videos/'];

function fail(message) {
  throw new Error(message);
}

function inScope(sourcePath) {
  return typeof sourcePath === 'string' && SCOPES.some((scope) => sourcePath.startsWith(scope));
}

function selectedAssets(manifest, assetPaths) {
  if (!assetPaths?.length) fail('At least one explicit --asset is required');
  const wanted = new Set(assetPaths);
  if (wanted.size !== assetPaths.length) fail('Duplicate --asset is not allowed');
  const assets = manifest.assets.filter((asset) => wanted.has(asset.source_path));
  if (assets.length !== wanted.size) fail('One or more --asset paths were not found in the manifest');
  return assets;
}

function requireVerified(asset, label) {
  if (asset.verification_status !== 'verified'
    || asset.verification_etag_or_digest !== asset.sha256
    || typeof asset.verified_at !== 'string'
    || asset.verified_at.length === 0) {
    fail(`${label} is not independently verified: ${asset.source_path}`);
  }
}

function validateVerifiedScope(manifest) {
  const scoped = manifest.assets.filter((asset) => inScope(asset.source_path));
  if (scoped.length === 0) fail('Manifest has no public/images or public/videos assets');
  for (const asset of scoped) {
    if (asset.verification_status !== 'verified'
      || asset.verification_etag_or_digest !== asset.sha256
      || typeof asset.verified_at !== 'string'
      || asset.verified_at.length === 0) {
      fail(`Scoped asset is not independently verified: ${asset.source_path}`);
    }
  }
  return scoped.length;
}

async function validateAssetLocal(asset, repoRoot) {
    if (!inScope(asset.source_path)) fail(`Selected asset is outside media scope: ${asset.source_path}`);
    const expectedLocalUrl = `/${asset.source_path.slice('public/'.length)}`;
    if (asset.local_url !== expectedLocalUrl) fail(`Local URL mismatch: ${asset.source_path}`);
    if (asset.original_filename !== path.posix.basename(asset.source_path)) {
      fail(`Original filename mismatch: ${asset.source_path}`);
    }
    const originalFilename = asset.original_filename;
    const storageFilename = storageFilenameFor(originalFilename, asset.mime);
    if (asset.storage_filename !== storageFilename) fail(`Storage filename mismatch: ${asset.source_path}`);
    const remoteKey = buildRemoteKey({
      mediaKind: asset.media_kind,
      sha256: asset.sha256,
      originalFilename: storageFilename,
    });
    const remoteUrl = buildRemoteUrl(DEFAULT_ORIGIN, remoteKey);
    if (asset.remote_key !== remoteKey || asset.remote_url !== remoteUrl) {
      fail(`Remote identity mismatch: ${asset.source_path}`);
    }
    const bytes = await readFile(readLocalAssetPath(repoRoot, asset.source_path));
    if (detectMimeFromBuffer(bytes) !== asset.mime) {
      fail(`Local MIME mismatch: ${asset.source_path}`);
    }
    const sha256 = createHash('sha256').update(bytes).digest('hex');
    if (bytes.length !== asset.bytes || sha256 !== asset.sha256) {
      fail(`Local bytes mismatch: ${asset.source_path}`);
    }
    return asset.remote_url;
}

async function validateSelectedLocalAssets(assets, repoRoot) {
  const map = {};
  for (const asset of assets) {
    requireVerified(asset, 'Selected asset');
    map[asset.local_url] = await validateAssetLocal(asset, repoRoot);
  }
  createMediaResolver(map);
  return Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
}

async function readAppendMap(outputPath, manifest, repoRoot) {
  let current;
  try {
    current = JSON.parse(await readFile(outputPath, 'utf8'));
  } catch (error) {
    fail(`Cannot append: existing map is missing or unreadable (${error.message})`);
  }
  if (!current || Array.isArray(current) || typeof current !== 'object') {
    fail('Cannot append: existing map is malformed');
  }
  try {
    createMediaResolver(current);
  } catch (error) {
    fail(`Cannot append: existing map is invalid (${error.message})`);
  }

  const assetsByLocalUrl = new Map(manifest.assets.map((asset) => [asset.local_url, asset]));
  for (const [localUrl, remoteUrl] of Object.entries(current)) {
    const asset = assetsByLocalUrl.get(localUrl);
    if (!asset) fail(`Cannot append: mapped local URL is absent from manifest: ${localUrl}`);
    requireVerified(asset, 'Mapped asset');
    const expectedRemoteUrl = await validateAssetLocal(asset, repoRoot);
    if (remoteUrl !== expectedRemoteUrl) {
      fail(`Cannot append: remote mapping conflict for ${localUrl}`);
    }
  }
  return current;
}

export async function prepareDelivery({ manifest, repoRoot = process.cwd(), assetPaths, outputPath = path.join(repoRoot, DEFAULT_OUTPUT), write = false, append = false }) {
  if (manifest.manifest_version !== 1 || manifest.origin !== DEFAULT_ORIGIN || !Array.isArray(manifest.assets)) {
    fail(`Manifest must be version 1 and use ${DEFAULT_ORIGIN}`);
  }
  const scopedCount = append ? null : validateVerifiedScope(manifest);
  const assets = selectedAssets(manifest, assetPaths);
  const existingMap = append ? await readAppendMap(outputPath, manifest, repoRoot) : null;
  const selectedMap = await validateSelectedLocalAssets(assets, repoRoot);
  const map = append
    ? { ...existingMap, ...selectedMap }
    : selectedMap;
  if (append) {
    for (const [localUrl, remoteUrl] of Object.entries(selectedMap)) {
      const existingRemoteUrl = existingMap[localUrl];
      if (existingRemoteUrl && existingRemoteUrl !== remoteUrl) {
        fail(`Cannot append: remote mapping conflict for ${localUrl}`);
      }
    }
  }
  createMediaResolver(map);
  if (write) {
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeJsonAtomically(outputPath, map);
  }
  return { scopedCount, selectedCount: assets.length, map, outputPath, wrote: write, appended: append };
}

export async function main(argv = process.argv.slice(2)) {
  const options = parseCliArgs(argv);
  if (options.help) {
    process.stdout.write('Usage: node scripts/media/prepare-delivery.mjs --asset SOURCE_PATH [--asset SOURCE_PATH] [--manifest PATH] [--append] [--write]\n');
    return;
  }
  const repoRoot = path.resolve(options.repo_root ?? process.cwd());
  const manifestPath = path.resolve(repoRoot, options.manifest ?? DEFAULT_MANIFEST);
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const outputPath = path.resolve(repoRoot, options.out ?? DEFAULT_OUTPUT);
  const result = await prepareDelivery({ manifest, repoRoot, assetPaths: options.asset, outputPath, write: Boolean(options.write), append: Boolean(options.append) });
  process.stdout.write(`${JSON.stringify({ ok: true, dryrun: !result.wrote, scoped: result.scopedCount, selected: result.selectedCount, output: result.wrote ? outputPath : null })}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`prepare-delivery: ${error.message}\n`);
    process.exitCode = 1;
  });
}
