---
pauta: "vestido-de-festa-shein"
data: "2026-10-30"
status: "briefing"
proxima_acao: "decisao-do-bruno"
---

# Fatos: vestido de festa na SHEIN

| Fato | Fonte | Data | Confiança |
|---|---|---|---|
| Google "vestido de festa shein": 10 sugestões (brasil, melhores marcas, longo, nacional, plus size, curto, infantil, preto, verde) | `autocomplete-3010.txt` nesta pasta | 30/10/2026 | Sinal (não volume) |
| Google "vestido de formatura shein": 10 sugestões (azul, verde, vermelho, preto, vinho, convidada, longo, infantil) | `autocomplete-3010.txt` | 30/10/2026 | Sinal |
| Google "vestido de casamento shein convidada": 6 sugestões (midi, longo, dia, festa) | `autocomplete-3010.txt` | 30/10/2026 | Sinal |
| Google "vestido de réveillon shein": 3 sugestões (reveillon, branco, dourado) | `autocomplete-3010.txt` | 30/10/2026 | Sinal fraco |
| Google "vestido de festa shein natal" e "vestido de festa shein tamanho": sem sugestão | `autocomplete-3010.txt` | 30/10/2026 | Ausência |
| Bing "vestido de festa shein": "melhor marca de vestido de festa da shein", "vestidos de festa de casamento shein", "shein vestido de fiesta" (mistura de espanhol) | `autocomplete-3010.txt` | 30/10/2026 | Sinal (outros idiomas) |
| Bing "vestido de réveillon shein": "vestido de baile shein", "vestido de novia de shein" (noiva, fora do escopo) | `autocomplete-3010.txt` | 30/10/2026 | Sinal (intenção diferente) |
| Nenhum vestido de festa nos artigos da SHEIN no ar (60 artigos com `affiliate: shein`); 11.11 sem vestido nas 19 peças | `content/reviews/*.json` (campo `affiliate`) e `shein-11-11-selecao-da-cecilia.json` | 30/10/2026 | Alta |
| Famílias da SHEIN com 10 versões cada: `shein-trust`, `shein-black-friday`, `shein-11-11`, `shein-referral-code`, `shein-reputation`, `shein-vs-shopee-temu` | contagem de `translationKey` em `content/reviews/*.json` | 30/10/2026 | Alta |
| CTA PT dos artigos no ar: `https://br.shein.com/ark/5231?...&search_words=4CW5Y...` (igual ao `offerUrl` de `couponsData.ts`) | `shein-e-confiavel.json`, `black-friday-shein.json` (campo `cta.url`) | 30/10/2026 | Alta |
| CTA neutro fora do PT: `https://onelink.shein.com/55/6463grgxf6ru` | `shein-black-friday-dates-taxes.json`, `shein-trust-guide-ja.json`, `shein-11-11-seleccion-ofertas.json` | 30/10/2026 | Alta |
| Campanha 11.11 (link `onelink.shein.com/58/66i60wu7xjjd`): até 12/11/2026. Fica fora do texto | `shein-11-11-selecao-da-cecilia.json` | 30/10/2026 | Alta |
| Processamento do pedido: 3 a 5 dias; prazo e frete na página do pedido | `Shipping-Info-a-280` (lido no dossiê `01_Parceiros\SHEIN.md`, seção 3) | 23/05/2026 (página) e 11/10/2026 (leitura) | Média |
| Prazo de entrega por região: não lido | página do pedido com CEP de teste | - | [PENDENTE: navegador] |
| Envio Nacional: fora da regra nova de imposto | dossiê, seção 3 (`tax-policy-a-3476`, 23/05/2026) | 11/10/2026 | Média |
| Alíquota zero de II até US$ 50 (produto e frete), 60% com redutor de US$ 30 acima; ICMS 17% a 20% conforme o estado; base = produto + frete | `tax-policy-a-3476` (dossiê, seção 3) | 23/05/2026 | Média (regra mudou em 2026; reconferir) |
| Vigência da alíquota zero: 12/05/2026 pela Receita (página atualizada em 12/06/2026); dossiê e `black-friday-shein` dizem 13/05 | `docs\...\02_Artigos\shein-vale-a-pena.md` (divergência aberta no SH-1); dossiê | 12/06/2026 (Receita) | Divergência a corrigir |
| Lei 15.502/2026 (10/09/2026) altera a tributação do remessa | dossiê, seção 3 | 10/09/2026 | Média |
| Devolução: 20 dias após o recebimento; 1ª devolução de cada pedido grátis, depois R$ 45; itens íntimos e de banho em 7 dias | `Return-Policy-a-281` (dossiê, seção 3) | 16/09/2026 | Alta |
| Código 4CW5Y: código de indicação da SHEIN Brasil; pesquisa-se no app; não dá desconto; não é cupom | `shein-e-confiavel.json` (`coupon: 4CW5Y`), dossiê seção 1 | 2026 | Alta (regra da loja) |
| Cupom: um da plataforma por pedido, mais o da loja do fornecedor local (máx. 2) | `Coupon-Policy-a-1302` (dossiê, seção 3) | 2026 | Média |
| Pagamento: Pix, cartão em até 6x, boleto (3 dias), PayPal, Pagaleve; nome igual ao CPF | `Payment-Method-a-278` e `Shipping-Info-a-280` (dossiê) | 2026 | Média |
| Guia de tamanhos: por peça, em cm e polegadas, com "como medir" e botão "Verificar meu tamanho" (Fit Finder: altura, idade e peso) | `https://br.shein.com/How-to-choose-your-size-a-748.html` (lido no Chrome, registrado em `tamanho-shein-brasil-fatos-3010.md`) | 30/10/2026 | Alta (página oficial) |
| Tabela de medidas de vestido de festa específico: não lida (CAPTCHA em página de produto) | `tamanho-shein-brasil-fatos-3010.md` | 30/10/2026 | [PENDENTE: navegador] |
| Pauta aprovada de tamanho (SH-3), de vitrine: `tamanho-shein-brasil` (aprovada em 30/10; ainda sem arquivo no ar) | `docs\...\02_Artigos\tamanho-shein-brasil.md` | 30/10/2026 | Alta |
| Pauta aprovada de confiança/compra (SH-1): `shein-vale-a-pena` | `docs\...\02_Artigos\shein-vale-a-pena.md` | 30/10/2026 | Alta |
| Preço do cartão, frete e imposto de três vestidos de referência: não lidos | página de produto `https://br.shein.com/` (CAPTCHA esperado; não abrir de novo sem decisão do Bruno) | 30/10/2026 | [PENDENTE: navegador] |
| Ficha dos vestidos (composição, comprimento, forro, fecho, cuidado): não lida | mesma página de produto | 30/10/2026 | [PENDENTE: navegador] |
| Nenhuma página de produto da SHEIN foi aberta nesta rodada; só autocompletar, dossiê e artigos no ar | esta rodada | 30/10/2026 | - |
