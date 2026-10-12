import Link from 'next/link';
import { HomeSection } from '@/components/sections/HomeSection';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { VideoRow } from '@/components/videos/VideoRow';
import { brandLinks } from '@/lib/brandLinks';
import type { SocialHighlight } from '@/lib/data';
import { getChannelRow } from '@/lib/videosHub';
import { getYoutubeHighlights } from '@/lib/youtube';

// "Últimos vídeos": os 6 vídeos mais novos do canal. No celular e no tablet a fila rola na horizontal; a
// partir de 1024 px os 6 cabem numa linha. O vídeo com página no site (/videos/…) abre a página; os outros, o
// YouTube numa aba nova. Sem vídeo (a API do YouTube fora do ar e a lista reserva vazia), a seção não
// aparece.

export async function CTA() {
  const videos = await getYoutubeHighlights();
  return <LatestVideos videos={videos} />;
}

const MORE_LINK = `flex min-h-11 items-center text-[13px] font-extrabold text-marinho underline underline-offset-[3px] md:text-[15px] ${FOCUS_RING}`;

export function LatestVideos({ videos }: { videos: SocialHighlight[] }) {
  const cards = getChannelRow(videos);
  if (cards.length === 0) return null;

  return (
    <HomeSection id="titulo-ultimos-videos" title="Últimos vídeos" className="pb-10 md:pb-14">
      <VideoRow videos={cards} desktopGrid />
      <div className="flex flex-wrap gap-x-6">
        <Link href="/videos" className={MORE_LINK}>
          Ver todos os vídeos
        </Link>
        <Link href={brandLinks.youtube} target="_blank" rel="noopener noreferrer" className={MORE_LINK}>
          Ver canal do YouTube
        </Link>
      </div>
    </HomeSection>
  );
}
