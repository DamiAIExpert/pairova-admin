//src/app/landing-page/page.tsx
"use client";

import React from "react";
import type { PageConfig, PageKey } from "../admin/settings/frontend/pages/_data";
import { DEFAULT_PAGE_CONFIG } from "../admin/settings/frontend/pages/_data";

const SLUG: PageKey = "landing-page";
const STORAGE_PREFIX = "fe:pages:";

function usePageConfig(slug: PageKey) {
  const [cfg, setCfg] = React.useState<PageConfig>(DEFAULT_PAGE_CONFIG[slug]);
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + slug);
      if (raw) setCfg(JSON.parse(raw) as PageConfig);
    } catch {}
  }, [slug]);
  return cfg;
}

export default function LandingPagePreview() {
  const cfg = usePageConfig(SLUG);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Hero */}
      <section className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-semibold text-gray-900">{cfg.hero.title}</h1>
        <p className="mt-2 text-gray-600">{cfg.hero.subtitle}</p>

        {cfg.hero.ctaLabel && cfg.hero.ctaHref && (
          <a
            href={cfg.hero.ctaHref}
            className="mt-6 inline-block rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-black"
          >
            {cfg.hero.ctaLabel}
          </a>
        )}
      </section>

      {/* Quick meta preview */}
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border p-4">
          <div className="text-sm text-gray-500">Display Name</div>
          <div className="font-medium text-gray-900">{cfg.displayName}</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-sm text-gray-500">URL</div>
          <div className="font-medium text-gray-900">{cfg.url}</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-sm text-gray-500">Published</div>
          <div className="font-medium text-gray-900">{cfg.published ? "Yes" : "No"}</div>
        </div>
      </section>
    </main>
  );
}
