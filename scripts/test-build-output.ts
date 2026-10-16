import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import homeEventsConfig from '../content/home-events.json';
import { resolveYesStylePage } from '../src/components/coupons/yesstylePage';
import { COUPON_STORE_COPY } from '../src/components/coupons/couponStoreCopy';
import { getArticleCopy, getTemplateUi } from '../src/components/review/articleCopy';
import { getBodySections } from '../src/components/review/bodySections';
import { getCouponCopyLabels } from '../src/components/review/couponCopyLocale';
import { getGalleryCopy } from '../src/components/review/galleryCopy';
import { getCodeHints, getCodeTitle, getSidebarCopy } from '../src/components/review/sidebarCopy';
import { CECILIA_PHOTO_COPY_PT } from '../src/components/sections/CeciliaProfile';
import { getLocaleHomeCopy } from '../src/components/sections/localeHomeCopy';
import { getShareCopy } from '../src/components/shared/shareCopy';
import { cardDecorAt, couponCardDecorAt } from '../src/components/ui/cardDecor';
import { brandLinks, socialMedias } from '../src/lib/brandLinks';
import { CECILIA_FULL_NAME } from '../src/lib/ceciliaCredentials';
import { generateSectionIds, inferReviewKind, type EditorialNoteData, type Recommendation } from '../src/lib/content';
import { getReviewCanonicalPathname } from '../src/lib/content/review-i18n';
import { getArticleStoreBlock, type ArticleStoreBlock } from '../src/lib/articleStore';
import { getAllActiveCouponSlugs, getCouponBySlug, getCouponHubSections, getOtherActiveCoupons, getStoreCodeKind, type Coupon } from '../src/lib/couponsData';
import {
  getCouponLanguageLinks,
  getCouponStorePath,
  getLocalizedCoupon,
  getTranslatedCouponRoutes,
} from '../src/lib/couponTranslations';
import { publishedReviews, recipes, type Review } from '../src/lib/data';
import { isFaqHeading } from '../src/lib/faq';
import { isInternalLink } from '../src/lib/internalLinks';
import { getEventHubPage, getEventHubPaths, resolveActiveHomeEvent } from '../src/lib/homeEvents';
import { getHomeLatest, getHomeStoreTabs, getStoreArticlePageSlugs, getStoreArticlesPage } from '../src/lib/homeStores';
import { YESSTYLE_LOCALES } from '../src/lib/i18n/clusters/yesstyle';
import { LOCALES, LOCALE_KEYS, type Locale } from '../src/lib/i18n/locales';
import { getShellCopy, getShellHomeHref, getShellNavLinks } from '../src/lib/i18n/shellDictionary';
import {
  LOCALE_HOME_LOCALES,
  getHomeLanguageLinks,
  getLocaleHomeContent,
  getLocaleHomePath,
  getLocaleHomeStores,
} from '../src/lib/localeHome';
import { SITE_NAME, SITE_SOCIAL_IMAGE, getStoreSocialImage, type SocialImage } from '../src/lib/pageSeo';
import { splitInlineMarkdown } from '../src/lib/inlineMarkdown';
import { getInternationalReviewHub } from '../src/lib/review-hubs';
import { pickRelatedReviews } from '../src/lib/relatedReviews';
import { getReviewsHubContent, getStoreShelfContent } from '../src/lib/reviewsHub';
import { GRID_PAGE_SIZE } from '../src/lib/reviewsShelf';
import { getYoutubeEmbedUrl, getYoutubeVideoId } from '../src/lib/video-metadata';
import { videoPages } from '../src/lib/video-pages';
import { VIDEOS_TRAIL, getVideoPageContent, getVideosHubContent, type VideoPageContent } from '../src/lib/videosHub';
import { YOUTUBE_SUBSCRIBE_URL, videoMorphName } from '../src/lib/videosShelf';
import { getPrimaryRewardCode } from '../src/lib/yesstyleCoupons';
import { getConsentCopy } from '../src/components/consent/consentCopy';
import { LABEL_SAME_AS_PORTUGUESE, OTHER_COUPONS, codeAsCouponRegExp, getCategoriesSameAsPortuguese, getPtStoreTexts, isStoreLink } from './locale-home-guards';

// Confere o que só existe depois do `next build`: o CSS final, o sitemap.xml, o llms.txt, o <head>
// das lojas traduzidas e dos artigos de cada família, as páginas da YesStyle, o dock, a sidebar, a
// trilha e a interface dos artigos no idioma de cada um, os textos que citam o CECILIA010, a home,
// a estante de /reviews e das subpáginas de loja e as páginas de data (as subpáginas e as datas,
// ambas com a imagem de compartilhamento), /videos e as páginas de vídeo (uma por entrada de
// video-pages.js), as homes de cada idioma, o JSON-LD e o lastmod do sitemap. O <html lang> fica
// com test-c2-html-lang.
const SITE_URL = 'https://emcasacomcecilia.com';
const APP_DIR = path.resolve('.next/server/app');
const CSS_DIR = path.resolve('.next/static/css');

assert.ok(fs.existsSync(APP_DIR), 'Sem .next/server/app: rode o next build antes deste teste');

const read = (file: string) => fs.readFileSync(file, 'utf8');

// O cabeçalho do bloco que envolve a posição `index` do CSS minificado (por exemplo
// `@media screen and (prefers-reduced-motion:no-preference)`), ou '' no nível de cima.
function enclosingBlockHeader(source: string, index: number) {
  let depth = 0;
  for (let i = index - 1; i >= 0; i--) {
    if (source[i] === '}') depth++;
    else if (source[i] === '{') {
      if (depth === 0) {
        const start = Math.max(source.lastIndexOf('}', i - 1), source.lastIndexOf('{', i - 1), source.lastIndexOf(';', i - 1)) + 1;
        return source.slice(start, i).trim();
      }
      depth--;
    }
  }
  return '';
}

// As declarações da regra do CSS minificado em que está a posição `index` de um seletor: do `{` que fecha
// o seletor ao `}` seguinte. Serve para as regras simples, sem bloco dentro.
function declarationsAt(source: string, index: number) {
  const open = source.indexOf('{', index);
  return source.slice(open + 1, source.indexOf('}', open));
}

// Página (.html) ou rota de texto (.body) gerada para a URL. Sem arquivo, a URL é de fora do site,
// dá 404 ou virou página dinâmica.
function builtFile(url: string) {
  const { origin, pathname } = new URL(url);
  if (origin !== SITE_URL) return undefined;
  const base = pathname === '/' ? '/index' : decodeURIComponent(pathname);
  return ['.html', '.body'].map((ext) => path.join(APP_DIR, `${base}${ext}`)).find((file) => fs.existsSync(file));
}
const withoutPage = (urls: string[]) => urls.filter((url) => !builtFile(url));

const headOf = (html: string) => html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? '';
// O <body> sem scripts e sem os comentários que o React põe entre expressões de texto.
const bodyOf = (html: string) =>
  (html.match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1] ?? '').replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '').replace(/<!--[\s\S]*?-->/g, '');
const jsonLdOf = (html: string) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(([, json]) => JSON.parse(json));

// A Cecília é uma pessoa só no JSON-LD: o Person da /sobre e o das 9 homes de idioma, e a autoria dos
// artigos e das receitas dela, levam este mesmo @id. O valor está escrito aqui de propósito: um id que
// mudasse sem querer na constante do código passaria, se o teste lesse dela.
const CECILIA_PERSON_ID = `${SITE_URL}/sobre#cecilia`;
const personNodesChecked: Record<'sobre' | 'home' | 'artigo' | 'receita', string[]> = { sobre: [], home: [], artigo: [], receita: [] };

// A autoria de cada Article, Review ou Recipe da página: cada autor que é a Cecília (a url é a /sobre ou o nome
// é o dela) leva o @id; outro autor, como o Bruno, fica sem @id. Os autores da Cecília conferidos entram em `checked`.
function assertCeciliaAuthorId(checked: string[], pagePath: string, html: string) {
  const nodes = jsonLdOf(html).filter((schema) => ['Article', 'Review', 'Recipe'].includes(schema['@type']));
  assert.ok(nodes.length > 0, `${pagePath}: sem Article, Review ou Recipe no JSON-LD`);
  for (const node of nodes) {
    assert.ok(node.author, `${pagePath}: JSON-LD sem autor`);
    const authors: Array<Record<string, string>> = [node.author].flat().filter((author) => author !== undefined && author !== null);
    assert.ok(authors.length > 0, `${pagePath}: JSON-LD sem autor`);
    for (const author of authors) {
      const isCecilia = author.url === `${SITE_URL}/sobre` || author.name === 'Cecília Mauad';
      if (isCecilia) {
        assert.equal(
          author['@id'],
          CECILIA_PERSON_ID,
          `${pagePath}: o autor "${author.name}" sem o @id da Cecília (falta "url": "/sobre" no autor do JSON do artigo ou da receita?)`
        );
        checked.push(pagePath);
      } else {
        assert.equal(author['@id'], undefined, `${pagePath}: o autor "${author.name}" não é a Cecília e leva o @id dela`);
      }
    }
  }
}

// O guarda acima confere cada nó de autoria da página, avisa do que falta e passa no JSON-LD certo.
{
  const ceciliaWithId = { '@type': 'Person', name: 'Cecília Mauad', url: `${SITE_URL}/sobre`, '@id': CECILIA_PERSON_ID };
  const ceciliaWithoutId = { '@type': 'Person', name: 'Cecília Mauad', url: `${SITE_URL}/sobre` };
  const bruno = { '@type': 'Person', name: 'Bruno Linhares' };
  const jsonLdPage = (...schemas: object[]) => schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('');
  const checkAuthors = (html: string) => {
    const checked: string[] = [];
    assertCeciliaAuthorId(checked, '/fixture', html);
    return checked;
  };
  assert.deepEqual(checkAuthors(jsonLdPage({ '@type': 'Article', author: ceciliaWithId })), ['/fixture'], 'autor certo falha');
  assert.deepEqual(checkAuthors(jsonLdPage({ '@type': 'Review', author: [ceciliaWithId, bruno] })), ['/fixture'], 'autores certos (Cecília e Bruno) falham');
  assert.throws(() => checkAuthors(jsonLdPage({ '@type': 'WebPage' })), /sem Article, Review ou Recipe/, 'página sem nó de autoria passa');
  for (const author of [undefined, null, [], [null]]) {
    assert.throws(() => checkAuthors(jsonLdPage({ '@type': 'Article', author })), /JSON-LD sem autor/, `nó sem autor (${JSON.stringify(author)}) passa ou quebra sem a mensagem`);
  }
  assert.throws(() => checkAuthors(jsonLdPage({ '@type': 'Article', author: ceciliaWithoutId })), /sem o @id da Cecília/, 'Cecília sem @id passa');
  assert.throws(() => checkAuthors(jsonLdPage({ '@type': 'Article', author: { ...bruno, '@id': CECILIA_PERSON_ID } })), /não é a Cecília e leva o @id/, 'outro autor com o @id da Cecília passa');
  // Um nó a mais não passa sem conferência: o segundo nó da página é conferido como o primeiro.
  assert.throws(
    () => checkAuthors(jsonLdPage({ '@type': 'Article', author: ceciliaWithId }, { '@type': 'Review', author: ceciliaWithoutId })),
    /sem o @id da Cecília/,
    'segundo nó de autoria sem conferência'
  );
  assert.throws(
    () => checkAuthors(jsonLdPage({ '@type': 'Article', author: ceciliaWithId }, { '@type': 'Recipe' })),
    /JSON-LD sem autor/,
    'segundo nó sem autor passa'
  );
  // A Cecília pelo nome, sem a url da /sobre, não ganha o @id no serializador: a mensagem aponta o que falta.
  assert.throws(
    () => checkAuthors(jsonLdPage({ '@type': 'Article', author: { '@type': 'Person', name: 'Cecília Mauad' } })),
    /falta "url": "\/sobre" no autor do JSON do artigo ou da receita\?/,
    'autor pelo nome sem url passa ou sem a pista'
  );
}

// Canonical, hreflang e og:locale de uma página que existe em vários idiomas.
function assertLocalizedHead(pagePath: string, head: string, alternates: string[], openGraphLocale: string) {
  assert.equal(head.match(/<link rel="canonical" href="([^"]+)"/)?.[1], `${SITE_URL}${pagePath}`, `${pagePath}: canonical`);
  assert.deepEqual(
    [...head.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)]
      .map(([, hreflang, href]) => `${hreflang} ${href}`)
      .sort(),
    alternates,
    `${pagePath}: hreflang`
  );
  assert.equal(head.match(/<meta property="og:locale" content="([^"]+)"/)?.[1], openGraphLocale, `${pagePath}: og:locale`);
}

// O guarda acima falha no canonical de outra página, no hreflang que falta (inclusive o x-default) e
// no og:locale de outro idioma, e passa no <head> certo.
{
  const page = '/en/reviews/fixture';
  const alternates = ['en https://emcasacomcecilia.com/en/reviews/fixture', 'pt-BR https://emcasacomcecilia.com/reviews/fixture', 'x-default https://emcasacomcecilia.com/en/reviews/fixture'].sort();
  const linksOf = (list: string[]) => list.map((item) => item.split(' ')).map(([hreflang, href]) => `<link rel="alternate" hrefLang="${hreflang}" href="${href}"/>`).join('');
  const headOfFixture = (canonical: string, list: string[], ogLocale: string) =>
    `<link rel="canonical" href="${canonical}"/>${linksOf(list)}<meta property="og:locale" content="${ogLocale}"/>`;
  assertLocalizedHead(page, headOfFixture(`${SITE_URL}${page}`, alternates, 'en_US'), alternates, 'en_US');
  assert.throws(() => assertLocalizedHead(page, headOfFixture(`${SITE_URL}/reviews/fixture`, alternates, 'en_US'), alternates, 'en_US'), /canonical/, 'canonical de outra página passa');
  assert.throws(() => assertLocalizedHead(page, headOfFixture(`${SITE_URL}${page}`, alternates.slice(0, 2), 'en_US'), alternates, 'en_US'), /hreflang/, 'x-default ausente passa');
  assert.throws(() => assertLocalizedHead(page, headOfFixture(`${SITE_URL}${page}`, alternates, 'pt_BR'), alternates, 'en_US'), /og:locale/, 'og:locale de outro idioma passa');
}

const translatedSlugs = [...new Set(getTranslatedCouponRoutes().map((route) => route.slug))];
const translatedUrls = translatedSlugs.flatMap((slug) =>
  Object.values(getCouponLanguageLinks(slug)).map((pagePath) => `${SITE_URL}${pagePath}`)
);

// Coreano e japonês quebram a linha pelas regras de globals.css, e o número do hero diminui no
// celular em japonês e chinês (CouponBlocks).
const css = fs
  .readdirSync(CSS_DIR)
  .filter((file) => file.endsWith('.css'))
  .map((file) => read(path.join(CSS_DIR, file)))
  .join('\n');
assert.match(css, /html:lang\(ko\)\{[^}]*word-break:keep-all/, 'CSS sem a quebra por palavra do coreano');
assert.match(css, /html:lang\(ja\)\{[^}]*line-break:strict/, 'CSS sem o line-break estrito do japonês');
assert.match(css, /html:lang\(ja\)\{[^}]*word-break:auto-phrase/, 'CSS sem a quebra por frase do japonês');
assert.match(css, /:lang\(ja\)[^{}]*\{font-size:/, 'CSS sem o hero menor em japonês');
assert.match(css, /:lang\(zh\)[^{}]*\{font-size:/, 'CSS sem o hero menor em chinês');

// A gaveta do sumário dos artigos (<dialog>) abre e anima com estas regras do Tailwind 4.
assert.match(css, /\.open\\:flex:[^{]*\{display:flex/, 'CSS sem o open:flex da gaveta do sumário');
assert.match(css, /@starting-style\{\.starting\\:open\\:translate-y-full/, 'CSS sem a entrada da gaveta (@starting-style)');
assert.match(css, /\.backdrop\\:bg-marinho\\\/55::backdrop\{/, 'CSS sem o fundo da gaveta (::backdrop)');
assert.match(css, /\.transition-discrete\{transition-behavior:allow-discrete/, 'CSS sem o transition-discrete da gaveta');

// O movimento da home (D2.1). `@media not (…) and (…)` é inválido: o navegador descarta a regra
// inteira. É o que o Lightning CSS gera de `(width < …) and (…)`, e foi assim que a entrada das
// bolinhas sumiu sem erro nenhum. `@media not all and (…)` e `@media not (…)` sozinho continuam valendo.
assert.doesNotMatch(css, /@media\s*not\s*\([^)]*\)\s*and\s*\(/, 'CSS com @media not (…) and (…), que o navegador descarta');

// A revelação da rolagem só esconde com o movimento liberado: toda regra com [data-reveal] fica
// dentro de um @media com prefers-reduced-motion: no-preference.
const revealRules = [...css.matchAll(/\[data-reveal/g)];
assert.ok(revealRules.length >= 2, 'CSS sem as regras da revelação da rolagem ([data-reveal])');
for (const rule of revealRules) {
  assert.match(
    enclosingBlockHeader(css, rule.index),
    /prefers-reduced-motion:\s*no-preference/,
    'CSS com [data-reveal] fora do @media de prefers-reduced-motion: no-preference'
  );
}

// A entrada das bolinhas no celular e a troca de loja pelo lado (D2.1) também só com o movimento
// liberado: a entrada no @media do celular, o @starting-style da troca dentro do de no-preference.
const bubbleEntranceAt = css.search(/\.bolinha\{[^}]*bolinha-entra/);
assert.ok(bubbleEntranceAt >= 0, 'CSS sem a entrada das bolinhas (bolinha-entra)');
assert.match(
  enclosingBlockHeader(css, bubbleEntranceAt),
  /max-width:\s*47\.99rem\)\s*and\s*\(prefers-reduced-motion:\s*no-preference/,
  'CSS com a entrada das bolinhas fora do @media do celular com movimento liberado'
);
const panelStartAt = css.search(/@starting-style\s*\{\s*\.painel-entra\{/);
assert.ok(panelStartAt >= 0, 'CSS sem o @starting-style da troca de loja (.painel-entra)');
assert.match(
  enclosingBlockHeader(css, panelStartAt),
  /prefers-reduced-motion:\s*no-preference/,
  'CSS com a troca de loja fora do @media de prefers-reduced-motion: no-preference'
);

// Os chips de categoria da estante perdem o degradê da borda a partir de md (md:[mask-image:none]). Uma
// classe do Tailwind colada a um ${…} num template deixa de ser lida e some do CSS sem erro nenhum.
assert.ok(
  css.includes('.md\\:\\[mask-image\\:none\\]{'),
  'CSS sem o md:[mask-image:none] dos chips de categoria: o degradê da borda valeria no computador'
);

// O player da página do vídeo não passa da altura da tela: o vertical vai até min(45svh, 405px) de largura
// (9/16 de min(80svh, 720px) de altura) e o quadrado até 80svh. Valor arbitrário que o Tailwind deixa de ler
// some do CSS sem erro nenhum. Cada classe do VideoPlayer é conferida pela regra inteira (o seletor e a
// propriedade): o mesmo tamanho aparece em duas classes, e só o valor deixaria uma delas sumir sem aviso.
{
  const compactCss = css.replace(/\s+/g, '');
  const escapeSelector = (value: string) => value.replace(/[:[\](),]/g, '\\$&');
  for (const [prefix, property, size] of [
    ['max-w', 'max-width', 'min(45svh,405px)'],
    ['lg:w', 'width', 'min(45svh,405px)'],
    ['max-w', 'max-width', 'min(48rem,80svh)'],
    ['lg:w', 'width', 'min(32rem,80svh)'],
  ]) {
    const rule = `.${escapeSelector(`${prefix}-[${size}]`)}{${property}:${size}}`;
    assert.ok(compactCss.includes(rule), `CSS sem o tamanho do player ${size} (${prefix}, ${property})`);
  }
}

// O movimento da estante de /reviews e das subpáginas (D2.2) também só com o movimento liberado. Cada
// seletor aparece ao menos uma vez no CSS gerado, e toda ocorrência fica dentro de um @media com
// prefers-reduced-motion: no-preference. O Lightning CSS mantém o espaço do seletor descendente e o
// :root:has(…) como no globals.css; a ocorrência não pode ser o começo de outro nome (.estante-entra-x).
const SHELF_MOTION_SELECTORS = [
  '.marca-texto-entra',
  '.estante-entra',
  '.carimbo-assenta',
  '[data-trocando] .estante-item',
  ':root:has([data-trocando])',
];
function occurrencesOf(source: string, selector: string) {
  const found: number[] = [];
  for (let at = source.indexOf(selector); at !== -1; at = source.indexOf(selector, at + 1)) {
    if (!/[\w-]/.test(source[at + selector.length] ?? '')) found.push(at);
  }
  return found;
}
function assertShelfMotionOnlyWhenAllowed(source: string) {
  for (const selector of SHELF_MOTION_SELECTORS) {
    const found = occurrencesOf(source, selector);
    assert.ok(found.length > 0, `CSS sem ${selector} (movimento da estante)`);
    for (const at of found) {
      assert.match(
        enclosingBlockHeader(source, at),
        /prefers-reduced-motion:\s*no-preference/,
        `CSS com ${selector} fora do @media de prefers-reduced-motion: no-preference`
      );
    }
  }
}
assertShelfMotionOnlyWhenAllowed(css);
// Controles, numa cópia do CSS: a regra solta fora do @media, o @media que perde o no-preference e o
// seletor que some derrubam a trava.
{
  const shelfAt = css.indexOf('.estante-entra');
  const header = enclosingBlockHeader(css, shelfAt);
  const headerAt = css.lastIndexOf(header, shelfAt);
  assert.ok(header && headerAt >= 0, 'controle: o .estante-entra está dentro de um @media');
  assert.throws(() => assertShelfMotionOnlyWhenAllowed(`${css}\n.estante-entra{animation:none}`), /\.estante-entra fora do @media/);
  assert.throws(
    () => assertShelfMotionOnlyWhenAllowed(css.slice(0, headerAt) + '@media screen' + css.slice(headerAt + header.length)),
    /fora do @media/
  );
  assert.throws(
    () => assertShelfMotionOnlyWhenAllowed(`${css}\n:root:has([data-trocando])::view-transition{pointer-events:none}`),
    /:root:has\(\[data-trocando\]\) fora do @media/
  );
  assert.throws(() => assertShelfMotionOnlyWhenAllowed(css.replaceAll('.carimbo-assenta', '.carimbo-outro')), /sem \.carimbo-assenta/);
}

// O recorte com código de /cupons e das páginas de loja (D2.2). O verde do copiado vale com ou sem
// movimento: fica no nível de cima do CSS, fora de @media e de @layer, para vencer as classes de borda e
// de fundo do Tailwind. O Lightning CSS tira as aspas do [data-copied='true']. Vale a última regra de cima,
// que é a que vence na cascata.
const COPIED_CUTOUT_RULE = /\.recorte:has\(\[data-copied=true\]\)\{([^}]*)\}/g;
const COPIED_PAPER_RULE = /\.recorte:has\(\[data-copied=true\]\) \.recorte-tesoura-papel\{([^}]*)\}/g;
const lastTopLevelRule = (source: string, rule: RegExp) =>
  [...source.matchAll(rule)].findLast((match) => enclosingBlockHeader(source, match.index) === '');
function assertCopiedCutoutColor(source: string) {
  const color = lastTopLevelRule(source, COPIED_CUTOUT_RULE);
  assert.ok(color, 'CSS sem o verde do recorte copiado (.recorte:has([data-copied=true])) fora de @media e de @layer');
  for (const declaration of ['border-style:solid', 'border-color:var(--color-verde-escuro)', 'background-color:var(--color-verde-claro)']) {
    assert.ok(color[1].split(';').includes(declaration), `CSS: o verde do recorte copiado sem ${declaration}`);
  }
  // No verde, a tesoura do hub ganha o fundo de papel: branco até a linha tracejada (11px) e verde-claro dali para baixo.
  const paper = lastTopLevelRule(source, COPIED_PAPER_RULE);
  assert.ok(paper, 'CSS sem o fundo de papel da tesoura no verde (.recorte:has([data-copied=true]) .recorte-tesoura-papel) fora de @media e de @layer');
  assert.match(
    paper[1],
    /^background:linear-gradient\(var\(--color-white\) ?11px, ?var\(--color-verde-claro\) ?11px\)$/,
    'CSS: o fundo de papel da tesoura sem o corte seco em 11px (branco e verde-claro)'
  );
}
assertCopiedCutoutColor(css);
// As cores vêm do @theme inline, que só põe no CSS a variável que alguma regra usa.
for (const variable of ['--color-verde-escuro', '--color-verde-claro', '--color-marinho', '--color-white']) {
  assert.match(css, new RegExp(`${variable}:#`), `CSS sem ${variable}: o recorte (o verde, o papel ou a sombra) ficaria sem cor`);
}

// O movimento das classes novas de /cupons só com o movimento liberado. A trava olha a declaração, não o
// seletor: o .recorte também está na regra do verde, que vale sempre. Toda regra que cita o seletor e mexe
// em movimento fica no @media. Para provar que o movimento existe, só conta a regra em que o seletor é o
// sujeito: fora de um :has(…) e sem combinador depois dele. A regra do container,
// .recorte:has(.recorte-tesoura), não é movimento da tesoura, e a da tesoura que corre não é do .recorte.
const COUPON_MOTION_SELECTORS = ['.recorte', '.recorte-tesoura', '.etiqueta-entra', '.recorte-entra'];
const MOTION_PROPERTY = /^(?:animation|transition)(?:-[a-z-]+)?$|^(?:translate|scale|rotate|box-shadow|container|container-type)$/;
function isSubjectAt(source: string, at: number, selector: string) {
  const end = at + source.slice(at).search(/[,{]/);
  return /^(?:::?[\w-]+(?:\([^()]*\))?|\[[^\]]*\])*$/.test(source.slice(at + selector.length, end));
}
function assertCouponMotionOnlyWhenAllowed(source: string) {
  for (const selector of COUPON_MOTION_SELECTORS) {
    let motionRules = 0;
    for (const at of occurrencesOf(source, selector)) {
      const properties = declarationsAt(source, at)
        .split(';')
        .map((declaration) => declaration.split(':')[0].trim())
        .filter((property) => MOTION_PROPERTY.test(property));
      if (properties.length === 0) continue;
      if (isSubjectAt(source, at, selector)) motionRules++;
      assert.match(
        enclosingBlockHeader(source, at),
        /prefers-reduced-motion:\s*no-preference/,
        `CSS com ${properties.join(', ')} de ${selector} fora do @media de prefers-reduced-motion: no-preference`
      );
    }
    assert.ok(motionRules > 0, `CSS sem o movimento de ${selector}`);
  }
}
assertCouponMotionOnlyWhenAllowed(css);
// Controles, numa cópia do CSS. Derrubam as travas: o verde que entra num @media, perde uma declaração ou
// é vencido por outra regra de cima depois dele; o papel que some ou perde o corte em 11px; a regra de
// movimento solta fora do @media; o @media que perde o no-preference; o movimento que só sobra em regra em
// que o seletor não é o sujeito; e o seletor que some. A regra só de cor, fora do @media, passa.
{
  const color = lastTopLevelRule(css, COPIED_CUTOUT_RULE);
  assert.ok(color, 'controle: o verde do recorte não foi achado');
  const withColorRule = (rule: string) => css.slice(0, color.index) + rule + css.slice(color.index + color[0].length);
  assert.throws(() => assertCopiedCutoutColor(withColorRule(`@media print{${color[0]}}`)), /sem o verde do recorte copiado/);
  assert.throws(
    () => assertCopiedCutoutColor(withColorRule(color[0].replace('border-style:solid', 'border-style:dashed'))),
    /sem border-style:solid/
  );
  assert.throws(() => assertCopiedCutoutColor(`${css}\n.recorte:has([data-copied=true]){border-style:dashed}`), /sem border-style:solid/);
  const paperMutations: [string, RegExp][] = [
    [css.replace('.recorte-tesoura-papel{', '.recorte-tesoura-x{'), /sem o fundo de papel/],
    [css.replace('var(--color-white)11px', 'var(--color-white)12px'), /corte seco em 11px/],
  ];
  for (const [mutated, message] of paperMutations) {
    assert.notEqual(mutated, css, `controle: a mutação não achou o trecho (${message})`);
    assert.throws(() => assertCopiedCutoutColor(mutated), message);
  }

  assert.throws(() => assertCouponMotionOnlyWhenAllowed(`${css}\n.recorte-tesoura{transition:none}`), /transition de \.recorte-tesoura fora do @media/);
  assert.throws(() => assertCouponMotionOnlyWhenAllowed(`${css}\n.recorte{container-type:inline-size}`), /container-type de \.recorte fora do @media/);
  assert.doesNotThrow(() => assertCouponMotionOnlyWhenAllowed(`${css}\n.recorte{border-style:solid}`));
  const scissorsAt = occurrencesOf(css, '.recorte-tesoura')[0];
  const header = enclosingBlockHeader(css, scissorsAt);
  const headerAt = css.lastIndexOf(header, scissorsAt);
  assert.ok(header && headerAt >= 0, 'controle: a .recorte-tesoura está dentro de um @media');
  assert.throws(
    () => assertCouponMotionOnlyWhenAllowed(css.slice(0, headerAt) + '@media screen' + css.slice(headerAt + header.length)),
    /fora do @media/
  );
  const subjectMutations: [string, string, RegExp][] = [
    // Sobra só a regra do container, .recorte:has(.recorte-tesoura), que cita a tesoura sem ser dela.
    ['.recorte-tesoura', css.replaceAll('.recorte-tesoura{', '.recorte-x{'), /sem o movimento de \.recorte-tesoura/],
    // Sobra só a regra da tesoura que corre, .recorte:has([data-copied=true]) .recorte-tesoura.
    [
      '.recorte',
      css
        .replaceAll('.recorte{', '.recorte-x{')
        .replaceAll('.recorte:has(.recorte-tesoura){', '.recorte-x:has(.recorte-tesoura){')
        .replaceAll('.recorte:has([data-copied=true]){', '.recorte-x:has([data-copied=true]){'),
      /sem o movimento de \.recorte$/,
    ],
  ];
  for (const [selector, mutated, message] of subjectMutations) {
    assert.ok(occurrencesOf(mutated, selector).length > 0, `controle: ${selector} sumiu do CSS; a mutação devia deixar só regras em que ele não é o sujeito`);
    assert.throws(() => assertCouponMotionOnlyWhenAllowed(mutated), message);
  }
  assert.throws(() => assertCouponMotionOnlyWhenAllowed(css.replaceAll('.recorte-tesoura', '.recorte-x')), /sem o movimento de \.recorte-tesoura/);
}

// A chegada não parte de opacity: 0. O número do topo pode ser o LCP, e o recorte tem botões, que não podem
// ficar invisíveis e clicáveis. O carimbo-assenta de /reviews, com opacity, segue só lá.
function keyframesOf(source: string, name: string) {
  const at = source.indexOf(`@keyframes ${name}{`);
  assert.ok(at >= 0, `CSS sem o @keyframes ${name}`);
  let depth = 0;
  for (let i = source.indexOf('{', at); i < source.length; i++) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}' && --depth === 0) return source.slice(at, i + 1);
  }
  assert.fail(`CSS: o @keyframes ${name} sem o fim`);
}
function assertArrivalKeyframes(source: string) {
  for (const name of ['etiqueta-carimba', 'recorte-assenta']) {
    const keyframes = keyframesOf(source, name);
    assert.ok(!keyframes.includes('opacity'), `CSS: o @keyframes ${name} mexe na opacidade`);
    assert.match(keyframes, /scale:/, `CSS: o @keyframes ${name} sem scale`);
    assert.match(keyframes, /rotate:/, `CSS: o @keyframes ${name} sem rotate`);
  }
  assert.match(
    keyframesOf(source, 'etiqueta-carimba'),
    /rotate:var\(--etiqueta-rotacao,/,
    'CSS: o @keyframes etiqueta-carimba sem o giro pela --etiqueta-rotacao (o hub gira menos)'
  );
}
assertArrivalKeyframes(css);
// Controles: a opacidade em qualquer dos dois @keyframes, o @keyframes renomeado e o que perde o scale ou o
// rotate derrubam a trava.
const keyframesMutations: [string, RegExp][] = [
  [css.replace('@keyframes recorte-assenta{', '@keyframes recorte-assenta{0%{opacity:0}'), /recorte-assenta mexe na opacidade/],
  [css.replace('@keyframes etiqueta-carimba{', '@keyframes etiqueta-carimba{0%{opacity:0}'), /etiqueta-carimba mexe na opacidade/],
  [css.replace('@keyframes etiqueta-carimba{', '@keyframes etiqueta-x{'), /sem o @keyframes etiqueta-carimba/],
  [css.replace(/(@keyframes etiqueta-carimba\{[^}]*?)scale:/, '$1zoom:'), /etiqueta-carimba sem scale/],
  [css.replace(/(@keyframes recorte-assenta\{[^}]*?)rotate:/, '$1skew:'), /recorte-assenta sem rotate/],
  [
    css.replace(/(@keyframes etiqueta-carimba\{[^}]*?)rotate:var\(--etiqueta-rotacao,-6deg\)/, '$1rotate:-6deg'),
    /giro pela --etiqueta-rotacao/,
  ],
];
for (const [mutated, message] of keyframesMutations) {
  assert.notEqual(mutated, css, `controle: a mutação não achou o trecho (${message})`);
  assert.throws(() => assertArrivalKeyframes(mutated), message);
}

const sitemapBody = read(path.join(APP_DIR, 'sitemap.xml.body'));
const sitemapUrls = [...sitemapBody.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
assert.ok(sitemapUrls.length > 0, 'sitemap.xml sem URLs');
assert.deepEqual(
  sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index),
  [],
  'sitemap.xml com URL repetida'
);
assert.deepEqual(withoutPage(sitemapUrls), [], 'sitemap.xml com URL sem página no build');
assert.deepEqual(
  translatedUrls.filter((url) => !sitemapUrls.includes(url)),
  [],
  'sitemap.xml sem uma das lojas traduzidas'
);

const llmsUrls = [...read(path.join(APP_DIR, 'llms.txt.body')).matchAll(/https:\/\/emcasacomcecilia\.com\S*/g)].map(
  ([url]) => url
);
assert.deepEqual(withoutPage(llmsUrls), [], 'llms.txt com URL sem página no build');
assert.deepEqual(
  translatedUrls.filter((url) => !llmsUrls.includes(url)),
  [],
  'llms.txt sem uma das lojas traduzidas'
);

for (const slug of translatedSlugs) {
  const links = getCouponLanguageLinks(slug);
  const expectedAlternates = [
    ...LOCALE_KEYS.map((locale) => `${LOCALES[locale].hreflang} ${SITE_URL}${links[locale]}`),
    `x-default ${SITE_URL}${links.en}`,
  ].sort();
  const offerUrls = Object.fromEntries(
    LOCALE_KEYS.map((locale) => [
      locale,
      locale === 'pt' ? getCouponBySlug(slug)?.offerUrl : getLocalizedCoupon(slug, locale)?.offerUrl,
    ])
  );

  for (const locale of LOCALE_KEYS) {
    const pagePath = links[locale];
    const file = builtFile(`${SITE_URL}${pagePath}`);
    assert.ok(file, `${pagePath}: página não gerada no build`);
    const html = read(file);
    assertLocalizedHead(pagePath, headOf(html), expectedAlternates, LOCALES[locale].openGraphLocale);
    const webPage = jsonLdOf(html).find((schema) => schema['@type'] === 'WebPage');
    assert.equal(webPage?.inLanguage, LOCALES[locale].htmlLang, `${pagePath}: inLanguage do JSON-LD`);

    // Cada idioma leva o seu link principal, e o de outro idioma não aparece na página.
    const hrefs = new Set([...html.matchAll(/href="([^"]+)"/g)].map(([, href]) => href.replace(/&amp;/g, '&')));
    assert.ok(hrefs.has(offerUrls[locale]), `${pagePath}: sem o link principal do idioma`);
    for (const offerUrl of new Set(Object.values(offerUrls))) {
      if (offerUrl !== offerUrls[locale]) assert.ok(!hrefs.has(offerUrl), `${pagePath}: link principal de outro idioma`);
    }
  }
}

// Texto como aparece na tela: sem as tags e com as entidades que o React escreve desfeitas.
const decodeHtml = (html: string) =>
  html.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const textOf = (html: string) => decodeHtml(html.replace(/<[^>]+>/g, '')).trim();
// O texto como o React o escreve no HTML, para as mutações acharem o trecho mesmo com & ou apóstrofo.
const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/'/g, '&#x27;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const metaOf = (head: string, key: string) =>
  decodeHtml(head.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)"`))?.[1] ?? '');

// A primeira trilha (<nav><ol>) do trecho, nível a nível; o último, sem link, é a própria página.
// Sai no mesmo formato que a BreadcrumbList do JSON-LD em schemaTrailOf.
const visibleTrailOf = (html: string, pagePath: string) => {
  const trail = html.match(/<nav\b[^>]*><ol\b[\s\S]*?<\/ol><\/nav>/)?.[0] ?? '';
  return [...trail.matchAll(/<li\b([^>]*)>([\s\S]*?)<\/li>/g)]
    .filter(([, attributes]) => !attributes.includes('aria-hidden'))
    .map(([, , item]) => ({
      name: textOf(item),
      url: new URL(item.match(/href="([^"]+)"/)?.[1] ?? pagePath, SITE_URL).href,
    }));
};
const schemaTrailOf = (breadcrumbList: { itemListElement: Array<{ name: string; item: string }> } | undefined) =>
  breadcrumbList?.itemListElement.map(({ name, item }) => ({ name, url: new URL(item).href }));
// O nome que o leitor de tela dá a essa mesma trilha.
const trailLabelOf = (html: string) =>
  decodeHtml(html.match(/<nav\b([^>]*)><ol\b/)?.[1].match(/aria-label="([^"]*)"/)?.[1] ?? '');
// A <section> com este id, até o primeiro </section>; undefined se ela não estiver na página.
const sectionIn = (html: string, id: string) => {
  const tag = [...html.matchAll(/<section\b([^>]*)>/g)].find(([, attributes]) => attributes.includes(` id="${id}"`));
  return tag && html.slice(tag.index, html.indexOf('</section>', tag.index));
};

// A resposta do FAQ em trechos de texto, link e negrito: o que o acordeão mostra e o acceptedAnswer leva
// em HTML. Lê o HTML da página e o do schema; os comentários e as outras tags (o <p>, os <span> do destaque
// do cupom) somem. Com `pageUrl`, o href da página sai resolvido como o navegador o resolve; o do schema
// fica como está, e um caminho relativo no schema não bate com o da página.
type FaqAnswerPart = { type: 'text' | 'strong'; text: string } | { type: 'link'; text: string; href: string };
const faqAnswerPartsOf = (html: string, pageUrl?: string) => {
  const parts: FaqAnswerPart[] = [];
  let open: FaqAnswerPart | undefined;
  for (const [, closing, tag, attributes, text] of html.matchAll(/<!--[\s\S]*?-->|<(\/?)([a-z]+)\b([^>]*)>|([^<]+)/g)) {
    if (text !== undefined) {
      const last = parts.at(-1);
      if (open) open.text += decodeHtml(text);
      else if (last?.type === 'text') last.text += decodeHtml(text);
      else parts.push({ type: 'text', text: decodeHtml(text) });
    } else if (tag === 'a' || tag === 'strong') {
      open = undefined;
      if (closing) continue;
      if (tag === 'a') {
        const href = decodeHtml(attributes.match(/\shref="([^"]*)"/)?.[1] ?? '');
        open = { type: 'link', text: '', href: pageUrl ? new URL(href, pageUrl).href : href };
      } else {
        open = { type: 'strong', text: '' };
      }
      parts.push(open);
    }
  }
  return parts;
};

// A conferência acima vê o texto, o href e o negrito: a resposta do schema com <a> bate com a da página,
// e o markdown cru (mesmo com o endereço absoluto), o href relativo e o link reduzido a texto não batem.
{
  const visible = faqAnswerPartsOf(
    '<div class="faq-answer"><p class="x">Use o<!-- --> <a href="/reviews/neo" class="y"><span>Adaptador </span><span class="coupon-highlight">NEO</span></a> e o <strong class="z">CECI</strong> &amp; pronto.</p></div>',
    `${SITE_URL}/reviews/fixture`
  );
  const schemaAnswer = (link: string, bold = '<strong>CECI</strong>') => `Use o ${link} e o ${bold} &amp; pronto.`;
  assert.deepEqual(faqAnswerPartsOf(schemaAnswer(`<a href="${SITE_URL}/reviews/neo">Adaptador NEO</a>`)), visible, 'resposta certa falha');
  for (const [answer, message] of [
    [schemaAnswer(`[Adaptador NEO](${SITE_URL}/reviews/neo)`), 'link em markdown cru passa'],
    [schemaAnswer('<a href="/reviews/neo">Adaptador NEO</a>'), 'href relativo no schema passa'],
    [schemaAnswer('Adaptador NEO'), 'link reduzido a texto passa'],
    [schemaAnswer(`<a href="${SITE_URL}/reviews/neo">Adaptador NEO</a>`, '**CECI**'), 'negrito em markdown cru passa'],
  ]) {
    assert.notDeepEqual(faqAnswerPartsOf(answer), visible, message);
  }
}

// Os rótulos da nota editorial ("Nota editorial: …", "Editorial note: …") num trecho de HTML. A nota é
// sempre um botão; a nota da margem, no desktop, é um <aside> com o rótulo nu.
const EDITORIAL_NOTE_TITLES = new Set(LOCALE_KEYS.map((key) => getArticleCopy(key).editorialNoteTitle));
const editorialNoteLabelsIn = (html: string) =>
  [...html.matchAll(/<button\b[^>]*\baria-label="([^"]*)"/g)]
    .map(([, label]) => decodeHtml(label))
    .filter((label) => label.includes(': ') && EDITORIAL_NOTE_TITLES.has(label.split(': ')[0]));
assert.deepEqual(
  editorialNoteLabelsIn(
    '<button type="button" class="x" aria-label="Editorial note: Cecília&#x27;s tip"></button>' +
      '<aside aria-label="Nota editorial: Dica"></aside><button aria-label="Nota editorial"></button><nav aria-label="Sei qui">'
  ),
  ["Editorial note: Cecília's tip"],
  'editorialNoteLabelsIn não acha o rótulo da nota'
);
assert.equal(trailLabelOf('<nav class="x" aria-label="Sei qui"><ol></ol></nav>'), 'Sei qui', 'trailLabelOf não acha o nome da trilha');

// O cartão do X não mostra AVIF: a imagem de compartilhamento de loja, de subpágina e de data é JPG,
// PNG, WebP ou GIF. As capas dos artigos ficam de fora desta regra.
const SHARE_IMAGE_FORMAT = /\.(?:jpe?g|png|webp|gif)$/i;

// A imagem de compartilhamento: og:image e alt exatamente os esperados, num formato que o X mostra, o
// cartão do X com a mesma imagem e o nome do site.
function assertShareImage(pagePath: string, head: string, expected: SocialImage) {
  const image = metaOf(head, 'og:image');
  assert.equal(image, expected.url, `${pagePath}: og:image diferente da esperada`);
  assert.match(new URL(image, SITE_URL).pathname, SHARE_IMAGE_FORMAT, `${pagePath}: og:image num formato que o X não mostra`);
  assert.equal(metaOf(head, 'og:image:alt'), expected.alt, `${pagePath}: og:image:alt`);
  assert.equal(metaOf(head, 'twitter:image'), image, `${pagePath}: twitter:image diferente do og:image`);
  assert.equal(metaOf(head, 'og:site_name'), SITE_NAME, `${pagePath}: og:site_name`);
  return image;
}

// O guarda falha na imagem AVIF mesmo quando ela é a esperada, e passa em JPG, PNG e WebP, também com
// query string. Os outros defeitos estão no teste do assertListPageSeo, que passa por ele.
{
  const headWith = (url: string) =>
    `<meta property="og:site_name" content="${SITE_NAME}"/><meta property="og:image" content="${url}"/>` +
    `<meta property="og:image:alt" content="Logo"/><meta name="twitter:image" content="${url}"/>`;
  for (const url of [
    'https://cdn.emcasacomcecilia.com/v1/image/logo.jpg',
    `${SITE_URL}/images/logos/loja.png`,
    'https://cdn.emcasacomcecilia.com/v1/image/capa.webp?v=2',
  ]) {
    assertShareImage('/fixture', headWith(url), { url, alt: 'Logo' });
  }
  const avif = 'https://cdn.emcasacomcecilia.com/v1/image/logo.avif';
  assert.throws(
    () => assertShareImage('/fixture', headWith(avif), { url: avif, alt: 'Logo' }),
    /: og:image num formato que o X não mostra/,
    'og:image em AVIF passa'
  );
}

// Página de cada loja ativa, em português e nos outros idiomas: a imagem de compartilhamento é a da loja
// (getStoreSocialImage), e o WebPage do JSON-LD aponta para a mesma. A YesStyle tem página própria,
// conferida mais abaixo.
const couponStorePages = [
  ...getAllActiveCouponSlugs()
    .filter((slug) => slug !== 'yesstyle')
    .map((slug) => ({ pagePath: getCouponStorePath(slug, 'pt'), store: getCouponBySlug(slug) })),
  ...getTranslatedCouponRoutes().map(({ locale, slug }) => ({
    pagePath: getCouponStorePath(slug, locale),
    store: getLocalizedCoupon(slug, locale),
  })),
];
for (const { pagePath, store } of couponStorePages) {
  assert.ok(store, `${pagePath}: sem a loja em couponsData`);
  const file = builtFile(`${SITE_URL}${pagePath}`);
  assert.ok(file, `${pagePath}: página não gerada no build`);
  const html = read(file);
  const image = assertShareImage(pagePath, headOf(html), getStoreSocialImage(store));
  const webPage = jsonLdOf(html).find((schema) => schema['@type'] === 'WebPage');
  assert.equal(webPage?.primaryImageOfPage, image, `${pagePath}: primaryImageOfPage diferente do og:image`);
}

// O CECILIA010 é código de recompensa, não cupom: vai no campo Reward Code e soma com os cupons da
// loja. Nenhum texto do site pode chamá-lo de cupom ("cupom CECILIA010", "CECILIA010 coupon") nem
// falar em usá-lo com outros cupons, o que faria dele um cupom também. A terceira regra para no fim
// da frase: "Com outro cupom, não" logo depois do código fala do cupom da loja.
const rewardCode = getPrimaryRewardCode().code;
const COUPON_WORDS = 'cupom|cupons|cupón|cupones|coupons?|gutscheine?|쿠폰|クーポン|優惠碼|优惠码';
const REWARD_CODE_AS_COUPON = new RegExp(
  [
    `(?:${COUPON_WORDS})(?: de \\S+)?[:：]? ?${rewardCode}`,
    `${rewardCode}[ -]?(?:${COUPON_WORDS})`,
    `${rewardCode}[^.。?？!！;；]{0,60}(?:${OTHER_COUPONS})`,
  ].join('|'),
  'iu'
);

const yesStyleHubs = LOCALE_KEYS.map((locale) => YESSTYLE_LOCALES[locale]);
const yesStyleAlternates = [
  ...yesStyleHubs.map(({ hreflang, hubPath }) => `${hreflang} ${SITE_URL}${hubPath}`),
  `x-default ${SITE_URL}${YESSTYLE_LOCALES.en.hubPath}`,
].sort();
// O logo da YesStyle, com o nome da marca de alt nos 10 idiomas; com a loja pausada, o logo do site.
const yesStyleStore = getCouponBySlug('yesstyle');
const yesStyleImage = yesStyleStore ? { url: getStoreSocialImage(yesStyleStore).url, alt: 'YesStyle' } : SITE_SOCIAL_IMAGE;

for (const { locale, hubPath, htmlLang, openGraphLocale } of yesStyleHubs) {
  const file = builtFile(`${SITE_URL}${hubPath}`);
  assert.ok(file, `${hubPath}: página não gerada no build`);
  const html = read(file);
  const head = headOf(html);
  const main = html.match(/<main\b[\s\S]*<\/main>/)?.[0] ?? '';
  const rawTitle = head.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';

  assertLocalizedHead(hubPath, head, yesStyleAlternates, openGraphLocale);
  assertShareImage(hubPath, head, yesStyleImage);
  assert.equal(main.match(/^<main lang="([^"]+)"/)?.[1], htmlLang, `${hubPath}: lang do <main>`);

  // O H1 é montado em partes (texto, número e sufixo); juntas, elas repetem o <title>.
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(([, h1]) => textOf(h1));
  assert.equal(h1s.length, 1, `${hubPath}: ${h1s.length} H1`);
  assert.equal(h1s[0].replace(/\s/g, ''), decodeHtml(rawTitle).replace(/\s/g, ''), `${hubPath}: H1 diferente do <title>`);

  // O JSON-LD da página fica no <main>; o layout acrescenta Organization e WebSite fora dele. Sem
  // Offer: o das outras lojas leva couponCode, e o CECILIA010 não é cupom.
  const schemas = jsonLdOf(main);
  assert.deepEqual(
    schemas.map((schema) => schema['@type']).sort(),
    ['BreadcrumbList', 'FAQPage', 'WebPage'],
    `${hubPath}: tipos do JSON-LD`
  );
  const schemaOf = (type: string) => schemas.find((schema) => schema['@type'] === type);
  assert.equal(schemaOf('WebPage').inLanguage, htmlLang, `${hubPath}: inLanguage do JSON-LD`);

  // A trilha e as perguntas do JSON-LD são as que aparecem na página, na mesma ordem. Em português
  // a trilha passa por /cupons; os outros idiomas não têm página de cupons e vão da home à loja.
  const visibleCrumbs = visibleTrailOf(main, hubPath);
  assert.equal(visibleCrumbs.length, locale === 'pt' ? 3 : 2, `${hubPath}: ${visibleCrumbs.length} níveis na trilha`);
  assert.deepEqual(
    schemaTrailOf(schemaOf('BreadcrumbList')),
    visibleCrumbs,
    `${hubPath}: trilha do JSON-LD diferente da trilha na página`
  );
  const visibleFaq = [...main.matchAll(/<details\b[^>]*><summary\b[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)].map(
    ([, question, answer]) => ({ question: textOf(question), answer: textOf(answer) })
  );
  assert.ok(visibleFaq.length > 0, `${hubPath}: sem perguntas frequentes`);
  assert.deepEqual(
    schemaOf('FAQPage').mainEntity.map(({ name, acceptedAnswer }) => ({ question: name, answer: acceptedAnswer.text })),
    visibleFaq,
    `${hubPath}: FAQPage diferente das perguntas na página`
  );
}

const VOID_TAGS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const PT_DOCK_TEXT = ['Sumário', 'Abrir o sumário', 'Fechar o sumário', 'Seções do artigo', 'Progresso de leitura', 'Leia também'];

// Elementos ainda abertos neste ponto do <body>; 0 quer dizer filho direto do <body>.
function openElementsAt(body: string, index: number) {
  let open = 0;
  for (const [, closing, name, selfClosing] of body.slice(0, index).matchAll(/<(\/?)([a-zA-Z][\w-]*)[^>]*?(\/?)>/g)) {
    if (closing) open--;
    else if (!selfClosing && !VOID_TAGS.has(name.toLowerCase())) open++;
  }
  return open;
}

// O elemento que abre em `start` (o `<` da tag), com o conteúdo, até a tag de mesmo nome que o fecha. O
// React fecha todo elemento que não é vazio (não há <span/>), então contar as tags de mesmo nome basta.
function elementAt(html: string, start: number) {
  const name = html.slice(start).match(/^<([a-zA-Z][\w-]*)/)?.[1];
  assert.ok(name, `elementAt: nenhuma tag na posição ${start}`);
  if (VOID_TAGS.has(name.toLowerCase())) return html.slice(start, html.indexOf('>', start) + 1);
  let depth = 0;
  for (const match of html.slice(start).matchAll(new RegExp(`<(/?)${name}\\b[^>]*>`, 'g'))) {
    depth += match[1] ? -1 : 1;
    if (depth === 0) return html.slice(start, start + match.index + match[0].length);
  }
  assert.fail(`elementAt: <${name}> sem a tag que o fecha`);
}
// As classes da tag de abertura do elemento.
const classesOf = (element: string) => element.match(/^<[^>]*?\sclass="([^"]*)"/)?.[1].split(/\s+/) ?? [];
// Os elementos com a classe `token` inteira (recorte não pega recorte-tesoura), na ordem do HTML.
function elementsWithClass(html: string, token: string) {
  return [...html.matchAll(/<[a-zA-Z][\w-]*\s[^>]*>/g)]
    .filter(([tag]) => classesOf(tag).includes(token))
    .map((match) => elementAt(html, match.index));
}

// Textos da sidebar do desktop em todos os idiomas, menos os do idioma da página. O código de
// indicação da SHEIN tem rótulo e dicas próprios.
const SIDEBAR_TEXT_KEYS = ['sectionsNav', 'tocTitle', 'copyHint', 'copiedHint', 'relatedTitle'] as const;
function sidebarTexts(locale: Locale) {
  const copy = getSidebarCopy(locale);
  const referralHints = getCodeHints(copy, 'referral', 'SHEIN');
  return [
    ...SIDEBAR_TEXT_KEYS.map((key) => copy[key]),
    getCodeTitle(copy, 'referral', 'SHEIN'),
    referralHints.copy,
    referralHints.copied,
  ];
}
function foreignSidebarText(locale: Locale) {
  const own = new Set(sidebarTexts(locale));
  return new Set(LOCALE_KEYS.flatMap(sidebarTexts).filter((text) => !own.has(text)));
}

const reviewByPathname = new Map(publishedReviews.map((review) => [getReviewCanonicalPathname(review), review]));

// Cada família de tradução: o caminho de cada idioma, para o <head> dos artigos.
const familyPaths = new Map<string, Partial<Record<Locale, string>>>();
for (const review of publishedReviews) {
  if (!review.translationKey) continue;
  const paths = familyPaths.get(review.translationKey) ?? {};
  paths[review.locale ?? 'pt'] = getReviewCanonicalPathname(review);
  familyPaths.set(review.translationKey, paths);
}

// Textos fixos da interface do artigo num idioma: selo do tipo, veredito, ficha do produto, bloco de
// vídeo, galeria e barra de compartilhar. Os que dependem de número ou código ficam de fora, menos o
// "Compartilhar no …" de cada rede.
const fixedTexts = (copy: object): string[] =>
  Object.values(copy).flatMap((value) => (typeof value === 'string' ? [value] : value && typeof value === 'object' ? fixedTexts(value) : []));
const articleUiTexts = (locale: Locale) => [
  ...fixedTexts(getArticleCopy(locale)),
  ...fixedTexts(getGalleryCopy(locale)),
  ...fixedTexts(getShareCopy(locale)),
  ...['WhatsApp', 'Facebook', 'Telegram', 'X'].map((network) => getShareCopy(locale).shareOn(network)),
];

// Veredito da sidebar: título, recomendação e a nota que o leitor de tela anuncia.
const verdictTexts = (locale: Locale, stars: number) => {
  const copy = getArticleCopy(locale);
  return [copy.verdictTitle, copy.ratingLabel(stars.toFixed(1)), ...Object.values(copy.recommendation)];
};
// O que falta do veredito no idioma do artigo e o que sobrou de outro idioma.
function verdictProblems(locale: Locale, shown: string[], hasVerdict: boolean, stars: number, recommendation?: Recommendation) {
  const copy = getArticleCopy(locale);
  const own = verdictTexts(locale, stars);
  const expected = hasVerdict ? [copy.verdictTitle, copy.ratingLabel(stars.toFixed(1)), ...(recommendation ? [copy.recommendation[recommendation]] : [])] : [];
  const foreign = new Set(LOCALE_KEYS.flatMap((other) => verdictTexts(other, stars)).filter((text) => !own.includes(text)));
  return [
    ...expected.filter((text) => !shown.includes(text)).map((text) => `falta "${text}"`),
    ...shown.filter((text) => foreign.has(text)).map((text) => `"${text}" é de outro idioma`),
  ];
}
// O guarda acima falha no veredito em português numa página em inglês, em outro idioma e sem o veredito, e
// passa no certo.
{
  const shownIn = (locale: Locale) => verdictTexts(locale, 4.5).slice(0, 2).concat(getArticleCopy(locale).recommendation.recomendo);
  assert.deepEqual(verdictProblems('en', shownIn('en'), true, 4.5, 'recomendo'), []);
  assert.deepEqual(verdictProblems('zh-hant', [], false, 4.5), []);
  assert.notDeepEqual(verdictProblems('en', shownIn('pt'), true, 4.5, 'recomendo'), []);
  assert.notDeepEqual(verdictProblems('de', shownIn('en'), true, 4.5, 'recomendo'), []);
  assert.notDeepEqual(verdictProblems('ja', [], true, 4.5, 'recomendo'), []);
  assert.notDeepEqual(verdictProblems('es', [...shownIn('es'), getArticleCopy('pt').verdictTitle], true, 4.5, 'recomendo'), []);
}

// Os cards de artigos relacionados mostram o título, a data e o `type` de outra review: é conteúdo dela (o
// `type` é rótulo livre e vários JSONs de fora do PT trazem "Editorial"), não texto da interface. A lista
// dos cartões (data-relacionados-cartoes) sai da conferência; o título e o "Ver todos" ficam.
const withoutRelatedCards = (body: string) => {
  const at = body.search(/<ul\b[^>]*\sdata-relacionados-cartoes/);
  return at < 0 ? body : body.replace(elementAt(body, at), '');
};
{
  const list = (type: string) => `<ul data-relacionados-cartoes=""><li><a href="/fr/reviews/x"><h3>Titre</h3><span>${type}</span></a></li></ul>`;
  assert.equal(withoutRelatedCards(`<h2>Guide</h2>${list('Editorial')}<a href="/fr/reviews">Voir</a>`), '<h2>Guide</h2><a href="/fr/reviews">Voir</a>', 'card relacionado fica na conferência');
  assert.equal(withoutRelatedCards('<ul><li>Editorial</li></ul>'), '<ul><li>Editorial</li></ul>', 'lista comum some da conferência');
}

// O recorte do topo do artigo (#cupom-artigo): o tipo do código (cupom, recompensa ou indicação) no idioma do
// artigo, o código com o botão de copiar e a frase de depois de copiar; sem código, o nome da loja e o link.
// Fora do PT, nenhum texto dele em português e nenhum link da SHEIN Brasil.
function cutoutProblems(cutout: string, locale: Locale, block: ArticleStoreBlock): string[] {
  const texts = cutout.split(/<[^>]+>/).map((text) => decodeHtml(text).trim()).filter(Boolean);
  const uiOf = (lang: Locale) => [
    block.code ? getCodeTitle(getSidebarCopy(lang), block.codeKind, block.brand) : block.brand,
    ...(block.code ? [getCouponCopyLabels(lang).copy, getArticleCopy(lang).copiedHint(block, block.codeKind)] : []),
  ];
  const own = uiOf(locale);
  const problems = own.filter((text) => !texts.includes(text)).map((text) => `falta "${text}"`);
  if (block.code && !texts.includes(block.code)) problems.push(`falta o código ${block.code}`);
  if (block.code && !cutout.includes('data-copied=')) problems.push('sem o botão de copiar');
  if (locale !== 'pt') {
    const storeLinks = (lang: Locale) => [COUPON_STORE_COPY[lang].goToStore, COUPON_STORE_COPY[lang].viewOffer];
    const ownTexts = [...own, ...storeLinks(locale)];
    const portuguese = [...uiOf('pt'), ...storeLinks('pt')].filter((text) => !ownTexts.includes(text));
    problems.push(...texts.filter((text) => portuguese.includes(text)).map((text) => `"${text}" em português`));
    if (/br\.shein\.com/.test(cutout)) problems.push('link da SHEIN Brasil');
  }
  return problems;
}
// O guarda acima passa no recorte certo e falha no recorte em português numa página em inglês e sem o código.
{
  const block: ArticleStoreBlock = { brand: 'YesStyle', slug: 'yesstyle', code: 'CECILIA010', codeKind: 'reward', rules: [], storeSponsored: true };
  const html = (lang: Locale) =>
    `<section id="cupom-artigo"><p>${getCodeTitle(getSidebarCopy(lang), 'reward', 'YesStyle')}</p><code>CECILIA010</code>` +
    `<button data-copied="false">${getCouponCopyLabels(lang).copy}</button><p>${getArticleCopy(lang).copiedHint(block, 'reward')}</p></section>`;
  assert.deepEqual(cutoutProblems(html('en'), 'en', block), []);
  assert.deepEqual(cutoutProblems(html('pt'), 'pt', block), []);
  assert.notDeepEqual(cutoutProblems(html('pt'), 'en', block), [], 'recorte em português passou numa página em inglês');
  assert.notDeepEqual(cutoutProblems(html('en').replace('<code>CECILIA010</code>', ''), 'en', block), [], 'recorte sem código passou');
  assert.notDeepEqual(cutoutProblems(`${html('en')}<a href="https://br.shein.com/">x</a>`, 'en', block), [], 'SHEIN Brasil passou');
}

// O link da loja dos recortes (topo, fim e lateral) vai à loja, nunca à página de cupons do site, e todo link externo
// dele leva a marcação de patrocínio. Devolve também quantos links conferiu.
function cutoutStoreLinkProblems(body: string): { problems: string[]; links: number } {
  const problems: string[] = [];
  let links = 0;
  for (const match of body.matchAll(/<section\b[^>]*\sdata-recorte="(top|end|sidebar)"/g)) {
    for (const [tag] of elementAt(body, match.index).matchAll(/<a\s[^>]*>/g)) {
      const href = decodeHtml(tag.match(/\shref="([^"]*)"/)?.[1] ?? '');
      links++;
      if (isInternalLink(href)) problems.push(`${match[1]}: link da loja interno (${href})`);
      else if (!/\srel="[^"]*\bsponsored\b/.test(tag)) problems.push(`${match[1]}: link da loja sem sponsored (${href})`);
    }
  }
  return { problems, links };
}
{
  const cutout = (variant: string, link: string) => `<section data-recorte="${variant}"><p>x</p>${link}</section>`;
  assert.deepEqual(cutoutStoreLinkProblems(cutout('top', '<a href="https://www.yesstyle.com/x" rel="sponsored noopener noreferrer">Go</a>')), { problems: [], links: 1 });
  assert.equal(cutoutStoreLinkProblems(cutout('end', '<a href="/en/coupons/yesstyle">Go</a>')).problems.length, 1, 'link interno passou');
  assert.equal(cutoutStoreLinkProblems(cutout('end', '<a href="https://emcasacomcecilia.com/cupons/damie">Go</a>')).problems.length, 1, 'link do próprio domínio passou');
  assert.equal(cutoutStoreLinkProblems(cutout('sidebar', '<a href="https://www.damie.com.br/" rel="noopener noreferrer">Go</a>')).problems.length, 1, 'link sem sponsored passou');
}

// O botão laranja da gaveta do celular (review_mobile_drawer) com bloco da loja: um só, para a loja, patrocinado.
function drawerStoreLinkProblems(dialog: string): string[] {
  const links = [...dialog.matchAll(/<a\s[^>]*>/g)].map(([tag]) => tag).filter((tag) => classesOf(tag).includes('bg-laranja'));
  if (links.length !== 1) return [`${links.length} links da loja na gaveta em vez de um`];
  const [tag] = links;
  const href = decodeHtml(tag.match(/\shref="([^"]*)"/)?.[1] ?? '');
  if (isInternalLink(href)) return [`link da loja da gaveta interno (${href})`];
  return /\srel="[^"]*\bsponsored\b/.test(tag) ? [] : [`link da loja da gaveta sem sponsored (${href})`];
}
{
  const drawer = (link: string) => `<dialog><nav><a href="#a">A</a></nav>${link}<ul><li><a href="/reviews/b" class="x">B</a></li></ul></dialog>`;
  assert.deepEqual(drawerStoreLinkProblems(drawer('<a href="https://damie.com.br" rel="sponsored noopener noreferrer" class="mx-4 bg-laranja">Ir</a>')), []);
  assert.equal(drawerStoreLinkProblems(drawer('<a href="/cupons/damie" class="mx-4 bg-laranja">Ver cupom</a>')).length, 1, 'link interno da gaveta passou');
  assert.equal(drawerStoreLinkProblems(drawer('<a href="https://damie.com.br" rel="noopener noreferrer" class="mx-4 bg-laranja">Ir</a>')).length, 1, 'link da gaveta sem sponsored passou');
  assert.equal(drawerStoreLinkProblems(drawer('')).length, 1, 'gaveta sem o link da loja passou');
}

// O topo do artigo (data-article="topo": trilha, título, dados, idiomas, histórico, recorte e foto) e o corpo
// (data-article="corpo": ficha, seções, linha do tempo, FAQ e veredito em texto) no visual da D2: nenhuma cor antiga,
// nem em classe nem em estilo. O fundo do artigo é branco, sem o caderno nem os pontos.
const OLD_ARTICLE_COLORS = /#(?:1a4d2e|ff6b35|0f1d3a|faf8f3)\b/gi;
function articleBodyProblems(body: string): string[] {
  const problems: string[] = [];
  for (const part of ['topo', 'corpo'] as const) {
    const regions = [...body.matchAll(new RegExp(`<[a-zA-Z][\\w-]*\\s[^>]*\\bdata-article="${part}"[^>]*>`, 'g'))].map((match) => elementAt(body, match.index));
    if (regions.length !== 1) {
      problems.push(`${regions.length} regiões data-article="${part}" em vez de uma`);
      continue;
    }
    const [region] = regions;
    problems.push(...[...new Set(region.match(OLD_ARTICLE_COLORS) ?? [])].map((hex) => `cor antiga ${hex} no ${part}`));
    if (part === 'corpo' && !/<section\b/.test(region)) problems.push('corpo sem nenhuma seção');
    // O código destacado no texto é o marca-codigo, já pintado no HTML; o coupon-highlight das receitas sai em 0%.
    if (part === 'corpo' && /\sclass="[^"]*(?<![\w-])coupon-highlight(?![\w-])/.test(region)) problems.push('destaque das receitas (coupon-highlight) no corpo');
    if (part === 'topo' && !/<h1\b/.test(region)) problems.push('topo sem o título');
    // Movimento só com o movimento liberado (motion-safe:). Animação sem essa guarda fica de fora, como a
    // pulse-respiro, que pulsava em laranja sem parar.
    for (const [, animation] of region.matchAll(/class="[^"]*?(?<![\w:-])(animate-[\w-]+)/g)) problems.push(`animação sem guarda no ${part} (${animation})`);
  }
  for (const background of body.match(/\b(?:review-page-bg|notebook-[\w-]+)\b/g) ?? []) problems.push(`fundo de caderno (${background})`);
  return [...new Set(problems)];
}
// O guarda acima passa no artigo certo e falha sem o topo ou o corpo, com uma cor antiga ou uma animação sem guarda
// num deles e com o fundo de caderno; cor antiga fora dos dois (o menu, o rodapé) não conta.
{
  const ok =
    '<header style="background:#0f1d3a"></header><main><header data-article="topo" class="text-marinho"><h1>T</h1><div class="border-marinho">EN</div></header>' +
    '<div data-article="corpo" class="text-marinho"><section id="a"><h2>A</h2></section></div><div class="text-[#1a4d2e]"></div></main>';
  assert.deepEqual(articleBodyProblems(ok), []);
  assert.notDeepEqual(articleBodyProblems(ok.replace(' data-article="corpo"', '')), [], 'artigo sem o corpo passou');
  assert.notDeepEqual(articleBodyProblems(ok.replace('text-marinho', 'text-[#1A4D2E]')), [], 'cor antiga no corpo passou');
  assert.notDeepEqual(articleBodyProblems(ok.replace('<h2>', '<h2 style="background-color:#ff6b35">')), [], 'cor antiga em estilo passou');
  assert.notDeepEqual(articleBodyProblems(`<article class="review-page-bg">${ok}</article>`), [], 'fundo de caderno passou');
  assert.notDeepEqual(articleBodyProblems(ok.replace(/<section[\s\S]*<\/section>/, '')), [], 'corpo vazio passou');
  assert.notDeepEqual(articleBodyProblems(ok.replace('<h2>', '<h2 class="font-bold animate-pulse-respiro">')), [], 'animação sem guarda passou');
  assert.deepEqual(articleBodyProblems(ok.replace('<h2>', '<h2 class="motion-safe:animate-spin">')), [], 'animação com motion-safe barrada');
  assert.notDeepEqual(articleBodyProblems(ok.replace(' data-article="topo"', '')), [], 'artigo sem o topo passou');
  assert.notDeepEqual(articleBodyProblems(ok.replace('border-marinho">EN', 'border-[#1a4d2e]/10">EN')), [], 'cor antiga no topo passou');
  assert.notDeepEqual(articleBodyProblems(ok.replace('<h1>', '<h1 class="animate-bounce">')), [], 'animação sem guarda no topo passou');
  assert.notDeepEqual(articleBodyProblems(ok.replace('<h1>T</h1>', '')), [], 'topo sem título passou');
  assert.notDeepEqual(articleBodyProblems(ok.replace('<h2>A</h2>', '<h2>A</h2><p><span class="coupon-highlight ">X1</span></p>')), [], 'destaque das receitas no corpo passou');
  assert.deepEqual(articleBodyProblems(ok.replace('<h2>A</h2>', '<h2>A</h2><p><span class="marca-codigo">X1</span></p>')), [], 'marca-codigo barrado');
}

// O código da loja do artigo citado no texto do corpo copia ao toque: um <span data-copy-code> com o botão de
// copiar no corpo, só para o código da loja (storeBlock.code), com o rótulo de cópia do idioma do artigo. O
// CECILIA010 é código de recompensa: o rótulo nunca o chama de cupom. Fora do corpo não há botão desses.
const inlineCopyButtonsOf = (html: string) =>
  [...html.matchAll(/<span\b[^>]*\sdata-copy-code="([^"]*)"/g)].map((match) => {
    const button = elementAt(html, match.index).match(/<button\b[^>]*\sdata-copied="[^"]*"[^>]*>/)?.[0];
    return { code: decodeHtml(match[1]), hasButton: Boolean(button), label: decodeHtml(button?.match(/\saria-label="([^"]*)"/)?.[1] ?? '') };
  });
function inlineCopyProblems(body: string, locale: Locale, block: ArticleStoreBlock | null, citesCode: boolean): string[] {
  const start = body.search(/<[a-zA-Z][\w-]*\s[^>]*\bdata-article="corpo"/);
  const region = start < 0 ? '' : elementAt(body, start);
  const buttons = inlineCopyButtonsOf(region);
  const code = block?.code;
  const problems: string[] = [];
  if (inlineCopyButtonsOf(body).length !== buttons.length) problems.push('botão de copiar do texto fora do corpo');
  if (code && citesCode && buttons.length === 0) problems.push(`o corpo cita ${code} sem o botão de copiar`);
  for (const button of buttons) {
    if (!code || button.code.toUpperCase() !== code.toUpperCase()) {
      problems.push(`botão de copiar de ${button.code}, que não é o código da loja (${code ?? 'nenhum'})`);
      continue;
    }
    if (!button.hasButton) problems.push(`${code} sem o botão de copiar no data-copy-code`);
    const expected = getCouponCopyLabels(locale).copyCoupon(code);
    if (button.label !== expected) problems.push(`rótulo "${button.label}" em vez de "${expected}"`);
    if (block?.codeKind === 'reward' && /cupo|coupon/i.test(button.label)) problems.push(`"${button.label}" chama o código de recompensa de cupom`);
  }
  return problems;
}
// O texto das seções do corpo (os parágrafos, que sempre passam pelo destaque) cita o código fora de um link.
function bodyCitesCode(review: Review, code: string): boolean {
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}])${code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}\\p{N}])`, 'u');
  const headings = new Set(getBodySections(review.contentSections ?? [], inferReviewKind(review)).map(({ heading }) => heading));
  return (review.contentSections ?? []).some(
    (section) =>
      section.heading &&
      headings.has(section.heading) &&
      (section.paragraphs ?? []).some((paragraph) => splitInlineMarkdown(paragraph).some((segment) => segment.type !== 'link' && pattern.test(segment.text)))
  );
}
// O guarda passa no botão certo e falha sem o botão, com o código de outra loja, fora do corpo, com o rótulo em
// português numa página em inglês e com o CECILIA010 chamado de cupom.
{
  const block: ArticleStoreBlock = { brand: 'YesStyle', slug: 'yesstyle', code: 'CECILIA010', codeKind: 'reward', rules: [], storeSponsored: true };
  const button = (code: string, label: string) => `<span data-copy-code="${code}"><button type="button" aria-label="${label}" data-copied="false">${code}</button></span>`;
  const page = (inner: string, outside = '') => `<main><div data-article="corpo"><p>Use ${inner} no carrinho.</p></div>${outside}</main>`;
  const en = getCouponCopyLabels('en').copyCoupon('CECILIA010');
  assert.deepEqual(inlineCopyProblems(page(button('CECILIA010', en)), 'en', block, true), []);
  assert.deepEqual(inlineCopyProblems(page('CECILIA010'), 'en', { ...block, code: undefined }, true), []);
  assert.notDeepEqual(inlineCopyProblems(page('CECILIA010'), 'en', block, true), [], 'código citado sem botão passou');
  assert.notDeepEqual(inlineCopyProblems(page(button('CECI', getCouponCopyLabels('en').copyCoupon('CECI'))), 'en', block, false), [], 'botão de outro código passou');
  assert.notDeepEqual(inlineCopyProblems(page('x', button('CECILIA010', en)), 'en', block, false), [], 'botão fora do corpo passou');
  assert.notDeepEqual(inlineCopyProblems(page(button('CECILIA010', getCouponCopyLabels('pt').copyCoupon('CECILIA010'))), 'en', block, true), [], 'rótulo em português passou');
  assert.notDeepEqual(inlineCopyProblems(page(button('CECILIA010', 'Copy the coupon CECILIA010')), 'en', block, true), [], 'CECILIA010 chamado de cupom passou');
  assert.notDeepEqual(inlineCopyProblems(page('<span data-copy-code="CECILIA010">CECILIA010</span>'), 'en', block, true), [], 'data-copy-code sem botão passou');
}

// O fim do artigo, nesta ordem: galeria, veredito (só produto), bloco da loja (#loja, no lugar do bloco verde
// "Interessou?"), caixa da Cecília, relacionados e compartilhar.
// - A galeria não repete o vídeo do topo e, com um item só, não vira carrossel; sem item, não existe. O título diz
//   o que ela mostra: "Fotos e vídeos" só com os dois.
// - Prós e contras são duas listas, cada uma só com os itens dela, sem linha vazia de enchimento.
// - O bloco da loja traz o título, o recorte (os mesmos textos do recorte do topo), as regras e os links de
//   "Ver todas as regras" e "Todos os N artigos" só quando a página existe.
// - Sem loja e com o link de afiliado do artigo (cta), o #loja é só o botão desse link, exatamente o do cta, com
//   rel="sponsored" quando o link é patrocinado, sem código; sem loja e sem cta, nada.
// - A caixa da Cecília leva à /sobre em português e à home do idioma nos outros.
// - A caixa do Bruno (só nos artigos em que ele assina) vem logo depois da da Cecília; em português leva só o link do
//   Sonar de Ofertas, e nos outros idiomas não tem link nenhum.
// - Os relacionados são os de pickRelatedReviews, na ordem, e o "Ver todos" leva à subpágina da loja ou à lista
//   de guias do idioma.
type ArticleEndExpectation = {
  locale: Locale;
  storeBlock: ArticleStoreBlock | null;
  affiliateCta: { url: string; label: string; text?: string; sponsored: boolean } | null;
  galleryItems: number;
  galleryVideos: number;
  topVideoId: string | null;
  verdict: boolean;
  pros: number;
  cons: number;
  authorHref: string;
  // null: artigo sem o Bruno, sem a caixa dele.
  brunoBox: { link: string | null } | null;
  related: string[];
  relatedAllHref: string;
};
const tagsWith = (html: string, attribute: string) =>
  [...html.matchAll(/<[a-zA-Z][\w-]*\s[^>]*>/g)].filter(([tag]) => tag.includes(` ${attribute}`)).map((match) => ({ at: match.index, html: elementAt(html, match.index) }));
const shownTextsOf = (html: string) => html.split(/<[^>]+>/).map((text) => decodeHtml(text).trim()).filter(Boolean);
const hrefsOf = (html: string) => [...html.matchAll(/<a\b[^>]*\shref="([^"]*)"/g)].map(([, href]) => decodeHtml(href));
function articleEndProblems(body: string, expected: ArticleEndExpectation): string[] {
  const problems: string[] = [];
  const copy = getArticleCopy(expected.locale);
  const ui = getTemplateUi(expected.locale);
  const single = (attribute: string, name: string) => {
    const found = tagsWith(body, attribute);
    if (found.length > 1) problems.push(`${found.length} ${name}`);
    return found[0];
  };
  const present = (found: unknown, wanted: boolean, name: string) => {
    if (wanted && !found) problems.push(`sem ${name}`);
    if (!wanted && found) problems.push(`${name} que não devia existir`);
  };

  const gallery = single('data-article="galeria"', 'galerias');
  present(gallery, expected.galleryItems > 0, 'a galeria');
  if (gallery) {
    const cards = gallery.html.match(/\sdata-gallery-card/g)?.length ?? 0;
    if (expected.galleryItems === 1 && cards > 0) problems.push('galeria de um item em carrossel');
    if (expected.galleryItems > 1 && cards === 0) problems.push('galeria sem os cartões do carrossel');
    if (expected.topVideoId && gallery.html.includes(expected.topVideoId)) problems.push('galeria repete o vídeo do topo');
    const galleryCopy = getGalleryCopy(expected.locale);
    const photos = expected.galleryItems - expected.galleryVideos;
    const heading = photos && expected.galleryVideos ? galleryCopy.heading : photos ? galleryCopy.tabPhotos : galleryCopy.tabVideos;
    const h2 = gallery.html.match(/<h2\b[^>]*>[\s\S]*?<\/h2>/)?.[0] ?? '';
    const shown = shownTextsOf(h2).join(' ');
    if (shown !== heading) problems.push(`galeria com o título "${shown}" em vez de "${heading}"`);
  }

  const verdict = single('id="veredito"', 'vereditos');
  present(verdict, expected.verdict, 'o veredito');
  const prosCons = single('id="pros-e-contras"', 'blocos de prós e contras');
  present(prosCons, expected.pros + expected.cons > 0, 'os prós e contras');
  if (prosCons) {
    for (const [list, count] of [['pros', expected.pros], ['contras', expected.cons]] as const) {
      const ul = tagsWith(prosCons.html, `data-lista="${list}"`)[0];
      const items = ul?.html.match(/<li\b/g)?.length ?? 0;
      if (items !== count) problems.push(`${items} itens em ${list} em vez de ${count}`);
    }
    if (shownTextsOf(prosCons.html).includes('—')) problems.push('linha vazia nos prós e contras');
  }

  const store = single('id="loja"', 'blocos da loja');
  present(store, Boolean(expected.storeBlock || expected.affiliateCta), 'o bloco da loja');
  if (store && expected.storeBlock) {
    const block = expected.storeBlock;
    const texts = shownTextsOf(store.html);
    const hrefs = hrefsOf(store.html);
    if (!texts.includes(copy.storeBlockTitle(block))) problems.push(`bloco da loja sem "${copy.storeBlockTitle(block)}"`);
    const cutout = tagsWith(store.html, 'aria-label=').find(({ html }) => html.startsWith('<section'));
    if (!cutout) problems.push('bloco da loja sem o recorte');
    else problems.push(...cutoutProblems(cutout.html, expected.locale, block).map((problem) => `recorte do fim: ${problem}`));
    if (block.storeHref && !hrefs.includes(block.storeHref)) problems.push('bloco da loja sem o link da loja');
    for (const rule of block.rules) {
      if (!texts.includes(rule.label) || !texts.includes(rule.value)) problems.push(`bloco da loja sem a regra "${rule.label}"`);
    }
    if (block.couponPageHref ? !hrefs.includes(block.couponPageHref) || !texts.includes(copy.allRules) : texts.includes(copy.allRules)) {
      problems.push('"Ver todas as regras" fora da regra');
    }
    const allArticles = block.articleCount ? copy.allStoreArticles(block.articleCount, block) : undefined;
    const storeArticleLinks = hrefs.filter((href) => href.startsWith('/reviews/loja/'));
    if (block.articlesHref ? !hrefs.includes(block.articlesHref) || !allArticles || !texts.includes(allArticles) : storeArticleLinks.length > 0) {
      problems.push('"Todos os N artigos" fora da regra');
    }
  } else if (store && expected.affiliateCta) {
    const { url, label, text, sponsored } = expected.affiliateCta;
    const links = [...store.html.matchAll(/<a\b[^>]*>/g)].map(([tag]) => tag);
    if (links.length !== 1) problems.push(`${links.length} links no bloco do link de afiliado`);
    const href = decodeHtml(links[0]?.match(/\shref="([^"]*)"/)?.[1] ?? '');
    const rel = links[0]?.match(/\srel="([^"]*)"/)?.[1].split(' ') ?? [];
    if (href !== url) problems.push(`bloco do link de afiliado leva a ${href} em vez de ${url}`);
    if (rel.includes('sponsored') !== sponsored) problems.push(`bloco do link de afiliado ${sponsored ? 'sem' : 'com'} rel="sponsored"`);
    const texts = shownTextsOf(store.html);
    if (!texts.includes(label)) problems.push(`bloco do link de afiliado sem "${label}"`);
    if (text && !texts.includes(text)) problems.push('bloco do link de afiliado sem o texto do cta');
    if (/<code\b|\sdata-copied=/.test(store.html)) problems.push('bloco do link de afiliado com código');
  }

  const author = single('data-article="autora"', 'caixas da Cecília');
  present(author, true, 'a caixa da Cecília');
  if (author) {
    const texts = shownTextsOf(author.html);
    for (const text of [copy.authorBoxTitle, copy.authorBoxBody, copy.authorBoxLink]) if (!texts.includes(text)) problems.push(`caixa da Cecília sem "${text}"`);
    if (!hrefsOf(author.html).includes(expected.authorHref)) problems.push(`caixa da Cecília sem o link ${expected.authorHref}`);
  }

  const bruno = single('data-article="autor-bruno"', 'caixas do Bruno');
  present(bruno, Boolean(expected.brunoBox), 'a caixa do Bruno');
  if (bruno && expected.brunoBox) {
    const texts = shownTextsOf(bruno.html);
    for (const text of [copy.brunoBoxTitle, copy.brunoBoxBody]) if (!texts.includes(text)) problems.push(`caixa do Bruno sem "${text}"`);
    const links = [...bruno.html.matchAll(/<a\b[^>]*>/g)].map(([tag]) => tag);
    if (expected.brunoBox.link === null) {
      if (links.length > 0) problems.push(`caixa do Bruno com ${links.length} link(s) fora do português`);
    } else {
      if (links.length !== 1) problems.push(`${links.length} links na caixa do Bruno em vez de 1`);
      const href = decodeHtml(links[0]?.match(/\shref="([^"]*)"/)?.[1] ?? '');
      if (href !== 'https://sonardeofertas.com.br') problems.push(`caixa do Bruno leva a ${href} em vez do Sonar de Ofertas`);
      if (!texts.includes(expected.brunoBox.link)) problems.push(`caixa do Bruno sem o link "${expected.brunoBox.link}"`);
      if (/\ssponsored|rel="[^"]*sponsored/.test(links[0] ?? '')) problems.push('link do Sonar de Ofertas com rel="sponsored"');
    }
  }

  const related = single('data-article="relacionados"', 'blocos de relacionados');
  present(related, expected.related.length > 0, 'os relacionados');
  if (related) {
    const list = tagsWith(related.html, 'data-relacionados-cartoes')[0];
    const cards = list ? hrefsOf(list.html) : [];
    if (JSON.stringify(cards) !== JSON.stringify(expected.related)) problems.push(`relacionados ${JSON.stringify(cards)} em vez de ${JSON.stringify(expected.related)}`);
    if (list && elementsWithClass(list.html, 'revela').length !== cards.length) problems.push('relacionados sem a cascata');
    const rest = related.html.replace(list?.html ?? '', '');
    if (!hrefsOf(rest).includes(expected.relatedAllHref) || !shownTextsOf(rest).includes(ui.viewAll)) {
      problems.push(`relacionados sem o "${ui.viewAll}" para ${expected.relatedAllHref}`);
    }
  }

  const share = body.indexOf(`aria-label="${escapeHtml(getShareCopy(expected.locale).shareByEmail)}"`);
  if (share < 0) problems.push('sem a barra de compartilhar');
  const order = [gallery, verdict, store, author, bruno, related].flatMap((found) => (found ? [found.at] : [])).concat(share < 0 ? [] : [share]);
  if (order.some((at, index) => index > 0 && at < order[index - 1])) problems.push('fim do artigo fora da ordem galeria, veredito, loja, Cecília, Bruno, relacionados, compartilhar');
  return problems;
}
// O guarda acima passa no fim certo e falha sem o bloco da loja, com relacionados fora da ordem, com o vídeo do
// topo na galeria, com a caixa da Cecília levando à /sobre fora do PT, com linha vazia nos prós e contras e com
// as peças fora da ordem.
{
  const block: ArticleStoreBlock = {
    brand: 'Damie', slug: 'damie', code: 'CECILIA12', rules: [{ label: 'Vale para', value: 'Tudo' }],
    storeHref: 'https://damie.example/', storeSponsored: true, couponPageHref: '/cupons/damie', articlesHref: '/reviews/loja/damie', articleCount: 9,
  };
  const pt = getArticleCopy('pt');
  const cutout =
    `<section aria-label="${getCodeTitle(getSidebarCopy('pt'), undefined, 'Damie')}" class="recorte"><p>${getCodeTitle(getSidebarCopy('pt'), undefined, 'Damie')}</p><code>CECILIA12</code>` +
    `<button data-copied="false">${getCouponCopyLabels('pt').copy}</button><a href="https://damie.example/">Ir</a><p>${pt.copiedHint(block)}</p></section>`;
  const end =
    `<section data-article="galeria"><h2><span class="marca-texto">${getGalleryCopy('pt').tabPhotos}</span></h2><button data-gallery-card="">1</button><button data-gallery-card="">2</button></section>` +
    '<section id="veredito"><div id="pros-e-contras"><ul data-lista="pros"><li>a</li><li>b</li></ul><ul data-lista="contras"><li>c</li></ul></div></section>' +
    `<section id="loja"><h2>${pt.storeBlockTitle(block)}</h2>${cutout}<dl><dt>Vale para</dt><dd>Tudo</dd></dl>` +
    `<a href="/cupons/damie">${pt.allRules}</a><a href="/reviews/loja/damie">${pt.allStoreArticles(9, block)}</a></section>` +
    `<section data-article="autora"><p>${pt.authorBoxTitle}</p><p>${pt.authorBoxBody}</p><a href="/sobre">${pt.authorBoxLink}</a></section>` +
    `<section data-article="autor-bruno"><p>${pt.brunoBoxTitle}</p><p>${pt.brunoBoxBody}</p><a href="https://sonardeofertas.com.br" target="_blank" rel="noopener">${pt.brunoBoxLink}</a></section>` +
    '<section data-article="relacionados"><ul data-relacionados-cartoes=""><li class="revela"><a href="/reviews/a">A</a></li><li class="revela"><a href="/reviews/b">B</a></li></ul>' +
    `<a href="/reviews/loja/damie">${getTemplateUi('pt').viewAll}</a></section>` +
    `<div><a aria-label="${escapeHtml(getShareCopy('pt').shareByEmail)}" href="mailto:">e</a></div>`;
  const expected: ArticleEndExpectation = {
    locale: 'pt', storeBlock: block, affiliateCta: null, galleryItems: 2, galleryVideos: 0, topVideoId: 'abcdefghijk', verdict: true, pros: 2, cons: 1,
    authorHref: '/sobre', brunoBox: { link: pt.brunoBoxLink }, related: ['/reviews/a', '/reviews/b'], relatedAllHref: '/reviews/loja/damie',
  };
  assert.deepEqual(articleEndProblems(end, expected), []);
  assert.notDeepEqual(articleEndProblems(end.replace(tagsWith(end, 'id="loja"')[0].html, ''), expected), [], 'fim sem o bloco da loja passou');
  assert.notDeepEqual(articleEndProblems(end, { ...expected, storeBlock: null }), [], 'bloco da loja em artigo sem loja passou');
  assert.notDeepEqual(articleEndProblems(end, { ...expected, related: ['/reviews/b', '/reviews/a'] }), [], 'relacionados fora da ordem passaram');
  assert.notDeepEqual(articleEndProblems(end.replace('<button data-gallery-card="">2</button>', '<a href="https://youtu.be/abcdefghijk">v</a>'), { ...expected, galleryItems: 1 }), [], 'vídeo do topo na galeria passou');
  assert.notDeepEqual(articleEndProblems(end, { ...expected, galleryItems: 1 }), [], 'galeria de um item em carrossel passou');
  assert.notDeepEqual(articleEndProblems(end, { ...expected, authorHref: '/en' }), [], 'caixa da Cecília com o link errado passou');
  const brunoSection = tagsWith(end, 'data-article="autor-bruno"')[0].html;
  assert.notDeepEqual(articleEndProblems(end.replace(brunoSection, ''), expected), [], 'fim sem a caixa do Bruno esperada passou');
  assert.notDeepEqual(articleEndProblems(end, { ...expected, brunoBox: null }), [], 'caixa do Bruno em artigo sem ele passou');
  assert.notDeepEqual(articleEndProblems(end, { ...expected, brunoBox: { link: null } }), [], 'link na caixa do Bruno fora do PT passou');
  assert.notDeepEqual(articleEndProblems(end.replace('https://sonardeofertas.com.br', 'https://example.com'), expected), [], 'caixa do Bruno com o link errado passou');
  assert.notDeepEqual(articleEndProblems(end.replace(brunoSection, '').replace(/(<section data-article="autora">)/, `${brunoSection}$1`), expected), [], 'caixa do Bruno antes da Cecília passou');
  assert.notDeepEqual(articleEndProblems(end.replace(brunoSection, '').replace(/(<div><a aria-label)/, `${brunoSection}$1`), expected), [], 'caixa do Bruno depois dos relacionados passou');
  assert.notDeepEqual(articleEndProblems(end.replace('<li>c</li>', '<li>c</li><li>—</li>'), expected), [], 'linha vazia nos prós e contras passou');
  assert.notDeepEqual(articleEndProblems(end.replace(pt.allRules, 'x'), expected), [], 'bloco da loja sem "Ver todas as regras" passou');
  assert.notDeepEqual(articleEndProblems(end, { ...expected, storeBlock: { ...block, articlesHref: undefined, articleCount: undefined } }), [], '"Todos os N artigos" sem a subpágina passou');
  assert.notDeepEqual(articleEndProblems(end.replace(/ class="revela"/g, ''), expected), [], 'relacionados sem a cascata passaram');
  const verdictFirst = end.replace(/(<section data-article="galeria">[\s\S]*?<\/section>)(<section id="veredito">[\s\S]*?<\/section>)/, '$2$1');
  assert.notDeepEqual(articleEndProblems(verdictFirst, expected), [], 'veredito antes da galeria passou');
  const mixedHeading = end.replace(getGalleryCopy('pt').tabPhotos, getGalleryCopy('pt').heading);
  assert.notDeepEqual(articleEndProblems(mixedHeading, expected), [], '"Fotos e vídeos" em galeria sem vídeo passou');
  assert.deepEqual(articleEndProblems(mixedHeading, { ...expected, galleryItems: 3, galleryVideos: 1 }), []);
  assert.notDeepEqual(articleEndProblems(end, { ...expected, galleryItems: 3, galleryVideos: 1 }), [], 'galeria mista só com "Fotos" passou');

  // Sem loja, com o cta: o botão do link de afiliado do artigo, no lugar do bloco da loja.
  const cta = { url: 'https://link.amazon/B07YTVmpB', label: 'Ver na Amazon', text: 'Confira a lava e seca', sponsored: true };
  const ctaBlock =
    `<section id="loja" aria-label="${cta.label}"><p>${cta.text}</p>` +
    `<a href="${cta.url}" target="_blank" rel="sponsored noopener noreferrer">${cta.label}<svg aria-hidden="true"></svg></a></section>`;
  const ctaEnd = end.replace(tagsWith(end, 'id="loja"')[0].html, ctaBlock);
  const ctaExpected = { ...expected, storeBlock: null, affiliateCta: cta };
  assert.deepEqual(articleEndProblems(ctaEnd, ctaExpected), []);
  assert.notDeepEqual(articleEndProblems(ctaEnd.replace(ctaBlock, ''), ctaExpected), [], 'artigo com cta sem o bloco do link passou');
  assert.notDeepEqual(articleEndProblems(ctaEnd, { ...ctaExpected, affiliateCta: null }), [], 'bloco do link em artigo sem cta passou');
  assert.notDeepEqual(articleEndProblems(ctaEnd.replace(cta.url, 'https://www.amazon.com.br/'), ctaExpected), [], 'link comum da loja no lugar do cta passou');
  assert.notDeepEqual(articleEndProblems(ctaEnd.replace('rel="sponsored noopener noreferrer"', 'rel="noopener noreferrer"'), ctaExpected), [], 'link patrocinado sem rel="sponsored" passou');
  assert.notDeepEqual(articleEndProblems(ctaEnd, { ...ctaExpected, affiliateCta: { ...cta, sponsored: false } }), [], 'link sem patrocínio com rel="sponsored" passou');
  assert.notDeepEqual(articleEndProblems(ctaEnd.replace(`<p>${cta.text}</p>`, '<code>CECILIA12</code>'), ctaExpected), [], 'bloco do link com código e sem o texto passou');
}
// O fundo editorial dos artigos é branco e sem a camada de manchas (::before); o das receitas segue como está.
assert.match(css, /\.editorial-ambient-bg-review\{[^}]*background-color:(?:#fff|#ffffff|white)\b/, 'CSS: o fundo dos artigos não é branco');
assert.match(css, /\.editorial-ambient-bg-review:{1,2}before\{[^}]*content:none/, 'CSS: o fundo dos artigos ainda tem a camada de manchas');

// Todo artigo tem o dock do sumário no celular (ReviewMobileBottomBar) e a sidebar no desktop
// (ReviewSidebar). Um artigo sem nenhuma seção com título fica sem dock e sem o sumário da sidebar;
// se um dia isso for de propósito, tire-o desta conferência.
const articleUrls = sitemapUrls.filter((url) => /\/reviews\/[^/]+$/.test(new URL(url).pathname));
assert.ok(articleUrls.length > 0, 'sitemap.xml sem artigos');
let familyHeads = 0;
let notedArticles = 0;
let faqArticles = 0;
let cutoutArticles = 0;
let cutoutStoreLinks = 0;
let codeHighlightArticles = 0;
let sidebarCutoutArticles = 0;
let inlineCopyArticles = 0;
let endStoreBlocks = 0;
let endWithoutStore = 0;
let endAffiliateBlocks = 0;
let endPhotoGalleries = 0;
let endStoreArticleLinks = 0;
let endStoreRules = 0;
let endGalleries = 0;
let endTopVideos = 0;
let endProsCons = 0;
let endFullRelated = 0;
let endBrunoBoxes = 0;
for (const url of articleUrls) {
  const pagePath = new URL(url).pathname;
  const file = builtFile(url);
  assert.ok(file, `${pagePath}: página não gerada no build`);
  const html = read(file);
  const body = bodyOf(html);
  assert.equal(openElementsAt(body, body.length), 0, `${pagePath}: as tags do <body> não fecham`);
  assertCeciliaAuthorId(personNodesChecked.artigo, pagePath, html);
  assert.deepEqual(articleBodyProblems(body), [], `${pagePath}: corpo do artigo fora do visual da D2`);
  const articleCorpo = elementAt(body, body.search(/<[a-zA-Z][\w-]*\s[^>]*\bdata-article="corpo"/));
  if (/\sclass="[^"]*(?<![\w-])marca-codigo(?![\w-])/.test(articleCorpo)) codeHighlightArticles++;

  const dialogs = body.match(/<dialog\b[\s\S]*?<\/dialog>/g) ?? [];
  assert.equal(dialogs.length, 1, `${pagePath}: ${dialogs.length} gavetas de sumário em vez de uma`);
  const [dialog] = dialogs;
  const dialogStart = body.indexOf('<dialog');
  const progressbar = body.lastIndexOf('role="progressbar"', dialogStart);
  assert.ok(progressbar >= 0, `${pagePath}: dock sem a barra de progresso antes da gaveta`);
  // Dentro do fundo editorial, `.editorial-ambient-bg > *` troca o sticky do dock por relative.
  assert.equal(openElementsAt(body, dialogStart), 0, `${pagePath}: a gaveta do sumário não é filha direta do <body>`);
  assert.equal(openElementsAt(body, progressbar), 1, `${pagePath}: o dock do sumário não é filho direto do <body>`);
  // O HTML do servidor leva o dock escondido e inerte, como o CouponDock: ele só aparece depois da rolagem.
  const dockTag = body.slice(body.lastIndexOf('<div', body.lastIndexOf('<div', progressbar) - 1)).match(/^<div\b[^>]*>/)?.[0] ?? '';
  assert.match(dockTag, /\sinert=""/, `${pagePath}: dock do servidor sem inert`);
  assert.ok(classesOf(dockTag).includes('invisible'), `${pagePath}: dock do servidor visível antes da rolagem`);

  const review = reviewByPathname.get(pagePath);
  assert.ok(review, `${pagePath}: artigo do sitemap sem review publicada`);

  const ids = new Set([...body.matchAll(/\sid="([^"]+)"/g)].map(([, id]) => id));
  const targets = [...dialog.matchAll(/href="#([^"]+)"/g)].map(([, id]) => id);
  assert.ok(targets.length > 0, `${pagePath}: gaveta sem links do sumário`);
  assert.deepEqual(targets.filter((id) => !ids.has(id)), [], `${pagePath}: link do sumário sem seção na página`);

  if (html.match(/<html lang="([^"]+)"/)?.[1] !== 'pt-BR') {
    const dockAndSheet = body.slice(body.lastIndexOf('<div', progressbar), dialogStart + dialog.length);
    assert.deepEqual(PT_DOCK_TEXT.filter((text) => dockAndSheet.includes(text)), [], `${pagePath}: dock ou gaveta em português`);
    // O card com desconto e regra (canhoto de 92px) usa os textos de /cupons, que só existem em português.
    assert.ok(!dialog.includes('w-[92px]'), `${pagePath}: card completo do cupom fora do português`);
  }

  // A sidebar segue o idioma do artigo, com os textos de sidebarCopy.ts. A outra <aside> dos artigos
  // é a nota editorial, sem <nav>.
  const locale = LOCALE_KEYS.find((key) => key === pagePath.split('/')[1]) ?? 'pt';
  // O bloco de loja ativa que o template recebe: recorte do topo, lateral e bloco do fim.
  const storeBlock = getArticleStoreBlock(review, locale);
  const copy = getSidebarCopy(locale);
  const sidebars = [...body.matchAll(/<aside\b[\s\S]*?<\/aside>/g)].map(([aside]) => aside).filter((aside) => aside.includes('<nav '));
  assert.equal(sidebars.length, 1, `${pagePath}: ${sidebars.length} sidebars em vez de uma`);
  const [sidebar] = sidebars;
  const shownTexts = [
    ...[...sidebar.matchAll(/aria-label="([^"]*)"/g)].map(([, label]) => decodeHtml(label)),
    ...sidebar.split(/<[^>]+>/).map((text) => decodeHtml(text).trim()).filter(Boolean),
  ];
  // O código e o tipo dele (cupom, recompensa ou indicação) saem da review, como no template.
  // O veredito só existe em artigo de produto com nota; título, recomendação e nota seguem o idioma.
  // Uma review antiga guarda `rating` como objeto ({ score, max, stars }); a sidebar só mostra nota numérica.
  const rawStars = review.verdict?.stars ?? review.rating;
  const verdictStars = typeof rawStars === 'number' ? rawStars : undefined;
  const hasVerdict = sidebar.includes('role="img"');
  if (hasVerdict) assert.equal(typeof verdictStars, 'number', `${pagePath}: sidebar com nota, mas a review não tem`);
  assert.deepEqual(
    verdictProblems(locale, shownTexts, hasVerdict, verdictStars ?? 0, review.verdict?.recommendation),
    [],
    `${pagePath}: veredito da sidebar fora do idioma do artigo`
  );

  // Fora do PT, nenhum texto fixo da interface do artigo (selo, ficha, vídeo, galeria, compartilhar) sobra em português.
  if (locale !== 'pt') {
    const own = new Set(articleUiTexts(locale));
    const portuguese = new Set(articleUiTexts('pt').filter((text) => !own.has(text)));
    const ownBody = withoutRelatedCards(body);
    const pageTexts = [
      ...[...ownBody.matchAll(/aria-label="([^"]*)"/g)].map(([, label]) => decodeHtml(label)),
      ...ownBody.split(/<[^>]+>/).map((text) => decodeHtml(text).trim()),
    ];
    // O `type` da própria review, rótulo livre do conteúdo, aparece uma vez no cabeçalho.
    const typeAt = pageTexts.indexOf(review.type);
    if (typeAt >= 0) pageTexts.splice(typeAt, 1);
    assert.deepEqual([...new Set(pageTexts.filter((text) => portuguese.has(text)))], [], `${pagePath}: interface do artigo em português`);
  }

  // A trilha vai da home do idioma à lista de artigos e ao artigo, e o JSON-LD repete a da página.
  // Ela é procurada antes da gaveta, cujo sumário também é uma <nav><ol>.
  const reviewHub = locale === 'pt' ? { label: 'Guias & Análises', href: '/reviews' } : getInternationalReviewHub(locale);
  const crumbs = visibleTrailOf(body.slice(0, dialogStart), pagePath);
  assert.deepEqual(
    crumbs,
    [
      { name: getShellCopy(locale).homeLabel, href: getShellHomeHref(locale) },
      { name: reviewHub.label, href: reviewHub.href },
      { name: review.title, href: pagePath },
    ].map(({ name, href }) => ({ name, url: new URL(href, SITE_URL).href })),
    `${pagePath}: a trilha não é home do idioma > lista de artigos > artigo`
  );
  assert.deepEqual(
    schemaTrailOf(jsonLdOf(html).find((schema) => schema['@type'] === 'BreadcrumbList')),
    crumbs,
    `${pagePath}: trilha do JSON-LD diferente da trilha na página`
  );
  // O leitor de tela anuncia a trilha e a nota editorial no idioma do artigo; a trilha tem o nome
  // que as páginas de loja usam.
  assert.equal(
    trailLabelOf(body.slice(0, dialogStart)),
    getArticleCopy(locale).breadcrumbLabel,
    `${pagePath}: nome da trilha para o leitor de tela fora do idioma do artigo`
  );
  // Recorte do topo: em todo artigo de loja ativa (o mesmo bloco que o template recebe), uma vez; sem loja, nenhum.
  const cutoutCount = body.match(/\sid="cupom-artigo"/g)?.length ?? 0;
  assert.equal(cutoutCount, storeBlock ? 1 : 0, `${pagePath}: ${cutoutCount} recortes do topo (loja: ${storeBlock?.slug ?? 'nenhuma'})`);
  if (storeBlock) {
    assert.deepEqual(cutoutProblems(sectionIn(body, 'cupom-artigo') ?? '', locale, storeBlock), [], `${pagePath}: recorte do topo`);
    cutoutArticles++;
    const storeLinks = cutoutStoreLinkProblems(body);
    assert.deepEqual(storeLinks.problems, [], `${pagePath}: link da loja nos recortes`);
    cutoutStoreLinks += storeLinks.links;
    assert.deepEqual(drawerStoreLinkProblems(dialog), [], `${pagePath}: link da loja na gaveta do celular`);
  }
  const citesStoreCode = Boolean(storeBlock?.code && bodyCitesCode(review, storeBlock.code));
  assert.deepEqual(inlineCopyProblems(body, locale, storeBlock, citesStoreCode), [], `${pagePath}: código copiável no texto`);
  if (citesStoreCode) inlineCopyArticles++;
  // O fim do artigo, contra os dados que o montam. O bloco verde "Interessou?" e os botões de loja do veredito
  // em texto saíram: nem o texto nem as medições deles ficam na página (o payload do React leva o placement).
  assert.ok(!/review_final_cta|review_verdict/.test(html), `${pagePath}: medição do bloco verde ou do veredito em texto`);
  assert.ok(!shownTextsOf(body).includes('Interessou?'), `${pagePath}: bloco verde "Interessou?"`);
  const endKind = inferReviewKind(review);
  const pros = endKind === 'produto' ? review.pros?.length ?? 0 : 0;
  const cons = endKind === 'produto' ? review.cons?.length ?? 0 : 0;
  const topVideoId = getYoutubeEmbedUrl(review.youtubeUrl) ? getYoutubeVideoId(review.youtubeUrl) : null;
  const galleryVideos = review.youtubeUrl && !topVideoId ? 1 : 0;
  const galleryItems = (review.gallery ?? []).filter((item) => item.image || (item as { url?: string }).url).length + galleryVideos;
  // O cta do artigo com a marcação de patrocínio que o template dá a ele (ReviewNotebookTemplate).
  const hasCommercialRelationship = Boolean(review.affiliate || (review.coupon && review.editorialNote));
  const affiliateCta =
    !storeBlock && review.cta?.url && review.cta.label
      ? { url: review.cta.url, label: review.cta.label, text: review.cta.text, sponsored: review.cta.sponsored ?? hasCommercialRelationship }
      : null;
  const related = pickRelatedReviews(review, publishedReviews).map(getReviewCanonicalPathname);
  const hasBrunoBox = Boolean(review.authors?.some((author) => author.slug === 'bruno-luiz'));
  assert.deepEqual(
    articleEndProblems(body, {
      locale,
      storeBlock,
      affiliateCta,
      galleryItems,
      galleryVideos,
      topVideoId,
      verdict: endKind === 'produto' && (Boolean(review.verdict?.stars) || typeof review.rating === 'number' || pros + cons > 0),
      pros,
      cons,
      authorHref: locale === 'pt' ? '/sobre' : getShellHomeHref(locale),
      brunoBox: hasBrunoBox ? { link: getArticleCopy(locale).brunoBoxLink } : null,
      related,
      relatedAllHref: storeBlock?.articlesHref ?? reviewHub.href,
    }),
    [],
    `${pagePath}: fim do artigo`
  );
  if (storeBlock) endStoreBlocks++;
  else if (affiliateCta) endAffiliateBlocks++;
  else endWithoutStore++;
  if (galleryItems && !galleryVideos) endPhotoGalleries++;
  if (storeBlock?.articlesHref) endStoreArticleLinks++;
  if (storeBlock?.rules.length) endStoreRules++;
  if (galleryItems) endGalleries++;
  if (topVideoId) endTopVideos++;
  if (pros + cons) endProsCons++;
  if (related.length === 6) endFullRelated++;
  if (hasBrunoBox) endBrunoBoxes++;
  // O id de cada seção sai do título (generateSectionIds, indexado pelo título): dois títulos iguais dão
  // o mesmo id às duas seções, e o sumário e a nota ancorada nelas se confundem.
  const headings = (review.contentSections ?? []).map((section) => section.heading).filter(Boolean);
  assert.equal(new Set(headings).size, headings.length, `${pagePath}: seções com o mesmo título`);
  // Cada nota da review aparece uma vez, com o título do idioma, e nenhuma outra; com rótulos repetidos,
  // uma nota em dobro esconderia outra faltando. O Review legado de data.ts não declara as notas, que vêm
  // no índice.
  const noteTitle = getArticleCopy(locale).editorialNoteTitle;
  const notes = (review as { notes?: EditorialNoteData[] }).notes ?? [];
  const noteLabels = notes.map((note) => `${noteTitle}: ${note.label}`);
  assert.equal(new Set(noteLabels).size, noteLabels.length, `${pagePath}: notas editoriais com o mesmo rótulo`);
  assert.deepEqual(
    editorialNoteLabelsIn(body).sort(),
    [...noteLabels].sort(),
    `${pagePath}: nota editorial fora do idioma do artigo, faltando ou repetida`
  );
  // A nota ancorada numa seção do corpo sai dentro da <section> dela, e não no topo. As seções do corpo
  // são as do template (getBodySections); a nota ancorada em outra parte (veredito, passo do guia) sai no topo.
  const bodySectionIds = new Set(getBodySections(review.contentSections ?? [], inferReviewKind(review)).map(({ id }) => id));
  for (const [index, note] of notes.entries()) {
    if (!note.anchor || !bodySectionIds.has(note.anchor)) continue;
    const section = sectionIn(body, note.anchor);
    assert.ok(section, `${pagePath}: a seção ${note.anchor} da nota "${note.label}" não está na página`);
    assert.ok(
      editorialNoteLabelsIn(section).includes(noteLabels[index]),
      `${pagePath}: nota "${note.label}" fora da seção ${note.anchor}`
    );
  }
  if (notes.length) notedArticles++;

  // O FAQPage repete, na mesma ordem, as perguntas e as respostas do acordeão de todas as seções de FAQ:
  // o título (isFaqHeading) e o item (getFaqItems) saem de src/lib/faq.ts para os dois. Quando o acordeão
  // tinha uma lista própria, sem os títulos em francês, alemão e italiano, essas perguntas saíam como lista
  // comum. Nos guias, a seção de FAQ pode ser um passo. A resposta vai em trechos (faqAnswerPartsOf): o
  // link do texto chegava ao schema em markdown cru.
  const sectionIds = generateSectionIds(review.contentSections ?? []);
  const visibleFaq = (review.contentSections ?? [])
    .filter(({ heading }) => isFaqHeading(heading))
    .flatMap(({ heading }) => {
      const id = sectionIds.get(heading);
      const section = id && sectionIn(body, id);
      assert.ok(section, `${pagePath}: a seção de FAQ "${heading}" não está na página`);
      return [...section.matchAll(/<summary\b[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)].map(([, question, answer]) => ({
        question: textOf(question.replace(/<span\b[^>]*>\+<\/span>$/, '')),
        answer: faqAnswerPartsOf(answer, url),
      }));
    });
  const faqPage = jsonLdOf(html).find((schema) => schema['@type'] === 'FAQPage');
  assert.deepEqual(
    faqPage?.mainEntity.map(({ name, acceptedAnswer }: { name: string; acceptedAnswer: { text: string } }) => ({
      question: name,
      answer: faqAnswerPartsOf(acceptedAnswer.text),
    })) ?? [],
    visibleFaq,
    `${pagePath}: FAQPage diferente das perguntas e respostas do acordeão`
  );
  if (visibleFaq.length) faqArticles++;

  // O <head> de um artigo de família: canonical da própria página e hreflang dos 10 idiomas, com x-default no inglês.
  if (review.translationKey) {
    const family = familyPaths.get(review.translationKey) ?? {};
    assert.deepEqual(LOCALE_KEYS.filter((key) => !family[key]), [], `${pagePath}: família ${review.translationKey} sem todos os idiomas`);
    const alternates = [
      ...LOCALE_KEYS.map((key) => `${LOCALES[key].hreflang} ${SITE_URL}${family[key]}`),
      `x-default ${SITE_URL}${family.en}`,
    ].sort();
    assertLocalizedHead(pagePath, headOf(html), alternates, LOCALES[locale].openGraphLocale);
    familyHeads++;
  }

  // Artigo de loja ativa: a lateral traz o recorte compacto (o mesmo do topo, sem o id dele), com o código, o tipo
  // e a frase de depois de copiar no idioma do artigo. Sem loja, o código e o cta, com as frases da lateral.
  const sidebarCutouts = [...sidebar.matchAll(/<section\b[^>]*\sdata-recorte="sidebar"/g)].map((match) => elementAt(sidebar, match.index));
  assert.equal(sidebarCutouts.length, storeBlock ? 1 : 0, `${pagePath}: ${sidebarCutouts.length} recortes na lateral (loja: ${storeBlock?.slug ?? 'nenhuma'})`);
  assert.ok(!sidebar.includes('id="cupom-artigo"'), `${pagePath}: a lateral leva o id do recorte do topo`);
  const store = review.affiliate ? getCouponBySlug(review.affiliate) : undefined;
  const codeKind = getStoreCodeKind(store, review.coupon);
  const hints = getCodeHints(copy, codeKind, store?.brand);
  let code: string | undefined;
  if (storeBlock) {
    assert.deepEqual(cutoutProblems(sidebarCutouts[0], locale, storeBlock), [], `${pagePath}: recorte da lateral`);
    code = sidebarCutouts[0].match(/<code\b[^>]*>([^<]+)<\/code>/)?.[1];
    sidebarCutoutArticles++;
  } else {
    code = sidebar.match(/data-copied="false"[^>]*>([^<]+)</)?.[1];
  }
  assert.equal(code, review.coupon, `${pagePath}: código da sidebar diferente do da review`);
  const expectedTexts = [
    copy.sectionsNav,
    copy.tocTitle,
    ...(code ? [getCouponCopyLabels(locale).copyCoupon(code)] : []),
    ...(code && !storeBlock ? [hints.copy, hints.copied] : []),
    ...(codeKind === 'referral' ? [getCodeTitle(copy, codeKind, store?.brand)] : []),
  ];
  assert.deepEqual(expectedTexts.filter((text) => !shownTexts.includes(text)), [], `${pagePath}: sidebar sem os textos do idioma`);
  const foreign = foreignSidebarText(locale);
  assert.deepEqual(shownTexts.filter((text) => foreign.has(text)), [], `${pagePath}: sidebar com texto de outro idioma`);
  // A gaveta do celular dá ao código o mesmo tipo.
  if (code) {
    const drawerTitle = getCodeTitle(copy, codeKind, store?.brand);
    assert.ok(
      dialog.split(/<[^>]+>/).some((text) => decodeHtml(text).trim() === drawerTitle),
      `${pagePath}: gaveta sem o título "${drawerTitle}" no card do código`
    );
  }
}
// Sem nenhum artigo com nota, a conferência da nota editorial passaria à toa.
assert.ok(notedArticles > 0, 'nenhum artigo com nota editorial');
assert.ok(faqArticles > 0, 'nenhum artigo com FAQ');
assert.ok(cutoutArticles > 0, 'nenhum artigo com o recorte do topo');
assert.ok(codeHighlightArticles > 0, 'nenhum artigo com o código destacado (marca-codigo) no corpo');
assert.ok(cutoutStoreLinks >= cutoutArticles * 3, `só ${cutoutStoreLinks} links da loja nos recortes de ${cutoutArticles} artigos`);
assert.equal(sidebarCutoutArticles, cutoutArticles, 'recorte da lateral e recorte do topo em artigos diferentes');
assert.ok(inlineCopyArticles > 0, 'nenhum artigo cita o código da loja no corpo');
// Cada ramo do fim do artigo conferido em algum artigo: com e sem loja, com a subpágina da loja e com regras,
// com galeria, com o vídeo do topo e com prós e contras. Todo idioma tem mais de 6 artigos: todos levam 6.
assert.equal(endStoreBlocks, cutoutArticles, 'bloco da loja e recorte do topo em artigos diferentes');
for (const [count, name] of [
  [endWithoutStore, 'sem loja e sem cta'],
  [endAffiliateBlocks, 'sem loja com o botão do cta'],
  [endPhotoGalleries, 'com galeria só de fotos'],
  [endStoreArticleLinks, 'com "Todos os N artigos"'],
  [endStoreRules, 'com as regras da loja'],
  [endGalleries, 'com galeria'],
  [endTopVideos, 'com o vídeo do topo'],
  [endProsCons, 'com prós e contras'],
] as const) {
  assert.ok(count > 0, `nenhum artigo ${name} no fim do artigo`);
}
assert.equal(endFullRelated, articleUrls.length, 'artigo com menos de 6 relacionados');
// As duas poltronas da Damie, a Dolce Gusto Genio S Touch e o guia de cupons da YesStyle nos 10 idiomas.
assert.equal(endBrunoBoxes, 13, 'artigos com a caixa do Bruno');
console.log(
  `fim dos ${articleUrls.length} artigos: ${endStoreBlocks} com o bloco da loja (${endStoreRules} com regras, ${endStoreArticleLinks} com "Todos os N artigos"), ` +
    `${endAffiliateBlocks} sem loja com o botão do cta, ${endWithoutStore} sem loja e sem cta, ${endGalleries} com galeria (${endPhotoGalleries} só de fotos), ${endTopVideos} com o vídeo do topo fora da galeria, ${endProsCons} com prós e contras, ${endFullRelated} com 6 relacionados, ${endBrunoBoxes} com a caixa do Bruno`
);

// As receitas só existem em português; a trilha delas tem o mesmo nome da dos artigos.
const recipeUrls = sitemapUrls.filter((url) => /^\/receitas\/[^/]+$/.test(new URL(url).pathname));
assert.ok(recipeUrls.length > 0, 'sitemap.xml sem receitas');
for (const url of recipeUrls) {
  const pagePath = new URL(url).pathname;
  const file = builtFile(url);
  assert.ok(file, `${pagePath}: página não gerada no build`);
  const html = read(file);
  assert.equal(trailLabelOf(bodyOf(html)), getArticleCopy('pt').breadcrumbLabel, `${pagePath}: nome da trilha da receita`);
  assertCeciliaAuthorId(personNodesChecked.receita, pagePath, html);
}

// A home de cada idioma (/en, /ja…):
// - no <head>, canonical, hreflang das 10 homes com x-default em inglês, e o mesmo hreflang na raiz;
// - no <main>, o Person e o FAQPage, que repete as perguntas da página;
// - nenhum texto em português, nenhum link de loja (só as páginas das lojas no idioma) e nenhum código
//   chamado de cupom;
// - nada escondido pela rolagem no HTML;
// - o logo das páginas do idioma levando a ela, e a home no sitemap e no llms.txt.
const homeAlternates = Object.entries(getHomeLanguageLinks()).map(([hreflang, href]) => `${hreflang} ${href}`).sort();
{
  const rootHead = headOf(read(path.join(APP_DIR, 'index.html')));
  assert.deepEqual(
    [...rootHead.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map(([, hreflang, href]) => `${hreflang} ${href}`).sort(),
    homeAlternates,
    '/: hreflang das homes de cada idioma'
  );
}

// Os textos fixos do menu, do rodapé (com o link das preferências de cookies) e do seletor de um idioma.
// Ficam de fora o campo `locale`, que não é texto de tela, e o modelo do aria-label das redes (com
// `{social}`), que o rodapé monta uma vez por rede.
const shellTexts = (locale: Locale) => {
  const copy = getShellCopy(locale);
  return [
    ...fixedTexts({ ...copy, locale: undefined }).filter((text) => !text.includes('{')),
    ...socialMedias.map((social) => copy.followAria.replace('{social}', social.name)),
    getConsentCopy(locale).preferences,
  ];
};
// A categoria e o título do código de cada loja da home em português, e não só os da YesStyle e da SHEIN.
const { categories: PT_STORE_CATEGORIES, codeTitles: PT_CODE_TITLES } = getPtStoreTexts();
// Todo texto fixo do site em português (menu, rodapé, seletor) mais os da home em português, para a home
// de cada idioma não deixar nenhum passar. O que o idioma escreve igual ao português sai por locale.
const PT_ONLY_TEXTS = [
  ...Object.values(CECILIA_PHOTO_COPY_PT),
  ...getShellNavLinks('pt').map((link) => link.label),
  ...shellTexts('pt'),
  'Da minha casa',
  'Mais sobre mim',
  'Entre no grupo de promoções',
  ...PT_STORE_CATEGORIES,
  ...PT_CODE_TITLES.map(({ title }) => title),
];

for (const locale of LOCALE_HOME_LOCALES) {
  const pagePath = getLocaleHomePath(locale);
  const file = builtFile(`${SITE_URL}${pagePath}`);
  assert.ok(file, `${pagePath}: página não gerada no build`);
  const html = read(file);
  const content = getLocaleHomeContent(locale, publishedReviews);
  assertLocalizedHead(pagePath, headOf(html), homeAlternates, LOCALES[locale].openGraphLocale);
  // A imagem de compartilhamento é a foto da Cecília, no og:image, no cartão do X e no Person.
  assertShareImage(pagePath, headOf(html), { url: content.hero.photoUrl, alt: content.hero.photo.alt });

  const main = html.match(/<main\b[\s\S]*<\/main>/)?.[0] ?? '';
  const body = bodyOf(html);
  assert.equal((body.match(/<h1\b/g) ?? []).length, 1, `${pagePath}: H1`);
  assert.ok(!html.includes('data-reveal'), `${pagePath}: data-reveal no HTML`);
  // O aviso de cookies só monta no navegador.
  assert.ok(!body.includes(`aria-label="${getConsentCopy(locale).regionLabel}"`), `${pagePath}: aviso de cookies no HTML`);

  const schemas = jsonLdOf(main);
  assert.deepEqual(schemas.map((schema) => schema['@type']).sort(), ['FAQPage', 'Person'], `${pagePath}: tipos do JSON-LD`);
  const person = schemas.find((schema) => schema['@type'] === 'Person');
  assert.equal(person.name, CECILIA_FULL_NAME, `${pagePath}: Person sem o nome completo`);
  assert.equal(person['@id'], CECILIA_PERSON_ID, `${pagePath}: Person sem o @id da Cecília`);
  personNodesChecked.home.push(pagePath);
  assert.deepEqual(
    person.sameAs,
    content.follow.networks.map((network) => network.href),
    `${pagePath}: Person.sameAs diferente das redes da página`
  );
  assert.equal(person.image, content.hero.photoUrl, `${pagePath}: Person.image diferente da foto do og:image`);
  const visibleFaq = [...main.matchAll(/<details\b[^>]*><summary\b[^>]*>([\s\S]*?)<\/summary><div\b[^>]*><p\b[^>]*>([\s\S]*?)<\/p>/g)].map(
    ([, question, answer]) => ({ question: textOf(question), answer: textOf(answer) })
  );
  assert.equal(visibleFaq.length, 4, `${pagePath}: perguntas`);
  assert.deepEqual(
    schemas.find((schema) => schema['@type'] === 'FAQPage').mainEntity.map(
      ({ name, acceptedAnswer }: { name: string; acceptedAnswer: { text: string } }) => ({ question: name, answer: acceptedAnswer.text })
    ),
    visibleFaq,
    `${pagePath}: FAQPage diferente das perguntas na página`
  );

  // Link de loja em qualquer ponto da página, menu e rodapé inclusive; já os cartões das lojas do idioma
  // têm de estar no <main>, porque o menu também leva às páginas delas.
  const hrefsIn = (html: string) => [...html.matchAll(/href="([^"]+)"/g)].map(([, href]) => decodeHtml(href));
  assert.deepEqual(hrefsIn(body).filter(isStoreLink), [], `${pagePath}: link de loja`);
  const mainHrefs = hrefsIn(main);
  const stores = getLocaleHomeStores(locale);
  for (const store of stores) assert.ok(mainHrefs.includes(store.href), `${pagePath}: sem ${store.href}`);

  const ownTexts = new Set([...fixedTexts(getLocaleHomeCopy(locale)), ...shellTexts(locale)]);
  const sameAsPortuguese = [
    ...PT_CODE_TITLES.filter(({ kind }) => LABEL_SAME_AS_PORTUGUESE.has(`${locale}:${kind}`)).map(({ title }) => title),
    ...getCategoriesSameAsPortuguese(locale),
  ];
  const ptTexts = new Set(PT_ONLY_TEXTS.filter((text) => !ownTexts.has(text) && !sameAsPortuguese.includes(text)));
  const shownTexts = [
    ...[...body.matchAll(/>([^<>]+)</g)].map(([, text]) => decodeHtml(text).trim()),
    ...[...body.matchAll(/\s(?:alt|aria-label)="([^"]*)"/g)].map(([, text]) => decodeHtml(text).trim()),
  ].filter(Boolean);
  // Sem este controle, um extrator que devolvesse a lista vazia faria a conferência de português passar à toa.
  assert.ok(shownTexts.includes(getLocaleHomeCopy(locale).storesTitle), `${pagePath}: o texto extraído da página sem o título das lojas`);
  assert.deepEqual([...new Set(shownTexts.filter((text) => ptTexts.has(text)))], [], `${pagePath}: texto em português`);
  const codeAsCoupon = codeAsCouponRegExp(stores.flatMap((store) => (store.code ? [store.code] : [])));
  if (codeAsCoupon) assert.doesNotMatch(shownTexts.join(' '), codeAsCoupon, `${pagePath}: código chamado de cupom`);

  // Na lista de artigos do idioma, o logo do cabeçalho e o do rodapé levam à home do idioma. O cabeçalho é
  // o primeiro <header> da página e o rodapé, o último <footer>.
  const hubFile = builtFile(`${SITE_URL}/${locale}/reviews`);
  assert.ok(hubFile, `/${locale}/reviews: página não gerada no build`);
  const hubBody = bodyOf(read(hubFile));
  const header = hubBody.match(/<header\b[\s\S]*?<\/header>/)?.[0] ?? '';
  const footer = [...hubBody.matchAll(/<footer\b[\s\S]*?<\/footer>/g)].at(-1)?.[0] ?? '';
  assert.ok(header.includes(`href="${pagePath}"`), `/${locale}/reviews: logo do cabeçalho sem a home do idioma`);
  assert.ok(footer.includes(`href="${pagePath}"`), `/${locale}/reviews: logo do rodapé sem a home do idioma`);

  assert.ok(sitemapUrls.includes(`${SITE_URL}${pagePath}`), `sitemap.xml sem ${pagePath}`);
  assert.ok(llmsUrls.includes(`${SITE_URL}${pagePath}`), `llms.txt sem ${pagePath}`);
}

// O Person da /sobre é a mesma Cecília das homes, e nenhum grupo de nós conferidos fica vazio: sem isto, um
// extrator que não achasse nada faria a conferência do @id passar à toa.
{
  const sobreFile = builtFile(`${SITE_URL}/sobre`);
  assert.ok(sobreFile, '/sobre: página não gerada no build');
  const sobrePerson = jsonLdOf(read(sobreFile)).find((schema) => schema['@type'] === 'Person');
  assert.ok(sobrePerson, '/sobre: sem o Person no JSON-LD');
  assert.equal(sobrePerson['@id'], CECILIA_PERSON_ID, '/sobre: Person sem o @id da Cecília');
  assert.equal(sobrePerson.url, `${SITE_URL}/sobre`, '/sobre: o @id aponta para a página, e o url dela mudou');
  personNodesChecked.sobre.push('/sobre');
  assert.equal(personNodesChecked.home.length, LOCALE_HOME_LOCALES.length, 'o @id da Cecília não foi conferido nas 9 homes de idioma');
  assert.ok(personNodesChecked.artigo.length > 0, 'nenhum autor de artigo conferido para o @id da Cecília');
  assert.ok(personNodesChecked.receita.length > 0, 'nenhum autor de receita conferido para o @id da Cecília');
}

// Toda página que cita o CECILIA010 segue a regra: as 10 da YesStyle, os artigos, /cupons e as lojas
// com o card da YesStyle em "Outros cupons". Cada bloco de texto conta sozinho, para o código não
// "encostar" no título da seção seguinte; tags inline não cortam o trecho, senão o destaque do
// código nos artigos (um <span>) separaria "cupom" do código.
const INLINE_TAGS = /<\/?(?:a|abbr|b|code|em|i|mark|small|span|strong|sub|sup|time|u)\b[^>]*>/g;
const COUPON_WORD = new RegExp(`(?:${COUPON_WORDS})`, 'iu');
const stringsOf = (value: unknown): string[] =>
  typeof value === 'string' ? [value] : value && typeof value === 'object' ? Object.values(value).flatMap(stringsOf) : [];
const builtPages = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? builtPages(full) : entry.name.endsWith('.html') ? [full] : [];
  });

// Os <article> sem outro <article> dentro, com o conteúdo até o </article> que os fecha.
function innermostArticles(body: string) {
  const articles: { attributes: string; inner: string }[] = [];
  const open: { attributes: string; start: number }[] = [];
  for (const match of body.matchAll(/<(\/?)article\b([^>]*)>/g)) {
    if (!match[1]) {
      open.push({ attributes: match[2], start: match.index + match[0].length });
      continue;
    }
    const article = open.pop();
    const inner = article ? body.slice(article.start, match.index) : '';
    if (article && !inner.includes('<article')) articles.push({ attributes: article.attributes, inner });
  }
  return articles;
}

let rewardCodePages = 0;
for (const file of builtPages(APP_DIR)) {
  const html = read(file);
  if (!html.includes(rewardCode)) continue;
  rewardCodePages++;
  const pagePath = `/${path.relative(APP_DIR, file).replace(/\\/g, '/').replace(/\.html$/, '').replace(/^index$/, '')}`;
  const head = headOf(html);
  const body = bodyOf(html);
  const texts = [
    ...body.replace(INLINE_TAGS, '').split(/<[^>]+>/).map(decodeHtml),
    ...[...body.matchAll(/aria-label="([^"]*)"/g)].map(([, label]) => decodeHtml(label)),
    decodeHtml(head.match(/<title>([^<]*)<\/title>/)?.[1] ?? ''),
    ...[...head.matchAll(/<meta [^>]*content="([^"]*)"/g)].map(([, content]) => decodeHtml(content)),
    ...jsonLdOf(html).flatMap(stringsOf),
  ].map((text) => text.replace(/\s+/g, ' ').trim());
  assert.deepEqual(
    texts.filter((text) => REWARD_CODE_AS_COUPON.test(text)),
    [],
    `${pagePath}: texto que chama o ${rewardCode} de cupom`
  );

  // O nome do card que mostra o código (gaveta do dock, /cupons e "Outros cupons") fica longe dele,
  // fora do alcance das regras acima. Os recortes dos artigos (o do topo e o do bloco da loja no fim) são
  // <section> com nome próprio, dentro do <article> da página, que não tem nome: cada um conta por si e sai do
  // <article>.
  const cutouts = tagsWith(body, 'aria-label=')
    .map(({ html }) => html)
    .filter((cutout) => cutout.startsWith('<section') && classesOf(cutout).includes('recorte') && cutout.includes(`>${rewardCode}</code>`));
  for (const cutout of cutouts) {
    const name = cutout.match(/aria-label="([^"]*)"/)?.[1];
    assert.ok(name, `${pagePath}: recorte do ${rewardCode} sem nome`);
    assert.doesNotMatch(decodeHtml(name), COUPON_WORD, `${pagePath}: recorte do ${rewardCode} com nome de cupom`);
  }
  for (const { attributes, inner } of innermostArticles(cutouts.reduce((rest, cutout) => rest.replace(cutout, ''), body))) {
    if (!inner.includes(`>${rewardCode}</code>`)) continue;
    const labelledBy = attributes.match(/aria-labelledby="([^"]+)"/)?.[1];
    const name =
      attributes.match(/aria-label="([^"]*)"/)?.[1] ?? body.split(`id="${labelledBy}"`)[1]?.match(/>([^<]*)</)?.[1];
    assert.ok(name, `${pagePath}: card do ${rewardCode} sem nome`);
    assert.doesNotMatch(decodeHtml(name), COUPON_WORD, `${pagePath}: card do ${rewardCode} com nome de cupom`);
  }
}
assert.ok(rewardCodePages > yesStyleHubs.length, `só ${rewardCodePages} páginas citam o ${rewardCode}`);

// A ItemList de /cupons dá a cada loja o nome do card.
const couponsHubFile = builtFile(`${SITE_URL}/cupons`);
assert.ok(couponsHubFile, '/cupons: página não gerada no build');
const yesStyleListItem = jsonLdOf(read(couponsHubFile))
  .find((schema) => schema['@type'] === 'ItemList')
  ?.itemListElement.find(({ url }) => url === `${SITE_URL}${YESSTYLE_LOCALES.pt.hubPath}`);
assert.ok(yesStyleListItem?.name.includes(rewardCode), `/cupons: YesStyle fora da ItemList ou sem o ${rewardCode}`);
assert.doesNotMatch(yesStyleListItem.name, COUPON_WORD, `/cupons: a ItemList chama o ${rewardCode} de cupom`);

// O movimento de /cupons e das páginas de loja (D2.2), contra os dados que montam cada página. O recorte
// com código (.recorte) é toda caixa tracejada com botão de copiar, e só ela: a cor e o soltar reagem ao
// data-copied do botão, e um recorte sem botão nunca reagiria. A tesoura que corre (.recorte-tesoura) é a
// dos recortes que a têm: os cartões do hub com código e o recorte do topo das lojas com código.
const hasCopyCode = (coupon: Coupon) => coupon.offerMode === 'discount-code' && !coupon.tiers?.length;
type CutoutCount = { total: number; withScissors: number };
function assertCopyCutouts(where: string, body: string, expected: CutoutCount) {
  const cutouts = elementsWithClass(body, 'recorte');
  assert.equal(cutouts.length, expected.total, `${where}: ${cutouts.length} recortes com código (.recorte); os dados pedem ${expected.total}`);
  for (const cutout of cutouts) {
    assert.ok(cutout.includes(' data-copied="'), `${where}: .recorte sem botão de copiar: ${cutout.slice(0, 200)}`);
  }
  const scissors = elementsWithClass(body, 'recorte-tesoura');
  assert.equal(scissors.length, expected.withScissors, `${where}: ${scissors.length} tesouras que correm (.recorte-tesoura); os dados pedem ${expected.withScissors}`);
  assert.equal(
    cutouts.filter((cutout) => elementsWithClass(cutout, 'recorte-tesoura').length === 1).length,
    expected.withScissors,
    `${where}: tesoura (.recorte-tesoura) fora de um .recorte, ou duas no mesmo recorte`
  );
}

// O hub: os recortes e as tesouras contados pelos dados, o fundo de papel de cada tesoura (ela fica metade
// sobre o cartão e metade sobre o recorte, e no verde o fundo dela é o do papel) e nenhuma classe
// has-[[data-copied=true]] de antes, porque o verde é do .recorte, no globals.css. A trava olha o HTML: o
// dock dos artigos usa as mesmas classes, e elas seguem no CSS.
function assertHubCutouts(body: string, expected: CutoutCount) {
  assertCopyCutouts('/cupons', body, expected);
  for (const scissors of elementsWithClass(body, 'recorte-tesoura')) {
    assert.ok(classesOf(scissors).includes('recorte-tesoura-papel'), '/cupons: tesoura sem o fundo de papel (.recorte-tesoura-papel)');
  }
  assert.ok(!body.includes('has-[[data-copied=true]]'), '/cupons: classe has-[[data-copied=true]] no HTML (o verde é do .recorte)');
}

const couponsHubBody = bodyOf(read(couponsHubFile));
const hubSections = getCouponHubSections();
const hubCoupons = [...hubSections.featured, ...hubSections.categories.flatMap(({ coupons }) => coupons)];
const hubCodeCards = hubCoupons.filter(hasCopyCode).length;
assert.ok(hubCodeCards > 0, '/cupons: nenhum cartão com código nos dados');
assertHubCutouts(couponsHubBody, { total: hubCodeCards, withScissors: hubCodeCards });
// Controles no HTML de /cupons: o recorte que perde a classe, a classe num recorte sem botão de copiar
// (por conta e no lugar de outro), a tesoura que perde a classe ou o fundo de papel e a classe
// has-[[data-copied=true]] que volta derrubam a trava.
{
  assert.ok(
    hubCoupons.some((coupon) => !hasCopyCode(coupon)),
    'controle: /cupons sem cartão sem código (faixas ou link); troque o controle abaixo'
  );
  const noCodeCutout = 'flex flex-col gap-2 px-2.5 pt-3 pb-2.5';
  const expected = { total: hubCodeCards, withScissors: hubCodeCards };
  const mutations: [string, RegExp][] = [
    [couponsHubBody.replace(' recorte ', ' '), /recortes com código/],
    [couponsHubBody.replace(noCodeCutout, `recorte ${noCodeCutout}`), /recortes com código/],
    [couponsHubBody.replace(' recorte ', ' ').replace(noCodeCutout, `recorte ${noCodeCutout}`), /sem botão de copiar/],
    [couponsHubBody.replace('recorte-tesoura recorte-tesoura-papel', 'recorte-tesoura-papel'), /tesouras que correm/],
    [couponsHubBody.replace('recorte-tesoura recorte-tesoura-papel', 'recorte-tesoura'), /sem o fundo de papel/],
    [couponsHubBody.replace(' recorte ', ' recorte has-[[data-copied=true]]:bg-verde-claro '), /has-\[\[data-copied=true\]\] no HTML/],
  ];
  for (const [mutated, message] of mutations) {
    assert.notEqual(mutated, couponsHubBody, `controle: a mutação não achou o trecho (${message})`);
    assert.throws(() => assertHubCutouts(mutated, expected), message);
  }
}

// As páginas de loja. O recorte do topo (id="cupom") é .recorte, com a tesoura que corre, só quando tem
// botão de copiar. A caixa de indicação, os cupons da lista da YesStyle e as caixas de código dos "Outros
// cupons" (só em PT) são recortes sem tesoura.
const builtBody = (pagePath: string) => {
  const file = builtFile(`${SITE_URL}${pagePath}`);
  assert.ok(file, `${pagePath}: página não gerada no build`);
  return bodyOf(read(file));
};
function assertStoreCutout(where: string, body: string, copyable: boolean) {
  const at = body.indexOf('<section id="cupom"');
  assert.ok(at >= 0, `${where}: sem o recorte do topo (id="cupom")`);
  const cutout = elementAt(body, at);
  assert.equal(classesOf(cutout).includes('recorte'), copyable, `${where}: o recorte do topo ${copyable ? 'sem' : 'com'} o .recorte`);
  assert.equal(
    elementsWithClass(cutout, 'recorte-tesoura').length,
    copyable ? 1 : 0,
    `${where}: ${copyable ? 'a tesoura do recorte do topo parada' : 'a tesoura do recorte do topo corre sem botão de copiar'}`
  );
  // O círculo da tesoura do topo é amarelo e continua amarelo no verde: não leva o fundo de papel do hub.
  assert.ok(!cutout.includes('recorte-tesoura-papel'), `${where}: a tesoura do recorte do topo com o fundo de papel (.recorte-tesoura-papel)`);
}

// A etiqueta carimbada. Nas lojas: o número do topo, dentro do h1, num bloco (um span inline ignora scale
// e rotate), e o recorte do topo que assenta. No hub: o número de cada Destaque, com a escala de 1,05 e o giro de −3° (o
// cartão não corta o número) e o atraso pela posição, de 150 em 150 ms.
function assertStoreArrival(where: string, body: string) {
  const stamps = elementsWithClass(body, 'etiqueta-entra');
  assert.equal(stamps.length, 1, `${where}: ${stamps.length} números com a etiqueta (.etiqueta-entra)`);
  const h1At = body.indexOf('<h1');
  assert.ok(h1At >= 0, `${where}: sem h1`);
  assert.equal(elementsWithClass(elementAt(body, h1At), 'etiqueta-entra').length, 1, `${where}: a etiqueta fora do h1`);
  assert.ok(classesOf(stamps[0]).includes('block'), `${where}: a etiqueta sem o block`);
  const cutoutAt = body.indexOf('<section id="cupom"');
  assert.ok(cutoutAt >= 0, `${where}: sem o recorte do topo (id="cupom")`);
  assert.ok(classesOf(elementAt(body, cutoutAt)).includes('recorte-entra'), `${where}: o recorte do topo sem o .recorte-entra`);
}
function assertHubStamps(body: string, featuredCount: number) {
  const stamps = elementsWithClass(body, 'etiqueta-entra');
  assert.equal(stamps.length, featuredCount, `/cupons: ${stamps.length} números com a etiqueta (.etiqueta-entra); os Destaques são ${featuredCount}`);
  const featuredSection = between(body, 'aria-labelledby="destaques"', ['aria-labelledby="prateleira-', 'aria-labelledby="perguntas"']);
  assert.equal(elementsWithClass(featuredSection, 'etiqueta-entra').length, featuredCount, '/cupons: etiqueta fora dos Destaques');
  stamps.forEach((stamp, index) => {
    assert.equal(
      stamp.match(/^<[^>]*\sstyle="([^"]*)"/)?.[1],
      `--etiqueta-escala:1.05;--etiqueta-rotacao:-3deg;--etiqueta-atraso:${150 * (index + 1)}ms`,
      `/cupons: a escala e o atraso da etiqueta do Destaque ${index + 1}`
    );
  });
  assert.equal(
    elementsWithClass(body, 'recorte-entra').length,
    0,
    '/cupons: recorte com .recorte-entra no hub (os recortes dos Destaques ficam parados)'
  );
}

assert.ok(hubSections.featured.length > 0, '/cupons: sem Destaques nos dados');
assertHubStamps(couponsHubBody, hubSections.featured.length);

// As prateleiras em cascata com ímã. Cada cartão das prateleiras do hub e dos "Outros cupons" é um item
// com a cascata (.revela, com --i pela posição). Dentro dele, o do meio leva o grupo do hover, a inclinação
// e o ímã do couponCardDecorAt da posição, sempre à direita e nunca amarelo. O cartão leva a sombra do hover.
// Os Destaques ficam sem cascata e sem ímã.
const magnetsIn = (element: string) => elementsWithClass(element, 'size-10').filter((span) => classesOf(span).includes('rounded-full'));
function assertCouponShelf(where: string, section: string, coupons: readonly Coupon[]) {
  const items = elementsWithClass(section, 'revela');
  assert.equal(items.length, coupons.length, `${where}: ${items.length} cartões com a cascata (.revela); a prateleira tem ${coupons.length}`);
  items.forEach((item, index) => {
    const card = `${where}, cartão ${index + 1}`;
    assert.equal(item.match(/^<[^>]*\sstyle="([^"]*)"/)?.[1], `--i:${index}`, `${card}: sem --i:${index}`);
    assert.ok(item.includes(`href="/cupons/${coupons[index].slug}"`), `${card}: não é ${coupons[index].brand}`);
    const middle = elementAt(item, item.indexOf('<', 1));
    const middleClasses = classesOf(middle);
    const decor = couponCardDecorAt(index);
    assert.ok(middleClasses.includes('group/cupom'), `${card}: sem o grupo do hover (group/cupom)`);
    assert.ok(middleClasses.includes('min-w-0'), `${card}: o meio sem min-w-0 (o cartão passaria da coluna)`);
    for (const name of ['motion-safe:transition-[translate,rotate]', 'motion-safe:hover:-translate-y-1', 'motion-safe:hover:rotate-0']) {
      assert.ok(middleClasses.includes(name), `${card}: o meio sem ${name} (o hover só com o movimento liberado)`);
    }
    assert.ok(
      !middleClasses.some((name) => name.startsWith('hover:')),
      `${card}: hover sem motion-safe: no meio (mexeria com "reduzir movimento")`
    );
    assert.deepEqual(
      middleClasses.filter((name) => /^-?rotate-/.test(name)),
      decor.tilt.split(' ').filter(Boolean),
      `${card}: a inclinação não é a do couponCardDecorAt`
    );
    const magnets = magnetsIn(middle);
    assert.equal(magnets.length, decor.magnet ? 1 : 0, `${card}: ${magnets.length} ímãs; o couponCardDecorAt pede ${decor.magnet ? 1 : 0}`);
    if (decor.magnet) {
      const magnetClasses = classesOf(magnets[0]);
      for (const name of decor.magnet.split(' ')) assert.ok(magnetClasses.includes(name), `${card}: o ímã sem ${name}`);
      assert.ok(!magnetClasses.includes('-left-3'), `${card}: ímã à esquerda, sobre o número do desconto`);
      assert.ok(!magnetClasses.includes('bg-amarelo-cupom'), `${card}: ímã amarelo, que some na faixa amarela do preço`);
      assert.ok(magnetClasses.includes('pointer-events-none'), `${card}: o ímã sem pointer-events-none`);
      assert.match(magnets[0], /^<span[^>]*\saria-hidden="true"/, `${card}: o ímã sem aria-hidden`);
    }
    const article = elementAt(middle, middle.indexOf('<article'));
    assert.ok(
      classesOf(article).includes('motion-safe:group-hover/cupom:shadow-[4px_4px_0_var(--color-marinho)]'),
      `${card}: o cartão sem a sombra do hover`
    );
  });
}

// Na fila dos "Outros cupons", o item de fora é o item flex da fila que rola para o lado no celular: ele leva
// a largura, o não encolher e o snap.
function assertOthersRow(where: string, section: string) {
  for (const item of elementsWithClass(section, 'revela')) {
    for (const name of ['w-[200px]', 'shrink-0', 'snap-start', 'md:w-auto']) {
      assert.ok(classesOf(item).includes(name), `${where}: o item sem ${name} (a fila do celular)`);
    }
  }
}

// O ímã dos cupons, à direita e sem o amarelo, é uma variante: a home, a home de cada idioma e as Novidades
// de /reviews seguem com a tabela de antes, com o ímã à esquerda na posição 2.
assert.deepEqual([0, 1, 2, 3, 4, 5].map((index) => cardDecorAt(index)), [
  { magnet: '-top-3 -right-3 bg-amarelo-cupom', tilt: '-rotate-1' },
  { magnet: null, tilt: '' },
  { magnet: '-top-3 -left-3 bg-laranja', tilt: 'rotate-[0.5deg]' },
  { magnet: null, tilt: '' },
  { magnet: '-top-3 -right-3 bg-marinho', tilt: 'rotate-[-0.6deg]' },
  { magnet: '-top-3 -right-3 bg-amarelo-cupom', tilt: '-rotate-1' },
]);
assert.deepEqual([0, 1, 2, 3, 4, 5].map((index) => couponCardDecorAt(index)), [
  { magnet: '-top-3 -right-3 bg-marinho', tilt: '-rotate-1' },
  { magnet: null, tilt: '' },
  { magnet: '-top-3 -right-3 bg-laranja', tilt: 'rotate-[0.5deg]' },
  { magnet: null, tilt: '' },
  { magnet: '-top-3 -right-3 bg-marinho', tilt: 'rotate-[-0.6deg]' },
  { magnet: '-top-3 -right-3 bg-marinho', tilt: '-rotate-1' },
]);

for (const category of hubSections.categories) {
  const section = between(couponsHubBody, `aria-labelledby="prateleira-${category.id}"`, ['aria-labelledby="prateleira-', 'aria-labelledby="perguntas"']);
  assertCouponShelf(`/cupons, ${category.label}`, section, category.coupons);
}
const featuredShelf = between(couponsHubBody, 'aria-labelledby="destaques"', ['aria-labelledby="prateleira-']);
assert.equal(elementsWithClass(featuredShelf, 'revela').length, 0, '/cupons: os Destaques com a cascata');
assert.equal(magnetsIn(featuredShelf).length, 0, '/cupons: os Destaques com ímã');
assert.ok(!couponsHubBody.includes('data-reveal'), '/cupons: data-reveal no HTML');

// O HTML do servidor não distingue o RevealSection de uma <section> comum, e o RevealSection está no
// manifest de cliente de toda página, pelo layout: a trava das prateleiras olha o código.
const REVEAL_IMPORT = "import { RevealSection } from '@/components/ui/RevealSection';";
function assertRevealShelves(where: string, source: string, shelf: RegExp) {
  assert.ok(source.includes(REVEAL_IMPORT), `${where}: sem o import do RevealSection`);
  assert.match(source, shelf, `${where}: a prateleira não é um RevealSection`);
}
const REVEAL_SHELVES: [string, RegExp][] = [
  ['src/app/(pt)/cupons/page.tsx', /<RevealSection\b[^>]*\saria-labelledby=\{`prateleira-/],
  ['src/components/coupons/CouponStorePage.tsx', /<RevealSection\b[^>]*\saria-labelledby="outros-cupons"/],
];
for (const [file, shelf] of REVEAL_SHELVES) {
  const source = read(path.resolve(file));
  assertRevealShelves(file, source, shelf);
  assert.throws(() => assertRevealShelves(file, source.replaceAll('<RevealSection', '<section'), shelf), /não é um RevealSection/);
}

// Controles numa prateleira do hub: a posição trocada, o item sem a cascata, o ímã à esquerda (sem a direita,
// ou com as duas), o ímã amarelo, o cartão sem a sombra do hover, o meio sem o min-w-0, o hover sem
// motion-safe: e o ímã sem pointer-events-none derrubam a trava.
{
  const [category] = hubSections.categories;
  const section = between(couponsHubBody, `aria-labelledby="prateleira-${category.id}"`, ['aria-labelledby="prateleira-', 'aria-labelledby="perguntas"']);
  const mutations: [string, RegExp][] = [
    [section.replace('style="--i:0"', 'style="--i:1"'), /sem --i:0/],
    [section.replace('class="revela ', 'class="'), /cartões com a cascata/],
    [section.replace('-top-3 -right-3', '-top-3 -left-3'), /o ímã sem -right-3/],
    [section.replace('-top-3 -right-3', '-top-3 -right-3 -left-3'), /ímã à esquerda/],
    [section.replace('-top-3 -right-3 bg-marinho', '-top-3 -right-3 bg-marinho bg-amarelo-cupom'), /ímã amarelo/],
    [section.replace('motion-safe:group-hover/cupom:shadow-[4px_4px_0_var(--color-marinho)]', ''), /sem a sombra do hover/],
    [section.replace('group/cupom relative flex min-w-0 flex-1', 'group/cupom relative flex flex-1'), /o meio sem min-w-0/],
    [section.replace('motion-safe:hover:-translate-y-1', 'hover:-translate-y-1'), /o meio sem motion-safe:hover:-translate-y-1/],
    [section.replace('pointer-events-none absolute z-10 size-10', 'absolute z-10 size-10'), /o ímã sem pointer-events-none/],
  ];
  for (const [mutated, message] of mutations) {
    assert.notEqual(mutated, section, `controle: a mutação não achou o trecho (${message})`);
    assert.throws(() => assertCouponShelf('/cupons', mutated, category.coupons), message);
  }
}

let couponMotionPages = 0;
let storeCutouts = 0;
let referralPages = 0;
let othersRows = 0;
let othersSample = '';
assert.ok(couponStorePages.length > 0, 'páginas de loja: nenhuma loja de couponsData para conferir');
for (const { pagePath, store } of couponStorePages) {
  assert.ok(store, `${pagePath}: sem a loja em couponsData`);
  const body = builtBody(pagePath);
  // Os "Outros cupons" só existem em português (CouponStorePage).
  const others = pagePath.startsWith('/cupons/') ? getOtherActiveCoupons(store.slug) : [];
  const copyable = hasCopyCode(store);
  const expected = {
    total: Number(copyable) + Number(Boolean(store.referral)) + others.filter(hasCopyCode).length,
    withScissors: Number(copyable),
  };
  assertStoreCutout(pagePath, body, copyable);
  assertStoreArrival(pagePath, body);
  assertCopyCutouts(pagePath, body, expected);
  if (store.referral) {
    const referral = between(body, 'aria-labelledby="indicacao"', ['</section>']);
    assert.equal(elementsWithClass(referral, 'recorte').length, 1, `${pagePath}: a caixa do código de indicação sem o .recorte`);
    referralPages++;
  }
  if (others.length > 0) {
    const othersSection = between(body, 'aria-labelledby="outros-cupons"', ['</section>']);
    assert.equal(
      elementsWithClass(othersSection, 'recorte').length,
      others.filter(hasCopyCode).length,
      `${pagePath}: as caixas de código dos "Outros cupons" sem o .recorte`
    );
    assertCouponShelf(`${pagePath}, Outros cupons`, othersSection, others);
    assertOthersRow(`${pagePath}, Outros cupons`, othersSection);
    othersSample ||= othersSection;
    othersRows++;
  }
  assert.ok(!body.includes('data-reveal'), `${pagePath}: data-reveal no HTML`);
  storeCutouts += expected.total;
  couponMotionPages++;
}

let yesStyleWithoutPromos = false;
assert.ok(yesStyleHubs.length > 0, 'páginas de loja: nenhuma página da YesStyle para conferir');
for (const { locale, hubPath } of yesStyleHubs) {
  const resolved = resolveYesStylePage(locale);
  assert.ok(resolved, `${hubPath}: sem os dados da YesStyle`);
  const body = builtBody(hubPath);
  const promos = resolved.activePromoOffers.length;
  assertStoreCutout(hubPath, body, true);
  assertStoreArrival(hubPath, body);
  assertCopyCutouts(hubPath, body, { total: 1 + promos, withScissors: 1 });
  const list = between(body, 'aria-labelledby="cupons-da-loja"', ['</section>']);
  assert.equal(elementsWithClass(list, 'recorte').length, promos, `${hubPath}: os cupons da lista sem o .recorte`);
  yesStyleWithoutPromos ||= promos === 0;
  storeCutouts += 1 + promos;
  couponMotionPages++;
}
assert.ok(storeCutouts > 0, 'páginas de loja: nenhum recorte com código nos dados');
assert.ok(referralPages > 0, 'páginas de loja: nenhuma caixa de código de indicação conferida');
assert.ok(othersRows > 0, 'páginas de loja: nenhuma fila de "Outros cupons" conferida');
// Controles na fila dos "Outros cupons": o item que perde a largura ou o não encolher derruba a trava.
const othersRowMutations: [string, RegExp][] = [
  [othersSample.replace('revela flex w-[200px] ', 'revela flex '), /o item sem w-\[200px\]/],
  [othersSample.replace('revela flex w-[200px] shrink-0 ', 'revela flex w-[200px] '), /o item sem shrink-0/],
];
for (const [mutated, message] of othersRowMutations) {
  assert.notEqual(mutated, othersSample, `controle: a mutação não achou o trecho (${message})`);
  assert.throws(() => assertOthersRow('Outros cupons', mutated), message);
}
if (yesStyleWithoutPromos) {
  console.log('ℹ️ YesStyle sem cupons da loja ativos: a trava dos cupons da lista não teve o que conferir.');
}
// Controles: derrubam a trava o recorte do topo que perde o .recorte numa loja com código ou o ganha numa
// loja sem código, a tesoura que perde a classe, a que corre numa loja sem código e a que ganha o fundo de
// papel do hub.
{
  const sample = (copyable: boolean) => {
    const page = couponStorePages.find(({ store }) => store && hasCopyCode(store) === copyable);
    assert.ok(page, `controle: sem página de loja ${copyable ? 'com' : 'sem'} código; troque o controle`);
    return { pagePath: page.pagePath, body: builtBody(page.pagePath) };
  };
  const withCode = sample(true);
  const withoutCode = sample(false);
  const mutations: [string, string, boolean, RegExp][] = [
    [withCode.pagePath, withCode.body.replace(/(<section id="cupom"[^>]*\sclass="[^"]*?) recorte(?=[ "])/, '$1'), true, /sem o \.recorte/],
    [withCode.pagePath, withCode.body.replace(/ recorte-tesoura(?=[ "])/, ''), true, /tesoura do recorte do topo parada/],
    [withoutCode.pagePath, withoutCode.body.replace(/(<section id="cupom"[^>]*\sclass=")/, '$1recorte '), false, /com o \.recorte/],
    [withCode.pagePath, withCode.body.replace(/(<section id="cupom"[\s\S]*? recorte-tesoura)(?=[ "])/, '$1 recorte-tesoura-papel'), true, /com o fundo de papel/],
    [withoutCode.pagePath, withoutCode.body.replace(/(<section id="cupom"[\s\S]*?bg-amarelo-cupom)(?=[ "])/, '$1 recorte-tesoura'), false, /corre sem botão de copiar/],
  ];
  for (const [pagePath, mutated, copyable, message] of mutations) {
    const original = copyable ? withCode.body : withoutCode.body;
    assert.notEqual(mutated, original, `controle: a mutação não achou o trecho (${message})`);
    assert.throws(() => assertStoreCutout(pagePath, mutated, copyable), message);
  }
  // A chegada: derrubam a trava a etiqueta que some, a que perde o block, a que sai do h1 e o recorte do
  // topo sem o .recorte-entra; no hub, o atraso ou a escala trocados e a etiqueta que sai dos Destaques.
  const arrivalMutations: [string, RegExp][] = [
    [withCode.body.replace('etiqueta-entra ', ''), /0 números com a etiqueta/],
    [withCode.body.replace('etiqueta-entra block', 'etiqueta-entra'), /a etiqueta sem o block/],
    [
      withCode.body.replace('etiqueta-entra block', 'block').replace(/(<section id="cupom"[^>]*\sclass=")/, '$1etiqueta-entra block '),
      /a etiqueta fora do h1/,
    ],
    [withCode.body.replace(' recorte-entra', ''), /sem o \.recorte-entra/],
  ];
  for (const [mutated, message] of arrivalMutations) {
    assert.notEqual(mutated, withCode.body, `controle: a mutação não achou o trecho (${message})`);
    assert.throws(() => assertStoreArrival(withCode.pagePath, mutated), message);
  }
  const stampMutations: [string, RegExp][] = [
    [couponsHubBody.replace('--etiqueta-atraso:150ms', '--etiqueta-atraso:450ms'), /atraso da etiqueta do Destaque 1/],
    [couponsHubBody.replace('--etiqueta-escala:1.05', '--etiqueta-escala:1.12'), /escala e o atraso da etiqueta do Destaque 1/],
    [couponsHubBody.replace('--etiqueta-rotacao:-3deg;', ''), /escala e o atraso da etiqueta do Destaque 1/],
    [couponsHubBody.replace(/(class="[^"]*\srecorte)(\s)/, '$1 recorte-entra$2'), /recorte com \.recorte-entra no hub/],
    [
      couponsHubBody
        .replace('etiqueta-entra relative z-10', 'relative z-10')
        .replace(/(aria-labelledby="prateleira-[^"]*"[^>]*>)/, '$1<span class="etiqueta-entra"></span>'),
      /etiqueta fora dos Destaques/,
    ],
  ];
  for (const [mutated, message] of stampMutations) {
    assert.notEqual(mutated, couponsHubBody, `controle: a mutação não achou o trecho (${message})`);
    assert.throws(() => assertHubStamps(mutated, hubSections.featured.length), message);
  }
}

// /categorias ficou sem link no site, saiu do sitemap e do Google, mas segue no ar (decisão do Bruno, 08/10).
assert.ok(!sitemapUrls.includes(`${SITE_URL}/categorias`), 'sitemap.xml com /categorias');
const categoriasFile = builtFile(`${SITE_URL}/categorias`);
assert.ok(categoriasFile, '/categorias: página não gerada no build');
assert.ok(headOf(read(categoriasFile)).includes('<meta name="robots" content="noindex, follow"/>'), '/categorias: sem robots noindex, follow no <head>');

// A home (D2) como o build a gerou, contra os mesmos dados que a montam: a vitrine, o "Acabou de
// sair", a data comercial e as seções de baixo. As ofertas (no card do Dicas & Ofertas) e os vídeos
// dependem do feed e da API do YouTube na hora do build: só são conferidos quando aparecem.
type HomeExpectations = {
  tabs: ReturnType<typeof getHomeStoreTabs>;
  latest: ReturnType<typeof getHomeLatest>;
  hasEvent: boolean;
  recipeCount: number;
};

const LATEST_SECTION = 'aria-labelledby="titulo-acabou-de-sair"';
const LOWER_SECTIONS = ['titulo-receitas', 'titulo-explore-a-casa', 'titulo-ultimos-videos'];
const WHATSAPP_LINK = /<a [^>]*href="https:\/\/chat\.whatsapp\.com\/[^"]+"[^>]*>/;
const hrefOf = (url: string) => `href="${url.replace(/&/g, '&amp;')}"`;
const COPY_LABELS = getCouponCopyLabels('pt');

// O trecho do HTML de `start` até o primeiro dos `ends` que vem depois dele (ou até o fim).
function between(html: string, start: string, ends: string[]) {
  const from = html.indexOf(start);
  if (from < 0) return '';
  const to = Math.min(...ends.map((end) => html.indexOf(end, from + start.length)).filter((index) => index >= 0));
  return html.slice(from, Number.isFinite(to) ? to : undefined);
}

// Um painel da vitrine (`cecilia` ou `loja-<slug>`): vai até o próximo painel ou até o "Acabou de sair".
const panelIn = (html: string, id: string) => between(html, `id="painel-${id}"`, ['id="painel-loja-', LATEST_SECTION]);
// Os nós de texto, um por trecho entre tags: igualdade com um nó confere código, oferta e dica sem pegar
// o título de um artigo que os cite (CECI em CECILIA, 5% OFF em 15% OFF).
const textNodes = (html: string) => html.split(/<[^>]+>/).map((text) => decodeHtml(text).trim());

function homeProblems(body: string, expected: HomeExpectations): string[] {
  const problems: string[] = [];
  const check = (ok: boolean, message: string) => {
    if (!ok) problems.push(message);
  };

  // Painel da Cecília: "Mais sobre mim", o grupo de WhatsApp em outra aba e os números, nessa ordem.
  const cecilia = panelIn(body, 'cecilia');
  const whatsapp = cecilia.match(WHATSAPP_LINK);
  const whatsappTag = whatsapp?.[0] ?? '';
  const whatsappAt = whatsapp?.index ?? -1;
  const about = cecilia.indexOf('>Mais sobre mim<');
  check(
    whatsappTag.includes('target="_blank"') && whatsappTag.includes('rel="noopener noreferrer"'),
    'painel da Cecília: o grupo de WhatsApp não abre em outra aba'
  );
  check(
    about >= 0 && whatsappAt > about && cecilia.indexOf('<dl', whatsappAt) > whatsappAt,
    'painel da Cecília: o grupo de WhatsApp fora do lugar (depois de "Mais sobre mim", antes dos números)'
  );
  // O pulso do grupo de WhatsApp acontece uma vez (WCAG 2.2.2), e só com o movimento liberado.
  check(/\bmotion-safe:animate-\[pulse-subtle_[^\]\s]*_1\]/.test(whatsappTag), 'painel da Cecília: o pulso do WhatsApp sem parar depois de uma vez');

  // As bolinhas da faixa (a da Cecília e uma por loja) estão sempre na primeira tela: carregam já, sem competir
  // com a imagem do story, que é a de fetchpriority alto. Menos de 2 imagens é a faixa que o extrator não achou.
  const stripImages = between(body, 'role="tablist"', ['</div>']).match(/<img\b[^>]*>/g) ?? [];
  check(stripImages.length >= 2, `faixa das bolinhas: ${stripImages.length} imagens, esperava a da Cecília e a das lojas`);
  check(stripImages.every((image) => /\sloading="eager"/.test(image)), 'faixa das bolinhas: imagem sem loading="eager"');
  check(stripImages.every((image) => !/\sfetchpriority=/i.test(image)), 'faixa das bolinhas: imagem com fetchpriority, que é do story');

  // Um painel por loja ativa, inteiro: título, código com a dica e o rótulo exato do botão de copiar,
  // oferta, os dois links e a lista de artigos (ou o aviso de loja sem artigo).
  for (const tab of expected.tabs) {
    const panel = panelIn(body, `loja-${tab.slug}`);
    const nodes = textNodes(panel);
    const title = panel.match(new RegExp(`<h2 id="titulo-loja-${tab.slug}"[^>]*>([^<]*)</h2>`))?.[1];
    check(title !== undefined && decodeHtml(title) === tab.label, `painel ${tab.slug}: título diferente de "${tab.label}"`);
    check(panel.includes(hrefOf(tab.storePageUrl)), `painel ${tab.slug}: sem o link de ${tab.storePageUrl}`);
    if (tab.code) {
      check(nodes.includes(tab.code), `painel ${tab.slug}: sem o código`);
      check(nodes.includes(tab.hints.copy), `painel ${tab.slug}: sem a dica de copiar`);
      const copyLabel = COPY_LABELS.copyCoupon(tab.code);
      check(panel.includes(`aria-label="${escapeHtml(copyLabel)}"`), `painel ${tab.slug}: botão de copiar sem o rótulo "${copyLabel}"`);
    }
    check(nodes.includes(tab.discount), `painel ${tab.slug}: sem a oferta "${tab.discount}"`);
    check(panel.includes(hrefOf(tab.storeUrl)), `painel ${tab.slug}: sem o link da loja`);
    // Os artigos do painel são exatamente os da expectativa (o "Ver os N artigos" fica de fora: /reviews/loja/...).
    const articleLinks = [...new Set(panel.match(/href="\/reviews\/[^"/]+"/g) ?? [])].sort();
    const expectedLinks = tab.articles.map((article) => hrefOf(article.href)).sort();
    check(articleLinks.join(' ') === expectedLinks.join(' '), `painel ${tab.slug}: artigos diferentes dos ${expectedLinks.length} esperados`);
    if (tab.articles.length === 0) {
      check(nodes.includes(tab.emptyText), `painel ${tab.slug}: loja sem artigo e sem o aviso`);
    }
    if (tab.allArticles) {
      check(panel.includes(hrefOf(tab.allArticles.href)), `painel ${tab.slug}: sem o link ${tab.allArticles.href}`);
      check(nodes.includes(tab.allArticles.label), `painel ${tab.slug}: sem "${tab.allArticles.label}"`);
    } else {
      check(!panel.includes('href="/reviews/loja/'), `painel ${tab.slug}: link para os artigos de uma loja que não tem a subpágina`);
    }
  }
  check(
    (body.match(/id="painel-loja-/g) ?? []).length === expected.tabs.length,
    'vitrine: número de painéis de loja diferente do de lojas ativas'
  );
  // Os textos que o negócio exige de três lojas só valem enquanto a loja estiver ativa: pausá-la em
  // couponsData.ts é mudança de conteúdo e tira a aba e o painel dela.
  const isActive = (slug: string) => expected.tabs.some((tab) => tab.slug === slug);
  if (isActive('yesstyle')) {
    const yesStyle = textOf(panelIn(body, 'loja-yesstyle'));
    check(yesStyle.includes('Código de recompensa') && !yesStyle.includes('Cupom YesStyle'), 'painel da YesStyle: o CECILIA010 sem o rótulo de recompensa');
  }
  if (isActive('shein')) {
    const shein = textOf(panelIn(body, 'loja-shein'));
    check(shein.includes('Código de indicação') && !shein.includes('Cupom SHEIN'), 'painel da SHEIN: o 4CW5Y sem o rótulo de indicação');
  }
  if (isActive('nestle-nutre')) {
    check(textOf(panelIn(body, 'loja-nestle-nutre')).includes('fórmulas infantis de 0 a 12 meses'), 'painel da Nestlé Nutre: sem a exclusão das fórmulas infantis');
  }

  // "Acabou de sair": os 5 mais novos e o link para /reviews, sem código e sem botão de copiar.
  const latest = between(body, LATEST_SECTION, ['aria-labelledby="titulo-data-comercial"', ...LOWER_SECTIONS.map((id) => `aria-labelledby="${id}"`)]);
  check(latest !== '', 'sem o "Acabou de sair"');
  for (const article of expected.latest) {
    check(latest.includes(hrefOf(article.href)), `Acabou de sair: sem ${article.href}`);
  }
  // Cada artigo tem um link em cada um dos dois desenhos, a lista do celular e depois a grade da tela
  // larga, os dois na ordem dos dados: os links são a lista esperada duas vezes.
  const latestLinks = latest.match(/href="\/reviews\/[^"]+"/g) ?? [];
  const latestHrefs = expected.latest.map((article) => hrefOf(article.href));
  check(
    latestLinks.join(' ') === [...latestHrefs, ...latestHrefs].join(' '),
    `Acabou de sair: artigos ou ordem diferentes dos ${expected.latest.length} mais novos, no celular ou na tela larga`
  );
  check(latest.includes('href="/reviews"'), 'Acabou de sair: sem o link para /reviews');
  check(!/<button\b|font-codigo/.test(latest), 'Acabou de sair: com código ou botão de copiar');

  // Data comercial: a faixa só existe com uma data em campanha.
  check(
    body.includes('aria-labelledby="titulo-data-comercial"') === expected.hasEvent,
    expected.hasEvent ? 'sem a faixa da data em campanha' : 'faixa de data comercial sem campanha'
  );

  // Seções de baixo, na ordem, depois do "Acabou de sair".
  const at = (id: string) => body.indexOf(`aria-labelledby="${id}"`);
  const positions = LOWER_SECTIONS.map(at).filter((index) => index >= 0);
  check(at('titulo-receitas') > body.indexOf(LATEST_SECTION) && at('titulo-explore-a-casa') >= 0, 'sem a faixa de receitas ou o Explore a casa');
  check(positions.every((index, order) => order === 0 || index > positions[order - 1]), 'seções de baixo fora de ordem');
  // A última seção de baixo acaba no rodapé, que também linka a DAMIE e o Dicas & Ofertas.
  const sectionOf = (id: string) =>
    between(body, `aria-labelledby="${id}"`, [
      ...LOWER_SECTIONS.filter((other) => other !== id).map((other) => `aria-labelledby="${other}"`),
      '<footer',
    ]);

  const recipesSection = sectionOf('titulo-receitas');
  check(textOf(recipesSection).includes(`${expected.recipeCount} receitas prontas para fazer`), 'Receitas: sem o total de receitas');
  check((recipesSection.match(/href="\/receitas\/[^"]+"/g) ?? []).length === 4, 'Receitas: sem 4 links de receita');
  check(!/href="\/receitas\?categoria=|href="\/categorias"/.test(body), 'home com atalho de categoria de receita');

  const explore = sectionOf('titulo-explore-a-casa');
  check(explore.includes(hrefOf(brandLinks.damie)) && explore.includes(hrefOf(brandLinks.dicas)), 'Explore a casa: sem o link da DAMIE ou do Dicas & Ofertas');
  // Com ofertas, o carrossel fica dentro do card do Dicas & Ofertas, com o "Ver todas as ofertas".
  if (explore.includes('aria-label="Ver próximas ofertas"')) {
    check(explore.includes('>Ver todas as ofertas</a>'), 'Explore a casa: ofertas sem o "Ver todas as ofertas"');
  }
  // O e-book saiu. O carrossel fica de fora da busca: os títulos das ofertas vêm do feed.
  check(!/E-book Air Fryer|Avise-me/.test(explore.replace(/<ul class="hide-scrollbar[\s\S]*?<\/ul>/, '')), 'Explore a casa: com o e-book');

  // O marca-texto em cada título das seções de baixo (e no "Acabou de sair"), e nada escondido pela
  // rolagem no HTML do servidor.
  for (const id of ['titulo-acabou-de-sair', ...LOWER_SECTIONS]) {
    if (at(id) < 0 && id === 'titulo-ultimos-videos') continue;
    check(new RegExp(`<h2 id="${id}"[^>]*><span class="marca-texto[ "]`).test(body), `${id}: título sem o marca-texto`);
  }
  check(!body.includes('data-reveal'), 'home com seção escondida no HTML do servidor (data-reveal)');

  // Os cards que a rolagem revela: as duas listas do "Acabou de sair" (celular e tela larga) e a faixa da data.
  const REVEAL_CARD = /<li class="[^"]*\brevela\b[^"]*" style="--i:\d+"/g;
  check((latest.match(REVEAL_CARD) ?? []).length === expected.latest.length * 2, 'Acabou de sair: cards sem a entrada da rolagem (revela)');
  if (expected.hasEvent) {
    const event = between(body, 'aria-labelledby="titulo-data-comercial"', LOWER_SECTIONS.map((id) => `aria-labelledby="${id}"`));
    check((event.match(REVEAL_CARD) ?? []).length > 0, 'faixa da data: cards sem a entrada da rolagem (revela)');
  }

  return problems;
}

const homeFile = builtFile(`${SITE_URL}/`);
assert.ok(homeFile, '/: página não gerada no build');
const homeBody = bodyOf(read(homeFile));
const homeExpected: HomeExpectations = {
  tabs: getHomeStoreTabs(publishedReviews),
  latest: getHomeLatest(publishedReviews),
  // A faixa da data vale pela hora em que a página foi gerada, não pela de agora.
  hasEvent: resolveActiveHomeEvent(homeEventsConfig, publishedReviews, fs.statSync(homeFile).mtime) !== null,
  recipeCount: recipes.length,
};
// Com a DAMIE ativa, a aba dela leva à página de cupom, não ao subdomínio (Bruno, 08/10).
const damieTab = homeExpected.tabs.find(({ slug }) => slug === 'damie');
if (damieTab) assert.equal(damieTab.storePageUrl, '/cupons/damie', 'a aba da DAMIE leva a /cupons/damie');
assert.deepEqual(homeProblems(homeBody, homeExpected), [], '/: home');

type HomeTab = HomeExpectations['tabs'][number];

// Troca só o painel de uma loja: o "Acabou de sair" repete os links de artigo e a mutação não pode pegá-lo.
const inPanel = (tab: HomeTab, change: (panel: string) => string) => {
  const panel = panelIn(homeBody, `loja-${tab.slug}`);
  return homeBody.replace(panel, () => change(panel));
};
// A loja de cada mutação de HTML, pelos dados de hoje. Estas existem enquanto a vitrine tiver lojas com código
// e com artigo; o que um artigo novo pode desfazer (loja sem artigo, "Ver os N artigos") é provado pela expectativa.
const storeWhere = (what: string, find: (tab: HomeTab) => boolean) => {
  const tab = homeExpected.tabs.find(find);
  assert.ok(tab, `autoteste da home: sem loja ${what} para a mutação`);
  return tab;
};
const [firstTab] = homeExpected.tabs;
const codeTab = storeWhere('com código', (tab) => !!tab.code);
const articleTab = storeWhere('com artigo', (tab) => tab.articles.length > 0);
// As mutações dos textos que o guarda exige de uma loja pelo nome: só existem com a loja ativa, como a trava.
const forStore = (slug: string, mutations: string[]) =>
  homeExpected.tabs.some((tab) => tab.slug === slug) ? mutations : [];

// Os links de artigo do "Acabou de sair" na ordem do HTML: primeiro a lista do celular, depois a grade.
const latestStart = homeBody.indexOf(LATEST_SECTION);
const latestMutationLinks = [...homeBody.matchAll(/href="\/reviews\/[^"]+"/g)].filter((link) => link.index > latestStart);
const latestCount = homeExpected.latest.length;
const replaceLink = (link: RegExpMatchArray, text: string) =>
  homeBody.slice(0, link.index) + text + homeBody.slice(link.index + link[0].length);
const swapLinks = (first: RegExpMatchArray, second: RegExpMatchArray) =>
  homeBody.slice(0, first.index) + second[0] + homeBody.slice(first.index + first[0].length, second.index) + first[0] + homeBody.slice(second.index + second[0].length);
const doubleLink = (link: RegExpMatchArray) => replaceLink(link, `${link[0]}></a><a ${link[0]}`);
const openPanel = (tab: HomeTab) => `id="painel-loja-${tab.slug}"`;

// A faixa das bolinhas: do role="tablist" até o primeiro </div>, que a fecha (as bolinhas são só <button> e <span>).
const stripAt = homeBody.indexOf('role="tablist"');
const stripEnd = homeBody.indexOf('</div>', stripAt);
const inStrip = (change: (strip: string) => string) => homeBody.slice(0, stripAt) + change(homeBody.slice(stripAt, stripEnd)) + homeBody.slice(stripEnd);

// O guarda acima recusa a home errada: cada mutação abaixo precisa achar o trecho e dar problema.
const brokenHomes = [
  // A primeira e a última imagem da faixa em lazy, com fetchpriority, e a faixa que o extrator não acha.
  inStrip((strip) => strip.replace('loading="eager"', 'loading="lazy"')),
  inStrip((strip) => strip.slice(0, strip.lastIndexOf('loading="eager"')) + 'loading="lazy"' + strip.slice(strip.lastIndexOf('loading="eager"') + 'loading="eager"'.length)),
  inStrip((strip) => strip.replace('<img ', '<img fetchpriority="high" ')),
  homeBody.replace('role="tablist"', 'role="outra"'),
  ...forStore('yesstyle', [homeBody.replace('>Código de recompensa YesStyle<', '>Cupom YesStyle<')]),
  homeBody.replace(WHATSAPP_LINK, (tag) => tag.replace(' target="_blank"', '').replace(' rel="noopener noreferrer"', '')),
  homeBody.split(hrefOf(homeExpected.latest[0].href)).join('href="/outra"'),
  homeBody.replace(LATEST_SECTION, `${LATEST_SECTION}><button>Copiar</button`),
  homeBody.replace('aria-labelledby="titulo-receitas"', 'aria-labelledby="titulo-outra"'),
  // O menu também linka a DAMIE: troca todos, senão a mutação pegaria só o do menu.
  homeBody.split(hrefOf(brandLinks.damie)).join('href="/outra"'),
  ...forStore('shein', [homeBody.split('Código de indicação').join('Cupom')]),
  ...forStore('nestle-nutre', [homeBody.split('fórmulas infantis de 0 a 12 meses').join('fórmulas infantis')]),
  // Sem vídeos (a API fora do ar no build), o Explore a casa acaba no rodapé, que também linka o
  // Dicas & Ofertas: o link que some do Explore precisa dar problema.
  (() => {
    const exploreAt = homeBody.indexOf('aria-labelledby="titulo-explore-a-casa"');
    const endAt = [homeBody.indexOf('aria-labelledby="titulo-ultimos-videos"'), homeBody.indexOf('<footer')]
      .filter((index) => index > exploreAt)
      .reduce((first, index) => Math.min(first, index));
    const explore = homeBody.slice(exploreAt, endAt).split(hrefOf(brandLinks.dicas)).join('href="/outra"');
    return homeBody.slice(0, exploreAt) + explore + homeBody.slice(endAt);
  })(),
  homeBody.replace(/<h2 id="titulo-receitas"([^>]*)><span class="marca-texto[^"]*">/, '<h2 id="titulo-receitas"$1><span>'),
  homeBody.replace('aria-labelledby="titulo-explore-a-casa"', 'data-reveal="pending" aria-labelledby="titulo-explore-a-casa"'),
  // O primeiro card com `revela` da home é o primeiro da lista do celular do "Acabou de sair".
  homeBody.replace('<li class="revela ', '<li class="'),
  homeBody.replace(LATEST_SECTION, `id="painel-loja-inativa" ${LATEST_SECTION}`),
  homeBody.replace(LATEST_SECTION, `${LATEST_SECTION}><a href="/reviews/artigo-a-mais"></a`),
  ...forStore('shein', [homeBody.replace('id="painel-loja-shein"', 'id="painel-loja-shein"><span>Cupom SHEIN</span')]),
  // Fora de ordem, sem um artigo ou com um artigo repetido em só um dos desenhos: a lista do celular e a grade.
  swapLinks(latestMutationLinks[0], latestMutationLinks[1]),
  swapLinks(latestMutationLinks[latestCount], latestMutationLinks[latestCount + 1]),
  replaceLink(latestMutationLinks[2 * latestCount - 1], 'href="/outra"'),
  doubleLink(latestMutationLinks[0]),
  doubleLink(latestMutationLinks[latestCount]),
  // O painel de uma loja por inteiro, uma mutação por trava: o rótulo do botão de copiar (código nunca
  // é cupom), o código, a dica, a oferta, o link da loja e os artigos. O texto de dados é escapado como
  // o React o escreve.
  inPanel(codeTab, (panel) => panel.replace(`aria-label="${escapeHtml(COPY_LABELS.copyCoupon(codeTab.code))}"`, `aria-label="Copiar o cupom ${codeTab.code}"`)),
  inPanel(codeTab, (panel) => panel.replace(`>${escapeHtml(codeTab.code)}<`, '>OUTRO<')),
  inPanel(codeTab, (panel) => panel.replace(`>${escapeHtml(codeTab.hints.copy)}<`, '>Outra dica.<')),
  inPanel(firstTab, (panel) => panel.replace(`>${escapeHtml(firstTab.discount)}<`, '>Outra oferta<')),
  inPanel(firstTab, (panel) => panel.replace(hrefOf(firstTab.storeUrl), 'href="/outra"')),
  // O artigo aparece no story e na lista do painel: troca todas as ocorrências, senão a outra o esconderia.
  inPanel(articleTab, (panel) => panel.split(hrefOf(articleTab.articles[0].href)).join('href="/outra"')),
  inPanel(firstTab, (panel) => panel.replace(openPanel(firstTab), `${openPanel(firstTab)}><a href="/reviews/artigo-a-mais"></a`)),
];
for (const broken of brokenHomes) {
  assert.notEqual(broken, homeBody, 'a mutação do autoteste da home não achou o trecho');
  assert.ok(homeProblems(broken, homeExpected).length > 0, 'o guarda da home deixou passar uma home errada');
}

// Pausar uma loja em couponsData.ts tira a aba e o painel dela: sem a loja nos dados e no HTML, o guarda
// não pode acusar nada pelo nome dela.
for (const slug of ['yesstyle', 'shein', 'nestle-nutre']) {
  const tab = homeExpected.tabs.find((item) => item.slug === slug);
  if (!tab) continue;
  const paused = inPanel(tab, () => '');
  assert.notEqual(paused, homeBody, `a loja ${slug} pausada: o autoteste não achou o painel`);
  assert.deepEqual(
    homeProblems(paused, { ...homeExpected, tabs: homeExpected.tabs.filter((item) => item !== tab) }),
    [],
    `/: home sem a loja ${slug}`
  );
}

// O que um artigo novo pode criar ou desfazer (loja sem artigo, loja com "Ver os N artigos") não dá para
// mutar no HTML: o painel é que está certo e a expectativa é que muda, com a primeira loja, qualquer que seja.
const withFirstTab = (change: Partial<HomeTab>, html = homeBody) => ({
  html,
  expected: { ...homeExpected, tabs: [{ ...firstTab, ...change }, ...homeExpected.tabs.slice(1)] },
});
const wrongExpectations = [
  // Sem artigo, com um aviso que o painel não traz (o painel perde os links de artigo, para só o aviso faltar).
  withFirstTab(
    { articles: [], emptyText: 'Aviso que o painel não tem' },
    inPanel(firstTab, (panel) => panel.replace(/href="\/reviews\/[^"/]+"/g, 'href="/outra"'))
  ),
  // "Ver os N artigos" com o link de outra página e, em seguida, com o texto de outro.
  withFirstTab({ allArticles: { href: '/reviews/loja/x', label: firstTab.label } }),
  withFirstTab({ allArticles: { href: firstTab.storePageUrl, label: 'Ver os 9 artigos' } }),
  // Sem o "Ver os N artigos" na expectativa, com um link de subpágina no painel.
  withFirstTab(
    { allArticles: undefined },
    inPanel(firstTab, (panel) => panel.replace(openPanel(firstTab), `${openPanel(firstTab)}><a href="/reviews/loja/x"></a`))
  ),
];
for (const { html, expected } of wrongExpectations) {
  assert.ok(homeProblems(html, expected).length > 0, 'o guarda da home deixou passar uma home errada');
}

// Os slugs dos links de artigo e de subpágina de loja de um trecho do HTML, na ordem.
const articleLinksIn = (html: string) =>
  [...html.matchAll(/<a\b[^>]*\bhref="\/reviews\/([^"/?#]+)"/g)].map(([, slug]) => slug);
const storeLinksIn = (html: string) =>
  [...html.matchAll(/<a\b[^>]*\bhref="\/reviews\/loja\/([^"/?#]+)"/g)].map(([, slug]) => slug);

// A estante (ReviewsBrowser) no HTML do servidor: os 12 primeiros artigos na ordem "Mais novos", cada
// link com o anel de foco da casa, nenhum nome de transição (a foto só o ganha no clique: no HTML, o
// review-hero- fica só no data-vt-name) e a busca com rótulo só quando a página tem busca.
function assertShelfPage(
  where: string,
  body: string,
  expected: { articles: readonly { slug: string }[]; searchLabel: string | null }
) {
  const list = between(body, '<ul data-estante="grade"', ['</ul>']);
  assert.ok(list, `${where}: sem a estante`);
  assert.deepEqual(
    articleLinksIn(list),
    expected.articles.slice(0, GRID_PAGE_SIZE).map(({ slug }) => slug),
    `${where}: os ${GRID_PAGE_SIZE} primeiros artigos, do mais novo`
  );
  for (const [tag] of list.matchAll(/<a\b[^>]*\bhref="\/reviews\/[^"/]+"[^>]*>/g)) {
    assert.match(tag, /\bclass="[^"]* focus-visible:outline-marinho[ "]/, `${where}: cartão sem o anel de foco da casa: ${tag}`);
  }
  assert.ok(!body.includes('view-transition-name'), `${where}: nome de transição no HTML`);
  const heroNames = body.match(/data-vt-name="review-hero-/g)?.length ?? 0;
  assert.ok(heroNames > 0, `${where}: nenhuma foto com o nome da transição (data-vt-name)`);
  assert.equal(body.match(/review-hero-/g)?.length ?? 0, heroNames, `${where}: review-hero- fora do data-vt-name`);
  const label = body.match(/<label for="busca-estante"[^>]*>([^<]*)<\/label>/)?.[1];
  assert.equal(body.includes('role="search"'), expected.searchLabel !== null, `${where}: busca onde não devia, ou faltando`);
  assert.equal(label === undefined ? null : decodeHtml(label), expected.searchLabel, `${where}: rótulo da busca`);
}

// Os nomes dos itens do CollectionPage da página (JSON-LD), na ordem.
function assertCollectionNames(where: string, html: string, titles: readonly string[]) {
  const collection = jsonLdOf(html).find((schema) => schema['@type'] === 'CollectionPage');
  const names = collection?.mainEntity?.itemListElement?.map((item: { name: string }) => item.name);
  assert.deepEqual(names, titles, `${where}: nomes dos itens do CollectionPage`);
}

// /reviews: o h1 (um só), a estante, as Novidades (uma por artigo com o selo "Novo"), as bolinhas das
// lojas com subpágina e o JSON-LD de lista com a imagem de compartilhamento (assertListPageSeo, mais
// abaixo no arquivo, é uma declaração de função e vale aqui).
const reviewsHub = getReviewsHubContent(publishedReviews);
const reviewsFile = builtFile(`${SITE_URL}/reviews`);
assert.ok(reviewsFile, '/reviews: página não gerada no build');
const reviewsHtml = read(reviewsFile);
const reviewsBody = bodyOf(reviewsHtml);
const reviewsH1s = [...reviewsBody.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(([, h1]) => textOf(h1));
assert.equal(reviewsH1s.length, 1, `/reviews: ${reviewsH1s.length} h1`);
assert.equal(reviewsH1s[0], 'Guias & Análises', '/reviews: h1');
const reviewsShelf = { articles: reviewsHub.articles, searchLabel: 'Buscar nos guias e análises' };
assertShelfPage('/reviews', reviewsBody, reviewsShelf);
assertListPageSeo('/reviews', reviewsHtml, { items: reviewsHub.articles.length, image: reviewsHub.socialImage });
const reviewsTitles = reviewsHub.articles.map(({ title }) => title);
assertCollectionNames('/reviews', reviewsHtml, reviewsTitles);
assert.deepEqual(
  articleLinksIn(between(reviewsBody, 'id="titulo-novidades"', ['</section>'])),
  reviewsHub.newArticles.map(({ slug }) => slug),
  '/reviews: Novidades'
);
assert.deepEqual(
  storeLinksIn(between(reviewsBody, 'id="titulo-por-loja"', ['</section>'])),
  reviewsHub.stores.map(({ slug }) => slug),
  '/reviews: bolinhas das lojas'
);
assert.ok(!reviewsHtml.includes('data-reveal'), '/reviews: data-reveal no HTML');

// Os guardas acusam cada defeito: sem a lista, ordem trocada, cartão sem o anel, nome de transição no
// HTML, busca sobrando ou faltando e itens do CollectionPage em outra ordem.
{
  const withoutSearch = reviewsBody
    .replaceAll('role="search"', 'data-x="search"')
    .replace(/<label for="busca-estante"[^>]*>[^<]*<\/label>/, '');
  assert.ok(
    !withoutSearch.includes('role="search"') && !withoutSearch.includes('<label for="busca-estante"'),
    '/reviews: o controle de busca faltando não tirou a busca do HTML'
  );
  const listStart = reviewsBody.indexOf('<ul data-estante="grade"');
  const withoutRing =
    reviewsBody.slice(0, listStart) + reviewsBody.slice(listStart).replace('focus-visible:outline-marinho', '');
  assert.throws(() => assertShelfPage('/reviews', reviewsBody.replace('data-estante="grade"', 'data-x="grade"'), reviewsShelf), /sem a estante/);
  assert.throws(
    () => assertShelfPage('/reviews', reviewsBody, { ...reviewsShelf, articles: [...reviewsShelf.articles].reverse() }),
    /primeiros artigos/
  );
  assert.throws(() => assertShelfPage('/reviews', withoutRing, reviewsShelf), /anel de foco/);
  assert.throws(
    () => assertShelfPage('/reviews', reviewsBody.replace('<ul data-estante="grade"', '<p style="view-transition-name:x"></p><ul data-estante="grade"'), reviewsShelf),
    /nome de transição/
  );
  assert.throws(
    () => assertShelfPage('/reviews', reviewsBody.replace('data-vt-name="review-hero-', 'data-x="review-hero-'), reviewsShelf),
    /review-hero- fora do data-vt-name/
  );
  assert.throws(
    () => assertShelfPage('/reviews', reviewsBody.replaceAll(/ data-vt-name="review-hero-[^"]*"/g, ''), reviewsShelf),
    /nenhuma foto com o nome da transição/
  );
  assert.throws(() => assertShelfPage('/reviews', reviewsBody, { ...reviewsShelf, searchLabel: null }), /busca onde/);
  assert.throws(() => assertShelfPage('/reviews', withoutSearch, reviewsShelf), /busca onde/);
  assert.throws(
    () => assertCollectionNames('/reviews', reviewsHtml, [...reviewsTitles].reverse()),
    /nomes dos itens do CollectionPage/
  );
}

// O <head> e o JSON-LD de uma página que lista artigos (/reviews, subpágina de loja e página de data): a imagem
// de compartilhamento (assertShareImage), o idioma, um CollectionPage com um item por artigo e um
// BreadcrumbList que termina na página.
function assertListPageSeo(pagePath: string, html: string, expected: { items: number; image: SocialImage }) {
  const head = headOf(html);
  const canonical = head.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(canonical, `${pagePath}: sem canonical`);

  assertShareImage(pagePath, head, expected.image);
  assert.equal(metaOf(head, 'og:locale'), LOCALES.pt.openGraphLocale, `${pagePath}: og:locale`);

  const schemas = jsonLdOf(html);
  const collection = schemas.find((schema) => schema['@type'] === 'CollectionPage');
  assert.equal(collection?.url, canonical, `${pagePath}: url do CollectionPage`);
  assert.equal(collection?.mainEntity?.itemListElement?.length, expected.items, `${pagePath}: itens do CollectionPage`);
  const breadcrumb = schemas.find((schema) => schema['@type'] === 'BreadcrumbList');
  assert.equal(breadcrumb?.itemListElement?.at(-1)?.item, canonical, `${pagePath}: último item do BreadcrumbList`);
}

// O guarda passa no HTML certo (uma capa ou o logo do site) e falha em cada defeito, com a mensagem do
// defeito e nenhuma outra: og:image de outra imagem (sozinho ou junto com o cartão do X), inclusive o
// logo no lugar da capa e a capa no lugar do logo, cartão do X com outra imagem, alt trocado ou vazio,
// página sem nome do site ou com outro idioma, lista de outro tamanho e CollectionPage ou
// BreadcrumbList que apontam para outra página.
{
  const page = '/reviews/loja/fixture';
  const canonical = `${SITE_URL}${page}`;
  const image = { url: 'https://cdn.emcasacomcecilia.com/v1/image/fixture.webp', alt: 'Capa de teste' };
  const other = 'https://cdn.emcasacomcecilia.com/v1/image/outra.webp';
  const right = {
    ogImage: image.url,
    twitterImage: image.url,
    alt: image.alt,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    items: 2,
    collectionUrl: canonical,
    lastCrumb: canonical,
  };
  const fixture = (defect: Partial<typeof right> = {}) => {
    const { ogImage, twitterImage, alt, siteName, locale, items, collectionUrl, lastCrumb } = { ...right, ...defect };
    const itemList = Array.from({ length: items }, (_, index) => ({ '@type': 'ListItem', position: index + 1 }));
    const schemas = [
      { '@type': 'CollectionPage', url: collectionUrl, mainEntity: { '@type': 'ItemList', itemListElement: itemList } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', item: SITE_URL }, { '@type': 'ListItem', item: lastCrumb }] },
    ];
    return [
      `<head><link rel="canonical" href="${canonical}"/>`,
      `<meta property="og:site_name" content="${siteName}"/><meta property="og:locale" content="${locale}"/>`,
      `<meta property="og:image" content="${ogImage}"/><meta property="og:image:alt" content="${alt}"/>`,
      `<meta name="twitter:image" content="${twitterImage}"/></head>`,
      `<body>${schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('')}</body>`,
    ].join('');
  };
  assertListPageSeo(page, fixture(), { items: 2, image });
  // Página de data sem capa em nenhum artigo: o logo do site, com o alt dele.
  const siteLogo = { url: 'https://cdn.emcasacomcecilia.com/v1/image/logo.png', alt: SITE_NAME };
  const logoPage = fixture({ ogImage: siteLogo.url, twitterImage: siteLogo.url, alt: SITE_NAME });
  assertListPageSeo(page, logoPage, { items: 2, image: siteLogo });
  const failures: Array<[string, RegExp, string]> = [
    [fixture({ ogImage: other, twitterImage: other }), /: og:image diferente da esperada/, 'og:image e cartão do X de outra imagem passam'],
    [fixture({ ogImage: other }), /: og:image diferente da esperada/, 'og:image de outra imagem, com o cartão do X certo, passa'],
    [fixture({ twitterImage: other }), /: twitter:image diferente do og:image/, 'cartão do X de outra imagem passa'],
    [fixture({ ogImage: '/images/capa.webp', twitterImage: '/images/capa.webp' }), /: og:image diferente da esperada/, 'og:image relativo passa'],
    [logoPage, /: og:image diferente da esperada/, 'o logo no lugar da capa esperada passa'],
    [fixture({ alt: 'Outro alt' }), /: og:image:alt/, 'alt trocado passa'],
    [fixture({ alt: '' }), /: og:image:alt/, 'alt vazio passa'],
    [fixture({ siteName: '' }), /: og:site_name/, 'og:site_name vazio passa'],
    [fixture({ locale: 'en_US' }), /: og:locale/, 'og:locale de outro idioma passa'],
    [fixture({ items: 1 }), /: itens do CollectionPage/, 'lista de outro tamanho passa'],
    [fixture({ collectionUrl: `${SITE_URL}/reviews` }), /: url do CollectionPage/, 'CollectionPage de outra página passa'],
    [fixture({ lastCrumb: `${SITE_URL}/reviews` }), /: último item do BreadcrumbList/, 'BreadcrumbList de outra página passa'],
  ];
  for (const [html, message, why] of failures) {
    assert.throws(() => assertListPageSeo(page, html, { items: 2, image }), message, why);
  }
  assert.throws(
    () => assertListPageSeo(page, fixture(), { items: 2, image: siteLogo }),
    /: og:image diferente da esperada/,
    'a capa de um artigo no lugar do logo esperado passa'
  );
}

// O lastmod de uma página de lista no sitemap é a data do artigo mais novo dela: a da atualização, ou
// a da publicação.
function assertSitemapLastmod(pagePath: string, articles: readonly { updatedAt?: string; publishedAtISO?: string }[]) {
  const newestDate = articles.map((article) => article.updatedAt ?? article.publishedAtISO).filter(Boolean).sort().at(-1);
  assert.ok(newestDate, `${pagePath}: nenhum artigo com data`);
  const sitemapEntry = sitemapBody.split('<url>').find((chunk) => chunk.includes(`<loc>${SITE_URL}${pagePath}</loc>`));
  assert.equal(sitemapEntry?.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1], newestDate, `${pagePath}: lastmod no sitemap.xml`);
}

// A trilha visível de uma subpágina de loja, de /videos ou de uma página de vídeo (o <nav> com o rótulo da trilha dos artigos em português), item por
// item: o nome, o endereço e o aria-current.
const PAGE_TRAIL_LABEL = getArticleCopy('pt').breadcrumbLabel;
function pageTrailOf(body: string) {
  const nav = between(body, `<nav aria-label="${PAGE_TRAIL_LABEL}"`, ['</nav>']);
  return [...nav.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map(([, item]) => {
    const href = item.match(/<a\b[^>]*\bhref="([^"]+)"/)?.[1];
    return {
      name: textOf(item).replace(/›$/, '').trim(),
      href: href === undefined ? null : decodeHtml(href),
      current: /<span\b[^>]*\baria-current="page"/.test(item),
    };
  });
}

// Os itens da trilha com o nome e o endereço da lista da página; o último é a própria página, um
// <span aria-current="page"> sem link. O BreadcrumbList do JSON-LD tem os mesmos nomes e as mesmas URLs.
function assertPageTrail(pagePath: string, html: string, trail: readonly { name: string; path: string }[]) {
  const crumbs = pageTrailOf(bodyOf(html));
  assert.deepEqual(
    crumbs,
    trail.map(({ name, path }, index) => {
      const last = index === trail.length - 1;
      return { name, href: last ? null : path, current: last };
    }),
    `${pagePath}: trilha visível`
  );
  assert.deepEqual(
    schemaTrailOf(jsonLdOf(html).find((schema) => schema['@type'] === 'BreadcrumbList')),
    crumbs.map(({ name, href }) => ({ name, url: new URL(href ?? pagePath, SITE_URL).href })),
    `${pagePath}: trilha visível diferente do BreadcrumbList`
  );
}

// O h2 da estante na subpágina fica só para o leitor de tela (o h1 já é o título).
const STORE_SHELF_HEADING = 'Lista de artigos';
const STORE_ALL_REVIEWS_LABEL = 'Ver todos os guias e análises';

// Subpágina de cada loja com 3 artigos ou mais: o h1 (um só), o canonical, a trilha visível (nome, endereço
// e aria-current) igual ao BreadcrumbList, a estante (com o h2 só para leitor de tela, busca só acima de 12
// artigos e só as categorias da loja), o link da página da loja, Outras lojas sem a loja da página, o link
// para todos os guias, a imagem de compartilhamento, o JSON-LD e a data no sitemap.
const storeArticleSlugs = getStoreArticlePageSlugs(publishedReviews);
for (const slug of storeArticleSlugs) {
  const page = getStoreShelfContent(publishedReviews, slug);
  const storeReviews = getStoreArticlesPage(publishedReviews, slug)?.articles;
  assert.ok(page && storeReviews, `${slug}: sem dados da subpágina`);
  const pagePath = page.path;
  const file = builtFile(`${SITE_URL}${pagePath}`);
  assert.ok(file, `${pagePath}: página não gerada no build`);
  const html = read(file);
  const body = bodyOf(html);
  assert.equal(headOf(html).match(/<link rel="canonical" href="([^"]+)"/)?.[1], `${SITE_URL}${pagePath}`, `${pagePath}: canonical`);
  const h1s = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(([, h1]) => textOf(h1));
  assert.equal(h1s.length, 1, `${pagePath}: ${h1s.length} h1`);
  assert.equal(h1s[0], page.title, `${pagePath}: h1`);
  assert.ok(body.includes(hrefOf(page.storePageUrl)), `${pagePath}: sem o link de ${page.storePageUrl}`);
  assert.ok(!html.includes('data-reveal'), `${pagePath}: data-reveal no HTML`);

  assertPageTrail(pagePath, html, page.trail);

  assertShelfPage(pagePath, body, { articles: page.articles, searchLabel: page.search?.label ?? null });
  const shelfTitle = [...body.matchAll(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/g)].find(([, attributes]) => /\bid="titulo-estante"/.test(attributes));
  assert.ok(shelfTitle, `${pagePath}: sem o h2#titulo-estante`);
  assert.match(shelfTitle[1], /\bclass="(?:[^"]*\s)?sr-only(?:\s[^"]*)?"/, `${pagePath}: h2 da estante visível, sem a classe sr-only`);
  assert.equal(textOf(shelfTitle[2]), STORE_SHELF_HEADING, `${pagePath}: texto do h2 da estante`);
  assert.equal(body.includes('data-categorias="true"'), page.categories.length > 1, `${pagePath}: categorias onde não devia, ou faltando`);
  const chips = between(body, 'data-categorias="true"', ['</div>']);
  assert.deepEqual(
    [...chips.matchAll(/<button\b[^>]*aria-pressed="(?:true|false)"[^>]*>([^<]*)<\/button>/g)].map(([, label]) => decodeHtml(label)),
    page.categories.length > 1 ? ['Todos', ...page.categories.map(({ label }) => label)] : [],
    `${pagePath}: categorias da loja`
  );
  // Sem outras lojas, a seção nem é desenhada (ReviewsStoreStrip devolve null): o título tem de estar ausente.
  if (page.otherStores.length === 0) {
    assert.ok(!body.includes('id="titulo-outras-lojas"'), `${pagePath}: Outras lojas sem nenhuma outra loja`);
  } else {
    assert.deepEqual(
      storeLinksIn(between(body, 'id="titulo-outras-lojas"', ['</section>'])),
      page.otherStores.map((store) => store.slug),
      `${pagePath}: Outras lojas`
    );
  }
  const allReviewsLink = [...body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].find(
    ([, attributes, content]) => /\bhref="\/reviews"/.test(attributes) && textOf(content) === STORE_ALL_REVIEWS_LABEL
  );
  assert.ok(allReviewsLink, `${pagePath}: sem o link "${STORE_ALL_REVIEWS_LABEL}" para /reviews`);

  const store = getCouponBySlug(slug);
  assert.ok(store, `${pagePath}: sem a loja ${slug} em couponsData`);
  assertListPageSeo(pagePath, html, { items: page.articles.length, image: getStoreSocialImage(store) });
  assertCollectionNames(pagePath, html, page.articles.map(({ title }) => title));
  assertSitemapLastmod(pagePath, storeReviews);
}

// Os guardas da trilha acusam cada defeito: o último item com outro nome, o endereço de um item trocado, o
// último item sem o aria-current e um BreadcrumbList com outro nome ou outra URL.
{
  const [slug] = storeArticleSlugs;
  const page = getStoreShelfContent(publishedReviews, slug);
  const file = page && builtFile(`${SITE_URL}${page.path}`);
  assert.ok(page && file, 'sem subpágina para o controle da trilha');
  const html = read(file);
  assertPageTrail(page.path, html, page.trail);

  const navStart = html.indexOf(`<nav aria-label="${PAGE_TRAIL_LABEL}"`);
  const navEnd = html.indexOf('</nav>', navStart);
  assert.ok(navStart >= 0 && navEnd > navStart, 'sem a trilha para o controle da trilha');
  const inNav = (edit: (nav: string) => string) => html.slice(0, navStart) + edit(html.slice(navStart, navEnd)) + html.slice(navEnd);
  const inBreadcrumb = (edit: (items: Array<{ name: string; item: string }>) => void) =>
    html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (script, json) => {
      const schema = JSON.parse(json);
      if (schema['@type'] !== 'BreadcrumbList') return script;
      edit(schema.itemListElement);
      return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
    });

  const visibleDefects: Array<[string, string]> = [
    [inNav((nav) => nav.replace(`>${escapeHtml(page.title)}<`, '>Outro título<')), 'o último item com outro nome passa'],
    [inNav((nav) => nav.replace('href="/reviews"', 'href="/outra-pagina"')), 'o endereço trocado de "Guias & Análises" passa'],
    [inNav((nav) => nav.replace(' aria-current="page"', '')), 'o último item sem aria-current passa'],
  ];
  for (const [mutated, why] of visibleDefects) {
    assert.notEqual(mutated, html, `o controle da trilha não mudou nada: ${why}`);
    assert.throws(() => assertPageTrail(page.path, mutated, page.trail), /: trilha visível(?! diferente do BreadcrumbList)/, why);
  }

  const schemaDefects: Array<[string, string]> = [
    [inBreadcrumb((items) => void (items[1].name = 'Outro nome')), 'um nome trocado no BreadcrumbList passa'],
    [inBreadcrumb((items) => void (items[1].item = `${SITE_URL}/outra-pagina`)), 'uma URL trocada no BreadcrumbList passa'],
  ];
  for (const [mutated, why] of schemaDefects) {
    assert.notEqual(mutated, html, `o controle do BreadcrumbList não mudou nada: ${why}`);
    assert.throws(() => assertPageTrail(page.path, mutated, page.trail), /: trilha visível diferente do BreadcrumbList/, why);
  }
}

// Página de cada data com edição no home-events.json: o h1, o canonical, a imagem de compartilhamento,
// o JSON-LD, a data no sitemap e um card por artigo, com o "Ver o código" levando à aba da loja na
// vitrine.
const eventHubPaths = getEventHubPaths(homeEventsConfig, publishedReviews);
for (const hubPath of eventHubPaths) {
  const file = builtFile(`${SITE_URL}${hubPath}`);
  assert.ok(file, `${hubPath}: página não gerada no build`);
  // Como na home: a data vale pela hora em que a página foi gerada.
  const page = getEventHubPage(homeEventsConfig, publishedReviews, hubPath.slice(1), fs.statSync(file).mtime);
  assert.ok(page, `${hubPath}: sem edição`);
  const html = read(file);
  const body = bodyOf(html);
  assert.equal(headOf(html).match(/<link rel="canonical" href="([^"]+)"/)?.[1], `${SITE_URL}${hubPath}`, `${hubPath}: canonical`);
  assert.equal(textOf(body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? ''), page.title, `${hubPath}: h1`);
  // A capa é a que os dados escolhem (getEventHubPage, testada no test:home-events): a do artigo mais
  // novo, ou o logo do site.
  assertListPageSeo(hubPath, html, { items: page.cards.length, image: page.socialImage });
  const cardSlugs = new Set(page.cards.map((card) => card.slug));
  assertSitemapLastmod(hubPath, publishedReviews.filter((review) => cardSlugs.has(review.slug)));
  for (const card of page.cards) {
    assert.ok(body.includes(hrefOf(card.href)), `${hubPath}: sem o card de ${card.slug}`);
    if (card.codeLink) {
      assert.match(card.codeLink.href, /^\/#loja-[a-z0-9-]+$/, `${hubPath}: "Ver o código" fora da vitrine`);
      assert.ok(body.includes(hrefOf(card.codeLink.href)), `${hubPath}: sem o "Ver o código" de ${card.slug}`);
    }
  }
}

// /videos: um h1, o destaque, a grade com todos os vídeos na ordem e o anel de foco, os chips das lojas com 2
// ou mais vídeos ("Todos" escolhido), a trilha igual ao BreadcrumbList, o JSON-LD de lista com a imagem, o
// canal com o "Inscrever-se no canal" (quando a API respondeu no build) e nenhum nome de transição no HTML
// (no HTML, o video-player- fica só no data-vt-name).
const videoSources = { reviews: publishedReviews, recipes };
const videosHub = getVideosHubContent(videoSources);
const videoLinksIn = (html: string) => [...html.matchAll(/<a\b[^>]*\bhref="\/videos\/([^"/?#]+)"/g)].map(([, slug]) => slug);
// Os videoId dos vídeos que têm página no site (só os do YouTube têm um): o canal e a home abrem a página
// desses, nunca o YouTube.
const videoIdsWithPage = new Set<string>(videoPages.flatMap((page) => (page.kind === 'youtube' ? [page.videoId] : [])));
assert.ok(videoIdsWithPage.size > 0, 'video-pages.js sem nenhum vídeo do YouTube: a trava do canal e da home ficaria vazia');
function assertNoYoutubeLinkForPage(where: string, section: string) {
  for (const [, id] of section.matchAll(/<a\b[^>]*\bhref="https:\/\/www\.youtube\.com\/watch\?v=([^"&]+)"/g)) {
    assert.ok(!videoIdsWithPage.has(id), `${where}: vídeo com página no site abrindo o YouTube: ${id}`);
  }
}
const videosFile = builtFile(`${SITE_URL}/videos`);
assert.ok(videosFile, '/videos: página não gerada no build');
const videosHtml = read(videosFile);
const videosBody = bodyOf(videosHtml);
assert.deepEqual(
  [...videosBody.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(([, h1]) => textOf(h1)),
  ['Vídeos'],
  '/videos: h1'
);
const featuredLinks = videoLinksIn(between(videosBody, 'aria-labelledby="titulo-destaque"', ['</section>']));
assert.equal(
  featuredLinks.filter((slug) => slug === videosHub.featured.slug).length,
  2,
  `/videos: o destaque tem de ter dois links para ${videosHub.featured.slug}, a miniatura e o título`
);
assert.deepEqual([...new Set(featuredLinks)], [videosHub.featured.slug], '/videos: destaque');
const videosGrid = between(videosBody, '<ul data-estante="videos"', ['</ul>']);
assert.deepEqual(videoLinksIn(videosGrid), videosHub.videos.map(({ slug }) => slug), '/videos: a grade, do mais novo');
for (const [tag] of videosGrid.matchAll(/<a\b[^>]*>/g)) {
  assert.match(tag, /\bclass="[^"]* focus-visible:outline-marinho[ "]/, `/videos: cartão sem o anel de foco da casa: ${tag}`);
}
const videoChips = [...between(videosBody, 'data-lojas="true"', ['</div>']).matchAll(/<button\b([^>]*)>([^<]*)<\/button>/g)];
assert.deepEqual(
  videoChips.map(([, , label]) => decodeHtml(label)),
  ['Todos', ...videosHub.stores.map(({ name }) => name)],
  '/videos: chips'
);
assert.deepEqual(
  videoChips.map(([, attributes]) => attributes.includes('aria-pressed="true"')),
  videoChips.map((_, index) => index === 0),
  '/videos: só "Todos" escolhido no HTML'
);
assert.ok(!videosBody.includes('view-transition-name'), '/videos: nome de transição no HTML');
const videoMorphNames = videosBody.match(/data-vt-name="video-player-/g)?.length ?? 0;
assert.ok(videoMorphNames > 0, '/videos: nenhuma miniatura com o nome da transição (data-vt-name)');
assert.equal(videosBody.match(/video-player-/g)?.length ?? 0, videoMorphNames, '/videos: video-player- fora do data-vt-name');
assertPageTrail('/videos', videosHtml, VIDEOS_TRAIL);
assertListPageSeo('/videos', videosHtml, { items: videosHub.videos.length, image: videosHub.socialImage });
assertCollectionNames('/videos', videosHtml, videosHub.videos.map(({ title }) => title));
// O canal some, com razão, quando a API do YouTube falha ou a chave falta na hora do build; cobrar a seção
// derrubaria um deploy por um soluço externo. Por isso estas travas só valem com a seção no HTML: um bug que
// a tire com a API respondendo não é pego aqui, e só aparece como "canal: ausente" na linha final do log.
const videosChannel = between(videosBody, 'aria-labelledby="titulo-canal"', ['</section>']);
if (videosChannel) {
  assertNoYoutubeLinkForPage('/videos', videosChannel);
  // O React escreve o target antes do href: o link é achado pelo endereço, e os atributos conferidos à parte.
  const subscribeLink = [...videosChannel.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].find(([, attributes]) =>
    attributes.includes(hrefOf(YOUTUBE_SUBSCRIBE_URL))
  );
  assert.ok(subscribeLink, '/videos: canal sem o "Inscrever-se no canal"');
  assert.ok(subscribeLink[1].includes('target="_blank"'), '/videos: "Inscrever-se no canal" sem aba nova');
  assert.equal(textOf(subscribeLink[2]), 'Inscrever-se no canal', '/videos: texto do "Inscrever-se no canal"');
}

// As páginas de vídeo (docs/GUIA-EDITORIAL-VIDEOS.md, seção 6): um h1, igual ao name do VideoObject; o player
// logo depois do h1 (nenhum <iframe>, <video>, imagem ou fila entre os dois), no formato do aspect e com o
// nome da transição da miniatura; um player só; o link da origem; o botão da loja e a duração só quando
// existem; "Mais vídeos" sem o vídeo aberto; a trilha igual ao BreadcrumbList; o JSON-LD sem "<" cru.
function assertVideoWatchPage(pagePath: string, html: string, content: VideoPageContent) {
  const body = bodyOf(html);
  const { video } = content;
  const article = between(body, '<article', ['</article>']);
  const videoObject = jsonLdOf(html).find((schema) => schema['@type'] === 'VideoObject');
  assert.equal(videoObject?.name, video.title, `${pagePath}: name do VideoObject`);
  assert.deepEqual(
    [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(([, h1]) => textOf(h1)),
    [videoObject?.name],
    `${pagePath}: h1 diferente do name do VideoObject`
  );
  const afterH1 = body.slice(body.indexOf('</h1>'));
  const playerAt = afterH1.indexOf('data-player="');
  assert.ok(playerAt > 0, `${pagePath}: sem o player`);
  assert.doesNotMatch(afterH1.slice(0, playerAt), /<(?:iframe|video|img|ul)\b/, `${pagePath}: algo entre o h1 e o player`);
  const frame = afterH1.slice(playerAt).match(/^data-player="[^"]+"[^>]*>/)?.[0] ?? '';
  assert.ok(frame.startsWith(`data-player="${video.aspect}"`), `${pagePath}: player fora do formato ${video.aspect}`);
  // O nome vai até o `;` ou o `"` que fecha o style: um sufixo (video-player-<slug>-extra) não passa.
  assert.equal(frame.match(/view-transition-name:([^;"]+)/)?.[1], videoMorphName(video.slug), `${pagePath}: player sem o nome da transição`);
  assert.equal(body.match(/<(?:iframe|video)\b/g)?.length ?? 0, 1, `${pagePath}: mais de um player`);
  assert.ok(article.includes(`href="${video.source.href}"`), `${pagePath}: sem o link da origem`);
  const articleText = textOf(article);
  if (video.codeLink) {
    assert.ok(articleText.includes(video.codeLink.label), `${pagePath}: botão da loja onde não devia, ou faltando`);
    assert.ok(article.includes(`href="${video.codeLink.href}"`), `${pagePath}: botão sem a página de cupom`);
  } else {
    assert.ok(!articleText.includes('Ver o código'), `${pagePath}: botão da loja onde não devia, ou faltando`);
  }
  assert.equal(articleText.includes('Duração:'), video.duration !== null, `${pagePath}: duração onde não devia, ou faltando`);
  // Texto quebrado na tela e nos valores de alt, aria-label, title e meta (os atributos, não o HTML cru: um id
  // do YouTube ou um endereço pode ter essas letras). Na tela vale a palavra solta ou colada ("NaNmin",
  // "R$undefined": o `${x}min` que falha sai assim); só nos atributos exige-se a palavra inteira, porque um id
  // ou um endereço pode ter essas letras por acaso.
  assert.doesNotMatch(decodeHtml(article.replace(/<[^>]+>/g, ' ')), /undefined|NaN/, `${pagePath}: texto quebrado`);
  const BROKEN_WORD = /\bundefined\b|\bNaN\b/;
  const articleAttributes = [...article.matchAll(/\s(?:alt|aria-label|title)="([^"]*)"/g)].map(([, value]) => decodeHtml(value));
  const metaContents = [...headOf(html).matchAll(/<meta\b[^>]*\bcontent="([^"]*)"/g)].map(([, value]) => decodeHtml(value));
  assert.ok(articleAttributes.length > 0 && metaContents.length > 0, `${pagePath}: sem atributos de texto nem meta para conferir`);
  for (const value of [...articleAttributes, ...metaContents]) {
    assert.doesNotMatch(value, BROKEN_WORD, `${pagePath}: texto quebrado num atributo: ${value}`);
  }
  assert.deepEqual(
    videoLinksIn(between(body, 'aria-labelledby="titulo-mais-videos"', ['</section>'])),
    content.more.videos.map(({ slug }) => slug),
    `${pagePath}: Mais vídeos`
  );
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    assert.ok(!json.includes('<'), `${pagePath}: JSON-LD com "<" cru`);
  }
  assertPageTrail(pagePath, html, content.trail);
}

const videoWatchPages = videoPages.map((page) => {
  const pagePath = `/videos/${page.slug}`;
  const content = getVideoPageContent(videoSources, page.slug);
  assert.ok(content, `${pagePath}: sem conteúdo`);
  const file = builtFile(`${SITE_URL}${pagePath}`);
  assert.ok(file, `${pagePath}: página não gerada no build`);
  const html = read(file);
  assertVideoWatchPage(pagePath, html, content);
  return { pagePath, html, content };
});

// Controles numa página com loja: cada defeito derruba a trava com a mensagem dele.
{
  const sample = videoWatchPages.find(({ content }) => content.video.codeLink);
  assert.ok(sample, 'controle: há página de vídeo com loja');
  const { pagePath, html, content } = sample;
  const otherAspect = content.video.aspect === 'horizontal' ? 'vertical' : 'horizontal';
  const label = content.video.codeLink?.label ?? '';
  const morphName = videoMorphName(content.video.slug);
  const failures: Array<[string, RegExp]> = [
    [html.replace('</h1>', '</h1><ul></ul>'), /algo entre o h1 e o player/],
    [html.replace(`data-player="${content.video.aspect}"`, `data-player="${otherAspect}"`), /player fora do formato/],
    [html.replace(/<h1\b([^>]*)>/, '<h1$1>Outro título '), /h1 diferente do name do VideoObject/],
    [html.replace('</article>', '<iframe></iframe></article>'), /mais de um player/],
    [html.split(escapeHtml(label)).join('Outro texto'), /botão da loja onde não devia, ou faltando/],
    // Só o nome da loja errado: o "Ver o código" continua na página, e o rótulo inteiro não.
    [html.split(escapeHtml(label)).join('Ver o código da OUTRA'), /botão da loja onde não devia, ou faltando/],
    [html.replace(`view-transition-name:${morphName}`, `view-transition-name:${morphName}-extra`), /player sem o nome da transição/],
    [html.replace('Sobre este vídeo</h2>', 'Sobre este vídeo</h2><p>undefined</p>'), /texto quebrado/],
    // Colado ao resto do texto, como sai de um `${x}min`: na tela o \b não pode deixar passar. A expressão
    // termina em "quebrado" para pegar a mensagem da tela, não a dos atributos (": texto quebrado num atributo").
    [html.replace('Sobre este vídeo</h2>', 'Sobre este vídeo</h2><p>NaNmin</p>'), /: texto quebrado$/],
    [html.replace('aria-label="Player do vídeo:', 'aria-label="undefined Player do vídeo:'), /texto quebrado num atributo/],
    [html.replace('<meta name="description" content="', '<meta name="description" content="NaN '), /texto quebrado num atributo/],
    [html.replace('aria-labelledby="titulo-mais-videos"', 'aria-labelledby="titulo-outro"'), /Mais vídeos/],
  ];
  for (const [mutated, message] of failures) {
    assert.notEqual(mutated, html, `controle: a mutação não achou o trecho (${message})`);
    assert.throws(() => assertVideoWatchPage(pagePath, mutated, content), message);
  }
}

// Os Últimos vídeos da home (quando a API do YouTube respondeu no build): o "Ver todos os vídeos"; o vídeo com
// página no site abre a página na mesma aba, e o do YouTube numa aba nova, com rel="noopener noreferrer", e
// nunca é o de um vídeo que tem página. Todo cartão da fila é de um dos dois tipos, para os dois laços não
// passarem vazios quando os 6 uploads são de um tipo só.
function assertHomeVideoLinks(section: string) {
  assert.match(section, /<a\b[^>]*href="\/videos"[^>]*>Ver todos os vídeos<\/a>/, 'home: sem o "Ver todos os vídeos"');
  const row = between(section, '<ul class="hide-scrollbar', ['</ul>']);
  const cardCount = row.match(/<li[\s>]/g)?.length ?? 0;
  const links = [...row.matchAll(/<a\b[^>]*>/g)].map(([tag]) => tag);
  assert.ok(cardCount > 0, 'home: Últimos vídeos sem a fila de cartões');
  assert.equal(links.length, cardCount, 'home: cartão de vídeo sem link, ou com mais de um');
  for (const tag of links) {
    if (/\bhref="\/videos\/[^"]+"/.test(tag)) {
      assert.ok(!tag.includes('target="_blank"'), `home: vídeo com página abrindo em aba nova: ${tag}`);
    } else {
      assert.match(tag, /\bhref="https:\/\/www\.youtube\.com\/watch\?v=[^"]+"/, `home: vídeo sem a página nem o link do YouTube: ${tag}`);
      assert.ok(tag.includes('target="_blank"'), `home: vídeo do YouTube sem aba nova: ${tag}`);
      assert.ok(tag.includes('rel="noopener noreferrer"'), `home: vídeo do YouTube sem rel="noopener noreferrer": ${tag}`);
    }
  }
  assertNoYoutubeLinkForPage('home', row);
}
// Como o canal de /videos, a fila da home some, com razão, quando a API do YouTube falha ou a chave falta na
// hora do build, e cobrá-la derrubaria um deploy por um soluço externo. Estas travas só valem com a seção no
// HTML: um bug que a tire com a API respondendo não é pego aqui, e só aparece como "vídeos: ausentes" na
// linha final do log.
const homeVideos = between(homeBody, 'aria-labelledby="titulo-ultimos-videos"', ['aria-labelledby="titulo-', '<footer']);
if (homeVideos) assertHomeVideoLinks(homeVideos);

// O guarda acusa cada defeito, também com os dois tipos de cartão que o HTML de hoje pode não ter.
{
  const youtubeCard = '<li><a target="_blank" rel="noopener noreferrer" class="x" href="https://www.youtube.com/watch?v=abc">T</a></li>';
  const pageCard = '<li><a class="x" href="/videos/um-video">T</a></li>';
  const section = (...cards: string[]) =>
    `<ul class="hide-scrollbar x">${cards.join('')}</ul><a class="y" href="/videos">Ver todos os vídeos</a>`;
  const good = section(youtubeCard, pageCard);
  assertHomeVideoLinks(good);
  // Um id real de video-pages.js no lugar do `abc`: o cartão abriria o YouTube em vez da página do site.
  const [pageVideoId] = videoIdsWithPage;
  const cardWithPage = youtubeCard.replace('abc', () => pageVideoId);
  const failures: Array<[string, RegExp]> = [
    [section(youtubeCard, pageCard.replace('<a ', '<a target="_blank" ')), /vídeo com página abrindo em aba nova/],
    [section(youtubeCard.replace(' target="_blank"', ''), pageCard), /vídeo do YouTube sem aba nova/],
    [section(youtubeCard.replace(' rel="noopener noreferrer"', ''), pageCard), /vídeo do YouTube sem rel="noopener noreferrer"/],
    [section(youtubeCard, '<li><a class="x" href="https://example.com/">T</a></li>'), /vídeo sem a página nem o link do YouTube/],
    [section(youtubeCard, pageCard).replace('Ver todos os vídeos', 'Ver tudo'), /sem o "Ver todos os vídeos"/],
    [section(), /sem a fila de cartões/],
    [section(cardWithPage, pageCard), new RegExp(`home: vídeo com página no site abrindo o YouTube: ${pageVideoId}`)],
  ];
  for (const [mutated, message] of failures) {
    assert.notEqual(mutated, good, `controle: a mutação não mudou nada (${message})`);
    assert.throws(() => assertHomeVideoLinks(mutated), message);
  }
  // O mesmo guarda no canal de /videos, com o texto dele.
  assertNoYoutubeLinkForPage('/videos', good);
  assert.throws(
    () => assertNoYoutubeLinkForPage('/videos', cardWithPage),
    new RegExp(`/videos: vídeo com página no site abrindo o YouTube: ${pageVideoId}`)
  );
}

// O 404 do site (src/app/global-not-found.js), que o Next gera na build: o HTML inteiro, não o
// __next_error__ vazio do bug vercel/next.js#99793, com menu, rodapé, noindex e uma linha por idioma.
{
  const notFoundHtml = read(path.join(APP_DIR, '_not-found.html'));
  assert.match(notFoundHtml, /<html lang="pt-BR">/, '404: sem <html lang="pt-BR">');
  assert.ok(!notFoundHtml.includes('__next_error__'), '404: HTML vazio de erro');
  const expected: Array<[string, string]> = [
    ['menu', '<nav'],
    ['rodapé', '<footer'],
    ['noindex', '<meta name="robots" content="noindex'],
    ['título', '<title>Página não encontrada - Em Casa com Cecília</title>'],
    ['h1', 'Esta página não existe</span></h1>'],
    ['busca', 'placeholder="Buscar receitas e artigos"'],
  ];
  for (const [label, needle] of expected) assert.ok(notFoundHtml.includes(needle), `404: sem ${label}`);
  for (const locale of LOCALE_KEYS.filter((key) => key !== 'pt')) {
    assert.ok(notFoundHtml.includes(`<li lang="${LOCALES[locale].htmlLang}"`), `404: sem a linha do idioma ${locale}`);
  }
}

// O feed do Dicas & Ofertas e a API do YouTube decidem na hora do build se ofertas e vídeos
// aparecem; a linha final diz quantos cards cada um teve, para o log do build mostrar.
const cardsIn = (section: string) => {
  const row = between(section, '<ul class="hide-scrollbar', ['</ul>']);
  return row ? String((row.match(/<li[\s>]/g) ?? []).length) : 'ausentes';
};
const sectionCards = (id: string) => cardsIn(between(homeBody, `aria-labelledby="${id}"`, ['aria-labelledby="titulo-', '<footer']));

console.log(
  `✅ build output: CSS de CJK e da gaveta, sitemap.xml (${sitemapUrls.length} URLs), llms.txt (${llmsUrls.length} URLs), ${translatedUrls.length} páginas de loja traduzida, ${yesStyleHubs.length} páginas da YesStyle, o dock, a sidebar, a trilha e a interface de ${articleUrls.length} artigos, o recorte do topo e da lateral de ${cutoutArticles}, o código copiável no texto de ${inlineCopyArticles}, a nota editorial de ${notedArticles}, o FAQ de ${faqArticles} igual ao FAQPage, o <head> de ${familyHeads} artigos de família, o ${rewardCode} em ${rewardCodePages} páginas, a home (ofertas: ${sectionCards('titulo-explore-a-casa')}, vídeos: ${sectionCards('titulo-ultimos-videos')}), ${storeArticleSlugs.length} subpáginas de loja, /videos (${videosHub.videos.length} vídeos, canal: ${videosChannel ? 'sim' : 'ausente'}), ${videoWatchPages.length} páginas de vídeo, ${eventHubPaths.length} páginas de data, ${LOCALE_HOME_LOCALES.length} homes de idioma, o 404, o movimento de /cupons (o hub e ${couponMotionPages} páginas de loja) e o @id da Cecília em ${Object.values(personNodesChecked).flat().length} nós de pessoa conferidos.`
);
