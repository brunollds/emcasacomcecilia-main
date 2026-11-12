import type { Metadata } from 'next';
import Link from 'next/link';
import { CalendarDays, Check, Copy, ExternalLink, Layers, Play, Repeat, ShoppingBag, Truck } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { getCouponHubPath } from '@/lib/couponHub';
import { getCouponLanguageLinks, getCouponStorePath } from '@/lib/couponTranslations';
import { getOtherActiveCoupons, getPendingLimitedCodes, type Coupon } from '@/lib/couponsData';
import { LOCALES, LOCALE_KEYS, type Locale } from '@/lib/i18n/locales';
import { resolveMediaUrl } from '@/lib/resolve-media.mjs';
import ReviewInlineImage from '@/components/ReviewInlineImage';
import { getCouponMetaTitle, getCurrentOfferMonthDate } from '@/lib/offerMonth';
import { RevealSection } from '@/components/ui/RevealSection';
import { getShellHomeHref } from '@/lib/i18n/shellDictionary';
import { serializeJsonLd } from '@/lib/jsonLd';
import { SITE_NAME, SITE_ORGANIZATION_ID, SITE_WEBSITE_ID, absoluteUrl, getStoreSocialImage } from '@/lib/pageSeo';
import { CopyCodeButton, CouponDock } from './CouponActions';
import {
  BODY_TEXT,
  CouponFaq,
  DiscountFigure,
  FOCUS_RING,
  PRIMARY_ACTION,
  SECONDARY_ACTION,
  SectionHeading,
  couponFontVariables,
} from './CouponBlocks';
import { OtherCouponCard } from './CouponCards';
import { LimitedCodeNotices, LimitedCodePointers } from './LimitedCodeNotice';
import { StorePageBanners } from './StorePageBanners';
import { COUPON_STORE_COPY, type CouponStoreCopy } from './couponStoreCopy';
import {
  CompactCopyButton,
  CutoutCode,
  CutoutCodeActions,
  LanguageLinks,
  RelatedLink,
  RuleList,
  STORE_CUTOUT_ID,
  StepList,
  StoreBody,
  StoreContent,
  StoreCutout,
  StoreHero,
  StoreTransparency,
} from './StoreLayout';

const INLINE_LINK = `font-bold underline underline-offset-2 ${FOCUS_RING}`;

function getBreadcrumb(coupon: Coupon, locale: Locale, copy: CouponStoreCopy) {
  const store = { name: coupon.brand, path: getCouponStorePath(coupon.slug, locale) };
  if (locale !== 'pt') {
    return [
      { name: copy.homeLabel, path: getShellHomeHref(locale) },
      { name: copy.couponsLabel, path: getCouponHubPath(locale) },
      store,
    ];
  }

  return [{ name: copy.homeLabel, path: '/' }, { name: copy.couponsLabel, path: '/cupons' }, store];
}

// hreflang usa o código BCP 47 (pt-BR, zh-Hant), não a chave interna do locale.
function getHreflangAlternates(slug: string) {
  const links = getCouponLanguageLinks(slug);
  if (!links.en) return undefined;

  const languages: Record<string, string> = {};
  for (const locale of LOCALE_KEYS) {
    const path = links[locale];
    if (path) languages[LOCALES[locale].hreflang] = absoluteUrl(path);
  }
  // Como na YesStyle, quem não fala nenhum dos idiomas cai na versão em inglês.
  languages['x-default'] = absoluteUrl(links.en);
  return languages;
}

const getOfferType = (coupon: Coupon, copy: CouponStoreCopy) =>
  coupon.offerTypeLabel || (coupon.offerMode === 'discount-code' ? copy.offerType.code : copy.offerType.link);

export function getCouponStoreMetadata(coupon: Coupon, locale: Locale): Metadata {
  const path = getCouponStorePath(coupon.slug, locale);
  const image = getStoreSocialImage(coupon);
  const title = getCouponMetaTitle(coupon);

  return {
    title,
    description: coupon.metaDescription,
    alternates: {
      canonical: path,
      languages: getHreflangAlternates(coupon.slug),
    },
    openGraph: {
      title,
      description: coupon.metaDescription,
      url: path,
      locale: LOCALES[locale].openGraphLocale,
      siteName: SITE_NAME,
      type: 'article',
      images: [
        {
          url: image.url,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: coupon.metaDescription,
      images: [image.url],
    },
  };
}

// Um @graph só, com os nós ligados por @id: a página (WebPage) fala da oferta (mainEntity), da loja (about) e é do
// site (isPartOf, publisher). O Offer leva só vocabulário que o schema.org define para ele; o código e o desconto vão
// em additionalProperty, e a data de conferência fica no WebPage.
function getJsonLd(coupon: Coupon, locale: Locale, copy: CouponStoreCopy) {
  const url = absoluteUrl(getCouponStorePath(coupon.slug, locale));
  const offerType = getOfferType(coupon, copy);
  const ids = { page: `${url}#webpage`, offer: `${url}#offer`, store: `${url}#store`, faq: `${url}#faq`, breadcrumb: `${url}#breadcrumb` };

  const store = {
    '@type': 'Organization',
    '@id': ids.store,
    name: coupon.brand,
    url: coupon.officialUrl,
  };

  const offer = {
    '@type': 'Offer',
    '@id': ids.offer,
    name: coupon.offerMode === 'discount-code'
      ? copy.offerName.code({ discount: coupon.discount, brand: coupon.brand, offerType, code: coupon.code })
      : copy.offerName.link(coupon.discount, coupon.brand),
    description: coupon.longDescription,
    category: coupon.category,
    url,
    offeredBy: { '@id': ids.store },
    seller: { '@id': ids.store },
    additionalProperty: [
      ...(coupon.offerMode === 'discount-code'
        ? [{ '@type': 'PropertyValue', propertyID: 'couponCode', name: offerType, value: coupon.code }]
        : []),
      { '@type': 'PropertyValue', propertyID: 'discount', name: 'discount', value: coupon.discount },
    ],
  };

  const webPage = {
    '@type': 'WebPage',
    '@id': ids.page,
    name: getCouponMetaTitle(coupon),
    description: coupon.metaDescription,
    url,
    inLanguage: LOCALES[locale].htmlLang,
    isPartOf: { '@id': SITE_WEBSITE_ID },
    publisher: { '@id': SITE_ORGANIZATION_ID },
    about: { '@id': ids.store },
    mainEntity: { '@id': ids.offer },
    breadcrumb: { '@id': ids.breadcrumb },
    dateModified: coupon.lastVerified,
    // O teste de checkout é da equipe, por isso a revisão vai em nome do site, não de uma pessoa.
    ...(coupon.offerMode === 'discount-code' && coupon.testNote && coupon.testedAt
      ? { lastReviewed: coupon.testedAt, reviewedBy: { '@id': SITE_ORGANIZATION_ID } }
      : {}),
    // A mesma imagem do compartilhamento, pelo endereço de entrega.
    primaryImageOfPage: getStoreSocialImage(coupon).url,
  };

  const faq = {
    '@type': 'FAQPage',
    '@id': ids.faq,
    isPartOf: { '@id': ids.page },
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
    '@type': 'BreadcrumbList',
    '@id': ids.breadcrumb,
    itemListElement: getBreadcrumb(coupon, locale, copy).map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };

  return { '@context': 'https://schema.org', '@graph': [webPage, offer, store, faq, breadcrumb] };
}

// Evita "R$" no fim de uma linha e o valor no começo da seguinte.
const keepCurrencyTogether = (text: string) => text.replace(/R\$ /g, 'R$\u00a0');

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

export function CouponStorePage({ coupon, locale }: { coupon: Coupon; locale: Locale }) {
  const copy = COUPON_STORE_COPY[locale];
  const formatLongDate = (isoDate: string) =>
    new Date(`${isoDate}T12:00:00`).toLocaleDateString(copy.dateLocale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  const formatShortDate = (isoDate: string) =>
    new Date(`${isoDate}T12:00:00`).toLocaleDateString(copy.dateLocale, copy.shortDate);

  // As outras lojas só têm página em PT; fora dele a seção sairia com links e textos em português.
  const otherCoupons = locale === 'pt' ? getOtherActiveCoupons(coupon.slug) : [];
  const jsonLd = getJsonLd(coupon, locale, copy);
  const breadcrumb = getBreadcrumb(coupon, locale, copy);
  const couponCodeOffer = coupon.offerMode === 'discount-code' ? coupon : null;
  const affiliateLinkOffer = coupon.offerMode === 'affiliate-link' ? coupon : null;
  const tiers = couponCodeOffer?.tiers?.length ? couponCodeOffer.tiers : null;
  // O código com prazo existe só em PT e em loja sem faixas.
  const limitedCodes = locale === 'pt' && couponCodeOffer && !tiers ? getPendingLimitedCodes(couponCodeOffer) : [];
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
  const testedAt = couponCodeOffer?.testNote && couponCodeOffer.testedAt ? formatLongDate(couponCodeOffer.testedAt) : null;
  // As duas seções só existem onde o copy do idioma as tem (hoje, o português).
  const stackingCopy = copy.stacking;
  const stackingRows = stackingCopy && couponCodeOffer?.stacking?.length ? couponCodeOffer.stacking : null;
  const failedCopy = couponCodeOffer ? copy.failed : undefined;
  const videosCopy = copy.videos;
  const cartPrint = copy.cartPrint && coupon.cartPrint ? coupon.cartPrint : null;
  const videos = videosCopy && coupon.videos?.length ? coupon.videos : null;
  // O mês da oferta pelo calendário: do dia 20 em diante já vale o mês seguinte.
  const highlightDate = getCurrentOfferMonthDate();
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <StoreHero
        watermark={coupon.brandWatermark && resolveMediaUrl(coupon.brandWatermark)}
        breadcrumb={breadcrumb}
        breadcrumbLabel={copy.breadcrumbLabel}
        brand={coupon.brand}
        category={coupon.category}
        titleLead={copy.heroTitle(offerType, coupon.brand)}
        titleFigure={<DiscountFigure discount={coupon.discount} size="hero" />}
        titleEnd={couponCodeOffer ? copy.heroCode(couponCodeOffer.code) : undefined}
        intro={coupon.longDescription}
      />

      <StoreBody>
        <StoreCutout
          label={couponCodeOffer ? copy.cutoutLabel.code(offerType, coupon.brand) : copy.cutoutLabel.link(offerType, coupon.brand)}
          // O código da parceria vale enquanto ela durar; a data do teste no carrinho fica em "Como testamos".
          verified={testedAt ? coupon.validity : copy.verifiedOn(lastVerified)}
          copyable={Boolean(couponCodeOffer && !tiers)}
          footer={limitedCodes.length > 0 ? <LimitedCodePointers items={limitedCodes} /> : undefined}
        >
          {couponCodeOffer && !tiers && (
            <>
              <CutoutCode code={couponCodeOffer.code} />
              <CutoutCodeActions code={couponCodeOffer.code} brand={coupon.brand} href={coupon.offerUrl} copy={copy} />
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
        </StoreCutout>

        <StoreContent>
          <LanguageLinks links={getCouponLanguageLinks(coupon.slug)} current={locale} label={copy.otherLanguagesLabel} />

          {couponCodeOffer && limitedCodes.length > 0 && (
            <LimitedCodeNotices
              items={limitedCodes}
              brand={coupon.brand}
              regularCode={couponCodeOffer.code}
              regularDiscount={couponCodeOffer.discount}
              copy={copy}
            />
          )}

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
                {coupon.monthlyHighlight.showCheckoutReminder === false
                  ? `${coupon.monthlyHighlight.note}.`
                  : copy.highlight.note(coupon.monthlyHighlight.note)}
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

          <StorePageBanners affiliate={coupon.slug} brand={coupon.brand} locale={locale} />

          <section aria-labelledby="regras">
            <SectionHeading id="regras">{copy.rulesTitle}</SectionHeading>
            <RuleList rules={rules} />
            {stackingCopy && stackingRows && (
              <p className={`mt-4 ${BODY_TEXT}`}>
                <a href="#o-que-acumula" className={INLINE_LINK}>
                  {stackingCopy.rulesPointer}
                </a>
                .
              </p>
            )}
          </section>

          {stackingCopy && stackingRows && (
            <section aria-labelledby="o-que-acumula">
              <SectionHeading id="o-que-acumula">{stackingCopy.title}</SectionHeading>
              {/* Abaixo do md, três colunas não cabem: cada linha vira benefício e resposta lado a lado, com a
                  condição embaixo na largura toda. Os roles seguram a tabela para o leitor de tela, porque o
                  display: grid na linha tira a semântica em alguns navegadores. */}
              <div className="mt-4 overflow-hidden rounded-xl border-2 border-marinho">
                <table role="table" className="block w-full border-collapse text-left md:table">
                  <caption className="sr-only">{stackingCopy.caption(coupon.brand)}</caption>
                  <thead role="rowgroup" className="bg-amarelo-cupom max-md:sr-only">
                    <tr role="row" className="border-b-2 border-marinho">
                      {[stackingCopy.headers.benefit, stackingCopy.headers.stacks, stackingCopy.headers.condition].map((header) => (
                        <th key={header} role="columnheader" scope="col" className="px-3 py-2.5 text-[13px] font-extrabold leading-[18px]">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody role="rowgroup" className="block md:table-row-group">
                    {stackingRows.map((row, index) => (
                      <tr
                        key={row.benefit}
                        role="row"
                        className={`grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 px-3 py-3 md:table-row md:p-0 ${index > 0 ? 'border-t-2 border-marinho/15' : ''}`}
                      >
                        <th role="rowheader" scope="row" className="min-w-0 align-top text-[15px] font-extrabold leading-[22px] md:px-3 md:py-3">
                          {row.label ?? stackingCopy.benefits[row.benefit]}
                        </th>
                        <td role="cell" className="align-top text-[15px] font-bold leading-[22px] md:px-3 md:py-3">
                          {stackingCopy.answers[row.stacks]}
                        </td>
                        <td
                          role="cell"
                          className="col-span-2 min-w-0 align-top text-[15px] font-medium leading-[22px] text-marinho-suave md:min-w-[11rem] md:px-3 md:py-3"
                        >
                          {row.condition}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {coupon.referral && (
            <section aria-labelledby="indicacao">
              <SectionHeading id="indicacao">{coupon.referral.label}</SectionHeading>
              <div className="recorte mt-5 rounded-xl border-2 border-dashed border-marinho p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <code className="font-codigo text-[26px] font-extrabold tracking-[0.06em]">{coupon.referral.code}</code>
                  <CompactCopyButton
                    code={coupon.referral.code}
                    brand={coupon.brand}
                    ariaLabel={copy.copyCodeAria(coupon.referral.code)}
                    copy={copy}
                  />
                </div>
                <p className="mt-3 text-sm font-medium leading-[21px] text-marinho-suave">{coupon.referral.instructions}</p>
                <p className="mt-2 text-xs font-semibold leading-4 text-marinho-suave">
                  {copy.referralVerified(formatShortDate(coupon.referral.verifiedAt))}
                </p>
              </div>
            </section>
          )}

          <section aria-labelledby="como-usar">
            <SectionHeading id="como-usar">
              {couponCodeOffer
                ? copy.howToTitle.code(offerType, couponCodeOffer.code)
                : copy.howToTitle.link(coupon.brand)}
            </SectionHeading>
            <StepList
              steps={offerInstructions}
              note={
                couponCodeOffer
                  ? copy.codeFieldNote(<strong>{codeFieldLabel}</strong>)
                  : affiliateLinkOffer?.linkNote || copy.defaultLinkNote
              }
            />
            {copy.cartPrint && cartPrint && (
              <div data-cart-print className="mt-5">
                {/* Print alto (resumo de pedido no celular) não ocupa a tela toda: a largura cai até a altura caber em ~420px. */}
                <div className="mx-auto" style={{ maxWidth: Math.max(200, Math.round(420 * cartPrint.aspectRatio)) }}>
                  <ReviewInlineImage
                    locale={locale}
                    reviewTitle={coupon.brand}
                    // O componente é JS e o tipo inferido exige as três; aqui não há loja de artigo.
                    store={undefined}
                    stores={undefined}
                    reviewSlug={undefined}
                    section={{
                      // O componente é de cliente e não resolve o caminho: o endereço de entrega (CDN) sai daqui, como nos artigos.
                      image: { src: resolveMediaUrl(cartPrint.src), alt: cartPrint.alt, aspectRatio: cartPrint.aspectRatio, objectFit: 'contain' },
                    }}
                  />
                </div>
                <p className={`mt-3 ${BODY_TEXT}`}>
                  {copy.cartPrint.caption}
                  {cartPrint.article && (
                    <>
                      {' '}
                      <Link href={`/reviews/${cartPrint.article}`} className={INLINE_LINK}>
                        {copy.cartPrint.stepsLabel}
                      </Link>
                      .
                    </>
                  )}
                </p>
              </div>
            )}
          </section>

          {testedAt && (
            <section aria-labelledby="como-testamos">
              <SectionHeading id="como-testamos">{copy.testTitle}</SectionHeading>
              <p className={`mt-4 ${BODY_TEXT}`}>
                <strong>{copy.testedBy(testedAt)}</strong> {couponCodeOffer?.testNote}
              </p>
              {copy.testFooter && (
                <p className={`mt-3 ${BODY_TEXT}`} data-coupon="metodo">
                  <Link href={copy.testFooter.methodHref} className={INLINE_LINK}>
                    {copy.testFooter.methodLabel}
                  </Link>
                  .
                </p>
              )}
            </section>
          )}

          {failedCopy && (
            <section aria-labelledby="nao-funcionou">
              <SectionHeading id="nao-funcionou">{failedCopy.title}</SectionHeading>
              <ul className={`mt-4 list-disc space-y-2 pl-5 ${BODY_TEXT}`}>
                <li>{failedCopy.field(codeFieldLabel)}</li>
                <li>{failedCopy.eligible(coupon.eligibleCategories)}</li>
                <li>
                  {failedCopy.otherBenefit}
                  {stackingRows && (
                    <>
                      {' '}
                      <a href="#o-que-acumula" className={INLINE_LINK}>
                        {failedCopy.stackingLinkLabel}
                      </a>
                      .
                    </>
                  )}
                </li>
              </ul>
              <p className={`mt-3 ${BODY_TEXT}`}>
                {failedCopy.reportPrompt}{' '}
                <Link href={failedCopy.reportHref} className={INLINE_LINK}>
                  {failedCopy.reportLabel}
                </Link>
                .
              </p>
            </section>
          )}

          <section aria-labelledby="sobre">
            <SectionHeading id="sobre">{copy.aboutTitle(coupon.brand)}</SectionHeading>
            <p className={`mt-4 ${BODY_TEXT}`}>{coupon.aboutBrand}</p>
          </section>

          {coupon.relatedContent && coupon.relatedContent.length > 0 && (
            <section aria-labelledby="leia-antes">
              <SectionHeading id="leia-antes">{copy.relatedTitle}</SectionHeading>
              <div className="mt-5 grid gap-2.5 md:grid-cols-2">
                {coupon.relatedContent.map((item) => (
                  <RelatedLink key={item.url} href={item.url}>
                    <span className="text-xs font-extrabold leading-4 text-marinho-suave">
                      {copy.relatedType[item.type]} · {formatShortDate(item.publishedAt)}
                    </span>
                    <span className="text-[15px] font-bold leading-[21px]">{item.title}</span>
                  </RelatedLink>
                ))}
              </div>
            </section>
          )}

          {videosCopy && videos && (
            <section aria-labelledby="videos">
              <SectionHeading id="videos">{videosCopy.title}</SectionHeading>
              <ul className="mt-5 grid gap-2.5 md:grid-cols-2">
                {videos.map((video) => (
                  <li key={video.url}>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex h-full items-center gap-3 rounded-xl border-2 border-marinho px-3.5 py-3 transition-colors hover:bg-creme ${FOCUS_RING}`}
                    >
                      <Play aria-hidden="true" className="h-5 w-5 shrink-0" />
                      <span className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="text-xs font-extrabold leading-4 text-marinho-suave">
                          {videosCopy.watchOn(videosCopy.platforms[video.platform])}
                          <span className="sr-only"> ({videosCopy.newTab})</span>
                        </span>
                        <span className="text-[15px] font-bold leading-[21px]">{video.title}</span>
                      </span>
                      <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="perguntas">
            <SectionHeading id="perguntas">
              {couponCodeOffer
                ? copy.faqTitle.code(offerTypePlural, coupon.brand)
                : copy.faqTitle.link(offerTypePlural, coupon.brand)}
            </SectionHeading>
            <div className="mt-5">
              <CouponFaq items={coupon.faqs} brand={coupon.brand} />
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
        </StoreContent>
      </StoreBody>

      {otherCoupons.length > 0 && (
        <RevealSection aria-labelledby="outros-cupons" className="mx-auto mt-14 max-w-6xl md:px-8">
          <div className="px-4 md:px-0">
            <SectionHeading id="outros-cupons">{copy.otherCouponsTitle}</SectionHeading>
          </div>
          {/* No celular a fila rola para o lado e por isso corta: o pt-4 dá lugar ao ímã e o pb-3, à sombra do
              hover. O gap-x-4 e o md:gap-y-6 afastam o ímã do cartão ao lado e do de cima. */}
          <div className="hide-scrollbar mt-5 flex snap-x snap-mandatory scroll-px-4 gap-x-4 overflow-x-auto px-4 pb-3 max-md:pt-4 md:grid md:grid-cols-3 md:gap-y-6 md:overflow-visible md:px-0 lg:grid-cols-4">
            {otherCoupons.map((otherCoupon, index) => (
              <OtherCouponCard key={otherCoupon.slug} coupon={otherCoupon} index={index} />
            ))}
          </div>
        </RevealSection>
      )}

      <StoreTransparency title={copy.transparencyTitle}>
        {couponCodeOffer
          ? copy.transparency.code(offerType, <strong className="text-marinho">{couponCodeOffer.code}</strong>)
          : copy.transparency.link}
      </StoreTransparency>

      <CouponDock
        targetId={STORE_CUTOUT_ID}
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
