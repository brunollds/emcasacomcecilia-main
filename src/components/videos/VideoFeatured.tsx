import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { SHELF_CONTAINER } from '@/components/reviews/shelfClasses';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { TrackedVideosLink, VideoPageLink } from '@/components/videos/TrackedVideosLink';
import { sourceCopy, videoMorphName, type VideoAspect, type VideoItem } from '@/lib/videosShelf';

// O destaque de /videos: o vídeo mais novo, no formato dele. Vertical e quadrado ficam com o texto ao lado; o
// deitado ocupa a largura toda, com o texto embaixo. A miniatura e o título levam à página do vídeo (o hub
// não tem player); "Ler o guia" ou "Ver a receita" leva à origem. A miniatura é a maior imagem do topo e
// carrega sem atraso. O link dela sai do Tab e do leitor de tela: o do título leva ao mesmo lugar.

const LAYOUT: Record<VideoAspect, { box: string; thumb: string; sizes: string }> = {
  vertical: {
    box: 'grid grid-cols-[8.5rem_minmax(0,1fr)] items-end gap-4 sm:grid-cols-[13rem_minmax(0,1fr)] md:gap-8',
    thumb: 'aspect-[9/16]',
    sizes: '(min-width: 640px) 208px, 136px',
  },
  square: {
    box: 'grid grid-cols-[8.5rem_minmax(0,1fr)] items-end gap-4 sm:grid-cols-[18rem_minmax(0,1fr)] md:gap-8',
    thumb: 'aspect-square',
    sizes: '(min-width: 640px) 288px, 136px',
  },
  horizontal: {
    box: 'flex max-w-4xl flex-col gap-4 md:gap-5',
    thumb: 'aspect-video w-full',
    sizes: '(min-width: 1024px) 896px, 100vw',
  },
};

const SOURCE_LINK = `inline-flex min-h-12 items-center gap-2 self-start rounded-[10px] border-2 border-marinho bg-laranja px-5 text-[15px] font-extrabold text-marinho hover:bg-laranja/85 motion-safe:transition-colors ${FOCUS_RING}`;

export function VideoFeatured({ video }: { video: VideoItem }) {
  const layout = LAYOUT[video.aspect];
  const copy = sourceCopy(video.source.kind);

  return (
    <section aria-labelledby="titulo-destaque" className={`${SHELF_CONTAINER} pb-10 md:pb-14`}>
      <div data-destaque={video.aspect} className={layout.box}>
        <VideoPageLink
          href={video.href}
          placement="videos_featured"
          linkLabel={video.title}
          tabIndex={-1}
          aria-hidden="true"
          className={`group relative flex ${layout.thumb} items-center justify-center overflow-hidden rounded-xl border-2 border-marinho bg-marinho`}
        >
          <span data-vt-name={videoMorphName(video.slug)} className="absolute inset-0">
            <Image
              src={video.thumbnail}
              alt=""
              fill
              sizes={layout.sizes}
              loading="eager"
              fetchPriority="high"
              className="object-cover"
            />
          </span>
          <Play
            aria-hidden="true"
            className="relative size-14 fill-amarelo-cupom text-amarelo-cupom motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-110 md:size-20"
          />
          {video.duration ? (
            <span className="absolute right-2 bottom-2 rounded-md bg-marinho/85 px-1.5 py-0.5 text-xs leading-none font-extrabold text-white tabular-nums">
              {video.duration.badge}
            </span>
          ) : null}
        </VideoPageLink>
        <div className="flex min-w-0 flex-col gap-2 md:gap-3">
          <h2 id="titulo-destaque" className="text-xl leading-tight font-extrabold text-marinho md:text-3xl">
            <VideoPageLink
              href={video.href}
              placement="videos_featured"
              linkLabel={video.title}
              className={`hover:underline hover:underline-offset-4 ${FOCUS_RING}`}
            >
              {video.title}
            </VideoPageLink>
          </h2>
          <p className="text-sm font-bold text-marinho-suave">
            <time dateTime={video.uploadDate}>{video.dateLabel}</time>
            {video.duration ? `, ${video.duration.text}` : null}
          </p>
          <p className="text-[15px] leading-snug font-semibold text-marinho">{`${copy.from}: ${video.source.title}`}</p>
          <TrackedVideosLink href={video.source.href} placement="videos_featured" linkLabel={copy.action} className={SOURCE_LINK}>
            {copy.action}
            <ArrowRight aria-hidden="true" className="size-4" />
          </TrackedVideosLink>
        </div>
      </div>
    </section>
  );
}
