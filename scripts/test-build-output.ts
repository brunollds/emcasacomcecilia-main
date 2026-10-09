import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import homeEventsConfig from '../content/home-events.json';
import { getArticleCopy } from '../src/components/review/articleCopy';
import { getCouponCopyLabels } from '../src/components/review/couponCopyLocale';
import { getGalleryCopy } from '../src/components/review/galleryCopy';
import { getCodeHints, getCodeTitle, getSidebarCopy } from '../src/components/review/sidebarCopy';
import { getShareCopy } from '../src/components/shared/shareCopy';
import { brandLinks } from '../src/lib/brandLinks';
import type { Recommendation } from '../src/lib/content';
import { getReviewCanonicalPathname } from '../src/lib/content/review-i18n';
import { getCouponBySlug, getStoreCodeKind } from '../src/lib/couponsData';
import { getCouponLanguageLinks, getLocalizedCoupon, getTranslatedCouponRoutes } from '../src/lib/couponTranslations';
import { publishedReviews, recipes } from '../src/lib/data';
import { getEventHubPage, getEventHubPaths, resolveActiveHomeEvent } from '../src/lib/homeEvents';
import { getHomeLatest, getHomeStoreTabs, getStoreArticlePageSlugs, getStoreArticlesPage } from '../src/lib/homeStores';
import { YESSTYLE_LOCALES } from '../src/lib/i18n/clusters/yesstyle';
import { LOCALES, LOCALE_KEYS, type Locale } from '../src/lib/i18n/locales';
import { getPrimaryRewardCode } from '../src/lib/yesstyleCoupons';

// Confere o que só existe depois do `next build`: o CSS final, o sitemap.xml, o llms.txt, o <head>
// das lojas traduzidas e dos artigos de cada família, as páginas da YesStyle, o dock, a sidebar e a
// interface dos artigos no idioma de cada um, os textos que citam o CECILIA010, a home, as
// subpáginas de loja e as páginas de data. O <html lang> fica com test-c2-html-lang.
const SITE_URL = 'https://emcasacomcecilia.com';
const APP_DIR = path.resolve('.next/server/app');
const CSS_DIR = path.resolve('.next/static/css');

assert.ok(fs.existsSync(APP_DIR), 'Sem .next/server/app: rode o next build antes deste teste');

const read = (file: string) => fs.readFileSync(file, 'utf8');

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

// O CECILIA010 é código de recompensa, não cupom: vai no campo Reward Code e soma com os cupons da
// loja. Nenhum texto do site pode chamá-lo de cupom ("cupom CECILIA010", "CECILIA010 coupon") nem
// falar em usá-lo com outros cupons, o que faria dele um cupom também. A terceira regra para no fim
// da frase: "Com outro cupom, não" logo depois do código fala do cupom da loja.
const rewardCode = getPrimaryRewardCode().code;
const COUPON_WORDS = 'cupom|cupons|cupón|cupones|coupons?|gutscheine?|쿠폰|クーポン|優惠碼|优惠码';
const OTHER_COUPONS =
  'outros? cupo|other coupon|otros? cup|autres? coupon|(?:anderen|weiteren) gutschein|altr[io] coupon|다른 쿠폰|(?:ほか|他)のクーポン|其他優惠碼|其他优惠码';
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

for (const { locale, hubPath, htmlLang, openGraphLocale } of yesStyleHubs) {
  const file = builtFile(`${SITE_URL}${hubPath}`);
  assert.ok(file, `${hubPath}: página não gerada no build`);
  const html = read(file);
  const head = headOf(html);
  const main = html.match(/<main\b[\s\S]*<\/main>/)?.[0] ?? '';
  const rawTitle = head.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';

  assertLocalizedHead(hubPath, head, yesStyleAlternates, openGraphLocale);
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
  const trail = main.match(/<nav\b[^>]*><ol\b[\s\S]*?<\/ol><\/nav>/)?.[0] ?? '';
  const visibleCrumbs = [...trail.matchAll(/<li\b([^>]*)>([\s\S]*?)<\/li>/g)]
    .filter(([, attributes]) => !attributes.includes('aria-hidden'))
    .map(([, , item]) => ({
      name: textOf(item),
      url: new URL(item.match(/href="([^"]+)"/)?.[1] ?? hubPath, SITE_URL).href,
    }));
  assert.equal(visibleCrumbs.length, locale === 'pt' ? 3 : 2, `${hubPath}: ${visibleCrumbs.length} níveis na trilha`);
  assert.deepEqual(
    schemaOf('BreadcrumbList').itemListElement.map(({ name, item }) => ({ name, url: new URL(item).href })),
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

// Os cards de artigos relacionados mostram o título, a descrição e o `type` de outra review: é conteúdo
// dela (o `type` é rótulo livre e vários JSONs de fora do PT trazem "Editorial"), não texto da interface.
const withoutRelatedCards = (body: string) => body.replace(/<a\b[^>]*min-h-\[220px\][^>]*>[\s\S]*?<\/a>/g, '');
{
  const card = (type: string) => `<a class="group relative min-h-[220px] p-4" href="/fr/reviews/x"><p>${type}</p><h3>Titre</h3></a>`;
  assert.equal(withoutRelatedCards(`<p>Guide</p>${card('Editorial')}<p>Fin</p>`), '<p>Guide</p><p>Fin</p>', 'card relacionado fica na conferência');
  assert.equal(withoutRelatedCards('<a class="p-4" href="/fr">Editorial</a>'), '<a class="p-4" href="/fr">Editorial</a>', 'link comum some da conferência');
}

// Todo artigo tem o dock do sumário no celular (ReviewMobileBottomBar) e a sidebar no desktop
// (ReviewSidebar). Um artigo sem nenhuma seção com título fica sem dock e sem o sumário da sidebar;
// se um dia isso for de propósito, tire-o desta conferência.
const articleUrls = sitemapUrls.filter((url) => /\/reviews\/[^/]+$/.test(new URL(url).pathname));
assert.ok(articleUrls.length > 0, 'sitemap.xml sem artigos');
let familyHeads = 0;
for (const url of articleUrls) {
  const pagePath = new URL(url).pathname;
  const file = builtFile(url);
  assert.ok(file, `${pagePath}: página não gerada no build`);
  const html = read(file);
  const body = bodyOf(html);
  assert.equal(openElementsAt(body, body.length), 0, `${pagePath}: as tags do <body> não fecham`);

  const dialogs = body.match(/<dialog\b[\s\S]*?<\/dialog>/g) ?? [];
  assert.equal(dialogs.length, 1, `${pagePath}: ${dialogs.length} gavetas de sumário em vez de uma`);
  const [dialog] = dialogs;
  const dialogStart = body.indexOf('<dialog');
  const progressbar = body.lastIndexOf('role="progressbar"', dialogStart);
  assert.ok(progressbar >= 0, `${pagePath}: dock sem a barra de progresso antes da gaveta`);
  // Dentro do fundo editorial, `.editorial-ambient-bg > *` troca o sticky do dock por relative.
  assert.equal(openElementsAt(body, dialogStart), 0, `${pagePath}: a gaveta do sumário não é filha direta do <body>`);
  assert.equal(openElementsAt(body, progressbar), 1, `${pagePath}: o dock do sumário não é filho direto do <body>`);

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

  const code = sidebar.match(/data-copied="false"[^>]*>([^<]+)</)?.[1];
  assert.equal(code, review.coupon, `${pagePath}: código da sidebar diferente do da review`);
  const store = review.affiliate ? getCouponBySlug(review.affiliate) : undefined;
  const codeKind = getStoreCodeKind(store, review.coupon);
  const hints = getCodeHints(copy, codeKind, store?.brand);
  const expectedTexts = [
    copy.sectionsNav,
    copy.tocTitle,
    ...(code ? [getCouponCopyLabels(locale).copyCoupon(code), hints.copy, hints.copied] : []),
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
  // fora do alcance das regras acima.
  for (const { attributes, inner } of innermostArticles(body)) {
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

// /categorias ficou sem link no site e saiu do sitemap (decisão do Bruno, 08/10).
assert.ok(!sitemapUrls.includes(`${SITE_URL}/categorias`), 'sitemap.xml com /categorias');

// A home (D2) como o build a gerou, contra os mesmos dados que a montam: a vitrine, o "Acabou de
// sair", a data comercial e as seções de baixo. Ofertas e vídeos dependem do feed do Dicas & Ofertas
// e da API do YouTube na hora do build: só são conferidos quando aparecem.
type HomeExpectations = {
  tabs: ReturnType<typeof getHomeStoreTabs>;
  latest: ReturnType<typeof getHomeLatest>;
  hasEvent: boolean;
  recipeCount: number;
};

const LATEST_SECTION = 'aria-labelledby="titulo-acabou-de-sair"';
const LOWER_SECTIONS = ['titulo-receitas', 'titulo-explore-a-casa', 'titulo-ofertas-do-dia', 'titulo-ultimos-videos'];
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
  const yesStyle = textOf(panelIn(body, 'loja-yesstyle'));
  check(yesStyle.includes('Código de recompensa') && !yesStyle.includes('Cupom YesStyle'), 'painel da YesStyle: o CECILIA010 sem o rótulo de recompensa');
  const shein = textOf(panelIn(body, 'loja-shein'));
  check(shein.includes('Código de indicação') && !shein.includes('Cupom SHEIN'), 'painel da SHEIN: o 4CW5Y sem o rótulo de indicação');
  check(textOf(panelIn(body, 'loja-nestle-nutre')).includes('fórmulas infantis de 0 a 12 meses'), 'painel da Nestlé Nutre: sem a exclusão das fórmulas infantis');

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
  if (at('titulo-ofertas-do-dia') >= 0) {
    check(sectionOf('titulo-ofertas-do-dia').includes('>Acessar Dicas &amp; Ofertas</a>'), 'Ofertas do dia: sem o "Acessar Dicas & Ofertas"');
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
assert.equal(
  homeExpected.tabs.find(({ slug }) => slug === 'damie')?.storePageUrl,
  '/cupons/damie',
  'a aba da DAMIE leva a /cupons/damie'
);
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
const yesStyleTab = storeWhere('da YesStyle', (tab) => tab.slug === 'yesstyle');
const codeTab = storeWhere('com código', (tab) => !!tab.code);
const articleTab = storeWhere('com artigo', (tab) => tab.articles.length > 0);

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

// O guarda acima recusa a home errada: cada mutação abaixo precisa achar o trecho e dar problema.
const brokenHomes = [
  homeBody.replace('>Código de recompensa YesStyle<', '>Cupom YesStyle<'),
  homeBody.replace(WHATSAPP_LINK, (tag) => tag.replace(' target="_blank"', '').replace(' rel="noopener noreferrer"', '')),
  homeBody.split(hrefOf(homeExpected.latest[0].href)).join('href="/outra"'),
  homeBody.replace(LATEST_SECTION, `${LATEST_SECTION}><button>Copiar</button`),
  homeBody.replace('aria-labelledby="titulo-receitas"', 'aria-labelledby="titulo-outra"'),
  // O menu também linka a DAMIE: troca todos, senão a mutação pegaria só o do menu.
  homeBody.split(hrefOf(brandLinks.damie)).join('href="/outra"'),
  homeBody.split('Código de indicação').join('Cupom'),
  homeBody.split('fórmulas infantis de 0 a 12 meses').join('fórmulas infantis'),
  // Sem ofertas e sem vídeos (o feed e a API fora do ar no build), o Explore a casa acaba no rodapé,
  // que também linka o Dicas & Ofertas: o link que some do Explore precisa dar problema.
  (() => {
    const offersAt = homeBody.indexOf('aria-labelledby="titulo-ofertas-do-dia"');
    const trimmed = offersAt < 0 ? homeBody : homeBody.slice(0, offersAt) + homeBody.slice(homeBody.indexOf('<footer'));
    const exploreAt = trimmed.indexOf('aria-labelledby="titulo-explore-a-casa"');
    const footerAt = trimmed.indexOf('<footer');
    const explore = trimmed.slice(exploreAt, footerAt).split(hrefOf(brandLinks.dicas)).join('href="/outra"');
    return trimmed.slice(0, exploreAt) + explore + trimmed.slice(footerAt);
  })(),
  homeBody.replace(LATEST_SECTION, `id="painel-loja-inativa" ${LATEST_SECTION}`),
  homeBody.replace(LATEST_SECTION, `${LATEST_SECTION}><a href="/reviews/artigo-a-mais"></a`),
  homeBody.replace('id="painel-loja-shein"', 'id="painel-loja-shein"><span>Cupom SHEIN</span'),
  // Fora de ordem, sem um artigo ou com um artigo repetido em só um dos desenhos: a lista do celular e a grade.
  swapLinks(latestMutationLinks[0], latestMutationLinks[1]),
  swapLinks(latestMutationLinks[latestCount], latestMutationLinks[latestCount + 1]),
  replaceLink(latestMutationLinks[2 * latestCount - 1], 'href="/outra"'),
  doubleLink(latestMutationLinks[0]),
  doubleLink(latestMutationLinks[latestCount]),
  // O painel de uma loja por inteiro, uma mutação por trava: o rótulo do botão de copiar (a YesStyle
  // não tem cupom), o código, a dica, a oferta, o link da loja e os artigos. O texto de dados é escapado
  // como o React o escreve.
  inPanel(yesStyleTab, (panel) => panel.replace(`aria-label="${escapeHtml(COPY_LABELS.copyCoupon(rewardCode))}"`, `aria-label="Copiar o cupom ${rewardCode}"`)),
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

// Os cards de Guias & Análises (ReviewHubCard) de /reviews e das subpáginas de loja: o h2 só para
// leitor de tela entre o h1 e os h3 dos cards, e o anel de foco da casa em cada link de card.
// Devolve as tags dos links de card.
function hubCardLinks(where: string, body: string, heading: string) {
  assert.ok(body.includes(`<h2 class="sr-only">${heading}</h2>`), `${where}: sem o h2 "${heading}" entre o h1 e os h3 dos cards`);
  const tags = [...body.matchAll(/<a\b[^>]*\bhref="\/reviews\/[^"/]+"[^>]*>/g)].map(([tag]) => tag);
  assert.ok(tags.length > 0, `${where}: sem links de card`);
  for (const tag of tags) {
    assert.match(tag, /\bclass="[^"]* focus-visible:outline-marinho[ "]/, `${where}: card sem o anel de foco da casa: ${tag}`);
  }
  return tags;
}

const reviewsFile = builtFile(`${SITE_URL}/reviews`);
assert.ok(reviewsFile, '/reviews: página não gerada no build');
hubCardLinks('/reviews', bodyOf(read(reviewsFile)), 'Lista de conteúdos');

// Subpágina de cada loja com mais de 3 artigos: o h1, o canonical, um card por artigo (com o anel de
// foco), o link da página da loja, o h2 só para leitor de tela e a data no sitemap.
const storeArticleSlugs = getStoreArticlePageSlugs(publishedReviews);
for (const slug of storeArticleSlugs) {
  const page = getStoreArticlesPage(publishedReviews, slug);
  assert.ok(page, `/reviews/loja/${slug}: sem dados`);
  const pagePath = `/reviews/loja/${slug}`;
  const file = builtFile(`${SITE_URL}${pagePath}`);
  assert.ok(file, `${pagePath}: página não gerada no build`);
  const html = read(file);
  const body = bodyOf(html);
  assert.equal(headOf(html).match(/<link rel="canonical" href="([^"]+)"/)?.[1], `${SITE_URL}${pagePath}`, `${pagePath}: canonical`);
  assert.equal(textOf(body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? ''), page.title, `${pagePath}: h1`);
  const cardSlugs = new Set([...body.matchAll(/href="\/reviews\/([^"/]+)"/g)].map(([, cardSlug]) => cardSlug));
  assert.deepEqual([...cardSlugs].sort(), page.articles.map((article) => article.slug).sort(), `${pagePath}: um card por artigo da loja`);
  assert.ok(body.includes(hrefOf(page.storePageUrl)), `${pagePath}: sem o link de ${page.storePageUrl}`);
  assert.equal(hubCardLinks(pagePath, body, 'Lista de artigos').length, page.articles.length, `${pagePath}: um link por card`);
  // O lastmod da subpágina é a data do artigo mais novo: a da atualização, ou a da publicação.
  const newestDate = page.articles.map((article) => article.updatedAt ?? article.publishedAtISO).filter(Boolean).sort().at(-1);
  assert.ok(newestDate, `${pagePath}: nenhum artigo com data`);
  const sitemapEntry = sitemapBody.split('<url>').find((chunk) => chunk.includes(`<loc>${SITE_URL}${pagePath}</loc>`));
  assert.equal(sitemapEntry?.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1], newestDate, `${pagePath}: lastmod no sitemap.xml`);
}

// Página de cada data com edição no home-events.json: o h1, o canonical e um card por artigo, com o
// "Ver o código" levando à aba da loja na vitrine.
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
  for (const card of page.cards) {
    assert.ok(body.includes(hrefOf(card.href)), `${hubPath}: sem o card de ${card.slug}`);
    if (card.codeLink) {
      assert.match(card.codeLink.href, /^\/#loja-[a-z0-9-]+$/, `${hubPath}: "Ver o código" fora da vitrine`);
      assert.ok(body.includes(hrefOf(card.codeLink.href)), `${hubPath}: sem o "Ver o código" de ${card.slug}`);
    }
  }
}

// O feed do Dicas & Ofertas e a API do YouTube decidem na hora do build se ofertas e vídeos
// aparecem; a linha final diz quantos cards cada seção teve, para o log do build mostrar.
const lowerCards = (id: string) => {
  const section = between(homeBody, `aria-labelledby="${id}"`, ['aria-labelledby="titulo-', '<footer']);
  return section ? String((section.match(/<li[\s>]/g) ?? []).length) : 'ausentes';
};

console.log(
  `✅ build output: CSS de CJK e da gaveta, sitemap.xml (${sitemapUrls.length} URLs), llms.txt (${llmsUrls.length} URLs), ${translatedUrls.length} páginas de loja traduzida, ${yesStyleHubs.length} páginas da YesStyle, o dock, a sidebar e a interface de ${articleUrls.length} artigos, o <head> de ${familyHeads} artigos de família, o ${rewardCode} em ${rewardCodePages} páginas, a home (ofertas: ${lowerCards('titulo-ofertas-do-dia')}, vídeos: ${lowerCards('titulo-ultimos-videos')}), ${storeArticleSlugs.length} subpáginas de loja e ${eventHubPaths.length} páginas de data conferidos.`
);
