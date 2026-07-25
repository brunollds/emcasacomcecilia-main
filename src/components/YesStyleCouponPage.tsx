import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CopyButton, FAQAccordion } from '@/components/CouponComponents';
import { CouponBottomBar } from '@/components/CouponBottomBar';
import {
  YESSTYLE_LOCALES,
  getYesStyleLocaleConfig,
  getRewardArticleLanguageLinks,
  type YesStyleLocale,
} from '@/lib/i18n/yesstyleCluster';
import { getPrimaryRewardCode } from '@/lib/yesstyleCoupons';
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
  copyAria: string;
  visit: string;
  details: string;
  codeLabel: string;
  discountLabel: string;
  discountValueTemplate: string;
  fieldLabel: string;
  fieldValue: string;
  instructionsTitle: string;
  instructions: string[];
  note: string;
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  transparency: string;
};

const pages: Record<Locale, PageCopy> = {
  en: {
    locale: 'en',
    language: 'en',
    titleTemplate: 'YesStyle Reward Code CECILIA010: Up to {newDiscount}% Extra',
    descriptionTemplate: 'Use the YesStyle reward code CECILIA010 at checkout to add {newDiscount}% extra savings alongside active coupon codes.',
    eyebrow: 'YesStyle Reward Code',
    introTemplate: 'CECILIA010 is a YesStyle Reward Code, not a regular coupon. Enter it in the dedicated Reward Code field to add up to {newDiscount}% extra ({newDiscount}% on 1st order / {returningDiscount}% on returning orders).',
    updated: 'Verified',
    copy: 'Copy code',
    copied: 'Copied!',
    copyAria: 'Copy code CECILIA010',
    visit: 'Visit YesStyle',
    details: 'Code details',
    codeLabel: 'Code',
    discountLabel: 'Discount',
    discountValueTemplate: 'Up to {newDiscount}% extra ({newDiscount}% for new customers / {returningDiscount}% for returning customers)',
    fieldLabel: 'Field',
    fieldValue: 'Reward Code',
    instructionsTitle: 'How to use CECILIA010',
    instructions: [
      'Copy CECILIA010.',
      'Open YesStyle and add your products to the bag.',
      'At checkout, enter the code in the Reward Code field.',
      'Apply any active promo code separately in the Coupon Code field.',
      'Check that both discounts appear before placing your order.',
    ],
    note: 'Important: enter CECILIA010 in Reward Code, not Coupon Code.',
    faqTitle: 'Frequently asked questions',
    faqs: [
      { question: 'Can I use CECILIA010 with a coupon?', answer: 'Yes. Use CECILIA010 in Reward Code and any eligible promotional code in Coupon Code.' },
      { question: 'What discount does it offer?', answer: 'It adds up to {newDiscount}% extra, subject to YesStyle’s active terms and eligible products.' },
    ],
    transparency: 'This page contains affiliate links. If you visit YesStyle through our links or use the influencer code CECILIA010, we may earn a commission at no extra cost to you.',
  },
  es: {
    locale: 'es',
    language: 'es',
    titleTemplate: 'Código de recompensa YesStyle CECILIA010: Hasta {newDiscount}% extra',
    descriptionTemplate: 'Usa el código de recompensa CECILIA010 en YesStyle para sumar un {newDiscount}% extra junto con los cupones activos.',
    eyebrow: 'Código de recompensa YesStyle',
    introTemplate: 'CECILIA010 es un código de recompensa, no un cupón tradicional. Úsalo en el campo Reward Code para sumar hasta un {newDiscount}% extra ({newDiscount}% en 1ª compra / {returningDiscount}% en compras siguientes).',
    updated: 'Verificado',
    copy: 'Copiar código',
    copied: '¡Copiado!',
    copyAria: 'Copiar código CECILIA010',
    visit: 'Ir a YesStyle',
    details: 'Detalles del código',
    codeLabel: 'Código',
    discountLabel: 'Descuento',
    discountValueTemplate: 'Hasta {newDiscount}% extra ({newDiscount}% nuevos clientes / {returningDiscount}% clientes habituales)',
    fieldLabel: 'Campo',
    fieldValue: 'Reward Code',
    instructionsTitle: 'Cómo usar CECILIA010',
    instructions: [
      'Copia CECILIA010.',
      'Entra a YesStyle y añade tus productos.',
      'En el checkout, introdúcelo en Reward Code.',
      'Usa por separado cualquier cupón activo en Coupon Code.',
      'Comprueba ambos descuentos antes de pagar.',
    ],
    note: 'Importante: CECILIA010 va en Reward Code, no en Coupon Code.',
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { question: '¿Puedo usarlo con un cupón?', answer: 'Sí. Usa CECILIA010 en Reward Code y el cupón promocional en Coupon Code.' },
      { question: '¿Qué descuento ofrece?', answer: 'Añade até {newDiscount}% extra, según las condiciones vigentes de YesStyle.' },
    ],
    transparency: 'Esta página contiene enlaces de afiliado. Si accedes a YesStyle mediante nuestros enlaces o usas el código de influencer CECILIA010, podemos recibir una comisión sin coste adicional para ti.',
  },
  fr: {
    locale: 'fr',
    language: 'fr',
    titleTemplate: 'Code récompense YesStyle CECILIA010 : Jusqu’à {newDiscount} % en plus',
    descriptionTemplate: 'Utilisez le code récompense CECILIA010 sur YesStyle pour ajouter {newDiscount} % de réduction aux coupons actifs.',
    eyebrow: 'Code récompense YesStyle',
    introTemplate: 'CECILIA010 est un code récompense, et non un coupon classique. Saisissez-le dans le champ Reward Code pour ajouter jusqu’à {newDiscount} % ({newDiscount} % 1ère commande / {returningDiscount} % commandes suivantes).',
    updated: 'Vérifié',
    copy: 'Copier le code',
    copied: 'Copié !',
    copyAria: 'Copier le code CECILIA010',
    visit: 'Aller sur YesStyle',
    details: 'Détails du code',
    codeLabel: 'Code',
    discountLabel: 'Réduction',
    discountValueTemplate: 'Jusqu’à {newDiscount} % extra ({newDiscount} % nouveaux clients / {returningDiscount} % clients réguliers)',
    fieldLabel: 'Champ',
    fieldValue: 'Reward Code',
    instructionsTitle: 'Comment utiliser CECILIA010',
    instructions: [
      'Copiez CECILIA010.',
      'Ouvrez YesStyle et ajoutez vos produits.',
      'Au paiement, saisissez-le dans Reward Code.',
      'Ajoutez séparément tout coupon actif dans Coupon Code.',
      'Vérifiez les deux réductions avant de payer.',
    ],
    note: 'Important : CECILIA010 va dans Reward Code, pas dans Coupon Code.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { question: 'Puis-je l’utiliser avec un coupon ?', answer: 'Oui. Utilisez CECILIA010 dans Reward Code et le coupon promotionnel dans Coupon Code.' },
      { question: 'Quelle réduction offre-t-il ?', answer: 'Il ajoute jusqu’à {newDiscount} %, selon les conditions YesStyle en vigueur.' },
    ],
    transparency: 'Cette page contient des liens affiliés. Si vous accédez à YesStyle via nos liens ou utilisez le code influenceur CECILIA010, nous pouvons recevoir une commission sans frais supplémentaires pour vous.',
  },
  de: {
    locale: 'de',
    language: 'de',
    titleTemplate: 'YesStyle Reward Code CECILIA010: Bis zu {newDiscount} % extra',
    descriptionTemplate: 'Nutze den YesStyle Reward Code CECILIA010 und erhalte zusätzlich {newDiscount} % neben aktiven Gutscheincodes.',
    eyebrow: 'YesStyle Reward Code',
    introTemplate: 'CECILIA010 ist ein Reward Code, kein normaler Gutschein. Gib ihn im separaten Reward-Code-Feld ein, um bis zu {newDiscount} % extra zu erhalten ({newDiscount} % bei Erstbestellung / {returningDiscount} % bei Folgebestellungen).',
    updated: 'Verifiziert',
    copy: 'Code kopieren',
    copied: 'Kopiert!',
    copyAria: 'Code CECILIA010 kopieren',
    visit: 'Zu YesStyle',
    details: 'Code-Details',
    codeLabel: 'Code',
    discountLabel: 'Rabatt',
    discountValueTemplate: 'Bis zu {newDiscount} % extra ({newDiscount} % Erstbestellung / {returningDiscount} % Folgebestellungen)',
    fieldLabel: 'Feld',
    fieldValue: 'Reward Code',
    instructionsTitle: 'So verwendest du CECILIA010',
    instructions: [
      'Kopiere CECILIA010.',
      'Öffne YesStyle und lege Produkte in den Warenkorb.',
      'Gib den Code an der Kasse im Reward-Code-Feld ein.',
      'Nutze aktive Gutscheincodes separat im Coupon-Code-Feld.',
      'Prüfe beide Rabatte vor dem Bezahlen.',
    ],
    note: 'Wichtig: CECILIA010 gehört in Reward Code, nicht in Coupon Code.',
    faqTitle: 'Häufige Fragen',
    faqs: [
      { question: 'Kann ich den Code mit einem Gutschein nutzen?', answer: 'Ja. Nutze CECILIA010 im Reward-Code-Feld und den Aktionscode im Coupon-Code-Feld.' },
      { question: 'Welchen Rabatt gibt es?', answer: 'Der Code fügt bis zu {newDiscount} % hinzu, gemäß den aktuellen YesStyle-Bedingungen.' },
    ],
    transparency: 'Diese Seite enthält Affiliate-Links. Wenn du YesStyle über unsere Links besuchst oder den Influencer-Code CECILIA010 verwendest, können wir eine Provision erhalten, ohne dass dir zusätzliche Kosten entstehen.',
  },
  ko: {
    locale: 'ko',
    language: 'ko-KR',
    titleTemplate: 'YesStyle 리워드 코드 CECILIA010: 추가 {newDiscount}% 할인',
    descriptionTemplate: 'YesStyle 결제 시 리워드 코드 CECILIA010을 사용해 활성 쿠폰과 함께 추가 {newDiscount}% 혜택을 받으세요.',
    eyebrow: 'YesStyle 리워드 코드',
    introTemplate: 'CECILIA010은 일반 쿠폰이 아닌 리워드 코드입니다. Reward Code 전용 칸에 입력하면 추가 {newDiscount}% 혜택을 받을 수 있습니다.',
    updated: '확인일',
    copy: '코드 복사',
    copied: '복사됨!',
    copyAria: '코드 CECILIA010 복사',
    visit: 'YesStyle 방문',
    details: '코드 정보',
    codeLabel: '코드',
    discountLabel: '할인율',
    discountValueTemplate: '최대 {newDiscount}% 추가 할인 (첫 구매 {newDiscount}% / 재구매 {returningDiscount}%)',
    fieldLabel: '입력란',
    fieldValue: 'Reward Code',
    instructionsTitle: 'CECILIA010 사용 방법',
    instructions: [
      'CECILIA010을 복사하세요.',
      'YesStyle에서 상품을 장바구니에 담으세요.',
      '결제 시 Reward Code 칸에 코드를 입력하세요.',
      '활성 프로모션 코드는 Coupon Code 칸에 별도로 입력하세요.',
      '결제 전 두 할인 모두 적용되었는지 확인하세요.',
    ],
    note: '중요: CECILIA010은 Coupon Code가 아닌 Reward Code에 입력하세요.',
    faqTitle: '자주 묻는 질문',
    faqs: [
      { question: '다른 쿠폰과 함께 사용할 수 있나요?', answer: '네. CECILIA010은 Reward Code에, 프로모션 쿠폰은 Coupon Code에 입력하세요.' },
      { question: '할인율은 얼마인가요?', answer: 'YesStyle의 현재 조건과 대상 상품에 따라 추가 {newDiscount}% 혜택을 제공합니다.' },
    ],
    transparency: '이 페이지에는 제휴 링크가 포함될 수 있습니다. 코드를 사용하거나 YesStyle을 방문하면 추가 비용 없이 Em Casa com Cecília를 지원할 수 있습니다.',
  },
  ja: {
    locale: 'ja',
    language: 'ja-JP',
    titleTemplate: 'YesStyle リワードコード CECILIA010：さらに{newDiscount}%オフ',
    descriptionTemplate: 'YesStyleでリワードコードCECILIA010を使うと、有効なクーポンに加えてさらに{newDiscount}%お得になります。',
    eyebrow: 'YesStyle リワードコード',
    introTemplate: 'CECILIA010は通常のクーポンではなくリワードコードです。Reward Code欄に入力すると追加で{newDiscount}%の特典が適用されます。',
    updated: '確認日',
    copy: 'コードをコピー',
    copied: 'コピーしました！',
    copyAria: 'コード CECILIA010 をコピー',
    visit: 'YesStyleへ',
    details: 'コードの詳細',
    codeLabel: 'コード',
    discountLabel: '割引率',
    discountValueTemplate: '最大{newDiscount}%追加オフ（初回{newDiscount}% / 2回目以降{returningDiscount}%）',
    fieldLabel: '入力欄',
    fieldValue: 'Reward Code',
    instructionsTitle: 'CECILIA010の使い方',
    instructions: [
      'CECILIA010をコピーします。',
      'YesStyleで商品をカートに入れます。',
      'チェックアウト時にReward Code欄へ入力します。',
      '有効なプロモーションコードはCoupon Code欄に別途入力します。',
      '注文前に両方の割引を確認します。',
    ],
    note: '重要：CECILIA010はCoupon CodeではなくReward Codeに入力してください。',
    faqTitle: 'よくある質問',
    faqs: [
      { question: 'ほかのクーポンと併用できますか？', answer: 'はい。CECILIA010はReward Code、プロモーションコードはCoupon Codeに入力してください。' },
      { question: '割引率はいくらですか？', answer: 'YesStyleの最新条件と対象商品に応じて、さらに{newDiscount}%の特典が加わります。' },
    ],
    transparency: 'このページにはアフィリエイトリンクが含まれる場合があります。コードの利用またはYesStyleへの訪問は、追加費用なしでEm Casa com Cecíliaを支援することがあります。',
  },
  'zh-hant': {
    locale: 'zh-hant',
    language: 'zh-Hant',
    titleTemplate: 'YesStyle 獎勵碼 CECILIA010：額外 {newDiscount}% 優惠',
    descriptionTemplate: '在 YesStyle 結帳時使用獎勵碼 CECILIA010，可與有效優惠碼疊加，額外享有 {newDiscount}% 優惠。',
    eyebrow: 'YesStyle 獎勵碼',
    introTemplate: 'CECILIA010 是獎勵碼，並非一般優惠碼。請在 Reward Code 專用欄位輸入，即可獲得額外 {newDiscount}% 優惠。',
    updated: '已驗證',
    copy: '複製優惠碼',
    copied: '已複製！',
    copyAria: '複製優惠碼 CECILIA010',
    visit: '前往 YesStyle',
    details: '優惠碼詳情',
    codeLabel: '優惠碼',
    discountLabel: '折扣力度',
    discountValueTemplate: '最高額外 {newDiscount}% 優惠（首購 {newDiscount}% / 複購 {returningDiscount}%）',
    fieldLabel: '輸入欄位',
    fieldValue: 'Reward Code',
    instructionsTitle: '如何使用 CECILIA010',
    instructions: [
      '複製 CECILIA010。',
      '前往 YesStyle 並將商品加入購物袋。',
      '結帳時，在 Reward Code 欄位輸入代碼。',
      '有效的促銷優惠碼請另外輸入 Coupon Code 欄位。',
      '付款前確認兩項優惠皆已套用。',
    ],
    note: '重要：CECILIA010 應輸入 Reward Code，而不是 Coupon Code。',
    faqTitle: '常見問題',
    faqs: [
      { question: '可以與其他優惠碼同時使用嗎？', answer: '可以。CECILIA010 請輸入 Reward Code，促銷優惠碼請輸入 Coupon Code。' },
      { question: '可享多少優惠？', answer: '依 YesStyle 當前條款及適用商品，可額外享有 {newDiscount}% 優惠。' },
    ],
    transparency: '此頁面可能包含聯盟連結。使用代碼或前往 YesStyle 不會增加您的費用，並可能支持 Em Casa com Cecília。',
  },
  'zh-hans': {
    locale: 'zh-hans',
    language: 'zh-Hans',
    titleTemplate: 'YesStyle 奖励码 CECILIA010：额外 {newDiscount}% 优惠',
    descriptionTemplate: '在 YesStyle 结账时使用奖励码 CECILIA010，可与有效优惠码叠加，额外享受 {newDiscount}% 优惠。',
    eyebrow: 'YesStyle 奖励码',
    introTemplate: 'CECILIA010 是奖励码，而非普通优惠码。请在 Reward Code 专用栏位输入，即可获得额外 {newDiscount}% 优惠。',
    updated: '已验证',
    copy: '复制优惠码',
    copied: '已复制！',
    copyAria: '复制优惠码 CECILIA010',
    visit: '前往 YesStyle',
    details: '优惠码详情',
    codeLabel: '优惠码',
    discountLabel: '折扣力度',
    discountValueTemplate: '最高额外 {newDiscount}% 优惠（首购 {newDiscount}% / 复购 {returningDiscount}%）',
    fieldLabel: '输入栏位',
    fieldValue: 'Reward Code',
    instructionsTitle: '如何使用 CECILIA010',
    instructions: [
      '复制 CECILIA010。',
      '前往 YesStyle 并将商品加入购物袋。',
      '结账时，在 Reward Code 栏位输入代码。',
      '有效促销优惠码请另外输入 Coupon Code 栏位。',
      '付款前确认两项优惠均已应用。',
    ],
    note: '重要：CECILIA010 应输入 Reward Code，而不是 Coupon Code。',
    faqTitle: '常见问题',
    faqs: [
      { question: '可以和其他优惠码一起使用吗？', answer: '可以。请将 CECILIA010 输入 Reward Code，将促销优惠码输入 Coupon Code。' },
      { question: '优惠是多少？', answer: '根据 YesStyle 当前条款及适用商品，可额外享受 {newDiscount}% 优惠。' },
    ],
    transparency: '此页面可能包含联盟链接。使用代码或访问 YesStyle 不会增加您的费用，并可能支持 Em Casa com Cecília。',
  },
};

export const yesStyleLocales = Object.keys(pages) as Locale[];

export function getYesStylePage(locale: string): PageCopy | null {
  return pages[locale as Locale] || null;
}

function fillPlaceholders(template: string, reward: ReturnType<typeof getPrimaryRewardCode>): string {
  return template
    .replace(/\{newDiscount\}/g, String(reward.newCustomerDiscount))
    .replace(/\{returningDiscount\}/g, String(reward.returningCustomerDiscount));
}

export function getYesStyleMetadata(locale: string): Metadata {
  const page = getYesStylePage(locale);
  if (!page) return {};
  const config = getYesStyleLocaleConfig(locale);
  const reward = getPrimaryRewardCode();
  const canonical = `https://emcasacomcecilia.com${config.rewardArticlePath}`;

  const title = fillPlaceholders(page.titleTemplate, reward);
  const description = fillPlaceholders(page.descriptionTemplate, reward);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: config.openGraphLocale,
      type: 'website',
    },
  };
}

export function YesStyleCouponPage({ locale }: { locale: string }) {
  const page = getYesStylePage(locale);
  if (!page) return null;

  const rewardCodeInfo = getPrimaryRewardCode();
  const date = new Date(rewardCodeInfo.verifiedAt).toLocaleDateString(page.language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const languageLinks = getRewardArticleLanguageLinks();

  const title = fillPlaceholders(page.titleTemplate, rewardCodeInfo);
  const description = fillPlaceholders(page.descriptionTemplate, rewardCodeInfo);
  const intro = fillPlaceholders(page.introTemplate, rewardCodeInfo);
  const discountValue = fillPlaceholders(page.discountValueTemplate, rewardCodeInfo);
  const faqs = page.faqs.map((faq) => ({
    question: faq.question,
    answer: fillPlaceholders(faq.answer, rewardCodeInfo),
  }));

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
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#ffd23f]">{page.eyebrow}</p>
              <h1 className="mt-2 font-heading text-3xl font-black leading-tight md:text-5xl">{title}</h1>
              <p className="mt-4 max-w-2xl text-white/78">{intro}</p>
              <p className="mt-4 text-xs text-white/55">{page.updated}: {date}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pt-8">
        <div className="mx-auto max-w-5xl">
          <LanguageSwitcher currentLocale={page.locale} links={languageLinks} />
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#111827] p-7 text-white shadow-large md:p-10">
          <p className="font-mono text-4xl font-black tracking-[.08em] md:text-6xl">{rewardCodeInfo.code}</p>
          <p className="mt-4 max-w-2xl text-white/85">{description}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CopyButton code={rewardCodeInfo.code} label={page.copy} copiedLabel={page.copied} ariaLabel={page.copyAria} />
            <a href={rewardCodeInfo.affiliateUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold hover:bg-white/15">
              {page.visit}
            </a>
          </div>
        </div>
      </section>

      <article className="bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl font-black text-[#0f1419]">{page.details}</h2>
          <dl className="mt-6 divide-y divide-black/8 rounded-2xl border border-black/8">
            <Detail label={page.codeLabel} value={rewardCodeInfo.code} />
            <Detail label={page.discountLabel} value={discountValue} />
            <Detail label={page.fieldLabel} value={page.fieldValue} />
          </dl>
          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">{page.instructionsTitle}</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-[#0f1419]/78">
            {page.instructions.map((item) => <li key={item}>{item}</li>)}
          </ol>
          <p className="mt-4 rounded-2xl border border-[#ff6b35]/25 bg-[#fff7ed] px-4 py-3 text-sm text-[#7c2d12]">{page.note}</p>
          <h2 className="mt-12 font-heading text-2xl font-black text-[#0f1419]">{page.faqTitle}</h2>
          <div className="mt-4"><FAQAccordion items={faqs} /></div>
          <div className="mt-14 rounded-2xl bg-[#fef9f3] p-6 text-sm leading-relaxed text-[#0f1419]/68">{page.transparency}</div>
        </div>
      </article>

      <CouponBottomBar coupon={rewardCodeInfo.code} cta={{ url: rewardCodeInfo.affiliateUrl, label: page.visit }} locale={page.locale} />
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
