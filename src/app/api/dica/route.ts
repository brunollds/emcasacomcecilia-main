import { handleQuestion, visitorIp } from '@/lib/dica/handleQuestion';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 2048;

export async function POST(request: Request) {
  // O tamanho declarado barra o corpo grande antes de lê-lo; a conferência depois da leitura cobre quem não declara.
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
    return Response.json({ error: 'Pergunta grande demais.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }
  const raw = await request.text();
  if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) {
    return Response.json({ error: 'Pergunta grande demais.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }
  let q: unknown;
  try {
    q = (JSON.parse(raw) as { q?: unknown })?.q;
  } catch {
    return Response.json({ error: 'Escreva uma pergunta.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }

  const { status, body, retryAfterSec } = await handleQuestion({ q, ip: visitorIp(request.headers) });
  const headers: Record<string, string> = { 'Cache-Control': 'no-store' };
  if (retryAfterSec) headers['Retry-After'] = String(retryAfterSec);
  return Response.json(body, { status, headers });
}
