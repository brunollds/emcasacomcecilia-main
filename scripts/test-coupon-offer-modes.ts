import assert from 'node:assert/strict';
import {
  COUPONS,
  getAllActiveCouponSlugs,
  getCouponBySlug,
  getCouponHubSections,
  getStoreCodeKind,
  type AffiliateLinkOffer,
} from '../src/lib/couponsData';

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
assert.deepEqual(
  shein.campaigns?.map(({ code, offerUrl }) => ({ code, offerUrl })),
  [
    { code: '37S3442', offerUrl: 'https://onelink.shein.com/47/5yl4fyr203o0' },
    { code: 'K49L457', offerUrl: 'https://onelink.shein.com/58/6630nfyralty' },
  ]
);
assert.ok(getAllActiveCouponSlugs().includes('shein'), 'SHEIN ativa deve gerar página de cupom');
assert.ok(!getAllActiveCouponSlugs().includes('kopenhagen'), 'Kopenhagen pausada não deve gerar página');

// O tipo do código nos artigos: o 4CW5Y da SHEIN é de indicação e o CECILIA010 da YesStyle é de recompensa;
// qualquer outro código, ou um código de outra loja, é cupom comum e fica sem tipo.
const sheinStore = getCouponBySlug('shein');
const yesStyleStore = getCouponBySlug('yesstyle');
const damieStore = getCouponBySlug('damie');
assert.ok(yesStyleStore?.offerMode === 'discount-code' && damieStore?.offerMode === 'discount-code');
assert.equal(getStoreCodeKind(sheinStore, '4CW5Y'), 'referral');
assert.equal(getStoreCodeKind(sheinStore, shein.campaigns?.[0].code), undefined, 'código de campanha da SHEIN não é o de indicação');
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

// Parceiros de 13/10/2026, a Max Titanium e a Cléa Store desde 14/10, a Belive desde 16/10, a Mais Mu desde 20/10, a Skelt desde 21/10 e a Bagaggio
// desde 22/10. Só a Probiótica, a Skelt, a Bagaggio e a Lejour mandaram link com UTM, e ele vai como veio; as outras vão ao site oficial.
const newPartners = [
  { slug: 'probiotica', code: 'PRO10EMCASACOMCECILIA', hubCategory: 'saude', offerUrl: 'https://www.probiotica.com.br?utm_source=creators&utm_medium=PRO10EMCASACOMCECILIA&utm_campaign=probi' },
  { slug: 'dr-peanut', code: 'DREMCASACOMCECILIA', hubCategory: 'saude', offerUrl: 'https://www.drpeanut.com.br/' },
  { slug: 'black-skull', code: 'CECILIA10', hubCategory: 'saude', offerUrl: 'https://www.blackskullusa.com.br/' },
  { slug: 'max-titanium', code: 'MAX10EMCASACOMCECILIA', hubCategory: 'saude', offerUrl: 'https://www.maxtitanium.com.br/' },
  { slug: 'clea-store', code: 'CSEMCASACOMCECILIA', hubCategory: 'moda', offerUrl: 'https://www.cleastore.com.br/' },
  // Belive (16/10/2026): o mesmo MAUAD da Let's Eat It, com 10% em todo o site.
  { slug: 'belive', code: 'MAUAD', hubCategory: 'alimentacao', offerUrl: 'https://belivebefree.com.br/' },
  { slug: 'mais-mu', code: 'MMEMCASACOMCECILIA', hubCategory: 'saude', offerUrl: 'https://www.lojamaismu.com.br/' },
  { slug: 'skelt', code: 'SKEMCASACOMCECILIA', hubCategory: 'beleza', offerUrl: 'https://www.skelt.com.br/?utm_source=creators&utm_medium=SKEMCASACOMCECILIA&utm_campaign=inbazz' },
  { slug: 'bagaggio', code: 'CECILIA10', hubCategory: 'moda', offerUrl: 'https://www.bagaggio.com.br/?utm_source=creators&utm_medium=emcasacomcecilia&utm_campaign=inbazz' },
] as const;
for (const partner of newPartners) {
  const store = getCouponBySlug(partner.slug);
  assert.ok(store && store.offerMode === 'discount-code', `${partner.slug} deve existir como discount-code ativo`);
  assert.equal(store.code, partner.code);
  assert.equal(store.discountNumber, 10);
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
};
for (const coupon of COUPONS) {
  const linked = coupon.faqs.filter((faq) => faq.mercadoLivreUrl);
  const expected = mercadoLivreLinks[coupon.slug];
  if (!expected) {
    assert.equal(linked.length, 0, `${coupon.slug} não tem link do Mercado Livre`);
    continue;
  }
  assert.equal(linked.length, 1, `${coupon.slug}: um link do Mercado Livre, no FAQ do Mercado Livre`);
  assert.match(linked[0].question, /Mercado Livre\?$/, `${coupon.slug}: o link vai na pergunta do Mercado Livre`);
  assert.equal(linked[0].mercadoLivreUrl, expected, `${coupon.slug}: link do Mercado Livre diferente do enviado`);
}

// Regra do Bruno (16/10/2026): todo cupom soma com as promoções vigentes da loja, e só a exceção confirmada
// aparece no texto, a Magazine Você da Magalu inclusive. A YesStyle (código de recompensa) segue regra própria, e a
// Kopenhagen está pausada.
const ownAccumulationRules = new Set(['yesstyle', 'kopenhagen']);
for (const coupon of COUPONS) {
  if (coupon.offerMode !== 'discount-code' || ownAccumulationRules.has(coupon.slug)) continue;
  assert.match(coupon.combinable, /soma com (todas )?as promoções/i, `${coupon.slug}: combinable sem a soma com as promoções`);
  const vague = coupon.faqs.find((faq) => /pode variar conforme campanha|costumam não acumular/i.test(faq.answer));
  assert.equal(vague, undefined, `${coupon.slug}: FAQ ainda diz que a soma com promoções pode variar`);
}

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

// Hostinger (19/10/2026): indicação do Bruno, com o código dentro do link. É a exceção explícita à regra das
// promoções: o desconto do link não soma com outros cupons, e só vale no primeiro período.
const hostinger = getCouponBySlug('hostinger');
assert.ok(hostinger && hostinger.offerMode === 'affiliate-link', 'Hostinger deve existir como affiliate-link');
assert.equal('code' in hostinger, false, 'Hostinger: o código vai no link, não se digita');
assert.equal(hostinger.referral, undefined);
assert.equal(hostinger.hubCategory, 'diversos');
assert.equal(hostinger.offerUrl, 'https://www.hostinger.com/br?REFERRALCODE=SONARDEOFERTAS');
assert.match(hostinger.combinable, /^Não soma com outros cupons/, 'Hostinger: a exceção à soma aparece no texto');
assert.match(hostinger.linkNote ?? '', /primeiro período/, 'Hostinger: o aviso diz que a renovação não tem o desconto');
const hostingerTexts = JSON.stringify({ ...hostinger, offerUrl: undefined });
assert.ok(!hostingerTexts.includes('SONARDEOFERTAS'), 'Hostinger: o código só vai no link, nunca no texto da página');

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

console.log("✅ coupon offer modes: SHEIN, Let's Eat It, Insider, Probiótica, Max Titanium, Dr. Peanut, Black Skull, Lejour, Cléa Store, Belive, Mais Mu, Skelt, Bagaggio, Hostinger e prateleiras do hub conferidos.");
