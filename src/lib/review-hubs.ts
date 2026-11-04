import type { Review } from '@/lib/content/types';
import { compareReviewsNewestFirst, isListedInLocale } from '@/lib/reviewVisibility.mjs';
import { LOCALE_KEYS, type Locale } from '@/lib/i18n/locales';

export type ReviewHubLocale = Exclude<Locale, 'pt'>;
type ReviewHubReview = Review & { draft?: boolean };

export const REVIEW_HUB_LOCALES = LOCALE_KEYS.filter(
  (locale): locale is ReviewHubLocale => locale !== 'pt'
);

type ReviewHubCopy = {
  title: string;
  /** O subtítulo da página. */
  description: string;
  /** O snippet da busca: as lojas que a lista cobre e o que o leitor encontra nela. */
  metaDescription: string;
};

const REVIEW_HUB_COPY: Record<ReviewHubLocale, ReviewHubCopy> = {
  en: {
    title: 'Guides & Reviews',
    description: 'Practical guides and independent reviews selected for you.',
    metaDescription:
      'Guides and reviews on YesStyle, SHEIN and Hostinger by Em Casa com Cecília: whether each store is safe, shipping, fees, Black Friday and how to use our codes.',
  },
  es: {
    title: 'Guías y reseñas',
    description: 'Guías prácticas y análisis independientes seleccionados para ti.',
    metaDescription:
      'Guías y reseñas de Em Casa com Cecília sobre YesStyle, SHEIN y Hostinger: si cada tienda es fiable, envíos, tasas, Black Friday y cómo usar nuestros códigos.',
  },
  fr: {
    title: 'Guides et avis',
    description: 'Des guides pratiques et des avis indépendants sélectionnés pour vous.',
    metaDescription:
      'Guides et avis d’Em Casa com Cecília sur YesStyle, SHEIN et Hostinger : fiabilité de chaque boutique, livraison, frais, Black Friday et nos codes.',
  },
  de: {
    title: 'Ratgeber und Tests',
    description: 'Praktische Ratgeber und unabhängige Tests für Sie ausgewählt.',
    metaDescription:
      'Ratgeber und Tests von Em Casa com Cecília zu YesStyle, SHEIN und Hostinger: Ist der Shop seriös? Versand, Gebühren, Black Friday und unsere Codes.',
  },
  it: {
    title: 'Guide e recensioni',
    description: 'Guide pratiche e recensioni indipendenti selezionate per te.',
    metaDescription:
      'Guide e recensioni di Em Casa com Cecília su YesStyle, SHEIN e Hostinger: se il negozio è affidabile, spedizioni, costi, Black Friday e i nostri codici.',
  },
  ko: {
    title: '가이드와 리뷰',
    description: '실용적인 가이드와 독립적인 리뷰를 모았습니다.',
    metaDescription:
      'Em Casa com Cecília의 YesStyle, SHEIN, Hostinger 가이드와 리뷰: 믿을 만한 쇼핑몰인지, 배송, 비용, 블랙 프라이데이, 저희 코드 사용법까지 정리했습니다.',
  },
  ja: {
    title: 'ガイドとレビュー',
    description: '実用的なガイドと独立したレビューを集めました。',
    metaDescription:
      'Em Casa com CecíliaによるYesStyle・SHEIN・Hostingerのガイドとレビュー。ストアの信頼性、配送、手数料、ブラックフライデー、私たちのコードの使い方をまとめました。',
  },
  'zh-hant': {
    title: '指南與評測',
    description: '精選實用指南與獨立評測。',
    metaDescription:
      'Em Casa com Cecília 的 YesStyle、SHEIN 與 Hostinger 指南與評測：商店是否可靠、配送、費用、黑色星期五，以及我們代碼的使用方式。',
  },
  'zh-hans': {
    title: '指南与评测',
    description: '精选实用指南与独立评测。',
    metaDescription:
      'Em Casa com Cecília 的 YesStyle、SHEIN 和 Hostinger 指南与评测：商店是否可靠、配送、费用、黑色星期五，以及我们代码的使用方法。',
  },
};

export function getReviewHubPath(locale: ReviewHubLocale): string {
  return `/${locale}/reviews`;
}

export function getReviewHubCopy(locale: ReviewHubLocale): ReviewHubCopy {
  return REVIEW_HUB_COPY[locale];
}

export function getInternationalReviewHub(locale: ReviewHubLocale): {
  href: string;
  label: string;
} {
  const copy = getReviewHubCopy(locale);

  return { href: getReviewHubPath(locale), label: copy.title };
}

export function getPublishedReviewsForLocale(
  locale: ReviewHubLocale,
  reviews: readonly ReviewHubReview[]
): ReviewHubReview[] {
  // A mesma regra do índice de busca do idioma (createLocaleSearchIndex).
  return reviews.filter((review) => isListedInLocale(review, locale)).sort(compareReviewsNewestFirst);
}
