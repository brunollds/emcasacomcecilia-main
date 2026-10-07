# Job 4: Conformação Técnica para JSON Canônico

---

## 1. Missão
Converter o texto revisado em Markdown para o arquivo JSON estruturado em `content/reviews/<slug>.json` e registrá-lo no `content/reviews/_manifest.json`. Artigo que sai em outros idiomas vira uma família de 10 JSONs (seção 3).

---

## 2. Regras Estritas do JSON
1. **Campos Obrigatórios:** `id`, `slug`, `title`, `description`, `publishedAt`, `publishedAtISO`, `category`, `reviewKind`, `type`, `author`, `contentSections`.
   *(Nota: `readingTime` NÃO é campo do JSON; o tempo de leitura é calculado automaticamente em tempo de execução pelo template).*
   - `id`: número inteiro que nenhum outro JSON usa. Numa família, cada versão tem o seu.
   - `isNew: true` só no artigo em português e só no mês em que ele sai. As traduções levam `isNew: false`.
2. **Afiliados (quando aplicável):**
   - `coupon`: o código que o leitor copia no dock e na sidebar (ex: `"CECI"`). O campo se chama `coupon`, mas o texto chama o código pelo nome que ele tem na loja: o `CECILIA010` da YesStyle é código de recompensa, nunca cupom (regras em `CONTRATOS-DE-CONTEUDO.md`).
   - `affiliate`: Slug do cupom correspondente em `src/lib/couponsData.ts`.
   - `editorialNote`: Texto de divulgação, com no máximo 3 linhas no celular e sem data.
3. **Mídia, Imagens & Vídeos (Sub-etapa de Assets):**
   - `image`: Caminho da imagem principal (Hero).
   - `imageAlt`: Texto alternativo descritivo e acessível (sem clickbait).
   - `imageFit` (`"contain"` | `"cover"` | `"wide"` | `"square"`) e `imageAspect`.
   - Imagens inline nas `contentSections` quando houver fotos explicativas ou tabelas.
   - `gallery`: Array de fotos com legenda (`caption`) rica quando houver múltiplos ângulos/detalhes.
   - `video` (MP4/loop) ou `youtubeUrl` (registrado em `video-metadata.js` se for primário).
   - **Caminhos sempre locais:** `image`, `imageAlt`, `images[].src` e `gallery[].image` usam `/images/reviews/<marca>/<arquivo>.webp`. Nunca escrever URL `cdn.emcasacomcecilia.com` no JSON nem alterar chaves de `localVideoMetadata`/`video-pages`: o mapa de entrega troca pela URL do CDN só na renderização.
   - **Toda imagem NOVA precisa entrar na biblioteca de mídia** (seguir `docs/GUIA-MIDIA-EDITORIAL.md`): arquivo comprimido em `public/images/...`, inventário gerado com `--merge --stdout`, upload FTPS + verificação HTTPS, `prepare-delivery --append` e `phase5-export --write/--check`. No `data/media-manifest.json`, inserir **só as entradas novas**, onde a ordem alfabética as põe, sem reordenar o resto: gravar o `--merge` inteiro reordena blocos antigos e reescreve centenas de referências. Imagem em `public/` fora do manifesto/mapa reprova o `candidate-proof`/`deploy:prepare` (bytes novos não mapeados). Upload é escrita em produção e depende de GO do Bruno.
   - **Proporção antes do `imageFit`:** conferir largura×altura reais. `"contain"` sem `imageAspectRatio` cai numa caixa 16:9 e gera barras brancas em foto quadrada/quase quadrada. Foto quadrada: `"square"`; outras: declarar `imageAspectRatio` (ex.: `1.3333` para 4:3, `1.7758` para 16:9). Hero: `imageAspect` coerente com a foto (`landscape`/`portrait`/`square`).
   - **Carrossel:** várias fotos na mesma seção via `images[]` (cada item com `src`, `alt`, `caption`, `objectFit`, `aspectRatio`). Não repetir no `gallery` as fotos já usadas no corpo.
   - **Origem e licença:** registrar na nota do vault a origem de cada foto (própria, foto de manual, marca) e a autoria; crédito também na `caption` quando a imagem não for da autora.
4. **Links nas Seções:**
   - Link para a página da loja é relativo e fica no idioma do artigo: `/cupons/<marca>` em português e `/<locale>/coupons/<marca>` nos outros idiomas (ex.: `/en/coupons/yesstyle`). O `npm run test:review-i18n` reprova link de loja em outro idioma.
   - Links externos de loja devem ter `"sponsored": true`.
5. **FAQ:** uma seção de `contentSections` com o título de FAQ do idioma e `bullets`, um por pergunta: a pergunta terminando em `?` (`？` em chinês e japonês) e a resposta logo depois, no mesmo item. É essa seção que vira o `FAQPage` no schema da página.

   | Idioma | Título da seção |
   |---|---|
   | pt | Perguntas frequentes |
   | en | Frequently asked questions |
   | es | Preguntas frecuentes |
   | fr | Questions fréquentes |
   | de | Häufige Fragen |
   | it | Domande frequenti |
   | ko | 자주 묻는 질문 |
   | ja | よくある質問 |
   | zh-hant | 常見問題 |
   | zh-hans | 常见问题 |

6. **Manifesto:** acrescentar o `<slug>` no fim de `content/reviews/_manifest.json`, que segue a ordem de publicação. Uma família entra junta, na ordem dos idiomas da tabela acima.
7. **Índice gerado:** depois de criar ou editar JSON, rodar `node scripts/content/build-index.mjs` e commitar `src/lib/generated/content-index.ts` junto com os JSONs. O `npm run dev` lê só esse índice.

---

## 3. Artigos em outros idiomas

A build confere estas regras; o resumo técnico também está no `CLAUDE.md`, em "Artigos em outros idiomas".

1. Uma família é o conjunto de JSONs com a mesma `translationKey`: uma versão em cada um dos 10 idiomas (`pt`, `en`, `es`, `fr`, `de`, `it`, `ko`, `ja`, `zh-hant`, `zh-hans`), cada uma com `locale` explícito, inclusive o `locale: "pt"` da fonte. O `npm run test:review-i18n` reprova família com idioma faltando.
2. A URL sai sozinha: `/reviews/<slug>` em português e `/<locale>/reviews/<slug>` nos outros idiomas. Não criar `page.tsx`, hreflang, seletor de idioma nem entrada em `src/lib/i18n/clusters/` para a tradução aparecer. Redirect só ao mudar a URL de um artigo já publicado.
3. Iguais nas 10 versões: `translationKey`, `category`, `reviewKind`, `author`, `affiliate`, `coupon`, `image`, `imageFit`, `imageAspect`, o vídeo e `draft`, e também `publishedAtISO` quando as versões saem juntas (o `isNew` vai só no português; item 1 da seção 2). A build reprova `affiliate` ou `coupon` diferentes. O link do `cta` é o mesmo nos 10 idiomas na YesStyle; na SHEIN, o português usa o link brasileiro do código e os outros idiomas usam o link neutro (nota do cluster SHEIN).
4. Escritos em cada idioma: `title`, `seoTitle`, `description`, `metaDescription`, `type`, `imageAlt`, `pros`, `cons`, `contentSections`, `editorialNote`, o `text` e o `label` do `cta`, e `publishedAt` no formato de data do idioma (`28 de setembro de 2026`, `September 28, 2026`, `28. September 2026`, `2026년 9월 28일`, `2026年9月28日`).

   O `type` aparece no cabeçalho do artigo, nos cards da vitrine do idioma e nos relacionados, então vai no idioma da versão, com o sentido do PT e o termo que as famílias já usam (tabela abaixo). Igual ao PT só "Editorial" em `en` e `es`; em `ko`, `ja`, `zh-hant` e `zh-hans`, nunca em letras latinas. O `npm run test:review-i18n` reprova os dois casos. "Editorial" segue o selo do mesmo cabeçalho (`kindLabel.editorial` em `src/components/review/articleCopy.ts`), para os dois rótulos baterem. Rótulo novo: traduzir o sentido e acrescentar a coluna aqui.

   | Idioma | Guia & Cupons | Editorial | Primeiras Impressões |
   |---|---|---|---|
   | en | Guide & Coupons | Editorial | First Impressions |
   | es | Guía & Cupones | Editorial | Primeras Impresiones |
   | fr | Guide & Coupons | Éditorial | Premières impressions |
   | de | Ratgeber & Gutscheine | Redaktionell | Erste Eindrücke |
   | it | Guida e coupon | Editoriale | Prime impressioni |
   | ko | 가이드 & 쿠폰 | 에디토리얼 | 첫인상 리뷰 |
   | ja | ガイド＆クーポン | エディトリアル | ファーストインプレッション |
   | zh-hant | 指南與優惠碼 | 編輯專題 | 初次使用心得 |
   | zh-hans | 指南与优惠码 | 编辑专题 | 首次使用体验 |

5. `slug` no idioma da versão em `en`, `es`, `fr`, `de` e `it`. Em `ko`, `ja`, `zh-hant` e `zh-hans`, slug em ASCII terminado no código do idioma (ex.: `abib-skincare-routine-30-ja`).
6. Toda versão fora do português leva `hideFromPortugueseListings: true`. A vitrine em português também filtra pelo `locale`, mas a flag é o padrão das traduções e o `validate:content` a exige nas famílias registradas em `clusters/yesstyle.ts`.
7. `relatedArticles` aponta para artigos do mesmo idioma.
8. Modelo de família: `yesstyle-skincare-30` (publicada em 28/09/2026), a mais recente e a mais uniforme. As famílias mais antigas têm campos só em alguns idiomas; não copiar essa diferença.
9. Atualizar a matriz da nota do cluster com a chave, o slug da fonte em português e a data.
10. **Releitura das traduções, antes do `pronto-para-gates`.** A build confere a estrutura, não o texto. Reler cada uma das 9 versões ao lado do PT aprovado no Job 3, um idioma por vez, de preferência com outro agente (não o que traduziu), e conferir:
    - o sentido é o do PT: os mesmos claims, nada acrescentado sem fonte, nada cortado;
    - preço, moeda, frete, disponibilidade e campanha aparecem como fatos do mercado de origem, sem conversão;
    - o código tem o nome do idioma (tabela em `CONTRATOS-DE-CONTEUDO.md`), e a SHEIN leva o aviso de que o código é da SHEIN Brasil;
    - o link do `cta` é o do idioma (item 3 desta seção): na SHEIN, nenhum link brasileiro fora do português;
    - a escrita está certa: caracteres tradicionais em `zh-hant`, simplificados em `zh-hans`, nenhuma palavra ou frase ficou em português, e o `type` é o da tabela do item 4;
    - o FAQ segue o item 5 da seção 2, o `publishedAt` está no formato do idioma e o `editorialNote` tem até 3 linhas;
    - o texto soa natural no idioma, sem tradução literal.

    Corrigir no JSON e registrar na nota do vault, por idioma, a data da releitura e o que mudou.
