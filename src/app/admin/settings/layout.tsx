// src/app/admin/settings/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings • Admin",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto max-w-[1400px] px-6 py-6">{children}</div>;
}
