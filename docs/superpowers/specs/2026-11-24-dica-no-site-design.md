# DICA no site: assistente dos parceiros com cupom

Data: 24/11/2026. Caminho escolhido pelo Bruno: **A, rota própria no site**. O visual da caixa (botão
flutuante e gaveta no celular) é do Gemini, que fez o /blackfriday.

## Por quê

O visitante pergunta em linguagem comum ("tem whey?", "tem sofá?") e recebe as lojas parceiras que
vendem aquilo, cada uma com o nosso código e o botão de copiar e ir à loja. O que nenhum parceiro
vende vai para a busca do Dicas (`https://dicas.emcasacomcecilia.com/?q=<termo>`). Serve para
converter quem chega pelos Stories e pelas redes sem saber qual parceira tem o quê.

Exemplos do Bruno:
- "Tem whey?" → Adaptogen, Mais Mu, Probiótica… cada uma com o seu código.
- "Tem sofá?" → DAMIE, sofá modular, com o código dela.
- "Tem sofá-cama?" → "Nos nossos parceiros agora não, mas dá para procurar no Dicas" + link.
- "Tem anel de prata?" → idem.

## Metas, não metas e o que seria fracasso

Metas
- Responder só com os parceiros de cupom do catálogo leve (37 lojas, `data/afiliados/catalogo-leve.json`).
- Toda loja citada vem com o código certo e o link de afiliado, tirados de `src/lib/couponsData.ts`.
- O resto vai à busca do Dicas.
- Custo previsível, com limites por visitante e um teto diário.

Não metas
- Preço, estoque, frete ou prazo, nem dos parceiros nem do Dicas/Sonar.
- Usar a API ou os dados do Dicas/Sonar (só o link da busca).
- Outros idiomas (só PT por enquanto), conversa com memória (cada pergunta vale sozinha), WhatsApp.
- SHEIN, AliExpress, Temu, Lejour e Magalu (fora do catálogo por decisão do Bruno).

Fracasso, mesmo funcionando
- Citar código, loja ou desconto que não está nos dados.
- Chamar o CECILIA010 de "cupom" (é código de recompensa da YesStyle).
- Dizer que uma loja "não vende" algo sem isso estar confirmado no catálogo.
- "Sofá-cama" responder DAMIE só porque ela tem "sofá".
- Uma conta da Anthropic sem teto ou um pico de Stories derrubar o site.

## Caminhos considerados

| Caminho | Como | Por que não / por que sim |
|---|---|---|
| **A. Rota no site (escolhido)** | `POST /api/dica` no próprio Next.js, chave própria | Não depende do VPS do WhatsApp; dados e código saem no mesmo deploy; limites próprios por visitante. |
| B. Canal no DICA do WhatsApp | Endereço público no contêiner `emc-whatsapp-inbound` | Expõe à internet um serviço feito para o WhatsApp; pico do site gastaria as cotas do WhatsApp (900/dia) e poderia derrubar o WAHA. |
| C. Sem IA, só busca por palavras | Casar o texto com a lista | Erra sinônimos e frases ("algo pra dormir melhor"); fica como reserva quando a IA falha. |

## Como funciona (decidido)

### Princípio herdado do DICA

A IA **só interpreta** a pergunta. Ela nunca escreve a resposta, nunca escolhe loja nem código:
a resposta é montada pelo código a partir dos dados (regra `ai_never_chooses_offers` do DICA). Com
isso não há como a IA inventar cupom.

### O fluxo de uma pergunta

1. **Entrada:** `POST /api/dica` com `{ q }`. Texto de 2 a 200 caracteres; fora disso, erro curto.
2. **Limites** (ver adiante). Estourou: resposta pronta, sem IA, com o link do Dicas.
3. **Normalização** (minúsculas, sem acento, espaços) e **cache** em memória: mesma pergunta
   normalizada nos últimos 60 min devolve o resultado guardado, sem IA (até ~500 entradas).
4. **Atalho sem IA:** a pergunta é o nome de uma loja do catálogo ("cupom insider", "damie") →
   resposta da loja direto.
5. **IA (Claude Haiku 5.5, `claude-haiku-5-5`):** recebe a pergunta e o **vocabulário** do catálogo (todos os
   `tipos`, `destaques` e nomes de `categorias`, sem preço) e devolve, em JSON:
   - `termos`: entradas **exatas** do vocabulário que respondem à pergunta, só quando o produto é o
     mesmo (sofá-cama ≠ sofá; anel de prata ≠ acessório);
   - `buscaDicas`: o termo curto para a busca do Dicas (ex.: "sofá-cama");
   - `foraDeEscopo`: verdadeiro para o que não é compra (piada, pedido de dado pessoal, outro assunto).

   O servidor descarta qualquer termo que não esteja no vocabulário. O vocabulário vai como bloco
   fixo do prompt, com o cache de prompt da Anthropic ligado.
6. **Montagem da resposta, no código:** termos → lojas (até 8, as que casaram mais termos primeiro;
   empate segue a ordem de `couponsData.ts`). Cada cartão leva:
   - nome da loja e o que casou ("sofá modular");
   - loja sem código (Proton e Starlink, só link): o cartão sai sem código, com o texto curto da loja
     (`cutoutNote`, como nos artigos) e o botão "Ir à loja"; (decisão de quem escreveu, não do Bruno)
   - código e desconto do cupom ativo de `couponsData.ts` (código com prazo vigente, como o
     CECIEMCASA15 da I Wanna Sleep, quando dentro do prazo);
   - o rótulo do tipo do código (`getStoreCodeKind`: recompensa na YesStyle, indicação quando houver);
   - os avisos da loja que se aplicam aos termos (campo novo `avisos`, abaixo);
   - botão "Copiar e ir à loja" (link de afiliado, `rel="sponsored noopener noreferrer"`, nova aba)
     e link para `/cupons/<slug>`.
7. **Sem nenhum termo:** "Nos nossos parceiros agora não encontrei isso, mas dá para procurar no Dicas." + botão para a busca do
   Dicas com `buscaDicas` (ou a pergunta normalizada). Fora de escopo: frase curta dizendo que o
   assistente ajuda a achar lojas parceiras e códigos.
8. **IA fora do ar, sem cota ou demorando mais de 4 s:** reserva sem IA (caminho C): casa a pergunta
   normalizada com o vocabulário por frase inteira (o termo mais longo vence, então "sofá-cama" nunca
   casa "sofá"); sem casamento, link do Dicas.

O assistente nunca diz que nenhuma loja do mundo vende algo: só que não achou entre os parceiros. Com `naoVende`
confirmado, pode dizer "a <loja> não tem X". O link `https://dicas.emcasacomcecilia.com/?q=<termo>` é a busca
que o próprio Dicas declara no JSON-LD (`SearchAction`).

Os textos fixos seguem o tom do DICA ("acolhedor, direto"): curtos, em português do Brasil, sem
pressão, sem dado interno. Ficam num arquivo de textos (`dicaCopy.ts`).

### Dados

- **Catálogo leve** (`data/afiliados/catalogo-leve.json`): o que cada loja oferece. Já existe (37
  lojas, lido em 24/11; Petz, Dolce Gusto, Nestlé Nutre e Starlink conferidas por categoria no site oficial no
  mesmo dia). Revisão do Bruno antes de ir ao ar: é uma revisão, sem trava que tire lojas.
- **Campos novos no catálogo:**
  - `avisos`: `[{ "termos": ["fórmula infantil"], "texto": "O código não vale em fórmula infantil de 0 a 12 meses." }]`,
    mostrado no cartão quando um dos termos casou. Primeiro caso: Nestlé Nutre.
  - `naoVende`: só ausências confirmadas no site; o assistente usa para dizer "a <loja> não tem X".
    Sem isso, nunca afirma ausência.
- **Cupom, desconto, link e tipo do código:** só de `couponsData.ts` (uma fonte). O catálogo não
  repete código nem link.
- Teste novo (`test:dica`), no build: todo slug do catálogo é loja ativa de `couponsData.ts`; nenhum
  campo de preço; nenhuma loja excluída; nenhum texto chamando o CECILIA010 de cupom; os casos do
  Bruno (whey, sofá, sofá-cama, anel de prata) pela reserva sem IA.

### Limites e custo

- Por IP (`cf-connecting-ip`, senão `x-forwarded-for`): 1 pergunta a cada 3 s, 8 em 5 min, 25 por dia.
- Teto diário global de chamadas à IA (padrão 1.500), em variável de ambiente; estourou, todos caem
  na reserva sem IA até a meia-noite de Brasília.
- Contadores em memória por processo. A Hostinger roda de 1 a 4 processos Node (até 6 na troca de
  release), então os limites reais podem ser até 4× maiores; aceitável como anti-abuso. O teto de
  gasto de verdade é o da conta.
- Chave: `ANTHROPIC_API_KEY_DICA_SITE`, numa Workspace da Anthropic só para isso, com teto de gasto
  mensal. Fica nas variáveis de ambiente do Node.js na Hostinger (como o `RESEND_API_KEY`). Sem a
  chave, o assistente funciona só na reserva sem IA.
- Até 300 tokens de saída por chamada.

### A caixa no site

- Componente cliente carregado só no toque do botão (import dinâmico). Não importa o catálogo, o
  `couponsData.ts` nem `@/lib/data`: manda `{ q }` e recebe os cartões prontos (o `test:client-bundle`
  segue valendo).
- Onde aparece: só no `/blackfriday`, como teste na página do evento (decisão do Bruno, 25/11/2026). Esteve na home,
  em `/cupons` e em `/reviews` de 24 a 25/11 por um erro de escopo. Fora dos artigos e das páginas de
  loja no começo, porque lá o dock do celular ocupa o rodapé. Só em PT.
- Espera o aviso de cookies sair antes de aparecer; respeita "reduzir movimento".
- Linha fixa na caixa: "Sua pergunta é lida por uma IA. Não escreva dados pessoais."
- Visual: Gemini.

### Medição

- `dica_open`, `dica_answer` (com `resultado`: `parceiros`, `dicas`, `fora`, `reserva`, e o número
  de lojas; **sem o texto da pergunta**), `coupon_copy` e `coupon_store_click` com
  `placement: 'dica'`.
- Os eventos seguem o consentimento de cookies como o resto do GA4.

### Privacidade

- `/privacidade` ganha uma seção sobre o assistente: o texto vai à Anthropic para ser interpretado,
  fica guardado sem identificar ninguém por 90 dias (ver Perguntas guardadas). O
  `test:institutional` passa de 13 para 14 seções no mesmo PR.

## Perguntas guardadas (decisão do Bruno, 24/11)

O site guarda as perguntas para mostrar o que o público procura e quais parceiros faltam (pautas e novas
parcerias), sem nada que identifique a pessoa:
- por pergunta: data e hora, texto normalizado, `resultado`, slugs das lojas e o `buscaDicas`;
- nunca IP, cookie, user agent ou identificador de sessão;
- antes de gravar, o texto perde o que parece e-mail, telefone, CPF ou número longo (troca por `[removido]`);
- arquivo JSONL por dia numa pasta fora da release, que o deploy não apaga (`DICA_LOG_DIR`), com 90 dias de
  retenção; sem a variável, não grava nada. Quem constrói confere no plano qual pasta da Hostinger sobrevive
  ao deploy.

A seção da `/privacidade` diz isso: o texto vai à Anthropic para ser interpretado e fica guardado, sem nada
que identifique a pessoa, por 90 dias, para melhorar o assistente.

## Antes de construir

- **Chave da Anthropic:** criar a Workspace com teto de gasto e a chave, e cadastrar
  `ANTHROPIC_API_KEY_DICA_SITE` nas variáveis do Node.js na Hostinger. Só o Bruno faz isso. Até lá, dá para
  construir e testar toda a reserva sem IA.
- **Visual da caixa:** o Gemini desenha (pedido do Bruno em 24/11). A fase do servidor e dos dados não
  espera por isso; a fase da caixa começa com o desenho dele.

## Deixado para quem constrói

Nome dos arquivos e módulos, formato exato do prompt, estrutura do cache, o desenho da caixa (Gemini) e
a ordem das fases do plano.
