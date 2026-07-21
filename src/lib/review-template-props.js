// Constrói as props do ReviewNotebookTemplate a partir de um Review.
// Fonte única do mapeamento: usada pela página /reviews/[slug] E pelo /preview
// (que renderiza rascunhos da central com os MESMOS componentes de produção).
import { getReviewSlug, publishedReviews } from '@/lib/data';
import { buildSchemaAuthors, normalizeReview } from '@/lib/content';

export function getYoutubeEmbedUrl(url) {
  if (!url) return null;

  const watchMatch = url.match(/youtube\.com\/watch\?v=([\w-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  const shortsMatch = url.match(/youtube\.com\/shorts\/([\w-]+)/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;

  return null;
}

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
  const isProductReview = Boolean(review.rating);
  const youtubeEmbedUrl = getYoutubeEmbedUrl(review.youtubeUrl);
  const relatedReviews = getRelatedReviews(review);
  const viewModel = normalizeReview(review);

  const baseUrl = 'https://emcasacomcecilia.com';
  const reviewUrl = `${baseUrl}/reviews/${getReviewSlug(review)}`;
  const productBrand = review.brand || review.productSpec?.find(
    (spec) => spec.key?.toLowerCase() === 'marca'
  )?.value;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Reviews', item: `${baseUrl}/reviews` },
      { '@type': 'ListItem', position: 3, name: review.title, item: reviewUrl },
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
    ...(isProductReview
      ? {
          reviewRating: {
            '@type': 'Rating',
            ratingValue: review.rating,
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

  const faqSection = review.contentSections?.find(
    (s) => s.heading?.toLowerCase().includes('perguntas frequentes') || s.heading?.toLowerCase().includes('faq')
  );

  let faqJsonLd = null;
  if (faqSection && faqSection.bullets) {
    const mainEntity = faqSection.bullets.map((bullet) => {
      const qMatch = bullet.match(/^([^\?]+\?)\s*(.+)$/);
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
    reviewImage: review.image,
    reviewImageAlt: review.imageAlt || review.title,
    breadcrumbJsonLd,
    jsonLd,
    faqJsonLd,
    relatedReviews,
  };
}
