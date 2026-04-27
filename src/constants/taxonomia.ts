/**
 * Taxonomia de Receitas — Em Casa com Cecília
 *
 * Vocabulário controlado para categorização de receitas.
 * Convenção completa em: docs/TAXONOMIA-RECEITAS.md
 *
 * Toda receita preenche `primaryCategory` (obrigatório) + campos auxiliares.
 * Nenhum eixo aceita string livre — todo valor precisa existir em um destes enums.
 */

// ============================================================
// 1. PRIMARY CATEGORY  (obrigatório, 1 valor)
//    É o tipo do prato. Único eixo visível no card e na URL.
// ============================================================

export const PRIMARY_CATEGORIES = [
  'Prato Principal',
  'Sobremesa',
  'Entrada',
  'Acompanhamento',
  'Salada',
  'Sopa',
  'Lanche',
  'Petisco',
  'Bebida',
  'Pão',
  'Molho',
] as const;

export type PrimaryCategory = (typeof PRIMARY_CATEGORIES)[number];

// ============================================================
// 2. SUB CATEGORY  (opcional, 0–2 valores, hierárquico por primary)
// ============================================================

export const SUBCATEGORY_MAP = {
  'Prato Principal': [
    'Massas',
    'Arroz & Risotos',
    'Frango',
    'Carne Vermelha',
    'Peixes & Frutos do Mar',
    'Suína',
    'Vegetariano',
    'Tortas Salgadas',
    'Refogados & Ensopados',
  ],
  'Sobremesa': [
    'Bolos',
    'Tortas Doces',
    'Cheesecakes',
    'Pavês',
    'Pudins & Cremes',
    'Mousses',
    'Gelados',
    'Docinhos',
    'Brownies',
    'Frutas',
    'Biscoitos & Cookies',
  ],
  'Entrada': [],
  'Acompanhamento': [
    'Arroz',
    'Feijão',
    'Legumes',
    'Batatas',
    'Farofas & Farinhas',
    'Purês',
  ],
  'Salada': [
    'Saladas Verdes',
    'Saladas de Grãos',
    'Saladas de Massa',
    'Saladas de Frutas',
  ],
  'Sopa': ['Cremes', 'Caldos', 'Sopas Completas'],
  'Lanche': [
    'Sanduíches',
    'Pizzas',
    'Tapiocas',
    'Salgados Assados',
    'Salgados Fritos',
    'Wraps & Enrolados',
  ],
  'Petisco': [
    'Salgados Fritos',
    'Salgados Assados',
    'Bolinhos',
    'Petiscos Quentes',
    'Petiscos Frios',
  ],
  'Bebida': [
    'Sucos',
    'Vitaminas',
    'Drinks',
    'Chás & Infusões',
    'Cafés',
    'Shakes',
  ],
  'Pão': [
    'Pães Caseiros',
    'Pão de Queijo',
    'Focaccias',
    'Brioches',
    'Massa Folhada',
  ],
  'Molho': ['Molhos Quentes', 'Molhos Frios', 'Molhos Doces'],
} as const satisfies Record<PrimaryCategory, readonly string[]>;

export type SubCategory =
  (typeof SUBCATEGORY_MAP)[PrimaryCategory][number];

/** Retorna as subcategorias permitidas para uma primária dada. */
export function getSubCategoriesFor(
  primary: PrimaryCategory,
): readonly string[] {
  return SUBCATEGORY_MAP[primary];
}

// ============================================================
// 3. MEAL TIME  (opcional, 0–3 valores)
//    Momento de consumo. Independente do tipo de prato.
// ============================================================

export const MEAL_TIMES = [
  'Café da Manhã',
  'Brunch',
  'Almoço',
  'Lanche da Tarde',
  'Happy Hour',
  'Jantar',
  'Ceia',
] as const;

export type MealTime = (typeof MEAL_TIMES)[number];

// ============================================================
// 4. CUISINE  (opcional, 0–2 valores)
// ============================================================

export const CUISINES = [
  'Brasileira',
  'Mineira',
  'Capixaba',
  'Nordestina',
  'Italiana',
  'Japonesa',
  'Chinesa',
  'Mexicana',
  'Francesa',
  'Espanhola',
  'Grega',
  'Inglesa',
  'Árabe',
  'Americana',
  'Portuguesa',
  'Indiana',
  'Mediterrânea',
  'Tailandesa',
] as const;

export type Cuisine = (typeof CUISINES)[number];

// ============================================================
// 5. METHOD  (opcional, 0–3 valores)
// ============================================================

export const METHODS = [
  'Air Fryer',
  'Forno',
  'Fogão',
  'Panela de Pressão',
  'Micro-ondas',
  'Churrasco',
  'Sem Forno',
  'Liquidificador',
  'Fritura',
  'Slow Cooker',
  'Sous Vide',
] as const;

export type Method = (typeof METHODS)[number];

// ============================================================
// 6. DIET  (opcional, 0–3 valores)
// ============================================================

export const DIETS = [
  'Vegetariana',
  'Vegana',
  'Sem Glúten',
  'Sem Lactose',
  'Low Carb',
  'Fit',
  'Cetogênica',
  'Zero Açúcar',
  'High Protein',
] as const;

export type Diet = (typeof DIETS)[number];

// ============================================================
// 7. KEY INGREDIENTS  (opcional, 0–3 valores)
//    Lista curada — pode crescer por demanda editorial (via PR).
// ============================================================

export const KEY_INGREDIENTS = [
  // Proteínas
  'Frango',
  'Carne Bovina',
  'Carne Moída',
  'Carne Suína',
  'Peixe',
  'Salmão',
  'Bacalhau',
  'Camarão',
  'Ovos',
  'Queijo',
  // Base
  'Arroz',
  'Feijão',
  'Macarrão',
  'Batata',
  'Mandioca',
  'Milho',
  // Doces
  'Chocolate',
  'Leite Condensado',
  'Coco',
  'Banana',
  'Maçã',
  'Morango',
  'Limão',
  'Maracujá',
  'Laranja',
  // Vegetais
  'Abobrinha',
  'Berinjela',
  'Tomate',
  'Cenoura',
  'Abóbora',
] as const;

export type KeyIngredient = (typeof KEY_INGREDIENTS)[number];

// ============================================================
// 8. COLLECTIONS  (opcional, 0–3 valores)
//    Eixo editorial/sazonal — principal vetor de SEO sazonal.
// ============================================================

export const COLLECTIONS = [
  // Datas
  'Páscoa',
  'Festa Junina',
  'Dia das Mães',
  'Dia dos Namorados',
  'Dia dos Pais',
  'Natal',
  'Ano Novo',
  'Festas de Fim de Ano',
  'Aniversário',
  // Sazonais
  'Verão',
  'Inverno',
  // Práticas
  'Receitas em 30 min',
  'Poucos Ingredientes',
  'Econômica',
  'Para Congelar',
  'Preparar com Antecedência',
  // Editorial
  'Comfort Food',
  'Receita de Vó',
  'Para Crianças',
  'Para Dois',
  'Receita Clássica',
] as const;

export type Collection = (typeof COLLECTIONS)[number];

// ============================================================
// SHAPE COMPLETO
// ============================================================

export interface RecipeTaxonomy {
  primaryCategory: PrimaryCategory;
  subCategory?: SubCategory[];
  mealTime?: MealTime[];
  cuisine?: Cuisine[];
  method?: Method[];
  diet?: Diet[];
  keyIngredients?: KeyIngredient[];
  collections?: Collection[];
}

// ============================================================
// TYPE GUARDS
// ============================================================

export function isPrimaryCategory(v: unknown): v is PrimaryCategory {
  return (
    typeof v === 'string' &&
    (PRIMARY_CATEGORIES as readonly string[]).includes(v)
  );
}

export function isSubCategoryOf(
  primary: PrimaryCategory,
  v: unknown,
): boolean {
  return (
    typeof v === 'string' &&
    (SUBCATEGORY_MAP[primary] as readonly string[]).includes(v)
  );
}

// ============================================================
// VALIDAÇÃO
// ============================================================

/**
 * Valida um objeto de taxonomia e retorna a lista de erros.
 * Array vazio = válido. Chamar no build sobre data.ts para bloquear PRs
 * com taxonomia inconsistente.
 */
export function validateTaxonomy(
  t: Partial<RecipeTaxonomy>,
): string[] {
  const errors: string[] = [];

  // primaryCategory — obrigatória
  if (!t.primaryCategory) {
    errors.push('primaryCategory é obrigatória');
  } else if (!isPrimaryCategory(t.primaryCategory)) {
    errors.push(`primaryCategory inválida: "${t.primaryCategory}"`);
  }

  // subCategory — precisa existir dentro da primária
  if (t.subCategory && t.primaryCategory && isPrimaryCategory(t.primaryCategory)) {
    const allowed = SUBCATEGORY_MAP[t.primaryCategory] as readonly string[];
    for (const sub of t.subCategory) {
      if (!allowed.includes(sub)) {
        errors.push(
          `subCategory "${sub}" não permitida em "${t.primaryCategory}". ` +
            `Permitidas: ${allowed.join(', ') || '(nenhuma)'}`,
        );
      }
    }
  }

  // Checa cada enum simples
  const simpleEnums: Array<
    [keyof RecipeTaxonomy, readonly string[], number]
  > = [
    ['mealTime', MEAL_TIMES, 3],
    ['cuisine', CUISINES, 2],
    ['method', METHODS, 3],
    ['diet', DIETS, 3],
    ['keyIngredients', KEY_INGREDIENTS, 3],
    ['collections', COLLECTIONS, 3],
  ];

  for (const [field, allowed, max] of simpleEnums) {
    const arr = t[field] as string[] | undefined;
    if (!arr) continue;
    if (arr.length > max) {
      errors.push(`${field} excede o máximo de ${max} valores`);
    }
    for (const v of arr) {
      if (!allowed.includes(v)) {
        errors.push(`${field} inválido: "${v}"`);
      }
    }
  }

  // Limite de subCategory
  if (t.subCategory && t.subCategory.length > 2) {
    errors.push('subCategory excede o máximo de 2 valores');
  }

  return errors;
}

export function getPrimaryCategorySlug(primaryCategory: PrimaryCategory): string {
  return primaryCategory
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'e')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
