"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

/**
 * Jobs layout for an NGO.
 * - When you're on `/admin/ngos/[id]/jobs` it just shows a header and renders children (the jobs list).
 * - When you're on a specific job (e.g. `/admin/ngos/[id]/jobs/[jobId]`, `/edit`, `/applicants`)
 *   it shows a secondary tab bar for that job: Overview | Edit | Applicants.
 */

function TabLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
        isActive
          ? "bg-gray-900 text-white"
          : "text-gray-800 hover:bg-gray-50 border border-gray-200",
      ].join(" ")}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export default function NgoJobsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const pathname = usePathname();

  // Parse the current path to determine if we're inside a specific job.
  // Expected shapes:
  // /admin/ngos/[id]/jobs
  // /admin/ngos/[id]/jobs/[jobId]
  // /admin/ngos/[id]/jobs/[jobId]/edit
  // /admin/ngos/[id]/jobs/[jobId]/applicants
  const parts = (pathname || "/").split("/").filter(Boolean);
  const jobsIdx = parts.indexOf("jobs");
  const jobId =
    jobsIdx >= 0 && parts.length > jobsIdx + 1
      ? parts[jobsIdx + 1]
      : undefined;

  const onOverview = jobId && parts[jobsIdx + 2] === undefined;
  const onEdit = jobId && parts.includes("edit");
  const onApplicants = jobId && parts.includes("applicants");

  const baseJobs = `/admin/ngos/${params.id}/jobs`;
  const jobBase = jobId ? `${baseJobs}/${jobId}` : null;

  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-12">
      {/* Header / breadcrumb */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/ngos"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to NGOs
          </Link>
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">NGO</span>
            <span className="mx-1">•</span>
            <span>Jobs</span>
            {jobId ? (
              <>
                <span className="mx-1">•</span>
                <span className="text-gray-900">Job: {jobId}</span>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Title (list vs job context) */}
      {!jobId ? (
        <h1 className="mb-4 text-xl font-semibold text-gray-900">
          Jobs Uploaded
        </h1>
      ) : (
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Job Management</h1>
          <p className="text-sm text-gray-600">
            Manage this job, edit details, and review applicants.
          </p>
        </div>
      )}

      {/* Job-level tabs (only when viewing a specific job) */}
      {jobBase ? (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <TabLink href={jobBase} isActive={!!onOverview}>
            Overview
          </TabLink>
          <TabLink href={`${jobBase}/edit`} isActive={!!onEdit}>
            Edit
          </TabLink>
          <TabLink href={`${jobBase}/applicants`} isActive={!!onApplicants}>
            Applicants
          </TabLink>
        </div>
      ) : null}

      {/* Nested route content */}
      {children}
    </div>
  );
}
