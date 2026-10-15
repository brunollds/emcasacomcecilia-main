// O tempo das receitas num formato só, em toda vitrine e ficha: "25 min", "2h", "1h15", "1h05". Os JSONs
// trazem o tempo escrito de vários jeitos ("1 h 5 min", "1h 15 min", "1h15"); a leitura aceita todos.
// Sem imports: o campo de busca do topo (cliente, em toda página) também usa.

export function parseRecipeMinutes(value: string | null | undefined): number | null {
  if (!value) return null;
  const text = value.toLowerCase();
  const hours = text.match(/(\d+)\s*h/);
  // "1h15" (os minutos colados no h) ou "1 h 15 min".
  const minutes = text.match(/(\d+)\s*min/) ?? (hours ? text.match(/h\s*(\d+)/) : null);
  if (!hours && !minutes) return null;
  return (hours ? Number(hours[1]) * 60 : 0) + (minutes ? Number(minutes[1]) : 0);
}

export function formatMinutes(total: number): string {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h${String(minutes).padStart(2, '0')}`;
}

// O texto que não é tempo (ou que não se lê) sai como veio.
export function formatRecipeTime(value: string | null | undefined): string {
  const minutes = parseRecipeMinutes(value);
  return minutes === null ? (value ?? '').trim() : formatMinutes(minutes);
}
