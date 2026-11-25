import { createHmac, randomBytes } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Limites do DICA. Com DICA_LOG_DIR, os por visitante e o teto diário da IA valem para todos os processos (a Hostinger
// roda de 1 a 4) e sobrevivem ao reinício, em arquivos da pasta do dia; sem ela, ou se ela falhar, ficam na memória de
// cada processo. O teto de gasto final é o da Workspace da Anthropic.

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

type VisitorVerdict = { ok: true } | { ok: false; retryAfterSec: number };

// A regra, igual na memória e nos arquivos: `recent` são as perguntas dos últimos 5 min, da mais antiga à mais nova.
function judgeVisitor(recent: number[], dayCount: number, now: number): VisitorVerdict {
  const last = recent[recent.length - 1];
  const wait = (until: number) => ({ ok: false as const, retryAfterSec: Math.max(1, Math.ceil((until - now) / 1000)) });
  if (last !== undefined && now - last < MIN_GAP_MS) return wait(last + MIN_GAP_MS);
  if (recent.length >= WINDOW_MAX) return wait(recent[recent.length - WINDOW_MAX] + WINDOW_MS);
  if (dayCount >= DAY_MAX) return wait(nextBrasiliaMidnight(now));
  return { ok: true };
}

export const VISITORS_PATTERN = /^visitantes-(\d{4}-\d{2}-\d{2})$/;
const SALT_FILE = 'chave';

// A chave aleatória do dia, criada pelo primeiro processo que chega ("wx") e apagada com a pasta na virada.
async function daySalt(dayDir: string): Promise<Buffer> {
  const file = path.join(dayDir, SALT_FILE);
  try {
    await writeFile(file, randomBytes(32), { flag: 'wx' });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
  }
  // Outro processo pode estar no meio da escrita.
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const salt = await readFile(file);
    if (salt.length === 32) return salt;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  throw new Error('chave do dia incompleta');
}

// Um visitante é uma pasta com o IP trocado por um código (HMAC com a chave do dia): o IP não vai ao disco. Cada
// pergunta é um arquivo numerado com a hora dela, criado com "wx", então o teto do dia vale entre processos. Os 3 s e
// os 5 min leem as horas das últimas perguntas; duas perguntas no mesmo instante, em processos diferentes, podem
// passar as duas, mas o teto do dia não.
async function checkVisitorInFiles(ip: string, now: number, dir: string): Promise<VisitorVerdict> {
  const dayDir = path.join(dir, `visitantes-${brasiliaDay(now)}`);
  await mkdir(dayDir, { recursive: true });
  const id = createHmac('sha256', await daySalt(dayDir)).update(ip).digest('hex').slice(0, 32);
  const ipDir = path.join(dayDir, id);
  await mkdir(ipDir, { recursive: true });
  const slots = (await readdir(ipDir))
    .map(Number)
    .filter(Number.isInteger)
    .sort((a, b) => a - b);
  const times = await Promise.all(
    slots.slice(-WINDOW_MAX).map((slot) => readFile(path.join(ipDir, String(slot)), 'utf8').then(Number, () => 0))
  );
  const recent = times.filter((at) => at > now - WINDOW_MS).sort((a, b) => a - b);
  const verdict = judgeVisitor(recent, slots.length, now);
  if (verdict.ok === false) return verdict;
  for (let slot = slots.length + 1; slot <= DAY_MAX; slot += 1) {
    try {
      await writeFile(path.join(ipDir, String(slot)), String(now), { flag: 'wx' });
      return { ok: true };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
    }
  }
  return judgeVisitor([], DAY_MAX, now);
}

export async function checkVisitor(ip: string, now = Date.now(), dir = process.env.DICA_LOG_DIR): Promise<VisitorVerdict> {
  if (dir) {
    try {
      return await checkVisitorInFiles(ip, now, dir);
    } catch {
      // Cai na memória.
    }
  }
  return checkVisitorInMemory(ip, now);
}

function checkVisitorInMemory(ip: string, now: number): VisitorVerdict {
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

  const verdict = judgeVisitor(visitor.recent, visitor.dayCount, now);
  if (verdict.ok === false) return verdict;

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
// um número tenta o seguinte, até o teto. Com a pasta com defeito, ou sem ela em produção, não há vaga: o teto só vale
// somado entre os processos. Sem a pasta fora de produção (dev e testes), vale o contador da memória, por processo.
export async function takeAiSlot(
  now = Date.now(),
  dir = process.env.DICA_LOG_DIR,
  production = process.env.NODE_ENV === 'production'
): Promise<boolean> {
  const limit = Number(process.env.DICA_AI_DAILY_LIMIT) || DEFAULT_AI_DAILY_LIMIT;
  if (!dir && production) return false;
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
      // Pasta configurada mas com defeito: sem IA, a rota responde pela busca local. Cair na memória multiplicaria o teto
      // pelo número de processos.
      return false;
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
