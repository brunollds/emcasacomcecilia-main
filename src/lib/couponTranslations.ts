import {
  getCouponBySlug,
  type Coupon,
  type CouponCodeOffer,
  type CouponFAQ,
  type CouponReferral,
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
  // Só na loja com código de indicação e campanhas no cupom em PT (a SHEIN).
  referral?: Pick<CouponReferral, 'label' | 'instructions'>;
};

export type AffiliateOfferTranslation = OfferTranslationBase & {
  offerTypeLabel: string;
  offerTypeLabelPlural: string;
  offerActionLabel: string;
  linkInstructions: string[];
  linkNote: string;
};

// Loja de código. Sem os campos opcionais, a página usa os textos padrão do idioma
// (couponStoreCopy): "cupom", os passos, o campo do checkout e "Conferido em" no lugar da
// validade e da seção "Como testamos".
export type CodeOfferTranslation = OfferTranslationBase & {
  offerTypeLabel?: string;
  offerTypeLabelPlural?: string;
  // Só com teste feito no site que a página do idioma abre (o global, não o /br).
  testNote?: string;
  codeFieldLabel?: string;
  codeInstructions?: string[];
  monthlyHighlight?: CouponCodeOffer['monthlyHighlight'];
};

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
    linkNote: 'Cecília 的链接会打开 SHEIN 的进行中活动。4CW5Y 的商品和活动代码要在 SHEIN App 或网站搜索才会出现，不在结账时输入；付款前请确认每件商品的折扣。',
    referral: {
      label: 'Cecília 的推荐码',
      instructions: '请复制 4CW5Y 到 SHEIN App 或网站搜索，会打开 SHEIN 选定的促销和折扣商品页面。',
    },
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
      "Works on top of Hostinger's Black Friday price (in our October 29, 2026 test, the 20% came off the sale price); stacking with other coupons has not been tested",
    aboutBrand:
      'Hostinger is a web hosting company offering hosting plans, a website builder, VPS, domains and email. Em Casa com Cecília has run on Hostinger since 2024, as a Node.js app. SONAR20 is the partnership coupon: 20% off every plan, for new and existing customers.',
    brandLogoAlt: 'Hostinger logo',
    faqs: [
      {
        question: 'Does the Hostinger coupon SONAR20 work today?',
        answer:
          'Yes. In our October 29, 2026 test, SONAR20 took 20% off the 48-month Startup plan on Hostinger\'s global site. The date of the latest test is at the top of this page.',
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
          'Yes. In our October 29, 2026 test, the 20% from SONAR20 came off the Black Friday price Hostinger was already showing in the cart.',
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
      'Funciona sobre el precio de Black Friday de Hostinger (en nuestra prueba del 29 de octubre de 2026, el 20% se aplicó sobre el precio de oferta); no se ha probado combinarlo con otros cupones',
    aboutBrand:
      'Hostinger es una empresa de hosting web que ofrece planes de hosting, creador de sitios web, VPS, dominios y correo electrónico. Em Casa com Cecília funciona en Hostinger desde 2024, como aplicación Node.js. SONAR20 es el cupón de la colaboración: 20% de descuento en todos los planes, para clientes nuevos y actuales.',
    brandLogoAlt: 'Logotipo de Hostinger',
    faqs: [
      {
        question: '¿El cupón de Hostinger SONAR20 funciona hoy?',
        answer:
          'Sí. En nuestra prueba del 29 de octubre de 2026, SONAR20 dio un 20% de descuento en el plan Startup de 48 meses en el sitio global de Hostinger. La fecha de la última prueba aparece arriba en esta página.',
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
          'Sí. En nuestra prueba del 29 de octubre de 2026, el 20% de SONAR20 se aplicó sobre el precio de Black Friday que Hostinger ya mostraba en el carrito.',
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
    combinable: `S’applique en plus du prix Black Friday de Hostinger (lors de notre test du 29 octobre 2026, les 20${NBSP}% ont été appliqués au prix soldé)${NBSP}; le cumul avec d’autres codes promo n’a pas été testé`,
    aboutBrand: `Hostinger est un hébergeur web qui propose des offres d’hébergement, un créateur de site, des VPS, des noms de domaine et des e-mails. Em Casa com Cecília est hébergé chez Hostinger depuis 2024, en tant qu’application Node.js. SONAR20 est le code promo du partenariat${NBSP}: 20${NBSP}% de réduction sur chaque offre, pour les nouveaux clients et les clients existants.`,
    brandLogoAlt: 'Logo Hostinger',
    faqs: [
      {
        question: `Le code promo Hostinger SONAR20 fonctionne-t-il aujourd’hui${NBSP}?`,
        answer: `Oui. Lors de notre test du 29 octobre 2026, SONAR20 a donné 20${NBSP}% de réduction sur l’offre Startup de 48 mois sur le site international de Hostinger. La date du dernier test figure en haut de cette page.`,
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
        answer: `Oui. Lors de notre test du 29 octobre 2026, les 20${NBSP}% de SONAR20 se sont appliqués au prix Black Friday que Hostinger affichait déjà dans le panier.`,
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
    combinable: `Gilt zusätzlich zum Black-Friday-Preis von Hostinger (beim Test am 29. Oktober 2026 wurden die 20${NBSP}% vom Aktionspreis abgezogen); die Kombination mit anderen Gutscheinen wurde nicht getestet`,
    aboutBrand: `Hostinger ist ein Webhosting-Anbieter mit Hosting-Tarifen, Website-Baukasten, VPS, Domains und E-Mail. Em Casa com Cecília läuft seit 2024 bei Hostinger als Node.js-Anwendung. SONAR20 ist der Partnergutschein: 20${NBSP}% Rabatt auf alle Tarife, für Neu- und Bestandskunden.`,
    brandLogoAlt: 'Hostinger-Logo',
    faqs: [
      {
        question: `Funktioniert der Gutschein SONAR20 heute?`,
        answer: `Ja. Beim Test am 29. Oktober 2026 hat SONAR20 auf der globalen Hostinger-Seite 20${NBSP}% vom Tarif Startup mit 48 Monaten Laufzeit abgezogen. Das Datum des letzten Tests steht oben auf dieser Seite.`,
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
        answer: `Ja. Beim Test am 29. Oktober 2026 wurden die 20${NBSP}% von SONAR20 auf den Black-Friday-Preis abgezogen, den Hostinger im Warenkorb schon anzeigte.`,
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
      'Vale in aggiunta al prezzo Black Friday di Hostinger (nel nostro test del 29 ottobre 2026 il 20% è stato applicato sul prezzo scontato); la combinazione con altri coupon non è stata testata',
    aboutBrand:
      'Hostinger è un’azienda di web hosting che offre piani di hosting, website builder, VPS, domini ed e-mail. Em Casa com Cecília è ospitato su Hostinger dal 2024, come applicazione Node.js. SONAR20 è il coupon della partnership: 20% di sconto su ogni piano, per clienti nuovi ed esistenti.',
    brandLogoAlt: 'Logo di Hostinger',
    faqs: [
      {
        question: 'Il coupon Hostinger SONAR20 funziona oggi?',
        answer:
          'Sì. Nel nostro test del 29 ottobre 2026, SONAR20 ha dato il 20% di sconto sul piano Startup da 48 mesi sul sito globale di Hostinger. La data dell’ultimo test è in cima a questa pagina.',
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
          'Sì. Nel nostro test del 29 ottobre 2026, il 20% di SONAR20 è stato applicato sul prezzo Black Friday che Hostinger già mostrava nel carrello.',
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
      'Hostinger의 블랙 프라이데이 가격에 추가로 적용됩니다(2026년 10월 29일 테스트에서 20%는 할인가에 적용됨). 다른 쿠폰과의 중복 사용은 테스트하지 않았습니다',
    aboutBrand:
      'Hostinger는 웹 호스팅 회사로, 호스팅 요금제, 웹사이트 빌더, VPS, 도메인, 이메일을 제공합니다. Em Casa com Cecília는 2024년부터 Node.js 애플리케이션으로 Hostinger에서 운영 중입니다. SONAR20은 파트너십 쿠폰으로, 모든 요금제에서 20% 할인되며 신규 및 기존 고객이 사용할 수 있습니다.',
    brandLogoAlt: 'Hostinger 로고',
    faqs: [
      {
        question: 'Hostinger 쿠폰 SONAR20은 지금도 작동하나요?',
        answer:
          '네. 2026년 10월 29일 테스트에서 SONAR20은 Hostinger 글로벌 사이트의 48개월 Startup 요금제에 20% 할인을 적용했습니다. 최근 테스트 날짜는 이 페이지 상단에 있습니다.',
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
          '네. 2026년 10월 29일 테스트에서 SONAR20의 20%는 장바구니에 이미 표시된 블랙 프라이데이 가격에 적용되었습니다.',
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
      'Hostingerのブラックフライデー価格にさらに適用されます（2026年10月29日のテストでは、20%はセール価格から割り引かれました）。他のクーポンとの併用はテストしていません',
    aboutBrand:
      'Hostingerは、ホスティングプラン、Webサイトビルダー、VPS、ドメイン、メールを提供するWebホスティング会社です。Em Casa com CecíliaはNode.jsアプリとして2024年からHostingerで運営しています。SONAR20はパートナーシップのクーポンで、すべてのプランが20%オフになり、新規・既存の顧客が利用できます。',
    brandLogoAlt: 'Hostingerのロゴ',
    faqs: [
      {
        question: 'Hostingerのクーポン SONAR20 は今も使えますか？',
        answer:
          'はい。2026年10月29日のテストでは、SONAR20はHostingerのグローバルサイトで48か月のStartupプランを20%オフにしました。最新のテスト日はこのページの上部にあります。',
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
          'はい。2026年10月29日のテストでは、SONAR20の20%は、カートにすでに表示されていたブラックフライデー価格から割り引かれました。',
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
      '可疊加在 Hostinger 的黑色星期五價格上（在 2026 年 10 月 29 日的測試中，20% 是在特價上再打折）；與其他優惠碼併用尚未測試',
    aboutBrand:
      'Hostinger 是一家網站主機公司，提供主機方案、網站建置工具、VPS、網域與電子郵件。Em Casa com Cecília 自 2024 年起以 Node.js 應用程式架設在 Hostinger 上。SONAR20 是合作優惠碼：所有方案享 20% 折扣，新客與既有客戶皆可使用。',
    brandLogoAlt: 'Hostinger 標誌',
    faqs: [
      {
        question: 'Hostinger 優惠碼 SONAR20 現在還能用嗎？',
        answer:
          '可以。在 2026 年 10 月 29 日的測試中，SONAR20 在 Hostinger 全球網站為 48 個月期的 Startup 方案打了 20% 折扣。最近一次測試日期在本頁頂端。',
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
          '可以。在 2026 年 10 月 29 日的測試中，SONAR20 的 20% 是疊加在購物車裡已顯示的黑色星期五價格上。',
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
      '可叠加在 Hostinger 的黑色星期五价格上（在 2026 年 10 月 29 日的测试中，20% 是在促销价基础上再打折）；与其他优惠码叠加尚未测试',
    aboutBrand:
      'Hostinger 是一家网站主机公司，提供主机套餐、建站工具、VPS、域名和电子邮箱。Em Casa com Cecília 自 2024 年起以 Node.js 应用运行在 Hostinger 上。SONAR20 是合作优惠码：所有套餐享 20% 折扣，新客户和现有客户均可使用。',
    brandLogoAlt: 'Hostinger 标志',
    faqs: [
      {
        question: 'Hostinger 优惠码 SONAR20 现在还能用吗？',
        answer:
          '可以。在 2026 年 10 月 29 日的测试中，SONAR20 在 Hostinger 全球网站为 48 个月期的 Startup 套餐打了 20% 折扣。最近一次测试日期在本页顶部。',
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
          '可以。在 2026 年 10 月 29 日的测试中，SONAR20 的 20% 是叠加在购物车里已显示的黑色星期五价格上。',
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
  relatedContent: 'drop',
  monthlyHighlight: 'translate',
  affiliateAccountId: 'pt',
  referral: 'pt',
  code: 'pt',
  discountNumber: 'pt',
  testedAt: 'pt',
  testNote: 'translate',
  codeKind: 'pt',
  codeFieldLabel: 'translate',
  codeInstructions: 'translate',
  history: 'drop',
  tiers: 'drop',
  // O aviso do código com prazo só existe em PT.
  limitedCodes: 'drop',
} as const satisfies Record<keyof CouponCodeOffer, 'pt' | 'translate' | 'drop'>;

// Os campos que vêm da tradução; cada um precisa existir em CodeOfferTranslation (o Pick de localizeCoupon
// quebra o typecheck se não existir).
type TranslatedCodeField = {
  [K in keyof typeof CODE_FIELD_POLICY]: (typeof CODE_FIELD_POLICY)[K] extends 'translate' ? K : never;
}[keyof typeof CODE_FIELD_POLICY];

// offerMode tem de ser o do cupom em PT. offerUrl é o link principal das páginas em outros idiomas;
// sem ele, vale o do cupom em PT.
export type CouponTranslation =
  | { offerMode: 'affiliate-link'; offerUrl?: string; locales: Record<TranslatedLocale, AffiliateOfferTranslation> }
  | { offerMode: 'discount-code'; offerUrl?: string; locales: Record<TranslatedLocale, CodeOfferTranslation> };

const COUPON_TRANSLATIONS: Record<string, CouponTranslation> = {
  shein: {
    // Link neutro (sem br.) gerado pelo Bruno no painel da SHEIN em 05/10/2026; o PT segue no link
    // brasileiro do código 4CW5Y. Não conferir clicando: o clique registra atribuição.
    offerMode: 'affiliate-link',
    offerUrl: 'https://onelink.shein.com/55/6463grgxf6ru',
    locales: SHEIN_TRANSLATIONS,
  },
  hostinger: {
    // O SONAR20 no site internacional (em inglês): o link de indicação leva o mesmo código. O PT segue no /br, e
    // o testNote daqui só cita o teste do site global.
    offerMode: 'discount-code',
    offerUrl: 'https://www.hostinger.com/?REFERRALCODE=SONAR20',
    locales: HOSTINGER_TRANSLATIONS,
  },
};

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

export function getLocalizedCoupon(slug: string, locale: TranslatedLocale): Coupon | undefined {
  const coupon = getCouponBySlug(slug);
  const translation = COUPON_TRANSLATIONS[slug];
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
    return { ...coupon, ...translation.locales[locale], ...shared, monthlyHighlight: undefined };
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
