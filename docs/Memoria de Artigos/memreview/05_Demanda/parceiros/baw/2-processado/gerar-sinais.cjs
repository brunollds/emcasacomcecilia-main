// Etapa 3 da BAW: gera sinais.csv e resumo-sinais.md a partir das coletas de 18/11/2026 em 1-bruto/.
// Roda de qualquer pasta, sem dependências: node gerar-sinais.cjs
// Para com erro em célula vazia, id repetido, entidade fora do catálogo ou evidência que não confere no bruto.
'use strict';
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..');
const BRUTO = path.join(BASE, '1-bruto');
const SAIDA_CSV = path.join(__dirname, 'sinais.csv');
const SAIDA_RESUMO = path.join(__dirname, 'resumo-sinais.md');

const COLETA = {
  ac: '20261118-2045-google-autocompletar',
  serp: '20261118-2045-google-serp',
  trends: '20261118-2054-google-trends',
  yt: '20261118-2053-youtube-busca',
  ml: '20261118-2052-mercadolivre-lista',
};
const DIA = '2026-11-18';
const COLUNAS = ['sinal_id', 'consulta', 'consulta_origem', 'titulo', 'tipo_sinal', 'modalidade', 'fonte', 'entidades',
  'pais', 'idioma', 'periodo_inicio', 'periodo_fim', 'filtros', 'medida', 'unidade', 'coleta_id', 'evidencia', 'limitacoes'];

const LIM = {
  ac: 'Posição na lista de sugestões de um pedido sem cookie nem login; mostra como a busca é escrita, não volume',
  acVazia: 'Lista vazia neste pedido: o Google não completou a formulação; não prova que ninguém busca',
  paa: 'Pergunta visível no bloco "As pessoas também perguntam" desta leitura, sem expandir; ordem do bloco, não volume',
  rel: 'Busca do bloco "Outras pessoas pesquisaram"; repete-se entre consultas da mesma marca: contar por termo (resumo-sinais.md), não como procura independente',
  serp: 'Posição entre os resultados orgânicos com título e fonte lidos no texto da primeira página, contados pela sessão; não é a posição oficial nem volume; carrosséis de vídeo, imagens e produtos ficaram de fora da contagem',
  ia: 'Visão de IA do Google numa leitura sem login; muda entre leituras; a linha traz a primeira frase, o resto está no arquivo',
  anuncio: 'Anúncio pago mostrado nesta leitura; não diz com que frequência aparece nem quem mais anuncia em outras leituras',
  vitrine: 'Preço de anúncio do Mercado Livre visto no bloco de produtos do Google; vendedor não identificado e não confirmado como loja oficial; não é preço para artigo',
  yt: 'Visualizações arredondadas pelo YouTube e convertidas pela sessão; dependem do canal, da distribuição e da idade; lista parcial da página de resultados',
  ytAnuncio: 'Anúncio pago na busca do YouTube desta leitura; não diz frequência',
  trends: 'Índice relativo 0 a 100 dentro desta comparação e recorte (Brasil, 12 meses, Pesquisa na Web); não se compara com outra comparação; valores da página, sem o CSV oficial',
  trendsRel: 'Consulta relacionada do Trends, só as 5 primeiras que a página mostrou; percentual de crescimento no recorte, não volume',
};

// ---------- utilidades ----------
function falha(msg) { throw new Error(msg); }
function ler(rel) {
  const p = path.join(BRUTO, rel);
  if (!fs.existsSync(p)) falha(`arquivo do bruto não existe: ${rel}`);
  return fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
}
function parseCsv(s) {
  const linhas = []; let r = [], f = '', q = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) { if (c === '"') { if (s[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ',') { r.push(f); f = ''; }
    else if (c === '\n') { r.push(f); linhas.push(r); r = []; f = ''; }
    else if (c !== '\r') f += c;
  }
  if (f || r.length) { r.push(f); linhas.push(r); }
  return linhas;
}
function csvCel(v) { const s = String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }
function semAcento(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }

// ---------- catálogo e entidades ----------
const catalogo = parseCsv(fs.readFileSync(path.join(__dirname, 'catalogo.csv'), 'utf8'));
const idsCatalogo = new Set(catalogo.slice(1).map((r) => r[0]));
const MARCA = 'cat-baw-0001';

// Fora do assunto: outras marcas, carros e expressões que só dividem as letras "baw".
const FORA = /bawarchi|bowser|sri lanka|baw 212|\bcars?\b|car sale|auto sales|estate sales|\be7\b|bae bae|baw baw|ouedkniss|polovni|multimetro|baw waw|\bbmw\b|bawmi|\bbawl\b|bawmc|outdoor|^baw out$|xeque|cheer|running shorts|athletic shorts|men's shorts|polo shirts|\bpolos\b|women's|youth polo|de trabajo|ballroom/;

const REGRAS = [
  [/black friday/, ['cat-baw-0041', 'cat-baw-0042']],
  [/hello kitty/, ['cat-baw-0072']], [/harry potter|potterhead/, ['cat-baw-0071']], [/bob marley/, ['cat-baw-0067']],
  [/\bnfl\b|mitchell/, ['cat-baw-0073']], [/disney/, ['cat-baw-0070']], [/pica.?pau/, ['cat-baw-0074']],
  [/scooby/, ['cat-baw-0075']], [/smiley|\bsmile\b/, ['cat-baw-0076']], [/linus/, ['cat-baw-0077']],
  [/desgosto/, ['cat-baw-0078']], [/chevrolet|opala/, ['cat-baw-0063']], [/athletics/, ['cat-baw-0066']],
  [/chilli/, ['cat-baw-0065']], [/\bbasics\b/, ['cat-baw-0064']], [/\bcollabs?\b/, ['cat-baw-0031']],
  [/outlet|bawtlet/, ['cat-baw-0033']], [/\bsale\b|promocao/, ['cat-baw-0032']],
  [/moletom|moletons|hoodie|sweatshirt/, ['cat-baw-0004']], [/camiseta|t-shirt|\btee\b/, ['cat-baw-0003']],
  [/\bcamisas?\b/, ['cat-baw-0005']], [/\bcalcas?\b/, ['cat-baw-0006']], [/jaqueta|puffer/, ['cat-baw-0007']],
  [/bermuda|\bshorts?\b/, ['cat-baw-0008']], [/\bsaias?\b/, ['cat-baw-0009']],
  [/\bbolsas?\b|pochete|mochila|crossbody/, ['cat-baw-0011']], [/\bbones?\b|five panel/, ['cat-baw-0012']],
  [/\bmeias?\b/, ['cat-baw-0013']], [/\bkids\b|infantil/, ['cat-baw-0014']], [/tenis|sneaker/, ['cat-baw-0016']],
  [/\bslide\b|chinelo/, ['cat-baw-0017']], [/\bregata\b/, ['cat-baw-0025']], [/\bpolo\b/, ['cat-baw-0024']],
  [/manga longa/, ['cat-baw-0021']], [/new over/, ['cat-baw-0022']], [/\bboxy\b|\bbox\b/, ['cat-baw-0019']],
  [/\bregular\b/, ['cat-baw-0026']],
];
function entidades(texto) {
  const t = semAcento(texto).replace(/#\S+/g, ' ');
  if (FORA.test(t)) return '@nao-se-aplica';
  const ids = [];
  const temBaw = /\bbaw/.test(t);
  if (temBaw) ids.push(MARCA);
  for (const [re, lista] of REGRAS) if (re.test(t)) ids.push(...lista);
  // "oversized" é a subcategoria de camiseta; em moletom não.
  if (/oversized/.test(t) && !/moletom|hoodie/.test(t)) ids.push('cat-baw-0023');
  const unicos = [...new Set(ids)];
  for (const id of unicos) if (!idsCatalogo.has(id)) falha(`entidade fora do catálogo: ${id}`);
  return unicos.length ? unicos.join('|') : '@nao-se-aplica';
}

// ---------- linhas ----------
const linhas = [];
function add(l) {
  const linha = {
    pais: 'BR', idioma: 'pt-BR', periodo_inicio: DIA, periodo_fim: DIA, ...l,
  };
  linhas.push(linha);
}
function conferirTrecho(rel, trecho) {
  if (!ler(rel).includes(trecho)) falha(`trecho não encontrado em ${rel}: ${trecho}`);
  return `${path.basename(rel)}#"${trecho}"`;
}

// 1. Autocompletar
{
  const pasta = COLETA.ac;
  const resp = ler(`${pasta}/respostas.tsv`).trim().split('\n').slice(1).map((l) => l.split('\t'));
  for (const [n, semente, arquivo, http, ctype] of resp) {
    if (http !== '200') falha(`autocompletar ${n} sem HTTP 200`);
    if (!/charset=UTF-8/i.test(ctype)) falha(`autocompletar ${n}: Content-Type inesperado ${ctype}`);
    const j = JSON.parse(ler(`${pasta}/${arquivo}`));
    if (j[0] !== semente) falha(`autocompletar ${n}: consulta do arquivo difere da semente`);
    const filtros = 'client=firefox;hl=pt-BR;gl=br;sem cookie';
    if (!j[1].length) {
      add({ consulta: semente, consulta_origem: semente, titulo: '@nao-se-aplica', tipo_sinal: 'autocompletar',
        modalidade: 'arquivo-original', fonte: 'google-suggest', entidades: entidades(semente), filtros,
        medida: 0, unidade: 'sugestoes-devolvidas', coleta_id: pasta, evidencia: `${arquivo}#lista-vazia`, limitacoes: LIM.acVazia });
      continue;
    }
    j[1].forEach((s, i) => add({ consulta: s, consulta_origem: semente, titulo: '@nao-se-aplica', tipo_sinal: 'autocompletar',
      modalidade: 'arquivo-original', fonte: 'google-suggest', entidades: entidades(s), filtros,
      medida: i + 1, unidade: 'posicao-na-lista', coleta_id: pasta, evidencia: `${arquivo}#item=${i + 1}`, limitacoes: LIM.ac }));
  }
}

// 2. Primeira página do Google
function blocoDepois(linhasTxt, marcador, paradas) {
  const i = linhasTxt.indexOf(marcador);
  if (i < 0) return [];
  const out = [];
  for (let k = i + 1; k < linhasTxt.length; k++) {
    if (paradas.some((p) => linhasTxt[k].startsWith(p))) break;
    if (linhasTxt[k].trim()) out.push(linhasTxt[k].trim());
  }
  return out;
}
{
  const pasta = COLETA.serp;
  const arquivos = fs.readdirSync(path.join(BRUTO, pasta)).filter((f) => /^serp-\d+.*\.txt$/.test(f)).sort();
  for (const arq of arquivos) {
    const rel = `${pasta}/${arq}`;
    const txt = ler(rel);
    const consulta = txt.match(/^Consulta: (.+)$/m)[1];
    const corpo = txt.slice(txt.indexOf('\n---\n') + 5);
    const L = corpo.split('\n');
    const base = { consulta_origem: consulta, coleta_id: pasta, filtros: 'hl=pt-BR;gl=br;sem login;navegador embutido' };
    const entsConsulta = entidades(consulta);

    // visão de IA
    const iIa = L.indexOf('Visão geral criada por IA');
    if (iIa >= 0) {
      const frase = L[iIa + 1].trim();
      const blocoIa = L.slice(iIa, L.findIndex((x, k) => k > iIa && /^(Mostrar mais|Resultados da web)$/.test(x)) + 1).join('\n');
      const citaNos = /Em Casa com Cec[ií]lia|emcasacomcecilia|BAWEMCASACOMCECILIA/.test(blocoIa);
      add({ ...base, consulta, titulo: '@nao-se-aplica', tipo_sinal: 'resposta-ia', modalidade: 'texto-extraido',
        fonte: 'google-busca; visão geral criada por IA', entidades: entsConsulta, medida: 1, unidade: 'visao-de-ia-presente',
        evidencia: conferirTrecho(rel, frase),
        limitacoes: `${LIM.ia}. ${citaNos ? 'Cita o nosso site ou o nosso código' : 'Não cita o nosso site nem o nosso código'}` });
    } else {
      add({ ...base, consulta, titulo: '@nao-se-aplica', tipo_sinal: 'resposta-ia', modalidade: 'texto-extraido',
        fonte: 'google-busca; visão geral criada por IA', entidades: entsConsulta, medida: '@indisponivel', unidade: 'visao-de-ia-presente',
        evidencia: conferirTrecho(rel, L.find((x) => x.trim()) || ''),
        limitacoes: 'A visão de IA não terminou de carregar antes da leitura (a página mostrava "Pensando")' });
    }

    // anúncios
    let posAnuncio = 0;
    let k = 0;
    while ((k = L.indexOf('Resultados Patrocinados', k)) >= 0) {
      const fim = L.indexOf('Ocultar resultados patrocinados', k);
      for (let i = k + 1; i < fim - 2; i++) {
        if (/^[\w.-]+\.[a-z.]+$/.test(L[i + 1]) && L[i + 2].startsWith('https://')) {
          posAnuncio += 1;
          add({ ...base, consulta, titulo: L[i], tipo_sinal: 'anuncio', modalidade: 'texto-extraido',
            fonte: `google-busca; anúncio de ${L[i + 1]}`, entidades: entidades(L[i]), medida: posAnuncio, unidade: 'posicao-entre-anuncios-lidos',
            evidencia: conferirTrecho(rel, L[i]), limitacoes: LIM.anuncio });
        }
      }
      k = fim;
    }

    // resultados orgânicos: título, linha em branco, fonte; depois o endereço ou a linha "Rede · perfil"
    let pos = 0;
    for (let i = 1; i < L.length - 2; i++) {
      if (L[i] !== '' || !L[i - 1].trim() || !L[i + 1].trim()) continue;
      const titulo = L[i - 1].trim();
      const fonte = L[i + 1].trim();
      const seguinte = (L[i + 2] || '').trim();
      const ehResultado = seguinte.startsWith('https://') || / · /.test(fonte);
      if (!ehResultado || /^(Resultados|Mais resultados)/.test(fonte)) continue;
      pos += 1;
      add({ ...base, consulta, titulo, tipo_sinal: 'serp', modalidade: 'texto-extraido',
        fonte: `google-busca; resultado de ${fonte}`, entidades: entidades(titulo) === '@nao-se-aplica' ? entsConsulta : entidades(titulo),
        medida: pos, unidade: 'posicao-entre-organicos-lidos', evidencia: conferirTrecho(rel, `${titulo}\n\n${fonte}`).replace(/\n/g, '\\n'),
        limitacoes: LIM.serp });
    }

    // "As pessoas também perguntam" e "Outras pessoas pesquisaram"
    blocoDepois(L, 'As pessoas também perguntam', ['Resultados', 'Ver fotos', 'Vídeos']).forEach((p, i) => add({
      ...base, consulta: p, titulo: '@nao-se-aplica', tipo_sinal: 'pergunta-relacionada', modalidade: 'texto-extraido',
      fonte: 'google-busca; As pessoas também perguntam', entidades: entidades(p) === '@nao-se-aplica' ? entsConsulta : entidades(p),
      medida: i + 1, unidade: 'posicao-no-bloco', evidencia: conferirTrecho(rel, p), limitacoes: LIM.paa }));
    blocoDepois(L, 'Outras pessoas pesquisaram', ['Navegação nas páginas']).forEach((p, i) => add({
      ...base, consulta: p, titulo: '@nao-se-aplica', tipo_sinal: 'pergunta-relacionada', modalidade: 'texto-extraido',
      fonte: 'google-busca; Outras pessoas pesquisaram', entidades: entidades(p),
      medida: i + 1, unidade: 'posicao-no-bloco', evidencia: conferirTrecho(rel, p), limitacoes: LIM.rel }));

    // vitrine de marketplace: produto com preço vendido no Mercado Livre, no bloco de produtos do Google
    for (let i = 0; i < L.length - 3; i++) {
      const m = (L[i + 1] || '').match(/^R\$ ([\d.]+,\d{2}) agora$/);
      if (!m) continue;
      const vendedor = [L[i + 3], L[i + 4]].map((x) => (x || '').trim()).find((x) => x === 'Mercado Livre');
      if (!vendedor) continue;
      add({ ...base, consulta, titulo: L[i].trim(), tipo_sinal: 'vitrine-marketplace', modalidade: 'trecho-literal',
        fonte: 'google-busca; bloco de produtos; vendedor no Mercado Livre', entidades: entidades(L[i]),
        medida: m[1].replace(/\./g, '').replace(',', '.'), unidade: 'preco-brl-anunciado',
        evidencia: conferirTrecho(rel, `${L[i]}\n${L[i + 1]}`).replace(/\n/g, '\\n'), limitacoes: LIM.vitrine });
    }
  }
}

// 3. YouTube
function visualizacoes(v) {
  const m = v.match(/^([\d,]+)(?: (mil|mi))?/);
  if (!m) return null;
  const n = parseFloat(m[1].replace(',', '.'));
  return Math.round(n * (m[2] === 'mil' ? 1e3 : m[2] === 'mi' ? 1e6 : 1));
}
{
  const pasta = COLETA.yt;
  const tsv = ler(`${pasta}/youtube-resultados.tsv`).trim().split('\n');
  const cab = tsv[0].split('\t');
  tsv.slice(1).forEach((l, idx) => {
    const c = Object.fromEntries(l.split('\t').map((v, i) => [cab[i], v]));
    if (Object.keys(c).length !== 8) falha(`youtube: linha ${idx + 2} sem 8 colunas`);
    const evid = `youtube-resultados.tsv#linha=${idx + 2}`;
    const base = { consulta: c.consulta, consulta_origem: c.consulta, coleta_id: pasta, modalidade: 'resumo-coletor', filtros: 'sem login;navegador embutido;ordem padrão' };
    if (c.formato === 'anuncio') {
      add({ ...base, titulo: c.titulo, tipo_sinal: 'anuncio', fonte: `youtube-busca; anúncio de ${c.canal}`, entidades: entidades(c.titulo),
        medida: c.ordem, unidade: 'posicao-na-pagina', evidencia: evid, limitacoes: LIM.ytAnuncio });
      return;
    }
    const n = visualizacoes(c.visualizacoes);
    if (n === null) falha(`youtube: visualizações ilegíveis na linha ${idx + 2}`);
    const ehCanal = c.formato === 'canal';
    add({ ...base, titulo: c.titulo, tipo_sinal: 'youtube', fonte: `youtube-busca; ${c.formato}; canal ${c.canal}`,
      entidades: entidades(c.titulo) === '@nao-se-aplica' ? entidades(c.consulta) : entidades(c.titulo),
      medida: n, unidade: ehCanal ? 'inscritos' : 'visualizacoes', evidencia: evid,
      limitacoes: `${LIM.yt}; posição ${c.ordem} na página; idade ${c.idade === '@indisponivel' ? 'não mostrada (Shorts)' : c.idade}` });
  });
}

// 4. Trends
function lerSerie(rel) {
  const t = parseCsv(ler(rel)).filter((r) => r.length > 1);
  const cab = t[0];
  const media = t.find((r) => r[0] === 'media');
  const semanas = t.filter((r) => /^\d{4}-/.test(r[0]));
  return { cab, media, semanas };
}
{
  const pasta = COLETA.trends;
  const filtros = 'geo=BR;Últimos 12 meses;Todas as categorias;Pesquisa na Web';
  const base = { coleta_id: pasta, modalidade: 'texto-extraido', fonte: 'google-trends', titulo: '@nao-se-aplica',
    periodo_inicio: '2025-11-16', periodo_fim: DIA, filtros };
  const series = [
    ['trends-a-baw-clothing-sozinha.csv', 'comparação A: baw clothing sozinha'],
    ['trends-b-marca-e-categorias.csv', 'comparação B: baw clothing, moletom baw, camiseta baw, tenis baw, cupom baw'],
    ['trends-c-marca-e-temas-amplos.csv', 'comparação C: baw clothing, camiseta oversized, moletom oversized, camiseta boxy, marca streetwear'],
  ];
  for (const [arq, origem] of series) {
    const { cab, media, semanas } = lerSerie(`${pasta}/${arq}`);
    if (semanas.length !== 53) falha(`${arq}: esperava 53 semanas, veio ${semanas.length}`);
    cab.slice(1).forEach((termo, j) => {
      const col = j + 1;
      const comValor = semanas.filter((s) => Number(s[col]) > 0).length;
      const ultima = semanas[semanas.length - 1];
      if (media) add({ ...base, consulta: termo, consulta_origem: origem, tipo_sinal: 'trends', entidades: entidades(termo),
        medida: media[col], unidade: 'indice-relativo-media-12-meses', evidencia: `${arq}#coluna=${termo};linha=media`, limitacoes: LIM.trends });
      add({ ...base, consulta: termo, consulta_origem: origem, tipo_sinal: 'trends', entidades: entidades(termo),
        medida: comValor, unidade: 'semanas-com-valor-acima-de-0-de-53', evidencia: `${arq}#coluna=${termo}`,
        limitacoes: `${LIM.trends}; conta feita pelo gerador sobre as 53 semanas do arquivo` });
      add({ ...base, consulta: termo, consulta_origem: origem, tipo_sinal: 'trends', entidades: entidades(termo),
        medida: ultima[col], unidade: 'indice-relativo-semana-2026-11-15', evidencia: `${arq}#coluna=${termo};linha=2026-11-15`,
        limitacoes: `${LIM.trends}; a última semana pode estar incompleta na leitura de 18/11` });
    });
  }
  // relacionadas: as de "baw clothing" vêm da comparação A (as mesmas aparecem em B e C)
  const rel = [
    ['trends-a-relacionados.txt', 'baw clothing', ['dust\tMais 300%', 'centauro\tMais 200%', 'hering\tMais 180%', 'bolovo\tMais 170%', 'sufgang\tMais 160%']],
    ['trends-b-relacionados.txt', 'moletom baw', ['moletom vans feminino Mais 120%', 'shein Mais 60%']],
    ['trends-b-relacionados.txt', 'camiseta baw', ['puma Mais 100%', 'camiseta baw oversized Mais 50%']],
    ['trends-b-relacionados.txt', 'tenis baw', ['tenis vans 100', 'tenis masculino 95', 'tenis nike 95', 'vans 94', 'nike 93']],
    ['trends-b-relacionados.txt', 'cupom baw', ['baw clothing 100', 'cupom baw clothing 100', 'cupom desconto baw 82', 'cupom de desconto baw 57', 'moletom baw 22']],
    ['trends-c-relacionados.txt', 'camiseta oversized', ['camiseta do brasil Mais 600%', 'camiseta brasil oversized Mais 350%', 'camiseta brasil Mais 350%', 'oversized brasil Mais 350%', 'berzek Mais 190%']],
    ['trends-c-relacionados.txt', 'moletom oversized', ['berzerk Aumento repentino', 'calça moletom baggy Mais 130%', 'conjunto moletom Mais 80%']],
    ['trends-c-relacionados.txt', 'camiseta boxy', ['bershka Aumento repentino', 'h&m Aumento repentino', 'levis Mais 550%', 'roma Mais 250%', 'romã Mais 140%']],
    ['trends-c-relacionados.txt', 'marca streetwear', ['adidas Mais 350%']],
  ];
  for (const [arq, termo, itens] of rel) {
    for (const item of itens) {
      const m = item.match(/^(.+?)[\t ](Mais (\d+)%|Aumento repentino|(\d+))$/);
      if (!m) falha(`relacionada ilegível: ${item}`);
      const principal = m[4] !== undefined;
      add({ ...base, consulta: m[1], consulta_origem: termo, tipo_sinal: 'trends', entidades: entidades(m[1]),
        medida: m[3] || m[4] || '@indisponivel',
        unidade: principal ? 'indice-relativo-consultas-principais' : 'crescimento-percentual-em-ascensao',
        evidencia: conferirTrecho(`${pasta}/${arq}`, item).replace(/\t/g, '\\t'),
        limitacoes: m[2] === 'Aumento repentino' ? `${LIM.trendsRel}; "Aumento repentino" é crescimento acima do que a página numera` : LIM.trendsRel });
    }
  }
}

// 5. Mercado Livre: bloqueado no primeiro pedido
add({ consulta: 'baw clothing', consulta_origem: 'lista.mercadolivre.com.br/baw-clothing', titulo: '@nao-se-aplica',
  tipo_sinal: 'vitrine-marketplace', modalidade: 'texto-extraido', fonte: 'mercadolivre; lista de busca', entidades: MARCA,
  filtros: 'sem login;navegador embutido', medida: '@indisponivel', unidade: 'preco-brl-anunciado', coleta_id: COLETA.ml,
  evidencia: conferirTrecho(`${COLETA.ml}/bloqueio-mercadolivre.txt`, 'Para continuar, acesse'),
  limitacoes: 'A página pediu verificação de conta no primeiro pedido; a fonte parou ali, sem login' });

// ---------- ids, conferência e saída ----------
linhas.forEach((l, i) => { l.sinal_id = `sin-baw-${String(i + 1).padStart(4, '0')}`; });
const vistos = new Set();
for (const l of linhas) {
  if (vistos.has(l.sinal_id)) falha(`id repetido: ${l.sinal_id}`);
  vistos.add(l.sinal_id);
  for (const c of COLUNAS) {
    if (l[c] === undefined || l[c] === null || String(l[c]).trim() === '') falha(`célula vazia: ${l.sinal_id} ${c}`);
  }
  if (l.entidades !== '@nao-se-aplica') for (const id of l.entidades.split('|')) if (!idsCatalogo.has(id)) falha(`entidade fora do catálogo em ${l.sinal_id}: ${id}`);
  const pasta = path.join(BRUTO, l.coleta_id);
  const arq = l.evidencia.split('#')[0];
  if (!fs.existsSync(path.join(pasta, arq))) falha(`evidência sem arquivo em ${l.sinal_id}: ${arq}`);
}
const csv = [COLUNAS.join(','), ...linhas.map((l) => COLUNAS.map((c) => csvCel(l[c])).join(','))].join('\n') + '\n';
fs.writeFileSync(SAIDA_CSV, csv);

// ---------- resumo ----------
function contar(lista, chave) { const m = new Map(); for (const x of lista) m.set(x[chave], (m.get(x[chave]) || 0) + 1); return m; }
const porOrigem = new Map();
for (const l of linhas) { if (!porOrigem.has(l.consulta_origem)) porOrigem.set(l.consulta_origem, []); porOrigem.get(l.consulta_origem).push(l); }
const out = [];
out.push('# Resumo dos sinais: BAW Clothing (etapa 3, 18/11/2026)', '');
out.push('Gerado por `2-processado/gerar-sinais.cjs` a partir do `sinais.csv`. Não editar à mão. Todo número aqui sai do CSV;');
out.push('nenhum é volume de busca. Cada linha do CSV diz em `limitacoes` o que a medida não diz.', '');
out.push(`Total: ${linhas.length} sinais (\`sin-baw-0001\` a \`${linhas[linhas.length - 1].sinal_id}\`).`, '');
out.push('| tipo_sinal | Sinais |', '|---|---|');
for (const [t, n] of [...contar(linhas, 'tipo_sinal')].sort()) out.push(`| \`${t}\` | ${n} |`);
out.push('');

out.push('## 1. Primeira página do Google, por consulta', '');
out.push('Uma seção por consulta lida: sinais por tipo, a visão de IA (primeira frase), os anúncios, as perguntas de "As');
out.push('pessoas também perguntam", os resultados do nosso site e os preços de marketplace.', '');
const consultasSerp = [...porOrigem.keys()].filter((o) => porOrigem.get(o).some((l) => l.coleta_id === COLETA.serp));
for (const o of consultasSerp) {
  const ls = porOrigem.get(o).filter((l) => l.coleta_id === COLETA.serp);
  out.push(`### "${o}"`, '');
  out.push(`- Sinais: ${[...contar(ls, 'tipo_sinal')].map(([t, n]) => `${t} ${n}`).join(', ')} (${ls[0].evidencia.split('#')[0]}).`);
  for (const l of ls.filter((x) => x.tipo_sinal === 'resposta-ia')) {
    const frase = l.medida === '@indisponivel' ? 'não carregou' : l.evidencia.replace(/^[^#]+#/, '');
    out.push(`- Visão de IA (\`${l.sinal_id}\`): ${frase} ${l.limitacoes.split('. ').pop()}.`);
  }
  const an = ls.filter((x) => x.tipo_sinal === 'anuncio');
  out.push(`- Anúncios: ${an.length ? an.map((x) => `"${x.titulo}" (${x.fonte.replace('google-busca; anúncio de ', '')}, \`${x.sinal_id}\`)`).join('; ') : 'nenhum'}.`);
  const paa = ls.filter((x) => x.fonte.endsWith('As pessoas também perguntam'));
  out.push(`- As pessoas também perguntam: ${paa.length ? paa.map((x) => `"${x.consulta}"`).join('; ') : 'bloco não apareceu'}.`);
  const nos = ls.filter((x) => x.tipo_sinal === 'serp' && /Em Casa com Cec/.test(x.fonte));
  out.push(`- Nosso site entre os orgânicos lidos: ${nos.length ? nos.map((x) => `posição ${x.medida}, "${x.titulo}" (\`${x.sinal_id}\`)`).join('; ') : 'não aparece'}.`);
  const vit = ls.filter((x) => x.tipo_sinal === 'vitrine-marketplace');
  if (vit.length) out.push(`- Preços de marketplace no bloco de produtos: ${vit.map((x) => `"${x.titulo}" R$ ${x.medida} (\`${x.sinal_id}\`)`).join('; ')}.`);
  out.push('');
}

out.push('## 2. Buscas relacionadas juntadas por termo', '');
out.push('Cada termo de "Outras pessoas pesquisaram" e de "As pessoas também perguntam" aparece uma vez, com as consultas em');
out.push('que apareceu. Termo repetido em várias consultas da mesma marca é o mesmo bloco se repetindo, não procura somada.', '');
const relacionadas = linhas.filter((l) => l.tipo_sinal === 'pergunta-relacionada');
const porTermo = new Map();
for (const l of relacionadas) {
  const t = semAcento(l.consulta).replace(/[?]/g, '').trim();
  if (!porTermo.has(t)) porTermo.set(t, { texto: l.consulta, bloco: new Set(), origens: new Set(), ids: [] });
  const e = porTermo.get(t); e.origens.add(l.consulta_origem); e.ids.push(l.sinal_id);
  e.bloco.add(l.fonte.endsWith('As pessoas também perguntam') ? 'PAA' : 'Outras pesquisaram');
}
out.push('| Termo | Bloco | Consultas em que apareceu | Quantas | Sinais |', '|---|---|---|---|---|');
for (const e of [...porTermo.values()].sort((a, b) => b.origens.size - a.origens.size || a.texto.localeCompare(b.texto))) {
  out.push(`| ${e.texto} | ${[...e.bloco].join(', ')} | ${[...e.origens].join('; ')} | ${e.origens.size} | ${e.ids.length === 1 ? `\`${e.ids[0]}\`` : `\`${e.ids[0]}\` e mais ${e.ids.length - 1}`} |`);
}
out.push('');

out.push('## 3. Autocompletar, por semente', '');
out.push('Sugestões por semente, na ordem devolvida. Lista vazia é `0` em `sugestoes-devolvidas`.', '');
out.push('| Semente | Sugestões | Sugestões (texto) |', '|---|---|---|');
const sementes = [...porOrigem.keys()].filter((o) => porOrigem.get(o).some((l) => l.tipo_sinal === 'autocompletar'));
for (const s of sementes) {
  const ls = porOrigem.get(s).filter((l) => l.tipo_sinal === 'autocompletar');
  const vazia = ls.length === 1 && ls[0].unidade === 'sugestoes-devolvidas';
  out.push(`| ${s} | ${vazia ? 0 : ls.length} | ${vazia ? '(vazia)' : ls.map((l) => l.consulta).join('; ')} |`);
}
out.push('');

out.push('## 4. YouTube, por consulta', '');
for (const o of [...porOrigem.keys()].filter((x) => porOrigem.get(x).some((l) => l.coleta_id === COLETA.yt))) {
  const ls = porOrigem.get(o).filter((l) => l.coleta_id === COLETA.yt);
  const vids = ls.filter((l) => l.tipo_sinal === 'youtube' && l.unidade === 'visualizacoes');
  const top = [...vids].sort((a, b) => b.medida - a.medida).slice(0, 3);
  const an = ls.filter((l) => l.tipo_sinal === 'anuncio');
  out.push(`- **"${o}"**: ${vids.length} vídeos e Shorts, ${an.length} anúncios (${an.map((x) => x.fonte.replace('youtube-busca; anúncio de ', '')).join(', ') || 'nenhum'}). Mais vistos: ${top.map((x) => `"${x.titulo}" ${x.medida} (\`${x.sinal_id}\`)`).join('; ')}.`);
}
out.push('');

out.push('## 5. Trends, por comparação', '');
for (const o of [...porOrigem.keys()].filter((x) => x.startsWith('comparação'))) {
  const ls = porOrigem.get(o);
  out.push(`- **${o}**`);
  for (const termo of [...new Set(ls.map((l) => l.consulta))]) {
    const m = ls.find((l) => l.consulta === termo && l.unidade === 'indice-relativo-media-12-meses');
    const s = ls.find((l) => l.consulta === termo && l.unidade.startsWith('semanas-com-valor'));
    const u = ls.find((l) => l.consulta === termo && l.unidade === 'indice-relativo-semana-2026-11-15');
    out.push(`  - ${termo}: média ${m ? m.medida : 'não mostrada'}; ${s.medida} de 53 semanas com valor; semana de 15/11: ${u.medida} (\`${(m || s).sinal_id}\`).`);
  }
}
const relTrends = linhas.filter((l) => l.tipo_sinal === 'trends' && !l.consulta_origem.startsWith('comparação'));
out.push('', 'Consultas relacionadas do Trends:', '');
for (const termo of [...new Set(relTrends.map((l) => l.consulta_origem))]) {
  const ls = relTrends.filter((l) => l.consulta_origem === termo);
  out.push(`- ${termo}: ${ls.map((l) => `${l.consulta} (${l.medida === '@indisponivel' ? 'aumento repentino' : l.unidade.startsWith('crescimento') ? `+${l.medida}%` : l.medida})`).join('; ')}.`);
}
out.push('');

out.push('## 6. Marketplace', '');
const ml = linhas.filter((l) => l.coleta_id === COLETA.ml);
for (const l of ml) out.push(`- Mercado Livre, lista "baw-clothing" (\`${l.sinal_id}\`): ${l.limitacoes}.`);
out.push('');
fs.writeFileSync(SAIDA_RESUMO, out.join('\n'));
console.log(`sinais.csv: ${linhas.length} linhas; resumo-sinais.md escrito`);
