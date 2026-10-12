import type { CSSProperties } from 'react';
import { ScrollRow } from '@/components/ui/ScrollRow';
import { VideoCard } from '@/components/videos/VideoCard';
import type { VideoCardData, VideosPlacement } from '@/lib/videosShelf';

// A fila de cartões de vídeo, que rola na horizontal (ScrollRow: com o foco do teclado, o cartão meio
// escondido entra inteiro). Com desktopGrid, os 6 do canal (home e /videos) cabem numa linha a partir de
// 1024 px; "Mais vídeos" (até 8) rola em toda largura. Cada cartão entra na rolagem (revela, com a posição em
// --i). O py-1.5 e o recuo de 1,5 nas laterais dão espaço ao anel de foco, que fica fora do cartão.
const ROW =
  'hide-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 py-1.5 md:-mx-1.5 md:scroll-px-1.5 md:gap-4 md:px-1.5';
const ROW_GRID = 'lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:p-0';
const GRID_SIZES = '(min-width: 1200px) 175px, (min-width: 1024px) 15vw, (min-width: 768px) 192px, 160px';
const SCROLL_SIZES = '(min-width: 768px) 192px, 160px';

type VideoRowProps = {
  videos: VideoCardData[];
  placement?: VideosPlacement;
  desktopGrid: boolean;
};

export function VideoRow({ videos, placement, desktopGrid }: VideoRowProps) {
  return (
    <ScrollRow className={`${ROW} ${desktopGrid ? ROW_GRID : ''}`}>
      {videos.map((video, index) => (
        <li
          key={video.id}
          className={`revela flex w-40 shrink-0 snap-start md:w-48 ${desktopGrid ? 'lg:w-auto' : ''}`}
          style={{ '--i': index } as CSSProperties}
        >
          <VideoCard video={video} sizes={desktopGrid ? GRID_SIZES : SCROLL_SIZES} placement={placement} />
        </li>
      ))}
    </ScrollRow>
  );
}
