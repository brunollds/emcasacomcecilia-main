import Link from 'next/link';

// Mock data - você pode conectar a um banco de dados depois
const getReceitaById = (id) => {
  const receitas = {
    1: {
      id: 1,
      titulo: "Bolo de Cenoura com Cobertura de Chocolate",
      descricao: "Um clássico brasileiro que nunca sai de moda! Fofo, úmido e com aquela cobertura irresistível.",
      categoria: "Doces",
      tempoPreparo: "45 min",
      rendimento: "12 porções",
      dificuldade: "Fácil",
      youtubeUrl: "https://youtube.com/watch?v=example1",
      ingredientes: {
        massa: [
          "3 cenouras médias",
          "4 ovos",
          "1 xícara de óleo",
          "2 xícaras de açúcar",
          "2 xícaras e meia de farinha de trigo",
          "1 colher de sopa de fermento em pó"
        ],
        cobertura: [
          "3 colheres de sopa de chocolate em pó",
          "1 colher de sopa de manteiga",
          "1 lata de leite condensado"
        ]
      },
      modoPreparo: [
        "No liquidificador, bata as cenouras, os ovos e o óleo até ficar homogêneo.",
        "Em uma tigela, misture o açúcar e a farinha de trigo.",
        "Adicione a mistura do liquidificador aos ingredientes secos e mexa bem.",
        "Por último, adicione o fermento e misture delicadamente.",
        "Despeje a massa em uma forma untada e enfarinhada.",
        "Leve ao forno preaquecido a 180°C por aproximadamente 40 minutos.",
        "Para a cobertura, misture todos os ingredientes em uma panela e leve ao fogo até começar a ferver.",
        "Despeje a cobertura ainda quente sobre o bolo."
      ],
      dicas: [
        "Para saber se o bolo está pronto, faça o teste do palito.",
        "A cobertura deve ser colocada ainda quente sobre o bolo.",
        "Você pode adicionar granulado de chocolate por cima da cobertura."
      ]
    }
  };

  return receitas[id] || receitas[1];
};

export default function ReceitaPage({ params }) {
  const receita = getReceitaById(params.id);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a4d2e] to-[#0f1419] px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/receitas"
            className="inline-flex items-center gap-2 text-[#ffd700] hover:text-[#ff6b35] mb-6"
          >
            <span>←</span>
            <span className="font-semibold">Voltar para Receitas</span>
          </Link>

          <div className="flex items-start gap-4 mb-4">
            <span className="px-4 py-1 bg-[#ffd700] text-[#1a4d2e] text-sm font-bold rounded-full">
              {receita.categoria}
            </span>
            <span className="px-4 py-1 bg-[#ff6b35] text-white text-sm font-bold rounded-full">
              {receita.dificuldade}
            </span>
          </div>

          <h1 className="text-5xl font-extrabold text-[#ffd700] mb-4">
            {receita.titulo}
          </h1>

          <p className="text-xl text-white/90 mb-6">
            {receita.descricao}
          </p>

          {/* Info cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-1">⏱️</div>
              <div className="text-white/60 text-sm">Preparo</div>
              <div className="text-white font-bold">{receita.tempoPreparo}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-1">🍽️</div>
              <div className="text-white/60 text-sm">Rendimento</div>
              <div className="text-white font-bold">{receita.rendimento}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-1">📊</div>
              <div className="text-white/60 text-sm">Dificuldade</div>
              <div className="text-white font-bold">{receita.dificuldade}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vídeo do YouTube */}
      <section className="py-12 px-6 bg-[#f5f5f5]">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#1a4d2e] mb-6 text-center">
            Veja o Vídeo da Receita
          </h2>
          <div className="aspect-video bg-gradient-to-br from-[#ff6b35] to-[#ffd700] rounded-2xl flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">▶️</div>
              <p className="text-xl font-semibold">Vídeo em breve!</p>
              <a
                href={receita.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-2 bg-white text-[#1a4d2e] rounded-full font-bold hover:bg-[#ffd700] transition-all"
              >
                Ver no YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredientes */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#1a4d2e] mb-8">
            Ingredientes
          </h2>

          <div className="space-y-8">
            {/* Massa */}
            <div className="bg-[#f5f5f5] rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-[#1a4d2e] mb-4">
                Massa
              </h3>
              <ul className="space-y-3">
                {receita.ingredientes.massa.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#ff6b35] font-bold">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cobertura */}
            <div className="bg-[#f5f5f5] rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-[#1a4d2e] mb-4">
                Cobertura
              </h3>
              <ul className="space-y-3">
                {receita.ingredientes.cobertura.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#ff6b35] font-bold">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Modo de Preparo */}
      <section className="py-12 px-6 bg-[#f5f5f5]">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#1a4d2e] mb-8">
            Modo de Preparo
          </h2>

          <ol className="space-y-4">
            {receita.modoPreparo.map((passo, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-[#ff6b35] text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <p className="text-gray-700 pt-2">{passo}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Dicas */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#1a4d2e] mb-8">
            Dicas da Cecília
          </h2>

          <div className="bg-gradient-to-br from-[#ffd700] to-[#ff6b35] rounded-2xl p-8">
            <ul className="space-y-4">
              {receita.dicas.map((dica, index) => (
                <li key={index} className="flex items-start gap-3 text-white">
                  <span className="text-2xl">💡</span>
                  <span className="pt-1 font-semibold">{dica}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a4d2e] py-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-[#ffd700] mb-4">
            Gostou da receita?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Compartilhe com seus amigos e veja mais receitas deliciosas!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/receitas"
              className="px-8 py-4 bg-[#ff6b35] text-white rounded-full font-bold hover:bg-[#ffd700] hover:text-[#1a4d2e] transition-all"
            >
              Ver Mais Receitas
            </Link>
            <Link
              href="/contato"
              className="px-8 py-4 border-2 border-[#ffd700] text-[#ffd700] rounded-full font-bold hover:bg-[#ffd700] hover:text-[#1a4d2e] transition-all"
            >
              Enviar Sugestão
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Generate static params for dynamic routes (opcional)
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
}
