import Image from 'next/image';
import { TrackedHomeLink, TrackedHomeTabLink } from '@/components/TrackedHomeLink';
import { FOCUS_RING, FOCUS_RING_ON_DARK } from '@/components/ui/focusRing';
import type { EventTheme, HomeEventCard, ResolvedHomeEvent } from '@/lib/homeEvents';

// Data comercial na home, entre "Acabou de sair" e "Receitas": só aparece com uma data em campanha
// (content/home-events.json). Os cards não mostram código; "Ver o código" leva à aba da loja na
// vitrine, onde o código fica. A página da data (/black-friday) reusa o EventCard.

type EventPlacement = 'home_event' | 'event_hub';

// As três combinações do Encarte; nunca branco sobre laranja.
export const EVENT_THEME_CLASSES: Record<
  EventTheme,
  { band: string; title: string; pill: string; link: string; focus: string }
> = {
  noite: {
    band: 'bg-marinho text-white',
    title: 'text-amarelo-cupom',
    pill: 'bg-amarelo-cupom text-marinho',
    link: 'text-amarelo-cupom',
    focus: FOCUS_RING_ON_DARK,
  },
  laranja: {
    band: 'bg-laranja text-marinho',
    title: 'text-marinho',
    pill: 'bg-marinho text-amarelo-cupom',
    link: 'text-marinho',
    focus: FOCUS_RING,
  },
  amarelo: {
    band: 'bg-amarelo-cupom text-marinho',
    title: 'text-marinho',
    pill: 'bg-marinho text-amarelo-cupom',
    link: 'text-marinho',
    focus: FOCUS_RING,
  },
};

// A partir de 1024 px, uma coluna por card, até 4; com 1 card, ele ocupa metade.
const DESKTOP_COLUMNS = ['', 'lg:grid-cols-2', 'lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4'];

export function HomeEvent({ event }: { event: ResolvedHomeEvent }) {
  const theme = EVENT_THEME_CLASSES[event.theme];

  return (
    <section aria-labelledby="titulo-data-comercial" className="mx-auto w-full max-w-[1200px] md:px-10">
      <div
        className={`flex flex-col gap-3.5 border-y-2 border-marinho pt-[22px] pb-[18px] md:gap-[22px] md:rounded-[14px] md:border-2 md:px-8 md:py-7 md:shadow-[0_6px_0_var(--color-marinho)] ${theme.band}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2.5 px-4 md:items-end md:gap-x-6 md:gap-y-3 md:px-0">
          <div className="flex min-w-0 flex-[1_1_220px] flex-col gap-2 md:flex-[1_1_420px]">
            <h2
              id="titulo-data-comercial"
              className={`font-condensada text-[44px] leading-[0.95] font-black font-stretch-extra-condensed md:text-[64px] ${theme.title}`}
            >
              {event.title}
            </h2>
            <p className="max-w-[60ch] text-sm leading-[1.45] font-semibold md:text-[15px]">{event.description}</p>
          </div>
          <div className="flex flex-none flex-col items-start gap-1.5 md:items-end">
            <p className="text-[13px] font-bold">
              <time dateTime={event.dayDate}>{event.dayLabel}</time>
            </p>
            <p
              className={`font-condensada rounded-full px-3.5 pt-1.5 pb-2 text-2xl leading-none font-black font-stretch-extra-condensed md:text-[28px] ${theme.pill}`}
            >
              {event.countdownLabel}
            </p>
          </div>
        </div>

        <ul
          className={`flex snap-x gap-3 overflow-x-auto scroll-px-4 px-4 pt-1 pb-1.5 md:grid md:snap-none md:grid-cols-2 md:gap-[18px] md:overflow-visible md:p-0 ${DESKTOP_COLUMNS[event.cards.length]}`}
        >
          {event.cards.map((card) => (
            <li key={card.slug} className="flex w-60 shrink-0 snap-start md:w-auto">
              <EventCard card={card} placement="home_event" focusRing={theme.focus} />
            </li>
          ))}
        </ul>

        {event.hubLink ? (
          <TrackedHomeLink
            href={event.hubLink.href}
            placement="home_event"
            linkLabel={event.hubLink.label}
            className={`mx-4 flex min-h-11 items-center self-start text-sm font-extrabold underline underline-offset-[3px] md:mx-0 ${theme.link} ${theme.focus}`}
          >
            {event.hubLink.label}
          </TrackedHomeLink>
        ) : null}
      </div>
    </section>
  );
}

export function EventCard({
  card,
  placement,
  focusRing = FOCUS_RING,
}: {
  card: HomeEventCard;
  placement: EventPlacement;
  // Anel do link do artigo, que fica fora do card: precisa contrastar com o fundo em volta dele.
  focusRing?: string;
}) {
  return (
    <div className="flex flex-1 flex-col rounded-[10px] border-2 border-marinho bg-white text-marinho motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1">
      <TrackedHomeLink
        href={card.href}
        placement={placement}
        linkLabel={card.title}
        className={`flex flex-1 flex-col rounded-t-lg ${focusRing}`}
      >
        <span className="relative block h-[130px] overflow-hidden rounded-t-lg border-b-2 border-marinho bg-creme md:h-[150px]">
          {card.image ? (
            <Image
              src={card.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 300px, (min-width: 768px) 45vw, 240px"
              className="object-cover"
            />
          ) : null}
        </span>
        <span className="flex flex-col gap-1.5 p-3">
          <span className="text-xs font-bold text-marinho-suave">{card.type}</span>
          <span className="text-[15px] leading-5 font-extrabold">{card.title}</span>
        </span>
      </TrackedHomeLink>
      {card.store ? (
        <div className="flex flex-wrap items-center justify-between gap-x-2 rounded-b-lg border-t-2 border-marinho bg-creme px-3 py-1.5">
          <span className="py-2 text-xs font-bold">{card.store}</span>
          {card.codeLink ? (
            <TrackedHomeTabLink
              href={card.codeLink.href}
              placement={placement}
              linkLabel={card.codeLink.label}
              className={`flex min-h-11 items-center text-[13px] font-extrabold underline underline-offset-[3px] ${FOCUS_RING}`}
            >
              {card.codeLink.label}
            </TrackedHomeTabLink>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
