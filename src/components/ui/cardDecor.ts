// Ímã e inclinação dos cartões de geladeira, pela posição na fila: o "Acabou de sair" da home, os
// artigos da home de cada idioma e as Novidades de /reviews. Decoração: fora da leitura de tela.
export type CardDecor = { magnet: string | null; tilt: string };

export const CARD_DECOR: CardDecor[] = [
  { magnet: '-top-3 -right-3 bg-amarelo-cupom', tilt: '-rotate-1' },
  { magnet: null, tilt: '' },
  { magnet: '-top-3 -left-3 bg-laranja', tilt: 'rotate-[0.5deg]' },
  { magnet: null, tilt: '' },
  { magnet: '-top-3 -right-3 bg-marinho', tilt: 'rotate-[-0.6deg]' },
];

export function cardDecorAt(index: number): CardDecor {
  return CARD_DECOR[index % CARD_DECOR.length];
}
