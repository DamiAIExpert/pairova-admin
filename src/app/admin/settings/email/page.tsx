"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  MoreVertical,
  Search,
  SlidersHorizontal,
  Settings,
  Ban,
  Star,
} from "lucide-react";
import { EMAIL_PROVIDERS, type EmailProvider } from "./_data";

/* --------------------------- helpers / primitives -------------------------- */
function PageShell({ children }: { children: React.ReactNode }) {
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

function PriorityStars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
      ))}
    </div>
  );
}

function StatusPill({ status }: { status: EmailProvider["status"] }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  return status === "Active" ? (
    <span className={`${base} bg-green-50 text-green-700`}>Active</span>
  ) : (
    <span className={`${base} bg-red-50 text-red-700`}>Inactive</span>
  );
}

/* ---------------------------------- page ---------------------------------- */
export default function EmailSettingsIndex() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [menuFor, setMenuFor] = React.useState<string | null>(null);
  const menuRef = useOutsideClose(() => setMenuFor(null));

  const filtered = React.useMemo(() => {
    if (!query.trim()) return EMAIL_PROVIDERS;
    const q = query.toLowerCase();
    return EMAIL_PROVIDERS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <PageShell>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Email Provider</h1>
        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-lg border border-gray-200 pl-3 pr-2 text-sm text-gray-700 sm:flex">
            <Search className="mr-2 h-4 w-4 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search providers…"
              className="h-9 w-64 bg-transparent outline-none"
            />
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 font-medium">Provider Name</th>
                <th className="px-4 py-3 font-medium">Region</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full ring-1 ring-gray-200">
                        <Image src={p.logo || "/logo.svg"} alt={p.name} width={24} height={24} />
                      </div>
                      <span className="text-gray-900">{p.name}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-gray-700">{p.region}</td>
                  <td className="px-4 py-4"><PriorityStars n={p.priority} /></td>
                  <td className="px-4 py-4"><StatusPill status={p.status} /></td>

                  <td className="relative px-4 py-4">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
                      onClick={() => setMenuFor((v) => (v === p.id ? null : p.id))}
                      aria-label="Row actions"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {menuFor === p.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-4 top-12 z-20 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setMenuFor(null);
                            router.push(`/admin/settings/email/${p.id}`);
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50"
                        >
                          <Settings className="h-4 w-4" />
                          Configure
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setMenuFor(null);
                            alert("Deactivate (mock). Wire to API.");
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50"
                        >
                          <Ban className="h-4 w-4" />
                          Deactivate
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center justify-between gap-3 border-t px-4 py-3 sm:flex-row">
          <div className="flex items-center gap-1">
            {["1", "2", "3", "4"].map((p, i) => (
              <button
                key={p}
                className={`mx-0.5 h-8 min-w-[32px] rounded-md border text-sm ${
                  i === 0
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-600">
            <span className="mr-1">Show per page:</span>
            <button className="inline-flex h-8 min-w-[40px] items-center justify-center rounded-md border border-gray-200 px-2">
              4
            </button>
          </div>
          <button className="inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 px-4 text-sm font-medium text-white hover:bg-black">
            Export
          </button>
        </div>
      </div>
    </PageShell>
  );
}
