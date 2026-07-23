import { readFileSync } from 'node:fs';
import path from 'node:path';

export const dynamic = 'force-dynamic';

export async function GET() {
  let meta = { target_sha: null, deploy_uuid: null };
  try {
    const parsed = JSON.parse(readFileSync(path.join(process.cwd(), 'release-meta.json'), 'utf-8'));
    meta = {
      target_sha: typeof parsed.target_sha === 'string' ? parsed.target_sha : null,
      deploy_uuid: typeof parsed.deploy_uuid === 'string' ? parsed.deploy_uuid : null,
    };
  } catch {
    // Sem release-meta.json (dev) → nulls, ainda 200 + no-store.
  }
  return new Response(JSON.stringify(meta), {
    status: 200,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}
