'use client';

import { useMemo, useRef, type CSSProperties } from 'react';
import { SHELF_CONTAINER, SHELF_TITLE, filterChipClass, filterChipRowClass } from '@/components/reviews/shelfClasses';
import { RevealSection } from '@/components/ui/RevealSection';
import { runShelfTransition } from '@/components/ui/shelfTransition';
import { ListUrlListener, useListUrlSearch, writeListUrl } from '@/components/ui/useListUrl';
import { useRowScroll } from '@/components/ui/useRowScroll';
import { VideoCard } from '@/components/videos/VideoCard';
import { trackEvent } from '@/lib/analytics';
import { isOnList } from '@/lib/listUrl';
import { sanitizeViewTransitionName } from '@/lib/viewTransition';
import {
  VIDEOS_LIST_CONTROL,
  filterByStore,
  getVideosListControlParameters,
  readStoreFilter,
  toVideoCard,
  videosCountLabel,
  withStoreFilter,
  type VideoItem,
  type VideoStore,
} from '@/lib/videosShelf';

// "Todos os vídeos" de /videos: os chips das lojas, o total e a grade. A loja escolhida fica na URL (?loja=,
// com pushState, sem ir ao servidor) e é lida depois da hidratação, como na estante de /reviews: o HTML do
// servidor traz "Todos" com todos os vídeos. Voltar e Avançar trocam o filtro, e fora de /videos nada é
// gravado. A troca de loja é animada (runShelfTransition, com o --vt de cada item).

const LIST_PATH = '/videos';
const GRID_SIZES = '(min-width: 1200px) 210px, (min-width: 1024px) 18vw, (min-width: 768px) 22vw, (min-width: 640px) 30vw, 46vw';

type VideosBrowserProps = {
  videos: VideoItem[];
  stores: VideoStore[];
};

export function VideosBrowser({ videos, stores }: VideosBrowserProps) {
  const storeSlugs = useMemo(() => stores.map(({ slug }) => slug), [stores]);
  const { urlSearch } = useListUrlSearch(LIST_PATH);
  const store = readStoreFilter(urlSearch, storeSlugs);
  const shown = useMemo(() => filterByStore(videos, store), [videos, store]);
  // O degradê da borda direita dos chips só aparece enquanto há chip escondido. O hook é chamado sempre: sem
  // chips, ele não faz nada.
  const { trackRef: chipsRef, moreToTheRight } = useRowScroll<HTMLDivElement>(stores);
  const shelfRef = useRef<HTMLDivElement>(null);

  function selectStore(next: string | null) {
    if (next === store) return;
    // Um clique com esta página ainda na tela, depois de um Voltar para outra rota, não monta /?loja=…
    if (!isOnList(LIST_PATH, window.location.pathname)) return;
    trackEvent(VIDEOS_LIST_CONTROL, getVideosListControlParameters({ value: next ?? 'todos', listPath: LIST_PATH }));
    runShelfTransition(shelfRef.current, () => writeListUrl(withStoreFilter(window.location.search, next), 'push'));
  }

  return (
    <>
      <ListUrlListener />
      <RevealSection aria-labelledby="titulo-todos-videos" className="pb-10 md:pb-14">
        <div ref={shelfRef} className={`${SHELF_CONTAINER} flex flex-col gap-4 md:gap-6`}>
          <h2 id="titulo-todos-videos" className={SHELF_TITLE}>
            <span className="marca-texto">Todos os vídeos</span>
          </h2>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {stores.length > 0 ? (
              <div
                ref={chipsRef}
                role="group"
                aria-label="Filtrar por loja"
                data-lojas="true"
                className={filterChipRowClass(moreToTheRight)}
              >
                {[{ slug: null, name: 'Todos' }, ...stores].map(({ slug, name }) => (
                  <button
                    key={slug ?? 'todos'}
                    type="button"
                    aria-pressed={store === slug}
                    onClick={() => selectStore(slug)}
                    className={filterChipClass(store === slug)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            ) : null}
            <p aria-live="polite" className="text-sm font-bold text-marinho-suave">
              {videosCountLabel(shown.length)}
            </p>
          </div>
          <ul data-estante="videos" className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5">
            {shown.map((video, index) => (
              <li
                key={video.slug}
                className="estante-item revela flex"
                style={{ '--vt': `estante-${sanitizeViewTransitionName(video.slug)}`, '--i': index } as CSSProperties}
              >
                <VideoCard video={toVideoCard(video)} sizes={GRID_SIZES} placement="videos_grid" />
              </li>
            ))}
          </ul>
        </div>
      </RevealSection>
    </>
  );
}
