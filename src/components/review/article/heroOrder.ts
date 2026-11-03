import type { Review } from '@/lib/content';

// A capa larga (a do Discover, 16:9) abre o artigo logo abaixo da trilha; retrato, quadrado e editorial sem
// imageAspect vão para o fim do topo, senão o título desceria para a segunda tela do celular. O vídeo do topo
// manda no formato quando tem o dele.
export function isHeroFirst(review: Pick<Review, 'video' | 'imageAspect'>): boolean {
  return (review.video?.aspect ?? review.imageAspect) === 'landscape';
}
