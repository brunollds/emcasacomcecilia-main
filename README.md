# Em Casa com Cecília

Site oficial do canal **Em Casa com Cecília** - Receitas deliciosas, reviews sinceras e muito sabor!

## Sobre o Projeto

Site desenvolvido em Next.js para compartilhar receitas caseiras, análises de produtos e conteúdo culinário.

### Tecnologias

- **Framework:** Next.js 16.1.4 (App Router + SSR)
- **Styling:** Tailwind CSS v4
- **Font:** Montserrat (400, 600, 700, 800)
- **Deploy:** Hostinger (Node.js Web App)

### Paleta de Cores

```css
Verde escuro: #1a4d2e (primary)
Laranja:      #ff6b35 (secondary)
Amarelo:      #ffd700 (accent)
Preto:        #0f1419 (backgrounds)
Branco:       #ffffff
```

## Desenvolvimento Local

### Requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/brunollds/emcasacomcecilia-main.git
cd emcasacomcecilia-main

# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run start    # Servidor de produção
npm run lint     # ESLint
```

## Estrutura do Projeto

```
emcasacomcecilia/
├── src/
│   └── app/
│       ├── layout.js       # Layout principal (Montserrat + metadata)
│       ├── page.js         # Home page
│       └── globals.css     # Cores e estilos globais
├── public/                 # Assets estáticos
├── .gitignore             # Configurado para Hostinger
└── package.json
```

## Deploy na Hostinger

O site roda como **Node.js Web App** com SSR, e o deploy usa o build gerenciado da Hostinger,
sempre com decisão do Bruno. O passo a passo está em **[docs/DEPLOY-GUIDE.md](./docs/DEPLOY-GUIDE.md)**.

### Resumo Rápido

1. Num clone limpo da `main`, pelo PowerShell: `npm run deploy:prepare`
2. Envio do archive pelo MCP da Hostinger, até o build ficar `completed`
3. `npm run deploy:finish` com o SHA, o deploy UUID e o build UUID

O antigo [DEPLOY-HOSTINGER-NODEJS.md](./DEPLOY-HOSTINGER-NODEJS.md), com Git Deploy e build por SSH,
fica só como histórico.

## Páginas Criadas ✅

- [x] **Home** - Hero, receitas destaque, sobre
- [x] **Receitas** - Lista com filtros e categorias
- [x] **Receita Individual** - Ingredientes, preparo, dicas
- [x] **Reviews** - Análises com sistema de estrelas
- [x] **Sobre** - História, valores, estatísticas
- [x] **Contato** - Formulário + links sociais
- [x] **FAQs** - 20+ perguntas organizadas

## Próximos Passos

- [ ] Adicionar conteúdo real (receitas, reviews)
- [ ] Adicionar imagens profissionais
- [ ] Integração com YouTube API
- [ ] Sistema de busca
- [ ] Newsletter
- [ ] Google Analytics

## Licença

© 2025 Em Casa com Cecília. Todos os direitos reservados.

---

**Feito com ❤️ e Claude Code**
