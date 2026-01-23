# 🔍 OmniSearch - Sistema de Busca Inteligente

Sistema de busca omnisearch para receitas do Em Casa com Cecília.

---

## 🎯 Funcionalidades

### ✅ Busca em Tempo Real
- **Debounced search** (300ms delay)
- Resultados instantâneos conforme você digita
- Dropdown com preview das receitas

### ✅ Busca Omnisearch (Multifields)
Busca em múltiplos campos:
- ✅ **Título** da receita
- ✅ **Descrição**
- ✅ **Categoria** (Doces, Salgados, etc.)
- ✅ **Dificuldade** (Fácil, Médio, Difícil)
- ✅ **Ingredientes** (massa, cobertura, recheio)
- ✅ **Tags** (se houver)

### ✅ Recursos Avançados
- **Highlight** do termo buscado (marcação em amarelo)
- **Navegação por teclado** (↑ ↓ Enter Esc)
- **Ordenação por relevância** (título > ingredientes > descrição)
- **Limite de 8 resultados** no dropdown
- **Link "Ver todos"** para resultados completos
- **Contador** de resultados encontrados
- **Sem resultados**: Sugestão para enviar receita

---

## 📦 Componente

### Localização
`src/components/OmniSearch.js`

### Props

```javascript
<OmniSearch
  receitas={arrayDeReceitas}      // Array com as receitas
  placeholder="Buscar receitas..."  // Texto do placeholder (opcional)
/>
```

### Exemplo de Uso

```javascript
import OmniSearch from '@/components/OmniSearch';

const receitas = [
  {
    id: 1,
    titulo: "Bolo de Cenoura",
    descricao: "Bolo fofo e úmido",
    categoria: "Doces",
    dificuldade: "Fácil",
    tempoPreparo: "45 min",
    ingredientes: {
      massa: ["3 cenouras", "4 ovos", "..."],
      cobertura: ["chocolate", "..."]
    },
    tags: ["bolo", "cenoura", "chocolate"]
  }
];

<OmniSearch receitas={receitas} />
```

---

## 🎨 Design

### Visual
- Input arredondado (rounded-full)
- Ícone de busca 🔍
- Botão limpar (X)
- Dropdown com sombra
- Cards de resultados com:
  - Emoji/imagem
  - Título (com highlight)
  - Descrição
  - Badges (categoria, tempo, dificuldade)
  - Seta →

### Cores
- Border focus: `#ff6b35` (laranja)
- Highlight: `#ffd700` (amarelo) com texto `#1a4d2e` (verde)
- Background: branco
- Hover: `#f5f5f5`

---

## ⌨️ Navegação por Teclado

| Tecla | Ação |
|-------|------|
| `↓` (Arrow Down) | Próximo resultado |
| `↑` (Arrow Up) | Resultado anterior |
| `Enter` | Abrir receita selecionada |
| `Esc` | Fechar dropdown |

---

## 🔍 Algoritmo de Busca

### 1. Normalização
```javascript
const lowerQuery = searchQuery.toLowerCase().trim();
```

### 2. Filtragem (OR logic)
Receita aparece se o termo estiver em **qualquer** campo:
- Título
- Descrição
- Categoria
- Dificuldade
- Ingredientes (todos juntos)
- Tags

### 3. Ordenação por Relevância
```
Título match → prioridade alta
Ingredientes match → prioridade média
Descrição match → prioridade baixa
```

### 4. Limitação
```javascript
results.slice(0, 8) // Máximo 8 no dropdown
```

---

## 📊 Exemplos de Busca

### Busca por Nome
```
"bolo" → encontra "Bolo de Cenoura", "Bolo de Chocolate"
```

### Busca por Ingrediente
```
"cenoura" → encontra receitas que usam cenoura
"chocolate" → todas com chocolate
```

### Busca por Categoria
```
"doces" → todas as receitas doces
"massas" → todas as massas
```

### Busca por Dificuldade
```
"fácil" → receitas fáceis
"médio" → receitas médias
```

### Busca Combinada
```
"bolo fácil" → bolos fáceis de fazer
```

---

## 🚀 Performance

### Otimizações
- ✅ **Debounce** de 300ms (reduz requests)
- ✅ **Limit** de 8 resultados (renderização rápida)
- ✅ **Close on click outside** (melhora UX)
- ✅ **Keyboard navigation** (acessibilidade)

### Métricas Esperadas
- Busca: < 50ms (local)
- Renderização: < 100ms
- Debounce: 300ms

---

## 🔮 Melhorias Futuras

### Fase 2 (Backend/CMS)
- [ ] Busca no servidor (API)
- [ ] Paginação de resultados
- [ ] Cache de buscas frequentes
- [ ] Analytics de termos buscados
- [ ] Sugestões autocomplete
- [ ] "Você quis dizer..." (typo correction)

### Fase 3 (Avançado)
- [ ] Busca por voz
- [ ] Busca por imagem (upload)
- [ ] Filtros avançados (tempo, calorias, etc.)
- [ ] Busca fuzzy (tolerância a erros)
- [ ] Recomendações baseadas em histórico

---

## 📱 Responsividade

### Mobile
- Input full-width
- Dropdown ajusta automaticamente
- Touch-friendly (sem hover states)

### Desktop
- Máximo 3xl (max-w-3xl)
- Hover effects
- Keyboard navigation

---

## 🐛 Troubleshooting

### Busca não encontra nada
```javascript
// Verifique se as receitas têm os campos corretos:
{
  id: number,
  titulo: string,
  descricao: string,
  categoria: string,
  dificuldade: string,
  tempoPreparo: string,
  ingredientes: { massa: [], cobertura: [] }  // opcional
}
```

### Dropdown não abre
```javascript
// Verifique se o componente é 'use client'
'use client';
```

### Highlight não funciona
```javascript
// Certifique-se que a query não está vazia
if (!query.trim()) return text;
```

---

## 🎓 Como Estender

### Adicionar Novo Campo de Busca

1. Adicione o campo no array de receitas:
```javascript
{
  id: 1,
  titulo: "...",
  tags: ["tag1", "tag2"]  // novo campo
}
```

2. Adicione no filtro:
```javascript
if (receita.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) {
  return true;
}
```

### Mudar Limite de Resultados

```javascript
setResults(sorted.slice(0, 12)); // era 8, agora 12
```

### Adicionar Peso na Ordenação

```javascript
const score = (receita) => {
  if (receita.titulo.toLowerCase().startsWith(lowerQuery)) return 100;
  if (receita.titulo.toLowerCase().includes(lowerQuery)) return 50;
  // ...
};

sorted.sort((a, b) => score(b) - score(a));
```

---

## 📚 Dependências

- **React** (useState, useEffect, useRef)
- **Next.js** (Link)
- **Tailwind CSS** (estilos)

Nenhuma biblioteca externa necessária! 🎉

---

## ✅ Checklist de Implementação

- [x] Componente OmniSearch criado
- [x] Busca em tempo real
- [x] Busca multifields
- [x] Highlight de termos
- [x] Navegação por teclado
- [x] Ordenação por relevância
- [x] Design responsivo
- [x] Integrado na página de Receitas
- [ ] Integrado na Home
- [ ] Analytics de busca
- [ ] Página de resultados completa

---

## 🎉 Status

**✅ OMNISEARCH FUNCIONAL!**

Busca inteligente, rápida e com ótima UX!

---

**Desenvolvido com ❤️ para Em Casa com Cecília**
