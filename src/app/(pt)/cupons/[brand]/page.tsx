import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CopyButton, CouponPillCard, FAQAccordion, CouponStoreLink } from '@/components/CouponComponents';
import { CouponBottomBar } from '@/components/CouponBottomBar';
import {
  COUPONS,
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
  const coupon =
    getCouponBySlug(brand) ??
    (process.env.NODE_ENV === 'development'
      ? COUPONS.find((item) => item.slug === brand)
      : undefined);
  if (!coupon) return {};
  const socialImage = coupon.socialImage || coupon.brandLogo || '/images/logos/logo-em-casa-com-cecilia.png';
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
      discount: `${coupon.discountNumber}`,
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
  const offerType = coupon.offerTypeLabel || (couponCodeOffer ? 'cupom' : 'oferta');
  const offerTypePlural = coupon.offerTypeLabelPlural || (couponCodeOffer ? 'cupons' : 'ofertas');
  const offerAction = coupon.offerActionLabel || (couponCodeOffer
    ? `economizar ${coupon.discount}`
    : 'Ver oferta');
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
                {couponCodeOffer
                  ? `${offerType.charAt(0).toUpperCase() + offerType.slice(1)} ${coupon.brand}: ${coupon.discount} com ${couponCodeOffer.code}`
                  : `${offerType.charAt(0).toUpperCase() + offerType.slice(1)} ${coupon.brand}: ${coupon.discount}`}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/78">
                {coupon.longDescription}
              </p>
              <p className="mt-4 text-xs text-white/55">
                Atualizado em {lastVerified}. Confira as condições e o valor final antes de finalizar.
              </p>
            </div>
          </div>
        </div>
      </section>



      {coupon.monthlyHighlight && (
        <section className="px-4 pt-8">
          <div className="mx-auto max-w-5xl rounded-2xl border border-[#ff6b35]/30 bg-white px-5 py-4 shadow-soft">
            <p className="font-heading text-lg font-black text-[#0f1419]">
              {couponCodeOffer
                ? `${offerType.charAt(0).toUpperCase() + offerType.slice(1)} ${coupon.brand} atualizado: ${couponCodeOffer.code} — ${coupon.discount} ${coupon.monthlyHighlight.scope} (${highlightMonthYear}).`
                : `Atualização da oferta ${coupon.brand}: ${coupon.discount} ${coupon.monthlyHighlight.scope} (${highlightMonthYear}).`}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#0f1419]/70">
              {coupon.monthlyHighlight.note}. Confirme as condições e o valor final antes de finalizar.
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
                    {coupon.brand} · {offerType} disponível
                  </span>
                  <span className="rounded-full bg-[#ffd23f] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#4a2400]">
                    {coupon.discount}
                  </span>
                </div>
              </div>

              {couponCodeOffer?.tiers && couponCodeOffer.tiers.length > 0 ? (
                <p className="mt-6 font-heading text-4xl font-black leading-tight tracking-[-0.02em] md:text-6xl">
                  {coupon.discount}
                </p>
              ) : couponCodeOffer ? (
                <p className="mt-6 font-mono text-4xl font-black tracking-[0.08em] md:text-6xl">
                  {couponCodeOffer.code}
                </p>
              ) : (
                <p className="mt-6 font-heading text-4xl font-black leading-tight tracking-[-0.02em] md:text-6xl">
                  {coupon.discount}
                </p>
              )}
              <h2 className="mt-4 font-heading text-2xl font-black leading-tight">
                {coupon.shortDescription}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/86 md:text-base">
                {coupon.longDescription}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {couponCodeOffer?.tiers && couponCodeOffer.tiers.length > 0 ? (
                  <a
                    href="#faixas-de-desconto"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#862f0e] transition-colors hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Ver as faixas e copiar o código
                  </a>
                ) : couponCodeOffer ? (
                  <CopyButton
                    code={couponCodeOffer.code}
                    label={`Copiar e ${offerAction}`}
                    brand={coupon.brand}
                  />
                ) : null}
                <CouponStoreLink
                  href={coupon.offerUrl}
                  label={couponCodeOffer ? 'Ir para a loja' : offerAction}
                  couponCode={couponCodeOffer?.code}
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
          {couponCodeOffer?.tiers && couponCodeOffer.tiers.length > 0 && (
            <>
              <h2 id="faixas-de-desconto" className="scroll-mt-24 font-heading text-2xl font-black text-[#0f1419]">
                Faixas de desconto do {coupon.brand}
              </h2>
              <div className="mt-4 space-y-3">
                <p className="rounded-2xl border border-[#ff6b35]/25 bg-[#fff7ed] px-4 py-3 text-sm leading-relaxed text-[#7c2d12]">
                  <strong>Atenção:</strong> estes códigos da Cecília funcionam{' '}
                  <strong>somente pelo navegador</strong>, na loja{' '}
                  <a
                    href={coupon.offerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline underline-offset-2"
                  >
                    {coupon.offerUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                  </a>{' '}
                  — não funcionam no app do Magalu nem em magazineluiza.com.br.
                </p>
                <p className="rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm leading-relaxed text-[#0f1419]/78">
                  <strong>Por que o endereço é diferente?</strong> O Magazine Você é a loja de
                  influenciadores do próprio Magalu: mesmo catálogo, mesmos preços e a mesma conta.
                  Você entra com o login Magalu de sempre, e quem vende, cobra, entrega e cuida do
                  pós-venda é o Magazine Luiza. O endereço diferente não é golpe — é o que ativa os
                  cupons exclusivos da Cecília.
                </p>
              </div>
              <p className="mt-4 text-base leading-relaxed text-[#0f1419]/78">
                Escolha o código conforme o valor total do seu carrinho — quanto maior a faixa
                alcançada, maior o desconto em reais. Clique no código para copiá-lo.
              </p>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-black/8">
                <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                  <caption className="sr-only">
                    Faixas de cupom {coupon.brand}: código, desconto e compra mínima
                  </caption>
                  <thead>
                    <tr className="bg-[#fef9f3]">
                      <th scope="col" className="px-4 py-3 font-heading text-xs font-black uppercase tracking-[0.14em] text-[#0f1419]/70">
                        Cupom (clique para copiar)
                      </th>
                      <th scope="col" className="px-4 py-3 font-heading text-xs font-black uppercase tracking-[0.14em] text-[#0f1419]/70">
                        Desconto
                      </th>
                      <th scope="col" className="px-4 py-3 font-heading text-xs font-black uppercase tracking-[0.14em] text-[#0f1419]/70">
                        Compra mínima
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/8">
                    {couponCodeOffer.tiers.map((tier) => (
                      <tr key={tier.code} className="bg-white">
                        <td className="px-4 py-3">
                          <CopyButton
                            code={tier.code}
                            label={tier.code}
                            copiedLabel="Copiado!"
                            variant="outline"
                            brand={coupon.brand}
                            placement="coupon_page_tiers"
                            className="font-mono text-xs font-black"
                          />
                        </td>
                        <td className="px-4 py-3 font-semibold text-[#0f1419]">{tier.discount}</td>
                        <td className="px-4 py-3 text-[#0f1419]/78">{tier.minPurchase}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <h2 className={`font-heading text-2xl font-black text-[#0f1419]${couponCodeOffer?.tiers && couponCodeOffer.tiers.length > 0 ? ' mt-12' : ''}`}>
            {couponCodeOffer
              ? `Detalhes do ${offerType} ${couponCodeOffer.code}`
              : `Detalhes da oferta ${coupon.brand}`}
          </h2>
          <dl className="mt-6 divide-y divide-black/8 rounded-2xl border border-black/8">
            {couponCodeOffer && <DetailRow label="Código" value={couponCodeOffer.code} mono />}
            <DetailRow label={couponCodeOffer ? 'Desconto' : 'Benefício'} value={coupon.discount} />
            <DetailRow label="Loja" value={coupon.brand} />
            <DetailRow label="Abrangência" value={coupon.eligibleCategories} />
            <DetailRow label="Validade" value={coupon.validity} />
            <DetailRow label="Reusável" value={coupon.reusable} />
            <DetailRow label="Cumulativo" value={coupon.combinable} />
            <DetailRow label="Frete" value={coupon.shipping} />
            <DetailRow label="Última verificação" value={lastVerified} />
          </dl>

          {coupon.referral && (
            <>
              <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">
                {coupon.referral.label}
              </h2>
              <div className="mt-4 rounded-2xl border border-black/8 bg-[#fef9f3] p-5">
                <code className="font-mono text-2xl font-black tracking-[0.08em] text-[#0f1419]">
                  {coupon.referral.code}
                </code>
                <p className="mt-3 text-sm leading-relaxed text-[#0f1419]/72">
                  {coupon.referral.instructions}
                </p>
                <p className="mt-3 text-xs text-[#0f1419]/52">
                  Verificado em{' '}
                  {new Date(`${coupon.referral.verifiedAt}T12:00:00`).toLocaleDateString('pt-BR')}.
                </p>
              </div>
            </>
          )}

          {coupon.campaigns && coupon.campaigns.length > 0 && (
            <>
              <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">
                Campanhas ativas da {coupon.brand}
              </h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {coupon.campaigns.map((campaign) => (
                  <article key={`${campaign.code}-${campaign.offerUrl}`} className="rounded-2xl border border-black/8 bg-white p-5 shadow-soft">
                    <h3 className="font-heading text-lg font-black text-[#0f1419]">{campaign.title}</h3>
                    <code className="mt-3 inline-block rounded-lg bg-[#fef9f3] px-3 py-2 font-mono text-sm font-black tracking-[0.08em] text-[#0f1419]">
                      {campaign.code}
                    </code>
                    <p className="mt-3 text-sm leading-relaxed text-[#0f1419]/72">{campaign.description}</p>
                    <p className="mt-2 text-xs leading-relaxed text-[#0f1419]/56">{campaign.eligibility}</p>
                    <CouponStoreLink
                      href={campaign.offerUrl}
                      label="Abrir campanha na SHEIN"
                      brand={coupon.brand}
                      placement="coupon_page"
                      className="mt-4 inline-flex items-center justify-center rounded-lg bg-[#0f1419] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0f1419]/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35]"
                    />
                    <p className="mt-3 text-[11px] text-[#0f1419]/48">
                      Verificada em{' '}
                      {new Date(`${campaign.verifiedAt}T12:00:00`).toLocaleDateString('pt-BR')}.
                    </p>
                  </article>
                ))}
              </div>
            </>
          )}

          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">
            {couponCodeOffer
              ? `Como aplicar o ${offerType} ${couponCodeOffer.code} na ${coupon.brand}`
              : `Como acessar a oferta da ${coupon.brand}`}
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-relaxed text-[#0f1419]/78">
            {offerInstructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ol>
          <p className="mt-4 rounded-2xl border border-[#ff6b35]/25 bg-[#fff7ed] px-4 py-3 text-sm leading-relaxed text-[#7c2d12]">
            {couponCodeOffer ? (
              <>Campo correto: <strong>{codeFieldLabel}</strong>. Confirme sempre o resumo do pedido antes de pagar.</>
            ) : coupon.referral ? (
              <>O link principal abre a SHEIN; códigos de indicação e de campanha são pesquisados no aplicativo. Confirme as condições exibidas para a sua conta antes de pagar.</>
            ) : (
              <>Esta oferta é acessada pelo link indicado e não exige código para copiar. Confirme as condições na loja antes de pagar.</>
            )}
          </p>

          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">
            Sobre a {coupon.brand}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#0f1419]/78">
            {coupon.aboutBrand}
          </p>

          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">
            {couponCodeOffer
              ? `Perguntas frequentes sobre ${offerTypePlural} ${coupon.brand}`
              : `Perguntas frequentes sobre ${offerTypePlural} da ${coupon.brand}`}
          </h2>
          <div className="mt-4">
            <FAQAccordion items={coupon.faqs} />
          </div>

          {couponCodeOffer?.history && couponCodeOffer.history.length > 0 && (
            <>
              <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">
                Histórico de cupons da {coupon.brand}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#0f1419]/78">
                Cupons anteriores já usados nessa parceria. O cupom ativo atual é{' '}
                <strong>{couponCodeOffer.code}</strong>.
              </p>
              <ul className="mt-4 space-y-3">
                {couponCodeOffer.history.map((item) => (
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
                Outros benefícios ativos
              </h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {otherCoupons.map((otherCoupon) => (
                  <CouponPillCard
                    key={otherCoupon.slug}
                    {...(otherCoupon.offerMode === 'discount-code'
                      ? { offerMode: otherCoupon.offerMode, code: otherCoupon.code }
                      : { offerMode: otherCoupon.offerMode })}
                    brand={otherCoupon.brand}
                    brandIcon={otherCoupon.brandIcon}
                    brandLogo={otherCoupon.brandLogo}
                    brandLogoAlt={otherCoupon.brandLogoAlt}
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
              {couponCodeOffer ? (
                <>Esta página pode conter links de afiliado. Quando você compra usando o {offerType}{' '}
                  <strong>{couponCodeOffer.code}</strong> ou acessa a loja pelo link indicado, o Em Casa com Cecília
                  pode receber comissão da marca, sem custo extra para você.</>
              ) : (
                <>Esta página contém um link de afiliado. Quando você acessa a oferta e compra pelo link indicado,
                  o Em Casa com Cecília pode receber comissão da marca, sem custo extra para você.</>
              )}
            </p>
          </div>
        </div>
      </article>

      {coupon.offerMode === 'discount-code' ? (
        <CouponBottomBar
          offerMode={coupon.offerMode}
          coupon={coupon.code}
          cta={{ url: coupon.offerUrl, label: 'Usar na loja' }}
        />
      ) : (
        <CouponBottomBar
          offerMode={coupon.offerMode}
          cta={{ url: coupon.offerUrl, label: offerAction }}
        />
      )}
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
