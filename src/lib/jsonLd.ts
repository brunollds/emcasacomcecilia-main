// JSON-LD dentro de <script>: o "<" vira a sequência de escape < do JSON, e um texto com
// "</script>" não fecha a tag antes da hora. O JSON.parse devolve o texto original.
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
