// src/app/admin/ngos/[id]/jobs/[jobId]/applicants/[applicantId]/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import {
  CheckCircle2,
  TrendingUp,
  MapPin,
  ChevronRight,
  School,
  BadgeCheck,
} from "lucide-react";

/* ------------------------------ Small UI kit ------------------------------ */

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1200px] px-6 pb-12">{children}</div>;
}

function Card({
  children,
  className,
  title,
  subtitle,
  right,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <section
      className={`rounded-2xl border border-gray-200 bg-white ${className ?? ""}`}
    >
      {(title || subtitle || right) && (
        <header className="flex items-center justify-between border-b px-4 py-3 sm:px-6">
          <div>
            {title && (
              <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
            )}
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
          {right}
        </header>
      )}
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-700">
      {children}
    </span>
  );
}

/* ------------------------------- Mock data ------------------------------- */

const applicant = {
  id: "a2",
  name: "Ayra Gbolade",
  role: "Charity Administrator",
  avatar: "/admin-stats/avatar-1.png",
  bio: `Ayra Gbolade is a dynamic and results-driven Administrator with over a decade of experience in leading high-performing teams across diverse industries. Known for the ability to foster collaboration, drive productivity, and inspire team members to achieve their full potential.`,
  matchScore: 74,
};

const chart = {
  labels: ["Mission", "Experience", "Education", "Skills", "Values"],
  values: [92, 48, 72, 86, 61],
};

const explanation = {
  education:
    "Holding a degree in the field along with a specialized qualification in charity administration, they possess a strong foundation in nonprofit governance, financial management, and fundraising strategies.",
  mission:
    "Dedicated to strengthening nonprofit organizations by implementing strategic solutions that drive growth, enhance efficiency, and create lasting positive change in society.",
  experience:
    "With extensive experience in nonprofit operations, stakeholder engagement, and regulatory compliance, they have successfully led fundraising campaigns, managed financial oversight, and implemented strategic initiatives to enhance organizational impact.",
  skills:
    "Proficient in financial management, compliance, fundraising, stakeholder relations, and nonprofit governance. Strong leadership, problem-solving, and strategic planning abilities ensure effective decision-making and operational efficiency.",
  values:
    "Committed to integrity, transparency, and ethical leadership; prioritize collaboration, inclusivity, and accountability in all aspects of nonprofit management.",
};

const experience = [
  {
    company: "Project Manager",
    org: "Q Company",
    time: "September 2010 – August 2018",
    location: "Lagos, Nigeria",
    more: true,
  },
  {
    company: "Charity Manager",
    org: "Quantum SAID",
    time: "September 2010 – August 2018",
    location: "Lagos, Nigeria",
    bullets: [
      "Maintain accurate records, databases, and documentation for the charity",
      "Assist in planning and coordinating fundraising campaigns and charity events",
      "Work with finance teams to manage payroll and supplier payments",
      "Liaise with board members, trustees, and external partners",
      "Ensure compliance with charity laws, regulations, and data protection policies",
    ],
  },
];

const education = [
  {
    school: "Obafemi Awolowo University",
    degree: "Bachelor’s Degree",
    course: "Administration",
    note: "First Class Honours",
  },
  {
    school: "Harvard University",
    degree: "Masters Degree",
    course: "Project Management",
    note: "Distinction",
  },
];

const certifications = [
  {
    name: "Professional Business Administrator",
    issuer: "Google.com",
    issued: "Issued May 2022",
    verified: true,
  },
  {
    name: "Professional Project Specialist",
    issuer: "Oracle.org",
    issued: "Issued May 2018",
    verified: true,
  },
];

const softSkills = [
  "Fundraising & Grant Writing",
  "Communication & Public Speaking",
  "Problem-Solving",
  "Compliance & Legal Knowledge",
];

const techSkills = [
  "CRM Software",
  "Microsoft Office",
  "Email Marketing Tools",
  "Accounting Software",
];

/* ------------------------------- Components ------------------------------ */

// One bar in the chart
const Bar = ({ value, label }: { value: number; label: string }) => (
  <div className="flex h-full w-full flex-col items-center">
    <div className="flex h-full w-16 items-end md:w-20">
      <div
        className="w-full rounded-md bg-indigo-100"
        style={{ height: `${value}%` }}
      />
    </div>
    <p className="mt-3 text-center text-xs text-gray-500">{label}</p>
  </div>
);

// Wider chart with light “full-bleed” effect and visible y-axis
function ChartBars({ labels, values }: { labels: string[]; values: number[] }) {
  return (
    <div>
      <div className="mb-4 text-center text-[10px] uppercase tracking-widest text-gray-500">
        Chart Representation
      </div>

      {/* Full-bleed wrapper to eat the Card padding */}
      <div className="-mx-4 sm:-mx-6">
        <div className="relative h-[280px] px-4 sm:px-6">
          {/* Y-axis */}
          <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between pr-1 text-xs text-gray-500">
            <span>100%</span>
            <span>80%</span>
            <span>60%</span>
            <span>40%</span>
            <span>20%</span>
            <span className="relative top-2">0%</span>
          </div>

          {/* Bars */}
          <div className="grid h-full grid-cols-5 items-end gap-8 pr-10">
            {values.map((v, i) => (
              <Bar key={labels[i]} value={v} label={labels[i]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LabeledBlock({
  label,
  score,
  children,
}: {
  label: string;
  score?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2 rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <Pill>{label}</Pill>
        {typeof score === "number" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">
            {score}% Matchscore
          </span>
        )}
      </div>
      <p className="text-sm leading-6 text-gray-700">{children}</p>
    </div>
  );
}

/* --------------------------------- Page --------------------------------- */

export default function ApplicantProfilePage() {
  return (
    <PageShell>
      <h1 className="mb-4 text-lg font-semibold text-gray-900">
        Model Representation
      </h1>

      {/* Overview + Chart */}
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* Overview */}
        <Card className="flex flex-col">
          <div className="flex flex-1 flex-col space-y-4">
            <div className="text-sm font-semibold text-gray-900">Overview</div>

            <div className="flex items-center gap-3">
              <Image
                src={applicant.avatar}
                alt={applicant.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium text-gray-900">
                    {applicant.name}
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-sky-500" />
                </div>
                <div className="text-xs text-gray-600">{applicant.role}</div>
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-gray-500">
                Bio
              </div>
              <p className="text-sm leading-6 text-gray-700">{applicant.bio}</p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-3 text-center text-sm font-semibold text-emerald-700">
              {applicant.matchScore}% Matchscore
            </div>

            {/* FULL-WIDTH button now */}
            <a
              href="#"
              className="mt-auto inline-flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
            >
              <span>View Profile</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </Card>

        {/* Chart (wider) */}
        <Card>
          <ChartBars labels={chart.labels} values={chart.values} />
        </Card>
      </div>

      {/* Detailed Explanation */}
      <Card
        className="mt-6"
        title="Detailed Explanation"
        right={
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">
            {applicant.matchScore}% Matchscore
          </span>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <LabeledBlock label="Education">{explanation.education}</LabeledBlock>
          <LabeledBlock label="Mission">{explanation.mission}</LabeledBlock>
          <LabeledBlock label="Experience">{explanation.experience}</LabeledBlock>
          <LabeledBlock label="Skills">{explanation.skills}</LabeledBlock>
          <LabeledBlock label="Values">{explanation.values}</LabeledBlock>
        </div>
      </Card>

      {/* Experience */}
      <Card
        className="mt-6"
        title="Experience"
        right={
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">
            70% <TrendingUp className="h-3.5 w-3.5" />
          </span>
        }
      >
        <div className="space-y-6">
          {/* Role 1 */}
          <div className="rounded-xl border border-gray-200 p-4">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-800">
                Company
              </span>
              <span className="font-medium text-gray-900">
                {experience[0].company}
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-700">{experience[0].org}</div>
            <div className="mt-1 text-xs text-gray-500">{experience[0].time}</div>
            <div className="mt-1 inline-flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="h-3.5 w-3.5" /> {experience[0].location}
            </div>

            <div className="mt-3">
              <button className="inline-flex items-center rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-800 hover:bg-gray-50">
                View More
              </button>
            </div>
          </div>

          {/* Role 2 */}
          <div className="rounded-xl border border-gray-200 p-4">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-800">
                Company
              </span>
              <span className="font-medium text-gray-900">
                {experience[1].company}
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-700">{experience[1].org}</div>
            <div className="mt-1 text-xs text-gray-500">{experience[1].time}</div>
            <div className="mt-1 inline-flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="h-3.5 w-3.5" /> {experience[1].location}
            </div>

            <div className="mt-3">
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] text-rose-700">
                Role
              </span>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {experience[1].bullets!.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Education */}
      <Card
        className="mt-6"
        title="Education"
        right={
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">
            70% <TrendingUp className="h-3.5 w-3.5" />
          </span>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {education.map((e) => (
            <div
              key={e.school}
              className="flex items-start gap-3 rounded-xl border border-gray-200 p-4"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                <School className="h-5 w-5 text-gray-700" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-900">
                  {e.school}
                </div>
                <div className="text-xs text-gray-600">
                  {e.degree} • {e.course}
                </div>
                <div className="mt-1 text-xs text-sky-600">{e.note}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Certification */}
      <Card className="mt-6" title="Certification">
        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((c) => (
            <div
              key={c.name}
              className="flex items-start justify-between rounded-xl border border-gray-200 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <BadgeCheck className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {c.name}
                  </div>
                  <div className="text-xs text-gray-600">{c.issuer}</div>
                  <div className="mt-1 text-[11px] text-gray-500">
                    {c.issued}
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2">
                    {c.verified && (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">
                        Verified
                      </span>
                    )}
                    <button className="rounded-lg border border-gray-200 px-2 py-1 text-[11px] text-gray-800 hover:bg-gray-50">
                      Show Credential
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Skills */}
      <Card
        className="mt-6"
        title="Skills"
        right={
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">
            70% <TrendingUp className="h-3.5 w-3.5" />
          </span>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Hard and Soft Skills
            </div>
            <ul className="space-y-2 text-sm text-gray-800">
              {softSkills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Technical Skills
            </div>
            <ul className="space-y-2 text-sm text-gray-800">
              {techSkills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Feedback */}
      <Card className="mt-6" title="Feedback">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-gray-700">Was this helpful?</span>
          <div className="flex items-center gap-2">
            <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black">
              Yes
            </button>
            <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">
              No
            </button>
          </div>
        </div>
      </Card>
    </PageShell>
  );
}
