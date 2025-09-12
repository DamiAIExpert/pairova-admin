import { TrendBadge } from "../ui/TrendBadge";

type StatCardProps = {
  iconSrc: string;
  count: string | number;
  title: string;
  subtitle?: string;
  accent?: string;
  delta?: string;
};

function StatCard({
  iconSrc,
  count,
  title,
  subtitle,
  accent = "bg-slate-100",
  delta = "7%",
}: StatCardProps) {
  return (
    <div className="h-full rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${accent}`}
        >
          {/* img (not next/image) to avoid build warnings and keep it simple) */}
          <img
            src={iconSrc}
            alt={title}
            width={28}
            height={28}
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Top row: number + trend badge share a baseline */}
          <div className="flex items-baseline gap-2">
            <div className="text-xl font-semibold leading-none text-slate-900">
              {count}
            </div>
            <TrendBadge value={delta} />
          </div>

          {/* Title (can wrap to 2 lines without affecting the badge alignment) */}
          <div className="mt-2 text-xs leading-snug text-slate-700">{title}</div>
          {subtitle && (
            <div className="mt-1 text-xs text-slate-500">{subtitle}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        iconSrc="/admin-stats/applicant.svg"
        count="560"
        title="Applicants"
        subtitle="Total Applicants this month"
        accent="bg-slate-100"
      />
      <StatCard
        iconSrc="/admin-stats/ngo.svg"
        count="560"
        title="Non Profit"
        subtitle="Total Non Profit this month"
        accent="bg-orange-50"
      />
      <StatCard
        iconSrc="/admin-stats/job-seeker.svg"
        count="560"
        title="Job Seekers"
        subtitle="Total Employee this month"
        accent="bg-blue-50"
      />

      {/* Report card (border removed) */}
      <div className="h-full rounded-2xl bg-white p-5 shadow-sm">
        <div className="text-xs text-slate-600">Report</div>
        <div className="my-1 text-lg font-semibold text-slate-900">
          Over 100,000 Users
        </div>
        <div className="text-xs text-slate-600">
          A major milestone over the last month with 15% increase
        </div>
      </div>
    </div>
  );
}
