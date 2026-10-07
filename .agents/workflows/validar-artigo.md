# Workflow: Validação, Gates & SEO (Job 5)

1. Execute a bateria de testes no terminal (detalhes na seção 2 do `docs/Memoria de Artigos/memreview/00_Sistema/JOBS/Job-5-Gates-SEO.md`):
   ```powershell
   node scripts/content/build-index.mjs
   npm run typecheck
   npm run validate:content
   npm run build
   ```
2. Para uma família nos 10 idiomas, rode também os gates da nota do cluster e confira no HTML gerado de uma versão o canonical, o hreflang dos 10 idiomas e o seletor de idioma.
3. Atualize a nota e o `PAINEL-DA-ESTEIRA.md` para `status: pronto-para-deploy`. O deploy é decisão do Bruno.
4. Prepare o comando de IndexNow para depois do deploy (seção 3 do Job 5): primeiro com `--dry-run`, com as URLs completas das versões publicadas, o sitemap e o `llms.txt`:
   ```powershell
   npm run indexnow:submit -- --dry-run https://emcasacomcecilia.com/reviews/<slug> https://emcasacomcecilia.com/<locale>/reviews/<slug-do-idioma> https://emcasacomcecilia.com/sitemap.xml https://emcasacomcecilia.com/llms.txt
   ```
