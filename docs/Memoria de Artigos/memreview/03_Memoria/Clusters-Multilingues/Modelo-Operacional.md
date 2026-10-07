# Modelo operacional de clusters multilíngues

## Propósito

Um cluster multilíngue reúne as famílias de artigos de um parceiro que saem em
todos os idiomas do site. O vault acompanha a decisão, a fonte PT e a completude
editorial; o repositório continua dono de rotas, hreflang, schema, sitemap e
validações.

Não criar nove notas de artigo para nove traduções. Uma nota-fonte em
`02_Artigos/` representa a peça, e a nota do cluster registra a matriz de famílias.

## Modos

| Modo | Quando usar | Regra de saída |
|---|---|---|
| `somente-pt` | pauta local ou de parceiro sem cluster multilíngue | não abre família; o JSON não leva `translationKey` |
| `paridade-completa` | parceiro com cluster multilíngue (hoje YesStyle e SHEIN) | as 10 versões saem juntas; a build reprova família incompleta |

O modo `liberar-por-conversao` (português primeiro, traduções depois da conversão)
saiu em 07/10/2026: a SHEIN passou a publicar guias e hauls nos 10 idiomas, e a
build exige família completa.

## Campos da nota-fonte

```yaml
i18n_cluster: "yesstyle"
translationKey: "yesstyle-kbeauty"
modo_i18n: "paridade-completa"
idioma_fonte: "pt"
idiomas_alvo: [pt, en, es, fr, de, it, ko, ja, zh-hant, zh-hans]
status_i18n: "completo"
```

`translationKey` é a chave estável de equivalência editorial do JSON. Não é o
título, o slug, a categoria, o `reviewKind` nem a marca; cada locale pode ter
slug próprio. `i18n_cluster` continua opcional e serve apenas para apontar o
contexto comercial/editorial do vault — não substitui `translationKey`.

## Fluxo

1. **Job 1:** define se a pauta sai só em português ou nos 10 idiomas e registra
   a nota do cluster.
2. **Job 2:** escreve o PT como fonte canônica e separa fatos universais de
   condições de mercado.
3. **Job 3:** aprova claims e informa o que exige localização/rechecagem.
4. **Job 4:** gera os 10 JSONs da família (seção 3 do Job 4) e atualiza a matriz
   do cluster.
5. **Job 5:** executa os gates gerais e específicos antes de registrar o estado
   como completo.

## Regras de conteúdo

- Uma tradução é localização editorial, não substituição mecânica de palavras.
- Preço, moeda, entrega, impostos, disponibilidade, catálogo e campanhas são
  fatos de um mercado. O texto diz de qual mercado eles são (ex.: preço em reais
  na SHEIN Brasil) e não os converte nem os apresenta como do país de quem lê
  sem fonte própria.
- O código, o link comissionado e as condições comerciais vêm da fonte factual
  do repositório; nunca da lembrança de uma tradução anterior.
- Não duplicar listas de rotas ou hreflangs no vault: o contrato dos JSONs está
  no Job 4 e o código deriva o resto.

## Estado padrão da matriz

| Fonte PT | Chave | Modo | Idiomas | Status | Próxima ação |
|---|---|---|---:|---|---|
| `slug-fonte` | `article-key` | `somente-pt` | 1/1 | não aplicável | — |

## Fontes técnicas

- Contrato dos artigos traduzidos: `00_Sistema/JOBS/Job-4-Conformacao-JSON.md`,
  seção 3, e o `CLAUDE.md`, em "Artigos em outros idiomas".
- Desenho original das URLs e do hreflang: `docs/HANDOFF-I18N-SUBPAGINAS-FASE-4.md`
  (plano de 27/08/2026, já executado).
- YesStyle: `docs/PLANO-YESSTYLE-I18N-ABC.md` (páginas da loja).
- SHEIN: `docs/HANDOFF-SHEIN-I18N.md`.
- Registro implementado: `src/lib/i18n/` e validadores em `scripts/`.
