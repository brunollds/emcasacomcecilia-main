import { type Locale } from '@/lib/i18n/locales';

export type CouponCopyLocale = Locale;

export type CouponCopyLabels = {
  copy: string;
  copied: string;
  copyCoupon: (coupon: string) => string;
  // "Copiar e ir para a loja" (copia e abre a loja em nova aba) e "Só copiar o código", nos artigos e nas páginas
  // de loja (couponStoreCopy.tsx lê daqui).
  copyAndGo: string;
  copyOnly: string;
  // A linha embaixo do "Copiar e ir para a loja": o código segue copiado na aba da loja.
  goHint: (kind?: 'reward') => string;
  // O X do aviso de quando a pessoa volta da aba da loja.
  closeNotice: string;
};

// Dizem "código", não "cupom": valem também para o CECILIA010 da YesStyle, que é código de
// recompensa. O rótulo de cópia é o mesmo copyCodeAria das páginas de loja.
export const couponCopyLabels: Record<CouponCopyLocale, CouponCopyLabels> = {
  pt: {
    copy: 'Copiar',
    copied: 'Copiado',
    copyCoupon: (coupon) => `Copiar o código ${coupon}`,
    copyAndGo: 'Copiar e ir para a loja',
    copyOnly: 'Só copiar o código',
    goHint: (kind) => (kind === 'reward' ? 'O código fica copiado: é só colar no campo Reward Code.' : 'O código fica copiado: é só colar no checkout.'),
    closeNotice: 'Fechar aviso',
  },
  en: {
    copy: 'Copy',
    copied: 'Copied',
    copyCoupon: (coupon) => `Copy the code ${coupon}`,
    copyAndGo: 'Copy and go to the store',
    copyOnly: 'Just copy the code',
    goHint: (kind) => (kind === 'reward' ? 'The code stays copied: just paste it in the Reward Code field.' : 'The code stays copied: just paste it at checkout.'),
    closeNotice: 'Close notice',
  },
  es: {
    copy: 'Copiar',
    copied: 'Copiado',
    copyCoupon: (coupon) => `Copiar el código ${coupon}`,
    copyAndGo: 'Copiar e ir a la tienda',
    copyOnly: 'Solo copiar el código',
    goHint: (kind) => (kind === 'reward' ? 'El código queda copiado: solo pégalo en el campo Reward Code.' : 'El código queda copiado: solo pégalo al finalizar la compra.'),
    closeNotice: 'Cerrar aviso',
  },
  fr: {
    copy: 'Copier',
    copied: 'Copié',
    copyCoupon: (coupon) => `Copier le code ${coupon}`,
    copyAndGo: 'Copier et aller sur la boutique',
    copyOnly: 'Copier seulement le code',
    goHint: (kind) => (kind === 'reward' ? 'Le code reste copié : il suffit de le coller dans le champ Reward Code.' : 'Le code reste copié : il suffit de le coller au paiement.'),
    closeNotice: 'Fermer l\'avis',
  },
  de: {
    copy: 'Kopieren',
    copied: 'Kopiert',
    copyCoupon: (coupon) => `Code ${coupon} kopieren`,
    copyAndGo: 'Kopieren und zum Shop',
    copyOnly: 'Nur den Code kopieren',
    goHint: (kind) => (kind === 'reward' ? 'Der Code bleibt kopiert: einfach ins Feld Reward Code einfügen.' : 'Der Code bleibt kopiert: einfach an der Kasse einfügen.'),
    closeNotice: 'Hinweis schließen',
  },
  it: {
    copy: 'Copia',
    copied: 'Copiato',
    copyCoupon: (coupon) => `Copia il codice ${coupon}`,
    copyAndGo: 'Copia e vai al negozio',
    copyOnly: 'Copia solo il codice',
    goHint: (kind) => (kind === 'reward' ? 'Il codice resta copiato: basta incollarlo nel campo Reward Code.' : 'Il codice resta copiato: basta incollarlo al checkout.'),
    closeNotice: 'Chiudi avviso',
  },
  ko: {
    copy: '복사',
    copied: '복사됨',
    copyCoupon: (coupon) => `코드 ${coupon} 복사`,
    copyAndGo: '복사하고 스토어로 이동',
    copyOnly: '코드만 복사',
    goHint: (kind) => (kind === 'reward' ? '코드가 복사된 상태예요. Reward Code 입력란에 붙여 넣기만 하세요.' : '코드가 복사된 상태예요. 결제 화면에 붙여 넣기만 하세요.'),
    closeNotice: '알림 닫기',
  },
  ja: {
    copy: 'コピー',
    copied: 'コピー済み',
    copyCoupon: (coupon) => `コード ${coupon} をコピー`,
    copyAndGo: 'コピーしてストアへ',
    copyOnly: 'コードだけコピー',
    goHint: (kind) => (kind === 'reward' ? 'コードはコピーされたままです。Reward Code 欄に貼り付けるだけです。' : 'コードはコピーされたままです。決済画面に貼り付けるだけです。'),
    closeNotice: 'お知らせを閉じる',
  },
  'zh-hant': {
    copy: '複製',
    copied: '已複製',
    copyCoupon: (coupon) => `複製代碼 ${coupon}`,
    copyAndGo: '複製並前往商店',
    copyOnly: '只複製代碼',
    goHint: (kind) => (kind === 'reward' ? '代碼已複製，貼到 Reward Code 欄位即可。' : '代碼已複製，結帳時貼上即可。'),
    closeNotice: '關閉提示',
  },
  'zh-hans': {
    copy: '复制',
    copied: '已复制',
    copyCoupon: (coupon) => `复制代码 ${coupon}`,
    copyAndGo: '复制并前往商店',
    copyOnly: '只复制代码',
    goHint: (kind) => (kind === 'reward' ? '代码已复制，粘贴到 Reward Code 栏位即可。' : '代码已复制，结账时粘贴即可。'),
    closeNotice: '关闭提示',
  },
  ar: {
    copy: 'نسخ',
    copied: 'تم النسخ',
    copyCoupon: (coupon) => `انسخ الرمز ${coupon}`,
    copyAndGo: 'انسخ واذهب إلى المتجر',
    copyOnly: 'انسخ الرمز فقط',
    goHint: (kind) => (kind === 'reward' ? 'يبقى الرمز منسوخًا: الصقه فقط في حقل Reward Code.' : 'يبقى الرمز منسوخًا: الصقه فقط عند إتمام الشراء.'),
    closeNotice: 'إغلاق التنبيه',
  },
};

export function getCouponCopyLabels(locale: CouponCopyLocale = 'pt'): CouponCopyLabels {
  return couponCopyLabels[locale];
}


export function isStepHeading(heading?: string): boolean {
  if (!heading) return false;
  return /^(\d+[\.\)]\s+|(Passo|Paso|Étape|Schritt|Step|ステップ|단계|步驟|步骤|(?:\u0627\u0644)?\u062e\u0637\u0648\u0629)\s*\d+|\d+\s*단계)/i.test(heading);
}
