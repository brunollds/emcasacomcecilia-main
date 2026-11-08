import type { TranslatedLocale } from '@/lib/couponTranslations';

// Textos do /faq de cada idioma fora do português (/<locale>/faq). FAQ_SOURCE_PT é a fonte: o texto em
// português já adaptado para quem chega de fora (sem Brasil, sem páginas que só existem em PT). As
// traduções ficam em LOCALE_FAQ_COPY, com a mesma forma.
//
// Os 4 itens que a home do idioma já tem ({ home }) não se repetem aqui: o pergunta e a resposta saem de
// localeHomeCopy.ts, com os mesmos marcadores ({name}, {since}, {stores}, {email}) preenchidos.
//
// Os marcadores {email} e os destinos dos links são trocados ao montar a página (src/lib/faqPage.ts): o
// destino "coupons" é o hub do idioma, "reviews" a lista de artigos, "yesstyle" a página da YesStyle, "shein" a da SHEIN e
// "email" o e-mail de contato. O "mediaKit" é o mídia kit em português.

export type FaqLinkTarget = 'coupons' | 'reviews' | 'yesstyle' | 'shein' | 'email' | 'mediaKit';

export type FaqCopyLink = { label: string; target: FaqLinkTarget };

export type HomeFaqKey = 'who' | 'why' | 'where' | 'contact';

export type FaqCopyEntry =
  | { home: HomeFaqKey }
  | { question: string; answer: string; link?: FaqCopyLink };

export type FaqCopyCategory = { id: string; title: string; entries: FaqCopyEntry[] };

export type FaqLocaleCopy = {
  metaTitle: string;
  metaDescription: string;
  trailLabel: string;
  title: string;
  intro: string;
  categoriesLabel: string;
  askTitle: string;
  askText: string;
  askButton: string;
  newsTitle: string;
  newsText: string;
  newsVideos: string;
  newsMediaKit: string;
  categories: FaqCopyCategory[];
};

export const FAQ_SOURCE_PT: FaqLocaleCopy = {
  metaTitle: 'Perguntas frequentes | Em Casa com Cecília',
  metaDescription:
    'Respostas sobre o Em Casa com Cecília: cupons e códigos, links de afiliado e parcerias, guias e análises, e como falar com a gente.',
  trailLabel: 'Perguntas frequentes',
  title: 'Perguntas frequentes',
  intro: 'O que mais perguntam sobre o site, os códigos das lojas e as parcerias. Não achou? Escreva para a gente.',
  categoriesLabel: 'Categorias das perguntas',
  askTitle: 'Ainda com dúvida?',
  askText: 'Mande sua pergunta para {email}.',
  askButton: 'Escrever por e-mail',
  newsTitle: 'Acompanhe as novidades',
  newsText: 'Os vídeos novos saem primeiro no YouTube e no Instagram.',
  newsVideos: 'Ver vídeos',
  newsMediaKit: 'Ver o mídia kit (em português)',
  categories: [
    {
      id: 'em-casa-com-cecilia',
      title: 'Em Casa com Cecília',
      entries: [
        { home: 'who' },
        { home: 'why' },
        { home: 'contact' },
      ],
    },
    {
      id: 'cupons-e-codigos',
      title: 'Cupons e códigos',
      entries: [
        { home: 'where' },
        {
          question: 'Os cupons são testados?',
          answer:
            'Depende da loja. Nas lojas em que aplicamos o código no checkout, a página diz “Cupom testado em” e a data. Nas outras, a página mostra a data em que a oferta foi conferida (“Conferido em”), que é uma checagem da oferta e não um teste no checkout. A página de cada loja diz qual dos dois casos vale para ela.',
          link: { label: 'Ver os cupons', target: 'coupons' },
        },
        {
          question: 'O código não funcionou. O que eu faço?',
          answer:
            'Confira as regras da página da loja: alguns códigos têm valor mínimo, não somam com outro cupom ou não valem em certos produtos. Se ainda assim não funcionar, escreva para {email} com a loja, o código e um print do carrinho.',
          link: { label: 'Escrever para a gente', target: 'email' },
        },
        {
          question: 'O CECILIA010 é cupom?',
          answer:
            'Não. É um código de recompensa, que vai no campo Reward Code do checkout. Ele pode ser combinado com os cupons promocionais elegíveis da própria YesStyle, que vão em outro campo. Confirme sempre no resumo do pedido que os dois descontos aparecem.',
          link: { label: 'Como usar o CECILIA010', target: 'yesstyle' },
        },
        {
          question: 'O 4CW5Y da SHEIN é cupom?',
          answer:
            'Não é cupom de checkout, mas dá desconto, sim. É o código de indicação da Cecília: use o link ou pesquise o 4CW5Y no app ou no site da SHEIN, e abre uma página com uma seleção de produtos com desconto e promoções. Quanto e em quais peças, quem define é a SHEIN.',
          link: { label: 'Abrir a página da SHEIN', target: 'shein' },
        },
        {
          question: 'Posso usar o cupom mais de uma vez?',
          answer:
            'Depende da loja. A página de cada uma diz, nas regras, se o código vale mais de uma vez, se soma com outras promoções e como fica o frete.',
          link: { label: 'Ver as regras de cada loja', target: 'coupons' },
        },
      ],
    },
    {
      id: 'links-de-afiliado-e-parcerias',
      title: 'Links de afiliado e parcerias',
      entries: [
        {
          question: 'O site ganha dinheiro quando eu compro pelo link?',
          answer:
            'Pode ganhar. Quando você compra pelo link ou com o código da Cecília, a loja pode pagar uma comissão ao Em Casa com Cecília. Você paga o mesmo preço.',
        },
        {
          question: 'Eu compro no site de vocês?',
          answer:
            'Não. O Em Casa com Cecília não vende nada: a compra e o pagamento são feitos no site da própria loja. Nunca pedimos cartão, senha ou cadastro.',
        },
        {
          question: 'Como sei se um artigo é parceria?',
          answer:
            'Os artigos com relação comercial trazem uma nota editorial que diz se o produto foi enviado pela marca e se o site recebe comissão. Os links para as lojas parceiras são marcados como patrocinados no código da página.',
        },
        {
          question: 'A parceria muda o que a Cecília diz do produto?',
          answer:
            'Não. Não aceitamos pagamento por análise positiva, e o artigo separa o que é experiência própria do que vem de fontes públicas.',
        },
        {
          question: 'Sou de uma marca. Como proponho uma parceria?',
          answer: 'Veja o mídia kit, que está em português, e escreva para {email}.',
          link: { label: 'Ver o mídia kit (em português)', target: 'mediaKit' },
        },
        {
          question: 'Posso enviar um produto para análise?',
          answer: 'Fale com a gente antes de enviar, para combinarmos. Produto recebido não garante análise positiva.',
          link: { label: 'Escrever para a gente', target: 'email' },
        },
      ],
    },
    {
      id: 'guias-e-analises',
      title: 'Guias & Análises',
      entries: [
        {
          question: 'Qual a diferença entre guia e análise de produto?',
          answer:
            'Na análise, a Cecília usou o produto e conta como foi, com fotos ou vídeo. O guia explica como escolher ou usar um produto a partir da página oficial, do manual e de outras fontes públicas.',
          link: { label: 'Ver os guias e análises', target: 'reviews' },
        },
        {
          question: 'Que tipo de produto vocês analisam?',
          answer:
            'Coisas da casa e do dia a dia: móveis, eletrodomésticos, café, alimentos, suplementos, beleza e moda. Produtos de várias faixas de preço.',
        },
        {
          question: 'Os preços dos artigos estão atualizados?',
          answer:
            'Valem na data indicada no artigo. Preço, estoque e campanha mudam, então confira o valor final na loja antes de pagar.',
        },
      ],
    },
  ],
};

// Os 9 idiomas fora do PT. Cada um segue a forma de FAQ_SOURCE_PT, com os mesmos ids de categoria.

// Texto próprio do FAQ no lugar do da home, onde o texto da home não serve ao FAQ. A resposta de "onde uso cada
// código" é trocada nos 9 idiomas: a home diz que cada loja parceira tem uma página no idioma do leitor, e só parte
// das lojas tem (hoje a YesStyle, a SHEIN e a Hostinger). A home alemã ainda fala por "du" e o FAQ alemão por
// "Sie", então o alemão troca também o contato. A home segue como está (localeHomeCopy.ts muda em outra fase).
export type HomeFaqOverride = { question?: string; answer?: string; link?: FaqCopyLink };

export const HOME_FAQ_OVERRIDES: Record<TranslatedLocale, Partial<Record<HomeFaqKey, HomeFaqOverride>>> = {
  en: {
    where: {
      answer: 'The partner stores available in your language each have a page that explains the code, where to use it and when it was last checked.',
      link: { label: 'See the coupons', target: 'coupons' },
    },
  },
  es: {
    where: {
      answer: 'Las tiendas asociadas disponibles en tu idioma tienen cada una una página que explica el código, dónde usarlo y cuándo se revisó por última vez.',
      link: { label: 'Ver los cupones', target: 'coupons' },
    },
  },
  fr: {
    where: {
      answer: 'Les boutiques partenaires disponibles dans votre langue ont chacune une page qui explique le code, où l’utiliser et quand il a été vérifié pour la dernière fois.',
      link: { label: 'Voir les codes promo', target: 'coupons' },
    },
  },
  de: {
    where: {
      answer: 'Die Partner-Shops, die in Ihrer Sprache verfügbar sind, haben jeweils eine Seite, die den Code erklärt, wo man ihn nutzt und wann er zuletzt geprüft wurde.',
      link: { label: 'Gutscheine ansehen', target: 'coupons' },
    },
    contact: {
      question: 'Wie kann ich Sie kontaktieren?',
      answer: 'Schreiben Sie an {email}.',
    },
  },
  it: {
    where: {
      answer: 'I negozi partner disponibili nella tua lingua hanno ciascuno una pagina che spiega il codice, dove usarlo e quando è stato verificato l’ultima volta.',
      link: { label: 'Vedi i coupon', target: 'coupons' },
    },
  },
  ko: {
    where: {
      answer: '사용자의 언어로 이용할 수 있는 파트너 스토어에는 각각 코드, 사용하는 곳, 마지막 확인 날짜를 안내하는 페이지가 있어요.',
      link: { label: '쿠폰 보기', target: 'coupons' },
    },
  },
  ja: {
    where: {
      answer: 'あなたの言語で利用できるパートナーショップには、それぞれコード、使う場所、最終確認日を説明するページがあります。',
      link: { label: 'クーポンを見る', target: 'coupons' },
    },
  },
  'zh-hant': {
    where: {
      answer: '提供你所用語言版本的合作商店，每家都有一個頁面，說明代碼、使用位置和最後確認的日期。',
      link: { label: '查看優惠碼', target: 'coupons' },
    },
  },
  'zh-hans': {
    where: {
      answer: '提供你所用语言版本的合作商店，每家都有一个页面，说明代码、使用位置和最后确认的日期。',
      link: { label: '查看优惠码', target: 'coupons' },
    },
  },
};

export const LOCALE_FAQ_COPY: Record<TranslatedLocale, FaqLocaleCopy> = {
  en: {
    metaTitle: 'Frequently asked questions | Em Casa com Cecília',
    metaDescription:
      'Answers about Em Casa com Cecília: coupons and codes, affiliate links and partnerships, guides and reviews, and how to reach us.',
    trailLabel: 'Frequently asked questions',
    title: 'Frequently asked questions',
    intro: 'The questions we get most about the site, the store codes and partnerships. Can’t find yours? Write to us.',
    categoriesLabel: 'Question categories',
    askTitle: 'Still have a question?',
    askText: 'Send your question to {email}.',
    askButton: 'Email us',
    newsTitle: 'Stay up to date',
    newsText: 'New videos come out first on YouTube and Instagram.',
    newsVideos: 'Watch videos',
    newsMediaKit: 'See the media kit (in Portuguese)',
    categories: [
      {
        id: 'em-casa-com-cecilia',
        title: 'Em Casa com Cecília',
        entries: [
          { home: 'who' },
          { home: 'why' },
          { home: 'contact' },
        ],
      },
      {
        id: 'cupons-e-codigos',
        title: 'Coupons and codes',
        entries: [
          { home: 'where' },
          {
            question: 'Are the coupons tested?',
            answer:
              'It depends on the store. For stores where we applied the code at checkout, the page says “Coupon tested on” and the date. For the other stores, the page shows the date the offer was last checked (“Checked on”), which is a check of the offer, not a checkout test. Each store page says which of the two applies to it.',
            link: { label: 'See the coupons', target: 'coupons' },
          },
          {
            question: 'The code didn’t work. What do I do?',
            answer:
              'Check the rules on the store page: some codes have a minimum order value, can’t be combined with another coupon, or don’t apply to certain products. If it still doesn’t work, write to {email} with the store, the code and a screenshot of your cart.',
            link: { label: 'Email us', target: 'email' },
          },
          {
            question: 'Is CECILIA010 a coupon?',
            answer:
              'No. It is a reward code, entered in the Reward Code field at checkout. It can be combined with the eligible YesStyle promotional coupons, which go in a different field. Always confirm in the checkout summary that both discounts appear.',
            link: { label: 'How to use CECILIA010', target: 'yesstyle' },
          },
          {
            question: 'What is the SHEIN code 4CW5Y?',
            answer:
              'It is Cecília’s referral code. It is not a checkout code, but it does give a discount: use the link, or search for 4CW5Y in the SHEIN app or website, and a page opens with a selection of discounted products and promotions. How much, and on which items, is up to SHEIN.',
            link: { label: 'Open the SHEIN page', target: 'shein' },
          },
          {
            question: 'Can I use a coupon more than once?',
            answer:
              'It depends on the store. Each store page says, in the Rules section, whether the code works more than once, whether it stacks with other promotions and how shipping is handled.',
            link: { label: 'See each store’s rules', target: 'coupons' },
          },
        ],
      },
      {
        id: 'links-de-afiliado-e-parcerias',
        title: 'Affiliate links and partnerships',
        entries: [
          {
            question: 'Does the site earn money when I buy through a link?',
            answer:
              'It can. When you buy through the link or with Cecília’s code, the store may pay Em Casa com Cecília a commission. You pay the same price.',
          },
          {
            question: 'Do I buy on your site?',
            answer:
              'No. Em Casa com Cecília doesn’t sell anything: you buy and pay on the store’s own website. We never ask for your card, password or sign-up.',
          },
          {
            question: 'How do I know if an article is a partnership?',
            answer:
              'Articles with a commercial relationship carry an editorial note saying whether the brand sent the product and whether the site earns a commission. Links to partner stores are marked as sponsored in the page code.',
          },
          {
            question: 'Does a partnership change what Cecília says about a product?',
            answer:
              'No. We don’t accept payment for a positive review, and the article separates Cecília’s own experience from what comes from public sources.',
          },
          {
            question: 'I’m from a brand. How do I propose a partnership?',
            answer: 'See the media kit, which is in Portuguese, and write to {email}.',
            link: { label: 'See the media kit (in Portuguese)', target: 'mediaKit' },
          },
          {
            question: 'Can I send a product for review?',
            answer: 'Talk to us before sending anything, so we can agree on it. Receiving a product doesn’t guarantee a positive review.',
            link: { label: 'Email us', target: 'email' },
          },
        ],
      },
      {
        id: 'guias-e-analises',
        title: 'Guides & Reviews',
        entries: [
          {
            question: 'What’s the difference between a guide and a product review?',
            answer:
              'In a review, Cecília used the product and tells you how it went, with photos or video. A guide explains how to choose or use a product based on the official page, the manual and other public sources.',
            link: { label: 'See the guides and reviews', target: 'reviews' },
          },
          {
            question: 'What kinds of products do you cover?',
            answer:
              'Things for the home and everyday life: furniture, appliances, coffee, food, supplements, beauty and fashion. Products across many price ranges.',
          },
          {
            question: 'Are the prices in the articles up to date?',
            answer:
              'They are valid on the date shown in the article. Prices, stock and campaigns change, so check the final amount on the store’s site before you pay.',
          },
        ],
      },
    ],
  },
  es: {
    metaTitle: 'Preguntas frecuentes | Em Casa com Cecília',
    metaDescription:
      'Respuestas sobre Em Casa com Cecília: cupones y códigos, enlaces de afiliado y colaboraciones, guías y reseñas, y cómo contactarnos.',
    trailLabel: 'Preguntas frecuentes',
    title: 'Preguntas frecuentes',
    intro: 'Lo que más nos preguntan sobre el sitio, los códigos de las tiendas y las colaboraciones. ¿No encuentras tu duda? Escríbenos.',
    categoriesLabel: 'Categorías de preguntas',
    askTitle: '¿Sigues con dudas?',
    askText: 'Envía tu pregunta a {email}.',
    askButton: 'Escríbenos por correo',
    newsTitle: 'Sigue las novedades',
    newsText: 'Los vídeos nuevos salen primero en YouTube e Instagram.',
    newsVideos: 'Ver vídeos',
    newsMediaKit: 'Ver el media kit (en portugués)',
    categories: [
      {
        id: 'em-casa-com-cecilia',
        title: 'Em Casa com Cecília',
        entries: [
          { home: 'who' },
          { home: 'why' },
          { home: 'contact' },
        ],
      },
      {
        id: 'cupons-e-codigos',
        title: 'Cupones y códigos',
        entries: [
          { home: 'where' },
          {
            question: '¿Los cupones se prueban?',
            answer:
              'Depende de la tienda. En las tiendas donde aplicamos el código en el pago, la página dice “Cupón probado el” y la fecha. En las demás, la página muestra la fecha en que se comprobó la oferta (“Comprobado el”), que es una verificación de la oferta y no una prueba en el pago. La página de cada tienda indica cuál de los dos casos le corresponde.',
            link: { label: 'Ver los cupones', target: 'coupons' },
          },
          {
            question: 'El código no funcionó. ¿Qué hago?',
            answer:
              'Revisa las reglas en la página de la tienda: algunos códigos tienen un importe mínimo, no se suman a otro cupón o no valen para ciertos productos. Si aun así no funciona, escribe a {email} con la tienda, el código y una captura del carrito.',
            link: { label: 'Escríbenos', target: 'email' },
          },
          {
            question: '¿CECILIA010 es un cupón?',
            answer:
              'No. Es un código de recompensa, que va en el campo Reward Code del pago. Puede combinarse con los cupones promocionales elegibles de la propia YesStyle, que van en otro campo. Confirma siempre en el resumen del pedido que aparecen los dos descuentos.',
            link: { label: 'Cómo usar CECILIA010', target: 'yesstyle' },
          },
          {
            question: '¿Qué es el código 4CW5Y de SHEIN?',
            answer:
              'Es el código de referido de Cecília. No es un código de pago, pero sí da descuento: usa el enlace o busca 4CW5Y en la app o en la web de SHEIN, y se abre una página con una selección de productos con descuento y promociones. Cuánto y en qué prendas lo decide SHEIN.',
            link: { label: 'Ver la página de SHEIN', target: 'shein' },
          },
          {
            question: '¿Puedo usar un cupón más de una vez?',
            answer:
              'Depende de la tienda. La página de cada una indica, en las reglas, si el código vale más de una vez, si se suma a otras promociones y cómo queda el envío.',
            link: { label: 'Ver las reglas de cada tienda', target: 'coupons' },
          },
        ],
      },
      {
        id: 'links-de-afiliado-e-parcerias',
        title: 'Enlaces de afiliado y colaboraciones',
        entries: [
          {
            question: '¿El sitio gana dinero cuando compro por el enlace?',
            answer:
              'Puede ser. Cuando compras por el enlace o con el código de Cecília, la tienda puede pagar una comisión a Em Casa com Cecília. Tú pagas el mismo precio.',
          },
          {
            question: '¿Compro en este sitio?',
            answer:
              'No. Em Casa com Cecília no vende nada: la compra y el pago se hacen en el sitio de la propia tienda. Nunca pedimos tarjeta, contraseña ni registro.',
          },
          {
            question: '¿Cómo sé si un artículo es una colaboración?',
            answer:
              'Los artículos con relación comercial llevan una nota editorial que indica si la marca envió el producto y si el sitio recibe una comisión. Los enlaces a las tiendas asociadas están marcados como patrocinados en el código de la página.',
          },
          {
            question: '¿La colaboración cambia lo que Cecília dice del producto?',
            answer:
              'No. No aceptamos pagos por una reseña positiva, y el artículo separa lo que es experiencia propia de lo que viene de fuentes públicas.',
          },
          {
            question: 'Soy de una marca. ¿Cómo propongo una colaboración?',
            answer: 'Mira el media kit, que está en portugués, y escribe a {email}.',
            link: { label: 'Ver el media kit (en portugués)', target: 'mediaKit' },
          },
          {
            question: '¿Puedo enviar un producto para análisis?',
            answer: 'Habla con nosotros antes de enviarlo, para ponernos de acuerdo. Recibir un producto no garantiza una reseña positiva.',
            link: { label: 'Escríbenos', target: 'email' },
          },
        ],
      },
      {
        id: 'guias-e-analises',
        title: 'Guías y reseñas',
        entries: [
          {
            question: '¿Cuál es la diferencia entre una guía y la reseña de un producto?',
            answer:
              'En la reseña, Cecília ha usado el producto y cuenta cómo le fue, con fotos o vídeo. La guía explica cómo elegir o usar un producto a partir de la página oficial, el manual y otras fuentes públicas.',
            link: { label: 'Ver las guías y reseñas', target: 'reviews' },
          },
          {
            question: '¿Qué tipo de productos analizan?',
            answer:
              'Cosas para la casa y el día a día: muebles, electrodomésticos, café, alimentos, suplementos, belleza y moda. Productos de varios rangos de precio.',
          },
          {
            question: '¿Los precios de los artículos están actualizados?',
            answer:
              'Valen en la fecha indicada en el artículo. Precio, stock y campañas cambian, así que comprueba el importe final en la tienda antes de pagar.',
          },
        ],
      },
    ],
  },
  fr: {
    metaTitle: 'Questions fréquentes | Em Casa com Cecília',
    metaDescription:
      'Réponses sur Em Casa com Cecília : codes promo, liens d’affiliation et partenariats, guides et avis, et comment nous contacter.',
    trailLabel: 'Questions fréquentes',
    title: 'Questions fréquentes',
    intro:
      'Ce que l’on nous demande le plus sur le site, les codes des boutiques et les partenariats. Vous ne trouvez pas votre réponse ? Écrivez-nous.',
    categoriesLabel: 'Catégories de questions',
    askTitle: 'Encore une question ?',
    askText: 'Envoyez votre question à {email}.',
    askButton: 'Nous écrire par e-mail',
    newsTitle: 'Suivre les nouveautés',
    newsText: 'Les nouvelles vidéos sortent d’abord sur YouTube et Instagram.',
    newsVideos: 'Voir les vidéos',
    newsMediaKit: 'Voir le kit média (en portugais)',
    categories: [
      {
        id: 'em-casa-com-cecilia',
        title: 'Em Casa com Cecília',
        entries: [
          { home: 'who' },
          { home: 'why' },
          { home: 'contact' },
        ],
      },
      {
        id: 'cupons-e-codigos',
        title: 'Codes promo',
        entries: [
          { home: 'where' },
          {
            question: 'Les codes promo sont-ils testés ?',
            answer:
              'Cela dépend de la boutique. Pour les boutiques où nous avons appliqué le code au paiement, la page indique « Code promo testé le » et la date. Pour les autres, la page indique la date à laquelle l’offre a été vérifiée (« Vérifié le »), ce qui est une vérification de l’offre et non un test au paiement. La page de chaque boutique précise lequel des deux cas s’applique.',
            link: { label: 'Voir les codes promo', target: 'coupons' },
          },
          {
            question: 'Le code ne fonctionne pas. Que faire ?',
            answer:
              'Consultez les règles sur la page de la boutique : certains codes ont un montant minimum, ne se cumulent pas avec un autre code promo ou ne valent pas pour certains produits. Si cela ne fonctionne toujours pas, écrivez à {email} avec la boutique, le code et une capture de votre panier.',
            link: { label: 'Nous écrire', target: 'email' },
          },
          {
            question: 'CECILIA010 est-il un coupon ?',
            answer:
              'Non. C’est un code récompense, à saisir dans le champ Reward Code au paiement. Il peut se cumuler avec les coupons promotionnels éligibles de YesStyle elle-même, qui vont dans un autre champ. Vérifiez toujours dans le récapitulatif de commande que les deux réductions apparaissent.',
            link: { label: 'Comment utiliser CECILIA010', target: 'yesstyle' },
          },
          {
            question: 'Qu’est-ce que le code SHEIN 4CW5Y ?',
            answer:
              'C’est le code de parrainage de Cecília. Ce n’est pas un code à saisir au paiement, mais il donne bien une réduction : utilisez le lien ou recherchez 4CW5Y dans l’appli ou sur le site SHEIN, et une page s’ouvre avec une sélection de produits à prix réduit et de promotions. Le montant de la réduction et les articles concernés sont décidés par SHEIN.',
            link: { label: 'Voir la page SHEIN', target: 'shein' },
          },
          {
            question: 'Puis-je utiliser un code promo plusieurs fois ?',
            answer:
              'Cela dépend de la boutique. La page de chacune indique, dans les règles, si le code vaut plusieurs fois, s’il se cumule avec d’autres promotions et comment se passe la livraison.',
            link: { label: 'Voir les règles de chaque boutique', target: 'coupons' },
          },
        ],
      },
      {
        id: 'links-de-afiliado-e-parcerias',
        title: 'Liens d’affiliation et partenariats',
        entries: [
          {
            question: 'Le site gagne-t-il de l’argent quand j’achète via le lien ?',
            answer:
              'C’est possible. Quand vous achetez via le lien ou avec le code de Cecília, la boutique peut verser une commission à Em Casa com Cecília. Vous payez le même prix.',
          },
          {
            question: 'Est-ce que j’achète sur votre site ?',
            answer:
              'Non. Em Casa com Cecília ne vend rien : l’achat et le paiement se font sur le site de la boutique elle-même. Nous ne demandons jamais carte bancaire, mot de passe ni inscription.',
          },
          {
            question: 'Comment savoir si un article est un partenariat ?',
            answer:
              'Les articles avec une relation commerciale portent une note éditoriale qui indique si le produit a été envoyé par la marque et si le site touche une commission. Les liens vers les boutiques partenaires sont marqués comme sponsorisés dans le code de la page.',
          },
          {
            question: 'Le partenariat change-t-il ce que Cecília dit du produit ?',
            answer:
              'Non. Nous n’acceptons pas d’être payés pour un avis positif, et l’article distingue ce qui relève de l’expérience personnelle de ce qui vient de sources publiques.',
          },
          {
            question: 'Je représente une marque. Comment proposer un partenariat ?',
            answer: 'Consultez le kit média, qui est en portugais, et écrivez à {email}.',
            link: { label: 'Voir le kit média (en portugais)', target: 'mediaKit' },
          },
          {
            question: 'Puis-je envoyer un produit pour un test ?',
            answer: 'Parlez-nous-en avant l’envoi, pour que nous nous mettions d’accord. Recevoir un produit ne garantit pas un avis positif.',
            link: { label: 'Nous écrire', target: 'email' },
          },
        ],
      },
      {
        id: 'guias-e-analises',
        title: 'Guides et avis',
        entries: [
          {
            question: 'Quelle est la différence entre un guide et un avis sur un produit ?',
            answer:
              'Dans un avis, Cecília a utilisé le produit et raconte comment cela s’est passé, avec photos ou vidéo. Le guide explique comment choisir ou utiliser un produit à partir de la page officielle, du mode d’emploi et d’autres sources publiques.',
            link: { label: 'Voir les guides et avis', target: 'reviews' },
          },
          {
            question: 'Quels types de produits analysez-vous ?',
            answer:
              'Des produits pour la maison et le quotidien : meubles, électroménager, café, alimentation, compléments alimentaires, beauté et mode. Des produits de toutes les gammes de prix.',
          },
          {
            question: 'Les prix des articles sont-ils à jour ?',
            answer:
              'Ils valent à la date indiquée dans l’article. Prix, stock et campagnes changent, vérifiez donc le montant final sur le site de la boutique avant de payer.',
          },
        ],
      },
    ],
  },
  de: {
    metaTitle: 'Häufige Fragen | Em Casa com Cecília',
    metaDescription:
      'Antworten zu Em Casa com Cecília: Gutscheine und Codes, Affiliate-Links und Partnerschaften, Ratgeber und Tests, und wie Sie uns erreichen.',
    trailLabel: 'Häufige Fragen',
    title: 'Häufige Fragen',
    intro: 'Was uns am häufigsten zur Website, zu den Shop-Codes und zu Partnerschaften gefragt wird. Nichts gefunden? Schreiben Sie uns.',
    categoriesLabel: 'Fragenkategorien',
    askTitle: 'Noch eine Frage?',
    askText: 'Schicken Sie Ihre Frage an {email}.',
    askButton: 'Per E-Mail schreiben',
    newsTitle: 'Immer auf dem Laufenden',
    newsText: 'Neue Videos erscheinen zuerst auf YouTube und Instagram.',
    newsVideos: 'Videos ansehen',
    newsMediaKit: 'Mediakit ansehen (auf Portugiesisch)',
    categories: [
      {
        id: 'em-casa-com-cecilia',
        title: 'Em Casa com Cecília',
        entries: [
          { home: 'who' },
          { home: 'why' },
          { home: 'contact' },
        ],
      },
      {
        id: 'cupons-e-codigos',
        title: 'Gutscheine und Codes',
        entries: [
          { home: 'where' },
          {
            question: 'Werden die Gutscheine getestet?',
            answer:
              'Das hängt vom Shop ab. Bei Shops, in denen wir den Code an der Kasse angewendet haben, steht auf der Seite „Gutschein getestet am“ mit dem Datum. Bei den übrigen Shops zeigt die Seite das Datum, an dem das Angebot zuletzt geprüft wurde („Geprüft am“); das ist eine Prüfung des Angebots, kein Test an der Kasse. Auf der Seite jedes Shops steht, welcher der beiden Fälle gilt.',
            link: { label: 'Gutscheine ansehen', target: 'coupons' },
          },
          {
            question: 'Der Code hat nicht funktioniert. Was tun?',
            answer:
              'Prüfen Sie die Regeln auf der Shop-Seite: Manche Codes haben einen Mindestbestellwert, lassen sich nicht mit einem weiteren Gutschein kombinieren oder gelten nicht für bestimmte Produkte. Funktioniert er trotzdem nicht, schreiben Sie an {email} mit Shop, Code und einem Screenshot des Warenkorbs.',
            link: { label: 'Schreiben Sie uns', target: 'email' },
          },
          {
            question: 'Ist CECILIA010 ein Gutschein?',
            answer:
              'Nein. Es ist ein Reward Code, der an der Kasse in das Feld Reward Code eingegeben wird. Er lässt sich mit den berechtigten Aktionsgutscheinen von YesStyle selbst kombinieren, die in ein anderes Feld gehören. Prüfen Sie in der Bestellübersicht immer, ob beide Rabatte erscheinen.',
            link: { label: 'So verwenden Sie CECILIA010', target: 'yesstyle' },
          },
          {
            question: 'Was ist der SHEIN-Code 4CW5Y?',
            answer:
              'Es ist der Empfehlungscode von Cecília. Er wird nicht an der Kasse eingegeben, bringt aber trotzdem Rabatt: Nutzen Sie den Link oder suchen Sie in der SHEIN-App oder auf der SHEIN-Website nach 4CW5Y, dann öffnet sich eine Seite mit einer Auswahl rabattierter Produkte und Aktionen. Wie hoch der Rabatt ist und für welche Artikel er gilt, entscheidet SHEIN.',
            link: { label: 'Zur SHEIN-Seite', target: 'shein' },
          },
          {
            question: 'Kann ich den Gutschein mehrmals verwenden?',
            answer:
              'Das hängt vom Shop ab. Die Seite des jeweiligen Shops sagt in den Regeln, ob der Code mehrmals gilt, ob er sich mit anderen Aktionen kombinieren lässt und wie es sich mit dem Versand verhält.',
            link: { label: 'Regeln jedes Shops ansehen', target: 'coupons' },
          },
        ],
      },
      {
        id: 'links-de-afiliado-e-parcerias',
        title: 'Affiliate-Links und Partnerschaften',
        entries: [
          {
            question: 'Verdient die Website, wenn ich über den Link kaufe?',
            answer:
              'Möglicherweise. Wenn Sie über den Link oder mit dem Code von Cecília kaufen, kann der Shop Em Casa com Cecília eine Provision zahlen. Sie zahlen denselben Preis.',
          },
          {
            question: 'Kaufe ich auf Ihrer Website?',
            answer:
              'Nein. Em Casa com Cecília verkauft nichts: Kauf und Bezahlung laufen auf der Website des Shops selbst. Wir verlangen nie Karte, Passwort oder Registrierung.',
          },
          {
            question: 'Woran erkenne ich, ob ein Artikel eine Partnerschaft ist?',
            answer:
              'Artikel mit geschäftlicher Verbindung enthalten einen redaktionellen Hinweis, ob die Marke das Produkt geschickt hat und ob die Website eine Provision erhält. Links zu Partner-Shops sind im Code der Seite als gesponsert markiert.',
          },
          {
            question: 'Ändert die Partnerschaft, was Cecília über das Produkt sagt?',
            answer:
              'Nein. Wir nehmen kein Geld für positive Tests an, und der Artikel trennt die eigene Erfahrung von dem, was aus öffentlichen Quellen stammt.',
          },
          {
            question: 'Ich vertrete eine Marke. Wie schlage ich eine Partnerschaft vor?',
            answer: 'Sehen Sie sich das Mediakit an, das auf Portugiesisch ist, und schreiben Sie an {email}.',
            link: { label: 'Mediakit ansehen (auf Portugiesisch)', target: 'mediaKit' },
          },
          {
            question: 'Kann ich ein Produkt zum Testen schicken?',
            answer: 'Sprechen Sie uns vor dem Versand an, damit wir uns abstimmen. Ein erhaltenes Produkt garantiert keinen positiven Test.',
            link: { label: 'Schreiben Sie uns', target: 'email' },
          },
        ],
      },
      {
        id: 'guias-e-analises',
        title: 'Ratgeber und Tests',
        entries: [
          {
            question: 'Was ist der Unterschied zwischen Ratgeber und Produkttest?',
            answer:
              'Beim Test hat Cecília das Produkt benutzt und erzählt, wie es war, mit Fotos oder Video. Der Ratgeber erklärt, wie man ein Produkt auswählt oder benutzt, auf Grundlage der offiziellen Seite, der Anleitung und anderer öffentlicher Quellen.',
            link: { label: 'Ratgeber und Tests ansehen', target: 'reviews' },
          },
          {
            question: 'Welche Produkte behandeln Sie?',
            answer:
              'Dinge für Zuhause und Alltag: Möbel, Haushaltsgeräte, Kaffee, Lebensmittel, Nahrungsergänzungsmittel, Beauty und Mode. Produkte in verschiedenen Preisklassen.',
          },
          {
            question: 'Sind die Preise in den Artikeln aktuell?',
            answer:
              'Sie gelten an dem im Artikel genannten Datum. Preis, Lagerbestand und Aktionen ändern sich, prüfen Sie den Endpreis daher im Shop, bevor Sie bezahlen.',
          },
        ],
      },
    ],
  },
  it: {
    metaTitle: 'Domande frequenti | Em Casa com Cecília',
    metaDescription:
      'Risposte su Em Casa com Cecília: coupon e codici, link di affiliazione e collaborazioni, guide e recensioni, e come contattarci.',
    trailLabel: 'Domande frequenti',
    title: 'Domande frequenti',
    intro: 'Le domande che ci fanno più spesso sul sito, sui codici dei negozi e sulle collaborazioni. Non trovi la tua? Scrivici.',
    categoriesLabel: 'Categorie di domande',
    askTitle: 'Hai ancora un dubbio?',
    askText: 'Manda la tua domanda a {email}.',
    askButton: 'Scrivici via e-mail',
    newsTitle: 'Resta aggiornato',
    newsText: 'I nuovi video escono prima su YouTube e Instagram.',
    newsVideos: 'Guarda i video',
    newsMediaKit: 'Vedi il media kit (in portoghese)',
    categories: [
      {
        id: 'em-casa-com-cecilia',
        title: 'Em Casa com Cecília',
        entries: [
          { home: 'who' },
          { home: 'why' },
          { home: 'contact' },
        ],
      },
      {
        id: 'cupons-e-codigos',
        title: 'Coupon e codici',
        entries: [
          { home: 'where' },
          {
            question: 'I coupon vengono testati?',
            answer:
              'Dipende dal negozio. Nei negozi in cui abbiamo applicato il codice al checkout, la pagina mostra “Coupon testato il” e la data. Per gli altri, la pagina mostra la data in cui l’offerta è stata verificata (“Verificato il”), che è un controllo dell’offerta e non un test al checkout. La pagina di ogni negozio indica quale dei due casi vale.',
            link: { label: 'Vedi i coupon', target: 'coupons' },
          },
          {
            question: 'Il codice non ha funzionato. Cosa faccio?',
            answer:
              'Controlla le regole nella pagina del negozio: alcuni codici hanno una spesa minima, non si sommano a un altro coupon o non valgono per certi prodotti. Se continua a non funzionare, scrivi a {email} indicando negozio, codice e uno screenshot del carrello.',
            link: { label: 'Scrivici', target: 'email' },
          },
          {
            question: 'CECILIA010 è un coupon?',
            answer:
              'No. È un codice ricompensa, da inserire nel campo Reward Code al checkout. Può essere combinato con i coupon promozionali idonei di YesStyle stessa, che vanno in un altro campo. Controlla sempre nel riepilogo dell’ordine che compaiano entrambi gli sconti.',
            link: { label: 'Come usare CECILIA010', target: 'yesstyle' },
          },
          {
            question: 'Che cos’è il codice SHEIN 4CW5Y?',
            answer:
              'È il codice invito di Cecília. Non è un codice da inserire al checkout, ma dà davvero uno sconto: usa il link o cerca 4CW5Y nell’app o sul sito SHEIN, e si apre una pagina con una selezione di prodotti scontati e promozioni. Quanto e su quali articoli lo decide SHEIN.',
            link: { label: 'Vai alla pagina SHEIN', target: 'shein' },
          },
          {
            question: 'Posso usare il coupon più di una volta?',
            answer:
              'Dipende dal negozio. La pagina di ciascuno indica, nelle regole, se il codice vale più di una volta, se si somma ad altre promozioni e come funziona la spedizione.',
            link: { label: 'Vedi le regole di ogni negozio', target: 'coupons' },
          },
        ],
      },
      {
        id: 'links-de-afiliado-e-parcerias',
        title: 'Link di affiliazione e collaborazioni',
        entries: [
          {
            question: 'Il sito guadagna se compro dal link?',
            answer:
              'Può guadagnare. Quando acquisti dal link o con il codice di Cecília, il negozio può riconoscere una commissione a Em Casa com Cecília. Paghi lo stesso prezzo.',
          },
          {
            question: 'Compro sul vostro sito?',
            answer:
              'No. Em Casa com Cecília non vende nulla: acquisto e pagamento avvengono sul sito del negozio stesso. Non chiediamo mai carta, password o registrazione.',
          },
          {
            question: 'Come capisco se un articolo è una collaborazione?',
            answer:
              'Gli articoli con un rapporto commerciale hanno una nota editoriale che dice se il prodotto è stato inviato dal marchio e se il sito riceve una commissione. I link ai negozi partner sono contrassegnati come sponsorizzati nel codice della pagina.',
          },
          {
            question: 'La collaborazione cambia ciò che Cecília dice del prodotto?',
            answer:
              'No. Non accettiamo pagamenti per una recensione positiva, e l’articolo distingue ciò che è esperienza diretta da ciò che arriva da fonti pubbliche.',
          },
          {
            question: 'Sono un marchio. Come propongo una collaborazione?',
            answer: 'Guarda il media kit, che è in portoghese, e scrivi a {email}.',
            link: { label: 'Vedi il media kit (in portoghese)', target: 'mediaKit' },
          },
          {
            question: 'Posso inviare un prodotto da recensire?',
            answer: 'Contattaci prima di spedirlo, così ci mettiamo d’accordo. Ricevere un prodotto non garantisce una recensione positiva.',
            link: { label: 'Scrivici', target: 'email' },
          },
        ],
      },
      {
        id: 'guias-e-analises',
        title: 'Guide e recensioni',
        entries: [
          {
            question: 'Qual è la differenza tra una guida e la recensione di un prodotto?',
            answer:
              'Nella recensione, Cecília ha usato il prodotto e racconta com’è andata, con foto o video. La guida spiega come scegliere o usare un prodotto partendo dalla pagina ufficiale, dal manuale e da altre fonti pubbliche.',
            link: { label: 'Vedi le guide e le recensioni', target: 'reviews' },
          },
          {
            question: 'Che tipo di prodotti analizzate?',
            answer:
              'Cose per la casa e per la vita di tutti i giorni: mobili, elettrodomestici, caffè, alimenti, integratori, bellezza e moda. Prodotti di varie fasce di prezzo.',
          },
          {
            question: 'I prezzi negli articoli sono aggiornati?',
            answer:
              'Valgono alla data indicata nell’articolo. Prezzo, disponibilità e campagne cambiano, quindi controlla l’importo finale sul sito del negozio prima di pagare.',
          },
        ],
      },
    ],
  },
  ko: {
    metaTitle: '자주 묻는 질문 | Em Casa com Cecília',
    metaDescription: 'Em Casa com Cecília에 대한 답변: 쿠폰과 코드, 제휴 링크와 파트너십, 가이드와 리뷰, 문의 방법.',
    trailLabel: '자주 묻는 질문',
    title: '자주 묻는 질문',
    intro: '사이트, 스토어 코드, 파트너십에 대해 가장 많이 받는 질문이에요. 찾는 답이 없다면 메일을 보내 주세요.',
    categoriesLabel: '질문 카테고리',
    askTitle: '아직 궁금한 점이 있나요?',
    askText: '질문은 {email}로 보내 주세요.',
    askButton: '이메일 보내기',
    newsTitle: '새 소식 받아보기',
    newsText: '새 영상은 YouTube와 Instagram에 가장 먼저 올라와요.',
    newsVideos: '영상 보기',
    newsMediaKit: '미디어 킷 보기(포르투갈어)',
    categories: [
      {
        id: 'em-casa-com-cecilia',
        title: 'Em Casa com Cecília',
        entries: [
          { home: 'who' },
          { home: 'why' },
          { home: 'contact' },
        ],
      },
      {
        id: 'cupons-e-codigos',
        title: '쿠폰과 코드',
        entries: [
          { home: 'where' },
          {
            question: '쿠폰은 직접 테스트하나요?',
            answer:
              '스토어마다 달라요. 결제 단계에서 코드를 직접 적용해 본 스토어는 페이지에 “쿠폰 테스트 완료”와 날짜가 표시돼요. 그 밖의 스토어는 혜택을 확인한 날짜(“확인”)가 표시되는데, 결제 단계 테스트가 아니라 혜택 내용을 확인한 것이에요. 어느 쪽에 해당하는지는 각 스토어 페이지에 나와 있어요.',
            link: { label: '쿠폰 보기', target: 'coupons' },
          },
          {
            question: '코드가 작동하지 않아요. 어떻게 하나요?',
            answer:
              '스토어 페이지의 이용 규칙을 확인해 보세요. 최소 주문 금액이 있거나, 다른 쿠폰과 함께 쓸 수 없거나, 일부 상품에는 적용되지 않는 코드도 있어요. 그래도 안 되면 {email}로 스토어, 코드, 장바구니 캡처를 보내 주세요.',
            link: { label: '이메일 보내기', target: 'email' },
          },
          {
            question: 'CECILIA010은 쿠폰인가요?',
            answer:
              '아니요. 결제 단계의 Reward Code 칸에 넣는 리워드 코드예요. 다른 칸에 넣는 YesStyle 자체 프로모션 쿠폰 중 적용 대상인 쿠폰과 함께 쓸 수 있어요. 두 할인이 모두 반영됐는지 주문 요약에서 꼭 확인하세요.',
            link: { label: 'CECILIA010 사용 방법', target: 'yesstyle' },
          },
          {
            question: 'SHEIN의 4CW5Y는 어떤 코드인가요?',
            answer:
              'Cecília의 추천 코드예요. 결제 단계에서 입력하는 코드는 아니지만 할인은 받을 수 있어요. 링크를 이용하거나 SHEIN 앱이나 웹사이트에서 4CW5Y를 검색하면 할인 상품과 프로모션을 모은 페이지가 열려요. 할인율과 대상 상품은 SHEIN이 정해요.',
            link: { label: 'SHEIN 페이지 보기', target: 'shein' },
          },
          {
            question: '쿠폰을 여러 번 사용할 수 있나요?',
            answer:
              '스토어마다 달라요. 각 스토어 페이지의 이용 규칙에 코드를 여러 번 쓸 수 있는지, 다른 프로모션과 함께 쓸 수 있는지, 배송비는 어떻게 되는지 나와 있어요.',
            link: { label: '스토어별 이용 규칙 보기', target: 'coupons' },
          },
        ],
      },
      {
        id: 'links-de-afiliado-e-parcerias',
        title: '제휴 링크와 파트너십',
        entries: [
          {
            question: '링크로 구매하면 사이트가 수익을 얻나요?',
            answer:
              '그럴 수 있어요. 링크나 Cecília의 코드로 구매하면 스토어가 Em Casa com Cecília에 수수료를 지급할 수 있어요. 가격은 똑같아요.',
          },
          {
            question: '여기서 직접 구매하나요?',
            answer:
              '아니요. Em Casa com Cecília는 아무것도 판매하지 않아요. 구매와 결제는 스토어 사이트에서 직접 해요. 카드 정보, 비밀번호, 회원가입은 절대 요청하지 않아요.',
          },
          {
            question: '파트너십 글인지 어떻게 알 수 있나요?',
            answer:
              '상업적 관계가 있는 글에는 브랜드가 제품을 보냈는지, 사이트가 수수료를 받는지 알려 주는 편집 노트가 있어요. 파트너 스토어로 가는 링크는 페이지 코드에서 sponsored(광고) 링크로 표시돼요.',
          },
          {
            question: '파트너십이 제품에 대한 Cecília의 평가를 바꾸나요?',
            answer:
              '아니요. 긍정적인 리뷰를 대가로 돈을 받지 않아요. 글은 직접 써 본 경험과 공개된 자료에서 가져온 내용을 구분해요.',
          },
          {
            question: '브랜드 담당자예요. 파트너십은 어떻게 제안하나요?',
            answer: '포르투갈어로 된 미디어 킷을 확인하고 {email}로 메일을 보내 주세요.',
            link: { label: '미디어 킷 보기(포르투갈어)', target: 'mediaKit' },
          },
          {
            question: '리뷰용으로 제품을 보내도 되나요?',
            answer: '보내기 전에 먼저 연락 주세요. 함께 조율해요. 제품을 받았다고 해서 긍정적인 리뷰가 보장되지는 않아요.',
            link: { label: '이메일 보내기', target: 'email' },
          },
        ],
      },
      {
        id: 'guias-e-analises',
        title: '가이드와 리뷰',
        entries: [
          {
            question: '가이드와 제품 리뷰는 어떻게 다른가요?',
            answer:
              '리뷰에서는 Cecília가 제품을 직접 써 보고 사진이나 영상과 함께 후기를 전해요. 가이드는 공식 페이지, 설명서, 그 밖의 공개 자료를 바탕으로 제품을 고르거나 쓰는 방법을 설명해요.',
            link: { label: '가이드와 리뷰 보기', target: 'reviews' },
          },
          {
            question: '어떤 제품을 다루나요?',
            answer:
              '집과 일상에 필요한 것들이에요. 가구, 가전, 커피, 식품, 건강 보조 식품, 뷰티, 패션 등 다양한 가격대의 제품을 다뤄요.',
          },
          {
            question: '글에 적힌 가격은 최신인가요?',
            answer:
              '글에 표시된 날짜 기준이에요. 가격, 재고, 캠페인은 바뀌니 결제 전에 스토어에서 최종 금액을 확인하세요.',
          },
        ],
      },
    ],
  },
  ja: {
    metaTitle: 'よくある質問 | Em Casa com Cecília',
    metaDescription: 'Em Casa com Cecíliaについての回答：クーポンとコード、アフィリエイトリンクと提携、ガイドとレビュー、お問い合わせ方法。',
    trailLabel: 'よくある質問',
    title: 'よくある質問',
    intro: 'サイト、ショップのコード、提携についてよく寄せられる質問です。見つからない場合は、メールでお問い合わせください。',
    categoriesLabel: '質問のカテゴリー',
    askTitle: '解決しませんでしたか？',
    askText: 'ご質問は{email}までお送りください。',
    askButton: 'メールで連絡',
    newsTitle: '最新情報をチェック',
    newsText: '新しい動画は、まずYouTubeとInstagramで公開します。',
    newsVideos: '動画を見る',
    newsMediaKit: 'メディアキットを見る（ポルトガル語）',
    categories: [
      {
        id: 'em-casa-com-cecilia',
        title: 'Em Casa com Cecília',
        entries: [
          { home: 'who' },
          { home: 'why' },
          { home: 'contact' },
        ],
      },
      {
        id: 'cupons-e-codigos',
        title: 'クーポンとコード',
        entries: [
          { home: 'where' },
          {
            question: 'クーポンはテストしていますか？',
            answer:
              'ショップによって異なります。チェックアウトでコードを実際に適用したショップのページには、「クーポンをテスト済み」と日付が表示されます。それ以外のショップでは、オファーを確認した日付（「確認」）が表示されます。これはチェックアウトでのテストではなく、オファー内容の確認です。どちらに当たるかは、各ショップのページに書かれています。',
            link: { label: 'クーポンを見る', target: 'coupons' },
          },
          {
            question: 'コードが使えませんでした。どうすればいいですか？',
            answer:
              'ショップのページの利用条件を確認してください。最低購入額があるコード、ほかのクーポンと併用できないコード、一部の商品に使えないコードもあります。それでも使えない場合は、ショップ名、コード、カートのスクリーンショットを添えて{email}までご連絡ください。',
            link: { label: 'メールで連絡', target: 'email' },
          },
          {
            question: 'CECILIA010はクーポンですか？',
            answer:
              'いいえ。チェックアウトのReward Code欄に入力するリワードコードです。別の欄に入力する、YesStyle自身の対象のプロモーションクーポンと併用できます。両方の割引が反映されているか、注文概要で必ず確認してください。',
            link: { label: 'CECILIA010の使い方', target: 'yesstyle' },
          },
          {
            question: 'SHEINの4CW5Yとは何ですか？',
            answer:
              'Cecíliaの紹介コードです。チェックアウトで入力するコードではありませんが、割引は受けられます。リンクを使うか、SHEINのアプリやサイトで4CW5Yを検索すると、割引商品とプロモーションを集めたページが開きます。割引率や対象の商品はSHEINが決めています。',
            link: { label: 'SHEINのページを見る', target: 'shein' },
          },
          {
            question: 'クーポンは何回でも使えますか？',
            answer:
              'ショップによって異なります。各ショップのページの利用条件に、コードを複数回使えるか、ほかのプロモーションと併用できるか、送料がどうなるかが書かれています。',
            link: { label: '各ショップの利用条件を見る', target: 'coupons' },
          },
        ],
      },
      {
        id: 'links-de-afiliado-e-parcerias',
        title: 'アフィリエイトリンクと提携',
        entries: [
          {
            question: 'リンクから購入すると、サイトに収益はありますか？',
            answer:
              'あることがあります。リンクやCecíliaのコードで購入すると、ショップからEm Casa com Cecíliaに報酬が支払われる場合があります。お支払いの価格は同じです。',
          },
          {
            question: 'このサイトで購入するのですか？',
            answer:
              'いいえ。Em Casa com Cecíliaは何も販売していません。購入と支払いはショップ自身のサイトで行います。カード情報、パスワード、会員登録を求めることもありません。',
          },
          {
            question: '記事が提携かどうか、どうすればわかりますか？',
            answer:
              '商業的な関係がある記事には、ブランドから商品が送られたか、サイトが報酬を受け取るかを示す編集ノートがあります。提携ショップへのリンクは、ページのコード上でsponsored（広告）として指定されています。',
          },
          {
            question: '提携によって、Cecíliaの商品への評価は変わりますか？',
            answer:
              'いいえ。好意的なレビューの見返りに報酬を受け取ることはありません。記事では、自分で使った体験と、公開情報から得た内容を分けています。',
          },
          {
            question: 'ブランドの者です。提携はどう提案すればいいですか？',
            answer: 'ポルトガル語のメディアキットをご覧のうえ、{email}までご連絡ください。',
            link: { label: 'メディアキットを見る（ポルトガル語）', target: 'mediaKit' },
          },
          {
            question: 'レビュー用に商品を送ってもいいですか？',
            answer: '送る前に、まずご相談ください。商品を受け取ったからといって、好意的なレビューをお約束するものではありません。',
            link: { label: 'メールで連絡', target: 'email' },
          },
        ],
      },
      {
        id: 'guias-e-analises',
        title: 'ガイドとレビュー',
        entries: [
          {
            question: 'ガイドと商品レビューの違いは何ですか？',
            answer:
              'レビューでは、Cecíliaが実際に商品を使い、写真や動画とともに感想を伝えます。ガイドは、公式ページ、取扱説明書、そのほかの公開情報をもとに、商品の選び方や使い方を説明します。',
            link: { label: 'ガイドとレビューを見る', target: 'reviews' },
          },
          {
            question: 'どんな商品を取り上げていますか？',
            answer:
              '家と日々の暮らしに関わるものです。家具、家電、コーヒー、食品、サプリメント、美容、ファッションなど、さまざまな価格帯の商品を取り上げています。',
          },
          {
            question: '記事の価格は最新ですか？',
            answer:
              '記事に書かれた日付の時点のものです。価格、在庫、キャンペーンは変わるため、お支払いの前にショップで最終金額をご確認ください。',
          },
        ],
      },
    ],
  },
  'zh-hant': {
    metaTitle: '常見問題 | Em Casa com Cecília',
    metaDescription: '關於 Em Casa com Cecília 的解答：優惠碼與代碼、聯盟連結與合作、指南與評測，以及如何聯絡我們。',
    trailLabel: '常見問題',
    title: '常見問題',
    intro: '大家最常問的網站、商店代碼與合作問題。找不到答案嗎？歡迎寫信給我們。',
    categoriesLabel: '問題分類',
    askTitle: '還有疑問嗎？',
    askText: '請把問題寄到{email}。',
    askButton: '寫信給我們',
    newsTitle: '追蹤最新消息',
    newsText: '新影片會先在YouTube和Instagram發布。',
    newsVideos: '觀看影片',
    newsMediaKit: '查看Media Kit（葡萄牙文）',
    categories: [
      {
        id: 'em-casa-com-cecilia',
        title: 'Em Casa com Cecília',
        entries: [
          { home: 'who' },
          { home: 'why' },
          { home: 'contact' },
        ],
      },
      {
        id: 'cupons-e-codigos',
        title: '優惠碼與代碼',
        entries: [
          { home: 'where' },
          {
            question: '優惠碼都有測試過嗎？',
            answer:
              '視商店而定。我們在結帳時實際套用過代碼的商店，頁面會顯示「測試優惠碼」和日期。其他商店則顯示優惠最後核實的日期（「核實」），那是核對優惠內容，並非結帳測試。每家商店的頁面都會說明適用哪一種。',
            link: { label: '查看優惠碼', target: 'coupons' },
          },
          {
            question: '代碼無法使用怎麼辦？',
            answer:
              '請先查看商店頁面的使用規則：有些代碼有最低消費門檻、不能與其他優惠碼同時使用，或不適用於特定商品。如果仍然無法使用，請寫信到{email}，附上商店、代碼和購物車截圖。',
            link: { label: '寫信給我們', target: 'email' },
          },
          {
            question: 'CECILIA010是優惠碼嗎？',
            answer:
              '不是。它是獎勵碼，要填入結帳頁面的Reward Code欄位。它可以和YesStyle自家符合資格的促銷優惠碼同時使用，那些優惠碼填在另一個欄位。請務必在訂單摘要確認兩項折扣都已顯示。',
            link: { label: '如何使用CECILIA010', target: 'yesstyle' },
          },
          {
            question: 'SHEIN的4CW5Y是什麼代碼？',
            answer:
              '這是Cecília的推薦碼。它不是結帳時輸入的代碼，但確實有折扣：使用連結，或在SHEIN的App或網站搜尋4CW5Y，就會開啟一個頁面，裡面有精選的折扣商品和促銷活動。折扣多少、哪些商品適用，由SHEIN決定。',
            link: { label: '查看 SHEIN 頁面', target: 'shein' },
          },
          {
            question: '優惠碼可以重複使用嗎？',
            answer:
              '視商店而定。每家商店的頁面都會在使用規則中說明，代碼能否重複使用、能否與其他促銷同時使用，以及運費怎麼算。',
            link: { label: '查看各商店的使用規則', target: 'coupons' },
          },
        ],
      },
      {
        id: 'links-de-afiliado-e-parcerias',
        title: '聯盟連結與合作',
        entries: [
          {
            question: '透過連結購買，網站會賺錢嗎？',
            answer:
              '有可能。當你透過連結或使用Cecília的代碼購買時，商店可能會支付佣金給Em Casa com Cecília。你付的價格不變。',
          },
          {
            question: '我是在你們的網站上購買嗎？',
            answer:
              '不是。Em Casa com Cecília不販售任何商品：購買和付款都在商店自己的網站完成。我們從不索取信用卡、密碼或註冊。',
          },
          {
            question: '怎麼知道文章是不是合作？',
            answer:
              '有商業關係的文章會附上編輯註記，說明商品是否由品牌寄送，以及網站是否獲得佣金。通往合作商店的連結，在頁面程式碼中標示為贊助連結（sponsored）。',
          },
          {
            question: '合作會改變Cecília對商品的看法嗎？',
            answer:
              '不會。我們不會為了好評收取費用，文章也會區分親自使用的經驗和來自公開資料的內容。',
          },
          {
            question: '我是品牌方，要怎麼提出合作？',
            answer: '請查看葡萄牙文版的Media Kit，並寫信到{email}。',
            link: { label: '查看Media Kit（葡萄牙文）', target: 'mediaKit' },
          },
          {
            question: '我可以寄商品來評測嗎？',
            answer: '寄出前請先與我們聯絡，一起討論。收到商品並不保證會有好評。',
            link: { label: '寫信給我們', target: 'email' },
          },
        ],
      },
      {
        id: 'guias-e-analises',
        title: '指南與評測',
        entries: [
          {
            question: '指南和商品評測有什麼不同？',
            answer:
              '評測是Cecília實際使用商品後分享心得，附上照片或影片。指南則根據官方頁面、說明書和其他公開資料，說明如何挑選或使用商品。',
            link: { label: '查看指南與評測', target: 'reviews' },
          },
          {
            question: '你們評測哪些商品？',
            answer:
              '居家和日常用品：家具、家電、咖啡、食品、保健食品、美妝和時尚。價格帶很多元。',
          },
          {
            question: '文章裡的價格是最新的嗎？',
            answer:
              '價格以文章標示的日期為準。價格、庫存和活動會變動，付款前請到商店確認最終金額。',
          },
        ],
      },
    ],
  },
  'zh-hans': {
    metaTitle: '常见问题 | Em Casa com Cecília',
    metaDescription: '关于 Em Casa com Cecília 的解答：优惠码与代码、联盟链接与合作、指南与评测，以及如何联系我们。',
    trailLabel: '常见问题',
    title: '常见问题',
    intro: '大家最常问的网站、商店代码与合作问题。找不到答案吗？欢迎写信给我们。',
    categoriesLabel: '问题分类',
    askTitle: '还有疑问吗？',
    askText: '请把问题发送到{email}。',
    askButton: '给我们写信',
    newsTitle: '关注最新消息',
    newsText: '新视频会先在YouTube和Instagram发布。',
    newsVideos: '观看视频',
    newsMediaKit: '查看Media Kit（葡萄牙文）',
    categories: [
      {
        id: 'em-casa-com-cecilia',
        title: 'Em Casa com Cecília',
        entries: [
          { home: 'who' },
          { home: 'why' },
          { home: 'contact' },
        ],
      },
      {
        id: 'cupons-e-codigos',
        title: '优惠码与代码',
        entries: [
          { home: 'where' },
          {
            question: '优惠码都测试过吗？',
            answer:
              '视商店而定。我们在结账时实际套用过代码的商店，页面会显示“测试优惠码”和日期。其他商店则显示优惠最后核实的日期（“核实”），那是核对优惠内容，并非结账测试。每家商店的页面都会说明适用哪一种。',
            link: { label: '查看优惠码', target: 'coupons' },
          },
          {
            question: '代码无法使用怎么办？',
            answer:
              '请先查看商店页面的使用规则：有些代码有最低消费门槛、不能与其他优惠码叠加，或不适用于特定商品。如果仍然无法使用，请写信到{email}，附上商店、代码和购物车截图。',
            link: { label: '给我们写信', target: 'email' },
          },
          {
            question: 'CECILIA010是优惠码吗？',
            answer:
              '不是。它是奖励码，要填入结账页面的Reward Code栏位。它可以和YesStyle自家符合资格的促销优惠码叠加使用，那些优惠码填在另一个栏位。请务必在订单摘要确认两项折扣都已显示。',
            link: { label: '如何使用CECILIA010', target: 'yesstyle' },
          },
          {
            question: 'SHEIN的4CW5Y是什么代码？',
            answer:
              '这是Cecília的推荐码。它不是结账时输入的代码，但确实有折扣：使用链接，或在SHEIN的App或网站搜索4CW5Y，就会打开一个页面，里面有精选的折扣商品和促销活动。折扣多少、哪些商品适用，由SHEIN决定。',
            link: { label: '查看 SHEIN 页面', target: 'shein' },
          },
          {
            question: '优惠码可以重复使用吗？',
            answer:
              '视商店而定。每家商店的页面都会在使用规则中说明，代码能否重复使用、能否与其他促销叠加，以及运费怎么算。',
            link: { label: '查看各商店的使用规则', target: 'coupons' },
          },
        ],
      },
      {
        id: 'links-de-afiliado-e-parcerias',
        title: '联盟链接与合作',
        entries: [
          {
            question: '通过链接购买，网站会赚钱吗？',
            answer:
              '有可能。当你通过链接或使用Cecília的代码购买时，商店可能会向Em Casa com Cecília支付佣金。你支付的价格不变。',
          },
          {
            question: '我是在你们的网站上购买吗？',
            answer:
              '不是。Em Casa com Cecília不销售任何商品：购买和付款都在商店自己的网站完成。我们从不索取银行卡、密码或注册。',
          },
          {
            question: '怎么知道文章是不是合作？',
            answer:
              '有商业关系的文章会附上编辑注记，说明商品是否由品牌寄送，以及网站是否获得佣金。通往合作商店的链接，在页面代码中标注为赞助链接（sponsored）。',
          },
          {
            question: '合作会改变Cecília对商品的看法吗？',
            answer:
              '不会。我们不会为了好评收取费用，文章也会区分亲自使用的经验和来自公开资料的内容。',
          },
          {
            question: '我是品牌方，要怎么提出合作？',
            answer: '请查看葡萄牙文版的Media Kit，并写信到{email}。',
            link: { label: '查看Media Kit（葡萄牙文）', target: 'mediaKit' },
          },
          {
            question: '我可以寄商品来评测吗？',
            answer: '寄出前请先与我们联系，一起商量。收到商品并不保证会有好评。',
            link: { label: '给我们写信', target: 'email' },
          },
        ],
      },
      {
        id: 'guias-e-analises',
        title: '指南与评测',
        entries: [
          {
            question: '指南和商品评测有什么不同？',
            answer:
              '评测是Cecília实际使用商品后分享心得，附上照片或视频。指南则根据官方页面、说明书和其他公开资料，说明如何挑选或使用商品。',
            link: { label: '查看指南与评测', target: 'reviews' },
          },
          {
            question: '你们评测哪些商品？',
            answer:
              '居家和日常用品：家具、家电、咖啡、食品、保健食品、美妆和时尚。价格区间多样。',
          },
          {
            question: '文章里的价格是最新的吗？',
            answer:
              '价格以文章标示的日期为准。价格、库存和活动会变动，付款前请到商店确认最终金额。',
          },
        ],
      },
    ],
  },
};
