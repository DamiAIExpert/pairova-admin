"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { EMAIL_PROVIDERS, type EmailProvider } from "../_data";
import { ChevronLeft } from "lucide-react";

/* small inputs */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-gray-700">{label}</span>
      {children}
    </label>
  );
}
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 ${props.className ?? ""}`}
    />
  );
}
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${checked ? "bg-gray-900" : "bg-gray-300"}`}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${checked ? "translate-x-5" : "translate-x-1"}`} />
    </button>
  );
}
function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white">
      {title ? <header className="border-b px-4 py-3 sm:px-6"><h2 className="text-sm font-semibold text-gray-900">{title}</h2></header> : null}
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}

/* storage helpers */
type ProviderConfig = {
  host: string;
  fromEmail: string;
  apiKey: string;
  sandbox: boolean;
};
const DEFAULTS: ProviderConfig = { host: "", fromEmail: "", apiKey: "", sandbox: false };
const key = (id: string) => `email:provider:${id}`;

function loadCfg(id: string): ProviderConfig {
  if (typeof window === "undefined") return DEFAULTS;
  const raw = localStorage.getItem(key(id));
  return raw ? (JSON.parse(raw) as ProviderConfig) : DEFAULTS;
}

export default function EmailProviderConfigPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const provider: EmailProvider | undefined = EMAIL_PROVIDERS.find((p) => p.id === id);
  const [cfg, setCfg] = React.useState<ProviderConfig>(() => loadCfg(id));

  if (!provider) {
    return (
      <div className="mx-auto max-w-[900px] px-6 pb-12">
        <button
          onClick={() => router.push("/admin/settings/email")}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-700 hover:underline"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          Provider not found.
        </div>
      </div>
    );
  }

  const save = () => {
    localStorage.setItem(key(id), JSON.stringify(cfg));
    alert("Saved (mock). Replace with API call.");
  };
  const test = () => alert(`Send test (mock) via ${provider.name}`);
  const reset = () => setCfg(loadCfg(id));

  return (
    <div className="mx-auto max-w-[900px] px-6 pb-12">
      <button
        onClick={() => router.push("/admin/settings/email")}
        className="mb-4 inline-flex items-center gap-2 text-sm text-gray-700 hover:underline"
      >
        <ChevronLeft className="h-4 w-4" /> Back to providers
      </button>

      <h1 className="mb-3 text-xl font-semibold text-gray-900">
        Configure: {provider.name}
      </h1>
      <p className="mb-6 text-sm text-gray-600">ID: {provider.id} • Region: {provider.region}</p>

      <Card>
        <div className="grid gap-4">
          <Field label="SMTP / API Host">
            <Input
              placeholder="smtp.mailhost.com"
              value={cfg.host}
              onChange={(e) => setCfg((s) => ({ ...s, host: e.target.value }))}
            />
          </Field>

          <Field label="From Email">
            <Input
              type="email"
              placeholder="noreply@company.com"
              value={cfg.fromEmail}
              onChange={(e) => setCfg((s) => ({ ...s, fromEmail: e.target.value }))}
            />
          </Field>

          <Field label="API Key / Password">
            <Input
              type="password"
              placeholder="••••••••"
              value={cfg.apiKey}
              onChange={(e) => setCfg((s) => ({ ...s, apiKey: e.target.value }))}
            />
          </Field>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Sandbox / Test mode</span>
            <Toggle
              checked={cfg.sandbox}
              onChange={(v) => setCfg((s) => ({ ...s, sandbox: v }))}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={test}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 px-4 text-sm font-medium text-white hover:bg-black"
            >
              Send Test
            </button>
            <button
              onClick={save}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm text-gray-800 hover:bg-gray-50"
            >
              Save Changes
            </button>
            <button
              onClick={reset}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm text-gray-800 hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
