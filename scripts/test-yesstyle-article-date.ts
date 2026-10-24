// A data de conferência dos cupons da YesStyle nos artigos ({yesstyle:verifiedAt}) é a mesma da página da loja.
// Roda depois do build-index: confere o índice gerado contra o content/.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import { resolveYesStylePage } from '@/components/coupons/yesstylePage';
import { LOCALE_KEYS } from '@/lib/i18n/locales';
import { reviewsData } from '@/lib/generated/content-index';
import {
  YESSTYLE_VERIFIED_TOKEN,
  fillYesStyleVerified,
  loadYesStyleVerifiedDates,
} from './content/yesstyle-verified.mjs';

type Review = { slug: string; locale?: string };

const dates = loadYesStyleVerifiedDates();
for (const locale of LOCALE_KEYS) {
  const page = resolveYesStylePage(locale);
  assert.ok(page, `sem página da YesStyle em ${locale}`);
  assert.equal(dates[locale], page.formattedDate, `data de ${locale} diferente da página`);
}

const sample = { slug: 'x', locale: 'en', title: `checked on ${YESSTYLE_VERIFIED_TOKEN}`, list: [{ text: YESSTYLE_VERIFIED_TOKEN }] };
assert.deepEqual(fillYesStyleVerified(sample, dates), {
  ...sample,
  title: `checked on ${dates.en}`,
  list: [{ text: dates.en }],
});
assert.equal(fillYesStyleVerified({ slug: 'x', title: YESSTYLE_VERIFIED_TOKEN }, dates).title, dates.pt);
assert.throws(() => fillYesStyleVerified({ slug: 'x', title: '{yesstyle:codigo}' }, dates), /desconhecida/);
assert.throws(() => fillYesStyleVerified({ slug: 'x', locale: 'xx', title: YESSTYLE_VERIFIED_TOKEN }, dates), /sem data/);

const manifest: string[] = JSON.parse(readFileSync(path.join('content', 'reviews', '_manifest.json'), 'utf8'));
const generated = new Map((reviewsData as Review[]).map((review) => [review.slug, review]));
let withToken = 0;
for (const slug of manifest) {
  const raw = readFileSync(path.join('content', 'reviews', `${slug}.json`), 'utf8');
  const review = generated.get(slug);
  assert.ok(review, `${slug} fora do índice gerado: rode node scripts/content/build-index.mjs`);
  const out = JSON.stringify(review);
  assert.ok(!out.includes('{yesstyle:'), `${slug}: marcação {yesstyle:…} no índice gerado`);
  if (!raw.includes(YESSTYLE_VERIFIED_TOKEN)) continue;
  withToken++;
  const date = dates[review.locale || 'pt'];
  assert.equal(
    out.split(date).length - 1,
    raw.split(YESSTYLE_VERIFIED_TOKEN).length - 1 + raw.split(date).length - 1,
    `${slug}: a data da página não entrou em toda marcação`
  );
}

console.log(`ok yesstyle article date (${withToken} artigos com a data da página)`);
