"use client";

import React from "react";
import Image from "next/image";
import { Plus, Trash2, Upload } from "lucide-react";

/* ---------- tiny helpers ---------- */

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
  size = 64,
  round = true,
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
        className={`overflow-hidden ${round ? "rounded-full" : "rounded-lg"} bg-white ring-1 ring-gray-200`}
        style={{ width: size, height: size }}
      >
        <Image src={value} alt={label} width={size} height={size} className="object-cover" />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
        >
          <Upload className="h-4 w-4" />
          Upload {label}
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

/* ---------- page component ---------- */

export default function LandingPageSettingsPage() {
  // placeholders live in /public
  const [logo, setLogo] = React.useState("/logo.svg");
  const [favicon, setFavicon] = React.useState("/favicon.png");

  const [navLinks, setNavLinks] = React.useState<string[]>(["Candidate", "Job"]);

  const addLink = () => setNavLinks((s) => [...s, ""]);
  const removeLink = (i: number) => setNavLinks((s) => s.filter((_, idx) => idx !== i));
  const updateLink = (i: number, v: string) =>
    setNavLinks((s) => s.map((x, idx) => (idx === i ? v : x)));

  // hero content
  const [heroTitle, setHeroTitle] = React.useState("");
  const [heroSub, setHeroSub] = React.useState("");
  const [heroCta, setHeroCta] = React.useState("Get started");

  // mid sections
  const [mid1, setMid1] = React.useState({ title: "", sub: "", cta1: "", cta2: "" });
  const [mid2, setMid2] = React.useState({ title: "", sub: "", cta1: "", cta2: "" });

  // footer content
  const [footerTitle, setFooterTitle] = React.useState("Company");
  const [footerLinks, setFooterLinks] = React.useState<string[]>(["Home", "Service", "About Us"]);
  const addFooterLink = () => setFooterLinks((s) => [...s, ""]);
  const removeFooterLink = (i: number) => setFooterLinks((s) => s.filter((_, idx) => idx !== i));
  const updateFooterLink = (i: number, v: string) =>
    setFooterLinks((s) => s.map((x, idx) => (idx === i ? v : x)));

  const [companyAddress, setCompanyAddress] = React.useState("");
  const [companyEmail, setCompanyEmail] = React.useState("");
  const [companyPhone, setCompanyPhone] = React.useState("");

  const handleSave = () => {
    // Replace with real action/mutation later
    console.log("Saving Landing Page settings", {
      logo,
      favicon,
      navLinks,
      heroTitle,
      heroSub,
      heroCta,
      mid1,
      mid2,
      footerTitle,
      footerLinks,
      companyAddress,
      companyEmail,
      companyPhone,
    });
    alert("Saved (mock). Wire this up to your API later.");
  };

  return (
    <div className="mx-auto max-w-[1100px] px-6 pb-12">
      <h1 className="mb-6 text-xl font-semibold text-gray-900">Frontend → Landing Page</h1>

      {/* HERO */}
      <Card title="Hero Section">
        <p className="mb-4 text-xs text-gray-500">
          Configure your logo, basic navigation and hero copy for the landing page.
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <FieldLabel>Logo</FieldLabel>
            <UploadPreview
              label="Logo"
              value={logo}
              onChange={setLogo}
              onReset={() => setLogo("/logo.svg")}
              size={72}
              round={false}
            />
          </div>

          <div className="space-y-3">
            <FieldLabel>Favicon</FieldLabel>
            <UploadPreview
              label="Favicon"
              value={favicon}
              onChange={setFavicon}
              onReset={() => setFavicon("/favicon.png")}
              size={48}
              round
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {navLinks.map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <TextInput
                value={v}
                placeholder={`Navigation Link ${i + 1}`}
                onChange={(e) => updateLink(i, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeLink(i)}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-3 text-sm text-gray-800 hover:bg-gray-50"
                aria-label="Remove link"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addLink}
          className="mt-3 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
        >
          <Plus className="h-4 w-4" />
          Add link
        </button>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <FieldLabel>Title Text</FieldLabel>
            <TextInput value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} placeholder="Type" />
          </div>
          <div>
            <FieldLabel>Sub text</FieldLabel>
            <TextArea value={heroSub} onChange={(e) => setHeroSub(e.target.value)} placeholder="Type" />
          </div>
          <div>
            <FieldLabel>Primary CTA</FieldLabel>
            <TextInput value={heroCta} onChange={(e) => setHeroCta(e.target.value)} placeholder="Get started" />
          </div>
        </div>
      </Card>

      {/* MID 1 */}
      <div className="mt-6">
        <Card title="Mid Section">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <FieldLabel>Title Text</FieldLabel>
              <TextInput
                value={mid1.title}
                onChange={(e) => setMid1({ ...mid1, title: e.target.value })}
                placeholder="Type"
              />
            </div>
            <div>
              <FieldLabel>Sub text</FieldLabel>
              <TextArea
                value={mid1.sub}
                onChange={(e) => setMid1({ ...mid1, sub: e.target.value })}
                placeholder="Type"
              />
            </div>
            <div>
              <FieldLabel>Primary CTA</FieldLabel>
              <TextInput
                value={mid1.cta1}
                onChange={(e) => setMid1({ ...mid1, cta1: e.target.value })}
                placeholder="Type"
              />
            </div>
            <div>
              <FieldLabel>Secondary CTA</FieldLabel>
              <TextInput
                value={mid1.cta2}
                onChange={(e) => setMid1({ ...mid1, cta2: e.target.value })}
                placeholder="Type"
              />
            </div>
          </div>

          <div className="mt-4">
            <FieldLabel>Attach Icon (preview only)</FieldLabel>
            <UploadPreview
              label="Icon"
              value={"/logo.svg"}
              onChange={() => {}}
              onReset={() => {}}
              size={44}
              round={false}
            />
          </div>
        </Card>
      </div>

      {/* MID 2 */}
      <div className="mt-6">
        <Card title="Mid Section (Secondary)">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <FieldLabel>Title Text</FieldLabel>
              <TextInput
                value={mid2.title}
                onChange={(e) => setMid2({ ...mid2, title: e.target.value })}
                placeholder="Type"
              />
            </div>
            <div>
              <FieldLabel>Sub text</FieldLabel>
              <TextArea
                value={mid2.sub}
                onChange={(e) => setMid2({ ...mid2, sub: e.target.value })}
                placeholder="Type"
              />
            </div>
            <div>
              <FieldLabel>Primary CTA</FieldLabel>
              <TextInput
                value={mid2.cta1}
                onChange={(e) => setMid2({ ...mid2, cta1: e.target.value })}
                placeholder="Type"
              />
            </div>
            <div>
              <FieldLabel>Secondary CTA</FieldLabel>
              <TextInput
                value={mid2.cta2}
                onChange={(e) => setMid2({ ...mid2, cta2: e.target.value })}
                placeholder="Type"
              />
            </div>
          </div>

          <div className="mt-4">
            <FieldLabel>Attach Icon (preview only)</FieldLabel>
            <UploadPreview
              label="Icon"
              value={"/logo.svg"}
              onChange={() => {}}
              onReset={() => {}}
              size={44}
              round={false}
            />
          </div>
        </Card>
      </div>

      {/* FOOTER */}
      <div className="mt-6">
        <Card title="Footer Section">
          <div className="grid gap-6 md:grid-cols-[auto_1fr]">
            <div className="space-y-3">
              <FieldLabel>Footer Logo</FieldLabel>
              <UploadPreview
                label="Logo"
                value={logo}
                onChange={setLogo}
                onReset={() => setLogo("/logo.svg")}
                size={64}
                round={false}
              />
            </div>

            <div className="grid gap-4">
              <div>
                <FieldLabel>Title Text</FieldLabel>
                <TextInput value={footerTitle} onChange={(e) => setFooterTitle(e.target.value)} />
              </div>

              <div className="grid gap-2">
                <FieldLabel>Sub Links</FieldLabel>
                {footerLinks.map((v, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <TextInput
                      value={v}
                      onChange={(e) => updateFooterLink(i, e.target.value)}
                      placeholder="Link label"
                    />
                    <button
                      type="button"
                      onClick={() => removeFooterLink(i)}
                      className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-3 text-sm text-gray-800 hover:bg-gray-50"
                      aria-label="Remove link"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFooterLink}
                  className="mt-2 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                  Add sub link
                </button>
              </div>

              <div>
                <FieldLabel>Company Address</FieldLabel>
                <TextInput
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  placeholder="Enter company address"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel>Company Email</FieldLabel>
                  <TextInput
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    placeholder="email@company.com"
                  />
                </div>
                <div>
                  <FieldLabel>Company Phone</FieldLabel>
                  <TextInput
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    placeholder="+1 555 0100"
                  />
                </div>
              </div>

              <div className="mt-2">
                <FieldLabel>Sponsors (preview only)</FieldLabel>
                <UploadPreview
                  label="Image"
                  value={"/logo.svg"}
                  onChange={() => {}}
                  onReset={() => {}}
                  size={60}
                  round={false}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-black"
        >
          Save
        </button>
      </div>
    </div>
  );
}
