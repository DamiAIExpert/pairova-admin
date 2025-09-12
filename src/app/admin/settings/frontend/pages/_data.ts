// Shared data + types for Frontend Settings (Pages)

export type Row = {
  id: string;
  name: string;
  url: string;   // public URL to preview
  updated: string;
  slug: string;  // folder/route segment under /pages/*
};

// ⚠️ These rows drive the table AND the valid [slug] routes
export const PAGE_ROWS: Row[] = [
  {
    id: "about",
    name: "About Page",
    url: "/landing-page",
    updated: "30 September 2025",
    slug: "landing-page",
  },
  {
    id: "services",
    name: "Services Page",
    url: "/services",
    updated: "30 September 2025",
    slug: "services",
  },
  {
    id: "help",
    name: "Help Center",
    url: "/help-center",
    updated: "30 September 2025",
    slug: "help-center",
  },
  {
    id: "privacy",
    name: "Privacy Policy",
    url: "/privacy-policy",
    updated: "30 September 2025",
    slug: "privacy-policy",
  },
];

// Slug union type derived from rows (keeps types in sync)
export type PageKey = (typeof PAGE_ROWS)[number]["slug"];

export type PageConfig = {
  slug: PageKey;
  displayName: string;
  url: string;
  published: boolean;
  hero: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string; // comma-separated
  };
};

// Helper to make a sane default per page
function makeDefaults(row: Row): PageConfig {
  return {
    slug: row.slug as PageKey,
    displayName: row.name,
    url: row.url,
    published: true,
    hero: {
      title: row.name,
      subtitle:
        "Edit this copy in Admin → Settings → Frontend → Pages → “" +
        row.name +
        "”.",
      ctaLabel: "Learn more",
      ctaHref: row.url,
    },
    seo: {
      title: row.name + " • Pairova",
      description:
        row.name +
        " page for Pairova. Update SEO title & description from the editor.",
      keywords: "pairova," + row.slug.replace("-", " "),
    },
  };
}

// Default configuration for each page (used by the editor + localStorage fallback)
export const DEFAULT_PAGE_CONFIG: Record<PageKey, PageConfig> = PAGE_ROWS.reduce(
  (acc, row) => {
    acc[row.slug as PageKey] = makeDefaults(row);
    return acc;
  },
  {} as Record<PageKey, PageConfig>
);
