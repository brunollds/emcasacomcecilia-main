import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { getCouponCopyLabels } from '../src/components/review/couponCopyLocale';
import { getSidebarCopy } from '../src/components/review/sidebarCopy';
import { getCouponBySlug } from '../src/lib/couponsData';
import { getCouponLanguageLinks, getLocalizedCoupon, getTranslatedCouponRoutes } from '../src/lib/couponTranslations';
import { YESSTYLE_LOCALES } from '../src/lib/i18n/clusters/yesstyle';
import { LOCALES, LOCALE_KEYS, type Locale } from '../src/lib/i18n/locales';
import { getPrimaryRewardCode } from '../src/lib/yesstyleCoupons';

// Confere o que só existe depois do `next build`: o CSS final, o sitemap.xml, o llms.txt, o <head>
// das lojas traduzidas, as páginas da YesStyle, o dock e a sidebar dos artigos e os textos que citam
// o CECILIA010. O <html lang> fica com test-c2-html-lang.
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

const sitemapUrls = [...read(path.join(APP_DIR, 'sitemap.xml.body')).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  ([, url]) => url
);
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

// Textos da sidebar do desktop em todos os idiomas, menos os do idioma da página.
const SIDEBAR_TEXT_KEYS = ['sectionsNav', 'tocTitle', 'copyHint', 'copiedHint', 'relatedTitle'] as const;
function foreignSidebarText(locale: Locale) {
  const own = new Set(SIDEBAR_TEXT_KEYS.map((key) => getSidebarCopy(locale)[key]));
  return new Set(
    LOCALE_KEYS.flatMap((other) => SIDEBAR_TEXT_KEYS.map((key) => getSidebarCopy(other)[key])).filter((text) => !own.has(text))
  );
}

// Todo artigo tem o dock do sumário no celular (ReviewMobileBottomBar) e a sidebar no desktop
// (ReviewSidebar). Um artigo sem nenhuma seção com título fica sem dock e sem o sumário da sidebar;
// se um dia isso for de propósito, tire-o desta conferência.
const articleUrls = sitemapUrls.filter((url) => /\/reviews\/[^/]+$/.test(new URL(url).pathname));
assert.ok(articleUrls.length > 0, 'sitemap.xml sem artigos');
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
  const sidebarTexts = [
    ...[...sidebar.matchAll(/aria-label="([^"]*)"/g)].map(([, label]) => decodeHtml(label)),
    ...sidebar.split(/<[^>]+>/).map((text) => decodeHtml(text).trim()).filter(Boolean),
  ];
  const code = sidebar.match(/data-copied="false"[^>]*>([^<]+)</)?.[1];
  const expectedTexts = [
    copy.sectionsNav,
    copy.tocTitle,
    ...(code ? [getCouponCopyLabels(locale).copyCoupon(code), copy.copyHint, copy.copiedHint] : []),
  ];
  assert.deepEqual(expectedTexts.filter((text) => !sidebarTexts.includes(text)), [], `${pagePath}: sidebar sem os textos do idioma`);
  const foreign = foreignSidebarText(locale);
  assert.deepEqual(sidebarTexts.filter((text) => foreign.has(text)), [], `${pagePath}: sidebar com texto de outro idioma`);
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

console.log(
  `✅ build output: CSS de CJK e da gaveta, sitemap.xml (${sitemapUrls.length} URLs), llms.txt (${llmsUrls.length} URLs), ${translatedUrls.length} páginas de loja traduzida, ${yesStyleHubs.length} páginas da YesStyle, o dock e a sidebar de ${articleUrls.length} artigos e o ${rewardCode} em ${rewardCodePages} páginas conferidos.`
);
