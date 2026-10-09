import assert from 'node:assert/strict';
import { getCouponStorePath } from '@/lib/couponTranslations';
import { LOCALES, LOCALE_KEYS } from '@/lib/i18n/locales';
import { getLocaleHomePath } from '@/lib/localeHome';
import { getReviewHubPath } from '@/lib/review-hubs';
import {
  getShellCommercialLinks,
  getShellHomeHref,
  getShellNavLinks,
} from '@/lib/i18n/shellDictionary';
assert.deepEqual(
  LOCALE_KEYS.map((locale) => LOCALES[locale].shortLabel),
  ['BR', 'US', 'ES', 'FR', 'DE', 'IT', 'KR', 'JP', 'HK', 'CN'],
);
assert.equal(new Set(LOCALE_KEYS.map((locale) => LOCALES[locale].shortLabel)).size, LOCALE_KEYS.length);

for (const locale of LOCALE_KEYS) {
  const navLinks = getShellNavLinks(locale);
  const commercialLinks = getShellCommercialLinks(locale);

  if (locale === 'pt') {
    assert.equal(getShellHomeHref(locale), '/');
    assert.equal(navLinks.find((link) => link.href === '/contato')?.desktop, false);
    assert.equal(navLinks.find((link) => link.href === '/faqs')?.desktop, false);
    assert.deepEqual(commercialLinks, []);
    continue;
  }

  const hubPath = getReviewHubPath(locale);
  assert.deepEqual(navLinks.map((link) => link.href), [hubPath]);
  // O logo e o seletor de idioma levam à home do idioma; a lista de artigos segue no menu.
  assert.equal(getShellHomeHref(locale), getLocaleHomePath(locale));

  const yesStyle = commercialLinks.find((link) => link.id === 'yesstyle');
  assert.ok(yesStyle.href);

  const shein = commercialLinks.find((link) => link.id === 'shein');
  assert.equal(shein.href, getCouponStorePath('shein', locale));
}

console.log(`✅ shell navigation: ${LOCALE_KEYS.length} locales passaram`);
