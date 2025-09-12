# Pairova Admin & Candidate Portal

A modern, full‑stack **Next.js (App Router)** project that powers the Pairova admin and candidate experience. It includes job‑seeker management, NGO job applicant pipelines, candidate profiles, applied‑jobs views, feedback moderation, and an audit log — all built with **TypeScript**, **Tailwind CSS**, and **Lucide** icons.

> This repository was bootstrapped with `create-next-app` and upgraded with opinionated structure & UI utilities for a smooth developer experience.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Scripts](#scripts)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Routes & Flows](#key-routes--flows)
- [Styling & Fonts](#styling--fonts)
- [Environment Variables](#environment-variables)
- [Data & API Notes](#data--api-notes)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Quick Start

1. **Install dependencies**

   ```bash
   npm i
   # or
   pnpm i
   # or
   yarn
   # or
   bun i
   ```

2. **Run the dev server**

   ```bash
   npm run dev
   # http://localhost:3000
   ```

3. **Open the app** at <http://localhost:3000>. The page auto‑updates as you edit files in `src/app`.

> Requires **Node.js 18+** (or 20+ recommended).

---

## Scripts

| Script           | Description                                   |
|------------------|-----------------------------------------------|
| `dev`            | Run the Next.js development server            |
| `build`          | Create an optimized production build          |
| `start`          | Start the production server (`.next/standalone`) |
| `lint`           | Run ESLint                                    |
| `typecheck`      | Run TypeScript type checks                    |

---

## Tech Stack

- **Next.js 14+ (App Router)** – file‑system routing, server actions
- **TypeScript** – types & safer refactors
- **Tailwind CSS** – utility‑first styling
- **Lucide React** – icons
- **next/font** – automatic font optimization
- **Vercel** (optional) – zero‑config deploys

---

## Project Structure

> Only high‑value folders/files are shown.

```
src/
  app/
    layout.tsx
    page.tsx
    admin/
      job-seekers/
        page.tsx                               # Candidates table with actions
        [candidateId]/
          page.tsx                             # Candidate profile (admin view)
          edit/
            page.tsx                           # Edit candidate (admin)
          applied/
            page.tsx                           # Candidate → Applied Jobs (admin)
      ngos/
        [id]/jobs/[jobId]/
          applicants/
            page.tsx                           # Pipeline board: Applied/Review/Interview/Hiring
            [applicantId]/
              page.tsx                         # Applicant detail (model representation)
    settings/
      feedback/
        page.tsx                               # Feedback moderation + slide‑over
      audit-log/
        page.tsx                               # Admin audit trail
  styles/
    globals.css
    fonts.css                                  # @font-face declarations (Poppins)
public/
  font/                                        # Local font files (.ttf)
  favicon.ico
```

---

## Key Routes & Flows

### Admin → Job Seekers
- **List**: `/admin/job-seekers`  
  - 3‑dot menu includes: **View**, **Edit**, **Delete**, **Applied Jobs**.
  - **Applied Jobs** correctly routes to:  
    `/admin/job-seekers/[candidateId]/applied`

- **Profile**: `/admin/job-seekers/[candidateId]`  
- **Edit**: `/admin/job-seekers/[candidateId]/edit`  
- **Applied Jobs**: `/admin/job-seekers/[candidateId]/applied`

### Admin → NGO → Job Applicants
- **Board**: `/admin/ngos/[id]/jobs/[jobId]/applicants`  
  Columns: *Applied Job*, *UnderReview*, *Interview*, *Hiring Job*.
- **Applicant Detail** (exact design match):  
  `/admin/ngos/[id]/jobs/[jobId]/applicants/[applicantId]`

### Settings
- **Feedback**: `/settings/feedback` – filterable table, slide‑over editing (Status / Priority / Category) with live updates.
- **Audit Log**: `/settings/audit-log` – filterable/sortable admin activity log.

---

## Styling & Fonts

- Styling is done with **Tailwind**. Update tokens in `tailwind.config.js`.
- Fonts use `@font-face` via `src/styles/fonts.css` and **local** `.ttf` files.

**Important paths**

- Font files are located at:  
  `public/font/Poppins-*.ttf`
- CSS expects either `/font/...` or `/fonts/...` depending on your setup.  
  If you see network 404s such as:

  ```txt
  GET /fonts/Poppins-Regular.ttf 404
  ```

  you have two options:

  1. **Rename the folder** to `public/fonts` **(preferred)**, or
  2. **Update `fonts.css`** to use `/font/...` (singular) to match your folder.

Example `fonts.css` snippet:

```css
@font-face {
  font-family: 'Poppins';
  src: url('/font/Poppins-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

> Then import `fonts.css` once (e.g., in `src/app/layout.tsx` or `globals.css`).

---

## Environment Variables

This project runs without secrets by default. If you introduce APIs, add a `.env.local` like:

```ini
NEXT_PUBLIC_API_BASE=https://api.example.com
# SERVER_ONLY_SECRET=...
```

Never commit secrets; use `.env.local` for local dev and your platform’s secret manager in prod.

---

## Data & API Notes

Many admin pages currently use **mock data** (arrays within the components) to match the final UI/UX. To wire to a backend:

- Replace the mock arrays with `fetch`/`axios` calls (Server Components preferred where possible).
- Add loading and empty states.
- Preserve the existing props/interfaces to keep UI stable.
- For slide‑overs (e.g., Feedback), call your API on change and optimistically update local state.

---

## Deployment

### Vercel (recommended)
- Push to GitHub and import the repo on Vercel.
- Framework preset: **Next.js**.
- Environment variables: add any from `.env.local`.

### Node / Docker
- Build: `npm run build`
- Start: `npm run start` (serves `.next/standalone` if configured)

---

## Troubleshooting

### Font 404s
- **Symptom**: `GET /fonts/Poppins-*.ttf 404`
- **Fix**: Ensure your folder is **`public/fonts/`** *or* update `fonts.css` to match `public/font/`.

### Images 404
- Use Next’s static `public/` directory (e.g., `/logo.svg`) or configure `next.config.js` for remote domains.

### Type errors
- Run `npm run typecheck` to see TS diagnostics.

---

## Contributing

1. Fork the repo & create a feature branch.
2. Keep PRs focused and include screenshots for UI changes.
3. Add/adjust tests where relevant.

---

## License

Copyright © Pairova. All rights reserved.  
If you need a specific OSS license (MIT/Apache-2.0), add it here and in a `LICENSE` file.
