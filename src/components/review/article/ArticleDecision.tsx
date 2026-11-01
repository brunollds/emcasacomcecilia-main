import type { ReviewDecision } from '@/lib/content';
import type { ArticleCopy } from '../articleCopy';
import { ProsConsList } from '../ReviewVerdictCard';

// O quadro "Leve se / Passe se" dos guias e comparativos, logo antes do FAQ: a decisão num relance, sem estrelas,
// sem nota e sem schema de Review. O review de produto tem os prós e contras no veredito.
export function ArticleDecision({ decision, copy }: { decision: ReviewDecision; copy: ArticleCopy }): React.ReactElement {
  return (
    <section
      id="decisao"
      data-article="decisao"
      aria-label={copy.decisionLabel}
      className="grid scroll-mt-32 gap-4 md:grid-cols-2 md:items-start lg:scroll-mt-28"
    >
      <ProsConsList list="leve" title={copy.decisionTakeIf} items={decision.takeIf} />
      <ProsConsList list="passe" title={copy.decisionSkipIf} items={decision.skipIf} />
    </section>
  );
}
