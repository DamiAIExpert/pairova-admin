import StatCards from "@/components/dashboard/StatCards";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import NonProfitList from "@/components/dashboard/NonProfitList";
import UsersTable from "@/components/dashboard/UsersTable";
import RightSidebar from "@/components/dashboard/RightSidebar";

export default function AdminDashboardPage() {
  return (
    <div className="bg-slate-50">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-6 font-poppins antialiased [text-rendering:optimizeLegibility]">
            <main className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
                {/* Main Content */}
                <section className="space-y-6">
                    <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
                    <StatCards />
                    <div className="grid gap-6 xl:grid-cols-3">
                        <PerformanceChart />
                        <NonProfitList />
                    </div>
                    <UsersTable />
                </section>

                {/* Right Sidebar */}
                <RightSidebar />
            </main>
        </div>
    </div>
  );
}

