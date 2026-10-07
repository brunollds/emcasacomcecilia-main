import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';

import { detectDuplicateReviewPathnames, formatDate, getReviewDefaultTranslationPathname, groupReviewsByTranslationKey, detectDuplicateTranslationLocalePairs, getReviewTranslationsByLocale, isValidTranslationKey, resolveReviewLocale } from '@/lib/content';
import { getArticleCopy } from '@/components/review/articleCopy';
import { getCouponCopyLabels } from '@/components/review/couponCopyLocale';
import { getGalleryCopy } from '@/components/review/galleryCopy';
import { getCodeHints, getCodeTitle, getSidebarCopy } from '@/components/review/sidebarCopy';
import { getShareCopy } from '@/components/shared/shareCopy';
import { getCouponBySlug } from '@/lib/couponsData';
import { getCouponStorePath, getLocalizedCoupon, isTranslatedLocale } from '@/lib/couponTranslations';
import { LOCALE_KEYS, type Locale } from '@/lib/i18n/locales';
import { getCouponBrandFromHref, getInternalHref, isCouponPageLink } from '@/lib/internalLinks';
import { isFaqHeading, parseFaqBullet, resolveRelatedArticleLinks } from '@/lib/review-template-props';

interface ReviewSource {
  slug: string;
  translationKey?: string;
  locale?: string;
  type?: string;
  affiliate?: string;
  coupon?: string;
  cta?: { url?: string };
  contentSections?: Array<{ heading?: string; bullets?: string[]; links?: Array<{ href?: string }> }>;
}

const contentReviewsDir = path.join(process.cwd(), 'content', 'reviews');

async function loadReviewCorpus(): Promise<ReviewSource[]> {
  const entries = await fs.readdir(contentReviewsDir, { withFileTypes: true });
  const reviewFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .filter((entry) => entry.name !== '_manifest.json')
    .map((entry) => path.join(contentReviewsDir, entry.name));

  const rows = await Promise.all(
    reviewFiles.map(async (filePath) => {
      const raw = await fs.readFile(filePath, 'utf8');
      return JSON.parse(raw) as ReviewSource;
    })
  );

  return rows;
}

// href e url em qualquer nível do JSON: links das seções, blocos, CTA e autor.
function collectLinks(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(collectLinks);
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value).flatMap(([field, child]) =>
    (field === 'href' || field === 'url') && typeof child === 'string' ? [child] : collectLinks(child)
  );
}

// SHEIN fora do PT: nenhum link da SHEIN Brasil (o host br.shein.com e os links de oferta e campanha
// do cupom em PT), que levariam a loja e a comissão do país errado. O artigo da SHEIN também tem o
// CTA no link principal neutro da página da loja. Os links vêm do cupom, não de uma cópia aqui.
const sheinStore = getCouponBySlug('shein');
assert.ok(sheinStore, 'a SHEIN precisa estar ativa em couponsData');
const brazilianSheinUrls = new Set(
  [sheinStore.officialUrl, sheinStore.offerUrl, ...(sheinStore.campaigns ?? []).map((campaign) => campaign.offerUrl)].map(
    (url) => new URL(url).href
  )
);

function isBrazilianSheinLink(href: string): boolean {
  try {
    const url = new URL(href);
    return url.hostname === 'br.shein.com' || brazilianSheinUrls.has(url.href);
  } catch {
    return false;
  }
}

function sheinLinkProblems(review: ReviewSource): string[] {
  const locale = resolveReviewLocale(review.locale);
  if (locale === 'pt') return [];
  const problems = collectLinks(review).filter(isBrazilianSheinLink).map((href) => `link da SHEIN Brasil: ${href}`);
  const neutralUrl = isTranslatedLocale(locale) ? getLocalizedCoupon('shein', locale)?.offerUrl : undefined;
  if (review.affiliate === 'shein' && review.cta?.url !== neutralUrl) {
    problems.push(`cta.url ${review.cta?.url ?? '(ausente)'} em vez do link principal neutro ${neutralUrl}`);
  }
  return problems;
}

// O rótulo do código nos artigos usa o termo que a página da loja já usa em cada idioma, e fora do
// PT diz que o 4CW5Y é da SHEIN Brasil.
const REFERRAL_TERM: Record<Locale, string> = {
  pt: 'código de indicação',
  en: 'referral code',
  es: 'código de referido',
  fr: 'code de parrainage',
  de: 'Empfehlungscode',
  it: 'codice invito',
  ko: '추천 코드',
  ja: '紹介コード',
  'zh-hant': '推薦碼',
  'zh-hans': '推荐码',
};
const SHEIN_BRAZIL: Record<Locale, string> = {
  pt: 'SHEIN',
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
// Os textos da interface do artigo (selo, veredito, ficha, vídeo, galeria, compartilhar) não ficam em
// português: cada campo difere do PT, salvo as palavras que são as mesmas nas duas línguas. A lista
// precisa bater, para uma exceção que deixou de valer não ficar esquecida.
const uiLeaves = (value: unknown, prefix: string): [string, string][] =>
  typeof value === 'string'
    ? [[prefix, value]]
    : typeof value === 'function'
      ? [[prefix, String(value('ARG1', 'ARG2'))]]
      : value && typeof value === 'object'
        ? Object.entries(value).flatMap(([key, child]) => uiLeaves(child, `${prefix}.${key}`))
        : [];
const articleUiLeaves = (locale: Locale) => [
  ...uiLeaves(getArticleCopy(locale), 'article'),
  ...uiLeaves(getGalleryCopy(locale), 'gallery'),
  ...uiLeaves(getShareCopy(locale), 'share'),
];
const SAME_AS_PORTUGUESE: Partial<Record<Locale, string[]>> = {
  en: ['article.kindLabel.editorial'],
  es: [
    'article.kindLabel.editorial',
    'article.editorialNoteTitle',
    'article.codeChip.reward',
    'article.productSheetOpen',
    'article.relatedVideo',
    'gallery.tabPhotos',
    'gallery.tabVideos',
    'gallery.enlarge',
    'gallery.previousPhotos',
    'gallery.video',
    'gallery.previousVideos',
  ],
  de: ['gallery.tabPhotos'],
};

// O `type` é o rótulo público do tipo de artigo (selo do cabeçalho, cards da vitrine e dos
// relacionados) e sai no idioma da versão. Igual ao do PT só nas palavras que são as mesmas nas
// duas línguas; em japonês, coreano e chinês, nunca só em letras latinas, que foi como quatro
// "Guide & Coupons" passaram por traduzidos.
const TYPE_SAME_AS_PORTUGUESE: Partial<Record<Locale, string[]>> = {
  en: ['Editorial'],
  es: ['Editorial'],
};
const TYPE_SCRIPT: Partial<Record<Locale, RegExp>> = {
  ja: /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u,
  ko: /\p{Script=Hangul}/u,
  'zh-hans': /\p{Script=Han}/u,
  'zh-hant': /\p{Script=Han}/u,
};

function typeProblems(review: ReviewSource, portugueseType: string | undefined): string[] {
  const locale = resolveReviewLocale(review.locale);
  if (locale === 'pt') return [];
  if (!review.type) return ['type ausente'];
  const problems: string[] = [];
  if (review.type === portugueseType && !TYPE_SAME_AS_PORTUGUESE[locale]?.includes(review.type)) {
    problems.push(`type igual ao português: "${review.type}"`);
  }
  if (TYPE_SCRIPT[locale] && !TYPE_SCRIPT[locale].test(review.type)) {
    problems.push(`type sem a escrita do idioma: "${review.type}"`);
  }
  return problems;
}

// A lista de exceções precisa bater, para uma exceção que deixou de valer não ficar esquecida.
const unusedTypeExceptions = (used: Set<string>) =>
  Object.entries(TYPE_SAME_AS_PORTUGUESE)
    .flatMap(([locale, types]) => types.map((type) => `${locale}: ${type}`))
    .filter((entry) => !used.has(entry));

const storeReferralLabel = (locale: Locale) =>
  (isTranslatedLocale(locale) ? getLocalizedCoupon('shein', locale)?.referral : sheinStore.referral)?.label ?? '';

(async () => {
  const reviews = await loadReviewCorpus();

  assert.equal(resolveReviewLocale(), 'pt');
  assert.equal(isValidTranslationKey('yesstyle-reward-code'), true);
  assert.equal(isValidTranslationKey('reward-code-YesStyle'), false);
  assert.equal(isValidTranslationKey(''), false);
  assert.equal(isValidTranslationKey('yesstyle invalid'), false);
  assert.equal(isValidTranslationKey(123 as unknown), false);

  assert.equal(
    resolveReviewLocale('es'),
    'es',
    'locale explícito resolve corretamente'
  );
  assert.throws(
    () => resolveReviewLocale('pt-BR'),
    /locale inválido para review/,
    'locale inválido falha com erro explícito'
  );

  const duplicateReviewGroups = groupReviewsByTranslationKey([
    { slug: 'a', translationKey: 'yesstyle-reward-code', locale: 'en' },
    { slug: 'b', translationKey: 'yesstyle-reward-code', locale: 'en' },
  ]);
  const duplicateErrorsSeed = detectDuplicateTranslationLocalePairs(duplicateReviewGroups);
  assert.equal(
    duplicateErrorsSeed.length,
    1,
    'duplicidade por locale em translationKey falha'
  );
  assert.equal(
    duplicateErrorsSeed[0].slugs.join(','),
    'a,b',
    'duplicidade reporta os slugs duplicados'
  );

  const partialGroup = groupReviewsByTranslationKey([
    { slug: 'a', translationKey: 'yesstyle-preview', locale: 'pt' },
    { slug: 'b', translationKey: 'yesstyle-preview', locale: 'en' },
  ]);
  assert.equal(Object.keys(partialGroup['yesstyle-preview']).length, 2);
  const translatedReviews = reviews.filter((review) => review.translationKey !== undefined);

  const translatedGroups = groupReviewsByTranslationKey(translatedReviews);
  const duplicateErrorsCorpus = detectDuplicateTranslationLocalePairs(translatedGroups);
  assert.equal(
    duplicateErrorsCorpus.length,
    0,
    'sem chaves/locale duplicadas no corpus inteiro de reviews traduzidos'
  );

  const rewardMap = getReviewTranslationsByLocale(translatedGroups, 'yesstyle-reward-code');
  assert.ok(
    Object.prototype.hasOwnProperty.call(rewardMap, 'pt'),
    'helper retorna entradas por locale para pt'
  );

  const legacyPtReview = reviews.find((review) => !review.locale && !review.translationKey);
  assert.ok(legacyPtReview, 'pelo menos um review legado deve continuar sem locale');
  assert.equal(resolveReviewLocale(legacyPtReview.locale), 'pt');

  assert.equal(
    getReviewDefaultTranslationPathname({ pt: '/reviews/a', es: '/es/reviews/a' }),
    '/reviews/a',
    'x-default usa pt quando en está ausente'
  );
  assert.equal(
    getReviewDefaultTranslationPathname({ fr: '/fr/reviews/a', ja: '/ja/reviews/a' }),
    '/fr/reviews/a',
    'x-default usa o primeiro locale configurado quando en e pt estão ausentes'
  );

  assert.deepEqual(
    detectDuplicateReviewPathnames([
      { slug: 'shared', locale: 'en' },
      { slug: 'shared', locale: 'es' },
    ]),
    [],
    'mesmo slug em en/es é aceito por ter pathnames distintos'
  );
  assert.deepEqual(
    detectDuplicateReviewPathnames([
      { slug: 'shared', locale: 'en' },
      { slug: 'shared', locale: 'en' },
    ]),
    [{ pathname: '/en/reviews/shared', slugs: ['shared', 'shared'] }],
    'mesmo slug no mesmo locale é rejeitado com pathname canônico nomeado'
  );

  assert.deepEqual(
    resolveRelatedArticleLinks(
      { slug: 'source-pt', relatedArticles: [{ slug: 'future-review', title: 'Futuro' }] },
      []
    ),
    [{ slug: 'future-review', title: 'Futuro', href: '/reviews/future-review' }],
    'referência futura PT preserva pathname previsto'
  );
  assert.deepEqual(
    resolveRelatedArticleLinks(
      { slug: 'source-en', locale: 'en', relatedArticles: [{ slug: 'existing', title: 'Existente' }] },
      [{ slug: 'existing', locale: 'es' }]
    ),
    [{ slug: 'existing', title: 'Existente', href: '/es/reviews/existing' }],
    'candidato único usa o pathname canônico real'
  );
  assert.deepEqual(
    resolveRelatedArticleLinks(
      { slug: 'source-en', locale: 'en', relatedArticles: [{ slug: 'shared', title: 'Compartilhado' }] },
      [{ slug: 'shared', locale: 'es' }, { slug: 'shared', locale: 'en' }]
    ),
    [{ slug: 'shared', title: 'Compartilhado', href: '/en/reviews/shared' }],
    'múltiplos candidatos preferem o locale de origem'
  );
  assert.throws(
    () => resolveRelatedArticleLinks(
      { slug: 'source-en', locale: 'en', relatedArticles: [{ slug: 'ambiguous', title: 'Ambíguo' }] },
      [{ slug: 'ambiguous', locale: 'es' }, { slug: 'ambiguous', locale: 'fr' }]
    ),
    /relatedArticles ambíguo/,
    'múltiplos candidatos sem locale de origem falham'
  );

  for (const review of reviews) {
    assert.doesNotThrow(
      () => resolveReviewLocale(review.locale),
      `locale inválido no corpus: ${review.slug}`
    );
    if (review.translationKey !== undefined) {
      assert.equal(
        isValidTranslationKey(review.translationKey),
        true,
        `translationKey inválida no corpus: ${review.slug}`
      );
    }
  }

  // Toda família sai em todos os idiomas do site, com a mesma loja e o mesmo código em todas as
  // versões. Antes só as 4 primeiras famílias da YesStyle eram conferidas, numa lista fixa.
  const usedTypeExceptions = new Set<string>();
  for (const [key, translationGroup] of Object.entries(translatedGroups)) {
    for (const locale of LOCALE_KEYS) {
      assert.equal(
        translationGroup[locale]?.length ?? 0,
        1,
        `${key}: exatamente uma versão para locale ${locale}`
      );
    }
    const family = translatedReviews.filter((review) => review.translationKey === key);
    for (const field of ['affiliate', 'coupon'] as const) {
      const values = [...new Set(family.map((review) => review[field] ?? '(vazio)'))];
      assert.equal(values.length, 1, `${key}: ${field} diferente entre as versões: ${values.join(', ')}`);
    }
    const withoutFaq = family.filter((review) => !review.contentSections?.some((section) => isFaqHeading(section.heading)));
    assert.ok(
      withoutFaq.length === 0 || withoutFaq.length === family.length,
      `${key}: seção de FAQ não reconhecida em ${withoutFaq.map((review) => review.locale).join(', ')}`
    );
    const portugueseType = family.find((review) => resolveReviewLocale(review.locale) === 'pt')?.type;
    for (const review of family) {
      assert.deepEqual(typeProblems(review, portugueseType), [], `${review.slug}: type fora do idioma do artigo`);
      if (resolveReviewLocale(review.locale) !== 'pt' && review.type === portugueseType) usedTypeExceptions.add(`${review.locale}: ${review.type}`);
    }
  }
  assert.deepEqual(unusedTypeExceptions(usedTypeExceptions), [], 'exceção de type igual ao português que não vale mais');

  // O guarda do type, provado em versões que falham e que passam.
  assert.deepEqual(typeProblems({ slug: 'f', locale: 'es', type: 'Guia & Cupons' }, 'Guia & Cupons'), ['type igual ao português: "Guia & Cupons"']);
  assert.equal(typeProblems({ slug: 'f', locale: 'fr', type: 'Editorial' }, 'Editorial').length, 1, '"Editorial" em francês falha (é "Éditorial")');
  assert.deepEqual(typeProblems({ slug: 'f', locale: 'ja', type: 'Guide & Coupons' }, 'Guia & Cupons'), ['type sem a escrita do idioma: "Guide & Coupons"']);
  assert.equal(typeProblems({ slug: 'f', locale: 'zh-hant', type: 'Editorial' }, 'Editorial').length, 2, 'em chinês, "Editorial" falha nas duas regras');
  assert.equal(typeProblems({ slug: 'f', locale: 'ko', type: 'Guide' }, 'Guia').length, 1, 'em coreano, rótulo em inglês falha');
  assert.deepEqual(typeProblems({ slug: 'f', locale: 'de' }, 'Guia'), ['type ausente']);
  assert.deepEqual(typeProblems({ slug: 'f', locale: 'en', type: 'Editorial' }, 'Editorial'), [], '"Editorial" em inglês passa');
  assert.deepEqual(typeProblems({ slug: 'f', locale: 'ja', type: 'ガイド＆クーポン' }, 'Guia & Cupons'), [], 'japonês passa');
  assert.deepEqual(typeProblems({ slug: 'f', locale: 'ko', type: '가이드 & 쿠폰' }, 'Guia & Cupons'), [], 'coreano passa');
  assert.deepEqual(typeProblems({ slug: 'f', type: 'Guia & Cupons' }, 'Guia & Cupons'), [], 'a versão em português não é conferida');
  assert.deepEqual(unusedTypeExceptions(new Set(['en: Editorial'])), ['es: Editorial'], 'exceção sem uso aparece');

  // O link da página da loja segue o idioma do artigo: /cupons/<marca> em português e
  // /<locale>/coupons/<marca> nos outros idiomas, que não têm hub de cupons.
  for (const review of reviews) {
    const locale = resolveReviewLocale(review.locale);
    for (const href of collectLinks(review).filter(isCouponPageLink)) {
      const pathname = getInternalHref(href).split(/[?#]/, 1)[0];
      if (locale === 'pt' && pathname === '/cupons') continue;
      const brand = getCouponBrandFromHref(href);
      assert.ok(
        brand && pathname === getCouponStorePath(brand, locale),
        `${review.slug}: link de loja fora do idioma do artigo: ${href}`
      );
    }
  }

  // A seção de FAQ vira o FAQPage do schema: o título precisa estar na lista do template e cada
  // item precisa trazer a pergunta e a resposta. Estes são os títulos que o Job 4 do vault indica.
  for (const heading of ['Perguntas frequentes', 'Frequently asked questions', 'Preguntas frecuentes', 'Questions fréquentes', 'Häufige Fragen', 'Domande frequenti', '자주 묻는 질문', 'よくある質問', '常見問題', '常见问题']) {
    assert.equal(isFaqHeading(heading), true, `título de FAQ do Job 4 não reconhecido: ${heading}`);
  }
  for (const review of reviews) {
    const faq = review.contentSections?.find((section) => isFaqHeading(section.heading));
    if (!faq) continue;
    assert.ok(faq.bullets?.length, `${review.slug}: seção de FAQ sem bullets`);
    for (const bullet of faq.bullets ?? []) {
      assert.ok(parseFaqBullet(bullet), `${review.slug}: item do FAQ sem pergunta e resposta: ${bullet.slice(0, 80)}`);
    }
  }

  for (const review of reviews) {
    assert.deepEqual(sheinLinkProblems(review), [], `${review.slug}: versão fora do PT com link ou CTA da SHEIN Brasil`);
  }

  // Ainda não há artigo da SHEIN no corpus: o guarda acima é provado em fixtures que falham e uma que passa.
  const neutralSheinUrl = getLocalizedCoupon('shein', 'en')?.offerUrl ?? '';
  const sheinFixture = (patch: Partial<ReviewSource> = {}): ReviewSource => ({
    slug: 'shein-fixture',
    locale: 'en',
    affiliate: 'shein',
    coupon: '4CW5Y',
    cta: { url: neutralSheinUrl },
    contentSections: [{ heading: 'How to', links: [{ href: neutralSheinUrl }, { href: '/en/coupons/shein' }] }],
    ...patch,
  });
  assert.ok(neutralSheinUrl.startsWith('https://onelink.shein.com/'), 'o link neutro da SHEIN vem do cupom traduzido');
  assert.ok(brazilianSheinUrls.size >= 4 && !brazilianSheinUrls.has(neutralSheinUrl), 'a lista da SHEIN Brasil não inclui o link neutro');
  assert.deepEqual(sheinLinkProblems(sheinFixture()), [], 'artigo da SHEIN em inglês com o link neutro passa');
  assert.equal(
    sheinLinkProblems(sheinFixture({ contentSections: [{ links: [{ href: 'https://br.shein.com/ark/5231?koc_id=1' }] }] })).length,
    1,
    'link do host br.shein.com fora do PT falha'
  );
  assert.equal(
    sheinLinkProblems(sheinFixture({ contentSections: [{ links: [{ href: sheinStore.campaigns?.[0].offerUrl }] }] })).length,
    1,
    'link de campanha da SHEIN Brasil fora do PT falha'
  );
  assert.equal(sheinLinkProblems(sheinFixture({ cta: { url: sheinStore.offerUrl } })).length, 2, 'CTA no link brasileiro falha (como link e como CTA)');
  assert.equal(sheinLinkProblems(sheinFixture({ cta: { url: 'https://onelink.shein.com/55/outro' } })).length, 1, 'CTA em outro link falha');
  assert.equal(sheinLinkProblems(sheinFixture({ cta: undefined })).length, 1, 'artigo da SHEIN sem CTA falha');
  assert.equal(
    sheinLinkProblems(
      sheinFixture({ affiliate: 'yesstyle', cta: { url: 'https://example.com/' }, contentSections: [{ links: [{ href: 'https://br.shein.com/' }] }] })
    ).length,
    1,
    'link da SHEIN Brasil em artigo de outra loja falha, mas o CTA dele não é cobrado'
  );
  assert.deepEqual(
    sheinLinkProblems(sheinFixture({ locale: undefined, cta: { url: sheinStore.offerUrl }, contentSections: [{ links: [{ href: sheinStore.offerUrl }] }] })),
    [],
    'a versão em português fica no link brasileiro'
  );

  // Rótulo e dica do código no dock e na sidebar: cupom comum, de recompensa e de indicação, nos 10 idiomas.
  for (const locale of LOCALE_KEYS) {
    const copy = getSidebarCopy(locale);
    const coupon = getCodeTitle(copy, undefined, 'DAMIE');
    const reward = getCodeTitle(copy, 'reward', 'YesStyle');
    const referral = getCodeTitle(copy, 'referral', 'SHEIN');
    const term = REFERRAL_TERM[locale].toLowerCase();
    assert.equal(new Set([coupon, reward, referral]).size, 3, `${locale}: cupom, recompensa e indicação com o mesmo rótulo`);
    assert.ok(referral.toLowerCase().includes(term), `${locale}: rótulo de indicação sem "${term}": ${referral}`);
    assert.ok(referral.includes(SHEIN_BRAZIL[locale]), `${locale}: rótulo de indicação sem "${SHEIN_BRAZIL[locale]}": ${referral}`);
    assert.ok(!reward.toLowerCase().includes(term) && !coupon.toLowerCase().includes(term), `${locale}: cupom ou recompensa chamado de indicação`);
    assert.ok(storeReferralLabel(locale).toLowerCase().includes(term), `${locale}: a página da SHEIN não usa o termo "${term}"`);

    const referralHints = getCodeHints(copy, 'referral', 'SHEIN');
    const plainHints = getCodeHints(copy, undefined, 'DAMIE');
    assert.deepEqual(getCodeHints(copy, 'reward', 'YesStyle'), plainHints, `${locale}: a recompensa muda a dica do cupom`);
    assert.notEqual(referralHints.copy, plainHints.copy, `${locale}: dica do código de indicação igual à do cupom`);
    assert.notEqual(referralHints.copied, plainHints.copied, `${locale}: dica do código de indicação copiado igual à do cupom, que manda colar no checkout`);
    assert.ok(referralHints.copy.includes('SHEIN') && referralHints.copied.includes('SHEIN'), `${locale}: dica do código de indicação sem dizer onde pesquisar`);

    const inline = getCouponCopyLabels(locale).inlineReferral('SHEIN');
    assert.ok(`${inline.prefix} ${inline.suffix}`.includes(SHEIN_BRAZIL[locale]), `${locale}: código de indicação no resumo sem "${SHEIN_BRAZIL[locale]}"`);
    assert.notEqual(inline.prefix, getCouponCopyLabels(locale).inlinePrefix, `${locale}: resumo do código de indicação igual ao do cupom`);
  }

  const portugueseUi = new Map(articleUiLeaves('pt'));
  for (const locale of LOCALE_KEYS.filter((key) => key !== 'pt')) {
    const leaves = articleUiLeaves(locale);
    assert.equal(leaves.length, portugueseUi.size, `${locale}: campos da interface do artigo diferentes do PT`);
    assert.deepEqual(
      leaves.filter(([field, text]) => portugueseUi.get(field) === text).map(([field]) => field),
      SAME_AS_PORTUGUESE[locale] ?? [],
      `${locale}: texto da interface do artigo igual ao português (ou exceção que não vale mais)`
    );
  }

  // A data do cabeçalho segue o idioma do artigo; antes os artigos EN saíam "2 de agosto de 2026".
  assert.equal(formatDate('2026-08-02'), '2 de agosto de 2026');
  assert.equal(formatDate('2026-08-02', 'en'), 'August 2, 2026');
  assert.equal(formatDate('2026-08-02', 'de'), '2. August 2026');
  assert.equal(formatDate('2026-02-30', 'en'), '2026-02-30', 'data impossível volta crua');

  console.log(
    `✅ test-review-i18n: ${translatedReviews.length} versões traduzidas em ${Object.keys(translatedGroups).length} famílias, todas com os ${LOCALE_KEYS.length} idiomas e o type de cada uma no idioma dela; sem link da SHEIN Brasil fora do PT; códigos de recompensa e de indicação rotulados; interface do artigo sem português`
  );

})();
