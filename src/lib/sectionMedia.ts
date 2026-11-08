import type { ReviewGalleryImage } from '@/components/review/ReviewGallerySection';
import type { ContentSection, Review } from '@/lib/content/types';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

type LoopVideo = { mp4: string; webm?: string; poster?: string };

function withDeliveredVideo<T extends LoopVideo>(video: T): T {
  return {
    ...video,
    mp4: resolveMediaUrl(video.mp4),
    ...(video.webm ? { webm: resolveMediaUrl(video.webm) } : {}),
    ...(video.poster ? { poster: resolveMediaUrl(video.poster) } : {}),
  };
}

function withDeliveredSectionMedia(section: ContentSection): ContentSection {
  const { image, images, video } = section;
  return {
    ...section,
    ...(typeof image === 'string' && image ? { image: resolveMediaUrl(image) } : {}),
    ...(image && typeof image === 'object' && image.src ? { image: { ...image, src: resolveMediaUrl(image.src) } } : {}),
    ...(images ? { images: images.map((item) => ({ ...item, src: resolveMediaUrl(item.src) })) } : {}),
    ...(video ? { video: withDeliveredVideo(video) } : {}),
  };
}

// A foto da galeria vem em `image` ou, nos artigos antigos, em `url`; a galeria escolhe no navegador.
export function withDeliveredGalleryImage(item: ReviewGalleryImage): ReviewGalleryImage {
  return {
    ...item,
    ...(typeof item.image === 'string' ? { image: resolveMediaUrl(item.image) } : {}),
    ...(typeof item.url === 'string' ? { url: resolveMediaUrl(item.url) } : {}),
  };
}

// As fotos e os vídeos do corpo e o vídeo do topo vão aos componentes cliente com o endereço de entrega: só o
// servidor importa o mapa de mídia. Arquivo sem entrada no mapa segue com o próprio caminho.
export function withDeliveredArticleMedia<T extends Pick<Review, 'contentSections' | 'video'>>(review: T): T {
  return {
    ...review,
    ...(review.contentSections ? { contentSections: review.contentSections.map(withDeliveredSectionMedia) } : {}),
    ...(review.video ? { video: withDeliveredVideo(review.video) } : {}),
  };
}
