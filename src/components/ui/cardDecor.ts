// Ímã e inclinação dos cartões de geladeira, pela posição na fila: o "Acabou de sair" da home, os artigos
// da home de cada idioma, as Novidades de /reviews e os cartões das prateleiras de /cupons e dos "Outros
// cupons". Decoração: fora da leitura de tela.
export type CardDecor = { magnet: string | null; tilt: string };

type MagnetSide = 'left' | 'right';
type Decor = { magnet: { side: MagnetSide; color: string } | null; tilt: string };
const MAGNET_SIDE: Record<MagnetSide, string> = { left: '-top-3 -left-3', right: '-top-3 -right-3' };

const DECOR: Decor[] = [
  { magnet: { side: 'right', color: 'bg-amarelo-cupom' }, tilt: '-rotate-1' },
  { magnet: null, tilt: '' },
  { magnet: { side: 'left', color: 'bg-laranja' }, tilt: 'rotate-[0.5deg]' },
  { magnet: null, tilt: '' },
  { magnet: { side: 'right', color: 'bg-marinho' }, tilt: 'rotate-[-0.6deg]' },
];

// Nos cartões de cupom o ímã fica sempre à direita: à esquerda, ele cobriria o número do desconto, que
// começa no canto de cima à esquerda. E nunca é amarelo: ele fica sobre a faixa amarela do preço e sumiria
// nela; no lugar, vai o marinho da borda.
const COUPON_DECOR: Decor[] = DECOR.map(
  ({ magnet, tilt }): Decor => ({
    magnet: magnet && { side: 'right', color: magnet.color === 'bg-amarelo-cupom' ? 'bg-marinho' : magnet.color },
    tilt,
  })
);

function decorAt(table: Decor[], index: number): CardDecor {
  const { magnet, tilt } = table[index % table.length];
  return { magnet: magnet ? `${MAGNET_SIDE[magnet.side]} ${magnet.color}` : null, tilt };
}

export function cardDecorAt(index: number): CardDecor {
  return decorAt(DECOR, index);
}

export function couponCardDecorAt(index: number): CardDecor {
  return decorAt(COUPON_DECOR, index);
}
