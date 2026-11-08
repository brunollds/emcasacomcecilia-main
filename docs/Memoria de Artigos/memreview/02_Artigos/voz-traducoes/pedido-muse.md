> **Substituído em 02/11/2026:** as traduções são refeitas a partir do PT (ver `README.md`). Este pedido valeu só para o lote 01, que virou o diagnóstico em `lote-01-diagnostico/`.

# Rodada de voz nas traduções (Muse, a partir de 02/11/2026)

Você é revisor só de leitura. Não edite nada. Workspace: `C:\Users\Bruno\Downloads\Emcasacomcecilia\muse-rev\artigos-voz`, um worktree da `origin/main` no SHA `c65e4d7d` ou mais novo (o worktree é atualizado para a main antes de cada lote). Use só esta árvore.

São as 32 famílias de 10 idiomas (Hostinger 14, YesStyle 11, SHEIN 7), em 5 lotes de 6 ou 7 famílias: `lista-trad-lote-01.md` a `lista-trad-lote-05.md` (na raiz do worktree). Cada família é um grupo de JSONs com a mesma `translationKey`: a versão `pt` e as 9 traduções (en, es, fr, it, de, ja, ko, zh-hans, zh-hant). **Cada execução faz um lote**, o que o Bruno indicar. Se não couber o lote inteiro, siga a ordem e diga onde parou.

Como nos lotes em português: antes de começar, faça o backup do lote (os 10 JSONs de cada família e um `SHA-BASE.txt` com o SHA da main) em `muse-rev/backup-trad-lote-NN`, rode a sua passada e uma segunda passada cega, e entregue o confronto das duas.

## O que mudou e por quê
A rodada de voz já passou pelos 275 artigos em português, e o PT de cada família é agora a **referência**. As 9 traduções não passaram por ela: carregam frases que o PT perdeu (bastidor, "segundo a loja", ressalva com defesa) e não têm o que o PT ganhou (frase de veredito, cartão de destaque, primeira frase que decide). Esta rodada leva as traduções ao PT e propõe o quadro "Leve se / Passe se" para a família inteira.

## A régua (leia antes, inteira)
- `docs/Memoria de Artigos/memreview/00_Sistema/JOBS/Anexos/Anexo-Voz-da-Cecilia.md`: as 18 regras da voz. Valem em todo idioma pelo princípio (frase direta, conclusão primeiro, sem muleta de fonte), não pela letra do português.
- `00_Sistema/JOBS/Job-2-Redacao.md`, seção 5: primeira frase que decide, veredito pessoal com a trava por tipo, cartão de destaque e o quadro "Leve se / Passe se" (formato e regra de família).
- `00_Sistema/JOBS/Job-4-Conformacao-JSON.md`, seção 3: o que cada idioma usa (o `type`, o título do FAQ, os termos).
- `00_Sistema/REGRAS-GLOBAIS.md`, seção 7, e o anexo do tipo: Tecnologia (Hostinger), Beleza (YesStyle), Moda (SHEIN).

## O que NÃO revisar
- Fato, preço, link, cupom, foto e tabela. Os números de cada tradução seguem os do PT; se um número diverge do PT, aponte como T, sem corrigir o PT.
- Título, slug, `seoTitle` e tabela que funcionam. Os slugs das traduções não mudam, nem quando trazem "coupon" ou "cupon".
- O PT, salvo para propor o quadro Q (que precisa entrar nas 10 versões).

## O que revisar, família por família
Leia o PT inteiro primeiro (`contentSections` e a resposta rápida). Depois, cada tradução, capítulo por capítulo, contra ele.
1. **Distância do PT (T):** a tradução mantém algo que o PT tirou (bastidor, "nesta rodada", "como lemos", "segundo a loja", ressalva com defesa, data a mais) ou não tem o que o PT tem (frase de veredito, primeira frase que decide). O conserto traz a ideia do PT, escrita no idioma, sem tradução palavra por palavra.
2. **Voz (V):** a frase soa traduzida (calque do português, ordem de palavras de português, registro errado para o idioma) ou fere uma regra do anexo pelo princípio. Diga a regra.
3. **Primeira frase (P):** a primeira frase do capítulo entrega a conclusão de um critério, como no PT?
4. **Veredito (D):** a frase de veredito do PT existe na tradução, na mesma forma: Tecnologia e Moda em primeira pessoa de escolha ("Se fosse para o meu site/a minha casa, eu escolheria X, porque Y" no idioma), Beleza impessoal ("Pelos números da tabela, para o perfil X a escolha é Y, porque Z"). Se o PT não tem veredito, a tradução não ganha um.
5. **Ressalva (R):** como no PT.
6. **Cartão de destaque (K):** o cartão (`emphasis`) fica no **mesmo capítulo** do PT, com a mesma frase no idioma. Tradução sem cartão onde o PT tem: proponha. Tradução com cartão onde o PT não tem, ou com mais de um: proponha levar o texto ao parágrafo. Já sabido: `dominio-hostinger-comprar-transferir-ou-fora`, `vps-ou-hospedagem-compartilhada-qual-escolher`, `shein-ou-shopee-temu` e `yesstyle-ou-stylevana` têm cartão só no PT; `hostinger-reach-ou-mailchimp-brevo` não tem em en, es e fr; em `hostinger-ou-hostgator`, en, es e fr têm o cartão um capítulo antes do PT; `codigo-cecilia010-yesstyle-como-usar` tem 1 cartão no PT, 5 em en/es/fr/it/de e nenhum em ja/ko/zh; `como-encontrar-cupons-yesstyle-validos` tem cartão nas traduções e não no PT.
7. **Quadro Leve se / Passe se (Q):** nas famílias marcadas com Q na lista (guias de escolha, comparativos e guias de compra), proponha o `decision` em **todas as 10 versões**: primeiro o PT, de 1 a 3 frases por lado, tiradas do "para quem / quando não" do PT; depois as 9, com o mesmo número de frases e nenhuma igual à do PT. Nas famílias marcadas com Q? (cupom, Black Friday, código), proponha só se a frase decide uma compra. Nas demais, nada de quadro.

## Travas (quebrar qualquer uma invalida o conserto)
- **Nunca primeira pessoa de experiência**, em idioma nenhum, e **nunca apague uso real** que o PT declara (o teste do código, o "O Bruno testou" do Reach).
- **WordPress:** o site não usa WordPress; `wordpress-na-hostinger` não leva "Se fosse para o meu site, eu levaria…" (sai do PT pelo #476). Em nenhuma família a frase de veredito afirma um uso que não houve.
- **Beleza (YesStyle):** sem efeito no corpo e sem "eu levaria/usaria".
- **CECILIA010 é Reward Code**, nunca cupom, em idioma nenhum (nada de "coupon", "cupón", "Gutschein", "クーポン", "쿠폰", "优惠券"… para ele), e nunca "com outros cupons". Os cupons da própria YesStyle são cupons.
- **4CW5Y** é código de indicação da SHEIN, sem país, nunca cupom de checkout, e dá desconto, sim: pelo link do botão, ou pesquisado no app ou no site, abre uma seleção da SHEIN com promoções e descontos (quanto e em quais peças, a SHEIN decide; sem percentual nem valor; 07/11/2026, #716 a #720). Nenhuma tradução leva os links de oferta do PT.
- **Concorrentes** (Shopee, Temu, Stylevana, Olive Young, StyleKorean, HostGator, Mailchimp, Brevo): sem link, cupom ou foto.
- **Nada de fato novo.** O conserto usa só o que o PT e a própria tradução já dizem.
- **Quadro e cartão** sem preço, sem moeda, sem estoque e sem promoção com prazo.
- **Sem enrolação:** o conserto passa do original em no máximo uma oração curta, salvo a frase de veredito que falta.
- **Mesmas regras da catraca do PT, no idioma:** sem preço na resposta rápida, no máximo 2 datas no corpo, nenhuma data em título de capítulo, legenda ou FAQ.

## Formato da resposta
Por família, `## NN. <slug do PT>` na primeira linha e, depois:
- **Nota por idioma (1 a 5)** numa linha só (`en 4 · es 3 · …`) e a prioridade da família.
- **Consertos**, um por linha, até 6 por idioma: `- CÓDIGO | locale | capítulo (heading do arquivo daquele idioma) | trecho atual (literal, até 2 frases) | como fica (texto pronto no idioma) | regra`. Códigos: T, V (com o número da regra), P, D, R e K.
- **Quadro Q**, num bloco à parte, uma linha por idioma, as 10: `- Q | locale | takeIf: frase; frase | skipIf: frase; frase`.
- **Não mexer:** o que está bom.

O trecho atual tem de ser cópia literal do JSON daquele idioma, com as aspas do arquivo (“ ” « » 「」): cada conserto é conferido no arquivo antes de virar edição, e o que não bater é descartado.

No fim do lote: os 3 padrões que mais se repetem, em quais famílias e idiomas.
