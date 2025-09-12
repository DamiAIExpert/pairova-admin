"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  DEFAULT_PAGE_CONFIG,
  PAGE_ROWS,
  type PageConfig,
  type PageKey,
} from "../_data";

const STORAGE_PREFIX = "fe:pages:";

/** Load from localStorage (mock persistence) or fall back to defaults */
function loadConfig(slug: PageKey): PageConfig {
  if (typeof window === "undefined") return DEFAULT_PAGE_CONFIG[slug];
  const raw = localStorage.getItem(STORAGE_PREFIX + slug);
  return raw ? (JSON.parse(raw) as PageConfig) : DEFAULT_PAGE_CONFIG[slug];
}

export default function FrontendPageEditor() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();

  // normalize slug and validate against known keys
  const slug = (Array.isArray(params.slug) ? params.slug[0] : params.slug) as
    | PageKey
    | undefined;

  const allKeys = Object.keys(DEFAULT_PAGE_CONFIG) as PageKey[];
  const isValid = !!slug && allKeys.includes(slug);
  const fallback: PageKey = (allKeys[0] ?? "landing-page") as PageKey;

  const [cfg, setCfg] = React.useState<PageConfig>(() =>
    loadConfig(isValid ? (slug as PageKey) : fallback)
  );

  // meta for breadcrumb title
  const rowMeta = PAGE_ROWS.find((r) => r.slug === slug);

  // refresh form when slug changes
  React.useEffect(() => {
    if (!slug || !isValid) return;
    setCfg(loadConfig(slug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (!isValid) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        Page not found.&nbsp;
        <button
          className="underline"
          onClick={() => router.push("/admin/settings/frontend/pages")}
        >
          Go back
        </button>
      </div>
    );
  }

  const save = () => {
    localStorage.setItem(STORAGE_PREFIX + slug, JSON.stringify(cfg));
    alert("Saved (mock). Replace with your API call when ready.");
  };

  const onChange = <K extends keyof PageConfig>(key: K, val: PageConfig[K]) =>
    setCfg((s) => ({ ...s, [key]: val }));

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <Link href="/admin/settings" className="hover:underline">
          Settings
        </Link>
        <span className="mx-1">/</span>
        <Link href="/admin/settings/frontend/pages" className="hover:underline">
          Frontend Pages
        </Link>
        <span className="mx-1">/</span>
        <span className="text-gray-900">
          {rowMeta?.name ?? cfg.displayName}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT: Form */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basics */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="mb-4 text-sm font-semibold text-gray-900">
              Basics
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1 block text-gray-600">Display Name</span>
                <input
                  className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm"
                  value={cfg.displayName}
                  onChange={(e) => onChange("displayName", e.target.value)}
                />
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-gray-600">URL</span>
                <input
                  className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm"
                  value={cfg.url}
                  onChange={(e) => onChange("url", e.target.value)}
                />
              </label>

              <label className="col-span-full inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={cfg.published}
                  onChange={(e) => onChange("published", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-gray-700">Published</span>
              </label>
            </div>
          </div>

          {/* Hero */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="mb-4 text-sm font-semibold text-gray-900">Hero</div>
            <div className="grid gap-3">
              <label className="text-sm">
                <span className="mb-1 block text-gray-600">Title</span>
                <input
                  className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm"
                  value={cfg.hero.title}
                  onChange={(e) =>
                    onChange("hero", { ...cfg.hero, title: e.target.value })
                  }
                />
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-gray-600">Subtitle</span>
                <input
                  className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm"
                  value={cfg.hero.subtitle}
                  onChange={(e) =>
                    onChange("hero", { ...cfg.hero, subtitle: e.target.value })
                  }
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-sm">
                  <span className="mb-1 block text-gray-600">CTA Label</span>
                  <input
                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm"
                    value={cfg.hero.ctaLabel}
                    onChange={(e) =>
                      onChange("hero", {
                        ...cfg.hero,
                        ctaLabel: e.target.value,
                      })
                    }
                  />
                </label>

                <label className="text-sm">
                  <span className="mb-1 block text-gray-600">CTA Href</span>
                  <input
                    className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm"
                    value={cfg.hero.ctaHref}
                    onChange={(e) =>
                      onChange("hero", { ...cfg.hero, ctaHref: e.target.value })
                    }
                  />
                </label>
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="mb-4 text-sm font-semibold text-gray-900">SEO</div>
            <div className="grid gap-3">
              <label className="text-sm">
                <span className="mb-1 block text-gray-600">Title</span>
                <input
                  className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm"
                  value={cfg.seo.title}
                  onChange={(e) =>
                    onChange("seo", { ...cfg.seo, title: e.target.value })
                  }
                />
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-gray-600">Description</span>
                <textarea
                  className="min-h-[84px] w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                  value={cfg.seo.description}
                  onChange={(e) =>
                    onChange("seo", {
                      ...cfg.seo,
                      description: e.target.value,
                    })
                  }
                />
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-gray-600">
                  Keywords (comma separated)
                </span>
                <input
                  className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm"
                  value={cfg.seo.keywords}
                  onChange={(e) =>
                    onChange("seo", { ...cfg.seo, keywords: e.target.value })
                  }
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setCfg(loadConfig(slug))}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={save}
              className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black"
            >
              Save changes
            </button>
          </div>
        </div>

        {/* RIGHT: Meta / Preview */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 text-sm">
            <div className="mb-2 font-semibold text-gray-900">Meta</div>
            <div className="text-gray-700">
              <div>
                <span className="text-gray-500">Slug:</span> {cfg.slug}
              </div>
              <div>
                <span className="text-gray-500">URL:</span> {cfg.url}
              </div>
              <div>
                <span className="text-gray-500">Published:</span>{" "}
                {cfg.published ? "Yes" : "No"}
              </div>
            </div>
            <a
              href={cfg.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
            >
              Preview
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
