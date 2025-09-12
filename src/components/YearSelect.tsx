"use client";
import * as React from "react";
import { ChevronDown } from "lucide-react";

export default function YearSelect({
  years, value, onChange, className = "", size = "sm",
}: {
  years: number[]; value: number; onChange: (y: number) => void;
  className?: string; size?: "sm" | "md";
}) {
  const [open, setOpen] = React.useState(false);
  const btn = `inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 ${
    size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"
  }`;
  return (
    <div className={`relative ${className}`}>
      <button type="button" className={btn} aria-haspopup="listbox" aria-expanded={open}
        onClick={() => setOpen(v => !v)}>
        {value} <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <ul role="listbox"
            className="absolute z-40 mt-1 w-28 overflow-hidden rounded-md border border-slate-200 bg-white py-1 text-sm shadow-lg">
          {years.map(y => (
            <li key={y}>
              <button type="button" role="option" aria-selected={y === value}
                onClick={() => { onChange(y); setOpen(false); }}
                className={`block w-full px-3 py-1.5 text-left hover:bg-slate-50 ${
                  y === value ? "bg-slate-100 font-medium text-slate-900" : "text-slate-700"
                }`}>
                {y}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
