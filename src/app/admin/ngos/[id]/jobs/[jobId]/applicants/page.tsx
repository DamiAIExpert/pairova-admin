"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, Plus, FileText, ThumbsUp, ChevronRight, ArrowRight } from "lucide-react";

/* --------------------------------- UI --------------------------------- */

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1200px] px-6 pb-12">{children}</div>;
}

function StageHeader({ title, count }: { title: string; count: number | string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
        {title} ({count})
      </div>
      <button
        className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
        aria-label="add to stage"
        type="button"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-[11px] text-gray-700">
      {children}
    </span>
  );
}

/* --------------------------- avatar generator --------------------------- */

const avatarUrl = (seed: string) =>
  // Deterministic, no-auth, fast. You can tweak background & color if you like.
  `https://avatar.vercel.sh/${encodeURIComponent(seed)}.png?size=96`;

/* -------------------------------- data -------------------------------- */

type Applicant = {
  id: string;
  name: string;
  email: string;
  role: string;
  files: number;
  match: number;
  avatar?: string; // optional—generated from email/name when missing
};

function ApplicantCard({
  a,
  href,
}: {
  a: Applicant;
  href: string;
}) {
  const src = a.avatar || avatarUrl(a.email || a.name);

  return (
    <Link
      href={href}
      className="block rounded-xl border border-gray-200 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
      aria-label={`View ${a.name}'s application`}
    >
      <div className="flex items-center gap-3">
        <Image
          src={src}
          alt={a.name}
          width={36}
          height={36}
          unoptimized
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-gray-900">{a.name}</div>
          <span className="truncate text-[12px] text-sky-600">{a.email}</span>
        </div>

        <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
      </div>

      <div className="mt-2 text-[12px] text-gray-700">{a.role}</div>

      <div className="mt-3 flex items-center gap-2">
        <Chip>
          <FileText className="h-3.5 w-3.5" /> {a.files} Files
        </Chip>
        <Chip>
          <ThumbsUp className="h-3.5 w-3.5" /> {a.match}%
        </Chip>
      </div>
    </Link>
  );
}

const applied: Applicant[] = [
  { id: "a1", name: "Robert Foxx", email: "robertfoxx@gmail.com", role: "Charity Manager", files: 13, match: 79 },
  { id: "a2", name: "Stella Nzibuike", email: "stellanzibuike@gmail.com", role: "Charity Administrator", files: 13, match: 90 },
  { id: "a3", name: "Shaibu Victory", email: "shaibuvictory@gmail.com", role: "Office Administrator", files: 13, match: 90 },
];

const underReview: Applicant[] = [
  { id: "u1", name: "Melinda James", email: "melindajam@gmail.com", role: "Nonprofit Administrator", files: 13, match: 85 },
  { id: "u2", name: "Chale Patrick", email: "chalepatrick@gmail.com", role: "Administrative Lead", files: 13, match: 90 },
  { id: "u3", name: "Rita Emeka", email: "ritaemeka@gmail.com", role: "Project Administrator", files: 13, match: 90 },
];

const interview: Applicant[] = [
  { id: "i1", name: "Paul Atimpko", email: "paulatimpko@gmail.com", role: "Charity Coordinator", files: 13, match: 92 },
  { id: "i2", name: "Ayra Gbolade", email: "ayragbolade@gmail.com", role: "Volunteer Coordinator", files: 13, match: 90 },
  { id: "i3", name: "Fisoye Abubakar", email: "fisoyeabubakar@gmail.com", role: "Administrator Volunteer", files: 13, match: 90 },
];

const hiring: Applicant[] = [
  { id: "h1", name: "David Bent", email: "david_bent@gmail.com", role: "Management Expert", files: 13, match: 90 },
  { id: "h2", name: "Wisdom Ifeanyi", email: "wisdomifeanyi@gmail.com", role: "Expertise in charity management", files: 13, match: 90 },
  { id: "h3", name: "Praise Adams", email: "praiseadams@gmail.com", role: "Charity Lead", files: 13, match: 90 },
];

/* ------------------------------- the page ------------------------------- */

export default function ApplicantsBoardPage({
  params,
}: {
  params: { id: string; jobId: string };
}) {
  const router = useRouter();

  return (
    <PageShell>
      {/* Header: back + job title */}
      <div className="mb-6 flex items-center gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-800 hover:bg-gray-50"
          aria-label="Back"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Charity Administrator</h1>
      </div>

      {/* Columns */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Applied */}
        <div className="space-y-3">
          <StageHeader title="Applied Job" count={applied.length} />
          {applied.map((a) => (
            <ApplicantCard
              key={a.id}
              a={a}
              href={`/admin/ngos/${params.id}/jobs/${params.jobId}/applicants/${a.id}`}
            />
          ))}
        </div>

        {/* Under Review */}
        <div className="space-y-3">
          <StageHeader title="UnderReview" count={underReview.length} />
          {underReview.map((a) => (
            <ApplicantCard
              key={a.id}
              a={a}
              href={`/admin/ngos/${params.id}/jobs/${params.jobId}/applicants/${a.id}`}
            />
          ))}
        </div>

        {/* Interview */}
        <div className="space-y-3">
          <StageHeader title="Interview" count={interview.length} />
          {interview.map((a) => (
            <ApplicantCard
              key={a.id}
              a={a}
              href={`/admin/ngos/${params.id}/jobs/${params.jobId}/applicants/${a.id}`}
            />
          ))}
        </div>

        {/* Hiring */}
        <div className="space-y-3">
          <StageHeader title="Hiring Job" count={hiring.length} />
          {hiring.map((a) => (
            <ApplicantCard
              key={a.id}
              a={a}
              href={`/admin/ngos/${params.id}/jobs/${params.jobId}/applicants/${a.id}`}
            />
          ))}
        </div>
      </div>

      {/* Pagination row (static demo) */}
      <div className="mt-8 flex flex-col items-center justify-between gap-3 text-sm text-gray-700 sm:flex-row">
        <div className="flex items-center gap-1">
          <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50">
            <ChevronLeft className="h-4 w-4" />
          </button>
        {[1, 2, 3, 4].map((p) => (
            <button
              key={p}
              className={`h-8 min-w-[32px] rounded-md border ${
                p === 2
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

        <div>
          <span>Show per page: </span>
          <button className="inline-flex h-8 min-w-[36px] items-center justify-center rounded-md border border-gray-200 px-2">
            4
          </button>
        </div>
      </div>
    </PageShell>
  );
}
