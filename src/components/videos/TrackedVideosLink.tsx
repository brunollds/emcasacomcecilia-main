'use client';

import type { ComponentProps } from 'react';
import Link from 'next/link';
import { ViewTransitionLink, type ViewTransitionLinkProps } from '@/components/ViewTransitionLink';
import { trackEvent } from '@/lib/analytics';
import { VIDEOS_ROUTE_CLICK, getVideosRouteClickParameters, type VideosPlacement } from '@/lib/videosShelf';

// Os links de /videos e da página de cada vídeo, que contam o clique no GA4 (videos_route_click), como o
// TrackedReviewsLink da estante. Sem placement (os Últimos vídeos da home, que nunca foram medidos), o clique
// não é medido.

function track(href: string, placement: VideosPlacement | undefined, linkLabel: string) {
  if (placement) trackEvent(VIDEOS_ROUTE_CLICK, getVideosRouteClickParameters({ href, placement, linkLabel }));
}

type TrackedVideosLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
  placement?: VideosPlacement;
  linkLabel: string;
};

// Link comum: a origem, o canal, o "Inscrever-se no canal" e o upload que só existe no YouTube.
export function TrackedVideosLink({ href, placement, linkLabel, onClick, ...rest }: TrackedVideosLinkProps) {
  return (
    <Link
      href={href}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        track(href, placement, linkLabel);
      }}
    />
  );
}

type VideoPageLinkProps = Omit<ViewTransitionLinkProps, 'onClick' | 'target'> & {
  placement?: VideosPlacement;
  linkLabel: string;
};

// O link para a página de um vídeo: a troca de página animada (a miniatura com data-vt-name voa para o
// player, pelo ViewTransitionLink) e a medição. Nunca para o YouTube: o ViewTransitionLink lê o target no
// elemento clicado, que pode ser a imagem, e abriria o YouTube na mesma aba. Por isso o tipo não aceita
// target: a página do vídeo abre sempre na mesma aba.
export function VideoPageLink({ href, placement, linkLabel, ...rest }: VideoPageLinkProps) {
  return <ViewTransitionLink href={href} {...rest} onClick={() => track(href, placement, linkLabel)} />;
}
