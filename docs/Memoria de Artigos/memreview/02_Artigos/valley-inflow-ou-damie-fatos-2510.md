# Fatos 25/10/2026: Valley, Inflow ou DAMIE

Consultas feitas em 25/10/2026, com `curl -s -A "Mozilla/5.0"`, uma por vez e pelo menos 4 s entre elas. Parada na primeira resposta 403 (Cloudflare). Nada de login, carrinho, formulário, cupom ou link de afiliado.

Arquivos desta pasta: `autocomplete-2510.txt`, `valley-*.html` (páginas lidas), `brasilapi-valley.json`, `inflow-products.json` e `inflow-products-p2.json` (catálogo Shopify), `inflow-trocas.html` (política), `damie-sofa-modular-2510.json` (coleção DAMIE), `parse-valley.pl`.

## 1. Valley (Valley Art LTDA.)

| Fato | Valor | Fonte exata | Status |
|---|---|---|---|
| Razão social e CNPJ | Valley Art LTDA., CNPJ 30.105.567/0001-93 | Rodapé de valleyart.com.br (texto "Valley Art LTDA. CNPJ"); mesmo número no BrasilAPI | Confirmado |
| Cidade, situação, abertura | Hortolândia (SP); ATIVA; início de atividade 04/04/2018 | BrasilAPI `/api/cnpj/v1/30105567000193` (25/10/2026) | Confirmado |
| Porte e regime | Microempresa; Simples Nacional; capital social R$ 1.000 | BrasilAPI (25/10/2026) | Confirmado. Dado público, não usar como argumento |
| CNAE principal | Fabricação de móveis de outros materiais, exceto madeira e metal | BrasilAPI | Confirmado |
| Domínio | Página lida em valleyart.com.br; o JSON de configuração da loja dá `valleymodular.com.br` como domínio canônico (marca "Valley Modular") | HTML da home, objeto `window.merchant` | Confirmado. Citar só em texto, sem link |
| Plataforma | Yampi (tema Rocket). `products.json` não existe, como o brief já dizia | HTML da home (cdn.yampi.io) | Confirmado |
| Nome de pessoa no JSON da loja | Campo de responsável com nome de pessoa física | `window.merchant.company` | Não usar. Regra: sem nome de sócio |
| Produção | "Produzimos para pessoas, não para estoque": produção sob encomenda | `/atendimento/producao-valley` (25/10/2026) | Confirmado |
| Sobre a marca | "Fundada por uma família"; "criar móveis modulares e confortáveis" | `/atendimento/sobre-nos` (25/10/2026) | Confirmado |
| Linhas | Modu (modular, tecido bouclê, 2 e 3 lugares, canto, poltrona, apoio); Mood (sofá-cama, cotelê e bouclê); capas extras | Categoria `/sofa-valley?sort_by=best_sellers` (25/10/2026) | Confirmado |
| Material | "100% espuma, sem madeira nem metal"; espuma D33 Pró, modelo Soft; futons de manta acrílica com flocos de espuma; bouclê 100% poliéster | Página do Modu 3 lugares 2 cantos e do Modu 2 lugares com canto e apoio | Confirmado |
| Como chega | "Chega compactado a vácuo": "desembalou, os módulos expandem e estão prontos para uso, sem montagem" | Mesma página de produto | Confirmado |
| Módulos | Ligados por velcro na parte de baixo; canto 9 kg, meio 7 kg, apoio 5 kg | Idem | Confirmado |
| Medidas (Modu 3 lugares 2 cantos) | 260 cm de largura, 95 cm de profundidade, 73 cm de altura; assento 42 cm | Idem | Confirmado |
| Garantia | 6 meses | Ficha de produto (todas as páginas lidas) e FAQ: "Tem garantia? Sim, 6 meses." | Confirmado |
| Prazo | "Feito sob encomenda": "30 dias úteis" no topo da página; o "prazo de cada cor aparece logo acima do cálculo de frete"; entrega pelo CEP | Páginas de produto e `/atendimento/producao-valley` | Confirmado. Prazo de produção; o frete soma depois |
| Teste em casa | Nenhum período além do CDC, citado como 7 dias | `/atendimento/garantia-devolucoes-e-envios`, primeiro parágrafo de devolução | Confirmado |
| Devolução | "Prazo de 7 (sete) dias, conforme o artigo 49 do CDC"; produto em perfeitas condições, "sem indícios de mau uso e na embalagem original"; a cliente organiza a embalagem e a transportadora retira no mesmo endereço; pedido pelo WhatsApp informado na página | Idem (25/10/2026) | Confirmado. Frete de volta não aparece na página lida |
| Motivos aceitos | Defeito de fabricação; modelo diferente do solicitado; medidas incorretas em relação ao informado | Idem | Confirmado |
| Motivo recusado | "não aceitamos devoluções por variações de tons de cores ou cores pedidas erroneamente pelo cliente" | Idem | Confirmado |
| Caso não previsto | A página não diz o que acontece com o módulo já expandido em caso de devolução dentro dos 7 dias | Idem | [PENDENTE: pergunta 3 do Bruno] |
| Entrega | "As entregas não são agendadas"; dentro do horário comercial (09h às 17h); atrasos por trânsito e clima podem acontecer; transportadora não sobe escada | Idem | Confirmado |
| Frete | Calculado pelo CEP; a página lida não traz regra de frete grátis | Página de produto ("informe o CEP para ver a data de chegada") | Confirmado: sem frete grátis publicado na página lida |
| Pix | 5% à vista (campo "pix" do produto), em 26 ocorrências do JSON da página do 3 lugares | Página de produto do Modu 3 lugares 2 cantos | Confirmado |
| Parcelamento | 10x sem juros na vitrine (campo `installments`) | Categoria (25/10/2026) | Confirmado pela vitrine. Confirmar "sem juros" na página do produto se o texto for citado |
| Reclame Aqui | Nota, selo e período: [PENDENTE: navegador]. Tentativa única com curl em `https://www.reclameaqui.com.br/empresa/valley-art/`: 403 com "Just a moment" (desafio Cloudflare). Parei, sem retentar | Tentativa de 25/10/2026 | [PENDENTE: navegador]. O slug pode ser outro (`valley-modular`); confirmar na busca do Chrome |
| Selo "RA Verificada" | Código de rodapé diz que o selo foi criado em 15/10/2026 e que "some sozinho se a verificação ou o plano caírem" | Comentário no script da home (`valleyart.com.br`) | Pendente de ver no navegador. O selo não é nota |
| Cupons | A página `/atendimento/cupons` existe. Não foi lida nem usada | Menu da loja | Fora do artigo (regra: sem cupom de concorrente) |

### Preços da Valley (vitrine e página de produto, 25/10/2026)

| Produto | Preço no cartão | "De" | À vista (5%) | Parcelado | Garantia | Observação |
|---|---|---|---|---|---|---|
| Sofá 3 lugares com 2 cantos, Modu bouclê (260 cm) | R$ 4.930,00 | R$ 5.820,00 | R$ 4.683,50 | 10x de R$ 493 | 6 meses | Página de produto confirmou 4.930 e 5.820. Uma variante na página aparece a R$ 4.390 (de 5.820) com estoque zero: não usar |
| Sofá 3 lugares com 2 cantos e 1 apoio, Modu bouclê | R$ 5.986,00 | R$ 7.319,00 | R$ 5.686,70 (campo à vista da vitrine) | 10x de R$ 598,60 | 6 meses | Só o card; página não aberta. Equivalente ao DAMIE 3 lugares com puff |
| Sofá 2 lugares com canto e apoio, Modu bouclê (260 cm) | R$ 4.175,00 | R$ 5.219,00 | R$ 3.966,25 | 10x de R$ 417,50 | 6 meses | Página de produto (25/10): 22 de 24 variantes em estoque |
| Apoio modular para pé, Modu bouclê | R$ 1.299,00 | R$ 1.499,00 | R$ 1.234,05 | 10x de R$ 129,90 | 6 meses | Vendido à parte |
| Sofá cama Mood 2 lugares (cotelê) | R$ 3.150,00 | R$ 4.891,00 | R$ 2.992,50 | 10x de R$ 315 | 6 meses | Sofá-cama. Não é modular; fora da tabela (DAMIE não tem sofá-cama de linha) |
| Sofá cama Mood 3 lugares (cotelê) | R$ 4.190,00 | R$ 5.570,00 | R$ 3.980,50 | 10x de R$ 419 | 6 meses | Idem |

Observação: nos pares de 2 e 3 lugares, a Valley "com apoio" e a DAMIE "com puff" não têm o mesmo número de módulos (ver seção 4). A comparação é de ordem de grandeza.

## 2. Inflow (Fast Living Comércio e Distribuição Ltda.)

CNPJ 44.947.739/0001-80, Itapeva (MG), ativa desde 20/01/2022: dado do 14/10/2026, não reconsultado em 25/10.

| Fato | Valor | Fonte exata | Mudou desde 14/10? |
|---|---|---|---|
| Plataforma | Shopify (`products.json` responde) | inflowsofa.com.br/products.json (25/10/2026) | Não se aplica |
| 3 lugares, 2 cantos e 1 apoio, poli-couro coffee | R$ 5.590 (sem "de") | Catálogo, handle `sofa-modular-3-lugares-2-cantos-com-1-apoio-de-pe-em-poli-couro-coffee` | Não. Pix 10% = R$ 5.031, a menor ponta do intervalo do 14/10 |
| 3 lugares, 2 cantos e 2 apoios, poli-couro coffee | R$ 6.370 (de R$ 7.291,46) | Catálogo, handle `sofa-modular-3-lugares-2-cantos-com-2-apoios-de-pe-em-poli-couro-coffee` | Não. Pix 10% = R$ 5.733, a maior ponta do intervalo do 14/10 |
| 3 lugares, 2 cantos e 1 apoio, bouclê bege (equivalente à linha bouclê) | R$ 4.790 (de R$ 5.568) | Catálogo, handle `sofa-modular-3-lugares-2-cantos-com-1-apoio-de-pe-em-boucle-bege` | Novo: não estava no artigo. Pix 10% = R$ 4.311 |
| 2 lugares com 1 apoio, bouclê bege | R$ 3.790 (de R$ 3.989) | Catálogo, handle `sofa-modular-2-lugares-com-1-apoio-de-pe-em-boucle-bege` | Novo. Pix 10% = R$ 3.411 |
| Material | Espuma FlowTech; encaixe "Fast Click" na base; "Entregue em caixas compactas"; "Zero ferramentas" | `body_html` do produto 3 lugares poli-couro coffee | Igual ao 14/10 |
| Peso por módulo | Até 150 kg | FAQ da Inflow (14/10) | Não reconferido |
| Entrega | "Compactado a vácuo", "expandem automaticamente" | Política de trocas (25/10): "sofás compactados e embalados a vácuo, que expandem automaticamente" | Confirmado |
| Teste em casa | 7 dias corridos (CDC), §2.1 | `https://inflowsofa.com.br/pages/politica-de-trocas-e-devolucoes` (25/10) | Igual |
| Arrependimento | Só com produto lacrado, "sem sinais de abertura ou manipulação" (§2.2); "abertura configura renúncia automática" (§2.3); frete de retorno é do consumidor (§2.6) | Idem | Igual |
| Devolução por motivo pessoal | "Não serão aceitos pedidos ... quando o produto tiver sido aberto e/ou expandido" (§3) | Idem | Igual |
| Defeito | "até 90 dias corridos para relatar defeitos, conforme Art. 26, II, CDC" (§4.2); frete de defeito pago pela Inflow (§4.5) | Idem | Igual |
| Garantia na ficha | 49 de 154 sofás com texto "aproveite garantia de 3 meses" ("Garantia do vendedor: 3 meses" em poltronas de apoio) | `body_html` dos produtos (25/10). Os outros 154 sofás não dizem nada sobre garantia | Diverge do 14/10, que diz "90 dias". Ver pergunta 4 |
| Pix | 10% de desconto | Cabeçalho da política: "GANHE 10% DE DESCONTO NO PIX" | Igual |
| Frete | "FRETE GRÁTIS SUL E SUDESTE" | Cabeçalho da política (25/10) | Igual |
| Reclame Aqui | RA1000, nota 8,6, 144 reclamações (6 meses) | Dado de 14/10 (prints do Bruno) | Não reconsultado. [PENDENTE: navegador] se for preciso |

## 3. DAMIE (Damie Ltda.)

Parceira. Dossiê `docs/Memoria de Artigos/memreview/01_Parceiros/DAMIE.md`.

| Fato | Valor | Fonte | Status |
|---|---|---|---|
| Sofá modular 3 lugares com puff grátis | R$ 5.100 (de R$ 6.100); Pix 10% = R$ 4.590 | `https://www.damie.com.br/collections/sofa-modular/products.json` (25/10/2026, mesmos preços de 22/10 e 14/10) | Confirmado |
| Sofá modular 2 lugares com puff grátis | R$ 3.850 (de R$ 5.150); Pix 10% = R$ 3.465 | Idem | Confirmado |
| Tecidos | Suede, bouclé, linho, couro (preço igual entre tecidos na coleção, conferido no bouclé e no suede) | Idem | Confirmado |
| Teste | 30 dias de experimentação, com coleta e reembolso integral | Texto de produto (coleção, 22/10), dossiê | Confirmado (texto de produto, 22/10) |
| Garantia | 1 ano; depois suporte vitalício e peças a preço de custo | Dossiê; texto de produto | Confirmado |
| Estrutura | Eucalipto grandis maciço tratado em estufa, compensado naval 15 e 22 mm, molas nosag, percintas, espumas HS e Soft D40S | Dossiê e página do modular (14/10) | Não reconferido hoje. Atribuir à ficha |
| Como chega | Módulos pré-estruturados em caixas reforçadas, encaixe em menos de 10 minutos | Página do modular (14/10) | Não reconferido hoje |
| Pix e parcelas | Pix 10%; cartão até 12x sem juros (mín. R$ 100) | `formas-de-pagamento` (dossiê, 08/10) | Não reconferido hoje |
| Cupom | CECILIA12, 12% em todo o site; soma com Pix e promoções; não soma com outro cupom nem giftback | `couponsData.ts` (dossiê, 08/10) | Confirmado pelo dossiê. Revisão até 08/11 |
| Reclame Aqui (6 meses) | Ótima, nota 8,3, 218 reclamações, 86,7% resolvidas | Print de 14/10 (dossiê) | Não reconsultado |
| Atenção | O `body_html` do sofá modular 3 lugares na API repete o texto de poltrona reclinável (120 kg, elétrica). Não usar esse texto para o modular | `damie-sofa-modular-2510.json` | Alerta |

## 4. Modelos equivalentes para a tabela (preço no cartão)

| Linha | DAMIE | Inflow | Valley |
|---|---|---|---|
| 2 lugares com apoio de pé (bouclê/suede) | R$ 3.850 (de 5.150), com puff grátis | R$ 3.790 (de 3.989), bouclê bege, 1 apoio | R$ 4.175 (de 5.219), bouclê; canto + meio + apoio, 260 cm |
| 3 lugares com apoio de pé (bouclê) | R$ 5.100 (de 6.100), com puff grátis | R$ 4.790 (de 5.568), bouclê bege; 2 cantos e 1 apoio | R$ 5.986 (de 7.319), bouclê; 2 cantos e 1 apoio |
| Pix | 10% | 10% | 5% |

Cada linha não tem exatamente a mesma configuração. Valley e Inflow vendem com "apoio" em módulo separado; a DAMIE dá o puff. O artigo diz isso na tabela.

Sofá-cama (Valley Mood, Inflow Flowin) não entra: a DAMIE não tem sofá-cama na coleção de sofá modular, e a linha retrátil ficaria com duas marcas.

Preços da 14/10 que continuam: DAMIE 3 lugares (R$ 5.100 e R$ 4.590 no Pix); Inflow poli-couro 3 lugares (R$ 5.031 a R$ 5.733 no Pix), que é a conta de 10% sobre R$ 5.590 e R$ 6.370.

## 5. Pendentes de navegador

1. Reclame Aqui da Valley: nota, selo, período (01/04 a 30/09/2026), reclamações, resolvidas, voltariam, tempo de resposta. URL tentada: `https://www.reclameaqui.com.br/empresa/valley-art/` (403, Cloudflare, 25/10/2026). Parei, sem retentar nem trocar agente.
2. Confirmar no Chrome o selo "RA Verificada" no rodapé de valleyart.com.br (ou valleymodular.com.br).
3. Caso de devolução com módulo expandido: a política não diz. Quem pergunta é o Bruno ou a loja pelo canal oficial.
4. Reclame Aqui da Inflow e da DAMIE: não reconsultados em 25/10; os dados de 14/10 seguem com a data.
5. "inflow vs valley" (busca citada pelo Bruno): o autocompletar do Google BR não devolveu sugestão para a expressão. Volume e posição: dado do Bruno, sem conferência aqui.

## 6. Autocompletar (25/10/2026, `autocomplete-2510.txt`)

Sugestões com resultado:
- "valley art": valley art sofa, valley art é confiável, valley art ltda, valley art reclame aqui, valley art cnpj (sugestão de "valley art cnpj"), valley arts (guitarras, robô etc.: ruído).
- "valley sofa": valley sofa reclame aqui, valley sofa modular, valley sofa cama, valley sofa and furniture (outra marca, ruído).
- "valley sofa é bom": sofa valley art é bom, sofa valley modular é bom.
- "sofa valley na caixa": sofa na caixa valley art, sofa na caixa valley.
- "valley art cnpj": valley art cnpj.

Sem sugestão: valley ou inflow; inflow vs valley; inflow ou valley; valley sofa é confiavel; valley ou damie; damie ou inflow; valley sofa é golpe; valley sofa preço; valley sofa troca devolução; valley ou sofa na caixa; valley sofá opiniões; inflow valley qual melhor; damie vs valley; valley sofa cnpj.

Consequência: o título e o FAQ usam "Valley Art" e "Valley Modular" dos resultados; "valley" sozinho traz ruído de outras marcas. "valley art é confiável" vai no FAQ.

## 7. Leituras feitas (25/10/2026)

| # | URL | Resultado |
|---|---|---|
| 1 | https://valleyart.com.br/ | 200, Yampi |
| 2 | /atendimento/garantia-devolucoes-e-envios | 200 |
| 3 | /sofa-valley?sort_by=best_sellers | 200, preços no JSON embutido |
| 4 | /sofa-3-lugares-com-2-cantos-modular-modelo-modu-boucle-valley-modular/p | 200 |
| 5 | /atendimento/producao-valley | 200 |
| 6 | /atendimento/sobre-nos | 200 |
| 7 | brasilapi.com.br/api/cnpj/v1/30105567000193 | 200 |
| 8 | reclameaqui.com.br/empresa/valley-art/ | 403, parada |
| 9 | /sofa-2-lugares-com-canto-e-apoio-modular-modelo-modu-boucle-valley/p | 200 |
| 10 | inflowsofa.com.br/products.json?limit=250 (e page=2) | 200 |
| 11 | inflowsofa.com.br/pages/politica-de-trocas-e-devolucoes | 200 |
| 12 | damie.com.br/collections/sofa-modular/products.json?limit=250 | 200 |

Nenhuma Cloudflare além do Reclame Aqui. Nenhuma página de carrinho, login, cupom ou checkout foi aberta.

## Reclame Aqui da Valley (lido no Chrome pelo Claude principal, 25/10/2026)
- Página: reclameaqui.com.br/empresa/valley-modular/ ("Valley Modular", "Conhecida como: Valley Art", site valleyart.com.br, Móveis e Decoração). Selo "Empresa Verificada" (verificação mensal de existência, não é nota).
- Reputação: **"Sem reputação definida"** (menos de 10 reclamações avaliadas), em todos os períodos.
- 6 meses (01/04/2026 a 30/09/2026): 2 reclamações recebidas, 50% respondidas, 1 aguardando resposta, 0 avaliadas, tempo médio de resposta 24 dias e 18 horas.
- Geral (26/10/2023 a 25/10/2026): 9 recebidas, 88,9% respondidas, 1 aguardando, 1 avaliada, sem índice de solução nem nota, tempo médio de resposta 18 dias e 1 hora.
- Reclamação visível mais recente: pedido de cancelamento de sofá não entregue, compra na Black Friday (respondida, 05/01/2026). Não citar o consumidor.
