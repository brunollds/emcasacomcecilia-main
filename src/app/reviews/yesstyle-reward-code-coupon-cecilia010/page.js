import ReviewPage, { generateMetadata as generateReviewMetadata } from '../[slug]/page';

const params = Promise.resolve({ slug: 'yesstyle-reward-code-coupon-cecilia010' });

export function generateMetadata() {
  return generateReviewMetadata({ params });
}

export default function YesStyleRewardCodeCouponCecilia010Page() {
  return <ReviewPage params={params} />;
}
