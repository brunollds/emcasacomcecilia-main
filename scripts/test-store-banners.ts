import assert from 'node:assert/strict';
import { getArticleCopy } from '../src/components/review/articleCopy';
import { getCouponBySlug } from '../src/lib/couponsData';
import { LOCALE_KEYS } from '../src/lib/i18n/locales';
import { readdirSync, readFileSync } from 'node:fs';
import { STORE_BANNERS, getArticleStoreBanners, isArticleBannerHref, isStoreBannerLive, placeStoreBanners, storeBannersOverlap, type StoreBanner } from '../src/lib/storeBanners';

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
const sampleBanners = [
  sample('a-top', 'a', 'top'),
  sample('a-mid-vencida', 'a', 'mid', { endsAt: '2026-11-10T23:59:59-03:00' }),
  sample('b-mid', 'b', 'mid'),
  sample('d-top-amanha', 'd', 'top', { startsAt: '2026-11-16T00:00:00-03:00', endsAt: '2026-11-16T23:59:59-03:00' }, '/reviews/artigo-d'),
  // Esquenta e Black Friday no mesmo lugar, um depois do outro, fora da ordem do arquivo.
  sample('e-black-friday', 'e', 'top', { startsAt: '2026-11-27T00:00:00-03:00', endsAt: '2026-11-30T23:59:59-03:00' }),
  sample('e-esquenta', 'e', 'top', { startsAt: '2026-11-05T00:00:00-03:00', endsAt: '2026-11-26T23:59:59-03:00' }),
];
const queueIds = (affiliate: string, slug = 'x') =>
  Object.fromEntries(Object.entries(getArticleStoreBanners(affiliate, slug, now, sampleBanners)).map(([slot, queue]) => [slot, queue.map(({ id }) => id)]));
assert.deepEqual(queueIds('a'), { top: ['a-top'] }, 'campanha vencida ou de outra loja');
assert.deepEqual(queueIds('b'), { mid: ['b-mid'] });
assert.deepEqual(queueIds('c'), {}, 'loja sem campanha');
assert.deepEqual(queueIds('d'), { top: ['d-top-amanha'] }, 'campanha que ainda vai começar');
assert.deepEqual(queueIds('d', 'artigo-d'), {}, 'banner no próprio artigo');
assert.deepEqual(queueIds('e'), { top: ['e-esquenta', 'e-black-friday'] }, 'fila na ordem do início');
assert.ok(isArticleBannerHref('/reviews/artigo-d') && !isArticleBannerHref('https://loja.com/reviews/x'));

// Sobreposição no mesmo lugar: uma começa antes de a outra acabar. Sem início, já começou; sem fim, não acaba.
const day = (d: number, h = '00:00:00') => `2026-11-${String(d).padStart(2, '0')}T${h}-03:00`;
assert.equal(storeBannersOverlap({ startsAt: day(5), endsAt: day(26, '23:59:59') }, { startsAt: day(27), endsAt: day(30) }), false, 'esquenta e Black Friday');
assert.equal(storeBannersOverlap({ startsAt: day(5), endsAt: day(27) }, { startsAt: day(27), endsAt: day(30) }), true, 'mesmo instante');
assert.equal(storeBannersOverlap({}, { startsAt: day(27) }), true, 'campanha sem datas');
assert.equal(storeBannersOverlap({ endsAt: day(10) }, { startsAt: day(11) }), false, 'sem início, acaba antes');

// O lugar 1 depois da 1ª seção; o 2 antes do FAQ ou, sem FAQ, antes da última, com uma seção inteira entre os dois.
assert.deepEqual(placeStoreBanners([], -1), {});
assert.deepEqual(placeStoreBanners(['a', 'b', 'c', 'faq'], 3), { top: 'a', mid: 'faq' });
assert.deepEqual(placeStoreBanners(['a', 'b', 'c'], -1), { top: 'a', mid: 'c' });
assert.deepEqual(placeStoreBanners(['a', 'faq', 'c'], 1), { top: 'a' }, 'FAQ logo depois da 1ª seção');
assert.deepEqual(placeStoreBanners(['a', 'b'], -1), { top: 'a' }, 'artigo de duas seções');

// Os dados: loja cadastrada, campanhas do mesmo lugar sem sobreposição, link de afiliado que vale nos 10 idiomas, datas com
// fuso e os textos dos 10 idiomas, sem o código da loja.
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
  if (isArticleBannerHref(banner.href)) {
    // O link interno só para o nosso artigo da campanha, publicado e da mesma loja, e só em campanha com fim.
    const slug = banner.href.slice('/reviews/'.length);
    const article = JSON.parse(readFileSync(`content/reviews/${slug}.json`, 'utf8'));
    assert.equal(article.affiliate, banner.affiliate, `${banner.id}: o artigo ${slug} é de outra loja`);
    assert.ok(!article.draft, `${banner.id}: o artigo ${slug} é rascunho`);
    assert.ok(banner.endsAt, `${banner.id}: banner para o artigo sem data de fim`);
  } else {
    const url = new URL(banner.href);
    assert.equal(url.protocol, 'https:', `${banner.id}: link sem https`);
    assert.ok(!url.hostname.startsWith('br.') && !url.hostname.endsWith('.com.br'), `${banner.id}: link de um país só (${url.hostname})`);
  }
  for (const date of [banner.startsAt, banner.endsAt]) {
    if (!date) continue;
    assert.match(date, /T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/, `${banner.id}: data sem hora e fuso (${date})`);
    assert.ok(!Number.isNaN(Date.parse(date)), `${banner.id}: data inválida (${date})`);
  }

  const code = store.offerMode === 'discount-code' ? store.code : undefined;
  // A etiqueta com número leva o "até" em cada idioma: o número sozinho diria um desconto fixo.
  if (banner.art.kind === 'tag') {
    for (const locale of LOCALE_KEYS) assert.ok(banner.copy[locale].tag?.trim(), `${banner.id} (${locale}): etiqueta sem o "até"`);
  }
  for (const locale of LOCALE_KEYS) {
    const copy = banner.copy[locale];
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
console.log(`banners de campanha: ${STORE_BANNERS.length} campanhas conferidas, ${STORE_BANNERS.length - expired.length} no prazo`);
