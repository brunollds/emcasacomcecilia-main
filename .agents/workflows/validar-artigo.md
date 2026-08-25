# Workflow: Validação, Gates & SEO (Job 5)

1. Execute a bateria de testes no terminal:
   ```powershell
   node scripts/content/build-index.mjs
   npm run typecheck
   npm run validate:content
   npm run test:internal-links
   npm run test:review-discovery
   npm run build
   ```
2. Inspecione se os 297+ caminhos estáticos geraram sem falhas.
3. Atualize o `PAINEL-DA-ESTEIRA.md` marcando `status: pronto-para-deploy`.
4. Prepare o comando de IndexNow para ser executado após o deploy:
   ```powershell
   npm run indexnow:submit -- https://emcasacomcecilia.com/reviews/<slug> https://emcasacomcecilia.com/sitemap.xml https://emcasacomcecilia.com/llms.txt
   ```
