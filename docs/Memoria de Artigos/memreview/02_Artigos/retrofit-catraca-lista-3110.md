---
titulo_provisorio: "Retrofit mecânico dos artigos PT (catraca do #407)"
status: "pauta-aprovada"
responsavel: "sessão de artigos"
proxima_acao: "redacao: lotes por loja, fora dos 62 do Muse"
data_criacao: "2026-10-31"
modo_i18n: "somente-pt"
---

# Retrofit mecânico dos artigos PT (catraca do #407)

## Como fazer (Bruno, GO em 31/10/2026)
- **O que corrigir, pelas REGRAS-GLOBAIS seções 6 e 7 e pelo Job 3 (C1 a C3):**
  - resposta rápida sem R$;
  - a data da leitura uma vez, na legenda da tabela de preço, e no máximo 2 datas no corpo;
  - nenhuma data em título, legenda de foto ou FAQ;
  - a seção "Nota de transparência" sai do corpo.
- **Nota editorial:** segue curta (até 3 linhas no celular), sem data, com a divulgação e, se couber, "ninguém da equipe usou". O método vai para o vault.
- **Artigo de campanha, prazo de entrega ou Reclame Aqui** leva "bodyDatesReason" no JSON ("campanha", "prazo-entrega" ou "reclame-aqui"), e o limite sobe para 8.
- **Por artigo:** corrigir, rodar npm run validate:content e baixar ou tirar a entrada do artigo em scripts/review-prose-baseline.json, como o erro pedir. A lista só encolhe.
- **Escopo:** é conserto mecânico, sem reescrever a voz. Ao tirar uma data ou uma ressalva, a frase precisa continuar de pé; se a ressalva muda a compra, ela fica uma vez, no capítulo da decisão.
- **Fora deste retrofit:**
  - os 51 artigos da revisão do Muse (lista no fim desta nota), que recebem o conserto mecânico junto com o de voz, depois da conferência dos achados;
  - os 3 artigos do #405, que entram no lote 0.
- **Lote 0, primeiro:**
  - skinup-ou-cotton-up-toda-up: tirar a Nota de transparência;
  - kit-toda-up-quando-compensa: tirar a Nota de transparência;
  - mochila-de-viagem-bagaggio-qual-escolher: 6 datas no corpo.
- **Ordem:** um PR por loja ou por par de lojas, com o Gate 1 verde. Nas famílias de 10 idiomas, as traduções seguem o PT no mesmo PR, se o test:review-i18n pedir.


Lista gerada sobre a main a0f5e838 em 31/10/2026. Cada linha: slug e o que fura hoje (scripts/review-prose-baseline.json).

## bagaggio (12)
- bagaggio-e-boa-malas-mochilas {"bodyDates":6,"datesOutsideBody":3}
- bagaggio-e-confiavel {"bodyDates":5,"datesOutsideBody":3}
- bagaggio-garantia-vitalicia {"bodyDates":5,"datesOutsideBody":4}
- bagaggio-reclame-aqui-nota-reputacao {"bodyDates":21,"datesOutsideBody":4}
- black-friday-bagaggio {"bodyDates":17,"datesOutsideBody":9}
- conjunto-de-malas-bagaggio-compensa {"quickAnswerPrice":true,"bodyDates":8,"datesOutsideBody":6}
- mala-de-bordo-bagaggio-qual-compensa {"quickAnswerPrice":true,"bodyDates":16,"datesOutsideBody":6}
- mala-policarbonato-ou-abs-bagaggio {"bodyDates":6,"datesOutsideBody":5}
- mochila-escolar-bagaggio {"quickAnswerPrice":true,"datesOutsideBody":1}
- mochila-notebook-bagaggio-qual-escolher {"quickAnswerPrice":true,"bodyDates":4,"datesOutsideBody":1}
- presente-natal-bagaggio {"quickAnswerPrice":true,"bodyDates":8,"datesOutsideBody":1}
- tamanho-mala-bagaggio-p-m-g {"bodyDates":6,"datesOutsideBody":6}

## belive (10)
- belive-e-confiavel {"bodyDates":9,"datesOutsideBody":4}
- belive-reclame-aqui-nota-reputacao {"transparencySection":true,"bodyDates":18,"datesOutsideBody":11}
- black-friday-belive {"transparencySection":true,"bodyDates":11,"datesOutsideBody":6}
- bolinho-kids-belive-lancheira {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":3,"datesOutsideBody":1}
- bolinho-sem-acucar-belive-ou-suavipan {"transparencySection":true,"bodyDates":5,"datesOutsideBody":5}
- brownie-sem-acucar-belive {"transparencySection":true,"bodyDates":4,"datesOutsideBody":5}
- cookies-sem-acucar-belive {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":3,"datesOutsideBody":1}
- doces-sem-acucar-para-diabeticos {"transparencySection":true,"datesOutsideBody":3}
- pao-de-mel-sem-acucar-belive {"transparencySection":true,"bodyDates":8,"datesOutsideBody":6}
- snack-proteico-ou-snack-de-arroz-belive {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":3}

## black-skull (13)
- black-friday-black-skull {"bodyDates":17,"datesOutsideBody":9}
- black-skull-e-confiavel {"bodyDates":11,"datesOutsideBody":3}
- black-skull-mercado-livre-ou-site {"transparencySection":true,"bodyDates":9,"datesOutsideBody":4}
- black-skull-ou-dark-lab {"transparencySection":true,"bodyDates":7,"datesOutsideBody":2}
- black-skull-ou-dux {"transparencySection":true,"bodyDates":14,"datesOutsideBody":4}
- black-skull-ou-integralmedica {"transparencySection":true,"bodyDates":9,"datesOutsideBody":3}
- black-skull-reclame-aqui-nota-reputacao {"bodyDates":15,"datesOutsideBody":13}
- creatina-black-skull-qual-escolher {"transparencySection":true,"bodyDates":11,"datesOutsideBody":4}
- creatina-com-sabor-qual-escolher {"transparencySection":true,"bodyDates":8,"datesOutsideBody":3}
- cupom-black-skull-como-usar {"bodyDates":8,"datesOutsideBody":5}
- hipercalorico-black-skull-qual-escolher {"transparencySection":true,"bodyDates":16,"datesOutsideBody":5}
- pre-treino-black-skull-bope-ou-bone-crusher {"transparencySection":true,"bodyDates":9,"datesOutsideBody":4}
- whey-black-skull-qual-escolher {"transparencySection":true,"bodyDates":19,"datesOutsideBody":4}

## clea-store (9)
- alfaiataria-verao-clea-store {"transparencySection":true,"bodyDates":10,"datesOutsideBody":3}
- black-friday-clea-store {"bodyDates":17,"datesOutsideBody":6}
- body-clea-store-second-skin-qual-escolher {"transparencySection":true,"bodyDates":7}
- camiseta-clea-store-e-boa {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":10,"datesOutsideBody":4}
- clea-store-aniversario-14-anos-t-shirt-brinde {"bodyDates":8,"datesOutsideBody":3}
- clea-store-mercado-livre-ou-site {"transparencySection":true,"bodyDates":9,"datesOutsideBody":7}
- clea-store-tabela-de-medidas-como-escolher-tamanho {"transparencySection":true,"bodyDates":6,"datesOutsideBody":1}
- cupom-clea-store-como-usar {"bodyDates":6,"datesOutsideBody":4}
- look-trabalho-alfaiataria-feminina-clea-store {"transparencySection":true,"bodyDates":5}

## damie (8)
- black-friday-damie {"bodyDates":23,"datesOutsideBody":10}
- damie-reclame-aqui-o-que-os-dados-mostram {"transparencySection":true,"datesOutsideBody":3}
- poltrona-de-amamentacao-como-escolher {"bodyDates":3,"datesOutsideBody":3}
- poltrona-de-amamentacao-vs-poltrona-reclinavel {"datesOutsideBody":3}
- presente-de-natal-para-casa-moveis {"transparencySection":true,"bodyDates":37,"datesOutsideBody":3}
- sofa-na-caixa-inflow-ou-damie {"bodyDates":17,"datesOutsideBody":6}
- sofa-na-caixa-ou-sofa-montado-qual-dura-mais {"bodyDates":5}
- valley-inflow-ou-damie {"transparencySection":true,"bodyDates":20,"datesOutsideBody":5}

## dolce-gusto (10)
- assinatura-dolce-gusto-como-funciona {"datesOutsideBody":2}
- assinatura-dolce-gusto-vale-a-pena {"bodyDates":5,"datesOutsideBody":1}
- cafeteira-escritorio-qual-escolher-custo-mes {"transparencySection":true,"bodyDates":14,"datesOutsideBody":1}
- dolce-gusto-descalcificacao-passo-a-passo {"datesOutsideBody":2}
- dolce-gusto-maquinas-qual-escolher {"bodyDates":5}
- espresso-dolce-gusto {"transparencySection":true,"bodyDates":6,"datesOutsideBody":1}
- melhores-capsulas-dolce-gusto-2026 {"bodyDates":11,"datesOutsideBody":2}
- promocao-dolce-gusto-caixas-mini-me-gratis {"bodyDates":6}
- quanto-custa-capsula-dolce-gusto {"quickAnswerPrice":true,"bodyDates":11,"datesOutsideBody":7}
- starbucks-dolce-gusto-capsulas-guia {"bodyDates":8,"datesOutsideBody":2}

## dr-peanut (8)
- black-friday-dr-peanut {"bodyDates":9,"datesOutsideBody":8}
- cupom-dr-peanut-como-usar {"bodyDates":8,"datesOutsideBody":5}
- dr-peanut-e-confiavel {"bodyDates":10,"datesOutsideBody":4}
- dr-peanut-e-saudavel {"transparencySection":true,"bodyDates":9,"datesOutsideBody":2}
- dr-peanut-ou-la-ganexa {"transparencySection":true,"bodyDates":11,"datesOutsideBody":1}
- dr-peanut-qual-tamanho-compensa {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":4,"datesOutsideBody":5}
- dr-peanut-reclame-aqui-nota-reputacao {"bodyDates":19,"datesOutsideBody":17}
- snacks-dr-peanut-qual-escolher {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":4,"datesOutsideBody":1}

## hostinger (13)
- cupom-hostinger-indicacao {"transparencySection":true,"bodyDates":4,"datesOutsideBody":2}
- dominio-hostinger-comprar-transferir-ou-fora {"bodyDates":9,"datesOutsideBody":3}
- hostinger-e-confiavel {"transparencySection":true,"bodyDates":5,"datesOutsideBody":1}
- hostinger-horizons-vale-a-pena {"bodyDates":8,"datesOutsideBody":3}
- hostinger-ou-hostgator {"bodyDates":10,"datesOutsideBody":5}
- hostinger-reach-ou-mailchimp-brevo {"bodyDates":7,"datesOutsideBody":6}
- hostinger-reclame-aqui-nota-reputacao {"transparencySection":true,"bodyDates":15,"datesOutsideBody":10}
- melhor-vps-para-openclaw {"bodyDates":6,"datesOutsideBody":1}
- openclaw-hostinger-gerenciado-ou-vps {"bodyDates":3,"datesOutsideBody":4}
- openclaw-ou-hermes-agent {"datesOutsideBody":1}
- paperclip-ai-hostinger {"datesOutsideBody":2}
- vps-ou-hospedagem-compartilhada-qual-escolher {"bodyDates":5,"datesOutsideBody":2}
- wordpress-na-hostinger {"bodyDates":6,"datesOutsideBody":3}

## i-wanna-sleep (5)
- black-friday-i-wanna-sleep {"bodyDates":17,"datesOutsideBody":9}
- i-wanna-sleep-ou-ortobom {"bodyDates":12}
- i-wanna-sleep-reclame-aqui-nota-reputacao {"bodyDates":5,"datesOutsideBody":4}
- i-wanna-sleep-travesseiro-snow-ficha-tecnica {"datesOutsideBody":2}
- sleepspray-kidz-iws-como-funciona-ritual-do-sono {"bodyDates":3}

## insider (12)
- black-friday-insider {"bodyDates":37,"datesOutsideBody":12}
- camiseta-feminina-insider-qual-escolher {"quickAnswerPrice":true,"transparencySection":true,"datesOutsideBody":1}
- camiseta-insider-qual-escolher {"quickAnswerPrice":true,"transparencySection":true,"datesOutsideBody":1}
- cupom-emcasacomcecilia-insider-store-como-usar {"bodyDates":4}
- insider-mercado-livre-ou-site {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":7,"datesOutsideBody":6}
- insider-store-reclame-aqui-nota-reputacao {"bodyDates":10,"datesOutsideBody":6}
- kit-insider-quando-compensa {"quickAnswerPrice":true,"transparencySection":true}
- outlet-insider-feminino-vale-a-pena {"transparencySection":true}
- outlet-insider-masculino-vale-a-pena {"transparencySection":true}
- presente-de-natal-insider-kits-gift-card {"transparencySection":true,"bodyDates":20}
- promocao-insider-selecao-com-cupom {"bodyDates":26,"datesOutsideBody":1}
- undershirt-insider-qual-escolher-funciona {"transparencySection":true,"bodyDates":4}

## lejour (5)
- black-friday-lejour {"bodyDates":23,"datesOutsideBody":8}
- lejour-e-confiavel {"bodyDates":7,"datesOutsideBody":2}
- lejour-ou-icasei {"quickAnswerPrice":true,"bodyDates":14,"datesOutsideBody":1}
- lejour-reclame-aqui-nota-reputacao {"bodyDates":13,"datesOutsideBody":8}
- lista-de-casamento-lejour-como-criar {"bodyDates":5,"datesOutsideBody":4}

## letseatit (14)
- black-friday-letseatit {"bodyDates":17,"datesOutsideBody":9}
- cupom-mauad-lets-eat-it-como-usar {"datesOutsideBody":1}
- faqueiro-laguiole-la-maison-qual-escolher {"transparencySection":true,"bodyDates":9,"datesOutsideBody":1}
- guardanapo-de-tecido-quantos-tamanho {"transparencySection":true,"bodyDates":4}
- jogo-americano-tecido-tamanho-cor {"transparencySection":true,"bodyDates":6,"datesOutsideBody":1}
- le-creuset-original-como-saber {"transparencySection":true,"bodyDates":6,"datesOutsideBody":5}
- le-creuset-qual-tamanho-escolher {"transparencySection":true,"bodyDates":11,"datesOutsideBody":2}
- lets-eat-it-e-confiavel {"bodyDates":6,"datesOutsideBody":5}
- mesa-posta-dia-a-dia-o-que-comprar {"transparencySection":true,"bodyDates":5,"datesOutsideBody":2}
- mesa-posta-natal-o-que-precisa-quanto-custa {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":6,"datesOutsideBody":1}
- porto-brasil-e-boa {"bodyDates":4,"datesOutsideBody":3}
- presente-de-casamento-ideias-por-preco {"transparencySection":true,"bodyDates":5}
- presente-natal-quem-gosta-de-cozinhar {"quickAnswerPrice":true,"transparencySection":true,"datesOutsideBody":1}
- taca-base-esfera-e-tacas-coloridas {"quickAnswerPrice":true,"transparencySection":true}

## mais-mu (8)
- black-friday-mais-mu {"bodyDates":7,"datesOutsideBody":4}
- cupom-mais-mu-como-usar {"datesOutsideBody":3}
- mais-mu-e-confiavel {"bodyDates":12,"datesOutsideBody":4}
- mais-mu-ou-dux {"bodyDates":8,"datesOutsideBody":3}
- mais-mu-ou-growth {"bodyDates":4,"datesOutsideBody":2}
- mais-mu-reclame-aqui-nota-reputacao {"bodyDates":13,"datesOutsideBody":10}
- pre-treino-exquenta-mais-mu-e-bom {"transparencySection":true,"bodyDates":4}
- whey-mais-mu-qual-escolher {"transparencySection":true,"bodyDates":13,"datesOutsideBody":1}

## max-titanium (8)
- black-friday-max-titanium {"bodyDates":16,"datesOutsideBody":5}
- creatina-max-titanium-qual-pote {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":7,"datesOutsideBody":4}
- cupom-max-titanium-como-usar {"bodyDates":7,"datesOutsideBody":4}
- max-titanium-e-confiavel {"bodyDates":11,"datesOutsideBody":5}
- max-titanium-ou-integralmedica {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":10,"datesOutsideBody":1}
- max-titanium-ou-probiotica {"bodyDates":19,"datesOutsideBody":3}
- max-titanium-reclame-aqui-nota-reputacao {"bodyDates":15,"datesOutsideBody":16}
- pre-treino-max-titanium-horus-ou-egide {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":10,"datesOutsideBody":2}

## nestle-nutre (10)
- black-friday-nestle-nutre {"bodyDates":16,"datesOutsideBody":8}
- cupom-ceci-nestle-nutre-como-usar {"datesOutsideBody":3}
- fibermais-como-usar-em-receitas-e-bebidas {"bodyDates":3}
- isosource-1-5-ou-trophic-1-5 {"transparencySection":true,"bodyDates":7,"datesOutsideBody":2}
- isosource-1-5-para-que-serve {"transparencySection":true,"bodyDates":3,"datesOutsideBody":1}
- nanlac-supreme-pro-1-a-3-anos {"transparencySection":true,"bodyDates":10}
- nanlac-supreme-pro-ou-aptanutri-profutura {"transparencySection":true,"bodyDates":8,"datesOutsideBody":1}
- nutren-a-z-multi-para-que-serve {"transparencySection":true,"bodyDates":4}
- nutren-a-z-ou-centrum {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":5,"datesOutsideBody":1}
- nutren-senior-kit-combo-ou-assinatura {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":3,"datesOutsideBody":4}

## probiotica (8)
- black-friday-probiotica {"bodyDates":10,"datesOutsideBody":6}
- creatina-probiotica-qual-compensa {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":10,"datesOutsideBody":2}
- cupom-probiotica-como-usar {"bodyDates":7,"datesOutsideBody":6}
- monodose-probiotica-sache-ou-pote {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":7,"datesOutsideBody":4}
- probiotica-e-confiavel {"bodyDates":12,"datesOutsideBody":5}
- probiotica-ou-dux {"transparencySection":true,"bodyDates":9,"datesOutsideBody":3}
- probiotica-ou-integralmedica {"transparencySection":true,"bodyDates":12,"datesOutsideBody":3}
- probiotica-reclame-aqui-nota-reputacao {"bodyDates":15,"datesOutsideBody":13}

## sem-loja (3)
- glutamina-qual-escolher-black-skull-max-probiotica {"quickAnswerPrice":true,"transparencySection":true}
- melhor-whey-qual-escolher-por-objetivo {"bodyDates":35,"datesOutsideBody":6}
- presente-natal-quem-treina {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":8,"datesOutsideBody":1}

## shein (2)
- shein-reclame-aqui-nota-reputacao {"bodyDates":15,"datesOutsideBody":11}
- vestido-de-festa-shein {"bodyDates":4}

## skelt (13)
- autobronzeador-skelt-qual-escolher {"bodyDates":14,"datesOutsideBody":3}
- black-friday-skelt {"bodyDates":12,"datesOutsideBody":10}
- body-splash-skelt-milos-breeze {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":6,"datesOutsideBody":3}
- body-splash-skelt-qual-escolher {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":21,"datesOutsideBody":5}
- body-splash-skelt-solar-muse {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":8,"datesOutsideBody":2}
- brinde-skelt-30-outubro-cupom {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":10,"datesOutsideBody":3}
- bronzeado-instantaneo-skelt-ou-autobronzeador {"quickAnswerPrice":true,"bodyDates":5,"datesOutsideBody":1}
- hidratante-corporal-skelt-qual-fragrancia {"quickAnswerPrice":true,"transparencySection":true,"bodyDates":5,"datesOutsideBody":2}
- iluminador-corporal-skelt-como-usar {"quickAnswerPrice":true,"bodyDates":3,"datesOutsideBody":1}
- removedor-autobronzeador-skelt-como-tirar {"quickAnswerPrice":true,"bodyDates":4}
- skelt-e-confiavel {"bodyDates":6,"datesOutsideBody":3}
- skelt-ou-best-bronze {"transparencySection":true,"bodyDates":9,"datesOutsideBody":1}
- skelt-reclame-aqui-nota-reputacao {"bodyDates":14,"datesOutsideBody":10}

## toda-up (7)
- black-friday-toda-up {"bodyDates":19,"datesOutsideBody":9}
- fita-up-como-usar {"bodyDates":7,"datesOutsideBody":2}
- protetor-de-silicone-mamilo-como-usar {"bodyDates":4,"datesOutsideBody":2}
- sutia-de-silicone-invisivel-como-usar {"quickAnswerPrice":true}
- sutia-toda-up-qual-escolher {"transparencySection":true}
- toda-up-e-confiavel {"bodyDates":15,"datesOutsideBody":6}
- toda-up-reclame-aqui-nota-reputacao {"bodyDates":23,"datesOutsideBody":4}

## yesstyle (4)
- black-friday-yesstyle {"bodyDates":23,"datesOutsideBody":3}
- yesstyle-app-como-comprar-codigo-de-recompensa {"transparencySection":true,"bodyDates":6,"datesOutsideBody":4}
- yesstyle-ou-olive-young {"bodyDates":31,"datesOutsideBody":10}
- yesstyle-trustpilot-nota-reclamacoes {"bodyDates":9,"datesOutsideBody":6}

## Fora deste retrofit: os 51 da revisão do Muse (não mexer até o handoff de voz)
- black-friday-shein
- shein-ou-shopee-temu
- nutren-protein-ou-whey
- nutren-senior-como-tomar-sem-empelotar
- black-friday-magalu
- magazine-voce-e-confiavel
- yesstyle-entrega-no-brasil-e-portugal
- codigo-de-indicacao-shein
- mochaccino-canela-dolce-gusto
- nutren-senior-ou-nutridrink
- dolce-gusto-vs-nespresso-qual-escolher
- poltrona-damie-e-boa
- insider-vale-a-pena
- dolce-gusto-vs-nespresso-vs-3-coracoes
- tabela-de-medidas-insider
- dolce-gusto-capsulas-compativeis-guia
- nutren-creatina-e-boa-comparativo-growth-ftw-cimed
- cafe-au-lait-dolce-gusto
- max-titanium-ou-growth
- black-friday-dolce-gusto
- guia-linha-ninho-nestle-leite-vs-composto-lacteo
- cueca-insider-comfort-ou-performance
- como-encontrar-cupons-yesstyle-validos
- clea-store-e-confiavel
- cupom-ceci-nescafe-dolce-gusto-como-usar
- black-skull-ou-max-titanium
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
- dr-peanut-melhor-sabor
- black-friday-hostinger
- insider-store-e-confiavel
- lejour-como-funciona
- le-creuset-vale-a-pena
- cupom-magalu-em-casa-com-cecilia
- barra-de-proteina-mais-mu-qual-escolher
- max-titanium-ou-dux
- nutren-senior-zero-lactose-ficha-tecnica
- probiotica-ou-growth
- shein-11-11-selecao-da-cecilia
- cupom-skelt-como-usar
- cupom-toda-up-como-usar
- yesstyle-ou-stylevana
