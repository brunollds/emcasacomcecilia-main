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
    verifiedAt: '2026-08-01',
    officialSourceUrl: 'https://www.yesstyle.com/en/influencers.html',
    affiliateUrl: 'https://ystyle.co/rQYQv',
    status: 'active',
    regions: ['GLOBAL'],
  },
  {
    id: 'campus26-promo',
    code: 'CAMPUS26',
    type: 'coupon',
    discount: { kind: 'text', label: '8–15% OFF' },
    startsAt: '2026-08-14',
    expiresAt: '2026-08-17',
    verifiedAt: '2026-08-14',
    // Termos oficiais (help hsi.2844, item 7178): promoção de 14/08/2026 00:00 GMT a 17/08/2026 23:59 GMT.
    officialSourceUrl: 'https://www.yesstyle.com/en/help/section.html/hsi.2844',
    affiliateUrl: 'https://ystyle.co/rQYQv',
    eligibility: [
      '8% OFF em pedidos a partir de US$ 79',
      '10% OFF em pedidos a partir de US$ 149',
      '15% OFF em pedidos a partir de US$ 199',
    ],
    restrictions: [
      'Válido até 17/08/2026 às 23:59 GMT para membros YesStyle e produtos elegíveis.',
      'Use no campo Coupon Code; pode ser combinado com CECILIA010 no campo Reward Code e com YS Points.',
    ],
    status: 'active',
    regions: ['GLOBAL'],
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

// Helper: obtém a maior data de verificação entre o Reward Code principal e os cupons promocionais ativos
export function getLatestYesStyleVerifiedAtISO(): string {
  const reward = getPrimaryRewardCode();
  const promos = getActivePromoCoupons();
  const allDates = [reward.verifiedAt, ...promos.map((p) => p.verifiedAt)];
  return allDates.reduce((latest, date) => (date > latest ? date : latest), reward.verifiedAt);
}
