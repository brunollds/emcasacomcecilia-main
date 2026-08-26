---
parceiro: "SHEIN"
cluster_id: "shein"
modo_i18n: "liberar-por-conversao"
idioma_fonte: "pt"
idiomas_alvo: []
fonte_tecnica: "docs/HANDOFF-SHEIN-I18N.md"
---

# Cluster multilíngue — SHEIN

## Regra operacional

A SHEIN segue o modelo estrutural multi-idioma, mas **não** adota paridade
automática. A estrutura nasce preparada; cada nova tradução só é liberada depois
de conversão comprovada da peça PT-BR e de revisão de adequação por mercado.

O estado técnico e as decisões de arquitetura estão em
`docs/HANDOFF-SHEIN-I18N.md`. Esta nota não substitui o handoff.

## Escopo por tipo de conteúdo

| Tipo | Tratamento multilíngue | Condição |
|---|---|---|
| Hub `/cupons/shein` e explicação de campanhas | elegível | locales liberados conforme conversão |
| Tabela de medidas | adaptação, não tradução | numeração e mercado precisam ser locais |
| Haul com peças recebidas | PT-first | só criar fora do Brasil com peças/evidência locais |

## Matriz atual

| Chave | Fonte PT | Idiomas | Estado | Próxima ação |
|---|---|---:|---|---|
| — | — | 0/0 | estrutura e dados comerciais preparados | publicar/medir a primeira peça PT elegível |

## Regras específicas

- Não inventar um link global: o destino comercial e as campanhas vêm de
  `src/lib/couponsData.ts` e precisam de rechecagem factual.
- Código de indicação, campanhas, moedas, tamanhos e disponibilidade não devem
  ser reaproveitados entre mercados sem evidência.
- Antes de abrir um locale, registrar qual é o gate de conversão e qual adaptação
  local será necessária.
