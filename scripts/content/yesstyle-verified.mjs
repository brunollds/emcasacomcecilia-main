import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const PRINT_SCRIPT = fileURLToPath(new URL('./print-yesstyle-verified.ts', import.meta.url));
const PROJECT_ROOT = fileURLToPath(new URL('../../', import.meta.url));

// Marcação que os artigos usam para a data de conferência dos cupons da YesStyle.
export const YESSTYLE_VERIFIED_TOKEN = '{yesstyle:verifiedAt}';

// A data de cada idioma ({ pt: '24 de outubro de 2026', ... }), lida do data/coupons/yesstyle.json pelo
// mesmo código da página da loja. Como em locale-search-stores.mjs, o tsx roda num processo à parte.
export function loadYesStyleVerifiedDates() {
  const output = execFileSync(process.execPath, [require.resolve('tsx/cli'), PRINT_SCRIPT], {
    cwd: PROJECT_ROOT,
    encoding: 'utf8',
  });
  return JSON.parse(output);
}

// Troca a marcação em todo texto do artigo pela data do idioma dele (sem `locale`, o artigo é PT).
// Marcação que sobra, ou outra {yesstyle:…} desconhecida, para o build.
export function fillYesStyleVerified(review, dates) {
  const locale = review.locale || 'pt';
  const fill = (value) => {
    if (typeof value === 'string') {
      if (!value.includes('{yesstyle:')) return value;
      const date = dates[locale];
      if (!date) throw new Error(`sem data da YesStyle para o idioma ${locale} (${review.slug})`);
      const filled = value.split(YESSTYLE_VERIFIED_TOKEN).join(date);
      if (filled.includes('{yesstyle:')) throw new Error(`marcação {yesstyle:…} desconhecida em ${review.slug}`);
      return filled;
    }
    if (Array.isArray(value)) return value.map(fill);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fill(v)]));
    return value;
  };
  return fill(review);
}
