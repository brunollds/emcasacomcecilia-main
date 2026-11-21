# Árabe (`/ar`): 11º idioma, da direita para a esquerda

Data: 21/11/2026. Decisão do Bruno, depois da pesquisa `idiomas-fora-dos-10-afiliados-2111.md` (vault) e das
revisões do Gemini e do ChatGPT, coladas por ele.

## Por quê

O Bruno quer testar mercados novos pelos afiliados internacionais, e começa pelo árabe: é o de sinal de busca mais
forte, e resolve de uma vez o que só ele exige, a escrita da direita para a esquerda (RTL). Polonês, turco e
vietnamita vêm depois, fora desta spec.

Decisões dele: tudo agora; o `/ar` nasce com o contrato inteiro dos outros 9 idiomas; fonte árabe própria só no
`/ar`; sem esperar a conferência dos painéis de afiliado.

## O que mede o sucesso

| Loja | O que a página precisa fazer | O que acompanhar |
|---|---|---|
| Hostinger (SONAR20), YesStyle (CECILIA010), SHEIN (4CW5Y) | Mostrar marca, código, benefício e condição na mesma frase, legíveis no título, na descrição e no texto, mesmo sem visita | Indexação, impressões, amostras de resultado de busca e de resposta de IA, resgates no painel |
| Starlink, Proton, Temu, AliExpress | Explicar a oferta e levar ao link | Cliques (`coupon_store_click`) e comissões |

Impressão no Search Console não prova que o código apareceu no resultado: as amostras completam a leitura. Os 60
dias depois do deploy são marco de avaliação, não prazo de corte. "Árabe" não é um país: a abrangência de cada
oferta fica dita em cada página, como nos outros idiomas.

## Duas frentes

- **Frente A, base de direção.** Vai à `main` em PRs pequenos, sem criar `/ar` e sem mudar nada que o visitante dos
  10 idiomas perceba.
- **Frente B, o idioma.** Fica no branch `feat/ar` até estar completa, porque `ar` na lista de idiomas quebra o
  build enquanto faltar uma versão de qualquer família, loja ou campanha.

## Frente A

1. **Direção no registro.** `dir: 'ltr' | 'rtl'` no `LocaleConfig`; `<html lang dir>`; todo elemento com `lang`
   próprio leva o `dir` do idioma dele (seletor de idioma, faixa de sugestão, 404, página de loja).
2. **Utilitários lógicos.** Nos arquivos das páginas que existem fora do PT, os utilitários físicos do Tailwind
   viram lógicos (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`, `border-s`, `border-e`, `rounded-s`,
   `rounded-e`). Em LTR o CSS resultante é o mesmo. Pares simétricos ficam como estão. Sombras duras deslocadas
   para a direita são desenho e não espelham. Páginas só do PT ficam fora.
3. **CSS.** Propriedades lógicas onde existem; onde não, regra `:dir(rtl)` dentro do mesmo bloco de movimento. O
   que depende da direção: a entrada das bolinhas, o lado da troca de painel, a origem do carimbo e do sublinhado,
   a corrida da tesoura, a varredura do marca-texto e do destaque do código, e o header (hambúrguer, nome, busca,
   barra da seção atual, seta).
4. **JavaScript.** `src/components/ui/direction.ts`, sem imports de dados: lê a direção efetiva do elemento que
   rola e devolve posição e limites normalizados (0 no início da leitura). As filas com setas, a faixa de lojas, o
   paginador de códigos, a galeria, o balão do código e o trilho das notas usam o módulo. As setas do teclado
   seguem o sentido da leitura.
5. **Ícones.** Chevrons e setas de navegação espelham em RTL; `ExternalLink` e `ArrowUpRight` não.
6. **Códigos e números.** `<bdi dir="ltr">` só no código e na sequência numérica, nunca na frase. No número grande
   do desconto, só a linha numérica; o prefixo ("até") e o benefício em palavras seguem a página. O copiar grava só
   o código original.
7. **Texto.** O FAQ aceita `؟`. A busca tira diacríticos árabes e tatweel e iguala as formas de alef, o alef
   maqsura e o ta marbuta.
8. **Catraca.** `npm run test:rtl`: barra utilitário físico novo nos arquivos multi-idioma (lista de exceções que
   só encolhe) e confere `dir` em todo elemento com `lang`.

**Critério de aceite da frente A.** Classes e atributos mudam; nos 10 idiomas ficam iguais as URLs, os textos, o
que o copiar grava, os eventos de medição, os nomes para leitor de tela e a aparência. As mesmas páginas de `/en`
com `dir="rtl"` forçado no navegador mostram a base funcionando.

## Frente B

- **Registro.** `ar`: `htmlLang` e `hreflang` `ar`, `openGraphLocale` `ar_AR`, `shortLabel` `AR`, `dir` `rtl`,
  rótulo العربية, e o globo no lugar da bandeira. Rotas estáticas `(ar)`. Datas e números com `ar-u-nu-latn`
  (algarismos 0–9), para o "20%" e o "2026" ficarem iguais aos do texto.
- **Fonte.** Noto Sans Arabic variável (OFL) em `src/fonts/`, com `unicode-range` árabe e sem preload; a variável
  entra no `<html>` só quando o idioma é `ar` e vai à frente das pilhas de fonte em `html:lang(ar)`. Em árabe: sem
  maiúsculas, sem espaçamento entre letras (quebra as ligaduras), sem o condensado extremo e com entrelinha maior
  nos títulos grandes. As outras páginas não baixam o arquivo.
- **Texto.** Árabe padrão moderno. Sem Brasil nem "SHEIN Brasil". CECILIA010 é sempre رمز المكافأة e 4CW5Y é
  رمز الإحالة, nunca كوبون, قسيمة nem كود خصم; SONAR20 pode ser cupom. Black Friday: الجمعة البيضاء no título
  grande, بلاك فرايدي na descrição. Título e descrição das páginas de loja com o código cedo e entre espaços. Slugs
  em ASCII, terminando em `-ar`.
- **Conteúdo.** As ~25 cópias de interface, as 6 lojas de `couponTranslations.ts`, a YesStyle e o cluster dela, as
  53 famílias de artigos, as 6 campanhas em todos os idiomas, o índice de busca.
- **Guardas.** Toda tabela por idioma dos testes ganha `ar`, com as palavras de cupom em árabe.
- **Documentos.** `CLAUDE.md`, `docs/NOVO-IDIOMA.md` (o passo a passo para o próximo idioma), o Job 4 do vault e a
  `MANUTENCAO-MENSAL.md`: família e loja novas passam a pedir 11 versões.

**Risco.** O que entrar na `main` em 10 idiomas enquanto o `feat/ar` existir chega sem árabe. Antes do PR final:
rebase, lista do que entrou e tradução do que faltar.

## Quem faz

Esta sessão dirige: briefings, revisão de cada lote, testes e junção. A execução é de subagentes, pelo peso da
tarefa: Opus 5.5 no que pede julgamento, Sonnet 5.5 nas trocas por pasta e nas traduções, Haiku 5.5 no mecânico. A
revisão do árabe de cada loja é de um subagente que não traduziu o lote. Cada lote passa pelo Bruno antes de push e
PR; deploy só com decisão dele.

## Fora

Polonês, turco e vietnamita; página `/ar/black-friday`; RTL nas páginas só do PT; mudança nos textos dos 10
idiomas atuais.
