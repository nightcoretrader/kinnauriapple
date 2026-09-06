import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";

const select = { id: true, email: true, name: true, role: true, createdAt: true } as const;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.adminUser.findMany({ select, orderBy: { createdAt: "asc" } });
  }
  async create(dto: CreateUserDto, actorEmail: string) {
    const exists = await this.prisma.adminUser.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (exists) throw new ConflictException("Email already in use");
    const user = await this.prisma.adminUser.create({
      data: {
        email: dto.email.toLowerCase(),
        name: dto.name,
        role: dto.role ?? "STAFF",
        passwordHash: await bcrypt.hash(dto.password, 12),
      },
      select,
    });
    await this.prisma.activityLog.create({
      data: { actorEmail, action: `Created admin user ${user.email} (${user.role})` },
    });
    return user;
  }
  async update(id: string, dto: UpdateUserDto, actorEmail: string) {
    const existing = await this.prisma.adminUser.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("User not found");
    const user = await this.prisma.adminUser.update({
      where: { id },
      data: {
        name: dto.name,
        role: dto.role,
        passwordHash: dto.password ? await bcrypt.hash(dto.password, 12) : undefined,
      },
      select,
    });
    await this.prisma.activityLog.create({ data: { actorEmail, action: `Updated admin user ${user.email}` } });
    return user;
  }
  async remove(id: string, actorEmail: string) {
    const existing = await this.prisma.adminUser.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("User not found");
    await this.prisma.adminUser.delete({ where: { id } });
    await this.prisma.activityLog.create({
      data: { actorEmail, action: `Deleted admin user ${existing.email}` },
    });
    return { deleted: true };
  }
}
