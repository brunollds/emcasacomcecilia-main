// Etapa 4 do piloto L'Amazonie: monta cobertura.csv, nossos-dados.csv e comercial.csv.
// Rodar na raiz do repositório:
//   node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/lamazonie/2-processado/etapa4-montar.mjs"
// Lê o repositório (content/reviews, src/lib/couponsData.ts) e as coletas de 05_Demanda/_site/.
// As perguntas e a avaliação de cobertura (total ou parcial) são leitura de quem analisou, escritas aqui.
import fs from 'node:fs';

const DEMANDA = 'docs/Memoria de Artigos/memreview/05_Demanda';
const SITE = `${DEMANDA}/_site`;
const OUT = `${DEMANDA}/parceiros/lamazonie/2-processado`;
const LIDO_EM = '2026-11-17';
const ORIGEM = 'https://emcasacomcecilia.com';

const GSC = '20261117-1008-gsc-desempenho';
const GA4 = '20261117-1016-ga4-relatorios';
const BING = '20261117-1020-bing-desempenho';
const CLARITY = '20261117-1023-clarity-painel';

// ---------- CSV ----------
function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', quoted = false;
  const t = text.replace(/^﻿/, '');
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (quoted) {
      if (c === '"' && t[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else if (c !== '\r') cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  return rows;
}
const esc = (v) => {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
function writeCsv(file, header, rows) {
  for (const r of rows) {
    if (r.length !== header.length) throw new Error(`${file}: linha com ${r.length} colunas: ${r[0]}`);
    r.forEach((v, i) => { if (v === '' || v === undefined || v === null) throw new Error(`${file}: célula vazia em ${r[0]}, coluna ${header[i]}`); });
  }
  fs.writeFileSync(`${OUT}/${file}`, [header, ...rows].map((r) => r.map(esc).join(',')).join('\n') + '\n');
  console.log(`${file}: ${rows.length} linhas`);
}
const read = (p) => fs.readFileSync(p, 'utf8');
const readCsv = (p) => parseCsv(read(p));

// ---------- Lojas ----------
const LOJAS = {
  lamazonie: { nome: "L'Amazonie", desde: '2026-11-16' },
  'simple-organic': { nome: 'Simple Organic', desde: '2026-11-03', ref: 'mercado BR, loja brasileira com entrega no Brasil; página de cupom no ar desde 2026-11-03 (14 dias na leitura)' },
  skelt: { nome: 'Skelt', desde: '2026-10-21', ref: 'mercado BR, loja brasileira com entrega no Brasil; página de cupom no ar desde 2026-10-21 (27 dias na leitura)' },
  yesstyle: { nome: 'YesStyle', desde: '2026-06-02', ref: 'loja internacional, em 10 idiomas no site; sem entrega ao Brasil na última conferência do dossiê (28/10/2026); página de cupom no ar desde 2026-06-02 (5 meses e meio na leitura)' },
};

const reviews = fs.readdirSync('content/reviews')
  .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
  .map((f) => ({ file: `content/reviews/${f}`, ...JSON.parse(read(`content/reviews/${f}`)) }))
  .filter((r) => typeof r.affiliate === 'string' && LOJAS[r.affiliate] && (r.locale ?? 'pt') === 'pt')
  .sort((a, b) => a.slug.localeCompare(b.slug));
const daLoja = (loja) => reviews.filter((r) => r.affiliate === loja);

// ---------- cobertura.csv ----------
const cobertura = [];
let cobN = 0;
const cob = (o) => cobertura.push([
  `cob-lamazonie-${String(++cobN).padStart(4, '0')}`, o.url, o.tipo, o.estado, o.pergunta, o.entidades,
  'pt-BR', o.mercado ?? 'BR', o.cobertura, LIDO_EM, o.evidencia, o.notas,
]);
const coupons = read('src/lib/couponsData.ts');
const lzStart = coupons.indexOf("slug: 'lamazonie'");
const lzBlock = coupons.slice(lzStart, coupons.indexOf('offerMode:', coupons.indexOf('offerMode:', lzStart) + 10));
const evCupom = (trecho) => {
  if (!lzBlock.includes(trecho)) throw new Error(`couponsData.ts (bloco lamazonie) sem o trecho: ${trecho}`);
  return `src/lib/couponsData.ts#"${trecho}"`;
};
const NO_AR = 'No ar: https://emcasacomcecilia.com respondeu 200 neste endereço em 2026-11-17T10:28-03:00.';
const pagCupom = [
  ["Qual é o cupom da L'Amazonie e quanto ele dá de desconto?", 'total', "code: 'CECILIA'", 'Código e percentual no topo da página; teste no checkout de 16/11/2026.'],
  ["Onde coloco o cupom na L'Amazonie?", 'total', "Onde coloco o cupom na L'Amazonie?", 'Passo a passo e print do checkout próprio (seguro.lamazonie.com.br).'],
  ["O cupom da L'Amazonie soma com promoção e com o Pix?", 'parcial', "benefit: 'promocoes'", 'Tabela O que acumula com promoções, Pix e frete. Falta: soma com o cashback e valor mínimo do cupom, sem leitura no dossiê.'],
  ["O cupom L'Amazonie vale na primeira compra e para quem já é cliente?", 'total', "O cupom L'Amazonie vale na primeira compra?", 'Duas perguntas do FAQ.'],
  ["Tem cupom L'Amazonie na Black Friday?", 'parcial', "Tem cupom L'Amazonie na Black Friday?", 'A loja não publicou datas nem regulamento da campanha; reler na semana de 27/11/2026.'],
  ["O cupom da L'Amazonie dá frete grátis?", 'total', 'O cupom dá frete grátis?', 'Frete grátis por valor e região, segundo a loja.'],
  ["Como funciona a troca na L'Amazonie?", 'total', "Como funciona a troca na L'Amazonie?", 'Política da loja; o detalhe do Procon-SP está no artigo de confiança.'],
  ['O que fazer se o cupom CECILIA não funcionar?', 'total', 'O que fazer se o cupom CECILIA não funcionar?', 'Aponta o checkout próprio como o único que aceita o código.'],
];
for (const [pergunta, cobertura_, trecho, notas] of pagCupom) {
  cob({ url: '/cupons/lamazonie', tipo: 'pagina-cupom', estado: 'no-ar', pergunta, entidades: '@nao-investigado', cobertura: cobertura_, evidencia: evCupom(trecho), notas: `${notas} ${NO_AR}` });
}

// [slug, [ [pergunta, cobertura, regex do título da seção, notas] ]]
const ARTIGOS_LZ = [
  ['cupom-lamazonie-como-usar', [
    ["Como usar o cupom CECILIA na L'Amazonie?", 'total', /^Onde digitar o cupom/, 'Passo a passo com a conta de um carrinho testado.'],
    ['Por que aparece "Insira um código de desconto válido" ao aplicar o cupom?', 'total', /^Por que aparece/, 'O código só entra no checkout próprio, aberto pelo botão Finalizar compra.'],
    ["O cupom da L'Amazonie soma com kit, promoção, Pix e cashback?", 'parcial', /^O cupom soma com kit/, 'Promoção e Pix cobertos. Falta: a soma com o cashback não foi confirmada (seção Cashback é crédito para depois).'],
    ["O cupom da L'Amazonie vale para quem já é cliente?", 'total', /^Vale para quem já é cliente/, 'Sem ressalva.'],
  ]],
  ['cupom-lamazonie-primeira-compra', [
    ["Qual cupom usar na primeira compra na L'Amazonie?", 'total', /primeira compra: qual usar$/, 'Não cita o cupom de primeira compra da própria loja, por regra editorial.'],
    ["O cupom da L'Amazonie vale na segunda compra?", 'total', /^E na segunda compra/, 'Sem ressalva.'],
  ]],
  ['lamazonie-e-boa', [
    ["L'Amazonie é boa? O sérum de sobrancelhas vale a compra?", 'parcial', /^Vale comprar o sérum/, 'Sem experiência de uso dos produtos (Bruno, 16/11/2026): o texto usa a página da loja e avaliações públicas.'],
    ["Qual é a composição do sérum de sobrancelhas da L'Amazonie?", 'parcial', /^Composição/, 'A página oficial não publica a lista INCI nem o volume; falta o rótulo.'],
    ["Como usar o sérum de sobrancelhas da L'Amazonie?", 'parcial', /^Como usar, segundo a marca/, 'Modo de uso como a marca descreve, sem teste nosso.'],
    ["Quanto custam um, dois ou três frascos do sérum da L'Amazonie?", 'parcial', /^Quanto custam/, 'Preços lidos em 16/11/2026; mudam com as campanhas.'],
  ]],
  ['lamazonie-e-confiavel', [
    ["L'Amazonie é confiável?", 'total', /^Quem vende/, 'CNPJ, Anvisa, reputação, entrega, garantia, devolução e pagamento.'],
    ["O sérum da L'Amazonie é regularizado na Anvisa?", 'total', /^O que a Anvisa mostra/, 'Produto notificado (isento de registro), pela base de dados abertos de 15/11/2026.'],
    ["Como funciona a garantia de 60 dias da L'Amazonie?", 'total', /^Garantia Mais Fios/, 'Condições da página de garantia. Sem leitura de a garantia valer em compra com cupom.'],
    ["Como funciona a devolução na L'Amazonie?", 'total', /^Devolução em 7 dias/, 'Política da loja ao lado da orientação do Procon-SP.'],
    ["Comprar a L'Amazonie no site oficial ou no Mercado Livre?", 'parcial', /^Site oficial ou Mercado Livre/, 'Os preços da loja oficial no Mercado Livre não foram lidos (os anúncios pediam login).'],
  ]],
  ['lamazonie-reclame-aqui-nota-reputacao', [
    ["Qual é a nota da L'Amazonie no Reclame Aqui?", 'total', /^A nota em números/, 'Nota e volume lidos em 16/11/2026; a nota muda.'],
    ["Do que os clientes da L'Amazonie mais reclamam?", 'total', /^O que mais gera reclamação/, 'Sem ressalva.'],
  ]],
  ['black-friday-lamazonie', [
    ["A Black Friday da L'Amazonie já começou, e quando começa?", 'parcial', /^A Black Friday da L.Amazonie já começou/, 'A loja não publicou datas nem regulamento; reler a vitrine e retestar o código na semana de 27/11/2026.'],
    ["O cupom CECILIA vale na Black Friday da L'Amazonie?", 'parcial', /^Como o cupom entra/, 'Sem teste do cupom nas páginas de oferta de Black Friday.'],
    ["Vale mais o kit ou o avulso na L'Amazonie?", 'parcial', /^O que já é preço de kit/, 'Preços de 16/11/2026; mudam com a campanha.'],
  ]],
];
for (const [slug, perguntas] of ARTIGOS_LZ) {
  const r = reviews.find((x) => x.slug === slug);
  if (!r) throw new Error(`artigo não encontrado: ${slug}`);
  if (r.draft !== false) throw new Error(`${slug}: draft não é false`);
  const ficha = `docs/Memoria de Artigos/memreview/02_Artigos/${slug}.md`;
  const statusFicha = (read(ficha).match(/^status: "(.+)"/m) || [])[1];
  for (const [pergunta, cobertura_, re, notas] of perguntas) {
    const sec = r.contentSections.find((s) => re.test(s.heading || ''));
    if (!sec) throw new Error(`${slug}: seção não encontrada para ${re}`);
    cob({
      url: `/reviews/${slug}`, tipo: r.reviewKind === 'guia' ? 'guia' : 'artigo', estado: 'no-ar', pergunta,
      entidades: '@nao-investigado', cobertura: cobertura_, evidencia: `${r.file}#"${sec.heading}"`,
      notas: `${notas} Publicado em ${r.publishedAtISO}. ${NO_AR} A ficha do vault (02_Artigos/${slug}.md) ainda diz status "${statusFicha}".`,
    });
  }
}

// Referência de vertical: página de cupom e artigos em PT de Simple Organic, Skelt e YesStyle.
const perguntaPadrao = (r, loja) => {
  if (/-e-boa$/.test(r.slug)) return `${loja} é boa?`;
  if (/-e-confiavel$/.test(r.slug)) return `${loja} é confiável?`;
  if (/reclame-aqui/.test(r.slug)) return `Qual é a nota da ${loja} no Reclame Aqui?`;
  if (/trustpilot/.test(r.slug)) return `Qual é a nota da ${loja} no Trustpilot?`;
  if (/^cupom-.*-como-usar$/.test(r.slug) || /^codigo-.*-como-usar$/.test(r.slug)) return `Como usar o código da ${loja}?`;
  if (/primeira-compra/.test(r.slug)) return `Qual código usar na primeira compra na ${loja}?`;
  if (/^black-friday-/.test(r.slug)) return `Como comprar na Black Friday da ${loja} e como o código entra?`;
  return r.title;
};
for (const loja of ['simple-organic', 'skelt', 'yesstyle']) {
  const L = LOJAS[loja];
  const artigos = daLoja(loja);
  const trecho = loja === 'yesstyle' ? null : `slug: '${loja}'`;
  if (trecho && !coupons.includes(trecho)) throw new Error(`couponsData.ts sem ${trecho}`);
  const base = `Referência de vertical (${L.nome}), outra loja: ${L.ref}; ${artigos.length} artigos em PT na leitura.`;
  cob({
    url: `/cupons/${loja}`, tipo: 'pagina-cupom', estado: 'no-ar', pergunta: `Qual é o código da ${L.nome} e como usar?`,
    entidades: '@nao-se-aplica', mercado: loja === 'yesstyle' ? 'internacional' : 'BR', cobertura: '@nao-investigado',
    evidencia: trecho ? `src/lib/couponsData.ts#"${trecho}"` : 'src/app/(pt)/cupons/yesstyle/page.tsx',
    notas: `${base} ${NO_AR}${loja === 'yesstyle' ? ' Código de recompensa (CECILIA010), não cupom; a página existe nos 10 idiomas.' : ''}`,
  });
  for (const r of artigos) {
    if (r.draft === true) continue;
    cob({
      url: `/reviews/${r.slug}`, tipo: r.reviewKind === 'guia' ? 'guia' : 'artigo', estado: 'no-ar', pergunta: perguntaPadrao(r, L.nome),
      entidades: '@nao-se-aplica', mercado: loja === 'yesstyle' ? 'internacional' : 'BR', cobertura: '@nao-investigado',
      evidencia: `${r.file}#"${r.contentSections[0].heading}"`,
      notas: `${base} Tipo "${r.type}", publicado em ${r.publishedAtISO}. Estado lido do JSON (draft false ou ausente) e da presença na lista de páginas do Search Console; sem conferência de resposta 200 por artigo.${r.translationKey ? ' Tem versões em outros idiomas (família ' + r.translationKey + ').' : ''}`,
    });
  }
}
writeCsv('cobertura.csv',
  ['cobertura_id', 'url_ou_slug', 'tipo_conteudo', 'estado', 'pergunta_atendida', 'entidades', 'idioma', 'mercado', 'cobertura', 'lido_em', 'evidencia', 'notas'],
  cobertura);

// ---------- nossos-dados.csv ----------
const dados = [];
let nosN = 0;
const NA = '@nao-se-aplica';
const nos = (o) => dados.push([
  `nos-lamazonie-${String(++nosN).padStart(4, '0')}`, o.plataforma, o.relatorio, o.dimensao, o.chave, NA, NA, NA,
  o.inicio, o.fim, o.metrica, String(o.valor), o.definicao, `_site/${o.coleta}`, o.evidencia, o.qualidade,
]);
const refDe = (url) => {
  const m = url.match(/\/cupons\/([a-z-]+)$/) || [];
  const loja = m[1] || (reviews.find((r) => url.endsWith(`/reviews/${r.slug}`)) || {}).affiliate;
  return loja && loja !== 'lamazonie' ? `Referência de vertical (${LOJAS[loja].nome}): outra loja; ${LOJAS[loja].ref}. ` : '';
};
const urlsVerticais = ['lamazonie', 'simple-organic', 'skelt', 'yesstyle'].flatMap((loja) => [
  `${ORIGEM}/cupons/${loja}`, ...daLoja(loja).map((r) => `${ORIGEM}/reviews/${r.slug}`),
]);
const linhaDe = (rows, pred) => { const i = rows.findIndex(pred); return i < 0 ? null : { row: rows[i], n: i + 1 }; };

// Search Console
const D = {
  cliques: 'Cliques no resultado da Pesquisa Google (web)',
  impressoes: 'Vezes em que um resultado do site apareceu na Pesquisa Google (web)',
  ctr: 'Cliques divididos por impressões, em %',
  posicao: 'Posição média do resultado mais alto do site, ponderada pelas impressões',
};
const gscP = { plataforma: 'gsc', coleta: GSC, inicio: '2026-08-16', fim: '2026-11-15' };
const gscQ = 'Search Console, propriedade de domínio, tipo de pesquisa Web, últimos 3 meses na data da coleta. ';
{
  const g = readCsv(`${SITE}/${GSC}/gsc-site-3m/grafico.csv`).slice(1);
  const soma = (i) => g.reduce((a, r) => a + Number(r[i]), 0);
  nos({ ...gscP, relatorio: 'Desempenho > Gráfico (site inteiro)', dimensao: 'site', chave: 'emcasacomcecilia.com', metrica: 'cliques', valor: soma(1), definicao: D.cliques, evidencia: 'gsc-site-3m/grafico.csv#soma da coluna Cliques', qualidade: `${gscQ}Soma dos ${g.length} dias do gráfico.` });
  nos({ ...gscP, relatorio: 'Desempenho > Gráfico (site inteiro)', dimensao: 'site', chave: 'emcasacomcecilia.com', metrica: 'impressoes', valor: soma(2), definicao: D.impressoes, evidencia: 'gsc-site-3m/grafico.csv#soma da coluna Impressões', qualidade: `${gscQ}Soma dos ${g.length} dias do gráfico.` });
}
for (const [pasta, dimensao, chave, rotulo] of [
  ['gsc-consulta-amazonie-3m', 'consulta', 'consulta contém "amazonie"', 'Filtro Consulta contém amazonie'],
  ['gsc-pagina-cupons-lamazonie-3m', 'pagina', `${ORIGEM}/cupons/lamazonie`, 'Filtro Página contém /cupons/lamazonie'],
]) {
  const g = readCsv(`${SITE}/${GSC}/${pasta}/grafico.csv`).slice(1);
  for (const [metrica, i, def] of [['cliques', 1, D.cliques], ['impressoes', 2, D.impressoes]]) {
    nos({ ...gscP, relatorio: `Desempenho > Gráfico (${rotulo})`, dimensao, chave, metrica, valor: g.reduce((a, r) => a + Number(r[i]), 0), definicao: def, evidencia: `${pasta}/grafico.csv#soma da coluna ${i === 1 ? 'Cliques' : 'Impressões'}`, qualidade: `${gscQ}Zero observado nos ${g.length} dias. A página /cupons/lamazonie entrou no ar em 16/11/2026, um dia depois do fim do período: o zero é esperado e não mede a página.` });
  }
}
{
  const pags = readCsv(`${SITE}/${GSC}/gsc-site-3m/paginas.csv`);
  const limite = `O export traz as ${pags.length - 1} páginas com mais cliques e impressões do site, não todas.`;
  for (const url of urlsVerticais) {
    const achou = linhaDe(pags, (r) => r[0] === url);
    const lz = url.includes('lamazonie');
    if (!achou) {
      if (url.endsWith('/cupons/lamazonie')) continue; // já entrou acima, pelo export filtrado
      nos({ ...gscP, relatorio: 'Desempenho > Páginas (site inteiro)', dimensao: 'pagina', chave: url, metrica: 'impressoes', valor: '@indisponivel', definicao: D.impressoes, evidencia: 'gsc-site-3m/paginas.csv', qualidade: `${gscQ}${refDe(url)}Página fora do export. ${limite}${lz ? ' Artigo publicado em 16/11/2026, depois do fim do período.' : ' Sem export filtrado para esta página.'}` });
      continue;
    }
    const [, cl, im, ctr, pos] = achou.row;
    for (const [metrica, valor, def] of [['cliques', cl, D.cliques], ['impressoes', im, D.impressoes], ['posicao-media', pos, D.posicao]]) {
      nos({ ...gscP, relatorio: 'Desempenho > Páginas (site inteiro)', dimensao: 'pagina', chave: url, metrica, valor, definicao: def, evidencia: `gsc-site-3m/paginas.csv#linha=${achou.n}`, qualidade: `${gscQ}${refDe(url)}${limite}` });
    }
  }
}
const MIN_IMPRESSOES = 10;
for (const loja of ['simple-organic', 'skelt', 'yesstyle']) {
  const pasta = `gsc-pagina-cupons-${loja}-3m`;
  const url = `${ORIGEM}/cupons/${loja}`;
  const cons = readCsv(`${SITE}/${GSC}/${pasta}/consultas.csv`);
  cons.forEach((r, i) => {
    if (i === 0 || Number(r[2]) < MIN_IMPRESSOES) return;
    for (const [metrica, valor, def] of [['cliques', r[1], D.cliques], ['impressoes', r[2], D.impressoes], ['posicao-media', r[4], D.posicao]]) {
      nos({ ...gscP, relatorio: `Desempenho > Consultas (Filtro Página contém /cupons/${loja})`, dimensao: 'consulta-x-pagina', chave: `${r[0]} => ${url}`, metrica, valor, definicao: def, evidencia: `${pasta}/consultas.csv#consulta=${r[0]}`, qualidade: `${gscQ}${refDe(url)}Só consultas com ${MIN_IMPRESSOES} impressões ou mais; as outras estão no bruto. O Search Console omite consultas raras, então a soma das consultas fica abaixo do total da página.${loja === 'yesstyle' ? ' O filtro pega só a página em PT: as páginas /<idioma>/coupons/yesstyle ficam fora.' : ''}` });
    }
  });
}

// Bing Webmaster
const bingP = { plataforma: 'bing', coleta: BING, inicio: '2026-08-17', fim: '2026-11-15' };
const bingQ = 'Bing Webmaster Tools, site https://emcasacomcecilia.com/, período 3 M na data da coleta. ';
const BD = {
  impressoes: 'Vezes em que o site apareceu nos resultados web do Bing',
  cliques: 'Cliques nos resultados web do Bing',
  posicao: 'Posição média nos resultados web do Bing',
  citacoes: 'Vezes em que a página foi citada como fonte em respostas de IA (Copilots da Microsoft e parceiros); amostra, segundo o Bing',
};
{
  const kw = readCsv(`${SITE}/${BING}/bing-palavras-chave-3m.csv`);
  const pg = readCsv(`${SITE}/${BING}/bing-paginas-3m.csv`);
  const iaQ = readCsv(`${SITE}/${BING}/bing-ia-consultas-3m.csv`);
  const iaP = readCsv(`${SITE}/${BING}/bing-ia-paginas-3m.csv`);
  const ausente = (lista, n, oQue) => `${bingQ}Nenhuma linha nas ${n} ${oQue} do export, que é a lista inteira do relatório. A parceria começou em 16/11/2026, depois do fim do período.`;
  nos({ ...bingP, relatorio: 'Search Performance > Keywords', dimensao: 'consulta', chave: 'consulta contém "amazonie"', metrica: 'impressoes', valor: '@indisponivel', definicao: BD.impressoes, evidencia: 'bing-palavras-chave-3m.csv', qualidade: ausente(kw, kw.length - 1, 'palavras-chave') });
  nos({ ...bingP, relatorio: 'AI Performance > Grounding Queries', dimensao: 'consulta', chave: 'consulta contém "amazonie"', metrica: 'citacoes', valor: '@indisponivel', definicao: BD.citacoes, evidencia: 'bing-ia-consultas-3m.csv', qualidade: ausente(iaQ, iaQ.length - 1, 'consultas de IA') });
  kw.forEach((r, i) => {
    if (i === 0 || !/skelt|simple organic/i.test(r[0])) return;
    const loja = /skelt/i.test(r[0]) ? 'skelt' : 'simple-organic';
    nos({ ...bingP, relatorio: 'Search Performance > Keywords', dimensao: 'consulta', chave: r[0], metrica: 'impressoes', valor: r[1], definicao: BD.impressoes, evidencia: `bing-palavras-chave-3m.csv#linha=${i + 1}`, qualidade: `${bingQ}Referência de vertical (${LOJAS[loja].nome}): outra loja; ${LOJAS[loja].ref}. Volume muito baixo.` });
  });
  for (const url of urlsVerticais) {
    const a = linhaDe(pg, (r) => r[0] === url);
    const cupom = /\/cupons\//.test(url);
    if (a) {
      for (const [metrica, valor, def] of [['impressoes', a.row[1], BD.impressoes], ['cliques', a.row[2], BD.cliques], ['posicao-media', a.row[4], BD.posicao]]) {
        nos({ ...bingP, relatorio: 'Search Performance > Pages', dimensao: 'pagina', chave: url, metrica, valor, definicao: def, evidencia: `bing-paginas-3m.csv#linha=${a.n}`, qualidade: `${bingQ}${refDe(url)}Volume muito baixo no Bing.` });
      }
    } else if (cupom) {
      nos({ ...bingP, relatorio: 'Search Performance > Pages', dimensao: 'pagina', chave: url, metrica: 'impressoes', valor: '@indisponivel', definicao: BD.impressoes, evidencia: 'bing-paginas-3m.csv', qualidade: `${bingQ}${refDe(url)}Página fora das ${pg.length - 1} do export, que é a lista inteira do relatório.${url.includes('lamazonie') ? ' Página no ar desde 16/11/2026, depois do fim do período.' : ''}` });
    }
    const b = linhaDe(iaP, (r) => r[0] === url);
    if (b) {
      nos({ ...bingP, relatorio: 'AI Performance > Pages', dimensao: 'pagina', chave: url, metrica: 'citacoes', valor: b.row[1], definicao: BD.citacoes, evidencia: `bing-ia-paginas-3m.csv#linha=${b.n}`, qualidade: `${bingQ}${refDe(url)}O Bing avisa que o relatório é uma amostra.` });
    } else if (cupom) {
      nos({ ...bingP, relatorio: 'AI Performance > Pages', dimensao: 'pagina', chave: url, metrica: 'citacoes', valor: '@indisponivel', definicao: BD.citacoes, evidencia: 'bing-ia-paginas-3m.csv', qualidade: `${bingQ}${refDe(url)}Página fora das ${iaP.length - 1} páginas citadas do export. O Bing avisa que o relatório é uma amostra.${url.includes('lamazonie') ? ' Página no ar desde 16/11/2026, depois do fim do período.' : ''}` });
    }
  }
  nos({ ...bingP, relatorio: 'AI Performance > Pages', dimensao: 'site', chave: 'emcasacomcecilia.com', metrica: 'citacoes', valor: iaP.slice(1).reduce((a, r) => a + Number(r[1]), 0), definicao: BD.citacoes, evidencia: 'bing-ia-paginas-3m.csv#soma da coluna Citations', qualidade: `${bingQ}Soma das ${iaP.length - 1} páginas citadas. A tela mostrava 9,3 mil citações no período. O Bing avisa que o relatório é uma amostra.` });
}

// GA4
const gaP = { plataforma: 'ga4', coleta: GA4, inicio: '2026-08-16', fim: '2026-11-15' };
const gaQ = 'GA4, propriedade Emcasacomcecilia (468316875). Só conta visita de quem aceitou os cookies, em host liberado. Sinal de eventos em dobro no período (first_visit e session_start com o dobro do esperado; ver o FONTE.md): contagens de eventos e de sessões não servem como número absoluto. ';
const GD = {
  views: 'Visualizações: eventos page_view da página',
  usuarios: 'Usuários ativos que viram a página',
  principais: 'Eventos principais (conversões configuradas) disparados na página',
  sessoes: 'Sessões iniciadas, pelo canal da sessão',
  eventos: 'Contagem do evento no período',
};
const gaRows = (f) => parseCsv(read(`${SITE}/${GA4}/${f}`).split('\n').filter((l) => !l.startsWith('#')).join('\n'));
const gaLinha = (f, chave) => read(`${SITE}/${GA4}/${f}`).split('\n').findIndex((l) => l.startsWith(`${chave},`)) + 1;
{
  const f = 'ga4-paginas-e-telas.csv';
  const pg = gaRows(f);
  for (const url of urlsVerticais) {
    const caminho = url.replace(ORIGEM, '');
    const r = pg.find((x) => x[0] === caminho);
    const cupom = caminho.startsWith('/cupons/');
    if (!r) {
      if (cupom || caminho.includes('lamazonie')) {
        nos({ ...gaP, relatorio: 'Páginas e telas: Caminho da página', dimensao: 'pagina', chave: url, metrica: 'visualizacoes', valor: '@indisponivel', definicao: GD.views, evidencia: f, qualidade: `${gaQ}${refDe(url)}Caminho fora das ${pg.length - 1} linhas do export.${caminho.includes('lamazonie') ? ' Página no ar desde 16/11/2026, depois do fim do período.' : ''}` });
      }
      continue;
    }
    const ev = `${f}#linha=${gaLinha(f, caminho)}`;
    nos({ ...gaP, relatorio: 'Páginas e telas: Caminho da página', dimensao: 'pagina', chave: url, metrica: 'visualizacoes', valor: r[1], definicao: GD.views, evidencia: ev, qualidade: `${gaQ}${refDe(url)}` });
    if (cupom) {
      nos({ ...gaP, relatorio: 'Páginas e telas: Caminho da página', dimensao: 'pagina', chave: url, metrica: 'usuarios-ativos', valor: r[2], definicao: GD.usuarios, evidencia: ev, qualidade: `${gaQ}${refDe(url)}` });
      nos({ ...gaP, relatorio: 'Páginas e telas: Caminho da página', dimensao: 'pagina', chave: url, metrica: 'eventos-principais', valor: r[6], definicao: GD.principais, evidencia: ev, qualidade: `${gaQ}${refDe(url)}` });
    }
  }
  // 16 e 17/11: os dois primeiros dias da parceria
  const f2 = 'ga4-paginas-e-telas-16a17nov.csv';
  const p2 = gaRows(f2);
  const recente = { ...gaP, inicio: '2026-11-16', fim: '2026-11-17' };
  for (const url of urlsVerticais.filter((u) => u.includes('lamazonie'))) {
    const caminho = url.replace(ORIGEM, '');
    const r = p2.find((x) => x[0] === caminho);
    nos({ ...recente, relatorio: 'Páginas e telas: Caminho da página', dimensao: 'pagina', chave: url, metrica: 'visualizacoes', valor: r ? r[1] : '@indisponivel', definicao: GD.views, evidencia: r ? `${f2}#linha=${gaLinha(f2, caminho)}` : f2, qualidade: `${gaQ}${r ? '' : `Caminho fora das ${p2.length - 1} linhas do export: nenhuma visualização com consentimento registrada até a coleta. `}Dia 17/11 parcial (coleta às 10:20) e o GA4 ainda processa os dois dias.` });
  }
  const aq = gaRows('ga4-aquisicao-de-trafego.csv');
  aq.slice(1).forEach((r) => nos({ ...gaP, relatorio: 'Aquisição de tráfego: grupo de canais da sessão', dimensao: 'site', chave: `canal: ${r[0]}`, metrica: 'sessoes', valor: r[1], definicao: GD.sessoes, evidencia: `ga4-aquisicao-de-trafego.csv#linha=${gaLinha('ga4-aquisicao-de-trafego.csv', r[0])}`, qualidade: `${gaQ}Vale a proporção entre canais, não o total.` }));
  const ev = gaRows('ga4-eventos.csv');
  for (const nome of ['page_view', 'session_start', 'first_visit', 'coupon_copy', 'coupon_store_click']) {
    const r = ev.find((x) => x[0] === nome);
    nos({ ...gaP, relatorio: 'Eventos: Nome do evento', dimensao: 'site', chave: `evento: ${nome}`, metrica: 'contagem-de-eventos', valor: r[1], definicao: GD.eventos, evidencia: `ga4-eventos.csv#linha=${gaLinha('ga4-eventos.csv', nome)}`, qualidade: `${gaQ}Total de usuários do evento: ${r[2]}; eventos por usuário ativo: ${Number(r[3]).toFixed(2)}.` });
  }
}

// Clarity
const clP = { plataforma: 'clarity', coleta: CLARITY, inicio: '2026-08-20', fim: '2026-11-17' };
const clQ = 'Clarity, projeto Em Casa com Cecilia, painel com o filtro Últimos 90 dias. Só há dados desde o começo de outubro de 2026 (90 e 45 dias dão o mesmo total de sessões), então o número cobre cerca de 45 dias. Só conta visita de quem aceitou os cookies. ';
const num = (s) => s.replace(/\./g, '').replace(',', '.').replace(/[^0-9.]/g, '');
function clarity(arquivo) {
  const l = read(`${SITE}/${CLARITY}/${arquivo}`).split('\n').map((x) => x.trim());
  const depois = (rotulo) => l[l.indexOf(rotulo) + 1];
  const tempo = depois('Tempo ativo gasto');
  return {
    sessoes: num(depois('Sessões')),
    paginas: num(depois('Páginas por sessão')),
    rolagem: num(depois('Profundidade de rolagem')),
    tempoMin: /segundo/.test(tempo) ? (Number(num(tempo)) / 60).toFixed(2).replace(/\.00$/, '') : num(tempo),
  };
}
for (const [arquivo, dimensao, chave] of [
  ['clarity-site-90d.txt', 'site', 'emcasacomcecilia.com'],
  ...['lamazonie', 'simple-organic', 'skelt', 'yesstyle'].map((loja) => [`clarity-cupons-${loja}-90d.txt`, 'pagina', `${ORIGEM}/cupons/${loja}`]),
]) {
  const c = clarity(arquivo);
  const lz = chave.includes('lamazonie');
  const q = `${clQ}${dimensao === 'pagina' ? refDe(chave) + 'Filtro: URL visitada é exatamente este endereço (sessões que passaram pela página). ' : ''}${lz ? 'Zero observado: página no ar desde 16/11/2026, um dia antes da coleta.' : ''}`;
  nos({ ...clP, relatorio: 'Painel > Sessões', dimensao, chave, metrica: 'sessoes', valor: c.sessoes, definicao: 'Sessões gravadas pelo Clarity, sem as de robô', evidencia: `${arquivo}#"Sessões"`, qualidade: q });
  if (lz) continue;
  nos({ ...clP, relatorio: 'Painel > Páginas por sessão', dimensao, chave, metrica: 'paginas-por-sessao', valor: c.paginas, definicao: 'Média de páginas vistas nas sessões do filtro', evidencia: `${arquivo}#"Páginas por sessão"`, qualidade: q });
  nos({ ...clP, relatorio: 'Painel > Profundidade de rolagem', dimensao, chave, metrica: 'profundidade-de-rolagem-pct', valor: c.rolagem, definicao: 'Média de quanto da página foi rolado, em %', evidencia: `${arquivo}#"Profundidade de rolagem"`, qualidade: q });
  nos({ ...clP, relatorio: 'Painel > Tempo ativo gasto', dimensao, chave, metrica: 'tempo-ativo-min', valor: c.tempoMin, definicao: 'Média de tempo ativo por sessão, em minutos', evidencia: `${arquivo}#"Tempo ativo gasto"`, qualidade: q });
}
writeCsv('nossos-dados.csv',
  ['registro_id', 'plataforma', 'relatorio', 'dimensao', 'chave', 'pais', 'idioma', 'dispositivo', 'periodo_inicio', 'periodo_fim', 'metrica', 'valor', 'definicao_metrica', 'coleta_id', 'evidencia', 'qualidade'],
  dados);

// ---------- comercial.csv ----------
const dossie = 'docs/Memoria de Artigos/memreview/01_Parceiros/LAmazonie.md';
const trechoDossie = 'A parceria não tem link próprio nem UTM';
if (!read(dossie).includes(trechoDossie)) throw new Error('dossiê sem o trecho usado como evidência');
const comercial = ['vendas', 'receita', 'comissao', 'resgates'].map((metrica, i) => [
  `com-lamazonie-${String(i + 1).padStart(4, '0')}`, 'lamazonie', NA, '2026-11-16', '2026-11-17', metrica, '@indisponivel',
  metrica === 'vendas' || metrica === 'resgates' ? NA : 'BRL', '@indisponivel',
  'A venda conta só pelo código CECILIA, em todos os canais em que ele for divulgado (site, redes e vídeos); não há link de afiliado nem UTM',
  NA, `${dossie}#"${trechoDossie}"`,
  'Parceria iniciada em 16/11/2026. Nenhum painel comercial acessível à sessão no navegador embutido em 17/11/2026 e nenhum relatório de resgates recebido. Entra como coleta quando o Bruno passar o relatório do parceiro.',
]);
writeCsv('comercial.csv',
  ['registro_id', 'parceiro', 'produto', 'periodo_inicio', 'periodo_fim', 'metrica', 'valor', 'moeda', 'painel', 'alcance_atribuicao', 'coleta_id', 'evidencia', 'notas'],
  comercial);

// ---------- conferência ----------
for (const [arquivo, col] of [['cobertura.csv', 10], ['nossos-dados.csv', 14], ['comercial.csv', 11]]) {
  const rows = readCsv(`${OUT}/${arquivo}`).slice(1);
  const ids = new Set(rows.map((r) => r[0]));
  if (ids.size !== rows.length) throw new Error(`${arquivo}: id repetido`);
  for (const r of rows) {
    const [arq, loc] = r[col].split('#');
    const base = arquivo === 'nossos-dados.csv' ? `${DEMANDA}/${r[13]}/${arq}` : arq;
    if (!fs.existsSync(base)) throw new Error(`${arquivo} ${r[0]}: evidência não existe: ${base}`);
    const m = loc && loc.match(/^"(.*)"$/s);
    if (m && !read(base).includes(m[1])) throw new Error(`${arquivo} ${r[0]}: trecho não encontrado em ${base}: ${m[1]}`);
    const ln = loc && loc.match(/^linha=(\d+)$/);
    if (ln && read(base).split('\n').length < Number(ln[1])) throw new Error(`${arquivo} ${r[0]}: linha fora do arquivo`);
  }
  console.log(`${arquivo}: ids únicos, sem célula vazia, evidências encontradas`);
}
