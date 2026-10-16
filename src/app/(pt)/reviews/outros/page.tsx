import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { ReviewsBrowser } from '@/components/reviews/ReviewsBrowser';
import { ReviewsStoreStrip } from '@/components/reviews/ReviewsStoreStrip';
import { ShelfStoreMark } from '@/components/reviews/ShelfStoreMark';
import { SHELF_CONTAINER } from '@/components/reviews/shelfClasses';
import { TrackedReviewsLink } from '@/components/reviews/TrackedReviewsLink';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { PageTrail } from '@/components/ui/PageTrail';
import { publishedReviews } from '@/lib/data';
import { LOCALES } from '@/lib/i18n/locales';
import { serializeJsonLd } from '@/lib/jsonLd';
import { SITE_NAME, getCollectionPageJsonLd } from '@/lib/pageSeo';
import { getOthersShelfContent, type OthersShelfContent } from '@/lib/reviewsHub';

// Os artigos da Cecília que não são de nenhuma loja ativa (sem loja, ou de loja pausada), na estante de
// /reviews. Só em português, e só com 3 artigos ou mais, como as subpáginas de loja. Rota estática: vence
// o /reviews/[slug], e o test:reviews-hub garante que nenhum artigo tem o slug "outros".

export function generateMetadata(): Metadata {
  const page = getOthersShelfContent(publishedReviews);
  if (!page) return {};

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
      images: [page.socialImage],
    },
    // O layout já define título e descrição genéricos no twitter, e o Next não os troca pelos do Open Graph.
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.description,
      images: [page.socialImage.url],
    },
  };
}

export default function OthersArticlesPage() {
  const page = getOthersShelfContent(publishedReviews);
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
        placementPrefix="others"
        showStore={false}
        heading="Lista de artigos"
        headingVisible={false}
        search={page.search}
        hero={<OthersHero page={page} />}
      />
      <ReviewsStoreStrip id="titulo-outras-lojas" title="Outras lojas" stores={page.otherStores} placement="others_other_stores" />
      <div className={`${SHELF_CONTAINER} flex justify-center`}>
        <TrackedReviewsLink
          href="/reviews"
          placement="others_all_reviews"
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

// O topo, como o da subpágina de loja, sem o botão do código: a trilha (a mesma lista do BreadcrumbList), a
// bolinha da casa com o anel, o h1 com o marca-texto e o total.
function OthersHero({ page }: { page: OthersShelfContent }) {
  return (
    <>
      <PageTrail trail={page.trail} />
      <div className="flex items-center gap-4 md:gap-6">
        <span className="relative m-1.5 flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-creme shadow-[0_0_0_4px_var(--color-amarelo-cupom),0_0_0_6px_var(--color-marinho)] md:size-24">
          <ShelfStoreMark store={page.store} imageClassName="h-[53%] w-[74%]" sizes="96px" />
        </span>
        <div>
          <h1 className="font-condensada text-[40px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-6xl">
            <span className="marca-texto marca-texto-entra">{page.title}</span>
          </h1>
          <p className="mt-2 text-base font-semibold text-marinho-suave">{page.countLabel}</p>
        </div>
      </div>
    </>
  );
}
