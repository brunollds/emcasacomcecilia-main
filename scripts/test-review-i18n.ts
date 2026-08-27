import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';

import { detectDuplicateReviewPathnames, getReviewDefaultTranslationPathname, groupReviewsByTranslationKey, detectDuplicateTranslationLocalePairs, getReviewTranslationsByLocale, isValidTranslationKey, resolveReviewLocale } from '@/lib/content';
import { LOCALE_KEYS } from '@/lib/i18n/locales';
import { resolveRelatedArticleLinks } from '@/lib/review-template-props';

interface ReviewSource {
  slug: string;
  translationKey?: string;
  locale?: string;
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

  const baselineTranslationKeys = [
    'yesstyle-reward-code',
    'yesstyle-coupon-guide',
    'yesstyle-trust',
    'yesstyle-kbeauty',
  ];
  for (const key of baselineTranslationKeys) {
    const translationGroup = getReviewTranslationsByLocale(translatedGroups, key);
    assert.ok(Object.prototype.hasOwnProperty.call(translatedGroups, key), `baseline key presente: ${key}`);
    for (const locale of LOCALE_KEYS) {
      const entries = translationGroup[locale] ?? [];
      assert.equal(
        entries.length,
        1,
        `${key}: exatamente uma versão para locale ${locale}`
      );
    }
  }

  console.log(
    `✅ test-review-i18n: ${translatedReviews.length} versões traduzidas em ${Object.keys(translatedGroups).length} translationKeys (baseline 4 famílias com ${LOCALE_KEYS.length} locales)`
  );

})();
