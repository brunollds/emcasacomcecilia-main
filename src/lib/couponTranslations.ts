import {
  getCouponBySlug,
  type AffiliateLinkOffer,
  type CouponCampaign,
  type CouponFAQ,
  type CouponReferral,
} from './couponsData';
import { LOCALE_KEYS, type Locale } from './i18n/locales';

export type TranslatedLocale = Exclude<Locale, 'pt'>;

export const TRANSLATED_LOCALES = LOCALE_KEYS.filter((locale): locale is TranslatedLocale => locale !== 'pt');

export const isTranslatedLocale = (value: string): value is TranslatedLocale =>
  (TRANSLATED_LOCALES as string[]).includes(value);

// Textos de uma oferta por link em outro idioma. Códigos, datas e status continuam vindo do cupom
// em PT, então reconferir a oferta lá vale para todos os idiomas. O link principal também, salvo
// quando a loja tem um link internacional em COUPON_TRANSLATIONS.
export type AffiliateOfferTranslation = {
  discount: string;
  offerTypeLabel: string;
  offerTypeLabelPlural: string;
  offerActionLabel: string;
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
  linkInstructions: string[];
  linkNote: string;
  referral: Pick<CouponReferral, 'label' | 'instructions'>;
  // Na mesma ordem de campaigns no cupom em PT.
  campaigns: Pick<CouponCampaign, 'title' | 'description' | 'eligibility'>[];
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
        question: 'Who can use the code G326U6B?',
        answer:
          'The G326U6B campaign advertises a 50% coupon for new users only. SHEIN confirms eligibility and the final discount on your account and at checkout.',
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
        question: '¿Quién puede usar el código G326U6B?',
        answer:
          'La campaña G326U6B anuncia un cupón del 50% solo para nuevos usuarios. SHEIN confirma la elegibilidad y el descuento final en la cuenta y al pagar.',
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
        question: `Qui peut utiliser le code G326U6B${NBSP}?`,
        answer: `La campagne G326U6B annonce un bon de réduction de 50${NBSP}% réservé aux nouveaux utilisateurs. SHEIN confirme l'éligibilité et la réduction finale dans le compte et au moment du paiement.`,
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
        question: 'Wer kann den Code G326U6B nutzen?',
        answer:
          'Die Aktion G326U6B bewirbt einen 50-%-Gutschein nur für Neukunden. Ob du berechtigt bist und wie hoch der Rabatt am Ende ist, bestätigt SHEIN im Konto und an der Kasse.',
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
        question: 'Chi può usare il codice G326U6B?',
        answer:
          "La campagna G326U6B annuncia un coupon del 50% solo per i nuovi utenti. SHEIN conferma l'idoneità e lo sconto finale nell'account e al checkout.",
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
        question: 'G326U6B 코드는 누가 사용할 수 있나요?',
        answer:
          'G326U6B 캠페인은 신규 회원 전용 50% 쿠폰을 안내합니다. 대상 여부와 최종 할인은 SHEIN이 계정과 결제 단계에서 확인합니다.',
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
        question: 'G326U6B は誰が使えますか？',
        answer:
          'G326U6B のキャンペーンは、新規ユーザー限定の50%クーポンを案内しています。対象かどうかと最終的な割引は、アカウントと決済画面で SHEIN が確認します。',
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
        question: '誰可以使用 G326U6B？',
        answer: 'G326U6B 活動提供只限新用戶的 50% 優惠券。是否符合資格及最終折扣，由 SHEIN 在帳戶及結帳時確認。',
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
        question: '谁可以使用 G326U6B？',
        answer: 'G326U6B 活动提供仅限新用户的 50% 优惠券。是否符合条件以及最终折扣，由 SHEIN 在账户和结账时确认。',
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

type CouponTranslation = {
  // Link principal das páginas em outros idiomas; sem ele, vale o do cupom em PT.
  offerUrl?: string;
  locales: Record<TranslatedLocale, AffiliateOfferTranslation>;
};

const COUPON_TRANSLATIONS: Record<string, CouponTranslation> = {
  shein: {
    // Link neutro (sem br.) gerado pelo Bruno no painel da SHEIN em 05/10/2026; o PT segue no link
    // brasileiro do código 4CW5Y. Não conferir clicando: o clique registra atribuição.
    offerUrl: 'https://onelink.shein.com/55/6463grgxf6ru',
    locales: SHEIN_TRANSLATIONS,
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

export function getLocalizedCoupon(slug: string, locale: TranslatedLocale): AffiliateLinkOffer | undefined {
  const coupon = getCouponBySlug(slug);
  const translation = COUPON_TRANSLATIONS[slug];
  if (!coupon || !translation) return undefined;
  if (coupon.offerMode !== 'affiliate-link') {
    throw new Error(`[couponTranslations] "${slug}" tem tradução, mas só oferta por link sabe usar uma.`);
  }

  const text = translation.locales[locale];
  return {
    ...coupon,
    ...text,
    offerUrl: translation.offerUrl ?? coupon.offerUrl,
    referral: coupon.referral && { ...coupon.referral, ...text.referral },
    campaigns: coupon.campaigns?.map((campaign, index) => ({ ...campaign, ...text.campaigns[index] })),
    // Textos que só existem em PT; sem tradução, ficam fora da página.
    socialImageAlt: undefined,
    featuredPitch: undefined,
    monthlyHighlight: undefined,
    relatedContent: undefined,
  };
}
