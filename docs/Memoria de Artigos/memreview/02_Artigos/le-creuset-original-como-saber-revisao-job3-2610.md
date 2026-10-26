# Revisão editorial (Job 3), Fable 5.1, 26/10/2026: L2 "Le Creuset original: como saber e onde comprar"

Rascunho: `scratchpad/lc/L2.md`. Fontes: capturas cruas de 26/10 (aviso.txt, p-48f7aa = Devoluções e trocas, p-f4e94f = /lojas, p-ef5f48 = Lojas Oficiais, prod-buffet.txt, prod-cer.txt, pp-74b69c.html = Mini Cocotte), `fatos-2610.md`, `revisao-fable-2610.md`, o briefing com as Decisões do Bruno, `lets-eat-it-e-confiavel.json` e `le-creuset-vale-a-pena.json`. Nenhuma requisição à internet; nenhum arquivo do repositório editado.

## O que confere com a fonte (sem achado)

- Alerta: "tomou conhecimento recentemente da publicação de anúncios em mídias sociais e em páginas da internet, por meio dos quais têm-se divulgado falsas promoções e descontos"; canais "site oficial, lojas físicas próprias ... revendedores credenciados e parceiros autorizados da marca, que podem ser consultados em nosso website"; "canais oficiais (website oficial da marca ou e-mail com a extensão '@lecreuset.com') ou de um parceiro autorizado"; "Não clique sobre links e nem abra anexos"; "SAC da Le Creuset Brasil". A página não traz data (só o © do rodapé). Não cita loja, marketplace nem vendedor.
- Devoluções: "suporte e análise de garantia para qualquer produto Le Creuset independentemente do país ou canal de compra" (citação exata); "Avaliação de Garantia - Consumidor Final"; "Observar o prazo de garantia para a linha da qual o produto faz parte"; "seconds, b-grade e inclui cores e modelos descontinuados"; "pequenos pontos ou manchas no esmalte"; "não são permitidas troca, troca por cor ou devolução por arrependimento"; "incluindo os que são comprados em outlet ou bazar, possuem cobertura por meio da garantia"; "Prateleira Infinita"; "bazar anual"; Troque Fácil "exclusiva para compras feitas de forma on-line na Le Creuset".
- Fichas: buffet = Material Ferro Fundido, País de Origem France, Garantia Vitalícia; Mini Cocotte Fruits = Cerâmica, 480 ml, Tailândia, 10 anos; frigideira Essential 30 cm = "Cerâmica Antiaderente Essential", sem País de Origem, Garantia 10 Anos. O bloco "Garantia Vitalícia. Para defeitos de fabricação em toda nossa linha de Ferro Fundido Esmaltado" aparece também na ficha da frigideira. Ficha: "FALE CONOSCO, sempre portando cupom fiscal de compra, ou outro comprovante que ateste propriedade ... reparado ou substituído por outro igual, ou equivalente".
- Localizador /lojas: título "Revendedor Autorizado"; 199 objetos (178 Wholesale Partner, 16 Boutique, 2 Outlet, 3 sem tipo). "Cerca de 200 pontos, a maioria revendedores, e 2 outlets" está certo e segue a decisão 3. Let's Eat It: BR-36019, "Wholesale Partner", Serra, ES. Nenhum outro revendedor nomeado no rascunho.
- Outlets: Outlet Premium, Rod. dos Bandeirantes, km 72, Itupeva/SP; Catarina Fashion Outlet, São Roque/SP (locator e Lojas Oficiais).
- Resposta rápida: 1 parágrafo, 3 frases, 56 palavras, sem link nem negrito; tudo o que diz está nos capítulos (canais, nota fiscal, ausência de guia, revendedores, garantia).
- MAUAD: ausente do texto (grep sem resultado). Links internos: `lets-eat-it-e-confiavel` e `le-creuset-vale-a-pena` existem em `content/reviews/`; `le-creuset-qual-tamanho-escolher` sai junto (L1).
- Nenhuma lista de sinais de falsa além do aviso; nenhuma acusação; sem "exclusiva", sem "selo", sem "testamos".

## Achados

### ALTA

Nenhum.

### MÉDIA

**M1. Plano de imagens sem a capa, e a imagem 1 do corpo é a mesma da capa recomendada no briefing.**
- Trecho: o rascunho tem três `[IMAGEM: ...]` e nenhuma linha de capa. O briefing (seção 5) recomenda como capa o print do alerta, que no rascunho é a imagem 1 do corpo (linha 19). O Job 3, item 9, pede imagens no corpo "sem repetir imagem".
- Fonte: briefing seção 5; Decisão 2 ("Capa sem o código MAUAD"); `scripts/media/covers/render.mjs:84` barra o MAUAD.
- Correção (texto pronto, para entrar antes da Resposta rápida):
  `[CAPA 16:9: composição com o logo da Le Creuset e a foto oficial da caçarola buffet Cerise em fundo neutro, sem nenhum código de cupom | foto oficial da ficha da buffet (download só com aprovação do Bruno, fluxo do GUIA-MIDIA-EDITORIAL) | Le Creuset original: como saber e onde comprar | sem legenda]`
  Se o Bruno preferir o print do alerta como capa, a imagem 1 do corpo troca para o print da página Lojas Oficiais (p-ef5f48), na seção "Onde comprar", e o alerta fica só na capa.

**M2. Título do alerta citado entre aspas e incompleto.**
- Trecho (linha 7): `A marca tem uma página de alerta, "Falsas promoções e anúncios de produtos da marca Le Creuset".`
- Fonte (aviso.txt): `Alerta Importante! Falsas promoções e anúncios de produtos da marca Le Creuset®`.
- Correção: `A marca tem uma página de alerta com o título "Alerta Importante! Falsas promoções e anúncios de produtos da marca Le Creuset®".` (ou sem aspas: `uma página de alerta sobre falsas promoções e anúncios de produtos da marca`).

**M3. Avaria com revendedor: a marca fala em "site revendedor", o rascunho generaliza para qualquer revendedor.**
- Trecho (linha 46): `Se a peça chegar avariada de um revendedor, a troca é com a loja onde você comprou.`
- Fonte (p-48f7aa): `Caso o produto recebido com avaria tenha sido comprado em outro site revendedor, o consumidor deve procurar o canal de atendimento da loja em que comprou.`
- Correção: `Se a peça chegar avariada numa compra feita no site de um revendedor, a marca manda procurar o atendimento da loja onde você comprou.`

**M4. FAQ "made in France ou Tailândia?" não segue a decisão 5 nem o autocompletar.**
- Trecho (linha 76): `Le Creuset é made in France ou Tailândia? Depende do produto. ...`
- Fonte: Decisão 5 do briefing (`FAQ "made in France ou China/Tailândia?"`); autocompletar "le creuset made in france ou china". Nenhuma das três fichas lidas traz "China".
- Correção: `Le Creuset é made in France ou made in China? Depende do produto, e a resposta está na ficha de cada um. Na ficha da caçarola buffet de ferro fundido que lemos em 26/10/2026, o país de origem é France; na da mini cocotte de cerâmica, é Tailândia. Nenhuma das três fichas lidas traz China.`

**M5. Sem link para a página do cupom da loja (Job 3, item 4).**
- Trecho (linha 65, parágrafo da Let's Eat It) e Nota de transparência (linha 83: "pelo nosso link"), mas o corpo não tem link para `/cupons/letseatit`, que os dois artigos publicados trazem.
- Fonte: Job 3, item 4; `le-creuset-vale-a-pena.json` ("Cupom da Let's Eat It" → `/cupons/letseatit`); regra do dossiê (código sem destaque no texto; o link à página do cupom não mostra o código).
- Correção (linha 65, acrescentar ao fim): `O desconto da parceria está na [página do cupom da Let's Eat It](/cupons/letseatit).`

### BAIXA

**B1. "Então não há outro guia para citar" pode soar como "não existe guia global".**
- Trecho (linha 17): `O site global, lecreuset.com, redireciona quem está no Brasil para o lecreuset.com.br, então não há outro guia para citar.`
- Fonte: Decisão 6 (o redirecionamento impede a leitura; não prova que não existe).
- Correção: `O site global, lecreuset.com, redireciona quem acessa do Brasil para o lecreuset.com.br, então não conseguimos ler outra página da marca sobre isso.`

**B2. "Redes sociais" onde a marca escreve "mídias sociais".**
- Trecho (linha 7 e linha 75): `anúncios em redes sociais e páginas da internet`.
- Fonte: `anúncios em mídias sociais e em páginas da internet`.
- Correção: `anúncios em mídias sociais e em páginas da internet` (nas duas ocorrências).

**B3. FAQ "manda considerar oficial só" é mais forte do que o "esteja atento" da marca.**
- Trecho (linha 75): `Ela manda considerar oficial só a oferta do site da marca, de e-mail com "@lecreuset.com" ou de parceiro autorizado.`
- Fonte: `Esteja atento ao receber qualquer oferta ... por meio de anúncios não provenientes dos seus canais oficiais (website oficial da marca ou e-mail com a extensão "@lecreuset.com") ou de um parceiro autorizado.`
- Correção: `Ela pede atenção a qualquer oferta que não venha dos canais oficiais: o site da marca, e-mail com "@lecreuset.com" ou um parceiro autorizado.`

**B4. "Shoppings de várias capitais": a lista oficial inclui cidades que não são capitais.**
- Trecho (linha 51): `As lojas próprias ficam em shoppings de várias capitais, com endereços na página Lojas Oficiais do site da marca.`
- Fonte (p-ef5f48): Boa Vista Village (Porto Feliz, SP), Shopping Iguatemi Campinas, Balneário Shopping (SC), além das capitais.
- Correção: `As lojas próprias ficam em shoppings de várias cidades, a maioria capitais, com endereços e horários na página Lojas Oficiais do site da marca.`

**B5. Nome da caçarola: a ficha mostra "Vermelho"; "Cerise" vem só do endereço da página.**
- Trecho (linha 26): `Caçarola Buffet Signature, pegador centenário (Cerise)`.
- Fonte (prod-buffet.txt): título "Caçarola Buffet Signature Pegador Centenário Vermelho 30 cm 3,5 L", "Cor: Vermelho".
- Correção: `Caçarola Buffet Signature, pegador centenário, 30 cm (Vermelho/Cerise)`.

**B6. "Não diz a história de cada peça" é vago.**
- Trecho (linha 55): `Estar na lista diz o canal pelo qual a loja vende. Não diz a história de cada peça, e a lista muda, por isso vale olhar de novo na hora da compra.`
- Fonte: briefing, matriz, linha "Estar nela não diz a origem de cada peça; diz o canal".
- Correção: `Estar na lista diz que a loja é um canal listado pela marca. Não diz a origem de cada peça, que está na ficha e na nota fiscal, e a lista muda, por isso vale olhar de novo na hora da compra.`

**B7. "Nota fiscal, que aciona a garantia" na resposta rápida.**
- Trecho (linha 4): `e a nota fiscal, que aciona a garantia.`
- Fonte: a marca pede o comprovante para a análise; quem aciona é o consumidor pela Central de Atendimento.
- Correção: `e a nota fiscal, que a marca pede para analisar a garantia.`

**B8. "Fale conosco" × "Central de Atendimento": a página de devoluções chama de Central de Atendimento.**
- Trecho (linha 40): `Entre em contato pelo Fale conosco do site da Le Creuset Brasil, com o assunto "Avaliação de Garantia - Consumidor Final".`
- Fonte: Devoluções: `acessar a Central de Atendimento e no campo Assunto escolher Avaliação de Garantia - Consumidor Final`; a ficha fala em "FALE CONOSCO".
- Correção: `Entre em contato pela Central de Atendimento do site da Le Creuset Brasil (o Fale conosco) e escolha o assunto "Avaliação de Garantia - Consumidor Final".`

**B9. Repetição do alerta em três lugares.** O resumo do alerta aparece na seção "Existe Le Creuset falsa?", no "Em resumo" (linha 69) e na FAQ (linha 75), com as mesmas três fontes. Aceitável no FAQ; no "Em resumo", dá para encurtar: `Desconfie de oferta fora dos canais oficiais, como diz o alerta da marca.`

**B10. Canibalização: ok, com uma observação.** O parágrafo da Let's Eat It (linha 65) cumpre a decisão 4 (um parágrafo com os dois links) e não repete o preço nem o trecho do localizador. O localizador novo (print de Serra, ES, linha 57) fica na seção "Onde comprar", não no parágrafo da loja; é o uso previsto na decisão 6. A frase "listada pela Le Creuset Brasil em 26/10/2026" difere da fala do artigo publicado ("reconhecimento da Le Creuset Brasil", "reconhecida como ponto de venda") e a decisão 3 manda não mexer nos publicados: coerente. Linha 44 ("ferro fundido esmaltado tem garantia vitalícia para defeitos de fabricação") e linha 48 (link para "O que a garantia não cobre") não repetem o detalhe de choque térmico e queda do `le-creuset-vale-a-pena.json`: correto.

## Plano de imagens (Job 3, item 9)

- Mínimo cumprido: três imagens no corpo (alerta, quadro das fichas, localizador), nenhuma repetida entre si e cada uma no tema da seção. Capa: ver M1 (sem MAUAD, sem repetir a imagem 1).
- Onde caberia outra: (a) "A garantia vale em qualquer loja? Como acionar": print do formulário da Central de Atendimento com o assunto "Avaliação de Garantia - Consumidor Final" visível (Chrome, Job 6); (b) "Outlet e bazar": recorte da página Lojas Oficiais com os dois outlets (Outlet Premium, Itupeva; Catarina Fashion Outlet, São Roque), já capturada em p-ef5f48.
- O print "Serra, ES" mostra só a Let's Eat It (1 resultado), parceira: não nomeia outro revendedor. O print do mapa do Brasil deve ser conferido no Job 6 para não trazer nomes de outros revendedores legíveis em pins abertos.

## Veredito

Texto aprovado com as correções M1 a M5 (todas de redação ou de plano de imagem, nenhuma de fato errado contra a marca). Segue para o Job 6 depois delas.
