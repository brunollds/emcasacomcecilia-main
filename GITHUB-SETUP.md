# 📦 Como Colocar no GitHub - Passo a Passo

---

## 🎯 PROCESSO COMPLETO

### PASSO 1️⃣: Criar Repositório no GitHub

1. **Acesse:** https://github.com/new

2. **Preencha:**
   ```
   📛 Repository name: emcasacomcecilia-main

   📝 Description: Site oficial do canal Em Casa com Cecília - Receitas e Reviews

   🔒 Visibilidade:
      ○ Public (todo mundo vê)
      ○ Private (só você vê) ← Recomendo começar PRIVADO

   ❌ NÃO marque:
      [ ] Add a README file
      [ ] Add .gitignore
      [ ] Choose a license

   (Já temos tudo isso!)
   ```

3. **Clique em:** "Create repository"

4. **COPIE o link que aparece** (algo como):
   ```
   https://github.com/brunollds/emcasacomcecilia-main.git
   ```

---

### PASSO 2️⃣: Inicializar Git Local

Abra o terminal na pasta do projeto:

```bash
cd C:\Users\Bruno\Downloads\Emcasacomcecilia\emcasacomcecilia
```

Verifique se já tem git inicializado:

```bash
git status
```

**Se já tiver git:**
- Pule para o PASSO 3

**Se NÃO tiver git (erro "not a git repository"):**

```bash
# Inicializa git
git init

# Adiciona todos os arquivos
git add .

# Primeiro commit
git commit -m "🎉 Initial commit: Em Casa com Cecília - Base completa"
```

---

### PASSO 3️⃣: Conectar ao GitHub

```bash
# Conecta ao repositório remoto (use O SEU link do PASSO 1)
git remote add origin https://github.com/brunollds/emcasacomcecilia-main.git

# Renomeia branch para main (padrão do GitHub)
git branch -M main

# Faz o primeiro push
git push -u origin main
```

**Se pedir senha:**
- Não aceita mais senha normal!
- Use **Personal Access Token** (veja PASSO 4)

---

### PASSO 4️⃣: Criar Personal Access Token (se necessário)

Se o git pedir senha e der erro:

1. **Acesse:** https://github.com/settings/tokens

2. **Clique em:** "Generate new token" → "Generate new token (classic)"

3. **Preencha:**
   ```
   Note: Claude Code - Em Casa com Cecília

   Expiration: 90 days (ou No expiration se quiser)

   ✅ Marque:
   [x] repo (todos os subitens)
   [x] workflow
   ```

4. **Clique em:** "Generate token"

5. **COPIE O TOKEN** (só aparece uma vez!)
   ```
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

6. **Use como senha** quando o git pedir:
   ```
   Username: brunollds
   Password: [cole o token aqui]
   ```

---

### PASSO 5️⃣: Verificar se Funcionou

```bash
# Ver status
git status

# Ver commits
git log --oneline

# Ver repositório remoto
git remote -v
```

Se tudo OK, você vai ver:
```
origin  https://github.com/brunollds/emcasacomcecilia-main.git (fetch)
origin  https://github.com/brunollds/emcasacomcecilia-main.git (push)
```

**Acesse:** https://github.com/brunollds/emcasacomcecilia-main

Seu código deve estar lá! 🎉

---

## 🔄 WORKFLOW DIÁRIO

Quando fizer mudanças no código:

```bash
# 1. Ver o que mudou
git status

# 2. Adicionar mudanças
git add .

# 3. Commit com mensagem descritiva
git commit -m "✨ Adiciona sistema de ratings"

# 4. Enviar para GitHub
git push
```

**Emojis úteis para commits:**
```
✨ Nova funcionalidade
🐛 Bug fix
📝 Documentação
🎨 Design/estilo
♻️ Refatoração
🚀 Performance
✅ Testes
🔧 Configuração
```

---

## 🆘 PROBLEMAS COMUNS

### ❌ "repository not found"
- Verifique se o link está correto
- Verifique se o repositório existe no GitHub
- Verifique se você está logado

### ❌ "failed to push"
- Talvez precise fazer `git pull` primeiro
- Ou use `git push --force` (CUIDADO!)

### ❌ "Authentication failed"
- Use Personal Access Token, não senha
- Verifique se o token não expirou

### ❌ Arquivos muito grandes
- Next.js pode gerar arquivos grandes
- Verifique `.gitignore` (já está configurado!)

---

## 📋 CHECKLIST FINAL

Antes de fazer push, verifique:

- [ ] `.gitignore` está correto (sem node_modules, .env, etc)
- [ ] `npm run build` funciona sem erros
- [ ] Não tem senhas ou tokens no código
- [ ] README.md está atualizado

---

## 🎯 PRONTO!

Agora seu código está seguro no GitHub! 🎉

**Benefícios:**
- ✅ Backup automático
- ✅ Histórico de mudanças
- ✅ Colaboração fácil
- ✅ Deploy mais simples (Hostinger Git Deploy)

---

**Próximo passo:** Configurar deploy na Hostinger (DEPLOY-HOSTINGER-NODEJS.md)
