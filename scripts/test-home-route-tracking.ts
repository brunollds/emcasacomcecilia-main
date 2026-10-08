import assert from 'node:assert/strict';
import { getHomeRouteClickParameters, type HomeRoutePlacement } from '../src/components/TrackedHomeLink';

// Um exemplo por placement. O Record obriga a lista a ter todos os valores do tipo e só eles: um
// placement novo, ou um que saiu do tipo, quebra o typecheck aqui.
const examples: Record<HomeRoutePlacement, { href: string; linkLabel: string }> = {
  home_store_articles: {
    href: '/reviews/poltrona-de-amamentacao-como-escolher',
    linkLabel: 'Poltrona de amamentação: como escolher',
  },
  home_cecilia: { href: '/sobre', linkLabel: 'Mais sobre mim' },
  home_latest: {
    href: '/reviews/insider-store-e-confiavel',
    linkLabel: 'Insider Store é confiável? CNPJ, loja física, trocas e reputação',
  },
  home_event: {
    href: '/reviews/black-friday-damie',
    linkLabel: 'Black Friday DAMIE: poltronas e sofás para acompanhar',
  },
  event_hub: { href: '/#loja-damie', linkLabel: 'Ver o código da DAMIE' },
};

for (const placement of Object.keys(examples) as HomeRoutePlacement[]) {
  const { href, linkLabel } = examples[placement];
  assert.deepEqual(getHomeRouteClickParameters({ href, placement, linkLabel }), {
    destination: href,
    placement,
    link_label: linkLabel,
  });
}

console.log(`✅ homeRouteTracking: ${Object.keys(examples).length} placements passaram.`);
