---
status: "briefing"
proxima_acao: "decisao-do-bruno"
pauta: "T8 sutia-toda-up-qual-escolher"
data: "2026-10-30"
---

# Fatos do briefing T8 (sutiã Toda Up)

Cada fato traz a URL ou a fonte e a data da leitura. "Catálogo" = `https://todaup.com/products.json` paginado, lido em 30/10/2026 (arquivo bruto em `scratchpad/tmp-3010-moldes-ic/raw-todaup.com.json`, 227 produtos). Os handles usados são os de coleção pública (`PRINCIPAL`), não as cópias por canal ("- Influ", "- Cliente", "- Todalovers", "- CRM", "- Fecha Mês", "- Aniver", "- Cliente VIP", "- CP", "Oferta Exclusiva"). "Dossiê" = `docs/Memoria de Artigos/memreview/01_Parceiros/Toda Up.md` no worktree `origin/main`.

| Fato | Valor | Fonte e URL | Data da leitura |
|---|---|---|---|
| Comfort Up: preço e estoque | R$ 189,90 (de R$ 199,90); 36 de 40; P (38-40) com 2 de 5; PP (34-36) com 4 de 5 | Catálogo, `https://todaup.com/products/sutia-comfort-up` | 30/10/2026 |
| Comfort Up: tamanhos | PP (34-36), P (38-40), M (40-42), G (42-44), GG (44-46), G1 (46-50), G2 (50-52), G3 (54-56) | Catálogo (opção "Tamanho") | 30/10/2026 |
| Comfort Up: cores | Rose, Preto, Caramelo, Baunilha, Avelã | Catálogo (opção "Cor") | 30/10/2026 |
| Comfort Up: ficha | "Você prioriza o equilíbrio perfeito entre sustentação e bem-estar"; "conforto sem aros que machucam"; versão CP: "Alta Sustentação com Bojo Removível, Corte a Laser, Conforto que se sente, sustentação que se vê" | Catálogo (descrição de `sutia-comfort-up`, `sutia-comfort-up-cp`) | 30/10/2026 |
| Comfort Line: preço e estoque | R$ 189,90 (de R$ 199,90); 25 de 25; sem PP (P 38-40 a G1 46-48) | Catálogo, `https://todaup.com/products/sutia-comfort-line` | 30/10/2026 |
| Comfort Line: cores | Rose, Preto, Avelã, Caramelo, Baunilha | Catálogo | 30/10/2026 |
| Comfort Line: ficha | "O mais versátil da nossa linha, você pode usar como tomara-que-caia ou criar combinações com as alças"; versão CP: "sem alças com sustentação segura, formato anatômico, faixas de silicone antideslizantes, alças para adicionar, mais finas e compridas" | Catálogo (`sutia-comfort-line`, `sutia-comfort-line-cp`) | 30/10/2026 |
| Comfort Slim: preço e estoque | R$ 189,90 (de R$ 199,90); 21 de 25; PP 3 de 5; M 3 de 5 | Catálogo, `https://todaup.com/products/sutia-comfort-slim` | 30/10/2026 |
| Comfort Slim: tamanhos e cores | PP (34-36) a GG (44-46); Preto, Rose, Baunilha, Caramelo, Avelã | Catálogo | 30/10/2026 |
| Comfort Slim: ficha | "leveza e toque suave", "design minimalista e atemporal", "tanto nos dias que precisa esconder o sutiã, quanto quer arrasar nas transparências"; exclusivo: "tecido respirável, hipoalergênico e cortes a laser", "bojo removível" | Catálogo (`sutia-comfort-slim`, `sutia-comfort-slim-exclusivo`) | 30/10/2026 |
| Composição do tecido | não está no JSON dos três modelos | Catálogo (campo `body_html`) | 30/10/2026 |
| Guia de medidas | a loja tem guia com busto em centímetros, PP a G3 (imagem do artigo `cupom-toda-up-como-usar`); tabela numérica não lida | `content/reviews/cupom-toda-up-como-usar.json` (imagem "Guia de medidas do Sutiã Comfort Up") | 26/10/2026 |
| Preço de 26/10 (carrinho de teste) | Comfort Up: "de R$ 199,90 por R$ 170,91" no produto; carrinho com subtotal R$ 170,91, cupom R$ 17,09 e total R$ 153,82 com o MAUAD | Dossiê seção 1 (teste de 26/10); `content/reviews/cupom-toda-up-como-usar.json` | 26/10/2026 |
| Comfort Up + Line no carrinho | R$ 360,81 com a progressiva (12% acima de R$ 299, −R$ 43,28) e mais 10% do MAUAD (−R$ 31,75): R$ 285,78 | Dossiê seção 1 | 26/10/2026 |
| Cupom MAUAD | 10% em todo o site; vale em produto já com desconto (teste de 26/10); o texto diz de qual loja fala (é o mesmo código da Let's Eat It e da Belive) | Dossiê seção 1 | 26/10/2026 |
| Link de parceria | `https://todaup.com/discount/MAUAD?redirect=/collections/squad-toda-up&utm_campaign=fluxoinfluenciadoras&utm_content=mensagem1&utm_medium=influs&utm_source=influs&utm_term=comissao` (`offerUrl`, usar como veio) | `src/lib/couponsData.ts` (slug `toda-up`); dossiê seção 1 | 26/10/2026 |
| Frete | pelo CEP (Sedex, Loggi, Jadlog); despacho em até 3 dias úteis após a confirmação do pagamento | Dossiê seção 1 (`todaup.com/policies/shipping-policy`) | 26/10/2026 |
| Troca | troca de modelo, tamanho ou cor e arrependimento em até 30 dias corridos após o recebimento; pelo portal `todaup.troque.app.br` | Dossiê seção 1 (`todaup.com/policies/refund-policy`) | 26/10/2026 |
| Campanha | "Black Antecipada" (até 20% OFF, frete grátis, 3x sem juros), sem datas publicadas | Dossiê seção 3 | 26/10/2026 |
| Cupom vencido nas cópias | FECHA25 (25% OFF) aparece nos produtos "- Fecha Mês" (abril de 2026); não citar | Catálogo (`sutia-comfort-up-fecha-mes` e outros) | 30/10/2026 |
| SkinUp top | R$ 169,90 (de R$ 179,90); P a G1; não é Comfort | Catálogo, `https://todaup.com/products/top-segunda-pele-skin-up` | 30/10/2026 |
| Silicone invisível | R$ 149,90 (de R$ 159,90); P, M, G; 3 de 3 | Catálogo, `https://todaup.com/products/sutia-de-silicone-invisivel` | 30/10/2026 |
| Autocompletar | G: "toda up sutiã", "toda up sutiã tomara que caia", "sutiã toda up é bom"; B: "fita up sutiã comfort up" | `scratchpad/lote-3010/moldes-insider-clea-todaup/autocomplete-insider-clea-todaup.txt` e moldes, seção 3 | 30/10/2026 |
| Artigos já no ar sobre a marca | `toda-up-e-confiavel`, `cupom-toda-up-como-usar`, `black-friday-toda-up`, `sutia-de-silicone-invisivel-como-usar`, `fita-up-como-usar`, `protetor-de-silicone-mamilo-como-usar`, `toda-up-reclame-aqui-nota-reputacao` | `content/reviews/` | no ar (data de cada um no campo `publicado_em` ou na nota de publicação) |
