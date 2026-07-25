import React from 'react';
import '@/app/globals.css';
import { notFound } from 'next/navigation';
import { RootLayoutShell, defaultMetadata } from '@/components/RootLayoutShell';
import { getYesStyleLocaleConfig, YESSTYLE_LOCALES } from '@/lib/i18n/yesstyleCluster';

export const metadata = defaultMetadata;

export function generateStaticParams() {
  return Object.keys(YESSTYLE_LOCALES)
    .filter((locale) => locale !== 'pt')
    .map((locale) => ({ locale }));
}

export default async function LocalizedHubRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale === 'pt' || !YESSTYLE_LOCALES[locale as keyof typeof YESSTYLE_LOCALES]) {
    notFound();
  }
  const config = getYesStyleLocaleConfig(locale);
  return <RootLayoutShell lang={config.htmlLang}>{children}</RootLayoutShell>;
}
