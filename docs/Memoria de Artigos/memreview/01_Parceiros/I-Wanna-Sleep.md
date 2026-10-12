---
parceiro: "I Wanna Sleep"
slug_cupom: "i-wanna-sleep"
codigo_cupom: "CECIEMCASA"
status_parceria: "ativo"
revisao_geral_ate: "2026-09-01"
---

# Dossiê Factual: I Wanna Sleep (IWS)

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `CECIEMCASA` dá desconto em produtos elegíveis | condicao_comercial_volatil | `src/lib/couponsData.ts` | 2026-08-11 | 2026-09-01 | Loja online IWS; testar no checkout | Alta |
| Colchões e box só são vendidos nas lojas físicas (BH), com as consultoras do sono; o site mostra os modelos sem venda | fato_oficial | Bruno, 09/10/2026, e páginas do Zen e do box | 2026-10-09 | 2027-01-09 | O guia do cupom ainda fala em colchão no carrinho e no frete: corrigir | Alta |
| O CECIEMCASA soma com os preços da Black Friday e com o Pix e vale com todas as formas de pagamento | condicao_comercial_volatil | Bruno, 09/10/2026 | 2026-10-09 | 2026-11-09 | A página da loja diz "pode variar conforme campanha"; os artigos seguem o Bruno | Alta |
| Pix com 5% de desconto, só à vista; cartão parcelado sem juros (o número de parcelas varia na página); aprovação do cartão em até 24 h e do boleto em até 72 h | condicao_comercial_volatil | Páginas de produto e política de envio | 2026-10-09 | 2026-11-09 | O widget da página fala em 12x com parcela mínima de R$ 80, mas a tabela do Magnum mostra até 9x: não citar o número | Alta |
| Frete grátis acima de R$ 150, exceto colchões, box, baús e cabeceiras; colchão com entrega e montagem próprias só em cidades com loja ou centro de distribuição (BH), com agendamento por telefone, R$ 300 por visita perdida e sem içamento; fora delas, transportadora até o térreo, sem montagem | fato_oficial | suporte.iwannasleep.com.br, "Entrega e frete" (16/07/2025) | 2026-10-09 | 2027-01-09 | Colchão não é vendido pelo site (linha acima) | Alta |
| Simulação no carrinho em 09/10/2026, Pillow Top Magnum casal (e o Zen casal, que a API aceitou, embora o colchão não seja vendido pelo site), CEP do centro: frete grátis nas 12 capitais; BH 3 dias úteis, SP e RJ 6, Curitiba, Brasília e Goiânia 7, Porto Alegre e Salvador 8, Belém e Manaus 10, Fortaleza 11, Recife 12 | condicao_comercial_volatil | `/cart/shipping_rates.json` da loja (Shopify), sem login e sem pedido (OK do Bruno) | 2026-10-09 | 2026-11-09 | Base da data limite para o Natal no guia de Black Friday | Média |
| Catálogo em 09/10: colchões (Zen, I3, Hush, Breeze Plush, Star) pelo preço cheio; Pillow Top Magnum com ~14% sobre o riscado; travesseiros e cobertores com 12% a 17%; kits de 18% a 21% | condicao_comercial_volatil | `/products/<handle>.js` e `products.json` (Shopify) | 2026-10-09 | 2026-11-09 | Preços "Order Bump" e brindes do checkout não são públicos: não citar | Alta |

---

## 2. Fatos Oficiais & Catálogo (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Melatonina líquida IWS: 0,21 mg por gota | fato_oficial | Rótulo / Resolução ANVISA | 2026-08-10 | 2027-01-01 | Limite máximo regulatório brasileiro por porção diária para adultos |
| Melatonina Gummy IWS: 30 unidades, 0,21 mg por goma, 8 kcal, zero açúcar, sem glúten e zero lactose | fato_oficial | Página oficial do produto | 2026-08-26 | 2026-11-26 | Uso publicado: 1 goma ao dia, de 1 a 2 horas antes de dormir |
| Cobertor Igloo: dupla face (frio/quente) | fato_oficial + experiencia | Ficha técnica + uso próprio | 2026-08-10 | 2027-01-01 | Registrado em vídeo e fotos próprias |
| Aliv Head Gel: máscara térmica para enxaqueca | fato_oficial | Ficha técnica pública | 2026-08-10 | 2027-01-01 | Uso com frio ou calor |

---

## 3. Reputação & Dados Públicos

| Dado / Indicador | Tipo | Fonte | Consultado Em | Rever Até | Conclusão |
|---|---|---|---|---|---|
| Reputação Reclame Aqui IWS | dado_externo | Reclame Aqui | 2026-08-01 | 2026-11-01 | Avaliada no artigo `i-wanna-sleep-reclame-aqui-nota-reputacao` |
| Política Sleeptest | dado_externo | Site oficial IWS | 2026-07-30 | 2026-10-30 | Dias de teste para colchões |
| Sleeptest: colchão 100 dias da entrega, uso mínimo de 15, troca por conforto (não por tamanho), uma por CPF, etiqueta e embalagem; R$ 300 de frete e montagem em BH; travesseiro e pillow top 30 dias, uso mínimo de 15, troca por crédito | fato_oficial | Política Sleeptest (29/10/2024) e páginas do Zen, Hush, Magnum e Snow | 2026-10-09 | 2027-01-09 | Confere com o guia do Pillow Top Magnum |
| Arrependimento em 7 dias corridos; frete da primeira devolução grátis, exceto colchão; estorno no cartão em 30 a 60 dias; compra do site não é trocada nas lojas | fato_oficial | Política de reembolso (16/07/2025) | 2026-10-09 | 2027-01-09 | — |
| Sete lojas em Belo Horizonte (BH Shopping, Castelo, Del Rey, Só Marcas Outlet, Lourdes, Silviano Brandão, Ponteio) | fato_oficial | `/pages/nossas-lojas-1` | 2026-10-09 | 2027-01-09 | — |
| Black Friday: nenhuma campanha oficial encontrada de 2023 a 2025 nem anúncio de 2026 até 09/10 | dado_externo | Busca do site, blog (`/blogs/iws.atom`) e home | 2026-10-09 | 2026-11-09 | O blog de 25/11/2024 tem um cupom próprio da loja: fica fora dos artigos |

---

## 4. Alertas Regulatórios de Saúde
> [!CAUTION]
> **Aviso Obrigatório em Artigos de Melatonina/Suplementos:**
> Nunca afirmar que melatonina "cura insônia", "substitui remédio tarja preta" ou "faz dormir a noite toda".
> Citar apenas a dosagem permitida pela ANVISA (0,21 mg/dia) e orientar a consulta a um profissional de saúde.
> A Anvisa não aprovou alegações de benefício para suplementos de melatonina. Não escrever que o suplemento melhora o sono, ajuda em jet lag ou turnos, não vicia ou é seguro para uso indefinido.

---

## 5. Dores Mapeadas
- [[melatonina-quantas-gotas-tomar-horario-certo]] (Dosagem exata, quantas gotas equivalem a 0,21mg, quanto tempo antes de deitar)
- [[aliv-head-gel-como-usar-tempo-freezer]] (Quanto tempo deixar no freezer vs micro-ondas sem estragar o gel)

---

## 6. Artigos Já Publicados no Cluster
- `melatonina-liquida-iws-ficha-tecnica`
- `aliv-head-gel-iws-mascara-termica-enxaqueca`
- `i-wanna-sleep-travesseiro-snow-ficha-tecnica`
- `i-wanna-sleep-cobertor-igloo-ficha-tecnica`
- `i-wanna-sleep-reclame-aqui-nota-reputacao`
- `i-wanna-sleep-e-confiavel`
- `sleeptest-i-wanna-sleep-como-funciona`
- `cupom-ceciemcasa-i-wanna-sleep-como-usar`
- `black-friday-i-wanna-sleep` (publicado em 10/10/2026, PR #50)
