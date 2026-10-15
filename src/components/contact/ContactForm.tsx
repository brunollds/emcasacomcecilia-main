'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { PRIMARY_PAGE_BUTTON } from '@/components/ui/pageButton';
import { brandLinks } from '@/lib/brandLinks';
import { CONTACT_SUBJECTS } from '@/lib/contactPage';

// O formulário do /contato, que manda para /api/contact. O aviso de enviado ou de erro fica numa região
// role="status" que existe desde o começo, para o leitor de tela anunciar a troca do texto.

type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMPTY_FORM = { nome: '', email: '', assunto: '', mensagem: '' };

const LABEL = 'text-[15px] font-extrabold text-marinho';
const FIELD = `w-full rounded-[10px] border-2 border-marinho bg-white px-4 text-base font-medium text-marinho placeholder:text-marinho-suave/70 ${FOCUS_RING}`;

export function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setForm(EMPTY_FORM);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const sending = status === 'sending';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="contato-nome" className={LABEL}>
          Nome
        </label>
        <input
          id="contato-nome"
          name="nome"
          type="text"
          autoComplete="name"
          required
          value={form.nome}
          onChange={handleChange}
          placeholder="Como você quer ser chamado?"
          className={`${FIELD} min-h-12`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contato-email" className={LABEL}>
          E-mail
        </label>
        <input
          id="contato-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          className={`${FIELD} min-h-12`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contato-assunto" className={LABEL}>
          Assunto
        </label>
        <div className="relative">
          <select
            id="contato-assunto"
            name="assunto"
            required
            value={form.assunto}
            onChange={handleChange}
            className={`${FIELD} min-h-12 cursor-pointer appearance-none pr-12`}
          >
            <option value="" disabled>
              Escolha o assunto
            </option>
            {CONTACT_SUBJECTS.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-marinho" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contato-mensagem" className={LABEL}>
          Mensagem
        </label>
        <textarea
          id="contato-mensagem"
          name="mensagem"
          required
          rows={6}
          value={form.mensagem}
          onChange={handleChange}
          placeholder="Conte os detalhes. Se for um cupom, diga a loja, o código e o que apareceu no carrinho."
          className={`${FIELD} resize-y py-3 leading-relaxed`}
        />
      </div>

      <p className="text-sm font-medium text-marinho-suave">
        Usamos seus dados só para responder. Veja a{' '}
        <Link href="/privacidade" className={`font-extrabold text-marinho underline underline-offset-[3px] ${FOCUS_RING}`}>
          política de privacidade
        </Link>
        .
      </p>

      <button type="submit" disabled={sending} className={`${PRIMARY_PAGE_BUTTON} self-start disabled:cursor-wait disabled:opacity-60`}>
        {sending ? 'Enviando…' : 'Enviar mensagem'}
      </button>

      <div role="status" aria-live="polite">
        {status === 'sent' ? (
          <p className="rounded-[10px] border-2 border-verde-escuro bg-verde-claro px-4 py-3 text-[15px] font-bold text-verde-escuro">
            Mensagem enviada. Obrigada! Vamos responder no e-mail que você informou.
          </p>
        ) : null}
        {status === 'error' ? (
          <p className="rounded-[10px] border-2 border-marinho bg-amarelo-cupom px-4 py-3 text-[15px] font-bold text-marinho">
            Não deu para enviar agora. Tente de novo ou escreva para{' '}
            <a href={brandLinks.contactMailto} className={`wrap-break-word underline underline-offset-[3px] ${FOCUS_RING}`}>
              {brandLinks.contactEmail}
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
