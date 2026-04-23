/**
 * Formata um número para Moeda BRL (ex: R$ 1.500,00)
 */
export function formatBRL(n: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n || 0);
}

/**
 * Converte um input de string formatada de moeda para um número de ponto flutuante
 */
export function parseCurrencyInput(value: string): number {
  const digits = value.replace(/\D/g, "");
  const num = Number(digits) / 100;
  return Number.isFinite(num) ? num : 0;
}

/**
 * Formata uma string para o padrão de CPF (ex: 111.222.333-44)
 */
export function formatCPFInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const parts = [];
  if (digits.length > 0) parts.push(digits.slice(0, 3));
  if (digits.length >= 4) parts.push(digits.slice(3, 6));
  if (digits.length >= 7) parts.push(digits.slice(6, 9));
  const suffix = digits.length >= 10 ? digits.slice(9, 11) : digits.slice(9);
  const body = parts.join(".");
  return suffix ? `${body}-${suffix}` : body;
}

/**
 * Remove qualquer caractere que não seja número de uma string
 */
export function unformatNumbers(value: string): string {
  return value.replace(/\D/g, "");
}
