import assert from 'node:assert/strict';
import {
  getHomeRouteClickParameters,
  type HomeRoutePlacement,
} from '../src/components/TrackedHomeLink';

const cases: Array<{
  href: string;
  placement: HomeRoutePlacement;
  linkLabel: string;
}> = [
  {
    href: '/reviews/guia-exemplo',
    placement: 'home_featured_guides',
    linkLabel: 'Guia de exemplo',
  },
  {
    href: '/reviews?categoria=produtos-experiencias',
    placement: 'home_review_categories',
    linkLabel: 'Produtos & experiências',
  },
  {
    href: '/reviews/review-exemplo',
    placement: 'home_reviews_carousel',
    linkLabel: 'Review de exemplo',
  },
];

for (const input of cases) {
  const parameters = getHomeRouteClickParameters(input);

  assert.deepEqual(parameters, {
    destination: input.href,
    placement: input.placement,
    link_label: input.linkLabel,
  });
  assert.deepEqual(Object.keys(parameters).sort(), [
    'destination',
    'link_label',
    'placement',
  ]);
}

console.log(`✅ homeRouteTracking: ${cases.length} placements passaram.`);
