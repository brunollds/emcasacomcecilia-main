'use client';

import Image from 'next/image';
import { ViewTransitionLink } from '@/components/ViewTransitionLink';
import type { CardDecor } from '@/components/ui/cardDecor';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { trackEvent } from '@/lib/analytics';
import { cardImageLook } from '@/lib/cardImage';
import {
  REVIEWS_ROUTE_CLICK,
  getReviewsRouteClickParameters,
  type ShelfCardArticle,
  type ShelfPlacement,
} from '@/lib/reviewsShelf';
import { sanitizeViewTransitionName } from '@/lib/viewTransition';

// O cartão de artigo de /reviews e das subpáginas de loja (na grade e, com ímã e inclinação, nas
// Novidades e nos relacionados do fim do artigo) e a linha do modo lista. A foto leva em data-vt-name o nome da transição para o topo do
// artigo; o ViewTransitionLink só o aplica no clique, porque o mesmo artigo pode estar duas vezes na
// página (Novidades e acervo), e nomes repetidos cancelam a transição.

type ShelfLinkProps = { article: ShelfCardArticle; placement: ShelfPlacement };

function trackClick({ article, placement }: ShelfLinkProps) {
  trackEvent(REVIEWS_ROUTE_CLICK, getReviewsRouteClickParameters({ href: article.href, placement, linkLabel: article.title }));
}

const morphName = (slug: string) => `review-hero-${sanitizeViewTransitionName(slug)}`;

// A foto é decorativa (alt vazio): o título do artigo já dá nome ao link. Produto com nota fica inteiro.
function Photo({
  article,
  sizes,
  eager = false,
  compact = false,
}: {
  article: ShelfCardArticle;
  sizes: string;
  eager?: boolean;
  compact?: boolean;
}) {
  if (!article.image) return null;
  const look = cardImageLook(article.imageFit, article.imagePosition, compact ? 'p-1' : 'p-3');
  return (
    <Image
      src={article.image}
      alt=""
      fill
      sizes={sizes}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      className={`motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-105 ${look.className}`}
      style={look.style}
    />
  );
}

type ReviewShelfCardProps = ShelfLinkProps & {
  // Nas Novidades a data é DD/MM; no acervo, com o ano.
  dateFormat: 'dayMonth' | 'fullDate';
  showStore: boolean;
  decor?: CardDecor;
  eager?: boolean;
  // Nas Novidades todos são novos: o selo sai.
  showNewBadge?: boolean;
  imageSizes: string;
};

export function ReviewShelfCard({
  article,
  placement,
  dateFormat,
  showStore,
  decor,
  eager = false,
  showNewBadge = true,
  imageSizes,
}: ReviewShelfCardProps) {
  return (
    <ViewTransitionLink
      href={article.href}
      onClick={() => trackClick({ article, placement })}
      className={`group relative flex flex-1 flex-col rounded-[10px] border-2 border-marinho bg-white text-marinho ${decor?.tilt ?? ''} motion-safe:transition-[translate,rotate,box-shadow] motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-0 motion-safe:hover:shadow-[0_8px_18px_rgb(15_29_58/0.15)] ${FOCUS_RING}`}
    >
      {decor?.magnet ? (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 size-10 rounded-full shadow-[0_2px_6px_rgb(15_29_58/0.3)] ${decor.magnet}`}
        />
      ) : null}
      <span
        data-vt-name={morphName(article.slug)}
        className="relative block aspect-[4/3] overflow-hidden rounded-t-lg border-b-2 border-marinho bg-creme"
      >
        <Photo article={article} sizes={imageSizes} eager={eager} />
      </span>
      {/* O título vem primeiro no DOM (é o começo do nome do link e o cabeçalho do cartão); o order-first
          põe a data e o tipo acima dele, na tela. Um código no título (CSEMCASACOMCECILIA) quebra em vez de
          alargar o cartão na grade de duas colunas do celular. */}
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="text-[15px] leading-5 font-extrabold wrap-anywhere">{article.title}</h3>
        <span className="order-first text-xs font-bold text-marinho-suave">{`${article[dateFormat]}, ${article.type}`}</span>
      </div>
      {showStore && article.store ? (
        <span className="rounded-b-lg border-t-2 border-marinho bg-creme px-3 py-2 text-xs font-bold">{article.store}</span>
      ) : null}
      {/* Último filho do link: o nome acessível começa pelo título, não por "Novo". Fica no canto da foto por
          posição absoluta, em relação ao link. */}
      {showNewBadge && article.isNew ? (
        <span className="absolute top-2 left-2 z-10 rounded-full border-2 border-marinho bg-laranja px-2.5 py-0.5 text-[11px] font-extrabold text-marinho">
          Novo
        </span>
      ) : null}
    </ViewTransitionLink>
  );
}

export function ReviewShelfRow({ article, placement, showStore }: ShelfLinkProps & { showStore: boolean }) {
  return (
    <ViewTransitionLink
      href={article.href}
      onClick={() => trackClick({ article, placement })}
      className={`group flex min-h-11 flex-1 items-center gap-3 py-2.5 text-marinho ${FOCUS_RING}`}
    >
      <span
        data-vt-name={morphName(article.slug)}
        className="relative size-14 shrink-0 overflow-hidden rounded-lg border-2 border-marinho bg-creme"
      >
        <Photo article={article} sizes="56px" compact />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <h3 className="text-[15px] leading-5 font-extrabold group-hover:underline group-hover:underline-offset-[3px]">
          {article.title}
        </h3>
        <span className="flex flex-wrap gap-x-2 text-xs font-bold text-marinho-suave">
          <span>{`${article.fullDate}, ${article.type}`}</span>
          {showStore && article.store ? <span className="text-marinho">{article.store}</span> : null}
        </span>
      </div>
    </ViewTransitionLink>
  );
}
