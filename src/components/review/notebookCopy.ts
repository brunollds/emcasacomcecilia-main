import type { Locale } from '@/lib/i18n/locales';

// O francês pede espaço não separável antes de : ; ? ! e %.
const NBSP = '\u00a0';

// Rótulos de interface dos 4 blocos interativos do caderno nos 11 idiomas:
// filtro de tabela comparativa, checklist clicável, simulador de cenários e faixa de métricas.
export type NotebookCopy = {
  tableFilterGroup: string;
  tableFilterAll: string;
  tableFilterCount: (shown: number, total: number) => string;
  checklistTitle: string;
  checklistProgress: (done: number, total: number) => string;
  simulatorTitle: string;
  simulatorTablistLabel: string;
  simulatorTotalLabel: string;
  metricsLabel: string;
};

const notebookCopy: Record<Locale, NotebookCopy> = {
  pt: {
    tableFilterGroup: 'Filtrar linhas da tabela',
    tableFilterAll: 'Mostrar tudo',
    tableFilterCount: (shown, total) => `Exibindo ${shown} de ${total} opções`,
    checklistTitle: 'Antes de fechar o pedido',
    checklistProgress: (done, total) => `${done} de ${total} conferidos`,
    simulatorTitle: 'Simulador no carrinho',
    simulatorTablistLabel: 'Cenários da compra',
    simulatorTotalLabel: 'Total final',
    metricsLabel: 'Indicadores principais',
  },
  en: {
    tableFilterGroup: 'Filter table rows',
    tableFilterAll: 'Show all',
    tableFilterCount: (shown, total) => `Showing ${shown} of ${total} options`,
    checklistTitle: 'Before placing your order',
    checklistProgress: (done, total) => `${done} of ${total} checked`,
    simulatorTitle: 'Cart simulator',
    simulatorTablistLabel: 'Purchase scenarios',
    simulatorTotalLabel: 'Final total',
    metricsLabel: 'Key metrics',
  },
  es: {
    tableFilterGroup: 'Filtrar filas de la tabla',
    tableFilterAll: 'Ver todo',
    tableFilterCount: (shown, total) => `Mostrando ${shown} de ${total} opciones`,
    checklistTitle: 'Antes de confirmar la compra',
    checklistProgress: (done, total) => `${done} de ${total} revisados`,
    simulatorTitle: 'Simulador en el carrito',
    simulatorTablistLabel: 'Escenarios de compra',
    simulatorTotalLabel: 'Importe final',
    metricsLabel: 'Indicadores clave',
  },
  fr: {
    tableFilterGroup: 'Filtrer les lignes du tableau',
    tableFilterAll: 'Tout afficher',
    tableFilterCount: (shown, total) => `${shown} sur ${total}${NBSP}options affichées`,
    checklistTitle: 'Avant de valider la commande',
    checklistProgress: (done, total) => `${done} sur ${total}${NBSP}cochés`,
    simulatorTitle: 'Simulateur de panier',
    simulatorTablistLabel: 'Scénarios d’achat',
    simulatorTotalLabel: 'Montant final',
    metricsLabel: 'Indicateurs clés',
  },
  de: {
    tableFilterGroup: 'Tabellenzeilen filtern',
    tableFilterAll: 'Alle anzeigen',
    tableFilterCount: (shown, total) => `${shown} von ${total} Optionen angezeigt`,
    checklistTitle: 'Vor dem Bestellabschluss',
    checklistProgress: (done, total) => `${done} von ${total} geprüft`,
    simulatorTitle: 'Warenkorb-Rechner',
    simulatorTablistLabel: 'Kaufszenarien',
    simulatorTotalLabel: 'Endbetrag',
    metricsLabel: 'Wichtige Kennzahlen',
  },
  it: {
    tableFilterGroup: 'Filtra le righe della tabella',
    tableFilterAll: 'Mostra tutto',
    tableFilterCount: (shown, total) => `${shown} su ${total} opzioni mostrate`,
    checklistTitle: 'Prima di completare l’ordine',
    checklistProgress: (done, total) => `${done} su ${total} verificati`,
    simulatorTitle: 'Simulatore del carrello',
    simulatorTablistLabel: 'Scenari di acquisto',
    simulatorTotalLabel: 'Totale finale',
    metricsLabel: 'Indicatori principali',
  },
  ko: {
    tableFilterGroup: '표 행 필터링',
    tableFilterAll: '전체 보기',
    tableFilterCount: (shown, total) => `전체 ${total}개 중 ${shown}개 표시`,
    checklistTitle: '결제 전 체크리스트',
    checklistProgress: (done, total) => `${total}개 중 ${done}개 확인됨`,
    simulatorTitle: '장바구니 금액 시뮬레이터',
    simulatorTablistLabel: '구매 시나리오',
    simulatorTotalLabel: '최종 합계',
    metricsLabel: '주요 지표',
  },
  ja: {
    tableFilterGroup: '表の行を絞り込む',
    tableFilterAll: 'すべて表示',
    tableFilterCount: (shown, total) => `${total}件中${shown}件を表示`,
    checklistTitle: '注文前のチェックリスト',
    checklistProgress: (done, total) => `${total}件中${done}件を確認済み`,
    simulatorTitle: 'カート金額シミュレーター',
    simulatorTablistLabel: '購入パターン',
    simulatorTotalLabel: '最終合計',
    metricsLabel: '主な指標',
  },
  'zh-hant': {
    tableFilterGroup: '篩選表格列',
    tableFilterAll: '顯示全部',
    tableFilterCount: (shown, total) => `顯示 ${shown} / ${total} 個選項`,
    checklistTitle: '結帳前確認清單',
    checklistProgress: (done, total) => `已確認 ${done} / ${total} 項`,
    simulatorTitle: '購物車試算',
    simulatorTablistLabel: '購買方案',
    simulatorTotalLabel: '最終總計',
    metricsLabel: '重點指標',
  },
  'zh-hans': {
    tableFilterGroup: '筛选表格行',
    tableFilterAll: '显示全部',
    tableFilterCount: (shown, total) => `显示 ${shown} / ${total} 个选项`,
    checklistTitle: '结账前确认清单',
    checklistProgress: (done, total) => `已确认 ${done} / ${total} 项`,
    simulatorTitle: '购物车试算',
    simulatorTablistLabel: '购买方案',
    simulatorTotalLabel: '最终总计',
    metricsLabel: '重点指标',
  },
  ar: {
    tableFilterGroup: 'تصفية صفوف الجدول',
    tableFilterAll: 'عرض الكل',
    tableFilterCount: (shown, total) => `عرض ${shown} من أصل ${total} من الخيارات`,
    checklistTitle: 'قبل إتمام الطلب',
    checklistProgress: (done, total) => `تم التحقق من ${done} من أصل ${total}`,
    simulatorTitle: 'حاسبة سلة التسوق',
    simulatorTablistLabel: 'سيناريوهات الشراء',
    simulatorTotalLabel: 'الإجمالي النهائي',
    metricsLabel: 'المؤشرات الرئيسية',
  },
};

export function getNotebookCopy(locale: Locale): NotebookCopy {
  return notebookCopy[locale];
}
