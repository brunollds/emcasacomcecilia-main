import Image from 'next/image';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { HomeLatestArticle } from '@/lib/homeStores';

// "Acabou de sair": os 5 artigos mais novos, sem código. No desktop são cartões presos na geladeira;
// no celular, a lista de data e título. Os dois vão no HTML e o CSS mostra um ou outro.

type CardDecor = { magnet: string | null; tilt: string };

// Ímã e inclinação de cada posição, como no canvas. Decoração: fora da leitura de tela.
const CARD_DECOR: CardDecor[] = [
  { magnet: '-top-3 -right-3 bg-amarelo-cupom', tilt: '-rotate-1' },
  { magnet: null, tilt: '' },
  { magnet: '-bottom-3 -right-3 bg-laranja', tilt: 'rotate-[0.5deg]' },
  { magnet: null, tilt: '' },
  { magnet: '-top-3 -right-3 bg-marinho', tilt: 'rotate-[-0.6deg]' },
];

const ALL_LABEL = 'Ver todos os guias e análises';

export function HomeLatest({ articles }: { articles: HomeLatestArticle[] }) {
  return (
    <section aria-labelledby="titulo-acabou-de-sair" className="mx-auto w-full max-w-[1200px] px-4 md:px-10">
      <div className="flex flex-col gap-2.5 md:gap-6 md:border-y-2 md:border-marinho md:py-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2
            id="titulo-acabou-de-sair"
            className="font-condensada text-[32px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-5xl"
          >
            Acabou de sair
          </h2>
          <TrackedHomeLink
            href="/reviews"
            placement="home_latest"
            linkLabel={ALL_LABEL}
            aria-label={ALL_LABEL}
            className={`flex min-h-11 items-center text-[13px] font-extrabold text-marinho underline underline-offset-[3px] md:text-sm ${FOCUS_RING}`}
          >
            <span className="md:hidden">Ver todos</span>
            <span className="hidden md:inline">{ALL_LABEL}</span>
          </TrackedHomeLink>
        </div>

        <ul className="flex flex-col border-t-2 border-marinho md:hidden">
          {articles.map((article, index) => (
            <li
              key={article.slug}
              className={index < articles.length - 1 ? 'border-b-[1.5px] border-marinho/15' : 'border-b-2 border-marinho'}
            >
              <TrackedHomeLink
                href={article.href}
                placement="home_latest"
                linkLabel={article.title}
                className={`flex min-h-11 items-baseline gap-2.5 py-[11px] text-sm leading-[1.35] font-semibold text-marinho ${FOCUS_RING}`}
              >
                <span className="w-10 shrink-0 text-xs font-bold text-marinho-suave">{article.dateLabel}</span>
                <span className="min-w-0">{article.title}</span>
              </TrackedHomeLink>
            </li>
          ))}
        </ul>

        <ul className="hidden gap-[18px] md:grid min-[768px]:grid-cols-3 min-[1200px]:grid-cols-5">
          {articles.map((article, index) => (
            <li key={article.slug} className="flex">
              <LatestCard article={article} decor={CARD_DECOR[index % CARD_DECOR.length]} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LatestCard({ article, decor }: { article: HomeLatestArticle; decor: CardDecor }) {
  return (
    <TrackedHomeLink
      href={article.href}
      placement="home_latest"
      linkLabel={article.title}
      className={`relative flex flex-1 flex-col rounded-[10px] border-2 border-marinho bg-white text-marinho shadow-[0_2px_6px_rgb(15_29_58/0.04)] ${decor.tilt} motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-0 ${FOCUS_RING}`}
    >
      {decor.magnet ? (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 size-10 rounded-full shadow-[0_2px_6px_rgb(15_29_58/0.3)] ${decor.magnet}`}
        />
      ) : null}
      <span className="relative block h-[140px] overflow-hidden rounded-t-lg border-b-2 border-marinho bg-creme">
        {article.image ? (
          <Image src={article.image} alt="" fill sizes="(min-width: 1200px) 210px, 30vw" className="object-cover" />
        ) : null}
      </span>
      <span className="flex flex-1 flex-col gap-1.5 p-3">
        <span className="text-xs font-bold text-marinho-suave">
          {article.dateLabel}, {article.type}
        </span>
        <span className="text-[15px] leading-5 font-extrabold">{article.title}</span>
      </span>
      {article.store ? (
        <span className="rounded-b-lg border-t-2 border-marinho bg-creme px-3 py-2 text-xs font-bold">{article.store}</span>
      ) : null}
    </TrackedHomeLink>
  );
}
