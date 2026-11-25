import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Limites do DICA. Os por visitante ficam na memória de cada processo (a Hostinger roda de 1 a 4), contra abuso; o teto
// diário da IA é um só para todos, num arquivo da DICA_LOG_DIR. O teto de gasto final é o da Workspace da Anthropic.

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
let prunedDay = '';

// A contagem de um IP não passa do dia em que ele perguntou (a /privacidade promete): roda na primeira pergunta de cada
// dia e, pelo instrumentation.ts, de hora em hora, com ou sem pergunta.
export function pruneVisitors(now = Date.now()): void {
  const day = brasiliaDay(now);
  prunedDay = day;
  for (const [key, visitor] of visitors) if (visitor.day !== day) visitors.delete(key);
}

export function checkVisitor(ip: string, now = Date.now()): { ok: true } | { ok: false; retryAfterSec: number } {
  const day = brasiliaDay(now);
  if (day !== prunedDay) pruneVisitors(now);
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

export const AI_QUOTA_PATTERN = /^ai-quota-(\d{4}-\d{2}-\d{2})$/;

// Uma vaga no teto diário de chamadas à IA (DICA_AI_DAILY_LIMIT). Sem vaga, a rota usa a busca local.
// Com DICA_LOG_DIR, o teto é um só para todos os processos e sobrevive a reinício e deploy: cada vaga é um arquivo
// vazio numerado na pasta do dia, criado com "wx", que o sistema só deixa um processo criar. Quem perde a corrida por
// um número tenta o seguinte, até o teto. Sem a pasta, ou se ela falhar, vale o contador da memória, por processo.
export async function takeAiSlot(now = Date.now(), dir = process.env.DICA_LOG_DIR): Promise<boolean> {
  const limit = Number(process.env.DICA_AI_DAILY_LIMIT) || DEFAULT_AI_DAILY_LIMIT;
  if (dir) {
    try {
      const dayDir = path.join(dir, `ai-quota-${brasiliaDay(now)}`);
      await mkdir(dayDir, { recursive: true });
      for (let slot = (await readdir(dayDir)).length + 1; slot <= limit; slot += 1) {
        try {
          await writeFile(path.join(dayDir, String(slot)), '', { flag: 'wx' });
          return true;
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
        }
      }
      return false;
    } catch {
      // Cai no contador da memória.
    }
  }
  return takeMemorySlot(now, limit);
}

function takeMemorySlot(now: number, limit: number): boolean {
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
  prunedDay = '';
}
