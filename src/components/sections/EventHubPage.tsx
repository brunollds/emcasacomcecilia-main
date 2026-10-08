import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import homeEventsConfig from '@/../content/home-events.json';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import { EVENT_THEME_CLASSES, EventCard } from '@/components/sections/HomeEvent';
import { FOCUS_RING } from '@/components/ui/focusRing';
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
  const theme = EVENT_THEME_CLASSES[page.theme];

  // As variáveis das fontes do Encarte (font-condensada) vêm do couponFontVariables, como na home.
  return (
    <main className={`${couponFontVariables} min-h-screen bg-creme`}>
      <section className={`border-b-2 border-marinho px-4 py-12 md:px-10 md:py-16 ${theme.band}`}>
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4">
          <h1
            className={`font-condensada text-[56px] leading-[0.95] font-black font-stretch-extra-condensed md:text-[88px] ${theme.title}`}
          >
            {page.title}
          </h1>
          <p className="max-w-[60ch] text-base leading-relaxed font-semibold md:text-lg">{page.description}</p>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-bold">
              <time dateTime={page.dayDate}>{page.dayLabel}</time>
            </p>
            {page.countdownLabel ? (
              <p
                className={`font-condensada rounded-full px-3.5 pt-1.5 pb-2 text-2xl leading-none font-black font-stretch-extra-condensed ${theme.pill}`}
              >
                {page.countdownLabel}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section aria-label={`Guias ${page.titleOf}`} className="px-4 py-8 md:px-10 md:py-10">
        <div className="mx-auto max-w-[1200px]">
          <ul className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {page.cards.map((card) => (
              <li key={card.slug} className="flex">
                <EventCard card={card} placement="event_hub" />
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <Link
              href="/reviews"
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-marinho px-8 font-extrabold text-marinho ${FOCUS_RING}`}
            >
              Ver todos os guias e análises
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
