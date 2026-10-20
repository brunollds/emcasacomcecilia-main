import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { pickRelatedReviews } from '@/lib/relatedReviews';
import { getArticleStoreBlock, shortenRule } from '@/lib/articleStore';
import { getActiveCoupons, getCouponBySlug } from '@/lib/couponsData';
import { COUPON_STORE_COPY } from '@/components/coupons/couponStoreCopy';
import { resolveYesStylePage } from '@/components/coupons/yesstylePage';
import { LABEL_SAME_AS_PORTUGUESE, OTHER_COUPONS, codeAsCouponRegExp } from './locale-home-guards';
import { getLocalizedCoupon, isTranslatedLocale } from '@/lib/couponTranslations';
import { getStoreCode } from '@/lib/homeStores';
import { isInternalLink } from '@/lib/internalLinks';
import { DropCapParagraph } from '@/components/editorial/DropCapParagraph';
import { resolveReviewLocale } from '@/lib/content/review-i18n';
import { getArticleCopy } from '@/components/review/articleCopy';
import { buildSchemaAuthors } from '@/lib/content';
import { BRUNO_AUTHOR, CECILIA_AUTHOR } from '@/lib/content/authors';
import { ReviewGallerySection } from '@/components/review/ReviewGallerySection';
import { getGalleryCopy } from '@/components/review/galleryCopy';
import { getReviewCanonicalPathname } from '@/lib/content/review-i18n';
import { LOCALE_KEYS } from '@/lib/i18n/locales';
import { getShellCopy } from '@/lib/i18n/shellDictionary';
import { getReviewHubCopy } from '@/lib/review-hubs';
import { buildReviewTemplateProps } from '@/lib/review-template-props';
import { publishedReviews } from '@/lib/data';
import { isDockVisible } from '@/components/review/dockVisibility';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { ChangelogDetails } from '@/components/editorial/ChangelogDetails';

const mk = (id: number, o: Partial<{ locale: string; affiliate: string; category: string; type: string; publishedAtISO: string }>) =>
  ({ id, slug: `a${id}`, publishedAtISO: '2026-10-01', ...o });
const cur = mk(1, { affiliate: 'damie', category: 'produto', type: 'Review' });
const corpus = [cur, mk(2, { affiliate: 'insider' , category: 'produto' }), mk(3, { affiliate: 'damie', category: 'guia' }),
  mk(4, { category: 'produto', type: 'Review' }), mk(5, { locale: 'en', affiliate: 'damie' }), mk(6, { type: 'Review' }), mk(7, {})];
assert.deepEqual(pickRelatedReviews(cur, corpus).map((r) => r.id), [3, 4, 2, 6, 7]);
assert.ok(pickRelatedReviews(cur, corpus).every((r) => r.id !== 1 && r.locale !== 'en'));

// Todo artigo publicado: até 6, mesmo idioma, os da mesma loja primeiro.
for (const review of publishedReviews) {
  const related = pickRelatedReviews(review, publishedReviews);
  assert.ok(related.length <= 6 && !related.some((r) => r.id === review.id));
  assert.ok(
    related.every((r) => resolveReviewLocale(r.locale) === resolveReviewLocale(review.locale)),
    `${review.slug}: relacionado de outro idioma`
  );
  const sameStore = related.map((r) => Boolean(review.affiliate) && r.affiliate === review.affiliate);
  assert.deepEqual(sameStore, [...sameStore].sort((a, b) => Number(b) - Number(a)), `${review.slug}: mesma loja não veio primeiro`);
}

// Bloco da loja: Review Focus 1–3.
for (const review of publishedReviews) {
  const block = getArticleStoreBlock(review, (review.locale ?? 'pt') as never);
  if (!review.affiliate) assert.equal(block, null, review.slug);
  if (block && review.locale && review.locale !== 'pt') {
    assert.ok(!block.couponPageHref?.startsWith('/cupons/'), `${review.slug}: link PT fora do PT`);
    assert.equal(block.articlesHref, undefined);
    const localized = isTranslatedLocale(review.locale) ? getLocalizedCoupon(review.affiliate!, review.locale) : undefined;
    assert.equal(block.discount, block.code && block.code === getStoreCode(getCouponBySlug(review.affiliate!)!) ? localized?.discount : undefined, `${review.slug}: desconto em PT fora do PT`);
    assert.ok(!/br\.shein\.com/.test(block.storeHref ?? ''), `${review.slug}: link da SHEIN Brasil fora do PT`);
    assert.ok(block.rules.length === 0 || block.rules.every((r) => r.label && r.value));
  }
  if (block?.code === 'CECILIA010') assert.equal(block.codeKind, 'reward');
}
// "Ir para a loja" leva à loja: um cta.url interno (a página de cupons do site) cede ao link de afiliado da loja,
// que é sempre patrocinado; o cta externo mantém a marcação dele.
for (const review of publishedReviews) {
  const block = getArticleStoreBlock(review, resolveReviewLocale(review.locale) as never);
  if (!block?.storeHref) continue;
  assert.ok(!isInternalLink(block.storeHref), `${review.slug}: link da loja interno (${block.storeHref})`);
  const ctaSponsored = review.cta?.sponsored ?? true;
  assert.equal(block.storeSponsored, block.storeHref === review.cta?.url ? ctaSponsored : true, `${review.slug}: patrocínio do link da loja`);
}
assert.equal(getArticleStoreBlock({ ...publishedReviews[0], affiliate: 'kopenhagen' } as never, 'pt'), null, 'loja pausada');
assert.equal(getCouponBySlug('kopenhagen'), undefined, 'kopenhagen deveria estar pausada');
assert.equal(getArticleStoreBlock({ ...publishedReviews[0], affiliate: 'loja-que-nao-existe' } as never, 'pt'), null);

// Texto longo cortado na última palavra antes de 140, com reticências.
assert.equal(shortenRule('Vale para tudo'), 'Vale para tudo');
const exact = 'a'.repeat(140);
assert.equal(shortenRule(exact), exact);
const long = Array.from({ length: 40 }, (_, i) => `palavra${i}`).join(' ');
assert.ok(long.length > 140);
const cut = shortenRule(long);
assert.ok(cut.length <= 141 && cut.endsWith('…'), cut);
const body = cut.slice(0, -1);
assert.ok(long.startsWith(body) && long[body.length] === ' ', `cortou palavra no meio: ${cut}`);
assert.ok(!/\s$/.test(body));

// Review Focus 2: o código do artigo difere do da loja, sem regras nem desconto; igual, com regras.
const base = publishedReviews.find((r) => r.affiliate === 'damie' && !r.locale) ?? publishedReviews.find((r) => r.affiliate && !r.locale)!;
const store = getCouponBySlug(base.affiliate!)!;
const storeCode = store.offerMode === 'discount-code' ? store.code : store.referral?.code;
assert.ok(storeCode, 'loja de teste sem código');
const other = getArticleStoreBlock({ ...base, coupon: 'CODIGO-DE-CAMPANHA' } as never, 'pt')!;
assert.equal(other.code, 'CODIGO-DE-CAMPANHA');
assert.deepEqual(other.rules, []);
assert.equal(other.discount, undefined);
const same = getArticleStoreBlock({ ...base, coupon: storeCode } as never, 'pt')!;
assert.equal(same.code, storeCode);
assert.ok(same.rules.length > 0 && same.rules.length <= 3);
assert.ok(same.rules.every((r) => r.value.length <= 141));
assert.ok(same.discount);
assert.equal(same.couponPageHref, `/cupons/${store.slug}`);

// Rótulos das regras: nos 10 idiomas, e os de fora do PT diferem do PT.
const ptCopy = getArticleCopy('pt');
for (const loc of LOCALE_KEYS) {
  const c = getArticleCopy(loc);
  assert.ok(c.ruleTestedLabel && c.ruleVerifiedLabel, `${loc}: rótulo ausente`);
  if (loc !== 'pt') {
    assert.notEqual(c.ruleTestedLabel, ptCopy.ruleTestedLabel, loc);
    assert.notEqual(c.ruleVerifiedLabel, ptCopy.ruleVerifiedLabel, loc);
  }
}

// Fora do PT com tradução (SHEIN): regras reais, rótulos sem espaço duplo e diferentes dos do PT.
const sheinCode = (getCouponBySlug('shein') as { referral?: { code: string } }).referral!.code;
const ptLabels = new Set([ptCopy.ruleTestedLabel, ptCopy.ruleVerifiedLabel, 'Vale para', 'Junta com outras promoções?']);
for (const loc of ['ja', 'zh-hant', 'ko', 'en'] as const) {
  const block = getArticleStoreBlock({ ...base, locale: loc, affiliate: 'shein', coupon: sheinCode } as never, loc)!;
  assert.ok(block.rules.length > 0, `${loc}: sem regras`);
  for (const rule of block.rules) {
    assert.ok(rule.label.trim() && rule.value.trim(), `${loc}: regra vazia`);
    assert.ok(!/\s{2,}/.test(`${rule.label} ${rule.value}`), `${loc}: espaço duplo`);
    assert.ok(!ptLabels.has(rule.label), `${loc}: rótulo em português`);
  }
  assert.equal(block.rules.at(-1)!.label, getArticleCopy(loc).ruleVerifiedLabel);
}

// Fora do PT, loja sem página traduzida e fora a YesStyle: sem link de página, sem regras, sem SHEIN Brasil.
const plain = getArticleStoreBlock({ ...base, locale: 'ja', affiliate: 'damie', coupon: 'CECILIA12' } as never, 'ja')!;
assert.equal(plain.couponPageHref, undefined);
assert.deepEqual(plain.rules, []);
assert.equal(plain.articlesHref, undefined);
assert.ok(!/br\.shein\.com/.test(plain.storeHref ?? ''));

// Textos novos do artigo: nos 10 idiomas, sem campo vazio e, fora do PT, diferentes dos do PT.
const DAMIE = { slug: 'damie', brand: 'DAMIE' };
const newTexts = (loc: (typeof LOCALE_KEYS)[number]) => {
  const c = getArticleCopy(loc);
  return {
    copiedHint: c.copiedHint(DAMIE),
    copiedHintReward: c.copiedHint({ slug: 'yesstyle', brand: 'YesStyle' }, 'reward'),
    copiedHintReferral: c.copiedHint({ slug: 'shein', brand: 'SHEIN' }, 'referral'),
    storeBlockTitle: c.storeBlockTitle(DAMIE),
    allRules: c.allRules,
    allStoreArticles: c.allStoreArticles(12, DAMIE),
    authorBoxTitle: c.authorBoxTitle,
    authorBoxBody: c.authorBoxBody,
    authorBoxLink: c.authorBoxLink,
    brunoBoxTitle: c.brunoBoxTitle,
    brunoBoxBody: c.brunoBoxBody,
    disclosureMore: c.disclosureMore,
    listenPause: c.listenPause,
    listenResume: c.listenResume,
    listenStop: c.listenStop,
  };
};
const ptTexts = newTexts('pt');
assert.equal(ptTexts.copiedHint, 'Copiado. Agora é só colar no checkout da DAMIE.');
assert.equal(ptTexts.storeBlockTitle, 'Sua compra na DAMIE');
assert.equal(ptTexts.allStoreArticles, 'Todos os 12 artigos da DAMIE');
// A caixa do Bruno: textos exatos em português; o link do Sonar de Ofertas só existe em português.
assert.equal(ptTexts.brunoBoxTitle, 'Oi, eu sou o Bruno');
assert.equal(ptTexts.brunoBoxBody, 'Marido da Cecília e a outra metade do Em Casa: atrás das câmeras e do computador.');
assert.equal(ptCopy.brunoBoxLink, 'Conheça o Sonar de Ofertas');
for (const loc of LOCALE_KEYS) if (loc !== 'pt') assert.equal(getArticleCopy(loc).brunoBoxLink, null, `${loc}: link da caixa do Bruno fora do PT`);
// No JSON-LD, o autor sem url nos JSONs dos artigos leva a url do autor central de mesmo slug.
const { url: _brunoUrl, ...brunoWithoutUrl } = BRUNO_AUTHOR;
assert.equal(BRUNO_AUTHOR.url, 'https://sonardeofertas.com.br');
assert.deepEqual(buildSchemaAuthors([brunoWithoutUrl], undefined), { '@type': 'Person', name: 'Bruno Luiz', url: 'https://sonardeofertas.com.br' });
const { url: _ceciliaUrl, ...ceciliaWithoutUrl } = CECILIA_AUTHOR;
const schemaAuthors = buildSchemaAuthors([ceciliaWithoutUrl, brunoWithoutUrl], undefined);
assert.ok(Array.isArray(schemaAuthors) && schemaAuthors.length === 2);
assert.equal(schemaAuthors[0].url, 'https://emcasacomcecilia.com/sobre');
assert.equal(schemaAuthors[1].url, 'https://sonardeofertas.com.br');
// O Magalu é masculino, como na home ("do Magalu"); as outras lojas, femininas.
const magalu = { slug: 'magalu', brand: getCouponBySlug('magalu')!.brand };
assert.equal(magalu.brand, 'Magalu');
assert.equal(ptCopy.storeBlockTitle(magalu), 'Sua compra no Magalu');
assert.equal(ptCopy.copiedHint(magalu), 'Copiado. Agora é só colar no checkout do Magalu.');
assert.equal(ptCopy.allStoreArticles(7, magalu), 'Todos os 7 artigos do Magalu');
assert.equal(getArticleCopy('en').storeBlockTitle(magalu), 'Shopping at Magalu');
assert.ok(ptTexts.copiedHintReward.includes('Reward Code da YesStyle'), ptTexts.copiedHintReward);
for (const loc of LOCALE_KEYS) {
  const texts = newTexts(loc);
  for (const [field, text] of Object.entries(texts)) {
    assert.ok(text.trim(), `${loc}: ${field} vazio`);
    assert.ok(!/\s{2,}/.test(text), `${loc}: ${field} com espaço duplo`);
    if (loc !== 'pt') assert.notEqual(text, ptTexts[field as keyof typeof ptTexts], `${loc}: ${field} igual ao PT`);
  }
  // Recompensa vai no campo Reward Code; indicação não se cola no checkout: os três textos diferem.
  assert.equal(new Set([texts.copiedHint, texts.copiedHintReward, texts.copiedHintReferral]).size, 3, `${loc}: copiedHint igual nos três tipos`);
  assert.ok(texts.copiedHintReward.includes('Reward Code'), `${loc}: recompensa sem o campo Reward Code`);
  assert.ok(texts.copiedHintReferral.includes('SHEIN'), `${loc}: indicação sem a loja`);
  assert.ok(texts.allStoreArticles.includes('12'), `${loc}: contagem fora do texto`);
}

// Trilha: home do idioma > lista de guias com o nome do menu do idioma (em PT, Guias & Análises) > artigo.
for (const loc of LOCALE_KEYS) {
  const review = publishedReviews.find((r) => resolveReviewLocale(r.locale) === loc);
  assert.ok(review, `${loc}: sem artigo publicado`);
  const { breadcrumbs, breadcrumbJsonLd } = buildReviewTemplateProps(review);
  const hub = breadcrumbs.at(-1)!;
  assert.equal(hub.name, getShellCopy(loc).reviewHubLabel, `${loc}: trilha sem o nome da lista de guias`);
  if (loc === 'pt') assert.equal(hub.name, 'Guias & Análises');
  else assert.equal(hub.name, getReviewHubCopy(loc).title, `${loc}: trilha diferente do título da lista`);
  const items = (breadcrumbJsonLd as { itemListElement: Array<{ name: string }> }).itemListElement;
  assert.equal(items.at(-2)!.name, hub.name, `${loc}: BreadcrumbList diferente da trilha`);
}

// Os relacionados chegam ao template como cartões da estante: os de pickRelatedReviews, na ordem, com o endereço
// do artigo no idioma dele e a data no formato do idioma. A estante de /reviews segue com DD/MM/AAAA.
for (const loc of LOCALE_KEYS) {
  const review = publishedReviews.find((r) => resolveReviewLocale(r.locale) === loc)!;
  const { relatedReviews } = buildReviewTemplateProps(review);
  const expected = pickRelatedReviews(review, publishedReviews);
  assert.equal(relatedReviews.length, 6, `${loc}: ${relatedReviews.length} relacionados`);
  assert.deepEqual(relatedReviews.map((article) => article.href), expected.map(getReviewCanonicalPathname), `${loc}: relacionados fora da ordem`);
  assert.deepEqual(relatedReviews.map((article) => article.title), expected.map((item) => item.title));
  for (const article of relatedReviews) {
    assert.ok(/\d/.test(article.fullDate) && !/[a-z]/i.test(article.fullDate), `${loc}: data ${article.fullDate}`);
  }
  if (loc === 'pt') assert.match(relatedReviews[0].fullDate, /^\d{2}\/\d{2}\/\d{4}$/);
  if (loc === 'ja') assert.match(relatedReviews[0].fullDate, /^\d{4}\/\d{2}\/\d{2}$/);
}

// A galeria de um item só sai sem carrossel e sem setas; com dois, é o carrossel de sempre.
const galleryOf = (count: number) =>
  renderToStaticMarkup(
    createElement(ReviewGallerySection, {
      images: Array.from({ length: count }, (_, index) => ({ image: `/images/teste-${index}.jpg`, alt: `Foto ${index}` })),
      locale: 'en',
    })
  );
const galleryCopy = getGalleryCopy('en');
const singleGallery = galleryOf(1);
assert.ok(singleGallery.includes('teste-0'), 'galeria de um item sem a foto');
assert.ok(!singleGallery.includes('data-gallery-card'), 'galeria de um item em carrossel');
for (const label of [galleryCopy.previousPhotos, galleryCopy.nextPhotos]) assert.ok(!singleGallery.includes(label), `galeria de um item com "${label}"`);
const pairGallery = galleryOf(2);
assert.equal(pairGallery.match(/data-gallery-card/g)?.length, 2, 'galeria de dois itens sem o carrossel');
assert.ok(pairGallery.includes(galleryCopy.nextPhotos), 'carrossel sem as setas');
assert.equal(galleryOf(0), '', 'galeria vazia renderizou');

// O título da galeria diz o que ela mostra: só fotos, "Photos"; só vídeos, "Videos"; as duas, "Photos and videos".
const headingOf = (html: string) => html.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/)?.[1].replace(/<[^>]+>/g, '');
const galleryVideo = { url: 'https://www.youtube.com/watch?v=abcdefghijk', title: 'Vídeo de teste', thumbnailUrl: '/images/teste-video.jpg' };
const withVideos = (count: number) =>
  renderToStaticMarkup(
    createElement(ReviewGallerySection, {
      images: Array.from({ length: count }, (_, index) => ({ image: `/images/teste-${index}.jpg`, alt: `Foto ${index}` })),
      videos: [galleryVideo],
      locale: 'en',
    })
  );
assert.equal(headingOf(pairGallery), galleryCopy.tabPhotos, 'galeria só de fotos sem o título de fotos');
assert.equal(headingOf(singleGallery), galleryCopy.tabPhotos, 'galeria de uma foto sem o título de fotos');
assert.equal(headingOf(withVideos(0)), galleryCopy.tabVideos, 'galeria só de vídeo sem o título de vídeos');
assert.equal(headingOf(withVideos(2)), galleryCopy.heading, 'galeria mista sem "fotos e vídeos"');
for (const loc of LOCALE_KEYS) {
  const c = getGalleryCopy(loc);
  assert.equal(new Set([c.heading, c.tabPhotos, c.tabVideos]).size, 3, `${loc}: títulos da galeria iguais`);
}

// YesStyle: o bloco do fim usa o que a página da YesStyle diz do código de recompensa (soma com os cupons da loja,
// vai no campo Reward Code) e a data dela, em todo idioma; nada da seção dos cupons da loja. O código nunca é
// chamado de cupom nem posto "com outros cupons", em nenhum ponto do valor; fora do PT, nenhum texto do PT.
const yesStyleCode = getStoreCode(getCouponBySlug('yesstyle')!)!;
const rewardAsCoupon = codeAsCouponRegExp([yesStyleCode])!;
const rewardWithOtherCoupons = new RegExp(`${yesStyleCode}[\\s\\S]*(?:${OTHER_COUPONS})`, 'iu');
const yesStyleBlock = (loc: (typeof LOCALE_KEYS)[number]) =>
  getArticleStoreBlock({ ...base, locale: loc, affiliate: 'yesstyle', coupon: yesStyleCode } as never, loc)!;
const ptYesStyle = yesStyleBlock('pt');
const ptYesStyleTexts = new Set([...ptYesStyle.rules.flatMap((rule) => [rule.label, rule.value]), ...ptLabels]);
for (const loc of LOCALE_KEYS) {
  const page = resolveYesStylePage(loc)!;
  const block = yesStyleBlock(loc);
  const rules = COUPON_STORE_COPY[loc].rules;
  assert.deepEqual(
    block.rules,
    [
      { label: rules.combinable, value: shortenRule(page.intro) },
      { label: page.rewardCodeLabel, value: shortenRule(page.rewardFieldNote) },
      { label: getArticleCopy(loc).ruleVerifiedLabel, value: page.formattedDate },
    ],
    `${loc}: regras da YesStyle diferentes do que a página diz do código`
  );
  const policyTexts = Object.values(page.policyRules).flatMap((text) => [text, shortenRule(text)]);
  for (const rule of block.rules) {
    assert.ok(!policyTexts.includes(rule.value), `${loc}: regra dos cupons da loja no bloco do código: ${rule.value}`);
    assert.ok(!rewardAsCoupon.test(rule.value) && !rewardAsCoupon.test(rule.label), `${loc}: ${yesStyleCode} chamado de cupom: ${rule.value}`);
    assert.ok(!rewardWithOtherCoupons.test(rule.value), `${loc}: ${yesStyleCode} com outros cupons: ${rule.value}`);
    const sameWord = rule.label === page.rewardCodeLabel && LABEL_SAME_AS_PORTUGUESE.has(`${loc}:reward`);
    if (loc !== 'pt') assert.ok((sameWord || !ptYesStyleTexts.has(rule.label)) && !ptYesStyleTexts.has(rule.value), `${loc}: regra em português: ${rule.label}`);
  }
}
// Os artigos da YesStyle publicados, em todo idioma, saem com as regras.
const yesStyleArticles = publishedReviews.filter((review) => review.affiliate === 'yesstyle' && review.coupon === yesStyleCode);
assert.deepEqual(
  LOCALE_KEYS.filter((loc) => !yesStyleArticles.some((review) => resolveReviewLocale(review.locale) === loc)),
  [],
  'idioma sem artigo da YesStyle'
);
for (const review of yesStyleArticles) {
  const block = getArticleStoreBlock(review, resolveReviewLocale(review.locale) as never)!;
  assert.ok(block.rules.length > 0, `${review.slug}: YesStyle sem regras`);
}

// Loja sem código (Lejour e as demais de link de afiliado): as regras da página da loja, sempre, com a data dela.
const linkStores = getActiveCoupons().filter((coupon) => !getStoreCode(coupon));
assert.ok(linkStores.some((coupon) => coupon.slug === 'lejour'), 'Lejour fora das lojas sem código');
for (const coupon of linkStores) {
  const block = getArticleStoreBlock({ ...base, affiliate: coupon.slug, coupon: undefined } as never, 'pt')!;
  const date = new Date(`${coupon.lastVerified}T12:00:00`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  assert.ok(block.rules.length > 0, `${coupon.slug}: loja sem código sem regras`);
  assert.deepEqual(block.rules.at(-1), { label: ptCopy.ruleVerifiedLabel, value: date }, `${coupon.slug}: data diferente da página`);
  if (coupon.eligibleCategories) assert.equal(block.rules[0].value, shortenRule(coupon.eligibleCategories));
}
const lejourArticle = publishedReviews.find((review) => review.slug === 'lejour-como-funciona');
assert.ok(lejourArticle, 'artigo da Lejour ausente');
assert.ok(getArticleStoreBlock(lejourArticle, 'pt')!.rules.length > 0, 'artigo da Lejour sem regras');

// Barra do celular: sem o recorte do topo, aparece quando a leitura chega à primeira seção, como antes; com ele, só
// depois que o recorte sai pela parte de cima da tela. Some enquanto o bloco da loja do fim (#loja) está na tela.
const dockCases: Array<[Parameters<typeof isDockVisible>[0], boolean]> = [
  [{ cutoutPassed: null, sectionReached: false, storeInView: false }, false],
  [{ cutoutPassed: null, sectionReached: true, storeInView: false }, true],
  [{ cutoutPassed: null, sectionReached: true, storeInView: true }, false],
  [{ cutoutPassed: false, sectionReached: true, storeInView: false }, false],
  [{ cutoutPassed: true, sectionReached: false, storeInView: false }, true],
  [{ cutoutPassed: true, sectionReached: true, storeInView: false }, true],
  [{ cutoutPassed: true, sectionReached: true, storeInView: true }, false],
];
for (const [input, expected] of dockCases) assert.equal(isDockVisible(input), expected, `dock: ${JSON.stringify(input)}`);

// Peças do topo do artigo. O LanguageSwitcher só existe no artigo (o do menu é outro, no Navbar): vai direto para a D2.
// O histórico de atualizações é o mesmo das receitas: no artigo (variant="d2"), sem as cores antigas; o padrão
// continua o das receitas.
const OLD_HEX = /#(?:1a4d2e|ff6b35|0f1d3a|faf8f3)/i;
assert.ok(
  !OLD_HEX.test(renderToStaticMarkup(createElement(LanguageSwitcher, { currentLocale: 'en', links: { pt: '/reviews/a', en: '/en/reviews/a' } }))),
  'LanguageSwitcher com cor antiga'
);
const changelog = (variant?: 'd2') => renderToStaticMarkup(createElement(ChangelogDetails, { entries: [{ date: '2026-10-01', text: 'Revisado.' }], variant }));
assert.ok(!OLD_HEX.test(changelog('d2')), 'ChangelogDetails d2 com cor antiga');
assert.ok(OLD_HEX.test(changelog()), 'ChangelogDetails padrão (receitas) mudou de cor');

// A capitular não come o primeiro caractere da marcação: com ela, "**Preços:**" virava "*" e "*Preços:**".
const dropCap = (text: string) =>
  renderToStaticMarkup(createElement(DropCapParagraph, { text, variant: 'd2', renderText: (rest: string) => `[${rest}]` }));
assert.ok(!dropCap('**Preços de hoje:** veja a tabela.').includes('aria-hidden'), 'parágrafo que abre com negrito ganhou capitular');
assert.ok(dropCap('**Preços de hoje:** veja a tabela.').includes('[**Preços de hoje:** veja a tabela.]'), 'parágrafo que abre com negrito perdeu a marcação');
assert.ok(dropCap('Hoje no site.').includes('aria-hidden="true"'), 'parágrafo comum sem capitular');

console.log(`✅ artigo D2: relacionados, bloco da loja, textos novos, trilha, galeria, a regra da barra do celular (${dockCases.length} casos) e o topo do artigo`);
