'use client';

import { useState, type ReactNode } from 'react';

// No celular, a grade da reta final mostra os primeiros guias e esconde o resto por CSS (os links já estão no HTML,
// para o Google e para quem chega sem JavaScript pelo "Ver tudo"). O botão só alterna o data-aberto do grupo; a
// partir de md, todos aparecem e o botão some. Só monta com mais guias do que cabem no celular. Sem imports de dados: entra no bundle da home.
export function EventGuidesExpander({
  listId,
  total,
  focusRing,
  children,
}: {
  listId: string;
  total: number;
  focusRing: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group/guias flex flex-col gap-3" data-aberto={open}>
      {children}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        className={`mx-4 min-h-11 cursor-pointer self-start rounded-full border-2 border-current px-4 text-sm font-extrabold md:hidden ${focusRing}`}
      >
        {open ? 'Mostrar menos' : `Mostrar todos os ${total} guias`}
      </button>
    </div>
  );
}
