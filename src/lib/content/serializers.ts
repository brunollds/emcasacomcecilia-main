// Serializers — transformam dados canônicos em representações usadas por
// schema.org, templates e APIs externas.

import type {
  InstructionSection,
  PersonRef,
  Recipe,
  StructuredIngredientItem,
  StructuredIngredientSection,
} from './types';

/**
 * Converte um ingrediente estruturado em texto legível.
 * Exemplo: { qty: 2.5, unit: 'xíc.', name: 'farinha', note: 'peneirada' }
 *          → "2½ xíc. de farinha (peneirada)"
 */
export function structuredIngredientToText(item: StructuredIngredientItem): string {
  const note = item.note ? ` (${item.note})` : '';

  if (item.qty === 0) {
    return `${item.name}${item.unit ? ` ${item.unit}` : ''}${note}`;
  }

  const qty = formatQuantity(item.qty);
  const separator = ' de ';
  return `${qty} ${item.unit}${separator}${item.name}${note}`;
}

/**
 * Formata uma quantidade numérica como string legível.
 * Frações comuns são convertidas para caracteres Unicode.
 */
export function formatQuantity(qty: number): string {
  if (Number.isInteger(qty)) return String(qty);

  const fractions: Record<string, string> = {
    '0.25': '¼',
    '0.5': '½',
    '0.75': '¾',
    '0.333': '⅓',
    '0.667': '⅔',
    '0.125': '⅛',
    '0.375': '⅜',
    '0.625': '⅝',
    '0.875': '⅞',
    '0.063': '1/16',
  };

  const rounded = Math.round(qty * 1000) / 1000;
  const integerPart = Math.floor(rounded);
  const decimalPart = rounded - integerPart;

  if (decimalPart === 0) return String(integerPart);

  const key = String(Math.round(decimalPart * 1000) / 1000);
  const fractionChar = fractions[key];

  if (fractionChar) {
    if (integerPart === 0) return fractionChar;
    return fractionChar.includes('/')
      ? `${integerPart} ${fractionChar}`
      : `${integerPart}${fractionChar}`;
  }

  return String(qty).replace('.', ',');
}

/**
 * Achata ingredientes estruturados em strings para schema.org/Recipe.
 * Se não houver ingredientes estruturados, retorna array vazio.
 */
export function flattenStructuredIngredients(
  sections?: StructuredIngredientSection[]
): string[] {
  if (!sections || sections.length === 0) return [];
  return sections.flatMap((section) =>
    section.items.map((item) => structuredIngredientToText(item))
  );
}

/**
 * Achata as seções legadas, cujos ingredientes já são strings.
 */
export function flattenLegacyIngredients(
  sections: Recipe['ingredients']
): string[] {
  return sections.flatMap((section) => section.items);
}

/**
 * Achata grupos de instrução em uma lista plana de strings.
 */
export function flattenInstructionGroups(groups: InstructionSection[]): string[] {
  return groups.flatMap((group) => group.steps);
}

/**
 * Converte minutos numéricos para duração ISO 8601 (ex: PT15M, PT1H30M).
 * Retorna undefined se o valor não for um número finito positivo.
 */
export function minutesToIsoDuration(minutes?: number | null): string | undefined {
  if (minutes === null || minutes === undefined) return undefined;
  if (!Number.isFinite(minutes) || minutes <= 0) return undefined;

  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);

  let iso = 'PT';
  if (hours > 0) iso += `${hours}H`;
  if (mins > 0) iso += `${mins}M`;

  return iso === 'PT' ? undefined : iso;
}

/**
 * Calcula totalMinutes a partir de prepMinutes + cookMinutes.
 * Retorna null se ambos forem indefinidos ou inválidos.
 */
export function computeTotalMinutes(recipe: Recipe): number | null {
  const prep = typeof recipe.prepMinutes === 'number' ? recipe.prepMinutes : null;
  const cook = typeof recipe.cookMinutes === 'number' ? recipe.cookMinutes : null;

  if (prep === null && cook === null) return null;

  const total = (prep ?? 0) + (cook ?? 0);
  return total > 0 ? total : null;
}

/**
 * Resolve o tempo total priorizando o total editorial explícito. Isso preserva
 * períodos passivos, como descanso, fermentação, marinada e resfriamento, que
 * não aparecem na soma prepMinutes + cookMinutes.
 */
export function resolveTotalMinutes(recipe: Recipe): number | null {
  return (
    parseMinutesFromText(recipe.totalTime) ??
    computeTotalMinutes(recipe) ??
    sumParsedTimes(recipe.prepTime, recipe.cookTime)
  );
}

function sumParsedTimes(prepTime: string, cookTime: string): number | null {
  const prep = parseMinutesFromText(prepTime);
  const cook = parseMinutesFromText(cookTime);

  if (prep === null && cook === null) return null;
  return (prep ?? 0) + (cook ?? 0);
}

/**
 * Tenta extrair minutos de uma string legada de tempo.
 * Exemplos: "15 min" → 15; "1h 20 min" → 80; "1h" → 60.
 * Retorna null quando não for possível interpretar com segurança.
 */
export function parseMinutesFromText(timeText: string): number | null {
  if (!timeText || typeof timeText !== 'string') return null;

  const hoursMatch = timeText.match(/(\d+)\s*h/i);
  const minutesMatch = timeText.match(/(\d+)\s*min/i);

  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

  if (hours === 0 && minutes === 0) return null;

  return hours * 60 + minutes;
}

/**
 * Extrai apenas o texto de uma seção de review para TTS ou medição.
 */
export function contentSectionsToPlainText(
  sections: { heading?: string; paragraphs?: string[]; bullets?: string[]; emphasis?: string }[]
): string {
  return sections
    .flatMap((section) => [
      section.heading,
      ...(section.paragraphs || []),
      ...(section.bullets || []),
      section.emphasis,
    ])
    .filter(Boolean)
    .join(' ');
}

/**
 * Converte um heading em um id de âncora seguro para URLs.
 * Remove acentos, caracteres especiais e limita o comprimento.
 */
export function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/**
 * Gera ids únicos para cada seção com heading.
 * Retorna um Map onde a chave é o heading original e o valor é o id.
 */
export function generateSectionIds(
  sections: { heading?: string }[]
): Map<string, string> {
  const ids = new Map<string, string>();
  const counts = new Map<string, number>();

  for (const section of sections) {
    if (!section.heading) continue;

    let base = slugifyHeading(section.heading);
    if (!base) base = 'secao';

    const count = counts.get(base) ?? 0;
    const id = count === 0 ? base : `${base}-${count}`;
    counts.set(base, count + 1);
    ids.set(section.heading, id);
  }

  return ids;
}

interface SchemaPerson {
  '@type': 'Person';
  name: string;
  url?: string;
}

const SITE_URL = 'https://emcasacomcecilia.com';

function toAbsoluteSiteUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('/')) return `${SITE_URL}${url}`;
  return url;
}

/**
 * Constrói o campo `author` de schema.org a partir de `authors` ou `author`.
 * Suporta múltiplos autores e fallback para Cecília Mauad /sobre.
 * Não inventa dados quando os campos estão ausentes.
 */
export function buildSchemaAuthors(
  authors: PersonRef[] | undefined,
  author: PersonRef | undefined
): SchemaPerson | SchemaPerson[] {
  const source = authors && authors.length > 0
    ? authors
    : author
      ? [author]
      : [];

  if (source.length === 0) {
    return { '@type': 'Person', name: 'Cecília Mauad', url: `${SITE_URL}/sobre` };
  }

  const people = source.map((person) => ({
    '@type': 'Person' as const,
    name: person.name,
    ...(person.url ? { url: toAbsoluteSiteUrl(person.url) } : {}),
  }));

  return people.length === 1 ? people[0] : people;
}

/**
 * Formata uma data ISO 8601 (YYYY-MM-DD) para exibição editorial em pt-BR.
 * Exemplo: "2026-06-11" → "11 de junho de 2026"
 * Retorna a própria string se não for uma data válida.
 * A data é interpretada como local, sem conversão de fuso horário.
 */
export function formatDate(isoDate: string): string {
  const parts = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!parts) return isoDate;

  const year = Number(parts[1]);
  const month = Number(parts[2]) - 1;
  const day = Number(parts[3]);

  const date = new Date(year, month, day);
  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return isoDate;
  }

  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ];

  return `${day} de ${months[month]} de ${year}`;
}
