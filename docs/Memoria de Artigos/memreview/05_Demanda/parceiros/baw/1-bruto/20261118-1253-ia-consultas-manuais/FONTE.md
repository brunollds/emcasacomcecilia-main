# FONTE: 20261118-1253-ia-consultas-manuais

| Campo | Valor |
|---|---|
| Coleta | `20261118-1253-ia-consultas-manuais` |
| Início e fim | `2026-11-18T12:53:00-03:00` a `2026-11-18T13:02:00-03:00` (consultas); arquivos fechados às 13:06 |
| Sessão responsável | Demanda BAW, etapa 4 (Claude Opus 5.5, no navegador embutido do app) |
| Fonte | Assistentes de IA abertos sem conta: ChatGPT (`chatgpt.com`) e Perplexity (`www.perplexity.ai`). Tentado também: Microsoft Copilot (`copilot.microsoft.com`) |
| Endereço ou relatório | Cada arquivo traz o endereço da conversa. Perguntas 2 a 5 do ChatGPT e todas do Perplexity pelo endereço com `?q=` (`chatgpt.com/?q=...`, `perplexity.ai/search?q=...`), que envia a pergunta ao abrir; a pergunta 1 do ChatGPT foi digitada no campo |
| Método | Uma conversa nova por pergunta, sem conta e sem histórico. Texto do elemento `<main>` gravado como veio (`get_page_text`), com um cabeçalho da sessão antes da linha `---`. No Perplexity, também a aba "Links" (lista de fontes) |
| Propriedade ou loja | `@nao-se-aplica` |
| País, idioma, moeda | Acesso a partir do Brasil (rede da máquina do Bruno), interface em pt-BR, perguntas em português; `@nao-se-aplica` para moeda |
| Período dos dados | Respostas de 2026-11-18, entre 12:53 e 13:01 |
| Filtros | Nenhum. Modelo padrão de cada assistente sem conta (o ChatGPT mostrou `model=auto` no endereço) |
| Paginação | `@nao-se-aplica` |
| Cobertura | `parcial`: ChatGPT com as 5 perguntas; Perplexity com as perguntas 1 a 3; Copilot sem nenhuma (pede login) |
| Modalidade | `texto-extraido` em todos os arquivos; as fontes do ChatGPT só pelo rótulo do chip (`resumo-coletor` para a fonte) |
| Export | `@nao-se-aplica` |
| Cadastro lido | `@nao-se-aplica` |
| Bloqueio | Perplexity: depois da pergunta 3 (13:01) abriu a janela "Cadastre-se gratuitamente para desbloquear todo o potencial do Perplexity"; a coleta parou nele. ChatGPT: junto com a pergunta 5 abriu "Entre ou cadastre-se"; era a última pergunta. Copilot: a página inicial abriu em "Entre no Copilot" às 13:02, sem campo de conversa; nenhuma pergunta feita. Nenhuma janela de login ou de cookies foi tocada |

## Perguntas

As quatro do roteiro (`ROTEIRO-PILOTO.md`, seção 4, para a P5 da orientação) e uma quinta, acrescentada pela sessão para
cobrir o segundo caso da medição de IA (`PROGRAMA.md`, seção 4: a IA reconhece o código quando ele está na pergunta).

| # | Pergunta | Caso que mede | ChatGPT | Perplexity |
|---|---|---|---|---|
| q1 | a BAW é confiável? | Reputação; se cita o site | feita | feita |
| q2 | de quem é a BAW Clothing? | Dono (a semente diz que a IA da busca dá a Arezzo como dona) | feita | feita |
| q3 | cupom BAW | Chega ao nosso código sozinha? Recomenda outro? | feita | feita |
| q4 | cupom BAW primeira compra | Idem, na primeira compra | feita | não feita (cadastro) |
| q5 | o cupom BAWEMCASACOMCECILIA funciona? | Reconhece o código citado na pergunta | feita | não feita (cadastro) |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `chatgpt-q1-baw-e-confiavel.txt` | 1204 | `ba21e65cfacf3017c32aee4e835111d6efc091d201671abc7855df66e60f21bd` | repositório |
| `chatgpt-q2-de-quem-e-a-baw.txt` | 1482 | `7aeb3bc36faf2797acd2365edfd4cca3ce64d619a7c7a5cf8dcc06024588a57b` | repositório |
| `chatgpt-q3-cupom-baw.txt` | 1419 | `4201451a628e9974f7245ceaac01f37a49d13b529459b9cb9d16656b5888efd3` | repositório |
| `chatgpt-q4-cupom-baw-primeira-compra.txt` | 1494 | `965487159ea8d5134e8af531fa0ba9e3b7f8aa0acfe7f63b0bf7abdd47c54428` | repositório |
| `chatgpt-q5-codigo-funciona.txt` | 1552 | `62429f5467044be6952af37219bcbac601c8a82310b3780e28e2ec6dd60ae4bb` | repositório |
| `perplexity-q1-baw-e-confiavel.txt` | 4614 | `c0a84ef759f0b6d8a9c46194efaab2892b33d82aa5dd10c4f82ccca2c3f80556` | repositório |
| `perplexity-q2-de-quem-e-a-baw.txt` | 4342 | `2730146c6df3fbf0782e8b0c7a573b446893eb951026b024185c6d5895a5fc2b` | repositório |
| `perplexity-q3-cupom-baw.txt` | 1314 | `80b6cd3dda5bc5261bbe3432bb8632ab7f94883e325d65d05ed1407e5ca71fba` | repositório |

## Conferência dos arquivos

A fazer pela coordenação no fechamento de insumos, num checkout limpo da `main` depois do merge.

## Falhas e lacunas

- **Fontes do ChatGPT sem endereço.** Sem conta, o chip de fontes ("Reclame Aqui +1", "Exame +1", "NeoFeed +2", "Em Casa
  com Cecília +2", "Até 30% OFF - Novembro 2026 +1") não abriu o painel; só o rótulo ficou gravado. Exceção: a q5 tem o
  link no texto, para `emcasacomcecilia.com/reviews/cupom-baw-primeira-compra`. Destino: repetir com o painel de fontes
  numa sessão com conta, se o Bruno quiser (decisão dele, não é pré-requisito da matriz).
- **Perplexity sem q4 e q5, Copilot sem nenhuma.** Bloqueio por cadastro ou login (tabela acima). Destino: próxima
  rodada, ou o Bruno numa conta dele.
- **Fontes da q3 do Perplexity não lidas.** A janela de cadastro cobriu a página antes de abrir a aba "Links".
- **Hora das perguntas 2 a 5 do ChatGPT.** Ficou a janela 12:54 a 12:59, sem a hora de cada uma: a sessão anotou horas
  adiantadas no primeiro registro, percebeu pelo relógio (`TZ=UTC+3 date` às 13:02) e corrigiu os cabeçalhos antes do
  commit. A ordem é a da tabela. As horas do Perplexity são as que a página mostra.
- **Uma amostra só.** Cada pergunta foi feita uma vez. Respostas de assistente variam entre execuções; isto é um
  retrato de 18/11, não uma frequência.

## Observações

- O texto depois da linha `---` de cada arquivo é a página como veio; o cabeçalho antes dela é da sessão.
- No ChatGPT a interface acrescenta botões ("Copiar cupom") e rótulos de fontes no meio do texto; ficaram como vieram.
- Nada foi pedido além da pergunta: não houve resposta às perguntas de volta do assistente ("Me confirma qual BAW...").
- Códigos de terceiros nas respostas (FIRSTBAW, BAWVINDO, BAWOFF, BAWANNALAURA) são dado do que a IA mostra, nunca coisa a
  usar ou citar como cupom (`briefs/BRIEF-PARCEIRO.md`, "O que nunca entra").
