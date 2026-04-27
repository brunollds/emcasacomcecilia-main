import FaqsClientPage from './FaqsClientPage';

export const metadata = {
  title: 'FAQs - Em Casa com Cecília',
  description: 'Perguntas frequentes sobre o Em Casa com Cecília, receitas, parcerias, reviews, mídia kit e contato.',
  alternates: {
    canonical: '/faqs',
  },
  openGraph: {
    title: 'FAQs - Em Casa com Cecília',
    description: 'Tire dúvidas sobre receitas, parcerias, reviews e contato.',
    url: '/faqs',
    type: 'website',
  },
};

export default function FaqsPage() {
  return <FaqsClientPage />;
}
