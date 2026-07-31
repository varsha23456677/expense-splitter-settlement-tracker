import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layouts/AppShell";
import Card from "../../components/ui/Card";
import { groups, currentUser } from "../../data/mockData";
import { calculateBalances } from "../../utils/settlement";
import { formatCurrency } from "../../utils/format";

export default function DashboardPage() {
  const navigate = useNavigate();

  const groupSummaries = groups.map((group) => {
    const balances = calculateBalances(group);
    return { group, myBalance: balances[currentUser.id] ?? 0 };
  });

  const totalOwedToYou = groupSummaries.reduce((sum, g) => sum + Math.max(g.myBalance, 0), 0);
  const totalYouOwe = groupSummaries.reduce((sum, g) => sum + Math.max(-g.myBalance, 0), 0);
  const net = totalOwedToYou - totalYouOwe;

  return (
    <AppShell>
      <div className="pt-6 flex justify-between items-center">
        <div>
          <h1 className="font-display font-bold text-xl md:text-2xl text-ink">Hey {currentUser.name}</h1>
          <p className="text-xs md:text-sm text-ink/50 mt-0.5">{groups.length} active groups</p>
        </div>
        <div
          className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-display font-bold text-sm text-white"
          style={{ backgroundColor: currentUser.color }}
        >
          {currentUser.name[0]}
        </div>
      </div>

      <div className="mt-4 bg-ink rounded-2xl p-5 md:p-6 md:max-w-sm">
        <p className="text-[11px] uppercase tracking-wide text-white/40">Net balance</p>
        <p
          className="font-mono font-medium text-2xl md:text-3xl mt-1.5"
          style={{ color: net >= 0 ? "#4ADE9C" : "#FF9478" }}
        >
          {net >= 0 ? "+ " : "- "}
          {formatCurrency(net)}
        </p>
        <div className="flex gap-6 mt-3">
          <div>
            <p className="text-[10px] text-white/35">owed to you</p>
            <p className="font-mono text-sm text-[#4ADE9C] mt-0.5">{formatCurrency(totalOwedToYou)}</p>
          </div>
          <div>
            <p className="text-[10px] text-white/35">you owe</p>
            <p className="font-mono text-sm text-[#FF9478] mt-0.5">{formatCurrency(totalYouOwe)}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 mb-2">
        <h2 className="font-display font-bold text-sm md:text-base text-ink">Your groups</h2>
        <button className="text-xs md:text-sm text-coral font-medium" onClick={() => navigate("/create-group")}>
          + New
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-3">
        {groupSummaries.map(({ group, myBalance }) => (
          <button key={group.id} onClick={() => navigate(`/groups/${group.id}`)} className="text-left">
            <Card dashed className="flex justify-between items-center">
              <div>
                <p className="font-medium text-sm text-ink">{group.name}</p>
                <p className="text-xs text-ink/40 mt-0.5">{group.memberIds.length} members</p>
              </div>
              <p className={`font-mono text-sm ${myBalance >= 0 ? "text-[#1FA97A]" : "text-[#E0563A]"}`}>
                {myBalance >= 0 ? "+" : "-"}
                {formatCurrency(myBalance)}
              </p>
            </Card>
          </button>
        ))}
      </div>
    </AppShell>
  );
}
