"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Pencil,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  BadgeCheck,
  FileText,
  Paperclip,
  School,
  BriefcaseBusiness,
} from "lucide-react";

/* ------------------------------- primitives ------------------------------ */

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1200px] px-6 py-6">{children}</div>;
}

function Card({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="mb-4 rounded-2xl border border-gray-200 bg-white">
      <header className="flex items-center justify-between border-b px-4 py-3 sm:px-6">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        {action}
      </header>
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}

function SmallAction({ href = "#", label = "Edit" }: { href?: string; label?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-800 hover:bg-gray-50"
    >
      <Pencil className="h-3.5 w-3.5" />
      {label}
    </Link>
  );
}

function KV({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-gray-500">{label}</div>
      <div className="mt-0.5 text-sm text-gray-900">{value}</div>
    </div>
  );
}

function ChipFile({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800">
      <Paperclip className="h-4 w-4" />
      {name}
    </span>
  );
}

function Avatar({ seed, size = 56 }: { seed: string; size?: number }) {
  const src = `https://avatar.vercel.sh/${encodeURIComponent(seed)}.png?size=96`;
  return (
    <img
      src={src}
      alt={seed}
      width={size}
      height={size}
      className="h-14 w-14 rounded-full object-cover"
    />
  );
}

/* ---------------------------------- data ---------------------------------- */

const candidate = {
  id: "cand-1",
  firstName: "Jonathan",
  lastName: "Bushman",
  gender: "Male",
  role: "Team Manager",
  city: "Port Harcourt, Nigeria",
  email: "jonathanbushman51@gmail.com",
  phone: "+08-356-333-33",
  language: "English • French",
  position: "Team Manager",
  dob: "19 - 04 - 2022",
  country: "Nigeria",
  state: "Lekki, Lagos",
  postal: "0000111",
  taxId: "AQE-123-9002",
  bio: `Jonathan Smith is a dynamic and results-driven Team Manager with over a decade of experience in leading high-performing teams across diverse industries. Known for his ability to foster collaboration, drive productivity, and inspire team members to achieve their full potential, Jonathan excels in creating a positive and inclusive work environment. With a strong background in project management, strategic planning, and employee development, Jonathan has a proven track record of delivering exceptional results while maintaining a focus on team morale and professional growth.`,
  attachments: ["Jonathan_Bushman_Resume.pdf", "Personal Project.pdf"],
  education: [
    {
      school: "Obafemi Awolowo University",
      degree: "Bachelor's Degree",
      course: "Administration",
      note: "First Class Honours",
    },
    {
      school: "Harvard University",
      degree: "Masters Degree",
      course: "Data Science",
      note: "Distinction",
    },
  ],
  certs: [
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
  ],
  experience: [
    {
      company: "Quantum SAID",
      role: "Project Manager",
      type: "Full Time",
      time: "September 2010 - August 2018",
      location: "Lagos, Nigeria",
      bullets: [
        "Maintain accurate records, databases, and documentation for the charity",
        "Assist in planning and coordinating fundraising campaigns and charity events",
        "Work with finance teams to manage payroll and supplier payments",
        "Liaise with board members, trustees, and external partners",
        "Ensure compliance with charity laws, regulations, and data protection policies",
      ],
    },
    {
      company: "Quantum SAID",
      role: "Charity Manager",
      type: "Full Time",
      time: "September 2010 - August 2018",
      location: "Lagos, Nigeria",
      bullets: [
        "Maintain accurate records, databases, and documentation for the charity",
        "Assist in planning and coordinating fundraising campaigns and charity events",
        "Work with finance teams to manage payroll and supplier payments",
        "Liaise with board members, trustees, and external partners",
        "Ensure compliance with charity laws, regulations, and data protection policies",
      ],
    },
  ],
  softSkills: [
    "Fundraising & Grant Writing",
    "Communication & Public Speaking",
    "Problem-Solving",
    "Compliance & Legal Knowledge",
  ],
  techSkills: ["CRM Software", "Microsoft Office", "Email Marketing Tools", "Accounting Software"],
  explanation: {
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
  },
};

/* ----------------------------------- UI ----------------------------------- */

export default function CandidateDetailPage({
  params,
}: {
  params: { candidateId: string };
}) {
  return (
    <PageShell>
      {/* header row */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/job-seekers"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-800 hover:bg-gray-50"
            aria-label="Back"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Candidate Profile</h1>
        </div>
      </div>

      {/* My Profile */}
      <Card
        title="My Profile"
        action={<SmallAction href={`/admin/job-seekers/${params.candidateId}/edit`} />}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar seed={candidate.firstName} />
            <div>
              <div className="text-sm font-medium text-gray-900">
                {candidate.firstName} {candidate.lastName}
              </div>
              <div className="text-xs text-gray-600">{candidate.role}</div>
              <div className="mt-1 inline-flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3.5 w-3.5" />
                {candidate.city}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card
        title="Personal Information"
        action={<SmallAction href={`/admin/job-seekers/${params.candidateId}/edit#personal`} />}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KV label="First Name" value={candidate.firstName} />
          <KV label="Last Name" value={candidate.lastName} />
          <KV label="Gender" value={candidate.gender} />
          <KV
            label="Email Address"
            value={
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <a href={`mailto:${candidate.email}`} className="text-sky-600 hover:underline">
                  {candidate.email}
                </a>
              </span>
            }
          />
          <KV
            label="Phone"
            value={
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                {candidate.phone}
              </span>
            }
          />
          <KV label="Language" value={candidate.language} />
          <KV label="Position" value={candidate.position} />
          <KV
            label="Date of Birth"
            value={
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-gray-500" />
                {candidate.dob}
              </span>
            }
          />
        </div>
      </Card>

      {/* Address */}
      <Card
        title="Address"
        action={<SmallAction href={`/admin/job-seekers/${params.candidateId}/edit#address`} />}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KV label="Country" value={candidate.country} />
          <KV label="City / State" value={candidate.state} />
          <KV label="Postal Code" value={candidate.postal} />
          <KV label="Tax ID" value={candidate.taxId} />
        </div>
      </Card>

      {/* Short Bio */}
      <Card
        title="Short Bio"
        action={<SmallAction href={`/admin/job-seekers/${params.candidateId}/edit#bio`} />}
      >
        <p className="text-sm leading-6 text-gray-700">{candidate.bio}</p>
      </Card>

      {/* Attachment */}
      <Card
        title="Attachment"
        action={<SmallAction href={`/admin/job-seekers/${params.candidateId}/edit#attachments`} label="Add" />}
      >
        <div className="flex flex-wrap gap-2">
          {candidate.attachments.map((f) => (
            <ChipFile key={f} name={f} />
          ))}
        </div>
      </Card>

      {/* Education */}
      <Card
        title="Education"
        action={<SmallAction href={`/admin/job-seekers/${params.candidateId}/edit#education`} />}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {candidate.education.map((e) => (
            <div
              key={e.school}
              className="flex items-start gap-3 rounded-xl border border-gray-200 p-4"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                <School className="h-5 w-5 text-gray-700" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-900">{e.school}</div>
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
      <Card
        title="Certification"
        action={<SmallAction href={`/admin/job-seekers/${params.candidateId}/edit#certs`} label="Add" />}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {candidate.certs.map((c) => (
            <div
              key={c.name}
              className="flex items-start justify-between rounded-xl border border-gray-200 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <BadgeCheck className="h-5 w-5 text-gray-700" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-gray-900">{c.name}</div>
                  <div className="text-xs text-gray-600">{c.issuer}</div>
                  <div className="mt-1 text-[11px] text-gray-500">{c.issued}</div>
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

      {/* Experience */}
      <Card
        title="Experience"
        action={<SmallAction href={`/admin/job-seekers/${params.candidateId}/edit#experience`} />}
      >
        <div className="space-y-4">
          {candidate.experience.map((x, i) => (
            <div key={i} className="rounded-xl border border-gray-200 p-4">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-gray-800">
                  <BriefcaseBusiness className="h-4 w-4" />
                  Company
                </span>
                <span className="font-medium text-gray-900">{x.role}</span>
              </div>
              <div className="mt-1 text-sm text-gray-700">{x.company} • {x.type}</div>
              <div className="mt-1 text-xs text-gray-500">{x.time}</div>
              <div className="mt-1 inline-flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3.5 w-3.5" />
                {x.location}
              </div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {x.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* Skills */}
      <Card
        title="Skills"
        action={<SmallAction href={`/admin/job-seekers/${params.candidateId}/edit#skills`} label="Add" />}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Hard and Soft Skills
            </div>
            <ul className="space-y-2 text-sm text-gray-800">
              {candidate.softSkills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Technical Skills
            </div>
            <ul className="space-y-2 text-sm text-gray-800">
              {candidate.techSkills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Detailed Explanation */}
      <Card title="Detailed Explanation" action={<span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">75% Matchscore</span>}>
        <div className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="text-[11px] uppercase tracking-wide text-gray-500">Education</div>
              <p className="mt-2 text-sm text-gray-700">{candidate.explanation.education}</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="text-[11px] uppercase tracking-wide text-gray-500">Mission</div>
              <p className="mt-2 text-sm text-gray-700">{candidate.explanation.mission}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="text-[11px] uppercase tracking-wide text-gray-500">Experience</div>
              <p className="mt-2 text-sm text-gray-700">{candidate.explanation.experience}</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="text-[11px] uppercase tracking-wide text-gray-500">Skills</div>
              <p className="mt-2 text-sm text-gray-700">{candidate.explanation.skills}</p>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <div className="text-[11px] uppercase tracking-wide text-gray-500">Values</div>
            <p className="mt-2 text-sm text-gray-700">{candidate.explanation.values}</p>
          </div>
        </div>
      </Card>

      {/* bottom sticky-ish action */}
      <div className="my-6 flex justify-end">
        <Link
          href={`/admin/job-seekers/${params.candidateId}/edit`}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-black"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </Link>
      </div>
    </PageShell>
  );
}
