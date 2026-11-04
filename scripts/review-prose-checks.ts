// Regras de texto dos artigos em português contra a "cara de prontuário" (vault, REGRAS-GLOBAIS seções 6 e 7):
// resposta rápida sem preço, poucas datas no corpo e nenhuma seção "Nota de transparência". O validate:content
// usa estas funções com a lista de pendentes (review-prose-baseline.json), que só pode encolher.
import { isFaqHeading } from '../src/lib/faq';
import type { BodyDatesReason, ContentSection } from '../src/lib/content/types';

export const BODY_DATES_REASONS = ['campanha', 'prazo-entrega', 'reclame-aqui'] as const satisfies readonly BodyDatesReason[];
export const MAX_BODY_DATES = 2;
export const MAX_BODY_DATES_WITH_REASON = 8;
// O subtítulo (description) sai embaixo do título, no JSON-LD, no llms.txt e no começo do "Ouvir": uma ou duas
// frases, não o sumário do artigo. Vale para todos os idiomas.
export const MAX_DESCRIPTION_LENGTH = 180;

const MONTHS = 'janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro';
// 26/10, 26/10/2026, 5 de outubro (de 2026), 1º de novembro e outubro de 2026. O mês numérico tem dois
// dígitos para não pegar "1/2" nem "24/7", e número antes ("8,4/10") é nota, não data.
const DATE_PATTERN = new RegExp(
  [
    String.raw`(?<![\d,.])\b(?:0?[1-9]|[12]\d|3[01])/(?:0[1-9]|1[0-2])(?:/\d{2,4})?\b`,
    String.raw`\b\d{1,2}º? de (?:${MONTHS})(?: de \d{4})?\b`,
    String.raw`\b(?:${MONTHS}) de \d{4}\b`,
  ].join('|'),
  'gi'
);

export function findDates(text: string): string[] {
  return [...text.matchAll(DATE_PATTERN)].map((match) => match[0]);
}

export interface ProseFindings {
  quickAnswerPrice: boolean;
  transparencySection: boolean;
  bodyDates: number;
  /** Datas em título de seção, legenda de foto ou FAQ: nenhuma é aceita. */
  datesOutsideBody: number;
}

interface ProseReview {
  contentSections?: ContentSection[];
}

function bodyTexts(section: ContentSection): string[] {
  const table = section.comparisonTable;
  return [
    ...(section.paragraphs ?? []),
    ...(section.bullets ?? []),
    ...(section.postParagraphs ?? []),
    section.emphasis ?? '',
    section.notice ?? '',
    ...(section.accordionBlock?.paragraphs ?? []),
    ...(table ? [table.caption ?? '', ...table.headers, ...table.rows.flat()] : []),
  ];
}

function captionTexts(section: ContentSection): string[] {
  const image = typeof section.image === 'object' ? section.image : undefined;
  return [
    section.heading ?? '',
    section.accordionBlock?.heading ?? '',
    section.imageCaption ?? '',
    image?.caption ?? '',
    ...(section.images ?? []).map((item) => item.caption ?? ''),
  ];
}

const countDates = (texts: string[]) => texts.reduce((total, text) => total + findDates(text).length, 0);

export function checkReviewProse(review: ProseReview): ProseFindings {
  const sections = review.contentSections ?? [];
  const quickAnswer = /^resposta rápida/i.test(sections[0]?.heading ?? '') ? sections[0] : undefined;
  let bodyDates = 0;
  let datesOutsideBody = 0;
  for (const section of sections) {
    if (section.heading && isFaqHeading(section.heading)) {
      datesOutsideBody += countDates([...bodyTexts(section), ...captionTexts(section)]);
      continue;
    }
    bodyDates += countDates(bodyTexts(section));
    datesOutsideBody += countDates(captionTexts(section));
  }
  return {
    quickAnswerPrice: quickAnswer
      ? [...(quickAnswer.paragraphs ?? []), ...(quickAnswer.bullets ?? []), ...(quickAnswer.postParagraphs ?? []), quickAnswer.emphasis ?? ''].some(
          (text) => text.includes('R$')
        )
      : false,
    transparencySection: sections.some((section) => /nota de transparência/i.test(section.heading ?? '')),
    bodyDates,
    datesOutsideBody,
  };
}

export type ProseBaselineEntry = Partial<ProseFindings>;

export function isBodyDatesReason(value: unknown): value is BodyDatesReason {
  return typeof value === 'string' && (BODY_DATES_REASONS as readonly string[]).includes(value);
}

/**
 * O que o artigo fura, descontado o que a lista de pendentes ainda tolera. Item da lista que já não é preciso
 * (o artigo melhorou) também é problema: a lista só encolhe, e quem corrige o artigo baixa a entrada dele.
 */
export function getProseProblems(findings: ProseFindings, reason: BodyDatesReason | undefined, baseline?: ProseBaselineEntry): string[] {
  const problems: string[] = [];
  const maxDates = reason ? MAX_BODY_DATES_WITH_REASON : MAX_BODY_DATES;
  const datesOver = findings.bodyDates > maxDates ? findings.bodyDates : 0;

  if (findings.quickAnswerPrice && !baseline?.quickAnswerPrice) {
    problems.push('resposta rápida com "R$": preço vai no corpo, não no resumo');
  }
  if (findings.transparencySection && !baseline?.transparencySection) {
    problems.push('seção "Nota de transparência" no corpo: a nota sai no cabeçalho, pelo editorialNote');
  }
  if (datesOver > (baseline?.bodyDates ?? 0)) {
    problems.push(
      `${findings.bodyDates} datas no corpo, máximo ${maxDates}` +
        (reason ? ` (bodyDatesReason "${reason}")` : '; campanha, prazo de entrega ou Reclame Aqui pedem "bodyDatesReason"')
    );
  }
  if (findings.datesOutsideBody > (baseline?.datesOutsideBody ?? 0)) {
    problems.push(`${findings.datesOutsideBody} data(s) em título de seção, legenda de foto ou FAQ, onde não entra data`);
  }

  if (baseline) {
    const stale: string[] = [];
    if (baseline.quickAnswerPrice && !findings.quickAnswerPrice) stale.push('tire "quickAnswerPrice"');
    if (baseline.transparencySection && !findings.transparencySection) stale.push('tire "transparencySection"');
    if (baseline.bodyDates !== undefined && datesOver < baseline.bodyDates) {
      stale.push(datesOver === 0 ? 'tire "bodyDates"' : `baixe "bodyDates" para ${datesOver}`);
    }
    if (baseline.datesOutsideBody !== undefined && findings.datesOutsideBody < baseline.datesOutsideBody) {
      stale.push(
        findings.datesOutsideBody === 0 ? 'tire "datesOutsideBody"' : `baixe "datesOutsideBody" para ${findings.datesOutsideBody}`
      );
    }
    if (stale.length > 0) problems.push(`o artigo melhorou: em scripts/review-prose-baseline.json, ${stale.join(', ')}`);
  }
  return problems;
}

/** A entrada da lista de pendentes que o artigo precisaria hoje (vazia: ele não fura nada). */
export function toBaselineEntry(findings: ProseFindings, reason: BodyDatesReason | undefined): ProseBaselineEntry {
  const maxDates = reason ? MAX_BODY_DATES_WITH_REASON : MAX_BODY_DATES;
  return {
    ...(findings.quickAnswerPrice ? { quickAnswerPrice: true } : {}),
    ...(findings.transparencySection ? { transparencySection: true } : {}),
    ...(findings.bodyDates > maxDates ? { bodyDates: findings.bodyDates } : {}),
    ...(findings.datesOutsideBody > 0 ? { datesOutsideBody: findings.datesOutsideBody } : {}),
  };
}

// Snippet (metaDescription) dos artigos em português com código de loja: o Google corta perto de 120 caracteres no
// celular, e a venda vem de quem lê o código no resultado, sem clicar. O validate:content usa estas funções com a
// lista de pendentes (review-snippet-baseline.json), que só pode encolher.
export const MAX_SNIPPET_LENGTH = 155;
/** O código tem de terminar até este caractere. */
export const SNIPPET_CODE_END = 100;

// Fora da regra, cada um com o motivo.
export const SNIPPET_EXCEPTION_STORES: Record<string, string> = {
  magalu: 'a loja inteira ficou fora das fases 2b e 2c (handoff de 04/11/2026)',
};
export const SNIPPET_EXCEPTION_SLUGS: Record<string, string> = {
  'dominio-hostinger-comprar-transferir-ou-fora': 'o SONAR20 não vale em domínio',
  'le-creuset-original-como-saber': 'ficou fora da lista da fase 2b',
  'protetor-de-silicone-mamilo-como-usar': 'ficou fora da lista da fase 2b',
  'sutia-de-silicone-invisivel-como-usar': 'ficou fora da lista da fase 2b',
  'shein-reclame-aqui-nota-reputacao': 'ficou fora da lista da fase 2b',
  'yesstyle-trustpilot-nota-reclamacoes': 'ficou fora da lista da fase 2b',
};

export const SNIPPET_PROBLEMS = {
  missing: 'sem metaDescription',
  noCode: 'sem o código da loja',
  codeLate: `o código termina depois do caractere ${SNIPPET_CODE_END}`,
  noPercent: 'sem o % do desconto ("10%" ou "até 10%")',
  tooLong: `mais de ${MAX_SNIPPET_LENGTH} caracteres`,
  date: 'data com dia (o ano da Black Friday pode ficar; o dia e o mês, não)',
  price: 'preço em R$ (na Dolce Gusto, só "a partir de R$ 100")',
  opensWithCoupon: 'abre com "Cupom <loja>": alterne a abertura ("O cupom X dá…", "Com o X…")',
  rewardCalledCoupon: 'CECILIA010 é código de recompensa, não "cupom CECILIA010"',
  sheinPercent: 'SHEIN sem "%": o código se pesquisa no app',
  sheinBrasil: 'SHEIN sem "SHEIN Brasil"',
} as const;
export type SnippetProblem = keyof typeof SNIPPET_PROBLEMS;

export function isSnippetProblem(value: unknown): value is SnippetProblem {
  return typeof value === 'string' && Object.hasOwn(SNIPPET_PROBLEMS, value);
}

interface SnippetReview {
  slug: string;
  locale?: string;
  coupon?: string;
  affiliate?: string;
  metaDescription?: string;
}

/** Artigo que a regra cobre: em português, com código e fora das exceções. */
export function isSnippetChecked(review: SnippetReview): boolean {
  if (review.locale && review.locale !== 'pt') return false;
  if (!review.coupon) return false;
  if (review.affiliate && Object.hasOwn(SNIPPET_EXCEPTION_STORES, review.affiliate)) return false;
  return !Object.hasOwn(SNIPPET_EXCEPTION_SLUGS, review.slug);
}

const MONTH_YEAR = new RegExp(String.raw`^(?:${MONTHS}) de \d{4}$`, 'i');

export function checkSnippet(review: SnippetReview): SnippetProblem[] {
  const text = review.metaDescription?.trim() ?? '';
  if (!text) return ['missing'];
  const code = review.coupon ?? '';
  const store = review.affiliate;
  const problems: SnippetProblem[] = [];

  const at = text.indexOf(code);
  if (at < 0) problems.push('noCode');
  else if ([...text.slice(0, at)].length + [...code].length > SNIPPET_CODE_END) problems.push('codeLate');
  if (store === 'shein') {
    if (text.includes('%')) problems.push('sheinPercent');
    if (/shein brasil/i.test(text)) problems.push('sheinBrasil');
  } else if (!/\d+(?:[.,]\d+)?\s?%/.test(text)) {
    problems.push('noPercent');
  }
  if ([...text].length > MAX_SNIPPET_LENGTH) problems.push('tooLong');
  // "novembro de 2026" é o mês da validade, não data; "05/11" e "5 de novembro" são.
  if (findDates(text).some((found) => !MONTH_YEAR.test(found))) problems.push('date');
  const priced = store === 'dolce-gusto' ? text.replace(/a partir de R\$\s?100\b/gi, '') : text;
  if (priced.includes('R$')) problems.push('price');
  if (/^cupom\s/i.test(text)) problems.push('opensWithCoupon');
  if (store === 'yesstyle' && /cupom\s+CECILIA010/i.test(text)) problems.push('rewardCalledCoupon');
  return problems;
}

/**
 * O que o snippet fura, descontado o que a lista de pendentes ainda tolera. Problema da lista que já não existe
 * (o artigo melhorou) também é problema: quem corrige o artigo tira a entrada dele.
 */
export function getSnippetProblems(found: SnippetProblem[], baseline?: readonly string[]): string[] {
  const tolerated = new Set(baseline ?? []);
  const problems = found.filter((problem) => !tolerated.has(problem)).map((problem) => `snippet (metaDescription): ${SNIPPET_PROBLEMS[problem]}`);
  if (baseline) {
    const stale = baseline.filter((problem) => !found.includes(problem as SnippetProblem));
    if (stale.length > 0) {
      problems.push(
        stale.length === baseline.length
          ? 'o artigo melhorou: tire a entrada dele de scripts/review-snippet-baseline.json'
          : `o artigo melhorou: em scripts/review-snippet-baseline.json, tire ${stale.map((problem) => `"${problem}"`).join(', ')}`
      );
    }
  }
  return problems;
}
