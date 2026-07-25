import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CopyButton, FAQAccordion } from '@/components/CouponComponents';
import { CouponBottomBar } from '@/components/CouponBottomBar';
import {
  getYesStyleLocaleConfig,
  getRewardArticleLanguageLinks,
  type YesStyleLocale,
} from '@/lib/i18n/yesstyleCluster';
import { getPrimaryRewardCode, type YesStyleCouponItem } from '@/lib/yesstyleCoupons';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';

type Locale = Exclude<YesStyleLocale, 'pt'>;

type PageCopy = {
  locale: Locale;
  language: string;
  titleTemplate: string;
  descriptionTemplate: string;
  eyebrow: string;
  introTemplate: string;
  updated: string;
  copy: string;
  copied: string;
  copyAriaTemplate: string;
  visit: string;
  details: string;
  codeLabel: string;
  discountLabel: string;
  discountValueTemplate: string;
  fieldLabel: string;
  fieldValue: string;
  instructionsTitleTemplate: string;
  instructionsTemplates: string[];
  noteTemplate: string;
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  transparencyTemplate: string;
};

export interface ResolvedYesStylePage {
  locale: Locale;
  language: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  updatedLabel: string;
  formattedDate: string;
  copy: string;
  copied: string;
  copyAria: string;
  visit: string;
  details: string;
  codeLabel: string;
  discountLabel: string;
  discountValue: string;
  fieldLabel: string;
  fieldValue: string;
  instructionsTitle: string;
  instructions: string[];
  note: string;
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  transparency: string;
  rewardCode: string;
  affiliateUrl: string;
}

const pages: Record<Locale, PageCopy> = {
  en: {
    locale: 'en',
    language: 'en-US',
    titleTemplate: 'YesStyle Reward Code {code}: Up to {newDiscount}% Extra',
    descriptionTemplate: 'Use the YesStyle reward code {code} at checkout to add {newDiscount}% extra savings alongside active coupon codes.',
    eyebrow: 'YesStyle Reward Code',
    introTemplate: '{code} is a YesStyle Reward Code, not a regular coupon. Enter it in the dedicated Reward Code field to add up to {newDiscount}% extra ({newDiscount}% on 1st order / {returningDiscount}% on returning orders).',
    updated: 'Verified',
    copy: 'Copy code',
    copied: 'Copied!',
    copyAriaTemplate: 'Copy code {code}',
    visit: 'Visit YesStyle',
    details: 'Code details',
    codeLabel: 'Code',
    discountLabel: 'Discount',
    discountValueTemplate: 'Up to {newDiscount}% extra ({newDiscount}% for new customers / {returningDiscount}% for returning customers)',
    fieldLabel: 'Field',
    fieldValue: 'Reward Code',
    instructionsTitleTemplate: 'How to use {code}',
    instructionsTemplates: [
      'Copy {code}.',
      'Open YesStyle and add your products to the bag.',
      'At checkout, enter the code in the Reward Code field.',
      'Apply any active promo code separately in the Coupon Code field.',
      'Check that both discounts appear before placing your order.',
    ],
    noteTemplate: 'Important: enter {code} in Reward Code, not Coupon Code.',
    faqTitle: 'Frequently asked questions',
    faqs: [
      { question: 'Can I use {code} with a coupon?', answer: 'Yes. Use {code} in Reward Code and any eligible promotional code in Coupon Code.' },
      { question: 'What discount does it offer?', answer: 'It adds up to {newDiscount}% extra, subject to YesStyle’s active terms and eligible products.' },
    ],
    transparencyTemplate: 'This page contains affiliate links. If you visit YesStyle through our links or use the influencer code {code}, we may earn a commission at no extra cost to you.',
  },
  es: {
    locale: 'es',
    language: 'es-ES',
    titleTemplate: 'Código de recompensa YesStyle {code}: Hasta {newDiscount}% extra',
    descriptionTemplate: 'Usa el código de recompensa {code} en YesStyle para sumar un {newDiscount}% extra junto con los cupones activos.',
    eyebrow: 'Código de recompensa YesStyle',
    introTemplate: '{code} es un código de recompensa, no un cupón tradicional. Úsalo en el campo Reward Code para sumar hasta un {newDiscount}% extra ({newDiscount}% en 1ª compra / {returningDiscount}% en compras siguientes).',
    updated: 'Verificado',
    copy: 'Copiar código',
    copied: '¡Copiado!',
    copyAriaTemplate: 'Copiar código {code}',
    visit: 'Ir a YesStyle',
    details: 'Detalles del código',
    codeLabel: 'Código',
    discountLabel: 'Descuento',
    discountValueTemplate: 'Hasta {newDiscount}% extra ({newDiscount}% nuevos clientes / {returningDiscount}% clientes habituales)',
    fieldLabel: 'Campo',
    fieldValue: 'Reward Code',
    instructionsTitleTemplate: 'Cómo usar {code}',
    instructionsTemplates: [
      'Copia {code}.',
      'Entra a YesStyle y añade tus productos.',
      'En el checkout, introdúcelo en Reward Code.',
      'Usa por separado cualquier cupón activo en Coupon Code.',
      'Comprueba ambos descuentos antes de pagar.',
    ],
    noteTemplate: 'Importante: {code} va en Reward Code, no en Coupon Code.',
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { question: '¿Puedo usar {code} con un cupón?', answer: 'Sí. Usa {code} en Reward Code y el cupón promocional en Coupon Code.' },
      { question: '¿Qué descuento ofrece?', answer: 'Añade hasta {newDiscount}% extra, según las condiciones vigentes de YesStyle.' },
    ],
    transparencyTemplate: 'Esta página contiene enlaces de afiliado. Si accedes a YesStyle mediante nuestros enlaces o usas el código de influencer {code}, podemos recibir una comisión sin coste adicional para ti.',
  },
  fr: {
    locale: 'fr',
    language: 'fr-FR',
    titleTemplate: 'Code récompense YesStyle {code} : Jusqu’à {newDiscount} % en plus',
    descriptionTemplate: 'Utilisez le code récompense {code} sur YesStyle pour ajouter {newDiscount} % de réduction aux coupons actifs.',
    eyebrow: 'Code récompense YesStyle',
    introTemplate: '{code} est un code récompense, et non un coupon classique. Saisissez-le dans le champ Reward Code pour ajouter jusqu’à {newDiscount} % ({newDiscount} % 1ère commande / {returningDiscount} % commandes suivantes).',
    updated: 'Vérifié',
    copy: 'Copier le code',
    copied: 'Copié !',
    copyAriaTemplate: 'Copier le code {code}',
    visit: 'Aller sur YesStyle',
    details: 'Détails du code',
    codeLabel: 'Code',
    discountLabel: 'Réduction',
    discountValueTemplate: 'Jusqu’à {newDiscount} % extra ({newDiscount} % nouveaux clients / {returningDiscount} % clients réguliers)',
    fieldLabel: 'Champ',
    fieldValue: 'Reward Code',
    instructionsTitleTemplate: 'Comment utiliser {code}',
    instructionsTemplates: [
      'Copiez {code}.',
      'Ouvrez YesStyle et ajoutez vos produits.',
      'Au paiement, saisissez-le dans Reward Code.',
      'Ajoutez séparément tout coupon actif dans Coupon Code.',
      'Vérifiez les deux réductions avant de payer.',
    ],
    noteTemplate: 'Important : {code} va dans Reward Code, pas dans Coupon Code.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { question: 'Puis-je utiliser {code} avec un coupon ?', answer: 'Oui. Utilisez {code} dans Reward Code et le coupon promotionnel dans Coupon Code.' },
      { question: 'Quelle réduction offre-t-il ?', answer: 'Il ajoute jusqu’à {newDiscount} %, selon les conditions YesStyle en vigueur.' },
    ],
    transparencyTemplate: 'Cette page contient des liens affiliés. Si vous accédez à YesStyle via nos liens ou utilisez le code influenceur {code}, nous pouvons recevoir une commission sans frais supplémentaires pour vous.',
  },
  de: {
    locale: 'de',
    language: 'de-DE',
    titleTemplate: 'YesStyle Reward Code {code}: Bis zu {newDiscount} % extra',
    descriptionTemplate: 'Nutze den YesStyle Reward Code {code} und erhalte zusätzlich {newDiscount} % neben aktiven Gutscheincodes.',
    eyebrow: 'YesStyle Reward Code',
    introTemplate: '{code} ist ein Reward Code, kein normaler Gutschein. Gib ihn im separaten Reward-Code-Feld ein, um bis zu {newDiscount} % extra zu erhalten ({newDiscount} % bei Erstbestellung / {returningDiscount} % bei Folgebestellungen).',
    updated: 'Verifiziert',
    copy: 'Code kopieren',
    copied: 'Kopiert!',
    copyAriaTemplate: 'Code {code} kopieren',
    visit: 'Zu YesStyle',
    details: 'Code-Details',
    codeLabel: 'Code',
    discountLabel: 'Rabatt',
    discountValueTemplate: 'Bis zu {newDiscount} % extra ({newDiscount} % Erstbestellung / {returningDiscount} % Folgebestellungen)',
    fieldLabel: 'Feld',
    fieldValue: 'Reward Code',
    instructionsTitleTemplate: 'So verwendest du {code}',
    instructionsTemplates: [
      'Kopiere {code}.',
      'Öffne YesStyle und lege Produkte in den Warenkorb.',
      'Gib den Code an der Kasse im Reward-Code-Feld ein.',
      'Nutze aktive Gutscheincodes separat im Coupon-Code-Feld.',
      'Prüfe beide Rabatte vor dem Bezahlen.',
    ],
    noteTemplate: 'Wichtig: {code} gehört in Reward Code, nicht in Coupon Code.',
    faqTitle: 'Häufige Fragen',
    faqs: [
      { question: 'Kann ich {code} mit einem Gutschein nutzen?', answer: 'Ja. Nutze {code} im Reward-Code-Feld und den Aktionscode im Coupon-Code-Feld.' },
      { question: 'Welchen Rabatt gibt es?', answer: 'Der Code fügt bis zu {newDiscount} % hinzu, gemäß den aktuellen YesStyle-Bedingungen.' },
    ],
    transparencyTemplate: 'Diese Seite enthält Affiliate-Links. Wenn du YesStyle über unsere Links besuchst oder den Influencer-Code {code} verwendest, können wir eine Provision erhalten, ohne dass dir zusätzliche Kosten entstehen.',
  },
  ko: {
    locale: 'ko',
    language: 'ko-KR',
    titleTemplate: 'YesStyle 리워드 코드 {code}: 추가 {newDiscount}% 할인',
    descriptionTemplate: 'YesStyle 결제 시 리워드 코드 {code}을 사용해 활성 쿠폰과 함께 추가 {newDiscount}% 혜택을 받으세요.',
    eyebrow: 'YesStyle 리워드 코드',
    introTemplate: '{code}은 일반 쿠폰이 아닌 리워드 코드입니다. Reward Code 전용 칸에 입력하면 최대 추가 {newDiscount}% (첫 구매 {newDiscount}% / 재구매 {returningDiscount}%) 혜택을 받을 수 있습니다.',
    updated: '확인일',
    copy: '코드 복사',
    copied: '복사됨!',
    copyAriaTemplate: '코드 {code} 복사',
    visit: 'YesStyle 방문',
    details: '코드 정보',
    codeLabel: '코드',
    discountLabel: '할인율',
    discountValueTemplate: '최대 {newDiscount}% 추가 할인 (첫 구매 {newDiscount}% / 재구매 {returningDiscount}%)',
    fieldLabel: '입력란',
    fieldValue: 'Reward Code',
    instructionsTitleTemplate: '{code} 사용 방법',
    instructionsTemplates: [
      '{code}을 복사하세요.',
      'YesStyle에서 상품을 장바구니에 담으세요.',
      '결제 시 Reward Code 칸에 코드를 입력하세요.',
      '활성 프로모션 코드는 Coupon Code 칸에 별도로 입력하세요.',
      '결제 전 두 할인 모두 적용되었는지 확인하세요.',
    ],
    noteTemplate: '중요: {code}은 Coupon Code가 아닌 Reward Code에 입력하세요.',
    faqTitle: '자주 묻는 질문',
    faqs: [
      { question: '{code} 코드를 다른 쿠폰과 함께 사용할 수 있나요?', answer: '네. {code}은 Reward Code에, 프로모션 쿠폰은 Coupon Code에 입력하세요.' },
      { question: '할인율은 얼마인가요?', answer: 'YesStyle의 현재 조건과 대상 상품에 따라 추가 {newDiscount}% 혜택을 제공합니다.' },
    ],
    transparencyTemplate: '이 페이지에는 제휴 링크가 포함될 수 있습니다. 인플루언서 코드 {code}를 사용하거나 YesStyle을 방문하면 추가 비용 없이 Em Casa com Cecília를 지원할 수 있습니다.',
  },
  ja: {
    locale: 'ja',
    language: 'ja-JP',
    titleTemplate: 'YesStyle リワードコード {code}：さらに{newDiscount}%オフ',
    descriptionTemplate: 'YesStyleでリワードコード{code}を使うと、有効なクーポンに加えてさらに{newDiscount}%お得になります。',
    eyebrow: 'YesStyle リワードコード',
    introTemplate: '{code}は通常のクーポンではなくリワードコードです。Reward Code欄に入力すると最大で追加{newDiscount}%（初回{newDiscount}% / 2回目以降{returningDiscount}%）の特典が適用されます。',
    updated: '確認日',
    copy: 'コードをコピー',
    copied: 'コピーしました！',
    copyAriaTemplate: 'コード {code} をコピー',
    visit: 'YesStyleへ',
    details: 'コードの詳細',
    codeLabel: 'コード',
    discountLabel: '割引率',
    discountValueTemplate: '最大{newDiscount}%追加オフ（初回{newDiscount}% / 2回目以降{returningDiscount}%）',
    fieldLabel: '入力欄',
    fieldValue: 'Reward Code',
    instructionsTitleTemplate: '{code}の使い方',
    instructionsTemplates: [
      '{code}をコピーします。',
      'YesStyleで商品をカートに入れます。',
      'チェックアウト時にReward Code欄へ入力します。',
      '有効なプロモーションコードはCoupon Code欄に別途入力します。',
      '注文前に両方の割引を確認します。',
    ],
    noteTemplate: '重要：{code}はCoupon CodeではなくReward Codeに入力してください。',
    faqTitle: 'よくある質問',
    faqs: [
      { question: '{code}はほかのクーポンと併用できますか？', answer: 'はい。{code}はReward Code、プロモーションコードはCoupon Codeに入力してください。' },
      { question: '割引率はいくらですか？', answer: 'YesStyleの最新条件と対象商品に応じて、さらに{newDiscount}%の特典が加わります。' },
    ],
    transparencyTemplate: 'このページにはアフィリエイトリンクが含まれる場合があります。インフルエンサーコード {code} の利用またはYesStyleへの訪問は、追加費用なしでEm Casa com Cecíliaを支援することがあります。',
  },
  'zh-hant': {
    locale: 'zh-hant',
    language: 'zh-HK',
    titleTemplate: 'YesStyle 獎勵碼 {code}：額外 {newDiscount}% 優惠',
    descriptionTemplate: '在 YesStyle 結帳時使用獎勵碼 {code}，可與有效優惠碼疊加，額外享有 {newDiscount}% 優惠。',
    eyebrow: 'YesStyle 獎勵碼',
    introTemplate: '{code} 是獎勵碼，並非一般優惠碼。請在 Reward Code 專用欄位輸入，即可獲得最高額外 {newDiscount}% 優惠（首購 {newDiscount}% / 複購 {returningDiscount}%）。',
    updated: '已驗證',
    copy: '複製優惠碼',
    copied: '已複製！',
    copyAriaTemplate: '複製優惠碼 {code}',
    visit: '前往 YesStyle',
    details: '優惠碼詳情',
    codeLabel: '優惠碼',
    discountLabel: '折扣力度',
    discountValueTemplate: '最高額外 {newDiscount}% 優惠（首購 {newDiscount}% / 複購 {returningDiscount}%）',
    fieldLabel: '輸入欄位',
    fieldValue: 'Reward Code',
    instructionsTitleTemplate: '如何使用 {code}',
    instructionsTemplates: [
      '複製 {code}。',
      '前往 YesStyle 並將商品加入購物袋。',
      '結帳時，在 Reward Code 欄位輸入代碼。',
      '有效的促銷優惠碼請另外輸入 Coupon Code 欄位。',
      '付款前確認兩項優惠皆已套用。',
    ],
    noteTemplate: '重要：{code} 應輸入 Reward Code，而不是 Coupon Code。',
    faqTitle: '常見問題',
    faqs: [
      { question: '{code} 可以與其他優惠碼同時使用嗎？', answer: '可以。{code} 請輸入 Reward Code，促銷優惠碼請輸入 Coupon Code。' },
      { question: '可享多少優惠？', answer: '依 YesStyle 當前條款及適用商品，可額外享有 {newDiscount}% 優惠。' },
    ],
    transparencyTemplate: '此頁面可能包含聯盟連結。使用網紅優惠碼 {code} 或前往 YesStyle 不會增加您的費用，並可能支持 Em Casa com Cecília。',
  },
  'zh-hans': {
    locale: 'zh-hans',
    language: 'zh-CN',
    titleTemplate: 'YesStyle 奖励码 {code}：额外 {newDiscount}% 优惠',
    descriptionTemplate: '在 YesStyle 结账时使用奖励码 {code}，可与有效优惠码叠加，额外享受 {newDiscount}% 优惠。',
    eyebrow: 'YesStyle 奖励码',
    introTemplate: '{code} 是奖励码，而非普通优惠码。请在 Reward Code 专用栏位输入，即可获得最高额外 {newDiscount}% 优惠（首购 {newDiscount}% / 复购 {returningDiscount}%）。',
    updated: '已验证',
    copy: '复制优惠码',
    copied: '已复制！',
    copyAriaTemplate: '复制优惠码 {code}',
    visit: '前往 YesStyle',
    details: '优惠码详情',
    codeLabel: '优惠码',
    discountLabel: '折扣力度',
    discountValueTemplate: '最高额外 {newDiscount}% 优惠（首购 {newDiscount}% / 复购 {returningDiscount}%）',
    fieldLabel: '输入栏位',
    fieldValue: 'Reward Code',
    instructionsTitleTemplate: '如何使用 {code}',
    instructionsTemplates: [
      '复制 {code}。',
      '前往 YesStyle 并将商品加入购物袋。',
      '结账时，在 Reward Code 栏位输入代码。',
      '有效促销优惠码请另外输入 Coupon Code 栏位。',
      '付款前确认两项优惠均已应用。',
    ],
    noteTemplate: '重要：{code} 应输入 Reward Code，而不是 Coupon Code。',
    faqTitle: '常见问题',
    faqs: [
      { question: '{code} 可以和其他优惠码一起使用吗？', answer: '可以。请将 {code} 输入 Reward Code，将促销优惠码输入 Coupon Code。' },
      { question: '优惠是多少？', answer: '根据 YesStyle 当前条款及适用商品，可额外享受 {newDiscount}% 优惠。' },
    ],
    transparencyTemplate: '此页面可能包含联盟链接。使用网红优惠码 {code} 或访问 YesStyle 不会增加您的费用，并可能支持 Em Casa com Cecília。',
  },
};

export const yesStyleLocales = Object.keys(pages) as Locale[];

export function getYesStylePage(locale: string): PageCopy | null {
  return pages[locale as Locale] || null;
}

export function formatIsoDateUTC(dateIso: string, language: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateIso)) {
    throw new Error(`[formatIsoDateUTC] Formato de data ISO inválido (esperado YYYY-MM-DD): "${dateIso}"`);
  }
  const [year, month, day] = dateIso.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString(language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function fillPlaceholders(template: string, reward: YesStyleCouponItem): string {
  return template
    .replace(/\{code\}/g, reward.code)
    .replace(/\{newDiscount\}/g, String(reward.newCustomerDiscount))
    .replace(/\{returningDiscount\}/g, String(reward.returningCustomerDiscount));
}

export function resolveYesStylePage(locale: string, rewardInput?: YesStyleCouponItem): ResolvedYesStylePage | null {
  const page = getYesStylePage(locale);
  if (!page) return null;

  const reward = rewardInput || getPrimaryRewardCode();
  const formattedDate = formatIsoDateUTC(reward.verifiedAt, page.language);

  return {
    locale: page.locale,
    language: page.language,
    title: fillPlaceholders(page.titleTemplate, reward),
    description: fillPlaceholders(page.descriptionTemplate, reward),
    eyebrow: page.eyebrow,
    intro: fillPlaceholders(page.introTemplate, reward),
    updatedLabel: page.updated,
    formattedDate,
    copy: page.copy,
    copied: page.copied,
    copyAria: fillPlaceholders(page.copyAriaTemplate, reward),
    visit: page.visit,
    details: page.details,
    codeLabel: page.codeLabel,
    discountLabel: page.discountLabel,
    discountValue: fillPlaceholders(page.discountValueTemplate, reward),
    fieldLabel: page.fieldLabel,
    fieldValue: page.fieldValue,
    instructionsTitle: fillPlaceholders(page.instructionsTitleTemplate, reward),
    instructions: page.instructionsTemplates.map((item) => fillPlaceholders(item, reward)),
    note: fillPlaceholders(page.noteTemplate, reward),
    faqTitle: page.faqTitle,
    faqs: page.faqs.map((faq) => ({
      question: fillPlaceholders(faq.question, reward),
      answer: fillPlaceholders(faq.answer, reward),
    })),
    transparency: fillPlaceholders(page.transparencyTemplate, reward),
    rewardCode: reward.code,
    affiliateUrl: reward.affiliateUrl,
  };
}

export function getYesStyleMetadata(locale: string): Metadata {
  const resolved = resolveYesStylePage(locale);
  if (!resolved) return {};
  const config = getYesStyleLocaleConfig(locale);
  const canonical = `https://emcasacomcecilia.com${config.rewardArticlePath}`;

  return {
    title: resolved.title,
    description: resolved.description,
    alternates: { canonical },
    openGraph: {
      title: resolved.title,
      description: resolved.description,
      url: canonical,
      locale: config.openGraphLocale,
      type: 'website',
    },
  };
}

export function YesStyleCouponPage({ locale }: { locale: string }) {
  const resolved = resolveYesStylePage(locale);
  if (!resolved) return null;

  const languageLinks = getRewardArticleLanguageLinks();

  return (
    <main className="min-h-screen bg-[#fef9f3] pb-24 lg:pb-0">
      <section className="bg-[#0f1d3a] px-4 py-12 text-white md:py-16">
        <div className="mx-auto max-w-5xl">
          <nav className="mb-6 text-xs text-white/55">
            <Link href="/">Em Casa com Cecília</Link>
            <span className="mx-2">/</span>
            <span>YesStyle</span>
          </nav>
          <div className="flex gap-5 md:items-center">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white p-2">
              <Image src="/images/logos/yesstyle.jpg" alt="YesStyle" fill sizes="80px" className="object-contain p-2" priority />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#ffd23f]">{resolved.eyebrow}</p>
              <h1 className="mt-2 font-heading text-3xl font-black leading-tight md:text-5xl">{resolved.title}</h1>
              <p className="mt-4 max-w-2xl text-white/78">{resolved.intro}</p>
              <p className="mt-4 text-xs text-white/55">{resolved.updatedLabel}: {resolved.formattedDate}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pt-8">
        <div className="mx-auto max-w-5xl">
          <LanguageSwitcher currentLocale={resolved.locale} links={languageLinks} />
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#111827] p-7 text-white shadow-large md:p-10">
          <p className="font-mono text-4xl font-black tracking-[.08em] md:text-6xl">{resolved.rewardCode}</p>
          <p className="mt-4 max-w-2xl text-white/85">{resolved.description}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CopyButton code={resolved.rewardCode} label={resolved.copy} copiedLabel={resolved.copied} ariaLabel={resolved.copyAria} />
            <a href={resolved.affiliateUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold hover:bg-white/15">
              {resolved.visit}
            </a>
          </div>
        </div>
      </section>

      <article className="bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-black text-[#0f1419]">{resolved.details}</h2>
          <dl className="mt-6 divide-y divide-black/8 rounded-2xl border border-black/8">
            <Detail label={resolved.codeLabel} value={resolved.rewardCode} />
            <Detail label={resolved.discountLabel} value={resolved.discountValue} />
            <Detail label={resolved.fieldLabel} value={resolved.fieldValue} />
          </dl>
          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">{resolved.instructionsTitle}</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-[#0f1419]/78">
            {resolved.instructions.map((item) => <li key={item}>{item}</li>)}
          </ol>
          <p className="mt-4 rounded-2xl border border-[#ff6b35]/25 bg-[#fff7ed] px-4 py-3 text-sm text-[#7c2d12]">{resolved.note}</p>
          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">{resolved.faqTitle}</h2>
          <div className="mt-4"><FAQAccordion items={resolved.faqs} /></div>
          <div className="mt-14 rounded-2xl bg-[#fef9f3] p-6 text-sm leading-relaxed text-[#0f1419]/68">{resolved.transparency}</div>
        </div>
      </article>

      <CouponBottomBar coupon={resolved.rewardCode} cta={{ url: resolved.affiliateUrl, label: resolved.visit }} locale={resolved.locale} />
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 md:flex-row md:gap-6">
      <dt className="w-44 text-sm text-[#0f1419]/58">{label}</dt>
      <dd className="text-sm font-semibold text-[#0f1419]">{value}</dd>
    </div>
  );
}
