import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionHeadingReveal } from '@/components/editorial/SectionHeadingReveal';
import { ReviewShelfCard } from '@/components/reviews/ReviewShelfCard';
import { TrackedReviewsLink } from '@/components/reviews/TrackedReviewsLink';
import { cardDecorAt } from '@/components/ui/cardDecor';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { RevealSection } from '@/components/ui/RevealSection';
import type { ShelfCardArticle } from '@/lib/reviewsShelf';

export type ArticleRelatedProps = {
  articles: ShelfCardArticle[];
  title: string;
  viewAllLabel: string;
  // A subpágina da loja quando existe; senão, a lista de guias do idioma.
  viewAllHref: string;
};

// Os relacionados do fim do artigo nos cartões da estante de /reviews: entram em cascata quando a seção chega à
// tela (RevealSection, .revela com --i) e levam o ímã e a inclinação de cardDecorAt pela posição.
export function ArticleRelated({ articles, title, viewAllLabel, viewAllHref }: ArticleRelatedProps) {
  if (articles.length === 0) return null;

  return (
    <RevealSection data-article="relacionados" className="mt-14 mb-10 text-marinho print:hidden">
      <div className="flex items-end justify-between gap-4">
        <SectionHeadingReveal as="h2" variant="d2">
          {title}
        </SectionHeadingReveal>
        <TrackedReviewsLink
          href={viewAllHref}
          placement="review_related"
          linkLabel={viewAllLabel}
          className={`inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-extrabold underline underline-offset-[3px] hover:text-marinho-suave ${FOCUS_RING}`}
        >
          {viewAllLabel}
          <ArrowRight aria-hidden="true" className="size-4" />
        </TrackedReviewsLink>
      </div>
      {/* O pt-5 dá lugar aos ímãs, que saem do cartão. */}
      <ul data-relacionados-cartoes="" className="grid grid-cols-2 gap-x-4 gap-y-6 pt-5 md:grid-cols-3">
        {articles.map((article, index) => (
          <li key={article.href} className="revela flex min-w-0" style={{ '--i': index } as CSSProperties}>
            <ReviewShelfCard
              article={article}
              placement="review_related"
              dateFormat="fullDate"
              showStore
              decor={cardDecorAt(index)}
              showNewBadge={false}
              imageSizes="(min-width: 1024px) 240px, (min-width: 768px) 30vw, 45vw"
            />
          </li>
        ))}
      </ul>
    </RevealSection>
  );
}
