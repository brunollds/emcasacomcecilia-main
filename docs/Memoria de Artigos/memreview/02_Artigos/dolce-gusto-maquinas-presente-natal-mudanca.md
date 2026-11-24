---
pauta_id: "NT6"
tipo: "pedido-de-mudanca"
artigo_alvo: "dolce-gusto-maquinas-qual-escolher"
forma: "secao-nova"
parceiro: "[[Dolce-Gusto]]"
codigo_cupom: "CECI"
status: "briefing"
responsavel: "Job-1"
data_criacao: "2026-11-24"
modo_i18n: "somente-pt"
---

# Pedido de mudança NT6: máquina Dolce Gusto para presente de Natal

**Decisão: seção nova no guia no ar, não URL nova.** Nenhum briefing de URL nova sai desta pauta.

## Por que seção e não URL nova

- **A busca é a do guia.** "Que máquina Dolce Gusto oferecer no Natal?" é "qual máquina comprar" com um filtro (presente). O `dolce-gusto-maquinas-qual-escolher` já ranqueia as cinco máquinas da loja oficial com o CECI, o quadro "Leve se / Passe se" e o perfil de cada uma. Uma URL nova disputaria a mesma consulta (gate 4, Job 1).
- **Demanda fraca.** No Search Console, duas consultas da Dolce Gusto com Natal em 16 meses (26 impressões no site inteiro). No autocompletar (24/11), "dolce gusto natal" com "especial de natal" e "capsula dolce gusto starbucks natal": presença, sem volume medido.
- **Sem fonte de edição de Natal.** Não há cápsula nem caixa natalina confirmada. A parte "cápsulas de Natal" da pauta sai.

## O que muda

- **Onde:** `dolce-gusto-maquinas-qual-escolher`, nova seção entre "Qual escolher pelo seu jeito de tomar café" e "Onde comprar e o cupom CECI" (depois do índice 6 de `contentSections`).
- **Título:** "Que máquina Dolce Gusto oferecer no Natal?" (a pergunta existe literalmente no Search Console, então pode ser título em forma de pergunta).
- **Conteúdo, por perfil de quem recebe** (sem experiência própria; cada linha com a fonte):
  - Quem toma café com cápsula Original: Mini Me 2.0, Genio S ou Genio S Plus, conforme o artigo já decide (menor gasto sem XL; XL e quatro temperaturas; a Mini Me cabe em bancada pequena). Fonte: o próprio guia, já conferido.
  - Quem toma só café preto e quer cápsula compostável: a NEO. **Armadilha de presente:** a NEO não aceita cápsula Original (fato oficial da Nestlé Brasil, 30/07/2026, dossiê seção 2). Quem dá a máquina precisa saber qual cápsula a pessoa já usa; não dá para presentear NEO a quem tem caixas Original em casa.
  - Quem espera bebida gelada direto da máquina: o artigo já diz que o modo frio da Touch saiu morno. Não prometer gelado.
- **Máquina de Outlet como presente:** a loja diz que máquinas de Outlet são retornadas, inspecionadas e higienizadas, com a mesma garantia; trocas são por outra de Outlet (regulamento oficial, lido em 08/10/2026). Entra como ressalva, não como indicação.
- **Garantia e troca de quem recebe:** reclamação de vício aparente e de pedido não recebido em até 90 dias, pela política da loja (regulamento oficial, 08/10/2026). A frase é da loja, atribuída.
- **Cupom:** só o CECI, com a regra já publicada no guia: 10% a partir de R$ 100 na loja oficial (`couponsData.ts`, `lastVerified` 2026-10-26; dossiê, até 3 usos por CPF). Nada de cupom de primeira compra da própria loja. O CECI sai no link de compra da seção, uma vez.
- **Não entra:** "promoções especiais de Natal" (não há fonte; a busca não achou campanha natalina da Dolce Gusto); prazo de entrega para dezembro (a loja não publicou, e não se promete chegar a tempo); preço de Natal.

## Pendência de navegador (não lida)

- `[PENDENTE: navegador]` **www.nescafe-dolcegusto.com.br** (home, `/maquinas-cafe` e a página de política de entrega). Leitura direta em 24/11/2026 (curl, user-agent de navegador, sem afiliado): HTTP 403 em todas as URLs testadas. Pela regra de bloqueio, não contornado.
- Falta, com o navegador: preço do dia das máquinas (o guia traz 08/10); prazo de entrega para dezembro, na política da loja; se há caixa ou máquina de Natal em 2026.
- Sem esse dado, a seção não traz preço de hoje. Se o navegador não confirmar nada de Natal, a seção fica sem menção a edição.

## Pontuação (seção, não URL nova)

| Critério | Peso | Nota | Justificativa |
|---|---|---|---|
| 1. Dor / dúvida real | 25 | 12 | Dúvida de presente real, mas sazonal e com pouca busca |
| 2. Evidência de demanda | 20 | 6 | Duas consultas no GSC, 26 impressões em 16 meses; autocompletar com presença |
| 3. Valor exclusivo | 20 | 8 | Ressalvas de presente que a loja não dá (NEO e Original, Outlet, troca); sem edição natalina |
| 4. Necessidade de visita | 15 | 9 | Tabela de máquinas e preço decidem; o leitor clica para ver a loja |
| 5. Cluster e links | 10 | 9 | Cai no guia no ar, que já tem o CECI e o link da loja |
| 6. Viabilidade | 10 | 6 | Preço muda toda semana; precisa reler no dia da publicação |
| **Total** | 100 | **50** | Score A (autoridade) 40; Score B (visita e conversão) 55 |

## Perguntas para o Bruno

1. Confirma a seção no guia e não uma URL nova? Se o navegador achar caixa natalina de fato, a pauta volta como URL nova, com a busca de cápsula.

## Fontes

- `01_Parceiros/Dolce-Gusto.md`, seções 1 e 2 (lidas e atualizadas até 05/11/2026).
- `content/reviews/dolce-gusto-maquinas-qual-escolher.json` (no ar; `updatedAt` 2026-11-23).
- `src/lib/couponsData.ts`, slug `dolce-gusto`.
- Leituras desta pauta: `briefings/maquina-dolce-gusto-presente-de-natal-leituras-2411.md`.
