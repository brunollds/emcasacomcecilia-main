---
parceiro: "Lejour"
slug_cupom: "lejour"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-13"
---

# Dossiê Factual: Lejour

Parceria iniciada em 13/10/2026 com a página `/cupons/lejour`, ainda sem artigo. É a primeira loja
de link sem código nenhum: o cadastro do casal pelo link é a indicação.

---

## 1. Dados Comerciais (Voláteis)

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Indicação por link, sem cupom e sem benefício para o casal | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `lejour`, `offerMode: 'affiliate-link'`) | 2026-10-13 | 2026-11-13 | "Não ganha nada, é só indicação nossa" (Bruno, 13/10) | Alta |
| Link de cadastro com `affiliate=emcasacomcecilia&source=the-coachers` | condicao_comercial_volatil | `offerUrl` em `src/lib/couponsData.ts` | 2026-10-13 | 2026-11-13 | A indicação só conta para cadastros feitos pelo link; manter exatamente como veio | Alta |
| Plano Basic: gratuito; taxa da lista de presentes 3,89%; até 2 saques gratuitos; domínio .site por R$ 69,90; fotos dos convidados (Capture) até 10 participantes | condicao_comercial_volatil | Tabela de planos enviada pelo Bruno | 2026-10-13 | 2026-11-13 | Tradução do site em inglês e espanhol | Alta |
| Plano Premium: R$ 99,90 (de R$ 179,90), vitalício, à vista ou em até 12x; taxa 3,29%; saques ilimitados; domínio incluso | condicao_comercial_volatil | Tabela de planos enviada pelo Bruno | 2026-10-13 | 2026-11-13 | "Mais vendido" | Alta |
| Plano Pro: R$ 199,90, vitalício, à vista ou em até 12x; taxa 2,99%; saques ilimitados; domínio incluso; Capture ilimitado; atendimento prioritário | condicao_comercial_volatil | Tabela de planos enviada pelo Bruno | 2026-10-13 | 2026-11-13 | | Alta |

---

## 2. Fatos Oficiais (Estáveis)

| Fato / Especificação | Tipo | Fonte | Consultado Em | Rever Até | Notas |
|---|---|---|---|---|---|
| Plataforma brasileira de casamento: site do casal e lista de presentes ("Crie seu site de casamento grátis e lista de presentes") | fato_oficial | Título do site lejour.com.br | 2026-10-13 | 2027-01-13 | Site em WordPress; o painel fica em painel.lejour.com.br |
| Logotipo do site aparece junto com o da Fast Shop ("Fast Shop + le jour") | fato_oficial | Cabeçalho de lejour.com.br | 2026-10-13 | 2027-01-13 | Notícias de 2022–2023 tratam a Lejour como startup da Fast Shop; reconfirmar antes de citar |

---

## 3. Alertas Editoriais

Nunca chamar a indicação de cupom nem prometer desconto. A página diz "Lista grátis" porque o
plano Basic é gratuito para qualquer casal, com ou sem o link. Nos artigos deste parceiro, usar
`affiliate: "lejour"` e link relativo para `/cupons/lejour`, conforme
`docs/CONTRATO-ARTIGO-AFILIADO.md`.

---

## 4. Mídia da Marca

| Arquivo | Origem | Uso | Licença |
|---|---|---|---|
| `/images/about/partners/lejour.png` | Parte "le jour" do logotipo "Fast Shop + le jour" do site oficial, baixado em 2026-10-13 | Parceiros comerciais no `/sobre` | Identificação da marca parceira |
| `/images/about/partners/lejour-icon.png` | Favicon oficial ("lj." no fundo coral), baixado em 2026-10-13 | Bolinha da home, chip e imagem de compartilhamento | Identificação da marca parceira |
| `/images/logos/watermarks/lejour.webp` | Silhueta do "le jour" | Marca-d'água da página e dos cards | Identificação da marca parceira |

Os logos estão no CDN e no mapa de entrega. Para trocar um logo, criar arquivo com nome novo,
conforme `docs/GUIA-MIDIA-EDITORIAL.md`.
