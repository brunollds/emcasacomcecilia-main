import type { ReactNode } from 'react';
import { SHELF_CONTAINER } from '@/components/reviews/shelfClasses';
import { PageTrail } from '@/components/ui/PageTrail';
import { serializeJsonLd } from '@/lib/jsonLd';
import { getBreadcrumbListJsonLd, type PageLink } from '@/lib/pageSeo';

// O topo das páginas do site fora da home (a /sobre e as outras institucionais): a trilha, o título condensado com o marca-texto, a introdução e a fila de botões, no contêiner de 1200 px,
// como em /videos. A trilha visível e o BreadcrumbList do JSON-LD saem da mesma lista. O aside (o cartão
// de foto da /sobre) fica ao lado do título no celular e numa coluna à direita no desktop; as larguras são
// as do painel da Cecília na home, que o sizes do CeciliaPhotoCard supõe.
type PageHeaderProps = {
  trail: readonly PageLink[];
  title: string;
  // Sem introdução (o /buscar com um termo), a fila de botões sobe para logo depois do título.
  intro?: ReactNode;
  aside?: ReactNode;
  // Os botões, embaixo da introdução.
  children?: ReactNode;
};

export function PageHeader({ trail, title, intro, aside, children }: PageHeaderProps) {
  return (
    <header className={`${SHELF_CONTAINER} pt-8 pb-6 md:pt-12 md:pb-10`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(getBreadcrumbListJsonLd(trail)) }} />
      <PageTrail trail={trail} />
      <div
        className={
          aside
            ? 'grid grid-cols-[minmax(0,1fr)_118px] items-center gap-x-4 gap-y-5 md:grid-cols-[minmax(0,1fr)_180px] md:gap-x-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-x-16 lg:gap-y-6'
            : 'flex flex-col gap-4'
        }
      >
        {/* O lg:self-end só no grid: na coluna flex da página sem aside, ele empurraria o título para a direita. */}
        <div className={`flex flex-col items-start gap-4 ${aside ? 'lg:col-start-1 lg:row-start-1 lg:self-end' : ''}`}>
          <h1 className="font-condensada text-[44px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-7xl">
            <span className="marca-texto marca-texto-entra">{title}</span>
          </h1>
        </div>
        {aside ? <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center lg:p-2">{aside}</div> : null}
        <div className={`flex flex-col gap-6 ${aside ? 'col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-2 lg:self-start' : ''}`}>
          {intro ? (
            <div className="flex max-w-2xl flex-col gap-3 text-base leading-relaxed font-medium text-marinho-suave md:text-lg">
              {typeof intro === 'string' ? <p>{intro}</p> : intro}
            </div>
          ) : null}
          {children ? <div className="flex flex-wrap items-center gap-3">{children}</div> : null}
        </div>
      </div>
    </header>
  );
}
