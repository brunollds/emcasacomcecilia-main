// Extrai, de cada página de lista guardada na pasta de brutos pesados, o JSON-LD da página e os cartões de produto,
// e grava um JSON por página na pasta da coleta no repositório (texto extraído, com o hash do HTML de origem).
// Uso: node extrair-listas.cjs <coleta-id>
// Rodar de novo sobre o mesmo HTML dá o mesmo JSON.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PESADOS = 'C:/Users/Bruno/Downloads/Emcasacomcecilia/demanda-brutos-pesados/baw';
const BRUTO = path.join(__dirname, '..', '1-bruto');
const coletaId = process.argv[2];
if (!coletaId) {
  console.error('uso: node extrair-listas.cjs <coleta-id>');
  process.exit(2);
}
const origem = path.join(PESADOS, coletaId);
const destino = path.join(BRUTO, coletaId);

const texto = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x2B;|&#43;/g, '+').replace(/\s+/g, ' ').trim();
const atributo = (tag, nome) => {
  const m = tag.match(new RegExp(`${nome}=("([^"]*)"|([^\\s>]*))`));
  return m ? (m[2] ?? m[3]) : null;
};

for (const arquivo of fs.readdirSync(origem).filter((f) => f.endsWith('.html')).sort()) {
  const html = fs.readFileSync(path.join(origem, arquivo), 'utf8');
  const sha256 = crypto.createHash('sha256').update(fs.readFileSync(path.join(origem, arquivo))).digest('hex');
  const ld = html.match(/<script type=application\/ld\+json>(\{"@context":"https:\/\/schema.org","@type":"ItemList"[^]*?)<\/script>/);
  const titulo = html.match(/<h1 class=category-toolbar__title>([^<]*)<\/h1>/);
  const contagem = html.match(/js-hotsite-total-count>(\d+)</);
  // Lista vazia ("0 PRODUTOS") vem sem o JSON-LD: fica registrada com item_list nulo.
  if (!ld && !(contagem && contagem[1] === '0')) throw new Error(`${arquivo}: sem JSON-LD de ItemList`);
  const itemList = ld ? JSON.parse(ld[1]) : null;

  const cartoes = [];
  const reH2 = /<h2 class="text-left truncate[^>]*>([^<]*)<\/h2>/g;
  const marcas = [...html.matchAll(reH2)];
  marcas.forEach((m, k) => {
    const fim = k + 1 < marcas.length ? marcas[k + 1].index : html.length;
    const antes = html.slice(0, m.index);
    const inicioWrapper = antes.lastIndexOf('data-id=');
    const tagWrapper = html.slice(antes.lastIndexOf('<', inicioWrapper), html.indexOf('>', inicioWrapper) + 1);
    const corpo = html.slice(m.index, fim);
    const link = corpo.match(/<a href=\/?([^ >]+) class=w-full><\/a>/);
    const preco = corpo.match(/<p class="[^"]*font-black"><b>(R\$ [^<]+)<\/b><\/p>/);
    const de = corpo.match(/line-through">(R\$ [^<]+)</);
    const selos = corpo.match(/<div class="stamps d-flex row">([^]*?)<\/div><div class="flex flex-col gap-0">/);
    const off = corpo.match(/<p class="text-xl font-black[^"]*">(\d+%)<span/);
    cartoes.push({
      id: atributo(tagWrapper, 'data-id'),
      href: link ? '/' + link[1] : null,
      nome: texto(m[1]),
      preco: preco ? preco[1] : null,
      preco_de: de ? de[1] : null,
      selo_off: off ? off[1] : null,
      selos: selos ? texto(selos[1]) || null : null,
      cor: atributo(tagWrapper, 'data-cor-att-value'),
      genero: atributo(tagWrapper, 'data-gender-att-value'),
    });
  });

  const saida = {
    arquivo_origem: arquivo,
    sha256_origem: sha256,
    titulo: titulo ? texto(titulo[1]) : null,
    title_pagina: (html.match(/<title>([^<]*)<\/title>/) || [null, null])[1],
    contagem_pagina: contagem ? Number(contagem[1]) : null,
    item_list: itemList,
    cartoes,
  };
  fs.writeFileSync(path.join(destino, arquivo.replace(/\.html$/, '.json')), JSON.stringify(saida, null, 1) + '\n');
  const nLd = itemList ? itemList.itemListElement.length : 0;
  if (nLd !== cartoes.length) console.warn(`${arquivo}: ${nLd} no JSON-LD e ${cartoes.length} cartões`);
}
