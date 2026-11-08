import { COUPON_STORE_COPY } from '@/components/coupons/couponStoreCopy';
import { getArticleCopy } from '@/components/review/articleCopy';
import {
  HOME_FAQ_OVERRIDES,
  LOCALE_FAQ_COPY,
  type FaqCopyCategory,
  type FaqCopyEntry,
  type FaqCopyLink,
} from '@/components/faqs/localeFaqCopy';
import { fillTemplate, getLocaleHomeCopy } from '@/components/sections/localeHomeCopy';
import { brandLinks } from '@/lib/brandLinks';
import { getCouponHubPath } from '@/lib/couponHub';
import { getCouponStorePath, type TranslatedLocale } from '@/lib/couponTranslations';
import { getFaqPath, type FaqCategory, type FaqLink, type FaqQuestion, type FaqViewText } from '@/lib/faqPage';
import { getYesStyleLocaleConfig } from '@/lib/i18n/clusters/yesstyle';
import { getShellHomeHref } from '@/lib/i18n/shellDictionary';
import { getLocaleHomeFacts, getLocaleHomeStores } from '@/lib/localeHome';
import { getReviewHubPath } from '@/lib/review-hubs';

// O /<locale>/faq: as perguntas e os textos de cada idioma fora do PT, montados no servidor. As 4 perguntas
// da home do idioma saem de localeHomeCopy (o mesmo texto da home, salvo o HOME_FAQ_OVERRIDES: a resposta de
// "onde uso cada código" nos 9 idiomas e o contato em alemão), e as outras, de localeFaqCopy. O FaqView só
// desenha: a lista de categorias e o texto da página saem daqui no formato do /faqs.

export type LocaleFaqPage = {
  locale: TranslatedLocale;
  path: string;
  meta: { title: string; description: string };
  text: FaqViewText;
  categories: FaqCategory[];
};

const HOME_QUESTION_KEYS = {
  who: ['faqWhoQuestion', 'faqWhoAnswer'],
  why: ['faqWhyQuestion', 'faqWhyAnswer'],
  contact: ['faqContactQuestion', 'faqContactAnswer'],
} as const;

function resolveLink(link: FaqCopyLink, locale: TranslatedLocale): FaqLink {
  switch (link.target) {
    case 'coupons':
      return { href: getCouponHubPath(locale), label: link.label };
    case 'reviews':
      return { href: getReviewHubPath(locale), label: link.label };
    case 'yesstyle':
      return { href: getYesStyleLocaleConfig(locale).hubPath, label: link.label };
    case 'shein':
      return { href: getCouponStorePath('shein', locale), label: link.label };
    case 'email':
      return { href: brandLinks.contactMailto, label: link.label };
    case 'mediaKit':
      return { href: brandLinks.mediaKit, label: link.label, external: true };
  }
}

export function getLocaleFaqPage(locale: TranslatedLocale): LocaleFaqPage {
  const copy = LOCALE_FAQ_COPY[locale];
  const homeCopy = getLocaleHomeCopy(locale);
  const homeAnswerOf = (key: 'who' | 'why' | 'contact') => homeCopy[HOME_QUESTION_KEYS[key][1]];
  const stores = getLocaleHomeStores(locale);
  const facts = getLocaleHomeFacts(locale, stores);
  const path = getFaqPath(locale);
  const trail = [
    { name: COUPON_STORE_COPY[locale].homeLabel, path: getShellHomeHref(locale) },
    { name: copy.trailLabel, path },
  ];

  const toQuestion = (entry: FaqCopyEntry): FaqQuestion => {
    if ('home' in entry) {
      const override = HOME_FAQ_OVERRIDES[locale][entry.home];
      const answer = entry.home === 'where' ? HOME_FAQ_OVERRIDES[locale].where.answer : override?.answer ?? homeAnswerOf(entry.home);
      const questionKey = entry.home === 'where' ? 'faqWhereQuestion' : HOME_QUESTION_KEYS[entry.home][0];
      return {
        pergunta: override?.question ?? homeCopy[questionKey],
        resposta: fillTemplate(answer, facts),
        link: override?.link ? resolveLink(override.link, locale) : undefined,
      };
    }
    return {
      pergunta: entry.question,
      resposta: fillTemplate(entry.answer, facts),
      link: entry.link ? resolveLink(entry.link, locale) : undefined,
    };
  };

  const toCategory = (category: FaqCopyCategory): FaqCategory => ({
    id: category.id,
    categoria: category.title,
    perguntas: category.entries.map(toQuestion),
  });

  return {
    locale,
    path,
    meta: { title: copy.metaTitle, description: copy.metaDescription },
    text: {
      trail,
      trailAriaLabel: getArticleCopy(locale).breadcrumbLabel,
      title: copy.title,
      intro: copy.intro,
      categoriesLabel: copy.categoriesLabel,
      askTitle: copy.askTitle,
      askText: fillTemplate(copy.askText, facts),
      askLink: { href: brandLinks.contactMailto, label: copy.askButton },
      newsTitle: copy.newsTitle,
      newsText: copy.newsText,
      newsLink: { href: brandLinks.youtube, label: copy.newsVideos, external: true },
      newsSecondary: { href: brandLinks.mediaKit, label: copy.newsMediaKit, external: true },
    },
    categories: copy.categories.map(toCategory),
  };
}
