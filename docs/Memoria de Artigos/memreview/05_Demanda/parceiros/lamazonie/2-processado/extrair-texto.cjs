// Extrai o texto visível de um HTML guardado da loja (Shopify).
// Uso: node extrair-texto.cjs <entrada.html> <saida.txt> [main|body]
//
// - "main" (padrão) pega só o <main>; "body" pega o <body> inteiro (menu, faixa do topo e rodapé inclusive).
// - Cada link vira "[link: endereço] texto".
// - Os blocos de avaliações de clientes (Judge.me) e de depoimentos do tema saem e deixam a marca "[avaliações de clientes omitidas]":
//   eles trazem nome e cidade de quem avaliou, e dado pessoal de terceiro não entra no repositório.
// - Linhas iguais em sequência viram uma só (o "Ampliar" de cada foto da galeria).
// Sem dependências. A mesma entrada dá sempre a mesma saída.
const fs = require('fs');

const [, , entrada, saida, alcance = 'main'] = process.argv;
if (!entrada || !saida) {
  console.error('Uso: node extrair-texto.cjs <entrada.html> <saida.txt> [main|body]');
  process.exit(1);
}

const ENTIDADES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const MARCA_AVALIACOES = '[avaliações de clientes omitidas]';

function decodificar(texto) {
  return texto
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (inteiro, nome) => ENTIDADES[nome.toLowerCase()] ?? inteiro);
}

// Tira cada <div> de avaliação ou depoimento inteiro, contando os <div> de dentro até o fechamento dele.
function tirarAvaliacoes(html) {
  const abertura = /<div\b[^>]*\b(?:jdgm-(?:ssr-|rev-widg|carousel|all-reviews|widget)|testimonial__item)[^>]*>/i;
  let resto = html;
  let saidaHtml = '';
  for (;;) {
    const achado = abertura.exec(resto);
    if (!achado) return saidaHtml + resto;
    const divs = /<div\b|<\/div>/gi;
    divs.lastIndex = achado.index + achado[0].length;
    let nivel = 1;
    let fim = resto.length;
    for (let m = divs.exec(resto); m; m = divs.exec(resto)) {
      nivel += m[0] === '</div>' ? -1 : 1;
      if (nivel === 0) {
        fim = divs.lastIndex;
        break;
      }
    }
    saidaHtml += `${resto.slice(0, achado.index)}<p>${MARCA_AVALIACOES}</p>`;
    resto = resto.slice(fim);
  }
}

const html = fs.readFileSync(entrada, 'utf8');
const tag = alcance === 'body' ? 'body' : 'main';
const trecho = html.match(tag === 'body' ? /<body[\s>][\s\S]*<\/body>/i : /<main[\s>][\s\S]*<\/main>/i);
if (!trecho) {
  console.error(`Sem <${tag}> em ${entrada}`);
  process.exit(1);
}

const semRuido = trecho[0]
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, '');

const linhas = decodificar(
  tirarAvaliacoes(semRuido)
    .replace(/<a\b[^>]*?\bhref="([^"]*)"[^>]*>/gi, '\n[link: $1] ')
    .replace(/<\/?(p|div|section|article|header|footer|nav|li|ul|ol|h[1-6]|br|tr|table|details|summary|button|a|form|label|option|select)\b[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
)
  .split('\n')
  .map((linha) => linha.replace(/\s+/g, ' ').trim())
  .filter(Boolean)
  .filter((linha, i, todas) => linha !== todas[i - 1]);

fs.writeFileSync(saida, linhas.join('\n') + '\n', 'utf8');
