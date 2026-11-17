# FONTE: 20261117-1023-clarity-painel

| Campo | Valor |
|---|---|
| Coleta | `20261117-1023-clarity-painel` |
| Início e fim | `2026-11-17T10:22:00-03:00` a `2026-11-17T10:27:00-03:00` |
| Sessão responsável | Demanda L'Amazonie, etapa 4 (Claude Fable 5.2, no navegador embutido do app, com as contas já logadas pelo Bruno) |
| Fonte | Microsoft Clarity |
| Endereço ou relatório | Painel do projeto: `https://clarity.microsoft.com/projects/view/r8u956l333/dashboard`, com `?date=Last 30 days` ou `?date=Last 90 days` e, nos recortes, `&URL=2;4;<endereço>` (URL visitada é exatamente) |
| Método | Navegador embutido. O painel não tem export de CSV: o texto visível de cada painel foi gravado em `.txt` pelo próprio navegador (o endereço e a hora da leitura vão nas duas primeiras linhas) |
| Propriedade ou loja | Projeto "Em Casa com Cecilia" (`r8u956l333`) |
| País, idioma, moeda | Todos os países e idiomas; `@nao-se-aplica` para moeda |
| Período dos dados | Últimos 30 dias (2026-10-19 a 2026-11-17) e últimos 90 dias (2026-08-20 a 2026-11-17, mas só há dados desde o começo de outubro) |
| Filtros | Site inteiro sem filtro; quatro recortes com URL visitada exatamente igual a `https://emcasacomcecilia.com/cupons/lamazonie`, `/cupons/simple-organic`, `/cupons/skelt` e `/cupons/yesstyle` |
| Paginação | `@nao-se-aplica` |
| Cobertura | `parcial`: só os números agregados do painel. Gravações e mapas de calor não foram abertos nem copiados |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `clarity-cupons-lamazonie-30d.txt` | 1694 | `2c15a7cbce357255ab048642bffe8f01db59c455e749fcf01b19f52f6236987d` | repositório |
| `clarity-cupons-lamazonie-90d.txt` | 1690 | `27441f53a9cd0d2318a9963dd4af13fac1593c0cc188b2520c2944131d27f30b` | repositório |
| `clarity-cupons-simple-organic-30d.txt` | 2240 | `3740a31869e82f3cf81d6b1aea6080701eff4bbde27dc032ab9ca0797717d6b3` | repositório |
| `clarity-cupons-simple-organic-90d.txt` | 2240 | `3617207f05266f571f3601adaee2326e441b19c49e9f1a82aac0482ea4a1aa54` | repositório |
| `clarity-cupons-skelt-30d.txt` | 2203 | `dab2f7c74f0c78182c4f764d8e8dedc7f15675eb98228a427ce3cbf6b1a838c2` | repositório |
| `clarity-cupons-skelt-90d.txt` | 2203 | `35ace6ed182feb1c13a09080975124629b739d73314114a270da3f6103a73539` | repositório |
| `clarity-cupons-yesstyle-30d.txt` | 2396 | `a003decc8c56e2e4e57b57befa22eed2da03c598632c85ffba9a145f18255093` | repositório |
| `clarity-cupons-yesstyle-90d.txt` | 2714 | `88d7d523f3797a8deafdbdc87dfe766f884a1ab10881e534bdddd3c791b6bad0` | repositório |
| `clarity-site-30d.txt` | 3540 | `6d39c0006e25796d470420c99fc9aac06aa396f2d3a046429241d9e6fead0a96` | repositório |
| `clarity-site-90d.txt` | 3561 | `386a6fe6bff30b19afa9e7de00c334299190d7fcbf7d89f69017de254f00949c` | repositório |

## Falhas e lacunas

- `/cupons/lamazonie`: zero sessões em 30 e em 90 dias. A página entrou no ar em 16/11/2026, um dia antes da coleta.
- Sem recorte para os artigos das lojas; só as quatro páginas de cupom.
- O dia exato da primeira sessão gravada não foi isolado (ver abaixo).

## Observações

### Desde quando há dados

A lembrança da sessão de pautas era de que o Clarity só grava de verdade desde 08/10/2026. O painel do site inteiro
mostrou, em 17/11/2026:

| Período pedido | Sessões | Sessões de robô excluídas |
|---|---|---|
| Últimos 90 dias | 2.122 | 386 |
| Últimos 45 dias (desde 04/10) | 2.122 | 383 |
| Últimos 40 dias (desde 09/10) | 2.111 | 359 |
| Últimos 30 dias (desde 19/10) | 1.811 | 19 |

Noventa e 45 dias dão o mesmo total: não há sessão antes de 04/10/2026. Entre 04/10 e 08/10 há só 11 sessões de gente
e 24 de robô; o volume começa de 09/10 em diante. Isso bate com a lembrança de 08/10 como início das gravações reais,
agora com números. Os valores de 45 e 40 dias foram lidos na tela e não têm arquivo. As gravações em si ficam 30 dias
no Clarity.

### Outras ressalvas

- O Clarity só carrega com o aceite no aviso de cookies: mede uma parte das visitas.
- Os números por página são pequenos (2, 6 e 12 sessões em 90 dias): servem como observação, não como taxa.
- O texto dos painéis traz um resumo do "usuário principal" (número de sessões, país e tipo de aparelho), que é o que
  o painel mostra para todos; nenhuma gravação, identificador de visitante ou perfil foi aberto ou copiado.
- Nenhuma configuração do projeto foi alterada; o filtro de URL e o período foram só de visualização.
