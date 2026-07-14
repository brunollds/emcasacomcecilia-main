'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { sanitizeViewTransitionName } from '@/lib/viewTransition';
import { ArrowRight, ChefHat, ChevronDown, Clock, Leaf, SlidersHorizontal, X } from 'lucide-react';
import {
  COLLECTIONS,
  CUISINES,
  DIETS,
  KEY_INGREDIENTS,
  MEAL_TIMES,
  METHODS,
  PRIMARY_CATEGORIES,
  SUBCATEGORY_MAP,
} from '@/constants/taxonomia';
import {
  getRecipeAllCategoryLabels,
  getRecipeImage,
  getRecipeImageAlt,
  getRecipePrimaryCategory,
  recipes,
} from '@/lib/data';

const INITIAL_VISIBLE_RECIPES = 16;
const LOAD_MORE_RECIPES = 12;
const MOBILE_FACET_PREVIEW_COUNT = 2;
const DESKTOP_FACET_PREVIEW_COUNT = 3;

const slugify = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/&/g, 'e')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const parseMultiValue = (value) => (value ? value.split(',').filter(Boolean) : []);

const getTimeInMinutes = (value) => {
  if (!value) return Number.POSITIVE_INFINITY;

  const hoursMatch = value.match(/(\d+)\s*h/);
  const minutesMatch = value.match(/(\d+)\s*min/);

  const hours = hoursMatch ? Number(hoursMatch[1]) * 60 : 0;
  const minutes = minutesMatch ? Number(minutesMatch[1]) : 0;

  return hours + minutes;
};

const ordenacaoOptions = [
  { value: 'populares', label: 'Mais populares' },
  { value: 'novas', label: 'Mais novas' },
  { value: 'rapidas', label: 'Mais rápidas' },
  { value: 'az', label: 'A-Z' },
];

const tempoOptions = [
  { value: 'todos', label: 'Qualquer tempo' },
  { value: 'ate-30', label: 'Até 30 min' },
  { value: '31-60', label: '31 a 60 min' },
  { value: 'mais-60', label: 'Mais de 1h' },
];

const dificuldadeOptions = ['Todas', 'Fácil', 'Médio', 'Difícil'];

const getAvailableLabels = (labels, extractor) => labels
  .filter((label) => recipes.some((recipe) => extractor(recipe)?.includes?.(label) || extractor(recipe) === label))
  .map((label) => ({ label, slug: slugify(label) }))
  .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));

const typeOptions = getAvailableLabels(PRIMARY_CATEGORIES, (recipe) => recipe.primaryCategory);
const cuisineOptions = getAvailableLabels(CUISINES, (recipe) => recipe.cuisine || []);
const methodOptions = getAvailableLabels(METHODS, (recipe) => recipe.method || []);
const dietOptions = getAvailableLabels(DIETS, (recipe) => recipe.diet || []);
const ingredientOptions = getAvailableLabels(KEY_INGREDIENTS, (recipe) => recipe.keyIngredients || []);
const collectionOptions = getAvailableLabels(COLLECTIONS, (recipe) => recipe.collections || []);
const mealTimeOptions = getAvailableLabels(MEAL_TIMES, (recipe) => recipe.mealTime || []);
const allSubcategoryOptions = Array.from(new Set(Object.values(SUBCATEGORY_MAP).flat()))
  .map((label) => ({ label, slug: slugify(label) }))
  .filter((option) => recipes.some((recipe) => recipe.subCategory?.includes(option.label)))
  .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));

const optionMaps = {
  tipo: new Map(typeOptions.map((option) => [option.slug, option.label])),
  sub: new Map(allSubcategoryOptions.map((option) => [option.slug, option.label])),
  cozinha: new Map(cuisineOptions.map((option) => [option.slug, option.label])),
  metodo: new Map(methodOptions.map((option) => [option.slug, option.label])),
  dieta: new Map(dietOptions.map((option) => [option.slug, option.label])),
  ingrediente: new Map(ingredientOptions.map((option) => [option.slug, option.label])),
  colecao: new Map(collectionOptions.map((option) => [option.slug, option.label])),
  momento: new Map(mealTimeOptions.map((option) => [option.slug, option.label])),
};

function decodeSelectedLabels(values, map) {
  return values.map((value) => map.get(value)).filter(Boolean);
}

function recipeMatchesFacet(recipe, facetKey, label) {
  if (facetKey === 'tipo') return recipe.primaryCategory === label;
  if (facetKey === 'sub') return recipe.subCategory?.includes(label);
  if (facetKey === 'cozinha') return recipe.cuisine?.includes(label);
  if (facetKey === 'metodo') return recipe.method?.includes(label);
  if (facetKey === 'dieta') return recipe.diet?.includes(label);
  if (facetKey === 'ingrediente') return recipe.keyIngredients?.includes(label);
  if (facetKey === 'colecao') return recipe.collections?.includes(label);
  if (facetKey === 'momento') return recipe.mealTime?.includes(label);
  return false;
}

function FacetSection({
  title,
  options,
  selectedValues,
  counts,
  onToggle,
  scrollable = false,
  isExpanded,
  onToggleExpanded,
  previewCount = DESKTOP_FACET_PREVIEW_COUNT,
}) {
  const shouldTruncate = options.length > previewCount;
  const primaryOptions = shouldTruncate ? options.slice(0, previewCount) : options;
  const extraOptions = shouldTruncate ? options.slice(previewCount) : [];

  if (!options.length) return null;

  return (
    <section className="border-t border-black/8 pt-4 first:border-t-0 first:pt-0">
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#0f1419]">
          {title}
        </h3>
      </div>
      <div className={`space-y-2 ${scrollable && isExpanded ? 'max-h-60 overflow-y-auto pr-1' : ''}`}>
          {primaryOptions.map((option) => {
            const isChecked = selectedValues.includes(option.slug);
            const count = counts[option.slug] || 0;
            const isDisabled = count === 0 && !isChecked;

            return (
              <label
                key={option.slug}
                className={`flex items-center justify-between gap-2.5 rounded-xl border px-2.5 py-2 transition-all ${
                  isDisabled
                    ? 'cursor-not-allowed border-transparent bg-[#f2eee7] opacity-45'
                    : 'cursor-pointer'
                } ${
                isChecked
                  ? 'border-[#1a4d2e]/25 bg-[#1a4d2e]/6'
                  : 'border-transparent bg-[#f8f4ed] hover:border-[#ff6b35]/20 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => onToggle(option.slug)}
                    className="h-3.5 w-3.5 rounded border-black/20 text-[#1a4d2e] focus:ring-[#1a4d2e]"
                  />
                  <span className="text-[13px] font-medium leading-tight text-[#0f1419]">{option.label}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">
                  {count}
                </span>
              </label>
            );
          })}

        {shouldTruncate && (
          <div className={`grid transition-all duration-300 ease-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <div className="space-y-2">
                {extraOptions.map((option) => {
                  const isChecked = selectedValues.includes(option.slug);
                  const count = counts[option.slug] || 0;
                  const isDisabled = count === 0 && !isChecked;

                  return (
                    <label
                      key={option.slug}
                      className={`flex items-center justify-between gap-2.5 rounded-xl border px-2.5 py-2 transition-all ${
                        isDisabled
                          ? 'cursor-not-allowed border-transparent bg-[#f2eee7] opacity-45'
                          : 'cursor-pointer'
                      } ${
                        isChecked
                          ? 'border-[#1a4d2e]/25 bg-[#1a4d2e]/6'
                          : 'border-transparent bg-[#f8f4ed] hover:border-[#ff6b35]/20 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={isDisabled}
                          onChange={() => onToggle(option.slug)}
                          className="h-3.5 w-3.5 rounded border-black/20 text-[#1a4d2e] focus:ring-[#1a4d2e]"
                        />
                        <span className="text-[13px] font-medium leading-tight text-[#0f1419]">{option.label}</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">
                        {count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      {shouldTruncate && (
        <div className="mt-3">
          <button
            type="button"
            onClick={onToggleExpanded}
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500 transition-colors hover:text-[#ff6b35]"
          >
            {isExpanded ? 'Ver menos' : `Ver mais (${options.length - previewCount})`}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </section>
  );
}

function SingleChoiceSection({ title, options, activeValue, onChange, counts = null }) {
  return (
    <section className="border-t border-black/8 pt-4 first:border-t-0 first:pt-0">
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#0f1419]">
          {title}
        </h3>
      </div>
      <div className="space-y-2">
          {options.map((option) => {
            const value = option.value || option;
            const label = option.label || option;
            const isActive = activeValue === value;
            const isDisabled = counts ? ((counts[value] || 0) === 0 && !isActive) : false;

            return (
              <label
                key={value}
                className={`flex items-center justify-between gap-2.5 rounded-xl border px-2.5 py-2 transition-all ${
                  isDisabled
                    ? 'cursor-not-allowed border-transparent bg-[#f2eee7] opacity-45'
                    : 'cursor-pointer'
                } ${
                  isActive
                    ? 'border-[#ff6b35]/25 bg-[#ff6b35]/6'
                    : 'border-transparent bg-[#f8f4ed] hover:border-[#ff6b35]/20 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name={title}
                  checked={isActive}
                  disabled={isDisabled}
                  onChange={() => onChange(value)}
                  className="h-3.5 w-3.5 border-black/20 text-[#ff6b35] focus:ring-[#ff6b35]"
                />
                  <span className="text-[13px] font-medium leading-tight text-[#0f1419]">{label}</span>
                </div>
              </label>
            );
          })}
      </div>
    </section>
  );
}

function RecipeResultsGrid({ items }) {
  const [visibleRecipes, setVisibleRecipes] = useState(INITIAL_VISIBLE_RECIPES);
  const visibleFilteredRecipes = items.slice(0, visibleRecipes);
  const hasMoreRecipes = items.length > visibleFilteredRecipes.length;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
        {visibleFilteredRecipes.map((receita, index) => (
          <Link
            key={receita.id}
            href={`/receitas/${receita.slug}`}
            className="group block animate-slide-up"
            style={{ animationDelay: `${(index % 6) * 0.05}s` }}
          >
            <article className="transition-all duration-500 group-hover:-translate-y-2">
              <div
                className="relative mb-4 aspect-[5/6] overflow-hidden rounded-[2rem] shadow-soft transition-all duration-500 group-hover:shadow-large"
                style={{ viewTransitionName: `recipe-hero-${sanitizeViewTransitionName(receita.slug)}` }}
              >
                <Image
                  src={getRecipeImage(receita)}
                  alt={getRecipeImageAlt(receita)}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />

                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                <div className="absolute left-4 top-4">
                  <span className="inline-flex rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1a4d2e] shadow-md">
                    {getRecipePrimaryCategory(receita)}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#ffd700]" />
                    {receita.totalTime}
                  </div>
                  <div className="h-3 w-px bg-white/30" />
                  <div className="flex items-center gap-1.5">
                    <ChefHat className="h-3.5 w-3.5 text-[#ff6b35]" />
                    {receita.difficulty}
                  </div>
                </div>
              </div>

              <div className="px-2">
                <h3 className="font-heading text-lg font-bold leading-tight text-[#0f1419] transition-colors duration-300 group-hover:text-[#1a4d2e] md:text-xl">
                  {receita.title}
                </h3>
                <div className="mt-2 h-0.5 w-0 bg-[#ff6b35] transition-all duration-500 group-hover:w-12" />
              </div>
            </article>
          </Link>
        ))}
      </div>

      {hasMoreRecipes && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleRecipes((current) => current + LOAD_MORE_RECIPES)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#1a4d2e] px-8 py-4 font-semibold text-[#1a4d2e] transition-all hover:bg-[#1a4d2e] hover:text-white"
          >
            Carregar mais receitas
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
}

export default function ReceitasClientPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categoriaAtiva = searchParams.get('categoria') || '';
  const tipoAtivo = parseMultiValue(searchParams.get('tipo'));
  const subAtiva = parseMultiValue(searchParams.get('sub'));
  const cozinhaAtiva = parseMultiValue(searchParams.get('cozinha'));
  const metodoAtivo = parseMultiValue(searchParams.get('metodo'));
  const dietaAtiva = parseMultiValue(searchParams.get('dieta'));
  const ingredienteAtivo = parseMultiValue(searchParams.get('ingrediente'));
  const colecaoAtiva = parseMultiValue(searchParams.get('colecao'));
  const momentoAtivo = parseMultiValue(searchParams.get('momento'));
  const dificuldadeAtiva = searchParams.get('dificuldade') || 'Todas';
  const tempoAtivo = searchParams.get('tempo') || 'todos';
  const ordemAtiva = searchParams.get('ordem') || 'populares';
  const queryAtiva = (searchParams.get('q') || '').trim();

  const selectedTypeLabels = decodeSelectedLabels(tipoAtivo, optionMaps.tipo);
  const selectedSubLabels = decodeSelectedLabels(subAtiva, optionMaps.sub);
  const selectedCuisineLabels = decodeSelectedLabels(cozinhaAtiva, optionMaps.cozinha);
  const selectedMethodLabels = decodeSelectedLabels(metodoAtivo, optionMaps.metodo);
  const selectedDietLabels = decodeSelectedLabels(dietaAtiva, optionMaps.dieta);
  const selectedIngredientLabels = decodeSelectedLabels(ingredienteAtivo, optionMaps.ingrediente);
  const selectedCollectionLabels = decodeSelectedLabels(colecaoAtiva, optionMaps.colecao);
  const selectedMealTimeLabels = decodeSelectedLabels(momentoAtivo, optionMaps.momento);
  const [expandedSections, setExpandedSections] = useState(() => ({
    tipo: false,
    sub: subAtiva.length > 0,
    momento: momentoAtivo.length > 0,
    cozinha: false,
    metodo: false,
    dieta: dietaAtiva.length > 0,
    ingrediente: ingredienteAtivo.length > 0,
    colecao: colecaoAtiva.length > 0,
  }));

  const availableSubcategoryOptions = !selectedTypeLabels.length
    ? []
    : Array.from(
      new Set(selectedTypeLabels.flatMap((label) => SUBCATEGORY_MAP[label] || [])),
    )
      .map((label) => ({ label, slug: slugify(label) }))
      .filter((option) => recipes.some((recipe) => recipe.subCategory?.includes(option.label)))
      .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));

  const filtersState = {
    categoriaAtiva,
    selectedTypeLabels,
    selectedSubLabels,
    selectedCuisineLabels,
    selectedMethodLabels,
    selectedDietLabels,
    selectedIngredientLabels,
    selectedCollectionLabels,
    selectedMealTimeLabels,
    dificuldadeAtiva,
    tempoAtivo,
    queryAtiva,
  };

  const matchesRecipe = (recipe, excludeFacet = null) => {
    const recipeCategoryLabels = getRecipeAllCategoryLabels(recipe);
    const totalMinutes = getTimeInMinutes(recipe.totalTime);
    const normalizedQuery = filtersState.queryAtiva.toLowerCase();

    const searchableText = [
      recipe.title,
      recipe.description,
      ...recipeCategoryLabels,
      ...(recipe.searchTerms || []),
      ...(recipe.tags || []),
      ...recipe.ingredients.flatMap((section) => section.items),
    ]
      .join(' ')
      .toLowerCase();

    const checks = {
      categoria: !filtersState.categoriaAtiva
        || recipeCategoryLabels.some((category) => slugify(category) === filtersState.categoriaAtiva),
      tipo: !filtersState.selectedTypeLabels.length
        || filtersState.selectedTypeLabels.includes(recipe.primaryCategory),
      sub: !filtersState.selectedSubLabels.length
        || recipe.subCategory?.some((label) => filtersState.selectedSubLabels.includes(label)),
      cozinha: !filtersState.selectedCuisineLabels.length
        || recipe.cuisine?.some((label) => filtersState.selectedCuisineLabels.includes(label)),
      metodo: !filtersState.selectedMethodLabels.length
        || recipe.method?.some((label) => filtersState.selectedMethodLabels.includes(label)),
      dieta: !filtersState.selectedDietLabels.length
        || recipe.diet?.some((label) => filtersState.selectedDietLabels.includes(label)),
      ingrediente: !filtersState.selectedIngredientLabels.length
        || recipe.keyIngredients?.some((label) => filtersState.selectedIngredientLabels.includes(label)),
      colecao: !filtersState.selectedCollectionLabels.length
        || recipe.collections?.some((label) => filtersState.selectedCollectionLabels.includes(label)),
      momento: !filtersState.selectedMealTimeLabels.length
        || recipe.mealTime?.some((label) => filtersState.selectedMealTimeLabels.includes(label)),
      dificuldade: filtersState.dificuldadeAtiva === 'Todas'
        || recipe.difficulty === filtersState.dificuldadeAtiva,
      tempo: filtersState.tempoAtivo === 'todos'
        || (filtersState.tempoAtivo === 'ate-30' && totalMinutes <= 30)
        || (filtersState.tempoAtivo === '31-60' && totalMinutes > 30 && totalMinutes <= 60)
        || (filtersState.tempoAtivo === 'mais-60' && totalMinutes > 60),
      query: !normalizedQuery || searchableText.includes(normalizedQuery),
    };

    return Object.entries(checks).every(([key, value]) => key === excludeFacet || value);
  };

  const filteredRecipes = recipes.filter((recipe) => matchesRecipe(recipe));
  const receitasFiltradas = [...filteredRecipes].sort((a, b) => {
    if (ordemAtiva === 'novas') return b.id - a.id;
    if (ordemAtiva === 'rapidas') return getTimeInMinutes(a.totalTime) - getTimeInMinutes(b.totalTime);
    if (ordemAtiva === 'az') return a.title.localeCompare(b.title, 'pt-BR');

    const popularA = a.isPopular ? 1 : 0;
    const popularB = b.isPopular ? 1 : 0;
    if (popularA !== popularB) return popularB - popularA;
    return b.id - a.id;
  });

  const buildFacetCounts = (facetKey, options) => Object.fromEntries(
    options.map((option) => [
      option.slug,
      recipes.filter((recipe) => matchesRecipe(recipe, facetKey) && recipeMatchesFacet(recipe, facetKey, option.label)).length,
    ]),
  );

  const typeCounts = buildFacetCounts('tipo', typeOptions);
  const subCounts = buildFacetCounts('sub', availableSubcategoryOptions);
  const cuisineCounts = buildFacetCounts('cozinha', cuisineOptions);
  const methodCounts = buildFacetCounts('metodo', methodOptions);
  const dietCounts = buildFacetCounts('dieta', dietOptions);
  const ingredientCounts = buildFacetCounts('ingrediente', ingredientOptions);
  const collectionCounts = buildFacetCounts('colecao', collectionOptions);
  const mealTimeCounts = buildFacetCounts('momento', mealTimeOptions);

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value == null
        || value === ''
        || value === 'todos'
        || value === 'Todas'
        || value === 'populares'
      ) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  const toggleMultiValue = (key, activeValues, value) => {
    const nextValues = activeValues.includes(value)
      ? activeValues.filter((item) => item !== value)
      : [...activeValues, value];

    updateParams({ [key]: nextValues.length ? nextValues.join(',') : null });
  };

  const clearAllFilters = () => {
    router.replace(queryAtiva ? `${pathname}?q=${encodeURIComponent(queryAtiva)}` : pathname, { scroll: false });
  };

  const activeChips = [
    queryAtiva ? { key: 'q', label: `Busca: ${queryAtiva}`, onRemove: () => updateParams({ q: null }) } : null,
    categoriaAtiva ? {
      key: 'categoria',
      label: `Atalho: ${Array.from(new Set(recipes.flatMap((recipe) => getRecipeAllCategoryLabels(recipe)))).find((label) => slugify(label) === categoriaAtiva) || categoriaAtiva}`,
      onRemove: () => updateParams({ categoria: null }),
    } : null,
    ...tipoAtivo.map((value) => ({ key: `tipo-${value}`, label: optionMaps.tipo.get(value), onRemove: () => toggleMultiValue('tipo', tipoAtivo, value) })),
    ...subAtiva.map((value) => ({ key: `sub-${value}`, label: optionMaps.sub.get(value), onRemove: () => toggleMultiValue('sub', subAtiva, value) })),
    ...cozinhaAtiva.map((value) => ({ key: `cozinha-${value}`, label: optionMaps.cozinha.get(value), onRemove: () => toggleMultiValue('cozinha', cozinhaAtiva, value) })),
    ...metodoAtivo.map((value) => ({ key: `metodo-${value}`, label: optionMaps.metodo.get(value), onRemove: () => toggleMultiValue('metodo', metodoAtivo, value) })),
    ...dietaAtiva.map((value) => ({ key: `dieta-${value}`, label: optionMaps.dieta.get(value), onRemove: () => toggleMultiValue('dieta', dietaAtiva, value) })),
    ...ingredienteAtivo.map((value) => ({ key: `ingrediente-${value}`, label: optionMaps.ingrediente.get(value), onRemove: () => toggleMultiValue('ingrediente', ingredienteAtivo, value) })),
    ...colecaoAtiva.map((value) => ({ key: `colecao-${value}`, label: optionMaps.colecao.get(value), onRemove: () => toggleMultiValue('colecao', colecaoAtiva, value) })),
    ...momentoAtivo.map((value) => ({ key: `momento-${value}`, label: optionMaps.momento.get(value), onRemove: () => toggleMultiValue('momento', momentoAtivo, value) })),
    dificuldadeAtiva !== 'Todas' ? { key: 'dificuldade', label: `Dificuldade: ${dificuldadeAtiva}`, onRemove: () => updateParams({ dificuldade: null }) } : null,
    tempoAtivo !== 'todos' ? { key: 'tempo', label: `Tempo: ${tempoOptions.find((option) => option.value === tempoAtivo)?.label}`, onRemove: () => updateParams({ tempo: null }) } : null,
  ]
    .filter(Boolean)
    .filter((chip, index, chips) => chips.findIndex((candidate) => candidate.label === chip.label) === index);

  const filtersKey = searchParams.toString();
  const activeFiltersCount = activeChips.length;

  const toggleSection = (key) => {
    setExpandedSections((current) => ({ ...current, [key]: !current[key] }));
  };

  const renderFiltersContent = (previewCount) => (
    <div className="space-y-5">
      <FacetSection
        title="Tipo de prato"
        options={typeOptions}
        selectedValues={tipoAtivo}
        counts={typeCounts}
        onToggle={(value) => toggleMultiValue('tipo', tipoAtivo, value)}
        isExpanded={expandedSections.tipo}
        onToggleExpanded={() => toggleSection('tipo')}
        previewCount={previewCount}
      />

      {availableSubcategoryOptions.length > 0 && (
        <FacetSection
          title="Subcategoria"
          options={availableSubcategoryOptions}
          selectedValues={subAtiva}
          counts={subCounts}
          onToggle={(value) => toggleMultiValue('sub', subAtiva, value)}
          isExpanded={expandedSections.sub}
          onToggleExpanded={() => toggleSection('sub')}
          previewCount={previewCount}
        />
      )}

      <FacetSection
        title="Momento do dia"
        options={mealTimeOptions}
        selectedValues={momentoAtivo}
        counts={mealTimeCounts}
        onToggle={(value) => toggleMultiValue('momento', momentoAtivo, value)}
        isExpanded={expandedSections.momento}
        onToggleExpanded={() => toggleSection('momento')}
        previewCount={previewCount}
      />

      <FacetSection
        title="Cozinha"
        options={cuisineOptions}
        selectedValues={cozinhaAtiva}
        counts={cuisineCounts}
        onToggle={(value) => toggleMultiValue('cozinha', cozinhaAtiva, value)}
        isExpanded={expandedSections.cozinha}
        onToggleExpanded={() => toggleSection('cozinha')}
        previewCount={previewCount}
      />

      <FacetSection
        title="Método"
        options={methodOptions}
        selectedValues={metodoAtivo}
        counts={methodCounts}
        onToggle={(value) => toggleMultiValue('metodo', metodoAtivo, value)}
        isExpanded={expandedSections.metodo}
        onToggleExpanded={() => toggleSection('metodo')}
        previewCount={previewCount}
      />

      <FacetSection
        title="Estilo alimentar"
        options={dietOptions}
        selectedValues={dietaAtiva}
        counts={dietCounts}
        onToggle={(value) => toggleMultiValue('dieta', dietaAtiva, value)}
        isExpanded={expandedSections.dieta}
        onToggleExpanded={() => toggleSection('dieta')}
        previewCount={previewCount}
      />

      <FacetSection
        title="Ingrediente-chave"
        options={ingredientOptions}
        selectedValues={ingredienteAtivo}
        counts={ingredientCounts}
        onToggle={(value) => toggleMultiValue('ingrediente', ingredienteAtivo, value)}
        scrollable
        isExpanded={expandedSections.ingrediente}
        onToggleExpanded={() => toggleSection('ingrediente')}
        previewCount={previewCount}
      />

      <FacetSection
        title="Coleções"
        options={collectionOptions}
        selectedValues={colecaoAtiva}
        counts={collectionCounts}
        onToggle={(value) => toggleMultiValue('colecao', colecaoAtiva, value)}
        isExpanded={expandedSections.colecao}
        onToggleExpanded={() => toggleSection('colecao')}
        previewCount={previewCount}
      />

      <SingleChoiceSection
        title="Tempo total"
        options={tempoOptions}
        activeValue={tempoAtivo}
        counts={Object.fromEntries(tempoOptions.map((option) => [
          option.value,
          recipes.filter((recipe) => {
            if (!matchesRecipe(recipe, 'tempo')) return false;
            const totalMinutes = getTimeInMinutes(recipe.totalTime);
            return option.value === 'todos'
              || (option.value === 'ate-30' && totalMinutes <= 30)
              || (option.value === '31-60' && totalMinutes > 30 && totalMinutes <= 60)
              || (option.value === 'mais-60' && totalMinutes > 60);
          }).length,
        ]))}
        onChange={(value) => updateParams({ tempo: value })}
      />

      <SingleChoiceSection
        title="Dificuldade"
        options={dificuldadeOptions}
        activeValue={dificuldadeAtiva}
        counts={Object.fromEntries(dificuldadeOptions.map((option) => [
          option,
          recipes.filter((recipe) => matchesRecipe(recipe, 'dificuldade') && (option === 'Todas' || recipe.difficulty === option)).length,
        ]))}
        onChange={(value) => updateParams({ dificuldade: value })}
      />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fef9f3]">
      <section className="relative overflow-hidden border-b border-black/5 bg-[#0f1d3a] px-6 py-10 text-white md:py-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
          <div className="absolute left-[8%] top-[14%] text-white/6 animate-float-slow">
            <Leaf size={118} strokeWidth={1} />
          </div>
          <div className="absolute right-[10%] top-[22%] text-white/5 animate-float">
            <Leaf size={82} strokeWidth={1} className="rotate-12" />
          </div>
          <div className="absolute left-[18%] bottom-[8%] text-white/5 animate-float">
            <Leaf size={92} strokeWidth={0.9} className="-rotate-12" />
          </div>
          <div className="absolute bottom-[12%] right-[16%] text-white/6 animate-float-slow">
            <Leaf size={136} strokeWidth={0.85} className="rotate-45" />
          </div>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center animate-slide-up">
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              Receitas
            </h1>
          </div>
        </div>
      </section>

      <section className="px-6 py-8 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
            <button
              type="button"
              onClick={() => setShowMobileFilters((current) => !current)}
              className="inline-flex items-center gap-2 rounded-full border border-[#1a4d2e]/25 bg-[#1a4d2e] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#1a4d2e]/15 transition-all hover:bg-[#132247]"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showMobileFilters ? 'Fechar filtros' : 'Filtros'}
              {activeFiltersCount > 0 && (
                <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-[#ff6b35] px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown className={`h-4 w-4 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
            </button>

            <div className="min-w-[190px]">
              <select
                value={ordemAtiva}
                onChange={(event) => updateParams({ ordem: event.target.value })}
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-[#0f1419] outline-none transition-colors focus:border-[#ff6b35]"
              >
                {ordenacaoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {activeChips.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-3 lg:hidden">
              {activeChips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={chip.onRemove}
                  className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0f1419] transition-colors hover:border-[#ff6b35]/35 hover:text-[#ff6b35]"
                >
                  {chip.label}
                  <X className="h-3.5 w-3.5" />
                </button>
              ))}

              <button
                type="button"
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-transparent px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-gray-500 transition-colors hover:border-[#ff6b35]/35 hover:text-[#ff6b35]"
              >
                Limpar tudo
              </button>
            </div>
          )}

          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <button
                type="button"
                aria-label="Fechar filtros"
                className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
                onClick={() => setShowMobileFilters(false)}
              />

              <div className="absolute inset-x-0 bottom-0 max-h-[82vh] overflow-hidden rounded-t-[2rem] bg-[#fef9f3] shadow-2xl">
                <div className="flex items-center justify-center pt-3">
                  <div className="h-1.5 w-14 rounded-full bg-black/12" />
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-black/8 px-5 py-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ff6b35]">
                      Filtros
                    </p>
                    <h2 className="font-heading text-2xl font-bold text-[#0f1419]">
                      Refinar receitas
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowMobileFilters(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#0f1419] transition-colors hover:border-[#ff6b35]/35 hover:text-[#ff6b35]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="max-h-[calc(82vh-152px)] overflow-y-auto px-5 py-5">
                  {renderFiltersContent(MOBILE_FACET_PREVIEW_COUNT)}
                </div>

                <div className="border-t border-black/8 bg-white px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-3 text-sm font-semibold text-[#0f1419] transition-colors hover:border-[#ff6b35]/35 hover:text-[#ff6b35]"
                    >
                      Limpar tudo
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowMobileFilters(false)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#1a4d2e] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#132247]"
                    >
                      Ver {receitasFiltradas.length} receitas
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[224px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-[1.75rem] border border-black/8 bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#fef3eb] text-[#ff6b35]">
                    <SlidersHorizontal className="h-4 w-4" />
                  </div>
                  <h2 className="font-heading text-[1.65rem] font-bold text-[#0f1419]">
                    Filtros
                  </h2>
                </div>
                {renderFiltersContent(DESKTOP_FACET_PREVIEW_COUNT)}
              </div>
            </aside>

            <div className="min-w-0">
              {activeChips.length > 0 && (
                <div className="mb-6 hidden flex-wrap items-center gap-3 lg:flex">
                  {activeChips.map((chip) => (
                    <button
                      key={chip.key}
                      type="button"
                      onClick={chip.onRemove}
                      className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0f1419] transition-colors hover:border-[#ff6b35]/35 hover:text-[#ff6b35]"
                    >
                      {chip.label}
                      <X className="h-3.5 w-3.5" />
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="hidden items-center gap-2 rounded-full border border-black/8 bg-transparent px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-gray-500 transition-colors hover:border-[#ff6b35]/35 hover:text-[#ff6b35] lg:inline-flex"
                  >
                    Limpar tudo
                  </button>
                </div>
              )}

              <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="font-heading text-3xl font-bold text-[#0f1419]">
                    {receitasFiltradas.length} receitas encontradas
                  </h2>
                </div>

                <div className="hidden min-w-[210px] lg:block">
                  <select
                    value={ordemAtiva}
                    onChange={(event) => updateParams({ ordem: event.target.value })}
                    className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-[13px] font-medium text-[#0f1419] outline-none transition-colors focus:border-[#ff6b35]"
                  >
                    {ordenacaoOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {receitasFiltradas.length === 0 ? (
                <div className="rounded-[2rem] border border-dashed border-black/10 bg-white px-6 py-16 text-center shadow-sm">
                  <h3 className="font-heading text-2xl font-bold text-[#0f1419]">
                    Nenhuma receita encontrada com esses critérios
                  </h3>
                  <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                    Tente remover um filtro, mudar a dificuldade, ampliar o tempo ou voltar para todas as receitas.
                  </p>
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ff6b35] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1a4d2e]"
                  >
                    Ver todas as receitas
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <RecipeResultsGrid key={filtersKey} items={receitasFiltradas} />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
