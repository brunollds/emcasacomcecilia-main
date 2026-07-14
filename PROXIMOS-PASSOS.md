# 🚀 Próximos Passos - Em Casa com Cecília

**Data:** 11 Jun 2026
**Status:** Site em produção; foco atual em operação segura, evolução editorial e melhoria dos templates de leitura

---

> **Portabilidade editorial multi-blog (jul/2026):** ver [`docs/EDITORIAL-PORTABILITY.md`](docs/EDITORIAL-PORTABILITY.md) — mapa Dicas ↔ Em Casa ↔ Damie ↔ Central, o que portar, waves e contrato para CMS.

## PLANO ATUAL CONSOLIDADO

Esta seção representa o estado atual do projeto. As seções posteriores permanecem como histórico das decisões e tarefas anteriores.

### PRIORIDADE IMEDIATA - Operação e estabilidade

- [ ] Automatizar o deploy completo em um script seguro, seguindo integralmente `docs/DEPLOY-GUIDE.md`
- [ ] O script deve executar `lint`, build, archive na pasta pai, deploy via Hostinger, restauração obrigatória do `.env`, reinício e verificações HTTP
- [ ] O script deve abortar o processo quando faltar variável obrigatória ou quando `lint`/build falhar
- [ ] Nunca realizar upload manual ou parcial de arquivos de `.next`
- [ ] Documentar procedimento de rollback e verificação de processos em loop
- [ ] Incluir notificação do IndexNow e validação do sitemap após publicação de conteúdo

### REDESENHO DO DEPLOY E PUBLICAÇÃO EDITORIAL

- [ ] Redesenhar o fluxo atual de deploy para evitar upload/rebuild completo do site em alterações simples de artigos, receitas e metadados
- [ ] Avaliar substituir o deploy por archive/MCP por um fluxo Git-based no servidor: `git pull`, build controlado, restart único e `.env` preservado fora do artefato
- [ ] Garantir que o `.env` não seja apagado em cada deploy; idealmente ele deve ser gerenciado no painel/ambiente da Hostinger ou em arquivo persistente fora da pasta substituída
- [ ] Criar um script remoto seguro que impeça múltiplos processos Node simultâneos e valide processos ativos antes/depois do restart
- [ ] Adicionar verificação pós-deploy para detectar `pthread_create: Resource temporarily unavailable`, crash loop, múltiplos `next-server` e porta incorreta
- [ ] Separar conteúdo editorial do bundle principal: mover gradualmente receitas, reviews/artigos e metadados de `src/lib/data.ts` para JSON externo, banco, CMS ou API própria
- [ ] Avaliar ISR/on-demand revalidation para publicar ou corrigir páginas de conteúdo sem rebuild completo do Next.js
- [ ] Definir uma estratégia de publicação editorial com preview, validação de SEO, revisão e rollback por página, não por site inteiro
- [ ] Começar a migração pelo conteúdo novo de reviews/artigos, mantendo compatibilidade com o conteúdo legado em `src/lib/data.ts`
- [ ] Comparar alternativas de infraestrutura antes de mudanças grandes: Hostinger com Git deploy melhorado, Vercel/Netlify/Cloudflare para Next.js, ou CMS headless com cache/revalidação
- [ ] Documentar decisão arquitetural: custo, risco operacional, rollback, preservação de SEO, tempo de build, facilidade de edição e impacto em receitas/reviews existentes

### PRIORIDADE EDITORIAL - Templates de leitura

- [ ] Auditar os templates atuais de receitas e reviews em desktop e mobile antes de redesenhar
- [ ] Remodelar a página individual de receita para leitura mais agradável, harmoniosa e menos baseada em grandes blocos brancos
- [ ] Seguir a direção visual aprovada do novo template de receita: hero em cascata, títulos com sublinhado desenhado, ingredientes e passos revelados progressivamente e bloco de dicas no estilo de anotação editorial
- [ ] Remodelar a página individual de review/artigo com hierarquia editorial mais clara, melhor ritmo entre texto, imagens, vídeo, CTA e conteúdo relacionado
- [ ] Preservar durante o redesign: Recipe/Article/Review schema, canonical, Open Graph, TTS, vídeo, taxonomia e links com UTM
- [ ] Criar componentes editoriais compartilhados quando fizer sentido, sem forçar receitas e reviews a terem exatamente o mesmo layout
- [ ] Avaliar um índice de conteúdo em artigos longos e navegação rápida para ingredientes/modo de preparo nas receitas
- [ ] Avaliar tipografia, largura ideal de leitura, espaçamento, destaques, citações, imagens inline e cards de resposta rápida
- [ ] Implementar animações com CSS + `IntersectionObserver`, respeitando `prefers-reduced-motion`; Pretext não será responsável pelos gatilhos de scroll
- [ ] Limitar stagger em listas longas para não atrasar o acesso a ingredientes e passos

### PRETEXT E PADRONIZAÇÃO EDITORIAL

- [ ] Adotar `@chenglou/pretext` como infraestrutura editorial nos pontos em que medição e composição de texto tragam benefício real
- [ ] Explorar `prepare` + `layout` para altura previsível, prevenção de layout shift e componentes editoriais responsivos
- [ ] Explorar `prepareWithSegments` + APIs de linhas para composições especiais que precisem controlar quebras e fluxo ao redor de imagens
- [ ] Explorar `rich-inline` para destaques, links, chips e fragmentos tipográficos inline sem transformar a biblioteca em um editor de conteúdo
- [ ] Manter o corpo principal dos artigos em HTML semântico no DOM para SEO, acessibilidade, seleção de texto, TTS e impressão
- [ ] Criar uma camada compartilhada de componentes Pretext em TypeScript, evitando chamadas e configurações duplicadas nos templates
- [ ] Sincronizar fontes, pesos, `line-height` e `letter-spacing` do Pretext com os tokens CSS do projeto
- [ ] Preparar fallback normal em HTML/CSS para ambientes sem `Intl.Segmenter` ou Canvas 2D
- [ ] Validar desempenho, hidratação, responsividade, acessibilidade e redução de CLS antes de expandir o uso
- [ ] Não forçar Pretext em todo parágrafo: usar a API completa disponível somente onde houver ganho mensurável de layout ou apresentação

### PRIORIDADE DE AUTORIA E E-E-A-T

- [ ] Auditar prioridades pendentes antes de iniciar a padronização visual de autoria
- [ ] Criar um componente compartilhado `ArticleByline` com variantes editorial e compacta
- [ ] Aplicar a byline completa em reviews/artigos: foto, Cecília Mauad, link para `/sobre` e data
- [ ] Aplicar uma byline compacta nas páginas individuais de receita
- [x] Padronizar o schema `Person` de receitas e reviews com nome completo e URL da página `/sobre`
- [ ] Avaliar suporte consistente a `datePublished` e `dateModified` antes de preencher datas retroativas

### EVOLUÇÃO DA PUBLICAÇÃO DE CONTEÚDO

- [ ] Curto prazo: manter arquivos locais, mas criar um fluxo assistido para gerar e validar entradas de receitas e reviews
- [ ] Depois: migrar receitas e reviews gradualmente de `src/lib/data.ts` para banco de dados ou CMS
- [ ] Preservar o modelo atual de ingredientes agrupados (`IngredientSection[]`); não migrar novamente um recurso que já existe
- [ ] Adicionar `instructionGroups` como campo opcional e compatível com `instructions`, permitindo migração gradual do modo de preparo
- [ ] Criar adaptador que transforme `instructions` legadas em um grupo padrão quando `instructionGroups` não existir
- [ ] Definir requisitos do CMS: rascunho, revisão, agendamento, upload de imagens, SEO, autoria, categorias e preview
- [ ] Evitar migração integral de uma vez; começar por novos reviews/artigos e manter compatibilidade com o conteúdo atual
- [ ] Avaliar estratégia de cache/revalidação para publicar conteúdo sem rebuild completo

### DIVISÃO DE TRABALHO ENTRE AGENTES

- [ ] Kimi: implementar componentes, tipos, adaptadores de dados, Pretext, animações, testes técnicos e migrações estruturais
- [ ] Gemini: revisar, corrigir e estruturar textos; propor agrupamentos editoriais sem editar a arquitetura do projeto
- [ ] Codex: definir contratos, revisar diffs, integrar etapas, impedir regressões de SEO/acessibilidade, executar `lint`/build e aprovar o resultado visual
- [ ] Cada agente deve trabalhar em escopo e arquivos explicitamente delimitados; evitar alterações simultâneas em `src/lib/data.ts` e nos mesmos templates
- [ ] Toda entrega de agente deve incluir lista de arquivos alterados, decisões tomadas, limitações e comandos de validação executados
- [ ] Integrar em etapas pequenas e reversíveis: modelo de dados, componentes-base, template de receita, migração piloto, template de review e expansão

### CONTEÚDO E SEO CONTÍNUOS

- [ ] Revisar duplicatas editoriais entre receitas semelhantes
- [ ] Continuar substituindo placeholders pelas melhores imagens disponíveis
- [ ] Fazer o pareamento progressivo entre receitas, reviews e vídeos do YouTube
- [ ] Revisar Search Console, Analytics e Clarity periodicamente para priorizar melhorias reais
- [ ] Ativar popularidade automática somente após validar volume e qualidade dos dados
- [ ] Solicitar indexação no Search Console para páginas estratégicas após alterações relevantes

### BACKLOG NÃO URGENTE

- [ ] Cook Mode e timers para receitas
- [ ] Versão amigável para impressão
- [ ] Sistema de avaliações, comentários e “Fiz essa receita”
- [ ] Newsletter e email marketing quando houver infraestrutura editorial
- [ ] Migração gradual de componentes `.js` para `.tsx` em commits separados de mudanças visuais

---

## 📋 CHECKLIST FINAL DE LANÇAMENTO

### 🔥 PRIORIDADE 1 - Revisão Visual Final

- [ ] Revisar a home no navegador em desktop e mobile
- [ ] Validar cortes das 4 imagens principais de categorias
- [ ] Validar placeholders e imagens próprias nos cards de receitas
- [ ] Conferir espaçamentos entre Hero, receitas, links, reviews, ofertas, vídeos e footer
- [ ] Revisar os ícones da faixa de categorias e decidir se todos comunicam bem
- [ ] Validar se o CTA final de vídeos + footer azul está com bom encaixe
- [ ] Adicionar imagem hero do DAMIE em `public/images/universe/damie-hero.jpg` e ativar `image: '/images/universe/damie-hero.jpg'` no card DAMIE da seção Universo da Cecília

### 📄 PRIORIDADE 2 - Revisão das Subpáginas

- [ ] Revisar `/receitas` e páginas individuais de receita
- [x] Revisar `/categorias`
- [ ] Revisar `/reviews` e páginas individuais de review/análise
- [ ] Revisar `/sobre`
- [ ] Revisar `/faqs`
- [ ] Revisar `/contato`

### ✉️ PRIORIDADE 3 - Contato Real

- [ ] Definir se o formulário usará `mailto`, endpoint próprio ou serviço externo
- [ ] Implementar envio real do formulário
- [ ] Validar fluxo de sucesso/erro antes do deploy

### 🔎 PRIORIDADE 4 - SEO, Analytics e Busca

- [ ] Validar `robots.txt` e `sitemap.xml` finais
- [ ] Configurar Google Search Console
- [ ] Validar Google Analytics em produção
- [ ] Revisar metadados das listagens e páginas institucionais
- [ ] Replicar na Hostinger as envs do `.env.local`
- [ ] Manter curadoria manual de populares até acumular 15-30 dias de dados reais

### 🚀 PRIORIDADE 5 - Checkpoint e Deploy

- [ ] Fazer revisão manual final após aprovação visual
- [ ] Criar commit checkpoint
- [ ] Fazer push para o GitHub
- [ ] Publicar na Hostinger Node.js
- [ ] Validar DNS + SSL + versão publicada

### 🎨 PRIORIDADE 6 - Desejável, Não Bloqueia o Ar

- [ ] Priorizar cerca de 30 imagens adicionais de receitas com maior potencial
- [ ] Curar imagem hero para o card DAMIE da home; item pequeno, mas importante para substituir o fallback visual atual
- [ ] Revisar duplicatas editoriais por título/conteúdo
- [ ] Refinar `imageAlt`, `description`, `tags` e `searchTerms` das próximas receitas com imagem nova

---

## ✅ O QUE JÁ ESTÁ RESOLVIDO

- [x] Home modularizada com ordem final das seções
- [x] Cards principais de categorias com imagens premium
- [x] Faixa de categorias com ícones estilo fill
- [x] Hero com foto real da Cecília
- [x] Cards de receitas no padrão editorial premium
- [x] Carrossel Meus Links refinado
- [x] Reviews showcase, listagem e páginas individuais
- [x] 4 novos posts editoriais adicionados em reviews/análises
- [x] Ofertas reais consumidas do Dicas via JSON público com fallback
- [x] Seção de vídeos com feed do YouTube Shorts
- [x] Footer enxuto com direção visual unificada
- [x] JSON-LD Recipe, canonical e OpenGraph base implementados
- [x] Analytics preparado para popularidade real futura
- [x] `/categorias` reorganizado como índice editorial com blocos por agrupamento
- [x] `/categorias` com tipos de prato interativos, subcategorias dinâmicas e revisão visual base aprovada para v1.0
- [x] `/receitas` migrado de selects simples para base facetada com chips, contagens e carregamento progressivo
- [x] `/receitas` mobile com bottom-sheet de filtros
- [x] `npm run lint` passando
- [x] `npm run build` passando

---

## 📌 ESTADO ATUAL POR ÁREA

| Área | Status |
|------|--------|
| Home | ✅ Estrutura pronta, falta revisão visual |
| Receitas | ⚠️ Nova base facetada pronta; falta polimento visual/UX e revisão das páginas individuais |
| Reviews | ✅ Estruturado, incluindo análises editoriais |
| Ofertas | ✅ Integrado ao Dicas |
| Vídeos | ✅ Integrado ao YouTube |
| FAQ / Sobre | ✅ Conteúdo e layout implementados |
| Contato | ⚠️ Layout pronto, envio real pendente |
| Analytics | ⚠️ Base pronta, ativação real depende de produção |
| Deploy | ⏳ Aguardando revisão final e checkpoint |

---

## 🎯 PRÓXIMA AÇÃO RECOMENDADA

1. Consolidar o polimento fino de `/receitas`, principalmente mobile, hierarquia visual e UX dos filtros
2. Revisar visualmente as páginas individuais de receita e reviews
3. Resolver o envio real do contato
4. Fechar SEO técnico + envs da Hostinger
5. Fazer checkpoint e deploy

---

## 🧭 BACKLOG V2.0

- [ ] Consultar o plano consolidado no topo para a adoção planejada de Pretext, animações, autoria, templates, deploy e CMS
- [ ] Manter comentários, Cook Mode, impressão e recursos sociais coordenados com o novo sistema editorial

---

## 📍 NOTA DE TRANSIÇÃO DE ESCOPO

- `/categorias` foi considerada boa para a versão `1.0`, salvo ajustes pontuais futuros
- `/receitas` já saiu do modelo antigo de dropdowns simples e entrou em uma estrutura facetada com:
  - sidebar no desktop
  - bottom-sheet no mobile
  - chips ativos
  - contagens por opção
  - multi-seleção por querystring
  - carregamento progressivo dos cards
- Pendências atuais de `/receitas` antes de considerar fechado:
  - lapidar mais a UX mobile dos filtros
  - revisar densidade e ordem das facetas
  - revisar visual da listagem e das páginas individuais
  - decidir refinamentos editoriais de taxonomia quando necessário

---

## 📚 HISTÓRICO DETALHADO

As anotações abaixo foram mantidas como histórico das decisões e implementações já aprovadas.

## 📋 TAREFAS PENDENTES (Histórico da Home)

### 🔥 PRIORIDADE 1 - Estrutura da Home Page

#### 1. TopBar (Correções)
- [x] **Posicionamento:** Movida para ANTES do Header/Navbar
- [x] **Estilo:** Sem box/pill no texto
- [x] **Conteúdo:** Texto + ícone WhatsApp
- [x] **Link:** `https://chat.whatsapp.com/GwouQfaZMrj32j7pKOIZbQ`
- [x] **Sticky:** Mantida no topo

#### 2. Reordenar Seções
Nova ordem da Home:
1. TopBar (WhatsApp)
2. Header/Navbar
3. MainCategories (4 cards retangulares)
4. Categories (ícones minimalistas)
5. Hero (apresentação)
6. Receitas Populares
7. Meus Links (carrossel)
8. Reviews & Análises
9. Ofertas
10. CTA YouTube
11. Footer + Redes Sociais

- [x] **Ordem base aplicada** na home modularizada
- [x] **Ajustar encaixe final** entre CTA YouTube e footer/redes

---

### 🎨 PRIORIDADE 2 - MainCategories (Cards Retangulares)

#### 3. Cards Retangulares com Foto + Texto Sobreposto
- [x] **Layout:** Estrutura com fundo + texto sobreposto implementada
- [x] **Referência:** Cooked & Loved (DINNER / SALADS / APPETIZERS / CHICKEN)
- [x] **Aspect Ratio:** Retangular vertical (3:4)
- [x] **Conteúdo:**
  - [x] Nome da categoria em branco
  - [x] Contagem de receitas
  - [x] Imagem/foto real no lugar dos placeholders (Pronto para receber fotos premium)
- [x] **Hover:** Estrutura com zoom/elevação refinada
- [x] **Categorias:** Air Fryer, Frango, Doces, Massas
- [x] **Imagens premium:** movidas para `public/images/recipes/featured/`
- [ ] **Avaliação visual:** revisar no navegador se as 4 imagens têm bom corte em desktop e mobile

---

### 🎯 PRIORIDADE 3 - Categories (Ícones Minimalistas)

#### 4. Ícones em Linha Horizontal
- [x] **Estilo:** Ícones em estilo 'fill' (Phosphor)
- [x] **Tamanho:** Ajustados para faixa 64px-80px
- [x] **Cor:** Ícones claros sobre o bloco azul inicial, com hover laranja
- [x] **Título:** Abaixo do ícone
- [x] **Layout:** Linha horizontal com scroll horizontal
- [x] **Hover:** Zoom e elevação suave
- [x] **Categorias:** Pudim, Frango, Carnes, Massas, Saladas, Doces, Salgados, Bebidas, Todas categorias
- [x] **Página:** `/categorias` criada como índice próprio, diferente de `/receitas`
- [ ] **Avaliação visual:** decidir se os ícones atuais comunicam bem cada categoria após teste no navegador

---

### 🍳 PRIORIDADE 4 - Cards de Receitas

#### 5. Card de Receita - Novo Design
- [x] **Layout:** Imagem domina o card
- [x] **Transparência:** Refinar fundo translúcido/gradiente na parte inferior (Aplicado gradiente preto suave)
- [x] **Conteúdo (de baixo para cima):**
  1. [x] Imagem como área principal
  2. [x] Tempo e dificuldade sobrepostos
  3. [x] Título da receita
  4. [x] Sem preview de descrição
  5. [x] Sem botão "Ver Receita"
- [x] **Hover:** Zoom na imagem + elevação do card (-2px)
- [x] **Unificação:** Estrutura alinhada entre "Populares" e "Novas"
- [x] **Limite Home:** 2 linhas de populares e 1 linha de novidades
- [x] **Imagem:** cards usam `next/image` quando há `recipe.image`

---

### 🎠 PRIORIDADE 5 - Meus Links (Carrossel)

#### 6. Carrossel de Cards
- [x] **Layout:** Faixa horizontal implementada
- [x] **Cards:** Direção visual premium consolidada
- [x] **Destaques Fixos:**
  - Dicas & Ofertas (primeiro)
  - DAMIE - Cupom CECILIA12 (segundo)
  - E-book Air Fryer (terceiro)
- [x] **Futuros:** Mais cards serão adicionados
- [x] **Navegação:** Setas de navegação desktop adicionadas
- [x] **Responsivo:** Snap scroll mobile + setas desktop
- [ ] **Avaliação visual:** validar se a seção ficou enxuta o suficiente e se a ordem dos cards é a ideal

---

### 📱 PRIORIDADE 6 - Footer + Redes Sociais

#### 7. CTA Redes Sociais no Footer
- [x] **Ideia:** Unificado com a seção CTA YouTube para fluxo contínuo
- [x] **Alternativa:** Ícones sociais discretos e circulares no footer
- [x] **Local:** Seção CTA seguida imediatamente pelo Footer (sem borda divisória)
- [x] **Conteúdo:**
  - [x] Instagram
  - [x] YouTube
  - [x] TikTok
  - [x] Facebook
  - [x] Kwai
- [x] **Decisão concluída:** Fluxo unificado entre vídeos e links institucionais
- [ ] **Avaliação visual:** confirmar se o footer azul + CTA final estão com espaçamento correto no navegador

---

## 📝 RESUMO DAS MUDANÇAS

### O que mudar:
| Seção | Mudança |
|-------|---------|
| TopBar | Ajustes finais apenas se houver conflito visual com header |
| MainCategories | Trocar placeholders por fotos/imagens finais |
| Categories | Refinar ícones/arte se necessário |
| Receitas | Refinar visual final do card |
| Meus Links | Melhorar navegação do carrossel |
| Footer | Fechar direção final do CTA social |

---

## ✅ DECISÕES APROVADAS

### 1. PopularRecipes
- [x] `Nova` deve ficar no topo da imagem, de forma discreta
- [x] `Tempo` e `dificuldade` devem ficar no rodapé da imagem
- [x] O título deve ficar abaixo da imagem, sozinho e alinhado à esquerda
- [x] A direção visual deve ser mais premium/editorial, próxima de `Cooked & Loved`
- [x] O hover deve ser mais dinâmico, com zoom suave, leve elevação e mais contraste
- [x] O layout deve ser pensado para foto real do prato, não bloco de cor

### 2. Footer
- [x] O footer deve ser mais enxuto, útil e editorial
- [x] A mesma logo do header deve aparecer no footer em versão menor
- [x] Os ícones de redes sociais devem ser mais discretos
- [x] A cor principal dos destaques e ícones sociais no footer deve seguir o laranja da marca
- [x] O link para `Media Kit` deve entrar no footer
- [x] A estrutura deve priorizar clareza, marca e utilidade, sem excesso de colunas

### 3. MyLinks
- [x] A seção deve seguir uma direção editorial premium
- [x] A seção deve ser preparada para crescer com `Dicas`, `DAMIE`, `E-book Air Fryer` e futuros subdomínios/projetos
- [x] Os cards devem parecer destinos/projetos da marca, não apenas links promocionais
- [x] A linguagem visual deve ser mais sofisticada e menos baseada em gradientes fortes
- [x] O comportamento deve continuar horizontal, mas com aparência de vitrine curada

### 4. Arquitetura Visual da Home e Páginas Internas
- [x] A home deve trabalhar com duas grandes famílias de fundo, evitando excesso de trocas visuais
- [x] O bloco inicial da home deve usar o azul do header como base visual
- [x] O footer também deve voltar para o fundo azul, alinhado à identidade do header
- [x] O restante da home deve ser equilibrado com uma segunda cor principal, mais clara
- [x] A linguagem de hover deve virar sistema global para cards e elementos interativos
- [x] Páginas de `receitas` e `análises/reviews` devem manter `header` e `footer` em azul
- [x] O conteúdo central das páginas internas deve usar a segunda cor principal como base

---

## 🎯 FILA IMEDIATA DE IMPLEMENTAÇÃO

1. Revisar visual da home no navegador com as imagens finais dos 4 cards principais e das 7 receitas visíveis
2. Ajustar corte, altura e contraste dos cards principais e cards de receita se necessário
3. Validar placeholders nos cards de receitas sem imagem própria
4. Estruturar pelo menos 5 reviews/análises reais
5. Preparar checkpoint de commit quando a revisão visual estiver aprovada

### O que manter:
- Hero (apresentação)
- Seção de Ofertas
- CTA YouTube (pode ir para footer)

---

## 🎯 PRIORIDADES GERAIS (Pós-Refatoração)

### 💎 PRIORIDADE 0 - SEO & TAXONOMIA (Concluído Batch 1)
- [x] **Padronização de Categorias:** Unificadas em `data.ts` (Saudáveis, Carnes, Bolos Caseiros, etc.)
- [x] **JSON-LD Recipe Schema:** Implementado em `src/app/receitas/[slug]/page.js` para reconhecimento do Google
- [x] **Metadados Otimizados:** Canonical tags e OpenGraph images configurados dinamicamente
- [x] **Time ISO 8601:** Conversão automática para tempo de preparo/cozimento no schema
- [x] **Correção de schema:** removidos `datePublished` e `aggregateRating` fictícios; mantido `mainEntityOfPage`

### ✅ Itens já resolvidos desta etapa
- [x] **7 imagens prioritárias da home:** criadas, movidas e ligadas no `src/lib/data.ts`
- [x] **Revisão editorial em lote:** 190 receitas com descrições, preparo, `searchTerms` e `tags`
- [x] **Categorias técnicas finais:** categorias principais unificadas em `data.ts`
- [x] **SEO/schema base:** JSON-LD Recipe, canonical dinâmico, OpenGraph e fallback de imagem implementados
- [x] **Ofertas reais na home:** últimos posts do Dicas consumidos via JSON público com fallback local
- [x] **Validação técnica atual:** `npm run lint` e `npm run build` passando

### ⏳ Pendências reais para versão final
- [ ] **Revisão visual no navegador:** cortes dos 4 cards principais, imagens das receitas da home, placeholders, espaçamentos, footer/CTA e responsivo mobile
- [x] **Revisão das subpáginas do domínio principal:** avaliar `/categorias`, `/receitas`, `/reviews`, `/sobre`, `/faqs` e `/contato` em desktop/mobile
- [x] **Páginas institucionais a finalizar:** concluir conteúdo e layout de FAQ e Contato antes do deploy público
- [ ] **Contato - envio real:** hoje o formulário simula sucesso; decidir se será `mailto`, endpoint próprio ou formulário externo antes do deploy público
- [x] **Base de Analytics preparada:** GA4 no layout, eventos `view_recipe`/`click_offer`, `GA_PROPERTY_ID=468316875` documentado, script `npm run update:popular-recipes` e fallback editorial
- [ ] **Posts populares reais:** ativar Analytics/Search Console como fonte aprovada após acumular 15-30 dias de dados; manter curadoria manual até lá
- [ ] **Duplicatas editoriais:** revisar receitas parecidas por conteúdo/título, não apenas IDs ou slugs
- [ ] **Próxima leva de imagens:** priorizar cerca de 30 receitas com maior potencial; item desejável, não bloqueia o lançamento e deve ficar perto do fim do checklist
- [x] **Reviews:** base estruturada com análises e posts editoriais em `/reviews/[slug]`
- [ ] **SEO/deploy final:** Search Console, Analytics, sitemap/robots finais, checkpoint de commit, push e deploy Hostinger Node.js
- [ ] **Variáveis de ambiente na Hostinger:** replicar as envs do `.env.local` no painel Node.js da Hostinger; `.env.local` não é commitado nem enviado ao servidor

### 🔥 ALTA PRIORIDADE

#### 1. Finalização Editorial e SEO do Conteúdo
- [x] **Mineração inicial:** primeira varredura do `docs/receitas.txt` concluída e receitas úteis estruturadas em `src/lib/data.ts`
- [x] **Batch 2 Editorial:** base revisada em lote; 190 receitas com descrições, instruções, `searchTerms` e `tags`
- [x] **Primeira leva home:** 12 receitas visíveis na home revisadas em descrição, categorias e SEO completo
- [x] **Imagens - etapa 1 parcial:** placeholders e imagens premium iniciais adicionados em `public/images/recipes/`
- [x] **Imagens - etapa 1:** fallback por categoria funcionando com placeholders e imagens editoriais específicas
- [x] **Imagens - etapa 2 / home:** 7 imagens próprias das receitas visíveis na home criadas e ligadas no `src/lib/data.ts`
- [ ] **Imagens - etapa 2 / próximas:** gerar imagens com IA para receitas populares/novas fora da primeira dobra; desejável, não obrigatório para colocar o site novo no ar
- [x] **Ajustar searchTerms:** todas as 190 receitas possuem `searchTerms` e `tags`
- [x] **Duplicatas técnicas:** sem IDs duplicados e sem slugs duplicados
- [ ] **SEO/schema fino:** validar sitemap, Search Console e SEO dinâmico nas listagens
- [ ] **Duplicatas editoriais:** revisar possíveis receitas parecidas por título/conteúdo, não apenas slug
- [x] **Critério técnico atual:** `npm run build` passando

#### 1.1 Plano de Imagens das Receitas
- [x] **Decisão aprovada:** não há fotos reais disponíveis no momento; usar IA e placeholders editoriais como base inicial
- [x] Criar estrutura de pastas em `public/images/recipes/` por categoria e `featured`
- [x] Definir um padrão visual único para imagens IA: fotografia editorial de comida caseira, luz natural, fundo claro/quente, sem texto na imagem, sem mãos ou rostos, proporção reaproveitável nos cards
- [x] Criar placeholders iniciais por categoria com visual premium e consistente, evitando blocos de cor simples
- [x] Completar placeholders/imagens fallback para categorias recorrentes principais
- [x] Mapear receitas sem imagem em `docs/REVISAO-CONTEUDO-IMAGENS.md`
- [ ] Priorizar primeiro cerca de 30 imagens próprias: home, populares, novas, categorias principais e receitas com maior potencial de busca
- [ ] Para cada imagem adicionada, revisar também `title`, `description`, `categories`, `searchTerms`, `tags` e `imageAlt`
- [ ] Depois, substituir por frames reais de YouTube/Instagram/TikTok quando houver vídeo correspondente e qualidade suficiente

#### 2. Conteúdo Real
- [x] 10-20 receitas completas
- [x] Blocos de receitas sincronizados em `src/lib/data.ts`: massas, air fryer, bolos, doces, salgados, sobremesas e internacional
- [x] Evitar duplicidades já identificadas: `bolo-de-fuba-ervadoce.md` é variação duplicada do bolo de fubá com erva-doce; naan, tacos e temaki já existiam no `data.ts`
- [x] Inventário inicial de receitas pendentes criado em `docs/RECEITAS-INVENTARIO.md`
- [x] Primeira varredura de mineração do `docs/receitas.txt` concluída por blocos
- [x] Base de reviews/análises estruturada, incluindo reviews de produtos e posts editoriais
- [x] Foto real da Cecília adicionada ao Hero
- [x] Primeira leva de imagens de receitas por IA adicionada e ligada ao `src/lib/data.ts`
- [ ] Completar imagens próprias de receitas por IA/frames, avançando para próximas populares e receitas com maior potencial de busca

#### 3. Finalização da Home
- [x] Refinar cards de receitas
- [x] Refinar carrossel de Meus Links
- [x] Fechar footer/redes sociais em direção inicial
- [x] Substituir placeholders principais por imagens premium
- [ ] Revisão visual final em navegador, desktop e mobile

#### 4. Deploy
- [x] Build local: `npm run build`
- [ ] Push GitHub
- [ ] Hostinger Node.js Web App
- [ ] DNS + SSL

#### 5. SEO Básico
- [ ] Google Analytics
- [ ] Google Search Console
- [ ] Meta tags verificadas
- [ ] Sitemap.xml / robots.txt finais
- [x] LLMs.txt para descoberta por ferramentas de IA no site Next.js final
- [x] Fonte real para ofertas da home: consumir últimos posts do `dicas.emcasacomcecilia.com` via JSON público com fallback local
- [x] Popularidade real preparada: `public/data/popular-recipes.json`, script de cron e envs documentadas em `docs/ANALYTICS-POPULARIDADE.md`
- [ ] Popularidade real ativação: depois de 15-30 dias online, rodar cron, revisar o primeiro ranking e só então ativar `GA_POPULAR_RECIPES_ENABLED=true` na Hostinger

---

### ⚡ MÉDIA PRIORIDADE

#### 5. Migração gradual de `.js` para `.tsx`
- [ ] **Objetivo:** permitir que TypeScript valide props, dados compartilhados e rotas principais do projeto
- [ ] **Impacto estimado:** baixo/médio se feito em etapas; não é bloqueio para finalizar o visual da home
- [ ] **Pré-requisito:** criar/configurar `tsconfig.json` sem quebrar o alias `@/`
- [ ] **Etapa 1 - componentes compartilhados:**
  - [ ] Migrar `src/components/Navbar.js` para `Navbar.tsx`
  - [ ] Migrar `src/components/Footer.js` para `Footer.tsx`
  - [ ] Migrar `src/components/OmniSearch.js` para `OmniSearch.tsx`
  - [ ] Tipar props do `OmniSearch` usando a interface `Recipe` de `src/lib/data.ts`
- [ ] **Etapa 2 - rotas principais:**
  - [ ] Migrar `src/app/layout.js` para `layout.tsx`
  - [ ] Migrar `src/app/page.js` para `page.tsx`
  - [ ] Migrar `src/app/receitas/page.js` para `page.tsx`
  - [ ] Migrar `src/app/receitas/[slug]/page.js` para `page.tsx`
  - [ ] Migrar `src/app/reviews/page.js` para `page.tsx`
- [ ] **Etapa 3 - páginas institucionais:**
  - [ ] Migrar `src/app/sobre/page.js` para `page.tsx`
  - [ ] Migrar `src/app/contato/page.js` para `page.tsx`
  - [ ] Migrar `src/app/faqs/page.js` para `page.tsx`
- [ ] **Validação obrigatória a cada etapa:** rodar `npm run build`
- [ ] **Cuidado:** não misturar essa migração com mudanças visuais grandes; fazer em commits separados

#### 6. Melhorias Cooked & Loved
- [ ] Cook Mode + Timer
- [ ] Print-friendly layout
- [ ] Newsletter sidebar
- [ ] Sistema de ratings

#### 7. Funcionalidades Sociais
- [ ] Comentários
- [ ] Compartilhar (WhatsApp, Pinterest)
- [ ] "Fiz essa receita!"

---

### 📊 PRIORIDADE 4 - Métricas & Popularidade
- [ ] **Configurar Google Analytics:** Essencial para rastrear acessos e comportamento.
- [ ] **Integração Search Console:** Monitorar o ranqueamento das 215 receitas.
- [ ] **Popularidade Real:** Avaliar dados após 15-30 dias online para automatizar a ordenação dos "Mais Amados"; até lá, manter a curadoria manual no `data.ts`.

---

### 🔮 BAIXA PRIORIDADE (Futuro)

#### 7. Backend & CMS
- [ ] CMS (Strapi, Sanity, Contentful)
- [ ] Database para receitas
- [ ] API formulário contato

#### 8. Melhorias de Interface e UX
- [ ] **Sistema de Múltiplas Fotos (Shuffle):** Implementar lógica para que os cards de categoria/receita exibam diferentes versões da imagem (ex: Frango.jpg, Frango 2.jpg) de forma aleatória ao carregar a página ou em intervalos de tempo.
- [ ] YouTube API
- [ ] Instagram feed
- [ ] Email marketing

---

## 🐛 BUGS/ISSUES

- [x] TopBar abaixo do Header
- [x] Cards de receitas receberam acabamento visual final inicial
- [ ] Validar cortes das imagens reais nos cards da home e da listagem

---

## 💡 ANOTAÇÕES

### Referências Visuais
- **Cooked & Loved:** Layout limpo, cards minimalistas
- **MainCategories:** Foto + texto sobreposto
- **Categories:** Ícones cinza minimalistas
- **Cards Receita:** Imagem 70-80%, transparência

### Decisões Pendentes
- [ ] Confirmar cortes finais das 4 imagens premium dos cards principais
- [ ] Confirmar se a seção CTA YouTube deve permanecer antes do footer no formato atual
- [ ] Definir ordem final e quantidade de cards no carrossel Meus Links conforme novos projetos

---

**Última atualização:** 24 Abr 2026
**Próxima ação:** fechar o escopo atual de `/receitas` ou migrar para o novo tema/escopo decidido na conversa
