// Fonte central de autores do Em Casa com Cecília.
// Use resolveAuthors() nos adaptadores para normalizar autoria sem repetir dados.
//
// Avatares esperados em public/images/authors/:
//   - cecilia-mauad.webp
//   - bruno-luiz.webp

import type { PersonRef } from './types';

export const CECILIA_AUTHOR: PersonRef = {
  name: 'Cecília Mauad',
  slug: 'cecilia-mauad',
  role: 'Em Casa com Cecília',
  initials: 'CM',
  url: '/sobre',
};

export const BRUNO_AUTHOR: PersonRef = {
  name: 'Bruno Luiz',
  slug: 'bruno-luiz',
  role: 'Edição e análise',
  initials: 'BL',
};

/**
 * Resolve a lista canônica de autores a partir de `authors` (array) ou `author` (único).
 * Fallback para Cecília Mauad quando nenhum autor é fornecido.
 * Não altera registros legados que ainda não possuem campos de autoria.
 */
export function resolveAuthors(
  authors: PersonRef[] | undefined,
  author: PersonRef | undefined
): PersonRef[] {
  if (authors && authors.length > 0) return authors;
  if (author) return [author];
  return [CECILIA_AUTHOR];
}
