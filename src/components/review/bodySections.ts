import { generateSectionIds, type ContentSection, type ReviewKind } from '@/lib/content';
import { isStepHeading } from './couponCopyLocale';

// O veredito sai à parte, depois do corpo do artigo.
export const HEADINGS_OUTSIDE_BODY = ['Veredito'];

// As seções com título que o ReviewContentSections mostra (nos guias, os passos ficam com o
// GuideTimeline): entram no sumário e recebem as notas ancoradas nelas. O test:build-output usa a
// mesma lista para conferir onde a nota aparece.
export function getBodySections(sections: ContentSection[], kind: ReviewKind): Array<{ id: string; heading: string }> {
  const sectionIds = generateSectionIds(sections);
  return sections
    .filter((section) => (
      section.heading &&
      !HEADINGS_OUTSIDE_BODY.includes(section.heading) &&
      !(kind === 'guia' && isStepHeading(section.heading))
    ))
    .map((section) => ({
      id: sectionIds.get(section.heading || '') || '',
      heading: section.heading || '',
    }))
    .filter((item) => item.id);
}
