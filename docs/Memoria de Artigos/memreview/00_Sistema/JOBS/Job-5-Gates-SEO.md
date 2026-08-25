# Job 5: Gates Determinísticos, SEO & IndexNow

---

## 1. Missão
Executar a bateria de testes automatizados do repositório, garantir que o build passa com zero erros, inspecionar os artefatos de SEO (`sitemap.xml`, `llms.txt`) e preparar a submissão ao IndexNow.

---

## 2. Bateria de Gates Obrigatórios
Execute no terminal:

```powershell
npm run typecheck
npm run validate:content
npm run test:internal-links
npm run test:review-discovery
npm run build
```

---

## 3. Submissão ao IndexNow
Após a publicação/deploy bem-sucedido, envie as URLs que sofreram alteração:

```powershell
npm run indexnow:submit -- https://emcasacomcecilia.com/reviews/<slug> https://emcasacomcecilia.com/sitemap.xml https://emcasacomcecilia.com/llms.txt
```
