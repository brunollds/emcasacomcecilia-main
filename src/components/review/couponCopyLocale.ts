import { type Locale } from '@/lib/i18n/locales';

export type CouponCopyLocale = Locale;

export type CouponCopyLabels = {
  copy: string;
  copied: string;
  copyCoupon: (coupon: string) => string;
  inlinePrefix: string;
  inlineSuffix: string;
};

// Dizem "código", não "cupom": valem também para o CECILIA010 da YesStyle, que é código de
// recompensa. O rótulo de cópia é o mesmo copyCodeAria das páginas de loja.
const couponCopyLabels: Record<CouponCopyLocale, CouponCopyLabels> = {
  pt: {
    copy: 'Copiar',
    copied: 'Copiado',
    copyCoupon: (coupon) => `Copiar o código ${coupon}`,
    inlinePrefix: 'Use o código',
    inlineSuffix: 'no checkout',
  },
  en: {
    copy: 'Copy',
    copied: 'Copied',
    copyCoupon: (coupon) => `Copy the code ${coupon}`,
    inlinePrefix: 'Use code',
    inlineSuffix: 'at checkout',
  },
  es: {
    copy: 'Copiar',
    copied: 'Copiado',
    copyCoupon: (coupon) => `Copiar el código ${coupon}`,
    inlinePrefix: 'Usa el código',
    inlineSuffix: 'al finalizar la compra',
  },
  fr: {
    copy: 'Copier',
    copied: 'Copié',
    copyCoupon: (coupon) => `Copier le code ${coupon}`,
    inlinePrefix: 'Utilisez le code',
    inlineSuffix: 'lors du paiement',
  },
  de: {
    copy: 'Kopieren',
    copied: 'Kopiert',
    copyCoupon: (coupon) => `Code ${coupon} kopieren`,
    inlinePrefix: 'Code',
    inlineSuffix: 'an der Kasse verwenden',
  },
  it: {
    copy: 'Copia',
    copied: 'Copiato',
    copyCoupon: (coupon) => `Copia il codice ${coupon}`,
    inlinePrefix: 'Usa il codice',
    inlineSuffix: 'al checkout',
  },
  ko: { copy: '복사', copied: '복사됨', copyCoupon: (coupon) => `코드 ${coupon} 복사`, inlinePrefix: '코드', inlineSuffix: '결제 시 사용' },
  ja: { copy: 'コピー', copied: 'コピー済み', copyCoupon: (coupon) => `コード ${coupon} をコピー`, inlinePrefix: 'コード', inlineSuffix: 'をチェックアウトで使う' },
  'zh-hant': { copy: '複製', copied: '已複製', copyCoupon: (coupon) => `複製代碼 ${coupon}`, inlinePrefix: '使用代碼', inlineSuffix: '於結帳時輸入' },
  'zh-hans': { copy: '复制', copied: '已复制', copyCoupon: (coupon) => `复制代码 ${coupon}`, inlinePrefix: '使用代码', inlineSuffix: '在结账时输入' },
};

export function getCouponCopyLabels(locale: CouponCopyLocale = 'pt'): CouponCopyLabels {
  return couponCopyLabels[locale];
}


export function isStepHeading(heading?: string): boolean {
  if (!heading) return false;
  return /^(\d+[\.\)]\s+|(Passo|Paso|Étape|Schritt|Step|ステップ|단계|步驟|步骤)\s*\d+|\d+\s*단계)/i.test(heading);
}
