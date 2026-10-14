import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { TrackedCouponPageLink } from '@/components/review/TrackedCouponPageLink';
import { ReviewsBrowser } from '@/components/reviews/ReviewsBrowser';
import { ReviewsStoreStrip } from '@/components/reviews/ReviewsStoreStrip';
import { SHELF_CONTAINER } from '@/components/reviews/shelfClasses';
import { TrackedReviewsLink } from '@/components/reviews/TrackedReviewsLink';
import { ACTION_BUTTON } from '@/components/ui/actionButton';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { PageTrail } from '@/components/ui/PageTrail';
import { StoreMark } from '@/components/ui/StoreMark';
import { getCouponBySlug } from '@/lib/couponsData';
import { publishedReviews } from '@/lib/data';
import { getStoreArticlePageSlugs } from '@/lib/homeStores';
import { LOCALES } from '@/lib/i18n/locales';
import { serializeJsonLd } from '@/lib/jsonLd';
import { SITE_NAME, SITE_SOCIAL_IMAGE, getCollectionPageJsonLd, getStoreSocialImage } from '@/lib/pageSeo';
import { getStoreShelfContent, type StoreShelfContent } from '@/lib/reviewsHub';

// Tudo o que a Cecília escreveu sobre uma loja. A página da loja (/cupons/{slug}) responde qual é o
// código e como usar; esta lista os artigos, na estante de /reviews. Só em português, e só para loja
// ativa com 3 artigos ou mais.

export const dynamicParams = false;

type StoreArticlesPageProps = {
  params: Promise<{ brand: string }>;
};

export function generateStaticParams() {
  return getStoreArticlePageSlugs(publishedReviews).map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: StoreArticlesPageProps): Promise<Metadata> {
  const page = getStoreShelfContent(publishedReviews, (await params).brand);
  if (!page) return {};
  // A mesma imagem da página de cupom da loja.
  const store = getCouponBySlug(page.slug);
  const image = store ? getStoreSocialImage(store) : SITE_SOCIAL_IMAGE;

  return {
    title: page.metaTitle,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url: page.path,
      siteName: SITE_NAME,
      locale: LOCALES.pt.openGraphLocale,
      type: 'website',
      images: [image],
    },
    // O layout já define título e descrição genéricos no twitter, e o Next não os troca pelos do Open Graph.
    twitter: { card: 'summary_large_image', title: page.metaTitle, description: page.description, images: [image.url] },
  };
}

export default async function StoreArticlesPage({ params }: StoreArticlesPageProps) {
  const page = getStoreShelfContent(publishedReviews, (await params).brand);
  if (!page) notFound();

  const jsonLd = getCollectionPageJsonLd({
    name: page.title,
    description: page.description,
    path: page.path,
    items: page.articles.map((article) => ({ name: article.title, path: article.href })),
    breadcrumb: page.trail.slice(0, -1),
  });

  return (
    <main className={`${couponFontVariables} min-h-screen bg-white pb-16 text-marinho`}>
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      ))}
      <ReviewsBrowser
        articles={page.articles}
        categories={page.categories}
        listPath={page.path}
        placementPrefix="store"
        showStore={false}
        heading="Lista de artigos"
        headingVisible={false}
        search={page.search}
        hero={<StoreHero page={page} />}
      />
      <ReviewsStoreStrip id="titulo-outras-lojas" title="Outras lojas" stores={page.otherStores} placement="store_other_stores" />
      <div className={`${SHELF_CONTAINER} flex justify-center`}>
        <TrackedReviewsLink
          href="/reviews"
          placement="store_all_reviews"
          linkLabel="Ver todos os guias e análises"
          className={`inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-marinho px-8 font-extrabold text-marinho hover:bg-marinho hover:text-white motion-safe:transition-colors ${FOCUS_RING}`}
        >
          Ver todos os guias e análises
          <ArrowRight aria-hidden="true" className="size-4" />
        </TrackedReviewsLink>
      </div>
    </main>
  );
}

// O topo da subpágina: a trilha (a mesma lista do BreadcrumbList), a bolinha da loja com o anel, o h1
// com o marca-texto, o total e o botão do código.
function StoreHero({ page }: { page: StoreShelfContent }) {
  return (
    <>
      <PageTrail trail={page.trail} />
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <span className="relative m-1.5 flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-creme shadow-[0_0_0_4px_var(--color-amarelo-cupom),0_0_0_6px_var(--color-marinho)] md:size-24">
            <StoreMark tab={page.store} imageClassName="h-[53%] w-[74%]" sizes="96px" />
          </span>
          <div>
            <h1 className="font-condensada text-[40px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-6xl">
              <span className="marca-texto marca-texto-entra">{page.title}</span>
            </h1>
            <p className="mt-2 text-base font-semibold text-marinho-suave">{page.countLabel}</p>
          </div>
        </div>
        <TrackedCouponPageLink
          href={page.storePageUrl}
          linkLabel={page.codeLinkLabel}
          placement="reviews_store_page"
          className={`justify-center self-start px-5 md:self-auto ${ACTION_BUTTON}`}
        >
          {page.codeLinkLabel}
          <ArrowRight aria-hidden="true" className="size-4" />
        </TrackedCouponPageLink>
      </div>
    </>
  );
}
