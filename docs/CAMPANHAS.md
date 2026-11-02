# Campanhas das lojas parceiras (banners "Publicidade")

Rotina para pôr no ar, e tirar do ar, os banners de campanha das lojas parceiras nos artigos.

**Criado em:** 02/11/2026  
**Escopo:** os arquivos de `content/campanhas/`. O código de desconto da loja, a página `/cupons/<loja>` e os cupons
da YesStyle seguem a `docs/MANUTENCAO-MENSAL.md`. Deploy, só pelo `docs/DEPLOY-GUIDE.md`.

---

## 1. O que é e onde aparece

Cada campanha é um arquivo `content/campanhas/<id>.json`. Ela entra sozinha em todo artigo com o `affiliate` da loja:

- o lugar `top` fica logo depois da 1ª seção do corpo;
- o lugar `mid` fica logo antes do FAQ (sem FAQ, antes da última seção);
- o lugar `end` fica logo depois da última seção do corpo (depois do FAQ, quando ele fecha o artigo), e só em artigo
  de 4 seções ou mais.

O banner leva o selo "Publicidade" e fala só da campanha da loja: Black Friday, esquenta, liquidação, brinde e afins.
O código da loja continua no bloco da loja do artigo.

Cada lugar guarda uma **fila**: o esquenta e a Black Friday da mesma loja podem esperar no mesmo lugar, um depois do
outro, desde que os prazos não se sobreponham. A campanha que ainda não começou vai no deploy, fica fora do HTML e
aparece no navegador na hora do início. A que acaba some no fim, sem esperar o próximo deploy.

## 2. Calendário

- **Semana normal:** duas rodadas, na segunda e na quinta.
- **Semana da Black Friday** (em 2026, de 23/11 a 30/11; a Black Friday é 27/11): uma rodada por dia.
- **Campanha com início marcado** (esquenta, Black Friday, datas comerciais): o arquivo entra no deploy **antes** do
  início, com `startsAt`, para não depender de um deploy no dia.

Em cada rodada:

1. passar pela lista da seção 3 e anotar campanha nova, mudança de prazo e campanha encerrada;
2. apagar o arquivo de toda campanha vencida (o `npm run test:store-banners` lista as vencidas);
3. abrir um PR só com `content/campanhas/` e o `src/lib/generated/store-banners.ts` regenerado;
4. avisar o Bruno se a campanha nova pede deploy antes do início.

## 3. Onde procurar

A fonte de cada campanha vai no campo `source`: a página da loja, o post ou o e-mail do programa de afiliados.
Em todas as lojas, olhar:

- a faixa e o banner do topo do site;
- a página de promoções ou de Black Friday da loja;
- o Instagram da loja;
- os e-mails e mensagens do programa de afiliados (Inbazz e os programas de creators).

| Loja (`affiliate`) | Site | Artigos fora do PT |
|---|---|---|
| DAMIE (`damie`) | damie.com.br | não |
| Dolce Gusto (`dolce-gusto`) | nescafe-dolcegusto.com.br | não |
| YesStyle (`yesstyle`) | yesstyle.com | sim, 10 idiomas |
| Nestlé Nutre (`nestle-nutre`) | nestlenutre.com.br | não |
| I Wanna Sleep (`i-wanna-sleep`) | iwannasleep.com.br | não |
| Magalu (`magalu`) | magazinevoce.com.br | não |
| Let's Eat It (`letseatit`) | letseatit.com.br | não |
| Insider (`insider`) | insiderstore.com.br | não |
| SHEIN (`shein`) | br.shein.com | sim, 10 idiomas |
| Probiótica (`probiotica`) | probiotica.com.br | não |
| Max Titanium (`max-titanium`) | maxtitanium.com.br | não |
| Dr. Peanut (`dr-peanut`) | drpeanut.com.br | não |
| Black Skull (`black-skull`) | blackskullusa.com.br | não |
| Lejour (`lejour`) | lejour.com.br | não |
| Cléa Store (`clea-store`) | cleastore.com.br | não |
| Belive (`belive`) | belivebefree.com.br | não |
| Mais Mu (`mais-mu`) | lojamaismu.com.br | não |
| Skelt (`skelt`) | skelt.com.br | não |
| Bagaggio (`bagaggio`) | bagaggio.com.br | não |
| Toda Up (`toda-up`) | todaup.com | não |
| Hostinger (`hostinger`) | hostinger.com | sim, 10 idiomas |

A lista sai das lojas ativas de `src/lib/couponsData.ts`; loja nova entra aqui no onboarding dela.

## 4. Regras

- **Só português ou os 10 idiomas.**
  - Campanha com só o `pt` em `copy`:
    - sai só nos artigos em português;
    - pode levar à loja brasileira, com `.com.br` inclusive.
  
    É o caso das parceiras sem artigo fora do PT, e da campanha só do Brasil da SHEIN ou da YesStyle.
  - Campanha com os 10 idiomas sai em todas as versões do artigo e precisa de um link que vale em todas, nunca de um
    país só.
  - O `test:store-banners` barra qualquer combinação no meio.
- **O banner nunca cita o código da loja** nem diz que a campanha soma com ele. O teste barra o código no texto.
- **Link de afiliado como a parceira mandou**, com as UTMs dela, sempre em `https`.
- **Campanha que só vale com o nosso código** (um brinde com o cupom, por exemplo): o banner leva ao nosso artigo sobre
  ela, com `href` `/reviews/<slug>` da mesma loja e `endsAt` obrigatório. O link é interno, sem sponsored, e o banner
  não aparece no próprio artigo.
- **Datas com hora e fuso de Brasília**: `2026-11-27T00:00:00-03:00` no início e `2026-11-30T23:59:59-03:00` no fim.
  Sem `startsAt`, a campanha já começou; sem `endsAt`, fica até o arquivo sair.
- **Mesmo lugar, sem sobreposição**: duas campanhas da mesma loja no mesmo lugar não podem estar no ar ao mesmo tempo.
  Para as duas aparecerem juntas, use lugares diferentes (`top`, `mid` e `end`).
- **A arte**:
  - `{ "kind": "tag", "value": "50%" }` é a etiqueta com o número. Cada idioma leva o `tag` com o "até", porque o
    número sozinho diria um desconto fixo.
  - `{ "kind": "bag" }` é a sacola, para a campanha sem número.
- **`source` e `verifiedAt`**: onde a campanha foi vista e quando (`AAAA-MM-DD`, nunca no futuro). Só avançam quando
  alguém confere a campanha de novo.
- **Texto curto e direto**: o `headline` diz a campanha, o `text` diz de quem é ("Campanha da própria Skelt.") e onde
  estão as condições, e o `action` é o botão ("Ver a campanha").

## 5. Para pôr uma campanha no ar

1. Criar `content/campanhas/<loja>-<campanha>.json`; o nome do arquivo é o `id`. Modelo, só em português:

   ```json
   {
     "id": "skelt-black-friday-2026",
     "affiliate": "skelt",
     "slot": "top",
     "href": "<link de afiliado da campanha, como veio>",
     "art": { "kind": "tag", "value": "50%" },
     "startsAt": "2026-11-27T00:00:00-03:00",
     "endsAt": "2026-11-30T23:59:59-03:00",
     "copy": {
       "pt": {
         "headline": "Black Friday da Skelt: até 50% OFF",
         "text": "Campanha da própria Skelt. Os preços e as condições aparecem no site da loja.",
         "action": "Ver a campanha",
         "tag": "ATÉ"
       }
     },
     "source": "<onde foi vista: página, post ou e-mail>",
     "verifiedAt": "2026-11-02"
   }
   ```

   O desconto do modelo é só um exemplo: use o número da campanha. Na campanha dos 10 idiomas, `copy` leva também
   `en`, `es`, `fr`, `de`, `it`, `ja`, `ko`, `zh-hant` e `zh-hans`, com os textos traduzidos.

2. Rodar `node scripts/content/build-index.mjs`, que regenera o `src/lib/generated/store-banners.ts`.
3. Rodar `npm run test:store-banners` e `npm run typecheck`.
4. Abrir o PR com o arquivo da campanha e o `store-banners.ts` gerado. Se o artigo da loja usa `{yesstyle:verifiedAt}`
   ou outro dado que o `build-index` preenche, o `content-index.ts` regenerado vai junto.
5. Pedir o deploy antes do `startsAt`.

## 6. Para tirar uma campanha do ar

- **Venceu:** ela já sumiu dos artigos sozinha. Apague o arquivo na rodada seguinte, rode o `build-index` e abra o PR;
  não precisa de deploy no mesmo dia.
- **A loja encerrou antes do prazo:** ponha o `endsAt` na data e hora do encerramento, ou apague o arquivo, e faça o
  deploy, porque o HTML no ar ainda mostra a campanha.
