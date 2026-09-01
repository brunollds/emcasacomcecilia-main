import assert from 'node:assert/strict';
import {
  COUPONS,
  getAllActiveCouponSlugs,
  getCouponStats,
  type AffiliateLinkOffer,
} from '../src/lib/couponsData';

const shein = COUPONS.find((coupon) => coupon.slug === 'shein');
assert.ok(shein && shein.offerMode === 'affiliate-link', 'SHEIN deve existir como affiliate-link');
assert.equal('code' in shein, false, 'SHEIN não pode expor referral como coupon.code');
assert.equal('discountNumber' in shein, false, 'SHEIN não pode contaminar a média de descontos');
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
};

const baseline = getCouponStats();
COUPONS.push(affiliateLinkOffer);

try {
  const withAffiliateLink = getCouponStats();
  assert.equal(withAffiliateLink.activeCount, baseline.activeCount + 1);
  assert.equal(withAffiliateLink.averageDiscount, baseline.averageDiscount);
  assert.equal('code' in affiliateLinkOffer, false);
  assert.equal('discountNumber' in affiliateLinkOffer, false);
} finally {
  const testIndex = COUPONS.findIndex((coupon) => coupon.slug === affiliateLinkOffer.slug);
  if (testIndex !== -1) COUPONS.splice(testIndex, 1);
}

console.log('✅ coupon offer modes: affiliate-link não contamina a média de descontos.');
