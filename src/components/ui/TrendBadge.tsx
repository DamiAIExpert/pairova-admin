export function TrendBadge({ value = "7%" }: { value?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
      {/* up arrow icon (no external lib needed) */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 17l6-6 4 4 7-7" />
        <path d="M14 4h7v7" />
      </svg>
      {value}
    </span>
  );
}
