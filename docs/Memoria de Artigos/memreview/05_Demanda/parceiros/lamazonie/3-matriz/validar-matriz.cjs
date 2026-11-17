// Confere a matriz.csv contra o FORMATOS.md (seção 5) e contra os CSVs de 2-processado/.
// Uso: node validar-matriz.cjs   (de qualquer pasta; sai com código 1 se houver erro)

const fs = require('fs');
const path = require('path');

const PARCEIRO = 'lamazonie';
const AQUI = __dirname;
const PROCESSADO = path.join(AQUI, '..', '2-processado');

const CABECALHO = [
  'oportunidade_id', 'parceiros', 'entidades', 'intencao', 'perguntas', 'pais', 'idioma', 'sinais_ref',
  'nossos_dados_ref', 'comercial_ref', 'cobertura_ref', 'lacuna', 'acao', 'prioridade',
  'justificativa_prioridade', 'confianca', 'dependencias', 'estado_revisao', 'notas',
];
const ACOES = [
  'criar-artigo', 'melhorar-capitulo', 'atualizar-fatos', 'melhorar-pagina-cupom', 'links-internos', 'video',
  'consolidar', 'recomendar-retirada', 'manter',
];
const NIVEIS = ['alta', 'media', 'baixa'];
const ESTADOS_REVISAO = ['rascunho', 'em-revisao', 'pronta', 'aprovada', 'recusada'];
const ESTADOS_DE_CAMPO = ['@indisponivel', '@nao-investigado', '@parcial', '@nao-se-aplica'];

// coluna da matriz -> arquivo de origem e prefixo do id
const REFERENCIAS = {
  entidades: ['catalogo.csv', 'cat'],
  sinais_ref: ['sinais.csv', 'sin'],
  nossos_dados_ref: ['nossos-dados.csv', 'nos'],
  comercial_ref: ['comercial.csv', 'com'],
  cobertura_ref: ['cobertura.csv', 'cob'],
};

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
    } else if (c !== '\r') campo += c;
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
for (const [coluna, [arquivo]] of Object.entries(REFERENCIAS)) {
  idsDe[coluna] = new Set(lerCsv(path.join(PROCESSADO, arquivo)).slice(1).map((l) => l[0]));
}

const bruto = fs.readFileSync(path.join(AQUI, 'matriz.csv'));
if (bruto[0] === 0xef && bruto[1] === 0xbb && bruto[2] === 0xbf) erro('arquivo', 'tem BOM');

const [cabecalho, ...linhas] = lerCsv(path.join(AQUI, 'matriz.csv'));
if (cabecalho.join(',') !== CABECALHO.join(',')) erro('cabeçalho', `diferente do FORMATOS.md: ${cabecalho.join(',')}`);
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
  if (!/^op-[a-z0-9-]+-\d{4}$/.test(l.oportunidade_id)) erro(onde, 'id fora do formato op-<parceiro>-NNNN');
  else if (l.oportunidade_id !== esperado) erro(onde, `id fora da sequência (esperado ${esperado})`);
  if (vistos.has(l.oportunidade_id)) erro(onde, 'id repetido');
  vistos.add(l.oportunidade_id);

  if (!l.parceiros.split('|').includes(PARCEIRO)) erro(onde, `parceiros não inclui ${PARCEIRO}`);
  if (!ACOES.includes(l.acao)) erro(onde, `acao inválida: ${l.acao}`);
  if (!NIVEIS.includes(l.prioridade)) erro(onde, `prioridade inválida: ${l.prioridade}`);
  if (!NIVEIS.includes(l.confianca)) erro(onde, `confianca inválida: ${l.confianca}`);
  if (!ESTADOS_REVISAO.includes(l.estado_revisao)) erro(onde, `estado_revisao inválido: ${l.estado_revisao}`);

  for (const [coluna, [arquivo, prefixo]] of Object.entries(REFERENCIAS)) {
    const valor = l[coluna];
    if (ESTADOS_DE_CAMPO.includes(valor)) continue;
    const ids = valor.split('|');
    const repetidos = ids.filter((id, k) => ids.indexOf(id) !== k);
    if (repetidos.length) erro(onde, `${coluna} repete ${[...new Set(repetidos)].join(', ')}`);
    for (const id of ids) {
      totalRefs++;
      if (!id.startsWith(`${prefixo}-`)) erro(onde, `${coluna} tem valor que não é id de ${arquivo}: ${id}`);
      else if (!idsDe[coluna].has(id)) erro(onde, `${coluna} aponta para ${id}, que não existe em ${arquivo}`);
    }
  }

  // outras oportunidades citadas no texto precisam existir
  for (const c of ['lacuna', 'justificativa_prioridade', 'dependencias', 'notas']) {
    for (const m of l[c].matchAll(/op-[a-z0-9-]+?-\d{4}/g)) {
      const n = Number(m[0].slice(-4));
      if (n < 1 || n > linhas.length) erro(onde, `${c} cita ${m[0]}, que não existe na matriz`);
    }
  }

  if (l.acao === 'criar-artigo') {
    if (l.lacuna.length < 80) erro(onde, 'criar-artigo sem a frase de lacuna');
    if (l.dependencias.length < 20) erro(onde, 'criar-artigo sem dependências');
  }

  for (const c of ['acao', 'prioridade', 'confianca']) contagem[c][l[c]] = (contagem[c][l[c]] || 0) + 1;
});

const resumo = (o, ordem) =>
  ordem.filter((k) => o[k]).map((k) => `${k} ${o[k]}`).join(', ');

console.log(`matriz.csv: ${linhas.length} oportunidades, ${CABECALHO.length} colunas, ${totalRefs} referências conferidas`);
console.log(`por ação: ${resumo(contagem.acao, ACOES)}`);
console.log(`por prioridade: ${resumo(contagem.prioridade, NIVEIS)}`);
console.log(`por confiança: ${resumo(contagem.confianca, NIVEIS)}`);

if (erros.length) {
  console.log(`\n${erros.length} erro(s):`);
  for (const e of erros) console.log(`- ${e}`);
  process.exit(1);
}
console.log('sem erros');
