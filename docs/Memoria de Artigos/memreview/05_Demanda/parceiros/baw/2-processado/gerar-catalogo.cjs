// Gera o catalogo.csv da BAW a partir do bruto (etapa 2 do Programa de Demanda, FORMATOS v2).
// Uso, de qualquer pasta: node gerar-catalogo.cjs
// Sem dependências. Lê só o que está em 1-bruto/ no repositório. Rodar de novo sobre o mesmo bruto dá o mesmo arquivo.
//
// Automático: produtos do sitemap e das listas, preço e preço "de" dos cartões, cores juntadas, categoria e
// modelagem pela lista em que o produto aparece, composição e medidas pelas fichas lidas.
// Decisão escrita aqui: que lista vira categoria, linha ou fica de fora (LISTAS) e a ordem de prioridade da
// categoria do produto. Lista coletada sem linha em LISTAS faz o script parar.
//
// Id estável: ids-catalogo.csv (id_fonte,entidade_id) só cresce. Entidade já vista mantém o id; nova recebe o próximo.
const fs = require('fs');
const path = require('path');

const PARCEIRO = 'baw';
const SITE = 'https://www.bawclothing.com.br';
const LIDO_EM = '2026-11-18';
const BRUTO = path.join(__dirname, '..', '1-bruto');
const SAIDA = path.join(__dirname, 'catalogo.csv');
const MAPA = path.join(__dirname, 'ids-catalogo.csv');

const COLETA = {
  sitemap: '20261118-1251-wake-robots-sitemap',
  listas: '20261118-1255-wake-categorias',
  fichas: '20261118-1307-wake-fichas',
};

const CABECALHO = [
  'entidade_id', 'tipo', 'parceiro', 'marca', 'categoria', 'linha', 'nome', 'id_fonte', 'url', 'formato', 'qtd_kit',
  'unidade', 'composicao_declarada', 'preco_ref', 'preco_de_ref', 'moeda', 'pais', 'lido_em', 'coleta_id', 'evidencia',
  'notas',
];
const NSA = '@nao-se-aplica';
const INDISP = '@indisponivel';
const NINV = '@nao-investigado';
const MARCA = 'BAW Clothing';

// Listas coletadas. tipo: categoria (do menu, de modelagem ou vitrine da loja), linha (coleção ou collab) ou fora.
// "rotulo" é o nome como o menu ou o título da página escreve; "caminho" é o endereço público.
const LISTAS = {
  vestuario: { tipo: 'categoria', rotulo: 'Vestuário', caminho: '/roupas', papel: 'menu' },
  camisetas: { tipo: 'categoria', rotulo: 'Camisetas', caminho: '/roupas/camisetas', papel: 'menu', pai: 'Vestuário' },
  moletons: { tipo: 'categoria', rotulo: 'Moletons', caminho: '/roupas/moletons', papel: 'menu', pai: 'Vestuário' },
  camisas: { tipo: 'categoria', rotulo: 'Camisas', caminho: '/roupas/camisas', papel: 'menu', pai: 'Vestuário' },
  calcas: { tipo: 'categoria', rotulo: 'Calças', caminho: '/roupas/calcas', papel: 'menu', pai: 'Vestuário' },
  jaquetas: { tipo: 'categoria', rotulo: 'Jaquetas', caminho: '/roupas/jaquetas', papel: 'menu', pai: 'Vestuário' },
  shorts: { tipo: 'categoria', rotulo: 'Shorts', caminho: '/roupas/shorts', papel: 'menu', pai: 'Vestuário' },
  saias: { tipo: 'categoria', rotulo: 'Saias', caminho: '/roupas/saias', papel: 'menu', pai: 'Vestuário' },
  acessorios: { tipo: 'categoria', rotulo: 'Acessórios', caminho: '/acessorios', papel: 'menu' },
  'bolsas-e-pochetes': { tipo: 'categoria', rotulo: 'Bolsas e Acessórios', caminho: '/acessorios/bolsas-e-pochetes', papel: 'menu', pai: 'Acessórios' },
  bones: { tipo: 'categoria', rotulo: 'Bonés', caminho: '/acessorios/bones', papel: 'menu', pai: 'Acessórios' },
  meias: { tipo: 'categoria', rotulo: 'Meias', caminho: '/acessorios/meias', papel: 'menu', pai: 'Acessórios' },
  gorros: { tipo: 'fora', motivo: 'no sitemap, fora do menu, 0 produtos na lista' },
  kids: { tipo: 'categoria', rotulo: 'Kids', caminho: '/kids', papel: 'menu' },
  calcados: { tipo: 'categoria', rotulo: 'Calçados', caminho: '/calcados', papel: 'menu' },
  tenis: { tipo: 'categoria', rotulo: 'Tênis', caminho: '/calcados/tenis', papel: 'menu', pai: 'Calçados' },
  slide: { tipo: 'categoria', rotulo: 'Slide', caminho: '/calcados/slide', papel: 'menu', pai: 'Calçados' },
  'cam-baby-tee': { tipo: 'categoria', rotulo: 'Baby Tee', caminho: '/roupas/camisetas/baby-tee', papel: 'modelagem', pai: 'Camisetas' },
  'cam-boxy': { tipo: 'categoria', rotulo: 'Boxy', caminho: '/roupas/camisetas/boxy', papel: 'modelagem', pai: 'Camisetas' },
  'cam-camisa': { tipo: 'categoria', rotulo: 'Camisa', caminho: '/roupas/camisetas/camisa', papel: 'modelagem', pai: 'Camisetas' },
  'cam-cropped': { tipo: 'fora', motivo: 'subcategoria de camisetas no sitemap, 0 produtos na lista' },
  'cam-manga-longa': { tipo: 'categoria', rotulo: 'Manga Longa', caminho: '/roupas/camisetas/manga-longa', papel: 'modelagem', pai: 'Camisetas' },
  'cam-maxi-over': { tipo: 'fora', motivo: 'subcategoria de camisetas no sitemap, 0 produtos na lista' },
  'cam-new-over': { tipo: 'categoria', rotulo: 'New Over', caminho: '/roupas/camisetas/new-over', papel: 'modelagem', pai: 'Camisetas' },
  'cam-oversized': { tipo: 'categoria', rotulo: 'Oversized', caminho: '/roupas/camisetas/oversized', papel: 'modelagem', pai: 'Camisetas' },
  'cam-polo': { tipo: 'categoria', rotulo: 'Polo', caminho: '/roupas/camisetas/polo', papel: 'modelagem', pai: 'Camisetas' },
  'cam-regata': { tipo: 'categoria', rotulo: 'Regata', caminho: '/roupas/camisetas/regata', papel: 'modelagem', pai: 'Camisetas' },
  'cam-regular': { tipo: 'categoria', rotulo: 'Regular', caminho: '/roupas/camisetas/regular', papel: 'modelagem', pai: 'Camisetas' },
  'cam-slim': { tipo: 'categoria', rotulo: 'Slim', caminho: '/roupas/camisetas/slim', papel: 'modelagem', pai: 'Camisetas' },
  'cam-tops': { tipo: 'categoria', rotulo: 'Tops', caminho: '/roupas/camisetas/tops', papel: 'modelagem', pai: 'Camisetas' },
  // Vitrines da loja: o menu "News", promoções e a campanha de Black Friday.
  lancamentos: { tipo: 'categoria', rotulo: 'Lançamentos', caminho: '/lancamentos', papel: 'vitrine' },
  new_in: { tipo: 'categoria', rotulo: 'New In', caminho: '/new_in', papel: 'vitrine' },
  collabs2026: { tipo: 'categoria', rotulo: 'Collabs 2026', caminho: '/collabs2026', papel: 'vitrine' },
  sale: { tipo: 'categoria', rotulo: 'SALE', caminho: '/sale', papel: 'vitrine' },
  outlet: { tipo: 'categoria', rotulo: 'Outlet', caminho: '/outlet', papel: 'vitrine' },
  mais_vendidos: { tipo: 'categoria', rotulo: 'Mais vendidos', caminho: '/mais_vendidos', papel: 'ordenacao' }, // quase todo o catálogo: fica fora das notas de cada produto,
  combos: { tipo: 'categoria', rotulo: 'Combos', caminho: '/combos', papel: 'vitrine' },
  'combo-moletom': { tipo: 'categoria', rotulo: 'Combo moletom', caminho: '/combo-moletom', papel: 'vitrine' },
  'combo-oversized': { tipo: 'categoria', rotulo: 'Combo oversized', caminho: '/combo-oversized', papel: 'vitrine' },
  'combo-regular': { tipo: 'categoria', rotulo: 'Combo regular', caminho: '/combo-regular', papel: 'vitrine' },
  'kit-moletons': { tipo: 'categoria', rotulo: 'Kit moletons', caminho: '/kit-moletons', papel: 'vitrine' },
  'kit-camiseta-regular': { tipo: 'categoria', rotulo: 'Kit camiseta regular', caminho: '/colecao/kit-camiseta-regular', papel: 'vitrine' },
  'todos-os-produtos': { tipo: 'fora', motivo: 'vitrine técnica ("Hotsite dinâmico para o Portfolio 1036"), usada só para conferir a cobertura' },
  blackfriday: { tipo: 'categoria', rotulo: 'A ÚLTIMA BLACK FRIDAY DA BAW', caminho: '/blackfriday', papel: 'vitrine-campanha' },
  'black-friday': { tipo: 'categoria', rotulo: 'Black Friday Baw Clothing', caminho: '/black-friday', papel: 'vitrine-campanha' },
  'bf-40off': { tipo: 'categoria', rotulo: 'Black Friday 40% OFF', caminho: '/black-friday/40off', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-50off': { tipo: 'categoria', rotulo: 'Black Friday 50% OFF', caminho: '/black-friday/50off', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-acessorios': { tipo: 'categoria', rotulo: 'Acessórios - Black Friday', caminho: '/black-friday/acessorios', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-calcados': { tipo: 'categoria', rotulo: 'Calçados - Black Friday', caminho: '/black-friday/calcados', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-calcas': { tipo: 'categoria', rotulo: 'Calças - Black Friday', caminho: '/black-friday/calcas', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-calcas119': { tipo: 'categoria', rotulo: 'Black Friday Calças', caminho: '/black-friday/calcas119', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-camisas': { tipo: 'categoria', rotulo: 'Camisas - Black Friday', caminho: '/black-friday/camisas', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-camisetas': { tipo: 'categoria', rotulo: 'Camisetas - Black Friday', caminho: '/black-friday/camisetas', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-camisetas39': { tipo: 'categoria', rotulo: 'Camisetas a partir de 39', caminho: '/black-friday/camisetas39', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-drops69': { tipo: 'categoria', rotulo: 'Black Friday Drops', caminho: '/black-friday/drops69', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-jaquetas': { tipo: 'categoria', rotulo: 'Jaquetas - Black Friday', caminho: '/black-friday/jaquetas', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-kids': { tipo: 'categoria', rotulo: 'Kids - Black Friday', caminho: '/black-friday/kids', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-moletons': { tipo: 'categoria', rotulo: 'Moletons - Black Friday', caminho: '/black-friday/moletons', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-moletons149': { tipo: 'categoria', rotulo: 'Black Friday Moletons', caminho: '/black-friday/moletons149', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-oversized59': { tipo: 'categoria', rotulo: 'Black Friday Oversized', caminho: '/black-friday/oversized59', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-regatas': { tipo: 'categoria', rotulo: 'Regatas - Black Friday', caminho: '/black-friday/regatas', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-saias': { tipo: 'categoria', rotulo: 'Saias - Black Friday', caminho: '/black-friday/saias', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-shorts': { tipo: 'categoria', rotulo: 'Shorts - Black Friday', caminho: '/black-friday/shorts', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-shorts89': { tipo: 'categoria', rotulo: 'Black Friday Shorts', caminho: '/black-friday/shorts89', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  'bf-vestidos': { tipo: 'categoria', rotulo: 'Vestidos - Black Friday', caminho: '/black-friday/vestidos', papel: 'vitrine-campanha', pai: 'Black Friday Baw Clothing' },
  // Coleções e collabs (menu "News" e páginas do sitemap com nome de licença ou parceria).
  bawechevrolet: { tipo: 'linha', rotulo: 'BAW + CHEVROLET', caminho: '/bawechevrolet', papel: 'colecao' },
  baw_basics: { tipo: 'linha', rotulo: 'Baw Basics', caminho: '/baw_basics', papel: 'colecao' },
  chillibaw: { tipo: 'linha', rotulo: 'ChilliBaw', caminho: '/chillibaw', papel: 'colecao' },
  athletics: { tipo: 'linha', rotulo: 'BAW Athletics', caminho: '/athletics', papel: 'colecao' },
  bob_marley: { tipo: 'linha', rotulo: 'Bob Marley', caminho: '/bob_marley', papel: 'colecao' },
  trs: { tipo: 'linha', rotulo: 'TRS', caminho: '/trs', papel: 'colecao' },
  classics: { tipo: 'linha', rotulo: 'Baw Classics', caminho: '/classics', papel: 'colecao' },
  disney: { tipo: 'linha', rotulo: 'Coleção Disney', caminho: '/disney', papel: 'colecao' },
  harry_potter: { tipo: 'linha', rotulo: 'Harry Potter', caminho: '/harry_potter', papel: 'colecao' },
  hello_kitty: { tipo: 'linha', rotulo: 'Hello Kitty', caminho: '/hello_kitty', papel: 'colecao' },
  nfl: { tipo: 'linha', rotulo: 'Coleção NFL e Mitchell & Ness', caminho: '/nfl', papel: 'colecao' },
  'pica-pau': { tipo: 'linha', rotulo: 'Drop Baw e Pica Pau', caminho: '/pica-pau', papel: 'colecao' },
  'scooby-doo': { tipo: 'linha', rotulo: 'Collab Scooby-Doo e Baw', caminho: '/scooby-doo', papel: 'colecao' },
  smiley: { tipo: 'linha', rotulo: 'Baw e The Smiley Company', caminho: '/smiley', papel: 'colecao' },
  linus: { tipo: 'linha', rotulo: 'Baw & Linus', caminho: '/linus', papel: 'colecao' },
  desgosto: { tipo: 'linha', rotulo: 'Desgosto', caminho: '/desgosto', papel: 'colecao' },
};

// Ordem em que a categoria do produto é escolhida, da mais específica para a mais geral.
const PRIORIDADE_CATEGORIA = [
  'kids', 'camisetas', 'moletons', 'camisas', 'calcas', 'jaquetas', 'shorts', 'saias', 'bolsas-e-pochetes', 'bones',
  'meias', 'tenis', 'slide', 'vestuario', 'acessorios', 'calcados',
];

function erro(msg) {
  console.error('ERRO: ' + msg);
  process.exit(1);
}

const caminhoBruto = (coleta, arquivo) => path.join(BRUTO, coleta, arquivo);
const ler = (coleta, arquivo) => {
  const p = caminhoBruto(coleta, arquivo);
  if (!fs.existsSync(p)) erro(`arquivo do bruto não existe: ${coleta}/${arquivo}`);
  return fs.readFileSync(p, 'utf8');
};
const csv = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const valor = (s) => Number(s.replace(/[R$\s.]/g, '').replace(',', '.'));
const dinheiro = (n) => n.toFixed(2);
const baseDe = (slug) => decodeURIComponent(slug).replace(/^\/?(produto\/)?/, '').replace(/-\d+$/, '');

// Sitemap: o universo de produtos publicado pela loja.
const sitemap = ler(COLETA.sitemap, 'sitemap.xml');
const slugSitemap = new Map();
for (const m of sitemap.matchAll(/<loc>https:\/\/www\.bawclothing\.com\.br\/produto\/([^<]+)<\/loc>/g)) {
  const id = m[1].match(/-(\d+)$/);
  if (!id) erro(`produto do sitemap sem número: ${m[1]}`);
  slugSitemap.set(id[1], m[1]);
}

// Listas: cada JSON extraído de uma página de categoria, coleção ou vitrine.
const arquivosListas = fs.readdirSync(path.join(BRUTO, COLETA.listas)).filter((f) => /-p\d+\.json$/.test(f)).sort();
const listas = {};
for (const arquivo of arquivosListas) {
  const nome = arquivo.replace(/-p\d+\.json$/, '');
  if (!LISTAS[nome]) erro(`lista coletada sem decisão em LISTAS: ${nome}`);
  const j = JSON.parse(ler(COLETA.listas, arquivo));
  const l = (listas[nome] = listas[nome] || { arquivos: [], contagem: j.contagem_pagina, cartoes: [] });
  l.arquivos.push(arquivo);
  for (const c of j.cartoes) {
    if (!c.id || !c.href || !c.nome || !c.preco) erro(`${arquivo}: cartão incompleto ${JSON.stringify(c)}`);
    l.cartoes.push({ ...c, arquivo });
  }
}
for (const nome of Object.keys(LISTAS)) if (!listas[nome]) erro(`lista em LISTAS sem coleta: ${nome}`);

// Fichas lidas: composição e presença de medidas, por produto (nome sem a cor).
const fichas = {};
if (fs.existsSync(path.join(BRUTO, COLETA.fichas))) {
  for (const arquivo of fs.readdirSync(path.join(BRUTO, COLETA.fichas)).filter((f) => /^ficha-.*\.txt$/.test(f)).sort()) {
    const t = ler(COLETA.fichas, arquivo);
    const desc = t.split('--- Descrição (aba da página, um parágrafo por linha) ---\n')[1].split('\n\n--- description do JSON-LD')[0];
    const linhas = desc.split('\n').filter(Boolean);
    const vazia = linhas.length === 0 || desc.includes('[sem parágrafos no bloco]') || /n[ãa]o h[áa] descri[çc][ãa]o/i.test(desc);
    const medidas = linhas.filter((l) => /\d+\s*cm|\bcm\b/i.test(l));
    // Composição: a linha "Composição: ..." quando existe; senão, os trechos com porcentagem de fibra; senão, o
    // material citado (PVC, poliamida...). Sempre um trecho literal da ficha, para a evidência conferir.
    const linhaComp = linhas.find((l) => /^composi[çc][ãa]o/i.test(l));
    const fibra = /\d+\s*%\s*(de\s+)?(algod[ãa]o|poli[ée]ster|elastano|viscose|linho|nylon|poliamida|acr[íi]lico|l[ãa]|couro)/gi;
    const porcentagens = [...new Set(linhas.flatMap((l) => l.match(fibra) || []))];
    const materialRe = /\b(PVC(?: microexpandido)?|EVA|borracha|couro sint[ée]tico|couro|lona|camur[çc]a|poliamida ripstop|poliamida|nylon|sarja|jeans|moletom flanelado|tricot|tric[ôo])\b/i;
    const linhaMaterial = linhas.find((l) => materialRe.test(l));
    const composicao = linhaComp
      ? linhaComp
      : porcentagens.length
        ? porcentagens.join('; ')
        : linhaMaterial
          ? linhaMaterial.match(materialRe)[0]
          : null;
    fichas[arquivo.replace(/^ficha-/, '').replace(/\.txt$/, '')] = {
      arquivo,
      vazia,
      comMedidas: medidas.length > 0,
      composicao,
      composicaoLiteral: linhaComp || (porcentagens[0] ?? (linhaMaterial ? linhaMaterial.match(materialRe)[0] : null)),
      composicaoTipo: linhaComp ? 'linha' : porcentagens.length ? 'porcentagem' : linhaMaterial ? 'material' : null,
      precoLinha: (t.match(/^preco: (.*)$/m) || [])[1],
    };
  }
}

// Agrupa as páginas de cor em produtos.
const grupos = new Map();
const grupo = (base) => {
  if (!grupos.has(base)) grupos.set(base, { base, ids: new Set(), cartoes: [], listas: new Set() });
  return grupos.get(base);
};
for (const [id, slug] of slugSitemap) grupo(baseDe(slug)).ids.add(id);
const baseDoId = new Map([...slugSitemap].map(([id, slug]) => [id, baseDe(slug)]));
for (const [nome, l] of Object.entries(listas)) {
  if (LISTAS[nome].tipo === 'fora') continue;
  for (const c of l.cartoes) {
    const b = baseDoId.get(c.id) || baseDe(c.href);
    const g = grupo(b);
    g.ids.add(c.id);
    g.cartoes.push({ ...c, lista: nome });
    g.listas.add(nome);
  }
}

const rotuloCategoria = (nome) => {
  const d = LISTAS[nome];
  return d.pai ? `${d.pai} > ${d.rotulo}` : d.rotulo;
};

for (const b of Object.keys(fichas)) if (!grupos.has(b)) erro(`ficha sem produto no sitemap nem nas listas: ${b}`);

// Monta as entidades.
const entidades = [];

entidades.push({
  tipo: 'marca', marca: MARCA, categoria: NSA, linha: NSA, nome: MARCA, id_fonte: 'baw', url: SITE, formato: NSA,
  qtd_kit: NSA, unidade: NSA, composicao_declarada: NSA, preco_ref: NSA, preco_de_ref: NSA, moeda: NSA, pais: 'BR',
  ev: [[COLETA.sitemap, 'sitemap.xml#"https://www.bawclothing.com.br/fabricante/baw"']],
  notas: 'Marca própria da loja; o sitemap traz a página de fabricante /fabricante/baw e as fichas declaram a marca "Baw" no JSON-LD',
});

for (const [nome, d] of Object.entries(LISTAS)) {
  if (d.tipo === 'fora') continue;
  const l = listas[nome];
  const bases = new Set(l.cartoes.map((c) => baseDoId.get(c.id) || baseDe(c.href)));
  const notas = [`Lista da loja (${d.papel}): ${l.contagem} na contagem da página, ${l.cartoes.length} cartões lidos, ${bases.size} produtos sem contar as cores`];
  if (l.cartoes.length !== l.contagem) notas.push('os cartões lidos não batem com a contagem da página');
  if (l.contagem === 0) notas.push('lista vazia na coleta');
  const lidas = Object.entries(fichas).filter(([b]) => bases.has(b));
  if (lidas.length && d.papel === 'menu') {
    notas.push(
      `fichas lidas desta lista: ${lidas.length}; com medidas: ${lidas.filter(([, f]) => f.comMedidas).length}; com composição ou material: ${lidas.filter(([, f]) => f.composicao).length}; sem descrição: ${lidas.filter(([, f]) => f.vazia).length}`
    );
  }
  entidades.push({
    tipo: d.tipo, marca: MARCA, categoria: d.tipo === 'categoria' ? (d.pai || NSA) : NSA,
    linha: d.tipo === 'linha' ? d.rotulo : NSA, nome: d.rotulo, id_fonte: d.caminho, url: SITE + d.caminho, formato: NSA,
    qtd_kit: NSA, unidade: NSA, composicao_declarada: NSA, preco_ref: NSA, preco_de_ref: NSA, moeda: NSA, pais: 'BR',
    ev: [[COLETA.listas, `${l.arquivos[0]}#contagem_pagina=${l.contagem}`]],
    notas: notas.join('; '),
  });
}

const produtos = [];
for (const g of grupos.values()) {
  const notas = [];
  const ev = [];
  let preco = INDISP;
  let precoDe = INDISP;
  let nome;
  let url;
  const idsOrdenados = [...g.ids].sort((a, b) => Number(a) - Number(b));
  if (g.cartoes.length) {
    const porId = new Map();
    for (const c of g.cartoes) if (!porId.has(c.id)) porId.set(c.id, c);
    const unicos = [...porId.values()].sort((a, b) => valor(a.preco) - valor(b.preco) || Number(a.id) - Number(b.id));
    const escolhido = unicos[0];
    nome = escolhido.nome;
    url = SITE + '/produto/' + (slugSitemap.get(escolhido.id) || escolhido.href.replace(/^\//, ''));
    preco = dinheiro(valor(escolhido.preco));
    precoDe = escolhido.preco_de ? dinheiro(valor(escolhido.preco_de)) : NSA;
    ev.push([COLETA.listas, `${escolhido.arquivo}#id=${escolhido.id}`]);
    const precos = unicos.map((c) => valor(c.preco));
    if (Math.max(...precos) !== Math.min(...precos)) notas.push(`preço varia por cor: de ${dinheiro(Math.min(...precos))} a ${dinheiro(Math.max(...precos))}; preco_ref é o menor`);
    if (porId.size > 1) notas.push(`${porId.size} páginas de cor juntadas (${unicos.map((c) => `${c.id} ${c.cor || '?'}`).join(', ')})`);
    else notas.push(`cor: ${escolhido.cor || '@indisponivel'}`);
    const nomes = new Set(unicos.map((c) => c.nome));
    if (nomes.size > 1) notas.push(`nomes diferentes nas cores: ${[...nomes].join(' / ')}`);
  } else {
    const id = idsOrdenados[0];
    nome = g.base.replace(/-/g, ' ').toUpperCase();
    url = SITE + '/produto/' + slugSitemap.get(id);
    notas.push(`só no sitemap: fora de todas as listas coletadas, sem preço lido; nome tirado do endereço; ids ${idsOrdenados.join(', ')}`);
  }
  const semSitemap = idsOrdenados.filter((id) => !slugSitemap.has(id));
  const noSitemap = idsOrdenados.filter((id) => slugSitemap.has(id));
  if (noSitemap.length) ev.push([COLETA.sitemap, `sitemap.xml#"/produto/${slugSitemap.get(noSitemap[0])}"`]);
  if (semSitemap.length) notas.push(`fora do sitemap: ${semSitemap.join(', ')}`);

  const cats = PRIORIDADE_CATEGORIA.filter((n) => g.listas.has(n));
  const categoria = cats.length ? rotuloCategoria(cats[0]) : INDISP;
  if (!cats.length) notas.push(g.cartoes.length ? 'fora das listas de categoria do menu; só em vitrine ou coleção' : 'categoria não lida');
  const modelagens = Object.entries(LISTAS).filter(([n, d]) => d.papel === 'modelagem' && g.listas.has(n)).map(([, d]) => d.rotulo);
  const ehCamiseta = cats[0] === 'camisetas';
  const formato = modelagens.length ? modelagens.join('|') : ehCamiseta ? INDISP : NSA;
  if (ehCamiseta && !modelagens.length) notas.push('camiseta fora das subcategorias de modelagem da loja');
  const linhas = Object.entries(LISTAS).filter(([n, d]) => d.tipo === 'linha' && g.listas.has(n)).map(([, d]) => d.rotulo);
  const vitrines = Object.entries(LISTAS).filter(([n, d]) => d.papel && d.papel.startsWith('vitrine') && g.listas.has(n)).map(([, d]) => d.rotulo);
  if (vitrines.length) notas.push(`vitrines: ${vitrines.join(', ')}`);

  let composicao = NINV;
  const ficha = fichas[g.base];
  if (ficha) {
    if (ficha.composicao) {
      composicao = ficha.composicao;
      ev.push([COLETA.fichas, `${ficha.arquivo}#"${ficha.composicaoLiteral}"`]);
      if (ficha.composicaoTipo !== 'linha') notas.push(`composição tirada do texto da descrição (${ficha.composicaoTipo}), sem linha "Composição"`);
    } else {
      composicao = INDISP;
      ev.push([COLETA.fichas, ficha.arquivo]);
    }
    notas.push(`ficha lida: ${ficha.vazia ? 'sem descrição' : ficha.comMedidas ? 'com medidas' : 'com descrição, sem medidas'}${ficha.precoLinha ? `; preço na ficha ${ficha.precoLinha}` : ''}`);
  }

  produtos.push({
    tipo: 'produto', marca: MARCA, categoria, linha: linhas.length ? linhas.join('|') : NSA, nome, id_fonte: g.base, url,
    formato, qtd_kit: '1', unidade: NSA, composicao_declarada: composicao, preco_ref: preco, preco_de_ref: precoDe,
    moeda: preco === INDISP ? INDISP : 'BRL', pais: 'BR', ev, notas: notas.join('; '),
    ordem: [cats.length ? PRIORIDADE_CATEGORIA.indexOf(cats[0]) : 99, g.base],
  });
}
produtos.sort((a, b) => a.ordem[0] - b.ordem[0] || (a.ordem[1] < b.ordem[1] ? -1 : a.ordem[1] > b.ordem[1] ? 1 : 0));
entidades.push(...produtos);

// Ids estáveis.
const mapa = new Map();
let maior = 0;
if (fs.existsSync(MAPA)) {
  const linhasMapa = fs.readFileSync(MAPA, 'utf8').split('\n').filter(Boolean);
  if (linhasMapa[0] !== 'id_fonte,entidade_id') erro('cabeçalho do ids-catalogo.csv mudou');
  for (const l of linhasMapa.slice(1)) {
    const i = l.lastIndexOf(',');
    const idFonte = l.slice(0, i).replace(/^"|"$/g, '').replace(/""/g, '"');
    const ent = l.slice(i + 1);
    if (mapa.has(idFonte)) erro(`id_fonte repetido no mapa: ${idFonte}`);
    mapa.set(idFonte, ent);
    maior = Math.max(maior, Number(ent.split('-').pop()));
  }
}
const novos = [];
for (const e of entidades) {
  if (!mapa.has(e.id_fonte)) {
    maior += 1;
    const ent = `cat-${PARCEIRO}-${String(maior).padStart(4, '0')}`;
    mapa.set(e.id_fonte, ent);
    novos.push([e.id_fonte, ent]);
  }
  e.entidade_id = mapa.get(e.id_fonte);
}

// Conferências: id repetido, célula vazia, evidência que não existe no bruto.
const vistos = new Set();
for (const e of entidades) {
  if (vistos.has(e.entidade_id)) erro(`entidade repetida: ${e.entidade_id}`);
  vistos.add(e.entidade_id);
  for (const [coleta, ev] of e.ev) {
    const [arquivo, loc] = ev.split(/#(.*)/s);
    const conteudo = ler(coleta, arquivo);
    if (!loc) continue;
    let ok;
    if (loc.startsWith('id=')) ok = JSON.parse(conteudo).cartoes.some((c) => c.id === loc.slice(3));
    else if (loc.startsWith('contagem_pagina=')) ok = JSON.parse(conteudo).contagem_pagina === Number(loc.slice(16));
    else if (loc.startsWith('"')) ok = conteudo.includes(loc.slice(1, -1));
    else erro(`localizador desconhecido: ${ev}`);
    if (!ok) erro(`evidência não encontrada: ${coleta}/${ev}`);
  }
  e.coleta_id = e.ev.map((x) => x[0]).join('|');
  e.evidencia = e.ev.map((x) => x[1]).join('|');
  e.parceiro = PARCEIRO;
  e.lido_em = LIDO_EM;
  for (const c of CABECALHO) if (e[c] === undefined || e[c] === null || String(e[c]).trim() === '') erro(`célula vazia: ${e.entidade_id} ${c}`);
}

entidades.sort((a, b) => (a.entidade_id < b.entidade_id ? -1 : 1));
const saida = [CABECALHO.join(','), ...entidades.map((e) => CABECALHO.map((c) => csv(String(e[c]))).join(','))].join('\n') + '\n';
fs.writeFileSync(SAIDA, saida);
if (novos.length || !fs.existsSync(MAPA)) {
  const atual = fs.existsSync(MAPA) ? fs.readFileSync(MAPA, 'utf8') : 'id_fonte,entidade_id\n';
  fs.writeFileSync(MAPA, atual + novos.map(([f, e]) => `${csv(f)},${e}`).join('\n') + (novos.length ? '\n' : ''));
}
const porTipo = {};
for (const e of entidades) porTipo[e.tipo] = (porTipo[e.tipo] || 0) + 1;
console.log(`${entidades.length} entidades`, porTipo, `${novos.length} ids novos`);
