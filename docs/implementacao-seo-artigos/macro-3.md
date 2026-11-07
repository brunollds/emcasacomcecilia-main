# Macro-PR 3: famílias da Hostinger e o cluster de suplementos, alimentos e café

- Branch: `fix/auditoria-macro-3`
- Base: `fe3396c1` (a main com o Macro-PR 2, #694, já no ar)
- Data: 07/11/2026

## Escopo

208 arquivos: as 15 famílias da Hostinger (150 versões) e 58 artigos em PT de Max Titanium, Probiótica, Black Skull, Mais Mu, Dr. Peanut, Belive, Let's Eat It, Nestlé Nutre e Dolce Gusto. Todos com `updatedAt` 2026-11-07.

## Hostinger, por família (10 idiomas)

| Família | Aplicado | Pendente |
|---|---|---|
| ai-builder | O modo sem IA vem nos planos; o modo com IA gasta créditos (o Select & edit também) e publicar exige hospedagem ativa. | Seção "Preço e renovação" do PT e o Ecommerce: a página global trata créditos e loja como assinaturas à parte; falta conferir a oferta brasileira. Teste grátis e 5 créditos. |
| black-friday | Data do teste do SONAR20 (29/10) e "plano, campanha e país mudam o total". PT: R$ 1.535,62, o total do teste no carrinho, também na tabela. | Estado da campanha de 2026. |
| cupom-como-funciona | Data do teste (29/10) no corpo, fora do FAQ. PT: R$ 1.535,62 no texto e na tabela. | A regra "link só em 12 meses ou mais e cliente novo", sem prova. |
| dominio | 96 horas só nas extensões que aceitam reembolso (PT: .br, .com.br e .net.br em 168 horas); 60 dias desde o registro ou a última transferência; site e e-mail durante a transferência; custo e ano extra só em algumas extensões. | Resposta rápida e meta seguem com "mais de 60 dias". |
| openclaw-gerenciado-ou-vps | Um gateway por equipe que confia entre si; carência de 180 dias desde o último reembolso de VPS; o gerenciado sem acesso root. | Nenhum. |
| openclaw-melhor-vps | O piso de 8 GiB só para a menor receita local; Node 24.22.1 ou 26.12.1 na versão estável, sem a linha 25; Oracle: CPU e rede, e a memória só nas A1. | Respostas rápidas de en, fr, es e it acima de 60 palavras (o en já passava). |
| openclaw-ou-hermes-agent | Fronteira de confiança, carência de reembolso e exceções (upgrade de VPS e cripto), piso de Node. Fora do PT, a descrição e a meta não prometem mais preço com e sem o código. | Plano gerenciado na política de reembolso. |
| ou-hostgator | A Hostinger lista datacenters na Europa, Ásia, América do Norte e do Sul (PT: Brasil incluído); o servidor no Brasil deixou de ser vantagem só da HostGator; PT: limite de visitas da HostGator como estimativa. | O alt da imagem dos quatro critérios. |
| paperclip-ai | Chave de IA ou assinatura do ChatGPT no gerenciado; carência do VPS; o teto de orçamento só pausa com o hard-stop ligado. | Chave de API no VPS. |
| reach-ou-mailchimp-brevo | O limite conta destinatários únicos no mês; não há teto semanal ("mais de 7 envios por mês" no "Passe se"); acima de 1.000, conferir no carrinho se há faixa maior do Pro. | Starter "grátis por 1 ano" na ajuda contra o Starter pago nas páginas do Reach (fora do PT); a imagem do quadro. |
| renovacao-cupom | O aviso de "um dia ou menos" só ao ligar a renovação automática; 96 horas conforme a extensão. | Cobrança mensal no dia ou na véspera; os 180 dias do VPS por jurisdição. |
| reputation | As bases separadas (99% do perfil contra 80 de 86 da amostra, cerca de 93%); o convite não é causa demonstrada da nota; os passos atuais de renovação (Faturamento, Assinaturas, a chave); SONAR20 sem o registro de domínio; PT: meta e FAQ com o período. | **A imagem dos passos mostra o caminho antigo** (alt e legenda do PT dizem isso); refazer no Job 6. Rótulos do hPanel fora do inglês. Números da Trustpilot. |
| trust-guide | Domínio: algumas extensões sem reembolso; meios de pagamento que devolvem em saldo; SONAR20 em plano novo, sem o registro de domínio; o 99,9% da página de preços vale pelo contrato de hospedagem (crédito de 5% da mensalidade, pedido em 30 dias). | Nenhum. |
| vps-ou-compartilhada | Node.js só no Ilimitado e no Cloud Startup (o Premium não consta); o veredito não manda Node.js ao Premium; template pronto e backup semanal automático no VPS. | Fora do PT, o quadro de decisão ainda aponta para a imagem em português (as imagens por idioma já existem). Links KVM em `/br/` por mercado. |
| wordpress | PT: WordPress em todos os planos, Node.js só no Business/Unlimited e Cloud; backup diário como extra comparado ao upgrade (10 idiomas). | Nenhum. |

## Suplementos, alimentos e café (PT)

| Grupo | Aplicado |
|---|---|
| Max Titanium (8) | Recomendação de creatina presa aos preços de outubro; "declara" no rótulo; lacre e embalagem pela política da Max; proteína por 100 g de pó; conta do 3W refeita (22,5 doses: R$ 37,99, R$ 36,85 no Pix, R$ 33,17 com cupom) em ou-dux e ou-growth; "link comissionado" virou comissão pelo código. |
| Probiótica e Dolce Gusto (8) | Monster com 3 g na FAQ de creatina; "declara"; refil como menor preço contra a Dux; "não temos cupom da Dux/Growth"; cafeteira: custo do consumo separado da compra do combo; CNPJ: soma como estimativa, sem o limite de usos; SAC antes da Arno (só Geração 1). |
| Black Skull (11) | Conclusões nos preços de outubro e restritas às linhas comparadas; período do Reclame Aqui (abril a setembro) e base do índice de solução; 7Belo "carboidrato zero na tabela"; comissão pelo CECILIA10. |
| Mais Mu e Dr. Peanut (10) | Creatina por grama de creatina (limonada e melancia com 3 g em 3,5 g); troca com lacre separada do arrependimento; glúten e lactose só nos sabores com aviso; Dux com o pó mais concentrado; "até 6 g". |
| Belive (7) | Condições de devolução atribuídas à FAQ da loja; reputação datada; frete grátis do kit condicionado ao subtotal; tabela oficial da Suavipan; açúcares do Caramelo Salgado; sódio com a condição. |
| Let's Eat It (7) | Frete grátis Le Creuset e Zwilling acima de R$ 1.000 pela política padrão; Reclame Aqui de abril a setembro; MAUAD como fonte dos 5%; troca pela página da loja; regra de 1/3 da capacidade para óleo; pegador Rhône sem limite inventado; outlet como loja física. |
| Nestlé Nutre (7) | `notice` do contrato editorial nos quatro Nanlac (Nutren Senior sem, decisão do Bruno); recolhimento só dos lotes oficiais; Nutridrink com a base dos 25 g; Nutren A-Z mais barato "nas lojas comparadas"; assinatura da Zero Lactose. |

## Pendentes deste PR

- **Reclame Aqui com 403:** notas novas da Black Skull e da Mais Mu.
- **Ninho Fases 1+:** o produto parece ter virado "Ninho Primeira Infância". Falta confirmar o SKU.
- **Let's Eat It:** os dois prazos de entrega (3 a 12 dias úteis na página regional, 5 a 10 na política padrão) e as duas políticas de troca.
- **Sem página oficial aberta, só relatório ou vault:** Arno e Geração 1, Zero Lactose a R$ 169,43, kit de anéis da mesa posta. Também a tabela da Suavipan, lida sem certificado válido.
- **Probiótica × Growth e Max × Growth:** preços de outubro, sem recotação.

## Revisão

- **Sonnet, quatro revisores:**
  - Hostinger PT e EN: 8 achados.
  - Hostinger es, fr, it e de: 9 de língua.
  - Hostinger ja, ko e zh: 14 de língua.
  - Suplementos e café: 11, a maioria bastidor ("preços lidos", "última leitura").
- **Fable:** 16 achados. Ficou de fora só a repetição de "calculado sobre as reclamações finalizadas" na reputação da Black Skull, que é de estilo. O mais grave foi o 99,9% negado como compromisso, corrigido nos 10 idiomas pelo contrato de hospedagem.
- **Decisões da consolidação:**
  - O teste do SONAR20 usa o total do carrinho (R$ 1.535,62, o registro de `couponsData.ts`) no texto e nas tabelas.
  - Datas novas no corpo dos artigos da Let's Eat It e da reputação da Hostinger saíram.
  - O `notice` dos Nanlac fica: é a frase obrigatória da NBCAL para fórmula de 1 a 3 anos, não ressalva de consumidor.

## Verificação

- `validate:content`, `test:review-i18n` (36 famílias, 360 versões), `test:article-d2`, `test:internal-links`, `typecheck`.
- `npm run build`, com o `test:build-output`.
