// src/app/admin/ngos/[id]/jobs/[jobId]/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  MapPin,
  Building2,
  Globe,
  Trash2,
  BadgeInfo,
} from "lucide-react";

/* ------------------------------- small UI ------------------------------- */

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1100px] px-6 pb-12">{children}</div>;
}

function Card({
  title,
  children,
  right,
}: {
  title?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white">
      {(title || right) && (
        <header className="flex items-center justify-between border-b px-4 py-3 sm:px-6">
          {title ? (
            <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
          ) : (
            <span />
          )}
          {right}
        </header>
      )}
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}

function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-800",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

/* --------------------------------- data -------------------------------- */

type Job = {
  id: string;
  title: string;
  org: string;
  city: string;
  country: string;
  mode: "Onsite" | "Hybrid" | "Remote";
  workType: "Full Time" | "Part Time" | "Volunteer";
  experience: "0-1 Years" | "1-3 Years" | "3-5 Years";
  applicants: number;
  summaryLabel: string; // “Volunteer”
  about: string;
  qualifications: string[];
  responsibilities: string[];
  company: {
    size: string;
    type: string;
    sector: string;
    founded: string;
    industry: string;
    location: string;
    mission: string;
  };
  skills: {
    soft: string[];
    technical: string[];
  };
};

function getMockJob(jobId: string): Job {
  return {
    id: jobId,
    title: "Charity Administrator",
    org: "Fey",
    city: "Abuja",
    country: "Nigeria",
    mode: "Onsite",
    workType: "Full Time",
    experience: "1-3 Years",
    applicants: 100,
    summaryLabel: "Volunteer",
    about:
      "A Charity Administrator plays a crucial role in the smooth operation of a nonprofit organization. This role involves handling administrative tasks, managing records, coordinating fundraising efforts, and ensuring compliance with charity regulations. Experience in office administration, fundraising, or volunteer coordination is a plus. This role is perfect for someone passionate about making a difference while ensuring the charity runs efficiently.",
    qualifications: [
      "At least 1–3 years of experience in administration, office management, or charity work.",
      "A degree or diploma in Business Administration, Nonprofit Management, Social Work, or a related field.",
      "Strong ability to manage records, schedules, and documents efficiently.",
      "Excellent written and verbal communication skills for liaising with donors, volunteers, and stakeholders.",
    ],
    responsibilities: [
      "Maintain accurate records, databases, and documentation for the charity.",
      "Assist in planning and coordinating fundraising campaigns and charity events.",
      "Work with finance teams to manage payroll and supplier payments.",
      "Liaise with board members, trustees, and external partners.",
      "Ensure compliance with charity laws, regulations, and data protection policies.",
    ],
    company: {
      size: "1000 – 5000 employees",
      type: "Company – Public",
      sector: "Financial Services",
      founded: "1999",
      industry: "Financial Processing",
      location: "South Africa",
      mission:
        "At Fey, our mission is to empower communities and drive positive change by ensuring the efficient and transparent operation of charitable initiatives. Through dedicated administration, strategic fundraising, and strong governance, we strive to maximize the impact of our programs and support those in need. We are committed to fostering a culture of compassion, integrity, and innovation, ensuring that every resource is effectively managed to serve our beneficiaries.",
    },
    skills: {
      soft: [
        "Fundraising & Grant Writing",
        "Communication & Public Speaking",
        "Problem-Solving",
        "Compliance & Legal Knowledge",
        "Strong ability to manage records, schedules, and documents efficiently",
      ],
      technical: ["Microsoft Office"],
    },
  };
}

/* --------------------------------- page -------------------------------- */

export default function NgoJobDetailPage({
  params,
}: {
  params: { id: string; jobId: string };
}) {
  const router = useRouter();
  const job = React.useMemo(() => getMockJob(params.jobId), [params.jobId]);

  const onDelete = () => {
    if (!confirm("Delete this job? This action cannot be undone.")) return;
    alert("Deleted (mock). Wire this to your API.");
    router.push(`/admin/ngos/${params.id}/jobs`);
  };

  return (
    <PageShell>
      {/* Top bar: breadcrumb and delete */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm text-gray-800 hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          <div className="ml-2 text-sm text-gray-700">
            <span className="font-medium text-gray-900">Non Profit</span>
          </div>
        </div>

        <button
          onClick={onDelete}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-50"
        >
          Delete
        </button>
      </div>

      {/* Header card */}
      <Card>
        <div className="space-y-4">
          <h1 className="text-lg font-semibold text-gray-900">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
            <span className="inline-flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {job.org}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.city}, {job.country}
            </span>
            <span className="inline-flex items-center gap-1">
              <Globe className="h-4 w-4" />
              {job.mode}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Pill>{job.workType}</Pill>
            <Pill>{job.mode}</Pill>
            <Pill>{job.experience}</Pill>
          </div>

          <div className="text-sm text-gray-700">
            <span className="font-medium">{job.summaryLabel}</span>
            <span className="mx-1">•</span>
            {job.applicants} Applicants
          </div>
        </div>
      </Card>

      {/* About */}
      <div className="mt-6 grid gap-6">
        <Card title="About this role">
          <p className="text-sm leading-6 text-gray-700">{job.about}</p>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card title="Qualifications">
            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
              {job.qualifications.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </Card>

          <Card title="Responsibilities">
            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
              {job.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Company overview */}
        <Card title="Company Overview">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200">
              <div className="grid grid-cols-2 text-sm">
                <div className="border-b border-r p-3 text-gray-600">Size</div>
                <div className="border-b p-3 text-gray-900">{job.company.size}</div>

                <div className="border-b border-r p-3 text-gray-600">Type</div>
                <div className="border-b p-3 text-gray-900">{job.company.type}</div>

                <div className="border-b border-r p-3 text-gray-600">Sector</div>
                <div className="border-b p-3 text-gray-900">{job.company.sector}</div>

                <div className="border-b border-r p-3 text-gray-600">Founded</div>
                <div className="border-b p-3 text-gray-900">{job.company.founded}</div>

                <div className="border-b border-r p-3 text-gray-600">Industry</div>
                <div className="border-b p-3 text-gray-900">{job.company.industry}</div>

                <div className="border-r p-3 text-gray-600">Location</div>
                <div className="p-3 text-gray-900">{job.company.location}</div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 p-3">
              <div className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-gray-900">
                <BadgeInfo className="h-4 w-4" />
                Mission Statement
              </div>
              <p className="text-sm leading-6 text-gray-700">
                {job.company.mission}
              </p>
            </div>
          </div>
        </Card>

        {/* Required skills */}
        <Card title="Required Skills">
          <div className="space-y-6">
            <div>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-rose-600">
                Hard and Soft Skills
              </div>
              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                {job.skills.soft.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-rose-600">
                Technical Skills
              </div>
              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                {job.skills.technical.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
