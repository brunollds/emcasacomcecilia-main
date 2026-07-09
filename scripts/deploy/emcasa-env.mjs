// Lê o .env de produção do emcasa de um arquivo GERENCIADO fora do repo.
// Fonte padrão: $HOME/.config/emcasa/production.env (Bruno mantém; nunca versionado).
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ENV_FILE = process.env.EMCASA_ENV_FILE
  ?? path.join(os.homedir(), '.config', 'emcasa', 'production.env');

const REQUIRED = ['NODE_OPTIONS', 'RESEND_API_KEY', 'YOUTUBE_API_KEY', 'YOUTUBE_CHANNEL_ID', 'NEXT_PUBLIC_GA_MEASUREMENT_ID'];

/** Retorna o conteúdo do .env (string) validado; NUNCA loga valores. */
export async function loadEmcasaEnv() {
  if (!existsSync(ENV_FILE)) {
    throw new Error(`arquivo de env gerenciado ausente: ${ENV_FILE} — crie-o com os valores de produção (Task 0)`);
  }
  const content = await readFile(ENV_FILE, 'utf8');
  const keys = new Set(content.split('\n').map((l) => l.split('=')[0].trim()).filter(Boolean));
  const missing = REQUIRED.filter((k) => !keys.has(k));
  if (missing.length) throw new Error(`env gerenciado sem chaves obrigatórias: ${missing.join(', ')}`);
  if (!/NODE_OPTIONS=.*v8-pool-size=1/.test(content)) {
    throw new Error('NODE_OPTIONS precisa conter --v8-pool-size=1 (senão o site dá 503)');
  }
  return content.trimEnd() + '\n';
}
