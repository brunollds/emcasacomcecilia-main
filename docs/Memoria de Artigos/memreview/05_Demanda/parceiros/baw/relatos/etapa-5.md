# Relato da etapa 5: análise da BAW Clothing

Sessão da etapa 5 (Claude Opus 5.5), aberta pela coordenação "Pesquisa de pautas" com o brief `briefs/etapa-5.md` e o
adendo de 25/11/2026, que vale por cima do brief onde os dois divergem. Branch `docs/demanda-baw-etapa5`, a partir de
`origin/main` em `5544b2e1`.

- **Início:** `2026-11-25T00:46-03:00`
- **Fim:** `2026-11-25T01:03-03:00`
- **Tempo gasto:** 17 minutos (leitura dos documentos, relatos, CSVs e bruto; gerador e validador; matriz; leitura;
  este relato)

## 1. Confirmação do adendo

Li o adendo de 25/11 antes de agir e segui os sete itens: insumos em `5544b2e1`, cobertura de 104 linhas (onze artigos,
lida em `4c639f06`), P1 (tênis) e P2 como executadas, P3 pela releitura de 24/11, pautas da Fila conferidas antes de
recomendar, as regras do código, do estoque, da experiência e da "última Black Friday", e só os meus arquivos.

## 2. O que entreguei

| Arquivo | O que é |
|---|---|
| `3-matriz/montar-matriz.cjs` | Gerador: as linhas são a leitura do analista; as listas de ids saem de faixas, e uma linha cita outra por chave (`{{loja-fisica}}`), então reordenar não quebra as citações. Reescreve o bloco de contagens do `LEITURA.md` |
| `3-matriz/validar-matriz.cjs` | Validador v2: para em id inexistente, célula vazia, prioridade fora de `@nao-se-aplica` em `manter`, `nao-criar` e `ideia-registrada`, evidência principal fora das referências da linha (de 1 a 3), `criar-artigo` sem a frase do que acrescenta, chave não resolvida, código de terceiro, FIRSTBAW fora da forma permitida, CR no arquivo e contagem do `LEITURA.md` diferente da matriz |
| `3-matriz/matriz.csv` | 35 oportunidades, `op-baw-0001` a `op-baw-0035`, todas `em-revisao` |
| `3-matriz/LEITURA.md` | Contagens (do gerador), as perguntas P1 a P7, fatos que decidem, leitura, diferença da semente, pautas da Fila, lacunas e divergências |

Como refazer (de qualquer pasta):

```bash
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/3-matriz/montar-matriz.cjs"
node "docs/Memoria de Artigos/memreview/05_Demanda/parceiros/baw/3-matriz/validar-matriz.cjs"
```

Duas rodadas seguidas dão a mesma `matriz.csv`. O validador foi testado com uma cópia estragada de propósito (id
inexistente, prioridade em `manter`, cinco evidências principais, evidência fora das referências e contagem errada no
`LEITURA.md`): acusou todos, e a matriz voltou igual ao rodar o gerador.

## 3. Contagens

As contagens por ação, prioridade e confiança estão no bloco do `LEITURA.md`, seção 1, escrito pelo gerador e
conferido pelo validador. Não as repito aqui para não haver duas versões.

## 4. Desvios do brief e decisões que a revisão pode rever

1. **Linhas de registro para P1 (tênis) e P2.** O adendo pede que a matriz registre as duas como executadas, com o id
   da cobertura. Fiz isso nas linhas `manter` da BW7 (`op-baw-0011`) e da BW10 (`op-baw-0019`), em vez de criar uma
   ação nova: o formato não tem estado "executada", e a execução fica no `decisoes.json`.
2. **Duas linhas para a Black Friday.** A atualização da BW6 (`op-baw-0012`, sessão de artigos) e a do FAQ da
   `/cupons/baw` (`op-baw-0013`, sessão de cupons) dependem do mesmo carrinho, mas vão a donos diferentes.
3. **Série "BAW ou <marca>" como `ideia-registrada`.** A ordem é do Bruno e a BW12 espera a medição da BW11. O programa
   não leu os resultados das comparações seguintes, então não há a frase do que o texto acrescenta: não recomendo
   artigo, registro o que a evidência traz (`op-baw-0031`).
4. **Moletom como `criar-artigo` de prioridade baixa,** com a janela de inverno nas dependências, e não como ideia:
   a dependência é de calendário e de GO, não de um fato que falta.
5. **Referências fora dos CSVs.** Três fatos que pesam estão no bruto e não têm linha de sinal: a série semanal do
   Trends (pico de "baw clothing" e temporada do moletom), a visão de IA de "cupom baw" sobre desconto progressivo e
   frete grátis e o "PIX DAY" de 16/11, que é da semente (dossiê). As linhas citam o arquivo e a linha do bruto, ou a
   seção da semente, no texto.
6. **Correção minha durante a análise.** Escrevi primeiro que o maior índice de "baw clothing" no Trends era "a semana
   da Black Friday de 2025"; a série mostra que é a de 16/11/2025 (100), e a da Black Friday é a de 23/11 (97).
   Corrigido antes da entrega. Também tirei duas frases que liam consulta → página sem o cruzamento do Search Console.

## 5. O que discordo da orientação

- **P5:** a orientação esperava um "capítulo de correção na BW3". A BW3 já traz a revenda de 2025 com fonte, e a visão
  de IA do Google passou a acertar entre 16 e 18/11. O que a evidência pede é a pergunta literal "O que aconteceu com
  a BAW?" no texto (`op-baw-0006`), não um capítulo de correção.
- **P1 (kids):** a orientação punha kids entre as candidatas. Com 8 de 11 fichas infantis vazias, a ficha não dá
  conteúdo: não criar (`op-baw-0028`).

## 6. O que ficou de fora

- Camisas, jaquetas, saias, bonés, bolsas e meias como pauta: o autocompletar é de produto e cor, sem pergunta de
  decisão.
- Consolidação das páginas de cupom: três impressões não permitem comparar desempenho.
- Retirada: nenhuma página tem idade ou dado para isso.
- Vídeo de review de peça: sem peça em mãos.

## 7. Divergências em arquivos de outros papéis (para a coordenação, não corrigidas)

1. `01_Parceiros/BAW-Clothing.md`, seção 2: afirma que a loja oficial no Mercado Livre existe, sem leitura de nenhuma
   sessão.
2. `01_Parceiros/BAW-Clothing.md`, abertura: segue "Ainda sem artigo" (já avisado pela etapa 4).
3. `03_Memoria/Fila-de-Pautas.md`, linha da BAW no estoque: lista "o tênis BAW é bom?" como estoque sem GO; a BW7 está
   no ar desde 21/11.
4. `briefs/etapa-5.md`: a lista de conteúdo publicado tem seis artigos (o adendo corrige para onze).

## 8. Lacunas, com destino

Na `LEITURA.md`, seção 7. As que travam linha de prioridade alta são uma só: o carrinho de teste na semana de 27/11
(código com o "pague 3, leve 4", base dos 15% do Pix, fim da Pix Night e frete grátis na campanha), com o Bruno ou a
sessão de cupons.

## 9. Sugestões para o formato

1. **Referência a bruto sem linha de sinal.** Fato que decide e está só no bruto (série do Trends, trecho de visão de
   IA) não tem id para entrar em `evidencias_principais`. Hoje vai no texto da célula. Um id de trecho, ou a etapa 3
   gerar sinal para a série semanal e para cada afirmação da visão de IA, deixaria a referência conferível pelo
   validador.
2. **Citação entre linhas por chave.** O gerador resolve `{{chave}}` para o id; vale para o modelo de gerador dos
   próximos parceiros.
3. **Estado "executada fora do programa".** P1 e P2 viraram linhas `manter` com nota. Se isso se repetir, uma ação ou
   uma convenção na nota ajuda a integração a ligar a linha ao `decisoes.json`.
