import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { UserRow } from "@/app/lib/data";

export function StatusPill({ status }: { status: UserRow["status"] }) {
  const map: Record<
    UserRow["status"],
    { cls: string; icon: React.ReactElement; text: string }
  > = {
    success: { cls: "bg-emerald-50 text-emerald-700", icon: <CheckCircle2 className="h-3.5 w-3.5" />, text: "Success" },
    pending: { cls: "bg-amber-50 text-amber-700", icon: <Clock3 className="h-3.5 w-3.5" />, text: "Pending" },
    denied: { cls: "bg-rose-50 text-rose-700", icon: <XCircle className="h-3.5 w-3.5" />, text: "Denied" },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs ${s.cls}`}>
      {s.icon}
      {s.text}
    </span>
  );
}
