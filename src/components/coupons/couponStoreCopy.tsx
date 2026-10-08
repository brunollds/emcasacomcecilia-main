import type { ReactNode } from 'react';
import type { Locale } from '@/lib/i18n/locales';

type TierLimit = { discount: string; minPurchase: string };

// O que a página de loja escreve em volta dos dados da marca. Descrição, regras, FAQ e passos
// próprios da marca vêm de couponsData (ou da tradução do cupom, fora do PT).
export type CouponStoreCopy = {
  // Idioma passado ao toLocaleDateString.
  dateLocale: string;
  // Formato das datas curtas; sem ele, vale o numérico do idioma.
  shortDate?: Intl.DateTimeFormatOptions;
  breadcrumbLabel: string;
  homeLabel: string;
  couponsLabel: string;
  otherLanguagesLabel: string;
  offerType: { code: string; link: string };
  offerTypePlural: { code: string; link: string };
  heroTitle: (offerType: string, brand: string) => string;
  heroCode: (code: string) => string;
  cutoutLabel: {
    code: (offerType: string, brand: string) => string;
    link: (offerType: string, brand: string) => string;
  };
  copyAndGo: string;
  codeCopied: string;
  copyOnly: string;
  copy: string;
  copied: string;
  copyCodeAria: (code: string) => string;
  copiedStatus: (code: string) => string;
  copiedAndOpenedStatus: (code: string) => string;
  tiersSummary: (count: number, first: TierLimit, last: TierLimit) => string;
  chooseMyTier: string;
  chooseTier: string;
  goToStore: string;
  viewOffer: string;
  noCodeToCopy: string;
  seeReferralCode: string;
  verifiedOn: (date: string) => string;
  // Lojas com testNote: o recorte diz que o cupom foi testado, e a seção conta o teste.
  testedOn: (date: string) => string;
  testTitle: string;
  testedBy: (date: string) => string;
  highlight: {
    code: (offer: { offerType: string; brand: string; code: string; discount: string; scope: string; monthYear: string }) => string;
    link: (offer: { brand: string; discount: string; scope: string; monthYear: string }) => string;
    note: (note: string) => string;
  };
  tiersTitle: (brand: string) => string;
  tiersIntro: string;
  tiersCaption: (brand: string) => string;
  tiersHeaders: { discount: string; code: string };
  tiersMinPurchase: (minPurchase: string) => string;
  rulesTitle: string;
  rules: { eligible: string; combinable: string; validity: string; reusable: string; shipping: string };
  referralVerified: (date: string) => string;
  campaignsTitle: (brand: string) => string;
  openCampaign: (brand: string) => string;
  campaignVerified: (date: string) => string;
  howToTitle: { code: (offerType: string, code: string) => string; link: (brand: string) => string };
  instructions: {
    code: (offer: { code: string; brand: string; discount: string }) => string[];
    link: (brand: string) => string[];
  };
  defaultCodeField: string;
  codeFieldNote: (field: ReactNode) => ReactNode;
  defaultLinkNote: string;
  aboutTitle: (brand: string) => string;
  relatedTitle: string;
  relatedType: { review: string; post: string };
  faqTitle: { code: (offerTypePlural: string, brand: string) => string; link: (offerTypePlural: string, brand: string) => string };
  historyTitle: (brand: string) => string;
  historyIntro: (code: ReactNode) => ReactNode;
  otherCouponsTitle: string;
  transparencyTitle: string;
  transparency: { code: (offerType: string, code: ReactNode) => ReactNode; link: string };
  // Nome da oferta no JSON-LD.
  offerName: {
    code: (offer: { discount: string; brand: string; offerType: string; code: string }) => string;
    link: (discount: string, brand: string) => string;
  };
};

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

// O francês pede espaço antes de : ; ? e %, e ele não pode quebrar a linha.
const NBSP = '\u00a0';

export const COUPON_STORE_COPY: Record<Locale, CouponStoreCopy> = {
  pt: {
    dateLocale: 'pt-BR',
    breadcrumbLabel: 'Você está em',
    homeLabel: 'Início',
    couponsLabel: 'Cupons',
    otherLanguagesLabel: 'Outros idiomas',
    offerType: { code: 'cupom', link: 'oferta' },
    offerTypePlural: { code: 'cupons', link: 'ofertas' },
    heroTitle: (offerType, brand) => `${capitalize(offerType)} ${brand}:`,
    heroCode: (code) => `com ${code}`,
    cutoutLabel: {
      code: (offerType, brand) => `Código do ${offerType} ${brand}`,
      link: (offerType, brand) => `Como acessar a ${offerType} ${brand}`,
    },
    copyAndGo: 'Copiar e ir para a loja',
    codeCopied: 'Código copiado',
    copyOnly: 'Só copiar o código',
    copy: 'Copiar',
    copied: 'Copiado',
    copyCodeAria: (code) => `Copiar o código ${code}`,
    copiedStatus: (code) => `Código ${code} copiado.`,
    copiedAndOpenedStatus: (code) => `Código ${code} copiado. A loja abriu em outra aba.`,
    tiersSummary: (count, first, last) =>
      `${count} códigos: de ${first.discount} em compras a partir de ${first.minPurchase} até ${last.discount} a partir de ${last.minPurchase}.`,
    chooseMyTier: 'Escolher minha faixa',
    chooseTier: 'Escolher faixa',
    goToStore: 'Ir para a loja',
    viewOffer: 'Ver oferta',
    noCodeToCopy: 'Sem cupom para copiar: a oferta abre pelo link da Cecília.',
    seeReferralCode: 'Ver o código de indicação',
    verifiedOn: (date) => `Conferido em ${date}`,
    testedOn: (date) => `Cupom testado em ${date}`,
    testTitle: 'Como testamos o cupom',
    testedBy: (date) => `Testado pela equipe do Em Casa com Cecília em ${date}.`,
    highlight: {
      code: ({ offerType, brand, code, discount, scope, monthYear }) =>
        `${capitalize(offerType)} ${brand} atualizado: ${code} — ${discount} ${scope} (${monthYear}).`,
      link: ({ brand, discount, scope, monthYear }) => `Atualização da oferta ${brand}: ${discount} ${scope} (${monthYear}).`,
      note: (note) => `${note}. Confirme as condições e o valor final antes de finalizar.`,
    },
    tiersTitle: (brand) => `Faixas de desconto do ${brand}`,
    tiersIntro:
      'Escolha o código conforme o valor total do seu carrinho — quanto maior a faixa alcançada, maior o desconto em reais. Clique no código para copiá-lo.',
    tiersCaption: (brand) => `Faixas de cupom ${brand}: desconto, compra mínima e código`,
    tiersHeaders: { discount: 'Desconto', code: 'Código' },
    tiersMinPurchase: (minPurchase) => `a partir de ${minPurchase}`,
    rulesTitle: 'Regras sem letra miúda',
    rules: {
      eligible: 'Vale para',
      combinable: 'Junta com outras promoções?',
      validity: 'Validade',
      reusable: 'Mais de um uso',
      shipping: 'Frete',
    },
    referralVerified: (date) => `Verificado em ${date}.`,
    campaignsTitle: (brand) => `Campanhas ativas da ${brand}`,
    openCampaign: (brand) => `Abrir campanha na ${brand}`,
    campaignVerified: (date) => `Verificada em ${date}.`,
    howToTitle: {
      code: (offerType, code) => `Como usar o ${offerType} ${code}`,
      link: (brand) => `Como acessar a oferta da ${brand}`,
    },
    instructions: {
      code: ({ code, brand, discount }) => [
        `Copie o código ${code} no card acima.`,
        `Acesse a loja ${brand} pelo botão indicado.`,
        'Adicione os produtos desejados ao carrinho.',
        'Cole o código no campo de cupom/desconto antes de finalizar.',
        `Confira se o desconto de ${discount} apareceu no resumo do pedido.`,
      ],
      link: (brand) => [
        `Acesse a oferta da ${brand} pelo botão indicado.`,
        'Confira os produtos e condições disponíveis na página da loja.',
        'Verifique o valor final antes de concluir a compra.',
      ],
    },
    defaultCodeField: 'campo de cupom/desconto',
    codeFieldNote: (field) => <>Campo correto: {field}. Confirme sempre o resumo do pedido antes de pagar.</>,
    defaultLinkNote:
      'Esta oferta é acessada pelo link indicado e não exige código para copiar. Confirme as condições na loja antes de pagar.',
    aboutTitle: (brand) => `Sobre a ${brand}`,
    relatedTitle: 'Leia antes de comprar',
    relatedType: { review: 'Review', post: 'Post' },
    faqTitle: {
      code: (offerTypePlural, brand) => `Perguntas frequentes sobre ${offerTypePlural} ${brand}`,
      link: (offerTypePlural, brand) => `Perguntas frequentes sobre ${offerTypePlural} da ${brand}`,
    },
    historyTitle: (brand) => `Histórico de cupons da ${brand}`,
    historyIntro: (code) => <>Cupons anteriores já usados nessa parceria. O cupom ativo atual é {code}.</>,
    otherCouponsTitle: 'Outros cupons',
    transparencyTitle: 'Transparência',
    transparency: {
      code: (offerType, code) => (
        <>
          Esta página pode conter links de afiliado. Quando você compra usando o {offerType} {code} ou acessa a loja pelo
          link indicado, o Em Casa com Cecília pode receber comissão da marca, sem custo extra para você.
        </>
      ),
      link: 'Esta página contém um link de afiliado. Quando você acessa a oferta e compra pelo link indicado, o Em Casa com Cecília pode receber comissão da marca, sem custo extra para você.',
    },
    offerName: {
      code: ({ discount, brand, offerType, code }) => `${discount} na ${brand} com ${offerType} ${code}`,
      link: (discount, brand) => `${discount} na ${brand} pelo link indicado`,
    },
  },
  en: {
    dateLocale: 'en-US',
    // 9/1/2026 é 9 de janeiro para quem lê inglês fora dos EUA; com o mês escrito não há dúvida.
    shortDate: { month: 'short', day: 'numeric', year: 'numeric' },
    breadcrumbLabel: 'You are here',
    homeLabel: 'Em Casa com Cecília',
    couponsLabel: 'Coupons',
    otherLanguagesLabel: 'Other languages',
    offerType: { code: 'coupon', link: 'offer' },
    offerTypePlural: { code: 'coupons', link: 'offers' },
    heroTitle: (offerType, brand) => `${brand} ${offerType}:`,
    heroCode: (code) => `with ${code}`,
    cutoutLabel: {
      code: (offerType, brand) => `${brand} ${offerType} code`,
      link: (offerType, brand) => `How to get the ${brand} ${offerType}`,
    },
    copyAndGo: 'Copy and go to the store',
    codeCopied: 'Code copied',
    copyOnly: 'Just copy the code',
    copy: 'Copy',
    copied: 'Copied',
    copyCodeAria: (code) => `Copy the code ${code}`,
    copiedStatus: (code) => `Code ${code} copied.`,
    copiedAndOpenedStatus: (code) => `Code ${code} copied. The store opened in a new tab.`,
    tiersSummary: (count, first, last) =>
      `${count} codes: from ${first.discount} on orders from ${first.minPurchase} up to ${last.discount} on orders from ${last.minPurchase}.`,
    chooseMyTier: 'Choose my tier',
    chooseTier: 'Choose tier',
    goToStore: 'Go to the store',
    viewOffer: 'See offer',
    noCodeToCopy: "No coupon to copy: the offer opens through Cecília's link.",
    seeReferralCode: 'See the referral code',
    verifiedOn: (date) => `Checked on ${date}`,
    testedOn: (date) => `Coupon tested on ${date}`,
    testTitle: 'How we tested the coupon',
    testedBy: (date) => `Tested by the Em Casa com Cecília team on ${date}.`,
    highlight: {
      code: ({ offerType, brand, code, discount, scope, monthYear }) =>
        `Updated ${brand} ${offerType}: ${code} — ${discount} ${scope} (${monthYear}).`,
      link: ({ brand, discount, scope, monthYear }) => `${brand} offer update: ${discount} ${scope} (${monthYear}).`,
      note: (note) => `${note}. Check the conditions and the final price before checking out.`,
    },
    tiersTitle: (brand) => `${brand} discount tiers`,
    tiersIntro:
      'Pick the code that matches your cart total — the higher the tier you reach, the bigger the discount. Tap a code to copy it.',
    tiersCaption: (brand) => `${brand} coupon tiers: discount, minimum purchase and code`,
    tiersHeaders: { discount: 'Discount', code: 'Code' },
    tiersMinPurchase: (minPurchase) => `from ${minPurchase}`,
    rulesTitle: 'Rules without the fine print',
    rules: {
      eligible: 'Valid for',
      combinable: 'Stacks with other promotions?',
      validity: 'Validity',
      reusable: 'More than one use',
      shipping: 'Shipping',
    },
    referralVerified: (date) => `Checked on ${date}.`,
    campaignsTitle: (brand) => `Active ${brand} campaigns`,
    openCampaign: (brand) => `Open the campaign on ${brand}`,
    campaignVerified: (date) => `Checked on ${date}.`,
    howToTitle: {
      code: (offerType, code) => `How to use the ${offerType} ${code}`,
      link: (brand) => `How to get the ${brand} offer`,
    },
    instructions: {
      code: ({ code, brand, discount }) => [
        `Copy the code ${code} from the card above.`,
        `Open the ${brand} store with the button provided.`,
        'Add the products you want to your cart.',
        'Paste the code into the coupon/discount field before checking out.',
        `Check that the ${discount} discount shows up in the order summary.`,
      ],
      link: (brand) => [
        `Open the ${brand} offer with the button provided.`,
        'Check the products and conditions on the store page.',
        'Check the final price before completing your purchase.',
      ],
    },
    defaultCodeField: 'coupon/discount code field',
    codeFieldNote: (field) => <>Right field: {field}. Always check the order summary before paying.</>,
    defaultLinkNote:
      'This offer opens through the link provided and needs no code. Check the conditions in the store before paying.',
    aboutTitle: (brand) => `About ${brand}`,
    relatedTitle: 'Read before you buy',
    relatedType: { review: 'Review', post: 'Post' },
    faqTitle: {
      code: (offerTypePlural, brand) => `Frequently asked questions about ${brand} ${offerTypePlural}`,
      link: (offerTypePlural, brand) => `Frequently asked questions about ${brand} ${offerTypePlural}`,
    },
    historyTitle: (brand) => `${brand} coupon history`,
    historyIntro: (code) => <>Previous coupons used in this partnership. The current active coupon is {code}.</>,
    otherCouponsTitle: 'Other coupons',
    transparencyTitle: 'Transparency',
    transparency: {
      code: (offerType, code) => (
        <>
          This page may contain affiliate links. When you buy using the {offerType} {code} or open the store through the
          link provided, Em Casa com Cecília may earn a commission from the brand, at no extra cost to you.
        </>
      ),
      link: 'This page contains an affiliate link. When you open the offer and buy through the link provided, Em Casa com Cecília may earn a commission from the brand, at no extra cost to you.',
    },
    offerName: {
      code: ({ discount, brand, offerType, code }) => `${discount} at ${brand} with ${offerType} ${code}`,
      link: (discount, brand) => `${discount} at ${brand} through the link provided`,
    },
  },
  es: {
    dateLocale: 'es-ES',
    breadcrumbLabel: 'Estás en',
    homeLabel: 'Em Casa com Cecília',
    couponsLabel: 'Cupones',
    otherLanguagesLabel: 'Otros idiomas',
    offerType: { code: 'cupón', link: 'oferta' },
    offerTypePlural: { code: 'cupones', link: 'ofertas' },
    heroTitle: (offerType, brand) => `${capitalize(offerType)} ${brand}:`,
    heroCode: (code) => `con ${code}`,
    cutoutLabel: {
      code: (offerType, brand) => `Código del ${offerType} ${brand}`,
      link: (offerType, brand) => `Cómo acceder a la ${offerType} ${brand}`,
    },
    copyAndGo: 'Copiar e ir a la tienda',
    codeCopied: 'Código copiado',
    copyOnly: 'Solo copiar el código',
    copy: 'Copiar',
    copied: 'Copiado',
    copyCodeAria: (code) => `Copiar el código ${code}`,
    copiedStatus: (code) => `Código ${code} copiado.`,
    copiedAndOpenedStatus: (code) => `Código ${code} copiado. La tienda se abrió en otra pestaña.`,
    tiersSummary: (count, first, last) =>
      `${count} códigos: desde ${first.discount} en compras a partir de ${first.minPurchase} hasta ${last.discount} a partir de ${last.minPurchase}.`,
    chooseMyTier: 'Elegir mi tramo',
    chooseTier: 'Elegir tramo',
    goToStore: 'Ir a la tienda',
    viewOffer: 'Ver oferta',
    noCodeToCopy: 'Sin cupón que copiar: la oferta se abre con el enlace de Cecília.',
    seeReferralCode: 'Ver el código de referido',
    verifiedOn: (date) => `Comprobado el ${date}`,
    testedOn: (date) => `Cupón probado el ${date}`,
    testTitle: 'Cómo probamos el cupón',
    testedBy: (date) => `Probado por el equipo de Em Casa com Cecília el ${date}.`,
    highlight: {
      code: ({ offerType, brand, code, discount, scope, monthYear }) =>
        `${capitalize(offerType)} ${brand} actualizado: ${code} — ${discount} ${scope} (${monthYear}).`,
      link: ({ brand, discount, scope, monthYear }) => `Actualización de la oferta ${brand}: ${discount} ${scope} (${monthYear}).`,
      note: (note) => `${note}. Comprueba las condiciones y el precio final antes de pagar.`,
    },
    tiersTitle: (brand) => `Tramos de descuento de ${brand}`,
    tiersIntro:
      'Elige el código según el total de tu carrito: cuanto más alto sea el tramo que alcances, mayor será el descuento. Toca un código para copiarlo.',
    tiersCaption: (brand) => `Tramos de cupón ${brand}: descuento, compra mínima y código`,
    tiersHeaders: { discount: 'Descuento', code: 'Código' },
    tiersMinPurchase: (minPurchase) => `a partir de ${minPurchase}`,
    rulesTitle: 'Reglas sin letra pequeña',
    rules: {
      eligible: 'Válido para',
      combinable: '¿Se combina con otras promociones?',
      validity: 'Validez',
      reusable: 'Más de un uso',
      shipping: 'Envío',
    },
    referralVerified: (date) => `Comprobado el ${date}.`,
    campaignsTitle: (brand) => `Campañas activas de ${brand}`,
    openCampaign: (brand) => `Abrir la campaña en ${brand}`,
    campaignVerified: (date) => `Comprobada el ${date}.`,
    howToTitle: {
      code: (offerType, code) => `Cómo usar el ${offerType} ${code}`,
      link: (brand) => `Cómo acceder a la oferta de ${brand}`,
    },
    instructions: {
      code: ({ code, brand, discount }) => [
        `Copia el código ${code} de la tarjeta de arriba.`,
        `Entra en la tienda ${brand} con el botón indicado.`,
        'Añade al carrito los productos que quieras.',
        'Pega el código en el campo de cupón/descuento antes de pagar.',
        `Comprueba que el descuento de ${discount} aparece en el resumen del pedido.`,
      ],
      link: (brand) => [
        `Entra en la oferta de ${brand} con el botón indicado.`,
        'Revisa los productos y las condiciones en la página de la tienda.',
        'Comprueba el precio final antes de completar la compra.',
      ],
    },
    defaultCodeField: 'campo de cupón/descuento',
    codeFieldNote: (field) => <>Campo correcto: {field}. Revisa siempre el resumen del pedido antes de pagar.</>,
    defaultLinkNote:
      'Esta oferta se abre con el enlace indicado y no necesita código. Comprueba las condiciones en la tienda antes de pagar.',
    aboutTitle: (brand) => `Sobre ${brand}`,
    relatedTitle: 'Lee antes de comprar',
    relatedType: { review: 'Reseña', post: 'Post' },
    faqTitle: {
      code: (offerTypePlural, brand) => `Preguntas frecuentes sobre ${offerTypePlural} ${brand}`,
      link: (offerTypePlural, brand) => `Preguntas frecuentes sobre ${offerTypePlural} de ${brand}`,
    },
    historyTitle: (brand) => `Historial de cupones de ${brand}`,
    historyIntro: (code) => <>Cupones anteriores de esta colaboración. El cupón activo ahora es {code}.</>,
    otherCouponsTitle: 'Otros cupones',
    transparencyTitle: 'Transparencia',
    transparency: {
      code: (offerType, code) => (
        <>
          Esta página puede contener enlaces de afiliado. Cuando compras con el {offerType} {code} o entras en la tienda con
          el enlace indicado, Em Casa com Cecília puede recibir una comisión de la marca, sin coste adicional para ti.
        </>
      ),
      link: 'Esta página contiene un enlace de afiliado. Cuando entras en la oferta y compras con el enlace indicado, Em Casa com Cecília puede recibir una comisión de la marca, sin coste adicional para ti.',
    },
    offerName: {
      code: ({ discount, brand, offerType, code }) => `${discount} en ${brand} con ${offerType} ${code}`,
      link: (discount, brand) => `${discount} en ${brand} con el enlace indicado`,
    },
  },
  fr: {
    dateLocale: 'fr-FR',
    breadcrumbLabel: 'Vous êtes ici',
    homeLabel: 'Em Casa com Cecília',
    couponsLabel: 'Codes promo',
    otherLanguagesLabel: 'Autres langues',
    offerType: { code: 'code promo', link: 'offre' },
    offerTypePlural: { code: 'codes promo', link: 'offres' },
    heroTitle: (offerType, brand) => `${capitalize(offerType)} ${brand}${NBSP}:`,
    heroCode: (code) => `avec ${code}`,
    cutoutLabel: {
      code: (offerType, brand) => `${capitalize(offerType)} ${brand}`,
      link: (offerType, brand) => `Comment accéder à l'${offerType} ${brand}`,
    },
    copyAndGo: 'Copier et aller sur la boutique',
    codeCopied: 'Code copié',
    copyOnly: 'Copier seulement le code',
    copy: 'Copier',
    copied: 'Copié',
    copyCodeAria: (code) => `Copier le code ${code}`,
    copiedStatus: (code) => `Code ${code} copié.`,
    copiedAndOpenedStatus: (code) => `Code ${code} copié. La boutique s'est ouverte dans un nouvel onglet.`,
    tiersSummary: (count, first, last) =>
      `${count} codes${NBSP}: de ${first.discount} dès ${first.minPurchase} d'achat jusqu'à ${last.discount} dès ${last.minPurchase}.`,
    chooseMyTier: 'Choisir mon palier',
    chooseTier: 'Choisir un palier',
    goToStore: 'Aller sur la boutique',
    viewOffer: "Voir l'offre",
    noCodeToCopy: `Pas de code à copier${NBSP}: l'offre s'ouvre via le lien de Cecília.`,
    seeReferralCode: 'Voir le code de parrainage',
    verifiedOn: (date) => `Vérifié le ${date}`,
    testedOn: (date) => `Code promo testé le ${date}`,
    testTitle: 'Comment nous avons testé le code promo',
    testedBy: (date) => `Testé par l'équipe d'Em Casa com Cecília le ${date}.`,
    highlight: {
      code: ({ offerType, brand, code, discount, scope, monthYear }) =>
        `${capitalize(offerType)} ${brand} mis à jour${NBSP}: ${code} — ${discount} ${scope} (${monthYear}).`,
      link: ({ brand, discount, scope, monthYear }) => `Mise à jour de l'offre ${brand}${NBSP}: ${discount} ${scope} (${monthYear}).`,
      note: (note) => `${note}. Vérifiez les conditions et le prix final avant de valider.`,
    },
    tiersTitle: (brand) => `Paliers de réduction ${brand}`,
    tiersIntro: `Choisissez le code selon le total de votre panier${NBSP}: plus le palier atteint est élevé, plus la réduction est grande. Touchez un code pour le copier.`,
    tiersCaption: (brand) => `Paliers de code promo ${brand}${NBSP}: réduction, achat minimum et code`,
    tiersHeaders: { discount: 'Réduction', code: 'Code' },
    tiersMinPurchase: (minPurchase) => `dès ${minPurchase}`,
    rulesTitle: 'Les règles, sans petits caractères',
    rules: {
      eligible: 'Valable pour',
      combinable: `Cumulable avec d'autres promotions${NBSP}?`,
      validity: 'Validité',
      reusable: 'Plusieurs utilisations',
      shipping: 'Livraison',
    },
    referralVerified: (date) => `Vérifié le ${date}.`,
    campaignsTitle: (brand) => `Campagnes ${brand} en cours`,
    openCampaign: (brand) => `Ouvrir la campagne sur ${brand}`,
    campaignVerified: (date) => `Vérifiée le ${date}.`,
    howToTitle: {
      code: (offerType, code) => `Comment utiliser le ${offerType} ${code}`,
      link: (brand) => `Comment accéder à l'offre ${brand}`,
    },
    instructions: {
      code: ({ code, brand, discount }) => [
        `Copiez le code ${code} dans la carte ci-dessus.`,
        `Ouvrez la boutique ${brand} avec le bouton indiqué.`,
        'Ajoutez les produits souhaités au panier.',
        'Collez le code dans le champ code promo/réduction avant de valider.',
        `Vérifiez que la réduction de ${discount} apparaît dans le récapitulatif de la commande.`,
      ],
      link: (brand) => [
        `Ouvrez l'offre ${brand} avec le bouton indiqué.`,
        'Consultez les produits et les conditions sur la page de la boutique.',
        "Vérifiez le prix final avant de finaliser l'achat.",
      ],
    },
    defaultCodeField: 'champ code promo/réduction',
    codeFieldNote: (field) => (
      <>
        Bon champ{NBSP}: {field}. Vérifiez toujours le récapitulatif de la commande avant de payer.
      </>
    ),
    defaultLinkNote:
      "Cette offre s'ouvre via le lien indiqué et ne demande aucun code. Vérifiez les conditions sur la boutique avant de payer.",
    aboutTitle: (brand) => `À propos de ${brand}`,
    relatedTitle: "À lire avant d'acheter",
    relatedType: { review: 'Avis', post: 'Article' },
    faqTitle: {
      code: (offerTypePlural, brand) => `Questions fréquentes sur les ${offerTypePlural} ${brand}`,
      link: (offerTypePlural, brand) => `Questions fréquentes sur les ${offerTypePlural} ${brand}`,
    },
    historyTitle: (brand) => `Historique des codes promo ${brand}`,
    historyIntro: (code) => <>Codes promo déjà utilisés dans ce partenariat. Le code actif actuel est {code}.</>,
    otherCouponsTitle: 'Autres codes promo',
    transparencyTitle: 'Transparence',
    transparency: {
      code: (offerType, code) => (
        <>
          Cette page peut contenir des liens affiliés. Quand vous achetez avec le {offerType} {code} ou ouvrez la boutique via
          le lien indiqué, Em Casa com Cecília peut recevoir une commission de la marque, sans surcoût pour vous.
        </>
      ),
      link: "Cette page contient un lien affilié. Quand vous ouvrez l'offre et achetez via le lien indiqué, Em Casa com Cecília peut recevoir une commission de la marque, sans surcoût pour vous.",
    },
    offerName: {
      code: ({ discount, brand, offerType, code }) => `${discount} chez ${brand} avec le ${offerType} ${code}`,
      link: (discount, brand) => `${discount} chez ${brand} via le lien indiqué`,
    },
  },
  de: {
    dateLocale: 'de-DE',
    breadcrumbLabel: 'Du bist hier',
    homeLabel: 'Em Casa com Cecília',
    couponsLabel: 'Gutscheine',
    otherLanguagesLabel: 'Andere Sprachen',
    offerType: { code: 'Gutschein', link: 'Angebot' },
    offerTypePlural: { code: 'Gutscheine', link: 'Angebote' },
    heroTitle: (offerType, brand) => `${brand}-${offerType}:`,
    heroCode: (code) => `mit ${code}`,
    cutoutLabel: {
      code: (offerType, brand) => `Code für den ${brand}-${offerType}`,
      link: (offerType, brand) => `So nutzt du das ${brand}-${offerType}`,
    },
    copyAndGo: 'Kopieren und zum Shop',
    codeCopied: 'Code kopiert',
    copyOnly: 'Nur den Code kopieren',
    copy: 'Kopieren',
    copied: 'Kopiert',
    copyCodeAria: (code) => `Code ${code} kopieren`,
    copiedStatus: (code) => `Code ${code} kopiert.`,
    copiedAndOpenedStatus: (code) => `Code ${code} kopiert. Der Shop wurde in einem neuen Tab geöffnet.`,
    tiersSummary: (count, first, last) =>
      `${count} Codes: von ${first.discount} ab ${first.minPurchase} Einkaufswert bis ${last.discount} ab ${last.minPurchase}.`,
    chooseMyTier: 'Meine Stufe wählen',
    chooseTier: 'Stufe wählen',
    goToStore: 'Zum Shop',
    viewOffer: 'Angebot ansehen',
    noCodeToCopy: 'Kein Code zum Kopieren: Das Angebot öffnet sich über Cecílias Link.',
    seeReferralCode: 'Empfehlungscode ansehen',
    verifiedOn: (date) => `Geprüft am ${date}`,
    testedOn: (date) => `Gutschein getestet am ${date}`,
    testTitle: 'So haben wir den Gutschein getestet',
    testedBy: (date) => `Getestet vom Team von Em Casa com Cecília am ${date}.`,
    highlight: {
      code: ({ offerType, brand, code, discount, scope, monthYear }) =>
        `${brand}-${offerType} aktualisiert: ${code} — ${discount} ${scope} (${monthYear}).`,
      link: ({ brand, discount, scope, monthYear }) => `Update zum ${brand}-Angebot: ${discount} ${scope} (${monthYear}).`,
      note: (note) => `${note}. Prüfe die Bedingungen und den Endpreis, bevor du bestellst.`,
    },
    tiersTitle: (brand) => `${brand}-Rabattstufen`,
    tiersIntro:
      'Wähle den Code passend zu deinem Warenkorbwert – je höher die erreichte Stufe, desto größer der Rabatt. Tippe auf einen Code, um ihn zu kopieren.',
    tiersCaption: (brand) => `${brand}-Gutscheinstufen: Rabatt, Mindestbestellwert und Code`,
    tiersHeaders: { discount: 'Rabatt', code: 'Code' },
    tiersMinPurchase: (minPurchase) => `ab ${minPurchase}`,
    rulesTitle: 'Regeln ohne Kleingedrucktes',
    rules: {
      eligible: 'Gilt für',
      combinable: 'Mit anderen Aktionen kombinierbar?',
      validity: 'Gültigkeit',
      reusable: 'Mehrfach nutzbar',
      shipping: 'Versand',
    },
    referralVerified: (date) => `Geprüft am ${date}.`,
    campaignsTitle: (brand) => `Aktuelle ${brand}-Aktionen`,
    openCampaign: (brand) => `Aktion bei ${brand} öffnen`,
    campaignVerified: (date) => `Geprüft am ${date}.`,
    howToTitle: {
      code: (offerType, code) => `So nutzt du den ${offerType} ${code}`,
      link: (brand) => `So nutzt du das ${brand}-Angebot`,
    },
    instructions: {
      code: ({ code, brand, discount }) => [
        `Kopiere den Code ${code} aus der Karte oben.`,
        `Öffne den ${brand}-Shop über den angegebenen Button.`,
        'Lege die gewünschten Produkte in den Warenkorb.',
        'Füge den Code vor dem Bezahlen in das Gutschein-/Rabattfeld ein.',
        `Prüfe, ob der Rabatt von ${discount} in der Bestellübersicht erscheint.`,
      ],
      link: (brand) => [
        `Öffne das ${brand}-Angebot über den angegebenen Button.`,
        'Sieh dir Produkte und Bedingungen auf der Shopseite an.',
        'Prüfe den Endpreis, bevor du den Kauf abschließt.',
      ],
    },
    defaultCodeField: 'Gutschein-/Rabattfeld',
    codeFieldNote: (field) => <>Richtiges Feld: {field}. Prüfe vor dem Bezahlen immer die Bestellübersicht.</>,
    defaultLinkNote:
      'Dieses Angebot öffnet sich über den angegebenen Link und braucht keinen Code. Prüfe die Bedingungen im Shop, bevor du bezahlst.',
    aboutTitle: (brand) => `Über ${brand}`,
    relatedTitle: 'Vor dem Kauf lesen',
    relatedType: { review: 'Test', post: 'Beitrag' },
    // "zu" verlangt den Dativ ("zu SHEIN-Angeboten"); mit Doppelpunkt bleibt der Plural im Nominativ.
    faqTitle: {
      code: (offerTypePlural, brand) => `${brand}-${offerTypePlural}: häufige Fragen`,
      link: (offerTypePlural, brand) => `${brand}-${offerTypePlural}: häufige Fragen`,
    },
    historyTitle: (brand) => `Bisherige ${brand}-Gutscheine`,
    historyIntro: (code) => <>Frühere Gutscheine aus dieser Partnerschaft. Der aktuell gültige Gutschein ist {code}.</>,
    otherCouponsTitle: 'Weitere Gutscheine',
    transparencyTitle: 'Transparenz',
    transparency: {
      code: (offerType, code) => (
        <>
          Diese Seite kann Affiliate-Links enthalten. Wenn du mit dem {offerType} {code} einkaufst oder den Shop über den
          angegebenen Link öffnest, kann Em Casa com Cecília eine Provision von der Marke erhalten – ohne Mehrkosten für dich.
        </>
      ),
      link: 'Diese Seite enthält einen Affiliate-Link. Wenn du das Angebot über den angegebenen Link öffnest und dort einkaufst, kann Em Casa com Cecília eine Provision von der Marke erhalten – ohne Mehrkosten für dich.',
    },
    offerName: {
      code: ({ discount, brand, offerType, code }) => `${discount} bei ${brand} mit ${offerType} ${code}`,
      link: (discount, brand) => `${discount} bei ${brand} über den angegebenen Link`,
    },
  },
  it: {
    dateLocale: 'it-IT',
    breadcrumbLabel: 'Sei qui',
    homeLabel: 'Em Casa com Cecília',
    couponsLabel: 'Coupon',
    otherLanguagesLabel: 'Altre lingue',
    offerType: { code: 'coupon', link: 'offerta' },
    offerTypePlural: { code: 'coupon', link: 'offerte' },
    heroTitle: (offerType, brand) => `${capitalize(offerType)} ${brand}:`,
    heroCode: (code) => `con ${code}`,
    cutoutLabel: {
      code: (offerType, brand) => `Codice del ${offerType} ${brand}`,
      link: (offerType, brand) => `Come accedere all'${offerType} ${brand}`,
    },
    copyAndGo: 'Copia e vai al negozio',
    codeCopied: 'Codice copiato',
    copyOnly: 'Copia solo il codice',
    copy: 'Copia',
    copied: 'Copiato',
    copyCodeAria: (code) => `Copia il codice ${code}`,
    copiedStatus: (code) => `Codice ${code} copiato.`,
    copiedAndOpenedStatus: (code) => `Codice ${code} copiato. Il negozio si è aperto in un'altra scheda.`,
    tiersSummary: (count, first, last) =>
      `${count} codici: da ${first.discount} per acquisti da ${first.minPurchase} fino a ${last.discount} da ${last.minPurchase}.`,
    chooseMyTier: 'Scegli la mia fascia',
    chooseTier: 'Scegli la fascia',
    goToStore: 'Vai al negozio',
    viewOffer: "Vedi l'offerta",
    noCodeToCopy: "Nessun coupon da copiare: l'offerta si apre con il link di Cecília.",
    seeReferralCode: 'Vedi il codice invito',
    verifiedOn: (date) => `Verificato il ${date}`,
    testedOn: (date) => `Coupon testato il ${date}`,
    testTitle: 'Come abbiamo testato il coupon',
    testedBy: (date) => `Testato dal team di Em Casa com Cecília il ${date}.`,
    highlight: {
      code: ({ offerType, brand, code, discount, scope, monthYear }) =>
        `${capitalize(offerType)} ${brand} aggiornato: ${code} — ${discount} ${scope} (${monthYear}).`,
      link: ({ brand, discount, scope, monthYear }) => `Aggiornamento dell'offerta ${brand}: ${discount} ${scope} (${monthYear}).`,
      note: (note) => `${note}. Controlla le condizioni e il prezzo finale prima di concludere.`,
    },
    tiersTitle: (brand) => `Fasce di sconto ${brand}`,
    tiersIntro:
      'Scegli il codice in base al totale del carrello: più alta è la fascia raggiunta, maggiore è lo sconto. Tocca un codice per copiarlo.',
    tiersCaption: (brand) => `Fasce coupon ${brand}: sconto, acquisto minimo e codice`,
    tiersHeaders: { discount: 'Sconto', code: 'Codice' },
    tiersMinPurchase: (minPurchase) => `da ${minPurchase}`,
    rulesTitle: 'Regole senza clausole nascoste',
    rules: {
      eligible: 'Valido per',
      combinable: 'Cumulabile con altre promozioni?',
      validity: 'Validità',
      reusable: 'Più di un utilizzo',
      shipping: 'Spedizione',
    },
    referralVerified: (date) => `Verificato il ${date}.`,
    campaignsTitle: (brand) => `Campagne ${brand} attive`,
    openCampaign: (brand) => `Apri la campagna su ${brand}`,
    campaignVerified: (date) => `Verificata il ${date}.`,
    howToTitle: {
      code: (offerType, code) => `Come usare il ${offerType} ${code}`,
      link: (brand) => `Come accedere all'offerta ${brand}`,
    },
    instructions: {
      code: ({ code, brand, discount }) => [
        `Copia il codice ${code} dalla scheda qui sopra.`,
        `Apri il negozio ${brand} con il pulsante indicato.`,
        'Aggiungi al carrello i prodotti che vuoi.',
        'Incolla il codice nel campo coupon/sconto prima di concludere.',
        `Controlla che lo sconto di ${discount} compaia nel riepilogo dell'ordine.`,
      ],
      link: (brand) => [
        `Apri l'offerta ${brand} con il pulsante indicato.`,
        'Controlla i prodotti e le condizioni nella pagina del negozio.',
        "Verifica il prezzo finale prima di completare l'acquisto.",
      ],
    },
    defaultCodeField: 'campo coupon/sconto',
    codeFieldNote: (field) => <>Campo giusto: {field}. Controlla sempre il riepilogo dell&apos;ordine prima di pagare.</>,
    defaultLinkNote:
      'Questa offerta si apre con il link indicato e non richiede codici. Controlla le condizioni nel negozio prima di pagare.',
    aboutTitle: (brand) => `Informazioni su ${brand}`,
    relatedTitle: 'Da leggere prima di comprare',
    relatedType: { review: 'Recensione', post: 'Articolo' },
    faqTitle: {
      code: (offerTypePlural, brand) => `Domande frequenti sui ${offerTypePlural} ${brand}`,
      link: (offerTypePlural, brand) => `Domande frequenti sulle ${offerTypePlural} ${brand}`,
    },
    historyTitle: (brand) => `Storico dei coupon ${brand}`,
    historyIntro: (code) => <>Coupon già usati in questa collaborazione. Il coupon attivo adesso è {code}.</>,
    otherCouponsTitle: 'Altri coupon',
    transparencyTitle: 'Trasparenza',
    transparency: {
      code: (offerType, code) => (
        <>
          Questa pagina può contenere link di affiliazione. Quando acquisti con il {offerType} {code} o apri il negozio dal
          link indicato, Em Casa com Cecília può ricevere una commissione dal marchio, senza costi aggiuntivi per te.
        </>
      ),
      link: "Questa pagina contiene un link di affiliazione. Quando apri l'offerta e acquisti dal link indicato, Em Casa com Cecília può ricevere una commissione dal marchio, senza costi aggiuntivi per te.",
    },
    offerName: {
      code: ({ discount, brand, offerType, code }) => `${discount} su ${brand} con il ${offerType} ${code}`,
      link: (discount, brand) => `${discount} su ${brand} con il link indicato`,
    },
  },
  ko: {
    dateLocale: 'ko-KR',
    breadcrumbLabel: '현재 위치',
    homeLabel: 'Em Casa com Cecília',
    couponsLabel: '쿠폰',
    otherLanguagesLabel: '다른 언어',
    offerType: { code: '쿠폰', link: '혜택' },
    offerTypePlural: { code: '쿠폰', link: '혜택' },
    heroTitle: (offerType, brand) => `${brand} ${offerType}:`,
    heroCode: (code) => `코드 ${code}`,
    cutoutLabel: {
      code: (offerType, brand) => `${brand} ${offerType} 코드`,
      link: (offerType, brand) => `${brand} ${offerType} 이용 방법`,
    },
    copyAndGo: '복사하고 스토어로 이동',
    codeCopied: '코드 복사 완료',
    copyOnly: '코드만 복사',
    copy: '복사',
    copied: '복사 완료',
    copyCodeAria: (code) => `코드 ${code} 복사`,
    copiedStatus: (code) => `코드 ${code} 복사 완료.`,
    copiedAndOpenedStatus: (code) => `코드 ${code} 복사 완료. 스토어가 새 탭에서 열렸습니다.`,
    tiersSummary: (count, first, last) =>
      `코드 ${count}개: ${first.minPurchase} 이상 구매 시 ${first.discount}부터 ${last.minPurchase} 이상 구매 시 ${last.discount}까지.`,
    chooseMyTier: '내 구간 선택',
    chooseTier: '구간 선택',
    goToStore: '스토어로 이동',
    viewOffer: '혜택 보기',
    noCodeToCopy: '복사할 쿠폰이 없습니다. Cecília의 링크로 혜택이 열립니다.',
    seeReferralCode: '추천 코드 보기',
    verifiedOn: (date) => `${date} 확인`,
    testedOn: (date) => `${date} 쿠폰 테스트 완료`,
    testTitle: '쿠폰 테스트 방법',
    testedBy: (date) => `Em Casa com Cecília 팀이 ${date}에 테스트했습니다.`,
    highlight: {
      code: ({ offerType, brand, code, discount, scope, monthYear }) =>
        `${brand} ${offerType} 업데이트: ${code} — ${discount} ${scope} (${monthYear}).`,
      link: ({ brand, discount, scope, monthYear }) => `${brand} 혜택 업데이트: ${discount} ${scope} (${monthYear}).`,
      note: (note) => `${note}. 결제 전에 조건과 최종 금액을 확인하세요.`,
    },
    tiersTitle: (brand) => `${brand} 할인 구간`,
    tiersIntro: '장바구니 총액에 맞는 코드를 고르세요. 높은 구간일수록 할인도 커집니다. 코드를 누르면 복사됩니다.',
    tiersCaption: (brand) => `${brand} 쿠폰 구간: 할인, 최소 구매 금액, 코드`,
    tiersHeaders: { discount: '할인', code: '코드' },
    tiersMinPurchase: (minPurchase) => `${minPurchase} 이상`,
    rulesTitle: '숨은 조건 없는 이용 규칙',
    rules: {
      eligible: '적용 대상',
      combinable: '다른 프로모션과 중복 적용되나요?',
      validity: '유효기간',
      reusable: '여러 번 사용',
      shipping: '배송비',
    },
    referralVerified: (date) => `${date} 확인.`,
    campaignsTitle: (brand) => `진행 중인 ${brand} 캠페인`,
    openCampaign: (brand) => `${brand}에서 캠페인 열기`,
    campaignVerified: (date) => `${date} 확인.`,
    howToTitle: {
      code: (offerType, code) => `${offerType} ${code} 사용 방법`,
      link: (brand) => `${brand} 혜택 이용 방법`,
    },
    instructions: {
      code: ({ code, brand, discount }) => [
        `위 카드에서 ${code} 코드를 복사하세요.`,
        `안내된 버튼으로 ${brand} 스토어에 접속하세요.`,
        '원하는 상품을 장바구니에 담으세요.',
        '결제 전에 쿠폰/할인 코드 입력란에 코드를 붙여넣으세요.',
        `주문 요약에 ${discount} 할인이 적용되었는지 확인하세요.`,
      ],
      link: (brand) => [
        `안내된 버튼으로 ${brand} 혜택 페이지를 여세요.`,
        '스토어 페이지에서 상품과 조건을 확인하세요.',
        '구매를 완료하기 전에 최종 금액을 확인하세요.',
      ],
    },
    defaultCodeField: '쿠폰/할인 코드 입력란',
    codeFieldNote: (field) => <>입력란: {field}. 결제 전에 항상 주문 요약을 확인하세요.</>,
    defaultLinkNote: '이 혜택은 안내된 링크로 열리며 코드가 필요하지 않습니다. 결제 전에 스토어에서 조건을 확인하세요.',
    aboutTitle: (brand) => `${brand} 소개`,
    relatedTitle: '구매 전에 읽어 보세요',
    relatedType: { review: '리뷰', post: '포스트' },
    faqTitle: {
      code: (offerTypePlural, brand) => `${brand} ${offerTypePlural} 자주 묻는 질문`,
      link: (offerTypePlural, brand) => `${brand} ${offerTypePlural} 자주 묻는 질문`,
    },
    historyTitle: (brand) => `${brand} 쿠폰 이력`,
    historyIntro: (code) => <>이 파트너십에서 사용된 이전 쿠폰입니다. 현재 사용 가능한 쿠폰은 {code}입니다.</>,
    otherCouponsTitle: '다른 쿠폰',
    transparencyTitle: '투명성 안내',
    transparency: {
      code: (offerType, code) => (
        <>
          이 페이지에는 제휴 링크가 포함될 수 있습니다. {offerType} {code} 사용 또는 안내된 링크를 통한 구매 시 Em Casa com
          Cecília가 브랜드로부터 수수료를 받을 수 있으며, 추가 비용은 없습니다.
        </>
      ),
      link: '이 페이지에는 제휴 링크가 포함되어 있습니다. 안내된 링크로 혜택에 접속해 구매하면 Em Casa com Cecília가 브랜드로부터 수수료를 받을 수 있으며, 추가 비용은 없습니다.',
    },
    offerName: {
      code: ({ discount, brand, offerType, code }) => `${brand} ${offerType} ${code}: ${discount}`,
      link: (discount, brand) => `${brand}: ${discount} (안내된 링크)`,
    },
  },
  ja: {
    dateLocale: 'ja-JP',
    breadcrumbLabel: '現在位置',
    homeLabel: 'Em Casa com Cecília',
    couponsLabel: 'クーポン',
    otherLanguagesLabel: 'ほかの言語',
    offerType: { code: 'クーポン', link: 'オファー' },
    offerTypePlural: { code: 'クーポン', link: 'オファー' },
    heroTitle: (offerType, brand) => `${brand} の${offerType}：`,
    heroCode: (code) => `コード ${code}`,
    cutoutLabel: {
      code: (offerType, brand) => `${brand} の${offerType}コード`,
      link: (offerType, brand) => `${brand} の${offerType}の使い方`,
    },
    copyAndGo: 'コピーしてストアへ',
    codeCopied: 'コードをコピーしました',
    copyOnly: 'コードだけコピー',
    copy: 'コピー',
    copied: 'コピー済み',
    copyCodeAria: (code) => `コード ${code} をコピー`,
    copiedStatus: (code) => `コード ${code} をコピーしました。`,
    copiedAndOpenedStatus: (code) => `コード ${code} をコピーしました。ストアが新しいタブで開きました。`,
    tiersSummary: (count, first, last) =>
      `コード${count}種類：${first.minPurchase}以上で${first.discount}から、${last.minPurchase}以上で${last.discount}まで。`,
    chooseMyTier: '自分の金額帯を選ぶ',
    chooseTier: '金額帯を選ぶ',
    goToStore: 'ストアへ',
    viewOffer: 'オファーを見る',
    noCodeToCopy: 'コピーするクーポンはありません。Cecília のリンクからオファーが開きます。',
    seeReferralCode: '紹介コードを見る',
    verifiedOn: (date) => `${date}に確認`,
    testedOn: (date) => `${date}にクーポンをテスト済み`,
    testTitle: 'クーポンのテスト方法',
    testedBy: (date) => `Em Casa com Cecília チームが${date}にテストしました。`,
    highlight: {
      code: ({ offerType, brand, code, discount, scope, monthYear }) =>
        `${brand} の${offerType}を更新：${code} — ${discount} ${scope}（${monthYear}）。`,
      link: ({ brand, discount, scope, monthYear }) => `${brand} のオファーを更新：${discount} ${scope}（${monthYear}）。`,
      note: (note) => `${note}。お支払い前に条件と最終金額をご確認ください。`,
    },
    tiersTitle: (brand) => `${brand} の割引金額帯`,
    tiersIntro:
      'カートの合計金額に合ったコードを選んでください。到達した金額帯が高いほど割引も大きくなります。コードをタップするとコピーできます。',
    tiersCaption: (brand) => `${brand} のクーポン金額帯：割引、最低購入金額、コード`,
    tiersHeaders: { discount: '割引', code: 'コード' },
    tiersMinPurchase: (minPurchase) => `${minPurchase}以上`,
    rulesTitle: '細かい字のない利用条件',
    rules: {
      eligible: '対象',
      combinable: 'ほかのキャンペーンと併用できる？',
      validity: '有効期限',
      reusable: '複数回の利用',
      shipping: '送料',
    },
    referralVerified: (date) => `${date}に確認。`,
    campaignsTitle: (brand) => `開催中の ${brand} キャンペーン`,
    openCampaign: (brand) => `${brand} でキャンペーンを開く`,
    campaignVerified: (date) => `${date}に確認。`,
    howToTitle: {
      code: (offerType, code) => `${offerType} ${code} の使い方`,
      link: (brand) => `${brand} のオファーの使い方`,
    },
    instructions: {
      code: ({ code, brand, discount }) => [
        `上のカードからコード ${code} をコピーします。`,
        `案内のボタンから ${brand} のストアを開きます。`,
        '欲しい商品をカートに入れます。',
        'お支払い前に、クーポン／割引コードの入力欄にコードを貼り付けます。',
        `注文内容の確認画面に ${discount} の割引が反映されているか確認します。`,
      ],
      link: (brand) => [
        `案内のボタンから ${brand} のオファーを開きます。`,
        'ストアのページで商品と条件を確認します。',
        '購入を確定する前に最終金額を確認します。',
      ],
    },
    defaultCodeField: 'クーポン／割引コードの入力欄',
    codeFieldNote: (field) => <>入力欄：{field}。お支払い前に必ず注文内容をご確認ください。</>,
    defaultLinkNote: 'このオファーは案内のリンクから開き、コードは不要です。お支払い前にストアで条件をご確認ください。',
    aboutTitle: (brand) => `${brand} について`,
    relatedTitle: '購入前に読む',
    relatedType: { review: 'レビュー', post: '記事' },
    faqTitle: {
      code: (offerTypePlural, brand) => `${brand} の${offerTypePlural}に関するよくある質問`,
      link: (offerTypePlural, brand) => `${brand} の${offerTypePlural}に関するよくある質問`,
    },
    historyTitle: (brand) => `${brand} のクーポン履歴`,
    historyIntro: (code) => <>このパートナーシップで使われた過去のクーポンです。現在有効なクーポンは {code} です。</>,
    otherCouponsTitle: 'ほかのクーポン',
    transparencyTitle: '透明性について',
    transparency: {
      // Em JSX a quebra de linha vira espaço, que sobraria entre as frases em japonês: fica numa linha só.
      code: (offerType, code) => (
        <>このページにはアフィリエイトリンクが含まれる場合があります。{offerType} {code} を使って購入したり、案内のリンクからストアを開いたりすると、Em Casa com Cecília がブランドから報酬を受け取ることがあります。お客様の追加負担はありません。</>
      ),
      link: 'このページにはアフィリエイトリンクが含まれています。案内のリンクからオファーを開いて購入すると、Em Casa com Cecília がブランドから報酬を受け取ることがあります。お客様の追加負担はありません。',
    },
    offerName: {
      code: ({ discount, brand, offerType, code }) => `${brand} の${offerType} ${code}：${discount}`,
      link: (discount, brand) => `${brand}：${discount}（案内のリンク経由）`,
    },
  },
  'zh-hant': {
    dateLocale: 'zh-HK',
    breadcrumbLabel: '目前位置',
    homeLabel: 'Em Casa com Cecília',
    couponsLabel: '優惠碼',
    otherLanguagesLabel: '其他語言',
    offerType: { code: '優惠碼', link: '優惠' },
    offerTypePlural: { code: '優惠碼', link: '優惠' },
    heroTitle: (offerType, brand) => `${brand} ${offerType}：`,
    heroCode: (code) => `使用 ${code}`,
    cutoutLabel: {
      code: (offerType, brand) => `${brand} ${offerType}`,
      link: (offerType, brand) => `如何取得 ${brand} ${offerType}`,
    },
    copyAndGo: '複製並前往商店',
    codeCopied: '已複製代碼',
    copyOnly: '只複製代碼',
    copy: '複製',
    copied: '已複製',
    copyCodeAria: (code) => `複製代碼 ${code}`,
    copiedStatus: (code) => `已複製代碼 ${code}。`,
    copiedAndOpenedStatus: (code) => `已複製代碼 ${code}。商店已在新分頁開啟。`,
    tiersSummary: (count, first, last) =>
      `共 ${count} 個代碼：消費滿 ${first.minPurchase} 減 ${first.discount}，最高消費滿 ${last.minPurchase} 減 ${last.discount}。`,
    chooseMyTier: '選擇我的級別',
    chooseTier: '選擇級別',
    goToStore: '前往商店',
    viewOffer: '查看優惠',
    noCodeToCopy: '無需複製優惠碼：優惠會透過 Cecília 的連結開啟。',
    seeReferralCode: '查看推薦碼',
    verifiedOn: (date) => `已於 ${date} 核實`,
    testedOn: (date) => `已於 ${date} 測試優惠碼`,
    testTitle: '我們如何測試優惠碼',
    testedBy: (date) => `Em Casa com Cecília 團隊於 ${date} 測試。`,
    highlight: {
      code: ({ offerType, brand, code, discount, scope, monthYear }) =>
        `${brand} ${offerType}已更新：${code} — ${discount} ${scope}（${monthYear}）。`,
      link: ({ brand, discount, scope, monthYear }) => `${brand} 優惠更新：${discount} ${scope}（${monthYear}）。`,
      note: (note) => `${note}。付款前請確認條件及最終金額。`,
    },
    tiersTitle: (brand) => `${brand} 折扣級別`,
    tiersIntro: '請按購物車總額選擇代碼：達到的級別越高，折扣越多。點按代碼即可複製。',
    tiersCaption: (brand) => `${brand} 優惠碼級別：折扣、最低消費及代碼`,
    tiersHeaders: { discount: '折扣', code: '代碼' },
    tiersMinPurchase: (minPurchase) => `滿 ${minPurchase}`,
    rulesTitle: '沒有細字的使用規則',
    rules: {
      eligible: '適用範圍',
      combinable: '可否與其他優惠同時使用？',
      validity: '有效期',
      reusable: '可否重複使用',
      shipping: '運費',
    },
    referralVerified: (date) => `已於 ${date} 核實。`,
    campaignsTitle: (brand) => `${brand} 進行中的活動`,
    openCampaign: (brand) => `在 ${brand} 開啟活動`,
    campaignVerified: (date) => `已於 ${date} 核實。`,
    howToTitle: {
      code: (offerType, code) => `如何使用${offerType} ${code}`,
      link: (brand) => `如何取得 ${brand} 優惠`,
    },
    instructions: {
      code: ({ code, brand, discount }) => [
        `在上方卡片複製代碼 ${code}。`,
        `透過指定按鈕前往 ${brand} 商店。`,
        '把想買的商品加入購物車。',
        '結帳前，把代碼貼到優惠碼／折扣欄位。',
        `確認訂單摘要已顯示 ${discount} 折扣。`,
      ],
      link: (brand) => [
        `透過指定按鈕開啟 ${brand} 優惠。`,
        '在商店頁面查看商品及條件。',
        '完成購買前確認最終金額。',
      ],
    },
    defaultCodeField: '優惠碼／折扣欄位',
    codeFieldNote: (field) => <>正確欄位：{field}。付款前請務必確認訂單摘要。</>,
    defaultLinkNote: '此優惠透過指定連結開啟，無需代碼。付款前請在商店確認條件。',
    aboutTitle: (brand) => `關於 ${brand}`,
    relatedTitle: '購買前先看',
    relatedType: { review: '評測', post: '文章' },
    faqTitle: {
      code: (offerTypePlural, brand) => `${brand} ${offerTypePlural}常見問題`,
      link: (offerTypePlural, brand) => `${brand} ${offerTypePlural}常見問題`,
    },
    historyTitle: (brand) => `${brand} 優惠碼紀錄`,
    historyIntro: (code) => <>此合作過往使用過的優惠碼。目前有效的優惠碼是 {code}。</>,
    otherCouponsTitle: '其他優惠碼',
    transparencyTitle: '透明聲明',
    transparency: {
      code: (offerType, code) => (
        <>
          此頁面可能包含聯盟連結。當你使用{offerType} {code} 購物，或透過指定連結前往商店，Em Casa com Cecília
          可能會從品牌獲得佣金，你無需支付額外費用。
        </>
      ),
      link: '此頁面包含聯盟連結。當你透過指定連結開啟優惠並購物，Em Casa com Cecília 可能會從品牌獲得佣金，你無需支付額外費用。',
    },
    offerName: {
      code: ({ discount, brand, offerType, code }) => `${brand} ${offerType} ${code}：${discount}`,
      link: (discount, brand) => `${brand}：${discount}（透過指定連結）`,
    },
  },
  'zh-hans': {
    dateLocale: 'zh-CN',
    breadcrumbLabel: '当前位置',
    homeLabel: 'Em Casa com Cecília',
    couponsLabel: '优惠码',
    otherLanguagesLabel: '其他语言',
    offerType: { code: '优惠码', link: '优惠' },
    offerTypePlural: { code: '优惠码', link: '优惠' },
    heroTitle: (offerType, brand) => `${brand} ${offerType}：`,
    heroCode: (code) => `使用 ${code}`,
    cutoutLabel: {
      code: (offerType, brand) => `${brand} ${offerType}`,
      link: (offerType, brand) => `如何获取 ${brand} ${offerType}`,
    },
    copyAndGo: '复制并前往商店',
    codeCopied: '已复制代码',
    copyOnly: '只复制代码',
    copy: '复制',
    copied: '已复制',
    copyCodeAria: (code) => `复制代码 ${code}`,
    copiedStatus: (code) => `已复制代码 ${code}。`,
    copiedAndOpenedStatus: (code) => `已复制代码 ${code}。商店已在新标签页打开。`,
    tiersSummary: (count, first, last) =>
      `共 ${count} 个代码：满 ${first.minPurchase} 减 ${first.discount}，最高满 ${last.minPurchase} 减 ${last.discount}。`,
    chooseMyTier: '选择我的档位',
    chooseTier: '选择档位',
    goToStore: '前往商店',
    viewOffer: '查看优惠',
    noCodeToCopy: '无需复制优惠码：优惠会通过 Cecília 的链接打开。',
    seeReferralCode: '查看推荐码',
    verifiedOn: (date) => `已于 ${date} 核实`,
    testedOn: (date) => `已于 ${date} 测试优惠码`,
    testTitle: '我们如何测试优惠码',
    testedBy: (date) => `Em Casa com Cecília 团队于 ${date} 测试。`,
    highlight: {
      code: ({ offerType, brand, code, discount, scope, monthYear }) =>
        `${brand} ${offerType}已更新：${code} — ${discount} ${scope}（${monthYear}）。`,
      link: ({ brand, discount, scope, monthYear }) => `${brand} 优惠更新：${discount} ${scope}（${monthYear}）。`,
      note: (note) => `${note}。付款前请确认条件和最终金额。`,
    },
    tiersTitle: (brand) => `${brand} 折扣档位`,
    tiersIntro: '请根据购物车总额选择代码：达到的档位越高，折扣越大。点击代码即可复制。',
    tiersCaption: (brand) => `${brand} 优惠码档位：折扣、最低消费和代码`,
    tiersHeaders: { discount: '折扣', code: '代码' },
    tiersMinPurchase: (minPurchase) => `满 ${minPurchase}`,
    rulesTitle: '没有小字的使用规则',
    rules: {
      eligible: '适用范围',
      combinable: '能否与其他优惠叠加？',
      validity: '有效期',
      reusable: '能否重复使用',
      shipping: '运费',
    },
    referralVerified: (date) => `已于 ${date} 核实。`,
    campaignsTitle: (brand) => `${brand} 进行中的活动`,
    openCampaign: (brand) => `在 ${brand} 打开活动`,
    campaignVerified: (date) => `已于 ${date} 核实。`,
    howToTitle: {
      code: (offerType, code) => `如何使用${offerType} ${code}`,
      link: (brand) => `如何获取 ${brand} 优惠`,
    },
    instructions: {
      code: ({ code, brand, discount }) => [
        `在上方卡片复制代码 ${code}。`,
        `通过指定按钮前往 ${brand} 商店。`,
        '把想买的商品加入购物车。',
        '结账前，把代码粘贴到优惠码／折扣栏。',
        `确认订单摘要中已显示 ${discount} 折扣。`,
      ],
      link: (brand) => [
        `通过指定按钮打开 ${brand} 优惠。`,
        '在商店页面查看商品和条件。',
        '完成购买前确认最终金额。',
      ],
    },
    defaultCodeField: '优惠码／折扣栏',
    codeFieldNote: (field) => <>正确栏位：{field}。付款前请务必确认订单摘要。</>,
    defaultLinkNote: '此优惠通过指定链接打开，无需代码。付款前请在商店确认条件。',
    aboutTitle: (brand) => `关于 ${brand}`,
    relatedTitle: '购买前先看',
    relatedType: { review: '测评', post: '文章' },
    faqTitle: {
      code: (offerTypePlural, brand) => `${brand} ${offerTypePlural}常见问题`,
      link: (offerTypePlural, brand) => `${brand} ${offerTypePlural}常见问题`,
    },
    historyTitle: (brand) => `${brand} 优惠码记录`,
    historyIntro: (code) => <>此合作以往使用过的优惠码。当前有效的优惠码是 {code}。</>,
    otherCouponsTitle: '其他优惠码',
    transparencyTitle: '透明声明',
    transparency: {
      code: (offerType, code) => (
        <>
          此页面可能包含联盟链接。当你使用{offerType} {code} 购物，或通过指定链接前往商店时，Em Casa com Cecília
          可能会从品牌获得佣金，你无需支付额外费用。
        </>
      ),
      link: '此页面包含联盟链接。当你通过指定链接打开优惠并购物时，Em Casa com Cecília 可能会从品牌获得佣金，你无需支付额外费用。',
    },
    offerName: {
      code: ({ discount, brand, offerType, code }) => `${brand} ${offerType} ${code}：${discount}`,
      link: (discount, brand) => `${brand}：${discount}（通过指定链接）`,
    },
  },
};
