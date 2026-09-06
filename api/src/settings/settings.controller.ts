import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { AdminRole } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";

class UpdateSettingsDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  pricePerKg?: number;
  @IsOptional()
  @IsBoolean()
  notifyEmail?: boolean;
  @IsOptional()
  @IsBoolean()
  notifyWhatsapp?: boolean;
  @IsOptional()
  @IsString()
  whatsappNumber?: string;
  @IsOptional()
  @IsEmail()
  contactEmail?: string;
}

@ApiTags("settings")
@ApiBearerAuth()
@Controller("settings")
export class SettingsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async get() {
    const rows = await this.prisma.appSetting.findMany();
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return {
      pricePerKg: Number(map.pricePerKg ?? 350),
      notifyEmail: map.notifyEmail === "true",
      notifyWhatsapp: map.notifyWhatsapp === "true",
      whatsappNumber: map.whatsappNumber ?? "",
      contactEmail: map.contactEmail ?? "xena.w@example.org",
    };
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(AdminRole.SUPER_ADMIN)
  async update(@Body() dto: UpdateSettingsDto) {
    const entries: [string, string][] = [];
    if (dto.pricePerKg !== undefined) entries.push(["pricePerKg", String(dto.pricePerKg)]);
    if (dto.notifyEmail !== undefined) entries.push(["notifyEmail", String(dto.notifyEmail)]);
    if (dto.notifyWhatsapp !== undefined) entries.push(["notifyWhatsapp", String(dto.notifyWhatsapp)]);
    if (dto.whatsappNumber !== undefined) entries.push(["whatsappNumber", dto.whatsappNumber]);
    if (dto.contactEmail !== undefined) entries.push(["contactEmail", dto.contactEmail]);
    for (const [key, value] of entries) {
      await this.prisma.appSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
    return this.get();
  }
}
