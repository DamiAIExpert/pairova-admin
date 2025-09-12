// src/app/admin/ngos/[id]/jobs/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Trash2, MapPin } from "lucide-react";

/* ----------------------------- small helpers ---------------------------- */

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1200px] px-6 pb-12">{children}</div>;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] text-gray-700">
      {children}
    </span>
  );
}

/* --------------------------------- data -------------------------------- */

type JobCardData = {
  id: string;
  title: string;
  org: string;
  city: string;
  country: string;
  mode: "Onsite" | "Hybrid" | "Remote";
  type: "Full Time" | "Part Time" | "Volunteer";
  exp: "0-1 Years" | "1-3 Years" | "3-5 Years";
  applicants: number;
  price?: string;
  updated: string;
};

const ALL_JOBS: JobCardData[] = [
  { id: "job-1001", title: "Non-Profit Grant Expert", org: "Shalom Health", city: "Abuja", country: "Nigeria", mode: "Hybrid", type: "Full Time", exp: "1-3 Years", applicants: 50, price: "$100 per month", updated: "1 day ago" },
  { id: "job-1002", title: "Charity Administrator", org: "Fey", city: "Abuja", country: "Nigeria", mode: "Onsite", type: "Full Time", exp: "1-3 Years", applicants: 50, updated: "1 day ago" },
  { id: "job-1003", title: "Legal Volunteer", org: "Quicken", city: "Abuja", country: "Nigeria", mode: "Hybrid", type: "Part Time", exp: "1-3 Years", applicants: 50, updated: "1 day ago" },
  { id: "job-1004", title: "Charity Manager", org: "Height", city: "Abuja", country: "Nigeria", mode: "Hybrid", type: "Full Time", exp: "1-3 Years", applicants: 50, price: "$100 per month", updated: "1 day ago" },
  { id: "job-1005", title: "Software Tester", org: "Espensify", city: "Abuja", country: "Nigeria", mode: "Onsite", type: "Full Time", exp: "1-3 Years", applicants: 50, price: "$100 per month", updated: "1 day ago" },
  { id: "job-1006", title: "Professional Agent", org: "Masterclass", city: "Abuja", country: "Nigeria", mode: "Hybrid", type: "Full Time", exp: "1-3 Years", applicants: 50, price: "$100 per month", updated: "1 day ago" },
  { id: "job-1007", title: "Non-Profit Grant Expert", org: "Navan", city: "Abuja", country: "Nigeria", mode: "Hybrid", type: "Full Time", exp: "1-3 Years", applicants: 50, price: "$100 per month", updated: "1 day ago" },
  { id: "job-1008", title: "Non-Profit Grant Expert", org: "Lyssna", city: "Abuja", country: "Nigeria", mode: "Hybrid", type: "Full Time", exp: "1-3 Years", applicants: 50, price: "$100 per month", updated: "1 day ago" },
  { id: "job-1009", title: "Non-Profit Grant Expert", org: "Shalom Health", city: "Abuja", country: "Nigeria", mode: "Hybrid", type: "Full Time", exp: "1-3 Years", applicants: 50, price: "$100 per month", updated: "1 day ago" },
  { id: "job-1010", title: "Non-Profit Grant Expert", org: "Navan", city: "Abuja", country: "Nigeria", mode: "Hybrid", type: "Full Time", exp: "1-3 Years", applicants: 50, price: "$100 per month", updated: "1 day ago" },
  { id: "job-1011", title: "Non-Profit Grant Expert", org: "Lyssna", city: "Abuja", country: "Nigeria", mode: "Hybrid", type: "Full Time", exp: "1-3 Years", applicants: 50, price: "$100 per month", updated: "1 day ago" },
  { id: "job-1012", title: "Non-Profit Grant Expert", org: "Shalom Health", city: "Abuja", country: "Nigeria", mode: "Hybrid", type: "Full Time", exp: "1-3 Years", applicants: 50, price: "$100 per month", updated: "1 day ago" },
];

const COUNTRIES = ["All", "Nigeria", "South Africa", "Kenya", "Ghana"];

/* ------------------------------- Job Card ------------------------------- */

function JobCard({
  job,
  ngoId,
  selected,
  onToggleSelect,
  onDelete,
}: {
  job: JobCardData;
  ngoId: string;
  selected: boolean;
  onToggleSelect: () => void;
  onDelete: (id: string) => void;
}) {
  const letter =
    job.org?.trim()?.charAt(0)?.toUpperCase() ||
    job.title?.trim()?.charAt(0)?.toUpperCase() ||
    "S";

  return (
    <div
      className={[
        "relative rounded-xl border bg-white p-3 shadow-sm transition-colors",
        selected ? "border-gray-900 ring-2 ring-gray-900" : "border-gray-200",
      ].join(" ")}
    >
      {/* quick delete */}
      <button
        title="Delete job"
        className="absolute right-2 top-2 rounded-md p-1 text-gray-600 hover:bg-gray-100"
        onClick={() => onDelete(job.id)}
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {/* header */}
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-[13px] font-semibold text-gray-900">
          {letter}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <div className="truncate text-[13px] font-medium text-gray-900">
              {job.title}
            </div>
            <input
              type="checkbox"
              checked={selected}
              onChange={onToggleSelect}
              className="h-4 w-4 rounded border-gray-300"
              title="Select job"
            />
          </div>

          <div className="truncate text-[12px] text-gray-700">
            {job.org} •{" "}
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {job.city}
            </span>
          </div>
        </div>
      </div>

      {/* match blurb */}
      <div className="mb-2 text-[11px] text-gray-600">Match with your profile</div>

      {/* tags */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        <Tag>{job.type}</Tag>
        <Tag>{job.mode}</Tag>
        <Tag>{job.exp}</Tag>
      </div>

      {/* meta */}
      <div className="mb-3 text-[11px] text-gray-600">
        {job.updated} • {job.applicants} applicants
      </div>

      {/* footer */}
      <div className="flex items-center justify-between">
        <div className="text-[12px] font-semibold text-gray-900">
          {job.type === "Volunteer" ? <span className="text-gray-800">Volunteer</span> : job.price || "-"}
        </div>

        <Link
          href={`/admin/ngos/${ngoId}/jobs/${job.id}`}
          className="inline-flex items-center justify-center rounded-md border border-gray-200 px-3 py-1.5 text-[12px] text-gray-800 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white"
        >
          View
        </Link>
      </div>
    </div>
  );
}

/* --------------------------------- page -------------------------------- */

export default function NgoJobsGridPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [country, setCountry] = React.useState<string>("Nigeria");
  const [city, setCity] = React.useState<string>("All City");
  const [page, setPage] = React.useState(1);

  // selection
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const allJobs = React.useMemo(() => ALL_JOBS, []);
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return allJobs.filter((j) => {
      const matchQ =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.org.toLowerCase().includes(q) ||
        j.city.toLowerCase().includes(q);
      const matchCountry = country === "All" || j.country === country;
      const matchCity = city === "All City" || j.city === city;
      return matchQ && matchCountry && matchCity;
    });
  }, [allJobs, query, country, city]);

  const allFilteredIds = React.useMemo(
    () => filtered.map((j) => j.id),
    [filtered],
  );
  const allSelected =
    allFilteredIds.length > 0 &&
    allFilteredIds.every((id) => selectedIds.includes(id));

  const toggleSelectAll = () => {
    if (allSelected) {
      // unselect all visible
      setSelectedIds((prev) => prev.filter((id) => !allFilteredIds.includes(id)));
    } else {
      // add all visible
      setSelectedIds((prev) => Array.from(new Set([...prev, ...allFilteredIds])));
    }
  };

  const toggleOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const onDeleteJob = (id: string) => {
    if (!confirm("Delete this job? This action cannot be undone.")) return;
    alert(`Deleted job (mock): ${id}`);
    // Wire to API here as needed
  };

  const onDeleteAll = () => {
    if (!confirm("Delete ALL jobs for this NGO?")) return;
    alert("Deleted all jobs (mock).");
  };

  return (
    <PageShell>
      {/* Filters row (no title) */}
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_180px_200px_120px]">
        {/* search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search.."
            className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* country */}
        <select
          className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* city */}
        <select
          className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          {["All City", "Abuja", "Lagos"].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* search button styled to match design */}
        <button
          onClick={() => router.refresh()}
          className="h-10 rounded-lg bg-gray-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-black"
        >
          Search
        </button>
      </div>

      {/* Select all */}
      <div className="mb-3">
        <button
          type="button"
          onClick={toggleSelectAll}
          className="inline-flex items-center rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-800 transition-colors hover:bg-gray-50"
        >
          {allSelected ? "Unselect all" : "Select all"}
        </button>
      </div>

      {/* Grid of cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            ngoId={params.id}
            selected={selectedIds.includes(job.id)}
            onToggleSelect={() => toggleOne(job.id)}
            onDelete={onDeleteJob}
          />
        ))}
      </div>

      {/* Footer controls */}
      <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
        {/* Pagination (static demo) */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`h-8 min-w-[32px] rounded-md border text-sm ${
                p === page
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
            9
          </button>
        </div>

        <button
          onClick={onDeleteAll}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black"
        >
          Delete all jobs
        </button>
      </div>
    </PageShell>
  );
}
