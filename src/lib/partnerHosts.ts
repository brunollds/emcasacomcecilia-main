// Domínios das lojas parceiras e dos programas de afiliado. Um link do texto dos artigos para um deles
// sai com rel="sponsored"; para qualquer outro (gov.br, Reclame Aqui, imprensa, fabricante que não é
// parceiro), só com noopener. O domínio vale também para os subdomínios (www, checkout, suporte).
// Sem imports: o AnimatedTextHighlight, que lê isto, é componente de cliente.
// O `npm run test:partner-hosts` cobra que toda loja de couponsData.ts e affiliateStores.ts esteja aqui
// e que todo domínio citado no texto esteja aqui ou em scripts/non-partner-hosts.json.
export const PARTNER_HOSTS: readonly string[] = [
  'adaptogen.com.br',
  'aliexpress.com',
  'amazon.com.br',
  'bagaggio.com.br',
  'bawclothing.com.br',
  'belivebefree.com.br',
  'biobio.com.br',
  'blackskullusa.com.br',
  'boldsnacks.com.br',
  'cleastore.com.br',
  'damie.com.br',
  // Redirecionamento nosso para o link de afiliado da DAMIE.
  'damie.emcasacomcecilia.com',
  'denavita.com.br',
  'drpeanut.com.br',
  'getproton.me',
  'gocase.com.br',
  // Links de afiliado da GoGroup (Barbour's, Denavita, Gocase).
  'gogroup.com.br',
  'holyfoods.com.br',
  'hostinger.com',
  'insiderstore.com.br',
  'iwannasleep.com.br',
  'kopenhagen.com.br',
  'lamazonie.com.br',
  'lejour.com.br',
  'letseatit.com.br',
  'link.amazon',
  // Redirecionamento de afiliados Rakuten Advertising (ex.: Netshoes).
  'linksynergy.com',
  'lojacolaedecora.com.br',
  'lojalaganexa.com.br',
  'lojamaismu.com.br',
  'lojaprohall.com.br',
  'magazineluiza.com.br',
  'magazineluiza.onelink.me',
  'magazinevoce.com.br',
  'maxtitanium.com.br',
  'meli.la',
  'mercadolivre.com.br',
  'nescafe-dolcegusto.com.br',
  'nestlenutre.com.br',
  'netshoes.com.br',
  'oceane.com.br',
  'petz.com.br',
  'pinkcheeks.com.br',
  'probiotica.com.br',
  'proton.me',
  'protonvpn.com',
  'rituaria.com.br',
  'shein.com',
  'shopee.com.br',
  'simpleorganic.com.br',
  'skelt.com.br',
  'starlink.com',
  'temu.com',
  'temu.to',
  'thebarboursbeauty.com.br',
  'todaup.com',
  'yesstyle.com',
  'ystyle.co',
];

export function hostMatches(host: string, domain: string): boolean {
  return host === domain || host.endsWith(`.${domain}`);
}

export function hrefHost(href: string): string | null {
  if (!/^https?:\/\//i.test(href)) return null;
  try {
    return new URL(href).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return null;
  }
}

export function isPartnerHref(href: string): boolean {
  const host = hrefHost(href);
  return host !== null && PARTNER_HOSTS.some((domain) => hostMatches(host, domain));
}
