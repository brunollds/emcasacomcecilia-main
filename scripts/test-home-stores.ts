import assert from 'node:assert/strict';

import {
  CECILIA_TAB_ID,
  getDefaultTabId,
  getHomeStoreSelectParameters,
  getTabAnchor,
  getTabOrder,
  parseTabHash,
} from '@/lib/homeStoreTabs';

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

console.log('✅ homeStores: regras das abas passaram.');
