'use client';

import { useEffect, useId, useRef, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ChevronUp, Copy, ExternalLink, Scissors, X } from 'lucide-react';
import { CouponStoreLink } from '@/components/CouponComponents';
import { CopyCodeButton, dockCodeSize } from '@/components/coupons/CouponActions';
import { BrandWatermark, DiscountFigure, couponFontVariables } from '@/components/coupons/CouponBlocks';
import { acquireScrollLock, releaseScrollLock } from '@/components/editorial';
import { isInternalLink } from '@/lib/internalLinks';
import type { Locale } from '@/lib/i18n/locales';
import { getCouponCopyLabels } from './couponCopyLocale';
import { useReadingPosition, type TocItem } from './useReadingPosition';

type DockCopy = {
  contents: string;
  openContents: (current: number, total: number, heading: string) => string;
  position: (current: number, total: number) => string;
  closeContents: string;
  sectionsNav: string;
  readingProgress: string;
  couponLabel: (brand?: string) => string;
  copiedStatus: (code: string) => string;
  relatedTitle: string;
};

// O rótulo do botão do dock contém o texto visível dele ("Sumário" e a seção), para quem o
// aciona por voz.
const dockCopy: Record<Locale, DockCopy> = {
  pt: {
    contents: 'Sumário',
    openContents: (current, total, heading) => `Abrir o sumário. Seção ${current} de ${total}: ${heading}`,
    position: (current, total) => `${current} de ${total}`,
    closeContents: 'Fechar o sumário',
    sectionsNav: 'Seções do artigo',
    readingProgress: 'Progresso de leitura',
    couponLabel: (brand) => (brand ? `Cupom ${brand}` : 'Cupom de desconto'),
    copiedStatus: (code) => `Código ${code} copiado.`,
    relatedTitle: 'Leia também',
  },
  en: {
    contents: 'Contents',
    openContents: (current, total, heading) => `Open contents. Section ${current} of ${total}: ${heading}`,
    position: (current, total) => `${current} of ${total}`,
    closeContents: 'Close contents',
    sectionsNav: 'Article sections',
    readingProgress: 'Reading progress',
    couponLabel: (brand) => (brand ? `${brand} code` : 'Discount code'),
    copiedStatus: (code) => `Code ${code} copied.`,
    relatedTitle: 'Read next',
  },
  es: {
    contents: 'Índice',
    openContents: (current, total, heading) => `Abrir el índice. Sección ${current} de ${total}: ${heading}`,
    position: (current, total) => `${current} de ${total}`,
    closeContents: 'Cerrar el índice',
    sectionsNav: 'Secciones del artículo',
    readingProgress: 'Progreso de lectura',
    couponLabel: (brand) => (brand ? `Código ${brand}` : 'Código de descuento'),
    copiedStatus: (code) => `Código ${code} copiado.`,
    relatedTitle: 'Lee también',
  },
  fr: {
    contents: 'Sommaire',
    openContents: (current, total, heading) => `Ouvrir le sommaire. Section ${current} sur ${total} : ${heading}`,
    position: (current, total) => `${current} sur ${total}`,
    closeContents: 'Fermer le sommaire',
    sectionsNav: 'Sections de l’article',
    readingProgress: 'Progression de la lecture',
    couponLabel: (brand) => (brand ? `Code ${brand}` : 'Code promo'),
    copiedStatus: (code) => `Code ${code} copié.`,
    relatedTitle: 'À lire aussi',
  },
  de: {
    contents: 'Inhalt',
    openContents: (current, total, heading) => `Inhalt öffnen. Abschnitt ${current} von ${total}: ${heading}`,
    position: (current, total) => `${current} von ${total}`,
    closeContents: 'Inhalt schließen',
    sectionsNav: 'Abschnitte des Artikels',
    readingProgress: 'Lesefortschritt',
    couponLabel: (brand) => (brand ? `${brand}-Code` : 'Rabattcode'),
    copiedStatus: (code) => `Code ${code} kopiert.`,
    relatedTitle: 'Weiterlesen',
  },
  it: {
    contents: 'Indice',
    openContents: (current, total, heading) => `Apri l’indice. Sezione ${current} di ${total}: ${heading}`,
    position: (current, total) => `${current} di ${total}`,
    closeContents: 'Chiudi l’indice',
    sectionsNav: 'Sezioni dell’articolo',
    readingProgress: 'Avanzamento della lettura',
    couponLabel: (brand) => (brand ? `Codice ${brand}` : 'Codice sconto'),
    copiedStatus: (code) => `Codice ${code} copiato.`,
    relatedTitle: 'Leggi anche',
  },
  ko: {
    contents: '목차',
    openContents: (current, total, heading) => `목차 열기. ${total}개 중 ${current}번째 섹션: ${heading}`,
    position: (current, total) => `${current} / ${total}`,
    closeContents: '목차 닫기',
    sectionsNav: '본문 섹션',
    readingProgress: '읽기 진행률',
    couponLabel: (brand) => (brand ? `${brand} 코드` : '할인 코드'),
    copiedStatus: (code) => `코드 ${code} 복사 완료.`,
    relatedTitle: '함께 읽어 보세요',
  },
  ja: {
    contents: '目次',
    openContents: (current, total, heading) => `目次を開く。${total}セクション中${current}番目：${heading}`,
    position: (current, total) => `${current} / ${total}`,
    closeContents: '目次を閉じる',
    sectionsNav: '記事のセクション',
    readingProgress: '読み進めた割合',
    couponLabel: (brand) => (brand ? `${brand}のコード` : '割引コード'),
    copiedStatus: (code) => `コード ${code} をコピーしました。`,
    relatedTitle: 'あわせて読みたい',
  },
  'zh-hant': {
    contents: '目錄',
    openContents: (current, total, heading) => `開啟目錄。第 ${current} 節，共 ${total} 節：${heading}`,
    position: (current, total) => `${current} / ${total}`,
    closeContents: '關閉目錄',
    sectionsNav: '文章段落',
    readingProgress: '閱讀進度',
    couponLabel: (brand) => (brand ? `${brand} 優惠碼` : '優惠碼'),
    copiedStatus: (code) => `已複製代碼 ${code}。`,
    relatedTitle: '延伸閱讀',
  },
  'zh-hans': {
    contents: '目录',
    openContents: (current, total, heading) => `打开目录。第 ${current} 节，共 ${total} 节：${heading}`,
    position: (current, total) => `${current} / ${total}`,
    closeContents: '关闭目录',
    sectionsNav: '文章段落',
    readingProgress: '阅读进度',
    couponLabel: (brand) => (brand ? `${brand} 优惠码` : '优惠码'),
    copiedStatus: (code) => `已复制代码 ${code}。`,
    relatedTitle: '延伸阅读',
  },
};

const FOCUS_RING = 'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-marinho';

export interface ReviewMobileBottomBarProps {
  locale: Locale;
  reviewSlug: string;
  tocItems: TocItem[];
  // Slug do afiliado; vai como marca no analytics, igual ao sidebar.
  affiliate?: string;
  coupon?: {
    code: string;
    brand?: string;
    // Desconto e regra da loja em /cupons, quando ela usa o mesmo código.
    offer?: { discount: string; note: string; watermark?: string };
  };
  cta?: { url: string; label: string; sponsored?: boolean };
  related: { href: string; title: string }[];
}

// O equivalente do sidebar no celular: um dock com a seção atual e o cupom, que abre o sumário
// numa gaveta. Aparece quando a leitura chega à primeira seção. Fica sticky no fim do <body>,
// então reserva o próprio espaço e nunca cobre o rodapé.
export function ReviewMobileBottomBar({
  locale,
  reviewSlug,
  tocItems,
  affiliate,
  coupon,
  cta,
  related,
}: ReviewMobileBottomBarProps): React.ReactElement | null {
  const { activeIndex, progress } = useReadingPosition(tocItems.map((item) => item.id));
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDialogElement>(null);
  const sheetBodyRef = useRef<HTMLDivElement>(null);
  const currentLinkRef = useRef<HTMLAnchorElement>(null);
  const id = useId();

  useEffect(() => {
    if (!sheetOpen) return undefined;
    acquireScrollLock();
    return releaseScrollLock;
  }, [sheetOpen]);

  if (tocItems.length === 0) return null;

  const copy = dockCopy[locale];
  const couponCopy = getCouponCopyLabels(locale);
  const visible = activeIndex >= 0;
  const current = Math.max(activeIndex, 0);
  const total = tocItems.length;
  const sheetId = `${id}-sumario`;
  const titleId = `${id}-titulo`;
  const couponTitleId = `${id}-cupom`;

  // O foco vai para a seção atual, que é rolada para a vista quando a lista não cabe na gaveta
  // (celular deitado). A rolagem é só da gaveta: deixar o foco rolar arriscaria mexer na página.
  const openSheet = () => {
    sheetRef.current?.showModal();
    const link = currentLinkRef.current;
    const body = sheetBodyRef.current;
    if (link && body) {
      link.focus({ preventScroll: true });
      const linkBox = link.getBoundingClientRect();
      const bodyBox = body.getBoundingClientRect();
      if (linkBox.top < bodyBox.top || linkBox.bottom > bodyBox.bottom) {
        body.scrollTop += linkBox.top - bodyBox.top - 8;
      }
    }
    setSheetOpen(true);
  };

  // O toque fora da gaveta chega ao próprio <dialog>. Qualquer link também fecha: os do sumário
  // rolam a página, e os outros saem dela.
  const handleSheetClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget || (event.target as Element).closest('a')) {
      event.currentTarget.close();
    }
  };

  return (
    <>
      <div
        inert={!visible}
        className={`sticky bottom-0 z-40 border-t-2 border-marinho bg-white text-marinho transition-[translate,visibility] duration-200 ease-out motion-reduce:transition-none lg:hidden print:hidden ${couponFontVariables} ${
          visible ? 'translate-y-0' : 'invisible translate-y-full'
        }`}
      >
        <div
          role="progressbar"
          aria-label={copy.readingProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="h-[5px] bg-amarelo-cupom"
        >
          <div className="h-full origin-left bg-marinho" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <div className="mx-auto flex max-w-lg items-center gap-2 px-2 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={openSheet}
            aria-haspopup="dialog"
            aria-expanded={sheetOpen}
            aria-controls={sheetId}
            aria-label={copy.openContents(current + 1, total, tocItems[current].heading)}
            className={`flex min-h-[52px] min-w-0 flex-1 items-center gap-2.5 rounded-[10px] px-1.5 text-left ${FOCUS_RING}`}
          >
            <span aria-hidden="true" className="flex shrink-0 items-baseline font-condensada font-black font-stretch-extra-condensed">
              <span className="text-[38px] leading-9">{current + 1}</span>
              <span className="text-xl leading-5">/{total}</span>
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-xs leading-4 font-extrabold">{copy.contents}</span>
              <span className="truncate text-sm leading-5 font-bold">{tocItems[current].heading}</span>
            </span>
            <ChevronUp aria-hidden="true" strokeWidth={2.4} className="h-5 w-5 shrink-0" />
          </button>
          {coupon && (
            <CopyCodeButton
              code={coupon.code}
              brand={affiliate}
              contentSlug={reviewSlug}
              placement="review_mobile_dock"
              ariaLabel={couponCopy.copyCoupon(coupon.code)}
              copiedStatus={copy.copiedStatus(coupon.code)}
              className={`flex min-h-[52px] max-w-[48%] shrink-0 items-center gap-2 rounded-lg border-2 border-dashed border-marinho bg-amarelo-cupom px-3 font-codigo font-extrabold ${FOCUS_RING} data-[copied=true]:border-solid data-[copied=true]:border-verde-escuro data-[copied=true]:bg-verde-claro data-[copied=true]:text-verde-escuro`}
              copiedChildren={
                <>
                  <Check aria-hidden="true" className="h-4 w-4 shrink-0" />
                  <span className={`min-w-0 break-all leading-5 ${dockCodeSize(coupon.code)}`}>{coupon.code}</span>
                </>
              }
            >
              <Scissors aria-hidden="true" className="h-4 w-4 shrink-0" />
              <span className={`min-w-0 break-all leading-5 ${dockCodeSize(coupon.code)}`}>{coupon.code}</span>
            </CopyCodeButton>
          )}
        </div>
      </div>

      {/* Fica fora do dock: o inert do dock escondido não pode alcançar a gaveta. */}
      <dialog
        ref={sheetRef}
        id={sheetId}
        aria-labelledby={titleId}
        // O close chega numa tarefa à parte, às vezes depois de um toque que já reabriu a gaveta;
        // por isso o estado copia o do <dialog> em vez de assumir fechado.
        onClose={(event) => setSheetOpen(event.currentTarget.open)}
        onClick={handleSheetClick}
        className={`inset-x-0 top-auto bottom-0 mx-auto my-0 max-h-[calc(100dvh-4rem)] w-full max-w-lg translate-y-full flex-col overflow-hidden rounded-t-[18px] border-2 border-b-0 border-marinho bg-white p-0 text-marinho transition-[translate,overlay,display] transition-discrete duration-200 ease-out backdrop:bg-marinho/55 open:flex open:translate-y-0 starting:open:translate-y-full motion-reduce:transition-none ${couponFontVariables}`}
      >
        <div className="flex shrink-0 items-center gap-3 border-b-2 border-marinho bg-amarelo-cupom py-2.5 pr-3 pl-4">
          <h2 id={titleId} className="flex-1 font-condensada text-[40px] leading-10 font-black font-stretch-extra-condensed">
            {copy.contents}
          </h2>
          <span className="text-sm leading-5 font-extrabold">{copy.position(current + 1, total)}</span>
          <button
            type="button"
            onClick={() => sheetRef.current?.close()}
            aria-label={copy.closeContents}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border-2 border-marinho bg-white ${FOCUS_RING}`}
          >
            <X aria-hidden="true" strokeWidth={2.4} className="h-[22px] w-[22px]" />
          </button>
        </div>

        <div
          ref={sheetBodyRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[max(1.25rem,env(safe-area-inset-bottom))]"
        >
          <nav aria-label={copy.sectionsNav} className="px-3 pt-2">
            <ol className="flex flex-col gap-1">
              {tocItems.map((item, index) => {
                const isCurrent = index === activeIndex;
                const isRead = index < activeIndex;
                return (
                  <li key={item.id}>
                    <a
                      ref={isCurrent ? currentLinkRef : undefined}
                      href={`#${item.id}`}
                      aria-current={isCurrent ? 'location' : undefined}
                      className={`flex min-h-12 items-center gap-2.5 rounded-[10px] border-2 px-3 py-2 text-sm leading-5 ${FOCUS_RING} ${
                        isCurrent
                          ? 'border-marinho bg-amarelo-cupom font-extrabold'
                          : `border-transparent font-semibold hover:bg-amarelo-cupom/35 ${isRead ? 'text-marinho-suave' : ''}`
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="flex w-[26px] shrink-0 justify-center font-condensada text-[28px] leading-7 font-black font-stretch-extra-condensed"
                      >
                        {isRead ? <Check strokeWidth={2.6} className="h-5 w-5 text-verde-escuro" /> : index + 1}
                      </span>
                      {item.heading}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>

          {coupon && (
            <article
              aria-labelledby={couponTitleId}
              className="relative isolate mx-4 mt-3.5 overflow-hidden rounded-xl border-2 border-marinho bg-white"
            >
              {coupon.offer ? (
                <>
                  <BrandWatermark src={coupon.offer.watermark} className="-right-7 top-1 h-20 w-[220px]" />
                  <div className="flex">
                    <div
                      aria-hidden="true"
                      className="flex w-[92px] shrink-0 items-center justify-center border-r-2 border-marinho bg-amarelo-cupom px-1.5 py-2"
                    >
                      <span className="relative z-10">
                        <DiscountFigure discount={coupon.offer.discount} size="stub" />
                      </span>
                    </div>
                    <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-1 px-3 py-2.5">
                      <h3 id={couponTitleId} className="text-[15px] leading-5 font-extrabold">
                        {copy.couponLabel(coupon.brand)}
                      </h3>
                      <p className="text-[12.5px] leading-[17px] font-medium text-marinho-suave">{coupon.offer.note}</p>
                    </div>
                  </div>
                </>
              ) : (
                <h3 id={couponTitleId} className="px-3.5 pt-2.5 pb-2 text-[15px] leading-5 font-extrabold">
                  {copy.couponLabel(coupon.brand)}
                </h3>
              )}
              <div className="relative z-10 flex items-center gap-2.5 border-t-2 border-dashed border-marinho bg-white py-2 pr-2 pl-3.5 has-[[data-copied=true]]:border-solid has-[[data-copied=true]]:border-verde-escuro has-[[data-copied=true]]:bg-verde-claro">
                <code className="min-w-0 flex-1 font-codigo text-xl leading-7 font-extrabold tracking-[0.04em] wrap-anywhere">
                  {coupon.code}
                </code>
                <CopyCodeButton
                  code={coupon.code}
                  brand={affiliate}
                  contentSlug={reviewSlug}
                  placement="review_mobile_drawer"
                  ariaLabel={couponCopy.copyCoupon(coupon.code)}
                  copiedStatus={copy.copiedStatus(coupon.code)}
                  className={`flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-laranja px-3.5 text-sm font-extrabold ${FOCUS_RING} data-[copied=true]:bg-verde-escuro data-[copied=true]:text-white`}
                  copiedChildren={
                    <>
                      <Check aria-hidden="true" className="h-[18px] w-[18px]" />
                      {couponCopy.copied}
                    </>
                  }
                >
                  <Copy aria-hidden="true" className="h-[18px] w-[18px]" />
                  {couponCopy.copy}
                </CopyCodeButton>
              </div>
            </article>
          )}

          {cta && (
            <CouponStoreLink
              href={cta.url}
              couponCode={coupon?.code}
              brand={affiliate}
              contentSlug={reviewSlug}
              linkLabel={cta.label}
              sponsored={cta.sponsored}
              placement="review_mobile_drawer"
              className={`mx-4 mt-2.5 flex min-h-12 items-center justify-center gap-2 rounded-[10px] border-2 border-marinho bg-laranja px-4 py-2 text-center text-[15px] leading-5 font-extrabold ${FOCUS_RING}`}
            >
              {cta.label}
              {isInternalLink(cta.url) ? (
                <ArrowRight aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
              ) : (
                <ExternalLink aria-hidden="true" className="h-[18px] w-[18px] shrink-0" />
              )}
            </CouponStoreLink>
          )}

          {related.length > 0 && (
            <div className="mx-4 mt-[18px]">
              <h3 className="mb-0.5 font-condensada text-2xl leading-[26px] font-black font-stretch-extra-condensed">
                {copy.relatedTitle}
              </h3>
              <ul>
                {related.map((article) => (
                  <li key={article.href}>
                    <Link
                      href={article.href}
                      className={`flex min-h-11 items-center py-1.5 text-sm leading-5 font-bold underline underline-offset-[3px] ${FOCUS_RING}`}
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
