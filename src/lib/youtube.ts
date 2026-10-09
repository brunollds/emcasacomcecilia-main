import { youtubeShorts, type SocialHighlight } from '@/lib/data';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const REVALIDATE_SECONDS = 60 * 60;

type YouTubeThumbnailMap = {
  default?: { url?: string };
  medium?: { url?: string };
  high?: { url?: string };
  standard?: { url?: string };
  maxres?: { url?: string };
};

type YouTubePlaylistItem = {
  snippet?: {
    title?: string;
    publishedAt?: string;
    thumbnails?: YouTubeThumbnailMap;
    resourceId?: {
      videoId?: string;
    };
  };
  contentDetails?: {
    videoId?: string;
  };
};

function getYoutubeConfig() {
  return {
    apiKey: process.env.YOUTUBE_API_KEY,
    channelId: process.env.YOUTUBE_CHANNEL_ID,
  };
}

function pickThumbnail(thumbnails?: YouTubeThumbnailMap) {
  return (
    thumbnails?.maxres?.url ||
    thumbnails?.standard?.url ||
    thumbnails?.high?.url ||
    thumbnails?.medium?.url ||
    thumbnails?.default?.url ||
    undefined
  );
}

function getShortsThumbnail(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

async function fetchJson<T>(url: string): Promise<T> {
  // Como o feed de ofertas: a API lenta não prende o build nem a renovação da home.
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(3000),
  });

  if (!response.ok) {
    throw new Error(`YouTube API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function getUploadsPlaylistId(apiKey: string, channelId: string) {
  const params = new URLSearchParams({
    part: 'contentDetails',
    id: channelId,
    key: apiKey,
  });

  const data = await fetchJson<{
    items?: Array<{
      contentDetails?: {
        relatedPlaylists?: {
          uploads?: string;
        };
      };
    }>;
  }>(`${YOUTUBE_API_BASE}/channels?${params.toString()}`);

  return data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
}

async function getLatestUploads(apiKey: string, playlistId: string) {
  const params = new URLSearchParams({
    part: 'snippet,contentDetails',
    maxResults: '6',
    playlistId,
    key: apiKey,
  });

  const data = await fetchJson<{ items?: YouTubePlaylistItem[] }>(
    `${YOUTUBE_API_BASE}/playlistItems?${params.toString()}`
  );

  return data.items ?? [];
}

function mapPlaylistItems(items: YouTubePlaylistItem[]): SocialHighlight[] {
  return items
    .map((item) => {
      const videoId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
      const title = item.snippet?.title?.trim();

      if (!videoId || !title || title === 'Private video' || title === 'Deleted video') {
        return null;
      }

      return {
        id: videoId,
        title,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnailUrl: getShortsThumbnail(videoId),
        fallbackThumbnailUrl: pickThumbnail(item.snippet?.thumbnails),
      } satisfies SocialHighlight;
    })
    .filter(Boolean) as SocialHighlight[];
}

export async function getYoutubeHighlights(): Promise<SocialHighlight[]> {
  const { apiKey, channelId } = getYoutubeConfig();

  if (!apiKey || !channelId) {
    return youtubeShorts;
  }

  try {
    const uploadsPlaylistId = await getUploadsPlaylistId(apiKey, channelId);

    if (!uploadsPlaylistId) {
      return youtubeShorts;
    }

    const items = await getLatestUploads(apiKey, uploadsPlaylistId);
    const highlights = mapPlaylistItems(items);

    return highlights.length > 0 ? highlights : youtubeShorts;
  } catch (error) {
    console.error('Failed to load YouTube highlights:', error);
    return youtubeShorts;
  }
}
