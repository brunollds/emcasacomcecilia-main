import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import homeEventsConfig from '@/../content/home-events.json';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { EventHubView } from '@/components/sections/EventHubView';
import { publishedReviews } from '@/lib/data';
import { getEventHubPage, type HomeEventCard } from '@/lib/homeEvents';
import { LOCALES } from '@/lib/i18n/locales';
import {
  SITE_NAME,
  SITE_SOCIAL_IMAGE,
  absoluteMediaUrl,
  getCollectionPageJsonLd,
  type SocialImage,
} from '@/lib/pageSeo';
import { isListedInPortuguese } from '@/lib/reviewDiscovery';

// Página fixa de uma data comercial (/black-friday, /natal…): a edição mais recente, com todos os
// artigos dela. Fica fora do menu e entra no sitemap. Cada data tem uma rota de poucas linhas em
// src/app/(pt)/{hub}/page.tsx; uma rota dinâmica na raiz bateria com a [locale].

function getPage(hub: string) {
  return getEventHubPage(homeEventsConfig, publishedReviews, hub, new Date());
}

// A capa do artigo mais novo da edição (o card traz a capa já resolvida, mas não a data).
function getEventSocialImage(cards: readonly HomeEventCard[]): SocialImage {
  let newest: { image: string; alt: string; date: string } | undefined;
  for (const card of cards) {
    if (!card.image) continue;
    const review = publishedReviews.find((item) => item.slug === card.slug && isListedInPortuguese(item));
    const date = review?.publishedAtISO ?? '';
    if (!newest || date > newest.date) newest = { image: card.image, alt: card.title, date };
  }

  return newest ? { url: absoluteMediaUrl(newest.image), alt: newest.alt } : SITE_SOCIAL_IMAGE;
}

export function getEventHubMetadata(hub: string): Metadata {
  const page = getPage(hub);
  if (!page) return {};
  const image = getEventSocialImage(page.cards);

  return {
    title: page.metaTitle,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url: page.path,
      siteName: SITE_NAME,
      locale: LOCALES.pt.openGraphLocale,
      type: 'website',
      images: [image],
    },
    // O layout já define título e descrição genéricos no twitter, e o Next não os troca pelos do Open Graph.
    twitter: { card: 'summary_large_image', title: page.metaTitle, description: page.description, images: [image.url] },
  };
}

export function EventHubPage({ hub }: { hub: string }) {
  const page = getPage(hub);
  if (!page) notFound();

  const jsonLd = getCollectionPageJsonLd({
    name: page.title,
    description: page.description,
    path: page.path,
    items: page.cards.map((card) => ({ name: card.title, path: card.href })),
    breadcrumb: [{ name: 'Início', path: '/' }],
  });

  // As variáveis das fontes do Encarte (font-condensada) vêm do couponFontVariables, como na home.
  return (
    <main className={`${couponFontVariables} min-h-screen bg-creme`}>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <EventHubView page={page} />
    </main>
  );
}
