// src/components/Topbar.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";

/* ----------------------------- Helpers ----------------------------- */
function useOutsideClose<T extends HTMLElement>(onClose: () => void) {
  const ref = React.useRef<T | null>(null);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return ref;
}

function initialsFromName(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase() ?? "")
      .join("") || "A"
  );
}

/* ----------------------------- Avatar ------------------------------ */
function Avatar({
  name = "Admin",
  // Use /public/favicon.png as the default admin profile picture
  src = "/favicon.png",
  size = 32,
}: {
  name?: string;
  src?: string | null;
  size?: number;
}) {
  const [err, setErr] = React.useState(false);
  const initials = initialsFromName(name);
  const fallback = `https://placehold.co/${size}x${size}/EEE/111?text=${encodeURIComponent(
    initials
  )}`;
  const finalSrc = !src || err ? fallback : src;

  return (
    <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
      <Image
        src={finalSrc}
        alt={`${name} avatar`}
        width={size}
        height={size}
        className="h-8 w-8 object-cover"
        onError={() => setErr(true)}
      />
    </div>
  );
}

/* ------------------------ Notifications UI ------------------------- */
type Notice = {
  id: string;
  app: string;
  title: string;
  desc?: string;
  time: string;
  tone?: "success" | "warning" | "message";
};

const demoNotices: Notice[] = [
  {
    id: "n1",
    app: "Trampco",
    title: "Manage user's settings",
    time: "2 min ago",
    tone: "success",
  },
  {
    id: "n2",
    app: "Third",
    title: "Feedback review. Check-in",
    time: "2 min ago",
    tone: "message",
  },
  {
    id: "n3",
    app: "Candol",
    title: "A message was sent from Candol.",
    desc: "Check your message for more information",
    time: "1 hour ago",
    tone: "warning",
  },
];

function ToneIcon({ tone }: { tone?: Notice["tone"] }) {
  if (tone === "success")
    return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
  if (tone === "warning")
    return <AlertTriangle className="h-4 w-4 text-amber-600" />;
  return <MessageSquare className="h-4 w-4 text-blue-600" />;
}

function NotificationsPopover({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useOutsideClose<HTMLDivElement>(onClose);
  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Notifications"
      className="absolute right-0 top-12 z-40 w-[360px] rounded-2xl border border-gray-200 bg-white shadow-lg"
      style={{ transformOrigin: "top right" }}
    >
      <div className="border-b px-4 py-3 text-sm font-semibold text-gray-900">
        Notification
      </div>
      <ul className="max-h-[60vh] overflow-auto p-2">
        {demoNotices.map((n) => (
          <li
            key={n.id}
            className="group relative mb-2 rounded-xl border border-gray-100 bg-white p-3 hover:bg-gray-50"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-gray-100 p-2">
                <ToneIcon tone={n.tone} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {n.app}
                  </p>
                  <span className="text-xs text-gray-400">{n.time}</span>
                </div>
                <p className="mt-0.5 text-sm text-gray-700">{n.title}</p>
                {n.desc && (
                  <p className="mt-0.5 text-xs text-gray-500">{n.desc}</p>
                )}
              </div>
              <span className="absolute right-3 top-3 block h-1.5 w-1.5 rounded-full bg-rose-500" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------ Topbar ----------------------------- */
export default function Topbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="relative mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 sm:px-6">
        {/* Left: Logo + Welcome */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Pairova Logo" width={120} height={40} priority />
          </Link>
          <span className="hidden truncate pl-3 text-sm text-gray-600 sm:block">
            Welcome back <span className="font-medium">Admin</span>!
          </span>
        </div>

        {/* Right: Notifications + Profile */}
        <div className="relative flex items-center gap-3">
          {/* Notifications */}
          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
            aria-label="Notifications"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {/* Popover */}
          <NotificationsPopover open={open} onClose={() => setOpen(false)} />

          {/* Profile (now uses /favicon.png by default) */}
          <button
            type="button"
            className="group inline-flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1.5 hover:bg-gray-50"
            aria-haspopup="menu"
            aria-expanded={false}
            aria-label="Account menu"
          >
            <Avatar name="Admin" />
            <span className="hidden text-sm text-gray-700 sm:block">Admin</span>
            <ChevronDown className="hidden h-4 w-4 text-gray-400 sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
