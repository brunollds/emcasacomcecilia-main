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

## 3. Black Friday (páginas oficiais, lidas em 11/10/2026)

Cada cupom tem uma página de regras na central de ajuda, em `yesstyle.com/en/help/section.html/hsi.<id>`,
com início e fim em GMT. As páginas antigas seguem no ar, fora do menu, e os ids são sequenciais.

| Dado | Fonte | Regra |
|---|---|---|
| Calendário de 2024: cupom de faixa "Black Friday" de 4/11 a 29/11, 15% em tudo sem mínimo de 29/11 a 2/12, Cyber Monday 15% de 2/12 a 4/12, cupom de faixa até 10/12; Natal com 18% em tudo de 22 a 26/12 | `hsi.2585`–`2597`, `2601`, `2602` | usar no artigo como histórico, com o ano |
| Calendário de 2025: cupom de faixa de 3/11 a 27/11, 15% sem mínimo de 27/11 a 1/12, Cyber Monday 15% de 1/12 a 3/12, cupom de faixa até 8/12; 18% "We Miss You" para membros selecionados (28/11 a 1/12); Daily Dollar Deal para Bronze, Silver e Gold (24 a 30/11) | `hsi.2742`–`2757` | idem |
| As faixas do cupom (8% a partir de US$ 79, 10% a partir de US$ 149, 15% a partir de US$ 199) são as mesmas fora e dentro da Black Friday | `hsi.2736` (out/2025) e `hsi.2745` (nov/2025) | o cupom da Black Friday não é maior que o do ano |
| Todos os cupons valem junto com preços promocionais, Rewards Codes e YS Points; um cupom por pedido; só membros | termos de cada página | fonte oficial de que o CECILIA010 soma com o cupom da loja |
| Reembolso de impostos e taxas de alfândega em pedidos abaixo de US$ 1.000 (antes do cupom, sem frete), com comprovante em até 30 dias, em crédito na loja; fora dele os impostos cobrados no checkout de alguns países | `hsi.2212` | vale para o Brasil |
| Envios ao Brasil suspensos desde 3/7/2026 (aviso em `/pt/help/announcement.html`); voltaram em setembro, segundo o Bruno (11/10/2026) | aviso + Bruno | em 11/10 o seletor de destino e a tabela de frete ainda não listavam o Brasil; **em 28/10/2026 o Bruno conferiu no app: continua sem entrega para o Brasil** |
| App: o código vai no campo "Influencer / Rewards Code" do "Enter Code", ao lado do "Coupon Code"; o CECILIA010 aplicado aparece como "Influencer Code Discount" | prints do Bruno no app Android, 28/10/2026 | ver [[yesstyle-app-como-comprar-codigo-de-recompensa]] |
| Capa provisória do guia da Black Friday: `/images/reviews/yesstyle/black-friday-yesstyle-cecilia.webp`, quadro do vídeo `agfG-x5lq1s` (canal da Cecília) | autorização do Bruno, 11/10/2026 | trocar pelo banner oficial da Black Friday de 2026 quando sair |

A Black Friday de 2026 ainda não tinha página em 11/10/2026. Os códigos dos cupons ficam fora dos
artigos (seção 1).
