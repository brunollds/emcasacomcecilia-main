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
const SEM_RECORTE = 'O recorte dirigido no Search Console (consulta e página contêm "baw", até o último dia disponível) não '
  + 'foi feito: em 18/11/2026 a plataforma pediu login no navegador embutido (relatos/etapa-4.md, lacunas).';
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
