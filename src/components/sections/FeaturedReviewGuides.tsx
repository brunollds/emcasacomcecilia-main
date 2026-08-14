import Image from 'next/image';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import {
  REVIEW_CATEGORIES,
  type HomeReviewCard,
} from '@/lib/reviewDiscovery';

function getObjectPosition(position: HomeReviewCard['imagePosition']) {
  if (position === 'top') return '50% 10%';
  if (position === 'bottom') return '50% 90%';
  if (position === 'left') return '20% 50%';
  if (position === 'right') return '80% 50%';
  return position;
}

export function FeaturedReviewGuides({ items }: { items: HomeReviewCard[] }) {
  return (
    <section className="bg-[#0f1d3a] px-4 pb-8 pt-0 md:px-6 md:pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
          {items.map((item, index) => {
            const imageClassName =
              item.imageFit === 'contain'
                ? 'object-contain bg-white p-3'
                : 'object-cover';
            const categoryLabel = REVIEW_CATEGORIES.find(
              ({ value }) => value === item.category
            )?.label;

            return (
              <TrackedHomeLink
                key={item.id}
                href={`/reviews/${item.slug}`}
                placement="home_featured_guides"
                linkLabel={item.title}
                className="group relative block aspect-[3/3.55] overflow-hidden rounded-[1.25rem] border border-white/15 bg-[#0f1d3a] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.95)] ring-1 ring-inset ring-white/8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#ffd700]/35 hover:shadow-[0_30px_80px_-28px_rgba(0,0,0,1)] lg:aspect-[3/3.5] lg:rounded-[2rem]"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    fill
                    className={`transition-transform duration-700 ease-out group-hover:scale-105 ${imageClassName}`}
                    style={
                      item.imageFit !== 'contain' && item.imagePosition
                        ? { objectPosition: getObjectPosition(item.imagePosition) }
                        : undefined
                    }
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.28),transparent_36%),linear-gradient(145deg,#1a4d2e_0%,#0f1d3a_72%)]" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#071127] via-[#0f1d3a]/22 to-black/5" />
                <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.25rem-1px)] ring-1 ring-inset ring-white/10 lg:rounded-[calc(2rem-1px)]" />

                <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3 sm:p-4">
                  <span className="rounded-full border border-white/15 bg-[#0f1d3a]/78 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-white/85 backdrop-blur-md sm:text-[9px] lg:px-3 lg:text-[10px]">
                    {categoryLabel}
                  </span>
                  <span className="font-editorial text-lg font-bold text-[#ffd700] sm:text-xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 lg:p-5">
                  <h3 className="font-heading text-base font-bold leading-tight text-white drop-shadow-md sm:text-lg lg:text-2xl">
                    {item.title}
                  </h3>
                  <div className="mt-3 h-0.5 w-10 rounded-full bg-[#ffd700] transition-all duration-500 group-hover:w-16 lg:h-1" />
                </div>
              </TrackedHomeLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
