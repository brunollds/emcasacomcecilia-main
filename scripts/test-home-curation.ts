import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  isReviewCategory,
  isValidReviewPublishedAtISO,
  type ReviewCategory,
  type ReviewDiscoveryItem,
} from '@/lib/reviewDiscovery';
import { publishedReviews } from '@/lib/data';
import {
  resolveActiveHomeCuration,
  type HomeCurationSelection,
} from '@/lib/homeCuration';

const published = new Date('2026-08-27T10:00:00-03:00');
assert.ok(!Number.isNaN(published.getTime()), 'clock de teste válido');

function fixture(
  slug: string,
  overrides: Partial<ReviewDiscoveryItem> = {}
): ReviewDiscoveryItem {
  return {
    id: overrides.id ?? 1,
    slug,
    title: `Título ${slug}`,
    type: 'Guia',
    description: `Descrição ${slug}`,
    publishedAt: '2026-08-26',
    publishedAtISO: '2026-08-26',
    category: 'guias-praticos-utilidade',
    image: `/images/${slug}.jpg`,
    imageAlt: `Imagem ${slug}`,
    isNew: false,
    ...overrides,
  };
}

function selection(
  overrides: Partial<HomeCurationSelection> = {}
): HomeCurationSelection {
  return {
    articleSlug: 'artigo-curado',
    eyebrow: 'Escolha da Cecília',
    startsAt: '2026-08-26T00:00:00-03:00',
    endsAt: null,
    ...overrides,
  };
}

function config(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    selection: selection(),
    ...overrides,
  };
}

const configPath = resolve(process.cwd(), 'content', 'home-curation.json');
const homeCurationConfigRaw = JSON.parse(readFileSync(configPath, 'utf-8')) as unknown;
const homeCurationSelection = (
  homeCurationConfigRaw as { selection?: { articleSlug?: string; startsAt?: string } }
).selection;

if (homeCurationSelection === null) {
  assert.equal(
    resolveActiveHomeCuration(homeCurationConfigRaw, [], published),
    null,
    'selection:null deve desativar curadoria'
  );
} else {
  assert.equal(typeof homeCurationSelection?.articleSlug, 'string');
  assert.equal(typeof homeCurationSelection?.startsAt, 'string');
  const activeAtStarts = new Date(homeCurationSelection.startsAt!);
  const activeConfigResolution = resolveActiveHomeCuration(
    homeCurationConfigRaw,
    publishedReviews,
    activeAtStarts
  );
  assert.ok(activeConfigResolution);
  assert.equal(
    activeConfigResolution.article.slug,
    homeCurationSelection.articleSlug,
    'arquivo real deve resolver o slug configurado no startsAt'
  );
}

const eligibleArticle = fixture('artigo-curado', { id: 101 });
const baseReviews = [
  fixture('outro-artigo', { id: 102 }),
  eligibleArticle,
];

const activeConfig = config({
  selection: selection({ endsAt: '2026-08-28T23:59:59-03:00' }),
});

const beforeStart = resolveActiveHomeCuration(
  activeConfig,
  baseReviews,
  new Date('2026-08-25T23:59:59-03:00')
);
assert.equal(beforeStart, null, 'antes do início deve retornar null');

const atStart = resolveActiveHomeCuration(
  activeConfig,
  baseReviews,
  new Date('2026-08-26T00:00:00-03:00')
);
assert.equal(atStart?.article.slug, 'artigo-curado');
assert.equal(atStart?.eyebrow, 'Escolha da Cecília');

const atEnd = resolveActiveHomeCuration(
  activeConfig,
  baseReviews,
  new Date('2026-08-28T23:59:59-03:00')
);
assert.equal(atEnd?.article.slug, 'artigo-curado', 'inclusive no limite final');

const activeUtcConfig = config({
  selection: selection({
    startsAt: '2026-08-26T00:00:00Z',
    endsAt: '2026-08-29T00:00:00Z',
  }),
});
const activeUtc = resolveActiveHomeCuration(
  activeUtcConfig,
  baseReviews,
  new Date('2026-08-27T10:00:00Z')
);
assert.equal(activeUtc?.article.slug, 'artigo-curado');
assert.equal(activeUtc?.startsAt, '2026-08-26T00:00:00Z');

const afterEnd = resolveActiveHomeCuration(
  activeConfig,
  baseReviews,
  new Date('2026-08-29T00:00:00-03:00')
);
assert.equal(afterEnd, null, 'depois do fim deve retornar null');

const evergreenConfig = config();
const evergreen = resolveActiveHomeCuration(
  evergreenConfig,
  baseReviews,
  new Date('2027-01-01T00:00:00-03:00')
);
assert.equal(evergreen?.article.id, 101, 'evergreen permanece ativo após o fim');
assert.equal(evergreen?.startsAt, '2026-08-26T00:00:00-03:00');
assert.equal(evergreen?.endsAt, null);

assert.throws(
  () =>
    resolveActiveHomeCuration(
      config({
        selection: selection({
          startsAt: '2026-08-26T00:00:00',
          endsAt: '2026-08-28T00:00:00-03:00',
        }),
      }),
      baseReviews,
      published
    ),
  /\[homeCuration\]/,
  'timestamp sem offset em startsAt deve falhar'
);

assert.throws(
  () =>
    resolveActiveHomeCuration(
      config({
        selection: selection({
          startsAt: '2026-08-01T25:00:00-03:00',
          endsAt: '2026-08-28T00:00:00-03:00',
        }),
      }),
      baseReviews,
      published
    ),
  /\[homeCuration\].*timestamp inválido/,
  'hora impossível deve falhar'
);

assert.throws(
  () =>
    resolveActiveHomeCuration(
      config({
        selection: selection({
          startsAt: '2026-02-30T00:00:00-03:00',
          endsAt: '2026-09-30T00:00:00-03:00',
        }),
      }),
      baseReviews,
      published
    ),
  /\[homeCuration\].*timestamp inválido/,
  'data impossível deve falhar'
);

assert.throws(
  () =>
    resolveActiveHomeCuration(
      config({
        selection: selection({
          startsAt: '2026-08-28T00:00:00-03:00',
          endsAt: '2026-08-28T00:00:00-03:00',
        }),
      }),
      baseReviews,
      published
    ),
  /\[homeCuration\]/,
  'intervalo igual deve falhar'
);

assert.throws(
  () =>
    resolveActiveHomeCuration(
      config({
        selection: selection({
          startsAt: '2026-08-29T00:00:00-03:00',
          endsAt: '2026-08-28T00:00:00-03:00',
        }),
      }),
      baseReviews,
      published
    ),
  /\[homeCuration\]/,
  'intervalo invertido deve falhar'
);

assert.throws(
  () =>
    resolveActiveHomeCuration(
      config({
        selection: selection({
          articleSlug: 'artigo-inexistente',
          endsAt: null,
        }),
      }),
      baseReviews,
      published
    ),
  /\[homeCuration\].*não encontrado/,
  'slug inexistente deve falhar'
);

assert.throws(
  () =>
    resolveActiveHomeCuration(
      config({
        selection: selection({
          articleSlug: 'artigo-inexistente',
          startsAt: '2027-01-01T00:00:00-03:00',
          endsAt: null,
        }),
      }),
      baseReviews,
      new Date('2026-08-27T10:00:00-03:00')
    ),
  /\[homeCuration\].*não encontrado/,
  'slug inexistente ainda deve falhar fora da janela'
);

assert.throws(
  () =>
    resolveActiveHomeCuration(
      config({
        selection: selection({
          startsAt: '2027-01-01T00:00:00-03:00',
          endsAt: null,
        }),
      }),
      [fixture('artigo-curado', { draft: true, id: 308 })],
      new Date('2026-08-27T10:00:00-03:00')
    ),
  /\[homeCuration\].*vitrine PT/,
  'artigo inelegível deve falhar fora da janela'
);

const duplicatedSlugReviews = [
  fixture('slug-repetido', { id: 201 }),
  fixture('slug-repetido', { id: 202 }),
];
assert.throws(
  () =>
    resolveActiveHomeCuration(
      config({
        selection: selection({
          articleSlug: 'slug-repetido',
          endsAt: null,
        }),
      }),
      duplicatedSlugReviews,
      new Date('2026-08-26T10:00:00-03:00')
    ),
  /\[homeCuration\].*duplicado/,
  'slug duplicado deve falhar'
);

assert.throws(
  () =>
    resolveActiveHomeCuration(
      config({
        selection: selection({
          articleSlug: 'artigo-curado',
          endsAt: null,
        }),
      }),
      [fixture('artigo-curado', { category: undefined, id: 303 })],
      new Date('2026-08-26T10:00:00-03:00')
    ),
  /\[homeCuration\].*\(artigo-curado\).*category/,
  'category inválida deve falhar'
);

assert.throws(
  () =>
    resolveActiveHomeCuration(
      config({
        selection: selection({
          articleSlug: 'artigo-curado',
          endsAt: null,
        }),
      }),
      [fixture('artigo-curado', { publishedAtISO: '2026-02-30', id: 304 })],
      new Date('2026-08-26T10:00:00-03:00')
    ),
  /\[homeCuration\].*\(artigo-curado\).*publishedAtISO/,
  'publishedAtISO inválida deve falhar'
);

assert.throws(
  () =>
    resolveActiveHomeCuration(
      config({
        selection: selection({
          articleSlug: 'artigo-curado',
          endsAt: null,
        }),
      }),
      [fixture('artigo-curado', { draft: true, id: 305 })],
      new Date('2026-08-26T10:00:00-03:00')
    ),
  /\[homeCuration\].*vitrine PT.*\(artigo-curado\)/,
  'draft deve ser rejeitado'
);

assert.throws(
  () =>
    resolveActiveHomeCuration(
      config({
        selection: selection({
          articleSlug: 'artigo-curado',
          endsAt: null,
        }),
      }),
      [fixture('artigo-curado', { hideFromListings: true, id: 306 })],
      new Date('2026-08-26T10:00:00-03:00')
    ),
  /\[homeCuration\].*vitrine PT.*\(artigo-curado\)/,
  'hideFromListings deve ser rejeitado'
);

assert.throws(
  () =>
    resolveActiveHomeCuration(
      config({
        selection: selection({
          articleSlug: 'artigo-curado',
          endsAt: null,
        }),
      }),
      [fixture('artigo-curado', { hideFromPortugueseListings: true, id: 307 })],
      new Date('2026-08-26T10:00:00-03:00')
    ),
  /\[homeCuration\].*vitrine PT.*\(artigo-curado\)/,
  'hideFromPortugueseListings deve ser rejeitado'
);

const resolved = resolveActiveHomeCuration(
  evergreenConfig,
  [
    fixture('artigo-canonico', {
      id: 401,
      slug: 'artigo-curado',
      title: 'Título canônico',
      description: 'Descrição canônica',
      image: '/canonical.jpg',
      imageAlt: 'Imagem canônica',
    }),
  ],
  new Date('2026-08-27T10:00:00-03:00')
);
assert.equal(resolved?.article.id, 401, 'retorno usa o id do artigo canônico');
assert.equal(resolved?.article.title, 'Título canônico');
assert.equal(resolved?.article.description, 'Descrição canônica');
assert.equal(resolved?.article.image, '/canonical.jpg');

const selectionWithExtraTitle = {
  ...selection(),
  title: 'Título duplicado',
};
assert.throws(
  () =>
    resolveActiveHomeCuration(
      { selection: selectionWithExtraTitle },
      baseReviews,
      published
    ),
  /\[homeCuration\]/,
  'chaves extras na seleção devem falhar'
);

const selectionWithExtraDescription = {
  ...selection(),
  description: 'Descrição duplicada',
};
assert.throws(
  () =>
    resolveActiveHomeCuration(
      { selection: selectionWithExtraDescription },
      baseReviews,
      published
    ),
  /\[homeCuration\]/,
  'campo description duplicado deve falhar'
);

const selectionWithExtraImage = {
  ...selection(),
  image: '/imagem-duplicada.jpg',
};
assert.throws(
  () =>
    resolveActiveHomeCuration(
      { selection: selectionWithExtraImage },
      baseReviews,
      published
    ),
  /\[homeCuration\]/,
  'campo image duplicado deve falhar'
);

assert.throws(
  () =>
    resolveActiveHomeCuration(
      { ...config(), anotherField: 'nao deveria existir' },
      baseReviews,
      published
    ),
  /\[homeCuration\]/,
  'chaves extras no topo devem falhar'
);

assert.throws(
  () => resolveActiveHomeCuration({}, baseReviews, published),
  /\[homeCuration\]/,
  'shape sem selection deve falhar'
);

const missingCategory = fixture('artigo-validado', { id: 501 });
assert.equal(isReviewCategory(missingCategory.category), true);
assert.equal(isValidReviewPublishedAtISO(missingCategory.publishedAtISO), true);

assert.ok(
  resolveActiveHomeCuration(
    config({ selection: selection({ articleSlug: 'artigo-curado' }) }),
    [eligibleArticle],
    new Date('2026-08-27T00:00:00-03:00')
  )?.article.slug === 'artigo-curado'
);

console.log('✅ homeCuration: contrato e seleção validados.');
