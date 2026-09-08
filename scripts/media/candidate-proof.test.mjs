import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import test from 'node:test';
import { validateStagedMediaCandidate, validateStagedMediaDelta } from './candidate-proof.mjs';
import { validatePhase5 } from './phase5-export.mjs';

const exec = promisify(execFile);

function asset(sourcePath, bytes) {
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  const localUrl = `/${sourcePath.slice(7)}`;
  return {
    source_path: sourcePath, local_url: localUrl, media_kind: 'image', mime: 'image/png',
    bytes: bytes.length, sha256, original_filename: path.basename(sourcePath),
    storage_filename: path.basename(sourcePath), remote_key: `v1/image/${sha256}/${path.basename(sourcePath)}`,
    remote_url: `https://cdn.emcasacomcecilia.com/v1/image/${sha256}/${path.basename(sourcePath)}`,
    verification_status: 'verified', verification_etag_or_digest: sha256,
    verified_at: '2026-09-07T00:00:00.000Z',
  };
}

test('validates the exact staged tree and rejects partial media staging', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'cdn-candidate-proof-'));
  try {
    const first = asset('public/images/first.png', Buffer.from('first'));
    await mkdir(path.join(root, 'data'), { recursive: true });
    await mkdir(path.join(root, 'src/lib/generated'), { recursive: true });
    await mkdir(path.join(root, 'scripts/media'), { recursive: true });
    await mkdir(path.join(root, 'src/lib'), { recursive: true });
    await mkdir(path.join(root, 'public/images'), { recursive: true });
    await writeFile(path.join(root, 'data/media-manifest.json'), JSON.stringify({ manifest_version: 1, origin: 'https://cdn.emcasacomcecilia.com', assets: [first] }));
    await writeFile(path.join(root, 'src/lib/generated/media-delivery-map.json'), JSON.stringify({ [first.local_url]: first.remote_url }));
    await writeFile(path.join(root, 'scripts/media/legacy-archive-media.json'), '{}');
    await writeFile(path.join(root, 'scripts/media/local-fallback-media.json'), '{}');
    for (const relative of ['scripts/media/phase5-export.mjs', 'scripts/media/archive-proof.mjs', 'scripts/media/video-asset-proof.mjs', 'scripts/media/library.mjs', 'src/lib/media-delivery.mjs']) {
      await copyFile(path.join(process.cwd(), relative), path.join(root, relative));
    }
    await writeFile(path.join(root, 'public/images/first.png'), 'first');
    await writeFile(path.join(root, '.gitattributes'), 'public/images/first.png -text export-ignore\n');
    await exec('git', ['init', '--quiet'], { cwd: root });
    await exec('git', ['config', 'user.email', 'candidate@example.test'], { cwd: root });
    await exec('git', ['config', 'user.name', 'Candidate Test'], { cwd: root });
    await exec('git', ['add', '.'], { cwd: root });
    await exec('git', ['commit', '--quiet', '-m', 'baseline'], { cwd: root });

    const secondBytes = Buffer.from('second');
    const second = asset('public/images/second.png', secondBytes);
    await writeFile(path.join(root, second.source_path), secondBytes);
    await writeFile(path.join(root, 'data/media-manifest.json'), JSON.stringify({ manifest_version: 1, origin: 'https://cdn.emcasacomcecilia.com', assets: [first, second] }));
    await writeFile(path.join(root, 'src/lib/generated/media-delivery-map.json'), JSON.stringify({ [first.local_url]: first.remote_url, [second.local_url]: second.remote_url }));
    const phase5 = await validatePhase5({ repoRoot: root });
    await writeFile(path.join(root, '.gitattributes'), phase5.expectedAttributes);

    await exec('git', ['add', 'data/media-manifest.json', 'src/lib/generated/media-delivery-map.json', second.source_path], { cwd: root });
    await assert.rejects(validateStagedMediaCandidate({ root }), /Staged \.gitattributes/);
    await exec('git', ['add', '.gitattributes'], { cwd: root });
    await assert.doesNotReject(validateStagedMediaCandidate({ root }));
    await writeFile(path.join(root, 'scripts/media/phase5-export.mjs'), 'throw new Error("working tree skew");\n');
    await assert.doesNotReject(validateStagedMediaCandidate({ root }));
    await assert.doesNotReject(Promise.resolve(validateStagedMediaDelta({ root })));

    await writeFile(path.join(root, 'public/images/unmapped.png'), 'unmapped');
    await exec('git', ['add', 'public/images/unmapped.png'], { cwd: root });
    assert.throws(() => validateStagedMediaDelta({ root }), /manifest identity/);
    await assert.rejects(validateStagedMediaCandidate({ root }), /New\/unrecognized media/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
