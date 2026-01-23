import Link from 'next/link';

// Categorias em destaque (4 principais)
const categoriasDestaque = [
  { nome: "Doces", icon: "🍰", slug: "doces", cor: "from-pink-400 to-pink-600" },
  { nome: "Salgados", icon: "🥐", slug: "salgados", cor: "from-orange-400 to-orange-600" },
  { nome: "Massas", icon: "🍝", slug: "massas", cor: "from-yellow-400 to-yellow-600" },
  { nome: "Carnes", icon: "🍖", slug: "carnes", cor: "from-red-400 to-red-600" },
];

// Todas as categorias com ícones (UMA LINHA)
const todasCategorias = [
  { nome: "Café da Manhã", icon: "☕", slug: "cafe-manha" },
  { nome: "Lanche", icon: "🥪", slug: "lanche" },
  { nome: "Almoço", icon: "🍽️", slug: "almoco" },
  { nome: "Jantar", icon: "🌙", slug: "jantar" },
  { nome: "Sopas", icon: "🍲", slug: "sopas" },
  { nome: "Condimentos", icon: "🧂", slug: "condimentos" },
  { nome: "Sobremesas", icon: "🍮", slug: "sobremesas" },
];

// Receitas mais amadas e mais feitas
const receitasTop = [
  { id: 1, titulo: "Bolo de Cenoura", categoria: "Doces", tempo: "45 min" },
  { id: 2, titulo: "Frango à Parmegiana", categoria: "Carnes", tempo: "60 min" },
];

// Novas receitas (mock)
const novasReceitas = [
  { id: 1, titulo: "Bolo de Cenoura com Cobertura de Chocolate", categoria: "Doces", tempo: "45 min" },
  { id: 2, titulo: "Frango à Parmegiana Caseiro", categoria: "Carnes", tempo: "60 min" },
  { id: 3, titulo: "Pão Caseiro Simples e Fácil", categoria: "Pães", tempo: "120 min" },
  { id: 4, titulo: "Brigadeiro Gourmet", categoria: "Doces", tempo: "30 min" },
  { id: 5, titulo: "Lasanha à Bolonhesa", categoria: "Massas", tempo: "90 min" },
  { id: 6, titulo: "Torta de Limão Cremosa", categoria: "Doces", tempo: "50 min" },
];

// Coleções
const colecoes = [
  { nome: "Receitas Rápidas", descricao: "Menos de 30 minutos", icon: "⚡", total: 25 },
  { nome: "Low Carb", descricao: "Para quem cuida da saúde", icon: "🥗", total: 18 },
  { nome: "Receitas para Festas", descricao: "Impressione seus convidados", icon: "🎉", total: 32 },
  { nome: "Sobremesas Especiais", descricao: "Para ocasiões únicas", icon: "🍰", total: 42 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. 4 CARDS DE CATEGORIAS DESTAQUE - SEM BORDA */}
      <section className="py-12 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categoriasDestaque.map((cat) => (
              <Link
                key={cat.slug}
                href={`/receitas?categoria=${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                {/* Retangular: aspect-[2/1] aproximadamente */}
                <div className={`bg-gradient-to-br ${cat.cor} p-12 text-center aspect-[16/10]`}>
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {cat.nome}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TODAS AS CATEGORIAS - UMA LINHA */}
      <section className="py-12 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-[#1a4d2e] mb-6 text-center">
            Explore por Categoria
          </h2>
          {/* Uma linha - Overflow scroll em mobile */}
          <div className="flex justify-center gap-6 overflow-x-auto pb-4">
            {todasCategorias.map((cat) => (
              <Link
                key={cat.slug}
                href={`/receitas?categoria=${cat.slug}`}
                className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-all group flex-shrink-0"
              >
                <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <span className="text-sm font-semibold text-gray-700 text-center group-hover:text-[#ff6b35] transition-colors whitespace-nowrap">
                  {cat.nome}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SOBRE + RECEITAS TOP + SOCIAIS */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* About - CARD MAIOR (70% width) */}
            <div className="md:col-span-8">
              <div className="bg-white rounded-2xl p-10 shadow-lg h-full">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 flex-shrink-0 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ffd700] flex items-center justify-center text-6xl">
                    👩‍🍳
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-bold text-[#1a4d2e] mb-3">
                      Cecília Mauad
                    </h3>
                    <p className="text-gray-600 text-lg mb-6">
                      Apaixonada por culinária, compartilho receitas deliciosas e reviews sinceros!
                      Venha cozinhar comigo e descobrir o prazer de fazer comida caseira.
                    </p>
                    <Link
                      href="/sobre"
                      className="inline-block px-8 py-3 bg-[#1a4d2e] text-white rounded-full font-semibold hover:bg-[#ff6b35] transition-all"
                    >
                      Sobre Mim →
                    </Link>

                    {/* Sociais */}
                    <div className="mt-6 flex justify-center md:justify-start gap-4">
                      <a href="https://youtube.com/@emcasacomcecilia" target="_blank" rel="noopener" className="text-4xl hover:scale-110 transition-transform">
                        📺
                      </a>
                      <a href="https://instagram.com/emcasacomcecilia" target="_blank" rel="noopener" className="text-4xl hover:scale-110 transition-transform">
                        📷
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Receitas - COLUNA VERTICAL (30% width) */}
            <div className="md:col-span-4">
              <div className="space-y-6">
                {/* Mais Amadas */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-lg font-bold text-[#ff6b35] mb-4 flex items-center gap-2">
                    ❤️ Mais Amadas
                  </h4>
                  <div className="space-y-3">
                    {receitasTop.map((receita) => (
                      <Link
                        key={`amada-${receita.id}`}
                        href={`/receitas/${receita.id}`}
                        className="block p-2 rounded-lg hover:bg-gray-50 transition-all"
                      >
                        <h5 className="font-semibold text-[#1a4d2e] mb-1 text-sm">
                          {receita.titulo}
                        </h5>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{receita.categoria}</span>
                          <span>•</span>
                          <span>⏱️ {receita.tempo}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mais Feitas */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="text-lg font-bold text-[#ffd700] mb-4 flex items-center gap-2">
                    🔥 Mais Feitas
                  </h4>
                  <div className="space-y-3">
                    {receitasTop.map((receita) => (
                      <Link
                        key={`feita-${receita.id}`}
                        href={`/receitas/${receita.id}`}
                        className="block p-2 rounded-lg hover:bg-gray-50 transition-all"
                      >
                        <h5 className="font-semibold text-[#1a4d2e] mb-1 text-sm">
                          {receita.titulo}
                        </h5>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{receita.categoria}</span>
                          <span>•</span>
                          <span>⏱️ {receita.tempo}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NOVAS RECEITAS - GRID MINIMALISTA */}
      <section className="py-16 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-[#1a4d2e] mb-8">
            Novas Receitas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {novasReceitas.map((receita) => (
              <Link
                key={receita.id}
                href={`/receitas/${receita.id}`}
                className="group"
              >
                {/* Imagem */}
                <div className="aspect-video bg-gradient-to-br from-[#ff6b35] to-[#ffd700] rounded-2xl mb-4 flex items-center justify-center text-6xl overflow-hidden">
                  <span className="transform group-hover:scale-110 transition-transform">
                    🍽️
                  </span>
                </div>

                {/* Info - MINIMALISTA */}
                <div>
                  <h3 className="text-xl font-bold text-[#1a4d2e] mb-2 group-hover:text-[#ff6b35] transition-colors">
                    {receita.titulo}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>{receita.categoria}</span>
                    <span>•</span>
                    <span>⏱️ {receita.tempo}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Ver Todas */}
          <div className="text-center mt-12">
            <Link
              href="/receitas"
              className="inline-block px-8 py-4 bg-[#1a4d2e] text-white rounded-full font-bold hover:bg-[#ff6b35] transition-all"
            >
              Ver Todas as Receitas →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. COLEÇÕES */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-[#1a4d2e] mb-3">
            Coleções Especiais
          </h2>
          <p className="text-gray-600 mb-8">
            Receitas organizadas por temas e ocasiões
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {colecoes.map((colecao) => (
              <Link
                key={colecao.nome}
                href={`/colecoes/${colecao.nome.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                <div className="text-5xl mb-4">{colecao.icon}</div>
                <h3 className="text-xl font-bold text-[#1a4d2e] mb-2">
                  {colecao.nome}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {colecao.descricao}
                </p>
                <div className="text-[#ff6b35] font-semibold">
                  {colecao.total} receitas →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA FINAL */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#1a4d2e] to-[#0f1419]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-[#ffd700] mb-4">
            Inscreva-se no Canal!
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Não perca nenhuma receita nova! Toda semana tem novidades deliciosas.
          </p>
          <a
            href="https://youtube.com/@emcasacomcecilia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-[#ff6b35] text-white rounded-full font-bold hover:bg-[#ffd700] hover:text-[#1a4d2e] transition-all text-lg"
          >
            📺 Inscrever no YouTube
          </a>
        </div>
      </section>
    </div>
  );
}
