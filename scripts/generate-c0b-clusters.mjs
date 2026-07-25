import fs from 'fs';
import path from 'path';

const clusterModule = await import('../src/lib/i18n/yesstyleCluster.ts');
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
import { getYesStyleLocaleConfig } from '@/lib/i18n/yesstyleCluster';

export const metadata = getLocaleMetadata('${config.htmlLang}');

export default function LocalizedClusterLayout({ children }: { children: React.ReactNode }) {
  const config = getYesStyleLocaleConfig('${config.locale}');
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

  // 3. Artigo Reward
  const rewardDir = path.join(clusterDir, 'reviews', config.rewardArticleSlug);
  fs.mkdirSync(rewardDir, { recursive: true });
  const rewardPageContent = `import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('${config.rewardArticleSlug}');
}

export default function RewardArticlePage() {
  return renderReviewPageBySlug('${config.rewardArticleSlug}');
}
`;
  fs.writeFileSync(path.join(rewardDir, 'page.tsx'), rewardPageContent, 'utf8');

  // 4. Guia de Cupons
  const guideDir = path.join(clusterDir, 'reviews', config.guideSlug);
  fs.mkdirSync(guideDir, { recursive: true });
  const guidePageContent = `import { renderReviewPageBySlug, generateReviewMetadataBySlug } from '@/components/review/ReviewPageContainer';

export function generateMetadata() {
  return generateReviewMetadataBySlug('${config.guideSlug}');
}

export default function GuideArticlePage() {
  return renderReviewPageBySlug('${config.guideSlug}');
}
`;
  fs.writeFileSync(path.join(guideDir, 'page.tsx'), guidePageContent, 'utf8');

  console.log(`Grupo de rotas atualizado: ${clusterDirName}`);
}

console.log('✅ Todos os 8 grupos de rotas internacionais foram atualizados com metadados localizados!');
