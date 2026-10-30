---
titulo_provisorio: "Tamanho SHEIN no Brasil: como ler a tabela de medidas e o que fazer se não servir"
seo_title: "Tamanho SHEIN no Brasil: tabela de medidas e como acertar"
slug_sugerido: "tamanho-shein-brasil"
parceiro: "[[SHEIN]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia de Tamanho"
status: "pauta-aprovada"
responsavel: "-"
proxima_acao: "redacao"
bloqueado_por: "-"
data_criacao: "2026-10-30"
pauta: "SH-3 do molde moda-casa (30/10/2026), aprovada pelo Bruno em 30/10"
i18n_cluster: "shein-trust (proposta: entrar nos 10 idiomas)"
translationKey: "shein-tamanho"
modo_i18n: "familia-10-idiomas"
idioma_fonte: "pt"
---

# Briefing de Pauta: Tamanho SHEIN no Brasil

Fatos e pendentes em `fatos-3010.md`, nesta pasta.

## Abertura: buscas (autocompletar, 30/10/2026)

- Google "shein tamanho": "shein tamanhos para o brasil", "shein tamanho xl no brasil", "shein tamanho m", "shein tamanho l" (vários).
- Bing "tamanho shein brasil" (1 sugestão).

Leitura: a intenção é "qual tamanho eu peço" e "o que faço se não servir". Sinal forte no Google (várias variantes).

## O que muda a pauta

- **Nenhum artigo de tamanho da SHEIN no ar** (checado nos títulos e no molde de 30/10). O modelo é o `clea-store-tabela-de-medidas-como-escolher-tamanho`, já no ar, com a mesma lógica: ler a tabela da loja, medir e comparar em centímetros.
- **A tabela não foi lida nesta rodada.** A página de produto da SHEIN Brasil mostra a tabela por botão, e o conteúdo vem por JavaScript (o que as fontes de terceiros também dizem). Sem a tabela real, o texto não traz números.
- **Terceiros dão números que não batem.** Um guia lista o M com busto de 96 a 100 cm e cintura de 82 a 86 cm; outro, busto de 90 a 94 e cintura de 72 a 76 cm. Por isso o texto não traz equivalência P/M/G em centímetros nem "seu número brasileiro". Só entra o que a própria SHEIN publicar.
- **Troca de tamanho:** o dossiê traz devolução (20 dias, 1ª grátis, depois R$ 45), não troca. Confirmar na página de política se a SHEIN Brasil troca por tamanho ou só reembolsa (pendente).
- **Sem alegação de caimento:** ninguém do site usou as peças; o texto não diz que "veste bem" nem que "é pequena".

## Estrutura proposta (H2)

1. Resposta rápida: a tabela da SHEIN é em centímetros; meça e compare com a peça, não com a sua letra habitual. Se não servir, veja a política do pedido.
2. Como medir: busto no ponto mais cheio, cintura no mais fino, quadril no mais largo (método igual em todas as fontes lidas).
3. Como ler a tabela da peça: busto, cintura, quadril e comprimento; a diferença entre a medida da peça e a sua (folga).
4. Tabela das peças (quando lida): tamanho, medida da SHEIN em cm, a data.
5. Quando a letra engana: por que o mesmo P não serve em todas as peças (modelagem, tecido elástico ou não).
6. O que fazer se não servir: devolução (20 dias, a 1ª grátis, depois R$ 45) e troca, se a política confirmar. Link para `shein-vale-a-pena` (pauta 1).
7. Antes de comprar: o checklist do pedido (frete, prazo, imposto no resumo).
8. Perguntas frequentes (3 a 5).

## Mapa de sobreposição

| Tema | Já no ar | Ação |
|---|---|---|
| Devolução e prazo | `shein-e-confiavel` (seção) | Link |
| Decisão de compra | pauta 1 (`shein-vale-a-pena`) | Link de volta |
| Tamanho em outras lojas | `clea-store-tabela-de-medidas-como-escolher-tamanho` | Só como modelo, sem link (outra loja) |

## Família e idiomas (proposta de i18n)

- Mesma proposta de `shein-vale-a-pena`: família `shein-trust`, 10 versões, mesmo `coupon`.
- **PT:** `cta.url` = link brasileiro do código (`offerUrl` de `couponsData.ts`).
- **Outros 9 idiomas:** `cta.url` = `https://onelink.shein.com/55/6463grgxf6ru` (o `offerUrl` neutro de `couponTranslations.ts`). Sem `br.shein.com`.
- Tamanho em centímetros vale em todos os idiomas. A política de devolução e troca, só o que a página da SHEIN Brasil diz, sem regra brasileira fora do PT.

## Perguntas para o Bruno

1. **Números da tabela, se a leitura do navegador sair?** Recomendação: sim, com a data e a peça, e nunca a tabela de terceiros. Se a leitura falhar, o texto fica só com o método e o checklist.
2. **Equivalência P/M/G em centímetros?** Recomendação: não, a não ser que a tabela da SHEIN a publique. As fontes de terceiros se contradizem.
3. **Troca de tamanho existe?** Recomendação: o texto só diz "troca" se a página de política disser. Senão, descreve a devolução e o reembolso.

## Riscos

- Tabela muda por peça e por campanha; data em tudo e "confira antes de comprar" no lugar certo.
- Sem alegação de tecido, caimento ou tamanho real.

## Pendentes de navegador

- Tabela de medidas de peças (ex.: camiseta e vestido): página de produto em `https://br.shein.com/` (botão "TAMANHO E AJUSTE"). Não abri nenhuma: o conteúdo é por JavaScript.
- Política de troca e devolução da SHEIN Brasil: `https://br.shein.com/` (página de ajuda; o `Return-Policy-a-281` já foi lido pelo dossiê). Confirmar se há troca por tamanho.

## Decisões do Bruno (30/10/2026: "sim"; tamanho lido no Chrome no mesmo dia)
Fatos: `tamanho-shein-brasil-fatos-3010.md`, ao lado.

1. Família de 10 idiomas (decisão do Bruno). Fora do PT: sem link da SHEIN Brasil; o `cta.url` é o link neutro da página da loja (`getLocalizedCoupon('shein', locale).offerUrl`); regras de imposto e de devolução do Brasil só no PT. O 4CW5Y é código de indicação da SHEIN Brasil: pesquisa-se no app, não dá desconto, não é cupom e não "soma". Sem cupom de primeira compra como vantagem. Ninguém do site comprou para o artigo. Pendentes do briefing: conferir no Chrome antes de publicar (a SHEIN abre CAPTCHA em página de produto: parar e chamar o Bruno).
2. `translationKey` própria: `shein-tamanho`. Lido no Chrome em 30/10 (fatos, seção final): a tabela é por peça ("Guia de tamanhos" em cm e polegadas), há o "Verificar meu tamanho" (Fit Finder, pede altura, idade e peso) e o "Tamanho e ajuste" com as medidas da modelo. O artigo ensina a ler o guia de cada peça e não publica tabela única P/M/G nem equivalência de terceiros (as fontes se contradizem). Troca de tamanho: só se a política da SHEIN Brasil disser; senão, devolução (20 dias, a 1ª grátis, depois R$ 45, conferir no dia). Modelo de estrutura: `clea-store-tabela-de-medidas-como-escolher-tamanho`, sem link (outra loja).
