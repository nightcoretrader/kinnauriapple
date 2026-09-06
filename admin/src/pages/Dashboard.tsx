import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import type { Booking, DashboardSummary, PackSizeBreakdown, Paginated, TimeseriesPoint } from "../lib/types";
import { PACK_SIZE_LABEL, STATUS_LABEL } from "../lib/types";
import { api } from "../lib/api";

const COLORS = ["#B5282D", "#5C7A4A", "#D89A3E", "#6B5A4E"];

export function DashboardPage() {
  const summary = useQuery({ queryKey: ["summary"], queryFn: () => api<DashboardSummary>("/api/dashboard/summary") });
  const series = useQuery({ queryKey: ["timeseries"], queryFn: () => api<TimeseriesPoint[]>("/api/dashboard/timeseries?days=30") });
  const packs = useQuery({ queryKey: ["packs"], queryFn: () => api<PackSizeBreakdown[]>("/api/dashboard/pack-size-breakdown") });
  const recent = useQuery({ queryKey: ["recent"], queryFn: () => api<Paginated<Booking>>("/api/bookings?page=1&pageSize=10") });
  if (summary.isError) return <p className="text-primary">Could not load dashboard.</p>;
  const s = summary.data;
  return (
    <div>
      <h1 className="font-display text-3xl">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total bookings", s ? String(s.totalBookings) : "—"],
          ["This week", s ? String(s.bookingsThisWeek) : "—"],
          ["Quantity", s ? `${s.totalQuantityKg} kg` : "—"],
          ["Leads 24h / conversion", s ? `${s.newLeads24h} · ${s.conversionRate}%` : "—"],
        ].map(([l, v]) => (
          <div key={l} className="rounded-brand bg-white p-5 shadow-soft">
            <p className="text-xs uppercase text-bark-muted">{l}</p>
            <p className="mt-2 font-display text-3xl tabular-nums">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-brand bg-white p-5 shadow-soft h-72">
          <h2 className="font-display text-lg">Bookings · 30 days</h2>
          <ResponsiveContainer><LineChart data={series.data ?? []}><CartesianGrid stroke="#F5EAD8" /><XAxis dataKey="date" tick={{ fontSize: 11 }} /><YAxis allowDecimals={false} /><Tooltip /><Line type="monotone" dataKey="count" stroke="#B5282D" /></LineChart></ResponsiveContainer>
        </div>
        <div className="rounded-brand bg-white p-5 shadow-soft h-72">
          <h2 className="font-display text-lg">Pack size</h2>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={(packs.data ?? []).map((p) => ({ name: PACK_SIZE_LABEL[p.packSize], value: p.count }))} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70}>
                {(packs.data ?? []).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-6 rounded-brand bg-white p-5 shadow-soft">
        <div className="flex justify-between"><h2 className="font-display text-lg">Recent</h2><Link to="/orders" className="text-sm text-primary">View all</Link></div>
        <table className="mt-4 w-full text-sm">
          <thead><tr className="text-bark-muted"><th className="text-left py-2">Name</th><th>Phone</th><th>Qty</th><th>Status</th></tr></thead>
          <tbody>
            {(recent.data?.items ?? []).map((b) => (
              <tr key={b.id} className="border-t border-bark/5"><td className="py-2">{b.fullName}</td><td>{b.phone}</td><td>{b.quantityKg} kg</td><td>{STATUS_LABEL[b.status]}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
