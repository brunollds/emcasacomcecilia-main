# Rodada de voz nas traduções

Decisão do Bruno (02/11/2026): depois da rodada em português (`../voz-todos/`), as 32 famílias de 10 idiomas passam pelo mesmo sistema, antes das pautas "<Marca> é boa?". O Muse revisa, o Claude confere e a sessão de artigos aplica, um PR por lote. As famílias também ganham o quadro "Leve se / Passe se".

- **Referência:** o PT de cada família, já na voz nova. As traduções vão até ele: o que o PT tirou sai, o que o PT ganhou (veredito, cartão, primeira frase que decide) entra, escrito no idioma.
- **Lotes:** 5, de 6 ou 7 famílias, do id mais antigo ao mais novo (`lista-lote-01.md` a `lista-lote-05.md`). Cada família aparece com o arquivo de cada idioma.
- **Pedido ao Muse:** `pedido-muse.md`, com as travas (Reward Code, 4CW5Y da SHEIN Brasil, sem link da SHEIN Brasil fora do PT, concorrentes sem link, Beleza sem efeito no corpo, WordPress sem "Se fosse para o meu site").

## Quadro "Leve se / Passe se" nas famílias
- **Q** na lista: guias de escolha, comparativos e guias de compra. O quadro entra nas 10 versões no mesmo PR: o `test:review-i18n` exige, quando o PT tem, o mesmo número de frases em toda versão e nenhuma frase igual à do PT.
- **Q?**: cupom, Black Friday, código, reputação e editorial. Só se a frase decide uma compra.
- Sem preço, moeda, estoque ou promoção com prazo, em idioma nenhum.

## Cartões que já se sabe que divergem (02/11/2026, main `c65e4d7d`)
- Só no PT: `dominio-hostinger-comprar-transferir-ou-fora`, `vps-ou-hospedagem-compartilhada-qual-escolher`, `shein-ou-shopee-temu`, `yesstyle-ou-stylevana`.
- `hostinger-reach-ou-mailchimp-brevo`: en, es e fr sem cartão. `hostinger-ou-hostgator`: en, es e fr com o cartão um capítulo antes do PT.
- `codigo-cecilia010-yesstyle-como-usar`: 1 cartão no PT, 5 em en/es/fr/it/de, nenhum em ja/ko/zh. `como-encontrar-cupons-yesstyle-validos`: cartão nas traduções e não no PT.

## Gates de cada lote
`node scripts/content/build-index.mjs`, `npm run validate:content`, `npm run test:review-i18n` e `npm run test:article-d2`. Um PR por lote, com o Gate 1 verde.
