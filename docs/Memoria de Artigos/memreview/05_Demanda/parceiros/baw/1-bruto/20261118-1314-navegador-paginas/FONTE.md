# FONTE: 20261118-1314-navegador-paginas

| Campo | Valor |
|---|---|
| Coleta | `20261118-1314-navegador-paginas` |
| Início e fim | `2026-11-18T13:14:20-03:00` a `2026-11-18T13:16:14-03:00` |
| Sessão responsável | Etapa 2, catálogo da BAW (Claude Opus 5.5), aberta pela coordenação "Pesquisa de pautas" |
| Fonte | Loja oficial da BAW Clothing (plataforma Wake) |
| Endereço ou relatório | `https://www.bawclothing.com.br/blackfriday/`, `/black-friday`, `/nossas-lojas`, `/loja3rios`, `/combos` e a imagem `https://bawclothing.fbitsstatic.net/media/lp_sem_cupom.jpg?v=20261118143107` |
| Método | Navegador embutido do app, uma página por vez (cada leitura levou de 15 a 25 segundos): `get_page_text` na `/blackfriday/` e, nas outras, `document.body.innerText` e a lista de imagens fora das fotos de produto, lidos por script na página carregada. A imagem do banner da `/blackfriday/` foi baixada com `curl -s -A "Mozilla/5.0 (compatible; pesquisa-editorial)"` |
| Propriedade ou loja | `www.bawclothing.com.br` |
| País, idioma, moeda | BR, pt-BR, BRL |
| Período dos dados | Estado das páginas no momento da leitura |
| Filtros | Nenhum |
| Paginação | Só a primeira tela de produtos de cada vitrine: a lista inteira, com preços, está em `20261118-1255-wake-categorias` |
| Cobertura | `completa` para o que se buscava: banner, datas, regulamento e regras da campanha, endereço de loja física |
| Modalidade | `arquivo-original` no banner (`.jpg`); `texto-extraido` nos `.txt` (texto da página gravado pela sessão a partir da saída da ferramenta, com endereço e hora no começo de cada arquivo); o texto da imagem do banner é `resumo-coletor` (lido pela sessão na tela, citado no `.txt`) |
| Export | @nao-se-aplica |
| Cadastro lido | @nao-se-aplica |
| Bloqueio | nenhum |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `banner-blackfriday-lp_sem_cupom.jpg` | 327160 | `cfc81a2457d82587b4a44068fb640ea64fce28fedcb15763f5891b8a4523d575` | repositório |
| `pagina-combos.txt` | 1185 | `b80d1820957eee082d09078e0f62ff8fa16f7b183f8a818e68c98889fff729e2` | repositório |
| `pagina-loja3rios.txt` | 1849 | `95d19b1d19634feb4265a38c4a7efbccac200f992d5f62b2813ed84bbdf8c004` | repositório |
| `pagina-nossas-lojas.txt` | 1146 | `9b889b0229a14ddb41bcf5dc0f0e7e0d93725acd67daf7b1b31c8e4ad7bfb0e2` | repositório |
| `vitrine-black-friday.txt` | 1203 | `308a17e6fd8a1ca68fd6533d7978cb485996704bdbe1c5cc821948089ac5c47a` | repositório |
| `vitrine-blackfriday.txt` | 2819 | `1e29e0b3c17d9bce17f48a5e4fb846222c0a1b89b1326a3a8d934ace1f188f01` | repositório |

## Conferência dos arquivos

A fazer pela coordenação no fechamento de insumos, num checkout limpo da `main`.

## Falhas e lacunas

- Nenhum print de tela foi guardado: o navegador embutido não grava arquivo. O banner da Black Friday entrou como a
  imagem original, baixada do endereço que a página usa.
- O banner da `/loja3rios` (foto de pessoas numa loja, com o texto "Baw Retiro Store") e o da `/combos`
  (`lp_crazy_ultimas_v2.jpg`, de agosto) não foram baixados.

## Observações

- **`/blackfriday/` (P3).** Título "A ÚLTIMA BLACK FRIDAY DA BAW", 679 produtos. Banner novo, com versão de 18/11 no
  endereço (`v=20261118143107`): "BLACK FRIDAY / Até 80%OFF / +30%OFF / NA SEGUNDA PEÇA". Nenhuma data de início ou de
  fim, nenhum regulamento e nenhuma regra da "segunda peça" no texto da página. O nome do arquivo do banner é
  `lp_sem_cupom.jpg`; a página não diz nada sobre cupom, e a sessão não interpreta o nome do arquivo.
- **`/black-friday`** (a da trilha das fichas, 349 produtos): sem banner e sem as palavras "regulamento", "válido" ou
  "cupom".
- **Menu de 18/11:** VESTUÁRIO, ACESSÓRIOS, KIDS, CALÇADOS, NEWS, BLACK FRIDAY, INFLUS. O HTML das listas traz, logo depois de
  "Black Friday" no menu, 13 nomes de influenciadoras e o link "Seja nosso influ"; essas vitrines não foram coletadas.
- **Lojas físicas (P4).** `/nossas-lojas` segue só com o título, como em 16/11. `/loja3rios` (fora do menu, no sitemap)
  é uma vitrine de 70 produtos chamada "Loja 3 Rios", com "Baw Retiro Store" escrito no banner; não traz endereço,
  horário nem rua.
- **Combos:** a `/combos` não traz regra de combo nem de preço por quantidade; é uma vitrine de peças avulsas.
- Os cupons de influenciadoras e o FIRSTBAW não aparecem em nenhuma destas páginas.
