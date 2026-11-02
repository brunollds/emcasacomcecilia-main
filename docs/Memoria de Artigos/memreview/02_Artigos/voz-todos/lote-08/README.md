# Rodada de voz, lote 08 (30 artigos, ids 710 a 775)

Último dos 8 lotes: com ele, os 275 artigos em português passaram pelas duas passadas. As regras de todos os lotes estão em `../README.md` (tamanho, cartão, alimento infantil e dieta enteral).

## Arquivos
- `resposta-muse.md`: a passada do Muse, 130 consertos (V 58, R 31, P 24, D 16, K 1) e 13 quadros.
- `passada-paralela.md`: a segunda passada cega, 122 consertos (P 50, R 35, D 19, V 15, K 3), 20 quadros e 8 achados de foto.
- `confronto.md`: 66 consertos no mesmo trecho, 64 só do Muse e 56 só da paralela. As duas listam os mesmos 4 artigos de família: `hostinger-ou-hostgator`, `hostinger-reach-ou-mailchimp-brevo`, `wordpress-na-hostinger` e `vestido-de-festa-shein`.
- `lista.md`: os 30 artigos.

## Conferência do Claude (02/11/2026)
Script sobre os 252 consertos, contra a `origin/main` em `38562df6` (com o lote 07 aplicado). Os 30 JSONs estão iguais à base da revisão (`b4787582`).
- **Trecho literal:** 241 de 252. Os 11 que não batem existem no artigo: ou o trecho veio com aspas retas onde o artigo tem aspas curvas (“ ”), ou o link veio cortado, ou o trecho junta dois parágrafos seguidos (`kit-toda-up-quando-compensa` e o P da paralela em `outlet-insider-masculino-vale-a-pena`). Procure pelo começo da frase. Nos que juntam dois parágrafos, veja "Kits da Toda Up" abaixo.
- **Uso real:** nenhum conserto apaga uso. Os que tiram primeira pessoa tiram ressalva negativa ("Não testamos o cupom nesta rodada", com o `editorialNote` dizendo a fonte), o "nossa" de "a conta, nossa" ou falso positivo. Ficam: o teste de sacola dos dois body splash, "No nosso teste no carrinho" do brinde Skelt, "O Bruno testou" no Reach, "Testamos com o kit de 5 Tech" e os testes de carrinho dos outlets.
- **Fato novo:** nenhuma data ou muleta nova, e nenhum número que o artigo não tenha. Os "R$" novos repetem preço do artigo. Dois consertos da paralela trazem afirmação que o artigo não tem (ver "Não entram").
- **Veredito D:** "eu levaria" só em Casa-Malas, Moda e Tecnologia. Em Beleza e Suplementos, todos na forma impessoal, pelos números. O alerta do script em `skinup-ou-cotton-up-toda-up` é falso positivo: lingerie é Moda.
- **Mais longo:** 15 (7 do Muse, 8 da paralela). Vale o teto de `../README.md`.

## Não entram
- **`taca-base-esfera-e-tacas-coloridas`, P da paralela na de 450 ml** ("tamanho de taça de vinho tinto: cabe a dose e sobra espaço para girar") e **V7 da paralela na de 250 ml** ("mais fechada, segura o gás do espumante"). O artigo diz que a loja não informa para qual bebida serve a de 450 ml, e o P ainda tira a altura, o diâmetro e o vidro. As duas frases ficam como estão.
- **`camiseta-insider-qual-escolher`, P da paralela na Tech** (de 107 para 158 caracteres): passa do teto e tira a composição (92% modal e 8% elastano) e o preço. Se quiser, entra só "Para o dia a dia," no começo da frase atual.
- **`mochila-escolar-bagaggio`, P da paralela na Star Candy:** tira a medida 42 × 30 × 15 cm. Pode entrar só se a medida ficar.

## Decisões
- **`mochila-notebook-bagaggio-qual-escolher`, couro:** as duas passadas cortam "nenhuma delas foi usada por nós, então não dizemos qual dura mais". O primeiro-pessoa sai, mas o limite fica, porque quem compara couro e poliéster pergunta qual dura mais. Fica assim: "O material está na tabela; qual dura mais, a página não diz." O R da paralela no mesmo capítulo ("escolha pela medida que cabe no seu notebook") pode vir no lugar do "ambas com etiqueta Pequena" só se a etiqueta continuar na tabela.
- **Kits da Toda Up (`kit-toda-up-quando-compensa`):** os P da paralela abrem cada kit pela economia, que está no parágrafo seguinte. Entram no primeiro parágrafo do kit, e a mesma economia sai do parágrafo seguinte, para não repetir. Ficam os fatos do primeiro parágrafo que o conserto deixa de fora: a descrição da loja entre aspas, a Case tamanho P (8 cm) que "acompanha" o Invisible Up e a Calcinha Biquíni Cotton Up.
- **Cartões das três Hostinger** (`hostinger-reach-ou-mailchimp-brevo`, `hostinger-ou-hostgator`, `wordpress-na-hostinger`): vale `../README.md`. O cartão leva o K da paralela e o dado (reembolso, Black Friday com "não testamos essa oferta", ciclos de 48 e 36 meses, renovação de 3 a 5 vezes) vai para o parágrafo, onde o Muse sugere no Reach. Se o dado já está no corpo, não repete.
- **Capítulos de bastidor:** "Como este guia foi feito" (bronzeado, removedor e iluminador) e "Como lemos os preços" (`presente-natal-bagaggio`) repetem o `editorialNote`. Saem do corpo, como os "Como comparamos" do lote 06; o que não estiver no `editorialNote` vira uma linha na legenda da tabela. "Idade: sem indicação na loja" em `mochila-escolar-bagaggio` fica, porque é o que o leitor pergunta.
- **Veredito em capítulo novo:** `jogo-americano-tecido-tamanho-cor`, `camiseta-insider-qual-escolher`, `camiseta-feminina-insider-qual-escolher` e `taca-base-esfera-e-tacas-coloridas` não têm capítulo de veredito. O D entra num capítulo curto antes do FAQ, com título que já decide (Job 2, seção 5), sem data. Onde as duas passadas propõem D, uma frase só: a que mantém o motivo pelos números do artigo.

## Quadro "Leve se / Passe se"
- **Entram** nos guias e comparativos que não são de família. Onde as duas passadas propõem, junte numa lista de até 3 frases por lado.
- **Saem do quadro** as frases que dependem de estoque: "confira o estoque, que ela estava indisponível no dia da publicação" (glutamina, do Muse) e "resta uma peça" da Oversized (`camiseta-insider-qual-escolher`, da paralela).
- **Outlets da Insider:** "o seu tamanho aparece na grade da cor que você quer" pode ficar, porque é como o Outlet funciona e não depende de um dia.
- Os 4 artigos de família ficam sem quadro até a rodada das traduções.

## Como aplicar
1. **Um trecho, uma versão:** nos 66 do mesmo trecho, a versão que mantém todos os fatos e respeita o tamanho; empate, a mais curta.
2. **Só-Muse (64) e só-paralela (56) entram**, com as ressalvas acima.
3. **Fotos:** os 8 achados de imagem ficam para outro PR.
4. **Gates:** `node scripts/content/build-index.mjs`, `npm run validate:content` e `npm run test:article-d2`. Um PR para o lote, com o Gate 1 verde.

Backup: `muse-rev/backup-voz-lote-08` (base `b4787582`, fora do repositório). Desfazer = reverter o PR.
