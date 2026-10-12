import type { CSSProperties } from 'react';

// A capa do artigo nos cartões segue uma regra só, vinda do JSON do artigo. Quem a usa: a estante de /reviews
// e das subpáginas de loja, o hub de /<locale>/reviews, a foto e as miniaturas da vitrine da home, o "Acabou
// de sair" (também nas homes dos outros idiomas) e a faixa da data comercial (home e /black-friday). Sem
// imageFit, a foto de produto com nota fica inteira e o resto cobre o cartão. Capa com texto ou print de
// site pede "imageFit": "contain".
export type CardImageFit = 'cover' | 'contain';
export type CardImagePosition = 'center' | 'top' | 'bottom' | 'left' | 'right';

export function cardImageFit(review: { imageFit?: CardImageFit; rating?: number }): CardImageFit {
  return review.imageFit ?? (review.rating ? 'contain' : 'cover');
}

const OBJECT_POSITION: Record<CardImagePosition, string> = {
  top: '50% 10%',
  bottom: '50% 90%',
  left: '20% 50%',
  right: '80% 50%',
  center: 'center',
};

// As classes e o estilo da <Image fill> do cartão. Inteira, a capa fica sobre fundo branco, com o respiro
// que o cartão passar; cobrindo, o imagePosition escolhe o recorte.
export function cardImageLook(
  fit: CardImageFit,
  position: CardImagePosition | undefined,
  padding: string
): { className: string; style?: CSSProperties } {
  if (fit === 'contain') return { className: `bg-white object-contain ${padding}` };
  return { className: 'object-cover', style: position ? { objectPosition: OBJECT_POSITION[position] } : undefined };
}
