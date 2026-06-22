import ReviewPage, { generateMetadata as generateReviewMetadata } from '../[slug]/page';

const params = Promise.resolve({ slug: 'code-recompense-yesstyle-cecilia010' });

export function generateMetadata() {
  return generateReviewMetadata({ params });
}

export default function YesStyleCodeRecompensePage() {
  return <ReviewPage params={params} />;
}
