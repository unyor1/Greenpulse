import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { handleGoogleCallback } from "../services/auth";
import { supabase } from "../services/supabase";

export function AuthCallback() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const finalizeGoogleLogin = async () => {
      try {
        // Handle possible double-hash OAuth callback by extracting tokens
        // from the fragment and setting the Supabase session if present.

        const profile = await handleGoogleCallback();
        if (!active) return;

        if (!profile) {
          toast.error("Google authentication failed. Please try again.");
          navigate("/login");
          return;
        }

        toast.success("Signed in with Google.");
        navigate(profile.role === "admin" ? "/admin" : "/dashboard");
      } catch (err) {
        if (!active) return;
        const message = err instanceof Error ? err.message : "Google sign in failed.";
        toast.error(message);
        navigate("/login");
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void finalizeGoogleLogin();
    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-xl shadow-black/20">
        <p className="text-lg font-semibold">Finishing Google sign-in…</p>
        <p className="mt-3 text-sm text-slate-300">
          {isLoading ? "Please wait while we verify your account." : "Redirecting..."}
        </p>
      </div>
    </div>
  );
}
