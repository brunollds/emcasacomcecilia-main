# 🚀 Próximos Passos - Em Casa com Cecília

**Data:** 03 Abr 2026
**Status:** Refatoração Home Page em andamento - aproximação da versão final

---

## 📋 TAREFAS PENDENTES (Home Page)

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
8. Ofertas
9. Footer + CTA Redes Sociais

- [x] **Ordem base aplicada** na home modularizada
- [ ] **Ajustar encaixe final** entre CTA YouTube e footer/redes

---

### 🎨 PRIORIDADE 2 - MainCategories (Cards Retangulares)

#### 3. Cards Retangulares com Foto + Texto Sobreposto
- [x] **Layout:** Estrutura com fundo + texto sobreposto implementada
- [ ] **Referência:** Cooked & Loved (DINNER / SALADS / APPETIZERS / CHICKEN)
- [x] **Aspect Ratio:** Retangular vertical (3:4)
- [ ] **Conteúdo:**
  - [x] Nome da categoria em branco
  - [x] Contagem de receitas
  - [ ] Imagem/foto real no lugar dos placeholders
- [x] **Hover:** Estrutura com zoom/elevação já iniciada
- [x] **Categorias:** Doces, Salgados, Massas, Carnes

---

### 🎯 PRIORIDADE 3 - Categories (Ícones Minimalistas)

#### 4. Ícones em Linha Horizontal
- [x] **Estilo:** Ícones em cinza
- [x] **Tamanho:** Ajustados para faixa 64px-80px
- [x] **Cor:** Cinza
- [x] **Título:** Abaixo do ícone
- [x] **Layout:** Linha horizontal com scroll horizontal
- [x] **Hover:** Destaque leve
- [x] **Categorias:** Expandido além das 4 principais

---

### 🍳 PRIORIDADE 4 - Cards de Receitas

#### 5. Card de Receita - Novo Design
- [x] **Layout:** Imagem domina o card
- [ ] **Transparência:** Refinar fundo translúcido/gradiente na parte inferior
- [ ] **Conteúdo (de baixo para cima):**
  1. [x] Imagem como área principal
  2. [x] Tempo e dificuldade sobrepostos
  3. [x] Título da receita
  4. [x] Sem preview de descrição
  5. [x] Sem botão "Ver Receita"
- [ ] **Hover:** Refinar zoom + elevação no padrão final
- [x] **Unificação:** Estrutura alinhada entre "Populares" e "Novas"

---

### 🎠 PRIORIDADE 5 - Meus Links (Carrossel)

#### 6. Carrossel de Cards
- [x] **Layout:** Faixa horizontal implementada
- [x] **Cards:** Direção visual iniciada
- [x] **Destaques Fixos:**
  - Dicas & Ofertas (primeiro)
  - DAMIE - Cupom CECILIA12 (segundo)
- [ ] **Futuros:** Mais cards serão adicionados
- [ ] **Navegação:** Evoluir para setas ou drag mais refinado
- [x] **Responsivo:** Base atende mobile e desktop

---

### 📱 PRIORIDADE 6 - Footer + Redes Sociais

#### 7. CTA Redes Sociais no Footer
- [ ] **Ideia:** Últimos posts do Instagram (rede principal)
- [x] **Alternativa:** CTA menor para seguir nas redes já foi implementado parcialmente
- [ ] **Local:** Footer ou antes do footer
- [ ] **Conteúdo:**
  - [x] Instagram
  - [x] YouTube
  - [x] TikTok
  - [x] Facebook
  - [x] Kwai
- [ ] **Decisão pendente:** Avaliar se mantém ou remove

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

### O que manter:
- Hero (apresentação)
- Seção de Ofertas
- CTA YouTube (pode ir para footer)

---

## 🎯 PRIORIDADES GERAIS (Pós-Refatoração)

### 🔥 ALTA PRIORIDADE

#### 1. Conteúdo Real
- [ ] 10-20 receitas completas
- [ ] 5 reviews de produtos
- [ ] Fotos reais da Cecília
- [ ] Imagens de receitas

#### 2. Finalização da Home
- [ ] Refinar cards de receitas
- [ ] Refinar carrossel de Meus Links
- [ ] Fechar footer/redes sociais
- [ ] Substituir placeholders principais

#### 3. Deploy
- [ ] Build local: `npm run build`
- [ ] Push GitHub
- [ ] Hostinger Node.js Web App
- [ ] DNS + SSL

#### 4. SEO Básico
- [ ] Google Analytics
- [ ] Google Search Console
- [ ] Meta tags verificadas
- [ ] Sitemap.xml

---

### ⚡ MÉDIA PRIORIDADE

#### 5. Melhorias Cooked & Loved
- [ ] Cook Mode + Timer
- [ ] Print-friendly layout
- [ ] Newsletter sidebar
- [ ] Sistema de ratings

#### 6. Funcionalidades Sociais
- [ ] Comentários
- [ ] Compartilhar (WhatsApp, Pinterest)
- [ ] "Fiz essa receita!"

---

### 🔮 BAIXA PRIORIDADE (Futuro)

#### 7. Backend & CMS
- [ ] CMS (Strapi, Sanity, Contentful)
- [ ] Database para receitas
- [ ] API formulário contato

#### 8. Integrações
- [ ] YouTube API
- [ ] Instagram feed
- [ ] Email marketing

---

## 🐛 BUGS/ISSUES

- [x] TopBar abaixo do Header
- [ ] Cards de receitas precisam de acabamento visual final

---

## 💡 ANOTAÇÕES

### Referências Visuais
- **Cooked & Loved:** Layout limpo, cards minimalistas
- **MainCategories:** Foto + texto sobreposto
- **Categories:** Ícones cinza minimalistas
- **Cards Receita:** Imagem 70-80%, transparência

### Decisões Pendentes
- [ ] Manter CTA Instagram no footer?
- [ ] Quantos cards no carrossel Meus Links?
- [ ] Imagens reais ou placeholders temporários?

---

## 📊 STATUS ATUAL

| Área | Status |
|------|--------|
| TopBar | ✅ Implementado |
| MainCategories | ⏳ Estrutura pronta, faltam imagens finais |
| Categories | ✅ Implementado |
| Hero | ⏳ Bom nível visual, ainda com placeholder |
| Cards Receita | ⏳ Estrutura nova pronta, faltam refinamentos |
| Meus Links | ⏳ Carrossel básico pronto, faltam melhorias |
| Ofertas | ✅ Implementado na nova home |
| Footer | ⏳ Parcial, falta decisão final |

---

**Última atualização:** 03 Abr 2026
**Próxima ação:** Commit checkpoint + refinamento dos cards de receita, MyLinks e footer
