"use client";

import React from "react";
import Link from "next/link";
import {
  MoreVertical,
  Search,
  SlidersHorizontal,
  Eye,
  Pencil,
  Trash2,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import NextImage, { ImageProps as NextImageProps } from "next/image";

/* ============================================================================
   SafeImage – next/image with graceful fallback for sandbox/preview
============================================================================ */

type SafeImageProps = NextImageProps & { fallbackSrc?: string };
function SafeImage({ fallbackSrc = "/logo.svg", onError, ...props }: SafeImageProps) {
  const [failed, setFailed] = React.useState(false);
  if (failed) {
    const { alt, className, width, height, src } = props;
    const resolvedSrc = typeof src === "string" ? src : (src as unknown as { src?: string })?.src ?? fallbackSrc;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={resolvedSrc} alt={alt ?? ""} className={className} width={Number(width) || 1} height={Number(height) || 1} />;
  }
  return (
    <NextImage
      {...props}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
}

/* ============================================================================
   Types
============================================================================ */

type Applicant = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  match: number; // %
  status: "New" | "Shortlisted" | "Rejected";
};

type Job = {
  id: string;
  title: string;
  city: string;
  company: string;
  type: "Volunteer" | "Contract" | "Full Time" | "Part Time";
  salary?: string;
  postedAgo: string;
  applicantsCount: number;
  applicants: Applicant[];
};

type NgoRow = {
  id: string;            // slug-safe unique id
  name: string;
  createdAt: string;     // “30 September 2025”
  jobsUploaded: number;
  status: "Success" | "Pending" | "Denied";
  logo?: string;
  companySize?: string;
  type?: string;
  sector?: string;
  founded?: string;
  jobs: Job[];
};

/* ============================================================================
   Small UI Primitives
============================================================================ */
function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1200px] px-6 pb-12">{children}</div>;
}

function PrimaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
) {
  const { className, ...rest } = props;
  return (
    <button
      {...rest}
      className={`inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 px-4 text-sm font-medium text-white hover:bg-black ${className ?? ""}`}
    />
  );
}

function StatusPill({ status }: { status: "Success" | "Pending" | "Denied" }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  if (status === "Success")
    return <span className={`${base} bg-green-50 text-green-700`}>Success</span>;
  if (status === "Pending")
    return <span className={`${base} bg-amber-50 text-amber-700`}>Pending</span>;
  return <span className={`${base} bg-rose-50 text-rose-700`}>Denied</span>;
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

/* ============================================================================
   Mock Data (swap with your API later)
============================================================================ */
const SAMPLE_APPLICANTS: Applicant[] = [
  {
    id: "stella-akanbi",
    name: "Stella Akanbi",
    email: "stella.akanbi@example.com",
    avatar: "/admin-stats/avatar-1.png",
    match: 90,
    status: "Shortlisted",
  },
  {
    id: "david-bent",
    name: "David Bent",
    email: "david.bent@example.com",
    avatar: "/admin-stats/avatar-2.png",
    match: 82,
    status: "New",
  },
  {
    id: "wisdom-ifeanyi",
    name: "Wisdom Ifeanyi",
    email: "wisdom.ifeanyi@example.com",
    avatar: "/admin-stats/avatar-3.png",
    match: 76,
    status: "New",
  },
];

const MOCK_NGOS: NgoRow[] = [
  {
    id: "stadar-plc",
    name: "Stadar Plc",
    createdAt: "30 September 2025",
    jobsUploaded: 10,
    status: "Success",
    logo: "/logo.svg",
    companySize: "1000 – 5000 employees",
    type: "Company – Public",
    sector: "Financial Services",
    founded: "1999",
    jobs: [
      {
        id: "charity-administrator",
        title: "Charity Administrator",
        city: "Abuja",
        company: "Fey",
        type: "Volunteer",
        postedAgo: "1 day ago",
        salary: "$100 per month",
        applicantsCount: 50,
        applicants: SAMPLE_APPLICANTS,
      },
      {
        id: "office-administrator",
        title: "Office Administrator",
        city: "Abuja",
        company: "Heighit",
        type: "Full Time",
        postedAgo: "1 day ago",
        salary: "$100 per month",
        applicantsCount: 45,
        applicants: SAMPLE_APPLICANTS.slice(0, 2),
      },
    ],
  },
  {
    id: "aidworks",
    name: "AidWorks",
    createdAt: "30 September 2025",
    jobsUploaded: 200,
    status: "Pending",
    logo: "/logo.svg",
    companySize: "500 – 1000 employees",
    type: "Private Company",
    sector: "Health",
    founded: "2008",
    jobs: [
      {
        id: "volunteer-coordinator",
        title: "Volunteer Coordinator",
        city: "Lagos",
        company: "AidWorks",
        type: "Contract",
        postedAgo: "3 days ago",
        salary: "$300 per month",
        applicantsCount: 20,
        applicants: SAMPLE_APPLICANTS,
      },
    ],
  },
  {
    id: "hopebridge",
    name: "HopeBridge",
    createdAt: "30 September 2025",
    jobsUploaded: 401,
    status: "Denied",
    logo: "/logo.svg",
    companySize: "200 – 500 employees",
    type: "Private Company",
    sector: "Education",
    founded: "2015",
    jobs: [],
  },
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `stadar-plc-${i + 2}`,
    name: "Stadar Plc",
    createdAt: "30 September 2025",
    jobsUploaded: 75,
    status: "Success" as const,
    logo: "/logo.svg",
    companySize: "100 – 200 employees",
    type: "Private Company",
    sector: "Community",
    founded: "2019",
    jobs: [],
  })),
];

/* ============================================================================
   Page
============================================================================ */
export default function AdminNgosPage() {
  // query & status filter
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"All" | "Success" | "Pending" | "Denied">("All");

  const [ngos, setNgos] = React.useState<NgoRow[]>(MOCK_NGOS);

  // row menu
  const [menuFor, setMenuFor] = React.useState<string | null>(null);
  const menuRef = useOutsideClose(() => setMenuFor(null));

  // derived
  const filtered = React.useMemo(() => {
    let list = ngos;
    if (status !== "All") list = list.filter((n) => n.status === status);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((n) => n.name.toLowerCase().includes(q));
    }
    return list;
  }, [ngos, query, status]);

  // mock delete
  const handleDeleteNgo = (id: string) => {
    if (!confirm("Delete NGO? (mock)")) return;
    setNgos((s) => s.filter((x) => x.id !== id));
  };

  return (
    <PageShell>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-gray-900">Non Profit</h1>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="hidden items-center rounded-lg border border-gray-200 pl-3 pr-2 text-sm text-gray-700 sm:flex">
            <Search className="mr-2 h-4 w-4 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search NGOs..."
              className="h-9 w-64 bg-transparent outline-none"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={status}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setStatus(e.target.value as "All" | "Success" | "Pending" | "Denied")
              }
              className="h-10 appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-8 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option>All</option>
              <option>Success</option>
              <option>Pending</option>
              <option>Denied</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Placeholder filter button */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
            aria-label="filters"
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
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Creation Date</th>
                <th className="px-4 py-3 font-medium">Job Uploaded</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((n) => {
                // canonical routes for management
                const viewHref = `/admin/ngos/${encodeURIComponent(n.id)}`;
                const editHref = `/admin/ngos/${encodeURIComponent(n.id)}/edit`;
                const jobsHref = `/admin/ngos/${encodeURIComponent(n.id)}/jobs`;

                return (
                  <tr key={n.id} className="border-t">
                    <td className="px-4 py-4">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    </td>

                    <td className="px-4 py-4">
                      <Link href={viewHref} className="flex items-center gap-2 hover:underline">
                        <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-md ring-1 ring-gray-200">
                          <SafeImage
                            src={n.logo || "/logo.svg"}
                            alt={`${n.name} logo`}
                            width={24}
                            height={24}
                          />
                        </span>
                        <span className="text-gray-900">{n.name}</span>
                      </Link>
                    </td>

                    <td className="px-4 py-4 text-gray-700">{n.createdAt}</td>

                    <td className="px-4 py-4">
                      <Link
                        href={jobsHref}
                        className="inline-flex items-center gap-1 text-gray-700 underline underline-offset-2 hover:text-gray-900"
                      >
                        {n.jobsUploaded}
                        <Briefcase className="h-4 w-4" />
                      </Link>
                    </td>

                    <td className="px-4 py-4">
                      <StatusPill status={n.status} />
                    </td>

                    <td className="relative px-4 py-4">
                      <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
                        onClick={() => setMenuFor((v) => (v === n.id ? null : n.id))}
                        aria-label="More"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>

                      {menuFor === n.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-4 top-12 z-20 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
                        >
                          <Link
                            href={viewHref}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                            onClick={() => setMenuFor(null)}
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Link>
                          <Link
                            href={editHref}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                            onClick={() => setMenuFor(null)}
                          >
                            <Pencil className="h-4 w-4" />
                            Edit
                          </Link>
                          <Link
                            href={jobsHref}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                            onClick={() => setMenuFor(null)}
                          >
                            <Briefcase className="h-4 w-4" />
                            Uploaded Jobs
                          </Link>
                          <button
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50"
                            onClick={() => {
                              setMenuFor(null);
                              handleDeleteNgo(n.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer: simple pagination mock + export */}
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
              10
            </button>
          </div>

          <PrimaryButton className="sm:ml-auto">Export</PrimaryButton>
        </div>
      </div>
    </PageShell>
  );
}
