"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Upload, Trash2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/* UI helpers                                                          */
/* ------------------------------------------------------------------ */

function ActionButton({
  children,
  variant = "outline",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "outline" | "solid";
  onClick: () => void;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition";
  const styles =
    variant === "outline"
      ? "border border-gray-200 text-gray-800 hover:bg-gray-50"
      : "bg-gray-900 text-white hover:bg-black";
  return (
    <button type="button" onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm text-gray-800 hover:bg-gray-50"
    >
      Save changes
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Reusable brand card (Logo/Favicon)                                  */
/* ------------------------------------------------------------------ */

function BrandBlock({
  title,
  subtitle,
  helper,
  uploadLabel,
  removeLabel,
  roundPreview = true,
  storageKey,
  defaultSrc,
  previewSize,
}: {
  title: string;
  subtitle: string;
  helper: string;
  uploadLabel: string;
  removeLabel: string;
  roundPreview?: boolean;
  storageKey: string;
  defaultSrc: string;
  previewSize: number;
}) {
  const [src, setSrc] = React.useState<string>(() => {
    if (typeof window === "undefined") return defaultSrc;
    return localStorage.getItem(storageKey) || defaultSrc;
  });

  const fileInput = React.useRef<HTMLInputElement>(null);

  const onUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSrc(String(reader.result));
    reader.readAsDataURL(file);
  };

  const onSave = () => {
    localStorage.setItem(storageKey, src);
    alert("Saved (mock). Replace with your API later.");
  };

  const onRemove = () => setSrc(defaultSrc);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white">
      <header className="border-b px-4 py-3 sm:px-6">
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </header>

      <div className="grid items-center gap-6 p-4 sm:grid-cols-[auto_1fr_auto] sm:p-6">
        {/* Preview */}
        <div
          className={`overflow-hidden ring-1 ring-gray-200 ${
            roundPreview ? "rounded-full" : "rounded-lg"
          }`}
          style={{ width: previewSize, height: previewSize }}
        >
          <Image
            src={src}
            alt={title}
            width={previewSize}
            height={previewSize}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Actions + helper */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <ActionButton variant="outline" onClick={() => fileInput.current?.click()}>
              <Upload className="h-4 w-4" /> {uploadLabel}
            </ActionButton>
            <ActionButton variant="solid" onClick={onRemove}>
              <Trash2 className="h-4 w-4" /> {removeLabel}
            </ActionButton>
          </div>
          <div className="text-xs text-gray-500">{helper}</div>

          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onUpload(e.target.files?.[0])}
          />
        </div>

        {/* Save */}
        <div className="justify-self-end">
          <SaveButton onClick={onSave} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function FrontendBrandPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-[1100px] px-6 pb-12">
      <h1 className="mb-5 pt-2 text-xl font-semibold text-gray-900">Frontend</h1>

      {/* Pill switch (active: Logo & Favicon) */}
      <div className="mb-6">
        <div className="inline-flex rounded-full bg-gray-100 p-1">
          <button
            type="button"
            className="rounded-full bg-white px-4 py-1.5 text-sm text-gray-900 shadow"
          >
            Logo and Favicon
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/settings/frontend/pages")}
            className="rounded-full px-4 py-1.5 text-sm text-gray-600 hover:text-gray-900"
          >
            Frontend Pages
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        <BrandBlock
          title="Logo"
          subtitle="Edit Logo"
          helper="Pick a photo of up to 4 MB"
          uploadLabel="Upload Logo"
          removeLabel="Remove Logo"
          roundPreview
          storageKey="fe:brand:logo"
          defaultSrc="/logo.svg"
          previewSize={112} // circular
        />

        <BrandBlock
          title="Favicon"
          subtitle="Edit Favicon"
          helper="Choose PNG or SVG"
          uploadLabel="Upload"
          removeLabel="Remove"
          roundPreview={false}
          storageKey="fe:brand:favicon"
          defaultSrc="/favicon.png"
          previewSize={80} // square
        />
      </div>
    </div>
  );
}
