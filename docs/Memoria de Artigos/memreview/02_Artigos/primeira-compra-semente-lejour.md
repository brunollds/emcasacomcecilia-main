# Semente: primeira compra em Lejour (12/11/2026)

Molde da série: [[cupom-primeira-compra-serie-1211]]

Modelo de pesquisa, não artigo nem briefing aprovado. O molde deixa a Lejour fora da série ("não há cupom para
comparar"). Esta semente curta responde se alguma decisão de "primeiro pedido" justifica artigo.

**Recomendação: ficar fora da série.** Nada de código, nada de cupom, nada de benefício do casal pelo nosso link.

## Identificação

- Parceira / slug comercial: Lejour / `lejour` (`offerMode: 'affiliate-link'`).
- Código ou mecanismo correto: **não há código.** Cadastro do casal pelo link da Cecília
  (`painel.lejour.com.br/onboarding/inicio?affiliate=emcasacomcecilia&source=the-coachers`); a indicação só conta para
  cadastros feitos por ele; "não ganha nada, é só indicação nossa" (Bruno, 13/10, dossiê).
- Mercado / idioma / loja regional: Brasil, PT. Plataforma brasileira de casamento.
- Data da pesquisa e revisão Git usada: 12/11/2026, `26d687d9` (main).
- Pesquisador / responsável pelo próximo estágio: pesquisa de pautas (Job 1); sem próximo estágio se o Bruno aceitar.
- Status da pesquisa: pesquisada; recomendação de ficar fora.
- Caminho da ficha de fatos: este arquivo.
- Artigo existente ou reservado nesta intenção: nenhum. Vizinhos publicados: `lejour-como-funciona`,
  `lista-de-casamento-lejour-como-criar`, `lejour-e-confiavel`, `lejour-ou-icasei`,
  `lejour-reclame-aqui-nota-reputacao`, `black-friday-lejour`.
- Estado da parceria na fonte atual: ativo; `lastVerified` 13/10/2026 (`couponsData.ts`); campanhas Black November e
  Black Week com `verifiedAt` 04/11/2026.

## 1. Semente em um parágrafo

> Quem faz o primeiro pedido na Lejour, ou seja, o casal que cria a primeira lista, precisa decidir o plano (Basic grátis,
> Premium ou Pro pagos uma vez), não um código. Nosso benefício é nenhum desconto: a indicação não dá vantagem ao casal.
> Um artigo "cupom Lejour primeira compra" teria de dizer "não há cupom e o link não dá desconto", que já está no FAQ da
> página e nos guias vizinhos. Para compras seguintes, não se aplica; a pendência localizada é nenhuma que mude a
> decisão. A única informação nova possível é o benefício das campanhas da própria Lejour (Black November), que muda por
> data e já está nos banners dos artigos.

## 2. Busca e perguntas

| Consulta/pergunta literal | Origem e data | País/idioma | Métrica disponível e período | Observação |
|---|---|---|---|---|
| cupom lejour | Autocompletar Google, 12/11 | BR / pt-BR | Não medido | Única sugestão: "cupom lejour" (ecoa a consulta) |
| lejour desconto | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sugestão: "cupom desconto lejour" |
| cupom lejour primeira compra | Autocompletar, 12/11 | BR / pt-BR | Não medido | Só ecoa a consulta |
| lejour cupom primeiro pedido | Autocompletar, 12/11 | BR / pt-BR | Não medido | Só ecoa a consulta |
| lejour primeira compra | Autocompletar, 12/11 | BR / pt-BR | Não medido | Sem sugestão em 12/11 (não é "sem demanda") |

Hipóteses de consulta ainda não observadas, separadas do banco real:

- "lejour tem desconto", "lejour é grátis", "lejour código promocional".
- "lejour primeira lista desconto", "lejour black november".

A evidência de busca é a mais fraca das quatro lojas: só ecos da própria consulta. A busca "cupom desconto plano Premium
Lejour" não devolveu nenhum cupom da Lejour; só a Fast Shop (taxa de 3,89%, 90 dias depois do casamento), a App Store e
cupons da iCasei (concorrente).

## 3. Acervo e distribuição de funções

| Página existente/reservada | URL/arquivo | Pergunta que já responde | Relação com o novo artigo |
|---|---|---|---|
| Página de cupom | `/cupons/lejour` (`couponsData.ts`) | "Tem cupom de desconto da Lejour?" (não: indicação, mesmas condições); lista grátis; planos | Fonte e FAQ que já cobrem a consulta |
| Como usar | `lista-de-casamento-lejour-como-criar` | Como criar a lista | Link |
| Outro artigo relevante | `lejour-como-funciona`, `lejour-ou-icasei`, `black-friday-lejour` | Funcionamento, comparação, campanha | Link |

Pergunta específica que o artigo assumiria: nenhuma que já não esteja respondida.

## 4. Fontes comerciais e fatos

| Fato/afirmação | Evidência exata ou cenário observado | URL ou arquivo/seção | Consulta/teste em | Mercado/canal | Status e limite |
|---|---|---|---|---|---|
| Nosso código e percentual/faixa | Não há. "A indicação não dá desconto nem benefício extra: o cadastro e os planos são os mesmos do site da Lejour." | `couponsData.ts` (`linkNote`, FAQ); dossiê seção 1 (Bruno, 13/10) | 12/11 | Brasil | Fato do nosso arquivo + declaração do Bruno |
| Válido no primeiro pedido | Não se aplica: é cadastro, não cupom | `couponsData.ts` (`reusable`, `combinable`) | 12/11 | — | Não se aplica |
| Definição de cliente novo | O casal que cria o cadastro pelo link; "A indicação só conta para cadastros feitos pelo link" | `couponsData.ts` (`linkInstructions`) | 12/11 | — | Fato do nosso arquivo para a indicação; critério da Lejour: não encontrado |
| Uso nas compras seguintes | Não se aplica | — | — | — | Não se aplica |
| Mínimo/teto/limite de usos | Não se aplica | — | — | — | Não se aplica |
| Produto/categoria/canal excluído | Não se aplica | — | — | — | Não se aplica |
| Boas-vindas oficial e requisitos | Nenhum benefício de primeiro cadastro na home: "First-time or new-couple benefits: None mentioned" (resumo do WebFetch) | `https://lejour.com.br/` | 12/11 | — | Não encontrado na home |
| Planos e taxa (oficiais) | Basic grátis; taxa "3,89% no Basic, 3,29% no Premium e a partir de 2,99% no Pro"; "Grátis ilimitado" para saques nos Premium e Pro | `https://lejour.com.br/` (resumo do WebFetch, trecho recuperado); dossiê seção 1 (tabela do Bruno, 13/10) | 12/11 | Brasil | Confirmado; preços de Premium e Pro não aparecem na home |
| Campanha atual da Lejour | Black November: "planos e adicionais com 50% OFF" (home, 12/11); `lejour.com.br/black-friday/`: "Ofertas válidas de 01 a 30/11/2026"; Black Week: "taxa promocional válida de 23 a 29/11/2026 para novos casais elegíveis" | `content/campanhas/lejour-black-november-2026.json` e `lejour-black-week-2026.json` (`verifiedAt` 04/11); `lejour.com.br` (home, 12/11) | 12/11 | Brasil | Fato oficial datado; muda; **é campanha, não código** |
| Pix, promoção, kit, benefício automático | Presentes pagos por Pix, boleto ou cartão até 12x (juros de 3,49% ao mês pagos pelo convidado) | dossiê seção 2 (central de ajuda, 14/10) | — | Brasil | Dossiê; não é tema |
| Frete | Não se aplica (serviço digital) | — | — | — | Não se aplica |

Teste de carrinho: não se aplica; não há cupom.

## 5. Escolha por cenário

| Perfil/primeiro pedido | Opção a considerar | Por que muda a decisão | Condição decisiva | Base factual |
|---|---|---|---|---|
| Quem quer aplicar nosso benefício | Criar o cadastro pelo link | Sem vantagem para o casal; só a indicação conta | Cadastro feito pelo link | Arquivo |
| Quem procura desconto da marca | Campanha Black November (planos pagos com 50% OFF) | Outra decisão: qual plano | Prazo (até 30/11), plano | Campanha da Lejour |
| Quem já é cliente | Não se aplica | — | — | — |

Conta necessária, com preço de venda, ordem de descontos e custos separados: não há o que comparar com o nosso link. Se
um dia houver, a conta é entre planos (Basic x Premium x Pro) e taxa por presente, não entre cupons.

Conta que não pode ser concluída com os dados disponíveis: o valor do Premium e do Pro na Black November (50% sobre o
quê, com qual preço de partida), porque a home não lista os preços. Não imprimir códigos de outros criadores.

## 6. Referências e lacuna

| URL e leitura em | Consulta associada / como foi encontrada | O que a página responde bem | Lacuna ou divergência | O que aproveitar na nossa estrutura |
|---|---|---|---|---|
| `https://lejour.com.br/`, 12/11 | Site oficial | Planos, taxa, Black November, "Grátis" do Basic | Nenhuma oferta de primeiro cadastro; sem preço de Premium e Pro | Só as taxas |
| `https://site.fastshop.com.br/lista-de-casamento` (resultado da busca), 12/11 | "Lejour cupom desconto plano Premium" | Taxa de 3,89%, 90 dias depois do casamento | Fast Shop, não Lejour; sem cupom | Nada |
| `https://www.radarcupom.com.br/loja/icasei.com.br` (resultado da busca), 12/11 | Mesma busca | Cupons da iCasei (concorrente) | Maioria expirada; não é Lejour | Nada |

Não encontrei nenhuma página de terceiro sobre "cupom Lejour primeira compra" que pudesse ler (a busca não trouxe): o
resultado em si é a evidência de que a consulta tem baixa disputa e baixa promessa.

Uma frase de ganho de informação:

> Este artigo, se existisse, ajudaria o casal que cria a primeira lista na Lejour a decidir entre o plano gratuito e os
> pagos, explicando que o link da Cecília não dá desconto e que o benefício é a campanha da própria Lejour, com base na
> página da loja e nos nossos arquivos. **Não há ganho de informação que justifique um artigo próprio:** a resposta
> ("não há cupom; o link é só indicação; o Basic é grátis para todos") está no FAQ de `/cupons/lejour`, e a decisão de
> plano já é tema de `lejour-como-funciona` e `lejour-ou-icasei`.

Distinção entre versão da página e trecho recuperado pela busca: a leitura da home é resumo do WebFetch (trechos
recuperados); preços de Premium e Pro não vieram.

## 7. Proposta editorial para o Job 1

- **Proposta: não criar o artigo.** Alternativas baratas, a decidir pela sessão de cupons e pelo Bruno:
  1. Manter a pergunta "Tem cupom de desconto da Lejour?" no FAQ de `/cupons/lejour` (já existe) e, se quiser capturar
     "cupom lejour primeira compra", acrescentar uma frase de resposta curta ali ("o cadastro pelo nosso link não é
     cupom nem exige primeira compra: o benefício do casal é o plano Basic, grátis para todos, e as campanhas da Lejour").
  2. Reforçar, nos artigos vizinhos, o link para `/cupons/lejour` com âncora "cupom Lejour".
- Consulta principal e consultas secundárias sustentadas: nenhuma além de ecos ("cupom lejour").
- Intenção / benefício que decide: não há benefício a escolher.
- Slug candidato: não se aplica (se o Bruno quiser mesmo assim, `cupom-lejour-primeira-compra`; nenhum duplicado).
- Categoria / reviewKind previstos: se existisse, `guias-praticos-utilidade` + `guia`, sem `coupon` (a indicação não é
  cupom; contrato em `docs/CONTRATO-ARTIGO-AFILIADO.md`).
- Títulos candidatos e recomendação inicial (só se o Bruno insistir): "Cupom Lejour primeira compra: não há código, e o
  que vale é o plano". Não recomendo.
- Resposta rápida proposta (só se existir; 47 palavras, sem "R$"):

> Não existe cupom Lejour de primeira compra: o link da Cecília é uma indicação, sem desconto nem código. O que o casal
> escolhe é o plano: o Basic é gratuito, e o Premium e o Pro são pagos uma vez. A Lejour faz campanhas próprias, com
> prazo, que aparecem no site dela.

- metaDescription proposta (só se existir): não proponho. O `checkSnippet` exige código exato e "% na primeira frase" nos
  artigos com `coupon`, e a Lejour não tem `coupon`; a regra não se aplica, mas a série inteira se apoia nele.
- Módulos necessários e módulos dispensáveis: se existisse, 3 capítulos curtos (resposta direta, planos em uma tabela,
  campanha da Lejour). Sem quadro `decision`.

| Capítulo proposto | Pergunta literal do banco ou "título direto" | Resposta que precisa entregar | Fato que o sustenta |
|---|---|---|---|
| (não proposto) | — | — | — |

Conclusão por perfil que o futuro artigo poderá sustentar: nenhuma própria.

Links internos planejados: `/cupons/lejour` (âncora "cupom Lejour"), `/reviews/lejour-como-funciona`,
`/reviews/lista-de-casamento-lejour-como-criar`.

## 8. Exceções e localização (a seção mais importante nesta loja)

- **Mecânica especial, campo correto e público:** cadastro por link, sem campo de código. Público: casais que vão criar o
  site do casamento e a lista de presentes.
- **Nomenclatura (regra do dossiê, seção 3):** nunca chamar a indicação de cupom nem prometer desconto. Um título com
  "cupom Lejour" só se explicar que não há. "Lista grátis" na página vale para qualquer casal, com ou sem o link.
- **Países/idiomas previstos na etapa seguinte:** nenhum. Loja brasileira, serviço em português, saque por Pix para
  chave do CPF; não há versão em outro idioma nem mercado.
- **Fatos que precisam ser localizados, não apenas traduzidos:** não se aplica.
- **Conteúdos sem código, com faixas ou com recompensa/indicação:** indicação sem código e sem desconto. Não inventar
  código; o único "benefício" é o da campanha da própria Lejour (Black November, Black Week), que não vem do nosso link e
  tem prazo.
- **Limites editoriais específicos do parceiro:** decisão do Bruno (14/10): o texto cita só o CNPJ, nenhum nome de empresa;
  não citar a parceria Fast Shop como fato de aquisição; não prometer desconto, nem para quem usa o link (dossiê:
  "não ganha nada, é só indicação nossa"); campanhas ficam fora do corpo (mudam por data); promoções da iCasei e de
  outros concorrentes não entram.

## 9. Pendências acionáveis

| Pergunta exata | Por que muda a decisão | Fonte/cenário que falta | Dono | O que pode avançar enquanto isso |
|---|---|---|---|---|
| O Bruno quer um artigo mesmo sem ganho próprio, ou só reforçar o FAQ de `/cupons/lejour`? | Decisão final é dele; a semente recomenda FAQ | Palavra do Bruno | Bruno | A Lejour fica fora da série |
| Preços de Premium e Pro e a regra exata da Black November (50% sobre o preço cheio?) | Só importa se houver artigo de campanha | `lejour.com.br/black-friday/` no navegador | Job 1 | Banner de campanha já cobre |
| Histórico GSC/Bing de "cupom lejour" | Linha de base e prova de demanda | Export direto | Bruno | Autocompletar já mostra baixa demanda |

## 10. Passagem ao briefing

- [x] Marca consta no inventário da série e possui dono/reserva de arquivo (este arquivo).
- [x] Nosso código/benefício: nenhum, sustentado pelo Bruno e pela página.
- [x] Compra seguinte não foi presumida (não se aplica).
- [x] Não se confundiu código, Pix, cashback, frete, recompensa ou indicação (indicação, sem benefício).
- [x] A decisão do primeiro pedido (plano) está separada de qualquer aplicação técnica.
- [ ] Referências lidas: só a home oficial e resultados de busca (sem página de terceiro sobre "cupom Lejour primeira
  compra" para ler); ganho de informação escrito (conclusão: nenhum).
- [x] Perguntas reais separadas das hipóteses.
- [x] Nenhum testemunho, teste, percentual ou validade foi inventado.
- [x] Nenhum código foi inventado.
- [ ] Material pode seguir ao Job 1: a recomendação é não abrir briefing.

Situação final: pesquisada; recomendação de ficar fora da série, com a resposta no FAQ de `/cupons/lejour`.
