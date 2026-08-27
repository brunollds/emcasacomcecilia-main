import React from 'react';
import { notFound } from 'next/navigation';
import { getReviewSlug, publishedReviews, reviews } from '@/lib/data';
import { ReviewNotebookTemplate } from '@/components/review';
import { buildReviewTemplateProps } from '@/lib/review-template-props';
import { LOCALES, type Locale } from '@/lib/i18n/locales';
import { getReviewCanonicalPathname, getReviewDefaultTranslationPathname, getReviewTranslationPathnames, resolveReviewLocale } from '@/lib/content/review-i18n';

function getReviewList() {
  return process.env.NODE_ENV === 'development' ? reviews : publishedReviews;
}

export function findReviewBySlug(slug: string, locale?: Locale) {
  return getReviewList().find((review) => (
    getReviewSlug(review) === slug
    && (locale === undefined || resolveReviewLocale(review.locale) === locale)
  ));
}

export async function generateReviewMetadataBySlug(slug: string, locale?: Locale) {
  const list = getReviewList();
  const review = list.find((item) => (
    getReviewSlug(item) === slug
    && (locale === undefined || resolveReviewLocale(item.locale) === locale)
  ));

  if (!review) {
    return {
      title: 'Análise não encontrada - Em Casa com Cecília',
    };
  }

  const url = `https://emcasacomcecilia.com${getReviewCanonicalPathname(review)}`;
  const translationPaths = getReviewTranslationPathnames(review, list);
  const languages: Record<string, string> = Object.fromEntries(
    Object.entries(translationPaths).map(([translationLocale, path]) => [
      LOCALES[translationLocale as Locale].hreflang,
      `https://emcasacomcecilia.com${path}`,
    ])
  );
  const defaultTranslationPath = getReviewDefaultTranslationPathname(translationPaths);
  if (defaultTranslationPath) languages['x-default'] = `https://emcasacomcecilia.com${defaultTranslationPath}`;

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
      locale: LOCALES[resolveReviewLocale(review.locale)].openGraphLocale,
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

export function renderReviewPageBySlug(slug: string, locale?: Locale) {
  const list = getReviewList();
  const review = list.find((item) => (
    getReviewSlug(item) === slug
    && (locale === undefined || resolveReviewLocale(item.locale) === locale)
  ));
  if (!review) {
    notFound();
  }
  return <ReviewNotebookTemplate {...buildReviewTemplateProps(review, list)} languageLinks={getReviewTranslationPathnames(review, list)} />;
}
