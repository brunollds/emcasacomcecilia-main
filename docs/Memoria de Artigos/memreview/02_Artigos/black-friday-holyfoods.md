---
titulo_provisorio: "Black Friday HolyFoods 2026: 30% no site todo, os kits da Black e o cupom EMCASA por cima"
seo_title: "Black Friday HolyFoods: 30% no site e o cupom EMCASA"
slug_sugerido: "black-friday-holyfoods"
parceiro: "[[HolyFoods]]"
parceiro_slug: "holyfoods"
category: "cupons-como-usar"
reviewKind: "guia"
type: "Guia de Black Friday"
status: "pronto-para-deploy"
responsavel: "Job-4"
proxima_acao: "deploy junto com /cupons/holyfoods (#590) ou depois; IndexNow"
bloqueado_por: "-"
data_criacao: "2026-11-05"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
affiliate: "holyfoods"
coupon: "EMCASA"
---

# Briefing: Black Friday HolyFoods

O quarto artigo de onboarding da HolyFoods, e o mais urgente, porque a "Black da Holy" já está no ar. Modelo:
[[black-friday-simple-organic]].

## Busca
"holyfoods black friday" ainda não tem sugestão no autocompletar (05/11). O artigo é de oportunidade: a campanha está no
ar, e o cupom soma com ela (teste de 05/11), o que dá o argumento do snippet.

## Esqueleto
1. **Resposta rápida:** a loja dá 30% em todo o site, já aplicados nos preços, e o EMCASA tira mais 15% na tela de
   finalizar. Sem preço.
2. **O que é a Black da Holy e até quando:** "30% OFF no site todo", no lugar do desconto progressivo, nos avulsos e nos
   kits. A data de fim vem do contador do topo, lido no Chrome no dia. Sem data, "enquanto o contador estiver no ar".
3. **Os kits da Black:** Descoberta (8 refeições), Rotina Resolvida (15) e Despensa Cheia (38). Tabela com o preço de
   antes, o da Black e o custo por refeição, com o link de cada kit na primeira célula. A data vai só na legenda.
4. **Avulsos e packs:** R$ 13,93 o avulso e R$ 41,93 o pack de 10 sachês. Conta nossa, marcada, do custo por porção da
   sopa (1 sachê = 4 porções).
5. **O cupom na Black:** os dois testes de 05/11, com o antes e o depois. Kit não testado: conferir no checkout.
6. **Frete grátis na Black:** a tabela por região (R$ 199 em SP; R$ 249 em RJ, MG, DF e PR; R$ 289 em GO, SC, ES e RS;
   os demais no checkout).
7. **Garantia de 30 dias:** provar uma unidade e devolver o resto, o que tira o medo de pedir um kit grande.
8. **Quadro "Leve se / Passe se".**
9. **Perguntas frequentes:**
   - "Precisa de cupom para os 30%?" Não.
   - "O EMCASA soma com a Black?" Sim, nos testes.
   - "Qual kit para começar?"
   - "Tem frete grátis?"

**Snippet:** `metaDescription` com "EMCASA" e "15%" na 1ª frase, por exemplo: "Use o EMCASA e tire mais 15% da HolyFoods
na Black, por cima dos 30% do site, na tela de finalizar a compra." Ajustar ao limite de 155 caracteres.

**Banner:** se a campanha tiver data de fim, a sessão de banners decide (`content/campanhas/`), não este artigo.

**Depois da Black:** o artigo vira "a Black acabou", e a seção do cupom volta ao progressivo, com teste novo.

## Regras do onboarding
As mesmas do [[holyfoods-e-confiavel]]. A catraca aceita até 8 datas no corpo com `bodyDatesReason: "campanha"`.

## Rascunho (Job 2, 05/11/2026)

### Metadados

- **title:** Black Friday HolyFoods 2026: 30% no site todo, os kits da Black e o cupom EMCASA por cima
- **seoTitle:** Black Friday HolyFoods: 30% no site e o cupom EMCASA (52 caracteres)
- **description:** A Black da HolyFoods dá 30% no site todo, já no preço, e o cupom EMCASA tirou mais 15% por cima nos nossos testes. Veja qual dos três kits compensa e o mínimo do frete grátis. (175 caracteres)
- **metaDescription:** Black Friday HolyFoods: use o cupom EMCASA e tire mais 15% por cima dos 30% do site, na tela de finalizar a compra. Veja os kits, o frete e a garantia. (151 caracteres; o código termina no caractere 42)
- **slug:** black-friday-holyfoods
- **category:** cupons-como-usar
- **reviewKind:** guia
- **type:** Guia de Black Friday
- **affiliate:** holyfoods
- **coupon:** EMCASA
- **bodyDatesReason:** campanha
- **editorialNote:** Podemos receber comissão pelo cupom e pelos links. Ninguém da equipe provou os produtos. (88 caracteres)
- **cta:**
  - label: Ir para a HolyFoods
  - text: O link abre a loja, mas não aplica o cupom: copie o EMCASA e cole na tela de finalizar a compra.
  - url: `https://www.holyfoods.com.br/?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz` (sponsored, como veio)
- **decision:**
  - takeIf:
    - Leve se você vai pedir massas, risotos e sopas em quantidade e quer o EMCASA por cima dos 30%, aplicado na tela de finalizar a compra.
    - Leve se é a sua primeira vez na loja: a garantia de 30 dias deixa abrir uma unidade e devolver as outras fechadas.
  - skipIf:
    - Passe se você espera que o cupom entre pelo carrinho ou pelo link da parceria: o código só entra na tela de finalizar, e você precisa copiá-lo.
    - Passe se vai pedir o Descoberta ou a Rotina Resolvida contando com o EMCASA sem conferir: só o carrinho igual ao Despensa Cheia foi testado.
    - Passe se precisa da entrega num dia certo: a preparação leva até 3 dias úteis e o transporte soma a isso.
- **relatedArticles (sugestão):** cupom-holyfoods-como-usar, holyfoods-e-confiavel, holyfoods-reclame-aqui-nota-reputacao

### Resposta rápida

A HolyFoods está na Black: são 30% no site todo, já aplicados nos preços, sem cupom. O cupom EMCASA tira mais 15% e, nos nossos testes, somou com esses 30%, mas só entra na tela de finalizar a compra. A loja não publicou o fim da campanha, então o que decide é qual kit levar: veja a comparação abaixo.

### O que é a Black da Holy e até quando vale

A Black da Holy já está no ar e não pede cupom: a faixa do topo da loja anuncia 30% OFF no site todo, e os 30% já estão no preço, nos avulsos e nos kits. Na sacola aparece o aviso "30% OFF já aplicado nos preços".

A loja informa: nesta campanha, os 30% substituem o desconto progressivo por quantidade que ela tem fora da Black. Ou seja, o preço das tabelas abaixo já é o da Black; o que se soma por cima é o EMCASA, no capítulo do cupom.

A faixa traz um contador, mas ele não marca data, e a loja não publicou o fim: a Black vale enquanto a campanha estiver no ar. Quem precisa do pedido até um dia certo confere o preço na loja na hora de fechar.

### Os kits da Black: o que vem em cada um e quanto custa por refeição

Kit maior não é desconto maior: os três custam a soma dos avulsos já com os 30%, e o que muda é a quantidade e se vem sopa. Eles ficam na home da loja, na seção "Escolha seu kit da Black", e para quem nunca pediu a loja indica o Descoberta. O nome de cada kit abaixo leva à home, porque o kit não tem página própria: o botão "+ Adicionar" põe cada item avulso na sacola. O link não aplica o cupom.

| Kit | O que vem | De | Por | Por refeição |
|---|---|---|---|---|
| [Descoberta](https://www.holyfoods.com.br/?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz) (8 refeições) | 2 Mac Queijo, 2 Mac Alfredo, 2 Risoto Funghi e 2 Risoto Al Mare | R$ 159,20 | R$ 111,44 | R$ 13,93 |
| [Rotina Resolvida](https://www.holyfoods.com.br/?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz) (15 refeições) | 4 Mac Queijo, 3 Mac Alfredo, 3 Risoto Funghi, 3 Risoto Al Mare e 2 Risoto de Queijo | R$ 298,50 | R$ 208,95 | R$ 13,93 |
| [Despensa Cheia](https://www.holyfoods.com.br/?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz) (38 refeições) | 1 Pack Canja da Mamãe, 1 Pack Sopa Low Carb, 6 Mac Queijo, 4 Mac Alfredo, 4 Risoto Funghi e 4 Risoto Al Mare | R$ 478,00 | R$ 334,60 | R$ 8,81 |

Legenda: Preços da loja, 05/11, já com os 30%; o "de" é o preço de lista e o "por refeição" é a conta da loja, que conta cada sachê de pack como uma refeição.

Conta nossa, pelos preços da tabela: multiplique o avulso pelo número de itens e chega no preço de cada kit, nem um centavo a menos. O "por refeição" menor do Despensa Cheia vem dos dois packs de sopa: o sachê do pack sai por menos de um terço de um risoto ou de um mac, e a loja conta cada sachê como uma refeição. Massa e risoto custam o mesmo em qualquer kit, então quem não quer sopa não ganha nada no kit grande.

(Imagem do capítulo: Mac Queijo, ver plano.)

### Avulsos e packs: o que cada embalagem rende

Fora dos kits, sopa avulsa, risoto e mac custam o mesmo na Black, então o que decide é o que cada embalagem rende.

| Produto | De | Por | Rende |
|---|---|---|---|
| [Sopa da Vovó](https://www.holyfoods.com.br/products/sopa-da-vovo?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz) | R$ 19,90 | R$ 13,93 | 1 litro, 4 porções de 250 g |
| [Pack Sopa da Vovó](https://www.holyfoods.com.br/products/pack-sopa-da-vovo?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz) | R$ 59,90 | R$ 41,93 | 10 sachês individuais |
| [Risoto Funghi](https://www.holyfoods.com.br/products/risoto-funghi?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz) | R$ 19,90 | R$ 13,93 | 1 refeição, 320 g |
| [Mac Queijo](https://www.holyfoods.com.br/products/novo-mac-queijo?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz) | R$ 19,90 | R$ 13,93 | 1 refeição, 380 g |

Legenda: Mesma leitura da tabela dos kits, com os 30% já no preço; o rendimento é o da página de cada produto.

A sopa avulsa sai a R$ 3,48 por porção, e o pack, de 10 sachês individuais, a R$ 4,19 por porção, pelo número que a loja mostra no card dele. Pelos números dela, a porção do pack sai mais cara que a do avulso: o que o pack compra é o sachê de uma porção, sem sobra na panela. O tamanho da porção, confira na embalagem que chegar.

Risoto e mac são uma refeição por embalagem, com 20 g de proteína. A página dos produtos diz que são sem glúten e que alguns levam leite e lactose, então confira o rótulo se isso importa na sua casa. Ficam fechados na despensa, sem congelador, e o preparo é de 15 a 20 minutos no fogão. Quem quer rendimento pelo preço vai no avulso; quem quer a porção separada de sopa vai no pack.

(Imagem do capítulo: Pack Sopa da Vovó, ver plano.)

### O cupom EMCASA na Black: o que os testes mostraram

O EMCASA tirou 15% por cima dos 30% da Black nos dois testes que fizemos, e só entra numa tela: a de finalizar a compra, no endereço seguro.holyfoods.com.br, que é o checkout da própria loja. No carrinho ele não entra, e o link da parceria também não o aplica: ele abre a loja, mas o código você copia e cola.

1. Monte o carrinho com os itens ou com o kit e clique em "Finalizar compra".
2. Na tela seguinte, procure "Inserir cupom de desconto".
3. Cole o EMCASA em "Código do cupom" e clique em "Adicionar".
4. Confira a linha "Descontos" antes de pagar.

Os dois testes, nessa tela:

| Teste | Carrinho | Antes | Cupom | Depois |
|---|---|---|---|---|
| Sopas | 1 Pack Sopa da Vovó e 2 Sopas Detox | R$ 69,79 | −R$ 10,47 | R$ 59,32 |
| Despensa | 20 itens: 2 packs de sopa, massas e risotos, com frete grátis | R$ 334,60 | −R$ 50,19 | R$ 284,41 |

Legenda: Testes na tela "Finalizar compra", 05/11, com os 30% da Black já nos preços.

Nos dois, o desconto foi de 15% sobre o preço que já tinha os 30%. O segundo carrinho tem os itens e o preço do Despensa Cheia, e como todo kit entra na sacola como itens avulsos, o EMCASA foi testado num carrinho igual ao dele. O Descoberta e a Rotina Resolvida não passaram pelo teste: confira a linha "Descontos" no checkout antes de pagar.

Os dois descontos não dão 45%: no carrinho igual ao Despensa Cheia, o preço final ficou 40,5% abaixo do de lista. As condições do dia estão na página do [cupom HolyFoods](/cupons/holyfoods), e o passo a passo com as soluções para o código que não entra, em [Como usar o cupom da HolyFoods](/reviews/cupom-holyfoods-como-usar). O EMCASA é da loja online: no Mercado Livre vale o preço do anúncio.

(Imagem do capítulo: Risoto Funghi, ver plano.)

### Frete grátis na Black: o mínimo de cada região

O frete grátis da Black depende do estado e do valor do pedido. Os mínimos, pelo FAQ da home da loja:

| Estados | Frete grátis a partir de |
|---|---|
| SP | R$ 199,00 |
| RJ, MG, DF e PR | R$ 249,00 |
| GO, SC, ES e RS | R$ 289,00 |
| Demais estados | Frete e prazo no checkout |

Legenda: Mínimos da campanha da Black, no FAQ da home da loja.

O mínimo considera o preço depois dos descontos dos produtos. Pelos preços dos kits, o Descoberta fica abaixo dos três mínimos, a Rotina Resolvida passa só o de SP e a Despensa Cheia passa os três. A loja fala em desconto dos produtos, não em cupom: com o pedido perto da linha, confira o frete depois de aplicar o EMCASA.

Frete grátis não é prazo. A política da loja diz que a preparação para postagem leva até 3 dias úteis depois da aprovação do pagamento, e o transporte soma a isso; o prazo para o seu CEP aparece no checkout. A reclamação mais comum no Reclame Aqui é produto não recebido, e os números estão em [HolyFoods no Reclame Aqui](/reviews/holyfoods-reclame-aqui-nota-reputacao). Guarde o número do pedido e use o "Rastrear pedido" do menu da loja.

### Garantia de 30 dias: como pedir um kit grande com folga

A garantia de 30 dias é o que tira o medo do kit grande: ela vale depois de receber e aceita uma unidade aberta, desde que as demais estejam fechadas. A devolução não tem custo, e o reembolso inclui a unidade que você abriu.

O pedido é por e-mail, em contato@holyfoods.com.br, com o número do pedido. O reembolso volta pelo meio de pagamento da compra: no Pix, até 7 dias úteis depois de validada a devolução; no cartão, pode aparecer em até duas faturas.

Na prática: se você vai pedir o Despensa Cheia sem conhecer a linha, abra uma unidade e mantenha as outras fechadas até decidir.

### Qual kit levar na Black

Pelos números da tabela, o perfil decide:

- **Primeira vez na loja:** o Descoberta. É o menor, a loja o indica para conhecer, e a garantia cobre a unidade aberta. Ele fica abaixo do mínimo do frete grátis em qualquer região, então some o frete na conta.
- **Abastecer a despensa:** o Despensa Cheia. É o que passa os três mínimos publicados do frete grátis e o único com o carrinho testado no EMCASA. O custo por refeição menor vem das sopas; se você não quer sopa, a Rotina Resolvida é só massa e risoto, com 15 refeições.
- **Pedido avulso:** a sopa, o risoto e o mac custam o mesmo na Black. Escolha pelo rendimento da tabela de avulsos.

> **Destaque (emphasis, depois do 1º parágrafo):** Pelos números da tabela, quem quer abastecer a despensa fecha a melhor conta por refeição no Despensa Cheia; quem só quer conhecer começa pelo Descoberta.

Antes de pagar:

- Copie o EMCASA antes de abrir a loja.
- Cole o código na tela de finalizar, não no carrinho.
- Veja a linha "Descontos" e o frete antes de pagar.
- Guarde o número do pedido: você vai precisar dele no rastreio e na garantia.

### Perguntas frequentes

- Precisa de cupom para ter os 30% da Black da HolyFoods? Não: os 30% já estão no preço, nos avulsos e nos kits. O EMCASA é um desconto a mais, na tela de finalizar a compra.
- Até quando vai a Black Friday da HolyFoods? A loja não publicou a data de fim: vale enquanto a campanha estiver no ar, e o capítulo da campanha diz como conferir.
- O cupom EMCASA soma com a Black? Somou nos nossos testes, com 15% sobre o preço que já tinha os 30%; o capítulo do cupom traz os dois carrinhos.
- Qual kit da Black da HolyFoods escolher para começar? A loja indica o Descoberta para conhecer a linha; a comparação dos três está no capítulo "Qual kit levar".
- A HolyFoods tem frete grátis na Black? Tem, a partir de um mínimo que muda por estado; a tabela está no capítulo do frete.

### Plano de imagens

Origem de todas: fotos oficiais dos produtos no CDN da Shopify da loja, `https://cdn.shopify.com/s/files/1/0619/0206/1748/files/<arquivo>` (lidas no `/products.json`, 05/11). Nenhuma repete dentro do artigo. Nenhuma foto de outra criadora, de concorrente ou gerada por IA no produto.

| Onde | Arquivo de origem | O que mostra | Alt sugerido | Legenda sugerida | href |
|---|---|---|---|---|---|
| Capa (o Job 6 monta: logo da HolyFoods, "Black da Holy 30% OFF", o código EMCASA e "+15%"; fundo no verde da marca; produtos da loja em primeiro plano) | mac_queijo.png (1180²), risoto_funghi_transparent.png (1080²), sopa_sopa_da_vovo_-_pacote.png (1080²) | Os três formatos da loja lado a lado: Mac Queijo, Risoto Funghi e o Pack Sopa da Vovó | Mac Queijo, Risoto Funghi e Pack Sopa da Vovó da HolyFoods, sob o título Black Friday HolyFoods com o cupom EMCASA | - | - |
| "Os kits da Black: o que vem em cada um e quanto custa por refeição" | mac_queijo.png (1180²) | A embalagem do Mac Queijo, item dos três kits | Embalagem do Mac Queijo da HolyFoods, em foto oficial do produto no site da marca | O Mac Queijo está nos três kits da Black. Foto: HolyFoods. | https://www.holyfoods.com.br/products/novo-mac-queijo?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz (sponsored) |
| "Avulsos e packs: o que cada embalagem rende" | sopa_sopa_da_vovo_-_pacote.png (1080²) | O pacote do Pack Sopa da Vovó | Pacote do Pack Sopa da Vovó da HolyFoods, com 10 sachês, em foto oficial da loja | O Pack Sopa da Vovó vem com 10 sachês individuais. Foto: HolyFoods. | https://www.holyfoods.com.br/products/pack-sopa-da-vovo?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz (sponsored) |
| "O cupom EMCASA na Black: o que os testes mostraram" | risoto_funghi_transparent.png (1080²) | A embalagem do Risoto Funghi, item dos três kits | Embalagem do Risoto Funghi da HolyFoods, em foto oficial do produto no site da marca | O Risoto Funghi está nos três kits da Black. Foto: HolyFoods. | https://www.holyfoods.com.br/products/risoto-funghi?utm_source=afiliados&utm_medium=emcasacomcecilia&utm_campaign=inbazz (sponsored) |

Candidatas a mais uma, se o Job 6 quiser: risoto_almare_transparent.png no capítulo dos kits (item de três kits) e um recorte da faixa "BLACK DA HOLY / 30% OFF NO SITE TODO" da home, sem o contador, no capítulo da campanha. Os prints do checkout do Bruno (05/11) só entram com a aprovação dele e sem dado pessoal. Os fundos transparentes pedem fundo liso no corpo (`imageFit: contain`).

### Matriz de claims

| Afirmação | Tipo | Fonte exata | Status |
|---|---|---|---|
| A faixa do topo diz "BLACK DA HOLY / 30% OFF NO SITE TODO" | fato da loja | Home holyfoods.com.br, faixa (fatos-0511, seção 4) | verificado |
| Os 30% já estão aplicados sobre o preço regular, em avulsos e kits; nesta campanha substituem o progressivo; "sem cupom" | texto da loja | FAQ da home (fatos-0511, seções 3 e 4; complemento, seção 3) | verificado |
| O contador da faixa não tem data configurada (`data-end-date` vazio, 00:00:00); não há data de fim publicada | leitura no Chrome | Complemento, seção 2 | verificado; o corpo diz só "marca nenhuma data" e "não publicou o fim" |
| Kits: Descoberta (8), Rotina Resolvida (15), Despensa Cheia (38); conteúdo, "de", "por" e "por refeição" | fato da loja | Seção "Escolha seu kit da Black" da home (complemento, seção 3) | verificado |
| Kit sem página própria; "+ Adicionar" põe cada item avulso na sacola | leitura no Chrome | Complemento, seção 3 | verificado |
| A loja indica o Descoberta para a primeira compra | texto da loja | FAQ da home, "É minha primeira compra. Por qual kit eu começo?" (complemento, seção 3) | verificado |
| Kit = soma dos avulsos com 30% (8 × 13,93 = 111,44; 15 × 13,93 = 208,95; 2 × 41,93 + 18 × 13,93 = 334,60) | conta nossa | Complemento, seção 3 (conferida aqui) | conferido |
| "Por refeição" do Despensa Cheia conta cada sachê do pack como uma refeição (2 × 10 + 18 = 38; 334,60 / 38 = 8,81) | conta da loja, conferida | Complemento, seção 3 | conferido |
| De dos kits: 478,00 = 2 × 59,90 + 18 × 19,90 | conta nossa | Preços de lista (fatos-0511, seção 2) | conferido |
| Sopa avulsa: R$ 19,90, ou R$ 13,93; 1 litro, 4 porções de 250 g | fato da loja | Descrição do produto (complemento, seção 1) | verificado |
| R$ 3,48 por porção da sopa avulsa | conta nossa | 13,93 / 4 = 3,48; a loja mostra o mesmo valor no Kit Seca Barriga (complemento, seção 1) | conferido |
| Pack de sopa: R$ 59,90, ou R$ 41,93; 10 sachês individuais; "Rende 10 porções", R$ 4,19 por porção | fato da loja | Card da loja (complemento, seção 1) | verificado |
| Risoto e mac: R$ 19,90, ou R$ 13,93; uma refeição por embalagem; Funghi 320 g, Mac Queijo 380 g; 20 g de proteína | fato da loja | Produtos (complemento, seção 1; fatos-0511, seção 2) | verificado |
| Sem glúten; alguns com leite e lactose | texto da loja | Fatos-0511, seção 2 | verificado; sem alegação de saúde |
| Guardam-se fechados na despensa, sem congelador; preparo de 15 a 20 minutos no fogão | texto da loja | Fatos-0511, seção 2 | verificado |
| EMCASA tira 15%; entra só na tela "Finalizar compra" (seguro.holyfoods.com.br), "Inserir cupom de desconto" > "Código do cupom" > "Adicionar" | condição comercial e teste próprio | `couponsData.ts` (slug holyfoods); dossiê, seção 1 | verificado |
| Teste 1: R$ 69,79, −R$ 10,47, R$ 59,32 (Pack Sopa da Vovó e 2 Sopas Detox, já com os 30%) | teste próprio | Dossiê, seção 1 | verificado |
| Teste 2: R$ 334,60, −R$ 50,19, R$ 284,41, 20 itens, frete grátis | teste do Bruno | Dossiê, seção 1; complemento, seção 3 | verificado |
| O carrinho do teste 2 tem a composição e o preço do Despensa Cheia; os outros dois kits não foram testados | teste próprio | Complemento, seção 3 | verificado |
| 30% e depois 15% dão 40,5% a menos sobre o preço de lista (284,41 / 478,00 = 0,595) | conta nossa | Preços do teste 2; o corpo diz "no carrinho igual ao Despensa Cheia", sem repetir os valores | conferido |
| O sachê do pack sai por menos de um terço de um risoto ou de um mac (4,19 / 13,93 = 0,30) | conta nossa | Preços da tabela de avulsos | conferido |
| O link da parceria não aplica o cupom | condição comercial | Dossiê, seção 1 (`offerUrl`) | verificado |
| O cupom não vale no Mercado Livre; lá vale o preço do anúncio | condição comercial | Dossiê, seção 1 | verificado |
| Frete grátis: R$ 199 SP; R$ 249 RJ, MG, DF, PR; R$ 289 GO, SC, ES, RS; demais no checkout | texto da loja | FAQ da home (complemento, seção 4) | verificado |
| O mínimo considera o preço depois dos descontos dos produtos | texto da loja | Dossiê, seção 1 (confiança média) | verificado; se o cupom entra no mínimo não foi testado |
| Descoberta abaixo dos três mínimos; Rotina Resolvida (208,95) passa só SP (199); Despensa Cheia (334,60) passa todos (289) | conta nossa | Preços dos kits e mínimos | conferido |
| Preparação até 3 dias úteis depois da aprovação do pagamento; transporte soma; prazo e custo pelo CEP no checkout | texto da loja | Política de reembolso e entrega, v2.1 (complemento, seção 5) | verificado |
| "Produto não recebido" é a principal queixa no Reclame Aqui (29%) | dado público | Reclame Aqui, 05/11 (fatos-0511, seção 5); o corpo não repete o percentual | verificado |
| "Rastrear pedido" no menu da loja ("acompanhe a entrega em tempo real") | fato da loja | Menu da home, relido no Chrome em 05/11 (Job 3) | verificado |
| A sacola mostra "30% OFF já aplicado nos preços" e "Confira seu frete" durante a Black | leitura no Chrome | Carrinho lateral da loja, 05/11 (Job 3) | verificado |
| Garantia: 30 dias corridos depois de receber; vale com uma unidade aberta se as demais estiverem fechadas; sem custo; reembolso integral dos produtos devolvidos, inclusive a unidade provada | texto da loja | `/policies/refund-policy`, v2.1 (complemento, seção 5) | verificado |
| Pedido por contato@holyfoods.com.br; Pix até 7 dias úteis; cartão em até duas faturas | texto da loja | Mesma política (complemento, seção 5) | verificado |
| Ninguém da equipe provou os produtos | ressalva | Regras do onboarding | só no editorialNote |

### Contagens do redator

- Resposta rápida: 59 palavras, 3 frases, zero "R$", sem link, sem negrito.
- Datas no corpo: 2 (05/11 na legenda da tabela dos kits e 05/11 na legenda da tabela dos testes; nenhuma em título, legenda de foto, FAQ ou prosa).
- Links internos: 3 (/cupons/holyfoods com a âncora "cupom HolyFoods"; /reviews/cupom-holyfoods-como-usar; /reviews/holyfoods-reclame-aqui-nota-reputacao). O "é confiável" fica só nos relacionados.
- Rótulos: "A loja informa:" 1 (campanha); "Conta nossa:" 1 (kits); "Regra prática" 0; "Recebi:/Usei:" 0.
- "segundo a loja": 0. "ninguém usou" no corpo: 0 (só no editorialNote).
- Títulos em pergunta: 0. emphasis: 1 (capítulo "Qual kit levar na Black").
- Descrição de sabor: 0. Efeito de saúde, emagrecimento, detox como efeito, medicamento: 0 ("Detox" só no nome da Sopa Detox, na tabela de teste).
- Cupom de terceiros ou de primeira compra: 0.
- Campanha: sem data de fim em lugar nenhum.

## Revisão (Job 3, 05/11/2026, Claude)
Rascunho conferido contra o `holyfoods-fatos-0511.md`, o complemento de 05/11 (vale onde divergem), o dossiê, o Anexo-Suplementos-Alimentos e a voz; mais três fatos relidos no Chrome pela sessão em 05/11 ("Rastrear pedido" no menu, a sacola com "30% OFF já aplicado nos preços" e o campo do cupom só na tela "Finalizar compra"). Contas refeitas: 8 × 13,93 = 111,44; 15 × 13,93 = 208,95; 2 × 41,93 + 18 × 13,93 = 334,60; 334,60 / 38 = 8,81; 478,00 = 2 × 59,90 + 18 × 19,90; 69,79 − 10,47 = 59,32 e 334,60 − 50,19 = 284,41 (15% exatos); 284,41 / 478,00 = 0,595 (40,5% a menos); 13,93 / 4 = 3,48; 41,93 / 10 = 4,19. Contagens: resposta rápida com 59 palavras, 3 frases, sem R$, sem link; datas no corpo 2 (as duas legendas de tabela, que a catraca conta como corpo, dentro das 8 do `bodyDatesReason: campanha`), nenhuma em título, legenda de foto ou FAQ; 3 links internos; "A loja informa:" 1, "Conta nossa" 1; "segundo a loja" 0; "não testamos" 0 (a única ressalva de teste fica no capítulo do cupom, com o que fazer); 1 `emphasis`; FAQ com 5 itens em "Pergunta? Resposta."; `decision` com 2 e 3 frases, sem R$; `description` com 175 caracteres; `metaDescription` com 151, "EMCASA" e "15%" na 1ª frase, o código terminando no caractere 42. Leitura em voz alta (resposta rápida e o capítulo dos kits): soa como pessoa ajudando. Mudanças:
- `description`: deixou de ser um sumário ("Veja os 3 kits, o que o cupom fez...") e virou duas frases com a decisão (30% já no preço, o EMCASA por cima nos testes, qual kit compensa). `metaDescription`: "use o cupom EMCASA", para o snippet nomear o código.
- Campanha: a primeira frase já decide ("já está no ar e não pede cupom"); entrou o aviso da sacola ("30% OFF já aplicado nos preços"), relido no Chrome; saiu o bastidor "Por isso o texto não dá dia".
- Kits: a primeira frase virou a conclusão ("Kit maior não é desconto maior"); o parágrafo da conta nossa parou de repetir os R$ 13,93 e R$ 41,93 da tabela (C6) e passou a dizer o que ela não diz (o sachê do pack sai por menos de um terço do risoto, e quem não quer sopa não ganha nada no kit grande).
- Avulsos: a primeira frase sem o R$ 13,93 da tabela; o R$ 4,19 com a origem concreta (o card da loja); "A loja diz que" saiu (regra 18 da voz), a origem já está na frase anterior.
- Cupom: "tira 15% por cima dos 30%" virou "tirou 15% ... nos dois testes que fizemos" (nunca "vale toda vez"); "Na tela da loja" virou "Na tela seguinte"; o 40,5% ficou "no carrinho igual ao Despensa Cheia", sem repetir R$ 478,00 e R$ 284,41 da tabela, e sem dizer que o kit em si foi testado.
- Frete: "A loja informa o mínimo" saiu (o rótulo já tinha sido usado na campanha) e virou "pelo FAQ da home da loja"; "não testamos" (C5, segunda ocorrência) virou "A loja fala em desconto dos produtos, não em cupom: ... confira o frete depois de aplicar o EMCASA"; "passa todos" virou "passa os três" (os demais estados não têm mínimo publicado), também no veredito.
- Garantia: saiu o link para "HolyFoods é confiável?", o 4º link interno (limite de 3 do contrato); o artigo segue nos relacionados.
- Checklist: "o rastreio e a garantia pedem ele" virou "você vai precisar dele no rastreio e na garantia".
- Matriz: "Rastrear pedido" passou a verificado (Chrome, 05/11); entraram a sacola da Black e a conta do terço.
- Nada de emagrecimento, "desinchar", efeito de saúde, medicamento, sabor, cupom de terceiros ou de primeira compra: zero no rascunho, nada a remover. "Detox" só no nome da Sopa Detox, na tabela de testes.

## Capa e imagens

Aprovado pelo Bruno em 05/11/2026 (folha de aprovação do Job 6). Todas as fotos são oficiais da HolyFoods, baixadas do catálogo público do site (`/products.json`) em 05/11; o corpo usa fotos de ambiente sem as artes com frases da loja ("ajuda no emagrecimento", "ganho de massa muscular"). No CDN, verificadas, em `public/images/reviews/holyfoods/`.

- **Capa:** `/images/reviews/holyfoods/black-friday-holyfoods-capa.webp` (1600×900, `imageFit: contain`). Alt: "Mac Queijo, Pack Canja da Mamãe e Risoto Funghi da HolyFoods, com o logo da loja e a faixa Black Friday da HolyFoods". Modelo "Black Friday": embalagens oficiais de itens do Despensa Cheia e faixa com o logo, "Black Friday da HolyFoods" e "30% no site todo e o cupom EMCASA por cima".
- **Corpo (Os kits da Black):** `/images/reviews/holyfoods/black-friday-holyfoods-risoto-funghi.webp`, quadrada, com `href` do produto (link da parceria). Legenda: "Risoto Funghi servido, um dos sabores dos kits da Black. Foto oficial da HolyFoods."
- **Corpo (Avulsos e packs):** `/images/reviews/holyfoods/black-friday-holyfoods-pack-canja-da-mamae-saches.webp`, quadrada, com `href` do produto (link da parceria). Legenda: "Os sachês individuais do Pack Canja da Mamãe: o pack traz 10. Foto oficial da HolyFoods."

## Conformação e gates

JSON em `content/reviews/black-friday-holyfoods.json`, escrito em 05/11/2026. `build-index`, `validate:content`, `test:article-d2`, `test:review-i18n`, `typecheck`, `test:store-banners`, `test:site-search` e a integração de mídia passaram.

## Vídeo da Cecília (05/11/2026)

O Bruno liberou os vídeos da Cecília com os produtos (05/11). `youtubeUrl`: https://youtube.com/shorts/EFJy5dJudpw. "Mac n Cheese Holyfoods" (Short de 18 s, 26/10/2026): a Cecília prepara o Mac Queijo na panela. Com isso, a nota editorial deixou de dizer que ninguém provou os produtos, e uma frase no corpo leva ao vídeo; a página de exibição é a do artigo do cupom. Os vídeos servem também para artigos de experiência própria (estoque).
