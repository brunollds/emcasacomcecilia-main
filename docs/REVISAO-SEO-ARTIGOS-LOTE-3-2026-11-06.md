# Revisão SEO — cinco artigos PT (lote 3)

Data: 06/11/2026. SEO Audit aplicado com três subagentes GPT-6.1 Terra e revisão central. Somente sugestões; artigos e dados de ofertas não foram alterados.

Base: release informado `45ab7e43`, com confirmação das cinco páginas no navegador. Isso não atesta o hash do deploy atual. Canonical próprio, lang pt-BR e index/follow observados nas cinco. Títulos e descrições conferidos no HTML; não foram confundidos com os resultados efetivamente exibidos pelo Google. Sem teste novo de checkout nem medição de Core Web Vitals.

Dados: export direto do Search Console de 03/11, período 05/10–01/11, aba Páginas. Não há cruzamento por consulta neste relatório; ausência de cliques não foi usada como falha comercial.

| Artigo / arquivo em content/reviews | Impressões | Posição média |
|---|---:|---:|
| `sofa-damie-modular-vale-a-pena.json` | 4 | 6,50 |
| `promocao-dolce-gusto-caixas-mini-me-gratis.json` | 13 | 8,46 |
| `clube-dolce-gusto-como-funciona.json` | 223 | 9,64 |
| `cupom-ceciemcasa-i-wanna-sleep-como-usar.json` | 2 | 6,50 |
| `cupom-ceci-nestle-nutre-como-usar.json` | 3 | 8,00 |

## 1. Sofá modular Damie vale a pena?

Arquivo: `content/reviews/sofa-damie-modular-vale-a-pena.json`.

- **Média:** a seção de compra promete devolução “sem burocracia”. Qualificar as condições e ligar à política. A página oficial de teste exige conservar embalagem e produto completo, mas fala especificamente de poltronas; conferir com a marca a aplicação ao sofá antes de transportar essa exigência como fato. O artigo pode desde já recomendar confirmar os requisitos antes de descartar embalagens. Fonte: https://www.damie.com.br/pages/teste-por-30-dias .
- **Média:** informar modelo/configuração, revestimento e período real de uso com datas, se disponíveis. Hoje a ficha diz apenas “primeiros meses de uso diário”, dificultando situar a experiência. Preservar compra e experiência já declaradas; não inventar nova duração nem recebimento.
- **Média:** complementar o conselho de medir acessos com medidas verificadas das caixas/módulos do modelo testado e espaço de montagem, sem prometer passagem por qualquer porta. O artigo já reconhece que as caixas têm tamanho; aprofundar esse ponto traz utilidade à decisão.
- **Baixa:** revisar relacionados explicitamente definidos: o guia de cupom Dolce Gusto tem pouca conexão com a compra do sofá. Preferir conteúdo pertinente da Damie. Código e desconto já estão na metadata; não retirar CECILIA12 para buscar mais cliques.

## 2. Mini Me: combo com 20 caixas, avulsa ou promoção

Arquivo: `content/reviews/promocao-dolce-gusto-caixas-mini-me-gratis.json`.

- **Alta:** atualizar a explicação do gatilho vigente com regulamento datado. O texto diz que a quantidade aparece só no carrinho e trata regras de junho como referência. O regulamento consultado em 06/11 já traz uma campanha “acima de 70 caixas”, disponível desde 02/11. Linkar esse regulamento e confirmar no carrinho, preservando o histórico de junho em bloco identificado. Não converter “acima de 70” em “70 ou mais” sem confirmar. Fonte: https://www.nescafe-dolcegusto.com.br/sobre/regulamentos .
- **Média:** manter R$ 797 e R$ 419,90 como comparação de 24/10, inclusive nas repetições e conclusão; ou revalidar valores e refazer a conta. A diferença histórica de R$ 377,10 e o ponto de equilíbrio de aproximadamente R$ 18,86/caixa estão matematicamente corretos. Para decisão atual, incluir frete, mesmas caixas/quantidades e descontos elegíveis em ambos os cenários.
- **Média:** a capa ainda é uma arte de junho com 55 caixas, enquanto o título apresenta guia atual. Usar capa coerente com o comparativo ou identificar visivelmente que a arte é histórica. Não apagar material documental da galeria.
- **Média:** a nota declara parceria comercial, mas pode explicitar comissão pelo CECI. Manter 10% e condições conforme evidência canônica atual; não regressar a 5% com base em dossiê antigo. Não prometer cupom cumulativo em qualquer combo.

## 3. Clube Dolce Gusto

Arquivo: `content/reviews/clube-dolce-gusto-como-funciona.json`.

- **Alta:** substituir a resposta que sugere ausência de limite por mês. O regulamento estabelece limites de cadastro de códigos: 30/dia, 60/semana, 90/mês e 250 nos últimos 12 meses. São limites de códigos, não teto geral de pontos por todas as atividades.
- **Alta:** adequar o FAQ de prazo: o regulamento admite até três dias úteis para refletir pontos, diferente da expectativa de crédito instantâneo ou intervenção após 24 horas. Fontes para estes dois itens: https://www.nescafe-dolcegusto.com.br/program-rules .
- **Alta:** qualificar a tabela de pontuação. Termos oficiais diferenciam caixas de 10 cápsulas (50 pontos) de 12/16 (100), enquanto trechos do FAQ generalizam 100; newsletter também aparece como 100 e 200 em trechos da própria fonte. Acrescentar data/fonte e solicitar confirmação da marca antes de publicar certeza uniforme. Fontes: https://www.nescafe-dolcegusto.com.br/sobre/termos e https://www.nescafe-dolcegusto.com.br/faq/ .
- **Média:** explicitar a fonte e a data da regra de validade. O FAQ sustenta seis meses de inatividade; há divergência reportada nos termos. Não trocar automaticamente por outro prazo sem resolver a diferença com a marca.
- Manter a distinção correta já feita: comprar com CECI e depois cadastrar códigos das caixas acumula pontos; isso não equivale a resgatar pontos no mesmo carrinho. Na explicação de resgate, orientar consulta das restrições da promoção.

## 4. Como usar CECIEMCASA na I Wanna Sleep

Arquivo: `content/reviews/cupom-ceciemcasa-i-wanna-sleep-como-usar.json`.

- **Alta:** rever a exclusão categórica de box/colchões e a afirmação de venda apenas física em BH. O teste documentado em `src/lib/couponsData.ts` (entrada i-wanna-sleep) aplica CECIEMCASA a box e kit Pillow Top em 24/10, posterior ao texto. Remover a proibição universal e orientar disponibilidade e aplicação por produto no checkout, sem extrapolar a todos os modelos.
- **Média:** retirar a especulação de que o código deve funcionar em eventual app. A fonte do projeto registra que a marca vende pelo site e não possui app; orientar navegador/site oficial, sem inventar um canal.
- **Média:** alinhar FAQ sobre promoções: hoje mistura afirmação de soma com uma ressalva antiga atribuída à página da loja. Usar condições verificadas e teste datado, preservando a conferência do resumo antes de pagar. Remover número de parcelas não sustentado ou ligar às condições atuais do checkout.
- **Baixa:** explicitar que a parceria gera comissão pelo código, pois a nota atual fala genericamente em apoio pelas indicações.
- Preservar CECIEMCASA 10%. CECIEMCASA15 é código de campanha com períodos próprios; não substituir o código perene nem inserir oferta temporária sem mecanismo de validade. Evidência: `limitedCodes` e `testNote` da entrada da loja em `src/lib/couponsData.ts`.

## 5. Como usar CECI na Nestlé Nutre

Arquivo: `content/reviews/cupom-ceci-nestle-nutre-como-usar.json`.

- **Alta:** atualizar FAQ de assinatura. A fonte oficial hoje informa 10% nos três primeiros pedidos e 15% a partir da quarta recorrência consecutiva; o artigo traz terceira. A mesma fonte diz que cupons promocionais do site não são válidos em pedidos por assinatura. Atribuir a política à loja e não prometer soma com CECI sem verificação específica. Fonte: https://www.nestlenutre.com.br/assinaturas .
- **Média:** datar ou retirar do FAQ o mínimo de R$ 400 para frete grátis; trata-se de condição volátil e o artigo não informa quando a observou. Direcionar ao checkout por CEP e campanha.
- **Média:** apresentar a prova própria de aplicação já documentada, se incorporada ao texto, com sua data real: 26/10, Nutren Fortify, R$ 283,78 para R$ 255,40. Fonte: entrada nestle-nutre de `src/lib/couponsData.ts`. Não apresentar como teste novo.
- Manter escopo nos produtos elegíveis e as exclusões explícitas. O artigo cita fórmulas infantis apenas para negar uso do cupom; não foi identificada promoção positiva delas que justifique apontar infração pela mera menção. Divulgação e link interno relativo já existem.

## Fila

Os cinco artigos acima estão revisados, sem sugestões implementadas. Regra adicionada ao diretor: reservar rodada exclusiva de dez quando a fila alcançar uma família multilíngue. Nenhuma família foi iniciada neste lote. Os próximos cinco pendentes são Dolce Gusto é confiável, cobertor Igloo, cupom Magalu, poltrona Damie 2.0 e Genio S Touch; depois chega a família YesStyle de como encontrar cupons, para rodada exclusiva.
