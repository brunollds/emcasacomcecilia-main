import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CircleCheck } from 'lucide-react';
import { CouponFaq, SectionHeading, ShelfHeading, couponFontVariables } from '@/components/coupons/CouponBlocks';
import { CouponShelfItem, HubCouponCard, SHELF_CARD, layoutShelf } from '@/components/coupons/CouponCards';
import { COUPON_HUB_COPY } from '@/components/coupons/couponHubCopy';
import { COUPON_STORE_COPY } from '@/components/coupons/couponStoreCopy';
import { RevealSection } from '@/components/ui/RevealSection';
import {
  COUPON_HUB_LOGO_URL,
  getCouponCardLabels,
  getCouponHubAlternates,
  getCouponHubEntries,
  getCouponHubItemName,
  getCouponHubLastVerified,
  getCouponHubPath,
  getCouponHubShelves,
  getCouponHubText,
} from '@/lib/couponHub';
import { TRANSLATED_LOCALES, isTranslatedLocale, type TranslatedLocale } from '@/lib/couponTranslations';
import { LOCALES } from '@/lib/i18n/locales';
import { getShellHomeHref } from '@/lib/i18n/shellDictionary';
import { getOfferMonthDate } from '@/lib/offerMonth';
import { SITE_NAME, absoluteUrl } from '@/lib/pageSeo';

type CouponsHubProps = {
  params: Promise<{ locale: string }>;
};

// Os 9 idiomas fora do PT. A lista de endereços sai na build; o resto cai na página 404 global.
export const dynamicParams = false;

export function generateStaticParams() {
  return TRANSLATED_LOCALES.map((locale) => ({ locale }));
}

async function findLocale(params: CouponsHubProps['params']): Promise<TranslatedLocale | null> {
  const { locale } = await params;
  return isTranslatedLocale(locale) ? locale : null;
}

export async function generateMetadata({ params }: CouponsHubProps): Promise<Metadata> {
  const locale = await findLocale(params);
  if (!locale) return {};

  const { metaTitle } = getCouponHubText(locale);
  const { metaDescription } = COUPON_HUB_COPY[locale];
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: getCouponHubAlternates(locale),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: getCouponHubPath(locale),
      locale: LOCALES[locale].openGraphLocale,
      siteName: SITE_NAME,
      type: 'website',
      images: [{ url: COUPON_HUB_LOGO_URL, alt: SITE_NAME }],
    },
  };
}

function getJsonLd(locale: TranslatedLocale) {
  const copy = COUPON_STORE_COPY[locale];
  const text = getCouponHubText(locale);
  const entries = getCouponHubEntries(locale);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: copy.homeLabel, item: absoluteUrl(getShellHomeHref(locale)) },
      { '@type': 'ListItem', position: 2, name: copy.couponsLabel, item: absoluteUrl(getCouponHubPath(locale)) },
    ],
  };

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: text.title,
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: getCouponHubItemName(entry, locale),
      url: absoluteUrl(entry.href),
    })),
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: text.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return [breadcrumb, itemList, faq];
}

export default async function LocalizedCouponsHub({ params }: CouponsHubProps) {
  const locale = await findLocale(params);
  if (!locale) notFound();

  const copy = COUPON_STORE_COPY[locale];
  const text = getCouponHubText(locale);
  const entries = getCouponHubEntries(locale);
  const { featured, shelf } = getCouponHubShelves(locale);
  const labels = getCouponCardLabels(locale);
  const hrefBySlug = new Map(entries.map(({ coupon, href }) => [coupon.slug, href]));

  // Mês da oferta pela conferência mais recente entre as lojas do hub, como no PT.
  const lastVerified = getCouponHubLastVerified(entries);
  const offerMonth = lastVerified ? getOfferMonthDate(lastVerified) : null;
  const offerMonthLabel = offerMonth
    ? offerMonth.toLocaleDateString(copy.dateLocale, { month: 'long', year: 'numeric' })
    : null;
  const offerMonthIso = offerMonth
    ? `${offerMonth.getFullYear()}-${String(offerMonth.getMonth() + 1).padStart(2, '0')}`
    : null;

  const shelfItems = layoutShelf(shelf.map((entry) => entry.coupon));

  return (
    <main className={`${couponFontVariables} min-h-screen bg-white text-marinho`}>
      {getJsonLd(locale).map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="border-b-2 border-marinho bg-amarelo-cupom">
        <div className="mx-auto max-w-6xl px-4 pt-5 pb-6 md:px-8 md:pt-10 md:pb-9">
          <h1 className="font-condensada text-[64px] font-black leading-[0.92] tracking-[-0.01em] font-stretch-extra-condensed md:text-[96px]">
            {text.title}
          </h1>
          <p className="mt-3 max-w-[54ch] text-[15px] font-semibold leading-[22px] md:text-[17px] md:leading-[26px]">
            {text.lead}
          </p>
          {offerMonthLabel && offerMonthIso && (
            <p className="mt-3.5 flex items-center gap-2 text-[13px] font-bold leading-[18px] text-verde-escuro">
              <CircleCheck aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
              <span>
                {text.validMonth.before}
                <time dateTime={offerMonthIso}>{offerMonthLabel}</time>
                {text.validMonth.after}
              </span>
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-7 px-4 pt-6 md:gap-10 md:px-8 md:pt-10">
        {featured.length > 0 && (
          <section aria-labelledby="destaques" className="flex flex-col gap-3">
            <ShelfHeading id="destaques">{text.featuredTitle}</ShelfHeading>
            <div className={`grid gap-3 md:gap-4 ${featured.length > 1 ? 'md:grid-cols-[3fr_2fr]' : ''}`}>
              {featured.map(({ coupon, href, upTo }, index) => (
                <HubCouponCard
                  key={coupon.slug}
                  coupon={coupon}
                  href={href}
                  labels={labels}
                  upTo={upTo}
                  variant={index === 0 ? 'lead' : 'featured'}
                  stampOrder={index}
                />
              ))}
            </div>
          </section>
        )}

        {shelf.length > 0 && (
          <RevealSection aria-labelledby="prateleira-lojas" className="flex flex-col gap-3">
            <ShelfHeading id="prateleira-lojas">{text.shelfTitle}</ShelfHeading>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 pt-4 md:grid-cols-4">
              {shelfItems.map(({ coupon, wide }, index) => (
                <CouponShelfItem key={coupon.slug} index={index} className={wide ? 'col-span-2' : ''}>
                  <HubCouponCard
                    coupon={coupon}
                    href={hrefBySlug.get(coupon.slug)}
                    labels={labels}
                    variant={wide ? 'wide' : 'narrow'}
                    className={SHELF_CARD}
                  />
                </CouponShelfItem>
              ))}
            </div>
          </RevealSection>
        )}
      </div>

      <section aria-labelledby="perguntas" className="mx-auto max-w-6xl px-4 pt-12 md:px-8 md:pt-16">
        <SectionHeading id="perguntas">{text.faqTitle}</SectionHeading>
        <div className="mt-4 max-w-3xl">
          <CouponFaq items={text.faqs} />
        </div>
      </section>

      <section aria-labelledby="transparencia" className="mx-auto max-w-6xl px-4 pt-12 pb-10 md:px-8">
        <h2 id="transparencia" className="text-[15px] font-extrabold leading-[22px]">
          {copy.transparencyTitle}
        </h2>
        <p className="mt-1.5 max-w-[68ch] text-[13px] font-medium leading-5 text-marinho-suave">{text.transparency}</p>
      </section>
    </main>
  );
}
