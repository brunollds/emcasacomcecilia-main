import assert from 'node:assert/strict';
import { getCouponStorePath } from '@/lib/couponTranslations';
import { LOCALES, LOCALE_KEYS } from '@/lib/i18n/locales';
import { getLocaleHomePath } from '@/lib/localeHome';
import { REVIEW_CATEGORIES } from '@/lib/reviewDiscovery';
import { getReviewHubPath } from '@/lib/review-hubs';
import {
  getShellCommercialLinks,
  getShellCopy,
  getShellHomeHref,
} from '@/lib/i18n/shellDictionary';
import { getActiveNav, getShellMenu, type ActiveNav } from '@/lib/i18n/shellMenu';

assert.deepEqual(
  LOCALE_KEYS.map((locale) => LOCALES[locale].shortLabel),
  ['BR', 'US', 'ES', 'FR', 'DE', 'IT', 'KR', 'JP', 'HK', 'CN'],
);
assert.equal(new Set(LOCALE_KEYS.map((locale) => LOCALES[locale].shortLabel)).size, LOCALE_KEYS.length);

const ptCopy = getShellCopy('pt');

for (const locale of LOCALE_KEYS) {
  const commercialLinks = getShellCommercialLinks(locale);
  const copy = getShellCopy(locale);

  assert.ok(copy.openMenuLabel && copy.closeMenuLabel, `${locale}: rótulos do menu vazios`);
  if (locale !== 'pt') {
    assert.notEqual(copy.openMenuLabel, ptCopy.openMenuLabel, `${locale}: openMenuLabel igual ao PT`);
    assert.notEqual(copy.closeMenuLabel, ptCopy.closeMenuLabel, `${locale}: closeMenuLabel igual ao PT`);
  }

  assert.ok(copy.footerExploreLabel, `${locale}: footerExploreLabel vazio`);
  if (locale !== 'pt') {
    // "Explorar" é a mesma palavra em português e em espanhol.
    if (locale !== 'es') assert.notEqual(copy.footerExploreLabel, ptCopy.footerExploreLabel, `${locale}: footerExploreLabel igual ao PT`);
    else assert.equal(copy.footerExploreLabel, 'Explorar');
  }

  const menu = getShellMenu(locale);

  if (locale === 'pt') {
    assert.equal(getShellHomeHref(locale), '/');
    assert.deepEqual(commercialLinks, []);

    assert.deepEqual(menu.primary.map((item) => item.id), ['reviews', 'cupons', 'receitas']);
    assert.deepEqual(menu.primary.map((item) => item.href), ['/reviews', '/cupons', '/receitas']);
    assert.deepEqual(menu.primary.map((item) => item.label), ['Guias & Análises', 'Cupons', 'Receitas']);
    assert.deepEqual(menu.primary[0].children, [
      { id: 'reviews-all', href: '/reviews', label: 'Todos os guias e análises' },
      ...REVIEW_CATEGORIES.map(({ value, label }) => ({
        id: `categoria:${value}`,
        href: `/reviews?categoria=${value}`,
        label,
      })),
    ]);
    assert.equal(menu.primary[1].children, undefined);
    assert.equal(menu.primary[2].children, undefined);
    assert.deepEqual(menu.more, [
      { id: 'videos', href: '/videos', label: 'Vídeos' },
      { id: 'sobre', href: '/sobre', label: 'Sobre' },
      { id: 'faqs', href: '/faqs', label: 'FAQs' },
      { id: 'contato', href: '/contato', label: 'Contato' },
    ]);
    assert.equal(menu.moreLabel, 'Mais');
    assert.deepEqual(menu.searchLabels, { open: 'Abrir busca', close: 'Fechar busca' });
    assert.equal(menu.reviewsListLabel, 'Categorias de Guias & Análises');
    assert.deepEqual(menu.footerLabels, { house: 'Em Casa', partners: 'Parceiros' });
    assert.equal(menu.mediaKitLabel, 'Media Kit');
    continue;
  }

  const hubPath = getReviewHubPath(locale);
  // O logo e o seletor de idioma levam à home do idioma; a lista de artigos segue no menu.
  assert.equal(getShellHomeHref(locale), getLocaleHomePath(locale));

  assert.deepEqual(menu.primary, [{ id: 'reviews', href: hubPath, label: copy.reviewHubLabel }]);
  assert.deepEqual(menu.more, []);
  assert.equal(menu.moreLabel, null);
  assert.equal(menu.searchLabels, null);
  assert.equal(menu.reviewsListLabel, null);
  assert.equal(menu.footerLabels, null);
  assert.equal(menu.mediaKitLabel, null);

  const yesStyle = commercialLinks.find((link) => link.id === 'yesstyle');
  assert.ok(yesStyle.href);

  const shein = commercialLinks.find((link) => link.id === 'shein');
  assert.equal(shein.href, getCouponStorePath('shein', locale));
}

type ActiveRow = [string, string, ActiveNav['section'], ActiveNav['item'], ActiveNav['pageHref']];

const ptRows: ActiveRow[] = [
  ['/reviews', '', 'reviews', 'reviews-all', '/reviews'],
  ['/reviews/', '', 'reviews', 'reviews-all', '/reviews'],
  ['/reviews', '?categoria=produtos-experiencias&ordem=x', 'reviews', 'categoria:produtos-experiencias', '/reviews?categoria=produtos-experiencias'],
  ['/reviews', '?categoria=xyz', 'reviews', 'reviews-all', null],
  ['/reviews/poltrona-damie-e-boa', '', 'reviews', null, null],
  ['/reviews/loja/damie', '', 'reviews', null, null],
  ['/cupons', '?x=1', 'cupons', null, '/cupons'],
  ['/cupons/damie', '', 'cupons', null, null],
  ['/cupons/yesstyle', '', 'cupons', null, null],
  ['/receitas', '', 'receitas', null, '/receitas'],
  ['/receitas/bolo', '', 'receitas', null, null],
  ['/videos', '', 'more', 'videos', '/videos'],
  ['/videos/abc', '', 'more', 'videos', null],
  ['/sobre', '', 'more', 'sobre', '/sobre'],
  ['/faqs', '', 'more', 'faqs', '/faqs'],
  ['/contato', '', 'more', 'contato', '/contato'],
  ['/', '', null, null, null],
  ['/buscar', '?q=a', null, null, null],
  ['/black-friday', '', null, null, null],
  ['/categorias', '', null, null, null],
  ['/reviewsx', '', null, null, null],
];

const enRows: ActiveRow[] = [
  ['/en/reviews', '', 'reviews', null, '/en/reviews'],
  ['/en/reviews/how-to-find-valid-yesstyle-coupon-codes', '', 'reviews', null, null],
  ['/en/coupons/yesstyle', '', 'yesstyle', null, '/en/coupons/yesstyle'],
  ['/en/coupons/yesstyle/x', '', 'yesstyle', null, null],
  ['/en/coupons/shein', '', 'shein', null, '/en/coupons/shein'],
  ['/en/coupons/temu', '', null, null, null],
  ['/en', '', null, null, null],
];

for (const [locale, rows] of [['pt', ptRows], ['en', enRows]] as const) {
  for (const [pathname, search, section, item, pageHref] of rows) {
    assert.deepEqual(
      getActiveNav(pathname, search, locale),
      { section, item, pageHref },
      `${locale} ${pathname}${search}`,
    );
  }
}

console.log(`✅ shell navigation: ${LOCALE_KEYS.length} locales passaram`);
