import { Users, Handshake, MousePointerClick, MessageSquare, ThumbsUp } from "lucide-react";

/* ----------------------------- CHART DATA ----------------------------- */
export interface ChartDatum {
  name: string;
  value: number;
}

const performance2024: ChartDatum[] = [
  { name: "Jan", value: 1500 }, { name: "Feb", value: 1800 },
  { name: "Mar", value: 2250 }, { name: "Apr", value: 2100 },
  { name: "May", value: 2300 }, { name: "Jun", value: 2200 },
  { name: "Jul", value: 2500 }, { name: "Aug", value: 2600 },
  { name: "Sep", value: 2800 }, { name: "Oct", value: 2700 },
  { name: "Nov", value: 2850 }, { name: "Dec", value: 2900 },
];

const performance2022: ChartDatum[] = [
  { name: "Jan", value: 900 }, { name: "Feb", value: 1100 },
  { name: "Mar", value: 1500 }, { name: "Apr", value: 1400 },
  { name: "May", value: 1750 }, { name: "Jun", value: 1600 },
  { name: "Jul", value: 1850 }, { name: "Aug", value: 1900 },
  { name: "Sep", value: 2000 }, { name: "Oct", value: 1950 },
  { name: "Nov", value: 2050 }, { name: "Dec", value: 2100 },
];

export const performanceByYear: Record<number, ChartDatum[]> = {
  2024: performance2024,
  2022: performance2022,
};

/* ----------------------------- USERS DATA ----------------------------- */
export type UserRow = {
  id: string;
  name: string;
  avatar: string;
  applicationDate: string;
  matchscore: string;
  status: "success" | "pending" | "denied";
};

export const usersData: UserRow[] = [
  { id: "u1", name: "Stella Akanbi", avatar: "https://i.pravatar.cc/64?img=48", applicationDate: "30 September 2025", matchscore: "75%", status: "success" },
  { id: "u2", name: "Philip Michael", avatar: "https://i.pravatar.cc/64?img=12", applicationDate: "28 September 2025", matchscore: "85%", status: "pending" },
  { id: "u3", name: "John Doe", avatar: "https://i.pravatar.cc/64?img=32", applicationDate: "25 September 2025", matchscore: "65%", status: "denied" },
];

/* ----------------------------- NON-PROFITS DATA ----------------------------- */
export type NonProfit = { name: string; type: string; city: string; logo: string };

export const nonprofits: NonProfit[] = [
  { name: "Tachevoxan", type: "Private Company", city: "Abuja", logo: "/admin-ngo/Fable logo 1.png" },
  { name: "Saclose", type: "Private Company", city: "Abuja", logo: "/admin-ngo/NYT Cooking logo 1.png" },
  { name: "Magnitode", type: "Private Company", city: "Abuja", logo: "/admin-ngo/SiriusXM logo 1.png" },
  { name: "Ted", type: "Private Company", city: "Abuja", logo: "/admin-ngo/Fable logo 1.png" },
  { name: "Tanish", type: "Private Company", city: "Abuja", logo: "/admin-ngo/NYT Cooking logo 1.png" },
];

/* ----------------------------- METRICS DATA ----------------------------- */
export const metrics = [
    { icon: Users, value: "19k", label: "Users", bg: "bg-pink-100", iconClass: "h-5 w-5 text-pink-600", up: true },
    { icon: Handshake, value: "2.5k", label: "Match", bg: "bg-orange-100", iconClass: "h-5 w-5 text-orange-600", up: true },
    { icon: MessageSquare, value: "19k", label: "Posts", bg: "bg-blue-100", iconClass: "h-5 w-5 text-blue-600", up: false },
    { icon: MousePointerClick, value: "100k", label: "Clicks", bg: "bg-purple-100", iconClass: "h-5 w-5 text-purple-600", up: true },
];

/* ----------------------------- ACTIVITY LOG DATA ----------------------------- */
export const activityLog = [
    { id: "a1", who: "Michael Cole", avatar: "https://i.pravatar.cc/64?img=5", action: "Account suspended", ago: "2hrs ago" },
    { id: "a2", who: "tommy.co", avatar: "https://i.pravatar.cc/64?img=22", action: "Enabled authentication", ago: "4hrs ago" },
    { id: "a3", who: "Stella Akanbi", avatar: "https://i.pravatar.cc/64?img=48", action: "Account suspended", ago: "9hrs ago" },
];
