import type { CSSProperties, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { LatestCard } from '@/components/sections/HomeLatest';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import { cardDecorAt } from '@/components/ui/cardDecor';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { NotFoundContent } from '@/lib/notFoundPage';

// O 404: a etiqueta, o título com o marca-texto, a busca, os caminhos, os artigos mais novos e, no fim,
// os outros idiomas, cada linha com o próprio lang. O test:not-found desenha a página fora do Next: a
// fonte condensada (couponFontVariables, de next/font) e a busca (OmniSearch, em .js) vêm da rota.

const LATEST_IMAGE_SIZES = '(min-width: 768px) 360px, 90vw';
const SECTION = 'mx-auto w-full max-w-[1200px] px-4 md:px-10';
const SECTION_TITLE = 'font-condensada text-[32px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-5xl';

type NotFoundViewProps = { content: NotFoundContent; search: ReactNode; className?: string };

export function NotFoundView({ content, search, className = '' }: NotFoundViewProps) {
  return (
    <main className={`${className} min-h-screen bg-white pb-16 text-marinho`} data-not-found="">
      <title>{`${content.metaTitle} - Em Casa com Cecília`}</title>
      <section aria-labelledby="titulo-404" className={`${SECTION} flex flex-col gap-6 pt-10 md:pt-16`}>
        <span
          aria-hidden="true"
          className="self-start -rotate-3 rounded-md border-2 border-marinho bg-amarelo-cupom px-3 py-0.5 font-condensada text-3xl font-black text-marinho font-stretch-extra-condensed shadow-[3px_3px_0_var(--color-marinho)]"
        >
          404
        </span>
        <h1
          id="titulo-404"
          className="font-condensada text-[40px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-6xl"
        >
          <span className="marca-texto marca-texto-entra">{content.title}</span>
        </h1>
        <p className="max-w-[60ch] text-base leading-7 font-medium text-marinho-suave">{content.intro}</p>

        <div className="w-full max-w-xl">{search}</div>

        <nav aria-label={content.pathsLabel}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {content.paths.map((path) => (
              <li key={path.href} className="flex">
                <TrackedHomeLink
                  href={path.href}
                  placement="not_found"
                  linkLabel={path.label}
                  className={`flex flex-1 items-center justify-between gap-3 rounded-[10px] border-2 border-marinho bg-white px-4 py-3.5 hover:bg-creme motion-safe:transition-colors ${FOCUS_RING}`}
                >
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-base font-extrabold">{path.label}</span>
                    <span className="text-[13px] leading-5 font-semibold text-marinho-suave">{path.description}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                </TrackedHomeLink>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {content.articles.length > 0 ? (
        <section aria-labelledby="titulo-404-artigos" className={`${SECTION} mt-12 md:mt-16`}>
          <h2 id="titulo-404-artigos" className={SECTION_TITLE}>
            <span className="marca-texto">{content.latestTitle}</span>
          </h2>
          <ul className="mt-6 grid gap-[18px] md:grid-cols-3">
            {content.articles.map((article, index) => (
              <li key={article.slug} className="flex" style={{ '--i': index } as CSSProperties}>
                <LatestCard
                  article={article}
                  decor={cardDecorAt(index)}
                  placement="not_found"
                  meta={`${article.dateLabel}, ${article.type}`}
                  imageSizes={LATEST_IMAGE_SIZES}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="titulo-404-idiomas" className={`${SECTION} mt-12 md:mt-16`}>
        <h2 id="titulo-404-idiomas" className="text-lg font-extrabold">
          {content.otherLanguagesTitle}
        </h2>
        <ul className="mt-4 grid border-t-2 border-marinho sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
          {content.languages.map((language) => (
            <li
              key={language.locale}
              lang={language.htmlLang}
              className="flex flex-col gap-1 border-b-[1.5px] border-marinho/15 py-3"
            >
              <span className="text-xs font-bold text-marinho-suave">{language.name}</span>
              <span className="text-[15px] leading-5 font-extrabold">{language.title}</span>
              <span className="flex flex-wrap gap-x-4">
                {language.links.map((link) => (
                  <TrackedHomeLink
                    key={link.href}
                    href={link.href}
                    placement="not_found"
                    linkLabel={link.label}
                    className={`flex min-h-11 items-center text-sm font-bold underline underline-offset-[3px] ${FOCUS_RING}`}
                  >
                    {link.label}
                  </TrackedHomeLink>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
