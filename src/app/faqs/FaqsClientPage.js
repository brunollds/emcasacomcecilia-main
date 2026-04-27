'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, MessageCircle, Video, Mail } from 'lucide-react';
import { brandLinks } from '@/lib/data';

const faqData = [
  {
    categoria: 'Em Casa com Cecília',
    perguntas: [
      {
        pergunta: 'O que é o projeto Em Casa com Cecília?',
        resposta: 'É um projeto de culinária que divulga receitas fáceis, apresentado por Cecília Mauad.',
        link: { href: '/sobre', label: 'Saber mais sobre o projeto' },
      },
      {
        pergunta: 'Quem é Cecília Mauad?',
        resposta: 'Cecília Mauad é jornalista, casada, mãe de dois filhos e apaixonada por culinária.',
        link: { href: '/sobre', label: 'Conhecer a Cecília' },
      },
      {
        pergunta: 'Qual o objetivo do projeto?',
        resposta: 'Democratizar a culinária, mostrando que cozinhar pode ser simples, divertido e acessível para todos, com o slogan "Receitas Fáceis que Dão Certo".',
      },
      {
        pergunta: 'Onde posso ouvir os spots de rádio do Em Casa com Cecília?',
        resposta: 'Durante a programação no site da Rádio Líder FM e no Spotify.',
      },
    ],
  },
  {
    categoria: 'Receitas',
    perguntas: [
      {
        pergunta: 'Onde posso encontrar as receitas?',
        resposta: 'Nos artigos do blog, redes sociais, YouTube, Spotify e spots de rádio.',
      },
      {
        pergunta: 'Vocês fazem receitas para todos os níveis de cozinheiros?',
        resposta: 'Absolutamente! Temos conteúdo desde o básico para iniciantes até técnicas mais elaboradas para cozinheiros mais experientes.',
      },
      {
        pergunta: 'Posso adaptar as receitas?',
        resposta: 'Claro! As receitas são apenas uma sugestão. Sinta-se à vontade para adaptá-las aos seus gostos e ingredientes disponíveis.',
      },
      {
        pergunta: 'Como posso acompanhar as novidades do Em Casa com Cecília?',
        resposta: 'Você pode nos seguir nas redes sociais, onde postamos vídeos e dicas regularmente. Além disso, inscreva-se no blog, YouTube e/ou Spotify para receber atualizações sobre novos artigos e receitas.',
      },
      {
        pergunta: 'Posso sugerir uma receita ou tema para o projeto?',
        resposta: 'Claro! Adoramos receber sugestões de receitas dos nossos seguidores. Envie sua sugestão através do formulário de contato aqui no site, ou nas nossas redes sociais — quem sabe ela não aparece em uma das próximas postagens?',
        link: { href: '/contato', label: 'Ir para o contato' },
      },
      {
        pergunta: 'Posso fazer perguntas sobre as receitas?',
        resposta: 'Com certeza! Utilize a seção de comentários nas receitas, o formulário de contato no site ou entre em contato pelas nossas redes sociais.',
      },
    ],
  },
  {
    categoria: 'Parcerias e Colaborações',
    perguntas: [
      {
        pergunta: 'Posso enviar minha proposta de parceria comercial?',
        resposta: 'Sim! Valorizamos parcerias com fornecedores e parceiros que compartilhem nossa visão. Entre em contato para discutirmos possíveis colaborações.',
        link: { href: '/contato', label: 'Entrar em contato' },
      },
      {
        pergunta: 'O projeto tem alguma parceria com influenciadores?',
        resposta: 'Sim! Trabalhamos em colaboração com diversos influenciadores para trazer novas ideias e receitas ao nosso público. Essas parcerias enriquecem nosso conteúdo e oferecem uma variedade ainda maior de opções na cozinha.',
      },
      {
        pergunta: 'Posso solicitar o seu mídia kit?',
        resposta: 'Sim! Entre em contato pelo site ou pelas redes sociais e enviamos o mídia kit atualizado.',
        link: { href: brandLinks.mediaKit, label: 'Acessar o mídia kit', external: true },
      },
      {
        pergunta: 'Posso enviar um produto para análise / review?',
        resposta: 'Solicitamos que entre em contato antes para combinarmos os detalhes.',
        link: { href: '/contato', label: 'Entrar em contato' },
      },
    ],
  },
  {
    categoria: 'Dúvidas Técnicas',
    perguntas: [
      {
        pergunta: 'Os vídeos são gravados em estúdio?',
        resposta: 'Não, nossos vídeos são gravados em uma cozinha real, para manter a autenticidade e proximidade com nosso público.',
      },
      {
        pergunta: 'Os vídeos do YouTube podem ser assistidos offline?',
        resposta: 'Se você for assinante do YouTube Premium, pode baixar os vídeos para assistir offline diretamente pelo aplicativo do YouTube. Caso contrário, recomendamos assistir sempre que estiver conectado à internet.',
      },
      {
        pergunta: 'Estou tendo dificuldades para assistir aos vídeos no site. O que posso fazer?',
        resposta: 'Verifique se sua conexão com a internet está estável e se o navegador está atualizado. Caso o problema persista, tente abrir o site em um navegador diferente. Se ainda assim não funcionar, entre em contato pela página de contato.',
        link: { href: '/contato', label: 'Ir para o contato' },
      },
    ],
  },
  {
    categoria: 'Análise & Review',
    perguntas: [
      {
        pergunta: 'Que tipo de produtos vocês analisam?',
        resposta: 'Avaliamos eletrodomésticos, eletrônicos culinários, ingredientes e alimentos prontos, sempre com foco em praticidade, custo-benefício e desempenho.',
      },
      {
        pergunta: 'As análises são imparciais?',
        resposta: 'Sim. Não aceitamos pagamentos para análises positivas. Nosso compromisso é sempre com a transparência e a informação verdadeira para nosso público.',
      },
      {
        pergunta: 'Analisam produtos de todos os preços?',
        resposta: 'Trabalhamos com produtos de diferentes faixas de preço, desde opções mais acessíveis até produtos premium.',
      },
      {
        pergunta: 'Posso sugerir produtos para análise?',
        resposta: 'Certamente! Adoramos feedback e sugestões. Pode enviar suas propostas através das nossas redes sociais ou formulário de contato.',
        link: { href: '/contato', label: 'Enviar sugestão' },
      },
      {
        pergunta: 'Como posso enviar um produto para análise?',
        resposta: 'Entre em contato informando o produto e o motivo pelo qual você acredita que ele merece ser analisado. Vamos avaliar e retornar.',
        link: { href: '/contato', label: 'Entrar em contato' },
      },
    ],
  },
];

function FAQItem({ pergunta, resposta, link }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`overflow-hidden rounded-[2rem] border border-black/5 transition-all duration-300 ${isOpen ? 'bg-white shadow-lg' : 'bg-white shadow-soft hover:shadow-md'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-8 py-6 text-left group"
      >
        <span className={`text-lg font-bold transition-colors md:text-xl ${isOpen ? 'text-[#ff6b35]' : 'text-[#0f1419] group-hover:text-[#1a4d2e]'}`}>
          {pergunta}
        </span>
        <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'rotate-180 bg-[#ff6b35]/10 text-[#ff6b35]' : 'bg-[#fef9f3] text-[#1a4d2e] group-hover:bg-[#1a4d2e] group-hover:text-white'}`}>
          <ChevronDown size={20} />
        </span>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-8 pb-8 pt-0">
          <div className="mb-4 h-1 w-12 rounded-full bg-[#ffd700]" />
          <p className="text-lg leading-relaxed text-gray-600">{resposta}</p>
          {link && (
            link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#ff6b35] hover:text-[#1a4d2e] transition-colors"
              >
                {link.label} →
              </a>
            ) : (
              <Link
                href={link.href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#ff6b35] hover:text-[#1a4d2e] transition-colors"
              >
                {link.label} →
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function FAQsPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState(faqData[0].categoria);

  return (
    <div className="min-h-screen bg-[#fef9f3]">
      <section className="relative overflow-hidden bg-[#0f1d3a] px-6 py-20">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute left-10 top-10 animate-float">
            <HelpCircle size={100} className="text-white" />
          </div>
          <div className="absolute bottom-10 right-10 animate-float-slow">
            <MessageCircle size={120} className="text-[#ffd700]" />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-4xl font-bold text-[#ffd700] md:text-6xl">
            Perguntas Frequentes
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl font-light leading-relaxed text-white/80">
            Como funciona o projeto, parcerias, dicas de culinária e tudo mais que você precisa saber!
          </p>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:px-8">
        {/* Sidebar */}
        <aside className="lg:w-1/3">
          <div className="sticky top-24 rounded-[2.5rem] border border-black/5 bg-white p-8 shadow-soft">
            <h3 className="mb-6 border-b border-black/5 pb-4 font-heading text-xl font-bold text-[#1a4d2e]">
              Categorias
            </h3>
            <div className="flex flex-row flex-wrap gap-3 lg:flex-col">
              {faqData.map((item) => (
                <button
                  key={item.categoria}
                  onClick={() => setCategoriaAtiva(item.categoria)}
                  className={`rounded-2xl px-6 py-4 text-left font-bold transition-all ${
                    categoriaAtiva === item.categoria
                      ? 'bg-[#ff6b35] text-white shadow-md lg:translate-x-2'
                      : 'bg-[#fef9f3] text-[#0f1419] hover:bg-[#1a4d2e] hover:text-white'
                  }`}
                >
                  {item.categoria}
                </button>
              ))}
            </div>

            <div className="mt-12 rounded-3xl bg-gradient-to-br from-[#1a4d2e] to-[#0f1d3a] p-6 text-center shadow-lg">
              <HelpCircle className="mx-auto mb-4 h-12 w-12 text-[#ffd700]" />
              <h4 className="mb-2 text-lg font-bold text-white">Ainda com dúvida?</h4>
              <p className="mb-6 text-sm text-white/70">
                Fale com a gente! Pode mandar sua pergunta pelo Instagram ou por e-mail.
              </p>
              <Link
                href="/contato"
                className="inline-block w-full rounded-xl bg-[#ffd700] py-3 font-bold text-[#1a4d2e] transition-colors hover:bg-white"
              >
                Entrar em Contato
              </Link>
            </div>
          </div>
        </aside>

        {/* Lista de FAQs */}
        <main className="lg:w-2/3">
          {faqData.map(
            (categoria) =>
              categoriaAtiva === categoria.categoria && (
                <div key={categoria.categoria} className="animate-fade-in">
                  <h2 className="mb-8 flex items-center gap-3 font-heading text-3xl font-bold text-[#0f1419] md:text-4xl">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a4d2e]/10 text-sm text-[#1a4d2e]">
                      #
                    </span>
                    {categoria.categoria}
                  </h2>
                  <div className="space-y-4">
                    {categoria.perguntas.map((faq, index) => (
                      <FAQItem
                        key={index}
                        pergunta={faq.pergunta}
                        resposta={faq.resposta}
                        link={faq.link}
                      />
                    ))}
                  </div>
                </div>
              )
          )}
        </main>
      </div>

      <section className="bg-[#ff6b35] px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
            Acompanhe as novidades
          </h2>
          <p className="mt-6 text-xl font-light text-white/90">
            Não perca nenhuma receita nova e acompanhe os bastidores da cozinha.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={brandLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-[#0f1d3a] px-10 py-5 font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <Video className="transition-colors group-hover:text-red-500" />
              Ver Vídeos
            </a>
            <a
              href={brandLinks.contactMailto}
              className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 font-bold text-[#ff6b35] shadow-xl transition-all hover:bg-[#fef9f3] hover:scale-105 active:scale-95"
            >
              <Mail />
              Solicitar Mídia Kit
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
