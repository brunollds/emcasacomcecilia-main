import { notFound } from 'next/navigation';
import { getReviewSlug, publishedReviews, reviews } from '@/lib/data';
import { ReviewNotebookTemplate } from '@/components/review';
import { buildReviewTemplateProps } from '@/lib/review-template-props';

function findReview(slug) {
  const list = process.env.NODE_ENV === 'development' ? reviews : publishedReviews;
  return list.find((review) => getReviewSlug(review) === slug);
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

  const seoDescription = review.metaDescription || review.description;

  return {
    title: `${review.title} - Em Casa com Cecília`,
    description: seoDescription,
    alternates: {
      canonical: url,
      ...(Object.keys(languages).length > 0 ? { languages } : {})
    },
    openGraph: {
      title: review.title,
      description: seoDescription,
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

  return <ReviewNotebookTemplate {...buildReviewTemplateProps(review)} />;
}

export function generateStaticParams() {
  return publishedReviews.map((review) => ({
    slug: getReviewSlug(review),
  }));
}
