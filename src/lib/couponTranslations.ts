import {
  getCouponBySlug,
  type Coupon,
  type CouponCampaign,
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
  // Na mesma ordem de campaigns no cupom em PT.
  campaigns?: Pick<CouponCampaign, 'title' | 'description' | 'eligibility'>[];
};

export type AffiliateOfferTranslation = OfferTranslationBase & {
  offerTypeLabel: string;
  offerTypeLabelPlural: string;
  offerActionLabel: string;
  linkInstructions: string[];
  linkNote: string;
};

// Loja de código. Sem os campos opcionais, a página usa os textos padrão do idioma
// (couponStoreCopy): "cupom", os passos, o campo do checkout e "Conferido em" no lugar de
// "Cupom testado em".
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

// O código de indicação e as campanhas são da SHEIN Brasil; fora do PT a página avisa isso e não
// põe os 50% de novos usuários no título de busca.
const SHEIN_TRANSLATIONS: Record<TranslatedLocale, AffiliateOfferTranslation> = {
  en: {
    discount: 'Current campaigns',
    offerTypeLabel: 'offer',
    offerTypeLabelPlural: 'offers',
    offerActionLabel: 'See offers on SHEIN',
    category: 'Fashion, accessories, beauty and home',
    shortDescription: 'main link, referral code and current campaigns',
    longDescription:
      "Open SHEIN through Cecília's main link, check the referral code 4CW5Y and see the confirmed campaigns for selected products and new users. The referral code and the campaigns are from SHEIN Brazil.",
    metaTitle: 'SHEIN referral code 4CW5Y and current campaigns',
    metaDescription:
      "Open SHEIN through Cecília's link, search 4CW5Y in the app and see the current campaigns for selected products and new users.",
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
          '4CW5Y is the referral code provided through the partnership. Search the code in the SHEIN app and check the conditions shown for your account; we do not present it as a fixed percentage discount.',
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
      'To use the referral code, search 4CW5Y in the SHEIN app.',
      'For a specific campaign, use the search code or the matching button on this page.',
      'Check eligibility, products and deadlines directly on SHEIN.',
      'Check the final price before completing your purchase.',
    ],
    linkNote:
      'The main link opens SHEIN; referral and campaign codes are searched in the app. The codes on this page come from SHEIN Brazil and may not work in your country. Check the conditions shown for your account before paying.',
    referral: {
      label: "Cecília's referral code",
      instructions: 'Search 4CW5Y in the SHEIN app and check the conditions shown for your account.',
    },
    campaigns: [
      {
        title: 'Selected products',
        description: 'Selected products with limited-time discounts.',
        eligibility: 'Check the items and conditions shown by SHEIN.',
      },
      {
        title: '50% for new users',
        description: 'Campaign with a 50% coupon for new users only.',
        eligibility: 'Eligible new users only, as validated by SHEIN.',
      },
    ],
  },
  es: {
    discount: 'Campañas vigentes',
    offerTypeLabel: 'oferta',
    offerTypeLabelPlural: 'ofertas',
    offerActionLabel: 'Ver ofertas en SHEIN',
    category: 'Moda, accesorios, belleza y hogar',
    shortDescription: 'enlace principal, código de referido y campañas vigentes',
    longDescription:
      'Entra en SHEIN con el enlace principal de Cecília, consulta el código de referido 4CW5Y y mira las campañas confirmadas para productos seleccionados y nuevos usuarios. El código de referido y las campañas son de SHEIN Brasil.',
    metaTitle: 'SHEIN: código de referido 4CW5Y y campañas vigentes',
    metaDescription:
      'Entra en SHEIN con el enlace de Cecília, busca 4CW5Y en la app y consulta las campañas vigentes para productos seleccionados y nuevos usuarios.',
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
          '4CW5Y es el código de referido facilitado por la colaboración. Búscalo en la app de SHEIN y consulta las condiciones que se muestran para tu cuenta; no lo presentamos como un porcentaje fijo de descuento.',
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
      'Para usar el código de referido, busca 4CW5Y en la app de SHEIN.',
      'Para una campaña concreta, usa el código de búsqueda o el botón correspondiente de esta página.',
      'Consulta la elegibilidad, los productos y el plazo directamente en SHEIN.',
      'Comprueba el precio final antes de completar la compra.',
    ],
    linkNote:
      'El enlace principal abre SHEIN; los códigos de referido y de campaña se buscan en la app. Los códigos de esta página son de SHEIN Brasil y puede que no funcionen en tu país. Comprueba las condiciones que se muestran para tu cuenta antes de pagar.',
    referral: {
      label: 'Código de referido de Cecília',
      instructions: 'Busca 4CW5Y en la app de SHEIN y consulta las condiciones que se muestran para tu cuenta.',
    },
    campaigns: [
      {
        title: 'Productos seleccionados',
        description: 'Productos seleccionados con descuentos por tiempo limitado.',
        eligibility: 'Consulta los artículos y las condiciones que muestra SHEIN.',
      },
      {
        title: '50% para nuevos usuarios',
        description: 'Campaña con cupón del 50% solo para nuevos usuarios.',
        eligibility: 'Solo nuevos usuarios elegibles, según la validación de SHEIN.',
      },
    ],
  },
  fr: {
    discount: 'Campagnes en cours',
    offerTypeLabel: 'offre',
    offerTypeLabelPlural: 'offres',
    offerActionLabel: 'Voir les offres SHEIN',
    category: 'Mode, accessoires, beauté et maison',
    shortDescription: 'lien principal, code de parrainage et campagnes en cours',
    longDescription:
      'Accédez à SHEIN via le lien principal de Cecília, consultez le code de parrainage 4CW5Y et découvrez les campagnes confirmées pour une sélection de produits et pour les nouveaux utilisateurs. Le code de parrainage et les campagnes proviennent de SHEIN Brésil.',
    metaTitle: `SHEIN${NBSP}: code de parrainage 4CW5Y et campagnes en cours`,
    metaDescription:
      "Accédez à SHEIN via le lien de Cecília, recherchez 4CW5Y dans l'appli et consultez les campagnes en cours pour une sélection de produits et pour les nouveaux utilisateurs.",
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
        answer: `4CW5Y est le code de parrainage fourni par le partenariat. Recherchez-le dans l'appli SHEIN et vérifiez les conditions affichées pour votre compte${NBSP}; nous ne le présentons pas comme une réduction d'un pourcentage fixe.`,
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
      "Pour utiliser le code de parrainage, recherchez 4CW5Y dans l'appli SHEIN.",
      'Pour une campagne précise, utilisez le code de recherche ou le bouton correspondant sur cette page.',
      "Vérifiez l'éligibilité, les produits et les délais directement sur SHEIN.",
      "Vérifiez le prix final avant de finaliser l'achat.",
    ],
    linkNote: `Le lien principal ouvre SHEIN${NBSP}; les codes de parrainage et de campagne se recherchent dans l'appli. Les codes de cette page proviennent de SHEIN Brésil et peuvent ne pas fonctionner dans votre pays. Vérifiez les conditions affichées pour votre compte avant de payer.`,
    referral: {
      label: 'Code de parrainage de Cecília',
      instructions: "Recherchez 4CW5Y dans l'appli SHEIN et vérifiez les conditions affichées pour votre compte.",
    },
    campaigns: [
      {
        title: 'Sélection de produits',
        description: 'Une sélection de produits avec des réductions limitées dans le temps.',
        eligibility: 'Consultez les articles et les conditions affichés par SHEIN.',
      },
      {
        title: `50${NBSP}% pour les nouveaux utilisateurs`,
        description: `Campagne avec un bon de réduction de 50${NBSP}% réservé aux nouveaux utilisateurs.`,
        eligibility: 'Uniquement pour les nouveaux utilisateurs éligibles, selon la validation de SHEIN.',
      },
    ],
  },
  de: {
    discount: 'Aktuelle Aktionen',
    offerTypeLabel: 'Angebot',
    offerTypeLabelPlural: 'Angebote',
    offerActionLabel: 'Angebote bei SHEIN ansehen',
    category: 'Mode, Accessoires, Beauty und Wohnen',
    shortDescription: 'Hauptlink, Empfehlungscode und aktuelle Aktionen',
    longDescription:
      'Öffne SHEIN über Cecílias Hauptlink, sieh dir den Empfehlungscode 4CW5Y an und entdecke die bestätigten Aktionen für ausgewählte Produkte und Neukunden. Empfehlungscode und Aktionen stammen von SHEIN Brasilien.',
    metaTitle: 'SHEIN: Empfehlungscode 4CW5Y und aktuelle Aktionen',
    metaDescription:
      'Öffne SHEIN über Cecílias Link, suche in der App nach 4CW5Y und sieh dir die aktuellen Aktionen für ausgewählte Produkte und Neukunden an.',
    eligibleCategories: 'Mode, Accessoires, Beauty, Wohnen und weitere Kategorien, die in der jeweiligen Aktion gelten',
    validity: 'Links und Aktionen können sich ändern; prüfe die Bedingungen, die SHEIN anzeigt',
    reusable: 'Nach den Regeln, die SHEIN für die jeweilige Aktion angibt',
    shipping: 'Berechnet von SHEIN je nach Adresse, Produkten und Aktion',
    combinable: 'Kann je nach Aktion, Konto und Produkt variieren; prüfe den Endpreis vor dem Bezahlen',
    aboutBrand:
      'SHEIN ist eine internationale Plattform für Mode, Accessoires, Beauty und Wohnartikel. Diese Seite bündelt Cecílias Hauptlink, den Empfehlungscode aus der Partnerschaft und Aktionen, die sich mit der Zeit ändern können. Links zu einzelnen Produkten gehören in Haul-Artikel und Tests, weil Verfügbarkeit, Preis und Bestand von Teil zu Teil variieren. Käufe über die angegebenen Links können Em Casa com Cecília eine Provision einbringen – ohne Mehrkosten für dich.',
    brandLogoAlt: 'SHEIN-Logo',
    faqs: [
      {
        question: 'Ist 4CW5Y ein SHEIN-Gutscheincode?',
        answer:
          '4CW5Y ist der Empfehlungscode aus der Partnerschaft. Suche den Code in der SHEIN-App und prüfe die Bedingungen, die für dein Konto angezeigt werden; wir stellen ihn nicht als festen prozentualen Rabatt dar.',
      },
      {
        question: 'Was ist der Code 37S3442 bei SHEIN?',
        answer:
          '37S3442 ist der Suchcode der aktuellen Aktion für ausgewählte Produkte. Die Rabatte sind zeitlich begrenzt und können je nach Artikel variieren.',
      },
      {
        question: 'Wer kann den Code K49L457 nutzen?',
        answer:
          'Die Aktion K49L457 bewirbt einen 50-%-Gutschein nur für Neukunden. Ob du berechtigt bist und wie hoch der Rabatt am Ende ist, bestätigt SHEIN im Konto und an der Kasse.',
      },
      {
        question: 'Sind die SHEIN-Links und -Codes dauerhaft gültig?',
        answer:
          'Nein. Der Hauptlink und die Aktionen werden erneut geprüft, aber SHEIN kann Links neu ausgeben, Aktionen beenden oder Bedingungen ändern. Das Prüfdatum auf dieser Seite zeigt, wann die Angaben zuletzt kontrolliert wurden.',
      },
      {
        question: 'Bekommt Cecília eine Provision, wenn ich über die Links kaufe?',
        answer:
          'Das ist möglich. SHEIN kann Em Casa com Cecília eine Provision für Käufe zahlen, die den Partnerlinks zugeordnet werden – ohne Mehrkosten für dich.',
      },
    ],
    linkInstructions: [
      'Öffne SHEIN über Cecílias Hauptlink.',
      'Für den Empfehlungscode suchst du in der SHEIN-App nach 4CW5Y.',
      'Für eine bestimmte Aktion nutzt du den Suchcode oder den passenden Button auf dieser Seite.',
      'Prüfe Berechtigung, Produkte und Laufzeit direkt bei SHEIN.',
      'Prüfe den Endpreis, bevor du den Kauf abschließt.',
    ],
    linkNote:
      'Der Hauptlink öffnet SHEIN; Empfehlungs- und Aktionscodes suchst du in der App. Die Codes auf dieser Seite stammen von SHEIN Brasilien und funktionieren in deinem Land möglicherweise nicht. Prüfe vor dem Bezahlen die Bedingungen, die für dein Konto angezeigt werden.',
    referral: {
      label: 'Cecílias Empfehlungscode',
      instructions: 'Suche in der SHEIN-App nach 4CW5Y und prüfe die Bedingungen, die für dein Konto angezeigt werden.',
    },
    campaigns: [
      {
        title: 'Ausgewählte Produkte',
        description: 'Ausgewählte Produkte mit zeitlich begrenzten Rabatten.',
        eligibility: 'Sieh dir die Artikel und Bedingungen an, die SHEIN anzeigt.',
      },
      {
        title: `50${NBSP}% für Neukunden`,
        description: 'Aktion mit einem 50-%-Gutschein nur für Neukunden.',
        eligibility: 'Nur berechtigte Neukunden, nach Prüfung durch SHEIN.',
      },
    ],
  },
  it: {
    discount: 'Campagne in corso',
    offerTypeLabel: 'offerta',
    offerTypeLabelPlural: 'offerte',
    offerActionLabel: 'Vedi le offerte SHEIN',
    category: 'Moda, accessori, bellezza e casa',
    shortDescription: 'link principale, codice invito e campagne in corso',
    longDescription:
      'Apri SHEIN con il link principale di Cecília, consulta il codice invito 4CW5Y e scopri le campagne confermate per prodotti selezionati e nuovi utenti. Il codice invito e le campagne sono di SHEIN Brasile.',
    metaTitle: 'SHEIN: codice invito 4CW5Y e campagne in corso',
    metaDescription:
      "Apri SHEIN con il link di Cecília, cerca 4CW5Y nell'app e scopri le campagne in corso per prodotti selezionati e nuovi utenti.",
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
          "4CW5Y è il codice invito fornito dalla collaborazione. Cercalo nell'app SHEIN e controlla le condizioni mostrate per il tuo account; non lo presentiamo come uno sconto percentuale fisso.",
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
      "Per usare il codice invito, cerca 4CW5Y nell'app SHEIN.",
      'Per una campagna specifica, usa il codice di ricerca o il pulsante corrispondente in questa pagina.',
      'Controlla idoneità, prodotti e scadenze direttamente su SHEIN.',
      "Verifica il prezzo finale prima di completare l'acquisto.",
    ],
    linkNote:
      "Il link principale apre SHEIN; i codici invito e di campagna si cercano nell'app. I codici di questa pagina sono di SHEIN Brasile e potrebbero non funzionare nel tuo paese. Controlla le condizioni mostrate per il tuo account prima di pagare.",
    referral: {
      label: 'Codice invito di Cecília',
      instructions: "Cerca 4CW5Y nell'app SHEIN e controlla le condizioni mostrate per il tuo account.",
    },
    campaigns: [
      {
        title: 'Prodotti selezionati',
        description: 'Prodotti selezionati con sconti a tempo limitato.',
        eligibility: 'Controlla gli articoli e le condizioni mostrati da SHEIN.',
      },
      {
        title: '50% per i nuovi utenti',
        description: 'Campagna con coupon del 50% solo per i nuovi utenti.',
        eligibility: 'Solo nuovi utenti idonei, secondo la verifica di SHEIN.',
      },
    ],
  },
  ko: {
    discount: '진행 중인 캠페인',
    offerTypeLabel: '혜택',
    offerTypeLabelPlural: '혜택',
    offerActionLabel: 'SHEIN 혜택 보기',
    category: '패션, 액세서리, 뷰티, 홈',
    shortDescription: '메인 링크, 추천 코드, 진행 중인 캠페인',
    longDescription:
      'Cecília의 메인 링크로 SHEIN에 접속해 추천 코드 4CW5Y와 일부 상품·신규 회원 대상으로 확인된 캠페인을 살펴보세요. 추천 코드와 캠페인은 SHEIN 브라질 기준입니다.',
    metaTitle: 'SHEIN 추천 코드 4CW5Y와 진행 중인 캠페인',
    metaDescription:
      'Cecília의 링크로 SHEIN에 접속해 앱에서 4CW5Y를 검색하고, 일부 상품과 신규 회원 대상 캠페인을 확인하세요.',
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
          '4CW5Y는 파트너십에서 제공한 추천 코드입니다. SHEIN 앱에서 코드를 검색하고 내 계정에 표시되는 조건을 확인하세요. 이 코드를 고정 할인율로 안내하지는 않습니다.',
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
      '추천 코드를 사용하려면 SHEIN 앱에서 4CW5Y를 검색하세요.',
      '특정 캠페인은 이 페이지의 검색 코드나 해당 버튼을 이용하세요.',
      '대상 여부, 상품, 기간은 SHEIN에서 직접 확인하세요.',
      '구매를 완료하기 전에 최종 금액을 확인하세요.',
    ],
    linkNote:
      '메인 링크는 SHEIN으로 연결되며, 추천 코드와 캠페인 코드는 앱에서 검색합니다. 이 페이지의 코드는 SHEIN 브라질 기준이라 다른 국가에서는 적용되지 않을 수 있습니다. 결제 전에 내 계정에 표시되는 조건을 확인하세요.',
    referral: {
      label: 'Cecília의 추천 코드',
      instructions: 'SHEIN 앱에서 4CW5Y를 검색하고 내 계정에 표시되는 조건을 확인하세요.',
    },
    campaigns: [
      {
        title: '일부 상품',
        description: '일부 상품 대상 기간 한정 할인입니다.',
        eligibility: 'SHEIN에 표시된 상품과 조건을 확인하세요.',
      },
      {
        title: '신규 회원 50%',
        description: '신규 회원만 받을 수 있는 50% 쿠폰 캠페인입니다.',
        eligibility: 'SHEIN 확인을 거친 신규 회원만 해당됩니다.',
      },
    ],
  },
  ja: {
    discount: '開催中のキャンペーン',
    offerTypeLabel: 'オファー',
    offerTypeLabelPlural: 'オファー',
    offerActionLabel: 'SHEIN のオファーを見る',
    category: 'ファッション、アクセサリー、コスメ、インテリア',
    shortDescription: 'メインリンク、紹介コード、開催中のキャンペーン',
    longDescription:
      'Cecília のメインリンクから SHEIN を開き、紹介コード 4CW5Y と、対象商品・新規ユーザー向けに確認済みのキャンペーンをチェックできます。紹介コードとキャンペーンは SHEIN ブラジルのものです。',
    metaTitle: 'SHEIN の紹介コード 4CW5Y と開催中のキャンペーン',
    metaDescription:
      'Cecília のリンクから SHEIN を開き、アプリで 4CW5Y を検索して、対象商品と新規ユーザー向けの開催中キャンペーンを確認できます。',
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
          '4CW5Y はパートナーシップで提供された紹介コードです。SHEIN アプリでコードを検索し、ご自身のアカウントに表示される条件をご確認ください。このコードを固定の割引率としては案内していません。',
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
      '紹介コードを使うには、SHEIN アプリで 4CW5Y を検索します。',
      '特定のキャンペーンは、このページの検索コードか対応するボタンを使います。',
      '対象条件・商品・期間は SHEIN で直接確認します。',
      '購入を確定する前に最終金額を確認します。',
    ],
    linkNote:
      'メインリンクは SHEIN を開きます。紹介コードとキャンペーンコードはアプリで検索します。このページのコードは SHEIN ブラジルのもので、お住まいの国では使えない場合があります。お支払い前に、ご自身のアカウントに表示される条件をご確認ください。',
    referral: {
      label: 'Cecília の紹介コード',
      instructions: 'SHEIN アプリで 4CW5Y を検索し、ご自身のアカウントに表示される条件をご確認ください。',
    },
    campaigns: [
      {
        title: '対象商品',
        description: '対象商品の期間限定割引です。',
        eligibility: 'SHEIN に表示される商品と条件をご確認ください。',
      },
      {
        title: '新規ユーザー50%',
        description: '新規ユーザー限定の50%クーポンのキャンペーンです。',
        eligibility: 'SHEIN の確認を経た新規ユーザーのみが対象です。',
      },
    ],
  },
  'zh-hant': {
    discount: '進行中的活動',
    offerTypeLabel: '優惠',
    offerTypeLabelPlural: '優惠',
    offerActionLabel: '查看 SHEIN 優惠',
    category: '時裝、配飾、美妝及家居',
    shortDescription: '主要連結、推薦碼及進行中的活動',
    longDescription:
      '透過 Cecília 的主要連結前往 SHEIN，查看推薦碼 4CW5Y，以及已確認的指定商品及新用戶活動。推薦碼及活動均來自 SHEIN 巴西站。',
    metaTitle: 'SHEIN 推薦碼 4CW5Y 及進行中的活動',
    metaDescription: '透過 Cecília 的連結前往 SHEIN，在 App 搜尋 4CW5Y，並查看指定商品及新用戶的進行中活動。',
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
          '4CW5Y 是合作提供的推薦碼。請在 SHEIN App 搜尋此代碼，並查看你的帳戶顯示的條件；我們不會把它當作固定百分比的折扣。',
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
      '如要使用推薦碼，請在 SHEIN App 搜尋 4CW5Y。',
      '如要參加指定活動，請使用此頁面的搜尋代碼或相應按鈕。',
      '請直接在 SHEIN 查看資格、商品及期限。',
      '完成購買前請確認最終金額。',
    ],
    linkNote:
      '主要連結會開啟 SHEIN；推薦碼及活動代碼需在 App 內搜尋。此頁面的代碼來自 SHEIN 巴西站，在你所在的國家或地區未必適用。付款前請查看你的帳戶顯示的條件。',
    referral: {
      label: 'Cecília 的推薦碼',
      instructions: '請在 SHEIN App 搜尋 4CW5Y，並查看你的帳戶顯示的條件。',
    },
    campaigns: [
      {
        title: '指定商品',
        description: '指定商品限時折扣。',
        eligibility: '請查看 SHEIN 顯示的商品及條件。',
      },
      {
        title: '新用戶 50% 優惠',
        description: '只限新用戶的 50% 優惠券活動。',
        eligibility: '只限經 SHEIN 確認的合資格新用戶。',
      },
    ],
  },
  'zh-hans': {
    discount: '进行中的活动',
    offerTypeLabel: '优惠',
    offerTypeLabelPlural: '优惠',
    offerActionLabel: '查看 SHEIN 优惠',
    category: '服饰、配饰、美妆和家居',
    shortDescription: '主链接、推荐码和进行中的活动',
    longDescription:
      '通过 Cecília 的主链接打开 SHEIN，查看推荐码 4CW5Y，以及已确认的指定商品和新用户活动。推荐码和活动均来自 SHEIN 巴西站。',
    metaTitle: 'SHEIN 推荐码 4CW5Y 和进行中的活动',
    metaDescription: '通过 Cecília 的链接打开 SHEIN，在 App 中搜索 4CW5Y，查看指定商品和新用户的进行中活动。',
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
        answer: '4CW5Y 是合作提供的推荐码。请在 SHEIN App 中搜索该代码，并查看你的账户显示的条件；我们不会把它当作固定比例的折扣。',
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
      '如需使用推荐码，请在 SHEIN App 中搜索 4CW5Y。',
      '如需参加指定活动，请使用本页的搜索代码或对应按钮。',
      '请直接在 SHEIN 查看资格、商品和期限。',
      '完成购买前请确认最终金额。',
    ],
    linkNote: '主链接会打开 SHEIN；推荐码和活动代码需在 App 内搜索。本页的代码来自 SHEIN 巴西站，在你所在的国家或地区不一定适用。付款前请查看你的账户显示的条件。',
    referral: {
      label: 'Cecília 的推荐码',
      instructions: '请在 SHEIN App 中搜索 4CW5Y，并查看你的账户显示的条件。',
    },
    campaigns: [
      {
        title: '指定商品',
        description: '指定商品限时折扣。',
        eligibility: '请查看 SHEIN 显示的商品和条件。',
      },
      {
        title: '新用户 50% 优惠',
        description: '仅限新用户的 50% 优惠券活动。',
        eligibility: '仅限经 SHEIN 确认的符合条件的新用户。',
      },
    ],
  },
};

// Indicação sem código para digitar: os 20% valem só no primeiro período de plano novo e não somam
// com outros cupons, como no PT.
const HOSTINGER_TRANSLATIONS: Record<TranslatedLocale, AffiliateOfferTranslation> = {
  en: {
    discount: '20% off',
    offerTypeLabel: 'referral',
    offerTypeLabelPlural: 'referrals',
    offerActionLabel: 'Click to get 20% OFF the plans',
    category: 'Web hosting and domains',
    shortDescription:
      'first term of a new plan of 12 months or more, with the discount already in the link',
    longDescription:
      "Hostinger's referral link takes 20% off the first term of a new plan of 12 months or longer, applied at checkout with nothing to type: web hosting, VPS, business email or the AI agent plans (OpenClaw). On the 1-month term the Premium and Unlimited web hosting plans show no referral discount (only the Startup plan still did), renewals are at the regular price and it does not stack with other coupons. Em Casa com Cecília has run on Hostinger since 2024; link checked on October 24, 2026.",
    metaTitle:
      'Hostinger Referral Link 2026: 20% Off, No Code Needed',
    metaDescription:
      "Yes, Hostinger's 20% referral discount is real: open the link and the first term of a 12-month or longer plan drops 20%. No code. Checked Oct 2026.",
    eligibleCategories:
      'First term of a new Hostinger plan of 12 months or more: web hosting, VPS, email and the AI agent plans',
    validity: 'Referral active while the Hostinger referral program is running',
    reusable: 'Does not apply: the discount comes from the link, not from a coupon',
    shipping: 'Does not apply',
    combinable:
      'Does not stack with other coupons: according to Hostinger, the referral link price is already the best it offers through it',
    aboutBrand:
      'Hostinger is a web hosting company offering hosting plans, a website builder, VPS, domains and email. Em Casa com Cecília has run on Hostinger since 2024, as a Node.js app. The link on this page is a referral: it opens Hostinger with 20% off the first term of a new plan of 12 months or more, with no coupon code to enter.',
    brandLogoAlt: 'Hostinger logo',
    faqs: [
      {
        question: 'Do I need a Hostinger referral code or coupon?',
        answer:
          'No. Through the link on this page the referral discount is already applied at checkout, with nothing to type. It is a referral, not a coupon.',
      },
      {
        question: 'Is the Hostinger 20% referral discount real?',
        answer:
          'Yes. Hostinger’s terms say “up to 20%”; on the plans we checked through this link in October 2026 (web hosting on 12- and 48-month terms, VPS KVM and the AI agent plans), the price showed 20% off the first term.',
      },
      {
        question: 'Does the referral discount work on 1-month plans?',
        answer:
          'Not on the main web hosting plans. On October 24, 2026, Premium and Unlimited showed the referral applied on the 12- and 48-month terms and not on the 1-month term; the Startup plan was the only one that still showed it on 1 month. Choose a term of 12 months or more to be sure of the 20%.',
      },
      {
        question: 'Does the 20% work on VPS, email and AI agents?',
        answer:
          'Hostinger lists them as eligible. We saw the 20% on the first term of VPS KVM and the AI agent plans on the 24-month term; we did not check email or the shorter terms. Domains are not part of the referral.',
      },
      {
        question: 'Does the discount apply to renewals?',
        answer:
          'No. The 20% only applies to the first term. After that, the plan renews at the regular price Hostinger shows under each plan card, and you can switch terms or cancel before the renewal.',
      },
      {
        question: 'Does the referral discount stack with another Hostinger coupon?',
        answer:
          'No. Hostinger states that the referral link price is already the best it offers through it, and other coupons do not stack.',
      },
      {
        question: 'Does the discount apply to existing Hostinger customers?',
        answer:
          'It applies to a new plan bought through the link. Plans you already have and past purchases do not get the discount.',
      },
      {
        question: 'Does Em Casa com Cecília use Hostinger?',
        answer:
          'Yes. The site has run on Hostinger since 2024, as a Node.js app.',
      },
      {
        question: 'Does buying through the link support Em Casa com Cecília?',
        answer:
          'Yes, a purchase through the referral may earn Em Casa com Cecília a credit, at no extra cost to you.',
      },
    ],
    linkInstructions: [
      'Open Hostinger through the button: the prices on the page already include the referral discount.',
      'Choose the plan and a term of 12 months or more, then go to the cart through the same link.',
      'There is no coupon code to enter: the discount is already tied to the link.',
      'Check the first-term price and the renewal price in the cart before paying.',
    ],
    linkNote:
      'The 20% only applies to the first term of a new plan of 12 months or more: renewals are charged at the regular plan price, and the discount does not apply to past purchases.',
  },
  es: {
    discount: '20% de descuento',
    offerTypeLabel: 'referido',
    offerTypeLabelPlural: 'referidos',
    offerActionLabel: 'Haz clic y obtén 20% OFF en los planes',
    category: 'Hosting web y dominios',
    shortDescription: 'primer período de un plan nuevo de 12 meses o más, con el descuento ya incluido en el enlace',
    longDescription:
      'El enlace de referido de Hostinger da un 20% de descuento en el primer período de un plan nuevo de 12 meses o más, aplicado al pagar sin tener que escribir nada: hosting web, VPS, correo empresarial o los planes de agentes de IA (OpenClaw). En el período de 1 mes, los planes Premium y Unlimited de hosting web no muestran descuento por referido (solo el Startup aún lo mostró); las renovaciones se cobran al precio normal y no se acumulan con otros cupones. Em Casa com Cecília está alojado en Hostinger desde 2024; enlace revisado el 24 de octubre de 2026.',
    metaTitle: 'Descuento Hostinger: 20% con el enlace, sin código',
    metaDescription:
      'El 20% por referido de Hostinger es real: el primer período de un plan de 12 meses o más baja un 20% con el enlace. Sin código. Revisado oct. 2026.',
    eligibleCategories: 'Primer período de un plan nuevo de Hostinger de 12 meses o más: hosting web, VPS, correo y planes de agentes de IA',
    validity: 'Referido activo mientras el programa de referidos de Hostinger esté vigente',
    reusable: 'No aplica: el descuento viene del enlace, no de un cupón',
    shipping: 'No aplica',
    combinable:
      'No se acumula con otros cupones: según Hostinger, el precio del enlace de referido ya es el mejor que ofrece con él',
    aboutBrand:
      'Hostinger es una empresa de hosting web, con planes de hosting, creador de sitios web, VPS, dominios y correo electrónico. Em Casa com Cecília está alojado en Hostinger desde 2024, como aplicación Node.js. El enlace de esta página es un enlace de referido: abre Hostinger con un 20% de descuento en el primer período de un plan nuevo de 12 meses o más, sin cupón que introducir.',
    brandLogoAlt: 'Logotipo de Hostinger',
    faqs: [
      {
        question: '¿Hace falta un código de referido o cupón de Hostinger?',
        answer:
          'No. Con el enlace de esta página, el descuento por referido ya se aplica en la compra, sin nada que escribir. Es un enlace de referido, no un cupón.',
      },
      {
        question: '¿El 20% de descuento de Hostinger por referido es real?',
        answer:
          'Sí. Las condiciones de Hostinger dicen «hasta 20%»; en los planes que revisamos por este enlace en octubre de 2026 (hosting web a 12 y 48 meses, VPS KVM y los planes de agentes de IA), el precio mostró un 20% de descuento en el primer período.',
      },
      {
        question: '¿El descuento por referido funciona en planes de 1 mes?',
        answer:
          'No en los planes principales de hosting web. El 24 de octubre de 2026, Premium y Unlimited mostraron el referido aplicado en los períodos de 12 y 48 meses, y no en el de 1 mes; el plan Startup fue el único que aún lo mostró en 1 mes. Elige un período de 12 meses o más para estar seguro del 20%.',
      },
      {
        question: '¿El 20% funciona en VPS, correo y agentes de IA?',
        answer:
          'Hostinger los lista como elegibles. Vimos el 20% en el primer período del VPS KVM y de los planes de agentes de IA en el período de 24 meses; no comprobamos el correo ni los períodos más cortos. Los dominios no entran en el programa de referidos.',
      },
      {
        question: '¿El descuento vale en la renovación del plan?',
        answer:
          'No. El 20% solo vale en el primer período. Después, el plan se renueva al precio estándar que Hostinger muestra debajo de cada plan, y puedes cambiar el período o cancelar antes de la renovación.',
      },
      {
        question: '¿El descuento por referido se acumula con otro cupón de Hostinger?',
        answer:
          'No. Hostinger indica que el precio del enlace de referido ya es el mejor que ofrece con él, y los demás cupones no se acumulan.',
      },
      {
        question: '¿El descuento vale para quien ya es cliente de Hostinger?',
        answer:
          'Vale para un plan nuevo comprado con el enlace. Los planes ya contratados y las compras ya hechas no reciben el descuento.',
      },
      {
        question: '¿Em Casa com Cecília usa Hostinger?',
        answer: 'Sí. El sitio está alojado en Hostinger desde 2024, como aplicación Node.js.',
      },
      {
        question: '¿Comprar con el enlace apoya a Em Casa com Cecília?',
        answer: 'Sí, la compra por el enlace de referido puede generar un crédito para Em Casa com Cecília, sin costo extra para ti.',
      },
    ],
    linkInstructions: [
      'Abre Hostinger con el botón indicado: los precios de la página ya aparecen con el descuento por referido.',
      'Elige el plan y un período de 12 meses o más, y sigue al carrito con el mismo enlace.',
      'No hace falta introducir ningún cupón: el descuento ya está vinculado al enlace.',
      'Revisa en el carrito el precio del primer período y el de la renovación antes de pagar.',
    ],
    linkNote:
      'El 20% solo vale en el primer período de un plan nuevo de 12 meses o más: la renovación se cobra al precio estándar del plan, y el descuento no vale en compras ya hechas.',
  },
  fr: {
    discount: `20${NBSP}% de réduction`,
    offerTypeLabel: 'parrainage',
    offerTypeLabelPlural: 'parrainages',
    offerActionLabel: 'Cliquez pour avoir 20 % de réduction sur les offres',
    category: 'Hébergement web et noms de domaine',
    shortDescription: 'première période d’une nouvelle offre de 12 mois ou plus, réduction déjà incluse dans le lien',
    longDescription: `Le lien de parrainage Hostinger accorde 20${NBSP}% de réduction sur la première période d’une nouvelle offre de 12 mois ou plus, appliquée au paiement sans rien à saisir${NBSP}: hébergement web, VPS, e-mail professionnel ou offres d’agents IA (OpenClaw). Sur la période d’un mois, les offres Premium et Unlimited d’hébergement web n’affichent pas de réduction de parrainage (seule l’offre Startup la montre encore), les renouvellements se font au prix normal et la réduction ne se cumule pas avec d’autres codes promo. Em Casa com Cecília est hébergé chez Hostinger depuis 2024${NBSP}; lien vérifié le 24 octobre 2026.`,
    metaTitle: `Réduction Hostinger${NBSP}: 20${NBSP}% avec le lien, sans code`,
    metaDescription: `Oui, la réduction Hostinger de 20${NBSP}% par parrainage est réelle${NBSP}: la première période d’une offre de 12 mois ou plus baisse de 20${NBSP}% via le lien. Sans code.`,
    eligibleCategories: `Première période d’une nouvelle offre Hostinger de 12 mois ou plus${NBSP}: hébergement web, VPS, e-mail et offres d’agents IA`,
    validity: 'Parrainage actif tant que le programme de parrainage de Hostinger est en vigueur',
    reusable: `Sans objet${NBSP}: la réduction vient du lien, pas d’un code promo`,
    shipping: 'Sans objet',
    combinable:
      `Ne se cumule pas avec d’autres codes promo${NBSP}: selon Hostinger, le prix du lien de parrainage est déjà le meilleur qu’elle propose par ce lien`,
    aboutBrand: `Hostinger est un hébergeur web qui propose des offres d’hébergement, un créateur de sites, des VPS, des noms de domaine et des e-mails. Em Casa com Cecília est hébergé chez Hostinger depuis 2024, en tant qu’application Node.js. Le lien de cette page est un parrainage${NBSP}: il ouvre Hostinger avec 20${NBSP}% de réduction sur la première période d’une nouvelle offre de 12 mois ou plus, sans code promo à saisir.`,
    brandLogoAlt: 'Logo Hostinger',
    faqs: [
      {
        question: `Faut-il un code promo ou de parrainage Hostinger${NBSP}?`,
        answer:
          'Non. Avec le lien de cette page, la réduction de parrainage est déjà appliquée au paiement, sans rien à saisir. C’est un parrainage, pas un code promo.',
      },
      {
        question: `La réduction Hostinger de 20${NBSP}% par parrainage est-elle réelle${NBSP}?`,
        answer: `Oui. Les conditions de Hostinger indiquent «${NBSP}jusqu’à 20${NBSP}%${NBSP}»${NBSP}; sur les offres vérifiées par ce lien en octobre 2026 (hébergement web sur des périodes de 12 et 48 mois, VPS KVM et offres d’agents IA), le prix affichait 20${NBSP}% de réduction sur la première période.`,
      },
      {
        question: `La réduction de parrainage vaut-elle pour les offres d’un mois${NBSP}?`,
        answer: `Pas sur les offres principales d’hébergement web. Le 24 octobre 2026, Premium et Unlimited affichaient le parrainage sur les périodes de 12 et 48 mois, et non sur celle d’un mois${NBSP}; l’offre Startup était la seule à l’afficher encore sur un mois. Choisissez une période de 12 mois ou plus pour être sûr des 20${NBSP}%.`,
      },
      {
        question: `Les 20${NBSP}% valent-ils pour le VPS, l’e-mail et les agents IA${NBSP}?`,
        answer:
          `Hostinger les liste comme éligibles. Nous avons vu les 20${NBSP}% sur la première période du VPS KVM et des offres d’agents IA sur la période de 24 mois${NBSP}; nous n’avons pas vérifié l’e-mail ni les périodes plus courtes. Les noms de domaine ne font pas partie du parrainage.`,
      },
      {
        question: `La réduction s’applique-t-elle au renouvellement${NBSP}?`,
        answer: `Non. Les 20${NBSP}% ne valent que pour la première période. Ensuite, l’offre est renouvelée au prix normal que Hostinger affiche sous chaque offre, et vous pouvez changer de période ou résilier avant le renouvellement.`,
      },
      {
        question: `La réduction du parrainage se cumule-t-elle avec un autre code promo Hostinger${NBSP}?`,
        answer:
          'Non. Hostinger indique que le prix du lien de parrainage est déjà le meilleur qu’elle propose par ce lien, et les autres codes promo ne se cumulent pas.',
      },
      {
        question: `La réduction vaut-elle pour les clients actuels de Hostinger${NBSP}?`,
        answer:
          'Elle vaut pour une nouvelle offre achetée par le lien. Les offres déjà souscrites et les achats déjà effectués n’en bénéficient pas.',
      },
      {
        question: `Em Casa com Cecília utilise-t-il Hostinger${NBSP}?`,
        answer: 'Oui. Le site est hébergé chez Hostinger depuis 2024, en tant qu’application Node.js.',
      },
      {
        question: `Acheter par le lien soutient-il Em Casa com Cecília${NBSP}?`,
        answer: 'Oui, un achat par le parrainage peut rapporter un crédit à Em Casa com Cecília, sans coût supplémentaire pour vous.',
      },
    ],
    linkInstructions: [
      `Ouvrez Hostinger avec le bouton indiqué${NBSP}: les prix de la page incluent déjà la réduction du parrainage.`,
      'Choisissez l’offre et une période de 12 mois ou plus, puis allez au panier par le même lien.',
      `Aucun code promo à saisir${NBSP}: la réduction est déjà liée au lien.`,
      'Vérifiez dans le panier le prix de la première période et celui du renouvellement avant de payer.',
    ],
    linkNote: `Les 20${NBSP}% ne valent que pour la première période d’une nouvelle offre de 12 mois ou plus${NBSP}: le renouvellement est facturé au prix normal de l’offre, et la réduction ne s’applique pas aux achats déjà effectués.`,
  },
  de: {
    discount: `20${NBSP}% Rabatt`,
    offerTypeLabel: 'Empfehlung',
    offerTypeLabelPlural: 'Empfehlungen',
    offerActionLabel: 'Klicken und 20 % Rabatt auf die Tarife sichern',
    category: 'Webhosting und Domains',
    shortDescription: 'erste Laufzeit eines neuen Tarifs ab 12 Monaten, Rabatt schon im Link',
    longDescription: `Der Hostinger-Empfehlungslink gewährt 20${NBSP}% Rabatt auf die erste Laufzeit eines neuen Tarifs mit 12 Monaten oder mehr, beim Bezahlen ohne etwas einzugeben: Webhosting, VPS, Business-E-Mail oder die KI-Agenten-Tarife (OpenClaw). Bei der Laufzeit von 1 Monat zeigen die Tarife Premium und Unlimited keinen Empfehlungsrabatt (nur der Tarif Startup zeigt ihn noch), Verlängerungen laufen zum regulären Preis, und er lässt sich nicht mit anderen Gutscheinen kombinieren. Em Casa com Cecília läuft seit 2024 bei Hostinger; Link geprüft am 24. Oktober 2026.`,
    metaTitle: `Hostinger-Rabatt: 20${NBSP}% über den Link, ohne Code`,
    metaDescription: `Ja, der Hostinger-Empfehlungsrabatt von 20${NBSP}% ist echt: Die erste Laufzeit ab 12 Monaten wird über den Link um 20${NBSP}% günstiger. Ohne Code. Geprüft Okt. 2026.`,
    eligibleCategories: 'Erste Laufzeit eines neuen Hostinger-Tarifs mit 12 Monaten oder mehr: Webhosting, VPS, E-Mail und KI-Agenten-Tarife',
    validity: 'Empfehlung gültig, solange das Empfehlungsprogramm von Hostinger läuft',
    reusable: 'Entfällt: Der Rabatt kommt über den Link, nicht über einen Gutschein',
    shipping: 'Entfällt',
    combinable:
      'Nicht mit anderen Gutscheinen kombinierbar: Laut Hostinger ist der Preis über den Empfehlungslink bereits der beste, den es über diesen Link gibt',
    aboutBrand: `Hostinger ist ein Webhosting-Anbieter mit Hosting-Tarifen, Website-Baukasten, VPS, Domains und E-Mail. Em Casa com Cecília läuft seit 2024 bei Hostinger als Node.js-Anwendung. Der Link auf dieser Seite ist eine Empfehlung: Er öffnet Hostinger mit 20${NBSP}% Rabatt auf die erste Laufzeit eines neuen Tarifs mit 12 Monaten oder mehr, ohne Gutscheincode.`,
    brandLogoAlt: 'Hostinger-Logo',
    faqs: [
      {
        question: 'Brauche ich einen Hostinger-Empfehlungscode oder Gutschein?',
        answer:
          'Nein. Über den Link auf dieser Seite wird der Empfehlungsrabatt schon im Warenkorb angewendet, ohne dass du etwas eingeben musst. Es ist eine Empfehlung, kein Gutschein.',
      },
      {
        question: `Ist der Hostinger-Empfehlungsrabatt von 20${NBSP}% echt?`,
        answer: `Ja. Die Bedingungen von Hostinger nennen „bis zu 20${NBSP}%“; bei den Tarifen, die wir im Oktober 2026 über diesen Link geprüft haben (Webhosting mit 12 und 48 Monaten Laufzeit, VPS KVM und die KI-Agenten-Tarife), zeigte der Preis 20${NBSP}% Rabatt auf die erste Laufzeit.`,
      },
      {
        question: 'Funktioniert der Empfehlungsrabatt bei Tarifen mit 1 Monat Laufzeit?',
        answer: `Nicht bei den wichtigsten Webhosting-Tarifen. Am 24. Oktober 2026 wurde der Empfehlungsrabatt bei Premium und Unlimited mit 12 und 48 Monaten Laufzeit angezeigt, bei 1 Monat Laufzeit nicht; nur der Tarif Startup zeigte ihn auch bei 1 Monat. Wähle eine Laufzeit von 12 Monaten oder mehr, um sicher die 20${NBSP}% zu bekommen.`,
      },
      {
        question: `Gelten die 20${NBSP}% auch für VPS, E-Mail und KI-Agenten?`,
        answer:
          `Hostinger führt sie als berechtigt auf. Wir haben die 20${NBSP}% auf die erste Laufzeit von VPS KVM und der KI-Agenten-Tarife bei 24 Monaten gesehen; E-Mail und kürzere Laufzeiten haben wir nicht geprüft. Domains gehören nicht zur Empfehlung.`,
      },
      {
        question: 'Gilt der Rabatt auch bei der Verlängerung?',
        answer: `Nein. Die 20${NBSP}% gelten nur für die erste Laufzeit. Danach verlängert sich der Tarif zum regulären Preis, den Hostinger unter jedem Tarif anzeigt, und du kannst vor der Verlängerung die Laufzeit wechseln oder kündigen.`,
      },
      {
        question: 'Lässt sich der Empfehlungsrabatt mit einem anderen Hostinger-Gutschein kombinieren?',
        answer:
          'Nein. Laut Hostinger ist der Preis über den Empfehlungslink bereits der beste, den es über diesen Link gibt, und andere Gutscheine lassen sich nicht kombinieren.',
      },
      {
        question: 'Gilt der Rabatt auch für bestehende Hostinger-Kunden?',
        answer:
          'Er gilt für einen neuen Tarif, der über den Link gekauft wird. Bereits gebuchte Tarife und frühere Käufe bekommen den Rabatt nicht.',
      },
      {
        question: 'Nutzt Em Casa com Cecília Hostinger?',
        answer: 'Ja. Die Website läuft seit 2024 bei Hostinger als Node.js-Anwendung.',
      },
      {
        question: 'Unterstützt ein Kauf über den Link Em Casa com Cecília?',
        answer: 'Ja, ein Kauf über die Empfehlung kann Em Casa com Cecília ein Guthaben einbringen, ohne Mehrkosten für dich.',
      },
    ],
    linkInstructions: [
      'Öffne Hostinger über den Button: Die Preise auf der Seite enthalten schon den Empfehlungsrabatt.',
      'Wähle Tarif und eine Laufzeit von 12 Monaten oder mehr und gehe über denselben Link weiter zum Warenkorb.',
      'Du musst keinen Gutscheincode eingeben: Der Rabatt ist bereits an den Link gebunden.',
      'Prüfe im Warenkorb vor dem Bezahlen den Preis der ersten Laufzeit und den Verlängerungspreis.',
    ],
    linkNote: `Die 20${NBSP}% gelten nur für die erste Laufzeit eines neuen Tarifs mit 12 Monaten oder mehr: Die Verlängerung kostet den regulären Tarifpreis, und frühere Käufe bekommen den Rabatt nicht.`,
  },
  it: {
    discount: '20% di sconto',
    offerTypeLabel: 'invito',
    offerTypeLabelPlural: 'inviti',
    offerActionLabel: 'Clicca per avere il 20% di sconto sui piani',
    category: 'Hosting web e domini',
    shortDescription: 'primo periodo di un nuovo piano da 12 mesi o più, con lo sconto già nel link',
    longDescription:
      'Il link di invito di Hostinger dà il 20% di sconto sul primo periodo di un nuovo piano di 12 mesi o più, applicato in fase di acquisto senza nulla da digitare: hosting web, VPS, e-mail aziendale o i piani per agenti IA (OpenClaw). Sul periodo di 1 mese i piani Premium e Unlimited di hosting web non mostrano lo sconto di invito (solo lo Startup lo mostra ancora), i rinnovi costano il prezzo standard e non si cumula con altri codici. Em Casa com Cecília è ospitato su Hostinger dal 2024; link verificato il 24 ottobre 2026.',
    metaTitle: 'Sconto Hostinger: 20% con il link, senza codice',
    metaDescription:
      'Sì, lo sconto referral Hostinger del 20% è reale: il primo periodo di un piano da 12 mesi o più costa il 20% in meno dal link. Senza codice.',
    eligibleCategories: 'Primo periodo di un nuovo piano Hostinger da 12 mesi o più: hosting web, VPS, e-mail e piani per agenti IA',
    validity: 'Invito attivo finché il programma di inviti di Hostinger è in vigore',
    reusable: 'Non applicabile: lo sconto arriva dal link, non da un codice',
    shipping: 'Non applicabile',
    combinable:
      'Non si cumula con altri codici sconto: secondo Hostinger, il prezzo del link di invito è già il migliore che offre tramite quel link',
    aboutBrand:
      'Hostinger è un’azienda di hosting web, con piani di hosting, website builder, VPS, domini ed e-mail. Em Casa com Cecília è ospitato su Hostinger dal 2024, come applicazione Node.js. Il link di questa pagina è un invito: apre Hostinger con il 20% di sconto sul primo periodo di un nuovo piano da 12 mesi o più, senza codice da digitare.',
    brandLogoAlt: 'Logo di Hostinger',
    faqs: [
      {
        question: 'Serve un codice sconto o invito Hostinger?',
        answer:
          'No. Con il link di questa pagina lo sconto dell’invito si applica già in fase di acquisto, senza nulla da digitare. È un invito, non un codice sconto.',
      },
      {
        question: 'Lo sconto referral Hostinger del 20% è reale?',
        answer:
          'Sì. Le condizioni di Hostinger dicono «fino al 20%»; sui piani verificati con questo link a ottobre 2026 (hosting web con durate di 12 e 48 mesi, VPS KVM e piani per agenti IA) il prezzo mostrava il 20% di sconto sul primo periodo.',
      },
      {
        question: 'Lo sconto di invito vale sui piani da 1 mese?',
        answer:
          'Non sui piani principali di hosting web. Il 24 ottobre 2026 Premium e Unlimited mostravano l’invito applicato sulle durate di 12 e 48 mesi, non su quella di 1 mese; solo il piano Startup lo mostrava ancora a 1 mese. Scegli una durata di 12 mesi o più per essere sicuro del 20%.',
      },
      {
        question: 'Il 20% vale su VPS, e-mail e agenti IA?',
        answer:
          'Hostinger li elenca come idonei. Abbiamo visto il 20% sul primo periodo del VPS KVM e dei piani per agenti IA nella durata di 24 mesi; e-mail e durate più brevi non le abbiamo verificate. I domini non fanno parte dell’invito.',
      },
      {
        question: 'Lo sconto vale anche al rinnovo?',
        answer:
          'No. Il 20% vale solo per il primo periodo. Poi il piano si rinnova al prezzo standard che Hostinger mostra sotto ogni piano, e puoi cambiare periodo o disdire prima del rinnovo.',
      },
      {
        question: 'Lo sconto dell’invito si cumula con un altro codice Hostinger?',
        answer:
          'No. Hostinger dichiara che il prezzo del link di invito è già il migliore che offre tramite quel link, e gli altri codici non si cumulano.',
      },
      {
        question: 'Lo sconto vale per chi è già cliente Hostinger?',
        answer:
          'Vale per un nuovo piano acquistato tramite il link. I piani già attivi e gli acquisti già fatti non ricevono lo sconto.',
      },
      {
        question: 'Em Casa com Cecília usa Hostinger?',
        answer: 'Sì. Il sito è ospitato su Hostinger dal 2024, come applicazione Node.js.',
      },
      {
        question: 'Acquistare tramite il link sostiene Em Casa com Cecília?',
        answer: 'Sì, un acquisto tramite l’invito può generare un credito per Em Casa com Cecília, senza costi aggiuntivi per te.',
      },
    ],
    linkInstructions: [
      'Apri Hostinger con il pulsante indicato: i prezzi della pagina includono già lo sconto dell’invito.',
      'Scegli il piano e una durata di 12 mesi o più, poi vai al carrello con lo stesso link.',
      'Non c’è nessun codice da digitare: lo sconto è già legato al link.',
      'Controlla nel carrello il prezzo del primo periodo e quello del rinnovo prima di pagare.',
    ],
    linkNote:
      'Il 20% vale solo per il primo periodo di un nuovo piano da 12 mesi o più: il rinnovo costa il prezzo standard del piano, e lo sconto non vale per gli acquisti già fatti.',
  },
  ko: {
    discount: '20% 할인',
    offerTypeLabel: '추천',
    offerTypeLabelPlural: '추천',
    offerActionLabel: '클릭하고 요금제 20% 할인 받기',
    category: '웹 호스팅·도메인',
    shortDescription: '12개월 이상 신규 요금제의 첫 이용 기간, 할인은 링크에 이미 적용',
    longDescription:
      'Hostinger 추천 링크로 12개월 이상 신규 요금제의 첫 이용 기간 20%가 할인되며, 결제할 때 입력할 것이 없습니다. 웹 호스팅, VPS, 비즈니스 이메일, AI 에이전트 요금제(OpenClaw)에 적용됩니다. Premium과 Unlimited 웹 호스팅 요금제는 1개월 이용 기간에 추천 할인이 표시되지 않고(Startup 요금제만 아직 표시됨), 갱신은 정가로 청구되며, 다른 쿠폰과는 중복되지 않습니다. Em Casa com Cecília는 2024년부터 Hostinger에서 운영됩니다. 링크 확인일은 2026년 10월 24일입니다.',
    metaTitle: 'Hostinger(호스팅어) 할인: 추천 링크로 20%, 쿠폰 불필요',
    metaDescription:
      '추천 링크로 12개월 이상 신규 요금제의 첫 이용 기간에 Hostinger 20% 할인이 적용됩니다. 쿠폰 없이 링크만 열면 됩니다. 2026년 10월 기준 확인.',
    eligibleCategories: '12개월 이상 신규 Hostinger 요금제의 첫 이용 기간: 웹 호스팅, VPS, 이메일, AI 에이전트 요금제',
    validity: 'Hostinger 추천 프로그램이 운영되는 동안 유효',
    reusable: '해당 없음: 할인은 쿠폰이 아니라 링크로 적용됩니다',
    shipping: '해당 없음',
    combinable: '다른 쿠폰과 중복되지 않습니다. Hostinger에 따르면 추천 링크 가격이 이 링크로 받을 수 있는 최저가입니다',
    aboutBrand:
      'Hostinger는 호스팅 요금제, 웹사이트 빌더, VPS, 도메인, 이메일을 제공하는 웹 호스팅 회사입니다. Em Casa com Cecília는 2024년부터 Node.js 애플리케이션으로 Hostinger에서 운영됩니다. 이 페이지의 링크는 추천 링크로, 12개월 이상 신규 요금제의 첫 이용 기간에 20% 할인된 Hostinger를 열어 주며 입력할 쿠폰은 없습니다.',
    brandLogoAlt: 'Hostinger 로고',
    faqs: [
      {
        question: 'Hostinger 추천 코드나 쿠폰이 필요한가요?',
        answer: '아니요. 이 페이지의 링크로 들어가면 추천 할인이 결제 때 이미 적용되어 있어 입력할 것이 없습니다. 쿠폰이 아니라 추천 링크입니다.',
      },
      {
        question: 'Hostinger 추천 할인 20%는 실제로 받을 수 있나요?',
        answer: '네. Hostinger 약관에는 "최대 20%"라고 되어 있습니다. 2026년 10월 이 링크로 확인한 요금제(웹 호스팅 12개월·48개월 이용 기간, VPS KVM, AI 에이전트 요금제)에서는 첫 이용 기간 가격에 20% 할인이 표시되었습니다.',
      },
      {
        question: '1개월 요금제에도 추천 할인이 적용되나요?',
        answer: '주요 웹 호스팅 요금제에서는 적용되지 않습니다. 2026년 10월 24일 기준 Premium과 Unlimited는 12개월과 48개월 이용 기간에 추천 할인이 적용되고 1개월 이용 기간에는 적용되지 않았으며, 1개월에 표시된 곳은 Startup 요금제뿐이었습니다. 20% 할인을 확실히 받으려면 12개월 이상 이용 기간을 고르세요.',
      },
      {
        question: 'VPS, 이메일, AI 에이전트에도 20%가 적용되나요?',
        answer: 'Hostinger는 이 항목들을 적용 대상으로 나열합니다. VPS KVM과 AI 에이전트 요금제는 24개월 이용 기간의 첫 이용 기간에 20% 할인을 확인했고, 이메일과 더 짧은 이용 기간은 확인하지 않았습니다. 도메인은 추천 대상이 아닙니다.',
      },
      {
        question: '요금제를 갱신할 때도 할인되나요?',
        answer:
          '아니요. 20% 할인은 첫 이용 기간에만 적용됩니다. 이후에는 Hostinger가 각 요금제 아래에 표시하는 정가로 갱신되며, 갱신 전에 이용 기간을 바꾸거나 해지할 수 있습니다.',
      },
      {
        question: '추천 할인을 다른 Hostinger 쿠폰과 함께 쓸 수 있나요?',
        answer: '아니요. Hostinger는 추천 링크 가격이 이 링크로 받을 수 있는 최저가이며 다른 쿠폰은 중복되지 않는다고 안내합니다.',
      },
      {
        question: '이미 Hostinger를 쓰는 고객도 할인받을 수 있나요?',
        answer: '링크로 새 요금제를 구매할 때 적용됩니다. 이미 이용 중인 요금제와 지난 구매에는 할인이 적용되지 않습니다.',
      },
      {
        question: 'Em Casa com Cecília도 Hostinger를 쓰나요?',
        answer: '네. 이 사이트는 2024년부터 Node.js 애플리케이션으로 Hostinger에서 운영됩니다.',
      },
      {
        question: '링크로 구매하면 Em Casa com Cecília에 도움이 되나요?',
        answer: '네. 추천 링크로 구매하면 추가 비용 없이 Em Casa com Cecília에 크레딧이 적립될 수 있습니다.',
      },
    ],
    linkInstructions: [
      '안내된 버튼으로 Hostinger를 여세요. 페이지의 가격에 추천 할인이 이미 반영되어 있습니다.',
      '요금제를 고르고 이용 기간은 12개월 이상으로 선택한 뒤, 같은 링크에서 장바구니로 이동하세요.',
      '입력할 쿠폰은 없습니다. 할인은 이미 링크에 연결되어 있습니다.',
      '결제 전에 장바구니에서 첫 이용 기간 가격과 갱신 가격을 확인하세요.',
    ],
    linkNote: '20% 할인은 12개월 이상 신규 요금제의 첫 이용 기간에만 적용됩니다. 갱신은 요금제 정가로 청구되며, 지난 구매에는 할인이 적용되지 않습니다.',
  },
  ja: {
    discount: '20%オフ',
    offerTypeLabel: '紹介',
    offerTypeLabelPlural: '紹介',
    offerActionLabel: 'クリックしてプランを20%オフに',
    category: 'Webホスティング・ドメイン',
    shortDescription: '12か月以上の新規プランの初回契約期間が対象、割引はリンクに適用済み',
    longDescription:
      'Hostingerの紹介リンクからは、12か月以上の新規プランの初回契約期間が20%オフになります。入力は不要で、購入時に自動で適用されます。対象はWebホスティング、VPS、ビジネスメール、AIエージェントのプラン（OpenClaw）です。1か月契約のPremium・UnlimitedのWebホスティングプランには紹介割引は表示されず（Startupのみ表示）、更新は通常価格、他のクーポンとの併用もできません。Em Casa com Cecíliaは2024年からHostingerで運営しています。リンクの確認日は2026年10月24日です。',
    metaTitle: 'Hostinger（ホスティンガー）割引：紹介リンクで20%オフ、クーポン不要',
    metaDescription:
      '紹介リンクから12か月以上の新規プランの初回契約期間にHostingerの20%割引が適用され、クーポンは不要です。1か月契約の注意点、更新料金、併用の条件も確認できます。2026年10月確認。',
    eligibleCategories: '12か月以上のHostingerの新規プランの初回契約期間（Webホスティング、VPS、メール、AIエージェントのプラン）',
    validity: 'Hostingerの紹介プログラムが実施されている間有効',
    reusable: '該当なし：割引はクーポンではなくリンクで適用されます',
    shipping: '該当なし',
    combinable: '他のクーポンとは併用できません。Hostingerによると、紹介リンクの価格がこのリンクで提供できる最安値です',
    aboutBrand:
      'Hostingerは、ホスティングプラン、Webサイトビルダー、VPS、ドメイン、メールを提供するWebホスティング会社です。Em Casa com CecíliaはNode.jsアプリとして2024年からHostingerで運営しています。このページのリンクは紹介リンクで、12か月以上の新規プランの初回契約期間が20%オフになったHostingerを開きます。入力するクーポンはありません。',
    brandLogoAlt: 'Hostingerのロゴ',
    faqs: [
      {
        question: 'Hostingerの紹介コードやクーポンは必要ですか？',
        answer: 'いいえ。このページのリンクから開くと、紹介割引は購入時にすでに適用されており、入力するものはありません。クーポンではなく紹介リンクです。',
      },
      {
        question: 'Hostingerの紹介による20%割引は本当ですか？',
        answer: '本当です。Hostingerの規約には「最大20%」とあります。2026年10月にこのリンクで確認したプラン（Webホスティングの12か月・48か月契約、VPS KVM、AIエージェントのプラン）では、初回契約期間の価格が20%オフと表示されました。',
      },
      {
        question: '1か月プランでも紹介割引は使えますか？',
        answer: 'メインのWebホスティングプランでは使えません。2026年10月24日時点で、PremiumとUnlimitedは紹介割引が12か月と48か月の契約期間に表示され、1か月の契約期間には表示されませんでした。1か月で表示されたのはStartupプランだけでした。20%割引を確実に受けるには12か月以上の契約期間を選んでください。',
      },
      {
        question: 'VPS、メール、AIエージェントでも20%割引になりますか？',
        answer: '対象として掲載されています。VPS KVMとAIエージェントのプランは24か月の契約期間で初回契約期間の20%割引を確認しました。メールと短い契約期間は確認していません。ドメインは紹介の対象外です。',
      },
      {
        question: 'プランの更新時も割引されますか？',
        answer:
          'いいえ。20%割引は初回契約期間のみです。その後は、Hostingerが各プランの下に表示している通常価格で更新されます。更新前に契約期間の変更や解約ができます。',
      },
      {
        question: '紹介割引は他のHostingerクーポンと併用できますか？',
        answer: 'いいえ。Hostingerは、紹介リンクの価格がこのリンクで提供できる最安値であり、他のクーポンは併用できないと案内しています。',
      },
      {
        question: 'すでにHostingerを利用している人も割引を受けられますか？',
        answer: 'リンクから新しいプランを購入する場合に適用されます。契約済みのプランや過去の購入は割引の対象外です。',
      },
      {
        question: 'Em Casa com CecíliaもHostingerを使っていますか？',
        answer: 'はい。このサイトはNode.jsアプリとして2024年からHostingerで運営しています。',
      },
      {
        question: 'リンクから購入するとEm Casa com Cecíliaの応援になりますか？',
        answer: 'はい。紹介リンクからの購入で、追加費用なしにEm Casa com Cecíliaにクレジットが付与される場合があります。',
      },
    ],
    linkInstructions: [
      '案内のボタンからHostingerを開いてください。ページの価格には紹介割引がすでに反映されています。',
      'プランと12か月以上の契約期間を選び、同じリンクのままカートに進んでください。',
      '入力するクーポンはありません。割引はすでにリンクにひも付いています。',
      'お支払いの前に、カートで初回契約期間の価格と更新料金を確認してください。',
    ],
    linkNote: '20%割引は12か月以上の新規プランの初回契約期間のみです。更新時はプランの通常価格で請求され、過去の購入には割引は適用されません。',
  },
  'zh-hant': {
    discount: '20% 折扣',
    offerTypeLabel: '推薦',
    offerTypeLabelPlural: '推薦',
    offerActionLabel: '點擊享方案 20% 折扣',
    category: '網站主機與網域',
    shortDescription: '12 個月以上新方案的首期，折扣已包含在連結中',
    longDescription:
      '透過 Hostinger 推薦連結，12 個月以上新方案的首期可享 20% 折扣，結帳時不需要輸入任何內容。適用於網站主機、VPS、企業電郵與 AI 代理方案（OpenClaw）。1 個月期的 Premium 與 Unlimited 網站主機方案不顯示推薦折扣（只有 Startup 仍會顯示），續約以原價計算，也不能與其他優惠碼併用。Em Casa com Cecília 自 2024 年起架設在 Hostinger 上；連結查核日期為 2026 年 10 月 24 日。',
    metaTitle: 'Hostinger 折扣：推薦連結享 20%，不需優惠碼',
    metaDescription:
      '透過推薦連結，12 個月以上新方案的首期即享 Hostinger 20% 折扣，不需優惠碼。可查看 1 個月方案的限制、續約價格與不可併用的條件。2026 年 10 月查核。',
    eligibleCategories: '12 個月以上 Hostinger 新方案的首期：網站主機、VPS、電郵與 AI 代理方案',
    validity: 'Hostinger 推薦計畫進行期間有效',
    reusable: '不適用：折扣來自連結，而不是優惠碼',
    shipping: '不適用',
    combinable: '不可與其他優惠碼併用：根據 Hostinger，推薦連結的價格已是透過此連結能提供的最優惠價格',
    aboutBrand:
      'Hostinger 是一家網站主機公司，提供主機方案、網站建置工具、VPS、網域與電子郵件。Em Casa com Cecília 自 2024 年起以 Node.js 應用程式架設在 Hostinger 上。本頁的連結是推薦連結：開啟的 Hostinger 頁面中，12 個月以上新方案的首期有 20% 折扣，不需要輸入優惠碼。',
    brandLogoAlt: 'Hostinger 標誌',
    faqs: [
      {
        question: '需要 Hostinger 推薦碼或優惠碼嗎？',
        answer: '不需要。透過本頁的連結，推薦折扣已在結帳時套用，不需要輸入任何內容。這是推薦，不是優惠碼。',
      },
      {
        question: 'Hostinger 推薦的 20% 折扣是真的嗎？',
        answer: '是的。Hostinger 的條款寫著「最高 20%」；我們在 2026 年 10 月透過此連結查核的方案（網站主機 12 個月與 48 個月期、VPS KVM 與 AI 代理方案）中，首期價格都顯示 20% 折扣。',
      },
      {
        question: '1 個月方案也能使用推薦折扣嗎？',
        answer: '主要的網站主機方案不行。2026 年 10 月 24 日時，Premium 與 Unlimited 只在 12 個月與 48 個月期顯示推薦折扣，1 個月期沒有；只有 Startup 方案在 1 個月期仍有顯示。選擇 12 個月以上的期限，才能確定享有 20% 折扣。',
      },
      {
        question: 'VPS、電郵與 AI 代理也能享 20% 折扣嗎？',
        answer: 'Hostinger 將這些列為適用項目。我們在 24 個月期的 VPS KVM 與 AI 代理方案首期看到 20% 折扣；電郵與較短期限則未查核。網域不屬於推薦範圍。',
      },
      {
        question: '續約時也有折扣嗎？',
        answer: '沒有。20% 折扣只適用於首期。之後方案會以 Hostinger 在各方案下方標示的原價續約，你可以在續約前更改期間或取消。',
      },
      {
        question: '推薦折扣可以和其他 Hostinger 優惠碼併用嗎？',
        answer: '不行。Hostinger 表示推薦連結的價格已是透過此連結能提供的最優惠價格，其他優惠碼無法併用。',
      },
      {
        question: '已經是 Hostinger 客戶也能享有折扣嗎？',
        answer: '透過連結購買新方案時適用。已訂閱的方案與過去的購買不會享有折扣。',
      },
      {
        question: 'Em Casa com Cecília 也使用 Hostinger 嗎？',
        answer: '是的。本站自 2024 年起以 Node.js 應用程式架設在 Hostinger 上。',
      },
      {
        question: '透過連結購買能支持 Em Casa com Cecília 嗎？',
        answer: '可以。透過推薦連結購買，可能讓 Em Casa com Cecília 獲得回饋金，你不需要多付任何費用。',
      },
    ],
    linkInstructions: [
      '點選指定的按鈕開啟 Hostinger：頁面上的價格已含推薦折扣。',
      '選擇方案與 12 個月以上的期限，再透過同一個連結前往購物車。',
      '不需要輸入優惠碼：折扣已綁定在連結上。',
      '付款前，請在購物車確認首期價格與續約價格。',
    ],
    linkNote: '20% 折扣只適用於 12 個月以上新方案的首期：續約會以方案原價收費，過去的購買也不適用折扣。',
  },
  'zh-hans': {
    discount: '20% 折扣',
    offerTypeLabel: '推荐',
    offerTypeLabelPlural: '推荐',
    offerActionLabel: '点击享套餐 20% 折扣',
    category: '网站主机与域名',
    shortDescription: '12 个月以上新套餐的首期，折扣已包含在链接中',
    longDescription:
      '通过 Hostinger 推荐链接，12 个月以上的新套餐首期可享 20% 折扣，结账时无需输入任何内容。适用于网站主机、VPS、企业邮箱与 AI 代理套餐（OpenClaw）。1 个月期的 Premium 与 Unlimited 网站主机套餐不显示推荐折扣（只有 Startup 仍会显示），续费按原价计算，也不能与其他优惠码叠加。Em Casa com Cecília 自 2024 年起运行在 Hostinger 上；链接核查日期为 2026 年 10 月 24 日。',
    metaTitle: 'Hostinger 折扣：推荐链接享 20%，无需优惠码',
    metaDescription:
      '通过推荐链接，12 个月以上新套餐的首期即享 Hostinger 20% 折扣，无需优惠码。可了解 1 个月套餐的限制、续费价格以及不可叠加的条件。2026 年 10 月核查。',
    eligibleCategories: '12 个月以上 Hostinger 新套餐的首期：网站主机、VPS、邮箱与 AI 代理套餐',
    validity: 'Hostinger 推荐计划进行期间有效',
    reusable: '不适用：折扣来自链接，而不是优惠码',
    shipping: '不适用',
    combinable: '不可与其他优惠码叠加：据 Hostinger 说明，推荐链接的价格已是通过此链接能提供的最优惠价格',
    aboutBrand:
      'Hostinger 是一家网站主机公司，提供主机套餐、建站工具、VPS、域名和电子邮箱。Em Casa com Cecília 自 2024 年起以 Node.js 应用运行在 Hostinger 上。本页的链接是推荐链接：打开的 Hostinger 页面中，12 个月以上新套餐的首期有 20% 折扣，无需输入优惠码。',
    brandLogoAlt: 'Hostinger 标志',
    faqs: [
      {
        question: '需要 Hostinger 推荐码或优惠码吗？',
        answer: '不需要。通过本页的链接，推荐折扣已在结账时自动应用，无需输入任何内容。这是推荐，不是优惠码。',
      },
      {
        question: 'Hostinger 推荐的 20% 折扣是真的吗？',
        answer: '是的。Hostinger 的条款写的是“最高 20%”；我们在 2026 年 10 月通过此链接核查的套餐（网站主机 12 个月与 48 个月期、VPS KVM 与 AI 代理套餐）中，首期价格都显示 20% 折扣。',
      },
      {
        question: '1 个月套餐也能用推荐折扣吗？',
        answer: '主要的网站主机套餐不行。2026 年 10 月 24 日时，Premium 与 Unlimited 只在 12 个月与 48 个月期显示推荐折扣，1 个月期没有；只有 Startup 套餐在 1 个月期仍有显示。选择 12 个月以上的期限，才能确定享有 20% 折扣。',
      },
      {
        question: 'VPS、邮箱与 AI 代理也能享 20% 折扣吗？',
        answer: 'Hostinger 将这些列为适用项目。我们在 24 个月期的 VPS KVM 与 AI 代理套餐首期看到 20% 折扣；邮箱与较短期限则未核查。域名不属于推荐范围。',
      },
      {
        question: '续费时也有折扣吗？',
        answer: '没有。20% 折扣只适用于首期。之后套餐会按 Hostinger 在各套餐下方标注的原价续费，你可以在续费前更改期限或取消。',
      },
      {
        question: '推荐折扣可以和其他 Hostinger 优惠码叠加吗？',
        answer: '不可以。Hostinger 表示推荐链接的价格已是通过此链接能提供的最优惠价格，其他优惠码无法叠加。',
      },
      {
        question: '已经是 Hostinger 客户也能享受折扣吗？',
        answer: '通过链接购买新套餐时适用。已订购的套餐和以往的购买不享受折扣。',
      },
      {
        question: 'Em Casa com Cecília 也使用 Hostinger 吗？',
        answer: '是的。本站自 2024 年起以 Node.js 应用运行在 Hostinger 上。',
      },
      {
        question: '通过链接购买能支持 Em Casa com Cecília 吗？',
        answer: '可以。通过推荐链接购买，可能为 Em Casa com Cecília 带来推荐奖励金，你无需额外付费。',
      },
    ],
    linkInstructions: [
      '点击指定按钮打开 Hostinger：页面上的价格已包含推荐折扣。',
      '选择套餐与 12 个月以上的期限，再通过同一个链接进入购物车。',
      '无需输入优惠码：折扣已绑定在链接上。',
      '付款前，请在购物车确认首期价格和续费价格。',
    ],
    linkNote: '20% 折扣只适用于 12 个月以上新套餐的首期：续费按套餐原价收取，以往的购买也不适用折扣。',
  },
};

// O que cada campo de uma loja de código faz fora do PT: 'pt' herda o cupom em PT, 'translate' vem da
// tradução e fica de fora sem ela, 'drop' nunca sai do PT. Campo novo em CouponCodeOffer sem decisão aqui
// quebra o typecheck, em vez de ir em português à página de outro idioma. offerUrl, referral e campaigns
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
  campaigns: 'pt',
  code: 'pt',
  discountNumber: 'pt',
  testNote: 'translate',
  codeKind: 'pt',
  codeFieldLabel: 'translate',
  codeInstructions: 'translate',
  history: 'drop',
  tiers: 'drop',
} as const satisfies Record<keyof CouponCodeOffer, 'pt' | 'translate' | 'drop'>;

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
    // O mesmo SONARDEOFERTAS no site internacional, que abre a indicação em inglês com as mesmas regras
    // (lidas em 19/10/2026); o PT segue no /br.
    offerMode: 'affiliate-link',
    offerUrl: 'https://www.hostinger.com/?REFERRALCODE=SONARDEOFERTAS',
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

// Só cupons ativos ganham página fora do PT, como acontece em /cupons.
export function getTranslatedCouponRoutes() {
  return Object.keys(COUPON_TRANSLATIONS)
    .filter((slug) => getCouponBySlug(slug))
    .flatMap((slug) => TRANSLATED_LOCALES.map((locale) => ({ locale, slug })));
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
  if ((coupon.referral && !text.referral) || (coupon.campaigns && text.campaigns?.length !== coupon.campaigns.length)) {
    throw new Error(`${where}: a tradução precisa de referral e campaigns como o cupom em PT.`);
  }
  const shared = {
    offerUrl: translation.offerUrl ?? coupon.offerUrl,
    referral: coupon.referral && { ...coupon.referral, ...text.referral },
    campaigns: coupon.campaigns?.map((campaign, index) => ({ ...campaign, ...text.campaigns?.[index] })),
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
    const codeText: Partial<Record<keyof CouponCodeOffer, unknown>> = translation.locales[locale];
    const fields = Object.entries(CODE_FIELD_POLICY).map(([key, policy]) => {
      const field = key as keyof CouponCodeOffer;
      return [field, policy === 'pt' ? coupon[field] : policy === 'translate' ? codeText[field] : undefined];
    });
    return { ...(Object.fromEntries(fields) as CouponCodeOffer), ...shared };
  }
  throw new Error(`${where}: a tradução é de ${translation.offerMode}, e o cupom em PT, de ${coupon.offerMode}.`);
}
