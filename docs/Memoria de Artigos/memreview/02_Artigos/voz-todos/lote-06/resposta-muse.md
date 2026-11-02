# Lote 06 — revisão de voz (35/35, na ordem da lista)

Método: 7 revisores paralelos leram `contentSections` inteiro + resposta rápida de cada JSON, contra o [Anexo-Voz-da-Cecilia](docs/Memoria%20de%20Artigos/memreview/00_Sistema/JOBS/Anexos/Anexo-Voz-da-Cecilia.md). Eu conferi por amostragem: 1 trecho literal (bateu), os campos `type` dos 3 casos de tipagem duvidosa e as 5 `translationKey` do lote. Dois ajustes meus sobre o material dos grupos: `camiseta-clea-store-e-boa` é `type: "Guia de Escolha"` (D e Q mantidos); `presente-de-natal-para-casa-moveis` é `type: "Guia de Presente"`, então retirei o Q proposto para ele ficar igual ao `presente-natal-quem-treina` (brief: Q só em guia de escolha e comparativo). Nenhum artigo do lote tem `emphasis` ou `decision`: zero consertos K.

## mais-mu-ou-growth
**Nota de voz: 4. Prioridade: média.**
- **Consertos**
- `V | Whey isolado: Mais Mu ou Growth | O [Whey Isolado Mais Mu sem sabor pote 450 g](https://www.lojamaismu.com.br/produtos/whey-isolado-sem-sabor-pote-450g/) tem 22 g de proteína por dose e, segundo a loja, rende cerca de 16 doses: sai a R$ 85,22 por 100 g de proteína no cartão, R$ 82,67 no Pix e R$ 74,40 com cupom e Pix. | O [Whey Isolado Mais Mu sem sabor pote 450 g](https://www.lojamaismu.com.br/produtos/whey-isolado-sem-sabor-pote-450g/) tem 22 g de proteína por dose e, pela página do produto, rende cerca de 16 doses: sai a R$ 85,22 por 100 g de proteína no cartão, R$ 82,67 no Pix e R$ 74,40 com cupom e Pix. | regra 18`
- `P | Whey concentrado: Mais Mu ou Growth | A Growth declara 23 g de proteína em cada dose de 30 g do concentrado de 1 kg. A Mais Mu declara 20 g em cada dose de 36 g. | No concentrado, a Growth leva: 23 g de proteína em 30 g de dose, contra 20 g em 36 g da Mais Mu. | Job P`
- `P | Whey isolado: Mais Mu ou Growth | O isolado da Growth declara 27 g de proteína em cada dose de 30 g, com 33 porções no pote de 1 kg. O refil de 900 g da Mais Mu declara 22 g em cada dose de 27 g, com 33 porções. | No isolado, a Growth leva: 27 g de proteína por dose, contra 22 g da Mais Mu, com 33 porções de cada lado. | Job P`
- `P | Onde a Growth ganha e onde a Mais Mu ganha | A comparação só fica justa com o lado de cada loja: | A Growth leva o whey em tudo, e a Mais Mu leva a creatina com cupom: | Job P`
- **Q:** takeIf: [Quer o menor preço por 100 g de proteína no whey: a Growth leva no concentrado e no isolado, em todas as formas de pagamento. Quer creatina com cupom: o refil de 500 g da Mais Mu sai abaixo do pouch da Growth.] / skipIf: [Quer creatina no Pix sem cupom: o pouch da Growth sai abaixo do refil da Mais Mu. Procura o selo Creapure declarado: as páginas da Mais Mu não declaram o selo nem laudo.]
- **Não mexer:** resposta rápida com veredito direto; "Não há um veredito único" + Quem escolhe o quê com vereditos por perfil tirados da tabela (D atendido); honestidade ("Ninguém da equipe provou", Creapure não declarado); conta por 100 g explicada antes das tabelas.

## mais-mu-ou-dux
**Nota de voz: 4. Prioridade: média.**
- **Consertos**
- `P | Whey concentrado: proteína por dose e preço por 100 g | Preços no cartão, sem cupom. | Preços no cartão, sem cupom: no concentrado, a Mais Mu leva no preço, e a Dux, na proteína por dose. | Job P`
- `P | Whey isolado: proteína por dose e preço por 100 g | Preços no cartão, sem cupom. | Preços no cartão, sem cupom: no isolado, o refil de 900 g da Mais Mu leva no preço, e a Dux, na proteína por dose. | Job P`
- `P | Creatina: preço por 100 g e por dose | Preços no cartão, sem cupom. | Preços no cartão, sem cupom: na creatina, o refil de 500 g da Mais Mu leva no preço por grama, e a Dux leva a única Creapure declarada. | Job P`
- `P | Onde cada uma ganha | A comparação só fica justa se cada lado tiver o que ganha: | A Dux leva proteína por dose, Creapure, Pix e frete; a Mais Mu leva preço por grama e cupom: | Job P`
- `V | Whey concentrado: proteína por dose e preço por 100 g | O sabor paçoquita da Mais Mu traz "contém glúten" na página. O baunilha, usado nesta tabela, diz "não contém glúten", segundo a página. | O sabor paçoquita da Mais Mu traz "contém glúten" na página; o baunilha, usado nesta tabela, traz "não contém glúten". | regra 18`
- `R | Onde cada uma ganha | **Mais Mu:** no isolado, a página diz "não contém glúten". A da Dux diz "contém glúten", atribuído à página. | **Mais Mu:** no isolado, a página diz "não contém glúten"; a da Dux diz "contém glúten". | Job R`
- **Q:** takeIf: [Quer o menor preço por 100 g de proteína no whey ou por grama na creatina: a Mais Mu leva no concentrado a partir do refil de 900 g, no isolado do refil de 900 g e na creatina do refil de 500 g. Quer o selo Creapure declarado: só a Dux declara, na linha de 300 g.] / skipIf: [Pesa a proteína por dose sem depender de cupom: o concentrado da Dux traz 20 g em 30 g, contra 20 g em 36 g. Pesa o Pix maior e o frete grátis mais baixo: a Dux leva nos dois.]
- **Não mexer:** resposta rápida com os dois lados; Quem escolhe o quê com vereditos por perfil (D atendido); capítulo Creapure honesto ("não afirma que o produto da Mais Mu não é Creapure"); Onde cada uma ganha bilateral.

## yesstyle-ou-olive-young
**Nota de voz: 4. Prioridade: baixa. Família: sim (`yesstyle-vs-olive-young`).**
- **Consertos**
- `P | Programa de membros e pontos | A Olive Young Global tem o OY MEMBERS, que é grátis. O cadastro dá o nível BABY na hora. | Na Olive Young, o OY MEMBERS é grátis e devolve de 0,5% a 2,5% da compra em pontos. | Job P`
- `P | Formas de pagamento | A Olive Young Global aceita PayPal, Visa, Mastercard, American Express, Diners Club, Discover, JCB, UnionPay, Apple Pay e Alipay. | Nas duas lojas, a cobrança é em moeda estrangeira, sem Pix nem boleto nas páginas lidas. | Job P`
- `V | Código de recompensa CECILIA010 na YesStyle | Pela ficha do código aqui do site, ele dá até 5% na primeira compra e 2% nas compras seguintes, e soma com os cupons da própria loja. | Pela página do código aqui do site, ele dá até 5% na primeira compra e 2% nas seguintes, e soma com os cupons da loja. | regra 18`
- **Q:** não se aplica (família).
- **Não mexer:** abertura com "Depende do seu país" + motivo (regras 7/8); Qual escolher com vereditos por país (D atendido); "este texto não chuta um"; devolução com conclusão antes da tabela; "Não some os valores de uma loja com os da outra".

## openclaw-hostinger-gerenciado-ou-vps
**Nota de voz: 5. Prioridade: baixa. Família: sim (`hostinger-openclaw-gerenciado-ou-vps`).**
- **Consertos**
- `P | Gerenciado ou VPS: a tabela | O OpenClaw gerenciado é o plano "Apps de automação com IA", o mesmo do Hermes Agent e do Paperclip gerenciados, pelo mesmo preço. | O gerenciado é o plano "Apps de automação com IA", o mesmo do Hermes e do Paperclip, e sai mais barato que o VPS no primeiro período. | Job P`
- **Q:** não se aplica (família).
- **Não mexer:** "Na dúvida, comece pelo gerenciado" + motivo (regra 10; D atendido); "É a descrição da Hostinger, não um teste nosso"; conta de verdade (R$ 96 nos 24 meses, regra 4); "Não testamos a renovação" (negação honesta, não experiência); Quem escreve declara o uso real.

## melhor-vps-para-openclaw
**Nota de voz: 4. Prioridade: baixa. Família: sim (`hostinger-openclaw-melhor-vps`).**
- **Consertos**
- `V | Quanto de RAM cada cenário pede | Nas páginas de plano KVM que li, nenhuma lista placa de vídeo (GPU). | Nas páginas de plano KVM lidas, nenhuma lista placa de vídeo (GPU). | trava (sem primeira pessoa)`
- `P | Qual plano KVM escolher | A tabela traz os quatro, com preços de planos de 24 meses lidos em 21/10/2026, e o preço com o SONAR20 já tem os 20% do cupom. | A tabela traz os quatro, em planos de 24 meses de 21/10/2026: KVM 1 para modelo na nuvem, KVM 4 como primeiro com folga no modelo local. | Job P`
- `P | Quanto de RAM cada cenário pede | RAM é a memória de trabalho do servidor: é onde o programa e, no caso de um modelo local, o próprio modelo ficam enquanto rodam. A documentação dá número só para o modelo local. | A documentação dá número de RAM só para o modelo local: RAM é a memória de trabalho, onde o programa e o modelo ficam enquanto rodam. | Job P`
- **Q:** não se aplica (família).
- **Não mexer:** honestidade sobre o que a documentação não diz (regras 7/8); conta GiB vs GB; regra de instância ociosa da Oracle com números; Qual escolher em resumo com vereditos por cenário (D atendido).

## openclaw-ou-hermes-agent
**Nota de voz: 4. Prioridade: média. Família: sim (`hostinger-openclaw-ou-hermes-agent`).**
- **Consertos**
- `V | O que é cada um | Segundo o README oficial, o estado, a memória e as credenciais ficam no equipamento onde ele roda, e o projeto não tem plano pago, serviço hospedado nem token. | O README oficial diz que o estado, a memória e as credenciais ficam no equipamento onde ele roda, sem plano pago, serviço hospedado ou token. | regra 18`
- `V | Antes de instalar | As versões 22, 23 e 25 não são suportadas, segundo a política de segurança do projeto. | A política de segurança do projeto não suporta as versões 22, 23 e 25. | regra 18`
- `P | Tabela comparativa | A tabela junta o que as fontes primárias dizem. | Os dois empatam em licença, agendador e subagentes; a tabela separa canais e interface de um lado e memória que aprende do outro. | Job P`
- `P | Antes de instalar | Antes de começar, confirme três coisas. Valem para os dois agentes. | Nos dois agentes, confirme o modelo de IA, o canal de mensagem e quem cuida do servidor antes de instalar. | Job P`
- `D | Para quem é cada um | Os dois são de código aberto e não cobram licença. A escolha depende do que você quer que o agente faça, não do software. | Se fosse para a minha casa, eu levaria o OpenClaw para conversar do celular em muitos canais e o Hermes Agent para uma rotina que aprende sozinha, porque os canais de um e a memória do outro resolvem casos diferentes. | Job D`
- **Q:** não se aplica (família).
- **Não mexer:** resposta rápida com os dois perfis; "Quanto custa de verdade" abrindo com a conclusão; limites ditos sem rodeio ("o custo mensal do uso de modelo não está informado", "Ninguém da equipe usa nenhum dos dois"); segurança orientando pelo erro a evitar.

## paperclip-ai-hostinger
**Nota de voz: 4. Prioridade: média. Família: sim (`hostinger-paperclip-ai`).**
- **Consertos**
- `V | É confiável? O que dá para conferir | Segundo o repositório oficial, github.com/paperclipai/paperclip, o projeto é mantido pela equipe Paperclip, e o aviso de copyright diz "MIT © 2026 Paperclip Labs, Inc.". | O repositório oficial, github.com/paperclipai/paperclip, mostra a equipe Paperclip como responsável, e o aviso de copyright diz "MIT © 2026 Paperclip Labs, Inc.". | regra 18`
- `P | O que você precisa ter | Antes de contratar, confira estes cinco pontos. | A equipe só liga com agentes para coordenar, Postgres, chaves de IA suas, teto de gasto e servidor resolvido. | Job P`
- `P | Gerenciado ou VPS na Hostinger | A Hostinger oferece o Paperclip de dois jeitos. No **gerenciado**, você assina e a empresa cuida do servidor, do banco e das atualizações. | No gerenciado a Hostinger cuida de tudo; no VPS, servidor, banco e atualizações ficam com você. | Job P`
- `D | Gerenciado ou VPS na Hostinger | **O gerenciado serve para você se** quer o Paperclip funcionando sem instalar nada, não sabe o que é root nem Docker, e prefere que a Hostinger cuide do banco, das atualizações e dos backups. | Se fosse para a minha casa, eu levaria o gerenciado, porque o banco, as atualizações e os backups ficam com a Hostinger. | Job D`
- **Q:** não se aplica (família).
- **Não mexer:** "Não confunda com forks e cópias" (regra 11); "O número de estrelas no GitHub mostra popularidade, não segurança"; "não sei" sem rodeio sobre auditoria e advisories; capítulo de alternativas com conclusão ("ele é mais do que precisa").

## skelt-e-confiavel
**Nota de voz: 4. Prioridade: baixa.**
- **Consertos**
- `V | Frete e brindes | O frete grátis depende da cidade e do valor final do pedido. Segundo a política de frete lida no site, que a loja diz poder mudar sem aviso: | O frete grátis depende da cidade e do valor final do pedido. A política de frete do site divide o grátis por região e avisa que pode mudar sem aviso: | regra 18`
- **Q:** não se aplica (artigo de loja, não é guia nem comparativo).
- **Não mexer:** capítulos abrindo com a conclusão ("Sim, é empresa registrada", "O endereço oficial é", "O reembolso sai em até 7 dias úteis"); limites honestos sem defesa (dois CNPJs sem explicação no site; horários conflitantes, por isso sem horário citado); "Se a nota importa para você, confira na nota fiscal" e "Se for comprar, confira o endereço" (regra 11).

## skelt-reclame-aqui-nota-reputacao
**Nota de voz: 4. Prioridade: baixa.**
- **Consertos**
- `V | Qual CNPJ aparece no perfil | O perfil Skelt Cosméticos é da Beleze & Oliveira - Comércio de Cosméticos Ltda., com nome fantasia Skelt Cosmetics e CNPJ 17.616.018/0001-15, aberta em 08/02/2013, segundo a BrasilAPI. | A BrasilAPI mostra o perfil Skelt Cosméticos em nome da Beleze & Oliveira - Comércio de Cosméticos Ltda., nome fantasia Skelt Cosmetics, CNPJ 17.616.018/0001-15, aberta em 08/02/2013. | regra 18`
- `P | Os números da Skelt no Reclame Aqui | O quadro abaixo resume a aba de 6 meses e a faixa de cada mês, lidas em 21/10/2026. | Nos 6 meses a Skelt é Ótima com nota 8,3; nos 12 meses, RA1000 com 8,4. | Job P`
- `P | O que mais aparece nas reclamações | Na aba geral, o Reclame Aqui lista os problemas e as categorias das reclamações. Os mais citados são: | Na aba geral, defeito, produto não recebido e atraso lideram as queixas. | Job P`
- **Q:** não se aplica (artigo de reputação, não é guia nem comparativo).
- **Não mexer:** abertura nomeando o problema ("O site da Skelt não mostra nota nem reclamações"); "Responder não é o mesmo que resolver"; causas não atribuídas ("a leitura não traz o motivo", "o texto não atribui causa"); veredito direto ("Sim. Na leitura do perfil...").

## cupom-skelt-como-usar
**Nota de voz: 4. Prioridade: baixa.**
- **Consertos**
- `V | Frete grátis e o cupom | A Skelt dá frete grátis conforme a região e o valor final do pedido. Segundo a política de frete da loja: | A Skelt dá frete grátis conforme a região e o valor final do pedido. A política de frete da loja divide assim: | regra 18`
- `V | Brinde e promoção | O valor mínimo dos brindes da Skelt conta o pedido depois dos descontos, segundo a política de brindes. | A política de brindes conta o valor mínimo do pedido depois dos descontos. | regra 18`
- **Q:** não se aplica (artigo de cupom, não é guia nem comparativo).
- **Não mexer:** teste real preservado e bem contado (conta do mousse, segundo teste, "São valores de um dia"); "vale" com condição ("Se você já ia comprar na Skelt, o cupom vale"); passo a passo com erro a evitar ("Se a etiqueta não aparecer, refaça a colagem"); limites sem rodeio ("Não testamos Apple Pay, Vale ou Pagaleve").

## black-friday-skelt
**Nota de voz: 5. Prioridade: baixa.**
- **Consertos**
- `P | O que a Skelt já mostrou sobre a Black Friday | A Black Friday de 2026 cai em 27/11/2026, e a Cyber Monday, em 30/11/2026. Nenhuma página do site dizia percentual de desconto para a Black Friday. | Nenhuma página do site dizia percentual de desconto para a Black Friday. A data cai em 27/11/2026, e a Cyber Monday, em 30/11/2026. | Job P`
- **Q:** não se aplica (guia de Black Friday, não é guia de escolha nem comparativo).
- **Não mexer:** resposta rápida abre com o problema (sem data nem desconto); veredito condicional ("Se você precisa agora... Se pode esperar..."); "não afirmamos" com motivo; teste de sacola declarado.

## bagaggio-e-confiavel
**Nota de voz: 5. Prioridade: baixa.**
- **Consertos**
- `P | De qual país é a Bagaggio e o que dizem as três datas | A página Quem somos responde à pergunta de origem com três datas. Elas falam de coisas diferentes: | As três datas falam de coisas diferentes, e a página Quem somos não explica a ligação entre elas: | Job P`
- **Q:** não se aplica (confiabilidade de loja, não é guia nem comparativo).
- **Não mexer:** resposta rápida com veredito + pontos de atenção; "não explica essa ligação" sem rodeio (regra 7); veredito equilibrado no capítulo final; teste de carrinho declarado ("Testamos no carrinho, sem finalizar"); origem concreta em vez de "segundo a loja" (regra 18).

## bagaggio-reclame-aqui-nota-reputacao
**Nota de voz: 4. Prioridade: média.**
- **Consertos**
- `P | Por que olhar o Reclame Aqui antes de comprar | O site da Bagaggio atende só pelo chat, de segunda a sexta, das 9h às 18h. Quando o pedido dá problema, o que outras pessoas viveram com a loja ajuda a decidir antes de comprar. | Quando o pedido dá problema, o que outras pessoas viveram com a loja ajuda a decidir antes de comprar. O site atende só pelo chat, de segunda a sexta, das 9h às 18h. | Job P`
- `P | Qual perfil olhar | Há mais de um perfil com o nome Bagaggio no Reclame Aqui. O que mostra quem compra no site é o Bagaggio - Loja Virtual. | Para compras no site, o perfil que vale é o Bagaggio - Loja Virtual. Há mais de um perfil com o nome Bagaggio no Reclame Aqui. | Job P`
- `P | O que a conta de reclamações mostra | A aba de 12 meses soma 5.757 reclamações. A aba de 6 meses soma 1.137. | A conta entre as abas mostra a queda: 5.757 reclamações em 12 meses contra 1.137 nos últimos 6. | Job P`
- **Q:** não se aplica (reputação de loja, não é guia nem comparativo).
- **Não mexer:** resposta rápida com Boa/Ruim e números; ressalvas que mudam a leitura ("ele não mede a reputação", "não diz o que a causou", "não diz que cada uma é verdadeira"); veredito "Dá para comprar, com atenção"; orientação pelo erro ("confira o nome e o CNPJ no topo do perfil").

## cupom-bagaggio-como-usar
**Nota de voz: 5. Prioridade: baixa.**
- **Consertos**
- `P | 3. Cole o código no campo Cupom de desconto | No resumo do pedido, à direita, há dois campos: "Código de vendedor(a) ou influenciador(a)" e "Cupom de desconto". O CECILIA10 vai só no segundo. | No resumo do pedido, o CECILIA10 vai só no campo "Cupom de desconto", não no de vendedor(a) ou influenciador(a). | Job P`
- **Q:** não se aplica (artigo de cupom, não é guia nem comparativo).
- **Não mexer:** passo 2 orienta pelo erro ("não entra na página do produto: ele entra na sacola", regra 11); conta de casa no teste e no exemplo da 2ª peça (regra 4); exemplo marcado como ilustrativo, não teste; "vale" com condição no capítulo final (regra 5).

## black-friday-bagaggio
**Nota de voz: 5. Prioridade: baixa.**
- **Consertos**
- `P | Calendário de novembro | A Black Friday de 2026 cai na sexta, 27/11/2026. A Cyber Monday, na segunda, 30/11/2026, é outra data do calendário do varejo. | A Bagaggio não anunciou nenhuma das duas: a Black Friday de 2026 cai na sexta, 27/11/2026, e a Cyber Monday, na segunda, 30/11/2026. | Job P (apagar a 3ª frase original, repetida)`
- **Q:** não se aplica (guia de Black Friday, não é guia de escolha nem comparativo).
- **Não mexer:** resposta rápida com régua de decisão; "Não encontramos o percentual... por isso ele não entra aqui" (regra 7); leitura honesta da Route 32 kg mais barata que a de 23 kg; veredito condicional em "Vale esperar novembro?"; teste de sacola declarado.

## bagaggio-garantia-vitalicia
**Nota de voz: 4. Prioridade: baixa.**
- **Consertos**
- `V | Mochila tem garantia vitalícia? | Pelo texto da loja, a resposta é não. | A resposta é não. | regra 18 (equivale a "segundo a loja"; a frase seguinte já atribui à página oficial)`
- `V+P | Quem tem direito | A mala precisa cumprir estas condições para ter a garantia vitalícia, todas segundo a página e o Termo de garantia: | Só tem a vitalícia a mala da marca, comprada depois do início do programa, no Brasil e do comprador original: | regra 18 + Job P`
- **Q:** não se aplica (guia de garantia, não é guia de escolha nem comparativo).
- **Não mexer:** resposta rápida direta; "Vitalícia não quer dizer que a mala dura para sempre" (limite com o outro lado); conflito página × Termo declarado sem rodeio; "A página diz" com origem concreta; tabelas, FAQ e seção Parceria e cupom.

## presente-de-natal-para-casa-moveis
**Nota de voz: 3. Prioridade: média.**
- **Consertos**
- `P | Antes de escolher: o que vale para todos os móveis | Este guia mostra o que olhar em cada um dos quatro móveis (sofá, poltrona reclinável, poltrona de cinema e área de piscina), a faixa de preço e onde a DAMIE entra. Cinco conferências valem para qualquer móvel deste guia, da DAMIE ou de outra marca. | Antes do preço, cinco conferências valem para qualquer móvel deste guia, da DAMIE ou de outra marca. | Job P`
- `P | Poltrona reclinável e poltrona do papai: o presente para os pais | "Poltrona do papai" é o nome popular da poltrona reclinável. A primeira escolha é o mecanismo. | A poltrona do papai se escolhe pelo mecanismo: manual ou elétrica. | Job P`
- `P | Poltrona de cinema para casa | Poltrona de cinema é a reclinável feita para ficar lado a lado, em fila de 2, 3 ou mais lugares, de frente para a TV. | Antes do preço, defina os lugares que a parede comporta, o braço no meio e o espaço para reclinar. | Job P`
- `P | Sofá: modular, na caixa ou montado | Os três nomes falam de coisas diferentes. "Na caixa" é o jeito de entregar, não de fabricar: o sofá chega desmontado e você encaixa as peças em casa. | "Na caixa" é entrega e "modular" é montagem: o sofá chega desmontado e você encaixa as peças em casa. | Job P`
- `V | Poltrona de cinema para casa | Nós não usamos a Poltrona Cinema 2.0: o que está aqui é a ficha e o preço da loja. | Nós não usamos a Poltrona Cinema 2.0: o que está aqui é o texto e o preço da loja. | regra 18`
- `V | Área de piscina: puff, apoio do puff e espreguiçadeira | Segundo a DAMIE, ele não absorve água, não mancha, evita mofo e tem proteção UV, e as peças podem ficar perto da piscina e até submersas. | A página diz: não absorve água, não mancha, evita mofo e tem proteção UV, e as peças podem ficar perto da piscina e até submersas. | regra 18`
- **Q:** não se aplica (`type: "Guia de Presente"`, não é guia de escolha nem comparativo).
- **Não mexer:** resposta rápida com veredito por perfil; abertura da piscina com cena ("Natal no Brasil é verão"); "não prometemos efeito na saúde de quem usa"; capítulo "Qual móvel escolher" com veredito por perfil (D atendido); uso real da reclinável e do sofá modular mantido; tabelas, FAQ, datas e cupom. Atenção: "Segundo a DAMIE" se repete no capítulo Garden, fora do teto de 6 — mesmo padrão do conserto acima.

## autobronzeador-skelt-qual-escolher
**Nota de voz: 3. Prioridade: média.**
- **Consertos**
- `V | Resposta rápida: qual autobronzeador Skelt comprar | A Skelt vende sete autobronzeadores de corpo, e ninguém do site testou nenhum, então tudo vem da ficha oficial. | A Skelt vende sete autobronzeadores de corpo, e ninguém do site testou nenhum, então tudo vem do site oficial. | regra 18`
- `V | Mousse ou água: qual a diferença | A ficha do mousse traz ácido lático e aloe vera na fórmula, e a da água, ácido hialurônico e aloe vera. | Na página do mousse, ácido lático e aloe vera na fórmula; na da água, ácido hialurônico e aloe vera. | regra 18`
- `V | Dark ou normal: qual escolher | Antes de ir para o Dark, vale lembrar que o mousse comum também escurece com o tempo na pele: segundo a Skelt, 3 a 5 horas dão bronze médio e 6 a 8 horas, bronze forte. | Antes de ir para o Dark, o mousse comum também escurece com o tempo na pele: a página diz que 3 a 5 horas dão bronze médio e 6 a 8 horas, bronze forte. | regra 18`
- `P | Dark ou normal: qual escolher | O Dark existe em duas versões, o Mousse Dark (140 ml, com cor-guia) e a Água Autobronzeadora Dark (150 ml, incolor). | O Dark é para quem já usou e quer mais cor, em mousse com cor-guia ou em água incolor. | Job P`
- `P | Gel e Bifásico: para quem são | São os dois autobronzeadores Skelt que fogem do mousse. | Gel incolor para os experientes; bifásico, com perfume. | Job P`
- `V | Como aplicar sem manchar (o que a Skelt orienta) | O passo a passo abaixo é o da ficha do Mousse, repetido nas páginas do Gel e dos kits. | O passo a passo abaixo é o do Mousse, repetido nas páginas do Gel e dos kits. | regra 18`
- **Q:** takeIf: [Para quem nunca usou e quer começar pelo mousse com cor-guia, ou já sabe aplicar e prefere um formato incolor. Para quem quer a luva junto, o kit sai mais em conta que os avulsos.] / skipIf: [Para quem busca spray gradual ou produto para o rosto: os dois estavam esgotados na leitura dos preços. Para quem quer o Dark sem nunca ter usado: a marca o marca como nível expert.]
- **Não mexer:** "Na dúvida, a regra da própria marca resolve" (regra 10); "Não há um melhor para todos" com motivo (regra 8); tempos e níveis atribuídos à marca; capítulo de veredito por perfil (D atendido, sem "eu levaria" em Beleza); "É só uma estimativa" (método honesto); tabelas e FAQ.

## melhor-whey-qual-escolher-por-objetivo
**Nota de voz: 4. Prioridade: baixa.**
- **Consertos**
- `P | Concentrado, isolado, 3W ou hidrolisado: a diferença | Whey é a proteína do soro do leite. O nome do tipo diz como ela foi processada, e a diferença aparece na tabela nutricional. | O tipo diz como a proteína foi processada, e a diferença aparece na tabela nutricional. | Job P`
- **Q:** takeIf: [Para quem escolhe pelo objetivo: pagar menos pela proteína, sem lactose, isolado, 3W, todo dia, sabor ou pote pequeno. Para quem confere a proteína por dose na tabela antes do nome do pote.] / skipIf: [Para quem busca indicação de uso, dose ou dieta: o guia compara rótulo, tabela e preço, e não indica uso.]
- **Não mexer:** régua do preço por 100 g de proteína (conta de casa); "Isolado não é sinônimo de sem lactose" e "vale a tabela, não a página" (erro a evitar); "Se só importa quanto custa a proteína, o concentrado entrega mais por real"; todos os capítulos de perfil abrem com veredito; quadro de veredito por objetivo (D atendido, sem "eu levaria" em Suplementos); sem "vale a pena" solto, sem efeito no corpo; FAQ e metodologia.

## skelt-ou-best-bronze
**Nota de voz: 3. Prioridade: média.**
- **Consertos**
- `P | Cor-guia ou transparente: o que muda | A cor-guia é um tom terroso que mostra onde o produto já foi passado e sai no banho. Não é o resultado final. | A cor-guia mostra onde já passou e sai no banho; sem ela, o transparente pede mais experiência. | Job P`
- `V | Onde a Best Bronze ganha e onde a Skelt ganha | O que cada uma faz melhor, pela ficha e pelo preço. | O que cada uma faz melhor, na página e no preço. | regra 18`
- `V | Onde a Best Bronze ganha e onde a Skelt ganha | A lista do Spray Fácil traz álcool, propelente (butano e propano) e parabenos, segundo a página. | A página do Spray Fácil lista álcool, propelente (butano e propano) e parabenos. | regra 18`
- `V | Duração e tempo de ação: o que cada marca diz | Pelo que as páginas dizem, a Best Bronze promete até 3 dias a mais de duração e mais aplicações por frasco no mousse escuro. | Nas páginas, a Best Bronze promete até 3 dias a mais de duração e mais aplicações por frasco no mousse escuro. | regra 18`
- **Q:** takeIf: [Para quem quer mousse escuro com cor-guia, transparente sem cor-guia ou kit com luva, e compara pelo preço por 100 ml. Para quem compra na Skelt com cupom e Pix, ou na Best Bronze enquanto a promoção vale.] / skipIf: [Para quem quer spray, gotas ou lenço para o rosto: só a Best Bronze tem esses formatos hoje.]
- **Não mexer:** resposta rápida sem vencedora geral ("depende" com motivo); "A promoção da Best Bronze muda o resultado" (condição, sem "vale a pena" solto); capítulo "Qual escolher" com veredito por perfil (D atendido); duração/rendimento sempre como dado declarado pela marca; tabelas e FAQ.

## creatina-black-skull-qual-escolher
**Nota de voz: 3. Prioridade: média.**
- **Consertos**
- `V | Creator ou Creatine: a página não explica a diferença | Modo de consumo, segundo a ficha: 1 dosador (5 g) em água, uma vez ao dia, ou conforme a orientação de um nutricionista ou de outro profissional da saúde. | Modo de consumo: a página manda 1 dosador (5 g) em água, uma vez ao dia, ou o que um nutricionista ou outro profissional da saúde orientar. | regra 18`
- `V | Creatine Turbo: o que muda com a maltodextrina | A própria página explica: segundo a loja, a recomendação de consumo diário passou de 3 g para 5 g de creatina, e por isso os rótulos foram atualizados com o novo número de doses. | A própria página explica: a recomendação de consumo diário passou de 3 g para 5 g de creatina, e por isso os rótulos foram atualizados com o novo número de doses. | regra 18`
- `P | O que cada rótulo diz | A loja organiza a creatina em três nomes. | Creator e Creatine têm a mesma lista de ingredientes; o Turbo leva maltodextrina junto. | Job P`
- `P | As creatinas da Black Skull lado a lado: preço por 100 g de creatina | A ordem é a de mais vendidos do site da Black Skull em 23/10/2026, na busca por "creatina", só as creatinas avulsas, sem kits nem os outros aminoácidos. | Na conta por 100 g de creatina, o Creator refil de 500 g é o mais barato e a Caps, a mais cara. | Job P`
- `P | Creapure, laudo e pureza: o que a página declara | Creapure é um dos termos que mais aparecem no autocompletar junto com a Black Skull. | Nenhuma página de creatina da loja declara o selo Creapure. | Job P`
- `D | Qual creatina escolher | Só creatina, pelo menor preço: Creator refil de 500 g, R$ 7,98 por 100 g de creatina e R$ 0,40 por dose. | Pelos números da tabela, para quem quer só creatina pelo menor preço a escolha é o Creator refil de 500 g, porque sai a R$ 7,98 por 100 g de creatina, o menor número da linha. | Job D`
- **Q:** takeIf: [Para quem quer só creatina monohidratada e decide pelo menor preço por grama de creatina.] / skipIf: [Para quem quer carboidrato junto na dose ou prefere cápsulas, que saem bem mais caras por grama.]
- **Não mexer:** resposta rápida com veredito direto; conta por 100 g de creatina com e sem cupom; honestidade sobre Creapure e laudo ("não dá para dizer pelo rótulo"); Turbo de 150 g com as duas leituras de dose; Creator ou Creatine sem inventar diferença.

## body-splash-skelt-qual-escolher
**Nota de voz: 3. Prioridade: média.**
- **Consertos**
- `V | Floral: Hidden Flowers, Mystic Bloom, Pink Sands e Urban Beat | "Fragrância floral sofisticada e encantadora", segundo a loja. | "Fragrância floral sofisticada e encantadora", diz a Skelt. | regra 18`
- `V | Kits para presente: a conta contra os avulsos | Segundo o teste de carrinho, o cupom vale em kit e soma com o Pix, e a loja aceita um cupom por pedido. | No teste de carrinho, o cupom valeu em kit e somou com o Pix, e a loja aceita um cupom por pedido. | regra 18`
- `P | Cítrico e fresco: Amalfi Sunset, Unexpected Day, Grand Bahama e Milos Breeze | Este é o grupo em que as notas de topo são cítricas, de fruta clara ou de água. | Quatro fragrâncias de topo cítrico ou aquoso; como custam o mesmo, a escolha é só pelas notas. | Job P`
- `P | Floral: Hidden Flowers, Mystic Bloom, Pink Sands e Urban Beat | Aqui estão as fragrâncias cujo meio é de flores ou que a loja descreve como florais. | O grupo floral tem dois dos body splash mais vendidos do site: Mystic Bloom em terceiro e Hidden Flowers em quarto. | Job P`
- `P | Doce e gourmand: Velvet Milano e Solar Muse | São as duas que a loja descreve com palavras como gourmand e adocicado. | Duas fragrâncias gourmand e adocicadas; a diferença publicada está no meio e no fundo. | Job P`
- `D | Qual escolher: uma sugestão por perfil | Como as dez custam R$ 99,90, o preço não decide: o que decide é o perfil e se a compra é para presente. | Pelos números da tabela, para presente com hidratante a escolha é o Duo Hidden Flowers, porque sai 10,9% mais barato que os avulsos. | Job D`
- **Q:** takeIf: [Para quem escolhe pela família de notas, entre cítrica, floral ou gourmand, com o mesmo preço nas dez fragrâncias.] / skipIf: [Para quem espera ranking de cheiro ou tempo de fixação em horas, que a loja não publica.]
- **Não mexer:** recusa do ranking de cheiro ("cheiro é gosto"); agrupamento por perfil declarado como do guia; conta dos kits contra os avulsos com os que não economizam; minis com conta por ml; orientação de não aplicar no rosto restrita à página que a traz.

## camiseta-clea-store-e-boa
**Nota de voz: 3. Prioridade: média.**
- **Consertos**
- `V | Resposta rápida | A ficha da loja descreve uma camiseta oversized de corpo 100% algodão penteado, vendida avulsa ou em kit de três. | A camiseta da Cléa Store só existe em oversized, de corpo 100% algodão penteado, avulsa ou em kit de três. | regras 2, 3 e 18`
- `V | Como lavar a camiseta | Segundo a ficha da loja, os cuidados são: | A página lista estes cuidados: | regra 18`
- `V | Devolução e frete | Segundo a política da loja, o prazo de devolução é de 30 dias corridos após o recebimento. | A política da loja dá 30 dias corridos após o recebimento para devolver. | regra 18`
- `P | Os 6 modelos de camiseta lado a lado | São uma peça avulsa e cinco kits de três camisetas. | Uma avulsa e cinco kits de três; o preço por peça cai de R$ 129,00 para R$ 86,00 no kit. | Job P`
- `P | Avulsa ou kit: quanto sai cada peça | A conta é direta, com os preços do dia. | O kit de três custa o preço de duas avulsas: R$ 86,00 por peça contra R$ 129,00. | Job P`
- `D | Vale a pena? Avulsa ou kit | Pela ficha da loja, a camiseta tem corpo em algodão e um único corte, o oversized. | Se fosse para a minha casa, eu levaria o kit Essenciais, porque sai a R$ 86,00 por peça e dá para escolher as três cores. | Job D`
- **Q:** takeIf: [Para quem veste oversized e quer o menor preço por peça levando o kit de três.] / skipIf: [Para quem procura corte regular ou baby look, que o catálogo lido não tem.]
- **Não mexer:** elastano só na ribana, não no corpo; "básica" da loja é a própria oversized; gramatura ausente declarada sem rodeio; teste de checkout do cupom mantido; brinde e datas intocados.

## pre-treino-black-skull-bope-ou-bone-crusher
**Nota de voz: 4. Prioridade: baixa.**
- **Consertos**
- `P | BOPE ou Bone Crusher: o que muda no rótulo | Os números do Bone Crusher abaixo são do rótulo do 150 g; o 300 g só tem a tabela em imagem, ainda não confirmada. | A maior diferença está na beta-alanina: 750 mg no BOPE e 2 g no Bone Crusher, pelos rótulos de 150 g. | Job P`
- `P | Quanto custa cada dose | O preço por dose é o preço de venda do site em 23/10/2026 dividido pelas doses do pote. | O BOPE custa menos por dose nos dois tamanhos; o kit de três BOPE de 150 g tem o menor preço por dose. | Job P`
- `D | Qual escolher: BOPE ou Bone Crusher | A escolha segue o que pesa para você no rótulo e no preço por dose. | Pelos números da tabela, para o menor preço por dose a escolha é o BOPE 300 g, porque sai a R$ 1,62 por dose contra R$ 1,75 do Bone Crusher. | Job D`
- **Q:** takeIf: [Para quem decide pelo rótulo, entre o menor preço por dose e mais beta-alanina e arginina por dose.] / skipIf: [Para quem procura pré-treino sem cafeína, que a Black Skull não vende.]
- **Não mexer:** resposta rápida com veredito por critério; sem-cafeína respondido com "Não" direto; Bone Crusher 300 g fora da tabela com motivo; Uva com leituras divergentes fora da conta; modo de uso e aviso atribuídos às páginas.

## whey-black-skull-qual-escolher
**Nota de voz: 4. Prioridade: baixa.**
- **Consertos**
- `V | Atenção ao nome: wheys que não são o que parecem | Dose da ficha e dose do rótulo: a ficha do 100% HD Refil 900 g na loja diz "Dose: 30", e a tabela nutricional do rótulo diz 35 g. | Dose da página e dose do rótulo: a página do 100% HD Refil 900 g diz "Dose: 30", e a tabela nutricional do rótulo diz 35 g. | regra 18`
- `P | Como lemos a linha: preço por 100 g de proteína | A Black Skull vende 11 wheys e um kit de Turbo, e a diferença entre eles está em quatro coisas: quanto de proteína vem em cada dose, quanto custa a proteína (não o pote), o que a lista de ingredientes diz e o sabor, que só você escolhe. | Dois potes de 900 g não têm a mesma proteína dentro: a régua é o preço por 100 g de proteína. | Job P`
- `P | Quadro da linha: os 11 wheys e o kit de Turbo do site | Os 11 wheys e o kit de Turbo do site na mesma régua, com o preço do site. | Na mesma régua, o 80% HD Refil é o menor preço por proteína e o Gourmet 450 g, o maior. | Job P`
- `D | Qual whey da Black Skull para cada objetivo | Cada objetivo de compra leva um whey diferente. | Pelos números da tabela, para pagar menos pela proteína a escolha é o 80% HD Refil 900 g, porque sai a R$ 23,17 por 100 g de proteína, o menor número da linha. | Job D`
- **Q:** takeIf: [Para quem compara os wheys pelo preço por 100 g de proteína e pela proteína por dose.] / skipIf: [Para quem procura whey isolado ou sem lactose, que a Black Skull não tem no site.]
- **Não mexer:** régua do preço por proteína explicada com exemplo; "Atenção ao nome" com Gourmet, Turbo e "100%"; colágeno sem conta inventada; sabores sem escolha ("não escolhemos sabor"); sem lactose/isolado respondido direto.

## black-skull-ou-dark-lab
**Nota de voz: 4. Prioridade: média.**
- **Consertos**
- `P | Creatina: preço por 100 g de produto | A tabela compara o preço do pote por 100 g de produto. | Na creatina, a Black Skull ganha em todos os tamanhos. | Job P`
- `P | Whey: preço por 100 g de proteína | A conta é o preço dividido pela proteína total do pote, que é a proteína por dose vezes o número de doses. | No whey, quase empatam por 100 g de proteína, e a 80% HD passa à frente com o cupom. | Job P`
- `V | De onde vem cada marca | Segundo o "Sobre nós" do site, o produto é desenvolvido "através da Grow Dietary Supplements Labs USA (GDS)". | O "Sobre nós" do site fala em produto desenvolvido "através da Grow Dietary Supplements Labs USA (GDS)". | regra 18`
- `V | Whey: preço por 100 g de proteína | A Black Skull 80% HD tem sabores com preços diferentes: a conta usa R$ 159,90, o preço de Morango e Cookies; o sabor Banana saía por R$ 139,90 na ficha do produto. | A Black Skull 80% HD tem sabores com preços diferentes: a conta usa R$ 159,90, o preço de Morango e Cookies; o sabor Banana saía por R$ 139,90 na página do produto. | regra 18`
- `V | O que o rótulo diz | A 100% HD traz WPC, WPI, WPH e peptídeos hidrolisados, segundo a lista de ingredientes. | Na 100% HD, a lista de ingredientes traz WPC, WPI, WPH e peptídeos hidrolisados. | regra 18`
- **Q:** takeIf: [Para quem quer creatina pelo menor preço por 100 g, a Black Skull em qualquer tamanho da tabela. Para quem quer whey pelo menor preço por grama de proteína, a Black Skull 80% HD com cupom; para mais proteína por dose na mesma porção de 30 g, também a 80% HD, com 23 g contra 21 g.] / skipIf: [Para quem decide por sabor, dissolução ou digestão, o comparativo não serve: ninguém da equipe provou os produtos. Para quem quer comparar outros nutrientes do whey, a tabela nutricional completa da Dark Lab não está publicada.]
- **Não mexer:** resposta rápida sem R$ com ponteiro para Qual escolher; vereditos por perfil com números no capítulo de veredito (D atendido); "A página da Dark Lab diz 21 g" (voz ativa, origem concreta); teste de checkout declarado; FAQ funcional.

## snacks-dr-peanut-qual-escolher
**Nota de voz: 4. Prioridade: baixa.**
- **Consertos**
- `P | Os três snacks em uma tabela | Este texto compara os snacks da Dr. Peanut entre si: a Doctor Bar, o alfajor e a Doctor Wafer. | A barra tem mais proteína, o wafer tem menos calorias, e o alfajor fica no meio. | Job P`
- `P | Proteína por unidade e por real | A conta é nossa: o preço da unidade dividido pela proteína que o rótulo mostra. | A barra tem a maior proteína por unidade e o menor preço por grama. | Job P`
- `P | Açúcar: o que a tabela mostra | Açúcares totais contam todo o açúcar do produto. | O menor açúcar total é do alfajor, com 0,8 g. | Job P`
- **Q:** takeIf: [Para quem quer mais proteína por unidade, a Doctor Bar, com 21 g. Para menos calorias por unidade, a Doctor Wafer, com 118 a 127 kcal; para o menor açúcar total, o alfajor Avelã ou Cookies & Cream, com 0,8 g.] / skipIf: [Para quem decide pelo sabor, o guia não diz qual snack é o mais gostoso. Para quem precisa encaixar o snack na dieta, a decisão é de um nutricionista ou médico.]
- **Não mexer:** resposta rápida sem R$; vereditos por perfil em bullets com números (D atendido); "conta nossa" explicada como comparação, não preço de loja; limites sem rodeio (tabela do Speculoos não publicada, aviso de alérgicos do alfajor); glúten e lactose com origem concreta na página.

## dr-peanut-qual-tamanho-compensa
**Nota de voz: 4. Prioridade: baixa.**
- **Consertos**
- `P | Assinatura: com o cupom, o menor preço nos potes de 250 g | A assinatura ("Monte sua assinatura") só tem pastas de 250 g, com entrega mensal, bimestral ou trimestral. O desconto sobe com a quantidade: 4% com 1 pasta, 8% com 2, 12% com 3, e 15% com 4 ou mais. | A assinatura só tem pastas de 250 g, e com o cupom sai abaixo do kit em todas as quantidades. O desconto sobe com a quantidade: 4% com 1 pasta, 8% com 2, 12% com 3, e 15% com 4 ou mais. | Job P`
- `P | Comprou, Ganhou: o brinde não baixa o preço | A loja tem combos com brinde de alfajor ou de wafer. | O brinde não baixa o preço do pote. | Job P`
- **Q:** takeIf: [Para quem come pasta todo dia e tem espaço para guardar, o kit de 5 potes de 600 g, com o menor preço por grama e frete grátis em todas as regiões. Para uma compra só, o pote de 600 g; para provar, 2 potes de 250 g em vez do avulso.] / skipIf: [Para quem quer um pote só de 250 g, o avulso é o mais caro por grama e só faz sentido nesse caso. Para quem busca pote de 800 g ou de 1 kg, a loja não vende: o equivalente é o kit de 4 potes de 250 g ou a assinatura.]
- **Não mexer:** resposta rápida sem R$; vereditos por perfil com a conta por 100 g (D atendido); "Não testamos se o cupom vale sobre o combo, e por isso não afirmamos" (regra 7); uso real mantido ("Testamos no carrinho", teste do cupom na assinatura); preço como conta de casa por 100 g.

## alfaiataria-verao-clea-store
**Nota de voz: 3. Prioridade: alta.**
- **Consertos**
- `V | A loja não vende conjunto de alfaiataria | O que está aqui vem das fichas e das páginas da loja. | O que está aqui vem das páginas da loja. | regra 18`
- `V | Tecido: o que a ficha diz | Nas outras peças, a ficha não informa. | Nas outras peças, a página não diz. | regra 18`
- `P | Blazer: linho, mistura com elastano ou poliéster com forro | Três blazers estão à venda, cada um com um tecido diferente. | Só um dos três blazers é de linho 100%. | Job P`
- `V | Blazer: linho, mistura com elastano ou poliéster com forro | O curto cropped (4348) é de 95% poliéster e 5% elastano, segundo a ficha. | A página do curto cropped (4348) diz 95% poliéster e 5% elastano. | regra 18`
- `V | Colete: linho bege ou vermelho | Os dois coletes são de linho 100%, segundo a ficha. | A página traz os dois coletes em linho 100%. | regra 18`
- `D | Qual escolher | Quem quer colete com calça de linho escolhe o bege se for PP ou P, e o vermelho se for P ou G. | Quem quer colete com calça de linho escolhe o bege se for PP ou P, e o vermelho se for P ou G. Se fosse para a minha casa, eu levaria a montagem bege, porque é a mais barata com o cupom. | Job D`
- **Q:** takeIf: [Para quem veste M ou G e quer o conjunto mais simples, a montagem rosa, toda em linho e numa cor só. Para quem veste PP ou P e quer colete com calça pelo menor total, a montagem bege, com o colete em promoção.] / skipIf: [Para quem procura conjunto pronto, a loja não vende: só peças avulsas para montar. Para quem precisa de grade cheia ou de blazer com forro em vários tamanhos, o mescla com forro declarado só tem P.]
- **Não mexer:** resposta rápida com conclusão e ponteiro para a grade; limite honesto sem promessa de conforto térmico; "não compramos nem testamos" declarado; tabelas e FAQ funcionais. Atenção: restam ocorrências de "ficha/segundo a ficha/segundo a loja" fora do teto de 6 (styling, Calor, Pantalona, Código) — mesmo padrão dos consertos acima.

## creatina-com-sabor-qual-escolher
**Nota de voz: 3. Prioridade: média.**
- **Consertos**
- `P | Antes de escolher: o que o rótulo mostra | Quem compara creatina costuma olhar o peso do pote e o preço. Só que o peso sozinho engana: um pote de 300 g com dose de 6 g rende menos doses que um de 300 g com dose de 5 g. | O peso do pote sozinho engana: 300 g com dose de 6 g rendem menos doses que 300 g com dose de 5 g. | Job P`
- `V | Tem o mesmo efeito? O que o rótulo diz | Nenhuma das duas fichas explica o grama a mais; a lista de ingredientes da versão com sabor traz aromatizante, ácido málico, sucralose e corantes, e a tabela da Black Skull com sabor traz 0,4 g de carboidrato por dose. | Nenhuma das duas páginas explica o grama a mais; a lista de ingredientes da versão com sabor traz aromatizante, ácido málico, sucralose e corantes; a tabela da Black Skull com sabor traz 0,4 g de carboidrato por dose. | regra 18`
- `V | Tem o mesmo efeito? O que o rótulo diz | Nenhuma ficha lida diz que o sabor muda o que a creatina faz, e este texto também não diz. | Nenhuma página lida diz que o sabor muda o que a creatina faz; este texto também não diz. | regra 18`
- `V | Max Titanium: o sabor custa mais por grama | A página da 7Belo não traz modo de preparo nem marcação do dosador. A porção de 6 g vem só da tabela, e a ficha não explica o grama a mais em relação aos 5 g do pote sem sabor da mesma marca. | A página da 7Belo não traz modo de preparo nem marcação do dosador. A porção de 6 g vem só da tabela, e a página não explica o grama a mais. | regra 18`
- `V | Probiótica: sem sabor no catálogo | A ficha traz creatina e maltodextrina, sem aromatizante. A tabela traz porção de 6 g com 3.000 mg de creatina e 11 kcal, o que dá 50 porções e R$ 27,29 por 100 g de creatina. | A página traz creatina e maltodextrina, sem aromatizante. A tabela traz porção de 6 g com 3.000 mg de creatina e 11 kcal: 50 porções e R$ 27,29 por 100 g de creatina. | regra 18`
- `V | Divergências entre a página e a tabela | A ficha da página diz 2 dosadores (10 g) e a tabela traz 6 g de porção. | A página diz 2 dosadores (10 g) e a tabela traz 6 g de porção. | regra 18`
- **Q:** takeIf: [Para quem quer creatina com sabor pelo menor custo, a Creatine 300 g da Black Skull, em laranja ou limão. Para quem quer sabor com carboidrato zero declarado, a Max 7Belo; para quem quer o carboidrato na dose, a Creatine Turbo.] / skipIf: [Para quem não quer carboidrato na dose, a Turbo não serve, nem a Mix Pro, que leva maltodextrina. Para quem quer creatina com sabor da Probiótica, o catálogo lido não traz nenhuma.]
- **Não mexer:** resposta rápida sem R$; vereditos por perfil com números (D atendido); "este texto também não diz" e "a conta usa a tabela" (limite sem defesa); verificações declaradas ("conferido por nós") mantidas; nenhum efeito no corpo alegado; FAQ funcional.

## black-skull-ou-integralmedica
**Nota de voz: 3. Prioridade: média.**
- **Consertos**
- `V | Como comparamos | A base é o que as duas lojas publicam: o rótulo, a ficha do produto e o preço do site lido em 25/10/2026, sem frete e sem desconto de Pix. | A base é o que as duas lojas publicam: o rótulo, a página e o preço do site lido em 25/10/2026, sem frete e sem desconto de Pix. | regra 18`
- `V | De onde vem cada marca | Segundo o "Sobre nós" do site, o produto é desenvolvido "através da Grow Dietary Supplements Labs USA (GDS)". | O "Sobre nós" do site diz que o produto é desenvolvido "através da Grow Dietary Supplements Labs USA (GDS)". | regra 18`
- `V | O que o rótulo diz | Na Integralmédica, a 100% Pura traz porção de 5 g (5.000 mg), creatina monohidratada e não contém glúten, segundo o site. | Na Integralmédica, a 100% Pura traz porção de 5 g (5.000 mg), creatina monohidratada, e a página diz: não contém glúten. | regra 18`
- `V | O que o rótulo diz | A Hardcore traz a mesma porção de 5 g e pode conter leite, soja e ovo, segundo o rótulo. | A Hardcore traz a mesma porção de 5 g, e o rótulo diz que pode conter leite, soja e ovo. | regra 18`
- `V | O que o rótulo diz | A ficha da 80% HD da Black Skull também lista edulcorante sucralose, em todos os sabores. | A página da 80% HD também lista edulcorante sucralose, em todos os sabores. | regra 18`
- `P | Creatina: preço por 100 g de produto | A tabela compara as creatinas por 100 g de produto, nos tamanhos de 500 g e de 1 kg. | Na creatina, a Black Skull sai mais barata por 100 g nos dois tamanhos comparados. | Job P`
- **Q:** takeIf: [Para quem quer creatina pelo menor preço por 100 g de produto, a escolha é o kit com dois refis da Black Skull. Para quem quer whey pelo menor preço por grama de proteína, a escolha é a Black Skull 80% HD.] / skipIf: [Para quem quer comparar sabor ou qualidade geral, este guia não serve: ninguém da equipe provou os produtos. Para quem prefere a Integralmédica, todos os tamanhos dela saem acima por 100 g.]
- **Não mexer:** veredito por perfil em Qual escolher (D satisfeito); resposta rápida abre com a conclusão; "depende" do whey com motivos nos bullets; sem primeira pessoa de experiência; "segundo a BrasilAPI" mantido (origem concreta externa, não é "segundo a loja").

## dr-peanut-ou-la-ganexa
**Nota de voz: 4. Prioridade: baixa.**
- **Consertos**
- `V | Proteína, açúcares e polióis por 100 g | Por 100 g, o sódio da Dr. Peanut vai de 127 a 193 mg (conta nossa, a partir da porção de 15 g); o da La Ganexa, de 5,9 a 324 mg, conforme o sabor. | Por 100 g, o sódio da Dr. Peanut vai de 127 a 193 mg (conta nossa, a partir da porção de 15 g); o da La Ganexa, de 5,9 a 324 mg. | regra 18`
- **Q:** takeIf: [Para quem quer pasta só de amendoim, vegana ou sem lactose, a escolha é a La Ganexa, única com essas opções. Para quem quer pote pequeno com sabor de sobremesa pelo menor preço, a escolha é a Dr. Peanut de 250 g com o cupom.] / skipIf: [Para quem quer comparar sabor ou textura, este guia não serve: ninguém da equipe provou as pastas. Para quem quer o pote grande mais barato, a Dr. Peanut perde na maioria dos sabores.]
- **Não mexer:** "Não há vencedora geral" com veredito por perfil em Onde cada uma ganha (D satisfeito); comparação sempre por 100 g; capítulos abrem com conclusão de critério; sem "vale a pena", sem "ficha", sem primeira pessoa.

## presente-natal-quem-treina
**Nota de voz: 3. Prioridade: média.**
- **Consertos**
- `V | Resposta rápida | O tamanho da camiseta e o estoque que a ficha mostra pesam na escolha: veja em Qual presente escolher. | O tamanho da camiseta e o estoque anunciado pesam na escolha: veja em Qual presente escolher. | regra 18`
- `V | Como este guia foi montado | Não prova que o item está disponível. Quando a ficha mostra unidades por tamanho ou cor, o texto diz quais. | Não prova que o item está disponível. Quando a loja mostra unidades por tamanho ou cor, o texto diz quais. | regra 18`
- `V | Quem não sabe o que a pessoa usa | A camiseta 100% Algodão da Black Skull custa R$ 78,90, e a ficha mostrava unidades de P a XGG. A Camiseta Branca da Probiótica sai por R$ 69,90; a ficha mostrava zero unidade em P e unidades de M a XG. | A camiseta 100% Algodão da Black Skull custa R$ 78,90, e a loja mostrava unidades de P a XGG. A Camiseta Branca da Probiótica sai por R$ 69,90; a loja mostrava zero unidade em P e unidades de M a XG. | regra 18`
- `V | Fitness feminino | Poucas peças femininas aparecem com tamanhos na ficha das lojas. A Max Titanium tem a Camiseta Feminina Oversized Redemption, por R$ 119,00, com P, M e G na ficha e o GG zerado. | Poucas peças femininas trazem tamanhos na página das lojas. A Max Titanium tem a Camiseta Feminina Oversized Redemption, por R$ 119,00, com P, M e G na página e o GG zerado. | regra 18`
- `V | Fitness feminino | A ficha dos dois não mostra quantidade, e o que o Femini Whey tem está na tabela nutricional da página dele. | A página dos dois não traz quantidade, e o que o Femini Whey tem está na tabela nutricional da página dele. | regra 18`
- `V | Qual presente escolher | Fitness feminino: a Camiseta Feminina Oversized Redemption da Max Titanium, por R$ 119,00, é a peça com tamanhos na ficha; o Femini Whey, por R$ 130,00, é o suplemento da lista. | Fitness feminino: a Camiseta Feminina Oversized Redemption da Max Titanium, por R$ 119,00, é a peça com tamanhos; o Femini Whey, por R$ 130,00, é o suplemento da lista. | regra 18`
- **Q:** não se aplica (Guia de Presente, não é guia de escolha nem comparativo).
- **Não mexer:** capítulo Qual presente escolher com veredito por perfil; honestidade de prazo ("este guia não dá data"); capítulos de perfil abrem com conclusão; sem primeira pessoa. "Tabela da loja" e "tabela nutricional" mantidos (regra 18 veta "ficha", não "tabela"). Atenção: "ficha" aparece 8x no artigo; 2 ocorrências ficaram fora do teto de 6 — mesmo padrão acima.

## pre-treino-exquenta-mais-mu-e-bom
**Nota de voz: 4. Prioridade: baixa.**
- **Consertos**
- `P | Os potes e os sachês pelo rótulo | A loja vende 18 itens de Exquenta avulsos: quatro potes de 300 g, seis de 500 g, dois de 450 g e seis sachês. | São 18 itens avulsos, e todos com cafeína trazem 150 mg por dose. | Job P`
- **Q:** takeIf: [Para quem quer a dose mais barata, a escolha é o pote de 500 g de Amora e Melancia, Manga ou Pink Lemonade. Para quem quer versão sem cafeína, a escolha é o Sem Cafeína Tropical ou o Nitrato, ambos de 450 g.] / skipIf: [Para quem quer a dose já medida, o sachê é o mais caro por dose. Para quem quer saber do efeito, este guia não serve: a loja não publica teste de efeito.]
- **Não mexer:** "A loja não explica a diferença, e este guia também não" (regra 7); veredito por perfil em Qual escolher (D satisfeito); zero "ficha/segundo a loja" no corpo ("conforme" aparece só em citação literal da loja); sem primeira pessoa; sem efeito no corpo.

## whey-mais-mu-qual-escolher
**Nota de voz: 3. Prioridade: média.**
- **Consertos**
- `V | Isolado e vegetal: o preço por dose | Isolado e vegetal têm 22 g de proteína por dose, segundo a loja. | A loja dá 22 g de proteína por dose no isolado e no vegetal. | regra 18`
- `V | Vegetal: o preço por dose | A proteína vegetal, segundo a loja, é isolada de arroz e de ervilha. | A proteína vegetal é isolada de arroz e de ervilha, diz a loja. | regra 18`
- `V | Sabores de parceria | A loja apresenta quatro sabores como parceria, e é assim que eles entram aqui: parceria, segundo a Mais Mu. | A loja apresenta quatro sabores como parceria, e o texto trata os quatro como parceria. | regra 18`
- `V | Sabores de parceria | **Brownie do Luiz, pote de 420 g:** parceria, segundo a loja, com o nome que está no catálogo. | **Brownie do Luiz, pote de 420 g:** parceria, diz a loja, com o nome que está no catálogo. | regra 18`
- `V | Sabores de parceria | **Paçoquita:** parceria, segundo a loja, nos formatos de concentrado (pote de 450 g, sachê, refil de 900 g e 1,8 kg). | **Paçoquita:** parceria, diz a loja, nos formatos de concentrado (pote de 450 g, sachê, refil de 900 g e 1,8 kg). | regra 18`
- `P | Sachê: caixa de 15 unidades | A caixa tem 15 sachês. O peso de cada sachê está no texto de cada sabor, e a tabela traz esse peso. | A caixa é a dose mais cara do concentrado. O peso de cada sachê está no texto de cada sabor. | Job P`
- **Q:** takeIf: [Para quem quer o menor preço por proteína entre os formatos com contagem, a escolha é o refil de 900 g de Brownie ou Cookies'n Cream. Para quem quer conhecer o sabor antes de levar um formato maior, a escolha é o pote de 450 g.] / skipIf: [Para quem quer comparar sabor, este guia não serve: não há degustação aqui. Para quem precisa evitar lactose, confira o rótulo: os concentrados dizem "contém lactose".]
- **Não mexer:** veredito por perfil em Qual formato escolher (D satisfeito); "Confira no rótulo" nos pontos de lactose e glúten; margem do "cerca de" explicitada nas contas; sem primeira pessoa; sem efeito no corpo.

---

## Fim do lote

**Os 3 padrões que mais se repetem (para corrigir de uma vez):**

1. **Job P — capítulo abre apresentando assunto/tabela/metodologia/definição em vez da conclusão (31 artigos):** mais-mu-ou-growth, mais-mu-ou-dux, yesstyle-ou-olive-young, openclaw-hostinger-gerenciado-ou-vps, melhor-vps-para-openclaw, openclaw-ou-hermes-agent, paperclip-ai-hostinger, skelt-reclame-aqui-nota-reputacao, black-friday-skelt, bagaggio-e-confiavel, bagaggio-reclame-aqui-nota-reputacao, cupom-bagaggio-como-usar, black-friday-bagaggio, bagaggio-garantia-vitalicia, presente-de-natal-para-casa-moveis, autobronzeador-skelt-qual-escolher, melhor-whey-qual-escolher-por-objetivo, skelt-ou-best-bronze, creatina-black-skull-qual-escolher, body-splash-skelt-qual-escolher, camiseta-clea-store-e-boa, pre-treino-black-skull-bope-ou-bone-crusher, whey-black-skull-qual-escolher, black-skull-ou-dark-lab, snacks-dr-peanut-qual-escolher, dr-peanut-qual-tamanho-compensa, alfaiataria-verao-clea-store, creatina-com-sabor-qual-escolher, black-skull-ou-integralmedica, pre-treino-exquenta-mais-mu-e-bom, whey-mais-mu-qual-escolher.
2. **Regra 18 (V) — "ficha" e/ou "segundo a loja/ficha/página" em vez de voz ativa com origem concreta (23 artigos):** mais-mu-ou-growth, mais-mu-ou-dux, yesstyle-ou-olive-young, openclaw-ou-hermes-agent, paperclip-ai-hostinger, skelt-e-confiavel, skelt-reclame-aqui-nota-reputacao, cupom-skelt-como-usar, bagaggio-garantia-vitalicia, presente-de-natal-para-casa-moveis, autobronzeador-skelt-qual-escolher, skelt-ou-best-bronze, creatina-black-skull-qual-escolher, body-splash-skelt-qual-escolher, camiseta-clea-store-e-boa, whey-black-skull-qual-escolher, black-skull-ou-dark-lab, alfaiataria-verao-clea-store, creatina-com-sabor-qual-escolher, black-skull-ou-integralmedica, dr-peanut-ou-la-ganexa, presente-natal-quem-treina, whey-mais-mu-qual-escolher.
3. **Job D — veredito por perfil sem a frase-padrão (8 artigos):** openclaw-ou-hermes-agent, paperclip-ai-hostinger, creatina-black-skull-qual-escolher, body-splash-skelt-qual-escolher, camiseta-clea-store-e-boa, pre-treino-black-skull-bope-ou-bone-crusher, whey-black-skull-qual-escolher, alfaiataria-verao-clea-store. Nos demais guias/comparativos o D já estava atendido.

**Artigos de família no lote (5, sem Q):** yesstyle-ou-olive-young, openclaw-hostinger-gerenciado-ou-vps, melhor-vps-para-openclaw, openclaw-ou-hermes-agent, paperclip-ai-hostinger.

**Cobertura:** 35 de 35 revisados, nenhum faltando. Nenhum artigo ficou "sem consertos". Único R do lote em mais-mu-ou-dux; zero K (sem `emphasis` em todo o lote). Três artigos têm ocorrências do mesmo padrão fora do teto de 6, marcadas no próprio item: alfaiataria-verao-clea-store, presente-natal-quem-treina e presente-de-natal-para-casa-moveis (capítulo Garden).