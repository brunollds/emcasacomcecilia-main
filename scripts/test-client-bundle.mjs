// Roda depois do `next build`: falha se algum chunk enviado ao navegador carregar o índice de
// conteúdo (src/lib/generated/content-index.ts, todas as receitas e reviews, ~2 MB).
// Isso acontece quando um arquivo 'use client' importa um valor de '@/lib/data', direto ou
// por outro módulo que o importa — ver "Data layer" no CLAUDE.md.
// Falha também se um chunk carregar o mapa de mídia (src/lib/generated/media-delivery-map.json, ~380 KB):
// a URL de mídia é resolvida no servidor e chega pronta por prop.
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

// Cada URL do mapa leva o hash de 64 caracteres do arquivo. O hash não muda com o nome do chunk, com a
// minificação nem com o escape das barras; um componente pode citar uma ou outra URL, o mapa traz todas.
const MAX_MEDIA_HITS = 20;
const mediaMap = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'generated', 'media-delivery-map.json'), 'utf8'));
const HASH = /[0-9a-f]{64}/g;
const mediaHashes = new Set(Object.values(mediaMap).flatMap((url) => url.match(HASH) ?? []));
const mediaHitsIn = (text) => new Set((text.match(HASH) ?? []).filter((hash) => mediaHashes.has(hash))).size;

// Controles: o mapa minificado e com as barras escapadas é pego; um punhado de URLs, não.
const mapAsChunk = `e.exports=JSON.parse('${JSON.stringify(mediaMap).replaceAll('/', '\\/')}')`;
if (mediaHashes.size <= MAX_MEDIA_HITS || mediaHitsIn(mapAsChunk) !== mediaHashes.size) {
  console.error('❌ a conferência do mapa de mídia não acha o mapa num chunk de controle.');
  process.exit(1);
}
if (mediaHitsIn(Object.values(mediaMap).slice(0, 3).join(' ')) > MAX_MEDIA_HITS) {
  console.error('❌ a conferência do mapa de mídia barra um chunk com poucas URLs.');
  process.exit(1);
}

function listChunks(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listChunks(full);
    return entry.name.endsWith('.js') ? [full] : [];
  });
}

const chunks = listChunks(chunksDir);
const offenders = [];
const mediaOffenders = [];

for (const file of chunks) {
  const text = fs.readFileSync(file, 'utf8');
  const prepTime = text.split('prepTime').length - 1;
  const contentSections = text.split('contentSections').length - 1;
  if (prepTime > MAX_FIELD_HITS || contentSections > MAX_FIELD_HITS) {
    offenders.push({ file: path.relative(chunksDir, file).replaceAll('\\', '/'), prepTime, contentSections });
  }
  const mediaHits = mediaHitsIn(text);
  if (mediaHits > MAX_MEDIA_HITS) {
    mediaOffenders.push({ file: path.relative(chunksDir, file).replaceAll('\\', '/'), mediaHits });
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

if (mediaOffenders.length > 0) {
  console.error('❌ Chunks do navegador com o mapa de mídia:');
  for (const { file, mediaHits } of mediaOffenders) {
    console.error(`   ${file} (${mediaHits} de ${mediaHashes.size} arquivos do mapa)`);
  }
  console.error(
    "   Procure quem importa '@/lib/resolve-media.mjs' no grafo do cliente, inclusive arquivo sem 'use client'\n" +
      '   importado por um componente cliente, e passe a URL pronta por prop a partir do servidor.'
  );
  process.exit(1);
}

console.log(`✅ client bundle: ${chunks.length} chunks sem o índice de conteúdo e sem o mapa de mídia.`);
