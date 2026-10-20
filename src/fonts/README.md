# Fontes do site

Arquivos `.woff2` com o subset latino que o Google Fonts serve para cada família, guardados aqui para o build não
depender de rede (o `next/font/google` baixava as fontes em todo build). São os mesmos arquivos que o
`next/font/google` gerava, tirados do build de 19/10/2026.

| Arquivo | Família | Pesos | Usada em |
|---|---|---|---|
| `montserrat-latin.woff2` | Montserrat (variável) | 400–800 | `RootLayoutShell.tsx` |
| `lora-latin.woff2` | Lora (variável) | 400–700 | `RootLayoutShell.tsx` |
| `caveat-latin.woff2` | Caveat (variável) | 400–700 | `RootLayoutShell.tsx` |
| `kalam-latin-400.woff2`, `kalam-latin-700.woff2` | Kalam | 400 e 700 | `RootLayoutShell.tsx` |
| `archivo-latin.woff2` | Archivo (variável, com o eixo de largura 62–125%) | 100–900 | `coupons/CouponBlocks.tsx` |
| `jetbrains-mono-latin-800.woff2` | JetBrains Mono | 800 | `coupons/CouponBlocks.tsx` |

O subset latino cobre português, inglês, espanhol, francês, alemão e italiano. Coreano, japonês e chinês usam as fontes
do sistema, como antes.

Todas as famílias são distribuídas sob a SIL Open Font License 1.1 (texto em `OFL.txt`), que permite usar, embutir e
redistribuir as fontes com o aviso de licença. Fontes: fonts.google.com e o repositório de cada família (github.com/google/fonts).
