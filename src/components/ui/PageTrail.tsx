import Link from 'next/link';
import { getArticleCopy } from '@/components/review/articleCopy';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { PageLink } from '@/lib/pageSeo';

// A trilha visível das páginas de lista e de vídeo (subpáginas de loja, /videos e a página de cada vídeo): a
// mesma lista do BreadcrumbList do JSON-LD, com o rótulo da trilha dos artigos em português. O último item é
// a própria página, sem link (aria-current). A lista quebra linha: o título longo de um vídeo não estoura a
// tela.
export function PageTrail({ trail }: { trail: readonly PageLink[] }) {
  return (
    <nav aria-label={getArticleCopy('pt').breadcrumbLabel} className="mb-5">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-bold text-marinho-suave">
        {trail.map((item, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-marinho">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className={`underline underline-offset-[3px] hover:text-marinho ${FOCUS_RING}`}>
                  {item.name}
                </Link>
              )}
              {last ? null : <span aria-hidden="true">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
