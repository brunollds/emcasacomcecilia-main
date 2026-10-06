// Uso: npm run indexnow:submit -- [--dry-run] [URL ou caminho...]
const HOST = 'emcasacomcecilia.com';
const BASE_URL = `https://${HOST}`;
const INDEXNOW_KEY = '126de38625a040d1a5e45c6a08aabe46';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

function normalizeUrl(input) {
  if (!input) return null;

  if (/^https?:\/\//i.test(input)) {
    return input;
  }

  const path = input.startsWith('/') ? input : `/${input}`;
  return `${BASE_URL}${path}`;
}

const args = process.argv.slice(2);

// Argumento com "-" na frente é opção, nunca caminho: em 06/10/2026, antes de existir o
// --dry-run, ele virou https://emcasacomcecilia.com/--dry-run e foi enviado ao IndexNow.
const unknownOption = args.find((arg) => arg.startsWith('-') && arg !== '--dry-run');
if (unknownOption) {
  console.error(`Opção desconhecida: ${unknownOption}`);
  console.error('A única opção aceita é --dry-run. Nada foi enviado ao IndexNow.');
  process.exit(1);
}

// Sem o `--` (npm run indexnow:submit --dry-run), o npm fica com a opção, deixa só
// npm_config_dry_run=true no ambiente e roda o script assim mesmo; o ensaio vale igual.
const dryRun = args.includes('--dry-run') || process.env.npm_config_dry_run === 'true';
const inputUrls = args.filter((arg) => arg !== '--dry-run');
const urlList = (inputUrls.length ? inputUrls : ['/', '/sitemap.xml', '/llms.txt'])
  .map(normalizeUrl)
  .filter(Boolean);

if (urlList.length === 0) {
  console.error('Nenhuma URL para enviar ao IndexNow.');
  process.exit(1);
}

const payload = {
  host: HOST,
  key: INDEXNOW_KEY,
  keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
  urlList: [...new Set(urlList)],
};

if (dryRun) {
  console.log('--dry-run: nada foi enviado ao IndexNow.');
  console.log(JSON.stringify(payload, ['host', 'keyLocation', 'urlList'], 2));
} else {
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    console.error(`IndexNow falhou: HTTP ${response.status} ${detail}`.trim());
    process.exit(1);
  }

  console.log(`IndexNow OK: ${payload.urlList.length} URL(s) enviadas.`);
  for (const url of payload.urlList) {
    console.log(`- ${url}`);
  }
}
