import { brandLinks } from '@/lib/brandLinks';
import { isAllowedImageHost } from '@/lib/imageHosts.mjs';

// Uma oferta do feed do Dicas & Ofertas, como o card da home mostra. Preço 0 quando o feed não traz.
export type Offer = {
  id: string;
  title: string;
  store: string;
  url: string;
  originalPrice: number;
  discountPrice: number;
  image?: string;
};

type DicasPost = {
  slug?: string;
  produto?: string;
  preco?: string | number;
  precoAntigo?: string | number;
  imagem?: string;
  loja?: string;
  url?: string;
};

const DICAS_OFFERS_URL = `${brandLinks.dicas}/ultimos-posts-dicas.json`;
const OFFER_LIMIT = 10;

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

function normalizeDicasPost(value: unknown, index: number): Offer | null {
  if (typeof value !== 'object' || value === null) return null;
  const post = value as DicasPost;
  const title = typeof post.produto === 'string' ? post.produto.trim() : '';
  if (!title || typeof post.url !== 'string' || !post.url) return null;
  const discountPrice = parsePrice(post.preco);

  return {
    id: post.slug || `dicas-${index}`,
    title,
    store: post.loja || 'Dicas da Cecília',
    url: post.url,
    originalPrice: parsePrice(post.precoAntigo) || discountPrice,
    discountPrice,
    image: isAllowedImageHost(post.imagem) ? post.imagem : undefined,
  };
}

// As ofertas do feed: até 10 válidas. Resposta que não é lista não traz nenhuma.
export function parseDicasOffers(data: unknown): Offer[] {
  if (!Array.isArray(data)) return [];
  return data
    .map(normalizeDicasPost)
    .filter((offer): offer is Offer => offer !== null)
    .slice(0, OFFER_LIMIT);
}

// Sem o feed (fora do ar, lento, resposta errada ou vazio), a home não mostra a seção: não há
// oferta reserva.
export async function getFeaturedOffers(): Promise<Offer[]> {
  try {
    const response = await fetch(DICAS_OFFERS_URL, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });
    return response.ok ? parseDicasOffers(await response.json()) : [];
  } catch {
    return [];
  }
}
