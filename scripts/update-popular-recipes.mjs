import { createSign } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const {
  GA_PROPERTY_ID,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  GA_POPULAR_RECIPES_ENABLED,
  GA_POPULAR_RECIPES_ACTIVATE_AFTER,
} = process.env;

const outputPath = path.join(process.cwd(), 'public', 'data', 'popular-recipes.json');

function shouldRun() {
  if (GA_POPULAR_RECIPES_ENABLED !== 'true') {
    console.log('GA popular recipes disabled. Set GA_POPULAR_RECIPES_ENABLED=true to enable.');
    return false;
  }

  if (!GA_POPULAR_RECIPES_ACTIVATE_AFTER) {
    return true;
  }

  const activationDate = new Date(`${GA_POPULAR_RECIPES_ACTIVATE_AFTER}T00:00:00.000Z`);

  if (Number.isNaN(activationDate.getTime())) {
    throw new Error('Invalid GA_POPULAR_RECIPES_ACTIVATE_AFTER. Use YYYY-MM-DD.');
  }

  if (Date.now() < activationDate.getTime()) {
    console.log(`GA popular recipes not active yet. Activation date: ${GA_POPULAR_RECIPES_ACTIVATE_AFTER}.`);
    return false;
  }

  return true;
}

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function createJwt() {
  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    throw new Error('Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY.');
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: GOOGLE_CLIENT_EMAIL,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const unsignedToken = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claim))}`;
  const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
  const signature = createSign('RSA-SHA256').update(unsignedToken).sign(privateKey);

  return `${unsignedToken}.${base64url(signature)}`;
}

async function getAccessToken() {
  const jwt = createJwt();
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google auth failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.access_token;
}

function slugFromPath(pagePath) {
  const match = pagePath.match(/^\/receitas\/([^/?#]+)/);
  return match?.[1];
}

async function fetchPopularRecipeSlugs(accessToken) {
  if (!GA_PROPERTY_ID) {
    throw new Error('Missing GA_PROPERTY_ID.');
  }

  const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${GA_PROPERTY_ID}:runReport`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: {
            matchType: 'BEGINS_WITH',
            value: '/receitas/',
          },
        },
      },
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 30,
    }),
  });

  if (!response.ok) {
    throw new Error(`GA report failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const slugs = [];
  const seen = new Set();

  for (const row of data.rows || []) {
    const pagePath = row.dimensionValues?.[0]?.value;
    const slug = slugFromPath(pagePath || '');

    if (slug && !seen.has(slug)) {
      seen.add(slug);
      slugs.push(slug);
    }
  }

  return slugs;
}

async function main() {
  if (!shouldRun()) {
    return;
  }

  const accessToken = await getAccessToken();
  const slugs = await fetchPopularRecipeSlugs(accessToken);
  const payload = {
    generatedAt: new Date().toISOString(),
    source: 'ga4',
    rangeDays: 30,
    slugs,
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

  console.log(`Wrote ${slugs.length} popular recipe slugs to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
