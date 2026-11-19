---
titulo_provisorio: "Dolce Gusto não sai água, não liga ou pisca a luz vermelha: o que o fabricante manda fazer, por modelo"
seo_title: "Dolce Gusto não sai água ou pisca vermelho: o que fazer"
slug_sugerido: "dolce-gusto-nao-sai-agua-luz-vermelha"
parceiro: "[[Dolce-Gusto]]"
category: "guias-praticos-utilidade"
reviewKind: "guia"
type: "Guia Prático"
status: "pauta-aprovada"
responsavel: "-"
proxima_acao: "manuais da Genio S Touch e da Mini Me (seção 8), depois redação (Job 2)"
bloqueado_por: "páginas de solução de problemas dos manuais da Genio S Touch e da Mini Me (seção 8)"
data_criacao: "2026-11-19"
modo_i18n: "somente-pt"
idioma_fonte: "pt"
affiliate: "dolce-gusto"
coupon: "CECI"
---

# Briefing de Pauta: Dolce Gusto não sai água, não liga ou pisca a luz vermelha (DG2)

GO do Bruno em 19/11/2026 ("Vamos pro DG2"). Sinais em [[Pesquisas-de-Pauta]], seção "Dolce Gusto: pautas pelo GSC e pelo Trends (19/11/2026)". Leituras de 19/11/2026, pelo navegador embutido, sem login:
- a central de ajuda das máquinas (`/suporte-maquinas`);
- as páginas de ajuda da NEO (`/help-and-support-category` e as páginas `n1-*`);
- o FAQ da loja (`/sobre/faq`);
- a página de documentação da Mini Me.

Os manuais em PDF da loja (`/media/Manual_Mine_Me.pdf`, `/media/Manual_Drop.pdf` e os da NEO) não abrem por robô: o curl e o WebFetch recebem 403, e o navegador baixa o arquivo em vez de abrir. Os sites da Dolce Gusto de outros países também barram. A Arno não publica o manual em PDF: a ficha da Genio S Plus só diz que ele vem na caixa.

## 1. Portões

- [x] **Evidência factual:** a NEO tem uma página oficial por luz e por defeito (seção 4), lidas em 19/11. O FAQ da loja traz o caminho para "Minha máquina parou de funcionar" e os telefones.
- [ ] **Evidência das máquinas Original:** sem o manual, a Genio S e a Mini Me ficam sem diagnóstico por luz. **Bloqueio:** a seção 8. A Cecília e o Bruno têm a NEO, a Genio S Touch e a Mini Me 2.0 (há review de cada uma); o manual impresso das duas Original resolve. Foi assim na descalcificação, com as fotos do manual da Genio S Touch (30/09).
- [x] **Fronteira factual vs experiência:** guia, sem experiência. Nada de "aconteceu com a gente". Se a Cecília já teve um desses defeitos, entra numa frase, com a resposta dela.
- [x] **Classe canônica:** `guias-praticos-utilidade`, `reviewKind: guia`, como o `dolce-gusto-descalcificacao-passo-a-passo`.
- [x] **i18n:** somente PT.
- [x] **Anti-canibalização:**
  - `dolce-gusto-descalcificacao-passo-a-passo`: dono da luz laranja e do "a luz não apagou". Aqui a luz laranja ocupa uma linha da tabela, com link para lá; o passo a passo da descalcificação não se repete.
  - `dolce-gusto-reclame-aqui-nota-reputacao` e `dolce-gusto-e-confiavel`: já dizem onde fica a assistência. Aqui o contato fecha o artigo, para quem chegou pelo defeito, com os mesmos telefones.
  - `dolce-gusto-capsulas-compativeis-guia`: a garantia com cápsula de outra marca. Aqui só o link, se o artigo tocar no assunto.
  - Nenhum artigo trata "não sai água", "não liga", "luz vermelha", "luz azul", "luz branca" nem "vazando".

## 2. Função da pauta

Atender quem está com a máquina parada na frente: o que a luz quer dizer, o que o fabricante manda tentar em casa e quando ligar para o SAC ou a Arno. Captura uma família de buscas de cauda longa que nenhum artigo do site cobre. O CECI entra no fim, para a cápsula ou a máquina nova, sem empurrar compra em quem tem defeito.

## 3. Sinais literais (19/11/2026)

**Autocompletar (Google, pt-BR):**
- "não sai água": "e fica piscando", "do reservatório", "o que fazer", "quente", "genio", "lumio", "nova", "vermelha".
- "não liga": "o que pode ser", "a bomba", "mais", "piccolo", "arno", "lumio", "mini me", "genio s plus".
- "luz vermelha": "piscando", "acesa", "e verde piscando", "piscando rápido", "lumio", "neo", "mini me".
- "piscando": "vermelho", "vermelho e verde", "azul", "laranja", "sem parar".
- "não esquenta": "a água", "muito", "genio s".
- "vazando": "água por baixo", "na cápsula", "por baixo do reservatório", "por cima", "pela frente", "café por baixo".
- "não fura a cápsula", "entupida" (com "agulha", "mini me", "genio s", "piccolo xs", "lumio", "infinissima", "krups"), "faz barulho mas não sai água", "parou de funcionar" (com "luz piscando", "e não liga", "o que fazer"), "sai pouca água", "genio s plus luz azul piscando", "mini me luz vermelha piscando", "neo não sai água".

**Trends (Brasil, 12 meses):** "não sai água" 2, igual a "medidas dolce gusto"; "luz vermelha" 0. Pouco volume por termo, muitas variações.

**Search Console (3 meses):** quase nada de defeito, porque o site não tem a página: "luz de descalcificação" (2), "luz amarela" (2), "luz laranja" (1), "nível de água" (43, do `tabela-medidas`). A pauta é aposta na cauda longa, não resposta a impressão que já existe.

## 4. Fatos da NEO (páginas oficiais de ajuda, 19/11/2026)

Cada página tem um código ("n1-…") que o SAC pede. O texto cita o código.

| Sinal | O que a Dolce Gusto diz | O que fazer |
|---|---|---|
| Não liga (`n1-cant-switch-on`) | — | Conferir se está bem ligada na tomada e tentar de novo; não ligou, SAC 0800 776 2233 |
| Botão vermelho contínuo (`n1-error-10001`) | "Provável problema técnico" | SAC, citando o código |
| Superaquecimento (`n1-warning-7`) | Quente demais por dentro | Esperar cerca de 10 minutos; persistiu, SAC com o código |
| Botão azul (`n1-water-refill`) | Reservatório vazio, antes ou durante o preparo | Encher, recolocar e apertar Iniciar; azul que não apaga é problema técnico, SAC |
| Botão branco piscando (`n1-warning-1`) | A máquina "está um pouco confusa" | Desligar e ligar, abrir e fechar a barra deslizante sem cápsula; persistiu, SAC com o código |
| Verde contínuo / esmaecido / piscando / piscando rápido (`n1-green`) | Pronta ou terminou / preparando / aquecendo (e a cápsula sai sozinha em 10 s) / dá para completar com água | Nada: é o uso normal |
| Café saindo devagar ou frio (`n1-slow-flow`) | No SlowBrew é normal; nas outras bebidas, hora de descalcificar | Descalcificação (link para o artigo) |
| Interromper o preparo (`n1-brewing-aborted`) | Apertar Iniciar ou abrir a barra deslizante | Para xícara maior ou menor, o app |
| Ícone de conexão aceso / apagado / piscando (`n1-connectivity-dot`) | Conectada / refazer Bluetooth e Wi-Fi / tentando reconectar | Refazer a configuração; persistiu, SAC |
| Restaurar a fábrica (`n1-factory-reset`) | Quando o SAC recomendar | ON/OFF + Iniciar juntos por 15 s, até o Iniciar piscar 5 vezes |

**Dois telefones nas páginas da NEO:** a maioria cita 0800 776 2233 (o SAC da Nestlé, o mesmo do rodapé); `n1-connectivity-dot` e `n1-unknown` citam 0800 707 6066, que é o número do Reino Unido na página britânica. O texto usa só o 0800 776 2233.

## 5. Fatos das máquinas Original (o que já está confirmado)

- **FAQ da loja, "Minha máquina parou de funcionar":** "Contate nosso atendimento pelos canais oficiais. Ou, para máquinas geração 1, entre diretamente em contato com a Assistência técnica da Arno no (11) 2060-9777", de segunda a sexta, das 8h às 18h.
- **Peça faltando na caixa:** Assistência Técnica da Arno pelo (11) 2915-4400 ou a loja da compra (FAQ). Não é defeito: só uma frase, se couber.
- **Rodapé do FAQ:** "Não encontrou uma solução?" com WhatsApp e o telefone da Arno.
- **Luz laranja:** descalcificação, coberta pelo `dolce-gusto-descalcificacao-passo-a-passo`.
- **Mini Me, piscar vermelho no começo:** o `dolce-gusto-mini-me-2-0-vale-a-pena` (teste do Bruno) diz que o LED pisca vermelho por 20 a 30 segundos enquanto a máquina aquece, até ficar verde. É o uso normal, não defeito: vai à tabela com link para o review.
- **Busca externa, a conferir no manual brasileiro:** o manual da Mini Me diria que o vermelho piscando sem parar é desligamento de proteção contra superaquecimento, com 20 minutos para esfriar. Não entra antes da seção 8.
- **Central de ajuda da loja por modelo:** NEO, Mini Me e Drop têm página de manual; a Lumio cai na página geral; Genio S Basic, Plus, Touch e Infinissima levam ao FAQ.

## 6. Esqueleto (H2)

Intro: a máquina parou, e você quer saber se é você, é a água ou é a assistência.

1. **Resposta rápida** (40 a 60 palavras, sem "R$"): quase sempre é o reservatório, a cápsula ou o calcário; a cor da luz diz qual; antes de ligar para alguém, desligar, encher o reservatório, tirar a cápsula e tentar sem ela; não resolveu, SAC 0800 776 2233 ou Arno.
2. **Primeiro, qual é a sua máquina.** NEO (só cápsula NEO, botão Iniciar colorido) ou Original (Genio S, Mini Me, Piccolo, Lumio, Drop, Infinissima). Uma foto de cada, se houver.
3. **O que cada luz quer dizer.** Uma tabela por sistema: a da NEO (seção 4) e a das Original (seção 5 + seção 8). Linha da luz laranja com link para a descalcificação.
4. **Não sai água ou sai pouca.** Reservatório vazio ou mal encaixado, calcário, cápsula; o que o manual manda (seção 8). Na NEO, a luz azul.
5. **Não liga ou desliga sozinha.** Tomada; superaquecimento (NEO: 10 minutos; Original: o que o manual disser).
6. **Pisca vermelho.** Pisca no começo e fica verde (aquecendo, normal); pisca sem parar (o que o manual disser); vermelho contínuo na NEO (técnico, SAC).
7. **Vazando por baixo ou pela cápsula.** Só o que o manual disser. Sem conserto caseiro.
8. **O que não fazer.** Sem desmontar, sem vinagre (link para a descalcificação), sem "reset" de vídeo da internet; a garantia é da Arno (link para o `dolce-gusto-capsulas-compativeis-guia`, se couber).
9. **Quem chamar.** SAC da Nestlé 0800 776 2233 (NEO e todas); Arno (11) 2060-9777, de segunda a sexta, das 8h às 18h (Original). Ter à mão o modelo, a cor da luz e, na NEO, o código. Link para o `dolce-gusto-reclame-aqui-nota-reputacao`, que lista os postos autorizados.
10. **Perguntas frequentes.**

Guia: leva o quadro "Leve se / Passe se"? Não: não é decisão de compra. O campo `decision` fica fora.

O CECI entra numa frase no capítulo 9 ou no fim, para quem desistiu do conserto e vai trocar de máquina ou repor cápsula: 10% na loja oficial a partir de R$ 100. A máquina com o CECI sai pelo preço testado no dia; sem preço, a frase não dá número.

## 7. FAQ (título "Perguntas frequentes")

- "Por que minha Dolce Gusto não sai água?" (reservatório, calcário, cápsula)
- "O que significa a luz vermelha piscando na Dolce Gusto?" (aquecendo × superaquecimento × NEO)
- "O que significa a luz azul na Dolce Gusto NEO?" (reservatório vazio)
- "Minha Dolce Gusto não liga, o que fazer?"
- "Qual o telefone da assistência técnica da Dolce Gusto?" (SAC e Arno)
- "Como restaurar a NEO para a configuração de fábrica?" (só quando o SAC pedir)

## 8. Pendente do Bruno (bloqueio): manuais das máquinas Original

Para as tabelas da Genio S Touch e da Mini Me, uma destas:
1. **Fotos** da página "Solução de problemas" (ou "Problemas e soluções") e da página das luzes do manual impresso da **Genio S Touch** e da **Mini Me 2.0** que estão em casa, como as de 30/09 da descalcificação; ou
2. **Os PDFs** salvos pelo navegador numa pasta do computador: `nescafe-dolcegusto.com.br/media/Manual_Mine_Me.pdf` (abre em `/mini-me-documentacao`) e, se quiser cobrir a Drop, `/media/Manual_Drop.pdf`. Com o PDF salvo, a sessão extrai o texto.

Com isso a tabela das Original fica por modelo. Sem isso, o artigo sai só com a NEO por luz e, para as Original, com os passos gerais e os telefones. Nesse caso o título passa a ser "Dolce Gusto NEO: o que cada luz quer dizer e o que fazer" e o "não sai água" das Original perde força.

Se a Cecília ou o Bruno já tiveram um desses defeitos (luz, vazamento, ligação para a Arno), uma frase com o que aconteceu.

## 9. Snippet e nota

- **metaDescription (sugestão, 147 caracteres):** "Dolce Gusto não sai água, não liga ou pisca vermelho? O que cada luz quer dizer na NEO e nas Original, o que tentar em casa e quem chamar."
- **Nota editorial:** "Feito a partir das páginas de ajuda e dos manuais da Nescafé Dolce Gusto. Somos afiliados da Dolce Gusto e podemos receber comissão pelo cupom CECI." Até 3 linhas, sem data.

## 10. Riscos

- **Diagnóstico inventado:** cada causa e cada solução saem da página oficial ou do manual. Nada de "pode ser a bomba", "troque a vedação", "desentupa com agulha" sem o manual dizer. A busca "como desentupir" fica sem resposta caseira: o texto manda ao manual e à assistência.
- **Segurança:** água quente sob pressão e tomada. Nada de abrir a máquina; nada de tirar da tomada durante a descalcificação (o manual da Genio S Touch proíbe).
- **Telefones:** o 0800 707 6066 das páginas da NEO é o do Reino Unido; o texto usa 0800 776 2233 (SAC) e (11) 2060-9777 (Arno). Reler no dia.
- **Garantia:** quem dá é a Arno, pela documentação do produto (Termos da loja). Sem prometer cobertura.
- **Modelos fora de linha:** a Genio S Plus saiu de linha no Reino Unido; no Brasil a Arno ainda vende a DGS2 e a DGS3. Não afirmar fim de linha no Brasil.
- **Imagem:** ao menos uma no corpo. Foto das máquinas da casa com a luz acesa, se o Bruno tiver; senão, as fotos de produto já no CDN. As fotos do manual, se vierem, seguem a regra de 30/09 (crédito na legenda, uso ilustrativo). Capa pelo Job 6.

## 11. Pendentes de navegador (Job 2, no dia)

- Reler as páginas `n1-*` da seção 4 (o texto e os telefones).
- Reler o "Minha máquina parou de funcionar" do FAQ e o horário da Arno.
- Conferir o link dos postos autorizados da Arno que o `dolce-gusto-reclame-aqui-nota-reputacao` usa.

## Decisões

- **19/11/2026:** GO do Bruno ("Vamos pro DG2"). Vira guia. A NEO entra completa pelas páginas oficiais; as Original esperam os manuais (seção 8).
