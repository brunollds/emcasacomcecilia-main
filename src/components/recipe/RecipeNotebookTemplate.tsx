import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, ChefHat, Users, Utensils, Lightbulb, PlayCircle } from 'lucide-react';
import TextToSpeechButton from '@/components/TextToSpeechButton';
import RecipeViewTracker from '@/components/RecipeViewTracker';
import { ShareBar } from '@/components/shared/ShareBar';
import {
  AnimatedTextHighlight,
  ArticleByline,
  ChangelogDetails,
  DropCapParagraph,
  EditorialAmbientBackground,
  EditorialNotePill,
  EditorialReveal,
  MarginNoteRail,
  PretextPullQuote,
  PretextShrinkwrap,
  SectionHeadingReveal,
  SectionLinkButton,
} from '@/components/editorial';
import { formatDate, type Recipe, type RecipeViewModel } from '@/lib/content';
import { isLineAnchor } from '@/lib/pretext/lineAnchorCodec';
import RecipeIngredients from './RecipeIngredients';
import RecipeInstructions from './RecipeInstructions';
import { ServingScaleControl } from './ServingScaleControl';
import { RecipeJumpNav } from './RecipeJumpNav';
import { RecipeMetaChips } from './RecipeMetaChips';

export interface RecipeNotebookTemplateProps {
  recipe: Recipe;
  viewModel: RecipeViewModel;
  taxonomyChips: {
    key: string;
    label: string;
    href: string;
    primary?: boolean;
  }[];
  youtubeEmbedUrl: string | null;
  recipeImage: string;
  recipeImageAlt: string;
  breadcrumbJsonLd: Record<string, unknown>;
  jsonLd: Record<string, unknown>;
}

export function RecipeNotebookTemplate({
  recipe,
  viewModel,
  taxonomyChips,
  youtubeEmbedUrl,
  recipeImage,
  recipeImageAlt,
  breadcrumbJsonLd,
  jsonLd,
}: RecipeNotebookTemplateProps): React.ReactElement {
  const { displayIngredients, displayInstructions, hasServingsControl, schemaIngredients, schemaInstructions } = viewModel;
  const primaryBreadcrumbChip = taxonomyChips.find((chip) => chip.primary) ?? taxonomyChips[0];
  const servingsStorageKey = `serving-scale-${recipe.slug}`;

  const speechText = [
    recipe.title,
    recipe.description,
    recipe.intro,
    schemaIngredients.length > 0 ? ['Ingredientes:', ...schemaIngredients].join(' ') : null,
    schemaInstructions.length > 0 ? ['Modo de preparo:', ...schemaInstructions.map((step, i) => `Passo ${i + 1}: ${step}`)].join(' ') : null,
    recipe.tips && recipe.tips.length > 0 ? ['Dicas:', ...recipe.tips].join(' ') : null,
  ].filter(Boolean).join('. ');

  // Recipe section index mapping for line anchors (0-based)
  // This documents the fixed section structure for authoring and line anchor validation
  const RECIPE_SECTION_INDICES = {
    'ficha-tecnica': 0,
    'ingredientes': 1,
    'modo-de-preparo': 2,
    'dicas': 3,
  } as const;

  // Separate notes into anchored and unanchored
  // Exclude both section-id anchored notes and line-anchored notes (which belong to margin rails)
  const notes = recipe.notes || [];
  const validAnchors = new Set(Object.keys(RECIPE_SECTION_INDICES));
  const unanchoredNotes = notes.filter((note) => !note.anchor || (!validAnchors.has(note.anchor) && !isLineAnchor(note.anchor)));
  const getAnchoredNotes = (anchor: string) => notes.filter((note) => note.anchor === anchor);

  return (
    <EditorialAmbientBackground variant="recipe" className="notebook-paper min-h-screen pb-20">
      <RecipeViewTracker recipe={recipe} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero em cascata */}
      <header className="notebook-margin pt-10 md:pt-16">
        <div className="mx-auto max-w-4xl">
          <EditorialReveal as="div" delay={0} className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1a4d2e]/55 md:justify-start">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#ff6b35]">
                    Início
                  </Link>
                </li>
                <li aria-hidden="true" className="text-[#ff6b35]/70">/</li>
                <li>
                  <Link href="/receitas" className="transition-colors hover:text-[#ff6b35]">
                    Receitas
                  </Link>
                </li>
                {primaryBreadcrumbChip && (
                  <>
                    <li aria-hidden="true" className="text-[#ff6b35]/70">/</li>
                    <li>
                      <Link href={primaryBreadcrumbChip.href} className="transition-colors hover:text-[#ff6b35]">
                        {primaryBreadcrumbChip.label}
                      </Link>
                    </li>
                  </>
                )}
              </ol>
            </nav>

            <Link
              href="/receitas"
              className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#1a4d2e]/70 transition-colors hover:text-[#ff6b35]"
            >
              <ArrowLeft size={16} />
              <span>Voltar para receitas</span>
            </Link>
          </EditorialReveal>

          <EditorialReveal as="div" delay={0} className="mb-4">
            {taxonomyChips.length > 0 && (
              <div className="mb-5 flex flex-wrap justify-center gap-2 md:justify-start">
                {taxonomyChips.map((chip) => (
                  <Link
                    key={chip.key}
                    href={chip.href}
                    className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] transition-all ${
                      chip.primary
                        ? 'bg-[#ff6b35]/10 text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white'
                        : 'border border-[#1a4d2e]/15 bg-white/70 text-[#1a4d2e] hover:border-[#ff6b35] hover:text-[#ff6b35]'
                    }`}
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            )}
          </EditorialReveal>

          <EditorialReveal
            as="h1"
            delay={0.1}
            className="mb-5 text-center font-hand-title text-5xl font-bold leading-[1.02] tracking-[-0.03em] text-[#ff6b35] md:text-left md:text-6xl lg:text-7xl"
            style={{ fontFamily: 'var(--font-kalam), cursive, Georgia, serif' }}
          >
            {recipe.title}
          </EditorialReveal>

          <EditorialReveal as="p" delay={0.2} className="mx-auto mb-6 max-w-2xl text-center font-editorial text-lg italic leading-relaxed text-[#4a5568] md:mx-0 md:text-left md:text-xl">
            &quot;{recipe.description}&quot;
          </EditorialReveal>

          <RecipeMetaChips recipe={recipe} />

          <EditorialReveal as="div" delay={0.25} className="mb-8 flex flex-wrap items-center justify-center gap-3 text-sm text-[#1a4d2e]/80 md:justify-start">
            <ArticleByline
              authors={recipe.authors || (recipe.author ? [recipe.author] : undefined)}
              fallbackAuthor={{
                name: 'Cecília Mauad',
                role: 'Em Casa com Cecília',
                initials: 'CM',
                url: '/sobre',
              }}
              meta={[
                { icon: 'clock', label: 'Tempo de preparo', value: `${recipe.prepTime} de preparo` },
                { label: 'Dificuldade', value: recipe.difficulty },
                ...(recipe.publishedAt
                  ? [{ icon: 'calendar' as const, label: 'Publicado em', value: formatDate(recipe.publishedAt), dateTime: recipe.publishedAt }]
                  : []),
                ...(recipe.updatedAt && recipe.updatedAt !== recipe.publishedAt
                  ? [{ label: 'Atualizado em', value: `Atualizado em ${formatDate(recipe.updatedAt)}`, dateTime: recipe.updatedAt }]
                  : []),
              ]}
              action={<TextToSpeechButton text={speechText} label="Ouvir receita" />}
              className="justify-center text-[#1a4d2e]/80 md:justify-start"
            />
          </EditorialReveal>

          {recipe.changelog && recipe.changelog.length > 0 && (
            <EditorialReveal as="div" delay={0.27} className="mb-8">
              <ChangelogDetails entries={recipe.changelog} />
            </EditorialReveal>
          )}

          {unanchoredNotes.length > 0 && (
            <EditorialReveal as="div" delay={0.28} className="mb-8 flex flex-wrap gap-2">
              {unanchoredNotes.map((note) => (
                <EditorialNotePill key={note.id || note.label} note={note} />
              ))}
            </EditorialReveal>
          )}

          <RecipeJumpNav
            hasFichaTecnica={true}
            hasIngredientes={displayIngredients && displayIngredients.length > 0}
            hasModoDePreparo={displayInstructions && displayInstructions.length > 0}
            hasDicas={recipe.tips && recipe.tips.length > 0}
          />

          <EditorialReveal as="section" delay={0.3} className="mb-12">
            <div className="relative mx-auto aspect-[16/10] max-w-3xl overflow-hidden rounded-2xl shadow-xl ring-1 ring-[#1a4d2e]/10">
              <Image
                src={recipeImage}
                alt={recipeImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          </EditorialReveal>
        </div>
      </header>

      {/* Intro e contexto */}
      {(recipe.intro || recipe.context) && (
        <section id="historia" className="notebook-margin mb-14 scroll-mt-24">
          <div className="mx-auto max-w-4xl">
            {recipe.intro && (
              <EditorialReveal as="div" className="mb-8">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff6b35]">
                  Introdução
                </p>
                <DropCapParagraph text={recipe.intro} />
              </EditorialReveal>
            )}

            {recipe.context && (
              <EditorialReveal as="div" className="border-l-2 border-[#ff6b35]/40 pl-5">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a4d2e]">
                  Curiosidade
                </p>
                <PretextPullQuote
                  quote={recipe.context}
                  cite="Cecília Mauad"
                  font="400 20px Lora, Georgia, serif"
                  lineHeight={32}
                  className="text-[#4a5568]"
                />
              </EditorialReveal>
            )}
          </div>
        </section>
      )}

      {/* Ficha técnica integrada */}
      <section id="ficha-tecnica" className="notebook-margin mb-14 scroll-mt-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-2">
            <SectionHeadingReveal as="h2" underlineColor="#ff6b35" className="font-editorial text-2xl font-bold text-[#1a4d2e]">
              Ficha Técnica
            </SectionHeadingReveal>
            <SectionLinkButton anchorId="ficha-tecnica" />
          </div>
          {getAnchoredNotes('ficha-tecnica').length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {getAnchoredNotes('ficha-tecnica').map((note) => (
                <EditorialNotePill key={note.id || note.label} note={note} />
              ))}
            </div>
          )}

          <MarginNoteRail notes={notes} sectionIndex={RECIPE_SECTION_INDICES['ficha-tecnica']}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <EditorialReveal as="div" delay={0} className="rounded-xl border border-[#1a4d2e]/10 bg-white/60 p-4">
              <span className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#1a4d2e]/70">
                <Clock size={12} /> Preparo
              </span>
              <span className="font-handwritten text-2xl text-[#1a4d2e]">{recipe.prepTime}</span>
            </EditorialReveal>

            <EditorialReveal as="div" delay={0.05} className="rounded-xl border border-[#1a4d2e]/10 bg-white/60 p-4">
              <span className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#1a4d2e]/70">
                <Utensils size={12} /> Fogo
              </span>
              <span className="font-handwritten text-2xl text-[#1a4d2e]">{recipe.cookTime}</span>
            </EditorialReveal>

            <EditorialReveal as="div" delay={0.1} className="rounded-xl border border-[#1a4d2e]/10 bg-white/60 p-4">
              <span className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#1a4d2e]/70">
                <Clock size={12} /> Total
              </span>
              <span className="font-handwritten text-2xl text-[#1a4d2e]">{recipe.totalTime}</span>
            </EditorialReveal>

            <EditorialReveal as="div" delay={0.15} className="rounded-xl border border-[#1a4d2e]/10 bg-white/60 p-4">
              <span className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#1a4d2e]/70">
                <Users size={12} /> Rendimento
              </span>
              {hasServingsControl ? (
                <div className="mt-2">
                  <ServingScaleControl
                    baseServings={recipe.servings!}
                    servingsUnit={recipe.servingsUnit}
                    storageKey={servingsStorageKey}
                    compact
                  />
                </div>
              ) : (
                <span className="font-handwritten text-2xl text-[#1a4d2e]">{recipe.yield}</span>
              )}
            </EditorialReveal>

            <EditorialReveal as="div" delay={0.2} className="rounded-xl border border-[#1a4d2e]/10 bg-white/60 p-4">
              <span className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#1a4d2e]/70">
                <ChefHat size={12} /> Nível
              </span>
              <span className="font-handwritten text-2xl text-[#1a4d2e]">{recipe.difficulty}</span>
            </EditorialReveal>
            </div>
          </MarginNoteRail>
        </div>
      </section>

      {/* Vídeo */}
      {youtubeEmbedUrl && (
        <section className="notebook-margin mb-14">
          <div className="mx-auto max-w-4xl">
            <div className="aspect-video overflow-hidden rounded-2xl bg-[#1a4d2e]/5 shadow-lg ring-1 ring-[#1a4d2e]/10">
              <iframe
                src={youtubeEmbedUrl}
                title={recipe.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <p className="mt-3 flex items-center gap-2 text-sm text-[#1a4d2e]/70">
              <PlayCircle size={16} className="text-[#ff6b35]" />
              Assista ao passo a passo detalhado no YouTube
            </p>
          </div>
        </section>
      )}

      {/* Ingredientes e Modo de Preparo */}
      <section className="notebook-margin mb-14">
        <div className="grid min-w-0 gap-10 md:grid-cols-12 md:gap-0">
          <div id="ingredientes" className="scroll-mt-24 md:col-span-5" aria-label="Ingredientes">
            {getAnchoredNotes('ingredientes').length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {getAnchoredNotes('ingredientes').map((note) => (
                  <EditorialNotePill key={note.id || note.label} note={note} />
                ))}
              </div>
            )}
            <MarginNoteRail notes={notes} sectionIndex={RECIPE_SECTION_INDICES['ingredientes']}>
              <RecipeIngredients
                slug={recipe.slug}
                structuredIngredients={displayIngredients}
                legacyIngredients={recipe.ingredients}
                baseServings={hasServingsControl ? recipe.servings : undefined}
                servingsUnit={recipe.servingsUnit}
                variant="notebook"
                hideServingsControl
                servingsStorageKey={servingsStorageKey}
                headingButton={<SectionLinkButton anchorId="ingredientes" />}
              />
            </MarginNoteRail>
          </div>

          <div
            id="modo-de-preparo"
            className="relative border-t border-[#8b6f47]/25 pt-10 scroll-mt-24 before:absolute before:left-0 before:top-0 before:h-px before:w-full before:bg-[linear-gradient(90deg,transparent,rgba(139,111,71,0.55),transparent)] md:col-span-7 md:border-l md:border-t-0 md:border-[#8b6f47]/25 md:pl-12 md:pt-0 md:before:left-0 md:before:top-0 md:before:h-full md:before:w-px md:before:bg-[linear-gradient(180deg,transparent,rgba(139,111,71,0.55),transparent)] xl:pl-16"
            aria-label="Modo de preparo"
          >
            {getAnchoredNotes('modo-de-preparo').length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {getAnchoredNotes('modo-de-preparo').map((note) => (
                  <EditorialNotePill key={note.id || note.label} note={note} />
                ))}
              </div>
            )}
            <MarginNoteRail notes={notes} sectionIndex={RECIPE_SECTION_INDICES['modo-de-preparo']}>
              <RecipeInstructions
                instructionGroups={displayInstructions}
                baseSlug={recipe.slug}
                variant="notebook"
                headingButton={<SectionLinkButton anchorId="modo-de-preparo" />}
              />
            </MarginNoteRail>

            {recipe.tips && recipe.tips.length > 0 && (
              <div
                id="dicas"
                className="relative mt-10 scroll-mt-24"
              >
                {getAnchoredNotes('dicas').length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {getAnchoredNotes('dicas').map((note) => (
                      <EditorialNotePill key={note.id || note.label} note={note} />
                    ))}
                  </div>
                )}
                <MarginNoteRail notes={notes} sectionIndex={RECIPE_SECTION_INDICES['dicas']}>
                  <EditorialReveal
                    as="div"
                    className="rotate-[-0.35deg] rounded-xl border border-[#ffb26b]/60 bg-[#fff4bf] p-5 shadow-[0_12px_28px_rgba(74,36,0,0.10)]"
                  >
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 h-5 w-20 -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] rounded-sm bg-[#ffdf8a]/75 shadow-sm"
                />
                <div className="mb-3 flex items-center gap-2">
                  <h4 className="flex items-center gap-2 font-editorial text-lg font-bold text-[#1a4d2e]">
                    <Lightbulb size={20} className="text-[#ff6b35]" />
                    Dicas da Cecília
                  </h4>
                  <SectionLinkButton anchorId="dicas" />
                </div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b5a1f]">
                  Observações práticas para a receita dar certo
                </p>
                <PretextShrinkwrap
                  text={recipe.tips.join(' ')}
                  font="400 14px Montserrat, system-ui, sans-serif"
                  lineHeight={22}
                  minWidth={260}
                  maxWidthRatio={0.95}
                >
                  <ul className="space-y-2">
                    {recipe.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-[#4a3a23]">
                        <span className="text-[#ff6b35]">•</span>
                        <span><AnimatedTextHighlight text={tip} /></span>
                      </li>
                    ))}
                  </ul>
                </PretextShrinkwrap>
                  </EditorialReveal>
                </MarginNoteRail>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Share */}
      <section className="notebook-margin">
        <div className="mx-auto max-w-4xl">
          <ShareBar
            url={`https://emcasacomcecilia.com/receitas/${recipe.slug}`}
            title={recipe.title}
            contentType="receita"
            imageUrl={
              recipeImage.startsWith('http')
                ? recipeImage
                : `https://emcasacomcecilia.com${recipeImage}`
            }
          />
        </div>
      </section>
    </EditorialAmbientBackground>
  );
}
