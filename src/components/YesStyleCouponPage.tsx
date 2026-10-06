import { ExternalLink } from 'lucide-react';
import { CouponBottomBar } from '@/components/CouponBottomBar';
import { AmountFigure, BODY_TEXT, CouponFaq, FOCUS_RING, SectionHeading, couponFontVariables } from '@/components/coupons/CouponBlocks';
import { COUPON_STORE_COPY } from '@/components/coupons/couponStoreCopy';
import {
  CompactCopyButton,
  CutoutCode,
  CutoutCodeActions,
  LanguageLinks,
  RelatedLink,
  StepList,
  StoreBody,
  StoreContent,
  StoreCutout,
  StoreHero,
  StoreTransparency,
} from '@/components/coupons/StoreLayout';
import { getYesStyleBreadcrumbItems, resolveYesStylePage } from '@/components/coupons/yesstylePage';
import { getCouponBySlug } from '@/lib/couponsData';
import { getHubLanguageLinks } from '@/lib/i18n/clusters/yesstyle';

// As rotas dos 10 idiomas importam daqui a página e os metadados.
export { getYesStyleMetadata } from '@/components/coupons/yesstylePage';

export function YesStyleCouponPage({ locale }: { locale: string }) {
  const resolved = resolveYesStylePage(locale);
  if (!resolved) return null;

  // Botões, trilha e notas de rodapé usam os mesmos textos das outras páginas de loja.
  const ui = COUPON_STORE_COPY[resolved.locale];
  const breadcrumbItems = getYesStyleBreadcrumbItems(resolved.locale, resolved.canonicalUrl, resolved.homeLabel, resolved.couponsLabel);

  // Schemas JSON-LD B2
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: resolved.title,
    description: resolved.description,
    url: resolved.canonicalUrl,
    inLanguage: resolved.htmlLang,
    dateModified: resolved.verifiedAtISO,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((b, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: b.name,
      item: b.item,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: resolved.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <main lang={resolved.htmlLang} className={`${couponFontVariables} min-h-screen bg-white pb-24 text-marinho lg:pb-0`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <StoreHero
        watermark={getCouponBySlug('yesstyle')?.brandWatermark}
        breadcrumb={breadcrumbItems.map(({ name, item }) => ({ name, path: new URL(item).pathname }))}
        breadcrumbLabel={ui.breadcrumbLabel}
        brand="YesStyle"
        category={resolved.category}
        titleLead={resolved.heroTitle.lead}
        titleFigure={
          <AmountFigure
            size="hero"
            prefix={resolved.heroTitle.prefix}
            value={String(resolved.newCustomerDiscount)}
            unit="%"
            suffix={resolved.heroTitle.suffix}
          />
        }
        intro={resolved.intro}
      />

      <StoreBody>
        <StoreCutout label={resolved.rewardCodeLabel} verified={ui.verifiedOn(resolved.formattedDate)}>
          <p className="text-center text-[13px] font-extrabold leading-[18px]">{resolved.rewardCodeLabel}</p>
          <CutoutCode code={resolved.rewardCode} />
          <p className="mt-0.5 text-center text-sm font-semibold leading-5 text-marinho-suave">{resolved.rewardFieldNote}</p>
          {/* Quanto o código dá em cada compra: o desconto muda da primeira para as seguintes. */}
          <dl className="mt-3.5 grid grid-cols-2 divide-x-2 divide-marinho/15 rounded-xl border-2 border-marinho/15 text-center">
            {[resolved.firstOrder, resolved.nextOrders].map(({ label, discount }) => (
              <div key={label} className="px-2 py-2">
                <dt className="text-xs font-bold leading-4 text-marinho-suave">{label}</dt>
                <dd className="mt-0.5 font-condensada text-[32px] font-black leading-none font-stretch-extra-condensed">{discount}</dd>
              </div>
            ))}
          </dl>
          <CutoutCodeActions code={resolved.rewardCode} brand="YesStyle" href={resolved.affiliateUrl} copy={ui} />
        </StoreCutout>

        <StoreContent>
          <LanguageLinks links={getHubLanguageLinks()} current={resolved.locale} label={ui.otherLanguagesLabel} />

          <section aria-labelledby="cupons-da-loja">
            <SectionHeading id="cupons-da-loja">{resolved.promosSectionTitle}</SectionHeading>
            <p className={`mt-4 ${BODY_TEXT}`}>{resolved.promosIntro}</p>
            {resolved.activePromoOffers.length > 0 ? (
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {resolved.activePromoOffers.map((promo) => (
                  <article key={promo.id} className="flex flex-col rounded-xl border-2 border-dashed border-marinho p-4">
                    <p className="font-condensada text-[40px] font-black leading-none font-stretch-extra-condensed">{promo.discountLabel}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <code className="font-codigo text-[26px] font-extrabold tracking-[0.06em]">{promo.code}</code>
                      <CompactCopyButton code={promo.code} brand="YesStyle" ariaLabel={promo.copyAria} copy={ui} />
                    </div>
                    <dl className="mt-3 grid grid-cols-2 gap-3 border-t-2 border-marinho/15 pt-3">
                      <div>
                        <dt className="text-xs font-bold leading-4 text-marinho-suave">{resolved.promoLabels.validity}</dt>
                        <dd className="mt-0.5 text-sm font-extrabold leading-5">{promo.validityLabel}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold leading-4 text-marinho-suave">{resolved.promoLabels.region}</dt>
                        <dd className="mt-0.5 text-sm font-extrabold leading-5">{promo.regionLabel}</dd>
                      </div>
                    </dl>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 text-[13px] font-bold leading-[18px]">
                      <p className="text-verde-escuro">{ui.verifiedOn(promo.formattedVerifiedDate)}</p>
                      <a
                        href={promo.officialSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex min-h-11 items-center gap-1.5 underline underline-offset-[3px] ${FOCUS_RING}`}
                      >
                        {resolved.proofLabel}
                        <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-xl border-2 border-dashed border-marinho p-4">
                <p className="text-base font-extrabold leading-[22px]">{resolved.emptyPromosNotice}</p>
                <p className="mt-1.5 text-sm font-medium leading-[21px] text-marinho-suave">{resolved.emptyPromosSubtext}</p>
              </div>
            )}
          </section>

          <section aria-labelledby="como-usar">
            <SectionHeading id="como-usar">{resolved.instructionsTitle}</SectionHeading>
            <StepList steps={resolved.instructions} note={resolved.note} />
          </section>

          <section aria-labelledby="leia-antes">
            <SectionHeading id="leia-antes">{resolved.relatedContentTitle}</SectionHeading>
            <div className="mt-5 grid gap-2.5 md:grid-cols-2">
              {[
                { href: resolved.rewardArticlePath, title: resolved.rewardArticleCardTitle, subtext: resolved.rewardArticleCardSubtext },
                { href: resolved.guidePath, title: resolved.guideCardTitle, subtext: resolved.guideCardSubtext },
              ].map(({ href, title, subtext }) => (
                <RelatedLink key={href} href={href}>
                  <span className="text-[15px] font-bold leading-[21px]">{title}</span>
                  <span className="text-xs font-extrabold leading-4 text-marinho-suave">{subtext}</span>
                </RelatedLink>
              ))}
            </div>
          </section>

          <section aria-labelledby="perguntas">
            <SectionHeading id="perguntas">{resolved.faqTitle}</SectionHeading>
            <div className="mt-5">
              <CouponFaq items={resolved.faqs} />
            </div>
          </section>
        </StoreContent>
      </StoreBody>

      <StoreTransparency title={ui.transparencyTitle}>{resolved.transparency}</StoreTransparency>

      <CouponBottomBar coupon={resolved.rewardCode} cta={{ url: resolved.affiliateUrl, label: resolved.visit }} locale={resolved.locale} />
    </main>
  );
}
