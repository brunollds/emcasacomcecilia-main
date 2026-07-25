// Fonte factual única para cupons YesStyle (Projeto B1 - B1.1)
// Fatos, datas, regras e links de verificação oficiais.

export type YesStyleDiscountSpec =
  | { kind: 'percentage'; value: number }
  | { kind: 'fixed'; value: number; currency: string }
  | { kind: 'shipping' }
  | { kind: 'text'; label: string };

export interface YesStyleOfferBase {
  id: string;
  code: string;
  status: 'active' | 'scheduled' | 'expired';
  startsAt?: string;
  expiresAt?: string;
  recheckBy?: string; // YYYY-MM-DD (prazo limite para re-verificação editorial)
  verifiedAt: string; // YYYY-MM-DD
  regions: string[];
  officialSourceUrl: string;
  affiliateUrl?: string;
  evidenceImage?: string;
  eligibility?: string[];
  restrictions?: string[];
}

export interface YesStyleRewardOffer extends YesStyleOfferBase {
  type: 'reward';
  affiliateUrl: string;
  newCustomerDiscount: number; // Ex: 5 (%)
  returningCustomerDiscount: number; // Ex: 2 (%)
}

export interface YesStylePromoOffer extends YesStyleOfferBase {
  type: 'coupon';
  discount: YesStyleDiscountSpec;
}

export type YesStyleOffer = YesStyleRewardOffer | YesStylePromoOffer;

// Manter alias para compatibilidade estrita com validadores e componentes
export type YesStyleCouponItem = YesStyleOffer;

export const YESSTYLE_COUPONS_FACTUAL: YesStyleOffer[] = [
  {
    id: 'cecilia010-reward',
    code: 'CECILIA010',
    type: 'reward',
    newCustomerDiscount: 5,
    returningCustomerDiscount: 2,
    verifiedAt: '2026-07-24',
    officialSourceUrl: 'https://www.yesstyle.com/en/influencers.html',
    affiliateUrl: 'https://ystyle.co/rQYQv',
    status: 'active',
    regions: ['GLOBAL'],
  },
  {
    id: 'btsvip15-promo',
    code: 'BTSVIP15',
    type: 'coupon',
    discount: { kind: 'percentage', value: 15 },
    verifiedAt: '2026-07-25',
    recheckBy: '2026-08-01',
    officialSourceUrl: 'https://www.yesstyle.com/en/home.html',
    affiliateUrl: 'https://ystyle.co/rQYQv',
    evidenceImage: '/images/reviews/cupons/yesstyle-banner-cupom-btsvip15.webp',
    status: 'active',
    regions: [],
  },
];

// Helper: obtém o código de recompensa ativo principal (Rewards/Influencer Code)
export function getPrimaryRewardCode(): YesStyleRewardOffer {
  const reward = YESSTYLE_COUPONS_FACTUAL.find(
    (item): item is YesStyleRewardOffer => item.type === 'reward' && item.status === 'active'
  );
  if (!reward) {
    throw new Error('[yesstyleCoupons] Nenhum Reward Code ativo encontrado na fonte factual!');
  }
  return reward;
}

// Helper: obtém cupons promocionais ativos com fonte comprovada
export function getActivePromoCoupons(): YesStylePromoOffer[] {
  return YESSTYLE_COUPONS_FACTUAL.filter(
    (item): item is YesStylePromoOffer => item.type === 'coupon' && item.status === 'active'
  );
}
