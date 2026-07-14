import { formatDate } from '@/lib/content';

export interface ChangelogEntry {
  // entry.date must be ISO 8601 (YYYY-MM-DD) for the <time dateTime> attribute
  date: string;
  text: string;
}

export interface ChangelogDetailsProps {
  entries: ChangelogEntry[];
}

export function ChangelogDetails({ entries }: ChangelogDetailsProps): React.ReactElement {
  return (
    <details className="text-sm text-[#4a5568]">
      <summary className="cursor-pointer font-semibold text-[#1a4d2e] hover:text-[#ff6b35] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ff6b35] focus-visible:outline-none rounded">
        Histórico de atualizações
      </summary>
      {/* Rótulo visível só no print: o CSS de impressão oculta todos os <summary> */}
      <p className="hidden font-semibold text-[#1a4d2e] print:block">Histórico de atualizações</p>
      <ul className="mt-2 space-y-1.5 pl-4">
        {entries.map((entry) => (
          <li key={entry.date + entry.text.slice(0, 20)} className="flex flex-col text-xs">
            <time dateTime={entry.date} className="font-semibold text-[#1a4d2e]">
              {formatDate(entry.date)}
            </time>
            <span className="mt-0.5 text-[#4a5568]">{entry.text}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}
