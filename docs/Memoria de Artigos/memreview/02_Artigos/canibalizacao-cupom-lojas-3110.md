---
titulo_provisorio: "Artigo de como usar × página de cupons: a mesma busca, um resultado só"
parceiro: "várias"
status: "pauta-aprovada"
responsavel: "Claude"
proxima_acao: "redacao: seoTitle/meta dos 7 artigos de como usar e âncora 'cupom <loja>' no corpo dos artigos da lista; remedir ~14/11"
bloqueado_por: null
data_criacao: "2026-10-31"
modo_i18n: "somente-pt"
---

# Artigo de como usar × página de cupons (31/10/2026)

Origem: investigação no GSC (Fable 5.1, 28 e 90 dias) da sessão "Adicionar Cupons", aprovada pelo Bruno em 31/10. Quando o artigo "como usar" e a página `/cupons/<loja>` miram a mesma busca, o Google mostra um só, muitas vezes o artigo. A correção é pelos artigos; nenhum artigo é apagado. A regra de sucesso do Bruno é o código aparecer em mais buscas (impressões e consultas diferentes), não cliques.

## Dados (impressões das buscas de cupom em 28 dias, artigo × página da loja)
| Loja | Artigo | Artigo × loja |
|---|---|---|
| Toda Up | [[cupom-toda-up-como-usar]] | 47 × 2 |
| Skelt | [[cupom-skelt-como-usar]] | 102 × 3 |
| Max Titanium | [[cupom-max-titanium-como-usar]] | 134 (pos. 28) × 60 (pos. 43) |
| Mais Mu | [[cupom-mais-mu-como-usar]] | 14 × 9 |
| Bagaggio | [[cupom-bagaggio-como-usar]] | 26 × 27, os dois na pos. 29 a 36 |
| Probiótica | [[cupom-probiotica-como-usar]] | 119 (pos. 33) × 325 (pos. 11) |
| YesStyle | [[como-encontrar-cupons-yesstyle-validos]] | ~60% das impressões no Brasil vão ao artigo; os dois na pos. 7 |

Sem mexer nos títulos: Cléa (pos. 4), Belive (pos. 3), Black Skull, I Wanna Sleep e Let's Eat It. Nelas entram só os links.

## Parte 1: os 7 artigos de como usar
- `seoTitle` e `metaDescription` começam pelo método ("Como usar…", "Passo a passo…", "Onde colar…"), nunca por "Cupom <loja>". Leitura de 31/10: os seoTitles de 6 artigos já começam por "Como usar"/"Como achar". O da Toda Up ("Cupom Fita Up / Toda Up: 10% OFF, como usar e o que soma") repete o título da loja e precisa mudar. As metas de 6 começam por "Cupom <loja> <código>:" e precisam mudar; a da YesStyle começa por "Onde achar" e fica.
- O artigo não repete a ficha do cupom da loja (percentual, validade e regras em tabela ou lista no topo). Fica com o passo a passo, o teste no carrinho e o que soma, e manda para a página da loja com o link "cupom <loja>".
- Título (H1), slug e URL não mudam.

## Parte 2: âncora "cupom <loja>" no corpo
- Todo artigo PT dessas lojas leva, no corpo e numa frase natural, um link markdown para a página da loja com a âncora "cupom <loja>". Exemplos: `[cupom Skelt](/cupons/skelt)`, `[cupom Nestlé Nutre](/cupons/nestle-nutre)`, `[cupom I Wanna Sleep](/cupons/i-wanna-sleep)`.
- Na YesStyle, a âncora é "cupons YesStyle e código de recompensa": o CECILIA010 nunca é cupom.
- O botão do fim da seção (`links`) não conta como âncora do corpo.
- Ordem: primeiro os que já ranqueiam bem. São os comparativos "X ou Growth/Dux/Dark Lab" (Max, Black Skull e Probiótica, na pos. 6 a 10), os de "é confiável" e Reclame Aqui (Cléa, Toda Up e Let's Eat It; o Reclame Aqui da Let's Eat It tem 103 impressões), o cobertor Igloo e o Pillow Top da IWS, e os do cluster Nutre (comparativos Sustagen/Ensure, creatina, "é confiável"). Depois, o resto da lista.

### Artigos PT sem a âncora no corpo (leitura do main em 31/10)
Max Titanium, Bagaggio e Probiótica já têm a âncora em todos os artigos. Insider e Belive ficaram fora do pedido.

**black-skull** (`/cupons/black-skull`, âncora "cupom Black Skull"): 2
- [[black-skull-mercado-livre-ou-site]]
- [[whey-black-skull-qual-escolher]]

**clea-store** (`/cupons/clea-store`, âncora "cupom Cléa Store"): 2
- [[clea-store-mercado-livre-ou-site]]
- [[look-trabalho-alfaiataria-feminina-clea-store]]

**i-wanna-sleep** (`/cupons/i-wanna-sleep`, âncora "cupom I Wanna Sleep"): 10
- [[aliv-head-gel-iws-mascara-termica-enxaqueca]]
- [[black-friday-i-wanna-sleep]]
- [[i-wanna-sleep-cobertor-igloo-ficha-tecnica]]
- [[melatonina-gummy-iws-para-que-serve-como-tomar]]
- [[melatonina-liquida-iws-ficha-tecnica]]
- [[pillow-top-magnum-iws-colchao-dor-nas-costas]]
- [[qual-cobertor-escolher-guia-linhas-i-wanna-sleep]]
- [[qual-travesseiro-escolher-guia-linhas-i-wanna-sleep]]
- [[sleepspray-kidz-iws-como-funciona-ritual-do-sono]]
- [[travesseiro-i-wanna-sleep-ou-emma]]

**letseatit** (`/cupons/letseatit`, âncora "cupom Let's Eat It"): 7
- [[black-friday-letseatit]]
- [[guardanapo-de-tecido-quantos-tamanho]]
- [[jogo-americano-tecido-tamanho-cor]]
- [[le-creuset-qual-tamanho-escolher]]
- [[le-creuset-vale-a-pena]]
- [[porto-brasil-e-boa]]
- [[taca-base-esfera-e-tacas-coloridas]]

**mais-mu** (`/cupons/mais-mu`, âncora "cupom Mais Mu"): 3
- [[mais-mu-ou-dux]]
- [[mais-mu-ou-growth]]
- [[pre-treino-exquenta-mais-mu-e-bom]]

**nestle-nutre** (`/cupons/nestle-nutre`, âncora "cupom Nestlé Nutre"): 16
- [[black-friday-nestle-nutre]]
- [[fibermais-como-usar-em-receitas-e-bebidas]]
- [[guia-linha-ninho-nestle-leite-vs-composto-lacteo]]
- [[nanlac-supreme-ou-ninho-fases]]
- [[nanlac-supreme-pro-1-a-3-anos]]
- [[nanlac-supreme-pro-ou-aptanutri-profutura]]
- [[nanlac-supreme-pro-ou-comfor]]
- [[nestle-nutre-produtos-para-que-servem]]
- [[nutren-a-z-ou-centrum]]
- [[nutren-creatina-e-boa-comparativo-growth-ftw-cimed]]
- [[nutren-just-protein-para-que-serve]]
- [[nutren-protein-ou-whey]]
- [[nutren-senior-como-tomar-sem-empelotar]]
- [[nutren-senior-ensure-ou-sustagen-senior]]
- [[nutren-senior-kit-combo-ou-assinatura]]
- [[nutren-senior-zero-lactose-ficha-tecnica]]

**skelt** (`/cupons/skelt`, âncora "cupom Skelt"): 3
- [[bronzeado-instantaneo-skelt-ou-autobronzeador]]
- [[iluminador-corporal-skelt-como-usar]]
- [[removedor-autobronzeador-skelt-como-tirar]]

**toda-up** (`/cupons/toda-up`, âncora "cupom Toda Up"): 3
- [[fita-up-como-usar]]
- [[protetor-de-silicone-mamilo-como-usar]]
- [[sutia-de-silicone-invisivel-como-usar]]

**yesstyle** (`/cupons/yesstyle`, âncora "cupons YesStyle e código de recompensa"): 9
- [[black-friday-yesstyle]]
- [[codigo-cecilia010-yesstyle-como-usar]]
- [[k-beauty-o-que-e-onde-comprar]]
- [[skincare-coreano-30-anos-rotina-iniciante-yesstyle]]
- [[yesstyle-app-como-comprar-codigo-de-recompensa]]
- [[yesstyle-entrega-no-brasil-e-portugal]]
- [[yesstyle-ou-olive-young]]
- [[yesstyle-ou-stylevana]]
- [[yesstyle-trustpilot-nota-reclamacoes]]

## Fora daqui
As FAQs de grafia nas páginas de loja (todaup, believe, letseatit, nutren) ficam com a sessão "Adicionar Cupons". A remedição está combinada para ~14/11, com o mesmo recorte do GSC.
