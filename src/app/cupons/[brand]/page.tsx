import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CopyButton, CouponPillCard, FAQAccordion, CouponStoreLink } from '@/components/CouponComponents';
import { CouponBottomBar } from '@/components/CouponBottomBar';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import {
  getAllActiveCouponSlugs,
  getCouponBySlug,
  getOtherActiveCoupons,
} from '@/lib/couponsData';

export function generateStaticParams() {
  return getAllActiveCouponSlugs().map((brand) => ({ brand }));
}

export const dynamicParams = true;

type CouponBrandPageProps = {
  params: Promise<{ brand: string }>;
};

export async function generateMetadata({ params }: CouponBrandPageProps): Promise<Metadata> {
  const { brand } = await params;
  const coupon = getCouponBySlug(brand);
  if (!coupon) return {};
  const socialImage = coupon.socialImage || coupon.brandLogo || '/images/logos/logo-em-casa-com-cecilia.png';
  const socialImageAlt = coupon.socialImageAlt || coupon.brandLogoAlt || 'Em Casa com Cecília';

  return {
    title: coupon.metaTitle,
    description: coupon.metaDescription,
    alternates: {
      canonical: `/cupons/${coupon.slug}`,
      ...(coupon.slug === 'yesstyle' ? {
        languages: {
          'pt-BR': 'https://emcasacomcecilia.com/cupons/yesstyle',
          en: 'https://emcasacomcecilia.com/reviews/yesstyle-reward-code-coupon-cecilia010',
          es: 'https://emcasacomcecilia.com/reviews/codigo-de-recompensa-yesstyle-cupon-cecilia010',
          fr: 'https://emcasacomcecilia.com/reviews/code-recompense-yesstyle-cecilia010',
          de: 'https://emcasacomcecilia.com/reviews/yesstyle-reward-code-rabatt-cecilia010',
          ko: 'https://emcasacomcecilia.com/reviews/yesstyle-reward-code-cecilia010-ko',
          ja: 'https://emcasacomcecilia.com/reviews/yesstyle-reward-code-cecilia010-ja',
          'zh-Hant': 'https://emcasacomcecilia.com/reviews/yesstyle-reward-code-cecilia010-zh-hant',
          'zh-Hans': 'https://emcasacomcecilia.com/reviews/yesstyle-reward-code-cecilia010-zh-hans',
          'x-default': 'https://emcasacomcecilia.com/reviews/yesstyle-reward-code-coupon-cecilia010',
        },
      } : {}),
    },
    openGraph: {
      title: coupon.metaTitle,
      description: coupon.metaDescription,
      url: `/cupons/${coupon.slug}`,
      type: 'article',
      images: [
        {
          url: socialImage,
          alt: socialImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: coupon.metaTitle,
      description: coupon.metaDescription,
      images: [socialImage],
    },
  };
}

function getJsonLd(coupon: NonNullable<ReturnType<typeof getCouponBySlug>>) {
  const url = `https://emcasacomcecilia.com/cupons/${coupon.slug}`;
  const offerType = coupon.offerTypeLabel || 'cupom';

  const offer = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: `${coupon.discount} na ${coupon.brand} com ${offerType} ${coupon.code}`,
    description: coupon.longDescription,
    category: coupon.category,
    priceCurrency: 'BRL',
    discount: `${coupon.discountNumber}`,
    offeredBy: {
      '@type': 'Organization',
      name: coupon.brand,
      url: coupon.brandUrl,
    },
    seller: {
      '@type': 'Organization',
      name: coupon.brand,
      url: coupon.brandUrl,
    },
    dateModified: coupon.lastVerified,
    url,
    couponCode: coupon.code,
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

export default async function CouponBrandPage({ params }: CouponBrandPageProps) {
  const { brand } = await params;
  const coupon = getCouponBySlug(brand);
  if (!coupon) notFound();

  const otherCoupons = getOtherActiveCoupons(coupon.slug);
  const jsonLd = getJsonLd(coupon);
  const offerType = coupon.offerTypeLabel || 'cupom';
  const offerTypePlural = coupon.offerTypeLabelPlural || 'cupons';
  const offerAction = coupon.offerActionLabel || `economizar ${coupon.discount}`;
  const codeFieldLabel = coupon.codeFieldLabel || 'campo de cupom/desconto';
  const codeInstructions = coupon.codeInstructions || [
    `Copie o código ${coupon.code} no card acima.`,
    `Acesse a loja ${coupon.brand} pelo botão indicado.`,
    'Adicione os produtos desejados ao carrinho.',
    'Cole o código no campo de cupom/desconto antes de finalizar.',
    `Confira se o desconto de ${coupon.discount} apareceu no resumo do pedido.`,
  ];
  const lastVerified = new Date(`${coupon.lastVerified}T12:00:00`).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const highlightDate = new Date(`${coupon.lastVerified}T12:00:00`);
  const highlightMonthYear = `${highlightDate.toLocaleDateString('pt-BR', {
    month: 'long',
  })} ${highlightDate.getFullYear()}`;
  const heroGradient = `linear-gradient(135deg, ${coupon.brandColor} 0%, #862f0e 100%)`;

  return (
    <main className="min-h-screen bg-[#fef9f3] pb-24 lg:pb-0">
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="bg-[#0f1d3a] px-4 py-12 text-white md:py-16">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/55">
            <Link href="/" className="hover:text-white">Início</Link>
            <span className="mx-2 opacity-40">/</span>
            <Link href="/cupons" className="hover:text-white">Cupons</Link>
            <span className="mx-2 opacity-40">/</span>
            <span className="text-white">{coupon.brand}</span>
          </nav>

          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            {coupon.brandLogo && (
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/14 bg-white p-2 shadow-xl shadow-black/15">
                <Image
                  src={coupon.brandLogo}
                  alt={coupon.brandLogoAlt || `Marca ${coupon.brand}`}
                  fill
                  sizes="80px"
                  className="object-contain p-2"
                  priority
                />
              </div>
            )}
            <div>
              <h1 className="font-heading text-3xl font-black leading-tight tracking-[-0.03em] md:text-5xl">
                {offerType.charAt(0).toUpperCase() + offerType.slice(1)} {coupon.brand}: {coupon.discount} com {coupon.code}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/78">
                {coupon.longDescription}
              </p>
              <p className="mt-4 text-xs text-white/55">
                Atualizado em {lastVerified}. Confira o desconto no checkout antes de finalizar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {coupon.slug === 'yesstyle' && (
        <section className="px-4 pt-8">
          <div className="mx-auto max-w-5xl">
            <LanguageSwitcher
              currentLocale="pt"
              links={{
                pt: '/cupons/yesstyle',
                en: '/reviews/yesstyle-reward-code-coupon-cecilia010',
                es: '/reviews/codigo-de-recompensa-yesstyle-cupon-cecilia010',
                fr: '/reviews/code-recompense-yesstyle-cecilia010',
                de: '/reviews/yesstyle-reward-code-rabatt-cecilia010',
                ko: '/reviews/yesstyle-reward-code-cecilia010-ko',
                ja: '/reviews/yesstyle-reward-code-cecilia010-ja',
                'zh-hant': '/reviews/yesstyle-reward-code-cecilia010-zh-hant',
                'zh-hans': '/reviews/yesstyle-reward-code-cecilia010-zh-hans',
              }}
            />
          </div>
        </section>
      )}

      {coupon.monthlyHighlight && (
        <section className="px-4 pt-8">
          <div className="mx-auto max-w-5xl rounded-2xl border border-[#ff6b35]/30 bg-white px-5 py-4 shadow-soft">
            <p className="font-heading text-lg font-black text-[#0f1419]">
              {offerType.charAt(0).toUpperCase() + offerType.slice(1)} {coupon.brand} atualizado: {coupon.code} — {coupon.discount} {coupon.monthlyHighlight.scope} ({highlightMonthYear}).
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#0f1419]/70">
              {coupon.monthlyHighlight.note}. Confirme o desconto no checkout antes de finalizar.
            </p>
          </div>
        </section>
      )}

      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div
            className="relative overflow-hidden rounded-[2rem] p-7 text-white shadow-large md:p-10"
            style={{ background: heroGradient }}
          >
            <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-white/16 blur-3xl" />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3">
                {coupon.brandLogo && (
                  <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/20 bg-white shadow-lg shadow-black/10">
                    <Image
                      src={coupon.brandLogo}
                      alt={coupon.brandLogoAlt || `Marca ${coupon.brand}`}
                      fill
                      sizes="48px"
                      className="object-contain p-1.5"
                    />
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#862f0e]">
                    {coupon.brand} · {offerType} ativo
                  </span>
                  <span className="rounded-full bg-[#ffd23f] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#4a2400]">
                    {coupon.discount}
                  </span>
                </div>
              </div>

              <p className="mt-6 font-mono text-4xl font-black tracking-[0.08em] md:text-6xl">
                {coupon.code}
              </p>
              <h2 className="mt-4 font-heading text-2xl font-black leading-tight">
                {coupon.shortDescription}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/86 md:text-base">
                {coupon.longDescription}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <CopyButton
                  code={coupon.code}
                  label={`Copiar e ${offerAction}`}
                  brand={coupon.brand}
                />
                <CouponStoreLink
                  href={coupon.brandUrl}
                  label="Ir para a loja"
                  couponCode={coupon.code}
                  brand={coupon.brand}
                  placement="coupon_page"
                  className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-black text-[#0f1419]">
            Detalhes do {offerType} {coupon.code}
          </h2>
          <dl className="mt-6 divide-y divide-black/8 rounded-2xl border border-black/8">
            <DetailRow label="Código" value={coupon.code} mono />
            <DetailRow label="Desconto" value={coupon.discount} />
            <DetailRow label="Loja" value={coupon.brand} />
            <DetailRow label="Abrangência" value={coupon.eligibleCategories} />
            <DetailRow label="Validade" value={coupon.validity} />
            <DetailRow label="Reusável" value={coupon.reusable} />
            <DetailRow label="Cumulativo" value={coupon.combinable} />
            <DetailRow label="Frete" value={coupon.shipping} />
            <DetailRow label="Última verificação" value={lastVerified} />
          </dl>

          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">
            Como aplicar o {offerType} {coupon.code} na {coupon.brand}
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-relaxed text-[#0f1419]/78">
            {codeInstructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ol>
          <p className="mt-4 rounded-2xl border border-[#ff6b35]/25 bg-[#fff7ed] px-4 py-3 text-sm leading-relaxed text-[#7c2d12]">
            Campo correto: <strong>{codeFieldLabel}</strong>. Confirme sempre o resumo do pedido antes de pagar.
          </p>

          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">
            Sobre a {coupon.brand}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#0f1419]/78">
            {coupon.aboutBrand}
          </p>

          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">
            Perguntas frequentes sobre {offerTypePlural} {coupon.brand}
          </h2>
          <div className="mt-4">
            <FAQAccordion items={coupon.faqs} />
          </div>

          {coupon.history && coupon.history.length > 0 && (
            <>
              <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">
                Histórico de cupons da {coupon.brand}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#0f1419]/78">
                Cupons anteriores já usados nessa parceria. O cupom ativo atual é{' '}
                <strong>{coupon.code}</strong>.
              </p>
              <ul className="mt-4 space-y-3">
                {coupon.history.map((item) => (
                  <li
                    key={`${item.date}-${item.code}`}
                    className="flex flex-wrap items-center gap-3 rounded-xl bg-[#fef9f3] px-4 py-3 text-sm"
                  >
                    <span className="text-xs font-semibold text-[#0f1419]/54">{item.date}</span>
                    <code className="rounded bg-white px-2 py-0.5 font-mono text-xs font-black text-[#0f1419]">
                      {item.code}
                    </code>
                    <span className="font-bold text-[#0f1419]">{item.discount}</span>
                    {item.note && <span className="text-[#0f1419]/62">{item.note}</span>}
                  </li>
                ))}
              </ul>
            </>
          )}

          {coupon.relatedContent && coupon.relatedContent.length > 0 && (
            <>
              <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">
                Conteúdo relacionado da {coupon.brand}
              </h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {coupon.relatedContent.map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    className="rounded-2xl border border-black/8 bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-[#ff6b35]/35 hover:shadow-md"
                  >
                    <p className="text-sm font-bold text-[#0f1419]">{item.title}</p>
                    <p className="mt-1 text-xs text-[#0f1419]/55">
                      {item.type === 'review' ? 'Review' : 'Post'} ·{' '}
                      {new Date(item.publishedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </a>
                ))}
              </div>
            </>
          )}

          {otherCoupons.length > 0 && (
            <>
              <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">
                Outros cupons ativos
              </h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {otherCoupons.map((otherCoupon) => (
                  <CouponPillCard
                    key={otherCoupon.slug}
                    brand={otherCoupon.brand}
                    brandIcon={otherCoupon.brandIcon}
                    brandLogo={otherCoupon.brandLogo}
                    brandLogoAlt={otherCoupon.brandLogoAlt}
                    code={otherCoupon.code}
                    shortDescription={otherCoupon.shortDescription}
                    discount={otherCoupon.discount}
                    href={`/cupons/${otherCoupon.slug}`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="mt-14 rounded-2xl bg-[#fef9f3] p-6">
            <h2 className="font-heading text-xl font-black text-[#0f1419]">Transparência</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#0f1419]/68">
              Esta página pode conter links de afiliado. Quando você compra usando o {offerType}{' '}
              <strong>{coupon.code}</strong> ou acessa a loja pelo link indicado, o Em Casa com Cecília
              pode receber comissão da marca, sem custo extra para você.
            </p>
          </div>
        </div>
      </article>

      <CouponBottomBar
        coupon={coupon.code}
        cta={{ url: coupon.brandUrl, label: 'Usar na loja' }}
      />
    </main>
  );
}

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 md:flex-row md:gap-6">
      <dt className="w-44 shrink-0 text-sm text-[#0f1419]/58">{label}</dt>
      <dd className={`text-sm font-semibold text-[#0f1419] ${mono ? 'font-mono tracking-wide' : ''}`}>
        {value}
      </dd>
    </div>
  );
}
