//src/app/help-center/page.tsx
"use client";

import React from "react";
import type { PageConfig, PageKey } from "../admin/settings/frontend/pages/_data";
import { DEFAULT_PAGE_CONFIG } from "../admin/settings/frontend/pages/_data";

const SLUG: PageKey = "help-center";
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

export default function HelpCenterPreview() {
  const cfg = usePageConfig(SLUG);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-gray-900">{cfg.hero.title}</h1>
        <p className="mt-2 text-gray-600">{cfg.hero.subtitle}</p>
      </section>
    </main>
  );
}
