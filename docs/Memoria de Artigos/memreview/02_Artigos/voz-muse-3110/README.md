---
titulo_provisorio: "Voz dos 62 artigos de maior impressão (revisão do Muse, conferida)"
status: "pauta-aprovada"
responsavel: "sessão de artigos"
proxima_acao: "redacao: aplicar os consertos aprovados + o conserto mecânico da catraca, por loja"
data_criacao: "2026-10-31"
modo_i18n: "somente-pt"
---

# Voz dos 62 artigos de maior impressão (Muse, 31/10/2026)

O Muse revisou, só lendo e sobre a main b62629bedb, os 40 artigos PT com mais impressões no GSC (camada 1, 80% das impressões) e o artigo de mais impressões de cada loja fora deles (camada 2, 22 artigos). As respostas estão nesta pasta: `resposta-camada-1.md` (219 consertos) e `resposta-camada-2.md` (128). Cada conserto vem como `código | capítulo | trecho atual | como fica`, com os códigos V (voz), R (ressalva), N (número repetido), C (capítulo), B (bloco que só o site tem), L (rótulo) e F (foto).

## Conferência do Claude (31/10/2026)
- 347 consertos lidos. 290 trechos "atual" batem literalmente com o JSON. 46 batem com pequenas diferenças: o Muse tirou a data ou a palavra "teste" do trecho, então procure pelo capítulo. 11 batem pouco: localize pelo capítulo e, se o trecho não existir, pule.
  - sofa-na-caixa-crise-reclamacoes-procon-sp | N | O que fazer se você comprou da Sofá na Caixa e está com problema
  - sofa-na-caixa-crise-reclamacoes-procon-sp | V | Os números no Reclame Aqui: raio-X de atendimento nos últimos 6 meses
  - clube-dolce-gusto-como-funciona | V | Onde e como trocar os pontos por prêmios
  - clube-dolce-gusto-como-funciona | V | Como acumular pontos no Clube
  - clube-dolce-gusto-como-funciona | C | Vale a pena participar do Clube?
  - clube-dolce-gusto-como-funciona | N | FAQ: dúvidas comuns sobre o Clube Dolce Gusto
  - clube-dolce-gusto-como-funciona | L | FAQ: dúvidas comuns sobre o Clube Dolce Gusto
  - dr-peanut-melhor-sabor | C | Como comparamos, sem degustação
  - dr-peanut-melhor-sabor | N | Dr. Peanut é zero açúcar?
  - dr-peanut-melhor-sabor | N | Perguntas frequentes
  - dr-peanut-melhor-sabor | F | Whey Dr. Peanut: qual sabor escolher
- Nenhum conserto põe alegação de saúde, "testamos" sem teste ou R$ na resposta rápida.

## Regras para aplicar (valem por cima do texto do Muse)
1. **Links e códigos ficam.** Nenhum conserto tira link nem código de cupom que estava no trecho. Casos:
   - a âncora "cupom <loja>" do #401 em magazine-voce-e-confiavel, nestle-nutre-e-confiavel e pillow-top-magnum-iws-colchao-dor-nas-costas (este é o ⚠️ #34: rejeitado);
   - os links das cuecas em cueca-insider-comfort-ou-performance (⚠️ #28);
   - os códigos em poltrona-damie-e-boa, cupom-bagaggio-como-usar e black-friday-hostinger.
2. **"Regra prática, sem teste nosso:" só para conhecimento geral, com a premissa, e no máximo uma vez por artigo** (REGRAS-GLOBAIS seção 7). O Muse usou o rótulo em 18 consertos que são orientação tirada dos dados do próprio artigo. Nesses, tire o prefixo e fique com a orientação. Se o número é conta nossa, use "Conta nossa:". Se vem da loja (ex.: o fenólico da Le Creuset até 200 °C), use "A loja informa:" ou nada.
  - tabela-de-medidas-insider (Como medir uma camiseta sua e comparar)
  - cupom-bagaggio-como-usar (Quando a 2ª peça rende mais que o 10%)
  - cupom-belive-como-usar (Três exemplos de carrinho)
  - black-skull-ou-growth (A creatina da Black Skull ganha mesmo sem a promoção?)
  - clea-store-reclame-aqui-nota-reputacao (O que mais aparece nas reclamações)
  - clube-dolce-gusto-como-funciona (FAQ: dúvidas comuns sobre o Clube Dolce Gusto)
  - dr-peanut-melhor-sabor (Qual sabor escolher pelo seu perfil)
  - qual-travesseiro-escolher-guia-linhas-i-wanna-sleep (Para quem dorme de lado: regulagem de altura)
  - insider-store-e-confiavel (O que eu observaria antes de comprar)
  - lejour-como-funciona (Qual plano escolher)
  - le-creuset-vale-a-pena (Vale a pena?)
  - barra-de-proteina-mais-mu-qual-escolher (Qual escolher)
  - max-titanium-ou-dux (Sabores, ingredientes e alérgenos)
  - nutren-senior-zero-lactose-ficha-tecnica (Qual lata escolher)
  - probiotica-ou-growth (Whey: a proteína de cada pote)
  - shein-11-11-selecao-da-cecilia (Antes de comprar)
  - cupom-skelt-como-usar (Frete grátis e o cupom)
  - cupom-toda-up-como-usar (Kits e o que não testamos)
3. **FAQ sem data, mesmo no Reclame Aqui.** A catraca barra data em FAQ. Em shein-e-confiavel ("Dá para confiar na SHEIN?") e clea-store-e-confiavel, a resposta fica sem "30/09/2026" e sem "14/10/2026": o período está no quadro.
4. **⚠️ #30 (nutren-just-protein-para-que-serve): rejeitado em parte.** A linha de alergênicos (lactose, derivados de leite e soja) fica. A frase pode ficar mais leve, mas o aviso não sai.
5. **⚠️ #31 (clea-store-e-confiavel, FAQ de devolução): aprovado.** Os 7 dias de arrependimento já estão no artigo (capítulo de devolução).
6. **"Levar para a Nota editorial" só se couber.** O `editorialNote` tem até 3 linhas no celular e não leva data; o que não couber sai.
7. **tabela-medidas-dolce-gusto-ml-por-nivel:** só os cortes propostos. Título, slug, tabela e FAQ ficam: o artigo tem citação no AI Overview.
8. **Junto com a catraca.** Os 51 destes artigos que estão em `scripts/review-prose-baseline.json` recebem no mesmo PR o conserto mecânico (resposta rápida sem R$, até 2 datas no corpo, sem data em título, legenda ou FAQ, sem "Nota de transparência") e baixam a entrada.
9. **F (foto):** o Muse não fez varredura de foto na camada 1. Por ora aplique só os F que ele apontou; a varredura de foto fica para outra rodada.

## Achado à parte
cueca-insider-comfort-ou-performance usa links diretos da insiderstore.com.br nas cuecas. Os links de criador são Performance `creators.insiderstore.com.br/nD3bAuj` e Comfort `creators.insiderstore.com.br/ptFyZqS`, os mesmos do card de estilo. Trocar no mesmo PR. A Slip segue com o link direto até o Bruno mandar o de criador.

## Ordem
Por loja, das que somam mais impressões: Nestlé Nutre, Dolce Gusto, SHEIN, Insider, Magalu e YesStyle; depois as outras. Um PR por loja, com o Gate 1 verde.

## Artigos (62)
- tabela-medidas-dolce-gusto-ml-por-nivel
- nutren-senior-ensure-ou-sustagen-senior
- black-friday-shein
- shein-ou-shopee-temu
- nutren-protein-ou-whey
- nutren-senior-como-tomar-sem-empelotar
- dolce-gusto-genio-s-basic-vs-plus-vs-touch
- black-friday-magalu
- magazine-voce-e-confiavel
- yesstyle-entrega-no-brasil-e-portugal
- codigo-de-indicacao-shein
- mochaccino-canela-dolce-gusto
- nutren-senior-ou-nutridrink
- i-wanna-sleep-cobertor-igloo-ficha-tecnica
- dolce-gusto-vs-nespresso-qual-escolher
- airfryer-uma-breve-historia
- poltrona-damie-e-boa
- insider-vale-a-pena
- dolce-gusto-vs-nespresso-vs-3-coracoes
- tabela-de-medidas-insider
- nestle-nutre-e-confiavel
- dolce-gusto-capsulas-compativeis-guia
- nutren-creatina-e-boa-comparativo-growth-ftw-cimed
- cafe-au-lait-dolce-gusto
- max-titanium-ou-growth
- black-friday-dolce-gusto
- guia-linha-ninho-nestle-leite-vs-composto-lacteo
- cueca-insider-comfort-ou-performance
- como-encontrar-cupons-yesstyle-validos
- nutren-just-protein-para-que-serve
- clea-store-e-confiavel
- cupom-ceci-nescafe-dolce-gusto-como-usar
- black-skull-ou-max-titanium
- pillow-top-magnum-iws-colchao-dor-nas-costas
- shein-e-confiavel
- caramelo-salgado-dolce-gusto
- nanlac-supreme-ou-ninho-fases
- nanlac-supreme-pro-ou-comfor
- lets-eat-it-reclame-aqui-nota-reputacao
- nestle-nutre-produtos-para-que-servem
- cupom-bagaggio-como-usar
- cupom-belive-como-usar
- black-skull-ou-growth
- clea-store-reclame-aqui-nota-reputacao
- sofa-na-caixa-crise-reclamacoes-procon-sp
- clube-dolce-gusto-como-funciona
- dr-peanut-melhor-sabor
- black-friday-hostinger
- qual-travesseiro-escolher-guia-linhas-i-wanna-sleep
- insider-store-e-confiavel
- lejour-como-funciona
- le-creuset-vale-a-pena
- cupom-magalu-em-casa-com-cecilia
- barra-de-proteina-mais-mu-qual-escolher
- max-titanium-ou-dux
- nutren-senior-zero-lactose-ficha-tecnica
- probiotica-ou-growth
- samsung-lava-seca-13kg-primeiro-uso
- shein-11-11-selecao-da-cecilia
- cupom-skelt-como-usar
- cupom-toda-up-como-usar
- yesstyle-ou-stylevana
