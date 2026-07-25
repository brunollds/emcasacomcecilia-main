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

const reviewsDir = path.resolve('content/reviews');

for (const fileName of rewardArticleFiles) {
  const filePath = path.join(reviewsDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.error(`Arquivo não encontrado: ${filePath}`);
    continue;
  }

  let text = fs.readFileSync(filePath, 'utf8');

  // Substituições de termos absolutos / desatualizados em todos os idiomas
  // PT
  text = text
    .replace(/soma 5% extra aos cupons ativos/g, 'soma até 5% extra aos cupons promocionais elegíveis')
    .replace(/qualquer cupom ativo/g, 'cupons promocionais elegíveis')
    .replace(/qualquer cupom/g, 'cupons elegíveis')
    .replace(/100% cumulativo/g, 'combinável com cupons elegíveis')
    .replace(/Desconto: 5% extra/g, 'Desconto: Até 5% extra (5% 1ª compra / 2% recorrente)')
    .replace(/Garante 5% extra/g, 'Garante até 5% extra (5% 1ª compra / 2% recorrente)')
    .replace(/Validade: Permanente \(sempre ativo e verificado\)/g, 'Validade: Código ativo no programa oficial de influenciadores (verificado regularmente)')
    .replace(/ele soma 5% a eles/g, 'ele soma até 5% extra (5% 1ª compra / 2% recorrente) a cupons elegíveis');

  // EN
  text = text
    .replace(/adds an extra 5% off on top of active coupons/g, 'adds up to 5% extra on top of eligible promo coupons')
    .replace(/with any active coupon code/g, 'with eligible promo coupons')
    .replace(/with any active coupon/g, 'with eligible promo coupons')
    .replace(/adding the 5% off offered/g, 'adding up to 5% extra (5% 1st order / 2% returning) offered')
    .replace(/Validity: Permanent \(always active and verified\)/g, 'Validity: Active influencer program code (regularly verified)')
    .replace(/it adds 5% on top of them!/g, 'it adds up to 5% extra (5% 1st order / 2% returning) on top of eligible coupons!');

  // ES
  text = text
    .replace(/con cualquier cupón/g, 'con cupones promocionales elegibles')
    .replace(/100% acumulable/g, 'combinable con cupones elegibles')
    .replace(/Validez: Permanente/g, 'Validez: Código activo en el programa de influencers')
    .replace(/Descuento: 5% extra/g, 'Descuento: Hasta 5% extra (5% 1ª compra / 2% habitual)');

  // FR
  text = text
    .replace(/avec tout coupon/g, 'avec les coupons promo éligibles')
    .replace(/100 % cumulable/g, 'cumulable sous réserve d’éligibilité')
    .replace(/Validité : Permanente/g, 'Validité : Code actif du programme d’influenceurs')
    .replace(/Réduction : 5 % extra/g, 'Réduction : Jusqu’à 5 % extra (5 % 1ère commande / 2 % suivantes)');

  // DE
  text = text
    .replace(/mit jedem Gutschein/g, 'mit berechtigten Aktionsgutscheinen')
    .replace(/Gültigkeit: Dauerhaft/g, 'Gültigkeit: Aktiver Influencer-Code im Programm')
    .replace(/Rabatt: 5 % extra/g, 'Rabatt: Bis zu 5 % extra (5 % Erstbestellung / 2 % Folgebestellung)');

  // KO
  text = text
    .replace(/어떤 쿠폰과도/g, '대상 프로모션 쿠폰과')
    .replace(/유효기간: 영구/g, '유효기간: 인플루언서 프로그램 활성 코드')
    .replace(/할인: 5% 추가/g, '할인: 최대 추가 5% (첫 구매 5% / 재구매 2%)');

  // JA
  text = text
    .replace(/あらゆるクーポンと併用可能/g, '対象のプロモーションクーポンと併用可能')
    .replace(/有効期限: 永久/g, '有効期限: インフルエンサープログラムの有効コード')
    .replace(/割引率: 5%追加/g, '割引率: 最大5%追加（初回5% / 2回目以降2%）');

  // ZH-Hant
  text = text
    .replace(/任何優惠碼/g, '適用促銷優惠碼')
    .replace(/有效期限：永久/g, '有效期限：創作者計畫有效代碼')
    .replace(/折扣：額外 5%/g, '折扣：最高額外 5%（首購 5% / 複購 2%）');

  // ZH-Hans
  text = text
    .replace(/任何优惠码/g, '适用促销优惠码')
    .replace(/有效期限：永久/g, '有效期限：创作者计划有效代码')
    .replace(/折扣：额外 5%/g, '折扣：最高额外 5%（首购 5% / 复购 2%）');

  fs.writeFileSync(filePath, text, 'utf8');
  console.log(`Harmonizado: ${fileName}`);
}

console.log('✅ Todos os 9 artigos de Reward Code foram harmonizados com a fonte factual!');
