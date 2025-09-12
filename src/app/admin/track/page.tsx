"use client";

import React from "react";
import {
  ChevronDown,
  Search,
  SlidersHorizontal,
} from "lucide-react";

/* ------------------------------ tiny helpers ------------------------------ */

function PageShell({ children }: { children: React.ReactNode }) {
  // If your layout already offsets for the sidebar, remove pl-20.
  return <div className="mx-auto max-w-[1200px] px-6 pb-12">{children}</div>;
}

function useOutsideClose(cb: () => void) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [cb]);
  return ref;
}

function CheckboxPill({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={[
        "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition",
        checked
          ? "border-gray-900 bg-gray-900 text-white"
          : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50",
      ].join(" ")}
    >
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300"
        readOnly
        checked={checked}
      />
      {children}
    </button>
  );
}

function SoftSelect({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = useOutsideClose(() => setOpen(false));
  const chosen = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800"
      >
        {chosen?.label ?? "Select"}
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {open ? (
        <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={`block w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${
                o.value === value ? "bg-gray-50" : ""
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* --------------------------------- data ---------------------------------- */

type ActorType = "Candidate" | "Non Profit";
type ActionType = "Edit" | "Delete" | "Create";

type LogRow = {
  id: string;
  ts: string; // ISO string
  adminId: string;
  action: ActionType;
  actorType: ActorType;
  candidateName: string;
  candidateId: string;
  resource: string; // e.g., "Email", "Account"
  reason: string; // e.g., "Email no longer needed"
};

const MOCK: LogRow[] = [
  {
    id: "1",
    ts: "2025-09-30T10:10:10Z",
    adminId: "A12364",
    action: "Edit",
    actorType: "Candidate",
    candidateName: "Stanley Nita",
    candidateId: "CND-19872",
    resource: "Email",
    reason: "Email no longer needed",
  },
  {
    id: "2",
    ts: "2025-09-30T10:07:12Z",
    adminId: "A12364",
    action: "Delete",
    actorType: "Candidate",
    candidateName: "Paul Sheffield",
    candidateId: "CND-10111",
    resource: "Account",
    reason: "Account violations",
  },
  {
    id: "3",
    ts: "2025-09-30T09:59:48Z",
    adminId: "A12364",
    action: "Delete",
    actorType: "Candidate",
    candidateName: "Paul Sheffield",
    candidateId: "CND-10111",
    resource: "Account",
    reason: "Account violations",
  },
  {
    id: "4",
    ts: "2025-09-30T09:50:33Z",
    adminId: "A12364",
    action: "Delete",
    actorType: "Candidate",
    candidateName: "Paul Sheffield",
    candidateId: "CND-10111",
    resource: "Account",
    reason: "Account violations",
  },
  {
    id: "5",
    ts: "2025-09-30T09:43:20Z",
    adminId: "A12364",
    action: "Delete",
    actorType: "Candidate",
    candidateName: "Paul Sheffield",
    candidateId: "CND-10111",
    resource: "Account",
    reason: "Account violations",
  },
  {
    id: "6",
    ts: "2025-09-30T09:41:05Z",
    adminId: "A12364",
    action: "Delete",
    actorType: "Candidate",
    candidateName: "Paul Sheffield",
    candidateId: "CND-10111",
    resource: "Account",
    reason: "Account violations",
  },
  {
    id: "7",
    ts: "2025-09-30T09:37:02Z",
    adminId: "A12364",
    action: "Edit",
    actorType: "Candidate",
    candidateName: "Stanley Nita",
    candidateId: "CND-19872",
    resource: "Email",
    reason: "Email no longer needed",
  },
  {
    id: "8",
    ts: "2025-09-30T09:35:12Z",
    adminId: "A12364",
    action: "Edit",
    actorType: "Candidate",
    candidateName: "Stanley Nita",
    candidateId: "CND-19872",
    resource: "Email",
    reason: "Email no longer needed",
  },
  {
    id: "9",
    ts: "2025-09-30T09:32:12Z",
    adminId: "A12364",
    action: "Edit",
    actorType: "Candidate",
    candidateName: "Stanley Nita",
    candidateId: "CND-19872",
    resource: "Email",
    reason: "Email no longer needed",
  },
  {
    id: "10",
    ts: "2025-09-30T09:28:52Z",
    adminId: "A12364",
    action: "Edit",
    actorType: "Candidate",
    candidateName: "Stanley Nita",
    candidateId: "CND-19872",
    resource: "Email",
    reason: "Email no longer needed",
  },
];

/* ------------------------------- main page -------------------------------- */

export default function AuditLogPage() {
  // Top search
  const [query, setQuery] = React.useState("");

  // Filter toggles
  const [showCandidates, setShowCandidates] = React.useState(true);
  const [showNonProfit, setShowNonProfit] = React.useState(false);
  const [showColCandidateName, setShowColCandidateName] = React.useState(true);
  const [showColCandidateId, setShowColCandidateId] = React.useState(false);

  // Sorting
  const sortOptions = [
    { label: "Recently Added", value: "recent" },
    { label: "Sort by Name", value: "name" },
    { label: "Sort by Date", value: "date" },
  ];
  const [sortBy, setSortBy] = React.useState<string>("recent");

  // Timestamp display format (menu on header)
  const [tsFmt, setTsFmt] = React.useState<"date" | "time">("date");
  const [tsMenuOpen, setTsMenuOpen] = React.useState(false);
  const tsMenuRef = useOutsideClose(() => setTsMenuOpen(false));

  // Pagination
  const PER_PAGE = 4;
  const [page, setPage] = React.useState(1);

  // Derived rows
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOCK.filter((r) => {
      const typeOK =
        (r.actorType === "Candidate" && showCandidates) ||
        (r.actorType === "Non Profit" && showNonProfit);
      if (!typeOK) return false;
      if (!q) return true;
      const blob = [
        r.candidateName,
        r.candidateId,
        r.resource,
        r.reason,
        r.adminId,
        r.action,
      ]
        .join(" ")
        .toLowerCase();
      return blob.includes(q);
    });
  }, [query, showCandidates, showNonProfit]);

  const sorted = React.useMemo(() => {
    const arr = [...filtered];
    if (sortBy === "recent") {
      arr.sort((a, b) => +new Date(b.ts) - +new Date(a.ts));
    } else if (sortBy === "name") {
      arr.sort((a, b) => a.candidateName.localeCompare(b.candidateName));
    } else if (sortBy === "date") {
      arr.sort((a, b) => +new Date(a.ts) - +new Date(b.ts));
    }
    return arr;
  }, [filtered, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const current = React.useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return sorted.slice(start, start + PER_PAGE);
  }, [sorted, page]);

  React.useEffect(() => {
    // If filters change, reset to page 1
    setPage(1);
  }, [query, showCandidates, showNonProfit, sortBy]);

  const fmtTs = (iso: string) => {
    const d = new Date(iso);
    if (tsFmt === "date") {
      return d.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }
    // time
    return d.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const exportCsv = () => {
    // quick mock
    alert("Exported (mock). Replace with real export.");
  };

  return (
    <PageShell>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Audit Log</h1>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-lg border border-gray-200 pl-3 pr-2 text-sm text-gray-700 sm:flex">
            <Search className="mr-2 h-4 w-4 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users..."
              className="h-9 w-64 bg-transparent outline-none"
            />
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
            title="Filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Filters row */}
      <div className="mb-3 overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-wrap items-center gap-2 p-3">
          <CheckboxPill checked={showCandidates} onChange={setShowCandidates}>
            Candidate
          </CheckboxPill>
          <CheckboxPill checked={showNonProfit} onChange={setShowNonProfit}>
            Non Profit
          </CheckboxPill>
          <CheckboxPill
            checked={showColCandidateName}
            onChange={setShowColCandidateName}
          >
            Candidate Name
          </CheckboxPill>
          <CheckboxPill
            checked={showColCandidateId}
            onChange={setShowColCandidateId}
          >
            Candidate ID
          </CheckboxPill>

          <div className="ml-auto">
            <SoftSelect
              value={sortBy}
              onChange={setSortBy}
              options={[
                { label: "Recently Added", value: "recent" },
                { label: "Sort by Name", value: "name" },
                { label: "Sort by Date", value: "date" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {/* Year header (static like design) */}
        <div className="border-b px-4 py-2 text-sm font-semibold text-gray-900">
          2025
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </th>

                <th className="px-4 py-3 font-medium">
                  <div className="relative inline-block" ref={tsMenuRef}>
                    <button
                      type="button"
                      onClick={() => setTsMenuOpen((v) => !v)}
                      className="inline-flex items-center gap-2"
                    >
                      <span>Timestamp</span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                    {tsMenuOpen ? (
                      <div className="absolute z-20 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                        <button
                          type="button"
                          className={`block w-full px-3 py-2 text-left hover:bg-gray-50 ${
                            tsFmt === "date" ? "bg-gray-50" : ""
                          }`}
                          onClick={() => {
                            setTsFmt("date");
                            setTsMenuOpen(false);
                          }}
                        >
                          DD – MM – YYYY
                        </button>
                        <button
                          type="button"
                          className={`block w-full px-3 py-2 text-left hover:bg-gray-50 ${
                            tsFmt === "time" ? "bg-gray-50" : ""
                          }`}
                          onClick={() => {
                            setTsFmt("time");
                            setTsMenuOpen(false);
                          }}
                        >
                          HH – MM – SS
                        </button>
                      </div>
                    ) : null}
                  </div>
                </th>

                <th className="px-4 py-3 font-medium">Admin ID</th>
                <th className="px-4 py-3 font-medium">Action Type</th>
                {showColCandidateName ? (
                  <th className="px-4 py-3 font-medium">Candidate Name</th>
                ) : null}
                {showColCandidateId ? (
                  <th className="px-4 py-3 font-medium">Candidate ID</th>
                ) : null}
                <th className="px-4 py-3 font-medium">Resource</th>
                <th className="px-4 py-3 font-medium">Reason</th>
              </tr>
            </thead>

            <tbody>
              {current.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-4 text-gray-900">{fmtTs(row.ts)}</td>
                  <td className="px-4 py-4 text-gray-700">{row.adminId}</td>
                  <td className="px-4 py-4 text-gray-700">{row.action}</td>
                  {showColCandidateName ? (
                    <td className="px-4 py-4 text-gray-900">
                      {row.candidateName}
                    </td>
                  ) : null}
                  {showColCandidateId ? (
                    <td className="px-4 py-4 text-gray-700">
                      {row.candidateId}
                    </td>
                  ) : null}
                  <td className="px-4 py-4 text-gray-900">
                    {row.candidateName} <span className="text-gray-500">•</span>{" "}
                    {row.resource}
                  </td>
                  <td className="px-4 py-4 text-gray-700">{row.reason}</td>
                </tr>
              ))}

              {current.length === 0 ? (
                <tr>
                  <td
                    colSpan={
                      6 + (showColCandidateName ? 1 : 0) + (showColCandidateId ? 1 : 0)
                    }
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No results match your filters.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        {/* Footer: pagination + export */}
        <div className="flex flex-col items-center justify-between gap-3 border-t px-4 py-3 sm:flex-row">
          {/* Pagers */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="mx-0.5 h-8 min-w-[32px] rounded-md border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              const active = p === page;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={[
                    "mx-0.5 h-8 min-w-[32px] rounded-md border text-sm",
                    active
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
                  ].join(" ")}
                >
                  {p}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="mx-0.5 h-8 min-w-[32px] rounded-md border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50"
            >
              &gt;
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show per page:</span>
            <button className="inline-flex h-8 min-w-[40px] items-center justify-center rounded-md border border-gray-200 px-2 text-sm">
              {PER_PAGE}
            </button>
          </div>

          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex h-9 items-center justify-center rounded-lg bg-gray-900 px-4 text-sm font-medium text-white hover:bg-black"
          >
            Export
          </button>
        </div>
      </div>
    </PageShell>
  );
}
