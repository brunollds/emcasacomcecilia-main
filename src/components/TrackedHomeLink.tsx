'use client';

import type { ComponentProps, MouseEvent } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

export type HomeRoutePlacement =
  | 'home_featured_guides'
  | 'home_review_categories'
  | 'home_reviews_carousel';

type HomeRouteClickInput = {
  href: string;
  placement: HomeRoutePlacement;
  linkLabel: string;
};

export function getHomeRouteClickParameters({
  href,
  placement,
  linkLabel,
}: HomeRouteClickInput) {
  return {
    destination: href,
    placement,
    link_label: linkLabel,
  };
}

export function getHomeCategoryFilterParameters(
  category: string,
  linkLabel: string
) {
  return {
    category,
    placement: 'home_review_categories',
    link_label: linkLabel,
  };
}

type TrackedHomeLinkProps = Omit<ComponentProps<typeof Link>, 'href' | 'onClick'> &
  HomeRouteClickInput & {
    onClick?: ComponentProps<typeof Link>['onClick'];
  };

export function TrackedHomeLink({
  href,
  placement,
  linkLabel,
  onClick,
  ...props
}: TrackedHomeLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    trackEvent(
      'home_route_click',
      getHomeRouteClickParameters({ href, placement, linkLabel })
    );
  };

  return <Link {...props} href={href} onClick={handleClick} />;
}
