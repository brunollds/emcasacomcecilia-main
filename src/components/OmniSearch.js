'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight } from 'lucide-react';

// Índice slim gerado no build (scripts/content/build-index.mjs -> public/search-index.json).
// Carregado sob demanda no 1º foco; a promise fica em cache no módulo para que as
// instâncias de desktop e mobile compartilhem um único fetch.
let indexPromise = null;
function loadSearchIndex() {
  if (!indexPromise) {
    indexPromise = fetch('/search-index.json')
      .then((res) => (res.ok ? res.json() : []))
      .catch(() => []);
  }
  return indexPromise;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function OmniSearch({ placeholder = 'Buscar receitas...' }) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(null);
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Busca debounced. Deps primitivas/estáveis (query: string, index: state) —
  // sem valores recriados no corpo, então o efeito não redispara sozinho. O reset
  // de query vazia acontece no onChange, então aqui o setState só roda dentro do
  // setTimeout (assíncrono), nunca sincronamente no corpo do efeito.
  useEffect(() => {
    const lowerQuery = query.trim().toLowerCase();
    if (!lowerQuery || !index) return undefined; // vazio ou índice ainda carregando

    const timer = setTimeout(() => {
      const filtered = index.filter((receita) => receita.terms.includes(lowerQuery));
      const sorted = filtered.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(lowerQuery);
        const bTitle = b.title.toLowerCase().includes(lowerQuery);
        if (aTitle && !bTitle) return -1;
        if (!aTitle && bTitle) return 1;
        return 0;
      });
      setResults(sorted.slice(0, 8));
      setIsOpen(true);
      setSelectedIndex(-1);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, index]);

  const handleFocus = () => {
    if (index === null) loadSearchIndex().then(setIndex);
    if (query.trim()) setIsOpen(true);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.location.href = `/receitas/${results[selectedIndex].slug}`;
        } else if (results.length > 0) {
          window.location.href = `/receitas/${results[0].slug}`;
        } else if (query.trim()) {
          window.location.href = `/receitas?q=${encodeURIComponent(query.trim())}`;
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  const highlightMatch = (text, term) => {
    const trimmed = term.trim();
    if (!trimmed) return text;
    const parts = text.split(new RegExp(`(${escapeRegExp(trimmed)})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === trimmed.toLowerCase() ? (
        <mark key={i} className="bg-[#ffd700]/60 text-inherit">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const clearQuery = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            if (!value.trim()) {
              setResults([]);
              setIsOpen(false);
              setSelectedIndex(-1);
            }
          }}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder}
          aria-label="Buscar receitas"
          className="w-full rounded-full border border-white/20 bg-white/10 py-2.5 pl-10 pr-9 text-sm text-white placeholder-white/50 transition-all focus:border-white/40 focus:bg-white/20 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={clearQuery}
            aria-label="Limpar busca"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-[60] mt-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-2xl">
          <p className="border-b border-gray-100 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500">
            {results.length} {results.length === 1 ? 'receita encontrada' : 'receitas encontradas'}
          </p>
          <ul className="max-h-[70vh] overflow-y-auto">
            {results.map((receita, i) => (
              <li key={receita.id ?? receita.slug}>
                <Link
                  href={`/receitas/${receita.slug}`}
                  onClick={clearQuery}
                  className={`flex items-center gap-3 border-b border-gray-100 px-4 py-2.5 transition-colors last:border-0 hover:bg-[#fef9f3] ${
                    i === selectedIndex ? 'bg-[#ffd700]/15' : ''
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#1a4d2e]">
                      {highlightMatch(receita.title, query)}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {[receita.category, receita.totalTime, receita.difficulty].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-gray-300" />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`/receitas?q=${encodeURIComponent(query.trim())}`}
            onClick={clearQuery}
            className="block bg-[#1a4d2e] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#ff6b35]"
          >
            Ver todas as receitas
          </Link>
        </div>
      )}

      {isOpen && query.trim() && index && results.length === 0 && (
        <div className="absolute z-[60] mt-2 w-full rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-2xl">
          <p className="text-sm font-semibold text-[#1a4d2e]">Nenhuma receita encontrada</p>
          <p className="mt-1 text-xs text-gray-500">
            Nada para &quot;{query.trim()}&quot;. Tente outro termo ou{' '}
            <Link href="/contato" onClick={clearQuery} className="font-semibold text-[#ff6b35] hover:underline">
              sugira esta receita
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
