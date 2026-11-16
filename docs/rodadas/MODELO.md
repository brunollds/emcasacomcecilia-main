# Rodada de testes de cupom: <mês>/<ano>

Copie este arquivo para `docs/rodadas/AAAA-MM.md` no dia 1 e preencha durante a rodada. Regras em
`docs/MANUTENCAO-MENSAL.md`, seção "Rodada mensal de testes". O arquivo vira o corpo do PR da rodada.

- Início: <dd/mm/aaaa>
- Fim: <dd/mm/aaaa>
- Tempo gasto: <horas>
- Fila: primeiro as lojas do aviso de 45 dias do `npm run test:coupon-offer-modes` (cole a lista abaixo);
  depois as outras.

Aviso de 45 dias no início da rodada:

```
<saída do aviso>
```

## Lojas de código

Uma linha por loja testada. Preço em reais, como aparece no carrinho; "Resultado" é `aceito` ou
`não aceito`. Sem login, sem cadastro e sem finalizar compra.

| Loja (slug) | Data | Produto | Antes do código | Depois do código | Resultado | CEP | O que mudou na página |
|---|---|---|---|---|---|---|---|
| `exemplo` | dd/mm | Nome do produto, variante | R$ 0,00 | R$ 0,00 | aceito | 00000-000 | nada / campo alterado |

## Mecânica própria

SHEIN, Magalu, Lejour, Hostinger, YesStyle, Temu e AliExpress: o que foi conferido em cada uma.

| Loja (slug) | Data | O que foi conferido | Resultado | O que mudou na página |
|---|---|---|---|---|
| `exemplo` | dd/mm | link, código de busca, campanha | ok | nada |

## Pendências

Lojas que ficaram com a data antiga (site bloqueado, carrinho que falhou, leitura que não fechou) e o motivo.

- `exemplo`: motivo

## Handoffs

Mudança de regra que afeta artigo, enviada à sessão de artigos.

- nenhum
