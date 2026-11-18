// Extrai o texto de cada ficha de produto guardada na pasta de brutos pesados e grava um .txt por ficha na pasta da
// coleta no repositório: endereço, hash do HTML de origem, nome, trilha, preço, preço "de", linha do Pix e o texto da
// aba "Descrição", parágrafo por parágrafo. Avaliações de clientes, tamanhos disponíveis e estoque ficam de fora.
// Uso: node extrair-fichas.cjs <coleta-id>
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PESADOS = 'C:/Users/Bruno/Downloads/Emcasacomcecilia/demanda-brutos-pesados/baw';
const BRUTO = path.join(__dirname, '..', '1-bruto');
const coletaId = process.argv[2];
if (!coletaId) {
  console.error('uso: node extrair-fichas.cjs <coleta-id>');
  process.exit(2);
}
const origem = path.join(PESADOS, coletaId);
const destino = path.join(BRUTO, coletaId);

const entidades = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
const texto = (s) => entidades(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

const pedidos = {};
for (const linha of fs.readFileSync(path.join(destino, 'pedidos.tsv'), 'utf8').split('\n').slice(1).filter(Boolean)) {
  const [momento, url, , , arquivo] = linha.split('\t');
  pedidos[arquivo] = { momento, url };
}

for (const arquivo of fs.readdirSync(origem).filter((f) => f.endsWith('.html')).sort()) {
  const bytes = fs.readFileSync(path.join(origem, arquivo));
  const html = bytes.toString('utf8');
  const sha256 = crypto.createHash('sha256').update(bytes).digest('hex');
  const ld = [...html.matchAll(/<script type="?application\/ld\+json"?>([^]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const produto = ld.find((x) => x['@type'] === 'Product');
  const trilha = ld.find((x) => x['@type'] === 'BreadcrumbList');
  if (!produto) throw new Error(`${arquivo}: sem JSON-LD de Product`);

  const precos = html.match(/<p class="text-base text-black font-black">(R\$ [^<]+)<\/p>(?:<p class="text-base text-black font-normal uppercase line-through">(R\$ [^<]+)<\/p>)?/);
  const pix = html.match(/<p class="text-sm text-black font-black[^"]*">([^<]*PIX[^<]*)<\/p>/);
  const desc = html.match(/<div class=mt-\[13px\] id=description-content>([^]*?)<\/div><\/div><\/div><div class="border-t border-b/);
  const paragrafos = desc
    ? [...desc[1].matchAll(/<p[^>]*>([^]*?)<\/p>/g)].map((m) => texto(m[1].replace(/<br\s*\/?>/g, ' '))).filter(Boolean)
    : [];

  const linhas = [
    `url: ${pedidos[arquivo] ? pedidos[arquivo].url : '@indisponivel'}`,
    `lido_em: ${pedidos[arquivo] ? pedidos[arquivo].momento : '@indisponivel'}`,
    `html_origem: ${arquivo} (sha256 ${sha256})`,
    `nome: ${produto.name}`,
    `sku: ${produto.sku || '@indisponivel'}`,
    `trilha: ${trilha ? trilha.itemListElement.map((i) => i.name).join(' > ') : '@indisponivel'}`,
    `preco: ${precos ? precos[1] : '@indisponivel'}`,
    `preco_de: ${precos && precos[2] ? precos[2] : '@nao-se-aplica'}`,
    `pix: ${pix ? texto(pix[1]) : '@indisponivel'}`,
    `descricao_bloco: ${desc ? 'presente' : 'ausente'}`,
    '',
    '--- Descrição (aba da página, um parágrafo por linha) ---',
    ...(paragrafos.length ? paragrafos : ['[sem parágrafos no bloco]']),
    '',
    '--- description do JSON-LD Product ---',
    produto.description ? produto.description.replace(/\r/g, '').replace(/\n{2,}/g, '\n').trim() : '[vazio]',
    '',
  ];
  fs.writeFileSync(path.join(destino, arquivo.replace(/\.html$/, '.txt')), linhas.join('\n'));
}
