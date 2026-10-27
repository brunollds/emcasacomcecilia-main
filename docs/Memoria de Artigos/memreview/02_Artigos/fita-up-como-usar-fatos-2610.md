# Fatos: Fita Up (leitura de 26/10/2026)

Job 1 da pauta `fita-up-como-usar`. Sem requisição nova a todaup.com: tudo vem do que já estava salvo.
Fontes locais: `lote-2610\toda-products-1.json` (só `local_rate_limited`, sem dado de produto),
`lote-2610\toda-collections.json` (lista de coleções, sem produtos), `lote-2610\raw\home.html` e `home.txt`
(home salva), `lote-2610\raw\pol-*.html` (políticas), `cupom-toda-up-como-usar\fatos-2610.md` e
`toda-up-e-confiavel\fatos-2610.md` (leitura no Chrome de 26/10 pelo Claude principal).

## A. Ficha da Fita Up: NÃO LIDA

Não há `body_html` da Fita Up salvo. O `products.json` deu 429 e nenhum `/products/<handle>` foi lido.
Tudo que a ficha diria está pendente:

| Dado | Situação |
|---|---|
| O que é, material, quantidade/medida, roupas indicadas | [PENDENTE: navegador] https://todaup.com/products/fita-up |
| Passo a passo de aplicação (tomara que caia, decote) | [PENDENTE: navegador] mesma URL (ou página de instruções, se houver) |
| Remoção e cuidados com a pele que a marca publica | [PENDENTE: navegador] mesma URL |
| Descartável ou reutilizável | [PENDENTE: navegador]. Se a ficha não disser, o texto diz "a marca não informa" |
| Variantes (tamanho, cor, unidades) | [PENDENTE: navegador] mesma URL |
| Vídeo ou fotos de uso | [PENDENTE: navegador] mesma URL |

## B. Identificação do produto (fatos com fonte)

| Fato | Fonte | Data | Confiança |
|---|---|---|---|
| Handle `fita-up`, id de produto 9294475231445 | `raw/home.html`: bloco de dados do Shopify (`initData.products`) | 26/10/2026 | Alta (o handle é o da URL /products/fita-up) |
| Preço de venda R$ 119,90; preço normal R$ 179,90 | Coleção pública "Adesivos", lida no Chrome (`cupom-toda-up-como-usar\fatos-2610.md`, seção de coleções) | 26/10/2026 | Alta, com data. Variante/unidade não confirmada |
| Categoria "Adesivos" no menu da loja (junto com protetor de silicone, sutiã de silicone invisível e case protetor) | Menu e coleção pública, Chrome | 26/10/2026 | Alta |
| "A Fita UP cresceu e virou Toda Up... Aquele produto que você ama e confia continua firme e forte (literalmente!) no nosso catálogo" | Home, bloco FAQ "A Fita UP acabou?" (`raw/home.txt`) | 26/10/2026 | Alta, como frase da marca. Não diz uso nem material |
| Home: "Fita Up" aparece como nome de produto em faixa de "Adesivos" e em "Monte seu Kit" (menu) | `raw/home.txt`, linhas 18 a 40 | 26/10/2026 | Alta (só nome) |
| Link "Comece a comprar" para /products/kit-fita-up | `raw/home.html`, linha 2679: é o CTA do carrinho vazio, não um slide de campanha | 26/10/2026 | Baixa: o handle `kit-fita-up` não foi visto como produto. [PENDENTE: navegador] https://todaup.com/products/kit-fita-up |
| Link "Todos os Produtos" para /pages/produtos-fita-up | `raw/home.html`, linha 2614 (também linkado de fitaup.com) | 26/10/2026 | Alta (o link existe). Conteúdo da página não lido: [PENDENTE: navegador] https://todaup.com/pages/produtos-fita-up |
| Blog da Fita UP no domínio antigo: https://fitaup.com/blogs/fita-up | `raw/home.html`, linha 3594 (rodapé) | 26/10/2026 | Alta (o link). Conteúdo não lido: [PENDENTE: navegador] https://fitaup.com/blogs/fita-up. Pode ter post de uso; checar antes de citar |
| Domínio fitaup.com ainda ativo (RDAP, vence em 21/05/2027) | `raw/rdap-fita.json` | 26/10/2026 | Alta |

## C. Vizinhos (só "quando escolher outro", preço pela coleção pública)

| Produto | Handle | Preço de venda / normal | Ficha |
|---|---|---|---|
| Protetor de Silicone Ultrafino | protetor-de-silicone-ultrafino | R$ 69,90 / R$ 99,90 | [PENDENTE: navegador] https://todaup.com/products/protetor-de-silicone-ultrafino (T5 ou T6, conferir) |
| Sutiã de Silicone Invisível | sutia-de-silicone-invisivel | R$ 149,90 / R$ 199,90 | [PENDENTE: navegador] https://todaup.com/products/sutia-de-silicone-invisivel (T5 ou T6, conferir) |
| Case Protetor de Silicone | case-protetor-de-silicone | R$ 49,90 / R$ 79,90 | [PENDENTE: navegador] https://todaup.com/products/case-protetor-de-silicone |

Fonte de preço: coleção "Adesivos" (Chrome, 26/10). Não há ficha lida de nenhum dos três.

## D. Buscas (autocompletar de 26/10, `autocomplete-fita-up-2610.txt`)

Termos com sinal, na ordem do autocompletar:
- "fita up como usar" (Google, 1º da lista) e "fita up como usar tomara que caia" (Google)
- "como usar a fita up" (Bing, aparece em "fita up toda up")
- "fita up tomara que caia" (Google)
- "fita up é reutilizável" (Google)
- "fita up sutiã", "fita up protetor de mamilo", "fita up silicone" (Google): vizinhos
- "fita up tirinha dupla face" (Bing): descreve a forma do produto; não confirmado na ficha
- "fita up é boa", "fita up é bom", "fita up é boa" (Google/Bing): opinião, fora da pauta
- "fita up araujo", "fita up renner", "fita up shopee" (Google/Bing): sinal de vendedores de terceiros. Não citar nem linkar

Alerta: "fita up é golpe" aparece no Google. Não é pergunta a responder no texto; a resposta de confiança está em `toda-up-e-confiavel`.

## E. O que não se sabe e não pode ser afirmado

- Se a fita é descartável ou reutilizável (é a pergunta de "é reutilizável").
- Material, medida, número de unidades por embalagem.
- Como usar no tomara que caia e no decote: passos, tempo de uso, como remover.
- Cuidados com a pele que a marca publica.
- Se o MAUAD vale na Fita Up (exceção de produto pendente no `cupom-toda-up-como-usar`).
- Se o kit (`kit-fita-up`) existe e a que preço.
- Se a Fita Up tem o mesmo preço no site antigo (fitaup.com).

## F. Canibalização e links (já publicados ou no estoque)

- `cupom-toda-up-como-usar` (618): trata MAUAD, progressiva e o que soma. Exceção de produto (Fita Up) pendente lá. Não repetir o cupom aqui.
- `toda-up-e-confiavel` (616): tem "Da Fita UP à Toda Up", FAQ "A Toda Up é a Fita UP?" e o pedido do site antigo. Não repetir empresa, CNPJ nem a história. Uma frase e link.
- `toda-up-reclame-aqui-nota-reputacao` (617): não entra.
- `black-friday-toda-up` (619): campanha e datas. Não entra.
- `/cupons/toda-up`: página de loja (link de apoio).

Briefings de estoque (não lidos aqui): T5 e T6 cobrem os vizinhos (protetor de silicone e sutiã de silicone). Este artigo não aprofunda nenhum dos dois.

## G. Alertas

- Nada na loja diz que a Fita Up é "testada" ou "indicada" por alguém do site. Nenhuma alegação de conforto, segurança ou pele sai daqui.
- O autocompletar não mostra "fita up é descartável". Não tratar a busca de "reutilizável" como fato.
- Pendentes de navegador, em ordem sugerida:
  1. https://todaup.com/products/fita-up (ficha, variantes, preço, fotos, instruções)
  2. https://todaup.com/products/kit-fita-up (existe? preço?)
  3. https://todaup.com/pages/produtos-fita-up (se a página tem instrução ou descrição)
  4. https://fitaup.com/blogs/fita-up (posts de uso do domínio antigo; citar só com cuidado)
  5. Vizinhos: https://todaup.com/products/protetor-de-silicone-ultrafino, https://todaup.com/products/sutia-de-silicone-invisivel, https://todaup.com/products/case-protetor-de-silicone (só a ficha, em uma linha de cada)

## Lido no Chrome pelo Claude principal (26/10/2026)

### https://todaup.com/products/fita-up (página e /products/fita-up.js)
- Título "Fita Up"; tags: Adesivo, Decote profundo, Efeito lifting, Hipoalergênico, Proteção, Sustentação.
- Variantes: Bege, Marrom, Preto × largura P, M, G; todas R$ 119,90 (de R$ 179,90), todas disponíveis. SKUs KF5*/KEX5*/K9F5* (o "5" não está explicado na página: não afirmar metragem).
- Oferta na página: "Leve 2 com 20% OFF + brinde": R$ 95,92 por unidade, R$ 191,84 (de R$ 359,80), brinde Calcinha Fio Dental Cós Alto SkinUp (R$ 49,90, "GRÁTIS").
- Faixa: "BLACK FRIDAY ANTECIPADA: acima de R$ 299 → 12% OFF; acima de R$ 399 → 15%; acima de R$ 499 → 20%; frete grátis para todo o Brasil; até 3x sem juros".
- **Regra publicada na página:** "Cupons não acumulam com o kit: vale sempre o maior desconto, salvo cupons de influenciadoras." (não testado com o MAUAD no kit "Leve 2").
- Frase da página: "Fita adesiva para seios que levanta, modela e mantém tudo no lugar sem sutiã. Segura, invisível e ajustável conforme a roupa ou decote." Nível de sustentação: escala Leve / Médio / Alto (a Fita Up marcada em Alto, pelo visual; não conferido por print).
- Ícones: "Para todas", "Com sustentação", "Remoção fácil e indolor", "Duração de até 12 horas no corpo".
- Aba "Por que a Fita UP é diferente?": "criada especialmente para o corpo feminino brasileiro, com cola hipoalergênica e dermatologicamente testada ... resistente à água e ao suor".
- **Aba "Como usar e remover o produto?" (texto da marca, resumir, não copiar):** pele completamente limpa e seca; colocar o protetor de mamilos; medir no espelho o posicionamento para definir o tamanho; cortar o pedaço; colar começando pela base do seio e subindo até o ponto desejado, sem esticar demais; ajustar/cortar excessos. Remoção: hidratante ou óleo corporal, puxar devagar pelas laterais.
- **Aba "Sustenta seios grandes?" (guia de tamanhos):** P sustenta até o tamanho 44; M até 48; G até 54. (O FAQ do pé diz "até o 52 com segurança": divergência da própria loja; usar o guia P/M/G e citar a data.)
- FAQ do pé: "Vai funcionar comigo?" (praticamente todos os tamanhos e tipos de seio; "100% à prova de suor"; vídeos de uso para vários tipos). "Qual a composição?": 98,50% poliéster e 1,5% elastano; adesivo acrílico à base de água; a marca sugere pré-teste com um pedaço pequeno.
- **Reutilização: a página não diz nada** (busca por reutiliz/descart/lavar sem resultado). Texto: "a Toda Up não diz que a fita pode ser reaplicada; o uso descrito é cortar um pedaço por vez e remover com óleo".
- Avaliações na página: 4,86 de 5, 6.953 (não citar nota de cliente nem depoimentos).
- Rodapé: CNPJ 40.159.443/0001-44, R. Edgard Hoffmann, 222, Biguaçu/SC.
- /products/kit-fita-up.js: não existe (null).

### Domínio antigo
- https://fitaup.com/blogs/fita-up → redireciona para https://todaup.com/blogs/toda-up (o domínio antigo leva ao novo).
- Blog: "Fita UP no Prêmio Reclame AQUI 2025" (26/11/2025, "Suporte Fita Up"): a loja diz que foi **indicada** ao Prêmio Reclame AQUI 2025, categoria Lingerie e Moda Íntima | Grandes Operações, e que tinha o RA1000. Não diz que ganhou. Outros posts: "Sutiã que cola", "Tamanho de sutiã: como medir", "Conheça a Toda Up".
