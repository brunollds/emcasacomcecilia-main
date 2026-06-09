import ReviewPage, { generateMetadata as generateReviewMetadata } from '../[slug]/page';

const params = Promise.resolve({ slug: 'poltrona-amamentacao-rotina' });

export function generateMetadata() {
  return generateReviewMetadata({ params });
}

export default function PoltronaAmamentacaoRotinaPage() {
  return <ReviewPage params={params} />;
}
