// O markdown curto do texto dos artigos: [texto](/caminho ou https://…) e **negrito**. A página
// (AnimatedTextHighlight), o FAQPage do JSON-LD (review-template-props) e o texto do áudio e do tempo de
// leitura (contentSectionsToPlainText) leem o texto por aqui, para dizerem o mesmo que a tela. Sem imports:
// o AnimatedTextHighlight é componente de cliente.
const INLINE_MARKDOWN_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)|\*\*([^*]+)\*\*/g;

export type InlineSegment =
  | { type: 'text'; text: string }
  | { type: 'link'; text: string; href: string }
  | { type: 'bold'; text: string };

export function splitInlineMarkdown(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const pattern = new RegExp(INLINE_MARKDOWN_PATTERN);

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', text: text.slice(lastIndex, match.index) });
    }
    if (match[1] !== undefined && match[2] !== undefined) {
      segments.push({ type: 'link', text: match[1], href: match[2] });
    } else if (match[3] !== undefined) {
      segments.push({ type: 'bold', text: match[3] });
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length || segments.length === 0) {
    segments.push({ type: 'text', text: text.slice(lastIndex) });
  }
  return segments;
}

const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// O texto como a tela o mostra, sem a marcação.
export function inlineMarkdownToText(text: string): string {
  return splitInlineMarkdown(text).map((segment) => segment.text).join('');
}

// O texto em HTML, com o link e o negrito que a tela mostra: é o formato do acceptedAnswer do FAQPage.
// O href sai absoluto, porque o schema é lido fora da página.
export function inlineMarkdownToHtml(text: string, baseUrl: string): string {
  return splitInlineMarkdown(text)
    .map((segment) => {
      if (segment.type === 'link') return `<a href="${escapeHtml(new URL(segment.href, baseUrl).href)}">${escapeHtml(segment.text)}</a>`;
      if (segment.type === 'bold') return `<strong>${escapeHtml(segment.text)}</strong>`;
      return escapeHtml(segment.text);
    })
    .join('');
}
