---
titulo_provisorio: "Insider vale a pena? O que a marca entrega, quanto custa e para quem compensa"
seo_title: "Insider vale a pena? Camisetas, cuecas, linha feminina e o cupom"
slug_sugerido: "insider-vale-a-pena"
parceiro: "[[Insider]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Marca"
status: "pauta-aprovada"
responsavel: "-"
proxima_acao: "redacao"
bloqueado_por: "-"
data_criacao: "2026-11-02"
pauta: "Reforma do id 362 (decisão do Bruno, 02/11/2026): primeiro artigo do modelo \"<Marca> é boa? Vale a pena?\""
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
---

# Briefing de reforma: Insider vale a pena?

## Por que reformar
O `insider-vale-a-pena` (id 362, no ar desde 12/10) virou um comparativo: das 13 seções, 6 comparam a Insider com Minimal Club, Mirante, Alpha Co, Basicamente e Hering, com uma tabela das seis marcas, e o título é de comparativo. A busca "Insider vale a pena" pede outra coisa: o que a marca entrega, quanto custa de verdade e para quem compensa. Decisão do Bruno (02/11/2026): **mesmo slug, mesma URL**, o texto vira o artigo da marca, no modelo "<Marca> é boa? Vale a pena?" que vai servir às outras parceiras. A comparação sai daqui e vira a série "Insider ou X" (`insider-ou-x-serie-0211.md`, nesta pasta), que reaproveita o texto atual.

## Buscas (Google Trends, Brasil, 02/11/2025 a 02/11/2026; arquivos do Bruno)
- O que mais se busca junto com "insider": "insider store", "camiseta insider", "camisa insider", "loja insider", "cupom insider", "insider feminina", "calça insider", "cueca insider", "blusa insider", "polo insider", "saia insider", "regata insider", "site insider", "insider mercado livre", "tech t shirt".
- Em alta: "perfect top insider", "daily t-shirt insider", "regata insider feminina", "blusa insider masculina".
- Concorrentes que aparecem: "minimal" e "minimal club", "hering", "mirante" e "aramis" (em alta). Ficam para a série.

Leitura: quem pesquisa a Insider quer saber o que comprar dela (camiseta, cueca, linha feminina, calça, polo, regata), onde comprar (site, loja física, Mercado Livre) e se o preço compensa. O artigo responde isso para a marca inteira.

## O que fica, o que sai e o que entra
**Fica, revisado:**
- "Tech T-Shirt: o que a Insider publica" (tecido, gramatura, garantia de 2 anos contra desbotamento, cuidados, antiodor sem duração informada), encurtado: a Tech é o carro-chefe, não o artigo inteiro.
- "Troca e devolução na Insider" (7 dias úteis, 21 dias corridos, 180 dias para defeito, grátis).
- "Quanto custa de verdade" (o cupom EMCASACOMCECILIA, 15% na loja online, a conta da Tech T-Shirt, Pix, frete), com os preços relidos.
- O quadro "Leve se / Passe se", reescrito sem concorrente.

**Sai (vai para a série):** a tabela das seis marcas, "Insider ou Minimal Club", "Insider, Mirante ou Basicamente", "Insider ou Hering, e onde entra a Alpha Co", as frases de concorrente em "Como comparamos", em "Para quem vale" e no FAQ. O texto atual fica no histórico do Git (`git show 0fa63041:content/reviews/insider-vale-a-pena.json`) para a série.

**Sai (já tem artigo próprio):** "Tech, Daily ou Core" vira uma frase com link para `camiseta-insider-qual-escolher`; a tabela das cuecas vira um parágrafo com link para `cueca-insider-comfort-ou-performance`.

**Entra:**
- **O que a Insider vende:** as linhas masculina e feminina numa visão só (camisetas Tech, Core e Daily; camisas e polos; cuecas; linha feminina com The Perfect Top, leggings, saias e vestidos; calças), com link para o guia de cada uma. Sem preço de cada peça: os preços ficam no capítulo do custo.
- **Onde comprar:** site (com o cupom), Concept Store no MorumbiShopping (cupom não vale lá, troca no mesmo canal) e Mercado Livre (o cupom não vale; link para `insider-mercado-livre-ou-site`). Outlet e kits em uma frase cada, com link.
- **É confiável:** um parágrafo com o resumo de `insider-store-e-confiavel` e `insider-store-reclame-aqui-nota-reputacao`, com link para os dois. Sem repetir números que estão lá.
- **A série:** no fim, um parágrafo curto: "Comparando com outra marca?", com os links da série quando ela sair (até lá, sem link e sem nome de concorrente).

## Estrutura sugerida
1. Resposta rápida (2 a 3 frases, sem preço): vale para quem quer camiseta de modal com garantia de cor por escrito e troca longa, e topa pagar mais; o cupom reduz a diferença.
2. O que a Insider vende
3. Tech T-Shirt: o que a marca promete e o que garante por escrito
4. Quanto custa de verdade (com o cupom, o Pix e o frete)
5. Onde comprar: site, loja física ou Mercado Livre
6. Troca, devolução e garantia
7. A Insider é confiável?
8. Para quem vale e para quem não vale (quadro)
9. Perguntas frequentes (sem concorrente)

## Fatos e fontes
Use a ficha `01_Parceiros/Insider.md` e o artigo atual. **Preços a reler:** os da ficha são de 09/10 e 12/10. Releia no navegador (o `insiderstore.com.br` não aceita curl) os preços da Tech T-Shirt, da Core, da Daily, da cueca Comfort e de um kit, e o frete grátis. A Black Friday está perto: preço de campanha não entra no texto; o artigo da Black Friday já cobre.

## Regras
- Nenhum concorrente no corpo, no FAQ, no quadro nem no título. A palavra "comparação" sai do `seoTitle`.
- O cupom é EMCASACOMCECILIA, 15% na loja online, não vale nas lojas físicas nem no Mercado Livre, um por pedido; pode não entrar nos primeiros dias de um lançamento.
- "Antiodor" e "desamassa" são promessas da marca, ditas como tal; a garantia por escrito é só a de desbotamento.
- O "eu levaria" do texto atual sai junto com a comparação, ou é reescrito sem concorrente se a frase continuar fazendo sentido.
- Catraca: resposta rápida sem preço, no máximo 2 datas no corpo, sem data em título de seção, legenda ou FAQ.
- `publishedAt` não muda (é reforma); o `dateModified` sai do build.
- A capa atual (Tech T-Shirt) pode ficar.

## Depois
Os comparativos que saem daqui viram a série "Insider ou X", com ordem pelas buscas, depois desta reforma.
