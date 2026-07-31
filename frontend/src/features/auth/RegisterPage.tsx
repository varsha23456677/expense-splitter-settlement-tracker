import { Link, useNavigate } from "react-router-dom";
import type { FormEvent } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function RegisterPage() {
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // No backend yet — once /api/auth/register exists, this posts the form
    // and then logs the new user straight in.
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-paper font-body flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h1 className="font-display font-bold text-2xl text-ink mb-1">Create account</h1>
        <p className="text-sm text-ink/50 mb-6">Start splitting expenses with friends.</p>
        <Input label="Full name" placeholder="Varshitha T" required />
        <Input label="Email" type="email" placeholder="name@email.com" required />
        <Input label="Password" type="password" placeholder="••••••••" required />
        <Button type="submit" variant="primary" className="w-full mt-2">
          Sign up
        </Button>
        <p className="text-sm text-ink/50 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-coral font-medium">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
