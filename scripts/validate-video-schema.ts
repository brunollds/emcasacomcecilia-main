import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { recipes, reviews } from '@/lib/data';
import { buildRecipeTemplateProps } from '@/lib/recipe-template-props';
import { buildReviewTemplateProps } from '@/lib/review-template-props';
import {
  getVideoMeta,
  getYoutubeEmbedUrl,
  getYoutubeVideoId,
  localVideoMetadata,
} from '@/lib/video-metadata';

type ContentKind = 'receita' | 'review';

type VideoSchema = {
  '@type'?: string;
  name?: string;
  description?: string;
  thumbnailUrl?: string;
  uploadDate?: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
};

type EmbeddedLocalVideo = {
  mp4?: string;
  webm?: string;
  poster?: string;
};

type LocalVideoMetadata = {
  classification: 'primary' | 'secondary' | 'decorative';
  reviewSlug: string;
  reason?: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  uploadDate?: string;
  duration?: string;
};

// URLs que apontam para o canal, não para um vídeo — pendência editorial já
// registrada. Remover o slug daqui quando a receita ganhar vídeo próprio ou
// perder o campo youtubeUrl.
const KNOWN_INVALID_YOUTUBE_URLS = new Set(['bolo-de-cenoura-com-cobertura-de-chocolate']);

const errors: string[] = [];
let validatedPages = 0;

function isIso8601Date(value: string | undefined): boolean {
  return Boolean(
    value &&
    /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?$/.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

function report(kind: ContentKind, slug: string, message: string): void {
  errors.push(`${kind} "${slug}": ${message}`);
}

function validateYoutubeVideoObject(
  kind: ContentKind,
  slug: string,
  sourceUrl: string,
  video: VideoSchema | undefined
): void {
  const videoId = getYoutubeVideoId(sourceUrl);
  const expectedEmbedUrl = getYoutubeEmbedUrl(sourceUrl);
  const metadata = getVideoMeta(sourceUrl);

  if (!videoId || !expectedEmbedUrl) {
    report(kind, slug, 'URL editorial do YouTube não contém ID válido');
    return;
  }

  if (!metadata) {
    report(kind, slug, `vídeo ${videoId} não possui entrada no registro de metadados`);
  }

  if (!video || video['@type'] !== 'VideoObject') {
    report(kind, slug, 'player incorporado não gerou VideoObject');
    return;
  }

  if (!video.name) report(kind, slug, 'VideoObject sem name');
  if (!video.description) report(kind, slug, 'VideoObject sem description');
  if (!video.thumbnailUrl || !/^https?:\/\//.test(video.thumbnailUrl)) {
    report(kind, slug, 'VideoObject sem thumbnailUrl absoluta');
  }
  if (!isIso8601Date(video.uploadDate)) {
    report(kind, slug, 'VideoObject sem uploadDate ISO 8601 válida');
  }
  if (video.embedUrl !== expectedEmbedUrl || !video.embedUrl.includes('/embed/')) {
    report(kind, slug, 'embedUrl não corresponde ao player /embed/ do vídeo');
  }
  if (video.duration && !/^PT(?=\d|.*\d)[\dHMS]+$/.test(video.duration)) {
    report(kind, slug, 'duration não está em ISO 8601');
  }

  validatedPages += 1;
}

function validatePublicAsset(kind: ContentKind, slug: string, assetUrl: string | undefined): void {
  if (!assetUrl || !assetUrl.startsWith('/')) {
    report(kind, slug, `asset local inválido: ${assetUrl || '(ausente)'}`);
    return;
  }

  const filePath = join(process.cwd(), 'public', assetUrl.replace(/^\/+/, ''));
  if (!existsSync(filePath)) {
    report(kind, slug, `asset local não encontrado: ${assetUrl}`);
  }
}

function getEmbeddedLocalVideos(review: {
  video?: EmbeddedLocalVideo;
  contentSections?: Array<{ video?: EmbeddedLocalVideo }>;
}): EmbeddedLocalVideo[] {
  return [
    review.video,
    ...(review.contentSections || []).map((section) => section.video),
  ].filter((video): video is EmbeddedLocalVideo => Boolean(video?.mp4));
}

function validateLocalVideoObject(
  slug: string,
  sourceUrl: string,
  metadata: LocalVideoMetadata,
  video: VideoSchema | undefined
): void {
  const expectedContentUrl = new URL(sourceUrl, 'https://emcasacomcecilia.com').toString();

  if (!video || video['@type'] !== 'VideoObject') {
    report('review', slug, 'MP4 editorial principal não gerou VideoObject');
    return;
  }

  if (!video.name) report('review', slug, 'VideoObject local sem name');
  if (!video.description) report('review', slug, 'VideoObject local sem description');
  if (!video.thumbnailUrl || !/^https?:\/\//.test(video.thumbnailUrl)) {
    report('review', slug, 'VideoObject local sem thumbnailUrl absoluta');
  }
  if (!isIso8601Date(video.uploadDate)) {
    report('review', slug, 'VideoObject local sem uploadDate ISO 8601 válida');
  }
  if (video.contentUrl !== expectedContentUrl) {
    report('review', slug, 'contentUrl não corresponde ao arquivo MP4 principal');
  }
  if (video.embedUrl) {
    report('review', slug, 'VideoObject local não deve declarar embedUrl');
  }
  if (video.duration && !/^PT(?=\d|.*\d)[\dHMS]+$/.test(video.duration)) {
    report('review', slug, 'duration local não está em ISO 8601');
  }
  if (
    !metadata.title ||
    !metadata.description ||
    !metadata.thumbnailUrl ||
    !isIso8601Date(metadata.uploadDate)
  ) {
    report('review', slug, 'registro do MP4 principal está incompleto');
  }

  validatedPages += 1;
}

for (const recipe of recipes) {
  if (!recipe.youtubeUrl) continue;

  if (!getYoutubeEmbedUrl(recipe.youtubeUrl)) {
    if (!KNOWN_INVALID_YOUTUBE_URLS.has(recipe.slug)) {
      report('receita', recipe.slug, `youtubeUrl não contém ID de vídeo válido: ${recipe.youtubeUrl}`);
    }
    continue;
  }

  const { jsonLd } = buildRecipeTemplateProps(recipe);
  validateYoutubeVideoObject(
    'receita',
    recipe.slug,
    recipe.youtubeUrl,
    jsonLd.video as VideoSchema | undefined
  );
}

for (const review of reviews) {
  if (review.youtubeUrl) {
    if (!getYoutubeEmbedUrl(review.youtubeUrl)) {
      report('review', review.slug, `youtubeUrl não contém ID de vídeo válido: ${review.youtubeUrl}`);
    } else {
      const { jsonLd } = buildReviewTemplateProps(review);
      validateYoutubeVideoObject(
        'review',
        review.slug,
        review.youtubeUrl,
        jsonLd.video as VideoSchema | undefined
      );
    }
  }

  const embeddedVideos = getEmbeddedLocalVideos(review);
  let primaryLocalVideos = 0;

  for (const embeddedVideo of embeddedVideos) {
    const sourceUrl = embeddedVideo.mp4 as string;
    const metadata = (
      localVideoMetadata as Record<string, LocalVideoMetadata>
    )[sourceUrl];

    validatePublicAsset('review', review.slug, sourceUrl);
    if (embeddedVideo.poster) validatePublicAsset('review', review.slug, embeddedVideo.poster);
    if (embeddedVideo.webm) validatePublicAsset('review', review.slug, embeddedVideo.webm);

    if (!metadata) {
      report('review', review.slug, `MP4 sem classificação editorial: ${sourceUrl}`);
      continue;
    }
    if (metadata.reviewSlug !== review.slug) {
      report('review', review.slug, `MP4 classificado para outro review: ${sourceUrl}`);
    }
    if (metadata.classification !== 'primary') continue;

    primaryLocalVideos += 1;
    if (review.youtubeUrl && getYoutubeEmbedUrl(review.youtubeUrl)) {
      report('review', review.slug, 'MP4 principal compete com vídeo principal do YouTube');
      continue;
    }

    const { jsonLd } = buildReviewTemplateProps(review);
    validateLocalVideoObject(
      review.slug,
      sourceUrl,
      metadata,
      jsonLd.video as VideoSchema | undefined
    );
  }

  if (primaryLocalVideos > 1) {
    report('review', review.slug, 'mais de um MP4 foi classificado como principal');
  }
}

const embeddedMp4Urls = new Set(
  reviews.flatMap((review) => getEmbeddedLocalVideos(review).map((video) => video.mp4))
);
for (const sourceUrl of Object.keys(localVideoMetadata)) {
  if (!embeddedMp4Urls.has(sourceUrl)) {
    errors.push(`registro local órfão: ${sourceUrl}`);
  }
}

if (errors.length > 0) {
  console.error('Falha na validação de vídeos:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Vídeos válidos: ${validatedPages} página(s) com VideoObject completo.`);
