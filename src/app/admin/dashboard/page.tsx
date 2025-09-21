'use client';

import { useEffect, useState } from 'react';
import StatCards from "@/components/dashboard/StatCards";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import NonProfitList from "@/components/dashboard/NonProfitList";
import UsersTable from "@/components/dashboard/UsersTable";
import RightSidebar from "@/components/dashboard/RightSidebar";
import { AdminService } from '@/lib/services/admin.service';
import { useApi } from '@/hooks/useApi';
import { DashboardStats, PerformanceMetrics, ActivityFeed, Recommendations } from '@/lib/services/admin.service';

export default function AdminDashboardPage() {
  // Fetch dashboard data using custom hooks
  const { 
    data: dashboardStats, 
    loading: statsLoading, 
    error: statsError,
    refetch: refetchStats 
  } = useApi<DashboardStats>(
    () => AdminService.getDashboardStats(),
    [],
    { immediate: true }
  );

  const { 
    data: performanceMetrics, 
    loading: performanceLoading, 
    error: performanceError 
  } = useApi<PerformanceMetrics>(
    () => AdminService.getPerformanceMetrics('30d'),
    [],
    { immediate: true }
  );

  const { 
    data: activityFeed, 
    loading: activityLoading, 
    error: activityError 
  } = useApi<ActivityFeed>(
    () => AdminService.getActivityFeed(10),
    [],
    { immediate: true }
  );

  const { 
    data: recommendations, 
    loading: recommendationsLoading, 
    error: recommendationsError 
  } = useApi<Recommendations>(
    () => AdminService.getRecommendations(),
    [],
    { immediate: true }
  );

  // Show loading state
  if (statsLoading || performanceLoading || activityLoading || recommendationsLoading) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (statsError || performanceError || activityError || recommendationsError) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Error</h2>
          <p className="text-gray-600 mb-4">
            {statsError || performanceError || activityError || recommendationsError}
          </p>
          <button 
            onClick={refetchStats}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-6 font-poppins antialiased [text-rendering:optimizeLegibility]">
            <main className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
                {/* Main Content */}
                <section className="space-y-6">
                    <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
                    <StatCards stats={dashboardStats} />
                    <div className="grid gap-6 xl:grid-cols-3">
                        <PerformanceChart metrics={performanceMetrics} />
                        <NonProfitList />
                    </div>
                    <UsersTable />
                </section>

                {/* Right Sidebar */}
                <RightSidebar 
                  activities={activityFeed?.activities || []} 
                  recommendations={recommendations?.recommendations || []}
                />
            </main>
        </div>
    </div>
  );
}

