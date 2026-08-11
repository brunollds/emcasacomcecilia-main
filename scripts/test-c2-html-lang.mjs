import fs from 'fs';
import path from 'path';

const clusterModule = await import('../src/lib/i18n/clusters/yesstyle.ts');
const YESSTYLE_LOCALES = clusterModule.YESSTYLE_LOCALES;

const checks = [
  { url: '/', file: '.next/server/app/index.html', expectedLang: 'pt-BR' },
  { url: '/reviews/dolce-gusto-genio-s-touch-vale-a-pena', file: '.next/server/app/reviews/dolce-gusto-genio-s-touch-vale-a-pena.html', expectedLang: 'pt-BR' },
];

for (const config of Object.values(YESSTYLE_LOCALES)) {
  const rewardArticle = config.articles.find((article) => article.key === 'reward');
  const guideArticle = config.articles.find((article) => article.key === 'guide');
  const hubFilePath = config.locale === 'pt'
    ? '.next/server/app/cupons/yesstyle.html'
    : `.next/server/app/${config.locale}/coupons/yesstyle.html`;

  checks.push({
    url: config.hubPath,
    file: hubFilePath,
    expectedLang: config.htmlLang,
  });

  checks.push({
    url: rewardArticle.path,
    file: `.next/server/app${rewardArticle.path}.html`,
    expectedLang: config.htmlLang,
  });

  checks.push({
    url: guideArticle.path,
    file: `.next/server/app${guideArticle.path}.html`,
    expectedLang: config.htmlLang,
  });
}

let failed = 0;
console.log('=== TESTE PERMANENTE DE MATRIZ DE HTML BRUTO (<html lang="...">) PROJETO C2 ===\n');

for (const check of checks) {
  const fullPath = path.resolve(check.file);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Arquivo HTML ausente no build: "${check.file}" para a rota "${check.url}"`);
    failed++;
    continue;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  const match = content.match(/<html[^>]*lang=["']([^"']+)["']/i);
  const actualLang = match ? match[1] : 'NÃO ENCONTRADO';
  if (actualLang === check.expectedLang) {
    console.log(`✅ ${check.url.padEnd(55)} -> <html lang="${actualLang}">`);
  } else {
    console.error(`❌ ${check.url.padEnd(55)} -> <html lang="${actualLang}"> (ESPERADO: "${check.expectedLang}")`);
    failed++;
  }
}

if (failed === 0) {
  console.log('\n🎉 TESTE DE MATRIZ HTML C2 CONCLUÍDO COM 100% DE SUCESSO!');
  process.exit(0);
} else {
  console.error(`\n❌ ${failed} falha(s) na validação da matriz do HTML bruto C2!`);
  process.exit(1);
}
