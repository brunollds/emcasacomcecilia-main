import assert from 'node:assert/strict';
import { getAllActiveCouponSlugs, getCouponBySlug, getPendingLimitedCodes } from '@/lib/couponsData';
import { buildAnswer, buildStoreAnswer } from '@/lib/dica/answer';
import { getCatalog, getVocabulary, normalize } from '@/lib/dica/catalog';
import { POST as dicaRoute } from '@/app/api/dica/route';
import { handleQuestion, isAllowedOrigin, visitorIp } from '@/lib/dica/handleQuestion';
import { interpretQuestion } from '@/lib/dica/interpret';
import { cacheGet, cacheSet, checkVisitor, pruneVisitors, resetDicaLimitsForTests, takeAiSlot } from '@/lib/dica/limits';
import { cleanupQuestionLog, logQuestion, resetQuestionLogForTests, scrubPersonalData } from '@/lib/dica/questionLog';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
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

  // Limites por IP: 1 a cada 3 s, 8 em 5 min, 25 no dia.
  resetDicaLimitsForTests();
  const t0 = Date.parse('2026-11-24T10:00:00-03:00');
  assert.equal(checkVisitor('1.1.1.1', t0).ok, true);
  assert.equal(checkVisitor('1.1.1.1', t0 + 1000).ok, false, '2ª pergunta em 1 s');
  assert.equal(checkVisitor('2.2.2.2', t0 + 1000).ok, true, 'outro IP não divide o limite');
  for (let i = 1; i < 8; i += 1) assert.equal(checkVisitor('1.1.1.1', t0 + i * 4000).ok, true, `pergunta ${i + 1} em 5 min`);
  assert.equal(checkVisitor('1.1.1.1', t0 + 8 * 4000).ok, false, '9ª pergunta em 5 min');
  resetDicaLimitsForTests();
  for (let i = 0; i < 25; i += 1) assert.equal(checkVisitor('3.3.3.3', t0 + i * 60_000).ok, true, `pergunta ${i + 1} do dia`);
  const blocked = checkVisitor('3.3.3.3', t0 + 25 * 60_000);
  assert.equal(blocked.ok, false, '26ª pergunta do dia');
  const midnight = Date.parse('2026-11-25T00:00:00-03:00');
  if (blocked.ok === false) assert.equal(blocked.retryAfterSec, Math.ceil((midnight - (t0 + 25 * 60_000)) / 1000), 'Retry-After até a meia-noite');
  assert.equal(checkVisitor('3.3.3.3', Date.parse('2026-11-25T00:05:00-03:00')).ok, true, 'o dia vira em Brasília');
  // A contagem de ontem some na virada, com ou sem pergunta: o 1.1.1.1 de ontem volta do zero.
  resetDicaLimitsForTests();
  checkVisitor('1.1.1.1', t0);
  pruneVisitors(Date.parse('2026-11-25T00:01:00-03:00'));
  assert.equal(checkVisitor('1.1.1.1', Date.parse('2026-11-25T00:01:01-03:00')).ok, true, 'contagem de ontem apagada');
  assert.equal(checkVisitor('1.1.1.1', Date.parse('2026-11-25T00:01:02-03:00')).ok, false, 'a de hoje segue valendo');

  // Teto diário da IA.
  resetDicaLimitsForTests();
  for (let i = 0; i < 1500; i += 1) assert.equal(takeAiSlot(t0), true);
  assert.equal(takeAiSlot(t0), false, '1501ª chamada à IA');
  assert.equal(takeAiSlot(Date.parse('2026-11-25T00:01:00-03:00')), true, 'o teto volta no dia seguinte');

  // Cache: 60 min, 500 entradas, só a interpretação.
  resetDicaLimitsForTests();
  const sample = { terms: ['whey protein'], searchTerm: 'whey', outOfScope: false, viaFallback: false };
  cacheSet('tem whey', sample, t0);
  assert.deepEqual(cacheGet('tem whey', t0 + 59 * 60_000), sample);
  assert.equal(cacheGet('tem whey', t0 + 61 * 60_000), undefined, 'cache depois de 60 min');
  for (let i = 0; i <= 500; i += 1) cacheSet(`q${i}`, sample, t0);
  assert.equal(cacheGet('q0', t0), undefined, 'a entrada mais antiga sai');
  assert.ok(cacheGet('q500', t0));
  resetDicaLimitsForTests();

  // Dado pessoal fora do log.
  assert.equal(
    scrubPersonalData('meu cpf 123.456.789-00 e (11) 98765-4321, a@b.com, tem whey?'),
    'meu cpf [removido] e [removido], [removido], tem whey?',
  );
  assert.equal(scrubPersonalData('tem whey de 900g? 12 meses, 1,8 kg'), 'tem whey de 900g? 12 meses, 1,8 kg');
  assert.equal(scrubPersonalData('anel 1000000 pontos'), 'anel 1000000 pontos');
  assert.equal(scrubPersonalData('sou joão.silva@exemplo.com.br, tem whey?'), 'sou [removido], tem whey?', 'e-mail com acento');
  assert.equal(
    scrubPersonalData('sou joão.silva@exemplo.com.br, tem whey?'.normalize('NFD')),
    'sou [removido], tem whey?',
    'e-mail com o acento solto (NFD)',
  );
  for (const personal of ['11 9 8765-4321', '11 9.8765-4321', '+55 (11) 9 8765-4321', '98765-4321', '3456-7890', '123 456 789-09', '123.456.789 09', '01310-100']) {
    assert.equal(scrubPersonalData(`fone ${personal} tem whey`), 'fone [removido] tem whey', `não limpou ${personal}`);
  }
  const logDir = mkdtempSync(path.join(tmpdir(), 'dica-log-'));
  try {
    resetQuestionLogForTests();
    writeFileSync(path.join(logDir, 'dica-2026-08-24.jsonl'), '{}\n');
    writeFileSync(path.join(logDir, 'dica-2026-10-01.jsonl'), '{}\n');
    const at = new Date('2026-11-24T13:00:00Z');
    await logQuestion({ question: 'tem whey? 11 98765-4321', result: 'parceiros', slugs: ['adaptogen'], searchTerm: 'whey a@b.com' }, { dir: logDir, now: at });
    const lines = readFileSync(path.join(logDir, 'dica-2026-11-24.jsonl'), 'utf8').trim().split('\n');
    assert.equal(lines.length, 1);
    const entry = JSON.parse(lines[0]);
    assert.deepEqual(Object.keys(entry).sort(), ['at', 'q', 'result', 'searchTerm', 'slugs']);
    assert.equal(entry.q, 'tem whey? [removido]');
    assert.equal(entry.searchTerm, 'whey [removido]');
    assert.ok(!existsSync(path.join(logDir, 'dica-2026-08-24.jsonl')), 'arquivo de 92 dias atrás ficou');
    assert.ok(existsSync(path.join(logDir, 'dica-2026-10-01.jsonl')), 'arquivo de 54 dias atrás sumiu');
    // A limpeza dos 90 dias roda sozinha, sem pergunta nova.
    writeFileSync(path.join(logDir, 'dica-2026-08-01.jsonl'), '{}\n');
    await cleanupQuestionLog({ dir: logDir, now: at });
    assert.ok(!existsSync(path.join(logDir, 'dica-2026-08-01.jsonl')), 'a limpeza sem pergunta nova não apagou');
    await cleanupQuestionLog({ dir: path.join(logDir, 'nao-existe'), now: at });
    const emptyDir = mkdtempSync(path.join(tmpdir(), 'dica-vazio-'));
    const previous = process.env.DICA_LOG_DIR;
    delete process.env.DICA_LOG_DIR;
    await logQuestion({ question: 'x', result: 'dicas', slugs: [] });
    if (previous !== undefined) process.env.DICA_LOG_DIR = previous;
    assert.deepEqual(readdirSync(emptyDir), [], 'gravou sem DICA_LOG_DIR');
    rmSync(emptyDir, { recursive: true, force: true });
  } finally {
    rmSync(logDir, { recursive: true, force: true });
  }

  // A rota: validação, dado pessoal fora da IA, cache, nome de loja, reserva e limite.
  resetDicaLimitsForTests();
  let aiCalls = 0;
  const seen: string[] = [];
  const fakeAi: typeof interpretQuestion = async (question) => {
    aiCalls += 1;
    seen.push(question);
    return { terms: ['whey protein'], searchTerm: 'whey', outOfScope: false };
  };
  const noLog = async () => {};
  let clock = Date.parse('2026-11-24T10:00:00-03:00');
  const ask = (q: unknown, ip = '9.9.9.9', interpret: typeof interpretQuestion = fakeAi) => {
    clock += 10_000;
    return handleQuestion({ q, ip, now: clock, interpret, log: noLog });
  };
  for (const bad of ['   ', 'a', 'x'.repeat(201), 42, '👍👍', undefined]) {
    assert.equal((await ask(bad)).status, 400, `pergunta inválida aceita: ${String(bad).slice(0, 20)}`);
  }
  assert.equal(aiCalls, 0, 'a IA foi chamada com pergunta inválida');

  const first = await ask('Tem whey? meu cpf 123.456.789-00', '4.4.4.4');
  assert.equal(first.status, 200);
  assert.equal((first.body as { result: string }).result, 'parceiros');
  assert.ok(!seen[0].includes('123'), 'o CPF chegou à IA');
  await ask('tem whey? meu cpf 123.456.789-00', '5.5.5.5');
  assert.equal(aiCalls, 1, 'a mesma pergunta chamou a IA duas vezes');

  const storeAnswer = await ask('cupom insider', '6.6.6.6');
  assert.equal((storeAnswer.body as { cards: { slug: string }[] }).cards[0]?.slug, 'insider');
  assert.equal(aiCalls, 1, 'o nome da loja chamou a IA');

  const fallback = await ask('tem sofá?', '7.7.7.7', async () => null);
  assert.equal((fallback.body as { result: string }).result, 'reserva-parceiros');
  const fallbackDicas = await ask('tem anel de prata?', '7.7.7.8', async () => null);
  assert.equal((fallbackDicas.body as { dicasUrl?: string }).dicasUrl, 'https://dicas.emcasacomcecilia.com/?q=anel%20de%20prata');

  const burst = await handleQuestion({ q: 'tem whey?', ip: '7.7.7.8', now: clock + 1000, interpret: fakeAi, log: noLog });
  assert.equal(burst.status, 429, '2ª pergunta do mesmo IP em 1 s');
  assert.ok(burst.retryAfterSec && burst.retryAfterSec >= 1);
  assert.equal((burst.body as { result: string }).result, 'limite');

  assert.equal(visitorIp(new Headers({ 'cf-connecting-ip': '1.2.3.4', 'x-forwarded-for': '5.6.7.8' })), '1.2.3.4');
  assert.equal(visitorIp(new Headers({ 'x-forwarded-for': '6.6.6.6, 5.6.7.8' })), '5.6.7.8', 'o primeiro valor é do cliente');
  assert.equal(visitorIp(new Headers({ 'x-real-ip': '9.8.7.6', 'x-forwarded-for': '6.6.6.6' })), '9.8.7.6');
  const leaky: typeof interpretQuestion = async () => ({ terms: [], searchTerm: 'whey a@b.com', outOfScope: false });
  const leakAnswer = (await ask('tem whey diferente?', '8.8.8.1', leaky)).body as { dicasUrl?: string; searchTerm?: string };
  assert.ok(!leakAnswer.searchTerm?.includes('@') && !leakAnswer.dicasUrl?.includes('%40'), 'e-mail da IA na busca do Dicas');
  // Outro site não chama a rota; o corpo grande é cortado durante a leitura, com ou sem tamanho declarado.
  assert.equal(isAllowedOrigin(new Headers({ 'sec-fetch-site': 'cross-site', origin: 'https://golpe.example' })), false);
  assert.equal(isAllowedOrigin(new Headers({ origin: 'https://golpe.example' })), false);
  assert.equal(isAllowedOrigin(new Headers({ origin: 'https://www.emcasacomcecilia.com', 'sec-fetch-site': 'same-origin' })), true);
  assert.equal(isAllowedOrigin(new Headers({ origin: 'http://localhost:3000' })), true);
  assert.equal(isAllowedOrigin(new Headers()), true);
  const post = (body: BodyInit, headers: Record<string, string> = {}) =>
    dicaRoute(new Request('http://localhost/api/dica', { method: 'POST', body, headers, duplex: 'half' } as RequestInit));
  assert.equal((await post('{"q":"tem whey?"}', { origin: 'https://golpe.example' })).status, 403);
  let pulled = 0;
  const endless = new ReadableStream<Uint8Array>({
    pull(controller) {
      pulled += 1;
      controller.enqueue(new Uint8Array(1024).fill(32));
      if (pulled > 1000) controller.close();
    },
  });
  assert.equal((await post(endless)).status, 400, 'corpo sem tamanho declarado');
  assert.ok(pulled < 10, `a rota leu ${pulled} KB antes de recusar`);
  assert.equal((await post('x'.repeat(3000), { 'content-length': '3000' })).status, 400);
  assert.equal((await post('não é json')).status, 400);
  resetDicaLimitsForTests();

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
