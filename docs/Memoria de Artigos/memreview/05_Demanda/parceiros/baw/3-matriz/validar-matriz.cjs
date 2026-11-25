// Confere a matriz.csv da BAW contra o FORMATOS.md v2 (seção 5) e contra os CSVs de 2-processado/.
// Uso: node validar-matriz.cjs   (de qualquer pasta; sai com código 1 no primeiro conjunto de erros)

const fs = require('fs');
const path = require('path');

const PARCEIRO = 'baw';
const AQUI = __dirname;
const PROCESSADO = path.join(AQUI, '..', '2-processado');

const CABECALHO = [
  'oportunidade_id', 'parceiros', 'entidades', 'intencao', 'perguntas', 'pais', 'idioma', 'sinais_ref',
  'nossos_dados_ref', 'comercial_ref', 'cobertura_ref', 'evidencias_principais', 'lacuna', 'acao', 'prioridade',
  'justificativa_prioridade', 'confianca', 'dependencias', 'estado_revisao', 'notas',
];
const ACOES = [
  'criar-artigo', 'melhorar-capitulo', 'atualizar-fatos', 'melhorar-pagina-cupom', 'links-internos', 'video',
  'consolidar', 'recomendar-retirada', 'manter', 'nao-criar', 'ideia-registrada',
];
const SEM_PRIORIDADE = ['manter', 'nao-criar', 'ideia-registrada'];
const NIVEIS = ['alta', 'media', 'baixa'];
const ESTADOS_REVISAO = ['rascunho', 'em-revisao', 'devolvida', 'pronta'];
const ESTADOS_DE_CAMPO = ['@indisponivel', '@nao-investigado', '@parcial', '@nao-se-aplica'];

// coluna da matriz -> arquivo de origem e prefixo do id
const REFERENCIAS = {
  entidades: ['catalogo.csv', 'cat'],
  sinais_ref: ['sinais.csv', 'sin'],
  nossos_dados_ref: ['nossos-dados.csv', 'nos'],
  comercial_ref: ['comercial.csv', 'com'],
  cobertura_ref: ['cobertura.csv', 'cob'],
};

// Códigos de terceiros que aparecem no bruto. Nenhum entra na matriz; o FIRSTBAW só na forma permitida.
const CODIGOS_DE_TERCEIROS = ['BAWANNALAURA', 'BAWOFF', 'BAWVINDO', 'CLIENTEBAW', 'NATAW', 'CRAZYBAW', 'NIGHTBAW'];

function lerCsv(arquivo) {
  const texto = fs.readFileSync(arquivo, 'utf8');
  const linhas = [];
  let linha = [];
  let campo = '';
  let entreAspas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (entreAspas) {
      if (c === '"' && texto[i + 1] === '"') {
        campo += '"';
        i++;
      } else if (c === '"') entreAspas = false;
      else campo += c;
    } else if (c === '"') entreAspas = true;
    else if (c === ',') {
      linha.push(campo);
      campo = '';
    } else if (c === '\n') {
      linha.push(campo);
      linhas.push(linha);
      linha = [];
      campo = '';
    } else campo += c;
  }
  if (campo !== '' || linha.length) {
    linha.push(campo);
    linhas.push(linha);
  }
  return linhas;
}

const erros = [];
const erro = (onde, msg) => erros.push(`${onde}: ${msg}`);

const idsDe = {};
const todosOsIds = new Set();
for (const [coluna, [arquivo]] of Object.entries(REFERENCIAS)) {
  idsDe[coluna] = new Set(lerCsv(path.join(PROCESSADO, arquivo)).slice(1).map((l) => l[0]));
  for (const id of idsDe[coluna]) todosOsIds.add(id);
}

const arquivoMatriz = path.join(AQUI, 'matriz.csv');
const bruto = fs.readFileSync(arquivoMatriz);
if (bruto[0] === 0xef && bruto[1] === 0xbb && bruto[2] === 0xbf) erro('arquivo', 'tem BOM');
if (bruto.includes(0x0d)) erro('arquivo', 'tem CR: a matriz é LF (FORMATOS.md, seção 1)');

const [cabecalho, ...linhas] = lerCsv(arquivoMatriz);
if (cabecalho.join(',') !== CABECALHO.join(',')) erro('cabeçalho', `diferente do FORMATOS.md v2: ${cabecalho.join(',')}`);
if (!linhas.length) erro('arquivo', 'sem linhas de dados');

const vistos = new Set();
const contagem = { acao: {}, prioridade: {}, confianca: {} };
let totalRefs = 0;

linhas.forEach((celulas, i) => {
  const onde = celulas[0] || `linha ${i + 2}`;
  if (celulas.length !== CABECALHO.length) {
    erro(onde, `${celulas.length} colunas, esperadas ${CABECALHO.length}`);
    return;
  }
  const l = Object.fromEntries(CABECALHO.map((c, j) => [c, celulas[j]]));

  for (const c of CABECALHO) if (l[c].trim() === '') erro(onde, `célula vazia em ${c}`);

  const esperado = `op-${PARCEIRO}-${String(i + 1).padStart(4, '0')}`;
  if (l.oportunidade_id !== esperado) erro(onde, `id fora da sequência (esperado ${esperado})`);
  if (vistos.has(l.oportunidade_id)) erro(onde, 'id repetido');
  vistos.add(l.oportunidade_id);

  if (!l.parceiros.split('|').includes(PARCEIRO)) erro(onde, `parceiros não inclui ${PARCEIRO}`);
  if (l.pais !== 'BR' || l.idioma !== 'pt-BR') erro(onde, `mercado inesperado: ${l.pais} ${l.idioma}`);
  if (!ACOES.includes(l.acao)) erro(onde, `acao inválida: ${l.acao}`);
  if (SEM_PRIORIDADE.includes(l.acao)) {
    if (l.prioridade !== '@nao-se-aplica') erro(onde, `${l.acao} pede prioridade @nao-se-aplica, não ${l.prioridade}`);
  } else if (!NIVEIS.includes(l.prioridade)) erro(onde, `prioridade inválida para ${l.acao}: ${l.prioridade}`);
  if (!NIVEIS.includes(l.confianca)) erro(onde, `confianca inválida: ${l.confianca}`);
  if (!ESTADOS_REVISAO.includes(l.estado_revisao)) erro(onde, `estado_revisao inválido: ${l.estado_revisao}`);

  const contexto = new Set();
  for (const [coluna, [arquivo, prefixo]] of Object.entries(REFERENCIAS)) {
    const valor = l[coluna];
    if (ESTADOS_DE_CAMPO.includes(valor)) {
      if (coluna === 'entidades') erro(onde, 'entidades não aceita código de estado');
      continue;
    }
    const ids = valor.split('|');
    const repetidos = ids.filter((id, k) => ids.indexOf(id) !== k);
    if (repetidos.length) erro(onde, `${coluna} repete ${[...new Set(repetidos)].join(', ')}`);
    for (const id of ids) {
      totalRefs++;
      contexto.add(id);
      if (!id.startsWith(`${prefixo}-${PARCEIRO}-`)) erro(onde, `${coluna} tem valor que não é id de ${arquivo}: ${id}`);
      else if (!idsDe[coluna].has(id)) erro(onde, `${coluna} aponta para ${id}, que não existe em ${arquivo}`);
    }
  }

  // evidências principais: de 1 a 3 ids que existem e estão no conjunto de contexto da própria linha
  const principais = l.evidencias_principais.split('|');
  if (principais.length < 1 || principais.length > 3) erro(onde, `evidencias_principais com ${principais.length} ids (de 1 a 3)`);
  for (const id of principais) {
    if (!todosOsIds.has(id)) erro(onde, `evidencias_principais cita ${id}, que não existe nos CSVs`);
    else if (!contexto.has(id)) erro(onde, `evidencias_principais cita ${id}, que não está nas referências da linha`);
  }

  // outras oportunidades citadas no texto precisam existir e não ser a própria linha
  for (const c of ['lacuna', 'justificativa_prioridade', 'dependencias', 'notas']) {
    for (const m of l[c].matchAll(/op-[a-z0-9]+-\d{4}/g)) {
      const n = Number(m[0].slice(-4));
      if (!m[0].startsWith(`op-${PARCEIRO}-`) || n < 1 || n > linhas.length) erro(onde, `${c} cita ${m[0]}, que não existe`);
      else if (m[0] === l.oportunidade_id) erro(onde, `${c} cita a própria linha`);
    }
    if (/\{\{|\}\}/.test(l[c])) erro(onde, `${c} tem chave {{...}} não resolvida`);
  }

  if (l.acao === 'criar-artigo') {
    if (!/acrescenta/i.test(l.lacuna) || l.lacuna.length < 150) {
      erro(onde, 'criar-artigo sem a frase do que o nosso texto acrescenta aos resultados atuais');
    }
    if (ESTADOS_DE_CAMPO.includes(l.dependencias)) erro(onde, 'criar-artigo sem dependências');
  }

  const texto = CABECALHO.map((c) => l[c]).join(' ');
  for (const codigo of CODIGOS_DE_TERCEIROS) {
    if (new RegExp(`\\b${codigo}\\b`).test(texto)) erro(onde, `cita código de terceiro: ${codigo}`);
  }
  for (const c of CABECALHO) {
    if (/FIRSTBAW/.test(l[c]) && !/mesmo desconto/.test(l[c])) {
      erro(onde, `${c} cita o FIRSTBAW fora da forma "o nosso dá o mesmo desconto"`);
    }
  }

  for (const c of ['acao', 'prioridade', 'confianca']) contagem[c][l[c]] = (contagem[c][l[c]] || 0) + 1;
});

// As contagens do LEITURA.md saem do gerador; aqui só se confere que batem com a matriz.
const leitura = path.join(AQUI, 'LEITURA.md');
if (fs.existsSync(leitura)) {
  const bloco = fs.readFileSync(leitura, 'utf8').match(/<!-- contagens:inicio -->([\s\S]*?)<!-- contagens:fim -->/);
  if (!bloco) erro('LEITURA.md', 'sem o bloco de contagens');
  else {
    const tabelas = { Ação: 'acao', Prioridade: 'prioridade', Confiança: 'confianca' };
    let atual = null;
    let conferidas = 0;
    for (const linha of bloco[1].split('\n')) {
      const cabecalhoTabela = linha.match(/^\| (Ação|Prioridade|Confiança) \|/);
      if (cabecalhoTabela) {
        atual = tabelas[cabecalhoTabela[1]];
        continue;
      }
      const m = linha.match(/^\| `([a-z@-]+)` \| (\d+) \|/);
      if (!m || !atual) continue;
      const [, chave, n] = m;
      const real = contagem[atual][chave] || 0;
      conferidas++;
      if (Number(n) !== real) erro('LEITURA.md', `${atual} ${chave}: o bloco diz ${n}, a matriz tem ${real}; rode o gerador`);
    }
    if (!conferidas) erro('LEITURA.md', 'bloco de contagens sem tabelas');
    if (!bloco[1].includes(`${linhas.length} oportunidades`)) erro('LEITURA.md', 'total de oportunidades diferente da matriz');
  }
}

const resumo = (o, ordem) => ordem.filter((k) => o[k]).map((k) => `${k} ${o[k]}`).join(', ');

console.log(`matriz.csv: ${linhas.length} oportunidades, ${CABECALHO.length} colunas, ${totalRefs} referências conferidas`);
console.log(`por ação: ${resumo(contagem.acao, ACOES)}`);
console.log(`por prioridade: ${resumo(contagem.prioridade, [...NIVEIS, '@nao-se-aplica'])}`);
console.log(`por confiança: ${resumo(contagem.confianca, NIVEIS)}`);

if (erros.length) {
  console.log(`\n${erros.length} erro(s):`);
  for (const e of erros) console.log(`- ${e}`);
  process.exit(1);
}
console.log('sem erros');
