import { Link } from "react-router-dom";
import { ArrowRight, Leaf, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const features = [
  {
    title: "Live Plant Monitoring",
    description: "Track moisture and light in real time with a dashboard built for quick decisions.",
    icon: Leaf,
  },
  {
    title: "Smart Automation",
    description: "Configure watering and pest control schedules from one control panel.",
    icon: SlidersHorizontal,
  },
  {
    title: "Reliable Operations",
    description: "Run your greenhouse routines with clear history data and admin-level visibility.",
    icon: ShieldCheck,
  },
];

export function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.3),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.28),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(245,158,11,0.22),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(148,163,184,.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,.15)_1px,transparent_1px)] [background-size:44px_44px]" />

      <header className="relative">
        <div className="bg-gradient-to-r from-green-400 to-green-500 px-6 py-5">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
            <div className="flex items-center gap -1 pl-1">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1607194402064-d0742de6d17b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGxlYWYlMjBwbGFudCUyMGxvZ298ZW58MXx8fHwxNzcyNjIzODU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="GreenPulse Logo"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/30"
              />
              <h1 className="text-2xl font-bold text-white">GreenPulse</h1>
            </div>
            <nav className="flex items-center gap-2">
              <Link
                to="/login"
                className="inline-flex items-center rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-green-700 transition hover:bg-emerald-50"
              >
                Register
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 pb-12 pt-10 md:grid-cols-[1.1fr_0.9fr] md:pt-16">
        <section className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
            Automation for modern agriculture
          </p>
          <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
            Manage your greenhouse from sensor to schedule.
          </h1>
          <p className="max-w-xl text-base text-slate-300 md:text-lg">
            GreenPulse helps growers monitor conditions, trigger controls, and optimize watering workflows from one focused control center.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
            >
              Start Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-500 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              Open Console
            </Link>
          </div>
        </section>

        <section className="grid gap-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5 backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-400/50"
            >
              <feature.icon className="mb-3 h-6 w-6 text-emerald-300" />
              <h2 className="mb-2 text-lg font-bold text-white">{feature.title}</h2>
              <p className="text-sm leading-relaxed text-slate-300">{feature.description}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
