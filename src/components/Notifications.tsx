"use client";

import * as React from "react";
import { Bell, X, Circle } from "lucide-react";
import Image from "next/image";

type Notice = {
  id: string;
  app: string;
  title: string;
  ago: string;
  iconSrc?: string;   // remote or local
  iconBg?: string;    // Tailwind bg class (optional)
};

// sample data (replace with API later)
const NOTICES: Notice[] = [
  {
    id: "n1",
    app: "Trampco",
    title: "Manage user's settings",
    ago: "2 min ago",
    iconSrc: "/admin-ngo/SiriusXM logo 1.png",
    iconBg: "bg-yellow-100",
  },
  {
    id: "n2",
    app: "Third",
    title: "Feedback review. Check in",
    ago: "2 min ago",
    iconSrc: "/admin-ngo/Fable logo 1.png",
    iconBg: "bg-slate-100",
  },
  {
    id: "n3",
    app: "Candol",
    title: "A message was sent from Candol. Check your message",
    ago: "1 hour ago",
    iconSrc: "/admin-ngo/NYT Cooking logo 1.png",
    iconBg: "bg-rose-100",
  },
];

function useClickOutside<T extends HTMLElement>(onClose: () => void) {
  const ref = React.useRef<T | null>(null);
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return ref;
}

export default function Notifications({
  className = "",
  showDot = true,
}: { className?: string; showDot?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const panelRef = useClickOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
      >
        <Bell className="h-5 w-5" />
        {showDot && (
          <span className="absolute right-2 top-2 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Notifications"
          className="absolute right-0 z-50 mt-2 w-[460px] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl"
        >
          <div className="mb-2 flex items-center justify-between px-1">
            <div className="text-sm font-semibold text-slate-900">Notification</div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-slate-500 hover:bg-slate-50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2">
            {NOTICES.map((n) => (
              <div key={n.id} className="group rounded-xl border border-slate-100 p-3 hover:bg-slate-50/60">
                <div className="flex items-start gap-3">
                  <div className={`grid h-9 w-9 place-items-center overflow-hidden rounded-lg ring-1 ring-slate-200 ${n.iconBg ?? ""}`}>
                    {n.iconSrc ? (
                      <Image src={n.iconSrc} alt={`${n.app} logo`} width={28} height={28} className="object-contain" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-medium text-slate-900">{n.app}</p>
                      <span className="text-[11px] text-slate-500">{n.ago}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-700">{n.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
