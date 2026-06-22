import ReviewPage, { generateMetadata as generateReviewMetadata } from '../[slug]/page';

const params = Promise.resolve({ slug: 'yesstyle-reward-code-rabatt-cecilia010' });

export function generateMetadata() {
  return generateReviewMetadata({ params });
}

export default function YesStyleRewardCodeRabattPage() {
  return <ReviewPage params={params} />;
}
