'use client';

import { useEffect, useRef, useState } from 'react';
import { ReviewSectionContent } from './ReviewSectionContent';
import { SectionHeadingReveal } from '@/components/editorial';
import type { ContentSection } from '@/lib/content';

export interface GuideTimelineProps {
  steps: ContentSection[];
  sectionIds: Map<string, string>;
  reviewTitle: string;
}

function getStepNumber(heading?: string): string | null {
  const match = heading?.match(/^(?:Passo\s+|Step\s+)?(\d+)(?:[\.\):\s]|\s+)/i);
  return match?.[1] || null;
}

function getStepTitle(heading?: string): string {
  return heading?.replace(/^(?:\d+[\.\)]\s+|Passo\s+\d+[:\.\s]*|Step\s+\d+[:\.\s]*)/i, '') || '';
}

export function GuideTimeline({ steps, sectionIds, reviewTitle }: GuideTimelineProps): React.ReactElement | null {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const intersectingMap = useRef<Record<number, boolean>>({});

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    // Checagem inicial na montagem para ver se já há algum passo na tela
    const initialCheck = () => {
      const viewportHeight = window.innerHeight;
      const visibleIndices = itemRefs.current
        .map((ref, index) => {
          if (!ref) return null;
          const rect = ref.getBoundingClientRect();
          const visibleHeight = Math.max(0, Math.min(viewportHeight, rect.bottom) - Math.max(0, rect.top));
          return { index, visibleHeight };
        })
        .filter((item): item is { index: number; visibleHeight: number } => item !== null)
        .sort((a, b) => b.visibleHeight - a.visibleHeight);

      if (visibleIndices[0] && visibleIndices[0].visibleHeight > 0) {
        setActiveIndex(visibleIndices[0].index);
      }
    };

    initialCheck();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.findIndex((ref) => ref === entry.target);
          if (index !== -1) {
            intersectingMap.current[index] = entry.isIntersecting;
          }
        });

        const activeIndices = Object.keys(intersectingMap.current)
          .map(Number)
          .filter((idx) => intersectingMap.current[idx])
          .sort((a, b) => {
            const rectA = itemRefs.current[a]?.getBoundingClientRect();
            const rectB = itemRefs.current[b]?.getBoundingClientRect();
            return (rectA?.top || 0) - (rectB?.top || 0);
          });

        if (activeIndices.length > 0) {
          setActiveIndex(activeIndices[0]);
        }
      },
      { rootMargin: '-20% 0px -40% 0px', threshold: 0 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    window.addEventListener('resize', initialCheck, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', initialCheck);
    };
  }, [steps.length]);

  if (steps.length === 0) return null;

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute left-5 top-0 bottom-0 w-px bg-[#1a4d2e]/10 md:left-6"
      />

      <div className="space-y-10">
        {steps.map((step, index) => {
          const stepNumber = getStepNumber(step.heading);
          const stepTitle = getStepTitle(step.heading);
          const sectionId = step.heading ? sectionIds.get(step.heading) : undefined;
          const isActive = index === activeIndex;

          return (
            <section
              key={step.heading || `step-${index}`}
              ref={(el) => { itemRefs.current[index] = el; }}
              id={sectionId}
              className="relative scroll-mt-32 pl-14 transition-all duration-300 ease-in-out md:pl-16 lg:scroll-mt-28"
            >
              <div
                aria-hidden="true"
                className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 font-handwritten text-xl font-bold transition-all duration-300 md:h-12 md:w-12 md:text-2xl ${
                  isActive
                    ? 'border-[#ff6b35] bg-[#ff6b35] text-white shadow-md scale-110'
                    : 'border-[#1a4d2e]/15 bg-white text-[#1a4d2e]/60'
                }`}
              >
                {stepNumber}
              </div>

              {stepTitle && (
                <SectionHeadingReveal
                  as="h2"
                  underlineColor="#ff6b35"
                  className="mb-5 font-editorial text-2xl font-bold text-[#1a4d2e]"
                >
                  {stepTitle}
                </SectionHeadingReveal>
              )}

              <ReviewSectionContent section={step} reviewTitle={reviewTitle} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
