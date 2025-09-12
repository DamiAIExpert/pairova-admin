import Image from "next/image";
import { nonprofits } from "@/app/lib/data";

export default function NonProfitList() {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div className="text-xl font-bold text-slate-900">Non Profit</div>
                <button className="text-xs text-slate-700 hover:underline">View all</button>
            </div>
            <div className="space-y-0">
                {nonprofits.map((n, index) => (
                    <div key={n.name} className={`flex items-center justify-between py-3 ${index !== nonprofits.length - 1 ? 'border-b border-slate-100' : ''}`}>
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 overflow-hidden rounded-lg bg-white ring-1 ring-slate-200">
                                <Image 
                                    src={n.logo} 
                                    alt={`${n.name} logo`} 
                                    width={32} 
                                    height={32} 
                                    className="h-8 w-8 object-contain" 
                                    unoptimized 
                                />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-slate-900">{n.name}</div>
                                <div className="text-xs text-slate-700">
                                    {n.type} <span className="mx-1">|</span> {n.city}
                                </div>
                            </div>
                        </div>
                        <span className="text-xs text-slate-700">Just now</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
