---
titulo_provisorio: "Belive é confiável? Quem vende, CNPJ, trocas, frete e onde comprar"
seo_title: "Belive é confiável? CNPJ, trocas e site oficial"
slug_sugerido: "belive-e-confiavel"
parceiro: "[[Belive]]"
category: "confianca-reputacao"
reviewKind: "editorial"
type: "Editorial"
status: "em-conformacao-json"
responsavel: "Claude"
proxima_acao: "Job 4 (JSON e imagens) na sessão de artigos, com o texto aprovado no fim deste briefing"
bloqueado_por: "Bruno: frete (seção 11, itens 1 e 2), contato SAC (item 3) e prazo de defeito (item 4)"
score_autoridade: 72
score_conversao: 68
score_ponderado_total: 70
data_criacao: "2026-10-16"
i18n_cluster: null
translationKey: null
modo_i18n: "somente-pt"
idioma_fonte: "pt"
idiomas_alvo: []
status_i18n: "nao-aplicavel"
publicado_em: null
---

# Briefing de Pauta: Belive é confiável?

Primeiro dos quatro artigos de onboarding da Belive. Os outros três, previstos no mesmo pacote:
`belive-reclame-aqui-nota-reputacao` (ainda sem dado: ver seção 11), `cupom-belive-como-usar` e
`belive-black-friday` (guia de preparação). O cupom MAUAD tem página própria em `/cupons/belive`,
que o artigo cita sem repetir o passo a passo.

**Busca (autocompletar, pt-BR, 16/10/2026):**
- "belive": salgadinho, brownie, sem glúten, bolinho, protein brownie.
- "belive é confiável", "use belive é confiável".
- "belive reclame aqui", "belive be free reclame aqui".
- "belive be free": alimentos, cnpj.
- "cupom belive", "cupom belive primeira compra", "cupom belive be free".
- "belive black friday": nenhuma sugestão.

A busca mistura duas perguntas: se a loja é segura (site oficial, CNPJ, trocas) e de quem é a marca
(a "belive be free" aparece como nome da marca e como segmento). O artigo responde às duas sem julgar
o sabor, a dieta ou a qualidade dos produtos.

---

## 1. Portões Obrigatórios (Hard Gates)
- [x] **1. Evidência Factual Suficiente:** razão social e CNPJ no rodapé; CNPJ consultado na BrasilAPI
  (ativo); políticas de troca (7 dias), frete por região e meios de pagamento na FAQ e nas páginas do
  site; "Desde 2015" na página "A Belive". Tudo lido em 16/10/2026 (seção 6).
- [x] **2. Segurança Regulatória & Ética:** o artigo não repete as alegações do site ("100% segura para
  celíacos", "zero risco de contaminação cruzada", "indicado para diabéticos", "saudável"). "Sem glúten",
  "sem lactose" e "zero açúcar" só como a embalagem ou o site declara, com produto. Sem Anvisa (decisão
  de onboarding, como na Max Titanium e na Black Skull). Uma frase de orientação para celíaco e
  diabético: consultar médico ou nutricionista, uma vez.
- [x] **3. Fronteira Factual vs Experiência:** pesquisa em fontes públicas. O único teste é o de
  checkout do cupom (16/10/2026), que fica no artigo do cupom. Aqui, no máximo uma frase, com link.
- [x] **4. Anti-Canibalização:** a intenção é legitimidade ("é confiável", "site falso", "cnpj",
  "reclame aqui"). `/cupons/belive` é intenção de código. Nenhum artigo do site cita a Belive hoje
  (busca em `content/reviews/`).
- [x] **5. Classe Canônica Válida:** `confianca-reputacao`.
- [~] **6. Fontes Acessíveis, Exatas & Atuais:** site oficial, FAQ, páginas de frete e privacidade e
  BrasilAPI lidos. **Reclame Aqui bloqueou** (HTTP 403 para leitura automática): a nota não entra
  no texto até o Bruno mandar print. O Mercado Livre (`meli.la/2xDjP2k`) também bloqueou a leitura
  automática; a página de busca `lista.mercadolivre.com.br` não trouxe o vendedor. O "onde encontrar"
  do site é carregado por JavaScript e não foi lido.
- [x] **7. Decisão i18n Registrada:** `somente-pt`. A loja vende no Brasil.

**Gate 6 fica parcial.** O artigo pode ir ao ar com as fontes lidas, desde que a linha de Reclame Aqui
e a frase do Mercado Livre sejam confirmadas antes (seção 11).

---

## 2. Função da Pauta & Comportamento de Busca
- **Trabalho Principal:** [x] Autoridade/Citação | [x] Visita/Decisão | [ ] Conversão Comercial | [ ] Suporte/Pós-compra
- **Resiste à compressão por IA?** [x] Parcial. "Sim, é confiável" a IA resume. Frete por região, prazo
  de troca e o quadro de "onde comprar" pedem a visita.
- **O que exige a visita do usuário?** a tabela de frete grátis por região, o quadro de trocas e o
  checklist "como conferir que está no site oficial".
- **Como o benefício/código chega ao leitor?** uma linha na resposta rápida e uma seção "Parceria e
  cupom" no fim, com link para `/cupons/belive`. Sem o código no título.
- **Atualiza artigo existente ou cria novo?** novo.
- **URL mais próxima semanticamente:** `/cupons/belive` (código) e `/reviews/max-titanium-e-confiavel`
  (mesma estrutura, outra marca; aqui sem grupo de empresas).

---

## 3. A Dor do Consumidor & Oportunidade
- **Pergunta literal:** "belive é confiável", "belive be free cnpj", "belive reclame aqui", "site
  falso" (sugestão de busca comum para marcas de nicho).
- **O que a marca responde oficialmente:** rodapé com razão social e CNPJ (filial 0002-57); FAQ com
  trocas, frete e pagamento; página "A Belive" com a história da marca.
- **Por que a resposta oficial falha:** o rodapé não mostra endereço nem horário de atendimento; a
  FAQ e a página de frete dão faixas de valor diferentes para a mesma região (seção 11, item 1); a
  página de privacidade traz outro CNPJ e outros canais de contato (seção 11, item 3). Ninguém junta
  isso numa leitura só.
- **Valor exclusivo:** a leitura cruzada do site com o cadastro público (CNPJ na Receita) e a
  tabela de frete e trocas com a data, mais a orientação de como receber e registrar um defeito.

---

## 4. Pontuação Ponderada (Após Portões)

| Critério | Peso | Nota Obtida | Justificativa |
|---|---|---|---|
| 1. Dor / Dúvida real do usuário | 25 pts | 20 | "é confiável", "cnpj", "reclame aqui" no autocompletar |
| 2. Evidência de demanda (GSC / Bing / Buscas) | 20 pts | 12 | Autocompletar médio; sem GSC/Bing da Belive (página nova) |
| 3. Valor exclusivo além do oficial | 20 pts | 15 | CNPJ e filial cruzados, frete por região, prazo de troca |
| 4. Necessidade de visita (anti-compressão) | 15 pts | 10 | Tabela de frete e quadro de troca |
| 5. Contribuição para cluster / links | 10 pts | 7 | Liga ao cupom; sem artigo de Reclame Aqui ainda |
| 6. Viabilidade de produção & manutenção | 10 pts | 6 | Frete e contato mudam; Reclame Aqui pendente |
| **TOTAL** | **100 pts** | **70** | |

- **Score A (Autoridade Editorial):** `72/100`. Mesma estrutura do trio da Max Titanium, com o
  quadro de "de quem é" menos denso (uma empresa só).
- **Score B (Visita & Conversão):** `68/100`. Pouca demanda de compra direta; a conversão está no cupom.

---

## 5. Mídia & Planejamento Visual
- **Imagem Principal (Hero):** print da página inicial de `belivebefree.com.br` em 16:9, sem a faixa
  "Black November" com preço (a campanha muda). Legenda com a data da captura. Print feito por nós,
  como os da Max Titanium e da Probiótica; aprovação do Bruno antes do upload.
- **Contrato de mídia:** `docs/GUIA-MIDIA-EDITORIAL.md`. Ícone da marca já existe em
  `/images/about/partners/belive-icon.png` (CDN).
- **Imagens Inline / Seções:**
  - "Como saber se você está no site oficial": print do rodapé com a razão social e o CNPJ, marca-texto
    amarelo, legenda dizendo que o destaque é nosso.
  - "Frete grátis por região": tabela no próprio artigo, não imagem.
- **Galeria de Detalhes:** não.
- **Vídeo:** [x] Nenhum.

---

## 6. Matriz de Claims & Afirmações Planejadas

| Afirmação planejada no artigo | Tipo de Dado | Fonte Exata | Localização / Trecho | Data Consulta | Pode Publicar? |
|---|---|---|---|---|---|
| A empresa é NHD Foods Indústria, Comércio, Importação e Exportação Ltda. | Dado público / oficial | Rodapé de `belivebefree.com.br` e BrasilAPI | "NHD Foods Indústria, Comércio, Importação e Exportação Ltda – CNPJ 21.541.988/0002-57" | 2026-10-16 | [x] Sim |
| CNPJ 21.541.988/0002-57 está ativo; é filial, em Uberaba (MG), desde 19/10/2015 | Dado público | BrasilAPI `/api/cnpj/v1/21541988000257` | `ATIVA`, `identificador_matriz_filial: 2`, `data_inicio_atividade 2015-10-19` | 2026-10-16 | [x] Sim, com a filial. Não citar o endereço completo: o site não publica endereço |
| A matriz é o CNPJ 21.541.988/0001-76, ativa desde 09/12/2014, em Uberaba (MG) | Dado público | BrasilAPI `/api/cnpj/v1/21541988000176`; CNPJ também citado na política de privacidade | `identificador_matriz_filial: 1`; mesmo logradouro da filial | 2026-10-16 | [x] Sim, numa frase, com o CNPJ da política |
| A marca existe desde 2015 | Afirmação da empresa | `belivebefree.com.br/a-belive-sem-gluten/` | "Desde 2015, combinar criatividade e autenticidade…" | 2026-10-16 | [x] Sim, atribuída ao site |
| Endereço da empresa | Dado público | BrasilAPI (matriz e filial) | Rua Naida Alves, 71, Uberaba (MG), CEP 38059-390 | 2026-10-16 | [~] Só com a ressalva de que o site não publica o endereço (seção 11, item 2) |
| Atendimento: sac@nhdfoods.com.br e (34) 3317-6487 (rodapé, FAQ); formulário "Solicitação de atendimento" | Fato oficial | Rodapé e página de solicitação | "FALE COM A GENTE" | 2026-10-16 | [~] Confirmar o canal atual (seção 11, item 3) |
| Política de privacidade cita outro canal: sac.foods@araunah.com e 0800 941 4663 | Fato oficial | `/politica-de-privacidade-belive/` | "0800 941 4663 ou e-mail (sac.foods@araunah.com)" | 2026-10-16 | [ ] Não citar sem confirmação |
| Arrependimento: 7 dias corridos a partir do recebimento; produto na embalagem original, sem sinais de uso ou violação, com nota fiscal | Política | FAQ "Sobre os termos e condições de troca e devolução" | "…no prazo de 7 dias corridos a partir do recebimento do produto" | 2026-10-16 | [x] Sim |
| No arrependimento, o frete de volta é da Belive e o valor é devolvido após análise | Política | FAQ | "Neste caso o frete é de responsabilidade da Belive." | 2026-10-16 | [x] Sim, sem prazo de reembolso (o site não dá) |
| Defeito: fotografar produto, lote e validade e escrever para o SAC; troca não feita com indício de mau uso | Política | FAQ e formulário | "A troca não será efetuada caso sejam constatados quaisquer indícios de má manipulação…" | 2026-10-16 | [x] Sim. Sem prazo para defeito no site: ver seção 11, item 4 |
| Caixa violada: recusar a entrega no ato | Orientação | FAQ | "Orientamos firmemente que o consumidor… recuse a entrega" | 2026-10-16 | [x] Sim |
| Formulário pede foto de todos os itens com as caixas abertas; a empresa não orienta descartar o produto | Política | `/solicitacao-de-atendimento/` | "Anexe foto de TODOS os itens… e suas respectivas caixas abertas" | 2026-10-16 | [x] Sim |
| Frete grátis por região: SP, MG, RJ, DF e GO acima de R$170; Sul acima de R$250; demais estados acima de R$300 | Política | `/regras-de-frete/` | "FRETE GRÁTIS PARA SP, MG, RJ, DF e GO: compras acima de R$170" | 2026-10-16 | [~] Sim, com a data, mas a FAQ diz outra coisa (seção 11, item 1) |
| Meios de pagamento: Visa, Master, Hipercard, American Express, Elo; até 2x sem juros e parcelas a partir de R$35; boleto; Pix com 5% de desconto | Fato oficial | FAQ; banner da home | "Cartão de crédito… em até 2x sem juros e mais parcelas a partir de R$35, boleto bancário ou PIX" | 2026-10-16 | [x] Sim |
| Processamento de pagamento pelo parceiro Pagar.me/Stone; pedido cancelado se a operadora não autorizar | Fato oficial | FAQ | "(Pagar.me/Stone)" | 2026-10-16 | [x] Sim |
| Site com HTTPS e redirecionamento de http para https | Verificação técnica | `curl -I http://belivebefree.com.br/` (301) e `Strict-Transport-Security` | Cabeçalhos da resposta | 2026-10-16 | [x] Sim, como "o endereço usa conexão segura". Não dizer "seguro" sem explicar |
| O cupom MAUAD dá 10% em todo o site, qualquer forma de pagamento, soma com o Pix | Condição comercial | `src/lib/couponsData.ts` (slug `belive`) e teste de checkout de 16/10 | `testNote` | 2026-10-16 | [x] Sim, com a data; o artigo do cupom detalha |
| "A Belive é aprovada pela Anvisa" / "a fábrica é 100% segura" / "zero risco de contaminação cruzada" | Alegação regulatória / de segurança | Nenhuma lida | — | — | [ ] Não |
| "Diabéticos podem consumir" | Alegação de saúde | Site | — | — | [ ] Não (o site fala em "com a devida avaliação do médico"; o artigo não repete) |
| "A Belive é da Goodsoy" | Relação societária | ABIMAPI (`abimapi.com.br/china/company-araunah.php`) fala em origem comum, não em propriedade | — | 2026-10-16 | [ ] Não afirmar. Só a nota "a marca Goodsoy aparece no site" se o Bruno quiser |

---

## 7. Estratégia de Links Contextuais
- **Afiliado (`affiliate`):** `belive`.
- **Código (`coupon`) e o nome que a loja dá a ele:** `MAUAD`, "Código do cupom" no carrinho, botão
  "Aplicar cupom". O título e a resposta rápida não trazem percentual sem a ressalva de "no carrinho".
- **Links internos para a página da loja (máx 3):** `/cupons/belive` na resposta rápida e em
  "Parceria e cupom".
- **Links internos do cluster:** `cupom-belive-como-usar` (ainda não existe; Job 2 do pacote)
  e `belive-reclame-aqui-nota-reputacao` (ainda não existe; ver seção 11, item 5). O link só entra
  quando o artigo estiver publicado.
- **Links do grupo:** nenhum. A Belive não tem relação com a Supley nem com outra marca do
  site, pelo que se viu.
- **CTA comissionado da loja (`rel="sponsored"`):** `https://belivebefree.com.br/` (o `offerUrl`).
  Sem link de afiliado: a atribuição é pelo cupom.

---

## 8. Decisão Multilíngue
- **Modo i18n:** [x] Somente PT. A marca vende no Brasil.

---

## 9. Esqueleto previsto e FAQ literal

Seções no padrão do `max-titanium-e-confiavel` publicado, uma frase clara por fato:

1. **Resposta rápida:** sim, é uma empresa registrada e ativa. Razão social, CNPJ no rodapé, site
   `belivebefree.com.br`, 7 dias para arrependimento, prazo de defeito a confirmar, e o cupom no link.
2. **De quem é a Belive?** A NHD Foods Indústria, Comércio, Importação e Exportação Ltda., de Uberaba
   (MG). Matriz e filial no CNPJ; a marca "Desde 2015" segundo o site.
3. **Como saber se você está no site oficial:** domínio, razão social e CNPJ no rodapé; o site
   não tem endereço físico publicado.
4. **O que a Belive vende:** pães, bisnaguinhas, doces sem açúcar, brownies e bolinhos, snacks e
   combos, sem avaliar o sabor nem a dieta.
5. **Trocas, devoluções e defeito:** quadro curto com os 7 dias, a embalagem, a foto do lote e o
   que não é aceito.
6. **Frete, prazo e pagamento:** tabela por região, com a data e a ressalva "confirme no checkout".
7. **E a reputação no Reclame Aqui?** uma frase e o link, só se o artigo próprio existir (seção 11).
8. **Onde comprar Belive original:** o site oficial. Mercado Livre só com a frase verificada
   (seção 11, item 6); sem citar lojas físicas, que o "Onde Tem" não listou por ser JavaScript.
9. **Parceria e cupom:** MAUAD, 10% em todo o site, link para `/cupons/belive`.
10. **Vale a pena comprar no site da Belive?** Resposta curta, sem julgar o produto.
11. **Perguntas frequentes.**

FAQ (formato "pergunta? resposta", título reconhecido por `isFaqHeading`):
- A Belive é confiável?
- A Belive é uma empresa de verdade? Responder com a razão social e o CNPJ ativos.
- Qual é o CNPJ da Belive? Responder com o da filial do rodapé e citar a matriz, sem consultar o
  quadro societário nem citar nomes de pessoas.
- O site da Belive é seguro? Responder com domínio, CNPJ e pagamento pelo checkout; sem "100% seguro".
- Quanto tempo tenho para devolver um produto da Belive? 7 dias corridos.
- A Belive tem frete grátis? Responder com a tabela por região.
- Tem cupom de primeira compra na Belive? Responder com o MAUAD, nunca com código de terceiros.
  O MAUAD também é o código da Let's Eat It; o FAQ diz que vale só no site da Belive.

---

## 10. Pontos de atenção na redação
- Não repetir "100% segura para celíacos", "zero risco de contaminação cruzada", "indicado para
  diabéticos", "saudável", "sem açúcar que nem parece". Só "sem glúten", "sem leite", "sem lactose" e
  "zero açúcar" como a embalagem declara, e uma frase de médico ou nutricionista.
- Não usar "Black November" nem o preço de campanha como fato permanente.
- Não citar o autocompletar "belive be free alimentos" como nome de empresa. "Belive be free" é o nome
  da marca no site.
- Frete e prazo com a data de 16/10/2026 e a ressalva de condições da loja.
- O MAUAD precisa dizer de qual loja fala; não explicar a origem do nome.

---

## 11. Perguntas para o Bruno e pendências
1. **Frete (conflito):** a FAQ diz R$170 para MG, SP, DF e GO; R$250 para o Sul; R$300 para Norte,
   Nordeste, RJ, ES, MT e MS. A página "Regras de frete" diz R$170 para SP, MG, RJ, DF e GO; a home diz
   "frete grátis a partir de R$170" e, numa faixa, "hoje tem frete grátis acima de R$150". Qual
   vale? Sem resposta, o artigo usa a página "Regras de frete" com a data e a ressalva "confirme no
   checkout".
2. **Endereço:** o site não publica endereço, só o CNPJ. A BrasilAPI dá Rua Naida Alves, 71,
   Uberaba (MG), CEP 38059-390, para as duas unidades. Publicar esse endereço como "do site" ou
   só como "do cadastro público"? Recomendo o segundo.
3. **Contato:** o rodapé e a FAQ dizem sac@nhdfoods.com.br e (34) 3317-6487. A política de privacidade
   diz sac.foods@araunah.com e 0800 941 4663. O nome Araunah aparece nas fontes públicas como o
   grupo da família de Goodsoy e Belive (ABIMAPI), não como a empresa do CNPJ. Qual é o canal
   atual? Sem resposta, o artigo cita só o do rodapé.
4. **Prazo de defeito:** o site não diz quantos dias há para comunicar um defeito (ao contrário da
   Max Titanium, que tem 30 e 90 dias). Também não diz em quantos dias o reembolso sai. Quer
   perguntar à Belive antes, ou o artigo diz que o prazo não está publicado?
5. **Reclame Aqui:** `reclameaqui.com.br/empresa/belive/` deu 403 para a leitura automática. Sem a nota
   e o índice de resposta, não há linha de RA com número. Mande o print da página da Belive (nota,
   índice, solução, voltaria a fazer negócio). Sem o print, o artigo não cita o RA; e o artigo próprio
   de RA ainda não existe, então o link da linha ficaria quebrado.
6. **Mercado Livre:** o cupom não vale lá (couponsData). Existe loja oficial da Belive no Mercado Livre
   ou só revenda? O link `meli.la/2xDjP2k` não pôde ser aberto pela leitura automática. Mande o print
   do perfil do vendedor, se for o caso.
7. **Quadro societário:** a Receita mostra mudança de sócio em 08/01/2026. O artigo não cita nomes.
   Quer incluir "a empresa teve mudança de sócio em 2026"? Eu não incluiria sem decisão sua.
8. **Hero:** print da página inicial, a ser feito. Opções na folha antes do upload.
9. **Escopo:** o cupom, o "como usar" e a Black Friday ficam em artigos próprios. Confirmar a
   divisão dos quatro artigos antes da redação.

---

## 12. Registro da pesquisa (16/10/2026)
- Autocompletar (pt-BR): ver a seção de busca.
- Site oficial (`belivebefree.com.br`, WordPress + WooCommerce, HTTPS com HSTS): home; `/faq/`;
  `/regras-de-frete/`; `/politica-de-privacidade-belive/`; `/solicitacao-de-atendimento/`;
  `/a-belive-sem-gluten/`. `/onde-tem-belive/` carregou sem a lista (JavaScript). `/sobre-a-belive/`
  deu 404.
- BrasilAPI: CNPJ 21.541.988/0002-57 (filial) e 21.541.988/0001-76 (matriz), ambos ativos.
- WebSearch: "Belive NHD Foods araunah" (sem resultado sobre a empresa do CNPJ); ABIMAPI sobre o grupo
  Goodsoy/Araunah (origem da marca em 2015, sem dados de CNPJ).
- Bloqueados por leitura automática: Reclame Aqui (403) e meli.la / Mercado Livre (403 na curl; a busca
  do ML respondeu 200 sem dados de vendedor).

## Redação, revisão e JSON
Não iniciados. Próxima ação: Bruno responde os itens 1 a 6 da seção 11; depois a sessão de artigos
redige seguindo este briefing, com Job 3 e Job 4 normais.

---

**Resumo para o Bruno (16/10/2026):** score A 72, score B 68 (total 70). Recomendação: seguir, mas só
depois de resolver frete (item 1), contato (item 3) e o print do Reclame Aqui (item 5). Sobreposição:
nenhuma com artigos publicados; o cupom e a Black Friday ficam em artigos próprios.

## Decisões do Bruno (16/10/2026)

1. **Frete grátis:** vale a página `/regras-de-frete`: acima de R$ 170 em SP, MG, RJ, DF e GO (RJ é Sudeste); acima de R$ 250 no Sul; acima de R$ 300 nos demais estados. O FAQ do site que põe o RJ em R$ 300 fica de fora. O limite conta o valor **sem** o cupom: aplicar o MAUAD não faz perder o frete grátis. A correção de `/cupons/belive` (que diz só R$ 170) foi pedida pelo Bruno à sessão de cupons.
2. **Contato:** o do rodapé, sac@nhdfoods.com.br e (34) 3317-6487. O da política de privacidade (Araunah, 0800) não entra.
3. **Mercado Livre:** é a loja oficial da Belive (o link do FAQ de `/cupons` abre). O cupom não vale lá.
4. **Código MAUAD:** não citar que o mesmo código é da Let's Eat It nem explicar o nome. Cada artigo fala só da Belive.
5. **Devolução e defeito** (texto da loja colado pelo Bruno em 16/10/2026): arrependimento em 7 dias corridos a partir do recebimento (CDC); produto na embalagem original, sem uso nem violação, com nota fiscal; pedido formal a sac@nhdfoods.com.br dentro do prazo; o valor é devolvido depois da análise interna; nesse caso o frete é por conta da Belive. Defeito: fotografar os produtos, o lote e a validade e escrever para sac@nhdfoods.com.br; não há troca com indício de má manipulação ou mau uso, ou se a ocorrência não puder ser identificada. A loja não publica prazo do reembolso: o texto diz que não está publicado.
6. **Teste do cupom (prints do Bruno, 16/10/2026):** carrinho com Combo Doces COMPLETÃO 30 un. (R$ 179,90), Combo Experimentação COMPLETÃO 40 un. (R$ 217,90), Kit 10 Brownies Proteicos Double Chocolate (R$ 74,12) e Combo Doces 16 un. (R$ 104,90), todos com selo de oferta: subtotal R$ 576,82 (R$ 547,98 no Pix sem cupom); com o MAUAD, "Cupom: mauad -R$ 57,68", total R$ 519,14 e R$ 493,18 no Pix. Prints em `OneDrive/Imagens/Capturas de tela/Screenshot 2026-10-16 185508.png`, `185528.png` e `185543.png`.
7. **Reclame Aqui (prints do Bruno, 16/10/2026)** — perfil **"Belive Be Free"**, categoria "Alimentos e Bebidas - Alimentos Diet e Light", selo de reputação **Ótima**, mais de 3,9 mil visualizações.
   Os números completos estão no briefing `belive-reclame-aqui-nota-reputacao`; aqui, só a linha com o selo e o link para lá.

## Aprovação do texto (16/10/2026)

Texto escrito por um redator (Job 2), revisado por Claude (Job 3) e aprovado pelo Bruno em 16/10/2026.

- **Revisão (Claude, 16/10/2026):** fatos fora do briefing conferidos nas páginas salvas da loja ("desde 2015", Pagar.me/Stone, parcelas a partir de R$ 35, caixa violada, 24 horas úteis do atendimento, faixa de R$ 170 no topo); contas refeitas; links cruzados entre os 4 artigos da Belive com o título certo; no máximo 2 links para `/cupons/belive` por artigo.
- **Job 4:** ids a partir de 449 (os comparativos ficaram com 444 a 448); `affiliate` belive, `coupon` MAUAD, `cta.url` = `offerUrl` (https://belivebefree.com.br/); nota editorial de até 3 linhas, sem data; `isNew`; imagens em folha de opções, upload só com GO do Bruno. Os 4 vão ao ar juntos, porque se linkam.
- **Recheck no dia do JSON:** preços, frete e a página Black November.

### Notas da revisão (16/10/2026)

- Matriz usada: CNPJ da filial e da matriz; rodapé; arrependimento e defeito; caixa violada; frete (página de regras); meios de pagamento e Pagar.me/Stone; HTTPS (sem "seguro" sem explicação); cupom (teste de 16/10); Reclame Aqui (decisão 7); Mercado Livre (decisão 3).
- Fora do texto, por decisão ou por falta de fonte: alegações regulatórias e de saúde, Araunah e canal 0800, endereço completo, quadro societário, Goodsoy, lojas físicas, números do teste de carrinho.
- Pendente: [CONFERIR: print do rodapé com marca-texto e hero da página inicial]. Não inseridos; o upload espera a aprovação do Bruno.
- Link `/reviews/belive-reclame-aqui-nota-reputacao` aponta para artigo que ainda não existe. Fica quebrado até ele sair.
- Link para `cupom-belive-como-usar` omitido, porque o artigo ainda não existe.
- Prazo de defeito e de reembolso: escritos como "não publicado", conforme a leitura de 16/10/2026.
- A FAQ do site dá outra faixa de frete para RJ e outros estados. O texto segue a página de regras de frete e tem a ressalva na seção de frete.
- Reclame Aqui: selo Ótima e nota 8,1 vêm dos prints de 16/10/2026 do Bruno. Os números de 6 e 12 meses ficam no artigo de reputação.

## Texto aprovado

### Resposta rápida

- Sim, é uma empresa registrada e ativa. A Belive é vendida pela NHD Foods Indústria, Comércio, Importação e Exportação Ltda., CNPJ 21.541.988/0002-57, que consta como **ativo** nos dados públicos em 16/10/2026.
- O site oficial é **belivebefree.com.br**.
- São 7 dias corridos, contados do recebimento, para desistir da compra. O produto precisa estar na embalagem original, sem uso, com nota fiscal.
- O frete grátis começa em R$ 170 em SP, MG, RJ, DF e GO. O valor conta sem o cupom.
- O cupom **MAUAD** dá 10% OFF no carrinho, em todas as formas de pagamento. Regras na [página do cupom da Belive](/cupons/belive).

### De quem é a Belive?

A loja é operada pela NHD Foods Indústria, Comércio, Importação e Exportação Ltda., segundo o rodapé do site e o cadastro público de CNPJ.

O rodapé traz o CNPJ da filial, 21.541.988/0002-57, ativa desde 19/10/2015. A matriz é o CNPJ 21.541.988/0001-76, ativa desde 09/12/2014, o mesmo citado na política de privacidade. As duas unidades ficam em Uberaba (MG), segundo o cadastro público.

Segundo o site, a marca existe **desde 2015**.

### Como saber se você está no site oficial

Antes de pagar, confira três coisas:

- O domínio, na barra do navegador, é **belivebefree.com.br**, sem letra trocada. Isso importa mais quando o link chegou por anúncio ou mensagem.
- O rodapé mostra a razão social NHD Foods e o CNPJ 21.541.988/0002-57. Cruze o número numa consulta pública da Receita Federal.
- O endereço usa conexão segura: o http redireciona para https. Isso mostra que a conexão é criptografada, não que a loja é idônea.

O rodapé não traz endereço de atendimento nem horário. Para falar com a loja, use sac@nhdfoods.com.br ou (34) 3317-6487.

### O que a Belive vende

A loja vende pães, bisnaguinhas, doces, brownies, bolinhos, snacks e combos. Não avaliamos sabor nem dieta.

Parte dos produtos é anunciada como **sem glúten** e **zero açúcar**. São declarações da loja e da embalagem, produto a produto. Se você é celíaco, diabético ou tem outra condição de saúde, converse com um médico ou nutricionista antes de comprar.

### Trocas, devoluções e defeito

As regras de troca e devolução do site, lidas em 16/10/2026:

| Situação | Prazo | O que fazer | O que acontece |
|---|---|---|---|
| Arrependimento | 7 dias corridos a partir do recebimento | Pedido formal ao SAC dentro do prazo, com nota fiscal. Produto na embalagem original, sem uso nem violação | Frete de volta por conta da Belive. O valor volta depois da análise interna |
| Defeito | Não publicado no site | Fotos do produto, do lote e da validade, enviadas ao SAC | Não há troca se houver indício de má manipulação ou mau uso, ou se a ocorrência não puder ser identificada |

O site não publica prazo para o reembolso e não diz em quantos dias comunicar um defeito. Por isso, abra o pedido logo que perceber o problema e guarde a nota. Se a caixa chegar violada, o site orienta recusar a entrega no ato.

### Frete, prazo e pagamento

O frete grátis depende do valor do pedido e da região. Segundo a página de regras de frete do site, em 16/10/2026:

| Região | Frete grátis a partir de |
|---|---|
| SP, MG, RJ, DF e GO | R$ 170 |
| Sul | R$ 250 |
| Demais estados | R$ 300 |

O limite conta o valor sem o cupom: aplicar o MAUAD não faz o pedido perder o frete grátis. Se a FAQ do site mostrar outra faixa, vale a página de regras de frete. Confirme o valor no checkout antes de pagar.

No pagamento, a loja aceita Visa, Mastercard, Hipercard, American Express e Elo, em até 2x sem juros e mais parcelas a partir de R$ 35. Também aceita boleto e Pix com 5% de desconto. O processamento é do parceiro Pagar.me/Stone. Se a operadora não autorizar o pagamento, o pedido é cancelado.

### E a reputação no Reclame Aqui?

No Reclame Aqui, o perfil "Belive Be Free" tem selo **Ótima** nos últimos seis meses e nota **8,1**, em consulta de 16/10/2026. Os números completos estão no [artigo sobre a reputação da Belive no Reclame Aqui](/reviews/belive-reclame-aqui-nota-reputacao).

### Onde comprar Belive original

O caminho direto é o site oficial, belivebefree.com.br, onde valem as regras de troca e de frete deste artigo.

A loja oficial da Belive também está no Mercado Livre. Lá, o cupom MAUAD não vale. Antes de pagar em qualquer marketplace, confira se o vendedor é a loja oficial.

### Parceria e cupom

O Em Casa com Cecília tem parceria com a Belive e pode receber comissão pelas compras feitas com o cupom **MAUAD**. No carrinho, ele entra no campo "Código do cupom", com o botão "Aplicar cupom".

O desconto é de 10% OFF em todo o site, em todas as formas de pagamento. Vale na primeira compra, soma com as ofertas do site e com os 5% do Pix. Não vale no Mercado Livre.

Fizemos o teste de carrinho do cupom em 16/10/2026. O passo a passo, com os números do teste, está em [Cupom Belive: como usar o MAUAD](/reviews/cupom-belive-como-usar).

### Vale a pena comprar no site da Belive?

Do ponto de vista de confiança, sim. A empresa está ativa, o site publica razão social, CNPJ, trocas e frete, e a reputação no Reclame Aqui é Ótima.

Três pontos mudam a conta. Se você mora fora de SP, MG, RJ, DF, GO e do Sul, o pedido precisa passar de R$ 300 para ter frete grátis. O site não publica prazo para defeito, então guarde nota e fotos desde a entrega. E o reembolso não tem prazo publicado.

### Perguntas frequentes

- A Belive é confiável? Sim, do ponto de vista cadastral: a loja tem CNPJ ativo, razão social no rodapé, trocas publicadas e reputação Ótima no Reclame Aqui, em consulta de 16/10/2026.
- A Belive é uma empresa de verdade? Sim. A NHD Foods Indústria, Comércio, Importação e Exportação Ltda. tem matriz e filial ativas nos dados públicos de CNPJ.
- Qual é o CNPJ da Belive? O do rodapé do site é 21.541.988/0002-57, da filial. A matriz é 21.541.988/0001-76.
- O site da Belive é seguro? O endereço oficial é belivebefree.com.br e usa conexão segura. Ainda assim, confira o domínio antes de digitar dados de pagamento, principalmente se chegou por anúncio.
- Quanto tempo tenho para devolver um produto da Belive? São 7 dias corridos a partir do recebimento, com embalagem original, sem uso e com nota fiscal. Para defeito, o site não publica prazo.
- A Belive tem frete grátis? Tem: a partir de R$ 170 em SP, MG, RJ, DF e GO, R$ 250 no Sul e R$ 300 nos demais estados, sem contar o cupom (16/10/2026).
- Tem cupom de primeira compra na Belive? Tem o MAUAD: 10% OFF no carrinho, em todas as formas de pagamento, válido na primeira compra. Não vale no Mercado Livre.

### Nota de transparência

Parceria comissionada: o Em Casa com Cecília tem parceria com a Belive e pode receber comissão pelas compras feitas com o cupom MAUAD. Fontes, lidas em 16/10/2026: site belivebefree.com.br (rodapé, FAQ, regras de frete, trocas, solicitação de atendimento e a página "A Belive"), consulta pública de CNPJ e prints do Reclame Aqui. O teste de carrinho do cupom foi feito na mesma data.
