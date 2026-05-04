import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { sendPasswordReset } from "../services/auth";
import { GreenPulseHeader } from "../components/GreenPulseHeader";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendPasswordReset(email.trim());
      toast.success("If an account exists, a reset email was sent.");
      navigate("/login");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send reset email.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <GreenPulseHeader />
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-xl shadow-black/20 w-full max-w-md">
        <h2 className="text-2xl font-semibold">Reset your password</h2>
        <p className="mt-2 text-sm text-slate-300">Enter the email for your account and we'll send a reset link.</p>

        <form onSubmit={onSubmit} className="mt-6">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-white/3 p-3 text-white"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full rounded-md bg-emerald-500 px-4 py-2 font-medium text-white disabled:opacity-60"
          >
            {isLoading ? "Sending…" : "Send reset email"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-400">
          Remembered your password? <button onClick={() => navigate('/login')} className="text-emerald-400">Sign in</button>
        </p>
        </div>
      </div>
    </>
  );
}
