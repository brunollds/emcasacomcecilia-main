---
titulo_provisorio: "Cupom Toda Up: como usar o MAUAD e o que ele soma"
seo_title: "Cupom Toda Up: como usar o MAUAD"
slug_sugerido: "cupom-toda-up-como-usar"
parceiro: "[[Toda Up]]"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia & Cupons"
status: "pauta-aprovada"
responsavel: "-"
proxima_acao: "redacao"
bloqueado_por: "[PENDENTE: navegador] (campanha, checkout, catálogo)"
data_criacao: "2026-10-26"
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
parceiro_slug: "toda-up"
affiliate: "toda-up"
coupon: "MAUAD"
---

# Briefing de Pauta: Cupom Toda Up, como usar

Primeiro dos dois artigos de onboarding da Toda Up (o outro é `black-friday-toda-up`). Vai ao ar com ele e se linka a ele, e a `/cupons/toda-up`. Modelo: `cupom-bagaggio-como-usar` (mesmo formato: resposta rápida, passo a passo, teste de carrinho, regras, FAQ).

Fatos: `fatos-2610.md` (esta pasta). Dossiê `01_Parceiros/Toda Up.md` (teste de carrinho de 26/10). `couponsData.ts` (slug `toda-up`). Sem navegador nesta leitura: o que falta está em "Pendentes de navegador".

**Regra do Bruno para este código:** MAUAD é sobrenome da Cecília. Não explicar o nome do código, não destacar, não citar outro código da loja. É o mesmo código da Let's Eat It e da Belive; o texto diz sempre de qual loja fala.

**Busca (autocompletar, 26/10/2026):** "toda up" tem pouca sugestão própria. As sugestões de "cupom todaup" são de "top up", outra marca: o texto não usa "top up". "toda up primeira compra" aparece, mas não se responde com código de primeira compra. Sem sinal de demanda para Black Friday, promoção ou frete grátis (ver `black-friday-toda-up`).

---

## 1. Portões Obrigatórios (Hard Gates)
- [x] **1. Evidência factual:** teste de carrinho de 26/10 (dossiê): Comfort Up sozinho e Comfort Up + Comfort Line com a progressiva. Pendentes para publicar: ver seção 10.
- [x] **2. Segurança regulatória:** moda íntima; o texto fala só de cupom, preço, frete, troca e pagamento. Sem alegação de material, conforto ou saúde.
- [x] **3. Fronteira factual vs experiência:** "montamos o carrinho pela API pública e no Chrome, sem finalizar". Nunca "compramos" ou "usamos".
- [x] **4. Anti-canibalização:** o artigo é o passo a passo e o que soma. A campanha, o calendário e a tabela de preços são de `black-friday-toda-up`. Frete, troca e prazo ficam como resumo com link.
- [x] **5. Classe canônica:** `cupons-como-usar`.
- [x] **6. Fontes:** site oficial e políticas (dossiê, 26/10), `couponsData.ts`. Reconferir no dia da publicação.
- [x] **7. i18n:** `somente-pt`. Frete, troca e checkout são do Brasil.

---

## 2. Função da pauta & comportamento de busca
- **Trabalho principal:** [x] Visita/Decisão | [x] Conversão | [ ] Autoridade | [ ] Pós-compra.
- **Resiste à compressão por IA?** [x] Parcial. "Toda Up tem cupom?" se responde em uma linha; "o cupom soma com a promoção?" pede a conta do teste.
- **Como o código chega ao leitor?** no topo, no passo 3 e no fim, no bloco de cópia da loja (mesmo padrão dos outros artigos). Sem destaque no corpo além disso.
- **Cria novo ou atualiza?** Novo.
- **URL mais próxima:** `/cupons/toda-up`.

---

## 3. Dor do consumidor & oportunidade
- **Pergunta:** "cupom toda up", "toda up cupom de desconto", "cupom todaup"; "toda up primeira compra" (não responder com código).
- **O que a loja responde:** a home anuncia a campanha da vez (ver a outra pauta); o cupom de 10% não aparece na loja, só no cadastro.
- **Por que a resposta oficial falha:** quem não sabe se o cupom soma com a promoção ou se ele aparece sozinho no link.
- **Valor exclusivo:** a conta do teste com a progressiva, na ordem certa (progressiva primeiro, 10% sobre o que sobra).

---

## 4. Pontuação ponderada
| Critério | Peso | Nota | Justificativa |
|---|---|---|---|
| 1. Dor real | 25 | 18 | Cupom é a busca de intenção; a dúvida é "soma com a promoção?" |
| 2. Demanda | 20 | 8 | Autocompletar fraco e contaminado por "top up"; sem GSC da marca |
| 3. Valor exclusivo | 20 | 15 | Teste com progressiva e a conta de 3 carrinhos |
| 4. Necessidade de visita | 15 | 10 | Passo a passo no checkout ainda sem print |
| 5. Cluster/links | 10 | 6 | Liga a página da loja e a Black Friday; sem os outros artigos da loja |
| 6. Manutenção | 10 | 5 | MAUAD e campanha mudam (rever 26/11) |
| **Total** | 100 | **62** | |

Recomendação: seguir como briefing, com o passo a passo esperando o print do navegador. Score A 40, Score B 70.

---

## 5. Mídia
- **Capa (16:9):** sem foto nova. Opção: foto oficial de um sutiã Comfort Up (do catálogo, com OK do Bruno; ver "Pendentes"). Sem foto de modelo.
- **Corpo (mínimo 1 além da capa):** (1) quadro desenhado com a conta da progressiva (R$ 360,81 → R$ 285,78); (2) print da sacola sem e com o código, se o Chrome liberar, sem dados pessoais e sem a faixa do topo se ela trouxer outro código.
- **Vídeo:** nenhum.
- **Contrato de mídia:** `docs/GUIA-MIDIA-EDITORIAL.md`. Nada entra em `public/images` sem esse fluxo.

---

## 6. Matriz de claims
| Afirmação | Fonte | Pode publicar? |
|---|---|---|
| MAUAD dá 10% no site oficial, inclusive em produto já em promoção | Dossiê, teste de 26/10 (Comfort Up R$ 170,91 → R$ 153,82) | [x] Sim, com a data |
| Soma com a progressiva "Black Friday antecipada" (12% acima de R$ 299; 15% acima de R$ 399; 20% acima de R$ 499) | Teste de 26/10 (linha "Flash Sale · 12% OFF acima de R$ 299") | [x] Sim, com a data. Campanha: dizer que pode mudar |
| Ordem: progressiva primeiro, 10% sobre o restante | Teste de 26/10 | [x] Sim |
| Total do teste R$ 285,78 (progressiva de R$ 43,28; MAUAD de R$ 31,75) | Dossiê | [ ] Só depois de reconferir no Chrome (divergência de R$ 0,02, pergunta 3) |
| Frete pelo CEP, por Sedex, Loggi ou Jadlog; despacho em até 3 dias úteis | Política de frete (dossiê) | [x] Sim |
| Troca e arrependimento em 30 dias corridos após o recebimento, pelo portal | Política de devolução (dossiê) | [x] Sim |
| Frete grátis na campanha | Dossiê, confiança média | [ ] Não neste artigo. Ver `black-friday-toda-up` |
| Um cupom por pedido | Não publicado | [ ] Não afirmar (pergunta 1) |
| Pix, boleto e app | Não testados | [ ] Não afirmar |
| Cupom de primeira compra (cadastro) | Rodapé | [ ] Nunca |
| Mercado Livre | — | [ ] Não citar |
| Nome "top up" | Autocompletar, outra marca | [ ] Nunca |

---

## 7. Links
- **Afiliado (`affiliate`):** `toda-up`. CTA para o `offerUrl` de `couponsData.ts`, sem edição: `https://todaup.com/discount/MAUAD?redirect=/collections/squad-toda-up&utm_campaign=fluxoinfluenciadoras&utm_content=mensagem1&utm_medium=influs&utm_source=influs&utm_term=comissao`. `rel="sponsored"`.
- **Código (`coupon`):** `MAUAD`, no bloco de cópia, sem explicação.
- **Página da loja:** `/cupons/toda-up` (resposta rápida, passo 1, fim).
- **Cluster:** `[[black-friday-toda-up]]`. Sem outros artigos da loja ainda.

---

## 8. Decisão multilíngue
Somente PT. Sem `translationKey`.

---

## 9. Esqueleto
1. **Resposta rápida:** o MAUAD dá 10% em todo o site oficial da Toda Up, inclusive em produto em promoção. Soma com a progressiva da campanha: no teste de 26/10, o carrinho de R$ 360,81 foi a R$ 285,78. Um cupom por pedido [pendente]. Frete pelo CEP. Link para `/cupons/toda-up`.
2. **O que o cupom faz:** 10% sobre o preço que já está com desconto; quando há progressiva, o 10% sai do que sobra.
3. **Passo a passo:**
   - 1. Entre pelo botão da parceria. O link leva ao site com o código já aplicado (conferir no Chrome).
   - 2. Monte o carrinho.
   - 3. No carrinho, confira a linha de desconto do MAUAD; se não aparecer, cole o código no campo de desconto e aplique [nome do campo: pendente].
   - 4. Confira o total antes de pagar.
4. **O teste de 26/10:** Comfort Up de R$ 199,90 por R$ 170,91 na promoção; com o código, R$ 153,82 (−R$ 17,09). Com o Comfort Line (R$ 189,90): carrinho de R$ 360,81; progressiva de 12%; 10% do código sobre o restante; total R$ 285,78.
5. **Três carrinhos (contas com preço do dia):**
   - A: Comfort Up sozinho, R$ 170,91 → R$ 153,82 (sem progressiva, abaixo de R$ 299).
   - B: Comfort Up + Comfort Line, R$ 360,81 → R$ 285,78 (teste).
   - C: três Comfort Up, R$ 512,73 → progressiva de 20% (R$ 102,55) → sobra R$ 410,18 → MAUAD R$ 41,02 → R$ 369,16. **É conta, não teste:** com três unidades do mesmo item, a loja pode ter outra regra. Confirmar antes de publicar.
6. **O que vale e o que não se sabe:** vale em produto em promoção (testado); soma com a progressiva (testado). Kits, Fita Up, brindes e um cupom por pedido: não publicados (pendente).
7. **Frete, despacho e troca:** pelo CEP; despacho em até 3 dias úteis depois do pagamento; troca e arrependimento em 30 dias pelo portal.
8. **Pix, boleto e app:** não testados. O texto não promete nada além do que aparecer no checkout.
9. **Perguntas frequentes:**
   - Toda Up tem cupom? MAUAD, 10% em todo o site oficial.
   - O cupom vale em produto em promoção? Sim, no teste de 26/10 em um sutiã em promoção.
   - O cupom soma com a promoção da Black Friday? Sim, no teste: a progressiva entra primeiro.
   - O cupom vale no Pix? [pendente]
   - Dá para usar mais de um cupom? [pendente]
   - Tem cupom de primeira compra? Esta página trata só do MAUAD; não há outro código aqui.
   - Posso trocar a compra? Sim, em até 30 dias depois do recebimento.

---

## 10. Pendentes de navegador (antes de publicar)
1. `products.json` deu 429 hoje; não tentar de novo por API. Chrome: confirmar sutiã Comfort Up (R$ 170,91) e Comfort Line (R$ 189,90) na página do produto.
2. Carrinho (sem identificação, sem finalizar): se o link aplica o MAUAD sozinho; nome e posição do campo de cupom; se aceita um código só; exceções de produto (kits, Fita Up, brindes).
3. Reconferir o total de R$ 285,78 (desconto observado de R$ 43,28; a conta simples dá R$ 43,30).
4. Print da sacola sem e com o código (se liberado).
5. Pix e boleto: só se a etapa aparecer sem dados pessoais.

---

## 11. Pontos de atenção na redação
- MAUAD sem explicação, sem negrito no corpo, sem título com o nome.
- "Teste pela API e no Chrome, sem finalizar." Nunca "compramos".
- Nenhum cupom de primeira compra, nenhum código da loja que não seja o MAUAD, nenhum "top up".
- Não citar Mercado Livre.
- Campanha: "enquanto a promoção durar, pode mudar" e a data do teste sempre no texto.

---

## Perguntas para o Bruno

1. **Um cupom por pedido e exceções (kits, Fita Up, brindes):** o artigo cita? Recomendação: não afirmar nada antes do Chrome; se o carrinho não mostrar a regra, o texto diz só "confira no carrinho".
2. **Validade no `couponsData.ts`:** o texto diz "Cupom ativo enquanto a parceria estiver vigente", que vai contra a regra "válido em <mês>" (`feedback_cupom_mes_vigente`). Recomendação: trocar para "válido em novembro de 2026" (ou outubro, conforme o mês de publicação) e rever em 26/11. Não editei o arquivo: é da sessão de cupons.

Fora das perguntas, já decidido pela regra: primeira compra não é respondida com código; a divergência de R$ 0,02 é reconferida no Chrome antes de publicar (seção 10).

## Decisões do Bruno (26/10/2026: "vamos seguir" com as recomendações)
1. Termos de uso e política de privacidade da loja ficam fora dos textos (os termos descrevem outro serviço; a privacidade diz que não usa terceiros, mas o site carrega GTM e WhatsApp de terceiro). Se quiser, o Bruno avisa a loja pela parceria.
2. Frete grátis: "a loja libera frete grátis em campanhas, como a Black Antecipada de outubro de 2026", sem prometer regra fixa.
3. Limite de um cupom por pedido e exceções não são publicados: o texto diz só "confira no carrinho".
4. Teste: publicar os números que o carrinho mostrou em 26/10, com a data (progressiva R$ 43,28; total R$ 285,78); não recalcular os centavos.
5. Preços pelas coleções públicas do menu (lidas no Chrome em 26/10; ver `fatos-2610.md`), nunca pelas cópias de canal do /products.json ("- Todalovers", "- Influ", "- Oferta Exclusiva"). Os 5 kits SkinUp e Comfort estão esgotados.
6. MAUAD sem explicação nem destaque; dizer sempre que é a Toda Up (o mesmo código é o da Let's Eat It e da Belive); nunca o cupom de primeira compra; Pix, boleto e app não testados.
