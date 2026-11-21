// Base de direção (RTL): as páginas que existem fora do português usam os utilitários lógicos do Tailwind
// (ms-, pe-, start-, text-end…), que espelham sozinhos quando o documento é da direita para a esquerda. Este teste
// lê os arquivos-fonte, sem build, e barra a volta dos físicos. Barra também o elemento com lang sem dir e o idioma
// sem dir no registro. O que a regra não reconhece como legítimo fica em rtl-physical-baseline.json, que só encolhe.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { LOCALES } from '@/lib/i18n/locales';

const ROOT = process.cwd();
const BASELINE_PATH = 'scripts/rtl-physical-baseline.json';

// Pastas inteiras e arquivos soltos das páginas multi-idioma. Além deles entra, pelos imports, todo componente que as
// rotas fora do PT alcançam: componente novo importado por uma delas entra sozinho.
const SCOPE_DIRS = ['header', 'language', 'search', 'notFound', 'shared', 'ui', 'editorial', 'review', 'coupons', 'faqs'];
const SCOPE_FILES = [
  'Navbar.js', 'Footer.js', 'ConsentBanner.tsx', 'OmniSearch.js', 'RootLayoutShell.tsx', 'YesStyleCouponPage.tsx',
  'CouponComponents.tsx', 'ReviewInlineImage.js',
  'sections/LocaleHomePage.tsx', 'sections/HomeCeciliaPanel.tsx', 'sections/CeciliaProfile.tsx',
  'sections/CertificateDialog.tsx', 'sections/HomeEvent.tsx', 'sections/EventGuidesExpander.tsx',
  'sections/HomeLatest.tsx', 'sections/HomeStoreStories.tsx', 'sections/HomeStoreStrip.tsx',
  'reviews/ReviewShelfCard.tsx', 'reviews/TrackedReviewsLink.tsx', 'reviews/shelfClasses.ts',
];
// Só do PT (/buscar).
const OUT_OF_SCOPE = new Set(['src/components/search/SearchView.tsx']);

const SOURCE = /\.(tsx?|jsx?|mjs)$/;

type Physical = { token: string; line: number; lineText: string; suggestion: string };
type BaselineEntry = { file: string; match: string; reason: string };

function rel(file: string): string {
  return path.relative(ROOT, file).split(path.sep).join('/');
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return SOURCE.test(entry.name) ? [rel(full)] : [];
  });
}

// Troca os comentários por espaços, mantendo as quebras de linha (e os números de linha). Aspas simples e duplas
// fecham na quebra de linha: um apóstrofo solto num texto JSX só confunde a própria linha.
export function stripComments(source: string): string {
  const out = source.split('');
  const blank = (from: number, to: number) => {
    for (let k = from; k < to; k++) if (out[k] !== '\n') out[k] = ' ';
  };
  const stack: Array<'code' | 'tpl'> = ['code'];
  const braces: number[] = [0];
  let quote: '"' | "'" | null = null;
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    const mode = stack[stack.length - 1];
    if (quote) {
      if (ch === '\\') i++;
      else if (ch === quote || ch === '\n') quote = null;
      continue;
    }
    if (mode === 'tpl') {
      if (ch === '\\') i++;
      else if (ch === '`') stack.pop();
      else if (ch === '$' && source[i + 1] === '{') {
        stack.push('code');
        braces.push(0);
        i++;
      }
      continue;
    }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === '`') stack.push('tpl');
    else if (ch === '{') braces[braces.length - 1]++;
    else if (ch === '}') {
      if (braces[braces.length - 1] === 0 && stack.length > 1) {
        stack.pop();
        braces.pop();
      } else braces[braces.length - 1]--;
    } else if (ch === '/' && source[i + 1] === '/') {
      const end = source.indexOf('\n', i);
      const stop = end === -1 ? source.length : end;
      blank(i, stop);
      i = stop - 1;
    } else if (ch === '/' && source[i + 1] === '*') {
      const end = source.indexOf('*/', i + 2);
      const stop = end === -1 ? source.length : end + 2;
      blank(i, stop);
      i = stop - 1;
    }
  }
  return out.join('');
}

// Um token de classe: variantes (md:, group-hover:, [&>svg]:, data-[x=y]:), "!" e "-" opcionais e a base. Os valores
// são os do Tailwind (número, fração, px, auto, full, [arbitrário], (variável)), para "right-click" ou uma chave
// `left:` de objeto não contarem.
const DELIM = `\\s"'\`{}(),`;
const VALUE = String.raw`(?:\d+(?:\.\d+)?|\d+\/\d+|px|auto|full|\[[^\]\s]+\]|\([^)\s]+\))`;
const BASE = String.raw`(?:[mp][lr]-${VALUE}|(?:left|right)-${VALUE}|text-(?:left|right)|float-(?:left|right)|border-[lr](?:-[^${DELIM}]+)?|rounded-[lr](?:-[^${DELIM}]+)?)`;
const TOKEN = new RegExp(
  String.raw`(?<=^|[${DELIM}])((?:\[[^\]\s]*\]:|[^${DELIM}:]+:)*)(!?)(-?)(${BASE})(!?)(?=$|[${DELIM}])`,
  'gm'
);
const ANY_TOKEN = /[^\s"'`{}(),]+/g;

function parseToken(token: string) {
  const m = new RegExp(`^${TOKEN.source}$`).exec(token);
  return m ? { variants: m[1], before: m[2], negative: m[3], base: m[4], after: m[5] } : null;
}

function rebuild(token: string, swap: (base: string) => string): string {
  const parsed = parseToken(token);
  if (!parsed) return token;
  return `${parsed.variants}${parsed.before}${parsed.negative}${swap(parsed.base)}${parsed.after}`;
}

// l ↔ r, left ↔ right, só no nome do utilitário.
function mirror(base: string): string {
  return base.replace(/^(m|p|border-|rounded-)([lr])(?=-|$)/, (_, p, side) => p + (side === 'l' ? 'r' : 'l'))
    .replace(/^(text-|float-)?(left|right)/, (_, p = '', side) => p + (side === 'left' ? 'right' : 'left'));
}

export function logicalOf(token: string): string {
  return rebuild(token, (base) => base
    .replace(/^([mp])([lr])-/, (_, p, side) => `${p}${side === 'l' ? 's' : 'e'}-`)
    .replace(/^(border-|rounded-)([lr])(?=-|$)/, (_, p, side) => p + (side === 'l' ? 's' : 'e'))
    .replace(/^(text-|float-)(left|right)$/, (_, p, side) => p + (side === 'left' ? 'start' : 'end'))
    .replace(/^(left|right)-/, (_, side) => (side === 'left' ? 'start-' : 'end-')));
}

// Legítimo pela regra: o par simétrico na mesma string (left-0 right-0, ml-2 mr-2), a centralização (left-1/2 com
// -translate-x-1/2) e a marca d'água centrada mais larga que a caixa (-left-[N%] com w-[(100 + 2N)%]).
function isSymmetric(token: string, siblings: string[]): boolean {
  const { variants, negative, base } = parseToken(token)!;
  if (siblings.includes(rebuild(token, mirror))) return true;
  if (!negative && base === 'left-1/2' && siblings.includes(`${variants}-translate-x-1/2`)) return true;
  if (!negative && base === 'right-1/2' && siblings.includes(`${variants}translate-x-1/2`)) return true;
  const watermark = /^left-\[(\d+(?:\.\d+)?)%\]$/.exec(base);
  if (negative && watermark) {
    const width = 100 + 2 * Number(watermark[1]);
    return siblings.includes(`${variants}w-[${width}%]`);
  }
  return false;
}

// A string de classes que contém a posição: o trecho entre aspas, crases, chaves e quebras de linha.
function segmentAt(text: string, index: number): string {
  const isDelim = (ch: string) => ch === '"' || ch === "'" || ch === '`' || ch === '{' || ch === '}' || ch === '\n';
  let start = index;
  while (start > 0 && !isDelim(text[start - 1])) start--;
  let end = index;
  while (end < text.length && !isDelim(text[end])) end++;
  return text.slice(start, end);
}

export function findPhysical(source: string): Physical[] {
  const text = stripComments(source);
  const lines = source.split('\n');
  const found: Physical[] = [];
  for (const m of text.matchAll(TOKEN)) {
    const token = m[0];
    const siblings = segmentAt(text, m.index!).match(ANY_TOKEN) ?? [];
    if (isSymmetric(token, siblings)) continue;
    const line = text.slice(0, m.index).split('\n').length;
    found.push({ token, line, lineText: lines[line - 1], suggestion: logicalOf(token) });
  }
  return found;
}

// Elemento HTML (tag minúscula) com lang e sem dir. Componentes (<Navbar lang={lang} />) recebem lang como prop.
export function findLangWithoutDir(source: string): number[] {
  const text = stripComments(source);
  const lines: number[] = [];
  for (const m of text.matchAll(/(?<=[\s{])lang=/g)) {
    const open = text.lastIndexOf('<', m.index);
    if (open === -1 || !/^<[a-z][\w-]*\s/.test(text.slice(open, open + 40))) continue;
    let depth = 0;
    let end = open;
    for (; end < text.length; end++) {
      const ch = text[end];
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
      else if (ch === '>' && depth === 0) break;
    }
    if (!/\sdir=/.test(text.slice(open, end))) lines.push(text.slice(0, m.index).split('\n').length);
  }
  return lines;
}

// O que as rotas fora do português importam, de componente em componente.
function reachableComponents(): string[] {
  const exts = ['', '.ts', '.tsx', '.js', '.jsx', '.mjs', '/index.ts', '/index.tsx', '/index.js'];
  const resolve = (from: string, spec: string): string | null => {
    let base: string;
    if (spec.startsWith('@/')) base = path.join('src', spec.slice(2));
    else if (spec.startsWith('.')) base = path.join(path.dirname(from), spec);
    else return null;
    for (const ext of exts) {
      const candidate = base + ext;
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate.split(path.sep).join('/');
    }
    return null;
  };
  const appDirs = fs.readdirSync('src/app', { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== '(pt)' && entry.name !== 'api')
    .map((entry) => path.join('src/app', entry.name));
  const stack = [...appDirs.flatMap(walk), 'src/app/global-not-found.js'];
  const seen = new Set<string>();
  while (stack.length) {
    const file = stack.pop()!;
    if (seen.has(file)) continue;
    seen.add(file);
    const source = fs.readFileSync(file, 'utf8');
    for (const m of source.matchAll(/(?:import|export)\s+(type\s+)?(?:[^'"]*?\s+from\s+)?['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)/g)) {
      if (m[1]) continue;
      const target = resolve(file, m[2] ?? m[3]);
      if (target) stack.push(target);
    }
  }
  return [...seen].filter((file) => file.startsWith('src/components/'));
}

function selfTest() {
  const tokens = (source: string) => findPhysical(source).map((p) => `${p.token} → ${p.suggestion}`);
  assert.deepEqual(tokens(`<div className="ml-4 p-2" />`), ['ml-4 → ms-4']);
  assert.deepEqual(tokens(`cn('absolute md:left-auto', open && "group-hover:-mr-2")`), ['md:left-auto → md:start-auto', 'group-hover:-mr-2 → group-hover:-me-2']);
  assert.deepEqual(tokens(`'text-right border-l-4 rounded-r-lg float-left pl-[3px]'`), [
    'text-right → text-end', 'border-l-4 → border-s-4', 'rounded-r-lg → rounded-e-lg', 'float-left → float-start', 'pl-[3px] → ps-[3px]',
  ]);
  assert.deepEqual(tokens(`"left-0 md:right-0"`), ['left-0 → start-0', 'md:right-0 → md:end-0']);
  assert.deepEqual(tokens(`"-left-[10%] w-[110%]"`), ['-left-[10%] → -start-[10%]']);
  for (const legit of [
    `"absolute bottom-0 left-0 right-0"`,
    `'absolute left-3 right-3 top-2'`,
    `"absolute left-1/2 -translate-x-1/2"`,
    `"md:left-1/2 md:-translate-x-1/2"`,
    `className="-left-[10%] top-1 h-24 w-[120%]"`,
    `const MAGNET_SIDE = { left: 'a', right: 'b' }; const left = 1; side === 'right'`,
    `// ml-4 só no comentário\n{/* text-left */}`,
    `'rounded-lg border-lime-500 place-items-center prose ms-4 text-start'`,
    `<p>Click right-click left-handed</p>`,
  ]) {
    assert.deepEqual(tokens(legit), [], `autoteste: acusou o legítimo ${legit}`);
  }
  assert.deepEqual(findLangWithoutDir(`<span className="x" lang={l.htmlLang}>a</span>`), [1]);
  assert.deepEqual(findLangWithoutDir(`<a\n  href={x}\n  lang={l}\n>`), [3]);
  assert.deepEqual(findLangWithoutDir(`<p lang={l} dir={LOCALES[x].dir}>`), []);
  assert.deepEqual(findLangWithoutDir(`<Navbar lang={lang} />`), []);
}

selfTest();

const reachable = reachableComponents();
const scope = [...new Set([
  ...SCOPE_DIRS.flatMap((dir) => walk(path.join('src/components', dir))),
  ...SCOPE_FILES.map((file) => `src/components/${file}`),
  ...reachable,
])].filter((file) => !OUT_OF_SCOPE.has(file)).sort();

const errors: string[] = [];
for (const file of SCOPE_FILES) {
  if (!fs.existsSync(path.join('src/components', file))) errors.push(`src/components/${file}: arquivo da lista do escopo não existe mais; tire-o de SCOPE_FILES`);
}

const baseline: BaselineEntry[] = JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'));
const used = new Set<BaselineEntry>();
for (const file of scope) {
  for (const hit of findPhysical(fs.readFileSync(file, 'utf8'))) {
    const entry = baseline.find((e) => e.file === file && hit.lineText.includes(e.match) && e.match.includes(hit.token));
    if (entry) {
      used.add(entry);
      continue;
    }
    errors.push(`${file}:${hit.line}: utilitário físico ${hit.token} → ${hit.suggestion}`);
  }
}
for (const entry of baseline) {
  if (!entry.reason) errors.push(`${BASELINE_PATH}: exceção sem motivo (${entry.file}, "${entry.match}")`);
  if (!used.has(entry)) errors.push(`${BASELINE_PATH}: a exceção de ${entry.file} ("${entry.match}") não casa com mais nada; apague-a`);
}

const components = walk('src/components');
for (const file of components) {
  for (const line of findLangWithoutDir(fs.readFileSync(file, 'utf8'))) {
    errors.push(`${file}:${line}: elemento com lang e sem dir; acrescente dir={LOCALES[…].dir} no mesmo elemento`);
  }
}

for (const [key, config] of Object.entries(LOCALES)) {
  if (config.dir !== 'ltr' && config.dir !== 'rtl') errors.push(`src/lib/i18n/locales.ts: o idioma ${key} não tem dir 'ltr' ou 'rtl'`);
}
if (LOCALES.ar.dir !== 'rtl') errors.push(`src/lib/i18n/locales.ts: o árabe não está com dir 'rtl'`);

// Idioma da direita para a esquerda (árabe, hoje) tem a regra de tipografia no globals.css: sem espaçamento entre
// letras, que quebra as ligaduras, e sem maiúsculas.
const GLOBALS_CSS = 'src/app/globals.css';
const css = stripComments(fs.readFileSync(GLOBALS_CSS, 'utf8'));
for (const [key, config] of Object.entries(LOCALES)) {
  if (config.dir !== 'rtl') continue;
  const lang = config.htmlLang.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&');
  const rule = new RegExp(`:lang\\(${lang}\\)\\s*\\{[^}]*letter-spacing:\\s*normal;[^}]*text-transform:\\s*none`);
  if (!rule.test(css)) errors.push(`${GLOBALS_CSS}: o idioma ${key} é rtl e falta a regra :lang(${config.htmlLang}) com letter-spacing: normal e text-transform: none`);
}

if (errors.length > 0) {
  console.error(`❌ test:rtl: ${errors.length} problema(s)\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  process.exit(1);
}

console.log(
  `✅ test:rtl: ${scope.length} arquivos das páginas multi-idioma sem utilitário físico de direção ` +
  `(${baseline.length} exceção(ões) em ${BASELINE_PATH}); lang com dir em ${components.length} componentes; ` +
  `${Object.keys(LOCALES).length} idiomas com dir.`
);
