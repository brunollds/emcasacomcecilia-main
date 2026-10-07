// Uso: npm run indexnow:submit -- [--dry-run] [URL ou caminho...]
const HOST = 'emcasacomcecilia.com';
const BASE_URL = `https://${HOST}`;
const INDEXNOW_KEY = '126de38625a040d1a5e45c6a08aabe46';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

// Esquema e host valem em maiúsculas ou minúsculas. Depois do host só pode vir /, ? ou #, o que
// barra emcasacomcecilia.com.exemplo.com e porta explícita.
function isSiteUrl(input) {
  const rest = input.slice(BASE_URL.length);
  return input.toLowerCase().startsWith(BASE_URL) && (rest === '' || /^[/?#]/.test(rest));
}

function normalizeUrl(input) {
  if (!input) return null;

  if (isSiteUrl(input)) {
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

// O Git Bash (MSYS) converte /caminho antes de o script recebê-lo: /sitemap.xml chega como
// C:/Program Files/Git/sitemap.xml e /a como A:/, e o normalizeUrl os mandaria ao IndexNow.
const windowsPath = args.find((arg) => /^[a-z]:/i.test(arg));
if (windowsPath) {
  console.error(`Caminho do Windows: ${windowsPath}`);
  console.error('Use a URL completa: o Git Bash converte /caminho em caminho do Windows.');
  console.error('Nada foi enviado ao IndexNow.');
  process.exit(1);
}

// Argumento com esquema (https:, http:, ftp:...) é URL completa e só passa se for do próprio site:
// o IndexNow responde 422 a URL de outro host (www. e cdn. incluídos), e a http:// só redireciona.
const foreignUrl = args.find((arg) => /^[a-z][a-z\d+.-]*:/i.test(arg) && !isSiteUrl(arg));
if (foreignUrl) {
  console.error(`URL fora do site: ${foreignUrl}`);
  console.error(`Só valem URLs ${BASE_URL}/... e caminhos do site, como /reviews/...`);
  console.error('Nada foi enviado ao IndexNow.');
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
