// Exporta TODOS os artigos do data.ts para content/ (1 JSON por artigo) +
// manifestos de ordem. Fail-loud (spec §3.3): aborta em corrupção
// (função, BigInt, Symbol, circular, não-plain, slug inválido/duplicado);
// warnings do conteúdo migram como estão (spec §3.4).
// Uso: npx tsx scripts/content/export-content.ts
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { recipes, reviews } from '@/lib/data';

// ——— guards herdados do spike (0.5) ———
function assertExportable(value: unknown, trail: string, seen = new WeakSet<object>()): void {
  if (typeof value === 'function') throw new Error(`função em ${trail}`);
  if (typeof value === 'bigint') throw new Error(`BigInt em ${trail}`);
  if (value === null || typeof value !== 'object') return;
  if (seen.has(value)) throw new Error(`referência circular em ${trail}`);
  seen.add(value);
  // Symbol keys: Object.entries as descartaria em SILÊNCIO — abortar (spec §5).
  if (Object.getOwnPropertySymbols(value).length > 0) {
    throw new Error(`chave Symbol em ${trail} — não representável em JSON`);
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => assertExportable(item, `${trail}[${i}]`, seen));
    return;
  }
  const proto = Object.getPrototypeOf(value);
  if (proto !== Object.prototype && proto !== null) {
    throw new Error(`objeto não-plain (${(value as object).constructor?.name}) em ${trail}`);
  }
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    assertExportable(entry, `${trail}.${key}`, seen);
  }
}

// Round-trip: undefined ≡ ausente (colapsação inócua — o diff exaustivo prova);
// qualquer outra divergência aborta.
function assertRoundtrip(original: unknown, restored: unknown, trail = '$'): void {
  if (original === undefined) return;
  if (original === null || typeof original !== 'object') {
    if (!Object.is(original, restored)) {
      throw new Error(`infidelidade em ${trail}: ${String(original)} -> ${String(restored)}`);
    }
    return;
  }
  if (Array.isArray(original)) {
    if (!Array.isArray(restored) || restored.length !== original.length) {
      throw new Error(`array divergente em ${trail}`);
    }
    original.forEach((item, i) =>
      assertRoundtrip(item, (restored as unknown[])[i], `${trail}[${i}]`)
    );
    return;
  }
  const restoredObj = (restored ?? {}) as Record<string, unknown>;
  for (const [key, value] of Object.entries(original as Record<string, unknown>)) {
    assertRoundtrip(value, restoredObj[key], `${trail}.${key}`);
  }
}

// ——— guards novos (escala) ———
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/; // filesystem-safe; acento/especial aborta
function exportAll(items: { slug: string }[], kind: string, dir: string): string[] {
  mkdirSync(dir, { recursive: true });
  const order: string[] = [];
  const seenSlugs = new Set<string>();
  for (const item of items) {
    const { slug } = item;
    if (!slug) throw new Error(`${kind} sem slug (id=${(item as { id?: unknown }).id})`);
    if (!SLUG_RE.test(slug)) throw new Error(`${kind} slug inválido pra arquivo: "${slug}"`);
    if (seenSlugs.has(slug)) throw new Error(`${kind} slug DUPLICADO: "${slug}"`);
    seenSlugs.add(slug);
    assertExportable(item, `${kind}(${slug})`);
    const json = JSON.stringify(item, null, 2);
    assertRoundtrip(item, JSON.parse(json));
    writeFileSync(path.join(dir, `${slug}.json`), json + '\n');
    order.push(slug);
  }
  // Manifesto: a ORDEM original do array é contrato (listagens/sitemap
  // iteram sem sort — verificado na spec §7). O índice lê daqui, nunca readdir.
  writeFileSync(path.join(dir, '_manifest.json'), JSON.stringify(order, null, 2) + '\n');
  console.log(`ok ${order.length} ${kind} em ${dir} (+ _manifest.json)`);
  return order;
}

exportAll(recipes, 'recipe', path.join('content', 'receitas'));
exportAll(reviews, 'review', path.join('content', 'reviews'));
