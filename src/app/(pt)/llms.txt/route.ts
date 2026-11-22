import { recipes, publishedReviews } from '@/lib/data';
import { getReviewCanonicalPathname } from '@/lib/content/review-i18n';
import { getActiveCoupons, getCouponBySlug, type Coupon } from '@/lib/couponsData';
import { getCouponLanguageLinks, getLocalizedCoupon, getTranslatedCouponRoutes, isTranslatedLocale } from '@/lib/couponTranslations';
import { getStoreArticlePageSlugs, getStoreArticlesPage, getStoreArticlesPath } from '@/lib/homeStores';
import { YESSTYLE_LOCALES } from '@/lib/i18n/clusters/yesstyle';
import { LOCALES } from '@/lib/i18n/locales';
import { LOCALE_HOME_LOCALES, getLocaleHomePath } from '@/lib/localeHome';
import { REVIEW_HUB_LOCALES, getPublishedReviewsForLocale, getReviewHubPath } from '@/lib/review-hubs';
import { getListedPortugueseReviews, sortReviewsByPublishedAt } from '@/lib/reviewDiscovery';
import { videoPages } from '@/lib/video-pages';

const BASE_URL = 'https://emcasacomcecilia.com';

export const dynamic = 'force-static';

function cleanText(value: unknown): string {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .replace(/\|/g, '-')
    .replace(/\[/g, '(')
    .replace(/\]/g, ')')
    .trim();
}

// Link em markdown, `- [nome](url): descrição`, o formato da especificação do llms.txt.
function formatLink(label: string, href: string, description?: string): string {
  const safeLabel = cleanText(label);
  const safeDescription = cleanText(description);
  const suffix = safeDescription ? `: ${safeDescription}` : '';

  return `- [${safeLabel}](${href})${suffix}`;
}

function formatCouponLabel(coupon: Coupon): string {
  if (coupon.offerMode === 'discount-code') {
    if (coupon.tiers?.length) {
      return `${coupon.brand} - ${coupon.tiers.length} faixas de cupom (${coupon.tiers[0].code} a ${coupon.code})`;
    }
    return `${coupon.brand} - ${coupon.offerTypeLabel ?? 'cupom'} ${coupon.code}`;
  }
  if (coupon.referral?.code) {
    return `${coupon.brand} - codigo de indicacao ${coupon.referral.code} e oferta por link`;
  }
  return `${coupon.brand} - ${coupon.offerTypeLabel ?? 'oferta por link'}`;
}

function formatCouponDescription(coupon: Coupon): string {
  if (coupon.offerMode === 'discount-code') {
    if (coupon.tiers?.length) {
      const first = coupon.tiers[0];
      const last = coupon.tiers[coupon.tiers.length - 1];
      return `${coupon.discount} (${first.discount} a partir de ${first.minPurchase} ate ${last.discount} a partir de ${last.minPurchase}); ${coupon.shortDescription}; verificado em ${coupon.lastVerified}`;
    }
    return `${coupon.discount} (${coupon.shortDescription}); codigo ${coupon.code}; verificado em ${coupon.lastVerified}`;
  }
  if (coupon.referral?.code) {
    return `${coupon.discount} (${coupon.shortDescription}); pesquise ${coupon.referral.code} no app/site ou acesse pelo link indicado; verificado em ${coupon.lastVerified}`;
  }
  return `${coupon.discount} (${coupon.shortDescription}); ativado direto pelo link, sem codigo; verificado em ${coupon.lastVerified}`;
}

function buildLlmsText(): string {
  // A mesma ordem da vitrine: só PT, data mais nova e, no mesmo dia, o id maior primeiro.
  const recentReviews = sortReviewsByPublishedAt(getListedPortugueseReviews(publishedReviews)).slice(0, 20);
  const highlightedRecipes = recipes
    .filter((recipe) => recipe.isPopular || recipe.isNew)
    .sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)) || b.id - a.id)
    .slice(0, 12);
  const activeCoupons = getActiveCoupons()
    .sort((a, b) => b.lastVerified.localeCompare(a.lastVerified));
  const storeHubLinks = getStoreArticlePageSlugs(publishedReviews, activeCoupons).flatMap((slug) => {
    const page = getStoreArticlesPage(publishedReviews, slug, activeCoupons);
    const store = getCouponBySlug(slug);
    if (!page || !store) return [];
    const offerSummary = store.offerMode === 'discount-code'
      ? `${store.offerTypeLabel ?? 'cupom'} ${store.code} (${store.discount})`
      : store.referral?.code
        ? `codigo de indicacao ${store.referral.code} (${store.discount})`
        : `${store.offerTypeLabel ?? 'oferta'} (${store.discount})`;
    return [
      formatLink(
        `${page.brand} (${page.articles.length} artigos)`,
        `${BASE_URL}${getStoreArticlesPath(slug)}`,
        `guias, analises e ${offerSummary}`
      ),
    ];
  });
  // A página em PT já entra como "YesStyle em portugues"; /pt/coupons/yesstyle não existe.
  const yesStyleLocalizedCoupons = Object.values(YESSTYLE_LOCALES)
    .filter((config) => config.locale !== 'pt')
    .map((config) =>
      formatLink(
        `YesStyle reward code (${config.locale})`,
        `${BASE_URL}${config.hubPath}`,
        'Reward Code CECILIA010 (up to 5% extra off, stacks with YesStyle coupons)'
      )
    );
  // Lojas com página em outros idiomas: a de PT e as traduzidas, com o benefício e o código de cada idioma.
  const translatedCouponLinks = [...new Set(getTranslatedCouponRoutes().map((route) => route.slug))].flatMap((slug) => {
    const store = getCouponBySlug(slug);
    const brand = store?.brand ?? slug;
    return Object.entries(getCouponLanguageLinks(slug)).map(([locale, path]) => {
      if (locale === 'pt') {
        return formatLink(
          `${brand} (${locale})`,
          `${BASE_URL}${path}`,
          store ? formatCouponDescription(store) : 'pagina em pt-BR da loja'
        );
      }
      const localized = isTranslatedLocale(locale) ? getLocalizedCoupon(slug, locale) : undefined;
      const codeBadge = localized?.offerMode === 'discount-code'
        ? ` (${localized.code})`
        : store?.offerMode === 'affiliate-link' && store.referral?.code
          ? ` (${store.referral.code})`
          : '';
      return formatLink(
        `${brand}${codeBadge} (${locale})`,
        `${BASE_URL}${path}`,
        localized ? `${localized.discount} - ${localized.shortDescription}` : 'pagina local da loja'
      );
    });
  });

  // Os 10 mais novos de cada idioma, na ordem da lista do idioma (/<locale>/reviews).
  const localeReviewSections = REVIEW_HUB_LOCALES.flatMap((locale) => {
    const localeReviews = getPublishedReviewsForLocale(locale, publishedReviews).slice(0, 10);
    if (localeReviews.length === 0) return [];
    return [
      `## Artigos recentes em ${LOCALES[locale].label} (${locale})`,
      '',
      formatLink(`Lista completa (${locale})`, `${BASE_URL}${getReviewHubPath(locale)}`),
      ...localeReviews.map((review) =>
        formatLink(review.title, `${BASE_URL}${getReviewCanonicalPathname(review)}`, review.metaDescription || review.description)
      ),
      '',
    ];
  });

  const localeHomeLinks = LOCALE_HOME_LOCALES.map((locale) =>
    formatLink(
      `Home (${locale})`,
      `${BASE_URL}${getLocaleHomePath(locale)}`,
      'quem e a Cecilia, lojas parceiras e guias no idioma'
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
    formatLink('Videos', `${BASE_URL}/videos`, 'receitas, testes e demonstracoes em video'),
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
        `${BASE_URL}${getReviewCanonicalPathname(review)}`,
        review.metaDescription || review.description
      )
    ),
    '',
    ...(storeHubLinks.length > 0
      ? [
          '## Guias e analises por loja parceira',
          '',
          ...storeHubLinks,
          '',
        ]
      : []),
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
    '## Videos',
    '',
    ...videoPages.map((video) =>
      formatLink(video.title, video.canonicalUrl, video.description)
    ),
    '',
    '## Cupons e codigos ativos',
    '',
    ...activeCoupons.map((coupon) =>
      formatLink(
        formatCouponLabel(coupon),
        `${BASE_URL}/cupons/${coupon.slug}`,
        formatCouponDescription(coupon)
      )
    ),
    '',
    '## Home em outros idiomas',
    '',
    ...localeHomeLinks,
    '',
    ...localeReviewSections,
    '## Paginas multilíngues de cupons',
    '',
    formatLink(
      'YesStyle em portugues',
      `${BASE_URL}/cupons/yesstyle`,
      'pagina canonica em pt-BR do codigo de recompensa CECILIA010'
    ),
    ...yesStyleLocalizedCoupons,
    ...translatedCouponLinks,
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
