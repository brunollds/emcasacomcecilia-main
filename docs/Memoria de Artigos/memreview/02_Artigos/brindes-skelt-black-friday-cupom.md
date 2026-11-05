---
titulo_provisorio: "Brindes Skelt na Black Friday: creme para mãos e Body Cream com o cupom, só por 48 horas"
seo_title: "Brindes Skelt na Black Friday: 2 brindes com o cupom"
slug_sugerido: "brindes-skelt-black-friday-cupom"
parceiro: "[[Skelt]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Promoção"
status: "pauta-aprovada"
responsavel: "sessão de artigos"
proxima_acao: "escrever e publicar no mesmo deploy do banner skelt-brindes-48h-2026 (05/11, ou no começo de 06/11); aposentar o brinde-skelt-30-outubro-cupom com 301 para este slug"
bloqueado_por: "-"
data_criacao: "2026-11-05"
modo_i18n: "somente-pt"
idioma_fonte: "pt"
affiliate: "skelt"
coupon: "SKEMCASACOMCECILIA"
---

# Briefing de Pauta: brindes da Skelt em 48 horas com o cupom

Pedido do Bruno em 05/11/2026: "Vamos pautar este artigo rápido de promoção", com o card da Skelt aos creators colado na sessão de pautas. É urgente, porque a promoção vale só por 48 horas, de 05/11 00:00 a 06/11 23:59:59 (horário de Brasília). O artigo e o banner vão no mesmo deploy, com o GO do Bruno.

## 1. O que a Skelt informou (card aos creators, 05/11/2026)

| Fato | Texto do card |
|---|---|
| Prazo | "Somente por 48 horas" (05/11 e 06/11, segundo a sessão de banners) |
| Desconto progressivo no site | 1 produto: 10%; 2 produtos: 15%; 3 ou mais: 20% |
| Brinde 1 | Creme para Mãos Velvet Milano, em compras acima de R$ 199 |
| Brinde 2 | Body Cream Mystic Bloom, em compras acima de R$ 249 |
| Acumula | "Comprou acima de R$ 249, ganhou os dois brindes" |
| Condição | Brindes exclusivos, só com o cupom de creator (o nosso é o SKEMCASACOMCECILIA) |

**O card não diz:**
- se as faixas de R$ 199 e R$ 249 contam antes ou depois dos descontos (progressivo, cupom e Pix), nem se o frete entra;
- se o cupom soma com o desconto progressivo. O teste de 21/10 provou que o cupom soma com as promoções do site e com os 5% do Pix, mas o progressivo é novo. O texto não afirma: manda conferir o resumo do pedido. Se o Bruno confirmar no carrinho antes do deploy, a frase vira afirmação.

**Já confirmado pelo site e pelos dados:**
- O SKEMCASACOMCECILIA dá 10% (`couponsData.ts`; teste de 21/10/2026).
- Preços na API da loja em 05/11, com o progressivo de 1 produto já aplicado:
  - Creme para Mãos Velvet Milano: de R$ 32,90 por R$ 29,61 (`creme-para-maos-velvet-milano`).
  - Body Cream Mystic Bloom: de R$ 99,90 por R$ 89,91 (`body-cream-mystic-bloom`).
  - Os dois brindes valem R$ 132,80 pelo preço cheio. É referência de valor, conta nossa.

## 2. Função da pauta

É para quem já pensa em comprar na Skelt nesses dois dias e quer saber o que fazer para levar os brindes. A resposta é curta: o prazo, as duas faixas, que só vale com o cupom, como o progressivo funciona e como montar o pedido para não ficar abaixo da faixa.

## 3. Esqueleto (H2)

1. **Resposta rápida:** só por 48 horas, quem usa o SKEMCASACOMCECILIA leva o creme para mãos Velvet Milano a partir da 1ª faixa e também o Body Cream Mystic Bloom a partir da 2ª. O site ainda dá desconto progressivo: 10%, 15% ou 20% conforme o número de produtos. Sem "R$" na resposta rápida (catraca): as faixas em reais vão na seção 3.
2. **O que vem em cada brinde:**
   - Creme para Mãos Velvet Milano, R$ 32,90 avulso.
   - Body Cream Mystic Bloom, R$ 99,90 avulso.
   - Links com a UTM da parceria. Para quem quer conhecer a fragrância, link para [[hidratante-corporal-skelt-qual-fragrancia]].
3. **As faixas e o desconto progressivo:** a tabela de 1, 2 e 3+ produtos, e as faixas de R$ 199 e R$ 249.
4. **Como garantir os brindes, montando o pedido com folga:** a Skelt não disse se a faixa conta antes ou depois dos descontos. Para não depender disso, o leitor confere o subtotal no resumo do pedido. Se ele ficar abaixo da faixa, um item barato resolve; o próprio creme para mãos custa R$ 29,61. Contas nossas, marcadas, para o pior caso (faixa contada depois de tudo, com os descontos multiplicando):
   - Com 3 itens (20%) e o cupom (10%), o carrinho precisa de R$ 276,39 cheios para R$ 199 e de R$ 345,84 para R$ 249.
   - Com o Pix (5%) também: R$ 290,94 e R$ 364,04.
   - A sessão de artigos refaz as contas e monta 2 exemplos de pedido com produtos reais, relendo os preços no dia.
5. **Perguntas frequentes:**
   - "O brinde vale sem o cupom?" Não, segundo a Skelt.
   - "Os dois brindes acumulam?" Sim, acima de R$ 249.
   - "Até quando?" 48 horas, até o fim de sexta-feira (no texto da FAQ, sem dia numérico).
   - "O cupom soma com o desconto progressivo?" Conferir no resumo do pedido, ou afirmar se o Bruno testar.
   - "O cupom soma com o Pix?" Sim, teste de 21/10.

**Regras da catraca:**
- `bodyDatesReason: "campanha"`.
- Nenhuma data em título de seção, legenda ou FAQ. A FAQ "Até quando?" responde "48 horas, até o fim de sexta-feira", sem dia numérico.
- `description` com no máximo 180 caracteres.
- `metaDescription` abre com "SKEMCASACOMCECILIA" e "10%" na 1ª frase, com o código terminando até o caractere 100, no máximo 155 caracteres, sem data com dia e sem R$. Exemplo: "Use o SKEMCASACOMCECILIA (10%) na Skelt e leve dois brindes: creme para mãos e Body Cream, só por 48 horas, somando com o desconto progressivo do site." Tirar o "somando" se o teste não confirmar.
- Capa pelo Job 6 (covers:render e folha de aprovação), com o logo e os dois produtos. Ao menos 1 imagem no corpo: as fotos das fichas dos dois brindes.
- Relacionados: `black-friday-skelt`, `cupom-skelt-como-usar` e `hidratante-corporal-skelt-qual-fragrancia`.

## 4. Riscos

- **Prazo:** depois de 06/11, o artigo vira "promoção encerrada" (título e resposta rápida, sem apagar). Fica a decisão de o atualizar se a Skelt repetir os brindes na Black Friday de 27/11; mesma URL, por isso o slug não tem data.
- **Brinde em falta:** o texto não promete estoque.
- **Faixa antes ou depois do desconto, e cupom com o progressivo:** não afirmar sem teste.
- Sem alegação de pele. Ninguém do site usou os brindes.
- O `black-friday-skelt` não cita esses brindes. A sessão de artigos acrescenta, na seção "Brinde e frete", uma linha com o link para este artigo, sem repetir as faixas.

## 5. Aposentar o brinde-skelt-30-outubro-cupom (pedido do Bruno: "acho que podemos aposentar o do dia 30")

Recomendação: redirecionamento 301 do slug antigo para este, na mesma entrega.
- Por que não atualizar a mesma URL: o slug traz "30-outubro", e a promoção é outra (brindes, faixas e prazo diferentes).
- O que muda:
  - Entrada em `content/redirects.json`, de `/reviews/brinde-skelt-30-outubro-cupom` para `/reviews/brindes-skelt-black-friday-cupom`, permanente.
  - O artigo antigo (id 716) sai do ar pelo caminho que o `validate:content` e o `_manifest.json` aceitam.
  - Nenhum artigo no ar tem o antigo nos relacionados (grep de 05/11: só o próprio JSON e o `_manifest.json`).
- Esta nota de vault vira `status: aposentado`, com um ponteiro para a nova.

## 6. Banner (sessão de banners)

O arquivo é `content/campanhas/skelt-brindes-48h-2026.json`:
- `slot` mid;
- `startsAt` 2026-11-05T00:00:00-03:00 e `endsAt` 2026-11-06T23:59:59-03:00;
- `href` `/reviews/brindes-skelt-black-friday-cupom`, link interno sem sponsored, fora do próprio artigo;
- o texto do banner não cita o código.

A regra é a do `docs/CAMPANHAS.md` para campanha que só vale com o nosso código. O mid de hoje está livre: o esquenta usa o top, o November Glow usa o end e a Black Friday (o mid) começa em 27/11.
