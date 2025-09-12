"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle, Cell } from "recharts";
import { ChevronDown } from "lucide-react";
import { performanceByYear, ChartDatum } from "@/app/lib/data";

// A simple year select component - can be moved to ui/ if needed elsewhere
function YearSelect({ years, value, onChange, size = "md" }: {
    years: number[];
    value: number;
    onChange: (year: number) => void;
    size?: "sm" | "md";
}) {
    const sizeMap = { sm: "h-8 text-xs px-2", md: "h-9 text-sm px-3" };
    return (
        <select
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            className={`rounded-md border border-slate-200 bg-white pr-8 text-slate-900 outline-none focus:ring-2 focus:ring-slate-200 ${sizeMap[size]}`}
        >
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
    );
}


// Tooltip for chart
type TooltipPayloadItem = { value?: number };
type TooltipLike = { active?: boolean; label?: string | number; payload?: TooltipPayloadItem[] };

function CustomTooltip(props: TooltipLike) {
  if (!props.active || !props.payload?.length) return null;
  const value = props.payload[0]?.value ?? "-";
  return (
    <div className="rounded-md bg-slate-900 px-3 py-2 text-xs text-white shadow-lg">
      <div className="font-semibold">{props.label}</div>
      <div>Value: {value}</div>
    </div>
  );
}

export default function PerformanceChart() {
    const [activeBar, setActiveBar] = React.useState<string | null>(null);
    const [year, setYear] = React.useState<number>(2024);
    const chartData = performanceByYear[year] ?? performanceByYear[2024];

    const handleMouseMove = (s: unknown) => {
        const state = s as { isTooltipActive?: boolean; activeLabel?: string };
        if (state?.isTooltipActive) {
            setActiveBar(state.activeLabel ?? null);
        } else {
            setActiveBar(null);
        }
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <div className="text-sm font-semibold text-slate-900">Performance</div>
                    <div className="text-xs text-slate-700">User engagements</div>
                </div>
                <div className="flex items-center gap-2">
                    <YearSelect years={[2024, 2022]} value={year} onChange={setYear} size="sm" />
                    <button className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-slate-800 hover:bg-slate-50">
                        User Engagements <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barSize={12} onMouseMove={handleMouseMove} onMouseLeave={() => setActiveBar(null)}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#334155" }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#334155" }} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                        <Bar dataKey="value" shape={<Rectangle radius={6} />}>
                            {chartData.map((d) => (
                                <Cell key={d.name} fill={activeBar === d.name ? "#0f172a" : "#e2e8f0"} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
