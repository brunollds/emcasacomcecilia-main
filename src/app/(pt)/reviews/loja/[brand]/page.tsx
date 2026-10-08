import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { ReviewHubCard } from '@/components/review/ReviewHubCard';
import { TrackedCouponPageLink } from '@/components/review/TrackedCouponPageLink';
import { FOCUS_RING, FOCUS_RING_ON_DARK } from '@/components/ui/focusRing';
import { publishedReviews } from '@/lib/data';
import { getStoreArticlePageSlugs, getStoreArticlesPage } from '@/lib/homeStores';
import { toHomeReviewCard } from '@/lib/reviewDiscovery';

// Tudo o que a Cecília escreveu sobre uma loja. A página da loja (/cupons/{slug}) responde qual é o
// código e como usar; esta lista os artigos. Só em português, e só para loja ativa com mais de 3 artigos.

export const dynamicParams = false;

type StoreArticlesPageProps = {
  params: Promise<{ brand: string }>;
};

export function generateStaticParams() {
  return getStoreArticlePageSlugs(publishedReviews).map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: StoreArticlesPageProps): Promise<Metadata> {
  const page = getStoreArticlesPage(publishedReviews, (await params).brand);
  if (!page) return {};
  const path = `/reviews/loja/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.description,
    alternates: { canonical: path },
    openGraph: { title: page.metaTitle, description: page.description, url: path, type: 'website' },
  };
}

export default async function StoreArticlesPage({ params }: StoreArticlesPageProps) {
  const page = getStoreArticlesPage(publishedReviews, (await params).brand);
  if (!page) notFound();

  return (
    <main className="min-h-screen bg-creme">
      <section className="border-b border-black/5 bg-marinho px-6 py-14 text-white md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">{page.title}</h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">{page.countLabel}</p>
          <TrackedCouponPageLink
            href={page.storePageUrl}
            linkLabel={page.codeLinkLabel}
            placement="reviews_store_page"
            className={`mt-2 inline-flex min-h-11 items-center gap-2 rounded-full bg-laranja px-6 text-sm font-extrabold text-marinho ${FOCUS_RING_ON_DARK}`}
          >
            {page.codeLinkLabel}
            <ArrowRight aria-hidden="true" className="size-4" />
          </TrackedCouponPageLink>
        </div>
      </section>

      <section className="px-6 py-8 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
            {page.articles.map(toHomeReviewCard).map((review, index) => (
              <ReviewHubCard key={review.id} review={review} index={index} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/reviews"
              className={`inline-flex items-center gap-2 rounded-full border-2 border-verde-escuro px-8 py-4 font-semibold text-verde-escuro hover:bg-verde-escuro hover:text-white motion-safe:transition-colors ${FOCUS_RING}`}
            >
              Ver todos os guias e análises
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
