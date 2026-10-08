---
parceiro: "DAMIE"
slug_cupom: "damie"
fonte_dados_comerciais: "src/lib/couponsData.ts"
status_parceria: "ativo"
revisao_geral_ate: "2027-01-07"
---

# Dossiê Factual: DAMIE

---

## 1. Dados Comerciais & Subdomínio

| Fato / Condição Comercial | Tipo | Fonte Canônica | Consultado Em | Rever Até | Escopo / Regras | Confiança |
|---|---|---|---|---|---|---|
| Cupom `CECILIA12`: 12% OFF em todo o site | condicao_comercial_volatil | `src/lib/couponsData.ts` (slug: `damie`) | 2026-10-07 | 2026-11-07 | Soma com promoções e brindes vigentes; não soma com outro cupom; sem limite de usos por CPF | Alta |
| Subdomínio DAMIE é dono da intenção | diretriz_arquitetura | `HANDOFF-LIFESTYLE-FASE-0.md` | 2026-08-13 | 2027-01-01 | Não criar campanhas massivas de linkagem comercial no domínio principal | Alta |
| Links de cupom no site principal vão ao subdomínio | diretriz_arquitetura | `docs/CONTRATO-ARTIGO-AFILIADO.md`, seção 6 | 2026-10-07 | 2027-01-01 | Nunca linkar `/cupons/damie`; usar `https://damie.emcasacomcecilia.com/cupom-cecilia12` com UTM (`utm_source=site-principal&utm_medium=blog&utm_campaign=cecilia12&utm_content=<artigo>`) no texto e no CTA | Alta |
| Brinde: carregador USB (tipo A e C) e porta-copos pretos nas poltronas reclináveis | condicao_comercial_volatil | Configurador de damie.com.br | 2026-10-07 | 2026-11-07 | Adicionado automaticamente ao carrinho | Média |
| 30 dias para experimentar em casa, 1 ano de garantia, suporte vitalício, peças a preço de custo, frete grátis para Sul e Sudeste | condicao_comercial_volatil | Páginas de produto da reclinável | 2026-10-07 | 2027-01-07 | Na devolução em 30 dias, a marca agenda a coleta e devolve o valor pago | Alta |
| Frete e entrega: grátis em poltronas e sofás no Sul e no Sudeste; Centro-Oeste pelo CEP; Norte e Nordeste só pelos anúncios oficiais da DAMIE no Mercado Livre; prazo informado no cálculo do frete e contado da confirmação do pagamento; entrega até o hall em prédio; montagem pelo cliente, por encaixe | regra_oficial | damie.com.br/pages/fretes-e-entregas | 2026-10-08 | 2027-01-08 | A página fala em "Centro-Oeste e capitais" sem dizer quais capitais; não citar as capitais. O CECILIA12 é aplicado no checkout do site | Alta |
| Pagamento: Pix à vista com 10% OFF; cartão e PayPal em até 12x sem juros (parcela mínima de R$ 100); boleto à vista, compensa em até 2 dias úteis | regra_oficial | damie.com.br/pages/formas-de-pagamento | 2026-10-08 | 2027-01-08 | O giftback de 15% em 45 dias só aparece na faixa do site, sem regras publicadas. O CECILIA12 soma com o Pix e com as demais promoções e descontos do site; não soma com outro cupom nem com o giftback (Bruno, 08/10/2026) | Alta |
| Desconto por quantidade nas reclináveis: R$ 500 em 2, R$ 1.000 em 3, R$ 1.500 em 4, R$ 2.000 em 5 | condicao_comercial_volatil | Página de produto da reclinável | 2026-10-08 | 2026-11-08 | Só pelos consultores no WhatsApp; soma com o CECILIA12 (Bruno, 08/10/2026) | Média |

---

## 2. Catálogo, Tecidos & Mecânica (Estáveis)

| Produto / Linha | Tecidos Disponíveis | Mecanismo | Garantia |
|---|---|---|---|
| **Sofá Modular DAMIE** | Linho, Bouclé, Suede, Couro | Encaixe modular por módulos | 1 ano de garantia geral; depois, suporte vitalício e peças de reposição a preço de custo |
| **Poltrona Reclinável DAMIE 1.0 e 2.0** | Suede, Bouclé, Linho, Corino Importado, Couro Bovino | Quatro bases: manual, elétrica fixa, elétrica com giro e balanço, elétrica com elevação (detalhes abaixo) | 1 ano |
| **Levita e Moon** | Não reconferidos nesta rodada | Levita: elétrica, base giratória 360° segundo a página oficial (07/10/2026) | 1 ano |

A DAMIE **não tem linha própria de poltrona de amamentação**. A indicada pela marca para
amamentação é a reclinável elétrica com base de giro e balanço ("perfeita para amamentação",
na página do produto).

Fonte e data da condição do sofá modular: [coleção oficial da Damie](https://www.damie.com.br/collections/sofa-modular/), consultada em 26/08/2026. Os termos devem ser reconfirmados antes de publicar ou atualizar conteúdo comercial.

### Reclinável DAMIE: bases e preços (consultado em 07/10/2026)

| Base | Como funciona (tabela da marca) | Preço |
|---|---|---|
| Manual base fixa (com gatilho) | Alavanca lateral; reclina com o peso do corpo; exige esforço de pernas e braços; não usa energia | R$ 2.969 a R$ 4.440 |
| Elétrica base fixa | Motor; reclina até 170° | R$ 3.749 a R$ 5.199 |
| Elétrica com giro e balanço | Motor; reclina até 145°; **giro de 180°** e balanço | R$ 4.299 a R$ 5.699 |
| Elétrica com elevação (lift) | Motor; reclina até 145°; inclina a base para a frente para ajudar a levantar (a marca indica para idosos e pós-operatório) | R$ 4.969 a R$ 6.149 |

- Preços conforme o revestimento; 1.0 e 2.0 tinham a mesma faixa na data da consulta.
- A 2.0 traz quatro melhorias: almofada de cabeça móvel e acolchoada com regulagem de altura,
  bolsos laterais ampliados, apoio de braço contínuo e apoio de pés com mais espuma.
- Medidas da 2.0 (desenho da marca): 106 cm de altura, 89 cm de largura, 95 cm de profundidade;
  174 cm de comprimento totalmente reclinada.
- Passagem: chega em caixa; com porta menor que 80 cm, passar primeiro o encosto e depois a base,
  o que funciona em portas a partir de 65 cm.
- Ficha: fonte autovolt (90 a 240 V), SoftSpring (molas nosag, espuma e fibra siliconada),
  mecanismo em aço carbono, estrutura de eucalipto, compensado naval e metal, fabricada no Brasil.
- **Não usar:** giro de 360° na base com balanço, "madeira maciça", almofada "por contrapeso",
  "portas de 70 a 80 cm", USB de série. A capacidade de peso diverge na página (120 kg na
  descrição, 160 kg no bloco de destaques): não citar sem reconfirmar.

### Opcionais da reclinável (configurador, consultado em 07/10/2026)

| Opcional | Preço |
|---|---|
| Porta-copos pretos e USB tipo A e C | Brinde |
| Sistema de massagem por vibração com controle remoto | R$ 550 |
| Suporte com carregador para smartphone por indução | R$ 590 |
| Mesa de apoio | R$ 490 |
| Encosto fixo mais alto (para pessoas acima de 1,85 m) | R$ 450 |
| Logo bordado (+7 dias no prazo) | R$ 300 |
| Case 3 em 1 (1 USB-A, 1 USB-C e 1 tomada, no lugar de um porta-copos) | R$ 299 |
| Luminária de embutir (por unidade) | R$ 299 |
| Porta-taças | R$ 299 |

- Disponíveis também na base manual, a mais simples.
- Diretriz editorial: no recorte de concorrentes modulares analisado para a pauta `sofa-modular-ou-retratil-qual-escolher`, o conjunto apareceu apenas na Damie. Publicar como diferencial observado, não como exclusividade absoluta ou permanente de mercado.
- Nos artigos de amamentação, os opcionais sustentam o uso depois da amamentação: trabalho (mesa
  de apoio, suporte com carregador, case 3 em 1), leitura (luminária), descanso (massagem) e
  lazer (porta-copos e porta-taças).

### Links de afiliado fora da DAMIE (alternativas mais baratas)

| Link | Destino | Dados conferidos em 06 e 07/10/2026 |
|---|---|---|
| `https://link.amazon/B03Z8Ky9B` | Poltrona Amamentação com Puff da Dreamy House na Amazon (tag `ceciliamauadc-20`) | R$ 469 (R$ 445,55 no Pix); fixa, sem balanço; suede, eucalipto e fibra mista; 90 × 68 × 100 cm; assento a 43 cm do chão e 42 cm de profundidade; garantia de 3 meses; 4,1 de 5 (19 avaliações), com relatos de assento que deforma |
| `https://meli.la/1VBBH4Y` | Perfil da Cecília no Mercado Livre, com a Áquila em destaque | Áquila com balanço e puff, bege, R$ 862; a maioria das poltronas com balanço e puff entre R$ 550 e R$ 1.000. A página do produto exige login e não foi aberta |

Não citar cupons do Mercado Livre ou da Amazon nos textos.

---

## 3. Dores Mapeadas
- Cuidados práticos para Bouclé, Linho, Couro e Suede sem manchar (transferida para o subdomínio DAMIE em 30/09/2026)
- Passo a passo de fixação e travamento dos módulos no chão (pauta pendente na fila)
- Guia simples de verificação de tomadas, cabos e lubrificação (pauta pendente na fila)
- Dor na lombar, no pescoço e no braço ao amamentar no sofá ou na cama (experiência da Cecília com o Ian)
- Puff solto ocupando o chão do quarto pequeno
- Poltrona de amamentação usada por um ou dois anos e depois parada como decoração no quarto da criança
- Reclinável manual que pede força das pernas para fechar com o bebê no colo

Buscas do autocomplete cobertas pelos artigos de amamentação: com balanço, com puff, reclinável,
reclinável elétrica, com balanço e giro, pequena e compacta, barata, Mercado Livre, usada e OLX,
com encosto de cabeça, qual a melhor, vale a pena.

---

## 4. Artigos Já Publicados no Cluster
- `poltrona-damie-e-boa` (giro corrigido de 360° para 180° em 07/10/2026, `4b391c4`)
- `sofa-damie-modular-vale-a-pena`
- `poltronas-reclinaveis-damie-vale-o-investimento`
- `poltrona-amamentacao-rotina`
- `poltrona-levita-o-topo-da-tecnologia-e-conforto`
- `poltrona-moon-design-que-parece-obra-de-arte`
- `sofa-damie-na-caixa-vale-a-pena-o-modular`
- `damie-reclame-aqui-o-que-os-dados-mostram`
- `cupom-cecilia12-como-usar`
- `poltrona-de-amamentacao-como-escolher` (no ar em 07/10/2026, `4b391c4`)
- `poltrona-de-amamentacao-vs-poltrona-reclinavel` (no ar em 07/10/2026, `4b391c4`)

Pendente: `poltrona-charles-eames-design-iconico-e-alternativas` diz que a FAQ da Levita informa
giro de até 280°; a página oficial informava 360° em 07/10/2026.
