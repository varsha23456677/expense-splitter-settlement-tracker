import { Link, useNavigate } from "react-router-dom";
import type { FormEvent } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function LoginPage() {
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // No backend yet — once /api/auth/login exists, this posts the form
    // and stores the returned JWT before navigating.
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-paper font-body flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h1 className="font-display font-bold text-2xl text-ink mb-1">Welcome back</h1>
        <p className="text-sm text-ink/50 mb-6">Log in to see your groups.</p>
        <Input label="Email" type="email" placeholder="name@email.com" required />
        <Input label="Password" type="password" placeholder="••••••••" required />
        <Button type="submit" variant="primary" className="w-full mt-2">
          Log in
        </Button>
        <p className="text-sm text-ink/50 text-center mt-4">
          No account?{" "}
          <Link to="/register" className="text-coral font-medium">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
