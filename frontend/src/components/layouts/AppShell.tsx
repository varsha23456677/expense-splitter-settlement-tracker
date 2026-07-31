import type { ReactNode } from "react";
import BottomNav from "./BottomNav";

// Inline lightweight SideNav fallback to avoid import errors when the external
// SideNav module is missing. Keeps layout behavior for md+ screens.
const SideNav = () => (
  <aside className="hidden md:flex md:w-64 md:flex-col md:items-stretch md:py-4">
    <nav className="w-full px-4">
      {/* Minimal placeholder nav */}
      <div className="text-sm font-semibold text-muted">Navigation</div>
    </nav>
  </aside>
);

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper font-body md:flex">
      {/* Side nav only renders on md+ screens (see hidden md:flex inside it) */}
      <SideNav />

      {/* pb-24 leaves room for the fixed bottom nav on mobile; md:pb-10 removes
          that gap on desktop since the bottom nav is hidden there */}
      <div className="flex-1 pb-24 md:pb-10">
        <div className="max-w-3xl mx-auto px-5 md:px-10 md:py-2">{children}</div>
      </div>

      <BottomNav />
    </div>
  );
}
