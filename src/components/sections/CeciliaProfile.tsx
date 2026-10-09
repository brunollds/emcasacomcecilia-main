import Image from 'next/image';
import { TrackedHomeLink, type HomeRoutePlacement } from '@/components/TrackedHomeLink';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { brandLinks } from '@/lib/brandLinks';
import { CECILIA_PHOTO, type getCeciliaSocialStats } from '@/lib/homeStores';

// O cartão de foto, os ícones e os números das redes da Cecília: o painel da home em português e o
// hero da home de cada idioma desenham a mesma coisa, cada um com os seus textos.

// Os mesmos desenhos dos ícones do Hero de hoje; o do Facebook é o do rodapé.
const SOCIAL_ICON_PATHS = {
  Instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  TikTok:
    'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.24-1.72 1.39-4.02 1.9-6.15 1.39-2.9-.66-5.16-3.27-5.48-6.21-.34-3.15 1.69-6.13 4.73-6.98 1.12-.31 2.31-.31 3.43.02v4.16c-.56-.38-1.21-.59-1.88-.59-1.44 0-2.63 1.15-2.68 2.59-.05 1.44 1.06 2.68 2.5 2.76 1.44.08 2.65-1.03 2.73-2.47.02-.31.02-.62.02-.93V.02z',
  YouTube:
    'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  Facebook:
    'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
} as const;

export type SocialName = keyof typeof SOCIAL_ICON_PATHS;

export function SocialIcon({ name, className }: { name: SocialName; className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d={SOCIAL_ICON_PATHS[name]} />
    </svg>
  );
}

// Os ícones do painel, na ordem de sempre.
export const CECILIA_SOCIAL_LINKS: ReadonlyArray<{ name: SocialName; href: string }> = [
  { name: 'Instagram', href: brandLinks.instagram },
  { name: 'TikTok', href: brandLinks.tiktok },
  { name: 'YouTube', href: brandLinks.youtube },
];

export type CeciliaPhotoCopy = {
  alt: string;
  // Depois do número de seguidores; no celular, só para o leitor de tela.
  followers: string;
  captionLabel: string;
  captionTitle: string;
  // Nome do link do Instagram na legenda do desktop.
  instagramLabel: string;
};

export const CECILIA_PHOTO_COPY_PT: CeciliaPhotoCopy = {
  alt: 'Cecília segurando uma xícara de café na cozinha',
  followers: 'seguidores',
  captionLabel: 'No Instagram',
  captionTitle: 'Bastidores, rotina e receitas da Cecília',
  instagramLabel: 'Ver o Instagram da Cecília',
};

type CeciliaPhotoCardProps = {
  instagramFollowers?: string;
  copy: CeciliaPhotoCopy;
  placement: HomeRoutePlacement;
};

// O painel é marinho: o foco fica amarelo, menos dentro do cartão de foto, que é branco.
export function CeciliaPhotoCard({ instagramFollowers, copy, placement }: CeciliaPhotoCardProps) {
  return (
    <figure className="relative mx-auto w-full rotate-2 rounded-lg bg-white px-1.5 pt-1.5 pb-2 shadow-[0_18px_40px_rgb(0_0_0/0.35)] motion-safe:transition-transform motion-safe:duration-350 motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-0 lg:max-w-[340px] lg:px-3 lg:pt-3 lg:pb-3.5">
      <span
        aria-hidden="true"
        className="absolute -top-2 left-1/2 z-10 size-5 -translate-x-1/2 rounded-full bg-amarelo-cupom shadow-[0_3px_8px_rgb(0_0_0/0.3)] lg:-top-3.5 lg:size-9"
      />
      <div className="relative aspect-[4/4.7] overflow-hidden rounded bg-marinho/15">
        <Image
          src={CECILIA_PHOTO}
          alt={copy.alt}
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
            <span className="sr-only lg:not-sr-only">{` ${copy.followers}`}</span>
          </span>
        ) : null}
      </div>
      <figcaption className="hidden items-center justify-between gap-3 px-0.5 pt-3 lg:flex">
        <span className="flex min-w-0 flex-col gap-[3px]">
          <span className="text-xs font-bold text-marinho-suave">{copy.captionLabel}</span>
          <span className="font-condensada text-[22px] leading-[1.02] font-black text-marinho font-stretch-extra-condensed lg:text-2xl">
            {copy.captionTitle}
          </span>
        </span>
        <TrackedHomeLink
          href={brandLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          placement={placement}
          linkLabel={copy.instagramLabel}
          aria-label={copy.instagramLabel}
          className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-marinho text-amarelo-cupom ${FOCUS_RING}`}
        >
          <SocialIcon name="Instagram" className="size-5" />
        </TrackedHomeLink>
      </figcaption>
    </figure>
  );
}

type CeciliaSocialStat = ReturnType<typeof getCeciliaSocialStats>[number];

const STAT_COLOR: Record<CeciliaSocialStat['name'], string> = {
  Instagram: 'text-amarelo-cupom',
  TikTok: 'text-white',
  YouTube: 'text-laranja',
  Facebook: 'text-white',
};

// Seguidores por rede. O nome da rede é o mesmo em todos os idiomas.
export function CeciliaStats({ stats }: { stats: readonly CeciliaSocialStat[] }) {
  return (
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
  );
}
