#!/usr/bin/env node

import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { collectInventory, DEFAULT_ORIGIN, mergeInventory, parseCliArgs, writeJsonAtomically } from './library.mjs';

function printHelp() {
  process.stdout.write('Staging: --staging-root ABSOLUTE_EXTERNAL_ROOT (contains images/ and videos/)\n');
  process.stdout.write(`Usage: node scripts/media/inventory.mjs [options]\n\nOptions:\n  --out PATH          Write the manifest (default: data/media-manifest.json)\n  --public-root PATH  Public root relative to repo (default: public)\n  --repo-root PATH    Repository root (default: current directory)\n  --origin URL        HTTPS origin for generated URLs (default: ${DEFAULT_ORIGIN})\n  --stdout            Print JSON instead of writing a file\n  --merge             Preserve evidence when asset identity is unchanged\n  --help              Show this help\n`);
}

async function main() {
  const options = parseCliArgs(process.argv.slice(2));
  if (options.help) return printHelp();
  const repoRoot = path.resolve(options.repo_root ?? process.cwd());
  const manifestPath = path.resolve(repoRoot, options.out ?? 'data/media-manifest.json');
  let manifest = await collectInventory({
    publicRoot: path.resolve(repoRoot, options.public_root ?? 'public'),
    repoRoot,
    origin: options.origin ?? DEFAULT_ORIGIN,
    manifestPath,
    stagingRoot: options.staging_root,
  });
  if (options.merge) {
    let previous;
    try {
      previous = JSON.parse(await readFile(manifestPath, 'utf8'));
    } catch (error) {
      throw new Error(`Cannot merge existing manifest: ${error.message}`);
    }
    manifest = mergeInventory(previous, manifest);
  }
  if (options.stdout) process.stdout.write(`${JSON.stringify(manifest, null, 2)}\n`);
  else await writeJsonAtomically(manifestPath, manifest);
  process.stderr.write(`Inventoried ${manifest.assets.length} media assets; none marked published.\n`);
}

main().catch((error) => {
  process.stderr.write(`Media inventory failed closed: ${error.stack || error.message}\n`);
  process.exitCode = 1;
});
