import type { Metadata } from 'next';
import { CircleCheck } from 'lucide-react';
import { CouponFaq, SectionHeading, ShelfHeading, couponFontVariables } from '@/components/coupons/CouponBlocks';
import { PT_COUPON_HUB_TEXT } from '@/components/coupons/couponHubCopy';
import { CouponShelfItem, HubCouponCard, SHELF_CARD, couponCardName, layoutShelf } from '@/components/coupons/CouponCards';
import { RevealSection } from '@/components/ui/RevealSection';
import { COUPON_HUB_LOGO_URL, getCouponHubAlternates } from '@/lib/couponHub';
import { getActiveCoupons, getCouponHubSections } from '@/lib/couponsData';
import { getCurrentOfferMonthDate } from '@/lib/offerMonth';

// O snippet cita as lojas de código mais buscadas que estão ativas, para não anunciar uma loja pausada.
const SNIPPET_STORES = ['Insider', 'DAMIE', 'Dolce Gusto', 'Hostinger'];
const activeCodeStores = getActiveCoupons()
  .filter((coupon) => coupon.offerMode === 'discount-code')
  .map((coupon) => coupon.brand);
const snippetStores = SNIPPET_STORES.filter((brand) => activeCodeStores.includes(brand));
// Com uma loja só sai o nome dela; sem nenhuma das quatro ativa, a frase fica sem o "como".
const snippetStoreList = new Intl.ListFormat('pt-BR', { type: 'conjunction' }).format(snippetStores);
const storeCount = activeCodeStores.length === 1 ? '1 loja parceira' : `${activeCodeStores.length} lojas parceiras`;
const HUB_DESCRIPTION = `Códigos de desconto de ${storeCount}${snippetStores.length ? `, como ${snippetStoreList}` : ''}: o desconto de cada código, as regras e se ele soma com a promoção.`;

export const metadata: Metadata = {
  title: PT_COUPON_HUB_TEXT.metaTitle,
  description: HUB_DESCRIPTION,
  alternates: getCouponHubAlternates('pt'),
  openGraph: {
    title: 'Cupons da Cecília — Em Casa com Cecília',
    description: HUB_DESCRIPTION,
    url: '/cupons',
    type: 'website',
    images: [
      {
        url: COUPON_HUB_LOGO_URL,
        alt: 'Logo Em Casa com Cecília',
      },
    ],
  },
};

const HUB_FAQS = PT_COUPON_HUB_TEXT.faqs;
const HUB_TRANSPARENCY = PT_COUPON_HUB_TEXT.transparency;

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
        ? `${couponCardName(coupon)} — ${coupon.discount} com ${coupon.code}`
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
  const { featured, categories } = getCouponHubSections();
  const jsonLd = getJsonLd();
  // O mês da oferta pelo calendário, como nas páginas de loja; cada loja mostra a data do próprio teste.
  const offerMonth = getCurrentOfferMonthDate();
  const offerMonthLabel = offerMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const offerMonthIso = `${offerMonth.getFullYear()}-${String(offerMonth.getMonth() + 1).padStart(2, '0')}`;

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
            {PT_COUPON_HUB_TEXT.title}
          </h1>
          <p className="mt-3 max-w-[54ch] text-[15px] font-semibold leading-[22px] md:text-[17px] md:leading-[26px]">
            {PT_COUPON_HUB_TEXT.lead}
          </p>
          <p className="mt-3.5 flex items-center gap-2 text-[13px] font-bold leading-[18px] text-verde-escuro">
            <CircleCheck aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
            <span>
              {PT_COUPON_HUB_TEXT.validMonth.before}
              <time dateTime={offerMonthIso}>{offerMonthLabel}</time>
              {PT_COUPON_HUB_TEXT.validMonth.after}
            </span>
          </p>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-7 px-4 pt-6 md:gap-10 md:px-8 md:pt-10">
        {featured.length > 0 && (
          <section aria-labelledby="destaques" className="flex flex-col gap-3">
            <ShelfHeading id="destaques">{PT_COUPON_HUB_TEXT.featuredTitle}</ShelfHeading>
            {/* Pensado para dois destaques: o primeiro fica com 3/5 da linha no desktop. */}
            <div className={`grid gap-3 md:gap-4 ${featured.length > 1 ? 'md:grid-cols-[3fr_2fr]' : ''}`}>
              {featured.map((coupon, index) => (
                <HubCouponCard key={coupon.slug} coupon={coupon} variant={index === 0 ? 'lead' : 'featured'} stampOrder={index} />
              ))}
            </div>
          </section>
        )}

        {/* No desktop, prateleiras de até dois cards dividem a linha; as maiores ocupam a largura toda. */}
        <div className="grid gap-7 md:grid-cols-2 md:gap-x-6 md:gap-y-10">
          {categories.map((category) => {
            const shelf = layoutShelf(category.coupons);
            const fullRow = shelf.reduce((slots, item) => slots + (item.wide ? 2 : 1), 0) > 2;

            // A prateleira entra em cascata quando chega à tela (RevealSection). O pt-4 e o gap-y-6 dão lugar
            // ao ímã, que sai 12px do cartão (16px no hover); o gap-x-4 o afasta do cartão ao lado.
            return (
              <RevealSection
                key={category.id}
                aria-labelledby={`prateleira-${category.id}`}
                className={`flex flex-col gap-3 ${fullRow ? 'md:col-span-2' : ''}`}
              >
                <ShelfHeading id={`prateleira-${category.id}`}>{category.label}</ShelfHeading>
                <div className={`grid flex-1 grid-cols-2 gap-x-4 gap-y-6 pt-4 ${fullRow ? 'md:grid-cols-4' : ''}`}>
                  {shelf.map(({ coupon, wide }, index) => (
                    <CouponShelfItem key={coupon.slug} index={index} className={wide ? 'col-span-2' : ''}>
                      <HubCouponCard coupon={coupon} variant={wide ? 'wide' : 'narrow'} className={SHELF_CARD} />
                    </CouponShelfItem>
                  ))}
                </div>
              </RevealSection>
            );
          })}
        </div>
      </div>

      <section aria-labelledby="perguntas" className="mx-auto max-w-6xl px-4 pt-12 md:px-8 md:pt-16">
        <SectionHeading id="perguntas">{PT_COUPON_HUB_TEXT.faqTitle}</SectionHeading>
        <div className="mt-4 max-w-3xl">
          <CouponFaq items={HUB_FAQS} />
        </div>
      </section>

      <section aria-labelledby="transparencia" className="mx-auto max-w-6xl px-4 pt-12 pb-10 md:px-8">
        <h2 id="transparencia" className="text-[15px] font-extrabold leading-[22px]">
          Transparência
        </h2>
        <p className="mt-1.5 max-w-[68ch] text-[13px] font-medium leading-5 text-marinho-suave">
          {HUB_TRANSPARENCY}
        </p>
      </section>
    </main>
  );
}
