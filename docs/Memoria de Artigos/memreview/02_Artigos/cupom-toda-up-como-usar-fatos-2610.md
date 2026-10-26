# Fatos Toda Up (26/10/2026)

Base: dossiê `docs/Memoria de Artigos/memreview/01_Parceiros/Toda Up.md`, `src/lib/couponsData.ts` (slug `toda-up`), `content/home-events.json`, `collections.json` lido em 26/10 (200), e a leitura da home/rodapé feita antes (dossiê). Nenhum carrinho novo: o teste de 26/10 é o do dossiê.

## Leitura da loja (o que aconteceu hoje)

- Plataforma: Shopify (dossiê e rodapé).
- `https://todaup.com/products.json?limit=250`: **429 "local_rate_limited"** na primeira tentativa. Parei a leitura de produtos, como manda a regra. Não houve nova tentativa em `products.json`.
- Erro meu, a registrar: no mesmo comando, depois do 429, pedi `https://todaup.com/collections.json` (uma requisição a mais, que devia ter sido evitada). Retornou 200. Não houve outra requisição à loja depois disso.
- Preços e estoque de produto: **nenhum preço novo lido por API.** Os únicos preços de 26/10 são os do teste do dossiê.
- `collections.json` (200): 30 coleções na primeira página (não confirmei se há mais páginas). Nomes e contagens relevantes:
  - `black-de-aniversario-oferta` ("Black de Aniversário Oferta"), 12 itens, atualizada 26/10/2026.
  - `black-de-aniversario-oferta-acessorios` (6 itens) e `black-de-aniversario-oferta-cotton-up` (5 itens), ambas atualizadas 26/10.
  - `black-de-aniversario-vip` ("Black de Aniversário VIP"), 12 itens, atualizada 17/10.
  - `black-toda-up-2026-botao-tt` ("Black Toda Up 2026 - Botão TT"), 0 itens. Nome sugere outro canal (botão de TikTok?). Não sei o que é: perguntar no navegador antes de citar.
  - `oferta-exclusiva-black-friday` ("Black Friday VIP"), 0 itens.
  - `acessorios-maes` ("Acessórios - Oferta Progressiva"), 6 itens, atualizada 29/09.
  - `calcinhas` (5 itens), `adesivos` (4), `acessorios` (7), `alca-fina-skinup` (3).
  - Coleção de destino do link de afiliado, `squad-toda-up`, não apareceu nas 30 primeiras.
- Nome da campanha: o pedido fala em "Black Friday antecipada". Nas coleções, o nome que aparece em 26/10 é "Black de Aniversário Oferta". **Não está confirmado qual nome o site mostra no topo.** Pendente de navegador.

## Teste de carrinho de 26/10 (dossiê, sem refazer)

| Item | Preço de tabela | Preço de venda | Fonte |
|---|---|---|---|
| Sutiã Comfort Up | R$ 199,90 | R$ 170,91 | dossiê, 26/10 |
| Sutiã Comfort Line | — | R$ 189,90 (preço no carrinho do teste) | dossiê, 26/10 |

- Comfort Up sozinho, com MAUAD: R$ 170,91 → R$ 153,82 (desconto R$ 17,09; 10% sobre o preço promocional).
- Comfort Up + Comfort Line: subtotal R$ 360,81; progressiva de 12% (desconto observado R$ 43,28); 10% do MAUAD sobre o que sobrou (R$ 31,75); total observado **R$ 285,78**.
- **Divergência de arredondamento:** a conta simples dá 12% de R$ 360,81 = R$ 43,30 (sobra R$ 317,51; 10% = R$ 31,75; total R$ 285,76). O observado no teste foi R$ 43,28 e R$ 285,78. Diferença de R$ 0,02. O texto deve usar o número observado da tela e a reconferência no Chrome antes de publicar.

## Regras da campanha (dossiê, confiança alta/média)

- Progressiva "Black Friday antecipada": 12% acima de R$ 299, 15% acima de R$ 399, 20% acima de R$ 499. Desconto automático "Flash Sale · 12% OFF acima de R$ 299" (linha do teste).
- Ordem: a progressiva entra primeiro; o MAUAD sai do que sobra (testado).
- Frete grátis no site durante a campanha: dossiê marca como **confiança média** ("faixa do topo", a página não cita). O tema tem selo "frete grátis acima de R$ 199", que não é regra publicada. **Não afirmar sem o navegador.**
- Datas da campanha (início e fim): **não publicadas no dossiê nem lidas.** Pendente de navegador.

## Políticas (dossiê, rever até 26/11/2026)

- Frete pelo CEP, por Sedex, Loggi ou Jadlog; despacho em até 3 dias úteis depois da confirmação do pagamento (`/policies/shipping-policy`).
- Troca de modelo, tamanho ou cor e arrependimento em até 30 dias corridos depois do recebimento, pelo portal `todaup.troque.app.br`, com CPF e número do pedido (`/policies/refund-policy`).
- Formas de pagamento: o rodapé mostra American Express, Elo, Hipercard, Mastercard e Visa. **Pix, boleto e app não testados.**
- CNPJ 40.159.443/0001-44, Biguaçu/SC.

## Não publicado (não afirmar)

- Limite de um cupom por pedido: nem no dossiê nem no `couponsData.ts`. Pergunta para o Bruno.
- Exceções (kits, Fita Up, brindes, produtos fora da promoção): nada publicado. Pendente de navegador.
- Cupom de primeira compra por e-mail (cadastro no rodapé): existe no dossiê, **não citar** (regra do Bruno). Não testado se soma com o MAUAD.
- Mercado Livre: sem link da marca. Não citar.
- Código "top up" (sugestões do Google): é outra marca. Ver autocompletar.

## Catálogo (dossiê, sem preço novo)

- Moda íntima feminina: sutiãs Comfort (Up, Line, Slim), tops e calcinhas SkinUp e Cotton Up (segunda pele), sutiã de silicone, fita adesiva Fita Up, protetores e acessórios. Coleções acima.
- Preços de Line, Slim, SkinUp, Cotton Up, Fita Up e kits: **pendente de navegador** (ou de `products.json`, quando liberado).

## Pendentes de navegador (Chrome, sem finalizar, sem dados)

1. Topo da home: nome da campanha, datas, texto de frete grátis, faixas exatas.
2. Página `/collections/black-de-aniversario-oferta` e `/collections/squad-toda-up`: produtos e preços de 26/10.
3. `products.json` (catálogo com `price` e `compare_at_price`): liberar pelo Chrome se a API continuar bloqueada.
4. Checkout (sem identificação): o MAUAD entra sozinho pelo link de afiliado? Onde é o campo de cupom, o nome do campo e se aceita um cupom só. Exceções de produto.
5. Pix e boleto (só se a etapa aparecer sem dados pessoais): não afirmar nada antes disso.
6. `Black Toda Up 2026 - Botão TT`: o que é.

## Autocompletar (26/10/2026, Google pt-BR)

Arquivo: `lote-2610/cupom-toda-up-como-usar/autocomplete-2610.txt`.
- "toda up" quase não tem sugestão própria. Sugestões de "cupom todaup" e "cupom toda up" são de **"top up"** (outra marca). O texto não deve usar "top up" nem a palavra de busca.
- "toda up primeira compra" e "cupom toda up primeira compra" aparecem, mas a regra é não citar.
- "toda up black friday", "toda up black friday 2026", "toda up promoção", "toda up frete grátis", "cupom black friday toda up": **vazio** (sem sinal de demanda).

## Leitura no Chrome pelo Claude principal (26/10/2026), depois do 429 do subagente
- Faixa do topo e carrossel da home: "FRETE GRÁTIS em todo o site!" e "BLACK ANTECIPADA COM ATÉ 20% OFF · FRETE GRÁTIS · 3X SEM JUROS". **Nenhuma data de início ou fim publicada.** O nome que o site mostra ao visitante é "Black Antecipada" (a coleção "Black de Aniversário Oferta" é interna, não aparece no menu).
- Menu: Todos os Produtos (/pages/produtos-toda-up), Sutiãs, Calcinhas, Adesivos, Conjuntos.
- O /products.json tem 226 produtos, a maioria cópias por canal ("- Todalovers", "- Influ", "- Oferta Exclusiva") com o mesmo preço ou outro; **use só os preços das coleções públicas do menu** (abaixo), que são o que o visitante vê.
- Preço de venda (preço "de" entre parênteses), coleções públicas, 26/10/2026:
  - **Sutiãs:** Top Alça Fina Segunda Pele SkinUp 179,90 (199,90); Comfort Slim 189,90 (199,90); Comfort Up 170,91 (199,90); Clássico Segunda Pele SkinUp 219,90; Comfort Line 189,90 (199,90); Top Segunda Pele SkinUp 152,91 (199,90); Top Triangular Cotton Up 149,90 / 299,80 no kit de 2 (189,90); Top Faixa Cotton Up 149,90 / 299,80 (189,90).
  - **Calcinhas:** Fio Dental SkinUp 49,90 (59,90); Fio Dental Cós Alto SkinUp 49,90 (59,90); Biquíni SkinUp 44,91 (59,90); Cós Alto SkinUp 44,91 (59,90); Biquíni Cotton Up 39,90 (59,90).
  - **Adesivos:** Protetor de Silicone Ultrafino 69,90 (99,90); Sutiã de Silicone Invisível 149,90 (199,90); Fita Up 119,90 (179,90); Case Protetor de Silicone 49,90 (79,90).
  - **Conjuntos:** os 5 kits SkinUp/Comfort (179,91 a 209,90) **esgotados**; Kit Top Faixa ou Triangular + Calcinha Biquíni Cotton Up 170,82 / 409,90 (189,80 / 569,40) disponíveis.
- Divergência da progressiva (R$ 43,28 observado × R$ 43,30 calculado): publicar os números observados no teste, com a data; não recalcular.
- Não lido (fica fora do texto): limite de um cupom por pedido, Pix e boleto.
