import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';

const archive = process.argv[2];
assert.ok(archive, 'Pass the rehearsal tar.gz path');
const map = JSON.parse(readFileSync('src/lib/generated/media-delivery-map.json', 'utf8'));
const entries = new Set(execFileSync('tar', ['-tzf', archive], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }).trim().split(/\r?\n/));
for (const local of Object.keys(map)) assert.ok(!entries.has(`public${local}`), `Mapped media still packaged: ${local}`);
const sources = execFileSync('git', ['ls-files', '-z', '--', 'public'], { encoding: 'utf8' }).split('\0').filter(Boolean);
let retained = 0;
for (const source of sources) {
  const attr = execFileSync('git', ['check-attr', '-z', 'export-ignore', '--', source], { encoding: 'utf8' }).split('\0')[2];
  if (attr !== 'set') {
    assert.ok(entries.has(source), `Unexcluded source missing from archive: ${source}`);
    retained++;
  }
}
for (const required of ['package.json', 'package-lock.json', 'next.config.mjs', 'data/media-manifest.json', 'src/lib/generated/media-delivery-map.json', 'src/lib/media-delivery.mjs', 'src/lib/resolve-media.mjs', 'scripts/media/library.mjs', 'scripts/media/media-redirects.mjs', 'scripts/media/video-asset-proof.mjs', 'scripts/validate-video-schema.ts']) {
  assert.ok(entries.has(required), `Required build dependency missing: ${required}`);
}
console.log(JSON.stringify({ archive, bytes: statSync(archive).size, sha256: createHash('sha256').update(readFileSync(archive)).digest('hex'), excludedMappedMedia: Object.keys(map).length, retainedPublicFiles: retained, kind: 'rehearsal, not attested deployment archive' }, null, 2));
