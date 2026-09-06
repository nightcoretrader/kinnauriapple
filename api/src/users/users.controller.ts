import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminRole } from "@prisma/client";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { JwtPayload } from "../auth/jwt.strategy";

@ApiTags("users")
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(AdminRole.SUPER_ADMIN)
@Controller("users")
export class UsersController {
  constructor(private readonly users: UsersService) {}
  @Get()
  findAll() {
    return this.users.findAll();
  }
  @Post()
  create(@Body() dto: CreateUserDto, @CurrentUser() user: JwtPayload) {
    return this.users.create(dto, user.email);
  }
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateUserDto, @CurrentUser() user: JwtPayload) {
    return this.users.update(id, dto, user.email);
  }
  @Delete(":id")
  remove(@Param("id") id: string, @CurrentUser() user: JwtPayload) {
    return this.users.remove(id, user.email);
  }
}
