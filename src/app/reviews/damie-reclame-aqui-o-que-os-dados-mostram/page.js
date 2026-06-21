import ReviewPage, { generateMetadata as generateReviewMetadata } from '../[slug]/page';

const params = Promise.resolve({ slug: 'damie-reclame-aqui-o-que-os-dados-mostram' });

export function generateMetadata() {
  return generateReviewMetadata({ params });
}

export default function DamieReclameAquiPage() {
  return <ReviewPage params={params} />;
}
