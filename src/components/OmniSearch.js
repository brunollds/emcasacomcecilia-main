'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { getRecipeAllCategoryLabels, getRecipePrimaryCategory } from '@/lib/data';

export default function OmniSearch({ receitas, placeholder = "Buscar receitas, ingredientes..." }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Função de busca omnisearch
  const searchRecipes = useCallback((searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase().trim();

    const filtered = receitas.filter((receita) => {
      // Busca no título
      if (receita.title.toLowerCase().includes(lowerQuery)) return true;

      // Busca na descrição
      if (receita.description?.toLowerCase().includes(lowerQuery)) return true;

      // Busca na categoria
      if (getRecipeAllCategoryLabels(receita).some(category => category.toLowerCase().includes(lowerQuery))) return true;

      // Busca na dificuldade
      if (receita.difficulty?.toLowerCase().includes(lowerQuery)) return true;

      if (receita.searchTerms?.some(term => term.toLowerCase().includes(lowerQuery))) return true;

      // Busca nos ingredientes (se tiver)
      if (receita.ingredients) {
        const allIngredients = receita.ingredients
          .flatMap(section => section.items || [])
          .join(' ')
          .toLowerCase();

        if (allIngredients.includes(lowerQuery)) return true;
      }

      // Busca nas tags (se tiver)
      if (receita.tags && Array.isArray(receita.tags)) {
        if (receita.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) return true;
      }

      return false;
    });

    // Ordenar por relevância (título > ingredientes > descrição)
    const sorted = filtered.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(lowerQuery);
      const bTitleMatch = b.title.toLowerCase().includes(lowerQuery);

      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;

      return 0;
    });

    setResults(sorted.slice(0, 8)); // Máximo 8 resultados
    setIsOpen(true);
  }, [receitas]);

  // Busca em tempo real (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      searchRecipes(query);
    }, 300); // 300ms de delay

    return () => clearTimeout(timer);
  }, [query, searchRecipes]);

  // Navegação por teclado
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.location.href = `/receitas/${results[selectedIndex].slug}`;
        } else if (results.length > 0) {
          window.location.href = `/receitas/${results[0].slug}`;
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Highlight do texto
  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <mark key={i} className="bg-[#ffd700] text-[#1a4d2e] font-bold">{part}</mark>
        : part
    );
  };

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Input de Busca */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-5 py-4 pl-14 text-lg border-2 border-gray-300 rounded-full focus:border-[#ff6b35] focus:outline-none transition-all shadow-lg"
        />

        {/* Ícone de busca */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-2xl">
          🔍
        </div>

        {/* Botão limpar */}
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
            }}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        )}
      </div>

      {/* Dropdown de Resultados */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
          <div className="p-3 bg-[#f5f5f5] border-b border-gray-200">
            <span className="text-sm text-gray-600 font-semibold">
              {results.length} {results.length === 1 ? 'receita encontrada' : 'receitas encontradas'}
            </span>
          </div>

          <ul className="max-h-96 overflow-y-auto">
            {results.map((receita, index) => (
              <li key={receita.id}>
                <Link
                  href={`/receitas/${receita.slug}`}
                  className={`block px-5 py-4 hover:bg-[#f5f5f5] transition-colors border-b border-gray-100 last:border-0 ${
                    index === selectedIndex ? 'bg-[#ffd700]/20' : ''
                  }`}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery('');
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Emoji ou imagem */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#ff6b35] to-[#ffd700] rounded-lg flex items-center justify-center text-3xl">
                      🍽️
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#1a4d2e] mb-1 truncate">
                        {highlightMatch(receita.title, query)}
                      </h4>

                      <p className="text-sm text-gray-600 line-clamp-1 mb-2">
                        {receita.description}
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-[#ffd700] text-[#1a4d2e] text-xs font-bold rounded-full">
                          {getRecipePrimaryCategory(receita)}
                        </span>
                        <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full">
                          ⏱️ {receita.totalTime}
                        </span>
                        <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full">
                          📊 {receita.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Seta */}
                    <div className="flex-shrink-0 text-gray-400 text-xl">
                      →
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Ver todos os resultados */}
          <Link
            href={`/receitas?q=${encodeURIComponent(query)}`}
            className="block px-5 py-3 bg-[#1a4d2e] text-white text-center font-semibold hover:bg-[#ff6b35] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Ver todos os resultados ({results.length})
          </Link>
        </div>
      )}

      {/* Sem resultados */}
      {isOpen && query && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8 text-center">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-xl font-bold text-[#1a4d2e] mb-2">
            Nenhuma receita encontrada
          </h3>
          <p className="text-gray-600 mb-4">
            Não encontramos receitas com &quot;{query}&quot;
          </p>
          <Link
            href="/contato"
            className="inline-block px-6 py-2 bg-[#ff6b35] text-white rounded-full font-semibold hover:bg-[#1a4d2e] transition-all"
          >
            Sugerir esta receita
          </Link>
        </div>
      )}

      {/* Dicas de uso */}
      {!query && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-500">
            💡 Dica: Busque por nome, ingrediente ou categoria
          </p>
        </div>
      )}
    </div>
  );
}
