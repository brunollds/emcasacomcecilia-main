import assert from 'node:assert/strict';
import { getArticleCopy } from '../src/components/review/articleCopy';
import { getCouponBySlug } from '../src/lib/couponsData';
import { LOCALE_KEYS } from '../src/lib/i18n/locales';
import { readFileSync } from 'node:fs';
import { STORE_BANNERS, getArticleStoreBanners, isArticleBannerHref, isStoreBannerLive, placeStoreBanners, type StoreBanner } from '../src/lib/storeBanners';

// O prazo de uma campanha com um "agora" fixo. As 23h do último dia em Brasília já são o dia seguinte em UTC:
// o banner continua no ar.
const campaignWindow = { startsAt: '2026-11-01T00:00:00-03:00', endsAt: '2026-11-30T23:59:59-03:00' };
assert.equal(isStoreBannerLive(campaignWindow, new Date('2026-10-31T23:59:59-03:00')), false, 'antes do início');
assert.equal(isStoreBannerLive(campaignWindow, new Date('2026-11-01T00:00:00-03:00')), true, 'no início');
assert.equal(isStoreBannerLive(campaignWindow, new Date('2026-11-30T23:00:00-03:00')), true, 'às 23h do último dia');
assert.equal(isStoreBannerLive(campaignWindow, new Date('2026-12-01T00:00:00-03:00')), false, 'depois do fim');
assert.equal(isStoreBannerLive({}, new Date('2030-01-01T00:00:00Z')), true, 'sem datas');

// Uma campanha por lugar, só as da loja e só as que não acabaram: a que ainda vai começar entra (o HTML a esconde até
// o início), e a que leva ao próprio artigo fica de fora dele.
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
];
assert.deepEqual(Object.keys(getArticleStoreBanners('a', 'x', now, sampleBanners)), ['top'], 'campanha vencida ou de outra loja');
assert.equal(getArticleStoreBanners('b', 'x', now, sampleBanners).mid?.id, 'b-mid');
assert.deepEqual(getArticleStoreBanners('c', 'x', now, sampleBanners), {}, 'loja sem campanha');
assert.equal(getArticleStoreBanners('d', 'x', now, sampleBanners).top?.id, 'd-top-amanha', 'campanha que ainda vai começar');
assert.deepEqual(getArticleStoreBanners('d', 'artigo-d', now, sampleBanners), {}, 'banner no próprio artigo');
assert.ok(isArticleBannerHref('/reviews/artigo-d') && !isArticleBannerHref('https://loja.com/reviews/x'));

// O lugar 1 depois da 1ª seção; o 2 antes do FAQ ou, sem FAQ, antes da última, com uma seção inteira entre os dois.
assert.deepEqual(placeStoreBanners([], -1), {});
assert.deepEqual(placeStoreBanners(['a', 'b', 'c', 'faq'], 3), { top: 'a', mid: 'faq' });
assert.deepEqual(placeStoreBanners(['a', 'b', 'c'], -1), { top: 'a', mid: 'c' });
assert.deepEqual(placeStoreBanners(['a', 'faq', 'c'], 1), { top: 'a' }, 'FAQ logo depois da 1ª seção');
assert.deepEqual(placeStoreBanners(['a', 'b'], -1), { top: 'a' }, 'artigo de duas seções');

// Os dados: loja cadastrada, um banner por lugar de cada loja, link de afiliado que vale nos 10 idiomas, datas com
// fuso e os textos dos 10 idiomas, sem o código da loja.
const ids = new Set<string>();
const places = new Set<string>();
for (const banner of STORE_BANNERS) {
  assert.ok(!ids.has(banner.id), `${banner.id}: id repetido`);
  ids.add(banner.id);
  const place = `${banner.affiliate}/${banner.slot}`;
  assert.ok(!places.has(place), `${banner.id}: segunda campanha no lugar ${place}`);
  places.add(place);

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

// Campanha vencida não para o build: ela some do HTML sozinha. O aviso é para tirá-la do arquivo.
const expired = STORE_BANNERS.filter((banner) => banner.endsAt && Date.parse(banner.endsAt) < Date.now());
if (expired.length) {
  console.warn(`campanhas vencidas em src/lib/storeBanners.ts, para tirar do arquivo: ${expired.map(({ id }) => id).join(', ')}`);
}
console.log(`banners de campanha: ${STORE_BANNERS.length} campanhas conferidas, ${STORE_BANNERS.length - expired.length} no prazo`);
