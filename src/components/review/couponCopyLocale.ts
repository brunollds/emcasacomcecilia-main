import { type Locale } from '@/lib/i18n/locales';

export type CouponCopyLocale = Locale;

export type CouponCopyLabels = {
  copy: string;
  copied: string;
  copyCoupon: (coupon: string) => string;
};

// Dizem "código", não "cupom": valem também para o CECILIA010 da YesStyle, que é código de
// recompensa. O rótulo de cópia é o mesmo copyCodeAria das páginas de loja.
const couponCopyLabels: Record<CouponCopyLocale, CouponCopyLabels> = {
  pt: {
    copy: 'Copiar',
    copied: 'Copiado',
    copyCoupon: (coupon) => `Copiar o código ${coupon}`,
  },
  en: {
    copy: 'Copy',
    copied: 'Copied',
    copyCoupon: (coupon) => `Copy the code ${coupon}`,
  },
  es: {
    copy: 'Copiar',
    copied: 'Copiado',
    copyCoupon: (coupon) => `Copiar el código ${coupon}`,
  },
  fr: {
    copy: 'Copier',
    copied: 'Copié',
    copyCoupon: (coupon) => `Copier le code ${coupon}`,
  },
  de: {
    copy: 'Kopieren',
    copied: 'Kopiert',
    copyCoupon: (coupon) => `Code ${coupon} kopieren`,
  },
  it: {
    copy: 'Copia',
    copied: 'Copiato',
    copyCoupon: (coupon) => `Copia il codice ${coupon}`,
  },
  ko: {
    copy: '복사',
    copied: '복사됨',
    copyCoupon: (coupon) => `코드 ${coupon} 복사`,
  },
  ja: {
    copy: 'コピー',
    copied: 'コピー済み',
    copyCoupon: (coupon) => `コード ${coupon} をコピー`,
  },
  'zh-hant': {
    copy: '複製',
    copied: '已複製',
    copyCoupon: (coupon) => `複製代碼 ${coupon}`,
  },
  'zh-hans': {
    copy: '复制',
    copied: '已复制',
    copyCoupon: (coupon) => `复制代码 ${coupon}`,
  },
};

export function getCouponCopyLabels(locale: CouponCopyLocale = 'pt'): CouponCopyLabels {
  return couponCopyLabels[locale];
}


export function isStepHeading(heading?: string): boolean {
  if (!heading) return false;
  return /^(\d+[\.\)]\s+|(Passo|Paso|Étape|Schritt|Step|ステップ|단계|步驟|步骤)\s*\d+|\d+\s*단계)/i.test(heading);
}
