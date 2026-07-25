import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CopyButton, FAQAccordion } from '@/components/CouponComponents';
import { CouponBottomBar } from '@/components/CouponBottomBar';
import {
  getYesStyleLocaleConfig,
  getRewardArticleLanguageLinks,
  type YesStyleLocale,
} from '@/lib/i18n/yesstyleCluster';
import {
  getPrimaryRewardCode,
  getActivePromoCoupons,
  type YesStyleRewardOffer,
  type YesStylePromoOffer,
} from '@/lib/yesstyleCoupons';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';

export type Locale = YesStyleLocale;

export type PageCopy = {
  locale: Locale;
  language: string;
  eyebrow: string;
  titleTemplate: string;
  descriptionTemplate: string;
  introTemplate: string;
  updated: string;
  copy: string;
  copied: string;
  copyAriaTemplate: string;
  visit: string;
  rewardCardBadge: string;
  rewardCardDescriptionTemplate: string;
  rewardDiscountValueTemplate: string;
  promosSectionTitle: string;
  emptyPromosNoticeTemplate: string;
  emptyPromosSubtextTemplate: string;
  proofLabel: string;
  tableHeaders: {
    type: string;
    code: string;
    discount: string;
    verified: string;
    proof: string;
    action: string;
  };
  offerTypeReward: string;
  offerTypeCoupon: string;
  details: string;
  codeLabel: string;
  discountLabel: string;
  discountValueTemplate: string;
  fieldLabel: string;
  fieldValue: string;
  instructionsTitleTemplate: string;
  instructionsTemplates: string[];
  noteTemplate: string;
  relatedContentTitle: string;
  otherCouponsTitle: string;
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  transparencyTemplate: string;
};

export interface ResolvedPromoOffer {
  id: string;
  code: string;
  discountLabel: string;
  formattedVerifiedDate: string;
  officialSourceUrl: string;
  evidenceImage?: string;
  proofLabel: string;
}

export interface ResolvedYesStylePage {
  locale: Locale;
  language: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  updatedLabel: string;
  formattedDate: string;
  copy: string;
  copied: string;
  copyAria: string;
  visit: string;
  rewardCardBadge: string;
  rewardCardDescription: string;
  rewardDiscountValue: string;
  promosSectionTitle: string;
  emptyPromosNotice: string;
  emptyPromosSubtext: string;
  proofLabel: string;
  tableHeaders: PageCopy['tableHeaders'];
  offerTypeReward: string;
  offerTypeCoupon: string;
  activePromoOffers: ResolvedPromoOffer[];
  details: string;
  codeLabel: string;
  discountLabel: string;
  discountValue: string;
  fieldLabel: string;
  fieldValue: string;
  instructionsTitle: string;
  instructions: string[];
  note: string;
  relatedContentTitle: string;
  otherCouponsTitle: string;
  rewardArticlePath: string;
  guidePath: string;
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  transparency: string;
  rewardCode: string;
  affiliateUrl: string;
}

const pages: Record<Locale, PageCopy> = {
  pt: {
    locale: 'pt',
    language: 'pt-BR',
    eyebrow: 'Cupons e Código de Recompensa YesStyle',
    titleTemplate: 'Cupom YesStyle {code}: Até {newDiscount}% OFF Extra Cumulativo',
    descriptionTemplate: 'Código de recompensa {code} oficial da YesStyle. Ganhe até {newDiscount}% extra no checkout acumulável com cupons promocionais.',
    introTemplate: '{code} é o código de recompensa oficial da YesStyle. Digite no campo Reward Code para somar até {newDiscount}% extra ({newDiscount}% na 1ª compra / {returningDiscount}% em compras recorrentes) aos cupons promocionais ativos.',
    updated: 'Atualizado em',
    copy: 'Copiar código',
    copied: 'Copiado!',
    copyAriaTemplate: 'Copiar código {code}',
    visit: 'Ir para a YesStyle',
    rewardCardBadge: 'Reward Code (Influenciadora)',
    rewardCardDescriptionTemplate: 'Código de influenciadora permanente. Digite no campo Reward Code para somar até {newDiscount}% extras aos cupons promocionais.',
    rewardDiscountValueTemplate: 'Até {newDiscount}% OFF extra ({newDiscount}% 1ª compra / {returningDiscount}% recorrente)',
    promosSectionTitle: 'Cupons Promocionais Verificados',
    emptyPromosNoticeTemplate: 'Nenhum cupom promocional verificado no momento.',
    emptyPromosSubtextTemplate: 'O código de recompensa {code} continua ativo e permanente no campo Reward Code.',
    proofLabel: 'Ver comprovante oficial',
    tableHeaders: {
      type: 'Tipo',
      code: 'Código',
      discount: 'Desconto',
      verified: 'Verificado',
      proof: 'Comprovação',
      action: 'Ação',
    },
    offerTypeReward: 'Código de Recompensa',
    offerTypeCoupon: 'Cupom Promocional',
    details: 'Detalhes da oferta',
    codeLabel: 'Código',
    discountLabel: 'Desconto',
    discountValueTemplate: 'Até {newDiscount}% extra ({newDiscount}% novos clientes / {returningDiscount}% clientes recorrentes)',
    fieldLabel: 'Campo no Checkout',
    fieldValue: 'Reward Code / Código de Recompensa',
    instructionsTitleTemplate: 'Como combinar cupons e o código {code} no checkout',
    instructionsTemplates: [
      'Copie o cupom promocional ativo (ex: {promoCode}), se houver.',
      'Copie o código de recompensa {code}.',
      'Acesse a YesStyle pelo link oficial da Cecília.',
      'No carrinho/checkout, cole o cupom promocional no campo Coupon Code.',
      'Cole {code} no campo separado Reward Code / Código de Recompensa.',
      'Confirme no resumo do pedido se os dois descontos foram aplicados antes de pagar.',
    ],
    noteTemplate: 'Importante: digite {code} em Reward Code, e cupons de promoção em Coupon Code.',
    relatedContentTitle: 'Guia e Artigos YesStyle',
    otherCouponsTitle: 'Outros Cupons de Parceiros',
    faqTitle: 'Perguntas Frequentes sobre Cupons YesStyle',
    faqs: [
      { question: 'O código {code} pode ser usado junto com cupons de desconto?', answer: 'Sim! O {code} é um Reward Code e é cumulável com os cupons promocionais inseridos no campo Coupon Code.' },
      { question: 'Qual a diferença entre Coupon Code e Reward Code?', answer: 'Coupon Code aceita cupons promocionais temporários da loja. Reward Code aceita o código de influenciadora {code} para desconto extra.' },
    ],
    transparencyTemplate: 'Esta página contém links de afiliada. Ao comprar pelo link ou utilizar o código {code}, podemos receber uma comissão sem custo adicional para você.',
  },
  en: {
    locale: 'en',
    language: 'en-US',
    eyebrow: 'YesStyle Coupons & Reward Code',
    titleTemplate: 'YesStyle Reward Code {code}: Up to {newDiscount}% Extra',
    descriptionTemplate: 'Official YesStyle reward code {code}. Save up to {newDiscount}% extra at checkout combinable with promo coupons.',
    introTemplate: '{code} is the official YesStyle Reward Code. Enter it in the Reward Code field to add up to {newDiscount}% extra ({newDiscount}% on 1st order / {returningDiscount}% on returning orders) on top of active promo codes.',
    updated: 'Verified',
    copy: 'Copy code',
    copied: 'Copied!',
    copyAriaTemplate: 'Copy code {code}',
    visit: 'Visit YesStyle',
    rewardCardBadge: 'Reward Code (Influencer)',
    rewardCardDescriptionTemplate: 'Permanent influencer reward code. Enter in the Reward Code field to stack up to {newDiscount}% extra with promo coupons.',
    rewardDiscountValueTemplate: 'Up to {newDiscount}% extra ({newDiscount}% 1st order / {returningDiscount}% returning)',
    promosSectionTitle: 'Verified Promotional Coupons',
    emptyPromosNoticeTemplate: 'No verified promotional coupons active right now.',
    emptyPromosSubtextTemplate: 'The reward code {code} remains active and permanent in the Reward Code field.',
    proofLabel: 'View official proof',
    tableHeaders: {
      type: 'Type',
      code: 'Code',
      discount: 'Discount',
      verified: 'Verified',
      proof: 'Proof',
      action: 'Action',
    },
    offerTypeReward: 'Reward Code',
    offerTypeCoupon: 'Promo Coupon',
    details: 'Offer details',
    codeLabel: 'Code',
    discountLabel: 'Discount',
    discountValueTemplate: 'Up to {newDiscount}% extra ({newDiscount}% new customers / {returningDiscount}% returning customers)',
    fieldLabel: 'Checkout Field',
    fieldValue: 'Reward Code',
    instructionsTitleTemplate: 'How to combine coupons and code {code}',
    instructionsTemplates: [
      'Copy any active promo coupon (e.g. {promoCode}).',
      'Copy the reward code {code}.',
      'Open YesStyle via our official link.',
      'At checkout, enter your promo coupon in the Coupon Code field.',
      'Enter {code} in the separate Reward Code field.',
      'Verify that both discounts appear before placing your order.',
    ],
    noteTemplate: 'Important: enter {code} in Reward Code, not Coupon Code.',
    relatedContentTitle: 'YesStyle Guides & Reviews',
    otherCouponsTitle: 'Other Active Partner Coupons',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { question: 'Can I use {code} with a promo coupon?', answer: 'Yes! {code} goes into the Reward Code field, while promo codes go into the Coupon Code field.' },
      { question: 'What discount does {code} offer?', answer: 'It adds up to {newDiscount}% extra ({newDiscount}% first order / {returningDiscount}% returning orders).' },
    ],
    transparencyTemplate: 'This page contains affiliate links. If you visit YesStyle through our links or use the code {code}, we may earn a commission at no extra cost to you.',
  },
  es: {
    locale: 'es',
    language: 'es-ES',
    eyebrow: 'Cupones y Código de Recompensa YesStyle',
    titleTemplate: 'Código de recompensa YesStyle {code}: Hasta {newDiscount}% extra',
    descriptionTemplate: 'Código de recompensa oficial {code} en YesStyle. Suma hasta un {newDiscount}% extra junto con cupones promocionales.',
    introTemplate: '{code} es el código de recompensa oficial de YesStyle. Úsalo en el campo Reward Code para sumar hasta un {newDiscount}% extra ({newDiscount}% en 1ª compra / {returningDiscount}% en compras siguientes).',
    updated: 'Verificado',
    copy: 'Copiar código',
    copied: '¡Copiado!',
    copyAriaTemplate: 'Copiar código {code}',
    visit: 'Ir a YesStyle',
    rewardCardBadge: 'Código de Recompensa (Influencer)',
    rewardCardDescriptionTemplate: 'Código de influencer permanente. Úsalo en el campo Reward Code para sumar hasta {newDiscount}% extra.',
    rewardDiscountValueTemplate: 'Hasta {newDiscount}% extra ({newDiscount}% 1ª compra / {returningDiscount}% habitual)',
    promosSectionTitle: 'Cupones Promocionales Verificados',
    emptyPromosNoticeTemplate: 'No hay cupones promocionales verificados en este momento.',
    emptyPromosSubtextTemplate: 'El código de recompensa {code} sigue activo en el campo Reward Code.',
    proofLabel: 'Ver comprobante oficial',
    tableHeaders: {
      type: 'Tipo',
      code: 'Código',
      discount: 'Descuento',
      verified: 'Verificado',
      proof: 'Comprobante',
      action: 'Acción',
    },
    offerTypeReward: 'Código de Recompensa',
    offerTypeCoupon: 'Cupón Promocional',
    details: 'Detalles del código',
    codeLabel: 'Código',
    discountLabel: 'Descuento',
    discountValueTemplate: 'Hasta {newDiscount}% extra ({newDiscount}% nuevos clientes / {returningDiscount}% clientes habituales)',
    fieldLabel: 'Campo en Checkout',
    fieldValue: 'Reward Code',
    instructionsTitleTemplate: 'Cómo usar {code} y cupones',
    instructionsTemplates: [
      'Copia el cupón promocional activo (ej: {promoCode}).',
      'Copia el código de recompensa {code}.',
      'Entra a YesStyle mediante nuestro enlace oficial.',
      'En el checkout, usa el cupón promocional en Coupon Code.',
      'Ingresa {code} en el campo separado Reward Code.',
      'Comprueba ambos descuentos antes de pagar.',
    ],
    noteTemplate: 'Importante: {code} va en Reward Code, no en Coupon Code.',
    relatedContentTitle: 'Guías YesStyle',
    otherCouponsTitle: 'Otros Cupones Activos',
    faqTitle: 'Preguntas Frecuentes',
    faqs: [
      { question: '¿Puedo usar {code} con un cupón?', answer: 'Sí. Usa {code} en Reward Code y el cupón promocional en Coupon Code.' },
    ],
    transparencyTemplate: 'Esta página contiene enlaces de afiliado. Si compras mediante el código {code}, podemos recibir una comisión sin coste adicional.',
  },
  fr: {
    locale: 'fr',
    language: 'fr-FR',
    eyebrow: 'Coupons et Code Récompense YesStyle',
    titleTemplate: 'Code récompense YesStyle {code} : Jusqu’à {newDiscount} % en plus',
    descriptionTemplate: 'Code récompense officiel {code} sur YesStyle. Ajoutez jusqu’à {newDiscount} % de réduction aux coupons actifs.',
    introTemplate: '{code} est le code récompense officiel de YesStyle. Saisissez-le dans le champ Reward Code pour ajouter jusqu’à {newDiscount} % ({newDiscount} % 1ère commande / {returningDiscount} % commandes suivantes).',
    updated: 'Vérifié',
    copy: 'Copier le code',
    copied: 'Copié !',
    copyAriaTemplate: 'Copier le code {code}',
    visit: 'Aller sur YesStyle',
    rewardCardBadge: 'Code Récompense (Permanent)',
    rewardCardDescriptionTemplate: 'Code influenceur permanent. Saisissez-le dans le champ Reward Code pour ajouter jusqu’à {newDiscount} % de réduction.',
    rewardDiscountValueTemplate: 'Jusqu’à {newDiscount} % extra ({newDiscount} % 1ère commande / {returningDiscount} % suivantes)',
    promosSectionTitle: 'Coupons Promotionnels Vérifiés',
    emptyPromosNoticeTemplate: 'Aucun coupon promotionnel vérifié pour le moment.',
    emptyPromosSubtextTemplate: 'Le code récompense {code} reste actif dans le champ Reward Code.',
    proofLabel: 'Voir la preuve officielle',
    tableHeaders: {
      type: 'Type',
      code: 'Code',
      discount: 'Réduction',
      verified: 'Vérifié',
      proof: 'Preuve',
      action: 'Action',
    },
    offerTypeReward: 'Code Récompense',
    offerTypeCoupon: 'Coupon Promo',
    details: 'Détails du code',
    codeLabel: 'Code',
    discountLabel: 'Réduction',
    discountValueTemplate: 'Jusqu’à {newDiscount} % extra ({newDiscount} % nouveaux clients / {returningDiscount} % clients réguliers)',
    fieldLabel: 'Champ au Paiement',
    fieldValue: 'Reward Code',
    instructionsTitleTemplate: 'Comment utiliser {code} et les coupons',
    instructionsTemplates: [
      'Copiez le coupon promo actif (ex: {promoCode}).',
      'Copiez le code récompense {code}.',
      'Ouvrez YesStyle via notre lien officiel.',
      'Au paiement, saisissez le coupon promo dans Coupon Code.',
      'Saisissez {code} dans le champ séparé Reward Code.',
      'Vérifiez les deux réductions avant de payer.',
    ],
    noteTemplate: 'Important : {code} va dans Reward Code, pas dans Coupon Code.',
    relatedContentTitle: 'Guides YesStyle',
    otherCouponsTitle: 'Autres Coupons Actifs',
    faqTitle: 'Questions Fréquentes',
    faqs: [
      { question: 'Puis-je utiliser {code} avec un coupon ?', answer: 'Oui. Utilisez {code} dans Reward Code et le coupon promo dans Coupon Code.' },
    ],
    transparencyTemplate: 'Cette page contient des liens affiliés. Si vous achetez via {code}, nous pouvons recevoir une commission sans frais supplémentaires.',
  },
  de: {
    locale: 'de',
    language: 'de-DE',
    eyebrow: 'YesStyle Gutscheine & Reward Code',
    titleTemplate: 'YesStyle Reward Code {code}: Bis zu {newDiscount} % extra',
    descriptionTemplate: 'Offizieller YesStyle Reward Code {code}. Erhalte bis zu {newDiscount} % extra neben aktiven Gutscheincodes.',
    introTemplate: '{code} ist der offizielle YesStyle Reward Code. Gib ihn im Feld Reward Code ein, um bis zu {newDiscount} % extra ({newDiscount} % Erstbestellung / {returningDiscount} % Folgebestellungen) zu erhalten.',
    updated: 'Verifiziert',
    copy: 'Code kopieren',
    copied: 'Kopiert!',
    copyAriaTemplate: 'Code {code} kopieren',
    visit: 'Zu YesStyle',
    rewardCardBadge: 'Reward Code (Dauerhaft)',
    rewardCardDescriptionTemplate: 'Dauerhafter Influencer-Code. Gib ihn im Feld Reward Code ein, um bis zu {newDiscount} % extra zu sparen.',
    rewardDiscountValueTemplate: 'Bis zu {newDiscount} % extra ({newDiscount} % Erstbestellung / {returningDiscount} % Folgebestellung)',
    promosSectionTitle: 'Verifizierte Aktionsgutscheine',
    emptyPromosNoticeTemplate: 'Derzeit keine verifizierten Aktionsgutscheine aktiv.',
    emptyPromosSubtextTemplate: 'Der Reward Code {code} bleibt im Feld Reward Code aktiv.',
    proofLabel: 'Offiziellen Nachweis anzeigen',
    tableHeaders: {
      type: 'Typ',
      code: 'Code',
      discount: 'Rabatt',
      verified: 'Verifiziert',
      proof: 'Nachweis',
      action: 'Aktion',
    },
    offerTypeReward: 'Reward Code',
    offerTypeCoupon: 'Aktionsgutschein',
    details: 'Code-Details',
    codeLabel: 'Code',
    discountLabel: 'Rabatt',
    discountValueTemplate: 'Bis zu {newDiscount} % extra ({newDiscount} % Erstbestellung / {returningDiscount} % Folgebestellung)',
    fieldLabel: 'Feld an der Kasse',
    fieldValue: 'Reward Code',
    instructionsTitleTemplate: 'So verwendest du {code} & Gutscheine',
    instructionsTemplates: [
      'Kopiere den aktiven Aktionsgutschein (z. B. {promoCode}).',
      'Kopiere den Reward Code {code}.',
      'Öffne YesStyle über unseren offiziellen Link.',
      'Gib den Aktionsgutschein im Feld Coupon Code ein.',
      'Gib {code} im separaten Feld Reward Code ein.',
      'Prüfe beide Rabatte vor dem Bezahlen.',
    ],
    noteTemplate: 'Wichtig: {code} gehört in Reward Code, nicht in Coupon Code.',
    relatedContentTitle: 'YesStyle Ratgeber',
    otherCouponsTitle: 'Weitere Aktive Gutscheine',
    faqTitle: 'Häufige Fragen',
    faqs: [
      { question: 'Kann ich {code} mit einem Gutschein nutzen?', answer: 'Ja. Nutze {code} im Feld Reward Code und den Aktionscode im Feld Coupon Code.' },
    ],
    transparencyTemplate: 'Diese Seite enthält Affiliate-Links. Wenn du über {code} kaufst, erhalten wir möglicherweise eine Provision ohne Zusatzkosten.',
  },
  ko: {
    locale: 'ko',
    language: 'ko-KR',
    eyebrow: 'YesStyle 쿠폰 및 리워드 코드',
    titleTemplate: 'YesStyle 리워드 코드 {code}: 추가 {newDiscount}% 할인',
    descriptionTemplate: '공식 YesStyle 리워드 코드 {code}. 결제 시 프로모션 쿠폰과 함께 최대 추가 {newDiscount}% 혜택을 받으세요.',
    introTemplate: '{code}은 공식 YesStyle 리워드 코드입니다. Reward Code 전용 칸에 입력하면 최대 추가 {newDiscount}% (첫 구매 {newDiscount}% / 재구매 {returningDiscount}%) 혜택을 받을 수 있습니다.',
    updated: '확인일',
    copy: '코드 복사',
    copied: '복사됨!',
    copyAriaTemplate: '코드 {code} 복사',
    visit: 'YesStyle 방문',
    rewardCardBadge: '리워드 코드 (상시)',
    rewardCardDescriptionTemplate: '상시 인플루언서 리워드 코드. Reward Code 칸에 입력해 추가 {newDiscount}% 할인을 받으세요.',
    rewardDiscountValueTemplate: '최대 {newDiscount}% 추가 할인 (첫 구매 {newDiscount}% / 재구매 {returningDiscount}%)',
    promosSectionTitle: '검증된 프로모션 쿠폰',
    emptyPromosNoticeTemplate: '현재 검증된 프로모션 쿠폰이 없습니다.',
    emptyPromosSubtextTemplate: '리워드 코드 {code}은 Reward Code 칸에서 계속 활성화 상태입니다.',
    proofLabel: '공식 증빙 보기',
    tableHeaders: {
      type: '구분',
      code: '코드',
      discount: '할인율',
      verified: '확인일',
      proof: '증빙',
      action: '사용',
    },
    offerTypeReward: '리워드 코드',
    offerTypeCoupon: '프로모션 쿠폰',
    details: '코드 정보',
    codeLabel: '코드',
    discountLabel: '할인율',
    discountValueTemplate: '최대 {newDiscount}% 추가 할인 (첫 구매 {newDiscount}% / 재구매 {returningDiscount}%)',
    fieldLabel: '결제 입력란',
    fieldValue: 'Reward Code',
    instructionsTitleTemplate: '{code} 및 쿠폰 사용 방법',
    instructionsTemplates: [
      '활성 프로모션 쿠폰(예: {promoCode})을 복사하세요.',
      '리워드 코드 {code}을 복사하세요.',
      '공식 링크를 통해 YesStyle에 접속하세요.',
      '결제 시 Coupon Code 칸에 프로모션 쿠폰을 입력하세요.',
      '별도의 Reward Code 칸에 {code}을 입력하세요.',
      '결제 전 두 할인 모두 적용되었는지 확인하세요.',
    ],
    noteTemplate: '중요: {code}은 Coupon Code가 아닌 Reward Code에 입력하세요.',
    relatedContentTitle: 'YesStyle 가이드',
    otherCouponsTitle: '기타 활성 파트너 쿠폰',
    faqTitle: '자주 묻는 질문',
    faqs: [
      { question: '{code} 코드를 다른 쿠폰과 함께 사용할 수 있나요?', answer: '네. {code}은 Reward Code에, 프로모션 쿠폰은 Coupon Code에 입력하세요.' },
    ],
    transparencyTemplate: '이 페이지에는 제휴 링크가 포함되어 있습니다. 코드를 사용하여 구매 시 수수료를 지급받을 수 있습니다.',
  },
  ja: {
    locale: 'ja',
    language: 'ja-JP',
    eyebrow: 'YesStyle クーポン＆リワードコード',
    titleTemplate: 'YesStyle リワードコード {code}：さらに{newDiscount}%オフ',
    descriptionTemplate: 'YesStyle公式リワードコード{code}。チェックアウト時にプロモーションクーポンと併用して最大{newDiscount}%追加オフ。',
    introTemplate: '{code}は公式YesStyleリワードコードです。Reward Code欄に入力すると最大で追加{newDiscount}%（初回{newDiscount}% / 2回目以降{returningDiscount}%）の特典が適用されます。',
    updated: '確認日',
    copy: 'コードをコピー',
    copied: 'コピーしました！',
    copyAriaTemplate: 'コード {code} をコピー',
    visit: 'YesStyleへ',
    rewardCardBadge: 'リワードコード（常時）',
    rewardCardDescriptionTemplate: '常時使えるインフルエンサーコード。Reward Code欄に入力して追加割引を適用してください。',
    rewardDiscountValueTemplate: '最大{newDiscount}%追加オフ（初回{newDiscount}% / 2回目以降{returningDiscount}%）',
    promosSectionTitle: '検証済みプロモーションクーポン',
    emptyPromosNoticeTemplate: '現在、検証済みのプロモーションクーポンはありません。',
    emptyPromosSubtextTemplate: 'リワードコード {code} は Reward Code 欄で引き続き有効です。',
    proofLabel: '公式証明を見る',
    tableHeaders: {
      type: '種別',
      code: 'コード',
      discount: '割引率',
      verified: '確認日',
      proof: '証明',
      action: '操作',
    },
    offerTypeReward: 'リワードコード',
    offerTypeCoupon: 'プロモクーポン',
    details: 'コードの詳細',
    codeLabel: 'コード',
    discountLabel: '割引率',
    discountValueTemplate: '最大{newDiscount}%追加オフ（初回{newDiscount}% / 2回目以降{returningDiscount}%）',
    fieldLabel: '入力欄',
    fieldValue: 'Reward Code',
    instructionsTitleTemplate: '{code} とクーポンの使い方',
    instructionsTemplates: [
      '有効なプロモーションクーポン（例：{promoCode}）をコピーします。',
      'リワードコード {code} をコピーします。',
      '公式リンクから YesStyle にアクセスします。',
      'チェックアウト時に Coupon Code 欄へプロモクーポンを入力します。',
      '別欄の Reward Code 欄へ {code} を入力します。',
      '注文前に両方の割引を確認します。',
    ],
    noteTemplate: '重要：{code}はCoupon CodeではなくReward Codeに入力してください。',
    relatedContentTitle: 'YesStyle ガイド',
    otherCouponsTitle: 'そのほかの有効なクーポン',
    faqTitle: 'よくある質問',
    faqs: [
      { question: '{code}はほかのクーポンと併用できますか？', answer: 'はい。{code}はReward Code、プロモーションコードはCoupon Codeに入力してください。' },
    ],
    transparencyTemplate: 'このページにはアフィリエイトリンクが含まれる場合があります。{code}を利用して購入すると報酬を得ることがあります。',
  },
  'zh-hant': {
    locale: 'zh-hant',
    language: 'zh-HK',
    eyebrow: 'YesStyle 優惠碼與獎勵碼',
    titleTemplate: 'YesStyle 獎勵碼 {code}：額外 {newDiscount}% 優惠',
    descriptionTemplate: 'YesStyle 官方獎勵碼 {code}。在結帳時可與促銷優惠碼疊加，額外享有最高 {newDiscount}% 優惠。',
    introTemplate: '{code} 是 YesStyle 官方獎勵碼。請在 Reward Code 專用欄位輸入，即可獲得最高額外 {newDiscount}% 優惠（首購 {newDiscount}% / 複購 {returningDiscount}%）。',
    updated: '已驗證',
    copy: '複製優惠碼',
    copied: '已複製！',
    copyAriaTemplate: '複製優惠碼 {code}',
    visit: '前往 YesStyle',
    rewardCardBadge: '獎勵碼（常設）',
    rewardCardDescriptionTemplate: '常設網紅獎勵碼。在 Reward Code 欄位輸入，即可享額外最高 {newDiscount}% 折扣。',
    rewardDiscountValueTemplate: '最高額外 {newDiscount}% 優惠（首購 {newDiscount}% / 複購 {returningDiscount}%）',
    promosSectionTitle: '已驗證促銷優惠碼',
    emptyPromosNoticeTemplate: '目前沒有已驗證的促銷優惠碼。',
    emptyPromosSubtextTemplate: '獎勵碼 {code} 在 Reward Code 欄位仍保持有效。',
    proofLabel: '查看官方證明',
    tableHeaders: {
      type: '類型',
      code: '優惠碼',
      discount: '折扣',
      verified: '驗證日',
      proof: '證明',
      action: '操作',
    },
    offerTypeReward: '獎勵碼',
    offerTypeCoupon: '促銷優惠碼',
    details: '優惠碼詳情',
    codeLabel: '優惠碼',
    discountLabel: '折扣力度',
    discountValueTemplate: '最高額外 {newDiscount}% 優惠（首購 {newDiscount}% / 複購 {returningDiscount}%）',
    fieldLabel: '輸入欄位',
    fieldValue: 'Reward Code',
    instructionsTitleTemplate: '如何組合使用 {code} 與優惠碼',
    instructionsTemplates: [
      '複製有效的促銷優惠碼（例如 {promoCode}）。',
      '複製獎勵碼 {code}。',
      '透過官方連結前往 YesStyle。',
      '結帳時在 Coupon Code 欄位輸入促銷優惠碼。',
      '在獨立的 Reward Code 欄位輸入 {code}。',
      '付款前確認兩項優惠皆已套用。',
    ],
    noteTemplate: '重要：{code} 應輸入 Reward Code，而不是 Coupon Code。',
    relatedContentTitle: 'YesStyle 指南',
    otherCouponsTitle: '其他有效夥伴優惠碼',
    faqTitle: '常見問題',
    faqs: [
      { question: '{code} 可以與其他優惠碼同時使用嗎？', answer: '可以。{code} 請輸入 Reward Code，促銷優惠碼請輸入 Coupon Code。' },
    ],
    transparencyTemplate: '此頁面包含聯盟連結。使用 {code} 購物時，我們可能會獲得佣金。',
  },
  'zh-hans': {
    locale: 'zh-hans',
    language: 'zh-CN',
    eyebrow: 'YesStyle 优惠码与奖励码',
    titleTemplate: 'YesStyle 奖励码 {code}：额外 {newDiscount}% 优惠',
    descriptionTemplate: 'YesStyle 官方奖励码 {code}。在结账时可与促销优惠码叠加，额外享受最高 {newDiscount}% 优惠。',
    introTemplate: '{code} 是 YesStyle 官方奖励码。请在 Reward Code 专用栏位输入，即可获得最高额外 {newDiscount}% 优惠（首购 {newDiscount}% / 复购 {returningDiscount}%）。',
    updated: '已验证',
    copy: '复制优惠码',
    copied: '已复制！',
    copyAriaTemplate: '复制优惠码 {code}',
    visit: '前往 YesStyle',
    rewardCardBadge: '奖励码（常设）',
    rewardCardDescriptionTemplate: '常设网红奖励码。在 Reward Code 栏位输入，即可享额外最高 {newDiscount}% 折扣。',
    rewardDiscountValueTemplate: '最高额外 {newDiscount}% 优惠（首购 {newDiscount}% / 复购 {returningDiscount}%）',
    promosSectionTitle: '已验证促销优惠码',
    emptyPromosNoticeTemplate: '目前没有已验证的促销优惠码。',
    emptyPromosSubtextTemplate: '奖励码 {code} 在 Reward Code 栏位仍保持有效。',
    proofLabel: '查看官方证明',
    tableHeaders: {
      type: '类型',
      code: '优惠码',
      discount: '折扣',
      verified: '验证日',
      proof: '证明',
      action: '操作',
    },
    offerTypeReward: '奖励码',
    offerTypeCoupon: '促销优惠码',
    details: '优惠码详情',
    codeLabel: '优惠码',
    discountLabel: '折扣力度',
    discountValueTemplate: '最高额外 {newDiscount}% 优惠（首购 {newDiscount}% / 复购 {returningDiscount}%）',
    fieldLabel: '输入栏位',
    fieldValue: 'Reward Code',
    instructionsTitleTemplate: '如何组合使用 {code} 与优惠码',
    instructionsTemplates: [
      '复制有效的促销优惠码（例如 {promoCode}）。',
      '复制奖励码 {code}。',
      '通过官方链接前往 YesStyle。',
      '结账时在 Coupon Code 栏位输入促销优惠码。',
      '在独立的 Reward Code 栏位输入 {code}。',
      '付款前确认两项优惠均已应用。',
    ],
    noteTemplate: '重要：{code} 应输入 Reward Code，而不是 Coupon Code。',
    relatedContentTitle: 'YesStyle 指南',
    otherCouponsTitle: '其他有效伙伴优惠码',
    faqTitle: '常见问题',
    faqs: [
      { question: '{code} 可以和其他优惠码一起使用吗？', answer: '可以。请将 {code} 输入 Reward Code，将促销优惠码输入 Coupon Code。' },
    ],
    transparencyTemplate: '此页面包含联盟链接。使用 {code} 购物时，我们可能会获得佣金。',
  },
};

export const yesStyleLocales = Object.keys(pages) as Locale[];

export function getYesStylePage(locale: string): PageCopy | null {
  return pages[locale as Locale] || null;
}

export function formatIsoDateUTC(dateIso: string, language: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateIso)) {
    throw new Error(`[formatIsoDateUTC] Formato de data ISO inválido (esperado YYYY-MM-DD): "${dateIso}"`);
  }
  const [year, month, day] = dateIso.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString(language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function fillPlaceholders(template: string, reward: YesStyleRewardOffer, promoCode = 'BTSVIP15'): string {
  return template
    .replace(/\{code\}/g, reward.code)
    .replace(/\{newDiscount\}/g, String(reward.newCustomerDiscount))
    .replace(/\{returningDiscount\}/g, String(reward.returningCustomerDiscount))
    .replace(/\{promoCode\}/g, promoCode);
}

export function resolveYesStylePage(
  locale: string,
  rewardInput?: YesStyleRewardOffer,
  promosInput?: YesStylePromoOffer[]
): ResolvedYesStylePage | null {
  const page = getYesStylePage(locale);
  if (!page) return null;

  const reward = rewardInput || getPrimaryRewardCode();
  const promos = promosInput || getActivePromoCoupons();
  const formattedDate = formatIsoDateUTC(reward.verifiedAt, page.language);
  const config = getYesStyleLocaleConfig(page.locale);

  const activePromoOffers: ResolvedPromoOffer[] = promos.map((promo) => {
    let discountStr = '';
    if (promo.discount.kind === 'percentage') {
      discountStr = `${promo.discount.value}% OFF`;
    } else if (promo.discount.kind === 'fixed') {
      discountStr = `${promo.discount.currency} ${promo.discount.value} OFF`;
    } else if (promo.discount.kind === 'shipping') {
      discountStr = 'Frete Grátis';
    } else {
      discountStr = promo.discount.label;
    }

    return {
      id: promo.id,
      code: promo.code,
      discountLabel: discountStr,
      formattedVerifiedDate: formatIsoDateUTC(promo.verifiedAt, page.language),
      officialSourceUrl: promo.officialSourceUrl,
      evidenceImage: promo.evidenceImage,
      proofLabel: page.proofLabel,
    };
  });

  const firstPromoCode = activePromoOffers.length > 0 ? activePromoOffers[0].code : 'BTSVIP15';

  return {
    locale: page.locale,
    language: page.language,
    eyebrow: page.eyebrow,
    title: fillPlaceholders(page.titleTemplate, reward, firstPromoCode),
    description: fillPlaceholders(page.descriptionTemplate, reward, firstPromoCode),
    intro: fillPlaceholders(page.introTemplate, reward, firstPromoCode),
    updatedLabel: page.updated,
    formattedDate,
    copy: page.copy,
    copied: page.copied,
    copyAria: fillPlaceholders(page.copyAriaTemplate, reward, firstPromoCode),
    visit: page.visit,
    rewardCardBadge: page.rewardCardBadge,
    rewardCardDescription: fillPlaceholders(page.rewardCardDescriptionTemplate, reward, firstPromoCode),
    rewardDiscountValue: fillPlaceholders(page.rewardDiscountValueTemplate, reward, firstPromoCode),
    promosSectionTitle: page.promosSectionTitle,
    emptyPromosNotice: fillPlaceholders(page.emptyPromosNoticeTemplate, reward, firstPromoCode),
    emptyPromosSubtext: fillPlaceholders(page.emptyPromosSubtextTemplate, reward, firstPromoCode),
    proofLabel: page.proofLabel,
    tableHeaders: page.tableHeaders,
    offerTypeReward: page.offerTypeReward,
    offerTypeCoupon: page.offerTypeCoupon,
    activePromoOffers,
    details: page.details,
    codeLabel: page.codeLabel,
    discountLabel: page.discountLabel,
    discountValue: fillPlaceholders(page.discountValueTemplate, reward, firstPromoCode),
    fieldLabel: page.fieldLabel,
    fieldValue: page.fieldValue,
    instructionsTitle: fillPlaceholders(page.instructionsTitleTemplate, reward, firstPromoCode),
    instructions: page.instructionsTemplates.map((item) => fillPlaceholders(item, reward, firstPromoCode)),
    note: fillPlaceholders(page.noteTemplate, reward, firstPromoCode),
    relatedContentTitle: page.relatedContentTitle,
    otherCouponsTitle: page.otherCouponsTitle,
    rewardArticlePath: config.rewardArticlePath,
    guidePath: config.guidePath,
    faqTitle: page.faqTitle,
    faqs: page.faqs.map((faq) => ({
      question: fillPlaceholders(faq.question, reward, firstPromoCode),
      answer: fillPlaceholders(faq.answer, reward, firstPromoCode),
    })),
    transparency: fillPlaceholders(page.transparencyTemplate, reward, firstPromoCode),
    rewardCode: reward.code,
    affiliateUrl: reward.affiliateUrl,
  };
}

export function getYesStyleMetadata(locale: string): Metadata {
  const resolved = resolveYesStylePage(locale);
  if (!resolved) return {};
  const config = getYesStyleLocaleConfig(locale);

  // No Projeto B1:
  // Preservação SEO: hub PT é canônico para si próprio (/cupons/yesstyle)
  // Hubs internacionais (/en/coupons/yesstyle etc) continuam apontando canonical para os seus artigos
  const canonical =
    locale === 'pt'
      ? 'https://emcasacomcecilia.com/cupons/yesstyle'
      : `https://emcasacomcecilia.com${config.rewardArticlePath}`;

  return {
    title: resolved.title,
    description: resolved.description,
    alternates: { canonical },
    openGraph: {
      title: resolved.title,
      description: resolved.description,
      url: canonical,
      locale: config.openGraphLocale,
      type: 'website',
    },
  };
}

export function YesStyleCouponPage({ locale }: { locale: string }) {
  const resolved = resolveYesStylePage(locale);
  if (!resolved) return null;

  const languageLinks = getRewardArticleLanguageLinks();

  return (
    <main className="min-h-screen bg-[#fef9f3] pb-24 lg:pb-0">
      {/* Header hero */}
      <section className="bg-[#0f1d3a] px-4 py-12 text-white md:py-16">
        <div className="mx-auto max-w-5xl">
          <nav className="mb-6 text-xs text-white/55">
            <Link href="/">Em Casa com Cecília</Link>
            <span className="mx-2">/</span>
            <span>YesStyle</span>
          </nav>
          <div className="flex gap-5 md:items-center">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white p-2">
              <Image src="/images/logos/yesstyle.jpg" alt="YesStyle" fill sizes="80px" className="object-contain p-2" priority />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#ffd23f]">{resolved.eyebrow}</p>
              <h1 className="mt-2 font-heading text-3xl font-black leading-tight md:text-5xl">{resolved.title}</h1>
              <p className="mt-4 max-w-2xl text-white/78">{resolved.intro}</p>
              <p className="mt-4 text-xs text-white/55">{resolved.updatedLabel}: {resolved.formattedDate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Language Switcher (Preservado em B1) */}
      <section className="px-4 pt-8">
        <div className="mx-auto max-w-5xl">
          <LanguageSwitcher currentLocale={resolved.locale} links={languageLinks} />
        </div>
      </section>

      {/* Card Permanente 1: Reward Code (CECILIA010) */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#111827] p-7 text-white shadow-large md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#ffd23f] px-3.5 py-1 text-xs font-black uppercase tracking-[.14em] text-[#4a2400]">
                {resolved.rewardCardBadge}
              </span>
              <span className="rounded-full bg-white/15 px-3.5 py-1 text-xs font-bold text-white">
                {resolved.rewardDiscountValue}
              </span>
            </div>

            <p className="mt-6 font-mono text-4xl font-black tracking-[.08em] md:text-6xl">{resolved.rewardCode}</p>
            <p className="mt-4 max-w-2xl text-white/85">{resolved.rewardCardDescription}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CopyButton code={resolved.rewardCode} label={resolved.copy} copiedLabel={resolved.copied} ariaLabel={resolved.copyAria} />
              <a
                href={resolved.affiliateUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold hover:bg-white/15 transition-colors"
              >
                {resolved.visit}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 2: Cupons Promocionais Verificados (B1.3 e B1.4) */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-heading text-2xl font-black text-[#0f1419]">{resolved.promosSectionTitle}</h2>

          {resolved.activePromoOffers.length > 0 ? (
            <div className="mt-6">
              {/* Table view para Desktop */}
              <div className="hidden md:block overflow-hidden rounded-2xl border border-black/10 bg-white shadow-soft">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#0f1d3a] text-white">
                    <tr>
                      <th className="px-5 py-3.5 font-bold">{resolved.tableHeaders.type}</th>
                      <th className="px-5 py-3.5 font-bold">{resolved.tableHeaders.code}</th>
                      <th className="px-5 py-3.5 font-bold">{resolved.tableHeaders.discount}</th>
                      <th className="px-5 py-3.5 font-bold">{resolved.tableHeaders.verified}</th>
                      <th className="px-5 py-3.5 font-bold">{resolved.tableHeaders.proof}</th>
                      <th className="px-5 py-3.5 font-bold text-right">{resolved.tableHeaders.action}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/8">
                    {resolved.activePromoOffers.map((promo) => (
                      <tr key={promo.id} className="hover:bg-[#fef9f3] transition-colors">
                        <td className="px-5 py-4 font-semibold text-[#0f1419]">
                          <span className="inline-flex items-center rounded-md bg-[#ff6b35]/12 px-2.5 py-1 text-xs font-bold text-[#7c2d12]">
                            {resolved.offerTypeCoupon}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-mono font-black text-base text-[#0f1419]">{promo.code}</td>
                        <td className="px-5 py-4 font-bold text-[#ff6b35]">{promo.discountLabel}</td>
                        <td className="px-5 py-4 text-xs text-[#0f1419]/65">{promo.formattedVerifiedDate}</td>
                        <td className="px-5 py-4 text-xs">
                          <a
                            href={promo.evidenceImage || promo.officialSourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-[#ff6b35] hover:underline"
                          >
                            {promo.proofLabel}
                          </a>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <CopyButton code={promo.code} label={resolved.copy} copiedLabel={resolved.copied} ariaLabel={`Copiar ${promo.code}`} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards View */}
              <div className="grid gap-4 md:hidden">
                {resolved.activePromoOffers.map((promo) => (
                  <div key={promo.id} className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft">
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-[#ff6b35]/12 px-2.5 py-1 text-xs font-bold text-[#7c2d12]">
                        {resolved.offerTypeCoupon}
                      </span>
                      <span className="font-bold text-[#ff6b35] text-sm">{promo.discountLabel}</span>
                    </div>
                    <p className="mt-3 font-mono text-3xl font-black text-[#0f1419]">{promo.code}</p>
                    <p className="mt-2 text-xs text-[#0f1419]/60">{resolved.tableHeaders.verified}: {promo.formattedVerifiedDate}</p>
                    <div className="mt-4 flex flex-col gap-2.5">
                      <CopyButton code={promo.code} label={resolved.copy} copiedLabel={resolved.copied} ariaLabel={`Copiar ${promo.code}`} />
                      <a
                        href={promo.evidenceImage || promo.officialSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg border border-black/15 py-2 text-xs font-semibold text-[#0f1419]/80 hover:bg-black/5"
                      >
                        {promo.proofLabel}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Estado Sem Cupom Promocional (B1.4) */
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/80 p-6 text-[#78350f]">
              <p className="font-bold text-base">{resolved.emptyPromosNotice}</p>
              <p className="mt-2 text-sm">{resolved.emptyPromosSubtext}</p>
              <p className="mt-3 text-xs opacity-75">{resolved.updatedLabel}: {resolved.formattedDate}</p>
            </div>
          )}
        </div>
      </section>

      {/* Conteúdo Informativo e Instruções */}
      <article className="bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-black text-[#0f1419]">{resolved.details}</h2>
          <dl className="mt-6 divide-y divide-black/8 rounded-2xl border border-black/8">
            <Detail label={resolved.codeLabel} value={resolved.rewardCode} />
            <Detail label={resolved.discountLabel} value={resolved.discountValue} />
            <Detail label={resolved.fieldLabel} value={resolved.fieldValue} />
          </dl>

          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">{resolved.instructionsTitle}</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-[#0f1419]/78">
            {resolved.instructions.map((item) => <li key={item}>{item}</li>)}
          </ol>
          <p className="mt-4 rounded-2xl border border-[#ff6b35]/25 bg-[#fff7ed] px-4 py-3 text-sm text-[#7c2d12]">{resolved.note}</p>

          {/* Links para artigos educativos do mesmo locale */}
          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">{resolved.relatedContentTitle}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              href={resolved.rewardArticlePath}
              className="rounded-2xl border border-black/8 bg-[#fef9f3] p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-[#ff6b35]/35 hover:shadow-md"
            >
              <p className="text-sm font-bold text-[#0f1419]">Guia do Código {resolved.rewardCode}</p>
              <p className="mt-1 text-xs text-[#0f1419]/55">Passo a passo com telas e dicas</p>
            </Link>
            <Link
              href={resolved.guidePath}
              className="rounded-2xl border border-black/8 bg-[#fef9f3] p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-[#ff6b35]/35 hover:shadow-md"
            >
              <p className="text-sm font-bold text-[#0f1419]">Como Encontrar Cupons Válidos</p>
              <p className="mt-1 text-xs text-[#0f1419]/55">Regras de combinação e frete</p>
            </Link>
          </div>

          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">{resolved.faqTitle}</h2>
          <div className="mt-4"><FAQAccordion items={resolved.faqs} /></div>

          <div className="mt-14 rounded-2xl bg-[#fef9f3] p-6 text-sm leading-relaxed text-[#0f1419]/68">{resolved.transparency}</div>
        </div>
      </article>

      <CouponBottomBar coupon={resolved.rewardCode} cta={{ url: resolved.affiliateUrl, label: resolved.visit }} locale={resolved.locale} />
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 md:flex-row md:gap-6">
      <dt className="w-44 text-sm text-[#0f1419]/58">{label}</dt>
      <dd className="text-sm font-semibold text-[#0f1419]">{value}</dd>
    </div>
  );
}
