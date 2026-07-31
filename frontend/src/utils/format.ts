export function formatCurrency(amount: number): string {
  return `₹${Math.abs(Math.round(amount)).toLocaleString("en-IN")}`;
}
