'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics';
import { getCouponBrandFromHref, getInternalHref } from '@/lib/internalLinks';

export type CouponPageLinkPlacement =
  | 'review_inline'
  | 'review_verdict'
  | 'review_final_cta'
  | 'review_sidebar'
  | 'review_mobile_drawer';

type TrackedCouponPageLinkProps = {
  href: string;
  children: ReactNode;
  contentSlug?: string;
  linkLabel: string;
  placement?: CouponPageLinkPlacement;
  className?: string;
};

export function TrackedCouponPageLink({
  href,
  children,
  contentSlug,
  linkLabel,
  placement = 'review_inline',
  className,
}: TrackedCouponPageLinkProps) {
  const internalHref = getInternalHref(href);
  const destinationBrand = getCouponBrandFromHref(href);

  const handleClick = () => {
    trackEvent('coupon_page_click', {
      ...(destinationBrand && { brand: destinationBrand }),
      ...(contentSlug && { content_slug: contentSlug }),
      link_label: linkLabel,
      placement,
      url: internalHref,
    });
  };

  return (
    <Link href={internalHref} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
