import { FOCUS_RING } from '@/components/ui/focusRing';
import { formatDate } from '@/lib/content';

export interface ChangelogEntry {
  // entry.date must be ISO 8601 (YYYY-MM-DD) for the <time dateTime> attribute
  date: string;
  text: string;
}

export interface ChangelogDetailsProps {
  entries: ChangelogEntry[];
  // O padrão é o das receitas; o artigo usa o visual da D2.
  variant?: 'default' | 'd2';
}

const STYLES = {
  default: {
    details: 'text-sm text-[#4a5568]',
    summary: 'cursor-pointer font-semibold text-[#1a4d2e] hover:text-[#ff6b35] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none rounded',
    printLabel: 'hidden font-semibold text-[#1a4d2e] print:block',
    date: 'font-semibold text-[#1a4d2e]',
    text: 'mt-0.5 text-[#4a5568]',
  },
  d2: {
    details: 'text-sm text-marinho-suave',
    summary: `flex min-h-11 cursor-pointer items-center font-extrabold text-marinho underline underline-offset-[3px] hover:text-marinho-suave ${FOCUS_RING}`,
    printLabel: 'hidden font-extrabold text-marinho print:block',
    date: 'font-bold text-marinho',
    text: 'mt-0.5 text-marinho-suave',
  },
};

export function ChangelogDetails({ entries, variant = 'default' }: ChangelogDetailsProps): React.ReactElement {
  const styles = STYLES[variant];
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>
        Histórico de atualizações
      </summary>
      {/* Rótulo visível só no print: o CSS de impressão oculta todos os <summary> */}
      <p className={styles.printLabel}>Histórico de atualizações</p>
      <ul className="mt-2 space-y-1.5 pl-4">
        {entries.map((entry) => (
          <li key={entry.date + entry.text.slice(0, 20)} className="flex flex-col text-xs">
            <time dateTime={entry.date} className={styles.date}>
              {formatDate(entry.date)}
            </time>
            <span className={styles.text}>{entry.text}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}
