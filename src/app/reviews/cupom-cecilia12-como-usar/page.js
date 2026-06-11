import ReviewPage, { generateMetadata as generateReviewMetadata } from '../[slug]/page';

const params = Promise.resolve({ slug: 'cupom-cecilia12-como-usar' });

export function generateMetadata() {
  return generateReviewMetadata({ params });
}

export default function CupomCecilia12ComoUsarPage() {
  return <ReviewPage params={params} />;
}
