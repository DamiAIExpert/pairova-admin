// src/components/Sidebar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LuPower } from "react-icons/lu";

interface NavLink {
  href: string;
  iconSrc: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/admin/dashboard", iconSrc: "/sidebar-icons/dashboard.svg", label: "Dashboard" },
  { href: "/admin/job-seekers", iconSrc: "/sidebar-icons/candidate.svg", label: "Job seekers" },
  { href: "/admin/ngos", iconSrc: "/sidebar-icons/ngo.svg", label: "Non Profits" },
  { href: "/admin/settings", iconSrc: "/sidebar-icons/settings.svg", label: "Settings" },
  { href: "/admin/track", iconSrc: "/sidebar-icons/track.svg", label: "Track" }, // new item
];

export default function Sidebar() {
  const pathname = usePathname() || "";
  const router = useRouter();

  const handleLogout = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth");
        sessionStorage.clear();
      }
    } finally {
      router.push("/admin/login");
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-20 border-r border-gray-200 bg-white flex flex-col items-center py-6">
      {/* Nav (icons only, with tooltips) */}
      <nav className="flex-1 flex flex-col items-center gap-3 pt-6">
        {navLinks.map(({ href, iconSrc, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className={[
                "group relative w-12 h-12 flex items-center justify-center rounded-lg transition-colors duration-200",
                isActive ? "bg-black text-white shadow-sm" : "text-gray-500 hover:bg-gray-100",
              ].join(" ")}
            >
              <Image
                src={iconSrc}
                alt={label}
                width={22}
                height={22}
                className={isActive ? "filter invert" : ""}
                priority={false}
              />
              {/* Tooltip */}
              <span className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        title="Log out"
        aria-label="Log out"
        className="mt-auto w-12 h-12 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition-colors"
      >
        <LuPower className="h-6 w-6" />
      </button>
    </aside>
  );
}
