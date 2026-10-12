// Ímã e inclinação dos cartões de geladeira, pela posição na fila: o "Acabou de sair" da home, os artigos
// da home de cada idioma, as Novidades de /reviews e os cartões das prateleiras de /cupons e dos "Outros
// cupons". Decoração: fora da leitura de tela.
export type CardDecor = { magnet: string | null; tilt: string };

type MagnetSide = 'left' | 'right';
const MAGNET_SIDE: Record<MagnetSide, string> = { left: '-top-3 -left-3', right: '-top-3 -right-3' };

const DECOR: { magnet: { side: MagnetSide; color: string } | null; tilt: string }[] = [
  { magnet: { side: 'right', color: 'bg-amarelo-cupom' }, tilt: '-rotate-1' },
  { magnet: null, tilt: '' },
  { magnet: { side: 'left', color: 'bg-laranja' }, tilt: 'rotate-[0.5deg]' },
  { magnet: null, tilt: '' },
  { magnet: { side: 'right', color: 'bg-marinho' }, tilt: 'rotate-[-0.6deg]' },
];

function decorAt(index: number, side?: MagnetSide): CardDecor {
  const { magnet, tilt } = DECOR[index % DECOR.length];
  return { magnet: magnet ? `${MAGNET_SIDE[side ?? magnet.side]} ${magnet.color}` : null, tilt };
}

export function cardDecorAt(index: number): CardDecor {
  return decorAt(index);
}

// Nos cartões de cupom o ímã fica sempre à direita: à esquerda, ele cobriria o número do desconto, que
// começa no canto de cima à esquerda.
export function couponCardDecorAt(index: number): CardDecor {
  return decorAt(index, 'right');
}
