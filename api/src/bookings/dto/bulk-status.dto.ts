import { ApiProperty } from "@nestjs/swagger";
import { BookingStatus } from "@prisma/client";
import { ArrayNotEmpty, IsArray, IsEnum, IsUUID } from "class-validator";

export class BulkStatusDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID("4", { each: true })
  ids: string[];

  @ApiProperty({ enum: BookingStatus })
  @IsEnum(BookingStatus)
  status: BookingStatus;
}
