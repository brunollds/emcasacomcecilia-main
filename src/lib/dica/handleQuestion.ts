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

// O termo da busca do Dicas sem a IA: a pergunta sem o "tem" do começo e sem a pontuação do fim.
function fallbackSearchTerm(question: string): string {
  return question
    .replace(/^\s*(?:voc[eê]s\s+)?(?:t[eê]m|vendem?|procuro|quero)\s+/i, '')
    .replace(/[?!.\s]+$/, '')
    .slice(0, 60);
}

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
      dicasUrl: dicasSearchUrl(fallbackSearchTerm(question)),
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
      const searchTerm = scrubPersonalData(fromAi.searchTerm) || fallbackSearchTerm(question);
      interpretation = { ...fromAi, searchTerm, viaFallback: false };
      cacheSet(key, interpretation, now);
    } else {
      // A reserva não entra no cache: quando a IA voltar, a mesma pergunta já passa por ela.
      interpretation = { terms: matchLocal(question), searchTerm: fallbackSearchTerm(question), outOfScope: false, viaFallback: true };
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
