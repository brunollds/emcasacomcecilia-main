import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';
import { Check, ChevronRight, CircleCheck, Copy, ExternalLink, Globe, Scissors } from 'lucide-react';
import { LOCALES, LOCALE_KEYS, type Locale } from '@/lib/i18n/locales';
import { CopyAndOpenStoreLink, CopyCodeButton } from './CouponActions';
import { BrandWatermark, FOCUS_RING, PRIMARY_ACTION, SECONDARY_ACTION } from './CouponBlocks';
import type { CouponStoreCopy } from './couponStoreCopy';

// Moldura das páginas de loja do Encarte, usada pela página de cada loja e pela da YesStyle.

// O dock do celular procura este id para aparecer quando o recorte sai da tela.
export const STORE_CUTOUT_ID = 'cupom';

// Topo amarelo com marca-d'água, trilha, marca e categoria. O H1 é a linha condensada, o número
// grande e, nas lojas com código, "com CÓDIGO".
export function StoreHero({
  watermark,
  breadcrumb,
  breadcrumbLabel,
  brand,
  category,
  titleLead,
  titleFigure,
  titleEnd,
  intro,
}: {
  watermark?: string;
  breadcrumb: { name: string; path: string }[];
  breadcrumbLabel: string;
  brand: string;
  category: string;
  titleLead: string;
  titleFigure: ReactNode;
  titleEnd?: string;
  intro: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b-2 border-marinho bg-amarelo-cupom">
      <div className="relative mx-auto max-w-6xl px-4 pt-3 pb-16 md:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-x-16 lg:pt-6 lg:pb-14">
        <BrandWatermark
          src={watermark}
          aboveTheFold
          className="-right-12 top-[108px] h-[150px] w-[300px] lg:top-10 lg:right-8 lg:h-[170px] lg:w-[340px]"
        />
        <div className="relative z-10">
          <nav aria-label={breadcrumbLabel}>
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
            <span className="text-base font-extrabold leading-[22px]">{brand}</span>
            <span className="text-[13px] font-semibold leading-[18px]">{category}</span>
          </p>

          <h1 className="mt-3.5 flex flex-col gap-0.5">
            <span className="font-condensada text-[30px] font-extrabold leading-8 font-stretch-condensed md:text-[40px] md:leading-[44px]">
              {titleLead}
            </span>{' '}
            {titleFigure}
            {titleEnd && (
              <>
                {' '}
                <span className="mt-1 text-[17px] font-extrabold leading-6 md:text-[22px] md:leading-8">{titleEnd}</span>
              </>
            )}
          </h1>

          <p className="mt-3 max-w-[54ch] text-[15px] font-semibold leading-[22px] md:text-[17px] md:leading-[26px]">
            {intro}
          </p>
        </div>
      </div>
    </section>
  );
}

// Grade com o StoreCutout e o StoreContent. O recorte vem antes no HTML: no celular ele sobe sobre
// o topo amarelo, no desktop vai para a coluna da direita.
export function StoreBody({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 md:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-x-16">
      {children}
    </div>
  );
}

export function StoreContent({ children }: { children: ReactNode }) {
  return <div className="mt-10 flex flex-col gap-12 lg:col-start-1 lg:row-start-1 lg:mt-14 lg:gap-14">{children}</div>;
}

// No desktop o recorte gruda logo abaixo do menu, que tem 129px até o xl e 85px depois.
export function StoreCutout({ label, verified, children }: { label: string; verified: string; children: ReactNode }) {
  return (
    <section
      id={STORE_CUTOUT_ID}
      aria-label={label}
      className="relative z-10 -mt-11 rounded-2xl border-[2.5px] border-dashed border-marinho bg-white px-[18px] pt-6 pb-[18px] lg:sticky lg:top-38 lg:col-start-2 lg:row-start-1 lg:-mt-48 lg:self-start xl:top-28"
    >
      <span
        aria-hidden="true"
        className="absolute -top-[15px] left-4 flex h-7 w-7 items-center justify-center rounded-full bg-amarelo-cupom"
      >
        <Scissors className="h-5 w-5" />
      </span>

      {children}

      <p className="mt-3.5 flex items-center justify-center gap-2 text-center text-[13px] font-bold leading-[18px] text-verde-escuro">
        <CircleCheck aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
        {verified}
      </p>
    </section>
  );
}

// Códigos longos (EMCASACOMCECILIA) não cabem a 34px num celular de 360px.
const cutoutCodeSize = (code: string) =>
  code.length <= 10
    ? 'text-[34px] leading-[42px] tracking-[0.06em]'
    : code.length <= 13
      ? 'text-[28px] leading-9 tracking-[0.04em]'
      : 'text-[22px] leading-8 tracking-[0.02em]';

export function CutoutCode({ code }: { code: string }) {
  return (
    <code className={`block break-all text-center font-codigo font-extrabold ${cutoutCodeSize(code)}`}>
      {code}
    </code>
  );
}

// "Copiar e ir para a loja" e "Só copiar o código", embaixo do código no recorte.
export function CutoutCodeActions({
  code,
  brand,
  href,
  copy,
}: {
  code: string;
  brand: string;
  href: string;
  copy: CouponStoreCopy;
}) {
  return (
    <>
      <CopyAndOpenStoreLink
        code={code}
        brand={brand}
        href={href}
        copiedStatus={copy.copiedAndOpenedStatus(code)}
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
        code={code}
        brand={brand}
        placement="coupon_page"
        copiedStatus={copy.copiedStatus(code)}
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
  );
}

// "Copiar" ao lado de um código que não é o do recorte, como o de indicação.
export function CompactCopyButton({
  code,
  brand,
  ariaLabel,
  copy,
}: {
  code: string;
  brand: string;
  ariaLabel: string;
  copy: CouponStoreCopy;
}) {
  return (
    <CopyCodeButton
      code={code}
      brand={brand}
      placement="coupon_page"
      ariaLabel={ariaLabel}
      copiedStatus={copy.copiedStatus(code)}
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
  );
}

// Passo a passo numerado. A nota verde embaixo diz em que campo o código vai.
export function StepList({ steps, note }: { steps: string[]; note: ReactNode }) {
  return (
    <>
      <ol className="mt-5 flex flex-col gap-3">
        {steps.map((step, index) => (
          <li key={step} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="min-w-7 shrink-0 font-condensada text-[44px] font-black leading-10 font-stretch-extra-condensed"
            >
              {index + 1}
            </span>
            <span className="pt-2 text-[15px] font-semibold leading-[22px] md:text-base md:leading-6">{step}</span>
          </li>
        ))}
      </ol>
      <p className="mt-5 rounded-xl bg-verde-claro px-4 py-3 text-sm font-semibold leading-[21px] text-verde-escuro">
        {note}
      </p>
    </>
  );
}

// Card de link para um artigo. O texto de dentro muda de página para página.
export function RelatedLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl border-2 border-marinho px-3.5 py-3 transition-colors hover:bg-creme ${FOCUS_RING}`}
    >
      <span className="flex min-w-0 flex-1 flex-col gap-1">{children}</span>
      <ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0" />
    </Link>
  );
}

// A mesma página nos outros idiomas. Fica logo depois do recorte para não empurrar o código para baixo.
export function LanguageLinks({
  links,
  current,
  label,
}: {
  links: Partial<Record<Locale, string>>;
  current: Locale;
  label: string;
}) {
  const alternatives = LOCALE_KEYS.flatMap((locale) => {
    const href = links[locale];
    return href && locale !== current ? [{ locale, href }] : [];
  });
  if (alternatives.length === 0) return null;

  return (
    <nav
      aria-label={label}
      className="flex flex-wrap items-center gap-x-3 border-y-2 border-marinho/15 py-1 text-[13px] font-bold leading-[18px]"
    >
      <span className="flex items-center gap-1.5 text-marinho-suave">
        <Globe aria-hidden="true" className="h-4 w-4 shrink-0" />
        {label}
      </span>
      <ul className="flex flex-wrap items-center gap-x-3">
        {alternatives.map(({ locale, href }) => (
          <li key={locale}>
            <Link
              href={href}
              hrefLang={LOCALES[locale].hreflang}
              lang={LOCALES[locale].htmlLang}
              className={`flex min-h-11 items-center underline underline-offset-[3px] ${FOCUS_RING}`}
            >
              {LOCALES[locale].label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function StoreTransparency({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-labelledby="transparencia" className="mx-auto max-w-6xl px-4 pt-12 pb-10 md:px-8">
      <h2 id="transparencia" className="text-[15px] font-extrabold leading-[22px]">
        {title}
      </h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] font-medium leading-5 text-marinho-suave">{children}</p>
    </section>
  );
}
