// src/app/admin/job-seekers/[candidateId]/edit/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Upload, X, Plus } from "lucide-react";

/* ------------------------------ Small UI kit ------------------------------ */

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1200px] px-6 py-6">{children}</div>;
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

type EmpType = "Full Time" | "Freelance" | "Remote" | "Hybrid";

export default function CandidateEditPage({
  params,
}: {
  params: { candidateId: string };
}) {
  const router = useRouter();

  /* ------------------------------ seeded values ----------------------------- */

  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const onAvatar = (f?: File | null) => {
    if (!f) return setAvatarUrl(null);
    const url = URL.createObjectURL(f);
    setAvatarUrl(url);
  };

  // account
  const [position, setPosition] = React.useState("Charity Administrator");
  const [country, setCountry] = React.useState("Nigeria");

  // personal
  const [firstName, setFirstName] = React.useState("Ayra");
  const [lastName, setLastName] = React.useState("Gbolade");
  const [email, setEmail] = React.useState("ayragbolade@gmail.com");
  const [phone, setPhone] = React.useState("+11 887-2349-231");
  const [dob, setDob] = React.useState("1998-04-18");
  const [language, setLanguage] = React.useState("English");
  const [gender, setGender] = React.useState("Female");
  const [langLevel, setLangLevel] = React.useState("Native");

  // address
  const [city, setCity] = React.useState("Lagos");
  const [state, setState] = React.useState("Lagos");
  const [postal, setPostal] = React.useState("011-222");
  const [taxId, setTaxId] = React.useState("A9E-123-456");

  // bio
  const [bio, setBio] = React.useState(
    "Ayra Gbolade is a dynamic results-driven team manager with over a decade of experience in leading high-performing teams across diverse industries..."
  );

  // attachments (mock upload list)
  type FileChip = { id: string; name: string; progress: number };
  const [files, setFiles] = React.useState<FileChip[]>([
    { id: "1", name: "Professional Business Administrator.pdf", progress: 70 },
  ]);
  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next: FileChip[] = Array.from(list).map((f, i) => ({
      id: `${Date.now()}-${i}`,
      name: f.name,
      progress: 60,
    }));
    setFiles((p) => [...p, ...next]);
  };
  const removeFile = (id: string) => setFiles((p) => p.filter((x) => x.id !== id));

  // education
  const [school, setSchool] = React.useState("");
  const [degree, setDegree] = React.useState("");
  const [course, setCourse] = React.useState("");
  const [grade, setGrade] = React.useState("First Class Honours");
  const [eduDesc, setEduDesc] = React.useState("");

  // certificates
  const [certs, setCerts] = React.useState<FileChip[]>([
    { id: "c1", name: "Google.pdf", progress: 85 },
  ]);
  const addCerts = (list: FileList | null) => {
    if (!list) return;
    const next: FileChip[] = Array.from(list).map((f, i) => ({
      id: `c-${Date.now()}-${i}`,
      name: f.name,
      progress: 50,
    }));
    setCerts((p) => [...p, ...next]);
  };
  const removeCert = (id: string) => setCerts((p) => p.filter((x) => x.id !== id));

  // experience
  const [empTypes, setEmpTypes] = React.useState<EmpType[]>(["Full Time"]);
  const toggleEmp = (t: EmpType) =>
    setEmpTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  const [company, setCompany] = React.useState("Quantum SAID");
  const [jobRole, setJobRole] = React.useState("Charity Manager");
  const [sameAsAddress, setSameAsAddress] = React.useState(false);
  const [startDate, setStartDate] = React.useState("2010-09-01");
  const [endDate, setEndDate] = React.useState("2018-08-01");
  const [expProvince, setExpProvince] = React.useState("");
  const [expPostal, setExpPostal] = React.useState("");
  const [expDesc, setExpDesc] = React.useState("");

  // skills
  const [softInput, setSoftInput] = React.useState("");
  const [techInput, setTechInput] = React.useState("");
  const [softSkills, setSoftSkills] = React.useState<string[]>([
    "Fundraising",
    "Problem Solving",
  ]);
  const [techSkills, setTechSkills] = React.useState<string[]>([
    "CRM Software",
    "Microsoft Office",
  ]);

  const addSoft = () => {
    const v = softInput.trim();
    if (v && !softSkills.includes(v)) setSoftSkills((p) => [...p, v]);
    setSoftInput("");
  };
  const addTech = () => {
    const v = techInput.trim();
    if (v && !techSkills.includes(v)) setTechSkills((p) => [...p, v]);
    setTechInput("");
  };
  const removeSoft = (t: string) =>
    setSoftSkills((p) => p.filter((x) => x !== t));
  const removeTech = (t: string) =>
    setTechSkills((p) => p.filter((x) => x !== t));

  /* -------------------------------- submit -------------------------------- */

  const onSubmit = () => {
    const payload = {
      avatarUrl,
      position,
      country,
      firstName,
      lastName,
      email,
      phone,
      dob,
      language,
      gender,
      langLevel,
      address: { city, state, country, postal, taxId },
      bio,
      files,
      education: { school, degree, course, grade, eduDesc },
      certs,
      experience: {
        empTypes,
        company,
        jobRole,
        sameAsAddress,
        startDate,
        endDate,
        expProvince,
        expPostal,
        expDesc,
      },
      skills: { softSkills, techSkills },
    };

    console.log("SAVE CANDIDATE (mock):", payload);
    alert("Saved (mock). Wire this to your API.");
    router.push(`/admin/job-seekers/${params.candidateId}`);
  };

  /* --------------------------------- render -------------------------------- */

  return (
    <PageShell>
      <h1 className="mb-4 text-lg font-semibold text-gray-900">
        Account Settings
      </h1>

      {/* ACCOUNT */}
      <SectionCard title="Account">
        <div className="grid gap-6">
          {/* avatar row */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-100 ring-1 ring-inset ring-gray-200">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="avatar preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                  No Photo
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <Upload className="h-4 w-4" />
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onAvatar(e.target.files?.[0] ?? null)}
                />
              </label>
              <button
                type="button"
                onClick={() => onAvatar(null)}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
                Remove Photo
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Work Position</Label>
              <Input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div>
              <Label>Country</Label>
              <Input
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* PERSONAL */}
      <SectionCard title="Personal Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>First Name</Label>
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div>
            <Label>Email Address</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
          <div>
            <Label>Select Language</Label>
            <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Select Gender</Label>
            <div className="flex flex-wrap gap-4">
              {["Male", "Female"].map((g) => (
                <Radio
                  key={g}
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={setGender}
                  label={g}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Language Proficiency</Label>
            <div className="flex flex-wrap gap-4">
              {["Native", "Professional", "Intermediate"].map((lvl) => (
                <Radio
                  key={lvl}
                  name="langlevel"
                  value={lvl}
                  checked={langLevel === lvl}
                  onChange={setLangLevel}
                  label={lvl}
                />
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ADDRESS */}
      <SectionCard title="Address">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>City</Label>
            <Input value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div>
            <Label>State</Label>
            <Input value={state} onChange={(e) => setState(e.target.value)} />
          </div>
          <div>
            <Label>Postal Code</Label>
            <Input value={postal} onChange={(e) => setPostal(e.target.value)} />
          </div>
          <div>
            <Label>Tax ID</Label>
            <Input value={taxId} onChange={(e) => setTaxId(e.target.value)} />
          </div>
        </div>
      </SectionCard>

      {/* BIO */}
      <SectionCard title="Bio">
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write a short bio…"
        />
      </SectionCard>

      {/* ATTACH FILES */}
      <SectionCard title="Attach Files">
        <div className="space-y-4">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-600 hover:bg-gray-50">
            <Upload className="h-4 w-4" />
            Drag and Drop or <span className="text-gray-900 underline">Choose file</span> for upload
            <input
              type="file"
              className="hidden"
              multiple
              onChange={(e) => addFiles(e.target.files)}
            />
          </label>

          <div className="space-y-3">
            {files.map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-3 text-sm"
              >
                <div className="truncate">{f.name}</div>
                <div className="flex items-center gap-3">
                  <div className="w-40 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-gray-900"
                      style={{ width: `${f.progress}%` }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(f.id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50"
                    aria-label="remove"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* EDUCATION */}
      <SectionCard title="Education">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>School</Label>
            <Input
              placeholder="Select School"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          </div>
          <div>
            <Label>Degree</Label>
            <Input
              placeholder="Select Degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          </div>
          <div>
            <Label>Course</Label>
            <Input
              placeholder="Select Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>
          <div>
            <Label>Grade</Label>
            <Input value={grade} onChange={(e) => setGrade(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Notes..."
              value={eduDesc}
              onChange={(e) => setEduDesc(e.target.value)}
            />
          </div>
        </div>
      </SectionCard>

      {/* CERTIFICATES */}
      <SectionCard title="Add Certificates">
        <div className="space-y-4">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-600 hover:bg-gray-50">
            <Upload className="h-4 w-4" />
            Drag and Drop or <span className="text-gray-900 underline">Choose file</span> for upload
            <input
              type="file"
              className="hidden"
              multiple
              onChange={(e) => addCerts(e.target.files)}
            />
          </label>

          <div className="space-y-3">
            {certs.map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-3 text-sm"
              >
                <div className="truncate">{f.name}</div>
                <div className="flex items-center gap-3">
                  <div className="w-40 rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-gray-900"
                      style={{ width: `${f.progress}%` }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCert(f.id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50"
                    aria-label="remove"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* EXPERIENCE */}
      <SectionCard title="Experience">
        <div className="grid gap-6">
          <div>
            <Label>Employment Type</Label>
            <div className="flex flex-wrap gap-2">
              {(["Full Time", "Freelance", "Remote", "Hybrid"] as EmpType[]).map(
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Company Name</Label>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div>
              <Label>Job Role</Label>
              <Input value={jobRole} onChange={(e) => setJobRole(e.target.value)} />
            </div>
          </div>

          <div className="mt-1 flex items-center gap-2 text-xs text-gray-700">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              checked={sameAsAddress}
              onChange={(e) => setSameAsAddress(e.target.checked)}
            />
            <span>Same as company address</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Start Date</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
              <Label>End Date</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div>
              <Label>Province / State</Label>
              <Input
                placeholder="Select Province / State"
                value={expProvince}
                onChange={(e) => setExpProvince(e.target.value)}
              />
            </div>
            <div>
              <Label>Postal Code</Label>
              <Input
                placeholder="ex 011 - 222"
                value={expPostal}
                onChange={(e) => setExpPostal(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Type here..."
              value={expDesc}
              onChange={(e) => setExpDesc(e.target.value)}
            />
          </div>
        </div>
      </SectionCard>

      {/* SKILLS */}
      <SectionCard title="Skills">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Soft */}
          <div>
            <Label>Hard / Soft Skill</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter skill"
                value={softInput}
                onChange={(e) => setSoftInput(e.target.value)}
              />
              <button
                type="button"
                onClick={addSoft}
                className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-black"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {softSkills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 text-xs"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => removeSoft(s)}
                    className="rounded-full p-1 hover:bg-gray-100"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Tech */}
          <div>
            <Label>Technical Skill</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter skill"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
              />
              <button
                type="button"
                onClick={addTech}
                className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-black"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {techSkills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 text-xs"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => removeTech(s)}
                    className="rounded-full p-1 hover:bg-gray-100"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
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
