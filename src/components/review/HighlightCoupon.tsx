'use client';

import { createContext, useContext, useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';
import { AnimatedTextHighlight } from '@/components/editorial';
import { CopyCodeButton } from '@/components/coupons/CouponActions';
import { FOCUS_RING } from '@/components/ui/focusRing';
import type { CouponCodeKind } from '@/lib/couponsData';
import { getArticleCopy } from './articleCopy';
import { getCouponCopyLabels, type CouponCopyLocale } from './couponCopyLocale';

// Faixas da Magalu: 10EMCASACOMCECILIA … 100EMCASACOMCECILIA.
const MAGALU_TIER_CODES = Array.from({ length: 10 }, (_, i) => `${(i + 1) * 10}EMCASACOMCECILIA`);

/** Códigos de cupom destacados no texto dos artigos. */
const COUPON_HIGHLIGHT_TERMS = [
  ...MAGALU_TIER_CODES,
  'EMCASACOMCECILIA',
  'CECILIA010',
  'CECILIA12',
  'CECIEMCASA',
  'CECI',
];

// O código da loja do artigo, que no texto do corpo copia ao toque. Vem pronto do template (servidor).
export type ArticleCodeCopy = {
  code: string;
  codeKind?: CouponCodeKind;
  brand: string;
  slug: string;
  reviewSlug: string;
  locale: CouponCopyLocale;
};

type CodeCopyState = {
  // Os códigos que copiam ao toque, pela forma em maiúsculas.
  copyable: Map<string, ArticleCodeCopy>;
  terms: string[];
  // Só o último código copiado mostra o aviso.
  activeId: string | null;
  setActiveId: (id: string) => void;
};

type CopyableState = ArticleCodeCopy & Pick<CodeCopyState, 'activeId' | 'setActiveId'>;

const CodeCopyContext = createContext<CodeCopyState | null>(null);

// Sem código de loja no artigo (value null), o texto só destaca os códigos. O artigo de várias lojas passa a lista:
// cada código copia com a marca da loja dele, e o código que duas lojas do artigo dividem (o CECILIA10 é de três)
// fica só destacado, porque o texto não diz de qual loja é.
export function ArticleCodeCopyProvider({
  value,
  children,
}: {
  value: ArticleCodeCopy | readonly ArticleCodeCopy[] | null;
  children: ReactNode;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const state = useMemo(() => {
    const list = value ? ([] as ArticleCodeCopy[]).concat(value) : [];
    if (list.length === 0) return null;
    const count = new Map<string, number>();
    for (const item of list) count.set(item.code.toUpperCase(), (count.get(item.code.toUpperCase()) ?? 0) + 1);
    const copyable = new Map(list.filter((item) => count.get(item.code.toUpperCase()) === 1).map((item) => [item.code.toUpperCase(), item]));
    const known = new Set(COUPON_HIGHLIGHT_TERMS.map((term) => term.toUpperCase()));
    const extra = list.map(({ code }) => code).filter((code, index, all) => !known.has(code.toUpperCase()) && all.indexOf(code) === index);
    return {
      copyable,
      terms: [...COUPON_HIGHLIGHT_TERMS, ...extra],
      activeId,
      setActiveId,
    };
  }, [value, activeId]);
  return <CodeCopyContext.Provider value={state}>{children}</CodeCopyContext.Provider>;
}

const VIEWPORT_GUTTER = 12;

// O aviso depois de copiar, logo abaixo do código e alinhado a ele; volta para dentro da tela quando o código está na borda.
function CopiedBubble({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const bubble = ref.current;
    if (!bubble) return;
    const { left, right } = bubble.getBoundingClientRect();
    const limit = document.documentElement.clientWidth - VIEWPORT_GUTTER;
    const shift = left < VIEWPORT_GUTTER ? VIEWPORT_GUTTER - left : right > limit ? limit - right : 0;
    bubble.style.marginLeft = `${shift}px`;
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="absolute top-full left-0 z-20 mt-2 flex w-max max-w-[min(18rem,calc(100vw-2rem))] items-start gap-1.5 rounded-lg border-2 border-marinho bg-white px-3 py-2 text-left font-sans text-[13px] leading-[18px] font-bold whitespace-normal text-verde-escuro shadow-medium"
    >
      <Check className="mt-px h-4 w-4 shrink-0" />
      {text}
    </span>
  );
}

function CopyableCode({ highlighted, state }: { highlighted: ReactNode; state: CopyableState }) {
  const id = useId();
  const { code, codeKind, brand, slug, reviewSlug, locale, activeId, setActiveId } = state;
  const labels = getCouponCopyLabels(locale);
  const copiedHint = getArticleCopy(locale).copiedHint({ slug, brand }, codeKind);

  return (
    <span data-copy-code={code}>
      <CopyCodeButton
        code={code}
        brand={slug}
        contentSlug={reviewSlug}
        placement="review_inline"
        ariaLabel={labels.copyCoupon(code)}
        copiedStatus={copiedHint}
        onCopied={() => setActiveId(id)}
        className={`relative cursor-pointer rounded-sm whitespace-nowrap text-marinho ${FOCUS_RING}`}
        copiedChildren={
          <>
            {highlighted}
            <Check aria-hidden="true" className="ml-1 inline h-[0.9em] w-[0.9em] align-[-0.1em] text-verde-escuro" />
            {activeId === id && <CopiedBubble text={copiedHint} />}
          </>
        }
      >
        {highlighted}
        <Copy aria-hidden="true" className="ml-1 inline h-[0.9em] w-[0.9em] align-[-0.1em]" />
      </CopyCodeButton>
    </span>
  );
}

export interface HighlightCouponProps {
  text: string;
  // Dentro de um <summary> (pergunta do FAQ) o código só fica destacado: um botão ali brigaria com abrir e fechar.
  copyable?: boolean;
}

// Fora do ArticleCodeCopyProvider (sem código de loja no artigo, ou fora dos artigos) só destaca.
export function HighlightCoupon({ text, copyable = true }: HighlightCouponProps): React.ReactElement {
  const state = useContext(CodeCopyContext);
  const copy = copyable ? state : null;

  return (
    <AnimatedTextHighlight
      text={text}
      terms={state?.terms ?? COUPON_HIGHLIGHT_TERMS}
      variant="d2"
      renderTerm={
        copy
          ? (term, highlighted) => {
              const item = copy.copyable.get(term.toUpperCase());
              return item ? (
                <CopyableCode highlighted={highlighted} state={{ ...item, activeId: copy.activeId, setActiveId: copy.setActiveId }} />
              ) : (
                highlighted
              );
            }
          : undefined
      }
    />
  );
}
