import Link from 'next/link';
import { SHELF_CONTAINER } from '@/components/reviews/shelfClasses';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { PageHeader } from '@/components/ui/PageHeader';
import {
  PRIVACY_INTRO,
  PRIVACY_LAST_UPDATED,
  PRIVACY_TITLE,
  PRIVACY_TRAIL,
  type PrivacyItem,
  type PrivacySection,
  type PrivacyText,
} from '@/lib/privacyPage';

// A /privacidade: o sumário das seções e o texto da política, em linhas de até ~70 caracteres. Sem
// JavaScript. Não importa next/font (o test:institutional desenha a página em tsx): a rota passa a fonte
// condensada pelo className.

const TEXT_LINK = `font-bold text-marinho underline underline-offset-[3px] break-words ${FOCUS_RING}`;

function Text({ text }: { text: readonly PrivacyText[] }) {
  return text.map((piece, index) => {
    if (typeof piece === 'string') return piece;
    if ('code' in piece) {
      return (
        <code key={index} className="rounded bg-creme px-1 py-0.5 font-mono text-[0.9em] text-marinho">
          {piece.code}
        </code>
      );
    }
    return piece.href.startsWith('https://') ? (
      <a key={index} href={piece.href} target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>
        {piece.label}
      </a>
    ) : (
      <a key={index} href={piece.href} className={TEXT_LINK}>
        {piece.label}
      </a>
    );
  });
}

function Item({ item }: { item: PrivacyItem }) {
  return (
    <li className="pl-1 marker:text-marinho">
      {item.lead ? <strong className="font-extrabold text-marinho">{item.lead}</strong> : null}
      {item.lead ? ' ' : null}
      <Text text={item.text} />
    </li>
  );
}

function Section({ section }: { section: PrivacySection }) {
  const titleId = `titulo-${section.id}`;
  return (
    <section id={section.id} aria-labelledby={titleId} className="flex scroll-mt-28 flex-col gap-3 border-t-2 border-marinho pt-6">
      <h2 id={titleId} className="text-xl leading-tight font-extrabold text-marinho md:text-2xl">
        {section.title}
      </h2>
      {section.blocks.map((block, index) =>
        block.type === 'p' ? (
          <p key={index}>
            <Text text={block.text} />
          </p>
        ) : (
          <ul key={index} className="flex list-disc flex-col gap-2 pl-5">
            {block.items.map((item, itemIndex) => (
              <Item key={itemIndex} item={item} />
            ))}
          </ul>
        )
      )}
    </section>
  );
}

export function PrivacyView({ sections, className = '' }: { sections: readonly PrivacySection[]; className?: string }) {
  return (
    <main className={`${className} min-h-screen bg-white text-marinho`}>
      <PageHeader trail={PRIVACY_TRAIL} title={PRIVACY_TITLE} intro={PRIVACY_INTRO} />

      <div className={`${SHELF_CONTAINER} grid items-start gap-10 pb-16 md:pb-24 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16`}>
        <nav
          aria-labelledby="titulo-sumario"
          className="rounded-[14px] border-2 border-marinho bg-white p-5 lg:sticky lg:top-28"
        >
          <h2 id="titulo-sumario" className="text-lg font-extrabold">
            Nesta página
          </h2>
          <ol className="mt-2 flex flex-col">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`flex min-h-11 items-center py-1 text-[15px] leading-5 font-bold text-marinho-suave hover:text-marinho hover:underline hover:underline-offset-[3px] ${FOCUS_RING}`}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="flex max-w-[70ch] flex-col gap-10 text-base leading-7 font-medium text-marinho-suave md:text-[17px] md:leading-8">
          {sections.map((section) => (
            <Section key={section.id} section={section} />
          ))}

          <footer className="flex flex-col gap-1 border-t-2 border-marinho pt-6 text-[15px] leading-6">
            <p>{PRIVACY_LAST_UPDATED}</p>
            <p>
              Dúvidas?{' '}
              <Link href="/contato" className={TEXT_LINK}>
                Entre em contato
              </Link>
              .
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}
