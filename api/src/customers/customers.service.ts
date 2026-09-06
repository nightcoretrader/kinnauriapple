import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const bookings = await this.prisma.booking.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    const map = new Map<
      string,
      {
        phone: string;
        fullName: string;
        email: string | null;
        city: string | null;
        pincode: string;
        bookingCount: number;
        lifetimeQuantityKg: number;
        lastBookingAt: Date;
      }
    >();
    for (const b of bookings) {
      const existing = map.get(b.phone);
      if (!existing) {
        map.set(b.phone, {
          phone: b.phone,
          fullName: b.fullName,
          email: b.email,
          city: b.city,
          pincode: b.pincode,
          bookingCount: 1,
          lifetimeQuantityKg: b.quantityKg,
          lastBookingAt: b.createdAt,
        });
      } else {
        existing.bookingCount += 1;
        existing.lifetimeQuantityKg += b.quantityKg;
      }
    }
    return [...map.values()].sort((a, b) => b.lastBookingAt.getTime() - a.lastBookingAt.getTime());
  }
}
