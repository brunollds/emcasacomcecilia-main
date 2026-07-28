import {
  getVideoMeta,
  getYoutubeEmbedUrl,
  getYoutubeThumbnailUrl,
  getYoutubeWatchUrl,
} from '@/lib/video-metadata';

function getAbsoluteUrl(url, baseUrl) {
  if (!url) return null;

  try {
    return new URL(url, baseUrl).toString();
  } catch {
    return null;
  }
}

function isIso8601Date(value) {
  return (
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?$/.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

/**
 * Produz um VideoObject somente quando todos os metadados editoriais mínimos
 * estão completos. Ausência de qualquer campo obrigatório resulta em null.
 */
export function buildYoutubeVideoObject({
  url,
  title,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  baseUrl = 'https://emcasacomcecilia.com',
}) {
  const metadata = getVideoMeta(url);
  const name = title || metadata?.title;
  const resolvedDescription = description || metadata?.description;
  const resolvedThumbnailUrl = getAbsoluteUrl(
    thumbnailUrl || getYoutubeThumbnailUrl(url),
    baseUrl
  );
  const resolvedUploadDate = uploadDate || metadata?.uploadDate;
  const resolvedDuration = duration || metadata?.duration;
  const embedUrl = getYoutubeEmbedUrl(url);
  const watchUrl = getYoutubeWatchUrl(url);

  if (
    !name ||
    !resolvedDescription ||
    !resolvedThumbnailUrl ||
    !isIso8601Date(resolvedUploadDate) ||
    !embedUrl ||
    !watchUrl
  ) {
    return null;
  }

  return {
    '@type': 'VideoObject',
    name,
    description: resolvedDescription,
    thumbnailUrl: resolvedThumbnailUrl,
    uploadDate: resolvedUploadDate,
    url: watchUrl,
    embedUrl,
    ...(resolvedDuration && { duration: resolvedDuration }),
  };
}

/**
 * Produz um VideoObject para um arquivo editorial hospedado no próprio site.
 * Assim como no YouTube, falha fechado quando faltar qualquer campo mínimo.
 */
export function buildLocalVideoObject({
  contentUrl,
  title,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  baseUrl = 'https://emcasacomcecilia.com',
}) {
  const resolvedContentUrl = getAbsoluteUrl(contentUrl, baseUrl);
  const resolvedThumbnailUrl = getAbsoluteUrl(thumbnailUrl, baseUrl);

  if (
    !title ||
    !description ||
    !resolvedContentUrl ||
    !resolvedThumbnailUrl ||
    !isIso8601Date(uploadDate)
  ) {
    return null;
  }

  return {
    '@type': 'VideoObject',
    name: title,
    description,
    thumbnailUrl: resolvedThumbnailUrl,
    uploadDate,
    contentUrl: resolvedContentUrl,
    ...(duration && { duration }),
  };
}
