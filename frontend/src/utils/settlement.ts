import type { Group, SettlementItem } from "../types";

/**
 * Calculates each member's net balance within a group.
 * Positive = they are owed money. Negative = they owe money.
 *
 * NOTE: this currently treats every expense as an equal split regardless of
 * its splitType, purely so the UI has real numbers to render. The backend's
 * SettlementService will implement the actual percentage/custom split math —
 * this frontend copy exists only to preview the UI before that's built.
 */
export function calculateBalances(group: Group): Record<string, number> {
  const balances: Record<string, number> = {};
  group.memberIds.forEach((id) => (balances[id] = 0));

  group.expenses.forEach((expense) => {
    const share = expense.amount / group.memberIds.length;
    group.memberIds.forEach((memberId) => {
      if (memberId === expense.paidBy) {
        balances[memberId] += expense.amount - share;
      } else {
        balances[memberId] -= share;
      }
    });
  });

  return balances;
}

/**
 * Greedy settlement algorithm: repeatedly matches the largest debtor with the
 * largest creditor, minimizing the total number of transactions needed to
 * clear all balances in the group.
 */
export function calculateSettlements(balances: Record<string, number>): SettlementItem[] {
  const entries = Object.entries(balances).map(([id, amount]) => ({ id, amount }));
  const creditors = entries.filter((e) => e.amount > 0.5).sort((a, b) => b.amount - a.amount);
  const debtors = entries.filter((e) => e.amount < -0.5).sort((a, b) => a.amount - b.amount);

  const settlements: SettlementItem[] = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const amount = Math.min(-debtor.amount, creditor.amount);

    settlements.push({ from: debtor.id, to: creditor.id, amount: Math.round(amount) });

    debtor.amount += amount;
    creditor.amount -= amount;

    if (Math.abs(debtor.amount) < 1) i++;
    if (Math.abs(creditor.amount) < 1) j++;
  }

  return settlements;
}
