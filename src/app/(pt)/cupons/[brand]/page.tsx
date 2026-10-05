import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CalendarDays,
  Check,
  ChevronRight,
  CircleCheck,
  Copy,
  ExternalLink,
  Layers,
  Repeat,
  Scissors,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { CopyAndOpenStoreLink, CopyCodeButton, CouponDock } from '@/components/coupons/CouponActions';
import {
  BrandWatermark,
  CouponFaq,
  DiscountFigure,
  OtherCouponCard,
  SectionHeading,
  couponFontVariables,
} from '@/components/coupons/CouponBlocks';
import {
  COUPONS,
  getAllActiveCouponSlugs,
  getCouponBySlug,
  getOtherActiveCoupons,
} from '@/lib/couponsData';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';

export function generateStaticParams() {
  return getAllActiveCouponSlugs().map((brand) => ({ brand }));
}

export const dynamicParams = true;

type CouponBrandPageProps = {
  params: Promise<{ brand: string }>;
};

export async function generateMetadata({ params }: CouponBrandPageProps): Promise<Metadata> {
  const { brand } = await params;
  const coupon =
    getCouponBySlug(brand) ??
    (process.env.NODE_ENV === 'development'
      ? COUPONS.find((item) => item.slug === brand)
      : undefined);
  if (!coupon) return {};
  const socialImage = coupon.socialImage || coupon.brandLogo || '/images/logos/logo-em-casa-com-cecilia.png';
  const deliveredSocialImage = new URL(
    resolveMediaUrl(socialImage),
    'https://emcasacomcecilia.com'
  ).toString();
  const socialImageAlt = coupon.socialImageAlt || coupon.brandLogoAlt || 'Em Casa com Cecília';

  return {
    title: coupon.metaTitle,
    description: coupon.metaDescription,
    alternates: {
      canonical: `/cupons/${coupon.slug}`,
    },
    openGraph: {
      title: coupon.metaTitle,
      description: coupon.metaDescription,
      url: `/cupons/${coupon.slug}`,
      type: 'article',
      images: [
        {
          url: deliveredSocialImage,
          alt: socialImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: coupon.metaTitle,
      description: coupon.metaDescription,
      images: [deliveredSocialImage],
    },
  };
}

function getJsonLd(coupon: NonNullable<ReturnType<typeof getCouponBySlug>>) {
  const url = `https://emcasacomcecilia.com/cupons/${coupon.slug}`;
  const offerType = coupon.offerTypeLabel || (coupon.offerMode === 'discount-code' ? 'cupom' : 'oferta');

  const offer = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: coupon.offerMode === 'discount-code'
      ? `${coupon.discount} na ${coupon.brand} com ${offerType} ${coupon.code}`
      : `${coupon.discount} na ${coupon.brand} pelo link indicado`,
    description: coupon.longDescription,
    category: coupon.category,
    priceCurrency: 'BRL',
    ...(coupon.offerMode === 'discount-code' ? {
      ...(coupon.discountNumber !== undefined ? { discount: `${coupon.discountNumber}` } : {}),
      couponCode: coupon.code,
    } : {}),
    offeredBy: {
      '@type': 'Organization',
      name: coupon.brand,
      url: coupon.officialUrl,
    },
    seller: {
      '@type': 'Organization',
      name: coupon.brand,
      url: coupon.officialUrl,
    },
    dateModified: coupon.lastVerified,
    url,
  };

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: coupon.metaTitle,
    description: coupon.metaDescription,
    url,
    dateModified: coupon.lastVerified,
    primaryImageOfPage: coupon.socialImage
      ? `https://emcasacomcecilia.com${coupon.socialImage}`
      : undefined,
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: coupon.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

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
      {
        '@type': 'ListItem',
        position: 3,
        name: coupon.brand,
        item: url,
      },
    ],
  };

  return [webPage, offer, faq, breadcrumb];
}

const formatLongDate = (isoDate: string) =>
  new Date(`${isoDate}T12:00:00`).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const formatShortDate = (isoDate: string) =>
  new Date(`${isoDate}T12:00:00`).toLocaleDateString('pt-BR');

// Evita "R$" no fim de uma linha e o valor no começo da seguinte.
const keepCurrencyTogether = (text: string) => text.replace(/R\$ /g, 'R$\u00a0');

// Códigos longos (EMCASACOMCECILIA) não cabem a 34px num celular de 360px.
const cutoutCodeSize = (code: string) =>
  code.length <= 10
    ? 'text-[34px] leading-[42px] tracking-[0.06em]'
    : code.length <= 13
      ? 'text-[28px] leading-9 tracking-[0.04em]'
      : 'text-[22px] leading-8 tracking-[0.02em]';

const FOCUS_RING = 'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-marinho';

const PRIMARY_ACTION = `flex min-h-[52px] items-center justify-center gap-2.5 rounded-[10px] border-2 border-marinho bg-laranja px-4 text-center text-base font-extrabold text-marinho transition-colors hover:bg-laranja/85 data-[copied=true]:border-verde-escuro data-[copied=true]:bg-verde-escuro data-[copied=true]:text-white ${FOCUS_RING}`;

const SECONDARY_ACTION = `flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] border-2 border-marinho bg-white px-4 text-center text-[15px] font-extrabold text-marinho transition-colors hover:bg-creme data-[copied=true]:border-verde-escuro data-[copied=true]:bg-verde-claro data-[copied=true]:text-verde-escuro ${FOCUS_RING}`;

const BODY_TEXT = 'max-w-[68ch] text-[15px] font-medium leading-6 text-marinho-suave md:text-base md:leading-7';

export default async function CouponBrandPage({ params }: CouponBrandPageProps) {
  const { brand } = await params;
  const coupon =
    getCouponBySlug(brand) ??
    (process.env.NODE_ENV === 'development'
      ? COUPONS.find((item) => item.slug === brand)
      : undefined);
  if (!coupon) notFound();

  const otherCoupons = getOtherActiveCoupons(coupon.slug);
  const jsonLd = getJsonLd(coupon);
  const couponCodeOffer = coupon.offerMode === 'discount-code' ? coupon : null;
  const affiliateLinkOffer = coupon.offerMode === 'affiliate-link' ? coupon : null;
  const tiers = couponCodeOffer?.tiers?.length ? couponCodeOffer.tiers : null;
  const offerType = coupon.offerTypeLabel || (couponCodeOffer ? 'cupom' : 'oferta');
  const offerTypeTitle = offerType.charAt(0).toUpperCase() + offerType.slice(1);
  const offerTypePlural = coupon.offerTypeLabelPlural || (couponCodeOffer ? 'cupons' : 'ofertas');
  const storeLabel = couponCodeOffer ? 'Ir para a loja' : coupon.offerActionLabel || 'Ver oferta';
  const codeFieldLabel = couponCodeOffer?.codeFieldLabel || 'campo de cupom/desconto';
  const offerInstructions = couponCodeOffer
    ? couponCodeOffer.codeInstructions || [
        `Copie o código ${couponCodeOffer.code} no card acima.`,
        `Acesse a loja ${coupon.brand} pelo botão indicado.`,
        'Adicione os produtos desejados ao carrinho.',
        'Cole o código no campo de cupom/desconto antes de finalizar.',
        `Confira se o desconto de ${coupon.discount} apareceu no resumo do pedido.`,
      ]
    : affiliateLinkOffer?.linkInstructions || [
        `Acesse a oferta da ${coupon.brand} pelo botão indicado.`,
        'Confira os produtos e condições disponíveis na página da loja.',
        'Verifique o valor final antes de concluir a compra.',
      ];
  const lastVerified = formatLongDate(coupon.lastVerified);
  const highlightDate = new Date(`${coupon.lastVerified}T12:00:00`);
  const highlightMonthYear = `${highlightDate.toLocaleDateString('pt-BR', {
    month: 'long',
  })} ${highlightDate.getFullYear()}`;
  const firstTier = tiers?.[0];
  const lastTier = tiers?.[tiers.length - 1];
  const rules = [
    { icon: ShoppingBag, label: 'Vale para', value: coupon.eligibleCategories },
    { icon: Layers, label: 'Junta com outras promoções?', value: coupon.combinable },
    { icon: CalendarDays, label: 'Validade', value: coupon.validity },
    { icon: Repeat, label: 'Mais de um uso', value: coupon.reusable },
    { icon: Truck, label: 'Frete', value: coupon.shipping },
  ];

  return (
    <main className={`${couponFontVariables} min-h-screen bg-white text-marinho`}>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="relative isolate overflow-hidden border-b-2 border-marinho bg-amarelo-cupom">
        <div className="relative mx-auto max-w-6xl px-4 pt-3 pb-16 md:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-x-16 lg:pt-6 lg:pb-14">
          <BrandWatermark
            src={coupon.brandWatermark}
            aboveTheFold
            className="-right-12 top-[108px] h-[150px] w-[300px] lg:top-10 lg:right-8 lg:h-[170px] lg:w-[340px]"
          />
          <div className="relative z-10">
            <nav aria-label="Você está em">
              <ol className="flex flex-wrap items-center gap-1 text-[13px] font-bold leading-[18px]">
                <li>
                  <Link href="/" className={`flex min-h-11 items-center underline underline-offset-[3px] ${FOCUS_RING}`}>
                    Início
                  </Link>
                </li>
                <li aria-hidden="true" className="flex">
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li>
                  <Link href="/cupons" className={`flex min-h-11 items-center underline underline-offset-[3px] ${FOCUS_RING}`}>
                    Cupons
                  </Link>
                </li>
                <li aria-hidden="true" className="flex">
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li aria-current="page">{coupon.brand}</li>
              </ol>
            </nav>

            <p className="mt-2 flex flex-col">
              <span className="text-base font-extrabold leading-[22px]">{coupon.brand}</span>
              <span className="text-[13px] font-semibold leading-[18px]">{coupon.category}</span>
            </p>

            <h1 className="mt-3.5 flex flex-col gap-0.5">
              <span className="font-condensada text-[30px] font-extrabold leading-8 font-stretch-condensed md:text-[40px] md:leading-[44px]">
                {offerTypeTitle} {coupon.brand}:
              </span>{' '}
              <DiscountFigure discount={coupon.discount} size="hero" />
              {couponCodeOffer && (
                <>
                  {' '}
                  <span className="mt-1 text-[17px] font-extrabold leading-6 md:text-[22px] md:leading-8">
                    com {couponCodeOffer.code}
                  </span>
                </>
              )}
            </h1>

            <p className="mt-3 max-w-[54ch] text-[15px] font-semibold leading-[22px] md:text-[17px] md:leading-[26px]">
              {coupon.longDescription}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-x-16">
        {/* No desktop o recorte gruda logo abaixo do menu, que tem 129px até o xl e 85px depois. */}
        <section
          id="cupom"
          aria-label={couponCodeOffer ? `Código do ${offerType} ${coupon.brand}` : `Como acessar a ${offerType} ${coupon.brand}`}
          className="relative z-10 -mt-11 rounded-2xl border-[2.5px] border-dashed border-marinho bg-white px-[18px] pt-6 pb-[18px] lg:sticky lg:top-38 lg:col-start-2 lg:row-start-1 lg:-mt-48 lg:self-start xl:top-28"
        >
          <span
            aria-hidden="true"
            className="absolute -top-[15px] left-4 flex h-7 w-7 items-center justify-center rounded-full bg-amarelo-cupom"
          >
            <Scissors className="h-5 w-5" />
          </span>

          {couponCodeOffer && !tiers && (
            <>
              <code className={`block break-all text-center font-codigo font-extrabold ${cutoutCodeSize(couponCodeOffer.code)}`}>
                {couponCodeOffer.code}
              </code>
              <CopyAndOpenStoreLink
                code={couponCodeOffer.code}
                brand={coupon.brand}
                href={coupon.offerUrl}
                className={`mt-3.5 ${PRIMARY_ACTION}`}
                copiedChildren={
                  <>
                    <Check aria-hidden="true" className="h-5 w-5 shrink-0" />
                    Código copiado
                  </>
                }
              >
                Copiar e ir para a loja
                <ExternalLink aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
              </CopyAndOpenStoreLink>
              <CopyCodeButton
                code={couponCodeOffer.code}
                brand={coupon.brand}
                placement="coupon_page"
                className={`mt-2.5 ${SECONDARY_ACTION}`}
                copiedChildren={
                  <>
                    <Check aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
                    Copiado
                  </>
                }
              >
                <Copy aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
                Só copiar o código
              </CopyCodeButton>
            </>
          )}

          {couponCodeOffer && firstTier && lastTier && (
            <>
              <p className="text-[15px] font-semibold leading-[22px]">
                {keepCurrencyTogether(
                  `${tiers?.length} códigos: de ${firstTier.discount} em compras a partir de ${firstTier.minPurchase} até ${lastTier.discount} a partir de ${lastTier.minPurchase}.`,
                )}
              </p>
              <a href="#faixas-de-desconto" className={`mt-3.5 ${PRIMARY_ACTION}`}>
                Escolher minha faixa
              </a>
              <CouponStoreLink
                href={coupon.offerUrl}
                couponCode={couponCodeOffer.code}
                brand={coupon.brand}
                placement="coupon_page"
                className={`mt-2.5 ${SECONDARY_ACTION}`}
              >
                Ir para a loja
                <ExternalLink aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
              </CouponStoreLink>
            </>
          )}

          {affiliateLinkOffer && (
            <>
              <p className="text-center text-[15px] font-bold leading-[22px]">
                Sem cupom para copiar: a oferta abre pelo link da Cecília.
              </p>
              <CouponStoreLink
                href={coupon.offerUrl}
                brand={coupon.brand}
                placement="coupon_page"
                className={`mt-3.5 ${PRIMARY_ACTION}`}
              >
                {storeLabel}
                <ExternalLink aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
              </CouponStoreLink>
              {affiliateLinkOffer.referral && (
                <a href="#indicacao" className={`mt-2.5 ${SECONDARY_ACTION}`}>
                  Ver o código de indicação
                </a>
              )}
            </>
          )}

          <p className="mt-3.5 flex items-center justify-center gap-2 text-center text-[13px] font-bold leading-[18px] text-verde-escuro">
            <CircleCheck aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
            Conferido em {lastVerified}
          </p>
        </section>

        <div className="mt-10 flex flex-col gap-12 lg:col-start-1 lg:row-start-1 lg:mt-14 lg:gap-14">
          {coupon.monthlyHighlight && (
            <div className="rounded-xl border-2 border-marinho p-4 md:p-5">
              <p className="text-base font-extrabold leading-[22px]">
                {couponCodeOffer
                  ? `${offerTypeTitle} ${coupon.brand} atualizado: ${couponCodeOffer.code} — ${coupon.discount} ${coupon.monthlyHighlight.scope} (${highlightMonthYear}).`
                  : `Atualização da oferta ${coupon.brand}: ${coupon.discount} ${coupon.monthlyHighlight.scope} (${highlightMonthYear}).`}
              </p>
              <p className="mt-2 text-sm font-medium leading-[21px] text-marinho-suave">
                {coupon.monthlyHighlight.note}. Confirme as condições e o valor final antes de finalizar.
              </p>
            </div>
          )}

          {tiers && (
            <section aria-labelledby="faixas-de-desconto">
              <SectionHeading id="faixas-de-desconto">Faixas de desconto do {coupon.brand}</SectionHeading>
              <div className="mt-5 flex flex-col gap-3">
                <p className="rounded-xl border-2 border-laranja bg-laranja/10 px-4 py-3 text-sm leading-[21px]">
                  <strong>Atenção:</strong> estes códigos da Cecília funcionam{' '}
                  <strong>somente pelo navegador</strong>, na loja{' '}
                  <a
                    href={coupon.offerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-bold underline underline-offset-2 wrap-anywhere ${FOCUS_RING}`}
                  >
                    {coupon.offerUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                  </a>{' '}
                  — não funcionam no app do Magalu nem em magazineluiza.com.br.
                </p>
                <p className="rounded-xl border-2 border-marinho px-4 py-3 text-sm leading-[21px]">
                  <strong>Por que o endereço é diferente?</strong> O Magazine Você é a loja de
                  influenciadores do próprio Magalu: mesmo catálogo, mesmos preços e a mesma conta.
                  Você entra com o login Magalu de sempre, e quem vende, cobra, entrega e cuida do
                  pós-venda é o Magazine Luiza. O endereço diferente não é golpe — é o que ativa os
                  cupons exclusivos da Cecília.
                </p>
              </div>
              <p className={`mt-4 ${BODY_TEXT}`}>
                Escolha o código conforme o valor total do seu carrinho — quanto maior a faixa
                alcançada, maior o desconto em reais. Clique no código para copiá-lo.
              </p>
              {/* O código fica inteiro numa coluna própria; a rolagem só entra abaixo de ~330px. */}
              <div className="mt-4 overflow-x-auto rounded-xl border-2 border-marinho">
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">
                    Faixas de cupom {coupon.brand}: desconto, compra mínima e código
                  </caption>
                  <thead className="bg-amarelo-cupom">
                    <tr className="border-b-2 border-marinho">
                      <th scope="col" className="px-3 py-2.5 text-[13px] font-extrabold leading-[18px]">
                        Desconto
                      </th>
                      <th scope="col" className="px-3 py-2.5 text-[13px] font-extrabold leading-[18px]">
                        Código
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tiers.map((tier, index) => (
                      <tr key={tier.code} className={index > 0 ? 'border-t-2 border-marinho/15' : undefined}>
                        <td className="px-3 py-3 align-top">
                          <span className="block font-condensada text-[26px] font-black leading-none font-stretch-extra-condensed">
                            {keepCurrencyTogether(tier.discount)}
                          </span>
                          <span className="mt-1 block text-[13px] font-bold leading-[18px] text-marinho-suave">
                            a partir de {keepCurrencyTogether(tier.minPurchase)}
                          </span>
                        </td>
                        <td className="w-px px-3 py-3 align-top">
                          <CopyCodeButton
                            code={tier.code}
                            brand={coupon.brand}
                            placement="coupon_page_tiers"
                            ariaLabel={`Copiar o código ${tier.code}`}
                            className={`inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-lg border-2 border-dashed border-marinho bg-white px-2.5 font-codigo text-xs font-extrabold text-marinho data-[copied=true]:border-solid data-[copied=true]:border-verde-escuro data-[copied=true]:bg-verde-claro data-[copied=true]:text-verde-escuro ${FOCUS_RING}`}
                            copiedChildren={
                              <>
                                {tier.code}
                                <Check aria-hidden="true" className="h-4 w-4 shrink-0" />
                              </>
                            }
                          >
                            {tier.code}
                            <Copy aria-hidden="true" className="h-4 w-4 shrink-0" />
                          </CopyCodeButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section aria-labelledby="regras">
            <SectionHeading id="regras">Regras sem letra miúda</SectionHeading>
            <dl className="mt-5 flex flex-col gap-3.5">
              {rules.map(({ icon: Icon, label, value }) => (
                <div key={label} className="relative min-h-10 pl-[52px]">
                  <dt className="text-[13px] font-bold leading-[18px] text-marinho-suave">
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-marinho bg-amarelo-cupom"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    {label}
                  </dt>
                  <dd className="text-[15px] font-bold leading-[22px]">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {coupon.referral && (
            <section aria-labelledby="indicacao">
              <SectionHeading id="indicacao">{coupon.referral.label}</SectionHeading>
              <div className="mt-5 rounded-xl border-2 border-dashed border-marinho p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <code className="font-codigo text-[26px] font-extrabold tracking-[0.06em]">{coupon.referral.code}</code>
                  <CopyCodeButton
                    code={coupon.referral.code}
                    brand={coupon.brand}
                    placement="coupon_page"
                    ariaLabel={`Copiar o código ${coupon.referral.code}`}
                    className={`ml-auto flex min-h-11 items-center gap-2 rounded-lg border-2 border-marinho bg-laranja px-3.5 text-sm font-extrabold text-marinho data-[copied=true]:border-verde-escuro data-[copied=true]:bg-verde-escuro data-[copied=true]:text-white ${FOCUS_RING}`}
                    copiedChildren={
                      <>
                        <Check aria-hidden="true" className="h-[18px] w-[18px]" />
                        Copiado
                      </>
                    }
                  >
                    <Copy aria-hidden="true" className="h-[18px] w-[18px]" />
                    Copiar
                  </CopyCodeButton>
                </div>
                <p className="mt-3 text-sm font-medium leading-[21px] text-marinho-suave">{coupon.referral.instructions}</p>
                <p className="mt-2 text-xs font-semibold leading-4 text-marinho-suave">
                  Verificado em {formatShortDate(coupon.referral.verifiedAt)}.
                </p>
              </div>
            </section>
          )}

          {coupon.campaigns && coupon.campaigns.length > 0 && (
            <section aria-labelledby="campanhas">
              <SectionHeading id="campanhas">Campanhas ativas da {coupon.brand}</SectionHeading>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {coupon.campaigns.map((campaign) => (
                  <article key={`${campaign.code}-${campaign.offerUrl}`} className="flex flex-col rounded-xl border-2 border-marinho p-4">
                    <h3 className="text-lg font-extrabold leading-6">{campaign.title}</h3>
                    <code className="mt-3 self-start rounded-lg border-2 border-dashed border-marinho bg-amarelo-cupom px-3 py-1.5 font-codigo text-sm font-extrabold tracking-[0.06em]">
                      {campaign.code}
                    </code>
                    <p className="mt-3 text-sm font-medium leading-[21px] text-marinho-suave">{campaign.description}</p>
                    <p className="mt-2 text-xs font-medium leading-[18px] text-marinho-suave">{campaign.eligibility}</p>
                    <CouponStoreLink
                      href={campaign.offerUrl}
                      brand={coupon.brand}
                      placement="coupon_page"
                      className={`mt-4 ${PRIMARY_ACTION}`}
                    >
                      Abrir campanha na {coupon.brand}
                      <ExternalLink aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
                    </CouponStoreLink>
                    <p className="mt-3 text-[11px] font-semibold leading-4 text-marinho-suave">
                      Verificada em {formatShortDate(campaign.verifiedAt)}.
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="como-usar">
            <SectionHeading id="como-usar">
              {couponCodeOffer
                ? `Como usar o ${offerType} ${couponCodeOffer.code}`
                : `Como acessar a oferta da ${coupon.brand}`}
            </SectionHeading>
            <ol className="mt-5 flex flex-col gap-3">
              {offerInstructions.map((instruction, index) => (
                <li key={instruction} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="min-w-7 shrink-0 font-condensada text-[44px] font-black leading-10 font-stretch-extra-condensed"
                  >
                    {index + 1}
                  </span>
                  <span className="pt-2 text-[15px] font-semibold leading-[22px] md:text-base md:leading-6">{instruction}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 rounded-xl bg-verde-claro px-4 py-3 text-sm font-semibold leading-[21px] text-verde-escuro">
              {couponCodeOffer ? (
                <>Campo correto: <strong>{codeFieldLabel}</strong>. Confirme sempre o resumo do pedido antes de pagar.</>
              ) : coupon.referral ? (
                <>O link principal abre a SHEIN; códigos de indicação e de campanha são pesquisados no aplicativo. Confirme as condições exibidas para a sua conta antes de pagar.</>
              ) : (
                <>Esta oferta é acessada pelo link indicado e não exige código para copiar. Confirme as condições na loja antes de pagar.</>
              )}
            </p>
          </section>

          <section aria-labelledby="sobre">
            <SectionHeading id="sobre">Sobre a {coupon.brand}</SectionHeading>
            <p className={`mt-4 ${BODY_TEXT}`}>{coupon.aboutBrand}</p>
          </section>

          {coupon.relatedContent && coupon.relatedContent.length > 0 && (
            <section aria-labelledby="leia-antes">
              <SectionHeading id="leia-antes">Leia antes de comprar</SectionHeading>
              <div className="mt-5 grid gap-2.5 md:grid-cols-2">
                {coupon.relatedContent.map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    className={`flex items-center gap-3 rounded-xl border-2 border-marinho px-3.5 py-3 transition-colors hover:bg-creme ${FOCUS_RING}`}
                  >
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="text-xs font-extrabold leading-4 text-marinho-suave">
                        {item.type === 'review' ? 'Review' : 'Post'} · {formatShortDate(item.publishedAt)}
                      </span>
                      <span className="text-[15px] font-bold leading-[21px]">{item.title}</span>
                    </span>
                    <ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="perguntas">
            <SectionHeading id="perguntas">
              {couponCodeOffer
                ? `Perguntas frequentes sobre ${offerTypePlural} ${coupon.brand}`
                : `Perguntas frequentes sobre ${offerTypePlural} da ${coupon.brand}`}
            </SectionHeading>
            <div className="mt-5">
              <CouponFaq items={coupon.faqs} />
            </div>
          </section>

          {couponCodeOffer?.history && couponCodeOffer.history.length > 0 && (
            <section aria-labelledby="historico">
              <SectionHeading id="historico">Histórico de cupons da {coupon.brand}</SectionHeading>
              <p className={`mt-4 ${BODY_TEXT}`}>
                Cupons anteriores já usados nessa parceria. O cupom ativo atual é{' '}
                <strong className="text-marinho">{couponCodeOffer.code}</strong>.
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {couponCodeOffer.history.map((item) => (
                  <li
                    key={`${item.date}-${item.code}`}
                    className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border-2 border-marinho/15 px-4 py-3 text-sm"
                  >
                    <span className="text-xs font-bold text-marinho-suave">{item.date}</span>
                    <code className="font-codigo text-[13px] font-extrabold">{item.code}</code>
                    <span className="font-extrabold">{item.discount}</span>
                    {item.note && <span className="text-marinho-suave">{item.note}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {otherCoupons.length > 0 && (
        <section aria-labelledby="outros-cupons" className="mx-auto mt-14 max-w-6xl md:px-8">
          <div className="px-4 md:px-0">
            <SectionHeading id="outros-cupons">Outros cupons</SectionHeading>
          </div>
          <div className="hide-scrollbar mt-5 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-4">
            {otherCoupons.map((otherCoupon) => (
              <OtherCouponCard key={otherCoupon.slug} coupon={otherCoupon} />
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="transparencia" className="mx-auto max-w-6xl px-4 pt-12 pb-10 md:px-8">
        <h2 id="transparencia" className="text-[15px] font-extrabold leading-[22px]">
          Transparência
        </h2>
        <p className="mt-1.5 max-w-[68ch] text-[13px] font-medium leading-5 text-marinho-suave">
          {couponCodeOffer ? (
            <>Esta página pode conter links de afiliado. Quando você compra usando o {offerType}{' '}
              <strong className="text-marinho">{couponCodeOffer.code}</strong> ou acessa a loja pelo link indicado, o Em Casa com Cecília
              pode receber comissão da marca, sem custo extra para você.</>
          ) : (
            <>Esta página contém um link de afiliado. Quando você acessa a oferta e compra pelo link indicado,
              o Em Casa com Cecília pode receber comissão da marca, sem custo extra para você.</>
          )}
        </p>
      </section>

      <CouponDock
        targetId="cupom"
        brand={coupon.brand}
        storeUrl={coupon.offerUrl}
        storeLabel={storeLabel}
        code={couponCodeOffer?.code}
        tiersHref={tiers ? '#faixas-de-desconto' : undefined}
      />
    </main>
  );
}
