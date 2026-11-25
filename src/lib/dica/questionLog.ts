import { appendFile, mkdir, readdir, rm, unlink } from 'node:fs/promises';
import path from 'node:path';
import type { DicaResult } from './dicaTypes';
import { AI_QUOTA_PATTERN, VISITORS_PATTERN, brasiliaDay } from './limits';

// As perguntas guardadas para ver o que o público procura: sem IP, cookie, navegador ou sessão, e sem o que parecer dado
// pessoal. Um arquivo por dia em DICA_LOG_DIR, 90 dias. Sem a variável, nada é gravado.

const RETENTION_DAYS = 90;
const FILE_PATTERN = /^dica-(\d{4}-\d{2}-\d{2})\.jsonl$/;

// Com letra acentuada inclusive (joão.silva@exemplo.com.br).
const EMAIL = /[\p{L}\p{N}._%+-]+@[\p{L}\p{N}-]+(?:\.[\p{L}\p{N}-]+)+/gu;
// Dígitos com ou sem separador (espaço, ponto, hífen, parênteses, +): CPF, telefone, CEP, cartão. Com 8 dígitos ou mais
// sai inteiro; "900g", "1,8 kg", "12 meses" e "1000000" (7 dígitos) ficam.
const DIGIT_RUN = /\+?\(?\d[\d\s().-]*\d/g;
const MIN_PERSONAL_DIGITS = 8;

export function scrubPersonalData(text: string): string {
  // NFC primeiro: o "ã" escrito como "a" + til solto não é letra para o \p{L} e cortaria o e-mail no meio.
  return text
    .normalize('NFC')
    .replace(EMAIL, '[removido]')
    .replace(DIGIT_RUN, (run) => {
      if (run.replace(/\D/g, '').length < MIN_PERSONAL_DIGITS) return run;
      // O espaço do fim fica, para "123.456.789-00 e" não colar no "e".
      const trailing = /\s*$/.exec(run)?.[0] ?? '';
      return `[removido]${trailing}`;
    });
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
    // O contador da IA e a contagem por visitante (com a chave do dia) só valem no dia deles.
    const quotaDay = AI_QUOTA_PATTERN.exec(name)?.[1] ?? VISITORS_PATTERN.exec(name)?.[1];
    if (quotaDay && quotaDay < today) await rm(path.join(dir, name), { recursive: true, force: true });
  }
}

// A limpeza dos 90 dias sem depender de pergunta nova: o instrumentation.ts chama ao subir o servidor e de hora em hora,
// então ela roda mesmo com o DICA parado. Sem DICA_LOG_DIR ou sem a pasta, não faz nada.
export async function cleanupQuestionLog(opts: { dir?: string; now?: Date } = {}): Promise<void> {
  const dir = opts.dir ?? process.env.DICA_LOG_DIR;
  if (!dir) return;
  lastCleanupDay = '';
  try {
    await removeOldFiles(dir, opts.now ?? new Date());
  } catch {
    // Pasta ainda inexistente ou sem permissão: tenta de novo na próxima rodada.
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
