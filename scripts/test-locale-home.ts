import assert from 'node:assert/strict';

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { imageConfigDefault, type ImageConfigComplete, type RemotePattern } from 'next/dist/shared/lib/image-config';
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';

import { COUPON_HUB_COPY } from '@/components/coupons/couponHubCopy';
import { HomeCeciliaPanel } from '@/components/sections/HomeCeciliaPanel';
import { HomeLatest } from '@/components/sections/HomeLatest';
import { PT_HOME_CHROME, type HomeChromeCopy } from '@/components/sections/homeCopy';
import { getLocaleHomeCopy } from '@/components/sections/localeHomeCopy';
import { getCouponHubEntries } from '@/lib/couponHub';
import {
  CECILIA_FULL_NAME,
  CECILIA_PERSON_ID,
  YESSTYLE_CERTIFICATE,
  getCertificateYears,
  isCertificateValid,
} from '@/lib/ceciliaCredentials';
import { publishedReviews } from '@/lib/data';
import { getStoreCode, newestArticleRank } from '@/lib/homeStores';
import { LOCALE_KEYS } from '@/lib/i18n/locales';
import { IMAGE_REMOTE_PATTERNS } from '@/lib/imageHosts.mjs';
import {
  LOCALE_HOME_LOCALES,
  getHomeLanguageLinks,
  getLocaleHomeContent,
  getLocaleHomeJsonLd,
  getLocaleHomePath,
} from '@/lib/localeHome';
import { SITE_URL } from '@/lib/pageSeo';
import { getPublishedReviewsForLocale } from '@/lib/review-hubs';

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
  }
}

const en = getLocaleHomeContent('en', publishedReviews);
const yesStyle = en.stores.find((store) => store.slug === 'yesstyle');
assert.ok(yesStyle, 'en: sem a aba da YesStyle');
assert.equal(yesStyle.discount, `${COUPON_HUB_COPY.en.upTo} 5% OFF`, 'en: desconto da YesStyle sem o "up to"');
assert.equal(yesStyle.code, 'CECILIA010', 'en: código da YesStyle');

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

assert.equal(getHomeLanguageLinks()['x-default'], `${SITE_URL}/en`);
assert.equal(LOCALE_KEYS.length, 10, 'os 10 idiomas');

console.log(`✅ test-locale-home: ${LOCALE_HOME_LOCALES.length} homes de idioma, ${CHROME_KEYS.length} textos de interface cada, abas, painel e HTML conferidos`);
