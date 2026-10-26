# Rastreamento de datas mensais dos cupons

> Documento de referência para facilitar a atualização mensal das referências de cupons no projeto.
> Última atualização: 26/10/2026.
>
> A data só deve avançar após verificação real ou confirmação direta da parceria, conforme
> `docs/MANUTENCAO-MENSAL.md`. Este arquivo é o inventário dos locais; a rotina de verificação
> é governada pelo documento de manutenção.

## Arquivos que precisam de revisão mensal

### 1. `src/lib/couponsData.ts`

Este é o contrato principal dos cupons. Verificar para cada cupom ativo:

- `lastVerified` (ISO 8601: `YYYY-MM-DD`): vira "Cupom testado em" nas lojas com código
- `testNote`: o texto do teste de checkout, que precisa continuar verdadeiro com a data nova
- `metaTitle`: nas lojas convertidas em 24/10/2026 leva o mês no fim, como `(nov/2026)`, quando cabe
  em 60 caracteres (I Wanna Sleep, Mais Mu, Skelt e Bagaggio convertidas na rodada de novembro; com
  código longo, Probiótica, Max Titanium e Dr. Peanut ficam sem mês). Nos cupons de ciclo (Dolce Gusto
  e Nestlé Nutre) e no Magalu, o título fica sem mês desde 24/10/2026: a data de teste vai só no "testado em".
  Trocar o mês só nas ofertas reconferidas.
- `metaDescription` e `longDescription`: abrem com "Cupom <Loja> testado em dd/mm/aaaa" (a descrição)
  ou citam "testado em dd/mm/aaaa" (o texto do topo), com a data do `lastVerified`; a mesma data nos três
- `monthlyHighlight.scope` / `monthlyHighlight.note` (quando houver regras específicas do mês)
- `relatedContent[].publishedAt` somente quando houver republicação/editorial real do conteúdo relacionado

#### Cupons ativos

| Slug | Marca | Código | Campos a verificar |
|---|---|---|---|
| `damie` | DAMIE | `CECILIA12` | `lastVerified`, `metaTitle`, `metaDescription`, `longDescription` |
| `dolce-gusto` | Nescafé Dolce Gusto | `CECI` (10% desde 26/10/2026, a partir de R$ 100) | `lastVerified`, `metaDescription`, `longDescription` (título sem mês); o percentual também está em 15 artigos (lista no fim de `docs/plans/2026-10-04-cupom-nutre-ceci-10.md`) |
| `yesstyle` | YesStyle | Fonte canônica em `data/coupons/yesstyle.json` | `lastVerified` é calculado; atualizar somente o JSON factual. Os cupons da loja trocam a cada 3 dias, mais ou menos: cadência própria na seção 3 de `docs/MANUTENCAO-MENSAL.md` |
| `nestle-nutre` | Nestlé Nutre | `CECI` (10% desde 04/10/2026) | `lastVerified`, `metaTitle`, `metaDescription`, `longDescription`; se o percentual mudar, usar `docs/plans/2026-10-04-cupom-nutre-ceci-10.md` |
| `i-wanna-sleep` | I Wanna Sleep | `CECIEMCASA` | `lastVerified`, `metaTitle`, `metaDescription`, `longDescription` |
| `magalu` | Magalu (Magazine Você da Cecília) | `100EMCASACOMCECILIA` (+ 9 faixas em `tiers`) | `lastVerified`, `metaDescription`, `longDescription`, FAQ "Cupom Magalu hoje" (título sem mês) |
| `letseatit` | Let's Eat It | `MAUAD` | `lastVerified`, `metaTitle`, `metaDescription`, `longDescription`; preservar os 4 UTMs da Inbazz em `offerUrl` |
| `insider` | Insider | `EMCASACOMCECILIA` (15% desde a publicação de 07/10/2026) | `lastVerified`, `metaTitle`, `metaDescription`, `longDescription`; manter `offerUrl` exatamente como veio |
| `probiotica` | Probiótica | `PRO10EMCASACOMCECILIA` (até 10%) | `lastVerified`, `testNote`, `metaTitle`, `metaDescription`, `longDescription`; manter `offerUrl` exatamente como veio |
| `dr-peanut` | Dr. Peanut | `DREMCASACOMCECILIA` | `lastVerified`, `testNote`, `metaTitle`, `metaDescription`, `longDescription`, faixa de frete grátis em `shipping` e na FAQ |
| `black-skull` | Black Skull | `CECILIA10` | `lastVerified`, `testNote`, `metaTitle`, `metaDescription`, `longDescription` |
| `lejour` | Lejour | Indicação por link, sem código | `lastVerified` e os preços e taxas dos planos na FAQ; manter `offerUrl` exatamente como veio |
| `max-titanium` | Max Titanium | `MAX10EMCASACOMCECILIA` (até 10%) | `lastVerified`, `testNote`, `metaTitle`, `metaDescription`, `longDescription` |
| `clea-store` | Cléa Store | `CSEMCASACOMCECILIA` | `lastVerified`, `testNote`, `metaTitle`, `metaDescription`, `longDescription`, faixa de frete grátis em `shipping` e na FAQ |
| `belive` | Belive | `MAUAD` (o mesmo da Let's Eat It) | `lastVerified`, `testNote`, `metaTitle`, `metaDescription`, `longDescription`, faixa de frete grátis em `shipping` e na FAQ |
| `mais-mu` | Mais Mu | `MMEMCASACOMCECILIA` | `lastVerified`, `testNote`, `metaTitle`, `metaDescription`, `longDescription`, faixas de frete grátis em `shipping` e na FAQ, regras do cashback na FAQ |
| `skelt` | Skelt | `SKEMCASACOMCECILIA` | `lastVerified`, `testNote`, `metaTitle`, `metaDescription`, `longDescription`, faixas de frete grátis em `shipping` e na FAQ, regra do brinde na FAQ; manter `offerUrl` exatamente como veio |
| `bagaggio` | Bagaggio | `CECILIA10` | `lastVerified`, `testNote`, `metaTitle`, `metaDescription`, `longDescription`, regra da promoção de 50% na 2ª peça em `combinable` e na FAQ; manter `offerUrl` exatamente como veio |
| `toda-up` | Toda Up | `MAUAD` (o mesmo da Let's Eat It e da Belive) | `lastVerified`, `testNote`, `metaTitle`, `metaDescription`, `longDescription`, regra da promoção progressiva em `combinable` e na FAQ; manter `offerUrl` exatamente como veio |
| `hostinger` | Hostinger | Indicação por link (o `SONARDEOFERTAS` vai no link), sem código para digitar | `lastVerified`, `metaTitle`, `metaDescription` e o percentual e as regras da indicação na FAQ, em PT e nos 9 idiomas de `couponTranslations.ts`; manter os dois links (o `/br` do PT e o global dos outros idiomas) exatamente como vieram |
| `shein` | SHEIN | Oferta por link, `referral` e `campaigns` | `lastVerified`, destinos, códigos, público e `verifiedAt` de cada campanha |

#### Cupons inativos (não aparecem no site, mas mantêm histórico)

| Slug | Marca | Código | Observação |
|---|---|---|---|
| `kopenhagen` | Kopenhagen | `CECILIA10` | Status `pausado`. Atualizar `lastVerified` se a parceria voltar. |

### 2. `src/app/(pt)/cupons/[brand]/page.tsx` e `src/components/coupons/CouponStorePage.tsx`

- O bloco de destaque mensal (`monthlyHighlight`) é renderizado automaticamente a partir dos dados.
- Não há hardcode de mês/ano neste arquivo — a data exibida vem de `lastVerified`.
- **Não precisa editar** a menos que a estrutura do bloco mude.

### 3. `content/reviews/*.json` — artigos de cupom

Os artigos abaixo contêm referências ao mês/ano e precisam de atualização mensal:

> Lista parcial, de setembro/2026: as lojas que entraram depois (Insider, Probiótica, Dr. Peanut,
> Black Skull, Max Titanium, Cléa Store, Belive, Mais Mu, Skelt, Bagaggio, Hostinger) também têm artigos
> de cupom. A fonte é o acervo: `rg -l '"affiliate": "<slug>"' content/reviews` e, nos que repetem
> código, percentual ou data, `rg -n "testado em|confirmado para|<mês> 2026" content/reviews`.
> "JSON homônimo" = `content/reviews/<slug>.json`.

> Importante: não alterar `publishedAt` ou `publishedAtISO` apenas por causa da atualização mensal do cupom. Essas datas são editoriais e devem refletir a publicação original do artigo. Atualize esses campos só quando o artigo for realmente republicado.

#### YesStyle

| Slug | Arquivo | Campos a verificar |
|---|---|---|
| `codigo-cecilia010-yesstyle-como-usar` | JSON homônimo | textos sobre validade, se houver |
| `yesstyle-reward-code-coupon-cecilia010` | JSON homônimo | textos sobre validade, se houver |
| `codigo-de-recompensa-yesstyle-cupon-cecilia010` | JSON homônimo | textos sobre validade, se houver |
| `code-recompense-yesstyle-cecilia010` | JSON homônimo | textos sobre validade, se houver |
| `yesstyle-reward-code-rabatt-cecilia010` | JSON homônimo | textos sobre validade, se houver |

#### DAMIE

| Slug | Arquivo | Campos a verificar |
|---|---|---|
| `cupom-cecilia12-como-usar` | JSON homônimo | textos sobre validade |

#### NESCAFÉ Dolce Gusto

| Slug | Arquivo | Campos a verificar |
|---|---|---|
| `cupom-ceci-nescafe-dolce-gusto-como-usar` | JSON homônimo | `title`, `metaDescription`, textos com `JUNHO 2026`/`JULHO 2026` |
| `promocao-dolce-gusto-caixas-mini-me-gratis` | JSON homônimo | regras e textos da promoção, se a oferta mudar |

#### I Wanna Sleep

| Slug | Arquivo | Campos a verificar |
|---|---|---|
| `cupom-ceciemcasa-i-wanna-sleep-como-usar` | arquivo JSON homônimo | textos sobre validade, se houver |

#### Nestlé Nutre

| Slug | Arquivo | Campos a verificar |
|---|---|---|
| `cupom-ceci-nestle-nutre-como-usar` | arquivo JSON homônimo | textos sobre validade, se houver |

### 4. `content/reviews/*.json` — reviews relacionadas às marcas de cupom

Essas reviews mencionam cupons e/ou são referenciadas em `relatedContent` dos cupons. Não atualizar `publishedAt`/`publishedAtISO` no ciclo mensal; revisar apenas textos de cupom caso exista menção ao mês vigente:

| Slug | Arquivo | Marca relacionada |
|---|---|---|
| `sofa-damie-modular-vale-a-pena` | JSON homônimo | DAMIE |
| `poltronas-reclinaveis-damie-vale-o-investimento` | JSON homônimo | DAMIE |
| `sofa-damie-na-caixa-vale-a-pena-o-modular` | JSON homônimo | DAMIE |
| `poltrona-moon-design-que-parece-obra-de-arte` | JSON homônimo | DAMIE |
| `poltrona-levita-o-topo-da-tecnologia-e-conforto` | JSON homônimo | DAMIE |
| `damie-reclame-aqui-o-que-os-dados-mostram` | JSON homônimo | DAMIE |
| `poltrona-amamentacao-rotina` | JSON homônimo | DAMIE |

## Comandos para localizar referências antigas

Antes de atualizar, rode uma busca para encontrar possíveis referências ao mês anterior:

```bash
# Busca por meses/anos literais (ajustar conforme o mês anterior)
grep -n -E "(Janeiro|Fevereiro|Março|Abril|Maio|Junho|Julho|Agosto|Setembro|Outubro|Novembro|Dezembro|JANEIRO|FEVEREIRO|MARÇO|ABRIL|MAIO|JUNHO|JULHO|AGOSTO|SETEMBRO|OUTUBRO|NOVEMBRO|DEZEMBRO)\s+2026" content/reviews src/lib/couponsData.ts

# Busca por datas ISO do mês anterior (exemplo: junho 2026)
# Atenção: datas em `publishedAtISO` podem ser datas editoriais legítimas e não devem ser trocadas automaticamente.
grep -n -E "2026-06-[0-9]{2}" content/reviews src/lib/couponsData.ts

# Busca por datas no formato "DD Mmm 2026" do mês anterior (exemplo: junho)
# Atenção: datas em `publishedAt` podem ser datas editoriais legítimas e não devem ser trocadas automaticamente.
grep -n -E "(Jan|Fev|Mar|Abr|Mai|Jun|Jul|Ago|Set|Out|Nov|Dez)\s+2026" content/reviews src/lib/couponsData.ts
```

## Checklist de atualização mensal

- [ ] Atualizar `lastVerified` em `src/lib/couponsData.ts` somente nas ofertas reconfirmadas
- [ ] Atualizar o mês do `metaTitle` e a data "testado em" da `metaDescription` e da `longDescription` só nas ofertas reconfirmadas
- [ ] Preservar `publishedAt` e `publishedAtISO` dos artigos já publicados, salvo republicação editorial real
- [ ] Atualizar títulos de artigos de cupom que incluem mês/ano
- [ ] Atualizar textos internos dos artigos que mencionam `JUNHO 2026`, `JULHO 2026`, etc.
- [ ] Atualizar `publishedAt`/`publishedAtISO` das reviews relacionadas somente quando houver novo conteúdo ou republicação real
- [ ] Rodar `npm run lint`
- [ ] Rodar `npm run typecheck`
- [ ] Rodar `npm run validate:content`
- [ ] Rodar `npm run build`
- [ ] Verificar `sitemap.xml` gerado (`<lastmod>` das rotas de cupom)

## Notas

- **Importante sobre `lastVerified`**: registrar a data real da verificação ou da confirmação direta da parceria. Nunca avançar mecanicamente todas as ofertas nem publicar data futura — isso contamina `dateModified` e `sitemap.xml`.
- Não alterar datas editoriais de conteúdos já publicados apenas para refletir a verificação mensal do cupom.
- Não alterar datas de conteúdos que não têm relação com cupons (ex: receitas, reviews de produtos sem cupom ativo, histórico curioso).
- Artigos marcados como `draft: true` não geram páginas nem entram no sitemap, mas devem manter consistência se forem publicados no futuro.
- O template `/cupons/[brand]/page.tsx` não precisa ser editado para atualização mensal — o bloco de destaque é totalmente dados-driven.
