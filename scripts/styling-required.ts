// O card de estilo (campo styling) é obrigatório nos capítulos listados em scripts/styling-required.json.
// A lista é explícita porque nem todo artigo de loja de roupa leva card: reputação e cupom, por exemplo, não levam.
// O briefing de moda diz os capítulos (Job 1), e o Job 4 acrescenta a entrada ao montar o JSON.

export type StylingRequirements = Record<string, string[]>;

type ArticleSections = {
  slug: string;
  contentSections?: Array<{ heading?: string; styling?: unknown }>;
};

export function getRequiredStylingProblems(
  articles: ArticleSections[],
  required: StylingRequirements,
): Array<{ slug: string; message: string }> {
  const problems: Array<{ slug: string; message: string }> = [];
  const bySlug = new Map(articles.map((article) => [article.slug, article]));
  for (const [slug, headings] of Object.entries(required)) {
    const article = bySlug.get(slug);
    if (!article) {
      problems.push({ slug, message: 'scripts/styling-required.json cita um artigo que não existe' });
      continue;
    }
    if (headings.length === 0) {
      problems.push({ slug, message: 'scripts/styling-required.json sem capítulos para este artigo' });
    }
    for (const heading of headings) {
      const section = article.contentSections?.find((candidate) => candidate.heading === heading);
      if (!section) {
        problems.push({ slug, message: `capítulo "${heading}", de scripts/styling-required.json, não está no artigo` });
      } else if (!section.styling) {
        problems.push({ slug, message: `capítulo "${heading}" sem o card de estilo (campo styling)` });
      }
    }
  }
  return problems;
}
