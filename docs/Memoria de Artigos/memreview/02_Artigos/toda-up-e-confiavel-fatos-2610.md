# Fatos: Toda Up (leitura de 26/10/2026)

Lote de 26/10/2026, Job 1 das pautas `toda-up-e-confiavel` e `toda-up-reclame-aqui-nota-reputacao`.
Leitura feita por `curl` com user-agent "Mozilla/5.0", uma requisição por vez, pelo menos 4 s entre elas.
Ao primeiro 429 na loja, a leitura parou (sem repetir). Nada de carrinho, login ou formulário.
Dossiê de referência: `docs/Memoria de Artigos/memreview/01_Parceiros/Toda Up.md`.

## Leituras feitas e pendências

| Fonte | URL | Resultado (26/10/2026) |
|---|---|---|
| Home | https://todaup.com/ | 200, lida |
| Política de troca | https://todaup.com/policies/refund-policy | 200, lida (última atualização 01/10/2026) |
| Política de frete | https://todaup.com/policies/shipping-policy | 200, lida |
| Privacidade | https://todaup.com/policies/privacy-policy | 200, lida |
| Termos de uso | https://todaup.com/policies/terms-of-service | 200, lida (última revisão 26/03/2026) |
| Sobre a Toda Up | https://todaup.com/pages/sobre-a-toda-up | 429: [PENDENTE: navegador] |
| Perguntas frequentes | https://todaup.com/pages/perguntas-frequentes | 429: [PENDENTE: navegador] |
| Catálogo (Shopify) | https://todaup.com/products.json | não tentado, a loja já devolvia 429: [PENDENTE: navegador] |
| CNPJ (BrasilAPI) | https://brasilapi.com.br/api/cnpj/v1/40159443000144 | 429 em duas tentativas: [PENDENTE: navegador] |
| Reclame Aqui | https://www.reclameaqui.com.br/empresa/toda-up/ | 403, desafio Cloudflare (1 requisição): [PENDENTE: navegador] |
| Fita UP (domínio antigo) | https://fitaup.com/ (linkado na home) | não lida: [PENDENTE: navegador] |
| Portal de trocas | https://todaup.troque.app.br/ | não lido (o portal é do fluxo, sem dado extra) |
| Checkout (Pix, boleto, parcelas) | — | não lido nesta rodada |

Pendentes para o Claude principal no Chrome, nesta ordem: CNPJ (BrasilAPI), Sobre, FAQ, Reclame Aqui (Toda Up e,
se houver, Fita UP), depois o catálogo (`/products.json`) e o checkout até o Pix e o boleto, sem finalizar.

---

## 1. Empresa

| Fato | Tipo | Fonte | Data | Confiança |
|---|---|---|---|---|
| Rodapé: "© 2026 - 40.159.443/0001-44 \| R. Edgard Hoffmann, 222 - Biguaçu/SC" | fato oficial | https://todaup.com/ (rodapé) e https://todaup.com/policies/shipping-policy (mesmo rodapé) | 26/10/2026 | Alta |
| CNPJ 40.159.443/0001-44: razão social, data de abertura, situação, CNAE e município pela BrasilAPI | [PENDENTE: navegador] | BrasilAPI (429) | — | — |
| Mudança de nome: "A Fita UP cresceu e virou Toda Up"; "Somos a mesma equipe"; "A mudança é apenas de marca e visual" | afirmação da marca | https://todaup.com/ (bloco "Ainda em dúvida?") | 26/10/2026 | Alta, como frase da marca |
| "O que mudou: o nome, o visual do site, as embalagens, o logo e, em breve, novos produtos. O que não mudou: a qualidade, a segurança dos produtos, a política de trocas, o atendimento e o histórico dos pedidos" | afirmação da marca | https://todaup.com/ | 26/10/2026 | Alta, como frase da marca |
| História completa Fita UP → Toda Up (ano, fundador, CNPJ) | [PENDENTE: navegador] | https://todaup.com/pages/sobre-a-toda-up (429) | — | — |
| Domínio todaup.com: registrado em 10/04/2025, status ativo, vence em 10/04/2036, registrar GoDaddy | dado público (RDAP) | https://rdap.verisign.com/com/v1/domain/todaup.com | 26/10/2026 | Alta |
| Domínio fitaup.com: registrado em 21/05/2020, vence em 21/05/2027 | dado público (RDAP) | https://rdap.verisign.com/com/v1/domain/fitaup.com | 26/10/2026 | Alta |
| Página "Sobre" lista a Toda Up como "marca completa de moda íntima" (frase da marca) | afirmação da marca | https://todaup.com/ | 26/10/2026 | Alta, como frase da marca |

Leitura: o domínio atual é de abril de 2025 e o da Fita UP é de maio de 2020. Os dois fatos
são só o que o RDAP mostra. Nada aqui prova a data da empresa: isso depende do CNPJ.

## 2. Catálogo e produtos (pela home, sem o `products.json`)

Home de 26/10/2026, com preços de venda ("Preço promocional") e de referência ("Preço normal"):

| Produto | Preço de venda | Preço normal | Queda pelo "normal" | Observação |
|---|---|---|---|---|
| Protetor de Silicone Ultrafino | R$ 69,90 | R$ 99,90 | 30,0% | Selo da home diz "Até 20% OFF" |
| Sutiã de Silicone Invisível | R$ 149,90 | R$ 199,90 | 25,0% | Idem |
| Sutiã Comfort Slim | R$ 189,90 | R$ 199,90 | 5,0% | Idem |
| Sutiã Comfort Up | R$ 170,91 | R$ 199,90 | 14,5% | Idem; no dossiê, carrinho de 22/10 mostra o mesmo valor |

Divergência: o selo "Até 20% OFF" aparece nos quatro, mas a queda em relação ao "Preço normal" é de 25% e 30% em
dois deles. Não é erro de conta: são os números da própria página. Não citar desconto de porcentagem fixa no
artigo de confiança; levar ao Bruno como alerta.

Linhas e categorias (home): Sutiãs, Calcinhas, Adesivos, Conjuntos, Acessórios, "Monte seu Kit", "Kits exclusivos".
Nomes citados na home: Comfort Up, Comfort Line, Comfort Slim, Skin Up (calcinhas), Cotton Up, sutiã de silicone,
Top Sutiã Alça Fina (lançamento), Fita Up, protetores.

Os números de avaliação dos produtos (1.906, 467, 1.042, 1.316 "avaliações") estão na home. Não entram como prova
(regra do Bruno para lojas com avaliação de cliente).

## 3. Trocas e devoluções (https://todaup.com/policies/refund-policy, lida em 26/10/2026)

| Fato | Trecho | Pode citar? |
|---|---|---|
| Solicitação pelo portal https://todaup.troque.app.br/, com CPF da titular da compra e número do pedido | "Informe o CPF da titular da compra e o número do pedido" | Sim |
| Troca por modelo, tamanho ou cor: até 30 dias corridos depois do recebimento | "Troca por modelo, tamanho ou cor: até 30 dias corridos após o recebimento do pedido" | Sim |
| Arrependimento: até 30 dias corridos depois do recebimento. A própria política diz que o prazo amplia os 7 dias legais | "O prazo de 30 dias ... é uma condição comercial da Toda Up, que amplia o prazo legal de 7 dias" | Sim, com a frase |
| Condições da troca por preferência: sem sujeira, manchas de cosmético ou desodorante, etiquetas afixadas, sem sinais de lavagem, de perfume ou de uso | seção 3 | Sim, em lista curta |
| Frete: primeira troca grátis; segunda troca por conta da cliente | seção 4 | Sim |
| Código de postagem com validade de 7 dias corridos | seção 4 | Sim |
| Fotos podem ser pedidas para análise | seção 5 | Sim |
| Troca por cupom da loja: crédito pelo valor pago, 90 dias, uso único, não soma com outros cupons, sem frete | seção 6 | Não citar (cupom da própria loja fora do nosso) |
| Reembolso: cartão pelo estorno da administradora; Pix, boleto ou transferência pelo procedimento financeiro da loja. Sem prazo em dias | seção 7 | Sim, sem prazo: a política não diz quantos dias |
| Defeito: 90 dias corridos para vícios aparentes em duráveis, citando o CDC | seção 8 | Sim |
| Produto diferente do pedido: troca sem custo, com foto do produto e da etiqueta | seção 9 | Sim |
| Compra em loja parceira: procurar o estabelecimento | seção 10 | Sim |
| Contato para defeito: atendimento, com número do pedido e fotos | seção 8 | Sim |

Contato da política de trocas: "pelo WhatsApp ou pelo e-mail: suporte@todaup.com". O número do WhatsApp não aparece
no texto lido. [PENDENTE: navegador] para confirmar o número, se a loja mostrar no Chrome.

## 4. Frete e prazo (https://todaup.com/policies/shipping-policy, lida em 26/10/2026)

- Modalidades: Sedex, Loggi e Jadlog; prazo e valor pelo CEP no checkout.
- Despacho: até 3 dias úteis depois da confirmação do pagamento. Fluxo da própria política: faturamento até 1 dia útil,
  despacho com a transportadora até 2 dias úteis. Código de rastreio por e-mail depois do despacho.
- Carteiro não atende em duas tentativas: a encomenda volta ao centro de distribuição, e o frete de envio é cobrado da
  cliente.
- Endereço incorreto: se já despachado, o frete de envio é cobrado da cliente.
- Atrasos de transportadora: a loja diz que não se responsabiliza, mas "fará de tudo" para cumprir o prazo.
- Frete grátis: a home anuncia "FRETE GRÁTIS em todo o site!" (faixa do topo e banner da Black Friday antecipada,
  "FRETE GRÁTIS 3X SEM JUROS"). O tema tem a configuração "+ Frete grátis acima de R$ 199,00", que é o selo de oferta
  do produto, não selo de segurança. A política de frete não traz regra de frete grátis.

Divergência com o dossiê: o dossiê diz que "a página da loja não cita" frete grátis. A home cita, em campanha.

## 5. Privacidade e termos (lidos em 26/10/2026)

Privacidade (https://todaup.com/policies/privacy-policy):
- Diz que "não divulgaremos suas informações a terceiros" e que "A Toda Up não fornece serviços de terceiros". Na home,
  o HTML carrega o Google Tag Manager (GTM-KR4MC3H), o botão de WhatsApp (whatsapp-button.eazeapps.io) e um bloco de
  avaliações (classes `jdgm`). Divergência a levar ao Bruno: é prática comum de loja, mas o texto diz outra coisa.
- Pedido de acesso e de retirada de consentimento: e-mail **suporte@fitaup.com**, o domínio da marca antiga. O
  atendimento da troca é suporte@todaup.com. Divergência.
- Base legal citada: Marco Civil (12.965/2014) e LGPD (13.709/2018). Nome do controlador e do encarregado: não aparece no texto lido.

Termos de uso (https://todaup.com/policies/terms-of-service, última revisão 26/03/2026):
- O texto diz: "A Toda Up é uma plataforma que promove o conhecimento dos direitos consumeristas, dissemina informação
  legal e cuida para que os consumidores tenham seus direitos resguardados." Também fala de "demandas lançadas na
  plataforma" e de "inexiste certeza de êxito". O texto parece de outro serviço (de apoio a reclamações), não de loja de
  moda íntima. Não citar os termos no artigo. Levar ao Bruno: pedir à loja a revisão.
- Os termos citam "certos produtos ou serviços podem estar disponíveis exclusivamente online através do site". Única
  frase de loja nos termos.

## 6. Pagamento e atendimento

- Rodapé: "Aceitamos: American Express, Elo, Hyper, Hypercard, Mastercard e Visa". Não há logo de Pix nem de boleto no
  rodapé lido. O texto da política de reembolso cita "Pix, boleto ou transferência". Confirmar no checkout
  [PENDENTE: navegador].
- Banner: "3X SEM JUROS" (campanha Black Friday antecipada). Não há tabela de parcelas no texto lido.
- Canal: WhatsApp e suporte@todaup.com (política de trocas). Página "Rastreie seu Pedido" no menu.
- Home: a loja usa um WhatsApp flutuante (script do eazeapps).
- "Trabalhe com a gente", "Blog" e "Lista de e-mails" aparecem no menu. Não lidos.

## 7. Alertas de cupom (não citar)

- Cupom MAUAD: 10% OFF, o nosso (dossiê e `src/lib/couponsData.ts`, slug `toda-up`). Link de afiliado no `offerUrl` sem edição.
  Mesmo código da Let's Eat It e da Belive: cada texto diz de qual loja fala.
- A home traz o cupom de primeira compra por e-mail ("Raspe para revelar seu cupom de primeira compra"). O código
  está no HTML da home, na configuração do widget. NÃO CITAR em nenhum texto, nem como "cupom de boas-vindas" nem como
  "de primeira compra" (regra do dossiê e do Bruno).
- A home mostra o "Squad Toda Up", com cinco perfis de influenciadoras e a coleção `squad-toda-up`. Não citar os perfis
  nem códigos de influenciadora (regra: nunca cupom de terceiros).
- Flash Sale com promoção progressiva (dossiê, teste de carrinho de 26/10): 12% acima de R$ 299, 15% acima de R$ 399,
  20% acima de R$ 499. Conta do dossiê: 12% de R$ 360,81 dão R$ 43,30, não R$ 43,28 (diferença de 2 centavos). Conferir
  no Chrome antes de citar a conta.

## 8. Reclame Aqui

- Toda Up: 403 (desafio Cloudflare) em https://www.reclameaqui.com.br/empresa/toda-up/. Nenhum número coletado.
  [PENDENTE: navegador]. A URL foi tentada uma vez; o slug pode não ser esse, a conferir na busca do Chrome.
- Fita UP: perfil separado não localizado (sem requisição). [PENDENTE: navegador] se houver perfil, com o CNPJ dele.
- Nota: a home diz que a marca é a mesma equipe. Se o perfil da Fita UP tiver outro CNPJ, o artigo de reputação
  deve dizer de qual CNPJ fala cada perfil, como no artigo da Bagaggio.

## 9. Sinais públicos sem avaliação de cliente

- Selo de site seguro (Norton, Google, Trusted Shops, Reclame Aqui): nenhum encontrado no HTML da home. Só o selo
  de oferta do tema (CSS `tu-selo-ativo`), que não é selo de segurança.
- Domínio: todaup.com com 1 ano e 6 meses (RDAP, 10/04/2025). Não é tempo de empresa: é tempo de domínio.
- Políticas com data: troca "Última atualização: 01/10/2026"; termos "Última revisão: 26/03/2026".
- Texto de "Sobre" e FAQ: pendentes (429). Se a FAQ repetir "Reclame Aqui" ou "selo", vai para a seção de divergências.

## 10. Autocompletar (26/10/2026)

Arquivo: `autocomplete-2610.txt` (na pasta `toda-up-e-confiavel`).
Termos úteis para a pauta de confiança: "toda up é confiável" (só o exato), "toda up reclame aqui", "toda up cnpj",
"todaup reclame aqui", "todaup é confiável" (e a grafia "todo up e confiavel", só do lado da busca).
Chamou atenção: "fita up funciona reclame aqui" e "fita up nao funciona" (dúvida sobre o produto antigo; a resposta
depende do Reclame Aqui da Fita UP, pendente) e "toda up loja fisica" (há ou não loja física; checar no Chrome).

## 11. Ideias de pautas de produto (sem briefing)

Só termos que aparecem no autocomplete ou no catálogo da home. Nenhum deles tem briefing ainda.
- Sutiã de silicone invisível (produto da home; "toda up sutiã" e "sutiã toda up é bom" no autocomplete).
- Protetor de silicone ultrafino (produto da home, na faixa "Mais vendidos").
- Fita Up tomara que caia, "como usar" e "original" (autocomplete de "fita up"). Pauta de uso: cuidar de não dizer o que o
  produto faz pelo corpo, só como é usado, segundo a ficha.
- Sutiã Comfort Up, Comfort Line, Comfort Slim (linha de sutiãs, com o preço da ficha, sem "é bom").
- Calcinha Skin Up e Cotton Up ("segunda pele"): pauta de comparativo de calcinhas, só pela ficha e pelo tecido declarado.
- Kits ("Monte seu Kit", "Kits exclusivos"): pauta de preço por peça com o kit, depois de ler a página do kit.

Não viraram pauta: "toda up é boa" (opinião de qualidade), "fita up funciona" (eficácia, sem como medir), "toda up
sutiã é bom" (opinião).

## 12. Não citar (lista de bloqueio)

- Código de boas-vindas ou de primeira compra (no HTML da home).
- Perfis das influenciadoras do "Squad Toda Up".
- Avaliações da home como prova (contagens de "avaliações").
- Termos de uso como fonte de texto sobre a loja (ver seção 5).
- Telefone e WhatsApp, até o Chrome confirmar.
- Endereço de residência de sócios (se a BrasilAPI mostrar; o rodapé já traz o endereço comercial da loja).

## Leitura no Chrome pelo Claude principal (26/10/2026), resolvendo os [PENDENTE: navegador]
- **CNPJ (BrasilAPI, lida no Chrome):** FITA UP LTDA, nome fantasia FITA UP, CNPJ 40.159.443/0001-44, início em **18/12/2020**, **ATIVA**, Biguaçu/SC, CNAE 4781-4/00 (comércio varejista de vestuário e acessórios), porte "demais". A empresa é a mesma da Fita UP; o nome Toda Up é marca.
- **Reclame Aqui:** página `reclameaqui.com.br/empresa/toda-up/` ("Toda Up", todaup.com, Roupas íntimas, Pijamas e Meias), **CNPJ 40.159.443/0001-44 na própria página** (mesmo do rodapé), selo "Empresa Verificada".
  - 6 meses (01/04/2026 a 30/09/2026): **RA1000, nota 8,5**; 357 recebidas, 100% respondidas, 0 aguardando, **93,1% resolvidas**, 76,1% voltariam, 218 avaliadas, nota do consumidor 7,38, resposta em **21 horas**.
  - Geral (27/10/2023 a 26/10/2026): 1.398 recebidas, 99% respondidas, 9 aguardando, 92,1% resolvidas, 74,9% voltariam, 794 avaliadas, nota do consumidor 7,48, resposta em 6 dias e 3 horas.
  - Perfil separado da Fita UP: não apareceu na busca "toda up"; a página da Toda Up já traz o CNPJ da Fita UP LTDA.
  - Principais problemas: não lidos (a seção não abriu no texto); fica fora ou para o Job 2 no Chrome.
- **Sobre a Toda Up (todaup.com/pages/sobre-a-toda-up):** "Começamos como o segredo dos decotes impossíveis. Hoje, somos a base do seu guarda-roupa"; a marca nasceu com as fitas adesivas e "evoluiu" para a moda íntima.
- **FAQ (todaup.com/pages/perguntas-frequentes):** "A Fita UP acabou? Não, ela evoluiu! A Fita UP cresceu e virou Toda Up"; "Toda Up é outra empresa? Nadinha! Somos a mesma equipe [...] A mudança é apenas de marca e visual"; mudou o nome, o visual do site, as embalagens e o logo. Há também "Tenho um pedido feito no site antigo (Fita UP). Ele vai chegar?" e "Preciso criar um novo cadastro?". O FAQ e um pop-up trazem o cupom de primeira compra: **não citar**.
