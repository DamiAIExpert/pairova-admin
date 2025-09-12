"use client";

import React from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, Settings2 } from "lucide-react";

/* ----------------------------- DATA ----------------------------- */
const SECTIONS = [
  {
    title: "Front End",
    desc: "Modify all the features in the landing page",
    href: "/admin/settings/frontend",
  },
  {
    title: "SMS API",
    desc: "Modify all the features in the landing page",
    href: "/admin/settings/sms",
  },
  {
    title: "Email Configuration",
    desc: "Modify all the features in the landing page",
    href: "/admin/settings/email",
  },
  {
    title: "Feedback",
    desc: "View feedbacks from users",
    href: "/admin/settings/feedback",
  },
] as const;

/* ----------------------------- PAGE ----------------------------- */
export default function SettingsPage() {
  const [q, setQ] = React.useState("");

  const items = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return SECTIONS;
    return SECTIONS.filter((i) => i.title.toLowerCase().includes(s));
  }, [q]);

  return (
    <div className="mx-auto max-w-[1200px]">
      {/* Header row */}
      <div className="flex flex-col gap-4 border-b border-gray-200 py-6 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Settings</h1>

        <div className="flex items-center gap-3">
          {/* search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search users..."
              className="h-10 w-[280px] rounded-lg border border-gray-200 pl-9 pr-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* filter icon button */}
          <button
            type="button"
            aria-label="Filters"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4 py-6">
        {items.map((i) => (
          <div
            key={i.title}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div>
              <h3 className="text-base font-semibold text-gray-900">{i.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{i.desc}</p>
            </div>

            <Link
              href={i.href}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 text-gray-500">
                <Settings2 className="h-4 w-4" />
              </span>
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
