import { ArrowUpRight } from "lucide-react";

type MetricCardProps = {
  icon: React.ElementType;
  value: string;
  label: string;
  bg: string;
  iconClass: string;
  up?: boolean;
};

export function MetricCard({ icon: Icon, value, label, bg, iconClass, up = true }: MetricCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className={`rounded-lg p-2 ${bg}`}>
        <Icon className={iconClass} />
      </div>
      <div>
        <div className="text-lg font-semibold leading-none text-slate-900">{value}</div>
        <div className="text-xs text-slate-700">{label}</div>
      </div>
      <ArrowUpRight className={`ml-auto h-4 w-4 ${up ? "text-emerald-600" : "text-rose-600 rotate-90"}`} />
    </div>
  );
}
