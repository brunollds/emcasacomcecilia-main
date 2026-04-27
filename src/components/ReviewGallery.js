'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

export default function ReviewGallery({ images = [], title }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  if (!images.length) return null;

  const current = images[active];

  function previous() {
    setActive((index) => (index === 0 ? images.length - 1 : index - 1));
  }

  function next() {
    setActive((index) => (index === images.length - 1 ? 0 : index + 1));
  }

  return (
    <section className="mt-12 overflow-hidden rounded-[2rem] bg-white p-5 shadow-soft ring-1 ring-black/5 md:p-7">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b35]">
            Galeria
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-[#0f1419]">
            Mais imagens
          </h2>
        </div>
        <span className="text-sm font-semibold text-gray-400">
          {active + 1} / {images.length}
        </span>
      </div>

      <div className="relative overflow-hidden rounded-[1.5rem] bg-[#fef9f3]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block aspect-[16/10] w-full"
          aria-label="Ampliar imagem da galeria"
        >
          <Image
            src={current.image}
            alt={current.alt || title}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white opacity-90 transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" />
            Ampliar
          </span>
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={previous}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-2 text-[#0f1419] shadow-lg transition-transform hover:scale-105"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-2 text-[#0f1419] shadow-lg transition-transform hover:scale-105"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {current.caption && (
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          {current.caption}
        </p>
      )}

      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((item, index) => (
            <button
              key={item.image}
              type="button"
              onClick={() => setActive(index)}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl ring-2 transition-all ${
                active === index ? 'ring-[#ff6b35]' : 'ring-transparent opacity-70 hover:opacity-100'
              }`}
              aria-label={`Abrir imagem ${index + 1}`}
            >
              <Image src={item.image} alt={item.alt || title} fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      )}

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
            <Image src={current.image} alt={current.alt || title} fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}
    </section>
  );
}
