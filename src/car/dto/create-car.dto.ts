import { IsNotEmpty, IsString, IsInt, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CarVariantDto {
  @ApiProperty({ example: '1.5 Oreal' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'High-end variant' })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CreateCarDto {
  @ApiProperty({ example: 'Honda' })
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty({ example: 'sedan' })
  @IsNotEmpty()
  @IsString()
  car_type: string;

  @ApiProperty({ example: 'city' })
  @IsNotEmpty()
  @IsString()
  car_name: string;

  @ApiProperty({ example: 2016 })
  @IsNotEmpty()
  @IsInt()
  car_year: number;

  @ApiProperty({ type: [CarVariantDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CarVariantDto)
  variants: CarVariantDto[];
}
