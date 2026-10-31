// Validação da compatibilidade do modelo canônico com toda a base atual.
// Executa normalizeRecipe() e normalizeReview() em todos os registros de
// src/lib/data.ts e reporta inconsistências.

import { recipes, reviews } from '@/lib/data';
import {
  isListedInPortuguese,
  isReviewCategory,
  isValidReviewPublishedAtISO,
} from '@/lib/reviewDiscovery';
import {
  formatQuantity,
  inferReviewKind,
  resolveReviewLocale,
  isValidTranslationKey,
  detectDuplicateReviewPathnames,
  groupReviewsByTranslationKey,
  detectDuplicateTranslationLocalePairs,
  normalizeRecipe,
  normalizeReview,
  resolveTotalMinutes,
  structuredIngredientToText,
  type ContentSectionStyling,
} from '@/lib/content';
import { COUPONS } from '@/lib/couponsData';
import { isFaqHeading, parseFaqBullet } from '@/lib/faq';
import {
  BODY_DATES_REASONS,
  checkReviewProse,
  findDates,
  getProseProblems,
  isBodyDatesReason,
  type ProseBaselineEntry,
} from './review-prose-checks';
import proseBaselineJson from './review-prose-baseline.json';

interface ValidationError {
  type: 'recipe' | 'review';
  id: number;
  slug: string;
  message: string;
}

interface ValidationWarning {
  type: 'recipe' | 'review' | 'autoria';
  id: number;
  slug: string;
  message: string;
}

const errors: ValidationError[] = [];
const warnings: ValidationWarning[] = [];
const recipeIds = new Set<number>();
const recipeSlugs = new Set<string>();
const reviewIds = new Set<number>();
const couponSlugs = new Set(COUPONS.map((coupon) => coupon.slug));

function reportError(error: ValidationError): void {
  errors.push(error);
}

function reportWarning(warning: ValidationWarning): void {
  warnings.push(warning);
}

// O card de estilo (ArticleStyling): o modelo, de 1 a 3 peças, cada uma com algum dos três campos, de 1 a 4 itens
// no "combina com", links https e amostras de cor em hex. O markdown cru o plainTextBody já barra.
function getStylingProblems(styling: ContentSectionStyling): string[] {
  const problems: string[] = [];
  const isHttps = (url: string) => /^https:\/\/[^\s]+$/.test(url);
  if (styling.layout !== undefined && styling.layout !== 'tabs' && styling.layout !== 'tags') {
    problems.push(`layout "${styling.layout}" (use "tabs" ou "tags")`);
  }
  const items = Array.isArray(styling.items) ? styling.items : [];
  if (items.length < 1 || items.length > 3) problems.push(`${items.length} peças (de 1 a 3)`);
  const pieces = new Set<string>();
  for (const item of items) {
    const name = item.piece?.trim();
    if (!name) problems.push('peça sem nome (piece)');
    else if (pieces.has(name)) problems.push(`peça repetida: ${name}`);
    else pieces.add(name);
    if (item.url && !isHttps(item.url)) problems.push(`${name}: link da peça sem https`);
    const pairs = item.pairsWith ?? [];
    if (!item.howTo?.trim() && !item.occasion?.trim() && pairs.length === 0 && !item.variants?.length) {
      problems.push(`${name}: sem como usar, ocasião nem combina com`);
    }
    if (pairs.length > 4) problems.push(`${name}: ${pairs.length} itens no combina com (até 4)`);
    for (const pair of pairs) {
      if (!pair.label?.trim()) problems.push(`${name}: item do combina com sem label`);
      if (pair.url && !isHttps(pair.url)) problems.push(`${name}: link de ${pair.label} sem https`);
      if (pair.note && !pair.url) problems.push(`${name}: nota em ${pair.label}, que não é da loja (sem url)`);
    }
    for (const variant of item.variants ?? []) {
      if (!variant.color?.trim() || !variant.pairsWith?.length) problems.push(`${name}: variação sem cor ou sem combina com`);
      if (variant.swatch && !/^#[0-9a-f]{6}$/i.test(variant.swatch)) problems.push(`${name}: amostra "${variant.swatch}" fora de #rrggbb`);
    }
  }
  return problems;
}

if (
  formatQuantity(1.5) !== '1½' ||
  formatQuantity(1 / 3) !== '⅓' ||
  formatQuantity(1 / 16) !== '1/16'
) {
  reportError({
    type: 'recipe',
    id: -1,
    slug: '__serializers__',
    message: 'formatQuantity não preserva frações suportadas',
  });
}

const recipeWithPassiveTime = recipes.find(
  (recipe) => recipe.slug === 'pao-naan-indiano-caseiro'
);

if (
  !recipeWithPassiveTime ||
  resolveTotalMinutes(recipeWithPassiveTime) !== 85
) {
  reportError({
    type: 'recipe',
    id: -1,
    slug: '__serializers__',
    message: 'resolveTotalMinutes descartou tempo passivo da receita',
  });
}

if (
  structuredIngredientToText({
    qty: 0,
    unit: 'a gosto',
    name: 'sal',
  }) !== 'sal a gosto'
) {
  reportError({
    type: 'recipe',
    id: -1,
    slug: '__serializers__',
    message: 'ingrediente sem quantidade foi serializado incorretamente',
  });
}

// ---------------------------------------------------------------------------
// Validar receitas
// ---------------------------------------------------------------------------

for (const recipe of recipes) {
  if (!recipe.id || typeof recipe.id !== 'number') {
    reportError({ type: 'recipe', id: recipe.id ?? -1, slug: recipe.slug, message: 'id ausente ou não numérico' });
  }

  if (!recipe.slug) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'slug ausente' });
  }

  if (recipeIds.has(recipe.id)) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'id duplicado' });
  }
  recipeIds.add(recipe.id);

  if (recipeSlugs.has(recipe.slug)) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'slug duplicado' });
  }
  recipeSlugs.add(recipe.slug);

  if (!recipe.title) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'title ausente' });
  }

  if (!recipe.description) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'description ausente' });
  }

  if (!Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'ingredients ausente ou vazio' });
  } else {
    for (const section of recipe.ingredients) {
      if (!section.section || !Array.isArray(section.items)) {
        reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'ingredientSection malformado' });
      }
    }
  }

  if (!Array.isArray(recipe.instructions) || recipe.instructions.length === 0) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'instructions ausente ou vazio' });
  }

  if (recipe.subCategory && !Array.isArray(recipe.subCategory)) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'subCategory deve ser array' });
  }

  if (recipe.cuisine && !Array.isArray(recipe.cuisine)) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'cuisine deve ser array' });
  }

  if (
    recipe.rating &&
    (
      !Number.isFinite(recipe.rating.average) ||
      recipe.rating.average < 1 ||
      recipe.rating.average > 5 ||
      !Number.isInteger(recipe.rating.count) ||
      recipe.rating.count < 1
    )
  ) {
    reportError({
      type: 'recipe',
      id: recipe.id,
      slug: recipe.slug,
      message: 'rating deve ter average entre 1 e 5 e count inteiro positivo',
    });
  }

  if (
    recipe.videoUploadDate &&
    Number.isNaN(Date.parse(recipe.videoUploadDate))
  ) {
    reportError({
      type: 'recipe',
      id: recipe.id,
      slug: recipe.slug,
      message: 'videoUploadDate deve ser uma data ISO válida',
    });
  }

  // Warnings não bloqueantes
  if (!recipe.publishedAt) {
    reportWarning({
      type: 'recipe',
      id: recipe.id,
      slug: recipe.slug,
      message: 'receita sem publishedAt (impede datePublished no schema)',
    });
  }

  if (!recipe.imageAlt) {
    reportWarning({
      type: 'recipe',
      id: recipe.id,
      slug: recipe.slug,
      message: 'receita sem imageAlt (acessibilidade e SEO)',
    });
  }

  try {
    const viewModel = normalizeRecipe(recipe);
    if (!viewModel.displayInstructions || viewModel.displayInstructions.length === 0) {
      reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: 'normalizeRecipe não gerou displayInstructions' });
    }
    const expectedIngredientCount = recipe.ingredients.reduce(
      (count, section) => count + section.items.length,
      0
    );
    if (viewModel.schemaIngredients.length !== expectedIngredientCount) {
      reportError({
        type: 'recipe',
        id: recipe.id,
        slug: recipe.slug,
        message: 'normalizeRecipe perdeu ingredientes na serialização para schema',
      });
    }
    if (viewModel.schemaInstructions.length !== recipe.instructions.length) {
      reportError({
        type: 'recipe',
        id: recipe.id,
        slug: recipe.slug,
        message: 'normalizeRecipe perdeu passos na serialização para schema',
      });
    }
  } catch (err) {
    reportError({ type: 'recipe', id: recipe.id, slug: recipe.slug, message: `normalizeRecipe falhou: ${err instanceof Error ? err.message : String(err)}` });
  }
}

// ---------------------------------------------------------------------------
// Validar reviews
// ---------------------------------------------------------------------------

for (const review of reviews) {
  if (!review.id || typeof review.id !== 'number') {
    reportError({ type: 'review', id: review.id ?? -1, slug: review.slug, message: 'id ausente ou não numérico' });
  }

  if (!review.slug) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'slug ausente' });
  }

  if (reviewIds.has(review.id)) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'id duplicado' });
  }
  reviewIds.add(review.id);

  if (!review.title) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'title ausente' });
  }

  if (!review.description) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'description ausente' });
  }

  if (!review.type) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'type ausente' });
  }

  try {
    resolveReviewLocale(review.locale);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    reportError({
      type: 'review',
      id: review.id,
      slug: review.slug,
      message: `locale inválido: ${message}`,
    });
  }

  if (review.translationKey !== undefined && !isValidTranslationKey(review.translationKey)) {
    reportError({
      type: 'review',
      id: review.id,
      slug: review.slug,
      message: `translationKey malformada: "${review.translationKey}"`,
    });
  }

  const listedInPortuguese = isListedInPortuguese(review);

  if (review.category !== undefined && !isReviewCategory(review.category)) {
    reportError({
      type: 'review',
      id: review.id,
      slug: review.slug,
      message: `category inválida: "${review.category}"`,
    });
  }

  // O affiliate liga o artigo à loja (dock, sidebar, gaveta e vitrine da home). Até 10/2026, dois
  // artigos usavam "nestle-nutre" com a loja cadastrada como "nutren", e a gaveta perdia a oferta.
  if (review.affiliate !== undefined && !couponSlugs.has(review.affiliate)) {
    reportError({
      type: 'review',
      id: review.id,
      slug: review.slug,
      message: `affiliate "${review.affiliate}" não é o slug de nenhuma loja de couponsData.ts`,
    });
  }

  if (listedInPortuguese && review.category === undefined) {
    reportError({
      type: 'review',
      id: review.id,
      slug: review.slug,
      message: 'artigo listado em português sem category válida',
    });
  }

  if (
    listedInPortuguese &&
    !isValidReviewPublishedAtISO(review.publishedAtISO)
  ) {
    reportError({
      type: 'review',
      id: review.id,
      slug: review.slug,
      message: 'artigo listado em português sem publishedAtISO válida',
    });
  }

  if (review.contentSections !== undefined && !Array.isArray(review.contentSections)) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'contentSections, quando presente, deve ser array' });
  }

  if (!Array.isArray(review.pros)) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'pros deve ser array' });
  }

  if (!Array.isArray(review.cons)) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'cons deve ser array' });
  }

  // Warnings não bloqueantes
  if (!review.publishedAtISO && !listedInPortuguese) {
    reportWarning({
      type: 'review',
      id: review.id,
      slug: review.slug,
      message: 'review sem publishedAtISO (impede datePublished ISO no schema)',
    });
  }

  const kind = inferReviewKind(review);
  if (kind === 'produto') {
    if (!review.verdict || typeof review.verdict.stars !== 'number') {
      reportWarning({
        type: 'review',
        id: review.id,
        slug: review.slug,
        message: 'review de produto sem verdict.stars',
      });
    }
    if (!review.productSpec || review.productSpec.length === 0) {
      reportWarning({
        type: 'review',
        id: review.id,
        slug: review.slug,
        message: 'review de produto sem productSpec',
      });
    }
    if (!review.cta || !review.cta.url || !review.cta.label) {
      reportWarning({
        type: 'review',
        id: review.id,
        slug: review.slug,
        message: 'review de produto sem cta completo',
      });
    }
  }

  try {
    const viewModel = normalizeReview(review);
    if (!viewModel.kind) {
      reportError({ type: 'review', id: review.id, slug: review.slug, message: 'normalizeReview não gerou kind' });
    }
    const expectedTextParts = (review.contentSections || []).flatMap((section) => [
      section.heading,
      ...(section.paragraphs || []),
      ...(section.bullets || []),
      section.emphasis,
    ]).filter(Boolean);
    if (expectedTextParts.length > 0 && !viewModel.plainTextBody) {
      reportError({
        type: 'review',
        id: review.id,
        slug: review.slug,
        message: 'normalizeReview perdeu o texto de contentSections',
      });
    }
    // O áudio e o tempo de leitura usam o texto que a página mostra. Sobra marcação quando o tokenizador
    // não a reconhece ou quando ela está no título ou no aviso, que a página também mostra crus.
    if (/\]\(|\*\*/.test(viewModel.plainTextBody)) {
      reportError({
        type: 'review',
        id: review.id,
        slug: review.slug,
        message: 'plainTextBody com markdown cru ("](" ou "**"): o áudio leria a marcação, e a página também a mostra',
      });
    }
    // A página mostra o cabeçalho da tabela cru, sem ler o markdown (as células leem).
    for (const section of review.contentSections || []) {
      if ((section.comparisonTable?.headers || []).some((header) => /\]\(|\*\*/.test(header))) {
        reportError({
          type: 'review',
          id: review.id,
          slug: review.slug,
          message: `cabeçalho de tabela com markdown ("](" ou "**") em "${section.heading}": a página o mostra cru`,
        });
      }
      // O link de produto da foto (ReviewInlineImage) vai para a loja, então só https.
      const sectionImages = [...(typeof section.image === 'object' && section.image ? [section.image] : []), ...(section.images ?? [])];
      for (const image of sectionImages) {
        if (image.href !== undefined && !/^https:\/\/[^\s]+$/.test(image.href)) {
          reportError({ type: 'review', id: review.id, slug: review.slug, message: `foto com link fora de https em "${section.heading}": ${image.href}` });
        }
      }
      if (section.styling) {
        for (const problem of getStylingProblems(section.styling)) {
          reportError({ type: 'review', id: review.id, slug: review.slug, message: `card de estilo em "${section.heading}": ${problem}` });
        }
      }
    }
    // O FAQ corta a pergunta no primeiro "?": "**Pergunta?** resposta" vira a pergunta "**Pergunta?" e a
    // resposta "** resposta", e os asteriscos aparecem no acordeão e no FAQPage.
    for (const section of review.contentSections || []) {
      if (!isFaqHeading(section.heading)) continue;
      for (const bullet of section.bullets || []) {
        const item = parseFaqBullet(bullet);
        if (item && (item.question.includes('**') || item.answer.startsWith('**'))) {
          reportError({
            type: 'review',
            id: review.id,
            slug: review.slug,
            message: `FAQ com a pergunta em negrito (escreva "Pergunta? resposta", sem **): ${bullet.slice(0, 60)}`,
          });
        }
      }
    }
  } catch (err) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: `normalizeReview falhou: ${err instanceof Error ? err.message : String(err)}` });
  }
}

// ---------------------------------------------------------------------------
// Validar regras de internacionalização genéricas (locale + translationKey)
// ---------------------------------------------------------------------------

const reviewsWithTranslations = reviews.filter(
  (review) => review.translationKey !== undefined
);
const reviewGroups = groupReviewsByTranslationKey(reviewsWithTranslations);
const duplicateTranslationLocales = detectDuplicateTranslationLocalePairs(reviewGroups);

for (const duplicate of detectDuplicateReviewPathnames(reviews)) {
  reportError({
    type: 'review',
    id: -1,
    slug: duplicate.slugs.join(', '),
    message: `pathname canônico duplicado: ${duplicate.pathname}`,
  });
}

for (const duplicate of duplicateTranslationLocales) {
  reportError({
    type: 'review',
    id: -1,
    slug: duplicate.translationKey,
    message: `translationKey duplicada no locale "${duplicate.locale}": ${duplicate.slugs.join(', ')}`,
  });
}

// ---------------------------------------------------------------------------
// Validação dos pilotos
// ---------------------------------------------------------------------------

const PILOT_RECIPE_SLUG = 'pao-naan-indiano-caseiro';
const PILOT_REVIEW_SLUG = 'poltronas-reclinaveis-damie-vale-o-investimento';

const pilotRecipe = recipes.find((recipe) => recipe.slug === PILOT_RECIPE_SLUG);
const pilotReview = reviews.find((review) => review.slug === PILOT_REVIEW_SLUG);

if (!pilotRecipe) {
  reportError({ type: 'recipe', id: -1, slug: PILOT_RECIPE_SLUG, message: 'receita piloto não encontrada' });
} else {
  if (!pilotRecipe.structuredIngredients || pilotRecipe.structuredIngredients.length === 0) {
    reportError({ type: 'recipe', id: pilotRecipe.id, slug: pilotRecipe.slug, message: 'receita piloto não possui structuredIngredients' });
  }
  if (!pilotRecipe.instructionGroups || pilotRecipe.instructionGroups.length === 0) {
    reportError({ type: 'recipe', id: pilotRecipe.id, slug: pilotRecipe.slug, message: 'receita piloto não possui instructionGroups' });
  }
  if (!pilotRecipe.publishedAt) {
    reportError({ type: 'recipe', id: pilotRecipe.id, slug: pilotRecipe.slug, message: 'receita piloto não possui publishedAt' });
  }
}

if (!pilotReview) {
  reportError({ type: 'review', id: -1, slug: PILOT_REVIEW_SLUG, message: 'review piloto não encontrado' });
} else {
  if (!pilotReview.verdict || typeof pilotReview.verdict.stars !== 'number') {
    reportError({ type: 'review', id: pilotReview.id, slug: pilotReview.slug, message: 'review piloto não possui verdict.stars' });
  }
  if (!Array.isArray(pilotReview.pros) || pilotReview.pros.length === 0) {
    reportError({ type: 'review', id: pilotReview.id, slug: pilotReview.slug, message: 'review piloto não possui pros' });
  }
  if (!Array.isArray(pilotReview.cons) || pilotReview.cons.length === 0) {
    reportError({ type: 'review', id: pilotReview.id, slug: pilotReview.slug, message: 'review piloto não possui cons' });
  }
  if (!pilotReview.productSpec || pilotReview.productSpec.length === 0) {
    reportError({ type: 'review', id: pilotReview.id, slug: pilotReview.slug, message: 'review piloto não possui productSpec' });
  }
  if (!pilotReview.cta || !pilotReview.cta.url || !pilotReview.cta.label) {
    reportError({ type: 'review', id: pilotReview.id, slug: pilotReview.slug, message: 'review piloto não possui cta completo' });
  }
  if (!pilotReview.publishedAtISO) {
    reportError({ type: 'review', id: pilotReview.id, slug: pilotReview.slug, message: 'review piloto não possui publishedAtISO' });
  }
  if (!pilotReview.image) {
    reportError({ type: 'review', id: pilotReview.id, slug: pilotReview.slug, message: 'review piloto não possui image' });
  }
}

// Artigo com link em markdown: no texto puro fica o texto do link, sem o endereço.
const MARKDOWN_LINK_REVIEW_SLUG = 'dolce-gusto-genio-s-basic-vs-plus-vs-touch';
const MARKDOWN_LINK_TEXT = 'Adaptador NEO Start';
const MARKDOWN_LINK_HREF = '/reviews/adaptador-neo-start-o-que-e';
const markdownLinkReview = reviews.find((review) => review.slug === MARKDOWN_LINK_REVIEW_SLUG);

if (!markdownLinkReview) {
  reportError({ type: 'review', id: -1, slug: MARKDOWN_LINK_REVIEW_SLUG, message: 'review com link em markdown não encontrado' });
} else {
  const report = (message: string) =>
    reportError({ type: 'review', id: markdownLinkReview.id, slug: markdownLinkReview.slug, message });
  const sourceTexts = (markdownLinkReview.contentSections || []).flatMap((section) => [
    ...(section.paragraphs || []),
    ...(section.bullets || []),
  ]);
  const { plainTextBody } = normalizeReview(markdownLinkReview);
  if (!sourceTexts.some((text) => text.includes(`[${MARKDOWN_LINK_TEXT}](${MARKDOWN_LINK_HREF})`))) {
    report(`o artigo não tem mais o link [${MARKDOWN_LINK_TEXT}](${MARKDOWN_LINK_HREF}): troque o artigo deste teste por outro com link em markdown`);
  }
  if (!plainTextBody.includes(MARKDOWN_LINK_TEXT)) {
    report(`plainTextBody sem o texto do link "${MARKDOWN_LINK_TEXT}"`);
  }
  if (plainTextBody.includes(MARKDOWN_LINK_HREF)) {
    report(`plainTextBody com o endereço do link (${MARKDOWN_LINK_HREF})`);
  }
}

// Texto sem cara de prontuário, nos artigos em português: resposta rápida sem "R$", até 2 datas no corpo (8 com
// bodyDatesReason), nenhuma data em título, legenda ou FAQ e nenhuma seção "Nota de transparência". Os artigos
// de antes da regra ficam em scripts/review-prose-baseline.json, que só encolhe.
const proseBaseline: Record<string, ProseBaselineEntry> = proseBaselineJson;
const portugueseSlugs = new Set<string>();
for (const review of reviews) {
  if (review.locale && review.locale !== 'pt') {
    if (review.bodyDatesReason !== undefined) {
      reportError({ type: 'review', id: review.id, slug: review.slug, message: 'bodyDatesReason só vale nos artigos em português' });
    }
    continue;
  }
  portugueseSlugs.add(review.slug);
  const reason = review.bodyDatesReason;
  if (reason !== undefined && !isBodyDatesReason(reason)) {
    reportError({
      type: 'review',
      id: review.id,
      slug: review.slug,
      message: `bodyDatesReason "${reason}" fora da lista (${BODY_DATES_REASONS.join(', ')})`,
    });
    continue;
  }
  for (const problem of getProseProblems(checkReviewProse(review), reason, proseBaseline[review.slug])) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: problem });
  }
}
for (const slug of Object.keys(proseBaseline)) {
  if (!portugueseSlugs.has(slug)) {
    reportError({ type: 'review', id: -1, slug, message: 'scripts/review-prose-baseline.json cita um artigo em português que não existe' });
  }
}

// Prova das regras de texto com artigos de mentira: o que fura sem estar na lista, a lista que tolera e a que
// precisa encolher.
{
  const report = (message: string) => reportError({ type: 'review', id: -1, slug: '__review_prose__', message });
  const expectDates = (text: string, expected: number) => {
    const found = findDates(text);
    if (found.length !== expected) report(`findDates("${text}") achou ${found.length} (${found.join(', ')}), esperado ${expected}`);
  };
  expectDates('26/10/2026, 5 de outubro de 2026, 1º de novembro, outubro de 2026 e 25/11', 5);
  expectDates('1/2 xícara, 24/7, nota 8,4/10 e 3,5/10', 0);

  const prontuario = checkReviewProse({
    contentSections: [
      { heading: 'Resposta rápida', paragraphs: ['Sai por R$ 99 em 26/10/2026.'] },
      { heading: 'Preços', paragraphs: ['Lido em 27/10, 28/10 e 29/10.'], imageCaption: 'Foto de 30/10' },
      { heading: 'Nota de transparência', paragraphs: ['Texto.'] },
      { heading: 'Perguntas frequentes', bullets: ['Vale? Sim, testado em 31/10.'] },
    ],
  });
  const expected = { quickAnswerPrice: true, transparencySection: true, bodyDates: 4, datesOutsideBody: 2 };
  if (JSON.stringify(prontuario) !== JSON.stringify(expected)) {
    report(`checkReviewProse: ${JSON.stringify(prontuario)}, esperado ${JSON.stringify(expected)}`);
  }
  if (getProseProblems(prontuario, undefined).length !== 4) report('artigo fora da lista furando as 4 regras não deu 4 problemas');
  if (getProseProblems(prontuario, undefined, expected).length !== 0) report('a lista de pendentes não tolerou o que registra');
  if (getProseProblems(prontuario, 'campanha', { ...expected, bodyDates: undefined }).length !== 0) {
    report('bodyDatesReason não liberou 4 datas no corpo');
  }
  if (getProseProblems({ ...prontuario, bodyDates: 5 }, undefined, expected).length !== 1) {
    report('mais datas que a lista registra não foi barrado');
  }
  if (!getProseProblems({ ...prontuario, quickAnswerPrice: false }, undefined, expected).some((p) => p.includes('tire "quickAnswerPrice"'))) {
    report('a lista não pediu para encolher depois que o artigo melhorou');
  }
}

// ---------------------------------------------------------------------------
// Validação YesStyle i18n & Cupons Factuais (Projeto A - A6)
// ---------------------------------------------------------------------------

import {
  YESSTYLE_LOCALES,
  getYesStyleLocaleFromSlugOrPath,
  findYesStyleLocaleFromSlugOrPath,
  isYesStyleArticle,
  type YesStyleArticleKey,
} from '@/lib/i18n/clusters/yesstyle';
import { LOCALE_KEYS } from '@/lib/i18n/locales';
import { YESSTYLE_COUPONS_FACTUAL } from '@/lib/yesstyleCoupons';

// 1. Validação do registro de locales e unicidade de rotas
const registeredPathsAndSlugs = new Set<string>();

for (const key of LOCALE_KEYS) {
  const config = YESSTYLE_LOCALES[key];
  if (!config) {
    reportError({ type: 'review', id: -1, slug: '__yesstyle_cluster__', message: `Locale "${key}" ausente no registro central YESSTYLE_LOCALES` });
  } else {
    const itemsToCheck = [
      config.hubPath,
      ...config.articles.flatMap((article) => [article.slug, article.path]),
    ];
    for (const item of itemsToCheck) {
      if (registeredPathsAndSlugs.has(item)) {
        reportError({ type: 'review', id: -1, slug: '__yesstyle_cluster__', message: `Rota/slug duplicada no registro central YESSTYLE_LOCALES: "${item}"` });
      }
      registeredPathsAndSlugs.add(item);
    }
  }
}

// 2. Validação da integridade dos cupons factuais
export function isValidISODateString(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return (
    date.getUTCFullYear() === y &&
    date.getUTCMonth() + 1 === m &&
    date.getUTCDate() === d
  );
}

const nowTimestamp = new Date().getTime();

for (const coupon of YESSTYLE_COUPONS_FACTUAL) {
  if (coupon.status === 'active') {
    if (!coupon.officialSourceUrl) {
      reportError({ type: 'review', id: -1, slug: '__yesstyle_coupons__', message: `Cupom ativo "${coupon.code}" sem officialSourceUrl` });
    }
    if (!coupon.affiliateUrl) {
      reportError({ type: 'review', id: -1, slug: '__yesstyle_coupons__', message: `Cupom ativo "${coupon.code}" sem affiliateUrl` });
    }
    if (!coupon.verifiedAt || !isValidISODateString(coupon.verifiedAt)) {
      reportError({ type: 'review', id: -1, slug: '__yesstyle_coupons__', message: `Cupom ativo "${coupon.code}" com verifiedAt ausente, malformada ou calendário impossível: "${coupon.verifiedAt}"` });
    }
    if (coupon.type === 'coupon' && !coupon.expiresAt && !coupon.recheckBy) {
      reportError({ type: 'review', id: -1, slug: '__yesstyle_coupons__', message: `Cupom promocional ativo "${coupon.code}" deve possuir expiresAt ou recheckBy` });
    }
    if (coupon.expiresAt) {
      if (!isValidISODateString(coupon.expiresAt)) {
        reportError({ type: 'review', id: -1, slug: '__yesstyle_coupons__', message: `Cupom ativo "${coupon.code}" com expiresAt malformada ou calendário impossível: "${coupon.expiresAt}"` });
      } else {
        const expiryDate = new Date(`${coupon.expiresAt}T23:59:59.999Z`).getTime();
        if (expiryDate < nowTimestamp) {
          reportError({ type: 'review', id: -1, slug: '__yesstyle_coupons__', message: `Cupom ativo "${coupon.code}" expirou em ${coupon.expiresAt}` });
        }
      }
    }
    if (coupon.recheckBy) {
      if (!isValidISODateString(coupon.recheckBy)) {
        reportError({ type: 'review', id: -1, slug: '__yesstyle_coupons__', message: `Cupom ativo "${coupon.code}" com recheckBy malformada ou calendário impossível: "${coupon.recheckBy}"` });
      } else {
        const recheckDate = new Date(`${coupon.recheckBy}T23:59:59.999Z`).getTime();
        if (recheckDate < nowTimestamp) {
          reportError({ type: 'review', id: -1, slug: '__yesstyle_coupons__', message: `Cupom ativo "${coupon.code}" excedeu o prazo limite de rechecagem editorial (${coupon.recheckBy}). Re-verifique a oferta ou altere o status para expired.` });
        }
      }
    }
  }
}

// 3. Validação de paridade e isolamento dos artigos em cada tipo do cluster
// (genérico: descobre os tipos de artigo diretamente do registro central,
// em vez de assumir um número fixo de "slots" — o mesmo padrão que permitiu
// o onboarding da Shein sem quebrar o cluster da YesStyle deve valer aqui.)
const articleKeysInRegistry = new Set<string>();
for (const config of Object.values(YESSTYLE_LOCALES)) {
  for (const article of config.articles) {
    articleKeysInRegistry.add(article.key);
  }
}

const localesFoundByKey = new Map<string, Set<string>>();
for (const key of articleKeysInRegistry) {
  localesFoundByKey.set(key, new Set());
}

for (const review of reviews) {
  const matchedKeys = [...articleKeysInRegistry].filter((key) =>
    isYesStyleArticle(review.slug, key as YesStyleArticleKey)
  );

  if (matchedKeys.length === 0) continue;

  if (!review.locale) {
    reportError({ type: 'review', id: review.id, slug: review.slug, message: 'Artigo YesStyle sem campo "locale" explícito no JSON' });
  } else {
    const expectedLocale = findYesStyleLocaleFromSlugOrPath(review.slug);
    if (review.locale !== expectedLocale) {
      reportError({ type: 'review', id: review.id, slug: review.slug, message: `Campo "locale" ("${review.locale}") não coincide com o registro central ("${expectedLocale}")` });
    }
    if (review.locale !== 'pt' && review.hideFromPortugueseListings !== true) {
      reportError({ type: 'review', id: review.id, slug: review.slug, message: `Artigo internacional YesStyle (${review.locale}) deve conter "hideFromPortugueseListings: true"` });
    }
  }

  for (const key of matchedKeys) {
    const foundSet = localesFoundByKey.get(key)!;
    if (foundSet.has(review.locale || '')) {
      reportError({ type: 'review', id: review.id, slug: review.slug, message: `Locale "${review.locale}" duplicado no cluster de tipo "${key}"` });
    }
    if (review.locale) foundSet.add(review.locale);
  }
}

for (const [key, foundSet] of localesFoundByKey) {
  if (foundSet.size !== LOCALE_KEYS.length) {
    reportError({ type: 'review', id: -1, slug: '__yesstyle_cluster__', message: `Cluster de tipo "${key}" possui ${foundSet.size} de ${LOCALE_KEYS.length} idiomas` });
  }
}

// 4. Validação do resolvedor estrito fail-loud
try {
  getYesStyleLocaleFromSlugOrPath('invalid-test-slug-999');
  reportError({ type: 'review', id: -1, slug: '__yesstyle_cluster__', message: 'getYesStyleLocaleFromSlugOrPath não falhou com erro explícito para rota inválida' });
} catch (e) {
  // Comportamento esperado
}

// 5. Execução automatizada da prova de mutação factual completa
import { runYesStyleMutationTest } from './test-yesstyle-mutation';
const mutationResult = runYesStyleMutationTest();
if (!mutationResult.success) {
  for (const err of mutationResult.errors) {
    reportError({ type: 'review', id: -1, slug: '__yesstyle_mutation_test__', message: err });
  }
}

// ---------------------------------------------------------------------------
// Resumo
// ---------------------------------------------------------------------------

const isVerbose = process.argv.includes('--verbose');

function countWarningsByPrefix(prefix: string): number {
  return warnings.filter((warning) => warning.message.startsWith(prefix)).length;
}

function printWarningSummary(): void {
  const categories = [
    { label: 'receitas sem publishedAt', prefix: 'receita sem publishedAt' },
    { label: 'receitas sem imageAlt', prefix: 'receita sem imageAlt' },
    { label: 'reviews sem publishedAtISO', prefix: 'review sem publishedAtISO' },
    { label: 'reviews produto sem verdict.stars', prefix: 'review de produto sem verdict.stars' },
    { label: 'reviews produto sem productSpec', prefix: 'review de produto sem productSpec' },
    { label: 'reviews produto sem cta completo', prefix: 'review de produto sem cta completo' },
  ];

  console.warn(`⚠️  ${warnings.length} aviso(s) encontrado(s):`);
  for (const category of categories) {
    const count = countWarningsByPrefix(category.prefix);
    if (count > 0) {
      console.warn(`  - ${category.label}: ${count}`);
    }
  }
}

function printWarningDetails(): void {
  for (const warning of warnings) {
    console.warn(`  [${warning.type.toUpperCase()}] id=${warning.id} slug="${warning.slug}" — ${warning.message}`);
  }
}

console.log(`Validados ${recipes.length} receitas e ${reviews.length} reviews.`);

if (warnings.length > 0) {
  printWarningSummary();
  if (isVerbose) {
    console.warn('  Detalhes:');
    printWarningDetails();
  } else {
    console.warn('  Use --verbose para listar todos os warnings.');
  }
}

if (errors.length === 0) {
  console.log('✅ Nenhuma inconsistência encontrada.');
  process.exit(0);
} else {
  console.error(`❌ ${errors.length} erro(s) encontrado(s):`);
  for (const error of errors) {
    console.error(`  [${error.type.toUpperCase()}] id=${error.id} slug="${error.slug}" — ${error.message}`);
  }
  process.exit(1);
}
