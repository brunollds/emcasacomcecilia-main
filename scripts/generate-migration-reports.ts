import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { recipes, reviews } from '@/lib/data';
import { inferReviewKind } from '@/lib/content';

const DOCS_DIR = resolve(process.cwd(), 'docs');

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

interface ReviewReportRow {
  slug: string;
  title: string;
  kind: string;
  rating: boolean;
  verdict: boolean;
  prosCons: boolean;
  productSpec: boolean;
  cta: boolean;
  publishedAtISO: boolean;
  image: boolean;
}

const reviewRows: ReviewReportRow[] = reviews.map((review) => {
  const kind = inferReviewKind(review);
  return {
    slug: review.slug,
    title: review.title,
    kind,
    rating: typeof review.rating === 'number',
    verdict: Boolean(review.verdict && review.verdict.stars),
    prosCons: Array.isArray(review.pros) && review.pros.length > 0 && Array.isArray(review.cons) && review.cons.length > 0,
    productSpec: Array.isArray(review.productSpec) && review.productSpec.length > 0,
    cta: Boolean(review.cta && review.cta.url && review.cta.label),
    publishedAtISO: Boolean(review.publishedAtISO),
    image: Boolean(review.image),
  };
});

function yesNo(value: boolean): string {
  return value ? '✅' : '❌';
}

function reviewsTable(rows: ReviewReportRow[]): string {
  const header = '| Slug | Tipo | Rating | Verdict | Prós/Contras | Ficha | CTA | Data ISO | Imagem |';
  const separator = '|------|------|--------|---------|--------------|-------|-----|----------|--------|';
  const lines = rows.map((row) =>
    `| ${row.slug} | ${row.kind} | ${yesNo(row.rating)} | ${yesNo(row.verdict)} | ${yesNo(row.prosCons)} | ${yesNo(row.productSpec)} | ${yesNo(row.cta)} | ${yesNo(row.publishedAtISO)} | ${yesNo(row.image)} |`
  );
  return [header, separator, ...lines].join('\n');
}

const productCandidates = reviewRows
  .filter((row) => row.kind === 'produto')
  .sort((a, b) => {
    const scoreA = [a.rating, a.verdict, a.prosCons, a.productSpec, a.cta, a.publishedAtISO, a.image].filter(Boolean).length;
    const scoreB = [b.rating, b.verdict, b.prosCons, b.productSpec, b.cta, b.publishedAtISO, b.image].filter(Boolean).length;
    return scoreB - scoreA;
  });

const editorialCandidates = reviewRows
  .filter((row) => row.kind !== 'produto')
  .sort((a, b) => {
    const scoreA = [a.publishedAtISO, a.image].filter(Boolean).length;
    const scoreB = [b.publishedAtISO, b.image].filter(Boolean).length;
    return scoreB - scoreA;
  });

const nextProductPilot = productCandidates.find((row) => row.slug !== 'poltronas-reclinaveis-damie-vale-o-investimento') || productCandidates[0];
const nextEditorialPilot = editorialCandidates[0];

const reviewsReport = `# Relatório de Migração de Reviews

> Gerado automaticamente em ${new Date().toISOString().split('T')[0]}.

## Resumo

- Total de reviews: ${reviews.length}
- Produtos: ${reviewRows.filter((r) => r.kind === 'produto').length}
- Guias: ${reviewRows.filter((r) => r.kind === 'guia').length}
- Editoriais: ${reviewRows.filter((r) => r.kind === 'editorial').length}

## Tabela completa

${reviewsTable(reviewRows)}

## Candidatos a próximos pilotos

### Próximo produto recomendado

${nextProductPilot ? `- **${nextProductPilot.title}** — \`${nextProductPilot.slug}\`` : '- Nenhum produto disponível.'}
  - Completo: ${[nextProductPilot?.rating, nextProductPilot?.verdict, nextProductPilot?.prosCons, nextProductPilot?.productSpec, nextProductPilot?.cta, nextProductPilot?.publishedAtISO, nextProductPilot?.image].filter(Boolean).length}/7 campos chave.

### Próximo guia/editorial recomendado

${nextEditorialPilot ? `- **${nextEditorialPilot.title}** — \`${nextEditorialPilot.slug}\`` : '- Nenhum editorial/guia disponível.'}
  - Data ISO: ${nextEditorialPilot?.publishedAtISO ? '✅' : '❌'} | Imagem: ${nextEditorialPilot?.image ? '✅' : '❌'}

## Observações

- Reviews marcados como "produto" são inferidos pela presença de \`rating\`.
- Reviews com tipo contendo "guia" ou "cupom" são inferidos como "guia".
- Demais reviews sem \`rating\` são classificados como "editorial".
- Aplicar o novo template de review em novos pilotos só faz sentido quando houver imagem e, preferencialmente, \`publishedAtISO\`.
`;

writeFileSync(resolve(DOCS_DIR, 'reviews', 'REVIEWS-MIGRACAO-TEMPLATE.md'), reviewsReport, 'utf-8');

// ---------------------------------------------------------------------------
// Receitas
// ---------------------------------------------------------------------------

interface RecipeReportRow {
  slug: string;
  title: string;
  publishedAt: boolean;
  structuredIngredients: boolean;
  instructionGroups: boolean;
  tips: boolean;
  video: boolean;
  image: boolean;
  score: number;
}

const recipeRows: RecipeReportRow[] = recipes.map((recipe) => {
  const publishedAt = Boolean(recipe.publishedAt);
  const structuredIngredients = Boolean(recipe.structuredIngredients && recipe.structuredIngredients.length > 0);
  const instructionGroups = Boolean(recipe.instructionGroups && recipe.instructionGroups.length > 0);
  const tips = Boolean(recipe.tips && recipe.tips.length > 0);
  const video = Boolean(recipe.youtubeUrl);
  const image = Boolean(recipe.image);
  const score = [publishedAt, structuredIngredients, instructionGroups, tips, video, image].filter(Boolean).length;
  return {
    slug: recipe.slug,
    title: recipe.title,
    publishedAt,
    structuredIngredients,
    instructionGroups,
    tips,
    video,
    image,
    score,
  };
});

const totals = {
  publishedAt: recipeRows.filter((r) => r.publishedAt).length,
  structuredIngredients: recipeRows.filter((r) => r.structuredIngredients).length,
  instructionGroups: recipeRows.filter((r) => r.instructionGroups).length,
  tips: recipeRows.filter((r) => r.tips).length,
  video: recipeRows.filter((r) => r.video).length,
  image: recipeRows.filter((r) => r.image).length,
};

function recipesTable(rows: RecipeReportRow[]): string {
  const header = '| Slug | Título | Data | Ingred. estrut. | Instr. grupos | Dicas | Vídeo | Imagem | Pontos |';
  const separator = '|------|--------|------|-----------------|---------------|-------|-------|--------|--------|';
  const lines = rows.map((row) =>
    `| ${row.slug} | ${row.title} | ${yesNo(row.publishedAt)} | ${yesNo(row.structuredIngredients)} | ${yesNo(row.instructionGroups)} | ${yesNo(row.tips)} | ${yesNo(row.video)} | ${yesNo(row.image)} | ${row.score}/6 |`
  );
  return [header, separator, ...lines].join('\n');
}

const topCandidates = recipeRows
  .filter((row) => row.slug !== 'pao-naan-indiano-caseiro')
  .sort((a, b) => b.score - a.score)
  .slice(0, 10);

const nextFive = topCandidates.slice(0, 5);

const recipesReport = `# Relatório de Migração de Receitas

> Gerado automaticamente em ${new Date().toISOString().split('T')[0]}.

## Resumo agregado

- Total de receitas: ${recipes.length}
- Com \`publishedAt\`: ${totals.publishedAt}
- Com \`structuredIngredients\`: ${totals.structuredIngredients}
- Com \`instructionGroups\`: ${totals.instructionGroups}
- Com \`tips\`: ${totals.tips}
- Com vídeo específico (\`youtubeUrl\`): ${totals.video}
- Com imagem própria: ${totals.image}

## Top 10 candidatas à migração

Ordenadas por quantidade de campos estruturados preenchidos.

${recipesTable(topCandidates)}

## Próximas 5 receitas recomendadas para migrar

${nextFive.map((row, index) => `${index + 1}. **${row.title}** — \`${row.slug}\` (${row.score}/6 campos)`).join('\n')}

## Critério de ordenação

Receitas com mais campos estruturados preenchidos (data, ingredientes estruturados, grupos de instrução, dicas, vídeo e imagem) são melhores candidatas porque já aproveitam recursos do novo template sem exigir migração editorial pesada.
`;

writeFileSync(resolve(DOCS_DIR, 'receitas', 'RECEITAS-MIGRACAO-TEMPLATE.md'), recipesReport, 'utf-8');

console.log('Relatórios de migração gerados:');
console.log('  - docs/reviews/REVIEWS-MIGRACAO-TEMPLATE.md');
console.log('  - docs/receitas/RECEITAS-MIGRACAO-TEMPLATE.md');
