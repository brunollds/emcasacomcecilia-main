// Rolagem horizontal no sentido da leitura. A direção é a efetiva do elemento que rola, não a do documento. A posição
// vai de 0 no início da leitura a scrollWidth - clientWidth no fim, nas duas direções: em RTL o navegador dá
// scrollLeft 0 no início e negativo dali em diante. Sem imports: serve a componentes cliente e aos testes.

export function isRtl(element: Element): boolean {
  return getComputedStyle(element).direction === 'rtl';
}

export function readingScroll(scroller: HTMLElement): number {
  return isRtl(scroller) ? Math.max(0, -scroller.scrollLeft) : scroller.scrollLeft;
}

export function hasMoreAtStart(scroller: HTMLElement, tolerance = 1): boolean {
  return readingScroll(scroller) > tolerance;
}

export function hasMoreAtEnd(scroller: HTMLElement, tolerance = 1): boolean {
  return readingScroll(scroller) + scroller.clientWidth < scroller.scrollWidth - tolerance;
}

// `amount` positivo anda para o fim da leitura; negativo volta.
export function scrollByReading(scroller: HTMLElement, amount: number, behavior: ScrollBehavior): void {
  scroller.scrollBy({ left: isRtl(scroller) ? -amount : amount, behavior });
}

export function scrollToReading(scroller: HTMLElement, position: number, behavior: ScrollBehavior): void {
  // Em RTL o scrollLeft vai de 0 a negativo: posição abaixo de 0 não pode virar deslocamento para fora do início.
  scroller.scrollTo({ left: isRtl(scroller) ? -Math.max(0, position) : position, behavior });
}

// Distância do início do conteúdo que rola até o início do filho, pelo offsetLeft: ignora o transform da entrada das
// bolinhas, que o getBoundingClientRect pegaria.
export function readingOffset(scroller: HTMLElement, child: HTMLElement): number {
  const base = child.offsetParent === scroller ? 0 : scroller.offsetLeft + scroller.clientLeft;
  const left = child.offsetLeft - base;
  return isRtl(scroller) ? scroller.clientWidth - left - child.offsetWidth : left;
}
