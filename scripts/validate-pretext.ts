// Validação isolada da infraestrutura Pretext.
// Não importa React nem componentes de browser.

import { prepare, layout, prepareWithSegments, clearCache } from '@chenglou/pretext';
import {
  prepareRichInline,
  measureRichInlineStats,
} from '@chenglou/pretext/rich-inline';

interface ValidationResult {
  ok: boolean;
  skipped?: boolean;
  message: string;
}

const results: ValidationResult[] = [];

function report(ok: boolean, message: string): void {
  results.push({ ok, message });
}

function reportSkipped(message: string): void {
  results.push({ ok: true, skipped: true, message });
}

function isFiniteNumber(value: unknown): boolean {
  return typeof value === 'number' && Number.isFinite(value);
}

function hasCanvas(): boolean {
  if (typeof window === 'undefined') return false;
  const canvas = document.createElement('canvas');
  return canvas.getContext('2d') !== null;
}

const canvasAvailable = hasCanvas();

// ---------------------------------------------------------------------------
// 1. Importações
// ---------------------------------------------------------------------------

try {
  report(
    typeof prepare === 'function' &&
      typeof layout === 'function' &&
      typeof clearCache === 'function',
    'Importa funções principais de @chenglou/pretext'
  );
} catch (err) {
  report(false, `Falha ao importar @chenglou/pretext: ${err instanceof Error ? err.message : String(err)}`);
}

try {
  report(
    typeof prepareRichInline === 'function' &&
      typeof measureRichInlineStats === 'function',
    'Importa funções de @chenglou/pretext/rich-inline'
  );
} catch (err) {
  report(false, `Falha ao importar rich-inline: ${err instanceof Error ? err.message : String(err)}`);
}

// ---------------------------------------------------------------------------
// 2. Testes de prepare() e layout()
// ---------------------------------------------------------------------------

const font = '16px Montserrat, sans-serif';
const lineHeight = 24;
const width = 320;

const testTexts = {
  portuguese: 'Bolo de cenoura com cobertura de chocolate — receita fácil e deliciosa.',
  empty: '',
  accents: 'Açúcar, canela, limão, caju, pão de queijo, maçã.',
};

for (const [name, text] of Object.entries(testTexts)) {
  if (!canvasAvailable) {
    reportSkipped(`prepare() + layout() com texto "${name}" — requer Canvas (não disponível no Node)`);
    continue;
  }

  try {
    const prepared = prepare(text, font);
    const result = layout(prepared, width, lineHeight);
    report(
      isFiniteNumber(result.height) && isFiniteNumber(result.lineCount),
      `prepare() + layout() com texto "${name}" retornam altura e linhas finitas`
    );
  } catch (err) {
    report(
      false,
      `prepare() + layout() com texto "${name}" falhou: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

// ---------------------------------------------------------------------------
// 3. prepareWithSegments com acentos e cedilha
// ---------------------------------------------------------------------------

if (!canvasAvailable) {
  reportSkipped('prepareWithSegments() — requer Canvas (não disponível no Node)');
} else {
  try {
    const prepared = prepareWithSegments(testTexts.accents, font);
    const result = layout(prepared, width, lineHeight);
    report(
      isFiniteNumber(result.height) &&
        isFiniteNumber(result.lineCount) &&
        Array.isArray(prepared.segments) &&
        prepared.segments.length > 0,
      'prepareWithSegments() segmenta texto com acentos corretamente'
    );
  } catch (err) {
    report(
      false,
      `prepareWithSegments() falhou: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

// ---------------------------------------------------------------------------
// 4. rich-inline com chip atômico
// ---------------------------------------------------------------------------

if (!canvasAvailable) {
  reportSkipped('rich-inline com chip atômico — requer Canvas (não disponível no Node)');
} else {
  try {
    const items = [
      { text: 'Texto normal', font },
      { text: 'chip', font, break: 'never' as const, extraWidth: 16 },
    ];
    const prepared = prepareRichInline(items);
    const stats = measureRichInlineStats(prepared, width);
    report(
      isFiniteNumber(stats.lineCount) && isFiniteNumber(stats.maxLineWidth),
      'rich-inline com chip atômico retorna estatísticas finitas'
    );
  } catch (err) {
    report(
      false,
      `rich-inline falhou: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

// ---------------------------------------------------------------------------
// 5. clearCache
// ---------------------------------------------------------------------------

try {
  clearCache();
  report(true, 'clearCache() executa sem erro');
} catch (err) {
  report(
    false,
    `clearCache() falhou: ${err instanceof Error ? err.message : String(err)}`
  );
}

// ---------------------------------------------------------------------------
// 6. Ambiente
// ---------------------------------------------------------------------------

const hasIntlSegmenter =
  typeof (globalThis as { Intl?: typeof Intl }).Intl === 'object' &&
  typeof (globalThis as { Intl?: typeof Intl }).Intl?.Segmenter === 'function';

report(hasIntlSegmenter, `Intl.Segmenter disponível: ${hasIntlSegmenter}`);
reportSkipped(`Canvas não disponível no ambiente Node — medição real ocorre no browser`);

// ---------------------------------------------------------------------------
// Resumo
// ---------------------------------------------------------------------------

const failures = results.filter((r) => !r.ok && !r.skipped);
const skipped = results.filter((r) => r.skipped);

for (const result of results) {
  const icon = result.ok ? (result.skipped ? '⏭️' : '✅') : '❌';
  console.log(`${icon} ${result.message}`);
}

if (failures.length === 0) {
  console.log('\n✅ Validação do Pretext concluída.');
  if (skipped.length > 0) {
    console.log(`   ${skipped.length} teste(s) pulado(s) por falta de Canvas no Node.js — medição real ocorre no browser.`);
  }
  process.exit(0);
} else {
  console.log(`\n❌ ${failures.length} falha(s) encontrada(s).`);
  process.exit(1);
}
