import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { createElement, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { imageConfigDefault, type ImageConfigComplete, type RemotePattern } from 'next/dist/shared/lib/image-config';
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';

import { LatestVideos } from '@/components/sections/CTA';
import { MyLinks } from '@/components/sections/MyLinks';
import { OfferCarousel } from '@/components/sections/OfferCarousel';
import { PopularRecipes, selectPopularRecipes } from '@/components/sections/PopularRecipes';
import { brandLinks } from '@/lib/brandLinks';
import { getCouponBySlug } from '@/lib/couponsData';
import { getRecipePrimaryCategory, recipes, type Recipe, type SocialHighlight } from '@/lib/data';
import { getCarouselOffers, getOfferDiscountPercent, parseDicasOffers, type Offer } from '@/lib/dicasOffers';
import { IMAGE_REMOTE_PATTERNS } from '@/lib/imageHosts.mjs';

// Seções de baixo da home (Receitas, Explore a casa com as ofertas do dia e Últimos vídeos), renderizadas
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
assert.deepEqual(slugsOf(selectPopularRecipes(pool, ['x', 'y'])), ['a', 'c', 'd', 'e'], 'GA só com slug desconhecido: as populares');

const fallback = selectPopularRecipes(recipes, []);
assert.equal(fallback.length, 4, 'os dados têm pelo menos 4 receitas populares');
assert.ok(fallback.every(({ isPopular }) => isPopular));

// Receitas: a faixa renderizada.
const recipesHtml = render(createElement(PopularRecipes, {}));
const recipesText = textOf(recipesHtml);
assert.match(recipesHtml, /<h2 id="titulo-receitas"[^>]*><span class="marca-texto \[--marca-texto:#fff\]">Receitas da Cecília<\/span><\/h2>/);
assert.ok(recipesText.includes(`${recipes.length} receitas prontas para fazer`), 'o total sai dos dados');
assert.equal(count(recipesHtml, /href="\/receitas\/[^"]+"/g), 4, 'um link por receita');
// No celular, "Ver todas" ao lado do título; no desktop, o botão. O nome acessível é o mesmo.
const allRecipesLink = linkTo(recipesHtml, '/receitas');
assert.ok(allRecipesLink.includes('aria-label="Ver todas as receitas"'), 'o link de todas as receitas com o nome inteiro');
assert.match(recipesHtml, /<span class="md:hidden">Ver todas<\/span><span class="hidden md:inline">Ver todas as receitas<\/span>/);
// No celular, a descrição curta: a primeira frase só no desktop.
assert.match(recipesHtml, /<span class="hidden md:inline">Bolos, doces, air fryer e o almoço de todo dia\. <\/span>/);
// No celular, 2 receitas: a 3ª e a 4ª ficam no HTML, escondidas abaixo de 768 px.
assert.equal(count(recipesHtml, /<li class="[^"]*\bmax-md:hidden\b/g), 2, 'a 3ª e a 4ª receitas somem no celular');
for (const item of fallback) {
  assert.ok(recipesHtml.includes(`href="/receitas/${item.slug}"`));
  assert.ok(recipesText.includes(getRecipePrimaryCategory(item)), `categoria de ${item.slug}`);
  assert.ok(recipesText.includes(item.title), `título de ${item.slug}`);
}
assert.equal(count(recipesHtml, /view-transition-name:recipe-hero-/g), 4, 'a foto do card vai até o topo da receita');
assert.equal(count(recipesHtml, /<img[^>]* alt=""/g), 4, 'a foto é decorativa: o título está no link');
// Os cards entram na rolagem (.revela), não mais na carga; nada nasce escondido no HTML do servidor.
assert.equal(count(recipesHtml, /<li class="[^"]*\brevela\b[^"]*" style="--i:\d"/g), 4, 'os 4 cards com a entrada da rolagem');
assert.deepEqual(
  [...recipesHtml.matchAll(/<li class="[^"]*\brevela\b[^"]*" style="--i:(\d)"/g)].map((match) => match[1]),
  ['0', '1', '2', '3'],
  'a cascata na ordem dos cards'
);
assert.ok(!recipesHtml.includes('slide-up'), 'a entrada na carga saiu');
assert.ok(!recipesHtml.includes('data-reveal'), 'nada escondido no HTML do servidor');
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

const offer = (id: string, fields: Partial<Offer>): Offer => ({
  id,
  title: `Oferta ${id}`,
  store: 'Amazon',
  url: `https://example.com/oferta-${id}`,
  originalPrice: 0,
  discountPrice: 0,
  ...fields,
});

// Explore a casa: a DAMIE e o Dicas & Ofertas, sem o e-book. Sem oferta com foto, o card amarelo é o
// link de antes.
const exploreHtml = render(createElement(MyLinks, { offers: [offer('s1', { originalPrice: 30, discountPrice: 20 })] }));
const exploreText = textOf(exploreHtml);
assert.match(exploreHtml, /<h2 id="titulo-explore-a-casa"[^>]*><span class="marca-texto">Explore a casa<\/span><\/h2>/);
assert.equal(count(exploreHtml, /<li class="[^"]*\brevela\b[^"]*" style="--i:\d"/g), 2, 'os 2 cards do Explore a casa entram na rolagem');
assert.equal(count(exploreHtml, /<li[\s>]/g), 2, 'DAMIE e Dicas & Ofertas');
assert.ok(opensNewTab(linkTo(exploreHtml, brandLinks.damie)), 'a DAMIE abre o site dela em outra aba');
const damie = getCouponBySlug('damie');
assert.ok(damie && damie.offerMode === 'discount-code', 'a DAMIE é loja de cupom');
assert.ok(
  exploreText.includes(`DAMIE: móveis, poltronas e sofás com cupom ${damie.code}`),
  'o código da legenda sai da loja'
);
assert.ok(exploreHtml.includes('alt="Cecília debruçada sobre a caixa de entrega da DAMIE"'));
assert.ok(opensNewTab(linkTo(exploreHtml, brandLinks.dicas)));
assert.ok(exploreText.includes('Dicas & Ofertas') && exploreText.includes('Ver ofertas'), 'sem oferta com foto, o link de antes');
assert.ok(!exploreText.includes('E-book') && !exploreText.includes('Avise-me'), 'o e-book saiu');

// Com ofertas com foto: o carrossel dentro do card amarelo e o "Ver todas as ofertas".
const exploreOffersHtml = render(
  createElement(MyLinks, {
    offers: [
      offer('e1', { originalPrice: 100, discountPrice: 70, image: '/images/oferta-1.webp' }),
      offer('e2', {}),
      offer('e3', { discountPrice: 30, originalPrice: 30, image: '/images/oferta-3.webp' }),
    ],
  })
);
const exploreOffersText = textOf(exploreOffersHtml);
assert.equal(count(exploreOffersHtml, /<li[\s>]/g), 4, 'DAMIE, Dicas & Ofertas e as 2 ofertas com foto');
assert.ok(opensNewTab(linkTo(exploreOffersHtml, 'https://example.com/oferta-e1')));
assert.ok(!exploreOffersHtml.includes('https://example.com/oferta-e2'), 'oferta sem foto fica de fora');
assert.ok(exploreOffersHtml.includes(`${linkTo(exploreOffersHtml, brandLinks.dicas)}Ver todas as ofertas</a>`));
assert.ok(opensNewTab(linkTo(exploreOffersHtml, brandLinks.dicas)));
assert.ok(!exploreOffersText.includes('Ver ofertas '), 'o card com ofertas não é mais o link de antes');
assert.match(exploreOffersHtml, /<h3[^>]*>Dicas &amp; Ofertas<\/h3>/);
assert.ok(exploreOffersText.includes('R$ 30,00') && !exploreOffersText.includes('de R$ 30,00'), 'preço igual ao antigo: só o preço');
assert.ok(!/<a\b(?:(?!<\/a>)[\s\S])*<a\b/.test(exploreOffersHtml), 'nenhum link dentro de outro');

// Carrossel do card do Dicas & Ofertas: só ofertas com foto, na ordem do feed; o card mostra a foto e o
// preço, e o nome vai no alt da foto.
const carouselItems = getCarouselOffers([
  offer('c1', { originalPrice: 100, discountPrice: 79.9, image: '/images/oferta-1.webp' }),
  offer('c2', { originalPrice: 50, discountPrice: 50 }),
  offer('c3', { originalPrice: 100, discountPrice: 96, image: '/images/oferta-3.webp' }),
  offer('c4', { image: '/images/oferta-4.webp' }),
]);
assert.deepEqual(carouselItems.map(({ id }) => id), ['c1', 'c3', 'c4'], 'sem foto, fora do carrossel');

assert.equal(getOfferDiscountPercent({ originalPrice: 100, discountPrice: 79.9 }), 20);
assert.equal(getOfferDiscountPercent({ originalPrice: 100, discountPrice: 94 }), 6);
assert.equal(getOfferDiscountPercent({ originalPrice: 100, discountPrice: 95 }), 0, '5% não leva selo');
assert.equal(getOfferDiscountPercent({ originalPrice: 100, discountPrice: 96 }), 0);
assert.equal(getOfferDiscountPercent({ originalPrice: 50, discountPrice: 50 }), 0);
assert.equal(getOfferDiscountPercent({ originalPrice: 40, discountPrice: 50 }), 0, 'preço antigo menor que o novo');
assert.equal(getOfferDiscountPercent({ originalPrice: 100, discountPrice: 0 }), 0, 'sem preço');

const carouselHtml = render(
  createElement(OfferCarousel, { items: carouselItems, heading: createElement('h3', null, 'Dicas & Ofertas') })
);
const carouselText = textOf(carouselHtml);
assert.equal(count(carouselHtml, /<li[\s>]/g), 3);
for (const id of ['c1', 'c3', 'c4']) {
  assert.ok(opensNewTab(linkTo(carouselHtml, `https://example.com/oferta-${id}`)), `a oferta ${id} abre em outra aba`);
  assert.ok(carouselHtml.includes(`alt="Oferta ${id}"`), `o nome da oferta ${id} no alt da foto`);
}
assert.ok(carouselText.includes('de R$ 100,00 por R$ 79,90'), 'o leitor de tela ouve de … por …');
assert.match(carouselHtml, /<s>R\$\s100,00<\/s>/, 'o preço antigo vai riscado');
assert.equal(count(carouselHtml, /<s>/g), 2, 'riscado em c1 e em c3 (4%, sem selo); c4, sem preço, sem risco');
assert.ok(carouselText.includes('de R$ 100,00 por R$ 96,00'), 'o preço antigo vai riscado mesmo sem selo');
assert.ok(carouselHtml.includes('>−20%</span>'), 'o selo com o desconto arredondado');
assert.equal(count(carouselHtml, />−\d+%<\/span>/g), 1, 'selo só acima de 5%');
assert.match(carouselHtml, /<span aria-hidden="true" class="[^"]*bg-laranja[^"]*">−20%<\/span>/, 'o selo é decorativo');
assert.ok(carouselText.includes('Ver oferta'), 'sem preço, "Ver oferta"');
assert.ok(!carouselText.includes('Oferta c1 ') && !carouselText.includes('Amazon'), 'sem nome nem loja visíveis no card');
assert.ok(!/cupom/i.test(carouselText), 'o card não fala de cupom');
assert.ok(carouselHtml.includes('aria-label="Ver ofertas anteriores"') && carouselHtml.includes('aria-label="Ver próximas ofertas"'));
assert.ok(carouselHtml.includes('<h3>Dicas &amp; Ofertas</h3>'), 'o título do card vem de fora');

// O feed do Dicas & Ofertas: até 10 ofertas válidas, sem as que não têm nome ou link.
assert.deepEqual(parseDicasOffers({ erro: 'fora do ar' }), [], 'resposta que não é lista');
const feed = parseDicasOffers([
  {
    slug: 'gabinete',
    produto: ' Gabinete Gamer ',
    preco: 'R$ 1.394,90',
    precoAntigo: 'R$ 1.599,00',
    loja: 'Amazon',
    url: 'https://example.com/gabinete',
    imagem: 'https://m.media-amazon.com/images/gabinete.jpg',
  },
  { produto: 'Sem link' },
  null,
  { produto: 'Aspirador', preco: 199, url: 'https://example.com/aspirador', imagem: 'https://example.com/foto.jpg' },
  ...Array.from({ length: 12 }, (_, index) => ({ produto: `Extra ${index}`, url: `https://example.com/extra-${index}` })),
]);
assert.equal(feed.length, 10, 'no máximo 10, contadas depois de tirar as inválidas');
assert.deepEqual(feed[0], {
  id: 'gabinete',
  title: 'Gabinete Gamer',
  store: 'Amazon',
  url: 'https://example.com/gabinete',
  originalPrice: 1599,
  discountPrice: 1394.9,
  image: 'https://m.media-amazon.com/images/gabinete.jpg',
});
assert.deepEqual(
  feed[1],
  {
    id: 'dicas-3',
    title: 'Aspirador',
    store: 'Dicas da Cecília',
    url: 'https://example.com/aspirador',
    originalPrice: 199,
    discountPrice: 199,
    image: undefined,
  },
  'sem preço antigo, o preço; foto de host fora da lista não entra'
);

// Campo com tipo errado no feed não derruba a home: vira o valor padrão ou some.
assert.deepEqual(
  parseDicasOffers([
    { slug: 7, produto: 'Mixer', preco: true, precoAntigo: {}, loja: ['Amazon'], url: 'https://example.com/mixer', imagem: 42 },
    { produto: 'Sem link de texto', url: { href: 'https://example.com' } },
  ]),
  [
    {
      id: 'dicas-0',
      title: 'Mixer',
      store: 'Dicas da Cecília',
      url: 'https://example.com/mixer',
      originalPrice: 0,
      discountPrice: 0,
      image: undefined,
    },
  ],
  'tipos errados no feed'
);

// Preço com ponto decimal e sem vírgula, milhar sem centavos, e só link http(s) completo.
assert.deepEqual(
  parseDicasOffers([
    { produto: 'Panela', preco: '199.90', precoAntigo: 'R$ 1.394', url: 'https://example.com/panela' },
    { produto: 'Caminho relativo', url: '/receitas' },
    { produto: 'Protocolo errado', url: 'javascript:alert(1)' },
    { produto: 'Sem as barras', url: 'https:example.com' },
  ]).map(({ title, discountPrice, originalPrice }) => ({ title, discountPrice, originalPrice })),
  [{ title: 'Panela', discountPrice: 199.9, originalPrice: 1394 }],
  'preço com ponto decimal e link fora de http(s)'
);
assert.deepEqual(
  parseDicasOffers([
    { slug: 'repetida', produto: 'Primeira', url: 'https://example.com/1' },
    { slug: 'repetida', produto: 'Segunda', url: 'https://example.com/2' },
  ]).map(({ title }) => title),
  ['Primeira'],
  'slug repetido no feed: fica a primeira oferta'
);
assert.equal(
  parseDicasOffers([
    ...Array.from({ length: 10 }, () => ({ slug: 'repetida', produto: 'Repetida', url: 'https://example.com/r' })),
    { slug: 'outra', produto: 'Outra', url: 'https://example.com/o' },
  ]).length,
  2,
  'o limite de 10 conta as ofertas já sem as repetidas'
);

// Últimos vídeos.
// Como o youtube.ts entrega: a hqdefault.jpg como miniatura e a maxresdefault.jpg como reserva.
const video = (
  id: string,
  thumbnails: Pick<SocialHighlight, 'thumbnailUrl' | 'fallbackThumbnailUrl'> = {}
): SocialHighlight => ({
  id,
  title: `Vídeo ${id}`,
  url: `https://www.youtube.com/watch?v=${id}`,
  thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  fallbackThumbnailUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  ...thumbnails,
});
const videosHtml = render(
  createElement(LatestVideos, { videos: ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7'].map((id) => video(id)) })
);
const videosText = textOf(videosHtml);
assert.match(videosHtml, /<h2 id="titulo-ultimos-videos"[^>]*><span class="marca-texto">Últimos vídeos<\/span><\/h2>/);
assert.equal(count(videosHtml, /<li[\s>]/g), 6, 'no máximo 6, uma linha no desktop');
assert.equal(count(videosHtml, /<li class="[^"]*\brevela\b[^"]*" style="--i:\d"/g), 6, 'os vídeos entram na rolagem');
assert.ok(!videosText.includes('Vídeo v7'));
assert.ok(opensNewTab(linkTo(videosHtml, 'https://www.youtube.com/watch?v=v1')));
assert.equal(count(videosHtml, /<img[^>]* alt=""/g), 6, 'uma miniatura decorativa por vídeo');
assert.ok(videosHtml.includes(encodeURIComponent('https://i.ytimg.com/vi/v1/hqdefault.jpg')), 'a miniatura do YouTube');
assert.ok(!videosHtml.includes('maxresdefault'), 'a reserva só entra quando falta a miniatura');
assert.ok(videosText.includes('Vídeo v1'));
assert.ok(videosHtml.includes(`${linkTo(videosHtml, brandLinks.youtube)}Ver canal do YouTube</a>`));

const withoutThumbnailHtml = render(
  createElement(LatestVideos, {
    videos: [
      video('r1', { thumbnailUrl: undefined }),
      video('r2', { thumbnailUrl: undefined, fallbackThumbnailUrl: undefined }),
    ],
  })
);
assert.ok(
  withoutThumbnailHtml.includes(encodeURIComponent('https://i.ytimg.com/vi/r1/maxresdefault.jpg')),
  'sem a miniatura, a reserva'
);
assert.equal(count(withoutThumbnailHtml, /<img/g), 1, 'sem miniatura nenhuma, o card fica com o fundo marinho');
assert.equal(count(withoutThumbnailHtml, /<li[\s>]/g), 2, 'e continua na fila');
assert.equal(render(createElement(LatestVideos, { videos: [] })), '', 'sem vídeo, sem seção');

// Sem o feed, o card do Dicas & Ofertas volta a ser o link; sem a API, os vídeos somem. O build não cobra
// nenhum dos dois: a home tem de montá-los.
const homeSource = readFileSync(resolve(process.cwd(), 'src', 'app', '(pt)', 'page.js'), 'utf8');
// Uma linha só com a tag: dentro de um comentário {/* … */} ela não conta.
assert.match(homeSource, /^\s*<MyLinks offers=\{featuredOffers\} \/>\s*$/m, 'a home não passa as ofertas ao Explore a casa');
assert.ok(!/<Offers\b/.test(homeSource), 'a seção Ofertas do dia saiu da home');
assert.match(homeSource, /^\s*<CTA \/>\s*$/m, 'a home não monta os Últimos vídeos');

console.log('test:home-lower-sections ok');
