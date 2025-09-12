"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

/* ----------------------------- shared minis ----------------------------- */
function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1100px] px-6 pb-12">{children}</div>;
}
function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white">
      {title ? (
        <header className="border-b px-4 py-3 sm:px-6">
          <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        </header>
      ) : null}
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}
function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
) {
  const { label, className, ...rest } = props;
  return (
    <label className="block text-sm">
      {label ? <span className="mb-1 block text-gray-700">{label}</span> : null}
      <input
        {...rest}
        className={`h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 ${className ?? ""}`}
      />
    </label>
  );
}
function PrimaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
) {
  const { className, ...rest } = props;
  return (
    <button
      {...rest}
      className={`inline-flex h-10 items-center justify-center rounded-lg bg-gray-900 px-4 text-sm font-medium text-white hover:bg-black ${className ?? ""}`}
    />
  );
}
function OutlineButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
) {
  const { className, ...rest } = props;
  return (
    <button
      {...rest}
      className={`inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm text-gray-800 hover:bg-gray-50 ${className ?? ""}`}
    />
  );
}
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        checked ? "bg-gray-900" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}
function useOutsideClose(cb: () => void) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [cb]);
  return ref;
}
type Option = { label: string; value: string };
function SoftSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value?: string;
  onChange: (val: string) => void;
  options: Option[];
  placeholder?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = useOutsideClose(() => setOpen(false));
  const chosen = options.find((o) => o.value === value);
  return (
    <div ref={ref} className="text-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 px-3 text-left text-gray-900"
      >
        <span className={`${chosen ? "" : "text-gray-400"}`}>
          {chosen ? chosen.label : placeholder || "Select"}
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

/* ---------------------------------- page ---------------------------------- */

const PROVIDERS: Option[] = [
  { label: "Twilio", value: "twilio" },
  { label: "ClickAtell", value: "clickatell" },
  { label: "Bulk SMS", value: "bulksms" },
  { label: "Nexmo", value: "nexmo" },
];

type SmsConfig = {
  provider?: string;
  secretKey: string;
  senderId: string;
  apiKey: string;
  testMode: boolean;
};

const STORAGE_PREFIX = "cfg:sms:";

export default function SmsProviderConfigPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const isKnown = PROVIDERS.some((p) => p.value === id);
  const fallback = "twilio";

  const load = (slug: string): SmsConfig => {
    if (typeof window === "undefined") {
      return { provider: slug, secretKey: "", senderId: "", apiKey: "", testMode: false };
    }
    const raw = localStorage.getItem(STORAGE_PREFIX + slug);
    return raw
      ? (JSON.parse(raw) as SmsConfig)
      : { provider: slug, secretKey: "", senderId: "", apiKey: "", testMode: false };
  };

  const [cfg, setCfg] = React.useState<SmsConfig>(() => load(isKnown ? id : fallback));

  React.useEffect(() => {
    if (!isKnown) return;
    setCfg(load(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const save = (_e: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.setItem(STORAGE_PREFIX + (id || fallback), JSON.stringify(cfg));
    alert("Saved (mock). Replace with your API call.");
  };
  const testSms = (_e: React.MouseEvent<HTMLButtonElement>) => alert("Test SMS sent (mock).");

  if (!isKnown) {
    return (
      <PageShell>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          Unknown provider: <span className="font-semibold">{id}</span>.{" "}
          <button className="underline" onClick={() => router.push("/admin/settings/sms")}>
            Go back
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mb-4 text-sm text-gray-500">
        <Link href="/admin/settings/sms" className="inline-flex items-center gap-1 hover:underline">
          <ChevronLeft className="h-4 w-4" />
          Back to SMS Provider
        </Link>
      </div>

      <h1 className="mb-6 text-xl font-semibold text-gray-900">Configuration</h1>

      <Card>
        <div className="mx-auto max-w-3xl space-y-4">
          <div>
            <div className="mb-1 text-sm text-gray-700">SMS Provider</div>
            <SoftSelect
              value={cfg.provider}
              onChange={(val) => setCfg((s) => ({ ...s, provider: val }))}
              options={PROVIDERS}
              placeholder="Select SMS Provider"
            />
          </div>

          <TextInput
            label="Secret Key"
            value={cfg.secretKey}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCfg((s) => ({ ...s, secretKey: e.target.value }))
            }
            placeholder=""
          />

          <TextInput
            label="Sender ID"
            value={cfg.senderId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCfg((s) => ({ ...s, senderId: e.target.value }))
            }
            placeholder=""
          />

          <TextInput
            label="API Key"
            value={cfg.apiKey}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCfg((s) => ({ ...s, apiKey: e.target.value }))
            }
            placeholder=""
          />

          <div>
            <div className="mb-2 text-sm font-semibold text-gray-900">Testing mode</div>
            <Card>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Enable test</span>
                <Toggle
                  checked={cfg.testMode}
                  onChange={(v) => setCfg((s) => ({ ...s, testMode: v }))}
                />
              </div>
            </Card>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <PrimaryButton onClick={testSms}>Test SMS</PrimaryButton>
            <OutlineButton onClick={save}>Save Changes</OutlineButton>
          </div>
        </div>
      </Card>
    </PageShell>
  );
}
