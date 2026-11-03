---
titulo_provisorio: "Simple Organic no Reclame Aqui: nota, reputação e principais reclamações"
seo_title: "Simple Organic no Reclame Aqui: nota e reclamações"
slug_sugerido: "simple-organic-reclame-aqui-nota-reputacao"
parceiro: "[[Simple-Organic]]"
parceiro_slug: "simple-organic"
category: "confianca-reputacao"
reviewKind: "editorial"
type: "Análise de Reputação"
status: "pauta-aprovada"
responsavel: "-"
proxima_acao: "redacao"
bloqueado_por: "-"
data_criacao: "2026-11-03"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "simple-organic"
coupon: "S-EMCASACOMCECILIA"
---

# Briefing: Simple Organic no Reclame Aqui

Segundo artigo de onboarding. Modelo: [[toda-up-reclame-aqui-nota-reputacao]] e [[skelt-reclame-aqui-nota-reputacao]].

## Busca (autocompletar de 03/11/2026)
"simple organic reclame aqui", "niacinamida simple organic reclame aqui", "pdrn simple organic reclame aqui" e "retinol
like simple organic reclame aqui": parte das queixas é sobre o produto, não só sobre a entrega.

## Números (Chrome, 03/11/2026; ver a seção 5 dos fatos)
- **6 meses (01/05 a 31/10/2026):** RA1000, nota 8,6, 153 reclamações, 100% respondidas, 90,2% resolvidas, 76,8%
  voltariam, nota do consumidor 7,82 e resposta em 2 dias e 11 horas.
- **12 meses:** Ótima, nota 8,5, 385 reclamações, 88,2% resolvidas, 77,7% voltariam e nota 7,7.
- Verificada, 9 anos no site e 3º lugar em Melhor empresa da categoria E-commerce - Cosméticos, Beleza e Estética.
- Problemas: atraso na entrega, com 22,59%.

**No Job 2, no Chrome:** reler os números no dia (a data vai só na legenda da tabela; `bodyDatesReason:
"reclame-aqui"` se passar de 2 datas). Abrir as abas de 2025 e 2024. Ler 10 reclamações recentes para descrever os
tipos (atraso, reformulação de produto, troca) sem citar nome de consumidor nem copiar texto.

## Esqueleto
1. Resposta rápida (sem preço).
2. Qual perfil olhar: o "Simple Organic" verificado, com o CNPJ 24.692.452/0001-40 do rodapé.
3. Os números da Simple Organic (a tabela de 6 e 12 meses).
4. O que a conta entre as abas mostra (6 meses melhor que 12).
5. Do que as pessoas reclamam: entrega, produto reformulado e troca.
6. Como a loja responde (100% respondidas, o tempo de resposta).
7. Se o pedido der problema: os canais da loja, o caminho do FAQ, a loja física à parte e a troca em 7 dias.
8. Parceria e cupom.
9. Dá para confiar? (o quadro).
10. Perguntas frequentes.

Link para `simple-organic-e-confiavel`, e de volta.

## Regras do onboarding (valem para os quatro)
- **Fatos:** `simple-organic-fatos-0311.md` (nesta pasta) e o dossiê `01_Parceiros/Simple-Organic.md`. O que não
  está lá, o artigo não diz. Releia no site o que muda (preço, campanha, lista de lojas); se o site bloquear, pare e
  avise o Bruno (Chrome), sem contornar o bloqueio.
- **Cupom:** `S-EMCASACOMCECILIA`, 5% na loja online. Nos testes de 03/11 ele entrou em kit, em duo e em produto com
  preço de promoção, embora a regra geral de cupons da loja diga que não. O texto diz o que testamos e manda conferir o
  desconto no carrinho antes de pagar. O uso repetido não foi testado, então nada de "vale toda vez". O código não foi
  testado nas lojas físicas nem nas farmácias: é o código da loja online.
- **Link:** o da parceria (`offerUrl`, com a barra dupla, como veio) só funciona na home. Link de produto vai sem o
  cupom, e o texto manda copiar o código. Âncora "cupom Simple Organic" para `/cupons/simple-organic`.
- **Nunca** citar cupom de outra criadora nem de primeira compra, aniversário ou "20%" (estão no autocompletar e não
  são nossos).
- **Sem experiência inventada:** ninguém do site usou os produtos; o texto não diz como é a textura nem "a pele ficou".
- **Catraca:** resposta rápida de 2 a 3 frases sem preço, no máximo 2 datas no corpo, nenhuma em título de seção,
  legenda ou FAQ; `description` de até 180 caracteres.
- **Imagens:** capa pelo Job 6 (covers:render e a folha de aprovação do Bruno) e ao menos uma foto no corpo, só da
  marca, pelo fluxo do `docs/GUIA-MIDIA-EDITORIAL.md`.
- **PR:** `node scripts/content/build-index.mjs` e commitar os gerados que mudarem (o Gate 1 barra desde o #529);
  gates `validate:content`, `test:article-d2` e `typecheck`. Squash sem deploy.
