// Gera 4-saida/recomendacoes.md a partir de 3-matriz/matriz.csv. Só entram linhas com estado_revisao = pronta.
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
  'melhorar-pagina-cupom': 'Sessão de cupons (`/cupons/lamazonie` é dela)',
  'links-internos': 'Sessão de artigos',
  video: 'Bruno e Cecília',
};
const DESTINO_POR_ID = {
  'op-lamazonie-0027': 'Teste de carrinho, sem login nem compra, pela sessão de pautas ou de cupons; o resultado alimenta a `op-lamazonie-0007`',
  'op-lamazonie-0029': 'Bruno: uma mensagem à parceira; a resposta entra no dossiê',
  'op-lamazonie-0014': 'Bruno: pergunta à parceira; a resposta entra no dossiê e na página de cupom',
};
// Ressalvas de texto que a segunda passada da revisão deixou para a coordenação (REVISAO.md, "Achados novos").
const RESSALVA = {
  'op-lamazonie-0027': 'O bruto guarda o nome da oferta e a data ("Até 26/11"), não o endereço de destino do anúncio. Que o anúncio leva à página da oferta `cat-lamazonie-0046` é inferência pelo nome; abrir a página é parte da ação.',
  'op-lamazonie-0029': 'Ninguém viu as fotos dos anúncios da loja oficial no Mercado Livre (as páginas pedem login). Elas só ajudam se mostrarem o rótulo; o caminho firme é o pedido à marca.',
  'op-lamazonie-0012': 'O Bruno confirmou em 17/11 que o link de afiliado da loja oficial no Mercado Livre existe ou pode ser gerado. A dependência passa a ser só o endereço do link e o preço lido pelo botão, fora de campanha. O código CECILIA não vale lá.',
  'op-lamazonie-0013': 'O Bruno confirmou em 17/11 que o link de afiliado do Mercado Livre existe ou pode ser gerado: a pergunta da página de cupom pode levar o link, como nas outras lojas. Falta o endereço.',
  'op-lamazonie-0018': 'Registro, não pedido de artigo: prioridade e confiança baixas, e a primeira dependência é a decisão do Bruno. O fato útil desta linha já está na `op-lamazonie-0028`.',
  'op-lamazonie-0028': 'Quase sem sinal de busca; entra pela relevância comercial. Se o código não entrar na segunda página do sérum, a ação encolhe para o aviso que o guia de Black Friday já dá.',
};

const contar = (v) => (v.startsWith('@') ? v : `${v.split('|').length} (ids na matriz)`);
const ordem = { alta: 0, media: 1, baixa: 2 };
const acoes = ops.filter((o) => o.acao !== 'manter').sort((a, b) => ordem[a.prioridade] - ordem[b.prioridade] || a.oportunidade_id.localeCompare(b.oportunidade_id));
const manter = ops.filter((o) => o.acao === 'manter');

const out = [];
out.push(`# Recomendações: L'Amazonie

Gerado por \`gerar-recomendacoes.cjs\` a partir de \`3-matriz/matriz.csv\`. Não editar à mão: mudar a matriz e gerar de
novo. Primeiro piloto do Programa de Demanda, com coletas de 17/11/2026.

**Estado: ${ops.length} oportunidades revisadas (${acoes.length} com ação e ${manter.length} de manter). Todas passaram pela revisão
independente (\`3-matriz/REVISAO.md\`, duas passadas). Nenhuma foi decidida pelo Bruno ainda.**

Como ler: cada item traz o que a matriz registra. As métricas não são copiadas; os ids de evidência estão na linha da
matriz e levam ao bruto. Fato e leitura estão separados em \`3-matriz/LEITURA.md\`. O programa não mexe na Fila de
Pautas: o que o Bruno aprovar segue para o destino indicado.

## Ordem sugerida

1. \`op-lamazonie-0027\`: testar o código na oferta anunciada, **até 26/11**.
2. \`op-lamazonie-0029\`: pedir à parceira a lista de ingredientes e o número do processo de cada produto.
3. \`op-lamazonie-0007\`: atualizar o guia de Black Friday na semana de 27/11, com o resultado da primeira.

O resto não tem prazo. As páginas da loja têm um dia de dado: o primeiro export útil do Search Console é o de depois
de 30/11.

## Resumo

| Oportunidade | Ação | Prioridade | Confiança | Pergunta ou decisão atendida |
|---|---|---|---|---|`);
for (const o of acoes) out.push(`| \`${o.oportunidade_id}\` | ${o.acao} | ${o.prioridade} | ${o.confianca} | ${o.intencao} |`);

out.push('\n## Recomendações com ação\n');
for (const o of acoes) {
  out.push(`### ${o.oportunidade_id} · ${o.acao} · prioridade ${o.prioridade}

- **Pergunta ou decisão atendida:** ${o.intencao}
- **Evidência:** sinais: ${contar(o.sinais_ref)}; nossos dados: ${contar(o.nossos_dados_ref)}; comercial: ${contar(o.comercial_ref)}
- **Conteúdo existente:** cobertura: ${contar(o.cobertura_ref)}
- **O que falta hoje e o que a ação acrescenta:** ${o.lacuna}
- **Prioridade, e por quê:** ${o.prioridade}. ${o.justificativa_prioridade}
- **Confiança:** ${o.confianca}
- **Dependências e como obter:** ${o.dependencias}
- **Pendências e notas:** ${o.notas}${RESSALVA[o.oportunidade_id] ? `\n- **Ressalva da coordenação:** ${RESSALVA[o.oportunidade_id]}` : ''}
- **Destino, se aprovada:** ${DESTINO_POR_ID[o.oportunidade_id] || DESTINO_POR_ACAO[o.acao]}
- **Revisado por:** sessão de revisão independente, 17/11/2026
- **Decisão do Bruno:** em espera
`);
}

out.push(`## Manter como está

Resultado válido do programa: conteúdo que cobre o que existe de busca, ou tema em que não vale criar nada agora.

| Oportunidade | O que é | Por que manter | O que faria rever |
|---|---|---|---|`);
const cel = (s) => s.replace(/\|/g, '/').replace(/\n/g, ' ');
for (const o of manter) out.push(`| \`${o.oportunidade_id}\` | ${cel(o.intencao)} | ${cel(o.justificativa_prioridade)} | ${cel(o.dependencias)} |`);
out.push('');

fs.writeFileSync(path.join(__dirname, 'recomendacoes.md'), out.join('\n'));
console.log(`recomendacoes.md: ${acoes.length} com ação, ${manter.length} de manter`);
