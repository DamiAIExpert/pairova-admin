"use client";

import React from "react";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
  Cell,
} from "recharts";
import {
  Users,
  Handshake,
  MousePointerClick,
  ThumbsUp,
  MessageSquare,
  Search,
  MoreVertical,
  ChevronDown,
  CheckCircle2,
  Clock3,
  XCircle,
  ArrowUpRight,
} from "lucide-react";
import YearSelect from "@/components/YearSelect";

/* ----------------------------- DATA ----------------------------- */

interface ChartDatum {
  name: string;
  value: number;
}

const performance2024: ChartDatum[] = [
  { name: "Jan", value: 1500 },
  { name: "Feb", value: 1800 },
  { name: "Mar", value: 2250 },
  { name: "Apr", value: 2100 },
  { name: "May", value: 2300 },
  { name: "Jun", value: 2200 },
  { name: "Jul", value: 2500 },
  { name: "Aug", value: 2600 },
  { name: "Sep", value: 2800 },
  { name: "Oct", value: 2700 },
  { name: "Nov", value: 2850 },
  { name: "Dec", value: 2900 },
];

const performance2022: ChartDatum[] = [
  { name: "Jan", value: 900 },
  { name: "Feb", value: 1100 },
  { name: "Mar", value: 1500 },
  { name: "Apr", value: 1400 },
  { name: "May", value: 1750 },
  { name: "Jun", value: 1600 },
  { name: "Jul", value: 1850 },
  { name: "Aug", value: 1900 },
  { name: "Sep", value: 2000 },
  { name: "Oct", value: 1950 },
  { name: "Nov", value: 2050 },
  { name: "Dec", value: 2100 },
];

const performanceByYear: Record<number, ChartDatum[]> = {
  2024: performance2024,
  2022: performance2022,
};

type UserRow = {
  id: string;
  name: string;
  avatar: string;
  applicationDate: string;
  matchscore: string;
  status: "success" | "pending" | "denied";
};

const usersData: UserRow[] = [
  {
    id: "u1",
    name: "Stella Akanbi",
    avatar: "https://i.pravatar.cc/64?img=48",
    applicationDate: "30 September 2025",
    matchscore: "75%",
    status: "success",
  },
  {
    id: "u2",
    name: "Stella Akanbi",
    avatar: "https://i.pravatar.cc/64?img=12",
    applicationDate: "30 September 2025",
    matchscore: "75%",
    status: "pending",
  },
  {
    id: "u3",
    name: "Stella Akanbi",
    avatar: "https://i.pravatar.cc/64?img=32",
    applicationDate: "30 September 2025",
    matchscore: "75%",
    status: "denied",
  },
];

type NonProfit = { name: string; type: string; city: string; logo: string };

const nonprofits: NonProfit[] = [
  { name: "Fable", type: "Private Company", city: "Abuja", logo: "/admin-ngo/Fable logo 1.png" },
  { name: "NYT Cooking", type: "Private Company", city: "Abuja", logo: "/admin-ngo/NYT Cooking logo 1.png" },
  { name: "SiriusXM", type: "Private Company", city: "Abuja", logo: "/admin-ngo/SiriusXM logo 1.png" },
];

/* --------------------------- UI PRIMITIVES --------------------------- */

function TrendBadge({ value = "7%" }: { value?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs text-emerald-700">
      <ArrowUpRight className="h-3.5 w-3.5" />
      {value}
    </span>
  );
}

function StatusPill({ status }: { status: UserRow["status"] }) {
  const map: Record<
    UserRow["status"],
    { cls: string; icon: React.ReactElement; text: string }
  > = {
    success: { cls: "bg-emerald-50 text-emerald-700", icon: <CheckCircle2 className="h-3.5 w-3.5" />, text: "Success" },
    pending: { cls: "bg-amber-50 text-amber-700", icon: <Clock3 className="h-3.5 w-3.5" />, text: "Pending" },
    denied: { cls: "bg-rose-50 text-rose-700", icon: <XCircle className="h-3.5 w-3.5" />, text: "Denied" },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs ${s.cls}`}>
      {s.icon}
      {s.text}
    </span>
  );
}

function StatCard({
  iconSrc,
  count,
  title,
  accent = "bg-slate-100",
  delta = "7%",
}: {
  iconSrc: string;
  count: string | number;
  title: string;
  accent?: string;
  delta?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${accent}`}>
          <Image
            src={iconSrc || "https://placehold.co/28x28/png"}
            alt={title}
            width={28}
            height={28}
            className="object-contain"
            unoptimized
          />
        </div>
        <div>
          <div className="text-3xl font-semibold leading-none text-slate-900">{count}</div>
          <div className="text-sm text-slate-700">{title}</div>
        </div>
      </div>
      <TrendBadge value={delta} />
    </div>
  );
}

function MetricCard({
  icon,
  value,
  label,
  bg,
  iconClass,
  up = true,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  bg: string;
  iconClass: string;
  up?: boolean;
}) {
  const Icon = icon;
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className={`rounded-lg p-2 ${bg}`}>
        <Icon className={iconClass} />
      </div>
      <div>
        <div className="text-lg font-semibold leading-none text-slate-900">{value}</div>
        <div className="text-xs text-slate-700">{label}</div>
      </div>
      <ArrowUpRight className={`ml-auto h-4 w-4 ${up ? "text-emerald-600" : "text-rose-600 rotate-90"}`} />
    </div>
  );
}

/* -------- Tooltip: version-agnostic -------- */

type TooltipPayloadItem = { value?: number };
type TooltipLike = {
  active?: boolean;
  label?: string | number;
  payload?: TooltipPayloadItem[];
};

function CustomTooltip(props: TooltipLike) {
  if (!props.active || !props.payload?.length) return null;
  const value = props.payload[0]?.value ?? "-";
  return (
    <div className="rounded-md bg-slate-900 px-3 py-2 text-xs text-white shadow-lg">
      <div className="font-semibold">{props.label}</div>
      <div>Value: {value}</div>
    </div>
  );
}

/* ------------------------------- PAGE -------------------------------- */

export default function AdminDashboardPage() {
  const [activeBar, setActiveBar] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState("");
  const [year, setYear] = React.useState<number>(2024);

  const filteredUsers = usersData.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );
  const chartData = performanceByYear[year] ?? performance2024;

  // Option 2: version-agnostic handler
  const handleMouseMove = (s: unknown) => {
    const state = s as { isTooltipActive?: boolean; activeLabel?: string };
    if (state?.isTooltipActive) {
      setActiveBar(state.activeLabel ?? null);
    } else {
      setActiveBar(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 font-poppins antialiased [text-rendering:optimizeLegibility]">
      <main className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* LEFT */}
        <section className="space-y-6">
          <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <StatCard iconSrc="/admin-stats/applicant.svg" count="560" title="Applicants" accent="bg-slate-100" />
            <StatCard iconSrc="/admin-stats/ngo.svg" count="560" title="Non Profit" accent="bg-orange-50" />
            <StatCard iconSrc="/admin-stats/job-seeker.svg" count="560" title="Job Seekers" accent="bg-blue-50" />
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-xs text-slate-700">Report</div>
              <div className="my-1 text-lg font-semibold text-slate-900">Over 100, 000 Users</div>
              <div className="text-xs text-slate-700">
                A major milestone over the last month with 15% increase
              </div>
            </div>
          </div>

          {/* Performance + Non Profit */}
          <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-3">
            <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Performance</div>
                  <div className="text-xs text-slate-700">User engagements</div>
                </div>
                <div className="flex items-center gap-2">
                  <YearSelect years={[2024, 2022]} value={year} onChange={setYear} size="sm" />
                  <button className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-slate-800 hover:bg-slate-50">
                    User Engagements <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    barSize={12}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setActiveBar(null)}
                  >
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#334155" }}
                      dy={10}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#334155" }} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                    <Bar dataKey="value" shape={<Rectangle radius={6} />}>
                      {chartData.map((d) => (
                        <Cell key={d.name} fill={activeBar === d.name ? "#0f172a" : "#e2e8f0"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-900">Non Profit</div>
                <button className="text-xs text-slate-700 hover:underline">View all</button>
              </div>
              <div className="space-y-3">
                {nonprofits.map((n) => (
                  <div key={n.name} className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 overflow-hidden rounded-lg bg-white ring-1 ring-slate-200">
                        <Image
                          src={n.logo || "https://placehold.co/32x32/png"}
                          alt={`${n.name} logo`}
                          width={32}
                          height={32}
                          className="h-8 w-8 object-contain"
                          unoptimized
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">{n.name}</div>
                        <div className="text-xs text-slate-700">
                          {n.type} <span className="mx-1">•</span> {n.city}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-700">Just now</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Users */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b p-4">
              <div className="text-sm font-semibold text-slate-900">Users</div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    value={query}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                    placeholder="Search users…"
                    className="h-9 w-56 rounded-md border border-slate-200 pl-8 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-slate-200"
                  />
                </div>
                <button className="rounded-md border border-slate-200 p-2 hover:bg-slate-50" aria-label="more">
                  <MoreVertical className="h-4 w-4 text-slate-700" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left text-slate-700">
                  <tr>
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Application Date</th>
                    <th className="p-4 font-medium">Matchscore</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4" />
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="border-t">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={u.avatar}
                            alt={u.name}
                            width={28}
                            height={28}
                            className="rounded-full object-cover"
                            unoptimized
                          />
                          <span className="font-medium text-slate-900">{u.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-700">{u.applicationDate}</td>
                      <td className="p-4 text-slate-700">{u.matchscore}</td>
                      <td className="p-4">
                        <StatusPill status={u.status} />
                      </td>
                      <td className="p-4 text-right text-slate-600">⋮</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* RIGHT */}
        <aside className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <MetricCard icon={Users} value="19k" label="Users" bg="bg-pink-100" iconClass="h-5 w-5 text-pink-600" />
            <MetricCard icon={Handshake} value="2.5k" label="Match" bg="bg-orange-100" iconClass="h-5 w-5 text-orange-600" />
            <MetricCard icon={MessageSquare} value="19k" label="Posts" bg="bg-blue-100" iconClass="h-5 w-5 text-blue-600" up={false} />
            <MetricCard icon={MousePointerClick} value="100k" label="Clicks" bg="bg-purple-100" iconClass="h-5 w-5 text-purple-600" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-1 flex items-center gap-3">
              <div className="rounded-lg bg-emerald-100 p-2">
                <ThumbsUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="text-base font-semibold text-slate-900">Feedbacks</div>
            </div>
            <div className="text-lg font-semibold text-slate-900">
              200+ <span className="text-sm font-normal text-slate-700">positive</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
              <div className="h-full w-4/5 rounded-full bg-emerald-500" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 text-center text-sm font-semibold text-slate-900">Sep 2025</div>
            <div className="grid grid-cols-7 gap-y-2 text-center text-xs text-slate-700">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-y-2 text-center text-sm text-slate-900">
              <div />
              {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                <div key={d} className={`py-1 ${d === 10 ? "rounded-full bg-slate-900 text-white" : ""}`}>
                  {d}
                </div>
              ))}
            </div>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-rose-100 py-2 text-sm font-semibold text-rose-700">
              <XCircle className="h-4 w-4" />
              1 Issue
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900">Activity Log</div>
              <button className="text-xs text-slate-700 hover:underline">View all</button>
            </div>
            <ul className="space-y-3">
              {[
                {
                  id: "a1",
                  who: "Michael Cole",
                  avatar: "https://i.pravatar.cc/64?img=5",
                  action: "Account suspended",
                  ago: "2hrs ago",
                },
                {
                  id: "a2",
                  who: "tommy.co",
                  avatar: "https://i.pravatar.cc/64?img=22",
                  action: "Enabled authentication",
                  ago: "2hrs ago",
                },
                {
                  id: "a3",
                  who: "Stella Akanbi",
                  avatar: "https://i.pravatar.cc/64?img=48",
                  action: "Account suspended",
                  ago: "2hrs ago",
                },
              ].map((i) => (
                <li key={i.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={i.avatar}
                      alt={`${i.who} avatar`}
                      width={28}
                      height={28}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                    <div className="leading-tight">
                      <div className="text-sm font-medium text-slate-900">{i.who}</div>
                      <div className="text-xs text-slate-700">{i.action}</div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-700">{i.ago}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
