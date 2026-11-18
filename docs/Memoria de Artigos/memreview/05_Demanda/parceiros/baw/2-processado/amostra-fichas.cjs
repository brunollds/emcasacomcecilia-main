// Escolhe a amostra dirigida de fichas (pergunta P2 da orientação: há medida suficiente, por categoria, para um guia
// de tamanhos?) a partir das listas de categoria guardadas, e escreve o arquivo de pedidos do coletor.
// Uso: node amostra-fichas.cjs <coleta-das-listas> <saida.tsv>
//
// Regra: produto é o nome sem a cor (o endereço sem o número final). Em cada categoria, até 10 produtos espaçados por
// igual ao longo da lista, na ordem da loja, para a amostra pegar do mais novo ao mais antigo. Nas camisetas, a
// amostra sai das subcategorias de modelagem, porque P2 pergunta por regular e oversized. Entram também as peças que
// a pesquisa semente leu na vitrine da Black Friday em 16/11 (seção 9.6), para a releitura ter bruto.
const fs = require('fs');
const path = require('path');

const [coletaListas, saida] = process.argv.slice(2);
const pasta = path.join(__dirname, '..', '1-bruto', coletaListas);

const COTAS = [
  ['cam-regular', 4],
  ['cam-oversized', 4],
  ['cam-new-over', 1],
  ['cam-boxy', 1],
  ['moletons', 10],
  ['camisas', 10],
  ['calcas', 10],
  ['jaquetas', 10],
  ['shorts', 10],
  ['saias', 10],
  ['kids', 10],
  ['tenis', 10],
  ['slide', 10],
];

// Peças da seção 9.6 da semente (02_Artigos/baw-fatos-1611.md), pelo começo do endereço.
const SEMENTE = [
  'camiseta-regular-goth-3-0',
  'camiseta-br-regular-locally-grown',
  'camiseta-regular-selfie-logo',
  'camiseta-oversized-baw-subscript',
  'moletom-basic-label',
  'moletom-hoodie-baw-subscript',
  'calca-track-baw-tag',
  'bermuda-jeans-regular-logo',
  'shorts-reverse-kids',
  'camiseta-br-kids-classic-colors',
  'camiseta-br-kids-dices',
  'tenis-baw-thunder',
  'sandalia-linus',
  'tenis-grip-mad',
  'tenis-baw-baseline',
  'tenis-baw-audacity',
  'tenis-session-revival',
  'tenis-truck',
  'slide-baw',
  'sandal-summer-party',
];

const base = (href) => href.replace(/^\//, '').replace(/-\d+$/, '');
const lista = (nome) => {
  const arquivos = fs.readdirSync(pasta).filter((f) => f.startsWith(nome + '-p') && f.endsWith('.json'));
  arquivos.sort((a, b) => Number(a.match(/-p(\d+)\.json$/)[1]) - Number(b.match(/-p(\d+)\.json$/)[1]));
  const vistos = new Map();
  for (const f of arquivos) {
    for (const c of JSON.parse(fs.readFileSync(path.join(pasta, f), 'utf8')).cartoes) {
      if (!vistos.has(base(c.href))) vistos.set(base(c.href), c.href);
    }
  }
  return [...vistos.entries()];
};

const escolhidos = new Map();
for (const [nome, cota] of COTAS) {
  const itens = lista(nome);
  const n = Math.min(cota, itens.length);
  for (let i = 0; i < n; i++) {
    const [b, href] = itens[Math.floor((i * itens.length) / n)];
    if (!escolhidos.has(b)) escolhidos.set(b, { href, motivo: nome });
  }
}
const todos = new Map();
for (const f of fs.readdirSync(pasta).filter((f) => f.endsWith('.json'))) {
  for (const c of JSON.parse(fs.readFileSync(path.join(pasta, f), 'utf8')).cartoes) {
    if (!todos.has(base(c.href))) todos.set(base(c.href), c.href);
  }
}
for (const prefixo of SEMENTE) {
  let achados = [...todos.entries()].filter(([b]) => b === prefixo);
  if (!achados.length) achados = [...todos.entries()].filter(([b]) => b.startsWith(prefixo + '-'));
  if (!achados.length) console.warn(`semente sem produto nas listas: ${prefixo}`);
  if (achados.length > 1) console.warn(`semente com ${achados.length} produtos: ${prefixo}`);
  for (const [b, href] of achados) if (!escolhidos.has(b)) escolhidos.set(b, { href, motivo: 'semente-9.6' });
}

const linhas = [...escolhidos.entries()].map(([b, { href }]) => `${b}\t/produto${href}`);
fs.writeFileSync(saida, linhas.join('\n') + '\n');
const porMotivo = {};
for (const { motivo } of escolhidos.values()) porMotivo[motivo] = (porMotivo[motivo] || 0) + 1;
console.log(escolhidos.size, 'fichas', porMotivo);
