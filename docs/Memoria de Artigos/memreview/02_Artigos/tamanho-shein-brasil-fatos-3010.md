---
pauta: "tamanho-shein-brasil"
data: "2026-10-30"
status: "briefing"
proxima_acao: "decisao-do-bruno"
---

# Fatos: Tamanho SHEIN no Brasil

| Fato | Fonte | Data | Confiança |
|---|---|---|---|
| Sinal: "shein tamanhos para o brasil", "shein tamanho xl no brasil", "shein tamanho m", "shein tamanho l" (Google); "tamanho shein brasil" (Bing) | `moldes-moda-casa/autocomplete-moda-casa.txt` | 30/10/2026 | Sinal (não volume) |
| Tabela de medidas da SHEIN Brasil: carrega por JavaScript; botão "TAMANHO E AJUSTE" na página de produto | fontes de terceiros (busca), não lida direto | busca de 30/10/2026 | Média |
| M com busto de 96 a 100 cm, cintura 82 a 86 cm, quadril 98 a 102 cm | guia de terceiro (busca) | 2026 | Baixa; contradita |
| M com busto de 90 a 94 cm, cintura 72 a 76 cm, quadril 98 a 102 cm | outro guia de terceiro (busca) | 2026 | Baixa; contradita |
| Devolução: 20 dias; 1ª grátis, depois R$ 45; itens íntimos e de banho em 7 dias | `Return-Policy-a-281` via dossiê e `shein-e-confiavel` | 16/09/2026 | Média |
| Troca por tamanho | nenhuma fonte lida | - | PENDENTE: navegador |
| Nenhum artigo de tamanho da SHEIN no ar | checagem dos títulos e do molde de 30/10 | 30/10/2026 | Alta |
| Modelo de tabela de medidas já no ar (Cléa) | `content/reviews/clea-store-tabela-de-medidas-como-escolher-tamanho.json` | 20/10/2026 | Alta |

## Lido no Chrome pelo Claude (30/10/2026)

Página oficial "Como escolher o seu tamanho?", https://br.shein.com/How-to-choose-your-size-a-748.html:
- Cada página de produto tem o botão "Guia de tamanhos", com as medidas em centímetros e polegadas e como medir.
- Algumas páginas de produto têm o botão "Verificar meu tamanho" (Fit Finder), que pede altura, idade e peso para recomendar o tamanho; com login, aparece uma recomendação de tamanho em algumas páginas.
- O botão "TAMANHO E AJUSTE" mostra o tamanho e as medidas da modelo.

Consequência para a pauta: a tabela é por peça (cada produto tem a sua), então o artigo ensina a ler o "Guia de tamanhos" de cada peça e não publica uma tabela única P/M/G. A tabela de uma peça de exemplo não foi lida: a SHEIN abriu um CAPTCHA (`/risk/challenge`) na página do produto e a leitura parou ali, sem resolver. Política de troca (troca de tamanho ou só devolução): segue pendente.
