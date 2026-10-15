import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { imageConfigDefault, type ImageConfigComplete, type RemotePattern } from 'next/dist/shared/lib/image-config';
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';
import { readFileSync } from 'node:fs';
import { AboutView } from '@/components/about/AboutView';
import { ContactView } from '@/components/contact/ContactView';
import { FaqView } from '@/components/faqs/FaqView';
import { PrivacyView } from '@/components/privacy/PrivacyView';
import { SearchView } from '@/components/search/SearchView';
import { ABOUT_TRAIL, getAboutContent, getAboutPersonJsonLd } from '@/lib/aboutPage';
import { brandLinks } from '@/lib/brandLinks';
import { CECILIA_PERSON_ID, CECILIA_SINCE, YESSTYLE_CERTIFICATE } from '@/lib/ceciliaCredentials';
import { ASSUNTO_LABELS, CONTACT_SUBJECTS, CONTACT_TRAIL, escapeHtml, isContactSubject } from '@/lib/contactPage';
import { getActiveCoupons } from '@/lib/couponsData';
import { publishedReviews, recipes } from '@/lib/data';
import { FAQ_CATEGORIES, FAQ_TRAIL, getFaqPageJsonLd } from '@/lib/faqPage';
import { getCeciliaSocialStats } from '@/lib/homeStores';
import { IMAGE_REMOTE_PATTERNS } from '@/lib/imageHosts.mjs';
import { getBreadcrumbListJsonLd } from '@/lib/pageSeo';
import { PRIVACY_META, PRIVACY_SECTIONS, PRIVACY_TRAIL, privacyPlainText, type PrivacyText } from '@/lib/privacyPage';
import { getListedPortugueseReviews } from '@/lib/reviewDiscovery';
import { SEARCH_COPY, SEARCH_TRAIL, createSearchPage, getSearchQuery, searchSite } from '@/lib/searchPage';
import { SEARCH_PAGE_METADATA } from '@/lib/siteSearch.mjs';

// As páginas institucionais. A /sobre: os números saem dos dados (os mesmos da home e das listas em
// português), o selo da YesStyle só aparece enquanto o certificado vale, as marcas parceiras, a trilha igual
// ao BreadcrumbList e os textos que a página não pode ter. O /faqs: as perguntas, o FAQPage igual à página e
// os atalhos das categorias. O /contato: os assuntos do formulário iguais aos da rota /api/contact e o
// escape do HTML do e-mail. A /privacidade: o que a política precisa dizer, o sumário e os links. O /buscar:
// os cartões com o link e a capa, e o aviso de nada encontrado.

const imageConfig: ImageConfigComplete = { ...imageConfigDefault, remotePatterns: IMAGE_REMOTE_PATTERNS as RemotePattern[] };
const withImages = (element: ReturnType<typeof createElement>) =>
  renderToStaticMarkup(createElement(ImageConfigContext.Provider, { value: imageConfig }, element));
const render = (content: ReturnType<typeof getAboutContent>) => withImages(createElement(AboutView, { content }));
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

// O FAQ: as categorias da copy aprovada, nenhuma vazia, e as respostas sem marcador por resolver.
const CECILIA010_AS_COUPON = /cupo(m|ns)\W+(?:\S+\s+){0,3}CECILIA010|CECILIA010\W+(?:\S+\s+){0,3}cupo(m|ns)/i;
const faqQuestions = FAQ_CATEGORIES.flatMap((category) => category.perguntas);
assert.deepEqual(
  FAQ_CATEGORIES.map((category) => category.categoria),
  ['Em Casa com Cecília', 'Cupons e códigos', 'Links de afiliado e parcerias', 'Guias & Análises', 'Receitas', 'Vídeos e contato']
);
assert.equal(new Set(FAQ_CATEGORIES.map((category) => category.id)).size, FAQ_CATEGORIES.length, 'id de categoria repetido');
for (const category of FAQ_CATEGORIES) {
  assert.match(category.id, /^[a-z0-9-]+$/, `${category.categoria}: id fora do formato de âncora`);
  assert.ok(category.perguntas.length > 0, `${category.categoria}: categoria sem pergunta`);
}
assert.ok(faqQuestions.length >= 18, `só ${faqQuestions.length} perguntas no FAQ`);
assert.equal(new Set(faqQuestions.map((item) => item.pergunta)).size, faqQuestions.length, 'pergunta repetida no FAQ');
for (const item of faqQuestions) {
  assert.ok(item.pergunta.trim().endsWith('?'), `pergunta sem "?": ${item.pergunta}`);
  assert.ok(item.resposta.trim(), `resposta vazia: ${item.pergunta}`);
  for (const field of [item.pergunta, item.resposta, item.link?.label ?? '']) {
    assert.doesNotMatch(field, /[{}]/, `marcador por resolver: ${field}`);
  }
  // O CECILIA010 é código de recompensa: "é um cupom" só na pergunta, que a resposta nega.
  for (const field of [item.resposta, item.link?.label ?? '']) {
    assert.doesNotMatch(field, CECILIA010_AS_COUPON, `CECILIA010 chamado de cupom: ${field}`);
  }
  if (/CECILIA010/.test(item.pergunta)) {
    assert.match(item.resposta, /^Não\. É um código de recompensa/, 'a resposta do CECILIA010 não nega o cupom');
  }
  if (item.link) {
    if (item.link.external) assert.match(item.link.href, /^https:\/\//, `${item.link.label}: link externo sem https`);
    else assert.match(item.link.href, /^\/[a-z0-9/-]*$/, `${item.link.label}: link interno fora do formato`);
  }
}
const faqAnswers = faqQuestions.map((item) => item.resposta).join(' ');
assert.ok(faqAnswers.includes(`desde ${CECILIA_SINCE}`), 'FAQ sem o "desde" do CECILIA_SINCE');
assert.ok(faqAnswers.includes(brandLinks.contactEmail), 'FAQ sem o e-mail de contato');
assert.ok(
  faqQuestions.some((item) => item.link?.href === brandLinks.whatsappGroup && item.link.external),
  'FAQ sem o grupo do WhatsApp'
);

// A página do FAQ: cada pergunta num <summary>, todas as respostas, um atalho por categoria e o FAQPage com
// exatamente as perguntas e respostas da página.
const faqHtml = renderToStaticMarkup(createElement(FaqView, { categories: FAQ_CATEGORIES }));
const faqText = textOf(faqHtml);
const summaries = [...faqHtml.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/g)].map((match) => textOf(match[1]).trim());
assert.deepEqual(summaries, faqQuestions.map((item) => item.pergunta), 'as perguntas da página não são as dos dados');
assert.equal((faqHtml.match(/<details/g) ?? []).length, faqQuestions.length);
assert.doesNotMatch(faqHtml, /<details[^>]* open/, 'pergunta aberta no HTML');
for (const item of faqQuestions) assert.ok(faqText.includes(item.resposta), `resposta fora da página: ${item.pergunta}`);
for (const category of FAQ_CATEGORIES) {
  assert.ok(faqHtml.includes(`href="#${category.id}"`), `${category.categoria}: sem o atalho`);
  assert.match(faqHtml, new RegExp(`<section id="${category.id}"`), `${category.categoria}: sem a seção da âncora`);
}
const whatsappAnchor = faqHtml.match(new RegExp(`<a [^>]*href="${brandLinks.whatsappGroup}"[^>]*>`))?.[0];
assert.ok(
  whatsappAnchor?.includes('rel="noopener noreferrer"') && whatsappAnchor.includes('target="_blank"'),
  'link do WhatsApp sem rel ou target'
);
const faqJsonLd = jsonLdOf(faqHtml);
const faqPage = faqJsonLd.find((schema) => schema['@type'] === 'FAQPage');
assert.deepEqual(faqPage, getFaqPageJsonLd());
assert.deepEqual(
  faqPage.mainEntity.map((entry: { name: string; acceptedAnswer: { text: string } }) => [entry.name, entry.acceptedAnswer.text]),
  faqQuestions.map((item) => [item.pergunta, item.resposta]),
  'o FAQPage não é igual à página'
);
assert.deepEqual(faqJsonLd.find((schema) => schema['@type'] === 'BreadcrumbList'), getBreadcrumbListJsonLd(FAQ_TRAIL));
assert.match(faqHtml, /<h1[^>]*><span class="marca-texto marca-texto-entra">Perguntas frequentes<\/span><\/h1>/);
for (const href of ['/contato', brandLinks.youtube, brandLinks.contactMailto]) {
  assert.ok(faqHtml.includes(`href="${href}"`), `/faqs sem o link ${href}`);
}

// O contato: os assuntos do formulário são os da rota, nos dois sentidos, e a rota só aceita esses.
assert.deepEqual(
  CONTACT_SUBJECTS.map((subject) => subject.value),
  ['cupom', 'review', 'sugestao', 'parceria', 'duvida', 'outro']
);
assert.deepEqual(
  Object.keys(ASSUNTO_LABELS).sort(),
  CONTACT_SUBJECTS.map((subject) => subject.value).sort(),
  'assunto sem rótulo ou rótulo sem assunto'
);
for (const subject of CONTACT_SUBJECTS) {
  assert.equal(ASSUNTO_LABELS[subject.value], subject.label);
  assert.ok(isContactSubject(subject.value));
}
for (const value of ['', 'hack', '__proto__', 'toString', 'constructor', undefined, null, 1, ['cupom']]) {
  assert.equal(isContactSubject(value), false, `assunto aceito: ${String(value)}`);
}
assert.equal(escapeHtml(`<b onclick="x">Tom & 'Jerry'</b>`), '&lt;b onclick=&quot;x&quot;&gt;Tom &amp; &#39;Jerry&#39;&lt;/b&gt;');
assert.equal(escapeHtml('&lt;'), '&amp;lt;', 'o & já escapado precisa escapar de novo');

// A rota: o HTML do e-mail só leva o texto escapado.
const route = readFileSync('src/app/api/contact/route.js', 'utf8');
const emailHtml = route.match(/html: `([\s\S]*?)`,/)?.[1];
assert.ok(emailHtml, 'sem o HTML do e-mail na rota');
assert.doesNotMatch(emailHtml, /\$\{(?!html\.)/, 'valor sem escape no HTML do e-mail');
assert.match(route, /from '@\/lib\/contactPage'/);
assert.match(route, /if \(!isContactSubject\(assunto\)\)/);

// A página do contato: rótulos visíveis, o assunto obrigatório começando vazio e o aviso numa região status.
const contactHtml = renderToStaticMarkup(createElement(ContactView));
const select = contactHtml.match(/<select[^>]*>([\s\S]*?)<\/select>/);
assert.ok(select, 'sem o select do assunto');
assert.match(select[0], /^<select[^>]* required=""/);
const options = [...select[1].matchAll(/<option([^>]*)>([^<]*)<\/option>/g)].map((match) => ({ attrs: match[1], label: match[2] }));
assert.equal(options[0].label, 'Escolha o assunto');
assert.match(options[0].attrs, /value=""/);
assert.match(options[0].attrs, /disabled=""/);
assert.deepEqual(
  options.slice(1).map((option) => [option.attrs.match(/value="([^"]*)"/)?.[1], option.label]),
  CONTACT_SUBJECTS.map((subject) => [subject.value, subject.label])
);
for (const [id, label] of [
  ['contato-nome', 'Nome'],
  ['contato-email', 'E-mail'],
  ['contato-assunto', 'Assunto'],
  ['contato-mensagem', 'Mensagem'],
]) {
  assert.match(contactHtml, new RegExp(`<label for="${id}"[^>]*>${label}</label>`), `sem o rótulo de ${id}`);
  assert.match(contactHtml, new RegExp(`<(?:input|select|textarea) id="${id}"[^>]*required=""`), `${id} sem required`);
}
assert.match(contactHtml, /<div role="status" aria-live="polite">/);
for (const href of ['/privacidade', '/faqs', brandLinks.mediaKit, brandLinks.contactMailto, brandLinks.instagram, brandLinks.youtube]) {
  assert.ok(contactHtml.includes(`href="${href}"`), `/contato sem o link ${href}`);
}
assert.deepEqual(jsonLdOf(contactHtml).find((schema) => schema['@type'] === 'BreadcrumbList'), getBreadcrumbListJsonLd(CONTACT_TRAIL));
assert.match(contactHtml, /<h1[^>]*><span class="marca-texto marca-texto-entra">Fale com a gente<\/span><\/h1>/);

// Sem o cartão ao lado, o título fica à esquerda: o lg:self-end do grid empurrava o h1 para a direita.
for (const pageHtml of [faqHtml, contactHtml]) {
  assert.doesNotMatch(pageHtml.match(/<header[\s\S]*?<\/header>/)?.[0] ?? '', /lg:self-end/, 'cabeçalho sem aside com lg:self-end');
}

// A privacidade: as 13 seções do texto aprovado, o que a política precisa dizer e nenhum marcador por resolver.
assert.equal(PRIVACY_SECTIONS.length, 13, 'a política não tem 13 seções');
assert.deepEqual(
  PRIVACY_SECTIONS.map((section) => Number(section.title.match(/^(\d+)\. /)?.[1])),
  PRIVACY_SECTIONS.map((_, index) => index + 1),
  'seções fora da ordem'
);
assert.equal(new Set(PRIVACY_SECTIONS.map((section) => section.id)).size, PRIVACY_SECTIONS.length, 'id de seção repetido');
const privacyText = PRIVACY_SECTIONS.map((section) => `${section.title} ${privacyPlainText(section.blocks)}`).join(' ');
for (const [label, needle] of [
  ['Microsoft Clarity', 'Microsoft Clarity'],
  ['Google Analytics com os 2 meses', 'Google Analytics: 2 meses'],
  ['pessoa física', 'Cecília Mauad, pessoa física'],
  ['consentimento', 'consentimento (art. 7º, I)'],
  ['o e-mail de contato', brandLinks.contactEmail],
] as const) {
  assert.ok(privacyText.includes(needle), `política sem ${label}`);
}
assert.doesNotMatch(`${privacyText} ${PRIVACY_META.title} ${PRIVACY_META.description}`, /\[VERIFICAR|[{}]|14 meses/, 'marcador ou prazo antigo na política');
const privacyLinks = PRIVACY_SECTIONS.flatMap((section) =>
  section.blocks.flatMap((block) => (block.type === 'p' ? block.text : block.items.flatMap((entry) => entry.text)))
).filter((piece): piece is Extract<PrivacyText, { href: string }> => typeof piece === 'object' && 'href' in piece);
const externalPrivacyLinks = privacyLinks.filter((link) => !link.href.startsWith('mailto:'));
assert.ok(externalPrivacyLinks.length >= 5, 'a política sem as políticas dos serviços');
for (const link of externalPrivacyLinks) assert.match(link.href, /^https:\/\/[a-z0-9.-]+\.[a-z]{2,}(\/|$)/, `${link.label}: link sem https`);

const privacyHtml = renderToStaticMarkup(createElement(PrivacyView, { sections: PRIVACY_SECTIONS }));
const privacyPageText = textOf(privacyHtml);
assert.match(privacyHtml, /<h1[^>]*><span class="marca-texto marca-texto-entra">Política de privacidade<\/span><\/h1>/);
assert.deepEqual(jsonLdOf(privacyHtml).find((schema) => schema['@type'] === 'BreadcrumbList'), getBreadcrumbListJsonLd(PRIVACY_TRAIL));
for (const section of PRIVACY_SECTIONS) {
  assert.ok(privacyHtml.includes(`href="#${section.id}"`), `${section.title}: sem o atalho no sumário`);
  assert.match(privacyHtml, new RegExp(`<section id="${section.id}"`), `${section.title}: sem a seção da âncora`);
}
assert.equal((privacyHtml.match(/<h2 id="titulo-(?!sumario)/g) ?? []).length, PRIVACY_SECTIONS.length);
assert.ok(privacyHtml.includes('<strong class="font-extrabold text-marinho">Formulário de contato:</strong>'), 'item sem o trecho em negrito');
assert.ok(privacyHtml.includes('<code'), 'nome de cookie sem <code>');
for (const link of externalPrivacyLinks) {
  const anchors = [...privacyHtml.matchAll(/<a [^>]*>/g)].map((match) => match[0]).filter((anchor) => anchor.includes(`href="${link.href}"`));
  assert.ok(anchors.length > 0, `${link.label}: sem o link`);
  for (const anchor of anchors) {
    assert.ok(anchor.includes('rel="noopener noreferrer"') && anchor.includes('target="_blank"'), `${link.label}: link sem rel ou target`);
  }
}
for (const href of [brandLinks.contactMailto, '/contato']) assert.ok(privacyHtml.includes(`href="${href}"`), `/privacidade sem o link ${href}`);
assert.ok(privacyPageText.includes('Última atualização: outubro de 2026.'), 'sem a data da última revisão');
assert.ok(privacyPageText.includes('Google Analytics (medição de audiência) — policies.google.com/privacy'), 'o negrito colou no texto');

// A busca: um termo conhecido acha o artigo e a receita com o link e a capa, e um termo sem resultado mostra
// o aviso com o link para /cupons. O índice é o mesmo do campo do topo.
assert.equal(getSearchQuery(['  bolo ', 'x']), 'bolo');
assert.equal(getSearchQuery(undefined), '');
assert.deepEqual(SEARCH_PAGE_METADATA.robots, { index: false, follow: true }, 'o /buscar deixou de ser noindex');
assert.deepEqual(SEARCH_TRAIL.map((item) => item.path), ['/', '/buscar']);
const knownReview = getListedPortugueseReviews(publishedReviews).find((review) => review.image);
assert.ok(knownReview, 'nenhum artigo com capa');
const reviewResults = searchSite(knownReview.title);
const reviewCard = reviewResults.find((card) => card.href === `/reviews/${knownReview.slug}`);
assert.ok(reviewCard, `a busca por "${knownReview.title}" não achou o artigo`);
assert.ok(reviewCard.image?.src, 'artigo sem capa no resultado');
const recipeResults = searchSite(recipes[0].title.toLowerCase());
assert.ok(recipeResults.some((card) => card.href === `/receitas/${recipes[0].slug}` && card.image?.src), 'receita sem link ou capa');
for (const card of [...reviewResults, ...recipeResults]) assert.match(card.href, /^\/(receitas|reviews)\/[a-z0-9-]+$/);
assert.deepEqual(searchSite('zzzz'), []);
assert.deepEqual(createSearchPage({ recipes: [], reviews: [] })('bolo'), []);

const searchHtml = (query: string) =>
  withImages(createElement(SearchView, { query, results: query ? searchSite(query) : [], search: createElement('input', { 'data-busca': '' }) }));
const foundHtml = searchHtml(knownReview.title);
assert.ok(textOf(foundHtml).includes(SEARCH_COPY.count(reviewResults.length, knownReview.title)), 'sem a linha de resultados');
const resultsHtml = foundHtml.match(/<ul class="mt-5 grid[\s\S]*<\/ul>/)?.[0] ?? '';
assert.equal((resultsHtml.match(/<li /g) ?? []).length, reviewResults.length, 'cartões fora da contagem');
assert.ok(foundHtml.includes(`href="/reviews/${knownReview.slug}"`), 'cartão sem o link do artigo');
assert.match(foundHtml, /<img [^>]*sizes="[^"]+"/, 'capa sem sizes');
assert.match(foundHtml, /<div role="search"[^>]*><input data-busca=""/, 'sem o campo de busca na página');
assert.doesNotMatch(foundHtml, /data-search-empty/);
assert.ok(!textOf(foundHtml).includes(SEARCH_COPY.intro), 'a introdução aparece com um termo');
const emptyHtml = searchHtml('zzzz');
const emptyText = textOf(emptyHtml);
assert.ok(emptyText.includes(SEARCH_COPY.emptyTitle('zzzz')), 'sem o título de nada encontrado');
assert.ok(emptyText.includes(`${SEARCH_COPY.emptyHint} /cupons .`), 'sem a dica de nada encontrado');
assert.ok(emptyHtml.includes('href="/cupons"'), 'a dica sem o link para /cupons');
assert.doesNotMatch(emptyHtml, /data-search-count/);
const blankHtml = searchHtml('');
assert.ok(textOf(blankHtml).includes(SEARCH_COPY.intro), 'sem a introdução sem termo');
assert.doesNotMatch(blankHtml, /titulo-resultados/);
assert.match(blankHtml, /<h1[^>]*><span class="marca-texto marca-texto-entra">Buscar no site<\/span><\/h1>/);
assert.deepEqual(jsonLdOf(blankHtml).find((schema) => schema['@type'] === 'BreadcrumbList'), getBreadcrumbListJsonLd(SEARCH_TRAIL));

for (const pageHtml of [privacyHtml, foundHtml]) {
  assert.doesNotMatch(pageHtml.match(/<header[\s\S]*?<\/header>/)?.[0] ?? '', /lg:self-end/, 'cabeçalho sem aside com lg:self-end');
}

// Nada do visual antigo nas páginas.
for (const [page, pageHtml] of [
  ['/faqs', faqHtml],
  ['/contato', contactHtml],
  ['/privacidade', privacyHtml],
  ['/buscar', foundHtml],
  ['/buscar sem resultado', emptyHtml],
] as const) {
  assert.doesNotMatch(
    pageHtml,
    /#0f1d3a|#ff6b35|#1a4d2e|rounded-\[(?:2|2\.5|3)rem\]|gradient|uppercase|tracking-wider/i,
    `${page} com classe do visual antigo`
  );
}

console.log(
  `✅ institucionais: /sobre com ${content.stats.length} números dos dados (${social.length} redes, ${expectedCounts.articles} artigos, ${expectedCounts.stores} lojas, ${expectedCounts.recipes} receitas), o selo só no prazo, ${content.paths.length} caminhos, ${content.partners.length} marcas, a trilha e o Person passaram.`
);
console.log(
  `✅ institucionais: /faqs com ${faqQuestions.length} perguntas em ${FAQ_CATEGORIES.length} categorias, o FAQPage igual à página e os atalhos; /contato com ${CONTACT_SUBJECTS.length} assuntos iguais aos da rota e o HTML do e-mail escapado.`
);
console.log(
  `✅ institucionais: /privacidade com ${PRIVACY_SECTIONS.length} seções, o sumário e ${externalPrivacyLinks.length} links externos em https; /buscar com ${reviewResults.length} resultado(s) para "${knownReview.title}", a capa e o aviso de nada encontrado.`
);
