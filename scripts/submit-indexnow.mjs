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

const inputUrls = process.argv.slice(2);
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
