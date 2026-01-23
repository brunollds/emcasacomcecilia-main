'use client';

import { useState } from 'react';

const faqData = [
  {
    categoria: "Receitas",
    perguntas: [
      {
        pergunta: "Posso substituir ingredientes nas receitas?",
        resposta: "Sim! Geralmente sim, mas depende do ingrediente. Algumas substituições comuns: leite por leite de coco, manteiga por margarina, açúcar por adoçante culinário. Se tiver dúvida sobre uma substituição específica, me pergunte nos comentários!"
      },
      {
        pergunta: "As receitas podem ser dobradas ou divididas?",
        resposta: "Com certeza! A maioria das receitas pode ser dobrada ou dividida pela metade. Apenas fique atenta ao tempo de forno, que pode precisar de ajustes."
      },
      {
        pergunta: "Como sei se meu forno está na temperatura certa?",
        resposta: "O ideal é usar um termômetro de forno. Se não tiver, faça o teste do papel: coloque um papel branco no forno preaquecido. Se ficar dourado em 5 minutos, está entre 150-180°C. Se dourar em 3 minutos, está acima de 200°C."
      },
      {
        pergunta: "Posso congelar as receitas?",
        resposta: "Depende! Massas de bolo, tortas, brigadeiros e muitos pratos salgados congelam bem. Já receitas com creme de leite fresco, maionese ou vegetais crus não congelam tão bem. Sempre indico nos vídeos quando a receita pode ser congelada!"
      }
    ]
  },
  {
    categoria: "Sobre o Canal",
    perguntas: [
      {
        pergunta: "Com que frequência você posta vídeos?",
        resposta: "Posto vídeos novos toda terça e sexta-feira, às 18h! Às vezes faço lives no fim de semana também. Ative o sininho para não perder nenhum vídeo!"
      },
      {
        pergunta: "Você testa todas as receitas antes de postar?",
        resposta: "SIM! Todas as receitas que posto no canal foram testadas por mim (às vezes várias vezes até ficarem perfeitas). Não posto nada que eu não faria na minha própria cozinha!"
      },
      {
        pergunta: "Você aceita sugestões de receitas?",
        resposta: "ADOROOOO! Sempre leio os comentários e anoto as sugestões. Muitas receitas do canal surgiram de pedidos de vocês. Pode sugerir à vontade!"
      },
      {
        pergunta: "Você vende as receitas?",
        resposta: "Não! Todas as receitas do canal são 100% gratuitas. Você pode encontrá-las aqui no site ou na descrição dos vídeos no YouTube."
      }
    ]
  },
  {
    categoria: "Reviews",
    perguntas: [
      {
        pergunta: "Você é paga pelas marcas que avalia?",
        resposta: "Só aceito parcerias com marcas que realmente uso e confio. Quando o review é patrocinado, SEMPRE aviso no início do vídeo. A maioria dos meus reviews são de produtos que comprei com meu próprio dinheiro!"
      },
      {
        pergunta: "Como você escolhe os produtos para testar?",
        resposta: "De três formas: produtos que uso e amo, produtos que vocês pedem nos comentários, e lançamentos interessantes do mercado. Priorizo sempre produtos acessíveis e que fazem diferença na cozinha!"
      },
      {
        pergunta: "Você testa produtos de marcas pequenas?",
        resposta: "Sim! Adoro descobrir marcas novas e de produtores locais. Se você tem uma marca ou conhece alguma que vale a pena testar, me manda uma mensagem!"
      }
    ]
  },
  {
    categoria: "Equipamentos",
    perguntas: [
      {
        pergunta: "Quais equipamentos básicos você recomenda?",
        resposta: "Para começar: jogo de panelas básico (panela, frigideira, panela de pressão), jogo de facas, tábua de corte, colheres de pau, espátula, peneira, tigelas e formas básicas. Não precisa nada muito caro no início!"
      },
      {
        pergunta: "Vale a pena comprar uma batedeira?",
        resposta: "Se você gosta de fazer bolos, pães e doces, vale MUITO! Facilita demais o trabalho. Mas se for fazer só de vez em quando, pode começar com um mixer ou até mesmo uma colher e bastante disposição!"
      },
      {
        pergunta: "Air fryer vale a pena?",
        resposta: "Depende do seu estilo de vida! É ótima para quem mora sozinho ou em casal, quer praticidade e gosta de frituras mais saudáveis. Para famílias grandes, pode ser limitada. Tenho um review completo sobre isso no canal!"
      }
    ]
  },
  {
    categoria: "Dúvidas Técnicas",
    perguntas: [
      {
        pergunta: "Meu bolo afundou no meio, o que aconteceu?",
        resposta: "Principais motivos: forno não estava quente o suficiente, abriu o forno antes da hora, usou muito fermento, ou bateu demais a massa depois de adicionar o fermento. Confira meu vídeo sobre 'Erros Comuns ao Fazer Bolo'!"
      },
      {
        pergunta: "Como deixar o arroz sempre soltinho?",
        resposta: "Segredo: lave bem o arroz antes (até a água ficar transparente) e use a proporção certa de água (geralmente 1 xícara de arroz para 2 de água). Não mexa muito durante o cozimento!"
      },
      {
        pergunta: "Minha massa de pão não cresce, por quê?",
        resposta: "Pode ser: fermento vencido ou morto (água muito quente mata o fermento!), lugar muito frio para crescer, ou faltou tempo de descanso. O fermento biológico precisa de tempo, calor e amor!"
      },
      {
        pergunta: "Como saber quando a carne está no ponto?",
        resposta: "O ideal é usar um termômetro culinário! Mas também ensino o 'teste da mão' e outras dicas práticas nos vídeos de carnes. Cada tipo de carne tem seus segredinhos!"
      }
    ]
  },
  {
    categoria: "Parcerias",
    perguntas: [
      {
        pergunta: "Você aceita parcerias?",
        resposta: "Sim! Mas sou super seletiva. Só trabalho com marcas que realmente uso, confio e que fazem sentido para o canal. Envie sua proposta detalhada para contato@emcasacomcecilia.com"
      },
      {
        pergunta: "Você faz eventos ou aulas presenciais?",
        resposta: "Eventualmente sim! Sempre aviso no canal e nas redes sociais quando vou fazer algum evento. Adoraria conhecer vocês pessoalmente!"
      },
      {
        pergunta: "Você faz consultoria para restaurantes?",
        resposta: "No momento não estou aceitando consultorias, mas você pode enviar um email explicando seu projeto. Quem sabe no futuro?"
      }
    ]
  }
];

function FAQItem({ pergunta, resposta }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-[#f5f5f5] transition-colors"
      >
        <span className="font-semibold text-[#1a4d2e] pr-4">
          {pergunta}
        </span>
        <span className={`text-[#ff6b35] text-2xl flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-[#f5f5f5] border-t-2 border-gray-200">
          <p className="text-gray-700">
            {resposta}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQsPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Receitas');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a4d2e] to-[#0f1419] px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-extrabold text-[#ffd700] mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-xl text-white/90">
            Respostas para as dúvidas mais comuns! Não encontrou o que procurava?
            Manda uma mensagem!
          </p>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-8 px-6 bg-[#f5f5f5] border-b-2 border-gray-200 sticky top-16 z-40">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3 justify-center">
            {faqData.map((item) => (
              <button
                key={item.categoria}
                onClick={() => setCategoriaAtiva(item.categoria)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  categoriaAtiva === item.categoria
                    ? 'bg-[#ff6b35] text-white'
                    : 'bg-white text-[#1a4d2e] border-2 border-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white'
                }`}
              >
                {item.categoria}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          {faqData.map((categoria) => (
            categoriaAtiva === categoria.categoria && (
              <div key={categoria.categoria}>
                <h2 className="text-3xl font-bold text-[#1a4d2e] mb-8">
                  {categoria.categoria}
                </h2>
                <div className="space-y-4">
                  {categoria.perguntas.map((faq, index) => (
                    <FAQItem
                      key={index}
                      pergunta={faq.pergunta}
                      resposta={faq.resposta}
                    />
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#1a4d2e] to-[#0f1419] py-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-[#ffd700] mb-4">
            Não encontrou sua resposta?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Sem problemas! Manda sua pergunta que eu respondo com carinho.
          </p>
          <a
            href="/contato"
            className="inline-block px-8 py-4 bg-[#ff6b35] text-white rounded-full font-bold hover:bg-[#ffd700] hover:text-[#1a4d2e] transition-all"
          >
            Fazer uma Pergunta
          </a>
        </div>
      </section>
    </div>
  );
}
