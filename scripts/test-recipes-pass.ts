import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { createElement, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { imageConfigDefault, type ImageConfigComplete, type RemotePattern } from 'next/dist/shared/lib/image-config';
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';

import { RecipeCover, getRecipeCoverLabel, getRecipeCoverTone } from '@/components/recipe/RecipeCover';
import { PopularRecipes } from '@/components/sections/PopularRecipes';
import { getRecipeOwnImage, recipePlaceholderImages, recipes } from '@/lib/data';
import { IMAGE_REMOTE_PATTERNS } from '@/lib/imageHosts.mjs';
import { buildRecipeMetadata, buildRecipeTemplateProps } from '@/lib/recipe-template-props';
import { toListedRecipe } from '@/lib/recipeList';
import { formatMinutes, formatRecipeTime, parseRecipeMinutes } from '@/lib/recipeTime';
import { createSearchPage } from '@/lib/searchPage';

// A passada nas receitas (10/2026): nenhuma foto de outro prato (receita sem foto própria leva a capa
// desenhada e fica sem imagem no JSON-LD e no og:image), o tempo num formato só e o topo de /receitas.

const root = resolve(__dirname, '..');

// 1. O tempo: "25 min", "2h", "1h15", "1h05", de qualquer jeito que o JSON escreva.
const timeCases: [string, string][] = [
  ['25 min', '25 min'],
  ['0 min', '0 min'],
  ['1h', '1h'],
  ['1 h', '1h'],
  ['2 h', '2h'],
  ['1h15', '1h15'],
  ['1h 15 min', '1h15'],
  ['1 h 15 min', '1h15'],
  ['1h 5 min', '1h05'],
  ['1 h 5 min', '1h05'],
  ['4 h 30 min', '4h30'],
  ['12 h 10 min', '12h10'],
  ['90 min', '1h30'],
  ['  45 MIN ', '45 min'],
];
for (const [input, expected] of timeCases) assert.equal(formatRecipeTime(input), expected, `formatRecipeTime(${JSON.stringify(input)})`);
assert.equal(formatRecipeTime('A gosto'), 'A gosto', 'texto que não é tempo sai como veio');
assert.equal(formatRecipeTime(undefined), '');
assert.equal(parseRecipeMinutes('1h25'), 85);
assert.equal(parseRecipeMinutes(''), null);
assert.equal(formatMinutes(120), '2h');
assert.equal(formatMinutes(7), '7 min');

const TIME_FORMAT = /^(\d+ min|\d+h|\d+h\d{2})$/;
for (const recipe of recipes) {
  for (const field of ['prepTime', 'cookTime', 'totalTime'] as const) {
    if (recipe[field]) assert.match(formatRecipeTime(recipe[field]), TIME_FORMAT, `${recipe.slug}: ${field} "${recipe[field]}" fora do formato`);
  }
}

// 2. A foto: só a própria. Fotos de categoria (de outro prato) não aparecem em lugar nenhum.
const stockPhotos = new Set(Object.values(recipePlaceholderImages));
const isStockPhoto = (url: string | undefined) =>
  Boolean(url) && (url!.includes('/images/recipes/placeholder/') || [...stockPhotos].some((photo) => url!.endsWith(photo)));

const withImage = recipes.filter((recipe) => recipe.image);
const withoutImage = recipes.filter((recipe) => !recipe.image);
assert.ok(withImage.length > 0 && withoutImage.length > 0, 'a conferência precisa das duas turmas');
for (const recipe of withImage) assert.ok(!isStockPhoto(recipe.image), `${recipe.slug}: a foto própria é uma das fotos de categoria`);

const searchRecipes = createSearchPage({ recipes, reviews: [] });

for (const recipe of recipes) {
  const own = recipe.image;
  const card = toListedRecipe(recipe);
  const page = buildRecipeTemplateProps(recipe);
  const meta = buildRecipeMetadata(recipe);
  const jsonLdImage = (page.jsonLd as { image?: string[] }).image;
  const ogImages = (meta.openGraph as { images?: { url: string }[] }).images;
  const twitterImages = (meta.twitter as { images?: string[] }).images;

  assert.equal(getRecipeOwnImage(recipe), own || undefined);
  assert.equal(card.image, own || undefined, `${recipe.slug}: imagem do cartão`);
  assert.equal(page.recipeImage, own || undefined, `${recipe.slug}: imagem da página`);
  for (const url of [card.image, page.recipeImage, ...(jsonLdImage ?? []), ...(ogImages ?? []).map((image) => image.url), ...(twitterImages ?? [])]) {
    assert.ok(!isStockPhoto(url), `${recipe.slug}: foto de categoria em ${url}`);
  }

  if (own) {
    assert.equal(jsonLdImage?.length, 1, `${recipe.slug}: JSON-LD sem a foto própria`);
    assert.ok(jsonLdImage![0].startsWith('https://') && jsonLdImage![0].split('?')[0].endsWith(own.split('/').pop()!), `${recipe.slug}: JSON-LD com outra foto`);
    assert.equal(ogImages?.length, 1, `${recipe.slug}: og:image sem a foto própria`);
    assert.equal(meta.twitter.card, 'summary_large_image');
  } else {
    assert.equal(jsonLdImage, undefined, `${recipe.slug}: JSON-LD com imagem sem foto própria`);
    assert.equal(ogImages, undefined, `${recipe.slug}: og:image sem foto própria`);
    assert.equal(twitterImages, undefined, `${recipe.slug}: imagem no cartão do X sem foto própria`);
    assert.equal(meta.twitter.card, 'summary');
  }
  // O Recipe continua com os campos que o Google pede além da imagem.
  assert.equal(page.jsonLd['@type'], 'Recipe');
  assert.ok(page.jsonLd.name, `${recipe.slug}: Recipe sem name`);

  assert.match(card.totalTimeLabel, TIME_FORMAT, `${recipe.slug}: tempo do cartão`);
}

// O /buscar: foto própria ou capa desenhada, nunca as duas nem nenhuma.
for (const recipe of [withImage[0], withoutImage[0]]) {
  const result = searchRecipes(recipe.title).find((card) => card.href === `/receitas/${recipe.slug}`);
  assert.ok(result, `${recipe.slug}: não achado na busca`);
  assert.equal(Boolean(result.image), Boolean(recipe.image), `${recipe.slug}: imagem no /buscar`);
  assert.equal(Boolean(result.recipeCover), !recipe.image, `${recipe.slug}: capa no /buscar`);
  assert.ok(!isStockPhoto(result.image?.src), `${recipe.slug}: foto de categoria no /buscar`);
}

// 3. A capa: decoração (aria-hidden), ícone da categoria, cor fixa por categoria e do D2.
const lasanha = recipes.find((recipe) => recipe.slug === 'lasanha-a-bolonhesa');
assert.ok(lasanha && !lasanha.image, 'a lasanha deixou de ser uma receita sem foto: troque o exemplo');
const coverHtml = renderToStaticMarkup(createElement(RecipeCover, { recipe: lasanha }));
assert.match(coverHtml, /^<span aria-hidden="true" data-recipe-cover=""/);
assert.match(coverHtml, /<svg[^>]*>/, 'capa sem ícone');
assert.doesNotMatch(coverHtml, /<img/);
assert.equal(getRecipeCoverLabel({ primaryCategory: 'Sobremesa', subCategory: ['Bolos'] }), 'Bolos');
assert.equal(getRecipeCoverLabel({ primaryCategory: 'Sobremesa', subCategory: ['Pavês'] }), 'Sobremesa', 'subcategoria sem ícone cai no tipo');
assert.equal(getRecipeCoverTone('Bolos'), getRecipeCoverTone('Bolos'));
assert.ok(new Set(withoutImage.map((recipe) => getRecipeCoverTone(getRecipeCoverLabel(recipe)))).size > 1, 'capas todas da mesma cor');
for (const recipe of withoutImage) assert.match(getRecipeCoverTone(getRecipeCoverLabel(recipe)), /^bg-(amarelo-cupom|laranja|marinho|verde-claro) /);

// A faixa de receitas da home: só a foto própria, ou a capa.
const imageConfig: ImageConfigComplete = { ...imageConfigDefault, remotePatterns: IMAGE_REMOTE_PATTERNS as RemotePattern[] };
const router = { back() {}, forward() {}, refresh() {}, push() {}, replace() {}, prefetch() {} };
const render = (element: ReactElement) =>
  renderToStaticMarkup(
    createElement(ImageConfigContext.Provider, { value: imageConfig }, createElement(AppRouterContext.Provider, { value: router }, element))
  );
const stripSlugs = [withImage[0].slug, withoutImage[0].slug, withImage[1].slug, withoutImage[1].slug];
const stripHtml = render(createElement(PopularRecipes, { popularSlugs: stripSlugs }));
assert.equal((stripHtml.match(/data-recipe-cover=""/g) ?? []).length, 2, 'faixa da home: capas');
assert.ok(!/placeholder|\/images\/recipes\/(carnes\/carne|sobremesas\/mousse|pudins\/pudim|tortas\/torta|pizzas\/pizza|frango\/frango|peixes\/peixe|paes\/pao|sopas\/sopa|saladas\/salada)\.jpg/.test(stripHtml), 'faixa da home com foto de categoria');

// 4. O código: /receitas com o PageHeader e sem a faixa escura; o cliente não importa valores de @/lib/data.
const read = (path: string) => readFileSync(join(root, path), 'utf8');
const listPage = read('src/app/(pt)/receitas/page.js');
const listClient = read('src/app/(pt)/receitas/ReceitasClientPage.js');
assert.match(listPage, /<PageHeader/);
assert.match(listPage, /\{ name: 'Início', path: '\/' \},\s*\{ name: 'Receitas', path: '\/receitas' \}/);
assert.match(listPage, /title="Receitas"/);
assert.match(listPage, /intro="Receitas de casa, com passo a passo e ingredientes fáceis de achar\."/);
assert.doesNotMatch(listClient, /bg-\[#0f1d3a\]|\bLeaf\b|<h1/, 'a faixa escura voltou');
assert.match(listClient, /totalTimeLabel/);
assert.doesNotMatch(listClient, /absolute bottom-5/, 'tempo e dificuldade de novo sobre a foto');

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === 'generated' ? [] : sourceFiles(path);
    return /\.(js|jsx|ts|tsx|mjs)$/.test(name) ? [path] : [];
  });
}
const clientValueImports = sourceFiles(join(root, 'src')).filter((path) => {
  const text = readFileSync(path, 'utf8');
  return /^\s*['"]use client['"]/.test(text) && /^import\s+(?!type\b)[^;]*from\s+['"]@\/lib\/data['"]/m.test(text);
});
assert.deepEqual(clientValueImports, [], 'arquivo cliente importa valores de @/lib/data');

// Ninguém mais escolhe foto de categoria.
for (const path of sourceFiles(join(root, 'src'))) {
  assert.doesNotMatch(readFileSync(path, 'utf8'), /\bgetRecipeImage\b/, `${path}: getRecipeImage voltou`);
}

console.log(
  `✅ receitas: ${timeCases.length} formatos de tempo e os tempos de todas as receitas; ${withImage.length} com foto própria mantida e ${withoutImage.length} sem foto, com a capa e sem imagem no cartão, na página, no JSON-LD, no og:image, na home e no /buscar; o topo de /receitas.`
);
