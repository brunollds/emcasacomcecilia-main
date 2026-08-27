import React from 'react';
import { notFound } from 'next/navigation';
import '@/app/globals.css';
import { RootLayoutShell, getLocaleMetadata } from '@/components/RootLayoutShell';
import { LOCALE_KEYS, LOCALES, type Locale } from '@/lib/i18n/locales';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

function getRouteLocale(locale: string): Locale {
  if (!LOCALE_KEYS.includes(locale as Locale) || locale === 'pt') notFound();
  return locale as Locale;
}

export async function generateMetadata({ params }: Pick<LocaleLayoutProps, 'params'>) {
  return getLocaleMetadata(LOCALES[getRouteLocale((await params).locale)].htmlLang);
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const locale = getRouteLocale((await params).locale);
  return <RootLayoutShell lang={LOCALES[locale].htmlLang}>{children}</RootLayoutShell>;
}
