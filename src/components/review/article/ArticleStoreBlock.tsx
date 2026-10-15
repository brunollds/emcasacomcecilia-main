import { ArrowRight } from 'lucide-react';
import { SectionHeadingReveal } from '@/components/editorial/SectionHeadingReveal';
import { TrackedReviewsLink } from '@/components/reviews/TrackedReviewsLink';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { ArticleStoreBlock as StoreBlock } from '@/lib/articleStore';
import type { ArticleCopy } from '../articleCopy';
import type { CouponCopyLocale } from '../couponCopyLocale';
import { TrackedCouponPageLink } from '../TrackedCouponPageLink';
import { ArticleCouponCutout } from './ArticleCouponCutout';

export type ArticleStoreBlockProps = {
  block: StoreBlock;
  locale: CouponCopyLocale;
  copy: ArticleCopy;
  reviewSlug: string;
  storeLabel: string;
  sponsored: boolean;
};

const PATH_LINK = `inline-flex min-h-11 items-center gap-1.5 text-[15px] font-extrabold underline underline-offset-[3px] hover:text-marinho-suave ${FOCUS_RING}`;

// "Sua compra na <loja>", no lugar do antigo bloco verde "Interessou?": o recorte grande (o do topo, medido como
// review_end), as regras da loja, que as páginas de loja também mostram, e os caminhos para a página da loja e
// para os artigos dela, só quando a página existe.
export function ArticleStoreBlock({ block, locale, copy, reviewSlug, storeLabel, sponsored }: ArticleStoreBlockProps) {
  const { brand, rules, couponPageHref, articlesHref, articleCount } = block;
  const allArticles = articlesHref && articleCount ? copy.allStoreArticles(articleCount, brand) : undefined;

  return (
    <section id="loja" className="mt-14 mb-10 scroll-mt-24 text-marinho print:hidden">
      <SectionHeadingReveal as="h2" variant="d2" className="mb-7">
        {copy.storeBlockTitle(brand)}
      </SectionHeadingReveal>

      <ArticleCouponCutout
        variant="end"
        block={block}
        locale={locale}
        reviewSlug={reviewSlug}
        storeLabel={storeLabel}
        sponsored={sponsored}
      />

      {rules.length > 0 && (
        <dl className="mt-5 grid gap-3 sm:grid-cols-3">
          {rules.map((rule) => (
            <div key={rule.label} className="rounded-[10px] border-2 border-marinho bg-creme px-4 py-3">
              <dt className="text-xs font-extrabold tracking-[0.12em] text-marinho-suave uppercase">{rule.label}</dt>
              <dd className="mt-1 text-[15px] leading-6 font-semibold">{rule.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {(couponPageHref || allArticles) && (
        <div className="mt-4 flex flex-col items-start gap-x-6 sm:flex-row sm:flex-wrap">
          {couponPageHref && (
            <TrackedCouponPageLink
              href={couponPageHref}
              contentSlug={reviewSlug}
              linkLabel={copy.allRules}
              placement="review_end"
              className={PATH_LINK}
            >
              {copy.allRules}
              <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
            </TrackedCouponPageLink>
          )}
          {articlesHref && allArticles && (
            <TrackedReviewsLink href={articlesHref} placement="review_store_block" linkLabel={allArticles} className={PATH_LINK}>
              {allArticles}
              <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
            </TrackedReviewsLink>
          )}
        </div>
      )}
    </section>
  );
}
