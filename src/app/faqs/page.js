import FaqsClientPage from './FaqsClientPage';
import { faqData } from '@/lib/faqData';

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

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.flatMap((cat) =>
    cat.perguntas.map((faq) => ({
      '@type': 'Question',
      name: faq.pergunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.resposta,
      },
    }))
  ),
};

export default function FaqsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqsClientPage />
    </>
  );
}
