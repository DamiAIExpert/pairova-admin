"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Download, FileText, Trash2 } from "lucide-react";

/* ------------------------------- tiny pieces ------------------------------ */

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1100px] px-6 pb-16">{children}</div>;
}

function Card({
  title,
  children,
  actionHref,
}: {
  title: string;
  children: React.ReactNode;
  /** When provided, renders a small "Edit" pill on the right */
  actionHref?: string;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white">
      <header className="flex items-center justify-between border-b px-4 py-3 sm:px-6">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        {actionHref ? (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-800 hover:bg-gray-50"
          >
            Edit <Pencil className="h-3.5 w-3.5" />
          </Link>
        ) : null}
      </header>
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}

function LabeledValue({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="truncate text-sm font-medium text-gray-900">{value}</div>
    </div>
  );
}

/* ---------------------------- view ngo page ---------------------------- */

export default function ViewNgoPage({
  params,
}: {
  params: { id: string };
}) {
  // Mock data – replace with your real fetch later
  const ngo = {
    id: params.id,
    name: "Dellman Foundation",
    type: "Non Profit",
    location: "Port Harcourt, Nigeria",
    logo: "/logo.svg",
    companyName: "Dellman",
    size: "10,000+",
    companyType: "Private Company",
    email: "jonathanbushman51@gmail.com",
    phone: "+08-356-333-33",
    ceo: "Alfred Nwachukwu",
    founded: "19 - 04 - 2022",
    country: "Nigeria",
    cityState: "Lekki, Lagos",
    postalCode: "0000111",
    taxId: "AQE-123-9002",
    bio:
      "Jonathon Smith is a dynamic and results-driven Team Manager with over a decade of experience in leading high-performing teams across diverse industries. Known for his ability to foster collaboration, drive productivity, and inspire team members to achieve their full potential, Jonathon excels in creating a positive and inclusive work environment. With a strong background in project management, strategic planning, and employee development, Jonathon has a proven track record of delivering exceptional results while maintaining a focus on team morale and professional growth.",
    mission:
      "Jonathon Smith is a dynamic and results-driven Team Manager with over a decade of experience in leading high-performing teams across diverse industries. Known for his ability to foster collaboration, drive productivity, and inspire team members to achieve their full potential, Jonathon excels in creating a positive and inclusive work environment.",
    values:
      "Jonathon Smith is a dynamic and results-driven Team Manager with over a decade of experience in leading high-performing teams across diverse industries. With a strong background in project management, strategic planning, and employee development, Jonathon has a proven track record of delivering exceptional results while maintaining a focus on team morale and professional growth.",
    policyFile: { name: "Dellman.pdf", href: "#" },
  };

  const editBase = `/admin/ngos/${ngo.id}/edit`;

  return (
    <PageShell>
      <h1 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-xs">
          i
        </span>
        Account Settings
      </h1>

      {/* Profile header card */}
      <Card title="Dellman Foundation Profile" actionHref={editBase}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-gray-200">
              <Image
                src={ngo.logo}
                alt={ngo.name}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">
                {ngo.name}
              </div>
              <div className="text-xs text-gray-600">{ngo.type}</div>
              <div className="text-xs text-gray-600">{ngo.location}</div>
            </div>
          </div>

          <Link
            href={editBase}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
          >
            Edit <Pencil className="h-4 w-4" />
          </Link>
        </div>
      </Card>

      <div className="h-4" />

      {/* Personal information */}
      <Card title="Personal Information" actionHref={editBase}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <LabeledValue label="Company Name" value={ngo.companyName} />
          <LabeledValue label="Company Size" value={ngo.size} />
          <LabeledValue label="Type" value={ngo.companyType} />
          <LabeledValue
            label="Company Mail"
            value={
              <a href={`mailto:${ngo.email}`} className="text-blue-600 underline">
                {ngo.email}
              </a>
            }
          />
          <LabeledValue label="Phone" value={ngo.phone} />
          <LabeledValue label="CEO" value={ngo.ceo} />
          <LabeledValue label="Founded" value={ngo.founded} />
        </div>
      </Card>

      <div className="h-4" />

      {/* Address */}
      <Card title="Detailed Address" actionHref={editBase}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <LabeledValue label="Country" value={ngo.country} />
          <LabeledValue label="City / State" value={ngo.cityState} />
          <LabeledValue label="Postal Code" value={ngo.postalCode} />
          <LabeledValue label="Tax ID" value={ngo.taxId} />
        </div>
      </Card>

      <div className="h-4" />

      {/* Short Bio */}
      <Card title="Short Bio" actionHref={editBase}>
        <p className="text-sm leading-relaxed text-gray-800">{ngo.bio}</p>
      </Card>

      <div className="h-4" />

      {/* Mission */}
      <Card title="Mission Statement" actionHref={editBase}>
        <p className="text-sm leading-relaxed text-gray-800">{ngo.mission}</p>
      </Card>

      <div className="h-4" />

      {/* Values */}
      <Card title="Our Values" actionHref={editBase}>
        <p className="text-sm leading-relaxed text-gray-800">{ngo.values}</p>
      </Card>

      <div className="h-4" />

      {/* Policy file */}
      <Card title="Company Policy" actionHref={undefined}>
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white ring-1 ring-gray-200">
              <FileText className="h-4 w-4 text-gray-700" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-gray-900">
                {ngo.policyFile.name}
              </div>
              <div className="text-xs text-gray-600">PDF document</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={ngo.policyFile.href}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-800 hover:bg-gray-50"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
            <button
              type="button"
              onClick={() => alert("Delete (mock). Hook up to API")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-800 hover:bg-gray-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </button>
          </div>
        </div>
      </Card>

      {/* Submit / footer action */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => alert("Submit (mock)")}
          className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-black"
        >
          Submit
        </button>
      </div>
    </PageShell>
  );
}
