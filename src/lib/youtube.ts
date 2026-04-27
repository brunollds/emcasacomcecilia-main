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
    description?: string;
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

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
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
  return `https://i.ytimg.com/vi/${videoId}/oardefault.jpg`;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
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
    .map((item, index) => {
      const videoId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
      const title = item.snippet?.title?.trim();

      if (!videoId || !title || title === 'Private video' || title === 'Deleted video') {
        return null;
      }

      const description =
        truncate(
          item.snippet?.description?.replace(/\s+/g, ' ').trim() || 'Assista ao vídeo no canal da Cecília.',
          90
        );

      const accents = ['#ff6b35', '#ffd700', '#ffffff', '#ffcfb8', '#f8e7a4', '#dfe7ff'];

      return {
        id: videoId,
        platform: 'YouTube',
        title,
        description,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        accent: accents[index % accents.length],
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
