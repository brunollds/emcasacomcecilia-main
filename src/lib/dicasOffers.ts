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
  slug?: unknown;
  produto?: unknown;
  preco?: unknown;
  precoAntigo?: unknown;
  imagem?: unknown;
  loja?: unknown;
  url?: unknown;
};

const DICAS_OFFERS_URL = `${brandLinks.dicas}/ultimos-posts-dicas.json`;
const OFFER_LIMIT = 10;

function parsePrice(value: unknown): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value !== 'string' || !value) {
    return 0;
  }

  const cleaned = value.replace(/[^\d,.-]/g, '');
  // O feed manda "1.394,90": ponto de milhar e vírgula decimal. Sem vírgula, um ponto com um ou
  // dois dígitos no fim é decimal ("199.90").
  const normalized =
    cleaned.includes(',') || !/^-?\d+\.\d{1,2}$/.test(cleaned)
      ? cleaned.replace(/\./g, '').replace(',', '.')
      : cleaned;

  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

// Texto do feed: só string conta; o resto vira vazio.
function feedText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

// Link do feed: só endereço http(s) completo. Caminho relativo viraria link interno do site, e
// "https:exemplo.com" (sem as barras) passa no new URL, mas o navegador o lê como caminho do site.
function feedUrl(value: unknown): string {
  const text = feedText(value);
  if (!/^https?:\/\//i.test(text)) return '';
  try {
    const { protocol } = new URL(text);
    return protocol === 'https:' || protocol === 'http:' ? text : '';
  } catch {
    return '';
  }
}

function normalizeDicasPost(value: unknown, index: number): Offer | null {
  if (typeof value !== 'object' || value === null) return null;
  const post = value as DicasPost;
  const title = feedText(post.produto);
  const url = feedUrl(post.url);
  if (!title || !url) return null;
  const discountPrice = parsePrice(post.preco);

  return {
    id: feedText(post.slug) || `dicas-${index}`,
    title,
    store: feedText(post.loja) || 'Dicas da Cecília',
    url,
    originalPrice: parsePrice(post.precoAntigo) || discountPrice,
    discountPrice,
    image: typeof post.imagem === 'string' && isAllowedImageHost(post.imagem) ? post.imagem : undefined,
  };
}

// As ofertas do feed: até 10 válidas, cada slug uma vez só (é a key do card e o offer_id do clique).
// Resposta que não é lista não traz nenhuma.
export function parseDicasOffers(data: unknown): Offer[] {
  if (!Array.isArray(data)) return [];
  const offers = new Map<string, Offer>();
  for (const offer of data.map(normalizeDicasPost)) {
    if (offer && !offers.has(offer.id)) offers.set(offer.id, offer);
  }
  return [...offers.values()].slice(0, OFFER_LIMIT);
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

// Oferta com foto: só essas entram no carrossel, que mostra a foto e o preço e mais nada.
export type OfferWithImage = Offer & { image: string };

export function getCarouselOffers(offers: readonly Offer[]): OfferWithImage[] {
  return offers.filter((offer): offer is OfferWithImage => Boolean(offer.image));
}

// O desconto do selo, em pontos inteiros: só com o preço antigo maior que o atual e acima de 5%.
export function getOfferDiscountPercent({ originalPrice, discountPrice }: Pick<Offer, 'originalPrice' | 'discountPrice'>): number {
  if (discountPrice <= 0 || originalPrice <= discountPrice) return 0;
  const percent = Math.round((1 - discountPrice / originalPrice) * 100);
  return percent > 5 ? percent : 0;
}
