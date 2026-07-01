# Rastreamento de datas mensais dos cupons

> Documento de referência para facilitar a atualização mensal das referências de cupons no projeto.
> Última atualização: julho/2026.

## Arquivos que precisam de revisão mensal

### 1. `src/lib/couponsData.ts`

Este é o contrato principal dos cupons. Verificar para cada cupom ativo:

- `lastVerified` (ISO 8601: `YYYY-MM-DD`)
- `metaDescription` (quando mencionar "mês ano", ex: "atualizado julho 2026")
- `monthlyHighlight.scope` / `monthlyHighlight.note` (quando houver regras específicas do mês)
- `relatedContent[].publishedAt` (quando o conteúdo relacionado for atualizado)

#### Cupons ativos

| Slug | Marca | Código | Campos a verificar |
|---|---|---|---|
| `damie` | DAMIE | `CECILIA12` | `lastVerified`, `metaDescription` |
| `dolce-gusto` | Nescafé Dolce Gusto | `CECI` | `lastVerified` |
| `yesstyle` | YesStyle | `CECILIA010` | `lastVerified` |
| `nutren` | Nutren / Nestlé Nutri | `CECI` | `lastVerified` |
| `i-wanna-sleep` | I Wanna Sleep | `CECIEMCASA` | `lastVerified` |

#### Cupons inativos (não aparecem no site, mas mantêm histórico)

| Slug | Marca | Código | Observação |
|---|---|---|---|
| `kopenhagen` | Kopenhagen | `CECILIA10` | Status `pausado`. Atualizar `lastVerified` se a parceria voltar. |

### 2. `src/app/cupons/[brand]/page.tsx`

- O bloco de destaque mensal (`monthlyHighlight`) é renderizado automaticamente a partir dos dados.
- Não há hardcode de mês/ano neste arquivo — a data exibida vem de `lastVerified`.
- **Não precisa editar** a menos que a estrutura do bloco mude.

### 3. `src/lib/data.ts` — artigos de cupom

Os artigos abaixo contêm referências ao mês/ano e precisam de atualização mensal:

#### YesStyle

| Slug | Linhas aproximadas | Campos a verificar |
|---|---|---|
| `codigo-cecilia010-yesstyle-como-usar` | ~18745 | `publishedAt`, `publishedAtISO`, textos sobre validade |
| `yesstyle-reward-code-coupon-cecilia010` | ~18998 | `publishedAt`, `publishedAtISO` |
| `codigo-de-recompensa-yesstyle-cupon-cecilia010` | ~19229 | `publishedAt`, `publishedAtISO` |
| `code-recompense-yesstyle-cecilia010` | ~19460 | `publishedAt`, `publishedAtISO` |
| `yesstyle-reward-code-rabatt-cecilia010` | ~19692 | `publishedAt`, `publishedAtISO` |

#### DAMIE

| Slug | Linhas aproximadas | Campos a verificar |
|---|---|---|
| `cupom-cecilia12-como-usar` | ~20064 | `publishedAt`, `publishedAtISO`, textos sobre validade |

#### NESCAFÉ Dolce Gusto

| Slug | Linhas aproximadas | Campos a verificar |
|---|---|---|
| `cupom-ceci-nescafe-dolce-gusto-como-usar` | ~21142 | `title`, `metaDescription`, `publishedAt`, `publishedAtISO`, textos com `JUNHO 2026`/`JULHO 2026` |
| `promocao-dolce-gusto-55-caixas-mini-me-gratis` | ~22133 | `publishedAt`, `publishedAtISO` |

#### I Wanna Sleep

| Slug | Linhas aproximadas | Campos a verificar |
|---|---|---|
| `cupom-ceciemcasa-i-wanna-sleep-como-usar` | ~21667 | `title` (draft: true, mas mantém referência ao mês) |

#### Nestlé Nutre

| Slug | Linhas aproximadas | Campos a verificar |
|---|---|---|
| `cupom-ceci-nestle-nutre-como-usar` | ~21902 | `title` (draft: true, mas mantém referência ao mês) |

### 4. `src/lib/data.ts` — reviews relacionadas às marcas de cupom

Essas reviews mencionam cupons e/ou são referenciadas em `relatedContent` dos cupons. Atualizar `publishedAt` e `publishedAtISO` quando a marca/Cecília indicar novo conteúdo:

| Slug | Linhas aproximadas | Marca relacionada |
|---|---|---|
| `sofa-damie-modular-vale-a-pena` | ~18644 | DAMIE |
| `poltronas-reclinaveis-damie-vale-o-investimento` | ~20967 | DAMIE |
| `sofa-damie-na-caixa-vale-a-pena-o-modular` | ~20675 | DAMIE |
| `poltrona-moon-design-que-parece-obra-de-arte` | ~20829 | DAMIE |
| `poltrona-levita-o-topo-da-tecnologia-e-conforto` | ~20537 | DAMIE |
| `damie-reclame-aqui-o-que-os-dados-mostram` | ~19923 | DAMIE |
| `poltrona-amamentacao-rotina` | ~20193 | DAMIE |

## Comandos para localizar referências antigas

Antes de atualizar, rode uma busca para encontrar possíveis referências ao mês anterior:

```bash
# Busca por meses/anos literais (ajustar conforme o mês anterior)
grep -n -E "(Janeiro|Fevereiro|Março|Abril|Maio|Junho|Julho|Agosto|Setembro|Outubro|Novembro|Dezembro|JANEIRO|FEVEREIRO|MARÇO|ABRIL|MAIO|JUNHO|JULHO|AGOSTO|SETEMBRO|OUTUBRO|NOVEMBRO|DEZEMBRO)\s+2026" src/lib/data.ts src/lib/couponsData.ts

# Busca por datas ISO do mês anterior (exemplo: junho 2026)
grep -n -E "2026-06-[0-9]{2}" src/lib/data.ts src/lib/couponsData.ts

# Busca por datas no formato "DD Mmm 2026" do mês anterior (exemplo: junho)
grep -n -E "(Jan|Fev|Mar|Abr|Mai|Jun|Jul|Ago|Set|Out|Nov|Dez)\s+2026" src/lib/data.ts src/lib/couponsData.ts
```

## Checklist de atualização mensal

- [ ] Atualizar `lastVerified` em `src/lib/couponsData.ts` para todos os cupons ativos
- [ ] Atualizar `metaDescription` de cupons que mencionam "atualizado mês ano"
- [ ] Atualizar `publishedAt` e `publishedAtISO` dos artigos de cupom
- [ ] Atualizar títulos de artigos de cupom que incluem mês/ano
- [ ] Atualizar textos internos dos artigos que mencionam `JUNHO 2026`, `JULHO 2026`, etc.
- [ ] Atualizar `publishedAt`/`publishedAtISO` das reviews relacionadas, quando houver novo conteúdo
- [ ] Rodar `npm run lint`
- [ ] Rodar `npm run typecheck`
- [ ] Rodar `npm run validate:content`
- [ ] Rodar `npm run build`
- [ ] Verificar `sitemap.xml` gerado (`<lastmod>` das rotas de cupom)

## Notas

- Não alterar datas de conteúdos que não têm relação com cupons (ex: receitas, reviews de produtos sem cupom ativo, histórico curioso).
- Artigos marcados como `draft: true` não geram páginas nem entram no sitemap, mas devem manter consistência se forem publicados no futuro.
- O template `/cupons/[brand]/page.tsx` não precisa ser editado para atualização mensal — o bloco de destaque é totalmente dados-driven.
