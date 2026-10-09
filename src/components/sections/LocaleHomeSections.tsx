import type { CSSProperties } from 'react';
import Image from 'next/image';
import { BadgeCheck, ChevronDown, ChevronRight, Globe, HandCoins, Lock, ShoppingBag } from 'lucide-react';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import { SocialIcon } from '@/components/sections/CeciliaProfile';
import { CARD_DECOR, LatestCard } from '@/components/sections/HomeLatest';
import { HomeSection } from '@/components/sections/HomeSection';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { ScrollRow } from '@/components/ui/ScrollRow';
import type { LocaleHomeContent } from '@/lib/localeHome';

// As seções da home de cada idioma depois do hero, todas pelo HomeSection (título com o marca-texto e
// revelação na rolagem). Os cartões levam `revela` e `--i`.

const cardIndex = (index: number) => ({ '--i': index }) as CSSProperties;

// Cada loja leva à página dela no idioma, que explica o código: a home não tem link de afiliado nem
// botão de copiar.
export function LocaleHomeStores({ stores }: { stores: LocaleHomeContent['stores'] }) {
  return (
    <HomeSection id="titulo-lojas" title={stores.title}>
      <p className="max-w-[60ch] text-sm leading-normal font-medium text-marinho-suave md:text-base">{stores.intro}</p>
      <ul className="grid gap-3 md:grid-cols-2">
        {stores.items.map((store, index) => (
          <li key={store.slug} className="revela flex" style={cardIndex(index)}>
            <TrackedHomeLink
              href={store.href}
              placement="locale_home_stores"
              linkLabel={store.brand}
              className={`flex flex-1 items-center gap-3 rounded-[10px] border-2 border-marinho bg-white p-3 text-marinho shadow-[0_3px_0_var(--color-marinho)] motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 ${FOCUS_RING}`}
            >
              <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-marinho bg-white text-sm font-black">
                {store.logo ? (
                  <Image src={store.logo} alt="" fill sizes="56px" className="object-contain p-1" />
                ) : (
                  <span aria-hidden="true">{store.initials}</span>
                )}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-base leading-tight font-extrabold">{store.brand}</span>
                <span className="text-xs font-semibold text-marinho-suave">{store.category}</span>
                {store.code ? (
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="rounded-md border-[1.5px] border-dashed border-marinho bg-amarelo-cupom px-1.5 py-0.5 text-[13px] font-black tracking-[0.04em]">
                      {store.code}
                    </span>
                    <span className="text-xs font-bold text-marinho-suave">{store.codeLabel}</span>
                  </span>
                ) : null}
              </span>
              <ChevronRight aria-hidden="true" className="size-5 shrink-0" strokeWidth={2.4} />
            </TrackedHomeLink>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}

// A largura do cartão: 220 px na fila do celular, um terço do contêiner (tela menos 80 de margem e 36 de
// espaço entre os cartões) de tablet para cima e, no contêiner cheio de 1200 px, 361 px.
const ARTICLE_IMAGE_SIZES = '(min-width: 1200px) 361px, (min-width: 768px) calc((100vw - 116px) / 3), 220px';

// Os artigos do idioma nos cartões do "Acabou de sair": fila que rola no celular, grade no desktop.
export function LocaleHomeArticles({ articles }: { articles: LocaleHomeContent['articles'] }) {
  return (
    <HomeSection id="titulo-artigos" title={articles.title}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="max-w-[60ch] text-sm leading-normal font-medium text-marinho-suave md:text-base">{articles.description}</p>
        <TrackedHomeLink
          href={articles.all.href}
          placement="locale_home_articles"
          linkLabel={articles.all.label}
          className={`flex min-h-11 items-center text-[13px] font-extrabold text-marinho underline underline-offset-[3px] md:text-sm ${FOCUS_RING}`}
        >
          {articles.all.label}
        </TrackedHomeLink>
      </div>
      {/* O pt-4 dá lugar aos ímãs, que ficam para fora do cartão; a fila que rola corta o que vaza. */}
      <ScrollRow className="hide-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pt-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-[18px] md:overflow-visible md:px-0">
        {articles.items.map((article, index) => (
          <li key={article.slug} className="revela flex w-[220px] shrink-0 snap-start md:w-auto" style={cardIndex(index)}>
            <LatestCard
              article={article}
              decor={CARD_DECOR[index % CARD_DECOR.length]}
              placement="locale_home_articles"
              meta={article.dateLabel}
              imageSizes={ARTICLE_IMAGE_SIZES}
            />
          </li>
        ))}
      </ScrollRow>
    </HomeSection>
  );
}

// Um ícone por item, na ordem dos textos: não vendemos, não pedimos dados, comissão, códigos
// conferidos e o endereço do site.
const SAFETY_ICONS = [ShoppingBag, Lock, HandCoins, BadgeCheck, Globe] as const;

export function LocaleHomeSafety({ safety }: { safety: LocaleHomeContent['safety'] }) {
  return (
    <HomeSection id="titulo-seguro" title={safety.title}>
      <ul className="grid gap-3 rounded-[14px] border-2 border-marinho bg-creme p-4 md:grid-cols-2 md:gap-4 md:p-6">
        {safety.items.map((item, index) => {
          const Icon = SAFETY_ICONS[index];
          return (
            <li
              key={item}
              className="revela flex items-start gap-3 text-sm leading-normal font-semibold text-marinho md:text-[15px]"
              style={cardIndex(index)}
            >
              <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-marinho bg-white">
                <Icon className="size-[18px]" />
              </span>
              <span className="min-w-0 pt-1.5">{item}</span>
            </li>
          );
        })}
      </ul>
    </HomeSection>
  );
}

// Perguntas em <details>: a pergunta no <summary> e a resposta no <p>, que o FAQPage do JSON-LD repete.
export function LocaleHomeFaq({ faq }: { faq: LocaleHomeContent['faq'] }) {
  return (
    <HomeSection id="titulo-perguntas" title={faq.title}>
      <div className="flex flex-col border-t-2 border-marinho">
        {faq.items.map((item) => (
          <details key={item.question} className="group border-b-2 border-marinho">
            <summary
              className={`flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 py-3 text-[15px] font-extrabold text-marinho md:text-base [&::-webkit-details-marker]:hidden ${FOCUS_RING}`}
            >
              {item.question}
              <ChevronDown aria-hidden="true" className="size-5 shrink-0 group-open:rotate-180 motion-safe:transition-transform" strokeWidth={2.4} />
            </summary>
            <div className="flex flex-col gap-2 pb-4">
              <p className="max-w-[70ch] text-sm leading-relaxed font-medium text-marinho-suave md:text-[15px]">{item.answer}</p>
              {item.links ? (
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                  {item.links.map((link) => (
                    <li key={link.href}>
                      <TrackedHomeLink
                        href={link.href}
                        placement="locale_home_faq"
                        linkLabel={link.label}
                        className={`flex min-h-11 items-center text-sm font-extrabold text-marinho underline underline-offset-[3px] ${FOCUS_RING}`}
                      >
                        {link.label}
                      </TrackedHomeLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </HomeSection>
  );
}

// Fecha a página: as redes em botões grandes, sem os números, que ficam no hero. O perfil é o mesmo nas
// quatro redes: o @ aparece uma vez, junto da introdução, e cada botão leva só o ícone e o nome da rede.
export function LocaleHomeFollow({ follow }: { follow: LocaleHomeContent['follow'] }) {
  const handle = follow.networks[0]?.handle;
  return (
    <HomeSection id="titulo-redes" title={follow.title} className="pb-12 md:pb-16">
      <div className="flex flex-col gap-4 rounded-[14px] border-2 border-marinho bg-laranja p-4 shadow-[0_4px_0_var(--color-marinho)] md:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col items-start gap-2.5">
          <p className="max-w-[40ch] text-[15px] leading-normal font-bold text-marinho md:text-base">{follow.intro}</p>
          {handle ? (
            <p className="rounded-full border-2 border-marinho bg-white px-3 py-1 text-[13px] font-black tracking-[0.02em] text-marinho">
              {handle}
            </p>
          ) : null}
        </div>
        <ul className="grid grid-cols-2 gap-2 md:gap-3">
          {follow.networks.map((network, index) => (
            <li key={network.name} className="revela flex" style={cardIndex(index)}>
              <TrackedHomeLink
                href={network.href}
                target="_blank"
                rel="noopener noreferrer"
                placement="locale_home_follow"
                linkLabel={network.name}
                className={`flex min-h-12 min-w-0 flex-1 items-center gap-1.5 rounded-[10px] border-2 border-marinho bg-white px-2 py-2 text-marinho motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 sm:gap-2.5 sm:px-3 ${FOCUS_RING}`}
              >
                <SocialIcon name={network.name} className="size-[18px] shrink-0 sm:size-5" />
                <span className="text-sm font-extrabold">{network.name}</span>
              </TrackedHomeLink>
            </li>
          ))}
        </ul>
      </div>
    </HomeSection>
  );
}
