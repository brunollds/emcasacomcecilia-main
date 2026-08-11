import { getReviewSlug, publishedReviews } from '@/lib/data';
import { buildSchemaAuthors, normalizeReview } from '@/lib/content';
import { getYesStyleLocaleConfig, findYesStyleLocaleFromSlugOrPath } from '@/lib/i18n/clusters/yesstyle';
import { getShellCopy } from '@/lib/i18n/shellDictionary';
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

export { getYoutubeEmbedUrl };

export function getRelatedReviews(review) {
  return publishedReviews
    .filter((item) => item.id !== review.id)
    .sort((a, b) => {
      const typeScore = Number(b.type === review.type) - Number(a.type === review.type);
      const productScore = Number(Boolean(b.rating) === Boolean(review.rating)) - Number(Boolean(a.rating) === Boolean(review.rating));

      return typeScore || productScore || b.id - a.id;
    })
    .slice(0, 3);
}

export function buildReviewTemplateProps(review) {
  const canonicalRating = review.rating ?? review.verdict?.stars;
  const isProductReview = review.reviewKind === 'produto' || typeof canonicalRating === 'number';
  const youtubeEmbedUrl = getYoutubeEmbedUrl(review.youtubeUrl);
  const relatedReviews = getRelatedReviews(review);
  const viewModel = normalizeReview(review);

  const currentSlug = getReviewSlug(review);
  const localeKey = review.locale || findYesStyleLocaleFromSlugOrPath(currentSlug) || 'pt';
  const isPt = localeKey === 'pt';
  const config = getYesStyleLocaleConfig(localeKey);
  const copy = getShellCopy(localeKey);

  const baseUrl = 'https://emcasacomcecilia.com';
  const reviewUrl = `${baseUrl}/reviews/${currentSlug}`;
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
    || getVideoPageForSourcePath(`/reviews/${currentSlug}`);
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
          { '@type': 'ListItem', position: 1, name: copy.hubLabel, item: `${baseUrl}${config.hubPath}` },
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
        url: `${baseUrl}/images/logos/logo-em-casa-com-cecilia.png`,
      },
    },
    image: review.image ? `https://emcasacomcecilia.com${review.image}` : undefined,
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
            image: review.image ? `https://emcasacomcecilia.com${review.image}` : undefined,
          },
        }
      : {}),
  };

  const isFaqHeading = (heading) => {
    if (!heading) return false;
    const h = heading.toLowerCase();
    return (
      h.includes('perguntas frequentes') ||
      h.includes('faq') ||
      h.includes('frequently asked') ||
      h.includes('preguntas frecuentes') ||
      h.includes('foire aux questions') ||
      h.includes('häufig gestellte') ||
      h.includes('자주 묻는') ||
      h.includes('よくある') ||
      h.includes('常見問題') ||
      h.includes('常见问题')
    );
  };

  const faqSection = review.contentSections?.find((s) => isFaqHeading(s.heading));

  let faqJsonLd = null;
  if (faqSection && faqSection.bullets) {
    const mainEntity = faqSection.bullets.map((bullet) => {
      const qMatch = bullet.match(/^([^\?\uFF1F]+[\?\uFF1F])\s*(.+)$/);
      if (qMatch) {
        return {
          '@type': 'Question',
          name: qMatch[1].trim(),
          acceptedAnswer: {
            '@type': 'Answer',
            text: qMatch[2].trim(),
          },
        };
      }
      return null;
    }).filter(Boolean);

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
    reviewImage: review.image,
    reviewImageAlt: review.imageAlt || review.title,
    breadcrumbJsonLd,
    jsonLd,
    faqJsonLd,
    relatedReviews,
    localeKey,
  };
}
