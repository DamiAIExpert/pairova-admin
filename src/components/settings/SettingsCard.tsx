// src/components/settings/SettingsCard.tsx
"use client";
import Link from "next/link";

export default function SettingsCard({
  title,
  desc,
  href,
  icon,
}: {
  title: string;
  desc: string;
  href: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-2 flex items-center gap-3">
        {icon && <div className="grid h-10 w-10 place-items-center rounded-xl bg-gray-100">{icon}</div>}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="mb-4 text-sm text-gray-600">{desc}</p>
      <Link
        href={href}
        className="inline-flex items-center rounded-lg border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        View
      </Link>
    </div>
  );
}
