import { Controller, Get, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PrismaService } from "../prisma/prisma.service";

@ApiTags("activity")
@ApiBearerAuth()
@Controller("activity")
export class ActivityController {
  constructor(private readonly prisma: PrismaService) {}
  @Get()
  async list(@Query("page") page = "1", @Query("pageSize") pageSize = "50") {
    const p = Math.max(1, Number(page));
    const take = Math.min(100, Math.max(1, Number(pageSize)));
    const [items, total] = await this.prisma.$transaction([
      this.prisma.activityLog.findMany({ orderBy: { createdAt: "desc" }, skip: (p - 1) * take, take }),
      this.prisma.activityLog.count(),
    ]);
    return {
      items,
      meta: { total, page: p, pageSize: take, pageCount: Math.ceil(total / take) || 1 },
    };
  }
}
