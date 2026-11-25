'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { ExternalLink, Scissors, X } from 'lucide-react';
import { CopyAndOpenStoreLink } from '@/components/coupons/CouponActions';
import { CouponStoreLink } from '@/components/CouponComponents';
import { FOCUS_RING, FOCUS_RING_ON_DARK } from '@/components/ui/focusRing';
import { trackEvent } from '@/lib/analytics';
import { DICA_COPY } from '@/lib/dica/dicaCopy';
import type { DicaAnswer, DicaCard } from '@/lib/dica/dicaTypes';

const MAX_LENGTH = 200;
const SHORTCUTS = ['Tem whey?', 'Tem sofá?', 'Skincare coreano?'];
const ERROR_MESSAGE = 'Não consegui responder agora. Tente de novo daqui a pouco.';

type Turn = { id: number; question: string; answer?: DicaAnswer; error?: string };

const ACTION = 'flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-center text-sm';

// As cores da caixa: a do site e a do festival do /blackfriday, com as cores do .bf-root (festival-stage.css). No festival
// o cartão com código não leva o .recorte: o verde-claro do copiado deixaria o texto claro ilegível no fundo escuro.
const THEMES = {
  default: {
    dialog: 'border-marinho bg-creme text-marinho backdrop:bg-marinho/45 sm:shadow-[6px_6px_0_var(--color-marinho)]',
    header: 'bg-marinho text-white',
    badge: 'border-marinho bg-amarelo-cupom text-marinho',
    title: 'font-extrabold',
    subtitle: 'text-white/80',
    chip: `border-2 border-marinho bg-white font-bold hover:bg-amarelo-cupom ${FOCUS_RING}`,
    muted: 'text-marinho-suave',
    bubble: 'bg-marinho text-white',
    card: 'border-2 border-marinho bg-white text-marinho',
    codeCard: 'recorte border-2 border-dashed border-marinho bg-white text-marinho',
    scissors: 'recorte-tesoura bg-amarelo-cupom text-marinho',
    code: 'font-codigo',
    warning: 'border border-marinho/30 bg-amarelo-cupom/35',
    pageLink: `text-marinho-suave hover:text-marinho ${FOCUS_RING}`,
    store: `${ACTION} border-2 border-marinho bg-laranja font-extrabold text-marinho ${FOCUS_RING}`,
    copied: 'data-[copied=true]:border-verde-escuro data-[copied=true]:bg-verde-claro data-[copied=true]:text-verde-escuro',
    dicasBox: 'border-2 border-marinho bg-white',
    dicas: `${ACTION} border-2 border-marinho bg-amarelo-cupom font-extrabold text-marinho ${FOCUS_RING}`,
    form: 'border-t-2 border-marinho/15 bg-white',
    input: `border-2 border-marinho bg-white placeholder:text-marinho-suave/70 ${FOCUS_RING}`,
    send: `border-2 border-marinho bg-laranja font-extrabold text-marinho ${FOCUS_RING}`,
    focus: FOCUS_RING,
  },
  festival: {
    dialog: 'border-[#d9ff43] bg-[#090614] text-[#f7f5ff] backdrop:bg-black/70 sm:shadow-[6px_6px_0_#ff2e93]',
    header: 'border-b border-[#e6dcff]/15 bg-[#140d29] text-[#f7f5ff]',
    badge: 'border-[#d9ff43] bg-[#d9ff43] text-[#0d081c]',
    title: 'font-black tracking-tight text-[#d9ff43] [font-family:var(--font-archivo),sans-serif]',
    subtitle: 'text-[#bfb4dc]',
    chip: `border-2 border-[#d9ff43]/60 bg-transparent font-bold text-[#f7f5ff] hover:bg-[#d9ff43] hover:text-[#0d081c] ${FOCUS_RING_ON_DARK}`,
    muted: 'text-[#bfb4dc]',
    // Texto escuro no rosa: o branco dá 3,5:1, abaixo dos 4,5:1 do texto pequeno; o #0d081c dá 5,7:1.
    bubble: 'bg-[#ff2e93] text-[#0d081c]',
    card: 'border-2 border-[#e6dcff]/30 bg-[#1b1236] text-[#f7f5ff]',
    codeCard:
      'border-2 border-dashed border-[#d9ff43] bg-[#1b1236] text-[#f7f5ff] has-[[data-copied=true]]:border-solid has-[[data-copied=true]]:border-[#2ef2a0]',
    scissors: 'bg-[#d9ff43] text-[#0d081c]',
    code: 'text-[#d9ff43] [font-family:var(--font-jetbrains-mono),monospace]',
    warning: 'border border-[#ff2e93]/50 bg-[#ff2e93]/15',
    pageLink: `text-[#bfb4dc] hover:text-[#f7f5ff] ${FOCUS_RING_ON_DARK}`,
    store: `${ACTION} bg-[#ff2e93] font-black text-[#0d081c] ${FOCUS_RING_ON_DARK}`,
    copied: 'data-[copied=true]:bg-[#2ef2a0] data-[copied=true]:text-[#042215]',
    dicasBox: 'border-2 border-[#e6dcff]/30 bg-[#1b1236]',
    dicas: `${ACTION} bg-[#d9ff43] font-black text-[#0d081c] ${FOCUS_RING_ON_DARK}`,
    form: 'border-t border-[#e6dcff]/15 bg-[#140d29]',
    input: `border-2 border-[#e6dcff]/30 bg-[#090614] text-[#f7f5ff] placeholder:text-[#bfb4dc]/70 ${FOCUS_RING_ON_DARK}`,
    send: `bg-[#ff2e93] font-black text-[#0d081c] ${FOCUS_RING_ON_DARK}`,
    focus: FOCUS_RING_ON_DARK,
  },
} as const;

export type DicaVariant = keyof typeof THEMES;
type Theme = (typeof THEMES)[DicaVariant];

function pasteHint(card: DicaCard): string {
  return card.codeLabel === DICA_COPY.codeLabels.reward
    ? 'Cole no campo Reward Code, no carrinho da loja.'
    : 'Cole no campo de cupom, no carrinho da loja.';
}

function CardDetails({ card, theme }: { card: DicaCard; theme: Theme }) {
  return (
    <>
      <p className="text-[15px] leading-5 font-extrabold">{card.brand}</p>
      <p className={`mt-0.5 text-xs leading-4 font-bold ${theme.muted}`}>
        {card.codeLabel}
        {card.discount ? ` · ${card.discount}` : ''}
      </p>
      {card.matched.length > 0 && (
        <p className={`mt-1 text-xs leading-4 font-medium ${theme.muted}`}>Para: {card.matched.slice(0, 4).join(', ')}</p>
      )}
      {card.note && <p className="mt-1.5 text-[13px] leading-[18px] font-semibold">{card.note}</p>}
      {card.warnings.map((warning) => (
        <p key={warning} className={`mt-2 rounded-lg p-2 text-xs font-semibold ${theme.warning}`}>
          {warning}
        </p>
      ))}
    </>
  );
}

function StoreCard({ card, theme }: { card: DicaCard; theme: Theme }) {
  const pageLink = (
    <Link href={card.couponPageUrl} className={`mt-2 inline-block text-xs font-bold underline underline-offset-2 ${theme.pageLink}`}>
      Ver a página do código da {card.brand}
    </Link>
  );

  // A tesoura e o tracejado só com código copiável, como em /cupons.
  if (!card.code) {
    return (
      <li className={`rounded-xl p-3 ${theme.card}`}>
        <CardDetails card={card} theme={theme} />
        <div className="mt-2.5">
          <CouponStoreLink href={card.storeUrl} brand={card.slug} placement="dica" className={theme.store}>
            Ir à loja <ExternalLink aria-hidden="true" className="h-4 w-4" />
          </CouponStoreLink>
        </div>
        {pageLink}
      </li>
    );
  }

  return (
    <li className={`relative rounded-xl p-3 pt-4 ${theme.codeCard}`}>
      <span
        aria-hidden="true"
        className={`absolute -top-3 start-3 flex h-6 w-6 items-center justify-center rounded-full ${theme.scissors}`}
      >
        <Scissors className="h-4 w-4" />
      </span>
      <CardDetails card={card} theme={theme} />
      <p dir="ltr" className={`mt-2 text-lg leading-6 font-extrabold tracking-[0.04em] break-all text-balance ${theme.code}`}>
        {card.code}
      </p>
      <div className="mt-2">
        <CopyAndOpenStoreLink
          code={card.code}
          brand={card.slug}
          href={card.storeUrl}
          placement="dica"
          className={`${theme.store} ${theme.copied}`}
          copiedChildren="Copiado! Abrindo a loja"
          copiedStatus={`Código ${card.code} copiado.`}
          returnNotice={{ text: pasteHint(card), closeLabel: 'Fechar aviso' }}
        >
          Copiar e ir à loja <ExternalLink aria-hidden="true" className="h-4 w-4" />
        </CopyAndOpenStoreLink>
      </div>
      {pageLink}
    </li>
  );
}

function AnswerView({ answer, theme }: { answer: DicaAnswer; theme: Theme }) {
  return (
    <div className="space-y-3">
      <p className="text-sm leading-5 font-semibold">{answer.message}</p>
      {answer.cards.length > 0 && (
        <ul className="space-y-4 pt-1">
          {answer.cards.map((card) => (
            <StoreCard key={card.slug} card={card} theme={theme} />
          ))}
        </ul>
      )}
      {answer.dicasUrl && (
        <div className={`rounded-xl p-3 ${theme.dicasBox}`}>
          <a
            href={answer.dicasUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('dica_dicas_click', { resultado: answer.result })}
            className={theme.dicas}
          >
            {DICA_COPY.dicasButton} <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </div>
  );
}

export default function DicaPanel({
  open,
  onClose,
  variant = 'default',
}: {
  open: boolean;
  onClose: () => void;
  variant?: DicaVariant;
}) {
  const theme = THEMES[variant];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastTurnRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const leftForStore = useRef(false);
  const pressStartedOnBackdrop = useRef(false);
  const nextId = useRef(0);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Quem volta da aba da loja encontra a caixa fechada e o aviso de onde colar o código, que fica no <body>, por baixo
  // da caixa aberta. A gaveta continua montada depois de fechar: desmontar levaria o aviso junto.
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState !== 'visible' || !leftForStore.current) return;
      leftForStore.current = false;
      dialogRef.current?.close();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  // A pergunta nova sobe ao topo da lista, para a resposta ser lida do começo.
  useEffect(() => {
    // Rola só a lista: o scrollIntoView rolaria também a página por trás da caixa.
    const list = listRef.current;
    const last = lastTurnRef.current;
    if (list && last) list.scrollTop = last.offsetTop - list.offsetTop - 12;
  }, [turns]);

  // O atalho não apaga o que a pessoa já tinha escrito no campo.
  const ask = async (raw: string, fromInput = false) => {
    const question = raw.trim();
    if (question.length < 2 || busy) return;
    const id = nextId.current++;
    setTurns((current) => [...current, { id, question }]);
    if (fromInput) setValue('');
    setBusy(true);
    setStatus('Procurando nos parceiros…');
    let update: Partial<Turn>;
    try {
      const response = await fetch('/api/dica', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: question }),
      });
      const body = (await response.json()) as DicaAnswer | { error?: string };
      if ('result' in body) {
        update = { answer: body };
        setStatus(
          body.cards.length > 0
            ? `${body.cards.length === 1 ? '1 loja parceira encontrada' : `${body.cards.length} lojas parceiras encontradas`}.`
            : body.message
        );
        trackEvent('dica_answer', { resultado: body.result, lojas: body.cards.length });
      } else {
        update = { error: body.error || ERROR_MESSAGE };
        setStatus(update.error ?? ERROR_MESSAGE);
      }
    } catch {
      update = { error: ERROR_MESSAGE };
      setStatus(ERROR_MESSAGE);
    }
    setTurns((current) => current.map((turn) => (turn.id === id ? { ...turn, ...update } : turn)));
    setBusy(false);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void ask(value, true);
  };

  // O clique fora da caixa cai no próprio <dialog> (o fundo escurecido). Só fecha se o toque também começou ali: quem
  // seleciona um texto da caixa e solta o mouse no fundo não perde a conversa.
  const onDialogMouseDown = (event: MouseEvent<HTMLDialogElement>) => {
    pressStartedOnBackdrop.current = event.target === event.currentTarget;
  };
  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget && pressStartedOnBackdrop.current) dialogRef.current?.close();
  };

  // Marca a saída para a loja antes do clique abrir a aba nova. Se a aba não abriu (bloqueada), a marca cai em 3 s, e a
  // próxima troca de aba não fecha a caixa.
  const onListClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.target as HTMLElement).closest('a[target="_blank"]')) return;
    leftForStore.current = true;
    window.setTimeout(() => {
      if (document.visibilityState === 'visible') leftForStore.current = false;
    }, 3000);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="dica-titulo"
      onClose={onClose}
      onMouseDown={onDialogMouseDown}
      onClick={onDialogClick}
      className={`fixed inset-x-0 top-auto bottom-0 m-0 mt-auto h-auto max-h-[85dvh] w-full max-w-none overflow-hidden rounded-t-3xl border-x-2 border-t-2 p-0 motion-safe:animate-[slide-up_0.25s_ease-out] sm:inset-x-auto sm:end-5 sm:bottom-5 sm:max-h-[min(640px,82dvh)] sm:w-[400px] sm:rounded-2xl sm:border-2 ${theme.dialog}`}
    >
      <div className="flex max-h-[inherit] flex-col">
        <header className={`flex shrink-0 items-start gap-3 px-4 py-3 ${theme.header}`}>
          <span className={`mt-0.5 shrink-0 rounded-lg border px-2 py-1 text-[11px] font-black ${theme.badge}`}>
            <span aria-hidden="true">✦</span> DICA
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="dica-titulo" className={`text-[15px] leading-5 uppercase ${theme.title}`}>
              Cupons exclusivos da Cecília
            </h2>
            <p className={`mt-0.5 text-xs leading-4 font-semibold ${theme.subtitle}`}>
              Quer saber se temos um cupom exclusivo pra algum produto que está procurando?
            </p>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Fechar o DICA"
            className={`-me-2 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl hover:bg-white/10 ${FOCUS_RING_ON_DARK}`}
          >
            <X aria-hidden="true" className="h-5 w-5" strokeWidth={2.4} />
          </button>
        </header>

        <div className="flex shrink-0 gap-2 overflow-x-auto px-4 pt-3 pb-2 [scrollbar-width:none]">
          {SHORTCUTS.map((shortcut) => (
            <button
              key={shortcut}
              type="button"
              disabled={busy}
              onClick={() => void ask(shortcut)}
              className={`min-h-9 shrink-0 rounded-full px-3 text-xs whitespace-nowrap disabled:opacity-60 ${theme.chip}`}
            >
              {shortcut}
            </button>
          ))}
        </div>

        {/* O Clarity mascara o campo, mas a pergunta e as respostas mostradas na tela também ficam mascaradas. */}
        <div
          ref={listRef}
          data-clarity-mask="true"
          onClickCapture={onListClickCapture}
          className="min-h-24 flex-1 space-y-5 overflow-y-auto overscroll-contain px-4 py-3"
        >
          {turns.length === 0 && (
            <p className={`text-sm leading-5 font-semibold ${theme.muted}`}>
              Pergunte por um produto ou uma loja. Eu mostro as nossas parceiras que vendem e o código de cada uma.
            </p>
          )}
          {turns.map((turn, index) => (
            <div key={turn.id} ref={index === turns.length - 1 ? lastTurnRef : undefined} className="space-y-3">
              <p className={`ms-auto w-fit max-w-[85%] rounded-2xl rounded-ee-md px-3 py-2 text-sm font-semibold ${theme.bubble}`}>
                {turn.question}
              </p>
              {turn.answer ? (
                <AnswerView answer={turn.answer} theme={theme} />
              ) : turn.error ? (
                <p className="text-sm leading-5 font-semibold">{turn.error}</p>
              ) : (
                <p className={`text-sm font-semibold ${theme.muted}`}>Procurando nos parceiros…</p>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={submit} className={`shrink-0 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] ${theme.form}`}>
          <div className="flex gap-2">
            <label htmlFor="dica-pergunta" className="sr-only">
              Sua pergunta
            </label>
            <input
              ref={inputRef}
              id="dica-pergunta"
              type="text"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              maxLength={MAX_LENGTH}
              autoComplete="off"
              data-clarity-mask="true"
              placeholder="Ex: tem whey?"
              className={`min-h-11 min-w-0 flex-1 rounded-xl px-3 text-base font-semibold sm:text-sm ${theme.input}`}
            />
            <button
              type="submit"
              disabled={busy || value.trim().length < 2}
              className={`min-h-11 shrink-0 rounded-xl px-4 text-sm disabled:opacity-60 ${theme.send}`}
            >
              Enviar
            </button>
          </div>
          {/* O leitor de tela ouve só o resumo de cada resposta, não a conversa inteira de novo. */}
          <p role="status" className="sr-only">
            {status}
          </p>
          <p className={`mt-2 text-[11px] leading-4 font-semibold ${theme.muted}`}>
            {DICA_COPY.privacyNotice}{' '}
            <Link href="/privacidade#assistente-dica" className={`underline underline-offset-2 ${theme.focus}`}>
              Como tratamos as perguntas
            </Link>
          </p>
        </form>
      </div>
    </dialog>
  );
}
