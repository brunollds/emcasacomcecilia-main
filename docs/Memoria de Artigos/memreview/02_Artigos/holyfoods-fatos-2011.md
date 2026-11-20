# Fatos: HolyFoods e Mexidona (leitura de 20/11/2026)

Dados brutos para as pautas HF2 (`holyfoods-projeto-21-dias`), HF6 (`holyfoods-ou-mexidona`) e HF9
(`holyfoods-como-preparar`). Complementa `holyfoods-fatos-0511.md` (que segue válido, exceto onde esta
leitura corrige; ver §10).

## 0. Como foi lido

- **Sem navegador, sem login, sem carrinho, sem link de afiliado.** Tudo por `curl` com user-agent comum.
- HolyFoods (Shopify, 20/11/2026):
  - `https://holyfoods.com.br/products.json?limit=250` (200, 250 itens);
  - `https://holyfoods.com.br/products/<handle>.json` (200): projeto-21-dias, pack-sopa-da-vovo, sopa-da-vovo, risoto-funghi, novo-mac-queijo;
  - `https://holyfoods.com.br/products/<handle>` (HTML, 200): projeto-21-dias, pack-sopa-da-vovo, pack-sopa-low-carb, pack-canja-da-mamae, sopa-da-vovo, sopa-low-carb, sopa-detox, canja-da-mamae, risoto-funghi, risoto-al-mare, risoto-de-queijo, novo-mac-queijo, novo-mac-alfredo, mac-bolonha, mac-caipira;
  - `https://holyfoods.com.br/` (home, 200).
  - Os textos das tabelas e do preparo estão no HTML da página de produto (as abas "Tabela nutricional" e "Modo de preparo e dicas" não dependem de JavaScript para aparecer no HTML).
- Mexidona (VNDA, não Shopify, 20/11/2026):
  - `https://www.mexidona.com.br/products.json` responde 404; a home (`https://www.mexidona.com.br/`, 200) e as páginas `https://www.mexidona.com.br/produto/<slug>` (200) têm os dados;
  - produtos lidos: sopa-da-nona-15, sopa-amarela-14, sopa-de-frango-defumado-28, risoto-sabor-queijo-180g-mexidona-11, risoto-de-cogumelos-9, mac-frango-pct-100g-mexidona-110... (ver §9; o slug do Mac Cogumelo é `mac-cogumelo-pct-100g-mexidona-110` e o do Mac Frango é `mac-frango-pct-100g-mexidona-111`).
- Autocompletar: as cinco buscas do Projeto 21 Dias, as de Mexidona e as de preparo foram dadas no briefing do Bruno (20/11/2026); não foram refeitas aqui.
- Arquivos brutos (HTML e JSON das leituras) no scratchpad: `C:\Users\Bruno\AppData\Local\Temp\claude\16086a64814165a5\6634a9e5-022d-45d2-a71f-4c96d8475267\scratchpad\holyfoods-2011\`.

## 1. Campanha e preços (20/11/2026)

- **A Black da Holy segue no ar em 20/11.** A faixa diz "30% OFF no site todo" e "30% OFF já aplicado nos preços". O contador tem `data-end-date=""`: não há data de fim publicada. Fonte: home, 20/11.
- Preço de venda por `products.json` (preço e `compare_at_price`, 20/11). Os produtos "(Exclusivo)" e "(VIP)" repetem o preço do produto sem sufixo; o link do artigo é o sem sufixo.

| Produto (handle) | Preço de venda | Preço de lista | Variante | Disponível em 20/11 |
|---|---|---|---|---|
| `projeto-21-dias` (Projeto 21 Dias: Seu novo hábito) | R$ 102,90 | R$ 147,00 | Default Title, SKU KIT21DAY | sim |
| `pack-sopa-da-vovo` | R$ 41,93 | R$ 59,90 | Default | sim |
| `pack-sopa-low-carb` | R$ 41,93 | R$ 59,90 | Default | sim |
| `pack-canja-da-mamae` | R$ 41,93 | R$ 59,90 | Default | sim |
| `sopa-da-vovo`, `sopa-low-carb`, `sopa-detox`, `canja-da-mamae` | R$ 13,93 | R$ 19,90 | Default | sim |
| `risoto-funghi`, `risoto-al-mare`, `risoto-de-queijo` | R$ 13,93 | R$ 19,90 | Default | sim |
| `novo-mac-queijo`, `novo-mac-alfredo`, `mac-bolonha`, `mac-caipira` | R$ 13,93 | R$ 19,90 | Default | sim |
| `super-aveia-*` (todas as sabores) | R$ 10,43 | R$ 14,90 | — | não (esgotadas) |
| `feijao-*` e `kit-feijao-sem-pressao-8un` | R$ 10,43 (feijão) e R$ 83,44 (kit) | R$ 14,90 e R$ 119,20 | — | não (esgotados) |

- Kits da Black (Descoberta, Rotina Resolvida, Despensa Cheia): sem alteração de preço em 20/11 no `products.json` (o kit não tem página própria; ver `holyfoods-fatos-0511.md` §8.3).
- Frete grátis e garantia: home e política (`holyfoods-fatos-0511.md` §3 e §8.5), sem alteração lida em 20/11.

## 2. Projeto 21 Dias (página `products/projeto-21-dias`, 20/11/2026)

- **Título:** "Projeto 21 Dias: Seu novo hábito". Subtítulo da home: "21 jantares individuais para facilitar a rotina".
- **Preço:** R$ 147,00 por R$ 102,90 (30%). Card da home: "Rende 21 porções", "R$ 4,90 por porção" (cálculo da loja: 102,90 / 21).
- **Conteúdo (texto da página, em lista):** "21 refeições: 7 sachês de cada sabor: 7× Sopa da Vovó, 7× Sopa Low Carb, 7× Canja da Mamãe".
- **Modo de preparo do kit (página, seção "Preparo sem complicação"):** "As medidas abaixo são para um sachê individual por vez." Passo 1: "Coloque todo o conteúdo de um sachê em uma panela com 450 ml de água quente. Acerte o sal a gosto." Passo 2: "Cozinhe por 15 a 20 minutos em fogo médio, com a panela semiaberta. Mexa de vez em quando, até o caldo encorpar."
- **Ficha por sachê ("Modo de preparo e dicas", seção do sabor):** "1 sachê · 450 ml de água quente · 15 a 20 minutos"; "Rendimento: cerca de 300 g de sopa por sachê"; "Conservação: manter em ambiente seco, fresco e livre de odores e insetos."
- **Dica da loja (texto do kit):** "Não use a quantidade de água dos pacotes maiores" (vale para o sachê do kit e do pack).
- **Pergunta de ingredientes na página:** "Os ingredientes e alergênicos são iguais em todos os sabores? Não. Cada receita tem sua própria composição."

### 2.1. Frases do kit que o texto NÃO usa (promessa de saúde ou emagrecimento, ou claim não sustentado)

- "1 Sachê por dia no jantar e muitas calorias a menos"; "Sou aliada do seu emagrecimento" (Low Carb); "Para uma dieta com poucas calorias, poucos carboidratos..." (Low Carb).
- "21 dias é cientificamente comprovado o tempo que o seu cérebro precisa pra transformar uma escolha em hábito automático."
- "Sou ótima para auxiliar na sua imunidade e te ajudar na absorção de mais nutrientes" (Vovó).
- "Sacia de verdade"; "Manter a dieta sem esforço e com sabor"; "Faça o teste do Kit PROJETO 21 Dias e comprove o resultado!"
- Avaliações do site (4,8 em 25.956; 304 no kit): não usar como fato.

### 2.2. Tabela por sachê individual (página do kit, "Tabela nutricional", 20/11)

Base da coluna do sachê: "Porção: 43 g (1 sachê individual)" etc. A coluna de 100 g é do "alimento pronto para consumo" (nota ** da tabela). Ver §8 sobre a base.

| Sachê | Peso do sachê (porção) | kcal | Carb. (g) | Açúcares totais (g) | Proteína (g) | Gord. totais (g) | Gord. sat. (g) | Fibra (g) | Sódio (mg) |
|---|---|---|---|---|---|---|---|---|---|
| Sopa da Vovó | 43 g | 118 (6% VD) | 24 (8%) | 1 | 3,1 (6%) | 1,1 (2%) | 0,2 (1%) | 2,2 (9%) | 54 (3%) |
| Sopa Low Carb | 50 g | 175 (9%) | 31 (10%) | 1 | 10 (20%) | 1,2 (2%) | 0 | 7,6 (30%) | 19 (1%) |
| Canja da Mamãe | 44 g | 111 (6%) | 17 (6%) | 0,9 | 6,7 (13%) | 1,8 (3%) | 0,3 (2%) | 1,9 (8%) | 50 (3%) |

- Açúcares adicionados: 0 nas três (linha "Açúcares adicionados", na coluna da porção).
- Por 100 g pronto (coluna 100 g): Vovó 32 kcal, carb. 7,1 g, prot. 0,9 g, sódio 5,8 mg; Low Carb 53 kcal, carb. 9,5 g, prot. 3,1 g, sódio 25 mg; Canja 40 kcal, carb. 7,7 g, prot. 2,2 g, sódio 11 mg.
- Soma das três kcal por sachê: 118 + 175 + 111 = 404 (média de 135 kcal por sachê). 7 de cada = 2.828 kcal no kit, pela tabela.

### 2.3. Ingredientes e alergênicos (texto do kit, por sabor)

- **Sopa da Vovó (kit):** "Macarrão sem glúten (farinha de arroz, corantes naturais cúrcuma e urucum e emulsificante INS 471), flocos de batata, flocos de arroz, quinoa branca, cenoura, cebola, pimentão vermelho, alho, tomate, salsa, cúrcuma, páprica defumada e pimenta preta." Alergênicos (página do avulso): "CONTÉM DERIVADOS DE SOJA. PODE CONTER CRUSTÁCEOS (CAMARÃO), PEIXES, LEITE, OVOS, AVEIA (SEM GLÚTEN) E AMENDOIM. NÃO CONTÉM GLÚTEN."
- **Sopa Low Carb (kit):** "Lentilha vermelha, tomate, quinoa branca, quinoa vermelha, quinoa preta, páprica defumada, cebola, pimentão vermelho, salsa, alho poró e orégano."
- **Canja da Mamãe (kit):** "Arroz branco, quinoa, proteína de ervilha, cenoura, frango desidratado, flocos de batata, cebola, farinha de mandioca, salsa, tomate, cúrcuma, alho e alho poró."
- Divergência: o pack da Vovó (`pack-sopa-da-vovo`) lista "mandioquinha" e "alho poró" que não aparecem na lista do avulso nem na do kit. Ver §8.

## 3. Packs de sopa (páginas `pack-sopa-*`, 20/11/2026)

- **Card:** "Rende 3,5 litros ou 10 porções de 350ml". Página: "R$ 4,19 por porção · Rende 10 porções" (pack Vovó). Preço R$ 41,93 por R$ 59,90.
- **Sachê do pack** = o mesmo do kit: Vovó 43 g, Low Carb 50 g, Canja 44 g ("Porção: 43 g (1 sachê individual)" etc.). A tabela do sachê do pack (Vovó) é igual à do kit (118 kcal, 24 g carb., 3,1 g prot., 54 mg sódio).
- **Preparo do pack:** "No fogão · 1 sachê · 450 ml de água quente · 15 a 20 minutos" (mesma ficha do kit). "Conteúdo por sachê: 43 g. Rendimento: cerca de 300 g de sopa por sachê."
- **Ingredientes do pack Vovó (página):** "Macarrão sem glúten (farinha de arroz, corantes naturais cúrcuma e urucum e emulsificante INS 471), flocos de batata, quinoa branca, flocos de arroz, cenoura, cebola, tomate, salsa, mandioquinha, alho, pimentão vermelho, cúrcuma, páprica defumada, alho poró e pimenta preta."

## 4. Sopas avulsas (páginas `sopa-*`, `canja-da-mamae`, 20/11/2026)

| Produto | Porção declarada | Água (fogão) | Tempo | Rendimento declarado |
|---|---|---|---|---|
| Sopa da Vovó | 33 g de mistura (¼ da embalagem) | 1,2 litro de água quente | 15 minutos, fogo médio, tampa semiaberta | "Rende 4 porções de 250 g de sopa pronta (1 litro por pacote)" |
| Sopa Low Carb | 38 g (¼) | 1,1 litro | 20 minutos | idem |
| Sopa Detox | 33 g (¼) | 1,2 litro | 20 minutos | idem |
| Canja da Mamãe | 33 g (¼) | 1,1 litro | 20 minutos | idem |

- Avulso sem micro-ondas: as páginas das sopas não trazem preparo no micro-ondas (a palavra "micro" não aparece no texto visível).
- Dicas da loja (texto da ficha, "Dicas sagradas"): Vovó, "cubos de frango refogado" e "um ovo, tampe a panela e cozinhe por mais 3 minutos"; Low Carb, "carne moída"; Detox, "ovos cozidos" e "fio de azeite"; Canja, "ovos cozidos" e "coentro ou salsinha". Antes da água: "refogue alho e cebola com azeite até formar uma crosta no fundo da panela".
- Peso de mistura por embalagem (ficha, 05/11, e confirmado pela porção de ¼): Vovó e Detox 130 a 132 g; Low Carb 152 g; Canja 133 g.

## 5. Risotos e macs (páginas, 20/11/2026)

| Produto | Peso da embalagem (mistura) | Rende (pronto) | Fogão | Micro-ondas |
|---|---|---|---|---|
| Risoto Funghi (`risoto-funghi`) | 120 g ("Porção: 120 g de mistura (1 embalagem)") | 1 porção de 320 g | 400 ml de água para começar; mais água conforme evapora; sal a gosto; mexer de vez em quando; opcional manteiga e parmesão; mexer 20 s no fim | 300 ml de água; alta 10 min, mistura, mais 5 min, ajustando tempo ou água |
| Risoto Al Mare (`risoto-al-mare`) | 120 g | 320 g | idem | idem |
| Risoto de Queijo (`risoto-de-queijo`) | 120 g | 320 g | idem | idem |
| Mac Queijo (`novo-mac-queijo`) | 132 g | 380 g | 500 ml de água; ferver; todo o conteúdo; sal; 15 a 20 min mexendo | 400 ml; 9 min; mistura; mais 6 min |
| Mac Alfredo (`novo-mac-alfredo`) | 115 g | 380 g | idem | 400 ml; 9 + 6 min |
| Mac Bolonha (`mac-bolonha`) | 115 g | 380 g | idem | 400 ml; 12 + 6 min |
| Mac Caipira (`mac-caipira`) | 115 g | 380 g | idem | 400 ml; 12 + 6 min |

- Página do risoto: "18 a 20 min no fogão" e "Rende 320 g · 1 porção". Página do mac: "15 min no micro-ondas, 15–20 min no fogão" (cabeçalho da página).
- Mac Queijo: "Ingredientes: Macarrão: Farinha de arroz, corantes curcumina e extrato de urucum e emulsificante E471. Tempero em pó: Leite, queijo provolone, colágeno, extrato de levedura..." "CONTÉM DERIVADOS DE LEITE E SOJA... CONTÉM LACTOSE".
- Risoto Funghi: "Arroz arbório, colágeno, cebola, cogumelo funghi, cogumelo shiitake, extrato de levedura, alho, alho poró, salsa, vitaminas [...] e minerais [...]" "PODE CONTER DERIVADOS DE LEITE, SOJA, OVOS, PEIXES, CRUSTÁCEOS (CAMARÃO), AVEIA (SEM GLÚTEN) E AMENDOIM. NÃO CONTÉM GLÚTEN."
- Tabela por embalagem (porção = 1 embalagem), 100 g pronto entre parênteses: Funghi 398 kcal, carb. 78 g, prot. 20 g, fibra 3,5 g, sódio 82 mg (100 g pronto: 123 kcal); Al Mare 421 kcal, 77 g, 20 g, 2,1 g, 175 mg; Queijo 452 kcal, 74 g, 20 g, 0,9 g, 208 mg, sat. 5,6 g, gord. totais 8,4 g; Mac Queijo 395 kcal, 54 g, 20 g, fibra 3 g, sódio 318 mg, gord. sat. 6,6 g; Alfredo 446 kcal, 70 g, 20 g, 3,8 g, 228 mg; Bolonha 412 kcal, 71 g, 20 g, 4,1 g, 276 mg; Caipira 308 kcal, 50 g, 20 g, 4,3 g, 321 mg. (Fonte: colunas da embalagem de cada página; ver `holyfoods-fatos-0511.md` e `holyfoods-e-boa.json` para os números já publicados.)

## 6. Sopa e Projeto: alergênicos e pergunta de saúde (texto da loja)

- A loja não diz "saudável" como claim nossa; o texto do site usa "saudável" em "Você precisa da HolyFoods para: Jantar fácil e saudável em dias cansativos; Escapar do fast-food super calórico; Manter a dieta sem esforço e com sabor; Comer bem e não sentir culpa" (página do risoto e do mac). Não usar.

## 7. Preparo: "Preparo sem complicação" (blocos da página, 20/11/2026)

- Risoto e mac têm "Da embalagem à mesa, em dois passos. PASSO 1 Água e conteúdo... PASSO 2 Prepare e aproveite." O texto é o mesmo dos blocos do kit.
- Projeto e sachê: "PASSO 1 Água e conteúdo: Coloque todo o conteúdo de um sachê em uma panela com 450 ml de água quente. Acerte o sal a gosto." "PASSO 2 Prepare e aproveite: Cozinhe por 15 a 20 minutos em fogo médio, com a panela semiaberta. Mexa de vez em quando, até o caldo encorpar."
- Vídeos da Cecília no site (não lidos aqui; ver `src/lib/video-metadata.js`, linhas 99 e 104): "Cecília abre um kit da HolyFoods comprado no TikTok Shop e prepara o risoto na panela de indução, com 400 ml de água e um pouco de manteiga." e "Cecília prepara o Mac Queijo da HolyFoods na panela, do pacote ao prato." Os slugs no site: `/videos/risoto-holyfoods-kit-tiktok-shop` e `/videos/mac-queijo-holyfoods-na-panela` (conforme `holyfoods-e-boa.json`).

## 8. Divergências (não normalizar sozinho)

1. **Base da tabela do sachê (kit e pack):** a coluna do sachê é o peso do sachê seco (43, 50 ou 44 g; "Conteúdo por sachê"), e a coluna de 100 g é do alimento pronto. Não é a mesma base da tabela de 250 g pronta de `holyfoods-e-boa` (Vovó 87 kcal, Low Carb 134, Detox 80, Canja 111). Os valores são diferentes e os dois estão certos cada um na sua base. Qualquer artigo novo diz a base.
2. **Vovó avulso x pack x kit (ingredientes):** o pack traz mandioquinha e alho poró; o avulso e o kit não. Conferir na embalagem que chegar.
3. **Peso do sachê de sopa (pack) x sopa avulsa:** o avulso rende 1 litro por ¼ de 130 a 152 g (4 porções de 250 g); o sachê rende cerca de 300 g de sopa (ficha) e "10 porções de 350 ml" no card do pack. Os dois valores de rendimento não se fecham entre si; a comparação por preço usa o peso seco.
4. **Pack Vovó, rendimento:** "3,5 litros" e "10 porções de 350 ml" no card; "cerca de 300 g de sopa por sachê" na ficha. (Mesma divergência de `holyfoods-fatos-0511.md` §8.1, que segue.)

## 9. Mexidona (home e produtos, 20/11/2026, curl)

### 9.1. Home e condições (sem cupom)

- Faixa: "Mexidona, quem prova se apaixona! 20% de CASHBACK Com nota 100 no DESROTULANDO; 5% OFF no PIX; Pague em 4x sem juros; FRETE GRÁTIS para todo Brasil nas compras acima de R$250". Também: "Cupom: MEXIDONA (10% OFF na 1ª compra)".
- **Não citar o cupom MEXIDONA em nenhum texto.** O 5% no Pix e o cashback entram como condição de conta quando a regra pedir (ver a pauta HF6).
- Razão social, pela JSON-LD dos produtos: "Mexidona Foods LTDA".
- Autodescrição da loja (home): "Pronto em menos de 15min"; "Sem Glúten. Sem Leite. Sem Sal. Sem Glutamato. Sem Conservantes."; "Poucas Calorias! Mais Proteínas! Mais Fibras!" Essas frases são alegações da marca: não usar como fato nosso. "Sem sal" e "Sem conservantes" não batem com o texto de preparo ("acrescente sal a gosto") e com a lista de ingredientes de alguns produtos: divergência de rótulo, registrar.
- Categorias do menu: "O que você quer: Emagrecer; Produtos Veganos; Mais Proteína; Melhorar meu Intestino; Opções para Crianças". Não usar as categorias como claim.

### 9.2. Produtos lidos (preço, porção, rendimento, ingredientes, tabela)

| Produto (slug) | Preço visível | Preço na JSON-LD | Porção e rendimento | Preparo (fogão) |
|---|---|---|---|---|
| Sopa da Nona (`sopa-da-nona-15`, ref. 1076) | R$ 19,90 | 19,90 | Porção 53 g (1/3 xícara); "Porções por embalagem: 3"; "rende até 3 pratos" | 1 litro de água; ferver; despejar o pacote e sal; cozinhar cerca de 20 min |
| Sopa Amarela, "receita original da sopa da vovó" (`sopa-amarela-14`, ref. 1073) | R$ 19,90 | 19,90 | Porção 43 g; "Porção por embalagem: 3"; "rende 3 pratos de 250ml" | "Ferva 1,2 litros"; sal; 20 min. (Divergência: 3 pratos de 250 ml são 750 ml; a água pedida é 1,2 L.) |
| Sopa de Frango Defumado (`sopa-de-frango-defumado-28`, ref. 1088) | R$ 19,90 | 19,90 | Porção 37 g; "cerca de 3" porções; "Um pacote ... 110g prepara cerca 1 litro de sopa" | 1 litro; 15 min |
| Risoto Sabor Queijo 180 g, "ZERO LACTOSE, 20 g de proteína" (`risoto-sabor-queijo-180g-mexidona-11`, ref. 1078) | R$ 19,90 | 19,90 | Porção 60 g (1/3 xícara); "cerca de 3 porções"; "rende até 800 g" | 1 litro de água; pote à parte; fogo médio; água aos poucos |
| Risoto de Cogumelos (`risoto-de-cogumelos-9`, ref. 1080) | R$ 19,90 | 19,90 | Porção 60 g; "cerca de 3 porções"; "rende até 800 g" | idem (1 litro) |
| Mac Frango 100 g (`mac-frango-pct-100g-mexidona-111`, ref. 1113) | R$ 21,90 | 19,90 | Pacote de 100 g = "1 prato com cerca de 450 g" | No fogão: massa e 400 ml de água quente, fogo médio 4 min; depois o sachê de molho e sal; 1 a 2 min mexendo |
| Mac Cogumelo 100 g (`mac-cogumelo-pct-100g-mexidona-110`, ref. 1114) | R$ 21,90 | 19,90 | Pacote de 100 g = "1 prato com cerca de 450 g" | idem |

- **Divergência de preço nos macs:** preço visível R$ 21,90 e JSON-LD R$ 19,90. Confirmar no navegador (PENDENTE: navegador).
- Preço de venda: nenhum "preço riscado" foi lido nos produtos de Mexidona; os valores acima são o que a página e a JSON-LD dizem. Não há prova de desconto.

### 9.3. Tabelas (texto da página, 20/11/2026)

- **Sopa da Nona:** porção 53 g: 63 kcal; carb. 12 g; açúcares totais 0; açúcares adicionados 0; proteína 3,8 g; gord. totais 0; gord. sat. 0,0; fibra 3,7 g; sódio 12 mg. (Coluna 100 ml: 166 kcal, 30 g carb., 9,5 g prot., 9,2 g fibra, 20 mg sódio.)
- **Sopa Amarela:** porção 43 g: 62 kcal; carb. 12 g; açúcares totais 0; **açúcares adicionados 1,4 g**; proteína 0,9 g; gord. totais 0,2 g; gord. sat. 0; fibra 1,1 g; sódio 15 mg. (Coluna 100 ml: 155 kcal, 30 g carb., 0,3 g açúcares totais, 0 açúcar adicionado.) **Divergência interna:** 1,4 g de açúcar adicionado por porção e 0 na coluna de 100 ml, com açúcares totais 0 por porção. Conferir na embalagem.
- **Sopa de Frango Defumado:** porção 37 g: 51 kcal; carb. 10 g; açúcares 0; proteína 2 g; gord. totais 0,4 g; gord. sat. 0,1 g; fibra 1,0 g; sódio 2,8 mg.
- **Risoto Sabor Queijo 180 g:** porção 60 g: 78 kcal; carb. 16 g; açúcares 0; proteína 2,5 g; gord. totais 0,2 g; gord. sat. 0,1 g; fibra 1,2 g; sódio 17 mg. Aminoácidos listados (histidina etc.). (Coluna 100 g: 214 kcal, 45 g carb., 7 g prot., 47 mg sódio.) **Não fecha:** 60 g × 214 kcal/100 g = 128 kcal, e a porção declara 78. Não usar uma coluna sem a outra.
- **Risoto de Cogumelos:** porção 60 g: 85 kcal; carb. 18 g; proteína 3 g; gord. totais 0,2 g; fibra 1,1 g; sódio 23 mg. (Coluna 100 g: 212 kcal, 45 g carb., 6,7 g prot., 58 mg sódio.) Mesma divergência do risoto de queijo.
- **Mac Frango 100 g (100 g = 1 pacote):** coluna da 2ª: 362 kcal; carb. 62 g; açúcares totais 0,7 g; açúcares adicionados 0; **proteína 24 g**; gord. totais 1,6 g; gord. sat. 0,2 g; fibra 5 g; sódio 213 mg. (Coluna 1ª, 100 g pronto: 80 kcal, 13,8 g carb., 5 g prot., 47 mg sódio.)
- **Mac Cogumelo 100 g:** 365 kcal; carb. 61 g; **proteína 23 g**; gord. totais 2,7 g; fibra 5 g; sódio 257 mg (1ª coluna 100 g pronto: 81 kcal, 5 g prot., 57 mg sódio).
- Base das colunas de Mexidona: cabeçalho "100g**" = alimento pronto, e a coluna seguinte = o pacote ou a porção. Não está escrito em todas as tabelas; a conta do artigo usa só a coluna de porção ou de pacote e escreve a base.

### 9.4. Ingredientes (texto da página)

- Sopa da Nona: "Lentilha rosa, painço, cebola, cenoura, tomate, alho, salsinha e cúrcuma." Alergênicos: "PODE CONTER AVEIA, AMENDOIM, SOJA, AMÊNDOA, AVELÃ, CASTANHA-DE-CAJU, CASTANHA-DO-PARÁ, NOZES, PISTACHE E CASTANHAS. NÃO CONTÉM GLÚTEN."
- Sopa Amarela: "Massa alimentícia de arroz (farinha de arroz, fécula de mandioca, farinha de banana verde e cúrcuma), batata, cenoura, semente de girassol, tomate, cebola, alho-poró e cúrcuma."
- Risoto Queijo: "Arroz arbório, cebola desidratada, alho desidratado, aroma natural, levedura nutricional, proteína isolada de ervilha, cúrcuma em pó, salsinha desidratada e extrato de levedura."
- Risoto Cogumelos: "arroz arbóreo, cogumelo funghi seco, alho desidratado, proteína isolada de ervilha, proteína isolada de arroz, cogumelo shiitake desidratado, cebola desidratada e alho desidratado."
- Mac Frango: "Ingredientes da massa: Farinha de arroz integral, farinha de arroz, proteína isolada de ervilha, fécula de mandioca, goma xantana e goma guar. Ingredientes do tempero em pó: Cebola desidratada, frango desfiado desidratado, proteína isolada de ervilha, batata doce desidratado em pó, alho desidratado, extrat[o]..." (texto cortado na leitura).
- Mac Cogumelo: massa igual ao Mac Frango; tempero com "proteína isolada de ervilha, cebola desidratada, cogumelo funghi seco, castanha de caju triturada, alho desidratado, extrato de levedura...". Página diz "O Mac Cogumelo é vegetariano/vegano".

### 9.5. Textos de venda da Mexidona (não usar como fato)

- "Sopa da Nona... rica em fibras... 9,2 g de fibras... pronta em cerca de 20 minutos" (texto da página).
- "Pronto em menos de 15 min" (home). "Refeição saudável... 100% livre de culpa" (Sopa Amarela).
- "Mac Frango – O 1º Macarrão Proteico Instantâneo Saudável do Brasil!" (título). "1º" é alegação da marca.
- Sopa Amarela: "Benefícios de incluir semente de girassol na dieta..." (texto de saúde, não usar).

## 10. Correções ao `holyfoods-fatos-0511.md` e ao `holyfoods-e-boa`

- Nada novo que invalide o `holyfoods-fatos-0511.md`. Esta leitura confirma: avulso 13,93/19,90; pack 41,93/59,90; Projeto 102,90/147,00; campanha de 30%.
- **O Projeto 21 Dias sai R$ 4,90 por sachê com os 30%, e o pack sai R$ 4,19 pelo mesmo sachê** (mesmo peso e mesma tabela). Antes desta leitura, a conta do kit não tinha essa comparação.
- Sem data de fim da campanha publicada em 20/11 (ver §1).

## 11. Não lido e pendências

- Página de cada produto da Mexidona no navegador (preço do mac: R$ 21,90 ou R$ 19,90). PENDENTE: navegador do Bruno.
- Sites de avaliação e Reclame Aqui não foram relidos (não entram no briefing de HF2, HF6 e HF9).
- Checkout: o EMCASA no SKU do Projeto 21 Dias (KIT21DAY) não foi testado. PENDENTE: teste de checkout (Bruno).
- Mexidona: frete e prazo de entrega, política de troca e o programa "Desrotulando" não foram lidos.
