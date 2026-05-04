import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, ShieldCheck, UserCheck, UserX } from "lucide-react";
import { getCurrentUserProfile } from "../services/auth";
import { toast } from "sonner";
import { approveUser, getPendingApprovals, rejectUser, signOutUser, UserProfile } from "../services/auth";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Approvals() {
  const navigate = useNavigate();
  const [pending, setPending] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const loadApprovals = async () => {
    setLoading(true);
    try {
      const rows = await getPendingApprovals();
      setPending(rows);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to load approvals";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadApprovals();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadProfile = async () => {
      const profile = await getCurrentUserProfile();
      if (!cancelled && profile?.username) setUsername(profile.username);
    };
    void loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleApprove = async (userId: string) => {
    try {
      await approveUser(userId);
      toast.success("User approved.");
      setPending((prev) => prev.filter((item) => item.id !== userId));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Approval failed";
      toast.error(message);
    }
  };

  const handleReject = async (userId: string) => {
    try {
      await rejectUser(userId);
      toast.success("User rejected.");
      setPending((prev) => prev.filter((item) => item.id !== userId));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Rejection failed";
      toast.error(message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign out failed.";
      toast.error(message);
    } finally {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-gradient-to-r from-green-500 to-green-400 px-4 py-4 md:px-6 md:py-5 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-3">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1607194402064-d0742de6d17b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGxlYWYlMjBwbGFudCUyMGxvZ298ZW58MXx8fHwxNzcyNjIzODU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="GreenPulse Logo"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white/30"
          />
          <span className="text-2xl font-bold text-white">GreenPulse</span>
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      <div className="p-5 md:p-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 p-6 text-white shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Control Center</p>
              <h1 className="mt-2 text-3xl font-black md:text-4xl">User Approvals</h1>
              <p className="mt-2 text-sm text-emerald-100">{username ? `Welcome, ${username}` : "Welcome, Admin"}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/admin"
                className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 hover:text-white"
              >
                Back to Admin
              </Link>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900">Pending Accounts</h2>
          </div>

          {loading ? (
            <div className="text-sm text-slate-500">Loading approvals...</div>
          ) : pending.length === 0 ? (
            <div className="text-sm text-slate-500">No pending approvals.</div>
          ) : (
            <div className="space-y-3">
              {pending.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{user.username || "No username"}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                    <p className="text-xs text-slate-400">
                      Requested {user.createdAt ? new Date(user.createdAt).toLocaleString() : ""}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleApprove(user.id)}
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500"
                    >
                      <UserCheck className="h-4 w-4" />
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(user.id)}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      <UserX className="h-4 w-4" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      </div>
    </div>
  );
}
