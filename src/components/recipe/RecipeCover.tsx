import { createElement } from 'react';
import { SquaresFour } from '@phosphor-icons/react/ssr';
import { getCategoryLineIcon } from '@/lib/categoryIcons';

// A capa desenhada da receita sem foto própria: o ícone da categoria sobre uma cor lisa do D2. Nunca a foto
// de outro prato. Decoração: o título do cartão já diz qual é a receita. Preenche o contêiner da foto, que
// dá a proporção; serve ao servidor (home, /buscar) e ao cliente (/receitas).

export type RecipeCoverSource = { primaryCategory?: string; subCategory?: readonly string[] };

const TONES = [
  'bg-amarelo-cupom text-marinho',
  'bg-laranja text-white',
  'bg-marinho text-amarelo-cupom',
  'bg-verde-claro text-marinho',
] as const;

// A subcategoria dá o ícone mais preciso (Bolos, Pizzas); sem ícone para ela, vale o tipo do prato.
export function getRecipeCoverLabel({ primaryCategory, subCategory }: RecipeCoverSource): string {
  return subCategory?.find((label) => getCategoryLineIcon(label)) ?? primaryCategory ?? '';
}

// A mesma categoria tem sempre a mesma cor.
export function getRecipeCoverTone(label: string): string {
  let hash = 0;
  for (const char of label) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return TONES[hash % TONES.length];
}

export function RecipeCover({ recipe, className = '' }: { recipe: RecipeCoverSource; className?: string }) {
  const label = getRecipeCoverLabel(recipe);
  return (
    <span
      aria-hidden="true"
      data-recipe-cover=""
      className={`absolute inset-0 flex items-center justify-center ${getRecipeCoverTone(label)} ${className}`}
    >
      {/* createElement: o ícone vem de uma tabela fixa, não é componente criado no render. */}
      {createElement(getCategoryLineIcon(label) ?? SquaresFour, { weight: 'duotone', className: 'h-2/5 w-2/5' })}
    </span>
  );
}
