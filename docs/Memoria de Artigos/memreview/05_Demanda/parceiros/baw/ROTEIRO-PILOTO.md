# Roteiro do piloto: BAW Clothing

Segundo piloto do Programa de Demanda e o primeiro no fluxo v2 (`PROGRAMA.md`, seção 2; formatos na versão 2). Escrito
em 18/11/2026, antes das coletas. As perguntas e o escopo estão no `0-orientacao.md`; os briefs enviados, em
`briefs/`. Este roteiro fica como o plano: o que acontecer de fato vai para o `DIARIO.md` e para `relatos/`.

## 1. Sessões e ordem

| Ordem | Papel | Brief | Começa quando | Entrega |
|---|---|---|---|---|
| 1 | Catálogo (etapa 2) | `briefs/etapa-2.md` | GO do Bruno | `catalogo.csv`, `ids-catalogo.csv` |
| 1 | Dados (4A) | `briefs/etapa-4.md` | GO do Bruno, junto com o catálogo | `nossos-dados.csv`, `comercial.csv`, coleta de IA |
| 2 | Pesquisa (etapa 3) | `briefs/etapa-3.md` | catálogo na `main` | `sinais.csv`, `resumo-sinais.md` |
| 2 | Dados (4B), a mesma sessão do 4A | `briefs/etapa-4.md`, parte 4B | catálogo na `main` | `cobertura.csv` |
| 3 | Fechamento de insumos | coordenação | etapas 3 e 4 na `main` | seção no `DIARIO.md` |
| 4 | Análise (etapa 5) | `briefs/etapa-5.md` | insumos fechados | `matriz.csv`, `LEITURA.md` |
| 5 | Revisão, duas passadas | `briefs/revisao.md` | matriz na `main` | `REVISAO.md` |
| 6 | Integração | coordenação | veredito final | estados, `recomendacoes.md`, `decisoes.json` |

A rotina do site não roda nesta rodada: o snapshot de 17/11 é o mais recente e a próxima rodada é depois da Black
Friday. A BAW não tem dado nosso antes de 16/11.

## 2. Etapa 2: oferta (Wake)

| Ordem | Fonte | Método | Arquivo no bruto |
|---|---|---|---|
| 1 | `https://www.bawclothing.com.br/robots.txt` | `curl` | `robots.txt` |
| 2 | Sitemap indicado no `robots.txt` (ou `/sitemap.xml`) e os filhos | `curl`, um pedido a cada 3 a 5 segundos | `sitemap*.xml` |
| 3 | Páginas de categoria do menu (seção 1 da orientação) | `curl`; se vier vazio ou sem produtos no HTML, navegador | `categoria-<nome>.html` ou `.txt` |
| 4 | Fichas de produto, por amostra dirigida: até 10 por categoria de vestuário e calçado, escolhidas pela pergunta P2, mais as peças da vitrine da Black Friday | navegador embutido, a aba "Descrição" aberta, texto da página | `ficha-<slug>.txt` |
| 5 | Vitrine `/blackfriday/` | navegador, texto da página | `vitrine-blackfriday.txt` |

- Não se sabe se a Wake expõe feed público. Se houver API ou feed no `robots.txt` ou no sitemap, ele vem antes das
  páginas.
- O catálogo é o que a loja vende: entidades a partir do sitemap e das categorias. As fichas são amostra, para P2; a
  contagem de fichas com e sem medida, por categoria, vai para o relato e para o `notas` das entidades `categoria`.
- Modelagem (regular, oversized, BR Regular) separa entidades; cor não.
- Contagem de produtos serve à cobertura da coleta; não é número de estoque e não vai a texto publicado.

## 3. Etapa 3: interesse externo

Sementes, nesta ordem: as perguntas P1 a P7 da orientação; marca e categorias do catálogo com "baw" (moletom baw,
camiseta oversized baw, tênis baw, calça baw, baw kids); collabs, outlets e loja física; temas amplos sem a marca
(camiseta oversized masculina, moletom streetwear, marca streetwear brasileira).

| Fonte | O que guardar |
|---|---|
| Autocompletar | arquivo e cabeçalhos por consulta (comando do roteiro da L'Amazonie, seção 3) |
| Trends, Brasil | CSV do gráfico e das relacionadas; "dados insuficientes" é `@indisponivel` |
| Primeira página da busca | texto integral para toda consulta candidata a artigo; anúncios, visão de IA e "As pessoas também perguntam" em linhas próprias |
| YouTube | título, canal, data e visualizações dos primeiros resultados |
| Mercado Livre | a página da loja oficial, se abrir sem login; preço como `vitrine-marketplace` |
| Vitrine da Black Friday (P3) | lida até 25/11, com trecho literal de preços, datas e regulamento, se houver |

O Reclame Aqui e a imprensa não são recoletados (escopo enxuto em reputação).

## 4. Etapa 4: dados e cobertura

- **4A:** recorte da BAW no snapshot `_site/` de 17/11 (a expectativa é zero ou ausente; registrar como está) e das
  páginas de moda de outras parceiras como referência, com a ressalva em `qualidade`. Comercial `@indisponivel` (sem
  painel). Consulta manual de IA para P5: "a BAW é confiável?", "de quem é a BAW Clothing?", "cupom BAW", "cupom BAW
  primeira compra", em duas plataformas, no formato da seção 4 do `PROGRAMA.md`.
- **4B:** `/cupons/baw` e os seis artigos, com o estado conferido no site no dia, e as linhas da BAW na Fila. Cada
  linha ligada às entidades do catálogo.

## 5. Etapa 5 e revisão

Como nos modelos de brief. O `LEITURA.md` responde às sete perguntas da orientação, uma a uma, e diz o que o programa
trouxe a mais que a semente e o que perdeu.

## 6. O que medir (`DIARIO.md`)

Tempo por papel e da coordenação; espera e intervenções do Bruno; linhas devolvidas na primeira revisão; fatos da
semente perdidos; bloqueios; perguntas respondidas e decisões mudadas. A BAW tem catálogo maior e um dia a mais de casa
que a L'Amazonie: a comparação com o primeiro piloto é indicativa.
