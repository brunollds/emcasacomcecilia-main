export type CouponCopyLocale = 'pt' | 'en' | 'es' | 'fr' | 'de' | 'ko' | 'ja' | 'zh-hant' | 'zh-hans';

export type CouponCopyLabels = {
  copy: string;
  copied: string;
  copyCoupon: (coupon: string) => string;
  closeBar: string;
  inlinePrefix: string;
  inlineSuffix: string;
  shortStoreCta: string;
};

const couponCopyLabels: Record<CouponCopyLocale, CouponCopyLabels> = {
  pt: {
    copy: 'Copiar',
    copied: 'Copiado',
    copyCoupon: (coupon) => `Copiar cupom ${coupon}`,
    closeBar: 'Fechar barra de cupom',
    inlinePrefix: 'Use o código',
    inlineSuffix: 'no checkout',
    shortStoreCta: 'Usar na loja',
  },
  en: {
    copy: 'Copy',
    copied: 'Copied',
    copyCoupon: (coupon) => `Copy coupon ${coupon}`,
    closeBar: 'Close coupon bar',
    inlinePrefix: 'Use code',
    inlineSuffix: 'at checkout',
    shortStoreCta: 'Use in store',
  },
  es: {
    copy: 'Copiar',
    copied: 'Copiado',
    copyCoupon: (coupon) => `Copiar cupón ${coupon}`,
    closeBar: 'Cerrar barra de cupón',
    inlinePrefix: 'Usa el código',
    inlineSuffix: 'al finalizar la compra',
    shortStoreCta: 'Usar en la tienda',
  },
  fr: {
    copy: 'Copier',
    copied: 'Copié',
    copyCoupon: (coupon) => `Copier le code ${coupon}`,
    closeBar: 'Fermer la barre de code',
    inlinePrefix: 'Utilisez le code',
    inlineSuffix: 'lors du paiement',
    shortStoreCta: 'Utiliser en boutique',
  },
  de: {
    copy: 'Kopieren',
    copied: 'Kopiert',
    copyCoupon: (coupon) => `Code ${coupon} kopieren`,
    closeBar: 'Codeleiste schließen',
    inlinePrefix: 'Code',
    inlineSuffix: 'an der Kasse verwenden',
    shortStoreCta: 'Im Shop nutzen',
  },
  ko: { copy: '복사', copied: '복사됨', copyCoupon: (coupon) => `코드 ${coupon} 복사`, closeBar: '쿠폰 바 닫기', inlinePrefix: '코드', inlineSuffix: '결제 시 사용', shortStoreCta: '스토어에서 사용' },
  ja: { copy: 'コピー', copied: 'コピー済み', copyCoupon: (coupon) => `コード ${coupon} をコピー`, closeBar: 'クーポンバーを閉じる', inlinePrefix: 'コード', inlineSuffix: 'をチェックアウトで使う', shortStoreCta: 'ショップで使う' },
  'zh-hant': { copy: '複製', copied: '已複製', copyCoupon: (coupon) => `複製優惠碼 ${coupon}`, closeBar: '關閉優惠碼列', inlinePrefix: '使用優惠碼', inlineSuffix: '於結帳時輸入', shortStoreCta: '前往商店使用' },
  'zh-hans': { copy: '复制', copied: '已复制', copyCoupon: (coupon) => `复制优惠码 ${coupon}`, closeBar: '关闭优惠码栏', inlinePrefix: '使用优惠码', inlineSuffix: '在结账时输入', shortStoreCta: '前往商店使用' },
};

export function getCouponCopyLabels(locale: CouponCopyLocale = 'pt'): CouponCopyLabels {
  return couponCopyLabels[locale];
}
