#!/usr/bin/env node
/**
 * scripts/migrate-categories.mjs
 *
 * Migra o campo legado `categories: string[]` (eixo único bagunçado) para a
 * taxonomia multifaceta definida em src/constants/taxonomia.ts.
 *
 * Uso:
 *   node scripts/migrate-categories.mjs <entrada.json> <saida.json>
 *   node scripts/migrate-categories.mjs <entrada.json> <saida.json> --dry-run
 *
 * Entrada:
 *   JSON com array de receitas. Cada receita deve ter um campo
 *   `categories: string[]`. Os demais campos são preservados intactos.
 *
 *   Para exportar data.ts para JSON neste repo:
 *     npx tsx -e "import('./src/lib/data.ts').then(m => console.log(JSON.stringify(m.recipes, null, 2)))" > receitas-antigo.json
 *
 * Saída:
 *   - <saida.json>       → receitas migradas com os 8 novos campos.
 *                          `categories` original é preservado para diff visual.
 *   - <saida.report.json> → relatório de casos ambíguos, termos não-mapeados, etc.
 *
 * Relatório stdout:
 *   - Total processado
 *   - Sem primaryCategory resolvida (precisam revisão manual)
 *   - Conflitos entre primárias candidatas
 *   - Top 20 termos não-mapeados (candidatos a entrar no CATEGORY_MAP)
 */

import fs from 'node:fs/promises';
import path from 'node:path';

// ============================================================
// MAPA DE REGRAS
//
// Formato: 'valor antigo em categories[]' → regra.
//
// Regras possíveis:
//   { field: 'primaryCategory', value: '...' }
//   { field: 'subCategory', value: '...', impliesPrimary?: '...' }
//   { field: 'mealTime' | 'cuisine' | 'method' | 'diet' | 'keyIngredients' | 'collections', value: '...' }
//   { ignore: true }   — descarta silenciosamente (lixo conhecido)
//
// `impliesPrimary` herda a primária quando óbvio. Conflitos são reportados e
// precisam de revisão manual.
//
// IMPORTANTE: este mapa precisa crescer conforme você vê os "não-mapeados" no
// relatório. Primeira rodada sempre deixa muitos termos fora — é normal.
// ============================================================

const CATEGORY_MAP = {
  // ---- primaryCategory (singular + plural) ----
  'Sobremesa': { field: 'primaryCategory', value: 'Sobremesa' },
  'Sobremesas': { field: 'primaryCategory', value: 'Sobremesa' },
  'Prato Principal': { field: 'primaryCategory', value: 'Prato Principal' },
  'Pratos Principais': { field: 'primaryCategory', value: 'Prato Principal' },
  'Prato principal': { field: 'primaryCategory', value: 'Prato Principal' },
  'Entrada': { field: 'primaryCategory', value: 'Entrada' },
  'Entradas': { field: 'primaryCategory', value: 'Entrada' },
  'Acompanhamento': { field: 'primaryCategory', value: 'Acompanhamento' },
  'Acompanhamentos': { field: 'primaryCategory', value: 'Acompanhamento' },
  'Salada': { field: 'primaryCategory', value: 'Salada' },
  'Saladas': { field: 'primaryCategory', value: 'Salada' },
  'Sopa': { field: 'primaryCategory', value: 'Sopa' },
  'Sopas': { field: 'primaryCategory', value: 'Sopa' },
  'Lanche': { field: 'primaryCategory', value: 'Lanche' },
  'Lanches': { field: 'primaryCategory', value: 'Lanche' },
  'Petisco': { field: 'primaryCategory', value: 'Petisco' },
  'Petiscos': { field: 'primaryCategory', value: 'Petisco' },
  'Bebida': { field: 'primaryCategory', value: 'Bebida' },
  'Bebidas': { field: 'primaryCategory', value: 'Bebida' },
  'Pão': { field: 'primaryCategory', value: 'Pão' },
  'Pães': { field: 'primaryCategory', value: 'Pão' },
  'Molho': { field: 'primaryCategory', value: 'Molho' },
  'Molhos': { field: 'primaryCategory', value: 'Molho' },

  // ---- subCategory (com herança de primary) ----
  // Sobremesa →
  'Doces': { field: 'primaryCategory', value: 'Sobremesa' },
  'Docinhos': { field: 'subCategory', value: 'Docinhos', impliesPrimary: 'Sobremesa' },
  'Bolo': { field: 'subCategory', value: 'Bolos', impliesPrimary: 'Sobremesa' },
  'Bolos': { field: 'subCategory', value: 'Bolos', impliesPrimary: 'Sobremesa' },
  'Torta Doce': { field: 'subCategory', value: 'Tortas Doces', impliesPrimary: 'Sobremesa' },
  'Tortas Doces': { field: 'subCategory', value: 'Tortas Doces', impliesPrimary: 'Sobremesa' },
  'Pudim': { field: 'subCategory', value: 'Pudins & Cremes', impliesPrimary: 'Sobremesa' },
  'Pudins': { field: 'subCategory', value: 'Pudins & Cremes', impliesPrimary: 'Sobremesa' },
  'Creme': { field: 'subCategory', value: 'Pudins & Cremes', impliesPrimary: 'Sobremesa' },
  'Mousse': { field: 'subCategory', value: 'Mousses', impliesPrimary: 'Sobremesa' },
  'Mousses': { field: 'subCategory', value: 'Mousses', impliesPrimary: 'Sobremesa' },
  'Sorvete': { field: 'subCategory', value: 'Gelados', impliesPrimary: 'Sobremesa' },
  'Sorvetes': { field: 'subCategory', value: 'Gelados', impliesPrimary: 'Sobremesa' },
  'Gelados': { field: 'subCategory', value: 'Gelados', impliesPrimary: 'Sobremesa' },
  'Doces Gelados': { field: 'subCategory', value: 'Gelados', impliesPrimary: 'Sobremesa' },
  'Picolé': { field: 'subCategory', value: 'Gelados', impliesPrimary: 'Sobremesa' },
  'Biscoito': { field: 'subCategory', value: 'Biscoitos & Cookies', impliesPrimary: 'Sobremesa' },
  'Biscoitos': { field: 'subCategory', value: 'Biscoitos & Cookies', impliesPrimary: 'Sobremesa' },
  'Cookies': { field: 'subCategory', value: 'Biscoitos & Cookies', impliesPrimary: 'Sobremesa' },
  'Bolos Caseiros': { field: 'subCategory', value: 'Bolos', impliesPrimary: 'Sobremesa' },
  'Frutas': { field: 'subCategory', value: 'Frutas', impliesPrimary: 'Sobremesa' },
  'Pavês': { field: 'primaryCategory', value: 'Sobremesa' },
  'Brownies': { field: 'primaryCategory', value: 'Sobremesa' },
  'Donuts': { field: 'primaryCategory', value: 'Sobremesa' },
  'Cheesecakes': { field: 'subCategory', value: 'Tortas Doces', impliesPrimary: 'Sobremesa' },
  'Tortas': { ignore: true },

  // Prato Principal →
  'Massa': { field: 'subCategory', value: 'Massas', impliesPrimary: 'Prato Principal' },
  'Massas': { field: 'subCategory', value: 'Massas', impliesPrimary: 'Prato Principal' },
  'Risoto': { field: 'subCategory', value: 'Arroz & Risotos', impliesPrimary: 'Prato Principal' },
  'Risotos': { field: 'subCategory', value: 'Arroz & Risotos', impliesPrimary: 'Prato Principal' },
  'Frango': { field: 'subCategory', value: 'Frango', impliesPrimary: 'Prato Principal' },
  'Carnes': { field: 'subCategory', value: 'Carne Vermelha', impliesPrimary: 'Prato Principal' },
  'Peixes': { field: 'subCategory', value: 'Peixes & Frutos do Mar', impliesPrimary: 'Prato Principal' },
  'Frutos do Mar': { field: 'subCategory', value: 'Peixes & Frutos do Mar', impliesPrimary: 'Prato Principal' },
  'Quiches': { field: 'subCategory', value: 'Tortas Salgadas', impliesPrimary: 'Prato Principal' },

  // Lanche →
  'Sanduíche': { field: 'subCategory', value: 'Sanduíches', impliesPrimary: 'Lanche' },
  'Sanduíches': { field: 'subCategory', value: 'Sanduíches', impliesPrimary: 'Lanche' },
  'Pizza': { field: 'subCategory', value: 'Pizzas', impliesPrimary: 'Lanche' },
  'Pizzas': { field: 'subCategory', value: 'Pizzas', impliesPrimary: 'Lanche' },
  'Tapioca': { field: 'subCategory', value: 'Tapiocas', impliesPrimary: 'Lanche' },
  'Tapiocas': { field: 'subCategory', value: 'Tapiocas', impliesPrimary: 'Lanche' },
  'Salgado': { field: 'primaryCategory', value: 'Lanche' },
  'Salgados': { field: 'primaryCategory', value: 'Lanche' },
  'Wrap': { field: 'subCategory', value: 'Wraps & Enrolados', impliesPrimary: 'Lanche' },
  'Wraps': { field: 'subCategory', value: 'Wraps & Enrolados', impliesPrimary: 'Lanche' },

  // Pão →
  'Pão de Queijo': { field: 'subCategory', value: 'Pão de Queijo', impliesPrimary: 'Pão' },
  'Focaccia': { field: 'subCategory', value: 'Focaccias', impliesPrimary: 'Pão' },
  'Brioche': { field: 'subCategory', value: 'Brioches', impliesPrimary: 'Pão' },
  'Massa Folhada': { field: 'subCategory', value: 'Massa Folhada', impliesPrimary: 'Pão' },

  // Bebida →
  'Suco': { field: 'subCategory', value: 'Sucos', impliesPrimary: 'Bebida' },
  'Sucos': { field: 'subCategory', value: 'Sucos', impliesPrimary: 'Bebida' },
  'Vitamina': { field: 'subCategory', value: 'Vitaminas', impliesPrimary: 'Bebida' },
  'Smoothies': { field: 'subCategory', value: 'Vitaminas', impliesPrimary: 'Bebida' },
  'Drink': { field: 'subCategory', value: 'Drinks', impliesPrimary: 'Bebida' },
  'Drinks': { field: 'subCategory', value: 'Drinks', impliesPrimary: 'Bebida' },
  'Chá': { field: 'subCategory', value: 'Chás & Infusões', impliesPrimary: 'Bebida' },
  'Café': { field: 'subCategory', value: 'Cafés', impliesPrimary: 'Bebida' },

  // ---- mealTime ----
  'Café da Manhã': { field: 'mealTime', value: 'Café da Manhã' },
  'Café da manhã': { field: 'mealTime', value: 'Café da Manhã' },
  'Almoço': { field: 'mealTime', value: 'Almoço' },
  'Jantar': { field: 'mealTime', value: 'Jantar' },
  'Lanche da Tarde': { field: 'mealTime', value: 'Lanche da Tarde' },
  'Lanche da tarde': { field: 'mealTime', value: 'Lanche da Tarde' },
  'Happy Hour': { field: 'mealTime', value: 'Happy Hour' },
  'Ceia': { field: 'mealTime', value: 'Ceia' },
  'Brunch': { field: 'mealTime', value: 'Brunch' },

  // ---- cuisine ----
  'Brasileira': { field: 'cuisine', value: 'Brasileira' },
  'Brasileiro': { field: 'cuisine', value: 'Brasileira' },
  'Capixaba': { field: 'cuisine', value: 'Capixaba' },
  'Mineira': { field: 'cuisine', value: 'Mineira' },
  'Nordestina': { field: 'cuisine', value: 'Nordestina' },
  'Italiana': { field: 'cuisine', value: 'Italiana' },
  'Japonesa': { field: 'cuisine', value: 'Japonesa' },
  'Chinesa': { field: 'cuisine', value: 'Chinesa' },
  'Mexicana': { field: 'cuisine', value: 'Mexicana' },
  'Thai': { field: 'cuisine', value: 'Tailandesa' },
  'Grega': { field: 'cuisine', value: 'Grega' },
  'Espanhola': { field: 'cuisine', value: 'Espanhola' },
  'Francesa': { field: 'cuisine', value: 'Francesa' },
  'Árabe': { field: 'cuisine', value: 'Árabe' },
  'Americana': { field: 'cuisine', value: 'Americana' },
  'Portuguesa': { field: 'cuisine', value: 'Portuguesa' },
  'Indiana': { field: 'cuisine', value: 'Indiana' },
  'Mediterrânea': { field: 'cuisine', value: 'Mediterrânea' },
  'Tailandesa': { field: 'cuisine', value: 'Tailandesa' },

  // ---- method ----
  'Air Fryer': { field: 'method', value: 'Air Fryer' },
  'Airfryer': { field: 'method', value: 'Air Fryer' },
  'Air-fryer': { field: 'method', value: 'Air Fryer' },
  'Fritadeira': { field: 'method', value: 'Air Fryer' },
  'Fritadeira Elétrica': { field: 'method', value: 'Air Fryer' },
  'Forno': { field: 'method', value: 'Forno' },
  'No Forno': { field: 'method', value: 'Forno' },
  'Assado': { field: 'method', value: 'Forno' },
  'Assada': { field: 'method', value: 'Forno' },
  'Fogão': { field: 'method', value: 'Fogão' },
  'Panela de Pressão': { field: 'method', value: 'Panela de Pressão' },
  'Pressão': { field: 'method', value: 'Panela de Pressão' },
  'Micro-ondas': { field: 'method', value: 'Micro-ondas' },
  'Microondas': { field: 'method', value: 'Micro-ondas' },
  'Micro-Ondas': { field: 'method', value: 'Micro-ondas' },
  'Churrasco': { field: 'method', value: 'Churrasco' },
  'Sem Forno': { field: 'method', value: 'Sem Forno' },
  'Sem forno': { field: 'method', value: 'Sem Forno' },
  'Liquidificador': { field: 'method', value: 'Liquidificador' },
  'No Liquidificador': { field: 'method', value: 'Liquidificador' },
  'Fritura': { field: 'method', value: 'Fritura' },
  'Frito': { field: 'method', value: 'Fritura' },
  'Frita': { field: 'method', value: 'Fritura' },
  'Slow Cooker': { field: 'method', value: 'Slow Cooker' },
  'Sous Vide': { field: 'method', value: 'Sous Vide' },

  // ---- diet ----
  'Vegetariana': { field: 'diet', value: 'Vegetariana' },
  'Vegetariano': { field: 'diet', value: 'Vegetariana' },
  'Vegana': { field: 'diet', value: 'Vegana' },
  'Vegano': { field: 'diet', value: 'Vegana' },
  'Sem Glúten': { field: 'diet', value: 'Sem Glúten' },
  'Sem glúten': { field: 'diet', value: 'Sem Glúten' },
  'Sem Lactose': { field: 'diet', value: 'Sem Lactose' },
  'Sem lactose': { field: 'diet', value: 'Sem Lactose' },
  'Low Carb': { field: 'diet', value: 'Low Carb' },
  'Low-Carb': { field: 'diet', value: 'Low Carb' },
  'Lowcarb': { field: 'diet', value: 'Low Carb' },
  'Fit': { field: 'diet', value: 'Fit' },
  'Veganas': { field: 'diet', value: 'Vegana' },
  'Saudável': { ignore: true },
  'Saudáveis': { ignore: true },
  'Cetogênica': { field: 'diet', value: 'Cetogênica' },
  'Keto': { field: 'diet', value: 'Cetogênica' },
  'Zero Açúcar': { field: 'diet', value: 'Zero Açúcar' },
  'High Protein': { field: 'diet', value: 'High Protein' },
  'Proteica': { field: 'diet', value: 'High Protein' },
  'Proteico': { field: 'diet', value: 'High Protein' },

  // ---- keyIngredients ----
  'Frango': { field: 'keyIngredients', value: 'Frango' },
  'Carne': { field: 'keyIngredients', value: 'Carne Bovina' },
  'Carne Bovina': { field: 'keyIngredients', value: 'Carne Bovina' },
  'Carne Moída': { field: 'keyIngredients', value: 'Carne Moída' },
  'Carne Suína': { field: 'keyIngredients', value: 'Carne Suína' },
  'Porco': { field: 'keyIngredients', value: 'Carne Suína' },
  'Peixe': { field: 'keyIngredients', value: 'Peixe' },
  'Camarão': { field: 'keyIngredients', value: 'Camarão' },
  'Ovo': { field: 'keyIngredients', value: 'Ovos' },
  'Ovos': { field: 'keyIngredients', value: 'Ovos' },
  'Queijo': { field: 'keyIngredients', value: 'Queijo' },
  'Arroz': { field: 'keyIngredients', value: 'Arroz' },
  'Feijão': { field: 'keyIngredients', value: 'Feijão' },
  'Macarrão': { field: 'keyIngredients', value: 'Macarrão' },
  'Batata': { field: 'keyIngredients', value: 'Batata' },
  'Mandioca': { field: 'keyIngredients', value: 'Mandioca' },
  'Milho': { field: 'keyIngredients', value: 'Milho' },
  'Chocolate': { field: 'keyIngredients', value: 'Chocolate' },
  'Chocolate Branco': { field: 'keyIngredients', value: 'Chocolate' },
  'Leite Condensado': { field: 'keyIngredients', value: 'Leite Condensado' },
  'Coco': { field: 'keyIngredients', value: 'Coco' },
  'Banana': { field: 'keyIngredients', value: 'Banana' },
  'Maçã': { field: 'keyIngredients', value: 'Maçã' },
  'Morango': { field: 'keyIngredients', value: 'Morango' },
  'Limão': { field: 'keyIngredients', value: 'Limão' },
  'Abobrinha': { field: 'keyIngredients', value: 'Abobrinha' },
  'Berinjela': { field: 'keyIngredients', value: 'Berinjela' },
  'Tomate': { field: 'keyIngredients', value: 'Tomate' },
  'Cenoura': { field: 'keyIngredients', value: 'Cenoura' },
  'Abóbora': { field: 'keyIngredients', value: 'Abóbora' },

  // ---- collections ----
  'Páscoa': { field: 'collections', value: 'Páscoa' },
  'Festa Junina': { field: 'collections', value: 'Festa Junina' },
  'Junina': { field: 'collections', value: 'Festa Junina' },
  'Sazonais': { ignore: true },
  'Dia das Mães': { field: 'collections', value: 'Dia das Mães' },
  'Dia dos Namorados': { field: 'collections', value: 'Dia dos Namorados' },
  'Dia dos Pais': { field: 'collections', value: 'Dia dos Pais' },
  'Natal': { field: 'collections', value: 'Natal' },
  'Natalina': { field: 'collections', value: 'Natal' },
  'Ano Novo': { field: 'collections', value: 'Ano Novo' },
  'Réveillon': { field: 'collections', value: 'Ano Novo' },
  'Aniversário': { field: 'collections', value: 'Aniversário' },
  'Receitas em 30 min': { field: 'collections', value: 'Receitas em 30 min' },
  '30 Minutos': { field: 'collections', value: 'Receitas em 30 min' },
  'Rápida': { ignore: true },
  'Rápido': { ignore: true },
  'Poucos Ingredientes': { field: 'collections', value: 'Poucos Ingredientes' },
  'Econômica': { field: 'collections', value: 'Econômica' },
  'Econômico': { field: 'collections', value: 'Econômica' },
  'Barata': { field: 'collections', value: 'Econômica' },
  'Para Congelar': { field: 'collections', value: 'Para Congelar' },
  'Comfort Food': { field: 'collections', value: 'Comfort Food' },
  'Comida Afetiva': { field: 'collections', value: 'Comfort Food' },
  'Receita de Vó': { field: 'collections', value: 'Receita de Vó' },
  'De Vó': { field: 'collections', value: 'Receita de Vó' },
  'Para Crianças': { field: 'collections', value: 'Para Crianças' },
  'Kids': { field: 'collections', value: 'Para Crianças' },
  'Infantil': { field: 'collections', value: 'Para Crianças' },
  'Para Dois': { field: 'collections', value: 'Para Dois' },
  'Clássica': { field: 'collections', value: 'Receita Clássica' },
  'Clássico': { field: 'collections', value: 'Receita Clássica' },
  'Clássicas': { field: 'collections', value: 'Receita Clássica' },
  'Clássicos': { field: 'collections', value: 'Receita Clássica' },

  // ---- termos editoriais genéricos / não confiáveis ----
  'Internacional': { ignore: true },
  'Caseiras': { ignore: true },
  'Confeitaria': { ignore: true },
  'Prato Único': { field: 'primaryCategory', value: 'Prato Principal' },
  'Festas': { ignore: true },
  'Leves': { ignore: true },
  'Básicos': { ignore: true },
  'Especiarias': { ignore: true },
  'Aproveitamento': { ignore: true },
  'Gourmet': { ignore: true },
  'Especiais': { ignore: true },
  'Integrais': { ignore: true },
  'Legumes': { ignore: true },
  'Ricota': { ignore: true },
  'Tropicais': { ignore: true },
  'Fáceis': { ignore: true },

  // ---- termos específicos demais para taxonomia ----
  'Ovolmatine': { ignore: true },
  'Copos da Felicidade': { ignore: true },
};

// Campos que aceitam múltiplos valores
const MULTI_FIELDS = new Set([
  'subCategory',
  'mealTime',
  'cuisine',
  'method',
  'diet',
  'keyIngredients',
  'collections',
]);

// ============================================================
// LÓGICA
// ============================================================

function normalizeKey(s) {
  return String(s).trim();
}

function identifyRecipe(recipe) {
  return recipe.id ?? recipe.slug ?? recipe.title ?? recipe.nome ?? '(sem id)';
}

function inferPrimaryFromOriginalCategories(categories) {
  const normalized = categories.map((value) => normalizeKey(value).toLowerCase());

  const hasAny = (...values) => values.some((value) => normalized.includes(value.toLowerCase()));

  if (hasAny('tortas') && hasAny('jantar', 'almoço', 'legumes', 'frango', 'carnes', 'peixes')) {
    return 'Prato Principal';
  }

  if (hasAny('tortas') && hasAny('chocolate', 'frutas', 'doces', 'sobremesas')) {
    return 'Sobremesa';
  }

  if (hasAny('massa folhada') && hasAny('frutas', 'sobremesas', 'doces')) {
    return 'Sobremesa';
  }

  if (hasAny('frango', 'carnes', 'peixes') && hasAny('jantar', 'almoço')) {
    return 'Prato Principal';
  }

  if (hasAny('donuts')) {
    return 'Sobremesa';
  }

  if (hasAny('chocolate') && hasAny('vegana', 'saudáveis', 'saudavel', 'páscoa', 'sazonais')) {
    return 'Sobremesa';
  }

  return null;
}

function resolvePrimaryConflict(candidates) {
  const key = [...candidates].sort().join(' + ');

  const exactRules = {
    'Acompanhamento + Molho': 'Molho',
    'Acompanhamento + Pão': 'Pão',
    'Acompanhamento + Salada': 'Salada',
    'Bebida + Sobremesa': 'Bebida',
    'Lanche + Petisco': 'Petisco',
    'Lanche + Pão + Sobremesa': 'Sobremesa',
    'Lanche + Prato Principal': 'Lanche',
    'Lanche + Sobremesa': 'Sobremesa',
    'Petisco + Sobremesa': 'Petisco',
    'Pão + Sobremesa': 'Pão',
    'Prato Principal + Sopa': 'Sopa',
    'Prato Principal + Salada': 'Salada',
    'Acompanhamento + Petisco': 'Petisco',
    'Acompanhamento + Prato Principal': 'Prato Principal',
    'Acompanhamento + Lanche + Petisco': 'Petisco',
    'Lanche + Petisco + Prato Principal': 'Petisco',
    'Lanche + Petisco + Sobremesa': 'Petisco',
    'Lanche + Prato Principal + Sobremesa': 'Lanche',
  };

  return exactRules[key] || null;
}

function refineSubcategories(out, originalCategories) {
  const normalized = originalCategories.map((value) => normalizeKey(value).toLowerCase());
  const hasAny = (...values) => values.some((value) => normalized.includes(value.toLowerCase()));

  if (!out.subCategory) {
    out.subCategory = [];
  }

  if (out.primaryCategory === 'Lanche' && hasAny('pizza', 'pizzas')) {
    out.subCategory = out.subCategory.filter((value) => value !== 'Massas');
    if (!out.subCategory.includes('Pizzas')) {
      out.subCategory.unshift('Pizzas');
    }
  }

  if (out.primaryCategory === 'Sobremesa' && hasAny('massa folhada')) {
    out.subCategory = out.subCategory.filter((value) => value !== 'Massa Folhada');
  }

  if (out.primaryCategory === 'Sobremesa' && out.subCategory.length === 0 && hasAny('frutas')) {
    out.subCategory.push('Frutas');
  }

  if (out.subCategory.length === 0) {
    delete out.subCategory;
  }
}

function migrateRecipe(recipe, report) {
  const out = { ...recipe };
  const categories = Array.isArray(recipe.categories) ? recipe.categories : [];

  // Inicializa campos novos
  out.primaryCategory = null;
  for (const f of MULTI_FIELDS) out[f] = [];

  const primaryCandidates = new Set();
  const unmapped = [];

  for (const raw of categories) {
    const key = normalizeKey(raw);
    const rule = CATEGORY_MAP[key];

    if (!rule) {
      unmapped.push(key);
      continue;
    }
    if (rule.ignore) continue;

    if (rule.field === 'primaryCategory') {
      primaryCandidates.add(rule.value);
      continue;
    }

    if (MULTI_FIELDS.has(rule.field)) {
      if (!out[rule.field].includes(rule.value)) {
        out[rule.field].push(rule.value);
      }
      if (rule.impliesPrimary) {
        primaryCandidates.add(rule.impliesPrimary);
      }
    }
  }

  // Resolve primaryCategory
  if (primaryCandidates.size === 1) {
    out.primaryCategory = [...primaryCandidates][0];
  } else if (primaryCandidates.size > 1) {
    const sorted = [...primaryCandidates].sort();
    const resolved = resolvePrimaryConflict(sorted);

    if (resolved) {
      out.primaryCategory = resolved;
      report.resolvedConflicts.push({
        id: identifyRecipe(recipe),
        candidates: sorted,
        resolvedByRule: resolved,
        originalCategories: categories,
      });
    } else {
      out.primaryCategory = null;
      report.conflicts.push({
        id: identifyRecipe(recipe),
        candidates: sorted,
        originalCategories: categories,
      });
    }
  } else {
    const inferred = inferPrimaryFromOriginalCategories(categories);

    if (inferred) {
      out.primaryCategory = inferred;
      report.resolvedConflicts.push({
        id: identifyRecipe(recipe),
        candidates: [],
        resolvedByRule: inferred,
        originalCategories: categories,
        inferredFromOriginalCategories: true,
      });
    } else {
      report.noPrimary.push({
        id: identifyRecipe(recipe),
        originalCategories: categories,
      });
    }
  }

  // Remove arrays vazios p/ JSON mais limpo
  for (const f of MULTI_FIELDS) {
    if (out[f].length === 0) delete out[f];
  }

  for (const u of unmapped) {
    report.unmapped[u] = (report.unmapped[u] || 0) + 1;
  }

  refineSubcategories(out, categories);

  return out;
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const positional = args.filter((a) => !a.startsWith('--'));
  const [input, output] = positional;

  if (!input || !output) {
    console.error(
      'Uso: node scripts/migrate-categories.mjs <entrada.json> <saida.json> [--dry-run]',
    );
    process.exit(1);
  }

  const raw = await fs.readFile(input, 'utf-8');
  const recipes = JSON.parse(raw);

  if (!Array.isArray(recipes)) {
    console.error('Entrada precisa ser um array de receitas.');
    process.exit(1);
  }

  const report = {
    total: recipes.length,
    noPrimary: [],
    conflicts: [],
    resolvedConflicts: [],
    unmapped: {},
  };

  const migrated = recipes.map((r) => migrateRecipe(r, report));

  // Resumo no stdout
  const line = '─'.repeat(60);
  console.log(line);
  console.log(`Total de receitas:                 ${report.total}`);
  console.log(`Sem primaryCategory resolvida:     ${report.noPrimary.length}`);
  console.log(`Conflitos pendentes:               ${report.conflicts.length}`);
  console.log(`Conflitos resolvidos por regra:    ${report.resolvedConflicts.length}`);
  console.log(
    `Termos não-mapeados (únicos):      ${Object.keys(report.unmapped).length}`,
  );
  console.log(line);

  if (Object.keys(report.unmapped).length > 0) {
    console.log('\nTop 20 termos não-mapeados (adicione ao CATEGORY_MAP):');
    Object.entries(report.unmapped)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .forEach(([term, count]) =>
        console.log(`  ${String(count).padStart(3)}×  ${term}`),
      );
  }

  if (report.noPrimary.length > 0) {
    console.log(
      `\n${report.noPrimary.length} receita(s) sem primaryCategory — veja .report.json.`,
    );
  }

  if (dryRun) {
    const outputAbs = path.resolve(output);
    const reportPath = outputAbs.replace(/\.json$/, '.report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf-8');
    console.log(`\n[dry-run] JSON migrado não foi escrito.`);
    console.log(`✓ ${reportPath}`);
    return;
  }

  const outputAbs = path.resolve(output);
  const reportPath = outputAbs.replace(/\.json$/, '.report.json');

  await fs.writeFile(outputAbs, JSON.stringify(migrated, null, 2), 'utf-8');
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf-8');

  console.log(`\n✓ ${outputAbs}`);
  console.log(`✓ ${reportPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
