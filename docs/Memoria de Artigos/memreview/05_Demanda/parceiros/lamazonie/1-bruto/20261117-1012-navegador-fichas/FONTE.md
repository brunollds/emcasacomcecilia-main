# FONTE: 20261117-1012-navegador-fichas

| Campo | Valor |
|---|---|
| Coleta | `20261117-1012-navegador-fichas` |
| Início e fim | `2026-11-17T10:12:00-03:00` a `2026-11-17T10:15:30-03:00` (horas aproximadas: a ferramenta do navegador não registra o segundo de cada leitura) |
| Sessão responsável | Etapa 2 do piloto da L'Amazonie (Claude Fable 5.2) |
| Fonte | Loja oficial da L'Amazonie (Shopify) |
| Endereço ou relatório | `https://www.lamazonie.com.br/products/<handle>` de 6 produtos-base: `serum-fortalecedor-de-sobrancelhas`, `serum-facial-antioxidante-c20`, `protetor-solar-facial-stick`, `creme-clareador-intimo`, `creme-clareador-para-axilas` e `creme-clareador-para-virilha` |
| Método | Navegador embutido do aplicativo, sem login, uma página por vez, 5 segundos de intervalo. Em cada página, o trecho de JavaScript abaixo devolveu o texto de `<main>`, e a sessão gravou esse texto no arquivo |
| Propriedade ou loja | `www.lamazonie.com.br` |
| País, idioma, moeda | BR, pt-BR, BRL |
| Período dos dados | Estado das páginas no momento da leitura |
| Filtros | Nenhum |
| Paginação | 6 páginas abertas, 6 lidas |
| Cobertura | `parcial`: 6 fichas de produto-base, das 39 que a coleta por `curl` não obteve. Não foram lidas as fichas do bastão, do gel, dos kits, das ofertas `bf-` e dos e-books |

Trecho executado em cada página (nas duas últimas, a saída foi a comparação com a ficha do creme íntimo):

```js
const m = document.querySelector('main');
const c = m.cloneNode(true);
c.querySelectorAll('[class*=jdgm],script,style,noscript,svg,template').forEach((e) => e.remove());
let l = c.innerText.split('\n').map((s) => s.replace(/\s+/g, ' ').trim()).filter(Boolean);
const cut = l.findIndex((s) => /^complete o seu skincare$/i.test(s));
if (cut > 0) l = l.slice(0, cut);
l = l.filter((s, i, a) => !a.slice(Math.max(0, i - 5), i).includes(s));
return location.href + '\n' + l.join('\n');
```

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `ficha-creme-clareador-intimo.txt` | 4456 | `ff875d44655588ca6059e046ba6134b3f7dea73dc3a635c9d23e016cba5efbe7` | repositório |
| `ficha-creme-clareador-para-axilas-diferencas.txt` | 2690 | `7459c51ae118ba9efbdcf4663ffe8f8729e3abba8a8784f9aadf39654cc8d59c` | repositório |
| `ficha-creme-clareador-para-virilha-diferencas.txt` | 2627 | `50a58ef68cff1c18abe0fc6e6246c2504b2b46aed4d6ee23b2ec11077aafec7e` | repositório |
| `ficha-protetor-solar-facial-stick.txt` | 2674 | `ad5381789b55219b0b097aab67ac4aba35fa2033ac6a94164eb8fa349c6e460d` | repositório |
| `ficha-serum-facial-antioxidante-c20.txt` | 5928 | `0a59d1d8b425ec12412087b7887a7f913e1fcb1e316eb1803d4cba438b18dea7` | repositório |
| `ficha-serum-fortalecedor-de-sobrancelhas.txt` | 6146 | `c8f695c425b9f28a112a2cbf4ee7ee1d512dadf270ea462058a568dcbb9b424d` | repositório |

## Falhas e lacunas

- **Não é captura byte a byte.** O HTML não foi guardado. O texto veio pela saída da ferramenta do navegador e foi gravado pela sessão; não houve cópia automática para o disco (a página não deixa enviar dados para o computador local). Quem precisar de prova exata relê a página.
- O texto é menor que a página: saem as avaliações de clientes (nome e cidade de pessoas), tudo a partir de "complete o seu skincare" (vitrine de outros produtos) e toda linha igual a uma das cinco anteriores (selos e rótulos repetidos). Palavras de blocos vizinhos podem vir coladas ("comprar agoraEsgotado").
- `ficha-creme-clareador-para-axilas-diferencas.txt` e `ficha-creme-clareador-para-virilha-diferencas.txt` não são a ficha inteira: trazem só as linhas que existem nessas páginas e não existem na do creme íntimo. Os nomes dos quatro ativos são os mesmos nas três páginas (não aparecem na lista de diferenças).
- Esta leitura veio depois do HTTP 429 da coleta `20261117-1010-shopify-fichas`. Foi limitada a 6 páginas, com intervalo, e o navegador não recebeu bloqueio. As outras fichas ficaram sem leitura para não insistir na fonte.
- **Lista de ingredientes (INCI): a loja não publica** em nenhuma das 6 fichas. O que existe é "por dentro da fórmula", com os ativos em destaque. Volume ou peso também não aparece em nenhuma delas.

## Observações

- Percentuais declarados só no Sérum de Vitamina C20: 20% de Vitamina C Pura, 5% de Pantenol e 1% de Niacinamida (perguntas frequentes da ficha).
- As páginas de axilas e de virilha repetem os ativos do creme íntimo, e os três produtos usam os mesmos SKUs no feed (`CCEBOOK001` a `003`). A página de virilha tem trechos que falam de axilas ("Com as axilas previamente higienizadas").
- A ficha do sérum de sobrancelhas traz o que acompanha a compra: consultora pelo WhatsApp, 5 e-books, 15% de cashback e a Garantia Mais Fios.
- A palavra "Esgotado" aparece no botão das fichas lidas, enquanto o feed marca as variantes como disponíveis. O programa não trata de estoque; fica só o registro da divergência.
