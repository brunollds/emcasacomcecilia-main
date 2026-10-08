import Image from 'next/image';
import { ViewTransitionLink } from '@/components/ViewTransitionLink';
import type { HomeReviewCard } from '@/lib/reviewDiscovery';
import { sanitizeViewTransitionName } from '@/lib/viewTransition';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// Card de Guias & Análises: o grid de /reviews e a subpágina de cada loja.

const accentByType: Record<string, string> = {
  'Eletrodoméstico': '#ff6b35',
  'Alimento': '#1a4d2e',
  'Utensílio': '#0f1d3a',
  'Ingrediente': '#ffd700',
  'Teste de Cozinha': '#ff6b35',
};

const iconByType: Record<string, string> = {
  'Eletrodoméstico': '🔌',
  'Alimento': '🥄',
  'Utensílio': '🍴',
  'Ingrediente': '🧂',
  'Teste de Cozinha': '🧪',
};

const OBJECT_POSITION: Record<string, string> = {
  top: '50% 10%',
  bottom: '50% 90%',
  left: '20% 50%',
  right: '80% 50%',
  center: 'center',
};

function imageFitClass(review: HomeReviewCard): string {
  if (review.imageFit === 'cover') return 'object-cover';
  if (review.imageFit === 'contain' || review.rating) return 'object-contain bg-white p-4';
  return 'object-cover';
}

export function ReviewHubCard({ review, index }: { review: HomeReviewCard; index: number }) {
  const accent = accentByType[review.type] ?? '#ff6b35';
  const icon = iconByType[review.type] ?? '📝';
  const usesPosition = review.imageFit === 'cover' || (!review.imageFit && !review.rating);

  return (
    <ViewTransitionLink
      href={`/reviews/${review.slug}`}
      className="group block animate-slide-up"
      style={{ animationDelay: `${(index % 8) * 0.05}s` }}
    >
      <article className="transition-all duration-500 group-hover:-translate-y-2">
        <div
          className="relative mb-4 aspect-[5/6] overflow-hidden rounded-[2rem] shadow-soft transition-all duration-500 group-hover:shadow-large"
          style={{ viewTransitionName: `review-hero-${sanitizeViewTransitionName(review.slug)}` }}
        >
          {review.image ? (
            <Image
              src={resolveMediaUrl(review.image)}
              alt={review.imageAlt || review.title}
              fill
              className={`transition-transform duration-700 ease-out group-hover:scale-110 ${imageFitClass(review)}`}
              style={review.imagePosition && usesPosition ? { objectPosition: OBJECT_POSITION[review.imagePosition] } : undefined}
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
          ) : (
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
              style={{ background: `linear-gradient(160deg, ${accent}18 0%, ${accent}30 42%, #0f1d3a 100%)` }}
            />
          )}

          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

          <div className="absolute left-4 top-4">
            <div className="flex flex-wrap gap-2">
              {review.isNew && (
                <span className="inline-flex items-center rounded-full bg-[#ff6b35] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
                  Novo
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0f1419] shadow-lg backdrop-blur-md">
                {review.type}
              </span>
            </div>
          </div>

          {!review.image && (
            <div className="absolute inset-0 flex items-center justify-center text-5xl transition-transform duration-700 group-hover:scale-110">
              {icon}
            </div>
          )}

          <div className="absolute bottom-5 left-5 right-5 text-xs font-bold uppercase tracking-widest text-white/78">
            {review.publishedAt} · {review.readingMinutes} min de leitura
          </div>
        </div>

        <div className="px-2">
          <h3 className="font-heading text-lg font-bold leading-tight text-[#0f1419] transition-colors duration-300 group-hover:text-[#1a4d2e] md:text-xl">
            {review.title}
          </h3>
          <div className="mt-2 h-0.5 w-0 bg-[#ff6b35] transition-all duration-500 group-hover:w-12" />
        </div>
      </article>
    </ViewTransitionLink>
  );
}
