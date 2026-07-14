/**
 * Line anchor — identifica uma linha específica dentro de uma seção de conteúdo.
 * Formato: "S{sectionIndex}:L{lineNumber}" onde sectionIndex é 0-based e lineNumber é 1-based.
 * Exemplo: "S2:L7" = seção 2 (3ª seção), linha 7 (medida em referência 720px).
 */
export interface LineAnchor {
  /** Index da seção (0-based) onde a linha está. */
  sectionIndex: number;
  /** Número da linha dentro da seção (1-based). */
  lineNumber: number;
}

const LINE_ANCHOR_PATTERN = /^S(\d+):L(\d+)$/;

/**
 * Analisa uma string de âncora de linha e retorna LineAnchor ou null.
 * Aceita apenas o formato "S{sectionIndex}:L{lineNumber}" (ex: "S2:L7").
 * Rejeita section ids como "ingredientes" ou formatos inválidos.
 */
export function parseLineAnchor(anchor: string): LineAnchor | null {
  const match = anchor.match(LINE_ANCHOR_PATTERN);
  if (!match) return null;

  const sectionIndex = parseInt(match[1], 10);
  const lineNumber = parseInt(match[2], 10);

  return { sectionIndex, lineNumber };
}

/**
 * Serializa um LineAnchor para sua representação em string.
 * Produz formato "S{sectionIndex}:L{lineNumber}".
 */
export function stringifyLineAnchor(sectionIndex: number, lineNumber: number): string {
  return `S${sectionIndex}:L${lineNumber}`;
}

/**
 * Verifica se uma string é um âncora de linha válida.
 * Retorna true apenas para formato "S{sectionIndex}:L{lineNumber}".
 */
export function isLineAnchor(anchor: string): boolean {
  return parseLineAnchor(anchor) !== null;
}
