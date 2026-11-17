# FONTE: 20261117-1848-checkout-oferta-bf

| Campo | Valor |
|---|---|
| Coleta | `20261117-1848-checkout-oferta-bf` |
| Início e fim | `2026-11-17T18:48:00-03:00` a `2026-11-17T18:52:00-03:00` (o resumo com o cupom foi lido às 18:51:52) |
| Sessão responsável | Pesquisa de pautas, como coordenação (Claude Fable 5.2), a pedido do Bruno |
| Fonte | Loja oficial da L'Amazonie: página da oferta e checkout próprio |
| Endereço ou relatório | `https://www.lamazonie.com.br/products/bf-serum-sobrancelhas-protetor-gratis` e `https://seguro.lamazonie.com.br/checkout` |
| Método | Navegador embutido, sem login: abrir a página, "adicionar ao carrinho", "finalizar compra" na gaveta, digitar `CECILIA` em "Tem um cupom?" e clicar em "Adicionar". Texto da tela gravado pela sessão (o navegador não salva arquivo). Nenhum dado pessoal digitado; pedido não finalizado |
| Propriedade ou loja | `www.lamazonie.com.br` e `seguro.lamazonie.com.br` |
| País, idioma, moeda | BR, pt-BR, BRL |
| Período dos dados | Estado da página e do checkout no momento da leitura |
| Filtros | Nenhum |
| Paginação | @nao-se-aplica |
| Cobertura | `parcial`: uma oferta (`cat-lamazonie-0046`), uma unidade, só a etapa de identificação do checkout. Frete e pagamento não foram abertos (pedem dados pessoais) |

## Arquivos

| Caminho | Bytes | SHA-256 | Guardado em |
|---|---|---|---|
| `pagina-oferta.txt` | 846 | `c4e9d4d7aab6542f14bffcf51653715f4e0dc847c56b560aa523c64ff7798c02` | repositório |
| `carrinho.txt` | 340 | `e338393ceafb6d36d6a857e1ff2161a9949e7cc2a7054ccbb40ac95e89e0af1f` | repositório |
| `checkout-resumo.txt` | 1006 | `cc04fab8872a3331fe933eb5b0880c455ce4c56c21e2c9ffb12cb2ad37ebd04b` | repositório |

## Resultado

O código `CECILIA` foi aceito na oferta de Black Friday "Sérum para Crescimento de Cílios e Sobrancelhas + Protetor
Solar Incolor FPS 99 Grátis": produtos R$ 159,00, desconto de R$ 7,95 (5%), total R$ 151,05, com a mensagem "Cupom
adicionado.".

## Falhas e lacunas

- Não é captura byte a byte: é o texto da tela, gravado pela sessão. Não houve print (a captura de tela do navegador
  falhou por tempo).
- A página da oferta não mostra data de fim. O "Até 26/11" está só no anúncio do Google resumido em
  `20261117-1043-google-serp/serp-01-serum-l-amazonie-resenha.txt`.
- O anúncio do Google não foi aberto: a página foi acessada pelo endereço do produto no feed. Continua sem captura o
  destino do anúncio.
- Não foi testado: mais de uma unidade, as outras sete ofertas `bf-`, a soma com o Pix (3%) e com o cashback, e o
  frete.

## Observações

- A página é pública: abre sem login pelo endereço direto.
- O checkout mostrava "15% de cashback para a próxima compra" e "Você ganhou 3% de desconto pagando com Pix" antes e
  depois do cupom.
- Atende a `op-lamazonie-0027` e alimenta a `op-lamazonie-0007` (guia de Black Friday).
