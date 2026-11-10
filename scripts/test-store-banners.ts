import assert from 'node:assert/strict';
import { getArticleCopy } from '../src/components/review/articleCopy';
import { getCouponBySlug } from '../src/lib/couponsData';
import { LOCALE_KEYS } from '../src/lib/i18n/locales';
import { readdirSync, readFileSync } from 'node:fs';
import type { CouponCopyLocale } from '../src/components/review/couponCopyLocale';
import { INTERNATIONAL_STORES, STORE_BANNERS, getArticleStoreBanners, getStorePageBanners, isArticleBannerHref, isStoreBannerLive, placeStoreBanners, storeBannersOverlap, type StoreBanner } from '../src/lib/storeBanners';
import { getSingleStoreSlug } from '../src/lib/reviewStores';

// O prazo de uma campanha com um "agora" fixo. As 23h do último dia em Brasília já são o dia seguinte em UTC:
// o banner continua no ar.
const campaignWindow = { startsAt: '2026-11-01T00:00:00-03:00', endsAt: '2026-11-30T23:59:59-03:00' };
assert.equal(isStoreBannerLive(campaignWindow, new Date('2026-10-31T23:59:59-03:00')), false, 'antes do início');
assert.equal(isStoreBannerLive(campaignWindow, new Date('2026-11-01T00:00:00-03:00')), true, 'no início');
assert.equal(isStoreBannerLive(campaignWindow, new Date('2026-11-30T23:00:00-03:00')), true, 'às 23h do último dia');
assert.equal(isStoreBannerLive(campaignWindow, new Date('2026-12-01T00:00:00-03:00')), false, 'depois do fim');
assert.equal(isStoreBannerLive({}, new Date('2030-01-01T00:00:00Z')), true, 'sem datas');

// A fila de cada lugar, só com as da loja e só as que não acabaram, na ordem do início: a que ainda vai começar entra
// (o HTML a esconde até o início), e a que leva ao próprio artigo fica de fora dele.
const sample = (id: string, affiliate: string, slot: StoreBanner['slot'], dates: Pick<StoreBanner, 'startsAt' | 'endsAt'> = {}, href?: string): StoreBanner => ({
  ...STORE_BANNERS[0],
  id,
  affiliate,
  slot,
  ...dates,
  ...(href && { href }),
});
const now = new Date('2026-11-15T12:00:00-03:00');
const day0 = (d: number) => `2026-11-${String(d).padStart(2, '0')}T00:00:00-03:00`;
const sampleBanners = [
  sample('a-top', 'a', 'top'),
  sample('a-mid-vencida', 'a', 'mid', { endsAt: '2026-11-10T23:59:59-03:00' }),
  sample('b-mid', 'b', 'mid'),
  sample('d-top-amanha', 'd', 'top', { startsAt: '2026-11-16T00:00:00-03:00', endsAt: '2026-11-16T23:59:59-03:00' }, '/reviews/artigo-d'),
  // Esquenta e Black Friday no mesmo lugar, um depois do outro, fora da ordem do arquivo.
  sample('e-black-friday', 'e', 'top', { startsAt: '2026-11-27T00:00:00-03:00', endsAt: '2026-11-30T23:59:59-03:00' }),
  sample('e-esquenta', 'e', 'top', { startsAt: '2026-11-05T00:00:00-03:00', endsAt: '2026-11-26T23:59:59-03:00' }),
];
const queueIds = (affiliate: string, slug = 'x', locale: CouponCopyLocale = 'pt', banners = sampleBanners) =>
  Object.fromEntries(Object.entries(getArticleStoreBanners(affiliate, slug, locale, now, banners)).map(([slot, queue]) => [slot, queue.map(({ id }) => id)]));
assert.deepEqual(queueIds('a'), { top: ['a-top'] }, 'campanha vencida ou de outra loja');
assert.deepEqual(queueIds('b'), { mid: ['b-mid'] });
assert.deepEqual(queueIds('c'), {}, 'loja sem campanha');
assert.deepEqual(queueIds('d'), { top: ['d-top-amanha'] }, 'campanha que ainda vai começar');
assert.deepEqual(queueIds('d', 'artigo-d'), {}, 'banner no próprio artigo');
assert.deepEqual(queueIds('e'), { top: ['e-esquenta', 'e-black-friday'] }, 'fila na ordem do início');
// Campanha só com o português sai só nos artigos em PT.
const ptOnly: StoreBanner = { ...sample('f-so-pt', 'f', 'top'), copy: { pt: STORE_BANNERS[0].copy.pt } };
assert.deepEqual(queueIds('f', 'x', 'pt', [ptOnly]), { top: ['f-so-pt'] }, 'campanha só em PT no artigo em PT');
assert.deepEqual(queueIds('f', 'x', 'en', [ptOnly]), {}, 'campanha só em PT fora do artigo em inglês');
assert.ok(isArticleBannerHref('/reviews/artigo-d') && !isArticleBannerHref('https://loja.com/reviews/x'));

// A página da loja leva todas as campanhas da loja que não acabaram, de qualquer lugar, na ordem do início: a do
// nosso artigo também (ela não está no artigo), e a só em PT só em /cupons/<loja>.
const pageIds = (affiliate: string, locale: CouponCopyLocale = 'pt', banners = sampleBanners) =>
  getStorePageBanners(affiliate, locale, now, banners).map(({ id }) => id);
assert.deepEqual(pageIds('a'), ['a-top'], 'página da loja sem a vencida');
assert.deepEqual(pageIds('d'), ['d-top-amanha'], 'página da loja com a que vai começar e a do artigo');
assert.deepEqual(pageIds('e'), ['e-esquenta', 'e-black-friday'], 'página da loja na ordem do início');
assert.deepEqual(
  pageIds('g', 'pt', [sample('g-mid', 'g', 'mid', { startsAt: day0(20) }), sample('g-top', 'g', 'top')]),
  ['g-top', 'g-mid'],
  'lugares diferentes na mesma página'
);
assert.deepEqual(pageIds('f', 'en', [ptOnly]), [], 'campanha só em PT fora da página traduzida');

// Sobreposição no mesmo lugar: uma começa antes de a outra acabar. Sem início, já começou; sem fim, não acaba.
const day = (d: number, h = '00:00:00') => `2026-11-${String(d).padStart(2, '0')}T${h}-03:00`;
assert.equal(storeBannersOverlap({ startsAt: day(5), endsAt: day(26, '23:59:59') }, { startsAt: day(27), endsAt: day(30) }), false, 'esquenta e Black Friday');
assert.equal(storeBannersOverlap({ startsAt: day(5), endsAt: day(27) }, { startsAt: day(27), endsAt: day(30) }), true, 'mesmo instante');
assert.equal(storeBannersOverlap({}, { startsAt: day(27) }), true, 'campanha sem datas');
assert.equal(storeBannersOverlap({ endsAt: day(10) }, { startsAt: day(11) }), false, 'sem início, acaba antes');

// Campanha sem fim não some sozinha, e a loja pode ter encerrado sem ninguém ver: a que passou 7 dias ou mais sem
// conferência entra no aviso do fim do teste, para a reconferência da rodada. O dia é o de Brasília (-03:00, sem
// horário de verão).
const RECHECK_AFTER_DAYS = 7;
const brasiliaDay = (date: Date) => new Date(date.getTime() - 3 * 3_600_000).toISOString().slice(0, 10);
const daysBetween = (from: string, to: string) => Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
const openEndedToRecheck = (banners: StoreBanner[], today: string) =>
  banners
    .filter((banner) => !banner.endsAt)
    .map(({ id, verifiedAt }) => ({ id, days: daysBetween(verifiedAt, today) }))
    .filter(({ days }) => days >= RECHECK_AFTER_DAYS)
    .sort((a, b) => b.days - a.days || a.id.localeCompare(b.id));
const recheckWarning = (banners: StoreBanner[], today: string) => {
  const list = openEndedToRecheck(banners, today);
  if (!list.length) return null;
  return `campanhas sem fim, conferidas há ${RECHECK_AFTER_DAYS} dias ou mais, para reconferir na rodada: ${list.map(({ id, days }) => `${id} (${days} dias)`).join(', ')}`;
};

// Às 23h59 de domingo em Brasília já é segunda em UTC.
assert.equal(brasiliaDay(new Date('2026-11-09T02:59:59Z')), '2026-11-08', '23h59 em Brasília');
assert.equal(brasiliaDay(new Date('2026-11-09T03:00:00Z')), '2026-11-09', 'meia-noite em Brasília');
// A campanha com fim e a conferida há menos de 7 dias ficam fora do aviso. O `sample` herda as datas de uma campanha
// real: aqui o que não vem em `dates` fica sem início e sem fim.
const checked = (id: string, verifiedAt: string, dates: Pick<StoreBanner, 'startsAt' | 'endsAt'> = {}): StoreBanner => ({
  ...sample(id, 'h', 'top', { startsAt: undefined, endsAt: undefined, ...dates }),
  verifiedAt,
});
const toRecheck = [
  checked('conferida-ha-6-dias', '2026-11-09'),
  checked('conferida-ha-7-dias', '2026-11-08'),
  checked('a-mesma-idade', '2026-11-08'),
  checked('agendada-sem-fim', '2026-11-01', { startsAt: day(27) }),
  checked('com-fim', '2026-10-01', { endsAt: day(30, '23:59:59') }),
  checked('conferida-ha-12-dias', '2026-11-03'),
];
assert.deepEqual(
  openEndedToRecheck(toRecheck, '2026-11-15'),
  [
    { id: 'agendada-sem-fim', days: 14 },
    { id: 'conferida-ha-12-dias', days: 12 },
    { id: 'a-mesma-idade', days: 7 },
    { id: 'conferida-ha-7-dias', days: 7 },
  ],
  'sem fim e sem conferência há 7 dias ou mais, a mais antiga primeiro e, no empate, pelo id'
);
assert.equal(
  recheckWarning(toRecheck, '2026-11-15'),
  'campanhas sem fim, conferidas há 7 dias ou mais, para reconferir na rodada: agendada-sem-fim (14 dias), conferida-ha-12-dias (12 dias), a-mesma-idade (7 dias), conferida-ha-7-dias (7 dias)',
  'texto do aviso'
);
assert.equal(recheckWarning([toRecheck[0], toRecheck[4]], '2026-11-15'), null, 'nada a reconferir: sem aviso');

// O lugar 1 depois da 1ª seção; o 2 antes do FAQ ou, sem FAQ, antes da última, com uma seção inteira entre os dois.
assert.deepEqual(placeStoreBanners([], -1), {});
assert.deepEqual(placeStoreBanners(['a', 'b', 'c', 'faq'], 3), { top: 'a', mid: 'faq', end: 'faq' }, 'end depois do FAQ');
assert.deepEqual(placeStoreBanners(['a', 'b', 'c', 'd', 'faq', 'f'], 4), { top: 'a', mid: 'faq', end: 'f' }, 'FAQ no meio do corpo');
assert.deepEqual(placeStoreBanners(['a', 'b', 'c', 'd'], -1), { top: 'a', mid: 'd', end: 'd' }, 'sem FAQ: antes e depois da última');
assert.deepEqual(placeStoreBanners(['a', 'b', 'c'], -1), { top: 'a', mid: 'c' }, 'artigo de três seções, sem o end');
assert.deepEqual(placeStoreBanners(['a', 'faq', 'c'], 1), { top: 'a' }, 'FAQ logo depois da 1ª seção');
assert.deepEqual(placeStoreBanners(['a', 'b'], -1), { top: 'a' }, 'artigo de duas seções');

// Os dados: loja cadastrada, campanhas do mesmo lugar sem sobreposição, datas com fuso e os textos sem o código da loja.
// A campanha tem só o português (sai só nos artigos em PT e pode levar à loja brasileira) ou os 10 idiomas (sai em
// todas as versões, com um link que vale em todas).
// Uma campanha por arquivo, com o nome igual ao id, e o módulo gerado com todas elas.
const campaignFiles = readdirSync('content/campanhas').filter((file) => file.endsWith('.json'));
assert.deepEqual(
  STORE_BANNERS.map(({ id }) => `${id}.json`).sort(),
  [...campaignFiles].sort(),
  'src/lib/generated/store-banners.ts diferente de content/campanhas/: rode node scripts/content/build-index.mjs'
);
const ids = new Set<string>();
for (const banner of STORE_BANNERS) {
  assert.ok(!ids.has(banner.id), `${banner.id}: id repetido`);
  ids.add(banner.id);
  assert.ok(campaignFiles.includes(`${banner.id}.json`), `${banner.id}: sem o arquivo content/campanhas/${banner.id}.json`);
  assert.ok(banner.source.trim(), `${banner.id}: sem a fonte da campanha`);
  assert.match(banner.verifiedAt, /^\d{4}-\d{2}-\d{2}$/, `${banner.id}: verifiedAt fora do formato AAAA-MM-DD`);
  assert.ok(banner.verifiedAt <= new Date().toISOString().slice(0, 10), `${banner.id}: verifiedAt no futuro`);
  const clash = STORE_BANNERS.find(
    (other) => other.id !== banner.id && other.affiliate === banner.affiliate && other.slot === banner.slot && storeBannersOverlap(banner, other)
  );
  assert.ok(!clash, `${banner.id}: no ar ao mesmo tempo que ${clash?.id} no lugar ${banner.affiliate}/${banner.slot}`);

  const store = getCouponBySlug(banner.affiliate);
  assert.ok(store, `${banner.id}: loja ${banner.affiliate} fora de couponsData.ts`);
  const languages = Object.keys(banner.copy) as CouponCopyLocale[];
  const ptOnlyBanner = languages.length === 1;
  assert.ok(
    ptOnlyBanner ? languages[0] === 'pt' : [...languages].sort().join() === [...LOCALE_KEYS].sort().join(),
    `${banner.id}: textos em ${languages.join(', ')}; a campanha leva só o pt ou os 10 idiomas`
  );
  if (isArticleBannerHref(banner.href)) {
    // O link interno só para o nosso artigo da campanha, publicado e da mesma loja, e só em campanha com fim.
    const slug = banner.href.slice('/reviews/'.length);
    const article = JSON.parse(readFileSync(`content/reviews/${slug}.json`, 'utf8'));
    // O artigo de várias lojas não recebe banner, nem como destino.
    assert.equal(getSingleStoreSlug(article), banner.affiliate, `${banner.id}: o artigo ${slug} é de outra loja ou de várias`);
    assert.ok(!article.draft, `${banner.id}: o artigo ${slug} é rascunho`);
    assert.ok(banner.endsAt, `${banner.id}: banner para o artigo sem data de fim`);
  } else {
    const url = new URL(banner.href);
    assert.equal(url.protocol, 'https:', `${banner.id}: link sem https`);
    if (!ptOnlyBanner && !INTERNATIONAL_STORES.has(banner.affiliate)) {
      assert.ok(!url.hostname.startsWith('br.') && !url.hostname.endsWith('.com.br'), `${banner.id}: link de um país só (${url.hostname}) numa campanha dos 10 idiomas`);
    }
  }
  for (const date of [banner.startsAt, banner.endsAt]) {
    if (!date) continue;
    assert.match(date, /T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/, `${banner.id}: data sem hora e fuso (${date})`);
    assert.ok(!Number.isNaN(Date.parse(date)), `${banner.id}: data inválida (${date})`);
  }

  const code = store.offerMode === 'discount-code' ? store.code : undefined;
  // O código da campanha é o da própria loja, de pesquisar no app: nunca o nosso (cupom, recompensa ou indicação).
  if (banner.code !== undefined) {
    assert.match(banner.code, /^[A-Z0-9]{4,20}$/, `${banner.id}: código da campanha fora do formato`);
    assert.ok(![code, store.referral?.code].includes(banner.code), `${banner.id}: o código da campanha é o nosso código da loja`);
  }
  // A etiqueta com número leva o "até" em cada idioma: o número sozinho diria um desconto fixo.
  if (banner.art.kind === 'tag') {
    for (const locale of languages) assert.ok(banner.copy[locale]?.tag?.trim(), `${banner.id} (${locale}): etiqueta sem o "até"`);
  }
  for (const locale of languages) {
    const copy = banner.copy[locale]!;
    for (const [field, value] of Object.entries(copy)) {
      assert.ok(value.trim(), `${banner.id} (${locale}): ${field} vazio`);
      if (code) assert.ok(!value.includes(code), `${banner.id} (${locale}): ${field} cita o código ${code}`);
      if (locale !== 'pt') assert.notEqual(value, banner.copy.pt[field as keyof typeof copy], `${banner.id} (${locale}): ${field} igual ao PT`);
    }
    assert.ok(getArticleCopy(locale).adLabel.trim(), `${locale}: selo do banner vazio`);
  }
}

// Campanha vencida não para o build: ela some do HTML sozinha. O aviso é para apagar o arquivo dela.
const expired = STORE_BANNERS.filter((banner) => banner.endsAt && Date.parse(banner.endsAt) < Date.now());
if (expired.length) {
  console.warn(`campanhas vencidas, para apagar de content/campanhas/: ${expired.map(({ id }) => `${id}.json`).join(', ')}`);
}
// A sem fim também não para o build. O aviso é para ver se a loja ainda a mantém e, se sim, avançar o verifiedAt.
const recheck = recheckWarning(STORE_BANNERS, brasiliaDay(new Date()));
if (recheck) console.warn(recheck);
console.log(`banners de campanha: ${STORE_BANNERS.length} campanhas conferidas, ${STORE_BANNERS.length - expired.length} no prazo`);
