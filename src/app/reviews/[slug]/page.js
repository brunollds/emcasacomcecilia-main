import { notFound } from 'next/navigation';
import { getReviewSlug, publishedReviews, reviews } from '@/lib/data';
import { buildSchemaAuthors, normalizeReview } from '@/lib/content';
import { ReviewNotebookTemplate } from '@/components/review';

function findReview(slug) {
  const list = process.env.NODE_ENV === 'development' ? reviews : publishedReviews;
  return list.find((review) => getReviewSlug(review) === slug);
}

function getYoutubeEmbedUrl(url) {
  if (!url) return null;

  const watchMatch = url.match(/youtube\.com\/watch\?v=([\w-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  const shortsMatch = url.match(/youtube\.com\/shorts\/([\w-]+)/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;

  return null;
}

function getRelatedReviews(review) {
  return publishedReviews
    .filter((item) => item.id !== review.id)
    .sort((a, b) => {
      const typeScore = Number(b.type === review.type) - Number(a.type === review.type);
      const productScore = Number(Boolean(b.rating) === Boolean(review.rating)) - Number(Boolean(a.rating) === Boolean(review.rating));

      return typeScore || productScore || b.id - a.id;
    })
    .slice(0, 3);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const review = findReview(slug);

  if (!review) {
    return {
      title: 'Análise não encontrada - Em Casa com Cecília',
    };
  }

  const url = `https://emcasacomcecilia.com/reviews/${getReviewSlug(review)}`;

  const languages = {};
  const yesStyleSlugs = [
    'codigo-cecilia010-yesstyle-como-usar',
    'yesstyle-reward-code-coupon-cecilia010',
    'codigo-de-recompensa-yesstyle-cupon-cecilia010',
    'code-recompense-yesstyle-cecilia010',
    'yesstyle-reward-code-rabatt-cecilia010'
  ];

  if (yesStyleSlugs.includes(slug)) {
    languages['pt-BR'] = 'https://emcasacomcecilia.com/reviews/codigo-cecilia010-yesstyle-como-usar';
    languages['en'] = 'https://emcasacomcecilia.com/reviews/yesstyle-reward-code-coupon-cecilia010';
    languages['es'] = 'https://emcasacomcecilia.com/reviews/codigo-de-recompensa-yesstyle-cupon-cecilia010';
    languages['fr'] = 'https://emcasacomcecilia.com/reviews/code-recompense-yesstyle-cecilia010';
    languages['de'] = 'https://emcasacomcecilia.com/reviews/yesstyle-reward-code-rabatt-cecilia010';
    languages['x-default'] = 'https://emcasacomcecilia.com/reviews/yesstyle-reward-code-coupon-cecilia010';
  }

  return {
    title: `${review.title} - Em Casa com Cecília`,
    description: review.description,
    alternates: {
      canonical: url,
      ...(Object.keys(languages).length > 0 ? { languages } : {})
    },
    openGraph: {
      title: review.title,
      description: review.description,
      url,
      type: 'article',
      images: review.image
        ? [{ url: review.image, alt: review.imageAlt || review.title }]
        : undefined,
    },
  };
}

export default async function ReviewPage({ params }) {
  const { slug } = await params;
  const review = findReview(slug);

  if (!review) {
    notFound();
  }

  const isProductReview = Boolean(review.rating);
  const youtubeEmbedUrl = getYoutubeEmbedUrl(review.youtubeUrl);
  const relatedReviews = getRelatedReviews(review);
  const viewModel = normalizeReview(review);

  const baseUrl = 'https://emcasacomcecilia.com';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Reviews', item: `${baseUrl}/reviews` },
      { '@type': 'ListItem', position: 3, name: review.title, item: `${baseUrl}/reviews/${getReviewSlug(review)}` },
    ],
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': isProductReview ? 'Review' : 'Article',
    name: review.title,
    headline: review.title,
    description: review.description,
    datePublished: review.publishedAtISO || review.publishedAt,
    ...(review.updatedAt ? { dateModified: review.updatedAt } : {}),
    author: buildSchemaAuthors(review.authors, review.author),
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
            name: review.title,
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

  return (
    <ReviewNotebookTemplate
      review={review}
      viewModel={viewModel}
      youtubeEmbedUrl={youtubeEmbedUrl}
      reviewImage={review.image}
      reviewImageAlt={review.imageAlt || review.title}
      breadcrumbJsonLd={breadcrumbJsonLd}
      jsonLd={jsonLd}
      faqJsonLd={faqJsonLd}
      relatedReviews={relatedReviews}
    />
  );
}

export function generateStaticParams() {
  return publishedReviews.map((review) => ({
    slug: getReviewSlug(review),
  }));
}
