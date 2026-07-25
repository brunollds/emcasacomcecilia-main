'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Leaf } from 'lucide-react';
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
import CategoryIcon from '@/components/ui/CategoryIcon';
import { getRecipeAllCategoryLabels, recipes } from '@/lib/data';
import { getCategoryIconSpec } from '@/lib/categoryIcons';

const slugify = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/&/g, 'e')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const getRecipeLabelSet = (recipe) => new Set(getRecipeAllCategoryLabels(recipe));

const countRecipesByLabel = (label) => (
  recipes.filter((recipe) => getRecipeLabelSet(recipe).has(label)).length
);

function getCategoryTheme(name) {
  if (PRIMARY_CATEGORIES.includes(name)) {
    return {
      card: 'bg-white',
      iconWrap: 'bg-[#fef3eb] text-[#ff6b35]',
      count: 'text-[#ff6b35]',
    };
  }

  if (CUISINES.includes(name)) {
    return {
      card: 'bg-[#f3f8f4]',
      iconWrap: 'bg-[#dcebdd] text-[#1a4d2e]',
      count: 'text-[#1a4d2e]',
    };
  }

  if (METHODS.includes(name)) {
    return {
      card: 'bg-[#fff7e8]',
      iconWrap: 'bg-[#ffe2ad] text-[#8b5e00]',
      count: 'text-[#8b5e00]',
    };
  }

  if (DIETS.includes(name)) {
    return {
      card: 'bg-[#eef8f6]',
      iconWrap: 'bg-[#d2ede7] text-[#146b5a]',
      count: 'text-[#146b5a]',
    };
  }

  if (COLLECTIONS.includes(name)) {
    return {
      card: 'bg-[#fff2f0]',
      iconWrap: 'bg-[#ffd8d1] text-[#c14a2d]',
      count: 'text-[#c14a2d]',
    };
  }

  if (KEY_INGREDIENTS.includes(name)) {
    return {
      card: 'bg-[#f7f4ee]',
      iconWrap: 'bg-[#e9dfcf] text-[#6e5630]',
      count: 'text-[#6e5630]',
    };
  }

  if (MEAL_TIMES.includes(name)) {
    return {
      card: 'bg-[#f4f6fb]',
      iconWrap: 'bg-[#dde4f3] text-[#37507d]',
      count: 'text-[#37507d]',
    };
  }

  return {
    card: 'bg-white',
    iconWrap: 'bg-[#f4f4f4] text-[#4b5563]',
    count: 'text-[#ff6b35]',
  };
}

const createItems = (labels, sortMode = 'count') => Array.from(new Set(labels))
  .map((label) => ({
    name: label,
    count: countRecipesByLabel(label),
    slug: slugify(label),
    iconSpec: getCategoryIconSpec(label),
  }))
  .filter((item) => item.count > 0)
  .sort((a, b) => (
    sortMode === 'alpha'
      ? a.name.localeCompare(b.name, 'pt-BR')
      : b.count - a.count || a.name.localeCompare(b.name, 'pt-BR')
  ));

const popularCategories = createItems([
  ...PRIMARY_CATEGORIES,
  ...CUISINES,
  ...METHODS,
  ...COLLECTIONS,
]).slice(0, 8);

const staticSections = [
  {
    title: 'Momento do dia',
    description: 'Descubra receitas para café da manhã, almoço, jantar, lanche da tarde e happy hour.',
    items: createItems(MEAL_TIMES, 'alpha'),
  },
  {
    title: 'Por cozinha',
    description: 'Receitas brasileiras, italianas, mexicanas, indianas e outras origens culinárias.',
    items: createItems(CUISINES, 'alpha'),
  },
  {
    title: 'Por método',
    description: 'Filtre por air fryer, forno, fogão, micro-ondas, fritura e outros modos de preparo.',
    items: createItems(METHODS, 'alpha'),
  },
  {
    title: 'Estilo alimentar',
    description: 'Uma forma rápida de encontrar receitas vegetarianas, veganas, sem glúten e afins.',
    items: createItems(DIETS, 'alpha'),
  },
  {
    title: 'Ingrediente-chave',
    description: 'Atalhos por ingrediente principal para quem já sabe o que quer cozinhar hoje.',
    items: createItems(KEY_INGREDIENTS, 'alpha'),
  },
  {
    title: 'Coleções',
    description: 'Seleções especiais para datas, ocasiões e receitas que combinam com cada momento.',
    items: createItems(COLLECTIONS, 'alpha'),
  },
].filter((section) => section.items.length > 0);

function CategoryCard({ item, large = false, compact = false }) {
  const theme = getCategoryTheme(item.name);

  return (
    <Link
      href={`/receitas?categoria=${item.slug}`}
      className={`group flex min-h-[132px] flex-col justify-between border border-[#0f1d3a]/10 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff6b35]/35 hover:shadow-lg sm:min-h-[142px] sm:p-4 md:min-h-[148px] md:p-4 ${
        large ? 'rounded-[1.25rem]' : compact ? 'rounded-[1.15rem]' : 'rounded-[1.25rem]'
      } ${theme.card}`}
    >
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 sm:h-[3.3rem] sm:w-[3.3rem] md:h-[3.9rem] md:w-[3.9rem] ${theme.iconWrap}`}>
        <CategoryIcon
          name={item.name}
          weight={compact ? 'regular' : 'duotone'}
          className="h-[1.35rem] w-[1.35rem] text-[1.25rem] sm:h-[1.45rem] sm:w-[1.45rem] sm:text-[1.3rem] md:h-[1.65rem] md:w-[1.65rem] md:text-[1.5rem]"
        />
      </div>
      <div className="min-w-0">
        <h3 className={`font-bold text-[#0f1419] transition-colors group-hover:text-[#1a4d2e] ${
          large ? 'text-[15px] md:text-[17px] xl:text-[1.15rem]' : compact ? 'text-[15px] md:text-[16px]' : 'text-[15px] md:text-[16px]'
        }`}>
          {item.name}
        </h3>
        <span className={`mt-2.5 block text-[11px] font-semibold uppercase tracking-[0.15em] md:text-[12px] md:tracking-[0.17em] ${theme.count}`}>
          {item.count} receitas
        </span>
      </div>
    </Link>
  );
}

function PrimaryCategorySelectorCard({ category, count, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col justify-between border text-left transition-all duration-300 ${
        isActive
          ? 'scale-[1.06] border-[#1a4d2e] bg-[#1a4d2e] text-white shadow-xl ring-2 ring-[#1a4d2e]/12'
          : 'scale-[0.93] border-[#0f1d3a]/8 bg-[#fcfcfb] text-[#0f1419]/82 shadow-sm hover:-translate-y-1 hover:scale-[0.97] hover:border-[#ff6b35]/35 hover:bg-white hover:text-[#0f1419] hover:shadow-lg'
      } min-h-[132px] origin-center rounded-[1.25rem] p-4 sm:min-h-[142px] md:min-h-[150px] md:p-5`}
    >
      <div className={`inline-flex items-center justify-center rounded-full transition-colors ${
        isActive
          ? 'h-[3.25rem] w-[3.25rem] bg-white/12 text-white sm:h-[3.75rem] sm:w-[3.75rem] md:h-[4.1rem] md:w-[4.1rem]'
          : 'h-[2.8rem] w-[2.8rem] bg-[#f3eee5] text-[#c97856] group-hover:bg-[#fff3e8] group-hover:text-[#ff6b35] sm:h-[3rem] sm:w-[3rem] md:h-[3.25rem] md:w-[3.25rem]'
      }`}>
        <CategoryIcon
          name={category}
          weight="fill"
          className={`${
            isActive ? 'h-[1.65rem] w-[1.65rem] text-[1.55rem] sm:h-[1.9rem] sm:w-[1.9rem] sm:text-[1.75rem] md:h-[2.1rem] md:w-[2.1rem] md:text-[1.95rem]' : 'h-[1.35rem] w-[1.35rem] text-[1.2rem] md:h-[1.55rem] md:w-[1.55rem] md:text-[1.45rem]'
          }`}
        />
      </div>

      <div className="min-w-0">
        <h3 className={`font-bold leading-tight ${
          isActive ? 'text-[17px] text-white md:text-[1.2rem]' : 'text-[15px] text-[#0f1419]/88 md:text-[16px]'
        }`}>
          {category}
        </h3>
        <p className={`mt-1.5 font-semibold uppercase ${
          isActive
            ? 'text-[12px] tracking-[0.17em] text-white/72 md:text-[13px]'
            : 'text-[11px] tracking-[0.15em] text-[#c97856] md:text-[12px] md:tracking-[0.17em]'
        }`}>
          {count} receitas
        </p>
      </div>
    </button>
  );
}

function SectionShell({ children, subtle = false }) {
  return (
    <section className={`rounded-[2rem] px-5 py-6 md:border md:border-[#0f1d3a]/8 md:px-7 md:py-8 md:shadow-sm ${
      subtle ? 'bg-transparent md:bg-[#fffaf4]' : 'bg-white'
    }`}
    >
      {children}
    </section>
  );
}

export default function CategoriasClientPage() {
  const availablePrimaryCategories = useMemo(
    () => PRIMARY_CATEGORIES.filter((label) => recipes.some((recipe) => recipe.primaryCategory === label)),
    [],
  );
  const [selectedPrimaryCategory, setSelectedPrimaryCategory] = useState(availablePrimaryCategories[0] || null);

  const selectedSubcategories = useMemo(() => {
    if (!selectedPrimaryCategory) return [];
    return createItems(SUBCATEGORY_MAP[selectedPrimaryCategory] || []);
  }, [selectedPrimaryCategory]);

  return (
    <main className="min-h-screen bg-[#fef9f3]">
      <section className="relative overflow-hidden bg-[#0f1d3a] px-6 py-12 text-white md:py-14">
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

        <div className="mx-auto max-w-5xl text-center animate-slide-up">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            Todas as categorias
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/72">
            Organizei as receitas por tipo de prato, subcategorias, momento do dia, cozinha, método, estilo alimentar, ingrediente-chave e coleções para facilitar a busca.
          </p>
        </div>
      </section>

      <section className="px-6 pt-8 pb-14 md:pt-10">
        <div className="mx-auto max-w-7xl animate-slide-up" style={{ animationDelay: '0.08s' }}>
          <SectionShell subtle>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-heading text-3xl font-bold text-[#0f1419]">
                  Categorias populares
                </h2>
              </div>
              <Link
                href="/receitas"
                className="hidden rounded-full border border-[#1a4d2e]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#1a4d2e] transition-all hover:border-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white md:inline-flex"
              >
                Ver todas as receitas
              </Link>
            </div>

            <div className="sm:hidden">
              <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {popularCategories.map((item) => (
                  <div key={item.slug} className="min-w-[40%] snap-start">
                    <CategoryCard item={item} large />
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden gap-4 sm:grid sm:grid-cols-3 xl:grid-cols-5">
              {popularCategories.map((item) => (
                <CategoryCard key={item.slug} item={item} large />
              ))}
            </div>
          </SectionShell>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl space-y-12">
          <SectionShell>
            <div className="mb-6 max-w-3xl">
              <h2 className="font-heading text-3xl font-bold text-[#0f1419]">
                Tipos de prato
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
                Escolha um tipo de prato para revelar só as subcategorias relevantes desse grupo.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
              {availablePrimaryCategories.map((category) => {
                const isActive = category === selectedPrimaryCategory;
                return (
                  <PrimaryCategorySelectorCard
                    key={category}
                    category={category}
                    count={countRecipesByLabel(category)}
                    isActive={isActive}
                    onClick={() => setSelectedPrimaryCategory(category)}
                  />
                );
              })}
            </div>

          {selectedPrimaryCategory && selectedSubcategories.length > 0 && (
            <>
              <div className="mt-10 mb-6 max-w-3xl">
                <h2 className="font-heading text-3xl font-bold text-[#0f1419]">
                  Subcategorias de {selectedPrimaryCategory}
                </h2>
              </div>

              <div className="sm:hidden">
                <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {selectedSubcategories.map((item) => (
                    <div key={`${selectedPrimaryCategory}-${item.slug}`} className="min-w-[40%] snap-start">
                      <CategoryCard item={item} compact />
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden gap-4 sm:grid sm:grid-cols-3 xl:grid-cols-5">
                {selectedSubcategories.map((item) => (
                  <CategoryCard key={`${selectedPrimaryCategory}-${item.slug}`} item={item} compact />
                ))}
              </div>
            </>
          )}
          </SectionShell>

          {staticSections.map((section) => (
            <SectionShell key={section.title}>
              <div className="mb-6 max-w-3xl">
                <h2 className="font-heading text-3xl font-bold text-[#0f1419]">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
                  {section.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
                {section.items.map((item) => (
                  <CategoryCard key={`${section.title}-${item.slug}`} item={item} />
                ))}
              </div>
            </SectionShell>
          ))}
        </div>
      </section>
    </main>
  );
}
