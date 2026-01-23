import Link from 'next/link';

export const metadata = {
  title: "Sobre - Em Casa com Cecília",
  description: "Conheça a Cecília e a história por trás do canal Em Casa com Cecília!",
};

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a4d2e] to-[#0f1419] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#ffd700] to-[#ff6b35] flex items-center justify-center text-6xl">
            👩‍🍳
          </div>
          <h1 className="text-5xl font-extrabold text-[#ffd700] mb-4">
            Olá, eu sou a Cecília!
          </h1>
          <p className="text-2xl text-white/90">
            Bem-vindo(a) ao meu cantinho da culinária!
          </p>
        </div>
      </section>

      {/* Minha História */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-[#1a4d2e] mb-8 text-center">
            Minha História
          </h2>

          <div className="prose prose-lg max-w-none">
            <div className="bg-[#f5f5f5] rounded-2xl p-8 mb-8">
              <p className="text-gray-700 mb-4">
                Sempre amei cozinhar! Desde pequena, ficava na cozinha com minha mãe e minha avó,
                aprendendo os segredos de cada receita. O cheiro de bolo no forno, o som da panela
                de pressão apitando... tudo isso faz parte das minhas melhores lembranças.
              </p>
              <p className="text-gray-700 mb-4">
                Com o tempo, percebi que cozinhar não é só sobre seguir receitas, mas sobre criar
                momentos especiais, reunir a família e amigos, e colocar amor em cada prato.
              </p>
              <p className="text-gray-700">
                Foi assim que surgiu o <strong className="text-[#ff6b35]">Em Casa com Cecília</strong>:
                um lugar onde compartilho minhas receitas favoritas, testo produtos e ingredientes,
                e mostro que cozinhar pode ser simples, gostoso e divertido!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O Canal */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#ffd700] to-[#ff6b35]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Sobre o Canal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-5xl mb-3">🍳</div>
              <h3 className="text-xl font-bold text-white mb-2">Receitas</h3>
              <p className="text-white/90">
                Receitas testadas e aprovadas, desde o básico até pratos mais elaborados
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-5xl mb-3">⭐</div>
              <h3 className="text-xl font-bold text-white mb-2">Reviews</h3>
              <p className="text-white/90">
                Análises sinceras de produtos, eletrodomésticos e ingredientes
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-5xl mb-3">💡</div>
              <h3 className="text-xl font-bold text-white mb-2">Dicas</h3>
              <p className="text-white/90">
                Truques e segredos para você arrasar na cozinha
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-[#1a4d2e] mb-8 text-center">
            Meus Valores
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-[#f5f5f5] rounded-2xl p-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#ff6b35] rounded-full flex items-center justify-center text-white text-2xl">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a4d2e] mb-2">
                  Sinceridade Sempre
                </h3>
                <p className="text-gray-700">
                  Todos os meus reviews são honestos. Se algo não presta, eu falo!
                  Não aceito patrocínios que comprometam minha opinião.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-[#f5f5f5] rounded-2xl p-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#ffd700] rounded-full flex items-center justify-center text-[#1a4d2e] text-2xl">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a4d2e] mb-2">
                  Receitas Acessíveis
                </h3>
                <p className="text-gray-700">
                  Acredito que cozinhar bem não precisa ser caro. Minhas receitas usam
                  ingredientes fáceis de encontrar e que cabem no bolso.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-[#f5f5f5] rounded-2xl p-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#1a4d2e] rounded-full flex items-center justify-center text-white text-2xl">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a4d2e] mb-2">
                  Comunidade em Primeiro Lugar
                </h3>
                <p className="text-gray-700">
                  Vocês são a razão do canal existir! Adoro ler os comentários, responder
                  dúvidas e fazer receitas sugeridas por vocês.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16 px-6 bg-[#f5f5f5]">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-[#1a4d2e] mb-12 text-center">
            Juntos Somos Mais Fortes!
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-5xl font-extrabold text-[#ff6b35] mb-2">
                100+
              </div>
              <div className="text-gray-700 font-semibold">
                Receitas
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-[#ffd700] mb-2">
                50+
              </div>
              <div className="text-gray-700 font-semibold">
                Reviews
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-[#1a4d2e] mb-2">
                10k+
              </div>
              <div className="text-gray-700 font-semibold">
                Inscritos
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-[#ff6b35] mb-2">
                500+
              </div>
              <div className="text-gray-700 font-semibold">
                Vídeos
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#1a4d2e] to-[#0f1419] py-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-[#ffd700] mb-4">
            Vamos Cozinhar Juntos?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Se inscreva no canal, ative o sininho e venha fazer parte dessa família!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://youtube.com/@emcasacomcecilia"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#ff6b35] text-white rounded-full font-bold hover:bg-[#ffd700] hover:text-[#1a4d2e] transition-all"
            >
              Se Inscrever no YouTube
            </a>
            <Link
              href="/contato"
              className="px-8 py-4 border-2 border-[#ffd700] text-[#ffd700] rounded-full font-bold hover:bg-[#ffd700] hover:text-[#1a4d2e] transition-all"
            >
              Entrar em Contato
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
