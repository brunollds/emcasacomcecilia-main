# Guia editorial — classes de Guias & Análises

**Aplicação:** artigos publicados em `content/reviews/` e listados em português

**Atualizado em:** 14/08/2026

**Status:** vocabulário editorial aprovado; backfill, validação técnica e rotação automática na
home implementados (Commits 3A–3D, ver Seção 10)

## 1. A decisão obrigatória de pauta

Todo artigo novo de **Guias & Análises** escolhe exatamente uma classe editorial no campo
`category`:

| `category` | Rótulo público | Pergunta principal que a peça responde |
|---|---|---|
| `guias-praticos-utilidade` | Guias práticos & utilidade | Como funciona, como escolher, quais são as especificações ou qual contexto ajuda a entender? |
| `produtos-experiencias` | Produtos & experiências | Como é este produto e qual é a avaliação ou experiência editorial sobre ele? |
| `cupons-como-usar` | Cupons & como usar | Qual é o código, como aplicar ou como encontrar uma oferta válida? |
| `confianca-reputacao` | Confiança & reputação | A marca ou empresa é confiável e o que dizem dados públicos, reclamações e histórico? |

`category` é a fonte de verdade para navegação, filtros de `/reviews` e atalhos da home. Não
criar `editorialClass`, `navigationCategory` ou outro campo paralelo.

## 2. Três campos, três trabalhos

| Campo | Governa | Natureza |
|---|---|---|
| `category` | classe editorial e navegação | enum controlado, exatamente um dos quatro valores |
| `reviewKind` | capacidades estruturais do template | `produto`, `guia` ou `editorial` |
| `type` | rótulo público granular | texto livre, por exemplo “Móveis de Luxo” ou “Investigação” |

Os campos não são sinônimos. Um artigo pode ter `type: "Editorial"` e pertencer a Produtos &
experiências; outro pode ter o mesmo `type` e pertencer a Confiança & reputação. Da mesma
forma, `reviewKind` não deve ser convertido automaticamente em `category`.

## 3. Regra de decisão quando houver sobreposição

Classifique pela função principal da pauta, nesta ordem:

1. Se a pergunta central é legitimidade, reclamações ou reputação de marca, use
   `confianca-reputacao`.
2. Se a pergunta central é código, aplicação ou descoberta de cupom, use
   `cupons-como-usar`.
3. Se a peça assume a avaliação editorial de um produto específico ou declara experiência,
   primeiras impressões, uso, teste, fotos ou vídeo próprios, use `produtos-experiencias`.
4. Se a peça explica, contextualiza, compara especificações ou promove um produto sem
   experiência própria declarada, use `guias-praticos-utilidade`.

Relação comercial não decide a classe. Um artigo de parceiro pode pertencer a qualquer uma
das quatro, conforme a pergunta que responde e a evidência que realmente publica.

## 4. O caso-limite que define a fronteira

### Aliv Head Gel IWS → Guias práticos & utilidade

O artigo usa informações públicas para promover e explicar um produto individual de parceiro,
**sem experiência própria declarada**. Ele apresenta especificações, instruções, cuidados e o
que considerar antes da compra. Por isso é guia, mesmo tendo produto, CTA e cupom.

### Cobertor IWS Igloo → Produtos & experiências

O artigo declara produto recebido, primeiras impressões em vídeo, contato com os dois lados do
cobertor e uso durante a noite. Ainda não apresenta um veredito maduro de longo prazo, mas
assume experiência editorial própria sobre o produto. Por isso pertence a Produtos &
experiências, ainda que os campos legados sejam `type: "Editorial"` e
`reviewKind: "editorial"`.

O par é deliberado: mesma marca e mesma relação comercial, classes diferentes por causa da
evidência e da função editorial.

## 5. `reviewKind` e veredito continuam separados

`category: "produtos-experiencias"` não obriga, sozinho, `reviewKind: "produto"`. O contrato
atual exige veredito completo quando `reviewKind` é `produto`; uma peça de primeiras impressões
pode pertencer à classe Produtos & experiências sem fingir uma avaliação conclusiva.

Não preencher `reviewKind`, rating, veredito ou `pros/cons` apenas para acompanhar a categoria.
Esses campos dependem do conteúdo e das capacidades de render necessárias.

## 6. Regras para a Central Editorial

- apresentar `category` como seleção obrigatória para novo artigo PT de Guias & Análises;
- oferecer somente os quatro valores canônicos;
- exibir o rótulo humano junto do valor técnico;
- preservar o valor em round-trip e no adapter do Em Casa;
- não inferir pelo título, `type`, `reviewKind`, marca, cupom ou presença de `pros/cons`;
- bloquear publicação nova sem classe depois que o validador do Commit 3A estiver ativo;
- não tornar o campo obrigatório retroativamente em outros idiomas antes de backfill próprio.

A mudança efetiva em `central-editorial/packages/content-model` e no formulário da Central
pertence ao repositório da Central e exige tarefa própria.

## 7. Extensão do texto

Não existe teto ou meta fixa de caracteres, parágrafos ou linhas para artigos de Guias &
Análises. A extensão é determinada pela complexidade da pergunta e pela evidência necessária
para respondê-la bem.

Revisar por densidade, não por tamanho: cortar repetição, desvio de intenção, frase sem sentido
ou afirmação que não acrescenta evidência. Não remover contexto útil, experiência própria,
metodologia, ressalva ou comparação apenas para encurtar o artigo.

## 8. Checklist antes de publicar

- [ ] A pauta escolheu exatamente uma classe.
- [ ] A classe corresponde à pergunta principal, não ao nome da marca.
- [ ] Experiência própria só é afirmada quando está declarada no conteúdo.
- [ ] `type` foi usado como rótulo, não como taxonomia de navegação.
- [ ] `reviewKind` corresponde às capacidades reais do artigo.
- [ ] Se houver parceria, o artigo também cumpre `CONTRATO-ARTIGO-AFILIADO.md`.
- [ ] Se houver vídeo, cumpre `GUIA-EDITORIAL-VIDEOS.md` sem duplicar `category` no vídeo.

## 9. Escopo atual

O vocabulário foi aprovado para os 32 artigos listados em português, com distribuição inicial
10/10/7/5. Esses números são retrato do acervo, não metas nem asserções permanentes. Conteúdo
internacional recebe classe somente depois de decisão e backfill por locale.

## 10. Onde o artigo aparece na home

Desde a D2 (outubro de 2026), a home não escolhe destaques por `category`. Um artigo listado em
português (sem `draft`, sem `hideFromListings`/`hideFromPortugueseListings` e com `locale`
português ou sem `locale`) aparece:

- **no "Acabou de sair"**, se estiver entre os 5 mais novos por `publishedAtISO`, com desempate
  pelo maior `id` (`getHomeLatest`, em `src/lib/homeStores.ts`). Não há teto por categoria;
- **na aba da loja, na vitrine**, se o `affiliate` for o slug de uma loja ativa de
  `src/lib/couponsData.ts`: a aba mostra os 3 mais novos da loja. Loja com mais de 3 artigos ganha
  a subpágina `/reviews/loja/<slug>`, com todos;
- **na faixa de uma data comercial**, só se o slug estiver no `articleSlugs` da edição em
  `content/home-events.json`, durante a campanha.

`category` continua valendo para os filtros de `/reviews`. `type`, `reviewKind`, `isNew`,
`pros/cons` e a marca citada no texto não mudam o lugar do artigo na home.

Contrato para todo artigo PT novo, reforçando a Seção 1: `category` válida, `publishedAtISO` em
`YYYY-MM-DD`, `id` único, presença no manifest e `npm run build` verde. Sem `category` ou
`publishedAtISO` válidos, `assertDiscoverableReview` (`src/lib/reviewDiscovery.ts`) derruba o build
com o slug do artigo.

Publicar na Central sem deploy não move a home: ela só mostra o artigo novo depois do deploy, com
até ~5 minutos de cache (`revalidate = 300` em `src/app/(pt)/page.js`).

### Mídia editorial remota

Para preparar imagens, vídeos e áudios, siga o [Guia de mídia editorial](GUIA-MIDIA-EDITORIAL.md):
compressão antes do upload, URLs imutáveis, manifesto, verificação GET de integridade antes de
referenciar e metadados de acessibilidade/licença. `media.emcasacomcecilia.com` continua sendo a
mídia do coletor; não o use como biblioteca editorial.

No fluxo atual, mantenha caminhos locais nos JSONs. O mapa de entrega aplica a
URL CDN, sem alterar publicacao, datas ou chips. Midia nova: comprimir, inventariar
incrementalmente, fazer upload/verificacao e acrescentar ao mapa com `--append`.
Nao apagar originais nem substituir o mapa completo para adicionar uma imagem.
Ver comandos e limites no guia de midia; audio ainda exige implementacao propria.
