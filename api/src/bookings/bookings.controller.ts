import { Body, Controller, Delete, Get, Header, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { QueryBookingsDto } from "./dto/query-bookings.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { BulkStatusDto } from "./dto/bulk-status.dto";
import { Public } from "../common/decorators/public.decorator";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { JwtPayload } from "../auth/jwt.strategy";
import { SkipTransform } from "../common/decorators/skip-transform.decorator";

@ApiTags("bookings")
@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookings: BookingsService) {}

  @Public()
  @Throttle({ default: { limit: 8, ttl: 60000 } })
  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookings.create(dto);
  }

  @ApiBearerAuth()
  @Get()
  findAll(@Query() query: QueryBookingsDto) {
    return this.bookings.findAll(query);
  }

  @ApiBearerAuth()
  @SkipTransform()
  @Header("Content-Type", "text/csv; charset=utf-8")
  @Header("Content-Disposition", "attachment; filename=bookings.csv")
  @Get("export")
  export(@Query() query: QueryBookingsDto) {
    return this.bookings.exportCsv(query);
  }

  @ApiBearerAuth()
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookings.findOne(id);
  }

  @ApiBearerAuth()
  @Patch("bulk")
  bulk(@Body() dto: BulkStatusDto, @CurrentUser() user: JwtPayload) {
    return this.bookings.bulkStatus(dto.ids, dto.status, user.email);
  }

  @ApiBearerAuth()
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateBookingDto, @CurrentUser() user: JwtPayload) {
    return this.bookings.update(id, dto, user.email);
  }

  @ApiBearerAuth()
  @Delete(":id")
  remove(@Param("id") id: string, @CurrentUser() user: JwtPayload) {
    return this.bookings.remove(id, user.email);
  }
}
