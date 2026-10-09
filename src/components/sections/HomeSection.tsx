import type { ReactNode } from 'react';
import { RevealSection } from '@/components/ui/RevealSection';

// Seção de baixo da home: o título condensado com o marca-texto e o conteúdo no contêiner de 1200 px,
// revelados na rolagem (RevealSection). O espaço de baixo vem do className; a última antes do rodapé
// tem mais.
type HomeSectionProps = {
  // O id do h2, que nomeia a seção pelo aria-labelledby.
  id: string;
  title: string;
  // Ao lado do título, como as setas das ofertas.
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function HomeSection({ id, title, actions, className = 'pb-8 md:pb-10', children }: HomeSectionProps) {
  const heading = (
    <h2
      id={id}
      className="font-condensada text-[32px] leading-none font-black text-marinho font-stretch-extra-condensed md:text-5xl"
    >
      <span className="marca-texto">{title}</span>
    </h2>
  );

  return (
    <RevealSection aria-labelledby={id} className={className}>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-4 md:gap-6 md:px-10">
        {actions ? (
          <div className="flex items-end justify-between gap-4">
            {heading}
            {actions}
          </div>
        ) : (
          heading
        )}
        {children}
      </div>
    </RevealSection>
  );
}
