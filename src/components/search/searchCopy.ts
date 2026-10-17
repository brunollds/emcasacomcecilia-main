import type { Locale } from '@/lib/i18n/locales';
import { getSearchContentTypeLabel } from '@/lib/siteSearch.mjs';

// Textos do campo de busca (OmniSearch) nos 10 idiomas. O OmniSearch é componente de cliente: este
// arquivo só importa o rótulo do tipo do PT, de siteSearch.mjs, que é leve.
export interface SearchCopy {
  placeholder: string;
  inputLabel: string;
  clearLabel: string;
  resultCount: (count: number) => string;
  typeLabels: { recipe: string; review: string; store: string };
  noResultsTitle: string;
  noResultsHint: (query: string) => string;
  // Só no PT: o link para o /buscar.
  seeAllLabel: string | null;
  // Fora do PT, sem resultado: o link para a lista de artigos do idioma.
  hubLinkLabel: string | null;
}

// O francês pede espaço que não quebra dentro das aspas.
const NBSP = ' ';

const SEARCH_COPY: Record<Locale, SearchCopy> = {
  pt: {
    placeholder: 'Buscar Receitas e Artigos',
    inputLabel: 'Buscar no site',
    clearLabel: 'Limpar busca',
    resultCount: (count) => `${count} ${count === 1 ? 'resultado encontrado' : 'resultados encontrados'}`,
    typeLabels: {
      recipe: getSearchContentTypeLabel('recipe'),
      review: getSearchContentTypeLabel('review'),
      store: 'Loja',
    },
    noResultsTitle: 'Nenhum resultado encontrado',
    noResultsHint: (query) => `Nada para "${query}". Tente outro termo.`,
    seeAllLabel: 'Ver todos os resultados',
    hubLinkLabel: null,
  },
  en: {
    placeholder: 'Search articles and stores',
    inputLabel: 'Search the site',
    clearLabel: 'Clear search',
    resultCount: (count) => `${count} ${count === 1 ? 'result' : 'results'}`,
    typeLabels: { recipe: 'Recipe', review: 'Article', store: 'Store' },
    noResultsTitle: 'No results found',
    noResultsHint: (query) => `Nothing matches “${query}”. Try another word.`,
    seeAllLabel: null,
    hubLinkLabel: 'See all articles in English',
  },
  es: {
    placeholder: 'Buscar artículos y tiendas',
    inputLabel: 'Buscar en el sitio',
    clearLabel: 'Borrar búsqueda',
    resultCount: (count) => `${count} ${count === 1 ? 'resultado' : 'resultados'}`,
    typeLabels: { recipe: 'Receta', review: 'Artículo', store: 'Tienda' },
    noResultsTitle: 'No hay resultados',
    noResultsHint: (query) => `No encontramos nada para «${query}». Prueba con otra palabra.`,
    seeAllLabel: null,
    hubLinkLabel: 'Ver todos los artículos en español',
  },
  fr: {
    placeholder: 'Rechercher un article ou une boutique',
    inputLabel: 'Rechercher sur le site',
    clearLabel: 'Effacer la recherche',
    resultCount: (count) => `${count} ${count === 1 ? 'résultat' : 'résultats'}`,
    typeLabels: { recipe: 'Recette', review: 'Article', store: 'Boutique' },
    noResultsTitle: 'Aucun résultat',
    noResultsHint: (query) => `Rien ne correspond à «${NBSP}${query}${NBSP}». Essayez un autre mot.`,
    seeAllLabel: null,
    hubLinkLabel: 'Voir tous les articles en français',
  },
  de: {
    placeholder: 'Artikel und Shops durchsuchen',
    inputLabel: 'Website durchsuchen',
    clearLabel: 'Suche löschen',
    resultCount: (count) => `${count} ${count === 1 ? 'Ergebnis' : 'Ergebnisse'}`,
    typeLabels: { recipe: 'Rezept', review: 'Artikel', store: 'Shop' },
    noResultsTitle: 'Keine Ergebnisse',
    noResultsHint: (query) => `Nichts gefunden für „${query}“. Versuchen Sie einen anderen Begriff.`,
    seeAllLabel: null,
    hubLinkLabel: 'Alle Artikel auf Deutsch ansehen',
  },
  it: {
    placeholder: 'Cerca articoli e negozi',
    inputLabel: 'Cerca nel sito',
    clearLabel: 'Cancella la ricerca',
    resultCount: (count) => `${count} ${count === 1 ? 'risultato' : 'risultati'}`,
    typeLabels: { recipe: 'Ricetta', review: 'Articolo', store: 'Negozio' },
    noResultsTitle: 'Nessun risultato',
    noResultsHint: (query) => `Niente per «${query}». Prova con un’altra parola.`,
    seeAllLabel: null,
    hubLinkLabel: 'Vedi tutti gli articoli in italiano',
  },
  ko: {
    placeholder: '글과 스토어 검색',
    inputLabel: '사이트 검색',
    clearLabel: '검색어 지우기',
    resultCount: (count) => `검색 결과 ${count}개`,
    typeLabels: { recipe: '레시피', review: '글', store: '스토어' },
    noResultsTitle: '검색 결과가 없습니다',
    noResultsHint: (query) => `‘${query}’에 해당하는 항목이 없습니다. 다른 단어로 검색해 보세요.`,
    seeAllLabel: null,
    hubLinkLabel: '한국어 글 모두 보기',
  },
  ja: {
    placeholder: '記事やストアを検索',
    inputLabel: 'サイト内検索',
    clearLabel: '検索語をクリア',
    resultCount: (count) => `${count}件の結果`,
    typeLabels: { recipe: 'レシピ', review: '記事', store: 'ストア' },
    noResultsTitle: '結果が見つかりません',
    noResultsHint: (query) => `「${query}」に一致する結果はありません。別の言葉でお試しください。`,
    seeAllLabel: null,
    hubLinkLabel: '日本語の記事をすべて見る',
  },
  'zh-hant': {
    placeholder: '搜尋文章與商店',
    inputLabel: '搜尋網站',
    clearLabel: '清除搜尋',
    resultCount: (count) => `${count} 筆結果`,
    typeLabels: { recipe: '食譜', review: '文章', store: '商店' },
    noResultsTitle: '找不到結果',
    noResultsHint: (query) => `沒有與「${query}」相符的結果，請換個關鍵字試試。`,
    seeAllLabel: null,
    hubLinkLabel: '查看所有繁體中文文章',
  },
  'zh-hans': {
    placeholder: '搜索文章和商店',
    inputLabel: '搜索网站',
    clearLabel: '清除搜索',
    resultCount: (count) => `${count} 条结果`,
    typeLabels: { recipe: '食谱', review: '文章', store: '商店' },
    noResultsTitle: '未找到结果',
    noResultsHint: (query) => `没有与“${query}”相符的结果，请换个关键词试试。`,
    seeAllLabel: null,
    hubLinkLabel: '查看所有简体中文文章',
  },
};

export function getSearchCopy(locale: Locale): SearchCopy {
  return SEARCH_COPY[locale];
}
