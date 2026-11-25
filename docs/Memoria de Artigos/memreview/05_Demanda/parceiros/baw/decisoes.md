# Decisões e mudanças de escopo: BAW Clothing

Uma entrada por mudança durante a rodada (`FORMATOS.md`, seção 6): data e hora, quem decidiu, o que valia antes, o que
vale agora, a quem foi avisado e quando a sessão confirmou a leitura.

## 2026-11-18 · Bruno · fluxo v2 e piloto

- **Antes:** a BAW era o segundo piloto, sem fluxo definido.
- **Agora:** a BAW roda no fluxo v2, com as opções recomendadas da `PROPOSTA-FLUXO-V2.md` ("Sim, aplicar").
- **Avisado:** nenhuma sessão aberta ainda.

## 2026-11-24 18:00 · Bruno · releitura da vitrine da Black Friday

- **Antes:** a etapa 3 tinha entregado (#1184) com a lacuna da P3: reler a `/blackfriday` entre 23 e 25/11, "coordenação
  abre a coleta; pode ser esta sessão".
- **Agora:** a mesma sessão faz a releitura numa coleta nova, numa branch nova a partir da `main`, e mexe só nos
  arquivos dela (coleta, gerador, `sinais.csv`, `resumo-sinais.md` e relato).
- **Avisado:** mensagem 3 da coordenação à sessão da etapa 3, em 24/11 às 18:00; o turno dela começou com a mensagem.
  Confirmação de leitura: em 24/11 às 18:12 ("Li a mensagem 3"), antes de agir.

## 2026-11-25 00:20 · Bruno · cobertura nova (turno complementar da 4B)

- **Antes:** a cobertura de 18/11 (#1140) tinha 64 linhas sobre 6 artigos e o `/cupons/baw`. No fechamento de 24/11, a
  parte 4B do gerador parou, porque o grupo de artigos mudou (#1310, #1339, #1397, #1402 e #1408).
- **Agora:** a sessão da etapa 4 refaz o `cobertura.csv` para os 11 artigos e o `/cupons/baw`, com o gerador lendo os
  artigos num commit fixo, registrado no relato. P1 (tênis) e P2 entram como executadas pela BW7 e pela BW10.
- **Avisado:** mensagem 4 da coordenação à sessão da etapa 4, em 25/11 às 00:20; o turno dela começou com a mensagem.
  Confirmação de leitura: em 25/11 às 00:21 ("Li a mensagem 4"), antes de agir.
