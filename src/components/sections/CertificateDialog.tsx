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

  const open = (event: MouseEvent<HTMLAnchorElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    dialog.showModal();
  };

  return (
    <>
      <a href={image.src} onClick={open} className={`shrink-0 text-xs font-extrabold underline underline-offset-[3px] ${FOCUS_RING}`}>
        {linkLabel}
      </a>
      <dialog
        ref={dialogRef}
        aria-label={title}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(calc(100%-2rem),560px)] overflow-auto rounded-[14px] border-2 border-marinho bg-white p-0 text-marinho backdrop:bg-marinho/70"
      >
        <div className="flex items-center justify-between gap-3 border-b-2 border-marinho bg-amarelo-cupom py-2 pr-2 pl-4">
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
