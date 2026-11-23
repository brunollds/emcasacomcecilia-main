// Evita quebra de linha entre "R$" e o número em tabelas e no simulador.
export function keepCurrencyTogether(text: string): string {
  return text.replace(/R\$ (?=\d)/g, 'R$\u00a0');
}
