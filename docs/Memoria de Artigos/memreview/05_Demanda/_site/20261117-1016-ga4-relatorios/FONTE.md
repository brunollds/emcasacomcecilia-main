# FONTE: 20261117-1016-ga4-relatorios

| Campo | Valor |
|---|---|
| Coleta | `20261117-1016-ga4-relatorios` |
| Início e fim | `2026-11-17T10:16:00-03:00` a `2026-11-17T10:20:00-03:00` |
| Sessão responsável | Demanda L'Amazonie, etapa 4 (Claude Fable 5.2, no navegador embutido do app, com as contas já logadas pelo Bruno) |
| Fonte | Google Analytics 4 |
| Endereço ou relatório | Relatórios > Engajamento > Páginas e telas (dimensão Caminho da página e classe da tela); Aquisição > Aquisição de tráfego (Grupo principal de canais da sessão); Engajamento > Eventos |
| Método | Compartilhar este relatório > Baixar o arquivo > Baixar o CSV, no navegador embutido |
| Propriedade ou loja | Conta emcasacomcecilia (337406272), propriedade Emcasacomcecilia (468316875). A conta tem outras duas propriedades (damie.emcasacomcecilia.com e mk.emcasacomcecilia.com), que não foram coletadas |
| País, idioma, moeda | Todos os países e idiomas; receita em BRL (sempre zero) |
| Período dos dados | 2026-08-16 a 2026-11-15 nos três relatórios principais (o mesmo do Search Console); 2026-11-16 a 2026-11-17 no arquivo `ga4-paginas-e-telas-16a17nov.csv` |
| Filtros | Nenhum (Todos os usuários) |
| Paginação | `@nao-se-aplica`: o CSV traz as linhas do relatório, não só as 10 da tela |
| Cobertura | `completa` para os relatórios pedidos (500 caminhos de página, 6 canais, 19 eventos) |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `ga4-aquisicao-de-trafego.csv` | 1135 | `cb14cf3e8044c7ec9a56f6dd4cc24f9412e3848ff87db93a238cf8624055c73e` | repositório |
| `ga4-eventos.csv` | 1067 | `b927daf06719d5aaa53ae0303cc3b4c2cc157954b1b5f38bbace86577a3bab5d` | repositório |
| `ga4-paginas-e-telas-16a17nov.csv` | 4494 | `f7e528b9488a34c0f5a73b39144dc8e59e5876938e08ace789d2c0fe208c30cb` | repositório |
| `ga4-paginas-e-telas.csv` | 31122 | `7d706447bcca953f5f72afef466188c6677add4fdae1f0037e739c738c3eb3a8` | repositório |

## Falhas e lacunas

- Nenhum caminho com "lamazonie" em nenhum dos dois arquivos de páginas. No de 16 e 17/11 isso quer dizer que o GA4
  não registrou visualização com consentimento até as 10:20 de 17/11, com o dia 17 pela metade e os dois dias ainda
  em processamento.
- Sem relatório de página de destino nem de origem por página: o pedido era páginas e origem do site.

## Observações

### Conferência de eventos em dobro

A lembrança da sessão de pautas era de eventos em dobro no GA4 em 05/11/2026, sem evidência guardada. O que os
arquivos desta coleta mostram, de 16/08 a 15/11/2026:

| Medida | Valor | Onde |
|---|---|---|
| `first_visit` | 5.083 eventos para 2.543 usuários (2,00 por usuário) | `ga4-eventos.csv` |
| `session_start` | 6.248 eventos para 2.550 usuários | `ga4-eventos.csv` |
| Sessões | 3.173 (soma dos seis canais) | `ga4-aquisicao-de-trafego.csv` |
| `page_view` | 11.122 eventos, igual às Visualizações do relatório de páginas | `ga4-eventos.csv` |

O `first_visit` deveria acontecer uma vez por usuário e veio com exatamente o dobro. O `session_start` tem 1,97
evento por sessão. São sinais de que a tag dispara duas vezes pelo menos nesses eventos automáticos. Esta coleta não
separa por dia, então não diz quando a duplicação começou nem se já parou; também não prova que o `page_view` e os
eventos de cupom estão em dobro (a proporção deles não tem um valor esperado). Leitura para o piloto: contagem de
eventos e de visualizações do GA4 não serve como número absoluto; a comparação entre páginas e entre canais continua
útil.

### Outras ressalvas

- O GA4 só carrega com o aceite no aviso de cookies e em host liberado (`src/lib/consent.ts`): mede uma parte das
  visitas, não todas.
- O canal "AI Assistant" aparece com 295 sessões no período.
- O nome dos arquivos foi trocado ao guardar; o conteúdo é o do export, com o cabeçalho de comentários do GA4.

## Conferência dos arquivos (17/11/2026, 10:36, depois do aviso do Bruno)

Cada arquivo foi identificado pelo cabeçalho de comentários que o GA4 escreve (relatório, propriedade e datas).

| Arquivo guardado | Nome com que chegou a Downloads | Cabeçalho do arquivo | Linhas de dados | Linha conhecida | Confere? |
|---|---|---|---|---|---|
| `ga4-paginas-e-telas.csv` | `Páginas_e_telas_Caminho_da_página_e_classe_da_tela.csv` | Páginas e telas: Caminho da página; Emcasacomcecilia; 20260816 a 20261115 | 500 | `/` com 2.969 visualizações, como na tela | Sim |
| `ga4-aquisicao-de-trafego.csv` | arquivo temporário do navegador (`.tmp`); depois de confirmado, `Aquisição_de_tráfego_Grupo_principal_de_canais_da_sessão_(Grupo_de_canais_padrão).csv` | Aquisição de tráfego; Emcasacomcecilia; 20260816 a 20261115 | 6 | Organic Search com 1.564 sessões, como na tela | Sim |
| `ga4-eventos.csv` | `.tmp`; depois `Eventos_Nome_do_evento.csv` | Eventos: Nome do evento; Emcasacomcecilia; 20260816 a 20261115 | 19 | `page_view` com 11.122, igual às Visualizações | Sim |
| `ga4-paginas-e-telas-16a17nov.csv` | `.tmp`; depois `Páginas_e_telas_Caminho_da_página_e_classe_da_tela.csv` | Páginas e telas: Caminho da página; Emcasacomcecilia; 20261116 a 20261117 | 75 | `/` com 66 visualizações | Sim |

- **Arquivo errado, pego e trocado na hora:** o primeiro arquivo que guardei como aquisição era um export antigo, de
  mesmo nome, que já estava em Downloads desde 07/11/2026 (datas 20261010 a 20261106 no cabeçalho). O export desta
  coleta ainda esperava a confirmação de salvar. O antigo voltou para Downloads com o nome original e o certo foi
  guardado aqui. O `nossos-dados.csv` só foi gerado depois da troca.
- Os dois arquivos de páginas chegaram com o mesmo nome; o que os separa é a data do cabeçalho.
- As cópias que ficaram em Downloads depois da confirmação do Bruno foram comparadas byte a byte com estas: iguais.
  Tamanhos e SHA-256 recalculados: os mesmos da tabela de arquivos.
