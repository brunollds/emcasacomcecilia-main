import type { ReactNode } from 'react';
import type { Locale } from '@/lib/i18n/locales';

type TierLimit = { discount: string; minPurchase: string };

// O que a página de loja escreve em volta dos dados da marca. Descrição, regras, FAQ e passos
// próprios da marca vêm de couponsData.
export type CouponStoreCopy = {
  // Idioma passado ao toLocaleDateString.
  dateLocale: string;
  breadcrumbLabel: string;
  homeLabel: string;
  couponsLabel: string;
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

export const COUPON_STORE_COPY = {
  pt: {
    dateLocale: 'pt-BR',
    breadcrumbLabel: 'Você está em',
    homeLabel: 'Início',
    couponsLabel: 'Cupons',
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
} satisfies Partial<Record<Locale, CouponStoreCopy>>;

export type CouponStoreLocale = keyof typeof COUPON_STORE_COPY;
