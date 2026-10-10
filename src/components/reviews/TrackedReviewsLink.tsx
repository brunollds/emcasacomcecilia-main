'use client';

import type { ComponentProps } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { REVIEWS_ROUTE_CLICK, getReviewsRouteClickParameters, type ShelfPlacement } from '@/lib/reviewsShelf';

// Link de /reviews e das subpáginas de loja que conta o clique no GA4 (reviews_route_click), como o
// TrackedHomeLink faz na home.
type TrackedReviewsLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
  placement: ShelfPlacement;
  linkLabel: string;
};

export function TrackedReviewsLink({ href, placement, linkLabel, onClick, ...rest }: TrackedReviewsLinkProps) {
  return (
    <Link
      href={href}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        trackEvent(REVIEWS_ROUTE_CLICK, getReviewsRouteClickParameters({ href, placement, linkLabel }));
      }}
    />
  );
}
