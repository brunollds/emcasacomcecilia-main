# Fatos com fonte e data: briefings Hostinger H1, H2 e H3 (28/10/2026)

Regra: cada fato traz a URL e a data da leitura. Preço só do BR. Fora do BR e Horizons: pendente, sem valor. Leituras por HTTP (curl, sem login, sem carrinho, sem link de indicação aberto).

## Produto e páginas

| Fato | Fonte (URL) | Data | Uso |
|---|---|---|---|
| Página de Horizons redireciona para `/br/ai-builder` | `https://www.hostinger.com/br/horizons` (redirect HTTP) | 2026-10-28 | H1 |
| Horizons: "Descreva o que você precisa e a IA irá construí-lo. Não são necessárias habilidades técnicas." | `https://www.hostinger.com/br/ai-builder` (HTTP 200, lida antes da instrução de 28/10 de não ler; reconfirmar no Chrome) | 2026-10-28 | H1, só como citação a reconfirmar |
| Horizons: "Lançamento com 1 clique: contrate hospedagem, domínio e e-mail" | mesma página | 2026-10-28 | H1, a reconfirmar |
| Preços e planos do Horizons | `https://www.hostinger.com/br/ai-builder` | - | NÃO USADOS. [PENDENTE: navegador] |
| Página de servidor VPS (specs KVM 1 a 8) | `https://www.hostinger.com/br/servidor-vps` (HTTP 200) | 2026-10-28 | H3 |
| Página de hospedagem de sites (planos e campanha) | `https://www.hostinger.com/br/hospedagem-de-sites` (redireciona de `/br/hospedagem-web`) | 2026-10-28 | H3 |

## Preços BR (28/10/2026, sem indicação, campanha BF)

| Item | Preço promocional | Renovação | Prazo | Fonte |
|---|---|---|---|---|
| VPS KVM 1 (1 vCPU, 4 GB, 50 GB) | R$ 29,99/mês (riscado R$ 87,99) | R$ 59,99/mês | 24 meses | `servidor-vps` |
| VPS KVM 2 (2 vCPU, 8 GB, 100 GB) | R$ 42,99/mês | R$ 77,99/mês | 24 meses | `servidor-vps` |
| VPS KVM 4 (4 vCPU, 16 GB, 200 GB) | R$ 59,99/mês | R$ 149,99/mês | 24 meses | `servidor-vps` |
| VPS KVM 8 (8 vCPU, 32 GB, 400 GB) | R$ 119,99/mês | R$ 259,99/mês | 24 meses | `servidor-vps` |
| Hospedagem Single | R$ 5,99/mês (total R$ 287,52) | R$ 23,99/mês | 48 meses | `hospedagem-de-sites` |
| Hospedagem Premium | R$ 9,99/mês (total R$ 479,52) | R$ 38,99/mês | 48 meses | `hospedagem-de-sites` |
| Hospedagem Ilimitado | R$ 12,99/mês (total R$ 623,52) | R$ 64,99/mês | 48 meses | `hospedagem-de-sites` |
| Cloud Startup | R$ 39,99/mês (total R$ 1.919,52) | R$ 129,99/mês | 48 meses | `hospedagem-de-sites` |

Ressalva: a página de hospedagem diz "80% de desconto" e "até 82% off na Black Friday" e não traz data de fim. O artigo `black-friday-hostinger` (vault) diz campanha de 19/10 a 14/12; usar só como referência do artigo, não como data da página.

## Indicação (Chrome do Bruno, 21/10/2026, lido no briefing `openclaw-hostinger-gerenciado-ou-vps`)

| Item | Com indicação | Fonte | Status |
|---|---|---|---|
| KVM 1 | R$ 23,99/mês | Chrome 21/10 | a reconfirmar no Chrome (H3) |
| KVM 2 | R$ 34,39/mês | Chrome 21/10 | a reconfirmar |
| KVM 4 | R$ 47,99/mês | Chrome 21/10 | a reconfirmar |
| KVM 8 | R$ 95,99/mês | Chrome 21/10 | a reconfirmar |
| Plano gerenciado de agentes | R$ 19,99/mês | Chrome 21/10 | fora desta rodada |

Regra de indicação (Chrome 21/10): "20% só no primeiro período", vale nos planos de 24 meses de VPS e de agentes. Os termos do programa não entram nesta rodada.

## Autocompletar (28/10/2026)

Literal em `rodada-hostinger\autocomplete-2810.txt`. As sugestões usadas em cada briefing estão nas seções 3 de cada arquivo. Sugestões de cupom, promo e "gratis" ficam fora. Ruído: "hoster-jp" (outra empresa) e "hostinger.com.hk".

## Dossiê e fila

| Fato | Fonte | Data |
|---|---|---|
| O site roda na Hostinger como Node.js Web App | `docs/DEPLOY-GUIDE.md` (citado no dossiê) | 2026-10-19 |
| Ninguém do site usa OpenClaw, Hermes ou Paperclip | Bruno, 21/10/2026 (briefings de agentes) | 2026-10-21 |
| Sem artigo PT sobre Horizons, WordPress de site, domínio ou VPS comum | busca em `content/reviews` e `Fila-de-Pautas.md` | 2026-10-28 |

## Pendentes de navegador (URL exata)

- `https://www.hostinger.com/br/ai-builder`: preço, plano e limite do Horizons; reconfirmar a citação.
- Página de domínios (URL exata a confirmar pelo menu Domínios de `https://www.hostinger.com/br`): preço de registro e renovação, taxa de transferência.
- `https://www.hostinger.com/br/servidor-vps` com indicação: KVM 1 a 8.
- `https://www.hostinger.com/br/refer`: indicação no VPS.
- Preços fora do BR (en, es, fr, it, de, ja, ko, zh): não lidos.

---

# Hostinger: leitura no Chrome (Claude, 28/10/2026). Vale sobre o fatos-hostinger-2810.md nos pontos que trata

Navegador com o código de indicação já aplicado ("Código de indicação aplicado" em cada plano).

**Horizons virou "Criador com IA".** `hostinger.com/horizons` redireciona para `/ai-builder` ("Hostinger AI Builder"). A página diz: "Ele evoluiu a partir da fusão do nosso construtor de sites com o Horizons em um único construtor com dois modos: Manual, para edição do tipo 'arrastar e soltar', e Agentic, para codificação intuitiva." A página BR (`/br/ai-builder`, "Criador com IA da Hostinger") não usa a palavra Horizons. Há "Comece grátis".
- Os planos do Criador com IA são os mesmos da hospedagem, com os mesmos preços (BR, com indicação, 48 meses): Premium R$ 7,99/mês (de R$ 48,99; paga R$ 383,52; renova R$ 38,99/mês; 500 créditos de IA na BF em vez de 250; até 3 sites); Unlimited R$ 10,39/mês (paga R$ 498,72; renova R$ 64,99; 1000 créditos em vez de 500; e-commerce grátis por 3 meses); Startup de comércio eletrônico R$ 31,99/mês (paga R$ 1.535,52; renova R$ 129,99; 2000 créditos em vez de 1000). Domínio e e-mail grátis por 1 ano.
- EUA (`/ai-builder`, com indicação): Premium US$ 1,99/mês, paga US$ 95,52 por 48 meses, renova US$ 10,99/mês.

**Hospedagem de sites** (`/br/hospedagem-de-sites`, com indicação, 48 meses): Single R$ 4,79/mês (paga R$ 229,92; renova R$ 23,99); Premium R$ 7,99 (R$ 383,52; renova R$ 38,99); Unlimited R$ 10,39 (R$ 498,72; renova R$ 64,99); Cloud Startup R$ 31,99 (R$ 1.535,52; renova R$ 129,99). Sem data de fim da campanha na página.

**VPS** (`/br/servidor-vps`, com indicação, 24 meses): KVM 1 R$ 23,99/mês (paga R$ 575,76; renova R$ 59,99); KVM 2 R$ 34,39 (R$ 825,36; renova R$ 77,99); KVM 4 R$ 47,99 (R$ 1.151,76; renova R$ 149,99); KVM 8 R$ 95,99 (R$ 2.303,76; renova R$ 259,99).

**Domínios** (`/br/registro-de-dominio`, tabela "Primeiro ano | Renovação | Transferir"): .com.br R$ 64,99 no 1º ano, ou R$ 1 com prazo de 3 anos; renova R$ 64,99/ano; transferir R$ 0,99. .com R$ 94,99, ou R$ 0,01 com prazo de 3 anos; renova R$ 94,99/ano; transferir R$ 54,99. .org R$ 44,99 (renova R$ 88,99; transferir R$ 71,99). .online, .shop, .store R$ 5,99 no 1º ano (renovam R$ 197,99 a R$ 284,99). Privacidade WHOIS grátis "para extensões compatíveis". "Domínio grátis no primeiro ano em planos selecionados."
