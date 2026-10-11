import assert from 'node:assert/strict';
import { createElement, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { imageConfigDefault, type ImageConfigComplete, type RemotePattern } from 'next/dist/shared/lib/image-config';
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';

import { FOCUS_RING } from '@/components/ui/focusRing';
import { ScrollRow } from '@/components/ui/ScrollRow';
import { TrackedVideosLink, VideoPageLink } from '@/components/videos/TrackedVideosLink';
import { VideoCard } from '@/components/videos/VideoCard';
import { VideoRow } from '@/components/videos/VideoRow';
import { COUPONS } from '@/lib/couponsData';
import { publishedReviews, recipes, type SocialHighlight } from '@/lib/data';
import { IMAGE_REMOTE_PATTERNS } from '@/lib/imageHosts.mjs';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { videoPages } from '@/lib/video-pages';
import {
  VIDEOS_TRAIL,
  getChannelRow,
  getVideoItems,
  getVideoPageContent,
  getVideosHubContent,
  type VideoPageRecord,
  type VideoSources,
} from '@/lib/videosHub';
import {
  CHANNEL_PLACEMENTS,
  VIDEOS_LIST_CONTROL,
  VIDEOS_ROUTE_CLICK,
  YOUTUBE_SUBSCRIBE_URL,
  filterByStore,
  formatDuration,
  formatVideoDate,
  getVideosListControlParameters,
  getVideosRouteClickParameters,
  isVideoAspect,
  readStoreFilter,
  sourceCopy,
  toVideoCard,
  videoMorphName,
  videosCountLabel,
  withStoreFilter,
  type VideoItem,
} from '@/lib/videosShelf';

// /videos e a página de cada vídeo: as regras de videosShelf.ts, os dados de videosHub.ts e os componentes,
// renderizados como o servidor os entrega. Sem DOM, os cliques são exercitados com eventos falsos.

function store(slug: string) {
  const found = COUPONS.find((coupon) => coupon.slug === slug);
  assert.ok(found, `loja ${slug} existe em couponsData.ts`);
  return found;
}

function page(slug: string, overrides: Partial<VideoPageRecord> = {}): VideoPageRecord {
  return {
    slug,
    kind: 'youtube',
    aspect: 'vertical',
    sourcePath: `/reviews/${slug}-guia`,
    sourceTitle: `Guia ${slug}`,
    title: `Vídeo ${slug}`,
    description: `Descrição ${slug}`,
    uploadDate: '2026-01-01',
    duration: 'PT54S',
    thumbnailUrl: `https://i.ytimg.com/vi/${slug}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${slug}`,
    ...overrides,
  };
}

// 8 vídeos, fora de ordem. Os três mais novos são do mesmo dia: o das 13h UTC (escrito com -03:00) vem antes
// do das 12h UTC, embora a ordem do texto diga o contrário, e o do dia sem hora (meia-noite UTC) vem depois. A
// DAMIE e a Dolce Gusto têm 2 vídeos cada (a Dolce Gusto, um MP4 quadrado sem duração); a YesStyle tem um só
// (sem chip); a Kopenhagen não está entre as lojas passadas (loja inativa); há uma receita e um guia sem loja
// e sem foto.
const fixturePages: VideoPageRecord[] = [
  page('mesmo-dia', { uploadDate: '2026-09-01T12:00:00Z', duration: 'PT1M7S' }),
  page('novo-damie', { uploadDate: '2026-09-01T10:00:00-03:00' }),
  page('cafe', { aspect: 'horizontal', uploadDate: '2026-09-01', duration: 'PT18M17S' }),
  page('cafe-local', {
    kind: 'local',
    aspect: 'square',
    uploadDate: '2026-08-01',
    duration: undefined,
    thumbnailUrl: '/images/teste/cafe-local-poster.jpg',
    embedUrl: undefined,
    contentUrl: '/videos/teste/cafe-local.mp4',
  }),
  page('receita', {
    sourcePath: '/receitas/bolo-teste',
    sourceTitle: 'Bolo de teste',
    uploadDate: '2026-07-01',
    duration: 'PT1M12S',
  }),
  page('sem-loja', { uploadDate: '2026-06-01', duration: 'PT1M' }),
  page('inativa', { uploadDate: '2026-05-01', duration: 'PT59S' }),
  page('um-so', { aspect: 'horizontal', uploadDate: '2026-04-01', duration: 'PT3M27S' }),
];

const guide = (slug: string, affiliate?: string) => ({
  slug: `${slug}-guia`,
  image: `/images/reviews/teste/${slug}.webp`,
  affiliate,
});
const fixtureSources: VideoSources = {
  reviews: [
    guide('mesmo-dia', 'damie'),
    guide('novo-damie', 'damie'),
    guide('cafe', 'dolce-gusto'),
    guide('cafe-local', 'dolce-gusto'),
    { slug: 'sem-loja-guia' },
    guide('inativa', 'kopenhagen'),
    guide('um-so', 'yesstyle'),
  ],
  recipes: [{ slug: 'bolo-teste', image: '/images/recipes/teste/bolo.avif' }],
};
const fixtureStores = [store('damie'), store('dolce-gusto'), store('yesstyle')];

const items = getVideoItems(fixtureSources, fixturePages, fixtureStores);
const slugs = (videos: readonly { slug: string }[]) => videos.map(({ slug }) => slug);
const item = (slug: string): VideoItem => {
  const found = items.find((video) => video.slug === slug);
  assert.ok(found, `vídeo ${slug}`);
  return found;
};

// Ordem: do mais novo ao mais antigo pelo instante, com e sem hora, com fuso.
assert.deepEqual(slugs(items), ['novo-damie', 'mesmo-dia', 'cafe', 'cafe-local', 'receita', 'sem-loja', 'inativa', 'um-so']);

// O vídeo como a página o recebe: data e duração em texto, a loja ativa, a origem e o botão do código.
const novo = item('novo-damie');
assert.deepEqual(novo, {
  slug: 'novo-damie',
  href: '/videos/novo-damie',
  title: 'Vídeo novo-damie',
  description: 'Descrição novo-damie',
  aspect: 'vertical',
  thumbnail: 'https://i.ytimg.com/vi/novo-damie/hqdefault.jpg',
  uploadDate: '2026-09-01T10:00:00-03:00',
  dateLabel: '01/09/2026',
  duration: { text: '54 s', badge: '0:54', spoken: '54 segundos' },
  store: { slug: 'damie', name: 'DAMIE' },
  source: {
    href: '/reviews/novo-damie-guia',
    title: 'Guia novo-damie',
    image: resolveMediaUrl('/images/reviews/teste/novo-damie.webp'),
    kind: 'guia',
  },
  codeLink: { label: 'Ver o código da DAMIE', href: '/cupons/damie' },
  player: { kind: 'youtube', embedUrl: 'https://www.youtube.com/embed/novo-damie' },
});
assert.deepEqual(item('cafe').codeLink, { label: 'Ver o código da Dolce Gusto', href: '/cupons/dolce-gusto' });
assert.deepEqual(item('um-so').codeLink, { label: 'Ver o código da YesStyle', href: '/cupons/yesstyle' });

// MP4 do site: sem duração (nada de selo nem de texto), miniatura e arquivo pelo resolvedor de mídia.
const local = item('cafe-local');
assert.equal(local.duration, null);
assert.equal(local.aspect, 'square');
assert.equal(local.thumbnail, resolveMediaUrl('/images/teste/cafe-local-poster.jpg'));
assert.deepEqual(local.player, { kind: 'local', contentUrl: resolveMediaUrl('/videos/teste/cafe-local.mp4') });

// Receita, guia sem loja (e sem foto) e loja inativa: sem loja e sem botão do código.
const receita = item('receita');
assert.deepEqual(receita.source, {
  href: '/receitas/bolo-teste',
  title: 'Bolo de teste',
  image: resolveMediaUrl('/images/recipes/teste/bolo.avif'),
  kind: 'receita',
});
for (const slug of ['receita', 'sem-loja', 'inativa']) {
  assert.equal(item(slug).store, null, `${slug}: sem loja`);
  assert.equal(item(slug).codeLink, null, `${slug}: sem botão do código`);
}
assert.equal(item('sem-loja').source.image, null, 'artigo sem foto');

// A versão em português do artigo vale, mesmo com outra versão do mesmo slug antes dela.
const withForeignTwin: VideoSources = {
  ...fixtureSources,
  reviews: [{ slug: 'novo-damie-guia', locale: 'en', image: '/images/reviews/teste/en.webp' }, ...fixtureSources.reviews],
};
assert.equal(
  getVideoItems(withForeignTwin, [page('novo-damie')], fixtureStores)[0].store?.slug,
  'damie',
  'a origem é a versão em português'
);

// Dados que não fecham derrubam a montagem, com o vídeo e o motivo.
assert.throws(() => getVideoItems(fixtureSources, [page('novo-damie', { aspect: 'retrato' })], fixtureStores), /vídeo novo-damie: aspect inválido/);
assert.throws(() => getVideoItems(fixtureSources, [page('novo-damie', { aspect: undefined })], fixtureStores), /aspect inválido/);
assert.throws(() => getVideoItems(fixtureSources, [page('orfao')], fixtureStores), /vídeo orfao: a origem \/reviews\/orfao-guia não está/);
assert.throws(
  () => getVideoItems(fixtureSources, [page('novo-damie', { sourcePath: '/cupons/damie' })], fixtureStores),
  /a origem \/cupons\/damie não está/
);
assert.throws(
  () => getVideoItems(fixtureSources, [page('novo-damie', { title: undefined })], fixtureStores),
  /sem título, descrição, data ou miniatura/
);
assert.throws(
  () => getVideoItems(fixtureSources, [page('cafe-local', { kind: 'local', embedUrl: undefined, contentUrl: undefined })], fixtureStores),
  /sem o endereço do player/
);

// O formato.
for (const aspect of ['vertical', 'horizontal', 'square']) assert.equal(isVideoAspect(aspect), true, aspect);
for (const aspect of ['Vertical', 'retrato', '', undefined, null, 1]) assert.equal(isVideoAspect(aspect), false, String(aspect));

// /videos: o destaque é o mais novo, a grade traz todos (inclusive o destaque), os chips são as lojas ativas
// com 2 ou mais vídeos na ordem das lojas, e a imagem de compartilhamento é a miniatura do destaque.
const hub = getVideosHubContent(fixtureSources, fixturePages, fixtureStores);
assert.equal(hub.featured.slug, 'novo-damie');
assert.deepEqual(slugs(hub.videos), slugs(items));
assert.equal(hub.intro, '8 vídeos da casa da Cecília. Cada um leva ao guia ou à receita completa.');
assert.deepEqual(hub.stores, [
  { slug: 'damie', name: 'DAMIE' },
  { slug: 'dolce-gusto', name: 'Dolce Gusto' },
]);
assert.deepEqual(hub.socialImage, { url: 'https://i.ytimg.com/vi/novo-damie/hqdefault.jpg', alt: 'Vídeo novo-damie' });
assert.deepEqual(
  getVideosHubContent(fixtureSources, fixturePages, [...fixtureStores].reverse()).stores.map(({ slug }) => slug),
  ['dolce-gusto', 'damie'],
  'os chips seguem a ordem das lojas'
);
// Controle: com um segundo vídeo, a YesStyle ganha chip.
const twoYesStyle = getVideosHubContent(
  { ...fixtureSources, reviews: [...fixtureSources.reviews, guide('um-so-2', 'yesstyle')] },
  [...fixturePages, page('um-so-2', { uploadDate: '2026-03-01' })],
  fixtureStores
);
assert.deepEqual(twoYesStyle.stores.map(({ slug }) => slug), ['damie', 'dolce-gusto', 'yesstyle']);
assert.match(getVideosHubContent(fixtureSources, [fixturePages[0]], fixtureStores).intro, /^1 vídeo da casa da Cecília\./);
assert.throws(() => getVideosHubContent(fixtureSources, [], fixtureStores), /nenhum vídeo/);

// Duração: o selo, o texto do painel e o nome acessível, por extenso.
assert.deepEqual(formatDuration(54), { text: '54 s', badge: '0:54', spoken: '54 segundos' });
assert.deepEqual(formatDuration(67), { text: '1 min 7 s', badge: '1:07', spoken: '1 minuto e 7 segundos' });
assert.deepEqual(formatDuration(72), { text: '1 min 12 s', badge: '1:12', spoken: '1 minuto e 12 segundos' });
assert.deepEqual(formatDuration(1097), { text: '18 min 17 s', badge: '18:17', spoken: '18 minutos e 17 segundos' });
assert.deepEqual(formatDuration(60), { text: '1 min', badge: '1:00', spoken: '1 minuto' });
assert.deepEqual(formatDuration(61), { text: '1 min 1 s', badge: '1:01', spoken: '1 minuto e 1 segundo' });
assert.deepEqual(formatDuration(3723), { text: '1 h 2 min 3 s', badge: '1:02:03', spoken: '1 hora, 2 minutos e 3 segundos' });
assert.deepEqual(formatDuration(7200), { text: '2 h', badge: '2:00:00', spoken: '2 horas' });
assert.equal(formatDuration(undefined), null);
assert.equal(formatDuration(0), null);
assert.equal(formatDuration(Number.NaN), null);
assert.deepEqual(item('mesmo-dia').duration, formatDuration(67), 'PT1M7S');
assert.deepEqual(item('sem-loja').duration, formatDuration(60), 'PT1M');

// Data: o dia como está no registro, o de quem publicou (em UTC, o vídeo das 18h35 de -07:00 já é dia 28).
assert.equal(formatVideoDate('2026-09-27T18:35:34-07:00'), '27/09/2026');
assert.equal(formatVideoDate('2026-03-19'), '19/03/2026');

// URL: só uma loja com chip vale; o resto é "Todos". "Todos" tira todo ?loja= e os outros parâmetros ficam.
const chipSlugs = hub.stores.map(({ slug }) => slug);
assert.equal(readStoreFilter('?loja=damie', chipSlugs), 'damie');
assert.equal(readStoreFilter('?utm_source=ig&loja=dolce-gusto', chipSlugs), 'dolce-gusto');
assert.equal(readStoreFilter('', chipSlugs), null);
assert.equal(readStoreFilter('?loja=', chipSlugs), null);
assert.equal(readStoreFilter('?loja=inexistente', chipSlugs), null, 'loja desconhecida');
assert.equal(readStoreFilter('?loja=yesstyle', chipSlugs), null, 'loja de um vídeo só');
assert.equal(readStoreFilter('?loja=DAMIE', chipSlugs), null, 'maiúscula não é o slug');
assert.equal(readStoreFilter('?loja=damie&loja=x', chipSlugs), 'damie', 'repetido: vale o primeiro');
assert.equal(withStoreFilter('', 'damie'), '?loja=damie');
assert.equal(withStoreFilter('?utm_source=ig', 'damie'), '?utm_source=ig&loja=damie');
assert.equal(withStoreFilter('?loja=damie&utm_source=ig', 'dolce-gusto'), '?utm_source=ig&loja=dolce-gusto');
assert.equal(withStoreFilter('?loja=damie&utm_source=ig', null), '?utm_source=ig');
assert.equal(withStoreFilter('?loja=damie&loja=x', null), '');
assert.deepEqual(slugs(filterByStore(hub.videos, 'damie')), ['novo-damie', 'mesmo-dia']);
assert.deepEqual(slugs(filterByStore(hub.videos, null)), slugs(hub.videos));
assert.equal(videosCountLabel(1), '1 vídeo');
assert.equal(videosCountLabel(0), '0 vídeos');
assert.equal(videosCountLabel(14), '14 vídeos');

// O cartão: a loja embaixo (ou "Receita"), e o nome da transição para o player.
assert.deepEqual(toVideoCard(novo), {
  id: 'novo-damie',
  title: 'Vídeo novo-damie',
  href: '/videos/novo-damie',
  external: false,
  thumbnail: 'https://i.ytimg.com/vi/novo-damie/hqdefault.jpg',
  vtName: 'video-player-novo-damie',
  duration: novo.duration,
  label: 'DAMIE',
});
assert.equal(toVideoCard(receita).label, 'Receita');
assert.equal(toVideoCard(item('sem-loja')).label, null);
assert.equal(toVideoCard(item('inativa')).label, null);
assert.equal(videoMorphName('Poltrona Levita_2.0'), 'video-player-poltrona-levita-2-0');
assert.deepEqual(sourceCopy('guia'), { from: 'Do guia', action: 'Ler o guia' });
assert.deepEqual(sourceCopy('receita'), { from: 'Da receita', action: 'Ver a receita' });

// A página do vídeo: a trilha, e "Mais vídeos" com a mesma loja primeiro, sem o vídeo aberto, até 8.
const damiePage = getVideoPageContent(fixtureSources, 'novo-damie', fixturePages, fixtureStores);
assert.ok(damiePage);
assert.deepEqual(VIDEOS_TRAIL, [
  { name: 'Início', path: '/' },
  { name: 'Vídeos', path: '/videos' },
]);
assert.deepEqual(damiePage.trail, [...VIDEOS_TRAIL, { name: 'Vídeo novo-damie', path: '/videos/novo-damie' }]);
assert.equal(damiePage.more.title, 'Mais vídeos da DAMIE');
assert.deepEqual(slugs(damiePage.more.videos), ['mesmo-dia', 'cafe', 'cafe-local', 'receita', 'sem-loja', 'inativa', 'um-so']);
// O outro vídeo da Dolce Gusto vem antes dos mais novos das outras lojas.
assert.deepEqual(
  slugs(getVideoPageContent(fixtureSources, 'cafe-local', fixturePages, fixtureStores)?.more.videos ?? []),
  ['cafe', 'novo-damie', 'mesmo-dia', 'receita', 'sem-loja', 'inativa', 'um-so']
);
// Loja sem outro vídeo, vídeo sem loja, loja inativa e receita: "Mais vídeos", os mais novos.
for (const slug of ['um-so', 'sem-loja', 'inativa', 'receita']) {
  const content = getVideoPageContent(fixtureSources, slug, fixturePages, fixtureStores);
  assert.equal(content?.more.title, 'Mais vídeos', slug);
  assert.deepEqual(slugs(content?.more.videos ?? []), slugs(items).filter((other) => other !== slug), slug);
}
const extras = Array.from({ length: 6 }, (_, index) => page(`extra-${index}`, { uploadDate: `2026-10-0${index + 1}` }));
const crowded = getVideoPageContent(
  { ...fixtureSources, reviews: [...fixtureSources.reviews, ...extras.map(({ slug }) => guide(slug))] },
  'cafe',
  [...fixturePages, ...extras],
  fixtureStores
);
assert.equal(crowded?.more.title, 'Mais vídeos da Dolce Gusto');
assert.deepEqual(
  slugs(crowded?.more.videos ?? []),
  ['cafe-local', 'extra-5', 'extra-4', 'extra-3', 'extra-2', 'extra-1', 'extra-0', 'novo-damie'],
  'no máximo 8'
);
assert.equal(getVideoPageContent(fixtureSources, 'nao-existe', fixturePages, fixtureStores), null);

// O canal: no máximo 6; o upload com página no site (também por link de Short) leva a ela, com o nome da
// transição; os outros vão ao YouTube. Sem a miniatura, a reserva; sem nenhuma, nada.
const realYoutube = videoPages.find((video) => video.kind === 'youtube');
assert.ok(realYoutube, 'há vídeo do YouTube com página');
const highlight = (id: string, overrides: Partial<SocialHighlight> = {}): SocialHighlight => ({
  id,
  title: `Upload ${id}`,
  url: `https://www.youtube.com/watch?v=${id}`,
  thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  fallbackThumbnailUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  ...overrides,
});
const channel = getChannelRow([
  highlight(realYoutube.videoId),
  highlight('zzzzzzzzzzz'),
  highlight('shortsxxxxx', { url: `https://www.youtube.com/shorts/${realYoutube.videoId}` }),
  highlight('aaaaaaaaaaa', { thumbnailUrl: undefined }),
  highlight('bbbbbbbbbbb', { thumbnailUrl: undefined, fallbackThumbnailUrl: undefined }),
  highlight('ccccccccccc'),
  highlight('ddddddddddd'),
]);
assert.equal(channel.length, 6);
assert.deepEqual(channel[0], {
  id: realYoutube.videoId,
  title: `Upload ${realYoutube.videoId}`,
  href: `/videos/${realYoutube.slug}`,
  external: false,
  thumbnail: `https://i.ytimg.com/vi/${realYoutube.videoId}/hqdefault.jpg`,
  vtName: videoMorphName(realYoutube.slug),
  duration: null,
  label: null,
});
assert.deepEqual(channel[1], {
  id: 'zzzzzzzzzzz',
  title: 'Upload zzzzzzzzzzz',
  href: 'https://www.youtube.com/watch?v=zzzzzzzzzzz',
  external: true,
  thumbnail: 'https://i.ytimg.com/vi/zzzzzzzzzzz/hqdefault.jpg',
  vtName: null,
  duration: null,
  label: null,
});
assert.equal(channel[2].href, `/videos/${realYoutube.slug}`, 'link de Short também acha a página');
assert.equal(channel[3].thumbnail, 'https://i.ytimg.com/vi/aaaaaaaaaaa/maxresdefault.jpg');
assert.equal(channel[4].thumbnail, null);
assert.deepEqual(getChannelRow([]), []);

// Medição e o endereço de inscrição.
assert.equal(VIDEOS_ROUTE_CLICK, 'videos_route_click');
assert.equal(VIDEOS_LIST_CONTROL, 'videos_list_control');
assert.deepEqual(getVideosRouteClickParameters({ href: '/videos/x', placement: 'videos_grid', linkLabel: 'X' }), {
  destination: '/videos/x',
  placement: 'videos_grid',
  link_label: 'X',
});
assert.deepEqual(getVideosListControlParameters({ value: 'damie', listPath: '/videos' }), {
  control: 'store',
  value: 'damie',
  list_path: '/videos',
});
assert.equal(YOUTUBE_SUBSCRIBE_URL, 'https://youtube.com/@emcasacomcecilia?sub_confirmation=1');
assert.deepEqual(CHANNEL_PLACEMENTS, {
  videos: { channel: 'videos_channel', subscribe: 'videos_subscribe' },
  video: { channel: 'video_channel', subscribe: 'video_subscribe' },
});

// Componentes, renderizados como o servidor os entrega. Fora do Next, o next/image não conhece os hosts do
// next.config.mjs, e o useRouter() do ViewTransitionLink exige o roteador do App Router montado.
const imageConfig: ImageConfigComplete = {
  ...imageConfigDefault,
  remotePatterns: IMAGE_REMOTE_PATTERNS as RemotePattern[],
};
const router = { back() {}, forward() {}, refresh() {}, push() {}, replace() {}, prefetch() {} };

function render(element: ReactElement): string {
  return renderToStaticMarkup(
    createElement(
      ImageConfigContext.Provider,
      { value: imageConfig },
      createElement(AppRouterContext.Provider, { value: router }, element)
    )
  );
}

// O texto que o leitor de tela lê no link, na ordem do DOM: o HTML sem as tags.
const textOf = (html: string) => html.replace(/<[^>]*>/g, '');
const count = (html: string, pattern: RegExp) => html.match(pattern)?.length ?? 0;
const openingTag = (html: string) => html.match(/^<a [^>]*>/)?.[0] ?? '';

// Cartão de vídeo com página: link para a página na mesma aba, com o anel de foco; a miniatura decorativa
// (alt vazio, sem pressa) com o nome da transição só no data-vt-name; o título num h3 de até 3 linhas; no
// nome do link, depois do título, a duração por extenso e a loja. O selo "0:54" é só visual.
const card = render(createElement(VideoCard, { video: toVideoCard(novo), sizes: '160px', placement: 'videos_grid' }));
const cardTag = openingTag(card);
assert.match(cardTag, /href="\/videos\/novo-damie"/);
assert.ok(cardTag.includes(FOCUS_RING), 'cartão sem o anel de foco');
assert.ok(!cardTag.includes('target='), 'vídeo com página abre na mesma aba');
assert.ok(card.includes('data-vt-name="video-player-novo-damie"'));
assert.ok(!card.includes('view-transition-name'), 'nome de transição só no clique');
assert.match(card, /<img\b[^>]*\balt=""/);
assert.match(card, /<img\b[^>]*\bloading="lazy"/);
assert.match(card, /<h3 class="line-clamp-3[^"]*">Vídeo novo-damie<\/h3>/);
assert.match(card, /<span class="sr-only">54 segundos<\/span>/);
assert.match(card, /<span aria-hidden="true" class="[^"]*">0:54<\/span>/, 'o selo é só visual');
const cardText = textOf(card);
assert.ok(
  cardText.indexOf('Vídeo novo-damie') === 0 &&
    cardText.indexOf('54 segundos') > 0 &&
    cardText.indexOf('DAMIE', cardText.indexOf('54 segundos')) > 0,
  `nome do link: título, duração e loja (${cardText})`
);
assert.equal(textOf(render(createElement(VideoCard, { video: toVideoCard(item('sem-loja')), sizes: '1px' }))), 'Vídeo sem-loja1 minuto1:00');
assert.ok(textOf(render(createElement(VideoCard, { video: toVideoCard(receita), sizes: '1px' }))).includes('Receita'));

// MP4 sem duração: sem selo e sem texto de duração.
const localCard = render(createElement(VideoCard, { video: toVideoCard(local), sizes: '1px' }));
assert.ok(!localCard.includes('sr-only') && !/\d:\d\d/.test(textOf(localCard)), 'MP4 sem duração');
assert.ok(!/undefined|NaN/.test(localCard));

// Upload só no YouTube: aba nova, sem nome de transição; sem miniatura, o fundo marinho.
const externalCard = render(createElement(VideoCard, { video: channel[1], sizes: '1px', placement: 'videos_channel' }));
assert.match(openingTag(externalCard), /target="_blank"/);
assert.match(openingTag(externalCard), /rel="noopener noreferrer"/);
assert.ok(!externalCard.includes('data-vt-name'));
assert.equal(count(render(createElement(VideoCard, { video: channel[4], sizes: '1px' })), /<img/g), 0);

// O link certo para cada caso: a página do vídeo pelo VideoPageLink (com a troca animada), o YouTube pelo
// TrackedVideosLink; o placement chega aos dois.
const internalElement = VideoCard({ video: toVideoCard(novo), sizes: '1px', placement: 'videos_grid' });
assert.equal(internalElement.type, VideoPageLink);
assert.equal(internalElement.props.placement, 'videos_grid');
assert.equal(VideoCard({ video: channel[1], sizes: '1px', placement: 'videos_channel' }).type, TrackedVideosLink);

// Cliques: medidos como videos_route_click com o destino, o placement e o texto do link; sem placement (a
// home) e com o clique cancelado, nada. Os componentes rodam como função (nenhum usa hook) e o onClick do
// elemento devolvido recebe um evento falso, com o window.gtag trocado por um espião.
type ClickableElement = { props: { onClick?: (event: { defaultPrevented: boolean }) => void } };
function gtagCallsOf({ props }: ClickableElement, event: { defaultPrevented: boolean } = { defaultPrevented: false }) {
  const calls: unknown[][] = [];
  Object.assign(globalThis, { window: { gtag: (...args: unknown[]) => calls.push(args) } });
  try {
    props.onClick?.(event);
  } finally {
    Reflect.deleteProperty(globalThis, 'window');
  }
  return calls;
}
const gridClick = ['event', 'videos_route_click', { destination: '/videos/novo-damie', placement: 'videos_grid', link_label: 'Vídeo novo-damie' }];
assert.deepEqual(
  gtagCallsOf(VideoPageLink({ href: '/videos/novo-damie', placement: 'videos_grid', linkLabel: 'Vídeo novo-damie', children: null })),
  [gridClick]
);
assert.deepEqual(gtagCallsOf(VideoPageLink({ href: '/videos/novo-damie', linkLabel: 'Vídeo novo-damie', children: null })), [], 'home');
const subscribeLink = { href: YOUTUBE_SUBSCRIBE_URL, placement: 'videos_subscribe', linkLabel: 'Inscrever-se no canal' } as const;
assert.deepEqual(gtagCallsOf(TrackedVideosLink({ ...subscribeLink, children: null })), [
  ['event', 'videos_route_click', { destination: YOUTUBE_SUBSCRIBE_URL, placement: 'videos_subscribe', link_label: 'Inscrever-se no canal' }],
]);
assert.deepEqual(gtagCallsOf(TrackedVideosLink({ ...subscribeLink, children: null }), { defaultPrevented: true }), []);

// A fila: um ScrollRow; cada cartão entra na rolagem (revela, com a posição em --i). O canal vira 6 colunas
// a partir de 1024 px; "Mais vídeos" rola em toda largura.
const channelRow = render(createElement(VideoRow, { videos: channel, placement: 'videos_channel', desktopGrid: true }));
assert.match(channelRow, /^<ul class="hide-scrollbar [^"]*lg:grid-cols-6/);
assert.equal(count(channelRow, /<li class="revela flex w-40 shrink-0 snap-start md:w-48 lg:w-auto" style="--i:\d"/g), 6);
const moreRow = render(createElement(VideoRow, { videos: items.map(toVideoCard), placement: 'video_more', desktopGrid: false }));
assert.equal(count(moreRow, /<li class="revela flex w-40 shrink-0 snap-start md:w-48 ?" style="--i:\d"/g), items.length);
assert.ok(!moreRow.includes('lg:grid') && !moreRow.includes('lg:w-auto'), 'Mais vídeos rola em toda largura');
assert.equal(VideoRow({ videos: channel, desktopGrid: true }).type, ScrollRow, 'a fila é um ScrollRow');

// Dados reais: toda página de vídeo entra, o destaque é o mais novo, cada chip tem 2 ou mais vídeos e
// nenhuma página repete o próprio vídeo em "Mais vídeos".
const sources: VideoSources = { reviews: publishedReviews, recipes };
const real = getVideosHubContent(sources);
assert.equal(real.videos.length, videoPages.length);
assert.equal(
  Date.parse(real.featured.uploadDate),
  Math.max(...videoPages.map((video) => Date.parse(video.uploadDate))),
  'o destaque é o mais novo'
);
for (const chip of real.stores) {
  assert.ok(filterByStore(real.videos, chip.slug).length >= 2, `${chip.slug}: chip com menos de 2 vídeos`);
}
for (const video of real.videos) {
  const content = getVideoPageContent(sources, video.slug);
  assert.ok(content, video.slug);
  assert.ok(!slugs(content.more.videos).includes(video.slug), `${video.slug}: Mais vídeos com o próprio vídeo`);
}

console.log(
  `✅ videosHub: ${real.videos.length} vídeos (destaque: ${real.featured.slug}), chips de ${real.stores
    .map(({ name }) => name)
    .join(', ')}, ?loja=, duração, origem, Mais vídeos, canal e medição passaram.`
);
