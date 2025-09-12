"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MoreHorizontal } from "lucide-react";

/**
 * Tab component for navigation
 */
function Tab({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center rounded-full px-3 py-1.5 text-sm",
        active
          ? "bg-gray-900 font-medium text-white"
          : "border border-gray-200 bg-white text-gray-800 hover:bg-gray-50",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

/**
 * NGO detail layout
 * - Wraps all routes under /admin/ngos/[id]
 * - Renders a sticky header with back button, org avatar, name placeholder and tabs
 */
export default function NgoLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract id from pathname since params is now async
  const pathSegments = pathname.split('/');
  const id = pathSegments[pathSegments.indexOf('ngos') + 1];

  // Determine which tab should be active
  const isOverview = pathname === `/admin/ngos/${id}`;
  const isEdit = pathname === `/admin/ngos/${id}/edit`;
  const isJobs = pathname.startsWith(`/admin/ngos/${id}/jobs`);

  return (
    <div className="mx-auto max-w-[1100px] px-6 pb-16">
      {/* Sticky header for NGO context */}
      <div className="sticky top-0 z-30 -mx-6 mb-6 border-b border-gray-200 bg-white/90 px-6 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/ngos")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
              aria-label="Back to NGOs"
              title="Back to NGOs"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            {/* Brand block */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-gray-200">
                <Image
                  src="/logo.svg"
                  alt="NGO Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  Organization #{id}
                </div>
                <div className="text-xs text-gray-600">Non Profit • Detail</div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
            aria-label="More actions"
            title="More"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Section tabs */}
        <div className="mt-3 flex items-center gap-2">
          <Tab href={`/admin/ngos/${id}`} active={isOverview}>
            Overview
          </Tab>
          <Tab href={`/admin/ngos/${id}/edit`} active={isEdit}>
            Edit
          </Tab>
          <Tab href={`/admin/ngos/${id}/jobs`} active={isJobs}>
            Jobs
          </Tab>
        </div>
      </div>

      {/* Routed page content */}
      {children}
    </div>
  );
}