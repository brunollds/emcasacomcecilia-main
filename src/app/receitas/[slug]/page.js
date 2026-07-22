import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCategorySlug, getRecipeCuisine, getRecipeImage, getRecipeImageAlt, getRecipePrimaryCategory, recipes } from '@/lib/data';
import { Clock, ChefHat, Users, Utensils, Lightbulb, PlayCircle, ArrowLeft, Flame } from 'lucide-react';
import { buildSchemaAuthors, minutesToIsoDuration, normalizeRecipe } from '@/lib/content';
import { buildRecipeTemplateProps } from '@/lib/recipe-template-props';
import RecipeViewTracker from '@/components/RecipeViewTracker';
import CopyLinkButton from '@/components/CopyLinkButton';
import { EditorialReveal, PretextPullQuote, SectionHeadingReveal } from '@/components/editorial';
import { RecipeIngredients, RecipeInstructions, RecipeNotebookTemplate } from '@/components/recipe';

function getYoutubeVideoId(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, '');

    if (hostname === 'youtu.be') {
      return parsed.pathname.split('/').filter(Boolean)[0] || null;
    }

    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v');
      }

      const [type, id] = parsed.pathname.split('/').filter(Boolean);
      if (['embed', 'shorts', 'live'].includes(type)) {
        return id || null;
      }
    }
  } catch {
    return null;
  }

  return null;
}


function getYoutubeEmbedUrl(url) {
  const id = getYoutubeVideoId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

function getYoutubeWatchUrl(url) {
  const id = getYoutubeVideoId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : null;
}

function getAbsoluteUrl(url, baseUrl) {
  if (!url) return null;

  try {
    return new URL(url, baseUrl).toString();
  } catch {
    return null;
  }
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

  const viewModel = normalizeRecipe(recipe);
  const {
    recipe: canonical,
    totalMinutes,
    displayIngredients,
    displayInstructions,
    hasServingsControl,
    schemaIngredients,
    schemaInstructions,
    schemaIsoDuration,
  } = viewModel;

  const recipeImage = getRecipeImage(recipe);
  const recipeImageAlt = getRecipeImageAlt(recipe);
  const baseUrl = 'https://emcasacomcecilia.com';
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

  const youtubeVideoId = getYoutubeVideoId(recipe.youtubeUrl);
  const youtubeWatchUrl = getYoutubeWatchUrl(recipe.youtubeUrl);
  const NOTEBOOK_RECIPE_SLUGS = new Set([
    'pao-naan-indiano-caseiro',
    'bolo-de-cenoura-com-cobertura-de-chocolate',
    'rabanada-com-doce-de-leite',
    'tacos-de-carne-mexicanos-com-guacamole',
    'temaki-de-salmao-com-cream-cheese',
    'talharim-caseiro-com-molho-de-tomate-fresco',
    'macarrao-carbonara-cremoso',
    'macarrao-com-molho-pesto-de-manjericao',
    'batatas-rusticas-crocantes-na-air-fryer',
    'bolo-de-caneca-na-air-fryer',
    'chips-de-batata-doce-na-air-fryer',
    'bolo-de-banana-caramelizada-com-nozes',
    'bolo-de-chocolate-com-recheio-de-brigadeiro',
    'bolo-de-fuba-com-erva-doce',
    'brigadeiro-tradicional-brasileiro',
    'bolo-de-milho-cremoso-com-queijo-minas',
    'moqueca-capixaba-tradicional',
    'coxinha-de-frango-cremosa',
    'bolinha-de-queijo-com-massa-leve',
    'coxinha-de-frango-com-massa-de-batata',
    'pizza-de-calabresa-caseira',
    'pave-raffaello-cremoso-com-amendoas',
    'pudim-de-leite-condensado-tradicional',
    'cheesecake-de-frutas-vermelhas',
    'salmao-assado-com-batatas-e-vegetais',
    'pote-da-felicidade-proteico',
    'torta-de-limao-com-merengue',
    'torta-de-chocolate-com-morango',
    'bolo-de-coco-gelado-com-cobertura-de-coco',
    'bolo-de-limao-com-glace-de-limao',
    'beijinho-de-coco-tradicional',
    'brigadeiro-de-leite-ninho-com-nutella',
    'cajuzinho-nordestino',
    'bolo-de-laranja-com-calda-de-laranja',
    'empadao-de-frango-com-recheio-cremoso',
    'quiche-lorraine-tradicional',
    'creme-brulee-classico',
    'tiramisu-italiano-autentico',
    'torta-de-frutas-vermelhas-com-chantilly',
    'frango-tikka-masala-com-arroz-basmati',
    'sopa-tom-yum-tom-yam-goong',
    'bolo-de-chocolate-de-caneca-no-micro-ondas',
    'bolo-gelado-de-coco-com-recheio-de-doce-de-leite',
    'bolo-de-aipim-com-coco-ralado',
    'brigadeiro-gourmet-de-pistache',
    'brigadeiro-branco-com-granulado-colorido',
    'doce-de-leite-caseiro-cremoso',
    'gelatina-de-vinho-com-frutas-frescas',
    'manjar-de-coco-com-calda-de-ameixa',
    'palha-italiana-de-cafe',
    'arroz-doce-com-doce-de-leite',
    'trouxinha-de-cheddar-na-air-fryer',
    'nozes-crocantes-com-mel-e-especiarias-na-air-fryer',
    'cubinhos-de-frango-crocantes',
    'enroladinho-de-salsicha-com-massa-folhada',
    'pastel-de-carne-com-tempero-caseiro',
    'bolinho-de-bacalhau-com-batata-e-tempero-verde',
    'mini-quiche-lorraine-com-bacon-e-queijo',
    'croquete-de-carne-com-recheio-cremoso',
    'bolinho-de-arroz-recheado-com-queijo',
    'kibe-frito-tradicional',
    'mini-pizza-de-calabresa-com-massa-caseira',
    'dadinho-de-tapioca-com-coco-ralado',
    'arroz-branco-soltinho',
    'arroz-integral-com-legumes',
    'pure-de-batata-cremoso-com-manteiga-e-leite',
    'batata-assada-com-alecrim-e-alho',
    'batata-frita-crocante',
    'farofa-de-bacon-com-cebola-e-temperos',
    'cuscuz-marroquino-com-legumes-e-frutas-secas',
    'polenta-cremosa-com-queijo-parmesao',
    'tomates-confitados',
    'manteiga-temperada-turbinada-da-cecilia',
    'dal-makhani',
    'samosa-pastelzinho-indiano',
    'chutney-de-manga',
    'burritos-de-frango-com-feijao-e-queijo',
    'tortillas-de-trigo-caseiras',
    'nachos-com-chilli-e-queijo-derretido',
    'sushi-caseiro-com-salmao-e-atum',
    'guacamole',
    'quesadillas-de-queijo-com-molho-picante',
    'ravioli-de-carne-com-molho-branco',
    'lasanha-a-bolonhesa',
    'nhoque-de-batata-com-molho-de-tomate',
    'espaguete-a-puttanesca-com-azeitonas-e-alcaparras',
    'lasanha-vegetariana-com-abobrinha-e-berinjela',
    'nhoque-de-ricota-com-molho-de-espinafre',
    'ravioli-de-queijo-com-molho-de-tomate-fresco',
    'macarrao-ao-molho-alfredo-com-limao-siciliano',
    'pizza-portuguesa',
    'pizza-vegetariana-com-abobrinha-berinjela-e-pimentao',
    'pizza-de-frango-com-catupiry',
    'pizza-doce-com-chocolate-e-morango',
    'lasanha-de-queijo-cottage-com-vegetais',
    'salada-grega-com-queijo-feta',
    'salada-caesar-com-frango-grelhado',
    'salada-de-quinoa-com-frutas-secas-e-legumes',
    'salada-caprese-com-molho-pesto',
    'salada-tropical-com-folhas-verdes-manga-abacaxi-e-camarao',
    'salada-de-batata-com-maionese-caseira-e-ervas',
    'sopa-cremosa-de-mandioquinha-com-croutons',
    'gaspacho',
    'sopa-detox-de-legumes-com-gengibre',
    'caldo-verde-com-bacon-crocante',
    'quiche-de-espinafre-com-ricota-integral',
    'quiche-integral-de-frango-com-legumes',
    'quiche-sem-gluten-de-queijo-com-brocolis',
    'mini-quiches-de-legumes',
    'pave-de-chocolate-com-biscoito-e-chantilly',
    'pave-de-morango-com-creme-branco',
    'pave-de-limao-com-biscoito-champanhe',
    'pave-de-maracuja-com-chocolate-branco',
    'pave-de-maracuja-com-camadas-de-chocolate',
    'mousse-de-chocolate-cremosa',
    'mousse-de-limao-com-raspas-de-limao',
    'mousse-de-maracuja-com-calda-de-chocolate',
    'mousse-de-frutas-vermelhas-com-chantilly',
    'pudim-de-chocolate-com-calda-de-chocolate',
    'pudim-de-coco-queimado',
    'pudim-de-pao-com-passas',
    'sorvete-caseiro-de-morango',
    'sorvete-de-chocolate-cremoso',
    'sorvete-de-creme-com-calda-de-caramelo',
    'sorbet-de-limao',
    'cookies-com-gotas-de-chocolate',
    'torta-sorvete-de-doce-de-leite',
    'mousse-de-ovolmatine-com-chantilly',
    'brownie-de-ovolmatine',
    'trufas-de-chocolate-com-ovolmatine',
    'pave-de-ovolmatine',
    'milkshake-de-ovolmatine',
    'cafe-com-ovolmatine',
    'smoothie-de-banana-e-ovolmatine',
    'ninho-de-chocolate-com-ovinhos-de-colher',
    'brownie-de-colher-na-casquinha',
    'torta-mosaico-de-pascoa',
    'trufas-de-maracuja-e-coco',
    'pao-de-acucar-recheado-com-doce-de-leite',
    'hot-cross-buns',
    'cordeirinho-de-bolo-de-cenoura',
    'mousse-vegano-de-chocolate-com-frutas',
    'biscoitos-de-coelhinho',
    'cheesecake-de-caju-sem-lactose',
    'pavlova-ninho-com-frutas-tropicais',
    'ovo-de-colher-com-recheio-de-pacoca',
    'ovo-de-pascoa-funcional',
    'macas-do-amor-de-coelho',
    'trufas-de-chocolate-com-pistache-e-framboesa',
    'brownies-com-nozes-e-ganache-de-caramelo-salgado',
    'mini-paves-de-chocolate-e-morango',
    'tiramisu-de-pascoa',
    'mousse-de-chocolate-com-pimenta-rosa',
    'picole-surpresa-de-pascoa',
    'eclairs-de-pascoa-recheados-com-creme-de-avela-e-ganache',
    'donuts-de-chocolate-com-glace-de-framboesa',
    'tarteletes-de-limao-siciliano-com-merengue-torrado',
    'rabanadas-gourmet-com-sorvete-de-canela',
    'pave-de-ricota-com-limao-e-hortela',
    'biscoitos-de-queijo-com-ervas-finas',
    'rosquinha-de-maca-com-massa-folhada',
    'bife-de-hamburguer-assado-no-forno',
    'pipoca-doce-no-micro-ondas',
    'petit-gateau-de-chocolate-com-sorvete',
    'quindim-tradicional-brasileiro',
    'biscoitos-amanteigados-decorados',
    'biscoitos-integrais-com-aveia-e-mel',
    'torta-de-frango-com-requeijao',
    'torta-de-legumes-com-massa-integral',
    'torta-salgada-de-atum-com-massa-folhada',
    'torta-mousse-de-chocolate-com-base-de-oreo',
    'torta-de-ricota-com-frutas-vermelhas',
    'torta-de-abacaxi-com-coco-e-chantilly',
    'torta-de-banana-com-doce-de-leite-e-merengue',
    'torta-de-maca-com-canela',
    'torta-holandesa-com-creme-e-chocolate',
    'pao-de-mel-com-especiarias-e-glace-real',
    'torta-mousse-de-maracuja-com-biscoito-champagne',
    'macarons-de-pascoa',
    'cheesecake-de-limao-siciliano-com-decoracao-de-pascoa',
    'bolo-de-cenoura-com-cobertura-de-chocolate-vegana',
    'ovo-de-pascoa-recheado-com-brigadeiro-de-churros',
    'bolo-de-pascoa-com-decoracao-de-jardim',
    'ovo-de-pascoa-com-recheio-de-sorvete-artesanal',
    'bolo-naked-cake-de-pascoa',
    'cenourinhas-de-marshmallow',
    'sanduiches-doces-de-pascoa',
    'pudim-de-maria-mole',
    'copo-da-felicidade-kinder-bueno',
    'cheesecake-de-morango-com-decoracao-de-pascoa',
    'copo-da-felicidade-raffaello',
  ]);

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
    author: buildSchemaAuthors(recipe.authors, recipe.author),
    description: recipe.description,
    prepTime: minutesToIsoDuration(canonical.prepMinutes) ?? convertToISO8601(recipe.prepTime),
    cookTime: minutesToIsoDuration(canonical.cookMinutes) ?? convertToISO8601(recipe.cookTime),
    totalTime: schemaIsoDuration ?? convertToISO8601(recipe.totalTime),
    recipeYield: recipe.yield,
    recipeCategory: getRecipePrimaryCategory(recipe),
    recipeCuisine: getRecipeCuisine(recipe) || 'Brasileira',
    keywords: recipe.searchTerms?.join(', '),
    recipeIngredient: schemaIngredients,
    recipeInstructions: schemaInstructions.map((step, index) => ({
      '@type': 'HowToStep',
      name: `Passo ${index + 1}`,
      text: step,
      url: `${baseUrl}/receitas/${recipe.slug}#step-${index + 1}`,
    })),
    ...(recipe.publishedAt && { datePublished: recipe.publishedAt }),
    ...(recipe.updatedAt && { dateModified: recipe.updatedAt }),
    ...(recipe.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: recipe.rating.average,
        ratingCount: recipe.rating.count,
      },
    }),
    ...(recipe.calories && {
      nutrition: {
        '@type': 'NutritionInformation',
        calories: recipe.calories,
      },
    }),
    ...(youtubeVideoId && recipe.videoUploadDate && {
      video: {
        '@type': 'VideoObject',
        name: recipe.title,
        description: recipe.description,
        thumbnailUrl: recipe.videoThumbnail
          ? getAbsoluteUrl(recipe.videoThumbnail, baseUrl)
          : `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`,
        uploadDate: recipe.videoUploadDate,
        url: youtubeWatchUrl,
        embedUrl: youtubeEmbedUrl,
      },
    }),
  };

  if (NOTEBOOK_RECIPE_SLUGS.has(recipe.slug)) {
    const templateProps = buildRecipeTemplateProps(recipe);
    return <RecipeNotebookTemplate {...templateProps} />;
  }

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
                  <EditorialReveal as="div" className="space-y-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff6b35]">
                      Introdução
                    </p>
                    <p className="font-serif text-lg leading-8 text-[#24313d] md:text-[1.15rem]">
                      {recipe.intro}
                    </p>
                  </EditorialReveal>
                )}
                {recipe.context && (
                  <div className="space-y-3 border-t border-black/6 pt-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a4d2e]">
                      Curiosidade
                    </p>
                    <PretextPullQuote
                      quote={recipe.context}
                      cite="Cecília Mauad"
                      font="400 20px Lora, Georgia, serif"
                      lineHeight={32}
                      className="text-[#4a5568]"
                    />
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
              <RecipeIngredients
                slug={recipe.slug}
                structuredIngredients={displayIngredients}
                legacyIngredients={canonical.ingredients}
                baseServings={hasServingsControl ? canonical.servings : undefined}
                servingsUnit={canonical.servingsUnit}
              />
            </div>

            {/* Modo de Preparo */}
            <div className="md:col-span-7">
              <RecipeInstructions
                instructionGroups={displayInstructions}
                baseSlug={recipe.slug}
              />

              {/* Dicas Extras */}
              {recipe.tips && recipe.tips.length > 0 && (
                <EditorialReveal as="div" className="mt-12 bg-[#fef9f3] rounded-2xl p-6 border-l-4 border-[#ffd700]">
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
                </EditorialReveal>
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
