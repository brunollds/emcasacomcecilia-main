# Traduções refeitas a partir do PT

Decisão do Bruno (02/11/2026): as 9 traduções das 32 famílias são **traduzidas de novo** a partir do PT de agora, que já passou pela rodada de voz e pela catraca. O plano anterior (consertar frase por frase) parou no lote 01. O diagnóstico daquele lote (`lote-01-diagnostico/`) mostrou que as traduções vieram de rascunhos antigos do PT: capítulos a menos (CECILIA010 em ja/ko/zh com 5 capítulos contra 19), fatos que o PT não tem (IOSS, tabela de frete datada, auditoria da YesAsia), fatos do PT perdidos (PayPal, reembolso de US$ 1.000), datas que o PT tirou e efeito no corpo no K-beauty. As duas passadas pediram 657 consertos em 7 famílias, metade para repor capítulos.

## Quem faz o quê
1. **Sessão de artigos:** traduz as 9 versões de cada família a partir do PT, um PR por lote (`lista-lote-01.md` a `lista-lote-05.md`), com os gates verdes. Merge sem deploy.
2. **Muse:** revisa as traduções novas contra o PT (fidelidade, voz natural no idioma, travas), com a passada cega e o confronto.
3. **Claude:** confere a revisão do Muse; os consertos vão num PR seguinte. O deploy do lote só depois desse OK.

## O que se mantém em cada tradução
`id`, `slug`, `locale`, `translationKey`, `affiliate`, `coupon`, `cta` (na SHEIN fora do PT, o link principal neutro da página da loja), `publishedAt`, `relatedArticles`, os caminhos das imagens e o `href` de cada foto (o mesmo do PT). `title` e `seoTitle` ficam, salvo se o título prometer algo que o corpo novo não traz; então muda o mínimo, e o PR diz qual. O `type` segue a tabela do Job 4 (seção 3).

## O que sai do PT
- **Corpo:** os mesmos capítulos do PT, na mesma ordem, com o mesmo sentido, menos os do Brasil (seção abaixo); a resposta rápida, o FAQ (título de FAQ do idioma, que o `isFaqHeading` reconhece, e as mesmas perguntas), o `editorialNote`, a `description` e a `metaDescription`.
- **Cartão (`emphasis`):** no mesmo capítulo do PT, um só, ou nenhum se o PT não tem. Card de estilo (`styling`) e quadro `decision` só se o PT tem, com o mesmo número de frases e nenhuma igual à do PT.
- **Tradução, não decalque:** a frase é escrita como um nativo escreveria (ordem, registro, pontuação e aspas do idioma), com a mesma voz: conclusão primeiro, sem "segundo a loja", sem bastidor, sem ressalva defensiva.

## Fora do PT, sem Brasil (decisão do Bruno, 02/11/2026, no lote 01)
- **Sai tudo o que fala do Brasil:** frete e prazo para o Brasil, CEP, Correios; Receita Federal, ICMS, Remessa Conforme, imposto de importação brasileiro; Pix, boleto, R$, "loja nacional", "K-Beauty no Brasil". O capítulo só sobre o Brasil sai inteiro; a frase mista perde só a parte do Brasil. Item de FAQ, de lista ou de "antes de pagar" sobre o Brasil sai também.
- **Idioma do site da loja:** a tradução não manda escolher o português; diz só que dá para trocar o idioma no topo do site, sem citar qual.
- **SHEIN sem país (decisão do Bruno, 02/11/2026, #493):** fora do PT, nada de "SHEIN Brasil": o 4CW5Y é o código de indicação da SHEIN, de pesquisar no app, sem país. SHEIN, YesStyle e Hostinger são lojas internacionais e levam o visitante à loja da região dele; link de um país (inclusive `br.shein.com`) pode ficar. O texto de campanha ou de preço da loja brasileira pode ficar. O link para o guia de entrega da YesStyle fica, porque em cada idioma leva ao guia daquele idioma, mas o texto não diz "no Brasil e em Portugal".
- **Título:** se o `title` ou o `seoTitle` promete o Brasil ("Brazil", imposto/tax), muda nos 9 idiomas, e o PR diz qual. Foi o caso da Black Friday da SHEIN.
- **Outros idiomas:** o alemão usa "Sie" (como 27 dos 31 artigos alemães do site), salvo fala da autora consigo mesma que venha do PT; o nome da Cecília fica em letras latinas ("Cecília") em todos os idiomas, inclusive japonês, coreano e chinês (decisão do Bruno, 02/11/2026); onde a tradução usa セシリア, 세실리아 ou 西西莉亚/西西莉亞, volta para "Cecília". O sobrenome não entra nos alts.

## Famílias com o assunto no Brasil (lotes 02 e 03, 02/11/2026)
Em quatro famílias o PT trata do Brasil, e as traduções já tratam de outra coisa. Traduzir o PT e tirar o Brasil esvaziaria o artigo. Nelas, a tradução segue o PT na estrutura, na voz e no veredito, mas mantém o assunto regional que já tem:
- **9, `shein-e-confiavel`:** confiança na SHEIN sem o Reclame Aqui (quem opera a loja, devolução, pagamento).
- **10, `shein-ou-shopee-temu`:** SHEIN contra Temu; a Shopee, que só existe no PT, sai.
- **11, `yesstyle-entrega-no-brasil-e-portugal`:** o envio para os países do idioma (EUA/Reino Unido, Espanha/México, Japão...).
- **14, `hostinger-reclame-aqui-nota-reputacao`:** a reputação pelo Trustpilot.

Dado regional (país, nota, prazo, moeda) só fica se a versão atual já o traz com a fonte no próprio artigo e segue a regra de datas do PT. Nada de pesquisa nova. Capítulo do PT sem equivalente na região sai. O PR diz, por família, o que ficou regional. Na revisão, o Muse compara com o PT a estrutura, a voz e o veredito, e confere o dado regional contra a fonte citada; não pede de volta o capítulo do Brasil. Nas outras famílias, o Reclame Aqui sai com o resto do Brasil.

## Dados que só existem na tradução
Preço em outra moeda, frete por país e imposto local (IOSS, por exemplo) **ficam só se o próprio artigo diz de onde vêm** (a página internacional da loja, como os preços em US$ da Hostinger) e seguem as mesmas regras de data do PT. Sem fonte no artigo, saem. Nada novo entra nesta rodada.

## Travas
- CECILIA010 é Reward Code em todo idioma, nunca cupom nem "com outros cupons"; os cupons da YesStyle são cupons.
- 4CW5Y é código de indicação da SHEIN, que se pesquisa no aplicativo, nunca cupom; fora do PT, sem "SHEIN Brasil" (o `test:review-i18n` barra nos rótulos).
- Concorrentes sem link, cupom ou foto.
- Beleza (YesStyle) sem efeito no corpo e sem "eu levaria/usaria"; o veredito segue a forma do PT.
- Primeira pessoa só onde o PT tem uso real (o primeiro contato da skincare, os testes de código); nunca inventada ("Ich sage mir", a frase japonesa da skincare saem).
- `wordpress-na-hostinger` sem "Se fosse para o meu site".
- As regras da catraca, no idioma: sem preço na resposta rápida, no máximo 2 datas no corpo, nenhuma data em título de capítulo, legenda ou FAQ.

## Quadro "Leve se / Passe se"
Entra nas famílias marcadas com **Q** nas listas, nas 10 versões: o PT ganha o quadro no mesmo PR (de 1 a 3 frases por lado, do "para quem / quando não" do PT). As 7 famílias do lote 01 ficam sem quadro: as duas passadas concluíram que nenhuma frase decide a compra de um produto.

## Gates de cada PR
`node scripts/content/build-index.mjs`, `npm run validate:content`, `npm run test:review-i18n` e `npm run test:article-d2`, mais o Gate 1. Antes de editar, o baseline do `validate:content` no checkout com dependências; o backup é o `muse-rev/backup-trad-lote-NN`.
