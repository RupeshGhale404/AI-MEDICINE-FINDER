import {
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  Activity,
  Bot,
  Pill,
  Building2,
  Search,
  Edit,
  Lock,
  Bell,
  Globe,
  LogOut,
  ChevronRight,
} from "lucide-react";

import UserLayout from "../../components/user/UserLayout";
import { useAuth } from "../../context/AuthContext";

/* ─────────────────────────────────────────────
   Types & static data
───────────────────────────────────────────── */
type StatItem = {
  label: string;
  value: number | string;
  icon: React.ElementType;
  bg: string;
  iconColor: string;
};

const STATS: StatItem[] = [
  { label: "AI Chats", value: 18, icon: Bot, bg: "bg-blue-50", iconColor: "text-blue-600" },
  { label: "Medicines", value: 46, icon: Pill, bg: "bg-emerald-50", iconColor: "text-emerald-600" },
  { label: "Pharmacies", value: 12, icon: Building2, bg: "bg-orange-50", iconColor: "text-orange-600" },
  { label: "Searches", value: 64, icon: Search, bg: "bg-violet-50", iconColor: "text-violet-600" },
];

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
        <Icon className="h-5 w-5 text-blue-600" aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="truncate font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, bg, iconColor }: StatItem) {
  return (
    <div
      className={`rounded-2xl ${bg} p-5 text-center transition-transform duration-200 hover:scale-[1.03]`}
    >
      <Icon className={`mx-auto mb-3 h-6 w-6 ${iconColor}`} aria-hidden />
      <p className="text-3xl font-bold tracking-tight text-gray-900">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{label}</p>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
  variant = "primary",
}: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  variant?: "primary" | "danger" | "ghost";
}) {
  const base =
    "flex w-full items-center gap-3 rounded-xl px-4 py-3.5 font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-600",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600",
    ghost:
      "bg-gray-50 text-gray-700 hover:bg-gray-100 focus-visible:outline-gray-400",
  };

  return (
    <button type="button" onClick={onClick} className={`${base} ${variants[variant]}`}>
      <Icon className="h-5 w-5" aria-hidden />
      <span className="flex-1 text-left">{label}</span>
      <ChevronRight className="h-4 w-4 opacity-60" aria-hidden />
    </button>
  );
}

/* ─────────────────────────────────────────────
   Main Profile
───────────────────────────────────────────── */
function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <UserLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-gray-200" />
            <p className="text-gray-500">Loading profile…</p>
          </div>
        </div>
      </UserLayout>
    );
  }

  const joinedDate = (user as { createdAt?: string | number | Date }).createdAt
    ? new Date(
        (user as { createdAt?: string | number | Date }).createdAt as string | number | Date,
      ).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "July 2026";

  return (
    <UserLayout>
      <div className="mx-auto max-w-5xl space-y-6 pb-10">
        {/* ── Hero Header ─────────────────────────────── */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-6 text-white shadow-xl sm:p-8">
          {/* subtle pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg ring-4 ring-white/30 sm:h-28 sm:w-28">
                <User className="h-12 w-12 sm:h-14 sm:w-14" strokeWidth={1.5} />
              </div>
              <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-white">
                <span className="h-2 w-2 rounded-full bg-white" />
              </span>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {user.name}
              </h1>
              <p className="mt-1 text-blue-100">
                {user.role?.name ?? "User"} · AI Medicine Finder
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1 text-sm font-medium backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Active
              </div>
            </div>
          </div>
        </header>

        {/* ── Top Grid ────────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Personal Information */}
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-gray-900">
              Personal Information
            </h2>
            <div className="space-y-5">
              <InfoRow icon={User} label="Full Name" value={user.name} />
              <InfoRow icon={Mail} label="Email" value={user.email} />
              <InfoRow
                icon={Phone}
                label="Phone"
                value={user.phone ?? "Not added"}
              />
              <InfoRow
                icon={Shield}
                label="Role"
                value={user.role?.name ?? "—"}
              />
              <InfoRow icon={Calendar} label="Member since" value={joinedDate} />
            </div>
          </section>

          {/* Account Statistics */}
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="mb-6 text-lg font-bold text-gray-900">
              Account Statistics
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </section>
        </div>

        {/* ── Bottom Grid ─────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-bold text-gray-900">Quick Actions</h2>
            <div className="space-y-3">
              <ActionButton icon={Edit} label="Edit Profile" variant="primary" />
              <ActionButton
                icon={Lock}
                label="Change Password"
                variant="danger"
              />
              <ActionButton
                icon={LogOut}
                label="Sign Out"
                variant="ghost"
              />
            </div>
          </section>

          {/* Preferences */}
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-bold text-gray-900">Preferences</h2>
            <ul className="space-y-4">
              <li className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-gray-400" aria-hidden />
                  <span className="text-sm font-medium text-gray-700">
                    Notifications
                  </span>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  Enabled
                </span>
              </li>

              <li className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gray-400" aria-hidden />
                  <span className="text-sm font-medium text-gray-700">
                    Language
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-600">English</span>
              </li>

              <li className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-gray-400" aria-hidden />
                  <span className="text-sm font-medium text-gray-700">Theme</span>
                </div>
                <span className="text-sm font-medium text-gray-600">Light</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </UserLayout>
  );
}

export default Profile;