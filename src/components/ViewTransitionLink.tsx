'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export interface ViewTransitionLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  className?: string;
}

export function ViewTransitionLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: ViewTransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call original onClick if provided
    onClick?.(e);

    // Check if View Transitions API is supported and not a special click
    const supportsViewTransition = 'startViewTransition' in document;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSpecialClick = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
    const isExternalLink = (e.target as HTMLAnchorElement).target === '_blank';

    // Only use View Transitions for regular left-clicks on internal links
    if (supportsViewTransition && !prefersReducedMotion && !isSpecialClick && !isExternalLink) {
      e.preventDefault();
      // Note: router.push doesn't return a promise, so Chromium may cross-fade
      // instead of morphing if the route render is slow. Acceptable since pages
      // are prerendered and cache hits usually morph instantly.
      (document as any).startViewTransition(() => {
        router.push(href);
      });
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
