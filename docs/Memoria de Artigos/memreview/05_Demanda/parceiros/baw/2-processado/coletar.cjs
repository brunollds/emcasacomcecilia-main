// Coletor da etapa 2 da BAW: baixa páginas públicas da loja, uma por vez, com 4 segundos entre pedidos.
// Uso: node coletar.cjs <listas|fichas> <coleta-id> <arquivo-de-pedidos.tsv>
//   listas: cada linha do arquivo é "nome<TAB>caminho"; pede ?pagina=N&tamanho=100 até cobrir o numberOfItems
//           do JSON-LD da página 1.
//   fichas: cada linha é "nome<TAB>caminho"; um pedido por linha.
// O HTML vai para a pasta de brutos pesados; o registro dos pedidos (pedidos.tsv) vai para a pasta da coleta no
// repositório. Para no primeiro status diferente de 200 ou em página de desafio (CAPTCHA, Cloudflare), sem repetir.
const fs = require('fs');
const path = require('path');

const SITE = 'https://www.bawclothing.com.br';
const UA = 'Mozilla/5.0 (compatible; pesquisa-editorial)';
const ESPERA_MS = 4000;
const PESADOS = 'C:/Users/Bruno/Downloads/Emcasacomcecilia/demanda-brutos-pesados/baw';
const BRUTO = path.join(__dirname, '..', '1-bruto');

const [modo, coletaId, pedidosArq] = process.argv.slice(2);
if (!['listas', 'fichas'].includes(modo) || !coletaId || !pedidosArq) {
  console.error('uso: node coletar.cjs <listas|fichas> <coleta-id> <pedidos.tsv>');
  process.exit(2);
}

const destinoPesado = path.join(PESADOS, coletaId);
const destinoRepo = path.join(BRUTO, coletaId);
fs.mkdirSync(destinoPesado, { recursive: true });
fs.mkdirSync(destinoRepo, { recursive: true });
const registro = path.join(destinoRepo, 'pedidos.tsv');
if (!fs.existsSync(registro)) fs.writeFileSync(registro, 'momento\turl\tstatus\tbytes\tarquivo\n');

const pedidos = fs.readFileSync(pedidosArq, 'utf8').split(/\r?\n/).filter(Boolean).map((l) => l.split('\t'));
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
const agora = () => {
  const d = new Date(Date.now() - 3 * 3600 * 1000);
  return d.toISOString().slice(0, 19) + '-03:00';
};

let primeiro = true;
async function pedir(url, arquivo) {
  const destino = path.join(destinoPesado, arquivo);
  if (fs.existsSync(destino)) return fs.readFileSync(destino, 'utf8');
  if (!primeiro) await espera(ESPERA_MS);
  primeiro = false;
  const momento = agora();
  const resp = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' });
  const corpo = await resp.text();
  const desafio = /captcha|cf-chl|challenge-platform|Attention Required/i.test(corpo.slice(0, 5000));
  fs.appendFileSync(registro, `${momento}\t${url}\t${resp.status}${desafio ? ' desafio' : ''}\t${Buffer.byteLength(corpo)}\t${arquivo}\n`);
  if (resp.status !== 200 || desafio) {
    console.error(`PARADA: ${resp.status}${desafio ? ' (desafio)' : ''} em ${url}`);
    process.exit(1);
  }
  fs.writeFileSync(destino, corpo);
  return corpo;
}

(async () => {
  for (const [nome, caminho] of pedidos) {
    if (modo === 'fichas') {
      await pedir(SITE + caminho, `ficha-${nome}.html`);
      console.log(`ficha ${nome}`);
      continue;
    }
    const sep = caminho.includes('?') ? '&' : '?';
    const p1 = await pedir(`${SITE}${caminho}${sep}pagina=1&tamanho=100`, `${nome}-p1.html`);
    const m = p1.match(/"@type":"ItemList"[^]*?"numberOfItems":"(\d+)"/);
    const total = m ? Number(m[1]) : 0;
    const paginas = Math.max(1, Math.ceil(total / 100));
    for (let n = 2; n <= paginas; n++) {
      await pedir(`${SITE}${caminho}${sep}pagina=${n}&tamanho=100`, `${nome}-p${n}.html`);
    }
    console.log(`${nome}: ${total} itens, ${paginas} página(s)`);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
