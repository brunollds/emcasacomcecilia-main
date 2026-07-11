// Gera a lista COMPLETA de rotas para o diff exaustivo (spec §4.3).
// Roda ANTES da migração (lê o data.ts literal) e o routes.json resultante é
// REUTILIZADO na captura "after" — mesmo conjunto garantido nos dois lados.
// Uso: npx tsx scripts/content/list-routes.ts
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { recipes, reviews, getReviewSlug } from '@/lib/data';

// Páginas estáticas que consomem data.ts (verificado por grep na spec §7)
// + rotas de texto (sitemap/llms) que iteram os arrays.
const STATIC_ROUTES: { route: string; marker: string; minBytes: number }[] = [
  { route: '/', marker: 'emcasacomcecilia', minBytes: 5000 },
  { route: '/receitas', marker: 'emcasacomcecilia', minBytes: 5000 },
  { route: '/reviews', marker: 'emcasacomcecilia', minBytes: 5000 },
  { route: '/categorias', marker: 'emcasacomcecilia', minBytes: 5000 },
  { route: '/faqs', marker: 'emcasacomcecilia', minBytes: 5000 },
  { route: '/sobre', marker: 'emcasacomcecilia', minBytes: 5000 },
  { route: '/contato', marker: 'emcasacomcecilia', minBytes: 5000 },
  { route: '/llms.txt', marker: 'emcasacomcecilia', minBytes: 500 },
  { route: '/sitemap.xml', marker: 'emcasacomcecilia.com', minBytes: 500 },
];

const routes = [
  ...STATIC_ROUTES,
  // Artigos: marcador = slug (aparece no canonical/OG — anti soft-404).
  // Inclui DRAFTS de propósito: a captura registra o status HTTP por rota e
  // exige o MESMO status before/after (draft 404 continua 404; 200 continua 200).
  ...recipes.map((r) => ({ route: `/receitas/${r.slug}`, marker: r.slug, minBytes: 5000 })),
  ...reviews.map((r) => ({ route: `/reviews/${getReviewSlug(r)}`, marker: getReviewSlug(r), minBytes: 5000 })),
];

const seen = new Set<string>();
for (const { route } of routes) {
  if (seen.has(route)) throw new Error(`rota duplicada: ${route} (slug duplicado no data.ts?)`);
  seen.add(route);
}

mkdirSync(path.join('scripts', 'content', 'artifacts'), { recursive: true });
writeFileSync(
  path.join('scripts', 'content', 'artifacts', 'routes.json'),
  JSON.stringify(routes, null, 2) + '\n'
);
console.log(`ok ${routes.length} rotas em scripts/content/artifacts/routes.json`);
