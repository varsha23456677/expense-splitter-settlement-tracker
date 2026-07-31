export interface User {
  id: string;
  name: string;
  color: string;
}

export type SplitType = "equal" | "percentage" | "custom";

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string; // user id
  splitType: SplitType;
}

export interface Group {
  id: string;
  name: string;
  memberIds: string[];
  expenses: Expense[];
}

export interface SettlementItem {
  from: string;
  to: string;
  amount: number;
}
