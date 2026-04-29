import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCategorySlug, getRecipeCuisine, getRecipeImage, getRecipeImageAlt, getRecipePrimaryCategory, recipes } from '@/lib/data';
import { Clock, ChefHat, Users, Utensils, Lightbulb, PlayCircle, ArrowLeft, Flame } from 'lucide-react';
import RecipeViewTracker from '@/components/RecipeViewTracker';
import CopyLinkButton from '@/components/CopyLinkButton';

function getYoutubeEmbedUrl(url) {
  if (!url) return null;
  const watchMatch = url.match(/youtube\.com\/watch\?v=([\w-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  return null;
}

// Função auxiliar para converter tempo legível (ex: '15 min', '1h 20 min') para ISO 8601 (ex: 'PT15M', 'PT1H20M')
function convertToISO8601(timeStr) {
  if (!timeStr) return undefined;
  const hoursMatch = timeStr.match(/(\d+)\s*h/);
  const minutesMatch = timeStr.match(/(\d+)\s*min/);
  
  let iso = 'PT';
  if (hoursMatch) iso += `${hoursMatch[1]}H`;
  if (minutesMatch) iso += `${minutesMatch[1]}M`;
  
  return iso === 'PT' ? undefined : iso;
}

function getRecipeTaxonomyChips(recipe) {
  const chips = [];

  if (recipe.primaryCategory) {
    chips.push({
      key: `tipo-${recipe.primaryCategory}`,
      label: recipe.primaryCategory,
      href: `/receitas?tipo=${getCategorySlug(recipe.primaryCategory)}`,
      primary: true,
    });
  }

  (recipe.subCategory || []).forEach((label) => {
    chips.push({
      key: `sub-${label}`,
      label,
      href: `/receitas?sub=${getCategorySlug(label)}`,
    });
  });

  (recipe.cuisine || []).forEach((label) => {
    chips.push({
      key: `cozinha-${label}`,
      label,
      href: `/receitas?cozinha=${getCategorySlug(label)}`,
    });
  });

  (recipe.method || []).forEach((label) => {
    chips.push({
      key: `metodo-${label}`,
      label,
      href: `/receitas?metodo=${getCategorySlug(label)}`,
    });
  });

  (recipe.diet || []).forEach((label) => {
    chips.push({
      key: `dieta-${label}`,
      label,
      href: `/receitas?dieta=${getCategorySlug(label)}`,
    });
  });

  (recipe.keyIngredients || []).forEach((label) => {
    chips.push({
      key: `ingrediente-${label}`,
      label,
      href: `/receitas?ingrediente=${getCategorySlug(label)}`,
    });
  });

  (recipe.collections || []).forEach((label) => {
    chips.push({
      key: `colecao-${label}`,
      label,
      href: `/receitas?colecao=${getCategorySlug(label)}`,
    });
  });

  return chips
    .filter((chip, index, list) => list.findIndex((candidate) => candidate.key === chip.key) === index)
    .slice(0, 7);
}

// SEO Dinâmico
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) return { title: 'Receita não encontrada' };
  const recipeImage = getRecipeImage(recipe);
  const baseUrl = 'https://emcasacomcecilia.com';
  const url = `${baseUrl}/receitas/${recipe.slug}`;

  return {
    title: `${recipe.title} - Em Casa com Cecília`,
    description: recipe.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      url: url,
      type: 'article',
      images: [
        {
          url: recipeImage,
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.title,
      description: recipe.description,
      images: [recipeImage],
    },
  };
}

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) {
    notFound();
  }

  const recipeImage = getRecipeImage(recipe);
  const recipeImageAlt = getRecipeImageAlt(recipe);
  const baseUrl = 'https://emcasacomcecilia.com';
  const taxonomyChips = getRecipeTaxonomyChips(recipe);
  const youtubeEmbedUrl = getYoutubeEmbedUrl(recipe.youtubeUrl);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Receitas', item: `${baseUrl}/receitas` },
      { '@type': 'ListItem', position: 3, name: recipe.title, item: `${baseUrl}/receitas/${recipe.slug}` },
    ],
  };

  // JSON-LD para Google Recipes
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: recipe.title,
    image: [`${baseUrl}${recipeImage}`],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/receitas/${recipe.slug}`,
    },
    author: {
      '@type': 'Person',
      name: 'Cecília',
    },
    description: recipe.description,
    prepTime: convertToISO8601(recipe.prepTime),
    cookTime: convertToISO8601(recipe.cookTime),
    totalTime: convertToISO8601(recipe.totalTime),
    recipeYield: recipe.yield,
    recipeCategory: getRecipePrimaryCategory(recipe),
    recipeCuisine: getRecipeCuisine(recipe) || 'Brasileira',
    keywords: recipe.searchTerms?.join(', '),
    recipeIngredient: recipe.ingredients.flatMap(section => section.items),
    recipeInstructions: recipe.instructions.map((step, index) => ({
      '@type': 'HowToStep',
      name: `Passo ${index + 1}`,
      text: step,
      url: `${baseUrl}/receitas/${recipe.slug}#step-${index + 1}`,
    })),
  };

  return (
    <article className="min-h-screen bg-[#fef9f3] pb-20">
      <RecipeViewTracker recipe={recipe} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link href="/receitas" className="flex items-center gap-2 text-sm font-semibold text-[#1a4d2e] hover:text-[#ff6b35] transition-colors">
            <ArrowLeft size={18} />
            <span>Voltar</span>
          </Link>
          <a href="#recipe-card" className="bg-[#1a4d2e] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#ff6b35] transition-all">
            Ir para a Receita
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-12">
        {/* Header */}
        <header className="text-center mb-12">
          {taxonomyChips.length > 0 && (
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2.5">
              {taxonomyChips.map((chip) => (
                <Link
                  key={chip.key}
                  href={chip.href}
                  className={`inline-flex rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                    chip.primary
                      ? 'bg-[#ff6b35]/10 text-[#ff6b35] hover:-translate-y-0.5 hover:bg-[#ff6b35] hover:text-white hover:shadow-sm'
                      : 'border border-[#0f1419]/10 bg-white text-[#4f5a65] hover:-translate-y-0.5 hover:border-[#1a4d2e]/25 hover:bg-[#1a4d2e]/4 hover:text-[#1a4d2e] hover:shadow-sm'
                  }`}
                >
                  {chip.label}
                </Link>
              ))}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f1419] mb-6 leading-tight">
            {recipe.title}
          </h1>
          <p className="text-lg text-gray-600 italic max-w-2xl mx-auto leading-relaxed">
            &quot;{recipe.description}&quot;
          </p>
        </header>

        <section className="mb-12">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/5">
            <Image
              src={recipeImage}
              alt={recipeImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        </section>

        {/* Video Section (apenas se houver URL de vídeo específico) */}
        {youtubeEmbedUrl && (
          <section className="mb-16">
            <div className="aspect-video bg-gray-200 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <iframe
                src={youtubeEmbedUrl}
                title={recipe.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <p className="mt-4 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
              <PlayCircle size={16} className="text-[#ff6b35]" />
              Assista ao passo a passo detalhado no YouTube
            </p>
          </section>
        )}

        {(recipe.intro || recipe.context) && (
          <section className="mb-16">
            <div className="rounded-[2rem] border border-[#0f1419]/8 bg-white/90 p-7 shadow-sm md:p-10">
              <div className="mx-auto max-w-3xl space-y-8">
                {recipe.intro && (
                  <div className="space-y-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff6b35]">
                      Introdução
                    </p>
                    <p className="text-lg leading-8 text-[#24313d] md:text-[1.15rem]">
                    {recipe.intro}
                    </p>
                  </div>
                )}
                {recipe.context && (
                  <div className="space-y-3 border-t border-black/6 pt-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a4d2e]">
                      Curiosidade
                    </p>
                    <p className="text-base leading-8 text-gray-600 md:text-[1.05rem]">
                      {recipe.context}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Recipe Card (Onde a mágica acontece) */}
        <div id="recipe-card" className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-[#1a4d2e] p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Utensils className="text-[#ffd700]" />
              Ficha Técnica
            </h2>
            
            <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
              <div className="flex flex-col gap-1">
                <span className="text-white/60 text-xs uppercase font-bold tracking-widest flex items-center gap-1.5">
                  <Clock size={14} /> Preparo
                </span>
                <span className="text-xl font-semibold">{recipe.prepTime}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/60 text-xs uppercase font-bold tracking-widest flex items-center gap-1.5">
                  <Utensils size={14} /> Fogo/Forno
                </span>
                <span className="text-xl font-semibold">{recipe.cookTime}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/60 text-xs uppercase font-bold tracking-widest flex items-center gap-1.5">
                  <Users size={14} /> Rendimento
                </span>
                <span className="text-xl font-semibold">{recipe.yield}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/60 text-xs uppercase font-bold tracking-widest flex items-center gap-1.5">
                  <ChefHat size={14} /> Nível
                </span>
                <span className="text-xl font-semibold">{recipe.difficulty}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/60 text-xs uppercase font-bold tracking-widest flex items-center gap-1.5">
                  <Flame size={14} /> Calorias
                </span>
                <span className="text-xl font-semibold">{recipe.calories || 'Em breve'}</span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 grid md:grid-cols-12 gap-12">
            {/* Ingredientes */}
            <div className="md:col-span-5">
              <h3 className="text-2xl font-bold text-[#1a4d2e] mb-6 pb-2 border-b-2 border-[#ffd700] inline-block">
                Ingredientes
              </h3>
              {recipe.ingredients.map((section, idx) => (
                <div key={idx} className="mb-8 last:mb-0">
                  <h4 className="font-bold text-[#ff6b35] text-sm uppercase tracking-wider mb-4">
                    {section.section}
                  </h4>
                  <ul className="space-y-4">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 group">
                        <input type="checkbox" className="mt-1.5 h-4 w-4 rounded border-gray-300 text-[#1a4d2e] focus:ring-[#1a4d2e]" />
                        <span className="text-gray-700 leading-tight group-hover:text-black transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Modo de Preparo */}
            <div className="md:col-span-7">
              <h3 className="text-2xl font-bold text-[#1a4d2e] mb-6 pb-2 border-b-2 border-[#ffd700] inline-block">
                Modo de Preparo
              </h3>
              <ol className="space-y-8">
                {recipe.instructions.map((step, i) => (
                  <li key={i} id={`step-${i + 1}`} className="relative pl-12">
                    <span className="absolute left-0 top-0 w-8 h-8 bg-[#f5f5f5] text-[#1a4d2e] rounded-full flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed pt-1">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>

              {/* Dicas Extras */}
              {recipe.tips && recipe.tips.length > 0 && (
                <div className="mt-12 bg-[#fef9f3] rounded-2xl p-6 border-l-4 border-[#ffd700]">
                  <h4 className="flex items-center gap-2 font-bold text-[#1a4d2e] mb-3">
                    <Lightbulb size={20} className="text-[#ff6b35]" />
                    Dicas da Cecília
                  </h4>
                  <ul className="space-y-2">
                    {recipe.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span>•</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Social Share / CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">Gostou dessa receita? Compartilhe com os amigos!</p>
          <div className="flex justify-center gap-4">
            <CopyLinkButton />
            <Link href="/contato" className="inline-flex items-center px-6 py-2 rounded-full bg-[#ff6b35] text-white text-sm font-bold hover:bg-[#ff5722] transition-all shadow-md">
              Sugerir uma Receita
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}
