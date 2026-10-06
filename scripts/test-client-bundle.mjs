// Roda depois do `next build`: falha se algum chunk enviado ao navegador carregar o índice de
// conteúdo (src/lib/generated/content-index.ts, todas as receitas e reviews, ~2 MB).
// Isso acontece quando um arquivo 'use client' importa um valor de '@/lib/data', direto ou
// por outro módulo que o importa — ver "Data layer" no CLAUDE.md.
import fs from 'node:fs';
import path from 'node:path';

const chunksDir = path.join(process.cwd(), '.next', 'static', 'chunks');

if (!fs.existsSync(chunksDir)) {
  console.error('❌ .next/static/chunks não existe: rode o `next build` antes deste teste.');
  process.exit(1);
}

// Cada receita do índice tem prepTime e cada review tem contentSections; um chunk sem o índice
// cita esses campos poucas vezes ou nenhuma.
const MAX_FIELD_HITS = 20;

function listChunks(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listChunks(full);
    return entry.name.endsWith('.js') ? [full] : [];
  });
}

const chunks = listChunks(chunksDir);
const offenders = [];

for (const file of chunks) {
  const text = fs.readFileSync(file, 'utf8');
  const prepTime = text.split('prepTime').length - 1;
  const contentSections = text.split('contentSections').length - 1;
  if (prepTime > MAX_FIELD_HITS || contentSections > MAX_FIELD_HITS) {
    offenders.push({ file: path.relative(chunksDir, file).replaceAll('\\', '/'), prepTime, contentSections });
  }
}

if (offenders.length > 0) {
  console.error('❌ Chunks do navegador com o índice de conteúdo:');
  for (const { file, prepTime, contentSections } of offenders) {
    console.error(`   ${file} (prepTime ×${prepTime}, contentSections ×${contentSections})`);
  }
  console.error(
    "   Procure um arquivo 'use client' que importe valor de '@/lib/data' (direto ou por outro módulo)\n" +
      '   e passe os dados por props a partir de um componente servidor.'
  );
  process.exit(1);
}

console.log(`✅ client bundle: ${chunks.length} chunks sem o índice de conteúdo.`);
