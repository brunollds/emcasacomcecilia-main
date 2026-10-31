// Mês em que a oferta vale, a partir da data real do teste (`lastVerified`, YYYY-MM-DD). Teste feito do
// dia 20 em diante já vale para o mês seguinte (docs/MANUTENCAO-MENSAL.md, "Antecipar o mês"); a data do
// teste em si nunca muda. Sem imports: o teste dos cupons roda este arquivo direto.
export const OFFER_MONTH_CUTOFF_DAY = 20;

export function getOfferMonth(lastVerified: string): { year: number; month: number } {
  const [year, month, day] = lastVerified.split('-').map(Number);
  if (day < OFFER_MONTH_CUTOFF_DAY) return { year, month };
  return month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 };
}

// Data no meio do mês da oferta, para formatar o nome do mês em qualquer idioma.
export function getOfferMonthDate(lastVerified: string): Date {
  const { year, month } = getOfferMonth(lastVerified);
  return new Date(year, month - 1, 15, 12);
}
