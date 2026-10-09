import { getYesStylePage } from '@/components/coupons/yesstyleCopy';
import { getCodeTitle, getSidebarCopy } from '@/components/review/sidebarCopy';
import type { CeciliaPhotoCopy, SocialName } from '@/components/sections/CeciliaProfile';
import { fillTemplate, getLocaleHomeCopy } from '@/components/sections/localeHomeCopy';
import { brandLinks } from '@/lib/brandLinks';
import {
  CECILIA_FULL_NAME,
  CECILIA_SINCE,
  YESSTYLE_CERTIFICATE,
  getCertificateYears,
} from '@/lib/ceciliaCredentials';
import { getReviewCanonicalPathname } from '@/lib/content/review-i18n';
import { getCouponBySlug, getStoreCodeKind, type Coupon } from '@/lib/couponsData';
import {
  TRANSLATED_LOCALES,
  getCouponStorePath,
  getLocalizedCoupon,
  getTranslatedCouponRoutes,
  type TranslatedLocale,
} from '@/lib/couponTranslations';
import { CECILIA_PHOTO, getCeciliaSocialStats, getStoreCode, type HomeLatestArticle } from '@/lib/homeStores';
import { LOCALES } from '@/lib/i18n/locales';
import { SITE_URL, absoluteUrl } from '@/lib/pageSeo';
import { getPublishedReviewsForLocale, getReviewHubCopy, getReviewHubPath } from '@/lib/review-hubs';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// A home de cada idioma fora do português (/en, /ja…): quem é a Cecília, as lojas parceiras com página
// no idioma, os artigos do idioma, "É seguro?", perguntas frequentes e as redes. Sai daqui montada e
// traduzida; os componentes só desenham. Quem chama é o servidor: nada daqui vai para o cliente.

export type LocaleHomeLocale = TranslatedLocale;
export const LOCALE_HOME_LOCALES: LocaleHomeLocale[] = TRANSLATED_LOCALES;

const ARTICLE_LIMIT = 6;
const HERO_NETWORKS: readonly SocialName[] = ['Instagram', 'TikTok', 'YouTube'];
const FOLLOW_NETWORKS: readonly SocialName[] = ['Instagram', 'TikTok', 'YouTube', 'Facebook'];
const NETWORK_URL: Record<SocialName, string> = {
  Instagram: brandLinks.instagram,
  TikTok: brandLinks.tiktok,
  YouTube: brandLinks.youtube,
  Facebook: brandLinks.facebook,
};

export function getLocaleHomePath(locale: LocaleHomeLocale): string {
  return `/${locale}`;
}

// hreflang da home: a raiz em português e as 9 homes, que se apontam umas para as outras. Quem não fala
// nenhum dos idiomas cai no inglês, como nos artigos traduzidos.
export function getHomeLanguageLinks(): Record<string, string> {
  const languages: Record<string, string> = { [LOCALES.pt.hreflang]: absoluteUrl('/') };
  for (const locale of LOCALE_HOME_LOCALES) {
    languages[LOCALES[locale].hreflang] = absoluteUrl(getLocaleHomePath(locale));
  }
  languages['x-default'] = absoluteUrl(getLocaleHomePath('en'));
  return languages;
}

export type LocaleHomeStore = {
  slug: string;
  brand: string;
  logo?: string;
  initials: string;
  category: string;
  code?: string;
  codeLabel?: string;
  href: string;
};

function toHomeStore(store: Coupon, category: string, locale: LocaleHomeLocale): LocaleHomeStore {
  const code = getStoreCode(store);
  return {
    slug: store.slug,
    brand: store.brand,
    logo: store.brandLogo ? resolveMediaUrl(store.brandLogo) : undefined,
    initials: store.brandIcon,
    category,
    code,
    codeLabel: code ? getCodeTitle(getSidebarCopy(locale), getStoreCodeKind(store, code), store.brand) : undefined,
    href: getCouponStorePath(store.slug, locale),
  };
}

// A YesStyle primeiro, depois as lojas de couponTranslations.ts com loja ativa, na ordem de lá. Loja que
// ganha página traduzida entra sozinha; loja pausada sai.
export function getLocaleHomeStores(locale: LocaleHomeLocale): LocaleHomeStore[] {
  const stores: LocaleHomeStore[] = [];
  const yesStyle = getCouponBySlug('yesstyle');
  const yesStylePage = getYesStylePage(locale);
  if (yesStyle && yesStylePage) stores.push(toHomeStore(yesStyle, yesStylePage.category, locale));

  for (const slug of new Set(getTranslatedCouponRoutes().map((route) => route.slug))) {
    // A YesStyle já entrou primeiro, pelas páginas estáticas dela: se um dia constar aqui, não repete.
    if (slug === 'yesstyle') continue;
    const coupon = getLocalizedCoupon(slug, locale);
    if (coupon) stores.push(toHomeStore(coupon, coupon.category, locale));
  }
  return stores;
}

type HubReviews = Parameters<typeof getPublishedReviewsForLocale>[1];

type LocaleHomeFaqItem = { question: string; answer: string; links?: Array<{ label: string; href: string }> };

export function getLocaleHomeContent(locale: LocaleHomeLocale, reviews: HubReviews) {
  const copy = getLocaleHomeCopy(locale);
  const { htmlLang } = LOCALES[locale];
  const stores = getLocaleHomeStores(locale);
  if (stores.length === 0) {
    throw new Error(`[localeHome] /${locale} sem loja parceira: a home de cada idioma precisa de uma loja ativa com página traduzida.`);
  }

  const facts = {
    name: CECILIA_FULL_NAME,
    since: CECILIA_SINCE,
    email: brandLinks.contactEmail,
    stores: new Intl.ListFormat(htmlLang, { style: 'long', type: 'conjunction' }).format(stores.map((store) => store.brand)),
  };
  const listed = getPublishedReviewsForLocale(locale, reviews);
  const dateFormat = new Intl.DateTimeFormat(htmlLang, { dateStyle: 'medium', timeZone: 'UTC' });
  const longDate = new Intl.DateTimeFormat(htmlLang, { dateStyle: 'long', timeZone: 'UTC' });
  const hub = getReviewHubCopy(locale);
  const photo: CeciliaPhotoCopy = {
    alt: copy.photoAlt,
    followers: copy.followers,
    captionLabel: copy.photoCaptionLabel,
    captionTitle: copy.photoCaptionTitle,
    instagramLabel: fillTemplate(copy.socialAria, { network: 'Instagram' }),
  };
  const faqItems: LocaleHomeFaqItem[] = [
    { question: copy.faqWhoQuestion, answer: fillTemplate(copy.faqWhoAnswer, facts) },
    { question: copy.faqWhyQuestion, answer: fillTemplate(copy.faqWhyAnswer, facts) },
    {
      question: copy.faqWhereQuestion,
      answer: copy.faqWhereAnswer,
      links: stores.map((store) => ({ label: store.brand, href: store.href })),
    },
    { question: copy.faqContactQuestion, answer: fillTemplate(copy.faqContactAnswer, facts) },
  ];

  return {
    locale,
    htmlLang,
    path: getLocaleHomePath(locale),
    meta: { title: copy.metaTitle, description: fillTemplate(copy.metaDescription, facts) },
    hero: {
      titleTop: copy.heroTitleTop,
      titleBottom: copy.heroTitleBottom,
      name: CECILIA_FULL_NAME,
      intro: copy.intro,
      location: copy.location,
      since: fillTemplate(copy.since, facts),
      email: brandLinks.contactEmail,
      mailto: brandLinks.contactMailto,
      emailCta: copy.emailCta,
      certificate: {
        title: YESSTYLE_CERTIFICATE.title,
        tier: fillTemplate(copy.certificateTier, { years: getCertificateYears() }),
        linkLabel: copy.certificateLink,
        closeLabel: copy.certificateClose,
        image: {
          src: resolveMediaUrl(YESSTYLE_CERTIFICATE.image.src),
          width: YESSTYLE_CERTIFICATE.image.width,
          height: YESSTYLE_CERTIFICATE.image.height,
          alt: fillTemplate(copy.certificateAlt, {
            name: CECILIA_FULL_NAME,
            from: longDate.format(new Date(`${YESSTYLE_CERTIFICATE.validFrom}T00:00:00Z`)),
            until: longDate.format(new Date(`${YESSTYLE_CERTIFICATE.validUntil}T00:00:00Z`)),
          }),
        },
      },
      photo,
      photoUrl: new URL(CECILIA_PHOTO, SITE_URL).href,
      stats: getCeciliaSocialStats(),
      social: HERO_NETWORKS.map((name) => ({
        name,
        href: NETWORK_URL[name],
        label: fillTemplate(copy.socialAria, { network: name }),
      })),
    },
    stores: { title: copy.storesTitle, intro: copy.storesIntro, items: stores },
    articles: {
      title: hub.title,
      description: hub.description,
      items: listed.slice(0, ARTICLE_LIMIT).map(
        (review): HomeLatestArticle => ({
          slug: review.slug,
          href: getReviewCanonicalPathname(review),
          title: review.title,
          type: review.type,
          dateLabel: review.publishedAtISO ? dateFormat.format(new Date(review.publishedAtISO)) : review.publishedAt,
          image: review.image ? resolveMediaUrl(review.image) : undefined,
        })
      ),
      all: { href: getReviewHubPath(locale), label: fillTemplate(copy.allArticles, { count: listed.length }) },
    },
    safety: { title: copy.safetyTitle, items: [...copy.safety] },
    faq: { title: copy.faqTitle, items: faqItems },
    follow: {
      title: copy.followTitle,
      intro: copy.followIntro,
      // O mesmo perfil nas quatro redes.
      networks: FOLLOW_NETWORKS.map((name) => ({ name, href: NETWORK_URL[name], handle: '@emcasacomcecilia' })),
    },
  };
}

export type LocaleHomeContent = ReturnType<typeof getLocaleHomeContent>;
