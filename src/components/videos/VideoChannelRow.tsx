import { HomeSection } from '@/components/sections/HomeSection';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { TrackedVideosLink } from '@/components/videos/TrackedVideosLink';
import { VideoRow } from '@/components/videos/VideoRow';
import { brandLinks } from '@/lib/brandLinks';
import type { SocialHighlight } from '@/lib/data';
import { getChannelRow } from '@/lib/videosHub';
import { CHANNEL_PLACEMENTS, YOUTUBE_SUBSCRIBE_URL } from '@/lib/videosShelf';

// "Últimos do canal" de /videos: os 6 uploads mais novos (os mesmos da home), o que tem página no site
// abrindo a página e os outros o YouTube numa aba nova, e a faixa do canal. Sem a API do YouTube, a seção
// some, como na home.
export function VideoChannelRow({ highlights }: { highlights: SocialHighlight[] }) {
  const videos = getChannelRow(highlights);
  if (videos.length === 0) return null;

  return (
    <HomeSection id="titulo-canal" title="Últimos do canal" className="pb-12 md:pb-16">
      <VideoRow videos={videos} placement="videos_channel" desktopGrid />
      <VideoChannelStrip context="videos" />
    </HomeSection>
  );
}

// A faixa do canal, em /videos e na página de cada vídeo: o link do canal e o "Inscrever-se no canal", os
// dois numa aba nova e medidos (videos_* ou video_*).
export function VideoChannelStrip({ context }: { context: keyof typeof CHANNEL_PLACEMENTS }) {
  const placements = CHANNEL_PLACEMENTS[context];

  return (
    <div className="flex flex-col gap-3 rounded-[10px] border-2 border-marinho bg-creme p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[15px] font-semibold text-marinho">
        <TrackedVideosLink
          href={brandLinks.youtube}
          target="_blank"
          rel="noopener noreferrer"
          placement={placements.channel}
          linkLabel="Cecília no YouTube"
          className={`font-extrabold underline underline-offset-[3px] ${FOCUS_RING}`}
        >
          Cecília no YouTube
        </TrackedVideosLink>
        : casa, café e receitas.
      </p>
      <TrackedVideosLink
        href={YOUTUBE_SUBSCRIBE_URL}
        target="_blank"
        rel="noopener noreferrer"
        placement={placements.subscribe}
        linkLabel="Inscrever-se no canal"
        className={`inline-flex min-h-12 items-center justify-center self-start rounded-full border-2 border-marinho bg-marinho px-6 text-[15px] font-extrabold text-white hover:bg-marinho/85 motion-safe:transition-colors sm:self-auto ${FOCUS_RING}`}
      >
        Inscrever-se no canal
      </TrackedVideosLink>
    </div>
  );
}
