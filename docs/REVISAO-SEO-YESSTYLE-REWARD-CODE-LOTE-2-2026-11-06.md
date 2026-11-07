# Revisão SEO — CECILIA010: IT, JA, KO, ZH-HANS e ZH-HANT

Data: 06/11/2026. Segundo lote da família `yesstyle-reward-code`, mantida agrupada conforme arquivo diretor, mesmo com datas de publicação diferentes. Análise por três subagentes GPT-6.1 Terra e conferência do agente principal nas cinco páginas publicadas. Somente sugestões; nenhuma edição de artigo, cupom ou template.

Base de código: `45ab7e43`, release informado pelo Bruno. Checkout `6b6ebb1a` não foi tratado como produção atual. URL, H1, título HTML, canonical, lang e alegações apontadas foram conferidos no navegador. A publicação foi observada, sem atestar um hash de deploy atual. Não houve teste de checkout.

## Registro individual

GSC: export direto de 03/11/2026, período 05/10–01/11, aba Páginas. Ausência no export não equivale a zero impressões; não associar métricas de URL às consultas agregadas.

| Idioma | Arquivo em content/reviews | Publicado | Dados |
|---|---|---|---|
| it | `codice-ricompensa-yesstyle-cecilia010.json` | 28/09/2026 | 6 impressões; posição 3,83 |
| ja | `yesstyle-reward-code-cecilia010-ja.json` | 11/07/2026 | URL não localizada no export |
| ko | `yesstyle-reward-code-cecilia010-ko.json` | 11/07/2026 | URL não localizada no export |
| zh-hans | `yesstyle-reward-code-cecilia010-zh-hans.json` | 11/07/2026 | URL não localizada no export |
| zh-hant | `yesstyle-reward-code-cecilia010-zh-hant.json` | 11/07/2026 | 2 impressões; posição 14,5 |

## Correções comuns, confirmadas em cada versão

1. **Prioridade alta — Elite Club:** dicas e FAQ repetem Bronze 5%, Silver 7%, Gold 10%, Platinum 12%, Diamond 15%. A página oficial lista quatro níveis (básico, bronze, prata e ouro), com pontos e cupons específicos. Corrigir ambas as ocorrências e linkar o programa oficial, sem substituir por outra tabela sem fonte. Fonte: https://www.yesstyle.com/zh_TW/elite-club.html .
2. **Prioridade alta — Recusa da entrega:** o FAQ de cancelamento das cinco versões diz que, depois do envio, o comprador pode recusar o pacote. Explicar que isso não é alternativa simples a cancelar: a política da loja prevê ausência de reembolso/reenvio para recusas por motivos alfandegários. Orientar contato com suporte e política aplicável; não apresentar a política como definição de direitos locais. Fonte: https://www.yesstyle.com/en/customs-tax/help/section.html/hsi.1022 .
3. **Prioridade alta — Crédito alfandegário:** seção e FAQ precisam explicitar prazo de 30 dias da data do comprovante, exclusões por tributo/destino, e cálculo do limite abaixo de US$ 1.000 antes do cupom e sem frete. O benefício aprovado é crédito da loja. Acrescentar link da política oficial e remeter aos guias locais para detalhes regionais. Fonte: https://www.yesstyle.com/en/refund-of-customs-taxes-and-fees/help/section.html/hsi.2212 .
4. **Prioridade média — Clareza do Reward Code:** a seção sobre funcionamento compara com CECI e CECILIA12 de outras lojas sem contexto. Simplificar para o campo Reward Code versus Coupon Code da própria YesStyle; manter CECILIA010 explícito, 5% novos e 2% recorrentes, elegibilidade e conferência do valor final. Não inserir códigos promocionais temporários no texto.

## Ajustes específicos por artigo

### Italiano

- FAQ de pagamento afirma conversão automática pela operadora. Qualificar pela moeda escolhida e pelo câmbio aplicado no checkout; a YesStyle oferece moedas além de dólar e utiliza câmbio interno, com possíveis encargos do banco.
- Linkar o guia de entrega italiano existente (`yesstyle-spedizione-italia-tempi-costi-dogana`) para condições de destino. Separar IVA e despesas alfandegárias reembolsáveis, sem prometer reembolso de IVA.
- Preservar o título com CECILIA010 e o passo a passo. A posição 3,83 é média de apenas seis impressões históricas, não estabilidade de ranking.

### Japonês

- FAQ de pagamento afirma que a conversão é feita automaticamente pela operadora do cartão. Usar moeda selecionada e total do checkout como referência, distinguindo câmbio da loja e encargos bancários.
- Linkar guia de entrega japonês (`yesstyle-shipping-japan-ja`); manter リワードコード e a distinção entre primeira compra e recompra que já estão no título.

### Coreano

- A mesma afirmação universal sobre conversão pela operadora aparece no FAQ publicado. Qualificá-la.
- Remeter ao guia `yesstyle-shipping-korea-ko` para entrega e tributação, evitando estender condições gerais a qualquer destino. Preservar 리워드 코드 e código visível.

### Chinês simplificado

- **Prioridade alta de tradução:** a seção de tributos chama o benefício de 商店余额, mas um bullet e respostas do FAQ usam 商店积分. Uniformizar como saldo/crédito da loja e separar dos pontos do Elite Club. A política oficial trata de YesStyle Credit, não YS Points.
- Linkar o guia do idioma (`yesstyle-shipping-singapore-malaysia-zh-hans`), identificando seu escopo de Singapura/Malásia, e a política do destino efetivo. Não tratar chinês simplificado como sinônimo de um único país.

### Chinês tradicional

- FAQ atribui a conversão sempre ao emissor do cartão; qualificar pela moeda selecionada e política de câmbio.
- Remeter ao guia `yesstyle-shipping-taiwan-hong-kong-zh-hant`; não equiparar as condições de Taiwan e Hong Kong.
- Qualificar a afirmação de aplicação em qualquer pedido pela elegibilidade da conta/pedido e confirmação no checkout. 獎勵碼 e escrita tradicional estão coerentes com a família.

Fonte de moedas: https://www.yesstyle.com/en/payment-currencies/help/section.html/hsi.1708 .

## Conferências e limites

As cinco páginas abriram, usam canonical próprio, lang correspondente (it, ja, ko, zh-Hans, zh-Hant) e index/follow. Alternates listam os dez idiomas e x-default. Não foi identificado motivo para migrar URLs. As versões já expõem CECILIA010 no título e na resposta rápida e incluem divulgação comercial e link à página de cupom do idioma.

Não foi promovido a achado de exibição o texto sobre dólar em `cons`: o campo não foi confirmado como visível nesse template. A correção cambial acima se refere ao FAQ efetivamente presente no DOM. Não foram feitos diagnóstico de Core Web Vitals nem teste de aceitação do código no checkout.

Com este lote, as dez versões desta família estão revisadas individualmente; isso não significa que as sugestões tenham sido implementadas.
