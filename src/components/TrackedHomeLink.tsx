'use client';

import type { ComponentProps, MouseEvent } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

export type HomeRoutePlacement =
  | 'home_featured_guides'
  | 'home_review_categories'
  | 'home_reviews_carousel'
  | 'home_editor_pick'
  // Vitrine da D2: artigos da loja e painel da Cecília.
  | 'home_store_articles'
  | 'home_cecilia'
  // Fase 3 da D2: "Acabou de sair".
  | 'home_latest'
  // Fase 4 da D2: datas comerciais na home e na página de cada data.
  | 'home_event'
  | 'event_hub';

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

function handleHomeRouteClick(
  event: MouseEvent<HTMLAnchorElement>,
  onClick: ((event: MouseEvent<HTMLAnchorElement>) => void) | undefined,
  input: HomeRouteClickInput
) {
  onClick?.(event);
  if (event.defaultPrevented) return;

  trackEvent('home_route_click', getHomeRouteClickParameters(input));
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
  return (
    <Link
      {...props}
      href={href}
      onClick={(event) => handleHomeRouteClick(event, onClick, { href, placement, linkLabel })}
    />
  );
}

// Link para uma aba da vitrine (/#loja-{slug}). É um <a> comum: o next/link navega por pushState,
// que não dispara hashchange, e a página rolaria sem trocar a aba.
type TrackedHomeTabLinkProps = Omit<ComponentProps<'a'>, 'href' | 'onClick'> &
  HomeRouteClickInput & {
    onClick?: ComponentProps<'a'>['onClick'];
  };

export function TrackedHomeTabLink({
  href,
  placement,
  linkLabel,
  onClick,
  children,
  ...props
}: TrackedHomeTabLinkProps) {
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => handleHomeRouteClick(event, onClick, { href, placement, linkLabel })}
    >
      {children}
    </a>
  );
}
