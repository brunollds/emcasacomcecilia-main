import { brandLinks, offers, type Offer } from '@/lib/data';

type DicasPost = {
  slug?: string;
  produto?: string;
  preco?: string | number;
  precoAntigo?: string | number;
  imagem?: string;
  loja?: string;
  categoria?: string;
  timestamp?: string;
  url?: string;
};

const DICAS_OFFERS_URL = `${brandLinks.dicas}/ultimos-posts-dicas.json`;

function parsePrice(value: string | number | undefined): number {
  if (typeof value === 'number') {
    return value;
  }

  if (!value) {
    return 0;
  }

  const normalized = value
    .replace(/[^\d,.-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');

  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeDicasPost(post: DicasPost, index: number): Offer | null {
  const title = post.produto?.trim();
  const discountPrice = parsePrice(post.preco);
  const originalPrice = parsePrice(post.precoAntigo) || discountPrice;

  if (!title || !post.url) {
    return null;
  }

  const discount =
    originalPrice > discountPrice && discountPrice > 0
      ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
      : 0;

  return {
    id: post.slug || `dicas-${index}`,
    title,
    description: post.categoria || 'Oferta selecionada pela Cecília',
    originalPrice,
    discountPrice,
    discount,
    store: post.loja || 'Dicas da Cecília',
    url: post.url,
    image: post.imagem,
  };
}

export async function getFeaturedOffers(): Promise<Offer[]> {
  try {
    const response = await fetch(DICAS_OFFERS_URL, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) {
      return offers;
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return offers;
    }

    const remoteOffers = data
      .slice(0, 10)
      .map(normalizeDicasPost)
      .filter((offer): offer is Offer => Boolean(offer));

    return remoteOffers.length > 0 ? remoteOffers : offers;
  } catch {
    return offers;
  }
}
