# Plano YesStyle — i18n, cupons dinâmicos e hubs indexáveis

Status: Projeto A concluído e em produção; Projetos B e C pendentes

Baseline de produção após o Projeto A: `4342fab`

Implementação: Gemini 3.6

Revisão e aceite: Codex

## 1. Objetivo

Consolidar a arquitetura multilíngue da YesStyle, centralizar os fatos dos
cupons e, somente depois, transformar os nove hubs de cupons em páginas
transacionais canônicas e indexáveis.

O trabalho será dividido em três projetos independentes:

- **Projeto A — Fundação e consolidação:** uma fonte de verdade para locales,
  rotas, dados factuais e traduções.
- **Projeto B1 — Produto transacional:** uma experiência dinâmica comum aos
  nove hubs, ainda sem ativar a indexação internacional.
- **Projeto B2 — Ativação SEO dos hubs:** canonical próprio, hreflang hub com
  hub, sitemap e schemas.
- **Projeto C — Idioma no HTML do servidor:** spike arquitetural para corrigir
  o `lang` da raiz sem misturar essa mudança com o ganho SEO dos hubs.

Essa separação preserva as URLs atuais dos artigos e permite capturar o valor
SEO transacional sem tornar uma eventual migração de rotas um pré-requisito.

## 2. Estado atual confirmado após o Projeto A

- Existem três intenções de busca distintas:
  - hub transacional de cupons;
  - artigo sobre o uso do `CECILIA010`;
  - guia para encontrar e combinar cupons válidos.
- Os dois clusters editoriais possuem nove idiomas cada.
- As 16 traduções internacionais usam `hideFromPortugueseListings`: ficam fora
  da home e de `/reviews`, mas continuam publicadas, no sitemap e nos
  respectivos clusters de hreflang.
- Os hubs internacionais já existem em `/{locale}/coupons/yesstyle`.
- O hub brasileiro `/cupons/yesstyle` é canônico e está no sitemap.
- Os oito hubs internacionais continuam auxiliares: seus canonicals apontam
  para artigos, não para eles próprios, e eles permanecem fora do sitemap.
- O seletor de idiomas dos hubs aponta para artigos, misturando intenções.
- O `RootLayout` gera `<html lang="pt-BR">`.
- `DocumentLangSetter` e o script atual de ajuste de idioma são renderizados
  apenas no `ReviewNotebookTemplate`. Portanto, os hubs permanecem com
  `pt-BR` tanto no HTML bruto quanto no DOM.
- O Projeto A está em produção com:
  - registro central dos nove locales e das rotas dos três clusters;
  - locale explícito nos 18 artigos;
  - fonte factual única para o Rewards Code;
  - rótulos transacionais localizados;
  - validação de paridade, datas, fontes e mutação factual.
- A página brasileira ainda usa o template genérico de marca. A tabela de
  faixas existente é uma mecânica exclusiva do Magalu e não representa a
  mecânica da YesStyle.
- A fonte factual possui o Rewards Code `CECILIA010`, mas não possui atualmente
  um cupom promocional ativo com comprovação oficial.

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
5. O Projeto B será entregue em duas etapas independentes:
   - B1 cria e publica a experiência transacional dinâmica, sem alterar os
     sinais de indexação;
   - B2 ativa os nove hubs como páginas canônicas somente após aceite explícito
     da B1.
6. Os hubs trocarão idiomas com outros hubs. Artigos continuarão trocando
   idiomas apenas com seus equivalentes editoriais.
7. O Projeto C não bloqueia o Projeto B e só será decidido após um spike.
8. Cada projeto terá branch, revisão e deploy próprios.
9. A interface da YesStyle não reutilizará `tiers` nem a tabela de faixas do
   Magalu. As duas marcas possuem mecânicas promocionais diferentes.
10. `verifiedAt` representa uma verificação factual real do código ou oferta,
    não a data de edição, build ou deploy.

## 4. Projeto A — Fundação e consolidação

**Status:** concluído, revisado e implantado em produção.

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

### Gate A → B1

O gate técnico do Projeto A foi cumprido. Antes de iniciar a implementação da
B1, cada oferta deve ter sua própria data de verificação:

- o cupom promocional `BTSVIP15` foi confirmado em funcionamento pelo usuário
  em 25 de julho de 2026 e deve usar `verifiedAt: '2026-07-25'`;
- o `CECILIA010` só deve manter `verifiedAt: '2026-07-24'` se o Rewards Code
  também tiver sido realmente testado ou verificado nessa data;
- caso contrário, o Rewards Code deve usar sua última verificação factual
  confirmada.

Essa decisão deve ser registrada no primeiro commit da B1. Nenhuma data pode
ser atualizada apenas para aparentar conteúdo recente.

## 5. Projeto B1 — Experiência transacional dinâmica

### Resultado esperado

Os nove endereços existentes devem renderizar a mesma arquitetura
transacional, com fatos compartilhados e interface localizada. A B1 será
publicada para revisão visual e editorial sem mudar canonicals, hreflang,
sitemap, seletor de idiomas ou estratégia de indexação.

O hub precisa ter uma função claramente diferente dos artigos:

- **hub:** consultar ofertas vigentes, copiar códigos e seguir para a loja;
- **artigo do Rewards Code:** entender o `CECILIA010` e onde aplicá-lo;
- **guia de cupons:** aprender a encontrar e combinar descontos elegíveis.

### B1.0 — Baseline e isolamento

- Criar a branch `codex/yesstyle-hubs-b1` a partir da produção aprovada.
- Confirmar árvore limpa e registrar o commit-base.
- Registrar antes da implementação:
  - HTML e captura visual dos nove hubs;
  - canonical, hreflang e destino do seletor de cada hub;
  - URLs YesStyle existentes no sitemap;
  - contagem de páginas do build;
  - conteúdo da fonte factual.
- Resolver e documentar a pendência de `verifiedAt`.
- Não permitir outra sessão alterando a mesma branch ou os mesmos arquivos.

### Estado factual inicial da B1

A primeira renderização da lista dinâmica deve partir do seguinte estado:

#### Rewards/Influencer Code

- código: `CECILIA010`;
- benefício: 5% para novos clientes e 2% para clientes recorrentes, conforme as
  regras vigentes;
- destino comercial: `https://ystyle.co/rQYQv`;
- data de verificação: confirmar separadamente antes da implementação.

#### Cupom promocional

- código: `BTSVIP15`;
- benefício exibido pela YesStyle: 15% OFF em qualquer pedido;
- status: ativo e confirmado em funcionamento em 25 de julho de 2026;
- `verifiedAt: '2026-07-25'`;
- evidência oficial disponível no projeto:
  `public/images/reviews/cupons/yesstyle-banner-cupom-btsvip15.webp`;
- página onde a campanha foi exibida:
  `https://www.yesstyle.com/en/home.html`;
- validade: campanha temporária com contagem regressiva na captura, mas sem
  horário final suficientemente comprovado para preencher `expiresAt`;
- região: não publicar como mundial até existir confirmação oficial;
- cumulatividade: orientar o usuário a testar junto ao Rewards Code e confirmar
  os dois descontos no checkout, sem promessa absoluta.

O implementador não deve deduzir a validade pelo relógio presente na imagem,
nem interpretar o “15” do código como fonte do desconto. O benefício vem do
texto do banner; a situação ativa vem da verificação factual de 25 de julho.
Se a B1 for publicada depois dessa data, o cupom precisa ser verificado
novamente imediatamente antes do deploy.

### B1.1 — Modelo factual por tipo de oferta

Substituir o modelo genérico por uma união discriminada. O contrato pode seguir
esta forma, adaptada aos tipos já implantados no Projeto A:

```ts
type YesStyleOfferBase = {
  id: string;
  code: string;
  status: 'active' | 'scheduled' | 'expired';
  startsAt?: string;
  expiresAt?: string;
  verifiedAt: string;
  regions: string[];
  officialSourceUrl: string;
  eligibility?: string[];
  restrictions?: string[];
};

type YesStyleRewardOffer = YesStyleOfferBase & {
  type: 'reward';
  affiliateUrl: string;
  newCustomerDiscount: number;
  returningCustomerDiscount: number;
};

type YesStylePromoOffer = YesStyleOfferBase & {
  type: 'coupon';
  discount:
    | { kind: 'percentage'; value: number }
    | { kind: 'fixed'; value: number; currency: string }
    | { kind: 'shipping' }
    | { kind: 'text'; label: string };
};
```

Regras:

- `reward` e `coupon` são entidades diferentes;
- cupom promocional não recebe campos artificiais de cliente novo/recorrente;
- fatos não são copiados para os dicionários;
- `officialSourceUrl` comprova a oferta;
- `affiliateUrl` é o destino comercial e não substitui a fonte;
- oferta expirada não pode ser renderizada como ativa;
- nenhum agregador de cupons é aceito como fonte oficial.

### B1.2 — Modelo de página resolvido

Criar um resolvedor compartilhado para PT e os oito hubs internacionais. Ele
deve combinar:

- registro central de locale e rotas;
- ofertas factuais ativas;
- dicionário de interface;
- datas e benefícios formatados no locale;
- links para o artigo do Rewards Code e o guia equivalentes;
- estado vazio localizado.

As rotas podem continuar diferentes, mas devem consumir o mesmo componente e o
mesmo modelo resolvido. Não manter uma implementação brasileira dentro de
`CouponBrandPage` e outra internacional em `YesStyleCouponPage`.

### B1.3 — Interface dos hubs

Não copiar a tabela de faixas do Magalu. A experiência YesStyle deve conter:

1. um card principal e permanente para o Rewards/Influencer Code;
2. uma área separada para cupons promocionais verificados;
3. instrução curta para usar os dois campos do checkout;
4. fonte, região, validade e última verificação visíveis;
5. CTA comercial pelo link oficial da Cecília;
6. links internos para os dois conteúdos educativos equivalentes.

No desktop, as ofertas promocionais podem ser apresentadas em tabela:

| Tipo | Código | Benefício | Validade | Região | Verificado | Ação |
| --- | --- | --- | --- | --- | --- | --- |

No mobile, as mesmas informações devem virar cards legíveis, sem rolagem
horizontal obrigatória.

O fluxo visível deve orientar o leitor a:

1. copiar o cupom promocional elegível, quando houver;
2. copiar ou memorizar o Rewards Code;
3. abrir a YesStyle pelo link oficial da Cecília;
4. aplicar o cupom em `Coupon Code`;
5. aplicar o `CECILIA010` em `Rewards/Influencer Code`;
6. confirmar no resumo do pedido se os dois descontos foram aceitos.

Não afirmar cumulatividade universal. Usar formulação equivalente a “podem ser
combinados quando elegíveis, conforme as regras da campanha; confirme no
checkout”.

### B1.4 — Estado sem cupom promocional

Quando a fonte factual não tiver um cupom promocional ativo e verificado:

- manter o card do `CECILIA010`;
- exibir claramente “Nenhum cupom promocional verificado no momento”, no
  idioma da página;
- informar a data da última checagem;
- não exibir linha vazia, código vencido ou sugestão não comprovada;
- não transformar o Rewards Code em “cupom” para preencher artificialmente a
  lista.

### B1.5 — Conteúdo e localização

Localizar nos nove idiomas:

- títulos, descrições e instruções;
- rótulos da tabela e dos cards;
- mensagens de copiar e sucesso;
- tipo da oferta, validade, região e verificação;
- estado vazio;
- FAQ e transparência editorial;
- CTAs e textos acessíveis.

Percentuais, códigos, datas, regiões e URLs devem entrar por parâmetros da
fonte factual. Revisar especialmente JA, KO, ZH-Hant e ZH-Hans para eliminar
fallbacks ou resíduos de outros idiomas.

### B1.6 — Processo editorial de verificação

Até existir uma integração oficial confiável, o processo será manual:

1. localizar a promoção em um canal oficial da YesStyle;
2. registrar a URL oficial ou outra evidência aprovada;
3. confirmar código, benefício, região, período e elegibilidade;
4. testar no checkout quando possível;
5. registrar `verifiedAt` como a data real dessa checagem;
6. publicar na fonte factual;
7. deixar o validador retirar ou rejeitar ofertas expiradas.

Alterar texto, imagem, build ou data de deploy não renova `verifiedAt`.

### B1.7 — Preservação SEO obrigatória

Durante toda a B1:

- `/cupons/yesstyle` mantém canonical próprio;
- os oito hubs internacionais mantêm canonical para seus artigos atuais;
- o seletor dos hubs mantém o comportamento atual;
- o sitemap continua com os 18 artigos e apenas o hub PT, totalizando 19 URLs
  YesStyle;
- hreflang e indexação não mudam;
- nenhum redirect é criado;
- schemas SEO dos hubs não são ampliados.

Essa limitação é intencional: permite validar o produto transacional em
produção antes de torná-lo uma nova superfície de busca.

### B1.8 — Gates de aceite

- nove rotas respondem e usam o mesmo componente/modelo transacional;
- Reward Code e cupons promocionais são visualmente e semanticamente
  separados;
- estado sem cupom promocional funciona nos nove idiomas;
- desktop e mobile aprovados visualmente;
- copiar código, abrir loja e links educativos funcionam;
- link comercial usa `rel="sponsored noopener noreferrer"` e abre conforme o
  padrão externo do site;
- links internos não recebem `sponsored`;
- fonte, validade, região e `verifiedAt` aparecem corretamente;
- nenhum placeholder ou fato hardcoded vaza nos dicionários;
- teste de mutação cobre Reward Code e cupom promocional;
- validadores rejeitam fonte ausente, data impossível e oferta ativa expirada;
- `validate:content`, tipos, lint e build aprovados;
- contagem de páginas, sitemap, canonical e hreflang idênticos ao baseline;
- inspeção do HTML e navegação real em PT, EN, ES, JA e ZH-Hant;
- smoke test em produção após deploy.

### Gate B1 → B2

A B2 só pode começar após:

- aprovação explícita do usuário sobre visual e texto da B1 em produção;
- revisão editorial dos nove idiomas;
- confirmação do fluxo de atualização dos cupons;
- resolução documentada de `verifiedAt`;
- pelo menos um teste completo dos estados “com cupom” e “sem cupom”;
- relatório confirmando que nenhum sinal SEO mudou durante a B1.

## 6. Projeto B2 — Ativação SEO dos nove hubs

### Resultado esperado

Transformar os hubs já aprovados como produto em nove páginas transacionais
canônicas e interligadas, aptas a disputar buscas por cupons sem alterar as
URLs ou os clusters dos 18 artigos.

### B2.1 — Canonical e indexação

- Aplicar canonical próprio aos nove hubs existentes.
- Remover sinais que tratem os oito hubs internacionais como duplicatas
  auxiliares dos artigos.
- Preservar todas as URLs atuais.
- Não migrar artigos e não criar redirects.

### B2.2 — Hreflang exclusivo do cluster de hubs

- Hub aponta apenas para hubs equivalentes.
- Usar os nove idiomas do registro central.
- Usar `x-default` para `/en/coupons/yesstyle`.
- Garantir reciprocidade completa entre as nove páginas.
- Não misturar o cluster dos hubs com os dois clusters editoriais.

### B2.3 — Seletor hub com hub

O seletor dos hubs passa a alternar somente entre os nove hubs. Os seletores
dos artigos continuam alternando apenas entre seus equivalentes editoriais.

### B2.4 — Sitemap e descoberta

- Incluir os oito hubs internacionais.
- Manter o hub PT e os 18 artigos.
- O conjunto YesStyle passa de 19 para 27 URLs no sitemap.
- Validar ausência de duplicidade e de URL não canônica.
- Após o deploy, enviar o sitemap e os nove hubs ao mecanismo de descoberta
  usado pelo projeto, sem prometer indexação imediata.

### B2.5 — Metadata e links internos

- Título e descrição transacionais localizados.
- Data/mês só aparece quando derivado de verificação factual apropriada.
- Cada hub liga para o artigo do Rewards Code e o guia do mesmo locale.
- Os conteúdos educativos ligam de volta ao hub equivalente quando a âncora
  for contextualmente útil.
- Nenhum dos artigos muda canonical ou URL.

### B2.6 — Schema

Usar somente tipos compatíveis com a função do hub:

- `WebPage` ou `CollectionPage`;
- `BreadcrumbList`;
- `FAQPage`, apenas para perguntas visíveis na página.

Não gerar `Product`, `Review`, nota ou contagem de avaliações.

### B2.7 — Idioma do subtree

Renderizar o conteúdo do hub dentro de:

```tsx
<main lang={page.htmlLang}>
```

Isso melhora a semântica e a acessibilidade do subtree, mas não corrige o
`lang` da raiz. A limitação de `<html lang="pt-BR">` no HTML bruto continua
registrada até o Projeto C.

### B2.8 — Gates de aceite

- canonical próprio nos nove hubs;
- hreflang recíproco hub com hub, incluindo `x-default`;
- seletor navegando apenas entre hubs;
- 27 URLs YesStyle no sitemap: 18 artigos e nove hubs;
- cada hub indexável, sem `noindex` e sem canonical conflitante;
- `<main lang>` correto;
- schemas válidos e sem `Product`/`Review`;
- links internos apontando para conteúdos do mesmo locale;
- artigos e respectivos clusters sem regressão;
- `validate:content`, tipos, lint e build aprovados;
- inspeção do HTML bruto e navegação real em PT, EN, ES, JA e ZH-Hant;
- verificação pós-deploy de canonical, hreflang, sitemap, schema e status HTTP;
- monitoramento posterior no Google Search Console sem interpretar ausência de
  indexação imediata como falha técnica.

### Rollback independente

Se a ativação SEO apresentar erro, reverter canonical, hreflang, seletor,
sitemap e schemas ao estado da B1. A experiência transacional e a fonte factual
permanecem publicadas; não há rollback de URL nem cadeia de redirects.

## 7. Projeto C — `html lang` no servidor e estratégia de rotas

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

## 8. Sequência de commits sugerida

### Projeto A

1. `docs: add YesStyle i18n ABC implementation plan`
2. `refactor: centralize YesStyle locale and route registry`
3. `refactor: add explicit locale to YesStyle review clusters`
4. `refactor: centralize YesStyle coupon facts and translations`
5. `refactor: migrate YesStyle hubs to shared registries`
6. `test: validate YesStyle locale and coupon integrity`

### Projeto B1

1. `docs: split YesStyle hubs rollout into B1 and B2`
2. `refactor: model YesStyle rewards and promotional offers`
3. `feat: build shared localized YesStyle transactional hub`
4. `test: validate YesStyle hub states and SEO parity`

### Projeto B2

1. `feat: make YesStyle coupon hubs canonical`
2. `feat: connect localized YesStyle coupon hubs`
3. `feat: add transactional metadata and schema to YesStyle hubs`

### Projeto C

Somente após o spike e a decisão arquitetural.

## 9. Protocolo de implementação e revisão

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

## 10. Critério global de conclusão

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

## 11. Referências técnicas

- [Google — Managing multi-regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Google — Tell Google about localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Next.js — Internationalization](https://nextjs.org/docs/app/guides/internationalization)
- [Next.js — Project structure and route groups](https://nextjs.org/docs/app/getting-started/project-structure)
- [Next.js — generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
