import type { Metadata } from 'next';
import { CircleCheck } from 'lucide-react';
import {
  CouponFaq,
  HubCouponCard,
  SectionHeading,
  couponFontVariables,
  layoutShelf,
} from '@/components/coupons/CouponBlocks';
import { getActiveCoupons, getCouponHubSections } from '@/lib/couponsData';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

const COUPONS_LOGO_URL = new URL(
  resolveMediaUrl('/images/logos/logo-em-casa-com-cecilia.png'),
  'https://emcasacomcecilia.com'
).toString();

export const metadata: Metadata = {
  title: 'Cupons da Cecília — Códigos de desconto ativos',
  description:
    'Cupons e ofertas da Cecília para economizar em marcas parceiras como DAMIE e Dolce Gusto.',
  alternates: {
    canonical: '/cupons',
  },
  openGraph: {
    title: 'Cupons da Cecília — Em Casa com Cecília',
    description: 'Códigos de desconto e ofertas em marcas parceiras da Cecília.',
    url: '/cupons',
    type: 'website',
    images: [
      {
        url: COUPONS_LOGO_URL,
        alt: 'Logo Em Casa com Cecília',
      },
    ],
  },
};

const HUB_FAQS = [
  {
    question: 'Como funcionam os cupons e ofertas da Cecília?',
    answer:
      'Alguns benefícios usam códigos aplicados no checkout; outros são acessados diretamente pelo link indicado. A página de cada marca explica qual formato está ativo.',
  },
  {
    question: 'Os benefícios têm validade?',
    answer:
      'Cada cupom ou oferta tem sua própria regra. As páginas individuais indicam validade, última verificação e condições de uso quando essas informações existem.',
  },
  {
    question: 'Posso usar o mesmo benefício mais de uma vez?',
    answer:
      'Isso depende da regra da loja parceira. Se houver limite por CPF, código ou campanha, a condição aparece na página da marca, no carrinho ou no checkout.',
  },
  {
    question: 'O benefício é cumulativo com promoções da loja?',
    answer:
      'A possibilidade de acumular depende da marca, do formato da oferta e da campanha. O valor final exibido no carrinho ou checkout é a referência.',
  },
  {
    question: 'O que acontece se o benefício não funcionar?',
    answer:
      'Confira se o produto é elegível e, quando houver código, se ele foi digitado corretamente. Se ainda assim não funcionar, avise pelo contato do site para que a informação seja revisada.',
  },
  {
    question: 'Existe comissão de afiliado?',
    answer:
      'Alguns links podem gerar comissão para o Em Casa com Cecília, sem custo extra para você. Esse modelo ajuda a manter o conteúdo gratuito.',
  },
];

function getJsonLd() {
  const activeCoupons = getActiveCoupons();

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: 'https://emcasacomcecilia.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Cupons',
        item: 'https://emcasacomcecilia.com/cupons',
      },
    ],
  };

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cupons ativos da Cecília',
    itemListElement: activeCoupons.map((coupon, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: coupon.offerMode === 'discount-code'
        ? `Cupom ${coupon.brand} — ${coupon.discount} com ${coupon.code}`
        : `Oferta ${coupon.brand} — ${coupon.discount} pelo link indicado`,
      url: `https://emcasacomcecilia.com/cupons/${coupon.slug}`,
    })),
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HUB_FAQS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return [breadcrumb, itemList, faq];
}

function ShelfHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <h2
        id={id}
        className="font-condensada text-[28px] font-black leading-7 font-stretch-extra-condensed md:text-[32px] md:leading-8"
      >
        {children}
      </h2>
      <span aria-hidden="true" className="h-0.5 flex-1 bg-marinho" />
    </div>
  );
}

export default function CuponsPage() {
  const { featured, categories, lastVerified } = getCouponHubSections();
  const jsonLd = getJsonLd();
  const lastVerifiedLabel = lastVerified
    ? new Date(`${lastVerified}T12:00:00`).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <main className={`${couponFontVariables} min-h-screen bg-white text-marinho`}>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="border-b-2 border-marinho bg-amarelo-cupom">
        <div className="mx-auto max-w-6xl px-4 pt-5 pb-6 md:px-8 md:pt-10 md:pb-9">
          <h1 className="font-condensada text-[64px] font-black leading-[0.92] tracking-[-0.01em] font-stretch-extra-condensed md:text-[96px]">
            Cupons da Cecília
          </h1>
          <p className="mt-3 max-w-[54ch] text-[15px] font-semibold leading-[22px] md:text-[17px] md:leading-[26px]">
            Copie o código aqui e cole no checkout da loja parceira.
          </p>
          {lastVerified && lastVerifiedLabel && (
            <p className="mt-3.5 flex items-center gap-2 text-[13px] font-bold leading-[18px] text-verde-escuro">
              <CircleCheck aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
              <span>
                Última conferência: <time dateTime={lastVerified}>{lastVerifiedLabel}</time>
              </span>
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-7 px-4 pt-6 md:gap-10 md:px-8 md:pt-10">
        {featured.length > 0 && (
          <section aria-labelledby="destaques" className="flex flex-col gap-3">
            <ShelfHeading id="destaques">Destaques</ShelfHeading>
            {/* Pensado para dois destaques: o primeiro fica com 3/5 da linha no desktop. */}
            <div className={`grid gap-3 md:gap-4 ${featured.length > 1 ? 'md:grid-cols-[3fr_2fr]' : ''}`}>
              {featured.map((coupon, index) => (
                <HubCouponCard key={coupon.slug} coupon={coupon} variant={index === 0 ? 'lead' : 'featured'} />
              ))}
            </div>
          </section>
        )}

        {/* No desktop, prateleiras de até dois cards dividem a linha; as maiores ocupam a largura toda. */}
        <div className="grid gap-7 md:grid-cols-2 md:gap-x-6 md:gap-y-10">
          {categories.map((category) => {
            const shelf = layoutShelf(category.coupons);
            const fullRow = shelf.reduce((slots, item) => slots + (item.wide ? 2 : 1), 0) > 2;

            return (
              <section
                key={category.id}
                aria-labelledby={`prateleira-${category.id}`}
                className={`flex flex-col gap-3 ${fullRow ? 'md:col-span-2' : ''}`}
              >
                <ShelfHeading id={`prateleira-${category.id}`}>{category.label}</ShelfHeading>
                <div className={`grid flex-1 grid-cols-2 gap-3 ${fullRow ? 'md:grid-cols-4' : ''}`}>
                  {shelf.map(({ coupon, wide }) => (
                    <HubCouponCard
                      key={coupon.slug}
                      coupon={coupon}
                      variant={wide ? 'wide' : 'narrow'}
                      className={wide ? 'col-span-2' : ''}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <section aria-labelledby="perguntas" className="mx-auto max-w-6xl px-4 pt-12 md:px-8 md:pt-16">
        <SectionHeading id="perguntas">Perguntas frequentes</SectionHeading>
        <div className="mt-4 max-w-3xl">
          <CouponFaq items={HUB_FAQS} />
        </div>
      </section>

      <section aria-labelledby="transparencia" className="mx-auto max-w-6xl px-4 pt-12 pb-10 md:px-8">
        <h2 id="transparencia" className="text-[15px] font-extrabold leading-[22px]">
          Transparência
        </h2>
        <p className="mt-1.5 max-w-[68ch] text-[13px] font-medium leading-5 text-marinho-suave">
          Alguns links podem gerar comissão para o Em Casa com Cecília, sem custo extra para você. Esse modelo ajuda
          a manter receitas, reviews e guias gratuitos, com transparência sobre as marcas parceiras.
        </p>
      </section>
    </main>
  );
}
