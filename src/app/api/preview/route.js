// Recebe um Review JSON (rascunho da central), valida e grava pro GET /preview.
// Segurança (spec 2c §2.3/§5): token no header, limite de tamanho, validação
// pelo modelo canônico do site. Slot único + id imprevisível + TTL 10min.
import { randomBytes } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { normalizeReview } from '@/lib/content';

export const dynamic = 'force-dynamic';

const MAX_BYTES = 1_000_000; // 1MB — o maior review real tem ~30KB
const TTL_MS = 10 * 60 * 1000;

function storePath() {
  return path.join(process.cwd(), 'tmp', 'preview-central.json');
}

export async function POST(request) {
  const token = process.env.PREVIEW_TOKEN;
  if (!token) {
    // fail-loud: sem token configurado, o preview NÃO existe (nunca aberto por default)
    return Response.json({ error: 'preview desabilitado (PREVIEW_TOKEN ausente no ambiente)' }, { status: 503 });
  }
  if (request.headers.get('x-preview-token') !== token) {
    return Response.json({ error: 'token inválido' }, { status: 401 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BYTES) {
    return Response.json({ error: `payload excede ${MAX_BYTES} bytes` }, { status: 413 });
  }

  let review;
  try {
    review = JSON.parse(raw);
  } catch {
    return Response.json({ error: 'JSON inválido' }, { status: 400 });
  }

  if (
    !review || typeof review !== 'object' || Array.isArray(review) ||
    typeof review.title !== 'string' || !review.title.trim() ||
    !Array.isArray(review.contentSections)
  ) {
    return Response.json({ error: 'estrutura inválida: title (string) e contentSections (array) são obrigatórios' }, { status: 400 });
  }

  // validação canônica: o mesmo normalizador que a página real usa.
  // Se o payload não passa aqui, também não renderizaria — rejeitar cedo.
  try {
    normalizeReview(review);
  } catch (err) {
    return Response.json({ error: `modelo canônico rejeitou: ${err.message}` }, { status: 400 });
  }

  const id = randomBytes(16).toString('hex');
  mkdirSync(path.dirname(storePath()), { recursive: true });
  writeFileSync(storePath(), JSON.stringify({ id, expiresAt: Date.now() + TTL_MS, review }));

  return Response.json({ id, url: `/preview?id=${id}` });
}
