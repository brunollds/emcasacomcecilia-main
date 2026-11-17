// Gera sinais.csv (etapa 3 do Programa de Demanda, L'Amazonie) a partir do bruto.
// Uso: node gerar-sinais.cjs   (de qualquer pasta, sem dependências)
// Rodar duas vezes dá o mesmo arquivo. Para com erro se houver id repetido,
// célula vazia ou evidência que não existe.

const fs = require('fs');
const path = require('path');

const AQUI = __dirname;
const BRUTO = path.join(AQUI, '..', '1-bruto');
const SAIDA = path.join(AQUI, 'sinais.csv');

const COLETAS = {
  ac1: '20261117-1035-google-autocompletar',
  ac2: '20261117-1039-google-autocompletar-concorrentes',
  serp: '20261117-1043-google-serp',
  trends: '20261117-1046-google-trends',
  youtube: '20261117-1050-youtube-busca',
  ml: '20261117-1053-mercadolivre-loja',
  fichas: '20261117-1012-navegador-fichas',
  paginas: '20261117-1007-shopify-paginas',
};
const DIA = '2026-11-17';
const SEMENTE_1611 = '../../../../02_Artigos/lamazonie-fatos-1611.md';

const CABECALHO = [
  'sinal_id', 'consulta', 'tipo_sinal', 'fonte', 'entidades', 'pais', 'idioma', 'periodo_inicio',
  'periodo_fim', 'filtros', 'medida', 'unidade', 'coleta_id', 'evidencia', 'limitacoes',
];

const cat = (n) => `cat-lamazonie-${String(n).padStart(4, '0')}`;
const semAcento = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const ler = (coleta, arquivo) => fs.readFileSync(path.join(BRUTO, coleta, arquivo), 'utf8');
const linhasDe = (coleta, arquivo) => ler(coleta, arquivo).split('\n').map((l) => l.replace(/\r$/, ''));

// Entidades do catálogo a que a consulta se liga. Tema amplo (sem o nome da loja) aponta para a
// linha e para a categoria. Sem ligação clara: @nao-se-aplica.
function entidades(consulta) {
  const n = semAcento(consulta);
  const marca = /amazoni/.test(n);
  if (/\b(situe|etend|trouve|nil|pays|combien)\b/.test(n)) return '@nao-se-aplica'; // "l'Amazonie" em francês
  if (/\d{3,} ?(mg|ui)|\btomar\b|imunidade|\bcc\b|mercadona|se puede|por ciento|cuando usar/.test(n)) {
    return '@nao-se-aplica'; // vitamina C de tomar, ou busca em espanhol
  }
  const ids = [];
  if (/e-?book/.test(n)) {
    ids.push(cat(18));
  } else if (/gel de limpeza/.test(n)) {
    ids.push(cat(16));
    if (!marca) ids.push(cat(7));
  } else if (/sobrancelh|sombrancelh|cilio|minoxidil|upcil|niraj|explosion grow/.test(n)) {
    ids.push(cat(12));
    if (!marca) ids.push(cat(6));
  } else if (/creme clareador|clareador de|clareador intim|virilha|axila|intim|dermosex|parte intima|clarear/.test(n)) {
    ids.push(cat(17));
    if (/intim/.test(n)) ids.push(cat(31));
    if (/axila/.test(n)) ids.push(cat(34), cat(5));
    if (/virilha/.test(n)) ids.push(cat(37));
  } else if (/vitamina c|c20|anti ?manchas|antimanchas|melasma|serum clareador|tira manchas|clareia a pele/.test(n)) {
    ids.push(cat(13));
    if (!marca) ids.push(cat(4));
  } else if (/bastao|stick/.test(n)) {
    ids.push(cat(15));
    if (!marca) ids.push(cat(11));
  } else if (/protetor|fps|filtro solar/.test(n)) {
    ids.push(cat(14));
    if (marca && !/fps/.test(n)) ids.push(cat(15));
    if (!marca) ids.push(cat(10));
  } else if (/black friday/.test(n)) {
    ids.push(cat(8), cat(1));
  } else if (/\bkit\b/.test(n)) {
    ids.push(cat(9));
  } else if (marca) {
    if (/serum/.test(n)) ids.push(cat(12), cat(13));
    else ids.push(cat(1));
  } else if (/serum/.test(n)) {
    ids.push(cat(12), cat(13));
  }
  return ids.length ? ids.join('|') : '@nao-se-aplica';
}

const sinais = [];
function sinal(s) {
  sinais.push({ pais: 'BR', idioma: 'pt-BR', periodo_inicio: DIA, periodo_fim: DIA, ...s });
}

// 1. Autocompletar do Google (duas coletas)
const LIM_AC =
  'Posição na lista de sugestões devolvida para a semente; mostra como a busca é formulada, não volume. ' +
  'A mesma sugestão pode aparecer para várias sementes. Lista de um momento, com hl=pt-BR e gl=br.';
const LIM_AC_VAZIO =
  'Zero sugestões devolvidas para esta formulação nesta coleta. Não prova que ninguém busca: ' +
  'o Google pode não completar formulações longas ou raras.';
for (const chave of ['ac1', 'ac2']) {
  const coleta = COLETAS[chave];
  const respostas = linhasDe(coleta, 'respostas.tsv').slice(1).filter(Boolean).map((l) => l.split('\t'));
  for (const [, semente, arquivo, http] of respostas) {
    if (http !== '200') throw new Error(`resposta sem HTTP 200: ${coleta}/${arquivo}`);
    const json = JSON.parse(ler(coleta, arquivo));
    const lista = json[1];
    const filtros = `semente=${semente};client=firefox;hl=pt-BR;gl=br`;
    if (!lista.length) {
      sinal({
        consulta: semente, tipo_sinal: 'autocompletar', fonte: 'google-suggest', entidades: entidades(semente),
        filtros, medida: '0', unidade: 'sugestoes-devolvidas', coleta_id: coleta,
        evidencia: `${arquivo}#lista-vazia`, limitacoes: LIM_AC_VAZIO,
      });
      continue;
    }
    lista.forEach((sugestao, i) => {
      sinal({
        consulta: sugestao, tipo_sinal: 'autocompletar', fonte: 'google-suggest', entidades: entidades(sugestao),
        filtros, medida: String(i + 1), unidade: 'posicao-na-lista', coleta_id: coleta,
        evidencia: `${arquivo}#item=${i + 1}`, limitacoes: LIM_AC,
      });
    });
  }
}

// 2. Página de resultados do Google: orgânicos, visão de IA, perguntas e pesquisas relacionadas
const FILTROS_SERP = 'hl=pt-BR;gl=br;pws=0;sem login';
const LIM_SERP_BASE =
  'Posição entre os resultados orgânicos transcritos da primeira página, sem contar anúncios nem blocos de produtos; ' +
  'página lida uma vez, com local definido pelo IP. Texto condensado pela sessão, não é captura byte a byte.';
const arquivosSerp = fs.readdirSync(path.join(BRUTO, COLETAS.serp)).filter((f) => /^serp-\d+.*\.txt$/.test(f)).sort();
for (const arquivo of arquivosSerp) {
  const linhas = linhasDe(COLETAS.serp, arquivo);
  const consulta = linhas[0].replace(/^# CONSULTA: /, '');
  const entConsulta = entidades(consulta);
  let secao = '';
  let pos = 0;
  linhas.forEach((linha, i) => {
    const nLinha = i + 1;
    if (linha.startsWith('## ')) { secao = linha.slice(3).trim(); pos = 0; return; }
    if (!linha || linha.startsWith('#')) return;
    const evidencia = `${arquivo}#linha=${nLinha}`;
    if (secao === 'IA') {
      const presente = /^Visão geral criada por IA: presente/.test(linha);
      sinal({
        consulta, tipo_sinal: 'serp', fonte: 'google-visao-de-ia', entidades: entConsulta, filtros: FILTROS_SERP,
        medida: presente ? '1' : '@indisponivel', unidade: 'presente-0-ou-1', coleta_id: COLETAS.serp, evidencia,
        limitacoes: presente
          ? 'Diz só que o Google mostrou resposta de IA nesta leitura; o texto muda a cada carga e está resumido no bruto.'
          : 'A resposta de IA ainda carregava quando o texto foi lido; não se sabe se existe para esta consulta.',
      });
    } else if (secao === 'RESULTADOS') {
      const [p, titulo, dominio] = linha.split(' | ');
      sinal({
        consulta, tipo_sinal: 'serp', fonte: `google-serp/${dominio}`, entidades: entConsulta, filtros: FILTROS_SERP,
        medida: p, unidade: 'posicao-na-pagina', coleta_id: COLETAS.serp, evidencia,
        limitacoes: `Título: "${titulo}". ${LIM_SERP_BASE}`,
      });
    } else if (secao === 'PAA' || secao === 'RELACIONADAS') {
      pos += 1;
      const e = entidades(linha);
      sinal({
        consulta: linha, tipo_sinal: 'pergunta-relacionada',
        fonte: secao === 'PAA' ? 'google-as-pessoas-tambem-perguntam' : 'google-outras-pessoas-pesquisaram',
        entidades: e === '@nao-se-aplica' ? entConsulta : e,
        filtros: `consulta-de-origem=${consulta};${FILTROS_SERP}`, medida: String(pos), unidade: 'posicao-na-lista',
        coleta_id: COLETAS.serp, evidencia,
        limitacoes:
          'Pergunta ou busca que o Google associou à consulta de origem nesta leitura; a posição não é volume. ' +
          'Só as perguntas visíveis sem expandir o bloco.',
      });
    }
  });
}

// 3. Google Trends (tabelas lidas da página)
const MESES = { jan: 1, fev: 2, mar: 3, abr: 4, mai: 5, jun: 6, jul: 7, ago: 8, set: 9, out: 10, nov: 11, dez: 12 };
function dataIso(texto) {
  const m = texto.match(/^(\d+) de (\w+)\. de (\d+)$/);
  if (!m) throw new Error(`data do Trends não reconhecida: ${texto}`);
  return `${m[3]}-${String(MESES[m[2]]).padStart(2, '0')}-${m[1].padStart(2, '0')}`;
}
const LIM_TRENDS =
  'Índice relativo de 0 a 100 dentro desta comparação, do Brasil e dos últimos 12 meses; não é volume de busca e não se compara ' +
  'com números de outra consulta ao Trends. Zero numa semana quer dizer dado insuficiente naquela semana. ' +
  'A última semana está incompleta. Valores copiados da tabela da página (o CSV não chegou ao disco).';
const arquivosTrends = fs.readdirSync(path.join(BRUTO, COLETAS.trends)).filter((f) => f.endsWith('.csv')).sort();
for (const arquivo of arquivosTrends) {
  const linhas = linhasDe(COLETAS.trends, arquivo).filter(Boolean).map((l) => l.split(';'));
  const termos = linhas[0].slice(1);
  const temMedia = linhas[1][0] === 'Média';
  const semanas = linhas.slice(temMedia ? 2 : 1);
  const inicio = dataIso(semanas[0][0]);
  const filtros = `geo=BR;date=today 12-m;categoria=todas;pesquisa na web;comparacao=${termos.join(' + ')}`;
  termos.forEach((termo, c) => {
    const valores = semanas.map((s) => Number(s[c + 1]));
    const comum = {
      consulta: termo, tipo_sinal: 'trends', fonte: 'google-trends', entidades: entidades(termo),
      periodo_inicio: inicio, periodo_fim: DIA, filtros, coleta_id: COLETAS.trends,
    };
    if (temMedia) {
      sinal({
        ...comum, medida: linhas[1][c + 1], unidade: 'indice-relativo-0-100-media-do-periodo',
        evidencia: `${arquivo}#linha=2;coluna=${c + 2}`,
        limitacoes: `Média que a página mostra para o termo, arredondada (0 é menos de 1, não ausência). ${LIM_TRENDS}`,
      });
    }
    sinal({
      ...comum, medida: String(valores.filter((v) => v > 0).length), unidade: `semanas-com-indice-acima-de-zero-em-${valores.length}`,
      evidencia: `${arquivo}#coluna=${c + 2}`,
      limitacoes: `Conta de semanas com índice maior que zero, feita pelo script sobre a tabela. ${LIM_TRENDS}`,
    });
  });
}
{
  const arquivo = 'trends-d-marca-sozinha-relacionadas.txt';
  const linhas = linhasDe(COLETAS.trends, arquivo);
  let secao = '';
  linhas.forEach((linha, i) => {
    if (linha.startsWith('## ')) { secao = linha.slice(3); return; }
    const m = linha.match(/^(\d+) \| (.+) \| (.+)$/);
    if (!m) return;
    const assunto = secao.startsWith('Assuntos');
    sinal({
      consulta: m[2], tipo_sinal: 'trends',
      fonte: assunto ? 'google-trends-assuntos-relacionados' : 'google-trends-pesquisas-relacionadas',
      entidades: assunto ? cat(1) : entidades(m[2]), periodo_inicio: '2025-11-16', periodo_fim: DIA,
      filtros: `geo=BR;date=today 12-m;termo=l'amazonie;lista=${secao}`,
      medida: assunto ? m[3].replace(/\D/g, '') : m[3],
      unidade: assunto ? 'crescimento-percentual-no-periodo' : 'indice-relativo-0-100-entre-relacionadas',
      coleta_id: COLETAS.trends, evidencia: `${arquivo}#linha=${i + 1}`,
      limitacoes:
        'Relacionado ao termo "l\'amazonie" no Brasil, nos últimos 12 meses; o termo também é o nome da Amazônia em francês, ' +
        'e a lista tem poucos itens porque a busca é pequena. Não é volume.',
    });
  });
}

// 4. YouTube (busca sem login)
function visualizacoes(texto) {
  const m = texto.trim().match(/^([\d.,]+)\s*(mil|mi)?$/);
  if (!m) throw new Error(`visualizações não reconhecidas: ${texto}`);
  const n = Number(m[1].replace(/\./g, '').replace(',', '.'));
  return String(Math.round(n * (m[2] === 'mil' ? 1e3 : m[2] === 'mi' ? 1e6 : 1)));
}
linhasDe(COLETAS.youtube, 'youtube-resultados.txt').forEach((linha, i) => {
  if (!linha || linha.startsWith('#')) return;
  const [consulta, pos, titulo, canal, views, idade] = linha.split(' | ');
  sinal({
    consulta, tipo_sinal: 'youtube', fonte: `youtube-busca/${canal}`, entidades: entidades(consulta),
    filtros: `sem login;sem filtro;posicao=${pos}`, medida: visualizacoes(views), unidade: 'visualizacoes',
    coleta_id: COLETAS.youtube, evidencia: `youtube-resultados.txt#linha=${i + 1}`,
    limitacoes:
      `Vídeo "${titulo}", publicado ${idade}. Visualizações arredondadas pelo YouTube e acumuladas desde a publicação: ` +
      'dependem do canal, da distribuição e da idade do vídeo, e o vídeo pode não tratar da consulta. Shorts ficaram de fora.',
  });
});

// 5. Dúvidas públicas: perguntas frequentes que a loja publica (coletas da etapa 2)
const FAQ = [
  [COLETAS.fichas, 'ficha-serum-fortalecedor-de-sobrancelhas.txt', cat(19)],
  [COLETAS.fichas, 'ficha-serum-facial-antioxidante-c20.txt', cat(22)],
  [COLETAS.fichas, 'ficha-protetor-solar-facial-stick.txt', cat(25)],
  [COLETAS.fichas, 'ficha-creme-clareador-intimo.txt', cat(31)],
  [COLETAS.fichas, 'ficha-creme-clareador-para-axilas-diferencas.txt', cat(34)],
  [COLETAS.fichas, 'ficha-creme-clareador-para-virilha-diferencas.txt', cat(37)],
  [COLETAS.paginas, 'pagina-perguntas-frequentes.txt', ''],
  [COLETAS.paginas, 'pagina-garantia.txt', cat(12)],
];
for (const [coleta, arquivo, entidade] of FAQ) {
  let pos = 0;
  linhasDe(coleta, arquivo).forEach((linha, i) => {
    const pergunta = linha.trim();
    if (!/\?$/.test(pergunta) || pergunta.length > 160) return;
    pos += 1;
    let ent = entidade;
    if (!ent) ent = i + 1 >= 27 ? cat(12) : cat(1); // na página geral, as perguntas do sérum começam na linha 27
    sinal({
      consulta: pergunta, tipo_sinal: 'duvida-publica',
      fonte: arquivo.startsWith('ficha-') ? 'loja-perguntas-frequentes-da-ficha' : 'loja-pagina-institucional',
      entidades: ent, filtros: '@nao-se-aplica', medida: String(pos), unidade: 'posicao-na-lista', coleta_id: coleta,
      evidencia: `${arquivo}#linha=${i + 1}`,
      limitacoes:
        'Pergunta escolhida e respondida pela própria loja: indica o que ela espera ouvir do cliente, não quantas pessoas perguntam. ' +
        'A resposta é texto da marca.',
    });
  });
}

// 6. Dúvidas públicas: Mercado Livre e Reclame Aqui
{
  const linhas = linhasDe(COLETAS.ml, 'duvidas-mercadolivre.txt');
  const i = linhas.findIndex((l) => l.startsWith('PERGUNTAS: @indisponivel'));
  if (i < 0) throw new Error('linha de perguntas do Mercado Livre não encontrada');
  sinal({
    consulta: 'perguntas na página do sérum de cílios e sobrancelhas no Mercado Livre', tipo_sinal: 'duvida-publica',
    fonte: 'mercadolivre-perguntas-do-produto', entidades: cat(19), filtros: 'loja oficial LAmazonie;sem login',
    medida: '@indisponivel', unidade: 'perguntas-lidas', coleta_id: COLETAS.ml,
    evidencia: `duvidas-mercadolivre.txt#linha=${i + 1}`,
    limitacoes: 'A página do produto pediu login e a leitura parou. A loja oficial existe e abre sem login; as perguntas não foram lidas.',
  });
}
const RECLAME = [
  ['Atraso na entrega', '43.1', 'percentual-das-reclamacoes', '"Atraso na entrega", 43,1%', 'Principal problema da aba geral do perfil (até 3 anos).'],
  ['sérum que chegou vazio', '@nao-se-aplica', '@nao-se-aplica', 'sérum que chegou vazio', 'Título de uma das cinco últimas reclamações da página em 16/11.'],
  ['cremes não recebidos', '@nao-se-aplica', '@nao-se-aplica', 'cremes não recebidos', 'Título de uma das cinco últimas reclamações da página em 16/11.'],
  ['pedido "em separação" desde 16/10', '@nao-se-aplica', '@nao-se-aplica', 'pedido "em separação" desde 16/10', 'Título de uma das cinco últimas reclamações da página em 16/11.'],
  ['compra não recebida, sem resposta por e-mail', '@nao-se-aplica', '@nao-se-aplica', 'compra de 02/10 não recebida, sem resposta por e-mail', 'Título de uma das cinco últimas reclamações da página em 16/11.'],
  ['pedido não enviado nos 3 dias úteis prometidos', '@nao-se-aplica', '@nao-se-aplica', 'pedido de 16/08 não enviado nos 3 dias úteis prometidos', 'Título de uma das cinco últimas reclamações da página em 16/11.'],
  ['sérum causa queda excessiva', '@nao-se-aplica', '@nao-se-aplica', '"causa queda excessiva"', 'Reclamação de 30/10/2025 que aparecia no topo de duas buscas do Google em 16/11.'],
];
for (const [consulta, medida, unidade, trecho, nota] of RECLAME) {
  sinal({
    consulta, tipo_sinal: 'duvida-publica', fonte: 'reclame-aqui', entidades: /sérum/.test(consulta) ? cat(19) : cat(1),
    periodo_inicio: medida === '43.1' ? '@indisponivel' : '2026-11-16', periodo_fim: '2026-11-16',
    filtros: 'perfil l-amazonie', medida, unidade, coleta_id: '@nao-se-aplica',
    evidencia: `${SEMENTE_1611}#${trecho}`,
    limitacoes:
      `${nota} Lido pela pesquisa semente de 16/11/2026, sem bruto guardado: a evidência é o resumo dela. ` +
      'Tema de reclamação, sem julgar o mérito; a base do perfil é pequena (30 reclamações em seis meses).',
  });
}

// 7. Hipóteses da sessão (não foram vistas como busca; ficam para investigar)
const HIPOTESES = [
  ['garantia mais fios l\'amazonie como funciona', cat(12), [COLETAS.ac1, 'q-025-l-amazonie-garantia.json#lista-vazia'],
    'O autocompletar não completa "l\'amazonie garantia", mas a garantia de 60 dias está no anúncio e no resultado da loja; a pergunta pode existir fora do Google.'],
  ['sérum de sobrancelha pode usar com micropigmentação', `${cat(12)}|${cat(6)}`, [COLETAS.ac2, 'q-108-minoxidil-na-sobrancelha.json#item=8'],
    'Aparece só para o minoxidil ("minoxidil na sobrancelha com micropigmentação"); a garantia da loja exclui micropigmentação. Não vista para sérum.'],
  ['l\'amazonie ou niraj', `${cat(12)}|${cat(6)}`, [COLETAS.ac2, 'q-110-l-amazonie-ou-niraj.json#lista-vazia'],
    'Comparação que ninguém formula no autocompletar; a Niraj domina as sugestões e os vídeos da categoria. Sem sinal de busca.'],
  ['fps 99 protege mais que fps 60', `${cat(14)}|${cat(10)}`, [COLETAS.serp, 'serp-10-protetor-solar-fps-99-e-bom.txt#linha=4'],
    'A resposta de IA do Google já dá a diferença; "diferença fps 50 e fps 99" não completa. Pode ser dúvida já respondida no topo.'],
  ['creme clareador íntimo, de axilas e de virilha da l\'amazonie são o mesmo produto', cat(17), [COLETAS.fichas, 'ficha-creme-clareador-para-axilas-diferencas.txt#linha=20'],
    'O catálogo mostra os mesmos SKUs nas três páginas; nenhuma busca vista sobre isso.'],
  ['sérum l\'amazonie causa queda', cat(19), [COLETAS.serp, 'serp-01-serum-l-amazonie-resenha.txt#linha=4'],
    'A resposta de IA cita "relatos isolados de reações adversas, como queda de pelos"; nenhuma sugestão do autocompletar com "queda" foi pedida.'],
  ['l\'amazonie mercado livre ou site oficial qual o preço', `${cat(1)}|${cat(19)}`, [COLETAS.ml, 'duvidas-mercadolivre.txt#linha=8'],
    'A vitrine da loja oficial no Mercado Livre mostrava o sérum abaixo do preço do site; "l\'amazonie mercado livre" completa, a comparação de preço não foi vista.'],
];
for (const [consulta, ents, [coleta, evidencia], nota] of HIPOTESES) {
  sinal({
    consulta, tipo_sinal: 'hipotese', fonte: 'sessao-etapa-3', entidades: ents, filtros: '@nao-se-aplica',
    medida: '@nao-investigado', unidade: '@nao-se-aplica', coleta_id: coleta, evidencia,
    limitacoes: `Hipótese da sessão, não é pergunta observada. ${nota}`,
  });
}

// Conferências e saída
function existeEvidencia(coleta, evidencia) {
  const [arquivo, local = ''] = evidencia.split('#');
  const caminho = coleta === '@nao-se-aplica' ? path.join(AQUI, arquivo) : path.join(BRUTO, coleta, arquivo);
  if (!fs.existsSync(caminho)) return false;
  const texto = fs.readFileSync(caminho, 'utf8');
  let m;
  if ((m = local.match(/^item=(\d+)$/))) return JSON.parse(texto)[1].length >= Number(m[1]);
  if (local === 'lista-vazia') return JSON.parse(texto)[1].length === 0;
  if ((m = local.match(/^linha=(\d+)/))) return texto.split('\n').length >= Number(m[1]);
  if ((m = local.match(/^coluna=(\d+)$/))) return texto.split('\n')[0].split(';').length >= Number(m[1]);
  if (coleta === '@nao-se-aplica') return texto.replace(/\s+/g, ' ').includes(local.replace(/^"|"$/g, ''));
  return false;
}

const catalogo = new Set(
  fs.readFileSync(path.join(AQUI, 'catalogo.csv'), 'utf8').split('\n').slice(1).map((l) => l.split(',')[0]).filter((id) => /^cat-/.test(id)),
);
const csv = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const linhasCsv = [CABECALHO.join(',')];
sinais.forEach((s, i) => {
  s.sinal_id = `sin-lamazonie-${String(i + 1).padStart(4, '0')}`;
  for (const col of CABECALHO) {
    if (s[col] === undefined || s[col] === null || String(s[col]).trim() === '') {
      throw new Error(`célula vazia: ${s.sinal_id} ${col}`);
    }
  }
  if (s.entidades !== '@nao-se-aplica') {
    for (const id of s.entidades.split('|')) if (!catalogo.has(id)) throw new Error(`entidade fora do catálogo: ${s.sinal_id} ${id}`);
  }
  if (!existeEvidencia(s.coleta_id, s.evidencia)) throw new Error(`evidência não encontrada: ${s.sinal_id} ${s.coleta_id} ${s.evidencia}`);
  linhasCsv.push(CABECALHO.map((col) => csv(String(s[col]))).join(','));
});
if (new Set(sinais.map((s) => s.sinal_id)).size !== sinais.length) throw new Error('id repetido');

fs.writeFileSync(SAIDA, linhasCsv.join('\n') + '\n', 'utf8');
const porTipo = {};
for (const s of sinais) porTipo[s.tipo_sinal] = (porTipo[s.tipo_sinal] || 0) + 1;
console.log(`${sinais.length} sinais em ${path.relative(process.cwd(), SAIDA)}`);
console.log(Object.entries(porTipo).map(([t, n]) => `${t}: ${n}`).join('; '));
