export const dynamic = 'force-dynamic';

export async function GET() {
  const meta = {
    target_sha: process.env.EMCASA_RELEASE_TARGET_SHA || null,
    deploy_uuid: process.env.EMCASA_RELEASE_DEPLOY_UUID || null,
  };
  return new Response(JSON.stringify(meta), {
    status: 200,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}
