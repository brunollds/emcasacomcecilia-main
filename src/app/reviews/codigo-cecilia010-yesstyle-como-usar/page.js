import ReviewPage, { generateMetadata as generateReviewMetadata } from '../[slug]/page';

const params = Promise.resolve({ slug: 'codigo-cecilia010-yesstyle-como-usar' });

export function generateMetadata() {
  return generateReviewMetadata({ params });
}

export default function CodigoCecilia010YesStyleComoUsarPage() {
  return <ReviewPage params={params} />;
}
