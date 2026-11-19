import type { Coupon } from '@/lib/couponsData';

// O aviso de temporada nos recortes de código: na Black Friday, as lojas mudam o percentual dos códigos de parceiro sem
// avisar (Insider em 17/11/2026 e Skelt em 18/11/2026 deram 5% no carrinho, com 10% combinados). Uma janela só para o
// site inteiro, com -03:00 como as campanhas: o aviso some no navegador quando ela vence, sem deploy.
export const CODE_SEASON_NOTICE = {
  startsAt: '2026-11-18T00:00:00-03:00',
  endsAt: '2026-12-01T00:00:00-03:00',
  text: 'Na Black Friday, lojas podem alterar a porcentagem do desconto sem aviso. Confira no carrinho.',
};

export type CodeSeasonNotice = typeof CODE_SEASON_NOTICE & { inHtml: boolean };

// O aviso que ainda não venceu, com o que o HTML do build mostra (o que já começou), como getPendingLimitedCodes.
export function getPendingCodeSeasonNotice(now = Date.now()): CodeSeasonNotice | undefined {
  if (Date.parse(CODE_SEASON_NOTICE.endsAt) < now) return undefined;
  return { ...CODE_SEASON_NOTICE, inHtml: Date.parse(CODE_SEASON_NOTICE.startsAt) <= now };
}

// Só loja de cupom: o percentual é o que a loja pode mudar. Ficam fora a loja de link, o código de indicação da SHEIN
// (loja de link) e o código de recompensa da YesStyle, que não é cupom.
export function storeTakesCodeSeasonNotice(store: Coupon): boolean {
  return store.offerMode === 'discount-code' && !store.codeKind;
}
