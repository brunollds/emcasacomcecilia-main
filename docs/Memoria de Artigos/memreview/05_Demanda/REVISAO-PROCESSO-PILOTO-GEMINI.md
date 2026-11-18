# Revisão externa do processo do piloto: Gemini

Parecer do Gemini sobre o processo do primeiro piloto (L'Amazonie), colado pelo Bruno na sessão de coordenação em
17/11/2026. **Isto é uma transcrição condensada feita pela coordenação**, não o arquivo original: saíram o registro
das ferramentas que o revisor rodou e os links locais (`file:///...`), e as tabelas foram encurtadas. O sentido de cada
ponto foi mantido; o texto integral está na conversa do Bruno com o Gemini. O parecer do ChatGPT está inteiro em
`REVISAO-PROCESSO-PILOTO-CODEX.md`.

O revisor diz ter conferido o `HANDOFF-REVISAO-PILOTO.md` contra os arquivos, scripts, CSVs e commits #1074 a #1120.

## 1. Veredito

Manter como espinha dorsal: uma sessão por etapa com propriedade exclusiva de arquivos, geradores determinísticos que
falham rápido e revisão independente em sessão separada. Isso eliminou conflito de Git, deu rastro por id e pegou três
erros graves, entre eles o achado comercial mais urgente (a oferta até 26/11, que estava no bruto da etapa 3).

Quatro falhas de processo a corrigir antes do segundo piloto:

1. **Dependências invertidas:** cobertura em paralelo com o catálogo, e pesquisa semente e dossiê usados como
   comparação depois da matriz, em vez de insumo.
2. **Rotina do site inteiro dentro do relógio de um parceiro** (`_site/` para 31 lojas na sessão da etapa 4).
3. **Esquema estreito do `sinais.csv`:** anúncio, preço de vitrine em marketplace e resposta de IA ficaram sem id.
4. **Acúmulo de papéis da coordenação:** coletou, editou o script do analista, testou carrinho e alterou artigo, sem
   realimentar `LEITURA.md` e `recomendacoes.md`.

## 2. Avaliação por sessão

| Sessão | Desvio | Avaliação | Regra a manter e o que mudar |
|---|---|---|---|
| Coordenação | Briefs só na conversa; mudou o escopo da etapa 4 duas vezes por mensagem; editou `montar-matriz.cjs` sem atualizar `LEITURA.md`; fez coleta de teste e editou produção | Bom: recomendações por script. Ruim: briefs fora do repositório, edição no script do analista, execução misturada ao fechamento | Versionar briefs. Proibir a coordenação de editar `1-bruto/`, `2-processado/`, `3-matriz/`, `content/` e `src/`. Execução aprovada pelo Bruno sai do piloto e vai para a sessão de artigos ou de cupons |
| Etapa 2 | HTML com dado pessoal fora do repositório; 42 pedidos sem parar no primeiro 429; tratou `agents.md` da loja como dado; deixou como indisponível volume que a semente tinha | Bom: separar dado pessoal, tratar instrução externa como dado, gerador com asserções. Ruim: laço sem parada e não ler a semente | Parada obrigatória no primeiro 429 ou 403, 3 a 5 segundos entre pedidos (até 20 por minuto em HTML), ler dossiê e semente antes |
| Etapa 4 | Rodou junto com a etapa 2 (cobertura sem entidades); 31 lojas no arquivo geral; colisão de aba e sobrescrita de downloads, corrigidas; consultas manuais de IA não feitas (não estavam no brief dela) | Bom: arquivo geral canônico, conferência do download pelo conteúdo, aba própria. Ruim: cobertura sem catálogo e dependência de login ao vivo | Todo download conferido por cabeçalho, período e filtro; aba dedicada. Desmembrar: `_site/` vira rotina global; no parceiro, só filtrar e mapear a cobertura depois da etapa 2 |
| Etapa 3 | Trocou cabeçalhos com cookie por `respostas.tsv`; busca, Trends, YouTube e Mercado Livre como resumo; título em `limitacoes`, consulta de origem em `filtros`; Reclame Aqui sem bruto | Bom: `respostas.tsv` e semente vazia com medida 0. Ruim: resumir a busca sem anúncio e shopping como sinal, e repetir blocos de relacionadas sem juntar | Anúncio da marca, preço de vitrine e resposta de IA viram linha de sinal. Para consulta candidata a pauta ou de prioridade alta, texto integral da página e print |
| Etapa 5 | Matriz só sobre os CSVs, semente lida no fim; não leu a linha de patrocinados; volume como desconhecido; bloco repetido lido como procura; manteve a `op-0018` | Bom: matriz por script, validador, leitura dos JSONs. Ruim: ignorar semente, dossiê e bruto. Neutro: manter a `op-0018` com ressalva | Ler semente e dossiê e varrer `1-bruto/` por preço, data, volume e promoção antes da matriz. O próprio analista grava os estados finais na matriz e na leitura |
| Revisão | Nenhum relevante; apontou a própria inferência na segunda passada | Muito bom: a etapa de maior retorno por minuto | Revisor em sessão isolada, sem editar a matriz, abrindo o bruto de toda linha alta, média e de artigo novo; segunda passada do mesmo revisor, só sobre o diff |

## 3. Respostas às 11 perguntas

1. **Ordem:** etapa 0 (ler dossiê, semente e o que já existe no site); etapa 2 (catálogo); depois, em paralelo, etapa 3 e
   etapa 4 do parceiro (recorte dos nossos dados, comercial, consultas de IA e cobertura já ligada ao catálogo); etapa
   5; revisão em duas passadas; recomendações.
2. **Briefs:** modelos fixos em `05_Demanda/modelos/briefs/` com as regras invariáveis, mais um `BRIEF-PARCEIRO.md` curto
   por parceiro com as particularidades.
3. **Coordenação:** prepara o roteiro, abre sessões, mantém diário, como refazer e lições, arbitra bloqueios com o
   Bruno e gera as recomendações. Nunca coleta, nunca edita script ou CSV de `2-processado/` e `3-matriz/`, nunca edita
   artigo ou código. Quem aplica os estados da revisão é o analista, ou o script lendo um arquivo de vereditos.
4. **Revisão:** mesmo modelo em sessão separada basta para a revisão de cada parceiro; o ganho vem do contexto limpo e
   do pedido de abrir o bruto. Outro modelo ou revisor externo em mudança de formato do programa, em auditoria de fim de
   piloto e em discordância de alto impacto. Segunda passada sempre do mesmo revisor.
5. **Navegador:** campo de fidelidade no `FONTE.md` e no CSV (`arquivo-original`, `extracao-dom-script`,
   `resumo-sessao`) e print obrigatório só onde há valor perecível de decisão: prioridade alta, artigo novo, anúncio
   com data ou preço, preço de vitrine ou de checkout.
6. **Semente:** vira a etapa 0, insumo obrigatório, para não recoletar o que tem bruto válido e focar as lacunas. Sem
   semente, o programa a substitui, mas precisa trazer o que ela tinha de bom (Reclame Aqui, Anvisa e CNPJ, teste de
   carrinho).
7. **Site e parceiro:** separar de vez. `_site/` vira rotina global (quinzenal, mensal ou depois de campanha); o
   parceiro só consome e abre a plataforma se faltar um recorte.
8. **Formatos:** os 1.039 sinais servem como banco de rastro e são ruído lidos crus. O gerador deve emitir um
   `resumo-sinais.md` e juntar as buscas relacionadas por termo. Aplicar já: tipos `anuncio`, `vitrine-marketplace` e
   `resposta-ia`; colunas `consulta_origem` e `titulo`; lista com `|` em `coleta_id` e `evidencia`; `preco_de_ref`;
   `parceiro` e `estado_conferido_em` na cobertura; separar `manter` de `nao-criar`; `evidencias_principais`; LF fixo
   nos processados; validador conferindo contagens em prosa. Deixar de fora: estados novos como `@ausente`, e colunas
   extras na matriz.
9. **Parada:** o programa completo não vale quando o parceiro junta catálogo pequeno (menos de 30 produtos), menos de
   30 dias no nosso site e semente recente com pacote inicial publicado. Vale quando há catálogo amplo, mais de 30 a 60
   dias de páginas publicadas, ou parceiro médio ou grande sem semente.
10. **Mudança de escopo:** sessão em andamento não recebe instrução contraditória solta. Registrar a decisão, mandar
    uma mensagem numerada com confirmação de leitura, ou deixar a entrega original terminar e abrir um turno
    complementar.
11. **Medir no segundo piloto:** sinais úteis sobre coletados; linhas devolvidas na primeira versão da matriz (meta:
    de 6 em 26 para 2 ou menos); fichas lidas sem 429 (meta: zero bloqueio); tempo do parceiro sem o `_site/` (meta: 75
    minutos ou menos); recomendações aprovadas pelo Bruno sem refazer a investigação.

## 4. Fluxo proposto para o segundo piloto

Rotina global de `_site/` fora do relógio do parceiro. Etapa 0 pela coordenação (formatos e programa atualizados,
roteiro, briefs, inventário do que já existe). Etapa 2 sozinha. Etapas 3 e 4 em paralelo depois do merge da 2, com a
cobertura já ligada ao catálogo. Etapa 5. Revisão 6A, correção 5B, revisão 6B, e fechamento pelo analista: estado
`pronta` na matriz, leitura sincronizada e recomendações geradas.

| Papel | Pode editar | Não pode editar |
|---|---|---|
| Coordenação | `PROGRAMA.md`, `FORMATOS.md`, `LICOES.md`, `.gitattributes`, roteiro, diário, como refazer, `1-bruto/README.md`, gerador e arquivo de recomendações | Coletas, scripts e CSVs de `2-processado/` e `3-matriz/`, relatos, `REVISAO.md`, `content/`, `src/` |
| Etapa 2 | Suas coletas, brutos pesados, gerador e `catalogo.csv`, relato | O resto |
| Etapa 3 | Suas coletas, gerador, `sinais.csv`, `resumo-sinais.md`, relato | Catálogo, `_site/`, matriz, arquivos da coordenação |
| Etapa 4 | Coleta nova em `_site/` se houver, gerador, `nossos-dados.csv`, `comercial.csv`, `cobertura.csv`, relato | Catálogo, sinais, matriz, arquivos da coordenação |
| Etapa 5 | Gerador e validador da matriz, `matriz.csv`, `LEITURA.md`, relato | Bruto, `_site/`, `2-processado/`, `REVISAO.md`, arquivos da coordenação |
| Revisão | Só `REVISAO.md` | Todo o resto |

## 5. O que do relato da coordenação não bate com os arquivos

1. As consultas manuais de IA aparecem como desvio da etapa 4, mas não estavam no brief dela: foi omissão de
   distribuição da coordenação.
2. `LEITURA.md` ficou no estado intermediário (20 prontas e 9 em revisão), contradizendo a matriz, o diário e o
   handoff.
3. `recomendacoes.md` dizia que nenhuma oportunidade tinha sido decidida e que faltava testar o cupom, depois de o
   teste ter sido feito (#1106) e o artigo atualizado (#1109).
4. `1-bruto/README.md` dizia 12 coletas, e são 13. `PROGRAMA.md` e `ROTEIRO-PILOTO.md` ainda diziam que nada tinha sido
   executado.
5. Os comandos da matriz, do validador e das recomendações não estavam em nenhum `COMO-REFAZER.md`.
6. A soma de 122 minutos deixa de fora as duas coletas cronometradas da coordenação (127 no total), e o diário ainda
   dizia "entre 09:58 e 12:02" depois da coleta das 18:48.
7. `nossos-dados-lojas.csv` tem 8.295 registros e 8.305 linhas físicas, por quebra de linha dentro de aspas em 9
   registros.
