import { Public } from "./common/decorators/public.decorator";
import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Public()
  @Get()
  ping() {
    return { ok: true, service: "kinnaur-api" };
  }
}
