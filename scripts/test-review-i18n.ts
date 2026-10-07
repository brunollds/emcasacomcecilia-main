import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';

import { detectDuplicateReviewPathnames, formatDate, getReviewDefaultTranslationPathname, groupReviewsByTranslationKey, detectDuplicateTranslationLocalePairs, getReviewTranslationsByLocale, isValidTranslationKey, resolveReviewLocale } from '@/lib/content';
import { getCouponStorePath } from '@/lib/couponTranslations';
import { LOCALE_KEYS } from '@/lib/i18n/locales';
import { getCouponBrandFromHref, getInternalHref, isCouponPageLink } from '@/lib/internalLinks';
import { isFaqHeading, parseFaqBullet, resolveRelatedArticleLinks } from '@/lib/review-template-props';

interface ReviewSource {
  slug: string;
  translationKey?: string;
  locale?: string;
  affiliate?: string;
  coupon?: string;
  contentSections?: Array<{ heading?: string; bullets?: string[] }>;
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
  }

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

  // A data do cabeçalho segue o idioma do artigo; antes os artigos EN saíam "2 de agosto de 2026".
  assert.equal(formatDate('2026-08-02'), '2 de agosto de 2026');
  assert.equal(formatDate('2026-08-02', 'en'), 'August 2, 2026');
  assert.equal(formatDate('2026-08-02', 'de'), '2. August 2026');
  assert.equal(formatDate('2026-02-30', 'en'), '2026-02-30', 'data impossível volta crua');

  console.log(
    `✅ test-review-i18n: ${translatedReviews.length} versões traduzidas em ${Object.keys(translatedGroups).length} famílias, todas com os ${LOCALE_KEYS.length} idiomas`
  );

})();
