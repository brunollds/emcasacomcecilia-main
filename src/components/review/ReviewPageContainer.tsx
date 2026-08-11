import React from 'react';
import { notFound } from 'next/navigation';
import { getReviewSlug, publishedReviews, reviews } from '@/lib/data';
import { ReviewNotebookTemplate } from '@/components/review';
import { buildReviewTemplateProps } from '@/lib/review-template-props';
import { LOCALES, type Locale } from '@/lib/i18n/locales';
import {
  findYesStyleArticleKey,
  findYesStyleLocaleFromSlugOrPath,
  getYesStyleArticleLanguageLinks,
  getYesStyleLocaleConfig,
} from '@/lib/i18n/clusters/yesstyle';

export function findReviewBySlug(slug: string) {
  const list = process.env.NODE_ENV === 'development' ? reviews : publishedReviews;
  return list.find((review) => getReviewSlug(review) === slug);
}

export async function generateReviewMetadataBySlug(slug: string) {
  const review = findReviewBySlug(slug);

  if (!review) {
    return {
      title: 'Análise não encontrada - Em Casa com Cecília',
    };
  }

  const url = `https://emcasacomcecilia.com/reviews/${getReviewSlug(review)}`;
  const currentLocaleKey = review.locale || findYesStyleLocaleFromSlugOrPath(slug) || 'pt';
  const localeConfig = getYesStyleLocaleConfig(currentLocaleKey);

  const languages: Record<string, string> = {};
  const articleKey = findYesStyleArticleKey(slug);

  if (articleKey) {
    const articleLinks = getYesStyleArticleLanguageLinks(articleKey);
    for (const [locale, path] of Object.entries(articleLinks)) {
      languages[LOCALES[locale as Locale].hreflang] = `https://emcasacomcecilia.com${path}`;
    }
    languages['x-default'] = `https://emcasacomcecilia.com${articleLinks.en}`;
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
      ...(Object.keys(languages).length > 0 ? { languages } : {}),
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url,
      type: 'article',
      locale: localeConfig.openGraphLocale,
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

export function renderReviewPageBySlug(slug: string) {
  const review = findReviewBySlug(slug);
  if (!review) {
    notFound();
  }
  return <ReviewNotebookTemplate {...buildReviewTemplateProps(review)} />;
}
