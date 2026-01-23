# 🚀 Deploy DEFINITIVO - Hostinger Node.js Web App

**Guia completo e correto para deploy de Next.js na Hostinger usando Node.js Web Apps**

---

## 🎯 Entendendo a Arquitetura

### O que a Hostinger oferece:

```
✅ 5 Node.js Web Apps (processos Node rodando)
✅ Git Deploy (copia código do GitHub)
❌ NÃO faz build automático
❌ NÃO é igual Vercel
```

### Como vamos usar:

1. **Git Deploy** → puxa código do GitHub
2. **SSH** → fazemos build manual
3. **Node.js Web App** → roda Next.js em produção
4. **Domínio/Subdomínio** → aponta para o app

---

## 📁 Estrutura na Hostinger

```
/home/u123456789/
├── apps/
│   ├── emcasacomcecilia/    ← Next.js rodando aqui
│   ├── dicas/               ← outro projeto
│   ├── damie/               ← outro projeto
│
├── public_html/             ← pode ficar vazio ou redirect
├── domains/
└── logs/
```

**IMPORTANTE:** Cada app Next.js roda como um **Node.js Web App** separado!

---

## 🔧 PASSO A PASSO COMPLETO

### PARTE 1: Preparar o Projeto Local

#### 1.1 - Verificar `package.json` ✅

Já está configurado com:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p ${PORT:-3000}",
    "lint": "eslint"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

✅ O `-p ${PORT:-3000}` permite que a Hostinger defina a porta automaticamente!

#### 1.2 - Verificar `next.config.mjs` ✅

Já está configurado:
```javascript
const nextConfig = {
  reactStrictMode: true,
  // NÃO use output: 'export' - precisamos de SSR!
};
```

✅ **SSR ativo** = SEO perfeito + Adsense funcional!

#### 1.3 - Testar Build Localmente

```bash
cd emcasacomcecilia
npm run build
npm run start
```

Se funcionar sem erros → **PRONTO PARA DEPLOY!** ✅

---

### PARTE 2: Subir para GitHub

#### 2.1 - Criar Repositório

```bash
cd emcasacomcecilia

# Se ainda não iniciou o git:
git init
git add .
git commit -m "🎉 Initial commit: Em Casa com Cecília - Next.js"
```

#### 2.2 - Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Nome: `emcasacomcecilia-main`
3. **Privado ou Público** (sua escolha)
4. **NÃO** adicione README/LICENSE/.gitignore (já temos!)
5. Clique em **Create repository**

#### 2.3 - Conectar e Fazer Push

```bash
git remote add origin https://github.com/brunollds/emcasacomcecilia-main.git
git branch -M main
git push -u origin main
```

✅ Código no GitHub!

---

### PARTE 3: Configurar Git Deploy na Hostinger

#### 3.1 - Acessar hPanel

1. Login na Hostinger
2. **Sites** → **Gerenciar**
3. Sidebar: **Git** (ou "Version Control")

#### 3.2 - Criar Novo Deploy Git

Clique em **"Criar um Novo Repositório"**

Preencha:
```
📦 Endereço do Repositório:
https://github.com/brunollds/emcasacomcecilia-main

🌿 Ramo (Branch):
main

📁 Caminho de Instalação:
apps/emcasacomcecilia

(⚠️ NÃO deixe vazio! Use apps/emcasacomcecilia)
```

#### 3.3 - Deploy Inicial

Clique em **"Implantar"**

Aguarde... (1-2 minutos)

✅ Código copiado para: `/home/u123456789/apps/emcasacomcecilia`

---

### PARTE 4: Build e Configuração via SSH

#### 4.1 - Conectar via SSH

**Opção A: Terminal Hostinger (hPanel)**
1. **Sites** → **Gerenciar** → **Terminal** (sidebar)

**Opção B: SSH Local**
```bash
ssh u123456789@seu-site.com -p 65002
```

#### 4.2 - Navegar até o Projeto

```bash
cd apps/emcasacomcecilia
ls -la  # verificar se os arquivos estão lá
```

#### 4.3 - Instalar Dependências

```bash
npm install
```

⏱️ Aguarde... (pode demorar 2-5 minutos)

#### 4.4 - Fazer Build

```bash
NODE_ENV=production npm run build
```

⏱️ Aguarde... (1-3 minutos)

Você deve ver:
```
✓ Compiled successfully
Route (app)                    Size
┌ ○ /
├ ○ /receitas
...
```

✅ **Build concluído!**

---

### PARTE 5: Criar Node.js Web App

#### 5.1 - Acessar Node.js Apps

No hPanel:
1. **Sites** → **Gerenciar**
2. Sidebar: **Node.js** (ou "Node.js Apps")

#### 5.2 - Criar Nova Aplicação

Clique em **"Criar Aplicação"** ou **"Add Application"**

Preencha:
```
📛 Nome da Aplicação:
Em Casa com Cecília

📁 Caminho da Aplicação:
/home/u123456789/apps/emcasacomcecilia

🚀 Comando de Inicialização:
npm run start

🔢 Versão do Node:
18.x ou 20.x (mais recente disponível)

🌐 Domínio:
emcasacomcecilia.com
(ou subdomínio: cecilia.seusite.com)
```

#### 5.3 - Variáveis de Ambiente

Adicione:
```
NODE_ENV=production
PORT=XXXXX  (Hostinger define automaticamente)
```

#### 5.4 - Criar/Iniciar Aplicação

Clique em **"Criar"** ou **"Start"**

⏱️ Aguarde... (30 segundos)

Status deve mudar para: ✅ **Running**

---

### PARTE 6: Configurar Domínio

#### 6.1 - Apontar Domínio

Se usar domínio principal (`emcasacomcecilia.com`):

1. **Domains** → **Gerenciar**
2. DNS Records
3. Adicione/Edite:
   ```
   Type: A
   Name: @
   Value: IP do servidor Hostinger
   ```

Se usar subdomínio (`cecilia.seusite.com`):
```
Type: CNAME
Name: cecilia
Value: seu-site.com
```

#### 6.2 - SSL (HTTPS)

1. **Sites** → **Gerenciar**
2. **SSL/TLS**
3. Ative: **Force HTTPS**

⏱️ Aguarde propagação (5-30 minutos)

---

### PARTE 7: Testar Site em Produção

Acesse: **https://emcasacomcecilia.com**

Deve carregar o site! 🎉

**Testes:**
- ✅ Home carrega
- ✅ Navegação funciona
- ✅ Receitas aparecem
- ✅ Formulário funciona
- ✅ Mobile responsivo
- ✅ HTTPS ativo

---

## 🔄 Workflow de Atualização

### Quando fizer mudanças no código:

#### 1. Atualizar GitHub

```bash
# Local
git add .
git commit -m "✨ Descrição das mudanças"
git push origin main
```

#### 2. Na Hostinger (SSH)

```bash
cd apps/emcasacomcecilia

# Puxar código
git pull origin main

# Reinstalar dependências (se mudou package.json)
npm install

# Build
npm run build

# Reiniciar app Node.js
pm2 restart emcasacomcecilia
# OU no hPanel: Stop → Start
```

---

## 🎯 Webhook Automático (Opcional - Avançado)

### Configurar Auto-Deploy

#### No GitHub:
1. Settings → Webhooks → Add webhook
2. Payload URL: `https://api.hostinger.com/webhook/SEU_ID`
3. Content type: `application/json`
4. Events: `Just the push event`

#### Script Post-Deploy

Crie: `deploy.sh`

```bash
#!/bin/bash
cd /home/u123456789/apps/emcasacomcecilia
git pull origin main
npm install
npm run build
pm2 restart emcasacomcecilia
```

**Nota:** Isso pode não estar disponível em todos os planos Hostinger.

---

## 📊 Monitoramento

### Logs da Aplicação

```bash
# SSH
cd apps/emcasacomcecilia
pm2 logs emcasacomcecilia
```

Ou no hPanel: **Node.js Apps** → Ver logs

### Status da Aplicação

```bash
pm2 status
```

---

## 🐛 Troubleshooting

### App não inicia

**Erro:** "Port already in use"
```bash
# Verifica porta
lsof -i :PORTA
# Mata processo
kill -9 PID
```

**Erro:** "Module not found"
```bash
rm -rf node_modules
npm install
```

### Build falha

```bash
# Limpa cache
rm -rf .next
npm run build
```

### Site não carrega

1. Verifica status do app: hPanel → Node.js Apps
2. Verifica logs: `pm2 logs`
3. Testa porta: `curl localhost:PORTA`
4. Verifica DNS: `nslookup emcasacomcecilia.com`

---

## ✅ Checklist Pré-Deploy

- [ ] Build local passou (`npm run build`)
- [ ] `package.json` tem `-p ${PORT:-3000}`
- [ ] `next.config.mjs` SEM `output: 'export'`
- [ ] Código no GitHub
- [ ] Git Deploy configurado
- [ ] `npm install` no servidor
- [ ] `npm run build` no servidor
- [ ] Node.js Web App criado
- [ ] Domínio apontado
- [ ] SSL ativado

---

## 🎉 Resultado Final

Você terá:
- ✅ Next.js rodando com **SSR completo**
- ✅ **SEO perfeito** (Google adora!)
- ✅ **Adsense pronto** para usar
- ✅ 5 apps Node disponíveis (use para outros projetos!)
- ✅ **Zero custo** além da hospedagem que já paga

---

## 🆚 Hostinger vs Vercel

| Feature | Vercel | Hostinger Node App |
|---------|--------|-------------------|
| Deploy automático | ✅ | 🟡 Manual |
| Build automático | ✅ | ❌ Manual |
| SSR/SSG | ✅ | ✅ |
| Custo | $20/mês (pro) | Incluído |
| Controle | Médio | Total |
| Outros apps | ❌ | ✅ 5 apps |

**Conclusão:** Hostinger = mais trabalho manual, mas **MUITO mais flexível e econômico!**

---

## 📞 Suporte

Problemas? Verifique:
1. Logs do PM2
2. Status do app (hPanel)
3. DNS propagation (https://dnschecker.org)
4. Porta configurada corretamente

---

**Deploy configurado! Bora lançar o site! 🚀**

<function_calls>
<invoke name="Read">
<parameter name="file_path">C:\Users\Bruno\Downloads\Emcasacomcecilia\emcasacomcecilia\next.config.mjs