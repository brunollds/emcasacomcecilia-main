import { getActiveCoupons, type Coupon } from '@/lib/couponsData';
import { getCouponStorePath } from '@/lib/couponTranslations';
import type { SocialHighlight } from '@/lib/data';
import { codeLinkLabel, ofStore } from '@/lib/homeStores';
import { absoluteMediaUrl, type PageLink, type SocialImage } from '@/lib/pageSeo';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { getYoutubeEmbedUrl } from '@/lib/video-metadata';
import { isoDurationToSeconds, videoPages } from '@/lib/video-pages';
import {
  formatDuration,
  formatVideoDate,
  isVideoAspect,
  videoMorphName,
  videosCountLabel,
  type VideoCardData,
  type VideoItem,
  type VideoPlayerSource,
  type VideoSource,
  type VideoStore,
} from '@/lib/videosShelf';

// Dados de /videos e da página de cada vídeo, montados no servidor a partir de video-pages.js, do artigo ou
// da receita de origem e das lojas ativas. Recebe os artigos e as receitas por parâmetro e não importa
// '@/lib/data', como o reviewsHub.ts; o componente cliente recebe só o resultado. Dado que não fecha (formato,
// origem, título, player) derruba a montagem com o vídeo e o motivo.

// O que a página usa do artigo e da receita de origem.
export type VideoSources = {
  reviews: readonly { slug: string; image?: string; affiliate?: string; locale?: string }[];
  recipes: readonly { slug: string; image?: string }[];
};

// O registro de video-pages.js que a página usa (o arquivo é JavaScript: os campos são conferidos aqui).
export type VideoPageRecord = {
  slug: string;
  kind: string;
  aspect?: string;
  sourcePath: string;
  sourceTitle: string;
  title?: string;
  description?: string;
  uploadDate?: string;
  duration?: string;
  thumbnailUrl?: string;
  embedUrl?: string | null;
  contentUrl?: string;
};

export const VIDEOS_TRAIL: PageLink[] = [
  { name: 'Início', path: '/' },
  { name: 'Vídeos', path: '/videos' },
];

const MIN_STORE_VIDEOS = 2;
const MORE_LIMIT = 8;
const CHANNEL_LIMIT = 6;
const SOURCE_PATH = /^\/(reviews|receitas)\/([^/?#]+)$/;

function findSource(page: VideoPageRecord, sources: VideoSources): VideoSource & { affiliate?: string } {
  const [, section, slug] = page.sourcePath.match(SOURCE_PATH) ?? [];
  if (section === 'reviews') {
    const review = sources.reviews.find((item) => item.slug === slug && (!item.locale || item.locale === 'pt'));
    if (review) {
      return {
        href: page.sourcePath,
        title: page.sourceTitle,
        image: review.image ? resolveMediaUrl(review.image) : null,
        kind: 'guia',
        affiliate: review.affiliate,
      };
    }
  }
  if (section === 'receitas') {
    const recipe = sources.recipes.find((item) => item.slug === slug);
    if (recipe) {
      return {
        href: page.sourcePath,
        title: page.sourceTitle,
        image: recipe.image ? resolveMediaUrl(recipe.image) : null,
        kind: 'receita',
      };
    }
  }
  throw new Error(`vídeo ${page.slug}: a origem ${page.sourcePath} não está entre os artigos e receitas publicados`);
}

function playerOf(page: VideoPageRecord): VideoPlayerSource | null {
  if (page.kind === 'youtube' && page.embedUrl) return { kind: 'youtube', embedUrl: page.embedUrl };
  if (page.kind === 'local' && page.contentUrl) return { kind: 'local', contentUrl: resolveMediaUrl(page.contentUrl) };
  return null;
}

function toVideoItem(page: VideoPageRecord, sources: VideoSources, stores: readonly Coupon[]): VideoItem {
  const fail = (reason: string) => new Error(`vídeo ${page.slug}: ${reason}`);
  if (!isVideoAspect(page.aspect)) throw fail(`aspect inválido (${page.aspect}); use vertical, horizontal ou square`);
  if (!page.title || !page.description || !page.uploadDate || !page.thumbnailUrl) {
    throw fail('sem título, descrição, data ou miniatura');
  }
  const player = playerOf(page);
  if (!player) throw fail('sem o endereço do player');
  const { affiliate, ...source } = findSource(page, sources);
  const store = stores.find(({ slug }) => slug === affiliate);
  return {
    slug: page.slug,
    href: `/videos/${page.slug}`,
    title: page.title,
    description: page.description,
    aspect: page.aspect,
    thumbnail: resolveMediaUrl(page.thumbnailUrl),
    uploadDate: page.uploadDate,
    dateLabel: formatVideoDate(page.uploadDate),
    duration: formatDuration(isoDurationToSeconds(page.duration)),
    store: store ? { slug: store.slug, name: store.brand } : null,
    source,
    codeLink: store ? { label: codeLinkLabel(store), href: getCouponStorePath(store.slug, 'pt') } : null,
    player,
  };
}

// Do mais novo ao mais antigo pelo instante (com e sem hora, com fuso); no empate, pelo slug.
function byNewest(a: VideoItem, b: VideoItem): number {
  return Date.parse(b.uploadDate) - Date.parse(a.uploadDate) || a.slug.localeCompare(b.slug);
}

export function getVideoItems(
  sources: VideoSources,
  pages: readonly VideoPageRecord[] = videoPages,
  stores: readonly Coupon[] = getActiveCoupons()
): VideoItem[] {
  return pages.map((page) => toVideoItem(page, sources, stores)).sort(byNewest);
}

// Os chips: as lojas ativas com 2 ou mais vídeos, na ordem das lojas.
function getStoreChips(videos: readonly VideoItem[], stores: readonly Coupon[]): VideoStore[] {
  return stores
    .filter((store) => videos.filter((video) => video.store?.slug === store.slug).length >= MIN_STORE_VIDEOS)
    .map((store) => ({ slug: store.slug, name: store.brand }));
}

export type VideosHubContent = {
  intro: string;
  featured: VideoItem;
  videos: VideoItem[];
  stores: VideoStore[];
  socialImage: SocialImage;
};

export function getVideosHubContent(
  sources: VideoSources,
  pages: readonly VideoPageRecord[] = videoPages,
  stores: readonly Coupon[] = getActiveCoupons()
): VideosHubContent {
  const videos = getVideoItems(sources, pages, stores);
  const [featured] = videos;
  if (!featured) throw new Error('/videos: nenhum vídeo em video-pages.js');
  return {
    intro: `${videosCountLabel(videos.length)} da casa da Cecília. Cada um leva ao guia ou à receita completa.`,
    featured,
    videos,
    stores: getStoreChips(videos, stores),
    socialImage: { url: absoluteMediaUrl(featured.thumbnail), alt: featured.title },
  };
}

export type VideoPageContent = {
  video: VideoItem;
  // A trilha visível, da mesma lista que o BreadcrumbList.
  trail: PageLink[];
  more: { title: string; videos: VideoItem[] };
};

// A página de um vídeo; null quando o slug não tem página. "Mais vídeos": primeiro os da mesma loja, depois
// os mais novos, sem o vídeo aberto, até 8.
export function getVideoPageContent(
  sources: VideoSources,
  slug: string,
  pages: readonly VideoPageRecord[] = videoPages,
  stores: readonly Coupon[] = getActiveCoupons()
): VideoPageContent | null {
  const videos = getVideoItems(sources, pages, stores);
  const video = videos.find((item) => item.slug === slug);
  if (!video) return null;
  const others = videos.filter((item) => item.slug !== slug);
  const sameStore = video.store ? others.filter((item) => item.store?.slug === video.store?.slug) : [];
  const rest = others.filter((item) => !sameStore.includes(item));
  return {
    video,
    trail: [...VIDEOS_TRAIL, { name: video.title, path: video.href }],
    more: {
      title:
        video.store && sameStore.length > 0
          ? `Mais vídeos ${ofStore({ slug: video.store.slug, brand: video.store.name })}`
          : 'Mais vídeos',
      videos: [...sameStore, ...rest].slice(0, MORE_LIMIT),
    },
  };
}

// Os últimos uploads do canal (home e /videos), no máximo 6: o que tem página no site leva a ela (com a
// miniatura pronta para voar até o player); os outros vão ao YouTube. A miniatura do YouTube, senão a
// reserva da API, senão nenhuma.
export function getChannelRow(
  highlights: readonly SocialHighlight[],
  pages: readonly VideoPageRecord[] = videoPages
): VideoCardData[] {
  return highlights.slice(0, CHANNEL_LIMIT).map((highlight) => {
    const embedUrl = getYoutubeEmbedUrl(highlight.url);
    const page = embedUrl ? pages.find((item) => item.kind === 'youtube' && item.embedUrl === embedUrl) : undefined;
    const thumbnail = highlight.thumbnailUrl || highlight.fallbackThumbnailUrl;
    return {
      id: highlight.id,
      title: highlight.title,
      href: page ? `/videos/${page.slug}` : highlight.url,
      external: !page,
      thumbnail: thumbnail ? resolveMediaUrl(thumbnail) : null,
      vtName: page ? videoMorphName(page.slug) : null,
      duration: null,
      label: null,
    };
  });
}
