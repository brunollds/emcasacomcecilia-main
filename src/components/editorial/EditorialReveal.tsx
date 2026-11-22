'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

export interface EditorialRevealProps {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  as?: React.ElementType;
  id?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

function subscribeToReducedMotion(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshot(): boolean {
  return false;
}

function normalizeDelay(delay: number): number {
  if (delay > 0 && delay < 10) return delay * 1000;
  return delay;
}

export function EditorialReveal({
  children,
  delay = 0,
  distance = 24,
  duration = 600,
  threshold = 0,
  once = true,
  className = '',
  as: Component = 'div',
  style: providedStyle,
  ...rest
}: EditorialRevealProps): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );
  const transitionDelay = normalizeDelay(delay);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const timeoutId = window.setTimeout(() => {
      const element = ref.current;
      // O que já está na tela (ou acima dela) nunca passa por opacity: 0.
      if (element && element.getBoundingClientRect().top < window.innerHeight) {
        setIsVisible(true);
      }
      setCanAnimate(true);
    }, 80);
    return () => window.clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!canAnimate || prefersReducedMotion || isVisible) return undefined;

    const element = ref.current;
    if (!element) return undefined;

    if (element.getBoundingClientRect().top < window.innerHeight) {
      window.requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return undefined;
    }

    if (typeof IntersectionObserver === 'undefined') {
      window.requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return undefined;
    }

    // threshold 0 + margem curta: seções longas no celular (>10x a tela) nunca chegavam a threshold 0.1.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          window.setTimeout(() => setIsVisible(true), Math.max(transitionDelay, 90));
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [canAnimate, isVisible, once, threshold, prefersReducedMotion, transitionDelay]);

  const Tag = Component as React.ElementType;
  const showImmediately = !canAnimate || prefersReducedMotion;
  const effectiveDistance = prefersReducedMotion ? 0 : distance;

  const style: React.CSSProperties = {
    ...providedStyle,
    opacity: showImmediately || isVisible ? 1 : 0,
    transform: showImmediately || isVisible ? 'translateY(0)' : `translateY(${effectiveDistance}px)`,
    transition: showImmediately
      ? 'none'
      : `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    willChange: showImmediately || isVisible ? 'auto' : 'opacity, transform',
  };

  return (
    <Tag ref={ref} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
