import { getReviewSlug, publishedReviews } from '@/lib/data';
import { buildSchemaAuthors, normalizeReview } from '@/lib/content';
import { getReviewCanonicalPathname, resolveReviewLocale } from '@/lib/content/review-i18n';
import { getShellCopy } from '@/lib/i18n/shellDictionary';
import { getInternationalReviewHub } from '@/lib/review-hubs';
import {
  getPrimaryLocalVideoMeta,
  getYoutubeEmbedUrl,
} from '@/lib/video-metadata';
import {
  buildLocalVideoObject,
  buildYoutubeVideoObject,
} from '@/lib/video-schema';
import {
  getVideoPageForSourcePath,
  getVideoPageForYoutubeUrl,
  getVideoPageUrl,
} from '@/lib/video-pages';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

export { getYoutubeEmbedUrl };

// Títulos que fazem uma seção virar o FAQPage do schema. O Job 4 do vault diz qual usar em cada idioma.
const FAQ_HEADINGS = [
  'perguntas frequentes',
  'faq',
  'frequently asked',
  'preguntas frecuentes',
  'questions fréquentes',
  'foire aux questions',
  'häufige fragen',
  'häufig gestellte',
  'domande frequenti',
  '자주 묻는',
  'よくある',
  '常見問題',
  '常见问题',
];

/** @param {string | undefined} heading */
export function isFaqHeading(heading) {
  if (!heading) return false;
  const h = heading.toLowerCase();
  return FAQ_HEADINGS.some((fragment) => h.includes(fragment));
}

// Item do FAQ: a pergunta até o "?" ("？" em chinês e japonês) e a resposta logo depois.
/** @param {string} bullet */
export function parseFaqBullet(bullet) {
  const match = bullet.match(/^([^\?\uFF1F]+[\?\uFF1F])\s*(.+)$/);
  return match ? { question: match[1].trim(), answer: match[2].trim() } : null;
}

export function getRelatedReviews(review, reviewCorpus = publishedReviews) {
  const locale = resolveReviewLocale(review.locale);
  return reviewCorpus
    .filter((item) => item.id !== review.id && resolveReviewLocale(item.locale) === locale)
    .sort((a, b) => {
      const typeScore = Number(b.type === review.type) - Number(a.type === review.type);
      const productScore = Number(Boolean(b.rating) === Boolean(review.rating)) - Number(Boolean(a.rating) === Boolean(review.rating));

      return typeScore || productScore || b.id - a.id;
    })
    .slice(0, 3);
}

/**
 * @param {{ slug: string; locale?: string; relatedArticles?: Array<{ slug: string; title: string; category?: string }> }} review
 * @param {Array<{ slug: string; locale?: string }>} reviewCorpus
 */
export function resolveRelatedArticleLinks(review, reviewCorpus = publishedReviews) {
  const sourceLocale = resolveReviewLocale(review.locale);
  return (review.relatedArticles || []).map((article) => {
    const candidates = reviewCorpus.filter((item) => item.slug === article.slug);
    if (candidates.length === 0) {
      return {
        ...article,
        href: getReviewCanonicalPathname({ slug: article.slug, locale: sourceLocale }),
      };
    }

    if (candidates.length === 1) {
      return { ...article, href: getReviewCanonicalPathname(candidates[0]) };
    }

    const sameLocaleCandidates = candidates.filter((item) => resolveReviewLocale(item.locale) === sourceLocale);
    if (sameLocaleCandidates.length !== 1) {
      throw new Error(`relatedArticles ambíguo para "${article.slug}" em "${review.slug}"`);
    }

    return { ...article, href: getReviewCanonicalPathname(sameLocaleCandidates[0]) };
  });
}

export function buildReviewTemplateProps(review, reviewCorpus = publishedReviews) {
  const canonicalRating = review.rating ?? review.verdict?.stars;
  const isProductReview = review.reviewKind === 'produto' || typeof canonicalRating === 'number';
  const youtubeEmbedUrl = getYoutubeEmbedUrl(review.youtubeUrl);
  const relatedReviews = getRelatedReviews(review, reviewCorpus);
  const relatedArticleLinks = resolveRelatedArticleLinks(review, reviewCorpus);
  const viewModel = normalizeReview(review);

  const currentSlug = getReviewSlug(review);
  const localeKey = resolveReviewLocale(review.locale);
  const isPt = localeKey === 'pt';
  const internationalReviewHub = isPt ? null : getInternationalReviewHub(localeKey);
  const copy = getShellCopy(localeKey);

  const baseUrl = 'https://emcasacomcecilia.com';
  const publisherLogoUrl = new URL(
    resolveMediaUrl('/images/logos/logo-em-casa-com-cecilia.png'),
    baseUrl
  ).toString();
  const reviewPathname = getReviewCanonicalPathname(review);
  const reviewUrl = `${baseUrl}${reviewPathname}`;
  const youtubeVideoJsonLd = buildYoutubeVideoObject({
    url: review.youtubeUrl,
    baseUrl,
  });
  const localVideoMetadata = getPrimaryLocalVideoMeta(currentSlug);
  const localVideoJsonLd = localVideoMetadata
    ? buildLocalVideoObject({
        ...localVideoMetadata,
        baseUrl,
      })
    : null;
  const videoJsonLd = youtubeVideoJsonLd || localVideoJsonLd;
  const videoPage = getVideoPageForYoutubeUrl(review.youtubeUrl)
    || getVideoPageForSourcePath(reviewPathname);
  const videoPageUrl = getVideoPageUrl(videoPage);
  const productBrand = review.brand || (Array.isArray(review.productSpec) ? review.productSpec.find(
    (spec) => spec.key?.toLowerCase() === 'marca'
  )?.value : undefined);

  const breadcrumbJsonLd = isPt
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: copy.homeLabel, item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'Reviews', item: `${baseUrl}/reviews` },
          { '@type': 'ListItem', position: 3, name: review.title, item: reviewUrl },
        ],
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: internationalReviewHub.label, item: `${baseUrl}${internationalReviewHub.href}` },
          { '@type': 'ListItem', position: 2, name: review.title, item: reviewUrl },
        ],
      };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': isProductReview ? 'Review' : 'Article',
    name: review.title,
    headline: review.title,
    description: review.description,
    url: reviewUrl,
    mainEntityOfPage: reviewUrl,
    datePublished: review.publishedAtISO || review.publishedAt,
    ...(review.updatedAt ? { dateModified: review.updatedAt } : {}),
    author: buildSchemaAuthors(review.authors, review.author),
    publisher: {
      '@type': 'Organization',
      name: 'Em Casa com Cecília',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogoUrl,
      },
    },
    image: review.image ? new URL(resolveMediaUrl(review.image), baseUrl).toString() : undefined,
    ...(videoJsonLd && { video: videoJsonLd }),
    ...(isProductReview && typeof canonicalRating === 'number'
      ? {
          reviewRating: {
            '@type': 'Rating',
            ratingValue: canonicalRating,
            bestRating: 5,
            worstRating: 1,
          },
          itemReviewed: {
            '@type': 'Product',
            name: review.productName || review.title,
            ...(productBrand
              ? {
                  brand: {
                    '@type': 'Brand',
                    name: productBrand,
                  },
                }
              : {}),
            image: review.image ? new URL(resolveMediaUrl(review.image), baseUrl).toString() : undefined,
          },
        }
      : {}),
  };

  const faqSection = review.contentSections?.find((s) => isFaqHeading(s.heading));

  let faqJsonLd = null;
  if (faqSection && faqSection.bullets) {
    const mainEntity = faqSection.bullets
      .map(parseFaqBullet)
      .filter(Boolean)
      .map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      }));

    if (mainEntity.length > 0) {
      faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity,
      };
    }
  }

  return {
    review,
    viewModel,
    youtubeEmbedUrl,
    videoPageUrl,
    reviewImage: review.image ? resolveMediaUrl(review.image) : review.image,
    reviewImageAlt: review.imageAlt || review.title,
    breadcrumbJsonLd,
    jsonLd,
    faqJsonLd,
    relatedReviews,
    relatedArticleLinks,
    localeKey,
  };
}
