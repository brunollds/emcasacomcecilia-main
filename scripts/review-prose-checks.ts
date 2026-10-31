// Regras de texto dos artigos em português contra a "cara de prontuário" (vault, REGRAS-GLOBAIS seções 6 e 7):
// resposta rápida sem preço, poucas datas no corpo e nenhuma seção "Nota de transparência". O validate:content
// usa estas funções com a lista de pendentes (review-prose-baseline.json), que só pode encolher.
import { isFaqHeading } from '../src/lib/faq';
import type { BodyDatesReason, ContentSection } from '../src/lib/content/types';

export const BODY_DATES_REASONS = ['campanha', 'prazo-entrega', 'reclame-aqui'] as const satisfies readonly BodyDatesReason[];
export const MAX_BODY_DATES = 2;
export const MAX_BODY_DATES_WITH_REASON = 8;

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
