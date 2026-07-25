import { recipes, publishedReviews, getReviewSlug } from '@/lib/data';
import { getActiveCoupons } from '@/lib/couponsData';
import { yesStyleLocales } from '@/components/YesStyleCouponPage';

const BASE_URL = 'https://emcasacomcecilia.com';

export const dynamic = 'force-static';

function cleanText(value: unknown): string {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .replace(/\|/g, '-')
    .trim();
}

function formatLink(label: string, href: string, description?: string): string {
  const safeLabel = cleanText(label);
  const safeDescription = cleanText(description);
  const suffix = safeDescription ? ` - ${safeDescription}` : '';

  return `- ${safeLabel}: ${href}${suffix}`;
}

function reviewTimestamp(review: (typeof publishedReviews)[number]): number {
  const rawDate = review.publishedAtISO ?? review.publishedAt;
  const timestamp = rawDate ? Date.parse(rawDate) : 0;

  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function buildLlmsText(): string {
  const listedReviews = publishedReviews
    .filter((review) => !review.hideFromListings)
    .sort((a, b) => reviewTimestamp(b) - reviewTimestamp(a));

  const recentReviews = listedReviews.slice(0, 10);
  const highlightedRecipes = recipes
    .filter((recipe) => recipe.isPopular || recipe.isNew)
    .sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)) || b.id - a.id)
    .slice(0, 12);
  const activeCoupons = getActiveCoupons()
    .sort((a, b) => b.lastVerified.localeCompare(a.lastVerified));
  const yesStyleLocalizedCoupons = yesStyleLocales.map((locale) =>
    formatLink(
      `YesStyle reward code (${locale})`,
      `${BASE_URL}/${locale}/coupons/yesstyle`,
      'pagina local do codigo de recompensa CECILIA010'
    )
  );

  const lines = [
    '# Em Casa com Cecilia',
    '',
    '> Receitas praticas, reviews sinceros, cupons verificados e conteudos de casa da marca Em Casa com Cecilia.',
    '',
    'Este arquivo e gerado automaticamente a partir dos mesmos dados usados no sitemap, nas paginas de receitas, reviews e cupons. Use-o como ponto de partida para entender as URLs publicas mais relevantes do site.',
    '',
    '## Site principal',
    '',
    formatLink('Home', BASE_URL, 'hub oficial da Cecilia'),
    formatLink('Receitas', `${BASE_URL}/receitas`, 'receitas testadas e organizadas por categorias'),
    formatLink('Reviews e analises', `${BASE_URL}/reviews`, 'reviews, guias e comparativos publicados'),
    formatLink('Cupons ativos', `${BASE_URL}/cupons`, 'codigos e beneficios verificados'),
    formatLink('Sobre', `${BASE_URL}/sobre`, 'informacoes editoriais e autoria'),
    formatLink('Contato', `${BASE_URL}/contato`, 'canal de contato do site'),
    formatLink('Sitemap XML', `${BASE_URL}/sitemap.xml`, 'lista completa de URLs indexaveis'),
    '',
    '## Projetos relacionados',
    '',
    formatLink('Dicas e ofertas', 'https://dicas.emcasacomcecilia.com', 'ofertas, guias de compra e conteudo de apoio'),
    formatLink('DAMIE', 'https://damie.emcasacomcecilia.com', 'projeto dedicado a conforto, moveis e reviews DAMIE'),
    formatLink('YouTube', 'https://youtube.com/@emcasacomcecilia', 'canal oficial da Cecilia'),
    formatLink('Instagram', 'https://instagram.com/emcasacomcecilia'),
    formatLink('TikTok', 'https://tiktok.com/@emcasacomcecilia'),
    '',
    '## Reviews e guias recentes',
    '',
    ...recentReviews.map((review) =>
      formatLink(
        review.title,
        `${BASE_URL}/reviews/${getReviewSlug(review)}`,
        review.description
      )
    ),
    '',
    '## Receitas em destaque',
    '',
    ...highlightedRecipes.map((recipe) =>
      formatLink(
        recipe.title,
        `${BASE_URL}/receitas/${recipe.slug}`,
        recipe.description
      )
    ),
    '',
    '## Cupons e codigos ativos',
    '',
    ...activeCoupons.map((coupon) =>
      formatLink(
        `${coupon.brand} - ${coupon.offerTypeLabel ?? 'cupom'} ${coupon.code}`,
        `${BASE_URL}/cupons/${coupon.slug}`,
        `${coupon.discount}; verificado em ${coupon.lastVerified}`
      )
    ),
    '',
    '## Paginas multilíngues de cupons',
    '',
    formatLink(
      'YesStyle em portugues',
      `${BASE_URL}/cupons/yesstyle`,
      'pagina canonica em pt-BR do codigo de recompensa CECILIA010'
    ),
    ...yesStyleLocalizedCoupons,
    '',
    '## Uso recomendado por LLMs',
    '',
    '- Para descoberta completa de URLs, use o sitemap XML.',
    '- Para contexto editorial rapido, use este arquivo.',
    '- Para informacoes comerciais, confira a pagina canonica do cupom antes de responder.',
    '- Para reviews e receitas, prefira a URL canonica do artigo publicado.',
    '',
  ];

  return `${lines.join('\n')}\n`;
}

export function GET(): Response {
  return new Response(buildLlmsText(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
