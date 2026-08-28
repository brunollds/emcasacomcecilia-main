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
npm run test:review-i18n
npm run test:internal-links
npm run test:review-discovery
npm run test:home-curation
npm run test:home-route-tracking
npm run test:shell-navigation
npm run test:site-search
npm run build
```

Para trabalho multilíngue, rodar também `npm run test:html-lang` e os gates
específicos indicados na nota do cluster (por exemplo, a prova de mutação do
YesStyle). Confirmar no HTML gerado locale, canonical, hreflang e sitemap antes
de atualizar a matriz para `completo`.

---

## 3. Submissão ao IndexNow
Após a publicação/deploy bem-sucedido, envie as URLs que sofreram alteração:

```powershell
npm run indexnow:submit -- https://emcasacomcecilia.com/<pathname-canonico-do-review> https://emcasacomcecilia.com/sitemap.xml https://emcasacomcecilia.com/llms.txt
```

Use `/reviews/<slug>` para PT e `/<locale>/reviews/<slug>` para versão não-PT.
