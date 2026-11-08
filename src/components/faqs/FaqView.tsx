import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { SHELF_CONTAINER, SHELF_TITLE, filterChipClass } from '@/components/reviews/shelfClasses';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { PageHeader } from '@/components/ui/PageHeader';
import { PRIMARY_PAGE_BUTTON, SECONDARY_PAGE_BUTTON } from '@/components/ui/pageButton';
import { FAQ_VIEW_TEXT_PT, getFaqPageJsonLd, type FaqCategory, type FaqLink, type FaqViewText } from '@/lib/faqPage';
import { serializeJsonLd } from '@/lib/jsonLd';

// O /faqs e o /<locale>/faq: os atalhos das categorias e todas as categorias abertas na página, cada pergunta
// num <details> nativo, sem JavaScript. Os textos fora das perguntas vêm por `text` (o padrão é o português).
// Não importa next/font (o test:institutional desenha a página em tsx): a rota passa a fonte condensada pelo
// className.

const TEXT_LINK = `font-extrabold text-marinho underline underline-offset-[3px] ${FOCUS_RING}`;

// Link interno vira next/link; mailto e link externo viram <a>, e só o externo abre em nova aba.
function FaqAnchor({ link, className, children }: { link: FaqLink; className: string; children: ReactNode }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  if (link.href.startsWith('mailto:')) {
    return (
      <a href={link.href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {children}
    </Link>
  );
}

function AnswerLink({ link }: { link: FaqLink }) {
  return (
    <FaqAnchor link={link} className={`inline-flex min-h-11 items-center gap-2 self-start text-[15px] ${TEXT_LINK}`}>
      {link.label}
      <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
    </FaqAnchor>
  );
}

function FaqSection({ category }: { category: FaqCategory }) {
  const titleId = `titulo-${category.id}`;
  return (
    <section id={category.id} aria-labelledby={titleId} className="flex scroll-mt-28 flex-col gap-4">
      <h2 id={titleId} className={SHELF_TITLE}>
        <span className="marca-texto">{category.categoria}</span>
      </h2>
      <div className="border-t-2 border-marinho">
        {category.perguntas.map((item) => (
          <details key={item.pergunta} className="group border-b-2 border-marinho">
            <summary
              className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 py-3 text-base leading-6 font-extrabold text-marinho md:text-lg [&::-webkit-details-marker]:hidden ${FOCUS_RING}`}
            >
              <span>{item.pergunta}</span>
              <ChevronDown
                aria-hidden="true"
                className="size-[22px] shrink-0 group-open:rotate-180 motion-safe:transition-transform"
              />
            </summary>
            <div className="flex max-w-[68ch] flex-col gap-1 pb-4">
              <p className="text-[15px] leading-6 font-medium text-marinho-suave md:text-base md:leading-7">{item.resposta}</p>
              {item.link ? <AnswerLink link={item.link} /> : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function FaqView({
  categories,
  className = '',
  text = FAQ_VIEW_TEXT_PT,
  jsonLdPath = '/faqs',
}: {
  categories: readonly FaqCategory[];
  className?: string;
  text?: FaqViewText;
  jsonLdPath?: string;
}) {
  return (
    <main className={`${className} min-h-screen bg-white text-marinho`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(getFaqPageJsonLd(categories, jsonLdPath)) }}
      />
      <PageHeader trail={text.trail} trailAriaLabel={text.trailAriaLabel} title={text.title} intro={text.intro}>
        <nav aria-label={text.categoriesLabel}>
          <ul className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <li key={category.id}>
                <a href={`#${category.id}`} className={`inline-flex items-center ${filterChipClass(false)}`}>
                  {category.categoria}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <div className={`${SHELF_CONTAINER} grid items-start gap-10 pb-12 md:pb-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16`}>
        <div className="flex flex-col gap-12 md:gap-16">
          {categories.map((category) => (
            <FaqSection key={category.id} category={category} />
          ))}
        </div>

        <aside
          aria-labelledby="titulo-ainda-com-duvida"
          className="flex flex-col gap-3 rounded-[14px] border-2 border-marinho bg-white p-5 shadow-[4px_4px_0_var(--color-marinho)] md:p-6 lg:sticky lg:top-28"
        >
          <h2 id="titulo-ainda-com-duvida" className="text-xl font-extrabold text-marinho">
            {text.askTitle}
          </h2>
          <p className="text-[15px] leading-6 font-medium text-marinho-suave">{text.askText}</p>
          <FaqAnchor link={text.askLink} className={`${PRIMARY_PAGE_BUTTON} self-start`}>
            {text.askLink.label}
            <ArrowRight aria-hidden="true" className="size-[18px]" strokeWidth={2.4} />
          </FaqAnchor>
        </aside>
      </div>

      <section aria-labelledby="titulo-novidades" className={`${SHELF_CONTAINER} pb-16 md:pb-24`}>
        <div className="flex flex-col gap-5 rounded-[14px] border-2 border-marinho bg-creme p-5 md:flex-row md:items-center md:justify-between md:gap-10 md:p-8">
          <div className="flex flex-col gap-2">
            <h2 id="titulo-novidades" className="text-2xl font-extrabold">
              {text.newsTitle}
            </h2>
            <p className="text-base leading-relaxed font-medium text-marinho-suave md:text-lg">{text.newsText}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <FaqAnchor link={text.newsLink} className={PRIMARY_PAGE_BUTTON}>
              {text.newsLink.label}
              <ArrowRight aria-hidden="true" className="size-[18px]" strokeWidth={2.4} />
            </FaqAnchor>
            <FaqAnchor link={text.newsSecondary} className={SECONDARY_PAGE_BUTTON}>
              {text.newsSecondary.label}
            </FaqAnchor>
          </div>
        </div>
      </section>
    </main>
  );
}
