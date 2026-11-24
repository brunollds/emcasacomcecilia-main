import assert from 'node:assert/strict';
import { getAllActiveCouponSlugs } from '@/lib/couponsData';
import { getCatalog, getVocabulary, normalize } from '@/lib/dica/catalog';

// Catálogo leve: só parceiras de cupom ativas, sem as cinco que o Bruno deixou de fora e sem preço.
const activeSlugs = new Set(getAllActiveCouponSlugs());
const catalog = getCatalog();
assert.ok(catalog.length >= 30, `catálogo com ${catalog.length} lojas`);
for (const store of catalog) {
  assert.ok(activeSlugs.has(store.slug), `${store.slug}: não é loja ativa de couponsData.ts`);
  assert.ok(!['shein', 'aliexpress', 'temu', 'lejour', 'magalu'].includes(store.slug), `${store.slug}: fora do DICA`);
}
assert.doesNotMatch(JSON.stringify(catalog), /R\$|preco_ref|estoque/i, 'catálogo com preço ou estoque');

assert.equal(normalize('Sofá-Cama!'), 'sofa cama');
assert.equal(normalize('  Pão   de   Queijo '), 'pao de queijo');

const vocabulary = getVocabulary();
assert.ok(vocabulary.get('whey protein')?.slugs.includes('adaptogen'), 'whey protein sem a Adaptogen');
for (const store of catalog) {
  for (const warning of store.avisos ?? []) {
    for (const term of warning.termos) {
      assert.ok(vocabulary.has(normalize(term)), `${store.slug}: aviso com termo fora do vocabulário (${term})`);
    }
  }
}

console.log(`✅ dica: ${catalog.length} lojas no catálogo, ${vocabulary.size} termos no vocabulário.`);
