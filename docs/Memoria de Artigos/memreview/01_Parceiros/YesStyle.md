---
parceiro: "YesStyle"
slug_cupom: "yesstyle"
fonte_dados_comerciais: "data/coupons/yesstyle.json"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-07"
---

# Dossiê Factual: YesStyle

## 1. Dados comerciais e fonte factual

| Dado | Fonte canônica | Regra |
|---|---|---|
| Código de recompensa `CECILIA010` | item `reward` de `data/coupons/yesstyle.json` | vai no campo Reward Code e soma com os cupons da loja; nunca chamar de cupom, em nenhum idioma (nome em cada idioma em `00_Sistema/CONTRATOS-DE-CONTEUDO.md`) |
| Link comercial | `affiliateUrl` do mesmo arquivo | o CTA externo das 10 versões de um artigo usa esse link; nunca substituir pela homepage da loja |
| Cupons promocionais da loja | itens `coupon` do mesmo arquivo | aparecem só nas páginas da loja, quando ativos e verificados; ficam fora do texto dos artigos, porque vencem em poucos dias |

O dossiê não repete percentuais nem datas: a fonte é o arquivo, com `verifiedAt` em cada item.
A manutenção está na seção 3 de `docs/MANUTENCAO-MENSAL.md`.

## 2. Perfil multilíngue

- **Nota do cluster:** [[03_Memoria/Clusters-Multilingues/YesStyle]]
- **Modo:** `paridade-completa`. Todo artigo sai nos 10 idiomas (o português e 9 traduções),
  como uma família com a mesma `translationKey`.
- **Contrato do JSON:** seção 3 do `00_Sistema/JOBS/Job-4-Conformacao-JSON.md`.
- **Páginas da loja nos 10 idiomas:** `docs/PLANO-YESSTYLE-I18N-ABC.md`.
- **Regra de conteúdo:** não assumir preço, frete, impostos ou disponibilidade de
  um país sem fonte própria.
