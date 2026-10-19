---
parceiro: "Hostinger"
slug_cupom: "hostinger"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-19"
---

# Dossiê Factual: Hostinger

Indicação iniciada em 19/10/2026 com a página `/cupons/hostinger`, sem artigo. Não é parceria de
marca: é o programa de indicação da Hostinger, onde o site está hospedado, com o código do Bruno
(`SONARDEOFERTAS`) dentro do link. Fica fora do `/sobre` (decisão do Bruno, 19/10/2026).

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Indicação por link, sem cupom para digitar ("Não precisa de cupom") | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `hostinger`, `offerMode: 'affiliate-link'`) e página de indicação da Hostinger | 2026-10-19 | 2026-11-19 | O desconto fica vinculado ao link e já aparece nos preços | Alta |
| Link `https://www.hostinger.com/br?REFERRALCODE=SONARDEOFERTAS` | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-10-19 | 2026-11-19 | Enviado pelo Bruno; manter exatamente como veio. Abre `hostinger.com/br/refer`. Só no PT | Alta |
| Link global `https://www.hostinger.com/?REFERRALCODE=SONARDEOFERTAS`, nas páginas dos 9 idiomas | condicao_comercial_volatil | `offerUrl` de `hostinger` em `src/lib/couponTranslations.ts` | 2026-10-19 | 2026-11-19 | Sugerido pelo Bruno: abre `hostinger.com/refer` em inglês com as mesmas regras (20%, primeiro período, não soma), área de serviço "Worldwide", sem restrição de país ou moeda | Alta |
| 20% no primeiro período de qualquer plano novo, seja qual for o produto | condicao_comercial_volatil | FAQ da página de indicação | 2026-10-19 | 2026-11-19 | Não vale em renovação nem em compra já feita | Alta |
| Renovação pelo preço padrão do plano, o que aparece abaixo do card; dá para trocar o período ou cancelar antes | condicao_comercial_volatil | FAQ da página de indicação | 2026-10-19 | 2026-11-19 | | Alta |
| Não soma com outros cupons ("Este já é o melhor preço que podemos oferecer por este link") | condicao_comercial_volatil | FAQ da página de indicação | 2026-10-19 | 2026-11-19 | Exceção explícita à regra de que todo cupom soma com as promoções | Alta |
| Quem indica recebe crédito, que o Bruno usa na renovação dos planos do site | condicao_comercial_volatil | Bruno, 19/10/2026; programa de indicação da Hostinger | 2026-10-19 | 2026-11-19 | Os termos do programa (percentual e prazo de liberação) não foram conferidos: o texto só diz que a compra "pode gerar crédito" | Média |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Empresa de hospedagem de sites: hospedagem, criador de sites, VPS, domínios e e-mail | fato_oficial | hostinger.com/br | 2026-10-19 | 2027-01-19 | |
| O Em Casa com Cecília roda na Hostinger, como Node.js Web App | fato_oficial | `docs/DEPLOY-GUIDE.md` | 2026-10-19 | 2027-01-19 | É a experiência própria que a página pode citar |

---

## 3. Alertas Editoriais

Nunca mandar digitar o `SONARDEOFERTAS`: o código vai no link, e a página não o mostra. Não chamar a
indicação de cupom. Todo texto diz que os 20% valem só no primeiro período e não somam com outros
cupons. Artigo só por decisão do Bruno: o tema está fora do site, e as buscas por cupom de hospedagem
são muito disputadas.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/hostinger-icon.png` | Símbolo "H" do SVG do logotipo do site oficial, em branco sobre o roxo da marca (`#673DE6`), baixado em 2026-10-19 | Página da loja, cards e imagem de compartilhamento | Identificação da marca |
| `/images/logos/watermarks/hostinger.webp` | Silhueta do logotipo completo do mesmo SVG | Marca-d'água da página e dos cards | Identificação da marca |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
