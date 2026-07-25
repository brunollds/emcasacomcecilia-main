import React from 'react';
import '@/app/globals.css';
import { RootLayoutShell, defaultMetadata } from '@/components/RootLayoutShell';
import { getYesStyleLocaleConfig } from '@/lib/i18n/yesstyleCluster';

export const metadata = defaultMetadata;

export default function LocalizedClusterLayout({ children }: { children: React.ReactNode }) {
  const config = getYesStyleLocaleConfig('ja');
  return <RootLayoutShell lang={config.htmlLang}>{children}</RootLayoutShell>;
}
