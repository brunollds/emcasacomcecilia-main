import type { ContentSection } from '@/lib/content';
import type { Locale } from '@/lib/i18n/locales';
import { getArticleCopy, getReviewVideoLabels } from './articleCopy';
import { ReviewLoopVideo } from './ReviewLoopVideo';

export interface ReviewSectionVideoProps {
  video: NonNullable<ContentSection['video']>;
  // O que nomeia o vídeo para o leitor de tela quando ele não traz o próprio alt.
  title: string;
  locale: Locale;
}

// O vídeo em loop de uma seção do artigo, com o nome e os botões no idioma da página.
export function ReviewSectionVideo({ video, title, locale }: ReviewSectionVideoProps): React.ReactElement {
  return (
    <div className={`my-6 overflow-hidden rounded-[1.25rem] bg-[#f4f4f5] shadow-soft mx-auto ${
      video.aspect === 'portrait'
        ? 'aspect-[9/16] max-w-md'
        : video.aspect === 'square'
          ? 'aspect-square max-w-2xl'
          : 'aspect-video max-w-2xl'
    }`}>
      <ReviewLoopVideo
        mp4={video.mp4}
        webm={video.webm}
        poster={video.poster}
        ariaLabel={video.alt || getArticleCopy(locale).demoVideo(title)}
        labels={getReviewVideoLabels(locale)}
        preload="metadata"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
