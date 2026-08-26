import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';

function getObjectPosition(position: HomeEditorialPickArticle['imagePosition']) {
  if (position === 'top') return '50% 10%';
  if (position === 'bottom') return '50% 90%';
  if (position === 'left') return '20% 50%';
  if (position === 'right') return '80% 50%';
  return position;
}

type HomeEditorialPickArticle = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  type: string;
  image?: string;
  imageAlt?: string;
  imageFit?: 'cover' | 'contain';
  imagePosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
};

type HomeEditorialPickProps = {
  item: {
    article: HomeEditorialPickArticle;
    eyebrow: string;
  } | null;
};

export function HomeEditorialPick({ item }: HomeEditorialPickProps) {
  if (!item) {
    return null;
  }

  const href = `/reviews/${item.article.slug}`;

  return (
    <section
      id="home-editorial-pick"
      className="bg-[#fef9f3] border-t border-[#0f1d3a]/8"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 pb-8 pt-8 sm:px-6 lg:px-8 lg:gap-6">
        <TrackedHomeLink
          href={href}
          placement="home_editor_pick"
          linkLabel={item.article.title}
          className="group block"
        >
          <article className="overflow-hidden rounded-[1.3rem] border border-[#0f1d3a]/12 bg-white p-4 shadow-soft transition-shadow duration-500 hover:border-[#1a4d2e]/30 hover:shadow-large md:p-0">
            <div className="flex flex-col gap-4 md:min-h-[320px] md:flex-row md:items-stretch">
              <div className="relative aspect-[16/9] flex-1 overflow-hidden rounded-[1rem] bg-[#0f1d3a]/10 md:aspect-auto md:min-h-[320px] md:rounded-none md:rounded-l-[1.3rem]">
                {item.article.image ? (
                  <div
                    className={`${
                      item.article.imageFit === 'contain'
                        ? 'bg-white p-3'
                        : ''
                    } absolute inset-0`}
                  >
                    <Image
                      src={item.article.image}
                      alt={item.article.imageAlt || item.article.title}
                      width={960}
                      height={540}
                      className={`h-full w-full ${
                        item.article.imageFit === 'contain'
                          ? 'object-contain'
                          : 'object-cover'
                      }`}
                      style={
                        item.article.imageFit !== 'contain' &&
                        item.article.imagePosition
                          ? {
                              objectPosition: getObjectPosition(
                                item.article.imagePosition
                              ),
                            }
                          : undefined
                      }
                      sizes="(max-width: 767px) 100vw, (min-width: 768px) 50vw"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.28),transparent_36%),linear-gradient(145deg,#1a4d2e_0%,#0f1d3a_72%)]">
                    <span className="font-editorial text-2xl font-bold text-white/85">
                      Editorial
                    </span>
                  </div>
                )}
              </div>

              <div className="flex w-full flex-1 flex-col justify-between gap-3 bg-white p-1 md:p-8">
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#ff6b35] md:text-[11px]">
                    {item.eyebrow}
                  </p>
                  <h2 className="font-heading text-2xl font-bold leading-tight text-[#0f1d3a] md:text-3xl">
                    {item.article.title}
                  </h2>
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#1f2937]">
                    {item.article.description}
                  </p>
                </div>

                <div>
                  <p className="mb-5 text-xs font-semibold uppercase tracking-[0.08em] text-[#0f1d3a]/70 md:text-[11px]">
                    {item.article.type} · {item.article.publishedAt}
                  </p>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0f1d3a] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-[#1a4d2e]">
                    Ler o destaque
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </article>
        </TrackedHomeLink>
      </div>
    </section>
  );
}
