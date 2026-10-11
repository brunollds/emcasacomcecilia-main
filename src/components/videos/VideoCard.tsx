import Image from 'next/image';
import { Play } from 'lucide-react';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { TrackedVideosLink, VideoPageLink } from '@/components/videos/TrackedVideosLink';
import type { VideoCardData, VideosPlacement } from '@/lib/videosShelf';

// O cartão vertical (9:16) dos vídeos: os Últimos vídeos da home, a grade e o canal de /videos e "Mais
// vídeos" da página de cada vídeo. A miniatura do YouTube (hqdefault, 4:3) é recortada no meio pelo
// object-cover. O título é o primeiro texto do link, num h3; depois vêm a duração por extenso (para o leitor
// de tela; o selo do canto é só visual) e a loja. O vídeo com página no site abre a página, com a miniatura
// voando para o player (data-vt-name); o que só existe no YouTube abre numa aba nova.

const CARD = `group relative flex aspect-[9/16] flex-1 items-center justify-center overflow-hidden rounded-xl border-2 border-marinho bg-marinho text-white motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 ${FOCUS_RING}`;

type VideoCardProps = {
  video: VideoCardData;
  sizes: string;
  // Sem placement (a home), o clique não é medido.
  placement?: VideosPlacement;
};

export function VideoCard({ video, sizes, placement }: VideoCardProps) {
  const content = (
    <>
      <span data-vt-name={video.vtName ?? undefined} className="absolute inset-0">
        {video.thumbnail ? <Image src={video.thumbnail} alt="" fill sizes={sizes} className="object-cover" /> : null}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-marinho via-marinho/70 to-transparent"
      />
      <Play
        aria-hidden="true"
        className="relative size-12 fill-amarelo-cupom text-amarelo-cupom motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-110 md:size-14"
      />
      <div className="absolute inset-x-2.5 bottom-2.5 flex flex-col gap-0.5 md:inset-x-3 md:bottom-3">
        <h3 className="line-clamp-3 text-xs leading-[14px] font-bold md:leading-4">{video.title}</h3>
        {video.duration ? <span className="sr-only">{video.duration.spoken}</span> : null}
        {video.label ? <span className="text-[11px] leading-4 font-semibold text-white/80">{video.label}</span> : null}
      </div>
      {video.duration ? (
        <span
          aria-hidden="true"
          className="absolute top-2 right-2 rounded-md bg-marinho/85 px-1.5 py-0.5 text-[11px] leading-none font-extrabold tabular-nums"
        >
          {video.duration.badge}
        </span>
      ) : null}
    </>
  );

  return video.external ? (
    <TrackedVideosLink
      href={video.href}
      target="_blank"
      rel="noopener noreferrer"
      placement={placement}
      linkLabel={video.title}
      className={CARD}
    >
      {content}
    </TrackedVideosLink>
  ) : (
    <VideoPageLink href={video.href} placement={placement} linkLabel={video.title} className={CARD}>
      {content}
    </VideoPageLink>
  );
}
