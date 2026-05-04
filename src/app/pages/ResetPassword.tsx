import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "../services/supabase";
import { sendPasswordReset } from "../services/auth";
import { GreenPulseHeader } from "../components/GreenPulseHeader";
import { Eye, EyeOff, Check } from "lucide-react";

export function ResetPassword() {
  const [isProcessing, setIsProcessing] = useState(true);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    const processSession = async () => {
      try {
        if (!supabase) throw new Error("Supabase not configured");

        // Supabase client may not expose getSessionFromUrl in some builds. Manually parse
        // the URL fragment for access_token/refresh_token and set the session.
        // The confirmation URL can look like: http://.../#/auth/reset#access_token=...&refresh_token=...
        // so we find the last '#' and parse the params after it.
        let fragment = window.location.hash || window.location.search || "";
        if (fragment.startsWith("#")) fragment = fragment.substring(1);
        const lastHash = fragment.lastIndexOf("#");
        let paramString = fragment;
        if (lastHash !== -1) {
          paramString = fragment.substring(lastHash + 1);
        }
        // If a '?' is present (some clients include query), strip the leading path
        const qIndex = paramString.indexOf("?");
        if (qIndex !== -1) paramString = paramString.substring(qIndex + 1);
        const params = new URLSearchParams(paramString);
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        // If Supabase returned an error (e.g. otp_expired) it will appear in the
        // fragment/query as `error`/`error_code`. Show a friendly message instead
        // of throwing so the user can request a new reset link.
        const errorCode = params.get("error_code") || params.get("error");
        if (errorCode) {
          let friendly = "Unable to process reset link.";
          if (errorCode.includes("otp_expired") || errorCode.includes("expired")) {
            friendly = "Reset link expired. Request a new reset email.";
          } else if (errorCode.includes("access_denied")) {
            friendly = "Reset link invalid or revoked. Request a new reset email.";
          }
          setErrorMsg(friendly);
          return;
        }

        if (access_token) {
          const { data, error } = await supabase.auth.setSession({ access_token, refresh_token });
          if (error) {
            setErrorMsg(error.message ?? "Failed to set session.");
            return;
          }
          // Clean up URL (remove tokens)
          try {
            const clean = `${window.location.origin}${window.location.pathname}`;
            window.history.replaceState({}, document.title, clean);
          } catch (_) {
            // ignore
          }
        } else {
          setErrorMsg("Auth session missing. Request a new reset email.");
          return;
        }
      } catch (err) {
        if (!active) return;
        const msg = err instanceof Error ? err.message : "Unable to process recovery link.";
        setErrorMsg(msg);
        toast.error(msg);
      } finally {
        if (active) setIsProcessing(false);
      }
    };

    void processSession();
    return () => {
      active = false;
    };
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    // Validate password strength: min 8, upper, lower, number, special
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!strongRegex.test(password)) {
      toast.error("Password must be at least 8 characters and include uppercase, lowercase, a number and a special character.");
      return;
    }

    setIsLoading(true);
    try {
      if (!supabase) throw new Error("Supabase not configured");
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSuccessMsg("Password updated. Please sign in.");
      toast.success("Password updated. Please sign in.");
      navigate("/login");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to update password.";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (isProcessing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-xl shadow-black/20">
          <p className="text-lg font-semibold">Processing reset link…</p>
          <p className="mt-3 text-sm text-slate-300">Please wait while we validate the recovery link.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <GreenPulseHeader />
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-xl shadow-black/20 w-full max-w-md">
        <h2 className="text-2xl font-semibold">Choose a new password</h2>
        <p className="mt-2 text-sm text-slate-300">Set a strong new password for your account.</p>

        <form onSubmit={onSubmit} className="mt-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-white/3 p-3 text-white pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md p-1 text-slate-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="relative mt-3">
            <input
              type={showConfirm ? "text" : "password"}
              required
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-white/3 p-3 text-white pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md p-1 text-slate-200"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="mt-3 text-left text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Check className={`h-4 w-4 ${password.length >= 8 ? "text-emerald-400" : "text-slate-600"}`} />
              <span>At least 8 characters</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className={`h-4 w-4 ${/[A-Z]/.test(password) ? "text-emerald-400" : "text-slate-600"}`} />
              <span>Uppercase letter</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className={`h-4 w-4 ${/[a-z]/.test(password) ? "text-emerald-400" : "text-slate-600"}`} />
              <span>Lowercase letter</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className={`h-4 w-4 ${/\d/.test(password) ? "text-emerald-400" : "text-slate-600"}`} />
              <span>Number</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className={`h-4 w-4 ${/[^A-Za-z0-9]/.test(password) ? "text-emerald-400" : "text-slate-600"}`} />
              <span>Special character</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full rounded-md bg-emerald-500 px-4 py-2 font-medium text-white disabled:opacity-60"
          >
            {isLoading ? "Updating…" : "Update password"}
          </button>
        </form>
        {errorMsg ? (
          <div className="mt-4">
            <p className="text-sm text-red-400">{errorMsg}</p>
            <div className="mt-3 flex justify-center">
              <button
                onClick={() => navigate('/forgot')}
                className="rounded-md bg-white/5 px-3 py-2 text-sm text-emerald-400"
              >
                Resend reset email
              </button>
            </div>
          </div>
        ) : null}

        {successMsg ? (
          <p className="mt-4 text-sm text-emerald-300">{successMsg}</p>
        ) : null}
      </div>
    </div>
  </>
  );
}
