import Link from 'next/link';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { HomeSection } from '@/components/sections/HomeSection';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { ScrollRow } from '@/components/ui/ScrollRow';
import { brandLinks } from '@/lib/brandLinks';
import type { SocialHighlight } from '@/lib/data';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { getYoutubeHighlights } from '@/lib/youtube';

// "Últimos vídeos": os 6 shorts mais novos do canal. No celular e no tablet a fila rola na
// horizontal; a partir de 1024 px os 6 cabem numa linha. Sem vídeo (a API do YouTube fora do ar e
// a lista reserva vazia), a seção não aparece.

export async function CTA() {
  const videos = await getYoutubeHighlights();
  return <LatestVideos videos={videos} />;
}

// A hqdefault.jpg do YouTube é 4:3, com o quadro vertical do short no meio: o object-cover corta as
// faixas. A outra miniatura só entra quando falta essa.
function VideoThumbnail({ video }: { video: SocialHighlight }) {
  const src = video.thumbnailUrl || video.fallbackThumbnailUrl;
  if (!src) return null;
  return (
    <Image
      src={resolveMediaUrl(src)}
      alt=""
      fill
      sizes="(min-width: 1200px) 175px, (min-width: 1024px) 15vw, (min-width: 768px) 192px, 160px"
      className="object-cover"
    />
  );
}

export function LatestVideos({ videos }: { videos: SocialHighlight[] }) {
  if (videos.length === 0) return null;

  return (
    <HomeSection id="titulo-ultimos-videos" title="Últimos vídeos" className="pb-10 md:pb-14">
      {/* O py-1.5 e o recuo de 1,5 nas laterais dão espaço ao anel de foco, que fica fora do card. */}
      <ScrollRow className="hide-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 py-1.5 md:-mx-1.5 md:scroll-px-1.5 md:gap-4 md:px-1.5 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:p-0">
        {videos.slice(0, 6).map((video) => (
          <li key={video.id} className="flex w-40 shrink-0 snap-start md:w-48 lg:w-auto">
            <Link
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex aspect-[9/16] flex-1 items-center justify-center overflow-hidden rounded-xl border-2 border-marinho bg-marinho text-white motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 ${FOCUS_RING}`}
            >
              <VideoThumbnail video={video} />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-marinho via-marinho/70 to-transparent"
              />
              <Play
                aria-hidden="true"
                className="relative size-12 fill-amarelo-cupom text-amarelo-cupom motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-110 md:size-14"
              />
              <span className="absolute inset-x-2.5 bottom-2.5 line-clamp-3 text-xs leading-[14px] font-bold md:inset-x-3 md:bottom-3 md:leading-4">
                {video.title}
              </span>
            </Link>
          </li>
        ))}
      </ScrollRow>

      <Link
        href={brandLinks.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex min-h-11 items-center self-start text-[13px] font-extrabold text-marinho underline underline-offset-[3px] md:text-[15px] ${FOCUS_RING}`}
      >
        Ver canal do YouTube
      </Link>
    </HomeSection>
  );
}
