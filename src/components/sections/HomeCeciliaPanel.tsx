import Image from 'next/image';
import { ArrowRight, Coffee, Leaf, MessageCircle, UtensilsCrossed } from 'lucide-react';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import { FOCUS_RING, FOCUS_RING_ON_DARK } from '@/components/ui/focusRing';
import { brandLinks } from '@/lib/brandLinks';
import { CECILIA_PHOTO, getCeciliaSocialStats } from '@/lib/homeStores';

// Os mesmos desenhos dos ícones do Hero de hoje.
const SOCIAL_ICON_PATHS = {
  Instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  TikTok:
    'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.24-1.72 1.39-4.02 1.9-6.15 1.39-2.9-.66-5.16-3.27-5.48-6.21-.34-3.15 1.69-6.13 4.73-6.98 1.12-.31 2.31-.31 3.43.02v4.16c-.56-.38-1.21-.59-1.88-.59-1.44 0-2.63 1.15-2.68 2.59-.05 1.44 1.06 2.68 2.5 2.76 1.44.08 2.65-1.03 2.73-2.47.02-.31.02-.62.02-.93V.02z',
  YouTube:
    'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
} as const;

type SocialName = keyof typeof SOCIAL_ICON_PATHS;

const SOCIAL_LINKS: Array<{ name: SocialName; href: string }> = [
  { name: 'Instagram', href: brandLinks.instagram },
  { name: 'TikTok', href: brandLinks.tiktok },
  { name: 'YouTube', href: brandLinks.youtube },
];

type StatName = ReturnType<typeof getCeciliaSocialStats>[number]['name'];

const STAT_COLOR: Record<StatName, string> = {
  Instagram: 'text-amarelo-cupom',
  TikTok: 'text-white',
  YouTube: 'text-laranja',
  Facebook: 'text-white',
};

function SocialIcon({ name, className }: { name: SocialName; className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d={SOCIAL_ICON_PATHS[name]} />
    </svg>
  );
}

// O painel é marinho: o foco fica amarelo, menos dentro do cartão de foto, que é branco.
function PhotoCard({ instagramFollowers }: { instagramFollowers?: string }) {
  return (
    <figure className="relative mx-auto w-full rotate-2 rounded-lg bg-white px-1.5 pt-1.5 pb-2 shadow-[0_18px_40px_rgb(0_0_0/0.35)] motion-safe:transition-transform motion-safe:duration-350 motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-0 lg:max-w-[340px] lg:px-3 lg:pt-3 lg:pb-3.5">
      <span
        aria-hidden="true"
        className="absolute -top-2 left-1/2 z-10 size-5 -translate-x-1/2 rounded-full bg-amarelo-cupom shadow-[0_3px_8px_rgb(0_0_0/0.3)] lg:-top-3.5 lg:size-9"
      />
      <div className="relative aspect-[4/4.7] overflow-hidden rounded bg-marinho/15">
        <Image
          src={CECILIA_PHOTO}
          alt="Cecília segurando uma xícara de café na cozinha"
          fill
          sizes="(min-width: 1024px) 316px, (min-width: 768px) 168px, 106px"
          className="object-cover motion-safe:animate-[ken-burns_24s_ease-in-out_infinite]"
        />
        <span className="absolute top-2.5 left-2.5 hidden items-center gap-2 rounded-full bg-white/95 py-[5px] pr-3 pl-[5px] text-marinho shadow-[0_2px_6px_rgb(0_0_0/0.2)] lg:flex">
          <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-marinho text-amarelo-cupom">
            <SocialIcon name="Instagram" className="size-[15px]" />
          </span>
          <span className="text-xs font-extrabold">@emcasacomcecilia</span>
        </span>
        {instagramFollowers ? (
          <span className="absolute right-1.5 bottom-1.5 rounded-full bg-marinho px-2 py-1 text-[11px] font-extrabold text-white lg:right-2.5 lg:bottom-2.5 lg:px-2.5 lg:py-1.5 lg:text-xs">
            {instagramFollowers}
            <span className="sr-only lg:not-sr-only"> seguidores</span>
          </span>
        ) : null}
      </div>
      <figcaption className="hidden items-center justify-between gap-3 px-0.5 pt-3 lg:flex">
        <span className="flex min-w-0 flex-col gap-[3px]">
          <span className="text-xs font-bold text-marinho-suave">No Instagram</span>
          <span className="font-condensada text-[22px] leading-[1.02] font-black text-marinho font-stretch-extra-condensed lg:text-2xl">
            Bastidores, rotina e receitas da Cecília
          </span>
        </span>
        <TrackedHomeLink
          href={brandLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          placement="home_cecilia"
          linkLabel="Ver o Instagram da Cecília"
          aria-label="Ver o Instagram da Cecília"
          className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-marinho text-amarelo-cupom ${FOCUS_RING}`}
        >
          <SocialIcon name="Instagram" className="size-5" />
        </TrackedHomeLink>
      </figcaption>
    </figure>
  );
}

// Aba da Cecília na vitrine: a apresentação dela, sem código e sem artigos. A ordem do DOM é a do
// celular (título, foto, texto, links, grupo de WhatsApp, números e a orientação), que é também a
// do foco e a da leitura; no desktop a grade põe título e texto à esquerda e a foto à direita, nas
// duas linhas.
export function HomeCeciliaPanel() {
  const stats = getCeciliaSocialStats();
  const instagramFollowers = stats.find(({ name }) => name === 'Instagram')?.followers;

  return (
    <section
      aria-labelledby="titulo-cecilia"
      className="relative isolate grid grid-cols-[minmax(0,1fr)_118px] items-center gap-x-4 gap-y-[18px] overflow-hidden rounded-[14px] border-2 border-marinho bg-marinho px-4 pt-6 pb-[22px] text-white shadow-[0_4px_0_var(--color-marinho)] md:grid-cols-[minmax(0,1fr)_180px] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-stretch lg:gap-x-10 lg:gap-y-[22px] lg:px-11 lg:py-10 lg:shadow-[0_6px_0_var(--color-marinho)]"
    >
      {/* Os ícones que flutuavam no Hero de hoje, atrás do conteúdo. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden text-white/5 select-none">
        <Leaf size={120} strokeWidth={1} className="absolute top-[15%] left-[5%] motion-safe:animate-[float-delayed_12s_ease-in-out_infinite]" />
        <UtensilsCrossed size={80} strokeWidth={1} className="absolute bottom-[20%] left-[45%] motion-safe:animate-[float_8s_ease-in-out_infinite]" />
        <Coffee size={100} strokeWidth={1} className="absolute top-[40%] left-[85%] motion-safe:animate-[float-delayed_12s_ease-in-out_infinite]" />
        <Leaf size={140} strokeWidth={0.5} className="absolute right-[5%] bottom-[10%] rotate-45 motion-safe:animate-[float_8s_ease-in-out_infinite]" />
      </div>

      <h2
        id="titulo-cecilia"
        className="font-condensada text-[34px] leading-[0.9] font-black tracking-[-0.005em] font-stretch-extra-condensed md:text-5xl lg:col-start-1 lg:row-start-1 lg:self-end lg:text-7xl"
      >
        Da minha casa
        <br />
        para a sua.
      </h2>

      <div className="pt-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center lg:px-2 lg:pt-[18px] lg:pb-2">
        <PhotoCard instagramFollowers={instagramFollowers} />
      </div>

      <div className="col-span-2 flex flex-col gap-[18px] lg:col-span-1 lg:col-start-1 lg:row-start-2 lg:gap-[22px] lg:self-start">
        <p className="max-w-[34em] text-[13.5px] leading-normal font-medium text-white/80 md:text-[15px] md:leading-[1.55] lg:text-[17px]">
          Olá! Sou a Cecília. Conto o que testei em casa, divido as receitas da minha cozinha e reúno os
          códigos de desconto das marcas parceiras.
        </p>
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <TrackedHomeLink
            href="/sobre"
            placement="home_cecilia"
            linkLabel="Mais sobre mim"
            className={`flex min-h-11 items-center gap-2 rounded-full bg-laranja px-4 text-[13px] font-extrabold text-marinho md:min-h-12 md:px-[22px] md:text-[15px] ${FOCUS_RING_ON_DARK}`}
          >
            Mais sobre mim
            <ArrowRight aria-hidden="true" className="hidden size-[18px] md:block" strokeWidth={2.4} />
          </TrackedHomeLink>
          <div className="flex gap-1.5 md:gap-2">
            {SOCIAL_LINKS.map(({ name, href }) => (
              <TrackedHomeLink
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                placement="home_cecilia"
                linkLabel={name}
                aria-label={`${name} da Cecília`}
                className={`flex size-10 md:size-11 items-center justify-center rounded-full border-[1.5px] border-white/25 text-laranja hover:border-laranja motion-safe:transition motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 ${FOCUS_RING_ON_DARK}`}
              >
                <SocialIcon name={name} className="size-[18px]" />
              </TrackedHomeLink>
            ))}
          </div>
        </div>
        <TrackedHomeLink
          href={brandLinks.whatsappGroup}
          target="_blank"
          rel="noopener noreferrer"
          placement="home_cecilia"
          linkLabel="Entre no grupo de promoções"
          className={`flex max-w-fit items-center gap-3 rounded-xl border-[1.5px] border-white/25 bg-white/5 py-2.5 pr-4 pl-2.5 hover:border-laranja motion-safe:animate-[pulse-subtle_3s_ease-in-out_2s_1] motion-safe:transition motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 ${FOCUS_RING_ON_DARK}`}
        >
          <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#25d366] text-marinho">
            <MessageCircle className="size-5" />
          </span>
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="text-sm font-extrabold text-white">Entre no grupo de promoções</span>
            <span className="text-[13px] leading-[1.4] font-medium text-white/70">
              Receba cupons e avisos rápidos direto no WhatsApp.
            </span>
          </span>
        </TrackedHomeLink>
        <dl className="grid max-w-[460px] grid-cols-4">
          {stats.map(({ name, followers }, index) => (
            <div
              key={name}
              className={`flex flex-col-reverse px-2 ${index === 0 ? 'pl-0 text-left' : 'border-l border-white/15 text-center'}`}
            >
              <dt className="mt-1 text-xs font-semibold text-white/60">{name}</dt>
              <dd className={`font-condensada text-2xl leading-none font-black font-stretch-extra-condensed lg:text-3xl ${STAT_COLOR[name]}`}>
                {followers ?? '—'}
              </dd>
            </div>
          ))}
        </dl>
        <p className="text-[13px] leading-[1.45] font-semibold text-white/70">
          Escolha uma loja nas bolinhas para ver o código e os artigos dela.
        </p>
      </div>
    </section>
  );
}
