import { appendFile, mkdir, readdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import type { DicaResult } from './dicaTypes';
import { brasiliaDay } from './limits';

// As perguntas guardadas para ver o que o público procura: sem IP, cookie, navegador ou sessão, e sem o que parecer dado
// pessoal. Um arquivo por dia em DICA_LOG_DIR, 90 dias. Sem a variável, nada é gravado.

const RETENTION_DAYS = 90;
const FILE_PATTERN = /^dica-(\d{4}-\d{2}-\d{2})\.jsonl$/;

const PERSONAL_DATA = [
  /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, // e-mail
  /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g, // CPF
  /(?:\+?55\s?)?\(?\b\d{2}\)?\s?9?\d{4}[-\s]?\d{4}\b/g, // telefone, com ou sem DDD
  /\d{6,}/g, // qualquer número longo
];

export function scrubPersonalData(text: string): string {
  return PERSONAL_DATA.reduce((result, pattern) => result.replace(pattern, '[removido]'), text);
}

let lastCleanupDay = '';

async function removeOldFiles(dir: string, now: Date): Promise<void> {
  const today = brasiliaDay(now.getTime());
  if (today === lastCleanupDay) return;
  lastCleanupDay = today;
  const limit = now.getTime() - RETENTION_DAYS * 24 * 60 * 60_000;
  for (const name of await readdir(dir)) {
    const day = FILE_PATTERN.exec(name)?.[1];
    if (day && Date.parse(`${day}T23:59:59-03:00`) < limit) await unlink(path.join(dir, name));
  }
}

export async function logQuestion(
  entry: { question: string; result: DicaResult; slugs: string[]; searchTerm?: string },
  opts: { dir?: string; now?: Date } = {},
): Promise<void> {
  const dir = opts.dir ?? process.env.DICA_LOG_DIR;
  if (!dir) return;
  const now = opts.now ?? new Date();
  try {
    await mkdir(dir, { recursive: true });
    const line = {
      at: now.toISOString(),
      q: scrubPersonalData(entry.question),
      result: entry.result,
      slugs: entry.slugs,
      searchTerm: entry.searchTerm ? scrubPersonalData(entry.searchTerm) : undefined,
    };
    await appendFile(path.join(dir, `dica-${brasiliaDay(now.getTime())}.jsonl`), `${JSON.stringify(line)}\n`, 'utf8');
    await removeOldFiles(dir, now);
  } catch {
    // O registro nunca derruba a resposta.
  }
}

export function resetQuestionLogForTests(): void {
  lastCleanupDay = '';
}
