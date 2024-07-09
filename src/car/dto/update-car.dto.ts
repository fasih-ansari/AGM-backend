import { PartialType } from '@nestjs/swagger';
import { CreateCarDto } from './create-car.dto';
import { IsOptional, IsString, IsInt, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CarVariantDto } from './car.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCarVariantDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: 'The name of the car variant' })
    name?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: 'Description of the car variant' })
    description?: string;
}

export class UpdateCarDto extends PartialType(CreateCarDto) {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: 'The company of the car' })
    company?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: 'The type of the car' })
    car_type?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: 'The name of the car' })
    car_name?: string;

    @IsOptional()
    @IsInt()
    @ApiProperty({ required: false, description: 'The year of the car' })
    car_year?: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CarVariantDto)
    @ApiProperty({ type: [CarVariantDto], required: false, description: 'Variants of the car' })
    variants?: CarVariantDto[];
}
