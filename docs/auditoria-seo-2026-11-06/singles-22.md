# Auditoria SEO — lote singles-22

Fonte: release `45ab7e43ea3ccd235f2c744a537aef4eb2ab383d`, parecer `analysis/singles-22.json` e HTTP coletado em 06/11/2026 (São Paulo). Sugestões apenas; sem checkout novo. HTTP 200 não prova indexação.

## mais-mu-reclame-aqui-nota-reputacao

Arquivo: `content/reviews/mais-mu-reclame-aqui-nota-reputacao.json` | Idioma: pt-BR | SHA-256: `15749e76065e3c356b6c7ab84adcde78a22a599c82957b1c6c180599d83113eb`
Intenção: Analisar reputação da Mais Mu no Reclame Aqui.

- **Alta — `contentSections[6].bullets[1]` e `[9]` FAQ:** condição de produto fechado atribuída à [loja](https://www.lojamaismu.com.br/faq/) deve ser distinguida da orientação geral de arrependimento do [Procon-SP](https://www.procon.sp.gov.br/wp-content/uploads/2024/08/Guia_de_Comercio_Eletronico.pdf).
- **Pendente — descrição, resposta rápida, tabela, gráfico e FAQ:** 6,4 e Regular são da leitura de 20/10, mas “hoje” os apresenta como atuais. Perfil RA retornou 403 e capturas do analista divergiram. Datar histórico e obter snapshot coerente antes de substituir dados.

## cupom-mais-mu-como-usar

Arquivo: `content/reviews/cupom-mais-mu-como-usar.json` | Idioma: pt-BR | SHA-256: `9657b42c02d7c6c9d4f97741e8047dd01ee0b9ce87847c31a64cba82f822a3f8`
Intenção: Ensinar a aplicar o cupom Mais Mu no checkout.

- **Sem sugestão específica confirmada.** Preservar MMEMCASACOMCECILIA 10%, teste de 20/10 e ressalva de que frete próximo do mínimo não foi testado. [Loja oficial](https://www.lojamaismu.com.br/) informa Pix 3% e faixas regionais.

## black-friday-mais-mu

Arquivo: `content/reviews/black-friday-mais-mu.json` | Idioma: pt-BR | SHA-256: `513c56b85987004acdb0108c12b2efbfb57832126d89edf9b2aed85f6822c0e3`
Intenção: Orientar compra na Blue Friday e comparação com preços de outubro.

- **Pendente — `contentSections[4].postParagraphs[1]`:** “o desconto do cupom entra na conta” afirma uma base que o próprio artigo reconhece não ter testado. [Loja](https://www.lojamaismu.com.br/) informa limites, sem base do subtotal; condicionar ao carrinho. Preservar campanha sem presumir fim e teste histórico.

## mais-mu-ou-growth

Arquivo: `content/reviews/mais-mu-ou-growth.json` | Idioma: pt-BR | SHA-256: `9d46ffdb8dee4b7faef0fd00c9144e0b873f93e37bbea59d4e1196926efd626a`
Intenção: Comparar whey e creatina Mais Mu e Growth.

- **Alta — `contentSections[1].bullets[1]` e `[4]` tabela:** preço dividido por peso total é chamado preço por creatina. [Limonada 210 g](https://www.lojamaismu.com.br/produtos/creatina-limonada-210g/) declara 3 g de creatina em 3,5 g de produto; 210 g contêm 180 g de creatina. R$ 64,90 históricos equivalem a R$ 30,90/100 g de produto ou R$ 36,06/100 g de creatina. Distinguir unidades; confirmar teor Melancia separadamente.
- **Média — resposta rápida e decisão:** restringir vencedores aos produtos e preços de 21/10; não inferir vencedor atual de uma cotação isolada. Preservar código e ausência de teste próprio.

## mais-mu-ou-dux

Arquivo: `content/reviews/mais-mu-ou-dux.json` | Idioma: pt-BR | SHA-256: `6f5ee237fac44b4ca3bb9a584a53bc339e89ab93c5c9a87e6904307156a73fef`
Intenção: Comparar whey e creatina Mais Mu e Dux.

- **Alta — `contentSections[1].bullets[2]` e `[5]` tabela:** diferenciar custo do produto e da creatina. A [Limonada](https://www.lojamaismu.com.br/produtos/creatina-limonada-210g/) declara 3 g em 3,5 g; R$ 30,90 históricos são por 100 g de produto, aproximadamente R$ 36,06 por 100 g de creatina. Confirmar teor Melancia.
- **Média — resposta rápida, `[8]`, `[9]` e FAQ:** concentrados têm 20 g de proteína por dose em ambos; Dux concentra em 30 g de pó contra 36 g Mais Mu, não mais proteína por dose. Isolados diferem 24 g e 22 g conforme tabela.
- **Média — FAQ e `decision.skipIf`:** “Dux tem cupom? Não” só está sustentado como ausência de cupom nosso; delimitar à parceria. Preservar MMEMCASACOMCECILIA 10%.

## Limites

Sem revalidação simultânea de preços, elegibilidade e frete. RA retornou 403; não promover números divergentes. Teor Melancia não confirmado. Não transformar dados de rótulo em prescrição.
