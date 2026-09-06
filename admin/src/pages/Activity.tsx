import { useQuery } from "@tanstack/react-query";
import type { ActivityLog, Paginated } from "../lib/types";
import { api } from "../lib/api";

export function ActivityPage() {
  const q = useQuery({ queryKey: ["activity"], queryFn: () => api<Paginated<ActivityLog>>("/api/activity") });
  return (
    <div>
      <h1 className="font-display text-3xl">Activity</h1>
      <ul className="mt-6 space-y-3">
        {(q.data?.items ?? []).map((a) => (
          <li key={a.id} className="rounded-brand bg-white px-4 py-3 shadow-soft">
            <p className="text-sm">{a.action}</p>
            <p className="mt-1 text-xs text-bark-muted">{a.actorEmail} · {new Date(a.createdAt).toLocaleString()}</p>
          </li>
        ))}
        {!q.data?.items.length && <li className="text-sm text-bark-muted">No activity yet.</li>}
      </ul>
    </div>
  );
}
