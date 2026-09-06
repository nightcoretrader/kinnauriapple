import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { Booking, BookingStatus, PackSize, Paginated } from "../lib/types";
import { BOOKING_STATUSES, PACK_SIZE_LABEL, STATUS_LABEL } from "../lib/types";
import { API_BASE, api, getToken } from "../lib/api";

export function OrdersPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<BookingStatus | "">("");
  const [packSize, setPackSize] = useState<PackSize | "">("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<Booking | null>(null);
  const [note, setNote] = useState("");

  const qs = useMemo(() => {
    const p = new URLSearchParams({ page: String(page), pageSize: "15", sortBy: "createdAt", sortDir: "desc" });
    if (search) p.set("search", search);
    if (status) p.set("status", status);
    if (packSize) p.set("packSize", packSize);
    return p.toString();
  }, [page, search, status, packSize]);

  const list = useQuery({ queryKey: ["bookings", qs], queryFn: () => api<Paginated<Booking>>(`/api/bookings?${qs}`) });
  const patch = useMutation({
    mutationFn: (payload: { id: string; status?: BookingStatus; internalNote?: string }) =>
      api(`/api/bookings/${payload.id}`, { method: "PATCH", body: JSON.stringify(payload) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["bookings"] }); toast.success("Updated"); },
    onError: (e: Error) => toast.error(e.message),
  });
  const bulk = useMutation({
    mutationFn: (payload: { ids: string[]; status: BookingStatus }) =>
      api("/api/bookings/bulk", { method: "PATCH", body: JSON.stringify(payload) }),
    onSuccess: () => { setSelected(new Set()); qc.invalidateQueries({ queryKey: ["bookings"] }); toast.success("Bulk update complete"); },
    onError: (e: Error) => toast.error(e.message),
  });

  async function exportCsv() {
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/api/bookings/export?${qs}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "bookings.csv"; a.click();
      URL.revokeObjectURL(url);
    } catch (e) { toast.error(e instanceof Error ? e.message : "Export failed"); }
  }

  const items = list.data?.items ?? [];
  return (
    <div>
      <div className="flex justify-between gap-4">
        <h1 className="font-display text-3xl">Orders / Quotes</h1>
        <button onClick={exportCsv} className="rounded-brand bg-secondary px-4 py-2 text-sm text-white">Export CSV</button>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <input placeholder="Search name or phone" className="rounded-brand bg-white px-3 py-2 text-sm shadow-soft" value={search} onChange={(e) => { setPage(1); setSearch(e.target.value); }} />
        <select className="rounded-brand bg-white px-3 py-2 text-sm" value={status} onChange={(e) => { setPage(1); setStatus(e.target.value as BookingStatus | ""); }}>
          <option value="">All statuses</option>
          {BOOKING_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
        </select>
        <select className="rounded-brand bg-white px-3 py-2 text-sm" value={packSize} onChange={(e) => { setPage(1); setPackSize(e.target.value as PackSize | ""); }}>
          <option value="">All pack sizes</option>
          {Object.entries(PACK_SIZE_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        {selected.size > 0 && (
          <select className="rounded-brand bg-primary px-3 py-2 text-sm text-white" defaultValue="" onChange={(e) => { if (e.target.value) bulk.mutate({ ids: [...selected], status: e.target.value as BookingStatus }); }}>
            <option value="">Bulk status…</option>
            {BOOKING_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
          </select>
        )}
      </div>
      <div className="mt-4 overflow-hidden rounded-brand bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-alt text-bark-muted">
            <tr>
              <th className="px-4 py-3"><input type="checkbox" onChange={(e) => setSelected(e.target.checked ? new Set(items.map((i) => i.id)) : new Set())} /></th>
              <th>Name</th><th>Phone</th><th>City / Pincode</th><th>Qty</th><th>Pack</th><th>Status</th><th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {items.map((b) => (
              <tr key={b.id} className="cursor-pointer border-t border-bark/5 hover:bg-cream" onClick={() => { setActive(b); setNote(b.internalNote ?? ""); }}>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" checked={selected.has(b.id)} onChange={(e) => { const n = new Set(selected); e.target.checked ? n.add(b.id) : n.delete(b.id); setSelected(n); }} />
                </td>
                <td className="font-medium">{b.fullName}</td>
                <td>{b.phone}</td>
                <td>{b.city ?? "—"} / {b.pincode}</td>
                <td className="tabular-nums">{b.quantityKg} kg</td>
                <td>{PACK_SIZE_LABEL[b.packSize]}</td>
                <td>{STATUS_LABEL[b.status]}</td>
                <td>{new Date(b.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {!items.length && !list.isLoading && <tr><td colSpan={8} className="px-4 py-10 text-center text-bark-muted">No bookings match these filters.</td></tr>}
          </tbody>
        </table>
        <div className="flex justify-between px-4 py-3 text-sm text-bark-muted">
          <span>{list.data?.meta.total ?? 0} total</span>
          <div className="flex gap-2">
            <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
            <span>{page} / {list.data?.meta.pageCount ?? 1}</span>
            <button disabled={page >= (list.data?.meta.pageCount ?? 1)} onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        </div>
      </div>
      {active && (
        <div className="fixed inset-0 z-20 flex justify-end bg-bark/30" onClick={() => setActive(null)}>
          <aside className="h-full w-full max-w-md bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-2xl">{active.fullName}</h2>
            <p className="text-sm text-bark-muted">{active.phone}</p>
            <label className="mt-6 block text-sm">Status</label>
            <select className="mt-1 w-full rounded-brand bg-cream px-3 py-2" value={active.status} onChange={(e) => {
              const status = e.target.value as BookingStatus;
              patch.mutate({ id: active.id, status });
              setActive({ ...active, status });
            }}>
              {BOOKING_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
            </select>
            <label className="mt-4 block text-sm">Internal note</label>
            <textarea className="mt-1 w-full rounded-brand bg-cream px-3 py-2" rows={4} value={note} onChange={(e) => setNote(e.target.value)} />
            <button className="mt-3 rounded-brand bg-primary px-4 py-2 text-sm text-white" onClick={() => patch.mutate({ id: active.id, internalNote: note })}>Save note</button>
          </aside>
        </div>
      )}
    </div>
  );
}
