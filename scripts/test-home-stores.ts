import assert from 'node:assert/strict';

import { COUPONS } from '@/lib/couponsData';
import { getStorePageUrl } from '@/lib/homeStores';
import {
  CECILIA_TAB_ID,
  getDefaultTabId,
  getHomeStoreSelectParameters,
  getTabAnchor,
  getTabOrder,
  parseTabHash,
} from '@/lib/homeStoreTabs';

function store(slug: string) {
  const found = COUPONS.find((coupon) => coupon.slug === slug);
  assert.ok(found, `loja ${slug} existe em couponsData.ts`);
  return found;
}

// Abas: o hash é a única fonte da aba aberta, e o id da bolinha é o próprio hash.
const slugs = ['damie', 'yesstyle'];
assert.equal(getTabAnchor('yesstyle'), 'loja-yesstyle');
assert.equal(getTabAnchor(CECILIA_TAB_ID), 'cecilia');
assert.equal(parseTabHash('#loja-yesstyle', slugs), 'yesstyle');
assert.equal(parseTabHash('#cecilia', slugs), CECILIA_TAB_ID);
assert.equal(parseTabHash('#loja-kopenhagen', slugs), null, 'loja fora da vitrine');
assert.equal(parseTabHash('#yesstyle', slugs), null, 'sem o prefixo loja-');
assert.equal(parseTabHash('#loja-', slugs), null);
assert.equal(parseTabHash('', slugs), null);
assert.equal(getDefaultTabId(['dolce-gusto', 'damie']), 'damie');
assert.equal(getDefaultTabId(['dolce-gusto']), 'dolce-gusto', 'sem a DAMIE, a primeira loja');
assert.equal(getDefaultTabId([]), CECILIA_TAB_ID);
assert.deepEqual(getTabOrder(slugs), ['cecilia', 'damie', 'yesstyle'], 'a Cecília vem primeiro');
assert.deepEqual(getHomeStoreSelectParameters('yesstyle'), { store: 'yesstyle', placement: 'home_store_tabs' });
assert.deepEqual(getHomeStoreSelectParameters(CECILIA_TAB_ID), { store: 'cecilia', placement: 'home_store_tabs' });

// A DAMIE leva à página do código no subdomínio, nunca a /cupons/damie (dossiê de 07/10).
const DAMIE_CODE_PAGE =
  'https://damie.emcasacomcecilia.com/cupom-cecilia12?utm_source=site-principal&utm_medium=blog&utm_campaign=cecilia12';
assert.equal(getStorePageUrl(store('damie'), 'home'), `${DAMIE_CODE_PAGE}&utm_content=home`);
assert.equal(getStorePageUrl(store('damie'), 'reviews-loja'), `${DAMIE_CODE_PAGE}&utm_content=reviews-loja`);
assert.equal(getStorePageUrl(store('yesstyle'), 'home'), '/cupons/yesstyle');
assert.equal(getStorePageUrl(store('nestle-nutre'), 'reviews-loja'), '/cupons/nestle-nutre');

console.log('✅ homeStores: regras das abas passaram.');
