// Atribui às lojas de src/lib/couponsData.ts as linhas dos exports gerais de 05_Demanda/_site/.
// Rodar na raiz do repositório:
//   node "docs/Memoria de Artigos/memreview/05_Demanda/_site/2-processado/montar-lojas.mjs"
// Escreve nossos-dados-lojas.csv e resumo-lojas.md nesta pasta. A regra está no COMO-REFAZER.md ao lado.
import fs from 'node:fs';

const SITE = 'docs/Memoria de Artigos/memreview/05_Demanda/_site';
const OUT = `${SITE}/2-processado`;
const ORIGEM = 'https://emcasacomcecilia.com';
const GSC = '20261117-1008-gsc-desempenho';
const GA4 = '20261117-1016-ga4-relatorios';
const BING = '20261117-1020-bing-desempenho';
const NA = '@nao-se-aplica';

// ---------- CSV ----------
// Devolve as linhas lógicas; row.linha é a linha física (1 = cabeçalho) em que a linha lógica começa.
function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', quoted = false, linha = 1, inicio = 1;
  const t = text.replace(/^﻿/, '');
  const fecha = () => { row.push(cell); row.linha = inicio; rows.push(row); row = []; cell = ''; };
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (c === '\n') linha++;
    if (quoted) {
      if (c === '"' && t[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { fecha(); inicio = linha; }
    else if (c !== '\r') cell += c;
  }
  if (cell !== '' || row.length) fecha();
  return rows;
}
const esc = (v) => { const s = String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
const read = (p) => fs.readFileSync(p, 'utf8');

// ---------- Lojas ----------
const coupons = read('src/lib/couponsData.ts');
const lojas = [...coupons.matchAll(/^    slug: '([^']+)',[\s\S]*?^    brand: (?:'((?:[^'\\]|\\.)*)'|"([^"]*)"),/gm)]
  .map((m) => ({ slug: m[1], marca: (m[2] ?? m[3]).replace(/\\'/g, "'") }));
if (lojas.length !== (coupons.match(/^    slug: '/gm) || []).length) throw new Error('nem toda loja de couponsData.ts foi lida');

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’`]/g, "'");
// Formas do nome da marca procuradas nas consultas, além da marca e do slug com espaços.
const TERMOS_EXTRAS = {
  'nestle-nutre': ['nutren'],
  magalu: ['magazine luiza'],
  'i-wanna-sleep': ['iwannasleep', 'iws'],
  letseatit: ["let's eat it", 'lets eat it'],
  'dr-peanut': ['dr. peanut', 'drpeanut'],
  'clea-store': ['clea'],
  'mais-mu': ['+mu'],
  'toda-up': ['todaup'],
  lamazonie: ['amazonie'],
  'la-ganexa': ['ganexa', 'laganexa'],
  holyfoods: ['holy foods'],
  aliexpress: ['ali express'],
  'max-titanium': ['maxtitanium'],
  'black-skull': ['blackskull'],
  'simple-organic': ['simpleorganic'],
  'dolce-gusto': ['dolcegusto'],
};
for (const l of lojas) {
  l.termos = [...new Set([norm(l.marca), l.slug.replace(/-/g, ' '), ...(TERMOS_EXTRAS[l.slug] || [])])];
  l.re = new RegExp(`(^|[^a-z0-9])(${l.termos.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})([^a-z0-9]|$)`);
}
const porSlug = new Map(lojas.map((l) => [l.slug, l]));
const lojasDaConsulta = (q) => { const n = norm(q); return lojas.filter((l) => l.re.test(n)); };

// Artigos: slug -> lojas do affiliate (texto ou lista), só as que têm página em couponsData.ts.
const artigos = new Map();
for (const f of fs.readdirSync('content/reviews').filter((x) => x.endsWith('.json') && !x.startsWith('_'))) {
  const j = JSON.parse(read(`content/reviews/${f}`));
  const aff = [].concat(j.affiliate ?? []).filter((s) => porSlug.has(s));
  artigos.set(`${j.locale ?? 'pt'}|${j.slug}`, { arquivo: `content/reviews/${f}`, lojas: aff });
}
// Endereço ou caminho -> { tipo, idioma, lojas, varias }
function lojasDaPagina(urlOuCaminho) {
  const caminho = urlOuCaminho.replace(ORIGEM, '').split(/[?#]/)[0].replace(/\/$/, '');
  let m = caminho.match(/^\/cupons\/([a-z0-9-]+)$/);
  if (m) return porSlug.has(m[1]) ? { tipo: 'pagina-cupom', idioma: 'pt-BR', lojas: [m[1]] } : null;
  m = caminho.match(/^\/([a-z]{2}(?:-[a-z]{2,4})?)\/coupons\/([a-z0-9-]+)$/);
  if (m) return porSlug.has(m[2]) ? { tipo: 'pagina-cupom', idioma: m[1], lojas: [m[2]] } : null;
  m = caminho.match(/^(?:\/([a-z]{2}(?:-[a-z]{2,4})?))?\/reviews\/([a-z0-9-]+)$/);
  if (m) {
    const a = artigos.get(`${m[1] ?? 'pt'}|${m[2]}`);
    if (!a || !a.lojas.length) return null;
    return { tipo: 'artigo', idioma: m[1] ?? 'pt-BR', lojas: a.lojas, varias: a.lojas.length > 1 };
  }
  return null;
}

// ---------- Linhas ----------
const linhas = [];
const contador = new Map();
const semLoja = { paginas: 0, consultas: 0 };
function nos(slug, o) {
  const n = (contador.get(slug) || 0) + 1;
  contador.set(slug, n);
  linhas.push([
    `nos-${slug}-${String(n).padStart(4, '0')}`, o.plataforma, o.relatorio, o.dimensao, o.chave, NA, o.idioma ?? NA, NA,
    o.inicio, o.fim, o.metrica, String(o.valor), o.definicao, `_site/${o.coleta}`, o.evidencia, o.qualidade,
  ]);
}
const varias = (p, slug) => (p.varias ? ` Artigo de várias lojas (${p.lojas.join(', ')}): a mesma medida aparece numa linha de cada loja, não somar entre lojas.` : '');
const duasMarcas = (ls) => (ls.length > 1 ? ` A consulta cita mais de uma marca (${ls.map((l) => l.slug).join(', ')}): a mesma medida aparece numa linha de cada loja.` : '');

// Search Console
const gscP = { plataforma: 'gsc', coleta: GSC, inicio: '2026-08-16', fim: '2026-11-15' };
const GD = {
  cliques: 'Cliques no resultado da Pesquisa Google (web)',
  impressoes: 'Vezes em que um resultado do site apareceu na Pesquisa Google (web)',
  posicao: 'Posição média do resultado mais alto do site, ponderada pelas impressões',
};
const gscQ = 'Search Console, tipo Web, 3 meses. O export do site traz só as 1.000 linhas com mais cliques e impressões: página ou consulta fora dele não está aqui.';
for (const r of parseCsv(read(`${SITE}/${GSC}/gsc-site-3m/paginas.csv`)).slice(1)) {
  const p = lojasDaPagina(r[0]);
  if (!p) { semLoja.paginas++; continue; }
  for (const slug of p.lojas) {
    for (const [metrica, valor, def] of [['cliques', r[1], GD.cliques], ['impressoes', r[2], GD.impressoes], ['posicao-media', r[4], GD.posicao]]) {
      nos(slug, { ...gscP, relatorio: 'Desempenho > Páginas (site inteiro)', dimensao: 'pagina', chave: r[0], idioma: p.idioma, metrica, valor, definicao: def, evidencia: `gsc-site-3m/paginas.csv#linha=${r.linha}`, qualidade: `${gscQ}${varias(p)}` });
    }
  }
}
for (const r of parseCsv(read(`${SITE}/${GSC}/gsc-site-3m/consultas.csv`)).slice(1)) {
  const ls = lojasDaConsulta(r[0]);
  if (!ls.length) { semLoja.consultas++; continue; }
  for (const l of ls) {
    for (const [metrica, valor, def] of [['cliques', r[1], GD.cliques], ['impressoes', r[2], GD.impressoes], ['posicao-media', r[4], GD.posicao]]) {
      nos(l.slug, { ...gscP, relatorio: 'Desempenho > Consultas (site inteiro)', dimensao: 'consulta', chave: r[0], metrica, valor, definicao: def, evidencia: `gsc-site-3m/consultas.csv#linha=${r.linha}`, qualidade: `${gscQ} Sem filtro de página: a consulta não diz qual página apareceu.${duasMarcas(ls)}` });
    }
  }
}

// Bing
const bingP = { plataforma: 'bing', coleta: BING, inicio: '2026-08-17', fim: '2026-11-15' };
const BD = {
  impressoes: 'Vezes em que o site apareceu nos resultados web do Bing',
  cliques: 'Cliques nos resultados web do Bing',
  posicao: 'Posição média nos resultados web do Bing',
  citacoes: 'Vezes em que foi citado como fonte em respostas de IA (Copilots da Microsoft e parceiros)',
};
const bingQ = 'Bing Webmaster, 3 meses, lista inteira do relatório. Volume pequeno perto do Google.';
const iaQ = 'Bing Webmaster, AI Performance, 3 meses. O Bing avisa que é uma amostra.';
for (const r of parseCsv(read(`${SITE}/${BING}/bing-paginas-3m.csv`)).slice(1)) {
  const p = lojasDaPagina(r[0]);
  if (!p) continue;
  for (const slug of p.lojas) {
    for (const [metrica, valor, def] of [['impressoes', r[1], BD.impressoes], ['cliques', r[2], BD.cliques], ['posicao-media', r[4], BD.posicao]]) {
      nos(slug, { ...bingP, relatorio: 'Search Performance > Pages', dimensao: 'pagina', chave: r[0], idioma: p.idioma, metrica, valor, definicao: def, evidencia: `bing-paginas-3m.csv#linha=${r.linha}`, qualidade: `${bingQ}${varias(p)}` });
    }
  }
}
for (const r of parseCsv(read(`${SITE}/${BING}/bing-palavras-chave-3m.csv`)).slice(1)) {
  const ls = lojasDaConsulta(r[0]);
  for (const l of ls) {
    for (const [metrica, valor, def] of [['impressoes', r[1], BD.impressoes], ['cliques', r[2], BD.cliques], ['posicao-media', r[4], BD.posicao]]) {
      nos(l.slug, { ...bingP, relatorio: 'Search Performance > Keywords', dimensao: 'consulta', chave: r[0], metrica, valor, definicao: def, evidencia: `bing-palavras-chave-3m.csv#linha=${r.linha}`, qualidade: `${bingQ}${duasMarcas(ls)}` });
    }
  }
}
for (const r of parseCsv(read(`${SITE}/${BING}/bing-ia-paginas-3m.csv`)).slice(1)) {
  const p = lojasDaPagina(r[0]);
  if (!p) continue;
  for (const slug of p.lojas) {
    nos(slug, { ...bingP, relatorio: 'AI Performance > Pages', dimensao: 'pagina', chave: r[0], idioma: p.idioma, metrica: 'citacoes', valor: r[1], definicao: BD.citacoes, evidencia: `bing-ia-paginas-3m.csv#linha=${r.linha}`, qualidade: `${iaQ}${varias(p)}` });
  }
}
for (const r of parseCsv(read(`${SITE}/${BING}/bing-ia-consultas-3m.csv`)).slice(1)) {
  const ls = lojasDaConsulta(r[0]);
  for (const l of ls) {
    nos(l.slug, { ...bingP, relatorio: 'AI Performance > Grounding Queries', dimensao: 'consulta', chave: r[0], metrica: 'citacoes', valor: r[3], definicao: BD.citacoes, evidencia: `bing-ia-consultas-3m.csv#linha=${r.linha}`, qualidade: `${iaQ} Intenção e tema do Bing: ${r[1]}, ${r[2]} (rótulos gerados por IA).${duasMarcas(ls)}` });
  }
}

// GA4
const gaP = { plataforma: 'ga4', coleta: GA4, inicio: '2026-08-16', fim: '2026-11-15' };
const gaQ = 'GA4, propriedade Emcasacomcecilia. Só conta quem aceitou os cookies, e há sinal de eventos em dobro no período (FONTE.md da coleta): vale a comparação entre páginas, não o número absoluto.';
{
  const bruto = read(`${SITE}/${GA4}/ga4-paginas-e-telas.csv`).split('\n');
  bruto.forEach((l, i) => {
    if (l.startsWith('#') || !l.startsWith('/')) return;
    const r = parseCsv(l)[0];
    const p = lojasDaPagina(r[0]);
    if (!p) return;
    for (const slug of p.lojas) {
      for (const [metrica, valor, def] of [['visualizacoes', r[1], 'Visualizações: eventos page_view da página'], ['usuarios-ativos', r[2], 'Usuários ativos que viram a página'], ['eventos-principais', r[6], 'Eventos principais (conversões configuradas) disparados na página']]) {
        nos(slug, { ...gaP, relatorio: 'Páginas e telas: Caminho da página', dimensao: 'pagina', chave: `${ORIGEM}${r[0]}`, idioma: p.idioma, metrica, valor, definicao: def, evidencia: `ga4-paginas-e-telas.csv#linha=${i + 1}`, qualidade: `${gaQ}${varias(p)}` });
      }
    }
  });
}

// ---------- Saída ----------
const HEADER = ['registro_id', 'plataforma', 'relatorio', 'dimensao', 'chave', 'pais', 'idioma', 'dispositivo', 'periodo_inicio', 'periodo_fim', 'metrica', 'valor', 'definicao_metrica', 'coleta_id', 'evidencia', 'qualidade'];
linhas.sort((a, b) => a[0].localeCompare(b[0]));
for (const r of linhas) r.forEach((v, i) => { if (v === '' || v === undefined) throw new Error(`célula vazia em ${r[0]}, coluna ${HEADER[i]}`); });
if (new Set(linhas.map((r) => r[0])).size !== linhas.length) throw new Error('id repetido');
for (const r of linhas) {
  const [arq, loc] = r[14].split('#');
  const base = `${SITE.replace('/_site', '')}/${r[13]}/${arq}`;
  if (!fs.existsSync(base)) throw new Error(`${r[0]}: evidência não existe: ${base}`);
  const n = Number(loc.replace('linha=', ''));
  const fisica = read(base).split('\n')[n - 1] || '';
  const chave = r[4].replace(ORIGEM, '');
  if (!fisica.includes(r[3] === 'pagina' ? chave : r[4].split('\n')[0])) throw new Error(`${r[0]}: a linha ${n} de ${arq} não traz a chave`);
}
fs.writeFileSync(`${OUT}/nossos-dados-lojas.csv`, [HEADER, ...linhas].map((r) => r.map(esc).join(',')).join('\n') + '\n');

// Resumo por loja: só fatos lidos das linhas acima.
const val = (r) => Number(r[11]);
const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1)).replace('.', ',');
let md = `# Resumo por loja\n\nGerado por \`montar-lojas.mjs\` a partir de \`nossos-dados-lojas.csv\`. Só fatos: soma e leitura direta das linhas, sem\ninterpretação. Período: 16/08 a 15/11/2026 (Search Console e GA4) e 17/08 a 15/11/2026 (Bing).\n\nLeia com as ressalvas de cada coleta: o Search Console só exporta as 1.000 páginas e as 1.000 consultas com mais\nresultado no site; o GA4 só conta quem aceitou os cookies e tem sinal de eventos em dobro; o relatório de IA do Bing é\namostra. Loja sem linha em nenhum export aparece só na tabela geral. Posição não se soma: vale por página.\nArtigo de várias lojas aparece em cada uma delas.\n\n## Todas as lojas\n\n| Loja | Páginas no export do Google | Cliques Google | Impressões Google | Consultas com a marca | Impressões dessas consultas | Impressões Bing | Citações de IA (Bing) | Visualizações GA4 |\n|---|---|---|---|---|---|---|---|---|\n`;
const detalhes = [];
for (const l of lojas) {
  const ls = linhas.filter((r) => r[0].startsWith(`nos-${l.slug}-`));
  const sel = (plat, rel, dim, met) => ls.filter((r) => r[1] === plat && r[2].startsWith(rel) && r[3] === dim && r[10] === met);
  const soma = (rs) => rs.reduce((a, r) => a + val(r), 0);
  const gPag = sel('gsc', 'Desempenho > Páginas', 'pagina', 'impressoes');
  const gCon = sel('gsc', 'Desempenho > Consultas', 'consulta', 'impressoes');
  md += `| ${l.marca} (\`${l.slug}\`) | ${gPag.length} | ${soma(sel('gsc', 'Desempenho > Páginas', 'pagina', 'cliques'))} | ${soma(gPag)} | ${gCon.length} | ${soma(gCon)} | ${soma(sel('bing', 'Search Performance > Pages', 'pagina', 'impressoes'))} | ${soma(sel('bing', 'AI Performance > Pages', 'pagina', 'citacoes'))} | ${soma(sel('ga4', 'Páginas e telas', 'pagina', 'visualizacoes'))} |\n`;
  if (!ls.length) continue;
  const urls = [...new Set(ls.filter((r) => r[3] === 'pagina').map((r) => r[4]))];
  const de = (url, plat, rel, met) => { const r = ls.find((x) => x[1] === plat && x[2].startsWith(rel) && x[4] === url && x[10] === met); return r ? fmt(val(r)) : '.'; };
  const ordem = (u) => -Number((ls.find((x) => x[1] === 'gsc' && x[4] === u && x[10] === 'impressoes') || [])[11] || 0);
  let d = `\n## ${l.marca} (\`${l.slug}\`)\n\n`;
  if (urls.length) {
    d += `| Página | Tipo | Cliques Google | Impressões Google | Posição Google | Impressões Bing | Citações de IA | Visualizações GA4 |\n|---|---|---|---|---|---|---|---|\n`;
    for (const u of urls.sort((a, b) => ordem(a) - ordem(b) || a.localeCompare(b))) {
      const p = lojasDaPagina(u);
      d += `| \`${u.replace(ORIGEM, '')}\` | ${p.tipo === 'pagina-cupom' ? 'cupom' : p.varias ? 'artigo (várias lojas)' : 'artigo'} | ${de(u, 'gsc', 'Desempenho > Páginas', 'cliques')} | ${de(u, 'gsc', 'Desempenho > Páginas', 'impressoes')} | ${de(u, 'gsc', 'Desempenho > Páginas', 'posicao-media')} | ${de(u, 'bing', 'Search Performance > Pages', 'impressoes')} | ${de(u, 'bing', 'AI Performance > Pages', 'citacoes')} | ${de(u, 'ga4', 'Páginas e telas', 'visualizacoes')} |\n`;
    }
  }
  const cons = gCon.sort((a, b) => val(b) - val(a)).slice(0, 8);
  if (cons.length) {
    d += `\nConsultas com a marca no Google (as ${cons.length} com mais impressões, de ${gCon.length}):\n\n| Consulta | Cliques | Impressões | Posição |\n|---|---|---|---|\n`;
    for (const c of cons) {
      const q = c[4];
      const g = (met) => fmt(val(ls.find((x) => x[1] === 'gsc' && x[3] === 'consulta' && x[4] === q && x[10] === met)));
      d += `| ${q.replace(/\n/g, ' ').replace(/\|/g, '/')} | ${g('cliques')} | ${g('impressoes')} | ${g('posicao-media')} |\n`;
    }
  }
  detalhes.push(d);
}
md += `\n"." quer dizer que a página não aparece naquele export.\n${detalhes.join('')}`;
fs.writeFileSync(`${OUT}/resumo-lojas.md`, md);

console.log(`nossos-dados-lojas.csv: ${linhas.length} linhas, ${contador.size} de ${lojas.length} lojas com linha`);
console.log(`Search Console sem loja (só no bruto): ${semLoja.paginas} páginas e ${semLoja.consultas} consultas`);
console.log('ids únicos, sem célula vazia, toda evidência aponta para a linha que traz a chave');
