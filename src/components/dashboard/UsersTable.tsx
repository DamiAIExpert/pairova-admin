"use client";
import React from "react";
import Image from "next/image";
import { Search, MoreVertical } from "lucide-react";
import { usersData } from "../../app/lib/data";
import { StatusPill } from "../ui/StatusPill";

export default function UsersTable() {
    const [query, setQuery] = React.useState("");
    const filteredUsers = usersData.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b p-4">
                <div className="text-sm font-semibold text-slate-900">Users</div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <input
                            value={query}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                            placeholder="Search users…"
                            className="h-9 w-56 rounded-md border border-slate-200 pl-8 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-slate-200"
                        />
                    </div>
                    <button className="rounded-md border border-slate-200 p-2 hover:bg-slate-50" aria-label="more">
                        <MoreVertical className="h-4 w-4 text-slate-700" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-50 text-left text-slate-700">
                        <tr>
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Application Date</th>
                            <th className="p-4 font-medium">Matchscore</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4" />
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((u) => (
                            <tr key={u.id} className="border-t">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <Image src={u.avatar} alt={u.name} width={28} height={28} className="rounded-full object-cover" unoptimized />
                                        <span className="font-medium text-slate-900">{u.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-slate-700">{u.applicationDate}</td>
                                <td className="p-4 text-slate-700">{u.matchscore}</td>
                                <td className="p-4"><StatusPill status={u.status} /></td>
                                <td className="p-4 text-right text-slate-600">⋮</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
