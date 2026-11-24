import catalogData from '../../../data/afiliados/catalogo-leve.json';

// O que cada parceira de cupom oferece, sem preço nem estoque. O código e o link de cada loja vêm de couponsData.ts.
export type CatalogStore = {
  slug: string;
  categorias: { nome: string; tipos: string[] }[];
  destaques?: string[];
  naoVende?: string[];
  // `semCodigo`: itens em que o código não vale. Perguntado um deles, o cartão sai sem código, só com o aviso.
  avisos?: { termos: string[]; texto: string; semCodigo?: string[] }[];
};

export type VocabularyEntry = { term: string; slugs: string[] };

const catalog = catalogData as CatalogStore[];

export function getCatalog(): CatalogStore[] {
  return catalog;
}

// Minúsculas, sem acento, hífen e pontuação como espaço: "Sofá-Cama!" → "sofa cama".
export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

let vocabulary: Map<string, VocabularyEntry> | undefined;

// Os tipos, os destaques e os nomes das categorias, pela forma normalizada, com as lojas de cada um.
export function getVocabulary(): Map<string, VocabularyEntry> {
  if (vocabulary) return vocabulary;
  const map = new Map<string, VocabularyEntry>();
  const add = (term: string, slug: string) => {
    const key = normalize(term);
    if (!key) return;
    const entry = map.get(key) ?? { term, slugs: [] };
    if (!entry.slugs.includes(slug)) entry.slugs.push(slug);
    map.set(key, entry);
  };
  for (const store of catalog) {
    for (const category of store.categorias) {
      add(category.nome, store.slug);
      for (const type of category.tipos) add(type, store.slug);
    }
    for (const highlight of store.destaques ?? []) add(highlight, store.slug);
  }
  vocabulary = map;
  return map;
}
