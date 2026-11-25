// Roda uma vez quando o servidor Node sobe (não no build nem no navegador).
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  // As perguntas do DICA ficam 90 dias, e as contagens por visitante e da IA, só o dia delas: a limpeza roda ao subir e
  // de hora em hora, com ou sem pergunta nova.
  const { cleanupQuestionLog } = await import('./lib/dica/questionLog');
  void cleanupQuestionLog();
  setInterval(() => void cleanupQuestionLog(), 60 * 60_000).unref();
  // A contagem de perguntas por IP, só na memória, não passa do dia.
  const { pruneVisitors } = await import('./lib/dica/limits');
  setInterval(() => pruneVisitors(), 60 * 60_000).unref();
}
