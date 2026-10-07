---
slug: ""
title: "" # H1 específico e descritivo (sem clickbaits como "Tudo o que você precisa saber")
seo_title: "" # Title da SERP (máx ~60 caracteres, opcional se for igual ao title)
description: ""
category: "" # guias-praticos-utilidade | produtos-experiencias | cupons-como-usar | confianca-reputacao
reviewKind: "" # guia | produto | editorial
type: ""
author: "Cecília Mauad"
publishedAtISO: "2026-08-23"
publishedAt: "23 de agosto de 2026"
affiliate: "" # slug do cupom
coupon: ""
translationKey: "" # família nos 10 idiomas (ex.: yesstyle-skincare-30); vazio se o artigo sai só em português
status: "em-redacao"
responsavel: "Job-2"
proxima_acao: "revisao-editorial"
---

# {{title}}

> **Resposta Rápida:** [Resumo direto e objetivo respondendo a dúvida principal em 2 linhas].

---

## [Seção Principal 1]
[Conteúdo com fatos, passos ou tabela de dados]

---

## [Seção Principal 2]
[Instruções, cuidados, prós e contras ou comparações]

---

## Código e Onde Comprar
- Código: `{{coupon}}`, chamado pelo nome que tem na loja: cupom, código de recompensa (o `CECILIA010` da YesStyle, nunca "cupom") ou código de indicação (o `4CW5Y` da SHEIN)
- Link interno: [Ver as regras na página da loja](/cupons/{{affiliate}}) (nas traduções: `/<locale>/coupons/{{affiliate}}`)
- Link da loja: [Ir para a loja oficial](https://...) (sponsored)

---

## Perguntas frequentes

### [Pergunta literal 1]?
[Resposta curta e factual].

### [Pergunta literal 2]?
[Resposta curta e factual].

---

## Planejamento de Mídia & Imagens
- **Hero Image:** midia nova otimizada pode começar em staging externo (`images/reviews/...`), ser enviada ao CDN e retida como original exato em `public/images/reviews/...`; campo `image` do JSON continua `/images/reviews/...` como identidade logica. Seguir [Guia de mídia editorial](../../../GUIA-MIDIA-EDITORIAL.md).
- **Entrega CDN:** comprimir antes, gerar o inventário com `--merge --stdout` e inserir no manifesto só as entradas novas, fazer upload e verificar HTTPS/SHA-256 antes de acrescentar ao mapa com `--append`. Não inserir URL CDN diretamente no JSON.
- **Memória da mídia:** registrar origem, licença/autoria, path logico e evidencia de verificacao. Versionar o original Git-backed junto com manifesto/mapa e allowlist incremental. `staged: true` preserva proveniencia; manter copia externa ate backup recuperavel. Upload nao publica o artigo. Nunca apagar originais legados do Git.
- **Image Alt:** `[Texto alternativo descritivo e acessível]`
- **Imagens de Seção:** `[Lista de imagens inline com legenda]`

---

## Matriz de Claims Verificados (Auditoria Editorial de Fatos)
> *Proibido aprovar sem fonte exata comprovada.*

| Afirmação no texto | Tipo de Dado | Fonte Exata (URL / Embalagem / Resolução) | Localização / Trecho | Data Consulta | Status |
|---|---|---|---|---|---|
| | | | | | [x] Aprovado |
