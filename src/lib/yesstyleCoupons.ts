// Fonte factual única para cupons YesStyle (Projeto B1 - B1.1)
// Fatos, datas, regras e links de verificação oficiais.
import yesstyleCouponsData from '../../data/coupons/yesstyle.json';

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

// O JSON é validado antes do TypeScript/Next em todo `npm run build`.
export const YESSTYLE_COUPONS_FACTUAL = yesstyleCouponsData as YesStyleOffer[];

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
