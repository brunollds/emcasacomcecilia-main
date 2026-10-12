// JSON-LD dentro de <script>: o "<" vira a barra invertida seguida de u003c, e um texto com
// "</script>" não fecha a tag antes da hora. O JSON.parse devolve o texto original.
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
