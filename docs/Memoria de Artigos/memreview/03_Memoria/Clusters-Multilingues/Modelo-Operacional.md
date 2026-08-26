# Modelo operacional de clusters multilíngues

## Propósito

Um cluster multilíngue é um conjunto de versões localizadas da mesma intenção
editorial. O vault acompanha a decisão, a fonte PT e a completude editorial; o
repositório continua dono de rotas, hreflang, schema, sitemap e validações.

Não criar nove notas de artigo para nove traduções. Uma nota-fonte em
`02_Artigos/` representa a peça, e a nota do cluster registra a matriz de locales.

## Modos permitidos

| Modo | Quando usar | Regra de saída |
|---|---|---|
| `somente-pt` | pauta local ou sem sinal internacional | não abre matriz de tradução |
| `paridade-completa` | cluster internacional consolidado | só fica completo quando todos os idiomas-alvo estiverem publicados e validados |
| `liberar-por-conversao` | estrutura i18n nasce antes da evidência | PT é publicado primeiro; traduções só entram após o gate editorial/comercial definido |

## Campos da nota-fonte

```yaml
i18n_cluster: "yesstyle"
i18n_article_key: "kbeauty"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, ko, ja, zh-hant, zh-hans]
status_i18n: "completo"
```

`i18n_article_key` é uma chave estável de arquitetura, não o título nem o slug
traduzido. Cada locale pode ter slug próprio.

## Fluxo

1. **Job 1:** define se a pauta é local, de paridade completa ou liberada por
   conversão; registra o motivo e a nota do cluster.
2. **Job 2:** escreve o PT como fonte canônica e separa fatos universais de
   condições de mercado.
3. **Job 3:** aprova claims e informa o que exige localização/rechecagem.
4. **Job 4:** aplica o modo definido no JSON e atualiza a matriz do cluster.
5. **Job 5:** executa os gates gerais e específicos antes de registrar o estado
   como completo.

## Regras de conteúdo

- Uma tradução é localização editorial, não substituição mecânica de palavras.
- Preço, moeda, entrega, impostos, disponibilidade, catálogo e campanhas são
  fatos por mercado: só entram com fonte e revisão próprias.
- O código, o link comissionado e as condições comerciais vêm da fonte factual
  do repositório; nunca da lembrança de uma tradução anterior.
- A nota do cluster aponta para o plano/handoff técnico vigente. Não duplicar
  listas de rotas ou hreflangs no vault.

## Estado padrão da matriz

| Fonte PT | Chave | Modo | Idiomas | Status | Próxima ação |
|---|---|---|---:|---|---|
| `slug-fonte` | `article-key` | `somente-pt` | 1/1 | não aplicável | — |

## Fontes técnicas

- YesStyle: `docs/PLANO-YESSTYLE-I18N-ABC.md`.
- SHEIN: `docs/HANDOFF-SHEIN-I18N.md`.
- Registro implementado: `src/lib/i18n/` e validadores em `scripts/`.
