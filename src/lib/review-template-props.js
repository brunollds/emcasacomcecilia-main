import { getReviewSlug, publishedReviews } from '@/lib/data';
import { getArticleStoreBlock } from '@/lib/articleStore';
import { pickRelatedReviews } from '@/lib/relatedReviews';
import { getRelatedShelfCards } from '@/lib/reviewsHub';
import { buildSchemaAuthors, normalizeReview } from '@/lib/content';
import { getReviewCanonicalPathname, resolveReviewLocale } from '@/lib/content/review-i18n';
import { getShellCopy, getShellHomeHref } from '@/lib/i18n/shellDictionary';
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
import { getFaqItems, isFaqHeading } from '@/lib/faq';
import { inlineMarkdownToHtml, inlineMarkdownToText } from '@/lib/inlineMarkdown';

export { getYoutubeEmbedUrl };

/**
 * O item é só o slug, e o texto de cada link é o título atual do artigo de destino: um título guardado no item ficava
 * velho quando o destino mudava de título. Sem destino, o que só acontece no /preview (o validate:content barra nos
 * artigos no ar), o link vai ao endereço previsto e mostra o slug.
 * @param {{ slug: string; locale?: string; relatedArticles?: Array<{ slug: string }> }} review
 * @param {Array<{ slug: string; locale?: string; title: string }>} reviewCorpus
 * @returns {Array<{ slug: string; title: string; href: string }>}
 */
export function resolveRelatedArticleLinks(review, reviewCorpus = publishedReviews) {
  const sourceLocale = resolveReviewLocale(review.locale);
  const toLink = (target) => ({ slug: target.slug, title: target.title, href: getReviewCanonicalPathname(target) });
  return (review.relatedArticles || []).map(({ slug }) => {
    const candidates = reviewCorpus.filter((item) => item.slug === slug);
    if (candidates.length === 0) {
      return { slug, title: slug, href: getReviewCanonicalPathname({ slug, locale: sourceLocale }) };
    }

    if (candidates.length === 1) {
      return toLink(candidates[0]);
    }

    const sameLocaleCandidates = candidates.filter((item) => resolveReviewLocale(item.locale) === sourceLocale);
    if (sameLocaleCandidates.length !== 1) {
      throw new Error(`relatedArticles ambíguo para "${slug}" em "${review.slug}"`);
    }

    return toLink(sameLocaleCandidates[0]);
  });
}

export function buildReviewTemplateProps(review, reviewCorpus = publishedReviews) {
  const canonicalRating = review.rating ?? review.verdict?.stars;
  const isProductReview = review.reviewKind === 'produto' || typeof canonicalRating === 'number';
  const youtubeEmbedUrl = getYoutubeEmbedUrl(review.youtubeUrl);
  const relatedArticleLinks = resolveRelatedArticleLinks(review, reviewCorpus);
  const viewModel = normalizeReview(review);

  const currentSlug = getReviewSlug(review);
  const localeKey = resolveReviewLocale(review.locale);
  const relatedReviews = getRelatedShelfCards(pickRelatedReviews(review, reviewCorpus, 6), localeKey);
  const copy = getShellCopy(localeKey);
  // A lista de guias tem o nome que o menu do idioma usa (em PT, Guias & Análises).
  const reviewHub = localeKey === 'pt'
    ? { href: '/reviews', label: copy.reviewHubLabel }
    : getInternationalReviewHub(localeKey);

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

  // Home do idioma > lista de artigos > artigo, em todos os idiomas. A trilha visível do template
  // lê esta mesma lista; o schema acrescenta o artigo.
  const breadcrumbs = [
    { name: copy.homeLabel, href: getShellHomeHref(localeKey) },
    { name: reviewHub.label, href: reviewHub.href },
  ];
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      // A raiz sai sem a barra final, como sempre saiu no PT.
      ...breadcrumbs.map(({ name, href }) => ({ name, item: href === '/' ? baseUrl : `${baseUrl}${href}` })),
      { name: review.title, item: reviewUrl },
    ].map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, ...crumb })),
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
    dateModified: review.updatedAt || review.publishedAtISO || review.publishedAt,
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

  // Toda seção com título de FAQ, como no acordeão, que mostra cada uma delas.
  const faqItems = (review.contentSections ?? [])
    .filter((section) => isFaqHeading(section.heading))
    .flatMap((section) => getFaqItems(section.bullets));
  const faqJsonLd = faqItems.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        // O que o acordeão mostra: a pergunta em texto puro e a resposta com o link e o negrito em HTML.
        mainEntity: faqItems.map(({ question, answer }) => ({
          '@type': 'Question',
          name: inlineMarkdownToText(question),
          acceptedAnswer: {
            '@type': 'Answer',
            text: inlineMarkdownToHtml(answer, baseUrl),
          },
        })),
      }
    : null;

  return {
    review,
    viewModel,
    youtubeEmbedUrl,
    videoPageUrl,
    reviewImage: review.image ? resolveMediaUrl(review.image) : review.image,
    reviewImageAlt: review.imageAlt || review.title,
    breadcrumbs,
    breadcrumbJsonLd,
    jsonLd,
    faqJsonLd,
    relatedReviews,
    storeBlock: getArticleStoreBlock(review, localeKey),
    relatedArticleLinks,
    localeKey,
  };
}
