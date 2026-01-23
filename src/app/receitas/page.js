'use client';

import Link from 'next/link';
import OmniSearch from '@/components/OmniSearch';
import { useState } from 'react';

// Mock data - você pode substituir por dados reais depois
const receitasDestaque = [
  {
    id: 1,
    titulo: "Bolo de Cenoura com Cobertura de Chocolate",
    descricao: "Um clássico brasileiro que nunca sai de moda! Fofo, úmido e com aquela cobertura irresistível.",
    categoria: "Doces",
    tempoPreparo: "45 min",
    dificuldade: "Fácil",
    imagem: "/receitas/bolo-cenoura.jpg",
    youtubeUrl: "https://youtube.com/watch?v=example1"
  },
  {
    id: 2,
    titulo: "Frango à Parmegiana Caseiro",
    descricao: "O favorito de todo mundo! Aprenda a fazer um frango à parmegiana suculento e delicioso.",
    categoria: "Carnes",
    tempoPreparo: "60 min",
    dificuldade: "Médio",
    imagem: "/receitas/frango-parmegiana.jpg",
    youtubeUrl: "https://youtube.com/watch?v=example2"
  },
  {
    id: 3,
    titulo: "Pão Caseiro Simples e Fácil",
    descricao: "Nada melhor que o cheiro de pão fresquinho saindo do forno! Receita super fácil.",
    categoria: "Pães",
    tempoPreparo: "120 min",
    dificuldade: "Médio",
    imagem: "/receitas/pao-caseiro.jpg",
    youtubeUrl: "https://youtube.com/watch?v=example3"
  },
  {
    id: 4,
    titulo: "Brigadeiro Gourmet",
    descricao: "Aprenda a fazer brigadeiros cremosos e deliciosos para vender ou presentear!",
    categoria: "Doces",
    tempoPreparo: "30 min",
    dificuldade: "Fácil",
    imagem: "/receitas/brigadeiro.jpg",
    youtubeUrl: "https://youtube.com/watch?v=example4"
  },
  {
    id: 5,
    titulo: "Lasanha à Bolonhesa",
    descricao: "Uma lasanha suculenta com molho bolonhesa caseiro e muito queijo!",
    categoria: "Massas",
    tempoPreparo: "90 min",
    dificuldade: "Médio",
    imagem: "/receitas/lasanha.jpg",
    youtubeUrl: "https://youtube.com/watch?v=example5"
  },
  {
    id: 6,
    titulo: "Torta de Limão Cremosa",
    descricao: "Uma sobremesa refrescante e deliciosa! Perfeita para dias quentes.",
    categoria: "Doces",
    tempoPreparo: "50 min",
    dificuldade: "Fácil",
    imagem: "/receitas/torta-limao.jpg",
    youtubeUrl: "https://youtube.com/watch?v=example6"
  }
];

const categorias = ["Todos", "Doces", "Salgados", "Carnes", "Massas", "Pães", "Sobremesas"];

export default function ReceitasPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [receitasFiltradas, setReceitasFiltradas] = useState(receitasDestaque);

  // Filtrar por categoria
  const filtrarPorCategoria = (categoria) => {
    setCategoriaAtiva(categoria);
    if (categoria === "Todos") {
      setReceitasFiltradas(receitasDestaque);
    } else {
      setReceitasFiltradas(
        receitasDestaque.filter(r => r.categoria === categoria)
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section com Busca */}
      <section className="bg-gradient-to-br from-[#1a4d2e] to-[#0f1419] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold text-[#ffd700] mb-4">
              Receitas Deliciosas
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore nossa coleção de receitas testadas e aprovadas! De doces a salgados,
              tudo feito com muito carinho e ingredientes acessíveis.
            </p>
          </div>

          {/* OMNISEARCH - Busca Principal */}
          <div className="max-w-3xl mx-auto">
            <OmniSearch
              receitas={receitasDestaque}
              placeholder="🔍 Buscar receitas, ingredientes, categoria..."
            />
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-8 px-6 bg-[#f5f5f5] border-b border-gray-200">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-3 justify-center">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => filtrarPorCategoria(categoria)}
                className={`px-6 py-2 rounded-full font-semibold border-2 transition-all ${
                  categoriaAtiva === categoria
                    ? 'bg-[#1a4d2e] text-white border-[#1a4d2e]'
                    : 'bg-white text-[#1a4d2e] border-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white'
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Receitas */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Contador de resultados */}
          <div className="mb-6">
            <p className="text-gray-600">
              {receitasFiltradas.length === receitasDestaque.length
                ? `${receitasFiltradas.length} receitas disponíveis`
                : `${receitasFiltradas.length} receita(s) na categoria "${categoriaAtiva}"`
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {receitasFiltradas.map((receita) => (
              <div
                key={receita.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105"
              >
                {/* Imagem placeholder */}
                <div className="aspect-video bg-gradient-to-br from-[#ff6b35] to-[#ffd700] flex items-center justify-center">
                  <span className="text-white text-6xl">🍽️</span>
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                  {/* Badge de categoria */}
                  <span className="inline-block px-3 py-1 bg-[#ffd700] text-[#1a4d2e] text-xs font-bold rounded-full mb-3">
                    {receita.categoria}
                  </span>

                  <h3 className="text-2xl font-bold text-[#1a4d2e] mb-2">
                    {receita.titulo}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {receita.descricao}
                  </p>

                  {/* Info */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <span>⏱️</span>
                      <span>{receita.tempoPreparo}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>📊</span>
                      <span>{receita.dificuldade}</span>
                    </div>
                  </div>

                  {/* Botões */}
                  <div className="flex gap-3">
                    <Link
                      href={`/receitas/${receita.id}`}
                      className="flex-1 text-center px-4 py-2 bg-[#1a4d2e] text-white rounded-lg font-semibold hover:bg-[#ff6b35] transition-all"
                    >
                      Ver Receita
                    </Link>
                    <a
                      href={receita.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border-2 border-[#ff6b35] text-[#ff6b35] rounded-lg font-semibold hover:bg-[#ff6b35] hover:text-white transition-all"
                      aria-label="Ver no YouTube"
                    >
                      ▶️
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-[#ff6b35] text-white rounded-full font-bold hover:bg-[#1a4d2e] transition-all">
              Carregar Mais Receitas
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1a4d2e] py-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-[#ffd700] mb-4">
            Não encontrou o que procurava?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Envie sua sugestão de receita e eu vou preparar um vídeo especial para você!
          </p>
          <Link
            href="/contato"
            className="inline-block px-8 py-4 bg-[#ff6b35] text-white rounded-full font-bold hover:bg-[#ffd700] hover:text-[#1a4d2e] transition-all"
          >
            Enviar Sugestão
          </Link>
        </div>
      </section>
    </div>
  );
}
