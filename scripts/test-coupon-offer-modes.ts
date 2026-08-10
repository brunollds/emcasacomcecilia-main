import assert from 'node:assert/strict';
import {
  COUPONS,
  getCouponStats,
  type AffiliateLinkOffer,
} from '../src/lib/couponsData';

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
