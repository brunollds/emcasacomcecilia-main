---
slug: "poltrona-charles-eames-design-iconico-e-alternativas"
title: "Como Escolher uma Poltrona Decorativa: da Eames à Aurora e Levita"
seo_title: "Poltrona Decorativa: Eames, Aurora Manual ou Levita Elétrica?"
description: "Guia de poltrona decorativa por uso, espaço e revestimento, com a Eames como referência e comparação Aurora/Levita."
category: "produtos-experiencias"
reviewKind: "guia"
type: "Guia de Design"
author: "Cecília Mauad"
publishedAtISO: "2026-09-02"
affiliate: "damie"
coupon: "CECILIA12"
status: "pronto-para-deploy"
responsavel: "Codex"
proxima_acao: "publicação depende de autorização de push e deploy; commit local autorizado por Bruno"
bloqueado_por: null
---

# Como Escolher uma Poltrona Decorativa: da Eames à Aurora e Levita

## Estado editorial

Revisão implementada em 02/09/2026, ainda sem deploy. O artigo deixou de tratar a Eames como única porta de entrada e passou a responder à escolha de poltrona decorativa na sala: uso, circulação, apoio de pés, energia e revestimento. A Eames funciona como referência histórica; Aurora manual com puff e Levita elétrica entram como alternativas de uso, sem declarar teste da Aurora.

`category` é `produtos-experiencias`, embora `reviewKind` permaneça `guia`: o texto cita e incorpora foto da experiência real da Cecília com a Levita. A experiência está delimitada ao modelo elétrico; os dados da Aurora são atribuídos à página oficial.

## Mudanças implementadas

- título, `seoTitle`, description e meta description agora miram a decisão de poltrona decorativa;
- história da Eames recupera Charles e Ray Eames, 1956, a metáfora da luva de beisebol e inclinação fixa;
- inclusão de critérios de espaço, circulação, rotina e revestimento, sem promessas médicas;
- Aurora: alavanca manual, puff independente, base 360° e couro/linho, com fonte oficial;
- Levita: experiência real da Cecília, dois motores independentes, pescoço manual, bivolt e giro de até 280°;
- comparação Aurora × Levita em tabela por mecanismo, apoio de pés, giro, tomada e revestimentos;
- nenhum claim jurídico sobre réplica, cópia, trade dress ou infração;
- removido o link para `/cupons/damie`; o cupom permanece contextualizado como `CECILIA12`, 12% em itens elegíveis, sujeito ao checkout;
- CTA para o guia Aurora no espaço DAMIE, sem chamá-lo de site oficial da fabricante.
- pedido de Bruno em 02/09/2026: os trechos de experiência passam para primeira pessoa, pois Cecília é a autora; a ressalva sobre a Aurora mantém explícito que ainda não houve teste pessoal.
- fontes de pauta CSV anual e trimestral fornecidas por Bruno em 02/09/2026: FAQ ganhou quatro perguntas de intenção decorativa (sala, quarto, giro e uma peça versus duas) e a pergunta sobre puff foi reformulada para sala pequena. As respostas permanecem gerais, sem atribuir características de kit à DAMIE ou inventar vivência.
- pedido de Bruno em 02/09/2026: o nome público foi padronizado como “Cadeira Eames Lounge” e a seção histórica passou a ter carrossel com a foto limpa inicial e três imagens históricas já presentes na galeria. O arquivo `eames-lounge-chair-produto-oficial.webp` permanece identificado pelo conteúdo real: anúncio de época com pessoa e bebê.
- as três imagens históricas do carrossel usam `objectFit: "contain"` e `aspectRatio` correspondente ao arquivo (janela 1000×788; leitura 960×540; anúncio 1044×1402), para preservar suas proporções sem moldura quadrada com sobras excessivas.

## Mídia

- os nomes dos dois arquivos Eames estavam trocados em relação ao conteúdo visual: `eames-lounge-chair-produto-oficial.webp` é anúncio vertical de época com pessoa e bebê; `eames-lounge-chair-anuncio-herman-miller-vintage.webp` é a foto limpa quadrada de produto;
- a foto limpa quadrada passa a ser a imagem inline da seção Eames, com `imageFit: "square"`;
- o anúncio vertical recebe alt e legenda condizentes na galeria;
- foto própria `damie/poltrona-levita-cecilia-selfie.jpg` entrou no corpo e na galeria. Ela mede 3452×4231; a seção usa `imageAspectRatio: 0.8158827700307256` (largura/altura), uma extensão opt-in que dimensiona somente esse frame na proporção real. Assim, rosto e pés ficam preservados sem as faixas da moldura fixa 9:16; imagens sem esse campo mantêm o comportamento anterior.

## Fontes e verificações

| Afirmação | Fonte exata | Consulta/resultado |
|---|---|---|
| Cadeira Eames Lounge, metáfora da luva e inclinação fixa | https://store.hermanmiller.com/features-buying-guides-eames-lounge-chair.html?lang=en_US | consultada em 02/09/2026 |
| Charles e Ray Eames / registro de acervo | https://www.moma.org/collection/works/3325 | consultada em 02/09/2026 |
| Exemplo ES670 Preta/Walnut: R$ 66.866 | https://store.hermanmiller.com.br/poltrona-charles-eames-es670_pretawalnut/p | valor pontual em 02/09/2026 |
| Exemplo conjunto Lounge e otomana: R$ 82.272 | https://store.hermanmiller.com.br/poltrona-eames-lounge-e-otomana/p | valor pontual em 02/09/2026 |
| Aurora: alavanca, puff, giro 360°, couro/linho | https://www.damie.com.br/products/poltrona-reclinavel-aurora | URL 200 confirmada pela frente em 02/09/2026 |
| Levita: dois motores, pescoço manual, bivolt, giro até 280° | https://www.damie.com.br/products/poltrona-reclinavel-damie-levita | URL 200 e FAQ oficial confirmados pela frente em 02/09/2026 |
| Experiência real Levita | `content/reviews/poltrona-levita-o-topo-da-tecnologia-e-conforto.json` e foto própria da Cecília | não extrapolar para Aurora |

## Revisão independente e verificação local

Implementação pelo subagente GPT-5.6 Terra e revisão pelo agente principal. A revisão pediu segunda passada para retirar linguagem de bastidor, reduzir repetição e corrigir fontes marcadas como patrocinadas; também detectou e corrigiu uma vírgula excedente no JSON.

- Eames conferida no navegador: foto correta, frame quadrado de 512×512 no desktop.
- Cecília/Levita conferida no corpo: proporção preservada, sem faixas grandes; ampliador abre e fecha normalmente.
- Corrigido transbordamento mobile da tabela com `min-w-0` no item de grid do template. Na tela de teste, página e viewport mantiveram 382 px úteis; tabela de 640 px ficou dentro do contêiner de 350 px com rolagem própria.
- `imageAspectRatio` é opcional; valores ausentes, não finitos, zero, negativos ou strings mantêm o padrão. Nove casos de normalização passaram em execução independente.
- `content:index`, `typecheck`, `validate:content`, `test:internal-links`, `test:review-i18n` e ESLint nos componentes/tipo canônico alterados passaram. Os 363 avisos gerais de conteúdo são preexistentes.

## Pendências

- FAQ aprovado por Bruno e revisado em 02/09/2026: 11 perguntas, sendo quatro novas e uma reformulada; preservada a pergunta factual sobre o puff incluso da Aurora, sem duplicar a resposta de planejamento de espaço.
- `validate:content`, typecheck e lint focado aprovados. Build completo aprovado em 02/09/2026: 321 páginas geradas e matriz de HTML/idiomas verde. A primeira tentativa falhou por acesso às fontes do Google; a repetição com acesso à rede passou.
- Commit local autorizado. Os índices foram preparados seletivamente para conter apenas este artigo, preservando as alterações concorrentes do comparativo Genio S fora do commit.
- Push e deploy não autorizados nesta rodada; o artigo não foi publicado por esta tarefa.
