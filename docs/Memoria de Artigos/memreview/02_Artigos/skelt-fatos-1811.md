# Fatos: Skelt, marcas de farmácia e reteste do código (18/11/2026)

Leituras de 18/11/2026 à noite, sem login e sem compra. Fontes:
- **Busca:** autocompletar do Google (pt-BR) e Google Trends (Brasil, 12 meses, navegador embutido).
- **Skelt:** catálogo público do site (`skelt.com.br`, VTEX; 106 produtos) e a API pública do carrinho, o mesmo método do teste de 21/10.
- **Panvel Glow, Episol Gold e Australian Gold:** a busca "autobronzeador" e as páginas de produto de `panvel.com`, pelo navegador (a linha de comando recebeu 403).

## 1. O código deu 5%, não 10%

O `SKEMCASACOMCECILIA` aplicou **5% sobre o preço da campanha** em todos os carrinhos simulados. O teste de 11/11 da sessão de cupons tinha dado 10% sobre um kit em promoção.

| Carrinho | Sem o código | Com o código | Desconto do código |
|---|---|---|---|
| Mousse Autobronzeador, 1 un. | R$ 101,92 | R$ 96,82 | R$ 5,10 (5%) |
| Mousse Autobronzeador Dark, 1 un. | R$ 64,95 | R$ 61,70 | R$ 3,25 (5%) |
| Mousse + Água (2 itens, progressivo de 20%) | R$ 191,84 | R$ 182,24 | R$ 9,60 (5%) |
| Mousse Dark + Água Dark + Gel | R$ 179,35 | R$ 170,38 | R$ 8,97 (5%) |
| Kit Body Splash Solar Muse + Body Cream Amalfi Sunset | R$ 168,22 | R$ 159,81 | R$ 8,41 (5%) |

- **Não há produto sem promoção para comparar.** Os 94 produtos disponíveis estão todos na campanha "November Glow": 63 com 15%, 21 com 20%, 1 com 22%, 3 com 40% e 6 com 50%. Não dá para dizer se o código caiu para 5% de vez ou só enquanto a campanha roda.
- **O site não publica regra sobre isso.** A página `/cupom-skelt` está vazia e o `/regulamento` é só o do Skelt Club (pontos).
- **A faixa do topo anuncia "+5% OFF na primeira compra com o cupom PRIMEIRA5" e "+5% OFF no Pix".** Com o nosso a 5%, o código da loja para cliente novo dá o mesmo desconto.
- **O que isso atinge:** `/cupons/skelt` (título, snippet, descrição e nota do teste dizem 10%; é da sessão de cupons) e os artigos da Skelt que citam "10%" e valores com o código. Nada disso foi mexido aqui.
- **Limite da leitura:** carrinho pela API pública, sem CEP nem pagamento; o Pix não foi lido. Vale refazer pelo site, com o carrinho aberto, antes de mudar qualquer texto.
- **A "regra que vence em 21/11"** vinha do briefing do `skelt-e-boa` (03/11), sem dizer qual regra. O reteste pedido na Fila é este.

### Decisão do Bruno (18/11, noite)

- **O Bruno testou no site** e viu o mesmo: todos os códigos de parceiros que funcionam estão dando 5%. A leitura dele é que a loja reduziu os cupons na campanha, como a Insider fez.
- **Os textos ficam com 10% em todo lugar** (`/cupons/skelt` e os artigos). Motivo: os agregadores seguem anunciando 10%, e baixar sozinho nos tira da comparação.
- **O título do `cupom-skelt-primeira-compra` fica como está.** O Google mostra o título da página, que corta antes dos 10%; o snippet já traz "10% OFF".
- **Ideia em estudo:** um aviso no site, no molde do banner de campanha, dizendo que na Black Friday as lojas podem mudar a porcentagem dos cupons sem aviso. É trabalho de `src/`, fora desta sessão.
- **Para os briefings das SF1 a SF6:** o texto diz 10%, como o resto do site. Preço "com o código" lido no carrinho sai a 5% enquanto a campanha durar: o briefing manda reler no dia e não crava valor com o código sem conferir.
- **O PRIMEIRA10 que os agregadores citam não está mais no site:** a faixa do topo anuncia PRIMEIRA5.

## 2. Busca

**Trends, Brasil, 12 meses (média):** "autobronzeador skelt" 30; "autobronzeador panvel" 8; "autobronzeador australian gold" 1; "autobronzeador episol" 1; "autobronzeador best bronze" 0.

- **A temporada está subindo.** "autobronzeador skelt" foi de 27 a 33 em outubro para 48 e 52 nas duas últimas semanas. No ano passado o pico foi na semana de 21/12 (100), com dezembro inteiro acima de 60.
- **A Panvel é a única concorrente com busca própria:** 19 e 31 nas duas últimas semanas.
- **Outras duas comparações do Trends não carregaram** (categoria, dúvidas de uso e linha solar): ficaram sem medida.

**Autocompletar:**
- "skelt ou": best bronze, australian gold, panvel, episol, parafina bronze; "autobronzeador skelt ou episol", "ou australian gold", "ou panvel", "ou mantecorp"; "skelt dark ou normal"; "skelt agua ou mousse".
- "autobronzeador skelt": bifásico, mousse, dark, antes e depois, araujo, é bom, como usar, qual o melhor, rosto.
- "skelt como": usar, funciona, revender, tirar da mão; "bifásico como usar", "luva skelt como usar", "mousse skelt como usar".
- Dúvidas da categoria com a marca: "autobronzeador skelt mancha a roupa", "mancha lençol", "quanto tempo para secar", "quanto tempo para fazer efeito", "quanto tempo dura", "grávida pode usar".
- Marca: "skelt é brasileira", "é da creamy", "é importado", "é vegano", "é de qual país".
- Linhas sem artigo nosso: "skelt protetor solar" (8, 15 e 30; "summer vibes fps8"; "é bom"), "skelt perfume cabelo".
- Farmácia: "autobronzeador skelt farmácia", "farmácia são joão", "araujo"; "melhor autobronzeador de farmácia".
- Sem sugestão: "skelt alternativa", "skelt vs", "skelt ou st tropez".

**Episol e Mantecorp são a mesma coisa:** a Episol Gold é da Mantecorp Skincare. A reserva A4 tinha quatro marcas; são três concorrentes.

## 3. Preços da Skelt no site (campanha November Glow)

| Produto | Tamanho | Lista | Campanha | Com o código a 5% | Por 100 ml |
|---|---|---|---|---|---|
| Mousse Autobronzeador | 140 ml | R$ 119,90 | R$ 101,92 | R$ 96,82 | R$ 69,16 |
| Mousse Autobronzeador Dark | 140 ml | R$ 129,90 | R$ 64,95 | R$ 61,70 | R$ 44,07 |
| Água Autobronzeadora | 150 ml | R$ 119,90 | R$ 101,92 | R$ 96,82 | R$ 64,55 |
| Água Autobronzeadora Dark | 150 ml | R$ 129,90 | R$ 64,95 | R$ 61,70 | R$ 41,13 |
| Gel Autobronzeador Hidratante | 120 ml | R$ 98,90 | R$ 49,45 | R$ 46,98 | R$ 39,15 |
| Autobronzeador Bifásico | 120 ml (pela Panvel; o site não foi conferido) | R$ 119,90 | R$ 101,92 | R$ 96,82 | — |
| Mini Mousse | 45 ml | R$ 58,90 | R$ 29,45 | R$ 27,98 | R$ 62,18 |
| Luva aplicadora | 1 un. | R$ 34,90 | R$ 29,66 | — | — |
| Removedor | — | R$ 69,90 | R$ 34,95 | — | — |

- **Esgotados:** Autobronzeador Facial (30 ml, R$ 79,90) e Spray Gradual Anticelulite (120 ml, R$ 80,90).
- **Ficha da loja:** bronzeado de 7 a 12 dias em toda a linha de corpo; 5 a 8 aplicações por frasco (6 a 8 no gel); cor-guia só nos mousses; água, água Dark e gel são incolores e a loja os indica a quem já tem prática; ação de 6 a 8 horas; vegano e sem crueldade.
- **O lembrete de 05/11 (reler os preços do autobronzeador) está atendido por esta tabela.** Os valores no `autobronzeador-skelt-qual-escolher` e no `skelt-ou-best-bronze` são de 23/10 e não foram comparados com ela aqui.

## 4. Concorrentes, lidos na Panvel

| Produto | Tamanho | Preço | Por 100 ml ou 100 g | Ficha |
|---|---|---|---|---|
| Mousse Autobronzeador Panvel Glow | 150 ml | R$ 44,99 (de R$ 64,99) | R$ 29,99 | Cor média a escura; efeito em 3 a 5 horas; "duração de até 7 dias"; leva caramelo na fórmula |
| Mousse Express Médio Panvel Glow | 150 ml | R$ 69,99 (de R$ 92,99) | R$ 46,66 | Não aberto |
| Água Autobronzeadora Panvel Glow Médio | 150 ml | R$ 44,99 (de R$ 59,99) | R$ 29,99 | Não aberto |
| Água Autobronzeadora Panvel Glow Escuro | 150 ml | R$ 57,99 (de R$ 76,99) | R$ 38,66 | Incolor; pantenol, ácido hialurônico e aloe vera; vegano |
| Gel Autobronzeador Panvel Glow | 200 g | R$ 39,99 (de R$ 54,99) | R$ 20,00 | Não aberto |
| Loção Panvel Glow Médio e Escuro | 120 g | R$ 23,99 e R$ 32,99 | R$ 19,99 e R$ 27,49 | Não abertos |
| Sérum e Bruma facial Panvel Glow | 30 ml | R$ 34,99 e R$ 32,99 | — | Não abertos |
| Água Autobronzeadora Episol Gold (Mantecorp) | 150 ml | R$ 99,90 com o programa do laboratório; R$ 99,99 sem | R$ 66,60 | Ácido hialurônico; toque seco; sai como espuma; só corporal. A duração não foi lida |
| Loção Australian Gold Kakadu Bronzer | 120 ml | R$ 66,99 | R$ 55,83 | Bronzeado leve em 8 horas, que intensifica em 24; para 2 a 3 usos por semana, de manutenção |

- **A Panvel também vende a Skelt:** mousse 140 ml a R$ 95,99 (2 por R$ 76,79 cada), bifásico 120 ml e água 150 ml na mesma faixa, água Dark a R$ 101,99. Com o código a 5%, o mousse no site (R$ 96,82) fica no preço da farmácia; a 10% sairia por R$ 91,73. O site tem o Dark a 50% e o frete grátis sem mínimo no Sul, no Sudeste e no Centro-Oeste.
- **A Australian Gold tem mousse** (o texto da Kakadu cita), mas a Panvel só lista a loção. O site da marca não foi lido.

## 5. O que os números dizem

- **Skelt ou Panvel Glow:** a Panvel é mais barata em toda forma, de 2 a 3 vezes no mousse comum (R$ 29,99 contra R$ 69,16 por 100 ml). A Skelt só encosta com o Dark a 50% (R$ 41 a R$ 44 contra R$ 38,66 da água escura). O que a ficha dá à Skelt: duração declarada de 7 a 12 dias contra "até 7 dias", rendimento declarado, bifásico, mini de 45 ml, removedor e kits. É o par com mais busca e o veredito de preço é da concorrente.
- **Skelt ou Episol Gold:** mesma forma e mesmo tamanho (água, 150 ml). A Skelt comum sai um pouco abaixo (R$ 96,82 contra R$ 99,90) e a Dark, bem abaixo (R$ 61,70) enquanto a campanha durar. É o par em que a parceira ganha.
- **Skelt ou Australian Gold:** a Kakadu é loção de manutenção, função diferente do mousse. Falta ler o mousse da marca.

## 6. Pautas propostas (sem GO)

| Código | Pauta | Sinal | Nota |
|---|---|---|---|
| SF1 | Skelt ou Panvel Glow: qual autobronzeador | Trends 8 contra 30; três variações no autocompletar | A Panvel ganha no preço; a Skelt, na duração declarada e na linha. Texto honesto ou não sai |
| SF2 | Skelt ou Episol Gold (Mantecorp): água autobronzeadora | Trends 1; "ou episol" e "ou mantecorp" no autocompletar | Mesmo tamanho; a Skelt ganha no preço. Ler a duração da Episol |
| SF3 | Skelt ou Australian Gold | Trends 1; duas variações no autocompletar | Falta o mousse da Australian Gold |
| SF4 | Autobronzeador Skelt: como usar, passo a passo (mousse, bifásico e luva) | Muitas variações de "como usar", "quanto tempo para secar" e "para fazer efeito" | Conferir o quanto o `autobronzeador-skelt-qual-escolher` já cobre |
| SF5 | Autobronzeador mancha a roupa e o lençol? | "mancha a roupa", "mancha lençol", "skelt mancha" | Pode ser seção da SF4 |
| SF6 | Protetor solar Skelt Summer Vibes (FPS 8, 15 e 30) | "skelt protetor solar" com seis variações | Linha não lida; FPS 8 pede cuidado no texto |

- **"Grávida pode usar":** assunto de saúde. No máximo uma pergunta de FAQ com o que o rótulo diz e a orientação de falar com o médico, nunca artigo.
- **"Skelt na farmácia ou no site":** existe busca, mas com o código a 5% o site não ganha. Fica fora até o percentual se resolver.
- **Todo valor "com o código" desta ficha usa 5%, o que o carrinho aplicou em 18/11.** Os textos do site seguem com 10% por decisão do Bruno; reler no carrinho no dia da redação.

## 7. Leituras do Job 1 para a SF2 (18/11/2026). Briefing em [[skelt-ou-episol-gold]]

- **Duração da Episol Gold (página da Panvel, lida inteira):** "segundo a Mantecorp Skincare, o efeito bronzeado
  dura de 7 a 12 dias"; a marca sugere reaplicar a cada 8 dias. **É a mesma duração que a Skelt declara.**
- **Aplicação:** agitar; sai como espuma leve; com as mãos, lavando em seguida (luva não é obrigatória, segundo a
  marca); só corpo, não no rosto. "Não transfere cor para os tecidos", segundo a fabricante. Não comedogênica e
  dermatologicamente testada. A página não diz se tem cor-guia nem o tempo de ação.
- **Site da Mantecorp Skincare:** a Água Autobronzeadora Episol Gold 150 ml a R$ 99,90. O catálogo tem um
  autobronzeador só (mais um kit com o protetor FPS 30, R$ 195,90): **não existe versão escura.**
- **Outras lojas (cartões e resumo do Google, lojas não abertas):** Amazon a partir de R$ 74,00; Farmalife R$ 74,39;
  Beleza na Web R$ 77,90; Farmácia Indiana, Época e Renner R$ 92,89; Mercado Livre R$ 99,90; Drogaria Araujo
  R$ 99,99.
- **Correção da seção 5:** "é o par em que a parceira ganha" só vale contra a Panvel e na campanha. Na tabela a
  Episol custa menos (R$ 99,90 contra R$ 119,90) e no varejo, menos ainda. A Skelt só sai abaixo com a Água Dark a
  50%. O que sobra para a Skelt: duas intensidades, rendimento declarado e a linha em volta.
