import assert from 'node:assert/strict';

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { imageConfigDefault, type ImageConfigComplete, type RemotePattern } from 'next/dist/shared/lib/image-config';
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';

import { getCodeTitle, getSidebarCopy } from '@/components/review/sidebarCopy';
import { CECILIA_PHOTO_COPY_PT } from '@/components/sections/CeciliaProfile';
import { LocaleHomeHero } from '@/components/sections/LocaleHomeHero';
import { LocaleHomePage } from '@/components/sections/LocaleHomePage';
import {
  LocaleHomeArticles,
  LocaleHomeFaq,
  LocaleHomeFollow,
  LocaleHomeSafety,
  LocaleHomeStores,
} from '@/components/sections/LocaleHomeSections';
import { fillTemplate, getLocaleHomeCopy, type LocaleHomeCopy } from '@/components/sections/localeHomeCopy';
import {
  CECILIA_FULL_NAME,
  YESSTYLE_CERTIFICATE,
  getCertificateYears,
  isCertificateValid,
} from '@/lib/ceciliaCredentials';
import { getCouponBySlug, getStoreCodeKind } from '@/lib/couponsData';
import { getTranslatedCouponRoutes } from '@/lib/couponTranslations';
import { publishedReviews } from '@/lib/data';
import { getStoreCode } from '@/lib/homeStores';
import { LOCALES, LOCALE_KEYS } from '@/lib/i18n/locales';
import { IMAGE_REMOTE_PATTERNS } from '@/lib/imageHosts.mjs';
import { serializeJsonLd } from '@/lib/jsonLd';
import {
  LOCALE_HOME_LOCALES,
  getHomeLanguageLinks,
  getLocaleHomeContent,
  getLocaleHomePath,
  getLocaleHomeStores,
} from '@/lib/localeHome';
import { getPublishedReviewsForLocale } from '@/lib/review-hubs';

import {
  COUPON_WORD_LIST,
  LABEL_SAME_AS_PORTUGUESE,
  codeAsCouponRegExp,
  deriveStoreHosts,
  escapeRegExp,
  getPtStoreTexts,
  getStoreHostMention,
  isStoreLink,
  urlHostsIn,
} from './locale-home-guards';

// O certificado da YesStyle vale de validFrom a validUntil, pela data UTC: fora disso a build para.
const todayUtc = new Date().toISOString().slice(0, 10);
assert.ok(
  isCertificateValid(todayUtc),
  todayUtc < YESSTYLE_CERTIFICATE.validFrom
    ? `O certificado da YesStyle ainda não começou a valer (válido a partir de ${YESSTYLE_CERTIFICATE.validFrom}): a renovação foi posta antes da hora. Confira as datas em src/lib/ceciliaCredentials.ts; a build só volta a passar a partir desse dia.`
    : `O certificado da YesStyle venceu em ${YESSTYLE_CERTIFICATE.validUntil}: troque a imagem e as datas em src/lib/ceciliaCredentials.ts pelo certificado novo, ou tire o selo da home de cada idioma.`
);
// As bordas saem das próprias datas, para renovar o certificado não quebrar o teste.
const shiftDay = (dayIso: string, days: number): string => {
  const date = new Date(`${dayIso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
};
const { validFrom, validUntil } = YESSTYLE_CERTIFICATE;
assert.equal(isCertificateValid(validFrom), true, 'o primeiro dia já vale');
assert.equal(isCertificateValid(shiftDay(validFrom, -1)), false, 'o dia antes do início não vale');
assert.equal(isCertificateValid(validUntil), true, 'o último dia ainda vale');
assert.equal(isCertificateValid(shiftDay(validUntil, 1)), false, 'o dia seguinte ao fim já não vale');
assert.equal(getCertificateYears(), `${validFrom.slice(0, 4)}–${validUntil.slice(0, 4)}`);

assert.deepEqual(LOCALE_HOME_LOCALES, LOCALE_KEYS.filter((locale) => locale !== 'pt'));

// Textos: nenhum vazio, os mesmos marcadores do inglês e, fora do inglês, nenhum igual a ele.
const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map(([, key]) => key).sort();
const entries = (copy: LocaleHomeCopy): Array<[string, string]> =>
  Object.entries(copy).flatMap(([key, value]): Array<[string, string]> =>
    typeof value === 'string' ? [[key, value]] : value.map((item, index): [string, string] => [`${key}[${index}]`, item])
  );
const english = new Map(entries(getLocaleHomeCopy('en')));
const QUESTION_KEYS = ['faqWhoQuestion', 'faqWhyQuestion', 'faqWhereQuestion', 'faqContactQuestion'] as const;

for (const locale of LOCALE_HOME_LOCALES) {
  const copy = getLocaleHomeCopy(locale);
  for (const [key, text] of entries(copy)) {
    const reference = english.get(key);
    assert.ok(reference !== undefined, `${locale}.${key} não existe em inglês`);
    assert.ok(text.trim(), `${locale}.${key} vazio`);
    assert.deepEqual(placeholders(text), placeholders(reference), `${locale}.${key}: marcadores diferentes do inglês`);
    if (locale !== 'en') assert.notEqual(text, reference, `${locale}.${key} igual ao inglês`);
  }
  for (const key of QUESTION_KEYS) assert.match(copy[key], /[?？]$/, `${locale}.${key} sem ponto de interrogação`);
}
assert.equal(fillTemplate('{a} e {b}', { a: 1, b: 'x' }), '1 e x');
assert.throws(() => fillTemplate('{name} desde {since}', { name: 'x' }), /since/);

// Os casadores das travas de loja e de cupom acham o que têm de achar. Sem isto, um casador que passasse a
// responder sempre "não" deixaria as travas das homes vazias e a build seguiria verde.
assert.equal(isStoreLink('https://ystyle.co/x'), true, 'isStoreLink não acha o encurtador da YesStyle');
assert.equal(isStoreLink('https://br.shein.com/x'), true, 'isStoreLink não acha a SHEIN Brasil');
assert.equal(isStoreLink('/en/coupons/shein'), false, 'isStoreLink pegou a página da loja no próprio site');
assert.match('Use o link ystyle.co/abc na compra', getStoreHostMention(), 'getStoreHostMention não acha ystyle.co no texto');
assert.doesNotMatch('Veja as lojas em emcasacomcecilia.com/en/coupons/shein', getStoreHostMention(), 'getStoreHostMention pegou o próprio site');
assert.match('cupom CECILIA010', codeAsCouponRegExp(['CECILIA010'])!, 'codeAsCouponRegExp não acha "cupom CECILIA010"');
assert.match('4CW5Y coupon', codeAsCouponRegExp(['4CW5Y'])!, 'codeAsCouponRegExp não acha "4CW5Y coupon"');
assert.match('할인 CECILIA010', codeAsCouponRegExp(['CECILIA010'])!, 'codeAsCouponRegExp não acha "할인 CECILIA010"');
assert.match('割引 CECILIA010', codeAsCouponRegExp(['CECILIA010'])!, 'codeAsCouponRegExp não acha "割引 CECILIA010"');
assert.doesNotMatch('Código CECILIA010', codeAsCouponRegExp(['CECILIA010'])!, 'codeAsCouponRegExp pegou "código"');
assert.equal(codeAsCouponRegExp([]), undefined, 'codeAsCouponRegExp sem código nenhum tem de ficar sem casador');
assert.deepEqual(urlHostsIn({ a: 'see https://ystyle.co/abc.' }), ['ystyle.co'], 'urlHostsIn não tira o host do meio da frase');
// Sem caminho, o ponto final da frase gruda no host: só o corte da pontuação devolve ystyle.co.
assert.deepEqual(urlHostsIn({ a: 'see https://ystyle.co.' }), ['ystyle.co'], 'urlHostsIn não tira a pontuação do fim da URL');
assert.deepEqual(
  deriveStoreHosts(['yesstyle'], () => [{ link: 'https://ystyle.co/x', site: 'https://emcasacomcecilia.com/en' }]),
  ['ystyle.co'],
  'deriveStoreHosts não tira só o host da loja'
);
assert.throws(
  () => deriveStoreHosts(['yesstyle'], () => []),
  /sem ystyle\.co: ou a derivação quebrou, ou o link de afiliado de yesstyle mudou de host.*SENTINEL_HOSTS/,
  'deriveStoreHosts sem registros tem de lançar'
);

// Lojas: a YesStyle e as lojas com página traduzida, cada uma levando à página dela no idioma, com o
// código do PT e o rótulo do idioma, que nunca chama o código de cupom.
// A YesStyle tem páginas estáticas próprias e já vem primeiro: se entrar em couponTranslations.ts, não repete.
const translatedSlugs = [...new Set(getTranslatedCouponRoutes().map((route) => route.slug))].filter((slug) => slug !== 'yesstyle');
const expectedSlugs = [...(getCouponBySlug('yesstyle') ? ['yesstyle'] : []), ...translatedSlugs];
assert.ok(expectedSlugs.length > 0, 'nenhuma loja parceira ativa com página traduzida');
const COUPON_WORDS = new RegExp(COUPON_WORD_LIST, 'iu');

for (const locale of LOCALE_HOME_LOCALES) {
  const stores = getLocaleHomeStores(locale);
  assert.deepEqual(stores.map((store) => store.slug), expectedSlugs, `${locale}: lojas`);
  for (const store of stores) {
    const pt = getCouponBySlug(store.slug);
    assert.ok(pt, `${store.slug} ativa em couponsData.ts`);
    const code = getStoreCode(pt);
    assert.equal(store.href, `/${locale}/coupons/${store.slug}`, `${locale}/${store.slug}: link`);
    assert.equal(store.code, code, `${locale}/${store.slug}: código diferente do PT`);
    assert.notEqual(store.category, pt.category, `${locale}/${store.slug}: categoria em português`);
    if (!code) continue;
    const kind = getStoreCodeKind(pt, code);
    assert.equal(store.codeLabel, getCodeTitle(getSidebarCopy(locale), kind, pt.brand), `${locale}/${store.slug}: rótulo`);
    if (!LABEL_SAME_AS_PORTUGUESE.has(`${locale}:${kind}`)) {
      assert.notEqual(store.codeLabel, getCodeTitle(getSidebarCopy('pt'), kind, pt.brand), `${locale}/${store.slug}: rótulo em português`);
    }
    assert.doesNotMatch(store.codeLabel ?? '', COUPON_WORDS, `${locale}/${store.slug}: código chamado de cupom`);
  }
}

// Conteúdo montado: artigos do idioma do mais novo ao mais antigo, até 6; nenhum link de loja.
for (const locale of LOCALE_HOME_LOCALES) {
  const content = getLocaleHomeContent(locale, publishedReviews);
  const listed = getPublishedReviewsForLocale(locale, publishedReviews);
  assert.ok(listed.length > 0, `${locale}: nenhum artigo publicado`);
  assert.equal(content.path, getLocaleHomePath(locale));
  assert.equal(content.hero.name, CECILIA_FULL_NAME);
  assert.deepEqual(
    content.articles.items.map((article) => article.slug),
    listed.slice(0, 6).map((review) => review.slug),
    `${locale}: artigos`
  );
  // A ordem, conferida pela data de cada artigo e não pela lista de onde ela saiu: do mais novo ao mais antigo.
  const publishedAt = new Map(listed.map((review) => [review.slug, review.publishedAtISO ?? '']));
  const dates = content.articles.items.map((article) => publishedAt.get(article.slug) ?? '');
  assert.ok(content.articles.items.length <= 6, `${locale}: no máximo 6 artigos`);
  assert.deepEqual(dates, [...dates].sort().reverse(), `${locale}: artigos do mais novo ao mais antigo`);
  assert.ok(content.articles.items.every((article) => article.href.startsWith(`/${locale}/reviews/`)), `${locale}: link de artigo`);
  assert.equal(content.articles.all.href, `/${locale}/reviews`);
  assert.ok(content.articles.all.label.includes(String(listed.length)), `${locale}: total de artigos`);
  assert.equal(content.faq.items.length, 4, `${locale}: 4 perguntas`);
  assert.deepEqual(
    content.faq.items[2].links?.map((link) => link.href),
    content.stores.items.map((store) => store.href),
    `${locale}: "onde uso" sem as páginas das lojas`
  );
  assert.equal(content.follow.networks.length, 4, `${locale}: 4 redes`);
  assert.doesNotMatch(JSON.stringify(content), getStoreHostMention(), `${locale}: link de loja na home`);
}

// hreflang: a raiz em português e as 9 homes, com o inglês de x-default.
const languages = getHomeLanguageLinks();
assert.deepEqual(
  Object.keys(languages).sort(),
  [...LOCALE_KEYS.map((locale) => LOCALES[locale].hreflang), 'x-default'].sort()
);
assert.equal(languages['pt-BR'], 'https://emcasacomcecilia.com');
for (const locale of LOCALE_HOME_LOCALES) {
  assert.equal(languages[LOCALES[locale].hreflang], `https://emcasacomcecilia.com/${locale}`, `hreflang de ${locale}`);
}
assert.equal(languages['x-default'], languages.en);

// As seções desenhadas em cada idioma: nada em português, nenhum link de loja, nenhum código chamado de
// cupom e nada escondido pela rolagem no HTML do servidor.
// A categoria e o título do código de cada loja da home em português, e não só os da YesStyle e da SHEIN.
const { categories: PT_STORE_CATEGORIES, codeTitles: PT_CODE_TITLES } = getPtStoreTexts();
const PT_ONLY_TEXTS = [
  ...Object.values(CECILIA_PHOTO_COPY_PT),
  'Da minha casa',
  'Mais sobre mim',
  'Entre no grupo de promoções',
  ...PT_STORE_CATEGORIES,
  ...PT_CODE_TITLES.map(({ title }) => title),
];
// Loja sem código é legítima: sem código nenhum não há o que conferir.
const CODE_AS_COUPON = codeAsCouponRegExp(
  expectedSlugs.map((slug) => getStoreCode(getCouponBySlug(slug)!)).filter((code): code is string => Boolean(code))
);
const decode = (text: string) =>
  text.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
// Os textos que aparecem na tela e os que o leitor de tela lê (alt e aria-label).
const visibleTexts = (html: string) => [
  ...[...html.matchAll(/>([^<>]+)</g)].map(([, text]) => decode(text).trim()),
  ...[...html.matchAll(/\s(?:alt|aria-label)="([^"]*)"/g)].map(([, text]) => decode(text).trim()),
].filter(Boolean);
// Fora do Next, o next/image não conhece os hosts do next.config.mjs, e a foto da Cecília vem do CDN.
const imageConfig: ImageConfigComplete = {
  ...imageConfigDefault,
  remotePatterns: IMAGE_REMOTE_PATTERNS as RemotePattern[],
};
const render = (element: ReturnType<typeof createElement>) =>
  renderToStaticMarkup(createElement(ImageConfigContext.Provider, { value: imageConfig }, element));
const hrefsOf = (html: string) => [...html.matchAll(/href="([^"]+)"/g)].map(([, href]) => decode(href));
const h1Count = (html: string) => (html.match(/<h1\b/g) ?? []).length;

for (const locale of LOCALE_HOME_LOCALES) {
  const content = getLocaleHomeContent(locale, publishedReviews);
  const ownTexts = new Set(entries(getLocaleHomeCopy(locale)).map(([, text]) => text));
  // O rótulo do código que é igual ao do português neste idioma (LABEL_SAME_AS_PORTUGUESE) não é texto em português.
  const sameAsPortuguese = PT_CODE_TITLES.filter(({ kind }) => LABEL_SAME_AS_PORTUGUESE.has(`${locale}:${kind}`)).map(({ title }) => title);
  const ptTexts = PT_ONLY_TEXTS.filter((text) => !ownTexts.has(text) && !sameAsPortuguese.includes(text));

  const hero = render(createElement(LocaleHomeHero, { hero: content.hero }));
  const stores = render(createElement(LocaleHomeStores, { stores: content.stores }));
  const articles = render(createElement(LocaleHomeArticles, { articles: content.articles }));
  const safety = render(createElement(LocaleHomeSafety, { safety: content.safety }));
  const faq = render(createElement(LocaleHomeFaq, { faq: content.faq }));
  const follow = render(createElement(LocaleHomeFollow, { follow: content.follow }));
  const all = [hero, stores, articles, safety, faq, follow].join('');
  const hrefs = hrefsOf(all);

  assert.equal(h1Count(all), 1, `${locale}: a home sem exatamente um H1`);
  assert.equal(h1Count(hero), 1, `${locale}: o H1 não está no hero`);
  assert.ok(hero.includes(CECILIA_FULL_NAME), `${locale}: hero sem o nome completo`);
  assert.ok(hero.includes(YESSTYLE_CERTIFICATE.title), `${locale}: hero sem o selo`);
  // O tipo do selo (com os anos) pelo texto já sem o escape do HTML, que muda de idioma para idioma (o apóstrofo do francês).
  assert.ok(content.hero.certificate.tier.includes(getCertificateYears()), `${locale}: o tipo do selo sem os anos`);
  assert.ok(visibleTexts(hero).includes(content.hero.certificate.tier), `${locale}: hero sem o tipo do selo`);
  assert.ok(hrefsOf(hero).includes(content.hero.mailto), `${locale}: hero sem o e-mail`);
  for (const { label } of content.hero.social) assert.ok(all.includes(`aria-label="${label}"`), `${locale}: sem ${label}`);
  // "See certificate" é um link para a imagem, que funciona sem JavaScript; a janela leva a imagem com
  // o texto do certificado no alt, no idioma.
  const certificate = content.hero.certificate;
  // Sem a entrada no mapa de entrega, o resolvedor devolve o caminho local e o link ainda passaria.
  assert.ok(certificate.image.src.startsWith('https://cdn.emcasacomcecilia.com/'), `${locale}: a imagem do certificado não está no CDN`);
  assert.ok(hero.includes(`href="${certificate.image.src}"`), `${locale}: sem o link do certificado`);
  assert.ok(hero.includes(`>${certificate.linkLabel}<`), `${locale}: sem o rótulo do link do certificado`);
  assert.ok(certificate.image.alt.includes(CECILIA_FULL_NAME) && certificate.image.alt.includes('SUPERSTAR'), `${locale}: alt do certificado`);
  // A janela inteira, para o título, o botão de fechar e a imagem estarem dentro dela e não soltos no hero.
  const dialog = hero.match(/<dialog\b[^>]*>[\s\S]*?<\/dialog>/)?.[0];
  assert.ok(dialog, `${locale}: sem a janela do certificado`);
  const attributeOf = (tag: string | undefined, name: string) => {
    const value = tag?.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
    return value === undefined ? undefined : decode(value);
  };
  assert.equal(attributeOf(dialog.match(/^<dialog\b[^>]*>/)?.[0], 'aria-label'), certificate.title, `${locale}: janela sem o nome`);
  assert.equal(attributeOf(dialog.match(/<button\b[^>]*>/)?.[0], 'aria-label'), certificate.closeLabel, `${locale}: janela sem o botão de fechar`);
  assert.equal(attributeOf(dialog.match(/<img\b[^>]*>/)?.[0], 'alt'), certificate.image.alt, `${locale}: a imagem da janela sem o alt do certificado`);
  for (const id of ['titulo-cecilia', 'titulo-lojas', 'titulo-artigos', 'titulo-seguro', 'titulo-perguntas', 'titulo-redes']) {
    assert.ok(all.includes(`id="${id}"`), `${locale}: sem a seção ${id}`);
  }
  for (const store of content.stores.items) {
    // O código e o rótulo dentro do cartão da própria loja, o <a> que leva à página dela.
    const card = stores.match(new RegExp(`<a [^>]*href="${escapeRegExp(store.href)}"[^>]*>.*?</a>`, 's'))?.[0];
    assert.ok(card, `${locale}: sem o cartão de ${store.brand}`);
    if (store.code) {
      assert.ok(store.codeLabel, `${locale}: ${store.brand} com código e sem o rótulo`);
      const texts = visibleTexts(card);
      assert.ok(texts.includes(store.code) && texts.includes(store.codeLabel), `${locale}: ${store.brand} sem o código no cartão`);
    }
  }
  for (const article of content.articles.items) assert.ok(articles.includes(`href="${article.href}"`), `${locale}: sem ${article.href}`);
  assert.ok(articles.includes(`href="${content.articles.all.href}"`), `${locale}: sem o link para todos os artigos`);
  assert.equal((safety.match(/<li\b/g) ?? []).length, 5, `${locale}: "É seguro?" sem os 5 itens`);
  assert.equal((faq.match(/<details\b/g) ?? []).length, 4, `${locale}: perguntas`);
  for (const network of content.follow.networks) assert.ok(follow.includes(`href="${network.href}"`), `${locale}: sem ${network.name}`);
  // O perfil é o mesmo nas quatro redes: o @ aparece uma vez só, não em cada botão.
  const handles = new Set(content.follow.networks.map((network) => network.handle));
  assert.equal(handles.size, 1, `${locale}: redes com perfis diferentes`);
  assert.equal(visibleTexts(follow).filter((text) => handles.has(text)).length, 1, `${locale}: o @ das redes não aparece uma vez só`);

  assert.deepEqual(hrefs.filter(isStoreLink), [], `${locale}: link de loja`);
  assert.deepEqual(visibleTexts(all).filter((text) => ptTexts.includes(text)), [], `${locale}: texto em português`);
  if (CODE_AS_COUPON) assert.doesNotMatch(visibleTexts(all).join(' '), CODE_AS_COUPON, `${locale}: código chamado de cupom`);
  assert.ok(!all.includes('data-reveal'), `${locale}: data-reveal no HTML do servidor`);
}

// O "<" do JSON-LD sai escapado: um texto com "</script>" não fecha a tag antes da hora.
assert.equal(serializeJsonLd({ text: '</script>' }), '{"text":"\\u003c/script>"}');
assert.deepEqual(JSON.parse(serializeJsonLd({ text: '</script>' })), { text: '</script>' });

// A página inteira: um H1, as seções na ordem aprovada e o JSON-LD com o Person e o FAQPage, cujas
// perguntas e respostas são as que aparecem na página.
const jsonLdScripts = (html: string) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(([, json]) => json);
const SECTION_ORDER = ['titulo-cecilia', 'titulo-lojas', 'titulo-artigos', 'titulo-seguro', 'titulo-perguntas', 'titulo-redes'];
for (const locale of LOCALE_HOME_LOCALES) {
  const content = getLocaleHomeContent(locale, publishedReviews);
  const page = render(createElement(LocaleHomePage, { content }));
  assert.equal(h1Count(page), 1, `${locale}: página sem um H1`);
  const positions = SECTION_ORDER.map((id) => page.indexOf(`id="${id}"`));
  assert.ok(positions.every((position) => position >= 0), `${locale}: seção faltando`);
  assert.deepEqual([...positions].sort((a, b) => a - b), positions, `${locale}: seções fora da ordem`);

  const scripts = jsonLdScripts(page);
  // O texto cru de cada script é o que o serializeJsonLd devolve: a página não serializa de outro jeito.
  for (const raw of scripts) assert.equal(raw, serializeJsonLd(JSON.parse(raw)), `${locale}: JSON-LD que não passa pelo serializeJsonLd`);
  const schemas = scripts.map((json) => JSON.parse(json));
  assert.deepEqual(schemas.map((schema) => schema['@type']).sort(), ['FAQPage', 'Person'], `${locale}: tipos do JSON-LD`);
  const person = schemas.find((schema) => schema['@type'] === 'Person');
  assert.equal(person.name, CECILIA_FULL_NAME);
  assert.equal(person.url, `https://emcasacomcecilia.com/${locale}`);
  assert.deepEqual(person.sameAs, content.follow.networks.map((network) => network.href));
  const faqPage = schemas.find((schema) => schema['@type'] === 'FAQPage');
  assert.equal(faqPage.inLanguage, content.htmlLang);
  const visibleFaq = [...page.matchAll(/<details\b[^>]*><summary\b[^>]*>([\s\S]*?)<\/summary><div\b[^>]*><p\b[^>]*>([\s\S]*?)<\/p>/g)].map(
    ([, question, answer]) => ({ question: decode(question.replace(/<[^>]+>/g, '')).trim(), answer: decode(answer).trim() })
  );
  assert.deepEqual(
    faqPage.mainEntity.map(({ name, acceptedAnswer }: { name: string; acceptedAnswer: { text: string } }) => ({ question: name, answer: acceptedAnswer.text })),
    visibleFaq,
    `${locale}: FAQPage diferente das perguntas na página`
  );
}

// Com um "<" no texto o escape fica observável: nenhum script da página leva o "<" cru, e o texto volta
// igual pelo JSON.parse. Sem isso, trocar o serializeJsonLd por JSON.stringify passaria despercebido.
const englishHome = getLocaleHomeContent('en', publishedReviews);
const MARKUP_ANSWER = 'Texto com <b>negrito</b> e </script> no meio.';
const markupPage = render(
  createElement(LocaleHomePage, {
    content: {
      ...englishHome,
      faq: { ...englishHome.faq, items: englishHome.faq.items.map((item, index) => (index === 0 ? { ...item, answer: MARKUP_ANSWER } : item)) },
    },
  })
);
const markupScripts = jsonLdScripts(markupPage);
assert.equal(markupScripts.length, 2, 'a página com "<" no FAQ sem os dois scripts de JSON-LD');
for (const raw of markupScripts) {
  assert.ok(!raw.includes('<'), 'JSON-LD com "<" cru dentro do script');
  assert.equal(raw, serializeJsonLd(JSON.parse(raw)));
}
assert.equal(JSON.parse(markupScripts.find((raw) => raw.includes('FAQPage'))!).mainEntity[0].acceptedAnswer.text, MARKUP_ANSWER);

console.log(`✅ locale home: ${LOCALE_HOME_LOCALES.length} idiomas, ${expectedSlugs.length} lojas e o certificado até ${YESSTYLE_CERTIFICATE.validUntil} passaram.`);
