import { ArrowRight, CalendarDays, Coffee, Leaf, Mail, MapPin, MessageCircle, Star, UtensilsCrossed } from 'lucide-react';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import { CertificateDialog } from '@/components/sections/CertificateDialog';
import {
  CECILIA_PHOTO_COPY_PT,
  CECILIA_SOCIAL_LINKS,
  CeciliaPhotoCard,
  CeciliaStats,
  SocialIcon,
  type CeciliaPhotoCopy,
} from '@/components/sections/CeciliaProfile';
import { FOCUS_RING_ON_DARK } from '@/components/ui/focusRing';
import { HostingerPartnerBadge } from '@/components/ui/HostingerPartnerBadge';
import { brandLinks } from '@/lib/brandLinks';
import { getCeciliaSocialStats } from '@/lib/homeStores';

// O painel da Cecília: a vitrine da home em português e a da home de cada idioma desenham o mesmo painel, cada
// uma com os seus textos (CeciliaPanelCopy). Só o PT tem o link para /sobre e o grupo de WhatsApp (o grupo é em
// português); nos idiomas, o painel traz quem é a Cecília, de onde e desde quando, o e-mail e o selo da YesStyle.
// O selo da Hostinger sai nas duas: no PT no lugar do selo da YesStyle, nos idiomas ao lado dele.

export type CeciliaCertificateCopy = {
  title: string;
  tier: string;
  image: { src: string; width: number; height: number; alt: string };
  linkLabel: string;
  closeLabel: string;
};

export type CeciliaPanelCopy = {
  titleTop: string;
  titleBottom: string;
  intro: string;
  photo: CeciliaPhotoCopy;
  // Com {network}; o nome do link vira "Instagram da Cecília" no PT e "Cecília on Instagram" nos idiomas.
  socialAria: string;
  pick: string;
  pt?: { aboutLabel: string; whatsappLabel: string; whatsappNote: string };
  profile?: {
    name: string;
    location: string;
    since: string;
    email: string;
    mailto: string;
    emailCta: string;
    certificate: CeciliaCertificateCopy;
  };
};

export const PT_CECILIA_PANEL: CeciliaPanelCopy = {
  titleTop: 'Da minha casa',
  titleBottom: 'para a sua.',
  intro: 'Olá! Sou a Cecília. Conto o que testei em casa, divido as receitas da minha cozinha e reúno os códigos de desconto das marcas parceiras.',
  photo: CECILIA_PHOTO_COPY_PT,
  socialAria: '{network} da Cecília',
  pick: 'Escolha uma loja nas bolinhas para ver o código e os artigos dela.',
  pt: {
    aboutLabel: 'Mais sobre mim',
    whatsappLabel: 'Entre no grupo de promoções',
    whatsappNote: 'Receba cupons e avisos rápidos direto no WhatsApp.',
  },
};

const fillNetwork = (template: string, network: string) => template.replace('{network}', network);

export function HomeCeciliaPanel({ copy, eager = false }: { copy: CeciliaPanelCopy; eager?: boolean }) {
  const stats = getCeciliaSocialStats();
  const instagramFollowers = stats.find(({ name }) => name === 'Instagram')?.followers;
  const { profile, pt } = copy;
  const socials = (
    <div className="flex gap-1.5 md:gap-2">
      {CECILIA_SOCIAL_LINKS.map(({ name, href }) => (
        <TrackedHomeLink
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          placement="home_cecilia"
          linkLabel={name}
          aria-label={fillNetwork(copy.socialAria, name)}
          className={`flex size-10 md:size-11 items-center justify-center rounded-full border-[1.5px] border-white/25 text-laranja hover:border-laranja motion-safe:transition motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 ${FOCUS_RING_ON_DARK}`}
        >
          <SocialIcon name={name} className="size-[18px]" />
        </TrackedHomeLink>
      ))}
    </div>
  );

  return (
    <section
      aria-labelledby="titulo-cecilia"
      className="relative isolate grid grid-cols-[minmax(0,1fr)_118px] items-center gap-x-4 gap-y-[18px] overflow-hidden rounded-[14px] border-2 border-marinho bg-marinho px-4 pt-6 pb-[22px] text-white shadow-[0_4px_0_var(--color-marinho)] md:grid-cols-[minmax(0,1fr)_180px] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-stretch lg:gap-x-10 lg:gap-y-[22px] lg:px-11 lg:py-10 lg:shadow-[0_6px_0_var(--color-marinho)]"
    >
      {/* Os ícones que flutuavam no antigo Hero, atrás do conteúdo. */}
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
        {copy.titleTop}
        <br />
        {copy.titleBottom}
      </h2>

      <div className="pt-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center lg:px-2 lg:pt-[18px] lg:pb-2">
        <CeciliaPhotoCard instagramFollowers={instagramFollowers} copy={copy.photo} placement="home_cecilia" eager={eager} />
      </div>

      <div className="col-span-2 flex flex-col gap-[18px] lg:col-span-1 lg:col-start-1 lg:row-start-2 lg:gap-[22px] lg:self-start">
        {profile ? (
          <div className="flex flex-col gap-1.5">
            <p className="text-base font-extrabold md:text-lg">{profile.name}</p>
            <p className="max-w-[34em] text-[13.5px] leading-normal font-medium text-white/80 md:text-[15px] md:leading-[1.55] lg:text-[17px]">
              {copy.intro}
            </p>
          </div>
        ) : (
          <p className="max-w-[34em] text-[13.5px] leading-normal font-medium text-white/80 md:text-[15px] md:leading-[1.55] lg:text-[17px]">
            {copy.intro}
          </p>
        )}

        {profile ? (
          <>
            <ul className="flex flex-col gap-1.5 text-[13px] font-semibold text-white/80 md:text-sm">
              <li className="flex items-center gap-2">
                <MapPin aria-hidden="true" className="size-4 shrink-0 text-amarelo-cupom" />
                {profile.location}
              </li>
              <li className="flex items-center gap-2">
                <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-amarelo-cupom" />
                {profile.since}
              </li>
              <li className="flex min-w-0 items-center gap-2">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-amarelo-cupom" />
                <a href={profile.mailto} className={`min-w-0 break-all underline underline-offset-[3px] ${FOCUS_RING_ON_DARK}`}>
                  {profile.email}
                </a>
              </li>
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 rounded-xl bg-amarelo-cupom px-3 py-2.5 text-marinho">
                <Star aria-hidden="true" className="size-6 shrink-0 fill-marinho" />
                <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <p className="flex min-w-0 flex-1 flex-col">
                    <span className="text-sm font-extrabold">{profile.certificate.title}</span>
                    <span className="text-xs font-semibold">{profile.certificate.tier}</span>
                  </p>
                  <CertificateDialog
                    image={profile.certificate.image}
                    title={profile.certificate.title}
                    linkLabel={profile.certificate.linkLabel}
                    closeLabel={profile.certificate.closeLabel}
                  />
                </div>
              </div>
              <HostingerPartnerBadge />
            </div>
          </>
        ) : null}

        {pt ? (
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <TrackedHomeLink
              href="/sobre"
              placement="home_cecilia"
              linkLabel={pt.aboutLabel}
              className={`flex min-h-11 items-center gap-2 rounded-full bg-laranja px-4 text-[13px] font-extrabold text-marinho md:min-h-12 md:px-[22px] md:text-[15px] ${FOCUS_RING_ON_DARK}`}
            >
              {pt.aboutLabel}
              <ArrowRight aria-hidden="true" className="hidden size-[18px] md:block" strokeWidth={2.4} />
            </TrackedHomeLink>
            {socials}
          </div>
        ) : null}

        {pt ? (
          <TrackedHomeLink
            href={brandLinks.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            placement="home_cecilia"
            linkLabel={pt.whatsappLabel}
            className={`flex max-w-fit items-center gap-3 rounded-xl border-[1.5px] border-white/25 bg-white/5 py-2.5 pr-4 pl-2.5 hover:border-laranja motion-safe:animate-[pulse-subtle_3s_ease-in-out_2s_1] motion-safe:transition motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 ${FOCUS_RING_ON_DARK}`}
          >
            <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#25d366] text-marinho">
              <MessageCircle className="size-5" />
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-sm font-extrabold text-white">{pt.whatsappLabel}</span>
              <span className="text-[13px] leading-[1.4] font-medium text-white/70">{pt.whatsappNote}</span>
            </span>
          </TrackedHomeLink>
        ) : null}

        {pt ? <HostingerPartnerBadge /> : null}
        <CeciliaStats stats={stats} />
        {profile ? (
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <a
              href={profile.mailto}
              className={`flex min-h-11 items-center gap-2 rounded-full bg-laranja px-4 text-[13px] font-extrabold text-marinho md:min-h-12 md:px-[22px] md:text-[15px] ${FOCUS_RING_ON_DARK}`}
            >
              <Mail aria-hidden="true" className="size-[18px]" strokeWidth={2.4} />
              {profile.emailCta}
            </a>
            {socials}
          </div>
        ) : null}
        <p className="text-[13px] leading-[1.45] font-semibold text-white/70">{copy.pick}</p>
      </div>
    </section>
  );
}
