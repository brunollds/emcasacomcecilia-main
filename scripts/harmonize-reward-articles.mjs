import fs from 'fs';
import path from 'path';

// 1. Matriz de Expressões Proibidas (Normalizadas via Regex por Locale)
const forbiddenRegexes = [
  // Permanência / Validade Absoluta
  /qualquer\s+cupom/i,
  /100%\s*cumulativo/i,
  /validade\s*:\s*permanente/i,
  /mais\s+permanente/i,
  /any\s+active\s+coupon/i,
  /any\s+active\s+promo\s+code/i,
  /validity\s*:\s*permanent/i,
  /more\s+permanent/i,
  /cualquier\s+cupón/i,
  /validez\s*:\s*permanente/i,
  /siempre\s+activo/i,
  /tout\s+coupon/i,
  /validité\s*:\s*permanent/i,
  /toujours\s+actif\s+et\s+validé/i,
  /partenaire\s+permanent/i,
  /jedem\s+aktiven\s+gutschein/i,
  /mit\s+jedem\s+gutschein/i,
  /gültigkeit\s*:\s*dauerhaft/i,
  /immer\s+aktiv/i,
  /dauerhafter\s+partner-code/i,
  /어떤\s+쿠폰/i,
  /유효기간\s*:\s*영구/i,
  /あらゆるクーポン/i,
  /有効期限\s*:\s*永久/i,
  /任何優惠碼/i,
  /有效期限\s*[:：]\s*永久/i,
  /任何优惠码/i,
  /有效期限\s*[:：]\s*永久/i,
  /cupons\s+elegíveis\s+válido/i,
  /cupones\s+promocionales\s+elegibles\s+activo/i,

  // Promessa Fictícia de 5% Fixo (sem diferenciar 1ª compra 5% e recorrente 2%)
  /independentemente\s+de\s+ser\s+sua\s+primeira\s+compra/i,
  /garantir\s+5%/i,
  /garante\s+5%\s+extra\s+no/i,
  /ativar\s+os\s+5%\s+extras/i,
  /somar\s+esse\s+cupom\s+aos\s+5%\s+extras/i,
  /soma\s+5%\s+extras/i,
  /oferece\s+5%\s+extras/i,
  /regardless\s+of\s+whether\s+it\s+is\s+your\s+first\s+order/i,
  /les\s+5%\s+de\s+CECILIA010/i,
  /el\s+5%\s+de\s+CECILIA010/i,
  /fügt\s+ihnen\s+5%\s+hinzu/i,
  /die\s+5%\s+von\s+CECILIA010/i,
];

// 2. Teste de Regressão Negativo
function runNegativeRegressionTests() {
  const dummyCases = [
    'FR: Validité : Permanent (toujours actif et validé)',
    'DE: mit jedem aktiven Gutschein einlösbar',
    'DE: ist ein dauerhafter Partner-Code',
    'EN: works with any active promo code and is more permanent',
    'ES: este código está siempre activo y verificado',
    'PT: 100% cumulativo com qualquer cupom',
    'PT: funciona independentemente de ser sua primeira compra',
    'PT: para garantir 5% de desconto extra',
    'EN: regardless of whether it is your first order',
    'FR: les 5% de CECILIA010',
    'DE: fügt ihnen 5% hinzu',
    'ES: el 5% de CECILIA010',
  ];

  let caught = 0;
  for (const dummy of dummyCases) {
    if (forbiddenRegexes.some((regex) => regex.test(dummy))) {
      caught++;
    }
  }

  if (caught !== dummyCases.length) {
    console.error(`❌ TESTE DE REGRESSÃO FALHOU: Apenas ${caught}/${dummyCases.length} casos de teste negativos foram capturados pelo auditor!`);
    process.exit(1);
  } else {
    console.log(`✅ TESTE DE REGRESSÃO NEGATIVO APROVADO: Todos os ${caught} casos de teste falsos foram capturados corretamente!`);
  }
}

runNegativeRegressionTests();

// 3. Auditoria nos 18 Artigos da YesStyle
const targetFiles = [
  'codigo-cecilia010-yesstyle-como-usar.json',
  'como-encontrar-cupons-yesstyle-validos.json',
  'yesstyle-reward-code-coupon-cecilia010.json',
  'how-to-find-valid-yesstyle-coupon-codes.json',
  'codigo-de-recompensa-yesstyle-cupon-cecilia010.json',
  'como-encontrar-cupones-yesstyle-validos.json',
  'code-recompense-yesstyle-cecilia010.json',
  'comment-trouver-des-codes-promo-yesstyle-valides.json',
  'yesstyle-reward-code-rabatt-cecilia010.json',
  'gueltige-yesstyle-gutscheincodes-finden.json',
  'yesstyle-reward-code-cecilia010-ko.json',
  'yesstyle-valid-coupon-guide-ko.json',
  'yesstyle-reward-code-cecilia010-ja.json',
  'yesstyle-valid-coupon-guide-ja.json',
  'yesstyle-reward-code-cecilia010-zh-hant.json',
  'yesstyle-valid-coupon-guide-zh-hant.json',
  'yesstyle-reward-code-cecilia010-zh-hans.json',
  'yesstyle-valid-coupon-guide-zh-hans.json',
];

const reviewsDir = path.resolve('content/reviews');
let errorsCount = 0;

console.log('\n=== AUDITORIA EDITORIAL RIGOROSA DE CONTEÚDO YESSTYLE (PROJETO C1) ===\n');

for (const fileName of targetFiles) {
  const filePath = path.join(reviewsDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Arquivo ausente: ${fileName}`);
    errorsCount++;
    continue;
  }

  const text = fs.readFileSync(filePath, 'utf8');
  let fileHasErrors = false;

  for (const regex of forbiddenRegexes) {
    const match = text.match(regex);
    if (match) {
      console.error(`❌ Termo proibido detectado em "${fileName}": "${match[0]}"`);
      fileHasErrors = true;
      errorsCount++;
    }
  }

  if (!fileHasErrors) {
    console.log(`✅ ${fileName.padEnd(55)} -> 100% Conforme!`);
  }
}

if (errorsCount === 0) {
  console.log('\n🎉 TODOS OS 18 ARTIGOS YESSTYLE ESTÃO TOTALMENTE AUDITADOS E 100% CONFORMES!');
  process.exit(0);
} else {
  console.error(`\n❌ ${errorsCount} violação(ões) editorial(is) encontrada(s)!`);
  process.exit(1);
}
