// Uso: npm run indexnow:submit -- [--dry-run] [--since <ref>] [URL ou caminho...]
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

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

// Lê os objetos de 1º nível de STORE_COUPONS sem depender de indentação, quebras de linha ou ordem de chaves.
export function parseActiveCouponSlugsFromSource(source) {
  const slugs = new Set();
  let i = 0;

  const skipString = (quote) => {
    let out = quote;
    i += 1;
    while (i < source.length) {
      const ch = source[i];
      out += ch;
      if (ch === '\\') {
        i += 1;
        if (i < source.length) out += source[i];
      } else if (ch === quote) {
        i += 1;
        return out;
      } else if (quote === '`' && ch === '$' && source[i + 1] === '{') {
        out += '{';
        i += 2;
        let exprDepth = 1;
        while (i < source.length && exprDepth > 0) {
          const ec = source[i];
          if (ec === "'" || ec === '"' || ec === '`') {
            out += skipString(ec);
            continue;
          }
          out += ec;
          if (ec === '{') exprDepth += 1;
          else if (ec === '}') exprDepth -= 1;
          i += 1;
        }
        continue;
      }
      i += 1;
    }
    return out;
  };

  // Avança até a declaração real de STORE_COUPONS fora de comentários e strings, e abre o '[' do array.
  let foundArrayStart = false;
  while (i < source.length) {
    const ch = source[i];
    const next = source[i + 1];
    if (ch === '/' && next === '/') {
      i += 2;
      while (i < source.length && source[i] !== '\n') i += 1;
      continue;
    }
    if (ch === '/' && next === '*') {
      i += 2;
      while (i < source.length && !(source[i] === '*' && source[i + 1] === '/')) i += 1;
      i += 2;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      skipString(ch);
      continue;
    }
    const decl = /^STORE_COUPONS\b[^=]*=\s*\[/.exec(source.slice(i));
    if (decl && (i === 0 || !/[\w$]/.test(source[i - 1]))) {
      i += decl[0].length;
      foundArrayStart = true;
      break;
    }
    i += 1;
  }
  if (!foundArrayStart) return slugs;

  let arrayDepth = 1;
  let braceDepth = 0;
  let topLevel = '';

  while (i < source.length && arrayDepth > 0) {
    const ch = source[i];
    const next = source[i + 1];
    if (ch === '/' && next === '/') {
      i += 2;
      while (i < source.length && source[i] !== '\n') i += 1;
      continue;
    }
    if (ch === '/' && next === '*') {
      i += 2;
      while (i < source.length && !(source[i] === '*' && source[i + 1] === '/')) i += 1;
      i += 2;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      const literal = skipString(ch);
      if (arrayDepth === 1 && braceDepth === 1) topLevel += literal;
      continue;
    }
    if (ch === '[') {
      arrayDepth += 1;
      i += 1;
      continue;
    }
    if (ch === ']') {
      arrayDepth -= 1;
      i += 1;
      continue;
    }
    if (ch === '{') {
      if (arrayDepth === 1 && braceDepth === 0) topLevel = '';
      braceDepth += 1;
      i += 1;
      continue;
    }
    if (ch === '}') {
      braceDepth -= 1;
      if (arrayDepth === 1 && braceDepth === 0) {
        const offerMode = /\bofferMode\s*:\s*(['"])([^'"]+)\1/.exec(topLevel)?.[2];
        const slug = /\bslug\s*:\s*(['"])([^'"]+)\1/.exec(topLevel)?.[2];
        const status = /\bstatus\s*:\s*(['"])([^'"]+)\1/.exec(topLevel)?.[2];
        if (offerMode && slug && status === 'ativo') slugs.add(slug);
      }
      i += 1;
      continue;
    }
    if (arrayDepth === 1 && braceDepth === 1) topLevel += ch;
    i += 1;
  }
  return slugs;
}

function readActiveCouponSlugs() {
  const slugs = existsSync('src/lib/couponsData.ts')
    ? parseActiveCouponSlugsFromSource(readFileSync('src/lib/couponsData.ts', 'utf8'))
    : new Set();
  if (existsSync('data/coupons/yesstyle.json')) {
    try {
      const ys = JSON.parse(readFileSync('data/coupons/yesstyle.json', 'utf8'));
      if (Array.isArray(ys) && ys.some((item) => item.status === 'active')) slugs.add('yesstyle');
    } catch {
      // ignora JSON inválido em fixture parcial
    }
  }
  return slugs;
}

function resolveUrlsSinceGitRef(ref) {
  let diffOutput = '';
  try {
    diffOutput = execFileSync('git', ['diff', '--name-only', '--diff-filter=ACMR', ref, 'HEAD'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch (error) {
    console.error(`Não foi possível ler git diff desde "${ref}": ${error.message}`);
    console.error('Nada foi enviado ao IndexNow.');
    process.exit(1);
  }

  const changedFiles = diffOutput.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const activeCouponSlugs = readActiveCouponSlugs();
  const resolved = [];
  let touchedCoupons = false;

  for (const file of changedFiles) {
    if (file.startsWith('content/reviews/') && file.endsWith('.json') && !file.endsWith('/_manifest.json')) {
      if (!existsSync(file)) continue;
      const data = JSON.parse(readFileSync(file, 'utf8'));
      if (data.draft || data.hideFromListings) continue;
      const slug = data.slug || basename(file, '.json');
      const locale = data.locale && data.locale !== 'pt' ? data.locale : null;
      resolved.push(locale ? `/${locale}/reviews/${slug}` : `/reviews/${slug}`);
      if (!locale && data.affiliate) {
        const affiliates = Array.isArray(data.affiliate) ? data.affiliate : [data.affiliate];
        for (const affiliate of affiliates) {
          if (typeof affiliate === 'string' && activeCouponSlugs.has(affiliate)) {
            resolved.push(`/cupons/${affiliate}`);
          }
        }
      }
      continue;
    }
    if (file.startsWith('content/receitas/') && file.endsWith('.json') && !file.endsWith('/_manifest.json')) {
      if (!existsSync(file)) continue;
      const data = JSON.parse(readFileSync(file, 'utf8'));
      if (data.draft) continue;
      const slug = data.slug || basename(file, '.json');
      resolved.push(`/receitas/${slug}`);
      continue;
    }
    if (file === 'src/lib/couponsData.ts' || file === 'src/lib/couponTranslations.ts') {
      touchedCoupons = true;
    }
    if (file === 'data/coupons/yesstyle.json') {
      touchedCoupons = true;
      resolved.push('/cupons/yesstyle');
    }
  }

  if (touchedCoupons) {
    resolved.push('/cupons');
  }
  if (resolved.length > 0) {
    resolved.push('/sitemap.xml', '/llms.txt');
  }
  return resolved;
}

async function main() {
  const rawArgs = process.argv.slice(2);
  let sinceRef = null;
  const positionalArgs = [];

  for (let i = 0; i < rawArgs.length; i += 1) {
    const arg = rawArgs[i];
    if (arg === '--dry-run') continue;
    if (arg === '--since') {
      const next = rawArgs[i + 1];
      if (!next || next.startsWith('-')) {
        console.error('Faltou a referência git após --since (ex.: --since HEAD~1).');
        console.error('Nada foi enviado ao IndexNow.');
        process.exit(1);
      }
      sinceRef = next;
      i += 1;
      continue;
    }
    // Argumento com "-" na frente é opção, nunca caminho: em 06/10/2026, antes de existir o
    // --dry-run, ele virou https://emcasacomcecilia.com/--dry-run e foi enviado ao IndexNow.
    if (arg.startsWith('-')) {
      console.error(`Opção desconhecida: ${arg}`);
      console.error('As únicas opções aceitas são --dry-run e --since <ref>. Nada foi enviado ao IndexNow.');
      process.exit(1);
    }
    positionalArgs.push(arg);
  }

  // O Git Bash (MSYS) converte /caminho antes de o script recebê-lo: /sitemap.xml chega como
  // C:/Program Files/Git/sitemap.xml e /a como A:/, e o normalizeUrl os mandaria ao IndexNow.
  const windowsPath = positionalArgs.find((arg) => /^[a-z]:/i.test(arg));
  if (windowsPath) {
    console.error(`Caminho do Windows: ${windowsPath}`);
    console.error('Use a URL completa: o Git Bash converte /caminho em caminho do Windows.');
    console.error('Nada foi enviado ao IndexNow.');
    process.exit(1);
  }

  // Argumento com esquema (https:, http:, ftp:...) é URL completa e só passa se for do próprio site:
  // o IndexNow responde 422 a URL de outro host (www. e cdn. incluídos), e a http:// só redireciona.
  const foreignUrl = positionalArgs.find((arg) => /^[a-z][a-z\d+.-]*:/i.test(arg) && !isSiteUrl(arg));
  if (foreignUrl) {
    console.error(`URL fora do site: ${foreignUrl}`);
    console.error(`Só valem URLs ${BASE_URL}/... e caminhos do site, como /reviews/...`);
    console.error('Nada foi enviado ao IndexNow.');
    process.exit(1);
  }

  // Sem o `--` (npm run indexnow:submit --dry-run), o npm fica com a opção, deixa só
  // npm_config_dry_run=true no ambiente e roda o script assim mesmo; o ensaio vale igual.
  const dryRun = rawArgs.includes('--dry-run') || process.env.npm_config_dry_run === 'true';
  const sinceUrls = sinceRef ? resolveUrlsSinceGitRef(sinceRef) : [];
  const inputUrls = [...sinceUrls, ...positionalArgs];
  const urlList = (inputUrls.length ? inputUrls : sinceRef ? [] : ['/', '/sitemap.xml', '/llms.txt'])
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
}

if (typeof import.meta?.url === 'string' && process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
