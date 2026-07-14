// Validação isolada da infraestrutura Pretext.
// Não importa React nem componentes de browser.

import fs from 'fs';
import path from 'path';
import { prepare, layout, prepareWithSegments, clearCache } from '@chenglou/pretext';
import {
  prepareRichInline,
  measureRichInlineStats,
} from '@chenglou/pretext/rich-inline';
import { parseLineAnchor, stringifyLineAnchor, isLineAnchor } from '@/lib/pretext/lineAnchorCodec';

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
// 7. Line anchor codec (funções puras — rodam em Node)
// ---------------------------------------------------------------------------

try {
  // Test round-trip
  const testCases = [
    { section: 2, line: 7 },
    { section: 0, line: 1 },
    { section: 99, line: 999 },
  ];

  let allRoundTripsPass = true;
  for (const tc of testCases) {
    const str = stringifyLineAnchor(tc.section, tc.line);
    const parsed = parseLineAnchor(str);
    if (!parsed || parsed.sectionIndex !== tc.section || parsed.lineNumber !== tc.line) {
      allRoundTripsPass = false;
      break;
    }
  }

  report(
    allRoundTripsPass,
    'stringifyLineAnchor + parseLineAnchor round-trips preservam sectionIndex e lineNumber'
  );

  // Test isLineAnchor
  const validAnchors = ['S0:L1', 'S2:L7', 'S99:L999'];
  const invalidAnchors = ['ingredientes', 'S2', 'L7', 'S2L7', 'S2:L', 'abc', 'S0:L0'];

  const allValidPass = validAnchors.every((a) => isLineAnchor(a));
  const noInvalidPass = invalidAnchors.every((a) => !isLineAnchor(a));

  report(
    allValidPass && noInvalidPass,
    'isLineAnchor diferencia âncoras de linha válidas (S{n}:L{n}) de seções/formatos inválidos'
  );

  // Test parseLineAnchor returns null for invalid (section id, bad format, and L0)
  const parseInvalidResult = parseLineAnchor('ingredientes');
  const parseL0Result = parseLineAnchor('S0:L0');
  report(
    parseInvalidResult === null && parseL0Result === null,
    'parseLineAnchor retorna null para section ids ("ingredientes") e L0 (linhas são 1-based)'
  );
} catch (err) {
  report(
    false,
    `Line anchor codec falhou: ${err instanceof Error ? err.message : String(err)}`
  );
}

// ---------------------------------------------------------------------------
// 8. Validação de conteúdo: âncoras em notes[] dos JSONs
// ---------------------------------------------------------------------------

const SECTION_ID_PATTERN = /^[a-z0-9-]+$/;

function isSectionIdAnchor(anchor: string): boolean {
  return SECTION_ID_PATTERN.test(anchor);
}

interface ContentFile {
  id?: number;
  slug: string;
  notes?: Array<{
    id?: string;
    label: string;
    body: string;
    placement?: 'margin' | 'inline';
    anchor?: string;
  }>;
  [key: string]: unknown;
}

function validateContentFile(filePath: string): Array<{ slug: string; error: string }> {
  const errors: Array<{ slug: string; error: string }> = [];

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data: ContentFile = JSON.parse(content);

    if (!data.notes || !Array.isArray(data.notes)) {
      return errors;
    }

    const fileName = path.basename(filePath);

    for (const note of data.notes) {
      if (!note.anchor) {
        // Unanchored notes are fine
        continue;
      }

      // Anchor must be either a valid line anchor or a valid section id
      const isLine = isLineAnchor(note.anchor);
      const isSection = isSectionIdAnchor(note.anchor);

      if (!isLine && !isSection) {
        errors.push({
          slug: data.slug,
          error: `${fileName}: Nota "${note.label}" tem âncora inválida "${note.anchor}". Esperado: S{sectionIndex}:L{lineNumber} (ex: S2:L7) ou section id (ex: ingredientes)`,
        });
      }
    }
  } catch (error) {
    const fileName = path.basename(filePath);
    errors.push({
      slug: 'unknown',
      error: `${fileName}: Falha ao analisar arquivo: ${error instanceof Error ? error.message : String(error)}`,
    });
  }

  return errors;
}

try {
  const contentDir = path.join(process.cwd(), 'src', 'content');
  const reviewsDir = path.join(contentDir, 'reviews');
  const recipesDir = path.join(contentDir, 'receitas');

  const contentErrors: Array<{ slug: string; error: string }> = [];

  // Validar reviews
  if (fs.existsSync(reviewsDir)) {
    const files = fs.readdirSync(reviewsDir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      const filePath = path.join(reviewsDir, file);
      contentErrors.push(...validateContentFile(filePath));
    }
  }

  // Validar receitas
  if (fs.existsSync(recipesDir)) {
    const files = fs.readdirSync(recipesDir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      const filePath = path.join(recipesDir, file);
      contentErrors.push(...validateContentFile(filePath));
    }
  }

  const hasContentErrors = contentErrors.length > 0;
  report(
    !hasContentErrors,
    `Âncoras em content/reviews/*.json e content/receitas/*.json são válidas${hasContentErrors ? ` — ${contentErrors.length} erro(s) encontrado(s)` : ''}`
  );

  if (contentErrors.length > 0) {
    for (const err of contentErrors) {
      console.log(`     ${err.error}`);
    }
  }
} catch (err) {
  report(
    false,
    `Validação de conteúdo falhou: ${err instanceof Error ? err.message : String(err)}`
  );
}

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
