import { ExternalLink } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { PRIMARY_ACTION } from '@/components/coupons/CouponBlocks';
import { ARTICLE_STORE_ID } from '../articleAnchors';

export type ArticleAffiliateCta = {
  url: string;
  label: string;
  text?: string;
  sponsored: boolean;
};

// Artigo sem loja cadastrada, mas com o link de afiliado dele (cta): no lugar do bloco da loja, só o botão desse
// link, com o rótulo do artigo. Leva o id do bloco da loja (ARTICLE_STORE_ID) para o dock do celular sair da frente aqui também.
export function ArticleAffiliateBlock({ cta, reviewSlug }: { cta: ArticleAffiliateCta; reviewSlug: string }) {
  return (
    <section id={ARTICLE_STORE_ID} aria-label={cta.label} className="mt-14 mb-10 scroll-mt-24 text-marinho print:hidden">
      <div
        className={`rounded-2xl border-2 border-marinho bg-white px-[18px] py-6 md:px-8 md:py-7 ${cta.text ? 'md:grid md:grid-cols-[minmax(0,1fr)_280px] md:items-center md:gap-8' : ''}`}
      >
        {cta.text && <p className="mb-4 font-editorial text-[17px] leading-7 md:mb-0">{cta.text}</p>}
        <CouponStoreLink
          href={cta.url}
          contentSlug={reviewSlug}
          linkLabel={cta.label}
          sponsored={cta.sponsored}
          placement="review_end"
          className={PRIMARY_ACTION}
        >
          {cta.label}
          <ExternalLink aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
        </CouponStoreLink>
      </div>
    </section>
  );
}
