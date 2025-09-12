"use client";

import React from "react";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save as SaveIcon,
  RotateCcw,
  Monitor,
} from "lucide-react";

/* ------------------------------ tiny UI bits ------------------------------ */

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-1 text-sm font-medium text-gray-900">{children}</div>;
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 ${props.className ?? ""}`}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-[120px] w-full resize-y rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 ${props.className ?? ""}`}
    />
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white">
      <header className="flex items-center justify-between border-b px-4 py-3 sm:px-6">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      </header>
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}

/* ---------------------------------- types --------------------------------- */

type PolicySection = {
  id: string;
  heading: string;
  body: string;
};

type PrivacyPolicyConfig = {
  title: string;
  updatedOn: string; // ISO date string
  intro: string;
  sections: PolicySection[];
  contactEmail: string;
  contactAddress: string;
  published: boolean;
};

const STORAGE_KEY = "fe:policy:privacy";

const DEFAULTS: PrivacyPolicyConfig = {
  title: "Privacy Policy",
  updatedOn: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
  intro:
    "Your privacy is important to us. This Privacy Policy explains what data we collect, how we use it, and the choices you have.",
  sections: [
    {
      id: "s1",
      heading: "Information We Collect",
      body:
        "We collect information you provide directly (such as name and contact details) and information collected automatically (such as device and usage data).",
    },
    {
      id: "s2",
      heading: "How We Use Information",
      body:
        "We use your information to provide and improve our services, communicate with you, personalize experiences, ensure safety, and comply with legal obligations.",
    },
    {
      id: "s3",
      heading: "Data Sharing & Transfers",
      body:
        "We do not sell your personal information. We may share data with trusted service providers under strict data protection agreements and only as necessary.",
    },
  ],
  contactEmail: "privacy@company.com",
  contactAddress: "123 Example Street, City, Country",
  published: true,
};

/* ----------------------------- local persistence --------------------------- */

function loadConfig(): PrivacyPolicyConfig {
  if (typeof window === "undefined") return DEFAULTS;
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as PrivacyPolicyConfig) : DEFAULTS;
}

/* ---------------------------------- page ---------------------------------- */

export default function PrivacyPolicyEditor() {
  const [cfg, setCfg] = React.useState<PrivacyPolicyConfig>(() => loadConfig());

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
    alert("Saved (mock). Replace with your API call when ready.");
  };

  const reset = () => setCfg(loadConfig());

  /* ---------------------------- section actions --------------------------- */
  const addSection = () =>
    setCfg((s) => ({
      ...s,
      sections: [
        ...s.sections,
        { id: String(Date.now()), heading: "New section", body: "" },
      ],
    }));

  const removeSection = (id: string) =>
    setCfg((s) => ({ ...s, sections: s.sections.filter((x) => x.id !== id) }));

  const updateSection = (id: string, patch: Partial<PolicySection>) =>
    setCfg((s) => ({
      ...s,
      sections: s.sections.map((sec) =>
        sec.id === id ? { ...sec, ...patch } : sec
      ),
    }));

  const moveSection = (id: string, dir: "up" | "down") =>
    setCfg((s) => {
      const i = s.sections.findIndex((x) => x.id === id);
      if (i < 0) return s;
      const j = dir === "up" ? i - 1 : i + 1;
      if (j < 0 || j >= s.sections.length) return s;
      const copy = [...s.sections];
      const [row] = copy.splice(i, 1);
      copy.splice(j, 0, row);
      return { ...s, sections: copy };
    });

  const formattedDate = (() => {
    try {
      const d = new Date(cfg.updatedOn);
      if (isNaN(d.getTime())) return cfg.updatedOn;
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
    } catch {
      return cfg.updatedOn;
    }
  })();

  return (
    <div className="mx-auto max-w-[1100px] px-6 pb-12">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-gray-900">
          Frontend → Privacy Policy
        </h1>

        <a
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
          title="Preview public page"
        >
          <Monitor className="h-4 w-4" />
          Preview
        </a>
      </div>

      {/* Header / Basics */}
      <Card title="Basics">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel>Title</FieldLabel>
            <TextInput
              value={cfg.title}
              onChange={(e) => setCfg({ ...cfg, title: e.target.value })}
            />
          </div>

          <div>
            <FieldLabel>Last updated (date)</FieldLabel>
            <TextInput
              type="date"
              value={cfg.updatedOn}
              onChange={(e) => setCfg({ ...cfg, updatedOn: e.target.value })}
            />
            <div className="mt-1 text-xs text-gray-500">
              Displayed as: <span className="font-medium">{formattedDate}</span>
            </div>
          </div>

          <div className="col-span-full">
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={cfg.published}
                onChange={(e) => setCfg({ ...cfg, published: e.target.checked })}
              />
              <span className="text-gray-700">Published</span>
            </label>
          </div>
        </div>
      </Card>

      {/* Intro */}
      <div className="mt-6">
        <Card title="Intro">
          <FieldLabel>Introductory text</FieldLabel>
          <TextArea
            value={cfg.intro}
            onChange={(e) => setCfg({ ...cfg, intro: e.target.value })}
            placeholder="Short paragraph shown before the sections…"
          />
        </Card>
      </div>

      {/* Sections */}
      <div className="mt-6">
        <Card title="Policy Sections">
          <div className="space-y-4">
            {cfg.sections.map((sec, idx) => (
              <div key={sec.id} className="rounded-xl border border-gray-200 p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="text-sm font-medium text-gray-900">
                    Section {idx + 1}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveSection(sec.id, "up")}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
                      aria-label="Move up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSection(sec.id, "down")}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
                      aria-label="Move down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSection(sec.id)}
                      className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid gap-3">
                  <div>
                    <FieldLabel>Heading</FieldLabel>
                    <TextInput
                      value={sec.heading}
                      onChange={(e) =>
                        updateSection(sec.id, { heading: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <FieldLabel>Body</FieldLabel>
                    <TextArea
                      value={sec.body}
                      onChange={(e) =>
                        updateSection(sec.id, { body: e.target.value })
                      }
                      placeholder="Write the section content here…"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addSection}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
            >
              <Plus className="h-4 w-4" />
              Add section
            </button>
          </div>
        </Card>
      </div>

      {/* Contact */}
      <div className="mt-6">
        <Card title="Contact">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Contact Email</FieldLabel>
              <TextInput
                type="email"
                value={cfg.contactEmail}
                onChange={(e) =>
                  setCfg({ ...cfg, contactEmail: e.target.value })
                }
                placeholder="privacy@company.com"
              />
            </div>
            <div>
              <FieldLabel>Contact Address</FieldLabel>
              <TextInput
                value={cfg.contactAddress}
                onChange={(e) =>
                  setCfg({ ...cfg, contactAddress: e.target.value })
                }
                placeholder="123 Example Street, City, Country"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
        <button
          type="button"
          onClick={save}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
        >
          <SaveIcon className="h-4 w-4" />
          Save changes
        </button>
      </div>
    </div>
  );
}
