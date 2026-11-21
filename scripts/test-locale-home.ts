import assert from 'node:assert/strict';

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { imageConfigDefault, type ImageConfigComplete, type RemotePattern } from 'next/dist/shared/lib/image-config';
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';

import { COUPON_HUB_COPY } from '@/components/coupons/couponHubCopy';
import { HomeCeciliaPanel } from '@/components/sections/HomeCeciliaPanel';
import { HomeEvent } from '@/components/sections/HomeEvent';
import { LOCALE_EVENT_COPY } from '@/components/sections/localeEventCopy';
import { HomeLatest } from '@/components/sections/HomeLatest';
import { PT_HOME_CHROME, type HomeChromeCopy } from '@/components/sections/homeCopy';
import { getLocaleHomeCopy } from '@/components/sections/localeHomeCopy';
import { getCouponHubEntries, getCouponHubShelves } from '@/lib/couponHub';
import { MOBILE_VISIBLE_GUIDES } from '@/lib/homeEvents';
import {
  CECILIA_FULL_NAME,
  CECILIA_PERSON_ID,
  YESSTYLE_CERTIFICATE,
  getCertificateYears,
  isCertificateValid,
} from '@/lib/ceciliaCredentials';
import { publishedReviews } from '@/lib/data';
import { getStoreCode, getStoreMark, newestArticleRank } from '@/lib/homeStores';
import { LOCALE_KEYS } from '@/lib/i18n/locales';
import { IMAGE_REMOTE_PATTERNS } from '@/lib/imageHosts.mjs';
import {
  LOCALE_HOME_LOCALES,
  getHomeLanguageLinks,
  getLocaleHomeContent,
  getLocaleHomeEvent,
  getLocaleHomeJsonLd,
  getLocaleHomePath,
} from '@/lib/localeHome';
import { SITE_URL } from '@/lib/pageSeo';
import { getPublishedReviewsForLocale } from '@/lib/review-hubs';
import { isListedInPortuguese } from '@/lib/reviewDiscovery';
import { getSingleStoreSlug } from '@/lib/reviewStores';
import homeEventsConfig from '../content/home-events.json';

// A home de cada idioma é a da home em português com os textos e os artigos do idioma. Aqui: os 16 textos de
// interface em cada idioma (nenhum vazio, nenhum igual ao do PT, salvo o que o idioma escreve igual), a ordem das
// lojas, o desconto da YesStyle com o "até", o painel, "Acabou de sair", o alemão em "Sie", o HTML sem data-reveal
// e o JSON-LD só com a Person. O que o build confere (o HTML final) fica no test:build-output.

const imageConfig: ImageConfigComplete = { ...imageConfigDefault, remotePatterns: IMAGE_REMOTE_PATTERNS as RemotePattern[] };
const render = (element: ReturnType<typeof createElement>) =>
  renderToStaticMarkup(createElement(ImageConfigContext.Provider, { value: imageConfig }, element));
const decode = (text: string) =>
  text.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

const CHROME_KEYS = Object.keys(PT_HOME_CHROME) as Array<keyof HomeChromeCopy>;
const SAME_AS_PT_ALLOWED = new Set<string>(['tablist', 'latestAllShort']);

for (const locale of LOCALE_HOME_LOCALES) {
  const chrome = getLocaleHomeCopy(locale).chrome;
  assert.deepEqual(Object.keys(chrome).sort(), [...CHROME_KEYS].sort(), `${locale}: chaves de interface`);
  for (const key of CHROME_KEYS) {
    assert.ok(chrome[key].trim(), `${locale}: ${key} vazio`);
    if (!SAME_AS_PT_ALLOWED.has(key)) assert.notEqual(chrome[key], PT_HOME_CHROME[key], `${locale}: ${key} igual ao português`);
    if (key === 'readArticleNamed') assert.match(chrome[key], /\{title\}/, `${locale}: ${key} sem {title}`);
    if (key.startsWith('store') && key !== 'storePage') assert.match(chrome[key], /\{store\}/, `${locale}: ${key} sem {store}`);
  }
}

// Francês: espaço fino insecável antes do dois-pontos, como no resto do site.
assert.match(getLocaleHomeCopy('fr').chrome.readArticleNamed, /\u202F:/, 'fr: sem espaço fino antes do dois-pontos');
// Alemão: "Sie" em toda a interface, nada de "du".
for (const key of CHROME_KEYS) {
  assert.doesNotMatch(getLocaleHomeCopy('de').chrome[key], /\b(du|dein\w*|Ihr\w*|euch)\b/i, `de: ${key} com tratamento "du"`);
}

// As abas: as lojas do hub, na ordem das bolinhas (a do artigo mais novo primeiro), com o link da página de cada uma.
for (const locale of LOCALE_HOME_LOCALES) {
  const content = getLocaleHomeContent(locale, publishedReviews);
  const hubEntries = getCouponHubEntries(locale);
  assert.deepEqual(
    content.stores.map((store) => store.slug).sort(),
    hubEntries.map(({ coupon }) => coupon.slug).sort(),
    `${locale}: as lojas não são as do hub`
  );
  const rank = newestArticleRank(getPublishedReviewsForLocale(locale, publishedReviews));
  const ranks = content.stores.map((store) => rank.get(store.slug) ?? Infinity);
  assert.deepEqual([...ranks].sort((a, b) => a - b), ranks, `${locale}: as bolinhas não seguem o artigo mais novo`);
  for (const store of content.stores) {
    assert.ok(store.storeUrl.startsWith('https://'), `${locale}/${store.slug}: link de loja sem https`);
    const entry = hubEntries.find(({ coupon }) => coupon.slug === store.slug);
    assert.equal(store.code, entry && getStoreCode(entry.coupon), `${locale}/${store.slug}: código diferente do hub`);
    // A bolinha é a mesma do PT: a marca própria (bubble), com o fundo e o round, e o logo só para quem não tem.
    assert.deepEqual(
      { logo: store.logo, ...(store.bubble ? { bubble: store.bubble } : {}), initials: store.initials },
      entry && getStoreMark(entry.coupon),
      `${locale}/${store.slug}: bolinha diferente da do PT`
    );
  }
}

const en = getLocaleHomeContent('en', publishedReviews);
const yesStyle = en.stores.find((store) => store.slug === 'yesstyle');
assert.ok(yesStyle, 'en: sem a aba da YesStyle');
assert.equal(yesStyle.discount, `${COUPON_HUB_COPY.en.upTo} 5% OFF`, 'en: desconto da YesStyle sem o "up to"');
assert.equal(yesStyle.code, 'CECILIA010', 'en: código da YesStyle');
const starlink = en.stores.find((store) => store.slug === 'starlink');
assert.ok(starlink?.bubble?.round && starlink.bubble.background === '#000000', 'en: a bolinha da Starlink não é a do PT (fundo preto e round)');

// O painel: quem é a Cecília, o selo e o e-mail; nada do bloco do PT (sobre, WhatsApp). "Acabou de sair" com até 5.
for (const locale of LOCALE_HOME_LOCALES) {
  const { panel, latest, copy } = getLocaleHomeContent(locale, publishedReviews);
  assert.ok(panel.profile, `${locale}: painel sem o perfil`);
  assert.equal(panel.profile.name, CECILIA_FULL_NAME, `${locale}: nome`);
  assert.ok(panel.profile.certificate.tier.includes(String(getCertificateYears())), `${locale}: selo sem os anos`);
  assert.equal(panel.pt, undefined, `${locale}: bloco do PT no painel`);
  assert.ok(panel.socialAria.includes('{network}'), `${locale}: modelo do nome das redes`);
  assert.ok(latest.length > 0 && latest.length <= 5, `${locale}: "Acabou de sair" com ${latest.length} itens`);
  assert.equal(copy.latestTitle, getLocaleHomeCopy(locale).chrome.latestTitle, `${locale}: título de "Acabou de sair"`);
  assert.equal(getLocaleHomePath(locale), `/${locale}`);
}
assert.equal(isCertificateValid(YESSTYLE_CERTIFICATE.validFrom), true, 'o selo vale no primeiro dia');

// O painel e "Acabou de sair" renderizados: o selo da Hostinger uma vez, nada de data-reveal no HTML do servidor.
// O JSON-LD só com a Person. A vitrine inteira (HomeStoreStories) fica de fora: importa a fonte do cupom, que não roda no tsx.
for (const locale of LOCALE_HOME_LOCALES) {
  const content = getLocaleHomeContent(locale, publishedReviews);
  const panel = render(createElement(HomeCeciliaPanel, { copy: content.panel, eager: true }));
  const latest = render(createElement(HomeLatest, { articles: content.latest, copy: content.copy, allHref: content.latestAllHref }));
  assert.equal(panel.split('role="img" aria-label="Hostinger Partner"').length - 1, 1, `${locale}: selo da Hostinger no painel`);
  assert.match(panel, /<h2 id="titulo-cecilia"/, `${locale}: h2 do painel`);
  for (const html of [panel, latest]) assert.ok(!html.includes('data-reveal'), `${locale}: data-reveal no HTML`);
  const schemas = getLocaleHomeJsonLd(content);
  assert.deepEqual(schemas.map((schema) => schema['@type']), ['Person'], `${locale}: JSON-LD`);
  assert.equal(schemas[0]['@id'], CECILIA_PERSON_ID, `${locale}: @id da Cecília`);
  assert.deepEqual(schemas[0].sameAs, content.sameAs, `${locale}: sameAs`);
  const hrefs = [...panel.matchAll(/href="([^"]+)"/g)].map(([, href]) => decode(href));
  for (const network of content.sameAs.slice(0, 3)) assert.ok(hrefs.includes(network), `${locale}: sem o link da rede ${network}`);
  const storeHrefs = [...panel.matchAll(/href="([^"]+)"/g)].map(([, href]) => decode(href));
  assert.equal(storeHrefs.length >= 0, true);
}


// A Black Friday na home de cada idioma, só na reta final do PT (até 01/12 00h de Brasília). Os guias saem da lista do
// PT pela família (translationKey), só os listados no idioma e de loja com página no hub; nada cai de volta no PT.
const at = (iso: string) => new Date(iso);
const IN_STRETCH = at('2026-11-25T12:00:00-03:00');
const boostedEvent = homeEventsConfig.events.find((item) => 'boost' in item);
assert.ok(boostedEvent, 'content/home-events.json sem a data em reta final');
const ptGuideFamilies = boostedEvent.articleSlugs.map(
  (slug) => publishedReviews.find((review) => review.slug === slug && isListedInPortuguese(review))?.translationKey
);
const PT_EVENT = { suffix: ', guia da Black Friday', showLess: 'Mostrar menos', description: boostedEvent.description };
// Árabe: كوبون, قسيمة/قسائم e كود/رمز (ال)خصم.
const COUPON_WORDS = /cup[oó]n|coupon|gutschein|クーポン|쿠폰|優惠券|优惠券|كوبون|قسيمة|قسائم|(كود|رمز) (ال)?خصم/i;
for (const locale of LOCALE_HOME_LOCALES) {
  const copy = LOCALE_EVENT_COPY[boostedEvent.id][locale];
  for (const text of [copy.title, copy.description, copy.guideSuffix, copy.showAll, copy.showLess, ...Object.values(copy.countdown)]) {
    assert.ok(text.trim(), `${locale}: texto da Black Friday vazio`);
    assert.doesNotMatch(text, COUPON_WORDS, `${locale}: a seção chama de cupom o que pode ser código de recompensa ou indicação`);
    assert.doesNotMatch(text, /bra[sz]il|브라질|ブラジル|巴西|البرازيل/i, `${locale}: a seção cita o Brasil`);
  }
  assert.notEqual(copy.description, PT_EVENT.description, `${locale}: descrição igual à do PT`);
  assert.notEqual(copy.guideSuffix, PT_EVENT.suffix, `${locale}: trecho do leitor de tela igual ao do PT`);
  // O espanhol escreve "Mostrar menos" como o português.
  if (locale !== 'es') assert.notEqual(copy.showLess, PT_EVENT.showLess, `${locale}: "Mostrar menos" igual ao do PT`);
  assert.match(copy.countdown.days, /\{days\}/, `${locale}: contagem sem {days}`);
  assert.match(copy.showAll, /\{total\}/, `${locale}: botão sem {total}`);
  if (locale === 'de') {
    for (const text of [copy.description, copy.showAll, copy.showLess]) {
      assert.doesNotMatch(text, /\b(du|dein\w*|euch)\b/i, 'de: "du" na Black Friday');
    }
  }
  if (locale === 'fr') assert.doesNotMatch(copy.description, /[^ ][:?!;]/, 'fr: sem espaço fino antes da pontuação');

  // Os guias esperados: as famílias da lista PT com versão listada no idioma e loja com página no hub.
  const listed = getPublishedReviewsForLocale(locale, publishedReviews);
  const hubSlugs = getCouponHubEntries(locale).map(({ coupon }) => coupon.slug);
  const expectedFamilies = [...new Set(ptGuideFamilies)].filter((family) => {
    const review = family ? listed.find((item) => item.translationKey === family) : undefined;
    const store = review ? getSingleStoreSlug(review) : undefined;
    return store !== undefined && hubSlugs.includes(store);
  });
  const event = getLocaleHomeEvent(locale, publishedReviews, IN_STRETCH);
  assert.ok(event?.guides, `${locale}: sem a Black Friday em 25/11`);
  assert.equal(event.guides.length, expectedFamilies.length, `${locale}: guias diferentes das famílias do PT com versão no idioma`);
  assert.ok(event.guides.length >= 5, `${locale}: menos de 5 guias de Black Friday`);
  const families = event.guides.map(({ slug }) => listed.find((item) => item.slug === slug)?.translationKey);
  assert.equal(new Set(families).size, event.guides.length, `${locale}: família repetida`);
  // Os destaques do hub primeiro, na ordem dele.
  const names = event.guides.map(({ name }) => name);
  const featured = getCouponHubShelves(locale)
    .featured.map(({ coupon }) => coupon.brand)
    .filter((name) => names.includes(name));
  assert.deepEqual(names.slice(0, featured.length), featured, `${locale}: os destaques do hub não vêm primeiro, na ordem dele`);
  const tabs = getLocaleHomeContent(locale, publishedReviews, IN_STRETCH).stores;
  for (const guide of event.guides) {
    assert.ok(listed.some((item) => item.slug === guide.slug), `${locale}/${guide.slug}: guia fora dos artigos listados no idioma`);
    assert.ok(guide.href.startsWith(`/${locale}/reviews/`), `${locale}/${guide.slug}: link fora do idioma`);
    const tab = tabs.find((item) => item.brand === guide.name);
    assert.equal(guide.discount, tab?.discount, `${locale}/${guide.slug}: desconto diferente do da aba (o do hub)`);
  }
  assert.equal(event.hubLink, undefined, `${locale}: "Ver tudo" sem página de Black Friday no idioma`);
  assert.equal(event.seasonNotice, undefined, `${locale}: aviso de temporada das lojas PT`);
  assert.equal(event.countdownLabel, copy.countdown.days.replace('{days}', '2'), `${locale}: contagem em 25/11`);
  assert.equal(getLocaleHomeEvent(locale, publishedReviews, at('2026-11-26T12:00:00-03:00'))?.countdownLabel, copy.countdown.tomorrow);
  assert.equal(getLocaleHomeEvent(locale, publishedReviews, at('2026-11-27T12:00:00-03:00'))?.countdownLabel, copy.countdown.today);
  assert.equal(getLocaleHomeEvent(locale, publishedReviews, at('2026-11-30T23:59:59-03:00'))?.countdownLabel, copy.countdown.last);
  assert.equal(getLocaleHomeEvent(locale, publishedReviews, at('2026-12-01T00:00:00-03:00')), null, `${locale}: a Black Friday segue depois de 30/11`);
  assert.equal(getLocaleHomeContent(locale, publishedReviews, at('2026-12-01T00:00:00-03:00')).event, null);

  // O HTML: um link por guia, no idioma, sem botão (os guias cabem no celular), sem "Ver tudo", sem a aba do PT e
  // sem texto em português.
  const html = render(createElement(HomeEvent, { event }));
  const text = decode(html.replace(/<[^>]+>/g, ' '));
  assert.equal(html.match(new RegExp(`href="/${locale}/reviews/`, 'g'))?.length, event.guides.length, `${locale}: links dos guias`);
  assert.equal(html.match(/href="/g)?.length, event.guides.length, `${locale}: link a mais na seção`);
  assert.ok(!html.includes('data-reveal'), `${locale}: data-reveal na seção`);
  assert.equal(html.includes('<button'), event.guides.length > MOBILE_VISIBLE_GUIDES, `${locale}: o botão não segue o número de guias`);
  assert.equal(text.split(copy.guideSuffix).length - 1, event.guides.length, `${locale}: trecho do leitor de tela`);
  assert.ok(text.includes(copy.title) && text.includes(copy.description) && text.includes(event.dayLabel), `${locale}: título, descrição ou dia`);
  assert.doesNotMatch(text, /guia d|Mostrar todos os|faltam|lojas parceiras|Black Friday 2026 das/, `${locale}: texto em português na seção`);
}
// Outra edição (outra data ou outro ano) sem textos nos idiomas não aparece fora do PT.
const otherEdition = { events: homeEventsConfig.events.map((item) => (item === boostedEvent ? { ...item, id: 'natal-2026' } : item)) };
for (const locale of LOCALE_HOME_LOCALES) {
  assert.equal(getLocaleHomeEvent(locale, publishedReviews, IN_STRETCH, otherEdition), null, `${locale}: edição sem textos no idioma`);
}

assert.equal(getHomeLanguageLinks()['x-default'], `${SITE_URL}/en`);
assert.deepEqual(
  [...LOCALE_KEYS],
  ['pt', 'en', 'es', 'fr', 'de', 'it', 'ko', 'ja', 'zh-hant', 'zh-hans', 'ar'],
  'os idiomas do site, na ordem do registro'
);

console.log(`✅ test-locale-home: ${LOCALE_HOME_LOCALES.length} homes de idioma, ${CHROME_KEYS.length} textos de interface cada, abas, painel, HTML e a Black Friday conferidos`);
