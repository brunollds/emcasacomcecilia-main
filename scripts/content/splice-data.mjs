// Remove os literais recipes/reviews do data.ts e injeta o import do índice.
// One-shot fail-loud: âncoras por regex; 0 ou 2+ matches = aborta sem tocar.
// Uso: node scripts/content/splice-data.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'src/lib/data.ts';
const src = readFileSync(FILE, 'utf8');
const lines = src.split('\n');

function findOne(re, label) {
  const hits = [];
  lines.forEach((line, i) => { if (re.test(line)) hits.push(i); });
  if (hits.length !== 1) throw new Error(`âncora "${label}" casou ${hits.length}x (esperado 1) — abortando`);
  return hits[0];
}

const recipesStart = findOne(/^export const recipes: Recipe\[\] = \[\s*$/, 'recipes-start');
const placeholders = findOne(/^export const recipePlaceholderImages/, 'recipePlaceholderImages');
const reviewsStart = findOne(/^export const reviews: Review\[\] = \[\s*$/, 'reviews-start');
const published = findOne(/^export const publishedReviews/, 'publishedReviews');

if (!(recipesStart < placeholders && placeholders < reviewsStart && reviewsStart < published)) {
  throw new Error('ordem inesperada das âncoras — abortando');
}

const out = [
  // import no topo (antes de tudo — imports são hoisted, sem TDZ)
  "import { recipesData, reviewsData } from './generated/content-index';",
  '',
  ...lines.slice(0, recipesStart),
  '// Conteúdo migrado para content/ (Fase 2b) — o índice é gerado no build.',
  'export const recipes: Recipe[] = recipesData as unknown as Recipe[];',
  '',
  ...lines.slice(placeholders, reviewsStart),
  'export const reviews: Review[] = reviewsData as unknown as Review[];',
  '',
  ...lines.slice(published),
].join('\n');

writeFileSync(FILE, out);
console.log(`ok: data.ts ${lines.length} -> ${out.split('\n').length} linhas`);
