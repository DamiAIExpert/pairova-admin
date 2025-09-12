import { ThumbsUp, XCircle } from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";
import { metrics, activityLog } from "../../app/lib/data";

function FeedbackCard() {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-1 flex items-center gap-3">
                <div className="rounded-lg bg-emerald-100 p-2">
                    <ThumbsUp className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="text-base font-semibold text-slate-900">Feedbacks</div>
            </div>
            <div className="text-lg font-semibold text-slate-900">
                200+ <span className="text-sm font-normal text-slate-700">positive</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                <div className="h-full w-4/5 rounded-full bg-emerald-500" />
            </div>
        </div>
    );
}

function CalendarCard() {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 text-center text-sm font-semibold text-slate-900">Sep 2025</div>
            <div className="grid grid-cols-7 gap-y-2 text-center text-xs text-slate-700">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <span key={d}>{d}</span>)}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-y-2 text-center text-sm text-slate-900">
                <div />
                {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                    <div key={d} className={`py-1 ${d === 12 ? "rounded-full bg-slate-900 text-white" : ""}`}>
                        {d}
                    </div>
                ))}
            </div>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-rose-100 py-2 text-sm font-semibold text-rose-700">
                <XCircle className="h-4 w-4" /> 1 Issue
            </button>
        </div>
    );
}

function ActivityLogCard() {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-900">Activity Log</div>
                <button className="text-xs text-slate-700 hover:underline">View all</button>
            </div>
            <ul className="space-y-3">
                {activityLog.map((i) => (
                    <li key={i.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Replaced Next.js Image with standard img tag to resolve compilation error */}
                            <img src={i.avatar} alt={`${i.who} avatar`} width={28} height={28} className="rounded-full object-cover" />
                            <div className="leading-tight">
                                <div className="text-sm font-medium text-slate-900">{i.who}</div>
                                <div className="text-xs text-slate-700">{i.action}</div>
                            </div>
                        </div>
                        <span className="text-xs text-slate-700">{i.ago}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default function RightSidebar() {
    return (
        <aside className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                {metrics.map(m => <MetricCard key={m.label} {...m} />)}
            </div>
            <FeedbackCard />
            <CalendarCard />
            <ActivityLogCard />
        </aside>
    );
}

