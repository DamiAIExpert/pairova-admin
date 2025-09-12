// src/app/admin/job-seekers/[candidateId]/applied/page.tsx
"use client";

import React from "react";
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Info } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Small UI helpers                                                           */
/* -------------------------------------------------------------------------- */

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1200px] px-6 py-6">{children}</div>;
}

function StatusPill({ status }: { status: "Pending" | "Denied" | "Approved" }) {
  const cls =
    status === "Approved"
      ? "bg-emerald-50 text-emerald-700"
      : status === "Denied"
      ? "bg-rose-50 text-rose-700"
      : "bg-amber-50 text-amber-700";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs ${cls}`}>
      {status}
    </span>
  );
}

function MatchBadge({ value, trend }: { value: number; trend: "up" | "down" }) {
  const up = trend === "up";
  return (
    <div className="group relative inline-flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-800">
      {value}% {up ? <TrendingUp className="h-3.5 w-3.5 text-emerald-600" /> : <TrendingDown className="h-3.5 w-3.5 text-rose-600" />}
      {/* hover tooltip */}
      <div className="pointer-events-none absolute -left-1/2 top-8 hidden w-[160px] -translate-x-1/2 rounded-md border border-gray-200 bg-white p-2 text-[11px] text-gray-700 shadow-md group-hover:block">
        View the detailed explanation
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-l border-t border-gray-200 bg-white" />
      </div>
    </div>
  );
}

function LogoBox({ bg }: { bg?: string }) {
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-lg ${bg ?? "bg-gray-900"} text-white`}
      aria-hidden
    >
      <span className="text-lg font-bold">⋰</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Mock Data                                                                  */
/* -------------------------------------------------------------------------- */

type Applied = {
  id: string;
  title: string;
  org: string;
  location: string;
  email: string;
  phone: string;
  daysAgo: string;
  schedule: string;
  totalApplied: number;
  status: "Pending" | "Denied" | "Approved";
  match: number;
  trend: "up" | "down";
  logoBg?: string;
};

const rows: Applied[] = [
  {
    id: "1",
    title: "Charity Volunteer",
    org: "AYA Healthcare",
    location: "Lagos, Nigeria",
    email: "jonathanbushman51@gmail.com",
    phone: "+08-356-333-33",
    daysAgo: "2 days ago",
    schedule: "Part Time",
    totalApplied: 12,
    status: "Pending",
    match: 70,
    trend: "up",
    logoBg: "bg-gray-900",
  },
  {
    id: "2",
    title: "Charity Volunteer",
    org: "AYA Healthcare",
    location: "Lagos, Nigeria",
    email: "jonathanbushman51@gmail.com",
    phone: "+08-356-333-33",
    daysAgo: "2 days ago",
    schedule: "Part Time",
    totalApplied: 12,
    status: "Denied",
    match: 20,
    trend: "down",
    logoBg: "bg-indigo-600",
  },
  {
    id: "3",
    title: "Charity Volunteer",
    org: "AYA Healthcare",
    location: "Lagos, Nigeria",
    email: "jonathanbushman51@gmail.com",
    phone: "+08-356-333-33",
    daysAgo: "2 days ago",
    schedule: "Part Time",
    totalApplied: 12,
    status: "Approved",
    match: 70,
    trend: "up",
    logoBg: "bg-blue-700",
  },
];

/* -------------------------------------------------------------------------- */
/* Card                                                                       */
/* -------------------------------------------------------------------------- */

function AppliedCard({ item }: { item: Applied }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="flex items-start justify-between gap-3 p-5">
        {/* left: logo + info */}
        <div className="flex min-w-0 items-start gap-3">
          <LogoBox bg={item.logoBg} />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900">{item.title}</div>
            <div className="text-[12px] text-gray-500">{item.org}</div>
            <div className="text-[12px] text-gray-400">{item.location}</div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="min-w-0">
                <div className="text-[11px] text-gray-500">Email Address</div>
                <a href={`mailto:${item.email}`} className="block truncate text-sm text-gray-800 hover:underline">
                  {item.email}
                </a>
              </div>
              <div>
                <div className="text-[11px] text-gray-500">Phone</div>
                <div className="text-sm text-gray-800">{item.phone}</div>
              </div>
            </div>
          </div>
        </div>

        {/* right: match + status */}
        <div className="flex shrink-0 flex-col items-end gap-2">
          <MatchBadge value={item.match} trend={item.trend} />
          <StatusPill status={item.status} />
        </div>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between gap-3 border-t px-5 py-3 text-[12px] text-gray-500">
        <div className="flex flex-wrap items-center gap-6">
          <span>{item.daysAgo}</span>
          <span>{item.schedule}</span>
          <span>{item.totalApplied} applied</span>
        </div>
        <span className="text-gray-400">Applied</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function AppliedJobsPage({
  params,
}: {
  params: { candidateId: string };
}) {
  return (
    <PageShell>
      <h1 className="mb-4 text-xl font-semibold text-gray-900">Applied Jobs</h1>

      <div className="space-y-4">
        {rows.map((r) => (
          <AppliedCard key={r.id} item={r} />
        ))}
      </div>

      {/* Pagination & page-size */}
      <div className="mt-6 flex flex-col items-center justify-between gap-3 text-sm text-gray-700 sm:flex-row">
        <div className="flex items-center gap-1">
          <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">
            <ChevronLeft className="h-4 w-4" />
          </button>
          {[1, 2, 3, 4].map((p) => (
            <button
              key={p}
              className={`h-8 min-w-[32px] rounded-md border ${
                p === 1
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ))}
          <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span>Show per page:</span>
          <button className="inline-flex h-8 min-w-[36px] items-center justify-center rounded-md border border-gray-200 px-2">
            4
          </button>
        </div>
      </div>
    </PageShell>
  );
}
