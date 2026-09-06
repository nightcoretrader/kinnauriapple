import { Controller, Get, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DashboardService } from "./dashboard.service";

@ApiTags("dashboard")
@ApiBearerAuth()
@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}
  @Get("summary")
  summary() {
    return this.dashboard.summary();
  }
  @Get("timeseries")
  timeseries(@Query("days") days?: string) {
    return this.dashboard.timeseries(days ? Number(days) : 30);
  }
  @Get("pack-size-breakdown")
  packSize() {
    return this.dashboard.packSizeBreakdown();
  }
}
