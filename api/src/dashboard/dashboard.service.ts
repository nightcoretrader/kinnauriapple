import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async summary() {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const base = { deletedAt: null };
    const [totalBookings, bookingsThisWeek, qty, newLeads24h, confirmed, booked] = await Promise.all([
      this.prisma.booking.count({ where: base }),
      this.prisma.booking.count({ where: { ...base, createdAt: { gte: weekAgo } } }),
      this.prisma.booking.aggregate({ where: base, _sum: { quantityKg: true } }),
      this.prisma.booking.count({ where: { ...base, createdAt: { gte: dayAgo } } }),
      this.prisma.booking.count({ where: { ...base, status: { in: ["CONFIRMED", "FULFILLED"] } } }),
      this.prisma.booking.count({ where: { ...base, status: { not: "CANCELLED" } } }),
    ]);
    return {
      totalBookings,
      bookingsThisWeek,
      totalQuantityKg: qty._sum.quantityKg ?? 0,
      newLeads24h,
      conversionRate: booked === 0 ? 0 : Math.round((confirmed / booked) * 1000) / 10,
    };
  }

  async timeseries(days = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);
    const rows = await this.prisma.booking.findMany({
      where: { deletedAt: null, createdAt: { gte: since } },
      select: { createdAt: true, quantityKg: true },
    });
    const map = new Map<string, { count: number; quantityKg: number }>();
    for (let i = 0; i <= days; i++) {
      const d = new Date(since);
      d.setDate(since.getDate() + i);
      map.set(d.toISOString().slice(0, 10), { count: 0, quantityKg: 0 });
    }
    for (const row of rows) {
      const key = row.createdAt.toISOString().slice(0, 10);
      const cur = map.get(key) ?? { count: 0, quantityKg: 0 };
      cur.count += 1;
      cur.quantityKg += row.quantityKg;
      map.set(key, cur);
    }
    return [...map.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, v]) => ({ date, ...v }));
  }

  async packSizeBreakdown() {
    const groups = await this.prisma.booking.groupBy({
      by: ["packSize"],
      where: { deletedAt: null },
      _count: { _all: true },
      _sum: { quantityKg: true },
    });
    return groups.map((g) => ({
      packSize: g.packSize,
      count: g._count._all,
      quantityKg: g._sum.quantityKg ?? 0,
    }));
  }
}
