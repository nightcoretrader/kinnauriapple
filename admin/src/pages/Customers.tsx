import { useQuery } from "@tanstack/react-query";
import type { Customer } from "../lib/types";
import { api } from "../lib/api";

export function CustomersPage() {
  const q = useQuery({ queryKey: ["customers"], queryFn: () => api<Customer[]>("/api/customers") });
  return (
    <div>
      <h1 className="font-display text-3xl">Customers</h1>
      <table className="mt-6 w-full rounded-brand bg-white text-left text-sm shadow-soft">
        <thead className="bg-cream-alt text-bark-muted"><tr><th className="px-4 py-3">Name</th><th>Phone</th><th>Bookings</th><th>Lifetime kg</th></tr></thead>
        <tbody>
          {(q.data ?? []).map((c) => (
            <tr key={c.phone} className="border-t border-bark/5"><td className="px-4 py-3">{c.fullName}</td><td>{c.phone}</td><td>{c.bookingCount}</td><td>{c.lifetimeQuantityKg}</td></tr>
          ))}
          {!q.data?.length && <tr><td colSpan={4} className="px-4 py-10 text-center text-bark-muted">No customers yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
