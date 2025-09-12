// src/app/admin/ngos/[id]/jobs/[jobId]/edit/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";

/* ------------------------------ Small UI kit ------------------------------ */

function PageShell({ children }: { children: React.ReactNode }) {
  // widened container to fill the center area
  return <div className="mx-auto w-full max-w-[1400px] px-6 py-6">{children}</div>;
}

function SectionCard({
  title,
  children,
  rightIcon = <Check className="h-4 w-4 text-emerald-600" />,
}: {
  title: string;
  children: React.ReactNode;
  rightIcon?: React.ReactNode;
}) {
  return (
    <section className="mb-6 rounded-2xl border border-gray-200 bg-white">
      <header className="flex items-center justify-between border-b px-4 py-3 sm:px-6">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
          {rightIcon}
        </span>
      </header>
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}

function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`mb-1 block text-sm text-gray-700 ${className ?? ""}`}>
      {children}
    </label>
  );
}

function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }
) {
  const { className, ...rest } = props;
  return (
    <input
      {...rest}
      className={`h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 ${className ?? ""}`}
    />
  );
}

function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement> & { className?: string }
) {
  const { className, children, ...rest } = props;
  return (
    <div className={`relative ${className ?? ""}`}>
      <select
        {...rest}
        className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-8 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
    </div>
  );
}

function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    className?: string;
  }
) {
  const { className, ...rest } = props;
  return (
    <textarea
      {...rest}
      className={`min-h-[120px] w-full rounded-lg border border-gray-200 p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 ${className ?? ""}`}
    />
  );
}

function TogglePill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${
        active
          ? "border-gray-900 bg-gray-900 font-semibold text-white"
          : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

function Radio({
  name,
  value,
  checked,
  onChange,
  label,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-800">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-200"
      />
      {label}
    </label>
  );
}

/* --------------------------------- Page --------------------------------- */

type EmpType = "Full Time" | "Freelance" | "Contract" | "Volunteer";
type Placement = "Onsite" | "Hybrid" | "Remote";

export default function JobEditPage({
  params,
}: {
  params: { id: string; jobId: string };
}) {
  const router = useRouter();

  const [jobTitle, setJobTitle] = React.useState("Charity Administrator");
  const [roleDesc, setRoleDesc] = React.useState(
    "A Charity Administrator plays a crucial role in the smooth operation of a nonprofit organization. This role involves handling administrative tasks, managing records, coordinating fundraising, ."
  );

  const [empTypes, setEmpTypes] = React.useState<EmpType[]>([
    "Full Time",
    "Volunteer",
  ]);
  const toggleEmp = (t: EmpType) =>
    setEmpTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const [placement, setPlacement] = React.useState<Placement>("Onsite");
  const [experience, setExperience] = React.useState("4 - 6 years");
  const [salaryRange, setSalaryRange] = React.useState("");
  const [size, setSize] = React.useState("1000 - 5000 employees");

  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [postal, setPostal] = React.useState("");
  const [addr1, setAddr1] = React.useState("");
  const [addr2, setAddr2] = React.useState("");

  const [coverLetter, setCoverLetter] = React.useState("Yes");
  const [language, setLanguage] = React.useState("English");

  const [qualifications, setQualifications] = React.useState(
    [
      "At least 1–3 years of experience in administration, office management, or charity work.",
      "A degree or diploma in Business Administration, Nonprofit Management, Social Work, or a related field",
      "Strong ability to manage records, schedules, and documents efficiently",
      "Excellent written and verbal communication skills for liaising with donors, volunteers, and stakeholders.",
      "Strong ability to manage records, schedules, and documents efficiently",
    ].join("\n")
  );

  const [responsibilities, setResponsibilities] = React.useState(
    [
      "At least 1–3 years of experience in administration, office management, or charity work.",
      "A degree or diploma in Business Administration, Nonprofit Management, Social Work, or a related field",
      "Strong ability to manage records, schedules, and documents efficiently",
      "Excellent written and verbal communication skills for liaising with donors, volunteers, and stakeholders.",
      "Strong ability to manage records, schedules, and documents efficiently",
    ].join("\n")
  );

  const [skills, setSkills] = React.useState(
    [
      "Fundraising & Grant Writing",
      "Communication & Public Speaking",
      "Problem-Solving",
      "Compliance & Legal Knowledge",
      "Strong ability to manage records, schedules, and documents efficiently",
    ].join("\n")
  );

  const onSubmit = () => {
    const payload = {
      jobTitle,
      roleDesc,
      empTypes,
      placement,
      experience,
      salaryRange,
      size,
      city,
      country,
      province,
      postal,
      addr1,
      addr2,
      coverLetter,
      language,
      qualifications: qualifications
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      responsibilities: responsibilities
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      skills: skills
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    console.log("SUBMIT (mock):", payload);
    alert("Saved (mock). Wire this to your API.");
    router.push(`/admin/ngos/${params.id}/jobs/${params.jobId}`);
  };

  return (
    <PageShell>
      {/* BASIC INFORMATION */}
      <SectionCard title="Basic Information">
        <div className="grid gap-4">
          <div>
            <Label>Job Title</Label>
            <Input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          <div>
            <Label>Role Description</Label>
            <Textarea
              value={roleDesc}
              onChange={(e) => setRoleDesc(e.target.value)}
              placeholder="Describe this role…"
            />
          </div>
        </div>
      </SectionCard>

      {/* ADDITIONAL INFORMATION */}
      <SectionCard title="Additional Information">
        <div className="grid gap-6">
          {/* Employment Type */}
          <div>
            <Label>Employment Type</Label>
            <div className="flex flex-wrap gap-2">
              {(["Full Time", "Freelance", "Contract", "Volunteer"] as EmpType[]).map(
                (t) => (
                  <TogglePill
                    key={t}
                    active={empTypes.includes(t)}
                    onClick={() => toggleEmp(t)}
                  >
                    {t}
                  </TogglePill>
                )
              )}
            </div>
          </div>

          {/* Placement + Experience */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Job Placement</Label>
              <Select
                value={placement}
                onChange={(e) => setPlacement(e.target.value as Placement)}
              >
                <option>Onsite</option>
                <option>Hybrid</option>
                <option>Remote</option>
              </Select>
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-700">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                <span>Same as company address</span>
              </div>
            </div>
            <div>
              <Label>Experience</Label>
              <Select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                {[
                  "0 - 1 years",
                  "1 - 3 years",
                  "3 - 4 years",
                  "4 - 6 years",
                  "6+ years",
                ].map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </Select>
            </div>
          </div>

          {/* Salary + Size */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Salary Range</Label>
              <Select
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
              >
                <option value="">Select salary range</option>
                <option>$100 - $500</option>
                <option>$500 - $1,000</option>
                <option>$1,000 - $2,000</option>
                <option>$2,000+</option>
              </Select>
            </div>

            <div>
              <Label>Size</Label>
              <Select value={size} onChange={(e) => setSize(e.target.value)}>
                <option>1 - 50 employees</option>
                <option>50 - 250 employees</option>
                <option>250 - 1,000 employees</option>
                <option>1000 - 5000 employees</option>
                <option>5000+ employees</option>
              </Select>
            </div>
          </div>

          {/* Location */}
          <div>
            <Label>Location</Label>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="!mb-0">City</Label>
                <Input
                  placeholder="Select City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <Label className="!mb-0">Country</Label>
                <Input
                  placeholder="Select Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div>
                <Label className="!mb-0">Province / State</Label>
                <Input
                  placeholder="Select Province / State"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
              </div>
              <div>
                <Label className="!mb-0">Postal Code</Label>
                <Input
                  placeholder="ex 011 - 222"
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <Input
                placeholder="Address line 1"
                value={addr1}
                onChange={(e) => setAddr1(e.target.value)}
              />
              <Input
                placeholder="Address line 2 (Optional)"
                value={addr2}
                onChange={(e) => setAddr2(e.target.value)}
              />
            </div>

            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Add Cover Letter</Label>
                <div className="flex flex-wrap gap-4">
                  <Radio
                    name="cover"
                    value="Yes"
                    checked={coverLetter === "Yes"}
                    onChange={setCoverLetter}
                    label="Yes"
                  />
                  <Radio
                    name="cover"
                    value="No"
                    checked={coverLetter === "No"}
                    onChange={setCoverLetter}
                    label="No"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Language Required</Label>
                <div className="flex flex-wrap gap-4">
                  {["English", "Spanish", "Others"].map((l) => (
                    <Radio
                      key={l}
                      name="lang"
                      value={l}
                      checked={language === l}
                      onChange={setLanguage}
                      label={l}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* QUALIFICATIONS */}
      <SectionCard title="Qualifications">
        <Textarea
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
          placeholder={"One per line…"}
        />
        <p className="mt-2 text-xs text-gray-500">
          Tip: Enter one qualification per line. We’ll render them as bullets.
        </p>
      </SectionCard>

      {/* RESPONSIBILITIES */}
      <SectionCard title="Responsibilities">
        <Textarea
          value={responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
          placeholder={"One per line…"}
        />
      </SectionCard>

      {/* REQUIRED SKILLS */}
      <SectionCard title="Required Skills">
        <Textarea
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder={"One per line…"}
        />
      </SectionCard>

      {/* Footer actions */}
      <div className="mb-20 flex items-center justify-end">
        <button
          onClick={onSubmit}
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-black"
        >
          Submit
        </button>
      </div>
    </PageShell>
  );
}
