---
titulo_provisorio: "Kits da Toda Up: quando compensam (conta por peça)"
seo_title: "Kits Toda Up: quando compensam (conta por peça)"
slug_sugerido: "kit-toda-up-quando-compensa"
parceiro: "[[Toda Up]]"
pauta_id: "T10"
affiliate: "toda-up"
coupon: "MAUAD"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Compra"
status: "pauta-aprovada"
responsavel: "Claude"
proxima_acao: "redacao"
bloqueado_por: null
score_autoridade: 55
score_conversao: 65
score_ponderado_total: 60
data_criacao: "2026-10-31"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
---

# Briefing de Pauta: Kits da Toda Up: quando compensam (conta por peça)

Leitura de 31/10/2026: `todaup-products.json` (products.json da Toda Up, na pasta da rodada). Sem navegador, sem login, sem carrinho e sem clique em link de afiliado. Ninguém do site usou os kits: o texto é de preço, ficha e estoque.

Fila T10 ("Kits da Toda Up: top + calcinha"), que estava em Estoque porque os kits estavam esgotados em 26/10. Em 31/10 há kits disponíveis, mas os quatro kits SkinUp do cadastro principal estão com 0 de 1 disponível.

## Sobreposição (ler antes de escrever)

- `cupom-toda-up-como-usar` (T3, seção "Kits e o que não testamos"): já diz que o MAUAD somou com os kits Leve 2 e Leve 3 no teste de 26/10. Esta pauta linka a T3 e não repete o teste.
- `black-friday-toda-up` (T4): tabela com o kit Cotton Up a R$ 170,82 (de R$ 189,80), leitura de 26/10. Na leitura de 31/10, o cadastro principal do mesmo kit está em R$ 155,52 (de R$ 172,80). R$ 170,82 e R$ 409,90 são os preços dos cadastros `-cliente`, `-vip`, `-aniver` e AQUISIÇÃO. Conferir se o artigo da T4 precisa de atualização.
- `sutia-toda-up-qual-escolher` (T8): modelos Comfort, sem kit. Linkar.
- `sutia-de-silicone-invisivel-como-usar` (T5): o kit Invisible Up é o sutiã de silicone com o protetor. Linkar e não repetir o "como usar".
- `fita-up-como-usar` (T7) e `protetor-de-silicone-mamilo-como-usar`: o protetor aparece só como peça do kit.

## Demanda

Nenhum termo com "kit" nos autocompletes da Toda Up (`cupom-toda-up-como-usar-autocomplete-2610.txt` e `toda-up-e-confiavel-autocomplete-2610.txt`). Não há export de GSC ou Bing com termo de kit no vault. A pauta é de decisão de compra, mas a busca não foi medida: por isso a nota de demanda é baixa.

## 1. Portões

- [x] 1. Evidência: preço, estoque e composição vêm do `products.json` de 31/10. Composição do Kit Comfort Up pendente (ver Perguntas, item 3).
- [x] 2. Segurança: sem alegação de saúde. O protetor de silicone entra como peça, sem uso médico.
- [x] 3. Experiência: sem uso. Só ficha, preço e estoque.
- [x] 4. Anti-canibalização: a intenção "vale a pena o kit" não está em `/cupons/toda-up` nem nas T1, T3, T4, T5 e T8.
- [x] 5. Classe: `guias-praticos-utilidade`, por decisão de compra.
- [x] 6. Fontes: products.json de 31/10 e dossiê (cupom de 26/10, com regras).
- [x] 7. i18n: `somente-pt`.

## 2. Função da Pauta

- **Trabalho principal:** Visita/Decisão (tabela por kit e variante, com disponibilidade).
- **Resiste à compressão por IA?** Sim: a resposta depende de estoque, tamanho e preço do dia.
- **O que exige a visita:** a lista de kits com o preço de cada um e o aviso de quais estão esgotados.
- **Como o cupom chega ao leitor:** link para `/cupons/toda-up` e um aviso de que o cupom deve ser conferido no carrinho. Sem promessa de soma com kit de produto (ver seção "Cupom").
- **Atualiza ou cria:** cria artigo novo.
- **URL mais próxima:** `/cupons/toda-up`, sem canibalizar: a página de cupom fala da loja, não da conta por kit.

## 3. Dor do Consumidor

- **Pergunta do leitor:** se o kit sai mais barato do que comprar as peças separadas, e em qual kit vale a pena.
- **O que a marca responde:** preço de cada kit e a frase "Cupons não acumulam com o kit: vale sempre o maior desconto, salvo cupons de influenciadoras" (dossiê, seção 3). A página não compara com as peças avulsas.
- **Por que a resposta oficial falha:** cada kit tem uma variante por tamanho, cor e quantidade (1 ou 3 conjuntos). A conta por peça exige cruzar as variantes com o catálogo.
- **Valor exclusivo:** conta por kit com o preço de 31/10, avulso contra kit, e o aviso dos kits esgotados.

## 4. Pontuação

| Critério | Peso | Nota | Justificativa |
|---|---|---|---|
| 1. Dor / dúvida real | 25 | 18 | Decisão de compra clara ("compensa"), mas sem sinal de busca |
| 2. Evidência de demanda | 20 | 3 | Nenhum termo de kit nos autocompletes nem nos exports do vault |
| 3. Valor exclusivo | 20 | 16 | Conta por peça com preço de hoje, que nenhuma página da loja faz |
| 4. Necessidade de visita | 15 | 10 | Variantes, tamanhos e estoque por kit |
| 5. Cluster e links | 10 | 8 | Liga T3, T4, T5, T8 e a página de cupom |
| 6. Viabilidade e manutenção | 10 | 5 | Estoque muda em dias; precisa reler antes de publicar |
| **TOTAL** | **100** | **60** | |

- **Score A (Autoridade):** 55/100
- **Score B (Visita e Conversão):** 65/100

## 5. Mídia e Card de Estilo

- **Imagem principal:** foto do kit da própria loja (ex.: `Kit_Comfort_Capa_TodaUp.jpg`, `Kit_Top_Cos_Alto_Skin_Up_-_Capa_-_Toda_Up.jpg`, `Cotton_Faixa_Calcinha_0111.jpg`). Licença e uso a confirmar pelo `GUIA-MIDIA-EDITORIAL.md`.
- **Fotos com link de afiliado:** cada foto de kit leva `href` com o link de parceria (ver Links). `alt` descreve o kit (ex.: "Kit Top Faixa e Calcinha Biquíni Cotton Up, branco").
- **Card de estilo (roupa íntima, sem combina com):** como a roupa íntima não tem combinação útil, cada peça leva só "Como usar" e "Ocasião" (Job 1, seção 1). Protetor de silicone é acessório: sem card.
  - Seção Kit Top e Calcinha SkinUp (Cós Alto e Biquíni), layout `tabs`:
    - Top Segunda Pele SkinUp: como usar "por baixo de blusa de malha ou camisa de tecido fino, onde a alça ou a costura apareceria" (texto a confirmar); ocasião "dia a dia e roupa de trabalho".
    - Calcinha Cós Alto SkinUp (ou Biquíni, conforme o kit): como usar "por baixo de calça de cintura alta ou de vestido"; ocasião "dia a dia".
  - Seção Kit Top Faixa ou Triangular + Calcinha Biquíni Cotton Up, layout `tabs`:
    - Top Faixa ou Triangular: como usar e ocasião conforme o decote. [CONFERIR NA FICHA: a loja não descreve o uso de cada modelo.]
    - Calcinha Biquíni Cotton Up: como usar "por baixo de calça ou saia do dia a dia".
  - Seção Kit Sutiã Comfort Up + Protetor e Kit Sutiã Comfort Slim + Protetor, layout `tabs`, uma peça cada:
    - Sutiã Comfort Up (ou Slim): como usar e ocasião, sem repetir a ficha. Link: o do sutiã avulso.
  - Kit Invisible Up: sem card (a T5 cobre o uso do sutiã de silicone).
  - Kit Comfort Up: card só depois de confirmar a composição (Perguntas, item 3).
- **Vídeo:** nenhum.

## 6. Matriz de Claims

| Afirmação planejada | Tipo | Fonte | Data | Pode publicar? |
|---|---|---|---|---|
| Preço do kit e das avulsas | dado de vitrine | products.json | 31/10/2026 | Sim, com a data |
| Economia do kit contra a soma das avulsas de hoje (R$ e %) | conta | products.json de 31/10 | 31/10/2026 | Sim, com a conta escrita |
| Kits SkinUp do cadastro principal esgotados (0 de 1) | estoque | products.json | 31/10/2026 | Sim, com a data |
| "Sustentação natural e leve", "corte a laser", "acabamento ultrafino" | ficha da loja | body do produto | 31/10/2026 | Sim, atribuído à loja |
| MAUAD soma com kit de produto | não testado (o teste de 26/10 foi nos Leve 2 e Leve 3) | dossiê, seção 1 | — | Não |
| MAUAD soma com a promoção progressiva em kit | não testado | — | — | Não |
| "testamos", "usei", "a Cecília usa" | experiência | — | — | Não |

## 7. Links

- **Afiliado:** `affiliate: "toda-up"`. Link da marca: `https://todaup.com/discount/MAUAD?redirect=/collections/squad-toda-up&utm_campaign=fluxoinfluenciadoras&utm_content=mensagem1&utm_medium=influs&utm_source=influs&utm_term=comissao`, exatamente como veio (dossiê). Ver Perguntas, item 4.
- **Cupom:** `MAUAD`, 10% em todo o site. Sem destaque. Nunca o cupom de primeira compra.
- **Links internos (máx. 3 para a loja):** `/cupons/toda-up`, `/reviews/cupom-toda-up-como-usar`, `/reviews/sutia-toda-up-qual-escolher`. Também `/reviews/sutia-de-silicone-invisivel-como-usar` no kit Invisible Up.

## 8. Esqueleto

1. **Resposta curta:** o kit de 3 conjuntos e os kits de sutiã com protetor (Comfort Up e Slim) economizam mais de R$ 50. O kit de 1 conjunto quase não economiza. O Kit Comfort Up custa mais que as peças (salvo se forem 3 peças).
2. **Como a conta é feita:** preço de 31/10, avulso de hoje contra kit de hoje, sem cupom, sem o "de" riscado.
3. **Tabela dos kits disponíveis:** cada kit com cadastro, peças, preço, soma avulsa, economia e leitura.
4. **Kits de top e calcinha SkinUp:** esgotados no cadastro principal; conta com o cadastro sem tipo (conferir Perguntas, itens 1 e 2).
5. **Kits Cotton Up:** o que economiza e o que quase não economiza.
6. **Kits de sutiã com protetor e o Invisible Up.**
7. **Kit Comfort Up:** custa mais que as peças (ou economiza, se forem 3 peças).
8. **Cupom no kit:** o que foi testado (Leve 2 e Leve 3) e o que não foi.
9. **Como escolher:** lista curta por perfil, com o link do kit de cada linha.

## Lista de produtos citados

Preços de 31/10/2026, do `products.json`. URL relativa com `/products/`.

| Produto | Preço do dia | Preço riscado | Data | URL relativa |
|---|---|---|---|---|
| Kit Top e Calcinha Cós Alto Segunda Pele Skin Up (sem tipo, disponível) | R$ 199,90 (1 conjunto); R$ 499,90 (3) | R$ 239,80; R$ 719,40 | 31/10/2026 | `/products/kit-top-e-calcinha-cos-alto-segunda-pele-skin-up` |
| Kit Top e Calcinha Biquíni Segunda Pele Skin Up (sem tipo, disponível) | R$ 199,90 (1); R$ 499,90 (3) | R$ 239,80; R$ 719,40 | 31/10/2026 | `/products/kit-top-e-calcinha-biquini-segunda-pele-skin-up` |
| Kit Top e Calcinha Cós Alto SkinUp (principal, 0 de 1) | R$ 195,36 | R$ 239,80 | 31/10/2026 | `/products/kit-top-e-calcinha-cos-alto-segunda-pele-skin-up-1` |
| Kit Top e Calcinha Biquíni SkinUp (principal, 0 de 1) | R$ 195,36 | R$ 239,80 | 31/10/2026 | `/products/kit-top-e-calcinha-biquini-segunda-pele-skin-up-2` |
| Kit Comfort Up e Calcinha Biquíni SkinUp (principal, 0 de 1) | R$ 205,53 | R$ 259,80 | 31/10/2026 | `/products/kit-comfort-up-e-calcinha-biquini-segunda-pele-skin-up` |
| Kit Comfort Line e Calcinha Cós Alto SkinUp (principal, 0 de 1) | R$ 209,90 | R$ 239,80 | 31/10/2026 | `/products/kit-comfort-line-e-calcinha-cos-alto-segunda-pele-skin-up` |
| Kit Comfort Slim e Calcinha Biquíni SkinUp (principal, 0 de 1) | R$ 209,90 | R$ 239,80 | 31/10/2026 | `/products/kit-comfort-slim-e-calcinha-biquini-segunda-pele-skin-up` |
| Kit Top Faixa e Calcinha Biquíni Cotton Up (principal) | R$ 155,52 (1); R$ 373,18 (3) | R$ 172,80; R$ 518,40 | 31/10/2026 | `/products/kit-top-faixa-e-calcinha-biquini-cotton-up` |
| Kit Top Triangular e Calcinha Biquíni Cotton Up (principal) | R$ 155,52 (1); R$ 373,18 (3) | R$ 172,80; R$ 518,40 | 31/10/2026 | `/products/kit-top-triangular-e-calcinha-biquini-cotton-up` |
| Kit Sutiã Comfort Up + Protetor de Silicone | R$ 190,90 | R$ 269,80 | 31/10/2026 | `/products/kit-sutia-comfort-up-protetor-de-silicone` |
| Kit Sutiã Comfort Slim + Protetor de Silicone | R$ 202,35 | R$ 269,80 | 31/10/2026 | `/products/kit-sutia-comfort-slim-protetor-de-silicone` |
| Kit Invisible Up (sutiã de silicone invisível + protetor) | R$ 195,79 | R$ 279,70 | 31/10/2026 | `/products/kit-invisible` |
| Kit Comfort Up (Up ou Slim + Comfort Line, a confirmar) | R$ 398,79 | R$ 569,70 | 31/10/2026 | `/products/kit-comfort` |
| Sutiã Comfort Up | R$ 189,90 | R$ 199,90 | 31/10/2026 | `/products/sutia-comfort-up` |
| Sutiã Comfort Line | R$ 189,90 | R$ 199,90 | 31/10/2026 | `/products/sutia-comfort-line` |
| Sutiã Comfort Slim | R$ 189,90 | R$ 199,90 | 31/10/2026 | `/products/sutia-comfort-slim` |
| Top Segunda Pele SkinUp | R$ 169,90 | R$ 179,90 | 31/10/2026 | `/products/top-segunda-pele-skin-up` |
| Top Alça Fina Segunda Pele SkinUp | R$ 179,90 | R$ 199,90 | 31/10/2026 | `/products/top-alca-fina-segunda-pele-skinup` |
| Calcinha Cós Alto Segunda Pele SkinUp | R$ 44,91 | R$ 59,90 | 31/10/2026 | `/products/calcinha-cos-alto-segunda-pele-skin-up` |
| Calcinha Biquíni Segunda Pele SkinUp | R$ 44,91 | R$ 59,90 | 31/10/2026 | `/products/calcinha-biquini-segunda-pele-skin-up` |
| Top Faixa Cotton Up | R$ 132,90 | R$ 189,90 | 31/10/2026 | `/products/top-faixa-cotton-up` |
| Top Triangular Cotton Up | R$ 132,90 | R$ 189,90 | 31/10/2026 | `/products/top-triangular-cotton-up` |
| Calcinha Biquíni Cotton Up | R$ 39,90 | R$ 59,90 | 31/10/2026 | `/products/calcinha-biquini-cotton-up` |
| Protetor de Silicone Ultrafino | R$ 69,90 | R$ 99,90 | 31/10/2026 | `/products/protetor-de-silicone-ultrafino` |
| Sutiã de Silicone Invisível | R$ 149,90 | R$ 159,90 | 31/10/2026 | `/products/sutia-de-silicone-invisivel` |

Fora da lista: a variante "Compre 2 leve 3" do Top Faixa e do Top Triangular Cotton Up (R$ 265,80, com riscado de R$ 189,90). O preço do dia é maior que o riscado, então é dado quebrado (regra do Job 1).

Fora da lista, por ser de outro cadastro: Kit Top Faixa e Triangular Cotton Up `-cliente`, `-vip`, `-aniver` (R$ 170,82), `-fecha-mes` (CRM), Upsell "Skin UP Exclusivo" (R$ 199,90) e a versão "BRINDE" do protetor (R$ 69,90 para clientes).

## Conta por kit (31/10/2026)

Economia = soma das peças avulsas de hoje menos o preço do kit de hoje. A porcentagem é sobre a soma avulsa, não sobre o "de" riscado. Cupom fora da conta.

| Kit | Cadastro | Peças | Preço do kit | Soma avulsa | Economia | Leitura |
|---|---|---|---|---|---|---|
| Cotton Up Faixa ou Triangular, 3 conjuntos | principal | 3 × (top + calcinha) | R$ 373,18 | R$ 518,40 | R$ 145,22 (28%) | compensa; R$ 124,39 por conjunto |
| Sutiã Comfort Up + Protetor | sem tipo | sutiã + protetor | R$ 190,90 | R$ 259,80 | R$ 68,90 (27%) | compensa |
| Sutiã Comfort Slim + Protetor | sem tipo | sutiã + protetor | R$ 202,35 | R$ 259,80 | R$ 57,45 (22%) | compensa |
| SkinUp Top e Calcinha, 3 conjuntos | sem tipo | 3 × (top + calcinha) | R$ 499,90 | R$ 644,43 (com Top Segunda Pele) | R$ 144,53 (22%) | compensa; com Top Alça Fina, R$ 174,53 (26%) |
| Kit Invisible Up | sem tipo | sutiã de silicone + protetor | R$ 195,79 | R$ 219,80 | R$ 24,01 (11%) | economiza pouco |
| SkinUp Top e Calcinha, 1 conjunto | sem tipo | top + calcinha | R$ 199,90 | R$ 214,81 (com Top Segunda Pele) | R$ 14,91 (7%) | quase não economiza; com Top Alça Fina, R$ 24,91 (11%) |
| Cotton Up Faixa ou Triangular, 1 conjunto | principal | top + calcinha | R$ 155,52 | R$ 172,80 | R$ 17,28 (10%) | quase não economiza |
| Kit Comfort Up | sem tipo | Up ou Slim + Comfort Line | R$ 398,79 | R$ 379,80 | custa R$ 18,99 a mais (5%) | custa mais; se forem 3 peças (riscado de R$ 569,70), economia de R$ 170,91 (30%) |

Esgotados, sem conta publicada: Kit Top e Calcinha Cós Alto SkinUp (R$ 195,36; economia de R$ 19,45 com o Top Segunda Pele), Kit Comfort Up e Calcinha Biquíni SkinUp (R$ 205,53; R$ 29,28), Kit Comfort Line + Cós Alto (R$ 209,90; R$ 24,91) e Kit Comfort Slim + Biquíni (R$ 209,90; R$ 24,91). Eles entram no texto só como "esgotado em 31/10", se o Bruno quiser a menção.

Critério de leitura: economia até R$ 20 é "quase não economiza"; de R$ 20 a R$ 30, "economiza pouco"; acima de R$ 50 (20% ou mais), "compensa".

## Cupom

- O teste de 26/10 (dossiê, seção 1) somou o MAUAD com os kits Leve 2 e Leve 3 (e com a promoção progressiva, que entra antes do cupom).
- Nenhum kit desta lista foi ao carrinho com o MAUAD. A regra da página de kit, "Cupons não acumulam com o kit ... salvo cupons de influenciadoras", pode valer, mas não é teste.
- Os kits de 3 conjuntos (R$ 373,18 e R$ 499,90) passam de R$ 299, o piso da promoção progressiva. Se a promoção entrar no kit, o preço cai mais. Não é teste.
- Texto: "confira o cupom no carrinho, com o kit no pedido". Sem "sempre" e sem percentual sobre o kit. Se o Bruno autorizar o teste (Perguntas, item 5), a frase muda.

## Dados do navegador (31/10/2026)

Nada lido no navegador. Composição do Kit Comfort Up e do Top Faixa/Triangular na variante "Compre 2 leve 3" não estão no JSON: `[PENDENTE: navegador]` na URL `https://todaup.com/products/kit-comfort`, se o Bruno liberar.

## Perguntas para o Bruno

1. **Qual cadastro dos kits SkinUp usar?** Os quatro kits SkinUp do cadastro principal estão com 0 de 1 disponível (R$ 195,36 e R$ 205,53 a R$ 209,90). Os kits sem `product_type`, com o mesmo nome-base, estão disponíveis a R$ 199,90 (1 conjunto) e R$ 499,90 (3). Proposta: usar os sem tipo na pauta. Confirma?
2. **Qual top está no kit SkinUp?** Cores e tamanhos do kit (Baunilha, Caramelo, Avelã; P a G1) batem com o Top Segunda Pele (R$ 169,90), não com o Top Alça Fina (R$ 179,90, sem G1 e sem Rose ou Preto). A diferença muda a economia de R$ 14,91 para R$ 24,91 por conjunto. Proposta: Top Segunda Pele, a confirmar.
3. **Quantas peças tem o Kit Comfort Up?** As opções do kit são Comfort Slim ou Up + Comfort Line, o que dá 2 peças e custo de R$ 18,99 a mais. Mas o riscado de R$ 569,70 é 3 × R$ 189,90, e o kit sairia 30% mais barato. Preciso da página ou da sua resposta.
4. **Link de parceria em todas as linhas?** O link do dossiê é `todaup.com/discount/MAUAD?redirect=/collections/squad-toda-up`: leva à coleção, não ao produto. Usar o mesmo link em todas as linhas (como veio, conforme o dossiê), ou aceita que o leitor encontre o kit na coleção?
5. **Teste de carrinho com kit?** Nenhum kit de produto foi ao carrinho com o MAUAD (o teste de 26/10 foi nos Leve 2 e Leve 3). Autoriza um teste no navegador com um kit Cotton Up e um SkinUp, sem finalizar? Sem teste, o texto só manda conferir no carrinho.


## Decisões do Bruno (31/10/2026)
O Bruno aprovou a pauta com as recomendações do Claude como padrão.
- Kits SkinUp pelo cadastro disponível sem tipo (R$ 199,90 e R$ 499,90), com a conta contra o Top Segunda Pele; reler no dia.
- Kit Comfort Up só entra se a página confirmar o número de peças; sem confirmação, fica fora.
- Link de parceria como veio no dossiê, em todas as linhas.
- Sem teste de carrinho com kit: o texto manda conferir o cupom no resumo do pedido, sem afirmar que soma.
- Alerta para a sessão de artigos: o black-friday-toda-up cita o kit Cotton a R$ 170,82, preço de um cadastro de campanha; o principal estava a R$ 155,52 em 31/10. Reler e corrigir.
- **Resposta rápida (REGRAS-GLOBAIS, seção 6):** um parágrafo de 40 a 60 palavras só com a decisão e a frase que aponta o que muda a escolha. Sem lista de produtos, preço, preço com cupom ou conta; o esqueleto acima é tema, não texto. Tudo o que ela disser também está num capítulo, e o veredito tem capítulo próprio antes do FAQ.
- **Jobs 2 e 3 de verdade:** plano de imagens por seção (Job 2, item 7), capítulos completos (cada um responde uma pergunta com os números dela, sem resumo de uma linha) e a checagem do Job 3 antes de entregar.
