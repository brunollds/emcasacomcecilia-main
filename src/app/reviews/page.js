// Mock data - Reviews
const reviews = [
  {
    id: 1,
    titulo: "Air Fryer Mondial - Vale a Pena?",
    tipo: "Eletrodoméstico",
    nota: 4.5,
    descricao: "Testei essa air fryer por 30 dias e vim contar tudo! Prós, contras e se realmente vale o investimento.",
    dataPublicacao: "15 Jan 2025",
    youtubeUrl: "https://youtube.com/watch?v=example1",
    pros: ["Fácil de limpar", "Preço acessível", "Boa capacidade"],
    contras: ["Barulho alto", "Manual confuso"]
  },
  {
    id: 2,
    titulo: "Processador Philips Walita - Review Completo",
    tipo: "Eletrodoméstico",
    nota: 5,
    descricao: "Um dos melhores processadores que já testei! Veja todos os detalhes neste review sincero.",
    dataPublicacao: "10 Jan 2025",
    youtubeUrl: "https://youtube.com/watch?v=example2",
    pros: ["Muito potente", "Durável", "Fácil de usar", "Várias funções"],
    contras: ["Preço elevado"]
  },
  {
    id: 3,
    titulo: "Chocolate em Pó Nestlé vs. Toddy",
    tipo: "Alimento",
    nota: 4,
    descricao: "Qual é o melhor chocolate em pó? Fiz um teste cego e os resultados me surpreenderam!",
    dataPublicacao: "05 Jan 2025",
    youtubeUrl: "https://youtube.com/watch?v=example3",
    pros: ["Teste justo", "Análise detalhada"],
    contras: []
  },
  {
    id: 4,
    titulo: "Panela de Pressão Elétrica Electrolux",
    tipo: "Eletrodoméstico",
    nota: 4.5,
    descricao: "Será que vale trocar a panela de pressão tradicional pela elétrica? Descubra aqui!",
    dataPublicacao: "28 Dez 2024",
    youtubeUrl: "https://youtube.com/watch?v=example4",
    pros: ["Segura", "Prática", "Várias receitas automáticas"],
    contras: ["Ocupa espaço", "Preço"]
  },
  {
    id: 5,
    titulo: "Azeite Extra Virgem - Comparativo",
    tipo: "Alimento",
    nota: 3.5,
    descricao: "Testei 5 marcas de azeite extra virgem para descobrir qual oferece melhor custo-benefício.",
    dataPublicacao: "20 Dez 2024",
    youtubeUrl: "https://youtube.com/watch?v=example5",
    pros: ["Comparativo justo", "Teste de qualidade"],
    contras: []
  },
  {
    id: 6,
    titulo: "Batedeira Planetária Mondial - Review",
    tipo: "Eletrodoméstico",
    nota: 4,
    descricao: "Para quem ama fazer bolos e pães, essa batedeira é um sonho! Veja minha análise completa.",
    dataPublicacao: "15 Dez 2024",
    youtubeUrl: "https://youtube.com/watch?v=example6",
    pros: ["Boa potência", "Tigela grande", "Custo-benefício"],
    contras: ["Vibra um pouco", "Plástico frágil"]
  }
];

const categorias = ["Todos", "Eletrodomésticos", "Alimentos", "Utensílios", "Ingredientes"];

export const metadata = {
  title: "Reviews & Análises - Em Casa com Cecília",
  description: "Reviews sinceros de produtos, eletrodomésticos e ingredientes. Descubra o que realmente vale a pena!",
};

function StarRating({ nota }) {
  const fullStars = Math.floor(nota);
  const hasHalfStar = nota % 1 !== 0;

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className="text-[#ffd700] text-xl">★</span>
      ))}
      {hasHalfStar && <span className="text-[#ffd700] text-xl">½</span>}
      {[...Array(5 - Math.ceil(nota))].map((_, i) => (
        <span key={i} className="text-gray-300 text-xl">★</span>
      ))}
      <span className="ml-2 text-gray-600 font-semibold">{nota}/5</span>
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a4d2e] to-[#0f1419] px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-5xl font-extrabold text-[#ffd700] mb-4">
            Reviews & Análises
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Reviews sinceros e honestos de produtos, eletrodomésticos e ingredientes.
            Tudo testado na prática para você fazer a melhor escolha!
          </p>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-8 px-6 bg-[#f5f5f5] border-b border-gray-200">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-3 justify-center">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                className="px-6 py-2 rounded-full bg-white text-[#1a4d2e] font-semibold border-2 border-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white transition-all"
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Reviews */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105"
              >
                {/* Badge de tipo */}
                <div className="bg-gradient-to-br from-[#ff6b35] to-[#ffd700] p-6 text-center">
                  <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-bold rounded-full mb-3">
                    {review.tipo}
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {review.titulo}
                  </h3>
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                  {/* Nota */}
                  <div className="mb-4">
                    <StarRating nota={review.nota} />
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {review.descricao}
                  </p>

                  {/* Prós */}
                  {review.pros.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-bold text-[#1a4d2e] text-sm mb-2">Prós:</h4>
                      <ul className="space-y-1">
                        {review.pros.slice(0, 2).map((pro, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Data */}
                  <div className="text-xs text-gray-400 mb-4">
                    Publicado em {review.dataPublicacao}
                  </div>

                  {/* Botão */}
                  <a
                    href={review.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-3 bg-[#ff6b35] text-white rounded-lg font-semibold hover:bg-[#1a4d2e] transition-all"
                  >
                    Assistir Review Completo
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-[#ff6b35] text-white rounded-full font-bold hover:bg-[#1a4d2e] transition-all">
              Carregar Mais Reviews
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#1a4d2e] to-[#0f1419] py-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-[#ffd700] mb-4">
            Quer que eu teste algum produto?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Envie sua sugestão e eu faço um review completo para você!
          </p>
          <a
            href="/contato"
            className="inline-block px-8 py-4 bg-[#ff6b35] text-white rounded-full font-bold hover:bg-[#ffd700] hover:text-[#1a4d2e] transition-all"
          >
            Enviar Sugestão
          </a>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-6 bg-[#f5f5f5]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-gray-600">
            <strong>Nota:</strong> Todos os reviews são baseados na minha experiência pessoal e opinião sincera.
            Não sou patrocinada por nenhuma das marcas mencionadas, a menos que seja explicitamente declarado.
          </p>
        </div>
      </section>
    </div>
  );
}
