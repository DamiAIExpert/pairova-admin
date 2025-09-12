"use client";

import React, { JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, Pencil, Monitor, Upload, Trash2 } from "lucide-react";
import { PAGE_ROWS, type Row } from "./pages/_data";

/* outside-click hook */
function useOutsideClose(onClose: () => void) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return ref;
}

/* small image picker just for local preview */
function FilePicker({
  label,
  src,
  onChange,
  onRemove,
  size = 64,
}: {
  label: string;
  src: string;
  onChange: (file: File) => void;
  onRemove: () => void;
  size?: number;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-4">
      <div
        className="overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200"
        style={{ width: size, height: size }}
      >
        <Image src={src} alt={label} width={size} height={size} className="object-cover" />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
        >
          <Upload className="h-4 w-4" />
          Upload {label}
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
        >
          <Trash2 className="h-4 w-4" />
          Remove
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onChange(f);
          }}
        />
      </div>
    </div>
  );
}

/* --------- DEFAULT REACT COMPONENT (this is what Next expects) --------- */
export default function FrontendIndexPage(): JSX.Element {
  const [tab, setTab] = React.useState<"logo" | "pages">("pages");
  const [menuFor, setMenuFor] = React.useState<string | null>(null);
  const menuRef = useOutsideClose(() => setMenuFor(null));

  // placeholders living in /public
  const [logo, setLogo] = React.useState("/logo.svg");
  const [favicon, setFavicon] = React.useState("/favicon.png");

  const toDataUrl = (file: File) =>
    new Promise<string>((resolve) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.readAsDataURL(file);
    });

  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-10">
      <h1 className="mb-5 pt-2 text-xl font-semibold text-gray-900">Frontend</h1>

      {/* Tabs */}
      <div className="mb-6">
        <div className="inline-flex rounded-full bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setTab("logo")}
            className={`rounded-full px-4 py-1.5 text-sm ${tab === "logo" ? "bg-white text-gray-900 shadow" : "text-gray-600"}`}
          >
            Logo and Favicon
          </button>
          <button
            type="button"
            onClick={() => setTab("pages")}
            className={`rounded-full px-4 py-1.5 text-sm ${tab === "pages" ? "bg-white text-gray-900 shadow" : "text-gray-600"}`}
          >
            Frontend Pages
          </button>
        </div>
      </div>

      {tab === "logo" ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="mb-2 text-sm font-semibold text-gray-900">Logo</div>
              <FilePicker
                label="Logo"
                src={logo}
                onChange={async (f) => setLogo(await toDataUrl(f))}
                onRemove={() => setLogo("/logo.svg")}
                size={72}
              />
              <p className="mt-2 text-xs text-gray-500">
                Uses the file from <code>/public/logo.svg</code> as a fallback.
              </p>
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold text-gray-900">Favicon</div>
              <FilePicker
                label="Favicon"
                src={favicon}
                onChange={async (f) => setFavicon(await toDataUrl(f))}
                onRemove={() => setFavicon("/favicon.png")}
                size={48}
              />
              <p className="mt-2 text-xs text-gray-500">
                Uses the file from <code>/public/favicon.png</code> as a fallback.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-600">
                <tr>
                  <th className="w-10 px-4 py-3">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  </th>
                  <th className="px-4 py-3 font-medium">Page Name</th>
                  <th className="px-4 py-3 font-medium">Uniform Resource Locator</th>
                  <th className="px-4 py-3 font-medium">Last Updated</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {PAGE_ROWS.map((r: Row) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-4">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    </td>
                    <td className="px-4 py-4 text-gray-900">{r.name}</td>
                    <td className="px-4 py-4">
                      <a href={r.url} className="text-blue-600 underline underline-offset-2">
                        {r.url}
                      </a>
                    </td>
                    <td className="px-4 py-4 text-gray-700">{r.updated}</td>
                    <td className="relative px-4 py-4">
                      <button
                        type="button"
                        aria-label="row actions"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
                        onClick={() => setMenuFor((v) => (v === r.id ? null : r.id))}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>

                      {menuFor === r.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-4 top-12 z-20 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
                        >
                          <Link
                            href={`/admin/settings/frontend/pages/${r.slug}`}
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50"
                            onClick={() => setMenuFor(null)}
                          >
                            <Pencil className="h-4 w-4" />
                            Edit
                          </Link>
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                            onClick={() => setMenuFor(null)}
                          >
                            <Monitor className="h-4 w-4" />
                            Preview
                          </a>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t px-4 py-3 sm:flex-row">
            <div className="flex items-center gap-1">
              {["1", "2", "3", "4"].map((p, i) => (
                <button
                  key={p}
                  className={`mx-0.5 h-8 min-w-[32px] rounded-md border text-sm ${
                    i === 0 ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              <span className="mr-1">Show per page:</span>
              <button className="inline-flex h-8 min-w-[40px] items-center justify-center rounded-md border border-gray-200 px-2">
                4
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
