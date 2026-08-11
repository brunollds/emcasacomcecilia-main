import fs from 'fs';
import path from 'path';

const clusterModule = await import('../src/lib/i18n/clusters/yesstyle.ts');
const YESSTYLE_LOCALES = clusterModule.YESSTYLE_LOCALES;

const appDir = path.resolve('src/app');

for (const config of Object.values(YESSTYLE_LOCALES)) {
  if (config.locale === 'pt') continue;

  const clusterDirName = `(yesstyle-${config.locale})`;
  const clusterDir = path.join(appDir, clusterDirName);

  // 1. Root Layout para o idioma
  const layoutContent = `import React from 'react';
import '@/app/globals.css';
import { RootLayoutShell, getLocaleMetadata } from '@/components/RootLayoutShell';
import { getLocaleConfig } from '@/lib/i18n/locales';

export const metadata = getLocaleMetadata('${config.htmlLang}');

export default function LocalizedClusterLayout({ children }: { children: React.ReactNode }) {
  const config = getLocaleConfig('${config.locale}');
  return <RootLayoutShell lang={config.htmlLang}>{children}</RootLayoutShell>;
}
`;
  fs.mkdirSync(clusterDir, { recursive: true });
  fs.writeFileSync(path.join(clusterDir, 'layout.tsx'), layoutContent, 'utf8');

  // 2. Hub da YesStyle
  const hubDir = path.join(clusterDir, config.locale, 'coupons', 'yesstyle');
  fs.mkdirSync(hubDir, { recursive: true });
  const hubPageContent = `import { YesStyleCouponPage, getYesStyleMetadata } from '@/components/YesStyleCouponPage';

export function generateMetadata() {
  return getYesStyleMetadata('${config.locale}');
}

export default function HubPage() {
  return <YesStyleCouponPage locale="${config.locale}" />;
}
`;
  fs.writeFileSync(path.join(hubDir, 'page.tsx'), hubPageContent, 'utf8');

  // 3. Artigos localizados
  for (const article of config.articles) {
    const articleDir = path.join(clusterDir, 'reviews', article.slug);
    fs.mkdirSync(articleDir, { recursive: true });
    const articlePageContent = `import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('${article.slug}');
}

export default function LocalizedArticlePage() {
  return renderReviewPageBySlug('${article.slug}');
}
`;
    fs.writeFileSync(path.join(articleDir, 'page.tsx'), articlePageContent, 'utf8');
  }

  console.log(`Grupo de rotas atualizado: ${clusterDirName}`);
}

console.log('✅ Todos os 8 grupos de rotas internacionais foram atualizados com metadados localizados!');
