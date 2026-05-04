import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, X } from "lucide-react";
import { toast } from "sonner";
import { Landing } from "./Landing";
import { signInUser, signInWithGoogle } from "../services/auth";

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password) {
      toast.error("Please fill in username and password.");
      return;
    }

    setLoginError("");

    try {
      const profile = await signInUser({ username, password });
      toast.success("Signed in successfully.");
      navigate(profile.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign in failed.";
      setLoginError(message);
      toast.error(message);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Google sign in failed.";
      toast.error(message);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 select-none">
        <Landing />
      </div>
      <div className="absolute inset-0 bg-slate-950/55 backdrop-blur-[2px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-md rounded-3xl border border-emerald-200 bg-white/95 p-7 shadow-[0_24px_70px_-30px_rgba(5,150,105,0.65)] backdrop-blur">
        <Link
          to="/"
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-emerald-300 hover:text-emerald-600"
        >
          <X className="h-4 w-4" />
        </Link>
        <h1 className="mb-1 text-3xl font-black text-slate-900">Welcome back</h1>
        <p className="mb-6 text-sm text-slate-600">Login to continue managing your greenhouse.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-semibold text-slate-700">
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="your username"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-semibold text-slate-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-11 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 inset-y-0 z-20 flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between">
              {loginError ? <p className="text-sm text-red-600">{loginError}</p> : <span />}
              <Link to="/forgot" className="text-sm font-semibold text-emerald-700 hover:text-emerald-600">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            <LogIn className="h-4 w-4" />
            Login
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          OR
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {googleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        <p className="mt-5 text-sm text-slate-600">
          New here?{" "}
          <Link to="/register" className="font-semibold text-emerald-700 hover:text-emerald-600">
            Create an account
          </Link>
        </p>
      
        </div>
      </div>
    </div>
  );
}
