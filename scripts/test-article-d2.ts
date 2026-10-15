import assert from 'node:assert/strict';
import { pickRelatedReviews } from '@/lib/relatedReviews';
import { getArticleStoreBlock, shortenRule } from '@/lib/articleStore';
import { getCouponBySlug } from '@/lib/couponsData';
import { getLocalizedCoupon, isTranslatedLocale } from '@/lib/couponTranslations';
import { getStoreCode } from '@/lib/homeStores';
import { resolveReviewLocale } from '@/lib/content/review-i18n';
import { getArticleCopy } from '@/components/review/articleCopy';
import { LOCALE_KEYS } from '@/lib/i18n/locales';
import { getShellCopy } from '@/lib/i18n/shellDictionary';
import { getReviewHubCopy } from '@/lib/review-hubs';
import { buildReviewTemplateProps } from '@/lib/review-template-props';
import { publishedReviews } from '@/lib/data';

const mk = (id: number, o: Partial<{ locale: string; affiliate: string; category: string; type: string; publishedAtISO: string }>) =>
  ({ id, slug: `a${id}`, publishedAtISO: '2026-10-01', ...o });
const cur = mk(1, { affiliate: 'damie', category: 'produto', type: 'Review' });
const corpus = [cur, mk(2, { affiliate: 'insider' , category: 'produto' }), mk(3, { affiliate: 'damie', category: 'guia' }),
  mk(4, { category: 'produto', type: 'Review' }), mk(5, { locale: 'en', affiliate: 'damie' }), mk(6, { type: 'Review' }), mk(7, {})];
assert.deepEqual(pickRelatedReviews(cur, corpus).map((r) => r.id), [3, 4, 2, 6, 7]);
assert.ok(pickRelatedReviews(cur, corpus).every((r) => r.id !== 1 && r.locale !== 'en'));

// Todo artigo publicado: até 6, mesmo idioma, os da mesma loja primeiro.
for (const review of publishedReviews) {
  const related = pickRelatedReviews(review, publishedReviews);
  assert.ok(related.length <= 6 && !related.some((r) => r.id === review.id));
  assert.ok(
    related.every((r) => resolveReviewLocale(r.locale) === resolveReviewLocale(review.locale)),
    `${review.slug}: relacionado de outro idioma`
  );
  const sameStore = related.map((r) => Boolean(review.affiliate) && r.affiliate === review.affiliate);
  assert.deepEqual(sameStore, [...sameStore].sort((a, b) => Number(b) - Number(a)), `${review.slug}: mesma loja não veio primeiro`);
}

// Bloco da loja: Review Focus 1–3.
for (const review of publishedReviews) {
  const block = getArticleStoreBlock(review, (review.locale ?? 'pt') as never);
  if (!review.affiliate) assert.equal(block, null, review.slug);
  if (block && review.locale && review.locale !== 'pt') {
    assert.ok(!block.couponPageHref?.startsWith('/cupons/'), `${review.slug}: link PT fora do PT`);
    assert.equal(block.articlesHref, undefined);
    const localized = isTranslatedLocale(review.locale) ? getLocalizedCoupon(review.affiliate!, review.locale) : undefined;
    assert.equal(block.discount, block.code && block.code === getStoreCode(getCouponBySlug(review.affiliate!)!) ? localized?.discount : undefined, `${review.slug}: desconto em PT fora do PT`);
    assert.ok(!/br\.shein\.com/.test(block.storeHref ?? ''), `${review.slug}: link da SHEIN Brasil fora do PT`);
    assert.ok(block.rules.length === 0 || block.rules.every((r) => r.label && r.value));
  }
  if (block?.code === 'CECILIA010') assert.equal(block.codeKind, 'reward');
}
assert.equal(getArticleStoreBlock({ ...publishedReviews[0], affiliate: 'kopenhagen' } as never, 'pt'), null, 'loja pausada');
assert.equal(getCouponBySlug('kopenhagen'), undefined, 'kopenhagen deveria estar pausada');
assert.equal(getArticleStoreBlock({ ...publishedReviews[0], affiliate: 'loja-que-nao-existe' } as never, 'pt'), null);

// Texto longo cortado na última palavra antes de 140, com reticências.
assert.equal(shortenRule('Vale para tudo'), 'Vale para tudo');
const exact = 'a'.repeat(140);
assert.equal(shortenRule(exact), exact);
const long = Array.from({ length: 40 }, (_, i) => `palavra${i}`).join(' ');
assert.ok(long.length > 140);
const cut = shortenRule(long);
assert.ok(cut.length <= 141 && cut.endsWith('…'), cut);
const body = cut.slice(0, -1);
assert.ok(long.startsWith(body) && long[body.length] === ' ', `cortou palavra no meio: ${cut}`);
assert.ok(!/\s$/.test(body));

// Review Focus 2: o código do artigo difere do da loja, sem regras nem desconto; igual, com regras.
const base = publishedReviews.find((r) => r.affiliate === 'damie' && !r.locale) ?? publishedReviews.find((r) => r.affiliate && !r.locale)!;
const store = getCouponBySlug(base.affiliate!)!;
const storeCode = store.offerMode === 'discount-code' ? store.code : store.referral?.code;
assert.ok(storeCode, 'loja de teste sem código');
const other = getArticleStoreBlock({ ...base, coupon: 'CODIGO-DE-CAMPANHA' } as never, 'pt')!;
assert.equal(other.code, 'CODIGO-DE-CAMPANHA');
assert.deepEqual(other.rules, []);
assert.equal(other.discount, undefined);
const same = getArticleStoreBlock({ ...base, coupon: storeCode } as never, 'pt')!;
assert.equal(same.code, storeCode);
assert.ok(same.rules.length > 0 && same.rules.length <= 3);
assert.ok(same.rules.every((r) => r.value.length <= 141));
assert.ok(same.discount);
assert.equal(same.couponPageHref, `/cupons/${store.slug}`);

// Rótulos das regras: nos 10 idiomas, e os de fora do PT diferem do PT.
const ptCopy = getArticleCopy('pt');
for (const loc of LOCALE_KEYS) {
  const c = getArticleCopy(loc);
  assert.ok(c.ruleTestedLabel && c.ruleVerifiedLabel, `${loc}: rótulo ausente`);
  if (loc !== 'pt') {
    assert.notEqual(c.ruleTestedLabel, ptCopy.ruleTestedLabel, loc);
    assert.notEqual(c.ruleVerifiedLabel, ptCopy.ruleVerifiedLabel, loc);
  }
}

// Fora do PT com tradução (SHEIN): regras reais, rótulos sem espaço duplo e diferentes dos do PT.
const sheinCode = (getCouponBySlug('shein') as { referral?: { code: string } }).referral!.code;
const ptLabels = new Set([ptCopy.ruleTestedLabel, ptCopy.ruleVerifiedLabel, 'Vale para', 'Junta com outras promoções?']);
for (const loc of ['ja', 'zh-hant', 'ko', 'en'] as const) {
  const block = getArticleStoreBlock({ ...base, locale: loc, affiliate: 'shein', coupon: sheinCode } as never, loc)!;
  assert.ok(block.rules.length > 0, `${loc}: sem regras`);
  for (const rule of block.rules) {
    assert.ok(rule.label.trim() && rule.value.trim(), `${loc}: regra vazia`);
    assert.ok(!/\s{2,}/.test(`${rule.label} ${rule.value}`), `${loc}: espaço duplo`);
    assert.ok(!ptLabels.has(rule.label), `${loc}: rótulo em português`);
  }
  assert.equal(block.rules.at(-1)!.label, getArticleCopy(loc).ruleVerifiedLabel);
}

// Fora do PT, loja sem página traduzida e fora a YesStyle: sem link de página, sem regras, sem SHEIN Brasil.
const plain = getArticleStoreBlock({ ...base, locale: 'ja', affiliate: 'damie', coupon: 'CECILIA12' } as never, 'ja')!;
assert.equal(plain.couponPageHref, undefined);
assert.deepEqual(plain.rules, []);
assert.equal(plain.articlesHref, undefined);
assert.ok(!/br\.shein\.com/.test(plain.storeHref ?? ''));

// Textos novos do artigo: nos 10 idiomas, sem campo vazio e, fora do PT, diferentes dos do PT.
const newTexts = (loc: (typeof LOCALE_KEYS)[number]) => {
  const c = getArticleCopy(loc);
  return {
    copiedHint: c.copiedHint('Damie'),
    copiedHintReward: c.copiedHint('YesStyle', 'reward'),
    copiedHintReferral: c.copiedHint('SHEIN', 'referral'),
    storeBlockTitle: c.storeBlockTitle('Damie'),
    allRules: c.allRules,
    allStoreArticles: c.allStoreArticles(12, 'Damie'),
    authorBoxTitle: c.authorBoxTitle,
    authorBoxBody: c.authorBoxBody,
    authorBoxLink: c.authorBoxLink,
    disclosureMore: c.disclosureMore,
  };
};
const ptTexts = newTexts('pt');
assert.equal(ptTexts.copiedHint, 'Copiado. Agora é só colar no checkout da Damie.');
assert.ok(ptTexts.copiedHintReward.includes('Reward Code da YesStyle'), ptTexts.copiedHintReward);
for (const loc of LOCALE_KEYS) {
  const texts = newTexts(loc);
  for (const [field, text] of Object.entries(texts)) {
    assert.ok(text.trim(), `${loc}: ${field} vazio`);
    assert.ok(!/\s{2,}/.test(text), `${loc}: ${field} com espaço duplo`);
    if (loc !== 'pt') assert.notEqual(text, ptTexts[field as keyof typeof ptTexts], `${loc}: ${field} igual ao PT`);
  }
  // Recompensa vai no campo Reward Code; indicação não se cola no checkout: os três textos diferem.
  assert.equal(new Set([texts.copiedHint, texts.copiedHintReward, texts.copiedHintReferral]).size, 3, `${loc}: copiedHint igual nos três tipos`);
  assert.ok(texts.copiedHintReward.includes('Reward Code'), `${loc}: recompensa sem o campo Reward Code`);
  assert.ok(texts.copiedHintReferral.includes('SHEIN'), `${loc}: indicação sem a loja`);
  assert.ok(texts.allStoreArticles.includes('12'), `${loc}: contagem fora do texto`);
}

// Trilha: home do idioma > lista de guias com o nome do menu do idioma (em PT, Guias & Análises) > artigo.
for (const loc of LOCALE_KEYS) {
  const review = publishedReviews.find((r) => resolveReviewLocale(r.locale) === loc);
  assert.ok(review, `${loc}: sem artigo publicado`);
  const { breadcrumbs, breadcrumbJsonLd } = buildReviewTemplateProps(review);
  const hub = breadcrumbs.at(-1)!;
  assert.equal(hub.name, getShellCopy(loc).reviewHubLabel, `${loc}: trilha sem o nome da lista de guias`);
  if (loc === 'pt') assert.equal(hub.name, 'Guias & Análises');
  else assert.equal(hub.name, getReviewHubCopy(loc).title, `${loc}: trilha diferente do título da lista`);
  const items = (breadcrumbJsonLd as { itemListElement: Array<{ name: string }> }).itemListElement;
  assert.equal(items.at(-2)!.name, hub.name, `${loc}: BreadcrumbList diferente da trilha`);
}

console.log('✅ artigo D2: relacionados, bloco da loja, textos novos e trilha');
