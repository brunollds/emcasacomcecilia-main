# Home D2: Stories da Cecília

**Data:** 2026-10-07
**Status:** aprovada pelo Bruno em 07/10, com todas as decisões respondidas (fim do documento).
A Fase 0 está no ar desde 07/10 (PR #37, `58d175d`). O código da home começa na Fase 1, e o plano
da vitrine está em `docs/superpowers/plans/2026-10-08-home-d2-vitrine.md`.
**Referência visual:** canvas https://claude.ai/artifact/2nTSHg5NcfTWWZV4RgBqZ5, pranchetas
"D2. Stories da Cecília" (celular e desktop). A G3 continua no canvas como alternativa.

## Contexto e objetivo

Em 07/10 o Bruno escolheu a D2 para a home. A página passa a abrir pelas bolinhas: a primeira é a
da Cecília e abre a apresentação dela; as outras são das lojas parceiras, e escolher uma mostra o
código da loja em destaque e os artigos sobre ela. Logo abaixo vem uma seção única, "Acabou de
sair", com os artigos mais recentes. Depois dela entra um espaço para datas comerciais (Black
Friday, 11/11, Dia das Mães…), que só aparece durante cada campanha. Os artigos não mostram código
("isso confunde"); o código aparece uma vez, no recorte da loja.

Pedidos dele que a especificação segue à risca:

- sem o texto de apresentação logo abaixo do header, no celular e no desktop;
- cada bolinha de loja mostra o código da própria loja em destaque, e os artigos aparecem sem
  código;
- a bolinha da Cecília abre o hero dela, não artigos;
- de cada loja, um link para todos os artigos dela em Guias & Análises;
- "Guias e análises" e "Acabou de sair" viram uma seção só, "Acabou de sair", com os cards do G no
  desktop e a lista do G/G2 no celular;
- no celular, ao escolher uma loja, o código aparece primeiro e a lista de artigos vem embaixo;
- as seções de baixo ficam como na D, com 4 receitas na faixa de receitas;
- o grupo de WhatsApp vai para a faixa "Sobre a Cecília", antes do footer;
- um espaço entre "Acabou de sair" e "Receitas" para as datas comerciais, com artigos destacados,
  que sirva para qualquer data (Black Friday, Natal, Prime Day, datas duplas, datas comemorativas);
  a página de cada data existe fora do menu, como `/black-friday`;
- a D2 vai ao ar inteira, com as datas comerciais junto.

## O que não muda

- **Header e footer.** Continuam os de hoje (`RootLayoutShell` → `Navbar`/`Footer`), em todas as
  páginas e idiomas. No canvas eles são um esboço simplificado; a D2 só troca o miolo da home.
- **Rota, cache e metadados.** `src/app/(pt)/page.js`, `revalidate = 300`, `title`, `description`,
  canonical e Open Graph ficam como estão nesta entrega. Trocar o título da home é decisão de SEO à
  parte.
- **Outros idiomas.** A D2 é só a home em português. A home em outros idiomas (hoje `/en`, `/es`… dão
  404) é outro assunto, para depois.
- **Regras dos códigos**, que já estão nos dados e nos textos do site:
  - CECILIA010 é código de recompensa, nunca cupom;
  - 4CW5Y é código de indicação da SHEIN, pesquisado no aplicativo;
  - a Insider mostra o desconto que estiver em `couponsData.ts`: desde 07/10 o Bruno decidiu
    mostrar o percentual (15%), e a página da loja muda em outra sessão;
  - a Nestlé Nutre mantém a exclusão de Alfamino, Alfaré e fórmulas infantis de 0 a 12 meses;
  - MAUAD não ganha destaque fora do próprio código;
  - "Ver a página da loja" leva a `/cupons/{slug}` em toda loja, a DAMIE inclusive: o menu já
    linka o subdomínio da DAMIE, e a vitrine traz tráfego para `/cupons/damie` (decisão F).

## Ordem das seções

| # | Seção | De onde vem |
|---|---|---|
| 1 | `h1` só para leitor de tela ("Em Casa com Cecília: guias, códigos de desconto e receitas") | novo |
| 2 | Vitrine: bolinhas; a da Cecília abre a apresentação dela, a de cada loja abre o recorte do código e os artigos | novo (`HomeStoreStories`, com o painel `HomeCeciliaPanel`) |
| 3 | Acabou de sair | novo (`HomeLatest`) |
| 4 | Datas comerciais, só durante uma campanha | novo (`HomeEvent`) |
| 5 | Receitas, com 4 receitas | `PopularRecipes`, com outro visual |
| 6 | Explore a casa (DAMIE, Dicas & Ofertas, E-book Air Fryer) | `MyLinks`, com outro visual |
| 7 | Ofertas do dia | `Offers` + `getFeaturedOffers`, com outro visual |
| 8 | Últimos vídeos | `CTA` + `VideoCarousel`, com outro visual |
| 9 | Faixa "Sobre a Cecília", com o grupo de WhatsApp, antes do footer | novo (`HomeAboutStrip`) |

Os títulos seguem o canvas: a seção 6 se chama "Explore a casa" na D (no site de hoje, "Explore o
universo").

Saem da home: `CouponStrip`, `Hero` (o conteúdo vai para o painel da Cecília),
`FeaturedReviewGuides`, `ReviewsShowcase` e `HomeEditorialPick` (Decisão D). Arquivos que ficarem
sem uso são apagados na Fase 6, depois de um grep que prove que nada mais os importa.

## Seção 2: vitrine

### Dados

Um módulo novo do servidor, `src/lib/homeStores.ts`, monta os dados das abas de loja e entrega ao
componente cliente por props. Ele recebe as reviews como parâmetro e não importa `@/lib/data` (a
regra do bundle do CLAUDE.md vale para o componente cliente; o módulo fica no servidor e é chamado
pelo `page.js`). O componente cliente recebe só dados prontos: textos, URLs e números.

A primeira aba é a da Cecília. Depois vem uma aba por loja de `getActiveCoupons()`, na ordem de
`couponsData.ts`: hoje DAMIE, Dolce Gusto, YesStyle, Nestlé Nutre, I Wanna Sleep, Magalu, Let's
Eat It, Insider e SHEIN. A Kopenhagen está pausada e some sozinha; loja nova entra sozinha.

**Aba da Cecília:** o hero de hoje (`Hero.tsx`) com o visual do canvas, num componente do servidor,
`HomeCeciliaPanel`, que o `page.js` passa pronto para a vitrine (o componente cliente só o mostra ou
esconde). Sem código, sem link de loja e sem artigos. O painel tem:

- o título "Da minha casa para a sua." (`h2`; o `h1` da página é o de leitor de tela);
- a apresentação: "Olá! Sou a Cecília. Conto o que testei em casa, divido as receitas da minha
  cozinha e reúno os códigos de desconto das marcas parceiras.";
- "Mais sobre mim" → `/sobre`;
- os links de Instagram, TikTok e YouTube (`brandLinks`);
- os números das redes, de `socialMedias` em `src/lib/brandLinks.ts`, com a formatação que o
  `Hero.tsx` já usa (`formatHeroFollowerCount`);
- o cartão de foto (`/images/photos/BRU-1.jpg` via `resolveMediaUrl`), com @emcasacomcecilia, o
  total de seguidores do Instagram e "Bastidores, rotina e receitas da Cecília";
- uma linha de orientação: "Escolha uma loja nas bolinhas para ver o código e os artigos dela."

O grupo de WhatsApp não entra aqui: a aba da Cecília não abre sozinha, e o grupo fica na faixa
"Sobre a Cecília", que todo mundo vê.

**Aba de loja** (`kind: 'store'`):

| Campo | Regra |
|---|---|
| `slug`, `brand`, `logo` | `slug`, `brand`, `brandLogo` (ou `brandIcon`) via `resolveMediaUrl` |
| `label` | `getCodeTitle(getSidebarCopy('pt'), kind, brand)`, o mesmo do dock e da sidebar dos artigos, com `kind = getStoreCodeKind(loja, código)`. Dá "Cupom DAMIE", "Código de recompensa YesStyle" e "Código de indicação SHEIN", sem texto novo solto |
| `code` | `code` (`discount-code`) ou `referral.code` (SHEIN) |
| `discount`, `description` | `discount` e `shortDescription`, em duas linhas, como nos cards de `/cupons` (`CouponCards.tsx`, que passa a descrição por `asSentence`). Magalu, Insider e Nutre já trazem o texto certo nesses campos |
| `hints` | `getCodeHints(...)`: "Copie antes de ir para a loja." e, depois de copiar, "Cole no campo correto do checkout."; para a SHEIN, "Copie e pesquise no aplicativo SHEIN." |
| `storeUrl` | `offerUrl` da loja, com os UTMs que já estão nos dados (Let's Eat It/Inbazz) |
| `storePageUrl` | `/cupons/{slug}` em toda loja (`getCouponStorePath`), a DAMIE inclusive (decisão F) |
| `articles` | até 3 artigos da loja, sem código: título, `type`, imagem e link (o canvas não mostra data na lista da loja) |
| `total`, `allArticlesPath` | o total de artigos da loja e, acima de 3, `/reviews/loja/{slug}` (decisão I; ver "Todos os artigos de uma loja") |

**Artigos da loja:** reviews listadas em português (`getListedPortugueseReviews`) cujo `affiliate` é
o `slug` da loja, ordenadas por `sortReviewsByPublishedAt`. Contagem depois da Fase 0 (07/10, 65
artigos listados): Dolce Gusto 15, DAMIE 14, I Wanna Sleep 11, Nestlé Nutre 8, YesStyle 5,
Insider 3, Let's Eat It 3, Magalu 1, SHEIN 0, e 5 artigos sem loja (os dois de air fryer,
rabanada, manteiga e Samsung).

### Correção prévia (Fase 0)

**Nestlé Nutre.** A loja está em `couponsData.ts` com o `slug` `nutren`, que é o nome de uma linha
de produtos, não da loja (nestlenutre.com.br). Sete artigos usam `affiliate: "nutren"` e dois usam
`"nestle-nutre"` (`cupom-ceci-nestle-nutre-como-usar`, `nestle-nutre-e-confiavel`). Para esses
dois, `getCouponBySlug` (`ReviewNotebookTemplate.tsx:259`) não acha a loja, e no ar a gaveta deles
não repete o desconto nem a regra da loja, com a exclusão das fórmulas infantis. Como o Bruno
apontou, o nome certo é Nestlé Nutre (Decisão A, aprovada):

- o `slug` da loja passa a `nestle-nutre`, e a página a `/cupons/nestle-nutre`;
- o `next.config.mjs` ganha o redirect permanente de `/cupons/nutren` para `/cupons/nestle-nutre`,
  ao lado do da busca antiga (o `content/redirects.json` só aceita caminhos de receitas e reviews);
- os 9 artigos da loja passam a `affiliate: "nestle-nutre"` e trocam o link `/cupons/nutren` por
  `/cupons/nestle-nutre`;
- o fixture de `scripts/media/test-review-delivery-html.mjs` e a documentação que cita o slug
  (`AGENTS.md`, `docs/CONTRATO-ARTIGO-AFILIADO.md`, `docs/MANUTENCAO-MENSAL.md`,
  `docs/CUPONS-DATAS-RASTREAMENTO.md` e, no vault, os contratos, o dossiê e o frontmatter e as
  instruções de link das notas de cada artigo) acompanham. Planos, handoffs e tabelas de checagem
  datados ficam como registro do que foi feito;
- as imagens não mudam de lugar: `/images/reviews/nutren/`, o logo e a marca-d'água seguem com os
  caminhos de hoje, que não dependem do slug. Mover mídia é tarefa dos scripts de mídia, com
  aprovação à parte;
- o texto dos artigos não muda: "Nutren Senior", "Nutren Just Protein" e afins são nomes de
  produto.

Efeitos que o Bruno precisa conhecer: os eventos do GA4 levam o slug no parâmetro `brand`, então
os relatórios mostram `nutren` até o deploy e `nestle-nutre` depois; e o Google troca o endereço da
página pelo redirect.

**DAMIE.** Artigos sobre a loja sem `affiliate` ganham a marcação (pedido do Bruno: "tem que ser
marcado"):

- `damie-reclame-aqui-o-que-os-dados-mostram` (análise da reputação da DAMIE);
- `poltrona-amamentacao-rotina` (tem a seção "Onde a Damie pode entrar nessa decisão" e o
  CECILIA12);
- `sofa-na-caixa-crise-reclamacoes-procon-sp` (investigação sobre a concorrente que usa os números
  da DAMIE no Reclame Aqui como comparação; Decisão B).

Com o `affiliate`, o artigo entra na aba e na lista da loja, e os links do CTA e do veredito, quando
existem, saem com `rel="sponsored"`. Os três não têm CTA, e os links deles para a DAMIE vão ao
subdomínio do próprio site, então seguem sem `sponsored` (conferido no ar em 08/10). Nenhum dos
três tem versão em outro idioma, então o `test:review-i18n` não muda.

**Trava.** O `validate:content` passa a exigir que todo JSON de review com `affiliate`, em qualquer
idioma e também nos rascunhos, use o `slug` de uma loja de `COUPONS` (ativa ou pausada). Review sem
`affiliate` continua válida. Conferido em 07/10: hoje só os 2 artigos da Nutre falhariam.

### Comportamento

- **Ao abrir:** DAMIE selecionada, como no canvas.
- **Link direto:** `/#loja-yesstyle` abre com a YesStyle selecionada, útil para os stories do
  Instagram e para a seção de datas comerciais; `/#cecilia` abre a apresentação. A escolha
  atualiza o hash com `history.replaceState`, sem ida ao servidor. Um hash desconhecido é ignorado.
  Cada bolinha tem o id do hash dela (`loja-yesstyle`, `cecilia`), então o navegador rola até a
  vitrine sozinho; o painel tem o id `painel-loja-yesstyle`. O hash é a única fonte da aba aberta,
  lida com `useSyncExternalStore`, como a categoria em `/reviews`. Por isso a home não ganha outra
  âncora interna (`#receitas`, link de pular conteúdo): qualquer hash que não seja de aba volta a
  vitrine à DAMIE.
- **Desktop (a partir de 1024 px):**
  - fila de bolinhas;
  - na loja, o recorte do código: parte laranja com logo, rótulo e detalhe; parte creme com o
    código em JetBrains Mono, Copiar, "Ir para a {loja}" e "Ver a página da loja";
  - embaixo, lado a lado: o card "story" do artigo atual (imagem, segmentos de progresso,
    anterior/próximo, contador, "Ler o artigo") e a lista "Artigos da {loja}". Clicar num item da
    lista leva o story até ele;
  - na Cecília, o painel ocupa a largura toda: texto à esquerda, cartão de foto à direita.
- **Tablet (768 a 1023 px):** o recorte fica lado a lado como no desktop, e a lista ocupa a largura
  toda, sem o story.
- **Celular (até 767 px):**
  - bolinhas com rolagem horizontal; a bolinha selecionada rola para a vista;
  - o recorte do código vem primeiro, empilhado;
  - depois a lista "Artigos da {loja}", com links diretos, sem o story;
  - na Cecília, o painel empilhado: título, cartão de foto, apresentação, links e números.
- **Quantidade de artigos:**
  - com 3 ou mais, o story mostra 3 segmentos e "1 / 3";
  - com 2, 2 segmentos e "1 / 2";
  - com 1 (Magalu hoje), sem segmentos, sem setas e sem contador;
  - com 0 (SHEIN hoje), sem story e sem lista. No lugar fica "Ainda não há artigo da SHEIN por
    aqui. As campanhas vigentes ficam na página da loja.";
  - com mais de 3, a lista termina com "Ver os {total} artigos da {loja}" →
    `/reviews/loja/{slug}`.
- **Copiar:** `CopyCodeButton` de `CouponActions.tsx`, que já trata o fallback do clipboard e o
  evento de cópia. O tipo `CopyPlacement` ganha `home_store_banner`. O rótulo segue
  `couponCopyLocale.ts` ("Copiar"/"Copiado").
- **Movimento:** o Bruno pediu em 08/10 para manter o que der de animação e efeito, e avaliar depois
  o que mais entra na D2 antes da versão final.
  - troca de aba com a entrada curta do canvas (0,4 s), o brilho amarelo ao copiar e o hover das
    bolinhas, do cartão de foto e das redes;
  - do hero de hoje, no painel da Cecília: o zoom lento da foto e os ícones flutuando ao fundo;
  - tudo com as keyframes que já estão em `globals.css`, desligado com `prefers-reduced-motion`.

### Todos os artigos de uma loja

Não existe `/guias`: a página Guias & Análises é `/reviews`. O Bruno escolheu uma subpágina por
loja dentro dela, `/reviews/loja/damie` (Decisão C). A página `/reviews` ainda vai ser revista,
então a subpágina usa o card de hoje e muda junto com ela.

- **Rota:** `src/app/(pt)/reviews/loja/[brand]/page.tsx`. O segmento `loja` é fixo e não colide com
  `/reviews/[slug]`, que tem um segmento só. `/reviews/loja` sozinho cai em `/reviews/[slug]` e dá
  404, como qualquer slug que não existe; o teste barra review com o slug `loja`.
- **Quais lojas:** `generateStaticParams` com as lojas ativas que têm mais de 3 artigos listados
  em português, a mesma regra do "Ver os N artigos" da vitrine (decisão I), e
  `dynamicParams = false` (outra loja dá 404). Com até 3, a vitrine já mostra todos e nada linkaria
  a subpágina. Em 08/10: DAMIE, Dolce Gusto, I Wanna Sleep, Nestlé Nutre e YesStyle. Insider,
  Let's Eat It, Magalu e SHEIN entram quando passarem de 3; a Kopenhagen, pausada, fica de fora.
- **Artigos:** a mesma regra da vitrine (`affiliate` = `slug` da loja, listados em português, do
  mais novo para o mais antigo), numa função de `homeStores.ts` que a vitrine e a subpágina usam.
  Tudo no servidor; nenhum componente cliente novo.
- **Tela:** o título "Artigos da DAMIE" (`h1`), o total, o link "Ver o código da DAMIE" para
  a página da loja (`storePageUrl`, `/cupons/{slug}`; o código continua lá e na vitrine), os cards e "Ver todos os guias
  e análises" para `/reviews`. O card de hoje sai de `ReviewsClientPage.js` para um componente
  próprio, `ReviewHubCard.tsx`, usado pelas duas páginas.
- **Busca:** título "DAMIE: guias e análises - Em Casa com Cecília", descrição com a loja e o
  total, canonical `/reviews/loja/damie`, Open Graph e entrada no sitemap. Só em português, sem
  hreflang.
- **Diferença para a página da loja:** a página da loja responde "qual é o código e como usar"; a
  subpágina lista tudo o que a Cecília escreveu sobre a loja.

### Acessibilidade

- As bolinhas controlam o painel logo abaixo, então seguem o padrão de abas: `role="tablist"`,
  `role="tab"` com `aria-selected` e `aria-controls`, `role="tabpanel"`, setas, Home e End.
  O canvas usou `aria-current`, mas o padrão de abas é o mais preciso para o código real.
- Alvos de toque de 44 px no mínimo e fonte de 12 px no mínimo.
- Foco visível: `FOCUS_RING` de `CouponBlocks.tsx`, amarelo nas áreas escuras (o painel da Cecília
  é marinho).
- O texto dos botões do story ("Artigo anterior", "Próximo artigo") fica em `aria-label`.

### HTML do servidor e imagens

O `page.js` renderiza os painéis de todas as abas no HTML, e os que não estão selecionados vão com
`hidden`. Assim:

- sem JavaScript a página ainda mostra a DAMIE;
- o `test:build-output` passa a conferir os painéis na home (ver Testes). Hoje a faixa da home "só
  existe no navegador e fica de fora", segundo o CLAUDE.md.

Imagens:

- logos das bolinhas com `next/image` em tamanho fixo (80 px no desktop, 68 px no celular);
- a imagem do story da aba aberta com `priority` no desktop; as outras ficam em lazy;
- as imagens dos painéis escondidos, inclusive a foto da Cecília, não carregam antes de a aba abrir;
- logo que falta cai no `brandIcon` e, sem os dois, a bolinha mostra o nome da loja.

## Seção 3: Acabou de sair

- **Dados:** as 5 reviews listadas em português mais recentes (`sortReviewsByPublishedAt`), com a
  loja de cada uma pelo `affiliate`. Hoje são as 2 poltronas da DAMIE (07/10) e os 3 artigos da
  Insider (05/10). A assinatura Dolce Gusto, também de 05/10, fica em 6º pelo desempate por `id`,
  o mesmo do resto do site.
- **Desktop:** os 5 cards do G: borda marinho, imagem de 140 px, data e tipo, título, faixa com a
  loja, ímãs e leve inclinação. Os ímãs e a inclinação são decoração (`aria-hidden`). Link "Ver
  todos os guias e análises" → `/reviews` (o nome da página de destino).
- **Celular:** a lista do G2: data à esquerda e título, uma linha por artigo, com "Ver todos".
- **Sem código** nos cards e na lista.

## Seção 4: Datas comerciais

Pedido do Bruno em 07/10. A seção serve para qualquer data, não só para a Black Friday:

- Black Friday e Cyber Monday;
- Natal;
- Prime Day;
- as datas duplas (11/11, 12/12…);
- as datas comemorativas (Dia das Mães, Dia dos Pais, Dia dos Namorados, Dia das Crianças, Dia do
  Consumidor…).

Ela fica na home, entre "Acabou de sair" e "Receitas", e só aparece durante uma campanha.

Referência: a Virou Tendência tem um item "Black Friday 2026" no menu, que abre uma página por loja
com endereço fixo e sem o ano (por exemplo `/black-friday-damie/`, cerca de 2.200 palavras,
publicada em 30/09). Aqui o menu não muda: a página de cada data existe, mas fica fora do menu.

### Configuração

Arquivo novo `content/home-events.json`, no mesmo molde do `home-curation.json` de hoje. Cada data
é uma entrada; a mesma data volta todo ano com um `id` novo e as datas novas.

```json
{
  "events": [
    {
      "id": "black-friday-2026",
      "hub": "black-friday",
      "title": "Black Friday",
      "theme": "noite",
      "dayAt": "2026-11-27T00:00:00-03:00",
      "startsAt": "2026-11-01T00:00:00-03:00",
      "endsAt": "2026-12-01T00:00:00-03:00",
      "description": "O que vale acompanhar nas lojas parceiras.",
      "articleSlugs": ["black-friday-damie", "black-friday-dolce-gusto"]
    },
    {
      "id": "natal-2026",
      "hub": "natal",
      "title": "Natal",
      "theme": "laranja",
      "dayAt": "2026-12-25T00:00:00-03:00",
      "startsAt": "2026-12-01T00:00:00-03:00",
      "endsAt": "2026-12-26T00:00:00-03:00",
      "description": "Presentes e a mesa da ceia com as lojas parceiras.",
      "articleSlugs": ["presentes-de-natal-cecilia"]
    }
  ]
}
```

- **`startsAt` e `endsAt`:** a janela em que a seção aparece. Antes do dia, é o "esquenta".
- **`dayAt`:** o dia da data. Com ele a seção mostra "faltam 12 dias", "é hoje" ou "últimos dias"
  (depois do dia, até o fim da janela).
- **`hub`:** a página fixa da data (`/black-friday`, `/natal`, `/dia-das-maes`, `/11-11`…), que
  junta todos os artigos dela. Pode faltar.
- **`theme`:** uma das três combinações da paleta do Encarte:
  - `noite`: marinho com amarelo;
  - `laranja`: laranja com marinho;
  - `amarelo`: amarelo com marinho.

  Nunca branco sobre laranja.
- **`articleSlugs`:** os artigos da data, na ordem em que aparecem. A home mostra os 4 primeiros; a
  página da data mostra todos.
- **Validação** (`test:home-events`, no molde do `test:home-curation`):
  - datas ISO com fuso;
  - `startsAt < endsAt` e `dayAt` dentro da janela;
  - nenhum par de eventos com janelas sobrepostas;
  - todo slug existe e está listado em português;
  - pelo menos 1 artigo;
  - `theme` dentro das três;
  - `hub` com página criada (a partir da Fase 4c). Data nova com `hub` pede a pasta da rota dela,
    um arquivo de poucas linhas: no exemplo acima, `/natal` precisa da sua antes de dezembro.
- O `page.js` escolhe o evento ativo na hora (`revalidate = 300`, então ele entra e sai em até
  5 minutos). Sem evento ativo, a seção não renderiza nada.

### Tela da home

- **Faixa:** o nome da data ("Black Friday", "Natal", "11.11"), o dia, a contagem ("faltam 12
  dias") e a descrição.
- **Cards:** até 4 artigos destacados, no estilo do "Acabou de sair" (imagem, tipo, título, faixa com
  a loja), sem código.
- **Link para o código:** cada card de artigo com loja traz "Ver o código da {loja}", que leva a
  `#loja-{slug}`: a página sobe até a vitrine com a loja aberta. O código continua num lugar só.
  O link não pode ser um `next/link` (nem o `TrackedHomeLink`): ele navega por `pushState`, que
  não dispara `hashchange`, e a página rola sem trocar a aba (revisão final da Fase 2, 08/10). Usar
  um `<a>` comum com o `trackEvent` no `onClick`, ou uma função de `homeStoreTabs.ts` que troca a
  aba, e conferir no navegador o clique na própria home e a ida de `/black-friday` a `/#loja-x`.
- **Página da data:** "Ver tudo da {data}" leva ao `hub`, quando houver.
- **Celular:** os cards rolam na horizontal.

### Página da data

Uma rota fixa por data, no mesmo padrão das rotas fixas da YesStyle por idioma:
`src/app/(pt)/black-friday/page.tsx` renderiza um componente comum (`EventHubPage`) com o `hub`
dela. Uma rota dinâmica na raiz (`(pt)/[evento]`) não serve, porque bate com a `[locale]` que já
existe ali.

A página tem:

- o título e a descrição da edição mais recente da data;
- todos os artigos dela;
- os links "Ver o código da {loja}".

Fora da campanha ela continua no ar com a última edição: o endereço vale de um ano para o outro, como
o da concorrente. Ela não entra no menu (o "oculto" do pedido) e está no sitemap, para o Google
achar. Um campo `noindex` na configuração a esconde também da busca, se um dia for preciso. Um item
no menu, como o da concorrente, mudaria o header de todas as páginas: fica como decisão à parte, e
pode ler o mesmo `home-events.json`.

### Conteúdo

Os artigos das datas são reviews comuns, feitos pelo gerador de artigos, com `type` próprio (por
exemplo "Guia de Black Friday"). Para valer de um ano para o outro, o endereço não leva o ano
(`/reviews/black-friday-damie`) e o texto é atualizado a cada campanha.

Próximas datas para a pauta, a confirmar pelo Bruno:

- 11/11;
- Black Friday em 27/11/2026, com Cyber Monday em 30/11;
- 12/12 e Natal;
- em 2027: Dia do Consumidor (15/03), Dia das Mães (09/05), Dia dos Namorados (12/06), Prime Day
  (a Amazon anuncia a data), Dia dos Pais (08/08) e as datas duplas.

**Prazo:** a seção vai ao ar com a D2 inteira. Para a Black Friday, a D2 e os artigos da data
precisam estar no ar no começo de novembro.

## Seções de baixo

Ficam como na D: mudam o visual (paleta e tipografia do Encarte: `marinho`, `amarelo-cupom`,
`laranja`, `creme`, `font-condensada`, `font-codigo`) e mantêm os dados de hoje.

- **Receitas:** a faixa amarela da D, com o total real de receitas (hoje 191, contado dos dados, não
  escrito no texto), 4 receitas e "Ver todas as receitas". As 4 são as de hoje: as mais vistas pelo
  GA (`getPopularRecipeSlugs`) e, sem dado do GA, as marcadas com `isPopular`. No celular as 4 ficam
  em grade de 2 por 2.
- **Explore a casa:** os 3 cards de `MyLinks`:
  - DAMIE;
  - Dicas & Ofertas;
  - E-book Air Fryer, que continua "Em preparação" como hoje. A D mantém o card; na G2 ele tinha
    saído.
- **Ofertas do dia:** `getFeaturedOffers` (feed do dicas, com o fallback de hoje) e o evento
  `click_offer`. O link "Acessar Dicas & Ofertas" aparece no celular e no desktop; o canvas do
  desktop não tinha esse link.
- **Últimos vídeos:** `getYoutubeHighlights` (com o fallback de hoje) e "Ver canal".
- **Faixa "Sobre a Cecília":** foto, uma frase, o link `/sobre` e o grupo de WhatsApp ("Entre no
  grupo de promoções", `brandLinks.whatsappGroup`), antes do footer. Componente novo e pequeno, do
  servidor. É diferente do painel da Cecília na vitrine: a faixa aparece sempre; o painel só quando
  a aba é escolhida. Os números das redes ficam no painel e na página `/sobre`.

## Analytics

| Ação | Evento | `placement` |
|---|---|---|
| escolher uma aba | `home_store_select` (com `store`; `cecilia` na aba dela) | `home_store_tabs` |
| copiar o código | evento de cópia do `CopyCodeButton` | `home_store_banner` |
| "Ir para a {loja}" | `coupon_store_click`, pelo `CouponStoreLink` (decisão G) | `home_store_banner` |
| "Ver a página da loja" | `coupon_page_click`, pelo `TrackedCouponPageLink` (decisão H) | `home_store_page` |
| artigo da aba (story ou lista) e "Ver os {total} artigos" | `home_route_click` | `home_store_articles` |
| links do painel da Cecília ("Mais sobre mim", redes) | `home_route_click` | `home_cecilia` |
| card do "Acabou de sair" e "Ver todos" | `home_route_click` | `home_latest` |
| card da data, "Ver o código da {loja}" e "Ver tudo da {data}" | `home_route_click` | `home_event` |
| "Sobre mim" e WhatsApp na faixa de baixo | `home_route_click` | `home_about` |
| oferta | `click_offer` (como hoje) | — |

`HomeRoutePlacement` (em `TrackedHomeLink.tsx`) ganha os novos valores, e o
`test:home-route-tracking` passa a exigi-los, junto com os parâmetros de `home_store_select`. Os
placements das seções que saem (`home_featured_guides`, `home_review_categories`,
`home_reviews_carousel`, `home_editor_pick`) saem do tipo e do teste na Fase 6.

## Testes

- **`validate:content`** (Fase 0): a trava do `affiliate`.
- **`test:home-stores`** (novo, Fase 1). Confere:
  - a aba da Cecília primeiro, sem artigos e sem código, depois as lojas ativas na ordem;
  - os rótulos de recompensa (YesStyle) e de indicação (SHEIN);
  - desconto e descrição de cada aba iguais aos de `couponsData.ts` (a regra do texto da
    Insider fica no `test:coupon-offer-modes`);
  - Nutre com a exclusão no detalhe;
  - SHEIN sem artigo;
  - no máximo 3 artigos por loja, sem campo de código, e o `total` e o `allArticlesPath` certos;
  - a página da loja de toda aba é `/cupons/{slug}`, a da DAMIE inclusive;
  - os 5 do "Acabou de sair".
- **`test:home-stores`** (Fase 2b, ampliado): as lojas da subpágina são as ativas com mais de 3
  artigos, as mesmas do "Ver os N artigos" da vitrine; o sitemap traz essas e nenhuma outra
  `/reviews/loja/`; nenhuma review tem o slug `loja`.
- **`test:home-events`** (novo, Fase 4a): a validação de `home-events.json` e a escolha do evento
  ativo, que recebe a data por parâmetro. Na Fase 4c, ele também confere que todo `hub` tem a
  rota criada e entra no sitemap.
- **`test:build-output`** (Fase 6), em cada `/reviews/loja/{slug}`: o `h1`, o canonical e o total
  de cards igual ao de artigos da loja. No HTML da home:
  - o painel da Cecília e um painel por loja ativa, com o rótulo de `getCodeTitle`;
  - no painel da YesStyle, "Código de recompensa" e nenhum "Cupom YesStyle";
  - no da SHEIN, "Código de indicação";
  - no da Nutre, a exclusão das fórmulas infantis;
  - o painel da DAMIE e a subpágina da DAMIE linkam `/cupons/damie`.

  A conferência que já existe para toda página que cita o CECILIA010 passa a cobrir a home sozinha.
- **`test:client-bundle`**: nem o componente da vitrine nem o card extraído de `/reviews` podem
  levar o índice de conteúdo.

## Fases

No máximo 5 arquivos por fase, com verificação e aprovação do Bruno entre elas. Os arquivos gerados
pelo `build-index` (`src/lib/generated/content-index.ts` e `public/search-index.json`) acompanham os
commits de conteúdo, como nos commits anteriores, e não entram na conta.

| Fase | O que faz | Arquivos |
|---|---|---|
| 0a | Loja Nestlé Nutre com o slug `nestle-nutre` e o redirect | `src/lib/couponsData.ts`, `next.config.mjs`, `scripts/media/test-review-delivery-html.mjs` |
| 0b | Artigos da Nutre, parte 1: `affiliate` e link da página da loja | 5 JSONs da Nutre |
| 0c | Artigos da Nutre, parte 2 | os outros 4 JSONs da Nutre |
| 0d | Marcação da DAMIE e trava do `affiliate` | 3 JSONs da DAMIE, `scripts/validate-content-model.ts` |
| 0e | Documentação do slug | `AGENTS.md`, `docs/CONTRATO-ARTIGO-AFILIADO.md`, `docs/MANUTENCAO-MENSAL.md`, `CONTRATOS-DE-CONTEUDO.md` e `Nestle-Nutre.md` do vault |
| 0f | Restos que a revisão achou | `docs/CUPONS-DATAS-RASTREAMENTO.md` e as notas de 4 artigos da Nutre no vault |
| 1 | Montagem dos dados da vitrine, dos artigos por loja e do "Acabou de sair" | `src/lib/homeStores.ts` (servidor), `src/lib/homeStoreTabs.ts` (tipos e regras do hash, que o navegador também usa), `scripts/test-home-stores.ts`, `package.json`, `src/lib/couponsData.ts` (`storePageUrl` da DAMIE) |
| 2a | Vitrine na home | `HomeStoreStories.tsx`, `HomeCeciliaPanel.tsx`, `CouponActions.tsx`, `TrackedHomeLink.tsx`, `page.js` |
| 2b | Subpágina de cada loja | `src/app/(pt)/reviews/loja/[brand]/page.tsx`, `ReviewHubCard.tsx`, `ReviewsClientPage.js`, `src/app/sitemap.ts`, `scripts/test-home-stores.ts` |
| 3 | Acabou de sair, faixa Sobre a Cecília e o teste dos placements da vitrine | `HomeLatest.tsx`, `HomeAboutStrip.tsx`, `TrackedHomeLink.tsx`, `test-home-route-tracking.ts`, `page.js` |
| 4a | Datas comerciais: configuração e regra do evento ativo | `content/home-events.json`, `src/lib/homeEvents.ts`, `scripts/test-home-events.ts`, `package.json` |
| 4b | Datas comerciais na home | `HomeEvent.tsx`, `TrackedHomeLink.tsx`, `test-home-route-tracking.ts`, `page.js` |
| 4c | Página da data | `EventHubPage.tsx`, `src/app/(pt)/black-friday/page.tsx` (a primeira data), `src/app/sitemap.ts`, `scripts/test-home-events.ts` |
| 5 | Visual das seções de baixo | `PopularRecipes.tsx`, `MyLinks.tsx`, `Offers.tsx`, `CTA.tsx`, `VideoCarousel.tsx` |
| 6a | Tira da home o que saiu | `page.js` e a remoção de `Hero.tsx`, `CouponStrip.tsx`, `FeaturedReviewGuides.tsx`, `ReviewsShowcase.tsx`, e de `getCouponStripItems`/`CouponStripItem` em `couponsData.ts` (cada remoção só depois do grep) |
| 6b | Restos e placements antigos | `HomeEditorialPick.tsx`, `homeCuration.ts`, `home-curation.json`, `test-home-curation.ts` e o script do `package.json` (Decisão D); `selectHomeReviewDiscovery` e o teste dele, se o grep provar que só a home usava; `TrackedHomeLink.tsx` e `test-home-route-tracking.ts`. Mais de 5 arquivos: divide em 6b-1 e 6b-2 |
| 6c | Travas e documentação | `test-build-output.ts`, `CLAUDE.md` |

As Fases 0a a 0c são uma mudança só, dividida pelo limite de arquivos: entre elas, 7 artigos ainda
apontam para o slug antigo, e a árvore só fica coerente no fim da 0c. Nada vai ao ar no meio.

Cada fase roda `npm run typecheck`, `npm run lint` e os testes que tocam o que mudou. A Fase 0 roda
também `validate:content`, `test:review-i18n` e `test:internal-links`; as Fases 2a e 2b,
`npm run test:client-bundle`. A Fase 6c roda `npm run build` completo, `test:build-output`,
`test:html-lang` e `test:client-bundle`. A verificação visual compara com o canvas no preview (390,
768 e 1280 px) e testa teclado e movimento reduzido.

Deploy só com decisão do Bruno. A Fase 0 foi ao ar sozinha em 07/10, às 22h10 (PR #37, `58d175d`;
Decisão E). O resto da D2 vai junto, depois da Fase 6c. O `validate:yesstyle` barra o build com
oferta da YesStyle vencida, pela data em UTC: antes do deploy final, a oferta vigente precisa estar
em dia.

## Decisões tomadas em 07/10

1. Loja aberta ao entrar: DAMIE.
2. "Ver os N artigos da loja" fica, com destino na subpágina da loja.
3. Artigos sobre uma loja levam o `affiliate` dela (Fase 0).
4. A aba da Cecília é o hero dela, para apresentá-la, sem artigos.
5. O grupo de WhatsApp vai para a faixa "Sobre a Cecília".
6. Receitas: a faixa amarela da D com 4 receitas.
7. As datas comerciais vão ao ar junto com a D2 inteira.
8. Página de cada data com endereço fixo, fora do menu e no sitemap.

Respondidas depois da revisão do código:

- **A.** A loja passa a `nestle-nutre`: `/cupons/nutren` vira `/cupons/nestle-nutre`, com redirect
  permanente. As imagens ficam onde estão.
- **B.** "O que aconteceu com a Sofá na Caixa?" é marcado como DAMIE.
- **C.** Todos os artigos de uma loja ficam em `/reviews/loja/{slug}`. A página `/reviews` ainda
  vai ser revista.
- **D.** A curadoria "Escolha da Cecília" sai na Fase 6b, com o `HomeEditorialPick` e o teste.
- **E.** A Fase 0 vai ao ar sozinha. Foi em 07/10 (PR #37). A oferta da YesStyle não precisava mudar
  antes: o build só para a partir de 08/10 às 21h.
- **F.** (08/10, depois da Fase 1) A vitrine leva a `/cupons/damie`, como as outras lojas. O menu
  já linka o subdomínio da DAMIE, e o `/cupons/damie` tem tráfego e é usado pelo Google nas
  respostas de IA. Os links `/cupons/damie` dos artigos `damie-reclame-aqui-o-que-os-dados-mostram`
  e `sofa-damie-modular-vale-a-pena` também ficam, e artigos novos podem linkar `/cupons/damie`.
  Isso substitui a regra do dossiê `01_Parceiros/DAMIE.md` de 07/10; `AGENTS.md`, o contrato de
  artigo de afiliado e a manutenção mensal foram atualizados no mesmo dia.
- **G.** (08/10, na Fase 2a) O "Ir para a {loja}" da vitrine dispara `coupon_store_click`, como os
  artigos e as páginas `/cupons`, para os cliques nas lojas vindos da home caírem no mesmo relatório.
  O link sai pelo `CouponStoreLink`, o renderizador que o site já usa, e `home_store_banner` deixa
  de ser um `HomeRoutePlacement`; a cópia do código segue com o mesmo `placement`.
- **H.** (08/10, revisão final da Fase 2) O "Ver a página da loja" da vitrine dispara
  `coupon_page_click`, pelo `TrackedCouponPageLink`, como o AGENTS.md manda para link interno de
  cupom e como a subpágina já fazia: todo clique para `/cupons` cai no mesmo relatório.
  `home_store_page` sai de `HomeRoutePlacement` e entra em `CouponPageLinkPlacement`.
- **I.** (08/10, revisão final da Fase 2) Loja só tem subpágina e entrada no sitemap quando passa
  de 3 artigos, a regra do "Ver os N artigos". Com até 3, nada no site linkaria a subpágina
  (Insider e Let's Eat It com 3, Magalu com um card só).
