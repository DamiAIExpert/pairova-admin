"use client";

import React from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Upload,
  ArrowUp,
  ArrowDown,
  Save as SaveIcon,
  RotateCcw,
} from "lucide-react";

/* ----------------------------- tiny UI helpers ---------------------------- */

function SegmentedTabs({
  value,
  onChange,
}: {
  value: "faq" | "contact";
  onChange: (v: "faq" | "contact") => void;
}) {
  return (
    <div className="mb-6">
      <div className="inline-flex rounded-full bg-gray-100 p-1">
        {(["faq", "contact"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => onChange(k)}
            className={`rounded-full px-4 py-1.5 text-sm capitalize ${
              value === k ? "bg-white text-gray-900 shadow" : "text-gray-600"
            }`}
          >
            {k === "faq" ? "FAQ" : "Contact form"}
          </button>
        ))}
      </div>
    </div>
  );
}

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
      className={`min-h-[88px] w-full resize-y rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 ${props.className ?? ""}`}
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

function UploadPreview({
  label,
  value,
  onChange,
  onReset,
  size = 160,
  round = false,
}: {
  label: string;
  value: string;
  onChange: (dataUrl: string) => void;
  onReset: () => void;
  size?: number;
  round?: boolean;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
      <div
        className={`flex items-center justify-center overflow-hidden bg-white ring-1 ring-gray-200 ${
          round ? "rounded-full" : "rounded-lg"
        }`}
        style={{ width: size, height: size }}
      >
        {/* Next/Image requires width/height; we also set style for crop */}
        <Image
          src={value}
          alt={label}
          width={size}
          height={size}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
        >
          <Upload className="h-4 w-4" />
          Upload
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
        >
          <Trash2 className="h-4 w-4" />
          Remove
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

/* --------------------------------- types --------------------------------- */

type FaqItem = { id: string; question: string; answer: string };
type HelpCenterConfig = {
  // FAQ
  faqTitle: string;
  faqSubtitle: string;
  faqs: FaqItem[];

  // Contact
  contactTitle: string;
  contactSubtitle: string;
  bannerImage: string; // hero/visual for the contact page (left card in design)
  placeholders: { name: string; email: string; phone: string; message: string; search: string };
  subjects: string[];
  submitLabel: string;
};

const STORAGE_KEY = "fe:help-center";

const DEFAULTS: HelpCenterConfig = {
  faqTitle: "Frequently Asked Questions",
  faqSubtitle:
    "Find answers to common questions about Third features, services and setup. For further assistance our support system is always ready to help",
  faqs: [
    { id: "1", question: "How secure is my data with Third", answer: "" },
    {
      id: "2",
      question: "What cloud storage does Third use",
      answer:
        "Third currently supports major cloud storage providers including companies like Google Drive, Amazon, Blue and expand our list of supported devices based on needs and data",
    },
    { id: "3", question: "Is Third completely free", answer: "" },
  ],

  contactTitle: "Third Contact Form",
  contactSubtitle:
    "Contact us through the message button below. We’ll message promptly to your inquiries and feedback",
  bannerImage: "/logo.svg", // safe placeholder
  placeholders: {
    name: "Full Name",
    email: "Email Address",
    phone: "Phone",
    message: "Enter Text",
    search: "Search..",
  },
  subjects: ["Support", "Billing", "Partnership"],
  submitLabel: "Send",
};

/* ----------------------------- local persistence ---------------------------- */

function loadConfig(): HelpCenterConfig {
  if (typeof window === "undefined") return DEFAULTS;
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as HelpCenterConfig) : DEFAULTS;
}

/* ----------------------------------- UI ----------------------------------- */

export default function HelpCenterSettingsPage() {
  const [tab, setTab] = React.useState<"faq" | "contact">("faq");
  const [cfg, setCfg] = React.useState<HelpCenterConfig>(() => loadConfig());

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
    alert("Saved (mock). Replace with your API when ready.");
  };

  const reset = () => setCfg(loadConfig());

  /* ------------------------------ FAQ handlers ------------------------------ */
  const addFaq = () =>
    setCfg((s) => ({
      ...s,
      faqs: [
        ...s.faqs,
        { id: String(Date.now()), question: "New question", answer: "" },
      ],
    }));

  const updateFaq = (id: string, patch: Partial<FaqItem>) =>
    setCfg((s) => ({
      ...s,
      faqs: s.faqs.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    }));

  const removeFaq = (id: string) =>
    setCfg((s) => ({ ...s, faqs: s.faqs.filter((f) => f.id !== id) }));

  const moveFaq = (id: string, dir: "up" | "down") =>
    setCfg((s) => {
      const i = s.faqs.findIndex((x) => x.id === id);
      if (i < 0) return s;
      const j = dir === "up" ? i - 1 : i + 1;
      if (j < 0 || j >= s.faqs.length) return s;
      const next = [...s.faqs];
      const [row] = next.splice(i, 1);
      next.splice(j, 0, row);
      return { ...s, faqs: next };
    });

  /* ---------------------------- Contact handlers ---------------------------- */
  const addSubject = () =>
    setCfg((s) => ({ ...s, subjects: [...s.subjects, "New subject"] }));

  const removeSubject = (idx: number) =>
    setCfg((s) => ({
      ...s,
      subjects: s.subjects.filter((_, i) => i !== idx),
    }));

  const updateSubject = (idx: number, v: string) =>
    setCfg((s) => ({
      ...s,
      subjects: s.subjects.map((x, i) => (i === idx ? v : x)),
    }));

  return (
    <div className="mx-auto max-w-[1100px] px-6 pb-12">
      <h1 className="mb-4 text-xl font-semibold text-gray-900">Frontend → Help Center</h1>

      <SegmentedTabs value={tab} onChange={setTab} />

      {/* ------------------------------- FAQ TAB ------------------------------ */}
      {tab === "faq" && (
        <div className="space-y-6">
          <Card title="Header">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>Title</FieldLabel>
                <TextInput
                  value={cfg.faqTitle}
                  onChange={(e) => setCfg({ ...cfg, faqTitle: e.target.value })}
                />
              </div>
              <div>
                <FieldLabel>Subtitle</FieldLabel>
                <TextArea
                  value={cfg.faqSubtitle}
                  onChange={(e) =>
                    setCfg({ ...cfg, faqSubtitle: e.target.value })
                  }
                />
              </div>
            </div>
          </Card>

          <Card title="Questions & Answers">
            <div className="space-y-4">
              {cfg.faqs.map((f, idx) => (
                <div
                  key={f.id}
                  className="rounded-xl border border-gray-200 p-4 sm:p-5"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="text-sm font-medium text-gray-900">
                      Item {idx + 1}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveFaq(f.id, "up")}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
                        aria-label="Move up"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveFaq(f.id, "down")}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
                        aria-label="Move down"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFaq(f.id)}
                        className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <FieldLabel>Question</FieldLabel>
                      <TextInput
                        value={f.question}
                        onChange={(e) =>
                          updateFaq(f.id, { question: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel>Answer</FieldLabel>
                      <TextArea
                        value={f.answer}
                        onChange={(e) =>
                          updateFaq(f.id, { answer: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addFaq}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
              >
                <Plus className="h-4 w-4" />
                Add FAQ
              </button>
            </div>
          </Card>

          <div className="flex items-center justify-end gap-2">
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
      )}

      {/* ---------------------------- CONTACT TAB ---------------------------- */}
      {tab === "contact" && (
        <div className="space-y-6">
          <Card title="Header">
            <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
              <div>
                <FieldLabel>Title</FieldLabel>
                <TextInput
                  value={cfg.contactTitle}
                  onChange={(e) =>
                    setCfg({ ...cfg, contactTitle: e.target.value })
                  }
                />
              </div>
              <div>
                <FieldLabel>Subtitle</FieldLabel>
                <TextArea
                  value={cfg.contactSubtitle}
                  onChange={(e) =>
                    setCfg({ ...cfg, contactSubtitle: e.target.value })
                  }
                />
              </div>
            </div>
          </Card>

          <Card title="Banner / Visual">
            <UploadPreview
              label="Banner"
              value={cfg.bannerImage}
              onChange={(data) => setCfg({ ...cfg, bannerImage: data })}
              onReset={() => setCfg({ ...cfg, bannerImage: "/logo.svg" })}
              size={220}
              round={false}
            />
            <div className="mt-2 text-xs text-gray-500">
              Recommended: rectangular image. This appears as the large visual on
              the left side of the Contact Form design.
            </div>
          </Card>

          <Card title="Form Fields">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>Full Name placeholder</FieldLabel>
                <TextInput
                  value={cfg.placeholders.name}
                  onChange={(e) =>
                    setCfg({
                      ...cfg,
                      placeholders: { ...cfg.placeholders, name: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <FieldLabel>Email placeholder</FieldLabel>
                <TextInput
                  type="email"
                  value={cfg.placeholders.email}
                  onChange={(e) =>
                    setCfg({
                      ...cfg,
                      placeholders: { ...cfg.placeholders, email: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <FieldLabel>Phone placeholder</FieldLabel>
                <TextInput
                  value={cfg.placeholders.phone}
                  onChange={(e) =>
                    setCfg({
                      ...cfg,
                      placeholders: { ...cfg.placeholders, phone: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <FieldLabel>Message placeholder</FieldLabel>
                <TextInput
                  value={cfg.placeholders.message}
                  onChange={(e) =>
                    setCfg({
                      ...cfg,
                      placeholders: {
                        ...cfg.placeholders,
                        message: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <FieldLabel>Search placeholder (top-right)</FieldLabel>
                <TextInput
                  value={cfg.placeholders.search}
                  onChange={(e) =>
                    setCfg({
                      ...cfg,
                      placeholders: {
                        ...cfg.placeholders,
                        search: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <FieldLabel>Submit button label</FieldLabel>
                <TextInput
                  value={cfg.submitLabel}
                  onChange={(e) => setCfg({ ...cfg, submitLabel: e.target.value })}
                />
              </div>
            </div>
          </Card>

          <Card title="Subjects (dropdown choices)">
            <div className="space-y-3">
              {cfg.subjects.map((s, i) => (
                <div key={`${s}-${i}`} className="flex items-center gap-2">
                  <TextInput
                    value={s}
                    onChange={(e) => updateSubject(i, e.target.value)}
                    placeholder="Subject label"
                  />
                  <button
                    type="button"
                    onClick={() => removeSubject(i)}
                    className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-3 text-sm text-gray-800 hover:bg-gray-50"
                    aria-label="Remove subject"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSubject}
                className="mt-1 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
              >
                <Plus className="h-4 w-4" />
                Add subject
              </button>
            </div>
          </Card>

          <div className="flex items-center justify-end gap-2">
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
      )}
    </div>
  );
}
