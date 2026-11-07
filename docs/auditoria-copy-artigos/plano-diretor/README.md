# Plano diretor: auditorias de copy dos artigos (ChatGPT + Gemini)

Este plano junta as duas auditorias de copy dos artigos publicados num conjunto só de mudanças, já
decidido e conferido. Quem implementa não arbitra nada: aplica os lotes, um commit por lote em 4 Macro-PRs, e roda os gates.

## De onde veio

| Auditoria | Base | Cobertura | Propostas prontas |
|---|---|---|---|
| ChatGPT (rodadas `r01-*`) | `0daeae34` | os 638 artigos | 1.646 |
| Gemini (rodadas `r02-*-gemini-*`) | `0daeae34` | 310 artigos (acabaram os créditos) | 838 |

As pastas de cada artigo (`ANALISE.md`, `REVISAO.md`, `PROPOSTAS.json`) ficaram no checkout principal, em
`docs/auditoria-copy-artigos/artigos/`. Elas não estão no git e não fazem falta para implementar: cada lote
traz o texto exato de cada mudança.

Os 162 artigos que o Gemini não começou e os 145 que ele só analisou não deixam buraco, porque o ChatGPT
cobriu os 638.

**Complemento (07/11, L36).** O cruzamento das 3.027 propostas gravadas com o plano achou 112 sem destino:
- 109 do Gemini, em 40 artigos, gravadas noutro formato (`field`/`before`/`after` e o "pronto" no arquivo), que o
  script de montagem leu como não prontas: Dolce Gusto e Nutren em PT, e as famílias SHEIN e YesStyle "é
  confiável" e YesStyle vs Olive Young;
- 3 do ChatGPT que a auditoria deixou "pendente".

Foram arbitradas sobre a `main` depois do M4 (`a9e81ac9`). Entram 3, no L36; as outras 109 estão no
`nao-aplicar.json`. As 270 rejeitadas pelo revisor da própria auditoria ficaram de fora, como antes.

## Como foi decidido

1. **Conferência contra a `main` de 07/11 (`aae5ed12`).** A base das auditorias estava 8 commits atrás e,
   no meio, 438 artigos mudaram (Macro-PRs da auditoria de SEO #692–#696, banner da SHEIN #697 e confirmações
   #698/#699). O script marcou cada proposta como aplicável, parcial, obsoleta ou já aplicada.
2. **Arbitragem por lote.** Foram 82 pacotes: 36 famílias de 10 idiomas, com PT+EN primeiro e os outros 8
   idiomas seguindo essa decisão, mais 46 pacotes de artigos em PT. Em cada pacote, um agente decidiu proposta
   a proposta e um segundo agente, independente, revisou: 1.874 decisões confirmadas e 587 corrigidas.
   - O ChatGPT é a trilha principal. O Gemini entra só onde acrescenta algo, fundido num texto único,
     nunca duas mudanças no mesmo trecho.
   - As regras do site valem acima das duas auditorias:
     - artigo direto, sem bastidor;
     - a catraca das datas e da resposta rápida;
     - `description` com até 180 caracteres e o snippet com o código;
     - jurídico em uma frase;
     - CECILIA010 como código de recompensa, 4CW5Y sem desconto e SONAR20 sem renovação;
     - traduções sem "Brasil";
     - CECI sem limite de usos e fora de fórmula infantil;
     - sem acompanhar estoque;
     - fato novo sem fonte não entra.
3. **Validação por script.** As 1.536 propostas a aplicar somam 4.412 unidades. Todo "antes" confere,
   caractere por caractere, com a `main` de 07/11.
4. **Aplicação completa simulada.** Com os 35 lotes aplicados de uma vez sobre a `main`, passaram
   `build-index`, `validate:content`, `test:review-i18n`, `test:article-d2` e `test:store-banners`. Os 7 erros
   que apareceram na primeira rodada foram corrigidos no próprio lote. A proposta corrigida tem o campo
   `ajustes_pos_gate`, que diz o que mudou.

## O que tem aqui

| Arquivo | Conteúdo |
|---|---|
| `lotes.json` | os 35 lotes: tipo, loja, slugs e contagens |
| `lotes/Lxx.json` | o lote, artigo por artigo, e por proposta: `decisao`, `motivo`, `ordem` e `unidades` (`op`, `ponteiro`, `antes`, `depois`) |
| `aplicar.py` | aplica um lote e confere cada "antes" antes de gravar |
| `nao-aplicar.json` | 1.033 propostas que não entram: 615 descartadas e 418 já cobertas pela `main`, cada uma com o motivo (109 delas são do complemento L36) |
| `depende-confirmacao.json` | 185 propostas que esperam uma resposta do Bruno, para depois |

### Decisões

| Decisão | Quantas | O que significa |
|---|---:|---|
| aplicar | 388 | o texto da auditoria entra como está |
| aplicar_ajustada | 780 | entra, com o texto acertado às regras ou fundido com a outra trilha |
| rebasear | 368 | o trecho mudou na `main`, mas a melhoria vale; o "antes" já é o texto de hoje |
| ja_coberto | 374 | a `main` já resolve |
| descartar | 550 | fere regra, troca de estilo sem ganho, ou o trecho nunca existiu |
| depende_confirmacao | 4 + 181 | à parte, em `depende-confirmacao.json` |

## Como implementar

São 4 Macro-PRs (decisão do Bruno, 07/11), com um commit por lote, na ordem da seção "Ordem sugerida", e
depois o M5, da revisão do código na resposta rápida:

| Macro-PR | Lotes |
|---|---|
| M1 | L35, L24, L29, L31, L17 |
| M2 | L18, L30, L19, L20, L15, L23 |
| M3 | L14, L16, L21, L22, L25–L28, L32–L34 |
| M4 | famílias L01–L13 |
| M5 | L36 (complemento, 3 unidades) no primeiro commit; depois o código na resposta rápida, de L37 em diante (ver "M5" abaixo) |

Um Macro-PR por vez: o seguinte só começa depois do merge do anterior, a partir da `main` nova. Os lotes
mexem no mesmo conjunto de arquivos, e a catraca anti-prontuário e o snippet só encolhem, então PRs em
paralelo se atropelam. Dentro do Macro-PR, os lotes também são aplicados em sequência, no mesmo worktree.

No começo de cada Macro-PR, partir da `main` atualizada: `git fetch origin` e um branch novo a partir de
`origin/main`. Depois, para cada lote:

1. Conferir: `python -I docs/auditoria-copy-artigos/plano-diretor/aplicar.py Lxx --check`.
   - Sem erro: seguir para o passo 2.
   - Com erro, a `main` mudou naquele trecho depois de 07/11. O script não grava nada no artigo com erro.
     Abra o artigo, leia o `motivo` da proposta e refaça só aquela unidade sobre o texto novo, com a mesma
     intenção. Depois atualize `antes` e `depois` no `Lxx.json` e rode o `--check` de novo.
2. Aplicar: `python -I docs/auditoria-copy-artigos/plano-diretor/aplicar.py Lxx`.
   - O script grava com indentação de 2 espaços e mantém o fim de linha do arquivo.
   - A ordem dentro de cada artigo já está resolvida: replace, depois add e remove, e por último o
     `move-sections`. Seis artigos reordenam seções, listados na tabela.
3. Regenerar os índices com `node scripts/content/build-index.mjs` e rodar `npm run validate:content`.
   Nas famílias, rodar também o `npm run test:review-i18n`. Assim o erro fica preso ao lote que o causou.
4. Commitar o lote com os índices que mudarem (`src/lib/generated/` e `public/search-index*.json`; cinco
   propostas trocam `title`), com o lote na mensagem, por exemplo
   "fix: copy dos artigos da Toda Up (auditoria, L35)".

No fim do Macro-PR:

1. Rodar os gates: `npm run typecheck`, `npm run validate:content`, `npm run test:review-i18n` e
   `npm run test:article-d2`. O build completo fica com o CI.
2. Revisar o diff por amostragem: em cada artigo, ao menos um trecho de cada proposta `aplicar_ajustada`
   ou `rebasear`.
3. Abrir o PR com os lotes no título, por exemplo "fix: copy dos artigos, auditoria M1 (L35, L24, L29,
   L31, L17)". No corpo, as contagens de cada lote e a lista de `ajustes_pos_gate`.
4. Passar pela revisão do Fable, uma vez por Macro-PR.

Modelos: a aplicação é do script. O Sonnet refaz os trechos que o `--check` apontar e faz a leitura do
diff por amostragem; o Haiku pode rodar e resumir os gates.

Regras para quem implementa:

- **Não reabrir a arbitragem.** Se um texto decidido parecer errado, anote no PR e siga com o resto. Só não
  aplique uma unidade que fira uma regra do CLAUDE.md, e diga qual.
- **Fora do escopo:** `/cupons/*`, imagens e capas (o plano é só de texto). Também não passa pelo Job 3,
  porque nenhum artigo é novo.
- **Famílias de 10 (L01–L13):** o lote traz as 10 versões juntas. Aplique o lote inteiro, nunca só uma parte
  dos idiomas: o `test:review-i18n` exige a mesma estrutura nas 10.

## M5: código na resposta rápida

Decisão do Bruno (07/11). É a revisão complementar preparada em `docs/revisao-quickanswer-cupons-2026-11-07/`,
no checkout principal, fora do git. Ela confere, artigo por artigo, se a resposta rápida entrega o código literal,
o benefício e a condição principal quando o cupom vale para o assunto do artigo.

- **Quando:** a análise de um artigo pode começar quando o Macro-PR dele entrar na `main`, sobre o texto
  final. A escrita entra num PR só, depois do merge do M4, a partir da `main` nova.
- **Formato:** a entrega são lotes neste mesmo formato (`lotes/L37.json`, `L38.json`…; uma família de 10
  idiomas num lote só), aplicados pelo `aplicar.py` com o mesmo fluxo, os mesmos gates e o Fable no fim.
  Cada proposta registra a decisão por artigo; quem "mantém sem código" leva a exceção no `motivo`.
- **Regras da resposta rápida:**
  - continuam 2 ou 3 frases e 40–60 palavras;
  - o código entra no lugar de outra frase, de preferência a de encaminhamento, e não por cima dela;
  - até 70 palavras só quando a resposta rápida traz o código e não cabe sem perder o veredito, com o
    motivo registrado;
  - sem R$: a condição entra sem o valor ("acima do pedido mínimo", "exceto lançamentos"), e o valor fica
    no corpo e na `metaDescription`. Valor por extenso para contornar a regra também não vale.
- **Exceções:**
  - 4CW5Y é indicação, sem desconto;
  - CECILIA010 é código de recompensa, nunca cupom;
  - SONAR20 vale só em compra nova, nunca em renovação ou domínio;
  - CECI nunca em fórmula infantil de 0 a 12 meses;
  - a Insider não cita outros cupons;
  - loja só de link (Lejour) não tem código;
  - Kopenhagen está pausada;
  - artigos de reputação e restrições do MAUAD seguem o brief.
- **Max Titanium, Probiótica e Insider:** nos artigos "como usar", esperar a remedição de ~14/11 da
  canibalização com `/cupons/<loja>`.

## Ordem sugerida

Primeiro as lojas com venda em queda e busca "cupom <loja>" fraca (memória de 05/11). Depois o resto em PT
e, por fim, as famílias, que são as maiores.

1. L35 Toda Up, L24 Insider, L29 Max Titanium, L31 Probiótica, L17 Cléa Store
2. L18 DAMIE, L30 Nestlé Nutre, L19 e L20 Dolce Gusto, L15 Belive, L23 I Wanna Sleep
3. L14, L16, L21, L22, L25–L28, L32–L34
4. Famílias: L01–L06 Hostinger, L07–L09 SHEIN, L10–L13 YesStyle

## Lotes

Colunas:
- **Ap/Aj/Rb**: aplicar, aplicar_ajustada e rebasear.
- **GPT/Gem**: trilha de origem.
- **Ajust.**: propostas com `ajustes_pos_gate`.
- **Reordena seções**: artigos com `move-sections`.

| Lote | Tipo | Loja | Artigos | Propostas | Unidades | Ap/Aj/Rb | GPT/Gem | Famílias | Ajust. | Reordena seções |
|---|---|---|---:|---:|---:|---|---|---|---:|---|
| L01 | famílias | hostinger | 30 | 48 | 135 | 14/24/10 | 47/1 | hostinger-ai-builder, hostinger-black-friday, hostinger-cupom-como-funciona | 0 | |
| L02 | famílias | hostinger | 30 | 71 | 291 | 7/20/44 | 70/1 | hostinger-dominio, hostinger-openclaw-gerenciado-ou-vps, hostinger-openclaw-melhor-vps | 0 | |
| L03 | famílias | hostinger | 30 | 71 | 453 | 6/54/11 | 71/0 | hostinger-openclaw-ou-hermes-agent, hostinger-ou-godaddy, hostinger-ou-hostgator | 0 | |
| L04 | famílias | hostinger | 30 | 81 | 199 | 17/44/20 | 81/0 | hostinger-paperclip-ai, hostinger-reach-ou-mailchimp-brevo, hostinger-renovacao-cupom | 0 | |
| L05 | famílias | hostinger | 30 | 122 | 257 | 10/50/62 | 101/21 | hostinger-reputation, hostinger-trust-guide, hostinger-vps-ou-compartilhada | 0 | |
| L06 | famílias | hostinger | 10 | 21 | 82 | 15/6/0 | 21/0 | hostinger-wordpress | 0 | |
| L07 | famílias | shein | 30 | 53 | 66 | 45/8/0 | 33/20 | shein-11-11, shein-black-friday, shein-referral-code | 0 | |
| L08 | famílias | shein | 30 | 57 | 169 | 5/41/11 | 57/0 | shein-reputation, shein-tamanho, shein-trust | 0 | |
| L09 | famílias | shein | 30 | 71 | 261 | 15/24/32 | 71/0 | shein-vale-a-pena, shein-vestido-festa, shein-vs-shopee-temu | 0 | |
| L10 | famílias | yesstyle | 30 | 41 | 41 | 23/18/0 | 40/1 | yesstyle-app, yesstyle-black-friday, yesstyle-coupon-guide | 0 | |
| L11 | famílias | yesstyle | 30 | 73 | 144 | 32/21/20 | 53/20 | yesstyle-kbeauty, yesstyle-reputation, yesstyle-reward-code | 0 | |
| L12 | famílias | yesstyle | 30 | 82 | 142 | 32/18/32 | 62/20 | yesstyle-shipping-by-country, yesstyle-skincare-30, yesstyle-trust | 0 | |
| L13 | famílias | yesstyle | 20 | 39 | 39 | 10/29/0 | 19/20 | yesstyle-vs-alternatives, yesstyle-vs-olive-young | 0 | |
| L14 | PT | bagaggio | 14 | 35 | 93 | 3/18/14 | 34/1 | — | 1 | |
| L15 | PT | belive | 13 | 29 | 89 | 2/18/9 | 29/0 | — | 0 | |
| L16 | PT | black-skull | 15 | 40 | 153 | 5/22/13 | 38/2 | — | 1 | |
| L17 | PT | clea-store | 12 | 26 | 80 | 5/17/4 | 26/0 | — | 0 | clea-store-mercado-livre-ou-site |
| L18 | PT | damie | 19 | 56 | 158 | 20/29/7 | 45/11 | — | 0 | |
| L19 | PT | dolce-gusto | 13 | 42 | 81 | 15/21/6 | 33/9 | — | 1 | adaptador-neo-start-o-que-e, clube-dolce-gusto-como-funciona |
| L20 | PT | dolce-gusto | 12 | 34 | 61 | 16/17/1 | 28/6 | — | 0 | |
| L21 | PT | dr-peanut | 11 | 25 | 72 | 1/21/3 | 24/1 | — | 0 | |
| L22 | PT | holyfoods | 4 | 8 | 32 | 2/5/1 | 8/0 | — | 0 | |
| L23 | PT | i-wanna-sleep | 14 | 42 | 127 | 12/16/14 | 37/5 | — | 1 | qual-travesseiro-escolher-guia-linhas-i-wanna-sleep |
| L24 | PT | insider | 19 | 56 | 212 | 8/42/6 | 54/2 | — | 2 | |
| L25 | PT | lejour | 5 | 13 | 33 | 2/8/3 | 12/1 | — | 0 | |
| L26 | PT | letseatit | 17 | 41 | 132 | 6/27/8 | 37/4 | — | 0 | |
| L27 | PT | magalu | 3 | 9 | 14 | 3/6/0 | 7/2 | — | 0 | cupom-magalu-em-casa-com-cecilia |
| L28 | PT | mais-mu | 7 | 15 | 45 | 2/8/5 | 15/0 | — | 0 | |
| L29 | PT | max-titanium | 12 | 37 | 122 | 8/20/9 | 32/5 | — | 0 | |
| L30 | PT | nestle-nutre | 21 | 69 | 153 | 25/38/6 | 55/14 | — | 1 | fibermais-como-usar-em-receitas-e-bebidas |
| L31 | PT | probiotica | 11 | 23 | 103 | 2/16/5 | 23/0 | — | 0 | |
| L32 | PT | sem loja | 8 | 21 | 36 | 6/13/2 | 14/7 | — | 0 | |
| L33 | PT | simple-organic | 5 | 13 | 48 | 4/8/1 | 13/0 | — | 0 | |
| L34 | PT | skelt | 14 | 29 | 95 | 1/24/4 | 28/1 | — | 0 | |
| L35 | PT | toda-up | 19 | 43 | 194 | 9/29/5 | 41/2 | — | 0 | |
| L36 | complemento | nestle-nutre, yesstyle | 3 | 3 | 3 | 1/2/0 | 0/3 | — | 0 | |

Total de L01–L35: 628 artigos, 1.536 propostas e 4.412 unidades; o L36 soma 3 propostas em 3 artigos. Os campos mais tocados são `contentSections` (3.654
unidades), `decision` (278), `cta` (194), `description` (95) e `metaDescription` (57).

## Depende de confirmação (para o Bruno, fora dos lotes)

São 185 propostas em `depende-confirmacao.json`. Quase todas são da Hostinger:

- 4 unidades por idioma na família `hostinger-ai-builder`;
- 6 no `hostinger-horizons-vale-a-pena`;
- 2 por idioma na `hostinger-openclaw-melhor-vps`.

O resto são casos soltos da YesStyle e da SHEIN. Algumas podem já ter sido respondidas no #698 e no #699
(07/11): confira o artigo atual antes de perguntar. A proposta confirmada vira um lote novo, no mesmo
formato.
