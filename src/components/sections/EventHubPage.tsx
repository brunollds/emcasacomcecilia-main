import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import homeEventsConfig from '@/../content/home-events.json';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { EventHubView } from '@/components/sections/EventHubView';
import { publishedReviews } from '@/lib/data';
import { getEventHubPage } from '@/lib/homeEvents';

// Página fixa de uma data comercial (/black-friday, /natal…): a edição mais recente, com todos os
// artigos dela. Fica fora do menu e entra no sitemap. Cada data tem uma rota de poucas linhas em
// src/app/(pt)/{hub}/page.tsx; uma rota dinâmica na raiz bateria com a [locale].

function getPage(hub: string) {
  return getEventHubPage(homeEventsConfig, publishedReviews, hub, new Date());
}

export function getEventHubMetadata(hub: string): Metadata {
  const page = getPage(hub);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: { title: page.metaTitle, description: page.description, url: page.path, type: 'website' },
  };
}

export function EventHubPage({ hub }: { hub: string }) {
  const page = getPage(hub);
  if (!page) notFound();

  // As variáveis das fontes do Encarte (font-condensada) vêm do couponFontVariables, como na home.
  return (
    <main className={`${couponFontVariables} min-h-screen bg-creme`}>
      <EventHubView page={page} />
    </main>
  );
}
