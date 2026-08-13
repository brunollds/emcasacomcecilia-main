import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const DEFAULT_MAX_BYTES = 45_000_000;

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

export function checkArchiveSize({ archivePath, maxBytes = DEFAULT_MAX_BYTES, rootDir = process.cwd() }) {
  if (!Number.isSafeInteger(maxBytes) || maxBytes <= 0) {
    throw new Error(`limite inválido: ${maxBytes}`);
  }

  const bytes = statSync(archivePath).size;
  if (bytes < maxBytes) {
    return { bytes, maxBytes, remainingBytes: maxBytes - bytes };
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
      const result = checkArchiveSize({ archivePath, maxBytes });
      console.log(
        `archive dentro da guarda: ${result.bytes} bytes; ` +
          `${result.remainingBytes} bytes até ${result.maxBytes}`,
      );
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
      process.exitCode = 1;
    }
  }
}
