import type { Locale } from '@/lib/i18n/locales';

export type TranslatedLocale = Exclude<Locale, 'pt'>;

// Textos do hub /cupons (PT) e de /<locale>/coupons. {percent} é trocado pelo desconto de recompensa da YesStyle.
export type CouponHubText = {
  title: string;
  lead: string;
  // "{before}<mês>{after}": o mês entra no <time>.
  validMonth: { before: string; after: string };
  featuredTitle: string;
  shelfTitle: string;
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  transparency: string;
  metaTitle: string;
};

export type CouponHubCopy = CouponHubText & {
  metaDescription: string;
  // Linha curta do cartão da YesStyle, sob o código de recompensa.
  yesstyleNote: string;
};

export const PT_COUPON_HUB_TEXT: CouponHubText = {
  title: 'Cupons da Cecília',
  lead: 'Copie o código aqui e cole no checkout da loja parceira.',
  validMonth: {
    before: 'Cupons válidos em ',
    after: '. A data do teste está na página de cada loja.',
  },
  featuredTitle: 'Destaques',
  shelfTitle: 'Outras lojas',
  faqTitle: 'Perguntas frequentes',
  faqs: [
    {
      question: 'Como funcionam os cupons e ofertas da Cecília?',
      answer:
        'Alguns benefícios usam códigos aplicados no checkout; outros são acessados diretamente pelo link indicado. A página de cada marca explica qual formato está ativo.',
    },
    {
      question: 'Os benefícios têm validade?',
      answer:
        'Cada cupom ou oferta tem sua própria regra. As páginas individuais indicam validade, última verificação e condições de uso quando essas informações existem.',
    },
    {
      question: 'Posso usar o mesmo benefício mais de uma vez?',
      answer:
        'Isso depende da regra da loja parceira. Se houver limite por CPF, código ou campanha, a condição aparece na página da marca, no carrinho ou no checkout.',
    },
    {
      question: 'O benefício é cumulativo com promoções da loja?',
      answer:
        'A possibilidade de acumular depende da marca, do formato da oferta e da campanha. O valor final exibido no carrinho ou checkout é a referência.',
    },
    {
      question: 'O que acontece se o benefício não funcionar?',
      answer:
        'Confira se o produto é elegível e, quando houver código, se ele foi digitado corretamente. Se ainda assim não funcionar, avise pelo contato do site para que a informação seja revisada.',
    },
    {
      question: 'Existe comissão de afiliado?',
      answer:
        'Alguns links podem gerar comissão para o Em Casa com Cecília, sem custo extra para você. Esse modelo ajuda a manter o conteúdo gratuito.',
    },
  ],
  transparency:
    'Alguns links podem gerar comissão para o Em Casa com Cecília, sem custo extra para você. Esse modelo ajuda a manter receitas, reviews e guias gratuitos, com transparência sobre as marcas parceiras.',
  metaTitle: 'Cupons da Cecília — Códigos de desconto ativos',
};

// Os 9 idiomas fora do PT.
export const COUPON_HUB_COPY: Record<TranslatedLocale, CouponHubCopy> = {
  en: {
    title: 'Coupons from Cecília',
    lead: 'Copy the code here and paste it at checkout on the partner store.',
    validMonth: {
      before: 'Coupons valid in ',
      after: '. Each store page shows when its offer was last checked.',
    },
    featuredTitle: 'Featured',
    shelfTitle: 'More stores',
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        question: 'How do the coupons and offers work?',
        answer:
          "Some benefits are codes you paste at checkout. Others open straight from the partner's link. Each store page explains which format applies.",
      },
      {
        question: 'Do the benefits expire?',
        answer:
          'Each code or offer has its own rules. Store pages show validity, the last check date and the conditions when that information exists.',
      },
      {
        question: "What if a code doesn't work?",
        answer:
          'Check that the product is eligible and that the code was typed correctly. If it still fails, tell us through the contact page so we can review the information.',
      },
    ],
    transparency:
      'Some links may earn a commission for Em Casa com Cecília, at no extra cost to you. This model helps keep our recipes, reviews and guides free, with transparency about partner brands.',
    metaTitle: 'Coupons from Cecília: active discount codes',
    metaDescription:
      'Active discount codes from partner stores: the discount on each code, its rules and whether it stacks with store promotions.',
    yesstyleNote: 'Up to {percent}% off your first order, in the Reward Code field.',
  },
  es: {
    title: 'Cupones de Cecília',
    lead: 'Copia el código aquí y pégalo al pagar en la tienda asociada.',
    validMonth: {
      before: 'Cupones válidos en ',
      after: '. En la página de cada tienda figura cuándo se comprobó la oferta por última vez.',
    },
    featuredTitle: 'Destacados',
    shelfTitle: 'Más tiendas',
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        question: '¿Cómo funcionan los cupones y las ofertas?',
        answer:
          'Algunos beneficios son códigos que se pegan al pagar. Otros se abren directamente desde el enlace del socio. La página de cada tienda explica qué formato se aplica.',
      },
      {
        question: '¿Los beneficios caducan?',
        answer:
          'Cada código u oferta tiene sus propias reglas. Las páginas de las tiendas muestran la validez, la fecha de la última comprobación y las condiciones cuando esa información existe.',
      },
      {
        question: '¿Qué hago si un código no funciona?',
        answer:
          'Comprueba que el producto sea apto y que hayas escrito bien el código. Si sigue sin funcionar, avísanos desde la página de contacto para que revisemos la información.',
      },
    ],
    transparency:
      'Algunos enlaces pueden generar una comisión para Em Casa com Cecília, sin coste adicional para ti. Este modelo ayuda a mantener gratuitas nuestras recetas, reseñas y guías, con transparencia sobre las marcas asociadas.',
    metaTitle: 'Cupones de Cecília: códigos de descuento activos',
    metaDescription:
      'Códigos de descuento activos de tiendas asociadas: el descuento de cada código, sus reglas y si se acumula con las promociones de la tienda.',
    yesstyleNote: 'Hasta un {percent}% de descuento en tu primer pedido, en el campo Reward Code.',
  },
  fr: {
    title: 'Codes promo de Cecília',
    lead: 'Copiez le code ici et collez-le au paiement sur la boutique partenaire.',
    validMonth: {
      before: 'Codes promo valables en ',
      after: ". La page de chaque boutique indique quand l'offre a été vérifiée pour la dernière fois.",
    },
    featuredTitle: 'À la une',
    shelfTitle: 'Autres boutiques',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        question: 'Comment fonctionnent les codes promo et les offres\u00a0?',
        answer:
          "Certains avantages sont des codes à coller au paiement. D'autres s'ouvrent directement depuis le lien du partenaire. La page de chaque boutique précise quel format s'applique.",
      },
      {
        question: 'Les avantages ont-ils une date de validité\u00a0?',
        answer:
          'Chaque code ou offre a ses propres règles. Les pages des boutiques indiquent la validité, la date de la dernière vérification et les conditions lorsque ces informations existent.',
      },
      {
        question: 'Que faire si un code ne fonctionne pas\u00a0?',
        answer:
          "Vérifiez que le produit est éligible et que le code a bien été saisi. Si cela ne fonctionne toujours pas, écrivez-nous via la page de contact afin que nous revoyions l'information.",
      },
    ],
    transparency:
      'Certains liens peuvent rapporter une commission à Em Casa com Cecília, sans surcoût pour vous. Ce modèle permet de garder nos recettes, avis et guides gratuits, en toute transparence sur les marques partenaires.',
    metaTitle: 'Codes promo de Cecília\u00a0: codes de réduction actifs',
    metaDescription:
      "Codes de réduction actifs de boutiques partenaires\u00a0: la remise de chaque code, ses règles et son éventuel cumul avec les promotions de la boutique.",
    yesstyleNote: "Jusqu'à {percent}\u00a0% de réduction sur votre première commande, dans le champ Reward Code.",
  },
  de: {
    title: 'Gutscheine von Cecília',
    lead: 'Kopieren Sie den Code hier und fügen Sie ihn im Shop des Partners an der Kasse ein.',
    validMonth: {
      before: 'Gutscheine gültig im ',
      after: '. Auf der Seite jedes Shops steht, wann das Angebot zuletzt geprüft wurde.',
    },
    featuredTitle: 'Highlights',
    shelfTitle: 'Weitere Shops',
    faqTitle: 'Häufige Fragen',
    faqs: [
      {
        question: 'Wie funktionieren die Gutscheine und Angebote?',
        answer:
          'Manche Vorteile sind Codes, die Sie an der Kasse einfügen. Andere öffnen sich direkt über den Link des Partners. Auf der Seite des jeweiligen Shops steht, welches Format gilt.',
      },
      {
        question: 'Laufen die Vorteile ab?',
        answer:
          'Jeder Code und jedes Angebot hat eigene Regeln. Die Shop-Seiten zeigen Gültigkeit, Datum der letzten Prüfung und die Bedingungen, sofern diese Angaben vorliegen.',
      },
      {
        question: 'Was tun, wenn ein Code nicht funktioniert?',
        answer:
          'Prüfen Sie, ob das Produkt teilnahmeberechtigt ist und ob Sie den Code richtig eingegeben haben. Funktioniert er weiterhin nicht, geben Sie uns über die Kontaktseite Bescheid, damit wir die Angaben prüfen.',
      },
    ],
    transparency:
      'Für manche Links erhält Em Casa com Cecília möglicherweise eine Provision, für Sie entstehen keine Mehrkosten. Dieses Modell hilft uns, Rezepte, Tests und Ratgeber kostenlos anzubieten, mit Transparenz über unsere Partnermarken.',
    metaTitle: 'Gutscheine von Cecília: aktive Rabattcodes',
    metaDescription:
      'Aktive Rabattcodes von Partner-Shops: der Rabatt jedes Codes, seine Regeln und ob er sich mit Aktionen des Shops kombinieren lässt.',
    yesstyleNote: 'Bis zu {percent}\u00a0% Rabatt auf Ihre erste Bestellung, im Feld Reward Code.',
  },
  it: {
    title: 'Coupon di Cecília',
    lead: 'Copia il codice qui e incollalo al checkout del negozio partner.',
    validMonth: {
      before: 'Coupon validi a ',
      after: ". La pagina di ogni negozio indica quando l'offerta è stata verificata l'ultima volta.",
    },
    featuredTitle: 'In evidenza',
    shelfTitle: 'Altri negozi',
    faqTitle: 'Domande frequenti',
    faqs: [
      {
        question: 'Come funzionano i coupon e le offerte?',
        answer:
          'Alcuni vantaggi sono codici da incollare al checkout. Altri si aprono direttamente dal link del partner. La pagina di ogni negozio spiega quale formato si applica.',
      },
      {
        question: 'I vantaggi hanno una scadenza?',
        answer:
          "Ogni codice o offerta ha le sue regole. Le pagine dei negozi mostrano la validità, la data dell'ultima verifica e le condizioni quando queste informazioni sono disponibili.",
      },
      {
        question: 'Cosa fare se un codice non funziona?',
        answer:
          'Controlla che il prodotto sia idoneo e che il codice sia stato digitato correttamente. Se continua a non funzionare, scrivici dalla pagina dei contatti così possiamo rivedere le informazioni.',
      },
    ],
    transparency:
      'Alcuni link possono generare una commissione per Em Casa com Cecília, senza costi aggiuntivi per te. Questo modello aiuta a mantenere gratuite le nostre ricette, recensioni e guide, con trasparenza sui marchi partner.',
    metaTitle: 'Coupon di Cecília: codici sconto attivi',
    metaDescription:
      'Codici sconto attivi dei negozi partner: lo sconto di ogni codice, le sue regole e se è cumulabile con le promozioni del negozio.',
    yesstyleNote: 'Fino al {percent}% di sconto sul primo ordine, nel campo Reward Code.',
  },
  ko: {
    title: 'Cecília의 쿠폰',
    lead: '여기서 코드를 복사해 제휴 스토어 결제 단계에서 붙여 넣으세요.',
    validMonth: {
      before: '쿠폰 유효 기간: ',
      after: '. 각 스토어 페이지에서 혜택을 마지막으로 확인한 날짜를 볼 수 있습니다.',
    },
    featuredTitle: '추천',
    shelfTitle: '더 많은 스토어',
    faqTitle: '자주 묻는 질문',
    faqs: [
      {
        question: '쿠폰과 혜택은 어떻게 이용하나요?',
        answer:
          '일부 혜택은 결제할 때 붙여 넣는 코드이고, 일부는 파트너 링크를 통해 바로 열립니다. 어떤 방식이 적용되는지는 각 스토어 페이지에 안내되어 있습니다.',
      },
      {
        question: '혜택에 유효 기간이 있나요?',
        answer:
          '코드와 혜택마다 규정이 다릅니다. 스토어 페이지에는 관련 정보가 있는 경우 유효 기간, 마지막 확인 날짜, 이용 조건이 표시됩니다.',
      },
      {
        question: '코드가 작동하지 않으면 어떻게 하나요?',
        answer:
          '상품이 대상에 포함되는지, 코드를 정확히 입력했는지 확인해 주세요. 그래도 안 되면 문의 페이지로 알려 주시면 정보를 검토하겠습니다.',
      },
    ],
    transparency:
      'Em Casa com Cecília는 일부 링크를 통해 수수료를 받을 수 있으며, 이용자에게 추가 비용은 없습니다. 이 방식 덕분에 레시피, 리뷰, 가이드를 무료로 제공할 수 있고, 제휴 브랜드에 대해서도 투명하게 안내합니다.',
    metaTitle: 'Cecília의 쿠폰: 사용 가능한 할인 코드',
    metaDescription:
      '제휴 스토어의 사용 가능한 할인 코드: 코드별 할인, 이용 규정, 스토어 프로모션과의 중복 적용 여부.',
    yesstyleNote: '첫 주문 시 최대 {percent}% 할인, Reward Code 칸에 입력하세요.',
  },
  ja: {
    title: 'Cecíliaのクーポン',
    lead: 'ここでコードをコピーして、提携ストアのチェックアウトで貼り付けてください。',
    validMonth: {
      before: 'クーポンの有効期間：',
      after: '。各ストアのページに、オファーを最後に確認した日が記載されています。',
    },
    featuredTitle: 'おすすめ',
    shelfTitle: 'その他のストア',
    faqTitle: 'よくある質問',
    faqs: [
      {
        question: 'クーポンとオファーはどのように使いますか？',
        answer:
          'チェックアウトで貼り付けるコードの特典もあれば、パートナーのリンクからそのまま開く特典もあります。どちらの形式かは各ストアのページで説明しています。',
      },
      {
        question: '特典に有効期限はありますか？',
        answer:
          'コードやオファーごとに条件が異なります。ストアのページには、情報がある場合に有効期限、最終確認日、利用条件を掲載しています。',
      },
      {
        question: 'コードが使えない場合はどうすればよいですか？',
        answer:
          '商品が対象になっているか、コードを正しく入力したかをご確認ください。それでも使えない場合は、お問い合わせページからお知らせください。内容を確認いたします。',
      },
    ],
    transparency:
      '一部のリンクから、Em Casa com Cecília が報酬を受け取ることがあります。お客様の追加負担はありません。この仕組みにより、レシピ、レビュー、ガイドを無料で提供でき、提携ブランドについても透明性を保っています。',
    metaTitle: 'Cecíliaのクーポン：利用できる割引コード',
    metaDescription:
      '提携ストアの利用できる割引コード。コードごとの割引、ルール、ストアのセールとの併用可否をまとめています。',
    yesstyleNote: '初回注文が最大{percent}%オフ。Reward Code 欄に入力してください。',
  },
  'zh-hant': {
    title: 'Cecília 的優惠碼',
    lead: '在這裡複製代碼，並在合作商店結帳時貼上。',
    validMonth: {
      before: '優惠碼有效月份：',
      after: '。各商店頁面會標示優惠最近一次的確認日期。',
    },
    featuredTitle: '精選',
    shelfTitle: '更多商店',
    faqTitle: '常見問題',
    faqs: [
      {
        question: '優惠碼和優惠如何使用？',
        answer:
          '有些優惠是結帳時貼上的代碼，有些則直接透過合作夥伴的連結開啟。各商店頁面會說明適用哪種形式。',
      },
      {
        question: '優惠有期限嗎？',
        answer:
          '每個代碼或優惠都有各自的規則。商店頁面在有相關資訊時，會顯示有效期限、最近確認日期和使用條件。',
      },
      {
        question: '代碼無法使用怎麼辦？',
        answer:
          '請確認商品符合資格，且代碼輸入正確。如果仍然無法使用，請透過聯絡頁面告訴我們，我們會重新確認資訊。',
      },
    ],
    transparency:
      '部分連結可能讓 Em Casa com Cecília 獲得佣金，你無需支付額外費用。這種方式讓我們的食譜、評測和指南得以保持免費，同時我們也會公開說明合作品牌。',
    metaTitle: 'Cecília 的優惠碼：目前有效的折扣碼',
    metaDescription:
      '合作商店目前有效的折扣碼：每個代碼的折扣、使用規則，以及能否與商店促銷活動合併使用。',
    yesstyleNote: '首筆訂單最高享 {percent}% 折扣，請填入 Reward Code 欄位。',
  },
  'zh-hans': {
    title: 'Cecília 的优惠码',
    lead: '在这里复制代码，并在合作商店结账时粘贴。',
    validMonth: {
      before: '优惠码有效月份：',
      after: '。各商店页面会标明优惠最近一次的确认日期。',
    },
    featuredTitle: '精选',
    shelfTitle: '更多商店',
    faqTitle: '常见问题',
    faqs: [
      {
        question: '优惠码和优惠如何使用？',
        answer:
          '有些优惠是结账时粘贴的代码，有些则直接通过合作伙伴的链接打开。各商店页面会说明适用哪种形式。',
      },
      {
        question: '优惠有期限吗？',
        answer:
          '每个代码或优惠都有各自的规则。商店页面在有相关信息时，会显示有效期限、最近确认日期和使用条件。',
      },
      {
        question: '代码无法使用怎么办？',
        answer:
          '请确认商品符合资格，且代码输入正确。如果仍然无法使用，请通过联系页面告诉我们，我们会重新核实信息。',
      },
    ],
    transparency:
      '部分链接可能让 Em Casa com Cecília 获得佣金，你无需支付额外费用。这种方式让我们的食谱、评测和指南得以保持免费，同时我们也会公开说明合作品牌。',
    metaTitle: 'Cecília 的优惠码：当前有效的折扣码',
    metaDescription:
      '合作商店当前有效的折扣码：每个代码的折扣、使用规则，以及能否与商店促销活动叠加使用。',
    yesstyleNote: '首单最高享 {percent}% 折扣，请填入 Reward Code 栏位。',
  },
};
