# Changelog — Em Casa com Cecília

Histórico de versões e mudanças do site `emcasacomcecilia.com`.

---

## [1.3.0] — 2026-04-27 — SEO Avançado
*Commit: `68b6d6d`, `8ed80a1`*

### Adicionado
- **JSON-LD FAQPage** na `/faqs` — perguntas expandíveis nos resultados do Google
- **JSON-LD Organization** em todas as páginas — knowledge panel da marca no Google
- **JSON-LD WebSite + SearchAction** em todas as páginas — caixa de busca nos sitelinks do Google
- **JSON-LD Person** na `/sobre` — Cecília como autora (E-E-A-T)
- **JSON-LD BreadcrumbList** nas páginas de receita e review individuais
- `src/lib/faqData.js` — módulo compartilhado extraído do FaqsClientPage para uso no server component
- Validação confirmada via Google Rich Results Test (`check_circle` — Recipe schema válido)

### Corrigido
- Scripts JSON-LD agora usam `<script>` estático (server-rendered) em vez do componente `<Script>` do Next.js, garantindo presença no HTML inicial

---

## [1.2.0] — 2026-04-27 — Analytics e Rastreamento
*Commits: `b7b8291`, `45151e6`*

### Adicionado
- **Microsoft Clarity** (`r8u956l333`) — heatmaps e gravações de sessão
- **IndexNow** — chave `126de38625a040d1a5e45c6a08aabe46` publicada em `/126de38625a040d1a5e45c6a08aabe46.txt`, notifica Bing, Brave e outros motores automaticamente
- **sitemap.xml** e **robots.txt** gerados pelo Next.js App Router (`src/app/sitemap.ts`, `src/app/robots.ts`) — 208 páginas indexadas pelo Google

---

## [1.1.0] — 2026-04-27 — Versão GOLD (Go-Live)
*Commit: `99cf3b7`*

### Site em produção
- Deploy em `emcasacomcecilia.com` via Hostinger Node.js Web App
- Node.js 20, build com Turbopack, 214 páginas geradas (SSG + SSR)
- HTTPS ativo, backup do site anterior em `backup.emcasacomcecilia.com`
- `.nvmrc` com `20` para forçar Node 20 no Hostinger (Next.js 16 exige ≥20.9.0)

### Bugs corrigidos
- **Ícones do footer** — TikTok e Kwai mostravam ícone do YouTube (campo `icon: 'Video'` trocado para `'TikTok'` e `'Kwai'` em `data.ts`)
- **Formulário de contato** — era simulado com `setTimeout`; substituído por integração real com **Resend** via API route `/api/contact` (envia de `noreply@emcasacomcecilia.com`, `reply-to` do remetente)
- **Botão "Copiar Link"** na receita — não tinha `onClick`; criado `CopyLinkButton.js` como componente client com feedback visual e `navigator.clipboard`
- **Iframe de vídeo** nas receitas — tentava embedar URL do canal em vez de vídeo; agora usa `getYoutubeEmbedUrl()` que só renderiza para URLs com `watch?v=` ou `youtu.be/`
- **Imagem hero** da receita individual — usava `<div style={{ backgroundImage }}>` sem otimização; migrado para `<Image fill priority>` com Next.js Image

### Páginas e componentes
- **`/reviews`** — completamente redesenhada para alinhar ao design do site: hero `bg-[#0f1d3a]` com Leafs flutuantes, filtros funcionais por tipo, cards idênticos ao `ReviewsShowcase`, load more real
- **`/sobre`** — reescrita com 9 seções: Hero, Missão (cecilia-6.jpg), O Que Fazemos, Biografia completa (cecilia-71.jpg), Compromisso (cecilia-88.jpg como fundo), CTA Mídia Kit, Onde Encontrar, Parceiros (19 logos)
- **`/faqs`** — conteúdo real substituindo placeholder; 5 categorias, 23 perguntas com links internos nas respostas
- **`/privacidade`** — expandida de 4 parágrafos genéricos para 10 seções com LGPD completo (base legal, direitos do titular, terceiros, retenção)
- **`/contato`** — reformulado com componente client separado (`ContatoClientPage.js`), metadata canônico

### Imagens e assets
- Fotos da Cecília: `public/images/photos/BRU-1.jpg` (hero), `public/images/about/cecilia/` (cecilia-6, 71, 88)
- Logos de parceiros: `public/images/about/partners/` (19 logos: DAMIE, Shopee, Polishop, Kopenhagen, etc.)
- Hero DAMIE ativado: `public/images/universe/damie-hero.jpg` na seção Universo da Cecília
- `public/llms.txt` — descoberta por ferramentas de IA

### Limpeza e organização
- Removidos: `kimi/`, `temp-tax/`, `data/`, `receitas-antigo.json`, `receitas-novo.json`, WordPress XML (845KB), logs de dev
- `.gitignore` atualizado: configs de IA, docs internos, artefatos de build
- `.env.example` criado com todas as variáveis documentadas

---

## [1.0.0] — 2026-04-03 — Refatoração da Home
*Commit: `b7f5c1b`*

### Adicionado / Alterado
- Home modularizada em seções independentes
- `MainCategories` — 4 cards com imagem real (Air Fryer, Frango, Doces, Massas) e texto sobreposto
- `Categories` — faixa horizontal com ícones estilo fill (Phosphor)
- `PopularRecipes` — cards editorial com imagem dominante, tempo e dificuldade sobrepostos, sem botão "Ver Receita"
- `ReviewsShowcase` — seção de destaque de reviews na home
- `MyLinks` — carrossel DAMIE + Dicas & Ofertas + E-book Air Fryer
- `Offers` — integração real com `dicas.emcasacomcecilia.com/ultimos-posts-dicas.json` (fallback local)
- `CTA` (VideoCarousel) — feed do YouTube via API com fallback para dados estáticos
- Bloco visual inicial em `bg-[#0f1d3a]` unificando Navbar + MainCategories + Categories + Hero

---

## [0.1.0] — 2025 — Commit Inicial
*Commit: `c176b8d`*

### Base do projeto
- **Framework**: Next.js 16.1.4, App Router, SSR (sem `output: 'export'`)
- **Styling**: Tailwind CSS v4 com tokens customizados (`verde-escuro`, `laranja`, `amarelo`, `creme`)
- **Font**: Montserrat via `next/font/google`
- **Dados**: `src/lib/data.ts` — 190+ receitas, reviews, categorias, ofertas, redes sociais
- **Páginas**: `/`, `/receitas`, `/receitas/[slug]`, `/reviews`, `/reviews/[slug]`, `/sobre`, `/contato`, `/faqs`, `/privacidade`, `/categorias`
- **SEO base**: JSON-LD Recipe Schema, Open Graph, Twitter Card, canonical, `metadataBase`
- **Analytics**: GA4 (`G-LDLH63KJMP`) com tracking de `view_recipe` e `click_offer`
- **Receitas**: filtros facetados com sidebar desktop, bottom-sheet mobile, multi-seleção por querystring
- **Hospedagem**: Hostinger Node.js Web App (Business plan)

---

## Pendente (pós v1.3.0)

- [ ] **Pinterest Rich Pins** — conta suspensa, aguardando reativação. Adicionar `<meta name="p:domain_verify">` no `layout.js` e verificar domínio
- [ ] **GA Popular Recipes** — ativar `GA_POPULAR_RECIPES_ENABLED=true` no servidor após 18/Mai/2026 (30 dias de dados reais)
- [ ] **Imagens de receitas** — ampliar de ~60 imagens para cobrir mais das 190 receitas
- [ ] **Sistema de avaliação** — `aggregateRating` no Recipe schema (Google Rich Results)
- [ ] **Migração JS → TSX** — gradual, sem urgência
