import { useParams, useNavigate } from "react-router-dom";
import AppShell from "../../components/layouts/AppShell";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { groups, users } from "../../data/mockData";
import { calculateBalances } from "../../utils/settlement";
import { formatCurrency } from "../../utils/format";

export default function GroupDetailPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const group = groups.find((g) => g.id === groupId);

  if (!group) {
    return (
      <AppShell>
        <p className="p-5 text-ink/50 text-sm">Group not found.</p>
      </AppShell>
    );
  }

  const balances = calculateBalances(group);
  const getUser = (id: string) => users.find((u) => u.id === id)!;

  const splitLabel = {
    equal: "split equally",
    percentage: "split by percentage",
    custom: "custom split",
  };

  return (
    <AppShell>
      <div className="pt-6">
        <h1 className="font-display font-bold text-lg md:text-2xl text-ink">{group.name}</h1>
        <div className="flex mt-2">
          {group.memberIds.map((id) => {
            const u = getUser(id);
            return (
              <div
                key={id}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white -ml-2 first:ml-0 border-2 border-paper"
                style={{ backgroundColor: u.color }}
              >
                {u.name[0]}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-display font-bold text-sm text-ink mb-2">Expenses</h2>
          <div className="flex flex-col gap-2.5">
            {group.expenses.map((expense) => (
              <Card key={expense.id} dashed>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-ink">{expense.description}</p>
                    <p className="text-xs text-ink/40 mt-0.5">
                      Paid by {getUser(expense.paidBy).name} · {splitLabel[expense.splitType]}
                    </p>
                  </div>
                  <p className="font-mono text-sm text-ink">{formatCurrency(expense.amount)}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display font-bold text-sm text-ink mb-2">Balances</h2>
          <Card>
            <div className="flex flex-col gap-2.5">
              {group.memberIds.map((id) => {
                const bal = balances[id];
                const u = getUser(id);
                return (
                  <div key={id} className="flex justify-between text-sm">
                    <span className="text-ink/70">{u.name}</span>
                    <span className={`font-mono ${bal >= 0 ? "text-[#1FA97A]" : "text-[#E0563A]"}`}>
                      {bal >= 0 ? "+" : "-"}
                      {formatCurrency(bal)}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          <Button
            variant="secondary"
            className="w-full mt-4"
            onClick={() => navigate(`/groups/${group.id}/settle`)}
          >
            Settle up
          </Button>
        </div>
      </div>

      <button
        onClick={() => navigate(`/groups/${group.id}/add-expense`)}
        className="fixed bottom-24 md:bottom-10 right-6 md:right-10 rounded-full bg-coral text-paper flex items-center justify-center shadow-lg shadow-coral/40 text-2xl font-light"
        style={{ width: 52, height: 52 }}
        aria-label="Add expense"
      >
        +
      </button>
    </AppShell>
  );
}
