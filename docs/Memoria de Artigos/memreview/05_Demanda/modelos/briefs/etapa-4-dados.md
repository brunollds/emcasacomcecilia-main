## Papel: etapa 4, dados do parceiro (4A) e cobertura (4B)

4A pode começar junto com a etapa 2; 4B só depois que o `catalogo.csv` está na `main`.

### 4A. Dados e comercial

1. Parta do snapshot mais recente de `_site/` (`_site/README.md`). Não refaça o export do site inteiro.
2. Recorte o parceiro em `2-processado/nossos-dados.csv` (FORMATOS, seção 4). Se o parceiro não aparece no export
   geral, faça o recorte dirigido (filtro de consulta e de página) como coleta nova, em `_site/<coleta-id>/` se servir a
   outras lojas, ou em `1-bruto/` se for só dele.
3. `comercial.csv`: painel do parceiro, se houver; sem painel, `@indisponivel` com o motivo.
4. Consultas manuais de IA, se a orientação pedir: o formato da seção 4 do `PROGRAMA.md`, em `1-bruto/<coleta-id>/`.

### 4B. Cobertura

5. Tudo o que já existe sobre o parceiro e as perguntas da orientação: artigos (`content/reviews/`), página de cupom,
   guias, vídeos, briefings e rascunhos do vault, com `estado` e `estado_conferido_em` (no site, no repositório ou na
   Fila).
6. Cada linha com `entidades` do catálogo; a página da loja inteira aponta para a entidade `marca`.

Edita: as coletas que fizer, o gerador, `nossos-dados.csv`, `comercial.csv`, `cobertura.csv`, `relatos/etapa-4.md`.
