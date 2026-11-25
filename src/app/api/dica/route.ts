import { handleQuestion, isAllowedOrigin, visitorIp } from '@/lib/dica/handleQuestion';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 2048;
const NO_STORE = { 'Cache-Control': 'no-store' };

// Lê o corpo até 2 KB e para no primeiro pedaço que passa disso, declarado ou não o tamanho.
async function readLimitedBody(request: Request): Promise<string | null> {
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) return null;
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString('utf8');
}

export async function POST(request: Request) {
  // Outro site não usa o navegador do visitante para gastar a cota da IA.
  if (!isAllowedOrigin(request.headers)) {
    return Response.json({ error: 'Origem não permitida.' }, { status: 403, headers: NO_STORE });
  }
  const raw = await readLimitedBody(request);
  if (raw === null) return Response.json({ error: 'Pergunta grande demais.' }, { status: 400, headers: NO_STORE });
  let q: unknown;
  try {
    q = (JSON.parse(raw) as { q?: unknown })?.q;
  } catch {
    return Response.json({ error: 'Escreva uma pergunta.' }, { status: 400, headers: NO_STORE });
  }

  const { status, body, retryAfterSec } = await handleQuestion({ q, ip: visitorIp(request.headers) });
  const headers: Record<string, string> = { ...NO_STORE };
  if (retryAfterSec) headers['Retry-After'] = String(retryAfterSec);
  return Response.json(body, { status, headers });
}
