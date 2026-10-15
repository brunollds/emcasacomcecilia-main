import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { imageConfigDefault, type ImageConfigComplete, type RemotePattern } from 'next/dist/shared/lib/image-config';
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';
import { AboutView } from '@/components/about/AboutView';
import { ABOUT_TRAIL, getAboutContent, getAboutPersonJsonLd } from '@/lib/aboutPage';
import { brandLinks } from '@/lib/brandLinks';
import { CECILIA_PERSON_ID, CECILIA_SINCE, YESSTYLE_CERTIFICATE } from '@/lib/ceciliaCredentials';
import { getActiveCoupons } from '@/lib/couponsData';
import { publishedReviews, recipes } from '@/lib/data';
import { getCeciliaSocialStats } from '@/lib/homeStores';
import { IMAGE_REMOTE_PATTERNS } from '@/lib/imageHosts.mjs';
import { getBreadcrumbListJsonLd } from '@/lib/pageSeo';
import { getListedPortugueseReviews } from '@/lib/reviewDiscovery';

// As páginas institucionais. A /sobre: os números saem dos dados (os mesmos da home e das listas em
// português), o selo da YesStyle só aparece enquanto o certificado vale, as marcas parceiras, a trilha igual
// ao BreadcrumbList e os textos que a página não pode ter.

const imageConfig: ImageConfigComplete = { ...imageConfigDefault, remotePatterns: IMAGE_REMOTE_PATTERNS as RemotePattern[] };
const render = (content: ReturnType<typeof getAboutContent>) =>
  renderToStaticMarkup(createElement(ImageConfigContext.Provider, { value: imageConfig }, createElement(AboutView, { content })));
const textOf = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');
const jsonLdOf = (html: string) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));

const VALID_DAY = YESSTYLE_CERTIFICATE.validFrom;
const EXPIRED_DAY = '2999-01-01';
const content = getAboutContent({ reviews: publishedReviews, recipes, today: VALID_DAY });
const html = render(content);
const text = textOf(html);

// Os números: os das redes são os da home (getCeciliaSocialStats), e os do site saem das mesmas fontes que as
// listas: os artigos listados em português, as receitas e as lojas ativas.
const social = getCeciliaSocialStats().filter((stat) => stat.followers);
assert.ok(social.length > 0, 'nenhuma rede com número de seguidores');
const expectedCounts = {
  articles: getListedPortugueseReviews(publishedReviews).length,
  stores: getActiveCoupons().length,
  recipes: recipes.length,
};
assert.deepEqual(content.counts, expectedCounts);
for (const [name, count] of Object.entries(expectedCounts)) assert.ok(count > 0, `${name}: contagem zerada`);
assert.deepEqual(
  content.stats.map((stat) => stat.value),
  [...social.map((stat) => stat.followers), String(expectedCounts.articles), String(expectedCounts.stores), String(expectedCounts.recipes)],
  'os números da /sobre não são os dos dados'
);
assert.deepEqual(
  content.stats.slice(-3).map((stat) => stat.label),
  ['guias e análises', 'lojas parceiras', 'receitas']
);
const statsHtml = html.match(/<dl[^>]*data-about-stats=""[^>]*>([\s\S]*?)<\/dl>/)?.[1];
assert.ok(statsHtml, 'sem a lista de números');
for (const stat of content.stats) {
  assert.ok(statsHtml.includes(`<dd`) && textOf(statsHtml).includes(`${stat.label} ${stat.value}`), `sem o número "${stat.value} ${stat.label}"`);
}
// Nenhum número de seguidores escrito à mão: o único "k" da página é o que vem dos dados.
const followerNumbers = new Set(text.match(/\b\d+(?:[.,]\d+)?k\b/gi) ?? []);
assert.deepEqual([...followerNumbers].sort(), [...new Set(social.map((stat) => stat.followers))].sort(), 'número de seguidores fora dos dados');
assert.ok(text.includes(`desde ${CECILIA_SINCE}`), 'sem o "desde" do CECILIA_SINCE');
assert.ok(text.includes(`Os códigos das ${expectedCounts.stores} lojas parceiras`), 'o caminho dos cupons sem o número de lojas');

// O selo só enquanto o certificado vale, com o link para a imagem.
assert.ok(content.certificate, 'selo ausente com o certificado válido');
assert.match(html, /data-about-certificate=""/);
assert.ok(text.includes('YesStyle Superstar Influencer'), 'sem o título do selo');
assert.ok(html.includes(`href="${content.certificate.image.src}"`), 'sem o link do certificado');
const expired = getAboutContent({ reviews: publishedReviews, recipes, today: EXPIRED_DAY });
assert.equal(expired.certificate, null, 'selo com o certificado vencido');
assert.doesNotMatch(render(expired), /Superstar Influencer|data-about-certificate/, 'o selo vencido aparece na página');

// Os caminhos do site, na ordem do texto aprovado.
assert.deepEqual(content.paths.map((path) => path.href), ['/reviews', '/cupons', '/videos', '/receitas']);
for (const path of content.paths) assert.ok(html.includes(`href="${path.href}"`), `sem o caminho ${path.href}`);

// As marcas parceiras: lista com nomes únicos, imagem e link externo que não passa a página adiante.
assert.ok(content.partners.length > 0, 'sem marcas parceiras');
assert.equal(new Set(content.partners.map((partner) => partner.name)).size, content.partners.length, 'marca parceira repetida');
for (const partner of content.partners) {
  assert.match(partner.href, /^https:\/\//, `${partner.name}: link sem https`);
  assert.match(partner.src, /^\/images\/about\/partners\//, `${partner.name}: imagem fora de /images/about/partners`);
  const anchor = html.match(new RegExp(`<a [^>]*title="${partner.name.replace(/'/g, '&#x27;').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`))?.[0];
  assert.ok(anchor, `${partner.name}: sem o link`);
  assert.ok(anchor.includes('rel="noopener noreferrer"') && anchor.includes('target="_blank"'), `${partner.name}: link sem rel ou target`);
}

// A trilha e o BreadcrumbList saem da mesma lista; o Person é a Cecília das homes e da autoria dos artigos.
const jsonLd = jsonLdOf(html);
assert.deepEqual(ABOUT_TRAIL.map((item) => item.path), ['/', '/sobre']);
assert.deepEqual(jsonLd.find((schema) => schema['@type'] === 'BreadcrumbList'), getBreadcrumbListJsonLd(ABOUT_TRAIL));
assert.match(html, /<span aria-current="page"[^>]*>Sobre<\/span>/);
const person = jsonLd.find((schema) => schema['@type'] === 'Person');
assert.deepEqual(person, getAboutPersonJsonLd());
assert.equal(person['@id'], CECILIA_PERSON_ID);
assert.equal(person.url, 'https://emcasacomcecilia.com/sobre');
assert.ok(person.description.includes(`desde ${CECILIA_SINCE}`), 'Person sem o "desde"');
assert.match(html, /<h1[^>]*><span class="marca-texto marca-texto-entra">Sobre a Cecília<\/span><\/h1>/);
assert.ok(html.includes(`href="${brandLinks.mediaKit}"`), 'sem o mídia kit');
assert.ok(html.includes(`href="${brandLinks.contactMailto}"`), 'sem o e-mail de contato');

// O que a página não pode ter: "cupom" perto do CECILIA010 (é código de recompensa), o fecho antigo e os
// números fixos da página antiga.
for (const [label, pattern] of [
  ['cupom perto do CECILIA010', /cupo(m|ns)\W+(?:\w+\W+){0,3}CECILIA010|CECILIA010\W+(?:\w+\W+){0,3}cupo(m|ns)/i],
  ['"jornada deliciosa"', /jornada deliciosa/i],
  ['número fixo da página antiga', /\+190|445k|84k|11\.3k/i],
] as const) {
  assert.doesNotMatch(text, pattern, `/sobre com ${label}`);
}

console.log(
  `✅ institucionais: /sobre com ${content.stats.length} números dos dados (${social.length} redes, ${expectedCounts.articles} artigos, ${expectedCounts.stores} lojas, ${expectedCounts.recipes} receitas), o selo só no prazo, ${content.paths.length} caminhos, ${content.partners.length} marcas, a trilha e o Person passaram.`
);
