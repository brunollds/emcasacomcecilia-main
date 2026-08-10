import type { Metadata } from 'next';
import Link from 'next/link';
import { Ticket } from 'lucide-react';
import { CouponPillCard, FAQAccordion } from '@/components/CouponComponents';
import { getActiveCoupons, getCouponStats } from '@/lib/couponsData';

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
        url: '/images/logos/logo-em-casa-com-cecilia.png',
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

export default function CuponsPage() {
  const activeCoupons = getActiveCoupons();
  const stats = getCouponStats();
  const jsonLd = getJsonLd();
  const lastUpdate = stats.lastUpdate
    ? new Date(stats.lastUpdate).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <main className="min-h-screen bg-[#fef9f3]">
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="relative overflow-hidden bg-[#0f1d3a] px-4 py-16 text-white md:py-20">
        <div className="absolute left-[8%] top-[18%] h-28 w-28 rounded-full bg-[#ff6b35]/20 blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] h-36 w-36 rounded-full bg-[#ffd700]/18 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/55">
            <Link href="/" className="hover:text-white">Início</Link>
            <span className="mx-2 opacity-40">/</span>
            <span className="text-white">Cupons</span>
          </nav>

          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#ff6b35] text-white shadow-xl shadow-[#ff6b35]/20">
              <Ticket className="h-8 w-8" />
            </div>
            <div>
              <h1 className="font-heading text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">
                Cupons da Cecília
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/76 md:text-lg">
                Códigos e ofertas para economizar em marcas parceiras que aparecem no Em Casa com Cecília.
                Cada benefício tem uma página própria com regras, validade e instruções de uso.
              </p>
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-4">
            <div>
              <dt className="text-[10px] font-black uppercase tracking-[0.18em] text-white/58">Benefícios ativos</dt>
              <dd className="mt-1 text-2xl font-black text-[#ff9158]">{stats.activeCount}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-black uppercase tracking-[0.18em] text-white/58">Desconto médio</dt>
              <dd className="mt-1 text-2xl font-black text-[#ff9158]">{stats.averageDiscount}%</dd>
            </div>
            <div>
              <dt className="text-[10px] font-black uppercase tracking-[0.18em] text-white/58">Formatos</dt>
              <dd className="mt-1 text-lg font-black text-[#ff9158]">Código + link</dd>
            </div>
            <div>
              <dt className="text-[10px] font-black uppercase tracking-[0.18em] text-white/58">Atualização</dt>
              <dd className="mt-1 text-lg font-black text-[#ff9158]">{lastUpdate ? 'Hoje' : 'Manual'}</dd>
            </div>
          </dl>

          {lastUpdate && (
            <p className="mt-4 text-xs text-white/55">
              Última revisão dos benefícios ativos: {lastUpdate}.
            </p>
          )}

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-md">
            <h2 className="font-heading text-2xl font-black text-white">
              Cupons e ofertas ativos
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/68">
              Escolha uma marca para ver detalhes completos, regras de uso e conteúdo relacionado.
            </p>

            <div className="mt-6 grid min-w-0 gap-3 md:grid-cols-2">
              {activeCoupons.map((coupon) => (
                <CouponPillCard
                  key={coupon.slug}
                  {...(coupon.offerMode === 'discount-code'
                    ? { offerMode: coupon.offerMode, code: coupon.code }
                    : { offerMode: coupon.offerMode })}
                  brand={coupon.brand}
                  brandIcon={coupon.brandIcon}
                  brandLogo={coupon.brandLogo}
                  brandLogoAlt={coupon.brandLogoAlt}
                  shortDescription={coupon.shortDescription}
                  discount={coupon.discount}
                  href={`/cupons/${coupon.slug}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-black text-[#0f1419]">
            Como funcionam os cupons e ofertas da Cecília
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#0f1419]/78">
            Esta página reúne códigos e ofertas por link em uma central de benefícios. Quando houver um
            código, você poderá copiá-lo e aplicar no checkout; nas ofertas por link, basta acessar a loja
            pelo botão indicado. As páginas específicas explicam os produtos elegíveis e as regras de uso.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#0f1419]/78">
            Alguns links podem gerar comissão para o Em Casa com Cecília, sem custo extra para você.
            Esse modelo ajuda a manter receitas, reviews e guias gratuitos, com transparência sobre as marcas parceiras.
          </p>

          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">
            Como usar em 3 passos
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-relaxed text-[#0f1419]/78">
            <li>Abra a página da marca parceira e confira se o benefício usa código ou link.</li>
            <li>Copie o código quando houver ou acesse diretamente a loja pelo botão indicado.</li>
            <li>Confira as condições e o valor final antes de concluir a compra.</li>
          </ol>

          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">
            Perguntas frequentes
          </h2>
          <div className="mt-4">
            <FAQAccordion items={HUB_FAQS} />
          </div>
        </div>
      </section>
    </main>
  );
}
