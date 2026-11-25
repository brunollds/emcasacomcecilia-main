import { buildAnswer, buildStoreAnswer, dicasSearchUrl } from './answer';
import { normalize } from './catalog';
import { DICA_COPY } from './dicaCopy';
import type { DicaAnswer } from './dicaTypes';
import { interpretQuestion } from './interpret';
import { cacheGet, cacheSet, checkVisitor, takeAiSlot, type DicaInterpretation } from './limits';
import { matchLocal, matchStoreName } from './match';
import { logQuestion, scrubPersonalData } from './questionLog';

const MIN_LENGTH = 2;
const MAX_LENGTH = 200;

export type DicaResponse = { status: number; body: DicaAnswer | { error: string }; retryAfterSec?: number };

export async function handleQuestion(input: {
  q: unknown;
  ip: string;
  now?: number;
  interpret?: typeof interpretQuestion;
  log?: typeof logQuestion;
}): Promise<DicaResponse> {
  const now = input.now ?? Date.now();
  const interpret = input.interpret ?? interpretQuestion;
  const log = input.log ?? logQuestion;

  if (typeof input.q !== 'string') return { status: 400, body: { error: 'Escreva uma pergunta.' } };
  const trimmed = input.q.trim();
  if (trimmed.length > MAX_LENGTH) return { status: 400, body: { error: `Use até ${MAX_LENGTH} caracteres.` } };
  if (normalize(trimmed).replace(/ /g, '').length < MIN_LENGTH) return { status: 400, body: { error: 'Escreva uma pergunta.' } };

  // O texto limpo é o único que segue: vai à IA, ao cache, à busca do Dicas e ao log.
  const question = scrubPersonalData(trimmed);

  const visitor = checkVisitor(input.ip, now);
  if (visitor.ok === false) {
    const body: DicaAnswer = {
      result: 'limite',
      message: DICA_COPY.limit,
      cards: [],
      dicasUrl: dicasSearchUrl(''),
    };
    return { status: 429, body, retryAfterSec: visitor.retryAfterSec };
  }

  const store = matchStoreName(question);
  if (store) {
    const answer = buildStoreAnswer(store, now);
    void log({ question, result: answer.result, slugs: answer.cards.map((card) => card.slug) });
    return { status: 200, body: answer };
  }

  const key = normalize(question);
  let interpretation: DicaInterpretation | undefined = cacheGet(key, now);
  if (!interpretation) {
    const fromAi = takeAiSlot(now) ? await interpret(question) : null;
    if (fromAi) {
      interpretation = { ...fromAi, searchTerm: scrubPersonalData(fromAi.searchTerm), viaFallback: false };
      cacheSet(key, interpretation, now);
    } else {
      // A reserva não entra no cache: quando a IA voltar, a mesma pergunta já passa por ela. Sem a IA não dá para separar o
      // produto do resto da pergunta (um nome, um endereço), então a busca do Dicas abre vazia.
      interpretation = { terms: matchLocal(question), searchTerm: '', outOfScope: false, viaFallback: true };
    }
  }

  const answer = buildAnswer({ ...interpretation, now });
  void log({ question, result: answer.result, slugs: answer.cards.map((card) => card.slug), searchTerm: answer.searchTerm });
  return { status: 200, body: answer };
}

// O IP do visitante. O primeiro valor do x-forwarded-for é o que o cliente mandou e pode ser inventado; o último é o
// que o proxy da frente viu. Conferir no primeiro deploy se a Hostinger manda cf-connecting-ip ou x-real-ip.
export function visitorIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')?.split(',').map((item) => item.trim()).filter(Boolean);
  return (
    headers.get('cf-connecting-ip')?.trim() ||
    headers.get('x-real-ip')?.trim() ||
    forwarded?.[forwarded.length - 1] ||
    'desconhecido'
  );
}

const ALLOWED_HOSTS = new Set(['emcasacomcecilia.com', 'www.emcasacomcecilia.com', 'localhost', '127.0.0.1']);

// A pergunta só vale vinda das páginas do site. O navegador manda sec-fetch-site e Origin; quem não manda (curl, teste)
// passa e fica só com os limites por IP.
export function isAllowedOrigin(headers: Headers): boolean {
  if (headers.get('sec-fetch-site') === 'cross-site') return false;
  const origin = headers.get('origin');
  if (!origin) return true;
  try {
    return ALLOWED_HOSTS.has(new URL(origin).hostname);
  } catch {
    return false;
  }
}
