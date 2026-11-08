import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { FaqView } from '@/components/faqs/FaqView';
import { TRANSLATED_LOCALES, isTranslatedLocale, type TranslatedLocale } from '@/lib/couponTranslations';
import { getFaqAlternates, getFaqPath } from '@/lib/faqPage';
import { LOCALES } from '@/lib/i18n/locales';
import { getLocaleFaqPage } from '@/lib/localeFaq';
import { SITE_NAME } from '@/lib/pageSeo';

type FaqPageProps = {
  params: Promise<{ locale: string }>;
};

// As perguntas de cada um dos 9 idiomas fora do PT. A lista de endereços sai na build; o resto cai na 404 global.
export const dynamicParams = false;

export function generateStaticParams() {
  return TRANSLATED_LOCALES.map((locale) => ({ locale }));
}

async function findLocale(params: FaqPageProps['params']): Promise<TranslatedLocale | null> {
  const { locale } = await params;
  return isTranslatedLocale(locale) ? locale : null;
}

export async function generateMetadata({ params }: FaqPageProps): Promise<Metadata> {
  const locale = await findLocale(params);
  if (!locale) return {};

  const { meta } = getLocaleFaqPage(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: getFaqAlternates(locale),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: getFaqPath(locale),
      siteName: SITE_NAME,
      locale: LOCALES[locale].openGraphLocale,
      type: 'website',
    },
    // Como no PT: o layout define título e descrição genéricos no twitter, e o Next não os troca pelos do Open Graph.
    twitter: { title: meta.title, description: meta.description },
  };
}

export default async function LocalizedFaq({ params }: FaqPageProps) {
  const locale = await findLocale(params);
  if (!locale) notFound();

  const page = getLocaleFaqPage(locale);
  return <FaqView categories={page.categories} className={couponFontVariables} text={page.text} jsonLdPath={page.path} />;
}
