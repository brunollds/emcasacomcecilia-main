// Só tipos: é o único módulo do DICA que um componente cliente pode importar (com `import type`).

export type DicaCard = {
  slug: string;
  brand: string;
  matched: string[];
  code?: string;
  codeLabel: string;
  discount?: string;
  note?: string;
  warnings: string[];
  storeUrl: string;
  couponPageUrl: string;
};

export type DicaResult = 'parceiros' | 'dicas' | 'fora' | 'reserva-parceiros' | 'reserva-dicas' | 'limite';

export type DicaAnswer = {
  result: DicaResult;
  message: string;
  cards: DicaCard[];
  dicasUrl?: string;
  searchTerm?: string;
};
