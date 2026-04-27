import Link from 'next/link';
import Image from 'next/image';
import { ChefHat, ArrowRight, MessageCircleMore, Coffee, Leaf, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { brandLinks } from '@/lib/data';

const SocialIcons = {
  Youtube: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  Instagram: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  TikTok: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.24-1.72 1.39-4.02 1.9-6.15 1.39-2.9-.66-5.16-3.27-5.48-6.21-.34-3.15 1.69-6.13 4.73-6.98 1.12-.31 2.31-.31 3.43.02v4.16c-.56-.38-1.21-.59-1.88-.59-1.44 0-2.63 1.15-2.68 2.59-.05 1.44 1.06 2.68 2.5 2.76 1.44.08 2.65-1.03 2.73-2.47.02-.31.02-.62.02-.93V.02z"/>
    </svg>
  ),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0f1d3a] pb-8 pt-3 lg:pb-10 lg:pt-4">
      {/* Floating Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-[15%] left-[5%] text-white/5 animate-float-slow">
          <Leaf size={120} strokeWidth={1} />
        </div>
        <div className="absolute bottom-[20%] left-[45%] text-white/5 animate-float">
          <UtensilsCrossed size={80} strokeWidth={1} />
        </div>
        <div className="absolute top-[40%] left-[85%] text-white/5 animate-float-slow">
          <Coffee size={100} strokeWidth={1} />
        </div>
        <div className="absolute bottom-[10%] right-[5%] text-white/5 animate-float">
          <Leaf size={140} strokeWidth={0.5} className="rotate-45" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 items-center sm:grid-cols-[minmax(0,1fr)_260px] sm:gap-5 md:grid-cols-[minmax(0,1fr)_300px] md:gap-6 lg:grid-cols-2 lg:gap-12">
          {/* Texto */}
          <div className="space-y-5 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold">
              <ChefHat className="w-4 h-4" />
              <span>Bem-vindo ao meu cantinho!</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-[2.1rem] md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Receitas <span className="text-[#ffd700]">práticas</span> e{' '}
              <span className="text-[#ff6b35]">deliciosas</span> para o seu dia a dia
            </h1>

            <p className="text-base leading-relaxed text-white/78 lg:text-lg">
              Olá! Sou a <span className="font-semibold text-[#ff6b35]">Cecília</span> e aqui você encontra receitas que eu testo e aprovo na minha cozinha.
              Sem enrolação, direto ao ponto, com ingredientes acessíveis e resultado garantido!
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="bg-[#ff6b35] hover:bg-[#ff5722] text-white px-6 py-5 text-sm font-semibold rounded-full"
              >
                <Link href="/sobre">
                  Mais sobre mim
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <div className="flex items-center gap-2">
                <Link
                  href={brandLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-[#ff6b35] transition-all hover:-translate-y-0.5 hover:border-[#ff6b35]/50 hover:bg-white/5"
                  aria-label="Instagram"
                >
                  <SocialIcons.Instagram />
                </Link>
                <Link
                  href={brandLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-[#ff6b35] transition-all hover:-translate-y-0.5 hover:border-[#ff6b35]/50 hover:bg-white/5"
                  aria-label="TikTok"
                >
                  <SocialIcons.TikTok />
                </Link>
                <Link
                  href={brandLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-[#ff6b35] transition-all hover:-translate-y-0.5 hover:border-[#ff6b35]/50 hover:bg-white/5"
                  aria-label="YouTube"
                >
                  <SocialIcons.Youtube />
                </Link>
              </div>
            </div>

            <Link
              href={brandLinks.whatsappGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex max-w-fit items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366]/35 hover:bg-white/8 animate-pulse-subtle"
              style={{ animationDelay: '2s' }}
            >
              <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                <MessageCircleMore className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">Entre no grupo de promoções</span>
                <span className="block text-sm text-white/68">Receba cupons e avisos rápidos direto no WhatsApp.</span>
              </span>
            </Link>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="text-center">
                <div className="font-heading text-2xl font-bold text-[#ffd700]">+100</div>
                <div className="text-xs text-white/60">Receitas</div>
              </div>
              <div className="w-px h-10 bg-white/15" />
              <div className="text-center">
                <div className="font-heading text-2xl font-bold text-white">445k</div>
                <div className="text-xs text-white/60">Instagram</div>
              </div>
              <div className="w-px h-10 bg-white/15" />
              <div className="text-center">
                <div className="font-heading text-2xl font-bold text-white">84k</div>
                <div className="text-xs text-white/60">Tiktok</div>
              </div>
              <div className="w-px h-10 bg-white/15" />
              <div className="text-center">
                <div className="font-heading text-2xl font-bold text-[#ff6b35]">11.3k</div>
                <div className="text-xs text-white/60">Youtube</div>
              </div>
            </div>
          </div>

          {/* Card visual inspirado no Instagram */}
          <div className="relative animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative mx-auto max-w-[340px] overflow-hidden rounded-[1.75rem] shadow-large sm:max-w-[260px] md:max-w-[300px] lg:max-w-[460px]">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10">
                <div className="relative aspect-[4/4.7]">
                  <Image
                    src="/images/photos/BRU-1.jpg"
                    alt="Cecília segurando uma xícara de café"
                    fill
                    className="object-cover animate-ken-burns"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(15,29,58,0.15)_40%,rgba(15,29,58,0.72)_100%)]" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 lg:bottom-auto lg:left-4 lg:right-4 lg:top-4">
                  <div className="inline-flex min-w-0 items-center gap-2 rounded-full bg-white/92 px-2.5 py-2 text-[#0f1419] shadow-md lg:px-3">
                    <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff6b35_0%,#ffd700_100%)] text-xs font-bold text-white lg:h-8 lg:w-8 lg:text-sm">
                      C
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold leading-none lg:text-sm">@emcasacomcecilia</p>
                      <p className="mt-1 hidden text-[10px] uppercase tracking-[0.14em] text-[#0f1419]/55 sm:block lg:text-[11px] lg:tracking-[0.18em]">Instagram</p>
                    </div>
                  </div>

                  <span className="hidden rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm md:inline-flex lg:text-[11px] lg:tracking-[0.16em]">
                    <span className="hidden sm:inline">445k seguidores</span>
                    <span className="sm:hidden">445k</span>
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0f1d3a] via-[#0f1d3a]/55 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 hidden rounded-[1.3rem] border border-white/10 bg-white/10 p-4 backdrop-blur-md lg:block">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-[#ff6b35] sm:block">
                        Instagram oficial
                      </p>
                      <h3 className="font-heading text-sm font-semibold leading-tight text-white sm:mt-2 sm:text-[1.35rem] md:text-[1.1rem] lg:text-[2rem]">
                        Bastidores, rotina e receitas da Cecília
                      </h3>
                    </div>

                    <Link
                      href={brandLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/14 text-[#ff6b35] transition-all hover:-translate-y-0.5 hover:border-[#ff6b35]/55 hover:bg-white/5 sm:inline-flex lg:h-12 lg:w-12"
                      aria-label="Ver Instagram"
                    >
                      <SocialIcons.Instagram />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Elementos decorativos */}
            <div className="absolute -top-4 right-0 h-20 w-20 rounded-full bg-[#ffd700]/15 blur-2xl" />
            <div className="absolute -bottom-4 left-0 h-24 w-24 rounded-full bg-[#ff6b35]/15 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
