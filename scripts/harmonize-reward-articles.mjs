import fs from 'fs';
import path from 'path';

const rewardArticleFiles = [
  'codigo-cecilia010-yesstyle-como-usar.json',
  'yesstyle-reward-code-coupon-cecilia010.json',
  'codigo-de-recompensa-yesstyle-cupon-cecilia010.json',
  'code-recompense-yesstyle-cecilia010.json',
  'yesstyle-reward-code-rabatt-cecilia010.json',
  'yesstyle-reward-code-cecilia010-ko.json',
  'yesstyle-reward-code-cecilia010-ja.json',
  'yesstyle-reward-code-cecilia010-zh-hant.json',
  'yesstyle-reward-code-cecilia010-zh-hans.json',
];

const forbiddenPhrases = [
  'qualquer cupom',
  'QUALQUER cupom',
  '100% cumulativo',
  'Validade: Permanente',
  'any active coupon',
  'Validity: Permanent',
  'cualquier cupón',
  'Validez: Permanente',
  'tout coupon',
  'Validité : Permanente',
  'mit jedem Gutschein',
  'Gültigkeit: Dauerhaft',
  '어떤 쿠폰',
  '유효기간: 영구',
  'あらゆるクーポン',
  '有効期限: 永久',
  '任何優惠碼',
  '有效期限：永久',
  '任何优惠码',
  '有效期限：永久',
  'cupons elegíveis válido',
  'cupones promocionales elegibles activo',
];

const reviewsDir = path.resolve('content/reviews');
let errorsCount = 0;

console.log('=== AUDITORIA EDITORIAL DE ARTIGOS DE REWARD CODE (PROJETO C1) ===\n');

for (const fileName of rewardArticleFiles) {
  const filePath = path.join(reviewsDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Arquivo ausente: ${fileName}`);
    errorsCount++;
    continue;
  }

  const text = fs.readFileSync(filePath, 'utf8');
  let fileHasErrors = false;

  for (const phrase of forbiddenPhrases) {
    if (text.includes(phrase)) {
      console.error(`❌ Termo absoluto / gramaticalmente incorreto em "${fileName}": "${phrase}"`);
      fileHasErrors = true;
      errorsCount++;
    }
  }

  if (!fileHasErrors) {
    console.log(`✅ ${fileName.padEnd(50)} -> Auditado e em conformidade!`);
  }
}

if (errorsCount === 0) {
  console.log('\n🎉 TODOS OS 9 ARTIGOS DE REWARD CODE ESTÃO TOTALMENTE AUDITADOS E CONFORME!');
  process.exit(0);
} else {
  console.error(`\n❌ ${errorsCount} problema(s) editorial(is) encontrado(s)!`);
  process.exit(1);
}
