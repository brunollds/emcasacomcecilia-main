// O nome da loja com o artigo e a preposição do português. Sem dados: o texto do artigo, que componentes
// 'use client' importam, usa este módulo.

export type StoreName = { slug: string; brand: string };

// O site escreve "do Magalu" e "da" para as outras lojas.
const MASCULINE_STORES = new Set(['magalu']);

const isMasculine = (store: StoreName) => MASCULINE_STORES.has(store.slug);

// "o Magalu", "a DAMIE"
export function theStore(store: StoreName): string {
  return `${isMasculine(store) ? 'o' : 'a'} ${store.brand}`;
}

// "do Magalu", "da DAMIE"
export function ofStore(store: StoreName): string {
  return `${isMasculine(store) ? 'do' : 'da'} ${store.brand}`;
}

// "no Magalu", "na DAMIE"
export function inStore(store: StoreName): string {
  return `${isMasculine(store) ? 'no' : 'na'} ${store.brand}`;
}
