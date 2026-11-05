---
titulo_provisorio: "HolyFoods é confiável? CNPJ, site oficial, entrega e a garantia de 30 dias"
seo_title: "HolyFoods é confiável? CNPJ, site oficial e garantia"
slug_sugerido: "holyfoods-e-confiavel"
parceiro: "[[HolyFoods]]"
parceiro_slug: "holyfoods"
category: "confianca-reputacao"
reviewKind: "editorial"
type: "Editorial"
status: "pauta-aprovada"
responsavel: "-"
proxima_acao: "redacao"
bloqueado_por: "-"
data_criacao: "2026-11-05"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "holyfoods"
coupon: "EMCASA"
---

# Briefing: HolyFoods é confiável?

O primeiro dos quatro artigos de onboarding da HolyFoods, aprovado pelo Bruno em 05/11/2026. A HF1 da proposta virou dois
artigos: este e o do Reclame Aqui. Modelo de forma: [[simple-organic-e-confiavel]] e [[skelt-e-confiavel]].

## Busca (autocompletar de 05/11/2026)
"holyfoods é confiável", "holy foods é confiável", "holyfoods é bom", "holyfoods é saudável", "holyfoods vale a pena".
"Reclame aqui" vai para o artigo irmão; o "é bom" dos produtos fica para a HF7, no estoque.

## Esqueleto
1. **Resposta rápida:** empresa ativa desde 2023 (CNPJ), de Extrema (MG), com loja online própria, garantia de 30 dias
   e reputação "Boa" no Reclame Aqui. Sem preço.
2. **Quem é a HolyFoods:**
   - a Holy Group Ltda do CNPJ, aberta em 30/05/2023;
   - os números que a marca divulga (unidades, clientes, pontos de venda), ditos como frase da marca;
   - o perfil do Reclame Aqui ainda tem o endereço "holysoup". A troca de nome entra só com fonte da marca.
3. **Como saber se você está no site oficial:**
   - o domínio `holyfoods.com.br`, registrado em 2024;
   - o CNPJ do rodapé, igual ao do Reclame Aqui;
   - o checkout em `seguro.holyfoods.com.br` é da própria loja, e o texto explica isso para quem estranhar o endereço.
4. **O que a loja vende:** sopas, massas, risotos, aveias e kits, guardados na despensa. Uma tabela curta por linha, com
   o rendimento. Sem preço da Black aqui: o preço vai no artigo da Black Friday.
5. **Entrega e frete:** frete grátis por região, com o prazo e o frete calculados no checkout. "Produto não recebido" é
   a maior queixa no Reclame Aqui: dizer onde rastrear (o "Rastrear pedido" do menu) e o que fazer.
6. **Garantia e devolução:** 30 dias depois de receber; dá para provar uma unidade e devolver as outras fechadas, sem
   custo. Ler as condições completas no Chrome (`/policies/refund-policy`).
7. **E o Reclame Aqui?** Um parágrafo (Boa, 7,5, 91,1% resolvidas, 51,9% voltariam) e o link do artigo irmão.
8. **Lojas físicas e revenda:** existem "Onde encontrar" e revenda. O EMCASA é da loja online.
9. **Parceria e cupom:** 15% com o EMCASA, somando com a promoção nos testes de 05/11. Âncora "cupom HolyFoods" para
   `/cupons/holyfoods`.
10. **Vale a pena comprar no site?** O quadro "Leve se / Passe se", sem preço.
11. **Perguntas frequentes:**
    - "HolyFoods é confiável?"
    - "Qual é o site oficial?"
    - "Qual o CNPJ?"
    - "Tem loja física?"
    - "E se eu não gostar?" (a garantia)

## Regras do onboarding (valem para os quatro)
- **Fatos:** `holyfoods-fatos-0511.md` (nesta pasta) e o dossiê `01_Parceiros/HolyFoods.md`. O que não está lá, o
  artigo não diz. Releia no site o que muda (preço, campanha, frete). Se o site bloquear, pare e use o Chrome, sem
  contornar o bloqueio.
- **Cupom:** EMCASA, 15% em todo o site.
  - Nos testes de 05/11 (avulsos e packs, já com os 30% da Black), ele somou com a promoção. Kit não foi testado: o texto
    manda conferir o desconto no checkout.
  - Ele entra na tela "Finalizar compra", não no carrinho.
  - O uso repetido não foi testado: nada de "vale toda vez".
- **Link:** o da parceria (`offerUrl`, como veio) não aplica o cupom; o texto manda copiar o código.
- **Nunca** citar cupom de outra criadora nem de primeira compra.
- **Saúde:** sem promessa de emagrecimento, de "desinchar" ou de detox, e sem citar medicamento (o blog da loja fala em
  Ozempic). Descrever o produto, o rótulo e o preço.
- **Sem experiência inventada:** ninguém do site provou os produtos; o texto não diz como é o sabor.
- **Catraca:** resposta rápida de 2 a 3 frases sem preço; no máximo 2 datas no corpo, nenhuma em título de seção,
  legenda ou FAQ; `description` de até 180 caracteres; `metaDescription` com "EMCASA" e "15%" na 1ª frase, o código
  terminando até o caractere 100, até 155 caracteres, sem data com dia e sem R$.
- **Imagens:** capa pelo Job 6 (covers:render e a folha de aprovação do Bruno) e ao menos uma foto no corpo, só da
  marca, pelo fluxo do `docs/GUIA-MIDIA-EDITORIAL.md`.
- **PR:** `node scripts/content/build-index.mjs` e commitar os gerados que mudarem; gates `validate:content`,
  `test:article-d2` e `typecheck`. Os artigos dependem da página `/cupons/holyfoods` (PR #590): vão no mesmo deploy
  dela ou depois.
