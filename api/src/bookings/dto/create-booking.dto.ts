import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { PackSize } from "@prisma/client";

export class CreateBookingDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  fullName: string;

  @ApiProperty({ example: "9876543210" })
  @IsString()
  @Matches(/^[6-9]\d{9}$/, { message: "Enter a valid 10-digit Indian mobile number" })
  phone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: "172001" })
  @IsString()
  @Matches(/^\d{6}$/, { message: "Pincode must be 6 digits" })
  pincode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(80)
  city?: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  quantityKg: number;

  @ApiPropertyOptional({ enum: PackSize })
  @IsOptional()
  @IsEnum(PackSize)
  packSize?: PackSize;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(60)
  source?: string;
}
