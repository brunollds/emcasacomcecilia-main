import type { Metadata } from 'next';
import { couponFontVariables } from '@/components/coupons/CouponBlocks';
import OmniSearch from '@/components/OmniSearch';
import { SearchView } from '@/components/search/SearchView';
import { SEARCH_COPY, getSearchQuery, searchSite } from '@/lib/searchPage';
import { SEARCH_PAGE_METADATA } from '@/lib/siteSearch.mjs';

export const metadata: Metadata = SEARCH_PAGE_METADATA;

type SearchPageProps = { searchParams: Promise<{ q?: string | string[] }> };

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = getSearchQuery((await searchParams).q);
  return (
    <SearchView
      query={query}
      results={query ? searchSite(query) : []}
      // A key troca o campo quando o termo muda numa navegação dentro do /buscar.
      search={<OmniSearch key={query} placeholder={SEARCH_COPY.placeholder} tone="light" defaultValue={query} />}
      className={couponFontVariables}
    />
  );
}
