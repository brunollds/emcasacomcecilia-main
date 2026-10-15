import type { CSSProperties } from 'react';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';
import { TrackedHomeLink } from '@/components/TrackedHomeLink';
import { SHELF_CONTAINER } from '@/components/reviews/shelfClasses';
import { CECILIA_PHOTO_COPY_PT, CeciliaPhotoCard } from '@/components/sections/CeciliaProfile';
import { CertificateDialog } from '@/components/sections/CertificateDialog';
import { HomeSection } from '@/components/sections/HomeSection';
import { FOCUS_RING } from '@/components/ui/focusRing';
import { PageHeader } from '@/components/ui/PageHeader';
import { PRIMARY_PAGE_BUTTON, SECONDARY_PAGE_BUTTON } from '@/components/ui/pageButton';
import { getAboutPersonJsonLd, type AboutContent } from '@/lib/aboutPage';
import { serializeJsonLd } from '@/lib/jsonLd';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

// A /sobre. Não importa next/font (o test:institutional desenha a página em tsx): a rota passa a fonte
// condensada pelo className.

const PHOTO_COPY = { ...CECILIA_PHOTO_COPY_PT, captionLabel: 'Em Casa com Cecília', captionTitle: 'Da minha casa para a sua.' };

const BODY_TEXT = 'text-base leading-relaxed font-medium text-marinho-suave md:text-lg';

const METHOD = [
  {
    lead: 'Cupons.',
    text: 'Cada código de loja parceira é aplicado num carrinho de verdade, no checkout da própria loja, antes de ir para o site. A página da loja mostra o que vimos nesse teste e a data dele ("Cupom testado em"). Quando a loja só oferece link, campanha ou código de indicação, a página mostra "Conferido em" com a data em que revisamos as condições.',
  },
  {
    lead: 'Guias & Análises.',
    text: 'Todo artigo diz de onde vem a informação. Nos artigos de produto e experiência, a Cecília recebeu ou comprou o produto e conta o que viu no uso, em fotos ou vídeo. Nos guias, a base são a página oficial, o manual e outras fontes públicas, sem fingir uso que não houve.',
  },
  {
    lead: 'Parcerias.',
    text: 'Quando há relação comercial, o artigo traz uma nota editorial dizendo se o produto foi enviado pela marca e se o site recebe comissão. Não aceitamos pagamento por análise positiva.',
  },
  {
    lead: 'Datas e preços.',
    text: 'Preços, estoques e campanhas mudam. Confira o valor final na loja antes de pagar.',
  },
];

const STORY = [
  'A Cecília Mauad nasceu em 21 de novembro de 1995, na Zona da Mata de Minas Gerais. Aprendeu a cozinhar com a avó, Dona Ângela: as receitas, o cuidado com quem vai comer e as rotinas que fazem uma casa funcionar.',
  'Formou-se em Jornalismo e levou o gosto por contar histórias para a cozinha: receitas fáceis nas redes sociais e aqui no site, e por um tempo também em spots de rádio.',
  'Casada e mãe de dois filhos, hoje ela se dedica à família e ao projeto. O conteúdo acompanhou a casa: além das receitas, a Cecília passou a mostrar os produtos que usa no dia a dia, do sofá à cafeteira, e a reunir os códigos das marcas com que trabalha.',
  'O jeito continua o mesmo de quando era só a cozinha: mostrar como é de verdade, sem enfeitar.',
];

export function AboutView({ content, className = '' }: { content: AboutContent; className?: string }) {
  return (
    <main className={`${className} min-h-screen bg-white text-marinho`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(getAboutPersonJsonLd()) }} />
      <PageHeader
        trail={content.trail}
        title="Sobre a Cecília"
        intro={
          <>
            <p>
              Jornalista, mineira e mãe de dois, a Cecília mostra desde {content.since}, aqui e nas redes, o que usa e
              cozinha em casa.
            </p>
            <p>
              No site estão os guias e análises de produtos, os códigos das lojas parceiras, os vídeos e as receitas.
              Quando há relação comercial, o texto avisa.
            </p>
          </>
        }
        aside={<CeciliaPhotoCard instagramFollowers={content.instagramFollowers} copy={PHOTO_COPY} placement="about" eager />}
      >
        <TrackedHomeLink href="/reviews" placement="about" linkLabel="Ver os guias" className={PRIMARY_PAGE_BUTTON}>
          Ver os guias
          <ArrowRight aria-hidden="true" className="size-[18px]" strokeWidth={2.4} />
        </TrackedHomeLink>
        <TrackedHomeLink href="/contato" placement="about" linkLabel="Fale com a gente" className={SECONDARY_PAGE_BUTTON}>
          Fale com a gente
        </TrackedHomeLink>
      </PageHeader>

      <section aria-labelledby="titulo-numeros" className={`${SHELF_CONTAINER} pb-12 md:pb-16`}>
        <div className="flex flex-col gap-6 rounded-[14px] border-2 border-marinho bg-marinho px-4 py-6 text-white shadow-[0_4px_0_var(--color-marinho)] md:px-8 lg:px-11 lg:py-9">
          <h2 id="titulo-numeros" className="sr-only">
            Números
          </h2>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-7" data-about-stats="">
            {content.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1.5 border-l-2 border-white/15 pl-3">
                <dt className="text-[13px] leading-snug font-semibold text-white/75">{stat.label}</dt>
                <dd className="font-condensada text-[34px] leading-none font-black text-amarelo-cupom font-stretch-extra-condensed lg:text-[40px]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          {content.certificate ? (
            <div className="flex items-center gap-3 rounded-xl bg-amarelo-cupom px-3 py-2.5 text-marinho md:px-4" data-about-certificate="">
              <Star aria-hidden="true" className="size-6 shrink-0 fill-marinho" />
              <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <p className="flex min-w-0 flex-1 flex-col">
                  <span className="text-sm font-extrabold">{content.certificate.title}</span>
                  <span className="text-xs font-semibold">{content.certificate.tier}</span>
                </p>
                <CertificateDialog
                  image={content.certificate.image}
                  title={content.certificate.title}
                  linkLabel={content.certificate.linkLabel}
                  closeLabel={content.certificate.closeLabel}
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <HomeSection id="titulo-encontra" title="O que você encontra aqui" className="pb-12 md:pb-16">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.paths.map((path, index) => (
            <li key={path.href} className="revela flex" style={{ '--i': index } as CSSProperties}>
              <TrackedHomeLink
                href={path.href}
                placement="about"
                linkLabel={path.linkLabel}
                className={`flex flex-1 flex-col gap-3 rounded-[10px] border-2 border-marinho bg-white p-4 hover:bg-creme motion-safe:transition-colors md:p-5 ${FOCUS_RING}`}
              >
                <span className="text-lg font-extrabold">{path.title}</span>
                <span className="flex-1 text-sm leading-6 font-medium text-marinho-suave">{path.text}</span>
                <span className="flex items-center gap-2 text-sm font-extrabold underline underline-offset-[3px]">
                  {path.linkLabel}
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                </span>
              </TrackedHomeLink>
            </li>
          ))}
        </ul>
        <p className="text-sm font-semibold text-marinho-suave">{content.otherLanguages}</p>
      </HomeSection>

      <HomeSection id="titulo-como-testamos" title="Como testamos e escolhemos" className="pb-12 md:pb-16">
        <div className="grid gap-x-10 gap-y-5 md:grid-cols-2">
          {METHOD.map((item, index) => (
            <p
              key={item.lead}
              className="revela border-t-2 border-marinho pt-4 text-base leading-7 font-medium text-marinho-suave"
              style={{ '--i': index } as CSSProperties}
            >
              <strong className="font-extrabold text-marinho">{item.lead}</strong> {item.text}
            </p>
          ))}
        </div>
        <TrackedHomeLink
          href="/faqs"
          placement="about"
          linkLabel="Perguntas sobre links de afiliado"
          className={`flex min-h-11 items-center gap-2 self-start text-base font-extrabold underline underline-offset-[3px] ${FOCUS_RING}`}
        >
          Perguntas sobre links de afiliado
          <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
        </TrackedHomeLink>
      </HomeSection>

      <HomeSection id="titulo-historia" title="A história da Cecília" className="pb-12 md:pb-16">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
          <div className={`flex max-w-[62ch] flex-col gap-4 ${BODY_TEXT}`}>
            {STORY.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <figure className="relative aspect-[2/3] w-full max-w-[320px] overflow-hidden rounded-[10px] border-2 border-marinho bg-marinho/15 shadow-[4px_4px_0_var(--color-marinho)] lg:max-w-none">
            <Image
              src={resolveMediaUrl('/images/about/cecilia/cecilia-6.jpg')}
              alt="Cecília na cozinha de casa"
              fill
              sizes="(min-width: 1024px) 380px, 320px"
              className="object-cover"
            />
          </figure>
        </div>
      </HomeSection>

      <HomeSection id="titulo-marcas" title="Para marcas e agências" className="pb-12 md:pb-16">
        <div className="flex flex-col gap-5 rounded-[14px] border-2 border-marinho bg-creme p-5 md:flex-row md:items-center md:justify-between md:gap-10 md:p-8">
          <p className={`max-w-[60ch] ${BODY_TEXT}`}>
            O mídia kit tem os dados de audiência, os formatos de parceria e as condições comerciais. Para propostas,
            escreva para{' '}
            <a href={content.contactMailto} className={`wrap-break-word font-extrabold text-marinho underline underline-offset-[3px] ${FOCUS_RING}`}>
              {content.contactEmail}
            </a>{' '}
            ou use o formulário de contato.
          </p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a href={content.mediaKit} target="_blank" rel="noopener noreferrer" className={PRIMARY_PAGE_BUTTON}>
              Ver o mídia kit
              <ArrowRight aria-hidden="true" className="size-[18px]" strokeWidth={2.4} />
            </a>
            <TrackedHomeLink href="/contato" placement="about" linkLabel="Fale com a gente" className={SECONDARY_PAGE_BUTTON}>
              Fale com a gente
            </TrackedHomeLink>
          </div>
        </div>
      </HomeSection>

      <HomeSection id="titulo-parceiros" title="Marcas que já trabalharam com a Cecília" className="pb-16 md:pb-24">
        <p className={`max-w-[60ch] ${BODY_TEXT}`}>Empresas com quem a Cecília já fez conteúdo, campanha ou parceria de afiliado.</p>
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
          {content.partners.map((partner) => (
            <li key={partner.name} className="flex">
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                title={partner.name}
                className={`flex aspect-square flex-1 items-center justify-center rounded-[10px] border-2 border-marinho bg-white p-3 motion-safe:transition-transform motion-safe:hover:-translate-y-0.5 md:p-4 ${FOCUS_RING}`}
              >
                <span className="relative size-full">
                  <Image
                    src={resolveMediaUrl(partner.src)}
                    alt={partner.name}
                    fill
                    sizes="(min-width: 1024px) 150px, (min-width: 768px) 130px, 30vw"
                    className="object-contain mix-blend-multiply"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </HomeSection>
    </main>
  );
}
