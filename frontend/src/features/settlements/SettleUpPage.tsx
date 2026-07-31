import { useParams } from "react-router-dom";
import AppShell from "../../components/layouts/AppShell";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { groups, users } from "../../data/mockData";
import { calculateBalances, calculateSettlements } from "../../utils/settlement";
import { formatCurrency } from "../../utils/format";

export default function SettleUpPage() {
  const { groupId } = useParams();
  const group = groups.find((g) => g.id === groupId);

  if (!group) {
    return (
      <AppShell>
        <p className="p-5 text-ink/50 text-sm">Group not found.</p>
      </AppShell>
    );
  }

  const balances = calculateBalances(group);
  const settlements = calculateSettlements(balances);
  const getUser = (id: string) => users.find((u) => u.id === id)!;

  return (
    <AppShell>
      <div className="pt-6 md:max-w-md">
        <h1 className="font-display font-bold text-xl text-ink">Settle up</h1>
        <p className="text-xs text-ink/50 mb-5">Minimum payments to clear all debts in {group.name}</p>

        <div className="flex flex-col gap-2.5">
          {settlements.length === 0 && (
            <Card>
              <p className="text-sm text-ink/50 text-center py-4">Everyone's settled up.</p>
            </Card>
          )}
          {settlements.map((s, i) => (
            <Card key={i} className="flex justify-between items-center">
              <p className="text-sm font-medium text-ink">
                {getUser(s.from).name} <span className="text-ink/30 mx-1">→</span> {getUser(s.to).name}
              </p>
              <p className="font-mono font-semibold text-sm text-ink">{formatCurrency(s.amount)}</p>
            </Card>
          ))}
        </div>

        {settlements.length > 0 && (
          <Button variant="secondary" className="w-full mt-6">
            Mark all as paid
          </Button>
        )}
      </div>
    </AppShell>
  );
}
