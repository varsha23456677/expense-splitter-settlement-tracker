import { useNavigate } from "react-router-dom";
import type { FormEvent } from "react";
import AppShell from "../../components/layouts/AppShell";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function CreateGroupPage() {
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // No backend yet — once /api/groups (POST) exists, this creates the
    // group and navigates to its detail page using the returned id.
    navigate("/");
  }

  return (
    <AppShell>
      <form onSubmit={handleSubmit} className="pt-6 md:max-w-md">
        <h1 className="font-display font-bold text-xl text-ink mb-5">Create a group</h1>
        <Input label="Group name" placeholder="Goa Trip 2026" required />
        <Input label="Add members (comma separated emails)" placeholder="ravi@email.com, anu@email.com" />
        <Button type="submit" variant="primary" className="w-full mt-2">
          Create group
        </Button>
      </form>
    </AppShell>
  );
}
