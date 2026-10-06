import assert from 'node:assert/strict';
import { getAllActiveCouponSlugs, getCouponBySlug } from '../src/lib/couponsData';
import {
  TRANSLATED_LOCALES,
  getCouponLanguageLinks,
  getLocalizedCoupon,
  getTranslatedCouponRoutes,
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
  assert.ok(shein);
  assert.equal(shein.offerUrl, SHEIN_NEUTRAL_LINK, `shein/${locale}: link principal não é o neutro`);
  assert.ok(shein.longDescription.includes(SHEIN_BRAZIL[locale]), `shein/${locale}: longDescription sem o aviso da SHEIN Brasil`);
  assert.ok(shein.linkNote?.includes(SHEIN_BRAZIL[locale]), `shein/${locale}: linkNote sem o aviso da SHEIN Brasil`);
  // Os 50% de novos usuários são da SHEIN Brasil e podem não valer em outro país.
  assert.doesNotMatch(`${shein.metaTitle} ${shein.metaDescription}`, /50\s?%/, `shein/${locale}: 50% no título ou na descrição`);
  for (const [path, text] of leaves(shein)) {
    if (!isUrl(text)) assert.ok(!text.includes('br.shein.com'), `shein/${locale}: br.shein.com no texto de ${path}`);
  }
}

console.log(
  `✅ coupon translations: ${translatedSlugs.join(', ')} em ${TRANSLATED_LOCALES.length} idiomas além do PT; códigos, datas e campanhas iguais ao PT.`
);
