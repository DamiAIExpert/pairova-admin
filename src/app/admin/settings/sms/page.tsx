// src/app/admin/settings/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MoreVertical,
  Search,
  SlidersHorizontal,
  Settings as Cog,
  Ban,
  Star,
  X,
  Check,
} from "lucide-react";

/* ------------------------------ small helpers ----------------------------- */

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1200px] px-6 pb-12">{children}</div>;
}

function PrimaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: any }
) {
  const { className, ...rest } = props;
  return (
    <button
      {...rest}
      className={`inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 px-4 text-sm font-medium text-white hover:bg-black ${className ?? ""}`}
    />
  );
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

function StatusPill({ status }: { status: "Active" | "Inactive" }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  return status === "Active" ? (
    <span className={`${base} bg-green-50 text-green-700`}>Active</span>
  ) : (
    <span className={`${base} bg-red-50 text-red-700`}>Inactive</span>
  );
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

/* ---------------------------------- data ---------------------------------- */

type SmsRow = {
  id: string;
  name: string;
  country: string; // "South Africa", "Nigeria", etc.
  flag: string; // emoji flag for quick placeholder
  status: "Active" | "Inactive";
  priority: number; // 1..5
  logo?: string;
};

const SMS_PROVIDERS: SmsRow[] = [
  { id: "twilio-za-1", name: "Twilio",         country: "South Africa", flag: "🇿🇦", status: "Active",   priority: 5, logo: "/logo.svg" },
  { id: "nexmo-ng",   name: "Nexmo",          country: "Nigeria",      flag: "🇳🇬", status: "Inactive", priority: 4, logo: "/logo.svg" },
  { id: "africa-za-1",name: "Africastalking", country: "South Africa", flag: "🇿🇦", status: "Active",   priority: 5, logo: "/logo.svg" },
  { id: "twilio-za-2",name: "Twilio",         country: "South Africa", flag: "🇿🇦", status: "Active",   priority: 4, logo: "/logo.svg" },
  { id: "africa-za-2",name: "Africastalking", country: "South Africa", flag: "🇿🇦", status: "Active",   priority: 5, logo: "/logo.svg" },
  { id: "africa-za-3",name: "Africastalking", country: "South Africa", flag: "🇿🇦", status: "Active",   priority: 4, logo: "/logo.svg" },
  { id: "twilio-za-3",name: "Twilio",         country: "South Africa", flag: "🇿🇦", status: "Active",   priority: 3, logo: "/logo.svg" },
  { id: "africa-za-4",name: "Africastalking", country: "South Africa", flag: "🇿🇦", status: "Active",   priority: 5, logo: "/logo.svg" },
  { id: "africa-za-5",name: "Africastalking", country: "South Africa", flag: "🇿🇦", status: "Active",   priority: 4, logo: "/logo.svg" },
  { id: "twilio-za-4",name: "Twilio",         country: "South Africa", flag: "🇿🇦", status: "Active",   priority: 4, logo: "/logo.svg" },
];

/* --------------------------- provider slug mapper -------------------------- */
/** Map table names -> the config page slugs used in /admin/settings/sms/[id] */
const SMS_NAME_TO_SLUG: Record<string, string> = {
  twilio: "twilio",
  nexmo: "nexmo",
  africastalking: "africastalking",
  "africa's talking": "africastalking",
};

/* ---------------------------------- page ---------------------------------- */

export default function SmsSettingsIndexPage() {
  const router = useRouter();

  // search
  const [query, setQuery] = React.useState("");

  // overflow menu
  const [menuFor, setMenuFor] = React.useState<string | null>(null);
  const menuRef = useOutsideClose(() => setMenuFor(null));

  // filters popover
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const filtersRef = useOutsideClose(() => setFiltersOpen(false));

  const countries = React.useMemo(
    () => Array.from(new Set(SMS_PROVIDERS.map((p) => p.country))),
    []
  );
  const [statusFilter, setStatusFilter] = React.useState<"all" | "Active" | "Inactive">("all");
  const [countryFilter, setCountryFilter] = React.useState<string>("all");

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase().trim();

    return SMS_PROVIDERS.filter((p) => {
      // text search (name/country/status)
      const matchesText =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q);

      // status
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;

      // country
      const matchesCountry = countryFilter === "all" || p.country === countryFilter;

      return matchesText && matchesStatus && matchesCountry;
    });
  }, [query, statusFilter, countryFilter]);

  // navigate to config page
  const goConfigure = (row: SmsRow) => {
    const slug =
      SMS_NAME_TO_SLUG[row.name.toLowerCase()] ??
      row.name.toLowerCase().replace(/\s+/g, "");
    router.push(`/admin/settings/sms/${slug}`);
  };

  return (
    <PageShell>
      {/* Header bar */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Configuration</h1>

        <div className="relative flex items-center gap-2">
          <div className="hidden items-center rounded-lg border border-gray-200 pl-3 pr-2 text-sm text-gray-700 sm:flex">
            <Search className="mr-2 h-4 w-4 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search providers..."
              className="h-9 w-64 bg-transparent outline-none"
            />
          </div>

          {/* Filter button */}
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
            aria-label="filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>

          {/* Filters popover */}
          {filtersOpen && (
            <div
              ref={filtersRef}
              className="absolute right-0 top-12 z-20 w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-gray-900">Filters</div>
                <button
                  className="rounded-md p-1 text-gray-500 hover:bg-gray-50"
                  onClick={() => setFiltersOpen(false)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 text-sm">
                {/* Status filter */}
                <div>
                  <div className="mb-1 text-gray-700">Status</div>
                  <div className="flex gap-2">
                    {(["all", "Active", "Inactive"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStatusFilter(s)}
                        className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 ${
                          statusFilter === s
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 text-gray-800 hover:bg-gray-50"
                        }`}
                      >
                        {statusFilter === s ? <Check className="h-3.5 w-3.5" /> : null}
                        {s === "all" ? "All" : s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Country filter */}
                <div>
                  <div className="mb-1 text-gray-700">Country</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCountryFilter("all")}
                      className={`rounded-md border px-2 py-1 text-left ${
                        countryFilter === "all"
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      {countryFilter === "all" ? "✓ " : ""}
                      All
                    </button>
                    {countries.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCountryFilter(c)}
                        className={`rounded-md border px-2 py-1 text-left ${
                          countryFilter === c
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 text-gray-800 hover:bg-gray-50"
                        }`}
                      >
                        {countryFilter === c ? "✓ " : ""}
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-gray-200 bg-white">
        <div className="border-b px-4 py-3 sm:px-6">
          <h2 className="text-sm font-semibold text-gray-900">SMS Provider</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 font-medium">Provider Name</th>
                <th className="px-4 py-3 font-medium">Country Support</th>
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

                  <td className="px-4 py-4 text-gray-700">
                    <span className="mr-1">{p.flag}</span>
                    {p.country}
                  </td>

                  <td className="px-4 py-4">
                    <PriorityStars n={p.priority} />
                  </td>

                  <td className="px-4 py-4">
                    <StatusPill status={p.status} />
                  </td>

                  <td className="relative px-4 py-4">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
                      onClick={() => setMenuFor((v) => (v === p.id ? null : p.id))}
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
                            goConfigure(p);
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50"
                        >
                          <Cog className="h-4 w-4" />
                          Configure
                        </button>
                        <button
                          type="button"
                          onClick={() => setMenuFor(null)}
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

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                    No providers match your search/filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer: pagination + export */}
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

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show per page:</span>
            <button className="inline-flex h-8 min-w-[40px] items-center justify-center rounded-md border border-gray-200 px-2 text-sm">
              4
            </button>
          </div>

          <PrimaryButton className="sm:ml-auto">Export</PrimaryButton>
        </div>
      </div>
    </PageShell>
  );
}
