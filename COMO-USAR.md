# 🚀 Como Usar - Em Casa com Cecília

Guia prático para usar, personalizar e fazer deploy do site!

---

## 📖 Índice

1. [Primeiros Passos](#primeiros-passos)
2. [Personalização](#personalização)
3. [Adicionando Conteúdo](#adicionando-conteúdo)
4. [Deploy](#deploy)
5. [Manutenção](#manutenção)

---

## 🎯 Primeiros Passos

### 1. Testar Localmente

```bash
cd emcasacomcecilia
npm install
npm run dev
```

Abra: **http://localhost:3000**

### 2. Navegar pelo Site

Todas as páginas estão funcionando:
- **Home:** `/`
- **Receitas:** `/receitas`
- **Receita Individual:** `/receitas/1` (exemplo)
- **Reviews:** `/reviews`
- **Sobre:** `/sobre`
- **Contato:** `/contato`
- **FAQs:** `/faqs`

---

## 🎨 Personalização

### Mudar Cores

Edite: `src/app/globals.css`

```css
:root {
  --verde-escuro: #1a4d2e;  /* Sua cor aqui */
  --laranja: #ff6b35;       /* Sua cor aqui */
  --amarelo: #ffd700;       /* Sua cor aqui */
  --preto: #0f1419;         /* Sua cor aqui */
  --branco: #ffffff;        /* Sua cor aqui */
}
```

### Mudar Informações Gerais

Edite: `src/app/layout.js`

```javascript
export const metadata = {
  title: "Seu Título Aqui",
  description: "Sua descrição aqui",
  keywords: ["palavra1", "palavra2"],
};
```

### Mudar Links Sociais

Edite: `src/components/Footer.js`

Procure pelas URLs:
```javascript
href="https://youtube.com/@seucanal"
href="https://instagram.com/seuperfil"
href="mailto:seu@email.com"
```

---

## 📝 Adicionando Conteúdo

### Adicionar Nova Receita

**Método 1: Mock Data (Temporário)**

Edite: `src/app/receitas/page.js`

```javascript
const receitasDestaque = [
  {
    id: 7,  // Novo ID
    titulo: "Sua Nova Receita",
    descricao: "Descrição da receita",
    categoria: "Doces",
    tempoPreparo: "30 min",
    dificuldade: "Fácil",
    youtubeUrl: "https://youtube.com/watch?v=SEU_VIDEO"
  },
  // ... outras receitas
];
```

E adicione os detalhes em: `src/app/receitas/[id]/page.js`

```javascript
const receitas = {
  7: {
    id: 7,
    titulo: "Sua Nova Receita",
    ingredientes: {
      massa: [
        "Ingrediente 1",
        "Ingrediente 2"
      ]
    },
    modoPreparo: [
      "Passo 1",
      "Passo 2"
    ],
    // ... mais dados
  }
};
```

**Método 2: Conectar a CMS/Database (Recomendado)**

Use um CMS como:
- **Strapi** (gratuito, open-source)
- **Sanity** (gratuito até certo limite)
- **Contentful** (gratuito para projetos pequenos)

Ou um banco de dados:
- **MongoDB** + **Mongoose**
- **PostgreSQL** + **Prisma**
- **Supabase** (gratuito)

---

### Adicionar Novo Review

Edite: `src/app/reviews/page.js`

```javascript
const reviews = [
  {
    id: 7,
    titulo: "Produto X - Review",
    tipo: "Eletrodoméstico",
    nota: 4.5,
    descricao: "Minha análise...",
    dataPublicacao: "22 Jan 2025",
    youtubeUrl: "https://youtube.com/watch?v=SEU_VIDEO",
    pros: ["Pro 1", "Pro 2"],
    contras: ["Contra 1"]
  },
  // ... outros reviews
];
```

---

### Adicionar Nova Pergunta ao FAQ

Edite: `src/app/faqs/page.js`

```javascript
{
  categoria: "Receitas",  // Categoria existente
  perguntas: [
    {
      pergunta: "Sua nova pergunta?",
      resposta: "Sua resposta detalhada aqui."
    },
    // ... outras perguntas
  ]
}
```

Ou crie uma nova categoria:

```javascript
{
  categoria: "Nova Categoria",
  perguntas: [
    {
      pergunta: "Pergunta 1?",
      resposta: "Resposta 1"
    }
  ]
}
```

---

### Adicionar Imagens

1. Coloque imagens em: `public/receitas/` ou `public/reviews/`

2. Use Next Image:

```javascript
import Image from 'next/image';

<Image
  src="/receitas/sua-imagem.jpg"
  alt="Descrição"
  width={800}
  height={600}
  className="rounded-lg"
/>
```

---

## 🚀 Deploy

### Opção 1: Hostinger (Recomendado)

Siga: **[DEPLOY-HOSTINGER.md](./DEPLOY-HOSTINGER.md)**

**Resumo:**
```bash
# 1. Build local
npm run build

# 2. Git
git add .
git commit -m "Mensagem"
git push origin main

# 3. No servidor Hostinger (SSH)
npm install
npm run build
```

### Opção 2: Vercel (Mais Fácil)

1. Faça push para GitHub
2. Acesse: https://vercel.com
3. Clique em "Import Project"
4. Selecione seu repositório
5. Deploy automático! ✨

### Opção 3: Netlify

Similar ao Vercel:
1. https://netlify.com
2. "Add new site"
3. Connect to GitHub
4. Deploy!

---

## 🔧 Manutenção

### Atualizar Next.js

```bash
npm install next@latest react@latest react-dom@latest
```

### Atualizar Tailwind

```bash
npm install tailwindcss@latest
```

### Limpar Cache

```bash
rm -rf .next
npm run dev
```

### Verificar Erros

```bash
npm run lint
```

---

## 📊 Analytics & SEO

### Google Analytics

1. Crie uma conta em: https://analytics.google.com
2. Instale:

```bash
npm install @next/third-parties
```

3. Adicione em `src/app/layout.js`:

```javascript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

### Meta Tags Dinâmicas

Para cada página, adicione:

```javascript
export const metadata = {
  title: "Título da Página - Em Casa com Cecília",
  description: "Descrição específica da página",
  openGraph: {
    title: "Título para compartilhar",
    description: "Descrição para compartilhar",
    images: ['/og-image.jpg'],
  }
};
```

---

## 🔌 Integrações Úteis

### Formulário de Contato (Email Real)

**Opção 1: Formspree (Grátis)**

1. Cadastre em: https://formspree.io
2. Pegue o endpoint
3. Em `src/app/contato/page.js`:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch('https://formspree.io/f/SEU_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  if (response.ok) {
    setStatus('sucesso');
  }
};
```

**Opção 2: EmailJS (Grátis)**

Similar ao Formspree, mas com template de emails.

**Opção 3: API Route (Next.js + Nodemailer)**

Mais controle, mas precisa de servidor Node.js.

---

### Newsletter

**Opção 1: Mailchimp**
**Opção 2: ConvertKit**
**Opção 3: ButtonDown**

Todos têm planos gratuitos!

---

### YouTube API

Para buscar vídeos automaticamente:

1. Ative YouTube Data API v3
2. Instale:

```bash
npm install googleapis
```

3. Crie um endpoint para buscar vídeos

---

## 🛡️ Segurança

### Variáveis de Ambiente

Crie: `.env.local`

```env
YOUTUBE_API_KEY=sua_chave_aqui
FORMSPREE_ID=seu_id_aqui
```

**IMPORTANTE:** Nunca commite `.env.local` no Git!

### HTTPS

Certifique-se de usar HTTPS em produção.
Hostinger e Vercel incluem SSL gratuito!

---

## 🐛 Problemas Comuns

### Erro: "Module not found"

```bash
npm install
```

### Build falha

```bash
npm run build
# Leia os erros e corrija
```

### Estilos não aparecem

1. Limpe cache: `rm -rf .next`
2. Rode novamente: `npm run dev`

### Imagens não carregam

Certifique-se que estão em `public/` e use caminhos absolutos: `/imagem.jpg`

---

## 📚 Recursos Úteis

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **React Docs:** https://react.dev

---

## 💡 Dicas Pro

### Performance

1. Use Next Image para todas as imagens
2. Minimize CSS customizado
3. Use componentes client (`'use client'`) apenas quando necessário
4. Implemente lazy loading

### SEO

1. Adicione meta tags em todas as páginas
2. Use títulos descritivos (H1, H2, H3)
3. Adicione alt text em imagens
4. Crie sitemap.xml

### Acessibilidade

1. Use semantic HTML
2. Adicione ARIA labels
3. Teste navegação por teclado
4. Verifique contraste de cores

---

## 🎉 Pronto para Começar!

Você tem tudo que precisa para:
- ✅ Personalizar o site
- ✅ Adicionar conteúdo
- ✅ Fazer deploy
- ✅ Manter atualizado

**Qualquer dúvida, consulte a documentação ou entre em contato!**

---

**Desenvolvido com ❤️ usando Claude Code**
