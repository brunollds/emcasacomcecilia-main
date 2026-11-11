import assert from 'node:assert/strict';
import {
  COUPONS,
  getAllActiveCouponSlugs,
  getCouponBySlug,
  getCouponHubSections,
  getPendingLimitedCodes,
  getStoreCodeKind,
  MERCADO_LIVRE_COUPONS_URL,
  type AffiliateLinkOffer,
} from '../src/lib/couponsData';
import { getOfferMonth } from '../src/lib/offerMonth';

const shein = COUPONS.find((coupon) => coupon.slug === 'shein');
assert.ok(shein && shein.offerMode === 'affiliate-link', 'SHEIN deve existir como affiliate-link');
assert.equal('code' in shein, false, 'SHEIN não pode expor referral como coupon.code');
assert.equal('discountNumber' in shein, false, 'SHEIN não tem percentual fixo para o schema da oferta');
assert.equal(shein.affiliateAccountId, '6177013015');
assert.equal(shein.referral?.code, '4CW5Y');
assert.equal(shein.referral?.verifiedAt, '2026-09-01');
const sheinOfferUrl = new URL(shein.offerUrl);
assert.equal(sheinOfferUrl.hostname, 'br.shein.com');
assert.equal(sheinOfferUrl.searchParams.get('koc_id'), '6177013015');
assert.equal(sheinOfferUrl.searchParams.get('search_words'), '4CW5Y');
assert.ok(getAllActiveCouponSlugs().includes('shein'), 'SHEIN ativa deve gerar página de cupom');
assert.ok(!getAllActiveCouponSlugs().includes('kopenhagen'), 'Kopenhagen pausada não deve gerar página');

// O tipo do código nos artigos: o 4CW5Y da SHEIN é de indicação e o CECILIA010 da YesStyle é de recompensa;
// qualquer outro código, ou um código de outra loja, é cupom comum e fica sem tipo.
const sheinStore = getCouponBySlug('shein');
const yesStyleStore = getCouponBySlug('yesstyle');
const damieStore = getCouponBySlug('damie');
assert.ok(yesStyleStore?.offerMode === 'discount-code' && damieStore?.offerMode === 'discount-code');
assert.equal(getStoreCodeKind(sheinStore, '4CW5Y'), 'referral');
assert.equal(getStoreCodeKind(sheinStore, '37S3442'), undefined, 'código de campanha da SHEIN não é o de indicação');
assert.equal(getStoreCodeKind(sheinStore, 'CECILIA010'), undefined, 'código de outra loja na SHEIN');
assert.equal(getStoreCodeKind(yesStyleStore, yesStyleStore.code), 'reward');
assert.equal(getStoreCodeKind(damieStore, damieStore.code), undefined, 'cupom comum não tem tipo');
assert.equal(getStoreCodeKind(damieStore, '4CW5Y'), undefined, 'código de indicação numa loja que não é a SHEIN');
assert.equal(getStoreCodeKind(undefined, '4CW5Y'), undefined, 'artigo sem loja');
assert.equal(getStoreCodeKind(sheinStore, undefined), undefined, 'artigo sem código');

const letsEatIt = COUPONS.find((coupon) => coupon.slug === 'letseatit');
assert.ok(letsEatIt && letsEatIt.offerMode === 'discount-code', "Let's Eat It deve existir como discount-code");
assert.equal(letsEatIt.code, 'MAUAD');
assert.equal(letsEatIt.discountNumber, 5);
// A comissão da parceria é atribuída pelos UTMs da Inbazz; perder um deles quebra o rastreio.
const letsEatItOfferUrl = new URL(letsEatIt.offerUrl);
assert.equal(letsEatItOfferUrl.hostname, 'letseatit.com.br');
assert.equal(letsEatItOfferUrl.searchParams.get('utm_source'), 'embaixador');
assert.equal(letsEatItOfferUrl.searchParams.get('utm_medium'), 'emcasacomcecilia');
assert.equal(letsEatItOfferUrl.searchParams.get('utm_campaign'), 'inbazz');
assert.equal(letsEatItOfferUrl.searchParams.get('utm_content'), 'organico');
assert.ok(getAllActiveCouponSlugs().includes('letseatit'), "Let's Eat It ativa deve gerar página de cupom");

const insider = COUPONS.find((coupon) => coupon.slug === 'insider');
assert.ok(insider && insider.offerMode === 'discount-code', 'Insider deve existir como discount-code');
assert.equal(insider.code, 'EMCASACOMCECILIA');
assert.equal(insider.discountNumber, 15);
assert.equal(insider.discount, '15% OFF');
// Link da Influ como veio: o parâmetro cupom= aplica o código no carrinho e os UTMs atribuem a comissão.
assert.equal(
  insider.offerUrl,
  'https://www.insiderstore.com.br/discount/EMCASACOMCECILIA?redirect=/collections/outlet/?utm_source=influmkt&utm_medium=3c994aaa&utm_campaign=EMCASACOMCECILIA&cupom=EMCASACOMCECILIA'
);
assert.equal(
  COUPONS.findIndex((coupon) => coupon.slug === 'insider'),
  COUPONS.findIndex((coupon) => coupon.slug === 'letseatit') + 1,
  "Insider vem logo depois da Let's Eat It"
);
assert.ok(getAllActiveCouponSlugs().includes('insider'), 'Insider ativa deve gerar página de cupom');

// Parceiros de 13/10/2026, a Max Titanium e a Cléa Store desde 14/10, a Belive desde 16/10, a Mais Mu desde 20/10, a Skelt desde 21/10, a Bagaggio
// desde 22/10, a Toda Up desde 26/10, a Simple Organic desde 03/11, a HolyFoods desde 05/11 e a Petz desde 11/11. Só a Probiótica, a Skelt, a Bagaggio, a Toda Up,
// a Simple Organic, a HolyFoods, a Petz e a Lejour mandaram link próprio, e ele vai como veio; as outras vão ao site oficial. O link da Toda Up também abre o site com o MAUAD aplicado, e o da Simple Organic, com o S-EMCASACOMCECILIA.
const newPartners = [
  { slug: 'probiotica', code: 'PRO10EMCASACOMCECILIA', discountNumber: 10, hubCategory: 'saude', offerUrl: 'https://www.probiotica.com.br?utm_source=creators&utm_medium=PRO10EMCASACOMCECILIA&utm_campaign=probi' },
  { slug: 'dr-peanut', code: 'DREMCASACOMCECILIA', discountNumber: 10, hubCategory: 'saude', offerUrl: 'https://www.drpeanut.com.br/' },
  { slug: 'black-skull', code: 'CECILIA10', discountNumber: 10, hubCategory: 'saude', offerUrl: 'https://www.blackskullusa.com.br/' },
  { slug: 'max-titanium', code: 'MAX10EMCASACOMCECILIA', discountNumber: 10, hubCategory: 'saude', offerUrl: 'https://www.maxtitanium.com.br/' },
  { slug: 'clea-store', code: 'CSEMCASACOMCECILIA', discountNumber: 10, hubCategory: 'moda', offerUrl: 'https://www.cleastore.com.br/' },
  // Belive (16/10/2026): o mesmo MAUAD da Let's Eat It, com 10% em todo o site.
  { slug: 'belive', code: 'MAUAD', discountNumber: 10, hubCategory: 'alimentacao', offerUrl: 'https://belivebefree.com.br/' },
  { slug: 'mais-mu', code: 'MMEMCASACOMCECILIA', discountNumber: 10, hubCategory: 'saude', offerUrl: 'https://www.lojamaismu.com.br/' },
  { slug: 'skelt', code: 'SKEMCASACOMCECILIA', discountNumber: 10, hubCategory: 'beleza', offerUrl: 'https://www.skelt.com.br/?utm_source=creators&utm_medium=SKEMCASACOMCECILIA&utm_campaign=inbazz' },
  { slug: 'bagaggio', code: 'CECILIA10', discountNumber: 10, hubCategory: 'moda', offerUrl: 'https://www.bagaggio.com.br/?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz' },
  { slug: 'toda-up', code: 'MAUAD', discountNumber: 10, hubCategory: 'moda', offerUrl: 'https://todaup.com/discount/MAUAD?redirect=/collections/squad-toda-up&utm_campaign=fluxoinfluenciadoras&utm_content=mensagem1&utm_medium=influs&utm_source=influs&utm_term=comissao' },
  { slug: 'simple-organic', code: 'S-EMCASACOMCECILIA', discountNumber: 5, hubCategory: 'beleza', offerUrl: 'https://simpleorganic.com.br//discount/S-EMCASACOMCECILIA' },
  { slug: 'holyfoods', code: 'EMCASA', discountNumber: 15, hubCategory: 'alimentacao', offerUrl: 'https://www.holyfoods.com.br/?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz' },
  { slug: 'petz', code: 'EMCASA', discountNumber: 10, hubCategory: 'diversos', offerUrl: 'https://petz.com.br/parceiro/emcasa' },
] as const;
for (const partner of newPartners) {
  const store = getCouponBySlug(partner.slug);
  assert.ok(store && store.offerMode === 'discount-code', `${partner.slug} deve existir como discount-code ativo`);
  assert.equal(store.code, partner.code);
  assert.equal(store.discountNumber, partner.discountNumber);
  assert.equal(store.hubCategory, partner.hubCategory);
  assert.equal(store.offerUrl, partner.offerUrl);
}
// O desconto da Probiótica e o da Max Titanium chegam a 10% mas variam por produto: a página precisa dizer isso.
for (const slug of ['probiotica', 'max-titanium']) {
  assert.match(getCouponBySlug(slug)?.monthlyHighlight?.note ?? '', /pode ser menor/, `${slug} sem o aviso de até 10%`);
}

// Links de afiliado das marcas no Mercado Livre (Bruno, 16/10/2026), cada um no FAQ "vale no Mercado Livre?"
// da loja e como veio: um caractere a menos e a comissão se perde.
const mercadoLivreLinks: Record<string, string> = {
  'clea-store': 'https://meli.la/1t3kn5d',
  'dr-peanut': 'https://meli.la/1wNsKJB',
  'black-skull': 'https://meli.la/1R7Zwan',
  'max-titanium': 'https://meli.la/2wysiEJ',
  damie: 'https://meli.la/25cdWK4',
  insider: 'https://meli.la/2TijWRi',
  'dolce-gusto': 'https://meli.la/1Dj5ZpJ',
  'nestle-nutre': 'https://meli.la/2zH895L',
  'i-wanna-sleep': 'https://meli.la/33vyTDP',
  probiotica: 'https://meli.la/1U1ttvv',
  letseatit: 'https://meli.la/1RHKLYr',
  belive: 'https://meli.la/2xDjP2k',
  'mais-mu': 'https://meli.la/24RjvdP',
  skelt: 'https://meli.la/2unTb7k',
  bagaggio: 'https://meli.la/2KeydkG',
  holyfoods: 'https://meli.la/2mjWEVp',
};
for (const coupon of COUPONS) {
  const linked = coupon.faqs.filter((faq) => faq.mercadoLivreUrl);
  const mlCoupons = coupon.faqs.filter((faq) => faq.link?.href === MERCADO_LIVRE_COUPONS_URL);
  const expected = mercadoLivreLinks[coupon.slug];
  if (!expected) {
    assert.equal(linked.length, 0, `${coupon.slug} não tem link do Mercado Livre`);
    assert.equal(mlCoupons.length, 0, `${coupon.slug}: sem link do Mercado Livre, sem a pergunta dos cupons do Mercado Livre`);
    continue;
  }
  assert.equal(linked.length, 1, `${coupon.slug}: um link do Mercado Livre, no FAQ do Mercado Livre`);
  assert.match(linked[0].question, /Mercado Livre\?$/, `${coupon.slug}: o link vai na pergunta do Mercado Livre`);
  assert.equal(linked[0].mercadoLivreUrl, expected, `${coupon.slug}: link do Mercado Livre diferente do enviado`);
  // Logo depois dela, a pergunta que leva aos cupons do Mercado Livre no Dicas & Ofertas.
  const next = coupon.faqs[coupon.faqs.indexOf(linked[0]) + 1];
  assert.deepEqual(mlCoupons, [next], `${coupon.slug}: a pergunta dos cupons do Mercado Livre vem logo depois da do Mercado Livre`);
  assert.equal(next.question, `Tem cupom da ${coupon.brand} para usar no Mercado Livre?`);
}
assert.equal(MERCADO_LIVRE_COUPONS_URL, 'https://dicas.emcasacomcecilia.com/cupons/mercado-livre/');

// Regra do Bruno (16/10/2026): todo cupom soma com as promoções vigentes da loja, e só a exceção confirmada
// aparece no texto, a Magazine Você da Magalu inclusive. A YesStyle (código de recompensa) segue regra própria, e a
// Kopenhagen está pausada. A Petz é a exceção confirmada (teste de 11/11/2026): o EMCASA não soma com promoção, e a
// sacola fica com o desconto maior em cada item.
const ownAccumulationRules = new Set(['yesstyle', 'kopenhagen', 'petz']);
for (const coupon of COUPONS) {
  if (coupon.offerMode !== 'discount-code' || ownAccumulationRules.has(coupon.slug)) continue;
  assert.match(coupon.combinable, /soma com (todas )?as promoções/i, `${coupon.slug}: combinable sem a soma com as promoções`);
  const vague = coupon.faqs.find((faq) => /pode variar conforme campanha|costumam não acumular/i.test(faq.answer));
  assert.equal(vague, undefined, `${coupon.slug}: FAQ ainda diz que a soma com promoções pode variar`);
}

const petzCoupon = getCouponBySlug('petz');
assert.match(petzCoupon?.combinable ?? '', /^Não soma com promoções/, 'petz: combinable deve dizer que não soma com promoções');

// A Lejour é só indicação: cadastro pelo link, sem código nem desconto.
const lejour = getCouponBySlug('lejour');
assert.ok(lejour && lejour.offerMode === 'affiliate-link', 'Lejour deve existir como affiliate-link');
assert.equal('code' in lejour, false);
assert.equal(lejour.referral, undefined);
assert.equal(lejour.hubCategory, 'casa');
assert.equal(
  lejour.offerUrl,
  'https://painel.lejour.com.br/onboarding/inicio?affiliate=emcasacomcecilia&source=the-coachers'
);

// Hostinger (29/10/2026): programa de agências do Bruno. O SONAR20 vale digitado no carrinho e também vai no
// link de indicação; o código antigo (SONARDEOFERTAS) não pode sobrar em lugar nenhum.
const hostinger = getCouponBySlug('hostinger');
assert.ok(hostinger && hostinger.offerMode === 'discount-code', 'Hostinger deve existir como loja de código');
assert.equal(hostinger.code, 'SONAR20');
assert.equal(hostinger.discountNumber, 20);
assert.equal(hostinger.referral, undefined);
assert.equal(hostinger.hubCategory, 'diversos');
assert.equal(hostinger.offerUrl, 'https://www.hostinger.com/br?REFERRALCODE=SONAR20');
assert.ok(!JSON.stringify(hostinger).includes('SONARDEOFERTAS'), 'Hostinger: o código antigo sobrou nos dados');

// "Cupom testado em" só vale com o teste registrado: toda loja com código precisa do testNote. A
// YesStyle fica de fora porque o código é de recompensa e a página dela é outra.
const untested = COUPONS.filter(
  (coupon) => coupon.status === 'ativo' && coupon.offerMode === 'discount-code' && !coupon.codeKind && !coupon.testNote?.trim()
).map((coupon) => coupon.slug);
assert.deepEqual(untested, [], `Lojas com código sem testNote: ${untested.join(', ')}`);

// Hub /cupons: a DAMIE abre os Destaques por ser a maior receita, e a Dolce Gusto vem logo depois.
const hub = getCouponHubSections();
assert.deepEqual(
  hub.featured.map((coupon) => coupon.slug),
  ['damie', 'dolce-gusto'],
  'Destaques: DAMIE primeiro, Dolce Gusto em seguida'
);
const shelved = hub.categories.flatMap((category) => category.coupons.map((coupon) => coupon.slug));
assert.deepEqual(
  [...shelved].sort(),
  [...getAllActiveCouponSlugs()].sort(),
  'Todo cupom ativo aparece em exatamente uma prateleira do hub'
);
const shelfOf = (slug: string) =>
  hub.categories.find((category) => category.coupons.some((coupon) => coupon.slug === slug))?.id;
assert.equal(shelfOf('damie'), 'casa', 'Destaque continua também na prateleira dele');
assert.equal(shelfOf('shein'), 'moda', 'Oferta por link entra numa prateleira como os códigos');
assert.ok(
  hub.categories.every((category) => category.coupons.length > 0),
  'Prateleira sem cupom ativo não aparece'
);

const source = COUPONS.find((coupon) => coupon.offerMode === 'discount-code');
assert.ok(source, 'É necessário ao menos um discount-code para montar o teste');

const {
  offerMode: _offerMode,
  code: _code,
  discountNumber: _discountNumber,
  codeFieldLabel: _codeFieldLabel,
  codeInstructions: _codeInstructions,
  history: _history,
  tiers: _tiers,
  ...base
} = source;

const affiliateLinkOffer: AffiliateLinkOffer = {
  ...base,
  offerMode: 'affiliate-link',
  slug: '__test-affiliate-link__',
  brand: 'Oferta por link de teste',
  discount: 'Benefício disponível pelo link',
  status: 'ativo',
  featured: false,
  hubCategory: 'diversos',
};

COUPONS.push(affiliateLinkOffer);

try {
  const withAffiliateLink = getCouponHubSections();
  const diversos = withAffiliateLink.categories.find((category) => category.id === 'diversos');
  assert.ok(
    diversos?.coupons.some((coupon) => coupon.slug === affiliateLinkOffer.slug),
    'Oferta por link nova entra na prateleira indicada'
  );
  assert.ok(
    !withAffiliateLink.featured.some((coupon) => coupon.slug === affiliateLinkOffer.slug),
    'Só entra nos Destaques quem tem featured'
  );
  assert.equal('code' in affiliateLinkOffer, false);
  assert.equal('discountNumber' in affiliateLinkOffer, false);
} finally {
  const testIndex = COUPONS.findIndex((coupon) => coupon.slug === affiliateLinkOffer.slug);
  if (testIndex !== -1) COUPONS.splice(testIndex, 1);
}

// Mês da oferta (docs/MANUTENCAO-MENSAL.md, "Antecipar o mês"): teste do dia 20 em diante vale para o mês
// seguinte, e o mês no fim do título é sempre o mês da oferta, nunca um mês sem teste.
assert.deepEqual(getOfferMonth('2026-10-19'), { year: 2026, month: 10 });
assert.deepEqual(getOfferMonth('2026-10-20'), { year: 2026, month: 11 });
assert.deepEqual(getOfferMonth('2026-12-28'), { year: 2027, month: 1 });
const TITLE_MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
for (const coupon of COUPONS.filter((item) => item.status === 'ativo')) {
  const titleMonth = coupon.metaTitle?.match(/\(([a-z]{3})\/(\d{4})\)$/);
  if (!titleMonth || !coupon.lastVerified) continue;
  const { year, month } = getOfferMonth(coupon.lastVerified);
  assert.equal(
    `${titleMonth[1]}/${titleMonth[2]}`,
    `${TITLE_MONTHS[month - 1]}/${year}`,
    `${coupon.slug}: o mês do título não é o mês da oferta testada em ${coupon.lastVerified}`
  );
}

// Códigos com prazo: horário de Brasília, prazos que não se cruzam, código diferente do de sempre e teste antes do
// prazo. O vencido não quebra o build (o navegador já o esconde), mas avisa para tirar o item.
const BRASILIA_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}-03:00$/;
for (const coupon of COUPONS) {
  if (coupon.offerMode !== 'discount-code' || !coupon.limitedCodes) continue;
  assert.ok(!coupon.tiers, `${coupon.slug}: loja com faixas não leva código com prazo`);
  const windows = [...coupon.limitedCodes].sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  windows.forEach((item, index) => {
    const label = `${coupon.slug} ${item.code} (${item.startsAt})`;
    assert.match(item.code, /^[A-Z0-9]{4,30}$/, `${label}: código fora do formato`);
    assert.notEqual(item.code, coupon.code, `${label}: é o código de sempre da loja`);
    assert.match(item.startsAt, BRASILIA_TIME, `${label}: início sem -03:00`);
    assert.match(item.endsAt, BRASILIA_TIME, `${label}: fim sem -03:00`);
    assert.ok(Date.parse(item.startsAt) < Date.parse(item.endsAt), `${label}: o fim vem antes do início`);
    assert.match(item.testedAt, /^\d{4}-\d{2}-\d{2}$/, `${label}: testedAt fora do formato`);
    assert.ok(item.testedAt <= item.endsAt.slice(0, 10), `${label}: teste depois do prazo`);
    assert.ok(item.testNote && !item.testNote.endsWith('.'), `${label}: testNote vazio ou com ponto final`);
    const next = windows[index + 1];
    if (next) assert.ok(Date.parse(item.endsAt) < Date.parse(next.startsAt), `${label}: o prazo cruza o do ${next.code}`);
  });
  const ended = coupon.limitedCodes.length - getPendingLimitedCodes(coupon).length;
  if (ended > 0) console.warn(`⚠️ ${coupon.slug}: ${ended} código(s) com prazo vencido(s); tire de limitedCodes em couponsData.ts.`);
}
// O getPendingLimitedCodes num cupom montado aqui, com datas fixas: os dados reais perdem os itens que vencem.
const sampleBase = COUPONS.find((item) => item.offerMode === 'discount-code' && !item.tiers);
assert.ok(sampleBase && sampleBase.offerMode === 'discount-code', 'nenhuma loja de código sem faixas para o teste');
const sampleWindow = (code: string, startsAt: string, endsAt: string) => ({
  code,
  discount: '15% OFF',
  startsAt,
  endsAt,
  testedAt: '2026-01-01',
  testNote: 'deu 15% no carrinho',
});
const sample = {
  ...sampleBase,
  limitedCodes: [
    sampleWindow('PRAZOUM', '2026-01-05T00:00:00-03:00', '2026-01-08T23:59:59-03:00'),
    sampleWindow('PRAZODOIS', '2026-01-20T00:00:00-03:00', '2026-01-21T23:59:59-03:00'),
  ],
};
const pendingAt = (iso: string) => getPendingLimitedCodes(sample, Date.parse(iso)).map((item) => [item.code, item.inHtml]);
assert.deepEqual(pendingAt('2026-01-01T12:00:00-03:00'), [['PRAZOUM', false], ['PRAZODOIS', false]], 'antes do prazo: no payload, fora do HTML');
assert.deepEqual(pendingAt('2026-01-04T23:59:59-03:00'), [['PRAZOUM', false], ['PRAZODOIS', false]], 'o segundo antes do início ainda fica fora do HTML');
assert.deepEqual(pendingAt('2026-01-05T00:00:00-03:00'), [['PRAZOUM', true], ['PRAZODOIS', false]], 'o início exato já vai ao HTML');
assert.deepEqual(pendingAt('2026-01-06T12:00:00-03:00'), [['PRAZOUM', true], ['PRAZODOIS', false]], 'no 1º prazo: ele no HTML, o 2º só no payload');
assert.deepEqual(pendingAt('2026-01-08T23:59:59-03:00'), [['PRAZOUM', true], ['PRAZODOIS', false]], 'o último segundo do prazo ainda vale');
assert.deepEqual(pendingAt('2026-01-09T00:00:00-03:00'), [['PRAZODOIS', false]], 'o vencido sai do build');
assert.deepEqual(pendingAt('2026-01-20T08:00:00-03:00'), [['PRAZODOIS', true]]);
assert.deepEqual(pendingAt('2026-01-22T00:00:00-03:00'), []);
// Loja de link com prazos colados à força: o offerMode é que barra, não a falta do campo.
const linkWithWindows = { ...shein, limitedCodes: sample.limitedCodes } as AffiliateLinkOffer;
assert.deepEqual(getPendingLimitedCodes(linkWithWindows, Date.parse('2026-01-06T12:00:00-03:00')), [], 'loja de link não tem código com prazo');

console.log("✅ coupon offer modes: SHEIN, Let's Eat It, Insider, Probiótica, Max Titanium, Dr. Peanut, Black Skull, Lejour, Cléa Store, Belive, Mais Mu, Skelt, Bagaggio, Toda Up, Simple Organic, HolyFoods, Petz, Hostinger e prateleiras do hub conferidos.");
