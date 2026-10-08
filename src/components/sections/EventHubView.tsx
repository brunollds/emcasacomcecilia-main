import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { EVENT_THEME_CLASSES, EventCard } from '@/components/sections/HomeEvent';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { EventHubPageData } from '@/lib/homeEvents';

// A página da data sem a leitura dos dados: o teste renderiza com uma edição de exemplo.
export function EventHubView({ page }: { page: EventHubPageData }) {
  const theme = EVENT_THEME_CLASSES[page.theme];

  return (
    <>
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

      <section aria-labelledby="titulo-guias-da-data" className="px-4 py-8 md:px-10 md:py-10">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="titulo-guias-da-data" className="sr-only">
            Guias {page.titleOf}
          </h2>
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
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-marinho px-8 font-extrabold text-marinho hover:bg-marinho hover:text-white motion-safe:transition-colors ${FOCUS_RING}`}
            >
              Ver todos os guias e análises
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
