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
    'yesstyle-reward-code-coupon-cecilia010',
    'codigo-de-recompensa-yesstyle-cupon-cecilia010',
    'code-recompense-yesstyle-cecilia010',
    'yesstyle-reward-code-rabatt-cecilia010',
    'yesstyle-reward-code-cecilia010-ko',
    'yesstyle-reward-code-cecilia010-ja',
    'yesstyle-reward-code-cecilia010-zh-hant',
    'yesstyle-reward-code-cecilia010-zh-hans'
  ];

  if (yesStyleSlugs.includes(slug)) {
    languages['pt-BR'] = 'https://emcasacomcecilia.com/cupons/yesstyle';
    languages['en'] = 'https://emcasacomcecilia.com/reviews/yesstyle-reward-code-coupon-cecilia010';
    languages['es'] = 'https://emcasacomcecilia.com/reviews/codigo-de-recompensa-yesstyle-cupon-cecilia010';
    languages['fr'] = 'https://emcasacomcecilia.com/reviews/code-recompense-yesstyle-cecilia010';
    languages['de'] = 'https://emcasacomcecilia.com/reviews/yesstyle-reward-code-rabatt-cecilia010';
    languages['ko'] = 'https://emcasacomcecilia.com/reviews/yesstyle-reward-code-cecilia010-ko';
    languages['ja'] = 'https://emcasacomcecilia.com/reviews/yesstyle-reward-code-cecilia010-ja';
    languages['zh-Hant'] = 'https://emcasacomcecilia.com/reviews/yesstyle-reward-code-cecilia010-zh-hant';
    languages['zh-Hans'] = 'https://emcasacomcecilia.com/reviews/yesstyle-reward-code-cecilia010-zh-hans';
    languages['x-default'] = 'https://emcasacomcecilia.com/reviews/yesstyle-reward-code-coupon-cecilia010';
  }

  const seoDescription = review.metaDescription || review.description;
  const seoTitle = review.seoTitle || review.title;
  const documentTitle = seoTitle.length <= 42
    ? `${seoTitle} - Em Casa com Cecília`
    : seoTitle;
  const socialImage = review.image
    ? [{ url: review.image, alt: review.imageAlt || review.title }]
    : undefined;

  return {
    title: documentTitle,
    description: seoDescription,
    alternates: {
      canonical: url,
      ...(Object.keys(languages).length > 0 ? { languages } : {})
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url,
      type: 'article',
      publishedTime: review.publishedAtISO,
      modifiedTime: review.updatedAt,
      authors: review.authors?.map((author) => author.name),
      images: socialImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: review.image ? [review.image] : undefined,
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
