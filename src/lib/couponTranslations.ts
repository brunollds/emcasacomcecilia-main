import {
  getCouponBySlug,
  type CartPrint,
  type Coupon,
  type CouponCodeOffer,
  type CouponFAQ,
  type CouponReferral,
  type ProductLink,
  type StackingRow,
  type StoreVideo,
} from './couponsData';
import { LOCALE_KEYS, type Locale } from './i18n/locales';

export type TranslatedLocale = Exclude<Locale, 'pt'>;

export const TRANSLATED_LOCALES = LOCALE_KEYS.filter((locale): locale is TranslatedLocale => locale !== 'pt');

export const isTranslatedLocale = (value: string): value is TranslatedLocale =>
  (TRANSLATED_LOCALES as string[]).includes(value);

// Textos de uma loja em outro idioma. Códigos, datas e status continuam vindo do cupom em PT, então
// reconferir a oferta lá vale para todos os idiomas. O link principal também, salvo quando a loja tem
// um link internacional em COUPON_TRANSLATIONS. Texto do cupom em PT sem tradução fica fora da página
// do idioma: nunca vai a ela em português.
type OfferTranslationBase = {
  discount: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  metaTitle: string;
  metaDescription: string;
  eligibleCategories: string;
  validity: string;
  reusable: string;
  shipping: string;
  combinable: string;
  aboutBrand: string;
  brandLogoAlt: string;
  faqs: CouponFAQ[];
  // Os vídeos que a página do idioma mostra, com o título no idioma. Os do PT não passam para outro idioma: sem
  // este campo, a página fica sem a seção.
  videos?: StoreVideo[];
  // Só na loja com código de indicação e campanhas no cupom em PT (a SHEIN).
  referral?: Pick<CouponReferral, 'label' | 'instructions'>;
};

export type AffiliateOfferTranslation = OfferTranslationBase & {
  offerTypeLabel: string;
  offerTypeLabelPlural: string;
  offerActionLabel: string;
  linkInstructions: string[];
  linkNote: string;
  // Obrigatório quando o cupom em PT tem cutoutNote.
  cutoutNote?: string;
  // Obrigatório quando o cupom em PT tem productLinks: os mesmos endereços, na mesma ordem, com o nome e a descrição do
  // idioma.
  productLinks?: ProductLink[];
  // O print do site em inglês, com o alt e a legenda do idioma. Sem ele, a página do idioma fica sem print. O
  // `article` é o passo a passo no idioma da página.
  cartPrint?: CartPrint;
};

// Loja de código. Sem os campos opcionais, a página usa os textos padrão do idioma
// (couponStoreCopy): "cupom", os passos, o campo do checkout e "Conferido em" no lugar da
// validade e da seção "Como testamos".
export type CodeOfferTranslation = OfferTranslationBase & {
  offerTypeLabel?: string;
  offerTypeLabelPlural?: string;
  // Só com teste feito no site que a página do idioma abre (o global, não o /br).
  // O dia do teste que o testNote do idioma conta (a Hostinger fora do PT conta o do site global).
  testedAt?: string;
  testNote?: string;
  codeFieldLabel?: string;
  codeInstructions?: string[];
  monthlyHighlight?: CouponCodeOffer['monthlyHighlight'];
  // Só o que foi visto no site que a página do idioma abre: as linhas de "O que acumula" e o print do carrinho
  // em inglês, com o alt do idioma e o `article` do passo a passo no idioma. Sem eles, a tabela e o print ficam fora
  // da página.
  stacking?: StackingRow[];
  cartPrint?: CartPrint;
};

// Os prints do site em inglês (14/11/2026, sem login): a busca do us.shein.com com o 4CW5Y e o resumo do pedido do
// carrinho global da Hostinger, em dólar, com o SONAR20. Cada idioma leva o alt e, na SHEIN, a legenda.
const SHEIN_GLOBAL_PRINT = { src: '/images/reviews/shein/shein-busca-4cw5y-en.webp', aspectRatio: 4.9286 };
const HOSTINGER_GLOBAL_PRINT = { src: '/images/reviews/hostinger/cupom-hostinger-carrinho-com-cupom-en.webp', aspectRatio: 0.6737 };

// Francês e alemão separam o número do % com espaço, que não pode quebrar a linha.
const NBSP = '\u00a0';

// A SHEIN é uma loja só, mundial: o código de indicação e as campanhas valem em todo idioma. Fora do PT a página não
// põe os 50% de novos usuários no título de busca.
const SHEIN_TRANSLATIONS: Record<TranslatedLocale, AffiliateOfferTranslation> = {
  en: {
    discount: 'Promotions and discounts',
    offerTypeLabel: 'offer',
    offerTypeLabelPlural: 'offers',
    offerActionLabel: 'See offers on SHEIN',
    category: 'Fashion, accessories, beauty and home',
    shortDescription: 'main link, referral code and current campaigns',
    longDescription:
      "4CW5Y is Cecília's referral code: it opens a SHEIN selection with promotions and discounts. Open SHEIN through the link below, or copy the code and search for it in the app or website. Other campaigns are available below.",
    metaTitle: 'SHEIN referral code 4CW5Y and current campaigns',
    metaDescription:
      "Cecília's SHEIN referral code 4CW5Y opens a page of promotions and discounts: use the link or search 4CW5Y in the SHEIN app or website.",
    eligibleCategories: 'Fashion, accessories, beauty, home and other categories eligible in each campaign',
    validity: 'Links and campaigns may change; check the conditions shown by SHEIN',
    reusable: 'According to the rules SHEIN shows for each campaign',
    shipping: 'Calculated by SHEIN based on address, products and campaign',
    combinable: 'May vary by campaign, account and product; check the final price before paying',
    aboutBrand:
      "SHEIN is an international platform for fashion, accessories, beauty and home items. This page brings together Cecília's main link, the referral code provided through the partnership and campaigns that may change over time. Links to specific products belong in haul articles and reviews, because availability, price and stock vary from item to item. Purchases made through the links provided may earn Em Casa com Cecília a commission, at no extra cost to the buyer.",
    brandLogoAlt: 'SHEIN logo',
    faqs: [
      {
        question: 'Is 4CW5Y a SHEIN discount coupon?',
        answer:
          "It is not a checkout coupon. 4CW5Y is Cecília's referral code: searched on SHEIN, it opens a page with a selection of products, promotions and discounts, and SHEIN decides how much and on which items. Open SHEIN through the link on this page, or copy 4CW5Y and search for it in the SHEIN app or website.",
      },
      {
        question: 'Do I need to copy and paste 4CW5Y?',
        answer:
          "You never paste it at checkout. The 4CW5Y selection, with its promotions and discounts, appears when you search for the code in the SHEIN app or website. Cecília's link on this page opens SHEIN with the current campaigns.",
      },
      {
        question: 'What is the code 37S3442 on SHEIN?',
        answer:
          '37S3442 is the search code for the current campaign on selected products. The discounts are for a limited time and may vary by item.',
      },
      {
        question: 'Who can use the code K49L457?',
        answer:
          'The K49L457 campaign advertises a 50% coupon for new users only. SHEIN confirms eligibility and the final discount on your account and at checkout.',
      },
      {
        question: 'Are SHEIN links and codes permanent?',
        answer:
          'No. The main link and the campaigns are rechecked, but SHEIN may reissue links, end campaigns or change conditions. The verification date on this page shows when the data was last reviewed.',
      },
      {
        question: 'Does buying through the links earn Cecília a commission?',
        answer:
          'It may. SHEIN may pay Em Casa com Cecília a commission on purchases attributed to the partnership links, at no extra cost to the buyer.',
      },
    ],
    linkInstructions: [
      "Open SHEIN through Cecília's main link.",
      'To use the referral code, copy 4CW5Y and search for it in the SHEIN app or website: it opens a page of promotions and discounts.',
      'For a specific campaign, use the search code or the matching button on this page.',
      'Check eligibility, products and deadlines directly on SHEIN.',
      'Check the final price before completing your purchase.',
    ],
    cartPrint: {
      ...SHEIN_GLOBAL_PRINT,
      article: 'shein-referral-code-where-to-enter',
      alt: 'SHEIN website search bar with the code 4CW5Y typed in',
      caption: 'Example of 4CW5Y in the SHEIN search, which is where the referral code goes. The search opens a promotions page, and SHEIN sets the discount on each item.',
    },
    linkNote:
      "Cecília's link opens SHEIN with the current campaigns. The 4CW5Y selection and the campaign codes appear when you search for them in the SHEIN app or website, not at checkout; check the discount on each item before paying.",
    referral: {
      label: "Cecília's referral code",
      instructions: 'Copy 4CW5Y and search for it in the SHEIN app or website: it opens a selection of products with promotions and discounts chosen by SHEIN.',
    },
  },
  es: {
    discount: 'Promociones y descuentos',
    offerTypeLabel: 'oferta',
    offerTypeLabelPlural: 'ofertas',
    offerActionLabel: 'Ver ofertas en SHEIN',
    category: 'Moda, accesorios, belleza y hogar',
    shortDescription: 'enlace principal, código de referido y campañas vigentes',
    longDescription:
      'El 4CW5Y es el código de referido de Cecília: abre una selección de SHEIN con promociones y descuentos. Entra con el enlace de abajo, o copia el código y búscalo en la app o en la web. Más abajo hay otras campañas.',
    metaTitle: 'SHEIN: código de referido 4CW5Y y campañas vigentes',
    metaDescription:
      'El código de referido 4CW5Y de Cecília abre una página de promociones y descuentos de SHEIN: usa el enlace o busca 4CW5Y en la app o en la web.',
    eligibleCategories: 'Moda, accesorios, belleza, hogar y otras categorías válidas en cada campaña',
    validity: 'Enlaces y campañas sujetos a cambios; consulta las condiciones que muestra SHEIN',
    reusable: 'Según las reglas que SHEIN indica en cada campaña',
    shipping: 'Lo calcula SHEIN según la dirección, los productos y la campaña',
    combinable: 'Puede variar según la campaña, la cuenta y el producto; comprueba el precio final antes de pagar',
    aboutBrand:
      'SHEIN es una plataforma internacional de moda, accesorios, belleza y artículos para el hogar. Esta página reúne el enlace principal de Cecília, el código de referido facilitado por la colaboración y campañas que pueden cambiar con el tiempo. Los enlaces a productos concretos están en los artículos de haul y en las reseñas, porque la disponibilidad, el precio y el stock varían según la prenda. Las compras hechas con los enlaces indicados pueden generar una comisión para Em Casa com Cecília, sin coste adicional para quien compra.',
    brandLogoAlt: 'Logotipo de SHEIN',
    faqs: [
      {
        question: '¿El código 4CW5Y es un cupón de descuento de SHEIN?',
        answer:
          'No es un cupón para el pago: el 4CW5Y es el código de referido de Cecília. Al buscarlo en SHEIN, abre una página con una selección de productos, promociones y descuentos; cuánto y en qué artículos lo decide SHEIN. Entra con el enlace de esta página, o copia el 4CW5Y y búscalo en la app o en la web de SHEIN.',
      },
      {
        question: '¿Tengo que copiar y pegar el 4CW5Y?',
        answer:
          'Nunca se pega al pagar. La selección del 4CW5Y, con sus promociones y descuentos, aparece al buscar el código en la app o en la web de SHEIN. El enlace de Cecília de esta página abre SHEIN con las campañas vigentes.',
      },
      {
        question: '¿Qué es el código 37S3442 en SHEIN?',
        answer:
          '37S3442 es el código de búsqueda de la campaña vigente de productos seleccionados. Los descuentos son por tiempo limitado y pueden variar según el artículo.',
      },
      {
        question: '¿Quién puede usar el código K49L457?',
        answer:
          'La campaña K49L457 anuncia un cupón del 50% solo para nuevos usuarios. SHEIN confirma la elegibilidad y el descuento final en la cuenta y al pagar.',
      },
      {
        question: '¿Los enlaces y códigos de SHEIN son permanentes?',
        answer:
          'No. El enlace principal y las campañas se vuelven a comprobar, pero SHEIN puede reemitir enlaces, terminar campañas o cambiar las condiciones. La fecha de verificación de esta página indica cuándo se revisaron los datos.',
      },
      {
        question: '¿Comprar con los enlaces genera una comisión para Cecília?',
        answer:
          'Puede generarla. SHEIN puede pagar una comisión a Em Casa com Cecília por las compras atribuidas a los enlaces de la colaboración, sin coste adicional para quien compra.',
      },
    ],
    linkInstructions: [
      'Abre SHEIN con el enlace principal de Cecília.',
      'Para usar el código de referido, copia el 4CW5Y y búscalo en la app o en la web de SHEIN: abre una página de promociones y descuentos.',
      'Para una campaña concreta, usa el código de búsqueda o el botón correspondiente de esta página.',
      'Consulta la elegibilidad, los productos y el plazo directamente en SHEIN.',
      'Comprueba el precio final antes de completar la compra.',
    ],
    cartPrint: {
      ...SHEIN_GLOBAL_PRINT,
      article: 'codigo-de-referido-shein-donde-ponerlo',
      alt: 'Barra de búsqueda del sitio de SHEIN con el código 4CW5Y escrito',
      caption: 'Ejemplo del 4CW5Y en la búsqueda de SHEIN, que es donde entra el código de referido. La búsqueda abre una página de promociones, y el descuento de cada artículo lo define SHEIN.',
    },
    linkNote:
      'El enlace de Cecília abre SHEIN con las campañas vigentes. La selección del 4CW5Y y los códigos de campaña aparecen al buscarlos en la app o en la web de SHEIN, no al pagar; mira el descuento de cada artículo antes de pagar.',
    referral: {
      label: 'Código de referido de Cecília',
      instructions: 'Copia el 4CW5Y y búscalo en la app o en la web de SHEIN: abre una selección de productos con promociones y descuentos elegidos por SHEIN.',
    },
  },
  fr: {
    discount: `Promotions et réductions`,
    offerTypeLabel: 'offre',
    offerTypeLabelPlural: 'offres',
    offerActionLabel: 'Voir les offres SHEIN',
    category: 'Mode, accessoires, beauté et maison',
    shortDescription: 'lien principal, code de parrainage et campagnes en cours',
    longDescription:
      `4CW5Y est le code de parrainage de Cecília${NBSP}: il ouvre une sélection SHEIN avec des promotions et des réductions. Passez par le lien ci-dessous, ou copiez le code et recherchez-le dans l'appli ou sur le site. D'autres campagnes sont disponibles plus bas.`,
    metaTitle: `SHEIN${NBSP}: code de parrainage 4CW5Y et campagnes en cours`,
    metaDescription:
      `Le code de parrainage 4CW5Y de Cecília ouvre une page de promotions et de réductions SHEIN${NBSP}: utilisez le lien ou recherchez 4CW5Y dans l'appli ou sur le site.`,
    eligibleCategories: 'Mode, accessoires, beauté, maison et autres catégories éligibles selon la campagne',
    validity: `Liens et campagnes susceptibles de changer${NBSP}; vérifiez les conditions affichées par SHEIN`,
    reusable: 'Selon les règles indiquées par SHEIN pour chaque campagne',
    shipping: "Calculée par SHEIN selon l'adresse, les produits et la campagne",
    combinable: `Peut varier selon la campagne, le compte et le produit${NBSP}; vérifiez le prix final avant de payer`,
    aboutBrand:
      "SHEIN est une plateforme internationale de mode, d'accessoires, de beauté et d'articles pour la maison. Cette page réunit le lien principal de Cecília, le code de parrainage fourni par le partenariat et des campagnes qui peuvent évoluer. Les liens vers des produits précis se trouvent dans les articles de haul et les avis, car la disponibilité, le prix et le stock varient d'une pièce à l'autre. Les achats effectués via les liens indiqués peuvent rapporter une commission à Em Casa com Cecília, sans surcoût pour l'acheteur.",
    brandLogoAlt: 'Logo SHEIN',
    faqs: [
      {
        question: `Le code 4CW5Y est-il un code promo SHEIN${NBSP}?`,
        answer: `Ce n'est pas un code à saisir au paiement${NBSP}: 4CW5Y est le code de parrainage de Cecília. Recherché sur SHEIN, il ouvre une page avec une sélection de produits, de promotions et de réductions${NBSP}; le montant et les articles concernés sont décidés par SHEIN. Passez par le lien de cette page, ou copiez 4CW5Y et recherchez-le dans l'appli ou sur le site SHEIN.`,
      },
      {
        question: `Faut-il copier et coller 4CW5Y${NBSP}?`,
        answer:
          `Il ne se colle jamais au paiement. La sélection 4CW5Y, avec ses promotions et ses réductions, s'affiche quand vous recherchez le code dans l'appli ou sur le site SHEIN. Le lien de Cecília sur cette page ouvre SHEIN avec les campagnes en cours.`,
      },
      {
        question: `Que signifie le code 37S3442 sur SHEIN${NBSP}?`,
        answer:
          "37S3442 est le code de recherche de la campagne en cours sur une sélection de produits. Les réductions sont limitées dans le temps et peuvent varier selon l'article.",
      },
      {
        question: `Qui peut utiliser le code K49L457${NBSP}?`,
        answer: `La campagne K49L457 annonce un bon de réduction de 50${NBSP}% réservé aux nouveaux utilisateurs. SHEIN confirme l'éligibilité et la réduction finale dans le compte et au moment du paiement.`,
      },
      {
        question: `Les liens et codes SHEIN sont-ils permanents${NBSP}?`,
        answer:
          'Non. Le lien principal et les campagnes sont revérifiés, mais SHEIN peut réémettre des liens, arrêter des campagnes ou modifier les conditions. La date de vérification de cette page indique quand les données ont été revues.',
      },
      {
        question: `Acheter via les liens rapporte-t-il une commission à Cecília${NBSP}?`,
        answer:
          "C'est possible. SHEIN peut verser une commission à Em Casa com Cecília pour les achats attribués aux liens du partenariat, sans surcoût pour l'acheteur.",
      },
    ],
    linkInstructions: [
      'Ouvrez SHEIN via le lien principal de Cecília.',
      `Pour utiliser le code de parrainage, copiez 4CW5Y et recherchez-le dans l'appli ou sur le site SHEIN${NBSP}: il ouvre une page de promotions et de réductions.`,
      'Pour une campagne précise, utilisez le code de recherche ou le bouton correspondant sur cette page.',
      "Vérifiez l'éligibilité, les produits et les délais directement sur SHEIN.",
      "Vérifiez le prix final avant de finaliser l'achat.",
    ],
    cartPrint: {
      ...SHEIN_GLOBAL_PRINT,
      article: 'code-de-parrainage-shein-ou-le-mettre',
      alt: 'Barre de recherche du site SHEIN avec le code 4CW5Y saisi',
      caption: 'Exemple de 4CW5Y dans la recherche SHEIN, là où se saisit le code de parrainage. La recherche ouvre une page de promotions, et c’est SHEIN qui fixe la réduction de chaque article.',
    },
    linkNote: `Le lien de Cecília ouvre SHEIN avec les campagnes en cours. La sélection 4CW5Y et les codes de campagne s'affichent quand vous les recherchez dans l'appli ou sur le site SHEIN, pas au paiement${NBSP}; vérifiez la réduction de chaque article avant de payer.`,
    referral: {
      label: 'Code de parrainage de Cecília',
      instructions: `Copiez 4CW5Y et recherchez-le dans l'appli ou sur le site SHEIN${NBSP}: il ouvre une sélection de produits avec des promotions et des réductions choisies par SHEIN.`,
    },
  },
  de: {
    discount: 'Aktionen und Rabatte',
    offerTypeLabel: 'Angebot',
    offerTypeLabelPlural: 'Angebote',
    offerActionLabel: 'Angebote bei SHEIN ansehen',
    category: 'Mode, Accessoires, Beauty und Wohnen',
    shortDescription: 'Hauptlink, Empfehlungscode und aktuelle Aktionen',
    longDescription:
      '4CW5Y ist Cecílias Empfehlungscode: Er öffnet eine SHEIN-Auswahl mit Aktionen und Rabatten. Nutzen Sie den Link unten, oder kopieren Sie den Code und suchen Sie in der App oder auf der Website danach. Weitere Aktionen finden Sie weiter unten.',
    metaTitle: 'SHEIN: Empfehlungscode 4CW5Y und aktuelle Aktionen',
    metaDescription:
      'Cecílias Empfehlungscode 4CW5Y öffnet eine SHEIN-Seite mit Aktionen und Rabatten: Nutzen Sie den Link oder suchen Sie 4CW5Y in der App oder auf der Website.',
    eligibleCategories: 'Mode, Accessoires, Beauty, Wohnen und weitere Kategorien, die in der jeweiligen Aktion gelten',
    validity: 'Links und Aktionen können sich ändern; prüfen Sie die Bedingungen, die SHEIN anzeigt',
    reusable: 'Nach den Regeln, die SHEIN für die jeweilige Aktion angibt',
    shipping: 'Berechnet von SHEIN je nach Adresse, Produkten und Aktion',
    combinable: 'Kann je nach Aktion, Konto und Produkt variieren; prüfen Sie den Endpreis vor dem Bezahlen',
    aboutBrand:
      'SHEIN ist eine internationale Plattform für Mode, Accessoires, Beauty und Wohnartikel. Diese Seite bündelt Cecílias Hauptlink, den Empfehlungscode aus der Partnerschaft und Aktionen, die sich mit der Zeit ändern können. Links zu einzelnen Produkten gehören in Haul-Artikel und Tests, weil Verfügbarkeit, Preis und Bestand von Teil zu Teil variieren. Käufe über die angegebenen Links können Em Casa com Cecília eine Provision einbringen – ohne Mehrkosten für Sie.',
    brandLogoAlt: 'SHEIN-Logo',
    faqs: [
      {
        question: 'Ist 4CW5Y ein SHEIN-Gutscheincode?',
        answer:
          'Es ist kein Code für die Kasse: 4CW5Y ist Cecílias Empfehlungscode. Bei SHEIN gesucht, öffnet er eine Seite mit ausgewählten Produkten, Aktionen und Rabatten; wie viel und auf welche Artikel, entscheidet SHEIN. Öffnen Sie SHEIN über den Link auf dieser Seite, oder kopieren Sie 4CW5Y und suchen Sie in der SHEIN-App oder auf der Website danach.',
      },
      {
        question: 'Muss ich 4CW5Y kopieren und einfügen?',
        answer:
          'An der Kasse wird er nie eingefügt. Die 4CW5Y-Auswahl mit ihren Aktionen und Rabatten erscheint, wenn Sie den Code in der SHEIN-App oder auf der Website suchen. Cecílias Link auf dieser Seite öffnet SHEIN mit den aktuellen Aktionen.',
      },
      {
        question: 'Was ist der Code 37S3442 bei SHEIN?',
        answer:
          '37S3442 ist der Suchcode der aktuellen Aktion für ausgewählte Produkte. Die Rabatte sind zeitlich begrenzt und können je nach Artikel variieren.',
      },
      {
        question: 'Wer kann den Code K49L457 nutzen?',
        answer:
          'Die Aktion K49L457 bewirbt einen 50-%-Gutschein nur für Neukunden. Ob Sie berechtigt sind und wie hoch der Rabatt am Ende ist, bestätigt SHEIN im Konto und an der Kasse.',
      },
      {
        question: 'Sind die SHEIN-Links und -Codes dauerhaft gültig?',
        answer:
          'Nein. Der Hauptlink und die Aktionen werden erneut geprüft, aber SHEIN kann Links neu ausgeben, Aktionen beenden oder Bedingungen ändern. Das Prüfdatum auf dieser Seite zeigt, wann die Angaben zuletzt kontrolliert wurden.',
      },
      {
        question: 'Bekommt Cecília eine Provision, wenn ich über die Links kaufe?',
        answer:
          'Das ist möglich. SHEIN kann Em Casa com Cecília eine Provision für Käufe zahlen, die den Partnerlinks zugeordnet werden – ohne Mehrkosten für Sie.',
      },
    ],
    linkInstructions: [
      'Öffnen Sie SHEIN über Cecílias Hauptlink.',
      'Für den Empfehlungscode kopieren Sie 4CW5Y und suchen in der SHEIN-App oder auf der Website danach: Es öffnet sich eine Seite mit Aktionen und Rabatten.',
      'Für eine bestimmte Aktion nutzen Sie den Suchcode oder den passenden Button auf dieser Seite.',
      'Prüfen Sie Berechtigung, Produkte und Laufzeit direkt bei SHEIN.',
      'Prüfen Sie den Endpreis, bevor Sie den Kauf abschließen.',
    ],
    cartPrint: {
      ...SHEIN_GLOBAL_PRINT,
      article: 'shein-empfehlungscode-wo-eingeben',
      alt: 'Suchleiste der SHEIN-Website mit dem eingegebenen Code 4CW5Y',
      caption: 'Beispiel für 4CW5Y in der SHEIN-Suche, wo der Empfehlungscode eingegeben wird. Die Suche öffnet eine Aktionsseite, und den Rabatt auf jeden Artikel legt SHEIN fest.',
    },
    linkNote:
      'Cecílias Link öffnet SHEIN mit den aktuellen Aktionen. Die 4CW5Y-Auswahl und die Aktionscodes erscheinen, wenn Sie in der SHEIN-App oder auf der Website danach suchen, nicht an der Kasse; prüfen Sie vor dem Bezahlen den Rabatt jedes Artikels.',
    referral: {
      label: 'Cecílias Empfehlungscode',
      instructions: 'Kopieren Sie 4CW5Y und suchen Sie in der SHEIN-App oder auf der Website danach: Es öffnet sich eine Auswahl von Produkten mit Aktionen und Rabatten, die SHEIN festlegt.',
    },
  },
  it: {
    discount: 'Promozioni e sconti',
    offerTypeLabel: 'offerta',
    offerTypeLabelPlural: 'offerte',
    offerActionLabel: 'Vedi le offerte SHEIN',
    category: 'Moda, accessori, bellezza e casa',
    shortDescription: 'link principale, codice invito e campagne in corso',
    longDescription:
      "4CW5Y è il codice invito di Cecília: apre una selezione SHEIN con promozioni e sconti. Usa il link qui sotto, oppure copia il codice e cercalo nell'app o sul sito. Altre campagne sono disponibili più in basso.",
    metaTitle: 'SHEIN: codice invito 4CW5Y e campagne in corso',
    metaDescription:
      "Il codice invito 4CW5Y di Cecília apre una pagina SHEIN di promozioni e sconti: usa il link o cerca 4CW5Y nell'app o sul sito.",
    eligibleCategories: 'Moda, accessori, bellezza, casa e altre categorie valide in ogni campagna',
    validity: 'Link e campagne possono cambiare; controlla le condizioni mostrate da SHEIN',
    reusable: 'Secondo le regole indicate da SHEIN per ogni campagna',
    shipping: 'Calcolata da SHEIN in base a indirizzo, prodotti e campagna',
    combinable: 'Può variare per campagna, account e prodotto; controlla il prezzo finale prima di pagare',
    aboutBrand:
      'SHEIN è una piattaforma internazionale di moda, accessori, bellezza e articoli per la casa. Questa pagina raccoglie il link principale di Cecília, il codice invito fornito dalla collaborazione e campagne che possono cambiare nel tempo. I link ai singoli prodotti si trovano negli articoli di haul e nelle recensioni, perché disponibilità, prezzo e scorte variano da capo a capo. Gli acquisti fatti con i link indicati possono generare una commissione per Em Casa com Cecília, senza costi aggiuntivi per chi compra.',
    brandLogoAlt: 'Logo SHEIN',
    faqs: [
      {
        question: 'Il codice 4CW5Y è un coupon sconto SHEIN?',
        answer:
          "Non è un coupon da inserire al pagamento: 4CW5Y è il codice invito di Cecília. Cercato su SHEIN, apre una pagina con una selezione di prodotti, promozioni e sconti; quanto e su quali articoli lo decide SHEIN. Apri SHEIN con il link di questa pagina, oppure copia 4CW5Y e cercalo nell'app o sul sito SHEIN.",
      },
      {
        question: 'Devo copiare e incollare 4CW5Y?',
        answer:
          "Non si incolla mai al pagamento. La selezione di 4CW5Y, con le sue promozioni e i suoi sconti, compare cercando il codice nell'app o sul sito SHEIN. Il link di Cecília in questa pagina apre SHEIN con le campagne in corso.",
      },
      {
        question: "Cos'è il codice 37S3442 su SHEIN?",
        answer:
          "37S3442 è il codice di ricerca della campagna in corso sui prodotti selezionati. Gli sconti sono a tempo limitato e possono variare in base all'articolo.",
      },
      {
        question: 'Chi può usare il codice K49L457?',
        answer:
          "La campagna K49L457 annuncia un coupon del 50% solo per i nuovi utenti. SHEIN conferma l'idoneità e lo sconto finale nell'account e al checkout.",
      },
      {
        question: 'I link e i codici SHEIN sono permanenti?',
        answer:
          'No. Il link principale e le campagne vengono ricontrollati, ma SHEIN può riemettere link, chiudere campagne o cambiare le condizioni. La data di verifica di questa pagina indica quando i dati sono stati controllati.',
      },
      {
        question: 'Comprare dai link genera una commissione per Cecília?',
        answer:
          'Può succedere. SHEIN può pagare una commissione a Em Casa com Cecília per gli acquisti attribuiti ai link della collaborazione, senza costi aggiuntivi per chi compra.',
      },
    ],
    linkInstructions: [
      'Apri SHEIN con il link principale di Cecília.',
      "Per usare il codice invito, copia 4CW5Y e cercalo nell'app o sul sito SHEIN: si apre una pagina di promozioni e sconti.",
      'Per una campagna specifica, usa il codice di ricerca o il pulsante corrispondente in questa pagina.',
      'Controlla idoneità, prodotti e scadenze direttamente su SHEIN.',
      "Verifica il prezzo finale prima di completare l'acquisto.",
    ],
    cartPrint: {
      ...SHEIN_GLOBAL_PRINT,
      article: 'codice-invito-shein-dove-inserirlo',
      alt: 'Barra di ricerca del sito SHEIN con il codice 4CW5Y digitato',
      caption: 'Esempio di 4CW5Y nella ricerca di SHEIN, che è dove si inserisce il codice invito. La ricerca apre una pagina di promozioni, e lo sconto su ogni articolo lo decide SHEIN.',
    },
    linkNote:
      "Il link di Cecília apre SHEIN con le campagne in corso. La selezione di 4CW5Y e i codici di campagna compaiono cercandoli nell'app o sul sito SHEIN, non al pagamento; controlla lo sconto di ogni articolo prima di pagare.",
    referral: {
      label: 'Codice invito di Cecília',
      instructions: "Copia 4CW5Y e cercalo nell'app o sul sito SHEIN: si apre una selezione di prodotti con promozioni e sconti scelti da SHEIN.",
    },
  },
  ko: {
    discount: '프로모션과 할인',
    offerTypeLabel: '혜택',
    offerTypeLabelPlural: '혜택',
    offerActionLabel: 'SHEIN 혜택 보기',
    category: '패션, 액세서리, 뷰티, 홈',
    shortDescription: '메인 링크, 추천 코드, 진행 중인 캠페인',
    longDescription:
      '4CW5Y는 Cecília의 추천 코드로, 프로모션과 할인이 있는 SHEIN 상품 모음이 열립니다. 아래 링크를 이용하거나, 코드를 복사해 앱이나 웹사이트에서 검색하세요. 다른 캠페인은 아래에서 확인할 수 있습니다.',
    metaTitle: 'SHEIN 추천 코드 4CW5Y와 진행 중인 캠페인',
    metaDescription:
      'Cecília의 추천 코드 4CW5Y로 SHEIN 프로모션·할인 페이지가 열립니다. 링크를 이용하거나 앱 또는 웹사이트에서 4CW5Y를 검색하세요.',
    eligibleCategories: '패션, 액세서리, 뷰티, 홈 및 캠페인별 대상 카테고리',
    validity: '링크와 캠페인은 변경될 수 있으니 SHEIN에 표시된 조건을 확인하세요',
    reusable: '캠페인마다 SHEIN이 안내하는 규칙에 따름',
    shipping: '주소, 상품, 캠페인에 따라 SHEIN이 계산',
    combinable: '캠페인, 계정, 상품에 따라 다를 수 있으니 결제 전에 최종 금액을 확인하세요',
    aboutBrand:
      'SHEIN은 패션, 액세서리, 뷰티, 홈 제품을 다루는 글로벌 플랫폼입니다. 이 페이지에는 Cecília의 메인 링크, 파트너십에서 제공한 추천 코드, 시기에 따라 바뀔 수 있는 캠페인을 모았습니다. 개별 상품 링크는 하울 글과 리뷰에 있습니다. 상품마다 재고, 가격, 판매 여부가 다르기 때문입니다. 안내된 링크로 구매하면 Em Casa com Cecília가 수수료를 받을 수 있으며, 구매자에게 추가 비용은 없습니다.',
    brandLogoAlt: 'SHEIN 로고',
    faqs: [
      {
        question: '4CW5Y는 SHEIN 할인 쿠폰인가요?',
        answer:
          '결제 단계에서 입력하는 쿠폰은 아닙니다. 4CW5Y는 Cecília의 추천 코드로, SHEIN에서 검색하면 일부 상품과 프로모션, 할인을 모은 페이지가 열립니다. 할인 폭과 대상 상품은 SHEIN이 정합니다. 이 페이지의 링크로 접속하거나, 4CW5Y를 복사해 SHEIN 앱이나 웹사이트에서 검색하세요.',
      },
      {
        question: '4CW5Y를 복사해서 붙여 넣어야 하나요?',
        answer:
          '결제 단계에 붙여 넣는 코드가 아닙니다. 4CW5Y의 프로모션과 할인 상품은 SHEIN 앱이나 웹사이트에서 코드를 검색하면 나타납니다. 이 페이지의 Cecília 링크는 진행 중인 캠페인과 함께 SHEIN을 엽니다.',
      },
      {
        question: 'SHEIN의 37S3442 코드는 무엇인가요?',
        answer: '37S3442는 일부 상품 대상으로 진행 중인 캠페인의 검색 코드입니다. 할인은 기간 한정이며 상품에 따라 달라질 수 있습니다.',
      },
      {
        question: 'K49L457 코드는 누가 사용할 수 있나요?',
        answer:
          'K49L457 캠페인은 신규 회원 전용 50% 쿠폰을 안내합니다. 대상 여부와 최종 할인은 SHEIN이 계정과 결제 단계에서 확인합니다.',
      },
      {
        question: 'SHEIN 링크와 코드는 계속 유효한가요?',
        answer:
          '아니요. 메인 링크와 캠페인은 다시 확인하지만, SHEIN이 링크를 새로 발급하거나 캠페인을 종료하거나 조건을 바꿀 수 있습니다. 이 페이지의 확인 날짜는 정보를 마지막으로 점검한 날입니다.',
      },
      {
        question: '링크로 구매하면 Cecília가 수수료를 받나요?',
        answer:
          '받을 수 있습니다. SHEIN은 파트너십 링크로 연결된 구매에 대해 Em Casa com Cecília에 수수료를 지급할 수 있으며, 구매자에게 추가 비용은 없습니다.',
      },
    ],
    linkInstructions: [
      'Cecília의 메인 링크로 SHEIN을 여세요.',
      '추천 코드를 사용하려면 4CW5Y를 복사해 SHEIN 앱이나 웹사이트에서 검색하세요. 프로모션과 할인 페이지가 열립니다.',
      '특정 캠페인은 이 페이지의 검색 코드나 해당 버튼을 이용하세요.',
      '대상 여부, 상품, 기간은 SHEIN에서 직접 확인하세요.',
      '구매를 완료하기 전에 최종 금액을 확인하세요.',
    ],
    cartPrint: {
      ...SHEIN_GLOBAL_PRINT,
      article: 'shein-referral-code-ko',
      alt: '4CW5Y 코드를 입력한 SHEIN 웹사이트 검색창',
      caption: 'SHEIN 검색창에 4CW5Y를 입력한 예시입니다. 추천 코드는 여기에 입력합니다. 검색하면 프로모션 페이지가 열리며, 상품별 할인은 SHEIN이 정합니다.',
    },
    linkNote:
      'Cecília의 링크는 진행 중인 캠페인과 함께 SHEIN을 엽니다. 4CW5Y 상품과 캠페인 코드는 SHEIN 앱이나 웹사이트에서 검색하면 나타나며, 결제 단계에서 입력하지 않습니다. 결제 전에 상품별 할인을 확인하세요.',
    referral: {
      label: 'Cecília의 추천 코드',
      instructions: '4CW5Y를 복사해 SHEIN 앱이나 웹사이트에서 검색하세요. SHEIN이 정한 프로모션과 할인이 적용된 상품 페이지가 열립니다.',
    },
  },
  ja: {
    discount: 'セールと割引',
    offerTypeLabel: 'オファー',
    offerTypeLabelPlural: 'オファー',
    offerActionLabel: 'SHEIN のオファーを見る',
    category: 'ファッション、アクセサリー、コスメ、インテリア',
    shortDescription: 'メインリンク、紹介コード、開催中のキャンペーン',
    longDescription:
      '4CW5Y は Cecília の紹介コードで、プロモーションと割引のある SHEIN のセレクションが開きます。下のリンクを使うか、コードをコピーしてアプリまたはサイトで検索してください。ほかのキャンペーンは下にあります。',
    metaTitle: 'SHEIN の紹介コード 4CW5Y と開催中のキャンペーン',
    metaDescription:
      'Cecília の紹介コード 4CW5Y で、SHEIN のプロモーション・割引ページが開きます。リンクを使うか、アプリまたはサイトで 4CW5Y を検索してください。',
    eligibleCategories: 'ファッション、アクセサリー、コスメ、インテリアほか、キャンペーンごとの対象カテゴリー',
    validity: 'リンクとキャンペーンは変更されることがあります。SHEIN に表示される条件をご確認ください',
    reusable: 'キャンペーンごとに SHEIN が示すルールに従います',
    shipping: '住所・商品・キャンペーンに応じて SHEIN が計算します',
    combinable: 'キャンペーン・アカウント・商品によって異なります。お支払い前に最終金額をご確認ください',
    aboutBrand:
      'SHEIN は、ファッション、アクセサリー、コスメ、インテリア雑貨を扱う国際的なプラットフォームです。このページでは、Cecília のメインリンク、パートナーシップで提供された紹介コード、時期によって変わるキャンペーンをまとめています。個別の商品リンクは、在庫・価格・取り扱いが商品ごとに異なるため、購入品紹介やレビューの記事に掲載しています。案内のリンクから購入すると Em Casa com Cecília に報酬が入ることがありますが、購入者の追加負担はありません。',
    brandLogoAlt: 'SHEIN のロゴ',
    faqs: [
      {
        question: '4CW5Y は SHEIN の割引クーポンですか？',
        answer:
          '決済時に入力するクーポンではありません。4CW5Y は Cecília の紹介コードで、SHEIN で検索すると、対象商品やプロモーション、割引をまとめたページが開きます。割引の内容と対象商品は SHEIN が決めます。このページのリンクから開くか、4CW5Y をコピーして SHEIN アプリまたはサイトで検索してください。',
      },
      {
        question: '4CW5Y をコピーして貼り付ける必要はありますか？',
        answer:
          '決済画面に貼り付けるコードではありません。4CW5Y のプロモーションと割引の商品は、SHEIN アプリまたはサイトでコードを検索すると表示されます。このページの Cecília のリンクは、開催中のキャンペーンとともに SHEIN を開きます。',
      },
      {
        question: 'SHEIN の 37S3442 とは何のコードですか？',
        answer: '37S3442 は、対象商品で開催中のキャンペーンの検索コードです。割引は期間限定で、商品によって異なる場合があります。',
      },
      {
        question: 'K49L457 は誰が使えますか？',
        answer:
          'K49L457 のキャンペーンは、新規ユーザー限定の50%クーポンを案内しています。対象かどうかと最終的な割引は、アカウントと決済画面で SHEIN が確認します。',
      },
      {
        question: 'SHEIN のリンクやコードはずっと使えますか？',
        answer:
          'いいえ。メインリンクとキャンペーンは改めて確認していますが、SHEIN がリンクを再発行したり、キャンペーンを終了したり、条件を変更したりすることがあります。このページの確認日は、情報を最後に確認した日です。',
      },
      {
        question: 'リンクから購入すると Cecília に報酬が入りますか？',
        answer:
          '入る場合があります。パートナーシップのリンク経由の購入について、SHEIN が Em Casa com Cecília に報酬を支払うことがありますが、購入者の追加負担はありません。',
      },
    ],
    linkInstructions: [
      'Cecília のメインリンクから SHEIN を開きます。',
      '紹介コードを使うには、4CW5Y をコピーして SHEIN アプリまたはサイトで検索します。プロモーションと割引のページが開きます。',
      '特定のキャンペーンは、このページの検索コードか対応するボタンを使います。',
      '対象条件・商品・期間は SHEIN で直接確認します。',
      '購入を確定する前に最終金額を確認します。',
    ],
    cartPrint: {
      ...SHEIN_GLOBAL_PRINT,
      article: 'shein-referral-code-ja',
      alt: 'SHEINサイトの検索バーに4CW5Yを入力したところ',
      caption: 'SHEINの検索での4CW5Yの例です。紹介コードはここに入力します。検索するとプロモーションのページが開き、各商品の割引はSHEINが決めます。',
    },
    linkNote:
      'Cecília のリンクは、開催中のキャンペーンとともに SHEIN を開きます。4CW5Y の商品とキャンペーンコードは SHEIN アプリまたはサイトで検索すると表示され、決済時には入力しません。支払い前に商品ごとの割引をご確認ください。',
    referral: {
      label: 'Cecília の紹介コード',
      instructions: '4CW5Y をコピーして SHEIN アプリまたはサイトで検索してください。SHEIN が選んだプロモーションと割引の商品ページが開きます。',
    },
  },
  'zh-hant': {
    discount: '促銷與折扣',
    offerTypeLabel: '優惠',
    offerTypeLabelPlural: '優惠',
    offerActionLabel: '查看 SHEIN 優惠',
    category: '時裝、配飾、美妝及家居',
    shortDescription: '主要連結、推薦碼及進行中的活動',
    longDescription:
      '4CW5Y 是 Cecília 的推薦碼，會開啟有促銷和折扣的 SHEIN 精選。你可以使用下方連結，或複製代碼到 App 或網站搜尋。其他活動請見下方。',
    metaTitle: 'SHEIN 推薦碼 4CW5Y 及進行中的活動',
    metaDescription: 'Cecília 的推薦碼 4CW5Y 會開啟 SHEIN 的促銷與折扣頁面：使用連結，或在 App 或網站搜尋 4CW5Y。',
    eligibleCategories: '時裝、配飾、美妝、家居及各活動適用的其他類別',
    validity: '連結及活動可能更改，請以 SHEIN 顯示的條件為準',
    reusable: '依照 SHEIN 為每個活動訂立的規則',
    shipping: '由 SHEIN 按地址、商品及活動計算',
    combinable: '視乎活動、帳戶及商品而定，付款前請確認最終金額',
    aboutBrand:
      'SHEIN 是國際時裝、配飾、美妝及家居用品平台。此頁面整合了 Cecília 的主要連結、合作提供的推薦碼，以及會隨時間變動的活動。個別商品連結會放在開箱文章和評測中，因為每件商品的供應、價格和存貨都不同。透過指定連結購物，Em Casa com Cecília 可能會獲得佣金，買家無需支付額外費用。',
    brandLogoAlt: 'SHEIN 標誌',
    faqs: [
      {
        question: '4CW5Y 是 SHEIN 的折扣優惠碼嗎？',
        answer:
          '這不是結帳時輸入的優惠碼。4CW5Y 是 Cecília 的推薦碼，在 SHEIN 搜尋後，會開啟一個集合精選商品、促銷和折扣的頁面；折扣多少、適用哪些商品由 SHEIN 決定。你可以透過本頁的連結前往，或複製 4CW5Y 到 SHEIN App 或網站搜尋。',
      },
      {
        question: '需要複製並貼上 4CW5Y 嗎？',
        answer:
          '它不用貼在結帳頁面。4CW5Y 的促銷和折扣商品，要在 SHEIN App 或網站搜尋這個代碼才會出現。本頁 Cecília 的連結會開啟 SHEIN 的進行中活動。',
      },
      {
        question: 'SHEIN 的 37S3442 是甚麼代碼？',
        answer: '37S3442 是指定商品進行中活動的搜尋代碼。折扣限時提供，並可能因商品而異。',
      },
      {
        question: '誰可以使用 K49L457？',
        answer: 'K49L457 活動提供只限新用戶的 50% 優惠券。是否符合資格及最終折扣，由 SHEIN 在帳戶及結帳時確認。',
      },
      {
        question: 'SHEIN 的連結和代碼會一直有效嗎？',
        answer:
          '不會。我們會重新核實主要連結和活動，但 SHEIN 可能會重新發出連結、結束活動或更改條件。此頁面的核實日期顯示資料最後一次檢查的時間。',
      },
      {
        question: '透過連結購物，Cecília 會獲得佣金嗎？',
        answer: '有可能。SHEIN 可能會就歸因於合作連結的訂單向 Em Casa com Cecília 支付佣金，買家無需支付額外費用。',
      },
    ],
    linkInstructions: [
      '透過 Cecília 的主要連結開啟 SHEIN。',
      '要使用推薦碼，請複製 4CW5Y 到 SHEIN App 或網站搜尋，會開啟促銷和折扣頁面。',
      '如要參加指定活動，請使用此頁面的搜尋代碼或相應按鈕。',
      '請直接在 SHEIN 查看資格、商品及期限。',
      '完成購買前請確認最終金額。',
    ],
    cartPrint: {
      ...SHEIN_GLOBAL_PRINT,
      article: 'shein-referral-code-zh-hant',
      alt: 'SHEIN 網站搜尋列中輸入了代碼 4CW5Y',
      caption: '4CW5Y 在 SHEIN 搜尋中的範例，推薦碼就是在這裡輸入。搜尋後會開啟促銷頁面，每件商品的折扣由 SHEIN 決定。',
    },
    linkNote:
      'Cecília 的連結會開啟 SHEIN 的進行中活動。4CW5Y 的商品和活動代碼要在 SHEIN App 或網站搜尋才會出現，不在結帳時輸入；付款前請確認每件商品的折扣。',
    referral: {
      label: 'Cecília 的推薦碼',
      instructions: '請複製 4CW5Y 到 SHEIN App 或網站搜尋，會開啟 SHEIN 選定的促銷和折扣商品頁面。',
    },
  },
  'zh-hans': {
    discount: '促销与折扣',
    offerTypeLabel: '优惠',
    offerTypeLabelPlural: '优惠',
    offerActionLabel: '查看 SHEIN 优惠',
    category: '服饰、配饰、美妆和家居',
    shortDescription: '主链接、推荐码和进行中的活动',
    longDescription:
      '4CW5Y 是 Cecília 的推荐码，会打开有促销和折扣的 SHEIN 精选。你可以使用下方链接，或复制代码到 App 或网站搜索。其他活动请见下方。',
    metaTitle: 'SHEIN 推荐码 4CW5Y 和进行中的活动',
    metaDescription: 'Cecília 的推荐码 4CW5Y 会打开 SHEIN 的促销和折扣页面：使用链接，或在 App 或网站搜索 4CW5Y。',
    eligibleCategories: '服饰、配饰、美妆、家居及各活动适用的其他品类',
    validity: '链接和活动可能变更，请以 SHEIN 显示的条件为准',
    reusable: '按 SHEIN 为每个活动设定的规则',
    shipping: '由 SHEIN 根据地址、商品和活动计算',
    combinable: '因活动、账户和商品而异，付款前请确认最终金额',
    aboutBrand:
      'SHEIN 是一个国际服饰、配饰、美妆和家居用品平台。本页汇总了 Cecília 的主链接、合作提供的推荐码，以及会随时间变化的活动。具体商品链接放在开箱文章和测评中，因为每件商品的上架情况、价格和库存都不同。通过指定链接购物，Em Casa com Cecília 可能会获得佣金，买家无需支付额外费用。',
    brandLogoAlt: 'SHEIN 标志',
    faqs: [
      {
        question: '4CW5Y 是 SHEIN 的折扣优惠码吗？',
        answer: '这不是结账时输入的优惠码。4CW5Y 是 Cecília 的推荐码，在 SHEIN 搜索后，会打开一个汇集精选商品、促销和折扣的页面；折扣多少、适用哪些商品由 SHEIN 决定。你可以通过本页的链接打开，或复制 4CW5Y 到 SHEIN App 或网站搜索。',
      },
      {
        question: '需要复制并粘贴 4CW5Y 吗？',
        answer:
          '它不用粘贴在结账页面。4CW5Y 的促销和折扣商品，要在 SHEIN App 或网站搜索这个代码才会出现。本页 Cecília 的链接会打开 SHEIN 的进行中活动。',
      },
      {
        question: 'SHEIN 的 37S3442 是什么代码？',
        answer: '37S3442 是指定商品进行中活动的搜索代码。折扣限时提供，可能因商品而异。',
      },
      {
        question: '谁可以使用 K49L457？',
        answer: 'K49L457 活动提供仅限新用户的 50% 优惠券。是否符合条件以及最终折扣，由 SHEIN 在账户和结账时确认。',
      },
      {
        question: 'SHEIN 的链接和代码会一直有效吗？',
        answer:
          '不会。我们会重新核实主链接和活动，但 SHEIN 可能重新发放链接、结束活动或更改条件。本页的核实日期表示资料最后一次检查的时间。',
      },
      {
        question: '通过链接购物，Cecília 会获得佣金吗？',
        answer: '有可能。SHEIN 可能会就归因于合作链接的订单向 Em Casa com Cecília 支付佣金，买家无需支付额外费用。',
      },
    ],
    linkInstructions: [
      '通过 Cecília 的主链接打开 SHEIN。',
      '要使用推荐码，请复制 4CW5Y 到 SHEIN App 或网站搜索，会打开促销和折扣页面。',
      '如需参加指定活动，请使用本页的搜索代码或对应按钮。',
      '请直接在 SHEIN 查看资格、商品和期限。',
      '完成购买前请确认最终金额。',
    ],
    cartPrint: {
      ...SHEIN_GLOBAL_PRINT,
      article: 'shein-referral-code-zh-hans',
      alt: 'SHEIN 网站搜索栏中输入了代码 4CW5Y',
      caption: '4CW5Y 在 SHEIN 搜索中的示例，推荐码就是在这里输入。搜索后会打开促销页面，每件商品的折扣由 SHEIN 决定。',
    },
    linkNote: 'Cecília 的链接会打开 SHEIN 的进行中活动。4CW5Y 的商品和活动代码要在 SHEIN App 或网站搜索才会出现，不在结账时输入；付款前请确认每件商品的折扣。',
    referral: {
      label: 'Cecília 的推荐码',
      instructions: '请复制 4CW5Y 到 SHEIN App 或网站搜索，会打开 SHEIN 选定的促销和折扣商品页面。',
    },
  },
};

// Loja de link sem código nosso. Fora do PT a página não cita valor de frete nem prazo de devolução: os do PT
// são do site brasileiro, e cada país tem os seus. O texto manda conferir na Temu.
const TEMU_TRANSLATIONS: Record<TranslatedLocale, AffiliateOfferTranslation> = {
  en: {
    discount: 'Promotions',
    offerTypeLabel: 'offer',
    offerTypeLabelPlural: 'offers',
    offerActionLabel: 'See offers on Temu',
    category: 'Fashion, home, electronics and everyday items',
    shortDescription: 'Cecília\'s link to the store\'s promotions',
    longDescription:
      'Em Casa com Cecília has no coupon for Temu: the button below opens the store through Cecília\'s link, with whatever promotions are live. The price and discount on each product are the ones Temu shows on the product page and in the cart.',
    metaTitle: 'Temu: promotions through Cecília\'s link',
    metaDescription:
      'Cecília\'s link to Temu: opens the store with whatever promotions are live. No coupon from us; shipping and returns follow Temu\'s rules in your country.',
    eligibleCategories: 'All Temu categories; each promotion applies to the products the store indicates',
    validity: 'Promotions change without notice: the price Temu shows on the day you buy is what counts',
    reusable: 'The link can be used on every purchase',
    shipping: 'Shipping cost and delivery time appear in the cart and vary by country and order',
    combinable: 'The link gives no discount of its own: the promotions Temu shows on the product page and in the cart apply',
    aboutBrand:
      'Temu is an international online store selling fashion, home goods, electronics and everyday items. This page gathers Cecília\'s link and explains how it works. Purchases made through the link may earn Em Casa com Cecília a commission, at no extra cost to the buyer.',
    brandLogoAlt: 'Temu logo',
    faqs: [
      {
        question: 'Does Cecília have a Temu coupon?',
        answer:
          'No. Em Casa com Cecília has a Temu affiliate link, not a coupon: the link opens the store with whatever promotions are live, and the discount on each product is whatever Temu shows.',
      },
      {
        question: 'How much is shipping on Temu?',
        answer:
          'It depends on your country and the order value. Temu shows the shipping cost and delivery time in the cart, before you pay.',
      },
      {
        question: 'How do returns work on Temu?',
        answer:
          'The return window and cost vary from country to country. Temu\'s return and refund policy for your country is in the site footer and in the app; check it before you buy.',
      },
      {
        question: 'What payment methods does Temu accept?',
        answer:
          'It depends on the country. Temu shows the payment methods accepted in your country when you pay, and its Help Center has the list.',
      },
      {
        question: 'Does Temu charge import duties?',
        answer:
          'It depends on the country. International purchases may be subject to import duties and other taxes; when Temu charges them on the order, the amount is shown before you pay. Check the rules for your country in the Temu Help Center.',
      },
      {
        question: 'Do I need to copy a code to buy through the link?',
        answer:
          'No. Just open Temu with the button on this page and shop as usual. There is no code from us to paste into the cart.',
      },
      {
        question: 'Does buying through the link earn Cecília a commission?',
        answer:
          'It may. Temu may pay Em Casa com Cecília a commission on purchases attributed to the link, at no extra cost to the buyer.',
      },
    ],
    linkInstructions: [
      'Tap “See offers on Temu”: Cecília\'s link opens the store, with nothing to copy.',
      'Pick your products and check the price and promotion on each product page.',
      'In the cart, check the shipping cost and delivery time for your address.',
      'Check the final price, including shipping and taxes, before completing your purchase.',
    ],
    linkNote:
      'Cecília\'s link gives no discount of its own and carries no code: the price and promotions are the ones Temu shows on the product page and in the cart.',
  },
  es: {
    discount: 'Promociones',
    offerTypeLabel: 'oferta',
    offerTypeLabelPlural: 'ofertas',
    offerActionLabel: 'Ver ofertas en Temu',
    category: 'Moda, hogar, electrónica y artículos útiles',
    shortDescription: 'enlace de Cecília a las promociones de la tienda',
    longDescription:
      'Em Casa com Cecília no tiene cupón de Temu: el botón de abajo abre la tienda con el enlace de Cecília, con las promociones que estén activas. El precio y el descuento de cada producto son los que Temu muestra en la página y en el carrito.',
    metaTitle: 'Temu: promociones con el enlace de Cecília',
    metaDescription:
      'Enlace de Cecília a Temu: abre la tienda con las promociones activas. No hay cupón nuestro; el envío y la devolución siguen las reglas de Temu en tu país.',
    eligibleCategories: 'Todas las categorías de Temu; cada promoción vale para los productos que indique la tienda',
    validity: 'Las promociones cambian sin aviso: vale el precio que Temu muestra el día de la compra',
    reusable: 'El enlace se puede usar en cualquier compra',
    shipping: 'El envío y el plazo de entrega aparecen en el carrito y cambian según el país y el pedido',
    combinable: 'El enlace no da un descuento propio: valen las promociones que Temu muestre en la página del producto y en el carrito',
    aboutBrand:
      'Temu es una tienda online internacional que vende moda, artículos para el hogar, electrónica y utilidades. Esta página reúne el enlace de Cecília y explica cómo funciona. Las compras hechas con el enlace pueden generar una comisión para Em Casa com Cecília, sin coste adicional para quien compra.',
    brandLogoAlt: 'Logotipo de Temu',
    faqs: [
      {
        question: '¿Cecília tiene un cupón de Temu?',
        answer:
          'No. Em Casa com Cecília tiene un enlace de afiliado de Temu, no un cupón: el enlace abre la tienda con las promociones que estén activas, y el descuento de cada producto es el que muestra Temu.',
      },
      {
        question: '¿Cuánto cuesta el envío en Temu?',
        answer:
          'Depende del país y del importe del pedido. Temu muestra el coste del envío y el plazo de entrega en el carrito, antes del pago.',
      },
      {
        question: '¿Cómo funcionan las devoluciones en Temu?',
        answer:
          'El plazo y el coste de la devolución cambian de un país a otro. La política de devolución y reembolso de Temu para tu país está al pie del sitio y en la app; consúltala antes de comprar.',
      },
      {
        question: '¿Qué formas de pago acepta Temu?',
        answer:
          'Depende del país. Temu muestra las formas de pago aceptadas en tu país a la hora de pagar, y su centro de ayuda incluye la lista.',
      },
      {
        question: '¿Temu cobra impuestos de importación?',
        answer:
          'Depende del país. En las compras internacionales puede haber impuestos de importación y otros tributos; cuando Temu los cobra en el pedido, el importe aparece antes del pago. Consulta las reglas de tu país en el centro de ayuda de Temu.',
      },
      {
        question: '¿Tengo que copiar algún código para comprar con el enlace?',
        answer:
          'No. Basta con abrir Temu con el botón de esta página y comprar con normalidad. No hay ningún código nuestro que pegar en el carrito.',
      },
      {
        question: '¿Comprar con el enlace genera una comisión para Cecília?',
        answer:
          'Puede generarla. Temu puede pagar una comisión a Em Casa com Cecília por las compras atribuidas al enlace, sin coste adicional para quien compra.',
      },
    ],
    linkInstructions: [
      'Pulsa «Ver ofertas en Temu»: el enlace de Cecília abre la tienda, sin copiar nada.',
      'Elige los productos y comprueba el precio y la promoción de cada uno en su página.',
      'En el carrito, mira el envío y el plazo de entrega para tu dirección.',
      'Comprueba el importe final, con envío e impuestos, antes de completar la compra.',
    ],
    linkNote:
      'El enlace de Cecília no da un descuento propio ni lleva código: el precio y las promociones son los que Temu muestra en la página del producto y en el carrito.',
  },
  fr: {
    discount: 'Promotions',
    offerTypeLabel: 'offre',
    offerTypeLabelPlural: 'offres',
    offerActionLabel: 'Voir les offres Temu',
    category: 'Mode, maison, électronique et accessoires pratiques',
    shortDescription: 'lien de Cecília vers les promotions de la boutique',
    longDescription:
      'Em Casa com Cecília n\'a pas de code promo pour Temu\u00a0: le bouton ci-dessous ouvre la boutique via le lien de Cecília, avec les promotions en cours. Le prix et la réduction de chaque produit sont ceux que Temu affiche sur la page et dans le panier.',
    metaTitle: 'Temu\u00a0: promotions via le lien de Cecília',
    metaDescription:
      'Lien de Cecília vers Temu\u00a0: ouvre la boutique avec les promotions en cours. Pas de code promo de notre part, livraison et retours selon les règles de Temu.',
    eligibleCategories: 'Toutes les catégories de Temu\u00a0; chaque promotion s\'applique aux produits indiqués par la boutique',
    validity: 'Les promotions changent sans préavis\u00a0: c\'est le prix affiché par Temu le jour de l\'achat qui compte',
    reusable: 'Le lien peut être utilisé pour tous vos achats',
    shipping: 'Les frais et le délai de livraison s\'affichent dans le panier et varient selon le pays et la commande',
    combinable: 'Le lien ne donne pas de réduction propre\u00a0: les promotions affichées par Temu sur la page du produit et dans le panier s\'appliquent',
    aboutBrand:
      'Temu est une boutique en ligne internationale qui vend de la mode, des articles pour la maison, de l\'électronique et des accessoires pratiques. Cette page réunit le lien de Cecília et explique son fonctionnement. Les achats effectués via le lien peuvent rapporter une commission à Em Casa com Cecília, sans surcoût pour l\'acheteur.',
    brandLogoAlt: 'Logo Temu',
    faqs: [
      {
        question: 'Cecília a-t-elle un code promo Temu\u00a0?',
        answer:
          'Non. Em Casa com Cecília dispose d\'un lien d\'affiliation Temu, pas d\'un code promo\u00a0: le lien ouvre la boutique avec les promotions en cours, et la réduction de chaque produit est celle qu\'affiche Temu.',
      },
      {
        question: 'Combien coûte la livraison sur Temu\u00a0?',
        answer:
          'Cela dépend du pays et du montant de la commande. Temu affiche les frais et le délai de livraison dans le panier, avant le paiement.',
      },
      {
        question: 'Comment fonctionnent les retours sur Temu\u00a0?',
        answer:
          'Le délai et le coût du retour varient d\'un pays à l\'autre. La politique de retour et de remboursement de Temu pour votre pays se trouve en bas du site et dans l\'appli. Consultez-la avant d\'acheter.',
      },
      {
        question: 'Quels moyens de paiement Temu accepte-t-il\u00a0?',
        answer:
          'Cela dépend du pays. Temu affiche les moyens de paiement acceptés dans votre pays au moment de payer, et son centre d\'aide en donne la liste.',
      },
      {
        question: 'Temu applique-t-il des droits de douane\u00a0?',
        answer:
          'Cela dépend du pays. Les achats internationaux peuvent donner lieu à des droits de douane et à d\'autres taxes\u00a0; lorsque Temu les facture sur la commande, le montant s\'affiche avant le paiement. Consultez les règles de votre pays dans le centre d\'aide de Temu.',
      },
      {
        question: 'Dois-je copier un code pour acheter via le lien\u00a0?',
        answer:
          'Non. Il suffit d\'ouvrir Temu avec le bouton de cette page et d\'acheter normalement. Il n\'y a aucun code de notre part à coller dans le panier.',
      },
      {
        question: 'Acheter via le lien rapporte-t-il une commission à Cecília\u00a0?',
        answer:
          'C\'est possible. Temu peut verser une commission à Em Casa com Cecília pour les achats attribués au lien, sans surcoût pour l\'acheteur.',
      },
    ],
    linkInstructions: [
      'Appuyez sur «\u00a0Voir les offres Temu\u00a0»\u00a0: le lien de Cecília ouvre la boutique, sans rien copier.',
      'Choisissez vos produits et vérifiez le prix et la promotion de chacun sur sa page.',
      'Dans le panier, consultez les frais et le délai de livraison pour votre adresse.',
      'Vérifiez le montant final, frais de livraison et taxes compris, avant de finaliser l\'achat.',
    ],
    linkNote:
      'Le lien de Cecília ne donne pas de réduction propre et ne comporte aucun code\u00a0: le prix et les promotions sont ceux qu\'affiche Temu sur la page du produit et dans le panier.',
  },
  de: {
    discount: 'Aktionen',
    offerTypeLabel: 'Angebot',
    offerTypeLabelPlural: 'Angebote',
    offerActionLabel: 'Angebote bei Temu ansehen',
    category: 'Mode, Wohnen, Elektronik und Alltagsartikel',
    shortDescription: 'Cecílias Link zu den Aktionen des Shops',
    longDescription:
      'Em Casa com Cecília hat keinen Gutscheincode für Temu: Der Button unten öffnet den Shop über Cecílias Link, mit den aktuellen Aktionen. Preis und Rabatt jedes Produkts sind die, die Temu auf der Produktseite und im Warenkorb anzeigt.',
    metaTitle: 'Temu: Aktionen über Cecílias Link',
    metaDescription:
      'Cecílias Link zu Temu: öffnet den Shop mit den aktuellen Aktionen. Kein Gutscheincode von uns; Versand und Rückgabe richten sich nach den Regeln von Temu.',
    eligibleCategories: 'Alle Kategorien von Temu; jede Aktion gilt für die Produkte, die der Shop angibt',
    validity: 'Aktionen ändern sich ohne Vorankündigung: Es gilt der Preis, den Temu am Kauftag anzeigt',
    reusable: 'Der Link kann bei jedem Einkauf genutzt werden',
    shipping: 'Versandkosten und Lieferzeit stehen im Warenkorb und hängen von Land und Bestellung ab',
    combinable: 'Der Link gibt keinen eigenen Rabatt: Es gelten die Aktionen, die Temu auf der Produktseite und im Warenkorb anzeigt',
    aboutBrand:
      'Temu ist ein internationaler Online-Shop für Mode, Wohnartikel, Elektronik und Alltagsartikel. Diese Seite bündelt Cecílias Link und erklärt, wie er funktioniert. Käufe über den Link können Em Casa com Cecília eine Provision einbringen – ohne Mehrkosten für dich.',
    brandLogoAlt: 'Temu-Logo',
    faqs: [
      {
        question: 'Hat Cecília einen Gutscheincode für Temu?',
        answer:
          'Nein. Em Casa com Cecília hat einen Partnerlink zu Temu, keinen Gutscheincode: Der Link öffnet den Shop mit den aktuellen Aktionen, und den Rabatt auf jedes Produkt legt Temu fest.',
      },
      {
        question: 'Wie hoch sind die Versandkosten bei Temu?',
        answer:
          'Das hängt vom Land und vom Bestellwert ab. Temu zeigt Versandkosten und Lieferzeit im Warenkorb an, bevor du bezahlst.',
      },
      {
        question: 'Wie funktioniert die Rückgabe bei Temu?',
        answer:
          'Frist und Kosten der Rückgabe sind von Land zu Land verschieden. Die Rückgabe- und Erstattungsrichtlinie von Temu für dein Land findest du im Footer der Website und in der App; lies sie vor dem Kauf.',
      },
      {
        question: 'Welche Zahlungsarten akzeptiert Temu?',
        answer:
          'Das hängt vom Land ab. Temu zeigt dir die in deinem Land akzeptierten Zahlungsarten beim Bezahlen an, und im Hilfe-Center findest du die Liste.',
      },
      {
        question: 'Erhebt Temu Einfuhrabgaben?',
        answer:
          'Das hängt vom Land ab. Bei internationalen Käufen können Einfuhrabgaben und andere Steuern anfallen; wenn Temu sie auf die Bestellung erhebt, wird der Betrag vor der Zahlung angezeigt. Die Regeln für dein Land findest du im Hilfe-Center von Temu.',
      },
      {
        question: 'Muss ich einen Code kopieren, um über den Link zu kaufen?',
        answer:
          'Nein. Öffne einfach Temu über den Button auf dieser Seite und kaufe wie gewohnt. Es gibt keinen Code von uns, den du im Warenkorb einfügen musst.',
      },
      {
        question: 'Bekommt Cecília eine Provision, wenn ich über den Link kaufe?',
        answer:
          'Das ist möglich. Temu kann Em Casa com Cecília eine Provision für Käufe zahlen, die dem Link zugeordnet werden – ohne Mehrkosten für dich.',
      },
    ],
    linkInstructions: [
      'Tippe auf „Angebote bei Temu ansehen“: Cecílias Link öffnet den Shop, du musst nichts kopieren.',
      'Wähle deine Produkte und prüfe Preis und Aktion auf der jeweiligen Produktseite.',
      'Sieh dir im Warenkorb Versandkosten und Lieferzeit für deine Adresse an.',
      'Prüfe den Endbetrag samt Versand und Steuern, bevor du den Kauf abschließt.',
    ],
    linkNote:
      'Cecílias Link gibt keinen eigenen Rabatt und enthält keinen Code: Preis und Aktionen sind die, die Temu auf der Produktseite und im Warenkorb anzeigt.',
  },
  it: {
    discount: 'Promozioni',
    offerTypeLabel: 'offerta',
    offerTypeLabelPlural: 'offerte',
    offerActionLabel: 'Vedi le offerte Temu',
    category: 'Moda, casa, elettronica e articoli di uso quotidiano',
    shortDescription: 'link di Cecília per le promozioni del negozio',
    longDescription:
      'Em Casa com Cecília non ha un coupon per Temu: il pulsante qui sotto apre il negozio con il link di Cecília, con le promozioni in corso. Il prezzo e lo sconto di ogni prodotto sono quelli che Temu mostra nella pagina e nel carrello.',
    metaTitle: 'Temu: promozioni con il link di Cecília',
    metaDescription:
      'Link di Cecília per Temu: apre il negozio con le promozioni in corso. Nessun coupon nostro; spedizione e resi seguono le regole di Temu nel tuo paese.',
    eligibleCategories: 'Tutte le categorie di Temu; ogni promozione vale per i prodotti indicati dal negozio',
    validity: 'Le promozioni cambiano senza preavviso: vale il prezzo che Temu mostra il giorno dell\'acquisto',
    reusable: 'Il link può essere usato a ogni acquisto',
    shipping: 'La spedizione e i tempi di consegna compaiono nel carrello e cambiano in base al paese e all\'ordine',
    combinable: 'Il link non dà uno sconto proprio: valgono le promozioni che Temu mostra nella pagina del prodotto e nel carrello',
    aboutBrand:
      'Temu è un negozio online internazionale che vende moda, articoli per la casa, elettronica e articoli di uso quotidiano. Questa pagina raccoglie il link di Cecília e spiega come funziona. Gli acquisti fatti con il link possono generare una commissione per Em Casa com Cecília, senza costi aggiuntivi per chi compra.',
    brandLogoAlt: 'Logo Temu',
    faqs: [
      {
        question: 'Cecília ha un coupon Temu?',
        answer:
          'No. Em Casa com Cecília ha un link di affiliazione Temu, non un coupon: il link apre il negozio con le promozioni in corso, e lo sconto di ogni prodotto è quello che mostra Temu.',
      },
      {
        question: 'Quanto costa la spedizione su Temu?',
        answer:
          'Dipende dal paese e dal valore dell\'ordine. Temu mostra il costo della spedizione e i tempi di consegna nel carrello, prima del pagamento.',
      },
      {
        question: 'Come funzionano i resi su Temu?',
        answer:
          'Il termine e il costo del reso cambiano da paese a paese. La politica di reso e rimborso di Temu per il tuo paese si trova in fondo al sito e nell\'app; controllala prima di comprare.',
      },
      {
        question: 'Quali metodi di pagamento accetta Temu?',
        answer:
          'Dipende dal paese. Temu mostra i metodi di pagamento accettati nel tuo paese al momento del pagamento, e il suo centro assistenza ne riporta l\'elenco.',
      },
      {
        question: 'Temu applica dazi di importazione?',
        answer:
          'Dipende dal paese. Negli acquisti internazionali possono esserci dazi di importazione e altre imposte; quando Temu li applica all\'ordine, l\'importo viene mostrato prima del pagamento. Controlla le regole del tuo paese nel centro assistenza di Temu.',
      },
      {
        question: 'Devo copiare un codice per comprare dal link?',
        answer:
          'No. Basta aprire Temu con il pulsante di questa pagina e comprare come al solito. Non c\'è nessun codice nostro da incollare nel carrello.',
      },
      {
        question: 'Comprare dal link genera una commissione per Cecília?',
        answer:
          'Può succedere. Temu può pagare una commissione a Em Casa com Cecília per gli acquisti attribuiti al link, senza costi aggiuntivi per chi compra.',
      },
    ],
    linkInstructions: [
      'Tocca “Vedi le offerte Temu”: il link di Cecília apre il negozio, senza copiare nulla.',
      'Scegli i prodotti e controlla il prezzo e la promozione di ciascuno nella sua pagina.',
      'Nel carrello, guarda la spedizione e i tempi di consegna per il tuo indirizzo.',
      'Controlla l\'importo finale, con spedizione e tasse, prima di completare l\'acquisto.',
    ],
    linkNote:
      'Il link di Cecília non dà uno sconto proprio e non ha codici: il prezzo e le promozioni sono quelli che Temu mostra nella pagina del prodotto e nel carrello.',
  },
  ko: {
    discount: '프로모션',
    offerTypeLabel: '혜택',
    offerTypeLabelPlural: '혜택',
    offerActionLabel: 'Temu 혜택 보기',
    category: '패션, 홈, 전자제품, 생활용품',
    shortDescription: '스토어 프로모션으로 연결되는 Cecília의 링크',
    longDescription:
      'Em Casa com Cecília에는 Temu 쿠폰이 없습니다. 아래 버튼은 Cecília의 링크로 진행 중인 프로모션과 함께 스토어를 엽니다. 상품별 가격과 할인은 Temu가 상품 페이지와 장바구니에 표시하는 대로입니다.',
    metaTitle: 'Temu: Cecília 링크로 만나는 프로모션',
    metaDescription:
      'Cecília의 Temu 링크: 진행 중인 프로모션과 함께 스토어가 열립니다. 쿠폰은 없으며 배송·반품은 Temu 규정을 따릅니다.',
    eligibleCategories: 'Temu의 모든 카테고리. 프로모션별 적용 상품은 스토어가 안내하는 대로입니다',
    validity: '프로모션은 예고 없이 바뀝니다. 구매하는 날 Temu에 표시된 가격이 기준입니다',
    reusable: '링크는 구매할 때마다 사용할 수 있습니다',
    shipping: '배송비와 배송 기간은 장바구니에 표시되며 국가와 주문에 따라 다릅니다',
    combinable: '링크 자체의 할인은 없으며, Temu 상품 페이지와 장바구니에 표시되는 프로모션이 적용됩니다',
    aboutBrand:
      'Temu는 패션, 홈 용품, 전자제품, 생활용품을 파는 글로벌 온라인 스토어입니다. 이 페이지에는 Cecília의 링크와 사용 방법을 정리했습니다. 링크로 구매하면 Em Casa com Cecília가 수수료를 받을 수 있으며, 구매자에게 추가 비용은 없습니다.',
    brandLogoAlt: 'Temu 로고',
    faqs: [
      {
        question: 'Cecília에게 Temu 쿠폰이 있나요?',
        answer:
          '아니요. Em Casa com Cecília에는 Temu 쿠폰이 아니라 제휴 링크가 있습니다. 링크를 누르면 진행 중인 프로모션과 함께 스토어가 열리며, 상품별 할인은 Temu에 표시된 대로입니다.',
      },
      {
        question: 'Temu 배송비는 얼마인가요?',
        answer:
          '국가와 주문 금액에 따라 다릅니다. Temu는 결제 전에 장바구니에서 배송비와 배송 기간을 보여 줍니다.',
      },
      {
        question: 'Temu 반품은 어떻게 하나요?',
        answer:
          '반품 기간과 비용은 국가마다 다릅니다. 해당 국가의 Temu 반품·환불 정책은 사이트 하단과 앱에서 확인할 수 있으니 구매 전에 확인하세요.',
      },
      {
        question: 'Temu에서는 어떤 결제 수단을 사용할 수 있나요?',
        answer:
          '국가마다 다릅니다. Temu는 결제할 때 해당 국가에서 사용할 수 있는 결제 수단을 보여 주며, 고객센터에서 목록을 확인할 수 있습니다.',
      },
      {
        question: 'Temu는 수입 관세를 부과하나요?',
        answer:
          '국가마다 다릅니다. 해외 구매에는 수입 관세와 기타 세금이 붙을 수 있으며, Temu가 주문에 이를 부과하는 경우 결제 전에 금액이 표시됩니다. 해당 국가의 규정은 Temu 고객센터에서 확인하세요.',
      },
      {
        question: '링크로 구매할 때 코드를 복사해야 하나요?',
        answer:
          '아니요. 이 페이지의 버튼으로 Temu를 연 뒤 평소처럼 구매하면 됩니다. 장바구니에 붙여 넣을 코드는 없습니다.',
      },
      {
        question: '링크로 구매하면 Cecília가 수수료를 받나요?',
        answer:
          '받을 수 있습니다. Temu는 링크로 연결된 구매에 대해 Em Casa com Cecília에 수수료를 지급할 수 있으며, 구매자에게 추가 비용은 없습니다.',
      },
    ],
    linkInstructions: [
      '“Temu 혜택 보기”를 누르세요. Cecília의 링크로 스토어가 열리며, 복사할 것은 없습니다.',
      '상품을 고르고 각 상품 페이지에서 가격과 프로모션을 확인하세요.',
      '장바구니에서 내 주소로 가는 배송비와 배송 기간을 확인하세요.',
      '구매를 완료하기 전에 배송비와 세금을 포함한 최종 금액을 확인하세요.',
    ],
    linkNote:
      'Cecília의 링크에는 자체 할인도 코드도 없습니다. 가격과 프로모션은 Temu 상품 페이지와 장바구니에 표시되는 내용을 따릅니다.',
  },
  ja: {
    discount: 'セール',
    offerTypeLabel: 'オファー',
    offerTypeLabelPlural: 'オファー',
    offerActionLabel: 'Temu のオファーを見る',
    category: 'ファッション、インテリア、家電、日用品',
    shortDescription: 'ストアのプロモーションへの Cecília のリンク',
    longDescription:
      'Em Casa com Cecília に Temu のクーポンはありません。下のボタンから Cecília のリンクで、開催中のプロモーションとともにストアが開きます。各商品の価格と割引は、Temu が商品ページとカートに表示するとおりです。',
    metaTitle: 'Temu：Cecília のリンクのプロモーション',
    metaDescription:
      'Cecília の Temu リンクで、開催中のプロモーションとともにストアが開きます。クーポンはなく、送料と返品は Temu の規定に従います。',
    eligibleCategories: 'Temu のすべてのカテゴリー。プロモーションごとの対象商品はストアの案内に従います',
    validity: 'プロモーションは予告なく変わります。購入日に Temu が表示する価格が適用されます',
    reusable: 'リンクは購入のたびに使えます',
    shipping: '送料と配送日数はカートに表示され、国と注文内容によって変わります',
    combinable: 'リンク自体に割引はありません。Temu が商品ページとカートに表示するプロモーションが適用されます',
    aboutBrand:
      'Temu は、ファッション、インテリア雑貨、家電、日用品を扱う国際的なオンラインストアです。このページでは Cecília のリンクと使い方をまとめています。リンクから購入すると Em Casa com Cecília に報酬が入ることがありますが、購入者の追加負担はありません。',
    brandLogoAlt: 'Temu のロゴ',
    faqs: [
      {
        question: 'Cecília に Temu のクーポンはありますか？',
        answer:
          'いいえ。Em Casa com Cecília にあるのはクーポンではなく Temu のアフィリエイトリンクです。リンクから開催中のプロモーションとともにストアが開き、各商品の割引は Temu の表示のとおりです。',
      },
      {
        question: 'Temu の送料はいくらですか？',
        answer:
          '国と注文金額によって異なります。Temu は支払い前に、カートで送料と配送日数を表示します。',
      },
      {
        question: 'Temu の返品はどうなりますか？',
        answer:
          '返品の期間と費用は国によって異なります。お住まいの国の Temu の返品・返金ポリシーは、サイト下部とアプリで確認できます。購入前にご確認ください。',
      },
      {
        question: 'Temu ではどの支払い方法が使えますか？',
        answer:
          '国によって異なります。Temu は支払い時にお住まいの国で利用できる支払い方法を表示し、ヘルプセンターにも一覧があります。',
      },
      {
        question: 'Temu は輸入関税を請求しますか？',
        answer:
          '国によって異なります。海外からの購入には、輸入関税やその他の税金がかかることがあります。Temu が注文時に請求する場合は、支払い前に金額が表示されます。お住まいの国のルールは Temu のヘルプセンターでご確認ください。',
      },
      {
        question: 'リンクから購入するとき、コードをコピーする必要はありますか？',
        answer:
          'いいえ。このページのボタンから Temu を開き、いつもどおり購入するだけです。カートに貼り付ける当サイトのコードはありません。',
      },
      {
        question: 'リンクから購入すると Cecília に報酬が入りますか？',
        answer:
          '入る場合があります。リンク経由の購入について、Temu が Em Casa com Cecília に報酬を支払うことがありますが、購入者の追加負担はありません。',
      },
    ],
    linkInstructions: [
      '「Temu のオファーを見る」をタップします。Cecília のリンクでストアが開くので、コピーするものはありません。',
      '商品を選び、各商品ページで価格とプロモーションを確認します。',
      'カートで、ご自分の住所への送料と配送日数を確認します。',
      '購入を確定する前に、送料と税金を含めた最終金額を確認します。',
    ],
    linkNote:
      'Cecília のリンクに独自の割引やコードはありません。価格とプロモーションは、Temu が商品ページとカートに表示するものです。',
  },
  'zh-hant': {
    discount: '促銷',
    offerTypeLabel: '優惠',
    offerTypeLabelPlural: '優惠',
    offerActionLabel: '查看 Temu 優惠',
    category: '時裝、家居、電子產品及日用品',
    shortDescription: 'Cecília 的商店促銷連結',
    longDescription:
      'Em Casa com Cecília 沒有 Temu 的優惠碼：下方按鈕會透過 Cecília 的連結開啟商店，並帶出進行中的促銷。每件商品的價格和折扣，以 Temu 在商品頁面和購物車顯示的為準。',
    metaTitle: 'Temu：Cecília 連結的促銷',
    metaDescription:
      'Cecília 的 Temu 連結會開啟商店並帶出進行中的促銷。我們沒有優惠碼，運費和退貨依 Temu 的規定。',
    eligibleCategories: 'Temu 的所有類別；各項促銷適用的商品以商店標示為準',
    validity: '促銷可能隨時變動，請以購買當天 Temu 顯示的價格為準',
    reusable: '連結可用於每一次購物',
    shipping: '運費和送貨時間會顯示在購物車，因國家或地區和訂單而異',
    combinable: '連結本身不提供折扣，適用的是 Temu 在商品頁面和購物車顯示的促銷',
    aboutBrand:
      'Temu 是國際網上商店，販售時裝、家居用品、電子產品及日用品。此頁面整合了 Cecília 的連結並說明其運作方式。透過連結購物，Em Casa com Cecília 可能會獲得佣金，買家無需支付額外費用。',
    brandLogoAlt: 'Temu 標誌',
    faqs: [
      {
        question: 'Cecília 有 Temu 的優惠碼嗎？',
        answer:
          '沒有。Em Casa com Cecília 提供的是 Temu 的聯盟連結，不是優惠碼：連結會開啟商店並帶出進行中的促銷，每件商品的折扣以 Temu 顯示的為準。',
      },
      {
        question: 'Temu 的運費是多少？',
        answer:
          '視乎國家或地區和訂單金額而定。Temu 會在付款前於購物車顯示運費和送貨時間。',
      },
      {
        question: 'Temu 如何退貨？',
        answer:
          '退貨期限和費用因國家或地區而異。Temu 針對你所在國家或地區的退貨及退款政策，可在網站底部和 App 查看，購買前請先確認。',
      },
      {
        question: 'Temu 支援哪些付款方式？',
        answer:
          '視國家或地區而定。Temu 會在付款時顯示你所在國家或地區支援的付款方式，幫助中心也有完整清單。',
      },
      {
        question: 'Temu 會收取進口稅嗎？',
        answer:
          '視國家或地區而定。跨境購物可能需要繳納進口稅和其他稅費；Temu 若在訂單中收取，金額會在付款前顯示。你所在國家或地區的規定請查看 Temu 幫助中心。',
      },
      {
        question: '透過連結購物需要複製代碼嗎？',
        answer:
          '不需要。只要點擊本頁的按鈕開啟 Temu，照常購物即可。我們沒有需要貼到購物車的代碼。',
      },
      {
        question: '透過連結購物，Cecília 會獲得佣金嗎？',
        answer:
          '有可能。Temu 可能會就歸因於連結的訂單向 Em Casa com Cecília 支付佣金，買家無需支付額外費用。',
      },
    ],
    linkInstructions: [
      '點選「查看 Temu 優惠」：Cecília 的連結會開啟商店，無需複製任何內容。',
      '選好商品，在各商品頁面確認價格和促銷。',
      '在購物車查看寄往你地址的運費和送貨時間。',
      '完成購買前，請確認包含運費和稅項的最終金額。',
    ],
    linkNote:
      'Cecília 的連結本身不提供折扣，也沒有代碼：價格和促銷以 Temu 在商品頁面和購物車顯示的為準。',
  },
  'zh-hans': {
    discount: '促销',
    offerTypeLabel: '优惠',
    offerTypeLabelPlural: '优惠',
    offerActionLabel: '查看 Temu 优惠',
    category: '服饰、家居、电子产品和日用品',
    shortDescription: 'Cecília 的商店促销链接',
    longDescription:
      'Em Casa com Cecília 没有 Temu 的优惠码：下方按钮会通过 Cecília 的链接打开商店，并带出进行中的促销。每件商品的价格和折扣，以 Temu 在商品页面和购物车显示的为准。',
    metaTitle: 'Temu：Cecília 链接的促销',
    metaDescription:
      'Cecília 的 Temu 链接会打开商店并带出进行中的促销。我们没有优惠码，运费和退货以 Temu 的规定为准。',
    eligibleCategories: 'Temu 的所有品类；各项促销适用的商品以商店标示为准',
    validity: '促销可能随时变动，请以购买当天 Temu 显示的价格为准',
    reusable: '链接可用于每一次购物',
    shipping: '运费和送达时间会显示在购物车，因国家或地区和订单而异',
    combinable: '链接本身不提供折扣，适用的是 Temu 在商品页面和购物车显示的促销',
    aboutBrand:
      'Temu 是国际网上商店，销售服饰、家居用品、电子产品和日用品。本页汇总了 Cecília 的链接并说明其运作方式。通过链接购物，Em Casa com Cecília 可能会获得佣金，买家无需支付额外费用。',
    brandLogoAlt: 'Temu 标志',
    faqs: [
      {
        question: 'Cecília 有 Temu 的优惠码吗？',
        answer:
          '没有。Em Casa com Cecília 提供的是 Temu 的联盟链接，不是优惠码：链接会打开商店并带出进行中的促销，每件商品的折扣以 Temu 显示的为准。',
      },
      {
        question: 'Temu 的运费是多少？',
        answer:
          '视国家或地区和订单金额而定。Temu 会在付款前于购物车显示运费和送达时间。',
      },
      {
        question: 'Temu 如何退货？',
        answer:
          '退货期限和费用因国家或地区而异。Temu 针对你所在国家或地区的退货和退款政策，可在网站底部和 App 查看，购买前请先确认。',
      },
      {
        question: 'Temu 支持哪些付款方式？',
        answer:
          '视国家或地区而定。Temu 会在付款时显示你所在国家或地区支持的付款方式，帮助中心也有完整列表。',
      },
      {
        question: 'Temu 会收取进口税吗？',
        answer:
          '视国家或地区而定。跨境购物可能需要缴纳进口税和其他税费；Temu 如果在订单中收取，金额会在付款前显示。你所在国家或地区的规定请查看 Temu 帮助中心。',
      },
      {
        question: '通过链接购物需要复制代码吗？',
        answer:
          '不需要。只要点击本页的按钮打开 Temu，照常购物即可。我们没有需要粘贴到购物车的代码。',
      },
      {
        question: '通过链接购物，Cecília 会获得佣金吗？',
        answer:
          '有可能。Temu 可能会就归因于链接的订单向 Em Casa com Cecília 支付佣金，买家无需支付额外费用。',
      },
    ],
    linkInstructions: [
      '点击“查看 Temu 优惠”：Cecília 的链接会打开商店，无需复制任何内容。',
      '选好商品，在各商品页面确认价格和促销。',
      '在购物车查看寄往你地址的运费和送达时间。',
      '完成购买前，请确认包含运费和税费的最终金额。',
    ],
    linkNote:
      'Cecília 的链接本身不提供折扣，也没有代码：价格和促销以 Temu 在商品页面和购物车显示的为准。',
  },
};

// Como a Temu: link sem código, sem valor de frete nem prazo de devolução, que mudam por país e por vendedor.
const ALIEXPRESS_TRANSLATIONS: Record<TranslatedLocale, AffiliateOfferTranslation> = {
  en: {
    discount: 'Promotions',
    offerTypeLabel: 'offer',
    offerTypeLabelPlural: 'offers',
    offerActionLabel: 'See offers on AliExpress',
    category: 'Electronics, fashion, home and accessories',
    shortDescription: 'Cecília\'s link to the store\'s promotions',
    longDescription:
      'Em Casa com Cecília has no coupon for AliExpress: the button below opens the store through Cecília\'s link, with whatever promotions are live. The price, shipping and delivery time of each product are the ones AliExpress shows on its page.',
    metaTitle: 'AliExpress: promotions through Cecília\'s link',
    metaDescription:
      'Cecília\'s link to AliExpress: opens the store with whatever promotions are live. No coupon from us; shipping and returns vary by seller and country.',
    eligibleCategories: 'All AliExpress categories; each promotion applies to the products the store indicates',
    validity: 'Promotions change without notice: the price AliExpress shows on the day you buy is what counts',
    reusable: 'The link can be used on every purchase',
    shipping: 'Shipping cost and delivery time appear on each product page and vary by seller and country',
    combinable: 'The link gives no discount of its own: the promotions AliExpress shows on the product page and in the cart apply',
    aboutBrand:
      'AliExpress is an international marketplace from the Alibaba group, where sellers from many countries list electronics, fashion, home goods and accessories. This page gathers Cecília\'s link and explains how it works. Purchases made through the link may earn Em Casa com Cecília a commission, at no extra cost to the buyer.',
    brandLogoAlt: 'AliExpress logo',
    faqs: [
      {
        question: 'Does Cecília have an AliExpress coupon?',
        answer:
          'No. Em Casa com Cecília has an AliExpress affiliate link, not a coupon: the link opens the store with whatever promotions are live, and the discount on each product is whatever AliExpress shows.',
      },
      {
        question: 'How much is shipping on AliExpress?',
        answer:
          'It depends on the product. AliExpress is a marketplace: each listing shows the shipping cost and estimated delivery date on its own page, and both vary by seller and country.',
      },
      {
        question: 'How do returns work on AliExpress?',
        answer:
          'The return window varies by country and seller type. AliExpress\'s return and refund policy sets out the rule for each country; also check the return conditions on the product page.',
      },
      {
        question: 'What payment methods does AliExpress accept?',
        answer:
          'It depends on the country. AliExpress shows the payment methods accepted in your country at checkout.',
      },
      {
        question: 'Does AliExpress charge import duties?',
        answer:
          'It depends on the country. International purchases may be subject to import duties and other taxes; when AliExpress charges them, the product page or checkout shows the estimated amount before you buy.',
      },
      {
        question: 'Do I need to copy a code to buy through the link?',
        answer:
          'No. Just open AliExpress with the button on this page and shop as usual. There is no code from us to paste into the cart.',
      },
      {
        question: 'Does buying through the link earn Cecília a commission?',
        answer:
          'It may. AliExpress may pay Em Casa com Cecília a commission on purchases attributed to the link, at no extra cost to the buyer.',
      },
    ],
    linkInstructions: [
      'Tap “See offers on AliExpress”: Cecília\'s link opens the store, with nothing to copy.',
      'Pick your products and check the price, shipping cost and estimated delivery date on each product page.',
      'Check the seller\'s reputation and the listing\'s return rules.',
      'Check the final price, including shipping and taxes, before completing your purchase.',
    ],
    linkNote:
      'Cecília\'s link gives no discount of its own and carries no code: the price and promotions are the ones AliExpress shows on the product page and in the cart.',
  },
  es: {
    discount: 'Promociones',
    offerTypeLabel: 'oferta',
    offerTypeLabelPlural: 'ofertas',
    offerActionLabel: 'Ver ofertas en AliExpress',
    category: 'Electrónica, moda, hogar y accesorios',
    shortDescription: 'enlace de Cecília a las promociones de la tienda',
    longDescription:
      'Em Casa com Cecília no tiene cupón de AliExpress: el botón de abajo abre la tienda con el enlace de Cecília, con las promociones que estén activas. El precio, el envío y el plazo de cada producto son los que AliExpress muestra en su página.',
    metaTitle: 'AliExpress: promociones con el enlace de Cecília',
    metaDescription:
      'Enlace de Cecília a AliExpress: abre la tienda con las promociones activas. No hay cupón nuestro; envío y devolución cambian según el vendedor y el país.',
    eligibleCategories: 'Todas las categorías de AliExpress; cada promoción vale para los productos que indique la tienda',
    validity: 'Las promociones cambian sin aviso: vale el precio que AliExpress muestra el día de la compra',
    reusable: 'El enlace se puede usar en cualquier compra',
    shipping: 'El envío y el plazo de entrega aparecen en la página de cada producto y cambian según el vendedor y el país',
    combinable: 'El enlace no da un descuento propio: valen las promociones que AliExpress muestre en la página del producto y en el carrito',
    aboutBrand:
      'AliExpress es un marketplace internacional del grupo Alibaba, donde vendedores de varios países anuncian electrónica, moda, artículos para el hogar y accesorios. Esta página reúne el enlace de Cecília y explica cómo funciona. Las compras hechas con el enlace pueden generar una comisión para Em Casa com Cecília, sin coste adicional para quien compra.',
    brandLogoAlt: 'Logotipo de AliExpress',
    faqs: [
      {
        question: '¿Cecília tiene un cupón de AliExpress?',
        answer:
          'No. Em Casa com Cecília tiene un enlace de afiliado de AliExpress, no un cupón: el enlace abre la tienda con las promociones que estén activas, y el descuento de cada producto es el que muestra AliExpress.',
      },
      {
        question: '¿Cuánto cuesta el envío en AliExpress?',
        answer:
          'Depende del producto. AliExpress es un marketplace: cada anuncio muestra el envío y la fecha estimada de entrega en su propia página, y ambos cambian según el vendedor y el país.',
      },
      {
        question: '¿Cómo funcionan las devoluciones en AliExpress?',
        answer:
          'El plazo de devolución cambia según el país y el tipo de vendedor. La política de devolución y reembolso de AliExpress recoge la regla de cada país; consulta también las condiciones de devolución en la página del producto.',
      },
      {
        question: '¿Qué formas de pago acepta AliExpress?',
        answer:
          'Depende del país. AliExpress muestra las formas de pago aceptadas en tu país en el checkout.',
      },
      {
        question: '¿AliExpress cobra impuestos de importación?',
        answer:
          'Depende del país. En las compras internacionales puede haber impuestos de importación y otros tributos; cuando AliExpress los cobra, la página del producto o el checkout muestra el importe estimado antes de la compra.',
      },
      {
        question: '¿Tengo que copiar algún código para comprar con el enlace?',
        answer:
          'No. Basta con abrir AliExpress con el botón de esta página y comprar con normalidad. No hay ningún código nuestro que pegar en el carrito.',
      },
      {
        question: '¿Comprar con el enlace genera una comisión para Cecília?',
        answer:
          'Puede generarla. AliExpress puede pagar una comisión a Em Casa com Cecília por las compras atribuidas al enlace, sin coste adicional para quien compra.',
      },
    ],
    linkInstructions: [
      'Pulsa «Ver ofertas en AliExpress»: el enlace de Cecília abre la tienda, sin copiar nada.',
      'Elige los productos y comprueba el precio, el envío y la fecha estimada de entrega en la página de cada uno.',
      'Mira la reputación del vendedor y las reglas de devolución del anuncio.',
      'Comprueba el importe final, con envío e impuestos, antes de completar la compra.',
    ],
    linkNote:
      'El enlace de Cecília no da un descuento propio ni lleva código: el precio y las promociones son los que AliExpress muestra en la página del producto y en el carrito.',
  },
  fr: {
    discount: 'Promotions',
    offerTypeLabel: 'offre',
    offerTypeLabelPlural: 'offres',
    offerActionLabel: 'Voir les offres AliExpress',
    category: 'Électronique, mode, maison et accessoires',
    shortDescription: 'lien de Cecília vers les promotions de la boutique',
    longDescription:
      'Em Casa com Cecília n\'a pas de code promo pour AliExpress\u00a0: le bouton ci-dessous ouvre la boutique via le lien de Cecília, avec les promotions en cours. Le prix, la livraison et le délai de chaque produit sont ceux qu\'AliExpress affiche sur sa page.',
    metaTitle: 'AliExpress\u00a0: promotions via le lien de Cecília',
    metaDescription:
      'Lien de Cecília vers AliExpress\u00a0: ouvre la boutique avec les promotions en cours. Pas de code promo de notre part, livraison et retours selon le vendeur.',
    eligibleCategories: 'Toutes les catégories de AliExpress\u00a0; chaque promotion s\'applique aux produits indiqués par la boutique',
    validity: 'Les promotions changent sans préavis\u00a0: c\'est le prix affiché par AliExpress le jour de l\'achat qui compte',
    reusable: 'Le lien peut être utilisé pour tous vos achats',
    shipping: 'Les frais et le délai de livraison s\'affichent sur la page de chaque produit et varient selon le vendeur et le pays',
    combinable: 'Le lien ne donne pas de réduction propre\u00a0: les promotions affichées par AliExpress sur la page du produit et dans le panier s\'appliquent',
    aboutBrand:
      'AliExpress est une place de marché internationale du groupe Alibaba, où des vendeurs de plusieurs pays proposent de l\'électronique, de la mode, des articles pour la maison et des accessoires. Cette page réunit le lien de Cecília et explique son fonctionnement. Les achats effectués via le lien peuvent rapporter une commission à Em Casa com Cecília, sans surcoût pour l\'acheteur.',
    brandLogoAlt: 'Logo AliExpress',
    faqs: [
      {
        question: 'Cecília a-t-elle un code promo AliExpress\u00a0?',
        answer:
          'Non. Em Casa com Cecília dispose d\'un lien d\'affiliation AliExpress, pas d\'un code promo\u00a0: le lien ouvre la boutique avec les promotions en cours, et la réduction de chaque produit est celle qu\'affiche AliExpress.',
      },
      {
        question: 'Combien coûte la livraison sur AliExpress\u00a0?',
        answer:
          'Cela dépend du produit. AliExpress est une place de marché\u00a0: chaque annonce affiche les frais de livraison et la date de livraison estimée sur sa propre page, et les deux varient selon le vendeur et le pays.',
      },
      {
        question: 'Comment fonctionnent les retours sur AliExpress\u00a0?',
        answer:
          'Le délai de retour varie selon le pays et le type de vendeur. La politique de retour et de remboursement d\'AliExpress précise la règle de chaque pays. Consultez aussi les conditions de retour sur la page du produit.',
      },
      {
        question: 'Quels moyens de paiement AliExpress accepte-t-il\u00a0?',
        answer:
          'Cela dépend du pays. AliExpress affiche les moyens de paiement acceptés dans votre pays au moment du paiement.',
      },
      {
        question: 'AliExpress applique-t-il des droits de douane\u00a0?',
        answer:
          'Cela dépend du pays. Les achats internationaux peuvent donner lieu à des droits de douane et à d\'autres taxes\u00a0; lorsqu\'AliExpress les facture, la page du produit ou le paiement affiche le montant estimé avant l\'achat.',
      },
      {
        question: 'Dois-je copier un code pour acheter via le lien\u00a0?',
        answer:
          'Non. Il suffit d\'ouvrir AliExpress avec le bouton de cette page et d\'acheter normalement. Il n\'y a aucun code de notre part à coller dans le panier.',
      },
      {
        question: 'Acheter via le lien rapporte-t-il une commission à Cecília\u00a0?',
        answer:
          'C\'est possible. AliExpress peut verser une commission à Em Casa com Cecília pour les achats attribués au lien, sans surcoût pour l\'acheteur.',
      },
    ],
    linkInstructions: [
      'Appuyez sur «\u00a0Voir les offres AliExpress\u00a0»\u00a0: le lien de Cecília ouvre la boutique, sans rien copier.',
      'Choisissez vos produits et vérifiez le prix, les frais de livraison et la date de livraison estimée sur la page de chacun.',
      'Consultez la réputation du vendeur et les règles de retour de l\'annonce.',
      'Vérifiez le montant final, frais de livraison et taxes compris, avant de finaliser l\'achat.',
    ],
    linkNote:
      'Le lien de Cecília ne donne pas de réduction propre et ne comporte aucun code\u00a0: le prix et les promotions sont ceux qu\'affiche AliExpress sur la page du produit et dans le panier.',
  },
  de: {
    discount: 'Aktionen',
    offerTypeLabel: 'Angebot',
    offerTypeLabelPlural: 'Angebote',
    offerActionLabel: 'Angebote bei AliExpress ansehen',
    category: 'Elektronik, Mode, Wohnen und Accessoires',
    shortDescription: 'Cecílias Link zu den Aktionen des Shops',
    longDescription:
      'Em Casa com Cecília hat keinen Gutscheincode für AliExpress: Der Button unten öffnet den Shop über Cecílias Link, mit den aktuellen Aktionen. Preis, Versand und Lieferzeit jedes Produkts sind die, die AliExpress auf der Produktseite anzeigt.',
    metaTitle: 'AliExpress: Aktionen über Cecílias Link',
    metaDescription:
      'Cecílias Link zu AliExpress: öffnet den Shop mit den aktuellen Aktionen. Kein Gutscheincode von uns; Versand und Rückgabe hängen von Verkäufer und Land ab.',
    eligibleCategories: 'Alle Kategorien von AliExpress; jede Aktion gilt für die Produkte, die der Shop angibt',
    validity: 'Aktionen ändern sich ohne Vorankündigung: Es gilt der Preis, den AliExpress am Kauftag anzeigt',
    reusable: 'Der Link kann bei jedem Einkauf genutzt werden',
    shipping: 'Versandkosten und Lieferzeit stehen auf der Seite jedes Produkts und hängen von Verkäufer und Land ab',
    combinable: 'Der Link gibt keinen eigenen Rabatt: Es gelten die Aktionen, die AliExpress auf der Produktseite und im Warenkorb anzeigt',
    aboutBrand:
      'AliExpress ist ein internationaler Marktplatz der Alibaba-Gruppe, auf dem Verkäufer aus vielen Ländern Elektronik, Mode, Wohnartikel und Accessoires anbieten. Diese Seite bündelt Cecílias Link und erklärt, wie er funktioniert. Käufe über den Link können Em Casa com Cecília eine Provision einbringen – ohne Mehrkosten für dich.',
    brandLogoAlt: 'AliExpress-Logo',
    faqs: [
      {
        question: 'Hat Cecília einen Gutscheincode für AliExpress?',
        answer:
          'Nein. Em Casa com Cecília hat einen Partnerlink zu AliExpress, keinen Gutscheincode: Der Link öffnet den Shop mit den aktuellen Aktionen, und den Rabatt auf jedes Produkt legt AliExpress fest.',
      },
      {
        question: 'Wie hoch sind die Versandkosten bei AliExpress?',
        answer:
          'Das hängt vom Produkt ab. AliExpress ist ein Marktplatz: Jedes Angebot zeigt Versandkosten und voraussichtliches Lieferdatum auf der eigenen Seite, und beides hängt von Verkäufer und Land ab.',
      },
      {
        question: 'Wie funktioniert die Rückgabe bei AliExpress?',
        answer:
          'Die Rückgabefrist hängt vom Land und von der Art des Verkäufers ab. Die Rückgabe- und Erstattungsrichtlinie von AliExpress nennt die Regel für jedes Land; prüfe auch die Rückgabebedingungen auf der Produktseite.',
      },
      {
        question: 'Welche Zahlungsarten akzeptiert AliExpress?',
        answer:
          'Das hängt vom Land ab. AliExpress zeigt dir die in deinem Land akzeptierten Zahlungsarten im Checkout an.',
      },
      {
        question: 'Erhebt AliExpress Einfuhrabgaben?',
        answer:
          'Das hängt vom Land ab. Bei internationalen Käufen können Einfuhrabgaben und andere Steuern anfallen; wenn AliExpress sie erhebt, zeigt die Produktseite oder der Checkout den geschätzten Betrag vor dem Kauf an.',
      },
      {
        question: 'Muss ich einen Code kopieren, um über den Link zu kaufen?',
        answer:
          'Nein. Öffne einfach AliExpress über den Button auf dieser Seite und kaufe wie gewohnt. Es gibt keinen Code von uns, den du im Warenkorb einfügen musst.',
      },
      {
        question: 'Bekommt Cecília eine Provision, wenn ich über den Link kaufe?',
        answer:
          'Das ist möglich. AliExpress kann Em Casa com Cecília eine Provision für Käufe zahlen, die dem Link zugeordnet werden – ohne Mehrkosten für dich.',
      },
    ],
    linkInstructions: [
      'Tippe auf „Angebote bei AliExpress ansehen“: Cecílias Link öffnet den Shop, du musst nichts kopieren.',
      'Wähle deine Produkte und prüfe Preis, Versandkosten und voraussichtliches Lieferdatum auf der jeweiligen Produktseite.',
      'Sieh dir die Bewertung des Verkäufers und die Rückgaberegeln des Angebots an.',
      'Prüfe den Endbetrag samt Versand und Steuern, bevor du den Kauf abschließt.',
    ],
    linkNote:
      'Cecílias Link gibt keinen eigenen Rabatt und enthält keinen Code: Preis und Aktionen sind die, die AliExpress auf der Produktseite und im Warenkorb anzeigt.',
  },
  it: {
    discount: 'Promozioni',
    offerTypeLabel: 'offerta',
    offerTypeLabelPlural: 'offerte',
    offerActionLabel: 'Vedi le offerte AliExpress',
    category: 'Elettronica, moda, casa e accessori',
    shortDescription: 'link di Cecília per le promozioni del negozio',
    longDescription:
      'Em Casa com Cecília non ha un coupon per AliExpress: il pulsante qui sotto apre il negozio con il link di Cecília, con le promozioni in corso. Il prezzo, la spedizione e i tempi di ogni prodotto sono quelli che AliExpress mostra nella sua pagina.',
    metaTitle: 'AliExpress: promozioni con il link di Cecília',
    metaDescription:
      'Link di Cecília per AliExpress: apre il negozio con le promozioni in corso. Nessun coupon nostro; spedizione e resi cambiano per venditore e paese.',
    eligibleCategories: 'Tutte le categorie di AliExpress; ogni promozione vale per i prodotti indicati dal negozio',
    validity: 'Le promozioni cambiano senza preavviso: vale il prezzo che AliExpress mostra il giorno dell\'acquisto',
    reusable: 'Il link può essere usato a ogni acquisto',
    shipping: 'La spedizione e i tempi di consegna compaiono nella pagina di ogni prodotto e cambiano in base al venditore e al paese',
    combinable: 'Il link non dà uno sconto proprio: valgono le promozioni che AliExpress mostra nella pagina del prodotto e nel carrello',
    aboutBrand:
      'AliExpress è un marketplace internazionale del gruppo Alibaba, dove venditori di vari paesi pubblicano elettronica, moda, articoli per la casa e accessori. Questa pagina raccoglie il link di Cecília e spiega come funziona. Gli acquisti fatti con il link possono generare una commissione per Em Casa com Cecília, senza costi aggiuntivi per chi compra.',
    brandLogoAlt: 'Logo AliExpress',
    faqs: [
      {
        question: 'Cecília ha un coupon AliExpress?',
        answer:
          'No. Em Casa com Cecília ha un link di affiliazione AliExpress, non un coupon: il link apre il negozio con le promozioni in corso, e lo sconto di ogni prodotto è quello che mostra AliExpress.',
      },
      {
        question: 'Quanto costa la spedizione su AliExpress?',
        answer:
          'Dipende dal prodotto. AliExpress è un marketplace: ogni inserzione mostra la spedizione e la data di consegna stimata nella propria pagina, ed entrambe cambiano in base al venditore e al paese.',
      },
      {
        question: 'Come funzionano i resi su AliExpress?',
        answer:
          'Il termine di reso cambia in base al paese e al tipo di venditore. La politica di reso e rimborso di AliExpress riporta la regola di ogni paese; controlla anche le condizioni di reso nella pagina del prodotto.',
      },
      {
        question: 'Quali metodi di pagamento accetta AliExpress?',
        answer:
          'Dipende dal paese. AliExpress mostra i metodi di pagamento accettati nel tuo paese al checkout.',
      },
      {
        question: 'AliExpress applica dazi di importazione?',
        answer:
          'Dipende dal paese. Negli acquisti internazionali possono esserci dazi di importazione e altre imposte; quando AliExpress li applica, la pagina del prodotto o il checkout mostra l\'importo stimato prima dell\'acquisto.',
      },
      {
        question: 'Devo copiare un codice per comprare dal link?',
        answer:
          'No. Basta aprire AliExpress con il pulsante di questa pagina e comprare come al solito. Non c\'è nessun codice nostro da incollare nel carrello.',
      },
      {
        question: 'Comprare dal link genera una commissione per Cecília?',
        answer:
          'Può succedere. AliExpress può pagare una commissione a Em Casa com Cecília per gli acquisti attribuiti al link, senza costi aggiuntivi per chi compra.',
      },
    ],
    linkInstructions: [
      'Tocca “Vedi le offerte AliExpress”: il link di Cecília apre il negozio, senza copiare nulla.',
      'Scegli i prodotti e controlla prezzo, spedizione e data di consegna stimata nella pagina di ciascuno.',
      'Guarda la reputazione del venditore e le regole di reso dell\'inserzione.',
      'Controlla l\'importo finale, con spedizione e tasse, prima di completare l\'acquisto.',
    ],
    linkNote:
      'Il link di Cecília non dà uno sconto proprio e non ha codici: il prezzo e le promozioni sono quelli che AliExpress mostra nella pagina del prodotto e nel carrello.',
  },
  ko: {
    discount: '프로모션',
    offerTypeLabel: '혜택',
    offerTypeLabelPlural: '혜택',
    offerActionLabel: 'AliExpress 혜택 보기',
    category: '전자제품, 패션, 홈, 액세서리',
    shortDescription: '스토어 프로모션으로 연결되는 Cecília의 링크',
    longDescription:
      'Em Casa com Cecília에는 AliExpress 쿠폰이 없습니다. 아래 버튼은 Cecília의 링크로 진행 중인 프로모션과 함께 스토어를 엽니다. 상품별 가격, 배송비, 배송 기간은 AliExpress가 각 상품 페이지에 표시하는 대로입니다.',
    metaTitle: 'AliExpress: Cecília 링크 프로모션',
    metaDescription:
      'Cecília의 AliExpress 링크: 진행 중인 프로모션과 함께 스토어가 열립니다. 쿠폰은 없고 배송·반품은 판매자와 국가별로 다릅니다.',
    eligibleCategories: 'AliExpress의 모든 카테고리. 프로모션별 적용 상품은 스토어가 안내하는 대로입니다',
    validity: '프로모션은 예고 없이 바뀝니다. 구매하는 날 AliExpress에 표시된 가격이 기준입니다',
    reusable: '링크는 구매할 때마다 사용할 수 있습니다',
    shipping: '배송비와 배송 기간은 각 상품 페이지에 표시되며 판매자와 국가에 따라 다릅니다',
    combinable: '링크 자체의 할인은 없으며, AliExpress 상품 페이지와 장바구니에 표시되는 프로모션이 적용됩니다',
    aboutBrand:
      'AliExpress는 알리바바 그룹의 글로벌 마켓플레이스로, 여러 나라의 판매자가 전자제품, 패션, 홈 용품, 액세서리를 판매합니다. 이 페이지에는 Cecília의 링크와 사용 방법을 정리했습니다. 링크로 구매하면 Em Casa com Cecília가 수수료를 받을 수 있으며, 구매자에게 추가 비용은 없습니다.',
    brandLogoAlt: 'AliExpress 로고',
    faqs: [
      {
        question: 'Cecília에게 AliExpress 쿠폰이 있나요?',
        answer:
          '아니요. Em Casa com Cecília에는 AliExpress 쿠폰이 아니라 제휴 링크가 있습니다. 링크를 누르면 진행 중인 프로모션과 함께 스토어가 열리며, 상품별 할인은 AliExpress에 표시된 대로입니다.',
      },
      {
        question: 'AliExpress 배송비는 얼마인가요?',
        answer:
          '상품마다 다릅니다. AliExpress는 마켓플레이스라서 각 상품 페이지에 배송비와 예상 도착일이 표시되며, 둘 다 판매자와 국가에 따라 다릅니다.',
      },
      {
        question: 'AliExpress 반품은 어떻게 하나요?',
        answer:
          '반품 기간은 국가와 판매자 유형에 따라 다릅니다. AliExpress의 반품·환불 정책에 국가별 규정이 나와 있으니, 상품 페이지의 반품 조건도 함께 확인하세요.',
      },
      {
        question: 'AliExpress에서는 어떤 결제 수단을 사용할 수 있나요?',
        answer:
          '국가마다 다릅니다. AliExpress는 결제 단계에서 해당 국가에서 사용할 수 있는 결제 수단을 보여 줍니다.',
      },
      {
        question: 'AliExpress는 수입 관세를 부과하나요?',
        answer:
          '국가마다 다릅니다. 해외 구매에는 수입 관세와 기타 세금이 붙을 수 있으며, AliExpress가 이를 부과하는 경우 상품 페이지나 결제 단계에서 구매 전에 예상 금액이 표시됩니다.',
      },
      {
        question: '링크로 구매할 때 코드를 복사해야 하나요?',
        answer:
          '아니요. 이 페이지의 버튼으로 AliExpress를 연 뒤 평소처럼 구매하면 됩니다. 장바구니에 붙여 넣을 코드는 없습니다.',
      },
      {
        question: '링크로 구매하면 Cecília가 수수료를 받나요?',
        answer:
          '받을 수 있습니다. AliExpress는 링크로 연결된 구매에 대해 Em Casa com Cecília에 수수료를 지급할 수 있으며, 구매자에게 추가 비용은 없습니다.',
      },
    ],
    linkInstructions: [
      '“AliExpress 혜택 보기”를 누르세요. Cecília의 링크로 스토어가 열리며, 복사할 것은 없습니다.',
      '상품을 고르고 각 상품 페이지에서 가격, 배송비, 예상 도착일을 확인하세요.',
      '판매자 평판과 해당 상품의 반품 규정을 확인하세요.',
      '구매를 완료하기 전에 배송비와 세금을 포함한 최종 금액을 확인하세요.',
    ],
    linkNote:
      'Cecília의 링크에는 자체 할인도 코드도 없습니다. 가격과 프로모션은 AliExpress 상품 페이지와 장바구니에 표시되는 내용을 따릅니다.',
  },
  ja: {
    discount: 'セール',
    offerTypeLabel: 'オファー',
    offerTypeLabelPlural: 'オファー',
    offerActionLabel: 'AliExpress のオファーを見る',
    category: '家電、ファッション、インテリア、アクセサリー',
    shortDescription: 'ストアのプロモーションへの Cecília のリンク',
    longDescription:
      'Em Casa com Cecília に AliExpress のクーポンはありません。下のボタンから Cecília のリンクで、開催中のプロモーションとともにストアが開きます。各商品の価格、送料、配送日数は、AliExpress が商品ページに表示するとおりです。',
    metaTitle: 'AliExpress：Cecília のリンクのプロモーション',
    metaDescription:
      'Cecília の AliExpress リンクで、開催中のプロモーションとともにストアが開きます。クーポンはなく、送料と返品は出品者と国で変わります。',
    eligibleCategories: 'AliExpress のすべてのカテゴリー。プロモーションごとの対象商品はストアの案内に従います',
    validity: 'プロモーションは予告なく変わります。購入日に AliExpress が表示する価格が適用されます',
    reusable: 'リンクは購入のたびに使えます',
    shipping: '送料と配送日数は各商品ページに表示され、出品者と国によって変わります',
    combinable: 'リンク自体に割引はありません。AliExpress が商品ページとカートに表示するプロモーションが適用されます',
    aboutBrand:
      'AliExpress は、アリババグループの国際的なマーケットプレイスで、さまざまな国の出品者が家電、ファッション、インテリア雑貨、アクセサリーを出品しています。このページでは Cecília のリンクと使い方をまとめています。リンクから購入すると Em Casa com Cecília に報酬が入ることがありますが、購入者の追加負担はありません。',
    brandLogoAlt: 'AliExpress のロゴ',
    faqs: [
      {
        question: 'Cecília に AliExpress のクーポンはありますか？',
        answer:
          'いいえ。Em Casa com Cecília にあるのはクーポンではなく AliExpress のアフィリエイトリンクです。リンクから開催中のプロモーションとともにストアが開き、各商品の割引は AliExpress の表示のとおりです。',
      },
      {
        question: 'AliExpress の送料はいくらですか？',
        answer:
          '商品によって異なります。AliExpress はマーケットプレイスで、各商品ページに送料と配送予定日が表示され、どちらも出品者と国によって変わります。',
      },
      {
        question: 'AliExpress の返品はどうなりますか？',
        answer:
          '返品期間は国と出品者の種類によって異なります。AliExpress の返品・返金ポリシーに国ごとのルールが載っています。商品ページの返品条件もあわせてご確認ください。',
      },
      {
        question: 'AliExpress ではどの支払い方法が使えますか？',
        answer:
          '国によって異なります。AliExpress はチェックアウトで、お住まいの国で利用できる支払い方法を表示します。',
      },
      {
        question: 'AliExpress は輸入関税を請求しますか？',
        answer:
          '国によって異なります。海外からの購入には、輸入関税やその他の税金がかかることがあります。AliExpress が請求する場合は、購入前に商品ページまたはチェックアウトで目安の金額が表示されます。',
      },
      {
        question: 'リンクから購入するとき、コードをコピーする必要はありますか？',
        answer:
          'いいえ。このページのボタンから AliExpress を開き、いつもどおり購入するだけです。カートに貼り付ける当サイトのコードはありません。',
      },
      {
        question: 'リンクから購入すると Cecília に報酬が入りますか？',
        answer:
          '入る場合があります。リンク経由の購入について、AliExpress が Em Casa com Cecília に報酬を支払うことがありますが、購入者の追加負担はありません。',
      },
    ],
    linkInstructions: [
      '「AliExpress のオファーを見る」をタップします。Cecília のリンクでストアが開くので、コピーするものはありません。',
      '商品を選び、各商品ページで価格、送料、配送予定日を確認します。',
      '出品者の評価と、その商品の返品ルールを確認します。',
      '購入を確定する前に、送料と税金を含めた最終金額を確認します。',
    ],
    linkNote:
      'Cecília のリンクに独自の割引やコードはありません。価格とプロモーションは、AliExpress が商品ページとカートに表示するものです。',
  },
  'zh-hant': {
    discount: '促銷',
    offerTypeLabel: '優惠',
    offerTypeLabelPlural: '優惠',
    offerActionLabel: '查看 AliExpress 優惠',
    category: '電子產品、時裝、家居及配飾',
    shortDescription: 'Cecília 的商店促銷連結',
    longDescription:
      'Em Casa com Cecília 沒有 AliExpress 的優惠碼：下方按鈕會透過 Cecília 的連結開啟商店，並帶出進行中的促銷。每件商品的價格、運費和送達時間，以 AliExpress 在商品頁面顯示的為準。',
    metaTitle: 'AliExpress：Cecília 連結的促銷',
    metaDescription:
      'Cecília 的 AliExpress 連結會開啟商店並帶出進行中的促銷。我們沒有優惠碼，運費和退貨視賣家及國家而定。',
    eligibleCategories: 'AliExpress 的所有類別；各項促銷適用的商品以商店標示為準',
    validity: '促銷可能隨時變動，請以購買當天 AliExpress 顯示的價格為準',
    reusable: '連結可用於每一次購物',
    shipping: '運費和送貨時間會顯示在各商品頁面，因賣家和國家或地區而異',
    combinable: '連結本身不提供折扣，適用的是 AliExpress 在商品頁面和購物車顯示的促銷',
    aboutBrand:
      'AliExpress 是阿里巴巴集團旗下的國際市集平台，多個國家的賣家在此銷售電子產品、時裝、家居用品及配飾。此頁面整合了 Cecília 的連結並說明其運作方式。透過連結購物，Em Casa com Cecília 可能會獲得佣金，買家無需支付額外費用。',
    brandLogoAlt: 'AliExpress 標誌',
    faqs: [
      {
        question: 'Cecília 有 AliExpress 的優惠碼嗎？',
        answer:
          '沒有。Em Casa com Cecília 提供的是 AliExpress 的聯盟連結，不是優惠碼：連結會開啟商店並帶出進行中的促銷，每件商品的折扣以 AliExpress 顯示的為準。',
      },
      {
        question: 'AliExpress 的運費是多少？',
        answer:
          '視乎商品而定。AliExpress 是市集平台：每個商品頁面都會顯示運費和預計送達日期，兩者都因賣家和國家或地區而異。',
      },
      {
        question: 'AliExpress 如何退貨？',
        answer:
          '退貨期限因國家或地區和賣家類型而異。AliExpress 的退貨及退款政策列明各國家或地區的規定；也請查看商品頁面上的退貨條件。',
      },
      {
        question: 'AliExpress 支援哪些付款方式？',
        answer:
          '視國家或地區而定。AliExpress 會在結帳時顯示你所在國家或地區支援的付款方式。',
      },
      {
        question: 'AliExpress 會收取進口稅嗎？',
        answer:
          '視國家或地區而定。跨境購物可能需要繳納進口稅和其他稅費；AliExpress 若收取，商品頁面或結帳頁會在購買前顯示預估金額。',
      },
      {
        question: '透過連結購物需要複製代碼嗎？',
        answer:
          '不需要。只要點擊本頁的按鈕開啟 AliExpress，照常購物即可。我們沒有需要貼到購物車的代碼。',
      },
      {
        question: '透過連結購物，Cecília 會獲得佣金嗎？',
        answer:
          '有可能。AliExpress 可能會就歸因於連結的訂單向 Em Casa com Cecília 支付佣金，買家無需支付額外費用。',
      },
    ],
    linkInstructions: [
      '點選「查看 AliExpress 優惠」：Cecília 的連結會開啟商店，無需複製任何內容。',
      '選好商品，在各商品頁面確認價格、運費和預計送達日期。',
      '查看賣家的評價和該商品的退貨規則。',
      '完成購買前，請確認包含運費和稅項的最終金額。',
    ],
    linkNote:
      'Cecília 的連結本身不提供折扣，也沒有代碼：價格和促銷以 AliExpress 在商品頁面和購物車顯示的為準。',
  },
  'zh-hans': {
    discount: '促销',
    offerTypeLabel: '优惠',
    offerTypeLabelPlural: '优惠',
    offerActionLabel: '查看 AliExpress 优惠',
    category: '电子产品、服饰、家居和配饰',
    shortDescription: 'Cecília 的商店促销链接',
    longDescription:
      'Em Casa com Cecília 没有 AliExpress 的优惠码：下方按钮会通过 Cecília 的链接打开商店，并带出进行中的促销。每件商品的价格、运费和送达时间，以 AliExpress 在商品页面显示的为准。',
    metaTitle: 'AliExpress：Cecília 链接的促销',
    metaDescription:
      'Cecília 的 AliExpress 链接会打开商店并带出进行中的促销。我们没有优惠码，运费和退货视卖家及国家而定。',
    eligibleCategories: 'AliExpress 的所有品类；各项促销适用的商品以商店标示为准',
    validity: '促销可能随时变动，请以购买当天 AliExpress 显示的价格为准',
    reusable: '链接可用于每一次购物',
    shipping: '运费和送达时间会显示在各商品页面，因卖家和国家或地区而异',
    combinable: '链接本身不提供折扣，适用的是 AliExpress 在商品页面和购物车显示的促销',
    aboutBrand:
      'AliExpress 是阿里巴巴集团旗下的国际电商平台，多个国家的卖家在此销售电子产品、服饰、家居用品和配饰。本页汇总了 Cecília 的链接并说明其运作方式。通过链接购物，Em Casa com Cecília 可能会获得佣金，买家无需支付额外费用。',
    brandLogoAlt: 'AliExpress 标志',
    faqs: [
      {
        question: 'Cecília 有 AliExpress 的优惠码吗？',
        answer:
          '没有。Em Casa com Cecília 提供的是 AliExpress 的联盟链接，不是优惠码：链接会打开商店并带出进行中的促销，每件商品的折扣以 AliExpress 显示的为准。',
      },
      {
        question: 'AliExpress 的运费是多少？',
        answer:
          '视商品而定。AliExpress 是电商平台：每个商品页面都会显示运费和预计送达日期，两者都因卖家和国家或地区而异。',
      },
      {
        question: 'AliExpress 如何退货？',
        answer:
          '退货期限因国家或地区和卖家类型而异。AliExpress 的退货和退款政策列明各国家或地区的规定；也请查看商品页面上的退货条件。',
      },
      {
        question: 'AliExpress 支持哪些付款方式？',
        answer:
          '视国家或地区而定。AliExpress 会在结账时显示你所在国家或地区支持的付款方式。',
      },
      {
        question: 'AliExpress 会收取进口税吗？',
        answer:
          '视国家或地区而定。跨境购物可能需要缴纳进口税和其他税费；AliExpress 如果收取，商品页面或结账页会在购买前显示预估金额。',
      },
      {
        question: '通过链接购物需要复制代码吗？',
        answer:
          '不需要。只要点击本页的按钮打开 AliExpress，照常购物即可。我们没有需要粘贴到购物车的代码。',
      },
      {
        question: '通过链接购物，Cecília 会获得佣金吗？',
        answer:
          '有可能。AliExpress 可能会就归因于链接的订单向 Em Casa com Cecília 支付佣金，买家无需支付额外费用。',
      },
    ],
    linkInstructions: [
      '点击“查看 AliExpress 优惠”：Cecília 的链接会打开商店，无需复制任何内容。',
      '选好商品，在各商品页面确认价格、运费和预计送达日期。',
      '查看卖家的评价和该商品的退货规则。',
      '完成购买前，请确认包含运费和税费的最终金额。',
    ],
    linkNote:
      'Cecília 的链接本身不提供折扣，也没有代码：价格和促销以 AliExpress 在商品页面和购物车显示的为准。',
  },
};

// Os mesmos 5 links de afiliado do PT, um por produto: a Proton é global e leva o visitante ao site no idioma dele.
const PROTON_TRANSLATIONS: Record<TranslatedLocale, AffiliateOfferTranslation> = {
  en: {
    discount: 'Up to 75% off',
    offerTypeLabel: 'offer',
    offerTypeLabelPlural: 'offers',
    offerActionLabel: 'Get up to 75% off via the link',
    category: 'VPN, email, passwords and cloud storage with privacy',
    shortDescription: 'up to 75% off Proton VPN, Mail, Pass, Drive and Lumo through Cecília\'s links',
    longDescription:
      'On Black Friday, Proton has up to 75% off on every line through Cecília\'s links: Proton VPN, Mail, Pass, Drive, Lumo and Proton Unlimited. Just tap the button for the product, pick the plan and subscribe, with no code to copy. And if you don\'t like it, Proton refunds the subscription if the refund is requested within 30 days.',
    metaTitle: 'Proton Black Friday: up to 75% off with Cecília\'s link',
    metaDescription:
      'Proton with up to 75% off on Black Friday through Cecília\'s links: VPN, Mail, Pass, Drive and Lumo, no code to copy and a refund within 30 days.',
    eligibleCategories: 'Paid plans of Proton VPN, Proton Mail, Proton Pass, Proton Drive, Lumo and Proton Unlimited',
    validity: 'Proton\'s Black Friday promotion, with no announced end date; the final price is what Proton shows at checkout on the day you subscribe',
    reusable: 'The links can be used on every subscription',
    shipping: 'Not applicable: the plans are digital and activated in your Proton account',
    combinable: 'Cecília\'s links open Proton with up to 75% off on Black Friday, with no code to add on top',
    aboutBrand:
      'Proton is a Swiss company focused on privacy and encryption: VPN, email, a password manager, cloud storage and Lumo, an artificial intelligence assistant. The products have a free plan, and the paid ones can be subscribed to one by one or together in Proton Unlimited. This page gathers Cecília\'s links for each product. Subscriptions made through the links may earn Em Casa com Cecília a commission, at no extra cost to the subscriber.',
    brandLogoAlt: 'Proton logo',
    productLinks: [
      {
        name: 'Proton VPN',
        url: 'https://go.getproton.me/SH39K',
        description:
          'Up to 75% off through Cecília\'s link. VPN with a free plan and VPN Plus, for up to 10 devices and servers in more than 140 countries. The link also leads to Proton Unlimited.',
      },
      {
        name: 'Proton Mail',
        url: 'https://go.getproton.me/SH39L',
        description: 'Up to 75% off through Cecília\'s link. End-to-end encrypted email, with a free plan and paid plans with more storage and addresses.',
      },
      {
        name: 'Proton Pass',
        url: 'https://go.getproton.me/SH39M',
        description: 'Up to 75% off through Cecília\'s link. Encrypted password manager for storing passwords, cards and notes and filling in logins in the browser and on your phone.',
      },
      {
        name: 'Proton Drive',
        url: 'https://go.getproton.me/SH39N',
        description: 'Up to 75% off through Cecília\'s link. End-to-end encrypted cloud storage for photos and documents, with a free plan.',
      },
      {
        name: 'Lumo',
        url: 'https://go.getproton.me/SH39O',
        description: 'Up to 75% off through Cecília\'s link. Proton\'s artificial intelligence assistant, built for chatting without giving up your privacy.',
      },
    ],
    faqs: [
      {
        question: 'How big is Proton\'s Black Friday discount?',
        answer:
          'Up to 75% off on every line through Cecília\'s links: Proton VPN, Mail, Pass, Drive, Lumo and Proton Unlimited. The discount on each plan appears on the plans page the link opens, and the final price at checkout.',
      },
      {
        question: 'Does Cecília have a Proton coupon?',
        answer:
          'No coupon needed: on Black Friday, Cecília\'s links already open Proton with up to 75% off. Just tap the button for the product you want, pick the plan and subscribe, with no code to paste at checkout.',
      },
      {
        question: 'Does Proton refund my money if I don\'t like it?',
        answer:
          'Yes. According to the Proton VPN plans page, read on November 17, 2026, Proton refunds any subscription if the refund is requested within 30 days. Payments made in cash or by bank transfer are not refundable, according to Proton\'s help center.',
      },
      {
        question: 'Does Proton have a free plan?',
        answer:
          'Yes. According to the plans pages read on November 17, 2026, free Proton VPN protects 1 device at a time, with servers in 10 countries, and the free account includes email and 5 GB on Proton Drive. The paid plans unlock more devices, storage and features.',
      },
      {
        question: 'What payment methods does Proton accept?',
        answer:
          'According to Proton\'s help center, read on November 17, 2026: credit and debit cards, PayPal, Apple Pay, Google Pay, Bitcoin, cash and bank transfer. Prices appear in dollars, euros or Swiss francs.',
      },
      {
        question: 'What is Proton Unlimited?',
        answer:
          'It is the plan that brings Proton\'s paid products together in a single subscription. The Proton VPN link on this page leads to the VPN Plus and Proton Unlimited plans.',
      },
      {
        question: 'Do I need to copy a code to subscribe through the link?',
        answer:
          'No. Just open Proton with the button for the product you want and subscribe as usual. There is no code from us to paste at checkout.',
      },
      {
        question: 'Does subscribing through the link earn Cecília a commission?',
        answer:
          'It may. Proton may pay Em Casa com Cecília a commission on subscriptions made through the links on this page, renewals included, at no extra cost to the subscriber.',
      },
    ],
    linkInstructions: [
      'Pick the product under “Proton links by product” or tap “Get up to 75% off via the link”: Cecília\'s link opens the official site, with nothing to copy.',
      'Compare the plans: the products have a free plan and paid plans, monthly or yearly.',
      'Create a Proton account, or log in to yours, and check the price at checkout, in the currency Proton shows.',
      'If you don\'t like it, ask for a refund within the first 30 days.',
    ],
    linkNote:
      'On Black Friday, Cecília\'s links open Proton with up to 75% off, with no code to copy: the discount on each plan appears on the plans page, and the final price at checkout.',
  },
  es: {
    discount: 'Hasta un 75 % de descuento',
    offerTypeLabel: 'oferta',
    offerTypeLabelPlural: 'ofertas',
    offerActionLabel: 'Consigue hasta un 75 % de descuento con el enlace',
    category: 'VPN, correo, contraseñas y nube con privacidad',
    shortDescription: 'hasta un 75 % de descuento en Proton VPN, Mail, Pass, Drive y Lumo con los enlaces de Cecília',
    longDescription:
      'En el Black Friday, Proton tiene hasta un 75 % de descuento en todas las líneas con los enlaces de Cecília: Proton VPN, Mail, Pass, Drive, Lumo y Proton Unlimited. Solo tienes que tocar el botón del producto, elegir el plan y suscribirte, sin ningún código que copiar. Y, si no te gusta, Proton devuelve el importe de la suscripción si pides el reembolso en un plazo de 30 días.',
    metaTitle: 'Proton Black Friday: hasta un 75 % con el enlace de Cecília',
    metaDescription:
      'Proton con hasta un 75 % de descuento en el Black Friday con los enlaces de Cecília: VPN, Mail, Pass, Drive y Lumo, sin código y con reembolso en 30 días.',
    eligibleCategories: 'Planes de pago de Proton VPN, Proton Mail, Proton Pass, Proton Drive, Lumo y Proton Unlimited',
    validity: 'Promoción de Black Friday de Proton, sin fecha de fin anunciada; el precio final es el que Proton muestra en el pago el día de la suscripción',
    reusable: 'Los enlaces se pueden usar en cualquier suscripción',
    shipping: 'No se aplica: los planes son digitales y se activan en tu cuenta de Proton',
    combinable: 'Los enlaces de Cecília abren Proton con hasta un 75 % de descuento en el Black Friday, sin código que sumar',
    aboutBrand:
      'Proton es una empresa suiza centrada en la privacidad y el cifrado: VPN, correo, gestor de contraseñas, almacenamiento en la nube y Lumo, un asistente de inteligencia artificial. Los productos tienen un plan gratuito, y los de pago se pueden contratar uno a uno o juntos en Proton Unlimited. Esta página reúne los enlaces de Cecília para cada producto. Las suscripciones hechas con los enlaces pueden generar una comisión para Em Casa com Cecília, sin coste adicional para quien se suscribe.',
    brandLogoAlt: 'Logotipo de Proton',
    productLinks: [
      {
        name: 'Proton VPN',
        url: 'https://go.getproton.me/SH39K',
        description:
          'Hasta un 75 % de descuento con el enlace de Cecília. VPN con plan gratuito y VPN Plus, para hasta 10 dispositivos y servidores en más de 140 países. El enlace lleva también a Proton Unlimited.',
      },
      {
        name: 'Proton Mail',
        url: 'https://go.getproton.me/SH39L',
        description: 'Hasta un 75 % de descuento con el enlace de Cecília. Correo con cifrado de extremo a extremo, con plan gratuito y planes de pago con más espacio y direcciones.',
      },
      {
        name: 'Proton Pass',
        url: 'https://go.getproton.me/SH39M',
        description: 'Hasta un 75 % de descuento con el enlace de Cecília. Gestor de contraseñas con cifrado, para guardar contraseñas, tarjetas y notas y rellenar inicios de sesión en el navegador y en el móvil.',
      },
      {
        name: 'Proton Drive',
        url: 'https://go.getproton.me/SH39N',
        description: 'Hasta un 75 % de descuento con el enlace de Cecília. Almacenamiento en la nube con cifrado de extremo a extremo para fotos y documentos, con plan gratuito.',
      },
      {
        name: 'Lumo',
        url: 'https://go.getproton.me/SH39O',
        description: 'Hasta un 75 % de descuento con el enlace de Cecília. El asistente de inteligencia artificial de Proton, creado para conversar sin renunciar a la privacidad.',
      },
    ],
    faqs: [
      {
        question: '¿Cuánto descuento da Proton en el Black Friday?',
        answer:
          'Hasta un 75 % de descuento en todas las líneas con los enlaces de Cecília: Proton VPN, Mail, Pass, Drive, Lumo y Proton Unlimited. El descuento de cada plan aparece en la página de planes que abre el enlace, y el precio final, en el pago.',
      },
      {
        question: '¿Cecília tiene un cupón de Proton?',
        answer:
          'No hace falta cupón: en el Black Friday, los enlaces de Cecília ya abren Proton con hasta un 75 % de descuento. Solo tienes que tocar el botón del producto que quieres, elegir el plan y suscribirte, sin ningún código que pegar en el pago.',
      },
      {
        question: '¿Proton devuelve el dinero si no me gusta?',
        answer:
          'Sí. Según la página de planes de Proton VPN, consultada el 17 de noviembre de 2026, Proton devuelve el importe de cualquier suscripción si el reembolso se solicita en un plazo de 30 días. Los pagos en efectivo y por transferencia bancaria no tienen reembolso, según el centro de ayuda de Proton.',
      },
      {
        question: '¿Proton tiene plan gratuito?',
        answer:
          'Sí. Según las páginas de planes consultadas el 17 de noviembre de 2026, Proton VPN gratis protege 1 dispositivo a la vez, con servidores en 10 países, y la cuenta gratuita incluye correo y 5 GB en Proton Drive. Los planes de pago ofrecen más dispositivos, espacio y funciones.',
      },
      {
        question: '¿Qué formas de pago acepta Proton?',
        answer:
          'Según el centro de ayuda de Proton, consultado el 17 de noviembre de 2026: tarjeta de crédito y de débito, PayPal, Apple Pay, Google Pay, Bitcoin, efectivo y transferencia bancaria. Los precios aparecen en dólares, euros o francos suizos.',
      },
      {
        question: '¿Qué es Proton Unlimited?',
        answer:
          'Es el plan que reúne los productos de pago de Proton en una sola suscripción. El enlace de Proton VPN de esta página lleva a los planes VPN Plus y Proton Unlimited.',
      },
      {
        question: '¿Tengo que copiar algún código para suscribirme con el enlace?',
        answer:
          'No. Basta con abrir Proton con el botón del producto que quieras y suscribirte con normalidad. No hay ningún código nuestro que pegar en el pago.',
      },
      {
        question: '¿Suscribirme con el enlace genera una comisión para Cecília?',
        answer:
          'Puede generarla. Proton puede pagar una comisión a Em Casa com Cecília por las suscripciones hechas con los enlaces de esta página, renovaciones incluidas, sin coste adicional para quien se suscribe.',
      },
    ],
    linkInstructions: [
      'Elige el producto en «Enlaces de Proton por producto» o pulsa «Consigue hasta un 75 % de descuento con el enlace»: el enlace de Cecília abre el sitio oficial, sin copiar nada.',
      'Compara los planes: los productos tienen plan gratuito y planes de pago, mensuales o anuales.',
      'Crea tu cuenta de Proton, o entra en la que ya tienes, y comprueba el precio en el pago, en la moneda que muestre Proton.',
      'Si no te gusta, pide el reembolso en los primeros 30 días.',
    ],
    linkNote:
      'En el Black Friday, los enlaces de Cecília abren Proton con hasta un 75 % de descuento, sin código que copiar: el descuento de cada plan aparece en la página de planes, y el precio final, en el pago.',
  },
  fr: {
    discount: 'Jusqu\'à 75 % de réduction',
    offerTypeLabel: 'offre',
    offerTypeLabelPlural: 'offres',
    offerActionLabel: 'Profitez de jusqu’à 75 % de réduction via le lien',
    category: 'VPN, e-mail, mots de passe et cloud respectueux de la vie privée',
    shortDescription: 'jusqu\'à 75 % de réduction sur Proton VPN, Mail, Pass, Drive et Lumo avec les liens de Cecília',
    longDescription:
      'Pour le Black Friday, Proton propose jusqu\'à 75 % de réduction sur toutes ses gammes avec les liens de Cecília : Proton VPN, Mail, Pass, Drive, Lumo et Proton Unlimited. Il suffit d\'appuyer sur le bouton du produit, de choisir l\'offre et de vous abonner, sans code à copier. Et si le service ne vous plaît pas, Proton rembourse l\'abonnement si le remboursement est demandé dans les 30 jours.',
    metaTitle: 'Proton Black Friday : jusqu\'à 75 % avec le lien de Cecília',
    metaDescription:
      'Proton jusqu\'à 75 % de réduction pour le Black Friday avec les liens de Cecília : VPN, Mail, Pass, Drive et Lumo, sans code et remboursement sous 30 jours.',
    eligibleCategories: 'Offres payantes de Proton VPN, Proton Mail, Proton Pass, Proton Drive, Lumo et Proton Unlimited',
    validity: 'Promotion Black Friday de Proton, sans date de fin annoncée ; le prix final est celui que Proton affiche au paiement le jour de l\'abonnement',
    reusable: 'Les liens peuvent être utilisés pour chaque abonnement',
    shipping: 'Sans objet : les offres sont numériques et activées dans votre compte Proton',
    combinable: 'Les liens de Cecília ouvrent Proton avec jusqu\'à 75 % de réduction pour le Black Friday, sans code à cumuler',
    aboutBrand:
      'Proton est une entreprise suisse spécialisée dans la confidentialité et le chiffrement : VPN, e-mail, gestionnaire de mots de passe, stockage dans le cloud et Lumo, un assistant d\'intelligence artificielle. Les produits ont une offre gratuite, et les offres payantes peuvent être souscrites une à une ou ensemble avec Proton Unlimited. Cette page réunit les liens de Cecília pour chaque produit. Les abonnements souscrits via les liens peuvent rapporter une commission à Em Casa com Cecília, sans surcoût pour l\'abonné.',
    brandLogoAlt: 'Logo Proton',
    productLinks: [
      {
        name: 'Proton VPN',
        url: 'https://go.getproton.me/SH39K',
        description:
          'Jusqu\'à 75 % de réduction avec le lien de Cecília. VPN avec offre gratuite et VPN Plus, pour jusqu\'à 10 appareils et des serveurs dans plus de 140 pays. Le lien mène aussi à Proton Unlimited.',
      },
      {
        name: 'Proton Mail',
        url: 'https://go.getproton.me/SH39L',
        description: 'Jusqu\'à 75 % de réduction avec le lien de Cecília. E-mail chiffré de bout en bout, avec une offre gratuite et des offres payantes offrant plus d\'espace et d\'adresses.',
      },
      {
        name: 'Proton Pass',
        url: 'https://go.getproton.me/SH39M',
        description: 'Jusqu\'à 75 % de réduction avec le lien de Cecília. Gestionnaire de mots de passe chiffré, pour enregistrer mots de passe, cartes et notes et remplir les identifiants dans le navigateur et sur le téléphone.',
      },
      {
        name: 'Proton Drive',
        url: 'https://go.getproton.me/SH39N',
        description: 'Jusqu\'à 75 % de réduction avec le lien de Cecília. Stockage dans le cloud chiffré de bout en bout pour photos et documents, avec une offre gratuite.',
      },
      {
        name: 'Lumo',
        url: 'https://go.getproton.me/SH39O',
        description: 'Jusqu\'à 75 % de réduction avec le lien de Cecília. L\'assistant d\'intelligence artificielle de Proton, conçu pour discuter sans renoncer à la confidentialité.',
      },
    ],
    faqs: [
      {
        question: 'Quelle réduction Proton propose-t-il pour le Black Friday ?',
        answer:
          'Jusqu\'à 75 % de réduction sur toutes les gammes avec les liens de Cecília : Proton VPN, Mail, Pass, Drive, Lumo et Proton Unlimited. La réduction de chaque offre apparaît sur la page des offres que le lien ouvre, et le prix final, au paiement.',
      },
      {
        question: 'Cecília a-t-elle un code promo Proton ?',
        answer:
          'Pas besoin de code promo : pour le Black Friday, les liens de Cecília ouvrent déjà Proton avec jusqu\'à 75 % de réduction. Il suffit d\'appuyer sur le bouton du produit souhaité, de choisir l\'offre et de vous abonner, sans code à coller au paiement.',
      },
      {
        question: 'Proton rembourse-t-il si le service ne me plaît pas ?',
        answer:
          'Oui. Selon la page des offres de Proton VPN, consultée le 17 novembre 2026, Proton rembourse tout abonnement si le remboursement est demandé dans les 30 jours. Les paiements en espèces et par virement bancaire ne sont pas remboursables, selon le centre d\'aide de Proton.',
      },
      {
        question: 'Proton propose-t-il une offre gratuite ?',
        answer:
          'Oui. Selon les pages des offres consultées le 17 novembre 2026, Proton VPN gratuit protège 1 appareil à la fois, avec des serveurs dans 10 pays, et le compte gratuit comprend une messagerie et 5 Go sur Proton Drive. Les offres payantes débloquent plus d\'appareils, d\'espace et de fonctionnalités.',
      },
      {
        question: 'Quels moyens de paiement Proton accepte-t-il ?',
        answer:
          'Selon le centre d\'aide de Proton, consulté le 17 novembre 2026 : carte bancaire de crédit et de débit, PayPal, Apple Pay, Google Pay, Bitcoin, espèces et virement bancaire. Les prix s\'affichent en dollars, en euros ou en francs suisses.',
      },
      {
        question: 'Qu\'est-ce que Proton Unlimited ?',
        answer:
          'C\'est l\'offre qui réunit les produits payants de Proton dans un seul abonnement. Le lien Proton VPN de cette page mène aux offres VPN Plus et Proton Unlimited.',
      },
      {
        question: 'Dois-je copier un code pour m\'abonner via le lien ?',
        answer:
          'Non. Il suffit d\'ouvrir Proton avec le bouton du produit qui vous intéresse et de vous abonner normalement. Il n\'y a aucun code de notre part à coller au paiement.',
      },
      {
        question: 'S\'abonner via le lien rapporte-t-il une commission à Cecília ?',
        answer:
          'C\'est possible. Proton peut verser une commission à Em Casa com Cecília pour les abonnements souscrits via les liens de cette page, renouvellements compris, sans surcoût pour l\'abonné.',
      },
    ],
    linkInstructions: [
      'Choisissez le produit dans « Liens Proton par produit » ou appuyez sur « Profitez de jusqu’à 75 % de réduction via le lien » : le lien de Cecília ouvre le site officiel, sans rien copier.',
      'Comparez les offres : les produits ont une offre gratuite et des offres payantes, au mois ou à l\'année.',
      'Créez votre compte Proton, ou connectez-vous au vôtre, et vérifiez le prix au paiement, dans la devise affichée par Proton.',
      'Si le service ne vous plaît pas, demandez le remboursement dans les 30 premiers jours.',
    ],
    linkNote:
      'Pour le Black Friday, les liens de Cecília ouvrent Proton avec jusqu\'à 75 % de réduction, sans code à copier : la réduction de chaque offre apparaît sur la page des offres, et le prix final, au paiement.',
  },
  de: {
    discount: 'Bis zu 75 % Rabatt',
    offerTypeLabel: 'Angebot',
    offerTypeLabelPlural: 'Angebote',
    offerActionLabel: 'Bis zu 75 % Rabatt über den Link sichern',
    category: 'VPN, E-Mail, Passwörter und Cloud mit Datenschutz',
    shortDescription: 'bis zu 75 % Rabatt auf Proton VPN, Mail, Pass, Drive und Lumo über Cecílias Links',
    longDescription:
      'Zum Black Friday gibt Proton über Cecílias Links bis zu 75 % Rabatt auf alle Produktlinien: Proton VPN, Mail, Pass, Drive, Lumo und Proton Unlimited. Tippe einfach auf den Button des Produkts, wähle den Tarif und schließe das Abo ab, ganz ohne Code zum Kopieren. Und wenn es dir nicht gefällt, erstattet Proton das Abo, wenn du die Erstattung innerhalb von 30 Tagen beantragst.',
    metaTitle: 'Proton Black Friday: bis zu 75 % mit Cecílias Link',
    metaDescription:
      'Proton mit bis zu 75 % Rabatt zum Black Friday über Cecílias Links: VPN, Mail, Pass, Drive und Lumo, ohne Code und mit Erstattung innerhalb von 30 Tagen.',
    eligibleCategories: 'Bezahlte Tarife von Proton VPN, Proton Mail, Proton Pass, Proton Drive, Lumo und Proton Unlimited',
    validity: 'Black-Friday-Aktion von Proton, ohne angekündigtes Ende; der Endpreis ist der, den Proton am Tag des Abschlusses an der Kasse anzeigt',
    reusable: 'Die Links können bei jedem Abo genutzt werden',
    shipping: 'Entfällt: Die Tarife sind digital und werden in deinem Proton-Konto freigeschaltet',
    combinable: 'Cecílias Links öffnen Proton mit bis zu 75 % Rabatt zum Black Friday, ohne Code zum Draufrechnen',
    aboutBrand:
      'Proton ist ein Schweizer Unternehmen mit Schwerpunkt auf Datenschutz und Verschlüsselung: VPN, E-Mail, Passwortmanager, Cloud-Speicher und Lumo, ein Assistent mit künstlicher Intelligenz. Die Produkte haben einen kostenlosen Tarif, und die bezahlten lassen sich einzeln oder gemeinsam in Proton Unlimited abonnieren. Diese Seite bündelt Cecílias Links für jedes Produkt. Abos über die Links können Em Casa com Cecília eine Provision einbringen – ohne Mehrkosten für dich.',
    brandLogoAlt: 'Proton-Logo',
    productLinks: [
      {
        name: 'Proton VPN',
        url: 'https://go.getproton.me/SH39K',
        description:
          'Bis zu 75 % Rabatt über Cecílias Link. VPN mit kostenlosem Tarif und VPN Plus, für bis zu 10 Geräte und Server in mehr als 140 Ländern. Der Link führt auch zu Proton Unlimited.',
      },
      {
        name: 'Proton Mail',
        url: 'https://go.getproton.me/SH39L',
        description: 'Bis zu 75 % Rabatt über Cecílias Link. Ende-zu-Ende-verschlüsselte E-Mail, mit kostenlosem Tarif und bezahlten Tarifen mit mehr Speicher und Adressen.',
      },
      {
        name: 'Proton Pass',
        url: 'https://go.getproton.me/SH39M',
        description: 'Bis zu 75 % Rabatt über Cecílias Link. Verschlüsselter Passwortmanager zum Speichern von Passwörtern, Karten und Notizen und zum Ausfüllen von Logins im Browser und auf dem Handy.',
      },
      {
        name: 'Proton Drive',
        url: 'https://go.getproton.me/SH39N',
        description: 'Bis zu 75 % Rabatt über Cecílias Link. Ende-zu-Ende-verschlüsselter Cloud-Speicher für Fotos und Dokumente, mit kostenlosem Tarif.',
      },
      {
        name: 'Lumo',
        url: 'https://go.getproton.me/SH39O',
        description: 'Bis zu 75 % Rabatt über Cecílias Link. Protons Assistent mit künstlicher Intelligenz, gemacht zum Chatten, ohne auf Datenschutz zu verzichten.',
      },
    ],
    faqs: [
      {
        question: 'Wie viel Rabatt gibt Proton am Black Friday?',
        answer:
          'Bis zu 75 % Rabatt auf alle Produktlinien über Cecílias Links: Proton VPN, Mail, Pass, Drive, Lumo und Proton Unlimited. Der Rabatt für jeden Tarif steht auf der Tarifseite, die der Link öffnet, und der Endpreis an der Kasse.',
      },
      {
        question: 'Hat Cecília einen Gutscheincode für Proton?',
        answer:
          'Einen Gutscheincode brauchst du nicht: Zum Black Friday öffnen Cecílias Links Proton schon mit bis zu 75 % Rabatt. Tippe einfach auf den Button des Produkts, das du möchtest, wähle den Tarif und schließe das Abo ab, ohne Code, den du an der Kasse einfügen musst.',
      },
      {
        question: 'Erstattet Proton das Geld, wenn es mir nicht gefällt?',
        answer:
          'Ja. Laut der Tarifseite von Proton VPN, gelesen am 17. November 2026, erstattet Proton jedes Abo, wenn du die Erstattung innerhalb von 30 Tagen beantragst. Barzahlungen und Banküberweisungen werden laut Hilfe-Center von Proton nicht erstattet.',
      },
      {
        question: 'Hat Proton einen kostenlosen Tarif?',
        answer:
          'Ja. Laut den Tarifseiten, gelesen am 17. November 2026, schützt das kostenlose Proton VPN 1 Gerät gleichzeitig, mit Servern in 10 Ländern, und das kostenlose Konto enthält E-Mail und 5 GB auf Proton Drive. Die bezahlten Tarife schalten mehr Geräte, Speicher und Funktionen frei.',
      },
      {
        question: 'Welche Zahlungsarten akzeptiert Proton?',
        answer:
          'Laut Hilfe-Center von Proton, gelesen am 17. November 2026: Kredit- und Debitkarte, PayPal, Apple Pay, Google Pay, Bitcoin, Barzahlung und Banküberweisung. Die Preise werden in Dollar, Euro oder Schweizer Franken angezeigt.',
      },
      {
        question: 'Was ist Proton Unlimited?',
        answer:
          'Das ist der Tarif, der die bezahlten Produkte von Proton in einem einzigen Abo zusammenfasst. Der Proton-VPN-Link auf dieser Seite führt zu den Tarifen VPN Plus und Proton Unlimited.',
      },
      {
        question: 'Muss ich einen Code kopieren, um über den Link zu abonnieren?',
        answer:
          'Nein. Öffne einfach Proton über den Button des Produkts, das du möchtest, und schließe das Abo wie gewohnt ab. Es gibt keinen Code von uns, den du an der Kasse einfügen musst.',
      },
      {
        question: 'Bekommt Cecília eine Provision, wenn ich über den Link abonniere?',
        answer:
          'Das ist möglich. Proton kann Em Casa com Cecília eine Provision für Abos zahlen, die über die Links auf dieser Seite abgeschlossen werden, Verlängerungen eingeschlossen – ohne Mehrkosten für dich.',
      },
    ],
    linkInstructions: [
      'Wähle das Produkt unter „Proton-Links nach Produkt“ oder tippe auf „Bis zu 75 % Rabatt über den Link sichern“: Cecílias Link öffnet die offizielle Website, du musst nichts kopieren.',
      'Vergleiche die Tarife: Die Produkte haben einen kostenlosen Tarif und bezahlte Tarife, monatlich oder jährlich.',
      'Erstelle ein Proton-Konto oder melde dich in deinem an und prüfe den Preis an der Kasse, in der Währung, die Proton anzeigt.',
      'Wenn es dir nicht gefällt, fordere die Erstattung in den ersten 30 Tagen an.',
    ],
    linkNote:
      'Zum Black Friday öffnen Cecílias Links Proton mit bis zu 75 % Rabatt, ohne Code zum Kopieren: Der Rabatt für jeden Tarif steht auf der Tarifseite und der Endpreis an der Kasse.',
  },
  it: {
    discount: 'Fino al 75% di sconto',
    offerTypeLabel: 'offerta',
    offerTypeLabelPlural: 'offerte',
    offerActionLabel: 'Ottieni fino al 75% di sconto con il link',
    category: 'VPN, e-mail, password e cloud con privacy',
    shortDescription: 'fino al 75% di sconto su Proton VPN, Mail, Pass, Drive e Lumo con i link di Cecília',
    longDescription:
      'Per il Black Friday, Proton offre fino al 75% di sconto su tutte le linee con i link di Cecília: Proton VPN, Mail, Pass, Drive, Lumo e Proton Unlimited. Basta toccare il pulsante del prodotto, scegliere il piano e abbonarsi, senza alcun codice da copiare. E, se non ti piace, Proton rimborsa l\'abbonamento se il rimborso viene richiesto entro 30 giorni.',
    metaTitle: 'Proton Black Friday: fino al 75% con il link di Cecília',
    metaDescription:
      'Proton con fino al 75% di sconto per il Black Friday con i link di Cecília: VPN, Mail, Pass, Drive e Lumo, senza codice e con rimborso entro 30 giorni.',
    eligibleCategories: 'Piani a pagamento di Proton VPN, Proton Mail, Proton Pass, Proton Drive, Lumo e Proton Unlimited',
    validity: 'Promozione Black Friday di Proton, senza data di fine annunciata; il prezzo finale è quello che Proton mostra al pagamento il giorno dell\'abbonamento',
    reusable: 'I link possono essere usati a ogni abbonamento',
    shipping: 'Non si applica: i piani sono digitali e vengono attivati nel tuo account Proton',
    combinable: 'I link di Cecília aprono Proton con fino al 75% di sconto per il Black Friday, senza codice da sommare',
    aboutBrand:
      'Proton è un\'azienda svizzera focalizzata su privacy e crittografia: VPN, e-mail, gestore di password, archiviazione cloud e Lumo, un assistente di intelligenza artificiale. I prodotti hanno un piano gratuito, e quelli a pagamento si possono sottoscrivere uno alla volta o insieme in Proton Unlimited. Questa pagina raccoglie i link di Cecília per ogni prodotto. Gli abbonamenti fatti con i link possono generare una commissione per Em Casa com Cecília, senza costi aggiuntivi per chi si abbona.',
    brandLogoAlt: 'Logo Proton',
    productLinks: [
      {
        name: 'Proton VPN',
        url: 'https://go.getproton.me/SH39K',
        description:
          'Fino al 75% di sconto con il link di Cecília. VPN con piano gratuito e VPN Plus, per un massimo di 10 dispositivi e server in più di 140 paesi. Il link porta anche a Proton Unlimited.',
      },
      {
        name: 'Proton Mail',
        url: 'https://go.getproton.me/SH39L',
        description: 'Fino al 75% di sconto con il link di Cecília. E-mail con crittografia end-to-end, con piano gratuito e piani a pagamento con più spazio e indirizzi.',
      },
      {
        name: 'Proton Pass',
        url: 'https://go.getproton.me/SH39M',
        description: 'Fino al 75% di sconto con il link di Cecília. Gestore di password con crittografia, per conservare password, carte e note e compilare i login nel browser e sul telefono.',
      },
      {
        name: 'Proton Drive',
        url: 'https://go.getproton.me/SH39N',
        description: 'Fino al 75% di sconto con il link di Cecília. Archiviazione cloud con crittografia end-to-end per foto e documenti, con piano gratuito.',
      },
      {
        name: 'Lumo',
        url: 'https://go.getproton.me/SH39O',
        description: 'Fino al 75% di sconto con il link di Cecília. L\'assistente di intelligenza artificiale di Proton, pensato per conversare senza rinunciare alla privacy.',
      },
    ],
    faqs: [
      {
        question: 'Quanto sconto offre Proton per il Black Friday?',
        answer:
          'Fino al 75% di sconto su tutte le linee con i link di Cecília: Proton VPN, Mail, Pass, Drive, Lumo e Proton Unlimited. Lo sconto di ogni piano compare nella pagina dei piani che il link apre, e il prezzo finale, al pagamento.',
      },
      {
        question: 'Cecília ha un coupon Proton?',
        answer:
          'Non serve alcun coupon: per il Black Friday, i link di Cecília aprono già Proton con fino al 75% di sconto. Basta toccare il pulsante del prodotto che vuoi, scegliere il piano e abbonarti, senza alcun codice da incollare al pagamento.',
      },
      {
        question: 'Proton rimborsa i soldi se non mi piace?',
        answer:
          'Sì. Secondo la pagina dei piani di Proton VPN, letta il 17 novembre 2026, Proton rimborsa qualsiasi abbonamento se il rimborso viene richiesto entro 30 giorni. I pagamenti in contanti e con bonifico bancario non sono rimborsabili, secondo il centro assistenza di Proton.',
      },
      {
        question: 'Proton ha un piano gratuito?',
        answer:
          'Sì. Secondo le pagine dei piani lette il 17 novembre 2026, Proton VPN gratuito protegge 1 dispositivo alla volta, con server in 10 paesi, e l\'account gratuito include e-mail e 5 GB su Proton Drive. I piani a pagamento sbloccano più dispositivi, spazio e funzioni.',
      },
      {
        question: 'Quali metodi di pagamento accetta Proton?',
        answer:
          'Secondo il centro assistenza di Proton, letto il 17 novembre 2026: carta di credito e di debito, PayPal, Apple Pay, Google Pay, Bitcoin, contanti e bonifico bancario. I prezzi compaiono in dollari, euro o franchi svizzeri.',
      },
      {
        question: 'Che cos\'è Proton Unlimited?',
        answer:
          'È il piano che riunisce i prodotti a pagamento di Proton in un solo abbonamento. Il link di Proton VPN in questa pagina porta ai piani VPN Plus e Proton Unlimited.',
      },
      {
        question: 'Devo copiare un codice per abbonarmi dal link?',
        answer:
          'No. Basta aprire Proton con il pulsante del prodotto che vuoi e abbonarti come al solito. Non c\'è nessun codice nostro da incollare al pagamento.',
      },
      {
        question: 'Abbonarsi dal link genera una commissione per Cecília?',
        answer:
          'Può succedere. Proton può pagare una commissione a Em Casa com Cecília per gli abbonamenti fatti con i link di questa pagina, rinnovi inclusi, senza costi aggiuntivi per chi si abbona.',
      },
    ],
    linkInstructions: [
      'Scegli il prodotto in “Link di Proton per prodotto” oppure tocca “Ottieni fino al 75% di sconto con il link”: il link di Cecília apre il sito ufficiale, senza copiare nulla.',
      'Confronta i piani: i prodotti hanno un piano gratuito e piani a pagamento, mensili o annuali.',
      'Crea un account Proton, o accedi al tuo, e controlla il prezzo al pagamento, nella valuta che Proton mostra.',
      'Se non ti piace, chiedi il rimborso nei primi 30 giorni.',
    ],
    linkNote:
      'Per il Black Friday, i link di Cecília aprono Proton con fino al 75% di sconto, senza codice da copiare: lo sconto di ogni piano compare nella pagina dei piani, e il prezzo finale, al pagamento.',
  },
  ko: {
    discount: '최대 75% 할인',
    offerTypeLabel: '혜택',
    offerTypeLabelPlural: '혜택',
    offerActionLabel: '링크로 최대 75% 할인 받기',
    category: '개인정보를 지키는 VPN, 이메일, 비밀번호, 클라우드',
    shortDescription: 'Cecília의 링크로 Proton VPN, Mail, Pass, Drive, Lumo 최대 75% 할인',
    longDescription:
      '블랙 프라이데이 기간 동안 Cecília의 링크로 Proton의 모든 제품군이 최대 75% 할인됩니다: Proton VPN, Mail, Pass, Drive, Lumo, Proton Unlimited. 제품 버튼을 누르고 요금제를 선택해 구독하기만 하면 되며, 복사할 코드는 없습니다. 마음에 들지 않으면 30일 이내에 환불을 신청할 경우 Proton이 구독 금액을 환불해 줍니다.',
    metaTitle: 'Proton 블랙 프라이데이: Cecília 링크로 최대 75% 할인',
    metaDescription:
      'Cecília의 링크로 블랙 프라이데이 Proton 최대 75% 할인: VPN, Mail, Pass, Drive, Lumo. 코드 없이, 30일 이내 환불 가능.',
    eligibleCategories: 'Proton VPN, Proton Mail, Proton Pass, Proton Drive, Lumo, Proton Unlimited의 유료 요금제',
    validity: 'Proton의 블랙 프라이데이 프로모션으로, 종료일은 발표되지 않았습니다. 최종 가격은 구독하는 날 Proton이 결제 화면에 표시하는 금액입니다',
    reusable: '링크는 구독할 때마다 사용할 수 있습니다',
    shipping: '해당 없음: 요금제는 디지털 상품이며 Proton 계정에서 바로 적용됩니다',
    combinable: 'Cecília의 링크는 블랙 프라이데이 최대 75% 할인이 적용된 Proton을 엽니다. 추가로 더할 코드는 없습니다',
    aboutBrand:
      'Proton은 개인정보 보호와 암호화에 집중하는 스위스 기업으로, VPN, 이메일, 비밀번호 관리자, 클라우드 저장소, 그리고 인공지능 어시스턴트 Lumo를 제공합니다. 제품마다 무료 요금제가 있으며, 유료 요금제는 하나씩 구독하거나 Proton Unlimited로 함께 구독할 수 있습니다. 이 페이지에는 제품별 Cecília의 링크를 모았습니다. 링크로 구독하면 Em Casa com Cecília가 수수료를 받을 수 있으며, 구독자에게 추가 비용은 없습니다.',
    brandLogoAlt: 'Proton 로고',
    productLinks: [
      {
        name: 'Proton VPN',
        url: 'https://go.getproton.me/SH39K',
        description:
          'Cecília의 링크로 최대 75% 할인. 무료 요금제와 최대 10대 기기, 140개국 이상 서버를 지원하는 VPN Plus가 있는 VPN. 이 링크는 Proton Unlimited로도 연결됩니다.',
      },
      {
        name: 'Proton Mail',
        url: 'https://go.getproton.me/SH39L',
        description: 'Cecília의 링크로 최대 75% 할인. 종단 간 암호화 이메일. 무료 요금제와 저장 공간과 주소가 더 많은 유료 요금제가 있습니다.',
      },
      {
        name: 'Proton Pass',
        url: 'https://go.getproton.me/SH39M',
        description: 'Cecília의 링크로 최대 75% 할인. 비밀번호, 카드, 메모를 보관하고 브라우저와 휴대폰에서 로그인 정보를 자동으로 입력해 주는 암호화 비밀번호 관리자입니다.',
      },
      {
        name: 'Proton Drive',
        url: 'https://go.getproton.me/SH39N',
        description: 'Cecília의 링크로 최대 75% 할인. 사진과 문서를 위한 종단 간 암호화 클라우드 저장소. 무료 요금제가 있습니다.',
      },
      {
        name: 'Lumo',
        url: 'https://go.getproton.me/SH39O',
        description: 'Cecília의 링크로 최대 75% 할인. 개인정보를 포기하지 않고 대화할 수 있도록 만든 Proton의 인공지능 어시스턴트입니다.',
      },
    ],
    faqs: [
      {
        question: 'Proton은 블랙 프라이데이에 얼마나 할인해 주나요?',
        answer:
          'Cecília의 링크로 Proton VPN, Mail, Pass, Drive, Lumo, Proton Unlimited 등 모든 제품군이 최대 75% 할인됩니다. 각 요금제의 할인은 링크가 여는 요금제 페이지에 표시되고, 최종 가격은 결제 화면에서 확인할 수 있습니다.',
      },
      {
        question: 'Cecília에게 Proton 쿠폰이 있나요?',
        answer:
          '쿠폰은 필요 없습니다. 블랙 프라이데이 기간에는 Cecília의 링크가 이미 최대 75% 할인이 적용된 Proton을 엽니다. 원하는 제품의 버튼을 누르고 요금제를 선택해 구독하기만 하면 되며, 결제 화면에 붙여넣을 코드는 없습니다.',
      },
      {
        question: '마음에 들지 않으면 Proton이 환불해 주나요?',
        answer:
          '네. 2026년 11월 17일에 확인한 Proton VPN 요금제 페이지에 따르면, 30일 안에 환불을 요청하면 Proton이 모든 구독을 환불합니다. Proton 고객센터에 따르면 현금과 계좌 이체로 결제한 경우에는 환불되지 않습니다.',
      },
      {
        question: 'Proton에는 무료 요금제가 있나요?',
        answer:
          '있습니다. 2026년 11월 17일에 확인한 요금제 페이지에 따르면, 무료 Proton VPN은 한 번에 1대의 기기를 보호하며 10개국 서버를 쓸 수 있고, 무료 계정에는 이메일과 Proton Drive 5GB가 포함됩니다. 유료 요금제는 더 많은 기기, 저장 공간, 기능을 제공합니다.',
      },
      {
        question: 'Proton에서는 어떤 결제 수단을 사용할 수 있나요?',
        answer:
          '2026년 11월 17일에 확인한 Proton 고객센터에 따르면 신용카드와 체크카드, PayPal, Apple Pay, Google Pay, 비트코인, 현금, 계좌 이체를 사용할 수 있습니다. 가격은 달러, 유로 또는 스위스 프랑으로 표시됩니다.',
      },
      {
        question: 'Proton Unlimited는 무엇인가요?',
        answer:
          'Proton의 유료 제품을 하나의 구독으로 묶은 요금제입니다. 이 페이지의 Proton VPN 링크는 VPN Plus와 Proton Unlimited 요금제로 연결됩니다.',
      },
      {
        question: '링크로 구독할 때 코드를 복사해야 하나요?',
        answer:
          '아니요. 원하는 제품의 버튼으로 Proton을 연 뒤 평소처럼 구독하면 됩니다. 결제 화면에 붙여 넣을 코드는 없습니다.',
      },
      {
        question: '링크로 구독하면 Cecília가 수수료를 받나요?',
        answer:
          '받을 수 있습니다. Proton은 이 페이지의 링크로 이뤄진 구독(갱신 포함)에 대해 Em Casa com Cecília에 수수료를 지급할 수 있으며, 구독자에게 추가 비용은 없습니다.',
      },
    ],
    linkInstructions: [
      '“제품별 Proton 링크”에서 제품을 고르거나 “링크로 최대 75% 할인 받기”를 누르세요. Cecília의 링크로 공식 사이트가 열리며, 복사할 것은 없습니다.',
      '요금제를 비교하세요. 제품마다 무료 요금제와 월간 또는 연간 유료 요금제가 있습니다.',
      'Proton 계정을 만들거나 기존 계정으로 로그인한 뒤, Proton이 표시하는 통화로 결제 화면의 가격을 확인하세요.',
      '마음에 들지 않으면 처음 30일 안에 환불을 요청하세요.',
    ],
    linkNote:
      '블랙 프라이데이 기간에는 Cecília의 링크가 최대 75% 할인이 적용된 Proton을 엽니다. 복사할 코드는 없으며, 각 요금제의 할인은 요금제 페이지에, 최종 가격은 결제 화면에 표시됩니다.',
  },
  ja: {
    discount: '最大75%オフ',
    offerTypeLabel: 'オファー',
    offerTypeLabelPlural: 'オファー',
    offerActionLabel: 'リンクから最大75%オフを手に入れる',
    category: 'プライバシーを守る VPN、メール、パスワード、クラウド',
    shortDescription: 'Cecília のリンクから Proton VPN、Mail、Pass、Drive、Lumo が最大75%オフ',
    longDescription:
      'ブラックフライデーの間、Cecília のリンクから Proton の全ラインが最大75%オフです：Proton VPN、Mail、Pass、Drive、Lumo、Proton Unlimited。製品のボタンをタップしてプランを選び、契約するだけで、コピーするコードは必要ありません。気に入らなかった場合も、30日以内に返金を申請すれば Proton が契約料金を返金します。',
    metaTitle: 'Proton ブラックフライデー：Cecília のリンクで最大75%オフ',
    metaDescription:
      'Cecília のリンクから Proton がブラックフライデーで最大75%オフ：VPN、Mail、Pass、Drive、Lumo。コード不要、30日以内なら返金可能です。',
    eligibleCategories: 'Proton VPN、Proton Mail、Proton Pass、Proton Drive、Lumo、Proton Unlimited の有料プラン',
    validity: 'Proton のブラックフライデー特典で、終了日は発表されていません。最終価格は、契約日に Proton がチェックアウトで表示する金額です',
    reusable: 'リンクは契約のたびに使えます',
    shipping: '該当しません。プランはデジタル商品で、Proton アカウントですぐに使えます',
    combinable: 'Cecília のリンクからは、ブラックフライデーの最大75%オフで Proton が開きます。上乗せするコードはありません',
    aboutBrand:
      'Proton は、プライバシーと暗号化に力を入れるスイスの企業で、VPN、メール、パスワードマネージャー、クラウドストレージ、そして AI アシスタントの Lumo を提供しています。どの製品にも無料プランがあり、有料プランは 1 つずつでも、Proton Unlimited でまとめても契約できます。このページでは製品ごとの Cecília のリンクをまとめています。リンクから契約すると Em Casa com Cecília に報酬が入ることがありますが、契約者の追加負担はありません。',
    brandLogoAlt: 'Proton のロゴ',
    productLinks: [
      {
        name: 'Proton VPN',
        url: 'https://go.getproton.me/SH39K',
        description:
          'Cecília のリンクから最大75%オフ。 無料プランと、最大 10 台のデバイスと 140 か国以上のサーバーに対応する VPN Plus がある VPN。このリンクは Proton Unlimited にもつながります。',
      },
      {
        name: 'Proton Mail',
        url: 'https://go.getproton.me/SH39L',
        description: 'Cecília のリンクから最大75%オフ。 エンドツーエンド暗号化のメール。無料プランと、容量とアドレスが増える有料プランがあります。',
      },
      {
        name: 'Proton Pass',
        url: 'https://go.getproton.me/SH39M',
        description: 'Cecília のリンクから最大75%オフ。 パスワード、カード、メモを保管し、ブラウザとスマートフォンでログイン情報を自動入力できる、暗号化パスワードマネージャーです。',
      },
      {
        name: 'Proton Drive',
        url: 'https://go.getproton.me/SH39N',
        description: 'Cecília のリンクから最大75%オフ。 写真や書類のためのエンドツーエンド暗号化クラウドストレージ。無料プランがあります。',
      },
      {
        name: 'Lumo',
        url: 'https://go.getproton.me/SH39O',
        description: 'Cecília のリンクから最大75%オフ。 プライバシーを手放さずに会話できるよう作られた、Proton の AI アシスタントです。',
      },
    ],
    faqs: [
      {
        question: 'Proton のブラックフライデーの割引はどのくらいですか？',
        answer:
          'Cecília のリンクから、Proton VPN、Mail、Pass、Drive、Lumo、Proton Unlimited の全ラインが最大75%オフです。各プランの割引はリンク先のプランページに表示され、最終価格はチェックアウトで確認できます。',
      },
      {
        question: 'Cecília に Proton のクーポンはありますか？',
        answer:
          'クーポンは不要です。ブラックフライデーの間は、Cecília のリンクから開くだけで Proton が最大75%オフになります。ご希望の製品のボタンをタップしてプランを選び、契約するだけで、チェックアウトで貼り付けるコードはありません。',
      },
      {
        question: '気に入らなかった場合、Proton は返金してくれますか？',
        answer:
          'はい。2026年11月17日に確認した Proton VPN のプランのページによると、30 日以内に返金を申請すれば、Proton はどのサブスクリプションも返金します。Proton のヘルプセンターによると、現金と銀行振込での支払いは返金の対象外です。',
      },
      {
        question: 'Proton に無料プランはありますか？',
        answer:
          'あります。2026年11月17日に確認したプランのページによると、無料の Proton VPN は同時に 1 台のデバイスを保護し、10 か国のサーバーを使えます。無料アカウントにはメールと Proton Drive の 5 GB が含まれます。有料プランでは、デバイス数、容量、機能が増えます。',
      },
      {
        question: 'Proton ではどの支払い方法が使えますか？',
        answer:
          '2026年11月17日に確認した Proton のヘルプセンターによると、クレジットカードとデビットカード、PayPal、Apple Pay、Google Pay、ビットコイン、現金、銀行振込が使えます。価格はドル、ユーロ、スイスフランで表示されます。',
      },
      {
        question: 'Proton Unlimited とは何ですか？',
        answer:
          'Proton の有料製品を 1 つのサブスクリプションにまとめたプランです。このページの Proton VPN のリンクは、VPN Plus と Proton Unlimited のプランにつながります。',
      },
      {
        question: 'リンクから契約するとき、コードをコピーする必要はありますか？',
        answer:
          'いいえ。ご希望の製品のボタンから Proton を開き、いつもどおり契約するだけです。決済画面に貼り付ける当サイトのコードはありません。',
      },
      {
        question: 'リンクから契約すると Cecília に報酬が入りますか？',
        answer:
          '入る場合があります。このページのリンクから行われた契約（更新を含む）について、Proton が Em Casa com Cecília に報酬を支払うことがありますが、契約者の追加負担はありません。',
      },
    ],
    linkInstructions: [
      '「製品別の Proton リンク」から製品を選ぶか、「リンクから最大75%オフを手に入れる」をタップします。Cecília のリンクで公式サイトが開くので、コピーするものはありません。',
      'プランを比べます。どの製品にも無料プランと、月払いまたは年払いの有料プランがあります。',
      'Proton アカウントを作成するか、お持ちのアカウントにログインし、Proton が表示する通貨で決済画面の価格を確認します。',
      '気に入らなかった場合は、最初の 30 日以内に返金を申請します。',
    ],
    linkNote:
      'ブラックフライデーの間、Cecília のリンクから最大75%オフで Proton が開きます。コピーするコードはありません。各プランの割引はプランページに表示され、最終価格はチェックアウトで確認できます。',
  },
  'zh-hant': {
    discount: '最高 75% 折扣',
    offerTypeLabel: '優惠',
    offerTypeLabelPlural: '優惠',
    offerActionLabel: '透過連結領取最高 75% 折扣',
    category: '注重私隱的 VPN、電郵、密碼及雲端儲存',
    shortDescription: '透過 Cecília 的連結，Proton VPN、Mail、Pass、Drive 和 Lumo 最高 75% 折扣',
    longDescription:
      '黑色星期五期間，透過 Cecília 的連結，Proton 全線產品最高享 75% 折扣：Proton VPN、Mail、Pass、Drive、Lumo 和 Proton Unlimited。只需點擊產品按鈕，選擇方案並訂閱即可，無需複製任何代碼。如果不喜歡，在 30 天內申請退款，Proton 會退還訂閱費用。',
    metaTitle: 'Proton 黑色星期五：透過 Cecília 連結最高 75% 折扣',
    metaDescription:
      '透過 Cecília 的連結，Proton 黑色星期五最高 75% 折扣：VPN、Mail、Pass、Drive 和 Lumo，無需代碼，30 天內可退款。',
    eligibleCategories: 'Proton VPN、Proton Mail、Proton Pass、Proton Drive、Lumo 和 Proton Unlimited 的付費方案',
    validity: 'Proton 的黑色星期五優惠，尚未公布結束日期；最終價格以訂閱當天 Proton 在結帳頁顯示的為準',
    reusable: '連結可用於每一次訂閱',
    shipping: '不適用：方案均為數碼產品，會在你的 Proton 帳戶中啟用',
    combinable: 'Cecília 的連結會以黑色星期五最高 75% 折扣開啟 Proton，無需疊加任何代碼',
    aboutBrand:
      'Proton 是一家專注於私隱和加密的瑞士公司，提供 VPN、電郵、密碼管理器、雲端儲存，以及人工智能助手 Lumo。各產品均設有免費方案，付費方案可逐一訂閱，也可透過 Proton Unlimited 一併訂閱。此頁面整合了 Cecília 為各產品提供的連結。透過連結訂閱，Em Casa com Cecília 可能會獲得佣金，訂閱者無需支付額外費用。',
    brandLogoAlt: 'Proton 標誌',
    productLinks: [
      {
        name: 'Proton VPN',
        url: 'https://go.getproton.me/SH39K',
        description:
          '透過 Cecília 的連結最高 75% 折扣。 提供免費方案及 VPN Plus 的 VPN，VPN Plus 最多可用於 10 部裝置，伺服器遍及 140 多個國家或地區。此連結亦會帶你前往 Proton Unlimited。',
      },
      {
        name: 'Proton Mail',
        url: 'https://go.getproton.me/SH39L',
        description: '透過 Cecília 的連結最高 75% 折扣。 端對端加密電郵，提供免費方案，以及容量和地址更多的付費方案。',
      },
      {
        name: 'Proton Pass',
        url: 'https://go.getproton.me/SH39M',
        description: '透過 Cecília 的連結最高 75% 折扣。 加密密碼管理器，可儲存密碼、卡片和筆記，並在瀏覽器和手機上自動填入登入資料。',
      },
      {
        name: 'Proton Drive',
        url: 'https://go.getproton.me/SH39N',
        description: '透過 Cecília 的連結最高 75% 折扣。 為相片和文件提供端對端加密的雲端儲存，設有免費方案。',
      },
      {
        name: 'Lumo',
        url: 'https://go.getproton.me/SH39O',
        description: '透過 Cecília 的連結最高 75% 折扣。 Proton 的人工智能助手，讓你在對話時不必犧牲私隱。',
      },
    ],
    faqs: [
      {
        question: 'Proton 在黑色星期五有多少折扣？',
        answer:
          '透過 Cecília 的連結，Proton 全線產品最高 75% 折扣：Proton VPN、Mail、Pass、Drive、Lumo 和 Proton Unlimited。每個方案的折扣顯示在連結開啟的方案頁面上，最終價格在結帳時顯示。',
      },
      {
        question: 'Cecília 有 Proton 的優惠碼嗎？',
        answer:
          '不需要優惠碼：黑色星期五期間，Cecília 的連結開啟的 Proton 已帶有最高 75% 折扣。只需點擊你想要的產品按鈕，選擇方案並訂閱，無需在結帳時貼上任何代碼。',
      },
      {
        question: '如果不喜歡，Proton 會退款嗎？',
        answer:
          '會。根據 2026 年 11 月 17 日查閱的 Proton VPN 方案頁面，只要在 30 天內申請退款，Proton 會退還任何訂閱的費用。根據 Proton 幫助中心，以現金和銀行轉帳付款的訂單不設退款。',
      },
      {
        question: 'Proton 有免費方案嗎？',
        answer:
          '有。根據 2026 年 11 月 17 日查閱的方案頁面，免費的 Proton VPN 同一時間保護 1 部裝置，可使用 10 個國家或地區的伺服器，免費帳戶包含電郵和 Proton Drive 的 5 GB 空間。付費方案提供更多裝置、容量和功能。',
      },
      {
        question: 'Proton 支援哪些付款方式？',
        answer:
          '根據 2026 年 11 月 17 日查閱的 Proton 幫助中心，支援信用卡和扣帳卡、PayPal、Apple Pay、Google Pay、比特幣、現金和銀行轉帳。價格以美元、歐元或瑞士法郎顯示。',
      },
      {
        question: '什麼是 Proton Unlimited？',
        answer:
          '這是把 Proton 的付費產品合併為單一訂閱的方案。本頁的 Proton VPN 連結會帶你前往 VPN Plus 和 Proton Unlimited 方案。',
      },
      {
        question: '透過連結訂閱需要複製代碼嗎？',
        answer:
          '不需要。只要點擊你想要的產品按鈕開啟 Proton，照常訂閱即可。我們沒有需要貼到結帳頁面的代碼。',
      },
      {
        question: '透過連結訂閱，Cecília 會獲得佣金嗎？',
        answer:
          '有可能。Proton 可能會就透過本頁連結完成的訂閱（包括續訂）向 Em Casa com Cecília 支付佣金，訂閱者無需支付額外費用。',
      },
    ],
    linkInstructions: [
      '在「Proton 各產品連結」選擇產品，或點選「透過連結領取最高 75% 折扣」：Cecília 的連結會開啟官方網站，無需複製任何內容。',
      '比較各方案：每個產品都有免費方案，以及按月或按年計費的付費方案。',
      '建立 Proton 帳戶，或登入你現有的帳戶，並在結帳時確認價格，貨幣以 Proton 顯示的為準。',
      '如果不喜歡，請在最初 30 天內申請退款。',
    ],
    linkNote:
      '黑色星期五期間，Cecília 的連結會以最高 75% 折扣開啟 Proton，無需複製代碼：每個方案的折扣顯示在方案頁面上，最終價格在結帳時顯示。',
  },
  'zh-hans': {
    discount: '最高 75% 折扣',
    offerTypeLabel: '优惠',
    offerTypeLabelPlural: '优惠',
    offerActionLabel: '通过链接领取最高 75% 折扣',
    category: '注重隐私的 VPN、邮箱、密码和云存储',
    shortDescription: '通过 Cecília 的链接，Proton VPN、Mail、Pass、Drive 和 Lumo 最高 75% 折扣',
    longDescription:
      '黑色星期五期间，通过 Cecília 的链接，Proton 全线产品最高享 75% 折扣：Proton VPN、Mail、Pass、Drive、Lumo 和 Proton Unlimited。只需点击产品按钮，选择方案并订阅即可，无需复制任何代码。如果不喜欢，在 30 天内申请退款，Proton 会退还订阅费用。',
    metaTitle: 'Proton 黑色星期五：通过 Cecília 链接最高 75% 折扣',
    metaDescription:
      '通过 Cecília 的链接，Proton 黑色星期五最高 75% 折扣：VPN、Mail、Pass、Drive 和 Lumo，无需代码，30 天内可退款。',
    eligibleCategories: 'Proton VPN、Proton Mail、Proton Pass、Proton Drive、Lumo 和 Proton Unlimited 的付费方案',
    validity: 'Proton 的黑色星期五优惠，暂未公布结束日期；最终价格以订阅当天 Proton 在结账页显示的为准',
    reusable: '链接可用于每一次订阅',
    shipping: '不适用：方案均为数字产品，会在你的 Proton 账户中开通',
    combinable: 'Cecília 的链接会以黑色星期五最高 75% 折扣打开 Proton，无需叠加任何代码',
    aboutBrand:
      'Proton 是一家专注于隐私和加密的瑞士公司，提供 VPN、邮箱、密码管理器、云存储，以及人工智能助手 Lumo。各产品均设有免费方案，付费方案可逐一订阅，也可通过 Proton Unlimited 一并订阅。本页汇总了 Cecília 为各产品提供的链接。通过链接订阅，Em Casa com Cecília 可能会获得佣金，订阅者无需支付额外费用。',
    brandLogoAlt: 'Proton 标志',
    productLinks: [
      {
        name: 'Proton VPN',
        url: 'https://go.getproton.me/SH39K',
        description:
          '通过 Cecília 的链接最高 75% 折扣。 提供免费方案和 VPN Plus 的 VPN，VPN Plus 最多可用于 10 台设备，服务器遍布 140 多个国家或地区。此链接也会带你前往 Proton Unlimited。',
      },
      {
        name: 'Proton Mail',
        url: 'https://go.getproton.me/SH39L',
        description: '通过 Cecília 的链接最高 75% 折扣。 端到端加密邮箱，提供免费方案，以及容量和地址更多的付费方案。',
      },
      {
        name: 'Proton Pass',
        url: 'https://go.getproton.me/SH39M',
        description: '通过 Cecília 的链接最高 75% 折扣。 加密密码管理器，可保存密码、银行卡和笔记，并在浏览器和手机上自动填写登录信息。',
      },
      {
        name: 'Proton Drive',
        url: 'https://go.getproton.me/SH39N',
        description: '通过 Cecília 的链接最高 75% 折扣。 为照片和文档提供端到端加密的云存储，设有免费方案。',
      },
      {
        name: 'Lumo',
        url: 'https://go.getproton.me/SH39O',
        description: '通过 Cecília 的链接最高 75% 折扣。 Proton 的人工智能助手，让你在对话时不必牺牲隐私。',
      },
    ],
    faqs: [
      {
        question: 'Proton 在黑色星期五有多少折扣？',
        answer:
          '通过 Cecília 的链接，Proton 全线产品最高 75% 折扣：Proton VPN、Mail、Pass、Drive、Lumo 和 Proton Unlimited。每个方案的折扣显示在链接打开的方案页面上，最终价格在结账时显示。',
      },
      {
        question: 'Cecília 有 Proton 的优惠码吗？',
        answer:
          '不需要优惠码：黑色星期五期间，Cecília 的链接打开的 Proton 已带有最高 75% 折扣。只需点击你想要的产品按钮，选择方案并订阅，无需在结账时粘贴任何代码。',
      },
      {
        question: '如果不喜欢，Proton 会退款吗？',
        answer:
          '会。根据 2026 年 11 月 17 日查阅的 Proton VPN 方案页面，只要在 30 天内申请退款，Proton 会退还任何订阅的费用。根据 Proton 帮助中心，以现金和银行转账付款的订单不设退款。',
      },
      {
        question: 'Proton 有免费方案吗？',
        answer:
          '有。根据 2026 年 11 月 17 日查阅的方案页面，免费的 Proton VPN 同一时间保护 1 台设备，可使用 10 个国家或地区的服务器，免费账户包含邮箱和 Proton Drive 的 5 GB 空间。付费方案提供更多设备、容量和功能。',
      },
      {
        question: 'Proton 支持哪些付款方式？',
        answer:
          '根据 2026 年 11 月 17 日查阅的 Proton 帮助中心，支持信用卡和借记卡、PayPal、Apple Pay、Google Pay、比特币、现金和银行转账。价格以美元、欧元或瑞士法郎显示。',
      },
      {
        question: '什么是 Proton Unlimited？',
        answer:
          '这是把 Proton 的付费产品合并为单一订阅的方案。本页的 Proton VPN 链接会带你前往 VPN Plus 和 Proton Unlimited 方案。',
      },
      {
        question: '通过链接订阅需要复制代码吗？',
        answer:
          '不需要。只要点击你想要的产品按钮打开 Proton，照常订阅即可。我们没有需要粘贴到结账页面的代码。',
      },
      {
        question: '通过链接订阅，Cecília 会获得佣金吗？',
        answer:
          '有可能。Proton 可能会就通过本页链接完成的订阅（包括续订）向 Em Casa com Cecília 支付佣金，订阅者无需支付额外费用。',
      },
    ],
    linkInstructions: [
      '在“Proton 各产品链接”选择产品，或点击“通过链接领取最高 75% 折扣”：Cecília 的链接会打开官方网站，无需复制任何内容。',
      '比较各方案：每个产品都有免费方案，以及按月或按年计费的付费方案。',
      '创建 Proton 账户，或登录你现有的账户，并在结账时确认价格，货币以 Proton 显示的为准。',
      '如果不喜欢，请在最初 30 天内申请退款。',
    ],
    linkNote:
      '黑色星期五期间，Cecília 的链接会以最高 75% 折扣打开 Proton，无需复制代码：每个方案的折扣显示在方案页面上，最终价格在结账时显示。',
  },
};

// Indicação sem código para digitar: os 20% valem só no primeiro período de plano novo e não somam
// com outros cupons, como no PT.
const HOSTINGER_TRANSLATIONS: Record<TranslatedLocale, CodeOfferTranslation> = {
  en: {
    discount: '20% off',
    category: 'Web hosting and domains',
    shortDescription: 'every Hostinger plan, monthly or yearly, for new and existing customers',
    longDescription:
      'SONAR20 takes 20% off every Hostinger plan, monthly or yearly, whether you are new to Hostinger or already a customer. Paste the code into the coupon field in the cart. Tested on the Startup plan, on top of the Black Friday price. Em Casa com Cecília has run on Hostinger since 2024.',
    metaTitle: 'Hostinger Coupon Code 2026: 20% Off Everything with SONAR20',
    metaDescription:
      'Hostinger coupon: SONAR20 takes 20% off monthly and yearly plans, for new and existing customers, Black Friday included.',
    eligibleCategories: 'New purchases of any Hostinger plan, monthly or yearly, for new and existing customers; renewals are not discounted',
    validity: 'Coupon active while the partnership runs',
    reusable: 'Works on new purchases, for new customers and for those who already have a Hostinger account; renewals are not discounted',
    shipping: 'Does not apply',
    combinable:
      "Works on top of Hostinger's Black Friday price (in our November 14, 2026 test, the 20% came off the sale price); stacking with other coupons has not been tested",
    aboutBrand:
      'Hostinger is a web hosting company offering hosting plans, a website builder, VPS, domains and email. Em Casa com Cecília has run on Hostinger since 2024, as a Node.js app. SONAR20 is the partnership coupon: 20% off every plan, for new and existing customers.',
    brandLogoAlt: 'Hostinger logo',
    faqs: [
      {
        question: 'Does the Hostinger coupon SONAR20 work today?',
        answer:
          'Yes. In our November 14, 2026 test, SONAR20 took 20% off the 48-month Startup plan on Hostinger\'s global site. The date and the amounts of the test are in "How we tested the coupon", on this page.',
      },
      {
        question: 'Does SONAR20 work for existing Hostinger customers?',
        answer:
          'Yes, on a new purchase: the coupon works for newcomers and for existing Hostinger customers who buy a new plan. Renewing a plan gets no discount.',
      },
      {
        question: 'Is there a first-purchase coupon for Hostinger?',
        answer:
          'Yes. SONAR20 takes 20% off your very first plan, monthly or yearly, and it also works if you are already a customer.',
      },
      {
        question: 'Is there a 15% Hostinger coupon?',
        answer:
          'SONAR20 gives more: 20% off every plan, monthly or yearly, for new and existing customers. In our test, the 20% came off the Black Friday price Hostinger was already showing.',
      },
      {
        question: 'Does the coupon work on monthly plans?',
        answer:
          "Yes. The code covers monthly and yearly plans; in our October 29, 2026 test, the 1-month Startup plan also dropped 20% with SONAR20.",
      },
      {
        question: 'Where do I enter the coupon on Hostinger?',
        answer:
          'In the cart, in the order summary: click "Have a coupon code?", paste SONAR20 and click Apply. The discount shows up as "Coupon savings applied".',
      },
      {
        question: 'Do I need to paste the coupon if I use the link?',
        answer:
          'Check the order summary: if it does not show "Coupon applied", paste SONAR20 into the coupon field. The link on this page opens Hostinger with the referral for the same code.',
      },
      {
        question: 'Does the coupon work during Hostinger\'s Black Friday?',
        answer:
          'Yes. In our November 14, 2026 test, the 20% from SONAR20 came off the Black Friday price Hostinger was already showing in the cart.',
      },
      {
        question: 'Does the discount apply to renewals?',
        answer:
          "No. SONAR20's 20% applies only to new purchases: under Hostinger's referral program rules, renewals are charged at the regular price, with no discount. On a new purchase it also applies to VPS plans; it does not apply to domain registration. The cart shows the renewal price under the plan, so check that amount before paying.",
      },
      {
        question: 'Does Em Casa com Cecília use Hostinger?',
        answer:
          'Yes. The site has run on Hostinger since 2024, as a Node.js app.',
      },
      {
        question: 'Does buying with the coupon support Em Casa com Cecília?',
        answer:
          'Yes, a purchase with SONAR20 may earn Em Casa com Cecília a commission, at no extra cost to you.',
      },
    ],
    stacking: [{ benefit: 'promocoes', stacks: 'sim', condition: 'The 20% applies on top of the promotional price Hostinger already shows in the cart' }],
    cartPrint: { ...HOSTINGER_GLOBAL_PRINT, article: 'hostinger-coupon-code-referral', alt: 'Order summary in the Hostinger cart with the Coupon applied line and the SONAR20 tag' },
    testedAt: '2026-11-14',
    testNote:
      'We applied SONAR20 in the "Have a coupon code?" field of Hostinger\'s cart with the Startup plan, which the referral link does not cover. On the 48-month term, the total went from $383.52 to $306.82, $76.70 less: 20% on top of the Black Friday price Hostinger was already showing.',
    codeFieldLabel: 'Have a coupon code?',
    codeInstructions: [
      'Copy the code SONAR20 from the card above.',
      'Open Hostinger through the button on this page, choose the plan and the term, and go to the cart.',
      'In the order summary, click "Have a coupon code?", paste SONAR20 and click Apply.',
      'Check the discount in the cart before paying. At the end of the term, the renewal is charged at the regular price shown under the plan.',
    ],
    monthlyHighlight: {
      scope: 'on every plan',
      note: 'Works on new purchases, for new and existing customers, on monthly or yearly plans; renewals are not discounted',
    },
  },
  es: {
    discount: '20% de descuento',
    category: 'Hosting web y dominios',
    shortDescription: 'todos los planes de Hostinger, mensuales o anuales, para clientes nuevos y actuales',
    longDescription:
      'SONAR20 da un 20% de descuento en todos los planes de Hostinger, mensuales o anuales, tanto si eres cliente nuevo como si ya lo eres. Pega el código en el campo de cupón del carrito. Probado con el plan Startup, sobre el precio del Black Friday. Em Casa com Cecília funciona en Hostinger desde 2024.',
    metaTitle: 'Cupón Hostinger 2026: 20% en todo con SONAR20',
    metaDescription:
      'Cupón de Hostinger: SONAR20 da un 20% en planes mensuales y anuales, para clientes nuevos y actuales, con Black Friday.',
    eligibleCategories: 'Compras nuevas de cualquier plan de Hostinger, mensual o anual, para clientes nuevos y actuales; la renovación no tiene descuento',
    validity: 'Cupón activo mientras dure la colaboración',
    reusable: 'Funciona en compras nuevas, para clientes nuevos y para quienes ya tienen cuenta en Hostinger; la renovación no tiene descuento',
    shipping: 'No aplica',
    combinable:
      'Funciona sobre el precio de Black Friday de Hostinger (en nuestra prueba del 14 de noviembre de 2026, el 20% se aplicó sobre el precio de oferta); no se ha probado combinarlo con otros cupones',
    aboutBrand:
      'Hostinger es una empresa de hosting web que ofrece planes de hosting, creador de sitios web, VPS, dominios y correo electrónico. Em Casa com Cecília funciona en Hostinger desde 2024, como aplicación Node.js. SONAR20 es el cupón de la colaboración: 20% de descuento en todos los planes, para clientes nuevos y actuales.',
    brandLogoAlt: 'Logotipo de Hostinger',
    faqs: [
      {
        question: '¿El cupón de Hostinger SONAR20 funciona hoy?',
        answer:
          'Sí. En nuestra prueba del 14 de noviembre de 2026, SONAR20 dio un 20% de descuento en el plan Startup de 48 meses en el sitio global de Hostinger. La fecha y los importes de la prueba están en "Cómo probamos el cupón", en esta página.',
      },
      {
        question: '¿SONAR20 funciona para clientes actuales de Hostinger?',
        answer:
          'Sí, en una compra nueva: el cupón funciona para quien llega y para quien ya tiene cuenta en Hostinger y contrata un plan nuevo. La renovación de un plan no tiene descuento.',
      },
      {
        question: '¿Hay cupón de primera compra en Hostinger?',
        answer:
          'Sí. SONAR20 da un 20% de descuento ya en tu primer plan, mensual o anual, y también funciona si ya eres cliente.',
      },
      {
        question: '¿Existe un cupón de Hostinger del 15%?',
        answer:
          'SONAR20 da más: un 20% de descuento en todos los planes, mensuales o anuales, para clientes nuevos y actuales. En nuestra prueba, el 20% se aplicó sobre el precio de Black Friday que Hostinger ya mostraba.',
      },
      {
        question: '¿El cupón funciona en planes mensuales?',
        answer:
          'Sí. El código cubre planes mensuales y anuales; en nuestra prueba del 29 de octubre de 2026, el plan Startup de 1 mes también bajó un 20% con SONAR20.',
      },
      {
        question: '¿Dónde introduzco el cupón en Hostinger?',
        answer:
          'En el carrito, en el resumen del pedido: haz clic en "Have a coupon code?", pega SONAR20 y haz clic en Apply. El descuento aparece como "Coupon savings applied".',
      },
      {
        question: '¿Tengo que pegar el cupón si uso el enlace?',
        answer:
          'Revisa el resumen del pedido: si no muestra "Coupon applied", pega SONAR20 en el campo del cupón. El enlace de esta página abre Hostinger con el referido del mismo código.',
      },
      {
        question: '¿El cupón funciona durante el Black Friday de Hostinger?',
        answer:
          'Sí. En nuestra prueba del 14 de noviembre de 2026, el 20% de SONAR20 se aplicó sobre el precio de Black Friday que Hostinger ya mostraba en el carrito.',
      },
      {
        question: '¿El descuento se aplica a las renovaciones?',
        answer:
          'No. El 20% del SONAR20 vale solo en compras nuevas: según las reglas del programa de referidos de Hostinger, la renovación se cobra a precio de lista, sin descuento. En una compra nueva también vale en el VPS; no vale en el registro de dominios. El carrito muestra el precio de renovación debajo del plan, así que revisa ese importe antes de pagar.',
      },
      {
        question: '¿Em Casa com Cecília usa Hostinger?',
        answer:
          'Sí. El sitio funciona en Hostinger desde 2024, como aplicación Node.js.',
      },
      {
        question: '¿Comprar con el cupón apoya a Em Casa com Cecília?',
        answer:
          'Sí, una compra con SONAR20 puede generar una comisión para Em Casa com Cecília, sin costo extra para ti.',
      },
    ],
    stacking: [{ benefit: 'promocoes', stacks: 'sim', condition: 'El 20% se aplica sobre el precio promocional que Hostinger ya muestra en el carrito' }],
    cartPrint: { ...HOSTINGER_GLOBAL_PRINT, article: 'cupon-hostinger-codigo-de-referido', alt: 'Resumen del pedido en el carrito de Hostinger con la línea Coupon applied y la etiqueta SONAR20' },
    testedAt: '2026-11-14',
    testNote:
      'Aplicamos SONAR20 en el campo "Have a coupon code?" del carrito de Hostinger con el plan Startup, que el enlace de referido no cubre. En el período de 48 meses, el total pasó de $383.52 a $306.82, $76.70 menos: el 20% sobre el precio de Black Friday que Hostinger ya mostraba.',
    codeFieldLabel: 'Have a coupon code?',
    codeInstructions: [
      'Copia el código SONAR20 de la tarjeta de arriba.',
      'Abre Hostinger con el botón de esta página, elige el plan y el período, y ve al carrito.',
      'En el resumen del pedido, haz clic en "Have a coupon code?", pega SONAR20 y haz clic en Apply.',
      'Revisa el descuento en el carrito antes de pagar. Al final del periodo, la renovación se cobra al precio de lista que aparece debajo del plan.',
    ],
    monthlyHighlight: {
      scope: 'en todos los planes',
      note: 'Funciona en compras nuevas, para clientes nuevos y actuales, en planes mensuales o anuales; la renovación no tiene descuento',
    },
  },
  fr: {
    discount: `20${NBSP}% de réduction`,
    category: 'Hébergement web et noms de domaine',
    shortDescription: 'toutes les offres Hostinger, mensuelles ou annuelles, pour les nouveaux clients et les clients existants',
    longDescription: `Le code promo SONAR20 accorde 20${NBSP}% de réduction sur toutes les offres Hostinger, mensuelles ou annuelles, que vous soyez nouveau client ou déjà client. Saisissez le code dans le champ de code promo du panier. Testé sur l’offre Startup, en plus du prix du Black Friday. Em Casa com Cecília est hébergé chez Hostinger depuis 2024.`,
    metaTitle: `Code promo Hostinger 2026${NBSP}: 20${NBSP}% sur tout avec SONAR20`,
    metaDescription: `Code promo Hostinger${NBSP}: SONAR20 donne 20${NBSP}% sur les offres mensuelles et annuelles, nouveaux et existants, Black Friday inclus.`,
    eligibleCategories: `Nouveaux achats de toute offre Hostinger, mensuelle ou annuelle, pour les nouveaux clients et les clients existants${NBSP}; le renouvellement n’est pas remisé`,
    validity: 'Code promo valable pendant toute la durée du partenariat',
    reusable: `Valable sur les nouveaux achats, pour les nouveaux clients et pour ceux qui ont déjà un compte Hostinger${NBSP}; pas de réduction sur le renouvellement`,
    shipping: 'Sans objet',
    combinable: `S’applique en plus du prix Black Friday de Hostinger (lors de notre test du 14 novembre 2026, les 20${NBSP}% ont été appliqués au prix soldé)${NBSP}; le cumul avec d’autres codes promo n’a pas été testé`,
    aboutBrand: `Hostinger est un hébergeur web qui propose des offres d’hébergement, un créateur de site, des VPS, des noms de domaine et des e-mails. Em Casa com Cecília est hébergé chez Hostinger depuis 2024, en tant qu’application Node.js. SONAR20 est le code promo du partenariat${NBSP}: 20${NBSP}% de réduction sur chaque offre, pour les nouveaux clients et les clients existants.`,
    brandLogoAlt: 'Logo Hostinger',
    faqs: [
      {
        question: `Le code promo Hostinger SONAR20 fonctionne-t-il aujourd’hui${NBSP}?`,
        answer: `Oui. Lors de notre test du 14 novembre 2026, SONAR20 a donné 20${NBSP}% de réduction sur l’offre Startup de 48 mois sur le site international de Hostinger. La date et les montants du test figurent dans «${NBSP}Comment nous avons testé le code promo${NBSP}», sur cette page.`,
      },
      {
        question: `SONAR20 fonctionne-t-il pour les clients existants de Hostinger${NBSP}?`,
        answer: `Oui, sur un nouvel achat${NBSP}: le code fonctionne pour les nouveaux venus et pour les clients Hostinger existants qui prennent une nouvelle offre. Le renouvellement d’une offre ne bénéficie d’aucune réduction.`,
      },
      {
        question: `Existe-t-il un code promo Hostinger pour une première commande${NBSP}?`,
        answer:
          `Oui. SONAR20 donne 20${NBSP}% de réduction dès votre premier abonnement, mensuel ou annuel, et il fonctionne aussi si vous êtes déjà client.`,
      },
      {
        question: `Existe-t-il un code promo Hostinger de 15${NBSP}%${NBSP}?`,
        answer:
          `SONAR20 donne plus${NBSP}: 20${NBSP}% de réduction sur toutes les offres, mensuelles ou annuelles, pour les nouveaux clients comme pour les clients existants. Lors de notre test, les 20${NBSP}% se sont appliqués au prix Black Friday que Hostinger affichait déjà.`,
      },
      {
        question: `Le code fonctionne-t-il sur les offres mensuelles${NBSP}?`,
        answer: `Oui. Le code couvre les offres mensuelles et annuelles${NBSP}; lors de notre test du 29 octobre 2026, l’offre Startup d’un mois a également baissé de 20${NBSP}% avec SONAR20.`,
      },
      {
        question: `Où saisir le code promo sur Hostinger${NBSP}?`,
        answer: `Dans le panier, dans le récapitulatif de commande${NBSP}: cliquez sur "Have a coupon code${NBSP}?", collez SONAR20 et cliquez sur Apply. La réduction apparaît sous la mention "Coupon savings applied".`,
      },
      {
        question: `Faut-il coller le code si j’utilise le lien${NBSP}?`,
        answer: `Vérifiez le récapitulatif de commande${NBSP}: s’il n’affiche pas "Coupon applied", collez SONAR20 dans le champ de code promo. Le lien de cette page ouvre Hostinger avec le parrainage pour le même code.`,
      },
      {
        question: `Le code fonctionne-t-il pendant le Black Friday de Hostinger${NBSP}?`,
        answer: `Oui. Lors de notre test du 14 novembre 2026, les 20${NBSP}% de SONAR20 se sont appliqués au prix Black Friday que Hostinger affichait déjà dans le panier.`,
      },
      {
        question: `La réduction s’applique-t-elle aux renouvellements${NBSP}?`,
        answer: `Non. Les 20${NBSP}% de SONAR20 ne valent que pour les nouveaux achats${NBSP}: selon les règles du programme de parrainage de Hostinger, le renouvellement est facturé au prix catalogue, sans réduction. Sur un nouvel achat, il s’applique aussi aux VPS${NBSP}; il ne s’applique pas à l’enregistrement de noms de domaine. Le panier affiche le prix de renouvellement sous l’offre${NBSP}: vérifiez ce montant avant de payer.`,
      },
      {
        question: `Em Casa com Cecília utilise-t-il Hostinger${NBSP}?`,
        answer: 'Oui. Le site est hébergé chez Hostinger depuis 2024, en tant qu’application Node.js.',
      },
      {
        question: `Acheter avec le code soutient-il Em Casa com Cecília${NBSP}?`,
        answer: 'Oui, un achat avec SONAR20 peut rapporter une commission à Em Casa com Cecília, sans frais supplémentaires pour vous.',
      },
    ],
    stacking: [{ benefit: 'promocoes', stacks: 'sim', condition: 'Les 20 % s’appliquent sur le prix promotionnel que Hostinger affiche déjà dans le panier' }],
    cartPrint: { ...HOSTINGER_GLOBAL_PRINT, article: 'code-promo-hostinger-parrainage', alt: 'Récapitulatif de commande dans le panier Hostinger avec la ligne Coupon applied et l’étiquette SONAR20' },
    testedAt: '2026-11-14',
    testNote: `Nous avons appliqué SONAR20 dans le champ "Have a coupon code${NBSP}?" du panier de Hostinger, avec l’offre Startup, que le lien de parrainage ne couvre pas. Sur la période de 48 mois, le total est passé de $383.52 à $306.82, soit $76.70 de moins${NBSP}: 20${NBSP}% sur le prix Black Friday que Hostinger affichait déjà.`,
    codeFieldLabel: 'Have a coupon code?',
    codeInstructions: [
      'Copiez le code SONAR20 depuis la carte ci-dessus.',
      'Ouvrez Hostinger avec le bouton de cette page, choisissez l’offre et la période, puis allez au panier.',
      `Dans le récapitulatif de commande, cliquez sur "Have a coupon code${NBSP}?", collez SONAR20 et cliquez sur Apply.`,
      'Vérifiez la réduction dans le panier avant de payer. À la fin de la période, le renouvellement est facturé au prix catalogue affiché sous l’offre.',
    ],
    monthlyHighlight: {
      scope: 'sur toutes les offres',
      note: `Valable sur les nouveaux achats, pour les nouveaux clients et les clients existants, sur les offres mensuelles ou annuelles${NBSP}; le renouvellement n’est pas remisé`,
    },
  },
  de: {
    discount: `20${NBSP}% Rabatt`,
    category: 'Webhosting und Domains',
    shortDescription: 'alle Hostinger-Tarife, monatlich oder jährlich, für Neu- und Bestandskunden',
    longDescription: `SONAR20 gewährt 20${NBSP}% Rabatt auf alle Hostinger-Tarife, monatlich oder jährlich, egal ob Sie neu bei Hostinger sind oder schon Kunde. Fügen Sie den Code im Warenkorb in das Gutscheinfeld ein. Getestet beim Tarif Startup, zusätzlich zum Black-Friday-Preis. Em Casa com Cecília läuft seit 2024 bei Hostinger.`,
    metaTitle: `Hostinger-Gutschein 2026: 20${NBSP}% auf alles mit SONAR20`,
    metaDescription: `Hostinger-Gutschein: SONAR20 gibt 20${NBSP}% auf Monats- und Jahrestarife, für Neu- und Bestandskunden, auch zum Black Friday.`,
    eligibleCategories: 'Neukäufe aller Hostinger-Tarife, monatlich oder jährlich, für Neu- und Bestandskunden; Verlängerungen ohne Rabatt',
    validity: 'Gutschein gültig, solange die Partnerschaft läuft',
    reusable: 'Gilt bei Neukäufen, für Neukunden und für alle, die bereits ein Hostinger-Konto haben; Verlängerungen sind nicht rabattiert',
    shipping: 'Entfällt',
    combinable: `Gilt zusätzlich zum Black-Friday-Preis von Hostinger (beim Test am 14. November 2026 wurden die 20${NBSP}% vom Aktionspreis abgezogen); die Kombination mit anderen Gutscheinen wurde nicht getestet`,
    aboutBrand: `Hostinger ist ein Webhosting-Anbieter mit Hosting-Tarifen, Website-Baukasten, VPS, Domains und E-Mail. Em Casa com Cecília läuft seit 2024 bei Hostinger als Node.js-Anwendung. SONAR20 ist der Partnergutschein: 20${NBSP}% Rabatt auf alle Tarife, für Neu- und Bestandskunden.`,
    brandLogoAlt: 'Hostinger-Logo',
    faqs: [
      {
        question: `Funktioniert der Gutschein SONAR20 heute?`,
        answer: `Ja. Beim Test am 14. November 2026 hat SONAR20 auf der globalen Hostinger-Seite 20${NBSP}% vom Tarif Startup mit 48 Monaten Laufzeit abgezogen. Das Datum und die Beträge des Tests stehen auf dieser Seite unter „So haben wir den Gutschein getestet“.`,
      },
      {
        question: `Gilt SONAR20 auch für bestehende Hostinger-Kunden?`,
        answer: 'Ja, bei einem Neukauf: Der Gutschein gilt für Neukunden und für Bestandskunden von Hostinger, die einen neuen Tarif abschließen. Die Verlängerung eines Tarifs ist nicht rabattiert.',
      },
      {
        question: 'Gibt es einen Hostinger-Gutschein für die erste Bestellung?',
        answer:
          `Ja. SONAR20 zieht schon beim ersten Tarif 20${NBSP}% ab, monatlich oder jährlich, und gilt auch, wenn Sie bereits Kunde sind.`,
      },
      {
        question: `Gibt es einen Hostinger-Gutschein mit 15${NBSP}%?`,
        answer:
          `SONAR20 bringt mehr: 20${NBSP}% auf alle Tarife, monatlich oder jährlich, für Neu- und Bestandskunden. Bei unserem Test kamen die 20${NBSP}% zusätzlich auf den Black-Friday-Preis, den Hostinger bereits anzeigte.`,
      },
      {
        question: `Gilt der Gutschein auch bei Monatstarifen?`,
        answer: `Ja. Der Code gilt für Monats- und Jahrestarife; beim Test am 29. Oktober 2026 wurde auch der Tarif Startup mit 1 Monat Laufzeit mit SONAR20 um 20${NBSP}% günstiger.`,
      },
      {
        question: `Wo gebe ich den Gutschein bei Hostinger ein?`,
        answer: `Im Warenkorb, in der Bestellübersicht: Klicken Sie auf „Have a coupon code?“, fügen Sie SONAR20 ein und klicken Sie auf Apply. Der Rabatt erscheint als „Coupon savings applied“.`,
      },
      {
        question: `Muss ich den Gutschein eingeben, wenn ich den Link nutze?`,
        answer: `Prüfen Sie die Bestellübersicht: Wenn dort nicht „Coupon applied“ steht, fügen Sie SONAR20 in das Gutscheinfeld ein. Der Link auf dieser Seite öffnet Hostinger mit der Empfehlung für denselben Code.`,
      },
      {
        question: `Gilt der Gutschein während des Black Friday von Hostinger?`,
        answer: `Ja. Beim Test am 14. November 2026 wurden die 20${NBSP}% von SONAR20 auf den Black-Friday-Preis abgezogen, den Hostinger im Warenkorb schon anzeigte.`,
      },
      {
        question: `Gilt der Rabatt auch bei Verlängerungen?`,
        answer: `Nein. Die 20${NBSP}% von SONAR20 gelten nur bei Neukäufen: Nach den Regeln des Hostinger-Empfehlungsprogramms wird die Verlängerung zum Listenpreis berechnet, ohne Rabatt. Bei einem Neukauf gilt er auch für VPS, nicht aber für die Registrierung von Domains. Der Warenkorb zeigt den Verlängerungspreis unter dem Tarif; prüfen Sie ihn also vor der Zahlung.`,
      },
      {
        question: `Nutzt Em Casa com Cecília Hostinger?`,
        answer: 'Ja. Die Seite läuft seit 2024 bei Hostinger als Node.js-Anwendung.',
      },
      {
        question: `Unterstützt ein Kauf mit dem Gutschein Em Casa com Cecília?`,
        answer: 'Ja, ein Kauf mit SONAR20 kann Em Casa com Cecília eine Provision einbringen, ohne Mehrkosten für Sie.',
      },
    ],
    stacking: [{ benefit: 'promocoes', stacks: 'sim', condition: 'Die 20 % gelten auf den Aktionspreis, den Hostinger bereits im Warenkorb anzeigt' }],
    cartPrint: { ...HOSTINGER_GLOBAL_PRINT, article: 'hostinger-gutschein-empfehlungscode', alt: 'Bestellübersicht im Hostinger-Warenkorb mit der Zeile Coupon applied und dem Etikett SONAR20' },
    testedAt: '2026-11-14',
    testNote: `Wir haben SONAR20 im Feld „Have a coupon code?“ im Warenkorb von Hostinger mit dem Tarif Startup angewendet, den der Empfehlungslink nicht abdeckt. Bei 48 Monaten Laufzeit sank die Summe von $383.52 auf $306.82, also $76.70 weniger: 20${NBSP}% auf den Black-Friday-Preis, den Hostinger schon anzeigte.`,
    codeFieldLabel: 'Have a coupon code?',
    codeInstructions: [
      'Kopieren Sie den Code SONAR20 aus der Karte oben.',
      'Öffnen Sie Hostinger über den Button auf dieser Seite, wählen Sie Tarif und Laufzeit und gehen Sie in den Warenkorb.',
      `Klicken Sie in der Bestellübersicht auf „Have a coupon code?“, fügen Sie SONAR20 ein und klicken Sie auf Apply.`,
      'Prüfen Sie den Rabatt im Warenkorb, bevor Sie bezahlen. Am Ende der Laufzeit wird die Verlängerung zum Listenpreis berechnet, der unter dem Tarif steht.',
    ],
    monthlyHighlight: {
      scope: 'bei allen Tarifen',
      note: 'Gilt bei Neukäufen für Neu- und Bestandskunden, bei Monats- oder Jahrestarifen; Verlängerungen ohne Rabatt',
    },
  },
  it: {
    discount: '20% di sconto',
    category: 'Hosting web e domini',
    shortDescription: 'ogni piano Hostinger, mensile o annuale, per clienti nuovi ed esistenti',
    longDescription:
      'SONAR20 dà il 20% di sconto su ogni piano Hostinger, mensile o annuale, che tu sia nuovo cliente o già cliente. Incolla il codice nel campo coupon del carrello. Testato sul piano Startup, in aggiunta al prezzo del Black Friday. Em Casa com Cecília è ospitato su Hostinger dal 2024.',
    metaTitle: 'Coupon Hostinger 2026: 20% su tutto con SONAR20',
    metaDescription:
      'Coupon Hostinger: SONAR20 dà il 20% su piani mensili e annuali, per clienti nuovi ed esistenti, Black Friday incluso.',
    eligibleCategories: 'Nuovi acquisti di ogni piano Hostinger, mensile o annuale, per clienti nuovi ed esistenti; il rinnovo non è scontato',
    validity: 'Coupon attivo finché dura la partnership',
    reusable: 'Vale sui nuovi acquisti, per i nuovi clienti e per chi ha già un account Hostinger; il rinnovo non è scontato',
    shipping: 'Non applicabile',
    combinable:
      'Vale in aggiunta al prezzo Black Friday di Hostinger (nel nostro test del 14 novembre 2026 il 20% è stato applicato sul prezzo scontato); la combinazione con altri coupon non è stata testata',
    aboutBrand:
      'Hostinger è un’azienda di web hosting che offre piani di hosting, website builder, VPS, domini ed e-mail. Em Casa com Cecília è ospitato su Hostinger dal 2024, come applicazione Node.js. SONAR20 è il coupon della partnership: 20% di sconto su ogni piano, per clienti nuovi ed esistenti.',
    brandLogoAlt: 'Logo di Hostinger',
    faqs: [
      {
        question: 'Il coupon Hostinger SONAR20 funziona oggi?',
        answer:
          'Sì. Nel nostro test del 14 novembre 2026, SONAR20 ha dato il 20% di sconto sul piano Startup da 48 mesi sul sito globale di Hostinger. La data e gli importi del test sono in "Come abbiamo testato il coupon", su questa pagina.',
      },
      {
        question: 'SONAR20 vale per i clienti Hostinger già esistenti?',
        answer:
          'Sì, su un nuovo acquisto: il coupon vale per chi arriva e per i clienti Hostinger esistenti che attivano un nuovo piano. Il rinnovo di un piano non ha sconto.',
      },
      {
        question: 'Esiste un coupon Hostinger per il primo acquisto?',
        answer:
          'Sì. SONAR20 dà il 20% di sconto già sul primo piano, mensile o annuale, e vale anche se sei già cliente.',
      },
      {
        question: 'Esiste un coupon Hostinger del 15%?',
        answer:
          'SONAR20 dà di più: il 20% di sconto su tutti i piani, mensili o annuali, per clienti nuovi ed esistenti. Nel nostro test, il 20% si è applicato sul prezzo del Black Friday che Hostinger mostrava già.',
      },
      {
        question: 'Il coupon vale sui piani mensili?',
        answer:
          'Sì. Il codice vale per piani mensili e annuali; nel test del 29 ottobre 2026, anche il piano Startup da 1 mese è sceso del 20% con SONAR20.',
      },
      {
        question: 'Dove inserisco il coupon su Hostinger?',
        answer:
          'Nel carrello, nel riepilogo dell’ordine: clicca su "Have a coupon code?", incolla SONAR20 e clicca su Apply. Lo sconto compare come "Coupon savings applied".',
      },
      {
        question: 'Devo incollare il coupon se uso il link?',
        answer:
          'Controlla il riepilogo dell’ordine: se non mostra "Coupon applied", incolla SONAR20 nel campo coupon. Il link di questa pagina apre Hostinger con il referral per lo stesso codice.',
      },
      {
        question: 'Il coupon funziona durante il Black Friday di Hostinger?',
        answer:
          'Sì. Nel nostro test del 14 novembre 2026, il 20% di SONAR20 è stato applicato sul prezzo Black Friday che Hostinger già mostrava nel carrello.',
      },
      {
        question: 'Lo sconto vale anche per i rinnovi?',
        answer:
          'No. Il 20% di SONAR20 vale solo sui nuovi acquisti: secondo le regole del programma di referral di Hostinger, il rinnovo si paga a prezzo di listino, senza sconto. Su un nuovo acquisto vale anche per i VPS; non vale per la registrazione dei domini. Il carrello mostra il prezzo di rinnovo sotto il piano, quindi controlla quell’importo prima di pagare.',
      },
      {
        question: 'Em Casa com Cecília usa Hostinger?',
        answer:
          'Sì. Il sito è ospitato su Hostinger dal 2024, come applicazione Node.js.',
      },
      {
        question: 'Acquistare con il coupon sostiene Em Casa com Cecília?',
        answer:
          'Sì, un acquisto con SONAR20 può far guadagnare a Em Casa com Cecília una commissione, senza costi extra per te.',
      },
    ],
    stacking: [{ benefit: 'promocoes', stacks: 'sim', condition: 'Il 20% si applica sul prezzo promozionale che Hostinger mostra già nel carrello' }],
    cartPrint: { ...HOSTINGER_GLOBAL_PRINT, article: 'coupon-hostinger-codice-invito', alt: 'Riepilogo dell’ordine nel carrello Hostinger con la riga Coupon applied e l’etichetta SONAR20' },
    testedAt: '2026-11-14',
    testNote:
      'Abbiamo applicato SONAR20 nel campo "Have a coupon code?" del carrello di Hostinger con il piano Startup, che il link di referral non copre. Con la durata di 48 mesi il totale è passato da $383.52 a $306.82, $76.70 in meno: il 20% sul prezzo Black Friday che Hostinger mostrava già.',
    codeFieldLabel: 'Have a coupon code?',
    codeInstructions: [
      'Copia il codice SONAR20 dalla scheda qui sopra.',
      'Apri Hostinger con il pulsante di questa pagina, scegli il piano e la durata e vai al carrello.',
      'Nel riepilogo dell’ordine clicca su "Have a coupon code?", incolla SONAR20 e clicca su Apply.',
      'Controlla lo sconto nel carrello prima di pagare. Alla fine del periodo, il rinnovo si paga al prezzo di listino indicato sotto il piano.',
    ],
    monthlyHighlight: {
      scope: 'su ogni piano',
      note: 'Vale sui nuovi acquisti, per clienti nuovi ed esistenti, su piani mensili o annuali; il rinnovo non è scontato',
    },
  },
  ko: {
    discount: '20% 할인',
    category: '웹 호스팅·도메인',
    shortDescription: 'Hostinger의 모든 요금제, 월간 또는 연간, 신규 및 기존 고객 대상',
    longDescription:
      'SONAR20으로 Hostinger의 모든 요금제(월간 또는 연간)에서 20% 할인을 받을 수 있습니다. Hostinger를 처음 이용하든 이미 고객이든 상관없습니다. 장바구니의 쿠폰 입력란에 코드를 붙여넣으세요. 블랙 프라이데이 가격에 더해 Startup 요금제로 테스트했습니다. Em Casa com Cecília는 2024년부터 Hostinger에서 운영 중입니다.',
    metaTitle: 'Hostinger 쿠폰 2026: SONAR20으로 전체 20% 할인',
    metaDescription:
      'Hostinger 쿠폰: SONAR20으로 월간·연간 요금제 20% 할인, 신규 및 기존 고객, 블랙 프라이데이 포함.',
    eligibleCategories: 'Hostinger 모든 월간·연간 요금제의 신규 구매, 신규 및 기존 고객 대상(갱신은 할인 없음)',
    validity: '파트너십이 진행되는 동안 쿠폰 유효',
    reusable: '신규 구매 시 신규 고객과 이미 Hostinger 계정이 있는 고객 모두 사용 가능(갱신은 할인 없음)',
    shipping: '해당 없음',
    combinable:
      'Hostinger의 블랙 프라이데이 가격에 추가로 적용됩니다(2026년 11월 14일 테스트에서 20%는 할인가에 적용됨). 다른 쿠폰과의 중복 사용은 테스트하지 않았습니다',
    aboutBrand:
      'Hostinger는 웹 호스팅 회사로, 호스팅 요금제, 웹사이트 빌더, VPS, 도메인, 이메일을 제공합니다. Em Casa com Cecília는 2024년부터 Node.js 애플리케이션으로 Hostinger에서 운영 중입니다. SONAR20은 파트너십 쿠폰으로, 모든 요금제에서 20% 할인되며 신규 및 기존 고객이 사용할 수 있습니다.',
    brandLogoAlt: 'Hostinger 로고',
    faqs: [
      {
        question: 'Hostinger 쿠폰 SONAR20은 지금도 작동하나요?',
        answer:
          '네. 2026년 11월 14일 테스트에서 SONAR20은 Hostinger 글로벌 사이트의 48개월 Startup 요금제에 20% 할인을 적용했습니다. 테스트 날짜와 금액은 이 페이지의 "쿠폰 테스트 방법"에 있습니다.',
      },
      {
        question: 'SONAR20은 기존 Hostinger 고객도 쓸 수 있나요?',
        answer:
          '네, 신규 구매라면 가능합니다. 처음 가입하는 고객과 새 요금제를 구매하는 기존 Hostinger 고객 모두에게 적용됩니다. 요금제 갱신에는 할인이 없습니다.',
      },
      {
        question: 'Hostinger 첫 구매 쿠폰이 있나요?',
        answer:
          '네. SONAR20은 첫 요금제부터 월간이든 연간이든 20% 할인되며, 이미 고객인 경우에도 쓸 수 있습니다.',
      },
      {
        question: 'Hostinger 15% 쿠폰이 있나요?',
        answer:
          'SONAR20이 더 큽니다. 신규 고객과 기존 고객 모두 월간·연간 모든 요금제에서 20% 할인됩니다. 테스트에서는 Hostinger가 이미 보여 주던 블랙 프라이데이 가격에서 20%가 추가로 빠졌습니다.',
      },
      {
        question: '쿠폰은 월간 요금제에도 적용되나요?',
        answer:
          '네. 이 코드는 월간 및 연간 요금제에 적용됩니다. 2026년 10월 29일 테스트에서 1개월 Startup 요금제도 SONAR20으로 20% 내렸습니다.',
      },
      {
        question: 'Hostinger에서 쿠폰은 어디에 입력하나요?',
        answer:
          '장바구니의 주문 요약에서 "Have a coupon code?"를 클릭하고 SONAR20을 붙여넣은 뒤 Apply를 클릭하세요. 할인은 "Coupon savings applied"로 표시됩니다.',
      },
      {
        question: '링크를 사용하면 쿠폰을 따로 입력해야 하나요?',
        answer:
          '주문 요약에 "Coupon applied"가 보이지 않으면 쿠폰 입력란에 SONAR20을 붙여넣으세요. 이 페이지의 링크는 같은 코드의 추천을 적용해 Hostinger를 엽니다.',
      },
      {
        question: '쿠폰은 Hostinger 블랙 프라이데이 기간에도 적용되나요?',
        answer:
          '네. 2026년 11월 14일 테스트에서 SONAR20의 20%는 장바구니에 이미 표시된 블랙 프라이데이 가격에 적용되었습니다.',
      },
      {
        question: '할인은 갱신에도 적용되나요?',
        answer:
          '아니요. SONAR20의 20% 할인은 신규 구매에만 적용됩니다. Hostinger 추천 프로그램 규정에 따라 갱신은 할인 없이 정가로 청구됩니다. 신규 구매라면 VPS에도 적용되지만, 도메인 등록에는 적용되지 않습니다. 장바구니에는 요금제 아래에 갱신 가격이 표시되므로, 결제 전에 그 금액을 확인하세요.',
      },
      {
        question: 'Em Casa com Cecília도 Hostinger를 쓰나요?',
        answer:
          '네. 이 사이트는 2024년부터 Node.js 애플리케이션으로 Hostinger에서 운영 중입니다.',
      },
      {
        question: '쿠폰으로 구매하면 Em Casa com Cecília에 도움이 되나요?',
        answer:
          '네. SONAR20으로 구매하면 추가 비용 없이 Em Casa com Cecília가 수수료를 받을 수 있습니다.',
      },
    ],
    stacking: [{ benefit: 'promocoes', stacks: 'sim', condition: 'Hostinger가 장바구니에 이미 보여 주는 프로모션 가격에 20%가 적용됩니다' }],
    cartPrint: { ...HOSTINGER_GLOBAL_PRINT, article: 'hostinger-referral-code-ko', alt: 'Hostinger 장바구니의 주문 요약. Coupon applied 줄과 SONAR20 라벨이 보입니다' },
    testedAt: '2026-11-14',
    testNote:
      '장바구니에서 Hostinger의 Startup 요금제에 SONAR20을 "Have a coupon code?" 입력란에 적용했습니다. 추천 링크로는 적용되지 않는 요금제입니다. 48개월 기간에서 총액은 $383.52에서 $306.82로, $76.70 줄었습니다. Hostinger가 이미 보여 주던 블랙 프라이데이 가격에 20%가 추가로 적용된 금액입니다.',
    codeFieldLabel: 'Have a coupon code?',
    codeInstructions: [
      '위 카드에서 코드 SONAR20을 복사하세요.',
      '이 페이지의 버튼으로 Hostinger를 열고, 요금제와 기간을 고른 뒤 장바구니로 가세요.',
      '주문 요약에서 "Have a coupon code?"를 클릭하고, SONAR20을 붙여넣은 뒤 Apply를 클릭하세요.',
      '결제 전에 장바구니에서 할인을 확인하세요. 기간이 끝나면 갱신은 요금제 아래에 표시된 정가로 청구됩니다.',
    ],
    monthlyHighlight: {
      scope: '모든 요금제',
      note: '신규 구매 시 신규 및 기존 고객, 월간 또는 연간 요금제에서 사용 가능(갱신은 할인 없음)',
    },
  },
  ja: {
    discount: '20%オフ',
    category: 'Webホスティング・ドメイン',
    shortDescription: 'Hostingerのすべてのプラン（月額・年額）、新規・既存の顧客が対象',
    longDescription:
      'SONAR20を使うと、Hostingerのすべてのプラン（月額・年額）が20%オフになります。Hostingerを初めて使う方も既存の顧客も対象です。カートのクーポン欄にコードを貼り付けてください。ブラックフライデーの価格に加えて Startup プランでテストしました。Em Casa com Cecíliaは2024年からHostingerで運営しています。',
    metaTitle: 'Hostinger割引コード2026：SONAR20で全プラン20%オフ',
    metaDescription:
      'Hostingerクーポン：SONAR20で月額・年額プランが20%オフ。新規・既存の顧客が対象で、ブラックフライデーも含みます。',
    eligibleCategories: 'Hostingerのすべての月額・年額プランの新規購入、新規・既存の顧客が対象（更新は割引なし）',
    validity: 'パートナーシップの期間中有効なクーポン',
    reusable: '新規購入なら、新規のお客様にも、すでにHostingerのアカウントをお持ちの方にも使えます（更新は割引なし）',
    shipping: '該当なし',
    combinable:
      'Hostingerのブラックフライデー価格にさらに適用されます（2026年11月14日のテストでは、20%はセール価格から割り引かれました）。他のクーポンとの併用はテストしていません',
    aboutBrand:
      'Hostingerは、ホスティングプラン、Webサイトビルダー、VPS、ドメイン、メールを提供するWebホスティング会社です。Em Casa com CecíliaはNode.jsアプリとして2024年からHostingerで運営しています。SONAR20はパートナーシップのクーポンで、すべてのプランが20%オフになり、新規・既存の顧客が利用できます。',
    brandLogoAlt: 'Hostingerのロゴ',
    faqs: [
      {
        question: 'Hostingerのクーポン SONAR20 は今も使えますか？',
        answer:
          'はい。2026年11月14日のテストでは、SONAR20はHostingerのグローバルサイトで48か月のStartupプランを20%オフにしました。テストの日付と金額は、このページの「クーポンのテスト方法」に載っています。',
      },
      {
        question: 'SONAR20は既存のHostinger顧客も使えますか？',
        answer:
          'はい、新規購入であれば使えます。初めての方にも、新しいプランを購入する既存のHostingerのお客様にも適用されます。プランの更新には割引がありません。',
      },
      {
        question: 'Hostingerに初回購入クーポンはありますか？',
        answer:
          'はい。SONAR20は最初のプランから、月払いでも年払いでも20%オフになり、すでに顧客の方も使えます。',
      },
      {
        question: 'Hostingerの15%クーポンはありますか？',
        answer:
          'SONAR20のほうがお得です。新規・既存の顧客とも、月払い・年払いのすべてのプランが20%オフになります。テストでは、Hostingerがすでに表示していたブラックフライデー価格からさらに20%引かれました。',
      },
      {
        question: 'クーポンは月額プランでも使えますか？',
        answer:
          'はい。このコードは月額・年額プランに適用されます。2026年10月29日のテストでは、Startupプラン（1か月）もSONAR20で20%オフになりました。',
      },
      {
        question: 'Hostingerでクーポンはどこに入力しますか？',
        answer:
          'カートの注文概要で「Have a coupon code?」をクリックし、SONAR20を貼り付けて Apply をクリックしてください。割引は「Coupon savings applied」と表示されます。',
      },
      {
        question: 'リンクを使う場合もクーポンを貼り付ける必要がありますか？',
        answer:
          '注文概要に「Coupon applied」と表示されない場合は、クーポン欄にSONAR20を貼り付けてください。このページのリンクは、同じコードの紹介を付けてHostingerを開きます。',
      },
      {
        question: 'Hostingerのブラックフライデー期間中もクーポンは使えますか？',
        answer:
          'はい。2026年11月14日のテストでは、SONAR20の20%は、カートにすでに表示されていたブラックフライデー価格から割り引かれました。',
      },
      {
        question: '更新時の料金にも割引は適用されますか？',
        answer:
          'いいえ。SONAR20の20%割引は新規購入のみが対象です。Hostingerの紹介プログラムの規約により、更新は割引なしの通常料金で請求されます。新規購入ならVPSにも適用されますが、ドメイン登録には適用されません。カートにはプランの下に更新料金が表示されるので、支払い前にその金額を確認してください。',
      },
      {
        question: 'Em Casa com CecíliaはHostingerを使っていますか？',
        answer:
          'はい。このサイトは2024年からNode.jsアプリとしてHostingerで運営しています。',
      },
      {
        question: 'クーポンで購入するとEm Casa com Cecíliaの支援になりますか？',
        answer:
          'はい。SONAR20での購入は、追加費用なしにEm Casa com Cecíliaへの紹介料が発生する場合があります。',
      },
    ],
    stacking: [{ benefit: 'promocoes', stacks: 'sim', condition: 'Hostingerがカートにすでに表示しているプロモーション価格に、20%が適用されます' }],
    cartPrint: { ...HOSTINGER_GLOBAL_PRINT, article: 'hostinger-referral-code-ja', alt: 'HostingerのカートにあるCoupon applied行とSONAR20のラベルが表示された注文概要' },
    testedAt: '2026-11-14',
    testNote:
      '「Have a coupon code?」欄にSONAR20を入力し、Hostingerのカートで Startup プランに適用しました。このプランは紹介リンクの対象外です。48か月の期間で合計は$383.52から$306.82になり、$76.70安くなりました。Hostingerがすでに表示していたブラックフライデー価格からさらに20%割り引かれています。',
    codeFieldLabel: 'Have a coupon code?',
    codeInstructions: [
      '上のカードからコード SONAR20 をコピーします。',
      'このページのボタンからHostingerを開き、プランと期間を選んでカートに進みます。',
      '注文概要で「Have a coupon code?」をクリックし、SONAR20 を貼り付けて Apply をクリックします。',
      'お支払い前に、カートで割引額を確認してください。期間の終了後、更新はプランの下に表示される通常料金で請求されます。',
    ],
    monthlyHighlight: {
      scope: 'すべてのプラン',
      note: '新規購入なら、新規・既存の顧客が月額または年額プランで利用できます（更新は割引なし）',
    },
  },
  'zh-hant': {
    discount: '20% 折扣',
    category: '網站主機與網域',
    shortDescription: 'Hostinger 所有方案（月繳或年繳），新客與既有客戶皆適用',
    longDescription:
      'SONAR20 可享 Hostinger 所有方案（月繳或年繳）20% 折扣，無論你是 Hostinger 新客或既有客戶。請把代碼貼到購物車的優惠碼欄位。以 Startup 方案測試，疊加在黑色星期五價格之上。Em Casa com Cecília 自 2024 年起架設在 Hostinger 上。',
    metaTitle: 'Hostinger 優惠碼 2026：SONAR20 全方案享 20% 折扣',
    metaDescription:
      'Hostinger 優惠碼：SONAR20 月繳與年繳方案享 20% 折扣，新客與既有客戶皆適用，含黑色星期五。',
    eligibleCategories: 'Hostinger 所有月繳或年繳方案的新購買，新客與既有客戶皆適用（續約不打折）',
    validity: '合作期間內有效',
    reusable: '新購買時，新客與已有 Hostinger 帳戶的客戶皆適用（續約不打折）',
    shipping: '不適用',
    combinable:
      '可疊加在 Hostinger 的黑色星期五價格上（在 2026 年 11 月 14 日的測試中，20% 是在特價上再打折）；與其他優惠碼併用尚未測試',
    aboutBrand:
      'Hostinger 是一家網站主機公司，提供主機方案、網站建置工具、VPS、網域與電子郵件。Em Casa com Cecília 自 2024 年起以 Node.js 應用程式架設在 Hostinger 上。SONAR20 是合作優惠碼：所有方案享 20% 折扣，新客與既有客戶皆可使用。',
    brandLogoAlt: 'Hostinger 標誌',
    faqs: [
      {
        question: 'Hostinger 優惠碼 SONAR20 現在還能用嗎？',
        answer:
          '可以。在 2026 年 11 月 14 日的測試中，SONAR20 在 Hostinger 全球網站為 48 個月期的 Startup 方案打了 20% 折扣。測試日期與金額請見本頁的「我們如何測試優惠碼」。',
      },
      {
        question: 'SONAR20 適用於既有的 Hostinger 客戶嗎？',
        answer:
          '適用，但限新購買：新客，以及購買新方案的既有 Hostinger 客戶都能使用。方案續約沒有折扣。',
      },
      {
        question: 'Hostinger 有首購優惠碼嗎？',
        answer:
          '有。SONAR20 從第一個方案起就打 20% 折扣，月繳或年繳都適用，已經是客戶的人也能用。',
      },
      {
        question: 'Hostinger 有 15% 的優惠碼嗎？',
        answer:
          'SONAR20 的折扣更多：所有方案，月繳或年繳，新舊客戶都打 20% 折扣。在我們的測試中，這 20% 是在 Hostinger 已顯示的黑色星期五價格上再降的。',
      },
      {
        question: '優惠碼適用於月繳方案嗎？',
        answer:
          '適用。代碼適用於月繳與年繳方案；在 2026 年 10 月 29 日的測試中，1 個月 Startup 方案也用 SONAR20 降了 20%。',
      },
      {
        question: '在 Hostinger 哪裡輸入優惠碼？',
        answer:
          '在購物車的訂單摘要中：點選「Have a coupon code?」，貼上 SONAR20，再點選 Apply。折扣會顯示為「Coupon savings applied」。',
      },
      {
        question: '使用連結時還需要貼上優惠碼嗎？',
        answer:
          '請查看訂單摘要：如果沒有顯示「Coupon applied」，就把 SONAR20 貼到優惠碼欄位。本頁的連結會以同一代碼的推薦開啟 Hostinger。',
      },
      {
        question: 'Hostinger 黑色星期五期間也能用嗎？',
        answer:
          '可以。在 2026 年 11 月 14 日的測試中，SONAR20 的 20% 是疊加在購物車裡已顯示的黑色星期五價格上。',
      },
      {
        question: '折扣也適用於續約嗎？',
        answer:
          '不適用。SONAR20 的 20% 折扣只適用於新購買：依 Hostinger 推薦計畫的規則，續約以原價計費，沒有折扣。新購買時也適用於 VPS，但不適用於網域註冊。購物車會在方案下方顯示續約價格，付款前請確認該金額。',
      },
      {
        question: 'Em Casa com Cecília 也使用 Hostinger 嗎？',
        answer:
          '是的。本站自 2024 年起以 Node.js 應用程式架設在 Hostinger 上。',
      },
      {
        question: '用優惠碼購買會支持 Em Casa com Cecília 嗎？',
        answer:
          '會。使用 SONAR20 購買，可能讓 Em Casa com Cecília 獲得佣金，你不需要額外付費。',
      },
    ],
    stacking: [{ benefit: 'promocoes', stacks: 'sim', condition: '20% 折扣會套用在 Hostinger 購物車已顯示的促銷價上' }],
    cartPrint: { ...HOSTINGER_GLOBAL_PRINT, article: 'hostinger-referral-code-zh-hant', alt: 'Hostinger 購物車中的訂單摘要，顯示 Coupon applied 一行和 SONAR20 標籤' },
    testedAt: '2026-11-14',
    testNote:
      '我們在 Hostinger 購物車的「Have a coupon code?」欄位套用 SONAR20，方案為 Startup，推薦連結並不涵蓋此方案。48 個月期的總額從 $383.52 降到 $306.82，少了 $76.70：也就是在 Hostinger 已顯示的黑色星期五價格上再打 20%。',
    codeFieldLabel: 'Have a coupon code?',
    codeInstructions: [
      '從上方的卡片複製代碼 SONAR20。',
      '點選本頁的按鈕開啟 Hostinger，選擇方案與期限，然後前往購物車。',
      '在訂單摘要中點選「Have a coupon code?」，貼上 SONAR20，再點選 Apply。',
      '付款前，請在購物車確認折扣。期滿後，續約會以方案下方顯示的原價計費。',
    ],
    monthlyHighlight: {
      scope: '所有方案',
      note: '新購買時，新客與既有客戶皆適用，月繳或年繳方案都可用（續約不打折）',
    },
  },
  'zh-hans': {
    discount: '20% 折扣',
    category: '网站主机与域名',
    shortDescription: 'Hostinger 所有套餐（月付或年付），新客户和现有客户均可使用',
    longDescription:
      'SONAR20 可享 Hostinger 所有套餐（月付或年付）20% 折扣，无论你是 Hostinger 新客户还是现有客户。请将代码粘贴到购物车的优惠码栏。以 Startup 套餐测试，叠加在黑色星期五价格之上。Em Casa com Cecília 自 2024 年起运行在 Hostinger 上。',
    metaTitle: 'Hostinger 优惠码 2026：SONAR20 全套餐享 20% 折扣',
    metaDescription:
      'Hostinger 优惠码：SONAR20 月付与年付套餐享 20% 折扣，新客户和现有客户均可使用，含黑色星期五。',
    eligibleCategories: 'Hostinger 所有月付或年付套餐的新购买，新客户和现有客户均可使用（续费不打折）',
    validity: '合作期间有效',
    reusable: '新购买时，新客户和已拥有 Hostinger 账户的客户均可使用（续费不打折）',
    shipping: '不适用',
    combinable:
      '可叠加在 Hostinger 的黑色星期五价格上（在 2026 年 11 月 14 日的测试中，20% 是在促销价基础上再打折）；与其他优惠码叠加尚未测试',
    aboutBrand:
      'Hostinger 是一家网站主机公司，提供主机套餐、建站工具、VPS、域名和电子邮箱。Em Casa com Cecília 自 2024 年起以 Node.js 应用运行在 Hostinger 上。SONAR20 是合作优惠码：所有套餐享 20% 折扣，新客户和现有客户均可使用。',
    brandLogoAlt: 'Hostinger 标志',
    faqs: [
      {
        question: 'Hostinger 优惠码 SONAR20 现在还能用吗？',
        answer:
          '可以。在 2026 年 11 月 14 日的测试中，SONAR20 在 Hostinger 全球网站为 48 个月期的 Startup 套餐打了 20% 折扣。测试日期与金额请见本页的“我们如何测试优惠码”。',
      },
      {
        question: 'SONAR20 适用于现有的 Hostinger 客户吗？',
        answer:
          '适用，但仅限新购买：新客户，以及购买新套餐的现有 Hostinger 客户都可以使用。套餐续费没有折扣。',
      },
      {
        question: 'Hostinger 有首购优惠码吗？',
        answer:
          '有。SONAR20 从第一个套餐起就打 20% 折扣，月付或年付都适用，已经是客户的人也能用。',
      },
      {
        question: 'Hostinger 有 15% 的优惠码吗？',
        answer:
          'SONAR20 的折扣更多：所有套餐，月付或年付，新老客户都打 20% 折扣。在我们的测试中，这 20% 是在 Hostinger 已显示的黑色星期五价格上再降的。',
      },
      {
        question: '优惠码适用于月付套餐吗？',
        answer:
          '适用。代码适用于月付和年付套餐；在 2026 年 10 月 29 日的测试中，1 个月 Startup 套餐也用 SONAR20 降了 20%。',
      },
      {
        question: '在 Hostinger 哪里输入优惠码？',
        answer:
          '在购物车的订单摘要中：点击「Have a coupon code?」，粘贴 SONAR20，再点击 Apply。折扣会显示为「Coupon savings applied」。',
      },
      {
        question: '使用链接时还需要粘贴优惠码吗？',
        answer:
          '请查看订单摘要：如果没有显示「Coupon applied」，就把 SONAR20 粘贴到优惠码栏。本页的链接会以同一代码的推荐打开 Hostinger。',
      },
      {
        question: 'Hostinger 黑色星期五期间也能用吗？',
        answer:
          '可以。在 2026 年 11 月 14 日的测试中，SONAR20 的 20% 是叠加在购物车里已显示的黑色星期五价格上。',
      },
      {
        question: '折扣也适用于续费吗？',
        answer:
          '不适用。SONAR20 的 20% 折扣仅适用于新购买：根据 Hostinger 推荐计划的规则，续费按原价收取，没有折扣。新购买时也适用于 VPS，但不适用于域名注册。购物车会在套餐下方显示续费价格，付款前请确认该金额。',
      },
      {
        question: 'Em Casa com Cecília 也使用 Hostinger 吗？',
        answer:
          '是的。本站自 2024 年起以 Node.js 应用运行在 Hostinger 上。',
      },
      {
        question: '用优惠码购买会支持 Em Casa com Cecília 吗？',
        answer:
          '会。使用 SONAR20 购买，可能为 Em Casa com Cecília 带来佣金，你无需额外付费。',
      },
    ],
    stacking: [{ benefit: 'promocoes', stacks: 'sim', condition: '20% 折扣会应用在 Hostinger 购物车已显示的促销价上' }],
    cartPrint: { ...HOSTINGER_GLOBAL_PRINT, article: 'hostinger-referral-code-zh-hans', alt: 'Hostinger 购物车中的订单摘要，显示 Coupon applied 一行和 SONAR20 标签' },
    testedAt: '2026-11-14',
    testNote:
      '我们在 Hostinger 购物车的「Have a coupon code?」栏应用了 SONAR20，套餐为 Startup，推荐链接并不涵盖该套餐。48 个月期的总额从 $383.52 降到 $306.82，少了 $76.70：也就是在 Hostinger 已显示的黑色星期五价格上再打 20%。',
    codeFieldLabel: 'Have a coupon code?',
    codeInstructions: [
      '从上方卡片复制代码 SONAR20。',
      '点击本页按钮打开 Hostinger，选择套餐和期限，然后进入购物车。',
      '在订单摘要中点击「Have a coupon code?」，粘贴 SONAR20，再点击 Apply。',
      '付款前，请在购物车确认折扣。到期后，续费会按套餐下方显示的原价收取。',
    ],
    monthlyHighlight: {
      scope: '所有套餐',
      note: '新购买时，新客户和现有客户均可使用，月付或年付套餐都适用（续费不打折）',
    },
  },
};

// O que cada campo de uma loja de código faz fora do PT: 'pt' herda o cupom em PT, 'translate' vem da
// tradução e fica de fora sem ela, 'drop' nunca sai do PT. Campo novo em CouponCodeOffer sem decisão aqui
// quebra o typecheck, em vez de ir em português à página de outro idioma. offerUrl e referral
// herdam e depois recebem o link e os textos da tradução em localizeCoupon.
export const CODE_FIELD_POLICY = {
  offerMode: 'pt',
  slug: 'pt',
  brand: 'pt',
  officialUrl: 'pt',
  offerUrl: 'pt',
  brandIcon: 'pt',
  brandLogo: 'pt',
  brandLogoAlt: 'translate',
  bubble: 'pt',
  brandWatermark: 'pt',
  socialImage: 'pt',
  socialImageAlt: 'drop',
  brandColor: 'pt',
  discount: 'translate',
  offerTypeLabel: 'translate',
  offerTypeLabelPlural: 'translate',
  offerActionLabel: 'drop',
  category: 'translate',
  hubCategory: 'pt',
  hubCard: 'pt',
  shortDescription: 'translate',
  longDescription: 'translate',
  metaTitle: 'translate',
  metaTitleMonth: 'drop',
  metaDescription: 'translate',
  eligibleCategories: 'translate',
  validity: 'translate',
  reusable: 'translate',
  shipping: 'translate',
  combinable: 'translate',
  lastVerified: 'pt',
  aboutBrand: 'translate',
  faqs: 'translate',
  status: 'pt',
  featured: 'pt',
  featuredPitch: 'drop',
  // Só a vitrine da home em PT lê o campo: fora do PT ele vem junto e não esconde nada.
  hideFromPortugueseHome: 'pt',
  relatedContent: 'drop',
  // Os vídeos do PT não passam para outro idioma: valem os da tradução, com o título no idioma.
  videos: 'translate',
  // O print do PT é do site brasileiro: fora do PT vale o do site global, que a tradução traz.
  cartPrint: 'translate',
  monthlyHighlight: 'translate',
  affiliateAccountId: 'pt',
  referral: 'pt',
  code: 'pt',
  discountNumber: 'pt',
  testedAt: 'translate',
  testNote: 'translate',
  codeKind: 'pt',
  codeFieldLabel: 'translate',
  codeInstructions: 'translate',
  history: 'drop',
  tiers: 'drop',
  // O aviso do código com prazo só existe em PT.
  limitedCodes: 'drop',
  // "O que acumula com o cupom" fora do PT só leva o que foi visto no site global; as vantagens de pagamento
  // (parcelas, Pix) são do site brasileiro e ficam no PT.
  stacking: 'translate',
  paymentPerks: 'drop',
} as const satisfies Record<keyof CouponCodeOffer, 'pt' | 'translate' | 'drop'>;

// Os campos que vêm da tradução; cada um precisa existir em CodeOfferTranslation (o Pick de localizeCoupon
// quebra o typecheck se não existir).
type TranslatedCodeField = {
  [K in keyof typeof CODE_FIELD_POLICY]: (typeof CODE_FIELD_POLICY)[K] extends 'translate' ? K : never;
}[keyof typeof CODE_FIELD_POLICY];

// offerMode tem de ser o do cupom em PT. offerUrl é o link principal das páginas em outros idiomas;
// sem ele, vale o do cupom em PT.
// A indicação da Starlink vale fora do Brasil, no valor do país em que a pessoa se cadastra (Bruno, 19/11/2026): o mesmo
// link do PT. Os textos não citam valor fixo, salvo o exemplo dos EUA, lido no pedido de Nevada em 19/11/2026.
const STARLINK_TRANSLATIONS: Record<TranslatedLocale, AffiliateOfferTranslation> = {
  en: {
    discount: 'Referral reward',
    offerTypeLabel: 'referral',
    offerTypeLabelPlural: 'referrals',
    offerActionLabel: 'Get your referral bonus',
    cutoutNote: "Applied automatically through Cecília's link.",
    category: 'Satellite internet',
    shortDescription: 'new customer: get your bonus from Starlink\'s official referral program through Cecília\'s link',
    longDescription:
      'New customer: get your bonus from Starlink\'s official referral program by signing up through Cecília\'s link. The referral only counts on orders placed through the link on starlink.com, for Residential and Roam plans, and the bonus arrives after two months of service, as service credit or, where Starlink offers it, as cash. The amount depends on the country: in the United States, for example, it is $100. Starlink offers a full refund of the kit and the first month if you return it within 30 days.',
    metaTitle: 'Starlink referral code? Get your bonus via Cecília\'s link',
    metaDescription:
      'Starlink referral: new customers who sign up through Cecília\'s link get a reward after two months, as credit or cash. Residential and Roam plans.',
    eligibleCategories: 'First subscription to a Residential or Roam plan, ordered on starlink.com through the link',
    validity: 'Active while Starlink\'s referral program runs; the amount is the one Starlink pays in the country where you sign up',
    reusable: 'Only for people who have never been Starlink customers: current and former customers do not get the reward',
    shipping: 'The kit and shipping prices appear in the order on starlink.com, after you enter your address',
    combinable:
      'The reward is not a discount on the order: it arrives after two months of service, and the order keeps the price and promotions Starlink shows that day',
    aboutBrand:
      'Starlink is SpaceX\'s satellite internet, with residential and travel plans and a plug-and-play kit. Orders are placed on starlink.com, and Starlink refunds the kit and the first month if you return it within 30 days. This page has Cecília\'s referral link: new customers who sign up through it get a reward, and Em Casa com Cecília gets the same amount, at no extra cost to the subscriber.',
    brandLogoAlt: 'Starlink logo',
    faqs: [
      {
        question: 'Is there a Starlink coupon code?',
        answer:
          'There is no code to paste: the benefit is Cecília\'s referral link. New Starlink customers who sign up through it get a reward after two months of service, as service credit or, where Starlink offers it, as cash.',
      },
      {
        question: 'How does the Starlink referral work?',
        answer:
          'According to Starlink\'s help center, the new customer and the person who referred them get the same amount once the new subscription completes two months. By default, it arrives as service credit and is taken off the next bill. Where Starlink offers it, you can switch to cash in the Referrals tab of your account.',
      },
      {
        question: 'How much is the Starlink referral reward?',
        answer:
          'It depends on the country where you sign up. In the United States, Starlink\'s order page shows $100 each, as cash or service credit. In other countries the amount may be different, and it appears in your account.',
      },
      {
        question: 'Who can get the referral reward?',
        answer:
          'People who have never been Starlink customers and order a Residential or Roam plan on starlink.com through the link. Current and former customers do not get it, and kits from resellers, marketplace purchases and account transfers do not count.',
      },
      {
        question: 'I ordered Starlink without the link. Can I add the referral later?',
        answer:
          'No. According to Starlink\'s help center, the referral is only recorded when the order is placed through the link; an order without it, or through someone else\'s link, cannot be changed later.',
      },
      {
        question: 'Can I return Starlink if I don\'t like it?',
        answer:
          'Yes. According to Starlink\'s order page, if you cancel and return the undamaged kit within 30 days, Starlink refunds the kit and the first month of service.',
      },
      {
        question: 'Do I need to copy a code to get the reward?',
        answer:
          'No. Just place the order on starlink.com with the button on this page: the link already carries the referral, and the reward then appears in the Referrals tab of your Starlink account.',
      },
      {
        question: 'Does signing up through the link support Em Casa com Cecília?',
        answer:
          'Yes. Under Starlink\'s program, the person who referred you gets the same amount you do, at no extra cost to you.',
      },
    ],
    linkInstructions: [
      'Tap “Get your referral bonus”: Cecília\'s link opens Starlink\'s official site, with no code to copy.',
      'Enter your address, pick a Residential or Roam plan and place the order through the link itself: an order without the link, from a reseller or on a marketplace does not count as a referral, and it cannot be added later.',
      'Pay the first month and activate the kit.',
      'After two months of service, the reward appears in your account, by default as credit taken off the next bill.',
    ],
    linkNote:
      'The referral only works for people who have never been Starlink customers and only on orders placed on starlink.com through the link. The person who referred you gets the same amount.',
  },
  es: {
    discount: 'Recompensa por referido',
    offerTypeLabel: 'referido',
    offerTypeLabelPlural: 'referidos',
    offerActionLabel: 'Recibe tu recompensa por referido',
    cutoutNote: 'Se aplica automáticamente con el enlace de Cecília.',
    category: 'Internet por satélite',
    shortDescription: 'cliente nuevo: recibe tu recompensa del programa oficial de referidos de Starlink con el enlace de Cecília',
    longDescription:
      'Cliente nuevo: recibe tu recompensa del programa oficial de referidos de Starlink registrándote con el enlace de Cecília. El referido solo cuenta en los pedidos hechos a través del enlace en starlink.com, para los planes Residential y Roam, y la recompensa llega tras dos meses de servicio, como crédito de servicio o, donde Starlink lo ofrece, en efectivo. El importe depende del país: en Estados Unidos, por ejemplo, son 100 dólares. Starlink ofrece el reembolso completo del kit y del primer mes si lo devuelves en 30 días.',
    metaTitle: '¿Código de referido Starlink? Recompensa con el enlace de Cecília',
    metaDescription:
      'Referido de Starlink: los nuevos clientes que se registran con el enlace de Cecília reciben una recompensa a los dos meses, en crédito o efectivo.',
    eligibleCategories: 'Primera suscripción a un plan Residential o Roam, contratada en starlink.com con el enlace',
    validity: 'Activa mientras dure el programa de referidos de Starlink; el importe es el que Starlink paga en el país donde te registras',
    reusable: 'Solo para quien nunca ha sido cliente de Starlink: los clientes actuales y antiguos no reciben la recompensa',
    shipping: 'Los precios del kit y del envío aparecen en el pedido en starlink.com, después de introducir tu dirección',
    combinable:
      'La recompensa no es un descuento en el pedido: llega tras dos meses de servicio, y el pedido mantiene el precio y las promociones que Starlink muestra ese día',
    aboutBrand:
      'Starlink es el internet por satélite de SpaceX, con planes residenciales y para viajar y un kit listo para conectar. Los pedidos se hacen en starlink.com, y Starlink reembolsa el kit y el primer mes si lo devuelves en 30 días. Esta página tiene el enlace de referido de Cecília: los nuevos clientes que se registran con él reciben una recompensa, y Em Casa com Cecília recibe el mismo importe, sin coste adicional para quien se suscribe.',
    brandLogoAlt: 'Logotipo de Starlink',
    faqs: [
      {
        question: '¿Hay un código de cupón de Starlink?',
        answer:
          'No hay código que pegar: la ventaja es el enlace de referido de Cecília. Los nuevos clientes de Starlink que se registran con él reciben una recompensa a los dos meses de servicio, como crédito de servicio o, donde Starlink lo ofrece, en efectivo.',
      },
      {
        question: '¿Cómo funciona el referido de Starlink?',
        answer:
          'Según el centro de ayuda de Starlink, el nuevo cliente y quien lo recomendó reciben el mismo importe cuando la nueva suscripción cumple dos meses. Por defecto llega como crédito de servicio y se descuenta de la siguiente factura. Donde Starlink lo ofrece, puedes cambiarlo a efectivo en la pestaña Referidos de tu cuenta.',
      },
      {
        question: '¿Cuánto es la recompensa por referido de Starlink?',
        answer:
          'Depende del país donde te registres. En Estados Unidos, la página de pedido de Starlink muestra 100 dólares para cada uno, en efectivo o crédito de servicio. En otros países el importe puede ser distinto y aparece en tu cuenta.',
      },
      {
        question: '¿Quién puede recibir la recompensa por referido?',
        answer:
          'Quien nunca ha sido cliente de Starlink y contrata un plan Residential o Roam en starlink.com con el enlace. Los clientes actuales y antiguos no la reciben, y los kits de revendedores, las compras en marketplaces y las transferencias de cuenta no cuentan.',
      },
      {
        question: 'Pedí Starlink sin el enlace. ¿Puedo añadir el referido después?',
        answer:
          'No. Según el centro de ayuda de Starlink, el referido solo se registra cuando el pedido se hace con el enlace; un pedido sin él, o con el enlace de otra persona, no se puede cambiar después.',
      },
      {
        question: '¿Puedo devolver Starlink si no me gusta?',
        answer:
          'Sí. Según la página de pedido de Starlink, si cancelas y devuelves el kit sin daños en 30 días, Starlink reembolsa el kit y el primer mes de servicio.',
      },
      {
        question: '¿Necesito copiar un código para recibir la recompensa?',
        answer:
          'No. Solo tienes que hacer el pedido en starlink.com con el botón de esta página: el enlace ya lleva el referido, y la recompensa aparece después en la pestaña Referidos de tu cuenta de Starlink.',
      },
      {
        question: '¿Registrarme con el enlace apoya a Em Casa com Cecília?',
        answer:
          'Sí. Según el programa de Starlink, quien te recomendó recibe el mismo importe que tú, sin coste adicional para ti.',
      },
    ],
    linkInstructions: [
      'Toca “Recibe tu recompensa por referido”: el enlace de Cecília abre el sitio oficial de Starlink, sin código que copiar.',
      'Introduce tu dirección, elige un plan Residential o Roam y haz el pedido con el propio enlace: un pedido sin el enlace, de un revendedor o en un marketplace no cuenta como referido, y no se puede añadir después.',
      'Paga el primer mes y activa el kit.',
      'Tras dos meses de servicio, la recompensa aparece en tu cuenta, por defecto como crédito que se descuenta de la siguiente factura.',
    ],
    linkNote:
      'El referido solo funciona para quien nunca ha sido cliente de Starlink y solo en pedidos hechos en starlink.com con el enlace. Quien te recomendó recibe el mismo importe.',
  },
  fr: {
    discount: 'Récompense de parrainage',
    offerTypeLabel: 'parrainage',
    offerTypeLabelPlural: 'parrainages',
    offerActionLabel: 'Recevez votre récompense de parrainage',
    cutoutNote: 'Appliqué automatiquement via le lien de Cecília.',
    category: 'Internet par satellite',
    shortDescription: 'nouveau client\u00a0: obtenez votre récompense du programme de parrainage officiel de Starlink via le lien de Cecília',
    longDescription:
      'Nouveau client\u00a0: obtenez votre récompense du programme de parrainage officiel de Starlink en vous inscrivant avec le lien de Cecília. Le parrainage ne compte que pour les commandes passées via le lien sur starlink.com, pour les offres Residential et Roam, et la récompense arrive après deux mois de service, sous forme de crédit de service ou, là où Starlink le propose, en argent. Le montant dépend du pays\u00a0: aux États-Unis, par exemple, il est de 100 dollars. Starlink propose le remboursement intégral du kit et du premier mois si vous le retournez sous 30 jours.',
    metaTitle: 'Code parrainage Starlink\u00a0? Récompense via le lien de Cecília',
    metaDescription:
      'Parrainage Starlink\u00a0: les nouveaux clients inscrits via le lien de Cecília reçoivent une récompense après deux mois, en crédit ou en argent.',
    eligibleCategories: 'Premier abonnement à une offre Residential ou Roam, commandé sur starlink.com via le lien',
    validity: 'Active tant que le programme de parrainage de Starlink est en cours\u00a0; le montant est celui que Starlink verse dans le pays où vous vous inscrivez',
    reusable: 'Réservée aux personnes qui n\'ont jamais été clientes de Starlink\u00a0: les clients actuels et anciens ne reçoivent pas la récompense',
    shipping: 'Les prix du kit et de la livraison apparaissent dans la commande sur starlink.com, après la saisie de votre adresse',
    combinable:
      'La récompense n\'est pas une réduction sur la commande\u00a0: elle arrive après deux mois de service, et la commande conserve le prix et les promotions affichés par Starlink ce jour-là',
    aboutBrand:
      'Starlink est l\'internet par satellite de SpaceX, avec des offres résidentielles et pour voyager et un kit prêt à brancher. Les commandes se font sur starlink.com, et Starlink rembourse le kit et le premier mois si vous le retournez sous 30 jours. Cette page contient le lien de parrainage de Cecília\u00a0: les nouveaux clients qui s\'inscrivent avec lui reçoivent une récompense, et Em Casa com Cecília reçoit le même montant, sans surcoût pour l\'abonné.',
    brandLogoAlt: 'Logo Starlink',
    faqs: [
      {
        question: 'Existe-t-il un code promo Starlink\u00a0?',
        answer:
          'Il n\'y a pas de code à coller\u00a0: l\'avantage est le lien de parrainage de Cecília. Les nouveaux clients Starlink qui s\'inscrivent avec lui reçoivent une récompense après deux mois de service, sous forme de crédit de service ou, là où Starlink le propose, en argent.',
      },
      {
        question: 'Comment fonctionne le parrainage Starlink\u00a0?',
        answer:
          'Selon le centre d\'aide de Starlink, le nouveau client et la personne qui l\'a parrainé reçoivent le même montant lorsque le nouvel abonnement atteint deux mois. Par défaut, il arrive sous forme de crédit de service et vient en déduction de la prochaine facture. Là où Starlink le propose, vous pouvez passer à l\'argent dans l\'onglet Parrainages de votre compte.',
      },
      {
        question: 'Quel est le montant de la récompense de parrainage Starlink\u00a0?',
        answer:
          'Il dépend du pays où vous vous inscrivez. Aux États-Unis, la page de commande de Starlink indique 100 dollars chacun, en argent ou en crédit de service. Dans d\'autres pays, le montant peut être différent et apparaît dans votre compte.',
      },
      {
        question: 'Qui peut recevoir la récompense de parrainage\u00a0?',
        answer:
          'Les personnes qui n\'ont jamais été clientes de Starlink et qui commandent une offre Residential ou Roam sur starlink.com via le lien. Les clients actuels et anciens ne la reçoivent pas, et les kits de revendeurs, les achats sur des places de marché et les transferts de compte ne comptent pas.',
      },
      {
        question: 'J\'ai commandé Starlink sans le lien. Puis-je ajouter le parrainage plus tard\u00a0?',
        answer:
          'Non. Selon le centre d\'aide de Starlink, le parrainage n\'est enregistré que si la commande est passée via le lien\u00a0; une commande sans lien, ou via le lien de quelqu\'un d\'autre, ne peut pas être modifiée ensuite.',
      },
      {
        question: 'Puis-je retourner Starlink si je n\'aime pas\u00a0?',
        answer:
          'Oui. Selon la page de commande de Starlink, si vous annulez et retournez le kit non endommagé sous 30 jours, Starlink rembourse le kit et le premier mois de service.',
      },
      {
        question: 'Dois-je copier un code pour recevoir la récompense\u00a0?',
        answer:
          'Non. Passez simplement la commande sur starlink.com avec le bouton de cette page\u00a0: le lien contient déjà le parrainage, et la récompense apparaît ensuite dans l\'onglet Parrainages de votre compte Starlink.',
      },
      {
        question: 'S\'inscrire via le lien soutient-il Em Casa com Cecília\u00a0?',
        answer:
          'Oui. Dans le cadre du programme de Starlink, la personne qui vous a parrainé reçoit le même montant que vous, sans surcoût pour vous.',
      },
    ],
    linkInstructions: [
      'Appuyez sur «\u00a0Recevez votre récompense de parrainage\u00a0»\u00a0: le lien de Cecília ouvre le site officiel de Starlink, sans code à copier.',
      'Saisissez votre adresse, choisissez une offre Residential ou Roam et passez la commande via le lien lui-même\u00a0: une commande sans le lien, chez un revendeur ou sur une place de marché ne compte pas comme parrainage, et il ne peut pas être ajouté ensuite.',
      'Payez le premier mois et activez le kit.',
      'Après deux mois de service, la récompense apparaît dans votre compte, par défaut sous forme de crédit déduit de la prochaine facture.',
    ],
    linkNote:
      'Le parrainage ne fonctionne que pour les personnes qui n\'ont jamais été clientes de Starlink et uniquement pour les commandes passées sur starlink.com via le lien. La personne qui vous a parrainé reçoit le même montant.',
  },
  de: {
    discount: 'Empfehlungsprämie',
    offerTypeLabel: 'Empfehlung',
    offerTypeLabelPlural: 'Empfehlungen',
    offerActionLabel: 'Hol dir deine Empfehlungsprämie',
    cutoutNote: 'Wird automatisch über Cecílias Link angewendet.',
    category: 'Satelliteninternet',
    shortDescription: 'Neukunde: Hol dir deine Prämie aus dem offiziellen Empfehlungsprogramm von Starlink über Cecílias Link',
    longDescription:
      'Neukunde: Hol dir deine Prämie aus dem offiziellen Empfehlungsprogramm von Starlink, indem du dich über Cecílias Link anmeldest. Die Empfehlung zählt nur bei Bestellungen über den Link auf starlink.com, für Residential- und Roam-Tarife, und die Prämie kommt nach zwei Monaten Nutzung, als Servicegutschrift oder, wo Starlink es anbietet, als Bargeld. Die Höhe hängt vom Land ab: In den Vereinigten Staaten sind es zum Beispiel 100 $. Starlink bietet die volle Erstattung von Kit und erstem Monat an, wenn du es innerhalb von 30 Tagen zurückschickst.',
    metaTitle: 'Starlink-Empfehlungscode? Deine Prämie über Cecílias Link',
    metaDescription:
      'Starlink-Empfehlung: Neue Kunden, die sich über Cecílias Link anmelden, erhalten nach zwei Monaten eine Prämie als Guthaben oder Bargeld. Residential und Roam.',
    eligibleCategories: 'Erstes Abo eines Residential- oder Roam-Tarifs, über den Link auf starlink.com bestellt',
    validity: 'Aktiv, solange das Empfehlungsprogramm von Starlink läuft; die Höhe ist die, die Starlink in dem Land zahlt, in dem du dich anmeldest',
    reusable: 'Nur für Personen, die noch nie Starlink-Kunden waren: Aktuelle und frühere Kunden erhalten die Prämie nicht',
    shipping: 'Die Preise für Kit und Versand erscheinen in der Bestellung auf starlink.com, nachdem du deine Adresse eingegeben hast',
    combinable:
      'Die Prämie ist kein Rabatt auf die Bestellung: Sie kommt nach zwei Monaten Nutzung, und die Bestellung behält den Preis und die Aktionen, die Starlink an dem Tag anzeigt',
    aboutBrand:
      'Starlink ist das Satelliteninternet von SpaceX, mit Tarifen für zu Hause und für unterwegs und einem Kit zum Einstecken und Loslegen. Bestellt wird auf starlink.com, und Starlink erstattet Kit und ersten Monat, wenn du es innerhalb von 30 Tagen zurückschickst. Diese Seite enthält Cecílias Empfehlungslink: Neue Kunden, die sich darüber anmelden, erhalten eine Prämie, und Em Casa com Cecília erhält denselben Betrag – ohne Mehrkosten für dich.',
    brandLogoAlt: 'Starlink-Logo',
    faqs: [
      {
        question: 'Gibt es einen Starlink-Gutscheincode?',
        answer:
          'Einen Code zum Einfügen gibt es nicht: Der Vorteil ist Cecílias Empfehlungslink. Neue Starlink-Kunden, die sich darüber anmelden, erhalten nach zwei Monaten Nutzung eine Prämie, als Servicegutschrift oder, wo Starlink es anbietet, als Bargeld.',
      },
      {
        question: 'Wie funktioniert die Starlink-Empfehlung?',
        answer:
          'Laut Hilfe-Center von Starlink erhalten der neue Kunde und die empfehlende Person denselben Betrag, sobald das neue Abo zwei Monate gelaufen ist. Standardmäßig kommt er als Servicegutschrift und wird von der nächsten Rechnung abgezogen. Wo Starlink es anbietet, kannst du im Tab „Empfehlungen“ deines Kontos auf Bargeld umstellen.',
      },
      {
        question: 'Wie hoch ist die Starlink-Empfehlungsprämie?',
        answer:
          'Das hängt vom Land ab, in dem du dich anmeldest. In den Vereinigten Staaten zeigt die Bestellseite von Starlink jeweils 100 $, als Bargeld oder Servicegutschrift. In anderen Ländern kann der Betrag abweichen, und er erscheint in deinem Konto.',
      },
      {
        question: 'Wer kann die Empfehlungsprämie bekommen?',
        answer:
          'Personen, die noch nie Starlink-Kunden waren und über den Link auf starlink.com einen Residential- oder Roam-Tarif bestellen. Aktuelle und frühere Kunden erhalten sie nicht, und Kits von Wiederverkäufern, Käufe auf Marktplätzen und Kontoübertragungen zählen nicht.',
      },
      {
        question: 'Ich habe Starlink ohne den Link bestellt. Kann ich die Empfehlung nachträglich hinzufügen?',
        answer:
          'Nein. Laut Hilfe-Center von Starlink wird die Empfehlung nur erfasst, wenn die Bestellung über den Link aufgegeben wird; eine Bestellung ohne Link oder über den Link einer anderen Person lässt sich später nicht ändern.',
      },
      {
        question: 'Kann ich Starlink zurückgeben, wenn es mir nicht gefällt?',
        answer:
          'Ja. Laut Bestellseite von Starlink erstattet Starlink Kit und ersten Monat, wenn du kündigst und das unbeschädigte Kit innerhalb von 30 Tagen zurückschickst.',
      },
      {
        question: 'Muss ich einen Code kopieren, um die Prämie zu bekommen?',
        answer:
          'Nein. Bestelle einfach auf starlink.com über den Button auf dieser Seite: Der Link enthält die Empfehlung bereits, und die Prämie erscheint danach im Tab „Empfehlungen“ deines Starlink-Kontos.',
      },
      {
        question: 'Unterstützt die Anmeldung über den Link Em Casa com Cecília?',
        answer:
          'Ja. Nach dem Programm von Starlink erhält die empfehlende Person denselben Betrag wie du, ohne Mehrkosten für dich.',
      },
    ],
    linkInstructions: [
      'Tippe auf „Hol dir deine Empfehlungsprämie“: Cecílias Link öffnet die offizielle Starlink-Seite, ganz ohne Code zum Kopieren.',
      'Gib deine Adresse ein, wähle einen Residential- oder Roam-Tarif und schließe die Bestellung über den Link selbst ab: Eine Bestellung ohne den Link, bei einem Wiederverkäufer oder auf einem Marktplatz zählt nicht als Empfehlung und lässt sich nicht nachträglich hinzufügen.',
      'Zahle den ersten Monat und aktiviere das Kit.',
      'Nach zwei Monaten Nutzung erscheint die Prämie in deinem Konto, standardmäßig als Guthaben, das von der nächsten Rechnung abgezogen wird.',
    ],
    linkNote:
      'Die Empfehlung funktioniert nur für Personen, die noch nie Starlink-Kunden waren, und nur bei Bestellungen auf starlink.com über den Link. Die empfehlende Person erhält denselben Betrag.',
  },
  it: {
    discount: 'Premio referral',
    offerTypeLabel: 'referral',
    offerTypeLabelPlural: 'referral',
    offerActionLabel: 'Ricevi il tuo premio referral',
    cutoutNote: 'Applicato automaticamente con il link di Cecília.',
    category: 'Internet satellitare',
    shortDescription: 'nuovo cliente: ottieni il tuo premio dal programma referral ufficiale di Starlink con il link di Cecília',
    longDescription:
      'Nuovo cliente: ottieni il tuo premio dal programma referral ufficiale di Starlink iscrivendoti con il link di Cecília. Il referral conta solo per gli ordini fatti tramite il link su starlink.com, per i piani Residential e Roam, e il premio arriva dopo due mesi di servizio, come credito di servizio o, dove Starlink lo offre, in denaro. L\'importo dipende dal paese: negli Stati Uniti, per esempio, è di 100 dollari. Starlink offre il rimborso completo del kit e del primo mese se lo restituisci entro 30 giorni.',
    metaTitle: 'Codice referral Starlink? Il tuo premio con il link di Cecília',
    metaDescription:
      'Referral Starlink: i nuovi clienti che si iscrivono con il link di Cecília ricevono un premio dopo due mesi, in credito o denaro. Piani Residential e Roam.',
    eligibleCategories: 'Primo abbonamento a un piano Residential o Roam, ordinato su starlink.com tramite il link',
    validity: 'Attivo finché dura il programma referral di Starlink; l\'importo è quello che Starlink paga nel paese in cui ti iscrivi',
    reusable: 'Solo per chi non è mai stato cliente Starlink: i clienti attuali e passati non ricevono il premio',
    shipping: 'I prezzi di kit e spedizione compaiono nell\'ordine su starlink.com, dopo aver inserito l\'indirizzo',
    combinable:
      'Il premio non è uno sconto sull\'ordine: arriva dopo due mesi di servizio, e l\'ordine mantiene il prezzo e le promozioni che Starlink mostra quel giorno',
    aboutBrand:
      'Starlink è l\'internet satellitare di SpaceX, con piani residenziali e per viaggiare e un kit pronto da collegare. Gli ordini si fanno su starlink.com, e Starlink rimborsa il kit e il primo mese se lo restituisci entro 30 giorni. Questa pagina contiene il link referral di Cecília: i nuovi clienti che si iscrivono con questo link ricevono un premio, e Em Casa com Cecília riceve lo stesso importo, senza costi aggiuntivi per chi si abbona.',
    brandLogoAlt: 'Logo Starlink',
    faqs: [
      {
        question: 'Esiste un codice sconto Starlink?',
        answer:
          'Non c\'è un codice da incollare: il vantaggio è il link referral di Cecília. I nuovi clienti Starlink che si iscrivono con questo link ricevono un premio dopo due mesi di servizio, come credito di servizio o, dove Starlink lo offre, in denaro.',
      },
      {
        question: 'Come funziona il referral di Starlink?',
        answer:
          'Secondo il centro assistenza di Starlink, il nuovo cliente e chi lo ha invitato ricevono lo stesso importo quando il nuovo abbonamento completa due mesi. Per impostazione predefinita arriva come credito di servizio e viene scalato dalla fattura successiva. Dove Starlink lo offre, puoi passare al denaro nella scheda Referral del tuo account.',
      },
      {
        question: 'Quanto vale il premio referral di Starlink?',
        answer:
          'Dipende dal paese in cui ti iscrivi. Negli Stati Uniti la pagina d\'ordine di Starlink mostra 100 dollari a testa, in denaro o credito di servizio. In altri paesi l\'importo può essere diverso e compare nel tuo account.',
      },
      {
        question: 'Chi può ricevere il premio referral?',
        answer:
          'Chi non è mai stato cliente Starlink e ordina un piano Residential o Roam su starlink.com tramite il link. I clienti attuali e passati non lo ricevono, e i kit di rivenditori, gli acquisti sui marketplace e i trasferimenti di account non contano.',
      },
      {
        question: 'Ho ordinato Starlink senza il link. Posso aggiungere il referral dopo?',
        answer:
          'No. Secondo il centro assistenza di Starlink, il referral viene registrato solo quando l\'ordine è fatto tramite il link; un ordine senza il link, o tramite il link di un\'altra persona, non si può modificare dopo.',
      },
      {
        question: 'Posso restituire Starlink se non mi piace?',
        answer:
          'Sì. Secondo la pagina d\'ordine di Starlink, se annulli e restituisci il kit non danneggiato entro 30 giorni, Starlink rimborsa il kit e il primo mese di servizio.',
      },
      {
        question: 'Devo copiare un codice per ricevere il premio?',
        answer:
          'No. Ordina su starlink.com con il pulsante di questa pagina: il link contiene già il referral, e il premio compare poi nella scheda Referral del tuo account Starlink.',
      },
      {
        question: 'Iscrivermi con il link sostiene Em Casa com Cecília?',
        answer:
          'Sì. Nel programma di Starlink, chi ti ha invitato riceve lo stesso importo che ricevi tu, senza costi aggiuntivi per te.',
      },
    ],
    linkInstructions: [
      'Tocca “Ricevi il tuo premio referral”: il link di Cecília apre il sito ufficiale di Starlink, senza codice da copiare.',
      'Inserisci il tuo indirizzo, scegli un piano Residential o Roam e fai l\'ordine proprio tramite il link: un ordine senza il link, da un rivenditore o su un marketplace non conta come referral, e non si può aggiungere dopo.',
      'Paga il primo mese e attiva il kit.',
      'Dopo due mesi di servizio, il premio compare nel tuo account, per impostazione predefinita come credito scalato dalla fattura successiva.',
    ],
    linkNote:
      'Il referral funziona solo per chi non è mai stato cliente Starlink e solo per gli ordini fatti su starlink.com tramite il link. Chi ti ha invitato riceve lo stesso importo.',
  },
  ko: {
    discount: '추천 보상',
    offerTypeLabel: '추천',
    offerTypeLabelPlural: '추천',
    offerActionLabel: '추천 보상 받기',
    cutoutNote: 'Cecília의 링크로 자동 적용됩니다.',
    category: '위성 인터넷',
    shortDescription: '신규 고객이라면 Cecília의 링크로 Starlink 공식 추천 프로그램의 보상을 받아 보세요',
    longDescription:
      '신규 고객이라면 Cecília의 링크로 가입해 Starlink 공식 추천 프로그램의 보상을 받아 보세요. 추천은 starlink.com에서 이 링크를 통해 주문한 건에만 인정되며 Residential과 Roam 요금제가 대상입니다. 보상은 2개월간 서비스를 이용한 뒤 서비스 크레딧으로, Starlink가 제공하는 지역에서는 현금으로 지급됩니다. 금액은 국가마다 다르며, 예를 들어 미국에서는 100달러입니다. 30일 이내에 반품하면 Starlink가 키트와 첫 달 요금을 전액 환불합니다.',
    metaTitle: 'Starlink 추천 코드? Cecília의 링크로 보상 받기',
    metaDescription:
      'Starlink 추천: Cecília의 링크로 가입한 신규 고객은 2개월 후 크레딧 또는 현금으로 보상을 받습니다. Residential, Roam 요금제.',
    eligibleCategories: '링크를 통해 starlink.com에서 주문한 Residential 또는 Roam 요금제의 첫 구독',
    validity: 'Starlink의 추천 프로그램이 운영되는 동안 유효하며, 금액은 가입한 국가에서 Starlink가 지급하는 금액입니다',
    reusable: 'Starlink 고객이었던 적이 없는 분만 해당됩니다. 현재 고객과 이전 고객은 보상을 받을 수 없습니다',
    shipping: '키트와 배송 가격은 주소를 입력한 뒤 starlink.com의 주문 화면에 표시됩니다',
    combinable:
      '보상은 주문 금액에서 할인되는 것이 아니라 2개월 서비스 이용 후 지급되며, 주문에는 그날 Starlink가 표시하는 가격과 프로모션이 그대로 적용됩니다',
    aboutBrand:
      'Starlink는 SpaceX의 위성 인터넷으로, 가정용과 여행용 요금제, 그리고 바로 연결해 쓰는 키트를 제공합니다. 주문은 starlink.com에서 하며, 30일 이내에 반품하면 Starlink가 키트와 첫 달 요금을 환불합니다. 이 페이지에는 Cecília의 추천 링크가 있습니다. 이 링크로 가입한 신규 고객은 보상을 받고, Em Casa com Cecília도 같은 금액을 받으며, 구독자에게 추가 비용은 없습니다.',
    brandLogoAlt: 'Starlink 로고',
    faqs: [
      {
        question: 'Starlink 쿠폰 코드가 있나요?',
        answer:
          '붙여넣을 코드는 없습니다. 혜택은 Cecília의 추천 링크입니다. 이 링크로 가입한 Starlink 신규 고객은 2개월간 서비스를 이용하면 서비스 크레딧으로, Starlink가 제공하는 지역에서는 현금으로 보상을 받습니다.',
      },
      {
        question: 'Starlink 추천은 어떻게 작동하나요?',
        answer:
          'Starlink 고객센터에 따르면, 새 구독이 2개월을 채우면 신규 고객과 추천한 사람이 같은 금액을 받습니다. 기본적으로 서비스 크레딧으로 지급되어 다음 청구서에서 차감됩니다. Starlink가 제공하는 지역에서는 계정의 추천 탭에서 현금으로 바꿀 수 있습니다.',
      },
      {
        question: 'Starlink 추천 보상은 얼마인가요?',
        answer:
          '가입하는 국가에 따라 다릅니다. 미국에서는 Starlink 주문 페이지에 각각 100달러가 현금 또는 서비스 크레딧으로 표시됩니다. 다른 국가에서는 금액이 다를 수 있으며, 계정에 표시됩니다.',
      },
      {
        question: '추천 보상은 누가 받을 수 있나요?',
        answer:
          'Starlink 고객이었던 적이 없고, 링크를 통해 starlink.com에서 Residential 또는 Roam 요금제를 주문한 분입니다. 현재 고객과 이전 고객은 받을 수 없으며, 재판매업체의 키트, 마켓플레이스 구매, 계정 이전은 해당되지 않습니다.',
      },
      {
        question: '링크 없이 Starlink를 주문했습니다. 나중에 추천을 추가할 수 있나요?',
        answer:
          '아니요. Starlink 고객센터에 따르면, 추천은 링크를 통해 주문할 때만 기록되며, 링크 없이 한 주문이나 다른 사람의 링크로 한 주문은 나중에 바꿀 수 없습니다.',
      },
      {
        question: '마음에 들지 않으면 Starlink를 반품할 수 있나요?',
        answer:
          '네. Starlink 주문 페이지에 따르면, 30일 이내에 취소하고 손상되지 않은 키트를 반품하면 Starlink가 키트와 첫 달 서비스 요금을 환불합니다.',
      },
      {
        question: '보상을 받으려면 코드를 복사해야 하나요?',
        answer:
          '아니요. 이 페이지의 버튼으로 starlink.com에서 주문하기만 하면 됩니다. 링크에 이미 추천 정보가 들어 있으며, 보상은 이후 Starlink 계정의 추천 탭에 표시됩니다.',
      },
      {
        question: '링크로 가입하면 Em Casa com Cecília에 도움이 되나요?',
        answer:
          '네. Starlink 프로그램에 따라 추천한 사람도 가입자와 같은 금액을 받으며, 가입자에게 추가 비용은 없습니다.',
      },
    ],
    linkInstructions: [
      '“추천 보상 받기”를 누르세요. Cecília의 링크가 Starlink 공식 사이트를 열며, 복사할 코드는 없습니다.',
      '주소를 입력하고 Residential 또는 Roam 요금제를 선택한 뒤, 반드시 그 링크로 주문하세요. 링크 없이, 재판매업체에서, 또는 마켓플레이스에서 한 주문은 추천으로 인정되지 않으며 나중에 추가할 수 없습니다.',
      '첫 달 요금을 결제하고 키트를 활성화하세요.',
      '2개월간 서비스를 이용하면 보상이 계정에 표시되며, 기본적으로 다음 청구서에서 차감되는 크레딧으로 지급됩니다.',
    ],
    linkNote:
      '추천은 Starlink 고객이었던 적이 없는 분이 링크를 통해 starlink.com에서 주문한 경우에만 적용됩니다. 추천한 사람도 같은 금액을 받습니다.',
  },
  ja: {
    discount: '紹介特典',
    offerTypeLabel: '紹介',
    offerTypeLabelPlural: '紹介',
    offerActionLabel: '紹介特典を受け取る',
    cutoutNote: 'Cecília のリンクから自動で適用されます。',
    category: '衛星インターネット',
    shortDescription: '新規のお客様は、Cecília のリンクから Starlink 公式の紹介プログラムの特典を受け取れます',
    longDescription:
      '新規のお客様は、Cecília のリンクから登録して、Starlink 公式の紹介プログラムの特典を受け取りましょう。紹介が対象になるのは、starlink.com でこのリンク経由で注文した場合のみで、Residential と Roam のプランが対象です。特典は 2 か月間サービスを利用した後に、サービスクレジットとして、または Starlink が対応している地域では現金で届きます。金額は国によって異なり、たとえばアメリカでは 100 ドルです。30 日以内に返品すれば、Starlink がキットと最初の 1 か月分を全額返金します。',
    metaTitle: 'Starlink 紹介コード？Cecília のリンクで特典を受け取る',
    metaDescription:
      'Starlink の紹介特典：Cecília のリンクから登録した新規のお客様は、2 か月後にクレジットまたは現金で特典を受け取れます。Residential と Roam プラン。',
    eligibleCategories: 'リンク経由で starlink.com から注文した Residential または Roam プランの初回契約',
    validity: 'Starlink の紹介プログラムが続く間有効です。金額は、登録した国で Starlink が支払う金額です',
    reusable: 'これまで Starlink のお客様だったことがない方のみが対象です。現在のお客様と過去のお客様は特典を受け取れません',
    shipping: 'キットと送料の価格は、住所を入力したあとの starlink.com の注文画面に表示されます',
    combinable:
      '特典は注文代金の割引ではなく、2 か月間のサービス利用後に付与されます。注文には、その日に Starlink が表示する価格とプロモーションがそのまま適用されます',
    aboutBrand:
      'Starlink は SpaceX の衛星インターネットで、家庭向けと旅行向けのプランと、つなぐだけで使えるキットを提供しています。注文は starlink.com で行い、30 日以内に返品すれば Starlink がキットと最初の 1 か月分を返金します。このページには Cecília の紹介リンクがあります。このリンクから登録した新規のお客様は特典を受け取り、Em Casa com Cecília も同額を受け取りますが、契約者の追加負担はありません。',
    brandLogoAlt: 'Starlink のロゴ',
    faqs: [
      {
        question: 'Starlink のクーポンコードはありますか？',
        answer:
          '貼り付けるコードはありません。特典は Cecília の紹介リンクです。このリンクから登録した Starlink の新規のお客様は、2 か月間サービスを利用すると、サービスクレジットとして、または Starlink が対応している地域では現金で特典を受け取れます。',
      },
      {
        question: 'Starlink の紹介はどのような仕組みですか？',
        answer:
          'Starlink のヘルプセンターによると、新しい契約が 2 か月に達した時点で、新規のお客様と紹介した人が同じ金額を受け取ります。標準ではサービスクレジットとして付与され、次回の請求額から差し引かれます。Starlink が対応している地域では、アカウントの「紹介」タブで現金に切り替えられます。',
      },
      {
        question: 'Starlink の紹介特典はいくらですか？',
        answer:
          '登録する国によって異なります。アメリカでは、Starlink の注文ページに、現金またはサービスクレジットでそれぞれ 100 ドルと表示されます。ほかの国では金額が異なる場合があり、アカウントに表示されます。',
      },
      {
        question: '紹介特典を受け取れるのはどんな人ですか？',
        answer:
          'これまで Starlink のお客様だったことがなく、リンク経由で starlink.com から Residential または Roam のプランを注文した方です。現在のお客様と過去のお客様は対象外で、再販業者のキット、マーケットプレイスでの購入、アカウントの譲渡も対象になりません。',
      },
      {
        question: 'リンクを使わずに Starlink を注文しました。あとから紹介を追加できますか？',
        answer:
          'できません。Starlink のヘルプセンターによると、紹介はリンク経由で注文したときにだけ記録されます。リンクなしの注文や、他の人のリンクでの注文は、あとから変更できません。',
      },
      {
        question: '気に入らなければ Starlink を返品できますか？',
        answer:
          'はい。Starlink の注文ページによると、30 日以内に解約して損傷のないキットを返品すれば、Starlink がキットと最初の 1 か月分のサービス料金を返金します。',
      },
      {
        question: '特典を受け取るのにコードをコピーする必要はありますか？',
        answer:
          'いいえ。このページのボタンから starlink.com で注文するだけです。リンクにすでに紹介が含まれていて、特典はそのあと Starlink アカウントの「紹介」タブに表示されます。',
      },
      {
        question: 'リンクから登録すると Em Casa com Cecília の応援になりますか？',
        answer:
          'はい。Starlink のプログラムでは、紹介した人もあなたと同じ金額を受け取ります。あなたの追加負担はありません。',
      },
    ],
    linkInstructions: [
      '「紹介特典を受け取る」をタップします。Cecília のリンクから Starlink の公式サイトが開き、コピーするコードはありません。',
      '住所を入力し、Residential または Roam のプランを選んで、そのリンクから注文します。リンクなしの注文、再販業者やマーケットプレイスでの購入は紹介と認められず、あとから追加することもできません。',
      '最初の 1 か月分を支払い、キットを有効にします。',
      '2 か月間サービスを利用すると、特典がアカウントに表示されます。標準では、次回の請求額から差し引かれるクレジットとして付与されます。',
    ],
    linkNote:
      '紹介が有効なのは、これまで Starlink のお客様だったことがない方が、リンク経由で starlink.com から注文した場合だけです。紹介した人も同じ金額を受け取ります。',
  },
  'zh-hant': {
    discount: '推薦獎勵',
    offerTypeLabel: '推薦',
    offerTypeLabelPlural: '推薦',
    offerActionLabel: '領取推薦獎勵',
    cutoutNote: '透過 Cecília 的連結自動套用。',
    category: '衛星互聯網',
    shortDescription: '新客戶透過 Cecília 的連結，領取 Starlink 官方推薦計畫的獎勵',
    longDescription:
      '新客戶請透過 Cecília 的連結註冊，領取 Starlink 官方推薦計畫的獎勵。推薦僅適用於在 starlink.com 透過該連結下的訂單，且限 Residential 和 Roam 方案，獎勵會在使用服務滿兩個月後發放，形式為服務抵免額，在 Starlink 提供的地區也可選擇現金。金額因國家而異，例如在美國為 100 美元。如在 30 天內退貨，Starlink 會全額退還套件和第一個月的費用。',
    metaTitle: 'Starlink 推薦碼？透過 Cecília 的連結領取獎勵',
    metaDescription:
      'Starlink 推薦：透過 Cecília 的連結註冊的新客戶，滿兩個月後可獲得抵免額或現金獎勵。適用於 Residential 和 Roam 方案。',
    eligibleCategories: '透過連結在 starlink.com 訂購的 Residential 或 Roam 方案的首次訂閱',
    validity: '在 Starlink 推薦計劃進行期間有效；金額為 Starlink 在你註冊所在國家支付的金額',
    reusable: '僅限從未成為 Starlink 客戶的人：現有客戶和過往客戶無法獲得獎勵',
    shipping: '套件和運費會在輸入地址後，顯示於 starlink.com 的訂單中',
    combinable:
      '獎勵並非訂單折扣：它在服務滿兩個月後發放，訂單沿用 Starlink 當天顯示的價格和優惠',
    aboutBrand:
      'Starlink 是 SpaceX 的衛星互聯網，提供家用和旅行方案，以及即插即用的套件。訂單在 starlink.com 下達，如在 30 天內退貨，Starlink 會退還套件和第一個月的費用。本頁提供 Cecília 的推薦連結：透過該連結註冊的新客戶可獲得獎勵，Em Casa com Cecília 也會獲得相同金額，訂閱者無需支付額外費用。',
    brandLogoAlt: 'Starlink 標誌',
    faqs: [
      {
        question: 'Starlink 有優惠碼嗎？',
        answer:
          '沒有需要貼上的代碼：優惠就是 Cecília 的推薦連結。透過該連結註冊的 Starlink 新客戶，在使用服務滿兩個月後可獲得獎勵，形式為服務抵免額，在 Starlink 提供的地區也可選擇現金。',
      },
      {
        question: 'Starlink 推薦是如何運作的？',
        answer:
          '根據 Starlink 幫助中心，新訂閱滿兩個月後，新客戶和推薦人會獲得相同的金額。預設以服務抵免額發放，並從下一期帳單中扣除。在 Starlink 提供的地區，你可以在帳戶的「推薦」分頁改為領取現金。',
      },
      {
        question: 'Starlink 推薦獎勵是多少？',
        answer:
          '視乎你註冊所在的國家。在美國，Starlink 的訂購頁面顯示雙方各 100 美元，可選現金或服務抵免額。其他國家的金額可能不同，並會顯示在你的帳戶中。',
      },
      {
        question: '誰可以獲得推薦獎勵？',
        answer:
          '從未成為 Starlink 客戶，並透過該連結在 starlink.com 訂購 Residential 或 Roam 方案的人。現有客戶和過往客戶不能獲得，經銷商的套件、在市集平台購買和帳戶轉讓也不計算在內。',
      },
      {
        question: '我沒有使用連結就訂購了 Starlink，之後可以補上推薦嗎？',
        answer:
          '不可以。根據 Starlink 幫助中心，只有透過連結下單時才會記錄推薦；沒有使用連結或透過他人連結下的訂單，之後無法更改。',
      },
      {
        question: '不喜歡的話可以退回 Starlink 嗎？',
        answer:
          '可以。根據 Starlink 的訂購頁面，如果你在 30 天內取消並退回未損壞的套件，Starlink 會退還套件和第一個月的服務費用。',
      },
      {
        question: '領取獎勵需要複製代碼嗎？',
        answer:
          '不需要。只要透過本頁的按鈕在 starlink.com 下單即可：連結已包含推薦資訊，獎勵之後會顯示在你 Starlink 帳戶的「推薦」分頁。',
      },
      {
        question: '透過連結註冊是否支持 Em Casa com Cecília？',
        answer:
          '是的。根據 Starlink 的計劃，推薦人會獲得與你相同的金額，你無需支付額外費用。',
      },
    ],
    linkInstructions: [
      '點按「領取推薦獎勵」：Cecília 的連結會開啟 Starlink 官方網站，無需複製代碼。',
      '輸入地址，選擇 Residential 或 Roam 方案，並透過該連結本身下單：沒有使用連結、向經銷商購買或在市集平台購買的訂單不計作推薦，之後也無法補上。',
      '支付第一個月的費用並啟用套件。',
      '使用服務滿兩個月後，獎勵會顯示在你的帳戶中，預設以抵免額形式從下一期帳單中扣除。',
    ],
    linkNote:
      '推薦僅適用於從未成為 Starlink 客戶的人，且僅限透過連結在 starlink.com 下的訂單。推薦人會獲得相同的金額。',
  },
  'zh-hans': {
    discount: '推荐奖励',
    offerTypeLabel: '推荐',
    offerTypeLabelPlural: '推荐',
    offerActionLabel: '领取推荐奖励',
    cutoutNote: '通过 Cecília 的链接自动应用。',
    category: '卫星互联网',
    shortDescription: '新客户通过 Cecília 的链接，领取 Starlink 官方推荐计划的奖励',
    longDescription:
      '新客户请通过 Cecília 的链接注册，领取 Starlink 官方推荐计划的奖励。推荐仅适用于在 starlink.com 通过该链接下的订单，且限 Residential 和 Roam 套餐，奖励会在使用服务满两个月后发放，形式为服务抵扣额，在 Starlink 提供的地区也可选择现金。金额因国家而异，例如在美国为 100 美元。如在 30 天内退货，Starlink 会全额退还套件和第一个月的费用。',
    metaTitle: 'Starlink 推荐码？通过 Cecília 的链接领取奖励',
    metaDescription:
      'Starlink 推荐：通过 Cecília 的链接注册的新客户，满两个月后可获得抵扣额或现金奖励。适用于 Residential 和 Roam 套餐。',
    eligibleCategories: '通过链接在 starlink.com 订购的 Residential 或 Roam 套餐的首次订阅',
    validity: '在 Starlink 推荐计划进行期间有效；金额为 Starlink 在你注册所在国家支付的金额',
    reusable: '仅限从未成为 Starlink 客户的人：现有客户和以往客户无法获得奖励',
    shipping: '套件和运费会在输入地址后，显示在 starlink.com 的订单中',
    combinable:
      '奖励并非订单折扣：它在服务满两个月后发放，订单沿用 Starlink 当天显示的价格和优惠',
    aboutBrand:
      'Starlink 是 SpaceX 的卫星互联网，提供家用和旅行套餐，以及即插即用的套件。订单在 starlink.com 下达，如在 30 天内退货，Starlink 会退还套件和第一个月的费用。本页提供 Cecília 的推荐链接：通过该链接注册的新客户可获得奖励，Em Casa com Cecília 也会获得相同金额，订阅者无需支付额外费用。',
    brandLogoAlt: 'Starlink 标志',
    faqs: [
      {
        question: 'Starlink 有优惠码吗？',
        answer:
          '没有需要粘贴的代码：优惠就是 Cecília 的推荐链接。通过该链接注册的 Starlink 新客户，在使用服务满两个月后可获得奖励，形式为服务抵扣额，在 Starlink 提供的地区也可选择现金。',
      },
      {
        question: 'Starlink 推荐是如何运作的？',
        answer:
          '根据 Starlink 帮助中心，新订阅满两个月后，新客户和推荐人会获得相同的金额。默认以服务抵扣额发放，并从下一期账单中扣除。在 Starlink 提供的地区，你可以在账户的“推荐”标签页改为领取现金。',
      },
      {
        question: 'Starlink 推荐奖励是多少？',
        answer:
          '取决于你注册所在的国家。在美国，Starlink 的订购页面显示双方各 100 美元，可选现金或服务抵扣额。其他国家的金额可能不同，并会显示在你的账户中。',
      },
      {
        question: '谁可以获得推荐奖励？',
        answer:
          '从未成为 Starlink 客户，并通过该链接在 starlink.com 订购 Residential 或 Roam 套餐的人。现有客户和以往客户不能获得，经销商的套件、在市集平台购买和账户转让也不计算在内。',
      },
      {
        question: '我没有使用链接就订购了 Starlink，之后可以补上推荐吗？',
        answer:
          '不可以。根据 Starlink 帮助中心，只有通过链接下单时才会记录推荐；没有使用链接或通过他人链接下的订单，之后无法更改。',
      },
      {
        question: '不喜欢的话可以退回 Starlink 吗？',
        answer:
          '可以。根据 Starlink 的订购页面，如果你在 30 天内取消并退回未损坏的套件，Starlink 会退还套件和第一个月的服务费用。',
      },
      {
        question: '领取奖励需要复制代码吗？',
        answer:
          '不需要。只要通过本页的按钮在 starlink.com 下单即可：链接已包含推荐信息，奖励之后会显示在你 Starlink 账户的“推荐”标签页。',
      },
      {
        question: '通过链接注册是否支持 Em Casa com Cecília？',
        answer:
          '是的。根据 Starlink 的计划，推荐人会获得与你相同的金额，你无需支付额外费用。',
      },
    ],
    linkInstructions: [
      '点按“领取推荐奖励”：Cecília 的链接会打开 Starlink 官方网站，无需复制代码。',
      '输入地址，选择 Residential 或 Roam 套餐，并通过该链接本身下单：没有使用链接、向经销商购买或在市集平台购买的订单不计作推荐，之后也无法补上。',
      '支付第一个月的费用并激活套件。',
      '使用服务满两个月后，奖励会显示在你的账户中，默认以抵扣额形式从下一期账单中扣除。',
    ],
    linkNote:
      '推荐仅适用于从未成为 Starlink 客户的人，且仅限通过链接在 starlink.com 下的订单。推荐人会获得相同的金额。',
  },
};

// `hubFeatured`: a loja vai aos Destaques do hub de cada idioma, ao lado da YesStyle (Bruno, 20/11/2026). O PT
// segue o `featured` de couponsData.ts.
export type CouponTranslation =
  | { offerMode: 'affiliate-link'; offerUrl?: string; hubFeatured?: boolean; locales: Record<TranslatedLocale, AffiliateOfferTranslation> }
  | { offerMode: 'discount-code'; offerUrl?: string; hubFeatured?: boolean; locales: Record<TranslatedLocale, CodeOfferTranslation> };

const COUPON_TRANSLATIONS: Record<string, CouponTranslation> = {
  shein: {
    // Link neutro (sem br.) gerado pelo Bruno no painel da SHEIN em 05/10/2026; o PT segue no link
    // brasileiro do código 4CW5Y. Não conferir clicando: o clique registra atribuição.
    offerMode: 'affiliate-link',
    offerUrl: 'https://onelink.shein.com/55/6463grgxf6ru',
    locales: SHEIN_TRANSLATIONS,
  },
  // O mesmo link de afiliado do PT vale nos 10 idiomas: a loja leva o visitante à região dele (Bruno, 16/11/2026).
  temu: { offerMode: 'affiliate-link', locales: TEMU_TRANSLATIONS },
  aliexpress: { offerMode: 'affiliate-link', locales: ALIEXPRESS_TRANSLATIONS },
  proton: { offerMode: 'affiliate-link', locales: PROTON_TRANSLATIONS },
  starlink: { offerMode: 'affiliate-link', hubFeatured: true, locales: STARLINK_TRANSLATIONS },
  hostinger: {
    // O SONAR20 no site internacional (em inglês): o link de indicação leva o mesmo código. O PT segue no /br, e
    // o testNote daqui só cita o teste do site global.
    offerMode: 'discount-code',
    hubFeatured: true,
    offerUrl: 'https://www.hostinger.com/?REFERRALCODE=SONAR20',
    locales: HOSTINGER_TRANSLATIONS,
  },
};

export function isHubFeaturedStore(slug: string): boolean {
  return Boolean(COUPON_TRANSLATIONS[slug]?.hubFeatured);
}

export function getCouponStorePath(slug: string, locale: Locale) {
  return locale === 'pt' ? `/cupons/${slug}` : `/${locale}/coupons/${slug}`;
}

// Página da loja em cada idioma; vazio quando o cupom só existe em PT.
export function getCouponLanguageLinks(slug: string): Partial<Record<Locale, string>> {
  if (!COUPON_TRANSLATIONS[slug]) return {};
  return Object.fromEntries(LOCALE_KEYS.map((locale) => [locale, getCouponStorePath(slug, locale)]));
}

// Lojas com tradução e cupom ativo em PT, na ordem de COUPON_TRANSLATIONS. Só elas ganham página fora do PT
// e entram no hub de cada idioma.
export function getTranslatedCouponSlugs(): string[] {
  return Object.keys(COUPON_TRANSLATIONS).filter((slug) => getCouponBySlug(slug));
}

export function getTranslatedCouponRoutes() {
  return getTranslatedCouponSlugs().flatMap((slug) => TRANSLATED_LOCALES.map((locale) => ({ locale, slug })));
}

// A tradução de uma loja, para os testes montarem variações dela.
export function getCouponTranslation(slug: string): CouponTranslation | undefined {
  return COUPON_TRANSLATIONS[slug];
}

export function getLocalizedCoupon(slug: string, locale: TranslatedLocale): Coupon | undefined {
  const coupon = getCouponBySlug(slug);
  const translation = getCouponTranslation(slug);
  if (!coupon || !translation) return undefined;
  return localizeCoupon(coupon, translation, locale);
}

// O cupom em PT com os textos do idioma. Separada de getLocalizedCoupon para os testes passarem uma loja
// fictícia.
export function localizeCoupon(coupon: Coupon, translation: CouponTranslation, locale: TranslatedLocale): Coupon {
  const where = `[couponTranslations] "${coupon.slug}/${locale}"`;
  const text = translation.locales[locale];
  if (coupon.referral && !text.referral) {
    throw new Error(`${where}: a tradução precisa de referral como o cupom em PT.`);
  }
  const shared = {
    offerUrl: translation.offerUrl ?? coupon.offerUrl,
    referral: coupon.referral && { ...coupon.referral, ...text.referral },
    // Textos que só existem em PT; sem tradução, ficam fora da página.
    socialImageAlt: undefined,
    featuredPitch: undefined,
    relatedContent: undefined,
  };

  if (coupon.offerMode === 'affiliate-link' && translation.offerMode === 'affiliate-link') {
    const linkText = translation.locales[locale];
    const ptUrls = (coupon.productLinks ?? []).map((item) => item.url).join(' ');
    const urls = (linkText.productLinks ?? []).map((item) => item.url).join(' ');
    if (ptUrls !== urls) {
      throw new Error(`${where}: os productLinks da tradução precisam dos mesmos endereços do cupom em PT, na mesma ordem.`);
    }
    // Sem ela, a frase do PT sairia na página do idioma.
    if (coupon.cutoutNote && !linkText.cutoutNote) {
      throw new Error(`${where}: a tradução precisa de cutoutNote como o cupom em PT.`);
    }
    // O print, a legenda dele e os vídeos do PT não passam para o idioma: valem os da tradução, ou nenhum.
    return { ...coupon, ...linkText, ...shared, monthlyHighlight: undefined, cartPrint: text.cartPrint, videos: text.videos };
  }
  if (coupon.offerMode === 'discount-code' && translation.offerMode === 'discount-code') {
    // As faixas trazem valores em R$ e o aviso do Magazine Você, que só existem em PT.
    if (coupon.tiers?.length) throw new Error(`${where}: loja com faixas de desconto não tem tradução.`);
    const codeText: Pick<CodeOfferTranslation, TranslatedCodeField> = translation.locales[locale];
    const fields = Object.entries(CODE_FIELD_POLICY).map(([key, policy]) => {
      const field = key as keyof CouponCodeOffer;
      const translated = (codeText as Partial<Record<keyof CouponCodeOffer, unknown>>)[field];
      return [field, policy === 'pt' ? coupon[field] : policy === 'translate' ? translated : undefined];
    });
    return { ...(Object.fromEntries(fields) as CouponCodeOffer), ...shared };
  }
  throw new Error(`${where}: a tradução é de ${translation.offerMode}, e o cupom em PT, de ${coupon.offerMode}.`);
}
