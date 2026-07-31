import { NavLink } from "react-router-dom";
import { IconHome2, IconScale, IconUser, IconPlus, IconReceipt2 } from "@tabler/icons-react";

const linkBase = "flex items-center gap-3 px-4 py-2.5 rounded-card text-sm font-medium transition";

export default function SideNav() {
  return (
    <aside className="hidden md:flex md:flex-col md:w-56 lg:w-64 border-r border-ink/10 px-4 py-8 gap-1 shrink-0">
      <div className="flex items-center gap-2 px-4 mb-6">
        <IconReceipt2 className="text-coral" size={22} stroke={1.8} />
        <span className="font-display font-bold text-ink">SplitTrack</span>
      </div>

      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${linkBase} ${isActive ? "bg-ink text-paper" : "text-ink/60 hover:bg-ink/5"}`
        }
      >
        <IconHome2 size={18} stroke={1.8} /> Dashboard
      </NavLink>
      <NavLink
        to="/settle"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? "bg-ink text-paper" : "text-ink/60 hover:bg-ink/5"}`
        }
      >
        <IconScale size={18} stroke={1.8} /> Settle up
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? "bg-ink text-paper" : "text-ink/60 hover:bg-ink/5"}`
        }
      >
        <IconUser size={18} stroke={1.8} /> Profile
      </NavLink>

      <NavLink
        to="/create-group"
        className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-card text-sm font-semibold bg-coral text-paper justify-center"
      >
        <IconPlus size={16} stroke={2.2} /> New group
      </NavLink>
    </aside>
  );
}
