import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  FlaskConical,
  Handshake,
  Radio,
  Sparkles,
  Tv2,
  Utensils,
} from 'lucide-react';
import { brandLinks } from '@/lib/data';

export const metadata = {
  title: 'Sobre a Cecília - Em Casa com Cecília',
  description:
    'Conheça a Cecília Mauad e o projeto Em Casa com Cecília: receitas fáceis que dão certo, testadas na cozinha de casa, com conteúdo multiplataforma para todos os níveis.',
  alternates: {
    canonical: '/sobre',
  },
  openGraph: {
    title: 'Sobre a Cecília - Em Casa com Cecília',
    description:
      'Conheça a Cecília Mauad e o projeto Em Casa com Cecília: receitas fáceis que dão certo, vídeos, reviews e conteúdo multiplataforma.',
    url: '/sobre',
    type: 'profile',
    images: [
      {
        url: '/images/about/cecilia/cecilia-6.jpg',
        alt: 'Cecília Mauad, do Em Casa com Cecília',
      },
    ],
  },
};

const whatWeDo = [
  {
    Icon: BookOpen,
    title: 'Ensinamos o Fundamental',
    text: 'Seja você um iniciante ou alguém com experiência, temos conteúdo para todos. Desde técnicas básicas de preparo até truques de cozinha, desmistificamos a culinária sem firula.',
  },
  {
    Icon: FlaskConical,
    title: 'Testamos Receitas Virais',
    text: 'Não acreditamos em receitas só por acreditar. Cada receita que compartilhamos passa pelo nosso crivo — é mão na massa de verdade, com resultado honesto.',
  },
  {
    Icon: Handshake,
    title: 'Parcerias Especiais',
    text: 'Colaboramos com fornecedores, lojistas, restaurantes, chefs, influenciadores e especialistas para trazer conteúdo exclusivo e surpreendente.',
  },
  {
    Icon: Tv2,
    title: 'Multiplataforma',
    text: 'Estamos em toda parte: vídeos dinâmicos nas redes sociais, spots informativos no rádio, artigos detalhados no blog e receitas completas aqui no site.',
  },
];

const channels = [
  { label: 'Receitas no site', value: '+190' },
  { label: 'Instagram', value: '445k' },
  { label: 'TikTok', value: '84k' },
  { label: 'YouTube', value: '11.3k' },
];

const partners = [
  { name: 'DAMIE', src: '/images/about/partners/damie.jpg', href: brandLinks.damie },
  { name: 'Shopee', src: '/images/about/partners/shopee.png', href: 'https://shopee.com.br' },
  { name: 'Polishop', src: '/images/about/partners/polishop.jpg', href: 'https://polishop.com.br' },
  { name: 'Kopenhagen', src: '/images/about/partners/kopenhagen.jpg', href: 'https://kopenhagen.com.br' },
  { name: 'Nescafé Dolce Gusto', src: '/images/about/partners/dolce-gusto.avif', href: 'https://dolce-gusto.com.br' },
  { name: 'WAP', src: '/images/about/partners/wap.png', href: 'https://wap.com.br' },
  { name: 'EOS', src: '/images/about/partners/eos.jpg', href: 'https://eos.com.br' },
  { name: 'Mollycook', src: '/images/about/partners/mollycook.jpg', href: 'https://mollycook.com.br' },
  { name: 'Okoshi', src: '/images/about/partners/okoshi.webp', href: 'https://okoshi.com.br' },
  { name: 'Tempero do Anjo', src: '/images/about/partners/tempero-do-anjo.webp', href: 'https://www.instagram.com/tempero.do.anjo/' },
  { name: 'Itatiaia', src: '/images/about/partners/itatiaia.webp', href: 'https://www.minhaitatiaia.com.br/' },
  { name: 'Belle House', src: '/images/about/partners/belle-house.png', href: 'https://www.bellehousemobilia.com.br/' },
  { name: 'Carolina Baby', src: '/images/about/partners/carolina-baby.webp', href: 'https://carolinababy.com.br' },
  { name: 'A3 Home Design', src: '/images/about/partners/a3-home-design.jpg', href: 'https://a3homedesign.com.br' },
  { name: 'Santos Simões', src: '/images/about/partners/santos-simoes.webp', href: 'https://santossimoes.com.br' },
  { name: 'Laticínios Ubari', src: '/images/about/partners/laticinios-ubari.jpg', href: 'https://www.instagram.com/laticiniosubari/' },
  { name: 'ABC da Construção', src: '/images/about/partners/abc-da-construcao.png', href: 'https://abcdaconstrucao.com.br' },
  { name: 'Promobit', src: '/images/about/partners/promobit.jpg', href: 'https://promobit.com.br' },
  { name: 'Shein', src: '/images/about/partners/shein.webp', href: 'https://shein.com' },
];

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-[#fef9f3]">

      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden bg-[#0f1d3a] px-6 py-14 text-white md:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
          <Sparkles className="absolute left-[8%] top-[18%] h-24 w-24 text-white/5 animate-float-slow" />
          <Utensils className="absolute bottom-[12%] right-[10%] h-28 w-28 rotate-12 text-white/5 animate-float" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1fr_0.82fr] lg:gap-16">
          <div>
            <p className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ffd700]">
              Sobre o projeto
            </p>
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Somos mais do que um projeto multimídias de culinária.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/76">
              Nosso projeto é dedicado a ensinar receitas fáceis que realmente funcionam, desmistificando técnicas e conceitos culinários fundamentais. Queremos mostrar que cozinhar pode ser prazeroso e descomplicado, mesmo no dia a dia corrido.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/receitas"
                className="inline-flex items-center gap-2 rounded-full bg-[#ff6b35] px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#ff5722]"
              >
                Ver receitas
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 rounded-full border border-white/14 px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:border-[#ffd700]/50 hover:text-[#ffd700]"
              >
                Fale conosco
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-large">
              <Image
                src="/images/photos/BRU-1.jpg"
                alt="Cecília Mauad, criadora do Em Casa com Cecília"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 460px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1d3a]/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-white/12 p-4 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b35]">Em Casa com Cecília</p>
                <p className="mt-2 font-heading text-xl font-bold leading-tight">Receitas Fáceis que Dão Certo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. MISSÃO ── */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Foto grande */}
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-large">
              <Image
                src="/images/about/cecilia/cecilia-6.jpg"
                alt="Cecília Mauad na cozinha"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            {/* Badge flutuante */}
            <div className="absolute -bottom-5 -right-4 rounded-2xl bg-[#ff6b35] px-5 py-4 text-white shadow-lg md:-right-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">Slogan</p>
              <p className="mt-1 font-heading text-lg font-bold leading-tight">Receitas Fáceis<br/>que Dão Certo</p>
            </div>
          </div>

          {/* Texto */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b35]">Nossa missão</p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-[#0f1419] md:text-4xl">
              Uma filosofia de vida, não apenas um slogan.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-gray-700 md:text-lg">
              <p>
                Nosso slogan <strong className="text-[#1a4d2e]">Receitas Fáceis que Dão Certo</strong> não é apenas uma frase de efeito. É nossa filosofia de vida. Acreditamos que todo mundo pode cozinhar, desde o iniciante absoluto até o chef amador.
              </p>
              <p>
                Aqui, compartilhamos receitas testadas, dicas práticas e conteúdos que fazem você se sentir confiante na cozinha — sem exageros, sem ingredientes impossíveis, sem complicação desnecessária.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {channels.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white p-4 shadow-soft ring-1 ring-black/5 text-center">
                  <p className="font-heading text-2xl font-bold text-[#1a4d2e]">{item.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. O QUE FAZEMOS ── */}
      <section className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b35]">O que fazemos</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[#0f1419] md:text-4xl">
              Conteúdo de verdade, para a cozinha de verdade.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeDo.map(({ Icon, title, text }) => (
              <article key={title} className="rounded-[1.75rem] bg-[#fef9f3] p-6 transition-all hover:-translate-y-1 hover:shadow-medium ring-1 ring-black/5">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1a4d2e]/10 text-[#1a4d2e]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#0f1419]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SOBRE A CECÍLIA ── */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Texto */}
          <div className="order-2 lg:order-1">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b35]">Quem é a Cecília</p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-[#0f1419] md:text-4xl">
              Cecília Mauad
            </h2>

            <div className="mt-6 space-y-5 text-base leading-8 text-gray-700 md:text-lg">
              <p>
                Cecília Mauad nasceu em 21 de novembro de 1995, na charmosa Zona da Mata de Minas Gerais. Cresceu cercada pelos aromas e sabores da culinária caseira — foi com sua avó, <strong className="text-[#1a4d2e]">Dona Ângela</strong>, que aprendeu não apenas receitas, mas o carinho e o cuidado por trás de cada prato, e as rotinas que transformam uma casa em um lar de verdade.
              </p>

              <div className="rounded-2xl border-l-4 border-[#ffd700] bg-white px-6 py-5 shadow-soft">
                <p className="text-base font-semibold italic leading-7 text-[#0f1419]">
                  Cada vídeo, cada receita conta um pouco da minha história de aprendizado com a Dona Ângela — perpetuando um legado de amor e sabor.
                </p>
              </div>

              <p>
                Formada em <strong className="text-[#1a4d2e]">Jornalismo</strong>, Cecília sempre teve paixão por compartilhar histórias e experiências. Casada e mãe de dois filhos, decidiu dedicar-se integralmente à família e ao projeto Em Casa com Cecília — combinando sua bagagem familiar e acadêmica em um conteúdo que vai além de receitas: uma conexão genuína com quem a acompanha.
              </p>

              <p>
                Hoje, à frente do projeto, ela inspira pessoas a se aventurarem na cozinha através de vídeos nas redes sociais, participações no rádio e textos no blog. Com seu jeito acolhedor e autêntico, transforma a cozinha em um lugar onde sabor e simplicidade andam de mãos dadas.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/receitas"
                className="inline-flex items-center gap-2 rounded-full bg-[#1a4d2e] px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#ff6b35]"
              >
                Ver receitas da Cecília
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Foto grande */}
          <div className="order-1 relative mx-auto w-full max-w-[500px] lg:order-2 lg:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-large">
              <Image
                src="/images/about/cecilia/cecilia-71.jpg"
                alt="Cecília Mauad"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. COMPROMISSO ── */}
      <section className="relative overflow-hidden px-6 py-20 md:py-24">
        {/* Foto de fundo */}
        <div className="absolute inset-0">
          <Image
            src="/images/about/cecilia/cecilia-88.jpg"
            alt=""
            fill
            className="object-cover object-[center_30%]"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[#0f1d3a]/82" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffd700]">Nosso compromisso</p>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl">
            Mais do que receitas. Criamos memórias.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Queremos mais do que apenas ensinar receitas. Queremos criar memórias, inspirar momentos de conexão e provar que cozinhar pode ser a forma mais simples de espalhar amor.
          </p>
          <p className="mt-4 text-xl font-semibold text-[#ffd700]">
            Junte-se a nós nessa jornada deliciosa!
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/receitas"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff6b35] px-8 py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#ff5722]"
            >
              Explorar receitas
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={brandLinks.whatsappGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20"
            >
              Grupo do WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── 6. MÍDIA KIT CTA ── */}
      <section className="border-y border-[#ffd700]/20 bg-[#fef9f3] px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b35]">Para marcas e agências</p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-[#0f1419] md:text-3xl">
              Quer trabalhar com o Em Casa com Cecília?
            </h2>
            <p className="mt-2 max-w-xl text-base leading-7 text-gray-600">
              Acesse o Mídia Kit com dados de audiência, formatos de parceria e condições comerciais atualizados.
            </p>
          </div>
          <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
            <a
              href={brandLinks.mediaKit}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f1d3a] px-8 py-4 font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#1a4d2e]"
            >
              Acessar Mídia Kit
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#0f1d3a]/15 px-8 py-4 font-bold text-[#0f1d3a] transition-all hover:-translate-y-0.5 hover:border-[#ff6b35]/40 hover:text-[#ff6b35]"
            >
              Fale conosco
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. ONDE NOS ENCONTRAR ── */}
      <section className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[2rem] bg-[#1a4d2e] p-7 text-white md:p-10">
              <Radio className="mb-5 h-8 w-8 text-[#ffd700]" />
              <h2 className="font-heading text-3xl font-bold">Onde nos encontrar</h2>
              <p className="mt-4 leading-7 text-white/78">
                O conteúdo do Em Casa com Cecília circula entre o site, as redes sociais, o rádio e plataformas de streaming. O site organiza o acervo completo; as redes mostram bastidores, testes ao vivo, dicas rápidas e novidades em primeira mão.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {channels.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/8 p-4 text-center">
                    <p className="font-heading text-2xl font-bold text-[#ffd700]">{item.value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/58">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={brandLinks.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-white/10">Instagram</a>
                <a href={brandLinks.youtube} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-white/10">YouTube</a>
                <a href={brandLinks.tiktok} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-white/10">TikTok</a>
              </div>
            </div>

            <div className="rounded-[2rem] bg-[#fef9f3] p-7 shadow-soft ring-1 ring-black/5 md:p-10">
              <Handshake className="mb-5 h-8 w-8 text-[#ff6b35]" />
              <h2 className="font-heading text-3xl font-bold text-[#0f1419]">Parcerias e mídia</h2>
              <p className="mt-4 leading-7 text-gray-600">
                Trabalhamos com marcas que compartilham nossa visão de praticidade e qualidade. Para informações comerciais, propostas de parceria ou solicitação do Mídia Kit, entre em contato com nossa equipe.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={brandLinks.mediaKit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0f1d3a] px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a4d2e]"
                >
                  Ver Mídia Kit
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-2 rounded-full border border-[#0f1d3a]/12 px-6 py-3 text-sm font-bold text-[#0f1d3a] transition-all hover:-translate-y-0.5 hover:border-[#ff6b35]/35 hover:text-[#ff6b35]"
                >
                  Entrar em contato
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. PARCEIROS ── */}
      <section className="px-6 pb-20 pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b35]">
              Marcas que já passaram por aqui
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-[#0f1419]">
              Parceiros comerciais
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
              Ao longo do projeto, colaboramos com empresas, marcas, fornecedores e especialistas que moldam nosso conteúdo e fortalecem nossas conexões profissionais.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                title={partner.name}
                className="group flex aspect-square items-center justify-center rounded-2xl border border-black/6 bg-white p-4 shadow-soft transition-all hover:-translate-y-1 hover:shadow-medium"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    fill
                    className="object-contain mix-blend-multiply"
                    sizes="120px"
                  />
                </div>
              </a>
            ))}
          </div>

          <p className="mt-8 text-sm text-gray-400">
            Para novas parcerias comerciais,{' '}
            <Link href="/contato" className="text-[#ff6b35] hover:underline">entre em contato</Link>.
          </p>
        </div>
      </section>

    </main>
  );
}
