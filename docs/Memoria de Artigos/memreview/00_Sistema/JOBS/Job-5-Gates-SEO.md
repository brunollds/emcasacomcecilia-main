# Job 5: Gates Determinísticos, SEO & IndexNow

---

## 1. Missão
Executar a bateria de testes automatizados do repositório, garantir que o build passa com zero erros, inspecionar os artefatos de SEO (`sitemap.xml`, `llms.txt`) e preparar a submissão ao IndexNow.

---

## 2. Bateria de Gates Obrigatórios
Execute no terminal:

```powershell
node scripts/content/build-index.mjs   # regenera o índice que o npm run dev lê
npm run typecheck
npm run validate:content               # fica fora do npm run build
npm run build
```

O `npm run build` roda os testes de conteúdo antes do `next build` (entre eles a vitrine em português, os idiomas e as famílias, os links internos, as lojas traduzidas e a validade das ofertas da YesStyle, que derruba a build quando uma oferta ativa vence) e, depois dele, o bundle do navegador, o `<html lang>` e o `test:build-output`. Para iterar mais rápido, cada teste roda solto (ex.: `npm run test:review-i18n`).

Se o artigo tem **imagem ou vídeo novo** (fluxo do `docs/GUIA-MIDIA-EDITORIAL.md`), rodar antes do commit:

```powershell
npx tsx scripts/media/test-delivery-integration.ts
node scripts/media/phase5-export.mjs --check
node scripts/media/candidate-proof.mjs   # depois do staging por caminhos explícitos
```

Depois do `npm run build`: `node scripts/media/test-review-delivery-html.mjs` e conferir hero, imagens inline, ampliação e carrosséis no navegador (as URLs saem do CDN). Verificar `git config --local --get core.hooksPath` = `.githooks`. Só marcar `pronto-para-deploy` com todos os assets do artigo com `verification_status=verified` e no mapa; upload e deploy exigem GO do Bruno.

Para uma família nos 10 idiomas, rodar também os gates da nota do cluster (por
exemplo, a prova de mutação da YesStyle). Nenhum teste confere o `<head>` dos
artigos: no HTML gerado de uma versão, conferir o canonical, o hreflang dos 10
idiomas com o `x-default` e o seletor de idioma antes de atualizar a matriz para
`completo`.

Com os gates verdes, a nota vai para `status: pronto-para-deploy`. O deploy é
decisão do Bruno; depois dele e do IndexNow, `status: publicado`.

---

## 3. Submissão ao IndexNow
Depois do deploy, enviar as URLs novas ou alteradas, com o sitemap e o `llms.txt`.
Primeiro com `--dry-run`, que mostra o que seria enviado sem enviar; depois sem
ele. O script só aceita URLs de `emcasacomcecilia.com`.

```powershell
npm run indexnow:submit -- --dry-run https://emcasacomcecilia.com/reviews/<slug> https://emcasacomcecilia.com/sitemap.xml https://emcasacomcecilia.com/llms.txt
```

Família nos 10 idiomas: as 10 URLs, `/reviews/<slug>` em português e
`/<locale>/reviews/<slug>` nos outros, com o slug de cada versão. Usar sempre a
URL completa: no Git Bash, um caminho que começa com `/` vira caminho do Windows,
e o script o recusa.
