import Link from 'next/link';
import { publishedReviews, recipes } from '@/lib/data';
import {
  SEARCH_PAGE_METADATA,
  createSearchIndex,
  getRankedSearchResults,
  getSearchContentTypeLabel,
} from '@/lib/siteSearch.mjs';

export const metadata = SEARCH_PAGE_METADATA;

const searchIndex = createSearchIndex({ recipes, reviews: publishedReviews });

function getQuery(searchParams) {
  const value = searchParams?.q;
  return (Array.isArray(value) ? value[0] : value || '').trim();
}

export default async function SearchPage({ searchParams }) {
  const query = getQuery(await searchParams);
  const results = query ? getRankedSearchResults(searchIndex, query) : [];

  return (
    <main className="min-h-screen bg-[#fef9f3] px-6 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-9 border-b border-black/10 pb-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff6b35]">
            Busca no site
          </p>
          <h1 className="mt-2 font-heading text-4xl font-bold text-[#0f1d3a] md:text-5xl">
            Receitas, guias e análises
          </h1>
          {query ? (
            <p className="mt-3 text-gray-600">
              {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para{' '}
              <strong className="text-[#0f1d3a]">“{query}”</strong>
            </p>
          ) : (
            <p className="mt-3 max-w-2xl text-gray-600">
              Digite um termo na busca do cabeçalho para encontrar receitas, guias e análises.
            </p>
          )}
        </div>

        {query && results.length > 0 && (
          <ul className="grid gap-4 md:grid-cols-2">
            {results.map((result) => (
              <li key={`${result.contentType}:${result.id}`}>
                <Link
                  href={result.href}
                  className="group block h-full rounded-2xl border border-black/8 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#ff6b35]/35 hover:shadow-lg"
                >
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em]">
                    <span className="rounded-full bg-[#1a4d2e]/10 px-2.5 py-1 text-[#1a4d2e]">
                      {getSearchContentTypeLabel(result.contentType)}
                    </span>
                    {result.category && (
                      <span className="truncate text-gray-500">{result.category}</span>
                    )}
                  </div>
                  <h2 className="mt-3 font-heading text-xl font-bold leading-snug text-[#0f1d3a] transition-colors group-hover:text-[#ff6b35]">
                    {result.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {result.description}
                  </p>
                  <p className="mt-4 text-sm font-bold text-[#1a4d2e]">Abrir conteúdo →</p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {query && results.length === 0 && (
          <div className="rounded-2xl border border-black/8 bg-white p-8 text-center shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-[#0f1d3a]">
              Nenhum resultado encontrado
            </h2>
            <p className="mt-2 text-gray-600">Tente buscar com outro termo.</p>
          </div>
        )}
      </div>
    </main>
  );
}
