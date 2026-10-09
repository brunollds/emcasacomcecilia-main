import type { Locale } from '@/lib/i18n/locales';

// Textos da home de cada idioma (/en, /ja…). O nome da Cecília, o e-mail, "YesStyle Superstar
// Influencer" e @emcasacomcecilia não se traduzem e ficam fora daqui; os marcadores entre chaves são
// preenchidos por fillTemplate.
export type LocaleHomeCopy = {
  metaTitle: string;
  metaDescription: string;
  heroTitleTop: string;
  heroTitleBottom: string;
  intro: string;
  photoAlt: string;
  followers: string;
  photoCaptionLabel: string;
  photoCaptionTitle: string;
  location: string;
  since: string;
  certificateTier: string;
  certificateLink: string;
  certificateAlt: string;
  certificateClose: string;
  emailCta: string;
  socialAria: string;
  storesTitle: string;
  storesIntro: string;
  allArticles: string;
  safetyTitle: string;
  safety: readonly [string, string, string, string, string];
  faqTitle: string;
  faqWhoQuestion: string;
  faqWhoAnswer: string;
  faqWhyQuestion: string;
  faqWhyAnswer: string;
  faqWhereQuestion: string;
  faqWhereAnswer: string;
  faqContactQuestion: string;
  faqContactAnswer: string;
  followTitle: string;
  followIntro: string;
};

type LocaleHomeCopyLocale = Exclude<Locale, 'pt'>;

const COPY: Record<LocaleHomeCopyLocale, LocaleHomeCopy> = {
  en: {
    metaTitle: 'Em Casa com Cecília: guides and partner store codes',
    metaDescription: '{name}, a Brazilian creator since {since}, shares shopping guides and the official codes of {stores}.',
    heroTitleTop: 'From my home',
    heroTitleBottom: 'to yours.',
    intro: 'Hi, I’m Cecília. I share what I try at home and the codes from the stores I partner with.',
    photoAlt: 'Cecília holding a cup of coffee in her kitchen',
    followers: 'followers',
    photoCaptionLabel: 'On Instagram',
    photoCaptionTitle: 'Behind the scenes, routine and recipes',
    location: 'Minas Gerais, Brazil',
    since: 'Creating content since {since}',
    certificateTier: 'Top tier of the YesStyle Influencer Program · {years}',
    certificateLink: 'See certificate',
    certificateAlt:
      'YesStyle Superstar Influencer Certificate: {name} reached the top tier, SUPERSTAR, of the YesStyle Influencer Program. Valid from {from} to {until}.',
    certificateClose: 'Close',
    emailCta: 'Email us',
    socialAria: 'Cecília on {network}',
    storesTitle: 'Partner stores',
    storesIntro: 'Stores that work with Cecília. Each page explains the code and how to use it.',
    allArticles: 'All guides & reviews ({count})',
    safetyTitle: 'Is this site safe?',
    safety: [
      'We don’t sell anything. You buy on the store’s own website, and you pay the store directly.',
      'We never ask for your card, password or personal data. There is no sign-up here.',
      'When you buy through our links, the store may pay us a commission. You pay the same price.',
      'The codes are the ones each store gave Cecília. Every store page shows when it was last checked.',
      'This site only lives at emcasacomcecilia.com.',
    ],
    faqTitle: 'Frequently asked questions',
    faqWhoQuestion: 'Who is Cecília?',
    faqWhoAnswer:
      '{name} is a Brazilian creator from Minas Gerais. Since {since} she has shared home tips, recipes and shopping guides as @emcasacomcecilia.',
    faqWhyQuestion: 'Why is a Brazilian site in my language?',
    faqWhyAnswer:
      'Cecília works with international stores such as {stores}. She translates the guides and the store pages so readers in other countries can use them too.',
    faqWhereQuestion: 'Where do I use each code?',
    faqWhereAnswer: 'Each partner store has a page in your language that explains its code, where to use it and when it was last checked.',
    faqContactQuestion: 'How can I contact you?',
    faqContactAnswer: 'Write to {email}.',
    followTitle: 'Follow Cecília',
    followIntro: 'Day-to-day home life, recipes and product tests, in Portuguese.',
  },
  es: {
    metaTitle: 'Em Casa com Cecília: guías y códigos de tiendas asociadas',
    metaDescription: '{name}, creadora brasileña desde {since}, comparte guías de compra y los códigos oficiales de {stores}.',
    heroTitleTop: 'De mi casa',
    heroTitleBottom: 'a la tuya.',
    intro: 'Hola, soy Cecília. Comparto lo que pruebo en casa y los códigos de las tiendas con las que colaboro.',
    photoAlt: 'Cecília con una taza de café en su cocina',
    followers: 'seguidores',
    photoCaptionLabel: 'En Instagram',
    photoCaptionTitle: 'Detrás de cámaras, rutina y recetas',
    location: 'Minas Gerais, Brasil',
    since: 'Creando contenido desde {since}',
    certificateTier: 'Nivel más alto del Programa de Influencers de YesStyle · {years}',
    certificateLink: 'Ver certificado',
    certificateAlt:
      'Certificado YesStyle Superstar Influencer: {name} alcanzó el nivel más alto, SUPERSTAR, del Programa de Influencers de YesStyle. Válido del {from} al {until}.',
    certificateClose: 'Cerrar',
    emailCta: 'Escríbenos',
    socialAria: 'Cecília en {network}',
    storesTitle: 'Tiendas asociadas',
    storesIntro: 'Tiendas que trabajan con Cecília. Cada página explica el código y cómo usarlo.',
    allArticles: 'Todas las guías y reseñas ({count})',
    safetyTitle: '¿Este sitio es seguro?',
    safety: [
      'No vendemos nada. Compras en el sitio oficial de la tienda y le pagas directamente a ella.',
      'Nunca pedimos tu tarjeta, contraseña ni datos personales. Aquí no hay registro.',
      'Cuando compras a través de nuestros enlaces, la tienda puede pagarnos una comisión. Tú pagas el mismo precio.',
      'Los códigos son los que cada tienda le dio a Cecília. Cada página de tienda muestra cuándo se revisó por última vez.',
      'Este sitio solo existe en emcasacomcecilia.com.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqWhoQuestion: '¿Quién es Cecília?',
    faqWhoAnswer:
      '{name} es una creadora brasileña de Minas Gerais. Desde {since} comparte consejos para el hogar, recetas y guías de compra como @emcasacomcecilia.',
    faqWhyQuestion: '¿Por qué un sitio brasileño está en mi idioma?',
    faqWhyAnswer:
      'Cecília trabaja con tiendas internacionales como {stores}. Traduce las guías y las páginas de las tiendas para que los lectores de otros países también puedan usarlas.',
    faqWhereQuestion: '¿Dónde uso cada código?',
    faqWhereAnswer: 'Cada tienda asociada tiene una página en tu idioma que explica su código, dónde usarlo y cuándo se revisó por última vez.',
    faqContactQuestion: '¿Cómo puedo contactarlos?',
    faqContactAnswer: 'Escribe a {email}.',
    followTitle: 'Sigue a Cecília',
    followIntro: 'El día a día de la casa, recetas y pruebas de productos, en portugués.',
  },
  fr: {
    metaTitle: 'Em Casa com Cecília : guides et codes des boutiques partenaires',
    metaDescription: '{name}, créatrice brésilienne depuis {since}, partage des guides d’achat et les codes officiels de {stores}.',
    heroTitleTop: 'De ma maison',
    heroTitleBottom: 'à la vôtre.',
    intro: 'Bonjour, je suis Cecília. Je partage ce que je teste chez moi et les codes des boutiques avec lesquelles je travaille.',
    photoAlt: 'Cecília tenant une tasse de café dans sa cuisine',
    followers: 'abonnés',
    photoCaptionLabel: 'Sur Instagram',
    photoCaptionTitle: 'Coulisses, routine et recettes',
    location: 'Minas Gerais, Brésil',
    since: 'Crée du contenu depuis {since}',
    certificateTier: 'Plus haut niveau du programme d’influenceurs YesStyle · {years}',
    certificateLink: 'Voir le certificat',
    certificateAlt:
      'Certificat YesStyle Superstar Influencer : {name} a atteint le plus haut niveau, SUPERSTAR, du programme d’influenceurs YesStyle. Valable du {from} au {until}.',
    certificateClose: 'Fermer',
    emailCta: 'Nous écrire',
    socialAria: 'Cecília sur {network}',
    storesTitle: 'Boutiques partenaires',
    storesIntro: 'Les boutiques qui travaillent avec Cecília. Chaque page explique le code et comment l’utiliser.',
    allArticles: 'Tous les guides et avis ({count})',
    safetyTitle: 'Ce site est-il sûr ?',
    safety: [
      'Nous ne vendons rien. Vous achetez sur le site officiel de la boutique et vous la payez directement.',
      'Nous ne demandons jamais votre carte, votre mot de passe ni vos données personnelles. Aucune inscription ici.',
      'Quand vous achetez via nos liens, la boutique peut nous verser une commission. Vous payez le même prix.',
      'Les codes sont ceux que chaque boutique a confiés à Cecília. Chaque page de boutique indique la date de la dernière vérification.',
      'Ce site existe uniquement sur emcasacomcecilia.com.',
    ],
    faqTitle: 'Questions fréquentes',
    faqWhoQuestion: 'Qui est Cecília ?',
    faqWhoAnswer:
      '{name} est une créatrice brésilienne du Minas Gerais. Depuis {since}, elle partage des astuces pour la maison, des recettes et des guides d’achat sous le nom @emcasacomcecilia.',
    faqWhyQuestion: 'Pourquoi un site brésilien est-il dans ma langue ?',
    faqWhyAnswer:
      'Cecília travaille avec des boutiques internationales comme {stores}. Elle traduit les guides et les pages des boutiques pour que les lecteurs d’autres pays puissent aussi s’en servir.',
    faqWhereQuestion: 'Où utiliser chaque code ?',
    faqWhereAnswer: 'Chaque boutique partenaire a une page dans votre langue qui explique son code, où l’utiliser et quand il a été vérifié pour la dernière fois.',
    faqContactQuestion: 'Comment vous contacter ?',
    faqContactAnswer: 'Écrivez à {email}.',
    followTitle: 'Suivre Cecília',
    followIntro: 'Le quotidien de la maison, des recettes et des tests de produits, en portugais.',
  },
  de: {
    metaTitle: 'Em Casa com Cecília: Ratgeber und Codes von Partner-Shops',
    metaDescription: '{name}, brasilianische Creatorin seit {since}, teilt Einkaufsratgeber und die offiziellen Codes von {stores}.',
    heroTitleTop: 'Von meinem Zuhause',
    heroTitleBottom: 'zu deinem.',
    intro: 'Hallo, ich bin Cecília. Ich teile, was ich zu Hause ausprobiere, und die Codes der Shops, mit denen ich zusammenarbeite.',
    photoAlt: 'Cecília mit einer Tasse Kaffee in ihrer Küche',
    followers: 'Follower',
    photoCaptionLabel: 'Auf Instagram',
    photoCaptionTitle: 'Hinter den Kulissen, Alltag und Rezepte',
    location: 'Minas Gerais, Brasilien',
    since: 'Erstellt Inhalte seit {since}',
    certificateTier: 'Höchste Stufe des YesStyle-Influencer-Programms · {years}',
    certificateLink: 'Zertifikat ansehen',
    certificateAlt:
      'Zertifikat YesStyle Superstar Influencer: {name} hat die höchste Stufe, SUPERSTAR, des YesStyle-Influencer-Programms erreicht. Gültig vom {from} bis {until}.',
    certificateClose: 'Schließen',
    emailCta: 'Schreib uns',
    socialAria: 'Cecília auf {network}',
    storesTitle: 'Partner-Shops',
    storesIntro: 'Shops, die mit Cecília zusammenarbeiten. Jede Seite erklärt den Code und wie man ihn nutzt.',
    allArticles: 'Alle Ratgeber und Tests ({count})',
    safetyTitle: 'Ist diese Website sicher?',
    safety: [
      'Wir verkaufen nichts. Du kaufst auf der offiziellen Website des Shops und bezahlst direkt dort.',
      'Wir fragen nie nach deiner Karte, deinem Passwort oder persönlichen Daten. Hier gibt es keine Registrierung.',
      'Wenn du über unsere Links kaufst, kann uns der Shop eine Provision zahlen. Du zahlst denselben Preis.',
      'Die Codes sind die, die jeder Shop Cecília gegeben hat. Jede Shop-Seite zeigt, wann sie zuletzt geprüft wurde.',
      'Diese Website gibt es nur unter emcasacomcecilia.com.',
    ],
    faqTitle: 'Häufige Fragen',
    faqWhoQuestion: 'Wer ist Cecília?',
    faqWhoAnswer:
      '{name} ist eine brasilianische Creatorin aus Minas Gerais. Seit {since} teilt sie als @emcasacomcecilia Tipps für Zuhause, Rezepte und Einkaufsratgeber.',
    faqWhyQuestion: 'Warum gibt es eine brasilianische Website in meiner Sprache?',
    faqWhyAnswer:
      'Cecília arbeitet mit internationalen Shops wie {stores}. Sie übersetzt die Ratgeber und die Shop-Seiten, damit auch Leser in anderen Ländern sie nutzen können.',
    faqWhereQuestion: 'Wo nutze ich welchen Code?',
    faqWhereAnswer: 'Jeder Partner-Shop hat eine Seite in deiner Sprache, die seinen Code erklärt, wo man ihn nutzt und wann er zuletzt geprüft wurde.',
    faqContactQuestion: 'Wie kann ich euch kontaktieren?',
    faqContactAnswer: 'Schreib an {email}.',
    followTitle: 'Folge Cecília',
    followIntro: 'Alltag zu Hause, Rezepte und Produkttests, auf Portugiesisch.',
  },
  it: {
    metaTitle: 'Em Casa com Cecília: guide e codici dei negozi partner',
    metaDescription: '{name}, creator brasiliana dal {since}, condivide guide all’acquisto e i codici ufficiali di {stores}.',
    heroTitleTop: 'Da casa mia',
    heroTitleBottom: 'alla tua.',
    intro: 'Ciao, sono Cecília. Condivido quello che provo a casa e i codici dei negozi con cui collaboro.',
    photoAlt: 'Cecília con una tazza di caffè nella sua cucina',
    followers: 'follower',
    photoCaptionLabel: 'Su Instagram',
    photoCaptionTitle: 'Dietro le quinte, routine e ricette',
    location: 'Minas Gerais, Brasile',
    since: 'Crea contenuti dal {since}',
    certificateTier: 'Livello più alto del programma influencer di YesStyle · {years}',
    certificateLink: 'Vedi il certificato',
    certificateAlt:
      'Certificato YesStyle Superstar Influencer: {name} ha raggiunto il livello più alto, SUPERSTAR, del programma influencer di YesStyle. Valido dal {from} al {until}.',
    certificateClose: 'Chiudi',
    emailCta: 'Scrivici',
    socialAria: 'Cecília su {network}',
    storesTitle: 'Negozi partner',
    storesIntro: 'Negozi che collaborano con Cecília. Ogni pagina spiega il codice e come usarlo.',
    allArticles: 'Tutte le guide e recensioni ({count})',
    safetyTitle: 'Questo sito è sicuro?',
    safety: [
      'Non vendiamo nulla. Acquisti sul sito ufficiale del negozio e paghi direttamente il negozio.',
      'Non chiediamo mai carta, password o dati personali. Qui non c’è nessuna registrazione.',
      'Quando acquisti tramite i nostri link, il negozio può pagarci una commissione. Tu paghi lo stesso prezzo.',
      'I codici sono quelli che ogni negozio ha dato a Cecília. Ogni pagina del negozio mostra quando è stata verificata l’ultima volta.',
      'Questo sito esiste solo su emcasacomcecilia.com.',
    ],
    faqTitle: 'Domande frequenti',
    faqWhoQuestion: 'Chi è Cecília?',
    faqWhoAnswer:
      '{name} è una creator brasiliana del Minas Gerais. Dal {since} condivide consigli per la casa, ricette e guide all’acquisto come @emcasacomcecilia.',
    faqWhyQuestion: 'Perché un sito brasiliano è nella mia lingua?',
    faqWhyAnswer:
      'Cecília collabora con negozi internazionali come {stores}. Traduce le guide e le pagine dei negozi perché anche i lettori di altri paesi possano usarle.',
    faqWhereQuestion: 'Dove uso ogni codice?',
    faqWhereAnswer: 'Ogni negozio partner ha una pagina nella tua lingua che spiega il suo codice, dove usarlo e quando è stato verificato l’ultima volta.',
    faqContactQuestion: 'Come posso contattarvi?',
    faqContactAnswer: 'Scrivi a {email}.',
    followTitle: 'Segui Cecília',
    followIntro: 'La vita di casa di ogni giorno, ricette e test di prodotti, in portoghese.',
  },
  ko: {
    metaTitle: 'Em Casa com Cecília: 가이드와 파트너 스토어 코드',
    metaDescription: '{since}년부터 활동한 브라질 크리에이터 {name}. 쇼핑 가이드와 {stores}의 공식 코드를 소개합니다.',
    heroTitleTop: '우리 집에서',
    heroTitleBottom: '당신의 집으로.',
    intro: '안녕하세요, Cecília예요. 집에서 직접 써 본 것과 함께하는 스토어의 코드를 소개해요.',
    photoAlt: '부엌에서 커피잔을 들고 있는 Cecília',
    followers: '팔로워',
    photoCaptionLabel: 'Instagram에서',
    photoCaptionTitle: '비하인드, 일상, 레시피',
    location: '브라질 미나스제라이스',
    since: '{since}년부터 콘텐츠 제작',
    certificateTier: 'YesStyle 인플루언서 프로그램 최고 등급 · {years}',
    certificateLink: '인증서 보기',
    certificateAlt:
      'YesStyle Superstar Influencer 인증서: {name}은(는) YesStyle 인플루언서 프로그램의 최고 등급인 SUPERSTAR를 달성했습니다. 유효 기간: {from}~{until}.',
    certificateClose: '닫기',
    emailCta: '이메일 보내기',
    socialAria: '{network}의 Cecília',
    storesTitle: '파트너 스토어',
    storesIntro: 'Cecília와 함께하는 스토어예요. 각 페이지에서 코드와 사용 방법을 안내해요.',
    allArticles: '가이드와 리뷰 전체 보기 ({count})',
    safetyTitle: '이 사이트는 안전한가요?',
    safety: [
      '저희는 아무것도 판매하지 않아요. 구매는 스토어 공식 사이트에서 하고, 결제도 스토어에 직접 해요.',
      '카드 정보, 비밀번호, 개인 정보를 절대 요청하지 않아요. 이곳에는 회원가입도 없어요.',
      '저희 링크로 구매하면 스토어가 저희에게 수수료를 줄 수 있어요. 가격은 똑같아요.',
      '코드는 각 스토어가 Cecília에게 준 것이에요. 스토어 페이지마다 마지막 확인 날짜가 있어요.',
      '이 사이트는 emcasacomcecilia.com에만 있어요.',
    ],
    faqTitle: '자주 묻는 질문',
    faqWhoQuestion: 'Cecília는 누구인가요?',
    faqWhoAnswer:
      '{name}은(는) 브라질 미나스제라이스 출신 크리에이터예요. {since}년부터 @emcasacomcecilia로 살림 팁, 레시피, 쇼핑 가이드를 나누고 있어요.',
    faqWhyQuestion: '브라질 사이트가 왜 제 언어로 되어 있나요?',
    faqWhyAnswer: 'Cecília는 {stores} 같은 해외 스토어와 함께 일해요. 다른 나라 독자도 쓸 수 있도록 가이드와 스토어 페이지를 번역해요.',
    faqWhereQuestion: '각 코드는 어디에 쓰나요?',
    faqWhereAnswer: '파트너 스토어마다 사용자의 언어로 된 페이지가 있어요. 코드, 사용하는 곳, 마지막 확인 날짜를 안내해요.',
    faqContactQuestion: '어떻게 연락하나요?',
    faqContactAnswer: '{email}로 메일을 보내 주세요.',
    followTitle: 'Cecília 팔로우하기',
    followIntro: '살림 일상, 레시피, 제품 테스트를 포르투갈어로 전해요.',
  },
  ja: {
    metaTitle: 'Em Casa com Cecília：ガイドとパートナーショップのコード',
    metaDescription: '{since}年から活動するブラジルのクリエイター、{name}。ショッピングガイドと{stores}の公式コードを紹介します。',
    heroTitleTop: '私の家から',
    heroTitleBottom: 'あなたの家へ。',
    intro: 'こんにちは、Cecíliaです。家で試したものと、提携ショップのコードを紹介しています。',
    photoAlt: 'キッチンでコーヒーカップを持つCecília',
    followers: 'フォロワー',
    photoCaptionLabel: 'Instagramで',
    photoCaptionTitle: '舞台裏、日々の暮らし、レシピ',
    location: 'ブラジル・ミナスジェライス州',
    since: '{since}年からコンテンツを発信',
    certificateTier: 'YesStyleインフルエンサープログラムの最上位ランク · {years}',
    certificateLink: '証明書を見る',
    certificateAlt:
      'YesStyle Superstar Influencer証明書：{name}はYesStyleインフルエンサープログラムの最上位ランク、SUPERSTARに到達しました。有効期間：{from}〜{until}。',
    certificateClose: '閉じる',
    emailCta: 'メールで連絡',
    socialAria: '{network}のCecília',
    storesTitle: 'パートナーショップ',
    storesIntro: 'Cecíliaと提携しているショップです。各ページでコードと使い方を説明しています。',
    allArticles: 'すべてのガイドとレビュー（{count}）',
    safetyTitle: 'このサイトは安全ですか？',
    safety: [
      '私たちは何も販売していません。購入はショップの公式サイトで行い、支払いもショップに直接行います。',
      'カード情報、パスワード、個人情報をお聞きすることはありません。会員登録もありません。',
      '私たちのリンクから購入すると、ショップから手数料を受け取ることがあります。価格は変わりません。',
      'コードは各ショップがCecíliaに提供したものです。各ショップのページに最終確認日を載せています。',
      'このサイトはemcasacomcecilia.comだけで運営しています。',
    ],
    faqTitle: 'よくある質問',
    faqWhoQuestion: 'Cecíliaとは誰ですか？',
    faqWhoAnswer:
      '{name}は、ブラジル・ミナスジェライス州出身のクリエイターです。{since}年から@emcasacomceciliaとして、家事のコツ、レシピ、ショッピングガイドを発信しています。',
    faqWhyQuestion: 'なぜブラジルのサイトが私の言語で読めるのですか？',
    faqWhyAnswer: 'Cecíliaは{stores}などの海外ショップと提携しています。ほかの国の読者にも使ってもらえるよう、ガイドとショップのページを翻訳しています。',
    faqWhereQuestion: 'それぞれのコードはどこで使いますか？',
    faqWhereAnswer: '各パートナーショップには、あなたの言語のページがあります。コード、使う場所、最終確認日を説明しています。',
    faqContactQuestion: '連絡するにはどうすればいいですか？',
    faqContactAnswer: '{email}までメールをお送りください。',
    followTitle: 'Cecíliaをフォロー',
    followIntro: '家の日常、レシピ、商品テストをポルトガル語で発信しています。',
  },
  'zh-hant': {
    metaTitle: 'Em Casa com Cecília：指南與合作商店代碼',
    metaDescription: '{name}，自{since}年起創作內容的巴西創作者，分享購物指南與{stores}的官方代碼。',
    heroTitleTop: '從我的家',
    heroTitleBottom: '到你的家。',
    intro: '你好，我是Cecília。我分享在家試過的東西，以及合作商店的代碼。',
    photoAlt: 'Cecília在廚房拿著一杯咖啡',
    followers: '粉絲',
    photoCaptionLabel: '在Instagram',
    photoCaptionTitle: '幕後花絮、日常與食譜',
    location: '巴西米納斯吉拉斯州',
    since: '自{since}年起創作內容',
    certificateTier: 'YesStyle網紅計畫最高等級 · {years}',
    certificateLink: '查看證書',
    certificateAlt: 'YesStyle Superstar Influencer證書：{name}達到YesStyle網紅計畫的最高等級SUPERSTAR。有效期間：{from}至{until}。',
    certificateClose: '關閉',
    emailCta: '寫信給我們',
    socialAria: 'Cecília的{network}',
    storesTitle: '合作商店',
    storesIntro: '與Cecília合作的商店。每個頁面都會說明代碼和使用方式。',
    allArticles: '所有指南與評測（{count}）',
    safetyTitle: '這個網站安全嗎？',
    safety: [
      '我們不販售任何商品。你在商店的官方網站購買，並直接付款給商店。',
      '我們從不索取你的信用卡、密碼或個人資料。這裡不需要註冊。',
      '當你透過我們的連結購買時，商店可能會支付我們佣金。你付的價格不變。',
      '代碼是各商店提供給Cecília的。每個商店頁面都會顯示最後確認的日期。',
      '本網站只在emcasacomcecilia.com。',
    ],
    faqTitle: '常見問題',
    faqWhoQuestion: 'Cecília是誰？',
    faqWhoAnswer: '{name}是來自巴西米納斯吉拉斯州的創作者。自{since}年起，她以@emcasacomcecilia分享居家技巧、食譜和購物指南。',
    faqWhyQuestion: '為什麼巴西網站會有我的語言？',
    faqWhyAnswer: 'Cecília與{stores}等國際商店合作。她翻譯指南和商店頁面，讓其他國家的讀者也能使用。',
    faqWhereQuestion: '每個代碼要在哪裡使用？',
    faqWhereAnswer: '每家合作商店都有你所用語言的頁面，說明它的代碼、使用位置和最後確認的日期。',
    faqContactQuestion: '要如何聯絡你們？',
    faqContactAnswer: '請寫信到{email}。',
    followTitle: '追蹤Cecília',
    followIntro: '以葡萄牙文分享居家日常、食譜和產品測試。',
  },
  'zh-hans': {
    metaTitle: 'Em Casa com Cecília：指南与合作商店代码',
    metaDescription: '{name}，自{since}年起创作内容的巴西创作者，分享购物指南与{stores}的官方代码。',
    heroTitleTop: '从我的家',
    heroTitleBottom: '到你的家。',
    intro: '你好，我是Cecília。我分享在家试过的东西，以及合作商店的代码。',
    photoAlt: 'Cecília在厨房拿着一杯咖啡',
    followers: '粉丝',
    photoCaptionLabel: '在Instagram',
    photoCaptionTitle: '幕后花絮、日常与食谱',
    location: '巴西米纳斯吉拉斯州',
    since: '自{since}年起创作内容',
    certificateTier: 'YesStyle网红计划最高等级 · {years}',
    certificateLink: '查看证书',
    certificateAlt: 'YesStyle Superstar Influencer证书：{name}达到YesStyle网红计划的最高等级SUPERSTAR。有效期：{from}至{until}。',
    certificateClose: '关闭',
    emailCta: '给我们写信',
    socialAria: 'Cecília的{network}',
    storesTitle: '合作商店',
    storesIntro: '与Cecília合作的商店。每个页面都会说明代码和使用方法。',
    allArticles: '所有指南与评测（{count}）',
    safetyTitle: '这个网站安全吗？',
    safety: [
      '我们不销售任何商品。你在商店的官方网站购买，并直接付款给商店。',
      '我们从不索取你的银行卡、密码或个人信息。这里不需要注册。',
      '当你通过我们的链接购买时，商店可能会支付我们佣金。你支付的价格不变。',
      '代码是各商店提供给Cecília的。每个商店页面都会显示最后确认的日期。',
      '本网站只在emcasacomcecilia.com。',
    ],
    faqTitle: '常见问题',
    faqWhoQuestion: 'Cecília是谁？',
    faqWhoAnswer: '{name}是来自巴西米纳斯吉拉斯州的创作者。自{since}年起，她以@emcasacomcecilia分享居家技巧、食谱和购物指南。',
    faqWhyQuestion: '为什么巴西网站会有我的语言？',
    faqWhyAnswer: 'Cecília与{stores}等国际商店合作。她翻译指南和商店页面，让其他国家的读者也能使用。',
    faqWhereQuestion: '每个代码要在哪里使用？',
    faqWhereAnswer: '每家合作商店都有你所用语言的页面，说明它的代码、使用位置和最后确认的日期。',
    faqContactQuestion: '如何联系你们？',
    faqContactAnswer: '请写信到{email}。',
    followTitle: '关注Cecília',
    followIntro: '用葡萄牙语分享居家日常、食谱和产品测试。',
  },
};

export function getLocaleHomeCopy(locale: LocaleHomeCopyLocale): LocaleHomeCopy {
  return COPY[locale];
}

// Troca cada {chave} pelo valor. Chave sem valor é erro de texto: para a build em vez de ir ao ar.
export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    if (!(key in values)) throw new Error(`[localeHomeCopy] "{${key}}" sem valor em "${template}"`);
    return String(values[key]);
  });
}
