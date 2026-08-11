import React from 'react';
import '@/app/globals.css';
import { RootLayoutShell, getLocaleMetadata } from '@/components/RootLayoutShell';
import { getLocaleConfig } from '@/lib/i18n/locales';

export const metadata = getLocaleMetadata('zh-Hans');

export default function LocalizedClusterLayout({ children }: { children: React.ReactNode }) {
  const config = getLocaleConfig('zh-hans');
  return <RootLayoutShell lang={config.htmlLang}>{children}</RootLayoutShell>;
}
