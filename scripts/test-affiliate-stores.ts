// O cadastro dos afiliados sem página (src/lib/affiliateStores.ts): as regras de cada loja e os helpers. A conferência
// recebe as listas por parâmetro, e os casos ruins são lojas de mentira.
import assert from 'node:assert/strict';

import {
  AFFILIATE_STORES,
  affiliateStoreServesLocale,
  getAffiliateStore,
  type AffiliateStore,
} from '@/lib/affiliateStores';
import { COUPONS } from '@/lib/couponsData';
import { LOCALE_KEYS } from '@/lib/i18n/locales';

// `outros` é a página /reviews/outros e a bolinha da casa: não pode ser slug de loja.
const RESERVED_SLUGS = ['outros'];

type Unchecked = { [Key in keyof AffiliateStore]?: unknown };

function isHttps(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

function localesProblem(locales: unknown, siteLocales: readonly string[]): string | undefined {
  if (locales === 'all') return undefined;
  if (!Array.isArray(locales) || locales.length === 0) return "locales tem de ser 'all' ou uma lista com ao menos um idioma";
  const repeated = locales.filter((locale, index) => locales.indexOf(locale) !== index);
  if (repeated.length) return `locales com idioma repetido: ${[...new Set(repeated)].join(', ')}`;
  const unknown = locales.filter((locale) => !siteLocales.includes(locale));
  if (unknown.length) return `locales com idioma que o site não tem: ${unknown.join(', ')}`;
  return undefined;
}

// `couponSlugs` são os slugs de couponsData.ts com qualquer status: a loja pausada ou expirada segue dona do slug.
function affiliateStoreProblems(
  stores: readonly Unchecked[],
  couponSlugs: readonly string[],
  siteLocales: readonly string[]
): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();
  stores.forEach((store, index) => {
    const { slug } = store;
    const at = typeof slug === 'string' && slug ? `"${slug}"` : `loja ${index + 1}`;
    if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      problems.push(`${at}: slug tem de ser minúsculo, com letras, números e hífen`);
    } else {
      if (seen.has(slug)) problems.push(`${at}: slug repetido no cadastro`);
      seen.add(slug);
      if (couponSlugs.includes(slug)) problems.push(`${at}: já é loja de couponsData.ts; a loja com página sai de affiliateStores.ts`);
      if (RESERVED_SLUGS.includes(slug)) problems.push(`${at}: slug reservado`);
    }
    if (typeof store.brand !== 'string' || !store.brand.trim()) problems.push(`${at}: brand vazio`);
    if (!isHttps(store.offerUrl)) problems.push(`${at}: offerUrl tem de ser um endereço https`);
    const locales = localesProblem(store.locales, siteLocales);
    if (locales) problems.push(`${at}: ${locales}`);
  });
  return problems;
}

const couponSlugs = COUPONS.map((coupon) => coupon.slug);

assert.ok(AFFILIATE_STORES.length > 0, 'o cadastro tem ao menos uma loja');
assert.deepEqual(affiliateStoreProblems(AFFILIATE_STORES, couponSlugs, LOCALE_KEYS), [], 'o cadastro passa nas regras');

// Casos ruins: cada um quebra uma regra só.
const good: AffiliateStore = { slug: 'loja-teste', brand: 'Loja Teste', offerUrl: 'https://loja.example/a', locales: ['pt'] };
const check = (stores: readonly Unchecked[], coupons: readonly string[] = ['magalu']) =>
  affiliateStoreProblems(stores, coupons, LOCALE_KEYS);

assert.deepEqual(check([good]), [], 'loja boa passa');
assert.deepEqual(check([{ ...good, locales: 'all' }]), [], "locales 'all' passa");
assert.deepEqual(check([{ ...good, locales: [...LOCALE_KEYS] }]), [], 'os 10 idiomas passam');

const bad: Array<[string, Unchecked[], RegExp]> = [
  ['slug repetido', [good, { ...good, brand: 'Outra' }], /slug repetido/],
  ['slug de couponsData.ts', [{ ...good, slug: 'magalu' }], /já é loja de couponsData\.ts/],
  ['slug outros', [{ ...good, slug: 'outros' }], /slug reservado/],
  ['slug vazio', [{ ...good, slug: '' }], /slug tem de ser/],
  ['slug com maiúscula', [{ ...good, slug: 'Loja' }], /slug tem de ser/],
  ['brand vazio', [{ ...good, brand: '  ' }], /brand vazio/],
  ['offerUrl http', [{ ...good, offerUrl: 'http://loja.example/a' }], /offerUrl/],
  ['offerUrl relativo', [{ ...good, offerUrl: '/cupons/loja' }], /offerUrl/],
  ['offerUrl ausente', [{ ...good, offerUrl: undefined }], /offerUrl/],
  ['locales vazio', [{ ...good, locales: [] }], /ao menos um idioma/],
  ['locales repetido', [{ ...good, locales: ['pt', 'en', 'pt'] }], /idioma repetido: pt/],
  ['locales fora do site', [{ ...good, locales: ['pt', 'pt-BR'] }], /não tem: pt-BR/],
  ['locales em texto', [{ ...good, locales: 'pt' }], /ao menos um idioma/],
];
for (const [name, stores, message] of bad) {
  const problems = check(stores);
  assert.equal(problems.length, 1, `${name}: um problema (${problems.join('; ')})`);
  assert.match(problems[0], message, name);
}

// O slug de loja pausada ou expirada também é de couponsData.ts.
const inactive = COUPONS.find(({ status }) => status !== 'ativo');
if (inactive) {
  assert.match(
    check([{ ...good, slug: inactive.slug }], couponSlugs)[0],
    /já é loja de couponsData\.ts/,
    `loja com status ${inactive.status} segue dona do slug`
  );
}

// Os helpers, sobre o cadastro de verdade.
for (const store of AFFILIATE_STORES) {
  assert.equal(getAffiliateStore(store.slug), store, `getAffiliateStore acha ${store.slug}`);
  for (const locale of LOCALE_KEYS) {
    const expected = store.locales === 'all' || store.locales.includes(locale);
    assert.equal(affiliateStoreServesLocale(store, locale), expected, `${store.slug} em ${locale}`);
  }
}
assert.equal(getAffiliateStore('magalu'), undefined, 'loja de couponsData.ts fica fora do cadastro');
assert.equal(getAffiliateStore(''), undefined, 'slug vazio fica sem loja');

assert.ok(affiliateStoreServesLocale({ ...good, locales: 'all' }, 'ja'), "'all' vale em todo idioma");
assert.ok(affiliateStoreServesLocale(good, 'pt'), 'vale no idioma da lista');
assert.ok(!affiliateStoreServesLocale(good, 'en'), 'fora da lista, a loja fica de fora');
assert.ok(!affiliateStoreServesLocale(good, 'pt-BR'), 'idioma que o site desconhece fica de fora');

// A Shopee só em português, com o link do artigo.
const shopee = getAffiliateStore('shopee');
assert.ok(shopee, 'a Shopee está no cadastro');
assert.equal(shopee.offerUrl, 'https://s.shopee.com.br/2LZ1KQ3brC', 'o link de afiliado da Shopee');
assert.deepEqual(shopee.locales, ['pt'], 'a Shopee só em português');

console.log(`✅ afiliados sem página: ${AFFILIATE_STORES.length} loja(s), slug fora de couponsData.ts e de "outros", link https, idiomas do site e os helpers`);
