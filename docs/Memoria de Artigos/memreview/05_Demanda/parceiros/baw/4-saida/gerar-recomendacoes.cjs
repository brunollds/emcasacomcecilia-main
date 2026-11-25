// Gera 4-saida/recomendacoes.md a partir de 3-matriz/matriz.csv e de 4-saida/decisoes.json.
// Só entram linhas com estado_revisao = pronta. "pronta" quer dizer revisão concluída, não autorização nem execução:
// decisão do Bruno e execução ficam em decisoes.json, uma entrada por oportunidade.
// Uso, de qualquer pasta: node gerar-recomendacoes.cjs
const fs = require('fs');
const path = require('path');

const raiz = path.join(__dirname, '..');
const texto = fs.readFileSync(path.join(raiz, '3-matriz', 'matriz.csv'), 'utf8').replace(/\r\n/g, '\n');

function lerCsv(s) {
  const linhas = [];
  let linha = [], campo = '', aspas = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (aspas) {
      if (ch === '"' && s[i + 1] === '"') { campo += '"'; i++; }
      else if (ch === '"') aspas = false;
      else campo += ch;
    } else if (ch === '"') aspas = true;
    else if (ch === ',') { linha.push(campo); campo = ''; }
    else if (ch === '\n') { linha.push(campo); linhas.push(linha); linha = []; campo = ''; }
    else campo += ch;
  }
  if (campo || linha.length) { linha.push(campo); linhas.push(linha); }
  return linhas;
}

const [cab, ...dados] = lerCsv(texto);
const ops = dados.map((r) => Object.fromEntries(cab.map((k, i) => [k, r[i]])));
const fora = ops.filter((o) => o.estado_revisao !== 'pronta');
if (fora.length) throw new Error('linha sem revisão concluída: ' + fora.map((o) => o.oportunidade_id).join(', '));

// Para onde cada recomendação segue depois da decisão do Bruno (PROGRAMA.md, seção 5).
const DESTINO_POR_ACAO = {
  'criar-artigo': 'Linha na Fila de Pautas; o Job 1 faz o briefing',
  'melhorar-capitulo': 'Sessão de artigos, com esta ficha como escopo',
  'atualizar-fatos': 'Sessão de artigos, com esta ficha como escopo',
  'melhorar-pagina-cupom': 'Sessão de cupons (`/cupons/baw` e `couponsData.ts` são dela)',
  'links-internos': 'Sessão de artigos',
  video: 'Bruno e Cecília',
};
const DESTINO_POR_ID = {
  'op-baw-0012': 'Primeiro o carrinho de teste da semana de 27/11 (Bruno ou sessão de cupons, sem compra); depois a sessão de artigos, na BW6',
  'op-baw-0013': 'O mesmo carrinho da `op-baw-0012`; depois a sessão de cupons',
  'op-baw-0009': 'Bruno: a fonte da loja física e a confirmação com a parceira; depois, linha na Fila de Pautas',
};
// Ressalvas que a revisão deixou sem exigir correção (REVISAO.md) e fatos da coordenação posteriores à matriz.
const RESSALVA = {
  'op-baw-0012': 'A oferta de 24/11 (Pix Night, "pague 3, leve 4", +15% no Pix) não tem data nem regulamento publicados: tudo o que a linha diz dela é leitura até o carrinho. O banner do site (`content/campanhas/baw-black-friday-2026.json`) já diz "até 80% OFF e pague 3, leve 4".',
  'op-baw-0013': 'Sem o carrinho não há o que mudar na página: a prioridade alta é pelo prazo, e a ação depende do teste.',
  'op-baw-0009': 'O "só o Bom Retiro" da semente não tem o trecho lido (a FashionUnited só teve o título lido; semente corrigida em 25/11, #1444).',
};

const DECISOES = JSON.parse(fs.readFileSync(path.join(__dirname, 'decisoes.json'), 'utf8'));
const decisao = (id) => {
  const d = DECISOES[id];
  if (!d) return '- **Decisão do Bruno:** em espera';
  return `- **Decisão do Bruno:** ${d.decisao}, em ${d.data}\n- **Execução:** ${d.execucao} (${d.evidencia})`;
};
for (const id of Object.keys(DECISOES)) if (!ops.some((o) => o.oportunidade_id === id)) throw new Error(`decisoes.json: ${id} não existe na matriz`);

const contar = (v) => (v.startsWith('@') ? v : `${v.split('|').length} (ids na matriz)`);
const cel = (s) => s.replace(/\|/g, '/').replace(/\n/g, ' ');
const ordem = { alta: 0, media: 1, baixa: 2 };
const SEM_ACAO = new Set(['manter', 'nao-criar', 'ideia-registrada']);
const acoes = ops.filter((o) => !SEM_ACAO.has(o.acao)).sort((a, b) => ordem[a.prioridade] - ordem[b.prioridade] || a.oportunidade_id.localeCompare(b.oportunidade_id));
const registro = ops.filter((o) => o.acao === 'ideia-registrada');
const naoCriar = ops.filter((o) => o.acao === 'nao-criar');
const manter = ops.filter((o) => o.acao === 'manter');
const decididas = Object.keys(DECISOES).length;

const out = [];
out.push(`# Recomendações: BAW Clothing

Gerado por \`gerar-recomendacoes.cjs\` a partir de \`3-matriz/matriz.csv\` e de \`decisoes.json\`. Não editar à mão: mudar
a matriz ou as decisões e gerar de novo. Segundo piloto do Programa de Demanda (fluxo v2), com insumos fechados em
\`5544b2e1\` e revisão concluída em 25/11/2026.

**Estado: ${ops.length} oportunidades revisadas: ${acoes.length} com ação recomendada, ${registro.length} ideias registradas, ${naoCriar.length} de não
criar e ${manter.length} de manter. Todas passaram pela revisão independente (\`3-matriz/REVISAO.md\`, duas passadas). ${decididas} têm
decisão registrada em \`decisoes.json\` (duas delas tomadas fora do programa, antes da análise); as outras esperam o Bruno.**

Revisão, decisão e execução são coisas diferentes: a matriz guarda o estado da revisão; a decisão do Bruno e o que já
foi executado estão em \`decisoes.json\` e aparecem em cada item. Fato e leitura estão separados em
\`3-matriz/LEITURA.md\`. O programa não mexe na Fila de Pautas: o que o Bruno aprovar segue para o destino indicado.

## Ordem sugerida

1. \`op-baw-0012\` e \`op-baw-0013\`: um carrinho de teste na semana de 27/11 responde às duas (o código com o "pague 3,
   leve 4", a base dos 15% do Pix e o frete grátis); depois, a BW6 e a \`/cupons/baw\`.
2. \`op-baw-0021\` e \`op-baw-0022\`: links internos para a tabela de medidas e para o guia de tênis. Esforço pequeno e
   confiança alta; a da BW6 entra na mesma edição da primeira.
3. \`op-baw-0006\` e \`op-baw-0014\`: capítulos da BW3 (a revenda e o "faliu") e da BW1 (combos), sem prazo.
4. \`op-baw-0009\`: a loja física espera a sua decisão sobre a fonte e a confirmação com a parceira.

O resto não tem prazo. As páginas da BAW têm poucos dias de dado: o export útil do Search Console é o de depois de
30/11, que também decide o que fazer com as linhas de manter.

## Resumo

| Oportunidade | Ação | Prioridade | Confiança | Pergunta ou decisão atendida |
|---|---|---|---|---|`);
for (const o of acoes) out.push(`| \`${o.oportunidade_id}\` | ${o.acao} | ${o.prioridade} | ${o.confianca} | ${cel(o.intencao)} |`);

out.push('\n## Recomendações com ação\n');
for (const o of acoes) {
  out.push(`### ${o.oportunidade_id} · ${o.acao} · prioridade ${o.prioridade}

- **Pergunta ou decisão atendida:** ${o.intencao}
- **Evidência:** sinais: ${contar(o.sinais_ref)}; nossos dados: ${contar(o.nossos_dados_ref)}; comercial: ${contar(o.comercial_ref)}
- **Evidências principais:** ${o.evidencias_principais.split('|').map((x) => `\`${x}\``).join(', ')}
- **Conteúdo existente:** cobertura: ${contar(o.cobertura_ref)}
- **O que falta hoje e o que a ação acrescenta:** ${o.lacuna}
- **Prioridade, e por quê:** ${o.prioridade}. ${o.justificativa_prioridade}
- **Confiança:** ${o.confianca}
- **Dependências e como obter:** ${o.dependencias}
- **Pendências e notas:** ${o.notas}${RESSALVA[o.oportunidade_id] ? `\n- **Ressalva da coordenação:** ${RESSALVA[o.oportunidade_id]}` : ''}
- **Destino, se aprovada:** ${DESTINO_POR_ID[o.oportunidade_id] || DESTINO_POR_ACAO[o.acao]}
- **Revisado por:** sessão de revisão independente, 25/11/2026
${decisao(o.oportunidade_id)}
`);
}

out.push(`## Ideias registradas, não recomendadas agora

Não são pauta de prioridade baixa: só voltam a ser avaliadas se a dependência se resolver e o Bruno decidir.

| Oportunidade | Ideia | O que falta para reavaliar |
|---|---|---|`);
for (const o of registro) out.push(`| \`${o.oportunidade_id}\` | ${cel(o.intencao)} | ${cel(o.dependencias)} |`);

out.push(`
## Não criar

Temas com algum sinal em que a matriz recomenda não abrir página agora.

| Oportunidade | Tema | Por que não criar | O que faria rever |
|---|---|---|---|`);
for (const o of naoCriar) out.push(`| \`${o.oportunidade_id}\` | ${cel(o.intencao)} | ${cel(o.justificativa_prioridade)} | ${cel(o.dependencias)} |`);

out.push(`
## Manter como está

Conteúdo que já responde ao que existe de busca. As duas linhas executadas fora do programa (o tênis e a tabela de
medidas) estão aqui.

| Oportunidade | O que é | Por que manter | O que faria rever | Decisão |
|---|---|---|---|---|`);
for (const o of manter) {
  const d = DECISOES[o.oportunidade_id];
  out.push(`| \`${o.oportunidade_id}\` | ${cel(o.intencao)} | ${cel(o.justificativa_prioridade)} | ${cel(o.dependencias)} | ${d ? cel(d.execucao) : '—'} |`);
}
out.push('');

fs.writeFileSync(path.join(__dirname, 'recomendacoes.md'), out.join('\n'));
console.log(`recomendacoes.md: ${acoes.length} com ação, ${registro.length} de registro, ${naoCriar.length} de não criar, ${manter.length} de manter, ${decididas} decididas`);
