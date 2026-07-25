// Fonte factual única para cupons YesStyle (Projeto A - A4)
// Fatos, datas, regras e links de verificação oficiais.

export interface YesStyleCouponItem {
  code: string;
  type: 'reward' | 'coupon';
  newCustomerDiscount: number; // Ex: 5 (%)
  returningCustomerDiscount: number; // Ex: 2 (%)
  verifiedAt: string; // YYYY-MM-DD
  expiresAt?: string; // YYYY-MM-DD (opcional para cupons promocionais temporários)
  officialSourceUrl: string; // Fonte oficial comprovável
  affiliateUrl: string; // Link comercial de afiliada
  status: 'active' | 'scheduled' | 'expired';
  regions: string[];
}

export const YESSTYLE_COUPONS_FACTUAL: YesStyleCouponItem[] = [
  {
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
];

// Helper: obtém o código de recompensa ativo principal (Rewards/Influencer Code)
export function getPrimaryRewardCode(): YesStyleCouponItem {
  const reward = YESSTYLE_COUPONS_FACTUAL.find((item) => item.type === 'reward' && item.status === 'active');
  if (!reward) {
    throw new Error('[yesstyleCoupons] Nenhum Reward Code ativo encontrado na fonte factual!');
  }
  return reward;
}

// Helper: obtém cupons promocionais ativos com fonte comprovada
export function getActivePromoCoupons(): YesStyleCouponItem[] {
  return YESSTYLE_COUPONS_FACTUAL.filter((item) => item.type === 'coupon' && item.status === 'active');
}
