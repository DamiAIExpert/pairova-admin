// src/app/admin/job-seekers/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  BriefcaseBusiness,
} from "lucide-react";

/* ----------------------------- tiny utilities ----------------------------- */

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1200px] px-6 py-6">{children}</div>;
}

function useOutsideClose<T extends HTMLElement>(onClose: () => void) {
  const ref = React.useRef<T | null>(null);
  React.useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);
  return ref;
}

function Avatar({ seed }: { seed: string }) {
  // deterministic, no-auth avatar
  const src = `https://avatar.vercel.sh/${encodeURIComponent(seed)}.png?size=96`;
  return (
    <Image
      src={src}
      alt={seed}
      className="h-7 w-7 rounded-full object-cover"
      width={28}
      height={28}
    />
  );
}

/* ---------------------------------- data ---------------------------------- */

type Status = "Hired" | "Pending" | "Denied" | "Success";

type Seeker = {
  id: string;
  name: string;
  applicationDate: string;
  creationDate: string;
  match: number;
  jobApplied: number;
  status: Status;
};

const ROWS: Seeker[] = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i + 1),
  name: "Stella Akanbi",
  applicationDate: "30 September 2025",
  creationDate: "30 September 2025",
  match: 75,
  jobApplied: [10, 30, 3, 18, 22, 40, 50, 30, 10, 12][i],
  status: (
    [
      "Hired",
      "Pending",
      "Denied",
      "Success",
      "Success",
      "Success",
      "Success",
      "Success",
      "Success",
      "Success",
    ] as Status[]
  )[i],
}));

/* --------------------------------- pieces --------------------------------- */

function StatusPill({ s }: { s: Status }) {
  const styles: Record<Status, string> = {
    Hired: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Denied: "bg-rose-50 text-rose-700",
    Success: "bg-emerald-50 text-emerald-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${styles[s]}`}
    >
      {s}
    </span>
  );
}

function ThreeDotMenu({
  seeker,
  onClose,
}: {
  seeker: Seeker;
  onClose: () => void;
}) {
  const ref = useOutsideClose<HTMLDivElement>(onClose);
  return (
    <div
      ref={ref}
      className="absolute right-0 top-9 z-20 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
    >
      <Link
        href={`/admin/job-seekers/${seeker.id}`}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
        onClick={onClose}
      >
        <Eye className="h-4 w-4" />
        View
      </Link>
      <Link
        href={`/admin/job-seekers/${seeker.id}/edit`}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
        onClick={onClose}
      >
        <Pencil className="h-4 w-4" />
        Edit
      </Link>
      <button
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50"
        onClick={() => {
          onClose();
          // wire to API
          alert(`Delete (mock): ${seeker.name}`);
        }}
      >
        <Trash2 className="h-4 w-4 text-rose-600" />
        Delete
      </button>
      {/* ✅ Correct route to the Applied Jobs page */}
      <Link
        href={`/admin/job-seekers/${seeker.id}/applied`}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
        onClick={onClose}
      >
        <BriefcaseBusiness className="h-4 w-4" />
        Applied Jobs
      </Link>
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

type Tab = "user" | "history";

export default function JobSeekersPage() {
  const [tab, setTab] = React.useState<Tab>("user");
  const [q, setQ] = React.useState("");
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    const qq = q.trim().toLowerCase();
    return ROWS.filter((r) => r.name.toLowerCase().includes(qq));
  }, [q]);

  return (
    <PageShell>
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Candidate Profile</h1>
      </div>

      {/* Tabs + tools */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-gray-200 bg-white p-1">
          <button
            className={`rounded-full px-4 py-1.5 text-sm ${
              tab === "user" ? "bg-black text-white" : "text-gray-800"
            }`}
            onClick={() => setTab("user")}
          >
            User Information
          </button>
          <button
            className={`rounded-full px-4 py-1.5 text-sm ${
              tab === "history" ? "bg-black text-white" : "text-gray-800"
            }`}
            onClick={() => setTab("history")}
          >
            Application History
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search users..."
              className="h-10 w-[260px] rounded-lg border border-gray-200 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <table className="w-full table-fixed">
          <colgroup>
            <col className="w-12" />
            <col />
            {tab === "user" ? (
              <>
                <col className="w-[200px]" />
                <col className="w-[120px]" />
              </>
            ) : (
              <>
                <col className="w-[200px]" />
                <col className="w-[120px]" />
              </>
            )}
            <col className="w-[120px]" />
          </colgroup>

          <thead className="border-b bg-gray-50">
            <tr className="text-left text-[13px] text-gray-600">
              <th className="px-4 py-3">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
              </th>
              <th className="px-2 py-3">Name</th>
              {tab === "user" ? (
                <>
                  <th className="px-2 py-3">Application Date</th>
                  <th className="px-2 py-3">Matchscore</th>
                </>
              ) : (
                <>
                  <th className="px-2 py-3">Creation Date</th>
                  <th className="px-2 py-3">Job Applied</th>
                </>
              )}
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-b last:border-0">
                <td className="px-4 py-3 align-middle">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                </td>

                <td className="px-2 py-3 align-middle">
                  <div className="flex items-center gap-3">
                    <Avatar seed={row.name} />
                    <div className="truncate text-sm text-gray-900">{row.name}</div>
                  </div>
                </td>

                {tab === "user" ? (
                  <>
                    <td className="px-2 py-3 align-middle text-sm text-gray-700">
                      {row.applicationDate}
                    </td>
                    <td className="px-2 py-3 align-middle text-sm text-gray-700">
                      {row.match}%
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-2 py-3 align-middle text-sm text-gray-700">
                      {row.creationDate}
                    </td>
                    <td className="px-2 py-3 align-middle text-sm text-gray-700">
                      {row.jobApplied}
                    </td>
                  </>
                )}

                <td className="px-4 py-3 align-middle">
                  <StatusPill s={row.status} />
                </td>

                <td className="relative px-4 py-3 align-middle">
                  <button
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={() => setOpenMenu((id) => (id === row.id ? null : row.id))}
                    aria-haspopup="menu"
                    aria-expanded={openMenu === row.id}
                    aria-label="Row actions"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  {openMenu === row.id && (
                    <ThreeDotMenu seeker={row} onClose={() => setOpenMenu(null)} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* footer controls */}
      <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">
            {"<"}
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
            {">"}
          </button>
        </div>

        <div className="text-sm text-gray-700">
          <span>Show per page: </span>
          <button className="inline-flex h-8 min-w-[36px] items-center justify-center rounded-md border border-gray-200 px-2">
            4
          </button>
        </div>

        <button className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-black">
          Export
        </button>
      </div>
    </PageShell>
  );
}
