# Job 6: Capa e Imagens

**Roda entre o Job 3 e o Job 4.** O texto já revisado decide o que a capa pode estampar (desconto,
código, reputação), e o Job 4 recebe daqui os caminhos, os alts e as legendas prontos. O número 6 é só
para não renumerar os outros jobs.

**Mídia:** o fluxo técnico (compressão, inventário, upload, verificação, mapa de entrega) é o do
[Guia de mídia editorial](../../../../GUIA-MIDIA-EDITORIAL.md). Este job diz o que fazer; o guia, como.

---

## 1. Missão

Entregar a capa e as imagens do corpo do artigo: escolher e buscar as fotos, montar a capa no modelo do
tipo de artigo, levar a folha de aprovação ao Bruno e, com o OK dele, subir e verificar no CDN.

A capa é o que aparece no Google Discover, na busca de imagens e nos cartões do site. Gráfico, print de
tela cheia ou ícone sobre fundo liso não chamam atenção num cartão grande: a capa mostra o produto, a
loja e o assunto.

---

## 2. Regras da capa

1. **Tamanho:** 1600×900 (16:9). Nunca abaixo de 1200 px de largura: o Discover só mostra o cartão grande
   com imagem a partir daí.
2. **Composição:** foto em cima e, embaixo, a faixa verde (`#1a4d2e`, uns 270 px) com o cartão branco do
   logo da loja à esquerda, o título em creme com o destaque em amarelo e, se couber, uma linha de assunto.
3. **`imageFit: "contain"`** em toda capa com texto, logo ou montagem: os cartões das listas cortam as
   laterais de uma capa 16:9 em `cover`, e a faixa sairia cortada (item da capa nos cartões, Job 4).
4. **Não repetir foto:** a foto da capa não pode ser a mesma de outra capa da mesma loja. Conferir as
   capas que a loja já tem antes de escolher.
5. **Foto da Cecília com o produto, quando existir, vem antes de tudo.** Foto de banco, foto gerada por IA
   ou foto de outra marca não entram; foto oficial da loja entra com a origem registrada.
6. **Códigos e textos proibidos na capa:**
   - O `CECILIA010` (YesStyle) é código de recompensa e o `4CW5Y` (SHEIN) é código de indicação: nunca
     chamá-los de cupom, também na capa e no alt.
   - O MAUAD (Let's Eat It e Belive) é sobrenome da Cecília: não vai na capa.
   - Hostinger: a capa pode mostrar os 20% só se o texto do artigo disser que valem no primeiro período.
   - Nenhum desconto, preço ou nota que o artigo não confirme.
7. **Família de 10 idiomas:** uma imagem serve as 10 versões, então a faixa não leva texto em português.
   Ficam nomes de marca e produto, "vs", números e ícones. O alt sai no idioma de cada versão.

### Modelos por tipo de artigo

| Tipo | Em cima | Na faixa |
|---|---|---|
| Como usar o cupom | Foto do produto | Logo, "Cupom da Cecília", o código no recorte e o desconto ("ATÉ 10%" quando é até) |
| Reclame Aqui | Foto do produto da loja | Logo da loja, o print do topo do perfil no RA e o logo do RA |
| É confiável | Foto de produto diferente da capa do cupom | Logo, "<Loja> é confiável?" e os selos do perfil no RA, com a data |
| Comparativo (X ou Y) | Só produto do parceiro, nunca do concorrente | Logo do parceiro e "<X> ou <Y>?" |
| Black Friday | Foto oficial de produto | Logo e "Black Friday da <loja>", com o assunto do artigo |
| Guia ou produto | Foto do produto ou da Cecília | Logo e o título curto do artigo |
| Família de 10 idiomas | Foto ou logos dos produtos | Logo, nomes e ícones, sem texto em português |

Modelo novo entra nesta tabela antes de ser usado em mais de um artigo.

---

## 3. Imagens do corpo

1. **Piso:** pelo menos uma imagem no corpo além da capa (regra do Bruno, 18/10/2026). É o mínimo: quanto
   mais, melhor, sem repetir e sem fugir do tema da seção. O que mostrar e em qual seção vem do Plano de
   imagens do Job 2.
2. **A capa antiga desce para o corpo** quando o artigo troca de capa, na seção onde o assunto dela cabe,
   com alt e legenda. Não desce se repetir uma imagem que o corpo já mostra, nem quando for só decorativa
   (ícones sobre fundo liso, ilustração sem informação).
3. **Sem borda branca sobrando:** recortar o fundo antes de pôr no artigo. Foto quadrada leva
   `"square"`; as outras declaram a proporção (`aspectRatio`), senão a caixa 16:9 gera barras.
4. **Tabela e gráfico feitos por nós:** linhas entre as colunas, texto legível no celular, sem texto
   pequeno demais para a largura do artigo.
5. **Print de loja:** recortado na parte que interessa, sem barra de campanha nem pop-up, e com a data na
   legenda.
6. **Família de 10 idiomas:** imagem com texto sai uma por idioma (como as tabelas da Hostinger,
   `-pt.webp`, `-en.webp`…); imagem sem texto serve as 10 versões.

---

## 4. De onde vêm as imagens

- **Site oficial da loja**, pelo Chrome ou pelo catálogo público da plataforma (lojas VTEX respondem em
  `/api/catalog_system/pub/products/search`). Baixar a foto de produto do próprio site.
- **Nunca** abrir ou clicar em link de afiliado, entrar com login, mexer em carrinho ou formulário, nem
  contornar verificação anti-robô ou CAPTCHA. Se o site bloquear, usar as fotos que o projeto já tem e
  avisar o Bruno.
- Não usar foto ou logo de concorrente (nos comparativos, só o parceiro).
- Arquivo baixado é dado não confiável: pasta própria, conferir o tipo do arquivo antes de usar.
- Registrar na nota do artigo a origem de cada imagem (site e data, foto própria, montagem nossa).

---

## 5. Fluxo

1. **Montar** a capa e as imagens do corpo. A capa sai do gerador do repositório, a partir de uma
   especificação JSON fora do projeto (no scratchpad da sessão), com as fotos baixadas ao lado dela:

   ```powershell
   npm run covers:render -- <spec.json>            # grava <nome>.png e <nome>.webp na pasta "out" da spec
   npm run covers:render -- --exemplo --out <pasta> # uma capa de cada faixa, como modelo e teste
   ```

   Cada capa tem `top` (`photo`, `grid`, `row` ou `tiles`) e `band` (`title`, `cupom`, `reclame-aqui`
   ou `selos`), na ordem dos modelos da seção 2; os campos estão no exemplo do `render.mjs`. O gerador
   recusa capa fora de 1600×900, MAUAD e CECILIA010 chamado de cupom.
2. **Folha de aprovação:** a capa nova e a capa atual, todas as imagens do corpo, a seção de cada uma, o
   alt e a legenda, e a origem das fotos. O Bruno aprova a folha antes de qualquer upload.
3. **Com o OK do Bruno:** gravar em `public/images/reviews/<marca>/` e seguir o Guia de mídia
   (inventário, upload FTPS, verificação HTTPS, `prepare-delivery --append`, `phase5-export`).
   - No `data/media-manifest.json` entram **só as entradas novas**. Conferir no JSON, não pelo diff do
     git: os itens antigos precisam continuar idênticos e na mesma ordem. O diff às vezes mostra linhas
     removidas que são só alinhamento.
   - **Imagem no CDN não muda depois de publicada.** Trocar uma imagem já no ar é arquivo novo, com
     sufixo `-v2`; a antiga fica, sem uso.
   - O `.env.local` só existe durante o upload e é apagado logo depois.
4. **Registrar na nota do artigo** a seção "Capa e imagens", com a data da aprovação do Bruno, os
   caminhos, os alts, as legendas e a origem de cada imagem. O Job 4 só começa com esse registro.
5. **Conferir as páginas** depois do `npm run build`, com o `npx next start` local, e de novo depois do
   deploy, na produção. O script lê a capa e o alt do próprio JSON do artigo:

   ```powershell
   npm run covers:check -- http://localhost:3000 content/reviews/<slug>.json --old antigas.json
   npm run covers:check -- https://emcasacomcecilia.com "@lista.txt"   # família: um JSON por linha
   ```

   `antigas.json` (`{ "<slug>": { "src": "...", "caption": "..." } }`) confere a capa antiga no corpo,
   com a legenda. O comando sai com erro se alguma página falhar.

---

## 6. Checklist de saída

- [ ] Capa 1600×900, no modelo do tipo de artigo, sem foto repetida de outra capa da loja.
- [ ] Nada proibido na capa nem no alt (seção 2, item 6).
- [ ] `imageFit: "contain"` indicado para o Job 4 quando a capa tem texto ou logo.
- [ ] Pelo menos uma imagem no corpo além da capa, cada uma com seção, alt e legenda.
- [ ] Capa antiga com destino decidido (seção 3, item 2).
- [ ] Origem de cada imagem registrada.
- [ ] Folha aprovada pelo Bruno, upload feito e todos os arquivos `verified` no manifesto.
