import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';

export interface ArticleBylineAuthor {
  name: string;
  role?: string;
  url?: string;
  initials?: string;
  avatar?: {
    src: string;
    alt: string;
  };
}

export interface ArticleBylineMeta {
  icon?: 'calendar' | 'clock';
  label: string;
  value?: string;
  dateTime?: string;
}

export interface ArticleBylineProps {
  authors?: ArticleBylineAuthor[];
  fallbackAuthor?: ArticleBylineAuthor;
  meta?: ArticleBylineMeta[];
  action?: React.ReactNode;
  className?: string;
}

const DEFAULT_AUTHOR: ArticleBylineAuthor = {
  name: 'Cecília Mauad',
  role: 'Em Casa com Cecília',
  initials: 'CM',
  url: '/sobre',
};

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function MetaIcon({ icon }: { icon?: ArticleBylineMeta['icon'] }) {
  if (icon === 'calendar') return <Calendar size={14} />;
  if (icon === 'clock') return <Clock size={14} />;
  return null;
}

function AuthorAvatar({ author }: { author: ArticleBylineAuthor }) {
  if (author.avatar?.src) {
    return (
      <Image
        src={author.avatar.src}
        alt={author.avatar.alt || author.name}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover ring-2 ring-[#ff6b35]/25"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a4d2e] text-xs font-black tracking-[0.08em] text-white shadow-sm ring-2 ring-[#ff6b35]/25"
    >
      {author.initials || getInitials(author.name)}
    </span>
  );
}

function AuthorName({ author }: { author: ArticleBylineAuthor }) {
  const content = (
    <>
      <span className="font-semibold text-[#0f1419]">{author.name}</span>
      {author.role && <span className="text-xs text-[#4a5568]">{author.role}</span>}
    </>
  );

  if (author.url) {
    return (
      <Link href={author.url} className="grid transition-colors hover:text-[#ff6b35]">
        {content}
      </Link>
    );
  }

  return <span className="grid">{content}</span>;
}

export function ArticleByline({
  authors,
  fallbackAuthor = DEFAULT_AUTHOR,
  meta = [],
  action,
  className = '',
}: ArticleBylineProps): React.ReactElement {
  const resolvedAuthors = authors && authors.length > 0 ? authors : [fallbackAuthor];

  return (
    <div className={`flex flex-wrap items-center gap-4 text-sm text-[#4a5568] ${className}`}>
      <div className="flex flex-wrap items-center gap-3">
        {resolvedAuthors.map((author) => (
          <div key={author.name} className="flex items-center gap-3">
            <AuthorAvatar author={author} />
            <AuthorName author={author} />
          </div>
        ))}
      </div>

      {meta.length > 0 && (
        <>
          <span className="hidden h-8 w-px bg-[#1a4d2e]/15 md:block" aria-hidden="true" />
          <div className="flex flex-wrap items-center gap-4">
            {meta.map((item) => {
              const content = item.value || item.label;
              return item.dateTime ? (
                <time key={`${item.label}-${content}`} dateTime={item.dateTime} className="inline-flex items-center gap-1.5">
                  <MetaIcon icon={item.icon} />
                  {content}
                </time>
              ) : (
                <span key={`${item.label}-${content}`} className="inline-flex items-center gap-1.5">
                  <MetaIcon icon={item.icon} />
                  {content}
                </span>
              );
            })}
          </div>
        </>
      )}

      {action}
    </div>
  );
}
