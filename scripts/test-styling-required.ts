// Roda depois do build-index: confere a lista de scripts/styling-required.json contra os artigos gerados.
import assert from 'node:assert/strict';

import { reviews } from '@/lib/data';

import requiredJson from './styling-required.json';
import { getRequiredStylingProblems, type StylingRequirements } from './styling-required';

const required: StylingRequirements = requiredJson;
const articles = reviews as unknown as Parameters<typeof getRequiredStylingProblems>[0];

assert.deepEqual(getRequiredStylingProblems(articles, required), [], 'a lista real tem de passar');

// Tirar o card de um capítulo da lista derruba o artigo, um capítulo de cada vez.
for (const [slug, headings] of Object.entries(required)) {
  const article = articles.find((candidate) => candidate.slug === slug);
  assert.ok(article, slug);
  for (const heading of headings) {
    const withoutCard = {
      ...article,
      contentSections: article.contentSections?.map((section) =>
        section.heading === heading ? { ...section, styling: undefined } : section,
      ),
    };
    const problems = getRequiredStylingProblems([withoutCard], { [slug]: headings });
    assert.equal(problems.length, 1, `${slug}: ${heading}`);
    assert.match(problems[0].message, /sem o card de estilo/);
  }
}

// Título trocado e artigo que saiu avisam, em vez de passar calados.
assert.match(
  getRequiredStylingProblems([{ slug: 'a', contentSections: [{ heading: 'Outro', styling: {} }] }], { a: ['Capítulo'] })[0].message,
  /não está no artigo/,
);
assert.match(getRequiredStylingProblems([], { a: ['Capítulo'] })[0].message, /não existe/);
assert.match(getRequiredStylingProblems([{ slug: 'a' }], { a: [] })[0].message, /sem capítulos/);

// Quem não está na lista segue válido sem card, como os guias de reputação e os de outras áreas.
const unlisted = articles.find((candidate) => candidate.slug === 'insider-vale-a-pena');
assert.ok(unlisted);
assert.ok(!unlisted.contentSections?.some((section) => section.styling));
assert.deepEqual(getRequiredStylingProblems([unlisted], {}), []);

console.log(`test:styling-required: ${Object.keys(required).length} artigos com os capítulos obrigatórios no card.`);
