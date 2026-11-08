// A mídia que os componentes cliente do artigo recebem pronta (src/lib/sectionMedia.ts): a foto e o vídeo com
// entrada no mapa vão ao CDN, os sem entrada seguem com o próprio caminho e nenhum outro campo muda. O
// test:client-bundle garante que o mapa fica fora do navegador; este garante que as URLs entregues estão certas.
import assert from 'node:assert/strict';
import mediaMap from '../src/lib/generated/media-delivery-map.json';
import type { ContentSection, Review } from '../src/lib/content/types';
import { withDeliveredArticleMedia, withDeliveredGalleryImage } from '../src/lib/sectionMedia';

const entries = Object.entries(mediaMap as Record<string, string>);
const entry = (test: (local: string) => boolean, what: string) => {
  const found = entries.find(([local]) => test(local));
  assert.ok(found, `o mapa de mídia não tem ${what}`);
  return found;
};
const [photo, photoCdn] = entry((local) => local.startsWith('/images/'), 'imagem');
const [otherPhoto, otherPhotoCdn] = entry((local) => local.startsWith('/images/') && local !== photo, 'uma segunda imagem');
const [video, videoCdn] = entry((local) => local.endsWith('.mp4'), 'vídeo mp4');

const NOT_MAPPED_PHOTO = '/images/fora-do-mapa.webp';
const NOT_MAPPED_MP4 = '/videos/fora-do-mapa.mp4';
const NOT_MAPPED_WEBM = '/videos/fora-do-mapa.webm';
const EXTERNAL = 'https://m.media-amazon.com/images/oferta.jpg';
for (const path of [NOT_MAPPED_PHOTO, NOT_MAPPED_MP4, NOT_MAPPED_WEBM]) assert.ok(!(path in mediaMap), `${path} entrou no mapa: troque o exemplo`);

type ArticleMedia = Pick<Review, 'contentSections' | 'video'> & { title?: string; slug?: string };

const stringImage: ContentSection = {
  heading: 'Foto em texto',
  paragraphs: ['Parágrafo'],
  bullets: ['Item'],
  image: photo,
  imageAlt: 'Texto alternativo',
  imageCaption: 'Legenda',
  imageFit: 'wide',
  imageAspectRatio: 1.5,
  links: [{ label: 'Link', url: '/images/nao-e-midia.webp' } as never],
};
const objectImage: ContentSection = {
  heading: 'Foto em objeto',
  image: { src: otherPhoto, alt: 'Alt', caption: 'Legenda', objectFit: 'contain', aspectRatio: 2, href: 'https://loja.example/produto' },
};
const imageList: ContentSection = {
  heading: 'Carrossel',
  images: [
    { src: photo, alt: 'No mapa', href: 'https://loja.example/a' },
    { src: NOT_MAPPED_PHOTO, alt: 'Fora do mapa', objectFit: 'square' },
    { src: EXTERNAL, alt: 'Externa' },
  ],
};
const notMappedImage: ContentSection = { heading: 'Foto fora do mapa', image: NOT_MAPPED_PHOTO };
const emptyImage: ContentSection = { heading: 'Foto vazia', image: '' };
const sectionVideo: ContentSection = {
  heading: 'Vídeo da seção',
  video: { mp4: video, webm: NOT_MAPPED_WEBM, poster: photo, alt: 'Demonstração', aspect: 'portrait' },
};
const notMappedVideo: ContentSection = { heading: 'Vídeo fora do mapa', video: { mp4: NOT_MAPPED_MP4 } };
const noMedia: ContentSection = { heading: 'Só texto', paragraphs: ['Sem mídia'], styling: { items: [] } as never };

const article: ArticleMedia = {
  title: 'Artigo',
  slug: 'artigo',
  video: { mp4: video, webm: NOT_MAPPED_WEBM, poster: otherPhoto, aspect: 'landscape' } as never,
  contentSections: [stringImage, objectImage, imageList, notMappedImage, emptyImage, sectionVideo, notMappedVideo, noMedia],
};
const before = structuredClone(article);
const delivered = withDeliveredArticleMedia(article);

assert.deepEqual(article, before, 'a entrada mudou: o artigo do índice não pode ser alterado');
assert.equal(delivered.title, 'Artigo');
assert.equal(delivered.slug, 'artigo');
assert.deepEqual(delivered.video, { mp4: videoCdn, webm: NOT_MAPPED_WEBM, poster: otherPhotoCdn, aspect: 'landscape' }, 'vídeo do topo');

const sections = delivered.contentSections!;
assert.equal(sections.length, article.contentSections!.length);
assert.deepEqual(sections[0], { ...stringImage, image: photoCdn }, 'foto em texto, com os outros campos');
assert.deepEqual(sections[1], { ...objectImage, image: { ...(objectImage.image as object), src: otherPhotoCdn } }, 'foto em objeto, com o href');
assert.deepEqual(
  sections[2].images,
  [
    { src: photoCdn, alt: 'No mapa', href: 'https://loja.example/a' },
    { src: NOT_MAPPED_PHOTO, alt: 'Fora do mapa', objectFit: 'square' },
    { src: EXTERNAL, alt: 'Externa' },
  ],
  'lista de fotos: no mapa, fora do mapa e externa'
);
assert.deepEqual(sections[3], notMappedImage, 'foto fora do mapa');
assert.deepEqual(sections[4], emptyImage, 'foto vazia');
assert.deepEqual(sections[5].video, { mp4: videoCdn, webm: NOT_MAPPED_WEBM, poster: photoCdn, alt: 'Demonstração', aspect: 'portrait' }, 'vídeo da seção');
assert.deepEqual(sections[6], notMappedVideo, 'vídeo fora do mapa: sem webm nem poster inventados');
assert.deepEqual(sections[7], noMedia, 'seção sem mídia');
assert.deepEqual(Object.keys(sections[7]), Object.keys(noMedia), 'seção sem mídia com campo novo');

// Sem mídia nenhuma, nenhum campo aparece; aplicar de novo não muda o endereço.
assert.deepEqual(withDeliveredArticleMedia({ title: 'Sem nada' } as ArticleMedia), { title: 'Sem nada' });
assert.deepEqual(withDeliveredArticleMedia(delivered), delivered, 'aplicar duas vezes mudou o endereço');

// A galeria: `image` e o `url` dos artigos antigos, nos dois formatos, sem criar o campo que não veio.
assert.deepEqual(withDeliveredGalleryImage({ image: photo, alt: 'Alt', objectFit: 'contain', aspectRatio: 2 }), { image: photoCdn, alt: 'Alt', objectFit: 'contain', aspectRatio: 2 });
assert.deepEqual(withDeliveredGalleryImage({ url: otherPhoto, alt: 'Antigo' }), { url: otherPhotoCdn, alt: 'Antigo' });
assert.deepEqual(withDeliveredGalleryImage({ image: photo, url: otherPhoto }), { image: photoCdn, url: otherPhotoCdn });
assert.deepEqual(withDeliveredGalleryImage({ image: NOT_MAPPED_PHOTO }), { image: NOT_MAPPED_PHOTO });
assert.deepEqual(withDeliveredGalleryImage({ alt: 'Sem foto' }), { alt: 'Sem foto' });

console.log('✅ mídia do artigo: fotos, listas, vídeos e galeria, no mapa e fora dele, com os outros campos preservados.');
