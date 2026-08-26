import assert from 'node:assert/strict';
import {
  getHomeCategoryFilterParameters,
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
    href: '/reviews',
    placement: 'home_review_categories',
    linkLabel: 'Todos os guias',
  },
  {
    href: '/reviews/review-exemplo',
    placement: 'home_reviews_carousel',
    linkLabel: 'Review de exemplo',
  },
  {
    href: '/reviews/artigo-curado',
    placement: 'home_editor_pick',
    linkLabel: 'Artigo curado de exemplo',
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

const filterParameters = getHomeCategoryFilterParameters(
  'produtos-experiencias',
  'Produtos & experiências'
);
assert.deepEqual(filterParameters, {
  category: 'produtos-experiencias',
  placement: 'home_review_categories',
  link_label: 'Produtos & experiências',
});
assert.deepEqual(Object.keys(filterParameters).sort(), [
  'category',
  'link_label',
  'placement',
]);

console.log(`✅ homeRouteTracking: ${cases.length} placements + filtro passaram.`);
