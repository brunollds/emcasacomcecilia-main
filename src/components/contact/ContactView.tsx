import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { SHELF_CONTAINER, SHELF_TITLE } from '@/components/reviews/shelfClasses';
import { SocialIcon } from '@/components/sections/CeciliaProfile';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { PageHeader } from '@/components/ui/PageHeader';
import { PRIMARY_PAGE_BUTTON, SECONDARY_PAGE_BUTTON } from '@/components/ui/pageButton';
import { brandLinks } from '@/lib/brandLinks';
import { CONTACT_TRAIL } from '@/lib/contactPage';

// O /contato: o formulário (o único pedaço de cliente) e, ao lado, as parcerias, as redes e o atalho para o
// FAQ. Não importa next/font: a rota passa a fonte condensada pelo className.

const SIDE_TEXT = 'text-[15px] leading-6 font-medium text-marinho-suave';
const TEXT_LINK = `font-extrabold text-marinho underline underline-offset-[3px] ${FOCUS_RING}`;

function SideBlock({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-3 rounded-[14px] border-2 border-marinho bg-white p-5 md:p-6">
      <h2 id={id} className="text-xl font-extrabold text-marinho">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ContactView({ className = '' }: { className?: string }) {
  return (
    <main className={`${className} min-h-screen bg-white text-marinho`}>
      <PageHeader
        trail={CONTACT_TRAIL}
        title="Fale com a gente"
        intro="Cupom que não funcionou, sugestão de artigo ou receita, proposta de parceria: escreva aqui. A gente lê tudo."
      />

      <div className={`${SHELF_CONTAINER} grid items-start gap-6 pb-16 md:pb-24 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10`}>
        <section
          aria-labelledby="titulo-mensagem"
          className="flex flex-col gap-6 rounded-[14px] border-2 border-marinho bg-creme p-5 shadow-[4px_4px_0_var(--color-marinho)] md:p-8"
        >
          <h2 id="titulo-mensagem" className={SHELF_TITLE}>
            <span className="marca-texto">Envie uma mensagem</span>
          </h2>
          <ContactForm />
        </section>

        <div className="flex flex-col gap-4">
          <SideBlock id="titulo-parcerias" title="Parcerias e mídia kit">
            <p className={SIDE_TEXT}>Para campanhas, conteúdo patrocinado ou o mídia kit, escreva direto para o e-mail comercial.</p>
            <a href={brandLinks.contactMailto} className={`wrap-break-word text-[15px] ${TEXT_LINK}`}>
              {brandLinks.contactEmail}
            </a>
            <a href={brandLinks.mediaKit} target="_blank" rel="noopener noreferrer" className={`${PRIMARY_PAGE_BUTTON} self-start`}>
              Ver o mídia kit
              <ArrowRight aria-hidden="true" className="size-[18px]" strokeWidth={2.4} />
            </a>
          </SideBlock>

          <SideBlock id="titulo-redes" title="Nas redes">
            <p className={SIDE_TEXT}>A resposta mais rápida costuma vir pelo direct do Instagram ou pelos comentários do YouTube.</p>
            <div className="flex flex-wrap gap-3">
              <a href={brandLinks.instagram} target="_blank" rel="noopener noreferrer" className={SECONDARY_PAGE_BUTTON}>
                <SocialIcon name="Instagram" className="size-[18px]" />
                Instagram
              </a>
              <a href={brandLinks.youtube} target="_blank" rel="noopener noreferrer" className={SECONDARY_PAGE_BUTTON}>
                <SocialIcon name="YouTube" className="size-[18px]" />
                YouTube
              </a>
            </div>
          </SideBlock>

          <SideBlock id="titulo-duvida-rapida" title="Dúvida rápida?">
            <p className={SIDE_TEXT}>
              As perguntas frequentes respondem como usar cada código, como funcionam os links de afiliado e mais.
            </p>
            <Link href="/faqs" className={`flex min-h-11 items-center gap-2 self-start text-base ${TEXT_LINK}`}>
              Perguntas frequentes
              <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
            </Link>
          </SideBlock>
        </div>
      </div>
    </main>
  );
}
