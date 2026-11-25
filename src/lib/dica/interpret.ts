import { getVocabulary, normalize } from './catalog';

// A IA só interpreta: escolhe termos do vocabulário do catálogo. Loja, código e texto da resposta saem do código.
// Qualquer falha (sem chave, erro, JSON ruim, demora) devolve null, e a rota cai na busca local, com o motivo no log do
// servidor (status, tipo do erro, stop_reason), nunca a pergunta nem a chave.

export type Interpretation = { terms: string[]; searchTerm: string; outOfScope: boolean };

const DEFAULT_MODEL = 'claude-haiku-5-5';
const DEFAULT_TIMEOUT_MS = 4000;
// O Haiku 5.5 pensa por padrão, e o pensamento gasta o max_tokens: com 300 tokens a resposta saía cortada no meio do
// JSON. Esforço baixo e folga no teto; desligar o pensamento também resolve, mas acerta menos termos ("presente para
// minha mãe" deixa de achar Kits e presentes).
const MAX_TOKENS = 1024;

const INSTRUCTIONS = [
  'Você interpreta perguntas de compra para o site Em Casa com Cecília.',
  'Responda só com JSON no formato {"termos": [...], "buscaDicas": "...", "foraDeEscopo": false}.',
  '"termos" traz apenas entradas copiadas exatamente do VOCABULÁRIO, e só quando são o mesmo produto pedido:',
  'um item composto ou mais específico (sofá-cama, anel de prata, creatina vegana) não casa um termo mais geral',
  '(sofá, acessório, creatina). Na dúvida, deixe "termos" vazio.',
  '"buscaDicas" é o produto pedido em 1 a 4 palavras, sem dado pessoal.',
  '"foraDeEscopo" é true quando a mensagem não é sobre achar produto ou loja.',
  'Não escreva mais nada.',
].join('\n');

let vocabularyBlock: string | undefined;
function getVocabularyBlock(): string {
  vocabularyBlock ??= `VOCABULÁRIO:\n${[...getVocabulary().values()].map((entry) => entry.term).join('\n')}`;
  return vocabularyBlock;
}

function parseJson(text: string): unknown {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end <= start) return undefined;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return undefined;
  }
}

export async function interpretQuestion(
  question: string,
  opts: { fetchImpl?: typeof fetch; apiKey?: string; timeoutMs?: number; model?: string; onFailure?: (reason: string) => void } = {},
): Promise<Interpretation | null> {
  const fail = (reason: string) => {
    (opts.onFailure ?? ((text: string) => console.warn(`[dica] IA sem resposta útil: ${text}`)))(reason);
    return null;
  };
  const apiKey = opts.apiKey ?? process.env.ANTHROPIC_API_KEY_DICA_SITE;
  if (!apiKey) return null;
  const fetchImpl = opts.fetchImpl ?? fetch;
  // Timer comum, e não AbortSignal.timeout: aquele não segura o processo, e uma chamada pendurada sumiria sem resposta.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? DEFAULT_TIMEOUT_MS);
  try {
    const response = await fetchImpl('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model: opts.model ?? (process.env.DICA_AI_MODEL || DEFAULT_MODEL),
        max_tokens: MAX_TOKENS,
        output_config: { effort: 'low' },
        system: [
          { type: 'text', text: INSTRUCTIONS },
          { type: 'text', text: getVocabularyBlock(), cache_control: { type: 'ephemeral' } },
        ],
        messages: [{ role: 'user', content: question }],
      }),
      signal: controller.signal,
    });
    if (!response.ok) {
      const body = (await response.json().catch(() => undefined)) as { error?: { type?: unknown } } | undefined;
      const type = typeof body?.error?.type === 'string' ? body.error.type : 'sem tipo';
      return fail(`HTTP ${response.status} (${type})`);
    }
    const data = (await response.json()) as { content?: { type: string; text?: string }[]; stop_reason?: unknown };
    if (data.stop_reason === 'max_tokens') return fail('resposta cortada (stop_reason max_tokens)');
    const text = data.content?.find((block) => block.type === 'text')?.text ?? '';
    const parsed = parseJson(text) as { termos?: unknown; buscaDicas?: unknown; foraDeEscopo?: unknown } | undefined;
    if (!parsed || !Array.isArray(parsed.termos)) {
      return fail(`${text ? 'JSON inválido' : 'sem texto'} (stop_reason ${String(data.stop_reason ?? 'nenhum')})`);
    }

    const vocabulary = getVocabulary();
    const terms = [
      ...new Set(
        parsed.termos
          .filter((term): term is string => typeof term === 'string')
          .map((term) => vocabulary.get(normalize(term))?.term)
          .filter((term): term is string => Boolean(term)),
      ),
    ];
    const searchTerm = typeof parsed.buscaDicas === 'string' ? parsed.buscaDicas.trim().slice(0, 60) : '';
    return { terms, searchTerm, outOfScope: parsed.foraDeEscopo === true };
  } catch (error) {
    return fail(controller.signal.aborted ? 'tempo esgotado' : `falha de rede (${error instanceof Error ? error.name : 'erro'})`);
  } finally {
    clearTimeout(timer);
  }
}
