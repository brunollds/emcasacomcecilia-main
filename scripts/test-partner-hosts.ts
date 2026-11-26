// O rel="sponsored" do link no texto dos artigos só vai para loja parceira ou programa de afiliado
// (src/lib/partnerHosts.ts). Confere: (1) a regra de domínio; (2) toda loja de couponsData.ts e de
// affiliateStores.ts está entre as parceiras; (3) todo domínio citado no texto dos artigos e das receitas
// está classificado, como parceiro ou em scripts/non-partner-hosts.json, para nenhum link de afiliado
// novo sair sem sponsored.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { COUPONS } from '../src/lib/couponsData';
import { AFFILIATE_STORES } from '../src/lib/affiliateStores';
import { FESTIVAL_BANNER_STRIPS, FESTIVAL_EXTRA_LINK_PARTNERS } from '../src/lib/festivalExtraPartners';
import { PARTNER_HOSTS, hostMatches, hrefHost, isPartnerHref } from '../src/lib/partnerHosts';

const NON_PARTNER: string[] = JSON.parse(fs.readFileSync(path.join('scripts', 'non-partner-hosts.json'), 'utf8')).hosts;
const isNonPartner = (host: string) => NON_PARTNER.some((domain) => hostMatches(host, domain));

assert.equal(isPartnerHref('https://www.biobio.com.br/products/x'), true, 'www da parceira');
assert.equal(isPartnerHref('https://suporte.iwannasleep.com.br/a'), true, 'subdomínio da parceira');
assert.equal(isPartnerHref('https://onelink.shein.com/x'), true, 'link de afiliado da SHEIN');
assert.equal(isPartnerHref('https://www.gov.br/receitafederal'), false, 'gov.br virou parceiro');
assert.equal(isPartnerHref('https://www.reclameaqui.com.br/empresa/x/'), false, 'Reclame Aqui virou parceiro');
assert.equal(isPartnerHref('https://notbiobio.com.br/'), false, 'sufixo sem ponto casou');
assert.equal(isPartnerHref('/cupons/biobio'), false, 'link interno virou parceiro');
assert.equal(isPartnerHref('https://'), false, 'URL quebrada virou parceira');

const overlap = PARTNER_HOSTS.filter((domain) => NON_PARTNER.some((other) => hostMatches(domain, other) || hostMatches(other, domain)));
// emcasacomcecilia.com é nosso; só o redirecionamento da DAMIE é de afiliado.
assert.deepEqual(overlap, ['damie.emcasacomcecilia.com'], `domínio nas duas listas: ${overlap.join(', ')}`);
assert.equal(isPartnerHref('https://damie.emcasacomcecilia.com/x'), true, 'redirecionamento da DAMIE sem sponsored');

const storeProblems: string[] = [];
const checkStoreUrl = (slug: string, url: string | undefined) => {
  if (!url || !/^https?:/.test(url)) return;
  if (!isPartnerHref(url)) storeProblems.push(`${slug}: ${hrefHost(url)} fora de PARTNER_HOSTS`);
};
for (const coupon of COUPONS) {
  checkStoreUrl(coupon.slug, coupon.officialUrl);
  checkStoreUrl(coupon.slug, coupon.offerUrl);
}
for (const store of AFFILIATE_STORES) checkStoreUrl(store.slug, store.offerUrl);
for (const extra of FESTIVAL_EXTRA_LINK_PARTNERS) {
  assert.ok(
    !COUPONS.some((c) => c.slug === extra.slug),
    `${extra.slug}: já existe em couponsData.ts; remova de FESTIVAL_EXTRA_LINK_PARTNERS`,
  );
  checkStoreUrl(extra.slug, extra.officialUrl);
  checkStoreUrl(extra.slug, extra.offerUrl);
}
for (const strip of FESTIVAL_BANNER_STRIPS) {
  checkStoreUrl(strip.slug, strip.href);
}
assert.deepEqual(storeProblems, [], `loja parceira sem domínio na lista:\n${storeProblems.join('\n')}`);

const LINK = /\]\((https?:\/\/[^\s)]+)\)/g;
const unknown = new Map<string, string>();
let checked = 0;
for (const dir of ['content/reviews', 'content/receitas']) {
  for (const file of fs.readdirSync(dir).filter((name) => name.endsWith('.json') && !name.startsWith('_'))) {
    const text = fs.readFileSync(path.join(dir, file), 'utf8');
    for (const match of text.matchAll(LINK)) {
      const host = hrefHost(match[1]);
      checked += 1;
      if (!host) unknown.set(match[1], file);
      else if (!isPartnerHref(match[1]) && !isNonPartner(host) && !unknown.has(host)) unknown.set(host, file);
    }
  }
}
assert.equal(
  unknown.size,
  0,
  `domínio sem classificação no texto (ponha em PARTNER_HOSTS, de src/lib/partnerHosts.ts, se for loja parceira ou afiliado; senão em scripts/non-partner-hosts.json):\n${[...unknown].map(([host, file]) => `${host} (${file})`).join('\n')}`
);

console.log(`✅ partner hosts: ${PARTNER_HOSTS.length} domínios parceiros, ${NON_PARTNER.length} não parceiros, ${checked} links do texto classificados`);
