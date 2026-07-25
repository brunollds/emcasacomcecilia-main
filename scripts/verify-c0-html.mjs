import fs from 'fs';
import path from 'path';

const checks = [
  { url: '/', file: '.next/server/app/index.html', expectedLang: 'pt-BR' },
  { url: '/reviews/dolce-gusto-genio-s-touch-vale-a-pena', file: '.next/server/app/reviews/dolce-gusto-genio-s-touch-vale-a-pena.html', expectedLang: 'pt-BR' },
];

const locales = [
  { locale: 'pt', htmlLang: 'pt-BR', hubPath: '/cupons/yesstyle', rewardArticlePath: '/reviews/codigo-cecilia010-yesstyle-como-usar', guidePath: '/reviews/como-encontrar-cupons-yesstyle-validos' },
  { locale: 'en', htmlLang: 'en', hubPath: '/en/coupons/yesstyle', rewardArticlePath: '/reviews/yesstyle-reward-code-coupon-cecilia010', guidePath: '/reviews/how-to-find-valid-yesstyle-coupon-codes' },
  { locale: 'es', htmlLang: 'es', hubPath: '/es/coupons/yesstyle', rewardArticlePath: '/reviews/codigo-de-recompensa-yesstyle-cupon-cecilia010', guidePath: '/reviews/como-encontrar-cupones-yesstyle-validos' },
  { locale: 'fr', htmlLang: 'fr', hubPath: '/fr/coupons/yesstyle', rewardArticlePath: '/reviews/code-recompense-yesstyle-cecilia010', guidePath: '/reviews/comment-trouver-des-codes-promo-yesstyle-valides' },
  { locale: 'de', htmlLang: 'de', hubPath: '/de/coupons/yesstyle', rewardArticlePath: '/reviews/yesstyle-reward-code-rabatt-cecilia010', guidePath: '/reviews/gueltige-yesstyle-gutscheincodes-finden' },
  { locale: 'ko', htmlLang: 'ko', hubPath: '/ko/coupons/yesstyle', rewardArticlePath: '/reviews/yesstyle-reward-code-cecilia010-ko', guidePath: '/reviews/yesstyle-valid-coupon-guide-ko' },
  { locale: 'ja', htmlLang: 'ja', hubPath: '/ja/coupons/yesstyle', rewardArticlePath: '/reviews/yesstyle-reward-code-cecilia010-ja', guidePath: '/reviews/yesstyle-valid-coupon-guide-ja' },
  { locale: 'zh-hant', htmlLang: 'zh-Hant', hubPath: '/zh-hant/coupons/yesstyle', rewardArticlePath: '/reviews/yesstyle-reward-code-cecilia010-zh-hant', guidePath: '/reviews/yesstyle-valid-coupon-guide-zh-hant' },
  { locale: 'zh-hans', htmlLang: 'zh-Hans', hubPath: '/zh-hans/coupons/yesstyle', rewardArticlePath: '/reviews/yesstyle-reward-code-cecilia010-zh-hans', guidePath: '/reviews/yesstyle-valid-coupon-guide-zh-hans' },
];

for (const config of locales) {
  const hubFilePath = config.locale === 'pt'
    ? '.next/server/app/cupons/yesstyle.html'
    : `.next/server/app/${config.locale}/coupons/yesstyle.html`;

  checks.push({
    url: config.hubPath,
    file: hubFilePath,
    expectedLang: config.htmlLang,
  });

  checks.push({
    url: config.rewardArticlePath,
    file: `.next/server/app${config.rewardArticlePath}.html`,
    expectedLang: config.htmlLang,
  });

  checks.push({
    url: config.guidePath,
    file: `.next/server/app${config.guidePath}.html`,
    expectedLang: config.htmlLang,
  });
}

let failed = 0;
console.log('=== VERIFICAÇÃO DE MATRIZ DE HTML BRUTO (<html lang="...">) PROJETO C0 ===\n');

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
  console.log('\n🎉 TODOS OS ARQUIVOS HTML BRUTOS FORAM EMITIDOS COM O LANG CORRETO NO PROJETO C0!');
  process.exit(0);
} else {
  console.error(`\n❌ ${failed} falha(s) na validação da matriz do HTML bruto!`);
  process.exit(1);
}
