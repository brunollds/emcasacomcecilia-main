# Lições do Programa de Demanda

O que funcionou, o que falhou, o que pediu intervenção do Bruno e o que mudou nos formatos, a cada rodada. As lições
de um piloto entram no `PROGRAMA.md` e no `FORMATOS.md` antes de o programa abrir para outro parceiro.

## 2026-11-17 · L'Amazonie · etapas 2, 3 e 4

Tempo medido: etapa 2 em 20 minutos, etapa 3 em 30, etapa 4 em 36 (com todas as lojas). Detalhe em
`parceiros/lamazonie/relatos/`.

### Funcionou

- **Uma sessão por etapa, com relato próprio.** As etapas 2 e 4 rodaram em paralelo sem conflito porque cada uma
  tinha os seus arquivos e a coordenação ficou com o diário, o como refazer e as lições.
- **Feed público da Shopify.** `products.json`, `collections.json` e os sitemaps responderam sem bloqueio e deram o
  catálogo em uma coleta.
- **Script que para no erro.** Os três geradores recusam célula vazia, id repetido e evidência inexistente; o
  resultado se repete byte a byte.
- **Conferir o download pelo conteúdo.** Quatro exports do Search Console se sobrescreveram e um arquivo antigo de
  mesmo nome quase entrou no lugar do certo; a conferência por filtro, período e linha conhecida pegou os dois casos.
- **Bruto do site inteiro em `_site/`.** Uma coleta serviu às 31 lojas.

### Falhou ou pediu intervenção

- **429 nas fichas de produto.** Sessenta pedidos em 3 minutos bloquearam a loja, e o laço não parou no primeiro
  bloqueio. 33 fichas ficaram sem leitura.
- **O navegador embutido não grava arquivo em disco** quando a página não oferece download. Google, Trends, YouTube,
  Mercado Livre e Clarity entraram como texto gravado pela sessão, não como captura byte a byte.
- **Download abre janela de confirmação para o Bruno** e todo export do Search Console sai com o mesmo nome.
- **Login no meio da sessão.** Bing e Clarity não estavam logados; o Bruno entrou durante a coleta. Uma navegação da
  sessão caiu na aba que ele tinha aberto.
- **Fuso no Git Bash do Windows.** `TZ=America/Sao_Paulo date` devolve UTC; o que funciona é `TZ=UTC+3 date`. Duas
  pastas nasceram com a hora errada e foram renomeadas antes de qualquer registro.
- **Documentos do vault atrasados.** O roteiro e o dossiê falavam em briefings; os seis artigos estavam no ar. A
  cobertura só ficou certa porque o estado foi conferido no site.
- **`cobertura.csv` sem ligação com o catálogo**, porque as etapas 2 e 4 rodaram ao mesmo tempo.

### Mudanças propostas, ainda não aplicadas

Ficam para depois da etapa 5 e da revisão, para o formato não mudar com a análise em andamento.

| Onde | Proposta | Origem |
|---|---|---|
| `FORMATOS.md`, catálogo | Lista com `\|` em `coleta_id` e `evidencia`; colunas `ids_fonte_alternativos`, `preco_de_ref` e `campanha` (ou tipo `oferta`); convenção para kit misto | etapa 2 |
| `FORMATOS.md`, sinais | Colunas `titulo`, `consulta_origem` e `posicao`; convenção para sinal sem coleta; localizadores `#item=N` e `#lista-vazia` | etapa 3 |
| `FORMATOS.md`, nossos dados | Coluna `filtros`; como escrever uma chave que é filtro; estado para "ausente de um relatório completo" | etapa 4 |
| `FORMATOS.md`, cobertura | Colunas `parceiro` e `estado_conferido_em` | etapa 4 |
| `FORMATOS.md`, ids | Mapa estável de `id_fonte` para `entidade_id`, e id de sinal derivado da coleta, antes da segunda rodada de qualquer parceiro | etapas 2 e 3 |
| `PROGRAMA.md` | Dizer se o bruto de um export em zip é o zip, o extraído ou os dois; HTML com dado pessoal fica fora do repositório mesmo abaixo do limite; nome de pessoa física não entra | etapas 2, 3 e 4 |
| `modelos/FONTE.md` | Método "texto da tela gravado pela sessão", com endereço e hora no começo do arquivo; seção "Conferência dos arquivos" | etapas 3 e 4 |
| Roteiro | 3 a 5 segundos entre páginas HTML, no máximo 30 pedidos por minuto, parar no primeiro 429; aba própria do navegador com `tabId`; mover cada export antes do seguinte; resumo estruturado do Google para toda consulta e página inteira só para a que virar recomendação; Instagram e vídeo curto como fonte quando a marca vive de criadoras | etapas 2, 3 e 4 |
| Ordem das etapas | A cobertura depende do catálogo: rodar a parte de cobertura depois da etapa 2, ou ligar as entidades na etapa 5 | coordenação |

### Vale para os outros parceiros?

Sim, quase tudo. O que é próprio da L'Amazonie: feed da Shopify (a BAW roda em outra plataforma), parceria sem dado
próprio por ter um dia de idade e catálogo pequeno.

Modelo de registro:

```markdown
## <data> · <parceiro> · etapa <n>

- **O que aconteceu:**
- **O que mudou** (arquivo e seção):
- **Vale para os outros parceiros?**
```
