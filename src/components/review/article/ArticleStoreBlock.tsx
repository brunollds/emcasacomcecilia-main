import { ArrowRight, ExternalLink } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { SECONDARY_ACTION_COMPACT } from '@/components/coupons/CouponBlocks';
import { COUPON_STORE_COPY } from '@/components/coupons/couponStoreCopy';
import { SectionHeadingReveal } from '@/components/editorial/SectionHeadingReveal';
import { TrackedReviewsLink } from '@/components/reviews/TrackedReviewsLink';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { ArticleStoreBlock as StoreBlock } from '@/lib/articleStore';
import { ARTICLE_STORE_ID } from '../articleAnchors';
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
};

const PATH_LINK = `inline-flex min-h-11 items-center gap-1.5 text-[15px] font-extrabold underline underline-offset-[3px] hover:text-marinho-suave ${FOCUS_RING}`;

// "Sua compra na <loja>": o recorte grande (o do topo, medido como review_end), as regras da loja, que as páginas
// de loja também mostram, os links por produto (Proton) e os caminhos para a página da loja e os artigos dela.
export function ArticleStoreBlock({ block, locale, copy, reviewSlug, storeLabel }: ArticleStoreBlockProps) {
  const { rules, productLinks, couponPageHref, articlesHref, articleCount } = block;
  const storeCopy = COUPON_STORE_COPY[locale];
  const allArticles = articlesHref && articleCount ? copy.allStoreArticles(articleCount, block) : undefined;

  return (
    <section id={ARTICLE_STORE_ID} className="mt-14 mb-10 scroll-mt-24 text-marinho print:hidden">
      <SectionHeadingReveal as="h2" variant="d2" className="mb-7">
        {copy.storeBlockTitle(block)}
      </SectionHeadingReveal>

      <ArticleCouponCutout
        variant="end"
        block={block}
        locale={locale}
        reviewSlug={reviewSlug}
        storeLabel={storeLabel}
      />

      {rules.length > 0 && (
        <dl className="mt-5 grid gap-3 sm:grid-cols-3 sm:items-start">
          {rules.map((rule) => (
            <div key={rule.label} className="rounded-[10px] border-2 border-marinho bg-creme px-4 py-3">
              <dt className="text-xs font-extrabold tracking-[0.12em] text-marinho-suave uppercase">{rule.label}</dt>
              <dd className="mt-1 text-[15px] leading-6 font-semibold">{rule.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {productLinks && productLinks.length > 0 && (
        <div className="mt-6" data-article="produtos-loja">
          <h3 className="text-xs font-extrabold tracking-[0.12em] text-marinho-suave uppercase">
            {storeCopy.productLinks.title(block.brand)}
          </h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {productLinks.map((item) => (
              <li key={item.url} className="flex min-w-0 flex-col rounded-[10px] border-2 border-marinho bg-creme p-4">
                <p className="text-base font-extrabold leading-[22px]">{item.name}</p>
                <p className="mt-1 flex-1 text-sm font-medium leading-[21px] text-marinho-suave">{item.description}</p>
                <CouponStoreLink
                  href={item.url}
                  brand={block.slug}
                  contentSlug={reviewSlug}
                  linkLabel={storeCopy.productLinks.cta(item.name)}
                  sponsored={true}
                  placement="review_end"
                  className={`mt-3 ${SECONDARY_ACTION_COMPACT}`}
                >
                  {storeCopy.productLinks.cta(item.name)}
                  <ExternalLink aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
                </CouponStoreLink>
              </li>
            ))}
          </ul>
        </div>
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
              <ArrowRight aria-hidden="true" className="size-4 shrink-0 rtl:-scale-x-100" />
            </TrackedCouponPageLink>
          )}
          {articlesHref && allArticles && (
            <TrackedReviewsLink href={articlesHref} placement="review_store_block" linkLabel={allArticles} className={PATH_LINK}>
              {allArticles}
              <ArrowRight aria-hidden="true" className="size-4 shrink-0 rtl:-scale-x-100" />
            </TrackedReviewsLink>
          )}
        </div>
      )}
    </section>
  );
}
