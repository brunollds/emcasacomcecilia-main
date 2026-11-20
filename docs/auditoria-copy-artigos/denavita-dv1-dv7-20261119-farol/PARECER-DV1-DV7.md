# Parecer editorial · Denavita, DV1 a DV7

Revisão do [PR #1259](https://github.com/brunollds/emcasacomcecilia-main/pull/1259), já mesclado. Os sete JSONs do merge `59e907c6` são idênticos aos do commit revisado, `0bc837ba`. O [texto integral proposto](LEITURA-DV1-DV7.md) e o [diff](DV1-DV7.diff) partem dessa base.

**Veredito.** As sete pautas têm utilidade própria. Eu aplicaria o ajuste de escopo do cupom na DV6 e a revisão do Laranja Moro na DV5 antes do deploy. A DV3 também merece a redação mais precisa sobre CNPJ e Anvisa. Os demais ajustes tornam a série mais fácil de ler e usar.

## Decisões que afetam o lote

- **O que os 10% provam.** Os três carrinhos documentam o desconto em um avulso, numa cesta com três produtos e numa cesta com dois kits. No último, o desconto se manteve ao selecionar Pix. Um carrinho sinalizou “Leve 3, Pague 2”, mas a linha registrada no resumo era a do cupom. Para confirmar o acúmulo, compare a mesma cesta elegível antes e depois do código e registre onde o desconto por quantidade aparece. Apliquei esse critério também a “Compre 2 Leve 3” e “Compre 3 Leve 5”. Consultei a ficha de fatos do vault e o cadastro do cupom. [Página do cupom](https://emcasacomcecilia.com/cupons/denavita)
- **Frete grátis.** O banner anuncia R$ 199,90 com asterisco. O exemplo de R$ 218,70 que cai a R$ 196,83 é um bom teste para saber se o mínimo é calculado após o cupom. Mantive o valor como anúncio da loja e pedi ao leitor para conferir pelo CEP. O exemplo de compra usa subtotal de produtos. [Regras de frete da Denavita](https://www.denavita.com.br/pages/regras-de-frete-gratis)
- **Fórmula e modo de uso.** A ficha principal diz uma cápsula ao dia e a FAQ especifica após a refeição principal. A proposta atribui a informação à Denavita e orienta o leitor a conferir a embalagem. Tratei os 3,6 mg de antocianinas e os 100 mg de ácido clorogênico como quantidades dentro dos extratos. A ficha consultada não informa os miligramas de cafeína. Retirei “suporte à gestão de peso” e a frase comercial sobre o cromo. O guia fica centrado no que o leitor consegue comparar na composição e no preço. [Ficha do Laranja Moro](https://www.denavita.com.br/products/laranja-moro-cafe-verde-e-cromo-30-caps) · [Composição detalhada](https://www.denavita.com.br/pages/laranja-moro-anaeliza) · [Orientação da Anvisa sobre publicidade de suplementos](https://www.gov.br/anvisa/pt-br/assuntos/alimentos/suplementos-alimentares/cuidado-com-a-propaganda-enganosa)
- **Reputação e identidade.** As duas capturas web apresentam indicadores diferentes para maio a outubro, inclusive notas 8,4 e 8,5. Mantive 8,5 e os demais indicadores juntos, como leitura de 19/11, e retirei o ranking. Os 46,18% de atrasos pertencem à classificação das reclamações da aba geral, com horizonte de até três anos. Na DV3, a conferência dos dígitos dá `-76` para a filial e `-95` para a matriz. O rodapé do site exibe `-78`. O artigo identifica a origem de cada número. A situação cadastral da filial vem da consulta registrada no vault. [Perfil no Reclame Aqui](https://www.reclameaqui.com.br/empresa/denavita/) · [Lista de reclamações](https://www.reclameaqui.com.br/empresa/denavita/lista-reclamacoes/) · [Consulta cadastral da Receita Federal](https://www.gov.br/pt-br/servicos/consultar-cadastro-nacional-de-pessoas-juridicas)
- **Anvisa e devolução.** A DV3 orienta como consultar pelo dado da embalagem. Para declarar a situação de um SKU, é preciso ler o identificador e conferir a consulta correspondente. Para desistência de compra online, o texto cita os sete dias corridos do CDC e indica o portal de troca. As condições da loja para problemas com o produto aparecem separadas. [Consulta de suplementos na Anvisa](https://www.gov.br/anvisa/pt-br/assuntos/alimentos/suplementos-alimentares/como-saber-se-um-suplemento-alimentar-e-autorizado) · [Art. 49 do CDC](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm#art49)

## Proposta por artigo

| Artigo | O que a proposta entrega |
| --- | --- |
| **DV1 · Como usar** | Mostra onde copiar EMCASA e como verificar o desconto antes do CPF. Os três carrinhos e o print provam o que aconteceu nos pedidos testados. |
| **DV2 · Reclame Aqui** | Abre pela nota e pelo tamanho da amostra. Separa os indicadores do semestre dos tipos de queixa da aba geral e fecha com o que guardar se o pedido atrasar. |
| **DV3 · É confiável?** | Explica a divergência do rodapé, aponta a consulta da Anvisa e dá o caminho para conferir entrega e solicitar devolução. |
| **DV4 · Primeira compra** | A resposta rápida dá código, desconto, link para copiar e campo do checkout. A apresentação da loja leva ao guia de confiança. O FAQ responde diretamente “Qual é o desconto na primeira compra da Denavita?”. |
| **DV5 · Laranja Moro** | Abre com a fórmula e o custo por dia. Dá R$ 2,56 sem cupom e R$ 2,31 com EMCASA no avulso. Na oferta por quantidade, R$ 1,71 com três e R$ 1,54 com cinco, antes de eventual cupom e frete. A FAQ responde sobre cafeína e modo de uso com o alcance da ficha. |
| **DV6 · Black Friday** | A meta e a resposta rápida dizem o que foi testado. A tabela mantém separados o preço anunciado pela loja e os três casos de desconto comprovado. |
| **DV7 · É boa?** | Organiza seis opções por fórmula, formato e custo. A tabela cabe em quatro colunas e mantém preço do pote, com e sem o código, e custo por dia. O texto identifica quando o preço unitário muda pela quantidade. |

## Imagens

Conferi as sete capas e oito fotos novas do corpo. As propostas preservam as capas e o checkout documentado no #1256. Retirei da DV2 a foto de produto, que interrompia a leitura dos indicadores. Se houver uma captura legível com os dados da mesma leitura, ela cabe ao lado da tabela. Para DV3 e DV5, uma foto do verso do produto seria mais informativa que outro packshot, desde que identificador e ingredientes estejam legíveis. Na DV6, trocaria a chamada da capa para **“Ofertas e kits / Cupom EMCASA”** se houver nova arte. Assim, a capa evita sugerir que os 10% entram em qualquer oferta da campanha.

## Verificação e aplicação

- Sete propostas JSON, com os links relativos de cupom preservados ou incluídos. Conferi a normalização, a prosa, os snippets, a extensão das respostas rápidas e dos subtítulos, os links, os arquivos de imagem referenciados e 24 linhas de cálculo.
- O [diff](DV1-DV7.diff) passa em `git apply --check` sobre a base revisada. Confira os [hashes da base](BASE-SHA256.txt) se aplicar depois de outras alterações. Esta entrega é local. O build da árvore com as propostas aplicadas fica para a integração.
- A revisão usa os três carrinhos registrados. A combinação das ofertas por quantidade e o piso do frete após o desconto seguem sem confirmação em carrinho. Recomendo reler DV2 e DV3 no dia do deploy se a consulta de 19/11 estiver desatualizada, em especial após 01/12. O reteste do cupom em 01/12 fica como registrado no handoff.
