import assert from 'node:assert/strict';
import { getActiveCoupons, getAllActiveCouponSlugs, getCouponBySlug, type CouponCodeOffer } from '../src/lib/couponsData';
import {
  TRANSLATED_LOCALES,
  getCouponLanguageLinks,
  getLocalizedCoupon,
  getTranslatedCouponRoutes,
  localizeCoupon,
  type CodeOfferTranslation,
  type TranslatedLocale,
} from '../src/lib/couponTranslations';
import { LOCALE_KEYS } from '../src/lib/i18n/locales';

// Cada texto de um objeto, com o caminho até ele.
const leaves = (value: unknown, path = ''): [string, string][] => {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((item, index) => leaves(item, `${path}[${index}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => leaves(item, path ? `${path}.${key}` : key));
  }
  return [];
};
const isUrl = (text: string) => /^https?:\/\//.test(text);

const routes = getTranslatedCouponRoutes();
const translatedSlugs = [...new Set(routes.map((route) => route.slug))];
assert.ok(translatedSlugs.includes('shein'), 'SHEIN deve ter páginas em outros idiomas');

for (const slug of translatedSlugs) {
  const pt = getCouponBySlug(slug);
  assert.ok(pt, `${slug}: rota traduzida sem cupom ativo em PT`);

  assert.deepEqual(
    routes.filter((route) => route.slug === slug).map((route) => route.locale),
    TRANSLATED_LOCALES,
    `${slug}: uma página por idioma fora do PT`
  );
  const links = getCouponLanguageLinks(slug);
  assert.deepEqual(Object.keys(links), LOCALE_KEYS, `${slug}: seletor de idioma com os ${LOCALE_KEYS.length} idiomas`);
  assert.equal(links.pt, `/cupons/${slug}`);
  assert.equal(links.en, `/en/coupons/${slug}`);

  // Texto com espaço é frase; código, data, slug e marca não têm espaço e podem repetir o PT.
  const ptProse = new Set(leaves(pt).map(([, text]) => text).filter((text) => /\s/.test(text) && !isUrl(text)));

  for (const locale of TRANSLATED_LOCALES) {
    const localized = getLocalizedCoupon(slug, locale);
    assert.ok(localized, `${slug}/${locale}: sem tradução`);

    // Códigos, datas e status vêm do PT: reconferir o cupom lá vale para todos os idiomas.
    for (const key of ['slug', 'brand', 'offerMode', 'status', 'lastVerified', 'officialUrl', 'affiliateAccountId'] as const) {
      assert.equal(localized[key], pt[key], `${slug}/${locale}: ${key} diferente do PT`);
    }
    assert.deepEqual(
      localized.referral && { code: localized.referral.code, verifiedAt: localized.referral.verifiedAt },
      pt.referral && { code: pt.referral.code, verifiedAt: pt.referral.verifiedAt },
      `${slug}/${locale}: código de indicação diferente do PT`
    );
    assert.deepEqual(
      localized.campaigns?.map(({ code, offerUrl, verifiedAt }) => ({ code, offerUrl, verifiedAt })),
      pt.campaigns?.map(({ code, offerUrl, verifiedAt }) => ({ code, offerUrl, verifiedAt })),
      `${slug}/${locale}: campanhas fora de ordem ou diferentes do PT`
    );
    assert.equal(
      localized.faqs.length,
      pt.faqs.length,
      `${slug}/${locale}: o PT ganhou ou perdeu pergunta no FAQ; atualize as traduções`
    );

    for (const [path, text] of leaves(localized)) {
      assert.ok(!ptProse.has(text), `${slug}/${locale}: texto em PT sobrou em ${path}`);
    }
    // Rótulos de uma palavra escapam da conferência acima; "oferta" também é espanhol.
    if (locale !== 'es') {
      assert.notEqual(localized.offerTypeLabel, pt.offerTypeLabel, `${slug}/${locale}: offerTypeLabel em PT`);
      assert.notEqual(localized.offerTypeLabelPlural, pt.offerTypeLabelPlural, `${slug}/${locale}: offerTypeLabelPlural em PT`);
    }
  }
}

const untranslated = getAllActiveCouponSlugs().find((slug) => !translatedSlugs.includes(slug));
assert.ok(untranslated, 'É preciso um cupom só em PT para conferir o caso sem tradução');
assert.deepEqual(getCouponLanguageLinks(untranslated), {}, 'Cupom só em PT não ganha seletor de idioma nem hreflang');
assert.equal(getLocalizedCoupon(untranslated, 'en'), undefined);

// SHEIN fora do PT: link neutro gerado pelo Bruno no painel (o PT segue no link brasileiro, conferido em
// test-coupon-offer-modes). Não conferir os links clicando: o clique registra atribuição.
const SHEIN_NEUTRAL_LINK = 'https://onelink.shein.com/55/6463grgxf6ru';
// O código de indicação e as campanhas são da SHEIN Brasil, e cada idioma avisa isso.
const SHEIN_BRAZIL: Record<TranslatedLocale, string> = {
  en: 'SHEIN Brazil',
  es: 'SHEIN Brasil',
  fr: 'SHEIN Brésil',
  de: 'SHEIN Brasilien',
  it: 'SHEIN Brasile',
  ko: 'SHEIN 브라질',
  ja: 'SHEIN ブラジル',
  'zh-hant': 'SHEIN 巴西站',
  'zh-hans': 'SHEIN 巴西站',
};

for (const locale of TRANSLATED_LOCALES) {
  const shein = getLocalizedCoupon('shein', locale);
  assert.ok(shein?.offerMode === 'affiliate-link', `shein/${locale}: deixou de ser oferta por link`);
  assert.equal(shein.offerUrl, SHEIN_NEUTRAL_LINK, `shein/${locale}: link principal não é o neutro`);
  assert.ok(shein.longDescription.includes(SHEIN_BRAZIL[locale]), `shein/${locale}: longDescription sem o aviso da SHEIN Brasil`);
  assert.ok(shein.linkNote?.includes(SHEIN_BRAZIL[locale]), `shein/${locale}: linkNote sem o aviso da SHEIN Brasil`);
  // Os 50% de novos usuários são da SHEIN Brasil e podem não valer em outro país.
  assert.doesNotMatch(`${shein.metaTitle} ${shein.metaDescription}`, /50\s?%/, `shein/${locale}: 50% no título ou na descrição`);
  for (const [path, text] of leaves(shein)) {
    if (!isUrl(text)) assert.ok(!text.includes('br.shein.com'), `shein/${locale}: br.shein.com no texto de ${path}`);
  }
}

// Hostinger fora do PT: o mesmo SONARDEOFERTAS no site internacional (o PT segue no /br, conferido em
// test-coupon-offer-modes). O código vai no link e nenhum texto manda digitá-lo.
const HOSTINGER_GLOBAL_LINK = 'https://www.hostinger.com/?REFERRALCODE=SONARDEOFERTAS';
assert.ok(translatedSlugs.includes('hostinger'), 'Hostinger deve ter páginas em outros idiomas');
// Como cada idioma diz "primeiro período", no aviso e nas regras.
const HOSTINGER_FIRST_TERM: Record<TranslatedLocale, string> = {
  en: 'first term',
  es: 'primer período',
  fr: 'première période',
  de: 'erste Laufzeit',
  it: 'primo periodo',
  ko: '첫 이용 기간',
  ja: '初回契約期間',
  'zh-hant': '首期',
  'zh-hans': '首期',
};
for (const locale of TRANSLATED_LOCALES) {
  const hostinger = getLocalizedCoupon('hostinger', locale);
  assert.ok(hostinger?.offerMode === 'affiliate-link', `hostinger/${locale}: deixou de ser oferta por link`);
  assert.equal(hostinger.offerUrl, HOSTINGER_GLOBAL_LINK, `hostinger/${locale}: link principal não é o global`);
  assert.equal(hostinger.referral, undefined, `hostinger/${locale}: indicação sem código de indicação na página`);
  assert.equal(hostinger.campaigns, undefined, `hostinger/${locale}: indicação sem campanhas`);
  for (const [field, text] of [['linkNote', hostinger.linkNote ?? ''], ['eligibleCategories', hostinger.eligibleCategories]]) {
    assert.ok(text.toLowerCase().includes(HOSTINGER_FIRST_TERM[locale].toLowerCase()), `hostinger/${locale}: ${field} não diz que os 20% são só do primeiro período`);
  }
  for (const [path, text] of leaves(hostinger)) {
    if (!isUrl(text)) assert.ok(!text.includes('SONARDEOFERTAS'), `hostinger/${locale}: código no texto de ${path}`);
  }
}

// Loja de código fictícia, a partir de uma loja de código de verdade e com tudo o que só existe em PT
// preenchido. Fora do PT, texto sem tradução some (nunca vai em português) e o código, as datas e o
// desconto vêm do PT.
const codeBase = getActiveCoupons().find(
  (coupon): coupon is CouponCodeOffer =>
    coupon.offerMode === 'discount-code' && !coupon.tiers?.length && Boolean(coupon.testNote && coupon.codeInstructions)
);
assert.ok(codeBase, 'É preciso uma loja de código testada, sem faixas, para montar a loja fictícia');
const codeStore: CouponCodeOffer = {
  ...codeBase,
  slug: 'loja-ficticia',
  offerActionLabel: 'Ir para a loja fictícia',
  codeFieldLabel: 'Cupom de desconto',
  monthlyHighlight: { scope: 'em todo o site', note: 'Soma com as promoções da loja' },
  history: [{ date: '01/10/2026', code: 'ANTIGO10', discount: '10% OFF', note: 'Código da campanha passada' }],
  featuredPitch: 'O código que mais rende na vitrine',
  socialImageAlt: 'Capa do guia do cupom da loja',
  relatedContent: [{ title: 'Como usar o cupom da loja', url: '/reviews/x', type: 'review', publishedAt: '2026-10-01' }],
};
const codeText = (locale: TranslatedLocale, extra: Partial<CodeOfferTranslation> = {}): CodeOfferTranslation => ({
  discount: `${locale} 20% off`,
  category: `${locale} category`,
  shortDescription: `${locale} short description`,
  longDescription: `${locale} long description`,
  metaTitle: `${locale} meta title`,
  metaDescription: `${locale} meta description`,
  eligibleCategories: `${locale} eligible products`,
  validity: `${locale} validity rule`,
  reusable: `${locale} reuse rule`,
  shipping: `${locale} shipping rule`,
  combinable: `${locale} stacking rule`,
  aboutBrand: `${locale} about the brand`,
  brandLogoAlt: `${locale} brand logo`,
  faqs: codeStore.faqs.map((_, index) => ({ question: `${locale} question ${index}?`, answer: `${locale} answer ${index}` })),
  ...extra,
});
const codeTranslation = (extra: Partial<CodeOfferTranslation> = {}) => ({
  offerMode: 'discount-code' as const,
  offerUrl: 'https://example.com/?ref=GLOBAL20',
  locales: Object.fromEntries(TRANSLATED_LOCALES.map((locale) => [locale, codeText(locale, extra)])) as Record<
    TranslatedLocale,
    CodeOfferTranslation
  >,
});
const codeStoreProse = new Set(leaves(codeStore).map(([, text]) => text).filter((text) => /\s/.test(text) && !isUrl(text)));

for (const locale of TRANSLATED_LOCALES) {
  const localized = localizeCoupon(codeStore, codeTranslation(), locale);
  assert.ok(localized.offerMode === 'discount-code', `loja fictícia/${locale}: deixou de ser loja de código`);
  for (const key of ['code', 'discountNumber', 'lastVerified', 'codeKind', 'slug', 'brand', 'status'] as const) {
    assert.equal(localized[key], codeStore[key], `loja fictícia/${locale}: ${key} diferente do PT`);
  }
  assert.equal(localized.offerUrl, 'https://example.com/?ref=GLOBAL20', `loja fictícia/${locale}: sem o link do idioma`);
  for (const key of [
    'offerTypeLabel',
    'offerTypeLabelPlural',
    'offerActionLabel',
    'testNote',
    'codeFieldLabel',
    'codeInstructions',
    'monthlyHighlight',
    'history',
    'featuredPitch',
    'socialImageAlt',
    'relatedContent',
  ] as const) {
    assert.equal(localized[key], undefined, `loja fictícia/${locale}: ${key} sem tradução não pode ir em português`);
  }
  for (const [path, text] of leaves(localized)) {
    assert.ok(!codeStoreProse.has(text), `loja fictícia/${locale}: texto em PT sobrou em ${path}`);
  }

  // Com a tradução, os campos opcionais entram no idioma.
  const translated = localizeCoupon(
    codeStore,
    codeTranslation({
      testNote: `${locale} test note`,
      codeInstructions: [`${locale} step one`],
      codeFieldLabel: `${locale} coupon field`,
      monthlyHighlight: { scope: `${locale} sitewide`, note: `${locale} stacks with sales` },
    }),
    locale
  );
  assert.ok(translated.offerMode === 'discount-code');
  assert.equal(translated.testNote, `${locale} test note`, `loja fictícia/${locale}: testNote traduzido não entrou`);
  assert.deepEqual(translated.codeInstructions, [`${locale} step one`]);
  assert.equal(translated.codeFieldLabel, `${locale} coupon field`);
  assert.equal(translated.monthlyHighlight?.scope, `${locale} sitewide`);
}

// Faixas trazem R$ e o aviso do Magazine Você; tradução de outro tipo de oferta é erro.
assert.throws(
  () => localizeCoupon({ ...codeStore, tiers: [{ code: 'FAIXA10', discount: 'R$ 10', minPurchase: 'R$ 100' }] }, codeTranslation(), 'en'),
  /faixas de desconto/
);
assert.throws(
  () => localizeCoupon(codeStore, { ...codeTranslation(), offerMode: 'affiliate-link' } as never, 'en'),
  /a tradução é de affiliate-link/
);

console.log(
  `✅ coupon translations: ${translatedSlugs.join(', ')} em ${TRANSLATED_LOCALES.length} idiomas além do PT; códigos, datas e campanhas iguais ao PT; loja de código fictícia sem texto em PT.`
);
