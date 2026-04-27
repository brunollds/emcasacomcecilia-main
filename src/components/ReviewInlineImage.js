'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

export default function ReviewInlineImage({ section, reviewTitle }) {
  const [open, setOpen] = useState(false);
  const fitContain = section.imageFit === 'contain';
  const alt = section.imageAlt || section.heading || reviewTitle;

  return (
    <>
      <figure className="mx-auto mt-6 max-w-2xl overflow-hidden rounded-[1.25rem] bg-white">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full overflow-hidden rounded-[1.25rem] bg-white"
          aria-label="Ampliar imagem"
        >
          <div className="relative aspect-[16/9]">
            <Image
              src={section.image}
              alt={alt}
              fill
              className={fitContain ? 'object-contain' : 'object-cover'}
              sizes="(max-width: 1024px) 100vw, 820px"
            />
          </div>
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white opacity-90 transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" />
            Ampliar
          </span>
        </button>
        {section.imageCaption && (
          <figcaption className="px-1 pt-2.5 text-sm leading-relaxed text-gray-500">
            {section.imageCaption}
          </figcaption>
        )}
      </figure>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/95 p-2 text-[#0f1419] shadow-lg transition-transform hover:scale-105"
            aria-label="Fechar imagem ampliada"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative h-[86vh] w-full max-w-6xl">
            <Image
              src={section.image}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
