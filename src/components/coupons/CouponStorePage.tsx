import { Fragment } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
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
import { getOtherActiveCoupons, type Coupon } from '@/lib/couponsData';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import { CopyAndOpenStoreLink, CopyCodeButton, CouponDock } from './CouponActions';
import {
  BrandWatermark,
  CouponFaq,
  DiscountFigure,
  OtherCouponCard,
  SectionHeading,
  couponFontVariables,
} from './CouponBlocks';
import { COUPON_STORE_COPY, type CouponStoreCopy, type CouponStoreLocale } from './couponStoreCopy';

const SITE_URL = 'https://emcasacomcecilia.com';

const absoluteUrl = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);

function getBreadcrumb(coupon: Coupon, copy: CouponStoreCopy) {
  return [
    { name: copy.homeLabel, path: '/' },
    { name: copy.couponsLabel, path: '/cupons' },
    { name: coupon.brand, path: `/cupons/${coupon.slug}` },
  ];
}

const getOfferType = (coupon: Coupon, copy: CouponStoreCopy) =>
  coupon.offerTypeLabel || (coupon.offerMode === 'discount-code' ? copy.offerType.code : copy.offerType.link);

export function getCouponStoreMetadata(coupon: Coupon): Metadata {
  const path = `/cupons/${coupon.slug}`;
  const socialImage = coupon.socialImage || coupon.brandLogo || '/images/logos/logo-em-casa-com-cecilia.png';
  const deliveredSocialImage = new URL(resolveMediaUrl(socialImage), SITE_URL).toString();
  const socialImageAlt = coupon.socialImageAlt || coupon.brandLogoAlt || 'Em Casa com Cecília';

  return {
    title: coupon.metaTitle,
    description: coupon.metaDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: coupon.metaTitle,
      description: coupon.metaDescription,
      url: path,
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

function getJsonLd(coupon: Coupon, copy: CouponStoreCopy) {
  const url = absoluteUrl(`/cupons/${coupon.slug}`);
  const offerType = getOfferType(coupon, copy);

  const offer = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: coupon.offerMode === 'discount-code'
      ? copy.offerName.code({ discount: coupon.discount, brand: coupon.brand, offerType, code: coupon.code })
      : copy.offerName.link(coupon.discount, coupon.brand),
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
      ? `${SITE_URL}${coupon.socialImage}`
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
    itemListElement: getBreadcrumb(coupon, copy).map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };

  return [webPage, offer, faq, breadcrumb];
}

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

// Só o Magalu tem faixas, e ele só existe em PT; o aviso explica a loja Magazine Você.
function MagazineVoceNotice({ storeUrl }: { storeUrl: string }) {
  return (
    <div className="mt-5 flex flex-col gap-3">
      <p className="rounded-xl border-2 border-laranja bg-laranja/10 px-4 py-3 text-sm leading-[21px]">
        <strong>Atenção:</strong> estes códigos da Cecília funcionam{' '}
        <strong>somente pelo navegador</strong>, na loja{' '}
        <a
          href={storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-bold underline underline-offset-2 wrap-anywhere ${FOCUS_RING}`}
        >
          {storeUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
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
  );
}

export function CouponStorePage({ coupon, locale }: { coupon: Coupon; locale: CouponStoreLocale }) {
  const copy: CouponStoreCopy = COUPON_STORE_COPY[locale];
  const formatLongDate = (isoDate: string) =>
    new Date(`${isoDate}T12:00:00`).toLocaleDateString(copy.dateLocale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  const formatShortDate = (isoDate: string) =>
    new Date(`${isoDate}T12:00:00`).toLocaleDateString(copy.dateLocale);

  const otherCoupons = getOtherActiveCoupons(coupon.slug);
  const jsonLd = getJsonLd(coupon, copy);
  const breadcrumb = getBreadcrumb(coupon, copy);
  const couponCodeOffer = coupon.offerMode === 'discount-code' ? coupon : null;
  const affiliateLinkOffer = coupon.offerMode === 'affiliate-link' ? coupon : null;
  const tiers = couponCodeOffer?.tiers?.length ? couponCodeOffer.tiers : null;
  const offerType = getOfferType(coupon, copy);
  const offerTypePlural =
    coupon.offerTypeLabelPlural || (couponCodeOffer ? copy.offerTypePlural.code : copy.offerTypePlural.link);
  const storeLabel = couponCodeOffer ? copy.goToStore : coupon.offerActionLabel || copy.viewOffer;
  const codeFieldLabel = couponCodeOffer?.codeFieldLabel || copy.defaultCodeField;
  const offerInstructions = couponCodeOffer
    ? couponCodeOffer.codeInstructions ||
      copy.instructions.code({ code: couponCodeOffer.code, brand: coupon.brand, discount: coupon.discount })
    : affiliateLinkOffer?.linkInstructions || copy.instructions.link(coupon.brand);
  const lastVerified = formatLongDate(coupon.lastVerified);
  const highlightDate = new Date(`${coupon.lastVerified}T12:00:00`);
  const highlightMonthYear = `${highlightDate.toLocaleDateString(copy.dateLocale, {
    month: 'long',
  })} ${highlightDate.getFullYear()}`;
  const firstTier = tiers?.[0];
  const lastTier = tiers?.[tiers.length - 1];
  const rules = [
    { icon: ShoppingBag, label: copy.rules.eligible, value: coupon.eligibleCategories },
    { icon: Layers, label: copy.rules.combinable, value: coupon.combinable },
    { icon: CalendarDays, label: copy.rules.validity, value: coupon.validity },
    { icon: Repeat, label: copy.rules.reusable, value: coupon.reusable },
    { icon: Truck, label: copy.rules.shipping, value: coupon.shipping },
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
            <nav aria-label={copy.breadcrumbLabel}>
              <ol className="flex flex-wrap items-center gap-1 text-[13px] font-bold leading-[18px]">
                {breadcrumb.map((item, index) => (
                  <Fragment key={item.path}>
                    {index > 0 && (
                      <li aria-hidden="true" className="flex">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </li>
                    )}
                    {index < breadcrumb.length - 1 ? (
                      <li>
                        <Link href={item.path} className={`flex min-h-11 items-center underline underline-offset-[3px] ${FOCUS_RING}`}>
                          {item.name}
                        </Link>
                      </li>
                    ) : (
                      <li aria-current="page">{item.name}</li>
                    )}
                  </Fragment>
                ))}
              </ol>
            </nav>

            <p className="mt-2 flex flex-col">
              <span className="text-base font-extrabold leading-[22px]">{coupon.brand}</span>
              <span className="text-[13px] font-semibold leading-[18px]">{coupon.category}</span>
            </p>

            <h1 className="mt-3.5 flex flex-col gap-0.5">
              <span className="font-condensada text-[30px] font-extrabold leading-8 font-stretch-condensed md:text-[40px] md:leading-[44px]">
                {copy.heroTitle(offerType, coupon.brand)}
              </span>{' '}
              <DiscountFigure discount={coupon.discount} size="hero" />
              {couponCodeOffer && (
                <>
                  {' '}
                  <span className="mt-1 text-[17px] font-extrabold leading-6 md:text-[22px] md:leading-8">
                    {copy.heroCode(couponCodeOffer.code)}
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
          aria-label={couponCodeOffer ? copy.cutoutLabel.code(offerType, coupon.brand) : copy.cutoutLabel.link(offerType, coupon.brand)}
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
                copiedStatus={copy.copiedAndOpenedStatus(couponCodeOffer.code)}
                className={`mt-3.5 ${PRIMARY_ACTION}`}
                copiedChildren={
                  <>
                    <Check aria-hidden="true" className="h-5 w-5 shrink-0" />
                    {copy.codeCopied}
                  </>
                }
              >
                {copy.copyAndGo}
                <ExternalLink aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
              </CopyAndOpenStoreLink>
              <CopyCodeButton
                code={couponCodeOffer.code}
                brand={coupon.brand}
                placement="coupon_page"
                copiedStatus={copy.copiedStatus(couponCodeOffer.code)}
                className={`mt-2.5 ${SECONDARY_ACTION}`}
                copiedChildren={
                  <>
                    <Check aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
                    {copy.copied}
                  </>
                }
              >
                <Copy aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
                {copy.copyOnly}
              </CopyCodeButton>
            </>
          )}

          {couponCodeOffer && tiers && firstTier && lastTier && (
            <>
              <p className="text-[15px] font-semibold leading-[22px]">
                {keepCurrencyTogether(copy.tiersSummary(tiers.length, firstTier, lastTier))}
              </p>
              <a href="#faixas-de-desconto" className={`mt-3.5 ${PRIMARY_ACTION}`}>
                {copy.chooseMyTier}
              </a>
              <CouponStoreLink
                href={coupon.offerUrl}
                couponCode={couponCodeOffer.code}
                brand={coupon.brand}
                placement="coupon_page"
                className={`mt-2.5 ${SECONDARY_ACTION}`}
              >
                {copy.goToStore}
                <ExternalLink aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
              </CouponStoreLink>
            </>
          )}

          {affiliateLinkOffer && (
            <>
              <p className="text-center text-[15px] font-bold leading-[22px]">{copy.noCodeToCopy}</p>
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
                  {copy.seeReferralCode}
                </a>
              )}
            </>
          )}

          <p className="mt-3.5 flex items-center justify-center gap-2 text-center text-[13px] font-bold leading-[18px] text-verde-escuro">
            <CircleCheck aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
            {copy.verifiedOn(lastVerified)}
          </p>
        </section>

        <div className="mt-10 flex flex-col gap-12 lg:col-start-1 lg:row-start-1 lg:mt-14 lg:gap-14">
          {coupon.monthlyHighlight && (
            <div className="rounded-xl border-2 border-marinho p-4 md:p-5">
              <p className="text-base font-extrabold leading-[22px]">
                {couponCodeOffer
                  ? copy.highlight.code({
                      offerType,
                      brand: coupon.brand,
                      code: couponCodeOffer.code,
                      discount: coupon.discount,
                      scope: coupon.monthlyHighlight.scope,
                      monthYear: highlightMonthYear,
                    })
                  : copy.highlight.link({
                      brand: coupon.brand,
                      discount: coupon.discount,
                      scope: coupon.monthlyHighlight.scope,
                      monthYear: highlightMonthYear,
                    })}
              </p>
              <p className="mt-2 text-sm font-medium leading-[21px] text-marinho-suave">
                {copy.highlight.note(coupon.monthlyHighlight.note)}
              </p>
            </div>
          )}

          {tiers && (
            <section aria-labelledby="faixas-de-desconto">
              <SectionHeading id="faixas-de-desconto">{copy.tiersTitle(coupon.brand)}</SectionHeading>
              <MagazineVoceNotice storeUrl={coupon.offerUrl} />
              <p className={`mt-4 ${BODY_TEXT}`}>{copy.tiersIntro}</p>
              {/* O código fica inteiro numa coluna própria; a rolagem só entra abaixo de ~330px. */}
              <div className="mt-4 overflow-x-auto rounded-xl border-2 border-marinho">
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">{copy.tiersCaption(coupon.brand)}</caption>
                  <thead className="bg-amarelo-cupom">
                    <tr className="border-b-2 border-marinho">
                      <th scope="col" className="px-3 py-2.5 text-[13px] font-extrabold leading-[18px]">
                        {copy.tiersHeaders.discount}
                      </th>
                      <th scope="col" className="px-3 py-2.5 text-[13px] font-extrabold leading-[18px]">
                        {copy.tiersHeaders.code}
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
                            {copy.tiersMinPurchase(keepCurrencyTogether(tier.minPurchase))}
                          </span>
                        </td>
                        <td className="w-px px-3 py-3 align-top">
                          <CopyCodeButton
                            code={tier.code}
                            brand={coupon.brand}
                            placement="coupon_page_tiers"
                            ariaLabel={copy.copyCodeAria(tier.code)}
                            copiedStatus={copy.copiedStatus(tier.code)}
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
            <SectionHeading id="regras">{copy.rulesTitle}</SectionHeading>
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
                    ariaLabel={copy.copyCodeAria(coupon.referral.code)}
                    copiedStatus={copy.copiedStatus(coupon.referral.code)}
                    className={`ml-auto flex min-h-11 items-center gap-2 rounded-lg border-2 border-marinho bg-laranja px-3.5 text-sm font-extrabold text-marinho data-[copied=true]:border-verde-escuro data-[copied=true]:bg-verde-escuro data-[copied=true]:text-white ${FOCUS_RING}`}
                    copiedChildren={
                      <>
                        <Check aria-hidden="true" className="h-[18px] w-[18px]" />
                        {copy.copied}
                      </>
                    }
                  >
                    <Copy aria-hidden="true" className="h-[18px] w-[18px]" />
                    {copy.copy}
                  </CopyCodeButton>
                </div>
                <p className="mt-3 text-sm font-medium leading-[21px] text-marinho-suave">{coupon.referral.instructions}</p>
                <p className="mt-2 text-xs font-semibold leading-4 text-marinho-suave">
                  {copy.referralVerified(formatShortDate(coupon.referral.verifiedAt))}
                </p>
              </div>
            </section>
          )}

          {coupon.campaigns && coupon.campaigns.length > 0 && (
            <section aria-labelledby="campanhas">
              <SectionHeading id="campanhas">{copy.campaignsTitle(coupon.brand)}</SectionHeading>
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
                      {copy.openCampaign(coupon.brand)}
                      <ExternalLink aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
                    </CouponStoreLink>
                    <p className="mt-3 text-[11px] font-semibold leading-4 text-marinho-suave">
                      {copy.campaignVerified(formatShortDate(campaign.verifiedAt))}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="como-usar">
            <SectionHeading id="como-usar">
              {couponCodeOffer
                ? copy.howToTitle.code(offerType, couponCodeOffer.code)
                : copy.howToTitle.link(coupon.brand)}
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
              {couponCodeOffer
                ? copy.codeFieldNote(<strong>{codeFieldLabel}</strong>)
                : affiliateLinkOffer?.linkNote || copy.defaultLinkNote}
            </p>
          </section>

          <section aria-labelledby="sobre">
            <SectionHeading id="sobre">{copy.aboutTitle(coupon.brand)}</SectionHeading>
            <p className={`mt-4 ${BODY_TEXT}`}>{coupon.aboutBrand}</p>
          </section>

          {coupon.relatedContent && coupon.relatedContent.length > 0 && (
            <section aria-labelledby="leia-antes">
              <SectionHeading id="leia-antes">{copy.relatedTitle}</SectionHeading>
              <div className="mt-5 grid gap-2.5 md:grid-cols-2">
                {coupon.relatedContent.map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    className={`flex items-center gap-3 rounded-xl border-2 border-marinho px-3.5 py-3 transition-colors hover:bg-creme ${FOCUS_RING}`}
                  >
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="text-xs font-extrabold leading-4 text-marinho-suave">
                        {copy.relatedType[item.type]} · {formatShortDate(item.publishedAt)}
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
                ? copy.faqTitle.code(offerTypePlural, coupon.brand)
                : copy.faqTitle.link(offerTypePlural, coupon.brand)}
            </SectionHeading>
            <div className="mt-5">
              <CouponFaq items={coupon.faqs} />
            </div>
          </section>

          {couponCodeOffer?.history && couponCodeOffer.history.length > 0 && (
            <section aria-labelledby="historico">
              <SectionHeading id="historico">{copy.historyTitle(coupon.brand)}</SectionHeading>
              <p className={`mt-4 ${BODY_TEXT}`}>
                {copy.historyIntro(<strong className="text-marinho">{couponCodeOffer.code}</strong>)}
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
            <SectionHeading id="outros-cupons">{copy.otherCouponsTitle}</SectionHeading>
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
          {copy.transparencyTitle}
        </h2>
        <p className="mt-1.5 max-w-[68ch] text-[13px] font-medium leading-5 text-marinho-suave">
          {couponCodeOffer
            ? copy.transparency.code(offerType, <strong className="text-marinho">{couponCodeOffer.code}</strong>)
            : copy.transparency.link}
        </p>
      </section>

      <CouponDock
        targetId="cupom"
        brand={coupon.brand}
        storeUrl={coupon.offerUrl}
        storeLabel={storeLabel}
        trackingCode={couponCodeOffer?.code}
        copyAction={
          couponCodeOffer && !tiers
            ? {
                code: couponCodeOffer.code,
                ariaLabel: copy.copyCodeAria(couponCodeOffer.code),
                copiedLabel: copy.copied,
                copiedStatus: copy.copiedStatus(couponCodeOffer.code),
              }
            : undefined
        }
        tiersAction={tiers ? { href: '#faixas-de-desconto', label: copy.chooseTier } : undefined}
      />
    </main>
  );
}
