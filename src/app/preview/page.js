// Renderiza o rascunho gravado pelo POST /api/preview com os componentes REAIS
// de produção (mesma page pipeline = CSS/JS/fidelidade de graça). noindex.
// Suporta envelope { kind, content } — 'recipe' ou 'review'.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { ReviewNotebookTemplate } from '@/components/review';
import { RecipeNotebookTemplate } from '@/components/recipe';
import { buildReviewTemplateProps } from '@/lib/review-template-props';
import { buildRecipeTemplateProps } from '@/lib/recipe-template-props';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Preview — Central Editorial',
  robots: { index: false, follow: false },
};

export default async function PreviewPage({ searchParams }) {
  const { id } = await searchParams;
  if (!id || typeof id !== 'string') notFound();

  const file = path.join(process.cwd(), 'tmp', 'preview-central.json');
  if (!existsSync(file)) notFound();

  let stored;
  try {
    stored = JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    notFound();
  }

  // eslint-disable-next-line react-hooks/purity
  if (stored.id !== id || Date.now() > stored.expiresAt) notFound();

  // Branch on kind: envelope format or legacy review
  const kind = stored.kind || 'review';
  const content = stored.content ?? stored.review;

  if (!content) notFound();

  if (kind === 'recipe') {
    return <RecipeNotebookTemplate {...buildRecipeTemplateProps(content)} />;
  }

  return <ReviewNotebookTemplate {...buildReviewTemplateProps(content)} />;
}
