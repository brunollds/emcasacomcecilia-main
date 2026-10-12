import type { Metadata } from 'next';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { ReviewsBrowser } from '@/components/reviews/ReviewsBrowser';
import { ReviewsNewRow } from '@/components/reviews/ReviewsNewRow';
import { ReviewsStoreStrip } from '@/components/reviews/ReviewsStoreStrip';
import { publishedReviews } from '@/lib/data';
import { LOCALES } from '@/lib/i18n/locales';
import { serializeJsonLd } from '@/lib/jsonLd';
import { SITE_NAME, getCollectionPageJsonLd } from '@/lib/pageSeo';
import { REVIEWS_TRAIL_ROOT, getReviewsHubContent } from '@/lib/reviewsHub';

// Guias & Análises em português: o topo com a busca, as Novidades e as bolinhas das lojas (a vitrine) e
// a estante com todos os artigos. Os dados saem prontos do servidor (reviewsHub.ts).

const TITLE = 'Guias & Análises - Em Casa com Cecília';
const DESCRIPTION =
  'Guias práticos, análises de produtos, reputação de marcas e instruções de compra para ajudar você a decidir com mais contexto.';
const SHARE_DESCRIPTION =
  'Guias práticos, análises de produtos, reputação de marcas e instruções de compra para decisões com mais contexto.';

const content = getReviewsHubContent(publishedReviews);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/reviews' },
  openGraph: {
    title: TITLE,
    description: SHARE_DESCRIPTION,
    url: '/reviews',
    siteName: SITE_NAME,
    locale: LOCALES.pt.openGraphLocale,
    type: 'website',
    images: [content.socialImage],
  },
  // O layout já define título e descrição genéricos no twitter, e o Next não os troca pelos do Open Graph.
  twitter: { card: 'summary_large_image', title: TITLE, description: SHARE_DESCRIPTION, images: [content.socialImage.url] },
};

export default function ReviewsPage() {
  const jsonLd = getCollectionPageJsonLd({
    name: 'Guias & Análises',
    description: DESCRIPTION,
    path: '/reviews',
    items: content.articles.map((article) => ({ name: article.title, path: article.href })),
    breadcrumb: [REVIEWS_TRAIL_ROOT],
  });

  return (
    <main className={`${couponFontVariables} min-h-screen bg-white text-marinho`}>
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      ))}
      <ReviewsBrowser
        articles={content.articles}
        categories={content.categories}
        listPath="/reviews"
        placementPrefix="reviews"
        showStore
        heading="Todos os artigos"
        headingVisible
        search={{ label: 'Buscar nos guias e análises', placeholder: 'Buscar guia, produto ou loja', scope: 'site' }}
        hero={
          <>
            <h1 className="font-condensada text-[44px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-7xl">
              <span className="marca-texto marca-texto-entra">Guias & Análises</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed font-medium text-marinho-suave md:text-lg">{content.intro}</p>
          </>
        }
        showcase={
          <>
            <ReviewsNewRow articles={content.newArticles} />
            <ReviewsStoreStrip id="titulo-por-loja" title="Por loja" stores={content.stores} placement="reviews_stores" />
          </>
        }
        footer={
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-marinho-suave">
            Cada conteúdo informa sua base: experiência própria, dados públicos ou fontes declaradas. Parcerias comerciais
            são identificadas explicitamente.
          </p>
        }
      />
    </main>
  );
}
