import { parseReviewCategory, type ReviewCategory } from './reviewDiscovery';

// A estante de artigos de /reviews e das subpáginas de loja: o que vale no servidor e no navegador
// (tipos, tamanhos de página, busca, ordem, endereço, textos da busca e medição). Não importa dados: o
// componente cliente usa daqui, e os artigos chegam prontos de reviewsHub.ts, que fica no servidor.

export type ShelfArticle = {
  id: number;
  slug: string;
  href: string;
  title: string;
  type: string;
  category: ReviewCategory;
  publishedAtISO: string;
  // DD/MM nas Novidades; DD/MM/AAAA no acervo, que atravessa anos.
  dayMonth: string;
  fullDate: string;
  // Nome da loja, quando o artigo é de uma loja ativa.
  store?: string;
  // URL de entrega, já resolvida.
  image?: string;
  imageFit: 'cover' | 'contain';
  imagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  isNew: boolean;
  // Texto de busca já normalizado (foldSearchText).
  searchText: string;
};

export type ShelfCategory = { value: ReviewCategory; label: string };

export type ShelfStore = {
  slug: string;
  brand: string;
  // URL de entrega do logo; sem ele, a bolinha mostra as iniciais.
  logo?: string;
  initials: string;
  total: number;
  href: string;
  countLabel: string;
};

export type ShelfOrder = 'novos' | 'az';
export type ShelfView = 'grade' | 'lista';
export type ShelfQuery = { q: string; category: ReviewCategory | null; order: ShelfOrder };

export type ShelfSearch = {
  label: string;
  placeholder: string;
  // Para onde a busca sem resultado leva: o site todo (/buscar) ou todos os guias e análises.
  scope: 'site' | 'reviews';
};

export const GRID_PAGE_SIZE = 12;
export const LIST_PAGE_SIZE = 24;

export function pageSizeOf(view: ShelfView): number {
  return view === 'lista' ? LIST_PAGE_SIZE : GRID_PAGE_SIZE;
}

// Na troca de modo a pessoa não perde o ponto: fica a maior entre a quantidade aberta e a primeira
// página do modo novo.
export function visibleAfterViewChange(visible: number, view: ShelfView): number {
  return Math.max(visible, pageSizeOf(view));
}

export function foldSearchText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export function searchWords(query: string): string[] {
  const folded = foldSearchText(query);
  return folded ? folded.split(' ') : [];
}

export function isSearching(query: ShelfQuery): boolean {
  return searchWords(query.q).length > 0;
}

const titleCollator = new Intl.Collator('pt-BR', { sensitivity: 'base', numeric: true });

function newestFirst(left: ShelfArticle, right: ShelfArticle): number {
  return right.publishedAtISO.localeCompare(left.publishedAtISO) || right.id - left.id;
}

function byTitle(left: ShelfArticle, right: ShelfArticle): number {
  return titleCollator.compare(left.title, right.title) || newestFirst(left, right);
}

export function sortShelf(articles: readonly ShelfArticle[], order: ShelfOrder): ShelfArticle[] {
  return [...articles].sort(order === 'az' ? byTitle : newestFirst);
}

// O artigo entra se for da categoria escolhida e tiver todas as palavras da busca.
export function filterShelf(articles: readonly ShelfArticle[], query: ShelfQuery): ShelfArticle[] {
  const words = searchWords(query.q);
  return sortShelf(
    articles.filter(
      (article) =>
        (!query.category || article.category === query.category) &&
        words.every((word) => article.searchText.includes(word))
    ),
    query.order
  );
}

const SHELF_PARAMS = ['q', 'categoria', 'ordem'];

// Categoria que a página não tem (a loja não tem artigo nela) vale como "Todos".
export function parseShelfQuery(search: string, categories: readonly ReviewCategory[]): ShelfQuery {
  const params = new URLSearchParams(search);
  const category = parseReviewCategory(params.get('categoria'));
  return {
    q: params.get('q') ?? '',
    category: category && categories.includes(category) ? category : null,
    order: params.get('ordem') === 'az' ? 'az' : 'novos',
  };
}

// A query string da estante: a busca como foi digitada (sem ela quando só tem espaço), a categoria e a
// ordem, só quando não é a padrão.
export function shelfSearch(query: ShelfQuery): string {
  const params = new URLSearchParams();
  if (query.q.trim()) params.set('q', query.q);
  if (query.category) params.set('categoria', query.category);
  if (query.order === 'az') params.set('ordem', 'az');
  const text = params.toString();
  return text ? `?${text}` : '';
}

// A query string nova da página: troca só os parâmetros da estante e mantém os outros (utm_*, por
// exemplo).
export function withShelfQuery(currentSearch: string, next: ShelfQuery): string {
  const params = new URLSearchParams(currentSearch);
  for (const key of SHELF_PARAMS) params.delete(key);
  new URLSearchParams(shelfSearch(next)).forEach((value, key) => params.set(key, value));
  const text = params.toString();
  return text ? `?${text}` : '';
}

export function siteSearchHref(q: string): string {
  return `/buscar?${new URLSearchParams({ q: q.trim() })}`;
}

export function reviewsSearchHref(q: string): string {
  return `/reviews?${new URLSearchParams({ q: q.trim() })}`;
}

export function countLabel(total: number): string {
  return total === 1 ? '1 artigo' : `${total} artigos`;
}

export function resultsLabel(total: number, q: string): string {
  const term = q.trim();
  return term ? `${countLabel(total)} com “${term}”` : countLabel(total);
}

export function emptySearchMessage(q: string): string {
  return `Nenhum artigo com “${q.trim()}”.`;
}

export type EmptySearchAction =
  | { kind: 'all-categories'; label: string }
  | { kind: 'link'; href: string; label: string };

// O botão principal da busca sem resultado: com uma categoria marcada, desmarcá-la; senão, buscar o
// mesmo termo num lugar maior.
export function getEmptySearchAction(
  q: string,
  scope: ShelfSearch['scope'],
  category: ReviewCategory | null
): EmptySearchAction {
  if (category) return { kind: 'all-categories', label: 'Buscar em todas as categorias' };
  const term = q.trim();
  return scope === 'reviews'
    ? { kind: 'link', href: reviewsSearchHref(term), label: `Buscar “${term}” em todos os guias e análises` }
    : { kind: 'link', href: siteSearchHref(term), label: `Buscar “${term}” no site todo` };
}

// Medição (GA4). reviews_route_click é o par do home_route_click; a busca usa o evento recomendado
// search, e reviews_list_control registra categoria, ordem e modo.
export type ShelfPlacement =
  | 'reviews_new'
  | 'reviews_stores'
  | 'reviews_grid'
  | 'reviews_list'
  | 'store_grid'
  | 'store_list'
  | 'store_other_stores'
  | 'store_all_reviews';

export const REVIEWS_ROUTE_CLICK = 'reviews_route_click';
export const SHELF_CONTROL_EVENT = 'reviews_list_control';
export const SHELF_SEARCH_EVENT = 'search';
// A busca vai para o Analytics quando a pessoa para de digitar por 1,5 s.
export const SEARCH_EVENT_DELAY_MS = 1500;
const SEARCH_EVENT_MIN_LENGTH = 2;

const SHELF_PLACEMENTS = {
  reviews: { grade: 'reviews_grid', lista: 'reviews_list' },
  store: { grade: 'store_grid', lista: 'store_list' },
} as const;

export function shelfPlacement(prefix: 'reviews' | 'store', view: ShelfView): ShelfPlacement {
  return SHELF_PLACEMENTS[prefix][view];
}

export function getReviewsRouteClickParameters({
  href,
  placement,
  linkLabel,
}: {
  href: string;
  placement: ShelfPlacement;
  linkLabel: string;
}) {
  return { destination: href, placement, link_label: linkLabel };
}

export function getShelfSearchParameters({
  q,
  resultsCount,
  listPath,
}: {
  q: string;
  resultsCount: number;
  listPath: string;
}) {
  return { search_term: q.trim(), results_count: resultsCount, list_path: listPath };
}

export function getShelfControlParameters({
  control,
  value,
  listPath,
}: {
  control: 'category' | 'sort' | 'view';
  value: string;
  listPath: string;
}) {
  return { control, value, list_path: listPath };
}

// Com pelo menos 2 letras ou números (pontuação e espaço não contam) e sem repetir o termo anterior
// (lastTracked já normalizado).
export function shouldTrackSearch(q: string, lastTracked: string | null): boolean {
  const folded = foldSearchText(q);
  const lettersAndDigits = folded.replace(/[^\p{L}\p{N}]/gu, '');
  return lettersAndDigits.length >= SEARCH_EVENT_MIN_LENGTH && folded !== lastTracked;
}
