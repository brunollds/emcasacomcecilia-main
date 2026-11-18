# Orientação: BAW Clothing (segundo piloto, fluxo v2)

Etapa 0, escrita pela coordenação em 18/11/2026, antes de qualquer coleta. O analista da etapa 5 lê este arquivo ao
começar e registra no relato dele o que discorda; a coordenação ajusta aqui e anota no `decisoes.md`.

Fontes lidas: dossiê `01_Parceiros/BAW-Clothing.md`, pesquisa semente `02_Artigos/baw-fatos-1611.md` (16/11/2026, com
leituras da redação até 17/11), a Fila de Pautas (seção 1 e linha da BAW no estoque) e `content/reviews/` (seis JSONs da
BAW). Nada aqui foi relido na fonte hoje.

## 1. O que já sabemos (não recoletar sem motivo)

| Tema | Fato | Fonte |
|---|---|---|
| Código | `BAWEMCASACOMCECILIA`, 10%, site e app; soma com promoção (carrinho de 16/11); não dá frete grátis | dossiê, seção 1 |
| Pix | 5% em todo o site, soma com o código; valor dos dois juntos sem carrinho testado | dossiê; semente 9.8 |
| Primeira compra | O nosso código dá o mesmo desconto do FIRSTBAW (testes de 17/11 no app e no site) | dossiê, seção 1 |
| Valor mínimo | Indício: R$ 69,00 não aceitou nenhum código; R$ 208,00 aceitou. Corte exato sem leitura | dossiê, seção 1 |
| Link de afiliado | Não há; a venda conta pelo código | dossiê |
| Plataforma | Wake (checkout fbits); produto em `/produto/<slug>`, carrinho em `/checkout`. A aba "Descrição" das fichas não abriu por script em 16/11 | dossiê, seção 2; semente 6 e 12 |
| Menu | Vestuário (Camisetas, Moletons, Camisas, Calças, Jaquetas, Shorts, Saias), Acessórios (Bolsas e Acessórios, Bonés, Meias), Kids, Calçados (Tênis, Slide) | semente 12 |
| Fichas | Sem guia de tamanhos único; medidas na descrição de cada peça; várias fichas vazias (camisetas da campanha, infantil, todos os tênis lidos); "regular" não é uma medida só | semente 9.5 |
| Reputação e dono | Reclame Aqui de 6 e 12 meses; fundadores, compra pela Arezzo&Co (2021) e volta aos fundadores (2025), pela imprensa; dois CNPJs | semente 3, 4, 10, 11 |
| Políticas | Troca só por crédito; devolução com reembolso na mesma forma de pagamento; 7 dias (90 por defeito); cancelamento só antes da expedição | semente 6 e 9.3 |
| Black Friday | Página "A ÚLTIMA BLACK FRIDAY DA BAW", sem datas nem regulamento; preços de 12 peças lidos em 16/11 | semente 5 e 9.6 |
| Busca (16/11) | Autocompletar das seis pautas; topo do Google de cinco consultas, com anúncios de sites de cupom e visão de IA que diz que a marca é da Arezzo | semente 1 e 9.7 |
| Experiência própria | Não há: só fontes públicas | Bruno, 16/11 |

**Publicado:** `/cupons/baw` e os seis artigos BW1 a BW6 (`content/reviews/`: `cupom-baw-como-usar`,
`black-friday-baw`, `baw-clothing-reclame-aqui-nota-reputacao`, `baw-clothing-e-confiavel`,
`cupom-baw-primeira-compra`, `baw-clothing-e-boa`). A etapa 4B confere no site se estão no ar.

**Bruto:** a semente é texto escrito pelas sessões, sem arquivos de coleta nem hash. O que ela diz vale como evidência
da semente (`modalidade = resumo-coletor`), citado por seção; não precisa ser recoletado para entrar na matriz.

## 2. O que falta

1. **O catálogo inteiro.** A semente leu a vitrine da Black Friday e algumas fichas; não há lista do que a loja vende
   por categoria, linha e modelagem.
2. **Interesse além do nome da loja:** produtos e categorias (moletom, camiseta oversized, tênis, calças, kids),
   collabs, outlets e loja física, e temas amplos sem a marca (camiseta oversized masculina, moletom streetwear).
3. **Medidas por categoria:** em quantas fichas de cada categoria há medida e composição. A semente leu pouco mais de 20, quase todas de camiseta, moletom e calçado.
4. **Mercado Livre:** a loja oficial não abriu (pediu verificação de conta). Preço e existência sem leitura.
5. **Respostas de IA:** a visão de IA do Google diz que a BAW é da Arezzo; a medição manual de IA nunca foi feita.
6. **Nossos dados:** o parceiro entrou em 16/11. O snapshot `_site/` mais recente (17/11) cobre até 15/11: a expectativa
   é nenhum dado da BAW. As páginas de moda de outras parceiras (Insider, Toda Up, Cléa Store, DAMIE) servem de
   referência de formato e de perguntas.

## 3. Perguntas que podem mudar uma decisão

| # | Pergunta | Decisão que ela muda | Quem responde |
|---|---|---|---|
| P1 | Há procura por categoria ou produto da BAW (moletom, camiseta oversized, tênis, calça, kids) que justifique artigo próprio? | Abrir ou não as pautas do estoque (moletom vale a pena, camiseta oversized, "o tênis BAW é bom?") | etapas 2 e 3 |
| P2 | As fichas têm medida suficiente, por categoria, para um guia de tamanhos sem peça em mãos? | Pauta "BAW guia de tamanhos: regular ou oversized" (estoque, sem GO) | etapa 2 |
| P3 | A vitrine da Black Friday mudou (preços, peças, datas, regulamento) antes de 27/11? | Atualização da BW6 na semana de 27/11 | etapa 3 (vitrine) e etapa 2 (preços do catálogo) |
| P4 | Collabs à venda hoje e outlets ou loja física com fonte oficial? | Pautas de collab e de loja física (estoque) | etapas 2 e 3 |
| P5 | O que as IAs respondem sobre "a BAW é confiável", "de quem é a BAW" e "cupom BAW"? Citam o nosso código? | Capítulo de correção na BW3 e frases na BW1 e na BW4 | etapa 4A (consulta manual) e etapa 3 (visão de IA da busca) |
| P6 | A loja oficial no Mercado Livre existe e com que preços? | Frase de marketplace na BW1, na BW3 e na BW6 | etapa 3, se abrir sem login |
| P7 | Quais perguntas do "As pessoas também perguntam" e do autocompletar os seis artigos ainda não respondem? | Melhorar capítulo ou FAQ dos seis | etapa 3 e 4B |

Fora do programa (vão ao Bruno ou à sessão de cupons, não são coleta): valor mínimo exato do código (carrinho), datas e
sentido de "a última Black Friday" (a parceira), BAWPOINTS com o código (carrinho).

## 4. Escopo

**Completo para catálogo e interesse externo; enxuto para reputação, dono e políticas.** A semente responde bem às
seis pautas do pacote inicial e o parceiro não tem histórico no site, mas não responde P1 a P4: o catálogo e os sinais
de produto não existem. Reclame Aqui, imprensa e políticas não são recoletados; entram pela semente.

## 5. Prazo

P3 tem data: a vitrine da Black Friday é lida até 25/11 para a BW6 poder ser atualizada na semana de 27/11. O resto não
tem prazo.
