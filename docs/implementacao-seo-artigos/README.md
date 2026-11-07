# Implementação da auditoria SEO dos artigos

Controle da implementação das sugestões da [auditoria SEO](../auditoria-seo-2026-11-06/README.md), da [fila unificada](../analise-busca-export-2026-11-07/FILA-UNIFICADA.md) e dos relatórios de lote do [diretor](../DIRETOR-REVISAO-SEO-ARTIGOS.md). É o único controle de implementação: a auditoria de copy registra a cobertura dela em `docs/auditoria-copy-artigos/` e não atualiza este.

## Como funciona

- O trabalho sai em quatro Macro-PRs, um deploy no fim de cada:
  1. Itens com prazo, releitura de Black Friday e o lote 9 do diretor.
  2. Famílias de 10 idiomas da YesStyle e da SHEIN.
  3. Famílias da Hostinger e o cluster de suplementos, alimentos e café.
  4. Moda, casa, beleza e serviços, e a lista final das confirmações pendentes.
- Ao abrir um artigo, entram de uma vez os achados alta e média já comprovados. Confirmação pendente só entra com a prova.
- Quem faz o quê:
  - Sonnet edita por grupo de loja.
  - Outro Sonnet revisa o diff de cada bateria.
  - O Fable revisa o Macro-PR no fechamento.
  - Claude confere os fatos e roda os gates: os rápidos entre baterias, o build e o `test:build-output` no fechamento.
- Regras que valem sobre os relatórios:
  - A data aparece uma vez, na frase acima da tabela.
  - Estoque vira "confira na loja", sem acompanhamento.
  - Ressalva legal em no máximo uma frase, sem citar o guia do Procon.
  - Nenhum título ou slug muda sem o OK do Bruno.
- Estados de cada lote: aplicado local, validado, PR/merge, publicado. Cada um tem a sua evidência.

## Recibos

| Macro-PR | Recibo | Estado |
|---|---|---|
| 1 | [macro-1.md](macro-1.md) | publicado: #692, release `59d768d7` (07/11) |
| 2 | [macro-2.md](macro-2.md) | validado (build ok), aguardando PR |
