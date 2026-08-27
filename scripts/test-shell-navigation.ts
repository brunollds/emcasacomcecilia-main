import assert from 'node:assert/strict';
import { LOCALE_KEYS } from '@/lib/i18n/locales';
import { getReviewHubPath } from '@/lib/review-hubs';
import {
  getShellCommercialLinks,
  getShellHomeHref,
  getShellLanguageHubHref,
  getShellNavLinks,
} from '@/lib/i18n/shellDictionary';

for (const locale of LOCALE_KEYS) {
  const navLinks = getShellNavLinks(locale);
  const commercialLinks = getShellCommercialLinks(locale);

  if (locale === 'pt') {
    assert.equal(getShellHomeHref(locale), '/');
    assert.equal(getShellLanguageHubHref(locale), '/reviews');
    assert.equal(navLinks.find((link) => link.href === '/contato')?.desktop, false);
    assert.equal(navLinks.find((link) => link.href === '/faqs')?.desktop, false);
    assert.deepEqual(commercialLinks, []);
    continue;
  }

  const hubPath = getReviewHubPath(locale);
  assert.deepEqual(navLinks.map((link) => link.href), [hubPath]);
  assert.equal(getShellHomeHref(locale), hubPath);
  assert.equal(getShellLanguageHubHref(locale), hubPath);

  const yesStyle = commercialLinks.find((link) => link.id === 'yesstyle');
  assert.ok(yesStyle.href);

  const shein = commercialLinks.find((link) => link.id === 'shein');
  assert.equal(shein.href, '/cupons/shein');
  assert.equal(shein.hrefLang, 'pt-BR');
}

console.log(`✅ shell navigation: ${LOCALE_KEYS.length} locales passaram`);
