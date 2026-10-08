import assert from 'node:assert/strict';

import { createElement, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { imageConfigDefault, type ImageConfigComplete, type RemotePattern } from 'next/dist/shared/lib/image-config';
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';

import { MyLinks } from '@/components/sections/MyLinks';
import { Offers } from '@/components/sections/Offers';
import { PopularRecipes, selectPopularRecipes } from '@/components/sections/PopularRecipes';
import { brandLinks } from '@/lib/brandLinks';
import { getRecipePrimaryCategory, recipes, type Offer, type Recipe } from '@/lib/data';
import { IMAGE_REMOTE_PATTERNS } from '@/lib/imageHosts.mjs';

// Seções de baixo da home (Receitas, Explore a casa, Ofertas do dia e Últimos vídeos), renderizadas
// como o servidor as entrega.

// Fora do Next, o next/image não conhece os hosts de imagem do next.config.mjs (as fotos das receitas
// vêm do CDN), e o useRouter() do ViewTransitionLink exige o roteador do App Router montado. A lista
// de hosts é JavaScript: o TypeScript lê o protocolo como string, não como 'https'.
const imageConfig: ImageConfigComplete = {
  ...imageConfigDefault,
  remotePatterns: IMAGE_REMOTE_PATTERNS as RemotePattern[],
};
const router = { back() {}, forward() {}, refresh() {}, push() {}, replace() {}, prefetch() {} };

function render(element: ReactElement): string {
  return renderToStaticMarkup(
    createElement(
      ImageConfigContext.Provider,
      { value: imageConfig },
      createElement(AppRouterContext.Provider, { value: router }, element)
    )
  );
}

// Texto visível: sem tags e com o & desfeito. O \s também pega o espaço fixo do formato de moeda.
function textOf(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');
}

function count(html: string, pattern: RegExp): number {
  return html.match(pattern)?.length ?? 0;
}

// A tag de abertura do link para `href`, para conferir os atributos sem depender da ordem deles.
function linkTo(html: string, href: string): string {
  const tag = html.match(/<a [^>]*>/g)?.find((candidate) => candidate.includes(`href="${href}"`));
  assert.ok(tag, `link para ${href}`);
  return tag;
}

function opensNewTab(tag: string): boolean {
  return tag.includes('target="_blank"') && tag.includes('rel="noopener noreferrer"');
}

// Receitas: escolha das 4.
const recipe = (slug: string, isPopular = false) => ({ id: slug.charCodeAt(0), slug, isPopular }) as Recipe;
const pool = [recipe('a', true), recipe('b'), recipe('c', true), recipe('d', true), recipe('e', true), recipe('f')];
const slugsOf = (list: Recipe[]) => list.map(({ slug }) => slug);

assert.deepEqual(slugsOf(selectPopularRecipes(pool, [])), ['a', 'c', 'd', 'e'], 'sem GA, as 4 primeiras populares');
assert.deepEqual(
  slugsOf(selectPopularRecipes(pool, ['f', 'x', 'f', 'c'])),
  ['f', 'c', 'a', 'd'],
  'o GA vem primeiro, na ordem dele, sem slug desconhecido nem repetido; as populares completam'
);
assert.deepEqual(slugsOf(selectPopularRecipes(pool, ['f', 'e', 'd', 'c', 'b'])), ['f', 'e', 'd', 'c'], 'no máximo 4');

const fallback = selectPopularRecipes(recipes, []);
assert.equal(fallback.length, 4, 'os dados têm pelo menos 4 receitas populares');
assert.ok(fallback.every(({ isPopular }) => isPopular));

// Receitas: a faixa renderizada.
const recipesHtml = render(createElement(PopularRecipes, {}));
const recipesText = textOf(recipesHtml);
assert.match(recipesHtml, /<h2 id="titulo-receitas"[^>]*>Receitas da Cecília<\/h2>/);
assert.ok(recipesText.includes(`${recipes.length} receitas prontas para fazer`), 'o total sai dos dados');
assert.equal(count(recipesHtml, /href="\/receitas\/[^"]+"/g), 4, 'um link por receita');
assert.match(recipesHtml, /href="\/receitas"[^>]*>Ver todas as receitas</);
for (const item of fallback) {
  assert.ok(recipesHtml.includes(`href="/receitas/${item.slug}"`));
  assert.ok(recipesText.includes(getRecipePrimaryCategory(item)), `categoria de ${item.slug}`);
  assert.ok(recipesText.includes(item.title), `título de ${item.slug}`);
}
assert.equal(count(recipesHtml, /view-transition-name:recipe-hero-/g), 4, 'a foto do card vai até o topo da receita');
assert.equal(count(recipesHtml, /<img[^>]* alt=""/g), 4, 'a foto é decorativa: o título está no link');
assert.ok(recipesHtml.includes('motion-safe:animate-[slide-up_0.5s_ease-out_backwards]'), 'a entrada dos cards fica, com motion-safe');
assert.ok(!recipesHtml.includes('animate-slide-up'), 'sem a classe que ignora o movimento reduzido');
assert.ok(!recipesText.includes('Receitas Favoritas') && !recipesText.includes('Mais Amadas'), 'o visual antigo saiu');

const notPopular = recipes.find(({ isPopular }) => !isPopular);
assert.ok(notPopular, 'os dados têm receita fora das populares');
const withAnalytics = render(createElement(PopularRecipes, { popularSlugs: [notPopular.slug] }));
assert.equal(
  withAnalytics.match(/href="\/receitas\/([^"]+)"/)?.[1],
  notPopular.slug,
  'a mais vista no GA abre a faixa'
);
assert.equal(count(withAnalytics, /href="\/receitas\/[^"]+"/g), 4, 'as populares completam as 4');

// Explore a casa.
const exploreHtml = render(createElement(MyLinks));
const exploreText = textOf(exploreHtml);
assert.match(exploreHtml, /<h2 id="titulo-explore-a-casa"[^>]*>Explore a casa<\/h2>/);
assert.equal(count(exploreHtml, /<li/g), 3, 'DAMIE, Dicas & Ofertas e E-book');
assert.ok(opensNewTab(linkTo(exploreHtml, brandLinks.damie)), 'a DAMIE abre o site dela em outra aba');
assert.ok(exploreText.includes('DAMIE: móveis, poltronas e sofás com cupom CECILIA12'));
assert.ok(exploreHtml.includes('alt="Cecília debruçada sobre a caixa de entrega da DAMIE"'));
assert.ok(opensNewTab(linkTo(exploreHtml, brandLinks.dicas)));
assert.ok(exploreText.includes('Dicas & Ofertas') && exploreText.includes('Ver ofertas'));
assert.ok(!linkTo(exploreHtml, brandLinks.airFryerEbook).includes('target='), 'o "Avise-me" abre o e-mail, sem aba nova');
assert.ok(exploreText.includes('Em preparação') && exploreText.includes('Avise-me'));

// Ofertas do dia.
const offer = (id: string, fields: Partial<Offer>): Offer => ({
  id,
  title: `Oferta ${id}`,
  description: '',
  originalPrice: 0,
  discountPrice: 0,
  discount: 0,
  store: 'Amazon',
  url: `https://example.com/oferta-${id}`,
  ...fields,
});
const offersHtml = render(
  createElement(Offers, {
    items: [
      offer('1', { originalPrice: 100, discountPrice: 79.9, discount: 20, coupon: 'CODIGO', image: '/images/oferta.webp' }),
      offer('2', { originalPrice: 50, discountPrice: 50, store: 'Mercado Livre' }),
      offer('3', {}),
    ],
  })
);
const offersText = textOf(offersHtml);
assert.match(offersHtml, /<h2 id="titulo-ofertas-do-dia"[^>]*>Ofertas do dia<\/h2>/);
assert.equal(count(offersHtml, /<li/g), 3);
assert.ok(offersText.includes('de R$ 100,00 por R$ 79,90'), 'com desconto: de … por …');
assert.ok(offersText.includes('Oferta 2 R$ 50,00') && !offersText.includes('de R$ 50,00'), 'sem desconto, só o preço');
assert.ok(offersText.includes('Oferta 3 Amazon'), 'sem preço, nada de R$');
assert.equal(count(offersText, /com cupom/g), 1, 'só a oferta com cupom avisa');
assert.ok(!offersText.includes('CODIGO') && !offersText.includes('-20%'), 'sem o código e sem o selo de porcentagem');
for (const id of ['1', '2', '3']) {
  assert.ok(opensNewTab(linkTo(offersHtml, `https://example.com/oferta-${id}`)));
}
assert.equal(count(offersHtml, /<img[^>]* alt=""/g), 1, 'a foto é decorativa e só sai quando existe');
assert.ok(offersHtml.includes('aria-label="Ver ofertas anteriores"') && offersHtml.includes('aria-label="Ver próximas ofertas"'));
assert.ok(offersHtml.includes(`${linkTo(offersHtml, brandLinks.dicas)}Acessar Dicas &amp; Ofertas</a>`));

console.log('test:home-lower-sections ok');
