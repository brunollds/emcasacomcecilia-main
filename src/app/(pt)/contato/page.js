import ContatoClientPage from './ContatoClientPage';

export const metadata = {
  title: 'Contato - Em Casa com Cecília',
  description: 'Fale com o Em Casa com Cecília para sugestões de receitas, dúvidas, parcerias comerciais e mídia kit.',
  alternates: {
    canonical: '/contato',
  },
  openGraph: {
    title: 'Contato - Em Casa com Cecília',
    description: 'Envie sua mensagem para sugestões, dúvidas e parcerias comerciais.',
    url: '/contato',
    type: 'website',
  },
};

export default function ContatoPage() {
  return <ContatoClientPage />;
}
