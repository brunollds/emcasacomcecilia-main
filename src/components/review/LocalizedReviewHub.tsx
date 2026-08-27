import Image from 'next/image';
import Link from 'next/link';
import type { Review } from '@/lib/content/types';
import { getReviewCanonicalPathname } from '@/lib/content/review-i18n';
import { type ReviewHubLocale, getReviewHubCopy } from '@/lib/review-hubs';
import { LOCALES } from '@/lib/i18n/locales';

type LocalizedReviewHubProps = {
  locale: ReviewHubLocale;
  reviews: Review[];
};

function formatPublishedAt(review: Review, locale: ReviewHubLocale): string {
  if (!review.publishedAtISO) return review.publishedAt;

  return new Intl.DateTimeFormat(LOCALES[locale].htmlLang, {
    dateStyle: 'medium',
  }).format(new Date(review.publishedAtISO));
}

export function LocalizedReviewHub({ locale, reviews }: LocalizedReviewHubProps) {
  const copy = getReviewHubCopy(locale);

  return (
    <main className="min-h-screen bg-[#f7f3ed] pb-16 pt-10 md:pb-24 md:pt-14">
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-3xl">
          <p className="font-editorial text-sm font-bold uppercase tracking-[0.18em] text-[#b7791f]">
            Em Casa com Cecília
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold leading-tight text-[#0f1d3a] md:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#46536b] md:text-lg">
            {copy.description}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {reviews.map((review) => (
            <Link
              key={review.id}
              href={getReviewCanonicalPathname(review)}
              className="group overflow-hidden rounded-[1.5rem] border border-[#0f1d3a]/10 bg-white shadow-[0_18px_45px_-30px_rgba(15,29,58,0.52)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#0f1d3a]">
                {review.image ? (
                  <Image
                    src={review.image}
                    alt={review.imageAlt || review.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={`transition-transform duration-500 group-hover:scale-105 ${
                      review.imageFit === 'contain'
                        ? 'object-contain bg-white p-4'
                        : 'object-cover'
                    }`}
                    style={
                      review.imageFit !== 'contain' && review.imagePosition
                        ? { objectPosition: review.imagePosition === 'top' ? '50% 10%' : review.imagePosition === 'bottom' ? '50% 90%' : review.imagePosition === 'left' ? '20% 50%' : review.imagePosition === 'right' ? '80% 50%' : '50% 50%' }
                        : undefined
                    }
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.30),transparent_38%),linear-gradient(145deg,#1a4d2e_0%,#0f1d3a_72%)]" />
                )}
              </div>

              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#b7791f]">
                  {review.kicker || review.type}
                </p>
                <h2 className="mt-2 font-heading text-xl font-bold leading-tight text-[#0f1d3a]">
                  {review.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#59667a]">
                  {review.description}
                </p>
                <p className="mt-5 text-xs font-semibold text-[#7b8798]">
                  {formatPublishedAt(review, locale)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
