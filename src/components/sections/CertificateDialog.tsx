'use client';

import { useRef, type MouseEvent } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { FOCUS_RING } from '@/components/ui/focusRing';

type CertificateDialogProps = {
  image: { src: string; width: number; height: number; alt: string };
  title: string;
  linkLabel: string;
  closeLabel: string;
};

// "See certificate": um link para a imagem, que funciona sem JavaScript. Com JavaScript, abre a imagem
// num <dialog> sobre a página, como a gaveta do sumário dos artigos; Esc e o toque fora fecham.
export function CertificateDialog({ image, title, linkLabel, closeLabel }: CertificateDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const open = (event: MouseEvent<HTMLAnchorElement>) => {
    // Ctrl, Cmd, Shift, Alt e os outros botões seguem o link: nova aba, nova janela, baixar.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const dialog = dialogRef.current;
    if (!dialog || typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    if (!dialog.open) dialog.showModal();
  };

  return (
    <>
      <a
        ref={linkRef}
        href={image.src}
        onClick={open}
        aria-haspopup="dialog"
        className={`inline-flex min-h-11 shrink-0 items-center text-xs font-extrabold underline underline-offset-[3px] ${FOCUS_RING}`}
      >
        {linkLabel}
      </a>
      <dialog
        ref={dialogRef}
        aria-label={title}
        // O Safari não põe o foco no link ao clicar; sem isto, o foco volta para o <body> ao fechar.
        onClose={() => linkRef.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(calc(100%-2rem),560px)] overflow-auto overscroll-contain rounded-[14px] border-2 border-marinho bg-white p-0 text-marinho backdrop:bg-marinho/70"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b-2 border-marinho bg-amarelo-cupom py-2 pr-2 pl-4">
          <p className="text-sm font-extrabold">{title}</p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label={closeLabel}
            className={`flex size-11 shrink-0 items-center justify-center rounded-[10px] border-2 border-marinho bg-white ${FOCUS_RING}`}
          >
            <X aria-hidden="true" strokeWidth={2.4} className="size-5" />
          </button>
        </div>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 600px) 556px, calc(100vw - 2rem)"
          className="h-auto w-full"
        />
      </dialog>
    </>
  );
}
