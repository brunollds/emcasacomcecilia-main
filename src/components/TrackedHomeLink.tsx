'use client';

import type { ComponentProps, MouseEvent } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

// Onde fica o link: os artigos da loja e o painel da Cecília na vitrine, o "Acabou de sair", a faixa
// da data comercial na home e a página de cada data; na home de cada idioma (/en, /ja…), o hero, as
// lojas, os artigos, as perguntas e as redes; no 404, os caminhos, os artigos e os outros idiomas.
export type HomeRoutePlacement =
  | 'home_store_articles'
  | 'home_cecilia'
  | 'home_latest'
  | 'home_event'
  | 'event_hub'
  | 'locale_home_hero'
  | 'locale_home_stores'
  | 'locale_home_articles'
  | 'locale_home_faq'
  | 'locale_home_follow'
  | 'not_found';

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
