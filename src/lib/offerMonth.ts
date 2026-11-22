// Mês em que a oferta vale. O código perene da parceria segue o calendário, no fuso de Brasília: do dia 20 em
// diante já vale o mês seguinte (docs/MANUTENCAO-MENSAL.md, "Antecipar o mês"). O mês não afirma teste nenhum;
// a data do teste no carrinho é o testedAt da loja. Sem imports: o teste dos cupons roda este arquivo direto.
export const OFFER_MONTH_CUTOFF_DAY = 20;

const TITLE_MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

// O dia (AAAA-MM-DD) em Brasília, que não tem horário de verão desde 2019.
export function getBrasiliaDate(now = Date.now()): string {
  return new Date(now - 3 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export function getOfferMonth(date: string): { year: number; month: number } {
  const [year, month, day] = date.split('-').map(Number);
  if (day < OFFER_MONTH_CUTOFF_DAY) return { year, month };
  return month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 };
}

// Data no meio do mês da oferta de hoje, para formatar o nome do mês em qualquer idioma.
export function getCurrentOfferMonthDate(now = Date.now()): Date {
  const { year, month } = getOfferMonth(getBrasiliaDate(now));
  return new Date(year, month - 1, 15, 12);
}

// O título em PT das lojas com metaTitleMonth ganha o mês da oferta no fim: "(nov/2026)".
export function getCouponMetaTitle(coupon: { metaTitle: string; metaTitleMonth?: boolean }, now = Date.now()): string {
  if (!coupon.metaTitleMonth) return coupon.metaTitle;
  const { year, month } = getOfferMonth(getBrasiliaDate(now));
  return `${coupon.metaTitle} (${TITLE_MONTHS[month - 1]}/${year})`;
}
