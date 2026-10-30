# Fatos com fonte e data: briefing Hostinger ou HostGator (30/10/2026)

Regra: cada fato traz URL e data da leitura. Leitura por HTTP (sem login, sem carrinho, sem link de indicação aberto). Preço só com a moeda da página.

## Hostinger (compartilhada)

| Fato | Fonte | Data | Uso |
|---|---|---|---|
| Single: R$ 5,99/mês (total R$ 287,52), renova R$ 23,99, 48 meses; 1 site; 10 GB SSD; backups semanais | https://www.hostinger.com/br/hospedagem-de-sites (e `/br/hospedagem-wordpress`) | 2026-10-28 | Tabela |
| Premium: R$ 9,99/mês (total R$ 479,52), renova R$ 38,99, 48 meses; 3 sites; 20 GB SSD | mesma | 2026-10-28 | Tabela |
| Unlimited: R$ 12,99/mês (total R$ 623,52), renova R$ 64,99, 48 meses; sites ilimitados; 50 GB NVMe; backups diários | mesma | 2026-10-28 | Tabela |
| Cloud Startup: R$ 39,99/mês (total R$ 1.919,52), renova R$ 129,99, 48 meses; 100 GB NVMe | mesma | 2026-10-28 | Tabela |
| Página sem data de fim; "até 82% off na Black Friday" | mesma | 2026-10-28 | Ressalva |
| Com o código (leitura do Chrome do Bruno, 28/10): Single R$ 4,79; Premium R$ 7,99; Unlimited R$ 10,39; Cloud Startup R$ 31,99 | `fatos-hostinger-chrome-2810.md` (rodada 28/10) | 2026-10-28 | Não usar no texto sem teste no plano |

## Hostinger (VPS)

| Fato | Fonte | Data | Uso |
|---|---|---|---|
| KVM 1 (1 vCPU, 4 GB, 50 GB): R$ 29,99/mês (riscado R$ 87,99), renova R$ 59,99, 24 meses | https://www.hostinger.com/br/servidor-vps | 2026-10-28 | Tabela |
| KVM 2 (2 vCPU, 8 GB, 100 GB): R$ 42,99, renova R$ 77,99, 24 meses | mesma | 2026-10-28 | Tabela |
| KVM 4 (4 vCPU, 16 GB, 200 GB): R$ 59,99, renova R$ 149,99, 24 meses | mesma | 2026-10-28 | Tabela |
| KVM 8 (8 vCPU, 32 GB, 400 GB): R$ 119,99, renova R$ 259,99, 24 meses | mesma | 2026-10-28 | Tabela |
| Com o código (Chrome 28/10): KVM 1 R$ 23,99; KVM 2 R$ 34,39; KVM 4 R$ 47,99; KVM 8 R$ 95,99 | `fatos-hostinger-chrome-2810.md` | 2026-10-28 | Não usar; VPS não testado |

## HostGator

| Fato | Fonte | Data | Uso |
|---|---|---|---|
| VPS "a partir de R$ 20,99/mês*" (promo), "Planos com até 73% OFF", sem detalhe de plano, asterisco sem nota visível | https://www.hostgator.com.br/servidor-vps (leitura automatizada) | 2026-10-30 | Não usar até tabela |
| "Black November", sem datas; arquivos com "black-friday-2026" | mesma | 2026-10-30 | Ressalva |
| "30 dias para reembolso" | mesma | 2026-10-30 | Possível, com a fonte |
| Página de hospedagem de sites sem planos na leitura; cita "até 2 domínios grátis", garantia de 30 dias, servidores no Brasil, e-mail grátis, suporte 24h | https://www.hostgator.com.br/hospedagem-de-sites | 2026-10-30 | Recurso geral; sem preço |
| Página de preços sem valores na leitura (texto "confira abaixo os preços", sem valor) | https://www.hostgator.com.br/precos-hostgator | 2026-10-30 | [PENDENTE: navegador] |

## Sobreposição e fila

| Fato | Fonte | Data |
|---|---|---|
| `vps-ou-hospedagem-compartilhada-qual-escolher` publicado com 10 idiomas, só Hostinger | `content/reviews/` e `Fila-de-Pautas.md` | 2026-10-30 |
| O site roda na Hostinger como Node.js Web App | `docs/DEPLOY-GUIDE.md` | 2026-10-19 |

## Pendentes de navegador

- `[PENDENTE: navegador]` https://www.hostgator.com.br/precos-hostgator: compartilhada e VPS, promocional, renovação, prazo, espaço, sites, recursos.
- `[PENDENTE: navegador]` https://www.hostgator.com.br/servidor-vps: tabela de VPS.
- `[PENDENTE: navegador]` https://www.hostinger.com/br/servidor-vps e https://www.hostinger.com/br/hospedagem-de-sites: reconferir no Chrome.

## HostGator lida no Chrome (Claude, 30/10/2026, liberado pelo Bruno)

Hospedagem de sites, https://www.hostgator.com.br/hospedagem-de-sites (cartões com "Até 79% OFF", ciclo de 3 anos):

| Plano | Promocional | Total 3 anos | "De" no cartão | Sites | Armazenamento | Visitas/mês |
|---|---|---|---|---|---|---|
| P (+ domínio grátis) | R$ 10,09/mês* | R$ 361,61 | R$ 1.652,04 (78% OFF) | 1 | 100 GB NVMe | até 80 mil |
| M (+ 2 domínios) | R$ 11,49/mês* | R$ 412,17 | R$ 2.001,24 (79% OFF) | +60 | 100 GB NVMe | até 120 mil |
| Turbo (+ 3 domínios) | R$ 18,69/mês* | R$ 670,22 | R$ 2.663,64 (74% OFF) | +150 | 150 GB NVMe | até 400 mil |

Todos: servidores no Brasil, e-mail ilimitado "por 1 ano", SSL, backup diário, CDN, migração grátis, "+3 meses grátis no plano e no Yoast AI+".

Preço regular (sem desconto), https://www.hostgator.com.br/precos-hostgator — referência de renovação:

| Plano | Trienal (total / mês eq.) | Anual (total / mês eq.) | Mensal |
|---|---|---|---|
| Start | R$ 723,24 / R$ 20,09 | R$ 310,29 / R$ 25,89 | R$ 31,59 |
| P | R$ 1.130,04 / R$ 31,39 | R$ 438,79 / R$ 36,59 | R$ 45,89 |
| M | R$ 1.472,04 / R$ 40,89 | R$ 543,09 / R$ 45,29 | R$ 55,59 |
| Turbo | R$ 2.393,64 / R$ 66,49 | R$ 838,19 / R$ 69,89 | R$ 73,99 |

Achado: o "De" do cartão (P: R$ 1.652,04 em 3 anos) é maior que o preço regular trienal da tabela de preços (P: R$ 1.130,04). Usar só a tabela de preços como referência de renovação; não repetir o "% OFF" do cartão.

VPS, https://www.hostgator.com.br/servidor-vps ("Desempenho padrão", ciclo de 3 anos, Oracle Cloud no Brasil, cPanel disponível, 1 IP dedicado):

| Plano | Promocional | Total 3 anos | "De" | vCPU | RAM | NVMe |
|---|---|---|---|---|---|---|
| VPS NVMe 2 | R$ 20,99/mês | R$ 755,64 | R$ 1.979,28 (61% OFF) | 1 | 2 GB DDR5 | 50 GB |
| VPS NVMe 4 | R$ 30,39/mês | R$ 1.094,11 | R$ 3.479,40 (68% OFF) | 2 | 4 GB | 100 GB |
| VPS NVMe 8 | R$ 45,49/mês | R$ 1.637,77 | R$ 6.239,52 (73% OFF) | 4 | 8 GB | 200 GB |

A tabela de preço regular do VPS não abriu (a aba leva à página do VPS). Os gráficos "mais rápidos do Brasil" contra "Concorrente 1/2" são da própria HostGator: não citar como fato.
