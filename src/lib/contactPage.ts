import type { PageLink } from '@/lib/pageSeo';

// O /contato: os assuntos do formulário, que a rota /api/contact também usa para o rótulo do e-mail e para
// recusar assunto desconhecido, e o escape do que vai no HTML desse e-mail. Sem imports de valor: o
// formulário é componente de cliente e a rota da API roda fora do React.

export const CONTACT_TRAIL: PageLink[] = [
  { name: 'Início', path: '/' },
  { name: 'Contato', path: '/contato' },
];

export const CONTACT_META = {
  title: 'Contato | Em Casa com Cecília',
  description:
    'Fale com o Em Casa com Cecília: cupom que não funcionou, sugestões de artigo e receita, dúvidas, parcerias e mídia kit.',
};

export const CONTACT_SUBJECTS = [
  { value: 'cupom', label: 'Cupom ou código não funcionou' },
  { value: 'review', label: 'Sugestão de guia ou análise' },
  { value: 'sugestao', label: 'Sugestão de receita' },
  { value: 'parceria', label: 'Parceria ou publicidade' },
  { value: 'duvida', label: 'Dúvida sobre o site' },
  { value: 'outro', label: 'Outro assunto' },
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number]['value'];

export const ASSUNTO_LABELS: Readonly<Record<ContactSubject, string>> = Object.fromEntries(
  CONTACT_SUBJECTS.map(({ value, label }) => [value, label])
) as Record<ContactSubject, string>;

export function isContactSubject(value: unknown): value is ContactSubject {
  return typeof value === 'string' && Object.hasOwn(ASSUNTO_LABELS, value);
}

const HTML_ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

// Texto do visitante dentro do HTML do e-mail, no corpo ou num atributo entre aspas.
export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}
