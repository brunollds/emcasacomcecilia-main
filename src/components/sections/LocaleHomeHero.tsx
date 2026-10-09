import { CalendarDays, Mail, MapPin, Star } from 'lucide-react';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import { CeciliaPhotoCard, CeciliaStats, SocialIcon } from '@/components/sections/CeciliaProfile';
import { FOCUS_RING_ON_DARK } from '@/components/ui/focusRing';
import type { LocaleHomeContent } from '@/lib/localeHome';

// Hero da home de cada idioma: o painel marinho da home em português (título, cartão de foto e números
// das redes), com o nome completo, de onde ela é, desde quando cria conteúdo, o e-mail e o selo da
// YesStyle. Sem o grupo de WhatsApp e o "Mais sobre mim", que são em português. A ordem do DOM é a do
// celular; no desktop a grade põe o texto à esquerda e a foto à direita.
export function LocaleHomeHero({ hero }: { hero: LocaleHomeContent['hero'] }) {
  const instagramFollowers = hero.stats.find(({ name }) => name === 'Instagram')?.followers;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pt-4 md:px-10 md:pt-8">
      <section
        aria-labelledby="titulo-cecilia"
        className="relative isolate grid grid-cols-[minmax(0,1fr)_118px] items-center gap-x-4 gap-y-[18px] overflow-hidden rounded-[14px] border-2 border-marinho bg-marinho px-4 pt-6 pb-[22px] text-white shadow-[0_4px_0_var(--color-marinho)] md:grid-cols-[minmax(0,1fr)_180px] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-stretch lg:gap-x-10 lg:gap-y-[22px] lg:px-11 lg:py-10 lg:shadow-[0_6px_0_var(--color-marinho)]"
      >
        <h1
          id="titulo-cecilia"
          className="font-condensada text-[34px] leading-[0.9] font-black tracking-[-0.005em] font-stretch-extra-condensed md:text-5xl lg:col-start-1 lg:row-start-1 lg:self-end lg:text-7xl"
        >
          {hero.titleTop}
          <br />
          {hero.titleBottom}
        </h1>

        <div className="pt-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center lg:px-2 lg:pt-[18px] lg:pb-2">
          <CeciliaPhotoCard instagramFollowers={instagramFollowers} copy={hero.photo} placement="locale_home_hero" />
        </div>

        <div className="col-span-2 flex flex-col gap-[18px] lg:col-span-1 lg:col-start-1 lg:row-start-2 lg:gap-[22px] lg:self-start">
          <div className="flex flex-col gap-1.5">
            <p className="text-base font-extrabold md:text-lg">{hero.name}</p>
            <p className="max-w-[34em] text-[13.5px] leading-normal font-medium text-white/80 md:text-[15px] md:leading-[1.55] lg:text-[17px]">
              {hero.intro}
            </p>
          </div>

          <ul className="flex flex-col gap-1.5 text-[13px] font-semibold text-white/80 md:text-sm">
            <li className="flex items-center gap-2">
              <MapPin aria-hidden="true" className="size-4 shrink-0 text-amarelo-cupom" />
              {hero.location}
            </li>
            <li className="flex items-center gap-2">
              <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-amarelo-cupom" />
              {hero.since}
            </li>
            <li className="flex min-w-0 items-center gap-2">
              <Mail aria-hidden="true" className="size-4 shrink-0 text-amarelo-cupom" />
              <a href={hero.mailto} className={`min-w-0 break-all underline underline-offset-[3px] ${FOCUS_RING_ON_DARK}`}>
                {hero.email}
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-3 rounded-xl bg-amarelo-cupom px-3 py-2.5 text-marinho">
            <Star aria-hidden="true" className="size-6 shrink-0 fill-marinho" />
            <p className="flex min-w-0 flex-1 flex-col">
              <span className="text-sm font-extrabold">{hero.certificate.title}</span>
              <span className="text-xs font-semibold">{hero.certificate.tier}</span>
            </p>
          </div>

          <CeciliaStats stats={hero.stats} />

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <a
              href={hero.mailto}
              className={`flex min-h-11 items-center gap-2 rounded-full bg-laranja px-4 text-[13px] font-extrabold text-marinho md:min-h-12 md:px-[22px] md:text-[15px] ${FOCUS_RING_ON_DARK}`}
            >
              <Mail aria-hidden="true" className="size-[18px]" strokeWidth={2.4} />
              {hero.emailCta}
            </a>
            <div className="flex gap-1.5 md:gap-2">
              {hero.social.map(({ name, href, label }) => (
                <TrackedHomeLink
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  placement="locale_home_hero"
                  linkLabel={name}
                  aria-label={label}
                  className={`flex size-10 items-center justify-center rounded-full border-[1.5px] border-white/25 text-laranja hover:border-laranja motion-safe:transition motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 md:size-11 ${FOCUS_RING_ON_DARK}`}
                >
                  <SocialIcon name={name} className="size-[18px]" />
                </TrackedHomeLink>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
