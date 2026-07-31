import { NavLink } from "react-router-dom";
import { IconHome2, IconUsers, IconPlus, IconScale, IconUser } from "@tabler/icons-react";

export default function BottomNav() {
  const inactive = "text-ink/25";
  const active = "text-ink";

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-paper border-t border-ink/10 flex justify-around items-center py-3">
      <NavLink to="/" end className={({ isActive }) => (isActive ? active : inactive)}>
        <IconHome2 size={22} stroke={1.8} />
      </NavLink>
      <NavLink to="/" className={({ isActive }) => (isActive ? active : inactive)}>
        <IconUsers size={22} stroke={1.8} />
      </NavLink>
      <NavLink
        to="/"
        className="w-11 h-11 rounded-full bg-coral flex items-center justify-center -mt-6 shadow-lg shadow-coral/40 text-paper"
      >
        <IconPlus size={20} stroke={2.2} />
      </NavLink>
      <NavLink to="/settle" className={({ isActive }) => (isActive ? active : inactive)}>
        <IconScale size={22} stroke={1.8} />
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => (isActive ? active : inactive)}>
        <IconUser size={22} stroke={1.8} />
      </NavLink>
    </nav>
  );
}
