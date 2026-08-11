# Handoff — Fase 1A (visibilidade dos cupons por marca)

Pré-requisitos já no ar (`origin/main` a partir de `9ecdf02`): medição do funil
(`coupon_page_click`), `internalLinks.ts`, modelo `discount-code | affiliate-link`,
separação locale/cluster. Ver `HANDOFF-CUPONS-1A-1B.md` e `HANDOFF-SHEIN-I18N.md`.

Caminhos relativos a `emcasacomcecilia/`.

---

## Objetivo da frente — ler antes de qualquer execução

**Todos os códigos comissionam pelo próprio código.** A pessoa não precisa visitar o site
nem clicar em nada: se ela lê `CECI` no resultado de busca, memoriza e usa no checkout, a
comissão acontece. Os códigos são curtos e memoráveis de propósito.

Consequência, e ela inverte o senso comum de SEO:

> **A conversão acontece na SERP, não no site. O objetivo é aparecer bem posicionado com o
> código legível — não receber o clique.**

Portanto:

- **CTR não é KPI.** Página em posição 8 com 0% de CTR pode ser o modelo funcionando, não
  falhando. Impressão em boa posição, com o código no snippet, já é venda potencial.
- **`coupon_copy` não mede sucesso.** Código fácil de lembrar não é copiado. Taxa de cópia
  baixa pode significar código bom.
- **Não esconder o código atrás de "revelar cupom".** Quando se mede cópia, a tentação é
  forçar cópia. Isso piora a experiência para melhorar um artefato de métrica.
- Resposta da IA (Gemini, AI Overview, Copilot) e snippet rico **não são inimigos** aqui,
  como seriam num site que vive de anúncio. São o produto.

### A exceção: YesStyle

Regra do programa: o código de influenciador dá comissão equivalente ao que o seguidor
economizou (5% na primeira compra, 2% nas seguintes). **Clicar no Link de Influenciador
dobra a porcentagem de comissão.**

Ou seja, a YesStyle não tem objetivo oposto — tem os dois. O código no snippet preserva a
comissão base de quem só memoriza; o clique vale **2×**.

É a **única marca em que o clique tem valor econômico quantificado**, e portanto a única em
que `coupon_store_click` significa dinheiro diretamente. Nas outras cinco ele é diagnóstico.
Mesmo assim: não esconder o código da YesStyle — isso trocaria comissão base garantida por
uma chance de dobrar.

---

## Fonte dos dados

**Search Console (export direto), 10/05 a 11/08/2026, 93 dias.**

> ⚠️ Análises anteriores desta frente usaram os exports do **GA4** (integração
> GA4↔Search Console, 28 dias). Aquela fonte é um recorte pequeno e enviesado das sessões
> que o GA4 conseguiu casar, e levou a conclusões erradas — inclusive a afirmação, falsa, de
> que não existiam consultas de "cupom damie". **Não usar o GA4 para diagnóstico de busca.**

| | GA4 (descartado) | GSC (fonte atual) |
|---|---|---|
| Site inteiro | ~60 cliques | **223 cliques / 18.564 impressões / 281 URLs** |
| Cluster comercial | 1 clique / 548 impr. | **14 cliques / 2.491 impr. / 129 consultas** |

### Por host

| Host | Cliques | Impressões | URLs |
|---|---:|---:|---:|
| `emcasacomcecilia.com` | 185 | 13.434 | 255 |
| `damie.emcasacomcecilia.com` | 38 | 5.105 | 22 |
| `dicas.emcasacomcecilia.com` | 0 | 13 | 3 |
| `link.emcasacomcecilia.com` | 0 | 12 | 1 |

---

## Demanda comercial por marca

Somando as consultas de intenção de cupom:

| Marca | Impressões | Posição | Cliques | Situação |
|---|---:|---|---:|---|
| **Damie** | **~1.495 (60%)** | **1,8 – 4,3** | 11 de 14 | resolvida — pelo **subdomínio** |
| **Dolce Gusto** | ~330 | **28,9 – 47,5** | 0 | **a mercadoria não está na prateleira** |
| YesStyle | ~168 | 6,1 – 9,3 | 0 | bem posicionada |
| I Wanna Sleep | ~162 | 9,9 – 10,6 | 3 | bem posicionada |
| Nutren | 62 | 11,0 | 0 | menor cluster do conjunto |

Principais consultas: `cupom damie` (852 impr., pos. 4,22, 9 cliques) · `cupom de desconto
damie` (191, pos. 4,28) · `cupom damie primeira compra` (163, pos. 4,25) · `cupom dolce
gusto` (161, **pos. 28,87**) · `cupom i wanna sleep` (131, pos. 9,94) · `cupom yesstyle`
(99, pos. 9,18) · `cupom nestle nutre` (62, pos. 11,00) · `cupom nescafe dolce gusto` (31,
**pos. 47,52**).

### Páginas comerciais

| URL | Cliques | Impressões | Posição |
|---|---:|---:|---:|
| `damie.emcasacomcecilia.com/cupom-cecilia12` | 4 | 546 | 6,19 |
| `/reviews/cupom-ceciemcasa-i-wanna-sleep-como-usar` | 3 | 366 | 9,25 |
| `/cupons/dolce-gusto` | 0 | 351 | **31,32** |
| `/reviews/cupom-ceci-nescafe-dolce-gusto-como-usar` | 1 | 339 | 11,01 |
| `/cupons/yesstyle` | 1 | 302 | 8,35 |
| `/reviews/yesstyle-reward-code-coupon-cecilia010` | 1 | 174 | 8,48 |
| `/en/coupons/yesstyle` | 1 | 152 | 12,20 |
| `/reviews/how-to-find-valid-yesstyle-coupon-codes` | 1 | 135 | 7,82 |
| `/cupons/magalu` | 0 | 123 | 18,00 |
| `/reviews/codigo-de-recompensa-yesstyle-cupon-cecilia010` | 0 | 111 | 10,18 |
| `/cupons/nutren` | 0 | 96 | 9,66 |
| `/cupons` (hub) | 2 | 89 | 5,37 |
| `/reviews/cupom-magalu-em-casa-com-cecilia` | 1 | 83 | 8,60 |
| `/reviews/codigo-cecilia010-yesstyle-como-usar` | 0 | 79 | 6,87 |
| `/reviews/cupom-ceci-nestle-nutre-como-usar` | 0 | 39 | 11,69 |
| `/cupons/i-wanna-sleep` | 0 | 34 | 8,50 |
| `/cupons/kopenhagen` | 0 | 11 | 20,09 |
| **`/cupons/damie`** | 0 | **6** | 7,50 |
| `/reviews/cupom-cecilia12-como-usar` | 0 | 1 | 6,00 |

---

## Damie sai da fila do site principal

`damie.emcasacomcecilia.com` é um site Damie completo, com 22 URLs em posições 5–8:

```
/                                  20c  2.488i  pos 5,16
/resenhas/poltrona-reclinavel-damie  2c   630i  pos 6,80
/cupom-cecilia12                     4c   546i  pos 6,19   ← responde "cupom damie"
/damie-e-confiavel                   4c   490i  pos 6,49
```

No site principal, `/cupons/damie` tem **6 impressões em 93 dias**.

O subdomínio já venceu essa intenção, em posição 6, com o código no snippet — que é
exatamente o objetivo desta frente. Uma campanha de linkagem para `/cupons/damie` criaria
um terceiro concorrente para uma consulta já resolvida, dividindo sinal entre propriedades
da mesma casa.

**Decisão fechada em 11/08/2026: manter `/cupons/damie`.** A página continua ativa como
fonte de código e regras, inclusive para citações contextuais necessárias em artigos do site
principal. Ela fica despriorizada e fora da campanha de linkagem em massa desta fase; não
remover nem redirecionar enquanto o subdomínio continuar vencendo a consulta comercial.

---

## Canibalização entre página de cupom e artigo

Mesmo dentro do site principal, duas URLs disputam a mesma intenção:

| Marca | Página `/cupons/` | Artigo comercial |
|---|---|---|
| Dolce Gusto | 351 impr., **pos. 31,3** | 339 impr., pos. 11,0 — **20 posições à frente** |
| I Wanna Sleep | 34 impr., pos. 8,5 | 366 impr., pos. 9,25, 3 cliques |
| YesStyle | 302 impr., pos. 8,35 | + 4 artigos PT/EN + hubs por locale |
| Nutren | 96 impr., pos. 9,66 | 39 impr., pos. 11,69 |

O Google costuma exibir uma URL por site por consulta. Duas páginas disputando **dividem
sinal de ranqueamento** e as duas ficam piores — e posição é o KPI aqui.

### Decisão de ownership semântico

**`/cupons/<marca>` é a URL principal para a intenção transacional**: “cupom X”, código
vigente, desconto, validade, regras e CTA para a loja.

Os artigos ficam com intenções complementares e duráveis:

- instrução: “como usar o código”, campo correto no checkout, erros e restrições;
- avaliação: experiência, reputação, comparação e “vale a pena”;
- atualização editorial que exija contexto maior que o card da página de cupom.

Isso **não** significa apontar `rel=canonical` dos artigos para `/cupons/`. Os conteúdos são
distintos e continuam self-canonical. A separação é por title, H1, introdução, âncoras e
escopo editorial.

Os quatro artigos concorrentes **já têm slug `...como-usar`** — a URL sempre declarou
intenção instrucional. Quem invadiu o transacional foi só o title, que nos quatro abre com
"Cupom \<Marca\> \<CÓDIGO\>", idêntico ao início da página de cupom.

**Implementação barata:** existe `seoTitle?: string` (`src/lib/content/types.ts:384`), já
usado em 3 reviews. `ReviewPageContainer` faz `seoTitle || title` para a metadata, enquanto
o H1 continua vindo de `title`. Dá para recuar **só o title da SERP**, sem tocar em H1 nem
em slug. Um campo, quatro arquivos, reversível.

### Regra de sequência — o risco é assimétrico por marca

Recuar o artigo antes de a página de cupom estar competitiva **vaga uma posição boa em
favor de uma ruim**.

| Marca | Página | Artigo | Recuar agora? |
|---|---:|---:|---|
| I Wanna Sleep | pos. 8,5 | pos. 9,25 | **sim** — a página já está à frente |
| Nutren | pos. 9,66 | pos. 11,69 | **sim** — a página já está à frente |
| Dolce Gusto | pos. 31,3 | pos. 11,0 | **não** — primeiro subir a página |

**Regra: recuar o artigo só quando a página de cupom estiver a até ~3 posições dele. Se
estiver muito atrás, primeiro subir a página.**

---

## Métricas e gate

Hierarquia, do mais confiável ao menos:

1. **Painel de afiliado** — venda e comissão por marca. É a única verdade e é onde o gate
   de expansão deve morar.
2. **Search Console** — posição e impressões por consulta e por página. Diz onde há
   oportunidade; é o KPI operacional desta fase.
3. **GA4** — comparação **relativa** entre caminhos internos: qual artigo manda mais gente,
   qual âncora, qual posição de CTA. Nunca nível absoluto de conversão.

**Métrica da Fase 1A: posição e impressões nas consultas comerciais, por marca.**

### Alerta de qualidade do GA4

No export de páginas (14/07–10/08), *"Cupom YesStyle CECILIA010: Até 5% OFF Extra
Elegível"* registrou **472 visualizações para 4 usuários ativos** — 118 por usuário. A home
tem 19,6; "Reviews & Análises", 28,2. Não é comportamento humano.

Como o funil `coupon_page_click` vive nesse mesmo GA4, os eventos novos nasceram igualmente
poluídos. **Não usar eventos anteriores ao gate de localhost como linha de base.** O volume
não pode ser limpo retroativamente e a medição deve recomeçar depois da correção.

**Auditoria local em 11/08/2026:** o repositório monta um único componente `Analytics`,
configura o GA4 com `send_page_view: false` e tem um único emissor manual de `page_view`.
O HTML publicado de `/cupons/yesstyle` contém somente o Measurement ID
`G-LDLH63KJMP`, uma preload de `gtag.js` e nenhum contêiner GTM. Não há duplicação óbvia
na implementação ou no HTML inicial.

**Causa encontrada:** `.env.local` contém `NEXT_PUBLIC_GA_MEASUREMENT_ID`, portanto o
`next dev` enviava eventos para a propriedade de produção. Cada hot reload remontava o
componente e emitia outro `page_view`; cliques usados nos smokes locais também contaminavam
`coupon_page_click`, `coupon_copy` e `coupon_store_click`.

**Correção:** Analytics só carrega nos hostnames de produção definidos em
`INTERNAL_HOSTNAMES` (`emcasacomcecilia.com` e `www`). Localhost, IPv6, IP da LAN,
preview, staging e o subdomínio Damie ficam fora por padrão. Teste local exige opt-in
explícito com `NEXT_PUBLIC_GA_DEBUG=1`, que configura `debug_mode: true`.

Ainda confirmar no próprio GA4, por DebugView/Tempo real, que uma navegação publicada emite
um único `page_view` e que não existe segunda fonte. Conferir também hostname, origem do
tráfego e filtro de tráfego interno.

### Marco zero da medição e estado do deploy

São dois relógios diferentes:

- **Poluição local:** terminou em 11/08/2026, quando `5042d5a` entrou na árvore usada pelo
  `next dev`. Isso não depende de deploy: localhost já não envia eventos para produção.
- **Novo funil em produção:** começou em **11/08/2026 15:14:06 BRT**, marco conservador posterior
  à attestation, ao inventário completo dos workers e à série pública estável. Descartar qualquer
  evento anterior desse baseline ao analisar `coupon_page_click`.

O último deploy GitHub bem-sucedido foi `4a6eae0`, em 01/08/2026, anterior aos commits 1a e
1b. Ele foi aprovado pelo `BUILD_ID` presente no HTML; como o fluxo legado não tinha
`DEPLOY_UUID`, a checagem exata de `/api/release` foi pulada. Portanto a rota já existia,
mas **não há evidência de que a attestation tenha funcionado naquele deploy**. O HTML
publicado ainda exibe a prosa pré-`cc9a198`, e `/api/release` devolve
`{"target_sha":null,"deploy_uuid":null}`.

**Diagnóstico do release meta em 11/08/2026:** o arquivo existe em
`~/domains/emcasacomcecilia.com/nodejs/release-meta.json`, com `target_sha: 4a6eae0`, mas
os workers reais rodam em `hbuilds/versions/<build>/nodejs`. Esse cwd gerenciado não contém
o arquivo, por isso o endpoint lê nulos. Em 03/08, `55d33de` trocou o gate de `BUILD_ID`
pela attestation obrigatória; releases posteriores fizeram swap, e o verificador viu apenas
o site respondendo 200, esperou 420 segundos e os reverteu. Sem identidade
servida, não há prova de que aquele 200 já viesse do processo novo; o resultado é ambíguo,
não evidência suficiente de release saudável nem de release defeituoso.

O runtime anterior era um `hbuild` criado em 10/08, com `BUILD_ID` diferente do pacote SSH de
01/08. Só essa versão gerenciada está retida como `hbuild` executável, então não é possível
provar se o `cwd` mudou por atualização do provedor ou por uma reimplantação intermediária. O Next permaneceu em
`16.1.4`; não há evidência de mudança no layout do standalone. A evidência disponível aponta
para troca da superfície efetiva de execução, de pacote SSH para build gerenciado.

O caminho em uso para o runtime real é `.github/workflows/hostinger-wire-probe.yml`: ele
cria a identidade antes do build, envia o fonte pelo build gerenciado da Hostinger e só
aceita sucesso com attestation pública exata. Os modos `CAPTURE_ONLY` e `PROBE_PRODUCTION` já
foram exercitados. Deploys seguintes devem continuar usando esse probe supervisionado.

**Identidade compilada:** `next.config.mjs` lê `release-meta.json` como entrada efêmera do
build, usa `target_sha` como `BUILD_ID` determinístico e incorpora `target_sha` e `deploy_uuid`
no bundle do servidor. A rota responde dessas
constantes; não lê `process.cwd()` nem arquivo em runtime. `verify:release` remove todos os
sidecars, injeta identidade falsa no ambiente do processo e exige que o standalone ainda
devolva os valores do build. O probe exige também
`/_next/static/<target_sha>/_buildManifest.js`: a rota dinâmica prova qual processo respondeu,
e o manifesto prova que os arquivos do mesmo release estão publicados. Os testes
`test:release-meta`, `verify:release` e `test:hostinger-wire` cobrem o contrato local.

Antes do dispatch, o probe captura em artefato: resposta pública atual, `cwd` de cada worker,
caminho completo do `hbuild`, `BUILD_ID` servido e todos os `release-meta.json` encontrados.
Essa captura é fail-closed e acontece antes de qualquer mutação em produção.

**Primeira execução do probe:** o run `31511011005`, em 11/08/2026, parou na captura
forense antes de build, archive ou dispatch. O host não oferece `/dev/fd`, então as
substituições de processo `< <(...)` falharam; o workflow foi corrigido para usar pipelines
e arquivos regulares. O artefato parcial e a inspeção somente leitura confirmaram três workers
em `hbuilds/versions/019fecf0-bbaa-7202-87a4-70c469b81ed7/nodejs`, todos com
`BUILD_ID=0p0H0JQRCNN5jW_WxYqgK`, manifesto público 200 e nenhum sidecar no cwd. Há um único
`release-meta.json` fora do runtime, em `nodejs/`, apontando para `4a6eae0` e com UUID nulo; o
pacote SSH retido tem outro `BUILD_ID` (`pJC0ZITwsdsZmECOIKo3K`). Portanto o hbuild servido não
pode ser atribuído a um SHA pelo `BUILD_ID` aleatório isoladamente.

O workflow passou a separar os modos: `CAPTURE_ONLY` executa somente a inspeção e preservação do
artefato; build local, archive e `Execute exact managed wire` têm guard explícito exclusivo para
`PROBE_PRODUCTION`. O teste `test:hostinger-wire` afirma essa fronteira diretamente no YAML.
Somente `PROBE_PRODUCTION` é decisão de deploy e exige autorização operacional própria.

**Captura somente leitura concluída:** o run `31514487153`, em 11/08/2026, terminou com sucesso
em `CAPTURE_ONLY`; build, archive e `Execute exact managed wire` ficaram `skipped`. O artefato
completo mostrou os três workers no mesmo hbuild e com
`BUILD_ID=0p0H0JQRCNN5jW_WxYqgK`. O manifesto público desse ID respondeu 200, com
`content-type: application/javascript`, cache imutável e corpo `self.__BUILD_MANIFEST` válido.
Está provado que o processo e os arquivos estáticos servidos pertencem ao mesmo release. A
produção não foi alterada por esse run.

O conjunto de evidências, porém, atribui a produção a `4a6eae0`: o sidecar órfão aponta para esse
SHA com UUID nulo — impressão digital do fluxo de 01/08 — e o HTML público preserva as marcas de
conteúdo daquela versão (`Outros cupons ativos`, `cupom ativo` e o title de agosto do Nutren).
O inventário prova que o runtime **atual** não está dividido; não permite julgar se candidatos
revertidos eram saudáveis. Portanto o export do GSC de 10/05–11/08 é uma linha de base limpa para
a Fase 1A. O marco zero da nova medição continua sendo a convergência estável do primeiro deploy
atestado que inclua `5b0c0d3`, não o instante do dispatch; a partir dele, o `BUILD_ID`
determinístico será o próprio SHA.

**Pré-voo de retenção e recuperação:** o run somente leitura `31517447965` capturou 70/70
registros históricos de build da API, mas apenas um `hbuild` executável no host. A API documentada
não oferece promoção, reativação ou rollback de build anterior; os registros são histórico, não
artefatos restauráveis. O wire gerenciado deve ser tratado como somente-para-frente.

Há uma contingência separada: o host ainda preserva cinco pacotes standalone do fluxo SSH em
`releases/`. O pacote `4a6eae05bf016ade01743c365d4fa10ba18d1652.tar.gz` passou em `gzip -t`,
contém `server.js`, `.next/BUILD_ID` e `release-meta.json`, e tem SHA-256
`d0e8131d49c00e4a3e4580b19e6f8f0ce44c36f2812f42619d6a368d242df1c1`.
Isso preserva os bytes do release anterior, mas não constitui rollback pronto: é um pacote SSH,
incompatível com o source archive do build gerenciado, e sua restauração sobre o runtime atual
nunca foi ensaiada. Até existir runbook testado, `PROBE_PRODUCTION` é uma mudança sem rollback
operacional garantido; em falha ambígua, a saída primária é reconciliar e seguir para frente.

**Primeiro deploy atestado e marco zero:** o run `31520415657` falhou antes de qualquer dispatch:
o source archive tinha `50.220.575` bytes. `c41e914` passou a excluir do `git archive` somente
documentação, workflows e `src/lib/generated/content-index.ts`, que o build regenera; o pacote
efetivo caiu para `49.784.149` bytes. O run `31521080009` então publicou
`c41e914c78a01e4671adb3fe19c9effc7265a50e`, deploy UUID
`4a8b7437-3a7d-4354-a6ee-7e715d87e105` e build Hostinger
`019ff203-a971-703e-8b82-e431332a4975`.

A identidade nova apareceu publicamente às `15:11:04 BRT`; o workflow ficou verde às
`15:11:13`. O `CAPTURE_ONLY` pós-deploy `31521484469` registrou, às `15:13:41`, os dois workers
no mesmo hbuild, ambos com `BUILD_ID=c41e914...`, e o manifesto público do mesmo ID em HTTP 200.
A série pública seguinte devolveu SHA/UUID exatos em 10/10 consultas entre `15:13:36` e
`15:14:06`. Portanto **11/08/2026 15:14:06 BRT** é o marco zero conservador do novo funil.

---

## Item 1 — Mecanismo de link contextual em receitas

### Estado atual

Receitas **não têm onde colocar um link**. O tipo `Recipe`
(`src/lib/content/types.ts:119`) não tem `contentSections` nem `links[]` — a estrutura é
`intro`, `context`, `ingredients`, `instructions`, `instructionGroups`, `tips`, `notes`.
`RecipeNotebookTemplate.tsx` não renderiza `contentSections` em lugar nenhum, e nenhuma das
192 receitas tem `links[]`.

As zero receitas apontando para cupons não são omissão editorial, é ausência de mecanismo.

### Decisão de design

Três opções foram avaliadas: campo dedicado; reaproveitar `notes` (semântica errada —
é nota editorial, não CTA comercial); adicionar `contentSections` a receitas (grande demais,
muda o modelo de 192 arquivos).

**Decisão fechada em 10/08/2026: campo dedicado opcional.**

```ts
couponCallout?: { brand: string; href: string; label: string };
```

Renderizado em slot definido — depois dos ingredientes ou junto de `tips`, onde a pessoa já
está decidindo o que comprar. Entra junto com a primeira receita Dolce Gusto que o consumir.

### Critérios de aceite (obrigatórios)

- link contextual para `/cupons/<marca>`;
- passa pelo caminho compartilhado `isCouponPageLink` + `TrackedCouponPageLink`
  (`src/lib/internalLinks.ts`, `src/components/review/TrackedCouponPageLink.tsx`);
- `placement: 'recipe_inline'`, adicionado ao union `CouponPageLinkPlacement`;
- **marca derivada do destino** via `getCouponBrandFromHref`, nunca de etiqueta editorial;
- teste versionado + smoke render provando que o evento dispara **uma vez por clique**, sem
  duplicidade com `outbound_link_click`.

O último critério não é formalidade: a primeira revisão do 1a encontrou exatamente esse
defeito — medição instalada num caminho de render quando havia cinco, e marca vinda da
etiqueta do artigo em vez do destino, o que zerava o `brand` em 5 dos 6 artigos da Damie.
**Não criar um segundo renderizador de links.** Um renderizador novo nasce sem medição.

### Cobertura editorial

Levantamento em 10/08/2026 sobre `content/receitas/` (192 arquivos):

| Termo | Receitas |
|---|---:|
| `dolce`, `cápsula`, `capsula`, `nescafé`, `nescafe` | **0** |
| `damie`, `yesstyle`, `nutren`, `magalu`, `i wanna sleep` | **0** |
| `café` / `cafe` | 25 |

Nenhuma receita menciona marca parceira. As 25 ocorrências de "café" são idiomáticas ou de
ingrediente ("café da tarde", "café expresso opcional" num brownie). Só uma receita é sobre
café — "Café com Ovolmatine".

Linkar "Bolo de Fubá com Erva-Doce" ao cupom porque a introdução cita "café recém-coado" é
o link forçado que o critério nº 1 do Guia Mestre proíbe.

**Decisão fechada em 10/08/2026: opção B.** Pauta editorial primeiro; o mecanismo entra no
mesmo commit da primeira receita Dolce Gusto e é validado pelo teste `recipe_inline` e pelo
smoke render. Nada de infraestrutura sem consumidor editorial real.

---

## Item 2 — Lote inicial nos reviews

Não depende do item 1.

| Ordem | Cluster | Trabalho |
|---|---|---|
| 1 | **Dolce Gusto** | subir `/cupons/dolce-gusto` da posição 31. É a única marca em que ninguém chega a ver o código. Linkagem + revisão da página. **Não** recuar o artigo ainda |
| 2 | I Wanna Sleep | recuar `seoTitle` do artigo; a página já está à frente |
| 3 | YesStyle | auditoria própria antes de qualquer expansão — 4 artigos PT/EN + hub PT + hubs por locale disputando |
| 4 | Nutren | recuar `seoTitle` do artigo; menor cluster, baixa prioridade |
| — | Damie | **fora** — ver seção do subdomínio |
| — | Magalu | 123 impr., pos. 18. Sem intervenção nesta rodada |
| — | Kopenhagen | pausado |

Âncoras variadas por artigo — `link_label` é medido, dá para saber qual formulação funciona.

---

## Regras permanentes

- **FAQ com a pergunta literal.** Quando houver tarefa de edição de texto em artigo ou
  página de cupom, incluir na FAQ a pergunta como a pessoa (e a IA) formula — "Qual é o
  cupom da Damie?", "Qual o código de desconto do Dolce Gusto?" — com resposta factual em
  uma frase. É o formato que os extratores de IA citam. Não é tarefa própria: entra como
  rider em toda tarefa editorial.
- **Bing não é canal hoje.** Indexação incompleta dos dois domínios e ~99% das keywords são
  receitas ou o nome Cecília. Não é lacuna de medição, é de indexação. `npm run
  indexnow:submit` já existe se um dia virar prioridade.
- **Citação em IA não tem relatório.** Aferição é manual: perguntar "qual o cupom da
  \<marca\>" no Gemini, AI Overview e Copilot, e registrar data e resultado por marca.

---

## Verificação

```bash
npm run typecheck
npm run lint
npm run validate:content
npm run test:internal-links
npm run test:coupon-offer-modes
npm run test:analytics-gate
npm run build
```

Para o item 1, acrescentar o teste do `recipe_inline` e o smoke render de uma receita com
`couponCallout` preenchido, conferindo no HTML gerado que o link é interno (sem
`target="_blank"`) e que o evento carrega `brand` derivado do destino.
