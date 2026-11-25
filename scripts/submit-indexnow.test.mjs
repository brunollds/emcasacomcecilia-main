import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { parseActiveCouponSlugsFromSource } from './submit-indexnow.mjs';

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

function run(args, env = {}, cwd = undefined) {
  const result = spawnSync(process.execPath, ['--import', FETCH_STUB, SCRIPT, ...args], {
    encoding: 'utf8',
    cwd,
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

test('recusa caminho do Windows (o Git Bash converte /caminho) antes de qualquer chamada de rede', () => {
  const cases = [
    [[`${BASE_URL}/`, 'C:/Program Files/Git/sitemap.xml'], 'C:/Program Files/Git/sitemap.xml'],
    [['--dry-run', 'A:/'], 'A:/'],
    [['c:\\Users\\Bruno\\llms.txt'], 'c:\\Users\\Bruno\\llms.txt'],
  ];
  for (const [args, path] of cases) {
    const result = run(args);
    assert.equal(result.status, 1, `${args.join(' ')}\n${result.stdout}`);
    assert.ok(result.stderr.includes(`Caminho do Windows: ${path}\n`), result.stderr);
    assert.deepEqual(result.fetches, [], args.join(' '));
  }
});

test('recusa URL de outro host antes de qualquer chamada de rede', () => {
  const cases = [
    'https://www.emcasacomcecilia.com/reviews/exemplo',
    'https://cdn.emcasacomcecilia.com/images/exemplo.jpg',
    'http://emcasacomcecilia.com/sitemap.xml',
    'https://emcasacomcecilia.com.exemplo.com/',
    'https://example.com/',
    'ftp://emcasacomcecilia.com/llms.txt',
  ];
  for (const url of cases) {
    const result = run([`${BASE_URL}/`, url]);
    assert.equal(result.status, 1, `${url}\n${result.stdout}`);
    assert.ok(result.stderr.includes(`URL fora do site: ${url}\n`), result.stderr);
    assert.deepEqual(result.fetches, [], url);
  }
});

test('aceita URL do site sem barra no fim e com esquema ou host em maiúsculas', () => {
  const urls = [BASE_URL, 'HTTPS://EMCASACOMCECILIA.COM/receitas'];
  const result = run(['--dry-run', ...urls]);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(dryRunPayload(result.stdout).urlList, urls);
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

test('--since coleta URLs alteradas num repositório temporário e filtra afiliados sem página ativa', () => {
  const missing = run(['--since']);
  assert.equal(missing.status, 1);
  assert.deepEqual(missing.fetches, []);

  const tempDir = mkdtempSync(join(tmpdir(), 'ecc-indexnow-test-'));
  try {
    const git = (...gitArgs) =>
      execFileSync('git', gitArgs, { cwd: tempDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

    git('init');
    git('config', 'user.name', 'Test');
    git('config', 'user.email', 'test@example.com');

    mkdirSync(join(tempDir, 'src/lib'), { recursive: true });
    mkdirSync(join(tempDir, 'content/reviews'), { recursive: true });
    mkdirSync(join(tempDir, 'content/receitas'), { recursive: true });

    writeFileSync(
      join(tempDir, 'src/lib/couponsData.ts'),
      [
        'const STORE_COUPONS = [',
        '  {',
        "    offerMode: 'discount-code',",
        "    slug: 'belive',",
        "    status: 'ativo',",
        '  },',
        '  {',
        "    offerMode: 'discount-code',",
        "    slug: 'kopenhagen',",
        "    status: 'pausado',",
        '  },',
        '];',
      ].join('\n'),
      'utf8'
    );
    git('add', '.');
    git('commit', '-m', 'base');

    writeFileSync(
      join(tempDir, 'content/reviews/belive-e-boa.json'),
      JSON.stringify({ slug: 'belive-e-boa', affiliate: 'belive' }),
      'utf8'
    );
    writeFileSync(
      join(tempDir, 'content/reviews/proton-en.json'),
      JSON.stringify({ slug: 'proton-en', locale: 'en', affiliate: 'proton' }),
      'utf8'
    );
    writeFileSync(
      join(tempDir, 'content/reviews/multi-lojas.json'),
      JSON.stringify({ slug: 'multi-lojas', affiliate: ['shopee', 'kopenhagen', 'belive'] }),
      'utf8'
    );
    writeFileSync(
      join(tempDir, 'content/reviews/rascunho.json'),
      JSON.stringify({ slug: 'rascunho', draft: true, affiliate: 'belive' }),
      'utf8'
    );
    writeFileSync(
      join(tempDir, 'content/receitas/bolo-simples.json'),
      JSON.stringify({ slug: 'bolo-simples' }),
      'utf8'
    );
    git('add', '.');
    git('commit', '-m', 'lote de conteúdo');

    const result = run(['--dry-run', '--since', 'HEAD~1'], {}, tempDir);
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(result.fetches, []);
    assert.deepEqual(dryRunPayload(result.stdout).urlList, [
      `${BASE_URL}/receitas/bolo-simples`,
      `${BASE_URL}/reviews/belive-e-boa`,
      `${BASE_URL}/cupons/belive`,
      `${BASE_URL}/reviews/multi-lojas`,
      `${BASE_URL}/en/reviews/proton-en`,
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/llms.txt`,
    ]);
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test('--since com couponsData.ts alterado manda a página de cada loja ativa que mudou', () => {
  const tempDir = mkdtempSync(join(tmpdir(), 'ecc-indexnow-cupons-'));
  try {
    const git = (...gitArgs) =>
      execFileSync('git', gitArgs, { cwd: tempDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    const coupon = (slug, status, code) =>
      `  {
    offerMode: 'discount-code',
    slug: '${slug}',
    status: '${status}',
    code: '${code}',
  },`;
    const writeCoupons = (header, entries) =>
      writeFileSync(
        join(tempDir, 'src/lib/couponsData.ts'),
        [header, 'const STORE_COUPONS = [', ...entries, '];'].join('\n'),
        'utf8'
      );

    git('init');
    git('config', 'user.name', 'Test');
    git('config', 'user.email', 'test@example.com');
    mkdirSync(join(tempDir, 'src/lib'), { recursive: true });

    writeCoupons('// v1', [coupon('belive', 'ativo', 'MAUAD'), coupon('kopenhagen', 'pausado', 'K10'), coupon('proton', 'ativo', 'P1')]);
    git('add', '.');
    git('commit', '-m', 'base');

    // belive muda o código, gocase entra, kopenhagen muda mas segue pausada, proton fica igual.
    writeCoupons('// v1', [
      coupon('belive', 'ativo', 'MAUAD15'),
      coupon('kopenhagen', 'pausado', 'K15'),
      coupon('proton', 'ativo', 'P1'),
      coupon('gocase', 'ativo', 'CECILIAA'),
    ]);
    git('commit', '-am', 'cupons');

    const stores = run(['--dry-run', '--since', 'HEAD~1'], {}, tempDir);
    assert.equal(stores.status, 0, stores.stderr);
    assert.deepEqual(dryRunPayload(stores.stdout).urlList, [
      `${BASE_URL}/cupons/belive`,
      `${BASE_URL}/cupons/gocase`,
      `${BASE_URL}/cupons`,
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/llms.txt`,
    ]);

    // Mudança só fora dos objetos não aponta loja.
    writeCoupons('// v2', [
      coupon('belive', 'ativo', 'MAUAD15'),
      coupon('kopenhagen', 'pausado', 'K15'),
      coupon('proton', 'ativo', 'P1'),
      coupon('gocase', 'ativo', 'CECILIAA'),
    ]);
    git('commit', '-am', 'comentário');

    const header = run(['--dry-run', '--since', 'HEAD~1'], {}, tempDir);
    assert.equal(header.status, 0, header.stderr);
    assert.deepEqual(dryRunPayload(header.stdout).urlList, [
      `${BASE_URL}/cupons`,
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/llms.txt`,
    ]);
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test('parseActiveCouponSlugsFromSource independe de indentação, quebras de linha ou chaves aninhadas', () => {
  const reformatted = [
    '// Comentário com STORE_COUPONS = [{ slug: "falso", offerMode: "discount-code", status: "ativo" }]',
    'const STORE_COUPONS: Coupon[] = [{status:"ativo",faqs:[{question:"status: \'pausado\'",answer:`slug: \'falso\' ${1 + 1}`}],slug:"belive",offerMode:"discount-code"},',
    '\t{\n\t\tslug: \'kopenhagen\',\n\t\tofferMode: \'discount-code\',\n\t\tstatus: \'pausado\'\n\t},',
    '{offerMode:\'affiliate-link\',slug:\'proton\',productLinks:[{name:\'VPN\',url:\'https://x\',description:\'status: "pausado"\'}],status:\'ativo\'}];',
  ].join('\n');
  assert.deepEqual([...parseActiveCouponSlugsFromSource(reformatted)], ['belive', 'proton']);

  const realSource = readFileSync(fileURLToPath(new URL('../src/lib/couponsData.ts', import.meta.url)), 'utf8');
  const realSlugs = parseActiveCouponSlugsFromSource(realSource);
  assert.ok(realSlugs.has('belive') && realSlugs.has('proton') && realSlugs.has('yesstyle'));
  assert.ok(!realSlugs.has('kopenhagen'));
  assert.ok(realSlugs.size >= 40);
});
