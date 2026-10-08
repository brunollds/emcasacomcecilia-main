# Manutenção mensal editorial e comercial

Rotina do domínio principal `emcasacomcecilia.com` para manter cupons, campanhas,
artigos de marca parceira e dados externos corretos sem simular frescor editorial.

**Criado em:** 11/08/2026  
**Escopo:** editorial e comercial; deploy é governado por `docs/DEPLOY-GUIDE.md`.

> **Regra que não muda:** uma data de verificação só avança quando a oferta ou o dado foi
> realmente reconferido. Trocar o mês por rotina, sem testar ou consultar a fonte, cria uma
> afirmação falsa e também altera `dateModified` e `<lastmod>` das páginas de cupom.

> **Este documento governa a rotina.** `docs/CUPONS-DATAS-RASTREAMENTO.md` continua útil
> como inventário histórico de campos e artigos, mas a antiga orientação de definir todos os
> `lastVerified` para o dia 1 não deve ser aplicada sem verificação real.

---

## 1. Calendário do ciclo

### Entre os dias 20 e 25

- levantar campanhas com término antes do próximo mês;
- pedir ou consultar regras atualizadas das marcas;
- localizar conteúdo sazonal, preços e dados externos que envelheceram;
- preparar texto novo sem publicar uma data futura nem dizer que algo foi testado no mês
  seguinte.

### Cupons perenes vs. cupons de ciclo

Nem todo cupom tem uma condição nova para negociar todo mês — a janela de verificação certa
depende do tipo:

- **Perenes (sempre ativos):** `damie` (`CECILIA12`) e `i-wanna-sleep` (`CECIEMCASA`). Não há
  condição nova para esperar da marca — só é preciso reconfirmar que o código continua
  funcionando no checkout. Por isso, para esses dois, a verificação pode acontecer já na
  janela de 20-25 em vez de esperar o dia 1: o teste continua sendo real, só acontece mais
  cedo no ciclo. Isso não viola a regra de não simular frescor (o `lastVerified` reflete o dia
  real do teste) e ajuda a competir em frescor de SERP/AI Overview contra afiliados
  concorrentes (ex.: Mainabelli, PatBadaro na Damie) que atualizam suas páginas antes do fim
  do mês.
- **De ciclo (têm data de término real):** `dolce-gusto` e `nestle-nutre` (ambos `CECI`). Em
  01/10/2026, as condições atuais foram reconfirmadas para outubro de 2026. Aqui a
  regra padrão vale sem atalho: só publicar a condição do próximo ciclo quando a marca ou a
  responsável pela parceria confirmar. Sem confirmação, manter a última data verdadeira e
  reduzir a promessa (ver seção 12).
  O mesmo código `CECI` tem percentuais diferentes por loja: desde 04/10/2026, 10% na Nestlé
  Nutre e 5% na Dolce Gusto. Nunca trocar o percentual de uma loja pela busca de "CECI" sem
  separar as duas. Os 10% da Nestlé Nutre ainda não foram confirmados como fixos; o mapa para
  voltar a 5% está em `docs/plans/2026-10-04-cupom-nutre-ceci-10.md`.

### No último dia útil ou no dia 1

- testar cada código no checkout ou reconfirmar a condição por fonte oficial;
- registrar a **data real** do teste;
- atualizar mês de title, description e texto visível somente nas ofertas reconferidas;
- expirar ou pausar campanhas encerradas antes de publicar a nova versão;
- tirar o chip “novo” dos artigos do mês que acabou: só os artigos do mês corrente ficam com
  `"isNew": true`. Trocar só essa linha em cada JSON, sem reformatar, e rodar
  `node scripts/content/build-index.mjs`. O `isNew` também põe o artigo no topo de `/reviews`;
  conferir a lista depois de “carregar mais”. Traduções já saem com `isNew: false`.

### Depois da publicação

- conferir páginas, snippets e arquivos gerados;
- enviar ao IndexNow apenas as URLs realmente alteradas;
- acompanhar posição e impressões no export direto do Search Console.

Não é necessário esperar o dia 1 quando a marca confirmar oficialmente uma condição futura.
Nesse caso, escreva a condição e o período de forma literal, preserve como data de verificação
o dia em que a fonte foi consultada e nunca escreva “testado em setembro” durante agosto.

---

## 2. Fonte principal dos cupons

Arquivo: `src/lib/couponsData.ts`

Para cada oferta ativa, reconferir:

- `code` ou, em oferta por link, o destino principal;
- `discount`, valor mínimo e categorias elegíveis;
- `validity`, `reusable`, `combinable` e restrições;
- `offerUrl` e links de campanhas;
- `lastVerified` com a data real (`YYYY-MM-DD`);
- `metaTitle` e `metaDescription` quando contiverem mês, ano, código ou percentual;
- `monthlyHighlight`, FAQs e instruções quando repetirem uma regra alterada;
- `status`: `ativo`, `pausado` ou `expirado` conforme a condição real.

### Ofertas mantidas no contrato atual

| Slug | Marca | Benefício principal | Fonte adicional | Observação mensal |
|---|---|---|---|---|
| `damie` | DAMIE | `CECILIA12` | subdomínio Damie | Verificar a oferta, mas não criar campanha de linkagem: o subdomínio é dono da intenção comercial. |
| `dolce-gusto` | Nescafé Dolce Gusto | `CECI` | artigos do cluster | Testar percentual, mínimo, limite por CPF e acúmulo. |
| `yesstyle` | YesStyle | `CECILIA010` | `data/coupons/yesstyle.json` | A fonte factual é separada; `src/lib/yesstyleCoupons.ts` faz a leitura tipada e alimenta os getters em `couponsData.ts`. |
| `nestle-nutre` | Nestlé Nutre | `CECI` | artigos do cluster | Confirmar exceções de produtos e valor do desconto (10% desde 04/10/2026). Fórmulas infantis de 0 a 12 meses, como NAN, ficam fora por lei (Decreto 9.579/2018, art. 5º): nenhum texto pode sugerir o CECI nelas. |
| `i-wanna-sleep` | I Wanna Sleep | `CECIEMCASA` | artigos do cluster | Confirmar percentual, abrangência e acúmulo. |
| `magalu` | Magazine Você | 10 faixas | `tiers` no próprio cupom | Testar as dez faixas, mínimos, navegador e elegibilidade “vendido e entregue pelo Magalu”. |
| `letseatit` | Let's Eat It | `MAUAD` | UTMs da Inbazz em `offerUrl` | Testar os 5% no checkout. A comissão é atribuída pelos quatro UTMs do link; `test:coupon-offer-modes` falha se algum sumir. |
| `insider` | Insider | `EMCASACOMCECILIA` | FAQ do Insider Creators Club e link da Inbazz em `offerUrl` | Testar os 15% no carrinho com um item comum. Lançamentos podem ficar sem desconto, e a tag `lançamento` não é critério confiável. O site publica o percentual desde 07/10/2026, contra a orientação do FAQ do programa (ver alerta no dossiê). Não editar o link. |
| `shein` | SHEIN | oferta por link | `referral` e `campaigns` | Revalidar links, códigos de busca, público e prazo de cada campanha. |
| `kopenhagen` | Kopenhagen | `CECILIA10` | — | Está pausada: não linkar nem reativar sem confirmação da parceria. |

Uma falha em uma marca não autoriza atualizar as demais. Registre datas diferentes quando os
testes acontecerem em dias diferentes.

---

## 3. YesStyle: fonte factual e campanhas curtas

Fonte factual: `data/coupons/yesstyle.json`  
Adapter tipado e getters: `src/lib/yesstyleCoupons.ts`  
Textos das 10 páginas: `src/components/coupons/yesstyleCopy.ts`

O CECILIA010 é **código de recompensa**, não cupom: vai no campo Reward Code e soma com os
cupons da própria YesStyle (MIDS26 e afins), que vão no campo Coupon Code, vencem e seguem a
política da loja. Nenhum texto pode chamá-lo de cupom nem falar em usá-lo "com outros cupons";
o `npm run test:build-output` falha se isso aparecer numa das páginas da YesStyle.

O código de recompensa e os cupons promocionais têm ciclos diferentes. Em cada item, revisar:

- `status`: `active`, `scheduled` ou `expired`;
- `startsAt`, `expiresAt` e `recheckBy`, quando existirem;
- `verifiedAt` com a data real;
- `officialSourceUrl`, `affiliateUrl` e `regions`;
- no código de recompensa, os percentuais para cliente novo e recorrente;
- nos cupons, `discount` e `membersOnly`.

Os cupons guardam as condições em campos, e cada página as escreve no próprio idioma:

| Campo | Valores |
|---|---|
| `regions` | `["GLOBAL"]` ou códigos de país de 2 letras, como `["US"]`; `GLOBAL` não se mistura com países |
| `discount` | `percentage` (sem valor mínimo), `tiers` (valor mínimo por faixa), `fixed` ou `shipping` |
| `membersOnly` | `true` quando o cupom só vale com login na conta, não na compra como visitante |

Cupom com valor mínimo vai em `tiers`, mesmo com uma faixa só: moeda e faixas em ordem
crescente de valor e de desconto. Modelo, com o MIDS26 de outubro de 2026:

```json
{
  "id": "mids26-promo",
  "code": "MIDS26",
  "type": "coupon",
  "discount": {
    "kind": "tiers",
    "currency": "USD",
    "tiers": [
      { "minSpend": 79, "percent": 8 },
      { "minSpend": 149, "percent": 10 },
      { "minSpend": 199, "percent": 15 }
    ]
  },
  "startsAt": "2026-10-05",
  "expiresAt": "2026-10-08",
  "verifiedAt": "2026-10-05",
  "officialSourceUrl": "https://www.yesstyle.com/en/",
  "affiliateUrl": "https://ystyle.co/rQYQv",
  "membersOnly": true,
  "status": "active",
  "regions": ["GLOBAL"]
}
```

As regras que valem para todos os cupons (quem pode usar, combinação, prazo e frete) não ficam
no JSON: estão em `policyRules`, nos 10 idiomas de `yesstyleCopy.ts`. Se a política da YesStyle
mudar, atualize os 10.

O `npm run validate:yesstyle` confere o JSON e roda em todo `npm run build`; o
`npm run test:yesstyle-data` testa o próprio validador. O validador recusa campo desconhecido,
faixa fora de ordem e cupom ativo sem `startsAt` e `expiresAt`, e exige exatamente um código de
recompensa ativo.

Depois do prazo, uma promoção não pode continuar `active`, e o validador para a build quando
isso acontece. A YesStyle conta o prazo no horário GMT, e o validador compara com a data em UTC:
no dia do `expiresAt`, a build passa a falhar às 21h de Brasília. O reward code permanente não
deve herdar a data de uma promoção curta só para aparentar nova verificação; o helper usa a
maior data das ofertas ativas, portanto o status incorreto também contamina metadata e sitemap
dos hubs YesStyle.

Ao alterar essa fonte, conferir a página PT e os nove hubs internacionais (`/en`, `/es`, `/fr`,
`/de`, `/it`, `/ko`, `/ja`, `/zh-hant` e `/zh-hans`). Traduções não podem inventar regras
diferentes da fonte factual.

---

## 4. Artigos de marca parceira

Diretório: `content/reviews/*.json`

Antes de editar ou criar artigo, ler:

1. `docs/CONTRATO-ARTIGO-AFILIADO.md` — campos, link rastreado, FAQ e divulgação;
2. `docs/FORMA-DE-CONTEUDO-POR-MARCA.md` — qual forma de conteúdo cabe a cada marca.

### Cobertura que deve ser redescoberta em todo ciclo

Não use uma lista antiga de arquivos como fonte de verdade. Antes de atualizar o mês,
reconte os JSONs por `affiliate`, procure o código e as frases de data em todo o acervo e
liste novamente as rotas de cupom. Artigo novo pode repetir a oferta sem ter sido incluído
neste documento.

Retrato conferido em 22/09/2026:

- 80 artigos afiliados: 36 YesStyle, 16 Dolce Gusto, 11 I Wanna Sleep, 9 DAMIE, 6 Nutren
  (4 com `affiliate: "nutren"` e 2 no alias histórico `nestle-nutre`) e 2 Magalu;
- 9 hubs YesStyle: `/cupons/yesstyle` e oito rotas internacionais em `/en`, `/es`, `/fr`,
  `/de`, `/ja`, `/ko`, `/zh-hans` e `/zh-hant`;
- `/cupons`, as páginas dedicadas de DAMIE e Dolce Gusto e a rota genérica
  `/cupons/[brand]` também consomem a fonte compartilhada;
- três artigos repetem mês ou data de confirmação e exigem alinhamento quando a condição
  mudar: `cupom-ceci-nescafe-dolce-gusto-como-usar.json`,
  `cupom-magalu-em-casa-com-cecilia.json` e
  `dolce-gusto-vs-nespresso-vs-3-coracoes.json`.

As quantidades acima são um retrato, não um limite. Se a auditoria encontrar arquivo novo,
atualize este retrato e verifique se ele repete código, percentual, elegibilidade, mês ou data.

No ciclo mensal:

- localizar menções ao mês anterior, “última verificação”, preço e prazo promocional;
- atualizar somente afirmações que foram reconferidas;
- preservar `publishedAt` e `publishedAtISO` como datas originais;
- alterar `updatedAt` apenas quando houver revisão editorial real do artigo;
- preservar a divulgação de parceria em `editorialNote`;
- manter relativos os links para a página da loja, para que passem por
  `TrackedCouponPageLink`: `/cupons/<marca>` em português e `/<locale>/coupons/<marca>` nas
  traduções;
- não editar `src/lib/generated/content-index.ts`: ele é gerado pelo processo de conteúdo.

Os JSONs e `_manifest.json` são a fonte editorial do site. Se a revisão passar pela Central,
respeitar a janela de publicação e o `sourceHash`; não fazer uma edição local concorrente que
possa ser sobrescrita pela próxima sincronização.

### Regra de ownership

`/cupons/<marca>` é dona da intenção transacional. Artigos ficam com instrução, avaliação,
comparação, reputação e utilidade. Se um artigo disputar “cupom <marca>”, use `seoTitle` para
recuar apenas o title da SERP quando a página de cupom estiver competitiva, conforme
`docs/HANDOFF-CUPONS-FASE-1A.md`.

Damie é a exceção de arquitetura: o subdomínio já vence a consulta comercial. A página
`/cupons/damie` permanece como fonte de código e regras, mas fica fora de campanhas de
linkagem em massa no domínio principal.

### Antes de publicar artigo novo

Confirmar no JSON:

- `coupon` com o código correto;
- `affiliate` com o **slug do cupom**;
- `editorialNote` com a relação comercial;
- FAQ com a pergunta literal sobre o código, quando pertinente;
- link interno relativo e editorialmente justificado para a página da loja no idioma do
  artigo;
- `isNew: true` só na versão em português;
- artigo da YesStyle ou da SHEIN: as 10 versões da família, pelo contrato da seção 3 do Job 4
  do vault (`docs/Memoria de Artigos/memreview/00_Sistema/JOBS/Job-4-Conformacao-JSON.md`).

Não incluir `MAUAD` (Let's Eat It) nos termos de `HighlightCoupon` nem de
`ReviewSectionContent`: é o sobrenome da Cecília. O destaque diferencia maiúsculas, então
"Mauad" não seria afetado, mas qualquer assinatura ou título com o nome em caixa alta passaria
a ser marcado como cupom.

Desde 07/10/2026 os artigos da Insider citam os 15% do `EMCASACOMCECILIA`, por decisão do
Bruno, embora o FAQ do programa peça o contrário. Se a parceria acabar, trocar o cupom pelos links
de afiliado de marketplace. As regras do programa estão no dossiê `01_Parceiros/Insider.md`.

Até 10/2026 a loja Nestlé Nutre tinha o slug `nutren`, e dois artigos usavam
`affiliate: "nestle-nutre"`. A loja passou a `nestle-nutre` (`/cupons/nutren` redireciona), os
artigos acompanharam, e o `validate:content` barra `affiliate` que não seja o slug de uma loja.

---

## 5. Promoções e conteúdo sazonal

Campanha com prazo não entra na rotina mensal comum: ela precisa de uma revisão no dia do
término.

| Conteúdo ou fonte | Gatilho | Ação |
|---|---|---|
| promoções em `data/coupons/yesstyle.json` | `expiresAt` | Marcar como expirada ou substituir somente com nova fonte oficial. |
| `referral` e `campaigns` da SHEIN | mudança de link, código ou público | Revalidar cada destino e atualizar `verifiedAt`. |
| `promocao-dolce-gusto-caixas-mini-me-gratis.json` | quantidade de caixas ou fim da ação | Atualizar o número real; se encerrada, remover urgência e explicar o estado. |
| cupons Magalu | mudança de faixa ou valor mínimo | Testar todas as faixas e repetir a mudança no artigo comercial. |
| artigos com ano no title/slug | virada de ano ou nova edição | Não trocar ano mecanicamente; revisar a informação e decidir entre atualizar ou criar edição. |

Se uma promoção acabar, não basta remover o banner: title, description, FAQ, links, imagens,
schema e status também precisam deixar de prometer a condição.

---

## 6. Dados externos que envelhecem

Esses dados não viram no dia 1. Eles mantêm a data original até uma consulta real e devem ser
revistos quando a conclusão puder ter mudado ou, no mínimo, trimestralmente.

| Dado | Onde aparece | Consulta registrada |
|---|---|---|
| Reclame Aqui da DAMIE | `damie-reclame-aqui-o-que-os-dados-mostram.json` | junho/2026 |
| Garantia da poltrona DAMIE | `poltrona-damie-e-boa.json` | 21/07/2026 |
| Reclame Aqui do Magalu e registros da Magazine Você | `magazine-voce-e-confiavel.json` | 16/07/2026 |
| Reclame Aqui da I Wanna Sleep, loja online e físicas | `i-wanna-sleep-reclame-aqui-nota-reputacao.json` | agosto/2026 |
| Política Sleeptest | `sleeptest-i-wanna-sleep-como-funciona.json` | 30/07/2026 |
| Envio ao Brasil e Remessa Conforme da YesStyle | `yesstyle-e-confiavel.json` | julho–agosto/2026 |
| Preços das cápsulas Starbucks Dolce Gusto | `starbucks-dolce-gusto-capsulas-guia.json` | 30/07/2026 |
| Catálogo e preços de referência Nestlé Nutre | `nestle-nutre-produtos-para-que-servem.json` | agosto/2026 |
| Reclame Aqui Sofá na Caixa e DAMIE | `sofa-na-caixa-crise-reclamacoes-procon-sp.json` | agosto/2026 |

Ao reconferir, atualizar número, data e conclusão. Uma variação material pode invalidar o
veredito; trocar apenas a nota preserva uma conclusão possivelmente falsa. Manter atribuição e
separar claramente dado da marca, dado de plataforma pública e experiência da Cecília.

---

## 7. Vídeos

Vídeo não recebe data nova na virada do mês. `uploadDate`, título, descrição e duração devem
reproduzir o vídeo publicado.

Para vídeo novo ou revisão de metadata, seguir `docs/GUIA-EDITORIAL-VIDEOS.md`:

1. classificar como `primary`, `secondary` ou `decorative`;
2. registrar metadados reais em `src/lib/video-metadata.js`;
3. criar a definição em `src/lib/video-pages.js`, quando houver página de exibição;
4. manter um player visível para cada `VideoObject`;
5. executar `npm run validate:video`.

Vídeo é capacidade editorial, não garantia de resultado rico. Nunca mudar o schema para uma
formulação que diverge do título ou da descrição publicados no YouTube.

---

## 8. `llms.txt` e sitemap

Neste projeto os dois são gerados; não existe lista manual equivalente à do Damie.

- `src/app/(pt)/llms.txt/route.ts` usa uma seleção de receitas, as dez reviews recentes,
  vídeos e cupons ativos;
- `src/app/sitemap.ts` usa as mesmas fontes e propaga `lastVerified` dos cupons para
  `<lastmod>`;
- o sitemap é a descoberta completa; `llms.txt` é uma seleção editorial, não um espelho dele;
- reviews ocultas em listagens ficam fora dos dois;
- os hubs internacionais YesStyle usam a data factual mais recente da marca.

Consequência: não editar um arquivo gerado para corrigir cobertura. Corrija o dado de origem,
o status de publicação ou o agregador. Depois do build/deploy, confira `/llms.txt` e
`/sitemap.xml`.

---

## 9. Comandos de auditoria

### Antes de editar

Troque os termos pelo mês que está saindo:

```powershell
rg -n -i "julho|2026-07|última verificação|verificado em|testado em|válido até" src content
```

Listar as datas das ofertas principais:

```powershell
rg -n "lastVerified|verifiedAt|startsAt|expiresAt|recheckBy" src/lib/couponsData.ts data/coupons/yesstyle.json
```

Localizar claims externos datados:

```powershell
rg -n -i "consultado|consultada|verificado|preço|reclame aqui|garantia|suspenso|suspensos" content/reviews
```

Auditar artigos afiliados e detectar slug divergente:

```powershell
rg -n '"(affiliate|coupon|editorialNote)"' content/reviews --glob '*.json'
```

Localizar textos mensais e listar todas as rotas de cupom, inclusive as internacionais:

```powershell
rg -n -i "setembro 2026|2026-09-01|última verificação|confirmado para" src content
rg --files src/app | rg "(coupons|cupons).*(page|route)\.(js|jsx|ts|tsx)$"
```

### Depois de editar

O mês antigo só deve permanecer em datas históricas, consultas externas ainda não repetidas e
conteúdo que descreve legitimamente um período passado:

```powershell
rg -n -i "cupom .* julho 2026|atualizado em julho|testado em julho|última verificação foi.*julho" src content
```

Não faça substituição global de meses ou datas ISO. `publishedAtISO`, `uploadDate`, fontes,
históricos e datas de consulta são evidência, não texto de vitrine.

---

## 10. Validação local

Rode `typecheck` antes do build para receber os erros de uma vez:

```powershell
npm run lint
npm run typecheck
npm run validate:content
npm run validate:video
npm run test:internal-links
npm run test:coupon-offer-modes
npm run test:analytics-gate
npm run build
npm run test:html-lang
```

O `build` repete parte dos validadores, mas não substitui o gate completo acima.

Depois do deploy, conferir:

- `/cupons` e cada `/cupons/<marca>` alterada;
- artigos comerciais e de reputação alterados;
- páginas localizadas da YesStyle, se a fonte factual mudou;
- `/sitemap.xml` e `/llms.txt`;
- checkout ou destino externo em janela anônima e no celular.

---

## 11. Medição mensal

### Fonte operacional

Usar somente o **export direto do Search Console** para diagnóstico de busca. Nunca usar o
export do GA4 como substituto: ele já produziu uma conclusão falsa sobre a demanda Damie.

Agrupar por marca e intenção, registrando:

- impressões;
- posição média ponderada por impressão;
- URL exibida;
- consulta comercial, confiança ou utilidade.

Na página de cupom, posição + impressão com o código legível são o KPI. CTR e `coupon_copy`
não medem sucesso porque a conversão pode acontecer na SERP. Em artigo de utilidade, onde o
código está no corpo, o clique volta a ter valor para entregar o código.

### GA4 como diagnóstico

Usar eventos apenas para comparar caminhos internos e detectar falhas:

- `coupon_page_click` — artigo para página de cupom;
- `coupon_store_click` — saída para loja;
- `coupon_copy` — interação, não venda nem KPI;
- eventos só entram nos hosts permitidos pelo gate de analytics.

Se um CTA ou caminho novo for criado, ele deve usar os componentes rastreados existentes. Não
criar um segundo renderizador de link.

### Verdade econômica

O painel de afiliado é a única fonte de venda e comissão. Cruzar, quando disponível:

1. posição e impressões do Search Console;
2. caminhos relativos do GA4;
3. pedidos e comissão no painel de cada parceiro.

YesStyle é a exceção econômica conhecida: clicar no link de influenciador pode dobrar a
comissão, embora o código visível continue garantindo a comissão base. Nunca esconder o código
para forçar o clique.

---

## 12. Checklist de fechamento

- [ ] Cada oferta foi testada ou recebeu confirmação oficial.
- [ ] Datas registram o dia real da verificação.
- [ ] Campanhas vencidas foram expiradas ou removidas da vitrine.
- [ ] Titles, descriptions, FAQs e artigos repetem a mesma regra.
- [ ] Datas originais de publicação e vídeo foram preservadas.
- [ ] Dados externos antigos mantêm a data antiga quando não foram reconsultados.
- [ ] Artigos novos obedecem ao contrato de afiliado e à forma da marca.
- [ ] Só os artigos do mês corrente têm o chip “novo” (`isNew: true`).
- [ ] Kopenhagen continua sem links enquanto pausada.
- [ ] Damie continua fora da campanha comercial do domínio principal.
- [ ] Validações e build passaram.
- [ ] Sitemap, `llms.txt` e páginas alteradas foram conferidos após a publicação.
- [ ] Relatório mensal usa Search Console direto e painel de afiliado.

Se uma oferta não puder ser confirmada, a ação segura é manter a última data verdadeira e
reduzir a promessa — ou pausar a oferta. Nunca avançar a data para preencher o checklist.

---

## 13. Cadência de publicação entre marcas

O site não lança artigos em lote — nem vários no mesmo dia, nem vários dias seguidos da mesma
marca — diferente do padrão observado na concorrente viroutendencia.com, que publica dezenas
de artigos em poucos dias. A produção aqui é deliberadamente alternada entre os clusters de
marca parceira (DAMIE, Nestlé Nutre, I Wanna Sleep, Nescafé Dolce Gusto e demais), para não
concentrar toda a atenção editorial numa marca só de uma vez.

**Regra:** depois de publicar um artigo de uma marca, o próximo artigo publicado deve ser de
uma marca diferente. Não empilhar dois ou mais artigos seguidos do mesmo parceiro.

### Fila atual (atualizar a cada publicação)

- **Próxima marca:** I Wanna Sleep
- **Depois:** Nescafé Dolce Gusto
- **Registrado em:** 2026-09-04, após publicar em sequência o artigo da Eames (DAMIE, 02/09) e
  o hub de cafeteiras Dolce Gusto vs Nespresso vs 3 Corações (Dolce Gusto, 01/09).

Ao publicar o próximo artigo, mover o ponteiro para a marca seguinte e atualizar a data aqui.
Não é uma ordem fixa de rodízio mecânico marca-a-marca — é um lembrete para não deixar uma
marca dominando o fluxo de publicação por vários dias seguidos.
