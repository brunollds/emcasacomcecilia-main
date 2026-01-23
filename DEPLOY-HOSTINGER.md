# 🚀 Guia de Deploy - Hostinger Git Deploy

## ✅ Projeto Configurado!

**Em Casa com Cecília** está pronto para deploy!

### 🎨 Configurações Atuais
- ✅ **Font:** Montserrat (400, 600, 700, 800)
- ✅ **Cores:**
  - Verde escuro: `#1a4d2e`
  - Laranja: `#ff6b35`
  - Amarelo: `#ffd700`
  - Preto: `#0f1419`
  - Branco: `#ffffff`
- ✅ **Framework:** Next.js 16.1.4
- ✅ **Styling:** Tailwind CSS v4
- ✅ **Home Page:** Pronta com hero section e seções

---

## 📋 PASSO A PASSO - DEPLOY

### 1️⃣ Testar Localmente

O servidor já está rodando em: **http://localhost:3000**

Abra no navegador para ver o resultado!

---

### 2️⃣ Fazer Build Local

```bash
cd emcasacomcecilia
npm run build
```

**IMPORTANTE:** Verifique se o build passa sem erros antes de fazer deploy!

---

### 3️⃣ Inicializar Git (se ainda não fez)

```bash
cd emcasacomcecilia
git init
git add .
git commit -m "🎉 Initial commit: Em Casa com Cecília - Next.js + Tailwind + Montserrat"
```

---

### 4️⃣ Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Nome do repositório: `emcasacomcecilia-main`
3. **Deixe PRIVADO** (se quiser) ou PÚBLICO
4. **NÃO** adicione README, .gitignore ou LICENSE (já temos!)
5. Clique em **Create repository**

---

### 5️⃣ Conectar e Fazer Push

```bash
git remote add origin https://github.com/brunollds/emcasacomcecilia-main.git
git branch -M main
git push -u origin main
```

---

### 6️⃣ Configurar na Hostinger

#### No hPanel (Painel Hostinger):

1. **Sites** → **Gerenciar** → **Git** (sidebar esquerda)
2. Clique em **"Criar um Novo Repositório"**
3. Preencha:
   ```
   📦 Endereço do Repositório:
   https://github.com/brunollds/emcasacomcecilia-main

   🌿 Ramo (Branch):
   main

   📁 Caminho de Instalação:
   (DEIXAR VAZIO! Vai instalar em /public_html/)
   ```
4. Clique em **"Implantar"**
5. Aguarde a implantação (1-3 minutos)

---

### 7️⃣ Build no Servidor Hostinger

Após o deploy, você precisa fazer o build no servidor:

1. **No hPanel:** Sites → Gerenciar → **Terminal** (ou SSH)
2. Execute:

```bash
cd public_html
npm install
npm run build
```

**IMPORTANTE:** Sempre que fizer mudanças, rode `npm run build` novamente!

---

### 8️⃣ Ativar Implantação Automática (Webhook)

#### Na Hostinger:
1. Ainda na tela do Git Deploy
2. Ative **"Implantação Automática"**
3. Copie a **URL do Webhook** que aparece

#### No GitHub:
1. Vá para: https://github.com/brunollds/emcasacomcecilia-main/settings/hooks
2. Clique em **"Add webhook"**
3. Preencha:
   ```
   Payload URL: (cole a URL do Webhook da Hostinger)
   Content type: application/json
   Events: ✅ Just the push event
   Active: ✅
   ```
4. Clique em **"Add webhook"**

---

## 🔄 Workflow de Desenvolvimento

Agora, toda vez que você fizer mudanças:

```bash
# 1. Fazer alterações nos arquivos
# 2. Testar localmente
npm run dev

# 3. Build local para testar
npm run build

# 4. Commit e push
git add .
git commit -m "✨ Descrição das mudanças"
git push

# 5. (Automático) Webhook dispara deploy na Hostinger
# 6. (Manual) Fazer build no servidor Hostinger via SSH:
npm run build
```

---

## ⚠️ IMPORTANTE - Build na Hostinger

### Por que preciso fazer `npm run build` no servidor?

- Next.js precisa compilar as páginas para produção
- A pasta `.next/` contém o build otimizado
- Sem o build, o site não vai funcionar corretamente

### Automação (Opcional - Avançado)

Você pode criar um script no servidor que faz o build automaticamente após cada push. Mas por enquanto, faça manualmente:

```bash
# SSH na Hostinger
cd public_html
git pull origin main
npm install
npm run build
```

---

## 🎯 Próximos Passos

1. ✅ **Testar localmente** - http://localhost:3000
2. ✅ **Fazer build** - `npm run build`
3. ✅ **Push para GitHub**
4. ✅ **Configurar Git Deploy na Hostinger**
5. ✅ **Build no servidor**
6. ✅ **Ativar webhook** (deploy automático)

---

## 📦 Estrutura do Projeto

```
emcasacomcecilia/
├── src/
│   ├── app/
│   │   ├── layout.js        # Layout principal (Montserrat)
│   │   ├── page.js          # Home page
│   │   └── globals.css      # Cores Cecília
├── public/                  # Imagens e assets
├── .gitignore              # Configurado para Hostinger
├── package.json
├── next.config.mjs
└── postcss.config.mjs
```

---

## 🐛 Troubleshooting

### Erro: "Module not found"
```bash
npm install
```

### Site não atualiza após push
```bash
# SSH na Hostinger
cd public_html
git pull origin main
npm run build
```

### Erro de build
- Verifique se fez `npm install` no servidor
- Verifique os logs no Terminal da Hostinger
- Teste o build localmente primeiro

---

## 🎉 Pronto!

Seu site **Em Casa com Cecília** está pronto para o mundo!

**URL:** https://emcasacomcecilia.com (após configurar DNS)

---

**Feito com ❤️ e Claude Code**
