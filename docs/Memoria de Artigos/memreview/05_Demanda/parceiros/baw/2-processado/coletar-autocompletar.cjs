// Autocompletar do Google: lê sementes.tsv, grava q-NNN-<slug>.json byte a byte, cabecalhos.txt (Set-Cookie
// trocado por [removido]) e respostas.tsv. Para no primeiro HTTP diferente de 200. Uso: node autocompletar.cjs <sementes> <pasta>
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const [sementes, dir] = process.argv.slice(2);
const linhas = fs.readFileSync(sementes, 'utf8').trim().split('\n').slice(1).map(l => l.split('\t'));
const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const agora = () => { const d = new Date(Date.now() - 3 * 3600e3); return d.toISOString().slice(0, 19) + '-03:00'; };
const sleep = ms => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
const tmpH = path.join(require('os').tmpdir(), 'ac-headers.txt');
fs.writeFileSync(path.join(dir, 'respostas.tsv'), 'n\tconsulta\tarquivo\thttp\tcontent_type\tbytes\tlido_em\n');
fs.writeFileSync(path.join(dir, 'cabecalhos.txt'), '');
for (const [n, , q] of linhas) {
  const arq = `q-${n}-${slug(q)}.json`, lido = agora();
  const code = execFileSync('curl', ['-s', '-G', 'https://suggestqueries.google.com/complete/search',
    '--data-urlencode', 'client=firefox', '--data-urlencode', 'hl=pt-BR', '--data-urlencode', 'gl=br',
    '--data-urlencode', `q=${q}`, '-D', tmpH, '-o', path.join(dir, arq), '-w', '%{http_code}']).toString();
  const h = fs.readFileSync(tmpH, 'utf8').replace(/^(set-cookie:).*$/gim, '$1 [removido]');
  const ct = (h.match(/^content-type:\s*(.*?)\s*$/im) || [, '?'])[1];
  fs.appendFileSync(path.join(dir, 'cabecalhos.txt'), `### ${n} ${q}\n${h.trim()}\n\n`);
  fs.appendFileSync(path.join(dir, 'respostas.tsv'), [n, q, arq, code, ct, fs.statSync(path.join(dir, arq)).size, lido].join('\t') + '\n');
  if (code !== '200') { console.log('PARADA', n, code); break; }
  sleep(2000);
}
console.log('fim', agora());
