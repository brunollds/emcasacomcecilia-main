import assert from 'node:assert/strict';
import {
  COUPONS,
  getAllActiveCouponSlugs,
  getCouponBySlug,
  getCouponHubSections,
  getStoreCodeKind,
  type AffiliateLinkOffer,
} from '../src/lib/couponsData';

const shein = COUPONS.find((coupon) => coupon.slug === 'shein');
assert.ok(shein && shein.offerMode === 'affiliate-link', 'SHEIN deve existir como affiliate-link');
assert.equal('code' in shein, false, 'SHEIN não pode expor referral como coupon.code');
assert.equal('discountNumber' in shein, false, 'SHEIN não tem percentual fixo para o schema da oferta');
assert.equal(shein.affiliateAccountId, '6177013015');
assert.equal(shein.referral?.code, '4CW5Y');
assert.equal(shein.referral?.verifiedAt, '2026-09-01');
const sheinOfferUrl = new URL(shein.offerUrl);
assert.equal(sheinOfferUrl.hostname, 'br.shein.com');
assert.equal(sheinOfferUrl.searchParams.get('koc_id'), '6177013015');
assert.equal(sheinOfferUrl.searchParams.get('search_words'), '4CW5Y');
assert.deepEqual(
  shein.campaigns?.map(({ code, offerUrl }) => ({ code, offerUrl })),
  [
    { code: '37S3442', offerUrl: 'https://onelink.shein.com/47/5yl4fyr203o0' },
    { code: 'G326U6B', offerUrl: 'https://onelink.shein.com/47/5yl4h46pd93c' },
  ]
);
assert.ok(getAllActiveCouponSlugs().includes('shein'), 'SHEIN ativa deve gerar página de cupom');
assert.ok(!getAllActiveCouponSlugs().includes('kopenhagen'), 'Kopenhagen pausada não deve gerar página');

// O tipo do código nos artigos: o 4CW5Y da SHEIN é de indicação e o CECILIA010 da YesStyle é de recompensa;
// qualquer outro código, ou um código de outra loja, é cupom comum e fica sem tipo.
const sheinStore = getCouponBySlug('shein');
const yesStyleStore = getCouponBySlug('yesstyle');
const damieStore = getCouponBySlug('damie');
assert.ok(yesStyleStore?.offerMode === 'discount-code' && damieStore?.offerMode === 'discount-code');
assert.equal(getStoreCodeKind(sheinStore, '4CW5Y'), 'referral');
assert.equal(getStoreCodeKind(sheinStore, shein.campaigns?.[0].code), undefined, 'código de campanha da SHEIN não é o de indicação');
assert.equal(getStoreCodeKind(sheinStore, 'CECILIA010'), undefined, 'código de outra loja na SHEIN');
assert.equal(getStoreCodeKind(yesStyleStore, yesStyleStore.code), 'reward');
assert.equal(getStoreCodeKind(damieStore, damieStore.code), undefined, 'cupom comum não tem tipo');
assert.equal(getStoreCodeKind(damieStore, '4CW5Y'), undefined, 'código de indicação numa loja que não é a SHEIN');
assert.equal(getStoreCodeKind(undefined, '4CW5Y'), undefined, 'artigo sem loja');
assert.equal(getStoreCodeKind(sheinStore, undefined), undefined, 'artigo sem código');

const letsEatIt = COUPONS.find((coupon) => coupon.slug === 'letseatit');
assert.ok(letsEatIt && letsEatIt.offerMode === 'discount-code', "Let's Eat It deve existir como discount-code");
assert.equal(letsEatIt.code, 'MAUAD');
assert.equal(letsEatIt.discountNumber, 5);
// A comissão da parceria é atribuída pelos UTMs da Inbazz; perder um deles quebra o rastreio.
const letsEatItOfferUrl = new URL(letsEatIt.offerUrl);
assert.equal(letsEatItOfferUrl.hostname, 'letseatit.com.br');
assert.equal(letsEatItOfferUrl.searchParams.get('utm_source'), 'embaixador');
assert.equal(letsEatItOfferUrl.searchParams.get('utm_medium'), 'emcasacomcecilia');
assert.equal(letsEatItOfferUrl.searchParams.get('utm_campaign'), 'inbazz');
assert.equal(letsEatItOfferUrl.searchParams.get('utm_content'), 'organico');
assert.ok(getAllActiveCouponSlugs().includes('letseatit'), "Let's Eat It ativa deve gerar página de cupom");

const insider = COUPONS.find((coupon) => coupon.slug === 'insider');
assert.ok(insider && insider.offerMode === 'discount-code', 'Insider deve existir como discount-code');
assert.equal(insider.code, 'EMCASACOMCECILIA');
assert.equal(insider.discountNumber, 15);
assert.equal(insider.discount, '15% OFF');
// Link da Influ como veio: o parâmetro cupom= aplica o código no carrinho e os UTMs atribuem a comissão.
assert.equal(
  insider.offerUrl,
  'https://www.insiderstore.com.br/discount/EMCASACOMCECILIA?redirect=/collections/outlet/?utm_source=influmkt&utm_medium=3c994aaa&utm_campaign=EMCASACOMCECILIA&cupom=EMCASACOMCECILIA'
);
assert.equal(
  COUPONS.findIndex((coupon) => coupon.slug === 'insider'),
  COUPONS.findIndex((coupon) => coupon.slug === 'letseatit') + 1,
  "Insider vem logo depois da Let's Eat It"
);
assert.ok(getAllActiveCouponSlugs().includes('insider'), 'Insider ativa deve gerar página de cupom');

// "Cupom testado em" só vale com o teste registrado: toda loja com código precisa do testNote. A
// YesStyle fica de fora porque o código é de recompensa e a página dela é outra.
const untested = COUPONS.filter(
  (coupon) => coupon.status === 'ativo' && coupon.offerMode === 'discount-code' && !coupon.codeKind && !coupon.testNote?.trim()
).map((coupon) => coupon.slug);
assert.deepEqual(untested, [], `Lojas com código sem testNote: ${untested.join(', ')}`);

// Hub /cupons: a DAMIE abre os Destaques por ser a maior receita, e a Dolce Gusto vem logo depois.
const hub = getCouponHubSections();
assert.deepEqual(
  hub.featured.map((coupon) => coupon.slug),
  ['damie', 'dolce-gusto'],
  'Destaques: DAMIE primeiro, Dolce Gusto em seguida'
);
const shelved = hub.categories.flatMap((category) => category.coupons.map((coupon) => coupon.slug));
assert.deepEqual(
  [...shelved].sort(),
  [...getAllActiveCouponSlugs()].sort(),
  'Todo cupom ativo aparece em exatamente uma prateleira do hub'
);
const shelfOf = (slug: string) =>
  hub.categories.find((category) => category.coupons.some((coupon) => coupon.slug === slug))?.id;
assert.equal(shelfOf('damie'), 'casa', 'Destaque continua também na prateleira dele');
assert.equal(shelfOf('shein'), 'moda', 'Oferta por link entra numa prateleira como os códigos');
assert.ok(
  hub.categories.every((category) => category.coupons.length > 0),
  'Prateleira sem cupom ativo não aparece'
);

const source = COUPONS.find((coupon) => coupon.offerMode === 'discount-code');
assert.ok(source, 'É necessário ao menos um discount-code para montar o teste');

const {
  offerMode: _offerMode,
  code: _code,
  discountNumber: _discountNumber,
  codeFieldLabel: _codeFieldLabel,
  codeInstructions: _codeInstructions,
  history: _history,
  tiers: _tiers,
  ...base
} = source;

const affiliateLinkOffer: AffiliateLinkOffer = {
  ...base,
  offerMode: 'affiliate-link',
  slug: '__test-affiliate-link__',
  brand: 'Oferta por link de teste',
  discount: 'Benefício disponível pelo link',
  status: 'ativo',
  featured: false,
  hubCategory: 'diversos',
};

COUPONS.push(affiliateLinkOffer);

try {
  const withAffiliateLink = getCouponHubSections();
  const diversos = withAffiliateLink.categories.find((category) => category.id === 'diversos');
  assert.ok(
    diversos?.coupons.some((coupon) => coupon.slug === affiliateLinkOffer.slug),
    'Oferta por link nova entra na prateleira indicada'
  );
  assert.ok(
    !withAffiliateLink.featured.some((coupon) => coupon.slug === affiliateLinkOffer.slug),
    'Só entra nos Destaques quem tem featured'
  );
  assert.equal('code' in affiliateLinkOffer, false);
  assert.equal('discountNumber' in affiliateLinkOffer, false);
} finally {
  const testIndex = COUPONS.findIndex((coupon) => coupon.slug === affiliateLinkOffer.slug);
  if (testIndex !== -1) COUPONS.splice(testIndex, 1);
}

console.log("✅ coupon offer modes: SHEIN, Let's Eat It, Insider e prateleiras do hub conferidos.");
