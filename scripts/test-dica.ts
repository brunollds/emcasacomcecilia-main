import assert from 'node:assert/strict';
import { getAllActiveCouponSlugs } from '@/lib/couponsData';
import { getCatalog, getVocabulary, normalize } from '@/lib/dica/catalog';
import { matchLocal, matchStoreName } from '@/lib/dica/match';

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

// Busca local, a reserva sem IA: os exemplos do Bruno.
const storesOf = (terms: string[]) => new Set(terms.flatMap((term) => vocabulary.get(normalize(term))?.slugs ?? []));
const whey = storesOf(matchLocal('tem whey?'));
for (const slug of ['adaptogen', 'mais-mu', 'probiotica']) assert.ok(whey.has(slug), `whey sem ${slug}`);
assert.ok(storesOf(matchLocal('tem sofá?')).has('damie'), 'sofá sem a DAMIE');
assert.ok(storesOf(matchLocal('Vocês têm sofás?')).has('damie'), 'sofás (plural) sem a DAMIE');
assert.deepEqual(matchLocal('tem sofá-cama?'), []);
assert.deepEqual(matchLocal('tem sofa cama'), []);
assert.deepEqual(matchLocal('tem anel de prata?'), []);
assert.deepEqual(matchLocal('tem whey protein?').map(normalize), ['whey protein'], 'o termo exato mais longo vence');
assert.deepEqual(matchLocal('oi'), []);
assert.ok(!storesOf(matchLocal('tem mala de viagem?')).has('starlink'), 'mala de viagem não é a Starlink');
assert.equal(matchStoreName('cupom insider'), 'insider');
assert.equal(matchStoreName('Cupom da DAMIE'), 'damie');
assert.equal(matchStoreName('código black skull'), 'black-skull');
assert.equal(matchStoreName('tem whey'), undefined);
assert.equal(matchStoreName('cupom shein'), undefined, 'loja fora do catálogo');

console.log(`✅ dica: ${catalog.length} lojas no catálogo, ${vocabulary.size} termos no vocabulário.`);
