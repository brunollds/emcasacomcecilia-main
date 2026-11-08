import { COUPON_HUB_COPY } from '@/components/coupons/couponHubCopy';
import { getCouponCopyLabels } from '@/components/review/couponCopyLocale';
import { getCodeHints, getCodeTitle, getSidebarCopy } from '@/components/review/sidebarCopy';
import type { CeciliaPanelCopy } from '@/components/sections/HomeCeciliaPanel';
import { getHomeCopy } from '@/components/sections/homeCopy';
import { fillTemplate, getLocaleHomeCopy } from '@/components/sections/localeHomeCopy';
import { cardImageFit } from '@/lib/cardImage';
import { getCouponHubEntries, type CouponHubEntry } from '@/lib/couponHub';
import {
  CECILIA_COUNTRY,
  CECILIA_FULL_NAME,
  CECILIA_PERSON_ID,
  CECILIA_REGION,
  CECILIA_SINCE,
  YESSTYLE_CERTIFICATE,
  getCertificateYears,
} from '@/lib/ceciliaCredentials';
import { brandLinks } from '@/lib/brandLinks';
import { getReviewCanonicalPathname } from '@/lib/content/review-i18n';
import { getCouponBySlug, getStoreCodeKind } from '@/lib/couponsData';
import { TRANSLATED_LOCALES } from '@/lib/couponTranslations';
import { CECILIA_PHOTO, getStoreCode, newestArticleRank, type HomeLatestArticle } from '@/lib/homeStores';
import type { HomeStoreArticle, HomeStoreTab } from '@/lib/homeStoreTabs';
import { LOCALES } from '@/lib/i18n/locales';
import { SITE_URL, absoluteUrl } from '@/lib/pageSeo';
import { getPublishedReviewsForLocale, getReviewHubPath } from '@/lib/review-hubs';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// A home de cada idioma fora do português (/en, /ja…): o mesmo desenho da home em português (vitrine com a
// Cecília e as lojas, e "Acabou de sair"), com os textos e os artigos do idioma. Quem monta é o servidor:
// o que vai para o cliente são só as props da vitrine.

export type LocaleHomeLocale = (typeof TRANSLATED_LOCALES)[number];
export const LOCALE_HOME_LOCALES: LocaleHomeLocale[] = TRANSLATED_LOCALES;

const LATEST_LIMIT = 5;
const VISIBLE_ARTICLES = 6;
// As redes do perfil: o mesmo perfil nas quatro; o painel mostra as três primeiras e o Person leva as quatro.
const SAME_AS_NETWORKS = [brandLinks.instagram, brandLinks.tiktok, brandLinks.youtube, brandLinks.facebook];

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

export type LocaleHomeStore = { slug: string; brand: string; code?: string; href: string };

// As lojas do hub do idioma, na ordem dele (a YesStyle primeiro). Quem usa é o FAQ, que lista os nomes.
export function getLocaleHomeStores(locale: LocaleHomeLocale): LocaleHomeStore[] {
  return getCouponHubEntries(locale).map(({ coupon, href }) => ({
    slug: coupon.slug,
    brand: coupon.brand,
    code: getStoreCode(coupon),
    href,
  }));
}

// Os marcadores {name}, {since}, {email} e {stores} dos textos do idioma (a home e o /faq).
export function getLocaleHomeFacts(locale: LocaleHomeLocale, stores: LocaleHomeStore[]) {
  return {
    name: CECILIA_FULL_NAME,
    since: CECILIA_SINCE,
    email: brandLinks.contactEmail,
    stores: new Intl.ListFormat(LOCALES[locale].htmlLang, { style: 'long', type: 'conjunction' }).format(
      stores.map((store) => store.brand)
    ),
  };
}

type HubReviews = Parameters<typeof getPublishedReviewsForLocale>[1];

function toStoreArticle(review: ReturnType<typeof getPublishedReviewsForLocale>[number]): HomeStoreArticle {
  return {
    slug: review.slug,
    href: getReviewCanonicalPathname(review),
    title: review.title,
    type: review.type,
    image: review.image ? resolveMediaUrl(review.image) : undefined,
    imageFit: cardImageFit(review),
    imagePosition: review.imagePosition,
  };
}

// As abas da vitrine: a YesStyle e as lojas traduzidas, na ordem do hub, mas as bolinhas seguem a regra do PT
// (a loja do artigo mais novo primeiro), aplicada aos artigos do idioma. Sem limitedCodes: loja traduzida não tem
// código com prazo.
export function getLocaleHomeStoreTabs(locale: LocaleHomeLocale, reviews: HubReviews): HomeStoreTab[] {
  const listed = getPublishedReviewsForLocale(locale, reviews);
  const rank = newestArticleRank(listed);
  const rankOf = (entry: CouponHubEntry) => rank.get(entry.coupon.slug) ?? Infinity;
  const sidebar = getSidebarCopy(locale);
  const labels = getCouponCopyLabels(locale);
  const chrome = getLocaleHomeCopy(locale).chrome;

  return getCouponHubEntries(locale)
    .sort((a, b) => rankOf(a) - rankOf(b))
    .map(({ coupon, href, upTo }) => {
      const code = getStoreCode(coupon);
      const kind = getStoreCodeKind(coupon, code);
      const articles = listed.filter((review) => review.affiliate === coupon.slug);
      return {
        slug: coupon.slug,
        brand: coupon.brand,
        logo: coupon.brandLogo ? resolveMediaUrl(coupon.brandLogo) : undefined,
        initials: coupon.brandIcon,
        label: code ? getCodeTitle(sidebar, kind, coupon.brand) : coupon.brand,
        code,
        copyAria: code ? labels.copyCoupon(code) : '',
        // A YesStyle dá o desconto até o número (5% na 1ª compra, menos nas seguintes): o "até" vai no texto.
        discount: upTo ? `${COUPON_HUB_COPY[locale].upTo} ${coupon.discount}` : coupon.discount,
        description: coupon.shortDescription,
        hints: getCodeHints(sidebar, kind, coupon.brand),
        storeUrl: coupon.offerUrl,
        storeLinkLabel: fillTemplate(chrome.storeGo, { store: coupon.brand }),
        storePageUrl: href,
        listTitle: fillTemplate(chrome.storeArticles, { store: coupon.brand }),
        articles: articles.slice(0, VISIBLE_ARTICLES).map(toStoreArticle),
        total: articles.length,
        emptyText: fillTemplate(chrome.storeEmpty, { store: coupon.brand }),
      };
    });
}

export function getLocaleHomeLatest(locale: LocaleHomeLocale, reviews: HubReviews): HomeLatestArticle[] {
  const dateFormat = new Intl.DateTimeFormat(LOCALES[locale].htmlLang, { dateStyle: 'medium', timeZone: 'UTC' });
  return getPublishedReviewsForLocale(locale, reviews)
    .slice(0, LATEST_LIMIT)
    .map((review) => ({
      ...toStoreArticle(review),
      dateLabel: review.publishedAtISO ? dateFormat.format(new Date(review.publishedAtISO)) : review.publishedAt,
      store: review.affiliate ? getCouponBySlug(review.affiliate)?.brand : undefined,
    }));
}

function getLocaleCeciliaPanel(locale: LocaleHomeLocale, facts: ReturnType<typeof getLocaleHomeFacts>): CeciliaPanelCopy {
  const copy = getLocaleHomeCopy(locale);
  const longDate = new Intl.DateTimeFormat(LOCALES[locale].htmlLang, { dateStyle: 'long', timeZone: 'UTC' });
  return {
    titleTop: copy.heroTitleTop,
    titleBottom: copy.heroTitleBottom,
    intro: copy.intro,
    photo: {
      alt: copy.photoAlt,
      followers: copy.followers,
      captionLabel: copy.photoCaptionLabel,
      captionTitle: copy.photoCaptionTitle,
      instagramLabel: fillTemplate(copy.socialAria, { network: 'Instagram' }),
    },
    socialAria: copy.socialAria,
    pick: copy.chrome.pick,
    profile: {
      name: CECILIA_FULL_NAME,
      location: copy.location,
      since: fillTemplate(copy.since, facts),
      email: brandLinks.contactEmail,
      mailto: brandLinks.contactMailto,
      emailCta: copy.emailCta,
      certificate: {
        title: YESSTYLE_CERTIFICATE.title,
        tier: fillTemplate(copy.certificateTier, { years: getCertificateYears() }),
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
        linkLabel: copy.certificateLink,
        closeLabel: copy.certificateClose,
      },
    },
  };
}

export function getLocaleHomeContent(locale: LocaleHomeLocale, reviews: HubReviews) {
  const copy = getLocaleHomeCopy(locale);
  const stores = getLocaleHomeStoreTabs(locale, reviews);
  if (stores.length === 0) {
    throw new Error(`[localeHome] /${locale} sem loja parceira: a home de cada idioma precisa de uma loja ativa com página traduzida.`);
  }
  const facts = getLocaleHomeFacts(locale, getLocaleHomeStores(locale));

  return {
    locale,
    htmlLang: LOCALES[locale].htmlLang,
    path: getLocaleHomePath(locale),
    meta: { title: copy.metaTitle, description: fillTemplate(copy.metaDescription, facts) },
    photoUrl: new URL(CECILIA_PHOTO, SITE_URL).href,
    sameAs: SAME_AS_NETWORKS,
    panel: getLocaleCeciliaPanel(locale, facts),
    copy: getHomeCopy(locale),
    stores,
    latest: getLocaleHomeLatest(locale, reviews),
    latestAllHref: getReviewHubPath(locale),
  };
}

export type LocaleHomeContent = ReturnType<typeof getLocaleHomeContent>;

// O Person liga o site à Cecília de verdade (nome completo, região e redes). Organization e WebSite já vêm do
// layout; o FAQPage não fica aqui, porque as perguntas estão na página /<locale>/faq.
export function getLocaleHomeJsonLd(content: LocaleHomeContent) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": CECILIA_PERSON_ID,
      name: CECILIA_FULL_NAME,
      url: absoluteUrl(content.path),
      image: content.photoUrl,
      address: { "@type": "PostalAddress", addressRegion: CECILIA_REGION, addressCountry: CECILIA_COUNTRY },
      sameAs: content.sameAs,
    },
  ];
}
