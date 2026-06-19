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

  return {
    title: `${review.title} - Em Casa com Cecília`,
    description: review.description,
    alternates: {
      canonical: url,
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

  return (
    <ReviewNotebookTemplate
      review={review}
      viewModel={viewModel}
      youtubeEmbedUrl={youtubeEmbedUrl}
      reviewImage={review.image}
      reviewImageAlt={review.imageAlt || review.title}
      breadcrumbJsonLd={breadcrumbJsonLd}
      jsonLd={jsonLd}
      relatedReviews={relatedReviews}
    />
  );
}

export function generateStaticParams() {
  return publishedReviews.map((review) => ({
    slug: getReviewSlug(review),
  }));
}
