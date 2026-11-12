# Leituras do IL1: undershirts e camisa social da Insider (11/11/2026)

Base de [[como-evitar-mancha-de-suor-na-camisa-social]]. Sem login e sem finalizar a compra. Na releitura de 01/12, refazer na mesma ordem e comparar.

## IL1: carrinho da Insider (11/11/2026, noite, navegador, sem login, sem finalizar)

Carrinho Shopify (/cart/add.js e /cart.js) com o EMCASACOMCECILIA aplicado (linha de desconto "EMCASACOMCECILIA" em cada item):
- Undershirt Antissuor Leve, Bege / G / Gola V: R$ 145,00 → R$ 123,25 (−R$ 21,75, 15%).
- Undershirt Antissuor Moderado, Bege / G / Gola V: R$ 159,00 → R$ 135,15 (−R$ 23,85).
- Undershirt Antissuor Moderado, Preta / M / Gola V: R$ 145,00 → R$ 123,25 (o preço muda por variante: R$ 145, R$ 149 ou R$ 159).
- Kit 3 Undershirts Antissuor Moderado: R$ 413,12 (de R$ 477) → R$ 351,16 (−R$ 61,96). O código vale no kit (antes "a testar").
- Camisa Social Alfaiataria Tech FutureForm® Masculina, Off White / M: R$ 415 (de R$ 485) → R$ 352,75.
- Camisa Oversized Alfaiataria Tech FutureForm® Feminina, Off White / M: R$ 449 (de R$ 519) → R$ 381,65.
- Undershirt Antissuor Excessivo Block: todas as variantes indisponíveis no catálogo (/products.json de 11/11).
- Frete: só no checkout, com dados pessoais; grátis acima de R$ 399 (política de frete).

## Catálogo da loja (/products.json, 11/11/2026 às 20:59, mesmo dump do IL2)
- Undershirt Antissuor Moderado (undershirt-anti-suor): opções Cor Bege, Preta, Branca; Tamanho P a XGG; Modelo Gola V, Gola U. Preço por variante R$ 145, R$ 149 ou R$ 159.
- Undershirt Antissuor Leve (undershirt-simples): Cor Bege; Modelo Gola V; R$ 145 (XGG a R$ 129).
- Undershirt Antissuor Excessivo Block: Cor Bege, Branca; Gola V e U; todas as variantes indisponíveis.
- Fotos do artigo: galeria da Moderado no mesmo catálogo (1_ e 4_CAMISAETA_UNDERSHIRT_V_BEGE_2024, cdn.shopify.com da loja).

## Central de ajuda Insider: mancha, lavagem, undershirt e troca

Coleta: 11/11/2026, ~22h05 (Brasília). Fonte: API pública do Help Center (somente leitura, sem login, sem formulário, sem link de afiliado, sem bloqueio encontrado).

Método: o endpoint `/api/v2/help_center/pt-br/articles/search.json` deu 404 para todos os termos. Usei a listagem pública `/api/v2/help_center/pt-br/articles.json?per_page=100` (2 páginas, 67 artigos, com o corpo) e filtrei por termo localmente. Nenhum artigo tem "amarel" no texto. "Mancha" e "suor" aparecem só nos artigos de Lavagem, no mesmo parágrafo sobre axila.

## 1. O que a marca diz sobre a mancha amarela

Fonte: https://suporte.insiderstore.com.br/hc/pt-br/articles/32452263650324-Lavagem-Undershirt-Skin-Cropped-Cuecas-Comfort-e-Slip (id 32452263650324, atualizado em 24/08/2026). O mesmo parágrafo está em todos os artigos "Lavagem:", por exemplo https://suporte.insiderstore.com.br/hc/pt-br/articles/42753014537492-Lavagem-InLounge.

Trecho literal: "É importante saber que manchas na região das axilas podem ocorrer em roupas devido à combinação entre suor, oleosidade corporal e resíduos de antitranspirantes com alumínio — especialmente em tecidos de uso frequente. Esse é um comportamento comum do uso diário e não uma característica específica dos produtos da INSIDER."

Trecho literal: "Para minimizar esse efeito, a sugestão é aplicar o antitranspirante em menor quantidade, esperar a secagem completa antes de vestir a peça e realizar lavagens regulares conforme as instruções de cuidado. Sempre que possível, optar pelo uso de antitranspirantes sem alumínio, que reduzem bastante esse tipo de mancha."

Leitura: a marca atribui a mancha à combinação de suor, oleosidade e antitranspirante com alumínio, diz que é comum e não é defeito. Não há menção a desodorante sem o termo "antitranspirante", nem a alvejante como causa.

## 2. Como lavar (undershirt, Skin Cropped, Cuecas Comfort e Slip)

Fonte: https://suporte.insiderstore.com.br/hc/pt-br/articles/32452263650324-Lavagem-Undershirt-Skin-Cropped-Cuecas-Comfort-e-Slip

- "Lavar as roupas do avesso para evitar atrito."
- "Lavar em ciclo delicado, em temperaturas abaixo de 30 °C (temperatura ambiente)."
- "Evitar alvejantes e amaciantes para não danificar o tecido."
- "Não limpar a seco."
- Secagem: "Pode ser seca em tambor/secadora, utilizando temperaturas baixas." e "Também pode ser seca em varal, à sombra."
- "Evitar o uso de pregadores e cabides enquanto a peça estiver molhada, para não marcar o tecido."
- "Não é necessário passar, mas caso queira, utilizar temperaturas até 110 °C, sem vapor."
- "Pode encolher até 7%."
- "Não são indicadas para uso em piscina ou praia, pois podem ficar até 50% mais frágil quando molhadas."
- Composição: "88% Micromodal e 12% Elastano".

Atenção: a central permite secadora em baixa temperatura para a undershirt, mas o artigo do site sobre a undershirt não cita isso. Os dois artigos do site (ver seção 5) também não citam. Ponto a conferir antes de publicar.

Outras peças de Lavagem (dados que o IL1 pode usar, todos conferidos no corpo do artigo):
- Lavagem: Perfect Top (no artigo "Saia Envelope Breeze, Perfect Top, Perfect Body, Underwear Feminina e Cueca Performance", https://suporte.insiderstore.com.br/hc/pt-br/articles/32452448210964-Lavagem-Saia-Envelope-Breeze-Perfect-Top-Perfect-Body-Underwear-Feminina-e-Cueca-Performance): "Pode encolher até 3%." e "Secar em varal, à sombra, ou em secadora a baixas temperaturas."
- Core T-Shirt (https://suporte.insiderstore.com.br/hc/pt-br/articles/32452716798484-Lavagem-Core-T-Shirt-Camiseta-Polo-e-Henley-Game-Changer): "Pode encolher até 8%." "Não usar tambor/secadora."
- Tech Heavy (https://suporte.insiderstore.com.br/hc/pt-br/articles/32452766155412-Lavagem-Tech-Heavy-e-Tech-Heavy-Slim): "Pode encolher até 5%." "Não usar tambor/secadora."
- Camiseta Básica Tech Daily (https://suporte.insiderstore.com.br/hc/pt-br/articles/32452413622292-Lavagem-Camiseta-B%C3%A1sica-Tech-Daily): "Pode encolher até 4%."
- Performance T-Shirt 2.0 (https://suporte.insiderstore.com.br/hc/pt-br/articles/32452277192212-Lavagem-Performance-T-Shirt-2-0): "Pode encolher até 7%."
- Tech T-Shirt (https://suporte.insiderstore.com.br/hc/pt-br/articles/31863673904788-Lavagem-Tech-T-Shirt-Mosquito-Repeller-Regata-Intech-e-High-Neck): "Pode encolher até 8%." "Secar em varal, de preferência à sombra." "Não usar tambor/secadora."
- Oversized T-Shirt (https://suporte.insiderstore.com.br/hc/pt-br/articles/32452300802068-Lavagem-Everyday-Shorts-Oversized-T-Shirt-Cal%C3%A7a-Wide-Leg-Minimal-Top-Boxy-Cropped-e-Heavy-Pullover): "Pode encolher até 8%." "Pode ser seca em tambor/secadora, utilizando temperaturas baixas."

## 3. Antitranspirante e desodorante

Só o parágrafo da seção 1. A central não cita desodorante, nem antitranspirante sem alumínio como produto da marca. Não encontrei "antiodor" nem "anti odor" nos corpos de Lavagem da central (busca local nos 67 artigos).

## 4. Troca: undershirt e underwear

Fonte: https://suporte.insiderstore.com.br/hc/pt-br/articles/33620101600532-Trocas-e-Devolu%C3%A7%C3%B5es-Como-fazer-Prazos-e-Condi%C3%A7%C3%B5es (atualizado em 06/11/2026).

- "Por motivos de higiene e segurança, as linhas Underwear e Beachwear só podem ser trocadas ou devolvidas em caso de defeito de fabricação."
- Tabela: Arrependimento "até 7 dias úteis após o recebimento"; Insatisfação (tamanho, cor, modelo etc.) "até 21 dias corridos após o recebimento", "Produto sem uso, com etiqueta intacta e sem sinais de lavagem"; Defeito "até 180 dias corridos após o recebimento", com "Envio de imagens que mostrem o defeito alegado".
- Seção 7: "Por motivos de higiene e segurança, não realizamos trocas ou devoluções das linhas Beachwear e Underwear, exceto em casos de defeito de fabricação."

Ponto de atenção: o artigo não cita undershirt pelo nome. A undershirt só aparece no artigo de Lavagem, junto de "Cuecas Comfort e Slip". Que a undershirt está na linha Underwear é inferência, não dito pela central. O site diz isso como fato ("as undershirts seguem essa regra"), sem fonte na central.

Troca de presente: mesma página, seção 8, "Após aprovação da solicitação, disponibilizaremos um cupom correspondente ao valor do produto". Também: "Itens enviados como brinde ... não são elegíveis para troca ou devolução individual."

Não há artigo de "como usar a undershirt" na central. Nenhum artigo da central descreve uso sob camisa.

## 5. O que os dois artigos do site já dizem (resumo de 10 linhas cada)

### content/reviews/camiseta-insider-encolhe-como-lavar.json (id 837, 06/11/2026)
Título: "Camiseta Insider encolhe? Como lavar e tirar a mancha da axila". Cupom EMCASACOMCECILIA (15%).
1. Tabela de encolhimento por linha (Core 8%, Tech Daily 4%, Tech Heavy 5%, Oversized 8%, Performance 7%, Tech T-Shirt 8%, Perfect Top 3%). Conferido na central: todos batem.
2. Perfect Top: secadora em baixa temperatura, água abaixo de 30 °C, sabão neutro, sem alvejante nem amaciante. Confere com a central.
3. Tech: "não vai na secadora", garantia de cor de 2 anos "considerando uma lavagem por semana". Garantia não conferida na central.
4. Vídeo: Blusa de Alça The Perfect Top lavada a 30 °C, sem sabão, costura amarela da axila sai. Relato da Cecília.
5. Afirma que o cheiro de suor também saiu. Relato dela, sem produto.
6. Mancha: "a marca diz que não é defeito da peça" e as quatro dicas da central (menos antitranspirante, esperar secar, lavar com regularidade, preferir sem alumínio). Confere.
7. Troca por tamanho: 21 dias corridos, peça sem uso e sem sinal de lavagem. Confere com a central (Insatisfação).
8. Diz que a política completa está em /reviews/insider-store-e-confiavel (não lido).
9. FAQ diz que a Insider "só libera a secadora ... na Perfect Top e na Oversized". Conferido: Oversized sim, Perfect Top sim (central); Tech não.
10. Editorial: "as outras peças não foram testadas". O artigo não diz quanto encolheu. Para o IL1: a mancha amarela é citada como comportamento da marca. Linkar, não repetir o relato do vídeo como fato.

### content/reviews/undershirt-insider-qual-escolher-funciona.json (id 523, publicado 20/10/2026, atualizado 08/11/2026)
Título: "Undershirt Insider: Leve, Moderado ou Block, qual escolher para o seu nível de suor". Cupom EMCASACOMCECILIA (15%).
1. Escolha pelo nível de transpiração que a marca indica: Leve, Moderado, Block. Ficha da loja, não teste.
2. Construção: Moderado tem camada dupla nas axilas; Block tem reforço impermeável nas axilas (segundo a marca); Leve não declara nada disso.
3. Composição: Moderado e Block 88% modal e 12% elastano; Leve 88% TENCEL Modal e 12% elastano. Não conferido nas páginas de produto.
4. Preços e cupom: Leve R$ 145; Moderado R$ 145 a R$ 159; Block R$ 185 e R$ 189; cupom 15% "conta nossa"; kit de 3 Moderado gola V R$ 413,12. Preços de página, não conferidos aqui (página de produto fora do escopo).
5. Avaliações: 291 (Leve), 2.856 (Moderado), 1.302 (Block), nota 4,9. Dado da loja.
6. Estoque em 20/10: Block esgotado; Leve 3 de 5 tamanhos.
7. Troca: "A undershirt não é trocada por tamanho ... a linha Underwear só troca ou devolve por defeito de fabricação" e 180 dias por defeito. A regra da central fala em Underwear, não em undershirt (ver seção 4).
8. Encolhimento: "pode encolher até 7%". Confere com a central (32452263650324).
9. Diz que "a undershirt não trata, não cura e não elimina o suor" e manda ao dermatologista para suor excessivo. Não está na central; é posição editorial.
10. Uso: "A loja apresenta a peça para usar por baixo da camisa social." Vem da página de produto, não da central.

## 6. Pontos para o IL1

- Mancha amarela: a central atribui a suor, oleosidade e antitranspirante com alumínio. Citar com o trecho literal e a URL 32452263650324.
- Lavagem: a central diz 30 °C, ciclo delicado, sem alvejante nem amaciante, sem limpeza a seco. A secadora em baixa temperatura aparece na central para a undershirt, mas não no artigo do site. Vale uma correção ou uma linha.
- Troca: a regra Underwear/Beachwear está na central. A undershirt não aparece por nome; o site trata como Underwear sem fonte direta. Atenção ao afirmar.
- Desodorante: a central não cita marca nem tipo de produto. Só "antitranspirante com alumínio" e "sem alumínio", sem marca.
- Não há artigo na central sobre "amarelada" ou "undershirt" como produto. Os dados de uso e de nível de suor são da página de produto da loja, fora do que li.
- Limites: não abri página de produto, não abri links de afiliado e não testei nenhuma peça.
