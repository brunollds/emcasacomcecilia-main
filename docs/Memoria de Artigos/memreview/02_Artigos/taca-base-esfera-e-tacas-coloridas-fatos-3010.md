---
pauta: "taca-base-esfera-e-tacas-coloridas"
data: "2026-10-30"
status: "briefing"
proxima_acao: "decisao-do-bruno"
---

# Fatos: taça base esfera e taças coloridas (Let's Eat It)

| Fato | Fonte | Data | Confiança |
|---|---|---|---|
| Sinais de busca: "taça base esfera" (verde, ambar, rosa, colorida, champanhe, conjunto); "taça âmbar" (marcas de vidro); "taça colorida" (vidro, cristal, licor, vinho); "taça de vinho colorida combina" vazio | `lote-2910b\rodada-letseatit-perfil\autocomplete-letseatit.txt` (Google e Bing) | 29/10/2026 | Sinal (não volume) |
| "sphere taça é boa" vazio no Google e no Bing | mesma fonte | 29/10/2026 | Alta (ausência) |
| Toda Sphere da loja é conjunto (6, 6+6 ou 12+12); sem unidade | `products.json` das páginas 1 a 12 (`lote-2910b\rodada-letseatit-perfil\catalog-p*.json`), vendor "Let's Eat It" | 29/10/2026 | Alta |
| Preço 29/10 (`products.json`): 450 ml, 4 cores, R$ 264,00 (riscado R$ 440,00); champanhe 250 ml, 4 cores, R$ 249,00 (riscado R$ 415,00); kit 6+6 âmbar R$ 419,00 (riscado R$ 790,57); kit 12+12, 4 cores, R$ 799,00 (riscado R$ 1.507,55) | `products.json` (cache da rodada) | 29/10/2026 | Média (dia anterior) |
| Preço 30/10 (JSON do produto, `/products/<handle>.json`): 450 ml azul, verde e rosa R$ 298,00 (riscado R$ 440,00); champanhe 250 ml âmbar R$ 289,00 (riscado R$ 415,00); kit 6+6 âmbar R$ 557,00 (riscado R$ 790,57) | `letseatit.com.br/products/<handle>.json`, 4 leituras com pausa de 4 s | 30/10/2026 | Alta para as 5 leituras |
| Conjunto 450 ml âmbar: sem leitura em 30/10 (bloqueio de requisições `local_rate_limited` na primeira tentativa). Kit 12+12 âmbar: sem leitura (mesmo bloqueio) | idem | 30/10/2026 | [PENDENTE: navegador] |
| Divergência: artigo no ar `mesa-posta-dia-a-dia-o-que-comprar` diz R$ 264,00 para o conjunto âmbar 450 ml ("disponível em 29/10/2026") | `content/reviews/mesa-posta-dia-a-dia-o-que-comprar.json` | publicado 30/10/2026 | Alta (texto no ar) |
| Disponibilidade de cada Sphere: `available` true no `products.json` | `products.json` (cache) | 29/10/2026 | Média (o JSON do produto não traz `available`) |
| Cadastro sem quantidade e de preço baixo (EntreCasa, Ribeiro e Pavani pré-venda e de unidade): fora da tabela | `products.json` (cache) | 29/10/2026 | Alta |
| Taças coloridas vendidas pela loja, com quantidade no título e disponíveis (cache): Lyor água bico de abacaxi azul 325 ml, jogo 6, R$ 88,30; Studio Blossom champanhe 220 ml (laranja R$ 219,90; coral vermelho R$ 199,90), jogo 6; BTC Decor champanhe esfera âmbar Pure 305 ml, jogo 6, R$ 619,00; Sommelier champanhe 210 ml hastes coloridas, kit 6, R$ 149,00; Coloratta vinho verde 300 ml, kit 6, R$ 508,95; Coloratta água azul 450 ml, kit 6 (copo), R$ 405,95 | `products.json` (cache) | 29/10/2026 | Média (preço de 29/10) |
| Tuut Dots âmbar 520 ml, jogo 6, R$ 398,00, vendido pela loja | `products.json` (cache) | 29/10/2026 | Alta (preço); revenda sem confirmação |
| Tuut vende na loja sem confirmação de revenda autorizada; "revenda oficial" não pode ser escrito | `lote-2910b\rodada-letseatit-perfil\rodada-letseatit-perfil.md` (seção 6) e dossiê `01_Parceiros\Lets-Eat-It.md` | 29/10/2026 | Alta |
| Concorrentes sem link (fora da loja): Copa&Cia Vitrum esfera (champanhe 235 ml R$ 609,00; vinho/água 445 ml R$ 658,00; drink 180 ml R$ 716,00); BTC Decor Luna (370, 400 e 500 ml, 6 peças, R$ 444,90 a R$ 539,00); Tuut Bubble esfera transparente (R$ 299,00 a R$ 399,00) | `products.json` (cache), sem link | 29/10/2026 | Média |
| Reclame Aqui: "Taças" 20,11% dos problemas (3 anos, aba geral) | dossiê `01_Parceiros\Lets-Eat-It.md`, seção 3 | 02/10/2026 | Alta (dado do RA) |
| Reposição gratuita de avaria, com fotos; prazo de frete 3 a 12 dias úteis por região | `letseatit.com.br/pages/politica-de-frete` (lida no dossiê) | 02/10/2026 | Alta |
| Pix com 5% de desconto em muitos produtos; código MAUAD soma com o Pix | dossiê, seção 1; decisão do Bruno | 03/10/2026 e 08/10/2026 | Média (volátil) |
| Cupom MAUAD: sobrenome da Cecília; só como código em frase, nunca em destaque | `docs\Memoria de Artigos\memreview\01_Parceiros\Lets-Eat-It.md`, seção 4 | 2026 | Alta (regra) |
| Links dos produtos com UTM `utm_source=embaixador&utm_medium=emcasacomcecilia&utm_campaign=inbazz&utm_content=organico` | dossiê (seção 1) e artigos no ar | 02/10/2026 | Alta |
| Artigos da loja no ar que se ligam à pauta: `mesa-posta-dia-a-dia-o-que-comprar`, `mesa-posta-natal-o-que-precisa-quanto-custa`, `presente-de-casamento-ideias-por-preco`, `guardanapo-de-tecido-quantos-tamanho`, `jogo-americano-tecido-tamanho-cor`, `faqueiro-laguiole-la-maison-qual-escolher` | `content/reviews/*.json` (slugs com `affiliate: letseatit`, lidos em 30/10) | 30/10/2026 | Alta |
| Slug no ar de mesa posta: `mesa-posta-dia-a-dia-o-que-comprar` (o vault chama `mesa-posta-dia-a-dia-barata`) | `content/reviews/` e `03_Memoria/Fila-de-Pautas.md` | 30/10/2026 | Alta (usar o slug do site nos links) |
| Ficha da Sphere 450 ml: texto de marketing ("color blocking"); material, capacidade de uso e lava-louças não lidos | `letseatit.com.br/products/taca-base-esfera-azul-sphere-450ml.json` (body_html) | 30/10/2026 | Baixa (só o início do texto) |
| Nenhuma leitura de página HTML da loja nesta rodada (só JSON público); sem login, carrinho nem dado pessoal | esta rodada | 30/10/2026 | - |
