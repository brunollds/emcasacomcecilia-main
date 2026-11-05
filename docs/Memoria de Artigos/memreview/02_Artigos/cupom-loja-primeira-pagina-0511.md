---
titulo_provisorio: "Cupom <loja> na 1ª página: Max Titanium, Probiótica e Insider"
parceiro: "max-titanium, probiotica, insider"
status: "pauta-aprovada"
responsavel: "Claude"
proxima_acao: "sessão de artigos: partes 1 e 2; sessão de cupons: parte 3; remedir ~14/11"
bloqueado_por: null
data_criacao: "2026-11-05"
modo_i18n: "somente-pt"
---

# Cupom <loja> na 1ª página (05/11/2026)

Origem: handoff da sessão de snippets/Bing (05/11), decidido pela sessão de pautas e aprovado pelo Bruno ("GO") em 05/11. Continua [[canibalizacao-cupom-lojas-3110]].

## Dados (Search Console, 09/10–04/11)
| Busca | Página | Impressões | Posição |
|---|---|---|---|
| cupom max titanium | /reviews/cupom-max-titanium-como-usar | 185 | 32 |
| cupom max titanium | /cupons/max-titanium | 103 | 50 (30 → 44 de 25–28/10 para 01–04/11) |
| cupom probi… | /cupons/probiotica | 297 | 12 |
| cupom probi… | /reviews/cupom-probiotica-como-usar | 209 | 34 |
| cupom insider | /cupons/insider | 175 | 25 |
| cupom insider | /reviews/insider-mercado-livre-ou-site | 11 | 10 |
| desconto insider | /cupons/insider | 104 | 41 |

## Decisões
1. **Dona do "cupom <loja>": `/cupons/<loja>` nas três.** É a página com o código e o % no título, o que vende no snippet. A Max fica em observação: se em ~14/11 a `/cupons/max-titanium` seguir depois da posição 30 e o artigo antes da 20, a dona passa a ser o artigo, só na Max.
2. **Sem pauta nova de cupom da Insider.** Uma 3ª URL de cupom repetiria a canibalização. O `black-friday-insider` já existe. "Cupom Insider primeira compra" pede antes o fato (a loja tem cupom de primeira compra?) e a decisão do Bruno.
3. **Correção do levantamento de 31/10:** ele dizia que Max e Probiótica já tinham a âncora em todos os artigos. Os artigos fortes usam "página do cupom da <loja>", não a âncora exata "cupom <loja>", que só os de como usar têm.

## Parte 1, sessão de artigos: título dos como usar (2 artigos)
- `cupom-max-titanium-como-usar` e `cupom-probiotica-como-usar`: `seoTitle` pelo lugar e pelo passo a passo, sem o %. Modelo: "Onde colar o MAX10EMCASACOMCECILIA no carrinho da Max Titanium (passo a passo)". O `title` perde o ": até 10% de desconto". A `metaDescription` fica sem o %.
- H1, slug e URL não mudam (regra de 31/10). A Insider fica como está: o artigo dela não aparece para "cupom insider".
- O snippet com código (`checkSnippet`) exige % na 1ª frase em artigo com `coupon`: se a catraca barrar, registrar a exceção em `SNIPPET_EXCEPTION_*` com o motivo (artigo de como usar, a dona do % é a página da loja), não manter o %.

## Parte 2, sessão de artigos: âncora exata "cupom <loja>" (9 artigos, só PT)
Trocar a âncora existente, ou acrescentar o link numa frase natural do corpo (o botão `links` não conta):

| Artigo | Hoje | Fazer |
|---|---|---|
| [[max-titanium-ou-growth]] | "página do cupom da Max Titanium" | `[cupom Max Titanium](/cupons/max-titanium)` |
| [[max-titanium-ou-dux]] | idem | idem |
| [[pre-treino-max-titanium-horus-ou-egide]] | "página do cupom (da Max Titanium)", 3 vezes | trocar uma; as outras ficam |
| [[max-titanium-ou-probiotica]] | "página do cupom da Max Titanium" e "da Probiótica" | `[cupom Max Titanium]` e `[cupom Probiótica](/cupons/probiotica)` |
| [[probiotica-ou-growth]] | "página do cupom Probiótica" | `[cupom Probiótica](/cupons/probiotica)` |
| [[cueca-insider-comfort-ou-performance]] | "página do cupom Insider" | `[cupom Insider](/cupons/insider)` |
| [[insider-mercado-livre-ou-site]] | "página de cupons da Insider" | idem (posição 10 em "cupom insider") |
| [[insider-vale-a-pena]] | **sem link para /cupons/insider** | acrescentar (416 impressões, posição 6) |
| [[tabela-de-medidas-insider]] | **sem link para /cupons/insider** | acrescentar (posição 4,5) |

## Parte 3, sessão de cupons (código em `/cupons/*`)
- O autocompletar das três lojas (05/11) traz "cupom <loja> primeira compra", "cupom <loja> influencer" e "cupom <loja> mercado livre". Proposta: FAQ com essas três dúvidas em `/cupons/max-titanium`, `/cupons/probiotica` e `/cupons/insider`. "Primeira compra" só com o fato lido na loja; "influencer": o código é da parceria da Cecília; "mercado livre": o que a página já sabe do link ML de cada loja.
- Perguntar: o `metaTitle` da Max e da Probiótica sai sem "(nov/2026)". Provável motivo: o título já tem 57 caracteres por causa do código longo, e com o mês iria a 68. Confirmar que é de propósito.

## Medição (~14/11)
Junto com o levantamento de 31/10: posição de "cupom max titanium", "cupom probiótica" e "cupom insider" e a URL que aparece em cada uma. Na Max, aplicar a regra da decisão 1.
