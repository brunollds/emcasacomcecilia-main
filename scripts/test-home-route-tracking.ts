import assert from 'node:assert/strict';
import {
  getHomeRouteClickParameters,
  TrackedHomeTabLink,
  type HomeRoutePlacement,
} from '../src/components/TrackedHomeLink';

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

// Link para a aba da vitrine: um <a> comum (com next/link o hash não dispara hashchange e o clique
// não trocaria a aba), que mede o clique e não mede o que outro handler já cancelou.
const tabLink = { href: '/#loja-damie', placement: 'event_hub', linkLabel: 'Ver o código da DAMIE' } as const;
const element = TrackedHomeTabLink({ ...tabLink, children: 'Ver o código' });
assert.equal(element.type, 'a');
assert.equal(element.props.href, tabLink.href);

const calls: unknown[][] = [];
Object.assign(globalThis, { window: { gtag: (...args: unknown[]) => calls.push(args) } });
const click = (defaultPrevented: boolean) => element.props.onClick?.({ defaultPrevented });
try {
  click(false);
  assert.deepEqual(calls, [
    ['event', 'home_route_click', { destination: '/#loja-damie', placement: 'event_hub', link_label: 'Ver o código da DAMIE' }],
  ]);
  click(true);
  assert.equal(calls.length, 1, 'clique cancelado não é medido');
} finally {
  Reflect.deleteProperty(globalThis, 'window');
}

console.log(`✅ homeRouteTracking: ${Object.keys(examples).length} placements e o link das abas (<a> comum, clique medido, cancelado não) passaram.`);
