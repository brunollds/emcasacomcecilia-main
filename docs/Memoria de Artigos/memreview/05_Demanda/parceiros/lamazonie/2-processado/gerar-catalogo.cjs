// Gera o catalogo.csv da L'Amazonie a partir do bruto (etapa 2 do Programa de Demanda).
// Uso, de qualquer pasta: node gerar-catalogo.cjs
// Sem dependências. Rodar de novo sobre o mesmo bruto dá o mesmo arquivo, byte a byte.
//
// O que é automático: leitura do feed, das coleções, do sitemap e do menu; preço, endereço, categorias e ids.
// O que é decisão escrita aqui (tabelas abaixo): quais coleções entram, a que linha cada página pertence,
// quais páginas são a mesma oferta e o que a loja declara de ativos e tamanho. Página ou coleção nova no feed
// sem linha nas tabelas faz o script parar, para a decisão ser tomada por escrito.
const fs = require('fs');
const path = require('path');

const PARCEIRO = 'lamazonie';
const SITE = 'https://www.lamazonie.com.br';
const LIDO_EM = '2026-11-17';
const BRUTO = path.join(__dirname, '..', '1-bruto');
const SAIDA = path.join(__dirname, 'catalogo.csv');

const COLETA = {
  feed: '20261117-0958-shopify-feed',
  sitemaps: '20261117-1006-shopify-sitemaps',
  colecoes: '20261117-1006-shopify-colecoes',
  paginas: '20261117-1007-shopify-paginas',
  fichasCurl: '20261117-1010-shopify-fichas',
  fichasNavegador: '20261117-1012-navegador-fichas',
};

const CABECALHO = [
  'entidade_id', 'tipo', 'parceiro', 'marca', 'categoria', 'linha', 'nome', 'id_fonte', 'url', 'formato', 'qtd_kit',
  'unidade', 'composicao_declarada', 'preco_ref', 'moeda', 'pais', 'lido_em', 'coleta_id', 'evidencia', 'notas',
];

const NAO_SE_APLICA = '@nao-se-aplica';
const INDISPONIVEL = '@indisponivel';

// Coleções da loja: as que viram entidade "categoria" e as que ficam de fora, com o motivo.
const COLECOES = {
  'anti-idade': { entra: true },
  'best-sellers': { entra: true },
  'clareamento-da-pele': { entra: true },
  'clareamento-das-axilas': { entra: true },
  'crescimento-de-cilios-e-sobrancelhas': { entra: true },
  'limpeza-facial': { entra: true },
  'oferta-black-friday': { entra: true },
  'produtos-kits': { entra: true },
  'protecao-solar': { entra: true },
  sticks: { entra: true },
  'colecao-a': { entra: false, motivo: 'nome técnico, sem produto na resposta' },
  'os-queridinhos-da-rebeca-souza': { entra: false, motivo: 'vitrine de uma criadora, sem produto na resposta' },
  'produtos-todos': { entra: false, motivo: 'vitrine geral' },
  todos: { entra: false, motivo: 'vitrine geral' },
  frontpage: { entra: false, motivo: 'vitrine da página inicial' },
  'protetor-solar-de-tratamento': { entra: false, motivo: 'vazia' },
  'serum-amazon-miracle': { entra: false, motivo: 'vazia' },
};

// Linhas: o que a loja declara de ativos e de tamanho, com o trecho que sustenta cada coisa.
// "trechos" são conferidos contra o bruto antes de escrever o CSV.
const LINHAS = [
  {
    chave: 'sobrancelhas',
    nome: 'Sérum para crescimento de Cílios e Sobrancelhas',
    base: 'serum-fortalecedor-de-sobrancelhas',
    composicao: 'Tecnologia Nano 5D: Drone; Peptídeos; Fatores de crescimento',
    trechos: [
      [COLETA.fichasNavegador, 'ficha-serum-fortalecedor-de-sobrancelhas.txt', 'Tecnologia Nano 5D'],
      [COLETA.fichasNavegador, 'ficha-serum-fortalecedor-de-sobrancelhas.txt', 'Drone, Peptídeos e Fatores de Crescimento'],
    ],
  },
  {
    chave: 'vitamina-c20',
    nome: 'Sérum Clareador Vitamina C20',
    base: 'serum-facial-antioxidante-c20',
    composicao: 'Vitamina C Pura (20%); Pantenol (5%); Niacinamida (1%); Vitamina E; Ácido Ferúlico',
    trechos: [
      [COLETA.fichasNavegador, 'ficha-serum-facial-antioxidante-c20.txt', '5% de Pantenol (ativo anti-inflamatório) e 20% de Vitamina C Pura'],
      [COLETA.fichasNavegador, 'ficha-serum-facial-antioxidante-c20.txt', '1% de Niacinamida'],
      [COLETA.fichasNavegador, 'ficha-serum-facial-antioxidante-c20.txt', 'Vitamina E e Ácido Ferúlico'],
    ],
  },
  {
    chave: 'protetor-fps99',
    nome: 'Protetor Solar de Tratamento FPS 99',
    base: 'protetor-solar-facial-stick',
    composicao: 'Derivado de Aveia; FPS 99; FPUVA 38,5',
    trechos: [
      [COLETA.fichasNavegador, 'ficha-protetor-solar-facial-stick.txt', 'Derivado de Aveia'],
      [COLETA.fichasCurl, 'ficha-kit-serum-amazon-miracle-protetor-solar-de-tratamento.txt', 'FPS 99 e FPUVA 38,5'],
    ],
  },
  {
    chave: 'bastao-fps95',
    nome: 'Bastão Multifuncional com Cor FPS 95',
    base: 'bastao-multifuncional-com-cor-fps-95',
    composicao: 'Vitamina C; Ácido Hialurônico; Vitamina E; FPS 95; FPUVA 40',
    trechos: [
      [COLETA.fichasCurl, 'ficha-kit-2-stick-multifuncional-cor-10.txt', 'Ácido Hialurônico'],
      [COLETA.fichasCurl, 'ficha-kit-2-stick-multifuncional-cor-10.txt', 'FPS 95 e FPUVA 40'],
    ],
  },
  {
    chave: 'gel-limpeza',
    nome: 'Gel de Limpeza de Vitamina C',
    base: 'gel-de-limpeza-de-vitamina-c-60g',
    composicao: 'Vitamina C (no nome); ativos hidratantes e antioxidantes, sem dizer quais; sem sulfato',
    trechos: [[COLETA.feed, 'products-p1.json', 'SEM SULFATO']],
    formato: { valor: '60', unidade: 'g', origem: 'título do produto' },
  },
  {
    chave: 'creme-clareador',
    nome: 'Creme Clareador (íntimo, axilas e virilha)',
    base: 'creme-clareador-intimo',
    composicao: 'Niacinamida; Ácido Azelaico; Alfa Arbutin; Óleo de Rosa Mosqueta',
    trechos: [
      [COLETA.fichasNavegador, 'ficha-creme-clareador-intimo.txt', 'Ácido Azelaico'],
      [COLETA.fichasNavegador, 'ficha-creme-clareador-intimo.txt', 'Alfa Arbutin'],
      [COLETA.fichasNavegador, 'ficha-creme-clareador-intimo.txt', 'Óleo de Rosa Mosqueta'],
      [COLETA.feed, 'products-p1.json', '1 Creme Clareador Íntimo (80 g)'],
    ],
  },
  { chave: 'ebooks', nome: 'eBooks', base: null, composicao: NAO_SE_APLICA, trechos: [] },
];

// Páginas de produto do feed. Papéis:
//   base       produto com as próprias variantes (por quantidade ou por cor)
//   apelido    outra página do mesmo produto (mesmo título); as variantes se juntam às da base pela quantidade
//   pagina-kit página própria de um kit que a base já vende como variante de quantidade
//   kit        kit com página própria, sem variante equivalente na base
//   misto      kit de produtos de linhas diferentes
//   oferta-bf  página de oferta de Black Friday (fora do sitemap e das coleções)
// eBooks não entram aqui: são reconhecidos pelo título.
const PAGINAS = {
  'serum-fortalecedor-de-sobrancelhas': { papel: 'base', linhas: ['sobrancelhas'] },
  'serum-para-crescimento-de-cilios-e-sobrancelhasseb': { papel: 'apelido', de: 'serum-fortalecedor-de-sobrancelhas' },
  'kit-2-seruns-de-sobrancelhas': { papel: 'pagina-kit', de: 'serum-fortalecedor-de-sobrancelhas', qtd: [2] },
  'serum-facial-antioxidante-c20': { papel: 'base', linhas: ['vitamina-c20'] },
  'combo-2-serum-vit-c': { papel: 'pagina-kit', de: 'serum-facial-antioxidante-c20', qtd: [2] },
  'protetor-solar-facial-stick': { papel: 'base', linhas: ['protetor-fps99'] },
  'kit-2-protetores-solar-facial-stick': { papel: 'pagina-kit', de: 'protetor-solar-facial-stick', qtd: [2] },
  'bastao-multifuncional-com-cor-fps-95': { papel: 'base', linhas: ['bastao-fps95'] },
  'kit-2-stick-multifuncional-cor-10': { papel: 'kit', linhas: ['bastao-fps95'], qtd: 2 },
  'gel-de-limpeza-de-vitamina-c-60g': { papel: 'base', linhas: ['gel-limpeza'] },
  'kit-2-gel-de-limpeza-facial-60g': { papel: 'pagina-kit', de: 'gel-de-limpeza-de-vitamina-c-60g', qtd: [2] },
  'creme-clareador-intimo': { papel: 'base', linhas: ['creme-clareador'], formato: { valor: '80', unidade: 'g', origem: 'descrição da oferta bf-creme-intimo-protetor ("1 Creme Clareador Íntimo (80 g)")' } },
  'creme-clareador-intimo-1': { papel: 'apelido', de: 'creme-clareador-intimo' },
  'kit-de-creme-clareador-intimo': { papel: 'pagina-kit', de: 'creme-clareador-intimo', qtd: [2, 3] },
  'creme-clareador-para-axilas': { papel: 'base', linhas: ['creme-clareador'] },
  'creme-clareador-para-virilha': { papel: 'base', linhas: ['creme-clareador'] },
  'protetor-solar-de-tratamento-bastao-com-cor-fps-95': { papel: 'misto', linhas: ['protetor-fps99', 'bastao-fps95'], qtd: 2, itens: '1 protetor FPS 99 + 1 bastão com cor FPS 95' },
  'serum-vitamina-c20-bastao-multifuncional-com-cor-fps-95-de-presente-copia': { papel: 'misto', linhas: ['vitamina-c20', 'bastao-fps95'], qtd: 2, itens: '1 sérum Vitamina C20 + 1 bastão com cor FPS 95' },
  'kit-completo-serum-de-vitamina-c20-bastao-multifuncional-com-cor-gel-de-limpeza': { papel: 'misto', linhas: ['vitamina-c20', 'bastao-fps95', 'gel-limpeza'], qtd: 3, itens: '1 sérum Vitamina C20 + 1 bastão com cor FPS 95 + 1 gel de limpeza' },
  'kit-serum-amazon-miracle-protetor-solar-de-tratamento': { papel: 'misto', linhas: ['vitamina-c20', 'protetor-fps99'], qtd: 2, itens: '1 sérum Vitamina C20 + 1 protetor FPS 99' },
  'kit-completo-serum-protetor-gel-de-limpeza': { papel: 'misto', linhas: ['vitamina-c20', 'protetor-fps99', 'gel-limpeza'], qtd: 3, itens: '1 sérum Vitamina C20 + 1 protetor FPS 99 + 1 gel de limpeza' },
  'bf-serum-sobrancelhas-protetor-gratis': { papel: 'oferta-bf', linhas: ['sobrancelhas', 'protetor-fps99'], qtd: [2], itens: ['1 sérum de sobrancelhas + 1 protetor incolor FPS 99 de presente'] },
  'bf-vitamina-c-dupla-brinde': { papel: 'oferta-bf', linhas: ['vitamina-c20', 'gel-limpeza'], qtd: [4], itens: ['2 séruns Vitamina C20 (1 de presente) + 1 gel de limpeza + 1 brinde surpresa'] },
  'bf-creme-intimo-protetor': { papel: 'oferta-bf', linhas: ['creme-clareador', 'protetor-fps99'], qtd: [2], itens: ['1 creme clareador íntimo + 1 protetor incolor FPS 99 de presente'] },
  'bf-vitamina-c-dupla': { papel: 'oferta-bf', linhas: ['vitamina-c20', 'gel-limpeza'], qtd: [3], itens: ['2 séruns Vitamina C20 (1 de presente) + 1 gel de limpeza'] },
  'bf-vitamina-c-kit-2-sp': { papel: 'oferta-bf', linhas: ['vitamina-c20', 'protetor-fps99', 'gel-limpeza'], qtd: [4], itens: ['1 sérum Vitamina C20 + 1 protetor FPS 99 + 1 gel de limpeza + 1 brinde surpresa'] },
  'bf-creators-serum-sobrancelhas': {
    papel: 'oferta-bf',
    linhas: ['sobrancelhas', 'protetor-fps99'],
    qtd: [2, 4, 6],
    itens: [
      '1 sérum de sobrancelhas + 1 produto surpresa',
      '2 séruns de sobrancelhas + 1 produto surpresa + 1 protetor FPS 99',
      '4 séruns de sobrancelhas (1 extra) + 1 produto surpresa + 1 protetor FPS 99',
    ],
  },
};

function lerJson(coleta, arquivo) {
  return JSON.parse(fs.readFileSync(path.join(BRUTO, coleta, arquivo), 'utf8'));
}

function lerTexto(coleta, arquivo) {
  return fs.readFileSync(path.join(BRUTO, coleta, arquivo), 'utf8');
}

function semTags(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function falhar(mensagem) {
  console.error(`ERRO: ${mensagem}`);
  process.exit(1);
}

const produtos = lerJson(COLETA.feed, 'products-p1.json').products;
const colecoes = lerJson(COLETA.feed, 'collections.json').collections;
const porHandle = new Map(produtos.map((p) => [p.handle, p]));
const ehEbook = (p) => /^ebook\b/i.test(p.title);

// Trava: toda página e toda coleção do feed precisa de uma decisão nas tabelas.
for (const p of produtos) {
  if (!ehEbook(p) && !PAGINAS[p.handle]) falhar(`página sem decisão em PAGINAS: ${p.handle}`);
}
for (const handle of Object.keys(PAGINAS)) {
  if (!porHandle.has(handle)) falhar(`PAGINAS cita página que não está no feed: ${handle}`);
}
for (const c of colecoes) {
  if (!COLECOES[c.handle]) falhar(`coleção sem decisão em COLECOES: ${c.handle}`);
}

// Trava: os trechos citados existem no bruto. No feed, a busca é no texto das descrições, sem as tags.
const textoDoFeed = produtos.map((p) => `${p.title} ${semTags(p.body_html)}`).join('\n');
for (const linha of LINHAS) {
  for (const [coleta, arquivo, trecho] of linha.trechos) {
    const onde = arquivo === 'products-p1.json' ? textoDoFeed : lerTexto(coleta, arquivo);
    if (!onde.includes(trecho)) falhar(`trecho não encontrado em ${coleta}/${arquivo}: "${trecho}"`);
  }
}

// Produtos de cada coleção, como a loja devolveu em /collections/<handle>/products.json.
const produtosDaColecao = new Map(
  colecoes.map((c) => [c.handle, lerJson(COLETA.colecoes, `colecao-${c.handle}.json`).products.map((p) => p.handle)])
);

const noSitemap = new Set(
  [...lerTexto(COLETA.sitemaps, 'sitemap_products_1.xml').matchAll(/<loc>[^<]*\/products\/([^<]+)<\/loc>/g)].map((m) => m[1])
);

// Rótulo de cada coleção no menu da página inicial ("[link: /collections/<handle>] rótulo").
const rotuloNoMenu = new Map();
const linhasDaHome = lerTexto(COLETA.paginas, 'home.txt').split('\n');
linhasDaHome.forEach((linha, i) => {
  const m = linha.match(/^\[link: \/collections\/([a-z0-9-]+)(?:\/[^\]]*)?\]\s*(.*)$/);
  if (!m) return;
  const rotulo = m[2] || linhasDaHome[i + 1] || '';
  if (rotulo && !rotulo.startsWith('[link:') && !rotuloNoMenu.has(m[1])) rotuloNoMenu.set(m[1], rotulo);
});

const linhaPorChave = new Map(LINHAS.map((l) => [l.chave, l]));
const categoriasDe = (handles) =>
  colecoes
    .filter((c) => COLECOES[c.handle].entra && handles.some((h) => produtosDaColecao.get(c.handle).includes(h)))
    .map((c) => c.title);

const urlProduto = (handle, varianteId) => `${SITE}/products/${handle}${varianteId ? `?variant=${varianteId}` : ''}`;
const evidenciaProduto = (p, v) => `products-p1.json#id=${p.id}${v ? `;variant=${v.id}` : ''}`;
const quantidadeDe = (variante) => Number((variante.title.match(/^(\d+)/) || [])[1] || 1);
const reais = (preco) => `R$ ${preco.replace('.', ',')}`;

function precoUnico(p) {
  const precos = [...new Set(p.variants.map((v) => v.price))];
  if (precos.length !== 1) falhar(`variantes de cor com preços diferentes em ${p.handle}`);
  return precos[0];
}

function notaDeCores(p) {
  const opcao = p.options.find((o) => /cor/i.test(o.name));
  if (!opcao) return null;
  const v = opcao.values;
  return `${v.length} cores (${v[0]} a ${v[v.length - 1]}) viraram uma entidade`;
}

const notaForaDoSitemap = (handle) => (noSitemap.has(handle) ? null : 'página fora do sitemap de produtos');
const NOTA_INCI = 'a loja não publica a lista de ingredientes (INCI); os ativos são os que a página destaca';
const NOTA_SEM_TAMANHO = 'volume ou peso não publicado nas fontes coletadas';

function fontesDaComposicao(linha) {
  const arquivos = [...new Set(linha.trechos.map(([coleta, arquivo]) => `${coleta}/${arquivo}`))];
  return arquivos.length ? `ativos lidos em ${arquivos.join(' e ')}` : null;
}

// SKU usado por mais de um produto-base (a mesma mercadoria vendida com nomes diferentes).
const basesPorSku = new Map();
for (const [handle, decisao] of Object.entries(PAGINAS)) {
  if (decisao.papel !== 'base') continue;
  for (const v of porHandle.get(handle).variants) {
    if (!v.sku) continue;
    if (!basesPorSku.has(v.sku)) basesPorSku.set(v.sku, new Set());
    basesPorSku.get(v.sku).add(handle);
  }
}

const entidades = [];
const idsDasLinhas = new Map();

function adicionar(campos) {
  const entidade = { entidade_id: `cat-${PARCEIRO}-${String(entidades.length + 1).padStart(4, '0')}`, parceiro: PARCEIRO, moeda: 'BRL', pais: 'BR', lido_em: LIDO_EM, coleta_id: COLETA.feed, ...campos };
  entidade.notas = (campos.notas || []).filter(Boolean).join('; ') || NAO_SE_APLICA;
  entidades.push(entidade);
  return entidade.entidade_id;
}

const MARCA = produtos[0].vendor;
if (produtos.some((p) => p.vendor !== MARCA)) falhar('o feed tem mais de um vendor');

// 1. Marca
adicionar({
  tipo: 'marca', marca: MARCA, categoria: NAO_SE_APLICA, linha: NAO_SE_APLICA, nome: MARCA, id_fonte: 'www.lamazonie.com.br',
  url: `${SITE}/`, formato: NAO_SE_APLICA, qtd_kit: NAO_SE_APLICA, unidade: NAO_SE_APLICA, composicao_declarada: NAO_SE_APLICA,
  preco_ref: NAO_SE_APLICA, moeda: NAO_SE_APLICA, evidencia: `products-p1.json#vendor=${MARCA}`,
  notas: [`único vendor dos ${produtos.length} produtos do feed`],
});

// 2. Categorias (coleções da loja)
for (const c of colecoes) {
  if (!COLECOES[c.handle].entra) continue;
  const obtidos = produtosDaColecao.get(c.handle).length;
  adicionar({
    tipo: 'categoria', marca: MARCA, categoria: c.title, linha: NAO_SE_APLICA, nome: c.title, id_fonte: c.handle,
    url: `${SITE}/collections/${c.handle}`, formato: NAO_SE_APLICA, qtd_kit: NAO_SE_APLICA, unidade: NAO_SE_APLICA,
    composicao_declarada: NAO_SE_APLICA, preco_ref: NAO_SE_APLICA, moeda: NAO_SE_APLICA,
    evidencia: `collections.json#handle=${c.handle}`,
    notas: [
      rotuloNoMenu.has(c.handle) ? `no menu da página inicial como "${rotuloNoMenu.get(c.handle)}"` : 'fora do menu da página inicial',
      `${c.products_count} produtos na contagem da loja e ${obtidos} na lista da coleção (${COLETA.colecoes}/colecao-${c.handle}.json)`,
      c.products_count !== obtidos ? 'a loja não informa o que explica a diferença' : null,
    ],
  });
}

// 3. Linhas
for (const linha of LINHAS) {
  const base = linha.base ? porHandle.get(linha.base) : null;
  const ebooks = produtos.filter(ehEbook);
  const id = adicionar({
    tipo: 'linha', marca: MARCA,
    categoria: base ? categoriasDe([base.handle]).join('|') || INDISPONIVEL : NAO_SE_APLICA,
    linha: linha.nome, nome: linha.nome,
    id_fonte: base ? base.handle : NAO_SE_APLICA,
    url: base ? urlProduto(base.handle) : NAO_SE_APLICA,
    formato: linha.formato ? linha.formato.valor : base ? INDISPONIVEL : 'e-book',
    qtd_kit: NAO_SE_APLICA,
    unidade: linha.formato ? linha.formato.unidade : base ? INDISPONIVEL : NAO_SE_APLICA,
    composicao_declarada: linha.composicao, preco_ref: NAO_SE_APLICA, moeda: NAO_SE_APLICA,
    evidencia: base ? evidenciaProduto(base) : evidenciaProduto(ebooks[0]),
    notas: base
      ? [
          'linha definida pelo produto-base; a loja não usa o campo de linha',
          NOTA_INCI,
          fontesDaComposicao(linha),
          linha.formato ? `tamanho pelo ${linha.formato.origem}` : NOTA_SEM_TAMANHO,
          linha.chave === 'creme-clareador' ? 'o íntimo aparece com 80 g na descrição de uma oferta; axilas e virilha não trazem tamanho' : null,
        ]
      : [`${ebooks.length} títulos no feed, com preço de ${[...new Set(ebooks.map((e) => reais(e.variants[0].price)))].join(' ou ')}`,'a ficha do sérum de sobrancelhas diz que 5 e-books acompanham a compra'],
  });
  idsDasLinhas.set(linha.chave, id);
}

const nomesDasLinhas = (chaves) => chaves.map((chave) => linhaPorChave.get(chave).nome).join('|');
const idsDeLinhas = (chaves) => chaves.map((chave) => idsDasLinhas.get(chave)).join('|');

// 4. Produtos-base e os kits de quantidade deles
function outrasPaginas(baseHandle, quantidade) {
  const notas = [];
  for (const [handle, decisao] of Object.entries(PAGINAS)) {
    if (decisao.de !== baseHandle) continue;
    const pagina = porHandle.get(handle);
    for (const [i, v] of pagina.variants.entries()) {
      const qtd = decisao.papel === 'pagina-kit' ? decisao.qtd[i] : quantidadeDe(v);
      if (qtd !== quantidade) continue;
      const tipo = decisao.papel === 'apelido' ? 'outra página do mesmo produto' : 'página própria do kit';
      notas.push(`${tipo}: /products/${handle} (${reais(v.price)}, SKU ${v.sku || 'sem SKU'}, id ${pagina.id})`);
    }
  }
  return notas;
}

function quantidadesSemBase(baseHandle) {
  const base = porHandle.get(baseHandle);
  const daBase = new Set(base.variants.map(quantidadeDe));
  for (const [handle, decisao] of Object.entries(PAGINAS)) {
    if (decisao.de !== baseHandle) continue;
    porHandle.get(handle).variants.forEach((v, i) => {
      const qtd = decisao.papel === 'pagina-kit' ? decisao.qtd[i] : quantidadeDe(v);
      if (!daBase.has(qtd)) falhar(`${handle} tem quantidade ${qtd}, que a base ${baseHandle} não vende`);
    });
  }
}

for (const [handle, decisao] of Object.entries(PAGINAS)) {
  if (decisao.papel !== 'base') continue;
  const p = porHandle.get(handle);
  const linha = linhaPorChave.get(decisao.linhas[0]);
  const formato = decisao.formato || linha.formato;
  const paginasDoGrupo = [handle, ...Object.keys(PAGINAS).filter((h) => PAGINAS[h].de === handle)];
  const comum = {
    marca: MARCA,
    categoria: categoriasDe(paginasDoGrupo).join('|') || INDISPONIVEL,
    linha: linha.nome,
    formato: formato ? formato.valor : INDISPONIVEL,
    unidade: formato ? formato.unidade : INDISPONIVEL,
    composicao_declarada: linha.composicao,
  };
  const notasComuns = [
    comum.categoria === INDISPONIVEL ? 'não aparece em nenhuma lista de coleção obtida' : null,
    notaForaDoSitemap(handle),
    formato ? `tamanho pela ${formato.origem.replace(/^título/, 'leitura do título')}` : NOTA_SEM_TAMANHO,
    NOTA_INCI,
  ];
  quantidadesSemBase(handle);

  if (p.options.some((o) => /cor/i.test(o.name))) {
    adicionar({
      ...comum, tipo: 'produto', nome: p.title, id_fonte: handle, url: urlProduto(handle), qtd_kit: '1',
      preco_ref: precoUnico(p), evidencia: evidenciaProduto(p), notas: [notaDeCores(p), ...notasComuns],
    });
    continue;
  }

  for (const v of p.variants) {
    const qtd = quantidadeDe(v);
    const outrosComMesmoSku = v.sku ? [...basesPorSku.get(v.sku)].filter((h) => h !== handle) : [];
    adicionar({
      ...comum,
      tipo: qtd === 1 ? 'produto' : 'kit',
      nome: qtd === 1 ? p.title : `${p.title}: ${v.title}`,
      id_fonte: qtd === 1 ? handle : `${handle}?variant=${v.id}`,
      url: qtd === 1 ? urlProduto(handle) : urlProduto(handle, v.id),
      qtd_kit: String(qtd),
      preco_ref: v.price,
      evidencia: evidenciaProduto(p, v),
      notas: [
        qtd === 1 ? `variante "${v.title}" da página; as outras quantidades são entidades de kit` : `variante de quantidade da página do produto, ${qtd} unidades`,
        ...outrasPaginas(handle, qtd),
        outrosComMesmoSku.length ? `SKU ${v.sku} também usado em ${outrosComMesmoSku.map((h) => `/products/${h}`).join(' e ')}` : null,
        ...notasComuns,
      ],
    });
  }
}

// 5. Kits com página própria, kits mistos e ofertas de Black Friday
for (const [handle, decisao] of Object.entries(PAGINAS)) {
  if (!['kit', 'misto', 'oferta-bf'].includes(decisao.papel)) continue;
  const p = porHandle.get(handle);
  const umaLinha = decisao.linhas.length === 1 ? linhaPorChave.get(decisao.linhas[0]) : null;
  const comum = {
    tipo: 'kit', marca: MARCA,
    categoria: categoriasDe([handle]).join('|') || INDISPONIVEL,
    linha: nomesDasLinhas(decisao.linhas),
    formato: umaLinha ? (umaLinha.formato ? umaLinha.formato.valor : INDISPONIVEL) : 'kit misto',
    unidade: umaLinha ? (umaLinha.formato ? umaLinha.formato.unidade : INDISPONIVEL) : NAO_SE_APLICA,
    composicao_declarada: umaLinha ? umaLinha.composicao : NAO_SE_APLICA,
  };
  const notasComuns = [
    comum.categoria === INDISPONIVEL ? 'não aparece em nenhuma lista de coleção obtida' : null,
    notaForaDoSitemap(handle),
    umaLinha ? NOTA_INCI : `composição nas linhas ${idsDeLinhas(decisao.linhas)}`,
    umaLinha && !umaLinha.formato ? NOTA_SEM_TAMANHO : null,
  ];

  if (decisao.papel !== 'oferta-bf') {
    adicionar({
      ...comum, nome: p.title, id_fonte: handle, url: urlProduto(handle), qtd_kit: String(decisao.qtd),
      preco_ref: precoUnico(p), evidencia: evidenciaProduto(p),
      notas: [decisao.itens ? `itens: ${decisao.itens}` : `${decisao.qtd} unidades do mesmo produto`, notaDeCores(p), ...notasComuns],
    });
    continue;
  }

  if (p.variants.length !== decisao.qtd.length) falhar(`oferta ${handle}: número de variantes mudou`);
  p.variants.forEach((v, i) => {
    const varias = p.variants.length > 1;
    adicionar({
      ...comum,
      nome: varias ? `${p.title}: ${v.title}` : p.title,
      id_fonte: varias ? `${handle}?variant=${v.id}` : handle,
      url: varias ? urlProduto(handle, v.id) : urlProduto(handle),
      qtd_kit: String(decisao.qtd[i]),
      preco_ref: v.price,
      evidencia: evidenciaProduto(p, varias ? v : null),
      notas: [
        'oferta de Black Friday, com brinde',
        `itens, contando os brindes: ${decisao.itens[i]}`,
        /surpresa/.test(decisao.itens[i]) ? 'o item surpresa não é identificado na página' : null,
        ...notasComuns,
      ],
    });
  });
}

// 6. eBooks
for (const p of produtos.filter(ehEbook).sort((a, b) => a.id - b.id)) {
  adicionar({
    tipo: 'produto', marca: MARCA, categoria: categoriasDe([p.handle]).join('|') || INDISPONIVEL,
    linha: linhaPorChave.get('ebooks').nome, nome: p.title, id_fonte: p.handle, url: urlProduto(p.handle),
    formato: 'e-book', qtd_kit: '1', unidade: NAO_SE_APLICA, composicao_declarada: NAO_SE_APLICA,
    preco_ref: p.variants[0].price, evidencia: evidenciaProduto(p),
    notas: [
      'produto digital',
      categoriasDe([p.handle]).length ? null : 'não aparece em nenhuma lista de coleção obtida',
      semTags(p.body_html) ? 'a descrição no feed é a do Sérum de Vitamina C20, não a do e-book' : 'sem descrição no feed',
    ],
  });
}

// Conferências antes de escrever
const ids = new Set(entidades.map((e) => e.entidade_id));
if (ids.size !== entidades.length) falhar('entidade_id repetido');
const idsDoFeed = new Set(produtos.flatMap((p) => [String(p.id), ...p.variants.map((v) => String(v.id))]));
for (const e of entidades) {
  for (const coluna of CABECALHO) {
    if (e[coluna] === undefined || e[coluna] === null || String(e[coluna]).trim() === '') falhar(`célula vazia: ${e.entidade_id}.${coluna}`);
  }
  for (const m of e.evidencia.matchAll(/(?:id|variant)=(\d+)/g)) {
    if (!idsDoFeed.has(m[1])) falhar(`evidência aponta id que não está no feed: ${e.entidade_id} ${m[1]}`);
  }
  const arquivo = e.evidencia.split('#')[0];
  if (!fs.existsSync(path.join(BRUTO, e.coleta_id, arquivo))) falhar(`arquivo de evidência não existe: ${e.coleta_id}/${arquivo}`);
}

const celula = (valor) => (/[",\n]/.test(valor) ? `"${valor.replace(/"/g, '""')}"` : valor);
const csv = [CABECALHO.join(','), ...entidades.map((e) => CABECALHO.map((coluna) => celula(String(e[coluna]))).join(','))].join('\n') + '\n';
fs.writeFileSync(SAIDA, csv, 'utf8');

const porTipo = {};
for (const e of entidades) porTipo[e.tipo] = (porTipo[e.tipo] || 0) + 1;
console.log(`catalogo.csv: ${entidades.length} entidades`, porTipo);
