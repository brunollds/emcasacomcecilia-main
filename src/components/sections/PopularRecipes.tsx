import Link from 'next/link';
import Image from 'next/image';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { ViewTransitionLink } from '@/components/ViewTransitionLink';
import { getRecipeImage, getRecipePrimaryCategory, recipes, type Recipe } from '@/lib/data';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { sanitizeViewTransitionName } from '@/lib/viewTransition';

// Faixa de receitas da home: 4 receitas e o total do site, contado dos dados.

const RECIPE_COUNT = 4;

// As mais vistas no GA, na ordem dele; se vierem menos de 4, as marcadas como populares completam.
export function selectPopularRecipes(allRecipes: Recipe[], popularSlugs: string[]): Recipe[] {
  const bySlug = new Map(allRecipes.map((recipe) => [recipe.slug, recipe]));
  const fromAnalytics = [...new Set(popularSlugs)].flatMap((slug) => bySlug.get(slug) ?? []);
  const curated = allRecipes.filter((recipe) => recipe.isPopular && !fromAnalytics.includes(recipe));

  return [...fromAnalytics, ...curated].slice(0, RECIPE_COUNT);
}

type PopularRecipesProps = {
  popularSlugs?: string[];
};

export function PopularRecipes({ popularSlugs = [] }: PopularRecipesProps) {
  const popularRecipes = selectPopularRecipes(recipes, popularSlugs);

  return (
    <section aria-labelledby="titulo-receitas" className="pb-8 md:pb-10">
      <div className="mx-auto w-full max-w-[1200px] md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3.5 border-y-2 border-marinho bg-amarelo-cupom px-4 py-5 text-marinho md:gap-y-5 md:rounded-[14px] md:border-2 md:px-8 md:py-7">
          <div className="flex min-w-0 basis-full flex-col gap-2 md:basis-auto md:flex-1">
            <h2
              id="titulo-receitas"
              className="font-condensada text-[28px] leading-none font-black font-stretch-extra-condensed md:text-[44px]"
            >
              Receitas da Cecília
            </h2>
            <p className="max-w-[60ch] text-sm leading-5 font-medium md:text-[15px] md:leading-[22px]">
              Bolos, doces, air fryer e o almoço de todo dia. {recipes.length} receitas prontas para fazer.
            </p>
          </div>
          {/* No celular o link vai para baixo das receitas; no desktop, ao lado do título. */}
          <Link
            href="/receitas"
            className={`order-last flex min-h-12 basis-full items-center justify-center rounded-[10px] border-2 border-marinho bg-white px-7 text-sm font-extrabold hover:bg-marinho hover:text-white motion-safe:transition-colors md:order-none md:basis-auto md:text-[15px] ${FOCUS_RING}`}
          >
            Ver todas as receitas
          </Link>
          <ul className="grid basis-full grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
            {popularRecipes.map((recipe, index) => (
              <li
                key={recipe.id}
                className="flex motion-safe:animate-[slide-up_0.5s_ease-out_backwards]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <RecipeCard recipe={recipe} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <ViewTransitionLink
      href={`/receitas/${recipe.slug}`}
      className={`group flex flex-1 flex-col overflow-hidden rounded-[10px] border-2 border-marinho bg-white text-marinho motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 ${FOCUS_RING}`}
    >
      {/* O mesmo nome da foto no topo da receita: o navegador leva a imagem do card até lá. */}
      <span
        className="relative block aspect-[4/3] overflow-hidden border-b-2 border-marinho bg-creme"
        style={{ viewTransitionName: `recipe-hero-${sanitizeViewTransitionName(recipe.slug)}` }}
      >
        <Image
          src={resolveMediaUrl(getRecipeImage(recipe))}
          alt=""
          fill
          sizes="(min-width: 1200px) 265px, (min-width: 768px) 25vw, 50vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
        />
      </span>
      <span className="flex flex-col gap-1 px-2.5 pt-2 pb-2.5 md:px-3 md:pt-2.5 md:pb-3">
        <span className="text-xs font-bold text-marinho-suave">{getRecipePrimaryCategory(recipe)}</span>
        <span className="text-[13px] leading-[1.3] font-extrabold md:text-[15px]">{recipe.title}</span>
      </span>
    </ViewTransitionLink>
  );
}
