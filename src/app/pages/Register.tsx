import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, UserPlus, X } from "lucide-react";
import { toast } from "sonner";
import { Landing } from "./Landing";
import { signUpUser } from "../services/auth";

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isPasswordValid = (value: string): boolean => {
    const trimmed = value.trim();
    const hasLowercase = /[a-z]/.test(trimmed);
    const hasUppercase = /[A-Z]/.test(trimmed);
    const hasDigit = /\d/.test(trimmed);
    const hasSpecial = /[^A-Za-z\d]/.test(trimmed);
    return trimmed.length >= 8 && hasLowercase && hasUppercase && hasDigit && hasSpecial;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please complete all fields.");
      return;
    }

    if (!/^[^@]+@gmail\.com$/i.test(email.trim())) {
      toast.error("Please use a Gmail address (example@gmail.com).");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!isPasswordValid(password)) {
      toast.error("Password must be at least 8 characters long and include uppercase and lowercase letters, numbers, and a special character.");
      return;
    }

    const normalizedUsername = username.trim().toLowerCase();
    const normalizedPassword = password.trim().toLowerCase();
    if (
      normalizedPassword === normalizedUsername ||
      normalizedPassword === email.trim().toLowerCase() ||
      normalizedPassword.includes(normalizedUsername)
    ) {
      toast.error("Password must not match or contain your username or email.");
      return;
    }

    try {
      await signUpUser({ username, email, password });
      toast.success("Account created. Await admin approval.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Account creation failed.";
      toast.error(message);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 select-none">
        <Landing />
      </div>
      <div className="absolute inset-0 bg-slate-950/55 backdrop-blur-[2px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-3xl border border-emerald-100 bg-white p-7 shadow-[0_25px_70px_-32px_rgba(6,95,70,0.55)]">
        <Link
          to="/"
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-emerald-300 hover:text-emerald-600"
        >
          <X className="h-4 w-4" />
        </Link>
        <h1 className="mb-1 text-3xl font-black text-slate-900">Create your account</h1>
        <p className="mb-6 text-sm text-slate-600">Get full access to GreenPulse automation and insights.</p>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="username" className="mb-1 block text-sm font-semibold text-slate-700">
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Choose a username"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="register-email" className="mb-1 block text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your Gmail address"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label htmlFor="register-password" className="mb-1 block text-sm font-semibold text-slate-700">
              Password
            </label>
            <div className="relative">
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-11 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 inset-y-0 z-20 flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Must be at least 8 characters and include uppercase and lowercase letters, numbers, and a special character.
            </p>
          </div>

          <div>
            <label htmlFor="confirm-password" className="mb-1 block text-sm font-semibold text-slate-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-11 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 inset-y-0 z-20 flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <UserPlus className="h-4 w-4" />
            Register
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-emerald-700 hover:text-emerald-600">
            Sign in
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
}
