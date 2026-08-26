import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const DEFAULT_WARNING_BYTES = 47_000_000;
export const DEFAULT_MAX_BYTES = 49_000_000;

function trackedFilesBySize(rootDir, limit = 10) {
  const output = execFileSync('git', ['ls-files', '-z'], {
    cwd: rootDir,
    encoding: 'utf8',
  });

  return output
    .split('\0')
    .filter(Boolean)
    .map((relativePath) => ({
      path: relativePath,
      bytes: statSync(path.join(rootDir, relativePath)).size,
    }))
    .sort((a, b) => b.bytes - a.bytes || a.path.localeCompare(b.path))
    .slice(0, limit);
}

export function checkArchiveSize({
  archivePath,
  maxBytes = DEFAULT_MAX_BYTES,
  warningBytes = Math.min(DEFAULT_WARNING_BYTES, maxBytes),
  rootDir = process.cwd(),
}) {
  if (!Number.isSafeInteger(maxBytes) || maxBytes <= 0) {
    throw new Error(`limite inválido: ${maxBytes}`);
  }
  if (!Number.isSafeInteger(warningBytes) || warningBytes <= 0 || warningBytes > maxBytes) {
    throw new Error(`limite de aviso inválido: ${warningBytes}`);
  }

  const bytes = statSync(archivePath).size;
  if (bytes < maxBytes) {
    return {
      bytes,
      maxBytes,
      warningBytes,
      warning: bytes >= warningBytes,
      remainingBytes: maxBytes - bytes,
    };
  }

  const largest = trackedFilesBySize(rootDir)
    .map((entry) => `- ${entry.path}: ${entry.bytes} bytes`)
    .join('\n');
  throw new Error(
    `archive excede a guarda interna: ${bytes} >= ${maxBytes} bytes\n` +
      `maiores arquivos versionados:\n${largest}`,
  );
}

function isCli() {
  return process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
}

if (isCli()) {
  const archivePath = process.argv[2];
  if (!archivePath) {
    console.error('uso: node check-archive-size.mjs <archive.tar.gz>');
    process.exitCode = 2;
  } else {
    try {
      const maxBytes = process.env.ARCHIVE_MAX_BYTES
        ? Number(process.env.ARCHIVE_MAX_BYTES)
        : DEFAULT_MAX_BYTES;
      const warningBytes = process.env.ARCHIVE_WARNING_BYTES
        ? Number(process.env.ARCHIVE_WARNING_BYTES)
        : Math.min(DEFAULT_WARNING_BYTES, maxBytes);
      const result = checkArchiveSize({ archivePath, maxBytes, warningBytes });
      const prefix = result.warning ? 'aviso: archive próximo do limite' : 'archive dentro da guarda';
      console.log(`${prefix}: ${result.bytes} bytes; ${result.remainingBytes} bytes até ${result.maxBytes}`);
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
      process.exitCode = 1;
    }
  }
}
