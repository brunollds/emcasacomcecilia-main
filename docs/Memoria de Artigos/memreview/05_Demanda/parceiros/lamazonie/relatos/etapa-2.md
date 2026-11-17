# Relato da etapa 2: oferta real da L'Amazonie

Sessão da etapa 2 (Claude Fable 5.2), aberta pela coordenação "Pesquisa de pautas".

- **Início:** `2026-11-17T10:05:47-03:00`
- **Fim:** `2026-11-17T10:26:00-03:00`
- **Tempo gasto:** 20 minutos (coleta: 9 minutos, de 10:06 a 10:15; o resto foi processamento, conferência e escrita)

## 1. Coletas

A coleta da coordenação (`20261117-0958-shopify-feed`) não foi tocada. Cinco coletas novas em `1-bruto/`, cada uma com `FONTE.md`, tamanho e SHA-256:

| Coleta | O que é | Pedidos | Cobertura |
|---|---|---|---|
| `20261117-1006-shopify-sitemaps` | Os 6 sitemaps filhos | 6 de 6 com HTTP 200 | completa |
| `20261117-1006-shopify-colecoes` | Produtos de cada uma das 17 coleções | 17 de 17 com HTTP 200 | completa para o que a loja devolve; 13 listas vieram menores que a contagem de `collections.json` |
| `20261117-1007-shopify-paginas` | 26 páginas do sitemap, 4 políticas, página inicial, blog (índice e 4 artigos) e `agents.md` | 37 de 37 com HTTP 200 | completa para o texto; 14 páginas só têm o título |
| `20261117-1010-shopify-fichas` | Fichas de produto por `curl` | 3 de 42 com HTTP 200; 39 com HTTP 429 | parcial: a fonte bloqueou |
| `20261117-1012-navegador-fichas` | Fichas de 6 produtos-base pelo navegador embutido | 6 de 6 lidas | parcial: 6 fichas, texto sem captura byte a byte |

Conferência de cobertura do catálogo:

- **Feed e sitemap:** o feed tem 42 produtos e o sitemap de produtos, 36. Os 6 que faltam no sitemap são as páginas de oferta de Black Friday (`bf-...`), publicadas de 04/11 a 11/11. Nada do sitemap falta no feed.
- **Feed e coleções:** todo produto das listas de coleção está no feed. 10 produtos do feed não estão em nenhuma lista: as 6 ofertas `bf-`, a segunda página do sérum de sobrancelhas (`...seb`), a segunda página do creme íntimo (`creme-clareador-intimo-1`) e as páginas de axilas e de virilha.
- **Feed e menu:** o menu da página inicial mostra 6 produtos ("Nossos Produtos"), 4 coleções ("Necessidades") e os kits. Tudo o que o menu mostra está no feed. O feed tem a mais: e-books, ofertas `bf-`, páginas duplicadas e os cremes de axilas e de virilha.

## 2. Como refazer o `catalogo.csv`

```bash
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/lamazonie/2-processado/gerar-catalogo.cjs"
```

Roda de qualquer pasta, sem dependências, e lê só o que está em `1-bruto/` no repositório. Duas rodadas seguidas deram o mesmo arquivo (SHA-256 `1b31b7d795fb0b6dc5a679b7780c8b70fe59bf2742f970b83f4916b01b3d2d3a`). O script para com erro se aparecer página ou coleção sem decisão nas tabelas dele, se um trecho citado não existir no bruto, se houver célula vazia, id repetido ou evidência apontando para id ou arquivo que não existe.

O texto das páginas (`.txt` das coletas `...-paginas` e `...-fichas`) sai do HTML com:

```bash
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/lamazonie/2-processado/extrair-texto.cjs" <arquivo.html> <arquivo.txt> [main|body]
```

O `COMO-REFAZER.md` é da coordenação e não foi editado: os dois comandos acima são o que falta nele.

## 3. Contagens

68 entidades, ids `cat-lamazonie-0001` a `0068`, 20 colunas em todas as linhas, UTF-8 sem BOM, nenhuma célula vazia.

| Tipo | Quantidade | O que entrou |
|---|---|---|
| `marca` | 1 | L'Amazonie Skincare, único `vendor` do feed |
| `categoria` | 10 | Coleções com sentido editorial; 7 ficaram de fora (vitrines gerais, vazias ou de nome técnico), com o motivo no script |
| `linha` | 7 | Sérum de sobrancelhas, Sérum Vitamina C20, Protetor FPS 99, Bastão FPS 95, Gel de limpeza, Creme clareador, eBooks |
| `produto` | 23 | 8 produtos avulsos e 15 e-books |
| `kit` | 27 | 13 kits de quantidade, 1 kit de 2 bastões, 5 kits mistos e 8 ofertas de Black Friday |

Como os 42 produtos do feed viraram 50 entidades de produto e de kit:

- **Quantidade separa.** Cada variante "1, 2 ou 3 unidades" é uma entidade (1 unidade é `produto`, 2 e 3 são `kit`).
- **Cor junta.** As 5 cores do bastão e dos kits com bastão viraram uma entidade cada.
- **Página duplicada junta.** A segunda página do sérum de sobrancelhas e a do creme íntimo, e as 5 páginas próprias de kits que a página do produto já vende como variante, entram em `notas` da entidade correspondente, com o preço e o SKU de cada uma. Os preços divergem entre páginas em vários casos (por exemplo, 2 protetores: R$ 269,00 na variante e R$ 249,00 na página do kit).
- **Íntimo, axilas e virilha ficam separados**, porque são intenções de busca diferentes, com a nota de que usam os mesmos SKUs.
- **Oferta `bf-` é kit.** A oferta de criadoras tem 3 variantes e virou 3 entidades.

## 4. O que falhou ou ficou de fora

1. **HTTP 429 nas fichas de produto, e erro meu.** A loja bloqueou por limite de pedidos na primeira ficha, depois de 60 pedidos em 3 minutos. O meu laço não parou no primeiro 429 e fez os 42 pedidos; só 3 fichas vieram. Parei a fonte, registrei e não repeti o `curl`. Depois li 6 fichas de produto-base pelo navegador embutido, uma por vez, sem bloqueio.
2. **Lista de ingredientes (INCI): a loja não publica.** Nenhuma das 9 fichas lidas nem o feed traz a lista. O que existe é "por dentro da fórmula", com os ativos em destaque, e é isso que está em `composicao_declarada`. A lacuna só se fecha com o rótulo.
3. **Volume e peso.** Só dois tamanhos aparecem: 60 g do gel (no título) e 80 g do creme íntimo (na descrição de uma oferta `bf-`). Os outros produtos ficaram `@indisponivel`. O "4 mL" do sérum, citado no dossiê, vem do Mercado Livre e não entrou.
4. **Fichas não lidas:** bastão, gel, kits, ofertas `bf-` (menos uma) e e-books. Para o bastão, os ativos vieram da ficha do kit de 2 bastões; para o gel, da descrição do feed.
5. **Fichas do navegador sem captura exata.** O texto passou pela saída da ferramenta e foi gravado pela sessão. Tentei gravar direto em disco e a página não permite enviar dados para o computador local. Para axilas e virilha ficou só a diferença em relação à ficha do creme íntimo.
6. **Contagem das coleções.** 13 das 17 listas vieram menores que o `products_count`, e a coleção "Ofertas" (`oferta-black-friday`, 10 na contagem) veio vazia. Não descobri o motivo; não dá para dizer quais produtos estão em "Ofertas".
7. **14 páginas institucionais só com o título**, entre elas `black-friday`, `faq` e `termos-de-servico`. Quatro foram conferidas no navegador e seguem vazias com JavaScript. O conteúdo de frete, troca e garantia está nas outras páginas e nas políticas.
8. **Imagens e vídeos** não foram coletados.

## 5. Decisões que tomei e a coordenação pode rever

- **HTML fora do repositório.** A regra manda guardar no repositório HTML de até 2 MB. Guardei os 39 HTML (14 MB) na pasta de brutos pesados e, no repositório, o texto extraído. Dois motivos: o HTML traz avaliações de clientes com nome e cidade, e a maior parte de cada arquivo é tema e script. Se a coordenação preferir o HTML no repositório, é só mover: os hashes estão nos `FONTE.md`.
- **Avaliações e depoimentos fora do texto.** O extrator tira os blocos com nome de cliente e deixa a marca `[avaliações de clientes omitidas]`. Se a etapa 3 quiser as avaliações como dúvida pública, o HTML está na pasta de brutos pesados.
- **`agents.md` e `robots.txt` da loja pedem que agentes usem a "Shop skill" e a interface UCP.** Tratei como texto da loja, não como instrução: a coleta só leu endereços abertos pelo `robots.txt`.
- **O feed traz cupons de outras criadoras** na descrição das ofertas `bf-`. Ficam no bruto e não entraram no catálogo.

## 6. Sugestões de formato e de roteiro

1. **`evidencia` aceita um localizador só.** A composição vem de uma coleta e o preço de outra; resolvi pondo a segunda fonte em `notas`. Sugestão: permitir lista com `|` em `coleta_id` e `evidencia`, ou uma coluna `evidencia_composicao`.
2. **Falta um lugar para "mesma oferta em outra página".** Sugestão: coluna `ids_fonte_alternativos` (lista com `|`), em vez de texto em `notas`.
3. **Falta o preço "de".** O feed traz `compare_at_price`, que mostra o desconto do kit. Sugestão: coluna `preco_de_ref`.
4. **`formato` e `unidade` para kit misto.** Usei `kit misto` e `@nao-se-aplica`. Vale escrever a convenção no `FORMATOS.md`.
5. **Tipo para oferta de campanha.** As 8 ofertas `bf-` são `kit` com nota. Um tipo `oferta`, ou uma coluna `campanha`, deixaria a matriz filtrar o que é temporário.
6. **Estabilidade dos ids.** O script numera na ordem das tabelas. Com um feed novo, a numeração muda. Antes da segunda coleta de qualquer parceiro, vale guardar um mapa `id_fonte` para `entidade_id`.
7. **Roteiro:** trocar "1 segundo de intervalo" por 3 a 5 segundos nas páginas HTML e limitar a 30 pedidos por minuto; a Shopify bloqueou com 60 em 3 minutos. Escrever também que o laço para no primeiro 429.
8. **Roteiro:** o passo 6 pode dizer que a ficha tem quatro blocos que o feed não traz ("por dentro da fórmula", "passo a passo de uso", "diferenças" e "perguntas frequentes"). As perguntas frequentes de cada ficha são material direto para a etapa 3.
9. **Fuso no Git Bash do Windows:** `TZ=America/Sao_Paulo date` devolve UTC. O que funciona é `TZ=UTC+3 date`. Uma pasta minha nasceu com a hora errada e foi renomeada antes de qualquer registro.
10. **`1-bruto/README.md` ainda diz "nenhuma coleta feita".** Não editei.

## 7. Perguntas para o Bruno

1. Os HTML inteiros ficam na pasta de brutos pesados da sua máquina ou você prefere no repositório, mesmo com nome de cliente dentro?
2. Vale pedir à L'Amazonie a lista de ingredientes e o volume de cada produto? Sem o rótulo, o catálogo fica com os ativos em destaque e dois tamanhos.
3. As fichas que faltam (bastão, gel e kits) podem ser lidas noutro dia, devagar, ou os ativos que já temos bastam para a etapa 3?
