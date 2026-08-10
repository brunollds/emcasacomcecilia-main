import assert from 'node:assert/strict';
import {
  getCouponBrandFromHref,
  getInternalHref,
  isCouponPageLink,
  isInternalLink,
} from '../src/lib/internalLinks';

const cases = [
  {
    href: '/cupons/damie',
    internal: true,
    couponPage: true,
    normalized: '/cupons/damie',
    brand: 'damie',
  },
  {
    href: 'https://emcasacomcecilia.com/cupons/damie?x=1#regras',
    internal: true,
    couponPage: true,
    normalized: '/cupons/damie?x=1#regras',
    brand: 'damie',
  },
  {
    href: '//www.emcasacomcecilia.com/en/coupons/yesstyle',
    internal: true,
    couponPage: true,
    normalized: '/en/coupons/yesstyle',
    brand: 'yesstyle',
  },
  {
    href: '/cupons',
    internal: true,
    couponPage: true,
    normalized: '/cupons',
    brand: undefined,
  },
  {
    href: '/en/coupons/',
    internal: true,
    couponPage: true,
    normalized: '/en/coupons/',
    brand: undefined,
  },
  {
    href: '/blog/cupons-de-julho',
    internal: true,
    couponPage: false,
    normalized: '/blog/cupons-de-julho',
    brand: undefined,
  },
  {
    href: 'https://example.com/cupons/damie',
    internal: false,
    couponPage: false,
    normalized: 'https://example.com/cupons/damie',
    brand: undefined,
  },
  {
    href: '#faq',
    internal: true,
    couponPage: false,
    normalized: '#faq',
    brand: undefined,
  },
] as const;

for (const testCase of cases) {
  assert.equal(isInternalLink(testCase.href), testCase.internal, `${testCase.href}: internal`);
  assert.equal(isCouponPageLink(testCase.href), testCase.couponPage, `${testCase.href}: coupon page`);
  assert.equal(getInternalHref(testCase.href), testCase.normalized, `${testCase.href}: normalized`);
  assert.equal(getCouponBrandFromHref(testCase.href), testCase.brand, `${testCase.href}: brand`);
}

console.log(`✅ internalLinks: ${cases.length} casos passaram.`);
