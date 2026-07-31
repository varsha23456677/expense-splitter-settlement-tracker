import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppShell from "../../components/layouts/AppShell";
import Input from "../../components/ui/Input";
import Chip from "../../components/ui/Chip";
import Button from "../../components/ui/Button";
import { groups, users } from "../../data/mockData";
import type { SplitType } from "../../types";

export default function AddExpensePage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const group = groups.find((g) => g.id === groupId);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(users[0].id);
  const [splitType, setSplitType] = useState<SplitType>("equal");

  if (!group) {
    return (
      <AppShell>
        <p className="p-5 text-ink/50 text-sm">Group not found.</p>
      </AppShell>
    );
  }

  function handleSave() {
    // No backend yet — once /api/groups/{id}/expenses (POST) exists, this
    // sends { description, amount, paidBy, splitType } and navigates back.
    navigate(`/groups/${groupId}`);
  }

  return (
    <AppShell>
      <div className="pt-6 md:max-w-md">
        <h1 className="font-display font-bold text-xl text-ink">Add an expense</h1>
        <p className="text-xs text-ink/50 mb-5">{group.name}</p>

        <Input
          label="Description"
          placeholder="Dinner at beach shack"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          label="Amount"
          type="number"
          placeholder="3000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="font-mono text-lg"
        />

        <span className="block text-xs font-semibold uppercase tracking-wide text-ink/50 mb-1.5">
          Paid by
        </span>
        <div className="flex flex-wrap gap-2 mb-4">
          {group.memberIds.map((id) => {
            const u = users.find((x) => x.id === id)!;
            return (
              <Chip key={id} label={u.name} selected={paidBy === id} onClick={() => setPaidBy(id)} />
            );
          })}
        </div>

        <span className="block text-xs font-semibold uppercase tracking-wide text-ink/50 mb-1.5">
          Split type
        </span>
        <div className="flex flex-wrap gap-2 mb-6">
          <Chip label="Equally" selected={splitType === "equal"} onClick={() => setSplitType("equal")} />
          <Chip
            label="Percentage"
            selected={splitType === "percentage"}
            onClick={() => setSplitType("percentage")}
          />
          <Chip label="Custom" selected={splitType === "custom"} onClick={() => setSplitType("custom")} />
        </div>

        <Button variant="primary" className="w-full" onClick={handleSave}>
          Save expense
        </Button>
      </div>
    </AppShell>
  );
}
