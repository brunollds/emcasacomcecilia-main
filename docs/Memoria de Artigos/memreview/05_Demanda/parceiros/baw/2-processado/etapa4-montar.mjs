// Etapa 4 do piloto BAW: monta nossos-dados.csv e comercial.csv (4A).
// Rodar na raiz do repositório:
//   node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/2-processado/etapa4-montar.mjs"
// Lê o bruto de _site/ (snapshot de 17/11/2026), o processado _site/2-processado/nossos-dados-lojas.csv (só para as
// lojas de referência) e a coleta de IA da BAW. A leitura das respostas de IA (o que cada uma cita e se confere com o
// dossiê) é de quem analisou e está escrita na lista RESPOSTAS_IA; o script confere que cada trecho citado existe.
import fs from 'node:fs';

const DEMANDA = 'docs/Memoria de Artigos/memreview/05_Demanda';
const SITE = `${DEMANDA}/_site`;
const BAW = `${DEMANDA}/parceiros/baw`;
const OUT = `${BAW}/2-processado`;

const GSC = '20261117-1008-gsc-desempenho';
const GA4 = '20261117-1016-ga4-relatorios';
const BING = '20261117-1020-bing-desempenho';
const IA = '20261118-1253-ia-consultas-manuais';
const RECORTE = '20261118-2152-recorte-dirigido';
const CLARITY = '20261118-2208-clarity-painel';
const NA = '@nao-se-aplica';

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', quoted = false;
  const t = text.replace(/^\uFEFF/, '');
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
  const ids = new Set();
  for (const r of rows) {
    if (r.length !== header.length) throw new Error(`${file}: linha com ${r.length} colunas: ${r[0]}`);
    r.forEach((v, i) => { if (v === '' || v === undefined || v === null) throw new Error(`${file}: célula vazia em ${r[0]}, coluna ${header[i]}`); });
    if (ids.has(r[0])) throw new Error(`${file}: id repetido ${r[0]}`);
    ids.add(r[0]);
  }
  fs.writeFileSync(`${OUT}/${file}`, [header, ...rows].map((r) => r.map(esc).join(',')).join('\n') + '\n');
  console.log(`${file}: ${rows.length} registros`);
}
const read = (p) => fs.readFileSync(p, 'utf8');

// ---------- nossos-dados.csv ----------
const HEADER_NOS = ['registro_id', 'plataforma', 'relatorio', 'dimensao', 'chave', 'pais', 'idioma', 'dispositivo',
  'periodo_inicio', 'periodo_fim', 'metrica', 'valor', 'definicao_metrica', 'coleta_id', 'evidencia', 'qualidade'];
const dados = [];
const nos = (o) => dados.push([
  `nos-baw-${String(dados.length + 1).padStart(4, '0')}`, o.plataforma, o.relatorio, o.dimensao, o.chave,
  o.pais ?? NA, o.idioma ?? NA, o.dispositivo ?? NA, o.inicio, o.fim, o.metrica, String(o.valor), o.definicao,
  o.coleta, o.evidencia, o.qualidade,
]);

// 1. A BAW no snapshot de 17/11/2026: quantas linhas de cada export têm "baw" na consulta ou no endereço.
const PUBLICACAO = 'A página /cupons/baw e os seis artigos da BAW entraram na main em 16/11/2026 (#1048, #1061 e #1065), '
  + 'depois do fim do período; todos responderam 200 em 2026-11-18T13:02-03:00. A data do deploy não foi conferida.';
const SEM_RECORTE = 'O recorte dirigido no Search Console (consulta e página contêm "baw", até o último dia disponível) está '
  + `nos registros do fim deste arquivo, da coleta parceiros/baw/1-bruto/${RECORTE}.`;
const EXPORTS = [
  { plataforma: 'gsc', coleta: GSC, arquivo: 'gsc-site-3m/consultas.csv', relatorio: 'Desempenho > Consultas (site inteiro)', dimensao: 'consulta', inicio: '2026-08-16', fim: '2026-11-15',
    qualidade: `Search Console, tipo Web, 3 meses. Export cortado nas 1.000 consultas com mais resultado: nenhuma linha aqui não quer dizer zero impressões. ${PUBLICACAO} ${SEM_RECORTE}` },
  { plataforma: 'gsc', coleta: GSC, arquivo: 'gsc-site-3m/paginas.csv', relatorio: 'Desempenho > Páginas (site inteiro)', dimensao: 'pagina', inicio: '2026-08-16', fim: '2026-11-15',
    qualidade: `Search Console, tipo Web, 3 meses. Export cortado nas 1.000 páginas com mais resultado. ${PUBLICACAO} ${SEM_RECORTE}` },
  { plataforma: 'bing', coleta: BING, arquivo: 'bing-palavras-chave-3m.csv', relatorio: 'Search Performance > Keywords', dimensao: 'consulta', inicio: '2026-08-17', fim: '2026-11-15',
    qualidade: `Bing Webmaster Tools, 3 meses. Lista completa (FONTE.md da coleta): nenhuma linha quer dizer nenhum registro no período. ${PUBLICACAO}` },
  { plataforma: 'bing', coleta: BING, arquivo: 'bing-paginas-3m.csv', relatorio: 'Search Performance > Pages', dimensao: 'pagina', inicio: '2026-08-17', fim: '2026-11-15',
    qualidade: `Bing Webmaster Tools, 3 meses. Lista completa: nenhuma linha quer dizer nenhum registro no período. ${PUBLICACAO}` },
  { plataforma: 'bing', coleta: BING, arquivo: 'bing-ia-consultas-3m.csv', relatorio: 'AI Performance > Grounding Queries', dimensao: 'consulta', inicio: '2026-08-17', fim: '2026-11-15',
    qualidade: `Bing AI Performance, 3 meses, amostra segundo o próprio Bing. Lista completa: nenhuma consulta com "baw" citou o site no período. ${PUBLICACAO}` },
  { plataforma: 'bing', coleta: BING, arquivo: 'bing-ia-paginas-3m.csv', relatorio: 'AI Performance > Pages', dimensao: 'pagina', inicio: '2026-08-17', fim: '2026-11-15',
    qualidade: `Bing AI Performance, 3 meses, amostra segundo o próprio Bing. Lista completa: nenhuma página da BAW citada no período. ${PUBLICACAO}` },
  { plataforma: 'ga4', coleta: GA4, arquivo: 'ga4-paginas-e-telas.csv', relatorio: 'Páginas e telas: Caminho da página', dimensao: 'pagina', inicio: '2026-08-16', fim: '2026-11-15',
    qualidade: `GA4, só quem aceitou os cookies; eventos em dobro no período (_site/${GA4}/FONTE.md). O arquivo tem 500 caminhos, dado como completo no FONTE.md (500 exato pode ser o limite da tela; não conferido). ${PUBLICACAO}` },
  { plataforma: 'ga4', coleta: GA4, arquivo: 'ga4-paginas-e-telas-16a17nov.csv', relatorio: 'Páginas e telas: Caminho da página (16 e 17/11)', dimensao: 'pagina', inicio: '2026-11-16', fim: '2026-11-17',
    qualidade: 'GA4, só quem aceitou os cookies. Lista completa de 16 e 17/11/2026 (75 caminhos): nenhuma página da BAW teve visualização registrada nesses dois dias, ou as páginas ainda não estavam no ar (deploy não conferido; 200 em 2026-11-18T13:02-03:00).' },
];
const TEM_BAW = /baw/i;
for (const e of EXPORTS) {
  const rows = parseCsv(read(`${SITE}/${e.coleta}/${e.arquivo}`));
  const inicio = rows.findIndex((r) => /^(Top consultas|Páginas principais|Keyword|Page|Grounding Query|Caminho da página)/.test(r[0]));
  if (inicio < 0) throw new Error(`${e.arquivo}: cabeçalho não encontrado`);
  const comBaw = rows.slice(inicio + 1).filter((r) => r[0] && TEM_BAW.test(r[0]));
  if (comBaw.length) console.log(`${e.arquivo}: ${comBaw.length} linha(s) com "baw": ${comBaw.map((r) => r[0]).join(' | ')}`);
  nos({
    plataforma: e.plataforma, relatorio: e.relatorio, dimensao: e.dimensao,
    chave: `${e.dimensao === 'consulta' ? 'consulta' : 'endereço'} contém "baw"`,
    inicio: e.inicio, fim: e.fim, metrica: 'linhas-com-baw', valor: comBaw.length,
    definicao: 'Linhas do export cuja primeira coluna (consulta ou endereço) contém "baw", sem diferenciar maiúsculas',
    coleta: `_site/${e.coleta}`, evidencia: `${e.arquivo}#coluna 1, busca por "baw" nas ${rows.length - inicio - 1} linhas de dados`,
    qualidade: e.qualidade,
  });
}

// 2. Consultas manuais de IA (P5). Uma linha por pergunta, plataforma e métrica.
const METRICAS_IA = {
  'cita-emcasacomcecilia': 'A resposta ou a lista de fontes traz uma página do emcasacomcecilia.com (1 sim, 0 não)',
  'mostra-codigo-nosso': 'O texto da resposta mostra o código BAWEMCASACOMCECILIA (1 sim, 0 não)',
  'codigos-de-terceiros': 'Quantos códigos que não são o nosso aparecem no texto da resposta',
  'recomenda-outro-codigo': 'A resposta manda usar outro código antes do nosso ou no lugar dele (1 sim, 0 não)',
  'fato-central-confere': 'O fato central da pergunta (reputação, dono ou condição do código) confere com o dossiê e a semente (1 sim, 0 não)',
};
const PLATAFORMAS = {
  chatgpt: 'Consulta manual: ChatGPT sem conta',
  perplexity: 'Consulta manual: Perplexity sem conta',
};
const PERGUNTAS = {
  q1: 'a BAW é confiável?',
  q2: 'de quem é a BAW Clothing?',
  q3: 'cupom BAW',
  q4: 'cupom BAW primeira compra',
  q5: 'o cupom BAWEMCASACOMCECILIA funciona?',
};
const ARQUIVOS_IA = {
  'chatgpt-q1': 'chatgpt-q1-baw-e-confiavel.txt',
  'chatgpt-q2': 'chatgpt-q2-de-quem-e-a-baw.txt',
  'chatgpt-q3': 'chatgpt-q3-cupom-baw.txt',
  'chatgpt-q4': 'chatgpt-q4-cupom-baw-primeira-compra.txt',
  'chatgpt-q5': 'chatgpt-q5-codigo-funciona.txt',
  'perplexity-q1': 'perplexity-q1-baw-e-confiavel.txt',
  'perplexity-q2': 'perplexity-q2-de-quem-e-a-baw.txt',
  'perplexity-q3': 'perplexity-q3-cupom-baw.txt',
};
const SEMENTE = '02_Artigos/baw-fatos-1611.md';
const DOSSIE = '01_Parceiros/BAW-Clothing.md';
// [valor, trecho literal do arquivo que sustenta o valor, nota]
const RESPOSTAS_IA = {
  'chatgpt-q1': {
    'cita-emcasacomcecilia': ['@indisponivel', 'Reclame Aqui\n+1', 'O chip de fontes diz "Reclame Aqui +1"; sem conta o painel não abriu e a segunda fonte ficou sem leitura.'],
    'mostra-codigo-nosso': [0, 'Se for a BAW Clothing, minha avaliação é', 'Nenhum código na resposta.'],
    'codigos-de-terceiros': [0, 'Se for a BAW Clothing, minha avaliação é', 'Nenhum código na resposta.'],
    'recomenda-outro-codigo': [NA, 'a BAW é confiável?', 'Pergunta sem cupom.'],
    'fato-central-confere': [1, 'Nota média: aproximadamente 7,3/10.', `Reputação "Boa", 7,3 e cerca de 84% resolvidas conferem com o Reclame Aqui de 6 meses lido em 16/11 (${SEMENTE}, seção 11: Boa, 7,3, 83,7%). O Reclame Aqui não foi relido hoje (escopo enxuto). A resposta pergunta antes se é a BAW de roupas ou a fabricante de carros.`],
  },
  'chatgpt-q2': {
    'cita-emcasacomcecilia': ['@indisponivel', 'NeoFeed\n+2', 'Chips "Exame +1" e "NeoFeed +2"; as outras três fontes ficaram sem leitura (sem conta o painel não abriu).'],
    'mostra-codigo-nosso': [0, 'A BAW Clothing foi fundada pelos irmãos Bruno Karra e Lucas Karra', 'Nenhum código na resposta.'],
    'codigos-de-terceiros': [0, 'A BAW Clothing foi fundada pelos irmãos Bruno Karra e Lucas Karra', 'Nenhum código na resposta.'],
    'recomenda-outro-codigo': [NA, 'de quem é a BAW Clothing?', 'Pergunta sem cupom.'],
    'fato-central-confere': [1, 'não pertence mais à Arezzo', `Dono hoje (os fundadores, depois da revenda de fevereiro de 2025) confere com ${SEMENTE}, seção 4. Diferença menor: a resposta põe Fernando Frizzatti e Celso Ribeiro como sócios iniciais; a semente só tem Celso Ribeiro, como parceiro da recompra de 2025.`],
  },
  'chatgpt-q3': {
    'cita-emcasacomcecilia': [1, 'Em Casa com Cecília\n+2', 'Chip de fontes "Em Casa com Cecília +2"; as outras duas fontes ficaram sem leitura.'],
    'mostra-codigo-nosso': [1, 'BAWEMCASACOMCECILIA', 'O nosso código é o primeiro dos três.'],
    'codigos-de-terceiros': [2, 'BAWOFF', 'FIRSTBAW e BAWOFF.'],
    'recomenda-outro-codigo': [0, 'Aqui estão alguns cupons da BAW Clothing para testar', 'Lista os três sem mandar usar um no lugar de outro; termina perguntando se é a primeira compra.'],
    'fato-central-confere': [1, 'Vale para primeira compra e clientes antigos, segundo a página do cupom.', `10%, primeira compra e clientes antigos conferem com ${DOSSIE}, seção 1. Diverge: diz FIRSTBAW com 15%, e o teste de 17/11 deu ao FIRSTBAW o mesmo desconto do nosso (${DOSSIE}, seção 1).`],
  },
  'chatgpt-q4': {
    'cita-emcasacomcecilia': [1, 'Em Casa com Cecília\n+1', 'Chip de fontes "Em Casa com Cecília +1" ao lado do nosso código; os outros chips são "Até 30% OFF - Novembro 2026 +1" (título de página de terceiro).'],
    'mostra-codigo-nosso': [1, 'BAWEMCASACOMCECILIA', 'O nosso código é o terceiro de três.'],
    'codigos-de-terceiros': [2, 'BAWVINDO', 'FIRSTBAW e BAWVINDO, os dois com 15%.'],
    'recomenda-outro-codigo': [1, 'Minha dica: tente primeiro FIRSTBAW, que oferece 15% de desconto.', 'Terceiro caso da medição de IA (PROGRAMA.md, seção 4): recomenda outro código no lugar do nosso.'],
    'fato-central-confere': [0, '15% OFF\n\nFIRSTBAW', `Diz que o FIRSTBAW dá 15% e o nosso 10%. Os testes de 17/11 no app e no site deram o mesmo desconto aos dois (${DOSSIE}, seção 1, que já registra: "O FIRSTBAW aparece com 15% em sites de cupom; os testes deram o mesmo dos 10% do nosso"). O BAWVINDO não foi testado.`],
  },
  'chatgpt-q5': {
    'cita-emcasacomcecilia': [1, 'Fonte: Ver condições e teste do cupom', 'O link aponta para https://emcasacomcecilia.com/reviews/cupom-baw-primeira-compra?utm_source=chatgpt.com.'],
    'mostra-codigo-nosso': [1, 'Código: BAWEMCASACOMCECILIA', 'Segundo caso da medição de IA: o código estava na pergunta.'],
    'codigos-de-terceiros': [0, 'Cupom confirmado em teste de carrinho', 'Nenhum outro código.'],
    'recomenda-outro-codigo': [0, 'Minha dica: aplique no carrinho', 'Não manda trocar.'],
    'fato-central-confere': [1, 'Peças em promoção: o desconto também foi aplicado no teste.', `10%, site e app, primeira compra e seguintes e soma com promoção conferem com ${DOSSIE}, seção 1. Diz "publicação atualizada em 16/11/2026": o artigo citado tem publishedAtISO 2026-11-16.`],
  },
  'perplexity-q1': {
    'cita-emcasacomcecilia': [1, 'https://emcasacomcecilia.com/reviews/baw-clothing-e-confiavel', 'Duas das 10 fontes da aba Links são nossas: baw-clothing-reclame-aqui-nota-reputacao e baw-clothing-e-confiavel. A resposta não diz qual fonte usou em cada frase além do chip "reclameaqui.com +1".'],
    'mostra-codigo-nosso': [0, 'Antes de comprar, confira a nota atual', 'O código aparece no resumo das nossas páginas na aba Links, não no texto da resposta.'],
    'codigos-de-terceiros': [0, 'Antes de comprar, confira a nota atual', 'Nenhum código na resposta.'],
    'recomenda-outro-codigo': [NA, 'a BAW é confiável?', 'Pergunta sem cupom.'],
    'fato-central-confere': [0, 'a reputação aparece como “Regular”', `Diz que o Reclame Aqui mostra "Regular" e que "outra análise recente" diz "Boa". A semente leu "Boa" nos períodos de 6 e de 12 meses em 16/11 (${SEMENTE}, seção 11). O Reclame Aqui não foi relido hoje: a divergência pode ser a página ter mudado ou a IA ter lido outro período.`],
  },
  'perplexity-q2': {
    'cita-emcasacomcecilia': [0, 'Resultados da pesquisa para: de quem é a BAW Clothing?', 'Nenhuma das 10 fontes da aba Links é nossa.'],
    'mostra-codigo-nosso': [0, 'A BAW Clothing foi criada pelos irmãos Bruno e Lucas Karra', 'Nenhum código na resposta.'],
    'codigos-de-terceiros': [0, 'A BAW Clothing foi criada pelos irmãos Bruno e Lucas Karra', 'Nenhum código na resposta. Uma das fontes é um site de cupons (descontostop.com).'],
    'recomenda-outro-codigo': [NA, 'de quem é a BAW Clothing?', 'Pergunta sem cupom.'],
    'fato-central-confere': [0, 'Em 2021, a marca foi comprada pela Arezzo (hoje Azzas 2154).', `Para em 2021: não diz que a Azzas 2154 revendeu a marca aos fundadores em fevereiro de 2025 (${SEMENTE}, seção 4). Uma das fontes é a página da BAW no site de RI da Azzas 2154.`],
  },
  'perplexity-q3': {
    'cita-emcasacomcecilia': ['@indisponivel', 'carpemundi.com', 'Chip de fonte "carpemundi.com"; a aba Links não foi aberta porque a janela de cadastro cobriu a página.'],
    'mostra-codigo-nosso': [0, 'Experimente o cupom BAWANNALAURA', 'O nosso código não aparece.'],
    'codigos-de-terceiros': [1, 'BAWANNALAURA', 'Um código de terceiro, com 10%.'],
    'recomenda-outro-codigo': [1, 'Experimente o cupom BAWANNALAURA para 10% de desconto na BAW', 'Terceiro caso: indica outro código, e o nosso não aparece.'],
    'fato-central-confere': ['@nao-investigado', 'a oferta informa que vale também para peças já promocionadas', 'A condição é de um código de terceiro, que o programa não testa nem cita.'],
  },
};
for (const [id, metricas] of Object.entries(RESPOSTAS_IA)) {
  const [plat, q] = id.split('-');
  const arquivo = ARQUIVOS_IA[id];
  const texto = read(`${BAW}/1-bruto/${IA}/${arquivo}`).replace(/\r\n/g, '\n');
  const hora = /^Enviada em: (?:entre )?2026-11-18T(\d\d:\d\d)/m.exec(texto);
  if (!hora) throw new Error(`${arquivo}: sem a linha "Enviada em"`);
  for (const metrica of Object.keys(METRICAS_IA)) {
    const leitura = metricas[metrica];
    if (!leitura) throw new Error(`${id}: falta a métrica ${metrica}`);
    const [valor, trecho, nota] = leitura;
    if (!texto.includes(trecho)) throw new Error(`${arquivo}: trecho não encontrado: ${trecho}`);
    nos({
      plataforma: 'ia', relatorio: PLATAFORMAS[plat], dimensao: 'consulta', chave: PERGUNTAS[q],
      pais: 'BR', idioma: 'pt-BR', dispositivo: 'desktop', inicio: '2026-11-18', fim: '2026-11-18',
      metrica, valor, definicao: METRICAS_IA[metrica],
      coleta: `parceiros/baw/1-bruto/${IA}`, evidencia: `${arquivo}#"${trecho.replace(/\n/g, ' ')}"`,
      qualidade: `Uma resposta, sem conta e sem histórico, em 18/11/2026; respostas de assistente variam entre execuções. ${nota}`,
    });
  }
}

// 3. Referência de vertical: as lojas de moda com página de cupom e artigos (orientação, seção 2, item 6).
// A DAMIE, citada na orientação, vende sofás: fica de fora (relatos/etapa-4.md).
// Entram do processado de _site/: as linhas do Search Console (páginas e consultas) e as da página de cupom nas
// outras plataformas. O resto segue em _site/2-processado/nossos-dados-lojas.csv.
const REFERENCIAS = {
  insider: "Insider, roupas; página de cupom no ar desde 2026-10-05 (42 dias no fim do período)",
  'toda-up': 'Toda Up, roupas fitness; página de cupom no ar desde 2026-10-26 (20 dias no fim do período)',
  'clea-store': 'Cléa Store, roupas; página de cupom no ar desde 2026-10-14 (32 dias no fim do período)',
};
const lojas = parseCsv(read(`${SITE}/2-processado/nossos-dados-lojas.csv`));
const H = lojas[0];
if (H.join(',') !== HEADER_NOS.join(',')) throw new Error('nossos-dados-lojas.csv mudou de cabeçalho');
for (const [slug, desc] of Object.entries(REFERENCIAS)) {
  const linhas = lojas.slice(1).filter((r) => r[0].startsWith(`nos-${slug}-`))
    .filter((r) => r[1] === 'gsc' || r[4].includes(`/cupons/${slug}`) || r[4].includes(`/coupons/${slug}`));
  if (!linhas.length) throw new Error(`sem linhas de ${slug}`);
  for (const r of linhas) {
    const o = Object.fromEntries(H.map((h, i) => [h, r[i]]));
    nos({
      plataforma: o.plataforma, relatorio: o.relatorio, dimensao: o.dimensao, chave: o.chave, pais: o.pais,
      idioma: o.idioma, dispositivo: o.dispositivo, inicio: o.periodo_inicio, fim: o.periodo_fim, metrica: o.metrica,
      valor: o.valor, definicao: o.definicao_metrica, coleta: o.coleta_id, evidencia: o.evidencia,
      qualidade: `Referência de vertical (${desc}): serve de formato e de perguntas, não prevê o desempenho da BAW. ${o.qualidade} Copiado de _site/2-processado/nossos-dados-lojas.csv#${o.registro_id}.`,
    });
  }
}

// 4. Recorte dirigido de 18/11/2026, depois do login do Bruno (Search Console, GA4 e Bing). Vai no fim para os
// registros de antes manterem o id.
const DIR = `parceiros/baw/1-bruto/${RECORTE}`;
const lerBruto = (arquivo) => {
  const rows = parseCsv(read(`${BAW}/1-bruto/${RECORTE}/${arquivo}`));
  if (rows.some((r) => r.some((c) => c.includes('\n')))) throw new Error(`${arquivo}: célula com quebra de linha, #linha não vale`);
  return rows;
};
const filtroGsc = (pasta) => Object.fromEntries(lerBruto(`${pasta}/filtros.csv`).slice(1).map((r) => [r[0], r[1]]));
const GSC_DEF = {
  cliques: ['Cliques', 'Cliques no resultado da Pesquisa Google (web)'],
  impressoes: ['Impressões', 'Vezes em que um resultado do site apareceu na Pesquisa Google (web)'],
  'posicao-media': ['Posição', 'Posição média do resultado mais alto do site, ponderada pelas impressões'],
};
const GSC_DIRIGIDO = [
  { pasta: 'gsc-consulta-baw-3m', filtro: ['Consulta', '+baw'], nome: 'consulta contém "baw"', tabelas: ['consultas', 'paginas'] },
  { pasta: 'gsc-pagina-baw-3m', filtro: ['Página', '+baw'], nome: 'página contém "baw"', tabelas: ['paginas'] },
];
for (const g of GSC_DIRIGIDO) {
  const f = filtroGsc(g.pasta);
  if (f[g.filtro[0]] !== g.filtro[1] || f.Data !== 'Últimos 3 meses' || !/^Web/.test(f['Tipo de pesquisa'])) {
    throw new Error(`${g.pasta}: filtros.csv não confere`);
  }
  const grafico = lerBruto(`${g.pasta}/grafico.csv`).slice(1).filter((r) => r[0]);
  const inicio = grafico[0][0], fim = grafico.at(-1)[0];
  const comDado = grafico.filter((r) => Number(r[2]) > 0).map((r) => r[0]);
  const qualidade = `Search Console, tipo Web, "Últimos 3 meses" em 18/11/2026, que terminam no último dia com dado final (${fim}). `
    + `Recorte com o filtro ${g.nome}: a tabela vem inteira, mas o Search Console omite consultas raras. Impressões só em ${comDado.join(', ')}. `
    + 'Dias 17 e 18/11 ainda sem dado final na coleta.';
  for (const [metrica, col] of [['cliques', 1], ['impressoes', 2]]) {
    nos({
      plataforma: 'gsc', relatorio: `Desempenho > Gráfico (${g.nome})`, dimensao: 'site', chave: `emcasacomcecilia.com, filtro ${g.nome}`,
      inicio, fim, metrica, valor: grafico.reduce((s, r) => s + Number(r[col]), 0),
      definicao: `${GSC_DEF[metrica][1]}; soma dos dias do gráfico`, coleta: DIR,
      evidencia: `${g.pasta}/grafico.csv#coluna ${col + 1}, soma das ${grafico.length} linhas de dias`, qualidade,
    });
  }
  for (const tabela of g.tabelas) {
    const rows = lerBruto(`${g.pasta}/${tabela}.csv`);
    rows.slice(1).forEach((r, i) => {
      if (!r[0]) return;
      for (const [metrica, [coluna, definicao]] of Object.entries(GSC_DEF)) {
        const c = rows[0].indexOf(coluna);
        if (c < 0) throw new Error(`${g.pasta}/${tabela}.csv: sem a coluna ${coluna}`);
        nos({
          plataforma: 'gsc', relatorio: `Desempenho > ${tabela === 'consultas' ? 'Consultas' : 'Páginas'} (${g.nome})`,
          dimensao: tabela === 'consultas' ? 'consulta' : 'pagina', chave: r[0],
          idioma: tabela === 'consultas' ? NA : 'pt-BR', inicio, fim, metrica, valor: r[c], definicao, coleta: DIR,
          evidencia: `${g.pasta}/${tabela}.csv#linha=${i + 2}`, qualidade,
        });
      }
    });
  }
}

const GA4_DIR = 'ga4-paginas-e-telas-16a18nov.csv';
const ga4 = lerBruto(GA4_DIR);
const ga4Datas = ga4.filter((r) => /^# Data de (início|término):/.test(r[0])).map((r) => r[0].slice(-8));
if (ga4Datas.join() !== '20261116,20261118') throw new Error(`${GA4_DIR}: período não confere (${ga4Datas})`);
const ga4Cab = ga4.findIndex((r) => r[0] === 'Caminho da página e classe da tela');
const ga4Linhas = ga4.slice(ga4Cab + 1).filter((r) => r[0]);
const ga4Baw = ga4Linhas.filter((r) => TEM_BAW.test(r[0]));
const GA4_QUAL = 'GA4, propriedade Emcasacomcecilia, de 16/11 a 18/11/2026, com o 18/11 parcial (export às 21:55). Só conta quem aceitou '
  + 'os cookies. O export de 16 e 17/11 feito às 10:16 de 17/11 não tinha a BAW; o GA4 leva horas para processar, e o dia de '
  + 'cada visita não foi separado. O Bruno disse em 18/11 que a visita não foi dele; o relatório não diz se foi outra '
  + 'pessoa da operação ou um visitante de fora. Com 1 usuário por página, não serve de demanda.';
nos({
  plataforma: 'ga4', relatorio: 'Páginas e telas: Caminho da página (16 a 18/11)', dimensao: 'pagina', chave: 'endereço contém "baw"',
  inicio: '2026-11-16', fim: '2026-11-18', metrica: 'linhas-com-baw', valor: ga4Baw.length,
  definicao: 'Linhas do export cuja primeira coluna (consulta ou endereço) contém "baw", sem diferenciar maiúsculas', coleta: DIR,
  evidencia: `${GA4_DIR}#coluna 1, busca por "baw" nas ${ga4Linhas.length} linhas de dados`, qualidade: GA4_QUAL,
});
const GA4_DEF = {
  visualizacoes: ['Visualizações', 'Visualizações: eventos page_view da página'],
  'usuarios-ativos': ['Usuários ativos', 'Usuários ativos que viram a página'],
  'eventos-principais': ['Eventos principais', 'Eventos principais (conversões configuradas) disparados na página'],
};
for (const r of ga4Baw) {
  for (const [metrica, [coluna, definicao]] of Object.entries(GA4_DEF)) {
    nos({
      plataforma: 'ga4', relatorio: 'Páginas e telas: Caminho da página (16 a 18/11)', dimensao: 'pagina',
      chave: `https://emcasacomcecilia.com${r[0]}`, idioma: 'pt-BR', inicio: '2026-11-16', fim: '2026-11-18', metrica,
      valor: r[ga4[ga4Cab].indexOf(coluna)], definicao, coleta: DIR, evidencia: `${GA4_DIR}#linha=${ga4.indexOf(r) + 1}`,
      qualidade: GA4_QUAL,
    });
  }
}

const BING_DIRIGIDO = [
  ['bing-palavras-chave-7d.csv', 'Search Performance > Keywords', 'consulta'],
  ['bing-paginas-7d.csv', 'Search Performance > Pages', 'pagina'],
  ['bing-ia-consultas-7d.csv', 'AI Performance > Grounding Queries', 'consulta'],
  ['bing-ia-paginas-7d.csv', 'AI Performance > Pages', 'pagina'],
];
for (const [arquivo, relatorio, dimensao] of BING_DIRIGIDO) {
  const rows = lerBruto(arquivo).slice(1).filter((r) => r[0]);
  nos({
    plataforma: 'bing', relatorio: `${relatorio} (7 dias)`, dimensao, chave: `${dimensao === 'consulta' ? 'consulta' : 'endereço'} contém "baw"`,
    inicio: '2026-11-12', fim: '2026-11-16', metrica: 'linhas-com-baw', valor: rows.filter((r) => TEM_BAW.test(r[0])).length,
    definicao: 'Linhas do export cuja primeira coluna (consulta ou endereço) contém "baw", sem diferenciar maiúsculas', coleta: DIR,
    evidencia: `${arquivo}#coluna 1, busca por "baw" nas ${rows.length} linhas de dados`,
    qualidade: `Bing Webmaster Tools, botão "7 D" em 18/11/2026, que mostrou de 12/11 a 16/11 (o último dia com dado). Lista completa pelo Download all${relatorio.startsWith('AI') ? '; o AI Performance é amostra, segundo o próprio Bing' : ''}. As páginas da BAW só tinham o 16/11 dentro do período.`,
  });
}

// 5. Clarity, depois que o Bruno entrou também nele (18/11/2026, 22:08). Um painel por página da BAW, com URL
// visitada exatamente igual ao endereço, nos últimos 3 dias.
const CLARITY_DIR = `parceiros/baw/1-bruto/${CLARITY}`;
const CLARITY_PAGINAS = {
  '/cupons/baw': 'clarity-cupons-baw-3d.txt',
  '/reviews/cupom-baw-como-usar': 'clarity-cupom-baw-como-usar-3d.txt',
  '/reviews/black-friday-baw': 'clarity-black-friday-baw-3d.txt',
  '/reviews/baw-clothing-reclame-aqui-nota-reputacao': 'clarity-baw-clothing-reclame-aqui-nota-reputacao-3d.txt',
  '/reviews/baw-clothing-e-confiavel': 'clarity-baw-clothing-e-confiavel-3d.txt',
  '/reviews/cupom-baw-primeira-compra': 'clarity-cupom-baw-primeira-compra-3d.txt',
  '/reviews/baw-clothing-e-boa': 'clarity-baw-clothing-e-boa-3d.txt',
  '/reviews/loja/baw': 'clarity-reviews-loja-baw-3d.txt',
};
// [métrica, rótulo no painel, como o valor vem, definição]
const CLARITY_DEF = [
  ['sessoes', 'Sessões', (v) => v, 'Sessões gravadas pelo Clarity, sem as de robô'],
  ['usuarios-unicos', 'Usuários únicos', (v) => v, 'Visitantes distintos nas sessões do filtro'],
  ['paginas-por-sessao', 'Páginas por sessão', (v) => v.replace(',', '.'), 'Média de páginas vistas nas sessões do filtro'],
  ['profundidade-de-rolagem-pct', 'Profundidade de rolagem', (v) => v.replace('%', '').replace(',', '.'), 'Média de quanto da página foi rolado, em %'],
  ['tempo-ativo-min', 'Tempo ativo gasto', (v) => (v === '0 segundo' ? '0' : v.replace(/ min$/, '').replace(',', '.')), 'Média de tempo ativo por sessão, em minutos'],
];
const CLARITY_QUAL = 'Clarity, projeto Em Casa com Cecilia, filtro "Últimos 3 dias" lido em 18/11/2026 às 22:08 e a "URL visitada é '
  + 'exatamente" este endereço; o painel define o começo dos 3 dias, e 16/11 é o dia do primeiro deploy possível. Só conta visita de '
  + 'quem aceitou os cookies. Só duas páginas da BAW tiveram sessão, com 1 visitante em cada (Edge, computador, Brasil, vindo do '
  + 'próprio site), e a sessão da /cupons/baw também passou pela home e pela /reviews/cupom-baw-primeira-compra. O Bruno '
  + 'disse em 18/11 que a visita não foi dele; o painel não diz quem foi. Com 1 visitante por página, não serve de demanda.';
for (const [caminho, arquivo] of Object.entries(CLARITY_PAGINAS)) {
  const linhas = read(`${BAW}/1-bruto/${CLARITY}/${arquivo}`).replace(/\r\n/g, '\n').split('\n');
  const url = `https://emcasacomcecilia.com${caminho}`;
  if (!linhas.includes('Últimos 3 dias ') || linhas[linhas.indexOf('URL visitada é exatamente') + 2] !== url) {
    throw new Error(`${arquivo}: período ou filtro não confere`);
  }
  for (const [metrica, rotulo, valor, definicao] of CLARITY_DEF) {
    const i = linhas.indexOf(rotulo);
    if (i < 0) throw new Error(`${arquivo}: sem "${rotulo}"`);
    const bruto = metrica === 'usuarios-unicos' ? linhas[i - 1] : linhas[i + 1];
    const v = valor(bruto);
    if (!/^\d+(\.\d+)?$/.test(v)) throw new Error(`${arquivo}: valor estranho em "${rotulo}": ${bruto}`);
    nos({
      plataforma: 'clarity', relatorio: `Painel > ${rotulo}`, dimensao: 'pagina', chave: url, idioma: 'pt-BR',
      inicio: '2026-11-16', fim: '2026-11-18', metrica, valor: v, definicao, coleta: CLARITY_DIR,
      evidencia: `${arquivo}#"${rotulo}"`, qualidade: CLARITY_QUAL,
    });
  }
}
writeCsv('nossos-dados.csv', HEADER_NOS, dados);

// ---------- comercial.csv ----------
const HEADER_COM = ['registro_id', 'parceiro', 'produto', 'periodo_inicio', 'periodo_fim', 'metrica', 'valor', 'moeda',
  'painel', 'alcance_atribuicao', 'coleta_id', 'evidencia', 'notas'];
const TRECHO_SEM_LINK = 'A parceria não tem link próprio nem UTM';
if (!read(`docs/Memoria de Artigos/memreview/${DOSSIE}`).includes(TRECHO_SEM_LINK)) throw new Error('dossiê sem o trecho do link');
const comercial = [['vendas', NA], ['receita', 'BRL'], ['comissao', 'BRL'], ['resgates', NA]].map(([metrica, moeda], i) => [
  `com-baw-${String(i + 1).padStart(4, '0')}`, 'baw', NA, '2026-11-16', '2026-11-18', metrica, '@indisponivel', moeda,
  '@indisponivel',
  'A venda conta só pelo código BAWEMCASACOMCECILIA, em todos os canais em que ele for divulgado (site, aplicativo da loja, redes e vídeos); não há link de afiliado nem UTM',
  NA, `docs/Memoria de Artigos/memreview/${DOSSIE}#"${TRECHO_SEM_LINK}"`,
  'Parceria iniciada em 16/11/2026. Nenhum painel comercial da BAW conhecido nem acessível à sessão em 18/11/2026 e nenhum relatório de resgates recebido. Entra como coleta quando o Bruno passar o relatório da parceira.',
]);
writeCsv('comercial.csv', HEADER_COM, comercial);

// ---------- cobertura.csv (4B) ----------
// O que o site e o vault já têm sobre a BAW, uma linha por conteúdo e pergunta. A pergunta, a avaliação total ou
// parcial e as entidades são leitura de quem analisou; o script confere que o título de seção ou a pergunta citada
// existe na fonte, que cada entidade existe no catálogo e que todo produto citado tem o link dele no conteúdo.
const HEADER_COB = ['cobertura_id', 'parceiro', 'url_ou_slug', 'tipo_conteudo', 'estado', 'estado_conferido_em',
  'pergunta_atendida', 'entidades', 'idioma', 'mercado', 'cobertura', 'lido_em', 'evidencia', 'notas'];
const LIDO_EM = '2026-11-18';
const NO_AR = '2026-11-18, no site: https://emcasacomcecilia.com respondeu 200 neste endereço às 13:29 (-03:00)';
const catalogo = parseCsv(read(`${OUT}/catalogo.csv`));
const CAT = new Map(catalogo.slice(1).filter((r) => r[0]).map((r) => [r[0], r]));
const MARCA = 'cat-baw-0001';
if (CAT.get(MARCA)?.[1] !== 'marca') throw new Error('cat-baw-0001 não é a entidade marca');
// Produtos citados nos artigos: o id numérico da página citada tem de estar na url ou nas notas da entidade
// (as cores juntadas ficam nas notas do catálogo).
const PRODUTOS = {
  'cat-baw-0366': '151202', // Camiseta Regular Goth 3.0
  'cat-baw-0380': '153490', // Camiseta Regular Selfie Logo (a página citada é outra cor)
  'cat-baw-0300': '151896', // Camiseta Oversized BAW Subscript
  'cat-baw-0429': '153707', // Moletom Basic Label
  'cat-baw-0446': '151918', // Moletom Hoodie BAW Subscript
  'cat-baw-0512': '151973', // Calça Track BAW Tag
  'cat-baw-0568': '153450', // Bermuda Jeans Regular Logo (outra cor)
  'cat-baw-0100': '151314', // Shorts Reverse Kids (outra cor)
  'cat-baw-0672': '151236', // Tênis BAW Thunder
  'cat-baw-0677': '153608', // Sandália Linus
};
for (const [id, num] of Object.entries(PRODUTOS)) {
  const r = CAT.get(id);
  if (!r || r[1] !== 'produto') throw new Error(`${id} não é produto no catálogo`);
  if (!r.join(',').includes(num)) throw new Error(`${id}: a página ${num} não está na url nem nas notas da entidade`);
}
const ent = (...ids) => {
  for (const id of ids) if (!CAT.has(id)) throw new Error(`entidade inexistente: ${id}`);
  return ids.join('|');
};
// Linhas do nossos-dados.csv das respostas de IA, para citar nas notas sem número escrito à mão.
const nosIa = (plat, q, metrica) => {
  const r = dados.find((d) => d[2] === PLATAFORMAS[plat] && d[4] === PERGUNTAS[q] && d[10] === metrica);
  if (!r) throw new Error(`sem linha de IA ${plat} ${q} ${metrica}`);
  return r[0];
};

const cobertura = [];
const cob = (o) => cobertura.push([
  `cob-baw-${String(cobertura.length + 1).padStart(4, '0')}`, 'baw', o.url, o.tipo, o.estado, o.conferido,
  o.pergunta, o.entidades, 'pt-BR', 'BR', o.cobertura, LIDO_EM, o.evidencia, o.notas,
]);

// /cupons/baw: as perguntas do FAQ da página, lidas do bloco da loja em couponsData.ts.
const coupons = read('src/lib/couponsData.ts');
const bawIni = coupons.indexOf("slug: 'baw'");
if (bawIni < 0) throw new Error('couponsData.ts sem a loja baw');
const bawBloco = coupons.slice(bawIni, coupons.indexOf("\n    slug: '", bawIni + 10) > 0 ? coupons.indexOf("\n    slug: '", bawIni + 10) : undefined);
const evCupom = (trecho) => {
  if (!bawBloco.includes(trecho)) throw new Error(`couponsData.ts (bloco baw) sem o trecho: ${trecho}`);
  return `src/lib/couponsData.ts#"${trecho}"`;
};
const PAGINA_CUPOM = [
  ['Quanto de desconto o cupom BAWEMCASACOMCECILIA dá?', 'total', ent(MARCA), 'Código e percentual no topo; teste no carrinho em 17/11/2026 (testedAt).'],
  ['Onde coloco o cupom na BAW Clothing?', 'total', ent(MARCA), 'Passo a passo e print do carrinho (cartPrint).'],
  ['O cupom BAWEMCASACOMCECILIA soma com o desconto do Pix?', 'total', ent(MARCA), 'A tabela O que acumula diz que soma com promoções e Pix e não dá frete. O valor com os dois juntos não foi testado em carrinho (orientação, seção 1).'],
  ['O cupom BAW vale na primeira compra? É melhor que o FIRSTBAW?', 'total', ent(MARCA), `Mesmo desconto do FIRSTBAW nos testes de 17/11/2026. Na consulta de IA de 18/11 o ChatGPT recomendou o FIRSTBAW com 15% (${nosIa('chatgpt', 'q4', 'recomenda-outro-codigo')}).`],
  ['Qual cupom BAW vale para quem já é cliente?', 'total', ent(MARCA), 'Cliente novo e antigo.'],
  ['O cupom BAWEMCASACOMCECILIA vale no app da BAW?', 'total', ent(MARCA), 'Site e app.'],
  ['O cupom soma com produtos em promoção?', 'total', ent(MARCA), 'Teste com camiseta em promoção de Black Friday.'],
  ['Tem cupom BAW Clothing na Black Friday?', 'parcial', ent(MARCA, 'cat-baw-0041', 'cat-baw-0042'), 'A loja não publica datas nem regulamento da campanha (P3); reler a vitrine até 25/11 e refazer o teste do código em 27/11.'],
  ['O cupom dá frete grátis?', 'total', ent(MARCA), 'Não dá; frete pelo CEP.'],
  ['Como funciona a troca na BAW Clothing?', 'total', ent(MARCA), 'Troca por crédito e devolução com reembolso.'],
  ['O que fazer se o cupom BAWEMCASACOMCECILIA não funcionar?', 'parcial', ent(MARCA), 'Valor mínimo do código sem leitura: R$ 69,00 não aceitou nenhum código e R$ 208,00 aceitou (dossiê, seção 1). Fica para um carrinho (fora do programa).'],
  ['O BAWEMCASACOMCECILIA é cupom de influenciadora?', 'total', ent(MARCA), 'Transparência da parceria.'],
];
for (const [pergunta, cobertura_, entidades, nota] of PAGINA_CUPOM) {
  cob({ url: '/cupons/baw', tipo: 'pagina-cupom', estado: 'no-ar', conferido: NO_AR, pergunta, entidades,
    cobertura: cobertura_, evidencia: evCupom(pergunta), notas: nota });
}

// Os seis artigos (BW1 a BW6), por grupo de seções.
const ARTIGOS = {
  'cupom-baw-como-usar': 'BW1',
  'black-friday-baw': 'BW6',
  'baw-clothing-reclame-aqui-nota-reputacao': 'BW2',
  'baw-clothing-e-confiavel': 'BW3',
  'cupom-baw-primeira-compra': 'BW4',
  'baw-clothing-e-boa': 'BW5',
};
const json = Object.fromEntries(Object.keys(ARTIGOS).map((slug) => {
  const j = JSON.parse(read(`content/reviews/${slug}.json`));
  if (j.draft !== false || j.affiliate !== 'baw' || (j.locale ?? 'pt') !== 'pt') throw new Error(`${slug}: não é artigo publicado da BAW em PT`);
  return [slug, j];
}));
const evSecao = (slug, heading) => {
  if (!json[slug].contentSections.some((s) => s.heading === heading)) throw new Error(`${slug}: seção não encontrada: ${heading}`);
  return `content/reviews/${slug}.json#"${heading}"`;
};
// Produto ligado a uma linha: o artigo traz o link da página dele ou o nome sem a primeira palavra
// ("Basic Label", "BAW Thunder"), sem diferenciar acento nem maiúscula.
const semAcento = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const citaProduto = (slug, id) => {
  const texto = JSON.stringify(json[slug]);
  const nome = semAcento(CAT.get(id)[6]).split(' ').slice(1).join(' ');
  if (!texto.includes(`-${PRODUTOS[id]}`) && !semAcento(texto).includes(nome)) throw new Error(`${slug}: não cita o produto ${id} (${nome})`);
};
const FILA_ATRASADA = 'A Fila (seção 1) e a ficha do vault ainda dizem que o artigo espera o deploy.';
// [slug, títulos de seção (o primeiro vai à evidência), pergunta, cobertura, entidades, nota]
const SECOES = [
  ['cupom-baw-como-usar', ['Onde digitar o cupom na BAW'], 'Onde e como digitar o cupom BAWEMCASACOMCECILIA no site?', 'total', [MARCA], ''],
  ['cupom-baw-como-usar', ['Quanto o cupom tira: a conta do nosso teste'], 'Quanto o cupom tira de verdade num carrinho?', 'total', [MARCA, 'cat-baw-0366'], 'Teste de 16/11/2026 com duas camisetas, uma delas a Regular Goth 3.0 em promoção.'],
  ['cupom-baw-como-usar', ['O cupom soma com promoção e com o Pix?'], 'O cupom soma com promoção e com o Pix?', 'total', [MARCA], 'O valor com os dois juntos não foi testado em carrinho; o artigo manda conferir no resumo.'],
  ['cupom-baw-como-usar', ['O cupom BAW vale no aplicativo?'], 'O cupom vale no aplicativo da BAW?', 'total', [MARCA], ''],
  ['cupom-baw-como-usar', ['Frete e pagamento'], 'O cupom dá frete grátis? Como a BAW cobra frete e parcela?', 'total', [MARCA], ''],
  ['cupom-baw-como-usar', ['O cupom não entrou: o que conferir'], 'Por que o cupom não entrou?', 'parcial', [MARCA], 'Não cita valor mínimo: o corte exato não foi lido (dossiê, seção 1; fora do programa, vai a um carrinho).'],
  ['cupom-baw-como-usar', ['Antes de escolher o tamanho'], 'Como escolher o tamanho antes de usar o cupom?', 'parcial', [MARCA, 'cat-baw-0003'], 'Só avisa que não há guia único e remete à BW6. O guia de tamanhos (regular ou oversized) está no estoque da Fila, sem GO (P2).'],
  ['black-friday-baw', ['A Black Friday da BAW já começou?', 'Resposta rápida'], 'A Black Friday da BAW já começou e quando acaba?', 'parcial', ['cat-baw-0041', 'cat-baw-0042'], 'A loja não publica datas nem regulamento; o sentido de "a última Black Friday" não foi esclarecido pela parceira. Releitura da vitrine até 25/11 (P3).'],
  ['black-friday-baw', ['O cupom soma com a Black Friday?'], 'O cupom soma com o preço da Black Friday?', 'total', [MARCA, 'cat-baw-0041', 'cat-baw-0366'], 'Teste de 16/11/2026; refazer em 27/11 (ficha do vault).'],
  ['black-friday-baw', ['O que vale a pena: sete peças', 'As sete peças lado a lado'], 'Quais peças valem a pena na Black Friday da BAW?', 'parcial', ['cat-baw-0041', 'cat-baw-0366', 'cat-baw-0380', 'cat-baw-0300', 'cat-baw-0429', 'cat-baw-0512', 'cat-baw-0100', 'cat-baw-0672'], 'Preços lidos em 16/11/2026, antes do pico da campanha (P3). Curadoria de sete peças; o catálogo de 18/11 tem as vitrines de Black Friday por categoria e por preço (cat-baw-0043 a 0062), que o artigo não usa.'],
  ['black-friday-baw', ['Camiseta Regular Goth 3.0'], 'A Camiseta Regular Goth 3.0 vale na Black Friday?', 'parcial', ['cat-baw-0366', 'cat-baw-0380'], 'Ficha sem descrição (sem composição nem medidas); preço de 16/11.'],
  ['black-friday-baw', ['Camiseta Regular Selfie Logo'], 'A Camiseta Regular Selfie Logo vale na Black Friday?', 'parcial', ['cat-baw-0380'], 'Medidas e composição da ficha; preço de 16/11.'],
  ['black-friday-baw', ['Camiseta Oversized BAW Subscript'], 'A Camiseta Oversized BAW Subscript vale na Black Friday?', 'parcial', ['cat-baw-0300', 'cat-baw-0380'], 'Compara as medidas com a regular; preço de 16/11.'],
  ['black-friday-baw', ['Moletom Basic Label'], 'Qual moletom da BAW vale na Black Friday?', 'parcial', ['cat-baw-0429', 'cat-baw-0446', 'cat-baw-0004'], 'Dois moletons; preço de 16/11. A pauta "moletom da BAW vale a pena?" está no estoque da Fila, sem GO (P1).'],
  ['black-friday-baw', ['Calça Track BAW Tag'], 'A Calça Track BAW Tag vale na Black Friday?', 'parcial', ['cat-baw-0512', 'cat-baw-0568'], 'Com a bermuda como alternativa; preço de 16/11.'],
  ['black-friday-baw', ['Shorts Reverse Kids'], 'O que vale na linha infantil da BAW na Black Friday?', 'parcial', ['cat-baw-0100', 'cat-baw-0014'], 'Uma peça infantil; as camisetas BR Kids estavam sem descrição; preço de 16/11.'],
  ['black-friday-baw', ['Tênis BAW Thunder'], 'O tênis BAW Thunder vale na Black Friday?', 'parcial', ['cat-baw-0672', 'cat-baw-0677', 'cat-baw-0016'], 'Ficha sem material nem medidas; preço de 16/11. A pauta "o tênis BAW é bom?" está no estoque da Fila, sem GO (P1).'],
  ['black-friday-baw', ['Antes de fechar o carrinho'], 'O que conferir antes de fechar o carrinho na Black Friday?', 'total', [MARCA], ''],
  ['black-friday-baw', ['Troca ou devolução de compra da campanha'], 'Como fica a troca de compra da Black Friday?', 'total', [MARCA], 'Política lida em 16/11/2026.'],
  ['black-friday-baw', ['E no Mercado Livre?'], 'O cupom vale no Mercado Livre? A BAW vende lá?', 'parcial', [MARCA], 'Diz que no marketplace vale o preço do anúncio; a loja oficial no Mercado Livre não foi lida (pediu verificação de conta; P6).'],
  ['baw-clothing-reclame-aqui-nota-reputacao', ['A nota em números', 'Como a nota mudou'], 'Qual é a nota da BAW Clothing no Reclame Aqui?', 'total', [MARCA], `Números de 6 e de 12 meses lidos em 16/11/2026, não relidos (escopo enxuto). Na consulta de IA de 18/11 o Perplexity disse "Regular" (${nosIa('perplexity', 'q1', 'fato-central-confere')}).`],
  ['baw-clothing-reclame-aqui-nota-reputacao', ['O que mais gera reclamação'], 'Do que os clientes da BAW mais reclamam?', 'total', [MARCA], ''],
  ['baw-clothing-reclame-aqui-nota-reputacao', ['O que conferir antes de comprar', 'Se der problema'], 'O que conferir antes de comprar e o que fazer se der problema?', 'total', [MARCA], ''],
  ['baw-clothing-e-confiavel', ['De quem é a BAW Clothing'], 'De quem é a BAW Clothing? É da Arezzo ou da Reserva?', 'total', [MARCA], `Responde com a compra de 2021 e a revenda de 2025. O Perplexity (${nosIa('perplexity', 'q2', 'fato-central-confere')}) e a visão de IA do Google (semente, 9.7) ainda dão a Arezzo como dona; o ChatGPT acerta (${nosIa('chatgpt', 'q2', 'fato-central-confere')}) (P5).`],
  ['baw-clothing-e-confiavel', ['CNPJ e site oficial'], 'Qual é o CNPJ e o site oficial da BAW?', 'total', [MARCA], 'Dois CNPJs (rodapé e Reclame Aqui).'],
  ['baw-clothing-e-confiavel', ['A reputação em resumo', 'Vale comprar na BAW Clothing?'], 'A BAW Clothing é confiável? Vale comprar?', 'total', [MARCA], `Na consulta de IA de 18/11 o ChatGPT não citou páginas nossas pelo nome do chip (${nosIa('chatgpt', 'q1', 'cita-emcasacomcecilia')}); o Perplexity citou esta e a BW2 (${nosIa('perplexity', 'q1', 'cita-emcasacomcecilia')}).`],
  ['baw-clothing-e-confiavel', ['Entrega: prazo e rastreio'], 'Qual é o prazo de entrega da BAW e como rastrear?', 'total', [MARCA], 'Prazo pelo CEP, sem número fixo, como a loja publica.'],
  ['baw-clothing-e-confiavel', ['Troca vira crédito, devolução devolve o dinheiro'], 'Como funcionam a troca e a devolução na BAW?', 'total', [MARCA], ''],
  ['baw-clothing-e-confiavel', ['Formas de pagamento'], 'Quais formas de pagamento a BAW aceita?', 'total', [MARCA], ''],
  ['baw-clothing-e-confiavel', ['Como falar com a BAW'], 'Como falar com a BAW?', 'total', [MARCA], ''],
  ['baw-clothing-e-confiavel', ['Site, aplicativo e marketplace'], 'Onde a BAW vende: site, aplicativo e marketplace?', 'parcial', [MARCA], 'A loja oficial no Mercado Livre não foi lida (P6).'],
  ['baw-clothing-e-confiavel', ['A BAW Clothing tem loja física?'], 'A BAW Clothing tem loja física? Tem outlet?', 'parcial', [MARCA, 'cat-baw-0033'], 'A página "Nossas Lojas" estava vazia; a imprensa de 2025 cita a loja do Bom Retiro, sem fonte oficial do dia. O catálogo de 18/11 tem a vitrine Outlet do site (cat-baw-0033), que não é loja física. Pauta de loja física e outlets no estoque da Fila, sem GO (P4).'],
  ['cupom-baw-primeira-compra', ['Cupom BAW primeira compra: qual usar', 'BAWEMCASACOMCECILIA ou FIRSTBAW?'], 'Qual cupom usar na primeira compra na BAW: o nosso ou o FIRSTBAW?', 'total', [MARCA], `Mesmo desconto nos testes de 17/11/2026. O ChatGPT, na mesma pergunta, mandou usar o FIRSTBAW com 15% (${nosIa('chatgpt', 'q4', 'recomenda-outro-codigo')}); é a fonte citada na resposta à quinta pergunta (${nosIa('chatgpt', 'q5', 'cita-emcasacomcecilia')}) (P5).`],
  ['cupom-baw-primeira-compra', ['Quanto o cupom tira na primeira compra'], 'Quanto o cupom tira na primeira compra?', 'total', [MARCA], ''],
  ['cupom-baw-primeira-compra', ['E na segunda compra?'], 'O cupom vale na segunda compra?', 'total', [MARCA], ''],
  ['cupom-baw-primeira-compra', ['Soma com promoção e com o Pix?'], 'Na primeira compra, o cupom soma com promoção e com o Pix?', 'total', [MARCA], ''],
  ['cupom-baw-primeira-compra', ['Primeiro pedido de roupa: o que conferir'], 'O que conferir no primeiro pedido de roupa na BAW?', 'parcial', [MARCA], 'Tamanho sem guia único (P2).'],
  ['baw-clothing-e-boa', ['O que a BAW Clothing vende'], 'O que a BAW Clothing vende?', 'parcial', [MARCA, 'cat-baw-0002', 'cat-baw-0010', 'cat-baw-0014', 'cat-baw-0015'], 'Lista as categorias do menu. As linhas e collabs do catálogo de 18/11 (cat-baw-0063 a 0078, como BAW + CHEVROLET, Harry Potter e NFL) e a vitrine Collabs 2026 (cat-baw-0031) não aparecem em nenhum conteúdo nosso (P4).'],
  ['baw-clothing-e-boa', ['Composição: o que muda entre os modelos'], 'De que tecido são as roupas da BAW?', 'parcial', ['cat-baw-0003', 'cat-baw-0004', 'cat-baw-0380', 'cat-baw-0300', 'cat-baw-0429', 'cat-baw-0446'], 'O próprio artigo diz que camisas, jaquetas e acessórios ficaram fora da leitura.'],
  ['baw-clothing-e-boa', ['Regular ou oversized: o que muda em centímetros'], 'Qual a diferença entre camiseta regular e oversized na BAW?', 'parcial', ['cat-baw-0026', 'cat-baw-0023', 'cat-baw-0380', 'cat-baw-0300'], 'Duas camisetas no tamanho M. O catálogo de 18/11 tem outras modelagens de camiseta (Boxy, New Over, Slim, Baby Tee: cat-baw-0019, 0022, 0027 e 0018) que o artigo não compara. Guia de tamanhos no estoque da Fila, sem GO (P2).'],
  ['baw-clothing-e-boa', ['Peças sem descrição'], 'E as peças sem medida na página?', 'parcial', ['cat-baw-0003', 'cat-baw-0014', 'cat-baw-0016', 'cat-baw-0366'], 'Leitura de pouco mais de 20 fichas em 16/11; a contagem por categoria da etapa 2 está nas notas das entidades categoria do catálogo (P2).'],
  ['baw-clothing-e-boa', ['O tênis da BAW é bom? O que a página informa'], 'O tênis da BAW é bom?', 'parcial', ['cat-baw-0016', 'cat-baw-0017', 'cat-baw-0672', 'cat-baw-0677'], 'Sem experiência própria e com as fichas dos tênis vazias; responde só o que a página informa (P1).'],
  ['baw-clothing-e-boa', ['Do que os clientes reclamam'], 'A qualidade da BAW é boa, segundo quem comprou?', 'total', [MARCA], 'Remete à BW2.'],
  ['baw-clothing-e-boa', ['Troca e devolução'], 'Dá para trocar se não servir?', 'total', [MARCA], ''],
  ['baw-clothing-e-boa', ['Quanto custa'], 'Quanto custam as roupas da BAW?', 'parcial', ['cat-baw-0446', 'cat-baw-0380', 'cat-baw-0300', 'cat-baw-0568', 'cat-baw-0512'], 'Preços de 16/11/2026, na campanha; o catálogo de 18/11 tem preço de referência de cada produto.'],
];
for (const [slug, headings, pergunta, cobertura_, entidades, nota] of SECOES) {
  for (const id of entidades) if (PRODUTOS[id]) citaProduto(slug, id);
  cob({
    url: `/reviews/${slug}`, tipo: 'artigo', estado: 'no-ar', conferido: NO_AR, pergunta, entidades: ent(...entidades),
    cobertura: cobertura_, evidencia: headings.map((h) => evSecao(slug, h)).join('|'),
    notas: [`${ARTIGOS[slug]}.`, nota, FILA_ATRASADA].filter(Boolean).join(' '),
  });
}

// A subpágina de loja de /reviews.
cob({
  url: '/reviews/loja/baw', tipo: 'pagina', estado: 'no-ar', conferido: NO_AR,
  pergunta: 'Quais artigos o site tem sobre a BAW?', entidades: ent(MARCA), cobertura: 'total',
  evidencia: `CLAUDE.md#"${(() => {
    const t = 'subpáginas `/reviews/loja/<slug>` das lojas com 3 artigos ou mais';
    if (!read('CLAUDE.md').includes(t)) throw new Error('CLAUDE.md sem a regra das subpáginas de loja');
    return t;
  })()}"`,
  notas: `Estante da loja; existe porque a BAW tem ${Object.keys(ARTIGOS).length} artigos em PT com affiliate baw.`,
});

// As fichas das pautas BW1 a BW6 no vault (o briefing de cada artigo publicado).
for (const [slug, bw] of Object.entries(ARTIGOS)) {
  const ficha = read(`docs/Memoria de Artigos/memreview/02_Artigos/${slug}.md`);
  const status = /^status: "([^"]+)"/m.exec(ficha)?.[1];
  const proxima = /^proxima_acao: "([^"]+)"/m.exec(ficha)?.[1];
  if (!status || !proxima) throw new Error(`02_Artigos/${slug}.md sem status ou proxima_acao`);
  cob({
    url: `02_Artigos/${slug}.md`, tipo: 'artigo', estado: 'briefing',
    conferido: `${LIDO_EM}, no repositório: a ficha diz status "${status}", mas o artigo dela está no ar (/reviews/${slug}, 200 às 13:29)`,
    pergunta: `Ficha da pauta ${bw}: briefing e regras do artigo /reviews/${slug}`, entidades: ent(MARCA), cobertura: NA,
    evidencia: `docs/Memoria de Artigos/memreview/02_Artigos/${slug}.md#frontmatter, campos status e proxima_acao`,
    notas: `Próxima ação na ficha: ${proxima}. A cobertura das perguntas está nas linhas do artigo publicado; esta linha só registra o briefing.`,
  });
}
writeCsv('cobertura.csv', HEADER_COB, cobertura);
