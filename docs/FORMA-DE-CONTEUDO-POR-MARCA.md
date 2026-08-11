# Como escolher a forma de conteúdo de cada marca

Procedimento para definir pauta de um cluster de afiliado. Vale antes de escrever a primeira
peça de uma marca nova e sempre que o acervo dela crescer o bastante para mudar o quadro.

Escrito em 11/08/2026, a partir do export do Search Console de 10/05–11/08/2026.

---

## A regra

**Não existe template único de cluster.** Rodar "página de cupom + artigo de como usar" para
todo afiliado desperdiça esforço numas marcas e subinveste noutras.

A forma que vence é função da **densidade competitiva das consultas daquela marca** — não do
tamanho do cluster, nem da qualidade da página, nem do template.

Duas marcas medidas, mesmo template, resultado oposto:

| Marca | Consultas de cupom | Posição média | Cliques |
|---|---:|---:|---:|
| **Damie** | 1.499 impr. | **4,02** | 11 |
| **Dolce Gusto** | 403 impr. | **31,00** | 0 |

Damie é marca pequena: o termo de cupom não tem agregador brigando, e a página de cupom
ganha em posição 4. Dolce Gusto é Nescafé: "cupom dolce gusto" é disputado por Cuponomia,
Pelando e afins, e o site fica em página 3-5 — apesar de ter **dez páginas do cluster entre
as posições 3,8 e 11**. Não é falta de autoridade; é o termo.

No Dolce Gusto, o que é ganhável são as consultas de utilidade e especificação:

| Grupo de consultas (Dolce Gusto) | Impressões | Posição média |
|---|---:|---:|
| cupom / desconto | 403 | 31,00 |
| utilidade e specs (ml, medidas, pontos, clube, assinatura, adaptador) | 210 | **10,20** |

E dentro do comercial, a cauda qualificada escapa do oceano vermelho:
`cupom desconto dolce gusto influencer` está em **10,67**, e `como usar códigos promocionais
na página do club dolce gusto` em **7,75** — essa segunda é gente com código na mão.

---

## O procedimento

1. **Extrair as consultas da marca** do export do GSC (aba `Consultas`), filtrando por nome
   da marca e variações de grafia — `dolcegusto` e `dolce gusto` são consultas diferentes.
2. **Agrupar por intenção**, no mínimo em três baldes: comercial (`cupom`, `desconto`,
   `código`, `promo`), confiança (`é confiável`, `reclame aqui`, `golpe`) e utilidade
   (medidas, specs, como usar, pontos, assinatura, compatibilidade).
3. **Calcular posição média ponderada por impressão** em cada balde — a média simples engana,
   porque uma consulta de 1 impressão pesa igual a uma de 800.
4. **Ler o corte.** Se o balde comercial está em página 1, a página de cupom é o produto. Se
   está em página 3 ou pior, o produto é o conteúdo do balde que ranqueia, carregando o código
   no corpo.

Repetir quando o cluster crescer de forma relevante. Como gatilho operacional, refazer a leitura
depois de três ou quatro peças novas e antes de pautar a quinta. Um termo inviável com 11 páginas
pode deixar de ser com 30 — o acervo agrega autoridade temática, e a conclusão de hoje tem prazo
de validade.

---

## As duas configurações

### Comercial ganhável (caso Damie)

A página de cupom é o destino principal e o conteúdo alimenta ela. Vale investir em regras,
validade, FAQ e histórico — a pessoa chega pela consulta de cupom e o código está no snippet.
Conteúdo de confiança e review sustenta a marca em volta.

### Comercial perdido (caso Dolce Gusto)

O produto é o conteúdo de utilidade. Escrever mais do que já ranqueia: especificação,
compatibilidade, como funciona o clube, quais cápsulas, comparativo de máquinas — cada peça
carregando `coupon` no corpo, conforme o `CONTRATO-ARTIGO-AFILIADO.md`.

Aqui vale um **corolário que inverte a regra geral da frente**:

> A tese "a conversão acontece na SERP" depende de o código estar **no snippet**. Na página
> de cupom ele está, porque a meta description o contém. Numa página de utilidade ele está no
> corpo — e nem deveria estar no snippet, que precisa responder à consulta informacional para
> ganhar a impressão.
>
> Logo, em página de utilidade **o clique é a única entrega do código, e CTR volta a importar**.

O caso extremo medido: `/reviews/tabela-medidas-dolce-gusto-ml-por-nivel` tem **806
impressões na posição 3,76 e 9 cliques** — CTR de 1,1%, contra 7% a 10% esperados naquela
posição. É a maior anomalia de CTR do conjunto. São ~797 pessoas que viram e não clicaram, e
portanto nunca viram CECI.

**Conferido no SERP em 11/08/2026: é resposta de IA do Google, e o site é a referência [1].**
A resposta cita o artigo em praticamente todas as afirmações — inclusive os 300 ml da função
XL, número em que o concorrente `umsabor.com` erra. A precisão foi o que ganhou a citação
primária.

Ou seja: o CTR de 1,1% não é defeito. É o preço de ter conteúdo perfeitamente compressível —
a resposta reproduz a tabela inteira e ninguém precisa clicar. Reescrever o title não muda
isso.

### O princípio que sai daí

> **A resposta de IA entrega o conteúdo e não entrega o código.**

O código está no corpo do artigo; a IA extrai o que responde à consulta, e um cupom não
responde "quantos ml tem cada risco". Não há como fazê-lo pegar carona, e tentar seria
manipulação que não funcionaria.

Consequência para a máquina de conteúdo, e ela vale para todas as marcas:

- **Conteúdo que comprime perfeitamente compra citação, não tráfego.** Tabela, lista de
  especificação e definição curta cabem inteiros numa resposta de IA. Rendem autoridade e
  posição — que é o que sustenta o cluster — mas não entregam código.
- **Conteúdo que resiste à compressão exige a visita.** Recomendação por modelo de máquina,
  por bebida, foto real das marcações, comparativo com julgamento, calculadora. A própria
  resposta de IA sinaliza esse limite quando termina oferecendo "me diga o modelo da sua
  cafeteira ou a bebida para eu confirmar" — é exatamente o que ela não consegue resolver
  sozinha.

Ao pautar, decidir de propósito qual dos dois se está produzindo. Os dois têm valor, e são
valores diferentes: um constrói a autoridade do cluster, o outro entrega o código.

E a página citada tem um segundo uso que independe do clique: sendo o nó mais forte do
cluster, **é de onde um link interno para `/cupons/<marca>` passa mais sinal**. Hoje a
`tabela-medidas` não linka para o cupom. Na árvore de 11/08/2026 há 12 reviews marcados com
`affiliate: "dolce-gusto"`: três já linkam para `/cupons/dolce-gusto` e nove ainda não. Essa
contagem é retrato do acervo, não definição do lote editorial.

---

## Onde ficam as marcas hoje

| Marca | Configuração | Nota |
|---|---|---|
| Damie | comercial ganhável | resolvida pelo **subdomínio**; site principal fora da disputa |
| Dolce Gusto | comercial perdido | maior cluster de utilidade; head term em 31 |
| I Wanna Sleep | comercial ganhável | posição ~10, competição baixa |
| YesStyle | comercial ganhável | mas com 3 URLs PT disputando — auditoria pendente |
| Nutren | comercial ganhável | menor cluster; posição 11 |
| Magalu | sem evidência | 123 impr., posição 18 |
| Shein | não medido | cluster ainda não existe |

Detalhamento, números por página e a fila de execução: `HANDOFF-CUPONS-FASE-1A.md`.

---

## O erro que este documento existe para evitar

A primeira análise desta frente foi feita sobre o export do **GA4**, que mostra um recorte
minúsculo da integração com o Search Console. Ela concluiu que a Damie não tinha demanda de
cupom — quando a Damie é 60% de toda a demanda comercial do site, em posição 4.

Sempre usar o **export direto do Search Console**. Nunca o do GA4 para diagnóstico de busca.
