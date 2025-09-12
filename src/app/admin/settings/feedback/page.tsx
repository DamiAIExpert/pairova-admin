"use client";

import React from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import {
  MoreVertical,
  Search,
  SlidersHorizontal,
  Eye,
  CheckCircle2,
  Trash2,
  Flag,
  X,
  ChevronDown,
} from "lucide-react";

/* =========================================================================
   SafeImage – next/image with graceful fallback to <img>
   ========================================================================= */

type SafeImageProps = NextImageProps & { fallbackSrc?: string };

function SafeImage({ fallbackSrc = "/logo.svg", onError, ...props }: SafeImageProps) {
  const [failed, setFailed] = React.useState(false);

  if (failed) {
    const { alt, className, width, height, src } = props;
    const resolvedSrc = typeof src === "string" ? src : (src as unknown as { src?: string })?.src ?? fallbackSrc;

    return (
      <img
        src={resolvedSrc}
        alt={alt ?? ""}
        className={className}
        width={Number(width) || 1}
        height={Number(height) || 1}
      />
    );
  }

  return (
    <NextImage
      {...props}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
}

/* =========================================================================
   Small UI helpers
   ========================================================================= */

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1200px] px-6 pb-12">{children}</div>;
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

function useOutsideClose(cb: () => void) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && cb();
    document.addEventListener("mousedown", h);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", h);
      document.removeEventListener("keydown", esc);
    };
  }, [cb]);
  return ref;
}

function Pill({
  children,
  color = "gray",
}: {
  children: React.ReactNode;
  color?: "green" | "blue" | "orange" | "gray";
}) {
  const map: Record<"green" | "blue" | "orange" | "gray", string> = {
    green: "bg-green-50 text-green-700",
    blue: "bg-blue-50 text-blue-700",
    orange: "bg-orange-50 text-orange-700",
    gray: "bg-gray-100 text-gray-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${map[color]}`}
    >
      {children}
    </span>
  );
}

/* =========================================================================
   Select (soft dropdown) used in slide-over
   ========================================================================= */

type Option = { label: string; value: string };

function SoftSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label?: string;
  value?: string;
  onChange: (val: string) => void;
  options: Option[];
  placeholder?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = useOutsideClose(() => setOpen(false));
  const chosen = options.find((o) => o.value === value);

  return (
    <div className="text-sm" ref={ref}>
      {label ? <div className="mb-1 text-gray-700">{label}</div> : null}
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

/* =========================================================================
   Types + Mock Data
   ========================================================================= */

type FeedbackStatus = "Open" | "In Progress" | "Resolved";
type FeedbackPriority = "Low" | "Medium" | "High" | "Urgent";
type FeedbackCategory = "Bug" | "Feature" | "Support" | "Other";

type FeedbackRow = {
  id: string;
  userName: string;
  userEmail: string;
  avatar?: string;
  subject: string;
  message: string;
  category: FeedbackCategory;
  priority: FeedbackPriority;
  status: FeedbackStatus;
  createdAt: string; // ISO date string for mock
};

const MOCK: FeedbackRow[] = [
  {
    id: "fb_001",
    userName: "Ayra Gbolade",
    userEmail: "ayragbolade@gmail.com",
    subject: "Login shows unknown error",
    message:
      "I encountered an error when trying to log in this morning. It says 'unknown error'.",
    category: "Bug",
    priority: "High",
    status: "Open",
    createdAt: "2025-09-20T09:10:00Z",
    avatar: "/logo.svg",
  },
  {
    id: "fb_002",
    userName: "John Williams",
    userEmail: "johnw@company.com",
    subject: "Can we have dark mode?",
    message: "It would be great to have a dark theme for late-night browsing.",
    category: "Feature",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2025-09-18T12:30:00Z",
    avatar: "/logo.svg",
  },
  {
    id: "fb_003",
    userName: "Mina S.",
    userEmail: "mina@example.com",
    subject: "Unable to reset password",
    message:
      "The password reset link says token expired immediately after I clicked.",
    category: "Support",
    priority: "Urgent",
    status: "Open",
    createdAt: "2025-09-21T07:55:00Z",
    avatar: "/logo.svg",
  },
  {
    id: "fb_004",
    userName: "Kayode O.",
    userEmail: "kayode@acme.org",
    subject: "Copy on the home hero",
    message: "Small typo in the hero text ('seemlessly' → 'seamlessly').",
    category: "Other",
    priority: "Low",
    status: "Resolved",
    createdAt: "2025-09-10T15:05:00Z",
    avatar: "/logo.svg",
  },
];

/* =========================================================================
   Slide-over (View / Edit)
   ========================================================================= */

function SlideOver({
  open,
  onClose,
  row,
  onUpdate,
}: {
  open: boolean;
  onClose: () => void;
  row?: FeedbackRow;
  onUpdate: (patch: Partial<FeedbackRow>) => void;
}) {
  const containerRef = useOutsideClose(() => {
    if (open) onClose();
  });

  if (!open || !row) return null;

  const statusOptions: Option[] = [
    { value: "Open", label: "Open" },
    { value: "In Progress", label: "In Progress" },
    { value: "Resolved", label: "Resolved" },
  ];
  const priorityOptions: Option[] = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
    { value: "Urgent", label: "Urgent" },
  ];
  const categoryOptions: Option[] = [
    { value: "Bug", label: "Bug" },
    { value: "Feature", label: "Feature" },
    { value: "Support", label: "Support" },
    { value: "Other", label: "Other" },
  ];

  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="absolute inset-0 bg-black/30" />
      <aside
        ref={containerRef}
        className="ml-auto flex h-full w-full max-w-[480px] flex-col overflow-auto bg-white shadow-2xl"
        role="dialog"
        aria-label="Feedback"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3 sm:px-6">
          <div className="text-sm font-semibold text-gray-900">Feedback</div>
          <button
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-50"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="space-y-4 p-4 sm:p-6">
          {/* Reporter */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full ring-1 ring-gray-200">
              <SafeImage
                src={row.avatar || "/logo.svg"}
                alt={row.userName}
                width={40}
                height={40}
              />
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-900">{row.userName}</div>
              <div className="text-gray-600">{row.userEmail}</div>
            </div>
          </div>

          {/* Subject / Message */}
          <div className="rounded-xl border border-gray-200 p-4">
            <div className="text-sm font-semibold text-gray-900">
              {row.subject}
            </div>
            <div className="mt-1 whitespace-pre-wrap text-sm text-gray-700">
              {row.message}
            </div>
          </div>

          {/* Editable fields */}
          <div className="grid gap-3">
            <SoftSelect
              label="Status"
              value={row.status}
              onChange={(v) => onUpdate({ status: v as FeedbackStatus })}
              options={statusOptions}
              placeholder="Select status"
            />
            <SoftSelect
              label="Priority"
              value={row.priority}
              onChange={(v) => onUpdate({ priority: v as FeedbackPriority })}
              options={priorityOptions}
              placeholder="Select priority"
            />
            <SoftSelect
              label="Category"
              value={row.category}
              onChange={(v) => onUpdate({ category: v as FeedbackCategory })}
              options={categoryOptions}
              placeholder="Select category"
            />
          </div>

          <div className="pt-2">
            <PrimaryButton onClick={onClose}>Close</PrimaryButton>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* =========================================================================
   Feedback Settings Page
   ========================================================================= */

export default function FeedbackSettingsPage() {
  const [rows, setRows] = React.useState<FeedbackRow[]>(MOCK);
  const [query, setQuery] = React.useState("");

  // filters
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const filtersRef = useOutsideClose(() => setFiltersOpen(false));

  const statusList: FeedbackStatus[] = ["Open", "In Progress", "Resolved"];
  const priorityList: FeedbackPriority[] = ["Low", "Medium", "High", "Urgent"];
  const categoryList: FeedbackCategory[] = ["Bug", "Feature", "Support", "Other"];

  const [statusFilter, setStatusFilter] =
    React.useState<"all" | FeedbackStatus>("all");
  const [priorityFilter, setPriorityFilter] =
    React.useState<"all" | FeedbackPriority>("all");
  const [categoryFilter, setCategoryFilter] =
    React.useState<"all" | FeedbackCategory>("all");

  // row menu & slide-over
  const [menuFor, setMenuFor] = React.useState<string | null>(null);
  const menuRef = useOutsideClose(() => setMenuFor(null));

  const [current, setCurrent] = React.useState<FeedbackRow | undefined>();
  const [open, setOpen] = React.useState(false);

  // derived rows
  const filtered = React.useMemo(() => {
    const q = query.toLowerCase().trim();
    return rows.filter((r) => {
      const textMatch =
        !q ||
        r.userName.toLowerCase().includes(q) ||
        r.userEmail.toLowerCase().includes(q) ||
        r.subject.toLowerCase().includes(q) ||
        r.message.toLowerCase().includes(q);
      const statusMatch = statusFilter === "all" || r.status === statusFilter;
      const priorityMatch = priorityFilter === "all" || r.priority === priorityFilter;
      const categoryMatch = categoryFilter === "all" || r.category === categoryFilter;
      return textMatch && statusMatch && priorityMatch && categoryMatch;
    });
  }, [rows, query, statusFilter, priorityFilter, categoryFilter]);

  // actions
  const viewRow = (row: FeedbackRow) => {
    setCurrent(row);
    setOpen(true);
    setMenuFor(null);
  };

  const patchRow = (id: string, patch: Partial<FeedbackRow>) => {
    setRows((s) => s.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    if (current?.id === id) setCurrent({ ...current, ...patch });
  };

  const markResolved = (id: string) => patchRow(id, { status: "Resolved" });
  const removeRow = (id: string) => setRows((s) => s.filter((r) => r.id !== id));

  // pill colors
  const statusColor = (s: FeedbackStatus): "green" | "blue" | "orange" => {
    if (s === "Open") return "orange";
    if (s === "In Progress") return "blue";
    return "green";
  };
  const priorityColor = (
    p: FeedbackPriority
  ): "gray" | "orange" | "blue" | "green" => {
    switch (p) {
      case "Urgent":
        return "orange";
      case "High":
        return "blue";
      case "Medium":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <PageShell>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Feedback</h1>

        <div className="relative flex items-center gap-2">
          <div className="hidden items-center rounded-lg border border-gray-200 pl-3 pr-2 text-sm text-gray-700 sm:flex">
            <Search className="mr-2 h-4 w-4 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search feedback..."
              className="h-9 w-64 bg-transparent outline-none"
            />
          </div>

          {/* Filters button */}
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
            aria-label="filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>

          {/* Filters dropdown */}
          {filtersOpen && (
            <div
              ref={filtersRef}
              className="absolute right-0 top-12 z-20 w-[340px] rounded-xl border border-gray-200 bg-white p-4 shadow-xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-gray-900">Filters</div>
                <button
                  className="rounded-md p-1 text-gray-500 hover:bg-gray-50"
                  onClick={() => setFiltersOpen(false)}
                  aria-label="Close filters"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-4 text-sm">
                {/* Status */}
                <div>
                  <div className="mb-1 text-gray-700">Status</div>
                  <div className="flex flex-wrap gap-2">
                    {(["all", ...statusList] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() =>
                          setStatusFilter(s as "all" | FeedbackStatus)
                        }
                        className={`rounded-md border px-2 py-1 ${
                          statusFilter === s
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 text-gray-800 hover:bg-gray-50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <div className="mb-1 text-gray-700">Priority</div>
                  <div className="flex flex-wrap gap-2">
                    {(["all", ...priorityList] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() =>
                          setPriorityFilter(p as "all" | FeedbackPriority)
                        }
                        className={`rounded-md border px-2 py-1 ${
                          priorityFilter === p
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 text-gray-800 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <div className="mb-1 text-gray-700">Category</div>
                  <div className="flex flex-wrap gap-2">
                    {(["all", ...categoryList] as const).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() =>
                          setCategoryFilter(c as "all" | FeedbackCategory)
                        }
                        className={`rounded-md border px-2 py-1 ${
                          categoryFilter === c
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 text-gray-800 hover:bg-gray-50"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-gray-200 bg-white">
        <div className="border-b px-4 py-3 sm:px-6">
          <h2 className="text-sm font-semibold text-gray-900">All Feedback</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Subject</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full ring-1 ring-gray-200">
                        <SafeImage
                          src={r.avatar || "/logo.svg"}
                          alt={r.userName}
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="text-gray-900">{r.userName}</div>
                    </div>
                    <div className="text-xs text-gray-500">{r.userEmail}</div>
                  </td>

                  <td className="px-4 py-4 text-gray-900">{r.subject}</td>

                  <td className="px-4 py-4">
                    <Pill color="gray">{r.category}</Pill>
                  </td>

                  <td className="px-4 py-4">
                    <Pill color={priorityColor(r.priority)}>{r.priority}</Pill>
                  </td>

                  <td className="px-4 py-4">
                    <Pill color={statusColor(r.status)}>{r.status}</Pill>
                  </td>

                  <td className="px-4 py-4 text-gray-700">
                    {new Date(r.createdAt).toLocaleString()}
                  </td>

                  <td className="relative px-4 py-4">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
                      onClick={() => setMenuFor((v) => (v === r.id ? null : r.id))}
                      aria-haspopup="menu"
                      aria-expanded={menuFor === r.id}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {menuFor === r.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-4 top-12 z-20 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
                      >
                        <button
                          type="button"
                          onClick={() => viewRow(r)}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => markResolved(r.id)}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Mark Resolved
                        </button>

                        <button
                          type="button"
                          onClick={() => removeRow(r.id)}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-sm text-gray-500"
                  >
                    No feedback matches your search/filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer: pagination + actions (static mock) */}
        <div className="flex flex-col items-center justify-between gap-3 border-t px-4 py-3 sm:flex-row">
          <div className="flex items-center gap-1">
            {["1", "2", "3", "4"].map((p, i) => (
              <button
                key={p}
                className={`mx-0.5 h-8 min-w-[32px] rounded-md border text-sm ${
                  i === 0
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show per page:</span>
            <button className="inline-flex h-8 min-w-[40px] items-center justify-center rounded-md border border-gray-200 px-2 text-sm">
              10
            </button>
          </div>

          <div className="flex items-center gap-2 sm:ml-auto">
            <OutlineButton>
              <Flag className="mr-2 h-4 w-4" />
              Bulk Action
            </OutlineButton>
            <PrimaryButton>Export</PrimaryButton>
          </div>
        </div>
      </div>

      {/* Slide-over */}
      <SlideOver
        open={open}
        onClose={() => setOpen(false)}
        row={current}
        onUpdate={(patch) => current && patchRow(current.id, patch)}
      />
    </PageShell>
  );
}
