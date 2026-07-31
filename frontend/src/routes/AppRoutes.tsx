import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import DashboardPage from "../features/groups/DashboardPage";
import CreateGroupPage from "../features/groups/CreateGroupPage";
import GroupDetailPage from "../features/groups/GroupDetailPage";
import AddExpensePage from "../features/expenses/AddExpensePage";
import SettleUpPage from "../features/settlements/SettleUpPage";
import { groups } from "../data/mockData";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<DashboardPage />} />
      <Route path="/create-group" element={<CreateGroupPage />} />
      <Route path="/groups/:groupId" element={<GroupDetailPage />} />
      <Route path="/groups/:groupId/add-expense" element={<AddExpensePage />} />
      <Route path="/groups/:groupId/settle" element={<SettleUpPage />} />
      {/* Generic nav-bar "Settle up" link has no group context yet, so it
          lands on the first group's settle page for now. Once real groups
          exist, this becomes a proper "pick a group" screen. */}
      <Route path="/settle" element={<Navigate to={`/groups/${groups[0].id}/settle`} replace />} />
    </Routes>
  );
}
