import { Injectable, NotFoundException } from "@nestjs/common";
import { BookingStatus, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { QueryBookingsDto } from "./dto/query-bookings.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBookingDto) {
    return this.prisma.booking.create({
      data: {
        fullName: dto.fullName.trim(),
        phone: dto.phone,
        email: dto.email?.toLowerCase(),
        pincode: dto.pincode,
        city: dto.city?.trim(),
        quantityKg: dto.quantityKg,
        packSize: dto.packSize ?? "CUSTOM",
        notes: dto.notes,
        source: dto.source ?? "landing_page",
      },
    });
  }

  private where(query: QueryBookingsDto): Prisma.BookingWhereInput {
    const and: Prisma.BookingWhereInput[] = [{ deletedAt: null }];
    if (query.status) and.push({ status: query.status });
    if (query.packSize) and.push({ packSize: query.packSize });
    if (query.city) and.push({ city: { contains: query.city, mode: "insensitive" } });
    if (query.pincode) and.push({ pincode: query.pincode });
    if (query.from || query.to) {
      and.push({
        createdAt: {
          gte: query.from ? new Date(query.from) : undefined,
          lte: query.to ? new Date(query.to) : undefined,
        },
      });
    }
    if (query.search) {
      and.push({
        OR: [
          { fullName: { contains: query.search, mode: "insensitive" } },
          { phone: { contains: query.search } },
          { email: { contains: query.search, mode: "insensitive" } },
        ],
      });
    }
    return { AND: and };
  }

  async findAll(query: QueryBookingsDto) {
    const page = query.page ?? 1;
    const pageSize = Math.min(query.pageSize ?? 20, 100);
    const where = this.where(query);
    const sortBy = query.sortBy ?? "createdAt";
    const sortDir = query.sortDir ?? "desc";
    const [items, total] = await this.prisma.$transaction([
      this.prisma.booking.findMany({
        where,
        orderBy: { [sortBy]: sortDir },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.booking.count({ where }),
    ]);
    return {
      items,
      meta: { total, page, pageSize, pageCount: Math.ceil(total / pageSize) || 1 },
    };
  }

  async findOne(id: string) {
    const booking = await this.prisma.booking.findFirst({
      where: { id, deletedAt: null },
      include: { activityLogs: { orderBy: { createdAt: "desc" } } },
    });
    if (!booking) throw new NotFoundException("Booking not found");
    return booking;
  }

  async update(id: string, dto: UpdateBookingDto, actorEmail: string) {
    const existing = await this.findOne(id);
    const data: Prisma.BookingUpdateInput = {};
    if (dto.internalNote !== undefined) data.internalNote = dto.internalNote;
    if (dto.status) data.status = dto.status;
    const updated = await this.prisma.booking.update({ where: { id }, data });
    if (dto.status && dto.status !== existing.status) {
      await this.prisma.activityLog.create({
        data: { bookingId: id, actorEmail, action: `Status ${existing.status} → ${dto.status}` },
      });
    }
    if (dto.internalNote !== undefined && dto.internalNote !== existing.internalNote) {
      await this.prisma.activityLog.create({
        data: { bookingId: id, actorEmail, action: "Updated internal note" },
      });
    }
    return updated;
  }

  async bulkStatus(ids: string[], status: BookingStatus, actorEmail: string) {
    const result = await this.prisma.$transaction(async (tx) => {
      const bookings = await tx.booking.findMany({ where: { id: { in: ids }, deletedAt: null } });
      await tx.booking.updateMany({ where: { id: { in: ids }, deletedAt: null }, data: { status } });
      await tx.activityLog.createMany({
        data: bookings.map((b) => ({
          bookingId: b.id,
          actorEmail,
          action: `Bulk status ${b.status} → ${status}`,
        })),
      });
      return bookings.length;
    });
    return { updated: result };
  }

  async remove(id: string, actorEmail: string) {
    await this.findOne(id);
    await this.prisma.booking.update({ where: { id }, data: { deletedAt: new Date() } });
    await this.prisma.activityLog.create({
      data: { bookingId: id, actorEmail, action: "Soft-deleted booking" },
    });
    return { deleted: true };
  }

  async exportCsv(query: QueryBookingsDto) {
    const items = await this.prisma.booking.findMany({
      where: this.where(query),
      orderBy: { createdAt: "desc" },
    });
    const header = [
      "id",
      "fullName",
      "phone",
      "email",
      "pincode",
      "city",
      "quantityKg",
      "packSize",
      "status",
      "notes",
      "internalNote",
      "source",
      "createdAt",
    ];
    const rows = items.map((b) =>
      [
        b.id,
        b.fullName,
        b.phone,
        b.email ?? "",
        b.pincode,
        b.city ?? "",
        b.quantityKg,
        b.packSize,
        b.status,
        (b.notes ?? "").replace(/"/g, '""'),
        (b.internalNote ?? "").replace(/"/g, '""'),
        b.source ?? "",
        b.createdAt.toISOString(),
      ]
        .map((v) => `"${v}"`)
        .join(","),
    );
    return [header.join(","), ...rows].join("\n");
  }
}
