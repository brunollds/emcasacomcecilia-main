import assert from 'node:assert/strict';
import { getAllActiveCouponSlugs, getCouponBySlug, getPendingLimitedCodes } from '@/lib/couponsData';
import { buildAnswer, buildStoreAnswer } from '@/lib/dica/answer';
import { getCatalog, getVocabulary, normalize } from '@/lib/dica/catalog';
import { interpretQuestion } from '@/lib/dica/interpret';
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
for (const question of ['tem sofá de cama?', 'tem cama sofá?', 'tem sofá de couro?']) {
  assert.ok(!storesOf(matchLocal(question)).has('damie'), `${question} não é a DAMIE`);
}
assert.deepEqual(matchLocal('tem cadeira gamer?'), [], 'o prefixo não ignora o qualificador');
assert.ok(storesOf(matchLocal('tem e-mail?')).has('proton'), 'e-mail sem a Proton');
assert.ok(storesOf(matchLocal('tem email criptografado?')).has('proton'), 'email sem a Proton');
assert.ok(matchLocal('tem pão?').length > 0, 'pão no singular');
assert.ok(storesOf(matchLocal('tem whey e creatina?')).has('adaptogen'), 'whey e creatina juntos');
// Qualificador que o catálogo não confirma leva a pergunta inteira ao Dicas.
assert.deepEqual(matchLocal('tem shampoo sólido?'), []);
assert.deepEqual(matchLocal('tem creatina vegana?'), []);
assert.ok(matchLocal('tem mala de viagem?').length > 0, 'mala de viagem');
assert.deepEqual(matchLocal('tem whey protein?').map(normalize), ['whey protein'], 'o termo exato mais longo vence');
assert.deepEqual(matchLocal('oi'), []);
assert.ok(!storesOf(matchLocal('tem mala de viagem?')).has('starlink'), 'mala de viagem não é a Starlink');
assert.equal(matchStoreName('cupom insider'), 'insider');
assert.equal(matchStoreName('Cupom da DAMIE'), 'damie');
assert.equal(matchStoreName('código black skull'), 'black-skull');
assert.equal(matchStoreName('tem whey'), undefined);
assert.equal(matchStoreName('cupom shein'), undefined, 'loja fora do catálogo');

// Montagem da resposta: código e link sempre de couponsData.ts, nunca preço.
const wheyAnswer = buildAnswer({ terms: matchLocal('tem whey?'), searchTerm: 'whey' });
assert.equal(wheyAnswer.result, 'parceiros');
assert.ok(wheyAnswer.cards.length >= 3 && wheyAnswer.cards.length <= 8, `whey com ${wheyAnswer.cards.length} cartões`);
for (const slug of ['black-skull', 'bold']) assert.ok(wheyAnswer.cards.some((card) => card.slug === slug), `whey sem ${slug}`);
for (const card of wheyAnswer.cards) {
  const coupon = getCouponBySlug(card.slug);
  assert.ok(coupon, `${card.slug}: cartão de loja inativa`);
  const limited = getPendingLimitedCodes(coupon).find((item) => item.inHtml)?.code;
  const expected = coupon.offerMode === 'discount-code' ? limited ?? coupon.code : coupon.referral?.code;
  assert.equal(card.code, expected, `${card.slug}: código do cartão`);
  assert.equal(card.storeUrl, coupon.offerUrl, `${card.slug}: link do cartão`);
  assert.equal(card.couponPageUrl, `/cupons/${card.slug}`);
}
assert.equal(buildAnswer({ terms: matchLocal('tem whey?'), searchTerm: 'whey', viaFallback: true }).result, 'reserva-parceiros');

const yesstyle = buildStoreAnswer('yesstyle');
assert.equal(yesstyle.cards[0]?.code, 'CECILIA010');
assert.equal(yesstyle.cards[0]?.codeLabel, 'Código de recompensa', 'o CECILIA010 nunca é cupom');

const proton = buildStoreAnswer('proton').cards[0];
assert.ok(proton && !proton.code, 'Proton é loja só de link');
assert.equal(proton.codeLabel, 'Link da Cecília');

const nestle = buildAnswer({ terms: ['fórmula infantil'], searchTerm: 'fórmula infantil' }).cards.find((card) => card.slug === 'nestle-nutre');
assert.ok(nestle?.warnings.some((text) => text.includes('0 a 12 meses')), 'Nestlé Nutre sem o aviso do CECI');
// Item em que o CECI não vale: o cartão informa a loja e o aviso, sem o código.
const newborn = buildAnswer({ terms: matchLocal('tem fórmula infantil de 0 a 12 meses?'), searchTerm: 'fórmula infantil' });
const newbornCard = newborn.cards.find((card) => card.slug === 'nestle-nutre');
assert.ok(newbornCard, 'fórmula de 0 a 12 meses sem a Nestlé Nutre');
assert.equal(newbornCard.code, undefined, 'código oferecido em item excluído');
assert.equal(newbornCard.codeLabel, 'Sem código para este item');
assert.ok(newbornCard.warnings.some((text) => text.includes('0 a 12 meses')));
assert.equal(buildAnswer({ terms: ['Alfamino'], searchTerm: 'Alfamino' }).cards[0]?.code, undefined);
assert.ok(buildStoreAnswer('nestle-nutre').cards[0]?.code, 'o nome da loja segue com o código');
assert.ok(buildAnswer({ terms: ['fórmula infantil de 1 a 3 anos'], searchTerm: 'x' }).cards[0]?.code, '1 a 3 anos segue com o código');
assert.deepEqual(buildAnswer({ terms: ['whey protein', 'Whey Protein'], searchTerm: 'whey' }).cards[0]?.matched.length, 1, 'termo repetido');

for (const answer of [buildAnswer({ terms: ['Fórmulas e leites infantis'], searchTerm: 'fórmula' }), buildStoreAnswer('nestle-nutre')]) {
  const card = answer.cards.find((item) => item.slug === 'nestle-nutre');
  assert.ok(card?.warnings.some((text) => text.includes('0 a 12 meses')), 'Nestlé Nutre sem o aviso do CECI');
}
assert.ok(buildAnswer({ terms: ['whey protein'], searchTerm: 'whey' }).cards.every((card) => card.warnings.length === 0), 'aviso fora do termo');

const sofaCama = buildAnswer({ terms: matchLocal('tem sofá-cama?'), searchTerm: 'sofá-cama' });
assert.equal(sofaCama.result, 'dicas');
assert.equal(sofaCama.dicasUrl, 'https://dicas.emcasacomcecilia.com/?q=sof%C3%A1-cama');
assert.equal(buildAnswer({ terms: [], searchTerm: 'anel de prata', viaFallback: true }).result, 'reserva-dicas');
assert.equal(buildAnswer({ terms: ['whey protein'], searchTerm: 'whey', outOfScope: true }).result, 'fora');
assert.deepEqual(buildAnswer({ terms: ['termo que não existe'], searchTerm: 'x' }).cards, []);

for (const answer of [wheyAnswer, sofaCama, yesstyle, ...catalog.map((store) => buildStoreAnswer(store.slug))]) {
  // O desconto é a oferta da parceria, igual ao de /cupons ("R$ 200 de bônus" na Starlink); o resto nunca leva valor.
  const withoutOffer = { ...answer, cards: answer.cards.map(({ discount: _discount, ...card }) => card) };
  assert.doesNotMatch(JSON.stringify(withoutOffer), /R\$/, 'resposta com preço');
  for (const card of answer.cards) {
    // Única exceção: o bônus da indicação da Starlink, que é a oferta da parceria e não preço de produto.
    if (card.discount?.includes('R$')) {
      assert.equal(card.slug, 'starlink', `${card.slug}: desconto com valor em reais (${card.discount})`);
      assert.match(card.discount, /bônus/i, `starlink: ${card.discount}`);
    }
  }
}
for (const store of catalog) assert.equal(buildStoreAnswer(store.slug).cards.length, 1, `${store.slug}: sem cartão`);

async function main() {
  // Interpretação pela IA, com fetch falso: só termos do vocabulário; qualquer falha devolve null.
  const reply = (text: string, status = 200) =>
    (async () => new Response(JSON.stringify({ content: [{ type: 'text', text }] }), { status })) as unknown as typeof fetch;
  const interpreted = await interpretQuestion('tem whey?', {
    apiKey: 'teste',
    fetchImpl: reply('{"termos":["whey protein","xyz","Whey Protein"],"buscaDicas":"whey","foraDeEscopo":false}'),
  });
  assert.deepEqual(interpreted?.terms.map(normalize), ['whey protein'], 'termo fora do vocabulário ou repetido');
  assert.equal(interpreted?.searchTerm, 'whey');
  assert.equal(await interpretQuestion('x', { apiKey: 'teste', fetchImpl: reply('não sei') }), null);
  assert.equal(await interpretQuestion('x', { apiKey: 'teste', fetchImpl: reply('{"termos":[]}', 500) }), null);
  let called = false;
  const spy = (async () => {
    called = true;
    return new Response('{}');
  }) as unknown as typeof fetch;
  assert.equal(await interpretQuestion('x', { apiKey: '', fetchImpl: spy }), null);
  assert.equal(called, false, 'chamou a IA sem chave');
  const hang = ((_url: string, init?: RequestInit) =>
    new Promise((_resolve, reject) => init?.signal?.addEventListener('abort', () => reject(new Error('abort'))))) as unknown as typeof fetch;
  assert.equal(await interpretQuestion('x', { apiKey: 'teste', fetchImpl: hang, timeoutMs: 50 }), null);

  console.log(`✅ dica: ${catalog.length} lojas no catálogo, ${vocabulary.size} termos no vocabulário.`);
}

// Uma promessa pendurada faz o Node sair calado com código 0: sem chegar ao fim, o teste falha.
let finished = false;
process.on('exit', (code) => {
  if (code === 0 && !finished) {
    console.error('❌ dica: o teste saiu antes do fim (promessa pendurada)');
    process.exitCode = 1;
  }
});

main().then(() => {
  finished = true;
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
