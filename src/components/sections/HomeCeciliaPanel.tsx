import { ArrowRight, Coffee, Leaf, MessageCircle, UtensilsCrossed } from 'lucide-react';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import { FOCUS_RING_ON_DARK } from '@/components/ui/focusRing';
import {
  CECILIA_PHOTO_COPY_PT,
  CECILIA_SOCIAL_LINKS,
  CeciliaPhotoCard,
  CeciliaStats,
  SocialIcon,
} from '@/components/sections/CeciliaProfile';
import { brandLinks } from '@/lib/brandLinks';
import { getCeciliaSocialStats } from '@/lib/homeStores';

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
        <CeciliaPhotoCard instagramFollowers={instagramFollowers} copy={CECILIA_PHOTO_COPY_PT} placement="home_cecilia" />
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
            {CECILIA_SOCIAL_LINKS.map(({ name, href }) => (
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
        <CeciliaStats stats={stats} />
        <p className="text-[13px] leading-[1.45] font-semibold text-white/70">
          Escolha uma loja nas bolinhas para ver o código e os artigos dela.
        </p>
      </div>
    </section>
  );
}
