import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { FOCUS_RING } from '@/components/ui/focusRing';
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

// A miniatura vertical do short e, por baixo, a do vídeo, para quando a primeira não existir.
function thumbnailStyle(video: SocialHighlight): CSSProperties | undefined {
  const urls = [video.thumbnailUrl, video.fallbackThumbnailUrl].filter((url): url is string => Boolean(url));
  if (urls.length === 0) return undefined;
  return { backgroundImage: urls.map((url) => `url('${resolveMediaUrl(url)}')`).join(', ') };
}

export function LatestVideos({ videos }: { videos: SocialHighlight[] }) {
  if (videos.length === 0) return null;

  return (
    <section aria-labelledby="titulo-ultimos-videos" className="bg-white pb-10 md:pb-14">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-4 md:gap-6 md:px-10">
        <h2
          id="titulo-ultimos-videos"
          className="font-condensada text-[32px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-5xl"
        >
          Últimos vídeos
        </h2>

        {/* O py-1.5 e o recuo de 1,5 nas laterais dão espaço ao anel de foco, que fica fora do card. */}
        <ul className="hide-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 py-1.5 md:-mx-1.5 md:scroll-px-1.5 md:gap-4 md:px-1.5 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:p-0">
          {videos.slice(0, 6).map((video) => (
            <li key={video.id} className="flex w-40 shrink-0 snap-start md:w-48 lg:w-auto">
              <Link
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex aspect-[9/16] flex-1 items-center justify-center overflow-hidden rounded-xl border-2 border-marinho bg-marinho bg-cover bg-center text-white motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 ${FOCUS_RING}`}
                style={thumbnailStyle(video)}
              >
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
        </ul>

        <Link
          href={brandLinks.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex min-h-11 items-center self-start text-[13px] font-extrabold text-marinho underline underline-offset-[3px] md:text-[15px] ${FOCUS_RING}`}
        >
          Ver canal do YouTube
        </Link>
      </div>
    </section>
  );
}
