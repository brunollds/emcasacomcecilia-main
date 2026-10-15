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

type CodeCopyState = ArticleCodeCopy & {
  terms: string[];
  // Só o último código copiado mostra o aviso.
  activeId: string | null;
  setActiveId: (id: string) => void;
};

const CodeCopyContext = createContext<CodeCopyState | null>(null);

// Sem código de loja no artigo (value null), o texto só destaca os códigos.
export function ArticleCodeCopyProvider({ value, children }: { value: ArticleCodeCopy | null; children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const state = useMemo(
    () =>
      value && {
        ...value,
        terms: COUPON_HIGHLIGHT_TERMS.some((term) => term.toUpperCase() === value.code.toUpperCase())
          ? COUPON_HIGHLIGHT_TERMS
          : [...COUPON_HIGHLIGHT_TERMS, value.code],
        activeId,
        setActiveId,
      },
    [value, activeId]
  );
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

function CopyableCode({ highlighted, state }: { highlighted: ReactNode; state: CodeCopyState }) {
  const id = useId();
  const { code, codeKind, brand, slug, reviewSlug, locale, activeId, setActiveId } = state;
  const labels = getCouponCopyLabels(locale);
  const copiedHint = getArticleCopy(locale).copiedHint(brand, codeKind);

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
          ? (term, highlighted) =>
              term.toUpperCase() === copy.code.toUpperCase() ? <CopyableCode highlighted={highlighted} state={copy} /> : highlighted
          : undefined
      }
    />
  );
}
