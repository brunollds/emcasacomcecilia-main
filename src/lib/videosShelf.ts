import { brandLinks } from '@/lib/brandLinks';
import { sanitizeViewTransitionName } from '@/lib/viewTransition';

// Regras de /videos e da página de cada vídeo que valem no servidor e no navegador: os tipos, o formato, a
// duração e a data em texto, o filtro por loja (?loja=), o cartão e a medição. Sem dados: componente cliente
// importa daqui, nunca do videosHub.ts (que lê as lojas, os artigos e as receitas).

export const VIDEO_ASPECTS = ['vertical', 'horizontal', 'square'] as const;
export type VideoAspect = (typeof VIDEO_ASPECTS)[number];

export function isVideoAspect(value: unknown): value is VideoAspect {
  return typeof value === 'string' && (VIDEO_ASPECTS as readonly string[]).includes(value);
}

// A duração no painel ("1 min 12 s"), no selo do cartão ("1:12") e no nome do link para o leitor de tela
// ("1 minuto e 12 segundos").
export type VideoDuration = { text: string; badge: string; spoken: string };
export type VideoStore = { slug: string; name: string };
export type VideoSourceKind = 'guia' | 'receita';
export type VideoSource = { href: string; title: string; image: string | null; kind: VideoSourceKind };
export type VideoPlayerSource = { kind: 'youtube'; embedUrl: string } | { kind: 'local'; contentUrl: string };

export type VideoItem = {
  slug: string;
  href: string;
  title: string;
  description: string;
  aspect: VideoAspect;
  // A miniatura (YouTube) ou o poster (MP4), já no endereço de entrega.
  thumbnail: string;
  // Como está no registro, com ou sem hora.
  uploadDate: string;
  dateLabel: string;
  duration: VideoDuration | null;
  // A loja ativa do artigo de origem; null para receita, artigo sem loja ou loja pausada.
  store: VideoStore | null;
  source: VideoSource;
  codeLink: { label: string; href: string } | null;
  player: VideoPlayerSource;
};

// O cartão vertical: um vídeo com página no site (toVideoCard) ou um upload do canal (getChannelRow).
export type VideoCardData = {
  id: string;
  title: string;
  href: string;
  // Só no YouTube: abre numa aba nova.
  external: boolean;
  thumbnail: string | null;
  // O nome da transição da miniatura para o player; só nos vídeos com página no site.
  vtName: string | null;
  duration: VideoDuration | null;
  // A loja, ou "Receita", embaixo do título.
  label: string | null;
};

// O vídeo da grade de /videos como o navegador o recebe: o cartão e o slug da loja, que o chip filtra. A
// descrição, o player, a origem e o botão do código ficam no servidor: a grade não lê nenhum, e iam inteiros
// no payload da página, que todo link para /videos baixa no prefetch.
export type VideoGridItem = VideoCardData & { storeSlug: string | null };

const DURATION_UNITS = [
  { short: 'h', one: 'hora', many: 'horas' },
  { short: 'min', one: 'minuto', many: 'minutos' },
  { short: 's', one: 'segundo', many: 'segundos' },
] as const;

export function formatDuration(totalSeconds: number | undefined): VideoDuration | null {
  if (!totalSeconds || !Number.isFinite(totalSeconds) || totalSeconds < 0) return null;
  const whole = Math.round(totalSeconds);
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor((whole % 3600) / 60);
  const seconds = whole % 60;
  const values = [hours, minutes, seconds];
  const present = DURATION_UNITS.map((unit, index) => ({ ...unit, value: values[index] })).filter(({ value }) => value > 0);
  const pad = (value: number) => String(value).padStart(2, '0');
  const words = present.map(({ value, one, many }) => `${value} ${value === 1 ? one : many}`);
  return {
    text: present.map(({ value, short }) => `${value} ${short}`).join(' '),
    badge: hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${minutes}:${pad(seconds)}`,
    spoken: words.length > 1 ? `${words.slice(0, -1).join(', ')} e ${words.at(-1)}` : words[0],
  };
}

// DD/MM/AAAA do dia como está no registro: o de quem publicou, não o de UTC.
export function formatVideoDate(uploadDate: string): string {
  const [year, month, day] = uploadDate.slice(0, 10).split('-');
  return `${day}/${month}/${year}`;
}

export const STORE_PARAM = 'loja';

// A loja do ?loja=: só uma das lojas com chip. Vazia, desconhecida, com maiúscula ou de um vídeo só, vale
// "Todos" (null). Repetida, vale a primeira.
export function readStoreFilter(search: string, storeSlugs: readonly string[]): string | null {
  const value = new URLSearchParams(search).get(STORE_PARAM);
  return value !== null && storeSlugs.includes(value) ? value : null;
}

// A query string nova da página: troca só o ?loja= ("Todos" tira todos) e mantém os outros parâmetros
// (utm_*, por exemplo).
export function withStoreFilter(currentSearch: string, store: string | null): string {
  const params = new URLSearchParams(currentSearch);
  params.delete(STORE_PARAM);
  if (store) params.set(STORE_PARAM, store);
  const text = params.toString();
  return text ? `?${text}` : '';
}

export function filterByStore(videos: readonly VideoGridItem[], store: string | null): VideoGridItem[] {
  return store ? videos.filter((video) => video.storeSlug === store) : [...videos];
}

export function videosCountLabel(total: number): string {
  return total === 1 ? '1 vídeo' : `${total} vídeos`;
}

const SOURCE_COPY = {
  guia: { from: 'Do guia', action: 'Ler o guia' },
  receita: { from: 'Da receita', action: 'Ver a receita' },
} as const;

export function sourceCopy(kind: VideoSourceKind) {
  return SOURCE_COPY[kind];
}

export function videoMorphName(slug: string): string {
  return `video-player-${sanitizeViewTransitionName(slug)}`;
}

export function toVideoCard(video: VideoItem): VideoCardData {
  return {
    id: video.slug,
    title: video.title,
    href: video.href,
    external: false,
    thumbnail: video.thumbnail,
    vtName: videoMorphName(video.slug),
    duration: video.duration,
    label: video.store?.name ?? (video.source.kind === 'receita' ? 'Receita' : null),
  };
}

export function toVideoGridItem(video: VideoItem): VideoGridItem {
  return { ...toVideoCard(video), storeSlug: video.store?.slug ?? null };
}

export const VIDEOS_ROUTE_CLICK = 'videos_route_click';
export const VIDEOS_LIST_CONTROL = 'videos_list_control';

export type VideosPlacement =
  | 'videos_featured'
  | 'videos_grid'
  | 'videos_channel'
  | 'videos_subscribe'
  | 'video_source'
  | 'video_more'
  | 'video_channel'
  | 'video_subscribe';

export function getVideosRouteClickParameters({
  href,
  placement,
  linkLabel,
}: {
  href: string;
  placement: VideosPlacement;
  linkLabel: string;
}) {
  return { destination: href, placement, link_label: linkLabel };
}

export function getVideosListControlParameters({ value, listPath }: { value: string; listPath: string }) {
  return { control: 'store', value, list_path: listPath };
}

export const YOUTUBE_SUBSCRIBE_URL = `${brandLinks.youtube}?sub_confirmation=1`;

// A faixa do canal em /videos (videos_*) e na página de cada vídeo (video_*).
export const CHANNEL_PLACEMENTS = {
  videos: { channel: 'videos_channel', subscribe: 'videos_subscribe' },
  video: { channel: 'video_channel', subscribe: 'video_subscribe' },
} as const satisfies Record<string, { channel: VideosPlacement; subscribe: VideosPlacement }>;
