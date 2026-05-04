import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Controls } from "./pages/Controls";
import { History } from "./pages/History";
import { ManagedSensorHistory } from "./pages/ManagedSensorHistory";
import { SwitchHistory } from "./pages/SwitchHistory";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Admin } from "./pages/Admin";
import { Approvals } from "./pages/Approvals";
import { AuthCallback } from "./pages/AuthCallback";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { SensorProvider } from "./context/SensorContext";
import { getCurrentUserProfile } from "./services/auth";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Home, Settings, BarChart3, Menu, X, LogOut } from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { signOutUser } from "./services/auth";

function MobileConsoleShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

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

  const menuItems = [
    { title: "Dashboard", icon: Home, path: "/dashboard" },
    { title: "Controls", icon: Settings, path: "/controls" },
    { title: "History", icon: BarChart3, path: "/history" },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen w-full flex-col bg-white">
        <div className="bg-gradient-to-r from-green-500 to-green-400 px-4 py-4 md:px-6 md:py-5 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3 pl-3">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1607194402064-d0742de6d17b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGxlYWYlMjBwbGFudCUyMGxvZ298ZW58MXx8fHwxNzcyNjIzODU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="GreenPulse Logo"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white/30"
            />
            <span className="text-2xl font-bold text-white">GreenPulse</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="sm:hidden inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 p-2 text-white"
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="hidden bg-white border-b border-gray-200 px-2 md:px-4 sm:grid grid-cols-3 gap-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-center gap-1 px-2 py-3 md:py-3.5 border-b-2 transition-colors min-w-0 ${
                  isActive
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-medium truncate">{item.title}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile sliding sidebar (overlay) */}
        {mobileNavOpen ? (
          <div className="sm:hidden fixed inset-0 z-50 flex">
            {/* overlay */}
            <div
              aria-hidden="true"
              role="button"
              onClick={() => setMobileNavOpen(false)}
              className="absolute inset-0 bg-black/40"
            />

            {/* panel */}
            <aside
              role="dialog"
              aria-label="Mobile navigation"
              className="relative ml-auto w-72 max-w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden"
              style={{ transform: mobileNavOpen ? "translateX(0)" : "translateX(100%)" }}
            >
              <div className="flex items-center justify-between px-4 py-3 bg-[#00BA4A]">
                <Link to="/dashboard" className="flex items-center gap-3">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1607194402064-d0742de6d17b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGxlYWYlMjBwbGFudCUyMGxvZ298ZW58MXx8fHwxNzcyNjIzODU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="GreenPulse Logo"
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-white/30"
                    />
                    <span className="text-lg font-semibold text-white">GreenPulse</span>
                  </Link>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 rounded-md bg-white/20 px-2 py-1 text-white hover:bg-white/30"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileNavOpen(false)}
                    className="inline-flex items-center justify-center rounded-md bg-white/10 p-2 text-white hover:bg-white/20"
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <nav className="px-3 py-4">
                <ul className="flex flex-col gap-1">
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <li key={`mobile-${item.path}`}> 
                        <Link
                          to={item.path}
                          onClick={() => setMobileNavOpen(false)}
                          className={`flex items-center gap-3 w-full rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                            isActive ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <item.icon className="h-5 w-5 text-gray-600" />
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          </div>
        ) : null}

        <div
          className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 sm:px-4 md:px-6 md:py-6"
          style={{ scrollbarGutter: "stable both-edges" }}
        >
          <div className="mx-auto w-full lg:max-w-5xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProtectedRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;
    const validateAuth = async () => {
      const profile = await getCurrentUserProfile();
      if (!active) {
        return;
      }
      setIsAuthenticated(Boolean(profile));
      setIsLoading(false);
    };
    void validateAuth();
    return () => {
      active = false;
    };
  }, []);

  if (isLoading) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function PublicRoute() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const validateAuth = async () => {
      // If we're on the auth callback/reset pages, allow them to process
      // the URL fragment first instead of immediately redirecting an
      // already-authenticated user back to the dashboard.
      if (location.pathname === "/auth/reset" || location.pathname === "/auth/callback") {
        if (!active) return;
        setIsLoading(false);
        return;
      }
      const profile = await getCurrentUserProfile();
      if (!active) {
        return;
      }

      if (profile) {
        setRedirectPath(profile.role === "admin" ? "/admin" : "/dashboard");
      }
      setIsLoading(false);
    };
    void validateAuth();
    return () => {
      active = false;
    };
  }, []);

  if (isLoading) {
    return null;
  }

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

function AppContent() {
  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/auth/reset" element={<ResetPassword />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/approvals" element={<Approvals />} />
          <Route path="/" element={<MobileConsoleShell />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="controls" element={<Controls />} />
            <Route path="history" element={<History />} />
            <Route path="history/switch" element={<SwitchHistory />} />
            <Route path="history/sensors" element={<Navigate to="/history" replace />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SensorProvider>
        <AppContent />
      </SensorProvider>
    </BrowserRouter>
  );
}
