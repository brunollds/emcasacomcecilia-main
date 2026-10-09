import assert from 'node:assert/strict';

import { getCodeTitle, getSidebarCopy } from '@/components/review/sidebarCopy';
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
import {
  LOCALE_HOME_LOCALES,
  getHomeLanguageLinks,
  getLocaleHomeContent,
  getLocaleHomePath,
  getLocaleHomeStores,
} from '@/lib/localeHome';
import { getPublishedReviewsForLocale } from '@/lib/review-hubs';

// Rótulo do código igual ao do PT só onde a palavra é a mesma nas duas línguas: "Código de recompensa"
// é assim em espanhol e em português. Chave: idioma:tipo do código.
const LABEL_SAME_AS_PORTUGUESE = new Set(['es:reward']);

// O certificado da YesStyle vale até validUntil, pela data UTC: depois disso a build para.
const todayUtc = new Date().toISOString().slice(0, 10);
assert.ok(
  isCertificateValid(todayUtc),
  `O certificado da YesStyle venceu em ${YESSTYLE_CERTIFICATE.validUntil}: troque a imagem e as datas em src/lib/ceciliaCredentials.ts pelo certificado novo, ou tire o selo da home de cada idioma.`
);
assert.equal(isCertificateValid(YESSTYLE_CERTIFICATE.validUntil), true, 'o último dia ainda vale');
assert.equal(isCertificateValid('2027-09-01'), false, 'o dia seguinte ao fim já não vale');
assert.equal(isCertificateValid('2026-08-08'), false, 'antes do início não vale');
assert.equal(getCertificateYears(), '2026–2027');

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

// Lojas: a YesStyle e as lojas com página traduzida, cada uma levando à página dela no idioma, com o
// código do PT e o rótulo do idioma, que nunca chama o código de cupom.
const translatedSlugs = [...new Set(getTranslatedCouponRoutes().map((route) => route.slug))];
const expectedSlugs = [...(getCouponBySlug('yesstyle') ? ['yesstyle'] : []), ...translatedSlugs];
assert.ok(expectedSlugs.length > 0, 'nenhuma loja parceira ativa com página traduzida');
const COUPON_WORDS = /coupons?|cup[oó]n|gutschein|쿠폰|クーポン|優惠碼|优惠码/iu;

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
  assert.doesNotMatch(JSON.stringify(content), /yesstyle\.com|shein\.com|onelink\./i, `${locale}: link de loja na home`);
}

// hreflang: a raiz em português e as 9 homes, com o inglês de x-default.
const languages = getHomeLanguageLinks();
assert.deepEqual(
  Object.keys(languages).sort(),
  [...LOCALE_KEYS.map((locale) => LOCALES[locale].hreflang), 'x-default'].sort()
);
assert.equal(languages['pt-BR'], 'https://emcasacomcecilia.com');
assert.equal(languages.en, 'https://emcasacomcecilia.com/en');
assert.equal(languages['x-default'], languages.en);

console.log(`✅ locale home: ${LOCALE_HOME_LOCALES.length} idiomas, ${expectedSlugs.length} lojas e o certificado até ${YESSTYLE_CERTIFICATE.validUntil} passaram.`);
