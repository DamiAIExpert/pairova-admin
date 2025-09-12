"use client";

import React from "react";
import Image from "next/image";
import {
  Upload,
  Trash2,
  CheckCircle2,
  ChevronDown,
  X,
  Paperclip,
} from "lucide-react";

/* ----------------------------- tiny primitives ---------------------------- */

function SectionCard({
  title,
  subtitle,
  children,
  showCheck = false,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showCheck?: boolean;
}) {
  return (
    <section className="relative rounded-2xl border border-gray-200 bg-white">
      <header className="flex items-center justify-between border-b px-4 py-3 sm:px-6">
        <div>
          <div className="text-sm font-semibold text-gray-900">{title}</div>
          {subtitle ? (
            <div className="text-xs text-gray-600">{subtitle}</div>
          ) : null}
        </div>
        {showCheck ? (
          <CheckCircle2 className="h-4 w-4 text-gray-900/90" />
        ) : null}
      </header>
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block text-sm font-medium text-gray-900">
      {children}
    </label>
  );
}

function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
) {
  const { label, className, ...rest } = props;
  return (
    <div>
      {label ? <FieldLabel>{label}</FieldLabel> : null}
      <input
        {...rest}
        className={`h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 ${className ?? ""}`}
      />
    </div>
  );
}

function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    hint?: string;
  }
) {
  const { label, hint, className, ...rest } = props;
  return (
    <div>
      {label ? <FieldLabel>{label}</FieldLabel> : null}
      <textarea
        {...rest}
        className={`min-h-[120px] w-full resize-y rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 ${className ?? ""}`}
      />
      {hint ? <div className="mt-1 text-right text-xs text-gray-500">{hint}</div> : null}
    </div>
  );
}

type Option = { label: string; value: string };

function Select({
  label,
  value,
  onChange,
  options,
  placeholder = "Select",
}: {
  label?: string;
  value?: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const chosen = options.find((o) => o.value === value);

  return (
    <div className="text-sm" ref={ref}>
      {label ? <FieldLabel>{label}</FieldLabel> : null}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 px-3 text-left text-gray-900"
      >
        <span className={chosen ? "" : "text-gray-400"}>
          {chosen ? chosen.label : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {open ? (
        <div className="z-20 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-gray-200 bg-white shadow-lg">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={`block w-full px-3 py-2 text-left hover:bg-gray-50 ${
                value === o.value ? "bg-gray-50" : ""
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function RadioPills({
  label,
  value,
  onChange,
  options,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      {label ? <FieldLabel>{label}</FieldLabel> : null}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`rounded-full px-3 py-1.5 text-sm ${
                active
                  ? "bg-gray-900 text-white"
                  : "border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------- uploaders ------------------------------- */

function AvatarUpload({
  value,
  onChange,
  onReset,
}: {
  value: string;
  onChange: (dataUrl: string) => void;
  onReset: () => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-gray-200">
        <Image
          src={value}
          alt="Organization logo"
          width={96}
          height={96}
          className="object-cover"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
        >
          <Upload className="h-4 w-4" /> Upload Photo
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
        >
          <Trash2 className="h-4 w-4" /> Remove Photo
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            const r = new FileReader();
            r.onload = () => onChange(String(r.result));
            r.readAsDataURL(f);
          }}
        />
      </div>
    </div>
  );
}

type FileItem = { id: string; name: string; size: number; progress: number };

function FileDrop({
  files,
  onFiles,
  onRemove,
}: {
  files: FileItem[];
  onFiles: (fs: File[]) => void;
  onRemove: (id: string) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    onFiles(dropped);
  };
  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="rounded-xl border border-dashed border-gray-300 bg-white p-4"
    >
      <div className="flex flex-col items-center justify-center gap-2 py-6 text-sm text-gray-700">
        <Upload className="h-5 w-5" />
        <div>
          Drag and Drop or{" "}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-gray-900 underline underline-offset-2"
          >
            Choose File
          </button>{" "}
          for upload
        </div>
      </div>

      {files.length ? (
        <ul className="mt-4 space-y-2">
          {files.map((f) => (
            <li
              key={f.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200">
                  <Paperclip className="h-4 w-4 text-gray-700" />
                </span>
                <div className="min-w-0">
                  <div className="truncate text-gray-900">{f.name}</div>
                  <div className="text-xs text-gray-500">
                    {(f.size / 1024).toFixed(0)}kb ·{" "}
                    {f.progress < 100 ? `${Math.max(0, 100 - f.progress)}s left` : "Uploaded"}
                  </div>
                </div>
              </div>

              <div className="ml-4 flex-1">
                <div className="h-1.5 w-full rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-gray-900 transition-all"
                    style={{ width: `${f.progress}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRemove(f.id)}
                className="ml-3 inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-gray-50"
                aria-label="Remove file"
              >
                <X className="h-4 w-4 text-gray-700" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => onFiles(Array.from(e.target.files || []))}
      />
    </div>
  );
}

/* ------------------------------- tag inputs ------------------------------ */

function TagsInput({
  label,
  value,
  onChange,
  placeholder = "Enter skill",
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = React.useState("");
  const add = (s: string) => {
    const clean = s.trim();
    if (!clean) return;
    if (value.includes(clean)) return;
    onChange([...value, clean]);
    setDraft("");
  };
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add(draft);
            }
          }}
          placeholder={placeholder}
          className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <button
          type="button"
          onClick={() => add(draft)}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-3 text-sm text-gray-800 hover:bg-gray-50"
        >
          Add
        </button>
      </div>

      {value.length ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {value.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-800"
            >
              {t}
              <button
                type="button"
                onClick={() => onChange(value.filter((x) => x !== t))}
                className="rounded-full p-0.5 hover:bg-gray-50"
                aria-label={`remove ${t}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ---------------------------------- page --------------------------------- */

export default function NgoEditPage() {
  // avatar
  const [logo, setLogo] = React.useState("/logo.svg");

  // basic
  const [company, setCompany] = React.useState("Non Profit Organization");
  const [country, setCountry] = React.useState("nigeria");

  // contact
  const [email, setEmail] = React.useState("ayragbolade@gmail.com");
  const [phone, setPhone] = React.useState("+1 817-2345-221");
  const [founded, setFounded] = React.useState("2020-04-19");
  const [language, setLanguage] = React.useState("english");
  const [companyType, setCompanyType] = React.useState("nonprofit");
  const [proficiency, setProficiency] = React.useState("Native");

  // address
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [postal, setPostal] = React.useState("");
  const [taxId, setTaxId] = React.useState("");

  // long text
  const [bio, setBio] = React.useState("");
  const [mission, setMission] = React.useState("");
  const [values, setValues] = React.useState("");

  // files
  const [files, setFiles] = React.useState<FileItem[]>([]);
  const simulateUpload = React.useCallback((items: FileItem[]) => {
    items.forEach((it) => {
      const tid = setInterval(() => {
        setFiles((curr) =>
          curr.map((f) =>
            f.id === it.id ? { ...f, progress: Math.min(100, f.progress + 5) } : f
          )
        );
      }, 120);
      setTimeout(() => clearInterval(tid), 2500);
    });
  }, []);
  const onFiles = (fs: File[]) => {
    const items: FileItem[] = fs.map((f) => ({
      id: `${f.name}-${crypto.randomUUID()}`,
      name: f.name,
      size: f.size,
      progress: 10,
    }));
    setFiles((s) => [...s, ...items]);
    simulateUpload(items);
  };
  const removeFile = (id: string) => setFiles((s) => s.filter((x) => x.id !== id));

  // skills
  const [softSkills, setSoftSkills] = React.useState<string[]>([
    "Fundraising",
    "Problem Solving",
  ]);
  const [techSkills, setTechSkills] = React.useState<string[]>([
    "CRM Software",
    "Microsoft Office",
  ]);

  const saveAll = () => {
    // Wire to your API later
    console.log("SAVE NGO EDIT MOCK", {
      logo,
      company,
      country,
      email,
      phone,
      founded,
      language,
      companyType,
      proficiency,
      state,
      city,
      postal,
      taxId,
      bio,
      mission,
      values,
      files,
      softSkills,
      techSkills,
    });
    alert("Submitted (mock). Wire this up to your API later.");
  };

  return (
    <div className="space-y-6">
      {/* Account / avatar / country */}
      <SectionCard title="Account Settings" subtitle="" showCheck>
        <div className="grid gap-6">
          <div className="grid gap-6 rounded-2xl border border-gray-100 p-4 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-900">Account</div>
              <div className="text-xs text-gray-600">
                Please configure and fill in your information
              </div>
              <AvatarUpload
                value={logo}
                onChange={setLogo}
                onReset={() => setLogo("/logo.svg")}
              />
            </div>

            <div className="grid gap-4 self-end">
              <TextInput
                label="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Organization name"
              />
              <Select
                label="Country"
                value={country}
                onChange={setCountry}
                options={[
                  { label: "Nigeria", value: "nigeria" },
                  { label: "South Africa", value: "south-africa" },
                  { label: "Kenya", value: "kenya" },
                  { label: "Ghana", value: "ghana" },
                ]}
              />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Company information */}
      <SectionCard title="Company Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Company mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="company@email.com"
          />
          <TextInput
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 555 0100"
          />
          <div>
            <FieldLabel>Date Founded</FieldLabel>
            <input
              type="date"
              value={founded}
              onChange={(e) => setFounded(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          <Select
            label="Select Language"
            value={language}
            onChange={setLanguage}
            options={[
              { label: "English", value: "english" },
              { label: "French", value: "french" },
              { label: "Arabic", value: "arabic" },
            ]}
          />
          <Select
            label="Select Company Type"
            value={companyType}
            onChange={setCompanyType}
            options={[
              { label: "Non Profit", value: "nonprofit" },
              { label: "Private Company", value: "private" },
              { label: "Public Company", value: "public" },
            ]}
          />
          <RadioPills
            label="Language Proficiency"
            value={proficiency}
            onChange={setProficiency}
            options={["Native", "Professional", "Intermediate"]}
          />
        </div>
      </SectionCard>

      {/* Address */}
      <SectionCard title="Address" showCheck>
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="State"
            value={state}
            onChange={setState}
            options={[
              { label: "Select State", value: "" },
              { label: "Lagos", value: "lagos" },
              { label: "Abuja", value: "abuja" },
              { label: "Rivers", value: "rivers" },
            ]}
          />
          <Select
            label="City"
            value={city}
            onChange={setCity}
            options={[
              { label: "Select City", value: "" },
              { label: "Lekki", value: "lekki" },
              { label: "Ikeja", value: "ikeja" },
              { label: "Port Harcourt", value: "ph" },
            ]}
          />
          <TextInput
            label="Postal Code"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
            placeholder="Enter code"
          />
          <TextInput
            label="Tax ID"
            value={taxId}
            onChange={(e) => setTaxId(e.target.value)}
            placeholder="Input ID Number"
          />
        </div>
      </SectionCard>

      {/* Bio */}
      <SectionCard title="Bio" showCheck>
        <TextArea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write a short bio…"
          hint="Max 150 words"
        />
      </SectionCard>

      {/* Attach Files */}
      <SectionCard title="Attach Files" showCheck>
        <FileDrop files={files} onFiles={onFiles} onRemove={removeFile} />
      </SectionCard>

      {/* Mission */}
      <SectionCard title="Mission Statement" showCheck>
        <TextArea
          value={mission}
          onChange={(e) => setMission(e.target.value)}
          placeholder="Write your mission statement…"
          hint="Max 150 words"
        />
      </SectionCard>

      {/* Values */}
      <SectionCard title="Our Values" showCheck>
        <TextArea
          value={values}
          onChange={(e) => setValues(e.target.value)}
          placeholder="Describe your core values…"
          hint="Max 150 words"
        />
      </SectionCard>

      {/* Skills */}
      <SectionCard title="Skills">
        <div className="grid gap-6 sm:grid-cols-2">
          <TagsInput
            label="Hard / Soft Skill"
            value={softSkills}
            onChange={setSoftSkills}
            placeholder="Enter skill"
          />
          <TagsInput
            label="Technical Skill"
            value={techSkills}
            onChange={setTechSkills}
            placeholder="Enter skill"
          />
        </div>
      </SectionCard>

      {/* footer submit */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={saveAll}
          className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-black"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
