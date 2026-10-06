import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const SCRIPT = fileURLToPath(new URL('./submit-indexnow.mjs', import.meta.url));
const BASE_URL = 'https://emcasacomcecilia.com';
const KEY = '126de38625a040d1a5e45c6a08aabe46';
const DEFAULT_URLS = [`${BASE_URL}/`, `${BASE_URL}/sitemap.xml`, `${BASE_URL}/llms.txt`];

// Entra antes do script via --import: anota cada chamada no stderr e responde 200, então
// nenhum teste chega ao IndexNow. Se o stub quebrar, o node para antes de rodar o script.
function stubFetch() {
  globalThis.fetch = async (url, init) => {
    process.stderr.write(`FETCH ${JSON.stringify({ url, body: JSON.parse(init.body) })}\n`);
    return new Response(null, { status: 200 });
  };
}
const FETCH_STUB = `data:text/javascript,${encodeURIComponent(`(${stubFetch})();`)}`;

function run(args, env = {}) {
  const result = spawnSync(process.execPath, ['--import', FETCH_STUB, SCRIPT, ...args], {
    encoding: 'utf8',
    // Um npm_config_dry_run herdado poria todos os casos em ensaio.
    env: { ...process.env, npm_config_dry_run: undefined, ...env },
  });
  const fetches = result.stderr
    .split(/\r?\n/)
    .filter((line) => line.startsWith('FETCH '))
    .map((line) => JSON.parse(line.slice('FETCH '.length)));
  return { ...result, fetches };
}

function dryRunPayload(stdout) {
  return JSON.parse(stdout.slice(stdout.indexOf('{')));
}

test('recusa argumento com "-" na frente antes de qualquer chamada de rede', () => {
  const cases = [
    [['--foo', `${BASE_URL}/`], '--foo'],
    [['--dry-run', '--dryrun'], '--dryrun'],
    [['--dry-run=true'], '--dry-run=true'],
    [['-x'], '-x'],
    [['-'], '-'],
  ];
  for (const [args, option] of cases) {
    const result = run(args);
    assert.equal(result.status, 1, `${args.join(' ')}\n${result.stdout}`);
    assert.ok(result.stderr.includes(`Opção desconhecida: ${option}\n`), result.stderr);
    assert.deepEqual(result.fetches, [], args.join(' '));
  }
});

test('--dry-run mostra host, keyLocation e urlList sem chamar o IndexNow', () => {
  const result = run(['--dry-run', `${BASE_URL}/reviews/exemplo`, '/receitas']);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(result.fetches, []);
  assert.deepEqual(dryRunPayload(result.stdout), {
    host: 'emcasacomcecilia.com',
    keyLocation: `${BASE_URL}/${KEY}.txt`,
    urlList: [`${BASE_URL}/reviews/exemplo`, `${BASE_URL}/receitas`],
  });
});

test('sem URL, o --dry-run mostra a lista padrão', () => {
  const result = run(['--dry-run']);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(result.fetches, []);
  assert.deepEqual(dryRunPayload(result.stdout).urlList, DEFAULT_URLS);
});

test('--dry-run consumido pelo npm (faltou o --) também não envia nada', () => {
  const result = run([`${BASE_URL}/`], { npm_config_dry_run: 'true' });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(result.fetches, []);
  assert.deepEqual(dryRunPayload(result.stdout).urlList, [`${BASE_URL}/`]);
});

test('sem --dry-run, envia uma vez as URLs normalizadas e sem repetição', () => {
  const result = run([`${BASE_URL}/reviews/exemplo`, '/receitas', 'sobre', '/receitas']);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(result.fetches, [
    {
      url: 'https://api.indexnow.org/indexnow',
      body: {
        host: 'emcasacomcecilia.com',
        key: KEY,
        keyLocation: `${BASE_URL}/${KEY}.txt`,
        urlList: [`${BASE_URL}/reviews/exemplo`, `${BASE_URL}/receitas`, `${BASE_URL}/sobre`],
      },
    },
  ]);
  assert.match(result.stdout, /IndexNow OK: 3 URL\(s\) enviadas\./);
});

test('sem argumentos, envia a lista padrão', () => {
  const result = run([]);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(result.fetches.map((call) => call.body.urlList), [DEFAULT_URLS]);
});
