// Limites do DICA, em memória por processo. A Hostinger roda de 1 a 4 processos, então o teto real pode ser até 4× o
// daqui: serve contra abuso. O teto de gasto de verdade é o da conta da Anthropic.

export type DicaInterpretation = { terms: string[]; searchTerm: string; outOfScope: boolean; viaFallback: boolean };

const MIN_GAP_MS = 3_000;
const WINDOW_MS = 5 * 60_000;
const WINDOW_MAX = 8;
const DAY_MAX = 25;
const CACHE_TTL_MS = 60 * 60_000;
const CACHE_MAX = 500;
const DEFAULT_AI_DAILY_LIMIT = 1500;
const MAX_VISITORS = 50_000;

// O dia de Brasília, AAAA-MM-DD: os contadores diários viram à meia-noite daqui.
const dayFormat = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' });

export function brasiliaDay(now: number): string {
  return dayFormat.format(new Date(now));
}

// Brasília não tem horário de verão desde 2019: o dia seguinte começa à meia-noite com -03:00.
function nextBrasiliaMidnight(now: number): number {
  return Date.parse(`${brasiliaDay(now)}T00:00:00-03:00`) + 24 * 60 * 60_000;
}

type Visitor = { day: string; dayCount: number; recent: number[] };
const visitors = new Map<string, Visitor>();
let calls = 0;

export function checkVisitor(ip: string, now = Date.now()): { ok: true } | { ok: false; retryAfterSec: number } {
  const day = brasiliaDay(now);
  calls += 1;
  if (calls % 200 === 0) {
    for (const [key, visitor] of visitors) {
      if (visitor.day !== day && visitor.recent.every((at) => at < now - WINDOW_MS)) visitors.delete(key);
    }
  }
  // Teto de memória: com muitos IPs, sai o que entrou primeiro.
  while (visitors.size >= MAX_VISITORS && !visitors.has(ip)) {
    const oldest = visitors.keys().next().value;
    if (oldest === undefined) break;
    visitors.delete(oldest);
  }

  const visitor = visitors.get(ip) ?? { day, dayCount: 0, recent: [] };
  if (visitor.day !== day) {
    visitor.day = day;
    visitor.dayCount = 0;
  }
  visitor.recent = visitor.recent.filter((at) => at > now - WINDOW_MS);
  visitors.set(ip, visitor);

  const last = visitor.recent[visitor.recent.length - 1];
  const wait = (until: number) => ({ ok: false as const, retryAfterSec: Math.max(1, Math.ceil((until - now) / 1000)) });
  if (last !== undefined && now - last < MIN_GAP_MS) return wait(last + MIN_GAP_MS);
  if (visitor.recent.length >= WINDOW_MAX) return wait(visitor.recent[0] + WINDOW_MS);
  if (visitor.dayCount >= DAY_MAX) return wait(nextBrasiliaMidnight(now));

  visitor.recent.push(now);
  visitor.dayCount += 1;
  return { ok: true };
}

let aiDay = '';
let aiCount = 0;

// Uma vaga no teto diário de chamadas à IA (DICA_AI_DAILY_LIMIT). Sem vaga, a rota usa a busca local. O teto é por
// processo e zera ao reiniciar: com 4 processos, o dia pode ter até 4×. O limite de gasto é o da Workspace da Anthropic.
export function takeAiSlot(now = Date.now()): boolean {
  const limit = Number(process.env.DICA_AI_DAILY_LIMIT) || DEFAULT_AI_DAILY_LIMIT;
  const day = brasiliaDay(now);
  if (day !== aiDay) {
    aiDay = day;
    aiCount = 0;
  }
  if (aiCount >= limit) return false;
  aiCount += 1;
  return true;
}

// Só a interpretação fica no cache: o cartão é montado a cada resposta, com o código que vale na hora.
const cache = new Map<string, { at: number; value: DicaInterpretation }>();

export function cacheGet(key: string, now = Date.now()): DicaInterpretation | undefined {
  const hit = cache.get(key);
  if (!hit) return undefined;
  if (now - hit.at > CACHE_TTL_MS) {
    cache.delete(key);
    return undefined;
  }
  return hit.value;
}

export function cacheSet(key: string, value: DicaInterpretation, now = Date.now()): void {
  cache.delete(key);
  if (cache.size >= CACHE_MAX) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
  cache.set(key, { at: now, value });
}

export function resetDicaLimitsForTests(): void {
  visitors.clear();
  cache.clear();
  aiDay = '';
  aiCount = 0;
  calls = 0;
}
