import { notFound } from 'next/navigation';
import { YesStyleCouponPage, getYesStyleMetadata, getYesStylePage, yesStyleLocales } from '@/components/YesStyleCouponPage';

export function generateStaticParams() { return yesStyleLocales.map((locale) => ({ locale })); }

export function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return params.then(({ locale }) => getYesStyleMetadata(locale));
}

export default async function LocalizedYesStyleCouponPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!getYesStylePage(locale)) notFound();
  return <YesStyleCouponPage locale={locale} />;
}
