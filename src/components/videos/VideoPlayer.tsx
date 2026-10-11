import { videoMorphName, type VideoAspect, type VideoItem } from '@/lib/videosShelf';

// O player da página do vídeo, no formato dele, logo depois do h1 (a regra do guia de vídeo). O vertical (os
// Shorts) não passa de min(80svh, 720px) de altura: a largura vai até min(45svh, 405px), que é 9/16 disso. O
// quadrado (os MP4) fica até 3xl de largura, sem passar de 80svh; o deitado ocupa a largura do conteúdo. A
// partir do lg, o vertical e o quadrado têm largura fixa, para o painel ficar ao lado. O YouTube vai num
// <iframe> com os atributos de antes; o MP4, num <video> com controles e o poster. A moldura tem o nome de
// transição da miniatura dos cartões (video-player-<slug>): ao abrir o vídeo, a miniatura voa para o player.
const FRAME: Record<VideoAspect, string> = {
  vertical: 'mx-auto aspect-[9/16] w-full max-w-[min(45svh,405px)] lg:mx-0 lg:w-[min(45svh,405px)]',
  horizontal: 'aspect-video w-full',
  square: 'mx-auto aspect-square w-full max-w-[min(48rem,80svh)] lg:mx-0 lg:w-[min(32rem,80svh)]',
};

export function VideoPlayer({ video }: { video: VideoItem }) {
  return (
    <section aria-label={`Player do vídeo: ${video.title}`}>
      <div
        data-player={video.aspect}
        className={`overflow-hidden rounded-xl border-2 border-marinho bg-black ${FRAME[video.aspect]}`}
        style={{ viewTransitionName: videoMorphName(video.slug) }}
      >
        {video.player.kind === 'youtube' ? (
          <iframe
            src={video.player.embedUrl}
            title={video.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <video controls preload="metadata" poster={video.thumbnail} className="h-full w-full object-contain">
            <source src={video.player.contentUrl} type="video/mp4" />
            Seu navegador não suporta a reprodução deste vídeo.
          </video>
        )}
      </div>
    </section>
  );
}
