import Image from 'next/image';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import type { HomeReviewCard } from '@/lib/reviewDiscovery';

function getObjectPosition(position: HomeReviewCard['imagePosition']) {
  if (position === 'top') return '50% 10%';
  if (position === 'bottom') return '50% 90%';
  if (position === 'left') return '20% 50%';
  if (position === 'right') return '80% 50%';
  return position;
}

export function FeaturedReviewGuides({ items }: { items: HomeReviewCard[] }) {
  return (
    <section className="bg-[#fef9f3] px-4 pb-8 pt-12 md:px-6 md:pb-10 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 md:mb-9">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#ff6b35]">
            Para começar
          </p>
          <h2 className="mt-2 font-editorial text-2xl font-bold text-[#0f1d3a] sm:text-3xl">
            Guias & Análises em destaque
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
          {items.map((item) => {
            const imageClassName =
              item.imageFit === 'contain'
                ? 'object-contain bg-white p-3'
                : 'object-cover';

            return (
              <TrackedHomeLink
                key={item.id}
                href={`/reviews/${item.slug}`}
                placement="home_featured_guides"
                linkLabel={item.title}
                className="group relative block aspect-[3/3.55] overflow-hidden rounded-[1.25rem] bg-[#0f1d3a] shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl lg:aspect-[3/3.5] lg:rounded-[2rem]"
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

                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1d3a] via-[#0f1d3a]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 lg:p-6">
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
