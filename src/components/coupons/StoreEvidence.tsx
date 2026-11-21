import Link from 'next/link';
import ReviewInlineImage from '@/components/ReviewInlineImage';
import type { CartPrint } from '@/lib/couponsData';
import type { Locale } from '@/lib/i18n/locales';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { BODY_TEXT, FOCUS_RING, SectionHeading } from './CouponBlocks';

// A tabela "O que acumula" e o print do código aplicado, usados pela página de cada loja e pela da YesStyle.

export const INLINE_LINK = `font-bold underline underline-offset-2 ${FOCUS_RING}`;

export const STACKING_SECTION_ID = 'o-que-acumula';

export type StackingTableRow = { key: string; label: string; answer: string; condition: string };

export function StackingTable({
  title,
  caption,
  headers,
  rows,
}: {
  title: string;
  caption: string;
  headers: { benefit: string; stacks: string; condition: string };
  rows: StackingTableRow[];
}) {
  return (
    <section aria-labelledby={STACKING_SECTION_ID}>
      <SectionHeading id={STACKING_SECTION_ID}>{title}</SectionHeading>
      {/* Abaixo do md, três colunas não cabem: cada linha vira benefício e resposta lado a lado, com a
          condição embaixo na largura toda. Os roles seguram a tabela para o leitor de tela, porque o
          display: grid na linha tira a semântica em alguns navegadores. */}
      <div className="mt-4 overflow-hidden rounded-xl border-2 border-marinho">
        <table role="table" className="block w-full border-collapse text-start md:table">
          <caption className="sr-only">{caption}</caption>
          <thead role="rowgroup" className="bg-amarelo-cupom max-md:sr-only">
            <tr role="row" className="border-b-2 border-marinho">
              {[headers.benefit, headers.stacks, headers.condition].map((header) => (
                <th key={header} role="columnheader" scope="col" className="px-3 py-2.5 text-[13px] font-extrabold leading-[18px]">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody role="rowgroup" className="block md:table-row-group">
            {rows.map((row, index) => (
              <tr
                key={row.key}
                role="row"
                className={`grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 px-3 py-3 md:table-row md:p-0 ${index > 0 ? 'border-t-2 border-marinho/15' : ''}`}
              >
                <th role="rowheader" scope="row" className="min-w-0 align-top text-[15px] font-extrabold leading-[22px] md:px-3 md:py-3">
                  {row.label}
                </th>
                <td role="cell" className="align-top text-[15px] font-bold leading-[22px] md:px-3 md:py-3">
                  {row.answer}
                </td>
                <td
                  role="cell"
                  className="col-span-2 min-w-0 align-top text-[15px] font-medium leading-[22px] text-marinho-suave md:min-w-[11rem] md:px-3 md:py-3"
                >
                  {row.condition}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// O print do código aplicado, no fim de "Como usar". É exemplo: a legenda não diz a data nem promete os valores.
export function CartPrintFigure({
  locale,
  brand,
  print,
  caption,
  stepsLabel,
}: {
  locale: Locale;
  brand: string;
  print: CartPrint;
  caption: string;
  stepsLabel: string;
}) {
  return (
    <div data-cart-print className="mt-5">
      {/* Print alto (resumo de pedido no celular) não ocupa a tela toda: a largura cai até a altura caber em ~420px. */}
      <div className="mx-auto" style={{ maxWidth: Math.max(200, Math.round(420 * print.aspectRatio)) }}>
        <ReviewInlineImage
          locale={locale}
          reviewTitle={brand}
          // O componente é JS e o tipo inferido exige as três; aqui não há loja de artigo.
          store={undefined}
          stores={undefined}
          reviewSlug={undefined}
          section={{
            // O componente é de cliente e não resolve o caminho: o endereço de entrega (CDN) sai daqui, como nos artigos.
            image: { src: resolveMediaUrl(print.src), alt: print.alt, aspectRatio: print.aspectRatio, objectFit: 'contain' },
          }}
        />
      </div>
      <p className={`mt-3 ${BODY_TEXT}`}>
        {caption}
        {print.article && (
          <>
            {' '}
            <Link href={`${locale === 'pt' ? '' : `/${locale}`}/reviews/${print.article}`} className={INLINE_LINK}>
              {stepsLabel}
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
