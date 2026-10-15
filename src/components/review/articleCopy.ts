import type { EditorialNoteLabels } from '@/components/editorial/EditorialNotePill';
import type { ReviewVideoLabels } from './ReviewLoopVideo';
import type { Recommendation, ReviewKind } from '@/lib/content';
import type { CouponCodeKind } from '@/lib/couponsData';
import type { Locale } from '@/lib/i18n/locales';
import type { CouponCopyLocale } from './couponCopyLocale';

// O francês pede espaço antes de : ; ? ! e %, e ele não pode quebrar a linha.
const NBSP = ' ';

// Textos do corpo do artigo que não são conteúdo editorial: selo do tipo, veredito e nota, ficha do
// produto, bloco de vídeo, legenda da imagem, o nome da trilha para o leitor de tela (o mesmo das
// páginas de loja, em couponStoreCopy.tsx) e o rótulo e o fechar da nota editorial, que as receitas
// usam em PT. A sidebar e o dock têm os deles em sidebarCopy.ts.
export type ArticleCopy = {
  kindLabel: Record<ReviewKind, string>;
  verdictTitle: string;
  editorialNoteTitle: string;
  editorialNoteClose: string;
  ratingLabel: (stars: string) => string;
  recommendation: Record<Recommendation, string>;
  approvedSeal: string;
  scoreTitle: string;
  verdictHeading: string;
  rated: string;
  strengths: string;
  cautions: string;
  finalVerdictLink: string;
  productSheet: string;
  productSheetOpen: string;
  productSheetClose: string;
  productSheetCaption: string;
  productSheetLink: string;
  // Aparece no lugar do ícone depois de copiar o link de uma seção (ficha, veredito).
  sectionLinkCopied: string;
  relatedVideo: string;
  watchOnYoutube: string;
  openVideoPage: string;
  videoPause: string;
  videoPlay: string;
  videoUnsupported: string;
  demoVideo: (title: string) => string;
  breadcrumbLabel: string;
  // Rótulos das regras do bloco da loja; neutros, porque o código pode ser de recompensa ou de indicação.
  ruleTestedLabel: string;
  ruleVerifiedLabel: string;
  // Sob o recorte depois de copiar. A recompensa vai no campo Reward Code; a indicação não se cola no
  // checkout, pesquisa-se no aplicativo (o mesmo texto do inlineReferral, em couponCopyLocale.ts).
  copiedHint: (brand: string, kind?: CouponCodeKind) => string;
  // Bloco da loja no fim do artigo.
  storeBlockTitle: (brand: string) => string;
  allRules: string;
  allStoreArticles: (count: number, brand: string) => string;
  // Caixa da Cecília no fim do artigo, com as frases que a home de cada idioma já usa.
  authorBoxTitle: string;
  authorBoxBody: string;
  authorBoxLink: string;
  // Abre a nota de transparência do topo, que fica numa linha.
  disclosureMore: string;
  // Botões do áudio do artigo, depois de tocar (o "Ouvir artigo" vem do shellDictionary).
  listenPause: string;
  listenResume: string;
  listenStop: string;
};

const articleCopy: Record<Locale, ArticleCopy> = {
  pt: {
    kindLabel: { produto: 'Review de produto', guia: 'Guia', editorial: 'Editorial' },
    verdictTitle: 'Veredito da Cecília',
    editorialNoteTitle: 'Nota editorial',
    editorialNoteClose: 'Fechar',
    ratingLabel: (stars) => `Avaliação ${stars} de 5 estrelas`,
    recommendation: { recomendo: '✓ Recomendo', 'com ressalvas': 'Com ressalvas', 'não recomendo': 'Não recomendo' },
    approvedSeal: 'Aprovado pela Cecília',
    scoreTitle: 'Nota da Cecília',
    verdictHeading: 'Veredito',
    rated: 'Avaliado',
    strengths: 'Pontos fortes',
    cautions: 'Pontos de atenção',
    finalVerdictLink: 'Copiar link do veredito final',
    productSheet: 'Ficha do produto',
    productSheetOpen: 'Abrir',
    productSheetClose: 'Fechar',
    productSheetCaption: 'Ficha técnica do produto avaliado',
    productSheetLink: 'Copiar link da ficha do produto',
    sectionLinkCopied: 'Link copiado!',
    relatedVideo: 'Vídeo relacionado',
    watchOnYoutube: 'Assista ao vídeo completo no YouTube',
    openVideoPage: 'Abrir a página dedicada ao vídeo',
    videoPause: 'Pausar vídeo',
    videoPlay: 'Reproduzir vídeo',
    videoUnsupported: 'Seu navegador não suporta vídeos.',
    demoVideo: (title) => `Vídeo demonstrativo: ${title}`,
    breadcrumbLabel: 'Você está em',
    ruleTestedLabel: 'Testado em',
    ruleVerifiedLabel: 'Conferido em',
    copiedHint: (brand, kind) =>
      kind === 'reward'
        ? `Copiado. Agora é só colar no campo Reward Code da ${brand}.`
        : kind === 'referral'
          ? `Copiado. Agora pesquise o código de indicação no aplicativo ${brand}.`
          : `Copiado. Agora é só colar no checkout da ${brand}.`,
    storeBlockTitle: (brand) => `Sua compra na ${brand}`,
    allRules: 'Ver todas as regras',
    allStoreArticles: (count, brand) => `Todos os ${count} artigos da ${brand}`,
    authorBoxTitle: 'Oi, eu sou a Cecília',
    authorBoxBody: 'Conto o que testo em casa e trago os códigos das lojas parceiras.',
    authorBoxLink: 'Conheça a Cecília',
    disclosureMore: 'Ler mais',
    listenPause: 'Pausar',
    listenResume: 'Continuar',
    listenStop: 'Parar',
  },
  en: {
    kindLabel: { produto: 'Product review', guia: 'Guide', editorial: 'Editorial' },
    verdictTitle: "Cecília's verdict",
    editorialNoteTitle: 'Editorial note',
    editorialNoteClose: 'Close',
    ratingLabel: (stars) => `Rated ${stars} out of 5 stars`,
    recommendation: { recomendo: '✓ Recommended', 'com ressalvas': 'With reservations', 'não recomendo': 'Not recommended' },
    approvedSeal: 'Approved by Cecília',
    scoreTitle: "Cecília's score",
    verdictHeading: 'Verdict',
    rated: 'Rated',
    strengths: 'Strengths',
    cautions: 'Things to watch',
    finalVerdictLink: 'Copy link to the final verdict',
    productSheet: 'Product details',
    productSheetOpen: 'Open',
    productSheetClose: 'Close',
    productSheetCaption: 'Technical details of the reviewed product',
    productSheetLink: 'Copy link to the product details',
    sectionLinkCopied: 'Link copied!',
    relatedVideo: 'Related video',
    watchOnYoutube: 'Watch the full video on YouTube',
    openVideoPage: 'Open the dedicated video page',
    videoPause: 'Pause video',
    videoPlay: 'Play video',
    videoUnsupported: 'Your browser does not support videos.',
    demoVideo: (title) => `Demo video: ${title}`,
    breadcrumbLabel: 'You are here',
    ruleTestedLabel: 'Tested on',
    ruleVerifiedLabel: 'Checked on',
    copiedHint: (brand, kind) =>
      kind === 'reward'
        ? `Copied. Now just paste it in the Reward Code field at ${brand}.`
        : kind === 'referral'
          ? `Copied. Now search the ${brand} Brazil referral code in the ${brand} app.`
          : `Copied. Now just paste it at the ${brand} checkout.`,
    storeBlockTitle: (brand) => `Shopping at ${brand}`,
    allRules: 'See all the rules',
    allStoreArticles: (count, brand) => `All ${count} ${brand} articles`,
    authorBoxTitle: 'Hi, I’m Cecília',
    authorBoxBody: 'I share what I try at home and the codes from the stores I partner with.',
    authorBoxLink: 'Meet Cecília',
    disclosureMore: 'Read more',
    listenPause: 'Pause',
    listenResume: 'Resume',
    listenStop: 'Stop',
  },
  es: {
    kindLabel: { produto: 'Reseña de producto', guia: 'Guía', editorial: 'Editorial' },
    verdictTitle: 'Veredicto de Cecília',
    editorialNoteTitle: 'Nota editorial',
    editorialNoteClose: 'Cerrar',
    ratingLabel: (stars) => `Valoración ${stars} de 5 estrellas`,
    recommendation: { recomendo: '✓ Lo recomiendo', 'com ressalvas': 'Con reservas', 'não recomendo': 'No lo recomiendo' },
    approvedSeal: 'Aprobado por Cecília',
    scoreTitle: 'Nota de Cecília',
    verdictHeading: 'Veredicto',
    rated: 'Valorado',
    strengths: 'Puntos fuertes',
    cautions: 'Puntos a tener en cuenta',
    finalVerdictLink: 'Copiar enlace del veredicto final',
    productSheet: 'Ficha del producto',
    productSheetOpen: 'Abrir',
    productSheetClose: 'Cerrar',
    productSheetCaption: 'Ficha técnica del producto analizado',
    productSheetLink: 'Copiar enlace de la ficha del producto',
    sectionLinkCopied: '¡Enlace copiado!',
    relatedVideo: 'Vídeo relacionado',
    watchOnYoutube: 'Mira el vídeo completo en YouTube',
    openVideoPage: 'Abrir la página dedicada al vídeo',
    videoPause: 'Pausar el vídeo',
    videoPlay: 'Reproducir el vídeo',
    videoUnsupported: 'Tu navegador no admite vídeos.',
    demoVideo: (title) => `Vídeo demostrativo: ${title}`,
    breadcrumbLabel: 'Estás en',
    ruleTestedLabel: 'Probado el',
    ruleVerifiedLabel: 'Comprobado el',
    copiedHint: (brand, kind) =>
      kind === 'reward'
        ? `Copiado. Ahora solo pégalo en el campo Reward Code de ${brand}.`
        : kind === 'referral'
          ? `Copiado. Ahora busca el código de referido de ${brand} Brasil en la app de ${brand}.`
          : `Copiado. Ahora solo pégalo al finalizar la compra en ${brand}.`,
    storeBlockTitle: (brand) => `Tu compra en ${brand}`,
    allRules: 'Ver todas las reglas',
    allStoreArticles: (count, brand) => `Los ${count} artículos de ${brand}`,
    authorBoxTitle: 'Hola, soy Cecília',
    authorBoxBody: 'Comparto lo que pruebo en casa y los códigos de las tiendas con las que colaboro.',
    authorBoxLink: 'Conoce a Cecília',
    disclosureMore: 'Leer más',
    listenPause: 'Pausa',
    listenResume: 'Reanudar',
    listenStop: 'Detener',
  },
  fr: {
    kindLabel: { produto: 'Test de produit', guia: 'Guide', editorial: 'Éditorial' },
    verdictTitle: 'Le verdict de Cecília',
    editorialNoteTitle: 'Note de la rédaction',
    editorialNoteClose: 'Fermer',
    ratingLabel: (stars) => `Note de ${stars} sur 5 étoiles`,
    recommendation: { recomendo: '✓ Je recommande', 'com ressalvas': 'Avec réserves', 'não recomendo': 'Je ne recommande pas' },
    approvedSeal: 'Approuvé par Cecília',
    scoreTitle: 'Note de Cecília',
    verdictHeading: 'Verdict',
    rated: 'Évalué',
    strengths: 'Points forts',
    cautions: 'Points de vigilance',
    finalVerdictLink: 'Copier le lien du verdict final',
    productSheet: 'Fiche produit',
    productSheetOpen: 'Ouvrir',
    productSheetClose: 'Fermer',
    productSheetCaption: 'Fiche technique du produit évalué',
    productSheetLink: 'Copier le lien de la fiche produit',
    sectionLinkCopied: 'Lien copié !',
    relatedVideo: 'Vidéo associée',
    watchOnYoutube: 'Regardez la vidéo complète sur YouTube',
    openVideoPage: 'Ouvrir la page dédiée à la vidéo',
    videoPause: 'Mettre la vidéo en pause',
    videoPlay: 'Lire la vidéo',
    videoUnsupported: 'Votre navigateur ne prend pas en charge les vidéos.',
    demoVideo: (title) => `Vidéo de démonstration${NBSP}: ${title}`,
    breadcrumbLabel: 'Vous êtes ici',
    ruleTestedLabel: 'Testé le',
    ruleVerifiedLabel: 'Vérifié le',
    copiedHint: (brand, kind) =>
      kind === 'reward'
        ? `Copié. Il ne reste qu’à le coller dans le champ Reward Code de ${brand}.`
        : kind === 'referral'
          ? `Copié. Recherchez maintenant le code de parrainage ${brand} Brésil dans l’appli ${brand}.`
          : `Copié. Il ne reste qu’à le coller au paiement sur ${brand}.`,
    storeBlockTitle: (brand) => `Votre achat chez ${brand}`,
    allRules: 'Voir toutes les conditions',
    allStoreArticles: (count, brand) => `Les ${count} articles sur ${brand}`,
    authorBoxTitle: 'Bonjour, je suis Cecília',
    authorBoxBody: 'Je partage ce que je teste chez moi et les codes des boutiques avec lesquelles je travaille.',
    authorBoxLink: 'Découvrir Cecília',
    disclosureMore: 'Lire la suite',
    listenPause: 'Pause',
    listenResume: 'Reprendre',
    listenStop: 'Arrêter',
  },
  de: {
    kindLabel: { produto: 'Produkttest', guia: 'Ratgeber', editorial: 'Redaktionell' },
    verdictTitle: 'Cecílias Urteil',
    editorialNoteTitle: 'Redaktioneller Hinweis',
    editorialNoteClose: 'Schließen',
    ratingLabel: (stars) => `Bewertung ${stars} von 5 Sternen`,
    recommendation: { recomendo: '✓ Empfehlenswert', 'com ressalvas': 'Mit Einschränkungen', 'não recomendo': 'Nicht empfehlenswert' },
    approvedSeal: 'Von Cecília empfohlen',
    scoreTitle: 'Cecílias Note',
    verdictHeading: 'Urteil',
    rated: 'Bewertet',
    strengths: 'Stärken',
    cautions: 'Worauf man achten sollte',
    finalVerdictLink: 'Link zum abschließenden Urteil kopieren',
    productSheet: 'Produktdaten',
    productSheetOpen: 'Öffnen',
    productSheetClose: 'Schließen',
    productSheetCaption: 'Technische Daten des bewerteten Produkts',
    productSheetLink: 'Link zu den Produktdaten kopieren',
    sectionLinkCopied: 'Link kopiert!',
    relatedVideo: 'Passendes Video',
    watchOnYoutube: 'Das ganze Video auf YouTube ansehen',
    openVideoPage: 'Seite zum Video öffnen',
    videoPause: 'Video pausieren',
    videoPlay: 'Video abspielen',
    videoUnsupported: 'Dein Browser unterstützt keine Videos.',
    demoVideo: (title) => `Demovideo: ${title}`,
    breadcrumbLabel: 'Du bist hier',
    ruleTestedLabel: 'Getestet am',
    ruleVerifiedLabel: 'Geprüft am',
    copiedHint: (brand, kind) =>
      kind === 'reward'
        ? `Kopiert. Jetzt nur noch bei ${brand} ins Feld Reward Code einfügen.`
        : kind === 'referral'
          ? `Kopiert. Suche jetzt den Empfehlungscode von ${brand} Brasilien in der ${brand}-App.`
          : `Kopiert. Jetzt nur noch an der ${brand}-Kasse einfügen.`,
    storeBlockTitle: (brand) => `Dein Einkauf bei ${brand}`,
    allRules: 'Alle Bedingungen ansehen',
    allStoreArticles: (count, brand) => `Alle ${count} Artikel zu ${brand}`,
    authorBoxTitle: 'Hallo, ich bin Cecília',
    authorBoxBody: 'Ich teile, was ich zu Hause ausprobiere, und die Codes der Shops, mit denen ich zusammenarbeite.',
    authorBoxLink: 'Cecília kennenlernen',
    disclosureMore: 'Mehr lesen',
    listenPause: 'Pause',
    listenResume: 'Fortsetzen',
    listenStop: 'Stopp',
  },
  it: {
    kindLabel: { produto: 'Recensione di prodotto', guia: 'Guida', editorial: 'Editoriale' },
    verdictTitle: 'Il verdetto di Cecília',
    editorialNoteTitle: 'Nota editoriale',
    editorialNoteClose: 'Chiudi',
    ratingLabel: (stars) => `Valutazione ${stars} su 5 stelle`,
    recommendation: { recomendo: '✓ Lo consiglio', 'com ressalvas': 'Con riserve', 'não recomendo': 'Non lo consiglio' },
    approvedSeal: 'Approvato da Cecília',
    scoreTitle: 'Voto di Cecília',
    verdictHeading: 'Verdetto',
    rated: 'Valutato',
    strengths: 'Punti di forza',
    cautions: 'Punti di attenzione',
    finalVerdictLink: 'Copia il link del verdetto finale',
    productSheet: 'Scheda del prodotto',
    productSheetOpen: 'Apri',
    productSheetClose: 'Chiudi',
    productSheetCaption: 'Scheda tecnica del prodotto valutato',
    productSheetLink: 'Copia il link della scheda del prodotto',
    sectionLinkCopied: 'Link copiato!',
    relatedVideo: 'Video correlato',
    watchOnYoutube: 'Guarda il video completo su YouTube',
    openVideoPage: 'Apri la pagina dedicata al video',
    videoPause: 'Metti in pausa il video',
    videoPlay: 'Riproduci il video',
    videoUnsupported: 'Il tuo browser non supporta i video.',
    demoVideo: (title) => `Video dimostrativo: ${title}`,
    breadcrumbLabel: 'Sei qui',
    ruleTestedLabel: 'Testato il',
    ruleVerifiedLabel: 'Verificato il',
    copiedHint: (brand, kind) =>
      kind === 'reward'
        ? `Copiato. Ora basta incollarlo nel campo Reward Code di ${brand}.`
        : kind === 'referral'
          ? `Copiato. Ora cerca il codice invito ${brand} Brasile nell’app ${brand}.`
          : `Copiato. Ora basta incollarlo al checkout di ${brand}.`,
    storeBlockTitle: (brand) => `Il tuo acquisto su ${brand}`,
    allRules: 'Vedi tutte le regole',
    allStoreArticles: (count, brand) => `Tutti i ${count} articoli su ${brand}`,
    authorBoxTitle: 'Ciao, sono Cecília',
    authorBoxBody: 'Condivido quello che provo a casa e i codici dei negozi con cui collaboro.',
    authorBoxLink: 'Conosci Cecília',
    disclosureMore: 'Leggi di più',
    listenPause: 'Pausa',
    listenResume: 'Riprendi',
    listenStop: 'Interrompi',
  },
  ko: {
    kindLabel: { produto: '제품 리뷰', guia: '가이드', editorial: '에디토리얼' },
    verdictTitle: 'Cecília의 평가',
    editorialNoteTitle: '편집 노트',
    editorialNoteClose: '닫기',
    ratingLabel: (stars) => `5점 만점에 ${stars}점`,
    recommendation: { recomendo: '✓ 추천', 'com ressalvas': '조건부 추천', 'não recomendo': '비추천' },
    approvedSeal: 'Cecília 인증',
    scoreTitle: 'Cecília의 점수',
    verdictHeading: '평가',
    rated: '평가 완료',
    strengths: '장점',
    cautions: '참고할 점',
    finalVerdictLink: '최종 평가 링크 복사',
    productSheet: '제품 정보',
    productSheetOpen: '열기',
    productSheetClose: '닫기',
    productSheetCaption: '평가한 제품의 상세 사양',
    productSheetLink: '제품 정보 링크 복사',
    sectionLinkCopied: '링크를 복사했어요',
    relatedVideo: '관련 영상',
    watchOnYoutube: 'YouTube에서 전체 영상 보기',
    openVideoPage: '영상 전용 페이지 열기',
    videoPause: '영상 일시정지',
    videoPlay: '영상 재생',
    videoUnsupported: '이 브라우저는 영상을 지원하지 않아요.',
    demoVideo: (title) => `시연 영상: ${title}`,
    breadcrumbLabel: '현재 위치',
    ruleTestedLabel: '테스트일',
    ruleVerifiedLabel: '확인일',
    copiedHint: (brand, kind) =>
      kind === 'reward'
        ? `복사했어요. 이제 ${brand}의 Reward Code 입력란에 붙여 넣으세요.`
        : kind === 'referral'
          ? `복사했어요. 이제 ${brand} 앱에서 ${brand} 브라질 추천 코드를 검색하세요.`
          : `복사했어요. 이제 ${brand} 결제 화면에 붙여 넣으세요.`,
    storeBlockTitle: (brand) => `${brand}에서 쇼핑할 때`,
    allRules: '모든 조건 보기',
    allStoreArticles: (count, brand) => `${brand} 관련 글 ${count}편 모두 보기`,
    authorBoxTitle: '안녕하세요, Cecília예요',
    authorBoxBody: '집에서 직접 써 본 것과 함께하는 스토어의 코드를 소개해요.',
    authorBoxLink: 'Cecília 더 알아보기',
    disclosureMore: '더 보기',
    listenPause: '일시정지',
    listenResume: '계속 듣기',
    listenStop: '정지',
  },
  ja: {
    kindLabel: { produto: '製品レビュー', guia: 'ガイド', editorial: 'エディトリアル' },
    verdictTitle: 'Cecília の評価',
    editorialNoteTitle: '編集部より',
    editorialNoteClose: '閉じる',
    ratingLabel: (stars) => `5つ星中${stars}の評価`,
    recommendation: { recomendo: '✓ おすすめ', 'com ressalvas': '条件付きでおすすめ', 'não recomendo': 'おすすめしません' },
    approvedSeal: 'Cecília 認定',
    scoreTitle: 'Cecília のスコア',
    verdictHeading: '評価',
    rated: '評価済み',
    strengths: '良い点',
    cautions: '気になる点',
    finalVerdictLink: '最終評価のリンクをコピー',
    productSheet: '製品情報',
    productSheetOpen: '開く',
    productSheetClose: '閉じる',
    productSheetCaption: '評価した製品の仕様',
    productSheetLink: '製品情報のリンクをコピー',
    sectionLinkCopied: 'リンクをコピーしました',
    relatedVideo: '関連動画',
    watchOnYoutube: 'YouTube で動画の全編を見る',
    openVideoPage: '動画専用ページを開く',
    videoPause: '動画を一時停止',
    videoPlay: '動画を再生',
    videoUnsupported: 'お使いのブラウザは動画に対応していません。',
    demoVideo: (title) => `デモ動画：${title}`,
    breadcrumbLabel: '現在位置',
    ruleTestedLabel: 'テスト日',
    ruleVerifiedLabel: '確認日',
    copiedHint: (brand, kind) =>
      kind === 'reward'
        ? `コピーしました。あとは ${brand} の Reward Code 欄に貼り付けるだけです。`
        : kind === 'referral'
          ? `コピーしました。${brand} アプリで ${brand} ブラジルの紹介コードを検索してください。`
          : `コピーしました。あとは ${brand} の決済画面に貼り付けるだけです。`,
    storeBlockTitle: (brand) => `${brand} でのお買い物`,
    allRules: '条件をすべて見る',
    allStoreArticles: (count, brand) => `${brand} の記事 ${count} 本をすべて見る`,
    authorBoxTitle: 'こんにちは、Cecíliaです',
    authorBoxBody: '家で試したものと、提携ショップのコードを紹介しています。',
    authorBoxLink: 'Cecíliaについて',
    disclosureMore: '続きを読む',
    listenPause: '一時停止',
    listenResume: '再開',
    listenStop: '停止',
  },
  'zh-hant': {
    kindLabel: { produto: '產品評測', guia: '指南', editorial: '編輯專題' },
    verdictTitle: 'Cecília 的評價',
    editorialNoteTitle: '編輯備註',
    editorialNoteClose: '關閉',
    ratingLabel: (stars) => `評分 ${stars} 分（滿分 5 星）`,
    recommendation: { recomendo: '✓ 推薦', 'com ressalvas': '有條件推薦', 'não recomendo': '不推薦' },
    approvedSeal: 'Cecília 認證',
    scoreTitle: 'Cecília 的評分',
    verdictHeading: '評價',
    rated: '已評分',
    strengths: '優點',
    cautions: '注意事項',
    finalVerdictLink: '複製最終評價連結',
    productSheet: '產品資訊',
    productSheetOpen: '展開',
    productSheetClose: '收合',
    productSheetCaption: '所評測產品的規格資料',
    productSheetLink: '複製產品資訊連結',
    sectionLinkCopied: '已複製連結',
    relatedVideo: '相關影片',
    watchOnYoutube: '在 YouTube 觀看完整影片',
    openVideoPage: '開啟影片專頁',
    videoPause: '暫停影片',
    videoPlay: '播放影片',
    videoUnsupported: '你的瀏覽器不支援影片。',
    demoVideo: (title) => `示範影片：${title}`,
    breadcrumbLabel: '目前位置',
    ruleTestedLabel: '測試日期',
    ruleVerifiedLabel: '核實日期',
    copiedHint: (brand, kind) =>
      kind === 'reward'
        ? `已複製。接著貼到 ${brand} 的 Reward Code 欄位即可。`
        : kind === 'referral'
          ? `已複製。請在 ${brand} App 搜尋 ${brand} 巴西站推薦碼。`
          : `已複製。接著在 ${brand} 結帳時貼上即可。`,
    storeBlockTitle: (brand) => `在 ${brand} 購物`,
    allRules: '查看全部規則',
    allStoreArticles: (count, brand) => `${brand} 的全部 ${count} 篇文章`,
    authorBoxTitle: '你好，我是 Cecília',
    authorBoxBody: '我分享在家試過的東西，以及合作商店的代碼。',
    authorBoxLink: '認識 Cecília',
    disclosureMore: '閱讀全文',
    listenPause: '暫停',
    listenResume: '繼續',
    listenStop: '停止',
  },
  'zh-hans': {
    kindLabel: { produto: '产品评测', guia: '指南', editorial: '编辑专题' },
    verdictTitle: 'Cecília 的评价',
    editorialNoteTitle: '编辑备注',
    editorialNoteClose: '关闭',
    ratingLabel: (stars) => `评分 ${stars} 分（满分 5 星）`,
    recommendation: { recomendo: '✓ 推荐', 'com ressalvas': '有条件推荐', 'não recomendo': '不推荐' },
    approvedSeal: 'Cecília 认证',
    scoreTitle: 'Cecília 的评分',
    verdictHeading: '评价',
    rated: '已评分',
    strengths: '优点',
    cautions: '注意事项',
    finalVerdictLink: '复制最终评价链接',
    productSheet: '产品信息',
    productSheetOpen: '展开',
    productSheetClose: '收起',
    productSheetCaption: '所评测产品的规格资料',
    productSheetLink: '复制产品信息链接',
    sectionLinkCopied: '已复制链接',
    relatedVideo: '相关视频',
    watchOnYoutube: '在 YouTube 观看完整视频',
    openVideoPage: '打开视频专页',
    videoPause: '暂停视频',
    videoPlay: '播放视频',
    videoUnsupported: '你的浏览器不支持视频。',
    demoVideo: (title) => `演示视频：${title}`,
    breadcrumbLabel: '当前位置',
    ruleTestedLabel: '测试日期',
    ruleVerifiedLabel: '核实日期',
    copiedHint: (brand, kind) =>
      kind === 'reward'
        ? `已复制。接着粘贴到 ${brand} 的 Reward Code 栏位即可。`
        : kind === 'referral'
          ? `已复制。请在 ${brand} App 中搜索 ${brand} 巴西站推荐码。`
          : `已复制。接着在 ${brand} 结账时粘贴即可。`,
    storeBlockTitle: (brand) => `在 ${brand} 购物`,
    allRules: '查看全部规则',
    allStoreArticles: (count, brand) => `${brand} 的全部 ${count} 篇文章`,
    authorBoxTitle: '你好，我是 Cecília',
    authorBoxBody: '我分享在家试过的东西，以及合作商店的代码。',
    authorBoxLink: '认识 Cecília',
    disclosureMore: '阅读全文',
    listenPause: '暂停',
    listenResume: '继续',
    listenStop: '停止',
  },
};

export function getArticleCopy(locale: Locale): ArticleCopy {
  return articleCopy[locale];
}

// A nota editorial é componente de cliente: recebe os rótulos prontos do servidor, sem carregar esta tabela.
export function getEditorialNoteLabels(locale: Locale): EditorialNoteLabels {
  const { editorialNoteTitle, editorialNoteClose } = getArticleCopy(locale);
  return { title: editorialNoteTitle, close: editorialNoteClose };
}

// O vídeo em loop é componente de cliente e não importa esta tabela: quem o usa passa os rótulos prontos.
export function getReviewVideoLabels(locale: Locale): ReviewVideoLabels {
  const { videoPause, videoPlay, videoUnsupported } = getArticleCopy(locale);
  return { pause: videoPause, play: videoPlay, unsupported: videoUnsupported };
}

export type TemplateUi = {
  publishedAt: string;
  updatedAt: string;
  readTime: (mins: number) => string;
  relatedArticles: string;
  verdictToc: string;
  viewAll: string;
};

const templateUiLabels: Record<CouponCopyLocale, TemplateUi> = {
  pt: {
    publishedAt: 'Publicado em',
    updatedAt: 'Atualizado em',
    readTime: (m) => `${m} min de leitura`,
    relatedArticles: 'Artigos relacionados',
    verdictToc: 'Veredito final',
    viewAll: 'Ver todos',
  },
  en: {
    publishedAt: 'Published on',
    updatedAt: 'Updated on',
    readTime: (m) => `${m} min read`,
    relatedArticles: 'Related articles',
    verdictToc: 'Final verdict',
    viewAll: 'View all',
  },
  es: {
    publishedAt: 'Publicado el',
    updatedAt: 'Actualizado el',
    readTime: (m) => `${m} min de lectura`,
    relatedArticles: 'Artículos relacionados',
    verdictToc: 'Veredicto final',
    viewAll: 'Ver todos',
  },
  fr: {
    publishedAt: 'Publié le',
    updatedAt: 'Mis à jour le',
    readTime: (m) => `${m} min de lecture`,
    relatedArticles: 'Articles connexes',
    verdictToc: 'Verdict final',
    viewAll: 'Voir tout',
  },
  de: {
    publishedAt: 'Veröffentlicht am',
    updatedAt: 'Aktualisiert am',
    readTime: (m) => `${m} Min. Lesezeit`,
    relatedArticles: 'Verwandte Artikel',
    verdictToc: 'Endergebnis',
    viewAll: 'Alle ansehen',
  },
  it: {
    publishedAt: 'Pubblicato il',
    updatedAt: 'Aggiornato il',
    readTime: (m) => `${m} min di lettura`,
    relatedArticles: 'Articoli correlati',
    verdictToc: 'Verdetto finale',
    viewAll: 'Vedi tutto',
  },
  ko: {
    publishedAt: '발행일',
    updatedAt: '수정일',
    readTime: (m) => `읽는 시간 ${m}분`,
    relatedArticles: '관련 문서',
    verdictToc: '최종 평가',
    viewAll: '전체 보기',
  },
  ja: {
    publishedAt: '公開日',
    updatedAt: '更新日',
    readTime: (m) => `読了時間 約${m}分`,
    relatedArticles: '関連記事',
    verdictToc: '最終評価',
    viewAll: 'すべて見る',
  },
  'zh-hant': {
    publishedAt: '發布於',
    updatedAt: '更新於',
    readTime: (m) => `閱讀時間約 ${m} 分鐘`,
    relatedArticles: '相關文章',
    verdictToc: '最終評價',
    viewAll: '查看全部',
  },
  'zh-hans': {
    publishedAt: '发布于',
    updatedAt: '更新于',
    readTime: (m) => `阅读时间约 ${m} 分钟`,
    relatedArticles: '相关文章',
    verdictToc: '最终评价',
    viewAll: '查看全部',
  },
};

export function getTemplateUi(locale: CouponCopyLocale): TemplateUi {
  return templateUiLabels[locale] || templateUiLabels.pt;
}

export function getDisclosureLabel(locale: CouponCopyLocale): string {
  const labels: Record<CouponCopyLocale, string> = {
    pt: 'Transparência editorial',
    en: 'Editorial transparency',
    es: 'Transparencia editorial',
    fr: 'Transparence éditoriale',
    de: 'Redaktionelle Transparenz',
    it: 'Trasparenza editoriale',
    ko: '광고 및 제휴 안내',
    ja: '広告・アフィリエイトについて',
    'zh-hant': '聯盟行銷揭露',
    'zh-hans': '联盟营销披露',
  };

  return labels[locale];
}
