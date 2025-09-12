// src/app/admin/ngos/[id]/jobs/layout.tsx
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

/**
 * Jobs layout for an NGO.
 * - At `/admin/ngos/[id]/jobs` it shows a header and children (the jobs list).
 * - At `/admin/ngos/[id]/jobs/[jobId]`, `/edit`, `/applicants` it also shows tabs.
 */

function TabLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: ReactNode;
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

// ✅ Must be async so Next resolves `params` correctly
export default async function NgoJobsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) {
  const pathname = usePathname();

  // Parse path to detect job context
  const parts = (pathname || "/").split("/").filter(Boolean);
  const jobsIdx = parts.indexOf("jobs");
  const jobId =
    jobsIdx >= 0 && parts.length > jobsIdx + 1 ? parts[jobsIdx + 1] : undefined;

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

      {/* Title */}
      {!jobId ? (
        <h1 className="mb-4 text-xl font-semibold text-gray-900">Jobs Uploaded</h1>
      ) : (
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Job Management</h1>
          <p className="text-sm text-gray-600">
            Manage this job, edit details, and review applicants.
          </p>
        </div>
      )}

      {/* Tabs (only if viewing a specific job) */}
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
