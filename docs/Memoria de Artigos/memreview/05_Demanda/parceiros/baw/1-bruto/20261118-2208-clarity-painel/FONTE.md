# FONTE: 20261118-2208-clarity-painel

| Campo | Valor |
|---|---|
| Coleta | `20261118-2208-clarity-painel` |
| Início e fim | `2026-11-18T22:08:00-03:00` a `2026-11-18T22:11:00-03:00` |
| Sessão responsável | Demanda BAW, etapa 4 (Claude Opus 5.5, no navegador embutido do app, com a conta logada pelo Bruno antes da coleta, em 18/11) |
| Fonte | Microsoft Clarity |
| Endereço ou relatório | Painel do projeto: `https://clarity.microsoft.com/projects/view/r8u956l333/dashboard?date=Last 3 days&URL=2;4;<endereço>` (URL visitada é exatamente), um por página da BAW |
| Método | O painel não tem export de CSV. O texto do painel foi lido com a ferramenta de texto do navegador (`get_page_text`) e gravado num `.txt` por página, com o endereço do painel e a hora (UTC) nas duas primeiras linhas e uma linha `---` antes do texto. Os painéis com sessão foram gravados com o texto lido; os seis com zero sessão, por um modelo com o texto dos painéis vazios em que só muda o endereço, gravado depois de ler cada painel e conferir que o texto era o mesmo. A hora de cada arquivo é a da gravação, segundos depois da leitura |
| Propriedade ou loja | Projeto "Em Casa com Cecilia" (`r8u956l333`) |
| País, idioma, moeda | Todos os países e idiomas; `@nao-se-aplica` para moeda |
| Período dos dados | "Últimos 3 dias" do Clarity em 18/11/2026, 22:08 a 22:10 (de 2026-11-16 a 2026-11-18, contando o dia da leitura, como na leitura de 90 dias de `_site/20261117-1023-clarity-painel/`) |
| Filtros | URL visitada é exatamente igual a cada uma das 8 páginas: `/cupons/baw`, `/reviews/loja/baw` e os seis artigos (`cupom-baw-como-usar`, `black-friday-baw`, `baw-clothing-reclame-aqui-nota-reputacao`, `baw-clothing-e-confiavel`, `cupom-baw-primeira-compra`, `baw-clothing-e-boa`) |
| Paginação | `@nao-se-aplica` |
| Cobertura | `parcial`: só os números agregados do painel. Gravações, mapas de calor e perfil de visitante não foram abertos nem copiados |
| Modalidade | `texto-extraido` |
| Export | `@nao-se-aplica` |
| Cadastro lido | `@nao-se-aplica` |
| Bloqueio | Nenhum |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `clarity-cupons-baw-3d.txt` | 2020 | `c5dd1dd4ebc93cd2d145517980045fb511446135fe0c4deaf62b7fdeb4ac1635` | repositório |
| `clarity-cupom-baw-como-usar-3d.txt` | 1665 | `9c3f902975df361db262f7ff67549e9885327874c90f1390a165b915cb0316de` | repositório |
| `clarity-black-friday-baw-3d.txt` | 1659 | `01e069efb7eaddb3ce93b7c4557c213ed5bc013bf72f51cb63c9a508ade65ea6` | repositório |
| `clarity-baw-clothing-reclame-aqui-nota-reputacao-3d.txt` | 1707 | `410ac3c4ff02a928b7e416776e211533a73848fda36bd745974bbbf017a85e8e` | repositório |
| `clarity-baw-clothing-e-confiavel-3d.txt` | 1675 | `648e193c8d3f929fe0bdb03539a10f436b389292796ffc2b26252222decc0236` | repositório |
| `clarity-cupom-baw-primeira-compra-3d.txt` | 2062 | `479a310a44a767d566218a9d6174837bb4da91bf5f4abc60047501ac3833c61c` | repositório |
| `clarity-baw-clothing-e-boa-3d.txt` | 1663 | `a7e1fe20624c8bbce289323c19f4c63b255266dfbfb6555c919153756f6cc8ec` | repositório |
| `clarity-reviews-loja-baw-3d.txt` | 1645 | `316d8dd59550c3f2d271f88b5773eaf13b0a868760351af271c20a8a77bddb32` | repositório |

## O que os painéis mostram

| Página | Sessões | Usuários únicos | Páginas por sessão | Rolagem | Tempo ativo |
|---|---|---|---|---|---|
| `/cupons/baw` | 1 | 1 | 4 | 74,25% | 7,6 min |
| `/reviews/cupom-baw-primeira-compra` | 2 | 1 | 3 | 75% | 3,9 min |
| As outras seis | 0 | 0 | 0 | 0% | 0 |

Nas duas páginas com sessão, o visitante usou o Edge num computador, no Brasil, e chegou pelo próprio site
(referenciador `emcasacomcecilia.com`); "Retornos rápidos" em 100% das sessões. A lista de páginas da sessão da
`/cupons/baw` tem também a home e a `/reviews/cupom-baw-primeira-compra`. O GA4 da mesma noite
(`20261118-2152-recorte-dirigido`) mostra as mesmas duas páginas, com 1 usuário cada.

## Falhas e lacunas

- **Espaço no fim da linha.** Os dois arquivos com sessão foram gravados primeiro sem os espaços que o painel traz no
  fim de duas linhas ("Últimos 3 dias " e ": "); antes do commit, os espaços foram repostos para o texto ficar como
  o lido e como os outros seis. Os SHA-256 da tabela são os de depois do ajuste.
- **Sem o dia de cada sessão.** O painel soma os três dias.
- **Pode ser a equipe.** Um visitante por página, vindo do próprio site, num computador: o painel não diz quem é, e
  nenhum perfil foi aberto para saber.

## Observações

- O Clarity só carrega com o aceite no aviso de cookies: mede uma parte das visitas.
- Nenhuma gravação, identificador de visitante ou perfil foi aberto ou copiado. O texto do painel traz o resumo do
  "usuário principal" (número de sessões, país e tipo de aparelho), que é o que o painel mostra a todos.
- Nenhuma configuração do projeto foi alterada; o filtro de URL e o período foram só de visualização.
