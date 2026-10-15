import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { SHELF_CONTAINER, SHELF_TITLE, filterChipClass } from '@/components/reviews/shelfClasses';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { PageHeader } from '@/components/ui/PageHeader';
import { PRIMARY_PAGE_BUTTON, SECONDARY_PAGE_BUTTON } from '@/components/ui/pageButton';
import { brandLinks } from '@/lib/brandLinks';
import { FAQ_TRAIL, getFaqPageJsonLd, type FaqCategory, type FaqLink } from '@/lib/faqPage';
import { serializeJsonLd } from '@/lib/jsonLd';

// O /faqs: os atalhos das categorias e todas as categorias abertas na página, cada pergunta num
// <details> nativo, sem JavaScript. Não importa next/font (o test:institutional desenha a página em tsx):
// a rota passa a fonte condensada pelo className.

const TEXT_LINK = `font-extrabold text-marinho underline underline-offset-[3px] ${FOCUS_RING}`;

function AnswerLink({ link }: { link: FaqLink }) {
  const className = `inline-flex min-h-11 items-center gap-2 self-start text-[15px] ${TEXT_LINK}`;
  const content = (
    <>
      {link.label}
      <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
    </>
  );
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {content}
    </Link>
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

export function FaqView({ categories, className = '' }: { categories: readonly FaqCategory[]; className?: string }) {
  return (
    <main className={`${className} min-h-screen bg-white text-marinho`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(getFaqPageJsonLd(categories)) }} />
      <PageHeader
        trail={FAQ_TRAIL}
        title="Perguntas frequentes"
        intro="O que mais perguntam sobre o site, os códigos das lojas e as parcerias. Não achou? Escreva para a gente."
      >
        <nav aria-label="Categorias das perguntas">
          <ul className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className={`inline-flex items-center ${filterChipClass(false)}`}
                >
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
            Ainda com dúvida?
          </h2>
          <p className="text-[15px] leading-6 font-medium text-marinho-suave">
            Mande sua pergunta pelo formulário ou pelo direct do Instagram.
          </p>
          <Link href="/contato" className={`${PRIMARY_PAGE_BUTTON} self-start`}>
            Entrar em contato
            <ArrowRight aria-hidden="true" className="size-[18px]" strokeWidth={2.4} />
          </Link>
        </aside>
      </div>

      <section aria-labelledby="titulo-novidades" className={`${SHELF_CONTAINER} pb-16 md:pb-24`}>
        <div className="flex flex-col gap-5 rounded-[14px] border-2 border-marinho bg-creme p-5 md:flex-row md:items-center md:justify-between md:gap-10 md:p-8">
          <div className="flex flex-col gap-2">
            <h2 id="titulo-novidades" className="text-2xl font-extrabold">
              Acompanhe as novidades
            </h2>
            <p className="text-base leading-relaxed font-medium text-marinho-suave md:text-lg">
              Os vídeos novos saem primeiro no YouTube e no Instagram.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a href={brandLinks.youtube} target="_blank" rel="noopener noreferrer" className={PRIMARY_PAGE_BUTTON}>
              Ver vídeos
              <ArrowRight aria-hidden="true" className="size-[18px]" strokeWidth={2.4} />
            </a>
            <a href={brandLinks.contactMailto} className={SECONDARY_PAGE_BUTTON}>
              Pedir o mídia kit
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
