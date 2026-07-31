import type { User, Group } from "../types";

// Temporary fake data. Once the backend exists, this whole file gets replaced
// by real API calls in services/ — the pages themselves won't need to change,
// since they only care about the User/Group/Expense shapes, not where the data
// comes from.

export const currentUser: User = { id: "u1", name: "You", color: "#FF6B4A" };

export const users: User[] = [
  currentUser,
  { id: "u2", name: "Ravi", color: "#4ADE9C" },
  { id: "u3", name: "Anu", color: "#5D8CFF" },
  { id: "u4", name: "Sam", color: "#F2C744" },
];

export const groups: Group[] = [
  {
    id: "g1",
    name: "Goa Trip 2026",
    memberIds: ["u1", "u2", "u3", "u4"],
    expenses: [
      { id: "e1", description: "Hotel booking", amount: 6000, paidBy: "u1", splitType: "equal" },
      { id: "e2", description: "Dinner at beach shack", amount: 3000, paidBy: "u2", splitType: "equal" },
      { id: "e3", description: "Cab fares", amount: 1500, paidBy: "u3", splitType: "custom" },
    ],
  },
  {
    id: "g2",
    name: "Flatmates",
    memberIds: ["u1", "u2", "u3"],
    expenses: [
      { id: "e4", description: "Groceries", amount: 2400, paidBy: "u1", splitType: "equal" },
      { id: "e5", description: "Wifi bill", amount: 1200, paidBy: "u2", splitType: "equal" },
    ],
  },
];
