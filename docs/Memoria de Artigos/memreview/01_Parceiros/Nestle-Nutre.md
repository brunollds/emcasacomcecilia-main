---
parceiro: "Nestlé Nutre"
slug_cupom: "nutren"
codigo_cupom: "CECI"
status_parceria: "ativo"
revisao_geral_ate: "2026-09-01"
---

# Dossiê Factual: Nestlé Nutre

---

## 1. Dados Comerciais & Cupons (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `CECI` oferece 10% de desconto na loja oficial Nestlé Nutre | condicao_comercial_volatil | `src/lib/couponsData.ts` + print do checkout | 2026-10-04 | 2026-11-01 | Era 5% até 03/10/2026; ainda não se sabe se os 10% são fixos ou temporários. Reversão: `docs/plans/2026-10-04-cupom-nutre-ceci-10.md` | Alta |
| Cupom `CECI` não vale para Alfamino e Alfaré | condicao_comercial_volatil | `src/lib/couponsData.ts` | 2026-10-04 | 2026-11-01 | Exclusão comercial da loja, sem motivo divulgado | Alta |

---

## 1.1 Alertas Regulatórios

> [!CAUTION]
> **Fórmulas infantis para bebês de 0 a 12 meses (ex.: NAN dessa faixa) nunca recebem o CECI.**
> O art. 5º do Decreto 9.579/2018 proíbe a promoção comercial de fórmulas infantis para lactentes
> e de seguimento para lactentes (art. 3º, IV), e o parágrafo único cita "descontos de preço" e
> "cupons de descontos", inclusive em meios eletrônicos. Lactente é a criança de até 11 meses e
> 29 dias (art. 4º). Conferido no texto do Planalto em 04/10/2026.
>
> - Não escrever, em página ou artigo, frase que sugira o CECI nessas fórmulas. Toda menção às
>   exceções do cupom inclui "fórmulas infantis de 0 a 12 meses".
> - Alfamino e Alfaré (necessidades dietoterápicas, art. 3º, V) ficam de fora por regra da loja,
>   não por essa proibição. NAN para 1 a 3 anos (art. 3º, III) também não está na proibição.
> - A mesma vedação alcança mamadeiras, bicos e chupetas (art. 3º, VII).

---

## 2. Linhas de Produtos & Fatos Oficiais (Estáveis)

| Linha de Produto | Foco / Aplicação | Fatos Principais | Fonte |
|---|---|---|---|
| **Nutren Just Protein** | Proteína isolada pura sem sabor (280g) | **Tabela por 15g:** 52 kcal, 13g Proteína, 0g Carboidratos, 0g Gorduras, 76mg Sódio. Ingredientes: proteína isolada do soro do leite e lecitina. Origem clínica (pós-operatório, bariátrica, oncologia, sarcopenia). | Embalagem física oficial 280g |
| **Nutren Senior** | Adultos 50+ / Sênior | Rico em cálcio, vitamina D, zinco e proteínas para manutenção de massa muscular | Rótulo oficial |
| **Nutren Protein** | Dia a dia / Ativos | Foco em proteína rápida para lanches e rotina ativa | Rótulo oficial |
| **Nutren Control** | Controle glicêmico | Fórmula desenvolvida para quem busca equilíbrio de glicose (baixo índice glicêmico) | Rótulo oficial |
| **Nutren Beauty** | Cuidados com pele | Colágeno hidrolisado e antioxidantes | Rótulo oficial |
| **FiberMais** | Fibras solúveis | 100% fibra solúvel que não altera sabor nem textura dos alimentos | Rótulo oficial |
| **Impact** | Nutrição clínica especializada | Dieta hiperproteica para preparo imunológico pré e pós-operatório | Rótulo oficial |

---

## 3. Dores Mapeadas
- [[nutren-just-protein-para-que-serve]] (O que é proteína sem sabor, origem clínica, como usar em comida de verdade e receitas) ✅
- [[nutren-senior-como-tomar-sem-empelotar]] (Como dissolver na água ou leite frio/quente, dosagem diária)
- [[diferenca-nutren-senior-protein-control]] (Tabela comparativa direta de calorias, proteínas e açúcares para escolha certa)
- [[fibermais-como-usar-em-receitas-e-bebidas]] (Dose recomendada, se pode levar ao fogo ou congelar)

---

## 4. Artigos Já Publicados / Em Produção no Cluster
- `nutren-just-protein-para-que-serve` (Em conformação JSON)
- `nestle-nutre-produtos-para-que-servem`
- `nestle-nutre-e-confiavel`
- `nutren-senior-zero-lactose-ficha-tecnica`
- `cupom-ceci-nestle-nutre-como-usar`
