import fs from 'fs';
import path from 'path';

// 1. Matriz de Expressões Proibidas Absolutas (Permanência Falsa e Stacking Irrestrito em Todos os 9 Idiomas)
const forbiddenPhrases = [
  /n['’]importe\s+quel/i,
  /any\s+active\s+(coupon|promo\s+code)/i,
  /qualquer\s+cupom/i,
  /cualquier\s+cupón/i,
  /jedem\s+aktiven\s+gutschein/i,
  /mit\s+jedem\s+gutschein/i,
  /모든\s+활성\s+쿠폰/i,
  /任何\s*有效\s*優惠/i,
  /任何\s*有效\s*优惠/i,
  /independentemente\s+de\s+ser\s+sua\s+primeira\s+compra/i,
  /regardless\s+of\s+whether\s+it\s+is\s+your\s+first\s+order/i,
  /indépendamment\s+du\s+nombre\s+de\s+commandes/i,
  /unabhängig\s+davon,\s+ob/i,
  /100%\s*cumulativo/i,
  /validade\s*:\s*permanente/i,
  /mais\s+permanente/i,
  /validity\s*:\s*permanent/i,
  /more\s+permanent/i,
  /validez\s*:\s*permanente/i,
  /siempre\s+activo/i,
  /validité\s*:\s*permanent/i,
  /toujours\s+actif/i,
  /partenaire\s+permanent/i,
  /gültigkeit\s*:\s*dauerhaft/i,
  /immer\s+aktiv/i,
  /dauerhafter\s+partner-code/i,
];

// 2. Validador de Elegibilidade Obrigatória por Idioma
const eligibilityTermsRegex = /(elegív|eligible|elegibl|éligibl|berechtigt|적격|対象|合資格|合资格|符合條件|符合条件|符合資格|符合资格)/i;

// 3. Validador Semântico de Desconto 5%
const qualifiersRegex = /(até|up\s+to|hasta|jusqu['’]à|bis\s+zu|최대|最大|最高|高達|高达|primeira\s+compra|1ª\s+compra|1st\s+order|first\s+order|1st\s+purchase|first\s+purchase|1ère\s+commande|première\s+commande|primera\s+compra|erstbestellung|erste\s+bestellung|1\.\s+bestellung|1ª\s+compras|첫\s+구매|初回|首購|首购|首次|2%|Bronze|Elite\s+Club|10%|15%|50%)/i;

// Artigos de Reward Code que OBRIGATORIAMENTE devem conter 5% E 2%
const rewardCodeArticles = [
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

function validateSemanticRules(text, fileName = '') {
  const errors = [];

  // Checagem 1: Frases proibidas de permanência ou stacking irrestrito
  for (const regex of forbiddenPhrases) {
    const match = text.match(regex);
    if (match) {
      errors.push(`Termo proibido detectado: "${match[0]}"`);
    }
  }

  // Checagem 2: Termo de elegibilidade condicional obrigatório
  if (!eligibilityTermsRegex.test(text)) {
    errors.push(`Artigo não contém termo de elegibilidade condicional em seu idioma.`);
  }

  // Checagem 3: Exigência factual da taxa de 2% para recorrentes nos 9 Reward Code Articles
  if (rewardCodeArticles.includes(fileName)) {
    if (!/5\s*%/i.test(text) || !/2\s*%/i.test(text)) {
      errors.push(`Artigo de Reward Code deve conter FACTUALMENTE as duas taxas (5% 1ª compra E 2% recorrente).`);
    }
  }

  // Checagem 4: Validação semântica das menções a 5% por linha
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes('"bestRating"') || line.includes('"stars"') || line.includes('"ratingValue"')) {
      continue;
    }

    if (/5\s*%/i.test(line)) {
      if (!qualifiersRegex.test(line)) {
        errors.push(`Linha ${i + 1}: Promessa de 5% sem qualificação (até / 1ª compra / 2%): "${line.trim()}"`);
      }
    }
  }

  return errors;
}

// 5. Bateria de Testes de Regressão Negativo (Garante falha em inconsistências em TODOS os 9 idiomas)
function runNegativeRegressionTests() {
  const dummyInconsistentCases = [
    { text: 'PT: O código CECILIA010 concede 5% de desconto extra no checkout.', file: 'test-dummy' },
    { text: 'PT: Funciona 100% cumulativo com qualquer cupom.', file: 'test-dummy' },
    { text: 'PT: Funciona independentemente de ser sua primeira compra.', file: 'test-dummy' },
    { text: 'EN: Use CECILIA010 for an extra 5% off at checkout.', file: 'test-dummy' },
    { text: 'EN: Works with any active promo code and is more permanent.', file: 'test-dummy' },
    { text: 'EN: Works regardless of whether it is your first order.', file: 'test-dummy' },
    { text: 'FR: Offre 5% de réduction supplémentaire sur tous les produits.', file: 'test-dummy' },
    { text: 'FR: Cumulable avec n\'importe quel coupon du site.', file: 'test-dummy' },
    { text: 'DE: Gewährt 5% Extrarabatt beim Checkout.', file: 'test-dummy' },
    { text: 'DE: Ist mit jedem aktiven Gutschein einlösbar und immer aktiv.', file: 'test-dummy' },
    { text: 'KO: 모든 활성 쿠폰과 함께 사용 가능', file: 'test-dummy' },
    { text: 'ZH-Hant: 可與任何有效優惠券一併使用', file: 'test-dummy' },
    { text: 'ZH-Hans: 可与任何有效优惠券一起使用', file: 'test-dummy' },
    { text: 'PT-Reward-Missing-2%: CECILIA010 dá 5% na primeira compra.', file: 'codigo-cecilia010-yesstyle-como-usar.json' },
  ];

  let caught = 0;
  for (const item of dummyInconsistentCases) {
    const errors = validateSemanticRules(item.text, item.file);
    if (errors.length > 0) {
      caught++;
    }
  }

  if (caught !== dummyInconsistentCases.length) {
    console.error(`❌ TESTE DE REGRESSÃO FALHOU: Apenas ${caught}/${dummyInconsistentCases.length} casos de teste negativos foram capturados pelo validador semântico!`);
    process.exit(1);
  } else {
    console.log(`✅ TESTE DE REGRESSÃO NEGATIVO APROVADO: Todos os ${caught}/${dummyInconsistentCases.length} casos de teste falsos foram capturados com sucesso!`);
  }
}

runNegativeRegressionTests();

// 6. Auditoria nos 18 Artigos da YesStyle
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
let totalErrorsCount = 0;

console.log('\n=== AUDITORIA EDITORIAL SEMÂNTICA DE CONTEÚDO YESSTYLE (PROJETO C1) ===\n');

for (const fileName of targetFiles) {
  const filePath = path.join(reviewsDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Arquivo ausente: ${fileName}`);
    totalErrorsCount++;
    continue;
  }

  const text = fs.readFileSync(filePath, 'utf8');
  const fileErrors = validateSemanticRules(text, fileName);

  if (fileErrors.length > 0) {
    console.error(`❌ Erros no arquivo "${fileName}":`);
    for (const err of fileErrors) {
      console.error(`   - ${err}`);
    }
    totalErrorsCount += fileErrors.length;
  } else {
    console.log(`✅ ${fileName.padEnd(55)} -> 100% Conforme Semanticamente!`);
  }
}

if (totalErrorsCount === 0) {
  console.log('\n🎉 TODOS OS 18 ARTIGOS YESSTYLE PASSARAM NA VALIDAÇÃO SEMÂNTICA EDITORIAL COM 100% DE SUCESSO!');
  process.exit(0);
} else {
  console.error(`\n❌ ${totalErrorsCount} violação(ões) semântica(s) encontrada(s)!`);
  process.exit(1);
}
