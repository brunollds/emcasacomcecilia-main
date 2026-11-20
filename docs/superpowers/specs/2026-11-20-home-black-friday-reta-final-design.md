# Home: reta final da Black Friday (até 28/11/2026)

Status: revisado pelo ChatGPT e pelo Gemini em 20/11/2026; as mudanças estão em "Depois da revisão externa", no fim.
Nada foi implementado.

## Contexto

O emcasacomcecilia.com é um site de cupons e guias de compra (Next.js 16, App Router, SSR na Hostinger). A home em
português tem, de cima para baixo:

1. a vitrine das lojas (bolinhas das lojas parceiras e o painel de cada uma);
2. "Acabou de sair" (os artigos mais novos);
3. a seção da data comercial (hoje, a Black Friday), que só aparece durante a campanha;
4. Receitas;
5. "Explore a casa" e vídeos.

A seção da data comercial é configurada em `content/home-events.json`: datas da campanha (`startsAt` 09/10,
`endsAt` 01/12, dia da Black Friday 27/11) e uma lista de artigos (`articleSlugs`). A home mostra os 4 primeiros
da lista em cards com capa; a página `/black-friday` mostra a lista inteira. A home é regerada a cada 5 minutos
(`revalidate = 300`).

## Problema

- A home mostra só 4 guias, sempre os 4 primeiros da lista, que são os mais antigos (DAMIE, Dolce Gusto, Let's
  Eat It e I Wanna Sleep).
- A lista parou em 26/10. Dos 42 artigos em português sobre Black Friday, 21 estão na lista; os outros 21
  (Starlink, Gocase, Denavita, Cola e Decora, Petz, Proton, Hostinger, Rituária, BOLD, Adaptogen, Barbour's, BAW,
  Belive, HolyFoods, La Ganexa, L'Amazonie, Pink Cheeks, Prohall, Simple Organic, a poltrona do papai, a seleção da
  Insider e os brindes da Skelt) não aparecem nem na home nem em `/black-friday`.
- Na última semana antes da Black Friday, o visitante quer achar o guia da loja dele rápido, e as Receitas ocupam
  espaço na home sem relação com isso.

## Objetivo

De agora até o fim de 28/11/2026, a home deixa todos os guias de Black Friday a um toque, sem rolagem longa, e
depois volta sozinha ao normal.

Não é objetivo: mudar a página `/black-friday`, as homes dos outros 9 idiomas, a vitrine das lojas ou o "Acabou
de sair" em si.

Seria um fracasso, mesmo funcionando:
- a home não voltar ao normal depois de 28/11 sem alguém lembrar de reverter;
- um card prometer desconto ou código que a página da loja não confirma;
- a home ficar mais pesada ou mais lenta no celular;
- o visitante não conseguir distinguir dois guias da mesma loja.

## Decisões do Bruno

1. **Receitas:** somem da home, no celular e no computador, durante o destaque.
2. **Posição:** a seção da Black Friday sobe para logo abaixo da vitrine, acima do "Acabou de sair".
3. **Cards:** formato compacto, com a bolinha da loja, para caberem todos.
4. **Fim do destaque:** 23h59 de 28/11/2026 (horário de Brasília). Depois disso, a seção da Black Friday volta ao
   formato e ao lugar de hoje até o fim da campanha (01/12), e as Receitas voltam.

## Proposta

### 1. Completar a lista (dado)

Acrescentar a `articleSlugs` os 21 artigos que faltam, menos um: os brindes da Skelt
(`brindes-skelt-black-friday-cupom`), cuja promoção de 48 horas já acabou (o título diz "encerrada"). Ficam 41
artigos. Isso já corrige a `/black-friday`, independentemente do resto.

### 2. Janela de destaque presa a uma data (dado)

Um campo novo, opcional, na edição da campanha em `content/home-events.json`:

```json
"boost": { "endsAt": "2026-11-29T00:00:00-03:00" }
```

Enquanto `agora < boost.endsAt` (e a campanha estiver aberta), a home entra no modo de destaque. Sem o campo, ou
depois da data, tudo fica como hoje. Como a home é regerada a cada 5 minutos no servidor, a volta acontece sozinha
até uns 5 minutos depois da meia-noite de 29/11, sem PR nem deploy. Validação: `boost.endsAt` tem de ter fuso
explícito, cair depois de `startsAt` e não depois de `endsAt` da campanha; senão o build para, como já acontece com
as outras datas desse arquivo.

Depois de 28/11, o campo e o código ficam inertes. Um PR de limpeza pode tirá-los depois, sem pressa.

### 3. Modo de destaque na home

- **Ordem:** vitrine, Black Friday, "Acabou de sair", "Explore a casa", vídeos. Receitas não são renderizadas.
- **Topo da seção:** o mesmo de hoje (título "Black Friday", descrição, data e contagem regressiva).
- **Grade:** todos os 41 guias, em ordem alfabética pelo nome da loja; os guias da mesma loja ficam juntos, o
  guia principal primeiro. Colunas: 2 no celular, 3 no tablet, 5 a 6 no computador. Com 41 cards, são cerca de
  21 linhas no celular. Ver a pergunta 1 abaixo.
- **Card compacto:** um link só (o card inteiro leva ao guia), com:
  - a bolinha da loja, a mesma da vitrine (componente `StoreMark`, que usa a imagem própria da bolinha quando a
    loja tem);
  - o nome da loja;
  - uma linha curta. No guia principal da loja, o desconto da loja como já aparece no site ("10% OFF",
    "R$ 200 de bônus"), vindo do mesmo dado das páginas de cupom. Nos guias extras da mesma loja, um rótulo curto
    escrito à mão no `home-events.json` (por exemplo "Poltrona do papai", "Moda feminina", "Seleção da Cecília").
  - o nome acessível do link é o título completo do artigo.
- **Sem capa e sem botão de código** no card compacto: o código continua no painel da loja na vitrine e na página
  do guia. Isso deixa o card leve (sem 41 imagens de capa; a bolinha é pequena e com carregamento sob demanda).
- **Rodapé da seção:** "Ver tudo da Black Friday", como hoje.

### 4. O que não muda

- `/black-friday` continua com os cards de capa de hoje, agora com a lista completa.
- Fora do modo de destaque, a seção volta aos 4 cards com capa, entre "Acabou de sair" e Receitas.
- Medição: os cliques continuam como `home_route_click` com o `placement` `home_event` de hoje.

## Depois desta entrega

Pedido do Bruno para uma segunda etapa, depois da home em português: levar a seção dos artigos de Black Friday às
homes dos outros 9 idiomas (`/en`, `/es`…), com os guias de cada idioma (hoje há famílias traduzidas da SHEIN,
YesStyle, Hostinger, Proton e Starlink). Fica fora deste desenho; a etapa terá o seu próprio.

## Arquivos

Até 5 por commit, como manda a regra do projeto:

- `content/home-events.json`: a lista completa, o `boost` e os rótulos dos guias extras;
- `src/lib/homeEvents.ts`: ler e validar o `boost`; no modo de destaque, devolver todos os cards, com a bolinha,
  o nome e a linha curta de cada um;
- `src/components/sections/HomeEvent.tsx`: a variante compacta da grade;
- `src/app/(pt)/page.js`: a ordem das seções e as Receitas fora durante o destaque;
- `scripts/test-home-events.ts`: os testes.

## Testes

- Antes de `boost.endsAt`: a seção vem logo depois da vitrine, com os 41 cards compactos, e sem Receitas.
- Um minuto depois de `boost.endsAt`: a home volta ao formato de hoje (4 cards com capa, entre "Acabou de sair" e
  Receitas, com Receitas de volta).
- Depois de `endsAt` da campanha: sem seção, como hoje.
- `boost.endsAt` sem fuso, antes de `startsAt` ou depois de `endsAt` para o build.
- Todo guia extra de uma loja tem rótulo; nenhum card repete loja e linha curta.
- A linha de desconto de cada card é igual à da página de cupom da loja.
- O nome acessível de cada card é o título do artigo.
- Verificação visual no navegador, em 375, 768 e 1280 px.

## Perguntas para a revisão externa

1. No celular, 41 cards em 2 colunas são cerca de 21 linhas de rolagem antes do "Acabou de sair". É melhor
   mostrar os primeiros 12 e um botão "Mostrar todos os guias" que abre o resto na própria página?
2. Ordem alfabética pela loja ou pelos guias mais novos primeiro?
3. A linha curta com o desconto da loja ajuda, ou é melhor só o nome da loja e "Guia da Black Friday"?
4. Esconder Receitas por uma semana pode prejudicar o SEO da home (links internos para as receitas)? As receitas
   seguem no menu e em `/receitas`.
5. Algum risco de acessibilidade ou de desempenho na grade de 41 links que não esteja coberto acima?

## Depois da revisão externa (20/11/2026)

Conferi no código os pontos dos dois pareceres. Os que procedem mudam o desenho assim; onde este bloco contradiz o de
cima, vale este.

1. **Contagem:** são 42 artigos, não 41. A lista de hoje tem 21 (o presente de Natal da DAMIE incluso) e entram 21.
2. **Celular com 12 e "Mostrar todos":** o HTML do servidor traz os 42 links; abaixo de `md`, do 13º em diante ficam
   escondidos por CSS até o botão. O botão é um `<button>` com `aria-expanded` e `aria-controls`, num componente
   cliente pequeno que não importa `@/lib/data`. A partir de `md`, todos aparecem. Continua o "Ver tudo da Black
   Friday" para `/black-friday`.
3. **Ordem:** os 12 primeiros seguem uma ordem escolhida pelo Bruno, gravada em `articleSlugs`; o resto vai em ordem
   alfabética pela loja, com os guias da mesma loja juntos. Isso também ordena `/black-friday` e os 4 cards que ficam
   depois do destaque.
4. **Linha curta:** o `discount` da loja, o mesmo do recorte da página dela (nunca o de um código com prazo, como o
   CECIEMCASA15 da I Wanna Sleep em 26 e 27/11, que segue no painel da vitrine e na página). Toda loja com mais de um
   guia leva rótulo em todos os guias dela, o principal inclusive: Insider "Masculino", "Feminino" e "Seleção da
   Cecília"; DAMIE "Guia geral", "Poltrona do papai" e "Presente de Natal". Logo acima da grade, uma linha com o aviso
   de temporada que o site já usa (`CODE_SEASON_NOTICE`: "Na Black Friday, lojas podem alterar a porcentagem do
   desconto sem aviso. Confira no carrinho.").
5. **Nome acessível:** o texto visível do card começa o nome do link (WCAG 2.5.3), seguido de um trecho só para leitor
   de tela (", guia da Black Friday"). Nada de `aria-label` com o título do artigo.
6. **Desempenho:** `prefetch={false}` nos 42 links; a bolinha com `sizes="60px"` e `loading="lazy"`, o mesmo tamanho da
   vitrine, para reaproveitar a imagem já baixada; sem `ScrollRow`, sem `.revela` nos 42 cards e sem heading dentro dos
   cards (`<ul><li><a>`). O anel de foco é o `FOCUS_RING_ON_DARK`. No celular, a coluna de texto leva `min-w-0` e o
   teste visual inclui os nomes e descontos mais longos.
7. **Loja pausada ou artigo sem loja:** o card mostra a casa (a bolinha "Outros" de `/reviews`) e o rótulo do
   `home-events.json`; o `parseHomeEvents` exige rótulo nesses casos. As lojas saem de `getActiveCoupons()`, então
   Magalu e Lejour, fora da vitrine, mantêm bolinha e linha curta.
8. **Volta ao normal:** o ISR entrega a versão guardada uma última vez enquanto regenera, e uma aba já aberta só muda ao
   recarregar. Então a volta é "no primeiro acesso depois da meia-noite, ou logo em seguida", não "em até 5 minutos".
   A volta restaura tudo: os 4 cards com capa no lugar de hoje e as Receitas. Com o destaque ativo, o `page.js` nem
   busca as receitas populares.
9. **Validação do `boost`:** chave desconhecida dentro dele (como `endAt`) para o build.
10. **Textos:** a seção não cita a data de 28/11, que é o fim do destaque da home e não o das ofertas. O `<title>` e a
    meta description da home não mudam.
11. **Arquivos e commits:** o `scripts/test-build-output.ts` também muda, porque hoje ele exige as Receitas e recorta
    os painéis da vitrine até o "Acabou de sair". Ficam 2 commits de até 5 arquivos: (1) `content/home-events.json`,
    `src/lib/homeEvents.ts` e `scripts/test-home-events.ts`; (2) `HomeEvent.tsx`, o componente do botão, `page.js` e
    `scripts/test-build-output.ts`.

Decisões do Bruno depois da revisão:

- **Os 12 primeiros:** DAMIE, Dolce Gusto, Insider, I Wanna Sleep, Hostinger, Petz, Bagaggio, Toda Up, Let's Eat It,
  Skelt, SHEIN e YesStyle, nessa ordem (o guia principal de cada uma); o resto em ordem alfabética pela loja, com os
  guias extras logo depois do principal da mesma loja.
- **Fim do destaque:** fim de 30/11/2026, para cobrir a Cyber Monday (`boost.endsAt` = `2026-12-01T00:00:00-03:00`,
  o mesmo instante do fim da campanha). Isso substitui a decisão 4 do começo: não há período com a seção de 4 cards
  depois do destaque; em 01/12 a seção some e as Receitas voltam.

Depois da revisão do código (20/11/2026):

- **Insider nos 12 primeiros:** a "Seleção da Cecília" (`promocao-insider-selecao-com-cupom`) no lugar do "Masculino",
  que desce para depois do "Feminino".
- **Grade:** a sugestão do Gemini, 2 colunas no celular, 3 a partir de `sm`, 4 a partir de `lg` e 5 a partir de `xl`;
  no celular, a bolinha cai para 36 px e o card fica mais justo (`p-2`, `gap-2`), para o texto ganhar espaço.
