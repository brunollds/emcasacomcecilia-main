---
titulo_provisorio: "Simple Organic é confiável? CNPJ, Hypera, site oficial, lojas e trocas"
seo_title: "Simple Organic é confiável? CNPJ, site oficial e trocas"
slug_sugerido: "simple-organic-e-confiavel"
parceiro: "[[Simple-Organic]]"
parceiro_slug: "simple-organic"
category: "confianca-reputacao"
reviewKind: "editorial"
type: "Editorial"
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

# Briefing: Simple Organic é confiável?

O primeiro dos quatro artigos de onboarding da Simple Organic. Modelo de forma: [[skelt-e-confiavel]] (beleza) e
[[toda-up-e-confiavel]].

## Busca (autocompletar de 03/11/2026)
"simple organic é confiável", "site simple organic é confiável", "simple organic cnpj", "simple organic é da hypera",
"simple organic site oficial", "simple organic loja física" (SP, Curitiba, Brasília). "Reclame aqui" vai para o artigo
irmão; "é boa" e os produtos ficam para a linha "é boa".

## Esqueleto
1. Resposta rápida: empresa ativa desde 2016 (CNPJ), marca de Florianópolis que é da Hypera Pharma, loja online com
   troca em 7 dias e lojas próprias. Sem preço.
2. De quem é a Simple Organic? A S.A. do CNPJ, a fundação em 2017 que a marca conta e a Hypera desde 2020 (frase da
   marca). Os números da compra (71,53% e o resto) só se confirmados no RI da Hypera; sem nomes do QSA.
3. Como saber se você está no site oficial: o domínio simpleorganic.com.br (registrado em 2017) e o CNPJ do rodapé
   igual ao do Reclame Aqui.
4. Lojas físicas e farmácias: as Lojas Simple pela página Onde encontrar e a busca de farmácias. Sem o código nelas.
5. Trocas e devolução: 7 dias corridos com o lacre inviolado; o pedido da loja física tem caminho próprio no FAQ.
6. Frete, prazo e pagamento: frete grátis a partir de R$ 99; despacho em 3 a 5 dias úteis; cartão em até 5x (parcela
   mínima de R$ 30) e Pix. Sem desconto no Pix.
7. E o Reclame Aqui? Um parágrafo (RA1000 nos 6 meses, atraso na entrega como o maior problema) e o link do artigo irmão.
8. Parceria e cupom (5%, com a ressalva do teste).
9. Vale a pena comprar no site? (o quadro "Leve se / Passe se", sem preço).
10. Perguntas frequentes: "é confiável?", "é da Hypera?", "tem loja física?", "qual é o site oficial?", "qual o CNPJ?".

## Claims
"Vegana", "cruelty-free", "carbono neutralizado" e "alto índice de naturalidade" são frases da marca, ditas como tal.
O selo e a certificação só com a página "Nossos selos e certificações" lida no Chrome; a leitura de 03/11 não a pegou.

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
