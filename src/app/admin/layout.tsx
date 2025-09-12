// src/app/admin/layout.tsx
import type { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed left rail */}
      <Sidebar />

      {/* Content area shifted right by rail width */}
      <div className="ml-20 min-h-screen">
        {/* Sticky top bar */}
        <div className="sticky top-0 z-30">
          <Topbar />
        </div>

        {/* Page content below topbar */}
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
