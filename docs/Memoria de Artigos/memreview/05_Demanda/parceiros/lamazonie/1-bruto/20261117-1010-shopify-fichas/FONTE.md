# FONTE: 20261117-1010-shopify-fichas

| Campo | Valor |
|---|---|
| Coleta | `20261117-1010-shopify-fichas` |
| Início e fim | `2026-11-17T10:10:33-03:00` a `2026-11-17T10:11:42-03:00` |
| Sessão responsável | Etapa 2 do piloto da L'Amazonie (Claude Fable 5.2) |
| Fonte | Loja oficial da L'Amazonie (Shopify) |
| Endereço ou relatório | `https://www.lamazonie.com.br/products/<handle>`, para os 42 produtos de `20261117-0958-shopify-feed/products-p1.json` |
| Método | `curl -s -A "Mozilla/5.0 (compatible; pesquisa-editorial)" <endereço> -o ficha-<handle>.html`, um pedido por vez, 1 segundo de intervalo, sem login nem cookie. Texto extraído com `node 2-processado/extrair-texto.cjs ficha-<handle>.html ficha-<handle>.txt` |
| Propriedade ou loja | `www.lamazonie.com.br` |
| País, idioma, moeda | BR, pt-BR, BRL |
| Período dos dados | Estado das páginas no momento da coleta |
| Filtros | Nenhum |
| Paginação | 42 fichas pedidas, 3 obtidas |
| Cobertura | `parcial`: 3 de 42 fichas. A fonte bloqueou (HTTP 429) |

## Arquivos

Os 3 HTML obtidos (2,0 MB no total) ficam na pasta de brutos pesados, `C:\Users\Bruno\Downloads\Emcasacomcecilia\demanda-brutos-pesados\lamazonie\20261117-1010-shopify-fichas\`. No repositório ficam o texto extraído e um exemplo da resposta de bloqueio.

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `ficha-bf-vitamina-c-dupla-brinde.txt` | 665 | `0fceb9b9642299a7d533241e947f1f00c19c4afcf293e4f6512ebb2c610e503b` | repositório |
| `ficha-kit-2-stick-multifuncional-cor-10.txt` | 3950 | `7f1288634f520185b61bacee6bbcda2d9127d6a2be2a1e9dd6b31be2bb9880c3` | repositório |
| `ficha-kit-serum-amazon-miracle-protetor-solar-de-tratamento.txt` | 5088 | `6e0eb4a27f1b7c210c7dfd9663d4f1a72a0492138fa5902c471c0ca536ee205a` | repositório |
| `resposta-429-exemplo.txt` | 18 | `fa2dd01ed96d38758e89e354653c39f366bc7a34e485772c8aa2174b53a465d3` | repositório |
| `ficha-bf-vitamina-c-dupla-brinde.html` | 421305 | `37fcd9c968814ef815470e43eab44441bf532ce42a7cf30d1da54de231858fcc` | brutos pesados |
| `ficha-kit-2-stick-multifuncional-cor-10.html` | 1054761 | `cead218b994097c722beab0cd85cfb7c6a3877ad010b529a79c465413b9ce03d` | brutos pesados |
| `ficha-kit-serum-amazon-miracle-protetor-solar-de-tratamento.html` | 531313 | `e4fba61ea904272b7aec214a131f5d89949fa2bdd9c5f9474c1a0710d1e2b1df` | brutos pesados |

## Falhas e lacunas

- **Bloqueio por limite de pedidos.** A loja respondeu HTTP 429 (`Content-Type: text/plain`, corpo `local_rate_limited`, 18 bytes) já no primeiro pedido desta coleta, às 10:10:33, depois de 60 pedidos em 3 minutos nas coletas anteriores. Das 42 fichas, só 3 vieram com HTTP 200: `bf-vitamina-c-dupla-brinde` (10:10:37), `kit-serum-amazon-miracle-protetor-solar-de-tratamento` (10:11:05) e `kit-2-stick-multifuncional-cor-10` (10:11:24).
- **Erro desta sessão.** O laço não parou no primeiro 429 e fez os 42 pedidos. A regra do programa é parar a fonte no primeiro bloqueio. A coleta por `curl` das fichas foi encerrada aí e não foi repetida. As 39 respostas de bloqueio, todas iguais, foram apagadas; uma ficou como `resposta-429-exemplo.txt`.
- As 39 fichas que faltam não provam nada sobre os produtos: todos estão no feed. Seis delas foram lidas depois pelo navegador embutido (`20261117-1012-navegador-fichas`).
- Os cabeçalhos das respostas não foram guardados (trazem cookies de sessão da Shopify).
- O `.txt` é derivado do HTML (texto de `<main>`), sem as avaliações de clientes, que trazem nome e cidade de pessoas (marca `[avaliações de clientes omitidas]`).
- Nenhuma das 3 fichas traz lista de ingredientes (INCI) nem volume ou peso. A seção "por dentro da fórmula" cita só os ativos em destaque.

## Observações

- A ficha tem blocos que o feed não traz: "por dentro da fórmula" (ativos em destaque), "passo a passo de uso", "diferenças" (comparação com "outras marcas") e "perguntas frequentes".
- `ficha-bf-vitamina-c-dupla-brinde.txt` mostra esses blocos vazios: a página da oferta não tem ficha própria.
- `ficha-kit-serum-amazon-miracle-protetor-solar-de-tratamento.txt` traz "FPS 99 e FPUVA 38,5" para o protetor, e `ficha-kit-2-stick-multifuncional-cor-10.txt`, "FPS 95 e FPUVA 40" para o bastão.
