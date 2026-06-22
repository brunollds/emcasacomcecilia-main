import ReviewPage, { generateMetadata as generateReviewMetadata } from '../[slug]/page';

const params = Promise.resolve({ slug: 'codigo-de-recompensa-yesstyle-cupon-cecilia010' });

export function generateMetadata() {
  return generateReviewMetadata({ params });
}

export default function CodigoDeRecompensaYesStyleCuponCecilia010Page() {
  return <ReviewPage params={params} />;
}
