'use client';

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { flushSync } from 'react-dom';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LayoutGrid, List, Search, X } from 'lucide-react';
import { ReviewShelfCard, ReviewShelfRow } from '@/components/reviews/ReviewShelfCard';
import { SHELF_CONTAINER, SHELF_TITLE } from '@/components/reviews/shelfClasses';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { RevealSection } from '@/components/ui/RevealSection';
import { trackEvent } from '@/lib/analytics';
import type { ReviewCategory } from '@/lib/reviewDiscovery';
import {
  GRID_PAGE_SIZE,
  SEARCH_EVENT_DELAY_MS,
  SHELF_CONTROL_EVENT,
  SHELF_SEARCH_EVENT,
  draftValue,
  emptySearchMessage,
  filterShelf,
  firstPage,
  foldSearchText,
  freshDraft,
  getEmptySearchAction,
  getShelfControlParameters,
  getShelfSearchParameters,
  hasSearchText,
  isOnList,
  isSearchWriteDue,
  isSearching,
  pageSizeOf,
  readShelfQuery,
  rebaseDraft,
  resultsLabel,
  searchWriteDelay,
  settlePage,
  shelfPlacement,
  shelfSearch,
  shouldTrackSearch,
  urlSearchOf,
  visibleAfterViewChange,
  withShelfQuery,
  type SearchDraft,
  type ShelfArticle,
  type ShelfCategory,
  type ShelfOrder,
  type ShelfQuery,
  type ShelfSearch,
  type ShelfView,
} from '@/lib/reviewsShelf';
import { sanitizeViewTransitionName } from '@/lib/viewTransition';

// A estante de /reviews e das subpáginas de loja: a busca, as categorias, a ordem, a grade ou lista e o
// "Carregar mais". Busca, categoria e ordem ficam na URL (pushState e replaceState, sem ir ao servidor);
// o modo fica no aparelho (localStorage) e a página aberta, na sessão (sessionStorage), para quem volta
// de um artigo. O topo e a vitrine chegam prontos do servidor; a vitrine sai enquanto há texto na busca.

// O useSyncExternalStore lê a URL (só a desta lista, ver urlSearchOf); o evento avisa das trocas da própria
// estante, e o ShelfUrlListener, das de fora (voltar, avançar ou um link para esta página). O
// useSearchParams fica nele, com Suspense próprio: assim o prerender não para no Suspense e o HTML estático
// traz os cartões.
const URL_EVENT = 'reviews-shelf-url';
const VIEW_EVENT = 'reviews-shelf-view';
const VIEW_KEY = 'reviews-modo';
const PAGE_KEY = 'reviews-pagina:';

const EMPTY_PRIMARY = `flex min-h-12 items-center justify-center rounded-[10px] border-2 border-marinho bg-laranja px-4 text-center text-[15px] font-extrabold text-marinho hover:bg-laranja/85 motion-safe:transition-colors ${FOCUS_RING}`;
const EMPTY_SECONDARY = `flex min-h-12 items-center justify-center rounded-[10px] border-2 border-marinho bg-white px-4 text-center text-[15px] font-extrabold text-marinho hover:bg-creme motion-safe:transition-colors ${FOCUS_RING}`;

const VIEWS: Array<{ value: ShelfView; label: string; Icon: typeof LayoutGrid }> = [
  { value: 'grade', label: 'Grade', Icon: LayoutGrid },
  { value: 'lista', label: 'Lista', Icon: List },
];

function subscribeToUrl(onChange: () => void) {
  window.addEventListener(URL_EVENT, onChange);
  return () => window.removeEventListener(URL_EVENT, onChange);
}

const getServerSearch = () => '';

function ShelfUrlListener() {
  // Fora do App Router (no teste) não há parâmetros.
  const search = useSearchParams()?.toString() ?? '';

  useEffect(() => {
    window.dispatchEvent(new Event(URL_EVENT));
  }, [search]);

  return null;
}

// O modo vive em memória e o localStorage o guarda: a memória é lida primeiro, então sem localStorage
// (bloqueado ou numa pré-visualização) o modo escolhido vale até sair da página. O que outra aba grava
// chega pelo evento storage e atualiza a memória, para as abas acompanharem a última escolha.
let viewThisVisit: ShelfView | null = null;

function subscribeToView(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== VIEW_KEY) return;
    viewThisVisit = event.newValue === 'lista' ? 'lista' : event.newValue === 'grade' ? 'grade' : null;
    onChange();
  };
  window.addEventListener(VIEW_EVENT, onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(VIEW_EVENT, onChange);
    window.removeEventListener('storage', onStorage);
  };
}

function getStoredView(): ShelfView {
  if (viewThisVisit) return viewThisVisit;
  try {
    return window.localStorage.getItem(VIEW_KEY) === 'lista' ? 'lista' : 'grade';
  } catch {
    return 'grade';
  }
}

const getServerView = (): ShelfView => 'grade';

function storeView(view: ShelfView) {
  viewThisVisit = view;
  try {
    window.localStorage.setItem(VIEW_KEY, view);
  } catch {
    // Sem storage, o modo vale só nesta visita.
  }
  window.dispatchEvent(new Event(VIEW_EVENT));
}

type SavedPage = { search: string; visible: number };

function readSavedPage(listPath: string): SavedPage | null {
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(PAGE_KEY + listPath) ?? 'null');
    return saved && typeof saved.search === 'string' && Number.isInteger(saved.visible) ? saved : null;
  } catch {
    return null;
  }
}

function savePage(listPath: string, page: SavedPage) {
  try {
    window.sessionStorage.setItem(PAGE_KEY + listPath, JSON.stringify(page));
  } catch {
    // Sem storage, quem volta de um artigo encontra a primeira página.
  }
}

// Troca busca, categoria ou ordem na URL (os outros parâmetros ficam) e avisa o useSyncExternalStore.
// Devolve a query como ficou na URL.
function writeUrl(
  update: (query: ShelfQuery) => ShelfQuery,
  readQuery: (search: string) => ShelfQuery,
  mode: 'push' | 'replace'
): ShelfQuery {
  const next = update(readQuery(window.location.search));
  const url = `${window.location.pathname}${withShelfQuery(window.location.search, next)}${window.location.hash}`;
  if (mode === 'push') window.history.pushState(null, '', url);
  else window.history.replaceState(null, '', url);
  window.dispatchEvent(new Event(URL_EVENT));
  return readQuery(window.location.search);
}

// A troca animada da estante: data-trocando liga, no globals.css, o nome de transição de cada item (a
// variável --vt) só durante a troca. Sem a API (Firefox) ou com "reduzir movimento", troca na hora. Uma
// troca nova encerra a anterior; só a última tira o data-trocando.
let transitionCount = 0;

function runShelfTransition(shelf: HTMLElement | null, update: () => void) {
  if (
    !shelf ||
    typeof document.startViewTransition !== 'function' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    update();
    return;
  }
  const id = ++transitionCount;
  shelf.dataset.trocando = '';
  const done = () => {
    if (id === transitionCount) delete shelf.dataset.trocando;
  };
  try {
    const transition = document.startViewTransition(() => flushSync(update));
    // Uma troca que pula a anterior rejeita o ready dela: não é erro.
    transition.ready.catch(() => {});
    transition.finished.then(done, done);
  } catch {
    // A API existe, mas a chamada falhou: nada de nome de transição preso, e a troca acontece na hora.
    done();
    update();
  }
}

type ReviewsBrowserProps = {
  articles: ShelfArticle[];
  categories: ShelfCategory[];
  listPath: string;
  placementPrefix: 'reviews' | 'store';
  showStore: boolean;
  // O título da estante: visível em /reviews ("Todos os artigos"); na subpágina, só para leitor de tela.
  heading: string;
  headingVisible: boolean;
  search: ShelfSearch | null;
  // O topo da página e a vitrine (Novidades e Por loja) vêm prontos do servidor.
  hero: ReactNode;
  showcase?: ReactNode;
  footer?: ReactNode;
};

export function ReviewsBrowser({
  articles,
  categories,
  listPath,
  placementPrefix,
  showStore,
  heading,
  headingVisible,
  search,
  hero,
  showcase,
  footer,
}: ReviewsBrowserProps) {
  const categoryValues = useMemo(() => categories.map(({ value }) => value), [categories]);
  const getUrlSearch = useCallback(() => urlSearchOf(listPath, window.location), [listPath]);
  const urlSearch = useSyncExternalStore(subscribeToUrl, getUrlSearch, getServerSearch);
  const canSearch = search !== null;
  const readQuery = useCallback(
    (raw: string) => readShelfQuery(raw, categoryValues, canSearch),
    [categoryValues, canSearch]
  );
  const query = useMemo(() => readQuery(urlSearch), [urlSearch, readQuery]);
  const view = useSyncExternalStore(subscribeToView, getStoredView, getServerView);
  const results = useMemo(() => filterShelf(articles, query), [articles, query]);
  const listKey = shelfSearch(query);
  const searching = isSearching(query);

  // A página aberta vale para a busca, a categoria e a ordem atuais (listKey): trocar qualquer uma volta
  // ao começo e apaga a página antiga (ajuste durante a renderização, o padrão do React), para voltar a
  // uma query anterior não trazer de volta os artigos que o "Carregar mais" tinha aberto. newFrom marca os
  // cartões que ele acabou de trazer.
  const [page, setPage] = useState(() => firstPage(listKey));
  const current = settlePage(page, listKey);
  if (current !== page) setPage(current);
  const visible = Math.max(current.visible, pageSizeOf(view));
  const shown = results.slice(0, visible);

  // O texto do campo: o que a pessoa digita, até a URL mudar por outro caminho (Voltar, Avançar).
  const [draft, setDraft] = useState<SearchDraft>(() => freshDraft(query.q));
  const inputValue = draftValue(draft, query.q);

  const shelfRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const focusFrom = useRef<number | null>(null);
  const focusAfterWrite = useRef(false);
  const restored = useRef(false);
  const lastTrackedSearch = useRef<string | null>(null);

  // A busca vai para a URL quando a pessoa para de digitar, por este caminho só: limpar (Esc, ✕) também
  // só troca o rascunho para '' e este efeito grava, sem demora. A transição chama o callback um quadro
  // depois do temporizador: se nesse meio-tempo a pessoa digita mais uma letra, ou a URL muda por outro
  // caminho, o efeito é refeito, esta gravação (com o texto velho) é descartada e a do texto novo é
  // agendada. Quando a gravação entra, o rascunho passa a ter como base o q gravado (no mesmo update),
  // para Voltar e Avançar mostrarem sempre o q da URL e a busca não voltar sozinha numa entrada antiga.
  // O Enter no toque com a gravação pendente (focusAfterWrite) espera aqui: o foco só vai ao título depois
  // que a busca entrou na tela e a vitrine saiu; o flush de dentro garante o DOM pronto antes do foco.
  // Um Voltar ou Avançar que sai da lista troca a URL com esta página ainda na tela, e o efeito não refaz
  // (ver o ouvinte de popstate abaixo): a gravação confere a URL no temporizador e de novo no callback, um
  // quadro depois. Fora da lista não grava (a busca iria para a outra rota, como /?q=…), não começa a troca
  // animada e o Enter no toque deixa de esperar o foco.
  useEffect(() => {
    if (!isSearchWriteDue(draft, query.q)) return;
    let stale = false;
    const write = () => {
      if (stale) return;
      const focusResultsAfter = focusAfterWrite.current;
      focusAfterWrite.current = false;
      if (!isOnList(listPath, window.location.pathname)) return;
      flushSync(() => {
        const written = writeUrl((latest) => ({ ...latest, q: draft.text }), readQuery, 'replace');
        setDraft((current) => rebaseDraft(current, written.q));
      });
      if (focusResultsAfter) titleRef.current?.focus();
    };
    const timer = window.setTimeout(() => {
      if (isOnList(listPath, window.location.pathname)) runShelfTransition(shelfRef.current, write);
      else focusAfterWrite.current = false;
    }, searchWriteDelay(draft.text));
    return () => {
      stale = true;
      focusAfterWrite.current = false;
      window.clearTimeout(timer);
    };
  }, [draft, query.q, readQuery, listPath]);

  // Voltar e Avançar dentro da lista trocam a entrada do histórico: o que a pessoa digitou na anterior fica
  // para trás. Sem isto, duas entradas com o mesmo q (uma categoria no meio) não mudam o query.q, o efeito
  // acima não refaz e a gravação pendente cai na entrada que a pessoa acabou de abrir. Saindo da lista não
  // faz nada: a página segue na tela até a rota nova entrar, e um render com a URL de lá mostraria a estante
  // sem filtro e apagaria a página salva.
  useEffect(() => {
    const onPop = () => {
      if (isOnList(listPath, window.location.pathname)) setDraft(freshDraft(readQuery(window.location.search).q));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [listPath, readQuery]);

  // Quem volta de um artigo encontra a mesma página aberta. Só depois de ler a URL do navegador (no
  // render da hidratação vale a do servidor) e uma vez por montagem.
  useEffect(() => {
    if (restored.current || urlSearch !== getUrlSearch()) return;
    restored.current = true;
    const saved = readSavedPage(listPath);
    const restore = (savedVisible: number) => setPage({ ...firstPage(listKey), visible: savedVisible });
    if (saved && saved.search === listKey && saved.visible > visible) restore(saved.visible);
  }, [urlSearch, getUrlSearch, listPath, listKey, visible]);

  // Só na própria lista: com a URL de outra rota, a estante vê a query vazia e a primeira página, e gravá-las
  // apagaria a página que a pessoa deixou aberta.
  useEffect(() => {
    if (restored.current && isOnList(listPath, window.location.pathname)) {
      savePage(listPath, { search: listKey, visible });
    }
  }, [listPath, listKey, visible]);

  // Depois do "Carregar mais", o foco vai para o primeiro artigo novo.
  useEffect(() => {
    const from = focusFrom.current;
    if (from === null) return;
    focusFrom.current = null;
    listRef.current?.querySelectorAll<HTMLAnchorElement>(':scope > li > a')[from]?.focus();
  }, [visible]);

  // A busca vai para o Analytics quando a pessoa para de digitar, sem repetir o termo.
  useEffect(() => {
    if (!shouldTrackSearch(query.q, lastTrackedSearch.current)) return;
    const timer = window.setTimeout(() => {
      lastTrackedSearch.current = foldSearchText(query.q);
      trackEvent(SHELF_SEARCH_EVENT, getShelfSearchParameters({ q: query.q, resultsCount: results.length, listPath }));
    }, SEARCH_EVENT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [query.q, results.length, listPath]);

  function trackControl(control: 'category' | 'sort' | 'view', value: string) {
    trackEvent(SHELF_CONTROL_EVENT, getShelfControlParameters({ control, value, listPath }));
  }

  function selectCategory(category: ReviewCategory | null) {
    if (category === query.category) return;
    trackControl('category', category ?? 'todos');
    runShelfTransition(shelfRef.current, () => writeUrl((latest) => ({ ...latest, category }), readQuery, 'push'));
  }

  function selectOrder(order: ShelfOrder) {
    if (order === query.order) return;
    trackControl('sort', order);
    runShelfTransition(shelfRef.current, () => writeUrl((latest) => ({ ...latest, order }), readQuery, 'push'));
  }

  function selectView(next: ShelfView) {
    if (next === view) return;
    trackControl('view', next);
    runShelfTransition(shelfRef.current, () => {
      setPage({ ...firstPage(listKey), visible: visibleAfterViewChange(visible, next) });
      storeView(next);
    });
  }

  function loadMore() {
    focusFrom.current = visible;
    setPage({ key: listKey, visible: visible + pageSizeOf(view), newFrom: visible });
  }

  // Limpar só troca o rascunho; quem grava é o efeito da busca.
  function clearSearch() {
    setDraft({ text: '', base: query.q });
  }

  // O botão clicado some com a busca: o foco vai para o campo em vez de cair no body.
  function clearSearchAndFocus() {
    clearSearch();
    inputRef.current?.focus();
  }

  // O foco vai para o título da estante, onde estão os resultados, sem abrir o teclado.
  function focusResults() {
    titleRef.current?.focus();
  }

  const placement = shelfPlacement(placementPrefix, view);
  const emptyAction = search && searching ? getEmptySearchAction(query.q, search.scope, query.category) : null;
  const titleVisible = headingVisible || searching;

  return (
    <>
      <Suspense fallback={null}>
        <ShelfUrlListener />
      </Suspense>

      <header className={`${SHELF_CONTAINER} pt-8 pb-8 md:pt-12 md:pb-12`}>
        {hero}
        {search ? (
          <form
            role="search"
            action={listPath}
            onSubmit={(event) => {
              // Sem JavaScript o Enter recarrega a lista com o ?q=; com ele, o campo já filtra. Com ponteiro
              // grosso (celular) o Enter fecha o teclado e leva o foco ao título da estante; no desktop o foco
              // fica no campo. Com a gravação ainda pendente a vitrine está na tela: o foco espera a busca
              // entrar (ver o efeito da busca), senão no iOS, sem scroll anchoring, a pessoa cai no meio dos
              // resultados quando a vitrine sai.
              event.preventDefault();
              if (!window.matchMedia('(pointer: coarse)').matches) return;
              if (isSearchWriteDue(draft, query.q)) focusAfterWrite.current = true;
              else focusResults();
            }}
            className="mt-6 max-w-xl"
          >
            <label htmlFor="busca-estante" className="sr-only">
              {search.label}
            </label>
            <div className="flex min-h-12 items-center gap-2 rounded-full border-2 border-marinho bg-white pr-1 pl-4 focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-marinho">
              <Search aria-hidden="true" className="size-5 shrink-0 text-marinho" />
              <input
                ref={inputRef}
                id="busca-estante"
                name="q"
                type="search"
                value={inputValue}
                onChange={(event) => {
                  focusAfterWrite.current = false;
                  setDraft({ text: event.target.value, base: query.q });
                }}
                onKeyDown={(event) => {
                  if (event.key !== 'Escape' || !hasSearchText(inputValue)) return;
                  event.preventDefault();
                  clearSearch();
                }}
                placeholder={search.placeholder}
                autoComplete="off"
                enterKeyHint="search"
                className="min-w-0 flex-1 bg-transparent py-2.5 text-base font-semibold text-marinho outline-none placeholder:font-medium placeholder:text-marinho-suave [&::-webkit-search-cancel-button]:appearance-none"
              />
              {hasSearchText(inputValue) ? (
                <button
                  type="button"
                  onClick={clearSearchAndFocus}
                  aria-label="Limpar a busca"
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full text-marinho hover:bg-creme ${FOCUS_RING}`}
                >
                  <X aria-hidden="true" className="size-5" />
                </button>
              ) : null}
            </div>
          </form>
        ) : null}
      </header>

      {searching ? null : showcase}

      <RevealSection aria-labelledby="titulo-estante" className="pb-10 md:pb-14">
        <div ref={shelfRef} className={`${SHELF_CONTAINER} flex flex-col gap-4 md:gap-6`}>
          <h2
            ref={titleRef}
            id="titulo-estante"
            tabIndex={-1}
            className={`${titleVisible ? SHELF_TITLE : 'sr-only'} focus:outline-none`}
          >
            {titleVisible ? <span className="marca-texto">{searching ? 'Resultados da busca' : heading}</span> : heading}
          </h2>

          <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-between">
            {categories.length > 1 ? (
              <div
                data-categorias="true"
                className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 [mask-image:linear-gradient(to_right,black_85%,transparent)] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:[mask-image:none]"
              >
                {[{ value: null, label: 'Todos' }, ...categories].map(({ value, label }) => (
                  <button
                    key={value ?? 'todos'}
                    type="button"
                    aria-pressed={query.category === value}
                    onClick={() => selectCategory(value)}
                    className={`min-h-11 shrink-0 rounded-full border-2 px-4 text-sm font-bold whitespace-nowrap motion-safe:transition-colors ${
                      query.category === value
                        ? 'border-marinho bg-marinho text-white'
                        : 'border-marinho/20 bg-white text-marinho hover:border-marinho'
                    } ${FOCUS_RING}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : null}
            {/* No celular o total fica na própria linha e os controles na seguinte; numa tela estreita eles
                quebram de novo em vez de estourar. A partir do md tudo cabe numa linha. */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 md:justify-end">
              <p aria-live="polite" className="w-full text-sm font-bold text-marinho-suave md:w-auto">
                {resultsLabel(results.length, query.q)}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <label htmlFor="ordem-estante" className="sr-only">
                  Ordem
                </label>
                <select
                  id="ordem-estante"
                  value={query.order}
                  onChange={(event) => selectOrder(event.target.value === 'az' ? 'az' : 'novos')}
                  className={`min-h-12 rounded-lg border-2 border-marinho bg-white px-2 text-sm font-extrabold text-marinho ${FOCUS_RING}`}
                >
                  <option value="novos">Mais novos</option>
                  <option value="az">A–Z</option>
                </select>
                <div className="flex rounded-lg border-2 border-marinho">
                  {VIEWS.map(({ value, label, Icon }) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={view === value}
                      onClick={() => selectView(value)}
                      className={`flex min-h-11 items-center gap-1.5 px-3 text-sm font-extrabold first:rounded-l-md last:rounded-r-md ${
                        view === value ? 'bg-marinho text-white' : 'bg-white text-marinho hover:bg-creme'
                      } ${FOCUS_RING}`}
                    >
                      <Icon aria-hidden="true" className="size-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {shown.length > 0 ? (
            <ul
              ref={listRef}
              data-estante={view}
              className={
                view === 'lista'
                  ? 'flex flex-col border-t-2 border-marinho'
                  : 'grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4'
              }
            >
              {shown.map((article, index) => {
                const entering = current.newFrom >= 0 && index >= current.newFrom;
                return (
                  <li
                    key={article.slug}
                    className={`estante-item flex ${entering ? 'estante-entra' : index < GRID_PAGE_SIZE ? 'revela' : ''} ${
                      view === 'lista' ? 'border-b-[1.5px] border-marinho/15' : ''
                    }`}
                    style={
                      {
                        '--vt': `estante-${sanitizeViewTransitionName(article.slug)}`,
                        '--i': entering ? index - current.newFrom : index,
                      } as CSSProperties
                    }
                  >
                    {view === 'lista' ? (
                      <ReviewShelfRow article={article} placement={placement} showStore={showStore} />
                    ) : (
                      <ReviewShelfCard
                        article={article}
                        placement={placement}
                        dateFormat="fullDate"
                        showStore={showStore}
                        imageSizes="(min-width: 1280px) 270px, (min-width: 768px) 30vw, 46vw"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          ) : emptyAction ? (
            <div className="carimbo-assenta mx-auto flex w-full max-w-md flex-col gap-3 rounded-[10px] border-2 border-dashed border-marinho/40 p-6 text-center">
              <p className="font-extrabold text-marinho">{emptySearchMessage(query.q)}</p>
              {emptyAction.kind === 'all-categories' ? (
                <button
                  type="button"
                  onClick={() => {
                    selectCategory(null);
                    focusResults();
                  }}
                  className={EMPTY_PRIMARY}
                >
                  {emptyAction.label}
                </button>
              ) : (
                <Link href={emptyAction.href} className={EMPTY_PRIMARY}>
                  {emptyAction.label}
                </Link>
              )}
              <button type="button" onClick={clearSearchAndFocus} className={EMPTY_SECONDARY}>
                Limpar a busca
              </button>
            </div>
          ) : null}

          {results.length > visible ? (
            <button
              type="button"
              onClick={loadMore}
              className={`mx-auto mt-2 inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-marinho bg-white px-8 font-extrabold text-marinho hover:bg-marinho hover:text-white motion-safe:transition-colors ${FOCUS_RING}`}
            >
              Carregar mais
            </button>
          ) : null}

          {/* O rodapé vem do servidor e, no Flight, pode chegar como referência preguiçosa sem o selo de validado:
              solto entre os irmãos, o React de desenvolvimento o confunde com item de lista sem key. Dentro do
              Fragment é filho único, e o irmão (o Fragment) nasce aqui, já validado. */}
          <>{footer}</>
        </div>
      </RevealSection>
    </>
  );
}
