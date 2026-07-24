# Plano YesStyle — i18n, cupons dinâmicos e hubs indexáveis

Status: aprovado para execução por etapas  
Base de referência: `e260866`  
Implementação: Gemini 3.6  
Revisão e aceite: Codex  

## 1. Objetivo

Consolidar a arquitetura multilíngue da YesStyle, centralizar os fatos dos
cupons e, somente depois, transformar os nove hubs de cupons em páginas
transacionais canônicas e indexáveis.

O trabalho será dividido em três projetos independentes:

- **Projeto A — Fundação e consolidação:** uma fonte de verdade para locales,
  rotas, dados factuais e traduções.
- **Projeto B — Hubs transacionais indexáveis:** canonical próprio, hreflang
  hub com hub, sitemap e conteúdo transacional diferenciado.
- **Projeto C — Idioma no HTML do servidor:** spike arquitetural para corrigir
  o `lang` da raiz sem misturar essa mudança com o ganho SEO dos hubs.

Essa separação preserva as URLs atuais dos artigos e permite capturar o valor
SEO transacional sem tornar uma eventual migração de rotas um pré-requisito.

## 2. Estado atual confirmado

- Existem três intenções de busca distintas:
  - hub transacional de cupons;
  - artigo sobre o uso do `CECILIA010`;
  - guia para encontrar e combinar cupons válidos.
- Os dois clusters editoriais possuem nove idiomas cada.
- As 16 traduções internacionais usam `hideFromPortugueseListings`: ficam fora
  da home e de `/reviews`, mas continuam publicadas, no sitemap e nos
  respectivos clusters de hreflang.
- Os hubs internacionais já existem em `/{locale}/coupons/yesstyle`.
- Hoje esses hubs são auxiliares: seus canonicals apontam para artigos, não
  para eles próprios.
- O seletor de idiomas dos hubs aponta para artigos, misturando intenções.
- O `RootLayout` gera `<html lang="pt-BR">`.
- `DocumentLangSetter` e o script atual de ajuste de idioma são renderizados
  apenas no `ReviewNotebookTemplate`. Portanto, os hubs permanecem com
  `pt-BR` tanto no HTML bruto quanto no DOM.
- Os rótulos de detalhes dos hubs ainda contêm texto em inglês hardcoded, como
  `Code`, `Discount`, `Field` e `Up to 5% extra...`.

## 3. Decisões congeladas

1. A chave interna do português será **`pt`**.
2. O registro central será a única ponte entre:
   - `locale: 'pt'`;
   - `htmlLang: 'pt-BR'`;
   - `hreflang: 'pt-BR'`;
   - `openGraphLocale: 'pt_BR'`.
3. Os JSONs usarão a mesma chave interna do registro: `pt`, `en`, `es`, `fr`,
   `de`, `ko`, `ja`, `zh-hant` e `zh-hans`.
4. O Projeto A não mudará URLs, canonicals, hreflang, sitemap nem indexação.
5. O Projeto B só começa depois que a lista dinâmica de cupons estiver pronta
   e diferenciar claramente o hub da página educativa.
6. Os hubs trocarão idiomas com outros hubs. Artigos continuarão trocando
   idiomas apenas com seus equivalentes editoriais.
7. O Projeto C não bloqueia o Projeto B e só será decidido após um spike.
8. Cada projeto terá branch, revisão e deploy próprios.

## 4. Projeto A — Fundação e consolidação

### Resultado esperado

Uma arquitetura centralizada e validável, sem mudança observável de SEO ou de
rotas. Ao final, um cupom será atualizado em um único arquivo factual e os
componentes receberão o conteúdo localizado por meio de registros e
dicionários explícitos.

### A0 — Isolamento e baseline

- Criar branch dedicada a partir de `e260866`.
- Confirmar árvore limpa antes de iniciar.
- Evitar sessões paralelas alterando os mesmos arquivos.
- Registrar no mesmo commit-base:
  - total de páginas geradas;
  - URLs YesStyle presentes no sitemap;
  - canonical e hreflang dos 18 artigos;
  - canonical e hreflang dos nove hubs;
  - destinos atuais dos seletores de idioma;
  - HTML bruto das páginas representativas em PT, EN, JA e ZH-Hant.

O total de páginas é um dado relativo. O aceite compara o build anterior e o
posterior usando o mesmo commit-base; não deve depender do número histórico de
262 páginas.

### A1 — Registro central de locales e rotas

Criar um registro tipado, único e independente dos componentes. Cada locale
deve fornecer, no mínimo:

```ts
{
  locale: 'pt',
  htmlLang: 'pt-BR',
  hreflang: 'pt-BR',
  openGraphLocale: 'pt_BR',
  hubPath: '/cupons/yesstyle',
  rewardArticlePath: '/reviews/codigo-cecilia010-yesstyle-como-usar',
  guidePath: '/reviews/como-encontrar-cupons-yesstyle-validos'
}
```

O registro deve cobrir os nove locales e expor helpers que falhem de forma
explícita quando receberem locale, slug ou cluster desconhecido.

### A2 — Locale explícito nos 18 artigos

- Adicionar `locale` aos nove JSONs do artigo do `CECILIA010`.
- Adicionar `locale` aos nove JSONs do guia de cupons.
- Atualizar tipos, schema e validação de conteúdo.
- Proibir fallback silencioso para português em conteúdo YesStyle.
- Validar que cada cluster tenha exatamente uma página por locale.

### A3 — Remover mapas duplicados

Substituir arrays e mapas locais pelo registro central, preservando o
comportamento atual, especialmente em:

- `src/app/reviews/[slug]/page.js`;
- `src/components/review/ReviewNotebookTemplate.tsx`;
- `src/components/review/couponCopyLocale.ts`;
- `src/components/YesStyleCouponPage.tsx`;
- mapas de Open Graph, hreflang e seletores de idioma.

Não criar um segundo mapa para converter `pt` em `pt-BR`. Essa conversão
pertence exclusivamente ao registro central.

### A4 — Fonte factual única para cupons

Criar uma estrutura central, por exemplo `src/lib/yesstyleCoupons.ts`, com
campos explícitos:

```ts
type YesStyleCoupon = {
  code: string;
  type: 'coupon' | 'reward';
  newCustomerDiscount?: number;
  returningCustomerDiscount?: number;
  discountLabelKey: string;
  startsAt?: string;
  expiresAt?: string;
  verifiedAt: string;
  regions: string[];
  sourceUrl: string;
  status: 'active' | 'scheduled' | 'expired';
};
```

Regras:

- valores, datas, regiões, fonte e status vivem apenas na fonte factual;
- dicionários traduzem frases, não replicam fatos;
- descontos entram nos textos por placeholders;
- nenhum cupom promocional é publicado sem fonte oficial verificável;
- o `CECILIA010` é identificado como Rewards/Influencer Code, não como cupom
  promocional;
- o link de influenciadora oficial permanece `https://ystyle.co/rQYQv`;
- cumulatividade nunca é prometida de forma absoluta: depende da elegibilidade
  e deve ser confirmada no checkout.

### A5 — Refatorar o hub sem alterar sua função SEO

Fazer `YesStyleCouponPage` consumir:

- registro central de locales e rotas;
- fonte factual de cupons;
- dicionários localizados;
- formatação de data adequada a cada idioma.

Corrigir no mesmo trabalho os textos hardcoded do bloco de detalhes:

- `Code`;
- `Discount`;
- `Field`;
- `Up to 5% extra...`;
- mensagens de copiar, validade, verificação e ausência de cupom.

Durante o Projeto A, preservar:

- canonical atual dos hubs;
- hreflang atual;
- sitemap atual;
- destino atual do seletor;
- indexação atual.

Essa preservação deliberada permite revisar separadamente a refatoração
estrutural e a mudança de estratégia SEO.

### A6 — Validação que falha de forma explícita

Estender os validadores existentes, sem introduzir um novo framework de testes,
para detectar:

- locale ausente ou inválido;
- locale duplicado dentro do mesmo cluster;
- cluster sem os nove idiomas;
- slug/rota incompatível com o registro;
- cupom ativo depois de `expiresAt`;
- cupom ativo sem `sourceUrl`;
- `verifiedAt` ausente ou inválido;
- percentual hardcoded nos campos transacionais localizados que deveriam usar
  placeholders;
- tradução internacional aparecendo nas listagens em português;
- rota duplicada no registro.

A checagem de percentuais deve atuar apenas sobre os dicionários e templates
transacionais designados. Não deve fazer uma busca global por `%` em todo o
conteúdo editorial.

### A7 — Gates de aceite

Todos os itens abaixo são obrigatórios:

- `npm run validate:content`;
- verificação de tipos usada pelo projeto;
- `npm run lint`;
- `npm run build`;
- mesma contagem de páginas antes/depois no mesmo commit-base;
- mesmas URLs no sitemap;
- nenhuma alteração de canonical, hreflang ou indexação;
- paridade visual dos hubs e artigos representativos;
- interface e rótulos corretos nos nove idiomas;
- atualização de um cupom demonstrada por mudança em um único arquivo factual;
- snapshot ou relatório comparativo de metadata antes/depois;
- ausência de fallback silencioso para português.

### Fora do escopo do Projeto A

- tornar hubs canônicos ou indexáveis;
- mudar o seletor dos hubs para hub com hub;
- incluir hubs no sitemap;
- migrar URLs de artigos;
- criar redirects;
- alterar layouts raiz;
- corrigir `<html lang>` no servidor;
- adicionar `<main lang>` como compensação;
- mudar schema SEO dos hubs.

### Gate A → B

O Projeto B só pode começar quando:

- a lista dinâmica estiver em produção e for alimentada pela fonte factual;
- existir fluxo definido de verificação por fonte oficial;
- o hub tiver conteúdo transacional substancialmente diferente dos artigos;
- existir estado claro para “nenhum cupom promocional verificado agora”;
- fonte, região, validade e última verificação estiverem visíveis;
- os textos dos nove idiomas tiverem revisão editorial;
- todos os gates do Projeto A tiverem passado.

## 5. Projeto B — Hubs transacionais canônicos e indexáveis

### Resultado esperado

Nove páginas transacionais independentes, cada uma apta a disputar buscas como
“YesStyle coupon code”, sem canibalizar os artigos educativos.

### B1 — Canonical e indexação

- Aplicar canonical próprio aos nove hubs existentes.
- Remover qualquer sinal que os trate como duplicatas auxiliares dos artigos.
- Preservar as URLs atuais; não migrar os artigos.

### B2 — Hreflang exclusivo do cluster de hubs

- Hub aponta apenas para hubs equivalentes.
- Usar os nove idiomas do registro central.
- Usar `x-default` para a versão inglesa `/en/coupons/yesstyle`.
- Garantir reciprocidade completa.

### B3 — Seletor hub com hub

O seletor dos hubs deve alternar entre os nove hubs. O comportamento atual, que
leva o usuário do hub a artigos traduzidos, precisa ser removido como parte do
critério de aceite do Projeto B.

### B4 — Sitemap

- Incluir os nove hubs canônicos.
- Não remover os 18 artigos.
- Validar ausência de duplicidade e URLs não canônicas.

### B5 — Conteúdo transacional diferenciado

Cada hub deve exibir no próprio idioma:

- cupons promocionais ativos e oficialmente verificados;
- estado vazio honesto quando não houver cupom promocional;
- `CECILIA010` em bloco separado como Rewards/Influencer Code;
- desconto de 5% para novos clientes e 2% para recorrentes, conforme regras
  vigentes;
- código, tipo, região, validade, fonte e última verificação;
- botão de copiar;
- CTA pelo link oficial da Cecília;
- instrução sobre os campos `Coupon Code` e `Rewards/Influencer Code`;
- ressalva de elegibilidade e conferência no checkout;
- links internos para o artigo do código e o guia de cupons equivalentes no
  mesmo idioma;
- transparência editorial curta.

### B6 — Schema

Usar somente tipos compatíveis com a função do hub:

- `WebPage` ou `CollectionPage`;
- `BreadcrumbList`;
- `FAQPage`, apenas quando o FAQ estiver visível.

Não gerar `Product`, `Review`, nota ou contagem de avaliações.

### B7 — Idioma do subtree

Como mitigação de baixo risco, renderizar o conteúdo do hub dentro de:

```tsx
<main lang={page.htmlLang}>
```

Isso melhora a semântica e a acessibilidade do subtree, mas não corrige o
`lang` da raiz. A limitação de `<html lang="pt-BR">` no HTML bruto deve ser
registrada como conhecida até o Projeto C.

### B8 — Gates de aceite

- canonical próprio nos nove hubs;
- hreflang recíproco hub com hub, incluindo `x-default`;
- seletor navegando apenas entre hubs;
- nove hubs presentes no sitemap;
- cada hub com conteúdo localizado e lista dinâmica;
- nenhum fato promocional duplicado nos dicionários;
- `<main lang>` correto;
- schemas válidos e sem `Product`/`Review`;
- artigos e respectivos clusters sem regressão;
- `validate:content`, tipos, lint e build aprovados;
- inspeção do HTML bruto e navegação real em PT, EN, JA e ZH-Hant.

## 6. Projeto C — `html lang` no servidor e estratégia de rotas

### Princípio

O Google declara que identifica o idioma principalmente pelo conteúdo visível
e recomenda hreflang para versões localizadas; o atributo `lang` não é o
principal sinal de indexação. Ainda assim, o `lang` correto é importante para
acessibilidade, leitores de tela, tradução e comportamento do navegador.

Por isso, a correção arquitetural é desejável, mas não bloqueia o Projeto B.

### C0 — Spike obrigatório

Criar uma branch experimental e testar, no Next.js usado pelo projeto:

- múltiplos root layouts ou route groups;
- preservação de SSG;
- `lang` correto no HTML bruto;
- navegação client-side e recarga completa;
- ausência de conflito entre `/reviews`, `/cupons` e `/{locale}/coupons`;
- comportamento de metadata, sitemap, API e assets;
- impacto sobre os templates existentes.

O spike não deve conter migração de conteúdo nem redirects.

### Decisão após o spike

Escolher entre:

1. manter as URLs atuais e corrigir apenas o layout/idioma; ou
2. migrar artigos internacionais para uma estrutura prefixada por locale.

A opção 2 só será aprovada se o ganho justificar:

- redirects permanentes;
- atualização atômica de canonical, hreflang e sitemap;
- atualização de links internos;
- risco de perda temporária de sinais;
- monitoramento no Google Search Console.

Não há congelamento nem urgência para migrar URLs, pois o valor SEO
transacional dos hubs será capturado pelo Projeto B.

## 7. Sequência de commits sugerida

### Projeto A

1. `docs: add YesStyle i18n ABC implementation plan`
2. `refactor: centralize YesStyle locale and route registry`
3. `refactor: add explicit locale to YesStyle review clusters`
4. `refactor: centralize YesStyle coupon facts and translations`
5. `refactor: migrate YesStyle hubs to shared registries`
6. `test: validate YesStyle locale and coupon integrity`

### Projeto B

1. `feat: make YesStyle coupon hubs canonical`
2. `feat: connect localized YesStyle coupon hubs`
3. `feat: add transactional metadata and schema to YesStyle hubs`

### Projeto C

Somente após o spike e a decisão arquitetural.

## 8. Protocolo de implementação e revisão

1. Gemini implementa uma etapa ou commit por vez.
2. Cada entrega informa arquivos alterados, decisões tomadas e comandos de
   validação executados.
3. Codex revisa o diff, os contratos de dados, as páginas no navegador, o HTML
   bruto, metadata, sitemap e resultados dos gates.
4. Achados são classificados como:
   - **P0:** perda de dados, segurança ou indisponibilidade;
   - **P1:** erro de SEO, locale, rota, dado factual ou comportamento;
   - **P2:** manutenção, consistência ou acabamento.
5. A próxima etapa só começa após o aceite da anterior.
6. Nenhuma sessão paralela deve alterar a mesma branch ou os mesmos arquivos.
7. Push e deploy exigem revisão final da branch e árvore limpa.

## 9. Critério global de conclusão

O programa A/B/C estará concluído quando:

- locales, rotas e fatos promocionais tiverem uma única fonte de verdade;
- os 18 artigos mantiverem seus clusters editoriais corretos;
- os nove hubs forem páginas transacionais canônicas, localizadas e
  interligadas;
- atualizações de cupons não exigirem editar artigos ou nove páginas;
- sitemap, canonical, hreflang e schemas estiverem coerentes;
- o idioma do HTML no servidor tiver uma decisão técnica baseada no spike;
- não houver regressão nas listagens brasileiras, nos artigos existentes ou na
  atribuição pelo link oficial da Cecília.

## 10. Referências técnicas

- [Google — Managing multi-regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Google — Tell Google about localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Next.js — Internationalization](https://nextjs.org/docs/app/guides/internationalization)
- [Next.js — Project structure and route groups](https://nextjs.org/docs/app/getting-started/project-structure)
- [Next.js — generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
