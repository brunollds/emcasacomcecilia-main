import { normalize } from './catalog';

// O que claramente não é procurar produto ou loja parceira sai daqui com a frase fixa, sem gastar a IA. Fica de fora
// o que pode ser compra ("quanto custa o whey?" segue e mostra as lojas, sem preço). A IA ainda marca foraDeEscopo no
// que escapar desta lista, e ela nunca escreve a resposta.

const GREETING_ONLY =
  /^(?:(?:oi+|ola+|hey|hello|hi|e ai|eai|bom dia|boa tarde|boa noite|tudo bem|tudo bom|como vai|obrigad[oa]|valeu|ok|teste|dica|cecilia)\s*)+$/;

const OFF_TOPIC = new RegExp(
  `\\b(?:${[
    // Pedir que a IA escreva ou converse.
    'piadas?',
    'poemas?',
    'poesias?',
    'redacao',
    'historinha',
    'escrev\\w*',
    'traduz\\w*',
    'resum[ae]\\w*',
    // Tentar mudar as regras.
    'ignor\\w* (?:as |todas as |suas )?(?:instruc\\w*|regras)',
    'prompt',
    'quem (?:e|foi) voce',
    'voce e (?:uma )?(?:ia|robo|chatgpt)',
    'chatgpt',
    // Código.
    'codigo (?:em )?(?:python|javascript|java|html|css|sql)',
    'python|javascript',
    // Atendimento de loja, que o DICA não faz.
    'rastre\\w*',
    'meu pedido',
    'previsao do tempo',
  ].join('|')})\\b`
);

export function isClearlyOutOfScope(question: string): boolean {
  const text = normalize(question).trim();
  return GREETING_ONLY.test(text) || OFF_TOPIC.test(text);
}
